import { Component, AfterViewInit } from '@angular/core';
import * as Prism from 'prismjs';
import { IdbService } from '../../app/services/idb.service';

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
    this.doDatabaseStuff();
    Prism.highlightAll();
  }

  async doDatabaseStuff() {
    const tt = await this.idb.getAll('table');
    console.log(tt);  
  }


}
