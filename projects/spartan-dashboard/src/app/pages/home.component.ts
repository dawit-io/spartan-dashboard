import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective
  ],
  template: `
    <div class="container p-6">
      <h1 class="text-4xl font-bold mb-2">Spartan UI Showcase</h1>
      <p class="text-lg text-muted-foreground mb-8">
        Examples and demos of Spartan UI components and layouts
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Featured Dashboard Card -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Featured Dashboard</h3>
            <p hlmCardDescription>
              A complete dashboard with metrics and visualizations
            </p>
          </div>
          <div hlmCardContent>
            <div class="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
              <!-- Thumbnail preview -->
              <div class="w-full h-full bg-muted-foreground/10"></div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full" routerLink="/featured">
              View Featured Dashboard
            </button>
          </div>
        </section>

        <!-- Sidebar Card -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Sidebar Navigation</h3>
            <p hlmCardDescription>
              Responsive sidebar with navigation and branding
            </p>
          </div>
          <div hlmCardContent>
            <div class="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
              <!-- Thumbnail preview -->
              <div class="w-full h-full bg-muted-foreground/10"></div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full" routerLink="/sidebar">
              View Sidebar Navigation
            </button>
          </div>
        </section>

        <!-- Charts Card -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Interactive Charts</h3>
            <p hlmCardDescription>
              Data visualization with interactive charts
            </p>
          </div>
          <div hlmCardContent>
            <div class="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
              <!-- Thumbnail preview -->
              <div class="w-full h-full bg-muted-foreground/10"></div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full" routerLink="/charts">
              View Charts
            </button>
          </div>
        </section>
      </div>
    </div>
  `
})
export class HomeComponent {}
