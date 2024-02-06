import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-product-model',
  templateUrl: './delete-product-model.component.html',
  styleUrls: ['./delete-product-model.component.css']
})
export class DeleteProductModelComponent {

  constructor( 
    private _api: ApiService,private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,private httpClient: HttpClient) {
    this.deleteItemById(this.route.snapshot.params['id']);
    let statusDelete: any;
  }
  
  deleteItemById(id: any) {

    //return this.httpClient.delete.bind(`${this.baseUrl}/${id.id}`);
    
    this._api.deleteTypeRequest('product-category', this.route.snapshot.params['id']).subscribe((res: any) => {
      
      if (res.statusCode) { 
        this.toastr.success('ProductModel deleted successfully')
        this.router.navigate(['viewModelId'])
      } else { 
        console.log(res)
        alert(res.message)
      }
    });
  }
  

}
