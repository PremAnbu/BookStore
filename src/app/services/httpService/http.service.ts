import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // baseUrl:string="https://localhost:7098/api"

  constructor(private http:HttpClient){}
   
  getAllBooks():Observable<any>
  {
      return this.http.get<any>("https://localhost:7098/api/Book")
  }}
