import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { authGuard } from './_auth/auth.guard';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResolveService } from './payment-resolve.service';
import { ShoesComponent } from './shoes/shoes.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
const routes: Routes = [
  { path: 'allsports', component: HomeComponent },
  { path: 'allsports/:category', component: HomeComponent },
  { path: 'allsports/:category/:subcategory', component: HomeComponent },
  { path: 'allsports/:category/:subcategory/:subsubcategory', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbidenComponent },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [authGuard], data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService
    }
  },
  { path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: { product: ProductResolveService } },
  {
    path: 'buyProduct', component: BuyProductComponent, canActivate: [authGuard], data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService
    }
  },
  { path: "orderConfirm", component: OrderConfirmationComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: "register", component: RegisterComponent },
  { path: "cart", component: CartComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: "myOrders", component: MyOrdersComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: 'allOrders', component: AllOrdersComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: 'shoes', component: ShoesComponent },
  { path: 'as', component: AdvancedSearchComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
