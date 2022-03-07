/*
 Highcharts JS v10.0.0 (2022-03-07)

 (c) 2009-2021 Highsoft AS

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/sunset",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};b(a,"Extensions/Themes/Sunset.js",
[a["Core/DefaultOptions.js"]],function(a){var c=a.setOptions,b;(function(a){a.options={colors:["#FDD089","#FF7F79","#A0446E","#251535"],colorAxis:{maxColor:"#60042E",minColor:"#FDD089"},plotOptions:{map:{nullColor:"#fefefc"}},navigator:{series:{color:"#FF7F79",lineColor:"#A0446E"}}};a.apply=function(){c(a.options)}})(b||(b={}));return b});b(a,"masters/themes/sunset.src.js",[a["Core/Globals.js"],a["Extensions/Themes/Sunset.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=sunset.js.map