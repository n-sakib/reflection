import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAuthenticationComponent } from './artist-authentication.component';

describe('ArtistAuthenticationComponent', () => {
  let component: ArtistAuthenticationComponent;
  let fixture: ComponentFixture<ArtistAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
