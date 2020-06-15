import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotraitPictureComponent } from './potrait-picture.component';

describe('PotraitPictureComponent', () => {
  let component: PotraitPictureComponent;
  let fixture: ComponentFixture<PotraitPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotraitPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotraitPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
