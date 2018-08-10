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
  isLoading = false;
  private postSub: Subscription;

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePosts(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
