import { CommonModule } from '@angular/common';
import {
  NgModule, Component, enableProdMode, ChangeDetectionStrategy,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopoverModule } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { PopoverComponentModule } from '../../shared/components/popover/popover.component';


@Component({
  selector: 'demo-app',
  templateUrl: `pagination-table.component.html`,
  styleUrls: [`pagination-table.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  dataSource = AspNetData.createStore({
    key: 'Id',
    loadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales',
  });
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
