/*! tableSorter 2.3 widgets - updated 6/21/2012
 *
 * jQuery UI Theme
 * Column Styles
 * Column Filters
 * Sticky Header
 * Column Resizing
 * Save Sort
 *
 */
;(function($){

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
$.tablesorter.storage = function(table, key, val){
	var d, k, ls = false, v = {},
	id = table.id || $('.tablesorter').index( $(table) ),
	url = window.location.pathname;
	try { ls = !!(localStorage.getItem); } catch(e) {}
	// *** get val ***
	if ($.parseJSON) {
		if (ls) {
			v = $.parseJSON(localStorage[key]) || {};
		} else {
			k = document.cookie.split(/[;\s|=]/); // cookie
			d = $.inArray(key, k) + 1; // add one to get from the key to the value
			v = (d !== 0) ? $.parseJSON(k[d]) || {} : {};
		}
	}
	if (val && JSON && JSON.hasOwnProperty('stringify')) {
		// add unique identifiers = url pathname > table ID/index on page > data
		if (v[url] && v[url][id]) {
			v[url][id] = val;
		} else {
			if (v[url]) {
				v[url][id] = val;
			} else {
				v[url] = {};
				v[url][id] = val;
			}
		}
		// *** set val ***
		if (ls) {
			localStorage[key] = JSON.stringify(v);
		} else {
			d = new Date();
			d.setTime(d.getTime()+(31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(v)).replace(/\"/g,'\"') + '; expires=' + d.toGMTString() + '; path=/';
		}
	} else {
		return ( v && v.hasOwnProperty(url) && v[url].hasOwnProperty(id) ) ? v[url][id] : {};
	}
};

// Widget: jQuery UI theme
// "uitheme" option in "widgetOptions"
// **************************
$.tablesorter.addWidget({
	id: "uitheme",
	format: function(table) {
		var time, klass, rmv, $t, t, $table = $(table),
		c = table.config, wo = c.widgetOptions,
		// ["up/down arrow (cssHeaders, unsorted)", "down arrow (cssDesc, descending)", "up arrow (cssAsc, ascending)" ]
		icons = ["ui-icon-arrowthick-2-n-s", "ui-icon-arrowthick-1-s", "ui-icon-arrowthick-1-n"];
		// keep backwards compatibility, for now
		icons = (c.widgetUitheme && c.widgetUitheme.hasOwnProperty('css')) ? c.widgetUitheme.css || icons :
			(wo && wo.hasOwnProperty('uitheme')) ? wo.uitheme : icons;
		rmv = icons.join(' ');
		if (c.debug) {
			time = new Date();
		}
		if (!$table.hasClass('ui-theme')) {
			$table.addClass('ui-widget ui-widget-content ui-corner-all ui-theme');
			$.each(c.headerList, function(){
				$(this)
				// using "ui-theme" class in case the user adds their own ui-icon using onRenderHeader
				.addClass('ui-widget-header ui-corner-all ui-state-default')
				.append('<span class="ui-icon"/>')
				.wrapInner('<div class="tablesorter-inner"/>')
				.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				});
			});
		}
		$.each(c.headerList, function(i){
			$t = $(this);
			if (this.sortDisabled) {
				// no sort arrows for disabled columns!
				$t.find('span.ui-icon').removeClass(rmv + ' ui-icon');
			} else {
				klass = ($t.hasClass(c.cssAsc)) ? icons[1] : ($t.hasClass(c.cssDesc)) ? icons[2] : $t.hasClass(c.cssHeader) ? icons[0] : '';
				t = ($table.hasClass('hasStickyHeaders')) ? $table.find('tr.' + (wo.stickyHeaders || 'tablesorter-stickyHeader')).find('th').eq(i).add($t) : $t;
				t[klass === icons[0] ? 'removeClass' : 'addClass']('ui-state-active')
					.find('span.ui-icon').removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug) {
			$.tablesorter.benchmark("Applying uitheme widget", time);
		}
	}
});

// Widget: Column styles
// "columns" option in "widgetOptions"
// **************************
$.tablesorter.addWidget({
	id: "columns",
	format: function(table) {
		var $tb, $tr, $td, $t, time, last, rmv, i, k, l,
		c = table.config,
		b = $(table).children('tbody:not(.' + c.cssInfoBlock + ')'),
		list = c.sortList,
		len = list.length,
		css = [ "primary", "secondary", "tertiary" ]; // default options
		// keep backwards compatibility, for now
		css = (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) ? c.widgetColumns.css || css :
			(c.widgetOptions && c.widgetOptions.hasOwnProperty('columns')) ? c.widgetOptions.columns || css : css;
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug) {
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		for (k = 0; k < b.length; k++ ) {
			$tb = $(b[k]);
			$tr = $tb.addClass('tablesorter-hidden').children('tr');
			l = $tr.length;
			// loop through the visible rows
			$tr.each(function(){
				$t = $(this);
				if (this.style.display !== 'none') {
					// remove all columns class names
					$td = $t.children().removeClass(rmv);
					// add appropriate column class names
					if (list && list[0]) {
						// primary sort column class
						$td.eq(list[0][0]).addClass(css[0]);
						if (len > 1) {
							for (i = 1; i < len; i++){
								// secondary, tertiary, etc sort column classes
								$td.eq(list[i][0]).addClass( css[i] || css[last] );
							}
						}
					}
				}
			});
			$tb.removeClass('tablesorter-hidden');
		}
		if (c.debug) {
			$.tablesorter.benchmark("Applying Columns widget", time);
		}
	}
});

// Widget: Filter
// "filter_startsWith", "filter_childRows", "filter_ignoreCase",
// "filter_searchDelay" & "filter_functions" options in "widgetOptions"
// **************************
$.tablesorter.addWidget({
	id: "filter",
	format: function(table) {
		if (table.config.parsers && !$(table).hasClass('hasFilters')) {
			var i, j, k, l, cv, v, val, r, ff, t, x, xi, cr,
			sel, $tb, $th, $tr, $td, reg2,
			c = table.config,
			$ths = $(c.headerList),
			wo = c.widgetOptions,
			css = wo.filter_cssFilter || 'tablesorter-filter',
			$t = $(table).addClass('hasFilters'),
			b = $t.children('tbody:not(.' + c.cssInfoBlock + ')'),
			cols = c.parsers.length,
			fr = '<tr class="' + css + '">',
			regexp = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,
			reg1 = new RegExp(c.cssChildRow),
			time, timer,
			findRows = function(){
				if (c.debug) { time = new Date(); }
				v = $t.find('thead').eq(0).children('tr').find('select.' + css + ', input.' + css).map(function(){
					return $(this).val() || '';
				}).get();
				cv = v.join('');
				for (k = 0; k < b.length; k++ ) {
					$tb = $(b[k]);
					$tr = $tb.addClass('tablesorter-hidden').children('tr');
					l = $tr.length;
					// loop through the rows
					for (j = 0; j < l; j++) {
						if (cv === '') {
							$tr[j].style.display = '';
						} else {
							// skip child rows
							if (reg1.test($tr[j].className)) { continue; }
							r = true;
							cr = $tr.eq(j).nextUntil('tr:not(.' + c.cssChildRow + ')');
							// so, if "table.config.widgetOptions.filter_childRows" is true and there is
							// a match anywhere in the child row, then it will make the row visible
							// checked here so the option can be changed dynamically
							t = (cr.length && (wo && wo.hasOwnProperty('filter_childRows') &&
								typeof wo.filter_childRows !== 'undefined' ? wo.filter_childRows : true)) ? cr.text() : '';
							t = wo.filter_ignoreCase ? t.toLocaleLowerCase() : t;
							$td = $tr.eq(j).children('td');
							for (i = 0; i < cols; i++) {
								x = $.trim($td.eq(i).text());
								xi = wo.filter_ignoreCase ? x.toLocaleLowerCase() : x;
								// ignore if filter is empty
								if (v[i] !== '') {
									ff = r; // if r is true, show that row
									// val = case insensitive, v[i] = case sensitive
									val = wo.filter_ignoreCase ? v[i].toLocaleLowerCase() : v[i];
									if (wo.filter_functions && wo.filter_functions[i]) {
										if (wo.filter_functions[i] === true) {
											// default selector; no "filter-select" class
											ff = wo.filter_ignoreCase ? val === xi : v[i] === x;
										} else if (typeof wo.filter_functions[i] === 'function') {
											// filter callback( exact cell content, parser normalized content, filter input value, column index )
											ff = wo.filter_functions[i](x, c.cache[k].normalized[j][i], v[i], i);
										} else if (typeof wo.filter_functions[i][v[i]] === 'function'){
											// selector option function
											ff = wo.filter_functions[i][v[i]](x, c.cache[k].normalized[j][i], v[i], i);
										}
									// Look for regex
									} else if (regexp.test(val)) {
										reg2 = regexp.exec(val);
										try {
											ff = new RegExp(reg2[1], reg2[2]).test(xi);
										} catch (err) {
											ff = false;
										}
									// Look for quotes to get an exact match
									} else if (/[\"|\']$/.test(val) && xi === val.replace(/(\"|\')/g,'')) {
										ff = true;
									// Look for wild card: ? = single, or * = multiple
									} else if (/[\?|\*]/.test(val)) {
										ff = new RegExp( val.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(xi);
									// Look for match, and add child row data for matching
									} else {
										x = (xi + t).indexOf(val);
										ff  = ( (!wo.filter_startsWith && x >= 0) || (wo.filter_startsWith && x === 0) );
									}
									r = (ff) ? (r ? true : false) : false;
								}
							}
							$tr[j].style.display = (r ? '' : 'none');
							if (cr.length) { cr[r ? 'show' : 'hide'](); }
						}
					}
					$tb.removeClass('tablesorter-hidden');
				}
				if (c.debug) {
					$.tablesorter.benchmark("Completed filter widget search", time);
				}
				$t.trigger('applyWidgets'); // make sure zebra widget is applied
			},
			buildSelect = function(i, updating){
				var o, arry = [];
				i = parseInt(i, 10);
				o = '<option value="">' + ($ths.filter('[data-column="' + i + '"]:last').attr('data-placeholder') || '') + '</option>';
				for (k = 0; k < b.length; k++ ) {
					l = c.cache[k].row.length;
					// loop through the rows
					for (j = 0; j < l; j++) {
						// get non-normalized cell content
						t = c.cache[k].row[j][0].cells[i];
						if (t) {
							arry.push( c.supportsTextContent ? t.textContent : $(t).text() );
						}
					}
				}
				// get unique elements and sort the list
				arry = arry.getUnique(true);
				// build option list
				for (k = 0; k < arry.length; k++) {
					o += '<option value="' + arry[k] + '">' + arry[k] + '</option>';
				}
				$t.find('thead').find('select.' + css + '[data-column="' + i + '"]')[ updating ? 'html' : 'append' ](o);
			},
			buildDefault = function(updating){
				// build default select dropdown
				for (i = 0; i < cols; i++) {
					t = $ths.filter('[data-column="' + i + '"]:last');
					// look for the filter-select class, but don't build it twice.
					if (t.hasClass('filter-select') && !t.hasClass('filter-false') && !(wo.filter_functions && wo.filter_functions[i] === true)){
						buildSelect(i, updating);
					}
				}
			};
			if (c.debug) {
				time = new Date();
			}
			wo.filter_ignoreCase = wo.filter_ignoreCase !== false; // set default filter_ignoreCase to true
			for (i=0; i < cols; i++){
				$th = $ths.filter('[data-column="' + i + '"]:last'); // assuming last cell of a column is the main column
				sel = (wo.filter_functions && wo.filter_functions[i] && typeof wo.filter_functions[i] !== 'function') || $th.hasClass('filter-select');
				fr += '<td>';
				if (sel){
					fr += '<select data-column="' + i + '" class="' + css;
				} else {
					fr += '<input type="search" placeholder="' + ($th.attr('data-placeholder') || "") + '" data-column="' + i + '" class="' + css;
				}
				// use header option - headers: { 1: { filter: false } } OR add class="filter-false"
				if ($.tablesorter.getData) {
					// get data from jQuery data, metadata, headers option or header class name
					fr += $.tablesorter.getData($th[0], c.headers[i], 'filter') === 'false' ? ' disabled" disabled' : '"';
				} else {
					// only class names and header options - keep this for compatibility with tablesorter v2.0.5
					fr += ((c.headers[i] && c.headers[i].hasOwnProperty('filter') && c.headers[i].filter === false) || $th.hasClass('filter-false') ) ? ' disabled" disabled' : '"';
				}
				fr += (sel ? '></select>' : '>') + '</td>';
			}
			$t
			.bind('addRows updateCell update appendCache', function(){
				buildDefault(true);
				findRows();
			})
			.find('thead').eq(0).append(fr += '</tr>')
			.find('input.' + css).bind('keyup search', function(e, delay){
				// ignore arrow and meta keys; allow backspace
				if ((e.which < 32 && e.which !== 8) || (e.which >= 37 && e.which <=40)) { return; }
				// skip delay
				if (delay === false) {
					findRows();
					return;
				}
				// delay filtering
				clearTimeout(timer);
				timer = setTimeout(function(){
					findRows();
				}, wo.filter_searchDelay || 300);
			});
			if (wo.filter_functions) {
				// i = column # (string)
				for (i in wo.filter_functions) {
					t = $ths.filter('[data-column="' + i + '"]:last');
					fr = '';
					if (typeof i === 'string' && wo.filter_functions[i] === true && !t.hasClass('filter-false')) {
						buildSelect(i);
					} else if (typeof i === 'string' && !t.hasClass('filter-false')) {
						// add custom drop down list
						for (j in wo.filter_functions[i]) {
							if (typeof j === 'string') {
								fr += fr === '' ? '<option>' + (t.attr('data-placeholder') || '') + '</option>' : '';
								fr += '<option>' + j + '</option>';
							}
						}
						$t.find('thead').find('select.' + css + '[data-column="' + i + '"]').append(fr);
					}
				}
			}
			buildDefault();

			$t.find('select.' + css).bind('change', function(){
				findRows();
			});

			if (c.debug) {
				$.tablesorter.benchmark("Applying Filter widget", time);
			}
		}
	}
});

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// **************************
$.tablesorter.addWidget({
	id: "stickyHeaders",
	format: function(table) {
		if ($(table).hasClass('hasStickyHeaders')) { return; }
		var $table = $(table).addClass('hasStickyHeaders'),
			wo = table.config.widgetOptions,
			win = $(window),
			header = $(table).children('thead'),
			hdrCells = header.children('tr:not(.sticky-false)').children(),
			css = wo.stickyHeaders || 'tablesorter-stickyHeader',
			innr = '.tablesorter-header-inner',
			firstCell = hdrCells.eq(0),
			tfoot = $table.find('tfoot'),
			sticky = header.find('tr.tablesorter-header:not(.sticky-false)').clone()
				.removeClass('tablesorter-header')
				.addClass(css)
				.css({
					width      : header.outerWidth(true),
					position   : 'fixed',
					left       : firstCell.offset().left,
					margin     : 0,
					top        : 0,
					visibility : 'hidden',
					zIndex     : 10
				}),
			stkyCells = sticky.children(),
			laststate = '';
		// update sticky header class names to match real header after sorting
		$table.bind('sortEnd', function(e,t){
			var th = $(t).find('thead tr'),
				sh = th.filter('.' + css).children();
			th.filter(':not(.' + css + ')').children().each(function(i){
				sh.eq(i).attr('class', $(this).attr('class'));
			});
		}).bind('pagerComplete', function(){
			win.resize(); // trigger window resize to make sure column widths & position are correct
		});
		// set sticky header cell width and link clicks to real header
		hdrCells.each(function(i){
			var t = $(this);
			stkyCells.eq(i)
			// clicking on sticky will trigger sort
			.bind('mouseup', function(e){
				t.trigger(e, true); // external mouseup flag (click timer is ignored)
			})
			// prevent sticky header text selection
			.bind('mousedown', function(){
				this.onselectstart = function(){ return false; };
				return false;
			})
			// set cell widths
			.find(innr).width( t.find(innr).width() );
		});
		header.prepend( sticky );
		// make it sticky!
		win
			.scroll(function(){
				var offset = firstCell.offset(),
					sTop = win.scrollTop(),
					tableHt = $table.height() - (firstCell.height() + (tfoot.height() || 0)),
					vis = (sTop > offset.top) && (sTop < offset.top + tableHt) ? 'visible' : 'hidden';
				sticky.css({
					left : offset.left - win.scrollLeft(),
					visibility : vis
				});
				if (vis !== laststate) {
					// trigger resize to make sure the column widths match
					win.resize();
					laststate = vis;
				}
			})
			.resize(function(){
				var ht = 0;
				sticky.css({
					left : firstCell.offset().left - win.scrollLeft(),
					width: header.outerWidth()
				}).each(function(i){
					$(this).css('top', ht);
					ht += header.find('tr').eq(i).outerHeight();
				});
				stkyCells.find(innr).each(function(i){
					$(this).width( hdrCells.eq(i).find(innr).width() );
				});
			});
	}
});

// Add Column resizing widget
// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
$.tablesorter.addWidget({
	id: "resizable",
	format: function(table) {
		if ($(table).hasClass('hasResizable')) { return; }
		$(table).addClass('hasResizable');
		var j, s, c = table.config,
			$cols = $(c.headerList).filter(':gt(0)'),
			position = 0,
			$target = null,
			$prev = null,
			stopResize = function(){
				position = 0;
				$target = $prev = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		s = ($.tablesorter.storage) ? $.tablesorter.storage(table, 'tablesorter-resizable') : '';
		// process only if table ID or url match
		if (s) {
			for (j in s) {
				if (!isNaN(j) && j < c.headerList.length) {
					$(c.headerList[j]).width(s[j]); // set saved resizable widths
				}
			}
		}
		$cols
			.each(function(){
				$(this)
					.append('<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;height:100%;width:20px;left:-20px;top:0;z-index:1;"></div>')
					.wrapInner('<div style="position:relative;height:100%;width:100%"></div>');
			})
			.bind('mousemove', function(e){
				// ignore mousemove if no mousedown
				if (position === 0 || !$target) { return; }
				var w = e.pageX - position;
				// make sure
				if ( $target.width() < -w || ( $prev && $prev.width() <= w )) { return; }
				// resize current column
				$prev.width( $prev.width() + w );
				position = e.pageX;
			})
			.bind('mouseup', function(){
				if (s && $.tablesorter.storage && $target) {
					s[$prev.index()] = $prev.width();
					$.tablesorter.storage(table, 'tablesorter-resizable', s);
				}
				stopResize();
				return false;
			})
			.find('.tablesorter-resizer')
			.bind('mousedown', function(e){
				// save header cell and mouse position
				$target = $(e.target).closest('th');
				$prev = $target.prev();
				position = e.pageX;
				return false;
			});
		$(table).find('thead').bind('mouseup mouseleave', function(){
			stopResize();
		});
	}
});

// Save table sort widget
// this widget saves the last sort only if the
// $.tablesorter.storage function is included
// **************************
$.tablesorter.addWidget({
	id: 'saveSort',
	init: function(table, allWidgets, thisWidget){
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, true);
	},
	format: function(table, init) {
		var sl, time, c = table.config, sortList = { "sortList" : c.sortList };
		if (c.debug) {
			time = new Date();
		}
		if ($(table).hasClass('hasSaveSort')) {
			if (table.hasInitialized && $.tablesorter.storage) {
				$.tablesorter.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug) {
					$.tablesorter.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$(table).addClass('hasSaveSort');
			sortList = '';
			// get data
			if ($.tablesorter.storage) {
				sl = $.tablesorter.storage( table, 'tablesorter-savesort' );
				sortList = (sl && sl.hasOwnProperty('sortList') && $.isArray(sl.sortList)) ? sl.sortList : '';
				if (c.debug) {
					$.tablesorter.benchmark('saveSort: Last sort loaded: ' + sortList, time);
				}
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0) {
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0) {
				// update sort change
				$(table).trigger('sorton', [sortList]);
			}
		}
	}
});

})(jQuery);

// return an array with unique values https://gist.github.com/461516
Array.prototype.getUnique = function(s){
	var c, a = [], o = {}, i, j = 0, l = this.length;
	for(i=0; i < l; ++i) {
		c = this[i];
		if (!o[c]) {
			o[c] = {};
			a[j++] = c;
		}
	}
	return (s) ? a.sort() : a;
};
