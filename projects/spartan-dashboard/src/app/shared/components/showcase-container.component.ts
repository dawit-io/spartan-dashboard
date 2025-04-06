import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { DeviceFrameComponent } from '../../shared/components/device-frame.component';
import { DeviceSelectorComponent } from '../../shared/components/device-selector.component';
import { CodeBlockComponent } from '../../shared/components/code-block.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective
} from '@spartan-ng/ui-tabs-helm';

@Component({
  selector: 'app-showcase-container',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HlmButtonDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsContentDirective,
    HlmTabsTriggerDirective,
    DeviceFrameComponent,
    DeviceSelectorComponent,
    CodeBlockComponent
  ],
  providers: [
    provideIcons({ lucideExternalLink })
  ],
  template: `
    <div class="p-6">
      <!-- Header section -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p class="text-muted-foreground">{{ description }}</p>
      </div>

      <div class="mb-6">
        <!-- Tabs using Spartan UI hlm-tabs -->
        <hlm-tabs tab="preview" class="block w-full">
          <div class="flex justify-between items-center mb-4">
            <hlm-tabs-list class="w-fit" aria-label="View options">
              <button hlmTabsTrigger="preview">Preview</button>
              <button hlmTabsTrigger="code">Code</button>
            </hlm-tabs-list>

            <div class="flex items-center space-x-2">
              <!-- Device selector only shown in preview tab -->
              <app-device-selector
                *ngIf="activeTab === 'preview'"
                [selected]="selectedDevice"
                (selectedChange)="selectedDevice = $event">
              </app-device-selector>

              <!-- Open in new tab button -->
              <button
                hlmBtn
                variant="outline"
                size="icon"
                (click)="openInNewTab()">
                <ng-icon name="lucideExternalLink" class="h-4 w-4"></ng-icon>
              </button>
            </div>
          </div>

          <!-- Content area -->
          <div class="border rounded-lg bg-card">
            <!-- Preview content -->
            <div hlmTabsContent="preview">
              <app-device-frame [device]="selectedDevice">
                <ng-content select="[showcase-preview]"></ng-content>
              </app-device-frame>
            </div>

            <!-- Code content -->
            <div hlmTabsContent="code">
              <app-code-block [code]="code"></app-code-block>
            </div>
          </div>
        </hlm-tabs>
      </div>
    </div>
  `
})
export class ShowcaseContainerComponent {
  @Input() title = 'Component Showcase';
  @Input() description = 'Preview and code for this component';
  @Input() code = '// Component code will appear here';
  @Input() externalUrl = '';

  // Track the active tab to conditionally show device selector
  activeTab = 'preview';
  selectedDevice = 'desktop';

  // Method to update active tab
  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  openInNewTab(): void {
    const url = this.externalUrl || window.location.href;
    window.open(url, '_blank');
  }
}
