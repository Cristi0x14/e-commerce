import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'admin',component:AdminComponent},
  {path: 'user',component:UserComponent},
  {path: 'login',component:LoginComponent},
  {path: 'forbiden',component:ForbidenComponent},
  {path: 'addNewProduct', component: AddNewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
