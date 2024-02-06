import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent {

  unitlist: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService) {
  this.LoadUnit();
  }

  LoadUnit() {

    return this._api.getTypeRequest('unit').subscribe((res: any) => {
      this.unitlist = res.data;
    });

  }

  unitform = this.builder.group({
    name: this.builder.control('', Validators.required),
    kind: this.builder.control('', Validators.required),
    unitId: this.builder.control('', Validators.required),
    decimalPlaces: this.builder.control('', Validators.required),
  });
  proceedUnit() {
    if (this.unitform.valid) {
      this._api.postTypeRequest('sensor', this.unitform.value).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Unit added successfully')
          this.router.navigate(['viewUnit'])
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
