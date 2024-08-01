import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopoverModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';
import { MESSAGES } from '../../shared/constants/message';
import { PopOverDirective } from '../../popover.directive';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;
  priority: any[];
  popoverVisible = false;
  targetElement: any;
  id = '';
  animation: object = {
    show: { type: 'pop', from: { scale: 0 }, to: { scale: 1 }, duration: 300 },
    hide: { type: 'fade', from: 1, to: 0, duration: 300, delay: 1000 } // delay in milliseconds
  };

 
 

  onCellPrepared(e: any) {
    if (e.rowType === 'header' && e.column) {
      const column = e.column;
      e.cellElement.addEventListener('mouseenter', () => {
        this.showPopover(e.cellElement, column.caption || column.dataField);
      });
      e.cellElement.addEventListener('mouseleave', () => {
        this.hidePopover();
      });
    }
  }

  
  showPopover(targetElement: any, id: string) {
    this.id = id;
    this.targetElement = targetElement;
    this.popoverVisible = true;
    if (MESSAGES[this.id as keyof typeof MESSAGES]) {
      this.popoverVisible = true;
    } else {
      this.popoverVisible = false;
    }
  }

  hidePopover() {
    this.popoverVisible = false;
  }

  constructor() {
    this.dataSource = {
      store: {
        version: 2,
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
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
    DxBulletModule,
    DxButtonModule,
    DxTextBoxModule

  ],
  declarations: [ TasksComponent ,PopOverDirective ],
  exports: [ TasksComponent ]
})
export class TasksModule { }