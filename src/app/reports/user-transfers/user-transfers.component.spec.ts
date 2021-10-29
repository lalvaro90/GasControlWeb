import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransfersComponent } from './user-transfers.component';

describe('UserTransfersComponent', () => {
  let component: UserTransfersComponent;
  let fixture: ComponentFixture<UserTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
