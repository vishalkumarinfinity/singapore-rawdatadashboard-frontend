import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UpdatepopupComponent } from 'src/app/updatepopup/updatepopup.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent {

  itemsPerPage: string|number|undefined;
  currentPage: string|number|undefined;
  totalItems: any;
  p: number = 1;
  total: number = 0;
  baseUrl = 'http://127.0.0.1:5555/';
  
    constructor(
      private builder: FormBuilder, 
      private service: AuthService, 
      private dialog: MatDialog, 
      private _api: ApiService,private router: Router,
      private toastr: ToastrService, private route: ActivatedRoute,private httpClient: HttpClient) {
      this.LoadUnit();
    }
    unitList: any;
    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit(): void {
  
    }
    
    LoadUnit() {
      return this._api.getTypeRequest('unit').subscribe((res: any) => {
        this.unitList = res.data;
      });
    }
    pageChangeEvent(event: number){
      this.p = event;
      this.LoadUnit();
  }
    displayedColumns: string[] = ['name', 'description', 'unit_symbol', 'action'];
  
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

    deleteItemById(id: any) {

      return this.httpClient.delete.bind(`${this.baseUrl}/${id.id}`);
      
      // this._api.deleteTypeRequest('unit', this.route.snapshot.params['id']).subscribe((res: any) => {
      //   if (res.statusCode) { 
      //     this.toastr.success('Product Model updated successfully')
      //     this.router.navigate(['viewUnit'])
      //   } else { 
      //     console.log(res)
      //     alert(res.message)
      //   }
      // });
    }
    
  
  
  
  }


