import { Component, inject, Input, numberAttribute } from '@angular/core';
import { CreditCard } from '../../models/credit-cards';
import { CreditCardsService } from '../../services/credit-cards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  #creditCardsService = inject(CreditCardsService);
  #router = inject(Router);
  creditCardId!: number;

  @Input({ transform: numberAttribute }) id!: number;

  ngOnInit() {
    this.creditCardId = this.id;

    if (this.creditCardId) {
      this.#creditCardsService.deleteCreditCard(this.creditCardId)
      .subscribe({
        next: () => {
          alert("Credit card deleted successfully");
          this.#router.navigate(['/credit-cards']);
        },
        error: (error) => {
          console.error('Error deleting credit card:', error);
        }
      });
    }
  }
}
