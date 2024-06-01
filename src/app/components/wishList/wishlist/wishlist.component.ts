import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DELETE_FOREVER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList! :any[]
  constructor( private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
    ,private httpService:HttpService,
    private dataService:DataService) {
    matIconRegistry.addSvgIconLiteral("delete-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
     }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {

      this.httpService.getAllWishList().subscribe(res =>{
            this.wishList=res.data
  })
  }   else {
    this.wishList = this.dataService.wishListItems;
  }
}
  removeWishList(wishListId:number,bookId:number){
    if (localStorage.getItem('authToken') != null) {
      this.httpService.removeWishList(wishListId).subscribe(res=>{
        // this.dataService.currWishList.subscribe(res =>{
        this.httpService.getAllWishList().subscribe(res=>{
          this.wishList=res.data
        })
      })
      }
      else{
        this.wishList = this.dataService.wishListItems.filter(item => item.bookId !== bookId);
        this.dataService.wishListItems=this.wishList;
      }
   }
}
