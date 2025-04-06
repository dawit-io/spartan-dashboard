import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
} from '@angular/core';

@Component({
  selector: 'hlm-sidebar-tooltip',
  template: `<div class="bg-white border border-gray-200 rounded-md shadow-lg p-2 min-w-max text-xs whitespace-nowrap">
    {{ text() }}
  </div>`,
  standalone: true,
  imports: [CommonModule]
})
export class HlmSidebarTooltipComponent {
  text = signal('');
}
