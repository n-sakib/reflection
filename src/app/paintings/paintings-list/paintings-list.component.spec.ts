import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsListComponent } from './paintings-list.component';

describe('PaintingsListComponent', () => {
  let component: PaintingsListComponent;
  let fixture: ComponentFixture<PaintingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
