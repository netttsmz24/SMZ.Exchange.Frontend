import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../core/constants/app.routes';

@Component({
  selector: 'app-service-unavailable',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './service-unavailable.component.html',
  styleUrl: './service-unavailable.component.css'
})
export class ServiceUnavailableComponent {
  appRoutes = AppRoutes;
}
