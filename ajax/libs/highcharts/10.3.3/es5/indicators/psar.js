/*
 Highstock JS v10.3.3 (2023-01-20)

 Parabolic SAR Indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,l,k,m){a.hasOwnProperty(l)||(a[l]=m.apply(null,k),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:l,module:a[l]}})))}
a=a?a._modules:{};k(a,"Stock/Indicators/PSAR/PSARIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,l){var k=this&&this.__extends||function(){var a=function(h,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c])};return a(h,b)};return function(h,b){function c(){this.constructor=h}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+
String(b)+" is not a constructor or null");a(h,b);h.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),m=a.seriesTypes.sma,A=l.merge;l=l.extend;var u=function(a){function h(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}k(h,a);h.prototype.getValues=function(a,c){var b=a.xData;a=a.yData;var f=a[0][1],h=c.maxAccelerationFactor,k=c.increment,l=c.initialAccelerationFactor,e=a[0][2],m=c.decimals,g=c.index,u=[],x=[],y=[],n=1,
d;if(!(g>=a.length)){for(d=0;d<g;d++)f=Math.max(a[d][1],f),e=Math.min(a[d][2],parseFloat(e.toFixed(m)));var v=a[d][1]>e?1:-1;c=c.initialAccelerationFactor;var p=c*(f-e);u.push([b[g],e]);x.push(b[g]);y.push(parseFloat(e.toFixed(m)));for(d=g+1;d<a.length;d++){g=a[d-1][2];var q=a[d-2][2];var w=a[d-1][1];var z=a[d-2][1];var r=a[d][1];var t=a[d][2];null!==q&&null!==z&&null!==g&&null!==w&&null!==r&&null!==t&&(e=v===n?1===v?e+p<Math.min(q,g)?e+p:Math.min(q,g):e+p>Math.max(z,w)?e+p:Math.max(z,w):f,g=1===
v?r>f?r:f:t<f?t:f,r=1===n&&t>e||-1===n&&r>e?1:-1,n=r,p=g,t=k,q=h,w=l,c=n===v?1===n&&p>f?c===q?q:parseFloat((c+t).toFixed(2)):-1===n&&p<f?c===q?q:parseFloat((c+t).toFixed(2)):c:w,f=g-e,p=c*f,u.push([b[d],parseFloat(e.toFixed(m))]),x.push(b[d]),y.push(parseFloat(e.toFixed(m))),n=v,v=r,f=g)}return{values:u,xData:x,yData:y}}};h.defaultOptions=A(m.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,
increment:.02,index:2,decimals:4}});return h}(m);l(u.prototype,{nameComponents:void 0});a.registerSeriesType("psar",u);"";return u});k(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map