import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreFieldComponent } from './filtre-field.component';

describe('FiltreFieldComponent', () => {
  let component: FiltreFieldComponent;
  let fixture: ComponentFixture<FiltreFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
