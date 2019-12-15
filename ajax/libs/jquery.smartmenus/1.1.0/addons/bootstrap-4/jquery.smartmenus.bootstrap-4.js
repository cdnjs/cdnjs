/*!
 * SmartMenus jQuery Plugin Bootstrap 4 Addon - v0.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'smartmenus'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	$.extend($.SmartMenus.Bootstrap = {}, {
		keydownFix: false,
		init: function() {
			// init all navbars that don't have the "data-sm-skip" attribute set
			var $navbars = $('ul.navbar-nav:not([data-sm-skip])');
			$navbars.each(function() {
				var $this = $(this),
					obj = $this.data('smartmenus');
				// if this navbar is not initialized
				if (!obj) {
					var skipBehavior = $this.is('[data-sm-skip-collapsible-behavior]'),
						rightAligned = $this.hasClass('ml-auto') || $this.prevAll('.mr-auto').length > 0;

					$this.smartmenus({
							// these are some good default options that should work for all
							subMenusSubOffsetX: 2,
							subMenusSubOffsetY: -9,
							subIndicators: !skipBehavior,
							collapsibleShowFunction: null,
							collapsibleHideFunction: null,
							rightToLeftSubMenus: rightAligned,
							bottomToTopSubMenus: $this.closest('.fixed-bottom').length > 0,
							// custom option(s) for the Bootstrap 4 addon
							bootstrapHighlightClasses: 'text-dark bg-light'
						})
						.on({
							// set/unset proper Bootstrap classes for some menu elements
							'show.smapi': function(e, menu) {
								var $menu = $(menu),
									$scrollArrows = $menu.dataSM('scroll-arrows');
								if ($scrollArrows) {
									$scrollArrows.css('background-color', $menu.css('background-color'));
								}
								$menu.parent().addClass('show');
								if (obj.opts.keepHighlighted && $menu.dataSM('level') > 2) {
									$menu.prevAll('a').addClass(obj.opts.bootstrapHighlightClasses);
								}
							},
							'hide.smapi': function(e, menu) {
								var $menu = $(menu);
								$menu.parent().removeClass('show');
								if (obj.opts.keepHighlighted && $menu.dataSM('level') > 2) {
									$menu.prevAll('a').removeClass(obj.opts.bootstrapHighlightClasses);
								}
							}
						});

					obj = $this.data('smartmenus');

					function onInit() {
						// set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
						$this.find('a.current').each(function() {
							var $this = $(this);
							// dropdown items require the class to be set to the A's while for nav items it should be set to the parent LI's
							($this.hasClass('dropdown-item') ? $this : $this.parent()).addClass('active');
						});
						// parent items fixes
						$this.find('a.has-submenu').each(function() {
							var $this = $(this);
							// remove Bootstrap required attributes that might cause conflicting issues with the SmartMenus script
							if ($this.is('[data-toggle="dropdown"]')) {
								$this.dataSM('bs-data-toggle-dropdown', true).removeAttr('data-toggle');
							}
							// remove Bootstrap's carets generating class
							if (!skipBehavior && $this.hasClass('dropdown-toggle')) {
								$this.dataSM('bs-dropdown-toggle', true).removeClass('dropdown-toggle');
							}
						});
					}

					onInit();

					function onBeforeDestroy() {
						$this.find('a.current').each(function() {
							var $this = $(this);
							($this.hasClass('active') ? $this : $this.parent()).removeClass('active');
						});
						$this.find('a.has-submenu').each(function() {
							var $this = $(this);
							if ($this.dataSM('bs-dropdown-toggle')) {
								$this.addClass('dropdown-toggle').removeDataSM('bs-dropdown-toggle');
							}
							if ($this.dataSM('bs-data-toggle-dropdown')) {
								$this.attr('data-toggle', 'dropdown').removeDataSM('bs-data-toggle-dropdown');
							}
						});
					}

					// custom "refresh" method for Bootstrap
					obj.refresh = function() {
						$.SmartMenus.prototype.refresh.call(this);
						onInit();
						// update collapsible detection
						detectCollapsible(true);
					};

					// custom "destroy" method for Bootstrap
					obj.destroy = function(refresh) {
						onBeforeDestroy();
						$.SmartMenus.prototype.destroy.call(this, refresh);
					};

					// keep Bootstrap's default behavior (i.e. use the whole item area just as a sub menu toggle)
					if (skipBehavior) {
						obj.opts.collapsibleBehavior = 'toggle';
					}

					// onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
					var winW;
					function detectCollapsible(force) {
						var newW = obj.getViewportWidth();
						if (newW != winW || force) {
							if (obj.isCollapsible()) {
								$this.addClass('sm-collapsible');
							} else {
								$this.removeClass('sm-collapsible');
							}
							winW = newW;
						}
					}
					detectCollapsible();
					$(window).on('resize.smartmenus' + obj.rootId, detectCollapsible);
				}
			});
			// keydown fix for Bootstrap 4 conflict
			if ($navbars.length && !$.SmartMenus.Bootstrap.keydownFix) {
				// unhook BS keydown handler for all dropdowns
				$(document).off('keydown.bs.dropdown.data-api', '.dropdown-menu');
				// restore BS keydown handler for dropdowns that are not inside SmartMenus navbars
				// SmartMenus won't add the "show" class so it's handy here
				if ($.fn.dropdown && $.fn.dropdown.Constructor) {
					$(document).on('keydown.bs.dropdown.data-api', '.dropdown-menu.show', $.fn.dropdown.Constructor._dataApiKeydownHandler);
				}
				$.SmartMenus.Bootstrap.keydownFix = true;
			}
		}
	});

	// init ondomready
	$($.SmartMenus.Bootstrap.init);

	return $;
}));
