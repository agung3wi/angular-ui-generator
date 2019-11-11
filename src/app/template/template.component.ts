import { Component, AfterViewInit } from '@angular/core';
import { IdbService } from '../services/idb.service';
import Axios from 'axios';
import FileDownload from 'js-file-download';

@Component({
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent {

  filter:any = {};
  template_list:any = [];
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
      this.template_list = await this.idb.getAll('template');
      this.filter = {
        page:1,
        limit:20
      }
    } 

    async remove(index) {
      await this.idb.delete('template', index);
      this.template_list = await this.idb.getAll('template');
    }
   
    async generateAll() {
        let res:any = {};
        res.tables = await this.idb.getAll('table');
        res.templates = await this.idb.getAll('template');
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
