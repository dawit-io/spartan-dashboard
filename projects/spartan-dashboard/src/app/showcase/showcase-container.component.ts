import { Component, inject, Input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lucideTablet, lucideSmartphone, lucideCode, lucideMonitor, lucideFullscreen } from '@ng-icons/lucide';

type DeviceView = 'desktop' | 'tablet' | 'mobile';

@Component({
  selector: 'app-showcase-container',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  providers: [
    provideIcons({
      lucideTablet,
      lucideSmartphone,
      lucideCode,
      lucideMonitor,
      lucideFullscreen
    }),
  ],
  template: `
    <div class="py-10">
      <div class="container">
        <!-- Tabs for Categories -->
        <div class="flex overflow-auto pb-4 sm:pb-0">
          <div class="mb-4 flex items-center space-x-1 rounded-lg bg-muted p-1">
            <button
              *ngFor="let category of categories"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              [class.bg-background]="selectedCategory === category"
              [class.text-foreground]="selectedCategory === category"
              [class.shadow-sm]="selectedCategory === category"
              (click)="selectedCategory = category; categorySelected(category)">
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Preview/Code Tabs -->
        <div class="flex flex-col space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-muted-foreground">{{ title }}</span>
            </div>

            <div class="flex items-center space-x-4">
              <!-- Preview/Code Toggle -->
              <div class="flex items-center space-x-1 rounded-lg bg-muted p-1">
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  [class.bg-background]="view === 'preview'"
                  [class.text-foreground]="view === 'preview'"
                  [class.shadow-sm]="view === 'preview'"
                  (click)="view = 'preview'">
                  Preview
                </button>
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  [class.bg-background]="view === 'code'"
                  [class.text-foreground]="view === 'code'"
                  [class.shadow-sm]="view === 'code'"
                  (click)="view = 'code'">
                  Code
                </button>
              </div>

              <!-- Device Toggle -->
              <div class="flex items-center space-x-1 rounded-lg bg-muted p-1">
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  [class.bg-background]="device === 'desktop'"
                  [class.text-foreground]="device === 'desktop'"
                  [class.shadow-sm]="device === 'desktop'"
                  (click)="changeDevice('desktop')">
                  <ng-icon name="lucideMonitor" class="h-4 w-4" />
                </button>
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  [class.bg-background]="device === 'tablet'"
                  [class.text-foreground]="device === 'tablet'"
                  [class.shadow-sm]="device === 'tablet'"
                  (click)="changeDevice('tablet')">
                  <ng-icon name="lucideTablet" class="h-4 w-4" />
                </button>
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  [class.bg-background]="device === 'mobile'"
                  [class.text-foreground]="device === 'mobile'"
                  [class.shadow-sm]="device === 'mobile'"
                  (click)="changeDevice('mobile')">
                  <ng-icon name="lucideSmartphone" class="h-4 w-4" />
                </button>
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  (click)="openInNewTab($event, '/featured')">
                  <ng-icon name="lucideFullscreen" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Content Display Area -->
          <div class="rounded-lg border bg-card text-card-foreground shadow">
            <div class="p-2">
              <!-- Preview Content -->
              <div *ngIf="view === 'preview'" class="flex items-center justify-center">
                <!-- Desktop Mode (Component) -->
                <div
                  *ngIf="device === 'desktop'"
                  class="flex items-center justify-center transition-all bg-background p-2 w-full h-full">
                  <ng-content select="[showcase-preview]"></ng-content>
                </div>

                <!-- Tablet/Mobile Mode (Iframe) -->
                <div
                  *ngIf="device !== 'desktop'"
                  class="transition-all bg-background p-0"
                  [class.w-[768px]]="device === 'tablet'"
                  [class.h-[1024px]]="device === 'tablet'"
                  [class.w-[400px]]="device === 'mobile'"
                  [class.h-[844px]]="device === 'mobile'"
                  [class.border]="true"
                  [class.rounded-lg]="true">
                  <iframe
                    *ngIf="iframeUrl"
                    [src]="iframeUrl"
                    class="w-full h-full border-0 p-2">
                  </iframe>
                </div>
              </div>

              <!-- Code Content -->
              <div *ngIf="view === 'code'" class="text-sm">
                <ng-content select="[showcase-code]"></ng-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ShowcaseContainerComponent implements OnInit {
  @Input() title: string = 'Example Component';
  @Input() categories: string[] = ['Standard', 'Offcanvas'];
  selectedCategoryOutput = output<string>();

  selectedCategory: string = 'Standard';
  view: 'preview' | 'code' = 'preview';
  device: DeviceView = 'desktop';
  iframeUrl: SafeResourceUrl | null = null;

  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.updateIframeUrl();
  }

  changeDevice(newDevice: DeviceView): void {
    this.device = newDevice;
    if (newDevice !== 'desktop') {
      this.updateIframeUrl();
    }
  }

  categorySelected(category: string): void {
    this.selectedCategoryOutput.emit(category);
  }

  private updateIframeUrl(): void {
    const baseUrl = window.location.origin + window.location.pathname;
    const targetUrl = new URL('/featured', baseUrl);

    targetUrl.searchParams.set('device', this.device);

    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(targetUrl.toString());
  }

  openInNewTab(event: MouseEvent, path: string) {
    event.preventDefault();
    const url = this.router.serializeUrl(
      this.router.createUrlTree([path])
    );
    window.open(url, '_blank');
  }
}
