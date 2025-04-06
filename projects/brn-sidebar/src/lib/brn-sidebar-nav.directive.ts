import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[brnSidebarNav]',
	standalone: true,
})
export class BrnSidebarNavDirective {
	@HostBinding('attr.role') public role = 'navigation';
	@HostBinding('tabindex') public tabindex = 0;
	@HostBinding('attr.aria-label') public ariaLabel = 'Sidebar Navigation';

	@HostListener('keydown', ['$event'])
	public onKeyDown(_event: KeyboardEvent) {
		// TODO: Implement keyboard navigation logic
	}
}
