/*
 Highcharts JS v7.1.2 (2019-06-03)

 Old IE (v6, v7, v8) array polyfills for Highcharts v7+.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/oldie-polyfills",["highcharts"],function(f){e(f);e.Highcharts=f;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function f(c,b,a,d){c.hasOwnProperty(b)||(c[b]=d.apply(null,a))}e=e?e._modules:{};f(e,"modules/oldie-polyfills.src.js",[],function(){Array.prototype.forEach||(Array.prototype.forEach=function(c,b){for(var a=
0,d=this.length;a<d;a++)if(void 0!==this[a]&&!1===c.call(b,this[a],a,this))return a});Array.prototype.map||(Array.prototype.map=function(c){for(var b=[],a=0,d=this.length;a<d;a++)b[a]=c.call(this[a],this[a],a,this);return b});Array.prototype.indexOf||(Array.prototype.indexOf=function(c,b){var a=b||0;if(this)for(b=this.length;a<b;a++)if(this[a]===c)return a;return-1});Array.prototype.filter||(Array.prototype.filter=function(c){for(var b=[],a=0,d=this.length;a<d;a++)c(this[a],a)&&b.push(this[a]);return b});
Array.prototype.some||(Array.prototype.some=function(c,b){for(var a=0,d=this.length;a<d;a++)if(!0===c.call(b,this[a],a,this))return!0;return!1});Array.prototype.reduce||(Array.prototype.reduce=function(c,b){for(var a=1<arguments.length?0:1,d=1<arguments.length?b:this[0],e=this.length;a<e;++a)d=c.call(this,d,this[a],a,this);return d});Object.keys||(Object.keys=function(c){var b=[],a=Object.prototype.hasOwnProperty,d;for(d in c)a.call(c,d)&&b.push(d);return b})});f(e,"masters/modules/oldie-polyfills.src.js",
[],function(){})});
//# sourceMappingURL=oldie-polyfills.js.map