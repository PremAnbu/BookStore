import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { BooksContainerComponent } from './components/booksContainer/books-container/books-container.component';
import { BookDetailComponent } from './components/bookDetail/book-detail/book-detail.component';

const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,
    children:[
      {
        path:'books',
        component:BooksContainerComponent
      },
      {
        path:'bookDetail',
        component:BookDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
