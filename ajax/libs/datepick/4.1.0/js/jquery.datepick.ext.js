/* http://keith-wood.name/datepick.html
   Datepicker extensions for jQuery v4.1.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

var themeRollerRenderer = {
	picker: '<div{popup:start} id="ui-datepicker-div"{popup:end} class="ui-datepicker ui-widget ' +
	'ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">' +
	'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">' +
	'{link:prev}{link:today}{link:next}</div>{months}' +
	'{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ' +
	'ui-corner-all">{button:clear}{button:close}</div>{popup:end}' +
	'<div class="ui-helper-clearfix"></div></div>',
	monthRow: '<div class="ui-datepicker-row-break">{months}</div>',
	month: '<div class="ui-datepicker-group">' +
	'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{monthHeader:MM yyyy}</div>' +
	'<table class="ui-datepicker-calendar"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
	weekHeader: '<tr>{days}</tr>',
	dayHeader: '<th>{day}</th>',
	week: '<tr>{days}</tr>',
	day: '<td>{day}</td>',
	monthSelector: '.ui-datepicker-group',
	daySelector: 'td',
	rtlClass: 'ui-datepicker-rtl',
	multiClass: 'ui-datepicker-multi',
	defaultClass: 'ui-state-default',
	selectedClass: 'ui-state-active',
	highlightedClass: 'ui-state-hover',
	todayClass: 'ui-state-highlight',
	otherMonthClass: 'ui-datepicker-other-month',
	weekendClass: 'ui-datepicker-week-end',
	commandClass: 'ui-datepicker-cmd',
	commandButtonClass: 'ui-state-default ui-corner-all',
	commandLinkClass: '',
	disabledClass: 'ui-datepicker-disabled'
};

$.extend($.datepick, {

	// Template for generating a datepicker showing week of year.
	weekOfYearRenderer: $.extend({}, $.datepick.defaultRenderer, {
		weekHeader: '<tr><th class="datepick-week">' +
		'<span title="{l10n:weekStatus}">{l10n:weekText}</span></th>{days}</tr>',
		week: '<tr><td class="datepick-week">{weekOfYear}</td>{days}</tr>'
	}),

	// ThemeRoller template for generating a datepicker.
	themeRollerRenderer: themeRollerRenderer,

	// ThemeRoller template for generating a datepicker showing week of year.
	themeRollerWeekOfYearRenderer: $.extend({}, themeRollerRenderer, {
		weekHeader: '<tr><th class="ui-state-hover"><span>{l10n:weekText}</span></th>{days}</tr>',
		week: '<tr><td class="ui-state-hover">{weekOfYear}</td>{days}</tr>'
	}),

	/* Don't allow weekends to be selected.
	   Usage: onDate: $.datepick.noWeekends.
	   @param  date  (Date) the current date
	   @return  (object) information about this date */
	noWeekends: function(date) {
		return {selectable: (date.getDay() || 7) < 6};
	},

	/* Change the first day of the week by clicking on the day header.
	   Usage: onShow: $.datepick.changeFirstDay.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	changeFirstDay: function(picker, inst) {
		var target = $(this);
		picker.find('th span').each(function() {
			var parent = $(this).parent();
			if (parent.is('.datepick-week') || parent.is('.ui-state-hover')) {
				return;
			}
			$('<a href="javascript:void(0)" class="' + this.className +
					'" title="Change first day of the week">' + $(this).text() + '</a>').
				click(function() {
					var dow = parseInt(this.className.replace(/^.*datepick-dow-(\d+).*$/, '$1'), 10);
					target.datepick('option', {firstDay: dow});
				}).
				replaceAll(this);
		});
	},

	/* Add a callback when hovering over dates.
	   Usage: onShow: $.datepick.hoverCallback(handleHover).
	   @param  onHover  (function) the callback when hovering,
	                    it receives the current date and a flag indicating selectability
	                    as parameters on entry, and no parameters on exit,
	                    this refers to the target input or division */
	hoverCallback: function(onHover) {
		return function(picker, inst) {
			if ($.isFunction(onHover)) {
				var target = this;
				picker.find(inst.options.renderer.daySelector + ' a, ' +
						inst.options.renderer.daySelector + ' span').
					hover(function() {
						onHover.apply(target, [$(target).datepick('retrieveDate', this),
							this.nodeName.toLowerCase() == 'a']);
					},
					function() { onHover.apply(target, []); });
			}
		};
	},

	/* Highlight the entire week when hovering over it.
	   Usage: onShow: $.datepick.highlightWeek.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	highlightWeek: function(picker, inst) {
		var target = this;
		var renderer = inst.options.renderer;
		picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
			hover(function() {
				$(this).parents('tr').find(renderer.daySelector + ' *').
					addClass(renderer.highlightedClass);
			},
			function() {
				$(this).parents('tr').find(renderer.daySelector + ' *').
					removeClass(renderer.highlightedClass);
			});
	},

	/* Show a status bar with messages.
	   Usage: onShow: $.datepick.showStatus.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	showStatus: function(picker, inst) {
		var isTR = (inst.options.renderer.selectedClass == themeRollerRenderer.selectedClass);
		var defaultStatus = inst.options.defaultStatus || '&nbsp;';
		var status = $('<div class="' + (!isTR ? 'datepick-status' :
			'ui-datepicker-status ui-widget-header ui-helper-clearfix ui-corner-all') + '">' +
			defaultStatus + '</div>').
			insertAfter(picker.find('.datepick-month-row:last,.ui-datepicker-row-break:last'));
		picker.find('*[title]').each(function() {
				var title = $(this).attr('title');
				$(this).removeAttr('title').hover(
					function() { status.text(title || defaultStatus); },
					function() { status.text(defaultStatus); });
			});
	},

	/* Allow easier navigation by month/year.
	   Usage: onShow: $.datepick.monthNavigation.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	monthNavigation: function(picker, inst) {
		var target = $(this);
		var isTR = (inst.options.renderer.selectedClass == themeRollerRenderer.selectedClass);
		var minDate = inst.curMinDate();
		var maxDate = inst.get('maxDate');
		var month = inst.drawDate.getMonth();
		var year = inst.drawDate.getFullYear();
		var html = '<div class="' + (!isTR ? 'datepick-month-nav' : 'ui-datepicker-month-nav') + '"' +
			' style="display: none;">';
		for (var i = 0; i < inst.options.monthNames.length; i++) {
			var inRange = ((!minDate || new Date(year, i + 1, 0).getTime() >= minDate.getTime()) &&
				(!maxDate || new Date(year, i, 1).getTime() <= maxDate.getTime()));
			html += '<div>' +
				(inRange ? '<a href="#" class="dp' + new Date(year, i, 1).getTime() + '"' : '<span') +
				' title="' + inst.options.monthNames[i] + '">' + inst.options.monthNamesShort[i] +
				(inRange ? '</a>' : '</span>') + '</div>';
		}
		for (var i = -6; i <= 6; i++) {
			if (i == 0) {
				continue;
			}
			var inRange =
				((!minDate || new Date(year + i, 12 - 1, 31).getTime() >= minDate.getTime()) &&
				(!maxDate || new Date(year + i, 1 - 1, 1).getTime() <= maxDate.getTime()));
			html += '<div>' + (inRange ? '<a href="#" class="dp' +
				new Date(year + i, month, 1).getTime() + '"' : '<span') +
				' title="' + (year + i) + '">' + (year + i) +
				(inRange ? '</a>' : '</span>') + '</div>';
		}
		html += '</div>';
		html = $(html).insertAfter(picker.find('div.datepick-nav,div.ui-datepicker-header:first'));
		html.find('a').click(function() {
				var date = target.datepick('retrieveDate', this);
				target.datepick('showMonth', date.getFullYear(), date.getMonth() + 1);
				return false;
			});
		picker.find('div.datepick-month-header,div.ui-datepicker-month-header').click(function() {
			html.slideToggle();
		}).css('cursor', 'pointer');
	},

	/* Select an entire week when clicking on a week number.
	   Use in conjunction with weekOfYearRenderer or themeRollerWeekOfYearRenderer.
	   Usage: onShow: $.datepick.selectWeek.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	selectWeek: function(picker, inst) {
		var target = $(this);
		picker.find('td.datepick-week span,td.ui-state-hover span').each(function() {
			$('<a href="javascript:void(0)" class="' +
					this.className + '" title="Select the entire week">' +
					$(this).text() + '</a>').
				click(function() {
					var date = target.datepick('retrieveDate', this);
					var dates = [date];
					for (var i = 1; i < 7; i++) {
						dates.push(date = $.datepick.add($.datepick.newDate(date), 1, 'd'));
					}
					if (inst.options.rangeSelect) {
						dates.splice(1, dates.length - 2);
					}
					target.datepick('setDate', dates).datepick('hide');
				}).
				replaceAll(this);
		});
	},

	/* Select an entire month when clicking on the week header.
	   Use in conjunction with weekOfYearRenderer or themeRollerWeekOfYearRenderer.
	   Usage: onShow: $.datepick.selectMonth.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	selectMonth: function(picker, inst) {
		var target = $(this);
		picker.find('th.datepick-week span,th.ui-state-hover span').each(function() {
			$('<a href="javascript:void(0)" title="Select the entire month">' +
					$(this).text() + '</a>').
				click(function() {
					var date = target.datepick('retrieveDate', $(this).parents('table').
						find('td:not(.datepick-week):not(.ui-state-hover) ' +
							'*:not(.datepick-other-month):not(.ui-datepicker-other-month)')[0]);
					var dates = [date];
					var dim = $.datepick.daysInMonth(date);
					for (var i = 1; i < dim; i++) {
						dates.push(date = $.datepick.add($.datepick.newDate(date), 1, 'd'));
					}
					if (inst.options.rangeSelect) {
						dates.splice(1, dates.length - 2);
					}
					target.datepick('setDate', dates).datepick('hide');
				}).
				replaceAll(this);
		});
	},

	/* Select a month only instead of a single day.
	   Usage: onShow: $.datepick.monthOnly.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  inst    (object) the current instance settings */
	monthOnly: function(picker, inst) {
		var target = $(this);
		var selectMonth = $('<div style="text-align: center;"><button type="button">Select</button></div>').
			insertAfter(picker.find('.datepick-month-row:last,.ui-datepicker-row-break:last')).
			children().click(function() {
				var monthYear = picker.find('.datepick-month-year:first').val().split('/');
				target.datepick('setDate', $.datepick.newDate(
					parseInt(monthYear[1], 10), parseInt(monthYear[0], 10), 1)).
					datepick('hide');
			});
		picker.find('.datepick-month-row table,.ui-datepicker-row-break table').remove();
	}
});

})(jQuery);
