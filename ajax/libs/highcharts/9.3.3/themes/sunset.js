/*
 Highcharts JS v9.3.3 (2022-02-01)

 (c) 2009-2021 Highsoft AS

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/sunset",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,b))}a=a?a._modules:{};b(a,"Extensions/Themes/Sunset.js",[a["Core/DefaultOptions.js"]],function(a){var b=a.setOptions,c;(function(a){a.options=
{colors:["#FDD089","#FF7F79","#A0446E","#251535"],colorAxis:{maxColor:"#60042E",minColor:"#FDD089"},plotOptions:{map:{nullColor:"#fefefc"}},navigator:{series:{color:"#FF7F79",lineColor:"#A0446E"}}};a.apply=function(){b(a.options)}})(c||(c={}));return c});b(a,"masters/themes/sunset.src.js",[a["Core/Globals.js"],a["Extensions/Themes/Sunset.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=sunset.js.map