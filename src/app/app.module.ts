import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/material.module';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { CustomerComponent } from './customer/customer.component';
import { HeaderComponent } from './include/header/header.component';
import { SidebarComponent } from './include/sidebar/sidebar.component';
import { AddDeviceComponent } from './pages/device/add-device/add-device.component';
import { AddModelIdComponent } from './pages/productModel/add-model-id/add-model-id.component';
import { AddSensorComponent } from './pages/sensors/add-sensor/add-sensor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewProductModelComponent } from './pages/productModel/view-product-model/view-product-model.component';
import { ViewProductComponent } from './pages/device/view-product/view-product.component';
import { EditProductModelComponent } from './pages/productModel/edit-product-model/edit-product-model.component';
import { EditDeciceComponent } from './pages/device/edit-decice/edit-decice.component';
import { EditUnitComponent } from './pages/unit/edit-unit/edit-unit.component';
import { ViewUnitComponent } from './pages/unit/view-unit/view-unit.component';
import { AddUnitComponent } from './pages/unit/add-unit/add-unit.component';
import { DeleteUnitComponent } from './pages/unit/delete-unit/delete-unit.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ViewByIdProductModelComponent } from './pages/productModel/view-by-id-product-model/view-by-id-product-model.component';
import { ViewByIdDeviceComponent } from './pages/device/view-by-id-device/view-by-id-device.component';
import { DeleteDeviceComponent } from './pages/device/delete-device/delete-device.component';
import { ViewByIdUnitComponent } from './pages/unit/view-by-id-unit/view-by-id-unit.component';
import { ViewSensorComponent } from './pages/sensors/view-sensor/view-sensor.component';
import { EditSensorComponent } from './pages/sensors/edit-sensor/edit-sensor.component';
import { DeleteSensorComponent } from './pages/sensors/delete-sensor/delete-sensor.component';
import { ViewByIdSensorComponent } from './pages/sensors/view-by-id-sensor/view-by-id-sensor.component';
import { RawDataComponent } from './pages/raw-data/raw-data.component';
import {DataTablesModule} from 'angular-datatables';
import { IgxPaginatorModule } from 'igniteui-angular';
import { DeviceRawDataComponent } from './pages/device-raw-data/device-raw-data.component';
import { DeleteRoleComponent } from './pages/role/delete-role/delete-role.component';
import { AddRoleComponent } from './pages/role/add-role/add-role.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';
import { RoleComponent } from './pages/role/role/role.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DatePipe } from '@angular/common';
import { DataComponent } from './pages/data/data/data.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { 
	IgxAvatarModule,
	IgxBadgeModule,
	IgxButtonModule,
	IgxGridModule,
	IgxIconModule,
	IgxInputGroupModule,
	IgxProgressBarModule,
	IgxRippleModule,
	IgxSwitchModule
 } from "igniteui-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


//import { NgxMatDatepickerModule } from '../../node_modules/ngx-daterangepicker-material/daterangepicker.component';



@NgModule({
  declarations: [
    AppComponent,
    
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UpdatepopupComponent,
    CustomerComponent,
    HeaderComponent,
    SidebarComponent,
    AddDeviceComponent,
    AddModelIdComponent,
    AddSensorComponent,
    DashboardComponent,
    ViewProductModelComponent,
    ViewProductComponent,
    EditProductModelComponent,
    EditDeciceComponent,
    EditUnitComponent,
    ViewUnitComponent,
    AddUnitComponent,
    DeleteUnitComponent,
    ViewUserComponent,
    EditUserComponent,
    ViewByIdProductModelComponent,
    ViewByIdDeviceComponent,
    DeleteDeviceComponent,
    ViewByIdUnitComponent,
    ViewSensorComponent,
    EditSensorComponent,
    DeleteSensorComponent,
    ViewByIdSensorComponent,
    RawDataComponent,
    DeviceRawDataComponent,
    DeleteRoleComponent,
    AddRoleComponent,
    EditRoleComponent,
    RoleComponent,
    DataComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    IgxPaginatorModule,
    NgbModule,
    //NgxMatDatepickerModule,
    NgxUiLoaderModule,
  ],
  providers: [DatePipe],
  //providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
