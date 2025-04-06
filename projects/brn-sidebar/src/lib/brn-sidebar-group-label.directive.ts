import { Directive, inject } from '@angular/core';
import { BrnSidebarGroupDirective } from './brn-sidebar-group.directive';

let nextId = 0;

@Directive({
	selector: '[brnSidebarGroupLabel]',
	standalone: true,
	host: {
		'[id]': 'id',
	},
})
export class BrnSidebarGroupLabelDirective {
	private readonly _id = `brn-sidebar-group-label-${nextId++}`;
	private readonly _group = inject(BrnSidebarGroupDirective);

	constructor() {
		this._group.labelId.set(this._id);
	}
}
