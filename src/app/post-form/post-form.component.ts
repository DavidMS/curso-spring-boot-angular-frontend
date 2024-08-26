import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private apiService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        if (this.id) {
          this.apiService.getPostById(this.id).subscribe((data) => {
            console.log(data);
            this.postForm.patchValue({
              id: data.id,
              title: data.title,
              body: data.body,
              author: data.author,
            });
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if(!this.id) {
        this.apiService.addPost(this.postForm.value).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['post/' + data.id]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('Post added');
          },
        });
      } else {
        this.apiService.updatePost(this.postForm.value).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['post/' + data.id]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('Post added');
          },
        });
      }
      
    }
  }
}
