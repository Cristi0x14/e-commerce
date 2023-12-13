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
const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'admin',component:AdminComponent,canActivate:[authGuard], data:{roles:['Admin']}},
  {path: 'user',component:UserComponent,canActivate:[authGuard], data:{roles:['User']}},
  {path: 'login',component:LoginComponent},
  {path: 'forbiden',component:ForbidenComponent},
  {path: 'addNewProduct', component: AddNewProductComponent,canActivate:[authGuard], data:{roles:['Admin']},
  resolve:{
    product: ProductResolveService
  }
  },
  {path: 'showProductDetails', component: ShowProductDetailsComponent,canActivate:[authGuard], data:{roles:['Admin']}},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
