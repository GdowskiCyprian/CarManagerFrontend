import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyCarsComponent } from './client-my-cars.component';

describe('ClientMyCarsComponent', () => {
  let component: ClientMyCarsComponent;
  let fixture: ComponentFixture<ClientMyCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMyCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
