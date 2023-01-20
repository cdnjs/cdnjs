/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/zigzag",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,e,d,m){a.hasOwnProperty(e)||(a[e]=m.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:a[e]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/Zigzag/ZigzagIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,e){var d=this&&this.__extends||function(){var a=function(h,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var l in b)Object.prototype.hasOwnProperty.call(b,l)&&(a[l]=b[l])};return a(h,b)};return function(h,b){function d(){this.constructor=h}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+
String(b)+" is not a constructor or null");a(h,b);h.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),m=a.seriesTypes.sma,t=e.merge;e=e.extend;var n=function(a){function h(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}d(h,a);h.prototype.getValues=function(a,d){var b=d.lowIndex,l=d.highIndex,k=d.deviation/100;d=1+k;var h=1-k;k=a.xData;var f=a.yData;a=f?f.length:0;var e=[],m=[],r=[],c,p,n=!1,q=!1;if(!(!k||1>=k.length||a&&
("undefined"===typeof f[0][b]||"undefined"===typeof f[0][l]))){var u=f[0][b];var v=f[0][l];for(c=1;c<a;c++){if(f[c][b]<=v*h){e.push([k[0],v]);var g=[k[c],f[c][b]];n=p=!0}else f[c][l]>=u*d&&(e.push([k[0],u]),g=[k[c],f[c][l]],p=!1,n=!0);if(n){m.push(e[0][0]);r.push(e[0][1]);var t=c++;c=a}}for(c=t;c<a;c++)p?(f[c][b]<=g[1]&&(g=[k[c],f[c][b]]),f[c][l]>=g[1]*d&&(q=l)):(f[c][l]>=g[1]&&(g=[k[c],f[c][l]]),f[c][b]<=g[1]*h&&(q=b)),!1!==q&&(e.push(g),m.push(g[0]),r.push(g[1]),g=[k[c],f[c][q]],p=!p,q=!1);b=e.length;
0!==b&&e[b-1][0]<k[a-1]&&(e.push(g),m.push(g[0]),r.push(g[1]));return{values:e,xData:m,yData:r}}};h.defaultOptions=t(m.defaultOptions,{params:{index:void 0,period:void 0,lowIndex:2,highIndex:1,deviation:1}});return h}(m);e(n.prototype,{nameComponents:["deviation"],nameSuffixes:["%"],nameBase:"Zig Zag"});a.registerSeriesType("zigzag",n);"";return n});d(a,"masters/indicators/zigzag.src.js",[],function(){})});
//# sourceMappingURL=zigzag.js.map