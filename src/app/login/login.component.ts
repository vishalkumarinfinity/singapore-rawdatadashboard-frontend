import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //private _api: any;
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router, private _api: ApiService, ) {
      sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      //console.log(this.loginform.valid,'this.result')
      this._api.postTypeRequest('login', this.loginform.value).subscribe(item => {
        this.result = item;
        console.log(this.result,'this.result')
        if (this.result.data.status != 404) {
          //if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.data.username);
            sessionStorage.setItem('access_token',this.result.data.access_token);
            //sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['deviceRawData']);
          //} else {
            //this.toastr.error('Please contact Admin', 'InActive User');
          //}
        } else {
          console.log('test')
          this.toastr.error("Wrong username or password!");
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
