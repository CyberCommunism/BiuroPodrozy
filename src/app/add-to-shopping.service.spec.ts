import { TestBed } from '@angular/core/testing';

import { AddToShoppingService } from './add-to-shopping.service';

describe('AddToShoppingService', () => {
  let service: AddToShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
