import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCerntreComponent } from './add-cerntre.component';

describe('AddCerntreComponent', () => {
  let component: AddCerntreComponent;
  let fixture: ComponentFixture<AddCerntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCerntreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCerntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
