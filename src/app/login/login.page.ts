import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  successMessage = '';

  validation_messages = {
    email: [
      {
        type: "required", message: "El Email es obligatorio."
      },
      {
        type: "email", message: "Email inválido."
      }
    ],
    password: [
      {
        type: "required", message: "La contraseña es obligatoria."
      },
      {
        type: "minlength", message: "La contraseña es muy débil (mínimo 6 caracteres)."
      }
    ]
  };

  constructor(private formBuilder: FormBuilder,private alertController: AlertController, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    });
  }

  ngOnInit() {}

  loginUser(credentials: any) {
  if (this.loginForm.valid) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res =>{
      console.log(res)
    })
    this.presentAlert('Éxito', 'Inicio de sesión exitoso.', 'success');
  } else {
    this.presentAlert('Error', 'Por favor completa todos los campos correctamente.', 'danger');
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

  // Cerrar automáticamente después de 2.5 segundos
  setTimeout(() => {
    alert.dismiss();
  }, 3000);
}

}
