import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookingPanelComponent } from './pages/booking-panel/booking-panel.component';

const routes: Routes = [
  { path: "booking", component: BookingPanelComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class ExchangeRoutingModule { }
