/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,d,e,g){a.hasOwnProperty(d)||(a[d]=g.apply(null,e),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,module:a[d]}})))}
a=a?a._modules:{};e(a,"Stock/Indicators/DPO/DPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d){function e(a,b,c,t,d){b=p(b[c][t],b[c]);return d?n(a-b):n(a+b)}var g=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===
c?Object.create(c):(d.prototype=c.prototype,new d)}}(),l=a.seriesTypes.sma,u=d.extend,v=d.merge,n=d.correctFloat,p=d.pick;d=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.options=void 0;c.data=void 0;c.points=void 0;return c}g(b,a);b.prototype.getValues=function(a,b){var c=b.period;b=b.index;var d=c+Math.floor(c/2+1),g=a.xData||[];a=a.yData||[];var n=a.length,l=[],q=[],r=[],h=0,f,k;if(!(g.length<=d)){for(f=0;f<c-1;f++)h=e(h,a,f,b);for(k=0;k<=n-d;k++){var m=k+c-1;f=k+d-1;
h=e(h,a,m,b);m=p(a[f][b],a[f]);m-=h/c;h=e(h,a,k,b,!0);l.push([g[f],m]);q.push(g[f]);r.push(m)}return{values:l,xData:q,yData:r}}};b.defaultOptions=v(l.defaultOptions,{params:{index:0,period:21}});return b}(l);u(d.prototype,{nameBase:"DPO"});a.registerSeriesType("dpo",d);"";return d});e(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map