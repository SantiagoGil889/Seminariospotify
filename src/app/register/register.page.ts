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
    userName: [{ type: 'required', message: 'El nombre de usuario es obligatorio.' }],
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
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async registerUser() {
    if (this.registerForm.valid) {
      const form = this.registerForm.value;

      const userData = {
        email: form.email,
        password: form.password,
        name: form.nombre,
        username: form.userName,
        last_name: form.apellido
      };

      try {
        const response = await this.authService.registerUser(userData);
        console.log('Respuesta del backend:', response);

        // Si el backend responde correctamente con "user" o "success"
        if (response.status==="OK") {
          await this.storageService.set('userData', response.user || userData);
          await this.storageService.set('isLoggedIn', true);

          const alert = await this.alertCtrl.create({
            header: 'Registro exitoso',
            message: '¡Tu cuenta ha sido creada correctamente!',
            buttons: ['OK']
          });
          await alert.present();
          await alert.onDidDismiss();

          this.navCtrl.navigateRoot('/login');
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error en el registro',
            message: response.message || 'No se pudo completar el registro.',
            buttons: ['OK']
          });
          await alert.present();
        }

      } catch (error: any) {
        console.error('Error al registrar:', error);

        let errorMessage = 'Ocurrió un error inesperado.';

        // Intentar extraer un mensaje más claro si es posible
        if (error.message?.includes('422')) {
          errorMessage = 'Ya existe un usuario con ese correo o nombre de usuario.';
        } else if (error.message) {
          errorMessage = error.message;
        }

        const alert = await this.alertCtrl.create({
          header: 'Fallo al registrar',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
