/*!
 * SmartMenus jQuery Plugin Bootstrap Addon - v0.2.0 - June 1, 2015
 * http://www.smartmenus.org/
 *
 * Copyright 2015 Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function($) {

	// init ondomready
	$(function() {

		// init all navbars that don't have the "data-sm-skip" attribute set
		var $navbars = $('ul.navbar-nav:not([data-sm-skip])');
		$navbars.each(function() {
			var $this = $(this);
			$this.addClass('sm').smartmenus({

					// these are some good default options that should work for all
					// you can, of course, tweak these as you like
					subMenusSubOffsetX: 2,
					subMenusSubOffsetY: -6,
					subIndicators: false,
					collapsibleShowFunction: null,
					collapsibleHideFunction: null,
					rightToLeftSubMenus: $this.hasClass('navbar-right'),
					bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
				})
				.bind({
					// set/unset proper Bootstrap classes for some menu elements
					'show.smapi': function(e, menu) {
						var $menu = $(menu),
							$scrollArrows = $menu.dataSM('scroll-arrows');
						if ($scrollArrows) {
							// they inherit border-color from body, so we can use its background-color too
							$scrollArrows.css('background-color', $(document.body).css('background-color'));
						}
						$menu.parent().addClass('open');
					},
					'hide.smapi': function(e, menu) {
						$(menu).parent().removeClass('open');
					}
				})
				// set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
				.find('a.current').parent().addClass('active');

			// keep Bootstrap's default behavior for parent items when the "data-sm-skip-collapsible-behavior" attribute is set to the ul.navbar-nav
			// i.e. use the whole item area just as a sub menu toggle and don't customize the carets
			var obj = $this.data('smartmenus');
			if ($this.is('[data-sm-skip-collapsible-behavior]')) {
				$this.bind({
					// click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
					'click.smapi': function(e, item) {
						if (obj.isCollapsible()) {
							var $item = $(item),
								$sub = $item.parent().dataSM('sub');
							if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
								obj.itemActivate($item);
								obj.menuHide($sub);
								return false;
							}
						}
					}
				});
			}

			var $carets = $this.find('.caret');

			// onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
			var winW;
			function winResize() {
				var newW = obj.getViewportWidth();
				if (newW != winW) {
					if (obj.isCollapsible()) {
						$this.addClass('sm-collapsible');
						// set "navbar-toggle" class to carets (so they look like a button) if the "data-sm-skip-collapsible-behavior" attribute is not set to the ul.navbar-nav
						if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
							$carets.addClass('navbar-toggle sub-arrow');
						}
					} else {
						$this.removeClass('sm-collapsible');
						if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
							$carets.removeClass('navbar-toggle sub-arrow');
						}
					}
					winW = newW;
				}
			};
			winResize();
			$(window).bind('resize.smartmenus' + obj.rootId, winResize);
		});

	});

	// fix collapsible menu detection for Bootstrap 3
	$.SmartMenus.prototype.isCollapsible = function() {
		return this.$firstLink.parent().css('float') != 'left';
	};

})(jQuery);