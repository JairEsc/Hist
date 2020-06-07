import { Component, OnInit,NgZone } from '@angular/core';
import {JsonService} from './json.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apip';
  datos=[];
  public persona1=new Object();
  public persona1s=new String();
  public mean;
  public edad_minima;
  public edad_maxima;
  public indices_personas_con_edad_minima;
  public personas_con_edad_minima;
  public conteo_de_edades;
  public base;
  constructor(public json: JsonService, private zone: NgZone){
    this.json.getJson('http://demo6292426.mockable.io/persons').subscribe((res:any)=>{
       let edades=[];
      for (var i=0; i<res.length;i++){
        edades[i]=res[i].age
      }
      this.edad_minima= edades.reduce(function(acc, cv,ci,arr){
        return Math.min(acc,cv)
      })
      this.edad_maxima= edades.reduce(function(acc, cv,ci,arr){
        return Math.max(acc,cv)
      })

      this.persona1s=JSON.stringify(res[0]);
      this.mean=0;

      for(var i=0; i<res.length;i++){
        this.mean+=res[i].age;
      }
      this.mean=this.mean/res.length
      //calcular promedio
      //encontrar menor edad
      this.edad_minima=res[0].age;
      for(var i=1; i<res.length;i++){
        if(this.edad_minima>=res[i].age){
          this.edad_minima=res[i].age
        }
      }
      
      //indices de personas con edad minima:
      //probar con .filter
      this.indices_personas_con_edad_minima=new Array();
      for(var i=0; i<res.length;i++){
        if(this.edad_minima==res[i].age){
          this.indices_personas_con_edad_minima.push(i) 
        }
      }
      //nombres de las personas con la misma edad
      this.personas_con_edad_minima=new Array();
      for(var i=0;i<this.indices_personas_con_edad_minima.length;i++){
        this.personas_con_edad_minima.push(res[this.indices_personas_con_edad_minima[i]].name.first+' '+res[this.indices_personas_con_edad_minima[i]].name.last)
      }
      this.personas_con_edad_minima=JSON.stringify(this.personas_con_edad_minima);
      console.log(res[0].age)
    });
  }
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.zone.runOutsideAngular(()=>{
      let chart=am4core.create("radar-chart",am4charts.RadarChart);
      let title=chart.titles.create();
      title.text="Prueba";
      let data=[];
      for(var i = 0; i < 20; i++){
        data.push({category: i, value:Math.round(Math.random() * 100)});
      }
      chart.data=data;
      chart.radius = am4core.percent(110);
      chart.innerRadius = am4core.percent(50);

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;
      categoryAxis.renderer.grid.template.disabled = true;
      //categoryAxis.renderer.labels.template.disabled = true;
      let labelTemplate = categoryAxis.renderer.labels.template;
      labelTemplate.radius = am4core.percent(-60);
      labelTemplate.location = 0.5;
      labelTemplate.relativeRotation = 90;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.tooltip.disabled = true;
      // Create series
      var series = chart.series.push(new am4charts.RadarColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "category";
      series.columns.template.strokeWidth = 0;
      series.tooltipText = "{valueY}";
      series.columns.template.radarColumn.cornerRadius = 10;
      series.columns.template.radarColumn.innerCornerRadius = 0;

      series.tooltip.pointerOrientation = "vertical";

      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.radarColumn.states.create("hover");
      hoverState.properties.cornerRadius = 0;
      hoverState.properties.fillOpacity = 1;


      series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      })

      // Cursor
      chart.cursor = new am4charts.RadarCursor();
      chart.cursor.innerRadius = am4core.percent(50);
      chart.cursor.lineY.disabled = true;

    });
  }
    
    ngOnDestroy(){
    };
}


/*
      */