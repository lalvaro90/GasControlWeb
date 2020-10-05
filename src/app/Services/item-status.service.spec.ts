import { TestBed } from '@angular/core/testing';

import { ItemStatusService } from './item-status.service';

describe('ItemStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemStatusService = TestBed.get(ItemStatusService);
    expect(service).toBeTruthy();
  });
});
