import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './voterstatistics.component.html',
  styleUrls: ['./voterstatistics.component.scss']
})
export class voterstatisticsComponent implements OnInit {
	public dashCard1 = [
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'CURRENT_AMOUNT', icon: 'assignments' },
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'TOTAL AMOUNT PAID', icon: 'done' }
    ];

        public dashCard2 = [
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'TOTAL NUMBER OF PAYMENTS', icon: 'cloud' },
        { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'INACTIVITY_TOTAL', icon: 'info' }
    ];
        XCASH_WALLET_LENGTH:number = 98
        XCASH_WALLET_PREFIX:string = "XCA"
        public public_address:string = "";
	total_amount_paid:any = 0;
	total_number_of_payments:any = 0;
	public displayedColumns = ['ID', 'date_and_time', 'tx_hash', 'tx_key', 'total'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;
	constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

	ngOnInit() {
    this.get_public_address_information(this.route.snapshot.queryParamMap.get("data"));
	}

	get_public_address_payment_information(data:string)	{
    // get the data
	  this.HttpdataService.get_request(this.HttpdataService.GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION + "?public_address=" + data).subscribe(
  	  (res) => {
        var data = JSON.parse(JSON.stringify(res));
        this.total_number_of_payments = data.length;
        this.total_amount_paid = 0;
        this.total_number_of_payments = 0;
        this.exampleDatabase = new ExampleDatabase();

        var count = 0;
        var total;

        for (count = 0; count < this.total_number_of_payments; count++)
  	    {
  	      // calculate the total amount paid
          total = parseInt(data[count].total) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
  	      this.total_amount_paid += total;
  	      this.exampleDatabase.addUser((count + 1).toString(),(parseInt(data[count].date_and_time) * 1000).toString(),data[count].tx_hash.toString(),data[count].tx_key.toString(),total.toString());
  	    }

  	    this.dashCard1[1].text = this.total_amount_paid;
  	    this.dashCard2[0].text = this.total_number_of_payments;
    	  this.dataSource = new ExampleDataSource(this.exampleDatabase);
  	  },
  	  (error) => {
  	    Swal.fire("Error","An error has occured","error");
  	  }
	  );
	}


  async get_public_address_information(data:string) {
          // get the data
	  this.HttpdataService.get_request(this.HttpdataService.GET_PUBLIC_ADDRESS_INFORMATION + "?public_address=" + data).subscribe(
	  async (res) =>
	  {
      var data2 = JSON.parse(JSON.stringify(res));
	    this.dashCard1[0].text = data2.current_total / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
      this.dashCard2[1].text = data2.inactivity_count;

      await this.HttpdataService.sleep(200);
      this.get_public_address_payment_information(data);
	  },
	  (error) =>
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
	}
}
