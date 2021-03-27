import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGasTransferComponent } from './new-gas-transfer.component';

describe('NewGasTransferComponent', () => {
  let component: NewGasTransferComponent;
  let fixture: ComponentFixture<NewGasTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGasTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGasTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
