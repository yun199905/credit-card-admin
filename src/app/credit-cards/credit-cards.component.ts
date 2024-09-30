import { Component, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreditCard } from '../models/credit-cards';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent {
  displayColumns = ["select", "id", "name", "description", "bankName", "maxCredit", "interestRate", "active", "recommendedScore", "actions"];
  dataSource = new MatTableDataSource([
    {
      "id": 1,
      "name": "SBI Bank",
      "description": "SBI Bank offers customers with various options",
      "bankName": "SBI Bank",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 2,
      "name": "Mastercard",
      "description": "Mastercard offers customers with various options",
      "bankName": "Mastercard",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 3,
      "name": "Visa",
      "description": "Visa offers customers with various options",
      "bankName": "Visa",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 1,
      "name": "SBI Bank",
      "description": "SBI Bank offers customers with various options",
      "bankName": "SBI Bank",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 2,
      "name": "Mastercard",
      "description": "Mastercard offers customers with various options",
      "bankName": "Mastercard",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 3,
      "name": "Visa",
      "description": "Visa offers customers with various options",
      "bankName": "Visa",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 1,
      "name": "SBI Bank",
      "description": "SBI Bank offers customers with various options",
      "bankName": "SBI Bank",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 2,
      "name": "Mastercard",
      "description": "Mastercard offers customers with various options",
      "bankName": "Mastercard",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    },
    {
      "id": 3,
      "name": "Visa",
      "description": "Visa offers customers with various options",
      "bankName": "Visa",
      "maxCredit": 3000,
      "interestRate": 10,
      "active": true,
      "recommendedScore": "700-900",
      "annualFee": 4,
      "termsAndConditions": "Following are the terms and conditions",
      "createdDate": "2023-31-08",
      "updatedDate": "2023-31-08"
    }
  ]);

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectHandler(row: CreditCard){
    this.selection.toggle(row as never);
  }
}
