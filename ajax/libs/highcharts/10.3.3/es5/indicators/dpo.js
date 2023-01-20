/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,d,e,g){a.hasOwnProperty(d)||(a[d]=g.apply(null,e),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,module:a[d]}})))}
a=a?a._modules:{};e(a,"Stock/Indicators/DPO/DPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d){function e(a,c,b,t,d){c=p(c[b][t],c[b]);return d?n(a-c):n(a+c)}var g=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}if("function"!==
typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),l=a.seriesTypes.sma,u=d.extend,v=d.merge,n=d.correctFloat,p=d.pick;d=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.options=void 0;b.data=void 0;b.points=void 0;return b}g(c,a);c.prototype.getValues=function(a,c){var b=c.period;c=c.index;var d=b+Math.floor(b/2+1),g=a.xData||[];a=a.yData||
[];var n=a.length,l=[],q=[],r=[],f,k,h=0;if(!(g.length<=d)){for(f=0;f<b-1;f++)h=e(h,a,f,c);for(k=0;k<=n-d;k++){var m=k+b-1;f=k+d-1;h=e(h,a,m,c);m=p(a[f][c],a[f]);m-=h/b;h=e(h,a,k,c,!0);l.push([g[f],m]);q.push(g[f]);r.push(m)}return{values:l,xData:q,yData:r}}};c.defaultOptions=v(l.defaultOptions,{params:{index:0,period:21}});return c}(l);u(d.prototype,{nameBase:"DPO"});a.registerSeriesType("dpo",d);"";return d});e(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map