import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartObject } from 'src/assets/cartObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  cartItems:cartObject[]=[]
  wishListItems:any[]=[]

  private searchString = new BehaviorSubject('');
  currSearchString = this.searchString.asObservable();
  
  constructor() { }
  addToCart(book: cartObject) {
    this.cartItems.push(book);
    console.log(this.cartItems);
  }
  addToWishList(wishList: any) {
    this.wishListItems.push(wishList);
    console.log(this.wishListItems);
  }
  updateSearchString(state:string){
    this.searchString.next(state)
   }
}
