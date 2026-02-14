# @dawit-io/spartan-sidebar-core

Headless, unstyled Angular sidebar primitives with signal-based state management. Part of the [Spartan Dashboard](https://github.com/dawit-io/spartan-dashboard) project.

## Installation

```bash
npm install @dawit-io/spartan-sidebar-core
```

## Quick Start

```typescript
import { BrnSidebarComponent, BrnSidebarTriggerDirective } from '@dawit-io/spartan-sidebar-core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BrnSidebarComponent, BrnSidebarTriggerDirective],
  template: `
    <div class="flex">
      <brn-sidebar [variant]="'sidebar'" [collapsibleMode]="'icon'">
        <!-- sidebar content -->
      </brn-sidebar>
      <div>
        <button brnSidebarTrigger>Toggle</button>
        <!-- main content -->
      </div>
    </div>
  `,
})
export class LayoutComponent {}
```

## Components & Directives

| Export | Selector | Description |
|--------|----------|-------------|
| `BrnSidebarComponent` | `brn-sidebar` | Root sidebar container. Provides `BrnSidebarService` to children. |
| `BrnSidebarTriggerDirective` | `[brnSidebarTrigger]` | Toggle directive. Apply to any button to expand/collapse the sidebar. |
| `BrnSidebarGroupDirective` | `[brnSidebarGroup]` | Collapsible group container with `toggleExpansion()` method. |
| `BrnSidebarGroupLabelDirective` | `[brnSidebarGroupLabel]` | Label for a group. Auto-generates ID for ARIA `aria-labelledby`. |
| `BrnSidebarNavDirective` | `[brnSidebarNav]` | Navigation container with `role="navigation"`. |
| `BrnSidebarNavItemDirective` | `[brnSidebarNavItem]` | Navigation item. Inputs: `icon`, `isActive`. Sets `aria-current="page"` when active. |
| `BrnSidebarFooterComponent` | `brn-sidebar-footer` | Footer slot at the bottom of the sidebar. |

## BrnSidebarComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `isCollapsible` | `boolean` | `true` | Whether the sidebar can be collapsed |
| `isOverlay` | `boolean` | `false` | Whether the sidebar overlays the content |
| `variant` | `SidebarVariant` | `'sidebar'` | Layout variant |
| `collapsibleMode` | `CollapsibleMode` | `'icon'` | Collapse behavior |

## BrnSidebarService

Injected automatically by `BrnSidebarComponent`. Access it in child components via `inject(BrnSidebarService)`.

### Signals (read-only)

| Signal | Type | Description |
|--------|------|-------------|
| `id` | `string` | Auto-generated sidebar ID |
| `isExpanded` | `boolean` | Current expansion state |
| `isCollapsible` | `boolean` | Whether sidebar can collapse |
| `isMobile` | `boolean` | `true` when viewport <= 768px |
| `isOverlay` | `boolean` | Whether overlay mode is active |
| `variant` | `SidebarVariant` | Current variant |
| `collapsibleMode` | `CollapsibleMode` | Current collapsible mode |

### Methods

| Method | Description |
|--------|-------------|
| `toggle()` | Toggle expanded/collapsed state (no-op if `isCollapsible` is false) |
| `setVariant(variant)` | Change the layout variant |
| `setCollapsibleMode(mode)` | Change the collapsible mode |
| `setMobileState(isMobile)` | Set mobile state (auto-switches to offcanvas + overlay on mobile) |
| `setOverlayMode(isOverlay)` | Set overlay mode |
| `setCollapsible(isCollapsible)` | Set whether sidebar is collapsible |

## Types

```typescript
type SidebarVariant = 'sidebar' | 'floating' | 'inset';
type CollapsibleMode = 'offcanvas' | 'icon' | 'none';
```

### Variants

- **`sidebar`** -- Standard fixed sidebar, sticky to the left
- **`floating`** -- Absolute positioned with shadow, overlays content
- **`inset`** -- Bordered card-style sidebar with margins

### Collapsible Modes

- **`icon`** -- Collapses to a narrow icon-only bar
- **`offcanvas`** -- Slides in/out from the left with transform animation
- **`none`** -- Always visible, no collapse behavior

### Mobile Behavior

The service auto-detects viewports <= 768px and switches to `offcanvas` mode with overlay enabled. The sidebar is closed by default on mobile.

## Import Options

**Standalone (recommended):**

```typescript
import { BrnSidebarComponent, BrnSidebarTriggerDirective } from '@dawit-io/spartan-sidebar-core';

@Component({
  imports: [BrnSidebarComponent, BrnSidebarTriggerDirective],
})
```

**Convenience array:**

```typescript
import { BrnSidebarImports } from '@dawit-io/spartan-sidebar-core';

@Component({
  imports: [...BrnSidebarImports],
})
```

**NgModule:**

```typescript
import { BrnSidebarModule } from '@dawit-io/spartan-sidebar-core';

@NgModule({
  imports: [BrnSidebarModule],
})
```

## Styled Version

For pre-styled components with Tailwind CSS, use [`@dawit-io/spartan-sidebar`](https://www.npmjs.com/package/@dawit-io/spartan-sidebar).

## Live Demo

[spartan-dashboard.gojodigital.com](https://spartan-dashboard.gojodigital.com)

## License

MIT
