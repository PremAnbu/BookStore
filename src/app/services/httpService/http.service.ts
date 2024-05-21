import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "https://localhost:7098/api";
  private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJwcmVta3VtYXJhbmJ1YUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6IlByZW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiOTM2MTAwMjQwNSIsIm5iZiI6MTcxNjI3MjU4MCwiZXhwIjoxNzE2ODc3MzgwLCJpYXQiOjE3MTYyNzI1ODB9.cg375oM8jf2z82M8fz5vZv1ykWi51nr7fvXjTyT5Sa4";
  
  private authHeader = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });

  private staticTokenHeader = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Book`);
  }
  getAllCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ShoppingCart/GetCartBooks`, { headers: this.staticTokenHeader });
  }
  addCart(bookId: number, bookQuantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ShoppingCart/AddToCart`, { bookQuantity, bookId }, { headers: this.staticTokenHeader });
  }
  loginApi(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
  }
  signupApi(body: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users/SignUp`, body);
  }
  updateQuantity(bookId: number, bookQuantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ShoppingCart/UpdateQuantity`, { bookQuantity, bookId }, { headers: this.staticTokenHeader });
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
    return this.http.get<any>(`${this.apiUrl}/Order/GetOrder`, { headers: this.staticTokenHeader });
  }
  removeAddress(addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Address/DeleteAddress?addressId=${addressId}`, { headers: this.authHeader });
  }
  addWishList(bookId:number): Observable<any> {
    console.log(bookId,"http");
    return this.http.post<any>(`https://localhost:7098/api/WishList?bookId=${bookId}`,{},{ headers: this.staticTokenHeader });
  }
  getAllWishList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/WishList/GetAllWishList`, { headers: this.staticTokenHeader });
  }
  removeWishList(wishListId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/WishList/DeleteWishList?wishListId=${wishListId}`, { headers: this.authHeader });
  }
  updataAddress(body:any){
    return this.http.put<any>(`${this.apiUrl}/Address/UpdateAddress`, body, { headers: this.staticTokenHeader });
  }
}
