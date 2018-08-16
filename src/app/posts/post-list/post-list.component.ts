import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/Material';

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
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10 ];
  private postSub: Subscription;

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePosts(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
