import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ProductService} from './services/product.service';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {Routes, RouterModule} from  '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

const routes = [
  {path:'category/:id/:name',component:CategoryComponent},
  {path:'search/:keyword',component:CategoryComponent},
  {path:'product/:id',component:ProductDetailComponent},
  {path:'cart-details',component:CartDetailComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component:HomeComponent},
  {path:'**',redirectTo:'/',pathMatch:'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CheckoutComponent,
    CategoryComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    SearchComponent,
    ProductDetailComponent,
    CartComponent,
    CartDetailComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
