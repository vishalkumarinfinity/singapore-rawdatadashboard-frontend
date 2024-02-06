import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent {

  constructor( 
    private _api: ApiService,private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,private httpClient: HttpClient) {
    this.deleteItemById(this.route.snapshot.params['id']);
  }
  
  deleteItemById(id: any) {

    //return this.httpClient.delete.bind(`${this.baseUrl}/${id.id}`);
    
    this._api.deleteTypeRequest('roles', this.route.snapshot.params['id']).subscribe((res: any) => {
      
      if (res.statusCode) { 
        this.toastr.success('Role deleted successfully')
        this.router.navigate(['role'])
      } else { 
        console.log(res)
        alert(res.message)
      }
    });
  }
  

}
