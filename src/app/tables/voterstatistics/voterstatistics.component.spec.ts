import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { voterstatisticsComponent } from './voterstatistics.component';

describe('voterstatisticsComponent', () => {
  let component: voterstatisticsComponent;
  let fixture: ComponentFixture<voterstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ voterstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(voterstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
