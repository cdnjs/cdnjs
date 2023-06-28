/*
 Highstock JS v11.0.1 (2023-05-08)

 Parabolic SAR Indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,h,d,n){a.hasOwnProperty(h)||(a[h]=n.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:h,
module:a[h]}})))}a=a?a._modules:{};d(a,"Stock/Indicators/PSAR/PSARIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,h){const {sma:d}=a.seriesTypes;({merge:h}=h);class n extends d{constructor(){super(...arguments);this.options=this.points=this.nameComponents=this.data=void 0}getValues(a,e){const d=a.xData;a=a.yData;const h=e.maxAccelerationFactor,n=e.increment,z=e.initialAccelerationFactor,u=e.decimals;var f=e.index;const w=[],x=[],y=[];let p;var g=a[0][1],k=1;let v,
c=a[0][2];let b;if(!(f>=a.length)){for(b=0;b<f;b++)g=Math.max(a[b][1],g),c=Math.min(a[b][2],parseFloat(c.toFixed(u)));p=a[b][1]>c?1:-1;e=e.initialAccelerationFactor;var l=e*(g-c);w.push([d[f],c]);x.push(d[f]);y.push(parseFloat(c.toFixed(u)));for(b=f+1;b<a.length;b++){f=a[b-1][2];var m=a[b-2][2];var t=a[b-1][1];v=a[b-2][1];var q=a[b][1];var r=a[b][2];null!==m&&null!==v&&null!==f&&null!==t&&null!==q&&null!==r&&(c=p===k?1===p?c+l<Math.min(m,f)?c+l:Math.min(m,f):c+l>Math.max(v,t)?c+l:Math.max(v,t):g,
f=1===p?q>g?q:g:r<g?r:g,q=1===k&&r>c||-1===k&&q>c?1:-1,k=q,l=f,r=n,m=h,t=z,e=k===p?1===k&&l>g?e===m?m:parseFloat((e+r).toFixed(2)):-1===k&&l<g?e===m?m:parseFloat((e+r).toFixed(2)):e:t,g=f-c,l=e*g,w.push([d[b],parseFloat(c.toFixed(u))]),x.push(d[b]),y.push(parseFloat(c.toFixed(u))),k=p,p=q,g=f)}return{values:w,xData:x,yData:y}}}}n.defaultOptions=h(d.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,
increment:.02,index:2,decimals:4}});a.registerSeriesType("psar",n);"";return n});d(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map