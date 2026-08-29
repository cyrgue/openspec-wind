import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './top-nav/top-nav';

@Component({
  imports: [RouterOutlet, TopNav],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
