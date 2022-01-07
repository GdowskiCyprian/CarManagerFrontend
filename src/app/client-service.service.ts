import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http:HttpClient, private router:Router) { }

  public logout(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    this.router.navigate(["/login"]);
  }

  public isLoggedIn(){
    if(sessionStorage.getItem("username") != null && sessionStorage.getItem("password") != null){
      return true;
    }
    else{
      return false;
    }
  }

  public getCurrentClient(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/clients/getbymail/"+sessionStorage.getItem('username'),{headers});
  }
  public getCurrentCars(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/cars/getcurrentcarsbyclient/"+id.toString(),{headers});
  }
  public deleteCar(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete("http://localhost:8080/api/cars/deleteCar/"+id.toString(),{headers}).subscribe(resp => console.log(resp));
  }
  public getCurrentRefuels(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/refuels/getcurrentrefuels/"+id.toString(),{headers});
  }
  public deleteRefuel(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete("http://localhost:8080/api/refuels/deleteRefuel/"+id.toString(),{headers}).subscribe(resp => console.log(resp));
  }
  public postNewCar(
    manufacturer:string,
    model:string,
    version:string,
    power:string,
    displacement:string,
    mileage:string,
    yearOfManufacture:string,
    idClient:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    let car:Car = {
      displacement: displacement,
      idClient: idClient,
      mileage: mileage,
      model: model,
      power: power,
      version: version,
      yearOfManufacture: yearOfManufacture,
      manufacturer:manufacturer
    }
    this.http.post("http://localhost:8080/api/cars/postCar", car, {headers}).subscribe(resp => console.log(resp));
  }
  postNewFuelTank(capacity:number, typeOfFuel:string, idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    let fuelTank: FuelTank = { capacity:capacity, typeOfFuel:typeOfFuel, idCar:idCar}
    this.http.post("http://localhost:8080/api/fuelTanks/postFuelTank", fuelTank, {headers}).subscribe(resp => console.log(resp));
  }
  postNewRefuel(price:number,
  volume:number,
  typeOfFuel:string,
  idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    let refuel:Refuel = {
      price:price,
      volume:volume,
      typeOfFuel:typeOfFuel,
      idCar:idCar
    }
    this.http.post("http://localhost:8080/api/refuels/postRefuel", refuel, {headers}).subscribe(resp => console.log(resp));
  }
  public getCurrentRepairs(id:number){

    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/repairs/getrepairsbycurrentclient/"+id.toString(),{headers});
  }
  postNewRepair(name:string, description:string, date:string, idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    let newrepair:Repair= {name: name, date:date, description:description, idCar:idCar}
    console.log(this.http.post("http://localhost:8080/api/repairs/postRepair",newrepair,{headers}).subscribe(resp => console.log(resp)));
  }
  changePassword(email:string, oldpassword:string, newpassword:string){
    console.log(email, oldpassword, newpassword);
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/changepassword",
      {
        email:email,
        oldPassword:oldpassword,
        newPassword:newpassword
      },
      {headers, responseType: 'text' as 'json'}
      ).subscribe(resp => sessionStorage.setItem("password", newpassword), resp => console.log(resp))

  }
  putCar(idCar:number,manufacturer:string, model:string, version:string, power:number, mileage:number, yearOfManufacture:number, displacement:number, idClient:number){
    console.log()
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.put("http://localhost:8080/api/cars/putcar",
      {manufacturer:manufacturer, model:model, version:version, power:power, idCar:idCar, mileage:mileage, yearOfManufacture:yearOfManufacture, displacement:displacement, idClient:idClient},
      {headers}).subscribe(resp => console.log(resp))
  }
}
interface Car{
  manufacturer:string;
  model:string;
  version:string;
  power:string;
  displacement:string;
  mileage:string;
  yearOfManufacture:string;
  idClient:number;
}
interface FuelTank {
  capacity:number,
  typeOfFuel:string,
  idCar:number
}
interface Refuel{
  price:number,
  volume:number,
  typeOfFuel:string,
  idCar:number
}
interface Repair{
  name:string;
  date:string;
  description:string;
  idCar:number;
}
