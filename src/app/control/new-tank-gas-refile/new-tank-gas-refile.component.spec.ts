import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTankGasRefileComponent } from './new-tank-gas-refile.component';

describe('NewTankGasRefileComponent', () => {
  let component: NewTankGasRefileComponent;
  let fixture: ComponentFixture<NewTankGasRefileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTankGasRefileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTankGasRefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
