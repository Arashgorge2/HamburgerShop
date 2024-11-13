import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EinkaufsWagenService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Gereftan liste sefaresh-ha az server
  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`);
  }

  // Ezafe kardan yek kala be sefareshat
  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, product);
  }

  // Pak kardan yek kala az sefareshat
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${productId}`);
  }

  // Update kardan tedad yek kala dar sefareshat
  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${productId}`, { quantity });
  }
}