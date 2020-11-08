import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsDetailsComponent } from './paintings-details.component';

describe('PaintingsDetailsComponent', () => {
  let component: PaintingsDetailsComponent;
  let fixture: ComponentFixture<PaintingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
