import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-client-my-repairs',
  templateUrl: './client-my-repairs.component.html',
  styleUrls: ['./client-my-repairs.component.css']
})
export class ClientMyRepairsComponent implements OnInit {
  allRepairs : any;
  currentClient:any;
  email:string | null = '';
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
      let resp1 = this.service.getCurrentRepairs(this.currentClient.idClient);
      resp1.subscribe(data => {this.allRepairs = data, console.log(data)});
    });
  }
  logout(){
    this.service.logout();
  }

}
