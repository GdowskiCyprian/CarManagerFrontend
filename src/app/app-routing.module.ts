import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RepairShopGeneralInfoComponent} from "./repair-shop-general-info/repair-shop-general-info.component";
import {RepairShopMyClientsComponent} from "./repair-shop-my-clients/repair-shop-my-clients.component";
import {RepairShopMyRepairsComponent} from "./repair-shop-my-repairs/repair-shop-my-repairs.component";

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"repairshopgeneralinfo", component:RepairShopGeneralInfoComponent},
  {path:"", redirectTo:"login",pathMatch:"full"},
  {path:"repairshopmyclients", component:RepairShopMyClientsComponent},
  {path:"repairshopmyrepairs", component:RepairShopMyRepairsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
