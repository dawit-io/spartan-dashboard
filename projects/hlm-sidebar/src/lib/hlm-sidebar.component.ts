import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSidebarComponent } from '@dawit-io/brn-sidebar';
import { ClassValue } from 'clsx';

@Component({
	selector: 'hlm-sidebar',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
		'[attr.data-state]': 'sidebarService.isExpanded() ? "expanded" : "collapsed"',
		'[attr.data-collapsible]': 'sidebarService.collapsibleMode()',
		'[style.scrollbar-width]': '"thin"',
		'[style.scrollbar-color]': '_computedScrollbarColor()',
	},
	template: `
		<div class="flex h-full flex-col">
			<ng-content />
		</div>
	`,
})
export class HlmSidebarComponent extends BrnSidebarComponent {
	protected get sidebarService() {
		return this._sidebarService;
	}
	protected readonly _computedClass = computed(() =>
		hlm(
			'relative z-40 flex h-full overflow-y-auto overflow-x-hidden flex-col flex-none border-r border-border bg-background transition-all duration-200',

			// Variant styles
			this.sidebarService.variant() === 'sidebar' && ['sticky top-0 left-0', 'shrink-0'],
			this.sidebarService.variant() === 'floating' && ['absolute shadow-lg', 'bg-popover text-popover-foreground'],
			this.sidebarService.variant() === 'inset' && ['border rounded-lg m-4', 'bg-card text-card-foreground'],

			// Collapsible mode styles
			this.sidebarService.collapsibleMode() === 'offcanvas' && [
				'w-64',
				'transform',
				'data-[state=collapsed]:-translate-x-full',
				'data-[state=collapsed]:absolute',
				'data-[state=collapsed]:opacity-0',
				'data-[state=expanded]:translate-x-0',
				'data-[state=expanded]:opacity-100',
			],

			this.sidebarService.collapsibleMode() === 'icon' && [
				'w-64 data-[state=collapsed]:w-16',
				'data-[state=collapsed]:transition-[width]',
			],

			this.sidebarService.collapsibleMode() === 'none' && ['w-64', 'transition-none'],

			// Common styles for expanded/collapsed states
			'data-[state=expanded]:w-64',
			'[&_span]:data-[state=collapsed]:hidden [&_span]:data-[state=expanded]:inline',
			'[&_ng-icon]:data-[state=collapsed]:mx-auto',

			this.userClass(),
		),
	);

	public readonly userClass = input<ClassValue>('');
	protected readonly _computedScrollbarColor = computed(
		() => 'var(--muted-foreground, hsl(var(--muted-foreground))) var(--border-color, hsl(var(--muted)))',
	);
}
