import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_interfaces/Book';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  form: FormGroup;
  bookId: number;
  imgPrev = 'https://via.placeholder.com/150';

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.bookId = +this.activatedRoute.snapshot.params.id;
    this.adminService.getBook(this.bookId).subscribe((book: Book) => {
      this.imgPrev = book.img;
      this.form.patchValue(book);
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  onImgChange(): void {
    this.imgPrev = this.form.controls.img.value;
  }

  onSubmit(): void {
    const id = this.bookId;
    const model = {...this.form.value, id};
    this.adminService.updateBook(model).subscribe(() => {
      this.toastr.success('Zaktualizowano pomyślnie');
      this.router.navigate(['dashboard']);
    }, err => console.log(err));
  }

}
