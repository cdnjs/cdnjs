!/**
 * Highcharts JS v11.4.8 (2024-08-29)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/themes/sunset",["highcharts"],function(o){return e(o),e.Highcharts=o,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var o=e?e._modules:{};function t(o,t,n,s){o.hasOwnProperty(t)||(o[t]=s.apply(null,n),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:o[t]}})))}t(o,"Extensions/Themes/Sunset.js",[o["Core/Defaults.js"]],function(e){var o,t;let{setOptions:n}=e;return(t=o||(o={})).options={colors:["#FDD089","#FF7F79","#A0446E","#251535"],colorAxis:{maxColor:"#60042E",minColor:"#FDD089"},plotOptions:{map:{nullColor:"#fefefc"}},navigator:{series:{color:"#FF7F79",lineColor:"#A0446E"}}},t.apply=function(){n(t.options)},o}),t(o,"masters/themes/sunset.src.js",[o["Core/Globals.js"],o["Extensions/Themes/Sunset.js"]],function(e,o){return e.theme=o.options,o.apply(),e})});