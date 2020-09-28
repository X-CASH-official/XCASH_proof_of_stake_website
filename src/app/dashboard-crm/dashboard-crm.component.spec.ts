import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { DashboardCrmComponent } from './dashboard-crm.component';

describe('DashboardCrmComponent', () => {
  let component: DashboardCrmComponent;
  let fixture: ComponentFixture<DashboardCrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCrmComponent ],
imports: [HttpClientTestingModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('CURRENT DELEGATE RANK'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.number).toBe(0));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('TOTAL VOTES'));
  it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.number).toBe(0));

  it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
  it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('ONLINE PERCENTAGE'));
  it('should set dash card threes property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.number).toBe(0));

  it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
  it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('TOTAL BLOCKS FOUND'));
  it('should set dash card fours property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.number).toBe(0));

  it('should create dash card five', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5')).toBeTruthy());
  it('should set dash card fives title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.title).toBe('TOTAL XCASH FROM BLOCKS FOUND'));
  it('should set dash card fives property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.number).toBe(0));

  it('should create dash card six', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6')).toBeTruthy());
  it('should set dash card sixs title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.title).toBe('TOTAL PAYMENTS'));
  it('should set dash card sixs property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.number).toBe(0));

  it('should create dash card seven', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7')).toBeTruthy());
  it('should set dash card sevens title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.title).toBe('TOTAL VOTERS'));
  it('should set dash card sevens property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.number).toBe(0));

  it('should create dash card eight', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8')).toBeTruthy());
  it('should set dash card eights title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.title).toBe('FEE'));
  it('should set dash card eights property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.number).toBe(0));

  it('should create dash card nine', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9')).toBeTruthy());
  it('should set dash card nines title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.title).toBe('MINIMUM AMOUNT'));
  it('should set dash card nines property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.number).toBe(0));

  it('should create profile card one', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1')).toBeTruthy());
  it('should set profile card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1').title).toBe('Public Address'));

  it('should create profile card two', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2')).toBeTruthy());
  it('should set profile card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2').title).toBe('View Delegate Statistics'));

  it('should create profile card three', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3')).toBeTruthy());
  it('should set profile card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3').title).toBe('View Delegate Profile Information'));

  // test the code
  it('should update dash card ones property', () => {
    fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text = 100;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(100);
 });

 it('should update dash card twos property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(100);
 });

 it('should update dash card threes property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(100);
 });

 it('should update dash card fours property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(100);
});

 it('should update dash card fives property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.text).toBe(100);
});

 it('should update dash card sixs property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.text).toBe(100);
});

 it('should update dash card sevens property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.text).toBe(100);
});

 it('should update dash card eights property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.text).toBe(100);
});

 it('should update dash card nines property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.text = 100;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.text).toBe(100);
});
});
