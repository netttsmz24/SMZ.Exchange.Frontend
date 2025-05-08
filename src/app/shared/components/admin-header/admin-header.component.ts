import { Component } from '@angular/core';
import { AppNavigationService } from '../../../core/services/app-navigation.service';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(public navigationService: AppNavigationService) { }
}
