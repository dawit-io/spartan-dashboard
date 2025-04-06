import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSidebarGroupDirective } from '@dawit-io/brn-sidebar';
import { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-sidebar-group',
	standalone: true,
	hostDirectives: [BrnSidebarGroupDirective],
	host: {
		'[class]': '_computedClass()',
	},
	template: `
		<ng-content />
	`,
})
export class HlmSidebarGroupComponent {
	public readonly userClass = input<ClassValue>('');

	protected readonly _computedClass = computed(() => hlm('flex flex-col gap-1', this.userClass()));
}
