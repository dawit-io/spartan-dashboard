import { Directive, inject } from '@angular/core';
import { BrnSidebarService } from './brn-sidebar.service';

@Directive({
	selector: '[brnSidebarTrigger]',
	standalone: true,
	host: {
		'(click)': '_sidebarService.toggle()',
		'[attr.aria-expanded]': '_sidebarService.isExpanded()',
		'[attr.aria-controls]': '_sidebarService.id()',
		role: 'button',
		type: 'button',
	},
})
export class BrnSidebarTriggerDirective {
	protected readonly _sidebarService = inject(BrnSidebarService);
}
