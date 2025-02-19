import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLoadIndicatorModule, DxNumberBoxModule, DxPopoverModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';


@Component({
  templateUrl: 'reference-table.component.html'
})

export class ReferenceComponent {
  dataSource = [
    { startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 10), capacity: 50 },
    { startDate: new Date(2024, 2, 5), endDate: new Date(2024, 2, 15), capacity: 75 },
    { startDate: new Date(2024, 3, 10), endDate: new Date(2024, 3, 20), capacity: 100 }
  ];

  constructor() {
   
  }
}


@NgModule({
  imports: [
    DxDataGridModule,
    DxDateBoxModule,
    DxNumberBoxModule

  ],
  declarations: [ ReferenceComponent  ],
  exports: [ ReferenceComponent ]
})
export class TasksModule { }