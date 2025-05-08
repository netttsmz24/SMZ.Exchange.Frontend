import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceUnavailableComponent } from './pages/service-unavailable/service-unavailable.component';
import { AppRoutes } from '../../core/constants/app.routes';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: AppRoutes.ERROR_SERVICE_UNAVAILABLE, component: ServiceUnavailableComponent },
  { path: AppRoutes.ERROR_UNAUTHORIZED, component: UnauthorizedComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorsRoutingModule { }
