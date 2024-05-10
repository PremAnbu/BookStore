import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CART_ICON, PROFILE_ICON, SEARCH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-bookstore-header',
  templateUrl: './bookstore-header.component.html',
  styleUrls: ['./bookstore-header.component.scss']
})
export class BookstoreHeaderComponent implements OnInit {

  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry) {
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("profile-icon", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON)),
    matIconRegistry.addSvgIconLiteral("cart-icon", domSanitizer.bypassSecurityTrustHtml(CART_ICON))
   }

  ngOnInit(): void {
  }

}
