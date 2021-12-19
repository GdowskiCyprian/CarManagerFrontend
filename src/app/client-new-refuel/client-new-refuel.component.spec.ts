import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewRefuelComponent } from './client-new-refuel.component';

describe('ClientNewRefuelComponent', () => {
  let component: ClientNewRefuelComponent;
  let fixture: ComponentFixture<ClientNewRefuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNewRefuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewRefuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
