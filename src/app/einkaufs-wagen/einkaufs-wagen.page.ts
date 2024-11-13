import { Component, OnInit } from '@angular/core';
import { EinkaufsWagenService } from '../services/services/einkaufs-wagen.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-einkaufs-wagen',
  templateUrl: './einkaufs-wagen.page.html',
  styleUrls: ['./einkaufs-wagen.page.scss'],
})
export class EinkaufsWagenPage implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart.map((item: CartItem) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    this.calculateTotalPrice();
  }

  updateQuantity(productId: string, newQuantity: number) {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = newQuantity > 0 ? newQuantity : 1; // Agar kamtar az 1 shod, be 1 taghir midahad
      this.calculateTotalPrice();
      this.saveCart();
    }
  }

  // Mohasebe gheymat kolli bar asas tedad (quantity)
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log('Gesamtpreis:', this.totalPrice);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.calculateTotalPrice();
    this.saveCart();
  }
}