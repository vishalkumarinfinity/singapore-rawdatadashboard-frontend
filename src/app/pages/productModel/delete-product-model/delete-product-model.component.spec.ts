import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductModelComponent } from './delete-product-model.component';

describe('DeleteProductModelComponent', () => {
  let component: DeleteProductModelComponent;
  let fixture: ComponentFixture<DeleteProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
