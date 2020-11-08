import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoToArtComponent } from './photo-to-art.component';

describe('PhotoToArtComponent', () => {
  let component: PhotoToArtComponent;
  let fixture: ComponentFixture<PhotoToArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoToArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoToArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
