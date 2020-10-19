
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { voterstatisticsdata } from '../interfaces';

import {MatPaginator, MatSort} from '@angular/material';

 /** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<voterstatisticsdata[]> = new BehaviorSubject<voterstatisticsdata[]>([]);
  get data(): voterstatisticsdata[] { return this.dataChange.value; }

  constructor() {

  }

  /** Adds a new user to the database. */
  addUser(id:string,date_and_time:string,tx_hash:string,tx_key:string,total:string) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(id,date_and_time,tx_hash,tx_key,total));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(id:string,date_and_time:string,tx_hash:string,tx_key:string,total:string) {
    return {
      id: id,
      date_and_time: date_and_time,
      tx_hash: tx_hash,
      tx_key: tx_key,
      total: total
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: voterstatisticsdata[] = [];
  renderedData: voterstatisticsdata[] = [];

  constructor(private _exampleDatabase: ExampleDatabase,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<voterstatisticsdata[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {

      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: voterstatisticsdata) => {
        let searchStr = (item.date_and_time + item.tx_hash + item.tx_key ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;

    }));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: voterstatisticsdata[]): voterstatisticsdata[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';


      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'date_and_time': [propertyA, propertyB] = [a.date_and_time, b.date_and_time]; break;
        case 'tx_hash': [propertyA, propertyB] = [a.tx_hash, b.tx_hash]; break;
        case 'tx_key': [propertyA, propertyB] = [a.tx_key, b.tx_key]; break;
        case 'total': [propertyA, propertyB] = [a.total, b.total]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
