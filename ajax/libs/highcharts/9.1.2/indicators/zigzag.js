/*
 Highstock JS v9.1.2 (2021-06-16)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/zigzag",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,m,b,h){a.hasOwnProperty(m)||(a[m]=h.apply(null,b))}a=a?a._modules:{};b(a,"Stock/Indicators/Zigzag/ZigzagIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,b){var m=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function p(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(p.prototype=c.prototype,new p)}}(),h=a.seriesTypes.sma,u=b.merge;b=b.extend;var n=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;
b.points=void 0;b.options=void 0;return b}m(b,a);b.prototype.getValues=function(a,b){var c=b.lowIndex,l=b.highIndex,g=b.deviation/100;b=1+g;var m=1-g;g=a.xData;var e=a.yData;a=e?e.length:0;var k=[],h=[],t=[],d,q,n=!1,r=!1;if(!(!g||1>=g.length||a&&("undefined"===typeof e[0][c]||"undefined"===typeof e[0][l]))){var p=e[0][c];var v=e[0][l];for(d=1;d<a;d++){if(e[d][c]<=v*m){k.push([g[0],v]);var f=[g[d],e[d][c]];n=q=!0}else e[d][l]>=p*b&&(k.push([g[0],p]),f=[g[d],e[d][l]],q=!1,n=!0);if(n){h.push(k[0][0]);
t.push(k[0][1]);var u=d++;d=a}}for(d=u;d<a;d++)q?(e[d][c]<=f[1]&&(f=[g[d],e[d][c]]),e[d][l]>=f[1]*b&&(r=l)):(e[d][l]>=f[1]&&(f=[g[d],e[d][l]]),e[d][c]<=f[1]*m&&(r=c)),!1!==r&&(k.push(f),h.push(f[0]),t.push(f[1]),f=[g[d],e[d][r]],q=!q,r=!1);c=k.length;0!==c&&k[c-1][0]<g[a-1]&&(k.push(f),h.push(f[0]),t.push(f[1]));return{values:k,xData:h,yData:t}}};b.defaultOptions=u(h.defaultOptions,{params:{index:void 0,period:void 0,lowIndex:2,highIndex:1,deviation:1}});return b}(h);b(n.prototype,{nameComponents:["deviation"],
nameSuffixes:["%"],nameBase:"Zig Zag"});a.registerSeriesType("zigzag",n);"";return n});b(a,"masters/indicators/zigzag.src.js",[],function(){})});
//# sourceMappingURL=zigzag.js.map