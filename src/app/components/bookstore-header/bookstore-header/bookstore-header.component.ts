import { BookObject } from './../../../../assets/BookObjectInterface';
import { HttpService } from './../../../services/httpService/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CART_ICON, PROFILE_ICON, PROFILE_ICON_BLACKCOLOUR, SEARCH_ICON, WISHLIST_ICON } from 'src/assets/svg-icons';
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
  loginLogOut: boolean = true;
  searchString: string = '';
  token: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private dialog: MatDialog,
    private router: Router,
    private httpService: HttpService,
    private bookService: BookService,
    private cartService: CartService,
    private dataService: DataService
  ) {
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    matIconRegistry.addSvgIconLiteral("profile-icon", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON));
    matIconRegistry.addSvgIconLiteral("profile-icon-block", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON_BLACKCOLOUR));
    matIconRegistry.addSvgIconLiteral("cart-icon", domSanitizer.bypassSecurityTrustHtml(CART_ICON));
    matIconRegistry.addSvgIconLiteral("wishlist-icon", domSanitizer.bypassSecurityTrustHtml(WISHLIST_ICON));
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.dataService.addToToken(this.token);
    
    this.httpService.getAllBooks().subscribe(res => {
      this.bookService.changeState(res.data);
      this.dataService.updateBookList(res.data); 
    });

    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllCart().subscribe(res => {
        this.CartValue = res.data;
        this.cartService.changeState(res.data);
        this.dataService.updateCartList(res.data); 
      });

      this.httpService.getAllWishList().subscribe(res => {
        this.dataService.updateWishList(res.data); 
      });
      this.httpService.getAddress().subscribe(res => {
        this.dataService.updateAddressList(res.data); 
      });

      this.httpService.getAllOrder().subscribe(res => {
        this.dataService.updateOrderList(res.data); 
      });
      this.loginLogOut = false;
    }
  }

  login() {
    const dialogRef = this.dialog.open(LoginSignupComponent, { width: '720px', height: '480px' });
    dialogRef.afterClosed().subscribe(result => { });
    this.loginclick = !this.loginclick;
  }

  logout() {
    localStorage.clear();
    this.dataService.updateCartList([]); 
    this.dataService.updateWishList([]); 
    this.dataService.updateAddressList([]); 
    this.dataService.updateOrderList([]); 
    this.loginLogOut = true;
    // this.router.navigate([""]);
  }

  handleCart() {
    this.router.navigate(["/cart"]);
  }

  handleLoginSignup() {
    if (localStorage.getItem('authToken') != null) this.loginLogOut = false;
  }

  handleSearchString() {
    this.dataService.updateSearchString(this.searchString);
  }
}
