import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='https://apirawdata-sg.tracwater.asia/';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUserbyCode(username:any){
    return this.http.get(this.apiurl+'/login');
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(username:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+username,inputdata);
  }
  // getuserrole(){
  //   return this.http.get('http://127.0.0.1:5555/role');
  // }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  // getrole(){
  //   return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  // }
  GetAllCustomer(){
    return this.http.get('http://localhost:5555/customer');
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
}
  // Getaccessbyrole(role:any,menu:any){
  //   return this.http.get('http://127.0.0.1:5555/roleaccess?role='+role+'&menu='+menu)
  // }
}
