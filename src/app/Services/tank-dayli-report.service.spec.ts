import { TestBed } from '@angular/core/testing';

import { TankDayliReportService } from './tank-dayli-report.service';

describe('TankDayliReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TankDayliReportService = TestBed.get(TankDayliReportService);
    expect(service).toBeTruthy();
  });
});
