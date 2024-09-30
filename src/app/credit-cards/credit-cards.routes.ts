import { Routes } from '@angular/router';
import { CreditCardsComponent } from './credit-cards.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';

export const creditCardsRoutes: Routes = [
  {
    path: '',
    component: CreditCardsComponent
  },
  {
    path: 'add/:id',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'delete/:id',
    component: DeleteComponent
  }
];
