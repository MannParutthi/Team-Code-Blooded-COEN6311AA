import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateTravelPackageComponent } from './create-travel-package/create-travel-package.component';
import { UpdateTravelPackageComponent } from './update-travel-package/update-travel-package.component';
import { SearchTravelPackageComponent } from './search-travel-package/search-travel-package.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login", component: UserLoginComponent },
  { path: "home", component: HomePageComponent },
  { path: "create-user", component: CreateCustomerComponent },
  { path: "create-travel-package", component: CreateTravelPackageComponent },
  { path: "update-travel-package", component: UpdateTravelPackageComponent },
  { path: "search-travel-package", component: SearchTravelPackageComponent },
  { path: "update-profile", component: UpdateProfileComponent },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
