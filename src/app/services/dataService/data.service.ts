import { Injectable } from '@angular/core';
import { cartObject } from 'src/assets/cartObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  cartItems:cartObject[]=[]
  wishListItems:any[]=[]

  constructor() { }
  addToCart(book: cartObject) {
    this.cartItems.push(book);
    console.log(this.cartItems);
  }
  addToWishList(wishList: any) {
    this.wishListItems.push(wishList);
    console.log(this.wishListItems);
  }
}
