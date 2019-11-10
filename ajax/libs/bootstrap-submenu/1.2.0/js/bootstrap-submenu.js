/*!
 * Bootstrap-submenu v1.2.0 (http://vsn4ik.github.io/bootstrap-submenu)
 * Copyright 2014 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
 */

'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element) {
		var fake = ':not(.disabled, .divider, .dropdown-header)';
		var desc = fake + ':first';

		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$dropdown = this.$menu.parent().parent();
		this.$menus = this.$menu.siblings('.dropdown-submenu');
		this.$prev = this.$menu.prevAll(desc).children('a');
		this.$next = this.$menu.nextAll(desc).children('a');

		var $children = this.$menu.find('> .dropdown-menu > ' + fake);

		this.$children = $children.filter('.dropdown-submenu');
		this.$items = $children.not('.dropdown-submenu');

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.click.bind(this));
			this.$element.keydown(this.keydown.bind(this));
			this.$menu.on('hide.bs.submenu', this.hide.bind(this));
			this.$next.keydown(this.next_keydown.bind(this));
			this.$items.keydown(this.item_keydown.bind(this));
		},
		click: function(event) {
			event.stopPropagation();

			this.toggle();
		},
		toggle: function() {
			if (this.$menu.hasClass('open')) {
				this.close();
			}
			else {
				this.$menu.addClass('open');
				this.$menus.trigger('hide.bs.submenu');
			}
		},
		hide: function(event) {
			// Stop event bubbling
			event.stopPropagation();

			this.close();
		},
		close: function() {
			this.$menu.removeClass('open');
			this.$children.trigger('hide.bs.submenu');
		},
		keydown: function(event) {
			// 13: Return, 27: Esc, 32: Spacebar
			// 38: Arrow up, 40: Arrow down

			// Off vertical scrolling
			if (/^(32|38|40)$/.test(event.keyCode)) {
				event.preventDefault();
			}

			if (/^(13|32)$/.test(event.keyCode)) {
				this.toggle();
			}
			else if (/^(27|38|40)$/.test(event.keyCode)) {
				event.stopPropagation();

				if (event.keyCode == 27) {
					if (this.$menu.hasClass('open')) {
						this.close();
					}
					else {
						this.$menus.trigger('hide.bs.submenu');
						this.$dropdown.removeClass('open').children('a').focus();
					}
				}
				else if (event.keyCode == 38) {
					this.$prev.focus();
				}
				else if (event.keyCode == 40) {
					this.$next.focus();
				}
			}
		},
		next_keydown: function(event) {
			// 38: Arrow up

			if (event.keyCode != 38) {
				return;
			}

			// Off vertical scrolling
			event.preventDefault();

			event.stopPropagation();

			this.$element.focus();
		},
		item_keydown: function(event) {
			// 27: Esc

			if (event.keyCode != 27) {
				return;
			}

			event.stopPropagation();

			this.close();
			this.$element.focus();
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
