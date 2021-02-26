import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_interfaces/Book';
import { BookReservation } from '../_interfaces/BookReservation';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;
  private bookReserved: BookReservation[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  get getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  addBookToReservation(book: BookReservation): void {
    if (this.isBookReserved(book)) {
      this.toastr.info('Ta pozycja została jest juz zarezerwowana wcześniej');
      return;
    }
    this.bookReserved.unshift(book);
    this.toastr.success('Dodano do Twoich rezerwacji');
  }

  getBooksReserved(): BookReservation[] {
    return this.bookReserved;
  }

  isBookReserved(book: BookReservation): boolean {
    // TODO: warunek czy zalogowana osoba rezerwuje
    return this.bookReserved.some(b => b.id === book.id);
  }


}
