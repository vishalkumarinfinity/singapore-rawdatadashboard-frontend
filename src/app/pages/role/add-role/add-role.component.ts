import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService) {

  }
  roleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    //unit_symbol: this.builder.control('', Validators.required),
    //description: this.builder.control(''),
    
  });
  rolemodel() {
    if (this.roleForm.valid) {
      
      this._api.postTypeRequest('roles', this.roleForm.value).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Role added successfully')
          this.router.navigate(['role'])
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
