import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangePanelComponent } from './exchange-panel.component';

describe('ExchangePanelComponent', () => {
  let component: ExchangePanelComponent;
  let fixture: ComponentFixture<ExchangePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
