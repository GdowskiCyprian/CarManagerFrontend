import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataServiceService} from "../data-service.service";
import {DatePipe} from "@angular/common";
import {pipe} from "rxjs";

@Component({
  selector: 'app-repair-shop-my-repairs',
  templateUrl: './repair-shop-my-repairs.component.html',
  styleUrls: ['./repair-shop-my-repairs.component.css']
})
export class RepairShopMyRepairsComponent implements OnInit {

  email:string | null = 'Your Email';
  currentRepairShop : any;
  allRepairs : any;
  pipe = new DatePipe('pl-PL');
  constructor(private router:Router, private service:DataServiceService) { }

  ngOnInit(): void
  {
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
      let resp1 = this.service.getCurrentRepairs(this.currentRepairShop.idRepairShop);
    resp1.subscribe(data => {this.allRepairs = data, console.log(data)});
    })
  }

  logout(){
    this.service.logout();
  }

  deleteRepairPart(id:number){
    window.location.reload();
    this.service.deleteRepairPart(id);

  }
  deleteRepair(id:number){
    window.location.reload();
    this.service.deleteRepair(id);
  }

}
