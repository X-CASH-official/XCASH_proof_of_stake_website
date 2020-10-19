import {fromEvent as observableFromEvent,  Observable } from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';

import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './blocksfound.component.html',
  styleUrls: ['./blocksfound.component.scss']
})

export class blocksfoundComponent implements OnInit {

  public dashCard = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'BLOCKS FOUND', icon: 'find_in_page' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'EST ROUNDS BTW HITS', icon: 'published_with_changes' }
  ];

  total_blocks_found:any = 0;
	total_average:number = 0;
  length:number;
  
  public displayedColumns = ['ID', 'block_height', 'block_date_and_time', 'block_reward', 'block_hash'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;

	constructor(private HttpdataService: HttpdataService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
    // get the data
    this.HttpdataService.get_request(this.HttpdataService.POOL_GET_BLOCKS_FOUND).subscribe(
  	  (res) =>
  	  {
        this.exampleDatabase = new ExampleDatabase();
        var data = JSON.parse(JSON.stringify(res));
        var count = 0;
        var block_reward;

        this.total_blocks_found = data.length;

        for (count = 0; count < data.length; count++) {
          block_reward = parseInt(data[count].block_reward) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
  	      this.exampleDatabase.addUser((count + 1).toString(),data[count].block_height.toString(),data[count].block_hash.toString(),(parseInt(data[count].block_date_and_time) * 1000).toString(),block_reward.toString());
  	    }

        this.dashCard[0].text = data.length;
  	    //this.dataSource = new ExampleDataSource(this.exampleDatabase);
        this.length =  data.length;
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

        //console.log(this.dataSource);
        observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
          debounceTime(150),
          distinctUntilChanged()
        ).subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          }
        );

        this.HttpdataService.get_request(this.HttpdataService.POOL_GET_STATISTICS).subscribe(
          (res) => {
            var data = JSON.parse(JSON.stringify(res));
            this.total_average = ((parseInt(data.block_verifier_total_rounds)/(100*this.total_blocks_found))*100) | 0;
            this.dashCard[0].text = data.length;
            this.dashCard[1].text = this.total_average;
            //this.dataSource = new ExampleDataSource(this.exampleDatabase);
        	  }, (error) => {
        	    Swal.fire("Error","An error has occured.<br/>Get statistics failed.","error");
        	  }
  	     );
  	  }, (error) => {
  	    Swal.fire("Error","An error has occured.<br/>Get blocks failed.","error");
  	  }
    );
  }
}
