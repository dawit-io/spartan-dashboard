import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnSidebarService } from './brn-sidebar.service';

@Component({
	selector: 'brn-sidebar-footer',
	standalone: true,
	template: `
		<ng-content />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.collapsed]': '!_sidebarService.isExpanded()',
		'[attr.data-state]': '_sidebarService.isExpanded() ? "expanded" : "collapsed"',
		role: 'complementary',
		class: 'brn-sidebar-footer',
	},
})
export class BrnSidebarFooterComponent {
	protected readonly _sidebarService = inject(BrnSidebarService);
}
