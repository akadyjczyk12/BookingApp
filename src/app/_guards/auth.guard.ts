import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    let auth = false;
    this.authService.userData$.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      } else {
        auth = true;
      }
    });
    return auth;
  }
}
