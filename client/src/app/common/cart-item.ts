import {Product} from './product';

export class CartItem {
  id:string;
  name:string;
  quantity:number;
  imageUrl:string;
  unitPrice:number;

  constructor(product:Product){
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.quantity = 1;
  }
}
