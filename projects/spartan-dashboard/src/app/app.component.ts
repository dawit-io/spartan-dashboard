import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from './layout/header/breadcrumb.component';
import { ThemeService } from './layout/service/theme.service';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  HlmSidebarContentHeaderComponent,
  HlmSidebarTriggerComponent,
} from '@dawit-io/hlm-sidebar';
import { BrnSidebarService } from '@dawit-io/brn-sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  providers: [
    BrnSidebarService,
    ThemeService,
    provideIcons({ lucideSun, lucideMoon }),
  ],
  template: `
    <div class="min-h-screen bg-background">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  protected readonly themeService = inject(ThemeService);
  darkMode = signal<boolean>(true);
  @HostBinding('class.dark') get mode() {
    return this.themeService.isDarkMode();
  }
}
