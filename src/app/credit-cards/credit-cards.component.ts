import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatCheckboxModule, MatPaginatorModule, MatIconModule, RouterModule],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent implements OnDestroy {
  #creditCardsService = inject(CreditCardsService);
  displayColumns = ["id", "name", "description", "bankName", "maxCredit", "interestRate", "active", "recommendedScore", "actions"];
  creditCards: CreditCard[] = [];
  dataSource = new MatTableDataSource(this.creditCards);
  selection = new SelectionModel(true, []);
  numOfCards: number = 0;
  numOfActiveCards: number = 0;
  numOfBanks: number = 0;
  destory$: Subject<void> = new Subject<void>();

  constructor() {
    this.#creditCardsService.getCreditCards()
    .pipe(takeUntil(this.destory$))
    .subscribe((data) => {
      this.creditCards = data;
      this.calcSummary();
      this.dataSource = new MatTableDataSource(this.creditCards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectHandler(row: CreditCard){
    this.selection.toggle(row as never);
  }

  calcSummary() {
    this.numOfBanks = new Set(this.creditCards.map((card) => card.bankName)).size;
    this.numOfCards = this.creditCards.length;
    this.numOfActiveCards = this.creditCards.filter((card) => card.active).length;
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
