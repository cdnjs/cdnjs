/*
 Highstock JS v10.1.0 (2022-04-29)

 Parabolic SAR Indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,l,k,m){a.hasOwnProperty(l)||(a[l]=m.apply(null,k),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:l,module:a[l]}})))}
a=a?a._modules:{};k(a,"Stock/Indicators/PSAR/PSARIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,l){var k=this&&this.__extends||function(){var a=function(h,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var b in a)a.hasOwnProperty(b)&&(c[b]=a[b])};return a(h,c)};return function(h,c){function b(){this.constructor=h}a(h,c);h.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}}(),m=a.seriesTypes.sma,
A=l.merge;l=l.extend;var u=function(a){function h(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.points=void 0;c.options=void 0;return c}k(h,a);h.prototype.getValues=function(a,b){var c=a.xData;a=a.yData;var f=a[0][1],h=b.maxAccelerationFactor,k=b.increment,l=b.initialAccelerationFactor,e=a[0][2],m=b.decimals,g=b.index,u=[],x=[],y=[],n=1,d;if(!(g>=a.length)){for(d=0;d<g;d++)f=Math.max(a[d][1],f),e=Math.min(a[d][2],parseFloat(e.toFixed(m)));var v=a[d][1]>e?1:-1;b=b.initialAccelerationFactor;
var p=b*(f-e);u.push([c[g],e]);x.push(c[g]);y.push(parseFloat(e.toFixed(m)));for(d=g+1;d<a.length;d++){g=a[d-1][2];var q=a[d-2][2];var w=a[d-1][1];var z=a[d-2][1];var r=a[d][1];var t=a[d][2];null!==q&&null!==z&&null!==g&&null!==w&&null!==r&&null!==t&&(e=v===n?1===v?e+p<Math.min(q,g)?e+p:Math.min(q,g):e+p>Math.max(z,w)?e+p:Math.max(z,w):f,g=1===v?r>f?r:f:t<f?t:f,r=1===n&&t>e||-1===n&&r>e?1:-1,n=r,p=g,t=k,q=h,w=l,b=n===v?1===n&&p>f?b===q?q:parseFloat((b+t).toFixed(2)):-1===n&&p<f?b===q?q:parseFloat((b+
t).toFixed(2)):b:w,f=g-e,p=b*f,u.push([c[d],parseFloat(e.toFixed(m))]),x.push(c[d]),y.push(parseFloat(e.toFixed(m))),n=v,v=r,f=g)}return{values:u,xData:x,yData:y}}};h.defaultOptions=A(m.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}});return h}(m);l(u.prototype,{nameComponents:void 0});a.registerSeriesType("psar",u);"";return u});k(a,"masters/indicators/psar.src.js",
[],function(){})});
//# sourceMappingURL=psar.js.map