import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import {CartServiceService} from '../../services/cart-service.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup;

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;

  creditCardYears:number[] = [];
  creditCardMonths:number[] = [];

  sameBillingAddress:boolean = false;

  constructor(private formBuilder:FormBuilder,private paymentService:PaymentService,private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      
      Customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:[''],
        phone:['']
      }),

      ShippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),

      BillingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),

      CreditCard: this.formBuilder.group({
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      }),

    })

    const startMonth = new Date().getMonth() + 1;
    this.paymentService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    this.paymentService.getCreditCardYears().subscribe(
      data =>{
        this.creditCardYears = data;
      }
    )
    
    this.listCart();

  }

  listCart(){
    // get a handle to cart items
    this.cartItems = this.cartService.cartItems;
    // subscribe to cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    // subscribe to cart totalValue
    this.cartService.totalQuantity.subscribe(
       data => this.totalQuantity = data
    )
    // compute total price
    this.cartService.calculateTotalPrice();
  }

  
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      const shipping = this.checkoutFormGroup.get('ShippingAddress');
      const billing = this.checkoutFormGroup.get('BillingAddress');
      billing.setValue(shipping.value);
      this.sameBillingAddress = true;
    }else{
      this.checkoutFormGroup.controls.BillingAddress.reset();
      this.sameBillingAddress = false;
    }
  }

  onSubmit(){
    // console.log(this.checkoutFormGroup.get('Customer').value);
    // console.log(this.checkoutFormGroup.get('ShippingAddress').value);
    // console.log(this.checkoutFormGroup.get('BillingAddress').value);
    // console.log(this.checkoutFormGroup.get('CreditCard').value);
  }

  handleMonthsYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get("CreditCard");
    const currentYear = new Date().getFullYear();
    const selectYear = Number(creditCardFormGroup.value.expirationYear);

    let startMonth:number;
    if(currentYear==selectYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
    this.paymentService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        this.creditCardMonths = data;
      }
    )
  }

}