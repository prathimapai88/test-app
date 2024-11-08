import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopoverModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';


@Component({
  templateUrl: 'reference-table.component.html'
})

export class ReferenceComponent {
  dataSource = [
    { name: 'John Doe', status: true },
    { name: 'Jane Smith', status: false },
    { name: 'Alice Johnson', status: true }
  ];

  statusOptions = [
    { value: true, text: 'true' },
    { value: false, text: 'false' }
  ];

  onRowUpdated(e: any) {
    console.log('Row updated:', e);
    // Handle the row update, e.g., send the updated data to a backend
  }

  onRowInserted(e: any) {
    console.log('Row inserted:', e);
    // Handle the new row insertion, e.g., add it to a backend
  }

  onRowRemoved(e: any) {
    console.log('Row removed:', e);
    // Handle row removal, e.g., remove it from a backend
  }



  constructor() {
   
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
  declarations: [ ReferenceComponent  ],
  exports: [ ReferenceComponent ]
})
export class TasksModule { }