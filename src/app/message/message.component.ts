import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-message',
  imports: [
    NgClass,
    MatIcon
  ],
  templateUrl: './message.component.html',
  standalone: true,
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message: string | undefined;
  @Input() type: 'warning' | 'error' = 'warning';

  get icon(): string {
    return this.type === 'error' ? 'error' : 'warning';
  }

  get containerClass(): string {
    return this.type === 'error' ? 'error-message' : 'warning-message';
  }

}
