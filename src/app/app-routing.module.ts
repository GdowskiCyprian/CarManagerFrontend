import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RepairShopGeneralInfoComponent} from "./repair-shop-general-info/repair-shop-general-info.component";
import {RepairShopMyClientsComponent} from "./repair-shop-my-clients/repair-shop-my-clients.component";
import {RepairShopMyRepairsComponent} from "./repair-shop-my-repairs/repair-shop-my-repairs.component";
import {RepairShopNewRepairComponent} from "./repair-shop-new-repair/repair-shop-new-repair.component";
import {ClientGeneralInfoComponent} from "./client-general-info/client-general-info.component";
import {ClientMyCarsComponent} from "./client-my-cars/client-my-cars.component";
import {ClientMyRefuelsComponent} from "./client-my-refuels/client-my-refuels.component";
import {ClientNewCarComponent} from "./client-new-car/client-new-car.component";
import {ClientNewRefuelComponent} from "./client-new-refuel/client-new-refuel.component";
import {ClientNewRepairComponent} from "./client-new-repair/client-new-repair.component";
import {ClientMyRepairsComponent} from "./client-my-repairs/client-my-repairs.component";

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"repairshopgeneralinfo", component:RepairShopGeneralInfoComponent},
  {path:"", redirectTo:"login",pathMatch:"full"},
  {path:"repairshopmyclients", component:RepairShopMyClientsComponent},
  {path:"repairshopmyrepairs", component:RepairShopMyRepairsComponent},
  {path:"repairshopnewrepair", component:RepairShopNewRepairComponent},
  {path:"clientgeneralinfo", component:ClientGeneralInfoComponent},
  {path:"clientmycars", component:ClientMyCarsComponent},
  {path:"clientmyrefuels", component:ClientMyRefuelsComponent},
  {path:"clientnewcar", component:ClientNewCarComponent},
  {path:"clientnewrefuel", component:ClientNewRefuelComponent},
  {path:"clientnewrepair", component:ClientNewRepairComponent},
  {path:"clientmyrepairs", component:ClientMyRepairsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
