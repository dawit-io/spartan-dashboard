import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BrnSidebarService } from '@dawit-io/spartan-sidebar-core';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { ThemeService } from './layout/service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
