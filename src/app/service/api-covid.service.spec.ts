import { TestBed } from '@angular/core/testing';

import { ApiCovidService } from './api-covid.service';

describe('ApiCovidService', () => {
  let service: ApiCovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
