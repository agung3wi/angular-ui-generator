import { Component, AfterViewInit } from '@angular/core';
import * as Prism from 'prismjs';
import { IdbService } from '../../app/services/idb.service';
import Axios from 'axios';
import FileDownload from 'js-file-download';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  input:any = {}
  constructor(
    private idb:IdbService
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

}
