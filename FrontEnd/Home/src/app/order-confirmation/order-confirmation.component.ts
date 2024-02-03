import { Component } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  transactionId="";
  constructor(private paymentService:PaymentServiceService){}
  ngOnInit():void{
    this.transactionId =this.paymentService.transcationId;
  }
}
