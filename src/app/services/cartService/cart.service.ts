import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartobj  =new BehaviorSubject<any[]>([]);
  currentCartState=this.cartobj.asObservable();

  changeState(value:any[])
  {
    this.cartobj.next(value)
  }

  constructor(private httpService:HttpService) { }

  addCartApiCall(bookId:number,bookQuantity:number)
  {
    return this.httpService.addCart(bookId,bookQuantity)
  }
  getAllCartApiCall()
  {
    return this.httpService.getAllCart();
  }
  updateQuantityCall(bookId:number,bookQuantity:number){
    return this.httpService.updateQuantity(bookId,bookQuantity);
  }
  removeCartCall(cartId:number){
    return this.httpService.removeCart(cartId);
  }
}
