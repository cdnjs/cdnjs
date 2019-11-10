/*
 Highcharts JS v7.0.3 (2019-02-06)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var d=a.seriesTypes,c=a.Chart.prototype,e=a.getOptions(),f=a.extend;f(e.lang,{noData:"No data to display"});e.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"},style:{fontWeight:"bold",fontSize:"12px",color:"#666666"}};"bubble gauge heatmap networkgraph pie sankey treemap waterfall".split(" ").forEach(function(a){d[a]&&
(d[a].prototype.hasData=function(){return!!this.points.length})});a.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length};c.showNoData=function(a){var b=this.options;a=a||b&&b.lang.noData;b=b&&b.noData;!this.noDataLabel&&this.renderer&&(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.styledMode||this.noDataLabel.attr(b.attr).css(b.style),this.noDataLabel.add(),this.noDataLabel.align(f(this.noDataLabel.getBBox(),
b.position),!1,"plotBox"))};c.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};c.hasData=function(){for(var a=this.series||[],b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};a.addEvent(a.Chart,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})})(a)});
//# sourceMappingURL=no-data-to-display.js.map