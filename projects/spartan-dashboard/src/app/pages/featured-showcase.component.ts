import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ShowcaseContainerComponent } from '../shared/components/showcase-container.component';
import { FeaturedDashboardComponent } from '../features/featured/featured-dashboard.component';

@Component({
  selector: 'app-featured-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseContainerComponent,
    FeaturedDashboardComponent
  ],
  template: `
    <app-showcase-container
      title="Featured Dashboard"
      description="A complete dashboard with metrics, charts, and data visualizations"
      [code]="code">

      <div showcase-preview>
        <app-featured-dashboard></app-featured-dashboard>
      </div>
    </app-showcase-container>
  `
})
export class FeaturedShowcaseComponent implements OnInit {
  code = '// Loading code...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // In un'implementazione reale, caricheremmo il codice da un file
    // this.http.get('assets/code-snippets/featured-dashboard.txt', { responseType: 'text' })
    //   .subscribe({
    //     next: (code) => this.code = code,
    //     error: () => this.code = '// Error loading code snippet'
    //   });

    // Per ora, impostiamo direttamente il codice come stringa
    this.code = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUp,
  lucideArrowDown,
  lucideUsers,
  lucideLineChart,
  lucideBarChart,
  lucideDollarSign,
  lucideActivity,
  lucideCalendar
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-featured-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmIconDirective
  ],
  providers: [
    provideIcons({
      lucideArrowUp,
      lucideArrowDown,
      lucideUsers,
      lucideLineChart,
      lucideBarChart,
      lucideDollarSign,
      lucideActivity,
      lucideCalendar
    })
  ],
  template: \`
    <div class="p-4 space-y-4">
      <!-- Dashboard content here -->
    </div>
  \`
})
export class FeaturedDashboardComponent {}`;
  }
}
