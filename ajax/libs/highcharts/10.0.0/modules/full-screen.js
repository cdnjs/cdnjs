/*
 Highstock JS v10.0.0 (2022-03-07)

 Advanced Highcharts Stock tools

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/full-screen",["highcharts"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,c,d,f){a.hasOwnProperty(c)||(a[c]=f.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};
d(a,"Extensions/FullScreen.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Renderer/HTML/AST.js"],a["Core/Utilities.js"]],function(a,c,d,f){var g=f.addEvent;f=function(){function a(b){this.chart=b;this.isOpen=!1;b=b.renderTo;this.browserProps||("function"===typeof b.requestFullscreen?this.browserProps={fullscreenChange:"fullscreenchange",requestFullscreen:"requestFullscreen",exitFullscreen:"exitFullscreen"}:b.mozRequestFullScreen?this.browserProps={fullscreenChange:"mozfullscreenchange",
requestFullscreen:"mozRequestFullScreen",exitFullscreen:"mozCancelFullScreen"}:b.webkitRequestFullScreen?this.browserProps={fullscreenChange:"webkitfullscreenchange",requestFullscreen:"webkitRequestFullScreen",exitFullscreen:"webkitExitFullscreen"}:b.msRequestFullscreen&&(this.browserProps={fullscreenChange:"MSFullscreenChange",requestFullscreen:"msRequestFullscreen",exitFullscreen:"msExitFullscreen"}))}a.prototype.close=function(){var b=this.chart,a=b.options.chart;if(this.isOpen&&this.browserProps&&
b.container.ownerDocument instanceof Document)b.container.ownerDocument[this.browserProps.exitFullscreen]();this.unbindFullscreenEvent&&(this.unbindFullscreenEvent=this.unbindFullscreenEvent());b.setSize(this.origWidth,this.origHeight,!1);this.origHeight=this.origWidth=void 0;a.width=this.origWidthOption;a.height=this.origHeightOption;this.origHeightOption=this.origWidthOption=void 0;this.isOpen=!1;this.setButtonText()};a.prototype.open=function(){var b=this,a=b.chart,e=a.options.chart;e&&(b.origWidthOption=
e.width,b.origHeightOption=e.height);b.origWidth=a.chartWidth;b.origHeight=a.chartHeight;if(b.browserProps){var d=g(a.container.ownerDocument,b.browserProps.fullscreenChange,function(){b.isOpen?(b.isOpen=!1,b.close()):(a.setSize(null,null,!1),b.isOpen=!0,b.setButtonText())}),c=g(a,"destroy",d);b.unbindFullscreenEvent=function(){d();c()};if(e=a.renderTo[b.browserProps.requestFullscreen]())e["catch"](function(){alert("Full screen is not supported inside a frame.")})}};a.prototype.setButtonText=function(){var a=
this.chart,c=a.exportDivElements,e=a.options.exporting,f=e&&e.buttons&&e.buttons.contextButton.menuItems;a=a.options.lang;e&&e.menuItemDefinitions&&a&&a.exitFullscreen&&a.viewFullscreen&&f&&c&&(c=c[f.indexOf("viewFullscreen")])&&d.setElementHTML(c,this.isOpen?a.exitFullscreen:e.menuItemDefinitions.viewFullscreen.text||a.viewFullscreen)};a.prototype.toggle=function(){this.isOpen?this.close():this.open()};return a}();c.Fullscreen=f;g(a,"beforeRender",function(){this.fullscreen=new c.Fullscreen(this)});
return c.Fullscreen});d(a,"masters/modules/full-screen.src.js",[],function(){})});
//# sourceMappingURL=full-screen.js.map