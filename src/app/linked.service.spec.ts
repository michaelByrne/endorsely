import { TestBed, inject } from '@angular/core/testing';

import { LinkedService } from './linked.service';

describe('LinkedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkedService]
    });
  });

  it('should be created', inject([LinkedService], (service: LinkedService) => {
    expect(service).toBeTruthy();
  }));
});
