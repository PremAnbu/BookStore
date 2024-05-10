import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';
import { BookObject } from 'src/assets/BookObjectInterface';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookDetail!: BookObject;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.currentstate.subscribe(res => {
      this.bookDetail = res;
    });
    this.bookService.currentstate.subscribe(res=>console.log(res));
    
  }

}
