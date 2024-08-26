import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postApiUrl: string = "https://curso-springboot-angular-backend.onrender.com/api/post";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(this.postApiUrl);
  }

  getPostById(id: number): Observable<any> {
    const url = `${this.postApiUrl}/${id}`;
    return this.http.get(url);
  }

  addPost(post: any): Observable<any> {
    return this.http.post(this.postApiUrl, post);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.postApiUrl}/${id}`;
    return this.http.delete(url);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(this.postApiUrl, post);
  }
}
