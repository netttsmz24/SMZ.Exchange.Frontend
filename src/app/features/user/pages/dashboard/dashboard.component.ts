import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../core/constants/app.routes';
import { ClientHeaderComponent } from "../../../../shared/components/client-header/client-header.component";
import { DisclaimerFooterComponent } from '../../../../shared/components/disclaimer-footer/disclaimer-footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ClientHeaderComponent,
    DisclaimerFooterComponent,
    CommonModule,
    RouterLink,
    ClientHeaderComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  appRouter = AppRoutes;
}
