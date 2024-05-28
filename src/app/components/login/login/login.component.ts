import { DataService } from 'src/app/services/dataService/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartObject } from 'src/assets/cartObjectInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token!: string;
  CartValue!: cartObject[];
  cartList!: cartObject[];
  tempList!: cartObject[];
  tempWishList: any[] = [];
  wishList: any[] = [];

  constructor(private formBuilder: FormBuilder, private bookService: BookService,
              private cartService: CartService, private dataService: DataService,
              private httpService: HttpService, private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  handleLogin() {
    if (this.loginForm.invalid) return;
    this.tempList = this.dataService.cartItems.filter(res => res.bookQuantity >= 1);

    const { email, password } = this.loginForm.controls;
    this.userService.loginApi(email.value, password.value).subscribe(res => {
      this.token = res.data;
      localStorage.setItem("authToken", res.data);
      localStorage.setItem("token", res.data);
      this.dataService.addToToken(res.data);
      // this.router.navigate(["/books"]);

    if (res.data != null) {
      this.httpService.getAllCart().subscribe(
        res => {
          this.cartList = res.data.filter((ele: cartObject) => ele.bookQuantity > 0);
          console.log('Server Cart:', this.cartList,this.tempList);
          this.cartList = this.updateCart(this.tempList, this.cartList);
          console.log('Updated Cart:', this.cartList);
          // this.dataService.updateCartList(this.cartList); /// Update the DataService
          this.httpService.getAllCart().subscribe(res => {
            this.dataService.updateCartList(res.data); 
          })
        },
        err => console.log(err)
      );
    } else {
      this.cartList = [...this.tempList];
      // this.dataService.updateCartList(this.cartList); // Update the DataService
    }

    this.tempWishList = this.dataService.wishListItems;

    if (res.data != null) {
      this.httpService.getAllWishList().subscribe(
        res => {
          this.wishList = res.data;
          this.wishList = this.updateWishList(this.tempWishList, this.wishList);
          console.log('wishList:', this.wishList);
          this.dataService.updateWishList(this.wishList); 
          this.httpService.getAllWishList().subscribe(
            res => {
              this.dataService.updateWishList(res.data);
            });
        },
        err => console.error('Error fetching wishlist:', err)
      );
    } else {
      this.dataService.updateWishList(this.tempWishList); 
    }
  }, err => console.log(err));
  }

  updateCart(tempCart: any[], serverCart: any[]): cartObject[] {
    for (const tempItem of tempCart) {
      const serverItem = serverCart.find(item => item.bookId === tempItem.bookId);
      if (serverItem) {
        serverItem.bookQuantity += tempItem.bookQuantity;
        this.cartService.updateQuantityCall(serverItem.bookId, serverItem.bookQuantity).subscribe(
          res => console.log('Updated Quantity:', res),
          err => console.log(err)
        );
      } else {
        serverCart.push(tempItem);
        this.cartService.addCartApiCall(tempItem.bookId, tempItem.bookQuantity).subscribe(
          res => console.log('Added to Cart:', res),
          err => console.log(err)
        );
      }
    }
    return serverCart;
  }

  updateWishList(tempWishList: any[], wishList: any[]): any[] {
    for (const tempItem of tempWishList) {
      const alreadyInWishList = wishList.some(item => item.bookId === tempItem.bookId);
      if (!alreadyInWishList) {
        wishList.push(tempItem);
        console.log(tempItem.bookId);
        this.httpService.addWishList(tempItem.bookId).subscribe(
          res => console.log('Added to wishList:', res),
          err => console.error('Error adding to wishList:', err)
        );
      }
    }
    return wishList;
  }
}
