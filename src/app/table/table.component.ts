import { Component, AfterViewInit } from '@angular/core';
import { IdbService } from '../services/idb.service';

@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  filter: any = {};
  table_list: any = [];
  constructor(
    private idb: IdbService
  ) {
    this.init();
  }

  async init() {
    this.table_list = await this.idb.getAll('table');
    this.filter = {
      page: 1,
      limit: 100
    }
  }

  async remove(index) {
    await this.idb.delete('table', index);
    this.table_list = await this.idb.getAll('table');
  }
}
