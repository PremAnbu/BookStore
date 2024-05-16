import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { cartObject } from 'src/assets/cartObjectInterface';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginSignupComponent } from '../../loginSignup/login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList! :cartObject[]

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartService,private router:Router,private dataService:DataService,private dialog: MatDialog)
   {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
   }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.currentCartState.subscribe(result1 => {
          this.cartList = result1.filter((e: any) => e.bookQuantity >= 1);
      });
    }
     else {
      this.cartList = this.dataService.cartItems.filter(res => res.bookQuantity >= 1);
    }
  }

  increaseCount(book:any) {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.updateQuantityCall(book.bookId,++book.bookQuantity).subscribe(res =>{
        this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
          this.cartService.changeState(updatedCartData.data);
        });
    },err => console.log(err)
    )}
    else{
      this.dataService.cartItems.forEach((cartItem: cartObject) => {
        if (cartItem.bookId === book.bookId) {
            cartItem.bookQuantity = ++cartItem.bookQuantity;
        }
      });  
    }
  }

  decreaseCount(book:any) {
    if (book.quantity > 1) {
      if (localStorage.getItem('authToken') != null) {
        this.cartService.updateQuantityCall(book.bookId,--book.bookQuantity).subscribe(res =>{
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData.data);
          });
      },err => console.log(err)
      )}
      else{
        this.dataService.cartItems.forEach((cartItem: cartObject) => {
        if (cartItem.bookId === book.bookId) {
            cartItem.bookQuantity = --cartItem.bookQuantity;
        }
        });  
      }
    }
  }

  placeOrder(book:any){
    if (localStorage.getItem('authToken') != null)this.router.navigate([`/customerAdderss`,book.bookId]);
    else {
      const dialogRef = this.dialog.open(LoginSignupComponent, { width: '720px', height: '480px' });
      dialogRef.afterClosed().subscribe((result:any) => {});
    }
  }

  removeCart(book:any){
    if (localStorage.getItem('authToken') != null) {
      this.cartList=this.cartList.filter(res=> book.cartId != res.cartId)
    this.cartService.removeCartCall(book.cartId).subscribe(res =>{
      this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
        this.cartService.changeState(updatedCartData.data);
      });
    },err => console.log(err)
    )}
    else{
      this.dataService.cartItems = this.dataService.cartItems.filter(cartItem => cartItem.bookId !== book.bookId); 
    }
  }
}
