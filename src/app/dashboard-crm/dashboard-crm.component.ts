import { Component, OnInit } from '@angular/core';
import {HttpdataService} from '../services/http-request.service';
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
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false,  width_icon: 20, text_size: 40, text: '', suffix: '',  title: 'VOTE COUNT', icon: 'done_all' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'XCASH FROM BLOCKS PRODUCED', icon: 'pageview' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 36, text: '', suffix: '',  title: 'ONLINE STATUS', icon: 'online_prediction' },
    ];
    public dashCard2 = [

    ];
    public dashCard3 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK ', icon: 'leaderboard' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'BLOCKS PRODUCED ', icon: 'find_in_page' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'ONLINE PERCENTAGE', icon: 'update' }
    ];
    public dashCard4 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'EST ROUNDS BTW PRODUCED BLOCKS', icon: 'published_with_changes' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false,  width_icon: 20, text_size: 40, text: '', suffix: '',  title: 'SINCE LAST BLOCK PRODUCED', icon: 'alarm_on' }
    ];
  	public  dashCard5 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VERIFIERS ONLINE ROUNDS', icon: 'model_training' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER ROUNDS', icon: 'autorenew' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'PRODUCER ROUNDS', icon: 'find_replace' }
    ];
    public dashCard6 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 40, text: '', suffix: '%', title: 'FEE PERCENTAGE', icon: 'local_atm' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 40, text: '', suffix: 'XCA', title: 'MINIMUM PAYMENT AMOUNT', icon: 'attach_money' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'PAYMENTS', icon: 'payment' }
    ];



    constructor(private HttpdataService: HttpdataService) { }

    get_delegate_stats() {
      this.HttpdataService.get_request(this.HttpdataService.EXPLORER_GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegate_name).subscribe(
        (res) =>
        {
          var info_data = JSON.parse(JSON.stringify(res));
          let xcash_wallet_decimal_places_amount = this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
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
          this.shared_delegate_status = info_data.shared_delegate_status == 'true' ? 'Shared'  : 'Solo';
          this.delegate_fee = info_data.delegate_fee;

          this.dashCard1[2].text = info_data.online_status == 'true' ? 'Online'  : 'Offline';

          this.dashCard4[0].text = parseInt(info_data.block_producer_total_rounds) / parseInt(info_data.block_verifier_total_rounds) * 100;
          this.dashCard4[1].text = parseInt(info_data.block_verifier_total_rounds) / block_producer_block_heights.length;;

          this.dashCard5[0].text = parseInt(info_data.block_verifier_online_total_rounds);
          this.dashCard5[1].text = info_data.block_verifier_total_rounds; //parseInt(info_data.block_verifier_total_rounds);
          this.dashCard5[2].text = parseInt(info_data.block_producer_total_rounds);

        },
        (error) => {
          Swal.fire("Error","An error has occured.<br/>Get delegate explorer statistics found.","error");
        }
      );
    }

    get_delegate_website_statistics()
    {
      this.HttpdataService.get_request(this.HttpdataService.EXPLORER_GET_DELEGATE_WEBSITE_STATISTICS).subscribe(
        (res) =>
        {
          var statistic_data = JSON.parse(JSON.stringify(res));
          var minutes_since_last_block_found = ((parseInt(statistic_data.current_block_height) - this.last_block_found) * this.HttpdataService.BLOCK_TIME);
          var minutes = minutes_since_last_block_found % 60;
          var hours = (minutes_since_last_block_found-minutes) / 60;
          this.dashCard4[2].text =  "~ " + hours.toString() + "h " + (minutes<10?"0":"") + minutes.toString() + "m";
        },
        (error) => {
          Swal.fire("Error","An error has occured.<br/>Get delegate website statistics found.","error");
        }
      );
    }

    get_lg_numer_format(value){
      var exp, suffixes = ['k', 'M', 'B', 't', 'q', 'Q'];
      if (Number.isNaN(value)) { return null; }
      if (value < 1000) { return value; }
      exp = Math.floor(Math.log(value) / Math.log(1000));
      return (value / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1];
    }


    ngOnInit() {
      // get the data
  	  this.HttpdataService.get_request(this.HttpdataService.POOL_GET_STATISTICS).subscribe(
    	  (res) =>
    	  {
          var data = JSON.parse(JSON.stringify(res));

          this.public_address = data.public_address;
          this.delegate_name = data.delegate_name;

          this.dashCard1[0].text = this.get_lg_numer_format(parseInt(data.total_votes) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);
          this.dashCard1[1].text = this.get_lg_numer_format(parseInt(data.total_xcash_from_blocks_found) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);

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
