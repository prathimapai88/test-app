import { CommonModule } from '@angular/common';
import {
  NgModule, Component, enableProdMode, ChangeDetectionStrategy,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopoverModule } from 'devextreme-angular';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';
import CustomStore from 'devextreme/data/custom_store';


@Component({
  selector: 'demo-app',
  templateUrl: `pagination-table.component.html`,
  styleUrls: [`pagination-table.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  dataSource = new CustomStore({
    key: 'Id',
    load: (loadOptions) =>{
      const filters: any[] = [];
      if (loadOptions.filter) {
        this.processFilters(loadOptions.filter, filters);
      }

      // Prepare the request payload
      const payload = {
        filters: filters.map((filter) => ({
          data_type: filter[0],
          value: filter[2],
        })),
      };
      return fetch('https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => ({
          data: data.items,
          totalCount: data.totalCount,
        }));
    }
  
  });

  processFilters(filterArray: any[], filters: any[]) {
    if (Array.isArray(filterArray[0])) {
      // Handle complex filter with logical operators
      filterArray.forEach((filter) => this.processFilters(filter, filters));
    } else if (filterArray.length === 3) {
      // Add simple filter
      filters.push(filterArray);
    }
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
  declarations: [ PaginationComponent  ],
  exports: [ PaginationComponent ]
})
export class TasksModule { }
