/**
* Gumby jQuery Validation Plugin
*/
!function($) {

	'use strict';

	function Validation($this, req) {

		if(Gumby) {
			Gumby.debug('Initializing Validation', $this);
		}

		// input and holder .field
		this.$this = $this;
		this.$field = this.$this.parents('.field');

		// supplied validation function with default length check
		this.req = req || function() {
			return !!this.$this.val().length;
		};

		// reference to this class
		var scope = this;

		// checkboxes and radio buttons use gumby.onChange event to validate
		if(this.$this.is('[type=checkbox], [type=radio]')) {
			this.$field = this.$this.parent('label');
			this.$field.on('gumby.onChange', function() {
				scope.validate();
			});

		// selects validate on change
		} else if(this.$this.is('select')) {
			this.$field = this.$this.parents('.picker');
			this.$field.on('change', function() {
				scope.validate();
			});

		// others (text input, textarea) use blur
		} else {
			this.$this.on('blur', function(e) {
				// ignore tab
				if(e.which !== 9) {
					scope.validate();
				}
			});
		}
	}

	// validate field
	Validation.prototype.validate = function() {

		var result = this.req(this.$this);

		// failed
		if(!result) {
			this.$field.removeClass('success').addClass('danger');

		// passed
		} else {
		//} else if(this.$field.hasClass('danger')) {
			this.$field.removeClass('danger').addClass('success');
		}

		return result;
	};

	// jQuery plugin definition
	$.fn.validation = function(options) {

		var // extend params with defaults
			settings = $.extend({
				submit : false,
				fail: false,
				required : []
			}, options),
			// store validation objects
			validations = [];

		// init each form plugin is called on
		return this.each(function() {

			// no required fields so plugin is pointless
			if(!settings.required.length) {
				return false;
			}

			var $this = $(this),
				reqLength = settings.required.length,
				i;

			// loop round each required field and instantiate new validation object
			for(i = 0; i < reqLength; i++) {
				validations.push(new Validation(
					$this.find('[name="'+settings.required[i].name+'"]'),
					settings.required[i].validate || false
				));
			}

			// hijack submit event
			$this.on('submit', function(e) {

				// reference to whole form pass/fail
				var failed = false;

				// if no passed attribute found we should halt form submit
				if(!$this.data('passed')) {
					e.preventDefault();

					// loop round validation objects and validate each
					var reqLength = validations.length, i;
					for(i = 0; i < reqLength; i++) {
						if(!validations[i].validate()) {
							failed = true;
						}
					}

					// passed
					if(!failed) {
						// if submit method present call that otherwise submit form
						if(settings.submit && typeof settings.submit === 'function') {
							settings.submit($this.serializeArray());
							return;
						}

						// store passed bool and re-submit
						$this.data('passed', true).submit();

						// failed
						} else {
						// call fail method if present
						if(settings.fail && typeof settings.fail === 'function') {
							settings.fail();
							return;
						}
					}
				}
			});
		});
	};
}(jQuery);
