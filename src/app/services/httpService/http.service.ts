import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../dataService/data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "https://localhost:7098/api";
  token:string=this.dataService.token;
  private authHeader = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });
  
  // private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJwcmVta3VtYXJhbmJ1YUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6IlByZW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiOTM2MTAwMjQwNSIsIm5iZiI6MTcxNjI3MjU4MCwiZXhwIjoxNzE2ODc3MzgwLCJpYXQiOjE3MTYyNzI1ODB9.cg375oM8jf2z82M8fz5vZv1ykWi51nr7fvXjTyT5Sa4";
  // private staticTokenHeader = new HttpHeaders({
  //   'Authorization': `Bearer ${this.token}`
  // });

  constructor(private http: HttpClient,private dataService:DataService) {
  }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Book`);
  }
  getAllCart(token? : any): Observable<any> {
    if(token!=''&& token!=undefined){
        return this.http.get<any>(`${this.apiUrl}/ShoppingCart/GetCartBooks`, { headers:new  HttpHeaders({Authorization: `Bearer ${token}` || ""})});        
      }
    return this.http.get<any>(`${this.apiUrl}/ShoppingCart/GetCartBooks`, { headers: this.authHeader });
  }

  addCart(bookId: number, bookQuantity: number,token? : any): Observable<any> {
    if(token!=''&& token!=undefined){
        return this.http.post<any>(`${this.apiUrl}/ShoppingCart/AddToCart`, { headers:new  HttpHeaders({Authorization: `Bearer ${token}` || ""})});
      }
    return this.http.post<any>(`${this.apiUrl}/ShoppingCart/AddToCart`, { bookQuantity, bookId }, { headers: this.authHeader });
  }

  loginApi(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
  }

  signupApi(body: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users/SignUp`, body);
  }

  updateQuantity(bookId: number, bookQuantity: number,token? : any): Observable<any> {
    if(token!=''&& token!=undefined){
        return this.http.put<any>(`${this.apiUrl}/ShoppingCart/UpdateQuantity`, { headers:new  HttpHeaders({Authorization: `Bearer ${token}` || ""})});
      }
    return this.http.put<any>(`${this.apiUrl}/ShoppingCart/UpdateQuantity`, { bookQuantity, bookId }, { headers: this.authHeader });
  }

  removeCart(cartId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ShoppingCart/DeleteCart?cartId=${cartId}`, { headers: this.authHeader });
  }

  addAddress(body:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Address`, body, { headers: this.authHeader });
  }

  getAddress(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Address/GetAddress`, { headers: this.authHeader });
  }

  addOrder(body:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Order`, body, { headers: this.authHeader });
  }

  getAllOrder(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Order/GetOrder`, { headers: this.authHeader });
  }

  removeAddress(addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Address/DeleteAddress?addressId=${addressId}`, { headers: this.authHeader });
  }

  addWishList(bookId:number,token? : any): Observable<any> {
    if(token!=''&& token!=undefined){
        return this.http.post <any>(`https://localhost:7098/api/WishList?bookId=${bookId}`, { headers:new  HttpHeaders({Authorization: `Bearer ${token}` || ""})});
      }
    return this.http.post<any>(`https://localhost:7098/api/WishList?bookId=${bookId}`,{},{ headers: this.authHeader });
  }

  getAllWishList(token? : any): Observable<any> {
    if(token!=''&& token!=undefined){
        return this.http.get<any>(`${this.apiUrl}/WishList/GetAllWishList`, { headers:new  HttpHeaders({Authorization: `Bearer ${token}` || ""})});
      }
    return this.http.get<any>(`${this.apiUrl}/WishList/GetAllWishList`, { headers: this.authHeader });
  }

  removeWishList(wishListId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/WishList/DeleteWishList?wishListId=${wishListId}`, { headers: this.authHeader });
  }

  updataAddress(body:any){
    return this.http.put<any>(`${this.apiUrl}/Address/UpdateAddress`, body,{ headers: this.authHeader });
  }

}
