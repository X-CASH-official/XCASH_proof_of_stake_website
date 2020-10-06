import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { blocksfoundComponent } from './blocksfound.component';

describe('blocksfoundComponent', () => {
  let component: blocksfoundComponent;
  let fixture: ComponentFixture<blocksfoundComponent>;
  let test_data: any[] = [
    { id: "1", block_height: '100', block_hash: "data", block_date_and_time: "0", block_reward: "0" },
    { id: "2", block_height: '100', block_hash: "data", block_date_and_time: "0", block_reward: "0" }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ blocksfoundComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(blocksfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // check that all html components are created
    it('should create', () => expect(component).toBeTruthy());

    it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
    it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('BLOCKS FOUND'));
    it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.number).toBe(0));

    it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
    it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('EST ROUNDS BTW HITS'));
    it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.number).toBe(0));

    it('should create blocks_found table', () => expect(fixture.debugElement.nativeElement.querySelector('#blocks_found_table')).toBeTruthy());

    // test the code
    it('should update blocks_found table', () => {
      component.exampleDatabase = new ExampleDatabase();
      test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.block_height,item.block_hash,item.block_date_and_time,item.block_reward));
      component.dataSource = new ExampleDataSource(component.exampleDatabase);

      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
      expect(fixture.debugElement.nativeElement.querySelector('#block_height1').textContent).toContain(test_data[0].block_height);
      expect(fixture.debugElement.nativeElement.querySelector('#block_hash1').textContent).toContain(test_data[0].block_hash);
      expect(fixture.debugElement.nativeElement.querySelector('#block_reward1').textContent).toContain(test_data[0].block_reward);

      expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
      expect(fixture.debugElement.nativeElement.querySelector('#block_height2').textContent).toContain(test_data[1].block_height);
      expect(fixture.debugElement.nativeElement.querySelector('#block_hash2').textContent).toContain(test_data[1].block_hash);
      expect(fixture.debugElement.nativeElement.querySelector('#block_reward2').textContent).toContain(test_data[1].block_reward);
      });
});
