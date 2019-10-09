import { Component, AfterViewInit } from '@angular/core';
import { IdbService } from '../services/idb.service';
import Axios from 'axios';
import FileDownload from 'js-file-download';

@Component({
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})

export class ModuleComponent {

  filter:any = {};
  module_list:any = [];
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  constructor(
    private idb:IdbService
  ) {
    this.init();
  }

    async init() {
      this.module_list = await this.idb.getAll('module');
      this.filter = {
        page:1,
        limit:20
      }
    } 

    async remove(index) {
      await this.idb.delete('module', index);
      this.module_list = await this.idb.getAll('module');
    }
   
    async generateAll() {
        let res:any = {};
        res.tables = await this.idb.getAll('table');
        res.modules = await this.idb.getAll('module');
        this.dyanmicDownloadByHtmlTag({
          fileName: 'project.json',
          text: JSON.stringify(res, null, 2)
        });
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
