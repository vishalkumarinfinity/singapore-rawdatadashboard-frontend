import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UpdatepopupComponent } from 'src/app/updatepopup/updatepopup.component';

@Component({
  selector: 'app-view-sensor',
  templateUrl: './view-sensor.component.html',
  styleUrls: ['./view-sensor.component.css']
})
export class ViewSensorComponent {

  itemsPerPage: string|number|undefined;
  currentPage: string|number|undefined;
  totalItems: any;
  p: number = 1;
  total: number = 0;
  
    constructor(
      private builder: FormBuilder, 
      private service: AuthService, 
      private dialog: MatDialog, 
      private _api: ApiService,) {
      this.LoadUnit();
    }
    sensorList: any;
    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit(): void {
  
    }
    
    LoadUnit() {
      return this._api.getTypeRequest('sensor').subscribe((res: any) => {
        this.sensorList = res.data;
      });
    }
    pageChangeEvent(event: number){
      this.p = event;
      this.LoadUnit();
  }
    displayedColumns: string[] = ['name', 'kind', 'decimalPlaces','unitId', 'action'];
  
    updateuser(code: any) {
      this.OpenDialog('1000ms', '600ms', code);
    }
  
    OpenDialog(enteranimation: any, exitanimation: any, code: string) {
      const popup = this.dialog.open(UpdatepopupComponent, {
        enterAnimationDuration: enteranimation,
        exitAnimationDuration: exitanimation,
        width: '30%',
        data: {
          usercode: code
        }
      });
      popup.afterClosed().subscribe(res => {
        this.LoadUnit();
      });
    }
  
  
  
  }


