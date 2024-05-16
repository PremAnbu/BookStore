import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { cartObject } from 'src/assets/cartObjectInterface';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  cartList!: cartObject;
  order: boolean = true;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private cartService: CartService, private route: ActivatedRoute, private dataService: DataService) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));
  }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.currentCartState.subscribe(result1 => {
        this.route.params.subscribe((result2) => {
          this.cartList = result1.filter((e: any) => e.bookId == result2['bookId'])[0];
        })
      });
    } else {
      this.route.params.subscribe((result2) => {
        this.cartList = this.dataService.cartItems.filter((e: any) => e.bookId == result2['bookId'])[0];
      })
    }
  }

  increaseCount(book: any) {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.updateQuantityCall(book.bookId, ++book.bookQuantity).subscribe(res => {
        this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
          this.cartService.changeState(updatedCartData.data);
        });
      }, err => console.log(err));
    } else {
      this.dataService.cartItems.forEach((cartItem: cartObject) => {
        if (cartItem.bookId === book.bookId) {
          cartItem.bookQuantity = ++cartItem.bookQuantity;
        }
      });
    }
  }

  decreaseCount(book: any) {
    if (book.quantity > 1) {
      if (localStorage.getItem('authToken') != null) {
        this.cartService.updateQuantityCall(book.bookId, --book.bookQuantity).subscribe(res => {
          this.cartService.getAllCartApiCall().subscribe(updatedCartData => {
            this.cartService.changeState(updatedCartData.data);
          });       
         }, err => console.log(err));
      } else {
        this.dataService.cartItems.forEach((cartItem: cartObject) => {
          if (cartItem.bookId === book.bookId) {
            cartItem.bookQuantity = --cartItem.bookQuantity;
          }
        });
      }
    }
  }

  orderSummery() {
    this.order = false;
  }
}
