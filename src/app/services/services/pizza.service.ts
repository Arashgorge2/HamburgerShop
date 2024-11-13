import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pizza {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Methode zum Abrufen der Hamburger-Liste
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Pizzas`);
  }

 }