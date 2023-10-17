import { TestBed } from '@angular/core/testing';

import { BiilsToPayService } from './biils-to-pay.service';

describe('BiilsToPayService', () => {
  let service: BiilsToPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiilsToPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
