import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'DiscountedPrice', 'ActualPrice'];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts()
      .subscribe(
        (data: Product[]) => {
          this.products = data;
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
}