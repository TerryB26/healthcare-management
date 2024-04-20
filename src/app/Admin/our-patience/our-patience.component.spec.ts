import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPatienceComponent } from './our-patience.component';

describe('OurPatienceComponent', () => {
  let component: OurPatienceComponent;
  let fixture: ComponentFixture<OurPatienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurPatienceComponent]
    });
    fixture = TestBed.createComponent(OurPatienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
