import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartServiceService} from '../../services/cart-service.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : Product = new Product();

  constructor(private route:ActivatedRoute, private productService:ProductService, private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getProduct();
    })
  }

  getProduct(){
    const id:number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(product:Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
