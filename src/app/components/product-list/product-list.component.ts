import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: any[] = [];
  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Fetch data from API
    this.service.getProductList().subscribe((apiData: any) => {
      const localStorageData = this.service.getLocalstorage();
      this.productList = apiData.burgers.map((apiItem: { id: any }) => {
        const localItem = localStorageData.find(
          (item: any) => item.id === apiItem.id
        );
        return localItem ? { ...apiItem, ...localItem } : apiItem;
      });
    });
  }

  increaseQuantity(item: any, productId: any) {
    this.service.increaseQuantity(item, productId, this.productList);
  }

  decreaseQuantity(item: any, productId: any) {
    this.service.decreaseQuantity(item, productId, this.productList);
  }
}
