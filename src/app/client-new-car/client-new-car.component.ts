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
    resp.subscribe(data => {this.currentClient = data, console.log(data)});
  }
  logout(){
    this.service.logout();
  }
}
