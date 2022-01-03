import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-client-my-cars',
  templateUrl: './client-my-cars.component.html',
  styleUrls: ['./client-my-cars.component.css']
})
export class ClientMyCarsComponent implements OnInit {
  email:string | null = '';
  currentClient:any;
  cars: any;
  displayedColumns: string[] = ['Manufacturer', 'Model', 'Version', 'Mileage', 'Power', 'Delete'];
  constructor(public router:Router, private service:ClientServiceService) { }

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
    let resp1 = this.service.getCurrentCars(this.currentClient.idClient);
      resp1.subscribe(data1 => {this.cars = data1, console.log(data1)})
    });
  }
  logout(){
    this.service.logout();
  }
  deleteCar(id:number){
    this.service.deleteCar(id);
    window.location.reload();
  }
}
