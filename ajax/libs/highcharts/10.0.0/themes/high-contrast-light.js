/*
 Highcharts JS v10.0.0 (2022-03-07)

 (c) 2009-2021 Highsoft AS

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/high-contrast-light",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:
{};b(a,"Extensions/Themes/HighContrastLight.js",[a["Core/DefaultOptions.js"]],function(a){var c=a.setOptions,b;(function(a){a.options={colors:"#4372da #222 #0b7383 #6B26F0 #D42D1A #3D239E #7e7932 #b06320 #244a76 #76767A".split(" "),navigator:{series:{color:"#5f98cf",lineColor:"#5f98cf"}}};a.apply=function(){c(a.options)}})(b||(b={}));return b});b(a,"masters/themes/high-contrast-light.src.js",[a["Core/Globals.js"],a["Extensions/Themes/HighContrastLight.js"]],function(a,b){a.theme=b.options;b.apply()})});
//# sourceMappingURL=high-contrast-light.js.map