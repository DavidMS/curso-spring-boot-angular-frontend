import { PostService } from './../post.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from '../truncate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-summary',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    TruncatePipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './post-summary.component.html',
  styleUrl: './post-summary.component.css',
})
export class PostSummaryComponent {
  @Input() post: any;

  @Output() reloadData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private postService: PostService, private router: Router) {}

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (data) => {
        console.log(data);
        this.reloadData.emit();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Delete completed');
      },
    });
  }

  editPost(id: number) {
    this.router.navigate(['post-form/' + id]);
  }
}
