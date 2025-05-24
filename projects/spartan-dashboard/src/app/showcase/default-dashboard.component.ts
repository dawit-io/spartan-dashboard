import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, input, signal } from '@angular/core';
import { BrnSidebarService, CollapsibleMode, SidebarVariant } from '@dawit-io/spartan-sidebar-core';
import {
  HlmSidebarContentHeaderComponent,
  HlmSidebarTriggerComponent,
} from '@dawit-io/spartan-sidebar';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { BreadcrumbComponent } from '../layout/header/breadcrumb.component';
import { ThemeService } from '../layout/service/theme.service';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { GridComponent } from './grid.components';

@Component({
  selector: 'default-dashboard',
  imports: [
    SidebarComponent,
    HlmSidebarContentHeaderComponent,
    HlmSidebarTriggerComponent,
    CommonModule,
    BreadcrumbComponent,
    GridComponent,
  ],
  providers: [
    BrnSidebarService,
    ThemeService,
    provideIcons({ lucideSun, lucideMoon }),
  ],
  template: `
    <div class="flex bg-background border-gray min-h-screen">
      <sidebar
      [sidebarVariant]="sidebarVariant()"
      [collapsibleMode]="collapsibleMode()"> </sidebar>
      <div class="flex-1">
        <hlm-sidebar-content-header>
          <hlm-sidebar-trigger />
          <div class="h-3 w-[1px] bg-foreground/20 ml-2 mr-2"></div>
          <breadcrumb></breadcrumb>
          <div class="ml-auto bg-background"></div>
        </hlm-sidebar-content-header>
        <grid></grid>
      </div>
    </div>
  `,
})
export class DefaultDashboardComponent {
  protected readonly themeService = inject(ThemeService);
  darkMode = signal<boolean>(true);
  sidebarVariant = input<SidebarVariant>('sidebar');
  collapsibleMode = input<CollapsibleMode>('icon');
  @HostBinding('class.dark') get mode() {
    return this.themeService.isDarkMode();
  }
}
