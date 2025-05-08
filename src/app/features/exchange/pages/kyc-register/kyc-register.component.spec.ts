import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycRegisterComponent } from './kyc-register.component';

describe('KycRegisterComponent', () => {
  let component: KycRegisterComponent;
  let fixture: ComponentFixture<KycRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
