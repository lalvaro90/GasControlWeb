import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineNewComponent } from './machine-new.component';

describe('MachineNewComponent', () => {
  let component: MachineNewComponent;
  let fixture: ComponentFixture<MachineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
