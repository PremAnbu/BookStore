import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartObject } from 'src/assets/cartObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  cartItems:cartObject[]=[]
  wishListItems:any[]=[]
  token:any

  private searchString = new BehaviorSubject('');
  currSearchString = this.searchString.asObservable();

  private bookList =  new BehaviorSubject<any[]>([]);
  currBookList = this.bookList.asObservable();

  private cartList = new BehaviorSubject<any[]>([]);
  currCartList = this.cartList.asObservable();

  private wishList =new BehaviorSubject<any[]>([]);
  currWishList = this.wishList.asObservable();

  private addressList = new BehaviorSubject<any[]>([]);
  currAddressList = this.addressList.asObservable();
  
  private orderList = new BehaviorSubject<any[]>([]);
  currOrderList = this.orderList.asObservable();
  
  constructor() { }

  addToCart(book: cartObject) {
    this.cartItems.push(book);
  }
  addToWishList(wishList: any) {
    this.wishListItems.push(wishList);
  }
  updateSearchString(state:string){
    this.searchString.next(state)
   }
   updateBookList(state:any[]){
    this.bookList.next(state)
   }
   updateCartList(value:any[]){
     this.cartList.next(value)
   }
   updateAddressList(value:any[]){
    this.addressList.next(value)
   }
   updateWishList(value:any[]){
    this.wishList.next(value)
   }
   updateOrderList(value:any[]){
    this.orderList.next(value)
   }
   addToToken(setToken: any) {
    this.token=setToken;
  }

  getOrderListValue() {
    return this.orderList.getValue();
  }
  // Utility method to get the current value of addressList
  getAddressListValue(): any[] {
    return this.addressList.getValue();
  }
}
