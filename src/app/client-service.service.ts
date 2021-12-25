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
    return this.http.get("http://localhost:8080/api/cars/getcurrentcars/"+id.toString(),{headers});
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
