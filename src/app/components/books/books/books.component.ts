import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private cartService: CartService,
    private dataService: DataService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
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

  handleBook(book: BookObject): void {
    this.router.navigate([`/bookDetail`, book.bookId]);
  }

}
