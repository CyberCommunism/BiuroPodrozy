import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLineComponent } from './trip-line.component';

describe('TripLineComponent', () => {
  let component: TripLineComponent;
  let fixture: ComponentFixture<TripLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
