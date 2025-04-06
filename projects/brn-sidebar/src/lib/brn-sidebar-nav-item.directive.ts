import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[brnSidebarNavItem]',
	standalone: true,
})
export class BrnSidebarNavItemDirective {
	@Input() public icon?: string;
	@HostBinding('class') public class = 'brn-sidebar-nav-item';
	@HostBinding('class.active') @Input() public isActive: boolean | undefined;
	@HostBinding('attr.aria-current') public get ariaCurrentValue() {
		return this.isActive ? 'page' : undefined;
	}
}
