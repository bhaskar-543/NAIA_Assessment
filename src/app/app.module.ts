import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

//-----------for Ant upload Image ----------------//

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

// import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

// import { NzDemoUploadBasicComponent } from './app.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
        timeOut:3000,positionClass:'toast-top-right',
        // progressBar:true,progressAnimation:'increasing'
    }),
    BrowserAnimationsModule,
    NzUploadModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule,
    FormsModule,ReactiveFormsModule,AgGridModule.withComponents([])
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
