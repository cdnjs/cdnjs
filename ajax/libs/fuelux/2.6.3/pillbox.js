/*
 * Fuel UX Pillbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function(require) {

	var $   = require('jquery');
	var old = $.fn.pillbox;

	// PILLBOX CONSTRUCTOR AND PROTOTYPE

	var Pillbox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.pillbox.defaults, options);
		this.$element.on('click', 'li', $.proxy(this.itemclicked, this));
	};

	Pillbox.prototype = {
		constructor : Pillbox,

		items: function() {
			return this.$element.find('li').map(function() {
				var $this = $(this);
				return $.extend({
					text : $this.text()
				}, $this.data());
			}).get();
		},

		itemclicked: function(e) {
			var $li = $(e.currentTarget);
			var data = $.extend({
				text : $li.html()
			}, $li.data());

			$li.remove();
			e.preventDefault();

			this.$element.trigger('removed', data);
		},

		itemCount: function() {
			return this.$element.find('li').length;
		},

		addItem: function(text, value) {
			value   = value || text;
			var $li = $('<li data-value="' + value + '">' + text + '</li>');

			if( this.$element.find('ul').length > 0 ) {
				this.$element.find('ul').append($li);
			} else {
				this.$element.append($li);
			}

			this.$element.trigger( 'added', { text: text, value: value } );

			return $li;
		},

		removeBySelector: function(selector, trigger) {
			if( typeof trigger === "undefined" ) {
				trigger = true;
			}

			this.$element.find('ul').find(selector).remove();

			if( !!trigger ) {
				this._removePillTrigger( { method: 'removeBySelector', removedSelector: selector } );
			}
		},

		removeByValue: function(value) {
			var selector = 'li[data-value="' + value + '"]';

			this.removeBySelector( selector, false );
			this._removePillTrigger( { method: 'removeByValue', removedValue: value } );
		},

		removeByText: function(text) {
			var selector = 'li:contains("' + text + '")';

			this.removeBySelector( selector, false );
			this._removePillTrigger( { method: 'removeByText', removedText: text } );
		},

		clear: function() {
			this.$element.find('ul').empty();
		},

		_removePillTrigger: function( removedBy ) {
			this.$element.trigger( 'removed', removedBy );
		}
	};

	// PILLBOX PLUGIN DEFINITION

	$.fn.pillbox = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'pillbox' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('pillbox', (data = new Pillbox( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.pillbox.defaults = {};

	$.fn.pillbox.Constructor = Pillbox;

	$.fn.pillbox.noConflict = function () {
		$.fn.pillbox = old;
		return this;
	};


	// PILLBOX DATA-API

	$(function () {
		$('body').on('mousedown.pillbox.data-api', '.pillbox', function () {
			var $this = $(this);
			if ($this.data('pillbox')) return;
			$this.pillbox($this.data());
		});
	});
});