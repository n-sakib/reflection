import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypaintingsComponent } from './buypaintings.component';

describe('BuypaintingsComponent', () => {
  let component: BuypaintingsComponent;
  let fixture: ComponentFixture<BuypaintingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuypaintingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuypaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
