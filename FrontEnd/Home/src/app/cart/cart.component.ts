import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'DiscountedPrice','Action'];
  cartDetails : any = [];

  constructor(private productService : ProductService, private router : Router){

  }

  ngOnInit(){
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  checkout(){

    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  delete(cartId: any){
    console.log(cartId)
    this.productService.deleteCartItem(cartId).subscribe(
      (response) =>{
        console.log(response);
        this.getCartDetails();
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}