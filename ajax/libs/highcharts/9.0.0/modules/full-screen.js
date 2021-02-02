/*
 Highstock JS v9.0.0 (2021-02-02)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/full-screen",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,g,c,d){a.hasOwnProperty(g)||(a[g]=d.apply(null,c))}a=a?a._modules:{};c(a,"Extensions/FullScreen.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Renderer/HTML/AST.js"],a["Core/Utilities.js"]],
function(a,c,h,d){var f=d.addEvent;d=function(){function a(b){this.chart=b;this.isOpen=!1;b=b.renderTo;this.browserProps||("function"===typeof b.requestFullscreen?this.browserProps={fullscreenChange:"fullscreenchange",requestFullscreen:"requestFullscreen",exitFullscreen:"exitFullscreen"}:b.mozRequestFullScreen?this.browserProps={fullscreenChange:"mozfullscreenchange",requestFullscreen:"mozRequestFullScreen",exitFullscreen:"mozCancelFullScreen"}:b.webkitRequestFullScreen?this.browserProps={fullscreenChange:"webkitfullscreenchange",
requestFullscreen:"webkitRequestFullScreen",exitFullscreen:"webkitExitFullscreen"}:b.msRequestFullscreen&&(this.browserProps={fullscreenChange:"MSFullscreenChange",requestFullscreen:"msRequestFullscreen",exitFullscreen:"msExitFullscreen"}))}a.prototype.close=function(){var b=this.chart;if(this.isOpen&&this.browserProps&&b.container.ownerDocument instanceof Document)b.container.ownerDocument[this.browserProps.exitFullscreen]();this.unbindFullscreenEvent&&this.unbindFullscreenEvent();this.isOpen=!1;
this.setButtonText()};a.prototype.open=function(){var b=this,a=b.chart;if(b.browserProps){b.unbindFullscreenEvent=f(a.container.ownerDocument,b.browserProps.fullscreenChange,function(){b.isOpen?(b.isOpen=!1,b.close()):(b.isOpen=!0,b.setButtonText())});var c=a.renderTo[b.browserProps.requestFullscreen]();if(c)c["catch"](function(){alert("Full screen is not supported inside a frame.")});f(a,"destroy",b.unbindFullscreenEvent)}};a.prototype.setButtonText=function(){var b,a=this.chart,c=a.exportDivElements,
e=a.options.exporting,d=null===(b=null===e||void 0===e?void 0:e.buttons)||void 0===b?void 0:b.contextButton.menuItems;b=a.options.lang;(null===e||void 0===e?0:e.menuItemDefinitions)&&(null===b||void 0===b?0:b.exitFullscreen)&&b.viewFullscreen&&d&&c&&c.length&&h.setElementHTML(c[d.indexOf("viewFullscreen")],this.isOpen?b.exitFullscreen:e.menuItemDefinitions.viewFullscreen.text||b.viewFullscreen)};a.prototype.toggle=function(){this.isOpen?this.close():this.open()};return a}();c.Fullscreen=d;f(a,"beforeRender",
function(){this.fullscreen=new c.Fullscreen(this)});return c.Fullscreen});c(a,"masters/modules/full-screen.src.js",[],function(){})});
//# sourceMappingURL=full-screen.js.map