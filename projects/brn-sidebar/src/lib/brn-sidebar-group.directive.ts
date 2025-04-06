import { Directive, inject, signal } from '@angular/core';
import { BrnSidebarService } from './brn-sidebar.service';

@Directive({
	selector: '[brnSidebarGroup]',
	standalone: true,
	host: {
		role: 'group',
		'[attr.aria-labelledby]': 'labelId()',
		'[attr.data-expanded]': '_sidebarService.isExpanded()',
		'[attr.data-group-expanded]': 'isExpanded()',
	},
})
export class BrnSidebarGroupDirective {
	protected readonly _sidebarService = inject(BrnSidebarService);
	public readonly labelId = signal('');
	public readonly isExpanded = signal(true);

	public toggleExpansion(): void {
		this.isExpanded.update((value) => !value);
	}
}
