import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private service: ProductService) {}
  cartItems: any = [];

  ngOnInit(): void {
    this.service.currentState$.subscribe((state) => {
      this.cartItems = state;
    });
  }

  get subtotal() {
    return this.cartItems.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    );
  }

  get discount() {
    return Math.floor(this.subtotal / 10); // Example discount value
  }

  get total() {
    return this.subtotal - this.discount;
  }

  increaseQuantity(item: any, productId: any) {
    this.service.increaseQuantity(item, productId, this.cartItems);
  }

  decreaseQuantity(item: any, productId: any) {
    this.service.decreaseQuantity(item, productId, this.cartItems);
  }

  removeItem(item: any, id: any) {
    const data = this.service.getLocalstorage();

    const index = data.findIndex((p: { id: any }) => p.id == id);
    console.log('index', index);
    data.splice(index, 1);
    this.service.setLocalStorage(data);
    this.service.updateState(data);
  }

  buyNow() {
    alert('Thank you for your purchase!');
  }
}
