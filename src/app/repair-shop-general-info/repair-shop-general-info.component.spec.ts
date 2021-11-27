import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopGeneralInfoComponent } from './repair-shop-general-info.component';

describe('RepairShopGeneralInfoComponent', () => {
  let component: RepairShopGeneralInfoComponent;
  let fixture: ComponentFixture<RepairShopGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
