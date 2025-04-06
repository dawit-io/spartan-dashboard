import { Component, computed, inject, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSidebarGroupDirective, BrnSidebarService } from '@dawit-io/brn-sidebar';
import { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-sidebar-group-content',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': '_sidebarService.isExpanded() ? "expanded" : "collapsed"',
		'[attr.data-group-state]': '_group.isExpanded() ? "expanded" : "collapsed"',
	},
	template: `
		<div
			class="overflow-hidden transition-all duration-200"
			[class.opacity-100]="_group.isExpanded()"
			[class.opacity-0]="!_group.isExpanded()"
			[class.max-h-[1000px]="_group.isExpanded()"
			[class.max-h-0]="!_group.isExpanded()"
		>
			<div class="relative pl-6">
				<div class="bg-border absolute bottom-0 left-0 top-0 ml-2.5 w-px"></div>
				<ng-content />
			</div>
		</div>
	`,
})
export class HlmSidebarGroupContentComponent {
	protected readonly _group = inject(BrnSidebarGroupDirective);
	protected readonly _sidebarService = inject(BrnSidebarService);

	public readonly userClass = input<ClassValue>('');

	protected readonly _computedClass = computed(() =>
		hlm('data-[state=collapsed]:hidden', 'transition-all duration-200 ease-in-out', this.userClass()),
	);
}
