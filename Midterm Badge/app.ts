import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Services } from './services/services';
import { Httpclient } from './home/httpclient';
import { Posts } from './services/posts';
import { Comments } from './services/comments';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('midterm-badge');
  httpposts: Posts[] = [];
  httpcomments: Comments[] = [];

  constructor(private http: Httpclient) {}

  ngOnInit() {
    this.http.getPostsRemotely().subscribe((data: Posts[]) => {
      this.httpposts = data;
    });
    this.http.getCommentsRemotely().subscribe((data: Comments[]) => {
      this.httpcomments = data;
    });
  }
}