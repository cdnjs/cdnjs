/*! Widget: storage - updated 3/26/2015 (v2.21.3) */
;(function ($, window, document) {
'use strict';

var ts = $.tablesorter = $.tablesorter || {};
// *** Store data in local storage, with a cookie fallback ***
/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
   if you need it, then include https://github.com/douglascrockford/JSON-js

   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
   versions will only allow storing information for one page at a time

   // *** Save data (JSON format only) ***
   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
   // $.tablesorter.storage(table, key, val);
   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

   // *** Get data: $.tablesorter.storage(table, key); ***
   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
   // val may be empty, so also check for your data
   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
   alert(val); // "data1" if saved, or "" if not
*/
ts.storage = function(table, key, value, options) {
	table = $(table)[0];
	var cookieIndex, cookies, date,
		hasStorage = false,
		values = {},
		c = table.config,
		wo = c && c.widgetOptions,
		storageType = ( options && options.useSessionStorage ) || ( wo && wo.storage_useSessionStorage ) ?
			'sessionStorage' : 'localStorage',
		$table = $(table),
		// id from (1) options ID, (2) table "data-table-group" attribute, (3) widgetOptions.storage_tableId,
		// (4) table ID, then (5) table index
		id = options && options.id ||
			$table.attr( options && options.group || wo && wo.storage_group || 'data-table-group') ||
			wo && wo.storage_tableId || table.id || $('.tablesorter').index( $table ),
		// url from (1) options url, (2) table "data-table-page" attribute, (3) widgetOptions.storage_fixedUrl,
		// (4) table.config.fixedUrl (deprecated), then (5) window location path
		url = options && options.url ||
			$table.attr(options && options.page || wo && wo.storage_page || 'data-table-page') ||
			wo && wo.storage_fixedUrl || c && c.fixedUrl || window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if (storageType in window) {
		try {
			window[storageType].setItem('_tmptest', 'temp');
			hasStorage = true;
			window[storageType].removeItem('_tmptest');
		} catch(error) {
			if (c && c.debug) {
				ts.log( storageType + ' is not supported in this browser' );
			}
		}
	}
	// *** get value ***
	if ($.parseJSON) {
		if (hasStorage) {
			values = $.parseJSON( window[storageType][key] || 'null' ) || {};
		} else {
			// old browser, using cookies
			cookies = document.cookie.split(/[;\s|=]/);
			// add one to get from the key to the value
			cookieIndex = $.inArray(key, cookies) + 1;
			values = (cookieIndex !== 0) ? $.parseJSON(cookies[cookieIndex] || 'null') || {} : {};
		}
	}
	// allow value to be an empty string too
	if ((value || value === '') && window.JSON && JSON.hasOwnProperty('stringify')) {
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!values[url]) {
			values[url] = {};
		}
		values[url][id] = value;
		// *** set value ***
		if (hasStorage) {
			window[storageType][key] = JSON.stringify(values);
		} else {
			date = new Date();
			date.setTime(date.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(values)).replace(/\"/g,'\"') + '; expires=' + date.toGMTString() + '; path=/';
		}
	} else {
		return values && values[url] ? values[url][id] : '';
	}
};

})(jQuery, window, document);
