import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-client-change-password',
  templateUrl: './client-change-password.component.html',
  styleUrls: ['./client-change-password.component.css']
})
export class ClientChangePasswordComponent implements OnInit {

  email:string | null = '';
  currentClient:any;
  //change password section
  oldpassword:string | null = "";
  newpassword:string | null = "";
  newpasswordconfirm:string | null = "";
  constructor(public router:Router, private service:ClientServiceService, private _snackBar: MatSnackBar) { }

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
    resp.subscribe(data => {this.currentClient = data});
  }
  logout(){
    this.service.logout();
  }
  changePassword(){
    if(this.oldpassword != null && this.newpassword != null && this.newpasswordconfirm != null && this.email !=null && this.newpassword == this.newpasswordconfirm)
    this.service.changePassword(this.email,this.oldpassword, this.newpassword)
  }
  deleteAccount(){
    let resp = this.service.deleteAccount(this.currentClient.idClient)
    resp
      .subscribe(next=> {if (typeof next === "string") {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('role');
        this.router.navigate(["/login"]);
        this._snackBar.open(next, "Ok", {duration: 3000})
      }}, err => {if (typeof err === "string") {
        this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
      }})
  }

}
