import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../_interfaces/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: Observable<User> = this.authService.userData$;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
