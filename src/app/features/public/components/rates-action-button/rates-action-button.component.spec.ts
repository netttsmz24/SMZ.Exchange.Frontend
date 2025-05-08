import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesActionButtonComponent } from './rates-action-button.component';

describe('RatesActionButtonComponent', () => {
  let component: RatesActionButtonComponent;
  let fixture: ComponentFixture<RatesActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatesActionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatesActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
