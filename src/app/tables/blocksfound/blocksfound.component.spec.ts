import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { blocksfoundComponent } from './blocksfound.component';

describe('blocksfoundComponent', () => {
  let component: blocksfoundComponent;
  let fixture: ComponentFixture<blocksfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ blocksfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(blocksfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
