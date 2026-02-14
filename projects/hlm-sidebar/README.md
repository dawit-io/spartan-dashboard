# @dawit-io/spartan-sidebar

Pre-styled Angular sidebar components built on [spartan-ng](https://www.spartan.ng/) Brain/Helm patterns with Tailwind CSS. Part of the [Spartan Dashboard](https://github.com/dawit-io/spartan-dashboard) project.

## Installation

```bash
npm install @dawit-io/spartan-sidebar @dawit-io/spartan-sidebar-core
```

### Peer Dependencies

The following packages are required and should already be in most spartan-ng projects:

```bash
npm install @ng-icons/core @ng-icons/lucide @spartan-ng/ui-icon-helm @spartan-ng/brain clsx
```

## Quick Start

```typescript
import {
  HlmSidebarComponent,
  HlmSidebarHeaderComponent,
  HlmSidebarBrandComponent,
  HlmSidebarNavComponent,
  HlmSidebarItemComponent,
  HlmSidebarFooterComponent,
  HlmSidebarTriggerComponent,
  HlmSidebarContentHeaderComponent,
} from '@dawit-io/spartan-sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideSettings } from '@ng-icons/lucide';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HlmSidebarComponent,
    HlmSidebarHeaderComponent,
    HlmSidebarBrandComponent,
    HlmSidebarNavComponent,
    HlmSidebarItemComponent,
    HlmSidebarFooterComponent,
    HlmSidebarTriggerComponent,
    HlmSidebarContentHeaderComponent,
    NgIcon,
  ],
  providers: [provideIcons({ lucideLayoutDashboard, lucideSettings })],
  template: `
    <div class="flex min-h-screen">
      <hlm-sidebar [variant]="'sidebar'" [collapsibleMode]="'icon'">
        <hlm-sidebar-header>
          <hlm-sidebar-brand>
            <ng-icon hlm name="lucideLayoutDashboard" class="h-6 w-6" />
            <span class="text-sm font-semibold">My App</span>
          </hlm-sidebar-brand>
        </hlm-sidebar-header>

        <hlm-sidebar-nav>
          <hlm-sidebar-item label="Dashboard" routerLink="/dashboard">
            <ng-icon hlm name="lucideLayoutDashboard" class="h-4 w-4" />
          </hlm-sidebar-item>
          <hlm-sidebar-item label="Settings" routerLink="/settings">
            <ng-icon hlm name="lucideSettings" class="h-4 w-4" />
          </hlm-sidebar-item>
        </hlm-sidebar-nav>

        <hlm-sidebar-footer title="User Name" subtitle="user@example.com">
          <ng-icon hlm name="lucideSettings" class="h-5 w-5" />
        </hlm-sidebar-footer>
      </hlm-sidebar>

      <div class="flex-1">
        <hlm-sidebar-content-header>
          <hlm-sidebar-trigger />
        </hlm-sidebar-content-header>
        <!-- main content -->
      </div>
    </div>
  `,
})
export class LayoutComponent {}
```

## Components

| Selector | Description | Key Inputs |
|----------|-------------|------------|
| `hlm-sidebar` | Root sidebar container. Extends `BrnSidebarComponent`. | `variant`, `collapsibleMode`, `isCollapsible`, `isOverlay`, `userClass` |
| `hlm-sidebar-trigger` | Toggle button with panel icons. | `userClass` |
| `hlm-sidebar-header` | Top area of the sidebar. | `userClass` |
| `hlm-sidebar-brand` | Logo and title slot. Projects `ng-icon` and text content. | `userClass` |
| `hlm-sidebar-nav` | Navigation list container. | `userClass` |
| `hlm-sidebar-item` | Navigation item with icon, label, and auto-tooltip when collapsed. | `label` (required), `routerLink`, `routerLinkActive`, `userClass` |
| `hlm-sidebar-group` | Collapsible group container. | `items: SidebarNavItem[]`, `userClass` |
| `hlm-sidebar-group-label` | Clickable group header with chevron and collapsed tooltip. | `label`, `items: SidebarNavItem[]`, `userClass` |
| `hlm-sidebar-group-content` | Animated expandable content for group items. | `items: SidebarNavItem[]`, `userClass` |
| `hlm-sidebar-footer` | Bottom section with user info and auto-tooltip when collapsed. | `title` (required), `subtitle` (required), `userClass` |
| `hlm-sidebar-content-header` | Header bar for the main content area (holds trigger + breadcrumb). | `withBorder`, `userClass` |
| `hlm-sidebar-inset` | Wrapper for inset variant layouts. | `userClass` |
| `[hlmSidebarSectionTitle]` | Section divider text. Hidden when sidebar is collapsed. | `userClass` |
| `hlm-sidebar-group-tooltip` | Popup menu shown on hover for collapsed groups. | `groupLabel`, `items: SidebarNavItem[]` |

## Outputs

| Component | Output | Description |
|-----------|--------|-------------|
| `hlm-sidebar-item` | `clicked` | Emitted when the item is clicked |
| `hlm-sidebar-footer` | `clicked` | Emitted when the footer button is clicked |
| `hlm-sidebar-group-tooltip` | `navigate` | Emitted with the link string when a tooltip item is clicked |

## SidebarNavItem Interface

Used by group components to render navigation items:

```typescript
interface SidebarNavItem {
  label: string;
  link: string;
  routerLinkActive?: string;
}
```

## Collapsible Groups Example

```html
<hlm-sidebar-nav>
  <div hlmSidebarSectionTitle>Platform</div>

  <hlm-sidebar-group>
    <hlm-sidebar-group-label [label]="'Playground'" [items]="playgroundItems">
      <ng-icon hlm name="lucideLayoutDashboard" class="h-4 w-4 text-muted-foreground" />
    </hlm-sidebar-group-label>
    <hlm-sidebar-group-content [items]="playgroundItems" />
  </hlm-sidebar-group>
</hlm-sidebar-nav>
```

```typescript
playgroundItems: SidebarNavItem[] = [
  { label: 'History', link: '/history' },
  { label: 'Starred', link: '/starred' },
  { label: 'Settings', link: '/settings' },
];
```

## Variants & Collapsible Modes

### Variants (`SidebarVariant`)

| Value | Description |
|-------|-------------|
| `'sidebar'` | Standard sticky sidebar on the left |
| `'floating'` | Absolute positioned with shadow, popover style |
| `'inset'` | Card-style sidebar with borders and margins |

### Collapsible Modes (`CollapsibleMode`)

| Value | Description |
|-------|-------------|
| `'icon'` | Collapses to narrow icon bar (w-16). Items show tooltips on hover. |
| `'offcanvas'` | Slides in/out with transform animation. Used automatically on mobile. |
| `'none'` | Always fully visible, no toggle behavior. |

## Dark Mode

Works automatically when the `dark` class is applied to a parent element. The sidebar uses CSS variables from the Tailwind/spartan-ng theme system (`--background`, `--foreground`, `--border`, `--muted`, etc.).

## Import Options

**Standalone (recommended):**

```typescript
import { HlmSidebarComponent, HlmSidebarItemComponent } from '@dawit-io/spartan-sidebar';
```

**Convenience array:**

```typescript
import { HlmSidebarImports } from '@dawit-io/spartan-sidebar';

@Component({
  imports: [...HlmSidebarImports],
})
```

**NgModule:**

```typescript
import { HlmSidebarModule } from '@dawit-io/spartan-sidebar';

@NgModule({
  imports: [HlmSidebarModule],
})
```

## Headless Core

For unstyled primitives or to build your own design system, use [`@dawit-io/spartan-sidebar-core`](https://www.npmjs.com/package/@dawit-io/spartan-sidebar-core).

## Live Demo

[spartan-dashboard.gojodigital.com](https://spartan-dashboard.gojodigital.com)

## License

MIT
