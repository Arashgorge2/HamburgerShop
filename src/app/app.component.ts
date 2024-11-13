import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private toastCtrl: ToastController) {}

  // Methode zum Abmelden
  async logout() {
    // Benutzer-Session löschen (z.B. Token im LocalStorage)
    localStorage.clear();

    // Toast-Nachricht anzeigen
    const toast = await this.toastCtrl.create({
      message: 'Sie wurden erfolgreich abgemeldet.',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    // Navigation zur Login-Seite
    this.router.navigate(['/login']);
  }
}

