import {fromEvent as observableFromEvent } from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import { FunctionsService } from '../../services/functions.service';

import Swal from 'sweetalert2';

import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './voterslist.component.html',
  styleUrls: ['./voterslist.component.scss']
})

export class VoterslistComponent implements OnInit {

	public dashCard = [
      { ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: ' XCA', title: 'VOTE COUNT', icon: 'done_all' },
      { ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'VOTERS', icon: 'how_to_reg' }
  ];
	total_vote_count:any = 0;
	amount_of_votes:any = 0;
	public_address:string;
	data:any[] = [];
	document_start_count:number = 1;
  length;

  public displayedColumns = ['ID', 'total', 'public_address_created_reserve_proof', 'reserve_proof'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;

	constructor(private httpdataservice: HttpdataService, public functionsService: FunctionsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


	ngOnInit() {
    // get the data
    this.httpdataservice.get_request(this.httpdataservice.POOL_GET_STATISTICS).subscribe(
      (res) =>   {
        var data = JSON.parse(JSON.stringify(res));
        this.public_address = data.public_address;

        // get the data
        this.httpdataservice.get_request(this.httpdataservice.POOL_GET_DELEGATES_VOTERS_LIST + "?parameter1=" + this.public_address).subscribe(
          (response) => {
            this.exampleDatabase = new ExampleDatabase();
            var data = JSON.parse(JSON.stringify(response));
            this.total_vote_count = 0;
            this.amount_of_votes = data.length;
            var count;
            var total = 0;
            for (count = 0; count < this.amount_of_votes; count++) {
              total = parseInt(data[count].total) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
              this.total_vote_count += total;
              this.exampleDatabase.addUser((count + 1).toString(),data[count].public_address_created_reserve_proof.toString(),total.toString(),data[count].reserve_proof.toString());
            }
            this.dashCard[0].text = this.total_vote_count;
            this.dashCard[1].text = this.amount_of_votes;

            this.length = this.amount_of_votes;
            this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

            observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
              debounceTime(150),
              distinctUntilChanged()
            ).subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
              }
            );
          },
          (error) => {
            Swal.fire("Error","An error has occured","error");
          }
        );
      },
      (error) => {
        Swal.fire("Error","An error has occured","error");
      }
    );
  }
}
