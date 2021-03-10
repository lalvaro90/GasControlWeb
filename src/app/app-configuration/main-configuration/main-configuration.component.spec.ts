import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainConfigurationComponent } from './main-configuration.component';

describe('MainConfigurationComponent', () => {
  let component: MainConfigurationComponent;
  let fixture: ComponentFixture<MainConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
