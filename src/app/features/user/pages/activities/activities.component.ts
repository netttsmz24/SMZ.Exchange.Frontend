import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../../../../shared/components/client-header/client-header.component';
import { DisclaimerFooterComponent } from '../../../../shared/components/disclaimer-footer/disclaimer-footer.component';

@Component({
  selector: 'app-activities',
  imports: [
    ClientHeaderComponent,
    DisclaimerFooterComponent
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {

}
