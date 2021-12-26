import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyRepairsComponent } from './client-my-repairs.component';

describe('ClientMyRepairsComponent', () => {
  let component: ClientMyRepairsComponent;
  let fixture: ComponentFixture<ClientMyRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMyRepairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
