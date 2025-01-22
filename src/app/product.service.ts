import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = 'http://localhost:4200/assets/db.json';

  private stateSubject = new BehaviorSubject<any>(this.getLocalstorage());
  currentState$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) {}

  setLocalStorage(item: any) {
    return localStorage.setItem('products', JSON.stringify(item));
  }

  getLocalstorage(): any {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  updateState(newState: any): void {
    this.stateSubject.next(newState);
    this.setLocalStorage(newState);
  }

  getProductList() {
    return this.http.get(this.URL);
  }
  getProductListById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  increaseQuantity(item: any, productId: any, productList: any): void {
    const product = productList.find((p: any) => p.id == productId);
    if (product) {
      product.quantity++;
    }
    this.getItemLocalStorage(item, product);
  }

  getItemLocalStorage(item: any, product: any) {
    const { image, price, id, name } = item;
    const obj = {
      image,
      price,
      id,
      name,
      quantity: product.quantity,
    };
    if (!this.getLocalstorage()) this.setLocalStorage([obj]);
    else {
      const data = this.getLocalstorage();
      const itemExist = data.find((d: any) => d.id === obj.id);
      if (itemExist) itemExist.quantity = product.quantity;
      else data.push(obj);
      this.updateState(data);
    }
  }

  decreaseQuantity(item: any, productId: any, productList: any): void {
    const product = productList.find((p: any) => p.id == productId);
    if (product) {
      product.quantity--;
    }
    if (product.quantity == 0) {
      const data = this.getLocalstorage();

      const index = data.findIndex((p: { id: any }) => p.id == productId);
      data.splice(index, 1);
      this.setLocalStorage(data);
      this.updateState(data);
    } else this.getItemLocalStorage(item, product);
  }
}
