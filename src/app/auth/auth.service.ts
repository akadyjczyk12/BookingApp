import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
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
        }
      })
    );
  }

  logout(): void {
    this.dataSource.next(null);
    this.router.navigateByUrl('/');
  }
}
