import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'showcase',
  standalone: true,
  imports: [
    CommonModule,
    // Spartan UI components will be added here
  ],
  template: `
    <div class="container mx-auto p-4">
      <!-- Header section -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p class="text-muted-foreground">{{ description }}</p>
      </div>

      <!-- Tabs and device controls -->
      <div class="flex justify-between items-center mb-4">
        <!-- Preview/Code tabs -->
        <div class="flex border-b">
          <button
            class="px-4 py-2 font-medium"
            [class.border-b-2]="activeTab === 'preview'"
            [class.border-primary]="activeTab === 'preview'"
            (click)="setActiveTab('preview')">
            Preview
          </button>
          <button
            class="px-4 py-2 font-medium"
            [class.border-b-2]="activeTab === 'code'"
            [class.border-primary]="activeTab === 'code'"
            (click)="setActiveTab('code')">
            Code
          </button>
        </div>

        <!-- Device selector -->
        <div class="flex items-center space-x-2">
          <div class="flex border rounded-md">
            <button
              class="p-2"
              [class.bg-primary]="selectedDevice === 'desktop'"
              [class.text-primary-foreground]="selectedDevice === 'desktop'"
              (click)="setDevice('desktop')">
              <!-- Desktop icon placeholder -->
            </button>
            <button
              class="p-2"
              [class.bg-primary]="selectedDevice === 'tablet'"
              [class.text-primary-foreground]="selectedDevice === 'tablet'"
              (click)="setDevice('tablet')">
              <!-- Tablet icon placeholder -->
            </button>
            <button
              class="p-2"
              [class.bg-primary]="selectedDevice === 'mobile'"
              [class.text-primary-foreground]="selectedDevice === 'mobile'"
              (click)="setDevice('mobile')">
              <!-- Mobile icon placeholder -->
            </button>
          </div>

          <!-- Open in new tab button -->
          <button class="p-2 rounded-md hover:bg-muted">
            <!-- External link icon placeholder -->
          </button>
        </div>
      </div>

      <!-- Content area -->
      <div class="border rounded-lg overflow-hidden">
        <!-- Preview area -->
        <div *ngIf="activeTab === 'preview'"
             [ngClass]="deviceClasses"
             class="transition-all duration-300">
          <ng-content select="[showcase-preview]"></ng-content>
        </div>

        <!-- Code area -->
        <div *ngIf="activeTab === 'code'" class="relative">
          <pre class="p-4 bg-muted/50 rounded-md overflow-auto"><code>{{ code }}</code></pre>
          <button class="absolute top-2 right-2 p-2 rounded-md bg-muted hover:bg-muted/70">
            <!-- Copy icon placeholder -->
          </button>
        </div>
      </div>
    </div>
  `
})
export class ShowcaseComponent {
  @Input() title = 'Component Showcase';
  @Input() description = 'Preview and code for this component';
  @Input() code = '// Component code will appear here';

  activeTab = 'preview';
  selectedDevice = 'desktop';
  deviceClasses = {};

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setDevice(device: string): void {
    this.selectedDevice = device;
    this.updateDeviceClasses();
  }

  private updateDeviceClasses(): void {
    switch (this.selectedDevice) {
      case 'mobile':
        this.deviceClasses = {
          'max-w-[320px]': true,
          'mx-auto': true,
          'h-[580px]': true,
          'overflow-auto': true
        };
        break;
      case 'tablet':
        this.deviceClasses = {
          'max-w-[768px]': true,
          'mx-auto': true,
          'h-[700px]': true,
          'overflow-auto': true
        };
        break;
      case 'desktop':
      default:
        this.deviceClasses = {
          'w-full': true,
          'h-[600px]': true,
          'overflow-auto': true
        };
        break;
    }
  }

  ngOnInit(): void {
    this.updateDeviceClasses();
  }
}
