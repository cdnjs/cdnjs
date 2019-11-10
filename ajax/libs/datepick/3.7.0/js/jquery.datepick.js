/* http://keith-wood.name/datepick.html
   Datepicker for jQuery 3.7.0.
   Written by Marc Grabanski (m@marcgrabanski.com) and
              Keith Wood (kbwood{at}iinet.com.au).
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the authors if you use it. */

(function($) { // Hide the namespace

var PROP_NAME = 'datepick';

/* Date picker manager.
   Use the singleton instance of this class, $.datepick, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepick() {
	this._uuid = new Date().getTime(); // Unique identifier seed
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		clearText: 'Clear', // Display text for clear link
		clearStatus: 'Erase the current date', // Status text for clear link
		closeText: 'Close', // Display text for close link
		closeStatus: 'Close without change', // Status text for close link
		prevText: '&#x3c;Prev', // Display text for previous month link
		prevStatus: 'Show the previous month', // Status text for previous month link
		prevBigText: '&#x3c;&#x3c;', // Display text for previous year link
		prevBigStatus: 'Show the previous year', // Status text for previous year link
		nextText: 'Next&#x3e;', // Display text for next month link
		nextStatus: 'Show the next month', // Status text for next month link
		nextBigText: '&#x3e;&#x3e;', // Display text for next year link
		nextBigStatus: 'Show the next year', // Status text for next year link
		currentText: 'Today', // Display text for current month link
		currentStatus: 'Show the current month', // Status text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		monthStatus: 'Show a different month', // Status text for selecting a month
		yearStatus: 'Show a different year', // Status text for selecting a year
		weekHeader: 'Wk', // Header for the week of the year column
		weekStatus: 'Week of the year', // Status text for the week of the year column
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		dayStatus: 'Set DD as first week day', // Status text for the day of the week selection
		dateStatus: 'Select DD, M d', // Status text for the date selection
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		initStatus: 'Select a date', // Initial Status text on opening
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		useThemeRoller: false, // True to apply ThemeRoller styling, false for default styling
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'show', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		duration: 'normal', // Duration of display/closure
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		alignment: 'bottom', // Alignment of popup - with nominated corner of input:
			// 'top' or 'bottom' aligns depending on language direction,
			// 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		showDefault: false, // True to populate field with the default date
		appendText: '', // Display text following the input box, e.g. showing the format
		closeAtTop: true, // True to have the clear/close at the top,
			// false to have them at the bottom
		mandatory: false, // True to hide the Clear link, false to include it
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		showBigPrevNext: false, // True to show big prev/next links
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: true, // True if month can be selected directly, false if only prev/next
		changeYear: true, // True if year can be selected directly, false if only prev/next
		yearRange: '-10:+10', // Range of years to display in drop-down,
			// either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
		changeFirstDay: false, // True to click on day name to change, false to remain as set
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		highlightWeek: false, // True to highlight the selected week
		showWeeks: false, // True to show week of the year, false to omit
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century, string value starting with '+'
			// for current year + value, -1 for no change
		showStatus: false, // True to show status bar at bottom, false to not show it
		statusForDate: this.dateStatus, // Function to provide status text for a date -
			// takes date and instance as parameters, returns display text
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multiple months at which to show the current month (starting at 0)
		rangeSelect: false, // Allows for selecting a date range on one date picker
		rangeSeparator: ' - ', // Text between two dates in a range
		multiSelect: 0, // Maximum number of selectable dates
		multiSeparator: ',', // Text between multiple dates
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepick.noWeekends
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onHover: null, // Define a callback function when hovering over a day
		onSelect: null, // Define a callback function when a date is selected
		onClose: null, // Define a callback function when the datepicker is closed
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true // The input is constrained by the current date format
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div style="display: none;"></div>');
}

$.extend(Datepick.prototype, {
	version: '3.7.0', // Current version
	
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepick',

	// Class/id names for default and ThemeRoller stylings
	_mainDivId: ['datepick-div', 'ui-datepicker-div'], // The main datepicker division
	_mainDivClass: ['', 'ui-datepicker ' +
		'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'], // Popup class
	_inlineClass: ['datepick-inline', 'ui-datepicker-inline ui-datepicker ' +
		'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'], // Inline class
	_multiClass: ['datepick-multi', 'ui-datepicker-multi'], // Multi-month class
	_rtlClass: ['datepick-rtl', 'ui-datepicker-rtl'], // Right-to-left class
	_appendClass: ['datepick-append', 'ui-datepicker-append'], // Append text class
	_triggerClass: ['datepick-trigger', 'ui-datepicker-trigger'], // Trigger class
	_dialogClass: ['datepick-dialog', 'ui-datepicker-dialog'], // Dialog class
	_promptClass: ['datepick-prompt', 'ui-datepicker-prompt'], // Dialog prompt class
	_disableClass: ['datepick-disabled', 'ui-datepicker-disabled'], // Disabled covering class
	_controlClass: ['datepick-control', 'ui-datepicker-header ' +
		'ui-widget-header ui-helper-clearfix ui-corner-all'], // Control bar class
	_clearClass: ['datepick-clear', 'ui-datepicker-clear'], // Clear class
	_closeClass: ['datepick-close', 'ui-datepicker-close'], // Close class
	_linksClass: ['datepick-links', 'ui-datepicker-header ' +
		'ui-widget-header ui-helper-clearfix ui-corner-all'], // Links bar class
	_prevClass: ['datepick-prev', 'ui-datepicker-prev'], // Previous class
	_nextClass: ['datepick-next', 'ui-datepicker-next'], // Next class
	_currentClass: ['datepick-current', 'ui-datepicker-current'], // Current class
	_oneMonthClass: ['datepick-one-month', 'ui-datepicker-group'], // Single month class
	_newRowClass: ['datepick-new-row', 'ui-datepicker-row-break'], // New month row class
	_monthYearClass: ['datepick-header', 'ui-datepicker-header ' +
		'ui-widget-header ui-helper-clearfix ui-corner-all'], // Month/year header class
	_monthSelectClass: ['datepick-new-month', 'ui-datepicker-month'], // Month select class
	_monthClass: ['', 'ui-datepicker-month'], // Month text class
	_yearSelectClass: ['datepick-new-year', 'ui-datepicker-year'], // Year select class
	_yearClass: ['', 'ui-datepicker-year'], // Year text class
	_tableClass: ['datepick', 'ui-datepicker-calendar'], // Month table class
	_tableHeaderClass: ['datepick-title-row', ''], // Week header class
	_weekColClass: ['datepick-week-col', 'ui-datepicker-week-col'], // Week number column class
	_weekRowClass: ['datepick-days-row', ''], // Week row class
	_weekendClass: ['datepick-week-end-cell', 'ui-datepicker-week-end'], // Weekend class
	_dayClass: ['datepick-days-cell', ''], // Single day class
	_otherMonthClass: ['datepick-other-month', 'ui-datepicker-other-month'], // Other month class
	_todayClass: ['datepick-today', 'ui-state-highlight'], // Today class
	_selectableClass: ['', 'ui-state-default'], // Selectable cell class
	_unselectableClass: ['datepick-unselectable',
		'ui-datepicker-unselectable ui-state-disabled'], // Unselectable cell class
	_selectedClass: ['datepick-current-day', 'ui-state-active'], // Selected day class
	_dayOverClass: ['datepick-days-cell-over', 'ui-state-hover'], // Day hover class
	_weekOverClass: ['datepick-week-over', 'ui-state-hover'], // Week hover class
	_statusClass: ['datepick-status', 'ui-datepicker-status'], // Status bar class
	_statusId: ['datepick-status-', 'ui-datepicker-status-'], // Status bar ID prefix
	_coverClass: ['datepick-cover', 'ui-datepicker-cover'], // IE6- iframe class

	/* Override the default settings for all instances of the date picker.
	   @param  settings  (object) the new settings to use as defaults (anonymous object)
	   @return  (Datepick) the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    (element) the target input field or division or span
	   @param  settings  (object) the new settings to use for this date picker instance */
	_attachDatepick: function(target, settings) {
		if (!target.id)
			target.id = 'dp' + (++this._uuid);
		var nodeName = target.nodeName.toLowerCase();
		var inst = this._newInst($(target), (nodeName == 'div' || nodeName == 'span'));
		// Check for settings on the control itself
		var inlineSettings = ($.fn.metadata ? $(target).metadata() : {});
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (inst.inline) {
			inst.dpDiv.addClass(this._inlineClass[
				this._get(inst, 'useThemeRoller') ? 1 : 0]);
			this._inlineDatepick(target, inst);
		}
		else
			this._connectDatepick(target, inst);
	},

	/* Create a new instance object.
	   @param  target  (jQuery) the target input field or division or span
	   @param  inline  (boolean) true if this datepicker appears inline */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([:\[\]\.])/g, '\\\\$1'); // Escape jQuery meta chars
		return {id: id, input: target, // Associated target
			cursorDate: this._daylightSavingAdjust(new Date()), // Current position
			drawMonth: 0, drawYear: 0, // Month being drawn
			dates: [], // Selected dates
			inline: inline, // Is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : $('<div></div>')), // presentation div
			siblings: $([])}; // Created siblings (trigger/append)
	},

	/* Attach the date picker to an input field.
	   @param  target  (element) the target input field or division or span
	   @param  inst    (object) the instance settings for this datepicker */
	_connectDatepick: function(target, inst) {
		var input = $(target);
		if (input.hasClass(this.markerClassName))
			return;
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		if (appendText) {
			var append = $('<span class="' + this._appendClass[useTR] + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](append);
			inst.siblings = inst.siblings.add(append);
		}
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // Pop-up date picker when in the marked field
			input.focus(this._showDatepick);
		if (showOn == 'button' || showOn == 'both') { // Pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			var trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass[useTR]).
					attr({src: buttonImage, alt: buttonText, title: buttonText}) :
				$('<button type="button"></button>').addClass(this._triggerClass[useTR]).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{src: buttonImage, alt: buttonText, title: buttonText})));
			input[isRTL ? 'before' : 'after'](trigger);
			inst.siblings = inst.siblings.add(trigger);
			trigger.click(function() {
				if ($.datepick._datepickerShowing && $.datepick._lastInput == target)
					$.datepick._hideDatepick();
				else
					$.datepick._showDatepick(target);
				return false;
			});
		}
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
		if (this._get(inst, 'showDefault') && !inst.input.val()) {
			inst.dates = [this._getDefaultDate(inst)];
			this._showDate(inst);
		}
		$.data(target, PROP_NAME, inst);
	},

	/* Attach an inline date picker to a div.
	   @param  target  (element) the target input field or division or span
	   @param  inst    (object) the instance settings for this datepicker */
	_inlineDatepick: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName);
		$.data(target, PROP_NAME, inst);
		inst.drawMonth = inst.cursorDate.getMonth();
		inst.drawYear = inst.cursorDate.getFullYear();
		$('body').append(inst.dpDiv);
		this._updateDatepick(inst);
		// Fix width for dynamic number of date pickers
		inst.dpDiv.width(this._getNumberOfMonths(inst)[1] *
			$('.' + this._oneMonthClass[this._get(inst, 'useThemeRoller') ? 1 : 0],
			inst.dpDiv)[0].offsetWidth);
		divSpan.append(inst.dpDiv);
		this._updateAlternate(inst);
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     (element) ignored
	   @param  date      (string or Date) the initial date to display
	   @param  onSelect  (function) the function to call when a date is selected
	   @param  settings  (object) update the dialog date picker instance's settings
	   @param  pos       (int[2]) coordinates for the dialog's position within the screen or
	                     (event) with x/y coordinates or
	                     leave empty for default (screen centre) */
	_dialogDatepick: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // Internal instance
		if (!inst) {
			var id = 'dp' + (++this._uuid);
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; width: 1px; z-index: -1"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);
		this._pos = (pos ? (isArray(pos) ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // Should use actual width/height below
				[(document.documentElement.clientWidth / 2) - 100 + scrollX,
				(document.documentElement.clientHeight / 2) - 150 + scrollY];
		}

		// Move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass[this._get(inst, 'useThemeRoller') ? 1 : 0]);
		this._showDatepick(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
	},

	/* Detach a datepicker from its control.
	   @param  target  (element) the target input field or division or span */
	_destroyDatepick: function(target) {
		var $target = $(target);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = $.data(target, PROP_NAME);
		$.removeData(target, PROP_NAME);
		if (inst.inline)
			$target.removeClass(this.markerClassName).empty();
		else {
			$(inst.siblings).remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepick).unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
		}
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target  (element) the target input field or division or span */
	_enableDatepick: function(target) {
		var $target = $(target);
		if (!$target.hasClass(this.markerClassName))
			return;
		var inst = $.data(target, PROP_NAME);
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		if (inst.inline)
			$target.children('.' + this._disableClass[useTR]).remove().end().
				find('select').attr('disabled', '');
		else {
			target.disabled = false;
			inst.siblings.filter('button.' + this._triggerClass[useTR]).
				each(function() { this.disabled = false; }).end().
				filter('img.' + this._triggerClass[useTR]).
				css({opacity: '1.0', cursor: ''});
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // Delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target  (element) the target input field or division or span */
	_disableDatepick: function(target) {
		var $target = $(target);
		if (!$target.hasClass(this.markerClassName))
			return;
		var inst = $.data(target, PROP_NAME);
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		if (inst.inline) {
			var inline = $target.children('.' + this._inlineClass[useTR]);
			var offset = inline.offset();
			var relOffset = {left: 0, top: 0};
			inline.parents().each(function() {
				if ($(this).css('position') == 'relative') {
					relOffset = $(this).offset();
					return false;
				}
			});
			$target.prepend('<div class="' + this._disableClass[useTR] + '" style="' +
				'width: ' + inline.width() + 'px; height: ' + inline.height() +
				'px; left: ' + (offset.left - relOffset.left) +
				'px; top: ' + (offset.top - relOffset.top) + 'px;"></div>').
				find('select').attr('disabled', 'disabled');
		}
		else {
			target.disabled = true;
			inst.siblings.filter('button.' + this._triggerClass[useTR]).
				each(function() { this.disabled = true; }).end().
				filter('img.' + this._triggerClass[useTR]).
				css({opacity: '0.5', cursor: 'default'});
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // Delete entry
		this._disabledInputs.push(target);
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target  (element) the target input field or division or span
	   @return  (boolean) true if disabled, false if enabled */
	_isDisabledDatepick: function(target) {
		return (!target ? false : $.inArray(target, this._disabledInputs) > -1);
	},

	/* Retrieve the instance data for the target control.
	   @param  target  (element) the target input field or division or span
	   @return  (object) the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  (element) the target input field or division or span
	   @param  name    (object) the new settings to update or
	                   (string) the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   (any) the new value for the setting
	                   (omit if above is an object or to retrieve value) */
	_optionDatepick: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepick._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepick(null);
			}
			var dates = this._getDateDatepick(target);
			extendRemove(inst.settings, settings);
			extendRemove(inst, {dates: []});
			var blank = (!dates || isArray(dates));
			if (isArray(dates))
				for (var i = 0; i < dates.length; i++)
					if (dates[i]) {
						blank = false;
						break;
					}
			if (!blank)
				this._setDateDatepick(target, dates);
			if (inst.inline)
				$(target).children('div').removeClass(this._inlineClass.join(' ')).
					addClass(this._inlineClass[this._get(inst, 'useThemeRoller') ? 1 : 0]);
			this._updateDatepick(inst);
		}
	},

	// Change method deprecated
	_changeDatepick: function(target, name, value) {
		this._optionDatepick(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  (element) the target input field or division or span */
	_refreshDatepick: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepick(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   (element) the target input field or division or span
	   @param  date     (Date) the new date
	   @param  endDate  (Date) the new end date for a range (optional) */
	_setDateDatepick: function(target, date, endDate) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date, endDate);
			this._updateDatepick(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target  (element) the target input field or division or span
	   @return (Date) the current date or
	           (Date[2]) the current dates for a range */
	_getDateDatepick: function(target) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes.
	   @param  event  (KeyEvent) the keystroke details
	   @return  (boolean) true to continue, false to discard */
	_doKeyDown: function(event) {
		var inst = $.datepick._getInst(event.target);
		inst.keyEvent = true;
		var handled = true;
		var isRTL = $.datepick._get(inst, 'isRTL');
		var useTR = $.datepick._get(inst, 'useThemeRoller') ? 1 : 0;
		if ($.datepick._datepickerShowing)
			switch (event.keyCode) {
				case 9:  $.datepick._hideDatepick(null, '');
						break; // Hide on tab out
				case 13: var sel = $('td.' + $.datepick._dayOverClass[useTR], inst.dpDiv);
						if (sel.length == 0)
							sel = $('td.' + $.datepick._selectedClass[useTR] + ':first', inst.dpDiv);
						if (sel[0])
							$.datepick._selectDay(sel[0], event.target, inst.cursorDate.getTime());
						else
							$.datepick._hideDatepick(null, $.datepick._get(inst, 'duration'));
						break; // Select the value on enter
				case 27: $.datepick._hideDatepick(null, $.datepick._get(inst, 'duration'));
						break; // Hide on escape
				case 33: $.datepick._adjustDate(event.target, (event.ctrlKey ?
							-$.datepick._get(inst, 'stepBigMonths') :
							-$.datepick._get(inst, 'stepMonths')), 'M');
						break; // Previous month/year on page up/+ ctrl
				case 34: $.datepick._adjustDate(event.target, (event.ctrlKey ?
							+$.datepick._get(inst, 'stepBigMonths') :
							+$.datepick._get(inst, 'stepMonths')), 'M');
						break; // Next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey)
							$.datepick._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // Clear on ctrl or command + end
				case 36: if (event.ctrlKey || event.metaKey)
							$.datepick._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // Current on ctrl or command + home
				case 37: if (event.ctrlKey || event.metaKey)
							$.datepick._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command + left
						if (event.originalEvent.altKey)
							$.datepick._adjustDate(event.target,
								(event.ctrlKey ? -$.datepick._get(inst, 'stepBigMonths') :
								-$.datepick._get(inst, 'stepMonths')), 'M');
						// Next month/year on alt + left/+ ctrl
						break;
				case 38: if (event.ctrlKey || event.metaKey)
							$.datepick._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command + up
				case 39: if (event.ctrlKey || event.metaKey)
							$.datepick._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command + right
						if (event.originalEvent.altKey)
							$.datepick._adjustDate(event.target,
								(event.ctrlKey ? +$.datepick._get(inst, 'stepBigMonths') :
								+$.datepick._get(inst, 'stepMonths')), 'M');
						// Next month/year on alt + right/+ ctrl
						break;
				case 40: if (event.ctrlKey || event.metaKey)
							$.datepick._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command + down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // Display the date picker on ctrl+home
			$.datepick._showDatepick(this);
		else
			handled = false;
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
		inst.ctrlKey = (event.keyCode < 48);
		return !handled;
	},

	/* Filter entered characters - based on date format.
	   @param  event  (KeyEvent) the keystroke details
	   @return  (boolean) true to continue, false to discard */
	_doKeyPress: function(event) {
		var inst = $.datepick._getInst(event.target);
		if ($.datepick._get(inst, 'constrainInput')) {
			var chars = $.datepick._possibleChars(inst);
			var chr = String.fromCharCode(event.keyCode || event.charCode);
			return inst.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field.
	   @param  event  (KeyEvent) the keystroke details
	   @return  (boolean) true to continue */
	_doKeyUp: function(event) {
		var inst = $.datepick._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var separator = ($.datepick._get(inst, 'rangeSelect') ?
					$.datepick._get(inst, 'rangeSeparator') :
					($.datepick._get(inst, 'multiSelect') ?
					$.datepick._get(inst, 'multiSeparator') : ''));
				var dates = (inst.input ? inst.input.val() : '');
				dates = (separator ? dates.split(separator) : [dates]);
				var ok = true;
				for (var i = 0; i < dates.length; i++) {
					if (!$.datepick.parseDate($.datepick._get(inst, 'dateFormat'),
							dates[i], $.datepick._getFormatConfig(inst))) {
						ok = false;
						break;
					}
				}
				if (ok) { // Only if valid
					$.datepick._setDateFromField(inst);
					$.datepick._updateAlternate(inst);
					$.datepick._updateDatepick(inst);
				}
			}
			catch (event) {
				// Ignore
			}
		}
		return true;
	},

	/* Extract all possible characters from the date format.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (string) the set of characters allowed by this format */
	_possibleChars: function (inst) {
		var dateFormat = $.datepick._get(inst, 'dateFormat');
		var chars = ($.datepick._get(inst, 'rangeSelect') ?
			$.datepick._get(inst, 'rangeSeparator') :
			($.datepick._get(inst, 'multiSelect') ?
			$.datepick._get(inst, 'multiSeparator') : ''));
		var literal = false;
		for (var iFormat = 0; iFormat < dateFormat.length; iFormat++)
			if (literal)
				if (dateFormat.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += dateFormat.charAt(iFormat);
			else
				switch (dateFormat.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += dateFormat.charAt(iFormat);
				}
		return chars;
	},

	/* Update the datepicker when hovering over a date.
	   @param  td         (element) the current cell
	   @param  id         (string) the ID of the datepicker instance
	   @param  timestamp  (number) the timestamp for this date */
	_doMouseOver: function(td, id, timestamp) {
		var inst = $.datepick._getInst($('#' + id)[0]);
		var useTR = $.datepick._get(inst, 'useThemeRoller') ? 1 : 0;
		$(td).parents('tbody').find('td').
			removeClass($.datepick._dayOverClass[useTR]).end().end().
			addClass($.datepick._dayOverClass[useTR]);
		if ($.datepick._get(inst, 'highlightWeek'))
			$(td).parent().parent().find('tr').
				removeClass($.datepick._weekOverClass[useTR]).end().end().
				addClass($.datepick._weekOverClass[useTR]);
		if ($(td).text()) {
			var date = new Date(timestamp);
			if ($.datepick._get(inst, 'showStatus')) {
				var status = ($.datepick._get(inst, 'statusForDate').apply(
					(inst.input ? inst.input[0] : null), [date, inst]) ||
					$.datepick._get(inst, 'initStatus'));
				$('#' + $.datepick._statusId[useTR] + id).html(status);
			}
			if ($.datepick._get(inst, 'onHover'))
				$.datepick._doHover(td, '#' + id, date.getFullYear(), date.getMonth());
		}
	},

	/* Update the datepicker when no longer hovering over a date.
	   @param  td  (element) the current cell
	   @param  id  (string) the ID of the datepicker instance */
	_doMouseOut: function(td, id) {
		var inst = $.datepick._getInst($('#' + id)[0]);
		var useTR = $.datepick._get(inst, 'useThemeRoller') ? 1 : 0;
		$(td).removeClass($.datepick._dayOverClass[useTR]).
			removeClass($.datepick._weekOverClass[useTR]);
		if ($.datepick._get(inst, 'showStatus'))
			$('#' + $.datepick._statusId[useTR] + id).html($.datepick._get(inst, 'initStatus'));
		if ($.datepick._get(inst, 'onHover'))
			$.datepick._doHover(td, '#' + id);
	},

	/* Hover over a particular day.
	   @param  td     (element) the table cell containing the selection
	   @param  id     (string) the ID of the target field
	   @param  year   (number) the year for this day
	   @param  month  (number) the month for this day */
	_doHover: function(td, id, year, month) {
		var inst = this._getInst($(id)[0]);
		var useTR = $.datepick._get(inst, 'useThemeRoller') ? 1 : 0;
		if ($(td).hasClass(this._unselectableClass[useTR]))
			return;
		var onHover = this._get(inst, 'onHover');
		var date = (year ?
			this._daylightSavingAdjust(new Date(year, month, $(td).text())) : null);
		onHover.apply((inst.input ? inst.input[0] : null),
			[(date ? this._formatDate(inst, date) : ''), date, inst]);
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  (element) the input field attached to the date picker or
	                  (event) if triggered by focus */
	_showDatepick: function(input) {
		input = input.target || input;
		if ($.datepick._isDisabledDatepick(input) || $.datepick._lastInput == input) // Already here
			return;
		var inst = $.datepick._getInst(input);
		var beforeShow = $.datepick._get(inst, 'beforeShow');
		var useTR = $.datepick._get(inst, 'useThemeRoller') ? 1 : 0;
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		$.datepick._hideDatepick(null, '');
		$.datepick._lastInput = input;
		$.datepick._setDateFromField(inst);
		if ($.datepick._inDialog) // Hide cursor
			input.value = '';
		if (!$.datepick._pos) { // Position below input
			$.datepick._pos = $.datepick._findPos(input);
			$.datepick._pos[1] += input.offsetHeight; // Add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // Correction for Opera when fixed and scrolled
			$.datepick._pos[0] -= document.documentElement.scrollLeft;
			$.datepick._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepick._pos[0], top: $.datepick._pos[1]};
		$.datepick._pos = null;
		// Determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepick._updateDatepick(inst);
		// Fix width for dynamic number of date pickers
		inst.dpDiv.width($.datepick._getNumberOfMonths(inst)[1] *
			$('.' + $.datepick._oneMonthClass[useTR], inst.dpDiv).width());
		// And adjust position before showing
		offset = $.datepick._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepick._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepick._get(inst, 'showAnim') || 'show';
			var duration = $.datepick._get(inst, 'duration');
			var postProcess = function() {
				$.datepick._datepickerShowing = true;
				var borders = $.datepick._getBorders(inst.dpDiv);
				inst.dpDiv.find('iframe.' + $.datepick._coverClass[useTR]). // IE6- only
					css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepick._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim](duration, postProcess);
			if (duration == '')
				postProcess();
			if (inst.input[0].type != 'hidden')
				inst.input.focus();
			$.datepick._curInst = inst;
		}
	},

	/* Generate the date picker content.
	   @param  inst  (object) the instance settings for this datepicker */
	_updateDatepick: function(inst) {
		var borders = this._getBorders(inst.dpDiv);
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		inst.dpDiv.empty().append(this._generateHTML(inst)).
			find('iframe.' + this._coverClass[useTR]). // IE6- only
			css({left: -borders[0], top: -borders[1],
				width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
		var numMonths = this._getNumberOfMonths(inst);
		if (!inst.inline)
			inst.dpDiv.attr('id', this._mainDivId[useTR]);
		inst.dpDiv.removeClass(this._mainDivClass[1 - useTR]).
			addClass(this._mainDivClass[useTR]).
			removeClass(this._multiClass.join(' ')).
			addClass(numMonths[0] != 1 || numMonths[1] != 1 ? this._multiClass[useTR] : '').
			removeClass(this._rtlClass.join(' ')).
			addClass(this._get(inst, 'isRTL') ? this._rtlClass[useTR] : '');
		if (inst.input && inst.input[0].type != 'hidden' && inst == $.datepick._curInst)
			$(inst.input).focus();
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			var extra = ($.browser.msie ? 1 : 0);
			return {thin: 1 + extra, medium: 3 + extra, thick: 5 + extra}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on the screen.
	   @param  inst     (object) the instance settings for this datepicker
	   @param  offset   (object) the offset of the attached field
	   @param  isFixed  (boolean) true if control or a parent is 'fixed' in position
	   @return  (object) the updated offset for the datepicker */
	_checkOffset: function(inst, offset, isFixed) {
		var alignment = this._get(inst, 'alignment');
		var isRTL = this._get(inst, 'isRTL');
		var pos = inst.input ? this._findPos(inst.input[0]) : null;
		var browserWidth = document.documentElement.clientWidth;
		var browserHeight = document.documentElement.clientHeight;
		if (browserWidth == 0)
			return offset;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var above = pos[1] - (this._inDialog ? 0 : inst.dpDiv.outerHeight()) -
			(isFixed && $.browser.opera ? document.documentElement.scrollTop : 0);
		var below = offset.top;
		var alignL = offset.left;
		var alignR = pos[0] + (inst.input ? inst.input.outerWidth() : 0) - inst.dpDiv.outerWidth() -
			(isFixed && $.browser.opera ? document.documentElement.scrollLeft : 0);
		var tooWide = (offset.left + inst.dpDiv.outerWidth() - scrollX) > browserWidth;
		var tooHigh = (offset.top + inst.dpDiv.outerHeight() - scrollY) > browserHeight;
		if (alignment == 'topLeft') {
			offset = {left: alignL, top: above};
		}
		else if (alignment == 'topRight') {
			offset = {left: alignR, top: above};
		}
		else if (alignment == 'bottomLeft') {
			offset = {left: alignL, top: below};
		}
		else if (alignment == 'bottomRight') {
			offset = {left: alignR, top: below};
		}
		else if (alignment == 'top') {
			offset = {left: (isRTL || tooWide ? alignR : alignL), top: above};
		}
		else { // bottom
			offset = {left: (isRTL || tooWide ? alignR : alignL),
				top: (tooHigh ? above : below)};
		}
		offset.left = Math.max((isFixed ? 0 : scrollX), offset.left - (isFixed ? scrollX : 0));
		offset.top = Math.max((isFixed ? 0 : scrollY), offset.top - (isFixed ? scrollY : 0));
		return offset;
	},

	/* Find an element's position on the screen.
	   @param  elem  (element) the element to check
	   @return  (number[2]) the x- and y-coordinates for the object */
	_findPos: function(elem) {
        while (elem && (elem.type == 'hidden' || elem.nodeType != 1)) {
            elem = elem.nextSibling;
        }
        var position = $(elem).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input     (element) the input field attached to the date picker
	   @param  duration  (string) the duration over which to close the date picker */
	_hideDatepick: function(input, duration) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return false;
		var rangeSelect = this._get(inst, 'rangeSelect');
		if (rangeSelect && inst.stayOpen)
			this._updateInput('#' + inst.id);
		inst.stayOpen = false;
		if (this._datepickerShowing) {
			duration = (duration != null ? duration : this._get(inst, 'duration'));
			var showAnim = this._get(inst, 'showAnim');
			var postProcess = function() {
				$.datepick._tidyDialog(inst);
			};
			if (duration != '' && $.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepick._get(inst, 'showOptions'),
					duration, postProcess);
			else
				inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
			if (duration == '')
				this._tidyDialog(inst);
			var onClose = this._get(inst, 'onClose');
			if (onClose)  // Trigger custom callback
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), this._getDate(inst), inst]);
			this._datepickerShowing = false;
			this._lastInput = null;
			inst.settings.prompt = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				this.dpDiv.removeClass(this._dialogClass[this._get(inst, 'useThemeRoller') ? 1 : 0]);
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
		this._curInst = null;
		return false;
	},

	/* Tidy up after a dialog display.
	   @param  inst  (object) the instance settings for this datepicker */
	_tidyDialog: function(inst) {
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		inst.dpDiv.removeClass(this._dialogClass[useTR]).unbind('.datepick');
		$('.' + this._promptClass[useTR], inst.dpDiv).remove();
	},

	/* Close date picker if clicked elsewhere.
	   @param  event  (MouseEvent) the mouse click to check */
	_checkExternalClick: function(event) {
		if (!$.datepick._curInst)
			return;
		var $target = $(event.target);
		var useTR = $.datepick._get($.datepick._curInst, 'useThemeRoller') ? 1 : 0;
		if (!$target.parents().andSelf().is('#' + $.datepick._mainDivId[useTR]) &&
				!$target.hasClass($.datepick.markerClassName) &&
				!$target.parents().andSelf().hasClass($.datepick._triggerClass[useTR]) &&
				$.datepick._datepickerShowing && !($.datepick._inDialog && $.blockUI))
			$.datepick._hideDatepick(null, '');
	},

	/* Adjust one of the date sub-fields.
	   @param  id      (string) the ID of the target field
	   @param  offset  (number) the amount to change by
	   @param  period  (string) 'D' for days, 'M' for months, 'Y' for years */
	_adjustDate: function(id, offset, period) {
		var inst = this._getInst($(id)[0]);
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // Undo positioning
			period);
		this._updateDatepick(inst);
		return false;
	},

	/* Show the month for today or the current selection.
	   @param  id  (string) the ID of the target field */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.dates[0])
			inst.cursorDate = new Date(inst.dates[0].getTime());
		else
			inst.cursorDate = this._daylightSavingAdjust(new Date());
		inst.drawMonth = inst.cursorDate.getMonth();
		inst.drawYear = inst.cursorDate.getFullYear();
		this._notifyChange(inst);
		this._adjustDate(target);
		return false;
	},

	/* Selecting a new month/year.
	   @param  id      (string) the ID of the target field
	   @param  select  (element) the select being chosen from
	   @param  period  (string) 'M' for month, 'Y' for year */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst.selectingMonthYear = false;
		var value = parseInt(select.options[select.selectedIndex].value, 10);
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] = value;
		inst.cursorDate.setDate(Math.min(inst.cursorDate.getDate(),
			$.datepick._getDaysInMonth(inst.drawYear, inst.drawMonth)));
		inst.cursorDate['set' + (period == 'M' ? 'Month' : 'FullYear')](value);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Restore input focus after not changing month/year.
	   @param  id  (string) the ID of the target field */
	_clickMonthYear: function(id) {
		var inst = this._getInst($(id)[0]);
		if (inst.input && inst.selectingMonthYear && !$.browser.msie)
			inst.input.focus();
		inst.selectingMonthYear = !inst.selectingMonthYear;
	},

	/* Action for changing the first week day.
	   @param  id   (string) the ID of the target field
	   @param  day  (number) the number of the first day, 0 = Sun, 1 = Mon, ... */
	_changeFirstDay: function(id, day) {
		var inst = this._getInst($(id)[0]);
		inst.settings.firstDay = day;
		this._updateDatepick(inst);
		return false;
	},

	/* Select a particular day.
	   @param  td         (element) the table cell containing the selection
	   @param  id         (string) the ID of the target field
	   @param  timestamp  (number) the timestamp for this day */
	_selectDay: function(td, id, timestamp) {
		var inst = this._getInst($(id)[0]);
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		if ($(td).hasClass(this._unselectableClass[useTR]))
			return false;
		var rangeSelect = this._get(inst, 'rangeSelect');
		var multiSelect = this._get(inst, 'multiSelect');
		if (rangeSelect)
			inst.stayOpen = !inst.stayOpen;
		else if (multiSelect)
			inst.stayOpen = true;
		if (inst.stayOpen) {
			$('.datepick td', inst.dpDiv).removeClass(this._selectedClass[useTR]);
			$(td).addClass(this._selectedClass[useTR]);
		}
		inst.cursorDate = this._daylightSavingAdjust(new Date(timestamp));
		var date = new Date(inst.cursorDate.getTime());
		if (rangeSelect && !inst.stayOpen)
			inst.dates[1] = date;
		else if (multiSelect) {
			var pos = -1;
			for (var i = 0; i < inst.dates.length; i++)
				if (inst.dates[i] && date.getTime() == inst.dates[i].getTime()) {
					pos = i;
					break;
				}
			if (pos > -1)
				inst.dates.splice(pos, 1);
			else if (inst.dates.length < multiSelect) {
				if (inst.dates[0])
					inst.dates.push(date);
				else
					inst.dates = [date];
				inst.stayOpen = (inst.dates.length != multiSelect);
			}
		}
		else
			inst.dates = [date];
		this._updateInput(id);
		if (inst.stayOpen)
			this._updateDatepick(inst);
		else if ((rangeSelect || multiSelect) && inst.inline)
			this._updateDatepick(inst);
		return false;
	},

	/* Erase the input field and hide the date picker.
	   @param  id  (string) the ID of the target field */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'mandatory'))
			return false;
		inst.stayOpen = false;
		inst.dates = (this._get(inst, 'showDefault') ?
			[this._getDefaultDate(inst)] : []);
		this._updateInput(target);
		return false;
	},

	/* Update the input field with the selected date.
	   @param  id       (string) the ID of the target field or
	                    (element) the target object */
	_updateInput: function(id) {
		var inst = this._getInst($(id)[0]);
		var dateStr = this._showDate(inst);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null),
				[dateStr, this._getDate(inst), inst]);  // Trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // Fire the change event
		if (inst.inline)
			this._updateDatepick(inst);
		else if (!inst.stayOpen) {
			this._hideDatepick(null, this._get(inst, 'duration'));
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // Restore focus
			this._lastInput = null;
		}
		return false;
	},

	/* Update the input field with the current date(s).
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (string) the formatted date(s) */
	_showDate: function(inst) {
		var dateStr = '';
		if (inst.input) {
			dateStr = (inst.dates.length == 0 ? '' : this._formatDate(inst, inst.dates[0]));
			if (dateStr) {
				if (this._get(inst, 'rangeSelect'))
					dateStr += this._get(inst, 'rangeSeparator') +
						this._formatDate(inst, inst.dates[1] || inst.dates[0]);
				else if (this._get(inst, 'multiSelect'))
					for (var i = 1; i < inst.dates.length; i++)
						dateStr += this._get(inst, 'multiSeparator') +
							this._formatDate(inst, inst.dates[i]);
			}
			inst.input.val(dateStr);
		}
		return dateStr;
	},

	/* Update any alternate field to synchronise with the main field.
	   @param  inst  (object) the instance settings for this datepicker */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // Update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var settings = this._getFormatConfig(inst);
			var dateStr = this.formatDate(altFormat, inst.dates[0], settings);
			if (dateStr && this._get(inst, 'rangeSelect'))
				dateStr += this._get(inst, 'rangeSeparator') + this.formatDate(
					altFormat, inst.dates[1] || inst.dates[0], settings);
			else if (this._get(inst, 'multiSelect'))
				for (var i = 1; i < inst.dates.length; i++)
					dateStr += this._get(inst, 'multiSeparator') +
						this.formatDate(altFormat, inst.dates[i], settings);
			$(altField).val(dateStr);
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  (Date) the date to customise
	   @return  ([boolean, string]) is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		return [(date.getDay() || 7) < 6, ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  (Date) the date to get the week for
	   @return  (number) the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Provide status text for a particular date.
	   @param  date  (Date) the date to get the status for
	   @param  inst  (object) the current datepicker instance
	   @return  (string) the status display text for this date */
	dateStatus: function(date, inst) {
		return $.datepick.formatDate($.datepick._get(inst, 'dateStatus'),
			date, $.datepick._getFormatConfig(inst));
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.
	   @param  format    (string) the expected format of the date
	   @param  value     (string) the date in the above format
	   @param  settings  (object) attributes include:
	                     shortYearCutoff  (number) the cutoff year for determining the century (optional)
	                     dayNamesShort    (string[7]) abbreviated names of the days from Sunday (optional)
	                     dayNames         (string[7]) names of the days from Sunday (optional)
	                     monthNamesShort  (string[12]) abbreviated names of the months (optional)
	                     monthNames       (string[12]) names of the months (optional)
	   @return  (Date) the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		settings = settings || {};
		var shortYearCutoff = settings.shortYearCutoff || this._defaults.shortYearCutoff;
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		var dayNamesShort = settings.dayNamesShort || this._defaults.dayNamesShort;
		var dayNames = settings.dayNames || this._defaults.dayNames;
		var monthNamesShort = settings.monthNamesShort || this._defaults.monthNamesShort;
		var monthNames = settings.monthNames || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			for (var i = 0; i < names.length; i++) {
				if (value.substr(iValue, names[i].length) == names[i]) {
					iValue += names[i].length;
					return i + 1;
				}
			}
			throw 'Unknown name at position ' + iValue;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'w':
						getNumber('w');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (iValue < value.length)
			throw 'Additional text found at end';
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += (shortYearCutoff == -1 ? 1900 : new Date().getFullYear() -
				new Date().getFullYear() % 100 - (year <= shortYearCutoff ? 0 : 100));
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   w  - week of year (no leading zero)
	   ww - week of year (two digit)
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote
	   @param  format    (string) the desired format of the date
	   @param  date      (Date) the date value to format
	   @param  settings  (object) attributes include:
	                     dayNamesShort    (string[7]) abbreviated names of the days from Sunday (optional)
	                     dayNames         (string[7]) names of the days from Sunday (optional)
	                     monthNamesShort  (string[12]) abbreviated names of the months (optional)
	                     monthNames       (string[12]) names of the months (optional)
						 calculateWeek    (function) function that determines week of the year (optional)
	   @return  (string) the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		settings = settings || {};
		var dayNamesShort = settings.dayNamesShort || this._defaults.dayNamesShort;
		var dayNames = settings.dayNames || this._defaults.dayNames;
		var monthNamesShort = settings.monthNamesShort || this._defaults.monthNamesShort;
		var monthNames = settings.monthNames || this._defaults.monthNames;
		var calculateWeek = settings.calculateWeek || this._defaults.calculateWeek;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
							break;
						case 'w':
							output += formatNumber('w', calculateWeek(date), 2);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Get a setting value, defaulting if necessary.
	   @param  inst  (object) the instance settings for this datepicker
	   @param  name  (string) the name of the property
	   @return  (any) the property's value */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker.
	   @param  inst  (object) the instance settings for this datepicker */
	_setDateFromField: function(inst) {
		var dateFormat = this._get(inst, 'dateFormat');
		var rangeSelect = this._get(inst, 'rangeSelect');
		var multiSelect = this._get(inst, 'multiSelect');
		inst.lastVal = (inst.input ? inst.input.val() : '');
		var dates = inst.lastVal;
		dates = (rangeSelect ? dates.split(this._get(inst, 'rangeSeparator')) :
			(multiSelect ? dates.split(this._get(inst, 'multiSeparator')) : [dates]));
		inst.dates = [];
		var settings = this._getFormatConfig(inst);
		for (var i = 0; i < dates.length; i++)
			try {
				inst.dates[i] = this.parseDate(dateFormat, dates[i], settings);
			}
			catch (event) {
				inst.dates[i] = null;
			}
		for (var i = inst.dates.length - 1; i >= 0; i--)
			if (!inst.dates[i])
				inst.dates.splice(i, 1);
		if (rangeSelect && inst.dates.length < 2)
			inst.dates[1] = inst.dates[0];
		if (multiSelect && inst.dates.length > multiSelect)
			inst.dates.splice(multiSelect, inst.dates.length);
		inst.cursorDate = new Date((inst.dates[0] || this._getDefaultDate(inst)).getTime());
		inst.drawMonth = inst.cursorDate.getMonth();
		inst.drawYear = inst.cursorDate.getFullYear();
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (Date) the default date */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one.
	   @param  inst         (object) the instance settings for this datepicker
	   @param  date         (Date or number or string) the date or offset
	   @param  defaultDate  (Date) the date to use if no other supplied
	   @return  (Date) the decoded date */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepick.parseDate($.datepick._get(inst, 'dateFormat'),
					offset, $.datepick._getFormatConfig(inst));
			}
			catch (e) {
				// Ignore
			}
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
			var matches = pattern.exec(offset.toLowerCase());
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd':
						day += parseInt(matches[1], 10); break;
					case 'w':
						day += parseInt(matches[1], 10) * 7; break;
					case 'm':
						month += parseInt(matches[1], 10);
						day = Math.min(day, $.datepick._getDaysInMonth(year, month));
						break;
					case 'y':
						year += parseInt(matches[1], 10);
						day = Math.min(day, $.datepick._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset.toLowerCase());
			}
			return new Date(year, month, day);
		};
		date = (date == null ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) || date == Infinity || date == -Infinity ?
			defaultDate : offsetNumeric(date)) : date)));
		date = (date && (date.toString() == 'Invalid Date' ||
			date.toString() == 'NaN') ? defaultDate : date);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(date);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly.
	   @param  inst     (object) the instance settings for this datepicker
	   @param  date     (Date or Date[] or number or string) the new date or start of a range
	   @param  endDate  (Date or number or string) the end of a range */
	_setDate: function(inst, date, endDate) {
		date = (!date ? [] : (isArray(date) ? date : [date]));
		if (endDate)
			date.push(endDate);
		var clear = (date.length == 0);
		var origMonth = inst.cursorDate.getMonth();
		var origYear = inst.cursorDate.getFullYear();
		inst.dates = [];
		inst.dates[0] = this._restrictMinMax(inst, this._determineDate(inst, date[0], new Date()));
		inst.cursorDate = new Date(inst.dates[0].getTime());
		inst.drawMonth = inst.cursorDate.getMonth();
		inst.drawYear = inst.cursorDate.getFullYear();
		if (this._get(inst, 'rangeSelect'))
			inst.dates[1] = (date.length < 1 ? inst.dates[0] :
				this._restrictMinMax(inst, this._determineDate(inst, date[1], null)));
		else if (this._get(inst, 'multiSelect'))
			for (var i = 1; i < date.length; i++)
				inst.dates[i] = this._restrictMinMax(inst, this._determineDate(inst, date[i], null));
		if (origMonth != inst.cursorDate.getMonth() || origYear != inst.cursorDate.getFullYear())
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		this._showDate(inst);
	},

	/* Retrieve the date(s) directly.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (Date or Date[2] or Date[]) the current date or dates
	            (for a range or multiples) */
	_getDate: function(inst) {
		var startDate = (inst.input && inst.input.val() == '' ? null : inst.dates[0]);
		if (this._get(inst, 'rangeSelect'))
			return (startDate ? [inst.dates[0], inst.dates[1] || inst.dates[0]] : [null, null]);
		else if (this._get(inst, 'multiSelect'))
			return inst.dates.slice(0, inst.dates.length);
		else
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (string) the new HTML for the datepicker */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // Clear time
		var showStatus = this._get(inst, 'showStatus');
		var initStatus = this._get(inst, 'initStatus') || '&#xa0;';
		var isRTL = this._get(inst, 'isRTL');
		var useTR = this._get(inst, 'useThemeRoller') ? 1 : 0;
		// Build the date picker HTML
		var clear = (this._get(inst, 'mandatory') ? '' :
			'<div class="' + this._clearClass[useTR] + '"><a href="javascript:void(0)" ' +
			'onclick="jQuery.datepick._clearDate(\'#' + inst.id + '\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'clearStatus'), initStatus) +
			'>' + this._get(inst, 'clearText') + '</a></div>');
		var controls = '<div class="' + this._controlClass[useTR] + '">' + (isRTL ? '' : clear) +
			'<div class="' + this._closeClass[useTR] + '"><a href="javascript:void(0)" ' +
			'onclick="jQuery.datepick._hideDatepick();"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'closeStatus'), initStatus) +
			'>' + this._get(inst, 'closeText') + '</a></div>' + (isRTL ? clear : '')  + '</div>';
		var prompt = this._get(inst, 'prompt');
		var closeAtTop = this._get(inst, 'closeAtTop');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var showBigPrevNext = this._get(inst, 'showBigPrevNext');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var stepBigMonths = this._get(inst, 'stepBigMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) { // Don't show past maximum unless also restricted by minimum
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		// Controls and links
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prevBigText = (showBigPrevNext ? this._get(inst, 'prevBigText') : '');
		prevBigText = (!navigationAsDateFormat ? prevBigText : this.formatDate(prevBigText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepBigMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = '<div class="' + this._prevClass[useTR] + '">' +
			(this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			(showBigPrevNext ? '<a href="javascript:void(0)" onclick="jQuery.datepick._adjustDate(\'#' +
			inst.id + '\', -' + stepBigMonths + ', \'M\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'prevBigStatus'), initStatus) +
			'>' + prevBigText + '</a>' : '') +
			'<a href="javascript:void(0)" onclick="jQuery.datepick._adjustDate(\'#' +
			inst.id + '\', -' + stepMonths + ', \'M\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'prevStatus'), initStatus) +
			'>' + prevText + '</a>' :
			(hideIfNoPrevNext ? '&#xa0;' : (showBigPrevNext ? '<label>' + prevBigText + '</label>' : '') +
			'<label>' + prevText + '</label>')) + '</div>';
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var nextBigText = (showBigPrevNext ? this._get(inst, 'nextBigText') : '');
		nextBigText = (!navigationAsDateFormat ? nextBigText : this.formatDate(nextBigText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepBigMonths, 1)),
			this._getFormatConfig(inst)));
		var next = '<div class="' + this._nextClass[useTR] + '">' +
			(this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a href="javascript:void(0)" onclick="jQuery.datepick._adjustDate(\'#' +
			inst.id + '\', +' + stepMonths + ', \'M\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'nextStatus'), initStatus) +
			'>' + nextText + '</a>' +
			(showBigPrevNext ? '<a href="javascript:void(0)" onclick="jQuery.datepick._adjustDate(\'#' +
			inst.id + '\', +' + stepBigMonths + ', \'M\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'nextBigStatus'), initStatus) +
			'>' + nextBigText + '</a>' : '') :
			(hideIfNoPrevNext ? '&#xa0;' : '<label>' + nextText + '</label>' +
			(showBigPrevNext ? '<label>' + nextBigText + '</label>' : ''))) + '</div>';
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.dates[0] ? inst.dates[0] : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var html = (closeAtTop && !inst.inline ? controls : '') +
			'<div class="' + this._linksClass[useTR] + '">' + (isRTL ? next : prev) +
			'<div class="' + this._currentClass[useTR] + '">' + (this._isInRange(inst, gotoDate) ?
			'<a href="javascript:void(0)" onclick="jQuery.datepick._gotoToday(\'#' + inst.id + '\');"' +
			this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'currentStatus'), initStatus) + '>' +
			currentText + '</a>' : (hideIfNoPrevNext ? '&#xa0;' : '<label>' + currentText + '</label>')) +
			'</div>' + (isRTL ? prev : next) + '</div>' +
			(prompt ? '<div class="' + this._promptClass[useTR] + '"><span>' +
			prompt + '</span></div>' : '');
		var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var changeFirstDay = this._get(inst, 'changeFirstDay');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var showWeeks = this._get(inst, 'showWeeks');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var weekStatus = this._get(inst, 'weekStatus');
		var status = (showStatus ? this._get(inst, 'dayStatus') || initStatus : '');
		var dateStatus = this._get(inst, 'statusForDate') || this.dateStatus;
		var defaultDate = this._getDefaultDate(inst);
		for (var row = 0; row < numMonths[0]; row++) {
			for (var col = 0; col < numMonths[1]; col++) {
				var cursorDate = this._daylightSavingAdjust(
					new Date(drawYear, drawMonth, inst.cursorDate.getDate()));
				html += '<div class="' + this._oneMonthClass[useTR] +
					(col == 0 && !useTR ? ' ' + this._newRowClass[useTR] : '') + '">' +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					cursorDate, row > 0 || col > 0, useTR, showStatus, initStatus, monthNames) + // Draw month headers
					'<table class="' + this._tableClass[useTR] + '" cellpadding="0" cellspacing="0"><thead>' +
					'<tr class="' + this._tableHeaderClass[useTR] + '">' + (showWeeks ? '<th' +
					this._addStatus(useTR, showStatus, inst.id, weekStatus, initStatus) + '>' +
					this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // Days of the week
					var day = (dow + firstDay) % 7;
					var dayStatus = (!showStatus || !changeFirstDay ? '' :
						status.replace(/DD/, dayNames[day]).replace(/D/, dayNamesShort[day]));
					html += '<th' + ((dow + firstDay + 6) % 7 < 5 ? '' :
						' class="' + this._weekendClass[useTR] + '"') + '>' +
						(!changeFirstDay ? '<span' +
						this._addStatus(useTR, showStatus, inst.id, dayNames[day], initStatus) :
						'<a href="javascript:void(0)" onclick="jQuery.datepick._changeFirstDay(\'#' +
						inst.id + '\', ' + day + ');"' +
						this._addStatus(useTR, showStatus, inst.id, dayStatus, initStatus)) +
						' title="' + dayNames[day] + '">' +
						dayNamesMin[day] + (changeFirstDay ? '</a>' : '</span>') + '</th>';
				}
				html += '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.cursorDate.getFullYear() && drawMonth == inst.cursorDate.getMonth())
					inst.cursorDate.setDate(Math.min(inst.cursorDate.getDate(), daysInMonth));
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // Create datepicker rows
					html += '<tr class="' + this._weekRowClass[useTR] + '">' +
						(showWeeks ? '<td class="' + this._weekColClass[useTR] + '"' +
						this._addStatus(useTR, showStatus, inst.id, weekStatus, initStatus) + '>' +
						calculateWeek(printDate) + '</td>' : '');
					for (var dow = 0; dow < 7; dow++) { // Create datepicker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						var selected = (this._get(inst, 'rangeSelect') && inst.dates[0] &&
							printDate.getTime() >= inst.dates[0].getTime() &&
							printDate.getTime() <= (inst.dates[1] || inst.dates[0]).getTime());
						for (var i = 0; i < inst.dates.length; i++)
							selected = selected || (inst.dates[i] &&
								printDate.getTime() == inst.dates[i].getTime());
						var empty = otherMonth && !showOtherMonths;
						html += '<td class="' + this._dayClass[useTR] +
							((dow + firstDay + 6) % 7 >= 5 ? ' ' + this._weekendClass[useTR] : '') + // Highlight weekends
							(otherMonth ? ' ' + this._otherMonthClass[useTR] : '') + // Highlight days from other months
							((printDate.getTime() == cursorDate.getTime() &&
							drawMonth == inst.cursorDate.getMonth() && inst.keyEvent) || // User pressed key
							(defaultDate.getTime() == printDate.getTime() &&
							defaultDate.getTime() == cursorDate.getTime()) ?
							// Or defaultDate is selected printedDate and defaultDate is cursorDate
							' ' + $.datepick._dayOverClass[useTR] : '') + // Highlight selected day
							(unselectable ? ' ' + this._unselectableClass[useTR] :
							' ' + this._selectableClass[useTR]) +  // Highlight unselectable days
							(empty ? '' : ' ' + daySettings[1] + // Highlight custom dates
							(selected ? ' ' + this._selectedClass[useTR] : '') + // Currently selected
							// Highlight today (if different)
							(printDate.getTime() == today.getTime() ? ' ' + this._todayClass[useTR] : '')) + '"' +
							(!empty && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // Cell title
							(unselectable ? '' : ' onmouseover="' + 'jQuery.datepick._doMouseOver(this,\'' +
							inst.id + '\',' + printDate.getTime() + ')"' +
							' onmouseout="jQuery.datepick._doMouseOut(this,\'' + inst.id + '\')"' +
							' onclick="jQuery.datepick._selectDay(this,\'#' + // Select
							inst.id + '\',' + printDate.getTime() + ')"') + '>' +
							(empty ? '&#xa0;' : // Not showing other months
							(unselectable ? printDate.getDate() : '<a>' + printDate.getDate() + '</a>')) + '</td>';
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					html += '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				html += '</tbody></table></div>';
			}
			if (useTR)
				html += '<div class="' + this._newRowClass[useTR] + '"></div>';
		}
		html += (showStatus ? '<div style="clear: both;"></div><div id="' + this._statusId[useTR] +
			inst.id +'" class="' + this._statusClass[useTR] + '">' + initStatus + '</div>' : '') +
			(!closeAtTop && !inst.inline ? controls : '') +
			'<div style="clear: both;"></div>' +
			($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="' + this._coverClass[useTR] + '"></iframe>' : '');
		inst.keyEvent = false;
		return html;
	},

	/* Generate the month and year header.
	   @param  inst        (object) the instance settings for this datepicker
	   @param  drawMonth   (number) the current month
	   @param  drawYear    (number) the current year
	   @param  minDate     (Date) the minimum allowed date or null if none
	   @param  maxDate     (Date) the maximum allowed date or null if none
	   @param  cursorDate  (Date) the current date position
	   @param  secondary   (boolean) true if not the first month/year header
	   @param  useTR       (number) 1 if applying ThemeRoller styling, 0 if not
	   @param  showStatus  (boolean) true if status bar is visible
	   @param  initStatus  (string) the default status message
	   @param  monthNames  (string[12]) the names of the months
	   @return  (string) the HTML for the month and year */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			cursorDate, secondary, useTR, showStatus, initStatus, monthNames) {
		var minDraw = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1));
		minDate = (minDate < minDraw ? minDate : minDraw);
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="' + this._monthYearClass[useTR] + '">';
		var monthHtml = '';
		// Month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="' + this._monthClass[useTR] + '">' +
				monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="' + this._monthSelectClass[useTR] + '" ' +
				'onchange="jQuery.datepick._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
				'onclick="jQuery.datepick._clickMonthYear(\'#' + inst.id + '\');"' +
				this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'monthStatus'),
				initStatus) + '>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNames[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !changeMonth || !changeYear ? '&#xa0;' : '');
		// Year selection
		if (secondary || !changeYear)
			html += '<span class="' + this._yearClass[useTR] + '">' + drawYear + '</span>';
		else {
			// Determine range of years to display
			var years = this._get(inst, 'yearRange').split(':');
			var year = 0;
			var endYear = 0;
			if (years.length != 2) {
				year = drawYear - 10;
				endYear = drawYear + 10;
			} else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
				year = drawYear + parseInt(years[0], 10);
				endYear = drawYear + parseInt(years[1], 10);
			} else {
				year = parseInt(years[0], 10);
				endYear = parseInt(years[1], 10);
			}
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
			html += '<select class="' + this._yearSelectClass[useTR] + '" ' +
				'onchange="jQuery.datepick._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'onclick="jQuery.datepick._clickMonthYear(\'#' + inst.id + '\');"' +
				this._addStatus(useTR, showStatus, inst.id, this._get(inst, 'yearStatus'),
				initStatus) + '>';
			for (; year <= endYear; year++) {
				html += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
			}
			html += '</select>';
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !changeMonth || !changeYear ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Provide code to set and clear the status panel.
	   @param  useTR       (number) 1 if applying ThemeRoller styling, 0 if not
	   @param  showStatus  (boolean) true if the status bar is shown
	   @param  id          (string) the ID of the datepicker instance
	   @param  text        (string) the status text to display
	   @param  initStatus  (string) the default status message
	   @return  (string) hover actions for the status messages */
	_addStatus: function(useTR, showStatus, id, text, initStatus) {
		return (showStatus ? ' onmouseover="jQuery(\'#' + this._statusId[useTR] + id +
			'\').html(\'' + (text || initStatus) + '\');" ' +
			'onmouseout="jQuery(\'#' + this._statusId[useTR] + id +
			'\').html(\'' + initStatus + '\');"' : '');
	},

	/* Adjust one of the date sub-fields.
	   @param  inst    (object) the instance settings for this datepicker
	   @param  offset  (number) the change to apply
	   @param  period  (string) 'D' for days, 'M' for months, 'Y' for years */
	_adjustInstDate: function(inst, offset, period) {
		var yearMonth = inst.drawYear + '/' + inst.drawMonth;
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.cursorDate.getDate(), this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		inst.cursorDate = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.drawMonth = inst.cursorDate.getMonth();
		inst.drawYear = inst.cursorDate.getFullYear();
		if (yearMonth != inst.drawYear + '/' + inst.drawMonth)
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds.
	   @param  inst  (object) the instance settings for this datepicker
	   @param  date  (Date) the date to check
	   @return  (Date) the restricted date */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? new Date(minDate.getTime()) : date);
		date = (maxDate && date > maxDate ? new Date(maxDate.getTime()) : date);
		return date;
	},

	/* Notify change of month/year.
	   @param  inst  (object) the instance settings for this datepicker */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.cursorDate.getFullYear(), inst.cursorDate.getMonth() + 1,
				this._daylightSavingAdjust(new Date(
				inst.cursorDate.getFullYear(), inst.cursorDate.getMonth(), 1)), inst]);
	},

	/* Determine the number of months to show.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (number[2]) the number of rows and columns to display */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] :
			(typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current minimum/maximum date.
	   Ensure no time components are set. May be overridden for a range.
	   @param  inst        (object) the instance settings for this datepicker
	   @param  minMax      (string) 'min' or 'max' for required date
	   @param  checkRange  (boolean) true to allow override for a range minimum
	   @return  (Date) the minimum/maximum date or null if none */
	_getMinMaxDate: function(inst, minMax, checkRange) {
		var date = this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
		var rangeMin = this._getRangeMin(inst);
		return (checkRange && rangeMin && (!date || rangeMin > date) ? rangeMin : date);
	},

	/* Retrieve the temporary range minimum when in the process of selecting.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (Date) the temporary minimum or null */
	_getRangeMin: function(inst) {
		return (this._get(inst, 'rangeSelect') && inst.dates[0] &&
			!inst.dates[1] ? inst.dates[0] : null);
	},

	/* Find the number of days in a given month.
	   @param  year   (number) the full year
	   @param  month  (number) the month (0 to 11)
	   @return  (number) the number of days in this month */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month.
	   @param  year   (number) the full year
	   @param  month  (number) the month (0 to 11)
	   @return  (number) 0 = Sunday, 1 = Monday, ... */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "prev/next" month display change.
	   @param  inst      (object) the instance settings for this datepicker
	   @param  offset    (number) the number of months to change by
	   @param  curYear   (number) the full current year
	   @param  curMonth  (number) the current month (0 to 11)
	   @return  (boolean) true if prev/next allowed, false if not */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range?
	   @param  inst  (object) the instance settings for this datepicker
	   @param  date  (Date) the date to check
	   @return  (boolean) true if the date is in the allowed minimum/maximum, false if not */
	_isInRange: function(inst, date) {
		// During range selection, use minimum of selected date and range start
		var minDate = this._getRangeMin(inst) || this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
	},

	/* Provide the configuration settings for formatting/parsing.
	   @param  inst  (object) the instance settings for this datepicker
	   @return  (object) the settings subset */
	_getFormatConfig: function(inst) {
		return {shortYearCutoff: this._get(inst, 'shortYearCutoff'),
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display.
	   @param  inst   (object) the instance settings for this datepicker
	   @param  year   (number, optional) the full year
	   @param  month  (number, optional) the month of the year (0 to 11)
	   @param  day    (number, optional) the day of the month
	   @return  (string) formatted date */
	_formatDate: function(inst, year, month, day) {
		if (!year)
			inst.dates[0] = new Date(inst.cursorDate.getTime());
		var date = (year ? (typeof year == 'object' ? year :
			this._daylightSavingAdjust(new Date(year, month, day))) : inst.dates[0]);
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls!
   @param  target  (object) the object to extend
   @param  props   (object) the new settings
   @return  (object) the updated object */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array.
   @param  a  (object) the object to test
   @return  (boolean) true if an array, false if not */
function isArray(a) {
	return (a && a.constructor == Array);
};

/* Invoke the datepicker functionality.
   @param  options  (string) a command, optionally followed by additional parameters or
                    (object) settings for attaching new datepicker functionality
   @return  (jQuery) jQuery object */
$.fn.datepick = function(options){
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' ||
			options == 'getDate' || options == 'settings'))
		return $.datepick['_' + options + 'Datepick'].
			apply($.datepick, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepick['_' + options + 'Datepick'].
			apply($.datepick, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepick['_' + options + 'Datepick'].
				apply($.datepick, [this].concat(otherArgs)) :
			$.datepick._attachDatepick(this, options);
	});
};

$.datepick = new Datepick(); // Singleton instance

$(function() {
	$(document).mousedown($.datepick._checkExternalClick).
		find('body').append($.datepick.dpDiv);
});

})(jQuery);
