import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import _ from 'lodash';


@Component({
  templateUrl: './input-template.component.html',
})
export class AddTemplateComponent {

  item:any= 'bigint';
  input:any = {}
  constant:any = constant;
  fields:any = [];
  bsModalRef: BsModalRef;
  editorOptions = {theme: 'vs-dark', language: 'html'};
  
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
  }

  removeColumn(index) {
    this.input.fields.splice(index, 1);
  }

  async save() {
    let input = this.input;
    await this.idb.set('template', input, input.template_name);
    this.router.navigate(['/template']);

  }
}
