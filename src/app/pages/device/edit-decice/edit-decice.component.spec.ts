import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeciceComponent } from './edit-decice.component';

describe('EditDeciceComponent', () => {
  let component: EditDeciceComponent;
  let fixture: ComponentFixture<EditDeciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
