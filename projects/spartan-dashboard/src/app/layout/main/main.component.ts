import { Component } from '@angular/core';

@Component({
  selector: 'main',
  template:
    `<div class="p-2">
      <ng-content />
    </div>`,
})
export class MainComponent {

}
