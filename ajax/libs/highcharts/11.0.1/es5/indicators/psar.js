/*
 Highstock JS v11.0.1 (2023-05-08)

 Parabolic SAR Indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,l,k,m){a.hasOwnProperty(l)||(a[l]=m.apply(null,k),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:l,
module:a[l]}})))}a=a?a._modules:{};k(a,"Stock/Indicators/PSAR/PSARIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,l){var k=this&&this.__extends||function(){var a=function(h,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c])};return a(h,b)};return function(h,b){function c(){this.constructor=h}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+
String(b)+" is not a constructor or null");a(h,b);h.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),m=a.seriesTypes.sma,A=l.merge;l=function(a){function h(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.nameComponents=void 0;b.points=void 0;b.options=void 0;return b}k(h,a);h.prototype.getValues=function(a,c){var b=a.xData;a=a.yData;var h=c.maxAccelerationFactor,k=c.increment,l=c.initialAccelerationFactor,m=c.decimals,f=c.index,w=[],x=[],y=[],g=a[0][1],n=1,e=
a[0][2],d;if(!(f>=a.length)){for(d=0;d<f;d++)g=Math.max(a[d][1],g),e=Math.min(a[d][2],parseFloat(e.toFixed(m)));var u=a[d][1]>e?1:-1;c=c.initialAccelerationFactor;var p=c*(g-e);w.push([b[f],e]);x.push(b[f]);y.push(parseFloat(e.toFixed(m)));for(d=f+1;d<a.length;d++){f=a[d-1][2];var q=a[d-2][2];var v=a[d-1][1];var z=a[d-2][1];var r=a[d][1];var t=a[d][2];null!==q&&null!==z&&null!==f&&null!==v&&null!==r&&null!==t&&(e=u===n?1===u?e+p<Math.min(q,f)?e+p:Math.min(q,f):e+p>Math.max(z,v)?e+p:Math.max(z,v):
g,f=1===u?r>g?r:g:t<g?t:g,r=1===n&&t>e||-1===n&&r>e?1:-1,n=r,p=f,t=k,q=h,v=l,c=n===u?1===n&&p>g?c===q?q:parseFloat((c+t).toFixed(2)):-1===n&&p<g?c===q?q:parseFloat((c+t).toFixed(2)):c:v,g=f-e,p=c*g,w.push([b[d],parseFloat(e.toFixed(m))]),x.push(b[d]),y.push(parseFloat(e.toFixed(m))),n=u,u=r,g=f)}return{values:w,xData:x,yData:y}}};h.defaultOptions=A(m.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,
increment:.02,index:2,decimals:4}});return h}(m);a.registerSeriesType("psar",l);"";return l});k(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map