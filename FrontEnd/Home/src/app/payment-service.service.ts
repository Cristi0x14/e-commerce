import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor() { }

  amountToPay: number = 0;
  transcationId: string="NaN";
}
