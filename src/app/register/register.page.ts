import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  validation_messages = {
    nombre: [{ type: 'required', message: 'El nombre es obligatorio.' }],
    apellido: [{ type: 'required', message: 'El apellido es obligatorio.' }],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'El email no es válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Mínimo 6 caracteres.' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async registerUser() {
  if (this.registerForm.valid) {
    const credentials = this.registerForm.value;

    this.authService.registerUser(credentials).then(async res => {
      if (res.status === 'accept') {
        await this.storageService.set('userData', credentials);
        await this.storageService.set('isLoggedIn', true); // <-- NECESARIO para pasar el guard

        const alert = await this.alertCtrl.create({
          header: 'Registro Exitoso',
          message: 'Ya puedes iniciar sesión.',
          buttons: ['OK']
        });
        await alert.present();
        await alert.onDidDismiss();

        this.navCtrl.navigateRoot('/login');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: res.message || 'No se pudo completar el registro.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }).catch(async err => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err || 'Ocurrió un error inesperado.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
