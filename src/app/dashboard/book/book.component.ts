import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Book } from 'src/app/_interfaces/Book';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: Book;
  isAdmin = false;

  constructor(private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAdmin()
  }

  addToReservation(book: Book): void {
    const date = this.formateDate(new Date());
    const bookReserved = {...book, date};
    this.dashboardService.addBookToReservation(bookReserved);
  }
  
  getAdmin() {
    return this.authService.userData$.subscribe(user => {
      if(user?.roles.includes('admin')) {
        this.isAdmin = true;
      }
    })
  }

  private formateDate(date: Date): string {
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth()}` : date.getMonth();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    const time = date.getHours() + ':' + date.getMinutes();
    return month + '-' + day + '-' + year + ' o godzinie ' + time;
  }

}
