import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_interfaces/Book';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-book-reservation',
  templateUrl: './book-reservation.component.html',
  styleUrls: ['./book-reservation.component.scss']
})
export class BookReservationComponent implements OnInit {

  reservedBooks: Book[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.reservedBooks = this.dashboardService.getBooksReserved();
  }

}
