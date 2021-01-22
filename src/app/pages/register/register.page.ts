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
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      first_name: ['First Name', [Validators.required]],
      last_name: ['Last Name', [Validators.required]],
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {

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
