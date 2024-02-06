import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.css']
})
export class DeleteDeviceComponent {

  constructor( 
    private _api: ApiService,private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,private httpClient: HttpClient) {
    this.deleteItemById(this.route.snapshot.params['id']);
    let statusDelete: any;
  }
  
  deleteItemById(id: any) {

    //return this.httpClient.delete.bind(`${this.baseUrl}/${id.id}`);
    
    this._api.deleteTypeRequest('device', this.route.snapshot.params['id']).subscribe((res: any) => {
      
      if (res.statusCode) { 
        this.toastr.success('Device deleted successfully')
        this.router.navigate(['viewDevice'])
      } else { 
        console.log(res)
        alert(res.message)
      }
    });
  }
}
