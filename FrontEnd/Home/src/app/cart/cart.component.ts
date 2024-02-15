import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from 'src/_model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  displayedColumns: string[] = ['Image', 'Action','Total'];
  cartProducts: any = [];

  constructor(private productService: ProductService, private router: Router, private imageProcessingService: ImageProcessingService) {

  }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts(): void {
    this.productService.getCartDetails()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.cartProducts = response.map((item: any) => {
            return {
              cardId: item.cardId,
              amount: item.amount,
              product: this.imageProcessingService.createImages(item.product),
              user: item.user
            };
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  checkout() {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  delete(cartId: any) {
    console.log(cartId)
    this.productService.deleteCartItem(cartId).subscribe(
      (response) => {
        console.log(response);
        this.getCartProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getTotalAmount(): string {
    let total = 0;
    this.cartProducts.forEach((cartItem: any) => {
      total += cartItem.amount * cartItem.product.productDiscountedPrice;
    });
    return total.toFixed(2);
  }

  getTotalDiscount(): string {
    let total = 0;
    this.cartProducts.forEach((cartItem: any) => {
      total += cartItem.amount * (cartItem.product.productActualPrice - cartItem.product.productDiscountedPrice);
    });
    return total.toFixed(2);
  }
  
  increaseProductAmount(productId : number){
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
        this.getCartProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decreaseProductAmount(productId:number){
    this.productService.removeFromCart(productId).subscribe(
      (response) => {
        console.log(response);
        this.getCartProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAmount(price:number,amount:number){
    let total = price * amount;
    return total.toFixed(2);
  }
}
