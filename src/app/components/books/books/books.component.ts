import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { BookService } from 'src/app/services/bookService/book.service';
// import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
// import { HttpService } from 'src/app/services/httpService/http.service';
import { BookObject } from 'src/assets/BookObjectInterface';
// import { cartObject } from 'src/assets/cartObjectInterface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() BookObjectList!: BookObject[];
  // CartValue!: cartObject[];
  // cartList!: cartObject[];
  // tempList!: cartObject[];
  // tempWishList : any[]=[]
  // wishList : any[]=[]
  searchString:string=''  
  subscription!:Subscription

  constructor(private router: Router,private dataService: DataService)
   { }

  ngOnInit(): void {
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)
  }

  handleBook(book: BookObject): void {
    this.router.navigate([`/bookDetail`, book.bookId]);
  }
}
