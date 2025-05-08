import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModalComponent } from "./components/popup-modal/popup-modal.component";
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PopupModalComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
]
})

export class AuthModule { }
