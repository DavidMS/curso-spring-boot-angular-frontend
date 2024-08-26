import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../post.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {

  id?: number;
  post?: any;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe(params => {
      this.id = +(params.get('id') ?? 0);
      this.postService.getPostById(this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.post = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Post recuperado');
        }
      })
    });
      
  }


}
