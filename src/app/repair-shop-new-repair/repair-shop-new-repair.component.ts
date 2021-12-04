import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-repair-shop-new-repair',
  templateUrl: './repair-shop-new-repair.component.html',
  styleUrls: ['./repair-shop-new-repair.component.css']
})
export class RepairShopNewRepairComponent implements OnInit {
  currentRepairShop:any;
  email:string | null = 'Your Email';
  cars:any;
  name:string = "";
  description:string= "";
  date:string= "";
  car:any;
  constructor(private router:Router, private service:DataServiceService) { }



  ngOnInit(): void {
    if(!this.service.isLoggedIn())
    {
      this.router.navigate(["/login"]);
      return;
    }
    else
    {

      if (sessionStorage.getItem('username') != null) {
        this.email = sessionStorage.getItem('username');
      } else {
        this.email = "Developer";
      }


    }
    let resp = this.service.getCurrentRepairShop();
    resp.subscribe(data => {this.currentRepairShop = data, console.log(data)
      this.email = this.currentRepairShop.name;
      let resp1 = this.service.getCurrentCars(this.currentRepairShop.idRepairShop);
      resp1.subscribe(data => {this.cars = data, console.log(data)});
    })
  }
  addnewrepair(){
     this.service.postNewRepair(this.name, this.description, this.date,this.car.idCar)
  }
  logout(){
    this.service.logout()
  }
}
