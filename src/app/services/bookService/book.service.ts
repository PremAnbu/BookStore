import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../httpService/http.service';
import { BookObject } from 'src/assets/BookObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookobj  =new BehaviorSubject<BookObject>({});

  currentstate=this.bookobj.asObservable();

  changeState(value:BookObject)
  {
    this.bookobj.next(value)
  }

  constructor(private httpService:HttpService) { }

  getAllBooksCall() {
    return this.httpService.getAllBooks();
  }


}
