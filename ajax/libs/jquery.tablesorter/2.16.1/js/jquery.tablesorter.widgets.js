/*! tableSorter 2.16+ widgets - updated 4/23/2014 (v2.16.0)
 *
 * Column Styles
 * Column Filters
 * Column Resizing
 * Sticky Header
 * UI Theme (generalized)
 * Save Sort
 * [ "columns", "filter", "resizable", "stickyHeaders", "uitheme", "saveSort" ]
 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false, localStorage: false, navigator: false */
;(function($) {
"use strict";
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	"bootstrap" : {
		table      : 'table table-bordered table-striped',
		caption    : 'caption',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',
		sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // even row zebra striping
		odd        : ''  // odd row zebra striping
	},
	"jui" : {
		table      : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption    : 'ui-widget-content ui-corner-all',
		header     : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		footerRow  : '',
		footerCells: '',
		icons      : 'ui-icon', // icon class added to the <i> in the header
		sortNone   : 'ui-icon-carat-2-n-s',
		sortAsc    : 'ui-icon-carat-1-n',
		sortDesc   : 'ui-icon-carat-1-s',
		active     : 'ui-state-active', // applied when column is sorted
		hover      : 'ui-state-hover',  // hover class
		filterRow  : '',
		even       : 'ui-widget-content', // even row zebra striping
		odd        : 'ui-state-default'   // odd row zebra striping
	}
};

$.extend(ts.css, {
	filterRow : 'tablesorter-filter-row',   // filter
	filter    : 'tablesorter-filter',
	wrapper   : 'tablesorter-wrapper',      // ui theme & resizable
	resizer   : 'tablesorter-resizer',      // resizable
	grip      : 'tablesorter-resizer-grip',
	sticky    : 'tablesorter-stickyHeader', // stickyHeader
	stickyVis : 'tablesorter-sticky-visible'
});

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
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			hasLocalStorage = true;
			window.localStorage.removeItem('_tmptest');
		} catch(error) {}
	}
	// *** get value ***
	if ($.parseJSON) {
		if (hasLocalStorage) {
			values = $.parseJSON(localStorage[key] || '{}');
		} else {
			// old browser, using cookies
			cookies = document.cookie.split(/[;\s|=]/);
			// add one to get from the key to the value
			cookieIndex = $.inArray(key, cookies) + 1;
			values = (cookieIndex !== 0) ? $.parseJSON(cookies[cookieIndex] || '{}') : {};
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

// Add a resize event to table headers
// **************************
ts.addHeaderResizeEvent = function(table, disable, settings) {
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

// Widget: General UI theme
// "uitheme" option in "widgetOptions"
// **************************
ts.addWidget({
	id: "uitheme",
	priority: 10,
	format: function(table, c, wo) {
		var time, classes, $header, $icon, $tfoot,
			themesAll = ts.themes,
			$table = c.$table,
			$headers = c.$headers,
			theme = c.theme || 'jui',
			themes = themesAll[theme] || themesAll.jui,
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc;
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$table.hasClass('tablesorter-' + theme) || c.theme === theme || !table.hasInitialized) {
			// update zebra stripes
			if (themes.even !== '') { wo.zebra[0] += ' ' + themes.even; }
			if (themes.odd !== '') { wo.zebra[1] += ' ' + themes.odd; }
			// add caption style
			$table.find('caption').addClass(themes.caption);
			// add table/footer class names
			$tfoot = $table
				// remove other selected themes
				.removeClass( c.theme === '' ? '' : 'tablesorter-' + c.theme )
				.addClass('tablesorter-' + theme + ' ' + themes.table) // add theme widget class name
				.find('tfoot');
			if ($tfoot.length) {
				$tfoot
					.find('tr').addClass(themes.footerRow)
					.children('th, td').addClass(themes.footerCells);
			}
			// update header classes
			$headers
				.addClass(themes.header)
				.not('.sorter-false')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
					// toggleClass with switch added in jQuery 1.3
					$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover);
				});
			if (!$headers.find('.' + ts.css.wrapper).length) {
				// Firefox needs this inner div to position the resizer correctly
				$headers.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
			}
			if (c.cssIcon) {
				// if c.cssIcon is '', then no <i> is added to the header
				$headers.find('.' + ts.css.icon).addClass(themes.icons);
			}
			if ($table.hasClass('hasFilters')) {
				$headers.find('.' + ts.css.filterRow).addClass(themes.filterRow);
			}
		}
		$.each($headers, function() {
			$header = $(this);
			$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $header;
			if (this.sortDisabled) {
				// no sort arrows for disabled columns!
				$header.removeClass(remove);
				$icon.removeClass(remove + ' ' + themes.icons);
			} else {
				classes = ($header.hasClass(ts.css.sortAsc)) ?
					themes.sortAsc :
					($header.hasClass(ts.css.sortDesc)) ? themes.sortDesc :
						$header.hasClass(ts.css.header) ? themes.sortNone : '';
				$header[classes === themes.sortNone ? 'removeClass' : 'addClass'](themes.active);
				$icon.removeClass(remove).addClass(classes);
			}
		});
		if (c.debug) {
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo) {
		var $table = c.$table,
			theme = c.theme || 'jui',
			themes = ts.themes[ theme ] || ts.themes.jui,
			$headers = $table.children('thead').children(),
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc;
		$table
			.removeClass('tablesorter-' + theme + ' ' + themes.table)
			.find(ts.css.header).removeClass(themes.header);
		$headers
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
			.find('.' + ts.css.filterRow)
			.removeClass(themes.filterRow);
		$headers.find('.' + ts.css.icon).removeClass(themes.icons);
	}
});

// Widget: Column styles
// "columns", "columns_thead" (true) and
// "columns_tfoot" (true) options in "widgetOptions"
// **************************
ts.addWidget({
	id: "columns",
	priority: 30,
	options : {
		columns : [ "primary", "secondary", "tertiary" ]
	},
	format: function(table, c, wo) {
		var time, $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
			$table = c.$table,
			$tbodies = c.$tbodies,
			sortList = c.sortList,
			len = sortList.length,
			// removed c.widgetColumns support
			css = wo && wo.columns || [ "primary", "secondary", "tertiary" ],
			last = css.length - 1;
			remove = css.join(' ');
		if (c.debug) {
			time = new Date();
		}
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
		if (c.debug) {
			ts.benchmark("Applying Columns widget", time);
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

// Widget: filter
// **************************
ts.addWidget({
	id: "filter",
	priority: 50,
	options : {
		filter_childRows     : false, // if true, filter includes child row content in the search
		filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
		filter_cssFilter     : '',    // css class name added to the filter row & each input in the row (tablesorter-filter is ALWAYS added)
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
		filter_selectSource  : null,  // include a function to return an array of values to be added to the column filter select
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
		filter_defaultAttrib : 'data-value' // data attribute in the header cell that contains the default filter value
	},
	format: function(table, c, wo) {
		if (!c.$table.hasClass('hasFilters')) {
			ts.filter.init(table, c, wo);
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$table = c.$table,
			$tbodies = c.$tbodies;
		$table
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '))
			.find('.' + ts.css.filterRow).remove();
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
		exact     : /(^[\"|\'|=]+)|([\"|\'|=]+$)/g, // exact match (allow '==')
		nondigit  : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
		operators : /[<>=]/g // replace operators
	},
		// function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed )
		// filter = array of filter input values; iFilter = same array, except lowercase
		// exact = table cell text (or parsed data if column parser enabled)
		// iExact = same as exact, except lowercase
		// cached = table cell text from cache, so it has been parsed
		// index = column index; table = table element (DOM)
		// wo = widget options (table.config.widgetOptions)
		// parsed = array (by column) of boolean values (from filter_useParsedData or "filter-parsed" class)
	types: {
		// Look for regex
		regex: function( filter, iFilter, exact, iExact ) {
			if ( ts.filter.regex.regex.test(iFilter) ) {
				var matches,
					regex = ts.filter.regex.regex.exec(iFilter);
				try {
					matches = new RegExp(regex[1], regex[2]).test( iExact );
				} catch (error) {
					matches = false;
				}
				return matches;
			}
			return null;
		},
		// Look for operators >, >=, < or <=
		operators: function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( /^[<>]=?/.test(iFilter) ) {
				var cachedValue, result,
					c = table.config,
					query = ts.formatFloat( iFilter.replace(ts.filter.regex.operators, ''), table ),
					parser = c.parsers[index],
					savedSearch = query;
					// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || parser.type === 'numeric') {
					cachedValue = parser.format( '' + iFilter.replace(ts.filter.regex.operators, ''), table, c.$headers.eq(index), index );
					query = ( typeof query === "number" && cachedValue !== '' && !isNaN(cachedValue) ) ? cachedValue : query;
				}
				// iExact may be numeric - see issue #149;
				// check if cached is defined, because sometimes j goes out of range? (numeric columns)
				cachedValue = ( parsed[index] || parser.type === 'numeric' ) && !isNaN(query) && cached ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );
				if ( />/.test(iFilter) ) { result = />=/.test(iFilter) ? cachedValue >= query : cachedValue > query; }
				if ( /</.test(iFilter) ) { result = /<=/.test(iFilter) ? cachedValue <= query : cachedValue < query; }
				// keep showing all rows if nothing follows the operator
				if ( !result && savedSearch === '' ) { result = true; }
				return result;
			}
			return null;
		},
		// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
		exact: function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed, rowArray ) {
			/*jshint eqeqeq:false */
			if (ts.filter.regex.exact.test(iFilter)) {
				var fltr = iFilter.replace(ts.filter.regex.exact, '');
				return rowArray ? $.inArray(fltr, rowArray) >= 0 : fltr == iExact;
			}
			return null;
		},
		// Look for a not match
		notMatch: function( filter, iFilter, exact, iExact, cached, index, table, wo ) {
			if ( /^\!/.test(iFilter) ) {
				iFilter = iFilter.replace('!', '');
				var indx = iExact.search( $.trim(iFilter) );
				return iFilter === '' ? true : !(wo.filter_startsWith ? indx === 0 : indx >= 0);
			}
			return null;
		},
		// Look for an AND or && operator (logical and)
		and : function( filter, iFilter, exact, iExact ) {
			if ( /\s+(AND|&&)\s+/g.test(filter) ) {
				var query = iFilter.split( /(?:\s+(?:and|&&)\s+)/g ),
					result = iExact.search( $.trim(query[0]) ) >= 0,
					indx = query.length - 1;
				while (result && indx) {
					result = result && iExact.search( $.trim(query[indx]) ) >= 0;
					indx--;
				}
				return result;
			}
			return null;
		},
		// Look for a range (using " to " or " - ") - see issue #166; thanks matzhu!
		range : function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( /\s+(-|to)\s+/.test(iFilter) ) {
				var result, tmp,
					c = table.config,
					query = iFilter.split(/(?: - | to )/), // make sure the dash is for a range and not indicating a negative number
					range1 = ts.formatFloat(query[0].replace(ts.filter.regex.nondigit, ''), table),
					range2 = ts.formatFloat(query[1].replace(ts.filter.regex.nondigit, ''), table);
					// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || c.parsers[index].type === 'numeric') {
					result = c.parsers[index].format('' + query[0], table, c.$headers.eq(index), index);
					range1 = (result !== '' && !isNaN(result)) ? result : range1;
					result = c.parsers[index].format('' + query[1], table, c.$headers.eq(index), index);
					range2 = (result !== '' && !isNaN(result)) ? result : range2;
				}
				result = ( parsed[index] || c.parsers[index].type === 'numeric' ) && !isNaN(range1) && !isNaN(range2) ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );
				if (range1 > range2) { tmp = range1; range1 = range2; range2 = tmp; } // swap
				return (result >= range1 && result <= range2) || (range1 === '' || range2 === '');
			}
			return null;
		},
		// Look for wild card: ? = single, * = multiple, or | = logical OR
		wild : function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed, rowArray ) {
			if ( /[\?|\*]/.test(iFilter) || /\s+OR\s+/i.test(filter) ) {
				var c = table.config,
					query = iFilter.replace(/\s+OR\s+/gi,"|");
				// look for an exact match with the "or" unless the "filter-match" class is found
				if (!c.$headers.filter('[data-column="' + index + '"]:last').hasClass('filter-match') && /\|/.test(query)) {
					query = $.isArray(rowArray) ? '(' + query + ')' : '^(' + query + ')$';
				}
				return new RegExp( query.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(iExact);
			}
			return null;
		},
		// fuzzy text search; modified from https://github.com/mattyork/fuzzy (MIT license)
		fuzzy: function( filter, iFilter, exact, iExact ) {
			if ( /^~/.test(iFilter) ) {
				var indx,
					patternIndx = 0,
					len = iExact.length,
					pattern = iFilter.slice(1);
				for (indx = 0; indx < len; indx++) {
					if (iExact[indx] === pattern[patternIndx]) {
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
		var options, string, $header, column, filters, time;
		if (c.debug) {
			time = new Date();
		}
		c.$table.addClass('hasFilters');

		ts.filter.regex.child = new RegExp(c.cssChildRow);
		ts.filter.regex.filtered = new RegExp(wo.filter_filteredRow);

		// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
		if (wo.filter_columnFilters !== false && c.$headers.filter('.filter-false').length !== c.$headers.length) {
			// build filter row
			ts.filter.buildRow(table, c, wo);
		}

		c.$table.bind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '), function(event, filter) {
			c.$table.find('.' + ts.css.filterRow).toggle( !(wo.filter_hideEmpty && $.isEmptyObject(c.cache)) ); // fixes #450
			if ( !/(search|filter)/.test(event.type) ) {
				event.stopPropagation();
				ts.filter.buildDefault(table, true);
			}
			if (event.type === 'filterReset') {
				ts.filter.searching(table, []);
			} else if (event.type === 'filterEnd') {
				ts.filter.buildDefault(table, true);
			} else {
				// send false argument to force a new search; otherwise if the filter hasn't changed, it will return
				filter = event.type === 'search' ? filter : event.type === 'updateComplete' ? c.$table.data('lastSearch') : '';
				if (/(update|add)/.test(event.type) && event.type !== "updateComplete") {
					// force a new search since content has changed
					c.lastCombinedFilter = null;
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
					// trigger a reset event, so other functions (filterFormatter) know when to reset
					c.$table.trigger('filterReset');
				});
			}
		}
		if (wo.filter_functions) {
			// column = column # (string)
			for (column in wo.filter_functions) {
				if (wo.filter_functions.hasOwnProperty(column) && typeof column === 'string') {
					$header = c.$headers.filter('[data-column="' + column + '"]:last');
					options = '';
					if (wo.filter_functions[column] === true && !$header.hasClass('filter-false')) {
						ts.filter.buildSelect(table, column);
					} else if (typeof column === 'string' && !$header.hasClass('filter-false')) {
						// add custom drop down list
						for (string in wo.filter_functions[column]) {
							if (typeof string === 'string') {
								options += options === '' ?
									'<option value="">' + ($header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.select || '') + '</option>' : '';
								options += '<option value="' + string + '">' + string + '</option>';
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
			c.$table.bind('filterStart' + c.namespace + 'filter filterEnd' + c.namespace + 'filter', function(event, columns) {
				// only add processing to certain columns to all columns
				$header = (columns) ? c.$table.find('.' + ts.css.header).filter('[data-column]').filter(function() {
					return columns[$(this).data('column')] !== '';
				}) : '';
				ts.isProcessing(table, event.type === 'filterStart', columns ? $header : '');
			});
		}

		if (c.debug) {
			ts.benchmark("Applying Filter widget", time);
		}
		// add default values
		c.$table.bind('tablesorter-initialized pagerInitialized', function() {
			filters = ts.filter.setDefaults(table, c, wo) || [];
			if (filters.length) {
				ts.setFilters(table, filters, true);
			}
			c.$table.trigger('filterFomatterUpdate');
			ts.filter.checkFilters(table, filters);
		});
		// filter widget initialized
		wo.filter_initialized = true;
		c.$table.trigger('filterInit');
	},
	setDefaults: function(table, c, wo) {
		var isArray, saved, indx,
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
			for (indx = 0; indx < c.columns; indx++) {
				filters[indx] = c.$headers.filter('[data-column="' + indx + '"]:last').attr(wo.filter_defaultAttrib) || filters[indx];
			}
		}
		c.$table.data('lastSearch', filters);
		return filters;
	},
	buildRow: function(table, c, wo) {
		var column, $header, buildSelect, disabled, name,
			// c.columns defined in computeThIndexes()
			columns = c.columns,
			buildFilter = '<tr class="' + ts.css.filterRow + '">';
		for (column = 0; column < columns; column++) {
			buildFilter += '<td></td>';
		}
		c.$filters = $(buildFilter += '</tr>').appendTo( c.$table.children('thead').eq(0) ).find('td');
		// build each filter input
		for (column = 0; column < columns; column++) {
			disabled = false;
			// assuming last cell of a column is the main column
			$header = c.$headers.filter('[data-column="' + column + '"]:last');
			buildSelect = (wo.filter_functions && wo.filter_functions[column] && typeof wo.filter_functions[column] !== 'function') ||
				$header.hasClass('filter-select');
			// get data from jQuery data, metadata, headers option or header class name
			if (ts.getData) {
				// get data from jQuery data, metadata, headers option or header class name
				disabled = ts.getData($header[0], c.headers[column], 'filter') === 'false';
			} else {
				// only class names and header options - keep this for compatibility with tablesorter v2.0.5
				disabled = (c.headers[column] && c.headers[column].hasOwnProperty('filter') && c.headers[column].filter === false) ||
					$header.hasClass('filter-false');
			}
			if (buildSelect) {
				buildFilter = $('<select>').appendTo( c.$filters.eq(column) );
			} else {
				if (wo.filter_formatter && $.isFunction(wo.filter_formatter[column])) {
					buildFilter = wo.filter_formatter[column]( c.$filters.eq(column), column );
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
			wo.filter_$anyMatch = $el.filter('[data-column="all"]');
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
		.unbind('keyup search change '.split(' ').join(c.namespace + 'filter '))
		// include change for select - fixes #473
		.bind('keyup search change '.split(' ').join(c.namespace + 'filter '), function(event) {
			$(this).attr('data-lastSearchTime', new Date().getTime());
			// emulate what webkit does.... escape clears the filter
			if (event.which === 27) {
				this.value = '';
			// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
			} else if ( (typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch && this.value !== '') ||
				( event.type === 'keyup' && ( (event.which < 32 && event.which !== 8 && wo.filter_liveSearch === true && event.which !== 13) ||
				( event.which >= 37 && event.which <= 40 ) || (event.which !== 13 && wo.filter_liveSearch === false) ) ) ) {
					return;
			}
			// true flag tells getFilters to skip newest timed input
			ts.filter.searching( table, true, true );
		});
		c.$table.bind('filterReset', function(){
			$el.val('');
		});
	},
	checkFilters: function(table, filter, skipFirst) {
		var c = table.config,
			wo = c.widgetOptions,
			filterArray = $.isArray(filter),
			filters = (filterArray) ? filter : ts.getFilters(table, true),
			combinedFilters = (filters || []).join(''); // combined filter values
		// add filter array back into inputs
		if (filterArray) {
			ts.setFilters( table, filters, false, skipFirst !== true );
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
		}
		c.$table.trigger('filterStart', [filters]);
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
		c.$table
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
					if (ts.getFilters(table).join('') === '') {
						$filterRow2[ event.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
					}
				}, 200);
			});
	},
	findRows: function(table, filters, combinedFilters) {
		if (table.config.lastCombinedFilter === combinedFilters) { return; }
		var cached, len, $rows, cacheIndex, rowIndex, tbodyIndex, $tbody, $cells, columnIndex,
			childRow, childRowText, exact, iExact, iFilter, lastSearch, matches, result,
			searchFiltered, filterMatched, showRow, time,
			anyMatch, iAnyMatch, rowArray, rowText, iRowText, rowCache,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns,
			$tbodies = c.$table.children('tbody'), // target all tbodies #568
			// anyMatch really screws up with these types of filters
			anyMatchNotAllowedTypes = [ 'range', 'notMatch',  'operators' ],
			// parse columns after formatter, in case the class is added at that point
			parsed = c.$headers.map(function(columnIndex) {
				return c.parsers && c.parsers[columnIndex] && c.parsers[columnIndex].parsed || ( ts.getData ?
					ts.getData(c.$headers.filter('[data-column="' + columnIndex + '"]:last'), c.headers[columnIndex], 'filter') === 'parsed' :
					$(this).hasClass('filter-parsed') );
			}).get();
		if (c.debug) { time = new Date(); }
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			if ($tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock || ts.css.info)) { continue; } // ignore info blocks, issue #264
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
			// skip child rows & widget added (removable) rows - fixes #448 thanks to @hempel!
			// $rows = $tbody.children('tr').not(c.selectorRemove);
			columnIndex = c.columns;
			// convert stored rows into a jQuery object
			$rows = true ? $( $.map(c.cache[tbodyIndex].normalized, function(el){ return el[columnIndex].$row.get(); }) ) : $tbody.children('tr').not(c.selectorRemove);
			len = $rows.length;
			if (combinedFilters === '' || wo.filter_serversideFiltering) {
				$rows.removeClass(wo.filter_filteredRow).not('.' + c.cssChildRow).show();
			} else {
				// optimize searching only through already filtered rows - see #313
				searchFiltered = true;
				lastSearch = c.lastSearch || c.$table.data('lastSearch') || [];
				$.each(filters, function(indx, val) {
					// check for changes from beginning of filter; but ignore if there is a logical "or" in the string
					searchFiltered = (val || '').indexOf(lastSearch[indx]) === 0 && searchFiltered && !/(\s+or\s+|\|)/g.test(val || '');
				});
				// can't search when all rows are hidden - this happens when looking for exact matches
				if (searchFiltered && $rows.not('.' + wo.filter_filteredRow).length === 0) { searchFiltered = false; }
				if ((wo.filter_$anyMatch && wo.filter_$anyMatch.length) || filters[c.columns]) {
					anyMatch = wo.filter_$anyMatch && wo.filter_$anyMatch.val() || filters[c.columns] || '';
					if (c.sortLocaleCompare) {
						// replace accents
						anyMatch = ts.replaceAccents(anyMatch);
					}
					iAnyMatch = anyMatch.toLowerCase();
				}
				// loop through the rows
				cacheIndex = 0;
				for (rowIndex = 0; rowIndex < len; rowIndex++) {
					childRow = $rows[rowIndex].className;
					// skip child rows & already filtered rows
					if ( ts.filter.regex.child.test(childRow) || (searchFiltered && ts.filter.regex.filtered.test(childRow)) ) { continue; }
					showRow = true;
					// *** nextAll/nextUntil not supported by Zepto! ***
					childRow = $rows.eq(rowIndex).nextUntil('tr:not(.' + c.cssChildRow + ')');
					// so, if "table.config.widgetOptions.filter_childRows" is true and there is
					// a match anywhere in the child row, then it will make the row visible
					// checked here so the option can be changed dynamically
					childRowText = (childRow.length && wo.filter_childRows) ? childRow.text() : '';
					childRowText = wo.filter_ignoreCase ? childRowText.toLocaleLowerCase() : childRowText;
					$cells = $rows.eq(rowIndex).children();

					if (anyMatch) {
						rowArray = $cells.map(function(i){
							var txt;
							if (parsed[i]) {
								txt = c.cache[tbodyIndex].normalized[cacheIndex][i];
							} else {
								txt = wo.filter_ignoreCase ? $(this).text().toLowerCase() : $(this).text();
								if (c.sortLocaleCompare) {
									txt = ts.replaceAccents(txt);
								}
							}
							return txt;
						}).get();
						rowText = rowArray.join(' ');
						iRowText = rowText.toLowerCase();
						rowCache = c.cache[tbodyIndex].normalized[cacheIndex].slice(0,-1).join(' ');
						filterMatched = null;
						$.each(ts.filter.types, function(type, typeFunction) {
							if ($.inArray(type, anyMatchNotAllowedTypes) < 0) {
								matches = typeFunction( anyMatch, iAnyMatch, rowText, iRowText, rowCache, columns, table, wo, parsed, rowArray );
								if (matches !== null) {
									filterMatched = matches;
									return false;
								}
							}
						});
						if (filterMatched !== null) {
							showRow = filterMatched;
						} else {
							showRow = (iRowText + childRowText).indexOf(iAnyMatch) >= 0;
						}
					}

					for (columnIndex = 0; columnIndex < columns; columnIndex++) {
						// ignore if filter is empty or disabled
						if (filters[columnIndex]) {
							cached = c.cache[tbodyIndex].normalized[cacheIndex][columnIndex];
							// check if column data should be from the cell or from parsed data
							if (wo.filter_useParsedData || parsed[columnIndex]) {
								exact = cached;
							} else {
							// using older or original tablesorter
								exact = $.trim($cells.eq(columnIndex).text());
								exact = c.sortLocaleCompare ? ts.replaceAccents(exact) : exact; // issue #405
							}
							iExact = !ts.filter.regex.type.test(typeof exact) && wo.filter_ignoreCase ? exact.toLocaleLowerCase() : exact;
							result = showRow; // if showRow is true, show that row

							// replace accents - see #357
							filters[columnIndex] = c.sortLocaleCompare ? ts.replaceAccents(filters[columnIndex]) : filters[columnIndex];
							// val = case insensitive, filters[columnIndex] = case sensitive
							iFilter = wo.filter_ignoreCase ? (filters[columnIndex] || '').toLocaleLowerCase() : filters[columnIndex];
							if (wo.filter_functions && wo.filter_functions[columnIndex]) {
								if (wo.filter_functions[columnIndex] === true) {
									// default selector; no "filter-select" class
									result = (c.$headers.filter('[data-column="' + columnIndex + '"]:last').hasClass('filter-match')) ?
										iExact.search(iFilter) >= 0 : filters[columnIndex] === exact;
								} else if (typeof wo.filter_functions[columnIndex] === 'function') {
									// filter callback( exact cell content, parser normalized content, filter input value, column index, jQuery row object )
									result = wo.filter_functions[columnIndex](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								} else if (typeof wo.filter_functions[columnIndex][filters[columnIndex]] === 'function') {
									// selector option function
									result = wo.filter_functions[columnIndex][filters[columnIndex]](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								}
							} else {
								filterMatched = null;
								// cycle through the different filters
								// filters return a boolean or null if nothing matches
								$.each(ts.filter.types, function(type, typeFunction) {
									matches = typeFunction( filters[columnIndex], iFilter, exact, iExact, cached, columnIndex, table, wo, parsed );
									if (matches !== null) {
										filterMatched = matches;
										return false;
									}
								});
								if (filterMatched !== null) {
									result = filterMatched;
								// Look for match, and add child row data for matching
								} else {
									exact = (iExact + childRowText).indexOf(iFilter);
									result = ( (!wo.filter_startsWith && exact >= 0) || (wo.filter_startsWith && exact === 0) );
								}
							}
							showRow = (result) ? showRow : false;
						}
					}
					$rows.eq(rowIndex)
						.toggle(showRow)
						.toggleClass(wo.filter_filteredRow, !showRow);
					if (childRow.length) {
						childRow.toggleClass(wo.filter_filteredRow, !showRow);
					}
					cacheIndex++;
				}
			}
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
		c.$table.trigger('filterEnd');
		setTimeout(function(){
			c.$table.trigger('applyWidgets'); // make sure zebra widget is applied
		}, 0);
	},
	getOptionSource: function(table, column, onlyAvail) {
		var c = table.config,
			wo = c.widgetOptions,
			arry = false,
			source = wo.filter_selectSource;

		// filter select source option
		if ($.isFunction(source)) {
			// OVERALL source
			arry = source(table, column, onlyAvail);
		} else if ($.type(source) === 'object' && source.hasOwnProperty(column)) {
			// custom select source function for a SPECIFIC COLUMN
			arry = source[column](table, column, onlyAvail);
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
		return (ts.sortNatural) ? arry.sort(function(a, b) { return ts.sortNatural(a, b); }) : arry.sort(true);
	},
	getOptions: function(table, column, onlyAvail) {
		var rowIndex, tbodyIndex, len, row, cache, cell,
			c = table.config,
			wo = c.widgetOptions,
			$tbodies = c.$table.children('tbody'),
			arry = [];
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			if (!$tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock)) {
				cache = c.cache[tbodyIndex];
				len = c.cache[tbodyIndex].normalized.length;
				// loop through the rows
				for (rowIndex = 0; rowIndex < len; rowIndex++) {
					// get cached row from cache.row (old) or row data object (new; last item in normalized array)
					row = cache.row ? cache.row[rowIndex] : cache.normalized[rowIndex][c.columns].$row[0];
					// check if has class filtered
					if (onlyAvail && row.className.match(wo.filter_filteredRow)) { continue; }
					// get non-normalized cell content
					if (wo.filter_useParsedData) {
						arry.push( '' + cache.normalized[rowIndex][column] );
					} else {
						cell = row.cells[column];
						if (cell) {
							arry.push( $.trim( cell.textContent || cell.innerText || $(cell).text() ) );
						}
					}
				}
			}
		}
		return arry;
	},
	buildSelect: function(table, column, updating, onlyAvail) {
		if (!table.config.cache || $.isEmptyObject(table.config.cache)) { return; }
		column = parseInt(column, 10);
		var indx, txt, $filters,
			c = table.config,
			wo = c.widgetOptions,
			node = c.$headers.filter('[data-column="' + column + '"]:last'),
			// t.data('placeholder') won't work in jQuery older than 1.4.3
			options = '<option value="">' + ( node.data('placeholder') || node.attr('data-placeholder') || wo.filter_placeholder.select || '' ) + '</option>',
			arry = ts.filter.getOptionSource(table, column, onlyAvail),
			// Get curent filter value
			currentValue = c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').val();

		// build option list
		for (indx = 0; indx < arry.length; indx++) {
			txt = arry[indx].replace(/\"/g, "&quot;");
			// replace quotes - fixes #242 & ignore empty strings - see http://stackoverflow.com/q/14990971/145346
			options += arry[indx] !== '' ? '<option value="' + txt + '"' + (currentValue === txt ? ' selected="selected"' : '') +
				'>' + arry[indx] + '</option>' : '';
		}
		// update all selects in the same column (clone thead in sticky headers & any external selects) - fixes 473
		$filters = ( c.$filters ? c.$filters : c.$table.children('thead') ).find('.' + ts.css.filter);
		if (wo.filter_$externalFilters) {
			$filters = $filters && $filters.length ? $filters.add(wo.filter_$externalFilters) : wo.filter_$externalFilters;
		}
		$filters.filter('select[data-column="' + column + '"]')[ updating ? 'html' : 'append' ](options);
	},
	buildDefault: function(table, updating) {
		var columnIndex, $header,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns;
		// build default select dropdown
		for (columnIndex = 0; columnIndex < columns; columnIndex++) {
			$header = c.$headers.filter('[data-column="' + columnIndex + '"]:last');
			// look for the filter-select class; build/update it if found
			if (($header.hasClass('filter-select') || wo.filter_functions && wo.filter_functions[columnIndex] === true) &&
				!$header.hasClass('filter-false')) {
				if (!wo.filter_functions) { wo.filter_functions = {}; }
				wo.filter_functions[columnIndex] = true; // make sure this select gets processed by filter_functions
				ts.filter.buildSelect(table, columnIndex, updating, $header.hasClass(wo.filter_onlyAvail));
			}
		}
	},
	searching: function(table, filter, skipFirst) {
		if (typeof filter === 'undefined' || filter === true) {
			var wo = table.config.widgetOptions;
			// delay filtering
			clearTimeout(wo.searchTimer);
			wo.searchTimer = setTimeout(function() {
				ts.filter.checkFilters(table, filter, skipFirst );
			}, wo.filter_liveSearch ? wo.filter_searchDelay : 10);
		} else {
			// skip delay
			ts.filter.checkFilters(table, filter, skipFirst);
		}
	}
};

ts.getFilters = function(table, getRaw, setFilters, skipFirst) {
	var i, $filters, $column,
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
				$column = $filters.filter('[data-column="' + (i === c.columns ? 'all' : i) + '"]');
				if ($column.length) {
					// move the latest search to the first slot in the array
					$column = $column.sort(function(a, b){
						return $(b).attr('data-lastSearchTime') - $(a).attr('data-lastSearchTime');
					});
					if ($.isArray(setFilters)) {
						// skip first (latest input) to maintain cursor position while typing
						(skipFirst ? $column.slice(1) : $column).val( setFilters[i] ).trigger('change.tsfilter');
					} else {
						filters[i] = $column.val() || '';
						// don't change the first... it will move the cursor
						$column.slice(1).val( filters[i] );
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
		ts.filter.searching(c.$table[0], filter, skipFirst);
		c.$table.trigger('filterFomatterUpdate');
	}
	return !!valid;
};

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60, // sticky widget must be initialized after the filter widget!
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_attachTo : null, // jQuery selector or object to attach sticky header to
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
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
		var $cell,
			$table = c.$table,
			$attach = $(wo.stickyHeaders_attachTo),
			$thead = $table.children('thead:first'),
			$win = $attach.length ? $attach : $(window),
			$header = $thead.children('tr').not('.sticky-false').children(),
			innerHeader = '.' + ts.css.headerIn,
			$tfoot = $table.find('tfoot'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $attach.length ? 0 : $stickyOffset.length ?
				$stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			$stickyTable = wo.$sticky = $table.clone()
				.addClass('containsStickyHeaders')
				.css({
					position   : $attach.length ? 'absolute' : 'fixed',
					margin     : 0,
					top        : stickyOffset,
					left       : 0,
					visibility : 'hidden',
					zIndex     : wo.stickyHeaders_zIndex ? wo.stickyHeaders_zIndex : 2
				}),
			$stickyThead = $stickyTable.children('thead:first').addClass(ts.css.sticky + ' ' + wo.stickyHeaders),
			$stickyCells,
			laststate = '',
			spacing = 0,
			nonwkie = $table.css('border-collapse') !== 'collapse' && !/(webkit|msie)/i.test(navigator.userAgent),
			resizeHeader = function() {
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				spacing = 0;
				// yes, I dislike browser sniffing, but it really is needed here :(
				// webkit automatically compensates for border spacing
				if (nonwkie) {
					// Firefox & Opera use the border-spacing
					// update border-spacing here because of demos that switch themes
					spacing = parseInt($header.eq(0).css('border-left-width'), 10) * 2;
				}
				$stickyTable.css({
					left : $attach.length ? (parseInt($attach.css('padding-left'), 10) || 0) + parseInt(c.$table.css('padding-left'), 10) +
						parseInt(c.$table.css('margin-left'), 10) + parseInt($table.css('border-left-width'), 10) :
						$thead.offset().left - $win.scrollLeft() - spacing,
					width: $table.width()
				});
				$stickyCells.filter(':visible').each(function(i) {
					var $cell = $header.filter(':visible').eq(i),
						// some wibbly-wobbly... timey-wimey... stuff, to make columns line up in Firefox
						offset = nonwkie && $(this).attr('data-column') === ( '' + parseInt(c.columns/2, 10) ) ? 1 : 0;
					$(this)
						.css({
							width: $cell.width() - spacing,
							height: $cell.height()
						})
						.find(innerHeader).width( $cell.find(innerHeader).width() - offset );
				});
			};
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
		$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
		$stickyTable.find('tbody, tfoot').remove();
		if (!wo.stickyHeaders_includeCaption) {
			$stickyTable.find('caption').remove();
		} else {
			$stickyTable.find('caption').css( 'margin-left', '-1px' );
		}
		// issue #172 - find td/th in sticky header
		$stickyCells = $stickyThead.children().children();
		$stickyTable.css({ height:0, width:0, padding:0, margin:0, border:0 });
		// remove resizable block
		$stickyCells.find('.' + ts.css.resizer).remove();
		// update sticky header class names to match real header after sorting
		$table
			.addClass('hasStickyHeaders')
			.bind('sortEnd.tsSticky', function() {
				$header.filter(':visible').each(function(indx) {
					$cell = $stickyCells.filter(':visible').eq(indx)
						.attr('class', $(this).attr('class'))
						// remove processing icon
						.removeClass(ts.css.processing + ' ' + c.cssProcessing);
					if (c.cssIcon) {
						$cell
							.find('.' + ts.css.icon)
							.attr('class', $(this).find('.' + ts.css.icon).attr('class'));
					}
				});
			})
			.bind('pagerComplete.tsSticky', function() {
				resizeHeader();
			});

		ts.bindEvents(table, $stickyThead.children().children('.tablesorter-header'));

		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( $stickyTable );
		// make it sticky!
		$win.bind('scroll.tsSticky resize.tsSticky', function(event) {
			if (!$table.is(':visible')) { return; } // fixes #278
			var prefix = 'tablesorter-sticky-',
				offset = $table.offset(),
				captionHeight = (wo.stickyHeaders_includeCaption ? 0 : $table.find('caption').outerHeight(true)),
				scrollTop = ($attach.length ? $attach.offset().top : $win.scrollTop()) + stickyOffset - captionHeight,
				tableHeight = $table.height() - ($stickyTable.height() + ($tfoot.height() || 0)),
				isVisible = (scrollTop > offset.top) && (scrollTop < offset.top + tableHeight) ? 'visible' : 'hidden',
				cssSettings = { visibility : isVisible };
			if ($attach.length) {
				cssSettings.top = $attach.scrollTop();
			} else {
				// adjust when scrolling horizontally - fixes issue #143
				cssSettings.left = $thead.offset().left - $win.scrollLeft() - spacing;
			}
			$stickyTable
				.removeClass(prefix + 'visible ' + prefix + 'hidden')
				.addClass(prefix + isVisible)
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
		if ($table.hasClass('hasFilters')) {
			// scroll table into view after filtering, if sticky header is active - #482
			$table.bind('filterEnd', function() {
				// $(':focus') needs jQuery 1.6+
				var $td = $(document.activeElement).closest('td'),
					column = $td.parent().children().index($td);
				// only scroll if sticky header is active
				if ($stickyTable.hasClass(ts.css.stickyVis)) {
					// scroll to original table (not sticky clone)
					window.scrollTo(0, $table.position().top);
					// give same input/select focus
					if (column >= 0) {
						c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
					}
				}
			});
			ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
		}

		$table.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo) {
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind('sortEnd.tsSticky pagerComplete.tsSticky')
			.find('.' + ts.css.sticky).remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		// don't unbind if any table on the page still has stickyheaders applied
		if (!$('.hasStickyHeaders').length) {
			$(window).unbind('scroll.tsSticky resize.tsSticky');
		}
		ts.addHeaderResizeEvent(table, false);
	}
});

// Add Column resizing widget
// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: "resizable",
	priority: 40,
	options: {
		resizable : true,
		resizable_addLastColumn : false,
		resizable_widths : []
	},
	format: function(table, c, wo) {
		if (c.$table.hasClass('hasResizable')) { return; }
		c.$table.addClass('hasResizable');
		ts.resizableReset(table, true); // set default widths
		var $rows, $columns, $column, column,
			storedSizes = {},
			$table = c.$table,
			mouseXPosition = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($table.parent().width() - $table.width()) < 20,
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
			canResize = ts.getData( $column, c.headers[column], 'resizable') === "false";
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
				padding = parseInt($column.css('padding-right'), 10) + 10; // 10 is 1/2 of the 20px wide resizer grip
			$column
				.find('.' + ts.css.wrapper)
				.append('<div class="' + ts.css.resizer + '" style="cursor:w-resize;position:absolute;z-index:1;right:-' +
					padding + 'px;top:0;height:100%;width:20px;"></div>');
		})
		.bind('mousemove.tsresize', function(event) {
			// ignore mousemove if no mousedown
			if (mouseXPosition === 0 || !$target) { return; }
			// resize columns
			var leftEdge = event.pageX - mouseXPosition,
				targetWidth = $target.width();
			$target.width( targetWidth + leftEdge );
			if ($target.width() !== targetWidth && fullWidth) {
				$next.width( $next.width() - leftEdge );
			}
			mouseXPosition = event.pageX;
		})
		.bind('mouseup.tsresize', function() {
			stopResize();
		})
		.find('.' + ts.css.resizer + ',.' + ts.css.grip)
		.bind('mousedown', function(event) {
			// save header cell and mouse position; closest() not supported by jQuery v1.2.6
			$target = $(event.target).closest('th');
			var $header = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if ($header.length > 1) { $target = $target.add($header); }
			// if table is not as wide as it's parent, then resize the table
			$next = event.shiftKey ? $target.parent().find('th').not('.resizable-false').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			mouseXPosition = event.pageX;
		});
		$table.find('thead:first')
		.bind('mouseup.tsresize mouseleave.tsresize', function() {
			stopResize();
		})
		// right click to reset columns to default widths
		.bind('contextmenu.tsresize', function() {
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
			.find('.' + ts.css.resizer + ',.' + ts.css.grip).remove();
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
				if (wo.resizable_widths[i]) {
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

// Save table sort widget
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
	remove: function(table) {
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);
