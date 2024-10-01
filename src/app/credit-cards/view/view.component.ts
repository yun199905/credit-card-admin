import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreditCardsService } from '../../services/credit-cards.service';
import { CreditCard } from '../../models/credit-cards';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  #creditCardsService = inject(CreditCardsService)
  creditCardDetails!: CreditCard;
  creditCardId!: number;

  @Input({transform: numberAttribute}) id!: number;

  ngOnInit() {
    this.creditCardId = this.id;

    if (this.creditCardId) {
      this.#creditCardsService.getCreditCardById(this.creditCardId).subscribe((data) => {
        this.creditCardDetails = data;
      })
    }
  }
}
