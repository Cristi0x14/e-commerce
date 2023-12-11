import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductDetailsImagesComponent } from './show-product-details-images.component';

describe('ShowProductDetailsImagesComponent', () => {
  let component: ShowProductDetailsImagesComponent;
  let fixture: ComponentFixture<ShowProductDetailsImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProductDetailsImagesComponent]
    });
    fixture = TestBed.createComponent(ShowProductDetailsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
