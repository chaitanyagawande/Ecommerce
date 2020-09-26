import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient:HttpClient) { }

  getProductList():Observable<Product[]>{
	const products = `${this.baseUrl}/api/products/?size=4`;
    return this.httpClient.get<GetResponseProduct>(products).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]>{
	const product_category = `${this.baseUrl}/api/product-category/?size=8`;
    return this.httpClient.get<GetResponseProductCategory>(product_category).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(page:number, pageSize:number,value:string):Observable<GetResponseProduct>{
	  const searchUrl = `${this.baseUrl}/api/products/search/findByNameContaining?name=${value}&page=${page}&size=${pageSize}`;
	  return this.httpClient.get<any>(searchUrl);
  }

  getProductByCategoryId(id:number):Observable<Product[]>{
	  const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${id}`;
	  return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
	  );
  }

  getProduct(id:number):Observable<Product>{
    const ProductUrl = `${this.baseUrl}/api/products/${id}`;
    return this.httpClient.get<Product>(ProductUrl);
  }

  getProductPaginate(page:number, pageSize:number,category_id:number):Observable<GetResponseProduct>{
	  const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${category_id}&page=${page}&size=${pageSize}`;
	  return this.httpClient.get<any>(searchUrl);
  }

}

interface GetResponseProduct{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}


interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
