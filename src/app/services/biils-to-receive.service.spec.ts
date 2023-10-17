import { TestBed } from '@angular/core/testing';

import { BiilsToReceiveService } from './biils-to-receive.service';

describe('BiilsToReceiveService', () => {
  let service: BiilsToReceiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiilsToReceiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
