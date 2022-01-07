import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {DataServiceService} from "./data-service.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { ClientMyRepairsComponent } from './client-my-repairs/client-my-repairs.component';
import { ClientNewRepairComponent } from './client-new-repair/client-new-repair.component';
import { ClientChangePasswordComponent } from './client-change-password/client-change-password.component';
import { RepairShopChangePasswordComponent } from './repair-shop-change-password/repair-shop-change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { EditCarDialogComponent } from './edit-car-dialog/edit-car-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ClientServiceService} from "./client-service.service";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatExpansionModule} from "@angular/material/expansion";

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
    ClientNewRefuelComponent,
    ClientMyRepairsComponent,
    ClientNewRepairComponent,
    ClientChangePasswordComponent,
    RepairShopChangePasswordComponent,
    EditCarDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule
  ],
  providers: [DataServiceService, ClientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
