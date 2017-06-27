/*** This file is dynamically generated ***
█████▄ ▄████▄   █████▄ ▄████▄ ██████   ███████▄ ▄████▄ █████▄ ██ ██████ ██  ██
██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██     ██  ██
██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██▀▀   ▀▀▀▀██
█████▀ ▀████▀   ██  ██ ▀████▀   ██     ██ ██ ██ ▀████▀ █████▀ ██ ██     █████▀
*/
/*! tablesorter (FORK) widgets - updated 03-05-2015 (v2.21.0)*/
/* Includes: storage,uitheme,columns,filter,stickyHeaders,resizable,saveSort */
/*! Widget: storage */
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
		hasLocalStorage = false,
		values = {},
		c = table.config,
		$table = $(table),
		id = options && options.id || $table.attr(options && options.group ||
			'data-table-group') || table.id || $('.tablesorter').index( $table ),
		url = options && options.url || $table.attr(options && options.page ||
			'data-table-page') || c && c.fixedUrl || window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if ('localStorage' in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			hasLocalStorage = true;
			window.localStorage.removeItem('_tmptest');
		} catch(error) {}
	}
	// *** get value ***
	if ($.parseJSON) {
		if (hasLocalStorage) {
			values = $.parseJSON(localStorage[key] || 'null') || {};
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
		if (hasLocalStorage) {
			localStorage[key] = JSON.stringify(values);
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

/*! Widget: uitheme */
;(function ($) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	'bootstrap' : {
		table        : 'table table-bordered table-striped',
		caption      : 'caption',
		// header class names
		header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : '', // applied when column is sorted
		hover        : '', // custom css required - a defined bootstrap style may not override other classes
		// icon class names
		icons        : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
		iconSortAsc  : 'icon-chevron-up glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
		iconSortDesc : 'icon-chevron-down glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
		filterRow    : '', // filter row class
		footerRow    : '',
		footerCells  : '',
		even         : '', // even row zebra striping
		odd          : ''  // odd row zebra striping
	},
	'jui' : {
		table        : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption      : 'ui-widget-content',
		// header class names
		header       : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : 'ui-state-active', // applied when column is sorted
		hover        : 'ui-state-hover',  // hover class
		// icon class names
		icons        : 'ui-icon', // icon class added to the <i> in the header
		iconSortNone : 'ui-icon-carat-2-n-s', // class name added to icon when column is not sorted
		iconSortAsc  : 'ui-icon-carat-1-n', // class name added to icon when column has ascending sort
		iconSortDesc : 'ui-icon-carat-1-s', // class name added to icon when column has descending sort
		filterRow    : '',
		footerRow    : '',
		footerCells  : '',
		even         : 'ui-widget-content', // even row zebra striping
		odd          : 'ui-state-default'   // odd row zebra striping
	}
};

$.extend(ts.css, {
	wrapper : 'tablesorter-wrapper' // ui theme & resizable
});

ts.addWidget({
	id: "uitheme",
	priority: 10,
	format: function(table, c, wo) {
		var i, hdr, icon, time, $header, $icon, $tfoot, $h, oldtheme, oldremove, oldIconRmv, hasOldTheme,
			themesAll = ts.themes,
			$table = c.$table.add( c.$extraTables ),
			$headers = c.$headers.add( c.$extraHeaders ),
			theme = c.theme || 'jui',
			themes = themesAll[theme] || {},
			remove = $.trim( [ themes.sortNone, themes.sortDesc, themes.sortAsc, themes.active ].join( ' ' ) ),
			iconRmv = $.trim( [ themes.iconSortNone, themes.iconSortDesc, themes.iconSortAsc ].join( ' ' ) );
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$table.hasClass('tablesorter-' + theme) || c.theme !== c.appliedTheme || !wo.uitheme_applied) {
			wo.uitheme_applied = true;
			oldtheme = themesAll[c.appliedTheme] || {};
			hasOldTheme = !$.isEmptyObject(oldtheme);
			oldremove =  hasOldTheme ? [ oldtheme.sortNone, oldtheme.sortDesc, oldtheme.sortAsc, oldtheme.active ].join( ' ' ) : '';
			oldIconRmv = hasOldTheme ? [ oldtheme.iconSortNone, oldtheme.iconSortDesc, oldtheme.iconSortAsc ].join( ' ' ) : '';
			if (hasOldTheme) {
				wo.zebra[0] = $.trim( ' ' + wo.zebra[0].replace(' ' + oldtheme.even, '') );
				wo.zebra[1] = $.trim( ' ' + wo.zebra[1].replace(' ' + oldtheme.odd, '') );
				c.$tbodies.children().removeClass( [oldtheme.even, oldtheme.odd].join(' ') );
			}
			// update zebra stripes
			if (themes.even) { wo.zebra[0] += ' ' + themes.even; }
			if (themes.odd) { wo.zebra[1] += ' ' + themes.odd; }
			// add caption style
			$table.children('caption')
				.removeClass(oldtheme.caption || '')
				.addClass(themes.caption);
			// add table/footer class names
			$tfoot = $table
				// remove other selected themes
				.removeClass( (c.appliedTheme ? 'tablesorter-' + (c.appliedTheme || '') : '') + ' ' + (oldtheme.table || '') )
				.addClass('tablesorter-' + theme + ' ' + (themes.table || '')) // add theme widget class name
				.children('tfoot');
			c.appliedTheme = c.theme;

			if ($tfoot.length) {
				$tfoot
					// if oldtheme.footerRow or oldtheme.footerCells are undefined, all class names are removed
					.children('tr').removeClass(oldtheme.footerRow || '').addClass(themes.footerRow)
					.children('th, td').removeClass(oldtheme.footerCells || '').addClass(themes.footerCells);
			}
			// update header classes
			$headers
				.removeClass( (hasOldTheme ? [oldtheme.header, oldtheme.hover, oldremove].join(' ') : '') || '' )
				.addClass(themes.header)
				.not('.sorter-false')
				.unbind('mouseenter.tsuitheme mouseleave.tsuitheme')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
					// toggleClass with switch added in jQuery 1.3
					$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover || '');
				});

			$headers.each(function(){
				var $this = $(this);
				if (!$this.find('.' + ts.css.wrapper).length) {
					// Firefox needs this inner div to position the icon & resizer correctly
					$this.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
				}
			});
			if (c.cssIcon) {
				// if c.cssIcon is '', then no <i> is added to the header
				$headers
					.find('.' + ts.css.icon)
					.removeClass(hasOldTheme ? [oldtheme.icons, oldIconRmv].join(' ') : '')
					.addClass(themes.icons || '');
			}
			if ($table.hasClass('hasFilters')) {
				$table.children('thead').children('.' + ts.css.filterRow)
					.removeClass(hasOldTheme ? oldtheme.filterRow || '' : '')
					.addClass(themes.filterRow || '');
			}
		}
		for (i = 0; i < c.columns; i++) {
			$header = c.$headers.add(c.$extraHeaders).not('.sorter-false').filter('[data-column="' + i + '"]');
			$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $();
			$h = $headers.not('.sorter-false').filter('[data-column="' + i + '"]:last');
			if ($h.length) {
				$header.removeClass(remove);
				$icon.removeClass(iconRmv);
				if ($h[0].sortDisabled) {
					// no sort arrows for disabled columns!
					$icon.removeClass(themes.icons || '');
				} else {
					hdr = themes.sortNone;
					icon = themes.iconSortNone;
					if ($h.hasClass(ts.css.sortAsc)) {
						hdr = [themes.sortAsc, themes.active].join(' ');
						icon = themes.iconSortAsc;
					} else if ($h.hasClass(ts.css.sortDesc)) {
						hdr = [themes.sortDesc, themes.active].join(' ');
						icon = themes.iconSortDesc;
					}
					$h
						.addClass(hdr)
						.find('.' + ts.css.icon)
						.addClass(icon || '');
				}
			}
		}
		if (c.debug) {
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo, refreshing) {
		if (!wo.uitheme_applied) { return; }
		var $table = c.$table,
			theme = c.appliedTheme || 'jui',
			themes = ts.themes[ theme ] || ts.themes.jui,
			$headers = $table.children('thead').children(),
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc,
			iconRmv = themes.iconSortNone + ' ' + themes.iconSortDesc + ' ' + themes.iconSortAsc;
		$table.removeClass('tablesorter-' + theme + ' ' + themes.table);
		wo.uitheme_applied = false;
		if (refreshing) { return; }
		$table.find(ts.css.header).removeClass(themes.header);
		$headers
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
			.filter('.' + ts.css.filterRow)
			.removeClass(themes.filterRow);
		$headers.find('.' + ts.css.icon).removeClass(themes.icons + ' ' + iconRmv);
	}
});

})(jQuery);

/*! Widget: columns */
;(function ($) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

ts.addWidget({
	id: "columns",
	priority: 30,
	options : {
		columns : [ "primary", "secondary", "tertiary" ]
	},
	format: function(table, c, wo) {
		var $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
			$table = c.$table,
			$tbodies = c.$tbodies,
			sortList = c.sortList,
			len = sortList.length,
			// removed c.widgetColumns support
			css = wo && wo.columns || [ "primary", "secondary", "tertiary" ],
			last = css.length - 1;
			remove = css.join(' ');
		// check if there is a sort (on initialization there may not be one)
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // detach tbody
			$rows = $tbody.children('tr');
			// loop through the visible rows
			$rows.each(function() {
				$row = $(this);
				if (this.style.display !== 'none') {
					// remove all columns class names
					$cells = $row.children().removeClass(remove);
					// add appropriate column class names
					if (sortList && sortList[0]) {
						// primary sort column class
						$cells.eq(sortList[0][0]).addClass(css[0]);
						if (len > 1) {
							for (indx = 1; indx < len; indx++) {
								// secondary, tertiary, etc sort column classes
								$cells.eq(sortList[indx][0]).addClass( css[indx] || css[last] );
							}
						}
					}
				}
			});
			ts.processTbody(table, $tbody, false);
		}
		// add classes to thead and tfoot
		rows = wo.columns_thead !== false ? ['thead tr'] : [];
		if (wo.columns_tfoot !== false) {
			rows.push('tfoot tr');
		}
		if (rows.length) {
			$rows = $table.find( rows.join(',') ).children().removeClass(remove);
			if (len) {
				for (indx = 0; indx < len; indx++) {
					// add primary. secondary, tertiary, etc sort column classes
					$rows.filter('[data-column="' + sortList[indx][0] + '"]').addClass(css[indx] || css[last]);
				}
			}
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$tbodies = c.$tbodies,
			remove = (wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(remove);
		c.$table.children('tfoot').children('tr').children('th, td').removeClass(remove);
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children('tr').each(function() {
				$(this).children().removeClass(remove);
			});
			ts.processTbody(table, $tbody, false); // restore tbody
		}
	}
});

})(jQuery);

/*! Widget: filter - updated 3/5/2015 (v2.21.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
;(function ($) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

$.extend(ts.css, {
	filterRow : 'tablesorter-filter-row',
	filter    : 'tablesorter-filter'
});

ts.addWidget({
	id: "filter",
	priority: 50,
	options : {
		filter_childRows     : false, // if true, filter includes child row content in the search
		filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
		filter_columnAnyMatch: true,  // if true, allows using "#:{query}" in AnyMatch searches (column:query)
		filter_cellFilter    : '',    // css class name added to the filter cell (string or array)
		filter_cssFilter     : '',    // css class name added to the filter row & each input in the row (tablesorter-filter is ALWAYS added)
		filter_defaultFilter : {},    // add a default column filter type "~{query}" to make fuzzy searches default; "{q1} AND {q2}" to make all searches use a logical AND.
		filter_excludeFilter : {},    // filters to exclude, per column
		filter_external      : '',    // jQuery selector string (or jQuery object) of external filters
		filter_filteredRow   : 'filtered', // class added to filtered rows; needed by pager plugin
		filter_formatter     : null,  // add custom filter elements to the filter row
		filter_functions     : null,  // add custom filter functions using this option
		filter_hideEmpty     : true,  // hide filter row when table is empty
		filter_hideFilters   : false, // collapse filter row when mouse leaves the area
		filter_ignoreCase    : true,  // if true, make all searches case-insensitive
		filter_liveSearch    : true,  // if true, search column content while the user types (with a delay)
		filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available (visible) options within the drop down
		filter_placeholder   : { search : '', select : '' }, // default placeholder text (overridden by any header "data-placeholder" setting)
		filter_reset         : null,  // jQuery selector string of an element used to reset the filters
		filter_saveFilters   : false, // Use the $.tablesorter.storage utility to save the most recent filters
		filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
		filter_searchFiltered: true,  // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
		filter_selectSource  : null,  // include a function to return an array of values to be added to the column filter select
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
		filter_defaultAttrib : 'data-value', // data attribute in the header cell that contains the default filter value
		filter_selectSourceSeparator : '|' // filter_selectSource array text left of the separator is added to the option value, right into the option text
	},
	format: function(table, c, wo) {
		if (!c.$table.hasClass('hasFilters')) {
			ts.filter.init(table, c, wo);
		}
	},
	remove: function(table, c, wo, refreshing) {
		var tbodyIndex, $tbody,
			$table = c.$table,
			$tbodies = c.$tbodies,
			events = 'addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter ');
		$table
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind( events.replace(/\s+/g, ' ') )
			// remove the filter row even if refreshing, because the column might have been moved
			.find('.' + ts.css.filterRow).remove();
		if (refreshing) { return; }
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children().removeClass(wo.filter_filteredRow).show();
			ts.processTbody(table, $tbody, false); // restore tbody
		}
		if (wo.filter_reset) {
			$(document).undelegate(wo.filter_reset, 'click.tsfilter');
		}
	}
});

ts.filter = {

	// regex used in filter "check" functions - not for general use and not documented
	regex: {
		regex     : /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // regex to test for regex
		child     : /tablesorter-childRow/, // child row class name; this gets updated in the script
		filtered  : /filtered/, // filtered (hidden) row class name; updated in the script
		type      : /undefined|number/, // check type
		exact     : /(^[\"\'=]+)|([\"\'=]+$)/g, // exact match (allow '==')
		nondigit  : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
		operators : /[<>=]/g, // replace operators
		query     : '(q|query)' // replace filter queries
	},
		// function( c, data ) { }
		// c = table.config
		// data.filter = array of filter input values;
		// data.iFilter = same array, except lowercase (if wo.filter_ignoreCase is true)
		// data.exact = table cell text (or parsed data if column parser enabled)
		// data.iExact = same as data.exact, except lowercase (if wo.filter_ignoreCase is true)
		// data.cache = table cell text from cache, so it has been parsed (& in all lower case if config.ignoreCase is true)
		// data.index = column index; table = table element (DOM)
		// data.parsed = array (by column) of boolean values (from filter_useParsedData or "filter-parsed" class)
	types: {
		// Look for regex
		regex: function( c, data ) {
			if ( ts.filter.regex.regex.test(data.iFilter) ) {
				var matches,
					regex = ts.filter.regex.regex.exec(data.iFilter);
				try {
					matches = new RegExp(regex[1], regex[2]).test( data.iExact );
				} catch (error) {
					matches = false;
				}
				return matches;
			}
			return null;
		},
		// Look for operators >, >=, < or <=
		operators: function( c, data ) {
			if ( /^[<>]=?/.test(data.iFilter) ) {
				var cachedValue, result,
					table = c.table,
					index = data.index,
					parsed = data.parsed[index],
					query = ts.formatFloat( data.iFilter.replace(ts.filter.regex.operators, ''), table ),
					parser = c.parsers[index],
					savedSearch = query;
				// parse filter value in case we're comparing numbers (dates)
				if (parsed || parser.type === 'numeric') {
					result = ts.filter.parseFilter(c, $.trim('' + data.iFilter.replace(ts.filter.regex.operators, '')), index, parsed, true);
					query = ( typeof result === "number" && result !== '' && !isNaN(result) ) ? result : query;
				}

				// iExact may be numeric - see issue #149;
				// check if cached is defined, because sometimes j goes out of range? (numeric columns)
				cachedValue = ( parsed || parser.type === 'numeric' ) && !isNaN(query) && typeof data.cache !== 'undefined' ? data.cache :
					isNaN(data.iExact) ? ts.formatFloat( data.iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( data.iExact, table );

				if ( />/.test(data.iFilter) ) { result = />=/.test(data.iFilter) ? cachedValue >= query : cachedValue > query; }
				if ( /</.test(data.iFilter) ) { result = /<=/.test(data.iFilter) ? cachedValue <= query : cachedValue < query; }
				// keep showing all rows if nothing follows the operator
				if ( !result && savedSearch === '' ) { result = true; }
				return result;
			}
			return null;
		},
		// Look for a not match
		notMatch: function( c, data ) {
			if ( /^\!/.test(data.iFilter) ) {
				var indx,
					filter = ts.filter.parseFilter(c, data.iFilter.replace('!', ''), data.index, data.parsed[data.index]);
				if (ts.filter.regex.exact.test(filter)) {
					// look for exact not matches - see #628
					filter = filter.replace(ts.filter.regex.exact, '');
					return filter === '' ? true : $.trim(filter) !== data.iExact;
				} else {
					indx = data.iExact.search( $.trim(filter) );
					return filter === '' ? true : !(c.widgetOptions.filter_startsWith ? indx === 0 : indx >= 0);
				}
			}
			return null;
		},
		// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
		exact: function( c, data ) {
			/*jshint eqeqeq:false */
			if (ts.filter.regex.exact.test(data.iFilter)) {
				var filter = ts.filter.parseFilter(c, data.iFilter.replace(ts.filter.regex.exact, ''), data.index, data.parsed[data.index]);
				return data.anyMatch ? $.inArray(filter, data.rowArray) >= 0 : filter == data.iExact;
			}
			return null;
		},
		// Look for an AND or && operator (logical and)
		and : function( c, data ) {
			if ( ts.filter.regex.andTest.test(data.filter) ) {
				var index = data.index,
					parsed = data.parsed[index],
					query = data.iFilter.split( ts.filter.regex.andSplit ),
					result = data.iExact.search( $.trim( ts.filter.parseFilter(c, query[0], index, parsed) ) ) >= 0,
					indx = query.length - 1;
				while (result && indx) {
					result = result && data.iExact.search( $.trim( ts.filter.parseFilter(c, query[indx], index, parsed) ) ) >= 0;
					indx--;
				}
				return result;
			}
			return null;
		},
		// Look for a range (using " to " or " - ") - see issue #166; thanks matzhu!
		range : function( c, data ) {
			if ( ts.filter.regex.toTest.test(data.iFilter) ) {
				var result, tmp,
					table = c.table,
					index = data.index,
					parsed = data.parsed[index],
					// make sure the dash is for a range and not indicating a negative number
					query = data.iFilter.split( ts.filter.regex.toSplit ),
					range1 = ts.formatFloat( ts.filter.parseFilter(c, query[0].replace(ts.filter.regex.nondigit, ''), index, parsed), table ),
					range2 = ts.formatFloat( ts.filter.parseFilter(c, query[1].replace(ts.filter.regex.nondigit, ''), index, parsed), table );
					// parse filter value in case we're comparing numbers (dates)
				if (parsed || c.parsers[index].type === 'numeric') {
					result = c.parsers[index].format('' + query[0], table, c.$headers.eq(index), index);
					range1 = (result !== '' && !isNaN(result)) ? result : range1;
					result = c.parsers[index].format('' + query[1], table, c.$headers.eq(index), index);
					range2 = (result !== '' && !isNaN(result)) ? result : range2;
				}
				result = ( parsed || c.parsers[index].type === 'numeric' ) && !isNaN(range1) && !isNaN(range2) ? data.cache :
					isNaN(data.iExact) ? ts.formatFloat( data.iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( data.iExact, table );
				if (range1 > range2) { tmp = range1; range1 = range2; range2 = tmp; } // swap
				return (result >= range1 && result <= range2) || (range1 === '' || range2 === '');
			}
			return null;
		},
		// Look for wild card: ? = single, * = multiple, or | = logical OR
		wild : function( c, data ) {
			if ( /[\?\*\|]/.test(data.iFilter) || ts.filter.regex.orReplace.test(data.filter) ) {
				var index = data.index,
					parsed = data.parsed[index],
					query = ts.filter.parseFilter(c, data.iFilter.replace(ts.filter.regex.orReplace, "|"), index, parsed);
				// look for an exact match with the "or" unless the "filter-match" class is found
				if (!c.$headerIndexed[index].hasClass('filter-match') && /\|/.test(query)) {
					// show all results while using filter match. Fixes #727
					if (query[ query.length - 1 ] === '|') { query += '*'; }
					query = data.anyMatch && $.isArray(data.rowArray) ? '(' + query + ')' : '^(' + query + ')$';
				}
				// parsing the filter may not work properly when using wildcards =/
				return new RegExp( query.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(data.iExact);
			}
			return null;
		},
		// fuzzy text search; modified from https://github.com/mattyork/fuzzy (MIT license)
		fuzzy: function( c, data ) {
			if ( /^~/.test(data.iFilter) ) {
				var indx,
					patternIndx = 0,
					len = data.iExact.length,
					pattern = ts.filter.parseFilter(c, data.iFilter.slice(1), data.index, data.parsed[data.index]);
				for (indx = 0; indx < len; indx++) {
					if (data.iExact[indx] === pattern[patternIndx]) {
						patternIndx += 1;
					}
				}
				if (patternIndx === pattern.length) {
					return true;
				}
				return false;
			}
			return null;
		}
	},
	init: function(table, c, wo) {
		// filter language options
		ts.language = $.extend(true, {}, {
			to  : 'to',
			or  : 'or',
			and : 'and'
		}, ts.language);

		var options, string, txt, $header, column, filters, val, fxn, noSelect,
			regex = ts.filter.regex;
		c.$table.addClass('hasFilters');

		// define timers so using clearTimeout won't cause an undefined error
		wo.searchTimer = null;
		wo.filter_initTimer = null;
		wo.filter_formatterCount = 0;
		wo.filter_formatterInit = [];
		wo.filter_anyColumnSelector = '[data-column="all"],[data-column="any"]';
		wo.filter_multipleColumnSelector = '[data-column*="-"],[data-column*=","]';

		txt = '\\{' + ts.filter.regex.query + '\\}';
		$.extend( regex, {
			child : new RegExp(c.cssChildRow),
			filtered : new RegExp(wo.filter_filteredRow),
			alreadyFiltered : new RegExp('(\\s+(' + ts.language.or + '|-|' + ts.language.to + ')\\s+)', 'i'),
			toTest : new RegExp('\\s+(-|' + ts.language.to + ')\\s+', 'i'),
			toSplit : new RegExp('(?:\\s+(?:-|' + ts.language.to + ')\\s+)' ,'gi'),
			andTest : new RegExp('\\s+(' + ts.language.and + '|&&)\\s+', 'i'),
			andSplit : new RegExp('(?:\\s+(?:' + ts.language.and + '|&&)\\s+)', 'gi'),
			orReplace : new RegExp('\\s+(' + ts.language.or + ')\\s+', 'gi'),
			iQuery : new RegExp(txt, 'i'),
			igQuery : new RegExp(txt, 'ig')
		});

		// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
		if (wo.filter_columnFilters !== false && c.$headers.filter('.filter-false, .parser-false').length !== c.$headers.length) {
			// build filter row
			ts.filter.buildRow(table, c, wo);
		}

		txt = 'addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter ');
		c.$table.bind( txt, function(event, filter) {
			val = (wo.filter_hideEmpty && $.isEmptyObject(c.cache) && !(c.delayInit && event.type === 'appendCache'));
			// hide filter row using the "filtered" class name
			c.$table.find('.' + ts.css.filterRow).toggleClass(wo.filter_filteredRow, val ); // fixes #450
			if ( !/(search|filter)/.test(event.type) ) {
				event.stopPropagation();
				ts.filter.buildDefault(table, true);
			}
			if (event.type === 'filterReset') {
				c.$table.find('.' + ts.css.filter).add(wo.filter_$externalFilters).val('');
				ts.filter.searching(table, []);
			} else if (event.type === 'filterEnd') {
				ts.filter.buildDefault(table, true);
			} else {
				// send false argument to force a new search; otherwise if the filter hasn't changed, it will return
				filter = event.type === 'search' ? filter : event.type === 'updateComplete' ? c.$table.data('lastSearch') : '';
				if (/(update|add)/.test(event.type) && event.type !== "updateComplete") {
					// force a new search since content has changed
					c.lastCombinedFilter = null;
					c.lastSearch = [];
				}
				// pass true (skipFirst) to prevent the tablesorter.setFilters function from skipping the first input
				// ensures all inputs are updated when a search is triggered on the table $('table').trigger('search', [...]);
				ts.filter.searching(table, filter, true);
			}
			return false;
		});

		// reset button/link
		if (wo.filter_reset) {
			if (wo.filter_reset instanceof $) {
				// reset contains a jQuery object, bind to it
				wo.filter_reset.click(function(){
					c.$table.trigger('filterReset');
				});
			} else if ($(wo.filter_reset).length) {
				// reset is a jQuery selector, use event delegation
				$(document)
				.undelegate(wo.filter_reset, 'click.tsfilter')
				.delegate(wo.filter_reset, 'click.tsfilter', function() {
					// trigger a reset event, so other functions (filter_formatter) know when to reset
					c.$table.trigger('filterReset');
				});
			}
		}
		if (wo.filter_functions) {
			for (column = 0; column < c.columns; column++) {
				fxn = ts.getColumnData( table, wo.filter_functions, column );
				if (fxn) {
					// remove "filter-select" from header otherwise the options added here are replaced with all options
					$header = c.$headerIndexed[column].removeClass('filter-select');
					// don't build select if "filter-false" or "parser-false" set
					noSelect = !($header.hasClass('filter-false') || $header.hasClass('parser-false'));
					options = '';
					if ( fxn === true && noSelect ) {
						ts.filter.buildSelect(table, column);
					} else if ( typeof fxn === 'object' && noSelect ) {
						// add custom drop down list
						for (string in fxn) {
							if (typeof string === 'string') {
								options += options === '' ?
									'<option value="">' + ($header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.select || '') + '</option>' : '';
								val = string;
								txt = string;
								if (string.indexOf(wo.filter_selectSourceSeparator) >= 0) {
									val = string.split(wo.filter_selectSourceSeparator);
									txt = val[1];
									val = val[0];
								}
								options += '<option ' + (txt === val ? '' : 'data-function-name="' + string + '" ') + 'value="' + val + '">' + txt + '</option>';
							}
						}
						c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').append(options);
					}
				}
			}
		}
		// not really updating, but if the column has both the "filter-select" class & filter_functions set to true,
		// it would append the same options twice.
		ts.filter.buildDefault(table, true);

		ts.filter.bindSearch( table, c.$table.find('.' + ts.css.filter), true );
		if (wo.filter_external) {
			ts.filter.bindSearch( table, wo.filter_external );
		}

		if (wo.filter_hideFilters) {
			ts.filter.hideFilters(table, c);
		}

		// show processing icon
		if (c.showProcessing) {
			c.$table
				.unbind( ('filterStart filterEnd '.split(' ').join(c.namespace + 'filter ')).replace(/\s+/g, ' ') )
				.bind( 'filterStart filterEnd '.split(' ').join(c.namespace + 'filter '), function(event, columns) {
				// only add processing to certain columns to all columns
				$header = (columns) ? c.$table.find('.' + ts.css.header).filter('[data-column]').filter(function() {
					return columns[$(this).data('column')] !== '';
				}) : '';
				ts.isProcessing(table, event.type === 'filterStart', columns ? $header : '');
			});
		}

		// set filtered rows count (intially unfiltered)
		c.filteredRows = c.totalRows;

		// add default values
		c.$table
		.unbind( ('tablesorter-initialized pagerBeforeInitialized '.split(' ').join(c.namespace + 'filter ')).replace(/\s+/g, ' ') )
		.bind( 'tablesorter-initialized pagerBeforeInitialized '.split(' ').join(c.namespace + 'filter '), function() {
			// redefine "wo" as it does not update properly inside this callback
			var wo = this.config.widgetOptions;
			filters = ts.filter.setDefaults(table, c, wo) || [];
			if (filters.length) {
				// prevent delayInit from triggering a cache build if filters are empty
				if ( !(c.delayInit && filters.join('') === '') ) {
					ts.setFilters(table, filters, true);
				}
			}
			c.$table.trigger('filterFomatterUpdate');
			// trigger init after setTimeout to prevent multiple filterStart/End/Init triggers
			setTimeout(function(){
				if (!wo.filter_initialized) {
					ts.filter.filterInitComplete(c);
				}
			}, 100);
		});
		// if filter widget is added after pager has initialized; then set filter init flag
		if (c.pager && c.pager.initialized && !wo.filter_initialized) {
			c.$table.trigger('filterFomatterUpdate');
			setTimeout(function(){
				ts.filter.filterInitComplete(c);
			}, 100);
		}
	},
	// $cell parameter, but not the config, is passed to the
	// filter_formatters, so we have to work with it instead
	formatterUpdated: function($cell, column) {
		var wo = $cell.closest('table')[0].config.widgetOptions;
		if (!wo.filter_initialized) {
			// add updates by column since this function
			// may be called numerous times before initialization
			wo.filter_formatterInit[column] = 1;
		}
	},
	filterInitComplete: function(c){
		var indx, len,
			wo = c.widgetOptions,
			count = 0,
			completed = function(){
				wo.filter_initialized = true;
				c.$table.trigger('filterInit', c);
				ts.filter.findRows(c.table, c.$table.data('lastSearch') || []);
			};
		if ( $.isEmptyObject( wo.filter_formatter ) ) {
			completed();
		} else {
			len = wo.filter_formatterInit.length;
			for (indx = 0; indx < len; indx++) {
				if (wo.filter_formatterInit[indx] === 1) {
					count++;
				}
			}
			clearTimeout(wo.filter_initTimer);
			if (!wo.filter_initialized && count === wo.filter_formatterCount) {
				// filter widget initialized
				completed();
			} else if (!wo.filter_initialized) {
				// fall back in case a filter_formatter doesn't call
				// $.tablesorter.filter.formatterUpdated($cell, column), and the count is off
				wo.filter_initTimer = setTimeout(function(){
					completed();
				}, 500);
			}
		}
	},

	setDefaults: function(table, c, wo) {
		var isArray, saved, indx, col, $filters,
			// get current (default) filters
			filters = ts.getFilters(table) || [];
		if (wo.filter_saveFilters && ts.storage) {
			saved = ts.storage( table, 'tablesorter-filters' ) || [];
			isArray = $.isArray(saved);
			// make sure we're not just getting an empty array
			if ( !(isArray && saved.join('') === '' || !isArray) ) { filters = saved; }
		}
		// if no filters saved, then check default settings
		if (filters.join('') === '') {
			// allow adding default setting to external filters
			$filters = c.$headers.add( wo.filter_$externalFilters ).filter('[' + wo.filter_defaultAttrib + ']');
			for (indx = 0; indx <= c.columns; indx++) {
				// include data-column="all" external filters
				col = indx === c.columns ? 'all' : indx;
				filters[indx] = $filters.filter('[data-column="' + col + '"]').attr(wo.filter_defaultAttrib) || filters[indx] || '';
			}
		}
		c.$table.data('lastSearch', filters);
		return filters;
	},
	parseFilter: function(c, filter, column, parsed, forceParse){
		return forceParse || parsed ?
			c.parsers[column].format( filter, c.table, [], column ) :
			filter;
	},
	buildRow: function(table, c, wo) {
		var col, column, $header, buildSelect, disabled, name, ffxn,
			// c.columns defined in computeThIndexes()
			columns = c.columns,
			arry = $.isArray(wo.filter_cellFilter),
			buildFilter = '<tr role="row" class="' + ts.css.filterRow + '">';
		for (column = 0; column < columns; column++) {
			if (arry) {
				buildFilter += '<td' + ( wo.filter_cellFilter[column] ? ' class="' + wo.filter_cellFilter[column] + '"' : '' ) + '></td>';
			} else {
				buildFilter += '<td' + ( wo.filter_cellFilter !== '' ? ' class="' + wo.filter_cellFilter + '"' : '' ) + '></td>';
			}
		}
		c.$filters = $(buildFilter += '</tr>').appendTo( c.$table.children('thead').eq(0) ).find('td');
		// build each filter input
		for (column = 0; column < columns; column++) {
			disabled = false;
			// assuming last cell of a column is the main column
			$header = c.$headerIndexed[column];
			ffxn = ts.getColumnData( table, wo.filter_functions, column );
			buildSelect = (wo.filter_functions && ffxn && typeof ffxn !== "function" ) ||
				$header.hasClass('filter-select');
			// get data from jQuery data, metadata, headers option or header class name
			col = ts.getColumnData( table, c.headers, column );
			disabled = ts.getData($header[0], col, 'filter') === 'false' || ts.getData($header[0], col, 'parser') === 'false';

			if (buildSelect) {
				buildFilter = $('<select>').appendTo( c.$filters.eq(column) );
			} else {
				ffxn = ts.getColumnData( table, wo.filter_formatter, column );
				if (ffxn) {
					wo.filter_formatterCount++;
					buildFilter = ffxn( c.$filters.eq(column), column );
					// no element returned, so lets go find it
					if (buildFilter && buildFilter.length === 0) {
						buildFilter = c.$filters.eq(column).children('input');
					}
					// element not in DOM, so lets attach it
					if ( buildFilter && (buildFilter.parent().length === 0 ||
						(buildFilter.parent().length && buildFilter.parent()[0] !== c.$filters[column])) ) {
						c.$filters.eq(column).append(buildFilter);
					}
				} else {
					buildFilter = $('<input type="search">').appendTo( c.$filters.eq(column) );
				}
				if (buildFilter) {
					buildFilter.attr('placeholder', $header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.search || '');
				}
			}
			if (buildFilter) {
				// add filter class name
				name = ( $.isArray(wo.filter_cssFilter) ?
					(typeof wo.filter_cssFilter[column] !== 'undefined' ? wo.filter_cssFilter[column] || '' : '') :
					wo.filter_cssFilter ) || '';
				buildFilter.addClass( ts.css.filter + ' ' + name ).attr('data-column', column);
				if (disabled) {
					buildFilter.attr('placeholder', '').addClass('disabled')[0].disabled = true; // disabled!
				}
			}
		}
	},
	bindSearch: function(table, $el, internal) {
		table = $(table)[0];
		$el = $($el); // allow passing a selector string
		if (!$el.length) { return; }
		var c = table.config,
			wo = c.widgetOptions,
			$ext = wo.filter_$externalFilters;
		if (internal !== true) {
			// save anyMatch element
			wo.filter_$anyMatch = $el.filter(wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector);
			if ($ext && $ext.length) {
				wo.filter_$externalFilters = wo.filter_$externalFilters.add( $el );
			} else {
				wo.filter_$externalFilters = $el;
			}
			// update values (external filters added after table initialization)
			ts.setFilters(table, c.$table.data('lastSearch') || [], internal === false);
		}
		$el
		// use data attribute instead of jQuery data since the head is cloned without including the data/binding
		.attr('data-lastSearchTime', new Date().getTime())
		.unbind( ('keypress keyup search change '.split(' ').join(c.namespace + 'filter ')).replace(/\s+/g, ' ') )
		// include change for select - fixes #473
		.bind('keyup' + c.namespace + 'filter', function(event) {
			$(this).attr('data-lastSearchTime', new Date().getTime());
			// emulate what webkit does.... escape clears the filter
			if (event.which === 27) {
				this.value = '';
			// live search
			} else if ( wo.filter_liveSearch === false ) {
				return;
				// don't return if the search value is empty (all rows need to be revealed)
			} else if ( this.value !== '' && (
				// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
				( typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch ) ||
				// let return & backspace continue on, but ignore arrows & non-valid characters
				( event.which !== 13 && event.which !== 8 && ( event.which < 32 || (event.which >= 37 && event.which <= 40) ) ) ) ) {
				return;
			}
			// change event = no delay; last true flag tells getFilters to skip newest timed input
			ts.filter.searching( table, true, true );
		})
		.bind( 'search change keypress '.split(' ').join(c.namespace + 'filter '), function(event){
			var column = $(this).data('column');
			// don't allow "change" event to process if the input value is the same - fixes #685
			if (event.which === 13 || event.type === 'search' || event.type === 'change' && this.value !== c.lastSearch[column]) {
				event.preventDefault();
				// init search with no delay
				$(this).attr('data-lastSearchTime', new Date().getTime());
				ts.filter.searching( table, false, true );
			}
		});
	},
	searching: function(table, filter, skipFirst) {
		var wo = table.config.widgetOptions;
		clearTimeout(wo.searchTimer);
		if (typeof filter === 'undefined' || filter === true) {
			// delay filtering
			wo.searchTimer = setTimeout(function() {
				ts.filter.checkFilters(table, filter, skipFirst );
			}, wo.filter_liveSearch ? wo.filter_searchDelay : 10);
		} else {
			// skip delay
			ts.filter.checkFilters(table, filter, skipFirst);
		}
	},
	checkFilters: function(table, filter, skipFirst) {
		var c = table.config,
			wo = c.widgetOptions,
			filterArray = $.isArray(filter),
			filters = (filterArray) ? filter : ts.getFilters(table, true),
			combinedFilters = (filters || []).join(''); // combined filter values
		// prevent errors if delay init is set
		if ($.isEmptyObject(c.cache)) {
			// update cache if delayInit set & pager has initialized (after user initiates a search)
			if (c.delayInit && c.pager && c.pager.initialized) {
				c.$table.trigger('updateCache', [function(){
					ts.filter.checkFilters(table, false, skipFirst);
				}] );
			}
			return;
		}
		// add filter array back into inputs
		if (filterArray) {
			ts.setFilters( table, filters, false, skipFirst !== true );
			if (!wo.filter_initialized) { c.lastCombinedFilter = ''; }
		}
		if (wo.filter_hideFilters) {
			// show/hide filter row as needed
			c.$table.find('.' + ts.css.filterRow).trigger( combinedFilters === '' ? 'mouseleave' : 'mouseenter' );
		}
		// return if the last search is the same; but filter === false when updating the search
		// see example-widget-filter.html filter toggle buttons
		if (c.lastCombinedFilter === combinedFilters && filter !== false) {
			return;
		} else if (filter === false) {
			// force filter refresh
			c.lastCombinedFilter = null;
			c.lastSearch = [];
		}
		if (wo.filter_initialized) { c.$table.trigger('filterStart', [filters]); }
		if (c.showProcessing) {
			// give it time for the processing icon to kick in
			setTimeout(function() {
				ts.filter.findRows(table, filters, combinedFilters);
				return false;
			}, 30);
		} else {
			ts.filter.findRows(table, filters, combinedFilters);
			return false;
		}
	},
	hideFilters: function(table, c) {
		var $filterRow, $filterRow2, timer;
		$(table)
			.find('.' + ts.css.filterRow)
			.addClass('hideme')
			.bind('mouseenter mouseleave', function(e) {
				// save event object - http://bugs.jquery.com/ticket/12140
				var event = e;
				$filterRow = $(this);
				clearTimeout(timer);
				timer = setTimeout(function() {
					if ( /enter|over/.test(event.type) ) {
						$filterRow.removeClass('hideme');
					} else {
						// don't hide if input has focus
						// $(':focus') needs jQuery 1.6+
						if ( $(document.activeElement).closest('tr')[0] !== $filterRow[0] ) {
							// don't hide row if any filter has a value
							if (c.lastCombinedFilter === '') {
								$filterRow.addClass('hideme');
							}
						}
					}
				}, 200);
			})
			.find('input, select').bind('focus blur', function(e) {
				$filterRow2 = $(this).closest('tr');
				clearTimeout(timer);
				var event = e;
				timer = setTimeout(function() {
					// don't hide row if any filter has a value
					if (ts.getFilters(c.$table).join('') === '') {
						$filterRow2[ event.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
					}
				}, 200);
			});
	},
	defaultFilter: function(filter, mask){
		if (filter === '') { return filter; }
		var regex = ts.filter.regex.iQuery,
			maskLen = mask.match( ts.filter.regex.igQuery ).length,
			query = maskLen > 1 ? $.trim(filter).split(/\s/) : [ $.trim(filter) ],
			len = query.length - 1,
			indx = 0,
			val = mask;
		if ( len < 1 && maskLen > 1 ) {
			// only one "word" in query but mask has >1 slots
			query[1] = query[0];
		}
		// replace all {query} with query words...
		// if query = "Bob", then convert mask from "!{query}" to "!Bob"
		// if query = "Bob Joe Frank", then convert mask "{q} OR {q}" to "Bob OR Joe OR Frank"
		while (regex.test(val)) {
			val = val.replace(regex, query[indx++] || '');
			if (regex.test(val) && indx < len && (query[indx] || '') !== '') {
				val = mask.replace(regex, val);
			}
		}
		return val;
	},
	getLatestSearch: function( $input ) {
		if ($input) {
			return $input.sort(function(a, b) {
				return $(b).attr('data-lastSearchTime') - $(a).attr('data-lastSearchTime');
			});
		}
		return $();
	},
	multipleColumns: function( c, $input ) {
		// look for multiple columns "1-3,4-6,8" in data-column
		var temp, ranges, range, start, end, singles, i, indx, len,
			wo = c.widgetOptions,
			// only target "all" column inputs on initialization
			// & don't target "all" column inputs if they don't exist
			targets = wo.filter_initialized || !$input.filter(wo.filter_anyColumnSelector).length,
			columns = [],
			val = $.trim( ts.filter.getLatestSearch( $input ).attr('data-column') || '' );
		// process column range
		if ( targets && /-/.test( val ) ) {
			ranges = val.match( /(\d+)\s*-\s*(\d+)/g );
			len = ranges.length;
			for (indx = 0; indx < len; indx++) {
				range = ranges[indx].split( /\s*-\s*/ );
				start = parseInt( range[0], 10 ) || 0;
				end = parseInt( range[1], 10 ) || ( c.columns - 1 );
				if ( start > end ) { temp = start; start = end; end = temp; } // swap
				if ( end >= c.columns ) { end = c.columns - 1; }
				for ( ; start <= end; start++ ) {
					columns.push(start);
				}
				// remove processed range from val
				val = val.replace( ranges[indx], '' );
			}
		}
		// process single columns
		if ( targets && /,/.test( val ) ) {
			singles = val.split( /\s*,\s*/ );
			len = singles.length;
			for (i = 0; i < len; i++) {
				if (singles[i] !== '') {
					indx = parseInt( singles[i], 10 );
					if ( indx < c.columns ) {
						columns.push( indx );
					}
				}
			}
		}
		// return all columns
		if (!columns.length) {
			for ( indx = 0; indx < c.columns; indx++ ) {
				columns.push( indx );
			}
		}
		return columns;
	},
	findRows: function(table, filters, combinedFilters) {
		if (table.config.lastCombinedFilter === combinedFilters || !table.config.widgetOptions.filter_initialized) { return; }
		var len, norm_rows, $rows, rowIndex, tbodyIndex, $tbody, $cells, $cell, columnIndex,
			childRow, lastSearch, hasSelect, matches, result, showRow, time, val, indx,
			notFiltered, searchFiltered, filterMatched, excludeMatch, fxn, ffxn,
			query, injected, res, id,
			regex = ts.filter.regex,
			c = table.config,
			wo = c.widgetOptions,
			// data object passed to filters; anyMatch is a flag for the filters
			data = { anyMatch: false },
			// anyMatch really screws up with these types of filters
			noAnyMatch = [ 'range', 'notMatch',  'operators' ];

		// parse columns after formatter, in case the class is added at that point
		data.parsed = c.$headers.map(function(columnIndex) {
			return c.parsers && c.parsers[columnIndex] && c.parsers[columnIndex].parsed ||
				// getData won't return "parsed" if other "filter-" class names exist (e.g. <th class="filter-select filter-parsed">)
				ts.getData && ts.getData(c.$headerIndexed[columnIndex], ts.getColumnData( table, c.headers, columnIndex ), 'filter') === 'parsed' ||
				$(this).hasClass('filter-parsed');
		}).get();

		if (c.debug) {
			ts.log('Filter: Starting filter widget search', filters);
			time = new Date();
		}
		// filtered rows count
		c.filteredRows = 0;
		c.totalRows = 0;
		// combindedFilters are undefined on init
		combinedFilters = (filters || []).join('');

		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, c.$tbodies.eq(tbodyIndex), true);
			// skip child rows & widget added (removable) rows - fixes #448 thanks to @hempel!
			// $rows = $tbody.children('tr').not(c.selectorRemove);
			columnIndex = c.columns;
			// convert stored rows into a jQuery object
			norm_rows = c.cache[tbodyIndex].normalized;
			$rows = $( $.map(norm_rows, function(el){ return el[columnIndex].$row.get(); }) );

			if (combinedFilters === '' || wo.filter_serversideFiltering) {
				$rows.removeClass(wo.filter_filteredRow).not('.' + c.cssChildRow).css('display', '');
			} else {
				// filter out child rows
				$rows = $rows.not('.' + c.cssChildRow);
				len = $rows.length;

				if ( (wo.filter_$anyMatch && wo.filter_$anyMatch.length) || typeof filters[c.columns] !== 'undefined' ) {
					data.anyMatchFlag = true;
					data.anyMatchFilter = wo.filter_$anyMatch && ts.filter.getLatestSearch( wo.filter_$anyMatch ).val() || ( '' + filters[c.columns] ) || '';
					if (wo.filter_columnAnyMatch) {
						// specific columns search
						query = data.anyMatchFilter.split( ts.filter.regex.andSplit );
						injected = false;
						for (indx = 0; indx < query.length; indx++) {
							res = query[indx].split(':');
							if ( res.length > 1 ) {
								// make the column a one-based index ( non-developers start counting from one :P )
								id = parseInt( res[0], 10 ) - 1;
								if ( id >= 0 && id < c.columns ) { // if id is an integer
									filters[id] = res[1];
									query.splice(indx, 1);
									indx--;
									injected = true;
								}
							}
						}
						if (injected) {
							data.anyMatchFilter = query.join(' && ');
						}
					}
				}

				// optimize searching only through already filtered rows - see #313
				searchFiltered = wo.filter_searchFiltered;
				lastSearch = c.lastSearch || c.$table.data('lastSearch') || [];
				if (searchFiltered) {
					// cycle through all filters; include last (columnIndex + 1 = match any column). Fixes #669
					for (indx = 0; indx < columnIndex + 1; indx++) {
						val = filters[indx] || '';
						// break out of loop if we've already determined not to search filtered rows
						if (!searchFiltered) { indx = columnIndex; }
						// search already filtered rows if...
						searchFiltered = searchFiltered && lastSearch.length &&
							// there are no changes from beginning of filter
							val.indexOf(lastSearch[indx] || '') === 0 &&
							// if there is NOT a logical "or", or range ("to" or "-") in the string
							!regex.alreadyFiltered.test(val) &&
							// if we are not doing exact matches, using "|" (logical or) or not "!"
							!/[=\"\|!]/.test(val) &&
							// don't search only filtered if the value is negative ('> -10' => '> -100' will ignore hidden rows)
							!(/(>=?\s*-\d)/.test(val) || /(<=?\s*\d)/.test(val)) &&
							// if filtering using a select without a "filter-match" class (exact match) - fixes #593
							!( val !== '' && c.$filters && c.$filters.eq(indx).find('select').length && !c.$headerIndexed[indx].hasClass('filter-match') );
					}
				}
				notFiltered = $rows.not('.' + wo.filter_filteredRow).length;
				// can't search when all rows are hidden - this happens when looking for exact matches
				if (searchFiltered && notFiltered === 0) { searchFiltered = false; }
				if (c.debug) {
					ts.log( 'Filter: Searching through ' + ( searchFiltered && notFiltered < len ? notFiltered : 'all' ) + ' rows' );
				}
				if (data.anyMatchFlag) {
					if (c.sortLocaleCompare) {
						// replace accents
						data.anyMatchFilter = ts.replaceAccents(data.anyMatchFilter);
					}
					if (wo.filter_defaultFilter && regex.iQuery.test( ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) || '')) {
						data.anyMatchFilter = ts.filter.defaultFilter( data.anyMatchFilter, ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) );
						// clear search filtered flag because default filters are not saved to the last search
						searchFiltered = false;
					}
					// make iAnyMatchFilter lowercase unless both filter widget & core ignoreCase options are true
					// when c.ignoreCase is true, the cache contains all lower case data
					data.iAnyMatchFilter = !(wo.filter_ignoreCase && c.ignoreCase) ? data.anyMatchFilter : data.anyMatchFilter.toLocaleLowerCase();
				}

				// loop through the rows
				for (rowIndex = 0; rowIndex < len; rowIndex++) {

					data.cacheArray = norm_rows[rowIndex];

					childRow = $rows[rowIndex].className;
					// skip child rows & already filtered rows
					if ( regex.child.test(childRow) || (searchFiltered && regex.filtered.test(childRow)) ) { continue; }
					showRow = true;
					// *** nextAll/nextUntil not supported by Zepto! ***
					childRow = $rows.eq(rowIndex).nextUntil('tr:not(.' + c.cssChildRow + ')');
					// so, if "table.config.widgetOptions.filter_childRows" is true and there is
					// a match anywhere in the child row, then it will make the row visible
					// checked here so the option can be changed dynamically
					data.childRowText = (childRow.length && wo.filter_childRows) ? childRow.text() : '';
					data.childRowText = wo.filter_ignoreCase ? data.childRowText.toLocaleLowerCase() : data.childRowText;
					$cells = $rows.eq(rowIndex).children();
					if (data.anyMatchFlag) {
						// look for multiple columns "1-3,4-6,8"
						columnIndex = ts.filter.multipleColumns( c, wo.filter_$anyMatch );
						data.anyMatch = true;
						data.rowArray = $cells.map(function(i){
							if ( $.inArray(i, columnIndex) > -1 ) {
								var txt;
								if (data.parsed[i]) {
									txt = data.cacheArray[i];
								} else {
									txt = this ? this.getAttribute( c.textAttribute ) || this.textContent || $(this).text() : '';
									txt = $.trim( wo.filter_ignoreCase ? txt.toLowerCase() : txt );
									if (c.sortLocaleCompare) {
										txt = ts.replaceAccents(txt);
									}
								}
								return txt;
							}
						}).get();
						data.filter = data.anyMatchFilter;
						data.iFilter = data.iAnyMatchFilter;
						data.exact = data.rowArray.join(' ');
						data.iExact = wo.filter_ignoreCase ? data.exact.toLowerCase() : data.exact;
						data.cache = data.cacheArray.slice(0,-1).join(' ');
						filterMatched = null;
						$.each(ts.filter.types, function(type, typeFunction) {
							if ($.inArray(type, noAnyMatch) < 0) {
								matches = typeFunction( c, data );
								if (matches !== null) {
									filterMatched = matches;
									return false;
								}
							}
						});
						if (filterMatched !== null) {
							showRow = filterMatched;
						} else {
							if (wo.filter_startsWith) {
								showRow = false;
								columnIndex = c.columns;
								while (!showRow && columnIndex > 0) {
									columnIndex--;
									showRow = showRow || data.rowArray[columnIndex].indexOf(data.iFilter) === 0;
								}
							} else {
								showRow = (data.iExact + data.childRowText).indexOf(data.iFilter) >= 0;
							}
						}
						data.anyMatch = false;
					}

					for (columnIndex = 0; columnIndex < c.columns; columnIndex++) {
						data.filter = filters[columnIndex];
						data.index = columnIndex;

						// filter types to exclude, per column
						excludeMatch = ( ts.getColumnData( table, wo.filter_excludeFilter, columnIndex, true ) || '' ).split(/\s+/);

						// ignore if filter is empty or disabled
						if (data.filter) {
							data.cache = data.cacheArray[columnIndex];
							// check if column data should be from the cell or from parsed data
							if (wo.filter_useParsedData || data.parsed[columnIndex]) {
								data.exact = data.cache;
							} else {
								val = $cells[columnIndex];
								result = val ? $.trim( val.getAttribute( c.textAttribute ) || val.textContent || $cells.eq(columnIndex).text() ) : '';
								data.exact = c.sortLocaleCompare ? ts.replaceAccents(result) : result; // issue #405
							}
							data.iExact = !regex.type.test(typeof data.exact) && wo.filter_ignoreCase ? data.exact.toLocaleLowerCase() : data.exact;
							result = showRow; // if showRow is true, show that row

							// in case select filter option has a different value vs text "a - z|A through Z"
							ffxn = wo.filter_columnFilters ?
								c.$filters.add(c.$externalFilters).filter('[data-column="'+ columnIndex + '"]').find('select option:selected').attr('data-function-name') || '' : '';
							// replace accents - see #357
							if (c.sortLocaleCompare) {
								data.filter = ts.replaceAccents(data.filter);
							}

							val = true;
							if (wo.filter_defaultFilter && regex.iQuery.test( ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) || '')) {
								data.filter = ts.filter.defaultFilter( data.filter, ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) );
								// val is used to indicate that a filter select is using a default filter; so we override the exact & partial matches
								val = false;
							}
							// data.iFilter = case insensitive (if wo.filter_ignoreCase is true), data.filter = case sensitive
							data.iFilter = wo.filter_ignoreCase ? (data.filter || '').toLocaleLowerCase() : data.filter;
							fxn = ts.getColumnData( table, wo.filter_functions, columnIndex );
							$cell = c.$headerIndexed[columnIndex];
							hasSelect = $cell.hasClass('filter-select');
							if ( fxn || ( hasSelect && val ) ) {
								if (fxn === true || hasSelect) {
									// default selector uses exact match unless "filter-match" class is found
									result = ($cell.hasClass('filter-match')) ? data.iExact.search(data.iFilter) >= 0 : data.filter === data.exact;
								} else if (typeof fxn === 'function') {
									// filter callback( exact cell content, parser normalized content, filter input value, column index, jQuery row object )
									result = fxn(data.exact, data.cache, data.filter, columnIndex, $rows.eq(rowIndex), c);
								} else if (typeof fxn[ffxn || data.filter] === 'function') {
									// selector option function
									result = fxn[ffxn || data.filter](data.exact, data.cache, data.filter, columnIndex, $rows.eq(rowIndex), c);
								}
							} else {
								filterMatched = null;
								// cycle through the different filters
								// filters return a boolean or null if nothing matches
								$.each(ts.filter.types, function(type, typeFunction) {
									if ($.inArray(type, excludeMatch) < 0) {
										matches = typeFunction( c, data );
										if (matches !== null) {
											filterMatched = matches;
											return false;
										}
									}
								});
								if (filterMatched !== null) {
									result = filterMatched;
								// Look for match, and add child row data for matching
								} else {
									data.exact = (data.iExact + data.childRowText).indexOf( ts.filter.parseFilter(c, data.iFilter, columnIndex, data.parsed[columnIndex]) );
									result = ( (!wo.filter_startsWith && data.exact >= 0) || (wo.filter_startsWith && data.exact === 0) );
								}
							}
							showRow = (result) ? showRow : false;
						}
					}
					$rows.eq(rowIndex)
						.toggleClass(wo.filter_filteredRow, !showRow)[0]
						.display = showRow ? '' : 'none';
					if (childRow.length) {
						childRow.toggleClass(wo.filter_filteredRow, !showRow);
					}
				}
			}
			c.filteredRows += $rows.not('.' + wo.filter_filteredRow).length;
			c.totalRows += $rows.length;
			ts.processTbody(table, $tbody, false);
		}
		c.lastCombinedFilter = combinedFilters; // save last search
		c.lastSearch = filters;
		c.$table.data('lastSearch', filters);
		if (wo.filter_saveFilters && ts.storage) {
			ts.storage( table, 'tablesorter-filters', filters );
		}
		if (c.debug) {
			ts.benchmark("Completed filter widget search", time);
		}
		if (wo.filter_initialized) { c.$table.trigger('filterEnd', c ); }
		setTimeout(function(){
			c.$table.trigger('applyWidgets'); // make sure zebra widget is applied
		}, 0);
	},
	getOptionSource: function(table, column, onlyAvail) {
		table = $(table)[0];
		var cts, indx, len,
			c = table.config,
			wo = c.widgetOptions,
			parsed = [],
			arry = false,
			source = wo.filter_selectSource,
			last = c.$table.data('lastSearch') || [],
			fxn = $.isFunction(source) ? true : ts.getColumnData( table, source, column );

		if (onlyAvail && last[column] !== '') {
			onlyAvail = false;
		}

		// filter select source option
		if (fxn === true) {
			// OVERALL source
			arry = source(table, column, onlyAvail);
		} else if ( fxn instanceof $ || ($.type(fxn) === 'string' && fxn.indexOf('</option>') >= 0) ) {
			// selectSource is a jQuery object or string of options
			return fxn;
		} else if ($.isArray(fxn)) {
			arry = fxn;
		} else if ($.type(source) === 'object' && fxn) {
			// custom select source function for a SPECIFIC COLUMN
			arry = fxn(table, column, onlyAvail);
		}
		if (arry === false) {
			// fall back to original method
			arry = ts.filter.getOptions(table, column, onlyAvail);
		}

		// get unique elements and sort the list
		// if $.tablesorter.sortText exists (not in the original tablesorter),
		// then natural sort the list otherwise use a basic sort
		arry = $.grep(arry, function(value, indx) {
			return $.inArray(value, arry) === indx;
		});

		if (c.$headerIndexed[column].hasClass('filter-select-nosort')) {
			// unsorted select options
			return arry;
		} else {
			len = arry.length;
			// parse select option values
			for (indx = 0; indx < len; indx++) {
				// parse array data using set column parser; this DOES NOT pass the original
				// table cell to the parser format function
				parsed.push({ t : arry[indx], p : c.parsers && c.parsers[column].format( arry[indx], table, [], column ) });
			}

			// sort parsed select options
			cts = c.textSorter || '';
			parsed.sort(function(a, b){
				// sortNatural breaks if you don't pass it strings
				var x = a.p.toString(), y = b.p.toString();
				if ($.isFunction(cts)) {
					// custom OVERALL text sorter
					return cts(x, y, true, column, table);
				} else if (typeof(cts) === 'object' && cts.hasOwnProperty(column)) {
					// custom text sorter for a SPECIFIC COLUMN
					return cts[column](x, y, true, column, table);
				} else if (ts.sortNatural) {
					// fall back to natural sort
					return ts.sortNatural(x, y);
				}
				// using an older version! do a basic sort
				return true;
			});
			// rebuild arry from sorted parsed data
			arry = [];
			len = parsed.length;
			for (indx = 0; indx < len; indx++) {
				arry.push( parsed[indx].t );
			}
			return arry;
		}
	},
	getOptions: function(table, column, onlyAvail) {
		table = $(table)[0];
		var rowIndex, tbodyIndex, len, row, cache, cell,
			c = table.config,
			wo = c.widgetOptions,
			arry = [];
		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
			cache = c.cache[tbodyIndex];
			len = c.cache[tbodyIndex].normalized.length;
			// loop through the rows
			for (rowIndex = 0; rowIndex < len; rowIndex++) {
				// get cached row from cache.row (old) or row data object (new; last item in normalized array)
				row = cache.row ? cache.row[rowIndex] : cache.normalized[rowIndex][c.columns].$row[0];
				// check if has class filtered
				if (onlyAvail && row.className.match(wo.filter_filteredRow)) { continue; }
				// get non-normalized cell content
				if (wo.filter_useParsedData || c.parsers[column].parsed || c.$headerIndexed[column].hasClass('filter-parsed')) {
					arry.push( '' + cache.normalized[rowIndex][column] );
				} else {
					cell = row.cells[column];
					if (cell) {
						arry.push( $.trim( cell.getAttribute( c.textAttribute ) || cell.textContent || $(cell).text() ) );
					}
				}
			}
		}
		return arry;
	},
	buildSelect: function(table, column, arry, updating, onlyAvail) {
		table = $(table)[0];
		column = parseInt(column, 10);
		if (!table.config.cache || $.isEmptyObject(table.config.cache)) { return; }
		var indx, val, txt, t, $filters, $filter,
			c = table.config,
			wo = c.widgetOptions,
			node = c.$headerIndexed[column],
			// t.data('placeholder') won't work in jQuery older than 1.4.3
			options = '<option value="">' + ( node.data('placeholder') || node.attr('data-placeholder') || wo.filter_placeholder.select || '' ) + '</option>',
			// Get curent filter value
			currentValue = c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').val();
		// nothing included in arry (external source), so get the options from filter_selectSource or column data
		if (typeof arry === 'undefined' || arry === '') {
			arry = ts.filter.getOptionSource(table, column, onlyAvail);
		}

		if ($.isArray(arry)) {
			// build option list
			for (indx = 0; indx < arry.length; indx++) {
				txt = arry[indx] = ('' + arry[indx]).replace(/\"/g, "&quot;");
				val = txt;
				// allow including a symbol in the selectSource array
				// "a-z|A through Z" so that "a-z" becomes the option value
				// and "A through Z" becomes the option text
				if (txt.indexOf(wo.filter_selectSourceSeparator) >= 0) {
					t = txt.split(wo.filter_selectSourceSeparator);
					val = t[0];
					txt = t[1];
				}
				// replace quotes - fixes #242 & ignore empty strings - see http://stackoverflow.com/q/14990971/145346
				options += arry[indx] !== '' ? '<option ' + (val === txt ? '' : 'data-function-name="' + arry[indx] + '" ') + 'value="' + val + '">' + txt + '</option>' : '';
			}
			// clear arry so it doesn't get appended twice
			arry = [];
		}

		// update all selects in the same column (clone thead in sticky headers & any external selects) - fixes 473
		$filters = ( c.$filters ? c.$filters : c.$table.children('thead') ).find('.' + ts.css.filter);
		if (wo.filter_$externalFilters) {
			$filters = $filters && $filters.length ? $filters.add(wo.filter_$externalFilters) : wo.filter_$externalFilters;
		}
		$filter = $filters.filter('select[data-column="' + column + '"]');

		// make sure there is a select there!
		if ($filter.length) {
			$filter[ updating ? 'html' : 'append' ](options);
			if (!$.isArray(arry)) {
				// append options if arry is provided externally as a string or jQuery object
				// options (default value) was already added
				$filter.append(arry).val(currentValue);
			}
			$filter.val(currentValue);
		}
	},
	buildDefault: function(table, updating) {
		var columnIndex, $header, noSelect,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns;
		// build default select dropdown
		for (columnIndex = 0; columnIndex < columns; columnIndex++) {
			$header = c.$headerIndexed[columnIndex];
			noSelect = !($header.hasClass('filter-false') || $header.hasClass('parser-false'));
			// look for the filter-select class; build/update it if found
			if (($header.hasClass('filter-select') || ts.getColumnData( table, wo.filter_functions, columnIndex ) === true) && noSelect) {
				ts.filter.buildSelect(table, columnIndex, '', updating, $header.hasClass(wo.filter_onlyAvail));
			}
		}
	}
};

ts.getFilters = function(table, getRaw, setFilters, skipFirst) {
	var i, $filters, $column, cols,
		filters = false,
		c = table ? $(table)[0].config : '',
		wo = c ? c.widgetOptions : '';
	if (getRaw !== true && wo && !wo.filter_columnFilters) {
		return $(table).data('lastSearch');
	}
	if (c) {
		if (c.$filters) {
			$filters = c.$filters.find('.' + ts.css.filter);
		}
		if (wo.filter_$externalFilters) {
			$filters = $filters && $filters.length ? $filters.add(wo.filter_$externalFilters) : wo.filter_$externalFilters;
		}
		if ($filters && $filters.length) {
			filters = setFilters || [];
			for (i = 0; i < c.columns + 1; i++) {
				cols = ( i === c.columns ?
					// "all" columns can now include a range or set of columms (data-column="0-2,4,6-7")
					wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector :
					'[data-column="' + i + '"]' );
				$column = $filters.filter(cols);
				if ($column.length) {
					// move the latest search to the first slot in the array
					$column = ts.filter.getLatestSearch( $column );
					if ($.isArray(setFilters)) {
						// skip first (latest input) to maintain cursor position while typing
						if (skipFirst) { $column.slice(1); }
						if (i === c.columns) {
							// prevent data-column="all" from filling data-column="0,1" (etc)
							cols = $column.filter(wo.filter_anyColumnSelector);
							$column = cols.length ? cols : $column;
						}
						$column
							.val( setFilters[i] )
							.trigger('change.tsfilter');
					} else {
						filters[i] = $column.val() || '';
						// don't change the first... it will move the cursor
						if (i === c.columns) {
							// don't update range columns from "all" setting
							$column.slice(1).filter('[data-column*="' + $column.attr('data-column') + '"]').val( filters[i] );
						} else {
							$column.slice(1).val( filters[i] );
						}
					}
					// save any match input dynamically
					if (i === c.columns && $column.length) {
						wo.filter_$anyMatch = $column;
					}
				}
			}
		}
	}
	if (filters.length === 0) {
		filters = false;
	}
	return filters;
};

ts.setFilters = function(table, filter, apply, skipFirst) {
	var c = table ? $(table)[0].config : '',
		valid = ts.getFilters(table, true, filter, skipFirst);
	if (c && apply) {
		// ensure new set filters are applied, even if the search is the same
		c.lastCombinedFilter = null;
		c.lastSearch = [];
		ts.filter.searching(c.table, filter, skipFirst);
		c.$table.trigger('filterFomatterUpdate');
	}
	return !!valid;
};

})(jQuery);

/*! Widget: stickyHeaders - updated 3/5/2015 (v2.21.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.4.3+
 * by Rob Garrison
 */
;(function ($, window) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

$.extend(ts.css, {
	sticky    : 'tablesorter-stickyHeader', // stickyHeader
	stickyVis : 'tablesorter-sticky-visible',
	stickyHide: 'tablesorter-sticky-hidden',
	stickyWrap: 'tablesorter-sticky-wrapper'
});

// Add a resize event to table headers
ts.addHeaderResizeEvent = function(table, disable, settings) {
	table = $(table)[0]; // make sure we're using a dom element
	var headers,
		defaults = {
			timer : 250
		},
		options = $.extend({}, defaults, settings),
		c = table.config,
		wo = c.widgetOptions,
		checkSizes = function(triggerEvent) {
			wo.resize_flag = true;
			headers = [];
			c.$headers.each(function() {
				var $header = $(this),
					sizes = $header.data('savedSizes') || [0,0], // fixes #394
					width = this.offsetWidth,
					height = this.offsetHeight;
				if (width !== sizes[0] || height !== sizes[1]) {
					$header.data('savedSizes', [ width, height ]);
					headers.push(this);
				}
			});
			if (headers.length && triggerEvent !== false) {
				c.$table.trigger('resize', [ headers ]);
			}
			wo.resize_flag = false;
		};
	checkSizes(false);
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	wo.resize_timer = setInterval(function() {
		if (wo.resize_flag) { return; }
		checkSizes();
	}, options.timer);
};

// Sticky headers based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60, // sticky widget must be initialized after the filter widget!
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_attachTo : null, // jQuery selector or object to attach sticky header to
		stickyHeaders_xScroll : null, // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
		stickyHeaders_yScroll : null, // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_filteredToTop: true, // scroll table top into view after filtering
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true, // trigger "resize" event on headers
		stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
		stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
	},
	format: function(table, c, wo) {
		// filter widget doesn't initialize on an empty table. Fixes #449
		if ( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >= 0 && !c.$table.hasClass('hasFilters')) ) {
			return;
		}
		var $table = c.$table,
			// add position: relative to attach element, hopefully it won't cause trouble.
			$attach = $(wo.stickyHeaders_attachTo),
			namespace = c.namespace + 'stickyheaders ',
			// element to watch for the scroll event
			$yScroll = $(wo.stickyHeaders_yScroll || wo.stickyHeaders_attachTo || window),
			$xScroll = $(wo.stickyHeaders_xScroll || wo.stickyHeaders_attachTo || window),
			$thead = $table.children('thead:first'),
			$header = $thead.children('tr').not('.sticky-false').children(),
			$tfoot = $table.children('tfoot'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			// is this table nested? If so, find parent sticky header wrapper (div, not table)
			$nestedSticky = $table.parent().closest('.' + ts.css.table).hasClass('hasStickyHeaders') ?
				$table.parent().closest('table.tablesorter')[0].config.widgetOptions.$sticky.parent() : [],
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.height() : 0,
			// clone table, then wrap to make sticky header
			$stickyTable = wo.$sticky = $table.clone()
				.addClass('containsStickyHeaders ' + ts.css.sticky + ' ' + wo.stickyHeaders)
				.wrap('<div class="' + ts.css.stickyWrap + '">'),
			$stickyWrap = $stickyTable.parent()
				.addClass(ts.css.stickyHide)
				.css({
					position   : $attach.length ? 'absolute' : 'fixed',
					padding    : parseInt( $stickyTable.parent().parent().css('padding-left'), 10 ),
					top        : stickyOffset + nestedStickyTop,
					left       : 0,
					visibility : 'hidden',
					zIndex     : wo.stickyHeaders_zIndex || 2
				}),
			$stickyThead = $stickyTable.children('thead:first'),
			$stickyCells,
			laststate = '',
			spacing = 0,
			setWidth = function($orig, $clone){
				$orig.filter(':visible').each(function(i) {
					var width, border,
						$cell = $clone.filter(':visible').eq(i),
						$this = $(this);
					// code from https://github.com/jmosbech/StickyTableHeaders
					if ($this.css('box-sizing') === 'border-box') {
						width = $this.outerWidth();
					} else {
						if ($cell.css('border-collapse') === 'collapse') {
							if (window.getComputedStyle) {
								width = parseFloat( window.getComputedStyle(this, null).width );
							} else {
								// ie8 only
								border = parseFloat( $this.css('border-width') );
								width = $this.outerWidth() - parseFloat( $this.css('padding-left') ) - parseFloat( $this.css('padding-right') ) - border;
							}
						} else {
							width = $this.width();
						}
					}
					$cell.css({
						'min-width': width,
						'max-width': width
					});
				});
			},
			resizeHeader = function() {
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				spacing = 0;
				$stickyWrap.css({
					left : $attach.length ? parseInt($attach.css('padding-left'), 10) || 0 :
							$table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing,
					width: $table.outerWidth()
				});
				setWidth( $table, $stickyTable );
				setWidth( $header, $stickyCells );
			};
		// only add a position relative if a position isn't already defined
		if ($attach.length && !$attach.css('position')) {
			$attach.css('position', 'relative');
		}
		// save stickyTable element to config
		// it is also saved to wo.$sticky
		if (c.$extraTables && c.$extraTables.length) {
			c.$extraTables.add($stickyTable);
		} else {
			c.$extraTables = $stickyTable;
		}
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
		$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
		$stickyTable.find('tbody, tfoot').remove();
		$stickyTable.find('caption').toggle(wo.stickyHeaders_includeCaption);
		// issue #172 - find td/th in sticky header
		$stickyCells = $stickyThead.children().children();
		$stickyTable.css({ height:0, width:0, margin: 0 });
		// remove resizable block
		$stickyCells.find('.' + ts.css.resizer).remove();
		// update sticky header class names to match real header after sorting
		$table
			.addClass('hasStickyHeaders')
			.bind('pagerComplete' + namespace, function() {
				resizeHeader();
			});

		ts.bindEvents(table, $stickyThead.children().children('.tablesorter-header'));

		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( $stickyWrap );

		// onRenderHeader is defined, we need to do something about it (fixes #641)
		if (c.onRenderHeader) {
			$stickyThead.children('tr').children().each(function(index){
				// send second parameter
				c.onRenderHeader.apply( $(this), [ index, c, $stickyTable ] );
			});
		}

		// make it sticky!
		$xScroll.add($yScroll)
		.unbind( ('scroll resize '.split(' ').join( namespace )).replace(/\s+/g, ' ') )
		.bind('scroll resize '.split(' ').join( namespace ), function(event) {
			if (!$table.is(':visible')) { return; } // fixes #278
			// Detect nested tables - fixes #724
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.offset().top - $yScroll.scrollTop() + $nestedSticky.height() : 0;
			var offset = $table.offset(),
				yWindow = $.isWindow( $yScroll[0] ), // $.isWindow needs jQuery 1.4.3
				xWindow = $.isWindow( $xScroll[0] ),
				// scrollTop = ( $attach.length ? $attach.offset().top : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				scrollTop = ( $attach.length ? ( yWindow ? $yScroll.scrollTop() : $yScroll.offset().top ) : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				tableHeight = $table.height() - ($stickyWrap.height() + ($tfoot.height() || 0)),
				isVisible = ( scrollTop > offset.top ) && ( scrollTop < offset.top + tableHeight ) ? 'visible' : 'hidden',
				cssSettings = { visibility : isVisible };

			if ($attach.length) {
				cssSettings.top = yWindow ? scrollTop - $attach.offset().top : $attach.scrollTop();
			}
			if (xWindow) {
				// adjust when scrolling horizontally - fixes issue #143
				cssSettings.left = $table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing;
			}
			if ($nestedSticky.length) {
				cssSettings.top = ( cssSettings.top || 0 ) + stickyOffset + nestedStickyTop;
			}
			$stickyWrap
				.removeClass( ts.css.stickyVis + ' ' + ts.css.stickyHide )
				.addClass( isVisible === 'visible' ? ts.css.stickyVis : ts.css.stickyHide )
				.css(cssSettings);
			if (isVisible !== laststate || event.type === 'resize') {
				// make sure the column widths match
				resizeHeader();
				laststate = isVisible;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		if ($table.hasClass('hasFilters') && wo.filter_columnFilters) {
			// scroll table into view after filtering, if sticky header is active - #482
			$table.bind('filterEnd' + namespace, function() {
				// $(':focus') needs jQuery 1.6+
				var $td = $(document.activeElement).closest('td'),
					column = $td.parent().children().index($td);
				// only scroll if sticky header is active
				if ($stickyWrap.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop) {
					// scroll to original table (not sticky clone)
					window.scrollTo(0, $table.position().top);
					// give same input/select focus; check if c.$filters exists; fixes #594
					if (column >= 0 && c.$filters) {
						c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
					}
				}
			});
			ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
			// support hideFilters
			if (wo.filter_hideFilters) {
				ts.filter.hideFilters($stickyTable, c);
			}
		}

		$table.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo) {
		var namespace = c.namespace + 'stickyheaders ';
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind( ('pagerComplete filterEnd '.split(' ').join(namespace)).replace(/\s+/g, ' ') )
			.next('.' + ts.css.stickyWrap).remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		$(window)
			.add(wo.stickyHeaders_xScroll)
			.add(wo.stickyHeaders_yScroll)
			.add(wo.stickyHeaders_attachTo)
			.unbind( ('scroll resize '.split(' ').join(namespace)).replace(/\s+/g, ' ') );
		ts.addHeaderResizeEvent(table, false);
	}
});

})(jQuery, window);

/*! Widget: resizable */
;(function ($, window) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

$.extend(ts.css, {
	resizer : 'tablesorter-resizer' // resizable
});

// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: "resizable",
	priority: 40,
	options: {
		resizable : true,
		resizable_addLastColumn : false,
		resizable_widths : [],
		resizable_throttle : false // set to true (5ms) or any number 0-10 range
	},
	format: function(table, c, wo) {
		if (c.$table.hasClass('hasResizable')) { return; }
		c.$table.addClass('hasResizable');
		ts.resizableReset(table, true); // set default widths
		var $rows, $columns, $column, column, timer,
			storedSizes = {},
			$table = c.$table,
			$wrap = $table.parent(),
			overflow = $table.parent().css('overflow') === 'auto',
			mouseXPosition = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($table.parent().width() - $table.width()) < 20,
			mouseMove = function(event){
				if (mouseXPosition === 0 || !$target) { return; }
				// resize columns
				var leftEdge = event.pageX - mouseXPosition,
					targetWidth = $target.width();
				$target.width( targetWidth + leftEdge );
				if ($target.width() !== targetWidth && fullWidth) {
					$next.width( $next.width() - leftEdge );
				} else if (overflow) {
					$table.width(function(i, w){
						return w + leftEdge;
					});
					if (!$next.length) {
						// if expanding right-most column, scroll the wrapper
						$wrap[0].scrollLeft = $table.width();
					}
				}
				mouseXPosition = event.pageX;
			},
			stopResize = function() {
				if (ts.storage && $target && $next) {
					storedSizes = {};
					storedSizes[$target.index()] = $target.width();
					storedSizes[$next.index()] = $next.width();
					$target.width( storedSizes[$target.index()] );
					$next.width( storedSizes[$next.index()] );
					if (wo.resizable !== false) {
						// save all column widths
						ts.storage(table, 'tablesorter-resizable', c.$headers.map(function(){ return $(this).width(); }).get() );
					}
				}
				mouseXPosition = 0;
				$target = $next = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		storedSizes = (ts.storage && wo.resizable !== false) ? ts.storage(table, 'tablesorter-resizable') : {};
		// process only if table ID or url match
		if (storedSizes) {
			for (column in storedSizes) {
				if (!isNaN(column) && column < c.$headers.length) {
					c.$headers.eq(column).width(storedSizes[column]); // set saved resizable widths
				}
			}
		}
		$rows = $table.children('thead:first').children('tr');
		// add resizable-false class name to headers (across rows as needed)
		$rows.children().each(function() {
			var canResize,
				$column = $(this);
			column = $column.attr('data-column');
			canResize = ts.getData( $column, ts.getColumnData( table, c.headers, column ), 'resizable') === "false";
			$rows.children().filter('[data-column="' + column + '"]')[canResize ? 'addClass' : 'removeClass']('resizable-false');
		});
		// add wrapper inside each cell to allow for positioning of the resizable target block
		$rows.each(function() {
			$column = $(this).children().not('.resizable-false');
			if (!$(this).find('.' + ts.css.wrapper).length) {
				// Firefox needs this inner div to position the resizer correctly
				$column.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
			}
			// don't include the last column of the row
			if (!wo.resizable_addLastColumn) { $column = $column.slice(0,-1); }
			$columns = $columns ? $columns.add($column) : $column;
		});
		$columns
		.each(function() {
			var $column = $(this),
				padding = parseInt($column.css('padding-right'), 10) + 10; // 10 is 1/2 of the 20px wide resizer
			$column
				.find('.' + ts.css.wrapper)
				.append('<div class="' + ts.css.resizer + '" style="cursor:w-resize;position:absolute;z-index:1;right:-' +
					padding + 'px;top:0;height:100%;width:20px;"></div>');
		})
		.find('.' + ts.css.resizer)
		.bind('mousedown', function(event) {
			// save header cell and mouse position
			$target = $(event.target).closest('th');
			var $header = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if ($header.length > 1) { $target = $target.add($header); }
			// if table is not as wide as it's parent, then resize the table
			$next = event.shiftKey ? $target.parent().find('th').not('.resizable-false').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			mouseXPosition = event.pageX;
		});
		$(document)
		.bind('mousemove.tsresize', function(event) {
			// ignore mousemove if no mousedown
			if (mouseXPosition === 0 || !$target) { return; }
			if (wo.resizable_throttle) {
				clearTimeout(timer);
				timer = setTimeout(function(){
					mouseMove(event);
				}, isNaN(wo.resizable_throttle) ? 5 : wo.resizable_throttle );
			} else {
				mouseMove(event);
			}
		})
		.bind('mouseup.tsresize', function() {
			stopResize();
		});

		// right click to reset columns to default widths
		$table.find('thead:first').bind('contextmenu.tsresize', function() {
			ts.resizableReset(table);
			// $.isEmptyObject() needs jQuery 1.4+; allow right click if already reset
			var allowClick = $.isEmptyObject ? $.isEmptyObject(storedSizes) : true;
			storedSizes = {};
			return allowClick;
		});
	},
	remove: function(table, c) {
		c.$table
			.removeClass('hasResizable')
			.children('thead')
			.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
			.children('tr').children()
			.unbind('mousemove.tsresize mouseup.tsresize')
			// don't remove "tablesorter-wrapper" as uitheme uses it too
			.find('.' + ts.css.resizer).remove();
		ts.resizableReset(table);
	}
});
ts.resizableReset = function(table, nosave) {
	$(table).each(function(){
		var $t,
			c = this.config,
			wo = c && c.widgetOptions;
		if (table && c) {
			c.$headers.each(function(i){
				$t = $(this);
				if (wo.resizable_widths && wo.resizable_widths[i]) {
					$t.css('width', wo.resizable_widths[i]);
				} else if (!$t.hasClass('resizable-false')) {
					// don't clear the width of any column that is not resizable
					$t.css('width','');
				}
			});
			if (ts.storage && !nosave) { ts.storage(this, 'tablesorter-resizable', {}); }
		}
	});
};

})(jQuery, window);

/*! Widget: saveSort */
;(function ($) {
'use strict';
var ts = $.tablesorter = $.tablesorter || {};

// this widget saves the last sort only if the
// saveSort widget option is true AND the
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: 'saveSort',
	priority: 20,
	options: {
		saveSort : true
	},
	init: function(table, thisWidget, c, wo) {
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, c, wo, true);
	},
	format: function(table, c, wo, init) {
		var stored, time,
			$table = c.$table,
			saveSort = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug) {
			time = new Date();
		}
		if ($table.hasClass('hasSaveSort')) {
			if (saveSort && table.hasInitialized && ts.storage) {
				ts.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug) {
					ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$table.addClass('hasSaveSort');
			sortList = '';
			// get data
			if (ts.storage) {
				stored = ts.storage( table, 'tablesorter-savesort' );
				sortList = (stored && stored.hasOwnProperty('sortList') && $.isArray(stored.sortList)) ? stored.sortList : '';
				if (c.debug) {
					ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
				$table.bind('saveSortReset', function(event) {
					event.stopPropagation();
					ts.storage( table, 'tablesorter-savesort', '' );
				});
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0) {
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0) {
				// update sort change
				$table.trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table, c) {
		c.$table.removeClass('hasSaveSort');
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);
