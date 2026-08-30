import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-nav',
  imports: [RouterLink, RouterLinkActive, NgbCollapse],
  template: `
    <nav class="navbar navbar-expand-md bg-body-tertiary sticky-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler ms-auto"
          type="button"
          (click)="isCollapsed.set(!isCollapsed())"
          [attr.aria-expanded]="!isCollapsed()"
          aria-controls="topNavCollapse"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="topNavCollapse"
          [ngbCollapse]="isCollapsed()"
        >
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/wind" routerLinkActive="active" ariaCurrentWhenActive="page"
                >Wind</a
              >
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/login" routerLinkActive="active" ariaCurrentWhenActive="page"
                >Login</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TopNav {
  protected readonly isCollapsed = signal(true);
}
