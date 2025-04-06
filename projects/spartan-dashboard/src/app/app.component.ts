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
    SidebarComponent,
    HlmSidebarContentHeaderComponent,
    HlmSidebarTriggerComponent,
    MainComponent,
    CommonModule,
    BreadcrumbComponent,
    NgIcon,
  ],
  providers: [
    BrnSidebarService,
    ThemeService,
    provideIcons({ lucideSun, lucideMoon }),
  ],
  template: `
    <div class="flex h-screen bg-background">
      <sidebar> </sidebar>
      <div class="flex-1">
        <hlm-sidebar-content-header>
          <hlm-sidebar-trigger />
          <div class="h-3 w-[1px] bg-foreground/20 ml-2 mr-2"></div>
          <breadcrumb></breadcrumb>
          <div class="ml-auto bg-background">
            <button
              (click)="themeService.toggleDarkMode()"
              class="p-2 rounded-md hover:bg-muted"
            >
              <ng-icon
                hlm
                [name]="themeService.isDarkMode() ? 'lucideSun' : 'lucideMoon'"
                class="h-5 w-5 text-foreground"
              />
            </button>
          </div>
        </hlm-sidebar-content-header>
        <main>
          <router-outlet />
        </main>
      </div>
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
