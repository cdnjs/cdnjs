/*! tablesorter Grouping widget - updated 11/25/2013 (core v2.14.2)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter;

ts.grouping = {

	number : function(c, $column, txt, num, group){
		var value, word;
		if (num > 1 && txt !== '') {
			if ($column.hasClass(ts.css.sortAsc)) {
				value = Math.floor(parseFloat(txt)/num) * num;
				return value > parseFloat(group || 0) ? value : parseFloat(group || 0);
			} else {
				value = Math.ceil(parseFloat(txt)/num) * num;
				return value < parseFloat(group || num) - value ? parseFloat(group || num) - value : value;
			}
		} else {
			word = (txt + '').match(/\d+/g);
			return word && word.length >= num ? word[num - 1] : txt || '';
		}
	},
	separator : function(c, $column, txt, num){
		var word = (txt + '').split(c.widgetOptions.group_separator);
		return $.trim(word && num > 0 && word.length >= num ? word[(num || 1) - 1] : '');
	},
	word : function(c, $column, txt, num){
		var word = (txt + ' ').match(/\w+/g);
		return word && word.length >= num ? word[num - 1] : txt || '';
	},
	letter : function(c, $column, txt, num){
		return txt ? (txt + ' ').substring(0, num) : '';
	},
	date : function(c, $column, txt, part, group){
		var wo = c.widgetOptions,
			time = new Date(txt || ''),
			hours = time.getHours();
		return part === 'year' ? time.getFullYear() :
			part === 'month' ? wo.group_months[time.getMonth()] :
			part === 'day' ? wo.group_months[time.getMonth()] + ' ' + time.getDate() :
			part === 'week' ? wo.group_week[time.getDay()] :
			part === 'time' ? ('00' + (hours > 12 ? hours - 12 : hours === 0 ? hours + 12 : hours)).slice(-2) + ':' +
				('00' + time.getMinutes()).slice(-2) + ' ' + ('00' + wo.group_time[hours >= 12 ? 1 : 0]).slice(-2) :
			wo.group_dateString(time);
	}
};

ts.addWidget({
	id: 'group',
	priority: 100,
	options: {
		group_collapsible : true, // make the group header clickable and collapse the rows below it.
		group_collapsed   : false, // start with all groups collapsed
		group_count       : ' ({num})', // if not false, the "{num}" string is replaced with the number of rows in the group
		group_separator   : '-',  // group name separator; used when group-separator-# class is used.
		group_formatter   : null, // function(txt, column, table, c, wo) { return txt; }
		group_callback    : null, // function($cell, $rows, column, table){}, callback allowing modification of the group header labels
		group_complete    : 'groupingComplete', // event triggered on the table when the grouping widget has finished work

		// change these default date names based on your language preferences
		group_months      : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		group_week        : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		group_time        : [ 'AM', 'PM' ],
		// this function is used when "group-date" is set to create the date string
		// you can just return date, date.toLocaleString(), date.toLocaleDateString() or d.toLocaleTimeString()
		// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Conversion_getter
		group_dateString  : function(date) { return date.toLocaleString(); }
	},
	init: function(table, thisWidget, c, wo){
		if (wo.group_collapsible) {
			// .on() requires jQuery 1.7+
			c.$table.on('click toggleGroup', 'tr.group-header', function(event){
				event.stopPropagation();
				var $this = $(this);
				// use shift-click to toggle ALL groups
				if (event.type === 'click' && event.shiftKey) {
					$this.siblings('.group-header').trigger('toggleGroup');
				}
				$this.toggleClass('collapsed');
				// nextUntil requires jQuery 1.4+
				$this.nextUntil('tr.group-header').toggleClass('group-hidden', $this.hasClass('collapsed') );
			});
		}
	},
	format: function(table, c, wo) {
		var rowIndex, tbodyIndex, currentGroup, $rows, groupClass, grouping, time, cache,
			lang = wo.grouping_language,
			group = '',
			column = c.sortList[0] ? c.sortList[0][0] : -1;
		c.$table
			.find('tr.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
		if (wo.group_collapsible) {
			// clear pager saved spacer height (in case the rows are collapsed)
			c.$table.data('pagerSavedHeight', 0);
		}
		if (column >= 0 && !c.$headers.eq(column).hasClass('group-false')) {
			if (c.debug){ time = new Date(); }
			for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++) {
				cache = c.cache[tbodyIndex].normalized;
				group = ''; // clear grouping across tbodies
				$rows = c.$tbodies.eq(tbodyIndex).children('tr').not('.' + c.cssChildRow);
				if (wo.group_collapsed && wo.group_collapsible) {
					$rows.addClass('group-hidden');
				}
				for (rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
					if ( $rows.eq(rowIndex).is(':visible') ) {
						// group class finds "group-{word/separator/letter/number/date/false}-{optional:#/year/month/day/week/time}"
						groupClass = (c.$headers.eq(column).attr('class') || '').match(/(group-\w+(-\w+)?)/g);
						// grouping = [ 'group', '{word/separator/letter/number/date/false}', '{#/year/month/day/week/time}' ]
						grouping = groupClass ? groupClass[0].split('-') : ['','letter',1]; // default to letter 1
						// fixes #438
						if (ts.grouping[grouping[1]]) {
							currentGroup = cache[rowIndex] ? 
								ts.grouping[grouping[1]]( c, c.$headers.eq(column), cache[rowIndex][column], /date/.test(groupClass) ?
								grouping[2] : parseInt(grouping[2] || 1, 10) || 1, group, lang ) : currentGroup;
							if (group !== currentGroup) {
								group = currentGroup;
								// show range if number > 1
								if (grouping[1] === 'number' && grouping[2] > 1 && currentGroup !== '') {
									currentGroup += ' - ' + (parseInt(currentGroup, 10) +
										((parseInt(grouping[2],10) - 1) * (c.$headers.eq(column).hasClass(ts.css.sortAsc) ? 1 : -1)));
								}
								if ($.isFunction(wo.group_formatter)) {
									currentGroup = wo.group_formatter((currentGroup || '').toString(), column, table, c, wo) || currentGroup;
								}
								$rows.eq(rowIndex).before('<tr class="group-header ' + c.selectorRemove.slice(1) +
									(wo.group_collapsed && wo.group_collapsible ? ' collapsed' : '') + '" unselectable="on"><td colspan="' +
									c.columns + '">' + (wo.group_collapsible ? '<i/>' : '') + '<span class="group-name">' +
									currentGroup + '</span><span class="group-count"></span></td></tr>');
							}
						}
					}
				}
			}
			$rows = c.$table.find('tr.group-header').bind('selectstart', false);
			if (wo.group_count || $.isFunction(wo.group_callback)) {
				$rows.each(function(){
					var $rows,
						$row = $(this),
						$label = $row.find('.group-count');
					if ($label.length) {
						$rows = $row.nextUntil('tr.group-header').filter(':visible');
						if (wo.group_count) {
							$label.html( wo.group_count.replace(/\{num\}/g, $rows.length) );
						}
						if ($.isFunction(wo.group_callback)) {
							wo.group_callback($row.find('td'), $rows, column, table);
						}
					}
				});
			}
			c.$table.trigger(wo.group_complete);
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
