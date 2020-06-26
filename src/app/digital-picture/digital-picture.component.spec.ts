import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPictureComponent } from './digital-picture.component';

describe('DigitalPictureComponent', () => {
  let component: DigitalPictureComponent;
  let fixture: ComponentFixture<DigitalPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
