import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // baseUrl:string="https://localhost:7098/api"
  private authHeader=new HttpHeaders({Authorization:`Bearer ${localStorage.getItem('authToken')}`})

  constructor(private http:HttpClient){}
   
  getAllBooks():Observable<any>{
    return this.http.get<any>("https://localhost:7098/api/Book")
  }
  getAllCart():Observable<any>{
    return this.http.get<any>("https://localhost:7098/api/ShoppingCart/GetCartBooks",{headers:this.authHeader})
  }
  addCart(bookId:number,quantity:number):Observable<any>{
    return this.http.post<any>("https://localhost:7098/api/ShoppingCart/AddToCart",{"quantity":quantity,"bookId":bookId},{headers:this.authHeader})
  }
  loginApi(email: string, password: string) : Observable<any>{
    return this.http.get(`https://localhost:7098/api/User/${encodeURIComponent(email)}/${encodeURIComponent(password)}`)
  }
 signupApi(body: object): Observable<any> {
   return this.http.post(`https://localhost:7098/api/Users/SignUp`,body);
 }
 updateQuantity(bookId:number,quantity:number){
  return this.http.put(`https://localhost:7098/api/ShoppingCart/UpdateQuantity`,{ quantity: quantity,bookId: bookId},{headers:this.authHeader})
 }
}
