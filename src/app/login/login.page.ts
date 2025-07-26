import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "El Email es obligatorio." },
      { type: "email", message: "Email inválido." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      { type: "minlength", message: "La contraseña es muy débil (mínimo 6 caracteres)." }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private storageService: StorageService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {}

  async loginUser(credentials: any) {
    if (!this.loginForm.valid) {
      this.presentAlert('Error', 'Por favor completa todos los campos correctamente.', 'danger');
      return;
    }

    try {
      const res = await this.authService.loginUser(credentials);
      console.log(res);

      // Guarda en el almacenamiento que el usuario está logueado
      await this.storageService.set('isLoggedIn', true);
      await this.storageService.set('userData', credentials); // guardar los datos que se usaron

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Inicio de sesión exitoso.',
        buttons: ['OK'],
        cssClass: 'custom-success-alert',
      });

      await alert.present();
      await alert.onDidDismiss();

      // Redirige luego de cerrar el alert
      this.navCtrl.navigateForward('/menu/home');

    } catch (err) {
      console.error(err);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales incorrectas.',
        buttons: ['OK'],
        cssClass: 'custom-danger-alert'
      });

      await alert.present();
    }
  }

  async presentAlert(header: string, message: string, color: 'success' | 'danger') {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: color === 'success' ? 'custom-success-alert' : 'custom-danger-alert'
    });

    await alert.present();
  }

  goToRegister() {
  this.navCtrl.navigateForward('/register');
  }

}
