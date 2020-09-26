import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {CartServiceService} from '../../services/cart-service.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  currentCategoryName: string = "";
  searchMode:boolean = false;
  products:Product[] = [];
  // Pagination properties
  page:number = 1;
  pageSize:number = 5;
  total:number = 0;
  load:boolean = false;


  constructor(private route: ActivatedRoute, private productService:ProductService,private cartService:CartServiceService	) { }


  ngOnInit(): void {
  	this.route.paramMap.subscribe(() => {
  		this.currentCategoryName = this.route.snapshot.paramMap.get('name');
  		this.page = 1;
  		this.listProducts();
    });
  }

  listProducts(){
	  if(this.route.snapshot.paramMap.get('keyword')){
		  this.searchProducts();
	  }else{
		  this.listProductsByCategory();
	  }
  }

  searchProducts(){
	  const keyword:string = this.route.snapshot.paramMap.get('keyword');
  	  this.productService.searchProducts(this.page-1,this.pageSize,keyword).subscribe(
  			data => {
          this.load = true;
  				this.products = data._embedded.products;
          this.page = data.page.number+1;
          this.pageSize = data.page.size;
          this.total = data.page.totalElements;
  			}
  	  )
  }

  listProductsByCategory(){
  	  const id:number = +this.route.snapshot.paramMap.get('id');
  	  this.productService.getProductPaginate(this.page-1,this.pageSize,id).subscribe(
  			data => {
            this.load = true;
     				this.products = data._embedded.products;
     				this.page = data.page.number+1;
     				this.pageSize = data.page.size;
     				this.total = data.page.totalElements;
  			}
    )
  }

   updatePageSize(page_size:number){
      this.pageSize = page_size;
      this.page = 1;
      this.listProducts();
   }

   addToCart(product:Product){
      const cartItem = new CartItem(product);
      this.cartService.addToCart(cartItem);
   }
}
