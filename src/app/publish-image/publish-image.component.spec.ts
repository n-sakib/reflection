import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishImageComponent } from './publish-image.component';

describe('PublishImageComponent', () => {
  let component: PublishImageComponent;
  let fixture: ComponentFixture<PublishImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
