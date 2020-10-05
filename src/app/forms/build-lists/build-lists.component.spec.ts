import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildListsComponent } from './build-lists.component';

describe('BuildListsComponent', () => {
  let component: BuildListsComponent;
  let fixture: ComponentFixture<BuildListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
