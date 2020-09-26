import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductCategory} from '../../common/product-category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productCategories:ProductCategory[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  	this.listProductCategories();
  }
  
  listProductCategories(){
  	this.productService.getProductCategories().subscribe(
  		data => {
  			this.productCategories = data;
  		}
  	)
  }

}
