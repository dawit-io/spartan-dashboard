import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-frame',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden bg-card border rounded-lg">
      <div [ngClass]="deviceClasses" class="transition-all duration-300">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class DeviceFrameComponent implements OnChanges {
  @Input() device = 'desktop';

  deviceClasses: Record<string, boolean> = {};

  ngOnChanges(): void {
    this.updateDeviceClasses();
  }

  private updateDeviceClasses(): void {
    switch (this.device) {
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
}
