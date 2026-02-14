import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck, lucideArrowRight } from '@ng-icons/lucide';
import { HeaderComponent } from '../../showcase/demo/header.component';

interface ComponentDoc {
  selector: string;
  description: string;
  inputs?: { name: string; type: string; default: string; description: string }[];
  outputs?: { name: string; type: string; description: string }[];
}

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  components: ComponentDoc[];
}

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [HeaderComponent, NgIcon],
  providers: [provideIcons({ lucideCopy, lucideCheck, lucideArrowRight })],
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <header></header>

      <main class="flex-1">
        <div class="container px-4 py-6">
          <!-- Page header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold">Components</h1>
            <p class="text-sm text-muted-foreground mt-1">
              API reference for <code class="text-xs bg-muted px-1 rounded">&#64;dawit-io/spartan-sidebar</code>
            </p>
          </div>

          <!-- Two-column layout -->
          <div class="flex gap-8">
            <!-- Sidebar nav (desktop only) -->
            <nav class="hidden lg:block w-48 shrink-0 sticky top-20 self-start">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On this page</p>
              <ul class="space-y-1 text-sm">
                <li><a (click)="scrollTo('installation')" class="block py-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Installation</a></li>
                @for (section of sections; track section.id) {
                  <li><a (click)="scrollTo(section.id)" class="block py-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{{ section.title }}</a></li>
                }
                <li><a (click)="scrollTo('types')" class="block py-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Types</a></li>
              </ul>
            </nav>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <!-- Installation & Import -->
              <div id="installation" class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-lg border border-border bg-card p-5">
                  <h2 class="text-base font-semibold mb-3">Installation</h2>
                  <div class="group relative rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                    <button
                      (click)="copyToClipboard('npm install @dawit-io/spartan-sidebar @dawit-io/spartan-sidebar-core', 0)"
                      class="absolute top-2 right-2 p-1.5 rounded-md hover:bg-background/80 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ng-icon hlm [name]="copiedIndex === 0 ? 'lucideCheck' : 'lucideCopy'" class="h-4 w-4 text-muted-foreground" />
                    </button>
                    <p>npm install &#64;dawit-io/spartan-sidebar \\</p>
                    <p>&nbsp;&nbsp;&#64;dawit-io/spartan-sidebar-core</p>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span class="text-xs font-medium text-muted-foreground">Peer dependencies:</span>
                    <code class="text-xs bg-muted px-2 py-0.5 rounded-md">&#64;ng-icons/core</code>
                    <code class="text-xs bg-muted px-2 py-0.5 rounded-md">&#64;ng-icons/lucide</code>
                    <code class="text-xs bg-muted px-2 py-0.5 rounded-md">&#64;spartan-ng/ui-icon-helm</code>
                    <code class="text-xs bg-muted px-2 py-0.5 rounded-md">&#64;spartan-ng/brain</code>
                    <code class="text-xs bg-muted px-2 py-0.5 rounded-md">clsx</code>
                  </div>
                </div>

                <div class="rounded-lg border border-border bg-card p-5">
                  <h2 class="text-base font-semibold mb-3">Import</h2>
                  <div class="group relative rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                    <button
                      (click)="copyToClipboard('import { HlmSidebarImports } from \\'@dawit-io/spartan-sidebar\\';', 1)"
                      class="absolute top-2 right-2 p-1.5 rounded-md hover:bg-background/80 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ng-icon hlm [name]="copiedIndex === 1 ? 'lucideCheck' : 'lucideCopy'" class="h-4 w-4 text-muted-foreground" />
                    </button>
                    <p class="text-muted-foreground">// All components</p>
                    <p>import &#123; HlmSidebarImports &#125;</p>
                    <p>&nbsp;&nbsp;from '&#64;dawit-io/spartan-sidebar';</p>
                    <p class="mt-3 text-muted-foreground">// Or individual</p>
                    <p>import &#123; HlmSidebarComponent &#125;</p>
                    <p>&nbsp;&nbsp;from '&#64;dawit-io/spartan-sidebar';</p>
                  </div>
                </div>
              </div>

              <!-- Component API sections -->
              @for (section of sections; track section.id) {
                <div [id]="section.id" class="rounded-lg border border-border bg-card p-5 mb-4">
                  <h2 class="text-base font-semibold mb-0.5">{{ section.title }}</h2>
                  <p class="text-xs text-muted-foreground mb-4">{{ section.description }}</p>

                  @for (comp of section.components; track comp.selector; let last = $last) {
                    <div [class.mb-5]="!last" [class.pb-5]="!last" [class.border-b]="!last" class="border-border/50">
                      <h3 class="font-mono text-xs font-semibold bg-muted inline-block px-2 py-1 rounded mb-2">
                        &lt;{{ comp.selector }}&gt;
                      </h3>
                      <p class="text-sm text-muted-foreground mb-2">{{ comp.description }}</p>

                      @if (comp.inputs && comp.inputs.length > 0) {
                        <div class="overflow-x-auto">
                          <table class="w-full text-sm border-collapse">
                            <thead>
                              <tr class="border-b border-border">
                                <th class="text-left py-1.5 pr-3 text-xs font-medium text-muted-foreground">Input</th>
                                <th class="text-left py-1.5 pr-3 text-xs font-medium text-muted-foreground">Type</th>
                                <th class="text-left py-1.5 pr-3 text-xs font-medium text-muted-foreground">Default</th>
                                <th class="text-left py-1.5 text-xs font-medium text-muted-foreground">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              @for (input of comp.inputs; track input.name) {
                                <tr class="border-b border-border/30">
                                  <td class="py-1.5 pr-3 font-mono text-xs">{{ input.name }}</td>
                                  <td class="py-1.5 pr-3 font-mono text-xs text-muted-foreground">{{ input.type }}</td>
                                  <td class="py-1.5 pr-3 font-mono text-xs text-muted-foreground">{{ input.default }}</td>
                                  <td class="py-1.5 text-xs text-muted-foreground">{{ input.description }}</td>
                                </tr>
                              }
                            </tbody>
                          </table>
                        </div>
                      }

                      @if (comp.outputs && comp.outputs.length > 0) {
                        <div class="overflow-x-auto mt-2">
                          <table class="w-full text-sm border-collapse">
                            <thead>
                              <tr class="border-b border-border">
                                <th class="text-left py-1.5 pr-3 text-xs font-medium text-muted-foreground">Output</th>
                                <th class="text-left py-1.5 pr-3 text-xs font-medium text-muted-foreground">Type</th>
                                <th class="text-left py-1.5 text-xs font-medium text-muted-foreground">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              @for (output of comp.outputs; track output.name) {
                                <tr class="border-b border-border/30">
                                  <td class="py-1.5 pr-3 font-mono text-xs">{{ output.name }}</td>
                                  <td class="py-1.5 pr-3 font-mono text-xs text-muted-foreground">{{ output.type }}</td>
                                  <td class="py-1.5 text-xs text-muted-foreground">{{ output.description }}</td>
                                </tr>
                              }
                            </tbody>
                          </table>
                        </div>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Types Reference -->
              <div id="types" class="rounded-lg border border-border bg-card p-5 mb-6">
                <h2 class="text-base font-semibold mb-3">Types</h2>
                <div class="group relative rounded-md bg-muted p-3 font-mono text-xs overflow-x-auto">
                  <button
                    (click)="copyToClipboard(typesCode, 2)"
                    class="absolute top-1.5 right-1.5 p-1 rounded hover:bg-background/80 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ng-icon hlm [name]="copiedIndex === 2 ? 'lucideCheck' : 'lucideCopy'" class="h-3 w-3 text-muted-foreground" />
                  </button>
                  <p>type SidebarVariant = 'sidebar' | 'floating' | 'inset';</p>
                  <p>type CollapsibleMode = 'offcanvas' | 'icon' | 'none';</p>
                  <p class="mt-2">interface SidebarNavItem &#123;</p>
                  <p>&nbsp;&nbsp;label: string;</p>
                  <p>&nbsp;&nbsp;link: string;</p>
                  <p>&nbsp;&nbsp;routerLinkActive?: string;</p>
                  <p>&#125;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="border-t py-6 md:py-0">
        <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2026 Spartan Dashboard.
          </p>
        </div>
      </footer>
    </div>
  `,
})
export class ComponentsPageComponent {
  copiedIndex: number | null = null;

  typesCode = `type SidebarVariant = 'sidebar' | 'floating' | 'inset';
type CollapsibleMode = 'offcanvas' | 'icon' | 'none';

interface SidebarNavItem {
  label: string;
  link: string;
  routerLinkActive?: string;
}`;

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text);
    this.copiedIndex = index;
    setTimeout(() => (this.copiedIndex = null), 2000);
  }

  sections: ComponentSection[] = [
    {
      id: 'sidebar-container',
      title: 'Sidebar Container',
      description: 'The root component that wraps all sidebar content and provides state management.',
      components: [
        {
          selector: 'hlm-sidebar',
          description: 'Root sidebar container. Extends BrnSidebarComponent and provides BrnSidebarService to all children.',
          inputs: [
            { name: 'variant', type: 'SidebarVariant', default: "'sidebar'", description: 'Layout variant: sidebar, floating, or inset' },
            { name: 'collapsibleMode', type: 'CollapsibleMode', default: "'icon'", description: 'Collapse behavior: icon, offcanvas, or none' },
            { name: 'isCollapsible', type: 'boolean', default: 'true', description: 'Whether the sidebar can be collapsed' },
            { name: 'isOverlay', type: 'boolean', default: 'false', description: 'Whether the sidebar overlays the content' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
    {
      id: 'trigger',
      title: 'Trigger',
      description: 'Toggle button to expand/collapse the sidebar.',
      components: [
        {
          selector: 'hlm-sidebar-trigger',
          description: 'Pre-styled toggle button with panel icons. Shows lucidePanelLeft when expanded, lucidePanelRight when collapsed.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
    {
      id: 'header-brand',
      title: 'Header & Brand',
      description: 'Top area of the sidebar for branding and titles.',
      components: [
        {
          selector: 'hlm-sidebar-header',
          description: 'Container for the top area of the sidebar.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
        {
          selector: 'hlm-sidebar-brand',
          description: 'Logo and title area. Projects an ng-icon into a styled container and text content beside it.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
    {
      id: 'navigation',
      title: 'Navigation',
      description: 'Navigation list and individual items with icon support.',
      components: [
        {
          selector: 'hlm-sidebar-nav',
          description: 'Vertical navigation list container.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
        {
          selector: 'hlm-sidebar-item',
          description: 'Navigation item with icon, label, routerLink, and auto-tooltip when collapsed.',
          inputs: [
            { name: 'label', type: 'string', default: '(required)', description: 'Display text for the item' },
            { name: 'routerLink', type: 'string | any[]', default: "''", description: 'Angular router link' },
            { name: 'routerLinkActive', type: 'string', default: "''", description: 'CSS class when route is active' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
          outputs: [
            { name: 'clicked', type: 'EventEmitter<void>', description: 'Emitted when the item is clicked' },
          ],
        },
        {
          selector: '[hlmSidebarSectionTitle]',
          description: 'Section divider text. Automatically hidden when sidebar is collapsed.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
    {
      id: 'groups',
      title: 'Collapsible Groups',
      description: 'Group navigation items under a collapsible header with expand/collapse animation.',
      components: [
        {
          selector: 'hlm-sidebar-group',
          description: 'Container for a collapsible group. Wraps a group-label and group-content.',
          inputs: [
            { name: 'items', type: 'SidebarNavItem[]', default: '[]', description: 'Navigation items for the group' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
        {
          selector: 'hlm-sidebar-group-label',
          description: 'Clickable group header with chevron. Shows dropdown tooltip when sidebar is collapsed.',
          inputs: [
            { name: 'label', type: 'string', default: "''", description: 'Display text for the group' },
            { name: 'items', type: 'SidebarNavItem[]', default: '[]', description: 'Items shown in the collapsed tooltip' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
        {
          selector: 'hlm-sidebar-group-content',
          description: 'Animated expandable area that renders group items.',
          inputs: [
            { name: 'items', type: 'SidebarNavItem[]', default: '[]', description: 'Navigation items to render' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
    {
      id: 'footer',
      title: 'Footer',
      description: 'Bottom section of the sidebar, typically for user info or actions.',
      components: [
        {
          selector: 'hlm-sidebar-footer',
          description: 'Footer button. Shows icon + title/subtitle when expanded, icon with tooltip when collapsed.',
          inputs: [
            { name: 'title', type: 'string', default: '(required)', description: 'Primary text (e.g., user name)' },
            { name: 'subtitle', type: 'string', default: '(required)', description: 'Secondary text (e.g., email)' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
          outputs: [
            { name: 'clicked', type: 'EventEmitter<void>', description: 'Emitted when the footer is clicked' },
          ],
        },
      ],
    },
    {
      id: 'content-header',
      title: 'Content Header & Inset',
      description: 'Utilities for the main content area alongside the sidebar.',
      components: [
        {
          selector: 'hlm-sidebar-content-header',
          description: 'Header bar for the main content area. Holds trigger button and breadcrumb.',
          inputs: [
            { name: 'withBorder', type: 'boolean', default: 'false', description: 'Show a bottom border' },
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
        {
          selector: 'hlm-sidebar-inset',
          description: 'Wrapper component for layouts using the inset sidebar variant.',
          inputs: [
            { name: 'userClass', type: 'ClassValue', default: "''", description: 'Additional Tailwind CSS classes' },
          ],
        },
      ],
    },
  ];
}
