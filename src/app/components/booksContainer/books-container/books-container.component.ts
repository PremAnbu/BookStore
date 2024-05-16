import { DomSanitizer } from '@angular/platform-browser';
import { BookObject } from 'src/assets/BookObjectInterface';
import { BookService } from './../../../services/bookService/book.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DROP_DOWN } from 'src/assets/svg-icons';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {

  booksList!: BookObject[];

  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private bookService:BookService) {
    matIconRegistry.addSvgIconLiteral("dropdown-icon", domSanitizer.bypassSecurityTrustHtml(DROP_DOWN))
   }

  ngOnInit(): void {
    this.bookService.currentBookState .subscribe(res=>this.booksList=res)
  }
}
