import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartObject } from 'src/assets/cartObjectInterface';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList! :cartObject[]

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartService,private router:Router) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
   }

  ngOnInit(): void {
    this.cartService.currentCartState.subscribe(result1 => {
          this.cartList=result1.filter((e:any) => e.quantity>=1)
        }
    );

  }
  increaseCount(book:any) {
    this.cartService.updateQuantityCall(book.bookId,++book.quantity).subscribe(res =>{
      console.log(res);
    },err => console.log(err)
    )
  }

  decreaseCount(book:any) {
    if (book.quantity > 1) {
      this.cartService.updateQuantityCall(book.bookId,--book.quantity).subscribe(res =>{
        console.log(res);
      },err => console.log(err)
      )
    }
  }
  placeOrder(book:any){
    this.router.navigate([`/customerAdderss`,book.bookId])
  }



}
