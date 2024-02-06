import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-by-id-unit',
  templateUrl: './view-by-id-unit.component.html',
  styleUrls: ['./view-by-id-unit.component.css']
})
export class ViewByIdUnitComponent {

  unitDetail: any;

  constructor( private service: AuthService, private router: Router, private _api: ApiService, private route: ActivatedRoute) {
     
  }
  ngOnInit() {
    return this._api.getTypeRequestById('unit',this.route.snapshot.params['id']).subscribe((res: any) => {
      this.unitDetail = res.data;
      console.log(this.unitDetail,'this.productModelDetail')
    });
  }

}
