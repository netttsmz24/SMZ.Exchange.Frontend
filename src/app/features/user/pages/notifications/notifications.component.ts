import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../../../../shared/components/client-header/client-header.component';
import { DisclaimerFooterComponent } from '../../../../shared/components/disclaimer-footer/disclaimer-footer.component';

@Component({
  selector: 'app-notifications',
  imports: [
    ClientHeaderComponent,
    DisclaimerFooterComponent
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
