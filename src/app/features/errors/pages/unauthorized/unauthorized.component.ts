import { Component } from '@angular/core';
import { AppRoutes } from '../../../../core/constants/app.routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  appRoutes = AppRoutes;
}
