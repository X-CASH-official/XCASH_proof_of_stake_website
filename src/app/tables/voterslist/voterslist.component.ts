import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './voterslist.component.html',
  styleUrls: ['./voterslist.component.scss']
})
export class voterslistComponent implements OnInit {
	public dashCard = [
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'VOTE COUNT', icon: 'done_all' },
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'VOTERS', icon: 'how_to_reg' }
    ];
	total_vote_count:any = 0;
	amount_of_votes:any = 0;
	public_address:string;
	data:any[] = [];
	document_start_count:number = 1;

  public displayedColumns = ['ID', 'total', 'public_address_created_reserve_proof', 'reserve_proof'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;

	constructor(private httpdataservice: httpdataservice) { }

	ngOnInit() {
    // get the data
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
      (res) =>   {
        var data = JSON.parse(JSON.stringify(res));
        this.public_address = data.public_address;

        // get the data
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_VOTERS_LIST + "?parameter1=" + this.public_address).subscribe(
          (res) => {
            this.exampleDatabase = new ExampleDatabase();
            var data = JSON.parse(JSON.stringify(res));
            this.total_vote_count = 0;
            this.amount_of_votes = data.length;
            var count = 0;
            var total = 0;
            for (count = 0; count < this.amount_of_votes; count++) {
              total = parseInt(data[count].total) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
              this.total_vote_count += total;
              this.exampleDatabase.addUser((count + 1).toString(),data[count].public_address_created_reserve_proof.toString(),total.toString(),data[count].reserve_proof.toString());
            }
            this.dashCard[0].text = this.total_vote_count;
            this.dashCard[1].text = this.amount_of_votes;
            this.dataSource = new ExampleDataSource(this.exampleDatabase);
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
