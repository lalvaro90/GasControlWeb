import { TestBed } from '@angular/core/testing';

import { MachineGasRefileService } from './machine-gas-refile.service';

describe('MachineGasRefileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachineGasRefileService = TestBed.get(MachineGasRefileService);
    expect(service).toBeTruthy();
  });
});
