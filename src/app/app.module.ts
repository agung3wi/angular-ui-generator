import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './table/add-table.component';


import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { TabsModule as MkTabsModule, BoxModule, DropdownModule } from 'angular-admin-lte';

// for ngx bootstrap
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LookupColumn } from './table/lookup-column.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    MkTabsModule,
    BoxModule,
    DropdownModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    AddTableComponent,
    LookupColumn
  ],
  entryComponents: [
    LookupColumn
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
