import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UpdatepopupComponent } from 'src/app/updatepopup/updatepopup.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

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
      this.LoadRole();
    }
    roleList: any;
    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit(): void {
  
    }
    
    LoadRole() {
      return this._api.getTypeRequest('roles').subscribe((res: any) => {
        this.roleList = res.data;
      });
    }
    pageChangeEvent(event: number){
      this.p = event;
      this.LoadRole();
  }
    displayedColumns: string[] = ['name', 'action'];
  
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
        this.LoadRole();
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
