/*! http://keith-wood.name/datepick.html
	Datepicker Validation extension for jQuery 5.1.1.
	Requires Jörn Zaefferer's Validation plugin (http://plugins.jquery.com/project/validate).
	Written by Keith Wood (wood.keith{at}optusnet.com.au).
	Licensed under the MIT (http://keith-wood.name/licence.html) licence. 
	Please attribute the author if you use it. */

(function($) { // Hide the namespace
	'use strict';

	/** Apply a validation test to each date provided.
		@private
		@param {string} value The current field value.
		@param {Element} element The field control.
		@return {boolean} <code>true</code> if OK, <code>false</code> if failed validation. */
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

	/** Normalise the comparison parameters to an array.
		@private
		@param {array|object|string} params The original parameters.
		@return {array} The normalised parameters. */
	function normaliseParams(params) {
		if (typeof params === 'string') {
			params = params.split(' ');
		}
		else if (!$.isArray(params)) {
			var opts = [];
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					opts[0] = key;
					opts[1] = params[key];
				}
			}
			params = opts;
		}
		return params;
	}

	/** Determine the comparison date.
		@private
		@param {Element} element The current datepicker element.
		@param {string|Date|jQuery|Element} source The source of the other date.
		@param {boolean} noOther <code>true</code> to not get the date from another field.
		@return {Date[]} The date for comparison. */
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

	// Add validation methods if validation plugin available.
	if ($.fn.validate) {

		$.datepick.selectDateOrig = $.datepick.selectDate;

		/** Validation extensions to the {@linkcode module:Datepick|Datepick} plugin.
			@module Datepick-valext */

		/** Localisations for the validation messages.
			Entries are objects indexed by the language code ('' being the default US/English).
			@name regionalOptions
			@property {string} [validateDate='Please enter a valid date'] Basic validation error message.
			@property {string} [validateDateMin='Please enter a date on or after {0}'] Minimum date validation message.
			@property {string} [validateDateMax='Please enter a date on or before {0}'] Maximum date validation message.
			@property {string} [validateDateMinMax='Please enter a date between {0} and {1}']
						Date range validation message.
			@property {string} [validateDateCompare='Please enter a date {0} {1}'] Date comparison validation message.
			@property {string} [validateDateToday='today'] Compare with today.
			@property {string} [validateDateOther='the other date'] Compare with another date.
			@property {string} [validateDateEQ='equal to'] Equals operator.
			@property {string} [validateDateNE='not equal to'] Not equals operator.
			@property {string} [validateDateLT='before'] Prior to operator.
			@property {string} [validateDateGT='after'] Following operator.
			@property {string} [validateDateLE='not after'] Not prior to operator.
			@property {string} [validateDateGE='not before'] Not following operator. */
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
				This function extends the {@linkcode module:Datepick~selectDate|existing one}. 
				@param {Element} elem The control to examine.
				@param {Element} target The selected datepicker element.
				@example $(selector).datepick('selectDate', $('div.datepick-popup a:contains(10)')[0]) */
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
				@param {jQuery} error The error message.
				@param {jQuery} element The field in error.
				@example $('form').validate({
  ...,
  errorPlacement: $.datepick.errorPlacement
}) */
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
				@param {string} source The error message, which may include substitution points, '{0}', '{1}', etc.
				@param {Date[]} params The dates, which are formatted with the current
						{@linkcode module:Datepick~regionalOptions|dateFormat} before being inserted
						into the message at the indexed substitution point.
				@return {string} The formatted message. 
				@example $.datepick.errorFormat(messages.validateDateMinMax, [minDate, maxDate]) */
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

		/** Extensions to jQuery Validation for the {@linkcode module:Datepick|Datepick} plugin.
			@module Datepick-validation */
			
		/** Validate a date field.
			Apply all the validations applicable from the datepicker,
			i.e. minimum and maximum allowed dates and individual date selectability.
			The start and end dates in a date range, and all dates in a multi-select datepicker are va	lidated.
			@name dpDate
			@example rules: {
  fieldName1: 'dpDate',
  fieldName2: {
    required: true,
    dpDate: true
  }
} */
		$.validator.addMethod('dpDate', function(value, element) {
				lastElement = element;
				return this.optional(element) || validateEach(value, element);
			},
			function() {
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

		/* And allow as a class rule. */
		$.validator.addClassRules('dpDate', {dpDate: true});

		var comparisons = {equal: 'eq', same: 'eq', notEqual: 'ne', notSame: 'ne',
			lessThan: 'lt', before: 'lt', greaterThan: 'gt', after: 'gt',
			notLessThan: 'ge', notBefore: 'ge', notGreaterThan: 'le', notAfter: 'le'};

		/** Cross-validate date fields.
			The parameters for this rule should be an array with
			<ul>
			<li>[0] being the comparison type: 'eq' ('equal', 'same'), 'ne' ('notEqual', 'notSame'),
			'lt' ('lessThan', 'before'), 'gt' ('greaterThan', 'after'),
			'le' ('notGreaterThan', 'notAfter'), 'ge' ('notLessThan', 'notBefore')</li>
			<li>[1] being 'today' or a date string in the current {@linkcode module:Datepick~regionalOptions|dateFormat}
			or a <code>Date</code> or another field selector/element/jQuery</li>
			</ul>
			<p>OR an object with one attribute with a name of the comparison to apply -
			'eq', 'ne', 'lt', 'gt', 'le', 'ge' or synonyms -
			and a value of 'today' or a date string or a <code>Date</code> or another field selector/element/jQuery</p>
			<p>OR a string with 'eq', 'ne', 'lt', 'gt', 'le', 'ge' or synonyms followed by 'today'
			or a date string in the current {@linkcode module:Datepick~regionalOptions|dateFormat}
			or a jQuery selector</p>
			@name dpCompareDate
			@example rules: {
  validBeforePicker: {
    dpCompareDate: ['before', '#validAfterPicker']
  },
  validAfterPicker: {
    dpCompareDate: {after: '#validBeforePicker'}
  },
  validTodayPicker: {
    dpCompareDate: 'ne today'
  },
  validSpecificPicker: {
    dpCompareDate: 'notBefore 01/01/2012'
  }
} */
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
						case 'eq':
							finalResult = (thisDate[i].getTime() === thatDate[0].getTime());
							break;
						case 'ne':
							finalResult = (thisDate[i].getTime() !== thatDate[0].getTime());
							break;
						case 'lt':
							finalResult = (thisDate[i].getTime() < thatDate[0].getTime());
							break;
						case 'gt':
							finalResult = (thisDate[i].getTime() > thatDate[0].getTime());
							break;
						case 'le':
							finalResult = (thisDate[i].getTime() <= thatDate[0].getTime());
							break;
						case 'ge':
							finalResult = (thisDate[i].getTime() >= thatDate[0].getTime());
							break;
						default:
							finalResult = true;
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
	}

})(jQuery);
