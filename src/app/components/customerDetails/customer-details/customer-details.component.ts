import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/httpService/http.service';
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
  editaddress: boolean = true;
  editadd: any = {};
  addressList: any[] = [];
  addressForm!: FormGroup;
  orderaddress: any;
  orderId! : number;
  emptyAddress: any = { 
    addressId: null,
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };

  constructor(
    private fb: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private cartService: CartService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private httpService: HttpService,
    private router:Router
  ) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));
  }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.currentCartState.subscribe(result1 => {
        this.route.params.subscribe((result2) => {
          this.cartList = result1.filter((e: any) => e.bookId == result2['bookId'])[0];
        });
      });
      this.loadAddresses();
    }
     else {
      this.route.params.subscribe((result2) => {
        this.cartList = this.dataService.cartItems.filter((e: any) => e.bookId == result2['bookId'])[0];
      });
    }

    this.addressForm = this.fb.group({
      name: [this.emptyAddress.name, Validators.required],
      mobileNumber: [this.emptyAddress.mobileNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.emptyAddress.address, Validators.required],
      city: [this.emptyAddress.city, Validators.required],
      state: [this.emptyAddress.state, Validators.required],
      type: [this.emptyAddress.type, Validators.required]
    });
  }

  loadAddresses() {
    this.httpService.getAddress().subscribe(res => {
      this.addressList = res.data;
    });
  }

  handleaddress() {
    this.editaddress = false;
    if (this.addressForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const userData = this.addressForm.value;

    if (this.editadd && this.editadd.addressId) {
      this.httpService.updataAddress(userData).subscribe(
        (res:any) => {
          console.log(res);
          this.loadAddresses();
        },
        (err:any) => console.log(err)
      );
    } else {
      console.log(userData);
      
      this.httpService.addAddress(userData).subscribe(
        res => {console.log(res);
          this.loadAddresses();
        },
        err => console.log(err)
      );
    }
  }

  orderAddress(address: any) {
    this.order = false;
    this.orderaddress = address;
    console.log(this.orderaddress);
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
    if (book.bookQuantity > 1) {
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

  editAddress(address: any) {
    this.editaddress = false;
    this.editadd = address;
    this.addressForm.patchValue({
      addressId:address.addressId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
      userId:address.userId
    });
  }

  removeAddress(addressId: number) {
    this.httpService.removeAddress(addressId).subscribe(res => {
      this.loadAddresses();
    });
  }

  handleOrder() {
    const orderDate = new Date().toISOString().slice(0, 10);
    const orderBody = {
      addressId: this.orderaddress.addressId,
      orderDate: orderDate,
      bookId: this.cartList.bookId
    };
    this.httpService.addOrder(orderBody).subscribe(res => {
      this.orderId = res.data[0];
      console.log(this.orderId);
      this.httpService.removeCart(this.cartList.cartId).subscribe(() => {
        this.router.navigate([`/orderPlaced`, this.orderId]);
      }, err => {
        console.error('Error removing cart', err);
      });
    }, err => {
      console.error('Error adding order', err);
    });
  }
  
}
