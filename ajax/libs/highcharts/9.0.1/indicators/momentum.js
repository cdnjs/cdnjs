/*
 Highstock JS v9.0.1 (2021-02-15)

 Indicator series type for Highstock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,e,f,g){a.hasOwnProperty(e)||(a[e]=g.apply(null,f))}a=a?a._modules:{};f(a,"Stock/Indicators/Momentum/MomentumIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,e){function f(a,c,b,d,p){b=b[d-1][3]-b[d-p-1][3];c=c[d-1];a.shift();return[c,b]}var g=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),n=a.seriesTypes.sma,q=e.extend,r=e.isArray,t=e.merge;
e=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}g(c,a);c.prototype.getValues=function(a,c){c=c.period;var b=a.xData,e=(a=a.yData)?a.length:0,d=b[0],g=[],l=[],m=[];if(!(b.length<=c)&&r(a[0])){var k=a[0][3];k=[[d,k]];for(d=c+1;d<e;d++){var h=f(k,b,a,d,c,void 0);g.push(h);l.push(h[0]);m.push(h[1])}h=f(k,b,a,d,c,void 0);g.push(h);l.push(h[0]);m.push(h[1]);return{values:g,xData:l,yData:m}}};c.defaultOptions=t(n.defaultOptions,
{params:{period:14}});return c}(n);q(e.prototype,{nameBase:"Momentum"});a.registerSeriesType("momentum",e);"";return e});f(a,"masters/indicators/momentum.src.js",[],function(){})});
//# sourceMappingURL=momentum.js.map