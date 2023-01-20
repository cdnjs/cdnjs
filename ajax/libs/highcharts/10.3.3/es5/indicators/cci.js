/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,b,e,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,e),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};e(a,"Stock/Indicators/CCI/CCIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){function e(a){return a.reduce(function(a,c){return a+c},0)}var g=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)Object.prototype.hasOwnProperty.call(c,b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function h(){this.constructor=b}if("function"!==
typeof c&&null!==c)throw new TypeError("Class extends value "+String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(h.prototype=c.prototype,new h)}}(),k=a.seriesTypes.sma,u=b.isArray,p=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.points=void 0;c.options=void 0;return c}g(b,a);b.prototype.getValues=function(a,b){b=b.period;var c=a.xData,g=(a=a.yData)?a.length:0,q=[],h=[],k=[],r=[],f=1;if(!(c.length<=b)&&u(a[0])&&
4===a[0].length){for(;f<b;){var d=a[f-1];q.push((d[1]+d[2]+d[3])/3);f++}for(f=b;f<=g;f++){d=a[f-1];d=(d[1]+d[2]+d[3])/3;var m=q.push(d);var l=q.slice(m-b);m=e(l)/b;var n,p=l.length,t=0;for(n=0;n<p;n++)t+=Math.abs(m-l[n]);l=t/b;d=(d-m)/(.015*l);h.push([c[f-1],d]);k.push(c[f-1]);r.push(d)}return{values:h,xData:k,yData:r}}};b.defaultOptions=p(k.defaultOptions,{params:{index:void 0}});return b}(k);a.registerSeriesType("cci",b);"";return b});e(a,"masters/indicators/cci.src.js",[],function(){})});
//# sourceMappingURL=cci.js.map