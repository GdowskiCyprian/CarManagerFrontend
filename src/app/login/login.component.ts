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

  constructor(private service:DataServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  loginLoginComp(){
    let resp = this.service.loginDataService(this.username, this.password);
    resp.subscribe(data => {
        this.message = data;
      sessionStorage.setItem('username',this.username);
      sessionStorage.setItem('password',this.password);
        sessionStorage.setItem('role', this.message);
        if(data == "REPAIR_SHOP"){
          this.router.navigate(["/homepage"]);
          console.log(data);
        }
        else{
          this.router.navigate(["/homepage"]);
          console.log(data);
        }
        return data;
    });
  }
}
