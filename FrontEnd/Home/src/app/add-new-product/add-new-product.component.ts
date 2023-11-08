import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/_model/product.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
  product: Product = { 
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
  }
  constructor() {}
  
  ngOnInit(): void{}

  addProduct(productForm: NgForm){
    console.log(this.product);
  }
}
