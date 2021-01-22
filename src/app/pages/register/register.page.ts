import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials: FormGroup;
  errorMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['hilal123najem@gmail.com', [Validators.required, Validators.email]],
      password: ['Hilal123', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['Hilal123', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    var data = {
      email: this.credentials.get('email'),
      password: this.credentials.get('password');
    };

    this.authService.register(data)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        await this.loginUser(data);
        await loading.dismiss();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        await loading.dismiss();
      })
  }

  async loginUser(data) {
    this.authService.login(data)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.authService.isAuthenticated.next(true);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      }, err => {
        this.errorMessage = err.message;
        this.authService.isAuthenticated.next(false);
      })
  }

  login() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

  get first_name() {
    return this.credentials.get('first_name');
  }
  
  get last_name() {
    return this.credentials.get('last_name');
  }

  get password_confirmation() {
    return this.credentials.get('password_confirmation');
  }
}
