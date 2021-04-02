import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTransfersComponent } from './daily-transfers.component';

describe('DailyTransfersComponent', () => {
  let component: DailyTransfersComponent;
  let fixture: ComponentFixture<DailyTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
