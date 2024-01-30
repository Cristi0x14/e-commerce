import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ShowProductDetailsImagesComponent } from '../show-product-details-images/show-product-details-images.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  products: Product[] = [];
  pageNumber: number = 0;
  showTable = false;
  showLoadMoreProductButton = false;
  searchKey: String = "";

  displayedColumns: string[] = ['Id', 'Name', 'productdescription', 'DiscountedPrice', 'ActualPrice', 'Actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(searchKey: String = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (data: Product[]) => {
          data.forEach(p => this.products.push(p));
          this.showTable = true;
          if (data.length == 10) {
            this.showLoadMoreProductButton = true;
          }
          else {
            this.showLoadMoreProductButton = false;
          }
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.loadProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  showImages(product: Product) {
    this.imagesDialog.open(ShowProductDetailsImagesComponent, {
      data: {
        images: product.productImages
      },
      height: '500px', width: '800px'
    })
  }

  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.loadProducts();
  }

  public searchByKeyword(searchKeyword: String) {
    //console.log(searchKeyword);
    this.searchKey = searchKeyword;
    this.pageNumber = 0;
    this.products = [];
    this.loadProducts(this.searchKey);
  }
}