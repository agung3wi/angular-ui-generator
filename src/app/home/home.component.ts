import { Component, AfterViewInit, TemplateRef } from '@angular/core';
import * as Prism from 'prismjs';
import { IdbService } from '../../app/services/idb.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Axios from 'axios';
import FileDownload from 'js-file-download';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  modalRef: BsModalRef;
  loadedFile: any;
  fileTmp: any = null;
  fileContent: any = {};
  input: any = {}
  constructor(
    private idb: IdbService,
    private modalService: BsModalService
  ) {

  }
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.input.back_path = localStorage.getItem("back_path");
    this.input.front_path = localStorage.getItem("front_path");
    this.input.mobile_path = localStorage.getItem("mobile_path");
    this.input.api_url = localStorage.getItem("api_url");
  }

  save() {
    let input = this.input;
    localStorage.setItem("front_path", input.front_path);
    localStorage.setItem("back_path", input.back_path);
    localStorage.setItem("mobile_path", input.mobile_path);
    localStorage.setItem("api_url", input.api_url);
    alert('Success')
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModal() {
    this.modalRef.hide();
  }

  uploadFiles(event) {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);

  }


  loadConfig() {
    const fileContent = JSON.parse(this.fileContent);
    try {
      fileContent.tables.map(async (item) => {
        await this.idb.set('table', item, item.table_name);
      });
      fileContent.modules.map(async (item) => {
        await this.idb.set('module', item, item.module_name);
      });

      fileContent.template.map(async (item) => {
        await this.idb.set('template', item, item.template_name);
      });
    } catch (err) {

    }
  }

}
