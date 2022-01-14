import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";
import {EditCarDialogComponent} from "../edit-car-dialog/edit-car-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-client-my-cars',
  templateUrl: './client-my-cars.component.html',
  styleUrls: ['./client-my-cars.component.css']
})
export class ClientMyCarsComponent implements OnInit {
  email:string | null = '';
  currentClient:any;
  cars: any;
  displayedColumns: string[] = ['Manufacturer', 'Model', 'Version', 'Mileage', 'Power','Displacement', 'Year', 'Delete', 'Edit'];
  constructor(public router:Router, private service:ClientServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.service.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return;
    } else {

      if (sessionStorage.getItem('username') != null) {
        this.email = sessionStorage.getItem('username');
      } else {
        this.email = "Developer";
      }
    }
    let resp = this.service.getCurrentClient();
    resp.subscribe(data => {this.currentClient = data
    let resp1 = this.service.getCurrentCars(this.currentClient.idClient);
      resp1.subscribe(data1 => {this.cars = data1})
    });
  }
  logout(){
    this.service.logout();
  }
  deleteCar(id:number){
    this.service.deleteCar(id);
    window.location.reload();
  }
  openEditDialog(idCar:number, manufacturer:string, model:string, version:string, mileage:number, power:number, yearOfManufacture:number, displacement:number){
    const dialogRef = this.dialog.open(EditCarDialogComponent,
      {
    width: '280px',
      data: {manufacturer:manufacturer, model:model, version:version, mileage:mileage, power:power, yearOfManufacture:yearOfManufacture, idCar:idCar, displacement:displacement, idClient:this.currentClient.idClient},
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();

    });
  }
}
