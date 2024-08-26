import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path:'', component: PostListComponent },
    { path:'post-form', component: PostFormComponent },
    { path:'post-form/:id', component: PostFormComponent },
    { path:'post/:id', component: PostDetailComponent },
    { path: 'about', component: AboutComponent }
];
