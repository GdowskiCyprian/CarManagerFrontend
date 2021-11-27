import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopMyClientsComponent } from './repair-shop-my-clients.component';

describe('RepairShopMyClientsComponent', () => {
  let component: RepairShopMyClientsComponent;
  let fixture: ComponentFixture<RepairShopMyClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopMyClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopMyClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
