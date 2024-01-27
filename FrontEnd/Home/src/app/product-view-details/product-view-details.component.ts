import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/_model/product.model';
@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {
  selectedProductIndex = 0;
  product : any;
  constructor(private activatedRoute : ActivatedRoute,private router : Router){

  }
  ngOnInit(): void{
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);

  }
  changeIndex(index:number){
    this.selectedProductIndex = index;
  }

  buyProduct(productId : number){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: true,
      id: productId
    }]);
  }
}
