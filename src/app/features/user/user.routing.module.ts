import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AppRoutes } from '../../core/constants/app.routes';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  { path: AppRoutes.USER_DASHBOARD, component: DashboardComponent },
  { path: AppRoutes.USER_PROFILE, component: UserProfileComponent },
  { path: AppRoutes.USER_ACTIVITIES, component: ActivitiesComponent },
  { path: AppRoutes.USER_NOTIFICATIONS, component: NotificationsComponent },
  {
    path: AppRoutes.EXCHANGE,
    loadChildren: () => import("../exchange/exchange-routing.module").then(m => m.ExchangeRoutingModule)
  },
  {
    path: AppRoutes.REMITTANCE,
    loadChildren: () => import("../remittance/remittance.module").then(m => m.RemittanceModule)
  },
  { path: "**", redirectTo: AppRoutes.USER_BASEROUTE + '/' + AppRoutes.USER_DASHBOARD },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class UserRoutingModule { }
