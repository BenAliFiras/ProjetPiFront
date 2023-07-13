import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentreComponent } from './list-centre.component';

describe('ListCentreComponent', () => {
  let component: ListCentreComponent;
  let fixture: ComponentFixture<ListCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
