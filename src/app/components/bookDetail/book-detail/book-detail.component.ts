import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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

  bookDetail!: any;
  cartDetail!: cartObject;
  addedToBag:boolean=false;
  count:number=1;

  constructor(private bookService: BookService,private cartService:CartService,private route:ActivatedRoute) {

   }

  ngOnInit(): void {   
    this.bookService.currentBookState.subscribe(result1 => {
      this.route.params.subscribe((result2)=>
        {
          this.bookDetail=result1.filter((e:BookObject) => e.bookId==result2['bookId'])[0]
        })
    });
    this.cartService.currentCartState.subscribe(result1 => {
      this.route.params.subscribe((result2)=>
        {
          this.cartDetail=result1.filter((e:any) => e.bookId==result2['bookId'])[0]
        })
        if(this.cartDetail.quantity>0){
            this.count=this.cartDetail.quantity
            this.addedToBag=true
        }
    });
  }
  addToBag() {
      if(this.addedToBag==false){
        this.cartService.addCartApiCall(this.bookDetail.bookId,1).subscribe(res=>{
          console.log(res); 
        })
      }
      this.addedToBag = true;

  }
      
  increaseCount() {
    this.count++;
    if(localStorage.getItem.length>1){
    this.cartService.updateQuantityCall(this.bookDetail.bookId,this.count).subscribe(res =>{
      console.log(res);
    },err => console.log(err)
    )
  }
  }

  decreaseCount() {
    if (this.count > 1) {
      this.count--
      if(localStorage.getItem.length>1){
      this.cartService.updateQuantityCall(this.bookDetail.bookId,this.count).subscribe(res =>{
        console.log(res);
      },err => console.log(err)
      )
    }
    }
  }

}
