import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopChangePasswordComponent } from './repair-shop-change-password.component';

describe('RepairShopChangePasswordComponent', () => {
  let component: RepairShopChangePasswordComponent;
  let fixture: ComponentFixture<RepairShopChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
