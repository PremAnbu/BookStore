import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { BookObject } from 'src/assets/BookObjectInterface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() BookObjectList!: BookObject[];
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
