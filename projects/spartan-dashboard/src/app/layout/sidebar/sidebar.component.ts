import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayers,
  lucideLayoutDashboard,
  lucideSettings,
  lucideCircleHelp,
  lucideUsers,
  lucideCalendar,
  lucideInbox,
  lucideSquare,
  lucideFileText,
  lucideMoveHorizontal,
  lucideUser,
  lucideCreditCard,
  lucideLogOut,
} from '@ng-icons/lucide';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { ThemeService } from '../service/theme.service';
import {
  HlmSidebarBrandComponent,
  HlmSidebarComponent,
  HlmSidebarFooterComponent,
  HlmSidebarGroupComponent,
  HlmSidebarGroupContentComponent,
  HlmSidebarGroupLabelComponent,
  HlmSidebarHeaderComponent,
  HlmSidebarItemComponent,
  HlmSidebarNavComponent,
  HlmSidebarSectionTitleDirective,
} from '@dawit-io/spartan-sidebar';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
  HlmMenuSeparatorComponent,
  HlmMenuItemIconDirective,
  HlmMenuGroupComponent,
} from '@spartan-ng/ui-menu-helm';
import { SidebarNavItem } from '../../../../../hlm-sidebar/src/lib/hlm-sidebar-group-tooltip.component';
import { CollapsibleMode, SidebarVariant } from 'brn-sidebar';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    NgIcon,
    HlmSidebarComponent,
    HlmSidebarBrandComponent,
    HlmSidebarHeaderComponent,
    HlmSidebarNavComponent,
    HlmSidebarItemComponent,
    HlmSidebarGroupComponent,
    HlmSidebarGroupLabelComponent,
    HlmSidebarGroupContentComponent,
    HlmSidebarSectionTitleDirective,
    HlmSidebarFooterComponent,
    RouterLink,
    RouterLinkActive,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
  ],
  providers: [
    provideIcons({
      lucideLayers,
      lucideLayoutDashboard,
      lucideSettings,
      lucideCircleHelp,
      lucideUsers,
      lucideCalendar,
      lucideInbox,
      lucideSquare,
      lucideFileText,
      lucideMoveHorizontal,
      lucideUser,
      lucideCreditCard,
      lucideLogOut,
    }),
  ],
  template: `
    <hlm-sidebar
      [variant]="sidebarVariant()"
      [collapsibleMode]="collapsibleMode()"

    >
      <hlm-sidebar-header>
        <hlm-sidebar-brand>
          <ng-icon hlm name="lucideSquare" class="h-6 w-6" />
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-foreground">Acme Inc</span>
            <span class="text-xs text-muted-foreground">Enterprise</span>
          </div>
        </hlm-sidebar-brand>
      </hlm-sidebar-header>
      <hlm-sidebar-nav>
        <div hlmSidebarSectionTitle>Platform</div>
        <hlm-sidebar-group>
          <hlm-sidebar-group-label
            [label]="'Playground'"
            [items]="playgroundItems"
          >
            <ng-icon
              hlm
              name="lucideLayoutDashboard"
              class="h-4 w-4 text-muted-foreground"
            />
          </hlm-sidebar-group-label>
          <hlm-sidebar-group-content [items]="playgroundItems" />
        </hlm-sidebar-group>

        <hlm-sidebar-group>
          <hlm-sidebar-group-label [label]="'Models'" [items]="models">
            <ng-icon
              hlm
              name="lucideLayers"
              class="h-4 w-4 text-muted-foreground"
            />
          </hlm-sidebar-group-label>
          <hlm-sidebar-group-content [items]="models" />
        </hlm-sidebar-group>

        <hlm-sidebar-item
          label="Settings"
          routerLink="/settings"
          routerLinkActive="active"
          (clicked)="onNavigate('/settings')"
        >
          <ng-icon
            hlm
            name="lucideSettings"
            class="h-4 w-4 text-muted-foreground"
          />
        </hlm-sidebar-item>

        <div hlmSidebarSectionTitle>Projects</div>

        @for(project of projects; track project.label) {
        <hlm-sidebar-item
          [label]="project.label"
          [routerLink]="project.route"
          routerLinkActive="active"
          (clicked)="onNavigate(project.route)"
        >
          <ng-icon
            hlm
            [name]="project.icon"
            class="h-4 w-4 text-muted-foreground"
          />
        </hlm-sidebar-item>
        }
      </hlm-sidebar-nav>

      <hlm-sidebar-footer
        title="User Name"
        subtitle="user@example.com"
        hlmMenuBarItem
        brnMenuItem
        [brnMenuTriggerFor]="menu"
      >
        <ng-icon hlm name="lucideUser" class="h-5 w-5 text-muted-foreground" />
      </hlm-sidebar-footer>
    </hlm-sidebar>

    <ng-template #menu>
      <hlm-menu [class]="_computedHlmMenuClass()">
        <hlm-menu-group>
          <button hlmMenuItem>
            <ng-icon hlm name="lucideUser" hlmMenuIcon />
            <span>Profile</span>
            <ng-icon hlm class="ml-auto h-4 w-4" name="lucideUser" />
          </button>
          <button hlmMenuItem>
            <ng-icon hlm name="lucideCreditCard" hlmMenuIcon />
            <span>Billing</span>
            <ng-icon hlm class="ml-auto h-4 w-4" name="lucideCreditCard" />
          </button>
          <button hlmMenuItem>
            <ng-icon hlm name="lucideSettings" hlmMenuIcon />
            <span>Settings</span>
            <ng-icon hlm class="ml-auto h-4 w-4" name="lucideSettings" />
          </button>
          <button hlmMenuItem>
            <ng-icon hlm name="lucideCircleHelp" hlmMenuIcon />
            <span>Support</span>
            <ng-icon hlm class="ml-auto h-4 w-4" name="lucideCircleHelp" />
          </button>
        </hlm-menu-group>
        <hlm-menu-separator />
        <button hlmMenuItem>
          <ng-icon hlm name="lucideLogOut" hlmMenuIcon />
          <span>Log out</span>
          <ng-icon hlm class="ml-auto h-4 w-4" name="lucideLogOut" />
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class SidebarComponent {
  sidebarVariant = input<SidebarVariant>('sidebar');
  collapsibleMode = input<CollapsibleMode>('icon');

  protected readonly _themeService = inject(ThemeService);
  protected readonly _computedHlmMenuClass = computed(() =>
    this._themeService.isDarkMode() ? 'dark w-56' : 'w-56'
  );

  playgroundItems: SidebarNavItem[] = [
    { label: 'History', link: '/history', routerLinkActive: 'active' },
    { label: 'Starred', link: '/starred', routerLinkActive: 'active' },
    { label: 'Settings', link: '/settings', routerLinkActive: 'active' },
  ];

  models: SidebarNavItem[] = [
    { label: 'Genesis', link: '/models/genesis', routerLinkActive: 'active' },
    { label: 'Explorer', link: '/models/explorer', routerLinkActive: 'active' },
    { label: 'Quantum', link: '/models/quantum', routerLinkActive: 'active' },
  ];

  projects = [
    {
      label: 'Design Engineering',
      route: '/projects/design',
      icon: 'lucideCalendar',
    },
    {
      label: 'Sales & Marketing',
      route: '/projects/sales',
      icon: 'lucideUsers',
    },
    { label: 'Travel', route: '/projects/travel', icon: 'lucideCalendar' },
  ];

  onNavigate(route: string) {}
}
