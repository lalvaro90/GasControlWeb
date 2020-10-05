import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildFormsComponent } from './build-forms.component';

describe('BuildFormsComponent', () => {
  let component: BuildFormsComponent;
  let fixture: ComponentFixture<BuildFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
