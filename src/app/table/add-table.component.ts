import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LookupColumn } from './lookup-column.component';
import { LookupTableColumn } from './lookup-table-column.component';

@Component({
  templateUrl: './input-table.component.html',
})
export class AddTableComponent {

  item: any = 'bigint';
  input: any = {}
  constant: any = {};
  columns: any = [];
  bsModalRef: BsModalRef;
  constructor(
    private idb: IdbService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.init();
  }

  init() {
    this.constant = constant;
    this.input.primary_key = ['id'];
    this.input.columns = [{
      column_name: 'id',
      type: 'bigint',
      size: '',
      default: '',
      ai: true,
      primary: true,
      index: false,
      unique: false
    }];
    this.input.indexes = [];
  }

  addColumn() {
    const column = {
      column_name: '',
      type: 'bigint',
      size: '',
      default: '',
      ai: false,
      primary: false,
      index: false,
      unique: false
    }
    this.columns.push(column)
    this.input.columns.push(column);
  }

  removeColumn(index) {
    this.input.columns.splice(index, 1);
  }

  async save() {
    let input = this.input;
    await this.idb.set('table', input, input.table_name);
    this.router.navigate(['/table']);

  }

  setPrimaryKey() {
    const initialState = {
      columns: this.input.columns,
      selectedItems: this.input.primary_key
    };
    this.bsModalRef = this.modalService.show(LookupColumn, { initialState });
    this.bsModalRef.content.closeBtnName = 'Tutup';
    this.bsModalRef.content.onClose.subscribe(result => {
      this.input.primary_key = result;
    });
  }

  setRelation(i) {
    const initialState = {};
    this.bsModalRef = this.modalService.show(LookupTableColumn, { initialState });
    this.bsModalRef.content.closeBtnName = 'Tutup';
    this.bsModalRef.content.onClose.subscribe(result => {
      this.input.columns[i].relation = result;
      this.input.columns[i].type_relation = result.type_relation;
    });
  }

  addIndex() {
    const initialState = {
      columns: this.input.columns
    };
    this.bsModalRef = this.modalService.show(LookupColumn, { initialState });
    this.bsModalRef.content.closeBtnName = 'Tutup';
    this.bsModalRef.content.onClose.subscribe(result => {
      this.input.indexes.push({
        columns: result,
        index_name: "",
        index: true,
        unique: false
      });
    });
  }
}
