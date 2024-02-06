import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelIdComponent } from './add-model-id.component';

describe('AddModelIdComponent', () => {
  let component: AddModelIdComponent;
  let fixture: ComponentFixture<AddModelIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
