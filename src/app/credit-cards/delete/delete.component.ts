import { Component, inject, Input, numberAttribute } from '@angular/core';
import { CreditCardsService } from '../../services/credit-cards.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  #creditCardsService = inject(CreditCardsService);
  #notificationService = inject(NotificationService);
  #router = inject(Router);
  destory$: Subject<void> = new Subject<void>();

  @Input({ transform: numberAttribute }) id!: number;

  ngOnInit() {
    if (this.id) {
      this.#creditCardsService.deleteCreditCard(this.id)
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: () => {
          this.#notificationService.showMsg('Credit card deleted successfully');
          this.#router.navigate(['/credit-cards']);
        },
        error: (error) => {
          console.error('Error deleting credit card:', error);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
