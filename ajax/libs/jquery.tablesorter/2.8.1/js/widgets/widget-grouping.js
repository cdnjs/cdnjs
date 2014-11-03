/*! tablesorter Grouping widget - updated 3/18/2013
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*global jQuery: false */
;(function($){
"use strict";

$.tablesorter.addWidget({
	id: 'group',
	options: {
		group_collapsible : true, // make the group header clickable and collapse the rows below it.
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
			c.$table.on('click', 'tr.group-header', function(){
				$(this).toggleClass('collapsed');
				// nextUntil requires jQuery 1.4+
				$(this).nextUntil('tr.group-header').toggleClass('group-hidden', $(this).hasClass('collapsed') );
			});
		}
	},
	format: function(table, c, wo) {
		var j, k, curr, $tr, g, t, t2, time,
		group = '',
		col = c.sortList[0] ? c.sortList[0][0] : -1,
		groupBy = {
			number : function($col, txt, num){
				if (num > 1 && txt !== '') {
					if ($col.hasClass(c.cssAsc)) {
						t = Math.floor(parseFloat(txt)/num) * num;
						return t > parseFloat(group || 0) ? t : parseFloat(group || 0);
					} else {
						t = Math.ceil(parseFloat(txt)/num) * num;
						return t < parseFloat(group || num) - t ? parseFloat(group || num) - t : t;
					}
				} else {
					var w = (txt + '').match(/\d+/g);
					return w && w.length >= num ? w[num - 1] : txt || '';
				}
			},
			word   : function($col, txt, num){
				var w = (txt + ' ').match(/\w+/g);
				return w && w.length >= num ? w[num - 1] : txt || '';
			},
			letter : function($col, txt, num){
				return txt ? (txt + ' ').substring(0, num) : '';
			},
			date   : function($col, txt, part){
				t = new Date(txt || '');
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

		c.$table
			.find('tr.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
		if (col >= 0) {
			if (c.debug){ time = new Date(); }
			for (k = 0; k < c.$tbodies.length; k++) {
				$tr = c.$tbodies.children('tr');
				for (j = 0; j < $tr.length; j++) {
					t = (c.$headers.eq(col).attr('class') || '').match(/(group-\w+(-\w+)?)/g);
					// group-{type}-{number/date}
					t2 = t ? t[0].split('-') : ['','letter',1]; // default to letter 1
					curr = groupBy[t2[1]]( c.$headers.eq(col), c.cache[k].normalized[j][col], /date/.test(t) ? t2[2] : parseInt(t2[2] || 1, 10) || 1 );
					if (group !== curr) {
						group = curr;
						// show range if number > 1
						if (t2[1] === 'number' && t2[2] > 1 && curr !== '') {
							curr += ' - ' + (parseInt(curr, 10) + ((parseInt(t2[2],10) - 1) * (c.$headers.eq(col).hasClass(c.cssAsc) ? 1 : -1)));
						}
						if ($.isFunction(wo.group_formatter)) {
							curr = wo.group_formatter((curr || '').toString(), col, table, c, wo) || curr;
						}
						$tr.eq(j).before('<tr class="group-header ' + c.selectorRemove.slice(1) + '"><td colspan="' + (c.columns+1) + '">' +
							(wo.group_collapsible ? '<i/>' : '') + '<span class="group-name">' + curr + '</span><span class="group-count"></span></td></tr>');
					}
				}
			}
			if (wo.group_count) {
				c.$table.find('tr.group-header').each(function(){
					$(this).find('.group-count').html( wo.group_count.replace(/\{num\}/g, $(this).nextUntil('tr.group-header').length) );
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
