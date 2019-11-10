/*!
 * Bootstrap-submenu v1.0.4 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2014 vsn4ik
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
 */

'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element, options) {
		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$submenus = this.$menu.parent().find('.dropdown-submenu');

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.toggle.bind(this));
		},
		toggle: function(event) {
			event.stopPropagation();

			var isActive = this.$menu.hasClass('open');

			this.$submenus.removeClass('open');

			if (!isActive) {
				this.$menu.addClass('open');
			}
		}
	};

	$.fn.submenupicker = function(options) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('submenupicker');

			if (!data) {
				new Submenupicker(this, options);

				$this.data('submenupicker', true);
			}
		});
	};
}(jQuery));
