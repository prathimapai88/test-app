import { Component, Input } from '@angular/core';

@Component({
  templateUrl: 'profile.component.html',
  selector: 'app-my-table',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  @Input() startDate: string = ''; // Expecting date in string format (ISO or 'yyyy-MM-dd')
  @Input() endDate: string = '';
  isAddRowDisabled: boolean = false; // Flag to disable "Add Row" button
  dataSource: any[] = [];

  ngOnInit() {
    // Initialize the table with the default row
    this.dataSource = [
      { startDate: this.startDate, endDate: this.endDate, capacity: 0 }
    ];
  }

  subunitData: any[] = [
    { id: 1, name: 'subunit1' },
    { id: 2, name: 'subunit2' }
  ];

 

  addNewRow() {
    // Check if the last row has capacity 100
    const lastRow = this.dataSource[this.dataSource.length - 1];

    // If last row has capacity 100, disable adding more rows
    if (lastRow && lastRow.capacity === 100) {
      this.isAddRowDisabled = true;
      return;
    }

    // Add a new row with default values
    this.dataSource = [...this.dataSource, { startDate: '', endDate: '', capacity: 0 }];
    
    // Re-enable the "Add Row" button after adding the new row
    this.isAddRowDisabled = false;
  }

}




