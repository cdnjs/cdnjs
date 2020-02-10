(function(factory){if (typeof define === 'function' && define.amd){define(['jquery'], factory);} else if (typeof module === 'object' && typeof module.exports === 'object'){module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function(jQuery){

/*! Parser: leading zeros - updated 4/2/2017 (v2.28.6) */
!function(){"use strict";var i=jQuery.tablesorter;i.addParser({id:"leadingZeros",is:function(){return!1},format:function(e,t){var r=(e||"").replace(i.regex.nondigit,""),n=i.formatFloat(r,t),a=n.toString();return isNaN(n)||n!=r||r.length===a.length||(n-=1e-10*(e.length-a.length)),n},type:"number"})}();return jQuery;}));
