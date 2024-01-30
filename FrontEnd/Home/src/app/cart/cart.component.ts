import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { response } from 'express';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'DiscountedPrice'];
  cartDetails : any = [];

  constructor(private productService : ProductService){

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
}
