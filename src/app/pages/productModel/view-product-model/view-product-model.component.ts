import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UpdatepopupComponent } from 'src/app/updatepopup/updatepopup.component';

@Component({
  selector: 'app-view-product-model',
  templateUrl: './view-product-model.component.html',
  styleUrls: ['./view-product-model.component.css']
})
export class ViewProductModelComponent {

  itemsPerPage: string|number|undefined;
  currentPage: string|number|undefined;
  totalItems: any;
  p: number = 1;
  total: number = 0;
  
    constructor(
      private builder: FormBuilder, 
      private service: AuthService, 
      private dialog: MatDialog, 
      private _api: ApiService) {
      this.LoadUser();
    }
    userlist: any;
    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit(): void {
  
    }
    
    LoadUser() {
      return this._api.getTypeRequest('product-category').subscribe((res: any) => {
        this.userlist = res.data;
      });
    }
    pageChangeEvent(event: number){
      this.p = event;
      this.LoadUser();
  }
    displayedColumns: string[] = ['name', 'modelId', 'description', 'action'];
  
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
        this.LoadUser();
      });
    }
  
  
  
  }
