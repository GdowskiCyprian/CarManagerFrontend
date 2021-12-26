import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewRepairComponent } from './client-new-repair.component';

describe('ClientNewRepairComponent', () => {
  let component: ClientNewRepairComponent;
  let fixture: ComponentFixture<ClientNewRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNewRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
