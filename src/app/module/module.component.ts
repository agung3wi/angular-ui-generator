import { Component, AfterViewInit } from '@angular/core';
import { IdbService } from '../services/idb.service';
import axios from 'axios'
import FileDownload from 'js-file-download';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})

export class ModuleComponent {

  filter: any = {};
  module_list: any = [];
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor(
    private idb: IdbService,
    private toastr: ToastrService,
    private _clipboardService: ClipboardService

  ) {
    this.init();
  }

  async init() {
    this.module_list = await this.idb.getAll('module');
    this.filter = {
      page: 1,
      limit: 100
    }
  }

  async remove(index) {
    await this.idb.delete('module', index);
    this.module_list = await this.idb.getAll('module');
  }

  async generateAll() {
    let res: any = {};
    res.tables = await this.idb.getAll('table');
    res.modules = await this.idb.getAll('module');
    res.template = await this.idb.getAll('template');
    let request = {
      config: res,
      back_path: localStorage.getItem("back_path"),
      front_path: localStorage.getItem("front_path"),
      mobile_path: localStorage.getItem("mobile_path")
    };

    const headers = {

    }

    axios.post(localStorage.getItem("api_url") + "/generate", request, { headers: headers })
      .then(res => {
        this.toastr.success("Success Generate Of module");
      })
  }

  async download() {
    let res: any = {};
    res.tables = await this.idb.getAll('table');
    res.modules = await this.idb.getAll('module');
    res.template = await this.idb.getAll('template');
    this.dyanmicDownloadByHtmlTag({
      fileName: 'project.json',
      text: JSON.stringify(res, null, 2)
    });
  }

  async copyModule() {
    let res: any = {};
    res.tables = await this.idb.getAll('table');
    res.modules = await this.idb.getAll('module');
    res.template = await this.idb.getAll('template');
    var content = JSON.stringify(res, null, 2);

    this._clipboardService.copyFromContent(content);
    this.toastr.success("Success Copy Of module");
  }

  async lock(item) {
    if (!item.lock) {
      item.lock = true;
    } else {
      item.lock = false;
    }

    await this.idb.set('module', item, item.module_name);

  }



  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
