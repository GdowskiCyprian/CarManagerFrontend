import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  repairShops:any;
  someText:string | null = "";

  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('password'));
    console.log(sessionStorage.getItem('role'));
    let resp = this.service.getAllRepairShops()
    resp.subscribe(data=>this.repairShops = data)
    this.someText = sessionStorage.getItem("role");
  }
}
