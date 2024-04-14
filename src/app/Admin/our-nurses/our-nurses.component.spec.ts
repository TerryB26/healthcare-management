import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurNursesComponent } from './our-nurses.component';

describe('OurNursesComponent', () => {
  let component: OurNursesComponent;
  let fixture: ComponentFixture<OurNursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurNursesComponent]
    });
    fixture = TestBed.createComponent(OurNursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
