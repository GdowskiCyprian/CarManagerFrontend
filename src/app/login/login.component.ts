import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = "";
  password:string = "";
  message:any
  repairshop:RepairShop= {name: "", email: "", password: "", nip: 0, phoneNumber: 0}
  allRepairShops:any;
  selectedRepairShop:any;
  client:Client={ email: "", password: "",name: "",surname: "", phoneNumber: 0}

  constructor(private service:DataServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getRepairShops();
  }

  loginLoginComp(){
    let resp = this.service.loginDataService(this.username, this.password);
    resp.subscribe(data => {
        this.message = data;
      sessionStorage.setItem('username',this.username);
      sessionStorage.setItem('password',this.password);
      sessionStorage.setItem('role', this.message);
        if(data == "REPAIR_SHOP"){
          this.router.navigate(["/repairshopgeneralinfo"]);
          console.log(data);
        }
        else{
          this.router.navigate(["/clientgeneralinfo"]);
          console.log(data);
        }
        return data;
    });
  }
  registerRepairShop(){
    console.log(this.repairshop);
    this.service.registerRepairShop(this.repairshop.email, this.repairshop.password, this.repairshop.name, this.repairshop.phoneNumber, this.repairshop.nip);
  }
  registerClient(){
    console.log(this.client);
    this.service.registerClient(this.client.email, this.client.password, this.client.name,this.client.surname, this.client.phoneNumber, this.selectedRepairShop.idRepairShop);
  }
  getRepairShops(){
    let resp = this.service.getAllRepairShops()
    resp.subscribe(data => {this.allRepairShops = data})
  }
}
type RepairShop={
  email: string;
  password: string;
  name: string;
  phoneNumber: number;
  nip:number;
}
type Client={
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: number;
}
