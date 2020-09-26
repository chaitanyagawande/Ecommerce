import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.updateStatus();
    this.cartService.calculateTotalPrice();
  }

  updateStatus(){
  // subscribe to cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    
  }

}
