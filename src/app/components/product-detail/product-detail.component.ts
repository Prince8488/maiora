import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productList: any = [];
  products: any = [];
  idFromUrl;
  constructor(private service: ProductService, private route: ActivatedRoute) {
    this.idFromUrl = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.service.getProductList().subscribe((res: any) => {
      this.productList = res.burgers;
      this.products = res.burgers;
      this.productList = this.productList.filter((item: any) => {
        return item.id == this.idFromUrl;
      });
      const localStorageData = this.service.getLocalstorage();
      this.productList = this.productList.map((apiItem: { id: any }) => {
        const localItem = localStorageData.find(
          (item: any) => item.id === apiItem.id
        );
        return localItem ? { ...apiItem, ...localItem } : apiItem;
      });

      console.log('this.productList', this.productList);
    });
  }

  increaseQuantity(item: any, productId: any) {
    this.service.increaseQuantity(item, productId, this.productList);
  }

  decreaseQuantity(item: any, productId: any) {
    this.service.decreaseQuantity(item, productId, this.productList);
  }
}
