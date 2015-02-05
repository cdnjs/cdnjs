/*
 * Fuel UX Pillbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function(require) {
	
	var $ = require('jquery');


	// PILLBOX CONSTRUCTOR AND PROTOTYPE

	var Pillbox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.pillbox.defaults, options);
		this.$element.on('click', 'li', $.proxy(this.itemclicked, this));
	};

	Pillbox.prototype = {
		constructor: Pillbox,

		items: function() {
			return this.$element.find('li').map(function() {
				var $this = $(this);
				return $.extend({ text: $this.text() }, $this.data());
			}).get();
		},

		itemclicked: function (e) {
			$(e.currentTarget).remove();
			e.preventDefault();
		}
	};


	// PILLBOX PLUGIN DEFINITION

	$.fn.pillbox = function (option) {
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('pillbox');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('pillbox', (data = new Pillbox(this, options)));
			if (typeof option === 'string') methodReturn = data[option]();
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.pillbox.defaults = {};

	$.fn.pillbox.Constructor = Pillbox;


	// PILLBOX DATA-API

	$(function () {
		$('body').on('mousedown.pillbox.data-api', '.pillbox', function (e) {
			var $this = $(this);
			if ($this.data('pillbox')) return;
			$this.pillbox($this.data());
		});
	});
	
});

