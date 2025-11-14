import { TestBed } from '@angular/core/testing';

import { GeniaService } from './genia-service';

describe('GeniaService', () => {
  let service: GeniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
