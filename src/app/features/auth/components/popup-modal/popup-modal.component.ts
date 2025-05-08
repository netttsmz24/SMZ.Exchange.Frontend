import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  standalone: false,
  templateUrl: './popup-modal.component.html',
  styleUrl: './popup-modal.component.css'
})

export class PopupModalComponent {
  @Input("show") show: boolean = false;
  @Input("title") title: string = "";
  @Input("content") content: string = "";
  @Input("buttonText") buttonText: string = "Ok";

  @Output("ClosePopup") closePopup: EventEmitter<boolean> = new EventEmitter<boolean>;

  public onClose(): void {
    this.closePopup.emit(false);
  }

}
