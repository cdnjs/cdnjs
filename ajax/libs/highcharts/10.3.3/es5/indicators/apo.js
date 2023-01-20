/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/APO/APOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)Object.prototype.hasOwnProperty.call(c,b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),f=a.seriesTypes.ema,l=b.extend,m=b.merge,n=b.error;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.periods,d=b.index;b=[];var g=[],h=[],e;if(2!==c.length||c[1]<=c[0])n('Error: "APO requires two periods. Notice, first period should be lower than the second one."');
else{var k=f.prototype.getValues.call(this,a,{index:d,period:c[0]});a=f.prototype.getValues.call(this,a,{index:d,period:c[1]});if(k&&a){c=c[1]-c[0];for(e=0;e<a.yData.length;e++)d=k.yData[e+c]-a.yData[e],b.push([a.xData[e],d]),g.push(a.xData[e]),h.push(d);return{values:b,xData:g,yData:h}}}};b.defaultOptions=m(f.defaultOptions,{params:{period:void 0,periods:[10,20]}});return b}(f);l(b.prototype,{nameBase:"APO",nameComponents:["periods"]});a.registerSeriesType("apo",b);"";return b});d(a,"masters/indicators/apo.src.js",
[],function(){})});
//# sourceMappingURL=apo.js.map