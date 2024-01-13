import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products : Product[]= [];

  constructor(private productService: ProductService,private imageProcessingService: ImageProcessingService){

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
}
