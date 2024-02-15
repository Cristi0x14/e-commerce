import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from 'src/_model/order-details.model';
import { Product } from 'src/_model/product.model';
import { ProductService } from '../_services/product.service';
import { PaymentServiceService } from '../payment-service.service';
import { ImageProcessingService } from '../image-processing.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent {

  productDetails: Product[] = [];
  isSingleProductCheckout : any = '';
  amount: number = 199;
  cartProducts: any = [];

  
  ngOnInit() : void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity: 1}
      )
    );
    this.getCartProducts();
  }

  constructor(private imageProcessingService:ImageProcessingService,private paymentService : PaymentServiceService,private activatedRoute : ActivatedRoute, private productService: ProductService,private router:Router){

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

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/payment"]);
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  getQuantityForProduct(productId : Number){
    const filteredProduct= this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )
    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productDiscountedPrice: number,amount:number){
    // const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
    //   (productQuantity) => productQuantity.productId === productId
    // );
    return (productDiscountedPrice * amount).toFixed(2);
  }

  onQuantityChanged(quantity:any, productId:number){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quantity;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );
    this.paymentService.amountToPay=grandTotal;
    return grandTotal;
  }
  getTotalAmount(): string {
    let total = 0;
    this.cartProducts.forEach((cartItem: any) => {
      total += cartItem.amount * cartItem.product.productDiscountedPrice;
    });
    return total.toFixed(2);
  }
}
