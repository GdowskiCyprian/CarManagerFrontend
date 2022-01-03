import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient, private router:Router) { }

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
    return this.http.get("http://localhost:8080/login/"+username,{headers,responseType: 'text' as 'json'});

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
    ).subscribe(()=> console.log('DeleteSuccesfull'));
  }
  public deleteRepair(id:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete('http://localhost:8080/api/repairs/deleteRepair/'+id.toString()
      , {headers}
    ).subscribe(()=> console.log('DeleteSuccesfull'));
  }
  public getCurrentClients(id:number){
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
    let newrepair:Repair= {name: name, date:date, description:description, idCar:idCar}
    console.log(this.http.post("http://localhost:8080/api/repairs/postRepair",newrepair,{headers}).subscribe(resp => console.log(resp)));
  }
  postNewRepairPart(partname:string, partdescription:string, partprice:number, idRepair:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });


    let newreparpart:RepairPart = {partname:partname, partdescription:partdescription, partprice:partprice, idRepair:idRepair}
    this.http.post( "http://localhost:8080/api/repairParts/postRepairPart", newreparpart, {headers}).subscribe(resp => console.log(resp));
  }
  registerRepairShop(email: string,
  password: string,
  name: string,
  phoneNumber: number,
  nip:number){
    const headers = new HttpHeaders({ 'Content-Type':'application/json'});
    let repairShop:RepairShop = {
      email:email,
      password:password,
      name:name,
      phoneNumber:phoneNumber,
      nip:nip
    }
  this.http.post("http://localhost:8080/register/repairshop",
    repairShop,
    {headers, responseType: 'text' as 'json'})
    .subscribe(resp => console.log(resp));

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
    let client:Client = {email: email,
      password: password,
      name: name,
      surname: surname,
      phoneNumber:phoneNumber,
      idRepairShop:idRepairShop}
    this.http.post("http://localhost:8080/register/client",
      client,
      {headers, responseType: 'text' as 'json'})
      .subscribe(resp => console.log(resp));
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
}
interface Repair{
  name:string;
  date:string;
  description:string;
  idCar:number;
}
interface RepairPart{
  partname:string;
  partdescription:string;
  partprice:number;
  idRepair:number;
}
interface Client{
  email: string,
  password: string,
  name: string,
  surname: string,
  phoneNumber:number,
  idRepairShop:number
}
interface RepairShop {
  email: string,
  password: string,
  name: string,
  phoneNumber: number,
  nip:number
}
