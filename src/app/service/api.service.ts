import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { RawData } from '../pages/device-raw-data/rawData.model';
import { param } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'https://apirawdata-sg.tracwater.asia/';
  baseUrl='http://localhost:5555/';

  constructor(private _http: HttpClient) {
  }

  
  // this.http.get('/users', httpOptions).subscribe(data => {
  //   console.log(data);
  // });

  getTypeRequest(url: any) {
   
    let auth_token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
      const requestOptions = { headers: headers };
      return this._http.get(`${this.baseUrl}${url}`, requestOptions).pipe(map(res => {
      return res;
    }));
  }

  getTypeRequestById(url: any,id:any) {
   
    let auth_token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
      const requestOptions = { headers: headers };
      console.log(requestOptions,'requestOptions')
      return this._http.get(`${this.baseUrl}${url}/${id}`, requestOptions).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any) {
    let auth_token = sessionStorage.getItem('access_token');
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      
      const requestOptions = { headers: headers };
      return this._http.post(`${this.baseUrl}${url}`, payload, requestOptions).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: any, payload: any,id:any) {
    let auth_token = sessionStorage.getItem('access_token');
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      
      const requestOptions = { headers: headers };
      console.log(id,'id...')
      return this._http.put(`${this.baseUrl}${url}/${id}`, payload, requestOptions).pipe(map(res => {
      return res;
    }));
  }

  deleteTypeRequest(url: any,id:any) {
    let auth_token = sessionStorage.getItem('access_token');
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      
      const requestOptions = { headers: headers };
      //console.log(id,'id...')
      return this._http.delete(`${this.baseUrl}${url}/${id}`, requestOptions).pipe(map(res => {
      return res;
    }));
  }

  // getRawData(url: any,page: number, limit: number): Observable<{ data: RawData, page: number, limit: number, total: number }> {
  //   let params = new HttpParams();
  //   params = params.append('page', page.toString());
  //   params = params.append('limit', limit.toString());
    
  //   return this._http.get<{ data: RawData, page: number, limit: number, total: number }>(`${this.baseUrl}${url}`, { params });
  // }

  getRawData(url:any,page: number = 1, limit: number = 100, startDate?: string, endDate?: string,serialNumber?: any, searchValue?: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (startDate && endDate) {
      params = params.set('startDate', startDate).set('endDate', endDate);
    }
    
    if(serialNumber!=null){
      params = params.set( 'serialNumber', serialNumber);
    }
    if(searchValue){
      params = params.set( 'keyword', searchValue);
    }


    return this._http.get<any>(`${this.baseUrl}${url}`, { params });
  }

  
  findAll(url:any, page: number, limit: number): Observable<any[]> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this._http.get<any[]>(`${this.baseUrl}${url}`, { params });
  }

  // export csv
  getExport(url:any,page: number = 1, limit: number = 100, startDate?: string, endDate?: string,serialNumber?: any, searchValue?: any): Observable<any> {

    let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  if (startDate && endDate) {
    params = params.set('startDate', startDate).set('endDate', endDate);
  }
  
  if(serialNumber!=null){
    params = params.set( 'serialNumber', serialNumber);
  }
  if(searchValue){
    params = params.set( 'keyword', searchValue);
  }
    return this._http.get<any>(`${this.baseUrl}${url}`, { params });
  }

  

}
