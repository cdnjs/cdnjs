/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawel Lysy

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/cmo",["highcharts","highcharts/modules/stock"],function(d){b(d);b.Highcharts=d;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function d(b,f,d,l){b.hasOwnProperty(f)||(b[f]=l.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:b[f]}})))}b=b?b._modules:{};d(b,"Stock/Indicators/CMO/CMOIndicator.js",[b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],function(b,d){const {sma:f}=b.seriesTypes,{isNumber:l,merge:q}=d;class k extends f{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(b,c){const d=c.period,f=b.xData;var e=b.yData;b=e?e.length:0;const k=[],m=[],n=[];var a;let p=c.index;if(!(f.length<d)){l(e[0])?c=e:(p=Math.min(p,e[0].length-1),c=e.map(a=>a[p]));var g=0,h=e=0;for(a=
d;0<a;a--)c[a]>c[a-1]?e+=c[a]-c[a-1]:c[a]<c[a-1]&&(h+=c[a-1]-c[a]);g=0<e+h?100*(e-h)/(e+h):0;m.push(f[d]);n.push(g);k.push([f[d],g]);for(a=d+1;a<b;a++)g=Math.abs(c[a-d-1]-c[a-d]),c[a]>c[a-1]?e+=c[a]-c[a-1]:c[a]<c[a-1]&&(h+=c[a-1]-c[a]),c[a-d]>c[a-d-1]?e-=g:h-=g,g=0<e+h?100*(e-h)/(e+h):0,m.push(f[a]),n.push(g),k.push([f[a],g]);return{values:k,xData:m,yData:n}}}}k.defaultOptions=q(f.defaultOptions,{params:{period:20,index:3}});b.registerSeriesType("cmo",k);"";return k});d(b,"masters/indicators/cmo.src.js",
[],function(){})});
//# sourceMappingURL=cmo.js.map