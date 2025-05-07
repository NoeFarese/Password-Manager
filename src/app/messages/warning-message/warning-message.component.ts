import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-warning-message',
  imports: [
    MatIcon
  ],
  templateUrl: './warning-message.component.html',
  standalone: true,
  styleUrl: './warning-message.component.scss'
})
export class WarningMessageComponent {
  @Input() message: string | undefined;
}
