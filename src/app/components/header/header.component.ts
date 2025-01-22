import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItem: any = [];
  constructor(private sharedStateService: ProductService) {}
  ngOnInit(): void {
    this.sharedStateService.currentState$.subscribe((state) => {
      this.cartItem = state;
    });
  }
}
