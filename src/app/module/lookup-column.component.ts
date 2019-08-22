import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './lookup-column.component.html'
})

export class LookupColumn {

    columns:any = []
    selectedItems:any = [];
    dropdownSettings = {
        singleSelection: false,
        idField: 'column_name',
        textField: 'column_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
    public onClose: Subject<boolean>;

    constructor(
        public bsModalRef: BsModalRef
    ) {
        
    }
   
    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    save() {
        this.onClose.next(this.selectedItems);
        this.bsModalRef.hide();
    }


}
