import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-decice',
  templateUrl: './edit-decice.component.html',
  styleUrls: ['./edit-decice.component.css']
})
export class EditDeciceComponent {

  modellist: any;
  modelById: any;
  currentRoute: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
    this.LoadModelById();
    this.LoadModel();
     this.deviceform = new FormGroup({
      name: new FormControl(''),
      imei_no: new FormControl(''),
      productModelId: new FormControl('')
    });
  }
  ngOnInit() {
    return this._api.getTypeRequestById('device',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      this.deviceform = new FormGroup({
        name: new FormControl(this.modelById['name']),
        imei_no: new FormControl(this.modelById['imei_no']),
        productModelId: new FormControl(this.modelById['productModelId'])
      });
    });
  }
  LoadModel() {

    return this._api.getTypeRequest('product-category').subscribe((res: any) => {
      this.modellist = res.data;
    });

  }
  LoadModelById() {
    console.log(this.route.snapshot.params['id'],'router')
    return this._api.getTypeRequestById('product-category',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      //console.log(this.modelById,'this.modelById')
    });

  }
  deviceform = this.builder.group({
    name: this.builder.control('', Validators.required),
    imei_no: this.builder.control('', Validators.required),
    productModelId: this.builder.control('', Validators.required),
    //isactive: this.builder.control(false)
  });
  proceedDeviceModel() {
    if (this.deviceform.valid) {
      //console.log(this.route.snapshot.params['id'],'this.route.snapshot.params')
      this._api.putTypeRequest('device', this.deviceform.value, this.route.snapshot.params['id']).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Device updated successfully')
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


