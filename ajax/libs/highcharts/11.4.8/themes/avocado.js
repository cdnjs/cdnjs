!/**
 * Highcharts JS v11.4.8 (2024-08-29)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */function(o){"object"==typeof module&&module.exports?(o.default=o,module.exports=o):"function"==typeof define&&define.amd?define("highcharts/themes/avocado",["highcharts"],function(e){return o(e),o.Highcharts=e,o}):o("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(o){"use strict";var e=o?o._modules:{};function t(e,t,n,s){e.hasOwnProperty(t)||(e[t]=s.apply(null,n),"function"==typeof CustomEvent&&o.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}t(e,"Extensions/Themes/Avocado.js",[e["Core/Defaults.js"]],function(o){var e,t;let{setOptions:n}=o;return(t=e||(e={})).options={colors:["#F3E796","#95C471","#35729E","#251735"],colorAxis:{maxColor:"#05426E",minColor:"#F3E796"},plotOptions:{map:{nullColor:"#FCFEFE"}},navigator:{maskFill:"rgba(170, 205, 170, 0.5)",series:{color:"#95C471",lineColor:"#35729E"}}},t.apply=function(){n(t.options)},e}),t(e,"masters/themes/avocado.src.js",[e["Core/Globals.js"],e["Extensions/Themes/Avocado.js"]],function(o,e){return o.theme=e.options,e.apply(),o})});