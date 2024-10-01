import { Component, inject, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreditCard } from '../models/credit-cards';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CreditCardsService } from '../services/credit-cards.service';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatCheckboxModule, MatPaginatorModule, MatIconModule, RouterModule],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent {
  #creditCardsService = inject(CreditCardsService);
  displayColumns = ["select", "id", "name", "description", "bankName", "maxCredit", "interestRate", "active", "recommendedScore", "actions"];
  creditCards: CreditCard[] = [];
  dataSource = new MatTableDataSource(this.creditCards);
  selection = new SelectionModel(true, []);

  constructor() {
    this.#creditCardsService.getCreditCards().subscribe((data) => {
      this.creditCards = data;
      this.dataSource = new MatTableDataSource(this.creditCards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  selectHandler(row: CreditCard){
    this.selection.toggle(row as never);
  }
}
