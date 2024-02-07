import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPopupComponent } from './search-popup.component';

describe('SearchPopupComponent', () => {
  let component: SearchPopupComponent;
  let fixture: ComponentFixture<SearchPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPopupComponent]
    });
    fixture = TestBed.createComponent(SearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
