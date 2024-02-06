import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddDeviceComponent } from './pages/device/add-device/add-device.component';
import { AddModelIdComponent } from './pages/productModel/add-model-id/add-model-id.component';
import { AddSensorComponent } from './pages/sensors/add-sensor/add-sensor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditDeciceComponent } from './pages/device/edit-decice/edit-decice.component';
import { EditProductModelComponent } from './pages/productModel/edit-product-model/edit-product-model.component';
import { ViewProductModelComponent } from './pages/productModel/view-product-model/view-product-model.component';
import { ViewProductComponent } from './pages/device/view-product/view-product.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EditUnitComponent } from './pages/unit/edit-unit/edit-unit.component';
import { ViewUnitComponent } from './pages/unit/view-unit/view-unit.component';
import { AddUnitComponent } from './pages/unit/add-unit/add-unit.component';
import { DeleteUnitComponent } from './pages/unit/delete-unit/delete-unit.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { ViewByIdProductModelComponent } from './pages/productModel/view-by-id-product-model/view-by-id-product-model.component';
import { DeleteProductModelComponent } from './pages/productModel/delete-product-model/delete-product-model.component';
import { DeleteDeviceComponent } from './pages/device/delete-device/delete-device.component';
import { ViewByIdDeviceComponent } from './pages/device/view-by-id-device/view-by-id-device.component';
import { ViewByIdUnitComponent } from './pages/unit/view-by-id-unit/view-by-id-unit.component';
import { ViewSensorComponent } from './pages/sensors/view-sensor/view-sensor.component';
import { ViewByIdSensorComponent } from './pages/sensors/view-by-id-sensor/view-by-id-sensor.component';
import { EditSensorComponent } from './pages/sensors/edit-sensor/edit-sensor.component';
import { DeleteSensorComponent } from './pages/sensors/delete-sensor/delete-sensor.component';
import { DeviceRawDataComponent } from './pages/device-raw-data/device-raw-data.component';
import { AddRoleComponent } from './pages/role/add-role/add-role.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';
import { DeleteRoleComponent } from './pages/role/delete-role/delete-role.component';
import { RoleComponent } from './pages/role/role/role.component';
import { DataComponent } from './pages/data/data/data.component';

const routes: Routes = [
 {component:LoginComponent,path:'login'},
 {component:RegisterComponent,path:'register'},
 {component:HomeComponent,path:'',canActivate:[AuthGuard]},
 {component:UserComponent,path:'user',canActivate:[AuthGuard]},
 {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
 {component: AddDeviceComponent,path: 'addDevice',  canActivate: [AuthGuard]},
 {component: AddModelIdComponent,path: 'addModelId',  canActivate: [AuthGuard]},
 {component: AddSensorComponent,path: 'addSensor',  canActivate: [AuthGuard]},
 {component: DashboardComponent,path: 'dashboard',  canActivate: [AuthGuard]},
 {component: ViewProductModelComponent,path: 'viewModelId',  canActivate: [AuthGuard]},
 {component: ViewProductComponent,path: 'viewDevice',  canActivate: [AuthGuard]},
 {component: EditProductModelComponent,path: 'editModelId/:id',  canActivate: [AuthGuard]},
 {component: EditDeciceComponent,path: 'editDevice/:id',  canActivate: [AuthGuard]},
 {component: EditUnitComponent,path: 'editUnit/:id',  canActivate: [AuthGuard]},
 {component: ViewUnitComponent,path: 'viewUnit',  canActivate: [AuthGuard]},
 {component: AddUnitComponent,path: 'addUnit',  canActivate: [AuthGuard]},
 {component: DeleteUnitComponent,path: 'deleteUnit/:id',  canActivate: [AuthGuard]},
 {component: ViewUserComponent,path: 'viewUser/:id',  canActivate: [AuthGuard]},
 {component: ViewByIdProductModelComponent,path: 'modelIdDetail/:id',  canActivate: [AuthGuard]},
 {component: DeleteProductModelComponent,path: 'deleteModelId/:id',  canActivate: [AuthGuard]},
 {component: DeleteDeviceComponent,path: 'deleteDevice/:id',  canActivate: [AuthGuard]},
 {component: ViewByIdDeviceComponent,path: 'viewDetailDevice/:id',  canActivate: [AuthGuard]},
 {component: ViewByIdUnitComponent,path: 'viewDetailUnit/:id',  canActivate: [AuthGuard]},
 {component: ViewSensorComponent,path: 'viewSensor',  canActivate: [AuthGuard]},
 {component: ViewByIdSensorComponent,path: 'viewDetailSensor/:id',  canActivate: [AuthGuard]},
 {component: EditSensorComponent,path: 'editSensor/:id',  canActivate: [AuthGuard]},
 {component: DeleteSensorComponent,path: 'deleteSensor/:id',  canActivate: [AuthGuard]},
 
 {component: DeviceRawDataComponent,path: 'deviceRawData',  canActivate: [AuthGuard]},
 {component: RoleComponent,path: 'role',  canActivate: [AuthGuard]},
 {component: AddRoleComponent,path: 'addRole',  canActivate: [AuthGuard]},
 {component: EditRoleComponent,path: 'editRole/:id',  canActivate: [AuthGuard]},
 {component: DeleteRoleComponent,path: 'deleteRole/:id',  canActivate: [AuthGuard]},
 {component: DataComponent,path: 'data',  canActivate: [AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
