/*
 Highcharts JS v10.2.0 (2022-07-05)

 (c) 2009-2021 Highsoft AS

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/high-contrast-light",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:
{};b(a,"Extensions/Themes/HighContrastLight.js",[a["Core/DefaultOptions.js"]],function(a){var c=a.setOptions,b;(function(a){a.options={colors:"#265FB5 #222 #698F01 #F4693E #4C0684 #0FA388 #B7104A #AF9023 #1A704C #B02FDD".split(" "),navigator:{series:{color:"#5f98cf",lineColor:"#5f98cf"}}};a.apply=function(){c(a.options)}})(b||(b={}));return b});b(a,"masters/themes/high-contrast-light.src.js",[a["Core/Globals.js"],a["Extensions/Themes/HighContrastLight.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=high-contrast-light.js.map