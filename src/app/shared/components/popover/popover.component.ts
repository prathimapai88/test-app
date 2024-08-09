import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxPopoverModule } from 'devextreme-angular';
import { MESSAGES } from '../../constants/message';

@Component({
  selector: 'app-popover',
  template: `
    <dx-popover
      [(visible)]="visible"
      [target]="targetElement"
      position="top"
      width="200"
      [animation]="animation"
      [closeOnOutsideClick]="true"
    >
      <div class="popover-content">
        {{ popoverData.message }}
        <a *ngIf="popoverData.url" [href]="popoverData.url" target="_blank" rel="noopener noreferrer">Learn more</a>
      </div>
    </dx-popover>
  `,
  styles: [`
    .popover-content {
      padding: 10px;
      /* Additional styling if needed */
    }
    .popover-content a {
      pointer-events: auto;
      color: #007bff; /* Link color */
      text-decoration: underline; /* Underline link text */
    }
    .popover-content a:hover {
      color: #0056b3; /* Link color on hover */
    }
  `],
})
export class PopoverComponent {
  @Input() visible: boolean = false;
  @Input() targetElement: any;
  @Input() content: string = '';

  animation: object = {
    show: { type: 'pop', from: { scale: 0 }, to: { scale: 1 }, duration: 500 },
    hide: { type: 'fade', from: 1, to: 0, duration: 300, delay: 800 }, // delay in milliseconds
  };

  get popoverData(): { message: string, url?: string } {
    return MESSAGES[this.content as keyof typeof MESSAGES] || { message: '', url: '' };
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, DxPopoverModule],
  declarations: [PopoverComponent],
  exports: [PopoverComponent],
})
export class PopoverComponentModule {}
