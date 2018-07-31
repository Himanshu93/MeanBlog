import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //  {title: "First Post ", content: "1 content"},
  //  {title: "Second Post ", content: "2 content"},
  //  {title: "Third Post ", content: "3 content"}
  // ];
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
