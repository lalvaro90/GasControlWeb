import { TestBed } from '@angular/core/testing';

import { TankGasRefilService } from './tank-gas-refil.service';

describe('TankGasRefilService', () => {
  let service: TankGasRefilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankGasRefilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
