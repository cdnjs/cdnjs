/**
* Gumby Navbar
*/
!function() {

	'use strict';

	// define module class and init only if we're on touch devices
	if(!Modernizr.touch) {
		return;
	}

	function Navbar($el) {
		this.$el = $el;
		var scope = this;

		// when navbar items are tapped hide/show dropdowns
		this.$el.find('li').on(Gumby.click, function(e) {
			var $this = $(this);

			e.stopPropagation();

			// prevent jump to top of page
			if(this.href === '#') {
				e.preventDefault();
			}

			scope.dropdown($this);
		});
	}

	// hide/show dropdowns
	Navbar.prototype.dropdown = function($this) {
		// we have dropdowns so open/cose
		if($this.children('.dropdown').length) {
			if($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
		// no dropdown so close others
		} else {
			this.$items.removeClass('active');
		}
	};

	// add initialisation
	Gumby.addInitalisation('navbars', function() {
		$('.navbar').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isNavbar')) {
				return true;
			}
			// mark element as initialized
			$this.data('isNavbar', true);
			new Navbar($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'navbar',
		events: [],
		init: function() {
			Gumby.initialize('navbars');
		}
	});
}();
