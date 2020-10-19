import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpdataService{
  constructor(private httpClient: HttpClient) {}

  // specify the delegate node data source (empty = localhost) e.g.: http://node.xcash.rocks
  node_server_port:string = ""; //
  // specify the delegates explorer data source
  explorer_server_port:string = "http://delegates.xcash.foundation";

  POOL_GET_STATISTICS:string = this.node_server_port + "/shareddelegateswebsitegetstatistics";
  POOL_GET_BLOCKS_FOUND:string = this.node_server_port + "/getblocksfound";
  POOL_GET_PUBLIC_ADDRESS_INFORMATION:string = this.node_server_port + "/getpublicaddressinformation";
  POOL_GET_DELEGATES_VOTERS_LIST:string = this.node_server_port + "/getdelegatesvoterslist";
  POOL_GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION:string = this.node_server_port + "/getpublicaddresspaymentinformation";

  EXPLORER_GET_DELEGATES_STATISTICS:string =  this.explorer_server_port + "/getdelegatesstatistics";
  EXPLORER_GET_DELEGATE_WEBSITE_STATISTICS:string =  this.explorer_server_port + "/delegateswebsitegetstatistics";

  XCASH_WALLET_DECIMAL_PLACES_AMOUNT:number = 1000000;
  BLOCK_TIME:number = 5;
  Timer:any;

  sleep(milliseconds)
  {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  get_request(url:string)
  {
    return this.httpClient.get(url);
  }

  post_request(url:string, data:string)
  {
    const headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
    return this.httpClient.post(url,data, {headers: headers});
  }

  post_request_json(item: any[])
  {
    const headers = new HttpHeaders ({'Content-Type':'application/json'});
    return this.httpClient.post('url',item, {headers: headers});
  }

}
