import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  imports: [
    MatIcon
  ],
  templateUrl: './error-message.component.html',
  standalone: true,
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() message: string | undefined;
}
