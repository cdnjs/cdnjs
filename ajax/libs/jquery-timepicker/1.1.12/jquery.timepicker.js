/************************
jquery-timepicker v1.1.12
http://jonthornton.github.com/jquery-timepicker/

requires jQuery 1.7+
************************/


(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var _baseDate = _generateBaseDate();
	var _ONE_DAY = 86400;
	var _defaults =	{
		className: null,
		minTime: null,
		maxTime: null,
		durationTime: null,
		step: 30,
		showDuration: false,
		timeFormat: 'g:ia',
		scrollDefaultNow: false,
		scrollDefaultTime: false,
		selectOnBlur: false,
		disableTouchKeyboard: true,
		forceRoundTime: false,
		appendTo: 'body',
		disableTimeRanges: [],
		closeOnWindowScroll: false,
		disableTextInput: false
	};
	var _lang = {
		decimal: '.',
		mins: 'mins',
		hr: 'hr',
		hrs: 'hrs'
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);

				// convert dropdowns to text input
				if (self[0].tagName == 'SELECT') {
					var attrs = { 'type': 'text', 'value': self.val() };
					var raw_attrs = self[0].attributes;

					for (var i=0; i < raw_attrs.length; i++) {
						attrs[raw_attrs[i].nodeName] = raw_attrs[i].nodeValue;
					}

					var input = $('<input />', attrs);
					self.replaceWith(input);
					self = input;
				}

				var settings = $.extend({}, _defaults);

				if (options) {
					settings = $.extend(settings, options);
				}

				if (settings.lang) {
					_lang = $.extend(_lang, settings.lang);
				}

				settings = _parseSettings(settings);

				self.data('timepicker-settings', settings);
				self.prop('autocomplete', 'off');
				self.on('click.timepicker focus.timepicker', methods.show);
				self.on('blur.timepicker', _formatValue);
				self.on('keydown.timepicker', _keydownhandler);
				self.on('keyup.timepicker', _keyuphandler);
				self.addClass('ui-timepicker-input');

				_formatValue.call(self.get(0));
			});
		},

		show: function(e)
		{
			var self = $(this);
			var settings = self.data('timepicker-settings');

			if (_hideKeyboard(self)) {
				// block the keyboard on mobile devices
				self.blur();
			}

			var list = self.data('timepicker-list');

			// check if input is readonly
			if (self.prop('readonly')) {
				return;
			}

			// check if list needs to be rendered
			if (!list || list.length === 0 || typeof settings.durationTime === 'function') {
				_render(self);
				list = self.data('timepicker-list');
			}

			if (list.is(':visible')) {
				return;
			}

			// make sure other pickers are hidden
			methods.hide();

			list.show();

			if ((self.offset().top + self.outerHeight(true) + list.outerHeight()) > $(window).height() + $(window).scrollTop()) {
				// position the dropdown on top
				list.offset({
					'left': self.offset().left + parseInt(list.css('marginLeft').replace('px', ''), 10),
					'top': self.offset().top - list.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10)
				});
			} else {
				// put it under the input
				list.offset({
					'left':self.offset().left + parseInt(list.css('marginLeft').replace('px', ''), 10),
					'top': self.offset().top + self.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10)
				});
			}

			// position scrolling
			var selected = list.find('.ui-timepicker-selected');

			if (!selected.length) {
				if (_getTimeValue(self)) {
					selected = _findRow(self, list, _time2int(_getTimeValue(self)));
				} else if (settings.scrollDefaultNow) {
					selected = _findRow(self, list, _time2int(new Date()));
				} else if (settings.scrollDefaultTime !== false) {
					selected = _findRow(self, list, _time2int(settings.scrollDefaultTime));
				}
			}

			if (selected && selected.length) {
				var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
				list.scrollTop(topOffset);
			} else {
				list.scrollTop(0);
			}

			_attachCloseHandler(settings);

			self.trigger('showTimepicker');
		},

		hide: function(e)
		{
			$('.ui-timepicker-wrapper:visible').each(function() {
				var list = $(this);
				var self = list.data('timepicker-input');
				var settings = self.data('timepicker-settings');

				if (settings && settings.selectOnBlur) {
					_selectValue(self);
				}

				list.hide();
				self.trigger('hideTimepicker');
			});
		},

		option: function(key, value)
		{
			var self = this;
			var settings = self.data('timepicker-settings');
			var list = self.data('timepicker-list');

			if (typeof key == 'object') {
				settings = $.extend(settings, key);

			} else if (typeof key == 'string' && typeof value != 'undefined') {
				settings[key] = value;

			} else if (typeof key == 'string') {
				return settings[key];
			}

			settings = _parseSettings(settings);

			self.data('timepicker-settings', settings);

			if (list) {
				list.remove();
				self.data('timepicker-list', false);
			}

			return self;
		},

		getSecondsFromMidnight: function()
		{
			return _time2int(_getTimeValue(this));
		},

		getTime: function()
		{
			var self = this;
			var today = new Date();
			today.setHours(0, 0, 0, 0);
			return new Date(today.valueOf() + (_time2int(_getTimeValue(self))*1000));
		},

		setTime: function(value)
		{
			var self = this;
			var prettyTime = _int2time(_time2int(value), self.data('timepicker-settings').timeFormat);
			_setTimeValue(self, prettyTime);
		},

		remove: function()
		{
			var self = this;

			// check if this element is a timepicker
			if (!self.hasClass('ui-timepicker-input')) {
				return;
			}

			self.removeAttr('autocomplete', 'off');
			self.removeClass('ui-timepicker-input');
			self.removeData('timepicker-settings');
			self.off('.timepicker');

			// timepicker-list won't be present unless the user has interacted with this timepicker
			if (self.data('timepicker-list')) {
				self.data('timepicker-list').remove();
			}

			self.removeData('timepicker-list');
		}
	};

	// private methods

	function _parseSettings(settings)
	{
		if (settings.minTime) {
			settings.minTime = _time2int(settings.minTime);
		}

		if (settings.maxTime) {
			settings.maxTime = _time2int(settings.maxTime);
		}

		if (settings.durationTime && typeof settings.durationTime !== 'function') {
			settings.durationTime = _time2int(settings.durationTime);
		}

		if (settings.disableTimeRanges.length > 0) {
			// convert string times to integers
			for (var i in settings.disableTimeRanges) {
				settings.disableTimeRanges[i] = [
					_time2int(settings.disableTimeRanges[i][0]),
					_time2int(settings.disableTimeRanges[i][1])
				];
			}

			// sort by starting time
			settings.disableTimeRanges = settings.disableTimeRanges.sort(function(a, b){
				return a[0] - b[0];
			});
		}

		return settings;
	}

	function _render(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');

		if (list && list.length) {
			list.remove();
			self.data('timepicker-list', false);
		}

		list = $('<ul />', { 'class': 'ui-timepicker-list' });

		var wrapped_list = $('<div />', { 'class': 'ui-timepicker-wrapper', 'tabindex': -1 });
		wrapped_list.css({'display':'none', 'position': 'absolute' }).append(list);


		if (settings.className) {
			wrapped_list.addClass(settings.className);
		}

		if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
			wrapped_list.addClass('ui-timepicker-with-duration');
		}

		var durStart = settings.minTime;
		if (typeof settings.durationTime === 'function') {
			durStart = _time2int(settings.durationTime());
		} else if (settings.durationTime !== null) {
			durStart = settings.durationTime;
		}
		var start = (settings.minTime !== null) ? settings.minTime : 0;
		var end = (settings.maxTime !== null) ? settings.maxTime : (start + _ONE_DAY - 1);

		if (end <= start) {
			// make sure the end time is greater than start time, otherwise there will be no list to show
			end += _ONE_DAY;
		}

		var dr = settings.disableTimeRanges;
		var drCur = 0;
		var drLen = dr.length;

		for (var i=start; i <= end; i += settings.step*60) {
			var timeInt = i%_ONE_DAY;

			var row = $('<li />');
			row.data('time', timeInt);
			row.text(_int2time(timeInt, settings.timeFormat));

			if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
				var duration = $('<span />');
				duration.addClass('ui-timepicker-duration');
				duration.text(' ('+_int2duration(i - durStart)+')');
				row.append(duration);
			}

			if (drCur < drLen) {
				if (timeInt >= dr[drCur][1]) {
					drCur += 1;
				}

				if (dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1]) {
					row.addClass('ui-timepicker-disabled');
				}
			}

			list.append(row);
		}

		wrapped_list.data('timepicker-input', self);
		self.data('timepicker-list', wrapped_list);

		var appendTo = settings.appendTo;
		if (typeof appendTo === 'string') {
			appendTo = $(appendTo);
		} else if (typeof appendTo === 'function') {
			appendTo = appendTo(self);
		}
		appendTo.append(wrapped_list);
		_setSelected(self, list);

		list.on('click', 'li', function(e) {

			// hack: temporarily disable the focus handler
			// to deal with the fact that IE fires 'focus'
			// events asynchronously
			self.off('focus.timepicker');
			self.on('focus.timepicker-ie-hack', function(){
				self.off('focus.timepicker-ie-hack');
				self.on('focus.timepicker', methods.show);
			});

			if (!_hideKeyboard(self)) {
				self[0].focus();
			}

			// make sure only the clicked row is selected
			list.find('li').removeClass('ui-timepicker-selected');
			$(this).addClass('ui-timepicker-selected');

			if (_selectValue(self)) {
				self.trigger('hideTimepicker');
				wrapped_list.hide();
			}
		});
	}

	function _generateBaseDate()
	{
		return new Date(1970, 1, 1, 0, 0, 0);
	}

	function _attachCloseHandler(settings)
	{
		if ('ontouchstart' in document) {
			$('body').on('touchstart.ui-timepicker', _closeHandler);
		} else {
			$('body').on('mousedown.ui-timepicker', _closeHandler);
			if (settings.closeOnWindowScroll) {
				$(window).on('scroll.ui-timepicker', _closeHandler);
			}
		}
	}

	// event handler to decide whether to close timepicker
	function _closeHandler(e)
	{
		var target = $(e.target);
		var input = target.closest('.ui-timepicker-input');
		if (input.length === 0 && target.closest('.ui-timepicker-wrapper').length === 0) {
			methods.hide();
			$('body').unbind('.ui-timepicker');
			$(window).unbind('.ui-timepicker');
		}
	}

	function _hideKeyboard(self)
	{
		var settings = self.data('settings');
		return ((window.navigator.msPointerEnabled || 'ontouchstart' in document) && settings.disableTouchKeyboard);
	}

	function _findRow(self, list, value)
	{
		if (!value && value !== 0) {
			return false;
		}

		var settings = self.data('timepicker-settings');
		var out = false;
		var halfStep = settings.step*30;

		// loop through the menu items
		list.find('li').each(function(i, obj) {
			var jObj = $(obj);

			var offset = jObj.data('time') - value;

			// check if the value is less than half a step from each row
			if (Math.abs(offset) < halfStep || offset == halfStep) {
				out = jObj;
				return false;
			}
		});

		return out;
	}

	function _setSelected(self, list)
	{
		list.find('li').removeClass('ui-timepicker-selected');

		var timeValue = _time2int(_getTimeValue(self));
		if (!timeValue) {
			return;
		}

		var selected = _findRow(self, list, timeValue);
		if (selected) {

			var topDelta = selected.offset().top - list.offset().top;

			if (topDelta + selected.outerHeight() > list.outerHeight() || topDelta < 0) {
				list.scrollTop(list.scrollTop() + selected.position().top - selected.outerHeight());
			}

			selected.addClass('ui-timepicker-selected');
		}
	}


	function _formatValue()
	{
		if (this.value === '') {
			return;
		}

		var self = $(this);
		var list = self.data('timepicker-list');

		if (list && list.is(':visible')) {
			return;
		}

		var seconds = _time2int(this.value);

		if (seconds === null) {
			self.trigger('timeFormatError');
			return;
		}

		var settings = self.data('timepicker-settings');

		// check that the time in within bounds
		if (settings.minTime !== null && seconds < settings.minTime) {
			self.trigger('timeRangeError');
		} else if (settings.maxTime !== null && seconds > settings.maxTime) {
			self.trigger('timeRangeError');
		}

		// check that time isn't within disabled time ranges
		$.each(settings.disableTimeRanges, function(){
			if (seconds >= this[0] && seconds < this[1]) {
				self.trigger('timeRangeError');
				return false;
			}
		});

		if (settings.forceRoundTime) {
			var offset = seconds % (settings.step*60); // step is in minutes

			if (offset >= settings.step*30) {
				// if offset is larger than a half step, round up
				seconds += (settings.step*60) - offset;
			} else {
				// round down
				seconds -= offset;
			}
		}

		var prettyTime = _int2time(seconds, settings.timeFormat);
		_setTimeValue(self, prettyTime);
	}

	function _getTimeValue(self)
	{
		if (self.is('input')) {
			return self.val();
		} else {
			// use the element's data attributes to store values
			return self.data('ui-timepicker-value');
		}
	}

	function _setTimeValue(self, value)
	{
		if (self.is('input')) {
			self.val(value);
		} else {
			// use the element's data attributes to store values
			self.data('ui-timepicker-value', value);
		}
	}

	/*
	*  Keyboard navigation via arrow keys
	*/
	function _keydownhandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !list.is(':visible')) {
			if (e.keyCode == 40) {
				if (!_hideKeyboard(self)) {
					self.focus();
				}
			} else {
				return _screenInput(e, self);
			}
		}

		switch (e.keyCode) {

			case 13: // return
				if (_selectValue(self)) {
					methods.hide.apply(this);
				}

				e.preventDefault();
				return false;

			case 38: // up
				var selected = list.find('.ui-timepicker-selected');

				if (!selected.length) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});
					selected.addClass('ui-timepicker-selected');

				} else if (!selected.is(':first-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.prev().addClass('ui-timepicker-selected');

					if (selected.prev().position().top < selected.outerHeight()) {
						list.scrollTop(list.scrollTop() - selected.outerHeight());
					}
				}

				return false;

			case 40: // down
				selected = list.find('.ui-timepicker-selected');

				if (selected.length === 0) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});

					selected.addClass('ui-timepicker-selected');
				} else if (!selected.is(':last-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.next().addClass('ui-timepicker-selected');

					if (selected.next().position().top + 2*selected.outerHeight() > list.outerHeight()) {
						list.scrollTop(list.scrollTop() + selected.outerHeight());
					}
				}

				return false;

			case 27: // escape
				list.find('li').removeClass('ui-timepicker-selected');
				methods.hide();
				break;

			case 9: //tab
				methods.hide();
				break;

			default:
				return _screenInput(e, self);
		}
	}

	function _screenInput(e, self)
	{
		return !self.data('timepicker-settings').disableTextInput || e.ctrlKey || e.altKey || e.metaKey || (e.keyCode != 2 && e.keyCode < 46);
	}

	/*
	*	Time typeahead
	*/
	function _keyuphandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !list.is(':visible')) {
			return true;
		}

		switch (e.keyCode) {

			case 96: // numpad numerals
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 48: // numerals
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 65: // a
			case 77: // m
			case 80: // p
			case 186: // colon
			case 8: // backspace
			case 46: // delete
				_setSelected(self, list);
				break;

			default:
				// list.find('li').removeClass('ui-timepicker-selected');
				return;
		}
	}

	function _selectValue(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');
		var timeValue = null;

		var cursor = list.find('.ui-timepicker-selected');

		if (cursor.hasClass('ui-timepicker-disabled')) {
			return false;
		}

		if (cursor.length) {
			// selected value found
			timeValue = cursor.data('time');

		} else if (_getTimeValue(self)) {

			// no selected value; fall back on input value
			timeValue = _time2int(_getTimeValue(self));

			_setSelected(self, list);
		}

		if (timeValue !== null) {
			var timeString = _int2time(timeValue, settings.timeFormat);
			_setTimeValue(self, timeString);
		}

		self.trigger('change').trigger('changeTime');
		return true;
	}

	function _int2duration(seconds)
	{
		var minutes = Math.round(seconds/60);
		var duration;

		if (Math.abs(minutes) < 60) {
			duration = [minutes, _lang.mins];
		} else if (minutes == 60) {
			duration = ['1', _lang.hr];
		} else {
			var hours = (minutes/60).toFixed(1);
			if (_lang.decimal != '.') hours = hours.replace('.', _lang.decimal);
			duration = [hours, _lang.hrs];
		}

		return duration.join(' ');
	}

	function _int2time(seconds, format)
	{
		if (seconds === null) {
			return;
		}

		var time = new Date(_baseDate.valueOf() + (seconds*1000));
		var output = '';
		var hour, code;

		for (var i=0; i<format.length; i++) {

			code = format.charAt(i);
			switch (code) {

				case 'a':
					output += (time.getHours() > 11) ? 'pm' : 'am';
					break;

				case 'A':
					output += (time.getHours() > 11) ? 'PM' : 'AM';
					break;

				case 'g':
					hour = time.getHours() % 12;
					output += (hour === 0) ? '12' : hour;
					break;

				case 'G':
					output += time.getHours();
					break;

				case 'h':
					hour = time.getHours() % 12;

					if (hour !== 0 && hour < 10) {
						hour = '0'+hour;
					}

					output += (hour === 0) ? '12' : hour;
					break;

				case 'H':
					hour = time.getHours();
					output += (hour > 9) ? hour : '0'+hour;
					break;

				case 'i':
					var minutes = time.getMinutes();
					output += (minutes > 9) ? minutes : '0'+minutes;
					break;

				case 's':
					seconds = time.getSeconds();
					output += (seconds > 9) ? seconds : '0'+seconds;
					break;

				default:
					output += code;
			}
		}

		return output;
	}

	function _time2int(timeString)
	{
		if (timeString === '') return null;
		if (!timeString || timeString+0 == timeString) return timeString;

		if (typeof(timeString) == 'object') {
			timeString = timeString.getHours()+':'+_pad2(timeString.getMinutes())+':'+_pad2(timeString.getSeconds());
		}

		timeString = timeString.toLowerCase();

		var d = new Date(0);
		var time;

		// try to parse time input
		if (timeString.indexOf(":") === -1) {
			// no colon present
			time = timeString.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/);

			if (!time) {
				time = timeString.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/);
			}
		} else {
			time = timeString.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/);
		}

		if (!time) {
			return null;
		}

		var hour = parseInt(time[1]*1, 10);
		var hours;

		if (time[4]) {
			if (hour == 12) {
				hours = (time[4] == 'p') ? 12 : 0;
			} else {
				hours = (hour + (time[4] == 'p' ? 12 : 0));
			}

		} else {
			hours = hour;
		}

		var minutes = ( time[2]*1 || 0 );
		var seconds = ( time[3]*1 || 0 );
		return hours*3600 + minutes*60 + seconds;
	}

	function _pad2(n) {
		return ("0" + n).slice(-2);
	}

	// Plugin entry
	$.fn.timepicker = function(method)
	{
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.timepicker"); }
	};
}));
