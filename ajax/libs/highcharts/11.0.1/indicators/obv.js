/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Karol Kolodziej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/obv",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,k){a.hasOwnProperty(c)||(a[c]=k.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/OBV/OBVIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {sma:c}=a.seriesTypes,{isNumber:k,error:q,extend:r,merge:t}=b;class d extends c{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,b){var c=a.chart.get(b.volumeSeriesID);const d=a.xData,f=a.yData,l=[],m=[],n=[],p=!k(f[0]);let e=1;var g=0;let h;if(c){c=c.yData;a=[d[0],g];h=p?f[0][3]:f[0];l.push(a);m.push(d[0]);
n.push(a[1]);for(e;e<f.length;e++)b=p?f[e][3]:f[e],g=b>h?g+c[e]:b===h?g:g-c[e],a=[d[e],g],h=b,l.push(a),m.push(d[e]),n.push(a[1]);return{values:l,xData:m,yData:n}}q("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,a.chart)}}d.defaultOptions=t(c.defaultOptions,{marker:{enabled:!1},params:{index:void 0,period:void 0,volumeSeriesID:"volume"},tooltip:{valueDecimals:0}});r(d.prototype,{nameComponents:void 0});a.registerSeriesType("obv",d);"";return d});b(a,"masters/indicators/obv.src.js",
[],function(){})});
//# sourceMappingURL=obv.js.map