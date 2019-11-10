/* http://keith-wood.name/datepick.html
   Datepicker Validation extension for jQuery 3.7.0.
   Requires Jörn Zaefferer's Validation plugin (http://plugins.jquery.com/project/validate).
   Written by Keith Wood (kbwood{at}iinet.com.au).
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the authors if you use it. */

(function($) { // Hide the namespace

/* Add validation methods if validation plugin available. */
if ($.fn.validate) {

	$.datepick._selectDate2 = $.datepick._selectDate;
	
	$.extend($.datepick.regional[''], {
		validateDate: 'Please enter a valid date',
		validateDateMin: 'Please enter a date on or after {0}',
		validateDateMax: 'Please enter a date on or before {0}',
		validateDateMinMax: 'Please enter a date between {0} and {1}'
	});
	
	$.extend($.datepick._defaults, $.datepick.regional['']);

	$.extend($.datepick, {

		/* Trigger a validation after updating the input field with the selected date.
		   @param  id       (string) the ID of the target field
		   @param  dateStr  (string) the chosen date */
		_selectDate: function(id, dateStr) {
			this._selectDate2(id, dateStr);
			var inst = this._getInst($(id)[0]);
			if (!inst.inline && $.fn.validate)
				$(id).parents('form').validate().element(id);
		},

		/* Correct error placement for validation errors - after any trigger.
		   @param  error    (jQuery) the error message
		   @param  element  (jQuery) the field in error */
		errorPlacement: function(error, element) {
			var trigger = element.next('.' + $.datepick._triggerClass);
			error.insertAfter(trigger.length > 0 ? trigger : element);
		},

		/* Format a validation error message involving dates.
		   @param  source  (string) the error message
		   @param  params  (Date[]) the dates
		   @return  (string) the formatted message */
		errorFormat: function(source, params) {
			var format = ($.datepick._curInst ?
				$.datepick._get($.datepick._curInst, 'dateFormat') :
				$.datepick._defaults.dateFormat);
			$.each(params, function(i, v) {
				source = source.replace(new RegExp('\\{' + i + '\\}', 'g'),
					$.datepick.formatDate(format, v) || 'nothing');
			});
			return source;
		}
	});

	/* Apply a validation test to each date provided.
	   @param  value    (string) the current field value
	   @param  element  (element) the field control
	   @param  test     (function) the validation to apply
	   @return  (boolean) true if OK, false if failed validation */
	function validateEach(value, element, test) {
		var inst = $.datepick._getInst(element);
		var rangeSelect = $.datepick._get(inst, 'rangeSelect');
		var multiSelect = $.datepick._get(inst, 'multiSelect');
		var dates = (rangeSelect ? value.split($.datepick._get(inst, 'rangeSeparator')) :
			multiSelect ? value.split($.datepick._get(inst, 'multiSeparator')) : [value]);
		var ok = (rangeSelect && dates.length == 2) ||
			(multiSelect && dates.length <= multiSelect) ||
			(!rangeSelect && !multiSelect && dates.length == 1);
		if (ok) {
			try {
				var dateFormat = $.datepick._get(inst, 'dateFormat');
				var config = $.datepick._getFormatConfig(inst);
				$.each(dates, function(i, v) {
					dates[i] = $.datepick.parseDate(dateFormat, v, config);
					ok = ok && test(dates[i]);
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

	/* Validate basic date format. */
	$.validator.addMethod('dpDate', function(value, element) {
			return this.optional(element) ||
				validateEach(value, element, function(date) { return true; });
		}, function(params) {
			return $.datepick._defaults.validateDate;
		});

	/* Validate format and against a minimum date. */
	$.validator.addMethod('dpMinDate', function(value, element, params) {
			var inst = $.datepick._getInst(element);
			params[0] = $.datepick._determineDate(inst, $.datepick._get(inst, 'minDate'), null);
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || !params[0] || date >= params[0]);
				});
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMin, params);
		});

	/* Validate format and against a maximum date. */
	$.validator.addMethod('dpMaxDate', function(value, element, params) {
			var inst = $.datepick._getInst(element);
			params[0] = $.datepick._determineDate(inst, $.datepick._get(inst, 'maxDate'), null);
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || !params[0] || date <= params[0]);
				});
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMax, params);
		});

	/* Validate format and against minimum/maximum dates. */
	$.validator.addMethod('dpMinMaxDate', function(value, element, params) {
			var inst = $.datepick._getInst(element);
			params[0] = $.datepick._determineDate(inst, $.datepick._get(inst, 'minDate'), null);
			params[1] = $.datepick._determineDate(inst, $.datepick._get(inst, 'maxDate'), null);
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || ((!params[0] || date >= params[0]) &&
						(!params[1] || date <= params[1])));
				});
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMinMax, params);
		});
}

})(jQuery);
