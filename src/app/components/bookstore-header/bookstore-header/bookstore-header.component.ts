import { BookObject } from './../../../../assets/BookObjectInterface';
import { HttpService } from './../../../services/httpService/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CART_ICON, PROFILE_ICON, SEARCH_ICON } from 'src/assets/svg-icons';
import { LoginSignupComponent } from '../../loginSignup/login-signup/login-signup.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { cartObject } from 'src/assets/cartObjectInterface';

@Component({
  selector: 'app-bookstore-header',
  templateUrl: './bookstore-header.component.html',
  styleUrls: ['./bookstore-header.component.scss']
})
export class BookstoreHeaderComponent implements OnInit {
  loginclick: boolean = false;
  CartValue!: cartObject[];
  loginLogOut: boolean=true;
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private dialog: MatDialog,
    private router: Router,
    private httpService: HttpService,
    private bookService: BookService,
    private cartService: CartService
  ) {
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    matIconRegistry.addSvgIconLiteral("profile-icon", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON));
    matIconRegistry.addSvgIconLiteral("cart-icon", domSanitizer.bypassSecurityTrustHtml(CART_ICON));
  }

  ngOnInit(): void {
    this.httpService.getAllBooks().subscribe(res => {
      this.bookService.changeState(res.data);
    });
    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllCart().subscribe(res => {
        this.CartValue=res.data;
        this.cartService.changeState(res.data);
      });
      this.loginLogOut=false
    }
  }

  login() {
    const dialogRef = this.dialog.open(LoginSignupComponent, { width: '720px', height: '480px' });
    dialogRef.afterClosed().subscribe(result => {});
    this.loginclick = !this.loginclick;
  }
  logout(){
    localStorage.clear();
    // this.router.navigate([""])
  }

  handleCart() {
    this.router.navigate(["/cart"]);
  }
}
