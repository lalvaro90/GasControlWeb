import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDasboardComponent } from './control-dasboard.component';

describe('ControlDasboardComponent', () => {
  let component: ControlDasboardComponent;
  let fixture: ComponentFixture<ControlDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlDasboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
