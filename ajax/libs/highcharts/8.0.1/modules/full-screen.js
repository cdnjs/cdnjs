/*
 Highstock JS v8.0.1 (2020-03-02)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/full-screen",["highcharts"],function(c){b(c);b.Highcharts=c;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function c(b,c,e,f){b.hasOwnProperty(c)||(b[c]=f.apply(null,e))}b=b?b._modules:{};c(b,"modules/full-screen.src.js",[b["parts/Globals.js"]],function(b){var c=b.addEvent,e=b.Chart,f=function(){function c(a){this.chart=
a;this.isOpen=!1;a.container.parentNode instanceof Element&&(a=a.container.parentNode,this.browserProps||("function"===typeof a.requestFullscreen?this.browserProps={fullscreenChange:"fullscreenchange",requestFullscreen:"requestFullscreen",exitFullscreen:"exitFullscreen"}:a.mozRequestFullScreen?this.browserProps={fullscreenChange:"mozfullscreenchange",requestFullscreen:"mozRequestFullScreen",exitFullscreen:"mozCancelFullScreen"}:a.webkitRequestFullScreen?this.browserProps={fullscreenChange:"webkitfullscreenchange",
requestFullscreen:"webkitRequestFullScreen",exitFullscreen:"webkitExitFullscreen"}:a.msRequestFullscreen&&(this.browserProps={fullscreenChange:"MSFullscreenChange",requestFullscreen:"msRequestFullscreen",exitFullscreen:"msExitFullscreen"})))}c.prototype.close=function(){var a=this.chart;if(this.isOpen&&this.browserProps&&a.container.ownerDocument instanceof Document)a.container.ownerDocument[this.browserProps.exitFullscreen]();this.unbindFullscreenEvent&&this.unbindFullscreenEvent();this.isOpen=!1;
this.setButtonText()};c.prototype.open=function(){var a=this,c=a.chart;if(a.browserProps){a.unbindFullscreenEvent=b.addEvent(c.container.ownerDocument,a.browserProps.fullscreenChange,function(){a.isOpen?(a.isOpen=!1,a.close()):(a.isOpen=!0,a.setButtonText())});if(c.container.parentNode instanceof Element){var g=c.container.parentNode[a.browserProps.requestFullscreen]();if(g)g["catch"](function(){alert("Full screen is not supported inside a frame.")})}b.addEvent(c,"destroy",a.unbindFullscreenEvent)}};
c.prototype.setButtonText=function(){var a,b=this.chart,c=b.exportDivElements,d=b.options.exporting,e=null===(a=null===d||void 0===d?void 0:d.buttons)||void 0===a?void 0:a.contextButton.menuItems;a=b.options.lang;(null===d||void 0===d?0:d.menuItemDefinitions)&&(null===a||void 0===a?0:a.exitFullscreen)&&a.viewFullscreen&&e&&c&&c.length&&(c[e.indexOf("viewFullscreen")].innerHTML=this.isOpen?a.exitFullscreen:d.menuItemDefinitions.viewFullscreen.text||a.viewFullscreen)};c.prototype.toggle=function(){this.isOpen?
this.close():this.open()};return c}();b.Fullscreen=f;c(e,"beforeRender",function(){this.fullscreen=new b.Fullscreen(this)});return b.Fullscreen});c(b,"masters/modules/full-screen.src.js",[],function(){})});
//# sourceMappingURL=full-screen.js.map