(function(factory){if (typeof define === 'function' && define.amd){define(['jquery'], factory);} else if (typeof module === 'object' && typeof module.exports === 'object'){module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function(jQuery){

/*! Parser: jQuery Globalize - updated 11/2/2015 (v2.24.1) */
!function(b){"use strict";
/*! jQuery Globalize date parser (https://github.com/jquery/globalize#date-module) */b.tablesorter.addParser({id:"globalize-date",is:function(){return!1},format:function(e,l,a,o){var r,i,t=l.config,n=t.globalize&&(t.globalize[o]||t.globalize)||{};return Globalize&&(r="object"==typeof n.Globalize?n.Globalize:Globalize(n.lang||"en"),n.Globalize||(n.Globalize=r)),(i=r&&r.dateParser?r.dateParser(n)(e):e?new Date(e):e)instanceof Date&&isFinite(i)?i.getTime():e},type:"numeric"}),
/*! jQuery Globalize number parser (https://github.com/jquery/globalize#number-module) */
b.tablesorter.addParser({id:"globalize-number",is:function(){return!1},format:function(e,l,a,o){var r,i,t=l.config,n=t.globalize&&(t.globalize[o]||t.globalize)||{};return Globalize&&(r="object"==typeof n.Globalize?n.Globalize:Globalize(n.lang||"en"),n.Globalize||(n.Globalize=r)),i=r&&r.numberParser?r.numberParser(n)(e):e?b.tablesorter.formatFloat((e||"").replace(/[^\w,. \-()]/g,""),l):e,e&&"number"==typeof i?i:e},type:"numeric"})}(jQuery);return jQuery;}));
