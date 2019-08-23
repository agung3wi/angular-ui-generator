import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IdbService } from '../services/idb.service';

@Component({
    templateUrl: './lookup-table-column.component.html'
})

export class LookupTableColumn {

    input:any = {};
    public onClose: Subject<boolean>;
    table_list:any = [];
    column_list:any = [];
    constructor(
        public bsModalRef: BsModalRef,
        public idb:IdbService
    ) {
        this.init()
    }

    async init() {
        this.table_list = await this.idb.getAll('table');
    }
   
    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    async changeTable() {
        const table = await this.idb.find('table', this.input.table_name);
        this.column_list = table.columns;
    }

    save() {
        this.onClose.next(this.input);
        this.bsModalRef.hide();
    }


}
