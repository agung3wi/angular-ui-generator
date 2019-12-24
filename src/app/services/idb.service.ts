import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import axios from 'axios'
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  dbName: string = 'generator';
  constructor(
    private toastr: ToastrService,
    private _clipboardService: ClipboardService
  ) {
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }



  async set(table, value, key) {


    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    tx.store.put(value, key);
    await tx.done;

  }

  async delete(table, key) {

    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    tx.store.delete(key);
    await tx.done;
  }

  async getAll(table) {
    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    const list = tx.store.getAll();
    await tx.done;
    return list;
  }

  async find(table, key) {

    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const row = db.get('table', key);
    return row;
  }

  async generateAll() {
    let res: any = {};
    res.tables = await this.getAll('table');
    res.modules = await this.getAll('module');
    res.template = await this.getAll('template');
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
    res.tables = await this.getAll('table');
    res.modules = await this.getAll('module');
    res.template = await this.getAll('template');

    let request = {
      config: res,
      back_path: localStorage.getItem("back_path"),
      front_path: localStorage.getItem("front_path"),
      mobile_path: localStorage.getItem("mobile_path")
    };

    this.dyanmicDownloadByHtmlTag({
      fileName: 'project.json',
      text: JSON.stringify(request, null, 2)
    });
  }

  async copyModule() {
    let res: any = {};
    res.tables = await this.getAll('table');
    res.modules = await this.getAll('module');
    res.template = await this.getAll('template');
    let request = {
      config: res,
      back_path: localStorage.getItem("back_path"),
      front_path: localStorage.getItem("front_path"),
      mobile_path: localStorage.getItem("mobile_path")
    };
    var content = JSON.stringify(request, null, 2);

    this._clipboardService.copyFromContent(content);
    this.toastr.success("Success Copy Of module");
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
