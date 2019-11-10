/*
 Highcharts JS v7.1.2 (2019-06-03)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/full-screen",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,b))}a=a?a._modules:{};b(a,"modules/full-screen.src.js",[a["parts/Globals.js"]],function(a){a.FullScreen=function(a){this.init(a.parentNode)};a.FullScreen.prototype=
{init:function(a){a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen()}}});b(a,"masters/modules/full-screen.src.js",[],function(){})});
//# sourceMappingURL=full-screen.js.map