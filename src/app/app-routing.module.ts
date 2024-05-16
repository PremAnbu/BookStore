import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { BooksContainerComponent } from './components/booksContainer/books-container/books-container.component';
import { BookDetailComponent } from './components/bookDetail/book-detail/book-detail.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CustomerDetailsComponent } from './components/customerDetails/customer-details/customer-details.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:'books',
        component:BooksContainerComponent
      },
      {
        path:'bookDetail/:bookId',
        component:BookDetailComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'customerAdderss/:bookId',
        component:CustomerDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
