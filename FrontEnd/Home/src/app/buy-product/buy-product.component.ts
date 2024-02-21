import { NgFor } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl } from '@angular/forms';
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

  countryForm: FormGroup;
  countries = [
    { name: 'Country 1', counties: ['county 1', 'county 2', 'county 3'] },
    { name: 'Country 2', counties: ['county 4', 'county 5', 'county 6'] },
    // Add more countries and cities as needed
  ];


  productDetails: Product[] = [];
  isSingleProductCheckout : any = '';
  cartProducts: any = [];
  deliveryChose : string = "";
  deliveryOption: string[]=["Home Delivery","Easy Box","At Store"];

  deliveryForm: FormGroup;
  submitAttempted: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  
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

  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef,private imageProcessingService:ImageProcessingService,private paymentService : PaymentServiceService,private activatedRoute : ActivatedRoute, private productService: ProductService,private router:Router){
    this.countryForm = this.formBuilder.group({
      country: [''],
      city: ['']
    });
    this.deliveryForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetno: ['', Validators.required],
  });
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
  getProductsCounter() : number{
    let counter = 0;
    this.cartProducts.forEach((cartItem: any) => {
      counter += cartItem.amount;
    });
    return counter;
  }

  get selectedCountryCounty() {
    const countryControl = this.countryForm.get('country');
    if (countryControl) {
      const selectedCountry = countryControl.value;
      const country = this.countries.find(c => c.name === selectedCountry);
      return country ? country.counties : [];
    }
    return null;
  }

  homeDelivery(){
    if(this.deliveryChose=="Home Delivery"){
      return true;
    }
    else return false;
  }

  submitForm() {
    this.submitAttempted = true;
    console.log(this.submitAttempted);
    if (this.deliveryForm.valid) {
      // Form is valid, proceed with submission logic
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, highlight invalid fields
      console.log("Form contains errors!");
    }
  }
}
