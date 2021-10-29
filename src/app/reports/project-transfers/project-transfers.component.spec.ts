import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTransfersComponent } from './project-transfers.component';

describe('ProjectTransfersComponent', () => {
  let component: ProjectTransfersComponent;
  let fixture: ComponentFixture<ProjectTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
