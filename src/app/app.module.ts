import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login/login.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { BookstoreHeaderComponent } from './components/bookstore-header/bookstore-header/bookstore-header.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books/books.component';
import { BooksContainerComponent } from './components/booksContainer/books-container/books-container.component';
import { BookDetailComponent } from './components/bookDetail/book-detail/book-detail.component';  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    BookstoreHeaderComponent,
    DashboardComponent,
    BooksComponent,
    BooksContainerComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
