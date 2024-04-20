import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrescriptionsComponent } from './my-prescriptions.component';

describe('MyPrescriptionsComponent', () => {
  let component: MyPrescriptionsComponent;
  let fixture: ComponentFixture<MyPrescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPrescriptionsComponent]
    });
    fixture = TestBed.createComponent(MyPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
