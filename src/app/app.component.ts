import {Component} from '@angular/core';
import {GoogleDriveProvider} from './google-drive';

/*@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
 providers: [GoogleDriveProvider]
 })

 export class AppComponent {
 dataId: string;
 data: Array<any> = [];

 constructor(gDrive: GoogleDriveProvider) {
 this.dataId = '1c1Y3z1PNcF6vtrresU2co9djEsjjcfBS4ygIVtUfhG4';
 gDrive.load(this.dataId)
 .then((data) => {
 let columns: Array<string> = [];
 for (let key of Object.keys(data[0])) {
 columns.push(data[0][key].split(" ").join("_").split("\n").join(""));
 }
 for (let i = 1; i < data.length; i++) {
 let row = data[i];
 let row_keys = Object.keys(row);
 if(row_keys.length == columns.length) {
 let obj: any = {};
 for (let j = 0; j < row_keys.length; j++) {
 obj[columns[j]] = row[row_keys[j]];
 }
 this.data.push(JSON.stringify(obj));
 }
 }
 }, (error) => {
 console.log(error);
 });
 }

 }*/
@Component({
  selector: 'app-root',
  providers: [GoogleDriveProvider],
  /*template:  `
    <div id="scatter_chart" [chartData]="scatter_ChartData"  [chartOptions] = "scatter_ChartOptions" chartType="ScatterChart" GoogleChart></div>
	`*/
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  report: Boolean = true;
  statistics: Boolean = false;
  scatter_ChartData: Array<any> = [];
  date: any = new Date();

  constructor(gDrive: GoogleDriveProvider) {
    this.date = this.date.getMonth()+1 + '/' + this.date.getDate() + '/' +  this.date.getFullYear() + " " + this.date.getHours() + ":" + this.date.getMinutes();

    this.scatter_ChartData.push(['Date', 'Migraña']);

    let dataId = '1c1Y3z1PNcF6vtrresU2co9djEsjjcfBS4ygIVtUfhG4';
    gDrive.load(dataId)
      .then((data) => {
        let columns: Array<string> = [];
        for (let key of Object.keys(data[0])) {
          columns.push(data[0][key].split(" ").join("_").split("\n").join(""));
        }
        for (let i = 1; i < data.length; i++) {
          let row = data[i];
          let row_keys = Object.keys(row);
          if(row_keys.length == columns.length) {
            let obj: any = {};
            for (let j = 0; j < row_keys.length; j++) {
              obj[columns[j]] = row[row_keys[j]];
            }
            let date = obj['Día'].split('/');
            let day = date[0];
            let month = date[1]-1;
            let year = date[2];

            let time = obj['Hora'].split(':');
            let hour = time[0];
            let minute = time[1];
            this.scatter_ChartData.push([new Date(year, month, day, hour, minute), 1]);
          }
        }
      }, (error) => {
        console.log(error);
      });
  }

  public scatter_ChartOptions = {
    legend: { position: 'bottom'
    },
    title: 'Migraña',
    animation: {
      startup: true,
      duration: 500,
      easing: 'in'
    }
  };
}
