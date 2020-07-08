import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTestimonialsComponent } from './show-testimonials.component';

describe('ShowTestimonialsComponent', () => {
  let component: ShowTestimonialsComponent;
  let fixture: ComponentFixture<ShowTestimonialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTestimonialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
