import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGalleryComponent } from './sub-gallery.component';

describe('SubGalleryComponent', () => {
  let component: SubGalleryComponent;
  let fixture: ComponentFixture<SubGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
