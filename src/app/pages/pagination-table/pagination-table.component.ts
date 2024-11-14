import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopoverModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';


@Component({
  templateUrl: 'pagination-table.component.html'
})

export class paginationComponent {
  dataSource: any;
  searchQuery = '';                // Holds the current search query
  searchSubject = new Subject<string>(); // Observable to debounce search input

  statusOptions = [
    { value: true, text: 'true' },
    { value: false, text: 'false' }
  ];
  constructor(private http: HttpClient) {}


  ngOnInit() {
    // Set up debounce for the search input
    this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      this.searchQuery = query;    // Update the search query
      this.dataSource.reload();    // Reload the grid data with the new search query
    });

    // Configure CustomStore to load data with search query
    this.dataSource = new CustomStore({
      load: (loadOptions: any) => {
        const page = (loadOptions.skip / loadOptions.take) + 1;
        const pageSize = loadOptions.take || 10;

        // JSONPlaceholder API URL with pagination and search parameters
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const params = {
          _page: String(page),
          _limit: String(pageSize),
          q: this.searchQuery       // Pass the search query to the API
        };

        return this.http.get(url, { params, observe: 'response' }).toPromise()
          .then((response: any) => ({
            data: response.body,
            totalCount: response.headers.get('x-total-count')
          }))
          .catch(() => {
            throw 'Data loading error';
          });
      }
    });
  }

  // Method to handle search input changes
  onSearch(query: string) {
    this.searchSubject.next(query); // Emit the new search query
  }
   
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopoverModule,
    DxDataGridModule,
    PopoverComponentModule,

  ],
  declarations: [ paginationComponent  ],
  exports: [ paginationComponent ]
})
export class TasksModule { }