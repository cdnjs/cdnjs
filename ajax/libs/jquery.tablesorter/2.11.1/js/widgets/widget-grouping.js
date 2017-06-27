/*! tablesorter Grouping widget - updated 10/1/2013
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter;

ts.grouping = {
	number : function(c, $col, txt, num, group){
		var t, w;
		if (num > 1 && txt !== '') {
			if ($col.hasClass(ts.css.sortAsc)) {
				t = Math.floor(parseFloat(txt)/num) * num;
				return t > parseFloat(group || 0) ? t : parseFloat(group || 0);
			} else {
				t = Math.ceil(parseFloat(txt)/num) * num;
				return t < parseFloat(group || num) - t ? parseFloat(group || num) - t : t;
			}
		} else {
			w = (txt + '').match(/\d+/g);
			return w && w.length >= num ? w[num - 1] : txt || '';
		}
	},
	word : function(c, $col, txt, num){
		var w = (txt + ' ').match(/\w+/g);
		return w && w.length >= num ? w[num - 1] : txt || '';
	},
	letter : function(c, $col, txt, num){
		return txt ? (txt + ' ').substring(0, num) : '';
	},
	date : function(c, $col, txt, part){
		var wo = c.widgetOptions,
			t = new Date(txt || ''),
			t2 = t.getHours();
		return part === 'year' ? t.getFullYear() :
			part === 'month' ? wo.group_months[t.getMonth()] :
			part === 'day' ? wo.group_months[t.getMonth()] + ' ' + t.getDate() :
			part === 'week' ? wo.group_week[t.getDay()] :
			part === 'time' ? ('00' + (t2 > 12 ? t2 - 12 : t2 === 0 ? t2 + 12 : t2)).slice(-2) + ':' + ('00' + t.getMinutes()).slice(-2) + ' ' +
				('00' + wo.group_time[t2 >= 12 ? 1 : 0]).slice(-2) :
			t.toString();
	}
};

ts.addWidget({
	id: 'group',
	// run AFTER the zebra widget, so the header rows do not get zebra striping
	priority: 100,
	options: {
		group_collapsible : true, // make the group header clickable and collapse the rows below it.
		group_collapsed   : false, // start with all groups collapsed
		group_count       : ' ({num})', // if not false, the "{num}" string is replaced with the number of rows in the group
		// change these default date names based on your language preferences
		group_months      : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		group_week        : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		group_time        : [ 'AM', 'PM' ],
		group_formatter   : null // function(curr, col, table, c, wo) { return curr; }
	},
	init: function(table, thisWidget, c, wo){
		if (wo.group_collapsible) {
			// .on() requires jQuery 1.7+
			c.$table.on('click toggleGroup', 'tr.group-header', function(e){
				// use shift-click to toggle ALL groups
				if (e.type === 'click' && e.shiftKey) {
					$(this).siblings('.group-header').trigger('toggleGroup');
				}
				$(this).toggleClass('collapsed');
				// nextUntil requires jQuery 1.4+
				$(this).nextUntil('tr.group-header').toggleClass('group-hidden', $(this).hasClass('collapsed') );
				e.stopPropagation();
			});
		}
	},
	format: function(table, c, wo) {
		var j, k, curr, $tr, t, t2, time, n,
		group = '',
		col = c.sortList[0] ? c.sortList[0][0] : -1;
		c.$table
			.find('tr.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
		if (wo.group_collapsible) {
			// clear pager saved spacer height (in case the rows are collapsed)
			$.data(table, 'pagerSavedHeight', 0);
		}
		if (col >= 0 && !c.$headers.eq(col).hasClass('group-false')) {
			if (c.debug){ time = new Date(); }
			for (k = 0; k < c.$tbodies.length; k++) {
				n = c.cache[k].normalized;
				group = ''; // clear grouping across tbodies
				$tr = c.$tbodies.eq(k).children('tr');
				if (wo.group_collapsed && wo.group_collapsible) {
					$tr.addClass('group-hidden');
				}
				for (j = 0; j < $tr.length; j++) {
					if ( $tr.eq(j).is(':visible') ) {
						t = (c.$headers.eq(col).attr('class') || '').match(/(group-\w+(-\w+)?)/g);
						// group-{type}-{number/date}
						t2 = t ? t[0].split('-') : ['','letter',1]; // default to letter 1
						curr = n[j] ? ts.grouping[t2[1]]( c, c.$headers.eq(col), c.cache[k].normalized[j][col], /date/.test(t) ? t2[2] : parseInt(t2[2] || 1, 10) || 1, group ) : curr;
						if (group !== curr) {
							group = curr;
							// show range if number > 1
							if (t2[1] === 'number' && t2[2] > 1 && curr !== '') {
								curr += ' - ' + (parseInt(curr, 10) + ((parseInt(t2[2],10) - 1) * (c.$headers.eq(col).hasClass(ts.css.sortAsc) ? 1 : -1)));
							}
							if ($.isFunction(wo.group_formatter)) {
								curr = wo.group_formatter((curr || '').toString(), col, table, c, wo) || curr;
							}
							$tr.eq(j).before('<tr class="group-header ' + c.selectorRemove.slice(1) + (wo.group_collapsed && wo.group_collapsible ? ' collapsed' : '') +
								'" unselectable="on"><td colspan="' + (c.columns+1) + '">' + (wo.group_collapsible ? '<i/>' : '') + '<span class="group-name">' +
								curr + '</span><span class="group-count"></span></td></tr>');
						}
					}
				}
			}
			$tr = c.$table.find('tr.group-header').bind('selectstart', false);
			if (wo.group_count) {
				$tr.each(function(){
					$(this).find('.group-count').html( wo.group_count.replace(/\{num\}/g, $(this).nextUntil('tr.group-header').filter(':visible').length) );
				});
			}
			if (c.debug) {
				$.tablesorter.benchmark("Applying groups widget: ", time);
			}
		}
	},
	remove : function(table, c, wo){
		c.$table
			.off('click', 'tr.group-header')
			.find('.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
	}
});

})(jQuery);
