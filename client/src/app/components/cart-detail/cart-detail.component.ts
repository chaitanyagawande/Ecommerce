import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../../services/cart-service.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})

export class CartDetailComponent implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private cartService:CartServiceService) { }

  ngOnInit(): void {
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

  IncrementQuantity(cart_item:CartItem){
    this.cartService.addToCart(cart_item);
    this.listCart();
  }

  DecrementQuantity(cart_item:CartItem){
    this.cartService.decrementQuantity(cart_item);
    this.listCart();
  }

  Remove(cart_item:CartItem){
    this.cartService.removeFromCart(cart_item);
    this.cartItems = this.cartService.cartItems;
    this.listCart();
  }
}

