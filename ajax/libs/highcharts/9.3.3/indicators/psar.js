/*
 Highstock JS v9.3.3 (2022-02-01)

 Parabolic SAR Indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,r,b,t){a.hasOwnProperty(r)||(a[r]=t.apply(null,b))}a=a?a._modules:{};b(a,"Stock/Indicators/PSAR/PSARIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,b){var r=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var h in a)a.hasOwnProperty(h)&&(c[h]=a[h])};return a(b,c)};return function(b,c){function h(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(h.prototype=c.prototype,new h)}}(),t=a.seriesTypes.sma,A=b.merge;b=b.extend;var q=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;
c.points=void 0;c.options=void 0;return c}r(b,a);b.prototype.getValues=function(a,b){var c=a.xData;a=a.yData;var f=a[0][1],h=b.maxAccelerationFactor,r=b.increment,t=b.initialAccelerationFactor,e=a[0][2],w=b.decimals,g=b.index,q=[],x=[],y=[],k=1,d;if(!(g>=a.length)){for(d=0;d<g;d++)f=Math.max(a[d][1],f),e=Math.min(a[d][2],parseFloat(e.toFixed(w)));var u=a[d][1]>e?1:-1;b=b.initialAccelerationFactor;var l=b*(f-e);q.push([c[g],e]);x.push(c[g]);y.push(parseFloat(e.toFixed(w)));for(d=g+1;d<a.length;d++){g=
a[d-1][2];var m=a[d-2][2];var v=a[d-1][1];var z=a[d-2][1];var n=a[d][1];var p=a[d][2];null!==m&&null!==z&&null!==g&&null!==v&&null!==n&&null!==p&&(e=u===k?1===u?e+l<Math.min(m,g)?e+l:Math.min(m,g):e+l>Math.max(z,v)?e+l:Math.max(z,v):f,g=1===u?n>f?n:f:p<f?p:f,n=1===k&&p>e||-1===k&&n>e?1:-1,k=n,l=g,p=r,m=h,v=t,b=k===u?1===k&&l>f?b===m?m:parseFloat((b+p).toFixed(2)):-1===k&&l<f?b===m?m:parseFloat((b+p).toFixed(2)):b:v,f=g-e,l=b*f,q.push([c[d],parseFloat(e.toFixed(w))]),x.push(c[d]),y.push(parseFloat(e.toFixed(w))),
k=u,u=n,f=g)}return{values:q,xData:x,yData:y}}};b.defaultOptions=A(t.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}});return b}(t);b(q.prototype,{nameComponents:void 0});a.registerSeriesType("psar",q);"";return q});b(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map