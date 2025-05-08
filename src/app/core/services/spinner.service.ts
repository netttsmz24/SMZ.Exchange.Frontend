import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  private ongoingRequests: number = 0;

  constructor() { }

  show(): void {
    this._loading.next(true);
  }
  hide(): void {
    this._loading.next(false);
  }

  incrementRequestCount(): void {
    this.ongoingRequests++;
  }

  decrementRequestCount(): void {
    this.ongoingRequests--;
  }

  getRequestCount(): number {
    return this.ongoingRequests;
  }
}
