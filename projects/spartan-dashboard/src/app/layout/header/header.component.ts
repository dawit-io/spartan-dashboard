import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideSun, lucideMoon } from '@ng-icons/lucide';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIcon
  ],
  providers: [
    provideIcons({
      lucideGithub,
      lucideSun,
      lucideMoon
    }),
  ],
  template: `
    <div class="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 max-w-screen-2xl items-center">
        <div class="flex items-center space-x-2 mr-4">
          <img src="icons/logo.png" alt="Spartan Dashboard Logo" class="w-6 h-6" />
          <span class="hidden font-bold sm:inline-block">Spartan Dashboard</span>
        </div>

        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav class="flex items-center">
            <a href="#" class="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Docs</a>
            <a href="#" class="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Components</a>
            <a href="#" class="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">Examples</a>
          </nav>

          <div class="flex items-center space-x-1">
            <button
              (click)="themeService.toggleDarkMode()"
              class="p-2 rounded-md hover:bg-muted">
              <ng-icon hlm
                [name]="themeService.isDarkMode() ? 'lucideSun' : 'lucideMoon'"
                class="h-5 w-5 text-foreground"
              />
            </button>

            <a href="https://github.com/username/spartan-dashboard" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-muted">
              <ng-icon hlm name="lucideGithub" class="h-5 w-5 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Spacer per compensare l'header fixed -->
    <div class="h-14"></div>
  `
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
}
