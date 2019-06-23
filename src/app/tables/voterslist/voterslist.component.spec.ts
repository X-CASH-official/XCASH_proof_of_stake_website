import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { voterslistComponent } from './voterslist.component';

describe('voterslistComponent', () => {
  let component: voterslistComponent;
  let fixture: ComponentFixture<voterslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ voterslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(voterslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
