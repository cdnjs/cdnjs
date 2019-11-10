/**
* Gumby Navbar
*/
!function($) {

	'use strict';

	// define and init module on touch enabled devices only
	if(!Gumby.gumbyTouch) {
		return;
	}

	function Navbar($el) {

		Gumby.debug('Initializing Navbar', $el);

		this.$el = $el;
		this.$dropDowns = this.$el.find('li:has(.dropdown)');
		var scope = this;

		// when navbar items
		this.$dropDowns
		// are tapped hide/show dropdowns
		.on(Gumby.click, this.toggleDropdown)
		// are swiped right open link
		.on('swiperight', this.openLink);

		// if there's a link set
		if(this.$dropDowns.children('a').attr('href') !== '#') {
			// append an icon
			this.$dropDowns.children('a').append('<i class="icon-popup"></i>').children('i')
			// and bind to click event to open link
			.on(Gumby.click, this.openLink);
		}

		// override with childlinks
		this.$dropDowns.find('.dropdown li:not(:has(.dropdown)) a[href]').on(Gumby.click, this.openLink);

		// on mousemove and touchstart toggle modernizr classes and disable/enable this module
		// workaround for Pixel and other multi input devices
		$(window).on('mousemove touchstart', function(e) {
			e.stopImmediatePropagation();
			if(e.type === 'mousemove') {
				scope.$dropDowns.on('mouseover mouseout', scope.toggleDropdown);
			}
		});
	}

	Navbar.prototype.toggleDropdown = function(e) {
		// prevent click from triggering here too
		e.stopImmediatePropagation();
		e.preventDefault();

		var $this = $(this);

		if($this.hasClass('active')) {
			$this.removeClass('active');
		} else {
			$this.addClass('active');
		}
	};

	// handle opening list item link 
	Navbar.prototype.openLink = function(e) {
		e.stopImmediatePropagation();
		e.preventDefault();

		var $this = $(this),
			$el = $this, href;

		// tapped icon
		if($this.is('i')) {
			$el = $this.parent('a');
		// swiped li
		} else if($this.is('li')) {
			$el = $this.children('a');
		}

		href = $el.attr('href');

		// open in new window
		if($el.attr('target') == 'blank') {
			window.open(href);
		// regular relocation
		} else {
			window.location = href;
		}
	};

	// add initialisation
	Gumby.addInitalisation('navbar', function() {
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
			Gumby.initialize('navbar');
		}
	});
}(jQuery);
