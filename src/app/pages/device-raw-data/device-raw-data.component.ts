import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
//import moment from 'moment';
import dayjs from 'dayjs';
import { LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment-timezone';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { IgxGridComponent } from 'igniteui-angular';
import * as XLSX from 'xlsx';


declare var $: any;

@Component({
  selector: 'app-device-raw-data',
  templateUrl: './device-raw-data.component.html',
  styleUrls: ['./device-raw-data.component.css']
})
export class DeviceRawDataComponent implements OnInit, AfterViewInit {

  @ViewChild(IgxPaginatorComponent, { static: true }) paginator!: IgxPaginatorComponent;
  @ViewChild('grid1', { static: true }) public grid!: IgxGridComponent;

  private updateSubscription: Subscription = new Subscription;
  numOfResult!: number
  tableData: any;
  //testM : any
  searchValue!: any;
  currentPage = 1;
  limit = 100;
  total = 0;
  threshold = 10;
  totalPage!: number;
  showingStartVal: any = 1;
  showingEndtVal: any = 100;
  resultPerPage!: number;
  deviceIdData: any = null;
  tableDataUnique: any;
  filteredDataDeviceData: any;
  filteredData: any[] = [];
  selectedValue: any;
  selected: any = {
    startDate: moment().subtract(1, 'days').startOf('day'), // Yesterday's date
    endDate: moment().endOf('day') // Today's date
  };

  startDateFil: any;
  endDateFil: any;
  expStartDate: any;
  expEndDate: any
  startDate: any;
  endDate: any;
  alwaysShowCalendars!: boolean;
  dateRange: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }


  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];



  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  showPagination: boolean = false;
  //dateRange: any;



  constructor(private el: ElementRef, private _api: ApiService, private cdr: ChangeDetectorRef, private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string, private ngxLoader: NgxUiLoaderService) {
    const timeZone = 'Europe/Berlin'; // Set the desired time zone
    var currentMoment = moment().tz(timeZone);

    this.alwaysShowCalendars = true;
    //const today = new Date();
    const yesterday = this.selected.startDate;
    const todayDt = this.selected.endDate;


    // yesterday.setDate(today.getDate() - 1);
    // todayDt.setDate(today.getDate() );
    this.startDate = this.datePipe.transform(yesterday, 'yyyy-MM-dd') + "_00-00-00";
    this.endDate = this.datePipe.transform(todayDt, 'yyyy-MM-dd') + "_23-59-59";
    this.LoadRawData();
    this.AllLoadRawData();
  }


  convertDateFormat(dateString: string): string {
    if (!dateString) {
      return ''; // or handle the case when the dateString is not provided
    }

    const parts = dateString.split('_');

    if (parts.length < 2) {
      return ''; // or handle the case when the dateString is not in the expected format
    }

    const datePart = parts[0];
    const timePart = parts[1];

    const dateParts = datePart.split('-');
    const timeParts = timePart.split('-');

    if (dateParts.length !== 3 || timeParts.length !== 3) {
      return ''; // or handle the case when the dateString is not in the expected format
    }

    const year = +dateParts[0];
    const month = +dateParts[1];
    const day = +dateParts[2];

    const hours = +timeParts[0];
    const minutes = +timeParts[1];
    const seconds = +timeParts[2];

    const utcDateTime = moment.utc(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    const brisbaneDateTime = utcDateTime.tz('Australia/Brisbane');

    const formattedDate = brisbaneDateTime.format('DD/MM/YYYY, hh:mm:ss A');

    return formattedDate;
  }


  convertUploadType(uploadtype: string): string {
    if (!uploadtype) {
      return '';
    }
    return (uploadtype == '2') ? 'Scheduled' : 'Alarm';
  }

  dtOptions: any = {};

  ngOnInit() {


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      processing: true,
      aaSorting: [],
      // dom: 'Bfrt',
      searching: false,
      dom: 'Bfrt',
      buttons: [],
      columns: [
        { title: 'Device ID', data: 'device_id' },
        //{ title: 'TracNet Id', data: '_id' },
        {
          title: 'Upload Type', data: 'data_type',
          render: (data: any) => {
            return this.convertUploadType(data);
          }
        },
        //{ title: 'Timestamp', data: this.convertDateFormat('date') },
        {
          title: 'Timestamp',
          data: 'date',
          render: (data: any, type: any, row: any) => {
            return this.convertDateFormat(data);
            // return data;
          }
        },
        {
          title: 'Distance (mm)',
          data: 'height',
          render: function (data: string, type: any, row: any) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        {
          title: 'Angle (deg)',
          data: 'angle',
          render: function (data: string, type: any, row: any) {
            return data;
          }
        },
        {
          title: 'Signal Strength (dBm)',
          data: 'signal_strength',
          render: function (data: string, type: any, row: any) {
            return Number((parseFloat(data)).toFixed());
          }
        },
        {
          title: 'Battery Voltage (V)',
          data: 'battery_voltage',
          render: function (data: string, type: any, row: any) {
            return parseFloat(data).toFixed(2);
          }
        },
        {
          title: 'Temperature',
          data: 'temperature',
          render: function (data: string, type: any, row: any) {
            return parseFloat(data).toFixed(1) + '°';
          }
        },
        { title: 'Distance Alarm', data: 'status' },
        { title: 'Angle Alarm', data: 'moved_alarm' },
        { title: 'Battery Status', data: 'battery_status' },
        { title: 'Server IP', data: 'serverip' },
        { title: 'Remote IP', data: 'remoteip' },
        {
          title: 'Uploads Since Power On',
          data: 'uploads_since_power_on',
          render: function (data: string, type: any, row: any) {
            return Number((parseFloat(data)).toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },

      ],
    };
    $(this.el.nativeElement.querySelector('#name-dropdown')).select2().on('change', () => {
      this.selectedValue = $(this.el.nativeElement.querySelector('#name-dropdown')).val();
      // this.filterTableData();
      // this.onLoadFilter();
      this.onSelectionChange();
      this.cdr.detectChanges();
    });
    this.selectedValue = [$(this.el.nativeElement.querySelector('#name-dropdown option:first-child')).val()];
    this.LoadRawData();
    this.AllLoadRawData();
  }

  // Add the following property to the component
  autoRefresh: boolean = true;

  // Modify the ngAfterViewInit method as follows
  ngAfterViewInit() {

    this.updateSubscription = interval(10000).subscribe(() => {
      setTimeout(() => {
        // Perform the desired actions for updating the data
        const yesterday = moment().subtract(1, 'days').startOf('day');
        const today = moment().endOf('day');
        this.selected.startDate = yesterday;
        this.selected.endDate = today;
        this.startDate = this.datePipe.transform(yesterday.toDate(), 'yyyy-MM-dd') + '_00-00-00';
        this.endDate = this.datePipe.transform(today.toDate(), 'yyyy-MM-dd') + '_23-59-59';
        this.LoadRawData();
        this.selected = {
          startDate: yesterday,
          endDate: today
        };
      });
    });

  }

  handleAutoRefreshChange() {
    if (this.autoRefresh) {
      if (!this.updateSubscription || this.updateSubscription.closed) {
        this.updateSubscription = interval(10000).subscribe(() => {
          setTimeout(() => {
            // Perform the desired actions for updating the data
            const yesterday = moment().subtract(1, 'days').startOf('day');
            const today = moment().endOf('day');
            this.selected.startDate = yesterday;
            this.selected.endDate = today;
            this.startDate = this.datePipe.transform(yesterday.toDate(), 'yyyy-MM-dd') + '_00-00-00';
            this.endDate = this.datePipe.transform(today.toDate(), 'yyyy-MM-dd') + '_23-59-59';
            this.LoadRawData();
            this.selected = {
              startDate: yesterday,
              endDate: today
            };
          });
        });
      }
    } else {
      if (this.updateSubscription) {
        this.updateSubscription.unsubscribe();
      }
    }
  }


  showLoader() {
    this.ngxLoader.start(); // Show the loader
  }

  hideLoader() {
    this.ngxLoader.stop(); // Hide the loader
  }

  AllLoadRawData() {
    this.showLoader();
    this._api.getTypeRequest('all-raw-data').subscribe((res: any) => {
      this.tableData = res.data;
      this.tableDataUnique = this.tableData;
      this.hideLoader();
    });

  }


  LoadRawData() {
    this.showLoader();
    this.selected.startDate = moment().subtract(1, 'days').startOf('day');
    this.selected.startDate = moment().endOf('day');
    this.expStartDate = this.startDate;
    this.expEndDate = this.endDate;
    this._api.getRawData('raw-data', this.currentPage, this.limit, this.startDate, this.endDate, this.deviceIdData, this.searchValue).subscribe((res: any) => {
      this.tableData = res.data.data;

      this.numOfResult = res.data.total;
      this.onLoadFilter()
      this.hideLoader();

    });

  }

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }



  onLoadFilter() {

    if (this.tableData) {
      if (this.dateRange) {
        const startDate = moment(this.selected.startDate).startOf('day');
        const endDate = moment(this.selected.endDate).endOf('day');

        this.filteredData = this.tableData.filter((data: { date: string; }) => {
          const date = moment(data.date, 'YYYY-MM-DD_hh_mm_ss A');
          return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
        });


        if (this.filteredData && this.filteredData.length > 0) {
          if (this.selectedValue[0] === 'all') {

            this.filteredDataDeviceData = this.filteredData // Show the first 100 records
          } else if (this.selectedValue === 'all') {
            this.filteredDataDeviceData = this.filteredData; // Show the first 100 records
          }
          else {

            this.filteredDataDeviceData = this.filteredData.filter((data: { device_id: any; date: any }) =>
              this.selectedValue.includes(data.device_id)
            );
          }
        }

        // this.tableDataUnique = [...new Set(this.tableData.map((item: { device_id: any; }) => item.device_id))];
      } else {
        this.filteredData = this.tableData;

      }


      if (this.datatableElement) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.rows.add(this.filteredData);
          dtInstance.draw();
        });
      }

    }

  }

  onSelectionChange() {
    if (this.selectedValue && this.selectedValue != "all") {
      this.filterTableDataByDate(this.selectedValue);
    }

    if (this.selectedValue == "all") {
      this.deviceIdData = null;
      this.filterTableDataByDate();
    }
  }


  searchingCall() {
    setTimeout(() => {
      this.removeDisallowedChars(this.searchValue);
      //   if(this.searchValue.trim()){
      this.filterTableDataByDate();
      // }
    }, 1000);
  }


  removeDisallowedChars(inputString: string) {
    // Define the allowed special characters in the regular expression
    const allowedSpecialCharsRegex = /[^a-zA-Z0-9_ \-.-/:\.?~\\/]/g;
    // Use replace to remove disallowed characters
    const sanitizedString = inputString.replace(allowedSpecialCharsRegex, '');
    this.searchValue = sanitizedString;
    // return sanitizedString;
  }

  calenderFilter() {
    this.startDateFil = this.selected.startDate.subtract(1, 'days').format('YYYY-MM-DD') + '_14-00-00';
    this.endDateFil = this.selected.endDate.format('YYYY-MM-DD') + '_13-59-59';
    this.filterTableDataByDate();
  }




  filterTableDataByDate(serialNumber?: string) {
    if (serialNumber) {
      this.deviceIdData = serialNumber;
      this.currentPage = 1;
    }

    this.expStartDate = this.startDateFil;
    this.expEndDate = this.endDateFil;

    this.showLoader();
    this._api.getRawData('raw-data', this.currentPage, this.limit, this.startDateFil, this.endDateFil, this.deviceIdData, this.searchValue,).subscribe((res: any) => {
      this.tableData = res.data.data;
      this.numOfResult = res.data.total;
      this.resultPerPage = res.data.resultPerPage;
      this.filteredData = this.tableData;
      this.totalPage = Math.ceil(this.numOfResult / this.limit);

      if (this.datatableElement) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.rows.add(this.filteredData);
          dtInstance.draw();
        });
      }

      // Check if the total number of results exceeds the threshold
      if (this.numOfResult > this.threshold) {
        // Collapse the pagination component
        this.showPagination = false;
      } else {
        // Show the pagination component
        this.showPagination = true;
      }

      // Hide the loader
      this.hideLoader();
    });
  }

  // exportCsv() {
  //    this._api.getExport('raw-data/export-csv').subscribe(response => console.log(response));
  // }

  exports(fileType: any) {
    this._api.getExport('raw-data/export-csv', this.currentPage, this.limit, this.expStartDate, this.expEndDate, this.deviceIdData, this.searchValue,).subscribe((responses: any) => {

      const response = responses.map((item: any) => {

        return {
          device_id: item.device_id,
          data_type: this.convertUploadType(item.data_type),
          date: this.convertDateFormat(item.date),
          height: item.height.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          angle: item.angle,
          signal_strength: Number((parseFloat(item.signal_strength)).toFixed()),
          battery_voltage: parseFloat(item.battery_voltage).toFixed(2),
          temperature: parseFloat(item.temperature).toFixed(1) + '°',
          status: item.status,
          moved_alarm: item.moved_alarm,
          battery_status: item.battery_status,
          serverip: item.serverip,
          remoteip: item.remoteip,
          uploads_since_power_on: Number((parseFloat(item.uploads_since_power_on)).toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        };

      });

      if (fileType === 'CSV') {
        const csvString = this.convertArrayOfObjectsToCSV(response);
        this.downloadFile(csvString, 'point_history.csv', 'text/csv');
      }
      if (fileType === 'Excel') {
        const manualHeaders = ['Device ID', 'Upload Type', 'Timestamp', 'Distance (mm)', 'Angle (deg)', 'Signal Strength (dBm)', 'Battery Voltage (V) ', 'Temperature ', 'Distance Alarm', 'Angle Alarm', 'Battery Status', 'Server IP', 'Remote IP', 'Uploads Since Power On'];
        const excelData = this.convertArrayOfObjectsToExcel(response, manualHeaders);
        this.downloadFile(excelData, 'point_history.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
      if (fileType === 'Print') {
        this.printData(response);
      }
      if (fileType === 'Copy') {
        this.copyData(response);
      }

    },
      (error) => {
        console.error('Error exporting CSV:', error);
      }
    );
  }

  copyData(data: any[]) {
    var copyContent = `Point History\nDevice ID\tUpload Type\tTimestamp\tDistance (mm)\tAngle (deg)\tSignal Strength (dBm)\tBattery Voltage (V)\tTemperature\tDistance Alarm\tAngle Alarm\tBattery Status\tServer IP\tRemote IP\tUploads Since Power On\n`
    copyContent += data.map(item => {
      return `${item.device_id}\t${item.data_type}\t${item.date}\t${item.height}\t${item.angle}\t${item.signal_strength}\t${item.battery_voltage}\t${item.temperature}\t${item.status}\t${item.moved_alarm}\t${item.battery_status}\t${item.serverip}\t${item.remoteip}\t${item.uploads_since_power_on}\n`;
    }).join('');

    const textarea = document.createElement('textarea');
    textarea.value = copyContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  printData(data: any[]) {
    // You can customize this function based on how you want to format and print your data
    const printContent = this.formatDataForPrint(data);

    // Open a new window and write the content to be printed
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Trigger the print operation
      printWindow.print();
    } else {
      console.error('Error opening print window.');
    }
  }
  formatDataForPrint(data: any[]): string {
    const tableRows = data.map(item => {
      return `
      <tr>
          <td>${item.device_id}</td>
          <td>${item.data_type}</td>
          <td>${item.date}</td>
          <td>${item.height}</td>
          <td>${item.angle}</td>
          <td>${item.signal_strength}</td>
          <td>${item.battery_voltage}</td>
          <td>${item.temperature}</td>
          <td>${item.status}</td>
          <td>${item.moved_alarm}</td>
          <td>${item.battery_status}</td>
          <td>${item.serverip}</td>
          <td>${item.remoteip}</td>
          <td>${item.uploads_since_power_on}</td>
        </tr>
      `;
    });

    return `
      <html>
        <head>
          <title>Point History</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Point History</h1>
          <table>
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Upload Type</th>
                <th>Timestamp</th>
                <th>Distance (mm)</th>
                <th>Angle (deg)</th>
                <th>Signal Strength (dBm)</th>
                <th>Battery Voltage (V)</th>
                <th>Temperature</th>
                <th>Distance Alarm</th>
                <th>Angle Alarm</th>
                <th>Battery Status</th>
                <th>Server IP</th>
                <th>Remote IP</th>
                <th>Uploads Since Power On</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  }



  convertArrayOfObjectsToCSV(data: any[]): string {
    const customHeaders = ['Device ID', 'Upload Type', 'Timestamp', 'Distance (mm)', 'Angle (deg)', 'Signal Strength (dBm)', 'Battery Voltage (V) ', 'Temperature ', 'Distance Alarm', 'Angle Alarm', 'Battery Status', 'Server IP', 'Remote IP', 'Uploads Since Power On'];
    const header = customHeaders.join(',') + '\n';

    const rows = data.map(obj =>
      Object.values(obj).map(value => JSON.stringify(value)).join(',')
    ).join('\n');

    return header + rows;
  }
  convertArrayOfObjectsToExcel(data: any[], manualHeaders: string[]): Blob {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([manualHeaders, ...data.map(obj => Object.values(obj))]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelDataBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([this.s2ab(excelDataBinary)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return blob;
  }

  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  downloadFile(data: any, filename: string, fileType: string) {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Remove the link element after the download
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }



}
