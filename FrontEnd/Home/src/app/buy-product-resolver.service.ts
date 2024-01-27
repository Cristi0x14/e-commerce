import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from './_services/product.service';
import { Product } from 'src/_model/product.model';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService : ProductService,private imageProcessingSerice : ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    
    const id = Number(route.paramMap.get("id"));
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout") === 'true';

    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x: Product[], i) => x.map((product: Product) => this.imageProcessingSerice.createImages(product))
      )
    )
    ;
  }
}
