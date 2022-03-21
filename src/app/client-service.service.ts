import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http:HttpClient, private router:Router, private _snackBar:MatSnackBar) { }

  baseUrl:string = 'http://localhost:8080/';
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
    return this.http.get(this.baseUrl+"api/clients/getbymail/"+sessionStorage.getItem('username'),{headers});
  }
  public getCurrentCars(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get(this.baseUrl+"api/cars/getcurrentcarsbyclient/"+id.toString(),{headers});
  }
  public deleteCar(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete(this.baseUrl+"api/cars/deleteCar/"+id.toString(),{headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        });
  }
  public getCurrentRefuels(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get(this.baseUrl+"api/refuels/getcurrentrefuels/"+id.toString(),{headers});
  }
  public deleteRefuel(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete(this.baseUrl+"api/refuels/deleteRefuel/"+id.toString(),{headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        });
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
    this.http.post(this.baseUrl+"api/cars/postCar", {
      displacement: displacement,
      idClient: idClient,
      mileage: mileage,
      model: model,
      power: power,
      version: version,
      yearOfManufacture: yearOfManufacture,
      manufacturer:manufacturer
    }, {headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        })

  }
  postNewFuelTank(capacity:number, typeOfFuel:string, idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post(this.baseUrl+"api/fuelTanks/postFuelTank", { capacity:capacity, typeOfFuel:typeOfFuel, idCar:idCar}, {headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        });
  }
  postNewRefuel(price:number,
  volume:number,
  typeOfFuel:string,
  idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post(this.baseUrl+"api/refuels/postRefuel", {
      price:price,
      volume:volume,
      typeOfFuel:typeOfFuel,
      idCar:idCar
    }, {headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        });
  }
  public getCurrentRepairs(id:number){

    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get(this.baseUrl+"api/repairs/getrepairsbycurrentclient/"+id.toString(),{headers});
  }
  postNewRepair(name:string, description:string, date:string, idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post(this.baseUrl+"api/repairs/postRepair",{name: name, date:date, description:description, idCar:idCar},{headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        });
  }
  changePassword(email:string, oldpassword:string, newpassword:string){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.post(this.baseUrl+"changepassword",
      {
        email:email,
        oldPassword:oldpassword,
        newPassword:newpassword
      },
      {headers, responseType: 'text' as 'json'}
      )
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          } sessionStorage.setItem("password", newpassword) }, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        })

  }
  putCar(idCar:number,manufacturer:string, model:string, version:string, power:number, mileage:number, yearOfManufacture:number, displacement:number, idClient:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.put(this.baseUrl+"api/cars/putcar",
      {manufacturer:manufacturer, model:model, version:version, power:power, idCar:idCar, mileage:mileage, yearOfManufacture:yearOfManufacture, displacement:displacement, idClient:idClient},
      {headers, responseType: 'text' as 'json'})
      .subscribe(
        next=> {
          if (typeof next === "string") {
            this._snackBar.open(next, "Ok", {duration: 3000})
          }}, err => {
          if (typeof err === "string") {
            this._snackBar.open("Something went wrong", "Ok", {duration: 3000})
          }
        })
  }

  deleteAccount(idClient:number) {
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.delete(this.baseUrl+"api/clients/deleteClient/"+idClient.toString(), {headers, responseType: 'text' as 'json'})
  }
}

