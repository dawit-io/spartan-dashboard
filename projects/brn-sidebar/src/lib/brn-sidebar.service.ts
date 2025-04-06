import { computed, Injectable, signal } from '@angular/core';

export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type CollapsibleMode = 'offcanvas' | 'icon' | 'none';

@Injectable()
export class BrnSidebarService {
	private readonly _state = signal<{
		id: string;
		isExpanded: boolean;
		isCollapsible: boolean;
		isMobile: boolean;
		isOverlay: boolean;
		variant: SidebarVariant;
		collapsibleMode: CollapsibleMode;
	}>({
		id: '',
		isExpanded: true,
		isCollapsible: true,
		isMobile: false,
		isOverlay: false,
		variant: 'sidebar',
		collapsibleMode: 'icon',
	});

	public readonly id = computed(() => this._state().id);
	public readonly isExpanded = computed(() => this._state().isExpanded);
	public readonly isCollapsible = computed(() => this._state().isCollapsible);
	public readonly isMobile = computed(() => this._state().isMobile);
	public readonly isOverlay = computed(() => this._state().isOverlay);
	public readonly variant = computed(() => this._state().variant);
	public readonly collapsibleMode = computed(() => this._state().collapsibleMode);

	constructor() {
		this.checkIfMobile();

		if (window) {
			const mediaQuery = window.matchMedia('(max-width: 768px)');
			this.handleMobileChange(mediaQuery);
			mediaQuery.addEventListener('change', (e) => {
				this.handleMobileChange(e);
			});
		}
	}

	public toggle(): void {
		if (!this._state().isCollapsible) return;

		this._state.update((state) => ({
			...state,
			isExpanded: !state.isExpanded,
		}));
	}

	public setId(id: string): void {
		this._state.update((state) => ({
			...state,
			id,
		}));
	}

	public setCollapsible(isCollapsible: boolean): void {
		this._state.update((state) => ({
			...state,
			isCollapsible,
		}));
	}

	public setMobileState(isMobile: boolean): void {
		this._state.update((state) => ({
			...state,
			isMobile,
			collapsibleMode: isMobile ? 'offcanvas' : state.collapsibleMode,
			isOverlay: isMobile,
		}));
	}

	public setVariant(variant: SidebarVariant): void {
		this._state.update((state) => ({
			...state,
			variant,
		}));
	}

	public setCollapsibleMode(mode: CollapsibleMode): void {
		this._state.update((state) => ({
			...state,
			collapsibleMode: mode,
		}));
	}

	public setOverlayMode(isOverlay: boolean): void {
		this._state.update((state) => ({
			...state,
			isOverlay,
		}));
	}

	private checkIfMobile() {
		if (typeof window !== 'undefined') {
			const isMobile = window.matchMedia('(max-width: 768px)').matches;
			this.setMobileState(isMobile);
			//if mobile close sidebar
			if (isMobile) {
				this._state.update((state) => ({
					...state,
					isExpanded: false,
				}));
			}
		}
	}

	private handleMobileChange(e: MediaQueryList | MediaQueryListEvent) {
		const isMobile = e.matches;
		this.setMobileState(isMobile);
	}
}
