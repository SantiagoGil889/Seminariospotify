import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})


export class IntroGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate() {
    let intro = await this.storageService.get('home');

    if (!intro) {
      this.router.navigateByUrl('/intro');
      return false;
    }
    return true;
  }
}