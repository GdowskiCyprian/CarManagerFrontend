import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  message: any
  repairshop: RepairShop = {name: "", email: "", password: "", nip: 0, phoneNumber: 0}
  allRepairShops: any;
  selectedRepairShop: any;
  client: Client = {email: "", password: "", name: "", surname: "", phoneNumber: 0}

  //file input section
  selectedFile: File | null = null;

  //end of section
  constructor(private service: DataServiceService, private router: Router, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.getRepairShops();
  }

  loginLoginComp() {
    let resp = this.service.loginDataService(this.username, this.password);
    resp.subscribe(data => {
      this.message = data;
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      sessionStorage.setItem('role', this.message);
      if (data == "REPAIR_SHOP") {
        this.router.navigate(["/repairshopgeneralinfo"]);
        console.log(data);
      } else {
        this.router.navigate(["/clientgeneralinfo"]);
        console.log(data);
      }
      return data;
    });
  }

  registerRepairShop() {
    console.log(this.repairshop);
    this.service.registerRepairShop(this.repairshop.email, this.repairshop.password, this.repairshop.name, this.repairshop.phoneNumber, this.repairshop.nip);
  }

  registerClient() {
    console.log(this.client);
    this.service.registerClient(this.client.email, this.client.password, this.client.name, this.client.surname, this.client.phoneNumber, this.selectedRepairShop.idRepairShop);
  }

  getRepairShops() {
    let resp = this.service.getAllRepairShops()
    resp.subscribe(data => {
      this.allRepairShops = data
    })
  }

  onFileChanged(event: Event) {

    // @ts-ignore
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    console.log(this.selectedFile)
    console.log({file:this.selectedFile})
    const headers = new HttpHeaders({ 'Content-Type':'multipart/form-data',
      'Authorization': 'Basic ' + btoa("clientEmail" + ':' + "clientPassword") });
    this.http.post('http://localhost:8080/file-upload', {file : this.selectedFile}, {headers})
      .subscribe(resp => console.log(resp));
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
