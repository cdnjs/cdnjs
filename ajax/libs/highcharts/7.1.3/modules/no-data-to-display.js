/*
 Highcharts JS v7.1.3 (2019-08-14)

 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/no-data-to-display",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,e,c,d){a.hasOwnProperty(e)||(a[e]=d.apply(null,c))}a=a?a._modules:{};c(a,"modules/no-data-to-display.src.js",[a["parts/Globals.js"]],function(a){var c=a.Chart.prototype,f=a.getOptions(),d=a.extend;
d(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"},style:{fontWeight:"bold",fontSize:"12px",color:"#666666"}};c.showNoData=function(a){var b=this.options;a=a||b&&b.lang.noData;b=b&&b.noData;!this.noDataLabel&&this.renderer&&(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.styledMode||this.noDataLabel.attr(b.attr).css(b.style),this.noDataLabel.add(),this.noDataLabel.align(d(this.noDataLabel.getBBox(),b.position),
!1,"plotBox"))};c.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};c.hasData=function(){for(var a=this.series||[],b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};a.addEvent(a.Chart,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})});c(a,"masters/modules/no-data-to-display.src.js",[],function(){})});
//# sourceMappingURL=no-data-to-display.js.map