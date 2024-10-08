import { CreditCard } from './../../models/credit-cards';
import { Component, inject, Input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CreditCardsService } from '../../services/credit-cards.service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, ReactiveFormsModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule, MatSnackBarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {
  #fb = inject(FormBuilder);
  #creditCardsService = inject(CreditCardsService);
  #notificationService = inject(NotificationService);
  #router = inject(Router);

  editForm: FormGroup = this.#fb.group({
    id: [undefined],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.required],
    bankName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    maxCredit: [3000, [Validators.required, Validators.min(200)]],
    interestRate: [12, [Validators.required, Validators.max(100)]],
    active: [true, Validators.required],
    recommendedScore: ['100-500', Validators.required],
    annualFee: [12, [Validators.required]],
    termsAndConditions: ['Terms and conditions for the credit card', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    createdDate: [new Date(), Validators.required],
    updateDate: [new Date(), Validators.required]
  });
  creditCard: CreditCard | null = null;
  destory$: Subject<void> = new Subject<void>();

  @Input({ transform: numberAttribute }) id!: number;

  ngOnInit() {
    if (this.id) {
      this.#creditCardsService.getCreditCardById(this.id).subscribe((data) => {
        this.creditCard = data;
        this.editForm.patchValue(this.creditCard);
      })
    }
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

  maxErrMsg(field: string) {
    return `${field} must not be greater than 20.`;
  }

  updateCreditCard() {
    this.#creditCardsService.updateCreditCard(this.editForm.value)
    .pipe(takeUntil(this.destory$))
    .subscribe({
      next: () => {
        this.#notificationService.showMsg('Credit card updated successfully');
        this.#router.navigate(['/credit-cards']);
      },
      error: (error) => {
        this.#notificationService.showMsg(error.message);
      }
    })
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
