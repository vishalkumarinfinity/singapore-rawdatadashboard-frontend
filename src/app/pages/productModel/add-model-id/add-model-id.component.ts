import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-model-id',
  templateUrl: './add-model-id.component.html',
  styleUrls: ['./add-model-id.component.css']
})
export class AddModelIdComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService) {

  }
  productmodelform = this.builder.group({
    name: this.builder.control('', Validators.required),
    modelId: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });
  proceedproductmodel() {
    if (this.productmodelform.valid) {
      
      this._api.postTypeRequest('product-category/add', this.productmodelform.value).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Product Model added successfully')
          this.router.navigate(['viewModelId'])
        } else { 
          console.log(res)
          alert(res.message)
        }
      });

    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
