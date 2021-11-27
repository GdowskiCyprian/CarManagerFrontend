import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopMyRepairsComponent } from './repair-shop-my-repairs.component';

describe('RepairShopMyRepairsComponent', () => {
  let component: RepairShopMyRepairsComponent;
  let fixture: ComponentFixture<RepairShopMyRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopMyRepairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopMyRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
