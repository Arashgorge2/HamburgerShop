import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  username: string = '';
  password: string = '';
  loginError: boolean = false;
  loginErrorMessage: string = '';
  
  constructor(private alertCtrl: AlertController, private authService: AuthService, private router:Router) {}
  
  // تابع لاگین
  async onLogin() {
    // بررسی ورودی‌های کاربر
    if (this.username.trim() === '' || this.password.trim() === '') {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Please enter both username and password.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    
    // ارسال درخواست لاگین به API
    this.authService.login(this.username, this.password).subscribe(
      async (response) => {
        if (response.success) {
          const alert = await this.alertCtrl.create({
            header: 'Success',
            message: 'Login successful!',
            buttons: ['OK'],
          });
          
          await alert.present();
          this.router.navigate(['/tabs/tab1']);
          
          // مسیریابی به صفحه tab1
          
          // ریست کردن فیلدها
          this.username = '';
          this.password = '';
          this.loginError = false;
        } else {
          this.loginError = true;
          this.loginErrorMessage = 'Invalid username or password.';
        }
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Server connection error.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }}    