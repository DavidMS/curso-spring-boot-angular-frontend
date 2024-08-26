import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TruncatePipe } from '../truncate.pipe';
import { PostSummaryComponent } from "../post-summary/post-summary.component";
import { PostDetailComponent } from '../post-detail/post-detail.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    NgFor,
    MatButtonModule,
    TruncatePipe,
    PostSummaryComponent,
    PostDetailComponent
],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        console.log('Retrieving posts');
        this.posts = posts;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Call completed');
      },
    });
  }
}
