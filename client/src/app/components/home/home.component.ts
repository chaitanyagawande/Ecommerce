import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {Product} from '../../common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  load:boolean = false;

  products:Product[];
  constructor(private productService:ProductService,private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
        this.load = true;
      }
    );
  }

  addToCart(product:Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
 }

}
