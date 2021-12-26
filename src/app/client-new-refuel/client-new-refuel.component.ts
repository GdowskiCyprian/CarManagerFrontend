import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-client-new-refuel',
  templateUrl: './client-new-refuel.component.html',
  styleUrls: ['./client-new-refuel.component.css']
})
export class ClientNewRefuelComponent implements OnInit {
  email:string | null = '';
  currentClient:any;
  //fuel tank section
  price: number | null = null;
  volume:number | null = null;
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
      let resp1 = this.service.getCurrentCars(this.currentClient.idClient);
      resp1.subscribe(data1 => {this.allCars = data1, console.log(data1)})
    });
  }
  logout(){
    this.service.logout();
  }
  addNewRefuel(){
    if(this.price != null && this.volume != null){
      this.service.postNewRefuel(
        this.price,
        this.volume,
        this.typeOfFuel,
        this.selectedCar.idCar
      )
    }
    else{
      alert("This is an alert message box.");
    }

  }
}
