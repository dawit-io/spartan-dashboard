import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayoutDashboard,
  lucidePanelLeft,
  lucideZap,
  lucideArrowRight,
  lucideCopy,
  lucideCheck,
} from '@ng-icons/lucide';
import { HeaderComponent } from '../../showcase/demo/header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterLink, NgIcon, HeaderComponent],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucidePanelLeft,
      lucideZap,
      lucideArrowRight,
      lucideCopy,
      lucideCheck,
    }),
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <header></header>

      <main class="flex-1">
        <!-- Hero + Features combined to fit above fold -->
        <section class="w-full pt-10 md:pt-16 pb-6">
          <div class="container px-4 flex flex-col items-center text-center">
            <h1 class="text-3xl md:text-5xl font-bold tracking-tight">
              Spartan Sidebar
            </h1>
            <p class="mt-3 text-base text-muted-foreground max-w-2xl">
              A sidebar and dashboard component library for Angular, built on
              spartan-ng Brain/Helm patterns with Tailwind CSS.
            </p>
            <div class="mt-6 flex gap-3">
              <a
                routerLink="/components"
                class="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ng-icon hlm name="lucideArrowRight" class="h-4 w-4" />
              </a>
              <a
                routerLink="/showcase"
                class="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                View Examples
              </a>
            </div>
          </div>
        </section>

        <!-- Feature Cards -->
        <section class="w-full py-6">
          <div class="container px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
                <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <ng-icon hlm name="lucideLayoutDashboard" class="h-4 w-4 text-primary" />
                </div>
                <h3 class="text-base font-semibold">3 Sidebar Variants</h3>
                <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">sidebar</code>,
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">floating</code>, and
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">inset</code> layouts.
                </p>
              </div>

              <div class="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
                <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <ng-icon hlm name="lucidePanelLeft" class="h-4 w-4 text-primary" />
                </div>
                <h3 class="text-base font-semibold">3 Collapsible Modes</h3>
                <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">icon</code>,
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">offcanvas</code>, and
                  <code class="text-xs bg-muted px-1 py-0.5 rounded">none</code>.
                  Auto-switches on mobile.
                </p>
              </div>

              <div class="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
                <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <ng-icon hlm name="lucideZap" class="h-4 w-4 text-primary" />
                </div>
                <h3 class="text-base font-semibold">Signal-Based State</h3>
                <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  Reactive state management with Angular signals.
                  Type-safe and performant.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- How it works -->
        <section class="w-full py-8">
          <div class="container px-4">
            <div class="rounded-lg border border-border bg-card p-6 md:p-8">
              <h2 class="text-xl font-bold mb-5">How it works</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 class="text-base font-semibold mb-2">Brain / Helm Pattern</h3>
                  <p class="text-sm text-muted-foreground mb-3">
                    Following spartan-ng conventions, the library is split into two layers:
                  </p>
                  <ul class="space-y-2.5 text-sm">
                    <li class="flex gap-3">
                      <span class="font-mono text-xs bg-muted px-2 py-1 rounded h-fit shrink-0">Brain</span>
                      <span class="text-muted-foreground">
                        <code class="text-xs">&#64;dawit-io/spartan-sidebar-core</code> --
                        Headless primitives with logic, state, and accessibility.
                      </span>
                    </li>
                    <li class="flex gap-3">
                      <span class="font-mono text-xs bg-muted px-2 py-1 rounded h-fit shrink-0">Helm</span>
                      <span class="text-muted-foreground">
                        <code class="text-xs">&#64;dawit-io/spartan-sidebar</code> --
                        Pre-styled with Tailwind CSS, icons, and animations.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-base font-semibold mb-2">Installation</h3>
                  <div class="group relative rounded-md bg-muted p-4 font-mono text-sm">
                    <button
                      (click)="copyToClipboard('npm install @dawit-io/spartan-sidebar @dawit-io/spartan-sidebar-core', 0)"
                      class="absolute top-2 right-2 p-1.5 rounded-md hover:bg-background/80 transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy to clipboard"
                    >
                      <ng-icon hlm [name]="copiedIndex === 0 ? 'lucideCheck' : 'lucideCopy'" class="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <p>npm install &#64;dawit-io/spartan-sidebar \\</p>
                    <p>&nbsp;&nbsp;&#64;dawit-io/spartan-sidebar-core</p>
                  </div>
                  <p class="mt-3 text-sm text-muted-foreground">
                    Requires Angular 19+, Tailwind CSS, and spartan-ng peer dependencies.
                    See the
                    <a routerLink="/components" class="text-primary hover:underline">Components</a>
                    page for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
export class HomeComponent {
  copiedIndex: number | null = null;

  copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text);
    this.copiedIndex = index;
    setTimeout(() => (this.copiedIndex = null), 2000);
  }
}
