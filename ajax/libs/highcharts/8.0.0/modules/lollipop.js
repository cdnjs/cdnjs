/*
 Highcharts JS v8.0.0 (2019-12-10)

 (c) 2009-2019 Sebastian Bochan, Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/lollipop",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,c,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,c))}a=a?a._modules:{};b(a,"modules/lollipop.src.js",[a["parts/Globals.js"]],function(a){var b=a.seriesType,c=a.seriesTypes.area.prototype,d=a.seriesTypes.column.prototype;
b("lollipop","dumbbell",{lowColor:void 0,threshold:0,connectorWidth:1,groupPadding:.2,pointPadding:.1,states:{hover:{lineWidthPlus:0,connectorWidthPlus:1,halo:!1}},tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b><br/>'}},{translatePoint:c.translate,drawPoint:c.drawPoints,drawDataLabels:d.drawDataLabels,setShapeArgs:d.translate},{pointSetState:c.pointClass.prototype.setState,setState:a.seriesTypes.dumbbell.prototype.pointClass.prototype.setState})});
b(a,"masters/modules/lollipop.src.js",[],function(){})});
//# sourceMappingURL=lollipop.js.map