import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdUnitComponent } from './view-by-id-unit.component';

describe('ViewByIdUnitComponent', () => {
  let component: ViewByIdUnitComponent;
  let fixture: ComponentFixture<ViewByIdUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
