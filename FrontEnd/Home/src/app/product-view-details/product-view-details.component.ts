import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/_model/product.model';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { ColorSizes } from 'src/_model/colorSize.model';
@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {
  selectedProductIndex = 0;
  product!: Product;
  colorSizes: ColorSizes[] = [];
  sizes: string[] = [];
  sizeRows: string[][] = [];
  colorRows: string[][] = [];
  colors: string[]=[];
  chunkArray(array: string[], size: number): string[][] {
    const chunkedArray = [];
    let index = 0;
    while (index < array.length) {
      const chunk = array[index].split(',');
      chunkedArray.push(chunk);
      index += size;
    }
    return chunkedArray;
  }
  





  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) {

  }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.productService.getProductVariationsById(this.product.productId)
    .subscribe(
      (data: ColorSizes[]) => {
        data.forEach(p => this.colorSizes.push(p));
        this.product.colorSizes=this.colorSizes;
        this.sizes = this.colorSizes[0].sizes.split(", ");
        this.sizeRows = this.chunkArray(this.sizes, 3);

        this.colorSizes.forEach(p => this.colors.push(p.color));
        const stringColors: string=this.colors.toString();
        this.colors=[];
        this.colors[0]=stringColors;
        this.colorRows = this.chunkArray(this.colors, 3);
        console.log(this.colors);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    )
    console.log(this.product);

  }
  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: number) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true,
      id: productId
    }]);
  }
  addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
