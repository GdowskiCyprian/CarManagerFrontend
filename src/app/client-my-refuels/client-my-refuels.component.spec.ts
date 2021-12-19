import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyRefuelsComponent } from './client-my-refuels.component';

describe('ClientMyRefuelsComponent', () => {
  let component: ClientMyRefuelsComponent;
  let fixture: ComponentFixture<ClientMyRefuelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMyRefuelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyRefuelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
