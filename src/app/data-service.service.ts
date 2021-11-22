import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient, private router:Router) { }

  public loginDataService(username:string, password:string){
    const headers = new HttpHeaders({ 'Content-Type':'application/json','Authorization': 'Basic ' + btoa(username + ':' + password) });
    return this.http.get("http://localhost:8080/login/"+username,{headers,responseType: 'text' as 'json'});

  }
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

  public getAllRepairShops(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/repairshops/repairShopAll",{headers});
  }
  public getCurrentRepairShop(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json',
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    return this.http.get("http://localhost:8080/api/repairshops/getByMail/"+sessionStorage.getItem('username'),{headers});
  }
}
