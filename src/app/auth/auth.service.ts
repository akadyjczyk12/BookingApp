import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private dataSource = new ReplaySubject<User>(1);
  userData$ = this.dataSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any): Observable<void> {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.username === model.username && u.password === model.password);
        if (user) {
          this.dataSource.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout(): void {
    this.dataSource.next(null);
    localStorage.removeItem('user');
    this.clearAll();
    this.router.navigateByUrl('/');
  }

  private clearAll(): void {
    this.userData$ = of(null);
  }
}
