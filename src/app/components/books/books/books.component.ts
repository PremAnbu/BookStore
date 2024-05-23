import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { BookObject } from 'src/assets/BookObjectInterface';
import { cartObject } from 'src/assets/cartObjectInterface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() BookObjectList!: BookObject[];
  CartValue!: cartObject[];
  cartList!: cartObject[];
  tempList!: cartObject[];
  tempWishList : any[]=[]
  wishList : any[]=[]
  searchString:string=''  
  subscription!:Subscription

  constructor(
    private router: Router,
    private cartService: CartService,
    private dataService: DataService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)

    this.tempList = this.dataService.cartItems.filter(res => res.bookQuantity >= 1);

    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllCart().subscribe(
        res => {
          this.cartList = res.data.filter((ele: cartObject) => ele.bookQuantity > 0);
          console.log('Server Cart:', this.cartList);
          this.cartList = this.updateCart(this.tempList, this.cartList);
          console.log('Updated Cart:', this.cartList);
        },
        err => console.log(err)
      );
    } else {
      this.cartList = [...this.tempList];
    }

    this.tempWishList = this.dataService.wishListItems;
    console.log(this.tempWishList, "1");

    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllWishList().subscribe(
        res => {
          this.wishList = res.data;
          this.wishList = this.updateWishList(this.tempWishList, this.wishList);
          console.log('wishList:', this.wishList);
        },
        err => console.error('Error fetching wishlist:', err)
      );
    } else {
      // Handle the case when the user is not authenticated
      // For example, use local storage or other means to manage the wishlist
    }


  }

  updateCart(tempCart: any[], serverCart: any[]): cartObject[] {
    for (const tempItem of tempCart) {
      const serverItem = serverCart.find(item => item.bookId === tempItem.bookId);
      if (serverItem) {
        serverItem.bookQuantity += tempItem.bookQuantity;
        this.cartService.updateQuantityCall(serverItem.bookId, serverItem.bookQuantity).subscribe(
          res => console.log('Updated Quantity:', res),
          err => console.log(err)
        );
      } else {
        serverCart.push(tempItem);
        this.cartService.addCartApiCall(tempItem.bookId, tempItem.bookQuantity).subscribe(
          res => console.log('Added to Cart:', res),
          err => console.log(err)
        );
      }
    }
    return serverCart;
  }
  
  updateWishList(tempWishList: any[], wishList: any[]): any[] {
    for (const tempItem of tempWishList) {
      const alreadyInWishList = wishList.some(item => item.bookId === tempItem.bookId);
      if (!alreadyInWishList) {
        wishList.push(tempItem);
        console.log(tempItem.bookId);
        
        this.httpService.addWishList(tempItem.bookId).subscribe(
          res => console.log('Added to wishList:', res),
          err => console.error('Error adding to wishList:', err)
        );
      }
    }
    return wishList;
  }


  handleBook(book: BookObject): void {
    this.router.navigate([`/bookDetail`, book.bookId]);
  }

}
