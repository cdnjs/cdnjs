/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)Object.prototype.hasOwnProperty.call(c,e)&&(a[e]=c[e])};return a(b,c)};return function(b,c){function e(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(e.prototype=c.prototype,new e)}}(),g=a.seriesTypes.sma,m=b.extend,r=b.merge,t=b.isArray;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=a.xData,d=a.yData;a=[];var e=[],g=[],h=0,n=0,p=0,q=0,k=c.length,m=b.index;for(b=0;b<k;b++){var f=c[b];var l=t(d[b])?d[b][m]:d[b];h+=f;n+=l;p+=f*l;
q+=f*f}d=(k*p-h*n)/(k*q-h*h);isNaN(d)&&(d=0);h=(n-d*h)/k;for(b=0;b<k;b++)f=c[b],l=d*f+h,a[b]=[f,l],e[b]=f,g[b]=l;return{xData:e,yData:g,values:a}};b.defaultOptions=r(g.defaultOptions,{params:{period:void 0,index:3}});return b}(g);m(b.prototype,{nameBase:"Trendline",nameComponents:!1});a.registerSeriesType("trendline",b);"";return b});d(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map