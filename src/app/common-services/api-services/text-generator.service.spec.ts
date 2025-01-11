import { TestBed } from '@angular/core/testing';

import { TextGeneratorApiService } from './text-generator-api.service';

describe('TextGeneratorService', () => {
  let service: TextGeneratorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextGeneratorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
