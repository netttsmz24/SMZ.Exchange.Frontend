import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) { }
}
