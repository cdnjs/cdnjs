/*
 Highcharts JS v7.1.2 (2019-06-03)

 CurrentDateIndicator

 (c) 2010-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/current-date-indicator",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,e))}a=a?a._modules:{};b(a,"parts-gantt/CurrentDateIndicator.js",[a["parts/Globals.js"]],function(a){var b=a.addEvent,e=a.PlotLineOrBand,d=
a.merge,f={currentDateIndicator:!0,color:"#ccd6eb",width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:void 0,rotation:0,style:{fontSize:"10px"}}};b(a.Axis,"afterSetOptions",function(){var a=this.options,c=a.currentDateIndicator;c&&("object"===typeof c?(c.label&&c.label.format&&(c.label.formatter=void 0),c=d(f,c)):c=d(f),c.value=new Date,a.plotLines||(a.plotLines=[]),a.plotLines.push(c))});b(e,"render",function(){var b=this.options,c,d;b.currentDateIndicator&&b.label&&(c=b.label.format,d=b.label.formatter,
b.value=new Date,b.label.text="function"===typeof d?d(this):a.dateFormat(c,new Date),this.label&&this.label.attr({text:b.label.text}))})});b(a,"masters/modules/current-date-indicator.src.js",[],function(){})});
//# sourceMappingURL=current-date-indicator.js.map