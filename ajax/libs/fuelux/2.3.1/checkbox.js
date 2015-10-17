/*
 * Fuel UX Checkbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function (require) {

	var $ = require('jquery');


	// CHECKBOX CONSTRUCTOR AND PROTOTYPE

	var Checkbox = function (element, options) {

		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkbox.defaults, options);

		// cache elements
		this.$label = this.$element.parent();
		this.$icon = this.$label.find('i');
		this.$chk = this.$label.find('input[type=checkbox]');

		// set default state
		this.setState(this.$chk);

		// handle events
		this.$chk.on('change', $.proxy(this.itemchecked, this));
	};

	Checkbox.prototype = {

		constructor: Checkbox,

		setState: function ($chk) {
			var checked = $chk.is(':checked');
			var disabled = $chk.is(':disabled');

			// reset classes
			this.$icon.removeClass('checked').removeClass('disabled');

			// set state of checkbox
			if (checked === true) {
				this.$icon.addClass('checked');
			}
			if (disabled === true) {
				this.$icon.addClass('disabled');
			}
		},

		enable: function () {
			this.$chk.attr('disabled', false);
			this.$icon.removeClass('disabled');
		},

		disable: function () {
			this.$chk.attr('disabled', true);
			this.$icon.addClass('disabled');
		},

		toggle: function () {
			this.$chk.click();
		},

		itemchecked: function (e) {
			var chk = $(e.target);
			this.setState(chk);
		}
	};


	// CHECKBOX PLUGIN DEFINITION

	$.fn.checkbox = function (option, value) {
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('checkbox');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
			if (typeof option === 'string') methodReturn = data[option](value);
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.checkbox.defaults = {};

	$.fn.checkbox.Constructor = Checkbox;


	// CHECKBOX DATA-API

	$(function () {
		$(window).on('load', function () {
			//$('i.checkbox').each(function () {
			$('.checkbox-custom > input[type=checkbox]').each(function () {
				var $this = $(this);
				if ($this.data('checkbox')) return;
				$this.checkbox($this.data());
			});
		});
	});

});
