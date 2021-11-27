import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-repair-shop-my-clients',
  templateUrl: './repair-shop-my-clients.component.html',
  styleUrls: ['./repair-shop-my-clients.component.css']
})
export class RepairShopMyClientsComponent implements OnInit {

  email:string | null = '';
  currentRepairShop : any;
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
    resp.subscribe(data => this.currentRepairShop = data);
  }
  logout(){
    this.service.logout();
  }

}
