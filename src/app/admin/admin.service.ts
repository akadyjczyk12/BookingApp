import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addBook(model: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, model);
  }

  updateBook(model: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${model.id}`, model);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }
}
