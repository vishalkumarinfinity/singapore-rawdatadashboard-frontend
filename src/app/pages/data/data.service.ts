import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_URL = 'http://localhost:5555/data';

  constructor(private http: HttpClient) {}

  getPaginatedData(limit: number, offset: number) {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());
    return this.http.get(this.API_URL, { params });
  }
}
