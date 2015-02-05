/*
 * Fuel UX Combobox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function(require) {
	
	var $ = require('jquery');


	// COMBOBOX CONSTRUCTOR AND PROTOTYPE

	var Combobox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.combobox.defaults, options);
		this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
		this.$input = this.$element.find('input');
	};

	Combobox.prototype = {

		constructor: Combobox,

		select: function (val) {
			this.$input.val(val).change();
			return this;
		},

		itemclicked: function (e) {
			this.select($(e.target).text());
			$('body').click();
			e.preventDefault();
		}

	};


	// COMBOBOX PLUGIN DEFINITION

	$.fn.combobox = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('combobox');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('combobox', (data = new Combobox(this, options)));
			if (typeof option === 'string') data[option]();
		});
	};

	$.fn.combobox.defaults = {};

	$.fn.combobox.Constructor = Combobox;


	// COMBOBOX DATA-API

	$(function () {
		$('body').on('mousedown.combobox.data-api', '.combobox', function (e) {
			var $this = $(this);
			if ($this.data('combobox')) return;
			$this.combobox($this.data());
		});
	});

});
