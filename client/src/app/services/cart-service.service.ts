import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItems:CartItem[] = [];
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();


  constructor() {
    if(localStorage.getItem("cart")){
      this.cartItems = JSON.parse(localStorage.getItem("cart"));
    }else{
      this.SetCart();
    }
    
  }

  SetCart(){
    localStorage.setItem("cart",JSON.stringify(this.cartItems));
  }

  GetCart(){
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
  }

  addToCart(cart_item:CartItem){
    this.GetCart();

    // item presents in cart
    let existItem:boolean = false;
    let existCartItem:CartItem = undefined;

    if(this.cartItems.length>0){
    // find item based on id

      existCartItem = this.cartItems.find(temp => temp.id === cart_item.id);
      existItem = existCartItem != undefined;

    }
    // we found element
    if(existItem){
      existCartItem.quantity++;
    }else{
      this.cartItems.push(cart_item);
    }
    this.SetCart();
    // Calculate Total Price
    this.calculateTotalPrice();
    // this.logInfo();
  }

  calculateTotalPrice(){
    this.GetCart();
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for(let item of this.cartItems){
      totalPriceValue += item.quantity*item.unitPrice;
      totalQuantityValue += item.quantity;
    }

    // Publish the new data ... all subscribers will receive new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.SetCart();
    // log cart data
    // console.log(totalPriceValue)

  }

  decrementQuantity(cart_item:CartItem){
    this.GetCart();
    const index = this.cartItems.findIndex(temp => temp.id==cart_item.id);
    if(index>-1){
      this.cartItems[index].quantity--;
      if(this.cartItems[index].quantity==0){
        this.removeFromCart(cart_item);
      }
      this.SetCart();
      this.calculateTotalPrice();
    }

  }

  removeFromCart(cart_item:CartItem){
    this.GetCart();
    const index = this.cartItems.findIndex(temp => temp.id==cart_item.id);
    if(index>-1){
      this.cartItems.splice(index,1);
      this.SetCart();
      this.calculateTotalPrice();
    }
  }
  
}
