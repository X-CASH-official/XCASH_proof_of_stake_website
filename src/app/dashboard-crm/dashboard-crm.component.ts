import { Component, OnInit } from '@angular/core';
import {httpdataservice} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
    public_address:string;
    delegate_name:string;
    delegatestatistics:string;
    delegateprofileinformation:string;
    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'CURRENT DELEGATE RANK', icon: 'info' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'TOTAL_VOTES', icon: 'info' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'ONLINE PERCENTAGE', icon: 'info' }
    ];
    public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'TOTAL BLOCKS FOUND', icon: 'assignments' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'TOTAL XCASH FROM BLOCKS FOUND', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'TOTAL PAYMENTS', icon: 'info' }
    ];
    public dashCard3 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'TOTAL VOTERS', icon: 'done' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: false, title: 'FEE', icon: 'info' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, settings: true, title: 'MINIMUM PAYOUT AMOUNT', icon: 'info' }
    ];

    constructor(private httpdataservice: httpdataservice) { }

    ngOnInit() {
          // get the data          
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res)); 
            this.public_address = data.public_address; 
            this.delegate_name = `vote ${data.delegate_name}`; 
            this.delegatestatistics = "website/auth/tables/delegates_statistics?data=" + this.public_address;   
            this.delegateprofileinformation = "website/auth/delegates_information?data=" + this.public_address; 
            this.dashCard1[0].number = data.current_delegate_rank;
            this.dashCard1[1].number = parseInt(data.total_votes) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
            this.dashCard1[2].number = data.online_percentage;
	    this.dashCard2[0].number = data.total_blocks_found;
            this.dashCard2[1].number = parseInt(data.total_xcash_from_blocks_found) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
            this.dashCard2[2].number = data.total_payments;
	    this.dashCard3[0].number = data.total_voters;
            this.dashCard3[1].number = data.fee;
            this.dashCard3[2].number = data.minimum_amount;
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
    }

}
