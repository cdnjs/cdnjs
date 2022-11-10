/*
 Highstock JS v10.3.1 (2022-10-31)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(c){b(c);b.Highcharts=c;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function c(b,a,c,g){b.hasOwnProperty(a)||(b[a]=g.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:a,module:b[a]}})))}
b=b?b._modules:{};c(b,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],function(b,a){var c=this&&this.__extends||function(){var b=function(a,d){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,d){b.__proto__=d}||function(b,d){for(var e in d)d.hasOwnProperty(e)&&(b[e]=d[e])};return b(a,d)};return function(a,d){function e(){this.constructor=a}b(a,d);a.prototype=null===d?Object.create(d):(e.prototype=d.prototype,new e)}}(),
g=b.seriesTypes.sma,m=a.extend,r=a.merge,t=a.isArray;a=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}c(a,b);a.prototype.getValues=function(b,a){var d=b.xData,c=b.yData;b=[];var e=[],g=[],h=0,n=0,p=0,q=0,k=d.length,m=a.index;for(a=0;a<k;a++){var f=d[a];var l=t(c[a])?c[a][m]:c[a];h+=f;n+=l;p+=f*l;q+=f*f}c=(k*p-h*n)/(k*q-h*h);isNaN(c)&&(c=0);h=(n-c*h)/k;for(a=0;a<k;a++)f=d[a],l=c*f+h,b[a]=[f,l],e[a]=f,g[a]=l;return{xData:e,
yData:g,values:b}};a.defaultOptions=r(g.defaultOptions,{params:{period:void 0,index:3}});return a}(g);m(a.prototype,{nameBase:"Trendline",nameComponents:!1});b.registerSeriesType("trendline",a);"";return a});c(b,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map