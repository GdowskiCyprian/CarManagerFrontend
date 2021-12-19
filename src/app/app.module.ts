import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {DataServiceService} from "./data-service.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RepairShopMyClientsComponent } from './repair-shop-my-clients/repair-shop-my-clients.component';
import { RepairShopMyRepairsComponent } from './repair-shop-my-repairs/repair-shop-my-repairs.component';
import { RepairShopGeneralInfoComponent } from './repair-shop-general-info/repair-shop-general-info.component';
import { RepairShopNewRepairComponent } from './repair-shop-new-repair/repair-shop-new-repair.component';
import { ClientGeneralInfoComponent } from './client-general-info/client-general-info.component';
import { ClientMyCarsComponent } from './client-my-cars/client-my-cars.component';
import { ClientMyRefuelsComponent } from './client-my-refuels/client-my-refuels.component';
import { ClientNewCarComponent } from './client-new-car/client-new-car.component';
import { ClientNewRefuelComponent } from './client-new-refuel/client-new-refuel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RepairShopMyClientsComponent,
    RepairShopMyRepairsComponent,
    RepairShopGeneralInfoComponent,
    RepairShopNewRepairComponent,
    ClientGeneralInfoComponent,
    ClientMyCarsComponent,
    ClientMyRefuelsComponent,
    ClientNewCarComponent,
    ClientNewRefuelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
