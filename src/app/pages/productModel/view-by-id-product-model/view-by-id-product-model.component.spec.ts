import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdProductModelComponent } from './view-by-id-product-model.component';

describe('ViewByIdProductModelComponent', () => {
  let component: ViewByIdProductModelComponent;
  let fixture: ComponentFixture<ViewByIdProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdProductModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
