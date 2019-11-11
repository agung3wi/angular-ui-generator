import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './table/add-table.component';
import { AddModuleComponent } from './module/add-module.component';
import { ModuleComponent } from './module/module.component';
import { EditTableComponent } from './table/edit-table.component';
import { EditModuleComponent } from './module/edit-module.component';

import { TemplateComponent } from './template/template.component';
import { EditTemplateComponent } from './template/edit-template.component';
import { AddTemplateComponent } from './template/add-template.component';

const routes: Routes = [
  {
  path: '',
  data: {
      title: 'Get Started'
  },
  children: [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'accordion',
      loadChildren: './+accordion/accordion.module#AccordionModule',
      data: {
        title: 'Accordion'
      }
    }, {
      path: 'alert',
      loadChildren: './+alert/alert.module#AlertModule',
      data: {
        title: 'Alert',
      }
    }, {
      path: 'layout',
      data: {
        title: 'Layout',
      },
      children: [
        {
          path: 'configuration',
          loadChildren: './+layout/configuration/configuration.module#ConfigurationModule',
          data: {
            title: 'Configuration'
          }
        }, {
          path: 'custom',
          loadChildren: './+layout/custom/custom.module#CustomModule',
          data: {
            title: 'Disable Layout'
            // disableLayout: true
          }
        }, {
          path: 'content',
          loadChildren: './+layout/content/content.module#ContentModule',
          data: {
            title: 'Content'
          }
        }, {
          path: 'header',
          loadChildren: './+layout/header/header.module#HeaderModule',
          data: {
            title: 'Header'
          }
        }, {
          path: 'sidebar-left',
          loadChildren: './+layout/sidebar-left/sidebar-left.module#SidebarLeftModule',
          data: {
            title: 'Sidebar Left'
          }
        }, {
          path: 'sidebar-right',
          loadChildren: './+layout/sidebar-right/sidebar-right.module#SidebarRightModule',
          data: {
            title: 'Sidebar Right'
          }
        },
      ]
    }, {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'box',
          loadChildren: './+boxs/box-default/box-default.module#BoxDefaultModule',
          data: {
            title: 'Box'
          }
        }, {
          path: 'info-box',
          loadChildren: './+boxs/box-info/box-info.module#BoxInfoModule',
          data: {
            title: 'Info Box'
          }
        }, {
          path: 'small-box',
          loadChildren: './+boxs/box-small/box-small.module#BoxSmallModule',
          data: {
            title: 'Small Box'
          }
        }
      ]}, {
        path: 'dropdown',
        loadChildren: './+dropdown/dropdown.module#DropdownModule',
        data: {
          title: 'Dropdown',
        }
      }, {
        path: 'table',
        component: TableComponent,
        data: {
          title: 'List Table',
        }
      }, {
        path: 'add-table',
        component: AddTableComponent,
        data: {
          title: 'Add Table',
        }
      }, {
        path: 'edit-table/:id',
        component: EditTableComponent,
        data: {
          title: 'Add Table',
        }
      }, {
        path: 'module',
        component: ModuleComponent,
        data: {
          title: 'List Module',
        }
      }, {
        path: 'add-module',
        component: AddModuleComponent,
        data: {
          title: 'Add Module',
        }
      }, {
        path: 'edit-module/:id',
        component: EditModuleComponent,
        data: {
          title: 'Edit Module',
        }
      }, {
        path: 'template',
        component: TemplateComponent,
        data: {
          title: 'List Template',
        }
      }, {
        path: 'add-template',
        component: AddTemplateComponent,
        data: {
          title: 'Add Template',
        }
      }, {
        path: 'edit-template/:id',
        component: EditTemplateComponent,
        data: {
          title: 'Edit Template',
        }
      }
    ]
  }, {
    path: 'form',
    data: {
      title: 'Form',
    },
    children: [
      {
        path: 'input-text',
        loadChildren: './+form/input-text/input-text.module#InputTextModule',
        data: {
          title: 'Input Text',
        }
      }
    ]
  }, {
    path: 'login',
    loadChildren: './+login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  }, {
    path: 'register',
    loadChildren: './+register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
