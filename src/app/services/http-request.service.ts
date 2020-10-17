import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpdataService{
constructor(private httpClient: HttpClient) {}

GET_STATISTICS:string = "/shareddelegateswebsitegetstatistics";
GET_BLOCKS_FOUND:string = "/getblocksfound";
GET_PUBLIC_ADDRESS_INFORMATION:string = "/getpublicaddressinformation";
GET_DELEGATES_VOTERS_LIST:string = "/getdelegatesvoterslist";
GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION:string = "/getpublicaddresspaymentinformation";
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
