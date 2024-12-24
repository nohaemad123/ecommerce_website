import { TestBed } from '@angular/core/testing';

import { CoreTranslationService } from './core-translation.service';

describe('CoreTranslationService', () => {
  let service: CoreTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
