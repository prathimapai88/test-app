import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: (loadOptions: any) => {
          let filters = this.customizeFilter(loadOptions.filter);
          console.log('Modified Filters:', filters);
          
          return fetch('https://your-api-endpoint', {
            method: 'POST',
            body: JSON.stringify({ filter: filters }),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => response.json())
            .catch(() => []);
        }
      })
    });
  }

  customizeFilter(filter: any): any {
    if (!filter) return filter;

    let modifiedFilters = [];
    
    filter.forEach((condition: any) => {
      if (typeof condition === 'object' && !Array.isArray(condition)) {
        Object.keys(condition).forEach(column => {
          let values = condition[column].split(','); // Split values by comma
          if (values.length > 1) {
            modifiedFilters.push([column, 'in', values]); // Apply 'in' condition
          } else {
            modifiedFilters.push([column, '=', values[0]]); // Single value filter
          }
        });
      } else {
        modifiedFilters.push(condition);
      }
    });

    return modifiedFilters.length ? modifiedFilters : filter;
  }
}
