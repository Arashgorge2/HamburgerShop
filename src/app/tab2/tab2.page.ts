import { Component, OnInit } from '@angular/core';
import { Pizza } from '../services/services/pizza.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pizzas: any[] = [];
  cart: any[] = [];
  cartCount: number = 0;

  constructor(
    private productService: Pizza,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPizzas();
    this.loadCart();
    this.updateCartCount();
  }

  loadPizzas() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.pizzas = data;
        console.log('Pizzas geladen:', this.pizzas);
      },
      (error) => {
        console.error('Fehler beim Laden der Pizza-Produkte:', error);
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