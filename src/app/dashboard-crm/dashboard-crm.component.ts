import { Component, OnInit } from '@angular/core';
import {HttpdataService} from '../services/http-request.service';
import { FunctionsService } from '../services/functions.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
    public_address:string;
    delegate_name:string;
    last_block_found:number;
    title:string;
    about:string;
    website:string;
    team:string;
    shared_delegate_status;
    delegate_fee:number;
    server_specs:string;
    block_verifier_total_rounds:number;

    public dashCard1 = [
      { ogmeter: false,  width_icon: 20, text_size: 40, text: '', suffix: '',  title: 'VOTE COUNT', icon: 'done_all' },
      { ogmeter: false,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'XCASH FROM BLOCKS PRODUCED', icon: 'pageview' },
      { ogmeter: false, width_icon: 20, text_size: 36, text: 'Offline', suffix: '',  title: 'ONLINE STATUS', icon: 'online_prediction' },
    ];
    public dashCard2 = [

    ];
    public dashCard3 = [
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK ', icon: 'leaderboard' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'BLOCKS PRODUCED ', icon: 'find_in_page' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'ONLINE PERCENTAGE', icon: 'update' }
    ];
    public dashCard4 = [
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'EST ROUNDS BTW PRODUCED BLOCKS', icon: 'published_with_changes' },
      { ogmeter: false,  width_icon: 20, text_size: 40, text: '-', suffix: '',  title: 'SINCE LAST BLOCK PRODUCED', icon: 'alarm_on' }
    ];
  	public  dashCard5 = [
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VERIFIERS ONLINE ROUNDS', icon: 'model_training' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER ROUNDS', icon: 'autorenew' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'PRODUCER ROUNDS', icon: 'find_replace' }
    ];
    public dashCard6 = [
      { ogmeter: false, width_icon: 20, text_size: 40, text: '', suffix: '%', title: 'FEE PERCENTAGE', icon: 'local_atm' },
      { ogmeter: false, width_icon: 20, text_size: 40, text: '', suffix: 'XCA', title: 'MINIMUM PAYMENT AMOUNT', icon: 'attach_money' },
      { ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'PAYMENTS', icon: 'payments' }
    ];



    constructor(private httpdataservice: HttpdataService, public functionsService: FunctionsService) { }

    get_delegate_stats() {
      this.httpdataservice.get_request(this.httpdataservice.EXPLORER_GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegate_name).subscribe(
        (res) =>
        {
          var info_data = JSON.parse(JSON.stringify(res));
          var block_producer_block_heights = info_data.block_producer_block_heights.split("|");
          var count = 0;

          for (count = 1; count < block_producer_block_heights.length; count++) {
            if (count + 1 == block_producer_block_heights.length)  {
              this.last_block_found = parseInt(block_producer_block_heights[count]);
            }
      	  }

          this.about = info_data.about;

          this.website = info_data.website;
          this.team = info_data.team;
          this.server_specs = info_data.server_specs;
          console.log(info_data);

          this.shared_delegate_status = info_data.shared_delegate_status == 'solo' ? 'Solo' : info_data.shared_delegate_status == 'shared' ? 'Shared' : 'Group';
          this.delegate_fee = info_data.delegate_fee;

          this.dashCard1[2].text = info_data.online_status == 'true' ? 'Online'  : 'Offline';

          this.dashCard4[0].text = parseInt(info_data.block_producer_total_rounds) / parseInt(info_data.block_verifier_total_rounds) * 100;
          this.dashCard4[1].text = block_producer_block_heights.length > 0 ? parseInt(info_data.block_verifier_total_rounds) / block_producer_block_heights.length : "0";

          this.dashCard5[0].text = parseInt(info_data.block_verifier_online_total_rounds);
          this.dashCard5[1].text = info_data.block_verifier_total_rounds; 
          this.dashCard5[2].text = parseInt(info_data.block_producer_total_rounds);

        },
        (error) => {
          Swal.fire("Error","An error has occured.<br/>Get delegate explorer statistics found.","error");
        }
      );
    }

    get_delegate_website_statistics()
    {
      this.httpdataservice.get_request(this.httpdataservice.EXPLORER_GET_DELEGATE_WEBSITE_STATISTICS).subscribe(
        (res) =>
        {
          if (this.last_block_found) {
            var statistic_data = JSON.parse(JSON.stringify(res));
            var minutes_since_last_block_found = ((parseInt(statistic_data.current_block_height) - this.last_block_found) * this.httpdataservice.BLOCK_TIME);
            var minutes = minutes_since_last_block_found % 60;
            var hours = (minutes_since_last_block_found-minutes) / 60;
            this.dashCard4[2].text =  "~ " + hours.toString() + "h " + (minutes<10?"0":"") + minutes.toString() + "m";
          }else{
            this.dashCard4[2].text =  "∞";
          }
        },
        (error) => {
          Swal.fire("Error","An error has occured.<br/>Get delegate website statistics found.","error");
        }
      );
    }

    ngOnInit() {
      // get the data
  	  this.httpdataservice.get_request(this.httpdataservice.POOL_GET_STATISTICS).subscribe(
    	  (res) =>
    	  {
          var data = JSON.parse(JSON.stringify(res));

          this.public_address = data.public_address;
          this.delegate_name = data.delegate_name;

          this.dashCard1[0].text = this.functionsService.get_lg_numer_format(parseInt(data.total_votes) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);
          this.dashCard1[1].text = this.functionsService.get_lg_numer_format(parseInt(data.total_xcash_from_blocks_found) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);

          this.dashCard3[0].text = data.current_delegate_rank;
          this.dashCard3[1].text = data.total_blocks_found;
          this.dashCard3[2].text = data.online_percentage;

          this.dashCard6[0].text = parseFloat(data.fee);
          this.dashCard6[1].text = data.minimum_amount;
          this.dashCard6[2].text = data.total_payments;

          this.get_delegate_stats();
          this.get_delegate_website_statistics();

    	  },
    	  (error) => {
    	    Swal.fire("Error","An error has occured.<br/>Get delegate statistics failed.","error");
    	  }
  	  );
    }



}
