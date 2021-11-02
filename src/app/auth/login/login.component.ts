import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public model = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe()
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.sub.add(this.authService.login(this.model).subscribe());
    this.sub.add(this.authService.userData$.subscribe(user => {
      if (user) {
        this.router.navigate(['dashboard']);
      }
    }));

  }

}
