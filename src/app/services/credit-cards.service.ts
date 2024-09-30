import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreditCard } from '../models/credit-cards';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
  http = inject(HttpClient);
  #apiUrl = 'http://localhost:3000/creditcards';

  /**
   * Create new credit card
   *
   * @param {CreditCard} creditCard
   * @return {*}  {Observable<CreditCard>}
   * @memberof CreditCardsService
   */
  createCreditCards(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.#apiUrl, creditCard);
  }

  /**
   * Get all credit cards
   *
   * @return {*}  {Observable<CreditCard[]>}
   * @memberof CreditCardsService
   */
  getCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.#apiUrl);
  }

  /**
   * Get specific credit card
   *
   * @param {number} id
   * @return {*}  {Observable<CreditCard>}
   * @memberof CreditCardsService
   */
  getCreditCardById(id: number): Observable<CreditCard> {
    const url = `${this.#apiUrl}/${id}`;
    return this.http.get<CreditCard>(url);
  }

  /**
   * Update specific credit card
   *
   * @param {CreditCard} creditCard
   * @return {*}  {Observable<CreditCard>}
   * @memberof CreditCardsService
   */
  updateCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    const url = `${this.#apiUrl}/${creditCard.id}`;
    return this.http.put<CreditCard>(url, creditCard);
  }

  /**
   * Delete specific credit card
   *
   * @param {number} id
   * @return {*}  {Observable<void>}
   * @memberof CreditCardsService
   */
  deleteCreditCard(id: number): Observable<void> {
    const url = `${this.#apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
