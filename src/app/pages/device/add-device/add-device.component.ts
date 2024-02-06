import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  modellist: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService) {
  this.LoadModel();
  }

  LoadModel() {

    return this._api.getTypeRequest('product-category').subscribe((res: any) => {
      this.modellist = res.data;
    });

  }

  deviceform = this.builder.group({
    name: this.builder.control('', Validators.required),
    imei_no: this.builder.control('', Validators.required),
    productModelId: this.builder.control('', Validators.required),
  });
  proceedDeviceModel() {
    if (this.deviceform.valid) {
      this._api.postTypeRequest('device', this.deviceform.value).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Device added successfully')
          this.router.navigate(['viewDevice'])
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
