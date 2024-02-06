import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-product-model',
  templateUrl: './edit-product-model.component.html',
  styleUrls: ['./edit-product-model.component.css']
})
export class EditProductModelComponent {
  modellist: any;
  modelById: any;
  currentRoute: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
    this.LoadModelById();
     this.productmodelform = new FormGroup({
      name: new FormControl(''),
      modelId: new FormControl(''),
      description: new FormControl('')
    });
  }
  ngOnInit() {
    return this._api.getTypeRequestById('product-category',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      this.productmodelform = new FormGroup({
        name: new FormControl(this.modelById['name']),
        modelId: new FormControl(this.modelById['modelId']),
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
    return this._api.getTypeRequestById('product-category',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.modelById = res.data;
      //console.log(this.modelById,'this.modelById')
    });

  }
  productmodelform = this.builder.group({
    name: this.builder.control('', Validators.required),
    modelId: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    //isactive: this.builder.control(false)
  });
  proceedproductmodel() {
    if (this.productmodelform.valid) {
      //console.log(this.route.snapshot.params['id'],'this.route.snapshot.params')
      this._api.putTypeRequest('product-category', this.productmodelform.value, this.route.snapshot.params['id']).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Product Model updated successfully')
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

