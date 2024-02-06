import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  data: any[]=[];

  constructor(private dataService: DataService) {}

  fetchData(limit: number, offset: number) {
    this.dataService.getPaginatedData(limit, offset).subscribe(
      (response: any) => {
        this.data = response;
        console.log(this.data,'this.data')
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
