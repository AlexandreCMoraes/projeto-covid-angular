import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCovidComponent } from './info-covid.component';

describe('InfoCovidComponent', () => {
  let component: InfoCovidComponent;
  let fixture: ComponentFixture<InfoCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
