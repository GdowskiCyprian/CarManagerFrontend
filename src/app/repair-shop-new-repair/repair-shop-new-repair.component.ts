import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-repair-shop-new-repair',
  templateUrl: './repair-shop-new-repair.component.html',
  styleUrls: ['./repair-shop-new-repair.component.css']
})
export class RepairShopNewRepairComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-US');
  currentRepairShop:any;
  email:string | null = 'Your Email';
  cars:any;
  name:string = "";
  description:string= "";
  date:string | null= "";
  car:any;
  repairs: any;
  selectedRepair:any;
  partname:string = "";
  partdescription:string= "";
  partprice:number = 0;
  constructor(public router:Router, private service:DataServiceService) { }



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
    resp.subscribe(data => {this.currentRepairShop = data,
      this.email = this.currentRepairShop.name;
      let resp1 = this.service.getCurrentCars(this.currentRepairShop.idRepairShop);
      resp1.subscribe(data => {this.cars = data});
      let resp2 = this.service.getCurrentRepairs(this.currentRepairShop.idRepairShop);
      resp2.subscribe(data => {this.repairs = data});

    })
  }
  addnewrepair(){
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd')
    if(this.date != null)
     this.service.postNewRepair(this.name, this.description, this.date,this.car.idCar)
  }
  logout(){
    this.service.logout()
  }
  addnewrepairpart(){
    this.service.postNewRepairPart(this.partname, this.partdescription, this.partprice, this.selectedRepair.idRepair)
  }
}
