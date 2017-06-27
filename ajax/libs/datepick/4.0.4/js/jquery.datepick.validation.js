/* http://keith-wood.name/datepick.html
   Datepicker Validation extension for jQuery 4.0.4.
   Requires Jörn Zaefferer's Validation plugin (http://plugins.jquery.com/project/validate).
   Written by Keith Wood (kbwood{at}iinet.com.au).
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide the namespace

/* Add validation methods if validation plugin available. */
if ($.fn.validate) {

	$.datepick.selectDateOrig = $.datepick.selectDate;
	
	$.extend($.datepick.regional[''], {
		validateDate: 'Please enter a valid date',
		validateDateMin: 'Please enter a date on or after {0}',
		validateDateMax: 'Please enter a date on or before {0}',
		validateDateMinMax: 'Please enter a date between {0} and {1}'
	});
	
	$.extend($.datepick._defaults, $.datepick.regional['']);

	$.extend($.datepick, {

		/* Trigger a validation after updating the input field with the selected date.
		   @param  target  (element) the control to examine
		   @param  elem    (element) the selected datepicker element */
		selectDate: function(target, elem) {
			this.selectDateOrig(target, elem);
			var inst = $.data(target, $.datepick.dataName);
			if (!inst.inline && $.fn.validate) {
				var validation = $(target).parents('form').validate();
				if (validation) {
					validation.element('#' + target.id);
				}
			}
		},

		/* Correct error placement for validation errors - after any trigger.
		   @param  error    (jQuery) the error message
		   @param  element  (jQuery) the field in error */
		errorPlacement: function(error, element) {
			var inst = $.data(element[0], $.datepick.dataName);
			if (inst) {
				error[inst.get('isRTL') ? 'insertBefore' : 'insertAfter'](
					inst.trigger.length > 0 ? inst.trigger : element);
			}
			else {
				error.insertAfter(element);
			}
		},

		/* Format a validation error message involving dates.
		   @param  source  (string) the error message
		   @param  params  (Date[]) the dates
		   @return  (string) the formatted message */
		errorFormat: function(source, params) {
			var format = ($.datepick.curInst ?
				$.datepick.curInst.get('dateFormat') :
				$.datepick._defaults.dateFormat);
			$.each(params, function(index, value) {
				source = source.replace(new RegExp('\\{' + index + '\\}', 'g'),
					$.datepick.formatDate(format, value) || 'nothing');
			});
			return source;
		}
	});

	/* Apply a validation test to each date provided.
	   @param  value    (string) the current field value
	   @param  element  (element) the field control
	   @return  (boolean) true if OK, false if failed validation */
	function validateEach(value, element) {
		var inst = $.data(element, $.datepick.dataName);
		var rangeSelect = inst.get('rangeSelect');
		var multiSelect = inst.get('multiSelect');
		var dates = (multiSelect ? value.split(inst.get('multiSeparator')) :
			(rangeSelect ? value.split(inst.get('rangeSeparator')) : [value]));
		var ok = (multiSelect && dates.length <= multiSelect) ||
			(!multiSelect && rangeSelect && dates.length == 2) ||
			(!multiSelect && !rangeSelect && dates.length == 1);
		if (ok) {
			try {
				var dateFormat = inst.get('dateFormat');
				var dp = $(element);
				$.each(dates, function(i, v) {
					dates[i] = $.datepick.parseDate(dateFormat, v);
					ok = ok && (!dates[i] || dp.datepick('isSelectable', dates[i]));
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
			return this.optional(element) || validateEach(value, element);
		}, function(params) {
			return $.datepick._defaults.validateDate;
		});

	/* Validate format and against a minimum date. */
	$.validator.addMethod('dpMinDate', function(value, element, params) {
			var inst = $.data(element, $.datepick.dataName);
			params[0] = inst.get('minDate');
			return this.optional(element) || validateEach(value, element);
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMin, params);
		});

	/* Validate format and against a maximum date. */
	$.validator.addMethod('dpMaxDate', function(value, element, params) {
			var inst = $.data(element, $.datepick.dataName);
			params[0] = inst.get('maxDate');
			return this.optional(element) || validateEach(value, element);
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMax, params);
		});

	/* Validate format and against minimum/maximum dates. */
	$.validator.addMethod('dpMinMaxDate', function(value, element, params) {
			var inst = $.data(element, $.datepick.dataName);
			params[0] = inst.get('minDate');
			params[1] = inst.get('maxDate');
			return this.optional(element) || validateEach(value, element);
		}, function(params) {
			return $.datepick.errorFormat($.datepick._defaults.validateDateMinMax, params);
		});
}

})(jQuery);
