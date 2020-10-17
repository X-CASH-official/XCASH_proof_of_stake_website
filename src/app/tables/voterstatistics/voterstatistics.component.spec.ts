import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpdataService} from 'app/services/http-request.service';

import { voterstatisticsComponent } from './voterstatistics.component';

describe('voterstatisticsComponent', () => {
  let component: voterstatisticsComponent;
  let fixture: ComponentFixture<voterstatisticsComponent>;
  let test_data: any[] = [
    { id: "1", date_and_time: '100', tx_hash: "data", tx_key: "0", total: "0" },
    { id: "2", date_and_time: '100', tx_hash: "data", tx_key: "0", total: "0" }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ voterstatisticsComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ HttpdataService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(voterstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 // check that all html components are created
 it('should create', () => expect(component).toBeTruthy());

 it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
 it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('CURRENT_AMOUNT'));
 it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.number).toBe(0));

 it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
 it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('TOTAL AMOUNT PAID'));
 it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.number).toBe(0));

 it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
 it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('TOTAL NUMBER OF PAYMENTS'));
 it('should set dash card threes property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.number).toBe(0));

 it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
 it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('INACTIVITY_TOTAL'));
 it('should set dash card fours property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.number).toBe(0));

 it('should create transactions table', () => expect(fixture.debugElement.nativeElement.querySelector('#transactions_table')).toBeTruthy());

 // test the code
 it('should update transactions table', () => {
   component.exampleDatabase = new ExampleDatabase();
   test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.date_and_time,item.tx_hash,item.tx_key,item.total));
   component.dataSource = new ExampleDataSource(component.exampleDatabase);

   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
   expect(fixture.debugElement.nativeElement.querySelector('#tx_hash1').textContent).toContain(test_data[0].tx_hash);
   expect(fixture.debugElement.nativeElement.querySelector('#tx_key1').textContent).toContain(test_data[0].tx_key);
   expect(fixture.debugElement.nativeElement.querySelector('#total1').textContent).toContain(test_data[0].total);
   
   expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
   expect(fixture.debugElement.nativeElement.querySelector('#tx_hash2').textContent).toContain(test_data[1].tx_hash);
   expect(fixture.debugElement.nativeElement.querySelector('#tx_key2').textContent).toContain(test_data[1].tx_key);
   expect(fixture.debugElement.nativeElement.querySelector('#total2').textContent).toContain(test_data[1].total);
   });
});
