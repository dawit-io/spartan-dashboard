import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, NgIcon, HlmButtonDirective],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="relative">
      <pre class="p-4 bg-muted/20 rounded-md overflow-auto max-h-[600px]"><code>{{ code }}</code></pre>
      <button
        hlmBtn
        variant="outline"
        size="sm"
        class="absolute top-2 right-2 flex items-center gap-2"
        (click)="copyToClipboard()">
        <ng-icon [name]="copied ? 'lucideCheck' : 'lucideCopy'" class="h-4 w-4"></ng-icon>
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
  `
})
export class CodeBlockComponent {
  @Input() code = '';
  copied = false;

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.code)
      .then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  }
}
