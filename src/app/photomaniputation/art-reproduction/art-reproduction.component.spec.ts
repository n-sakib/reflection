import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtReproductionComponent } from './art-reproduction.component';

describe('ArtReproductionComponent', () => {
  let component: ArtReproductionComponent;
  let fixture: ComponentFixture<ArtReproductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtReproductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtReproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
