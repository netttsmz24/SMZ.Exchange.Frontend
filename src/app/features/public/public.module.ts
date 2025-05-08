import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RateDisplayComponent } from './pages/rate-display/rate-display.component';
import { AgGridModule } from 'ag-grid-angular';
import { RatesActionButtonComponent } from './components/rates-action-button/rates-action-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    RateDisplayComponent,
    RatesActionButtonComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterLink,
    RouterLinkActive,
    AgGridModule
  ]
})

export class PublicModule { }
