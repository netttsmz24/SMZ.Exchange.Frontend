import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RateDisplayComponent } from './pages/rate-display/rate-display.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutes } from '../../core/constants/app.routes';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

const routes: Routes = [
  { path: AppRoutes.APP_HOME, component: HomeComponent },
  { path: AppRoutes.APP_ABOUT_US, component: AboutComponent },
  { path: AppRoutes.APP_ABOUT_US, component: ContactUsComponent },
  { path: AppRoutes.APP_EXCHANGE_RATES, component: RateDisplayComponent },
  { path: AppRoutes.APP, redirectTo: `/${AppRoutes.ADMIN}/${AppRoutes.ADMIN_DASHBOARD}`, pathMatch: 'full' }
  // { path: AppRoutes.APP, component: HomeComponent },
  // { path: "**", redirectTo: AppRoutes.APP_HOME }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class PublicRoutingModule { }
