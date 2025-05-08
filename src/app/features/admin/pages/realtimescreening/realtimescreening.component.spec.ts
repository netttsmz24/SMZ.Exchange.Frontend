import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimescreeningComponent } from './realtimescreening.component';

describe('RealtimescreeningComponent', () => {
  let component: RealtimescreeningComponent;
  let fixture: ComponentFixture<RealtimescreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimescreeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimescreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
