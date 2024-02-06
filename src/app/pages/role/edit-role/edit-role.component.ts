import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {

  roleById: any;
  currentRoute: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
    this.LoadRoleById();
     this.roleForm = new FormGroup({
      name: new FormControl(''),
      //unit_symbol: new FormControl(''),
      //description: new FormControl('')
    });
  }
  ngOnInit() {
    return this._api.getTypeRequestById('roles',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.roleById = res.data;
      this.roleForm = new FormGroup({
        name: new FormControl(this.roleById['name']),
       
        
      });
    });
  }

  LoadRoleById() {
    console.log(this.route.snapshot.params['id'],'router')
    return this._api.getTypeRequestById('roles',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.roleById = res.data;
    });

  }
  roleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    
    
  });
  roleModel() {
    if (this.roleForm.valid) {
      //console.log(this.route.snapshot.params['id'],'this.route.snapshot.params')
      this._api.putTypeRequest('roles', this.roleForm.value, this.route.snapshot.params['id']).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Role updated successfully')
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
