/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,d,e,l){a.hasOwnProperty(d)||(a[d]=l.apply(null,e))}a=a?a._modules:{};e(a,"Stock/Indicators/DPO/DPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,d){function e(a,b,c,g,t){b=q(b[c][g],b[c]);return t?m(a-b):m(a+b)}var l=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function g(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(g.prototype=c.prototype,new g)}}(),n=a.seriesTypes.sma,u=d.extend,v=d.merge,m=d.correctFloat,q=d.pick;
d=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.options=void 0;c.data=void 0;c.points=void 0;return c}l(b,a);b.prototype.getValues=function(a,b){var c=b.period;b=b.index;var d=c+Math.floor(c/2+1),g=a.xData||[];a=a.yData||[];var l=a.length,m=[],n=[],r=[],h=0,f,k;if(!(g.length<=d)){for(f=0;f<c-1;f++)h=e(h,a,f,b);for(k=0;k<=l-d;k++){var p=k+c-1;f=k+d-1;h=e(h,a,p,b);p=q(a[f][b],a[f]);p-=h/c;h=e(h,a,k,b,!0);m.push([g[f],p]);n.push(g[f]);r.push(p)}return{values:m,xData:n,yData:r}}};
b.defaultOptions=v(n.defaultOptions,{params:{index:0,period:21}});return b}(n);u(d.prototype,{nameBase:"DPO"});a.registerSeriesType("dpo",d);"";return d});e(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map