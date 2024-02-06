import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdSensorComponent } from './view-by-id-sensor.component';

describe('ViewByIdSensorComponent', () => {
  let component: ViewByIdSensorComponent;
  let fixture: ComponentFixture<ViewByIdSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
