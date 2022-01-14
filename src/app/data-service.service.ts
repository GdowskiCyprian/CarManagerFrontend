import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient, private router:Router, private _snackBar: MatSnackBar) { }

  public isLoggedIn(){
    if(sessionStorage.getItem("username") != null && sessionStorage.getItem("password") != null){
      return true;
    }
    else{
      return false;
    }
  }
  public logout(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    this.router.navigate(["/login"]);
  }

  public loginDataService(username:string, password:string){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password) });
    return this.http.get("http://localhost:8080/login/"+username,{headers,responseType: 'text' as 'json'})


  }
  public getAllRepairShops(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json'});
    return this.http.get("http://localhost:8080/api/repairshops/repairShopAll",{headers});
  }
  public getCurrentRepairShop(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/repairshops/getByMail/"+sessionStorage.getItem('username'),{headers});
  }
  public getCurrentRepairs(id:number){

    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/repairs/getrepairsbycurrent/"+id.toString(),{headers});
  }
  public deleteRepairPart(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete('http://localhost:8080/api/repairParts/deleteRepairPart/'+id.toString()
       , {headers}
    )
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
  deleteRepair(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete('http://localhost:8080/api/repairs/deleteRepair/'+id.toString()
      , {headers}
    )
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
  getCurrentClients(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/clients/getcurrentclients/"+id.toString(),{headers});
  }
  getCurrentCars(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/cars/getcurrentcars/"+id.toString(),{headers});
  }
  postNewRepair(name:string, description:string, date:string, idCar:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post("http://localhost:8080/api/repairs/postRepair",
      {name: name, date:date, description:description, idCar:idCar}
      , {headers, responseType: "text" as "json"})
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
  postNewRepairPart(partname:string, partdescription:string, partprice:number, idRepair:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post( "http://localhost:8080/api/repairParts/postRepairPart",
      {partname:partname, partdescription:partdescription, partprice:partprice, idRepair:idRepair},
      {headers})
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
  registerRepairShop(email: string,
  password: string,
  name: string,
  phoneNumber: number,
  nip:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json'});
  return this.http.post("http://localhost:8080/register/repairshop",
    {
      email:email,
      password:password,
      name:name,
      phoneNumber:phoneNumber,
      nip:nip
    },
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
  registerClient(
    email: string,
    password: string,
    name: string,
    surname: string,
    phoneNumber:number,
    idRepairShop:number
  ){
    const headers = new HttpHeaders({ 'Content-Type':'application/json'});
    this.http.post("http://localhost:8080/register/client",
      {email: email,
        password: password,
        name: name,
        surname: surname,
        phoneNumber:phoneNumber,
        idRepairShop:idRepairShop},
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
  changePassword(email:string, oldpassword:string, newpassword:string){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.post("http://localhost:8080/changepassword",
      {
        email:email,
        oldPassword:oldpassword,
        newPassword:newpassword
      },
      {headers, responseType: 'text' as 'json'}
    ).subscribe(() => sessionStorage.setItem("password", newpassword))
  }
}

