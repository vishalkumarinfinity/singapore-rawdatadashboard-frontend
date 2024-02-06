import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  userDetail: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
     
  }
  ngOnInit() {
    return this._api.getTypeRequestById('users',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.userDetail = res.data;
      //console.log(this.userDetail,'this.userDetail')
    });
  }

}
