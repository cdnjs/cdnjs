/**
* Gumby Checkbox
*/
!function($) {

	'use strict';

	function Checkbox($el) {

		Gumby.debug('Initializing Checkbox', $el);

		this.$el = $el;
		this.$input = this.$el.find('input[type=checkbox]');

		var scope = this;

		// listen for click event and custom gumby check/uncheck events
		this.$el.on(Gumby.click, function(e) {
			// prevent checkbox checking, we'll do that manually
			e.preventDefault();

			// do nothing if checkbox is disabled
            if(scope.$input.is('[disabled]')) {
                return;
            }

			// check/uncheck
			if(scope.$el.hasClass('checked')) {
				scope.update(false);
			} else {
				scope.update(true);
			}
		}).on('gumby.check', function() {
			Gumby.debug('Check event triggered', scope.$el);
			scope.update(true);
		}).on('gumby.uncheck', function() {
			Gumby.debug('Uncheck event triggered', scope.$el);
			scope.update(false);
		});

		// update any prechecked on load
		if(this.$input.prop('checked') || this.$el.hasClass('checked')) {
			scope.update(true);
		}
	}

	// update checkbox, check equals true/false to sepcify check/uncheck
	Checkbox.prototype.update = function(check) {
		var $span = this.$el.find('span');

		// check checkbox - check input, add checked class, append <i>
		if(check) {

			Gumby.debug('Checking Checkbox', this.$el);

			$span.append('<i class="icon-check" />');
			this.$input.prop('checked', true);

			Gumby.debug('Triggering onCheck event', this.$el);
			Gumby.debug('Triggering onChange event', this.$el);

			this.$el.addClass('checked').trigger('gumby.onCheck').trigger('gumby.onChange');

		// uncheck checkbox - uncheck input, remove checked class, remove <i>
		} else {
			
			Gumby.debug('Unchecking Checkbox', this.$el);

			this.$input.prop('checked', false);
			$span.find('i').remove();

			Gumby.debug('Triggering onUncheck event', this.$el);
			Gumby.debug('Triggering onChange event', this.$el);

			this.$el.removeClass('checked').trigger('gumby.onUncheck').trigger('gumby.onChange');
		}
	};

	// add initialisation
	Gumby.addInitalisation('checkbox', function() {
		$('.checkbox').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isCheckbox')) {
				return true;
			}
			// mark element as initialized
			$this.data('isCheckbox', true);
			new Checkbox($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'checkbox',
		events: ['onCheck', 'onUncheck', 'onChange', 'check', 'uncheck'],
		init: function() {
			Gumby.initialize('checkbox');
		}
	});
}(jQuery);
