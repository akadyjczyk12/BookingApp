import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../_interfaces/Book';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  form: FormGroup;
  errors: string[];
  imgPrev = 'https://via.placeholder.com/150';

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, Validators.required],
      description: [null, [Validators.required]],
      img: [null, [Validators.required]]
    });
  }

  onImgChange(): void {
    this.imgPrev = this.form.controls.img.value;
  }

  onSubmit(): void {
    this.adminService.addBook(this.form.value).subscribe(b => {
      if (b) {
        this.toastr.success('Dodano nową pozycję', 'Sukces!');
        this.router.navigate(['dashboard']);
      }
    }, err => {
      console.log(err);
    });
  }
}
