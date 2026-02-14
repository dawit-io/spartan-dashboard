# Spartan Dashboard

A sidebar and dashboard component library for Angular, following the [spartan-ng](https://www.spartan.ng/) Brain/Helm pattern. Headless primitives + pre-styled Tailwind CSS components.

## Packages

| Package | Description |
|---------|-------------|
| [`@dawit-io/spartan-sidebar-core`](https://www.npmjs.com/package/@dawit-io/spartan-sidebar-core) | Headless sidebar primitives (Brain layer) |
| [`@dawit-io/spartan-sidebar`](https://www.npmjs.com/package/@dawit-io/spartan-sidebar) | Pre-styled sidebar components with Tailwind CSS (Helm layer) |

## Live Demo

[spartan-dashboard.gojodigital.com](https://spartan-dashboard.gojodigital.com)

## Quick Start

```bash
npm install @dawit-io/spartan-sidebar @dawit-io/spartan-sidebar-core
```

```html
<hlm-sidebar [variant]="'sidebar'" [collapsibleMode]="'icon'">
  <hlm-sidebar-header>
    <hlm-sidebar-brand>My App</hlm-sidebar-brand>
  </hlm-sidebar-header>
  <hlm-sidebar-nav>
    <hlm-sidebar-item label="Dashboard" routerLink="/dashboard">
      <ng-icon hlm name="lucideLayoutDashboard" class="h-4 w-4" />
    </hlm-sidebar-item>
  </hlm-sidebar-nav>
</hlm-sidebar>
```

## Features

- 3 sidebar variants: `sidebar`, `floating`, `inset`
- 3 collapsible modes: `icon`, `offcanvas`, `none`
- Signal-based reactive state management
- Auto-responsive: switches to offcanvas on mobile (<=768px)
- Dark mode support via Tailwind CSS
- Accessible: ARIA attributes, keyboard navigation, semantic roles
- Collapsible groups with animated expand/collapse
- Auto-tooltips on collapsed items
- Brain/Helm architecture: use headless primitives or styled components

## Development

This is an Angular CLI workspace with three projects:

```
projects/
  brn-sidebar/          # @dawit-io/spartan-sidebar-core (headless)
  hlm-sidebar/          # @dawit-io/spartan-sidebar (styled)
  spartan-dashboard/    # Demo application
```

### Commands

```bash
# Start the demo app
npm start

# Build everything (core -> sidebar -> app)
npm run build

# Watch mode for development
npm run watch:brn    # Watch brn-sidebar
npm run watch:hlm    # Watch hlm-sidebar
npm run watch:app    # Serve spartan-dashboard
```

### Build Order

Libraries must be built before the app:

```bash
npm run build:core    # brn-sidebar
npm run build:sidebar # hlm-sidebar
npm run build:app     # spartan-dashboard
```

## License

MIT
