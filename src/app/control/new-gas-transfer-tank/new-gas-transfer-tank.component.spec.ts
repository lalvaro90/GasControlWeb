import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGasTransferTankComponent } from './new-gas-transfer-tank.component';

describe('NewGasTransferTankComponent', () => {
  let component: NewGasTransferTankComponent;
  let fixture: ComponentFixture<NewGasTransferTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGasTransferTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGasTransferTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
