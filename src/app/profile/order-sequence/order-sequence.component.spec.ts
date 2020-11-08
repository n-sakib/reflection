import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSequenceComponent } from './order-sequence.component';

describe('OrderSequenceComponent', () => {
  let component: OrderSequenceComponent;
  let fixture: ComponentFixture<OrderSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
