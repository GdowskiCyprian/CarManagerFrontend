import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataServiceService} from "../data-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-repair-shop-change-password',
  templateUrl: './repair-shop-change-password.component.html',
  styleUrls: ['./repair-shop-change-password.component.css']
})
export class RepairShopChangePasswordComponent implements OnInit {

  email:string | null = '';
  currentRepairShop : any;
  oldpassword:string | null = "";
  newpassword:string | null = "";
  newpasswordconfirm:string | null = "";
  constructor(public router:Router, private service:DataServiceService, private _snackBar: MatSnackBar) { }

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
    let resp = this.service.getCurrentRepairShop();
    resp.subscribe(data => this.currentRepairShop = data);
  }
  logout(){
    this.service.logout();
  }
  changePassword(){
    if(this.oldpassword != null && this.newpassword != null && this.newpasswordconfirm != null && this.email !=null && this.newpassword == this.newpasswordconfirm)
      this.service.changePassword(this.email,this.oldpassword, this.newpassword)
  }
  deleteAccount(){
    let resp = this.service.deleteAccount(this.currentRepairShop.idRepairShop)
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
