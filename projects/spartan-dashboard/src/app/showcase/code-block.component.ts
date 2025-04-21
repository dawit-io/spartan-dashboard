import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      lucideCopy,
      lucideCheck,
    }),
  ],
  template: `
    <div class="relative">
      <pre
        class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-muted p-4 text-sm font-mono text-foreground"
      ><code>{{ code }}</code></pre>
      <button
        class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm hover:bg-muted"
        (click)="copyToClipboard()"
      >
        <ng-icon
          hlm
          [name]="copied ? 'lucideCheck' : 'lucideCopy'"
          class="h-4 w-4"
          [class.text-green-500]="copied"
        />
      </button>
    </div>
  `,
})
export class CodeBlockComponent {
  @Input() code: string = '';
  copied: boolean = false;

  copyToClipboard() {
    navigator.clipboard.writeText(this.code);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
