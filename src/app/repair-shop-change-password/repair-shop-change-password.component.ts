import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataServiceService} from "../data-service.service";

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
  constructor(private router:Router, private service:DataServiceService) { }

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

}
