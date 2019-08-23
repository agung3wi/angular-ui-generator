import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './input-module.component.html',
})
export class AddModuleComponent {

  item:any= 'bigint';
  input:any = {}
  constant:any = {};
  fields:any = [];
  bsModalRef: BsModalRef;
  table_list: any = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'key',
    textField: 'key',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownSettingsFilter = {
    singleSelection: false,
    idField: 'field_name',
    textField: 'field_name',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private idb:IdbService,
    private router:Router,
    private modalService: BsModalService
  ) {
    this.init();
  }

  async init() {
    this.constant = constant;
    this.input.fields = [];
    this.input.filters = [];
    this.table_list = await this.idb.getAll('table');
  }

  addField() {
    this.input.fields.push({
      field_name : '',
      display_name: '',
      custom: true,
      type: 'text',
      unique: false
    })
  }

  removeColumn(index) {
    this.input.fields.splice(index, 1);
  }

  async save() {
    let input = this.input;
    await this.idb.set('module', input, input.module_name);
    this.router.navigate(['/module']);

  }

  addFilter() {
    const filter = {
      field_name : '',
      type : 'text',
      index : false,
      unique :false
    }
    this.input.filters.push(filter);
  }

  async changeTable() {
    const table = await this.idb.find('table', this.input.table_name);
    this.input.module_name = table.module_name;
    for(let item of table.columns) {
      this.input.fields.push({
        field_name : item.column_name,
        display_name: item.column_name,
        custom: false,
        type: 'text',
        unique: item.unique
      })
    }
    this.input.indexes = table.indexes;
  }
}
