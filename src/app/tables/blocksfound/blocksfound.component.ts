import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './blocksfound.component.html',
  styleUrls: ['./blocksfound.component.scss']
})
export class blocksfoundComponent implements OnInit {
	public dashCard = [
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'BLOCKS FOUND', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', number: 0, title: 'AVERAGE', icon: 'cloud' }
    ];
	total_blocks_found:any = 0;
	total_average:any = 0;
	public displayedColumns = ['ID', 'block_height', 'block_hash', 'block_date_and_time', 'block_reward', 'average'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
  	constructor(private httpdataservice: httpdataservice) { }

  	ngOnInit() {
          // get the data
          this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_BLOCKS_FOUND).subscribe(
	  (res) =>
	  {            
            this.exampleDatabase = new ExampleDatabase();
            var data = JSON.parse(JSON.stringify(res));
	    var count = 0;
	    for (count = 0; count < data.length - 1; count++)
	    {
	      this.exampleDatabase.addUser((count + 1).toString(),data[count].block_height.toString(),data[count].block_hash.toString(),(parseInt(data[count].block_date_and_time) * 1000).toString(),(parseInt(data[count].block_reward)).toString(),data[count].block_count.toString());
	    }
	    this.dashCard[0].number = data.length - 1;
            this.dashCard[1].number = (parseInt(data[data.length-1].total_blocks) / parseInt(data[data.length-1].total_blocks_found)) | 0;	
  	    this.dataSource = new ExampleDataSource(this.exampleDatabase);
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
    }
}
