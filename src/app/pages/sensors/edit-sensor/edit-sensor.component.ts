import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.css']
})
export class EditSensorComponent {

  unitlist: any;
  sensorById: any;
  currentRoute: any;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService, private _api: ApiService, private route: ActivatedRoute) {
    this.LoadSensorById();
    this.LoadUnit();
     this.sensorform = new FormGroup({
      name: new FormControl(''),
      unitId: new FormControl(''),
      decimalPlaces: new FormControl(''),
      kind: new FormControl('')
    });
  }
  ngOnInit() {
    return this._api.getTypeRequestById('sensor',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.sensorById = res.data;
      this.sensorform = new FormGroup({
        name: new FormControl(this.sensorById['name']),
        unitId: new FormControl(this.sensorById['unitId']),
        decimalPlaces: new FormControl(this.sensorById['decimalPlaces']),
        kind: new FormControl(this.sensorById['kind'])
      });
    });
  }
  LoadUnit() {

    return this._api.getTypeRequest('unit').subscribe((res: any) => {
      this.unitlist = res.data;
    });

  }
  LoadSensorById() {
    console.log(this.route.snapshot.params['id'],'router')
    return this._api.getTypeRequestById('sensor',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.sensorById = res.data;
      //console.log(this.sensorById,'this.sensorById')
    });

  }
  sensorform = this.builder.group({
    name: this.builder.control('', Validators.required),
    unitId: this.builder.control('', Validators.required),
    decimalPlaces: this.builder.control('', Validators.required),
    kind: this.builder.control('', Validators.required),
    //isactive: this.builder.control(false)
  });
  proceedSensor() {
    if (this.sensorform.valid) {
      //console.log(this.route.snapshot.params['id'],'this.route.snapshot.params')
      this._api.putTypeRequest('sensor', this.sensorform.value, this.route.snapshot.params['id']).subscribe((res: any) => {
        if (res.statusCode) { 
          this.toastr.success('Sensor updated successfully')
          this.router.navigate(['viewSensor'])
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

