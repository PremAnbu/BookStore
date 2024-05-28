import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { cartObject } from 'src/assets/cartObjectInterface';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginSignupComponent } from '../../loginSignup/login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/httpService/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList! :cartObject[]
  order: boolean = true;
  editaddress: boolean = true;
  editadd: any = {};
  addressList: any[] = [];
  addressForm!: FormGroup;
  orderaddress: any;
  placeorder: boolean=true;
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
    private router:Router,
    private dialog: MatDialog,

  ) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));
  }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllCart().subscribe(result1 => {
          this.cartList = result1.data.filter((e: any) => e.bookQuantity >= 1);
      });
      this.loadAddresses();
    }
     else {
      this.cartList = this.dataService.cartItems.filter(res => res.bookQuantity >= 1);
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

  placeOrder(){
    if (localStorage.getItem('authToken') != null)this.placeorder=false;
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

  loadAddresses() {
    // this.dataService.currAddressList.subscribe(res => {
      this.httpService.getAddress().subscribe(res => {
      this.addressList = res.data;
    });
  }

  handleAddress() {
    if (this.addressForm.invalid) {
      console.log('Form is invalid');return;
    }
    const userData = this.addressForm.value;
    if (this.editadd && this.editadd.addressId) {
      userData.addressId = this.editadd.addressId;
      this.httpService.updataAddress(userData).subscribe((res: any) => {
          this.updateAddressListInService(userData);
          this.loadAddresses(); 
        },
        (err: any) => console.log(err)
      );
    } else {
      console.log(userData);
      this.httpService.addAddress(userData).subscribe((res: any) => {
          this.updateAddressListInService(userData);
          this.loadAddresses(); 
        },
        (err: any) => console.log(err)
      );
    }
    this.editaddress = true;
  }
  
  updateAddressListInService(newAddress: any) {
    let currentAddresses = this.dataService.getAddressListValue(); 
    let updatedAddresses;
  
    if (newAddress.addressId) {
      updatedAddresses = currentAddresses.map(address =>
        address.addressId === newAddress.addressId ? newAddress : address
      );
    } else {
      updatedAddresses = [...currentAddresses, newAddress];
    }
  
    this.dataService.updateAddressList(updatedAddresses); 
  }
  
  
  

  orderAddress(address: any) {
    this.order = false;
    this.orderaddress = address;
    console.log(this.orderaddress);
  }

  orderSummery() {
    this.order = false;
  }

  editAddress(address: any) {
    this.editaddress = false;
    this.editadd = address;
    this.addressForm.patchValue({
      addressId: address.addressId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
      userId: address.userId
    });
  }

  removeAddress(addressId: number) {
    this.httpService.removeAddress(addressId).subscribe(res => {
      this.dataService.currAddressList.subscribe(addresses => {
        const updatedAddresses = addresses.filter(address => address.addressId !== addressId);
        this.dataService.updateAddressList(updatedAddresses);
      });  
      this.loadAddresses();
    }, err => {
      console.error('Error removing address', err);
    });
  }
  

  handleOrder() {
    const orderDate = new Date();
    const displayOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formattedOrderDate = orderDate.toLocaleDateString('en-US', displayOptions); // Format for display, e.g., "May 26"
    const isoOrderDate = orderDate.toISOString(); // Format for sending to the server, e.g., "2024-05-26T14:15:22.123Z"
  
    const orders = this.cartList.map(book => ({
      addressId: this.orderaddress.addressId,
      orderDate: isoOrderDate,
      bookId: book.bookId
    }));
  
    const processNextOrder = (index: number) => {
      if (index < orders.length) {
        const orderBody = orders[index];
        this.httpService.addOrder(orderBody).subscribe(res => {
          const order = {
            orderId: res.data[0],
            orderDate: formattedOrderDate, 
            bookId: this.cartList[index].bookId,
            title: this.cartList[index].title,
            author: this.cartList[index].author,
            price: this.cartList[index].price,
            imagePath: this.cartList[index].imagePath
          };
  
          let currentOrderList: any[] = this.dataService.getOrderListValue();
          const updatedOrderList = [...currentOrderList, order];
          this.dataService.updateOrderList(updatedOrderList);
  
          // Remove cart item
          this.httpService.removeCart(this.cartList[index].cartId).subscribe(() => {
            processNextOrder(index + 1);
          }, err => {
            console.error('Error removing cart', err);
            processNextOrder(index + 1); // Continue processing the next order even if an error occurs
          });
        }, err => {
          console.error('Error adding order', err);
          processNextOrder(index + 1); // Continue processing the next order even if an error occurs
        });
      } else {
        this.router.navigate(['/orderPlaced']);
      }
    };
    processNextOrder(0);
  }
}
