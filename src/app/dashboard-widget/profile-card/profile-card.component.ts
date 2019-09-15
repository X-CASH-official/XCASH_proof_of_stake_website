import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'cdk-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

    @Input() title: string;
    @Input() settings: object;
    @Input() data_settings: object;
    @Input() text_settings: object;
    @Input() data: string;
    @Input() button_name: string;
    @Input() button_length: string;
    @Input() button_click: string;

    width:number = 0;

    public bio =true;
    public skill;
    public proj;
    constructor() { }

   copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    Swal.fire("Success","The public address has been copied to the clipboard","success");
  }

  redirect(url:string)
  {
    window.location.href = url;
  }

voting_data(data:string)
  {
    if (data === "shareddelegateswebsitegetstatistics")
    {
Swal.fire({
  title: '<b>Statistics</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get statistics about the shared delegate<br><br>Method: GET<br><br>URL: /shareddelegateswebsitegetstatistics<br><br>Result:<br><br>public_address: The main public address of the shared delegate<br><br>total_blocks_found: The total amount of blocks found by the shared delegate<br><br>total_xcash: The total amount of xcash found by the shared delegate<br><br>total_payments: The total amount of payments by the shared delegate<br><br>total_vote_count: The total amount of votes, or xcash since one vote = one xcash, staked towards the shared delegate<br><br>fee: The fee of each block reward set by the shared delegate<br><br>minimum_amount: The minimum payment amount set by the shared delegate<br><br>{"public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","total_blocks_found":"5","total_xcash":"60","total_payments":"5","total_vote_count":"0","fee":"0.000000","minimum_amount":"0"}',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getblocksfound")
    {
Swal.fire({
  title: '<b>Get Blocks Found</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Show all blocks found by the shared delegate<br><br>Method: GET<br><br>URL: /getblocksfound<br><br>Result<br><br>block_height: The block height<br><br>block_hash: The block hash<br><br>block_date_and_time: The timestamp of when the shared delegate found the block<br><br>block_reward: The block reward<br><br>block_count: The average of when the block was excepted to be found compared to when it was found<br><br>[{"block_height":"5","block_hash":"BLOCK_HASH","block_date_and_time":"10","block_reward":"15","block_count":"10"},{"block_height":"5","block_hash":"BLOCK_HASH","block_date_and_time":"10","block_reward":"15","block_count":"10"}]',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getpublicaddressinformation")
    {
Swal.fire({
  title: '<b>Get Public Address Information</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get statistics about any delegate that has staked on the shared delegate<br><br>Method: GET<br><br>URL: /getpublicaddressinformation<br><br>Parameters: public_address: The public address of the delegate<br><br>Result:<br><br>public_address: The public address of the delegate<br><br>current_total: The current total that the delegate has that will be paid once the minimum amount is reached<br><br>total: The total amount that has been paid to the delegate<br><br>inactivity_count: The total amount of days where the delegate has not staked towards the shared delegate. If the inactivity_count is 30 and the current_total is 0, the delegate is removed from the database<br><br>{"public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","current_total":"5","total":"10","inactivity_count":"15"}',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getpublicaddresspaymentinformation")
    {
Swal.fire({
  title: '<b>Get Public Address Payment Information</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get payment information about any delegate that has staked on the shared delegate<br><br>Method: GET<br><br>URL: /getpublicaddresspaymentinformation<br><br>Parameters: public_address: The public address of the delegate<br><br>Result:<br><br>public_address: The public address of the delegate<br><br>date_and_time: The timestamp of the payment<br><br>total: The total amount of the payment<br><br>total_payments: The total amount of payments by the shared delegate<br><br>tx_hash: The transaction hash of the payment<br><br>tx_key: The transaction key of the payment<br><br>[{"public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","date_and_time":"5","total":"10","tx_hash":"TX_HASH","tx_key":"TX_KEY"},{"public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","date_and_time":"5","total":"10","tx_hash":"TX_HASH","tx_key":"TX_KEY"}]',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getdelegatesvoterslist")
    {
Swal.fire({
  title: '<b>Get Delegates Voters List</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get a list of all delegates staking towards the shared delegate<br><br>Method: GET<br><br>URL: /getdelegatesvoterslist<br><br>Parameters: parameter1: The public address of the shared delegate<br><br>Result:<br><br>public_address_created_reserve_proof: The public address of the delegate that is staking towards the shared delegate<br><br>public_address_voted_for: The public address of the shared delegate<br><br>total: The total amount of the reserve proof<br><br>reserve_proof: The reserve proof created by the delegate<br><br>[{"public_address_created_reserve_proof":"XCA1VSDHKCc4Qhvqb3fquebSYxfMeyGteQeAYtDSpaTcgquBY1bkKWtQ42tZG2w7Ak7GyqnaiTgWL4bMHE9Lwd2A3g2Recxz7B","public_address_voted_for":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","total":"10","reserve_proof":"RESERVE_PROOF"},{"public_address_created_reserve_proof":"XCA1VSDHKCc4Qhvqb3fquebSYxfMeyGteQeAYtDSpaTcgquBY1bkKWtQ42tZG2w7Ak7GyqnaiTgWL4bMHE9Lwd2A3g2Recxz7B","public_address_voted_for":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","total":"10","reserve_proof":"RESERVE_PROOF"}]',
  showCloseButton: false,
  showCancelButton: false,
})
    }
}

    ngOnInit() {
    this.width = window.innerWidth * 0.9;
    }

}
