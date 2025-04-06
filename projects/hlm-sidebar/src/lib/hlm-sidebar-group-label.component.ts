import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSidebarGroupDirective, BrnSidebarGroupLabelDirective, BrnSidebarService } from '@dawit-io/brn-sidebar';
import { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-sidebar-group-label',
	standalone: true,
	hostDirectives: [BrnSidebarGroupLabelDirective],
	imports: [NgIcon],
	providers: [provideIcons({ lucideChevronDown })],
	host: {
		'[class]': '_computedClass()',
		'(click)': '_group.toggleExpansion()',
	},
	template: `
		<div class="flex w-full cursor-pointer items-center" [class.justify-center]="!_sidebarService.isExpanded()">
			<div class="transition-transform duration-200 ease-in-out hover:scale-110">
				<ng-content select="ng-icon" />
			</div>
			<span class="text-foreground ml-2 overflow-hidden truncate">{{ label() }}</span>
			@if (_sidebarService.isExpanded()) {
				<ng-icon
					hlm
					name="lucideChevronDown"
					class="text-foreground ml-auto h-4 w-4 transition-transform"
					[class.rotate-270]="!_group.isExpanded()"
				/>
			}
		</div>
	`,
})
export class HlmSidebarGroupLabelComponent {
	protected readonly _sidebarService = inject(BrnSidebarService);
	protected readonly _group = inject(BrnSidebarGroupDirective);
	public label = input('');
	public readonly userClass = input<ClassValue>('');

	protected readonly _computedClass = computed(() =>
		hlm(
			'flex items-center w-full p-2 rounded-md text-foreground',
			'hover:bg-accent hover:text-accent-foreground',
			'transition-colors',
			this.userClass(),
		),
	);
}
