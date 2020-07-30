import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDetailsComponent } from './buy-details.component';

describe('BuyDetailsComponent', () => {
  let component: BuyDetailsComponent;
  let fixture: ComponentFixture<BuyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
