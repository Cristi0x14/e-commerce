import { Component, ElementRef, ViewChild,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentServiceService } from '../payment-service.service';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  
  constructor(private router : Router, private paymentService: PaymentServiceService,private ngZone: NgZone){}

  amountUSD : number = 0;
  amountLei : number = 0;

  ngOnInit() : void {
    this.amountLei=this.paymentService.amountToPay;
    this.amountUSD=this.amountLei*0.22;
    window.paypal.Buttons(
      {
        createOrder: (data:any,actions:any) =>{
          return actions.order.create({
            purchase_units:[
              {
                amount: {
                  value:this.amountUSD.toFixed(2).toString(),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.ngZone.run(() => { 
              if (details.status === 'COMPLETED') {
                this.paymentService.transcationId = details.id;
                this.router.navigate(['orderConfirm']);
              }
            });
          })
        },
        onError : (error:any) =>{
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  @ViewChild('paymentRef',{static : true}) paymentRef!:ElementRef;
  
  cancel(){
    this.router.navigate(['cart']);
  }
}
