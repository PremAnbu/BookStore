import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LoginComponent } from './components/login/login/login.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { BookstoreHeaderComponent } from './components/bookstore-header/bookstore-header/bookstore-header.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books/books.component';
import { BooksContainerComponent } from './components/booksContainer/books-container/books-container.component';
import { BookDetailComponent } from './components/bookDetail/book-detail/book-detail.component';  
import { MatDialogModule} from '@angular/material/dialog';
import { LoginSignupComponent } from './components/loginSignup/login-signup/login-signup.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CustomerDetailsComponent } from './components/customerDetails/customer-details/customer-details.component';
import { WishlistComponent } from './components/wishList/wishlist/wishlist.component';
import { OrderlistComponent } from './components/orderList/orderlist/orderlist.component';
import { OrderplacedComponent } from './components/orderPlaced/orderplaced/orderplaced.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    BookstoreHeaderComponent,
    DashboardComponent,
    BooksComponent,
    BooksContainerComponent,
    BookDetailComponent,
    LoginSignupComponent,
    CartComponent,
    CustomerDetailsComponent,
    WishlistComponent,
    OrderlistComponent,
    OrderplacedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
