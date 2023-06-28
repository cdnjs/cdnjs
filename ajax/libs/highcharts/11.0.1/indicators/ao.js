/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,module:a[f]}})))}
a=a?a._modules:{};b(a,"Stock/Indicators/AO/AOIndicator.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,q){({noop:a}=a);const {column:{prototype:g},sma:f}=b.seriesTypes,{extend:r,merge:t,correctFloat:k,isArray:u}=q;class l extends f{constructor(){super(...arguments);this.points=this.options=this.data=void 0}drawGraph(){var a=this.options;const h=this.points,b=a.greaterBarColor;a=a.lowerBarColor;var d=h[0];if(!this.userOptions.color&&d)for(d.color=b,
d=1;d<h.length;d++)h[d].color=h[d].y>h[d-1].y?b:h[d].y<h[d-1].y?a:h[d-1].color}getValues(a){const b=a.xData||[];a=a.yData||[];const f=a.length,d=[],g=[],l=[];var c;let m=0,n=0;if(!(34>=b.length)&&u(a[0])&&4===a[0].length){for(c=0;33>c;c++){var e=(a[c][1]+a[c][2])/2;29<=c&&(n=k(n+e));m=k(m+e)}for(c=33;c<f;c++){e=(a[c][1]+a[c][2])/2;n=k(n+e);m=k(m+e);e=n/5;var p=m/34;e=k(e-p);d.push([b[c],e]);g.push(b[c]);l.push(e);e=c+1-5;p=c+1-34;n=k(n-(a[e][1]+a[e][2])/2);m=k(m-(a[p][1]+a[p][2])/2)}return{values:d,
xData:g,yData:l}}}}l.defaultOptions=t(f.defaultOptions,{params:{index:void 0,period:void 0},greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}});r(l.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:a,getColumnMetrics:g.getColumnMetrics,crispCol:g.crispCol,translate:g.translate,drawPoints:g.drawPoints});b.registerSeriesType("ao",l);"";return l});b(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map