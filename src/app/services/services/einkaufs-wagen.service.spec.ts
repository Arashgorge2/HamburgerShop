import { TestBed } from '@angular/core/testing';

import { EinkaufsWagenService } from './einkaufs-wagen.service';

describe('EinkaufsWagenService', () => {
  let service: EinkaufsWagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinkaufsWagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
