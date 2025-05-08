import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AppRoutes } from '../../core/constants/app.routes';

const routes: Routes = [
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: AppRoutes.REGISTER, component: RegisterComponent },
  { path: AppRoutes.FORGOT_PASSWORD, component: ForgotPasswordComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class AuthRoutingModule { }
