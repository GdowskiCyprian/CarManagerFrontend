import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"", redirectTo:"login",pathMatch:"full"},
  {path:"homepage", component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
