import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditCard } from '../../models/credit-cards';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CreditCardsService } from '../../services/credit-cards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, FormsModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  #creditCardsService = inject(CreditCardsService);
  #router = inject(Router);
  newCreditCard: CreditCard = {
    id: undefined,
    name: '',
    description: '',
    bankName: '',
    maxCredit: 5000,
    interestRate: 12,
    active: true,
    recommendedScore: '100-500',
    annualFee: 12,
    termsAndConditions: 'Terms and conditions for the credit card',
    createdDate: Date(),
    updatedDate: Date()
  }

  requiredErrMsg(filed: string) {
    return `${filed} is required`;
  }

  minlengthErrMsg(filed: string) {
    return `${filed} must be at least 3 characters`;
  }

  maxlengthErrMsg(filed: string) {
    return `${filed} cannot be more than 20 characters`;
  }

  addCreditCard() {
    this.#creditCardsService.createCreditCards(this.newCreditCard).subscribe({
      next: () => {
        alert("Credit card added successfully");
        this.#router.navigate(['/credit-cards']);
      },
      error: (error) => {
        console.error('Error adding credit card:', error);
      }
    });
  }

}
