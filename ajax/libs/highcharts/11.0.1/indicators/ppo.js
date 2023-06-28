/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/PPO/PPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {ema:c}=a.seriesTypes,{correctFloat:g,extend:h,merge:l,error:m}=b;class f extends c{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(a,b){var d=b.periods,e=b.index;b=[];const c=[],f=[];if(2!==d.length||d[1]<=d[0])m('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');
else{var k=super.getValues.call(this,a,{index:e,period:d[0]});a=super.getValues.call(this,a,{index:e,period:d[1]});if(k&&a){var h=d[1]-d[0];for(e=0;e<a.yData.length;e++)d=g((k.yData[e+h]-a.yData[e])/a.yData[e]*100),b.push([a.xData[e],d]),c.push(a.xData[e]),f.push(d);return{values:b,xData:c,yData:f}}}}}f.defaultOptions=l(c.defaultOptions,{params:{period:void 0,periods:[12,26]}});h(f.prototype,{nameBase:"PPO",nameComponents:["periods"]});a.registerSeriesType("ppo",f);"";return f});b(a,"masters/indicators/ppo.src.js",
[],function(){})});
//# sourceMappingURL=ppo.js.map