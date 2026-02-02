import { Component, signal } from '@angular/core';
import { Httpclient } from '../home/httpclient';
import { Comments } from '../services/comments';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  httpcomments: Comments[] = [];

  constructor(private http: Httpclient) {}

  ngOnInit() {
    this.http.getCommentsRemotely().subscribe((data: Comments[]) => {
      this.httpcomments = data;
    });
  }
}