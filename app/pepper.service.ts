import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pepper } from './pepper.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PepperService {

  postPepper$ = new Observable<void>()

  constructor(private http: HttpClient) {}

  createPepper(pepper: Pepper): Observable<any> {
  
    return this.http.post(`${baseUrl}/pepper`, pepper);
  }

  getPeppers(): Observable<any> {
    return this.http.get(`${baseUrl}/peppers`);
  }

  delete(pepper:Pepper): Observable<any>{
    return this.http.delete(`${baseUrl}/pepper/${pepper.name}`)

  }

  update(id: any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/pepper/${id}`, data)

  }
}
