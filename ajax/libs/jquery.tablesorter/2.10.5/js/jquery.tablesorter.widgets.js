/*! tableSorter 2.8+ widgets - updated 5/28/2013
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
;(function($){
"use strict";
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	"bootstrap" : {
		table      : 'table table-bordered table-striped',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up',
		sortDesc   : 'icon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // even row zebra striping
		odd        : ''  // odd row zebra striping
	},
	"jui" : {
		table      : 'ui-widget ui-widget-content ui-corner-all', // table classes
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
ts.storage = function(table, key, val){
	var d, k, ls = false, v = {},
	id = table.id || $('.tablesorter').index( $(table) ),
	url = window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			ls = true;
			window.localStorage.removeItem('_tmptest');
		} catch(e) {}
	}
	// *** get val ***
	if ($.parseJSON){
		if (ls){
			v = $.parseJSON(localStorage[key] || '{}');
		} else {
			k = document.cookie.split(/[;\s|=]/); // cookie
			d = $.inArray(key, k) + 1; // add one to get from the key to the value
			v = (d !== 0) ? $.parseJSON(k[d] || '{}') : {};
		}
	}
	// allow val to be an empty string to 
	if ((val || val === '') && window.JSON && JSON.hasOwnProperty('stringify')){
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!v[url]) {
			v[url] = {};
		}
		v[url][id] = val;
		// *** set val ***
		if (ls){
			localStorage[key] = JSON.stringify(v);
		} else {
			d = new Date();
			d.setTime(d.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(v)).replace(/\"/g,'\"') + '; expires=' + d.toGMTString() + '; path=/';
		}
	} else {
		return v && v[url] ? v[url][id] : {};
	}
};

// Add a resize event to table headers
// **************************
ts.addHeaderResizeEvent = function(table, disable, options){
	var defaults = {
		timer : 250
	},
	o = $.extend({}, defaults, options),
	c = table.config,
	wo = c.widgetOptions,
	headers,
	checkSizes = function(){
		wo.resize_flag = true;
		headers = [];
		c.$headers.each(function(){
			var d = $.data(this, 'savedSizes'),
				w = this.offsetWidth,
				h = this.offsetHeight;
			if (w !== d[0] || h !== d[1]) {
				$.data(this, 'savedSizes', [ w, h ]);
				headers.push(this);
			}
		});
		if (headers.length) { c.$table.trigger('resize', [ headers ]); }
		wo.resize_flag = false;
	};
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	c.$headers.each(function(){
		$.data(this, 'savedSizes', [ this.offsetWidth, this.offsetHeight ]);
	});
	wo.resize_timer = setInterval(function(){
		if (wo.resize_flag) { return; }
		checkSizes();
	}, o.timer);
};

// Widget: General UI theme
// "uitheme" option in "widgetOptions"
// **************************
ts.addWidget({
	id: "uitheme",
	priority: 10,
	options: {
		uitheme : 'jui'
	},
	format: function(table, c, wo){
		var time, klass, $el, $tar,
			t = ts.themes,
			$t = c.$table,
			theme = c.theme !== 'default' ? c.theme : wo.uitheme || 'jui',
			o = t[ t[theme] ? theme : t[wo.uitheme] ? wo.uitheme : 'jui'],
			$h = c.$headers,
			sh = 'tr.' + (wo.stickyHeaders || 'tablesorter-stickyHeader'),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		if (c.debug) { time = new Date(); }
		if (!$t.hasClass('tablesorter-' + theme) || c.theme === theme || !table.hasInitialized){
			// update zebra stripes
			if (o.even !== '') { wo.zebra[0] += ' ' + o.even; }
			if (o.odd !== '') { wo.zebra[1] += ' ' + o.odd; }
			// add table/footer class names
			t = $t
				// remove other selected themes; use widgetOptions.theme_remove
				.removeClass( c.theme === '' ? '' : 'tablesorter-' + c.theme )
				.addClass('tablesorter-' + theme + ' ' + o.table) // add theme widget class name
				.find('tfoot');
			if (t.length) {
				t
				.find('tr').addClass(o.footerRow)
				.children('th, td').addClass(o.footerCells);
			}
			// update header classes
			$h
				.addClass(o.header)
				.filter(':not(.sorter-false)')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(e){
					// toggleClass with switch added in jQuery 1.3
					$(this)[ e.type === 'mouseenter' ? 'addClass' : 'removeClass' ](o.hover);
				});
			if (!$h.find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the resizer correctly
				$h.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			if (c.cssIcon){
				// if c.cssIcon is '', then no <i> is added to the header
				$h.find('.' + c.cssIcon).addClass(o.icons);
			}
			if ($t.hasClass('hasFilters')){
				$h.find('.tablesorter-filter-row').addClass(o.filterRow);
			}
		}
		$.each($h, function(i){
			$el = $(this);
			$tar = (c.cssIcon) ? $el.find('.' + c.cssIcon) : $el;
			if (this.sortDisabled){
				// no sort arrows for disabled columns!
				$el.removeClass(rmv);
				$tar.removeClass(rmv + ' tablesorter-icon ' + o.icons);
			} else {
				t = ($t.hasClass('hasStickyHeaders')) ? $t.find(sh).find('th').eq(i).add($el) : $el;
				klass = ($el.hasClass(c.cssAsc)) ? o.sortAsc : ($el.hasClass(c.cssDesc)) ? o.sortDesc : $el.hasClass(c.cssHeader) ? o.sortNone : '';
				$el[klass === o.sortNone ? 'removeClass' : 'addClass'](o.active);
				$tar.removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug){
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo){
		var $t = c.$table,
			theme = typeof wo.uitheme === 'object' ? 'jui' : wo.uitheme || 'jui',
			o = typeof wo.uitheme === 'object' ? wo.uitheme : ts.themes[ ts.themes.hasOwnProperty(theme) ? theme : 'jui'],
			$h = $t.children('thead').children(),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		$t
			.removeClass('tablesorter-' + theme + ' ' + o.table)
			.find(c.cssHeader).removeClass(o.header);
		$h
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(o.hover + ' ' + rmv + ' ' + o.active)
			.find('.tablesorter-filter-row').removeClass(o.filterRow);
		$h.find('.tablesorter-icon').removeClass(o.icons);
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
	format: function(table, c, wo){
		var $tb, $tr, $td, $t, time, last, rmv, i, k, l,
		$tbl = c.$table,
		b = c.$tbodies,
		list = c.sortList,
		len = list.length,
		// keep backwards compatibility, for now
		css = (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) ? c.widgetColumns.css || css :
			(wo && wo.hasOwnProperty('columns')) ? wo.columns || css : css;
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug){
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		for (k = 0; k < b.length; k++ ){
			$tb = ts.processTbody(table, b.eq(k), true); // detach tbody
			$tr = $tb.children('tr');
			l = $tr.length;
			// loop through the visible rows
			$tr.each(function(){
				$t = $(this);
				if (this.style.display !== 'none'){
					// remove all columns class names
					$td = $t.children().removeClass(rmv);
					// add appropriate column class names
					if (list && list[0]){
						// primary sort column class
						$td.eq(list[0][0]).addClass(css[0]);
						if (len > 1){
							for (i = 1; i < len; i++){
								// secondary, tertiary, etc sort column classes
								$td.eq(list[i][0]).addClass( css[i] || css[last] );
							}
						}
					}
				}
			});
			ts.processTbody(table, $tb, false);
		}
		// add classes to thead and tfoot
		$tr = wo.columns_thead !== false ? 'thead tr' : '';
		if (wo.columns_tfoot !== false) {
			$tr += ($tr === '' ? '' : ',') + 'tfoot tr';
		}
		if ($tr.length) {
			$t = $tbl.find($tr).children().removeClass(rmv);
			if (list && list[0]){
				// primary sort column class
				$t.filter('[data-column="' + list[0][0] + '"]').addClass(css[0]);
				if (len > 1){
					for (i = 1; i < len; i++){
						// secondary, tertiary, etc sort column classes
						$t.filter('[data-column="' + list[i][0] + '"]').addClass(css[i] || css[last]);
					}
				}
			}
		}
		if (c.debug){
			ts.benchmark("Applying Columns widget", time);
		}
	},
	remove: function(table, c, wo){
		var k, $tb,
			b = c.$tbodies,
			rmv = (wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(rmv);
		c.$table.children('tfoot').children('tr').children('th, td').removeClass(rmv);
		for (k = 0; k < b.length; k++ ){
			$tb = ts.processTbody(table, b.eq(k), true); // remove tbody
			$tb.children('tr').each(function(){
				$(this).children().removeClass(rmv);
			});
			ts.processTbody(table, $tb, false); // restore tbody
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
		filter_cssFilter     : 'tablesorter-filter', // css class name added to the filter row & each input in the row
		filter_filteredRow   : 'filtered', // class added to filtered rows; needed by pager plugin
		filter_formatter     : null,  // add custom filter elements to the filter row
		filter_functions     : null,  // add custom filter functions using this option
		filter_hideFilters   : false, // collapse filter row when mouse leaves the area
		filter_ignoreCase    : true,  // if true, make all searches case-insensitive
		filter_liveSearch    : true,  // if true, search column content while the user types (with a delay)
		filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available (visible) options within the drop down
		filter_reset         : null,  // jQuery selector string of an element used to reset the filters
		filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.

		// regex used in filter "check" functions - not for general use and not documented
		filter_regex : {
			"regex" : /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // regex to test for regex
			"child" : /tablesorter-childRow/, // child row class name; this gets updated in the script
			"filtered" : /filtered/, // filtered (hidden) row class name; updated in the script
			"type" : /undefined|number/, // check type
			"exact" : /(^[\"|\'|=])|([\"|\'|=]$)/g, // exact match
			"nondigit" : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
			"operators" : /[<>=]/g // replace operators
		}
	},
	format: function(table, c, wo){
		if (c.parsers && !c.$table.hasClass('hasFilters')){
			var i, j, k, l, val, ff, x, xi, st, sel, str,
			ft, ft2, $th, rg, s, t, dis, col,
			fmt = ts.formatFloat,
			last = '', // save last filter search
			$ths = c.$headers,
			css = wo.filter_cssFilter,
			$t = c.$table.addClass('hasFilters'),
			b = $t.find('tbody'),
			cols = c.parsers.length,
			parsed, time, timer,

			// dig fer gold
			checkFilters = function(filter){
				var arry = $.isArray(filter),
					v = (arry) ? filter : ts.getFilters(table),
					cv = (v || []).join(''); // combined filter values
				// add filter array back into inputs
				if (arry) {
					ts.setFilters( $t, v );
				}
				if (wo.filter_hideFilters){
					// show/hide filter row as needed
					$t.find('.tablesorter-filter-row').trigger( cv === '' ? 'mouseleave' : 'mouseenter' );
				}
				// return if the last search is the same; but filter === false when updating the search
				// see example-widget-filter.html filter toggle buttons
				if (last === cv && filter !== false) { return; }
				$t.trigger('filterStart', [v]);
				if (c.showProcessing) {
					// give it time for the processing icon to kick in
					setTimeout(function(){
						findRows(filter, v, cv);
						return false;
					}, 30);
				} else {
					findRows(filter, v, cv);
					return false;
				}
			},
			findRows = function(filter, v, cv){
				var $tb, $tr, $td, cr, r, l, ff, time, r1, r2, searchFiltered;
				if (c.debug) { time = new Date(); }
				for (k = 0; k < b.length; k++ ){
					if (b.eq(k).hasClass(c.cssInfoBlock)) { continue; } // ignore info blocks, issue #264
					$tb = ts.processTbody(table, b.eq(k), true);
					$tr = $tb.children('tr:not(.' + c.cssChildRow + ')');
					l = $tr.length;
					if (cv === '' || wo.filter_serversideFiltering){
						$tb.children().show().removeClass(wo.filter_filteredRow);
					} else {
						// optimize searching only through already filtered rows - see #313
						searchFiltered = true;
						r = $t.data('lastSearch') || [];
						$.each(v, function(i,val){
							// check for changes from beginning of filter; but ignore if there is a logical "or" in the string
							searchFiltered = (val || '').indexOf(r[i] || '') === 0 && searchFiltered && !/(\s+or\s+|\|)/g.test(val || '');
						});
						// can't search when all rows are hidden - this happens when looking for exact matches
						if (searchFiltered && $tr.filter(':visible').length === 0) { searchFiltered = false; }
						// loop through the rows
						for (j = 0; j < l; j++){
							r = $tr[j].className;
							// skip child rows & already filtered rows
							if ( wo.filter_regex.child.test(r) || (searchFiltered && wo.filter_regex.filtered.test(r)) ) { continue; }
							r = true;
							cr = $tr.eq(j).nextUntil('tr:not(.' + c.cssChildRow + ')');
							// so, if "table.config.widgetOptions.filter_childRows" is true and there is
							// a match anywhere in the child row, then it will make the row visible
							// checked here so the option can be changed dynamically
							t = (cr.length && wo.filter_childRows) ? cr.text() : '';
							t = wo.filter_ignoreCase ? t.toLocaleLowerCase() : t;
							$td = $tr.eq(j).children('td');
							for (i = 0; i < cols; i++){
								// ignore if filter is empty or disabled
								if (v[i]){
									// check if column data should be from the cell or from parsed data
									if (wo.filter_useParsedData || parsed[i]){
										x = c.cache[k].normalized[j][i];
									} else {
									// using older or original tablesorter
										x = $.trim($td.eq(i).text());
									}
									xi = !wo.filter_regex.type.test(typeof x) && wo.filter_ignoreCase ? x.toLocaleLowerCase() : x;
									ff = r; // if r is true, show that row
									// val = case insensitive, v[i] = case sensitive
									val = wo.filter_ignoreCase ? v[i].toLocaleLowerCase() : v[i];
									if (wo.filter_functions && wo.filter_functions[i]){
										if (wo.filter_functions[i] === true){
											// default selector; no "filter-select" class
											ff = ($ths.filter('[data-column="' + i + '"]:last').hasClass('filter-match')) ? xi.search(val) >= 0 : v[i] === x;
										} else if (typeof wo.filter_functions[i] === 'function'){
											// filter callback( exact cell content, parser normalized content, filter input value, column index )
											ff = wo.filter_functions[i](x, c.cache[k].normalized[j][i], v[i], i);
										} else if (typeof wo.filter_functions[i][v[i]] === 'function'){
											// selector option function
											ff = wo.filter_functions[i][v[i]](x, c.cache[k].normalized[j][i], v[i], i);
										}
									// Look for regex
									} else if (wo.filter_regex.regex.test(val)){
										rg = wo.filter_regex.regex.exec(val);
										try {
											ff = new RegExp(rg[1], rg[2]).test(xi);
										} catch (err){
											ff = false;
										}
									// Look for quotes or equals to get an exact match; ignore type since xi could be numeric
									/*jshint eqeqeq:false */
									} else if (val.replace(wo.filter_regex.exact, '') == xi){
										ff = true;
									// Look for a not match
									} else if (/^\!/.test(val)){
										val = val.replace('!','');
										s = xi.search($.trim(val));
										ff = val === '' ? true : !(wo.filter_startsWith ? s === 0 : s >= 0);
									// Look for operators >, >=, < or <=
									} else if (/^[<>]=?/.test(val)){
										s = fmt(val.replace(wo.filter_regex.nondigit, '').replace(wo.filter_regex.operators,''), table);
										// parse filter value in case we're comparing numbers (dates)
										if (parsed[i] || c.parsers[i].type === 'numeric') {
											rg = c.parsers[i].format('' + val.replace(wo.filter_regex.operators,''), table, $ths.eq(i), i);
											s = (rg !== '' && !isNaN(rg)) ? rg : s;
										}
										// xi may be numeric - see issue #149;
										// check if c.cache[k].normalized[j] is defined, because sometimes j goes out of range? (numeric columns)
										rg = ( parsed[i] || c.parsers[i].type === 'numeric' ) && !isNaN(s) && c.cache[k].normalized[j] ? c.cache[k].normalized[j][i] :
											isNaN(xi) ? fmt(xi.replace(wo.filter_regex.nondigit, ''), table) : fmt(xi, table);
										if (/>/.test(val)) { ff = />=/.test(val) ? rg >= s : rg > s; }
										if (/</.test(val)) { ff = /<=/.test(val) ? rg <= s : rg < s; }
										if (s === '') { ff = true; } // keep showing all rows if nothing follows the operator
									// Look for an AND or && operator (logical and)
									} else if (/\s+(AND|&&)\s+/g.test(v[i])) {
										s = val.split(/(?:\s+(?:and|&&)\s+)/g);
										ff = xi.search($.trim(s[0])) >= 0;
										r1 = s.length - 1;
										while (ff && r1) {
											ff = ff && xi.search($.trim(s[r1])) >= 0;
											r1--;
										}
									// Look for a range (using " to " or " - ") - see issue #166; thanks matzhu!
									} else if (/\s+(-|to)\s+/.test(val)){
										s = val.split(/(?: - | to )/); // make sure the dash is for a range and not indicating a negative number
										r1 = fmt(s[0].replace(wo.filter_regex.nondigit, ''), table);
										r2 = fmt(s[1].replace(wo.filter_regex.nondigit, ''), table);
										// parse filter value in case we're comparing numbers (dates)
										if (parsed[i] || c.parsers[i].type === 'numeric') {
											rg = c.parsers[i].format('' + s[0], table, $ths.eq(i), i);
											r1 = (rg !== '' && !isNaN(rg)) ? rg : r1;
											rg = c.parsers[i].format('' + s[1], table, $ths.eq(i), i);
											r2 = (rg !== '' && !isNaN(rg)) ? rg : r2;
										}
										rg = ( parsed[i] || c.parsers[i].type === 'numeric' ) && !isNaN(r1) && !isNaN(r2) ? c.cache[k].normalized[j][i] :
											isNaN(xi) ? fmt(xi.replace(wo.filter_regex.nondigit, ''), table) : fmt(xi, table);
										if (r1 > r2) { ff = r1; r1 = r2; r2 = ff; } // swap
										ff = (rg >= r1 && rg <= r2) || (r1 === '' || r2 === '') ? true : false;
									// Look for wild card: ? = single, * = multiple, or | = logical OR
									} else if ( /[\?|\*]/.test(val) || /\s+OR\s+/.test(v[i]) ){
										s = val.replace(/\s+OR\s+/gi,"|");
										// look for an exact match with the "or" unless the "filter-match" class is found
										if (!$ths.filter('[data-column="' + i + '"]:last').hasClass('filter-match') && /\|/.test(s)) {
											s = '^(' + s + ')$';
										}
										ff = new RegExp( s.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(xi);
									// Look for match, and add child row data for matching
									} else {
										x = (xi + t).indexOf(val);
										ff  = ( (!wo.filter_startsWith && x >= 0) || (wo.filter_startsWith && x === 0) );
									}
									r = (ff) ? (r ? true : false) : false;
								}
							}
							$tr[j].style.display = (r ? '' : 'none');
							$tr.eq(j)[r ? 'removeClass' : 'addClass'](wo.filter_filteredRow);
							if (cr.length) { cr[r ? 'show' : 'hide'](); }
						}
					}
					ts.processTbody(table, $tb, false);
				}
				last = cv; // save last search
				$t.data('lastSearch', v);
				if (c.debug){
					ts.benchmark("Completed filter widget search", time);
				}
				$t.trigger('applyWidgets'); // make sure zebra widget is applied
				$t.trigger('filterEnd');
			},
			buildSelect = function(i, updating, onlyavail){
				var o, t, arry = [], currentVal;
				i = parseInt(i, 10);
				t = $ths.filter('[data-column="' + i + '"]:last');
				// t.data('placeholder') won't work in jQuery older than 1.4.3
				o = '<option value="">' + (t.data('placeholder') || t.attr('data-placeholder') || '') + '</option>';
				for (k = 0; k < b.length; k++ ){
					l = c.cache[k].row.length;
					// loop through the rows
					for (j = 0; j < l; j++){
						// check if has class filtered
						if (onlyavail && c.cache[k].row[j][0].className.match(wo.filter_filteredRow)) { continue; }
						// get non-normalized cell content
						if (wo.filter_useParsedData){
							arry.push( '' + c.cache[k].normalized[j][i] );
						} else {
							t = c.cache[k].row[j][0].cells[i];
							if (t){
								arry.push( $.trim(c.supportsTextContent ? t.textContent : $(t).text()) );
							}
						}
					}
				}

				// get unique elements and sort the list
				// if $.tablesorter.sortText exists (not in the original tablesorter),
				// then natural sort the list otherwise use a basic sort
				arry = $.grep(arry, function(v, k){
					return $.inArray(v, arry) === k;
				});
				arry = (ts.sortText) ? arry.sort(function(a, b){ return ts.sortText(table, a, b, i); }) : arry.sort(true);

				// Get curent filter value
				currentVal = $t.find('thead').find('select.' + css + '[data-column="' + i + '"]').val();

				// build option list
				for (k = 0; k < arry.length; k++){
					t = arry[k].replace(/\"/g, "&quot;");
					// replace quotes - fixes #242 & ignore empty strings - see http://stackoverflow.com/q/14990971/145346
					o += arry[k] !== '' ? '<option value="' + t + '"' + (currentVal === t ? ' selected="selected"' : '') +'>' + arry[k] + '</option>' : '';
				}
				$t.find('thead').find('select.' + css + '[data-column="' + i + '"]')[ updating ? 'html' : 'append' ](o);
			},
			buildDefault = function(updating){
				// build default select dropdown
				for (i = 0; i < cols; i++){
					t = $ths.filter('[data-column="' + i + '"]:last');
					// look for the filter-select class; build/update it if found
					if ((t.hasClass('filter-select') || wo.filter_functions && wo.filter_functions[i] === true) && !t.hasClass('filter-false')){
						if (!wo.filter_functions) { wo.filter_functions = {}; }
						wo.filter_functions[i] = true; // make sure this select gets processed by filter_functions
						buildSelect(i, updating, t.hasClass(wo.filter_onlyAvail));
					}
				}
			},
			searching = function(filter){
				if (typeof filter === 'undefined' || filter === true){
					// delay filtering
					clearTimeout(timer);
					timer = setTimeout(function(){
						checkFilters(filter); 
					}, wo.filter_liveSearch ? wo.filter_searchDelay : 10);
				} else {
					// skip delay
					checkFilters(filter);
				}
			};
			if (c.debug){
				time = new Date();
			}
			wo.filter_regex.child = new RegExp(c.cssChildRow);
			wo.filter_regex.filtered = new RegExp(wo.filter_filteredRow);
			// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
			if (wo.filter_columnFilters !== false && $ths.filter('.filter-false').length !== $ths.length){
				// build filter row
				t = '<tr class="tablesorter-filter-row">';
				for (i = 0; i < cols; i++){
					t += '<td></td>';
				}
				c.$filters = $(t += '</tr>').appendTo( $t.find('thead').eq(0) ).find('td');
				// build each filter input
				for (i = 0; i < cols; i++){
					dis = false;
					$th = $ths.filter('[data-column="' + i + '"]:last'); // assuming last cell of a column is the main column
					sel = (wo.filter_functions && wo.filter_functions[i] && typeof wo.filter_functions[i] !== 'function') || $th.hasClass('filter-select');
					// use header option - headers: { 1: { filter: false } } OR add class="filter-false"
					if (ts.getData){
						// get data from jQuery data, metadata, headers option or header class name
						dis = ts.getData($th[0], c.headers[i], 'filter') === 'false';
					} else {
						// only class names and header options - keep this for compatibility with tablesorter v2.0.5
						dis = (c.headers[i] && c.headers[i].hasOwnProperty('filter') && c.headers[i].filter === false) || $th.hasClass('filter-false');
					}

					if (sel){
						t = $('<select>').appendTo( c.$filters.eq(i) );
					} else {
						if (wo.filter_formatter && $.isFunction(wo.filter_formatter[i])) {
							t = wo.filter_formatter[i]( c.$filters.eq(i), i );
							// no element returned, so lets go find it
							if (t && t.length === 0) { t = c.$filters.eq(i).children('input'); }
							// element not in DOM, so lets attach it
							if (t && (t.parent().length === 0 || (t.parent().length && t.parent()[0] !== c.$filters[i]))) {
								c.$filters.eq(i).append(t);
							}
						} else {
							t = $('<input type="search">').appendTo( c.$filters.eq(i) );
						}
						if (t) {
							t.attr('placeholder', $th.data('placeholder') || $th.attr('data-placeholder') || '');
						}
					}
					if (t) {
						t.addClass(css).attr('data-column', i);
						if (dis) {
							t.addClass('disabled')[0].disabled = true; // disabled!
						}
					}
				}
			}
			$t
			.bind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join('.tsfilter '), function(e, filter){
				if (!/(search|filterReset|filterEnd)/.test(e.type)){
					e.stopPropagation();
					buildDefault(true);
				}
				if (e.type === 'filterReset') {
					$t.find('.' + css).val('');
				}
				if (e.type === 'filterEnd') {
					buildDefault(true);
				} else {
					// send false argument to force a new search; otherwise if the filter hasn't changed, it will return
					filter = e.type === 'search' ? filter : e.type === 'updateComplete' ? $t.data('lastSearch') : '';
					searching(filter);
				}
				return false;
			})
			.find('input.' + css).bind('keyup search', function(e, filter){
				// emulate what webkit does.... escape clears the filter
				if (e.which === 27) {
					this.value = '';
				// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
				} else if ( (typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch && this.value !== '') || ( e.type === 'keyup' &&
					( (e.which < 32 && e.which !== 8 && wo.filter_liveSearch === true && e.which !== 13) || (e.which >= 37 && e.which <=40) || (e.which !== 13 && wo.filter_liveSearch === false) ) ) ) {
					return;
				}
				searching(filter);
			});

			// parse columns after formatter, in case the class is added at that point
			parsed = $ths.map(function(i){
				return (ts.getData) ? ts.getData($ths.filter('[data-column="' + i + '"]:last'), c.headers[i], 'filter') === 'parsed' : $(this).hasClass('filter-parsed');
			}).get();

			// reset button/link
			if (wo.filter_reset && $(wo.filter_reset).length){
				$(wo.filter_reset).bind('click.tsfilter', function(){
					$t.trigger('filterReset');
				});
			}
			if (wo.filter_functions){
				// i = column # (string)
				for (col in wo.filter_functions){
					if (wo.filter_functions.hasOwnProperty(col) && typeof col === 'string'){
						t = $ths.filter('[data-column="' + col + '"]:last');
						ff = '';
						if (wo.filter_functions[col] === true && !t.hasClass('filter-false')){
							buildSelect(col);
						} else if (typeof col === 'string' && !t.hasClass('filter-false')){
							// add custom drop down list
							for (str in wo.filter_functions[col]){
								if (typeof str === 'string'){
									ff += ff === '' ? '<option value="">' + (t.data('placeholder') || t.attr('data-placeholder') ||  '') + '</option>' : '';
									ff += '<option value="' + str + '">' + str + '</option>';
								}
							}
							$t.find('thead').find('select.' + css + '[data-column="' + col + '"]').append(ff);
						}
					}
				}
			}
			// not really updating, but if the column has both the "filter-select" class & filter_functions set to true,
			// it would append the same options twice.
			buildDefault(true);

			$t.find('select.' + css).bind('change search', function(e, filter){
				checkFilters(filter);
			});

			if (wo.filter_hideFilters){
				$t
					.find('.tablesorter-filter-row')
					.addClass('hideme')
					.bind('mouseenter mouseleave', function(e){
						// save event object - http://bugs.jquery.com/ticket/12140
						var all, evt = e;
						ft = $(this);
						clearTimeout(st);
						st = setTimeout(function(){
							if (/enter|over/.test(evt.type)){
								ft.removeClass('hideme');
							} else {
								// don't hide if input has focus
								// $(':focus') needs jQuery 1.6+
								if ($(document.activeElement).closest('tr')[0] !== ft[0]){
									// get all filter values
									all = $t.find('.' + wo.filter_cssFilter).map(function(){
										return $(this).val() || ''; 
									}).get().join('');
									// don't hide row if any filter has a value
									if (all === ''){
										ft.addClass('hideme');
									}
								}
							}
						}, 200);
					})
					.find('input, select').bind('focus blur', function(e){
						ft2 = $(this).closest('tr');
						clearTimeout(st);
						st = setTimeout(function(){
							// don't hide row if any filter has a value
							if ($t.find('.' + wo.filter_cssFilter).map(function(){ return $(this).val() || ''; }).get().join('') === ''){
								ft2[ e.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
							}
						}, 200);
					});
			}

			// show processing icon
			if (c.showProcessing) {
				$t.bind('filterStart.tsfilter filterEnd.tsfilter', function(e, v) {
					var fc = (v) ? $t.find('.' + c.cssHeader).filter('[data-column]').filter(function(){
						return v[$(this).data('column')] !== '';
					}) : '';
					ts.isProcessing($t[0], e.type === 'filterStart', v ? fc : '');
				});
			}

			if (c.debug){
				ts.benchmark("Applying Filter widget", time);
			}
			// filter widget initialized
			$t.trigger('filterInit');
			checkFilters();
		}
	},
	remove: function(table, c, wo){
		var k, $tb,
			$t = c.$table,
			b = c.$tbodies;
		$t
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind('addRows updateCell update updateComplete appendCache search filterStart filterEnd '.split(' ').join('.tsfilter '))
			.find('.tablesorter-filter-row').remove();
		for (k = 0; k < b.length; k++ ){
			$tb = ts.processTbody(table, b.eq(k), true); // remove tbody
			$tb.children().removeClass(wo.filter_filteredRow).show();
			ts.processTbody(table, $tb, false); // restore tbody
		}
		if (wo.filterreset) { $(wo.filter_reset).unbind('click.tsfilter'); }
	}
});
ts.getFilters = function(table) {
	var c = table ? $(table)[0].config : {};
	if (c && c.widgetOptions && !c.widgetOptions.filter_columnFilters) { return $(table).data('lastSearch'); }
	return c && c.$filters ? c.$filters.find('.' + c.widgetOptions.filter_cssFilter).map(function(i, el) {
		return $(el).val();
	}).get() || [] : false;
};
ts.setFilters = function(table, filter, apply) {
	var $t = $(table),
		c = $t.length ? $t[0].config : {},
		valid = c && c.$filters ? c.$filters.find('.' + c.widgetOptions.filter_cssFilter).each(function(i, el) {
			$(el).val(filter[i] || '');
		}) || false : false;
	if (apply) { $t.trigger('search', [filter, false]); }
	return !!valid;
};

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/ 
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60,
	options: {
		stickyHeaders : 'tablesorter-stickyHeader',
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true // trigger "resize" event on headers
	},
	format: function(table, c, wo){
		if (c.$table.hasClass('hasStickyHeaders')) { return; }
		var $t = c.$table,
			$win = $(window),
			header = $t.children('thead:first'),
			hdrCells = header.children('tr:not(.sticky-false)').children(),
			innr = '.tablesorter-header-inner',
			tfoot = $t.find('tfoot'),
			filterInputs = '.' + (wo.filter_cssFilter || 'tablesorter-filter'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			$stickyTable = wo.$sticky = $t.clone()
				.addClass('containsStickyHeaders')
				.css({
					position   : 'fixed',
					margin     : 0,
					top        : stickyOffset,
					visibility : 'hidden',
					zIndex     : 2
				}),
			stkyHdr = $stickyTable.children('thead:first').addClass(wo.stickyHeaders),
			stkyCells,
			laststate = '',
			spacing = 0,
			flag = false,
			resizeHdr = function(){
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				var bwsr = navigator.userAgent;
				spacing = 0;
				// yes, I dislike browser sniffing, but it really is needed here :(
				// webkit automatically compensates for border spacing
				if ($t.css('border-collapse') !== 'collapse' && !/(webkit|msie)/i.test(bwsr)) {
					// Firefox & Opera use the border-spacing
					// update border-spacing here because of demos that switch themes
					spacing = parseInt(hdrCells.eq(0).css('border-left-width'), 10) * 2;
				}
				$stickyTable.css({
					left : header.offset().left - $win.scrollLeft() - spacing,
					width: $t.width()
				});
				stkyCells.filter(':visible').each(function(i){
					var $h = hdrCells.filter(':visible').eq(i);
					$(this)
						.css({
							width: $h.width() - spacing,
							height: $h.height()
						})
						.find(innr).width( $h.find(innr).width() );
				});
			};
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249)
		$stickyTable.find('thead:gt(0), tr.sticky-false, tbody, tfoot').remove();
		// issue #172 - find td/th in sticky header
		stkyCells = stkyHdr.children().children();
		$stickyTable.css({ height:0, width:0, padding:0, margin:0, border:0 });
		// remove resizable block
		stkyCells.find('.tablesorter-resizer').remove();
		// update sticky header class names to match real header after sorting
		$t
		.addClass('hasStickyHeaders')
		.bind('sortEnd.tsSticky', function(){
			hdrCells.filter(':visible').each(function(i){
				var t = stkyCells.filter(':visible').eq(i);
				t
					.attr('class', $(this).attr('class'))
					// remove processing icon
					.removeClass(c.cssProcessing);
				if (c.cssIcon){
					t
					.find('.' + c.cssIcon)
					.attr('class', $(this).find('.' + c.cssIcon).attr('class'));
				}
			});
		})
		.bind('pagerComplete.tsSticky', function(){
			resizeHdr();
		});
		// http://stackoverflow.com/questions/5312849/jquery-find-self;
		hdrCells.find(c.selectorSort).add( c.$headers.filter(c.selectorSort) ).each(function(i){
			var t = $(this),
			// clicking on sticky will trigger sort
			$cell = stkyHdr.children('tr.tablesorter-headerRow').children().eq(i).bind('mouseup', function(e){
				t.trigger(e, true); // external mouseup flag (click timer is ignored)
			});
			// prevent sticky header text selection
			if (c.cancelSelection) {
				$cell
					.attr('unselectable', 'on')
					.bind('selectstart', false)
					.css({
						'user-select': 'none',
						'MozUserSelect': 'none'
					});
			}
		});
		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$t.after( $stickyTable );
		// make it sticky!
		$win.bind('scroll.tsSticky resize.tsSticky', function(e){
			if (!$t.is(':visible')) { return; } // fixes #278
			var pre = 'tablesorter-sticky-',
				offset = $t.offset(),
				sTop = $win.scrollTop() + stickyOffset,
				tableHt = $t.height() - ($stickyTable.height() + (tfoot.height() || 0)),
				vis = (sTop > offset.top) && (sTop < offset.top + tableHt) ? 'visible' : 'hidden';
			$stickyTable
			.removeClass(pre + 'visible ' + pre + 'hidden')
			.addClass(pre + vis)
			.css({
				// adjust when scrolling horizontally - fixes issue #143
				left : header.offset().left - $win.scrollLeft() - spacing,
				visibility : vis
			});
			if (vis !== laststate || e.type === 'resize'){
				// make sure the column widths match
				resizeHdr();
				laststate = vis;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		$t.bind('filterEnd', function(){
			if (flag) { return; }
			stkyHdr.find('.tablesorter-filter-row').children().each(function(i){
				$(this).find(filterInputs).val( c.$filters.find(filterInputs).eq(i).val() );
			});
		});
		stkyCells.find(filterInputs).bind('keyup search change', function(e){
			// ignore arrow and meta keys; allow backspace
			if ((e.which < 32 && e.which !== 8) || (e.which >= 37 && e.which <=40)) { return; }
			flag = true;
			var $f = $(this), col = $f.attr('data-column');
			c.$filters.find(filterInputs).eq(col)
				.val( $f.val() )
				.trigger('search');
			setTimeout(function(){
				flag = false;
			}, wo.filter_searchDelay);
		});
		$t.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo){
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind('sortEnd.tsSticky pagerComplete.tsSticky')
			.find('.' + wo.stickyHeaders).remove();
		if (wo.$sticky) { wo.$sticky.remove(); } // remove cloned table
		$(window).unbind('scroll.tsSticky resize.tsSticky');
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
		resizable_addLastColumn : false
	},
	format: function(table, c, wo){
		if (c.$table.hasClass('hasResizable')) { return; }
		c.$table.addClass('hasResizable');
		var $t, t, i, j, s = {}, $c, $cols, w, tw,
			$tbl = c.$table,
			position = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($tbl.parent().width() - $tbl.width()) < 20,
			stopResize = function(){
				if (ts.storage && $target){
					s[$target.index()] = $target.width();
					s[$next.index()] = $next.width();
					$target.width( s[$target.index()] );
					$next.width( s[$next.index()] );
					if (wo.resizable !== false){
						ts.storage(table, 'tablesorter-resizable', s);
					}
				}
				position = 0;
				$target = $next = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		s = (ts.storage && wo.resizable !== false) ? ts.storage(table, 'tablesorter-resizable') : {};
		// process only if table ID or url match
		if (s){
			for (j in s){
				if (!isNaN(j) && j < c.$headers.length){
					c.$headers.eq(j).width(s[j]); // set saved resizable widths
				}
			}
		}
		$t = $tbl.children('thead:first').children('tr');
		// add resizable-false class name to headers (across rows as needed)
		$t.children().each(function(){
			t = $(this);
			i = t.attr('data-column');
			j = ts.getData( t, c.headers[i], 'resizable') === "false";
			$t.children().filter('[data-column="' + i + '"]').toggleClass('resizable-false', j);
		});
		// add wrapper inside each cell to allow for positioning of the resizable target block
		$t.each(function(){
			$c = $(this).children(':not(.resizable-false)');
			if (!$(this).find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the resizer correctly
				$c.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			// don't include the last column of the row
			if (!wo.resizable_addLastColumn) { $c = $c.slice(0,-1); }
			$cols = $cols ? $cols.add($c) : $c;
		});
		$cols
		.each(function(){
			$t = $(this);
			j = parseInt($t.css('padding-right'), 10) + 10; // 8 is 1/2 of the 16px wide resizer grip
			t = '<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-' + j +
				'px;top:0;height:100%;width:20px;"></div>';
			$t
				.find('.tablesorter-wrapper')
				.append(t);
		})
		.bind('mousemove.tsresize', function(e){
			// ignore mousemove if no mousedown
			if (position === 0 || !$target) { return; }
			// resize columns
			w = e.pageX - position;
			tw = $target.width();
			$target.width( tw + w );
			if ($target.width() !== tw && fullWidth){
				$next.width( $next.width() - w );
			}
			position = e.pageX;
		})
		.bind('mouseup.tsresize', function(){
			stopResize();
		})
		.find('.tablesorter-resizer,.tablesorter-resizer-grip')
		.bind('mousedown', function(e){
			// save header cell and mouse position; closest() not supported by jQuery v1.2.6
			$target = $(e.target).closest('th');
			t = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if (t.length > 1) { $target = $target.add(t); }
			// if table is not as wide as it's parent, then resize the table
			$next = e.shiftKey ? $target.parent().find('th:not(.resizable-false)').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			position = e.pageX;
		});
		$tbl.find('thead:first')
		.bind('mouseup.tsresize mouseleave.tsresize', function(){
			stopResize();
		})
		// right click to reset columns to default widths
		.bind('contextmenu.tsresize', function(){
				ts.resizableReset(table);
				// $.isEmptyObject() needs jQuery 1.4+
				var rtn = $.isEmptyObject ? $.isEmptyObject(s) : s === {}; // allow right click if already reset
				s = {};
				return rtn;
		});
	},
	remove: function(table, c, wo){
		c.$table
			.removeClass('hasResizable')
			.find('thead')
			.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
			.find('tr').children()
			.unbind('mousemove.tsresize mouseup.tsresize')
			// don't remove "tablesorter-wrapper" as uitheme uses it too
			.find('.tablesorter-resizer,.tablesorter-resizer-grip').remove();
		ts.resizableReset(table);
	}
});
ts.resizableReset = function(table){
	table.config.$headers.filter(':not(.resizable-false)').css('width','');
	if (ts.storage) { ts.storage(table, 'tablesorter-resizable', {}); }
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
	init: function(table, thisWidget, c, wo){
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, c, wo, true);
	},
	format: function(table, c, wo, init){
		var sl, time,
			$t = c.$table,
			ss = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug){
			time = new Date();
		}
		if ($t.hasClass('hasSaveSort')){
			if (ss && table.hasInitialized && ts.storage){
				ts.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug){
					ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$t.addClass('hasSaveSort');
			sortList = '';
			// get data
			if (ts.storage){
				sl = ts.storage( table, 'tablesorter-savesort' );
				sortList = (sl && sl.hasOwnProperty('sortList') && $.isArray(sl.sortList)) ? sl.sortList : '';
				if (c.debug){
					ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
				$t.bind('saveSortReset', function(e){
					e.stopPropagation();
					ts.storage( table, 'tablesorter-savesort', '' );
				});
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0){
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0){
				// update sort change
				$t.trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table){
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);
