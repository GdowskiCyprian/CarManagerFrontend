import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-client-new-car',
  templateUrl: './client-new-car.component.html',
  styleUrls: ['./client-new-car.component.css']
})
export class ClientNewCarComponent implements OnInit {
  email:string | null = '';
  currentClient:any;
  // for new Car form
  manufacturer:string = "";
  model:string = "";
  version:string = "";
  power:string = "";
  displacement:string = "";
  mileage:string = "";
  yearOfManufacture:string = "";
  // end of section
  //fuel tank section
  capacity:number = 0;
  typeOfFuel:string = "";
  allCars: any;
  selectedCar:any;
  //end of section
  constructor(private router:Router, private service:ClientServiceService) { }

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
    resp.subscribe(data => {this.currentClient = data, console.log(data)
      let resp1 = this.service.getCurrentCars(this.currentClient.repairShop.idRepairShop);
      resp1.subscribe(data1 => {this.allCars = data1, console.log(data1)})
    });
  }
  logout(){
    this.service.logout();
  }
  addNewCar(){
    this.service.postNewCar(
      this.manufacturer,
      this.model,
      this.version,
      this.power,
      this.displacement,
      this.mileage,
      this.yearOfManufacture,
      this.currentClient.idClient)
  }
  addNewFuelTank(){
    this.service.postNewFuelTank(
      this.capacity,
      this.typeOfFuel,
      this.selectedCar.idCar
    )
  }
}
