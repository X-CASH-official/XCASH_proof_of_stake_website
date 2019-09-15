import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './voterstatistics.component.html',
  styleUrls: ['./voterstatistics.component.scss']
})
export class voterstatisticsComponent implements OnInit {
	public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'CURRENT_AMOUNT', icon: 'assignments' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL AMOUNT PAID', icon: 'done' }
    ];

        public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL NUMBER OF PAYMENTS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'INACTIVITY_TOTAL', icon: 'info' }
    ];
        XCASH_WALLET_LENGTH:number = 98
        XCASH_WALLET_PREFIX:string = "XCA"
        public_address:string;
	total_amount_paid:any = 0;
	total_number_of_payments:any = 0;
	public displayedColumns = ['ID', 'date_and_time', 'tx_hash', 'tx_key', 'total'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
  	constructor(private route: ActivatedRoute, private httpdataservice: httpdataservice) { }

  	ngOnInit()
        {
          this.public_address = this.route.snapshot.queryParamMap.get("data");

          if (this.public_address.length !== this.XCASH_WALLET_LENGTH || this.public_address.substr(0,3) !== this.XCASH_WALLET_PREFIX)
          {
            Swal.fire("Error","An error has occured","error");
            return;
          }

          this.get_public_address_information(this.public_address);
	}

	get_public_address_payment_information(public_address:string)
	{
          // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION + "?public_address=" + public_address).subscribe(
	  (res) =>
	  {
            this.total_amount_paid = 0;
            this.total_number_of_payments = 0;
            this.exampleDatabase = new ExampleDatabase();
            var data = JSON.parse(JSON.stringify(res));
            this.total_number_of_payments = data.length;
	    var count = 0;
	    for (count = 0; count < this.total_number_of_payments; count++)
	    {
	      // calculate the total amount paid
	      this.total_amount_paid += parseInt(data[count].total);
	      this.exampleDatabase.addUser((count + 1).toString(),(parseInt(data[count].date_and_time) * 1000).toString(),data[count].tx_hash.toString(),data[count].tx_key.toString(),data[count].total.toString());
	    }
	    this.dashCard1[1].number = this.total_amount_paid;
	    this.dashCard2[0].number = this.total_number_of_payments;	
  	    this.dataSource = new ExampleDataSource(this.exampleDatabase);
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
	}



        async get_public_address_information(public_address:string)
	{
          // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_PUBLIC_ADDRESS_INFORMATION + "?public_address=" + public_address).subscribe(
	  async (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res));            
	    this.dashCard1[0].number = data.current_total;
            this.dashCard2[1].number = data.inactivity_count;

            await this.httpdataservice.sleep(200);
            this.get_public_address_payment_information(public_address);
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
	}
}
