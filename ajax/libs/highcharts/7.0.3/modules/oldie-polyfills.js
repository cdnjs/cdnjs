/*
 Highcharts JS v7.0.3 (2019-02-06)
 Old IE (v6, v7, v8) array polyfills for Highcharts v7+.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define(function(){return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){(function(){Array.prototype.forEach||(Array.prototype.forEach=function(d,b){for(var a=0,c=this.length;a<c;a++)if(void 0!==this[a]&&!1===d.call(b,this[a],a,this))return a});Array.prototype.map||(Array.prototype.map=function(d){for(var b=[],a=0,c=this.length;a<c;a++)b[a]=d.call(this[a],
this[a],a,this);return b});Array.prototype.indexOf||(Array.prototype.indexOf=function(d,b){var a=b||0;if(this)for(b=this.length;a<b;a++)if(this[a]===d)return a;return-1});Array.prototype.filter||(Array.prototype.filter=function(d){for(var b=[],a=0,c=this.length;a<c;a++)d(this[a],a)&&b.push(this[a]);return b});Array.prototype.some||(Array.prototype.some=function(d,b){for(var a=0,c=this.length;a<c;a++)if(!0===d.call(b,this[a],a,this))return!0;return!1});Array.prototype.reduce||(Array.prototype.reduce=
function(d,b){for(var a=1<arguments.length?0:1,c=1<arguments.length?b:this[0],e=this.length;a<e;++a)c=d.call(this,c,this[a],a,this);return c});Object.keys||(Object.keys=function(d){var b=[],a=Object.prototype.hasOwnProperty,c;for(c in d)a.call(d,c)&&b.push(c);return b})})()});
//# sourceMappingURL=oldie-polyfills.js.map