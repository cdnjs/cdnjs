/**
* Gumby Checkbox
*/
!function() {

	'use strict';

	function Checkbox($el) {

		this.$el = $el;
		var scope = this;

		// listen for click event and custom gumby check/uncheck events
		this.$el.on(Gumby.click, function(e) {
			scope.click(e);
		}).on('gumby.check', function() {
			scope.update(true);
		}).on('gumby.uncheck', function() {
			scope.update(false);
		});

		// update any .checked checkboxes on load
		if(scope.$el.hasClass('checked')) {
			scope.update(true);
		}
	}

	// handle checkbox click event
	Checkbox.prototype.click = function(e) {

		// element responsible for event trigger
		var $target = $(e.target);

		// prevent propagation
		e.stopPropagation();

		// prevent checkbox checking, we'll do that manually
		e.preventDefault();

		// check/uncheck
		if(this.$el.hasClass('checked')) {
			this.update(false);
		} else {
			this.update(true);
		}
	};

	// update checkbox, check equals true/false to sepcify check/uncheck
	Checkbox.prototype.update = function(check) {

		var $input = this.$el.find('input'),
			$span = this.$el.find('span');

		// check checkbox - check input, add checked class, append <i>
		if(check) {

			$span.append('<i class="icon-check" />');

			$input.prop('checked', true).end()
				.addClass('checked')
				.trigger('gumby.onCheck').trigger('gumby.onChange');

		// uncheck checkbox - uncheck input, remove checked class, remove <i>
		} else {
			$input.prop('checked', false).end()
				.find('i').remove().end()
				.removeClass('checked').trigger('gumby.onUncheck').trigger('gumby.onChange');
		}
	};

	// add initialisation
	Gumby.addInitalisation('checkboxes', function() {
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
			Gumby.initialize('checkboxes');
		}
	});
}();
