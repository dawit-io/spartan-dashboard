import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BrnSidebarService, CollapsibleMode, SidebarVariant } from './brn-sidebar.service';

let nextId = 0;

@Component({
	selector: 'brn-sidebar',
	standalone: true,
	providers: [BrnSidebarService],
	template: `
		<ng-content />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.collapsed]': '!_sidebarService.isExpanded()',
		'[id]': '_sidebarService.id()',
		'[class.brn-sidebar-desktop]': '!_sidebarService.isMobile()',
		'[class.brn-sidebar-overlay]': '_sidebarService.isMobile() && isExpanded()',
		'[attr.data-variant]': 'variant()',
		'[attr.data-collapsible]': 'collapsibleMode()',
		'[class.is-collapsible]': 'isCollapsible()',
		'[class.is-overlay]': 'isOverlay()',
	},
})
export class BrnSidebarComponent {
	constructor() {
		this._sidebarService.setId(`brn-sidebar-${nextId++}`);
	}
	protected readonly _sidebarService = inject(BrnSidebarService);
	public readonly isCollapsible = input<boolean>(true);
	public readonly isOverlay = input<boolean>(false);
	public readonly variant = input<SidebarVariant>('sidebar');
	public readonly collapsibleMode = input<CollapsibleMode>('icon');

	public readonly isExpanded = computed(() => this._sidebarService.isExpanded());
	protected readonly _computedCollapsible = computed(() => {
		this._sidebarService.setCollapsible(this.isCollapsible());
		return this.isCollapsible();
	});

	protected readonly _computedOverlay = computed(() => {
		this._sidebarService.setOverlayMode(this.isOverlay());
		return this.isOverlay();
	});

	protected readonly _computedVariant = computed(() => {
		this._sidebarService.setVariant(this.variant());
		return this.variant();
	});

	protected readonly _computedCollapsibleMode = computed(() => {
		this._sidebarService.setCollapsibleMode(this.collapsibleMode());
		return this.collapsibleMode();
	});
}
