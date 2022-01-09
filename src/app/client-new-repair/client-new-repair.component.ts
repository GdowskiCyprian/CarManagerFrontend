import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-client-new-repair',
  templateUrl: './client-new-repair.component.html',
  styleUrls: ['./client-new-repair.component.css']
})
export class ClientNewRepairComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-US');
  currentClient:any;
  email:string | null = 'Your Email';
  name:string = "";
  description:string= "";
  date:string | null= "";
  car:any;
  cars:any;
  constructor(public router:Router, private service:ClientServiceService) { }

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
      resp1.subscribe(data => {this.cars = data, console.log(this.currentClient.idClient)});
    });
  }
  logout(){
    this.service.logout();
  }
  addNewRepair(){
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd')
    if(this.date != null)
    this.service.postNewRepair(this.name, this.description, this.date,this.car.idCar)
  }

}
