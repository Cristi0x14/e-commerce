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

  products : Product[]= [];

  constructor(private productService: ProductService,private imageProcessingService: ImageProcessingService, private router : Router){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  public getAllProduct(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[],i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
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

  public showProductDetails(productId:number){
    this.router.navigate(['/productViewDetails/',{productId : productId}]);
  }
}
