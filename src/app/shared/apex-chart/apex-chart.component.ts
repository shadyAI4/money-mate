import { Component, Input, ViewChild, OnChanges, SimpleChanges   } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
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
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export class ApexChartComponent {
  @Input() amount: any[]=[]
  @Input() month: string[]=[]
  
  @ViewChild("chart") chart: ChartComponent |any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
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
      // chart: {
      //   with:100,
      //   type: "bar"
      // },
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["amount"] || changes["month"])
       this.updateChanges()
  }

  updateChanges(){
      this.chartOptions.series=[
        {
          name: "Total Amount",
          type: "column",
          data: this.amount // Use the @Input amount data
        }
      ]
      this.chartOptions.labels = this.month;
  }
}
