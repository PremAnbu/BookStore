import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreHeaderComponent } from './bookstore-header.component';

describe('BookstoreHeaderComponent', () => {
  let component: BookstoreHeaderComponent;
  let fixture: ComponentFixture<BookstoreHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookstoreHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
