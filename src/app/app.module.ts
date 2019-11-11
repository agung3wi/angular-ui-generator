
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
 
import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { MonacoEditorModule } from 'ngx-monaco-editor';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './table/add-table.component';
import { EditTableComponent } from './table/edit-table.component';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { TabsModule as MkTabsModule, BoxModule, DropdownModule } from 'angular-admin-lte';

// for ngx bootstrap
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LookupColumn } from './table/lookup-column.component';
import { ModuleComponent } from './module/module.component';
import { AddModuleComponent } from './module/add-module.component';
import { EditModuleComponent } from './module/edit-module.component';
import { LookupTableColumn } from './table/lookup-table-column.component';
import { TemplateComponent } from './template/template.component';
import { AddTemplateComponent } from './template/add-template.component';
import { EditTemplateComponent } from './template/edit-template.component';

@NgModule({
  imports: [
    TagInputModule, 
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
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
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    ClipboardModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    AddTableComponent,
    EditTableComponent,
    LookupColumn,
    LookupTableColumn,
    ModuleComponent,
    AddModuleComponent,
    EditModuleComponent,
    TemplateComponent,
    AddTemplateComponent,
    EditTemplateComponent
  ],
  entryComponents: [
    LookupColumn,
    LookupTableColumn
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
