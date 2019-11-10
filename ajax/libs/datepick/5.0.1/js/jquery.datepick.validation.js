/* http://keith-wood.name/datepick.html
   Datepicker Validation extension for jQuery 5.0.1.
   Requires Jörn Zaefferer's Validation plugin (http://plugins.jquery.com/project/validate).
   Written by Keith Wood (kbwood{at}iinet.com.au).
   Licensed under the MIT (http://keith-wood.name/licence.html) licence. 
   Please attribute the author if you use it. */

(function($) { // Hide the namespace

	// Add validation methods if validation plugin available.
	if ($.fn.validate) {

		$.datepick.selectDateOrig = $.datepick.selectDate;
		
		$.extend($.datepick.regionalOptions[''], {
			validateDate: 'Please enter a valid date',
			validateDateMin: 'Please enter a date on or after {0}',
			validateDateMax: 'Please enter a date on or before {0}',
			validateDateMinMax: 'Please enter a date between {0} and {1}',
			validateDateCompare: 'Please enter a date {0} {1}',
			validateDateToday: 'today',
			validateDateOther: 'the other date',
			validateDateEQ: 'equal to',
			validateDateNE: 'not equal to',
			validateDateLT: 'before',
			validateDateGT: 'after',
			validateDateLE: 'not after',
			validateDateGE: 'not before'
		});
		
		$.extend($.datepick.defaultOptions, $.datepick.regionalOptions['']);

		$.extend($.datepick, {

			/** Trigger a validation after updating the input field with the selected date.
				@param elem {Element} The control to examine.
				@param target {Element} The selected datepicker element. */
			selectDate: function(elem, target) {
				this.selectDateOrig(elem, target);
				var inst = this._getInst(elem);
				if (!inst.inline && $.fn.validate) {
					var validation = $(elem).parents('form').validate();
					if (validation) {
						validation.element('#' + elem.id);
					}
				}
			},

			/** Correct error placement for validation errors - after any trigger.
				@param error {jQuery} The error message.
				@param element {jQuery} The field in error. */
			errorPlacement: function(error, element) {
				var inst = $.datepick._getInst(element);
				if (!$.isEmptyObject(inst)) {
					error[inst.get('isRTL') ? 'insertBefore' : 'insertAfter'](
						inst.trigger.length > 0 ? inst.trigger : element);
				}
				else {
					error.insertAfter(element);
				}
			},

			/** Format a validation error message involving dates.
				@param source {string} The error message.
				@param params {Date[]} The dates.
				@return {string} The formatted message. */
			errorFormat: function(source, params) {
				var format = ($.datepick.curInst ?
					$.datepick.curInst.get('dateFormat') :
					$.datepick.defaultOptions.dateFormat);
				$.each(params, function(index, value) {
					source = source.replace(new RegExp('\\{' + index + '\\}', 'g'),
						$.datepick.formatDate(format, value) || 'nothing');
				});
				return source;
			}
		});

		var lastElement = null;

		/** Validate date field. */
		$.validator.addMethod('dpDate', function(value, element) {
				lastElement = element;
				return this.optional(element) || validateEach(value, element);
			},
			function(params) {
				var inst = $.datepick._getInst(lastElement);
				var minDate = inst.get('minDate');
				var maxDate = inst.get('maxDate');
				var messages = $.datepick.defaultOptions;
				return (minDate && maxDate ?
					$.datepick.errorFormat(messages.validateDateMinMax, [minDate, maxDate]) :
					(minDate ? $.datepick.errorFormat(messages.validateDateMin, [minDate]) :
					(maxDate ? $.datepick.errorFormat(messages.validateDateMax, [maxDate]) :
					messages.validateDate)));
			});

		/** Apply a validation test to each date provided.
			@private
			@param value {string} The current field value.
			@param element {Element} The field control.
			@return {boolean} True if OK, false if failed validation. */
		function validateEach(value, element) {
			var inst = $.datepick._getInst(element);
			var rangeSelect = inst.get('rangeSelect');
			var multiSelect = inst.get('multiSelect');
			var dates = (multiSelect ? value.split(inst.get('multiSeparator')) :
				(rangeSelect ? value.split(inst.get('rangeSeparator')) : [value]));
			var ok = (multiSelect && dates.length <= multiSelect) ||
				(!multiSelect && rangeSelect && dates.length === 2) ||
				(!multiSelect && !rangeSelect && dates.length === 1);
			if (ok) {
				try {
					var dateFormat = inst.get('dateFormat');
					var minDate = inst.get('minDate');
					var maxDate = inst.get('maxDate');
					var dp = $(element);
					$.each(dates, function(i, v) {
						dates[i] = $.datepick.parseDate(dateFormat, v);
						ok = ok && (!dates[i] || (dp.datepick('isSelectable', dates[i]) && 
							(!minDate || dates[i].getTime() >= minDate.getTime()) &&
							(!maxDate || dates[i].getTime() <= maxDate.getTime())));
					});
				}
				catch (e) {
					ok = false;
				}
			}
			if (ok && rangeSelect) {
				ok = (dates[0].getTime() <= dates[1].getTime());
			}
			return ok;
		}

		/* And allow as a class rule. */
		$.validator.addClassRules('dpDate', {dpDate: true});

		var comparisons = {equal: 'eq', same: 'eq', notEqual: 'ne', notSame: 'ne',
			lessThan: 'lt', before: 'lt', greaterThan: 'gt', after: 'gt',
			notLessThan: 'ge', notBefore: 'ge', notGreaterThan: 'le', notAfter: 'le'};

		/** Cross-validate date fields.
			<code>params</code> should be an array with [0] comparison type eq/ne/lt/gt/le/ge or synonyms,
			[1] 'today' or date string or Date or other field selector/element/jQuery OR
			an object with one attribute with name eq/ne/lt/gt/le/ge or synonyms
			and value 'today' or date string or Date or other field selector/element/jQuery OR
			a string with eq/ne/lt/gt/le/ge or synonyms followed by 'today' or date string or jQuery selector */
		$.validator.addMethod('dpCompareDate', function(value, element, params) {
				if (this.optional(element)) {
					return true;
				}
				params = normaliseParams(params);
				var thisDate = $(element).datepick('getDate');
				var thatDate = extractOtherDate(element, params[1]);
				if (thisDate.length === 0 || thatDate.length === 0) {
					return true;
				}
				lastElement = element;
				var finalResult = true;
				for (var i = 0; i < thisDate.length; i++) {
					switch (comparisons[params[0]] || params[0]) {
						case 'eq': finalResult = (thisDate[i].getTime() === thatDate[0].getTime()); break;
						case 'ne': finalResult = (thisDate[i].getTime() !== thatDate[0].getTime()); break;
						case 'lt': finalResult = (thisDate[i].getTime() < thatDate[0].getTime()); break;
						case 'gt': finalResult = (thisDate[i].getTime() > thatDate[0].getTime()); break;
						case 'le': finalResult = (thisDate[i].getTime() <= thatDate[0].getTime()); break;
						case 'ge': finalResult = (thisDate[i].getTime() >= thatDate[0].getTime()); break;
						default:   finalResult = true;
					}
					if (!finalResult) {
						break;
					}
				}
				return finalResult;
			},
			function(params) {
				var messages = $.datepick.defaultOptions;
				var inst = $.datepick._getInst(lastElement);
				params = normaliseParams(params);
				var thatDate = extractOtherDate(lastElement, params[1], true);
				thatDate = (params[1] === 'today' ? messages.validateDateToday : (thatDate.length ?
					$.datepick.formatDate(inst.get('dateFormat'), thatDate[0], inst.getConfig()) :
					messages.validateDateOther));
				return messages.validateDateCompare.replace(/\{0\}/,
					messages['validateDate' + (comparisons[params[0]] || params[0]).toUpperCase()]).
					replace(/\{1\}/, thatDate);
			});

		/** Normalise the comparison parameters to an array.
			@private
			@param params {array|object|string} The original parameters.
			@return {array} The normalised parameters. */
		function normaliseParams(params) {
			if (typeof params === 'string') {
				params = params.split(' ');
			}
			else if (!$.isArray(params)) {
				var opts = [];
				for (var name in params) {
					opts[0] = name;
					opts[1] = params[name];
				}
				params = opts;
			}
			return params;
		}

		/** Determine the comparison date.
			@private
			@param element {Element} The current datepicker element.
			@param source {string|Date|jQuery|Element} The source of the other date.
			@param noOther {boolean} True to not get the date from another field.
			@return {Date[1]} The date for comparison. */
		function extractOtherDate(element, source, noOther) {
			if (source.constructor === Date) {
				return [source];
			}
			var inst = $.datepick._getInst(element);
			var thatDate = null;
			try {
				if (typeof source === 'string' && source !== 'today') {
					thatDate = $.datepick.parseDate(inst.get('dateFormat'), source, inst.getConfig());
				}
			}
			catch (e) {
				// Ignore
			}
			thatDate = (thatDate ? [thatDate] : (source === 'today' ?
				[$.datepick.today()] : (noOther ? [] : $(source).datepick('getDate'))));
			return thatDate;
		}
	}

})(jQuery);
