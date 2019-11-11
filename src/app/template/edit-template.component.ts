import { Component, AfterViewInit, Input } from '@angular/core';
import { IdbService } from '../services/idb.service';
import { Router, ActivatedRoute } from '@angular/router';
import constant from '../constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './input-template.component.html',
})
export class EditTemplateComponent {

  item:any= 'bigint';
  input:any = {}
  constant:any = {};
  fields:any = [];
  bsModalRef: BsModalRef;
  table_list: any = [];
  mode:string = 'edit';
  editorOptions = {theme: 'vs-dark', language: 'html'};

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
    const template_list = await this.idb.getAll('template');
    this.input = template_list[index];
  }


  async save() {
    let input = this.input;
    await this.idb.set('template', input, input.template_name);
    this.router.navigate(['/template']);

  }
}
