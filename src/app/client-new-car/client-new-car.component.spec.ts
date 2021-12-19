import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewCarComponent } from './client-new-car.component';

describe('ClientNewCarComponent', () => {
  let component: ClientNewCarComponent;
  let fixture: ComponentFixture<ClientNewCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNewCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
