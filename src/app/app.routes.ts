import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'credit-cards',
    loadChildren: () => import('./credit-cards/credit-cards.routes').then(r => r.creditCardsRoutes)
  }
];
