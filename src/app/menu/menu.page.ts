import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController  } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

    constructor(
      private menu: MenuController,
      private storageService: StorageService,
      private router: Router,
      private toastController: ToastController

    ) {}

    ngOnInit() {}

    closeMenu() {
      this.menu.close();
    }

    async cerrarSesion() {
    // Borra los datos del login
    await this.storageService.remove('isLoggedIn');
    await this.storageService.remove('introSeen');

    // Cierra el menú por si está abierto
    this.menu.close();

    const toast = await this.toastController.create({
      message: 'Sesión cerrada exitosamente',
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();

    // Redirige al login
    this.router.navigateByUrl('/login');
  }
}
