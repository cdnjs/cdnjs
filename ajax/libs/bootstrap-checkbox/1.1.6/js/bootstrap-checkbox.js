/*!
 * Bootstrap-checkbox v1.1.6 (http://vsn4ik.github.io/bootstrap-checkbox)
 * Copyright 2013-2014 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-checkbox/blob/master/LICENSE)
 */

'use strict';

(function(factory) {
	if (typeof define == 'function' && define.amd) {
		// AMD. Register as an anonymous module depending on jQuery
		define(['jquery'], factory);
	}
	else {
		// No AMD. Register plugin with global jQuery object
		factory(jQuery);
	}
})(function($) {
	function Checkboxpicker(element, options) {
		this.element = element;
		this.$element = $(element);

		this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, this.$element.data());

		if (this.$element.closest('label').length) {
			console.warn(this.options.warningMessage);

			return;
		}

		this.$group = $('<div class="btn-group">');

		// .btn-group-justified works with <a> elements as the <button> doesn't pick up the styles
		this.$buttons = $('<a><a>').addClass('btn');

		// === '': <... data-reverse>
		var reverse = this.options.reverse || this.options.reverse === '';

		this.$off = this.$buttons.eq(reverse ? 1 : 0);
		this.$on = this.$buttons.eq(reverse ? 0 : 1);

		this.init();
	}

	Checkboxpicker.prototype = {
		init: function() {
			this.$element.prop('hidden', true);

			if (this.options.offLabel) {
				this.$off.html(this.options.offLabel);
			}

			if (this.options.onLabel) {
				this.$on.html(this.options.onLabel);
			}

			if (this.options.offIconClass) {
				this.$off.prepend('<span class="' + this.options.offIconClass + '"></span>');
			}

			if (this.options.onIconClass) {
				this.$on.prepend('<span class="' + this.options.onIconClass + '"></span>');
			}

			if (this.element.checked) {
				this.$on.addClass('active ' + this.options.onClass);
				this.$off.addClass(this.options.defaultClass);
			}
			else {
				this.$off.addClass('active ' + this.options.offClass);
				this.$on.addClass(this.options.defaultClass);
			}

			if (this.options.style) {
				this.$group.addClass(this.options.style);
			}

			// Attribute title (offTitle, onTitle) on this.$buttons not work (native) if this.element.disabled
			if (this.element.title) {
				this.$group.attr('title', this.element.title);
			}
			else if (!this.element.disabled) {
				if (this.options.offTitle) {
					this.$off.attr('title', this.options.offTitle);
				}

				if (this.options.onTitle) {
					this.$on.attr('title', this.options.onTitle);
				}
			}

			if (this.element.disabled) {
				this.$buttons.addClass('disabled');
				this.$group.css('cursor', 'not-allowed');
			}
			else {
				this.$buttons.click(this.click.bind(this));
				this.$element.change(this.toggle.bind(this));
				this.$group.attr('tabindex', this.element.tabIndex).keydown(this.keydown.bind(this));

				if (this.element.autofocus) {
					this.$group.focus();
				}

				if (this.element.id) {
					$('label[for="' + this.element.id + '"]').click(this.focus.bind(this));
				}

				$(this.element.form).on('reset', this.reset.bind(this));
			}

			this.$group.append(this.$buttons).insertAfter(this.element);
		},
		toggle: function() {
			// this.$group not focus (incorrect on form reset)
			this.$buttons.toggleClass('active ' + this.options.defaultClass);
			this.$off.toggleClass(this.options.offClass);
			this.$on.toggleClass(this.options.onClass);
		},
		focus: function() {
			// Original behavior
			this.$group.focus();
		},
		change: function() {
			this.$element.prop('checked', !this.element.checked).change();
		},
		click: function(event) {
			if (!$(event.target).hasClass('active')) {
				this.change();
			}
		},
		keydown: function(event) {
			// 13: Return, 32: Spacebar

			// Off vertical scrolling
			if (event.keyCode == 32) {
				event.preventDefault();
			}

			if (/^(13|32)$/.test(event.keyCode)) {
				this.change();
			}
		},
		reset: function() {
			// this.element.checked not used (incorect on large number of form elements)
			if ((this.element.defaultChecked && this.$off.hasClass('active')) || (!this.element.defaultChecked && this.$on.hasClass('active'))) {
				this.toggle();
			}
		}
	};

	$.fn.checkboxpicker = function(options) {
		return this.each(function() {
			var data = $.data(this, 'bs.checkbox');

			if (!data) {
				new Checkboxpicker(this, options);

				$.data(this, 'bs.checkbox', true);
			}
		});
	};

	// HTML5 data-*.
	// <input data-on-label="43"> --> $('input').data('onLabel') == '43'.
	$.fn.checkboxpicker.defaults = {
		style: false,
		defaultClass: 'btn-default',
		offClass: 'btn-danger',
		onClass: 'btn-success',
		offLabel: 'No',
		onLabel: 'Yes',
		offTitle: false,
		onTitle: false,
		warningMessage: 'Please do not use bootstrap-checkbox element in label element.'
	};
});
