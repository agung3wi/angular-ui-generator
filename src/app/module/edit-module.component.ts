import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router, ActivatedRoute } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './input-module.component.html',
})
export class EditModuleComponent {

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
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.init();
  }

  async init() {
    this.constant = constant;
    this.input.fields = [];
    this.input.filters = [];
    this.table_list = await this.idb.getAll('table');

    let index = this.route.snapshot.params.id;
    const module_list = await this.idb.getAll('module');
    this.input = module_list[index];
  }

  addField() {
    this.input.fields.push({
      field_name : '',
      display_name: '',
      custom: true,
      type: 'text',
      unique: false,
      add: false,
      edit:false,
      view:false,
      list:false
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
        unique: item.unique,
        valid_add: [],
        valid_edit: [],
        add: false,
        edit:false,
        view:false,
        list:false
      })
    }
    this.input.indexes = table.indexes;
  }
}
