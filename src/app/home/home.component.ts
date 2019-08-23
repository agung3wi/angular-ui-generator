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

  constructor(
    private idb:IdbService
  ) {
    
  }
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }

}
