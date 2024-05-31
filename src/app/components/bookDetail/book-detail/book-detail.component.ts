import { DataService } from './../../../services/dataService/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { BookObject } from 'src/assets/BookObjectInterface';
import { cartObject } from 'src/assets/cartObjectInterface';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { STAR_ICON, STAR_ICON_BLACK, STAR_ICON_YELLOW } from 'src/assets/svg-icons';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookDetail: any;
  cartDetail: any;
  addedToBag: boolean = false;
  count: number = 1;
  wishListOption :boolean=false

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private bookService: BookService, private cartService: CartService, private route: ActivatedRoute, private dataService: DataService,private httpService:HttpService) {
    iconRegistry.addSvgIconLiteral("star_icon", sanitizer.bypassSecurityTrustHtml(STAR_ICON)),
    iconRegistry.addSvgIconLiteral("star_icon_black", sanitizer.bypassSecurityTrustHtml(STAR_ICON_BLACK)),
    iconRegistry.addSvgIconLiteral("star_icon_yellow", sanitizer.bypassSecurityTrustHtml(STAR_ICON_YELLOW))
  }

  ngOnInit(): void {
    this.bookService.currentBookState.subscribe(result1 => {
      this.route.params.subscribe((result2) => {
        this.bookDetail = result1.filter((e: BookObject) => e.bookId == result2['bookId'])[0];
        console.log(this.bookDetail);
      })
    });
    if (localStorage.getItem('authToken') != null) {
      this.cartService.currentCartState.subscribe(result1 => {
        this.route.params.subscribe((result2) => {
          this.cartDetail = result1.filter((e: any) => e.bookId == result2['bookId'])[0];
          if (this.cartDetail && this.cartDetail.bookQuantity > 0) {
            this.count = this.cartDetail.bookQuantity;
            this.addedToBag = true;
          }
        });
      });
    } else {
      this.route.params.subscribe((result2) => {
        const existingCartItem = this.dataService.cartItems.find((cartItem: any) => cartItem.bookId == result2['bookId']);
        if (existingCartItem && existingCartItem.bookQuantity > 0) {
          this.cartDetail = existingCartItem;
          this.count = this.cartDetail.bookQuantity;
          this.addedToBag = true;
        } else {
          this.dataService.addToCart(this.cartDetail = this.bookDetail);
          this.cartDetail = this.dataService.cartItems.find((e: any) => e.bookId == result2['bookId']);
          if (this.cartDetail && this.cartDetail.bookQuantity > 0) {
            this.count = this.cartDetail.bookQuantity;
            this.addedToBag = true;
          }
        }
      });
    }
    if (this.dataService.wishListItems.some(item => item.bookId === this.cartDetail.bookId)) {
      this.wishListOption = true;
    }
    if(localStorage.getItem('authToken') != null){
    this.dataService.currWishList.subscribe(res => {
      if (res.some((item: any) => item.bookId === this.bookDetail.bookId)) {
        this.wishListOption = true;
      }
    });}
  }

  addToBag() {
    if (!this.addedToBag) {
      if (localStorage.getItem('authToken') != null) {
        this.cartService.addCartApiCall(this.bookDetail.bookId, 1).subscribe(res => {
          console.log(this.dataService.token);
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            // this.dataService.currCartList.subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData);
          });
        });
      }
    }
    // this.dataService.addToCart(this.bookDetail);
    this.addedToBag = true;
  }
  
  increaseCount() {
    this.count++;
    if (localStorage.getItem('authToken') != null) {
      this.cartService.updateQuantityCall(this.bookDetail.bookId, this.count).subscribe(res => {
        this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
          this.cartService.changeState(updatedCartData.data);
        });
      }, err => console.log(err))
    } else {
      this.dataService.cartItems.forEach((cartItem: cartObject) => {
        if (cartItem.bookId == this.cartDetail.bookId) {
          cartItem.bookQuantity = this.count;
        }
      });
    }
  }
  
  decreaseCount() {
    if(this.count > 1) {
      this.count--;
      if (localStorage.getItem('authToken') != null) {
        this.cartService.updateQuantityCall(this.bookDetail.bookId, this.count).subscribe(res => {
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData.data);
          });
        }, err => console.log(err))
      }else{
        this.dataService.cartItems.forEach((cartItem: cartObject) => {
          if (cartItem.bookId === this.cartDetail.bookId) {
            cartItem.bookQuantity = this.count;
          }
        });
      }
    }
  }
  handleWishList(bookId:number){
    if (localStorage.getItem('authToken') != null) {
       console.log(bookId);
       this.httpService.addWishList(bookId).subscribe(res=>{
        console.log(res); 
        this.dataService.updateWishList(this.bookDetail)
       })
       this.wishListOption=true
  }else{
    const alreadyInWishList = this.dataService.wishListItems.some(item => item.bookId === bookId);
   if(!alreadyInWishList)
    this.dataService.addToWishList(this.bookDetail)
        this.wishListOption=true
  }
}

}
