import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRawDataComponent } from './device-raw-data.component';

describe('DeviceRawDataComponent', () => {
  let component: DeviceRawDataComponent;
  let fixture: ComponentFixture<DeviceRawDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceRawDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
