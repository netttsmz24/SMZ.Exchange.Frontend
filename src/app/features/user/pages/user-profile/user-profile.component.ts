import { Component } from '@angular/core';
import { ClientHeaderComponent } from "../../../../shared/components/client-header/client-header.component";
import { DisclaimerFooterComponent } from "../../../../shared/components/disclaimer-footer/disclaimer-footer.component";

@Component({
  selector: 'app-user-profile',
  imports: [ClientHeaderComponent, DisclaimerFooterComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
