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
    this.authService.userData$.subscribe(u => {
      if (u) {
         auth = true;
      } else {
        auth = false;
      }
    });

    if (!auth) {
      this.router.navigate(['login']);
    }

    return auth;
  }
}
