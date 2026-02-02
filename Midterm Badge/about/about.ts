import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, DatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  currentDate: Date = new Date();
}