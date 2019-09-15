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
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL VOTE COUNT', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'CURRENT VOTE COUNT', icon: 'done' }
    ];
	total_vote_count:any = 0;
	amount_of_votes:any = 0;
	public_address:string;
	data:any[] = [];
	document_start_count:number = 1;
	public displayedColumns = ['ID', 'public_address_created_reserve_proof', 'total', 'reserve_proof'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
  	constructor(private httpdataservice: httpdataservice) { }

  	ngOnInit() {

          // get the data          
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res)); 
            this.public_address = data.public_address; 

            // get the data	 
	    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_VOTERS_LIST + "?parameter1=" + this.public_address).subscribe(
	    (res) =>
	    {
              this.exampleDatabase = new ExampleDatabase();
              var data = JSON.parse(JSON.stringify(res));
	      this.total_vote_count = 0;	
	      this.amount_of_votes = data.length;
	      var count = 0;
              for (count = 0; count < this.amount_of_votes; count++)
	      {
                this.total_vote_count += parseInt(data[count].total);
	        this.exampleDatabase.addUser((count + 1).toString(),data[count].public_address_created_reserve_proof.toString(),data[count].total.toString(),data[count].reserve_proof.toString());
	      }
	      this.dashCard[0].number = this.total_vote_count;
	      this.dashCard[1].number = this.amount_of_votes;	
  	      this.dataSource = new ExampleDataSource(this.exampleDatabase);
              },
              (error) => 
              {
                Swal.fire("Error","An error has occured","error");
              }
	    );
          },
            (error) => 
            {
              Swal.fire("Error","An error has occured","error");
            }
	  );	  		  
	}
}
