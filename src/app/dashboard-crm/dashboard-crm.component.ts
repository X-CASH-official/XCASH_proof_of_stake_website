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
    delegatestatistics:string;
    delegateprofileinformation:string;
    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL BLOCKS FOUND', icon: 'assignments' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL XCASH', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL PAYMENTS', icon: 'info' }
    ];
    public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'TOTAL VOTE COUNT', icon: 'done' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'FEE', icon: 'info' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'MINIMUM AMOUNT', icon: 'info' }
    ];

    constructor(private httpdataservice: httpdataservice) { }

    ngOnInit() {
          // get the data          
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res)); 
            this.public_address = data.public_address; 
            this.delegatestatistics = "website/auth/tables/delegates_statistics?data=" + this.public_address;   
            this.delegateprofileinformation = "website/auth/delegates_information?data=" + this.public_address; 
	    this.dashCard1[0].number = data.total_blocks_found;
            this.dashCard1[1].number = data.total_xcash;
            this.dashCard1[2].number = data.total_payments;
	    this.dashCard2[0].number = data.total_vote_count;
            this.dashCard2[1].number = data.fee;
            this.dashCard2[2].number = data.minimum_amount;
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
    }

}
