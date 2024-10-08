import { Component, inject, Input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreditCardsService } from '../../services/credit-cards.service';
import { CreditCard } from '../../models/credit-cards';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  #creditCardsService = inject(CreditCardsService)
  creditCardDetails!: CreditCard;
  destory$: Subject<void> = new Subject<void>();

  @Input({transform: numberAttribute}) id!: number;

  ngOnInit() {
    if (this.id) {
      this.#creditCardsService.getCreditCardById(this.id).subscribe((data) => {
        this.creditCardDetails = data;
      })
    }
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
