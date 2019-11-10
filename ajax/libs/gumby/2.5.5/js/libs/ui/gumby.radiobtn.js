/**
* Gumby RadioBtn
*/
!function($) {

	'use strict';

	function RadioBtn($el) {

		Gumby.debug('Initializing Radio Button', $el);

		this.$el = $el;
		this.$input = this.$el.find('input[type=radio]');

		var scope = this;

		// listen for click event and custom gumby check event
		this.$el.on(Gumby.click, function(e) {
			// prevent propagation
			e.stopImmediatePropagation();

			// prevent radio button checking, we'll do that manually
			e.preventDefault();

			// do nothing if radio is disabled
            if (scope.$input.is('[disabled]')) {
                return;
            }

			// check radio button
			scope.update();
		}).on('gumby.check', function() {
			Gumby.debug('Check event triggered', scope.$el);
			scope.update();
		});

		// update any prechecked on load
		if(this.$input.prop('checked') || this.$el.hasClass('checked')) {
			scope.update(true);
		}
	}

	// check radio button, uncheck all others in name group
	RadioBtn.prototype.update = function() {

		// already checked so no need to update
		if(this.$el.hasClass('checked') && this.$input.prop('checked') && this.$el.find('i.icon-dot').length) {
			return;
		}

		Gumby.debug('Updating Radio Button group', this.$el);

		var $span = this.$el.find('span'),
			// the group of radio buttons
			group = 'input[name="'+this.$input.attr('name')+'"]';

		// uncheck radio buttons in same group - uncheck input, remove checked class, remove <i>
		$('.radio').has(group).removeClass('checked')
				.find('input').prop('checked', false).end()
				.find('i').remove();

		// check this radio button - check input, add checked class, append <i>
		this.$input.prop('checked', true);
		$span.append('<i class="icon-dot" />');

		Gumby.debug('Triggering onCheck event', this.$el);

		this.$el.addClass('checked').trigger('gumby.onCheck');
	};

	// add initialisation
	Gumby.addInitalisation('radiobtn', function() {
		$('.radio').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isRadioBtn')) {
				return true;
			}
			// mark element as initialized
			$this.data('isRadioBtn', true);
			new RadioBtn($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'radiobtn',
		events: ['onChange', 'check'],
		init: function() {
			Gumby.initialize('radiobtn');
		}
	});
}(jQuery);
