import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router){
  }
  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/flights/search']);
    }
    return !this.authService.isLoggedIn();
  }
      
}
  