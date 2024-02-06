import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdDeviceComponent } from './view-by-id-device.component';

describe('ViewByIdDeviceComponent', () => {
  let component: ViewByIdDeviceComponent;
  let fixture: ComponentFixture<ViewByIdDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
