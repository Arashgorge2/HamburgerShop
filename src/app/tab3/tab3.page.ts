import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getraenke } from '../services/Getreanke.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

  export class Tab3Page implements OnInit {
    getraenke: any[] = [];
    cart: any[] = [];
    cartCount: number = 0;
  
    constructor(
      private productService: getraenke ,
      private toastCtrl: ToastController,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.loadGetraenke();
      this.loadCart();
      this.updateCartCount();
    }
  
    loadGetraenke() {
      this.productService.getProducts().subscribe(
        (data) => {
          this.getraenke = data;
          console.log('Getränke geladen:', this.getraenke);
        },
        (error) => {
          console.error('Fehler beim Laden der Getränke-Produkte:', error);
        }
      );
    }
  
    loadCart() {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cart = savedCart;
      this.updateCartCount();
    }
  
    async addToCart(product: any) {
      this.cart.push(product);
      this.saveCart();
      this.updateCartCount();
  
      const toast = await this.toastCtrl.create({
        message: `${product.name} wurde zum Warenkorb hinzugefügt.`,
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    }
  
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
  
      this.router.navigate(['/checkout']);
    }
  
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    updateCartCount() {
      this.cartCount = this.cart.length;
    }
  
    goToCart() {
      this.router.navigate(['/cart']);
    }
  }