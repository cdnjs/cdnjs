/*! Parser: dates - updated 10/26/2014 (v2.18.0) */
!function(a){"use strict";/*! Sugar (http://sugarjs.com/dates#comparing_dates) */
a.tablesorter.addParser({id:"sugar",is:function(){return!1},format:function(a){var b=Date.create?Date.create(a):a?new Date(a):a;return b instanceof Date&&isFinite(b)?b.getTime():a},type:"numeric"}),/*! Datejs (http://www.datejs.com/) */
a.tablesorter.addParser({id:"datejs",is:function(){return!1},format:function(a){var b=Date.parse?Date.parse(a):a?new Date(a):a;return b instanceof Date&&isFinite(b)?b.getTime():a},type:"numeric"})}(jQuery);