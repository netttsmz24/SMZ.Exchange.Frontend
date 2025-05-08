import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
    SpinnerComponent
]
})

export class AppComponent { }
