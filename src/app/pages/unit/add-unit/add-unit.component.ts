import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService) {

  }
  unitForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    unit_symbol: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    
  });
  unitmodel() {
    if (this.unitForm.valid) {
      
      this._api.postTypeRequest('unit', this.unitForm.value).subscribe((res: any) => {
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

