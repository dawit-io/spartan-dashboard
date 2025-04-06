import { NgModule } from '@angular/core';
import { BrnSidebarFooterComponent } from './lib/brn-sidebar-footer.component';
import { BrnSidebarGroupLabelDirective } from './lib/brn-sidebar-group-label.directive';
import { BrnSidebarGroupDirective } from './lib/brn-sidebar-group.directive';
import { BrnSidebarNavItemDirective } from './lib/brn-sidebar-nav-item.directive';
import { BrnSidebarNavDirective } from './lib/brn-sidebar-nav.directive';
import { BrnSidebarTriggerDirective } from './lib/brn-sidebar-trigger.directive';
import { BrnSidebarComponent } from './lib/brn-sidebar.component';
import { BrnSidebarService } from './lib/brn-sidebar.service';

export * from './lib/brn-sidebar-footer.component';
export * from './lib/brn-sidebar-group-label.directive';
export * from './lib/brn-sidebar-group.directive';
export * from './lib/brn-sidebar-nav-item.directive';
export * from './lib/brn-sidebar-nav.directive';
export * from './lib/brn-sidebar-trigger.directive';
export * from './lib/brn-sidebar.component';
export * from './lib/brn-sidebar.service';

export const BrnSidebarImports = [
	BrnSidebarComponent,
	BrnSidebarTriggerDirective,
	BrnSidebarGroupDirective,
	BrnSidebarGroupLabelDirective,
	BrnSidebarNavItemDirective,
	BrnSidebarNavDirective,
	BrnSidebarFooterComponent,
] as const;

@NgModule({
	imports: [...BrnSidebarImports],
	exports: [...BrnSidebarImports],
	providers: [BrnSidebarService],
})
export class BrnSidebarModule {}
