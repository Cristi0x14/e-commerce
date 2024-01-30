import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  pageNumber: number = 0;
  showLoadButton = false;
  searchKey: String = "";
  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService, private router: Router) {

  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  public getAllProduct(searchKey: String = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (data: Product[]) => {
          if (data.length == 10) {
            this.showLoadButton = true;
          }
          else {
            this.showLoadButton = false;
          }
          data.forEach(p => this.products.push(p));
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails/', { productId: productId }]);
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct(this.searchKey);
  }

  public searchByKeyword(searchKeyword: String) {
    //console.log(searchKeyword);
    this.searchKey = searchKeyword;
    this.pageNumber = 0;
    this.products = [];
    this.getAllProduct(this.searchKey);
  }
}
