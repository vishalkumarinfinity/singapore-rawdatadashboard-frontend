import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { ApiService } from '../service/api.service';
import { map } from 'rxjs';
import { Token } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {
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
    return this._api.getTypeRequest('users').subscribe((res: any) => {
      this.userlist = res.data;
    });
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.LoadUser();
}
  displayedColumns: string[] = ['username', 'fullname', 'status', 'action'];

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
