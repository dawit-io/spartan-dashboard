import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideTablet, lucideSmartphone } from '@ng-icons/lucide';

@Component({
  selector: 'app-device-selector',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideMonitor, lucideTablet, lucideSmartphone })],
  template: `
    <div class="flex border rounded-md overflow-hidden">
      <button
        class="p-2"
        [class.bg-primary]="selected === 'desktop'"
        [class.text-primary-foreground]="selected === 'desktop'"
        (click)="onSelect('desktop')">
        <ng-icon name="lucideMonitor" class="h-4 w-4"></ng-icon>
      </button>
      <button
        class="p-2"
        [class.bg-primary]="selected === 'tablet'"
        [class.text-primary-foreground]="selected === 'tablet'"
        (click)="onSelect('tablet')">
        <ng-icon name="lucideTablet" class="h-4 w-4"></ng-icon>
      </button>
      <button
        class="p-2"
        [class.bg-primary]="selected === 'mobile'"
        [class.text-primary-foreground]="selected === 'mobile'"
        (click)="onSelect('mobile')">
        <ng-icon name="lucideSmartphone" class="h-4 w-4"></ng-icon>
      </button>
    </div>
  `
})
export class DeviceSelectorComponent {
  @Input() selected = 'desktop';
  @Output() selectedChange = new EventEmitter<string>();

  onSelect(device: string): void {
    this.selected = device;
    this.selectedChange.emit(device);
  }
}
