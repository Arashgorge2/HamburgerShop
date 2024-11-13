import { Component, OnInit } from '@angular/core';
import { HamburgerService } from '../services/services/hamburger.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  hamburgers: any[] = [];
  cart: any[] = [];
  cartCount: number = 0;

  constructor(
    private productService: HamburgerService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHamburgers();
    this.loadCart(); // Warenkorb beim Start laden
    this.updateCartCount(); // Anzahl der Produkte im Warenkorb aktualisieren
  }

  loadHamburgers() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.hamburgers = data;
        console.log('Hamburgers geladen:', this.hamburgers);
      },
      (error) => {
        console.error('Fehler beim Laden der Hamburger-Produkte:', error);
      }
    );
  }
  async addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
    this.updateCartCount();
  
    console.log('Cart Items:', this.cart);
  
    const toast = await this.toastCtrl.create({
      message: `${product.name} wurde zum Warenkorb hinzugefügt.`,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }

  // Warenkorb aus LocalStorage laden
  loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = savedCart;
    this.updateCartCount();
  }

  // Methode zum Hinzufügen in den Warenkorb
 
  // Methode zum Kaufen eines Produkts
  async buyProduct(product: any) {
    this.cart.push(product);
    this.saveCart();
    this.updateCartCount();

    const toast = await this.toastCtrl.create({
      message: `${product.name} wurde gekauft und zum Warenkorb hinzugefügt.`,
      duration: 2000,
      color: 'primary',
    });
    await toast.present();

    // Zur Kasse-Seite navigieren
    this.router.navigate(['/checkout']);
  }

  // Warenkorb im LocalStorage speichern
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Anzahl der Produkte im Warenkorb aktualisieren
  updateCartCount() {
    this.cartCount = this.cart.length;
  }

  // Methode zur Navigation zur Warenkorb-Seite
  goToCart() {
    this.router.navigate(['/einkaufs-wagen']);
  }
}
