import { TestBed } from '@angular/core/testing';

import { AccessRightsService } from './access-rights.service';

describe('AccessRightsService', () => {
  let service: AccessRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
