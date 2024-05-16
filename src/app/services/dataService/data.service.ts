import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cartItems:any[]=[]

  constructor() { }
  addToCart(book: any) {
    this.cartItems.push(book);
  }
}
