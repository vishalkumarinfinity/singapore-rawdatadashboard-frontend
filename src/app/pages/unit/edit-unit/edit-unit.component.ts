import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent {

  modellist: any;
  modelById: any;
  currentRoute: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
    this.LoadModelById();
     this.unitForm = new FormGroup({
      name: new FormControl(''),
      unit_symbol: new FormControl(''),
      description: new FormControl('')
    });
  }
  ngOnInit() {
    return this._api.getTypeRequestById('unit',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      this.unitForm = new FormGroup({
        name: new FormControl(this.modelById['name']),
        unit_symbol: new FormControl(this.modelById['unit_symbol']),
        description: new FormControl(this.modelById['description'])
      });
    });
  }
  // LoadModel() {

  //   return this._api.getTypeRequestById('product-category').subscribe((res: any) => {
  //     this.modellist = res.data;
  //   });

  // }
  LoadModelById() {
    console.log(this.route.snapshot.params['id'],'router')
    return this._api.getTypeRequestById('unit',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      console.log(this.modelById,'this.modelById')
    });

  }
  unitForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    unit_symbol: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    //isactive: this.builder.control(false)
  });
  unitModel() {
    if (this.unitForm.valid) {
      //console.log(this.route.snapshot.params['id'],'this.route.snapshot.params')
      this._api.putTypeRequest('unit', this.unitForm.value, this.route.snapshot.params['id']).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Product Model updated successfully')
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


