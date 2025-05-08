import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkscreeningComponent } from './bulkscreening.component';

describe('BulkscreeningComponent', () => {
  let component: BulkscreeningComponent;
  let fixture: ComponentFixture<BulkscreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkscreeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkscreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
