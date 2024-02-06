import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-by-id-device',
  templateUrl: './view-by-id-device.component.html',
  styleUrls: ['./view-by-id-device.component.css']
})
export class ViewByIdDeviceComponent {

  deviceDetail: any;

  constructor( private service: AuthService, private router: Router, private _api: ApiService, private route: ActivatedRoute) {
     
  }
  ngOnInit() {
    return this._api.getTypeRequestById('device',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.deviceDetail = res.data;
      console.log(this.deviceDetail,'this.productModelDetail')
    });
  }

}
