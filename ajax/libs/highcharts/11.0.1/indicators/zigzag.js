/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/zigzag",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,h,d,n){a.hasOwnProperty(h)||(a[h]=n.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:h,
module:a[h]}})))}a=a?a._modules:{};d(a,"Stock/Indicators/Zigzag/ZigzagIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d){const {sma:h}=a.seriesTypes,{merge:n,extend:w}=d;class k extends h{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,d){var g=d.lowIndex;const m=d.highIndex;var f=d.deviation/100;d=1+f;var h=1-f;f=a.xData;const c=a.yData;a=c?c.length:0;const l=[],k=[],r=[];let b,n,e,p,t=!1,q=!1;if(!(!f||1>=f.length||a&&("undefined"===
typeof c[0][g]||"undefined"===typeof c[0][m]))){var u=c[0][g],v=c[0][m];for(b=1;b<a;b++)c[b][g]<=v*h?(l.push([f[0],v]),e=[f[b],c[b][g]],t=p=!0):c[b][m]>=u*d&&(l.push([f[0],u]),e=[f[b],c[b][m]],p=!1,t=!0),t&&(k.push(l[0][0]),r.push(l[0][1]),n=b++,b=a);for(b=n;b<a;b++)p?(c[b][g]<=e[1]&&(e=[f[b],c[b][g]]),c[b][m]>=e[1]*d&&(q=m)):(c[b][m]>=e[1]&&(e=[f[b],c[b][m]]),c[b][g]<=e[1]*h&&(q=g)),!1!==q&&(l.push(e),k.push(e[0]),r.push(e[1]),e=[f[b],c[b][q]],p=!p,q=!1);g=l.length;0!==g&&l[g-1][0]<f[a-1]&&(l.push(e),
k.push(e[0]),r.push(e[1]));return{values:l,xData:k,yData:r}}}}k.defaultOptions=n(h.defaultOptions,{params:{index:void 0,period:void 0,lowIndex:2,highIndex:1,deviation:1}});w(k.prototype,{nameComponents:["deviation"],nameSuffixes:["%"],nameBase:"Zig Zag"});a.registerSeriesType("zigzag",k);"";return k});d(a,"masters/indicators/zigzag.src.js",[],function(){})});
//# sourceMappingURL=zigzag.js.map