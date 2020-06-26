import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPictureComponent } from './paid-picture.component';

describe('PaidPictureComponent', () => {
  let component: PaidPictureComponent;
  let fixture: ComponentFixture<PaidPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
