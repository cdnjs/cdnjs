/*!
 * Bootstrap-submenu v1.1.5 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2014 vsn4ik
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
 */

'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element) {
		var desc = ':not(.disabled, .divider, .dropdown-header):first';

		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$submenus = this.$menu.parent().find('.dropdown-submenu').not(this.$menu);
		this.$prev = this.$menu.prevAll(desc).children('a');
		this.$next = this.$menu.nextAll(desc).children('a');

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.click.bind(this));
			this.$element.keydown(this.keydown.bind(this));
		},
		click: function(event) {
			event.stopPropagation();

			this.toggle();
		},
		toggle: function() {
			this.$menu.toggleClass('open');
			this.$submenus.removeClass('open');
		},
		keydown: function(event) {
			// 13: Return, 32: Spacebar
			// 38: Arrow up, 40: Arrow down

			// Off vertical scrolling
			if (/^(32|38|40)$/.test(event.keyCode)) {
				event.preventDefault();
			}

			if (/^(13|32)$/.test(event.keyCode)) {
				this.toggle();
			}
			else if (/^(38|40)$/.test(event.keyCode)) {
				event.stopPropagation();

				if (event.keyCode == 38) {
					this.$prev.focus();
				}
				else if (event.keyCode == 40) {
					this.$next.focus();
				}
			}
		}
	};

	$.fn.submenupicker = function() {
		return this.each(function() {
			var data = $.data(this, 'bs.submenu');

			if (!data) {
				new Submenupicker(this);

				$.data(this, 'bs.submenu', true);
			}
		});
	};
}(jQuery));
