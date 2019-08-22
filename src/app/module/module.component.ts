import { Component, AfterViewInit } from '@angular/core';
import { IdbService } from '../services/idb.service';

@Component({
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})

export class ModuleComponent {

  filter:any = {};
  module_list:any = [];
  constructor(
    private idb:IdbService
  ) {
    this.init();
  }

    async init() {
      this.module_list = await this.idb.getAll('module');
      this.filter = {
        page:1,
        limit:20
      }
    } 

    async remove(index) {
      await this.idb.delete('module', index);
      this.module_list = await this.idb.getAll('module');
    }
}
