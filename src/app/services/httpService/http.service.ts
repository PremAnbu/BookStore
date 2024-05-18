import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "https://localhost:7098/api";
  private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJwcmVta3VtYXJhbmJ1YUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6IlByZW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiOTM2MTAwMjQwNSIsIm5iZiI6MTcxNTkzMTgwNSwiZXhwIjoxNzE2NTM2NjA1LCJpYXQiOjE3MTU5MzE4MDV9.vx_io7Rcx7jrhyhiUWGVl_6tDUXAHpnOark3uWeN8tQ";
  
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
}
