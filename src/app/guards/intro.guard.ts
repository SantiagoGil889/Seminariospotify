import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storageService.get('isLoggedIn');

    if (!isLoggedIn) {
      // Si el usuario no está autenticado, lo redirige al login
      this.router.navigateByUrl('/login');
      return false;
    }

    // Si está autenticado, permite el acceso
    return true;
  }
}
