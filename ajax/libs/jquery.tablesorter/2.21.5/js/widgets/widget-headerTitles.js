/*! Widget: headerTitles - updated 3/5/2014 (v2.15.6) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter;

	ts.addWidget({
		id: 'headerTitles',
		options: {
			// use aria-label text
			// e.g. "First Name: Ascending sort applied, activate to apply a descending sort"
			headerTitle_useAria  : false,
			// add tooltip class
			headerTitle_tooltip  : '',
			// custom titles [ ascending, descending, unsorted ]
			headerTitle_cur_text     : [ ' sort: A - Z', ' sort: Z - A', 'ly unsorted' ],
			headerTitle_cur_numeric  : [ ' sort: 0 - 9', ' sort: 9 - 0', 'ly unsorted' ],
			headerTitle_nxt_text     : [ ' sort: A - Z', ' sort: Z - A', 'remove sort' ],
			headerTitle_nxt_numeric  : [ ' sort: 0 - 9', ' sort: 9 - 0', 'remove sort' ],

			// title display; {prefix} adds above prefix
			// {type} adds the current sort order from above (text or numeric)
			// {next} adds the next sort direction using the sort order above
			headerTitle_output_sorted   : 'current{current}; activate to {next}',
			headerTitle_output_unsorted : 'current{current}; activate to {next} ',
			headerTitle_output_nosort   : 'No sort available',
			// use this type to override the parser detection result
			// e.g. use for numerically parsed columns (e.g. dates), but you
			// want the user to see a text sort, e.g. [ 'text', 'numeric' ]
			headerTitle_type     : [],
			// manipulate the title as desired
			headerTitle_callback : null // function($cell, txt) { return txt; }
		},
		init: function(table, thisWidget, c, wo){
			// force refresh
			c.$table.on('refreshHeaderTitle', function(){
				thisWidget.format(table, c, wo);
			});
			// add tooltip class
			if ($.isArray(wo.headerTitle_tooltip)) {
				c.$headers.each(function(){
					$(this).addClass( wo.headerTitle_tooltip[this.column] || '' );
				});
			} else if (wo.headerTitle_tooltip !== '') {
				c.$headers.addClass( wo.headerTitle_tooltip );
			}
		},
		format: function (table, c, wo) {
			var txt;
			c.$headers.each(function(){
				var t = this,
					$this = $(this),
					sortType = wo.headerTitle_type[t.column] || c.parsers[ t.column ].type || 'text',
					sortDirection = $this.hasClass(ts.css.sortAsc) ? 0 : $this.hasClass(ts.css.sortDesc) ? 1 : 2,
					sortNext = t.order[(t.count + 1) % (c.sortReset ? 3 : 2)];
				if (wo.headerTitle_useAria) {
					txt = $this.hasClass('sorter-false') ? wo.headerTitle_output_nosort : $this.attr('aria-label') || '';
				} else {
					txt = (wo.headerTitle_prefix || '') + // now deprecated
						($this.hasClass('sorter-false') ? wo.headerTitle_output_nosort :
						ts.isValueInArray( t.column, c.sortList ) >= 0 ? wo.headerTitle_output_sorted : wo.headerTitle_output_unsorted);
					txt = txt.replace(/\{(current|next|name)\}/gi, function(m){
						return {
							'{name}'    : $this.text(),
							'{current}' : wo[ 'headerTitle_cur_' + sortType ][ sortDirection ] || '',
							'{next}'    : wo[ 'headerTitle_nxt_' + sortType ][ sortNext ] || ''
						}[m.toLowerCase()];
					});
				}
				$this.attr('title', $.isFunction(wo.headerTitle_callback) ? wo.headerTitle_callback($this, txt) : txt);
			});
		},
		remove: function (table, c, wo) {
			c.$headers.attr('title', '');
			c.$table.off('refreshHeaderTitle');
			// remove tooltip class
			if ($.isArray(wo.headerTitle_tooltip)) {
				c.$headers.each(function(){
					$(this).removeClass( wo.headerTitle_tooltip[this.column] || '' );
				});
			} else if (wo.headerTitle_tooltip !== '') {
				c.$headers.removeClass( wo.headerTitle_tooltip );
			}
		}
	});

})(jQuery);
