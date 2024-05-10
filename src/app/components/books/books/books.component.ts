import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookService/book.service';
import { BookObject } from 'src/assets/BookObjectInterface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() BookObjectList !:any[]

  constructor(private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
  }

  handleBook(book:BookObject){
    this.bookService.changeState(book)
     this.router.navigate(["/dashboard/bookDetail"])

  }

}
