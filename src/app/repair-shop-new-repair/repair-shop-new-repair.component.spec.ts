import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopNewRepairComponent } from './repair-shop-new-repair.component';

describe('RepairShopNewRepairComponent', () => {
  let component: RepairShopNewRepairComponent;
  let fixture: ComponentFixture<RepairShopNewRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopNewRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopNewRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
