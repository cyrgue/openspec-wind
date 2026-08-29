import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="top-nav" aria-label="Primary">
      <ul class="top-nav__links top-nav__links--left">
        <li>
          <a
            routerLink="/"
            routerLinkActive="top-nav__link--active"
            [routerLinkActiveOptions]="{ exact: true }"
            ariaCurrentWhenActive="page"
            class="top-nav__link"
            >Home</a
          >
        </li>
        <li>
          <a
            routerLink="/wind"
            routerLinkActive="top-nav__link--active"
            ariaCurrentWhenActive="page"
            class="top-nav__link"
            >Wind</a
          >
        </li>
      </ul>
      <ul class="top-nav__links top-nav__links--right">
        <li>
          <a
            routerLink="/login"
            routerLinkActive="top-nav__link--active"
            ariaCurrentWhenActive="page"
            class="top-nav__link"
            >Login</a
          >
        </li>
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .top-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 1.5rem;
      padding-block: 1rem;
      background: #ffffff;
      border-bottom: 1px solid #e2e2e2;
    }

    .top-nav__links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .top-nav__link {
      color: #1a1a1a;
      text-decoration: none;
      font-weight: 500;
    }

    .top-nav__link:hover,
    .top-nav__link:focus-visible {
      text-decoration: underline;
    }

    .top-nav__link--active {
      text-decoration: underline;
      font-weight: 700;
    }
  `,
})
export class TopNav {}
