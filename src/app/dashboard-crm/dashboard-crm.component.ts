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
    delegatestatistics:string;
    delegateprofileinformation:string;

    // public dashCard1 = [
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'DELEGATE RANK', icon: 'leaderboard' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'VOTERS', icon: 'how_to_reg' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '', title: 'BLOCKS FOUND', icon: 'find_in_page' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 40, text_size: 40, text: 0, suffix: '%', title: 'ONLINE PERCENTAGE', icon: 'update' }
    // ];
    // public dashCard2 = [
    //   { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 40, text: '', suffix: '%', title: 'FEE PERCENTAGE', icon: 'local_atm' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 30, text_size: 40, text: '', suffix: 'XCA', title: 'MINIMUM PAYMENT AMOUNT', icon: 'attach_money' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 30, text_size: 40, text: 0, suffix: '', title: 'PAYMENTS', icon: 'payment' }
    // ];
    // public dashCard3 = [
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: 'XCA', title: 'VOTE COUNT', icon: 'done_all' },
    //     { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: 'XCA', title: 'XCASH FROM BLOCKS FOUND', icon: 'pageview' }
    // ];


    public dashCard1 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: 'XCA',  title: 'VOTE COUNT', icon: 'done_all' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: 'XCA', title: 'XCASH FROM BLOCKS FOUND', icon: 'pageview' },
    ];
    public dashCard2 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 36, text: '', suffix: '',  title: 'ONLINE STATUS', icon: 'online_prediction' },
    ];
    public dashCard3 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK ', icon: 'leaderboard' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'BLOCKS FOUND ', icon: 'find_in_page' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'ONLINE PERCENTAGE', icon: 'update' }
    ];
    public dashCard4 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'EST ROUNDS BTW HITS ', icon: 'published_with_changes' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true,  width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'HOURS SINCE LAST FINDING', icon: 'alarm_on' }
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

    ngOnInit() {
      // get the data
  	  this.HttpdataService.get_request(this.HttpdataService.GET_STATISTICS).subscribe(
    	  (res) =>
    	  {
          var data = JSON.parse(JSON.stringify(res));
          this.public_address = data.public_address;
          this.delegate_name = data.delegate_name;

          this.delegatestatistics = "website/auth/tables/delegates_statistics?data=" + this.public_address;
          this.delegateprofileinformation = "website/auth/delegates_information?data=" + this.public_address;
          // // dashCard1 row
          // this.dashCard1[0].text = data.current_delegate_rank;
          // this.dashCard1[1].text = data.total_voters;
          // this.dashCard1[2].text = data.total_blocks_found;
          // this.dashCard1[3].text = data.online_percentage;
          // // dashCard2 row
          this.dashCard1[1].text = parseInt(data.total_xcash_from_blocks_found) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
          this.dashCard6[1].text = data.fee;
          this.dashCard6[2].text = data.minimum_amount;
          this.dashCard6[3].text = data.total_payments;
          // // dashCard3 row
          // this.dashCard3[0].text = parseInt(data.total_votes) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;






          this.dashCard1[0].text = parseInt(data.total_vote_count) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

          this.dashCard2[0].text = data.online_status == 'true' ? 'Online'  : 'Offline';

          this.dashCard3[0].text = block_producer_block_heights.length-1;
          this.dashCard3[1].text = parseInt(data.current_delegate_rank);
          this.dashCard3[2].text = parseInt(data.block_verifier_online_percentage);

          this.dashCard4[0].text = parseInt(data.block_producer_total_rounds) / parseInt(data.block_verifier_total_rounds) * 100;
          this.dashCard4[1].text = parseInt(data.block_verifier_total_rounds) / data.total_blocks_found;
          this.dashCard4[2].text = ((parseInt(data.current_block_height) - this.last_block_found) * this.HttpdataService.BLOCK_TIME) / 60;

          this.dashCard5[0].text = parseInt(data.block_verifier_online_total_rounds);
          this.dashCard5[1].text = parseInt(data.block_verifier_total_rounds);
          this.dashCard5[2].text = parseInt(data.block_producer_total_rounds);

    	  },
    	  (error) =>
              {
    	    Swal.fire("Error","An error has occured","error");
    	  }
  	  );
    }

}
