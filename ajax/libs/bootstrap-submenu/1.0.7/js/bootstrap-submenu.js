/*!
 * Bootstrap-submenu v1.0.7 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2014 vsn4ik
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
 */

'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element) {
		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$submenus = this.$menu.parent().find('.dropdown-submenu');

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.toggle.bind(this));
		},
		toggle: function() {
			event.stopPropagation();

			var isActive = this.$menu.hasClass('open');

			this.$submenus.removeClass('open');

			if (!isActive) {
				this.$menu.addClass('open');
			}
		}
	};

	$.fn.submenupicker = function() {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.submenu');

			if (!data) {
				new Submenupicker(this);

				$this.data('bs.submenu', true);
			}
		});
	};
}(jQuery));
