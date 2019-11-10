(function(factory){if (typeof define === 'function' && define.amd){define(['jquery'], factory);} else if (typeof module === 'object' && typeof module.exports === 'object'){module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function(jQuery){

/*! Parser: Extract out date - updated 10/26/2014 (v2.18.0) */
!function(e){"use strict";var a=/[A-Z]{3,10}\.?\s+\d{1,2},?\s+(?:\d{4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+[AP]M)?)?/i,n=/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,i=/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,s=/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,d=/(\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,c=/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/;
/*! extract US Long Date */e.tablesorter.addParser({id:"extractUSLongDate",is:function(){return!1},format:function(e){var t,r=e?e.match(a):e;return r&&(t=new Date(r[0]))instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"}),
/*! extract MMDDYYYY */
e.tablesorter.addParser({id:"extractMMDDYYYY",is:function(){return!1},format:function(e){var t,r=e?e.replace(/\s+/g," ").replace(/[\-.,]/g,"/").match(n):e;return r&&(t=new Date(r[0]))instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"}),
/*! extract DDMMYYYY */
e.tablesorter.addParser({id:"extractDDMMYYYY",is:function(){return!1},format:function(e){var t,r=e?e.replace(/\s+/g," ").replace(/[\-.,]/g,"/").match(i):e;return r&&(t=new Date(r[0].replace(s,"$2/$1/$3")))instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"}),
/*! extract YYYYMMDD */
e.tablesorter.addParser({id:"extractYYYYMMDD",is:function(){return!1},format:function(e){var t,r=e?e.replace(/\s+/g," ").replace(/[\-.,]/g,"/").match(d):e;return r&&(t=new Date(r[0].replace(c,"$2/$3/$1")))instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"})}(jQuery);return jQuery;}));
