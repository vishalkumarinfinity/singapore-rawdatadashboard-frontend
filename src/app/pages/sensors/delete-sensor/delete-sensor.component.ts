import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-sensor',
  templateUrl: './delete-sensor.component.html',
  styleUrls: ['./delete-sensor.component.css']
})
export class DeleteSensorComponent {

  constructor( 
    private _api: ApiService,private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,private httpClient: HttpClient) {
    this.deleteItemById(this.route.snapshot.params['id']);
    let statusDelete: any;
  }
  
  deleteItemById(id: any) {

    //return this.httpClient.delete.bind(`${this.baseUrl}/${id.id}`);
    
    this._api.deleteTypeRequest('sensor', this.route.snapshot.params['id']).subscribe((res: any) => {
      
      if (res.statusCode) { 
        this.toastr.success('Sensor deleted successfully')
        this.router.navigate(['viewDevice'])
      } else { 
        console.log(res)
        alert(res.message)
      }
    });
  }
}
