/**
* Gumby Tabs
*/
!function($) {

	'use strict';

	function Tabs($el) {

		Gumby.debug('Initializing Tabs', $el);

		this.$el = $el;
		this.$nav = this.$el.find('ul.tab-nav > li');
		this.$content = this.$el.find('.tab-content');

		var scope = this;

		// listen for click event on tab nav and custom gumby set event
		this.$nav.children('a').on(Gumby.click, function(e) {
			e.preventDefault();
			scope.click($(this));
		});

		// listen for gumby.set value for dynamically set tabs
		this.$el.on('gumby.set', function(e, index) {
			Gumby.debug('Set event triggered', scope.$el);
			scope.set(e, index);
		});
	}

	// handle tab nav click event
	Tabs.prototype.click = function($this) {
		// index of item to activate
		var index = $this.parent().index();

		if(this.$nav.eq(index).add(this.$content.eq(index)).hasClass('active')) {
			return;
		}

		Gumby.debug('Setting active tab to '+index, this.$el);

		// deactivate other tab navigation and content
		this.$nav.add(this.$content).removeClass('active');

		// activate this tab nav link and content
		this.$nav.eq(index).add(this.$content.eq(index)).addClass('active');

		// trigger gumby.change event and pass current active tab index
		Gumby.debug('Triggering onChange event', this.$el);
		this.$el.trigger('gumby.onChange', index);
	};

	// set specific tab
	Tabs.prototype.set = function(e, index) {
		this.$nav.eq(index).find('a').trigger(Gumby.click);
	};

	// add initialisation
	Gumby.addInitalisation('tabs', function() {
		$('.tabs').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isTabs')) {
				return true;
			}
			// mark element as initialized
			$this.data('isTabs', true);
			new Tabs($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'tabs',
		events: ['onChange', 'set'],
		init: function() {
			Gumby.initialize('tabs');
		}
	});
}(jQuery);
