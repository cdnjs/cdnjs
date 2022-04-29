/*
 Highcharts JS v10.1.0 (2022-04-29)

 (c) 2009-2021 Highsoft AS

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/avocado",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};b(a,"Extensions/Themes/Avocado.js",
[a["Core/DefaultOptions.js"]],function(a){var c=a.setOptions,b;(function(a){a.options={colors:["#F3E796","#95C471","#35729E","#251735"],colorAxis:{maxColor:"#05426E",minColor:"#F3E796"},plotOptions:{map:{nullColor:"#FCFEFE"}},navigator:{maskFill:"rgba(170, 205, 170, 0.5)",series:{color:"#95C471",lineColor:"#35729E"}}};a.apply=function(){c(a.options)}})(b||(b={}));return b});b(a,"masters/themes/avocado.src.js",[a["Core/Globals.js"],a["Extensions/Themes/Avocado.js"]],function(a,b){a.theme=b.options;
b.apply()})});
//# sourceMappingURL=avocado.js.map