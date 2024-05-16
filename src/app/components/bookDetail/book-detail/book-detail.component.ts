import { DataService } from './../../../services/dataService/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { BookObject } from 'src/assets/BookObjectInterface';
import { cartObject } from 'src/assets/cartObjectInterface';

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

  constructor(private bookService: BookService, private cartService: CartService, private route: ActivatedRoute, private dataService: DataService) {}

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
  }

  addToBag() {
    if (!this.addedToBag) {
      if (localStorage.getItem('authToken') != null) {
        this.cartService.addCartApiCall(this.bookDetail.bookId, 1).subscribe(res => {
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData.data);
          });
        });
      }
    }
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
    if (this.count > 1) {
      this.count--;
      if (localStorage.getItem('authToken') != null) {
        this.cartService.updateQuantityCall(this.bookDetail.bookId, this.count).subscribe(res => {
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData.data);
          });
        }, err => console.log(err))
      } else {
        this.dataService.cartItems.forEach((cartItem: cartObject) => {
          if (cartItem.bookId === this.cartDetail.bookId) {
            cartItem.bookQuantity = this.count;
          }
        });
      }
    }
  }
  

}
