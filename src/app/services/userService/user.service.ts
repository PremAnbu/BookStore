import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }

  loginApi(email: string, password: string){
    return this.http.loginApi(email, password)
  }

  signupApi(userData: object){
    return this.http.signupApi(userData)
  }}
