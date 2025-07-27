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
    try {
      // ⚠️ Asegurar que el storage esté listo
      await this.storageService.init();

      const isLoggedIn = !!(await this.storageService.get('isLoggedIn'));
      const introSeen = !!(await this.storageService.get('introSeen'));

      if (!introSeen) {
        this.router.navigateByUrl('/intro');
        return false;
      }

      if (!isLoggedIn) {
        this.router.navigateByUrl('/login');
        return false;
      }

      return true;

    } catch (error) {
      console.error('Error en IntroGuard:', error);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
