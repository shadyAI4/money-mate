import { query } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription, map } from 'rxjs';
import { DASHBOARD_REPORT_QUERY } from 'src/app/reports-graphql/dashboard-report.graphql';
import { StorageService } from 'src/app/services/storage.service';
import { getUserExpenseMutation } from 'src/app/store/entities/add-expenses/add-expenses.actions';
import { PesaObjectType } from 'src/app/store/entities/add-expenses/add-expenses.model';
import { selectUserExpenses } from 'src/app/store/entities/add-expenses/add-expenses.selectors';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries |any;
  chart: ApexChart |any;
  xaxis: ApexXAxis |any;
  yaxis: ApexYAxis | ApexYAxis[] |any;
  title: ApexTitleSubtitle |any;
  labels: string[] |any;
  stroke: any; // ApexStroke;
  dataLabels: any |any; // ApexDataLabels;
  fill: ApexFill |any;
  tooltip: ApexTooltip |any;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public series : ApexAxisChartSeries | any;
  // public chart: ApexChart | any;
  public dataLabels: ApexDataLabels | any;
  public markers: ApexMarkers | any;
  public title: ApexTitleSubtitle | any;
  public fill: ApexFill | any;
  public yaxis: ApexYAxis | any;
  public xaxis: ApexXAxis | any;
  public tooltip: ApexTooltip | any;
  isopen = false
  columnsHeader:any
  user_unique_id:string |any
  amount =[]
  month =[]
  daysSPend: any[]=[] 
  monthSPend: any[]=[]
  yearSPend: any[]=[]

  amount1 =[]
  month1 =[]
  dashboardData:any
  tableData:Observable<PesaObjectType[]>|any;
  private querySubscritpion : Subscription|any
  @ViewChild("chart") chart: ChartComponent |any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;

  constructor(
    private store:Store,
    private apollo: Apollo,
    private localStorage: StorageService,
  ){

  }
  ngOnInit() {
    // console.log(this.localStorage.getItem('profile').userUniqueId)
    this.user_unique_id = this.localStorage.getItem('profile').userUniqueId
    
    this.columnsHeader= ['QUESTION', 'TYPE', 'CREATED DATE', 'SCORE'];
  
    this.apollo.watchQuery<any>({
      query:DASHBOARD_REPORT_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        filtering: {
          userUniqueId: this.user_unique_id
        }
      }
    })
    .valueChanges
    .subscribe((data) => {
      console.log(data)
      if(data){
          this.dashboardData=data.data.getAllDashboardReport.data
          console.log(this.dashboardData)
          this.month = this.dashboardData?.spendsPerMonth?.map((spend:{month:String}) =>spend.month)
          this.amount = this.dashboardData?.spendsPerMonth?.map((spend:{amount:Number})=>spend.amount)
          this.month1 = this.dashboardData?.spendsPerDay?.map((spend:{day:String}) =>spend.day)
          this.amount1 = this.dashboardData?.spendsPerDay?.map((spend:{amount:Number})=>spend.amount)
          this.daysSPend= this.dashboardData?.maxDaySpends
          this.monthSPend= this.dashboardData?.maxMonthSpends
          this.yearSPend= this.dashboardData?.maxYearSpends
          console.log("month", this.daysSPend[0])
          this.chartOptions = {
            series: [
              {
                name: "Website Blog",
                type: "column",
                data: this.amount // will be updated automaticalyy
              },
            ],
            chart: {
              height: 450,
              type: "line"
            },
            stroke: {
              width: [0, 10]
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1]
            },
            labels: this.month,
       
            yaxis: [
              {
                title: {
                  text: "Total Amount"
                }
              },
      
            ]
          };

          this.chartOptions1 = {
            series: [
              {
                name: "Total Amount",
                type: "area",
                data: this.amount1 // will be updated automaticalyy
              },
            ],
            chart: {
              type: "area",
              stacked: false,
              height: 450,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: "zoom"
              }
            },
            stroke: {
              width: [0, 10]
            },
            dataLabels: {
              enabled: false,
              // enabledOnSeries: [1]
            },
            labels: this.month1,
            fill : {
              type: "gradient",
              gradient: {
                // shadeIntensity: 1,
                inverseColors: true,
                // opacityFrom: 0.5,
                // opacityTo: 0,
                // stops: [0, 90, 100]
              }
            },
            xaxis : {
              type: "datetime"
            },
       
            yaxis: [
              {
                title: {
                  text: "Total Amount"
                }
              },
      
            ]
            
          };

      }
    })

  }

  public initChartData(): void {
    this.series = [
      {
        name: "Daily Spending",
        data: [] // Initially empty; will be filled with fetched data
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Daily Spending Over Time",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      title: {
        text: "Total Spend (in currency)"
      }
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      shared: false,
      // y: {
      //   formatter: function(val) {
      //     return val.toFixed(2); // Show amount with 2 decimal places
      //   }
      // }
    };
  }

  openMenu(){
    this.isopen=!this.isopen
    console.log("click",this.isopen)
  }
}
