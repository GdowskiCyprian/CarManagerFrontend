import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-client-my-refuels',
  templateUrl: './client-my-refuels.component.html',
  styleUrls: ['./client-my-refuels.component.css']
})
export class ClientMyRefuelsComponent implements OnInit {
  email:string | null = '';
  currentClient:any;
  refuels: any;
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
    resp.subscribe(data => {this.currentClient = data
    let resp1 = this.service.getCurrentRefuels(this.currentClient.repairShop.idRepairShop);
      resp1.subscribe(data => {this.refuels = data, console.log(data)} )
    });
  }
  logout(){
    this.service.logout();
  }
  deleteRefuel(id:number){
    this.service.deleteRefuel(id);
  }
}
