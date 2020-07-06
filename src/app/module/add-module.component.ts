import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import _ from 'lodash';


@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./module.component.css']
})
export class AddModuleComponent {

  item: any = 'bigint';
  input: any = {}
  constant: any = {};
  fields: any = [];
  bsModalRef: BsModalRef;
  table_list: any = [];
  policies: any = [];
  module_list: any = [];
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
    private idb: IdbService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.init();
  }

  async init() {
    this.constant = constant;
    this.input.fields = [];
    this.input.relation_fields = [];
    this.input.filters = [];
    this.table_list = await this.idb.getAll('table');
    this.policies = this.table_list.filter(item => item.policy == true);
    this.module_list = await this.idb.getAll('module');
  }

  addField() {
    this.input.fields.push({
      field_name: '',
      display_name: '',
      custom: true,
      type: 'text',
      unique: false,
      add: false,
      edit: false,
      view: false,
      list: false
    })
  }

  removeField(index) {
    this.input.fields.splice(index, 1);
  }

  removePolicy(index) {
    this.input.policies.splice(index, 1);
  }

  removeFilter(index) {
    this.input.filters.splice(index, 1);
  }

  addPolicy() {
    const policy = {
      table_name: '',
      task_exclude: ''
    }
    this.input.policies.push(policy);
  }

  async save() {
    let input = this.input;
    await this.idb.set('module', input, input.module_name);
    this.router.navigate(['/module']);

  }

  addFilter() {
    const filter = {
      field_name: '',
      type: 'text',
      index: false,
      unique: false
    }
    this.input.filters.push(filter);
  }


  async changeTable() {
    const table = await this.idb.find('table', this.input.table_name);
    this.input.module_name = table.module_name;
    this.input.display_name = _.startCase(this.input.module_name.replace("_", " "))
    const listColumnNext = ["id", "active", "created_at", "updated_at", "created_by", "updated_by", "version", "active"];
    this.input.fields = [];
    this.input.relation_fields = [];
    this.input.filters = [];
    this.input.policies = [];
    for (let item of table.columns) {
      if (listColumnNext.indexOf(item.column_name) > -1) continue;
      const display_name = _.startCase(item.column_name.replace("_", " "));
      let typeField = 'text';
      switch (item.type) {
        case 'text':
          typeField = 'textarea';
          break;
        case 'int':
          typeField = 'dropdown';
          break;
        case 'bigint':
          typeField = 'numeric';
          break;

        default:
          break;
      }
      this.input.fields.push({
        field_name: item.column_name,
        display_name: display_name,
        custom: false,
        type: typeField,
        unique: item.unique,
        valid_add: [{ display: 'required', value: 'required' }],
        valid_edit: [{ display: 'required', value: 'required' }],
        add: true,
        edit: true,
        view: true,
        list: true,
        searchable: true,
        sortable: true,
      })

      if (item.type_relation === 'has_one') {
        const columns_relation = (await this.idb.find('table', item.relation.table_name)).columns;
        this.input.relation_fields.push({
          table_name: item.relation.table_name,
          column_name: item.relation.column_name,
          column_origin_name: item.column_name,
          column_list: columns_relation,
          column_selected_list: []
        })
      }
    }
    this.input.indexes = table.indexes;
  }
}
