import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  output,
  ViewChild,
  ElementRef,
  OnDestroy,
  signal,
  effect,
  afterNextRender,
} from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSidebarService } from '@dawit-io/brn-sidebar';
import { ClassValue } from 'clsx';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'tooltip-component',
  template: `<div class="bg-white border border-gray-200 rounded-md shadow-lg p-2 min-w-max text-xs whitespace-nowrap">
    {{ text() }}
  </div>`,
  standalone: true,
  imports: [CommonModule]
})
export class TooltipComponent {
  text = signal('');
}

@Component({
  selector: 'hlm-sidebar-item',
  standalone: true,
  imports: [CommonModule, OverlayModule, PortalModule],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <button
      variant="ghost"
      [ngClass]="{ 'pl-2': _sidebarService.isExpanded() }"
      class="group relative h-9 w-full"
      (click)="clicked.emit()"
    >
      <div
        class="flex w-full items-center"
        [class.justify-start]="_sidebarService.isExpanded()"
        [class.justify-center]="!_sidebarService.isExpanded()"
      >
        <div
          #iconContainer
          class="transition-transform duration-200 ease-in-out group-hover:scale-110 relative"
          (mouseenter)="handleMouseEnter()"
          (mouseleave)="handleMouseLeave()"
        >
          <ng-content select="ng-icon" />
        </div>
        <span class="text-foreground ml-2 overflow-hidden truncate">{{
          label()
        }}</span>
      </div>
    </button>
  `,
})
export class HlmSidebarItemComponent implements OnDestroy {
  protected readonly _sidebarService = inject(BrnSidebarService);
  protected readonly _computedClass = computed(() =>
    hlm('block', this.userClass())
  );

  public readonly clicked = output<void>();
  public readonly userClass = input<ClassValue>('');
  public readonly label = input.required<string>();

  @ViewChild('iconContainer') iconContainer!: ElementRef;

  private overlayRef: OverlayRef | null = null;
  private overlay = inject(Overlay);

  private showTooltipSignal = signal(false);

  constructor() {
    effect(() => {
      const shouldShow = this.showTooltipSignal();

      if (shouldShow && !this._sidebarService.isExpanded()) {
        this.createTooltip();
      } else {
        this.removeTooltip();
      }
    });
  }

  handleMouseEnter(): void {
    this.showTooltipSignal.set(true);
  }

  handleMouseLeave(): void {
    this.showTooltipSignal.set(false);
  }

  private createTooltip(): void {
    if (!this.iconContainer) {
      afterNextRender(() => {
        this.createTooltip();
      });
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.iconContainer)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8
        }
      ]);

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    // Create the portal with the tooltip content
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);

    tooltipRef.instance.text.set(this.label());
  }

  private removeTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }
}
