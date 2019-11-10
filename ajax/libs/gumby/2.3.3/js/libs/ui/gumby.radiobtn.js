/**
* Gumby RadioBtn
*/
!function() {

	'use strict';

	function RadioBtn($el) {

		this.$el = $el;
		var scope = this;

		// listen for click event and custom gumby check event
		this.$el.on(Gumby.click, function(e) {
			scope.click(e);
		}).on('gumby.check', function() {
			scope.update();
		});

		// update any .checked checkboxes on load
		if(scope.$el.hasClass('checked')) {
			scope.update();
		}
	}

	// handle radio button click event
	RadioBtn.prototype.click = function(e) {

		// element responsible for event trigger
		var $target = $(e.target);

		// prevent propagation
		e.stopPropagation();

		// prevent radio button checking, we'll do that manually
		e.preventDefault();

		// check radio button
		this.update();
	};

	// check radio button, uncheck all others in name group
	RadioBtn.prototype.update = function() {
		var // this specific radio button
			$input = this.$el.find('input[type=radio]'),
			$span = this.$el.find('span'),
			// the group of radio buttons
			group = 'input[name="'+$input.attr('name')+'"]';

		// uncheck radio buttons in same group - uncheck input, remove checked class, remove <i>
		$('.radio').has(group).removeClass('checked')
				.find('input').prop('checked', false).end()
				.find('i').remove();

		// check this radio button - check input, add checked class, append <i>
		$input.prop('checked', true);
		$span.append('<i class="icon-dot" />');
		this.$el.addClass('checked').trigger('gumby.onChange');
	};

	// add initialisation
	Gumby.addInitalisation('radiobtns', function() {
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
			Gumby.initialize('radiobtns');
		}
	});
}();
