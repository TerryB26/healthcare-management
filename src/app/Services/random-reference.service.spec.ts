import { TestBed } from '@angular/core/testing';

import { RandomReferenceService } from './random-reference.service';

describe('RandomReferenceService', () => {
  let service: RandomReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
