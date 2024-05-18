import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DELETE_FOREVER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor( private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry) {
      matIconRegistry.addSvgIconLiteral("delete-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));

     }

  ngOnInit(): void {
  }

}
