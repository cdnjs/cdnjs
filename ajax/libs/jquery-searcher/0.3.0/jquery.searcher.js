/*! jQuery Searcher Plugin - v0.3.0 - 2016-01-29
 * https://github.com/lloiser/jquery-searcher/
 * Copyright (c) 2016 Lukas Beranek; Licensed MIT 
*/
(function IIFE() {

"use strict";

function factory($)
{
	var pluginName = "searcher",
		dataKey = "plugin_" + pluginName,
		defaults = {
			// selector for the item element
			itemSelector: "tbody > tr",
			// selector for the text elements
			textSelector: "td",
			// selector for the input
			inputSelector: "",
			// determines whether the search is case sensitive or not
			caseSensitive: false,
			// function to toggle the visibility of the item
			toggle: function(item, containsText)
			{
				$(item).toggle(containsText);
			}
		};

	function Searcher(element, options)
	{
		this.element = element;

		this.options = $.extend({ }, defaults, options);

		this._create();
	}

	Searcher.prototype = {
		dispose: function()
		{
			// unbind all events
			this._$input.unbind("." + pluginName);
			// toggle all elements with true
			var options = this.options,
				toggle = options.toggle || defaults.toggle;
			this._$element.find(options.itemSelector).each(function() { toggle(this, true); });
		},
		filter: function(value)
		{
			this._lastValue = value;

			var options = this.options,
				textSelector = options.textSelector,
				toggle = options.toggle || defaults.toggle;

			// build the regular expression for searching
			var flags = "gm" + (!options.caseSensitive ? "i" : "");
			var regex = new RegExp("(" + escapeRegExp(value) + ")", flags);

			this._$element
				.find(options.itemSelector)
				.each(function eachItem() {
					var $item = $(this),
						$textElements = textSelector ? $item.find(textSelector) : $item,
						itemContainsText = false;

					$textElements = $textElements.each(function eachTextElement() {
						itemContainsText = itemContainsText || !!$(this).text().match(regex);
						return !itemContainsText; // stop if at least one text element contains the text
					});

					toggle(this, itemContainsText);
				});
		},
		_create: function()
		{
			var options = this.options;

			this._$element = $(this.element);

			// find the input and bind to various events
			this._fn = $.proxy(this._onValueChange, this);
			var eventNames = "input." + pluginName + " change." + pluginName + " keyup." + pluginName;
			this._$input = $(options.inputSelector).bind(eventNames, this._fn);

			// remember the last entered value
			this._lastValue = null;

			// call the toggle with true for all items on startup
			var toggle = options.toggle || defaults.toggle;
			this._$element.find(options.itemSelector).each(function() { toggle(this, true); });
		},
		_onValueChange: function()
		{
			var value = this._$input.val();
			if (value === this._lastValue)
				return; // nothing has changed

			this.filter(value);
		}
	};

	function escapeRegExp(text)
	{
		// see https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
		return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	$.fn[pluginName] = function pluginHandler(options) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function() {
			var searcher = $.data(this, dataKey);
			var t = typeof(options);
			if (t === "string" && searcher)
			{
				searcher[options].apply(searcher, args);
				if (options === "dispose")
					$.removeData(this, dataKey);
			}
			else if (t === "object")
			{
				if (!searcher)
					// create a new searcher
					$.data(this, dataKey, new Searcher(this, options));
				else
					// update the options of the existing
					$.extend(searcher.options, options);
			}
		});
	};

}

// AMD style (register as an anonymous module)
if (typeof(define) === "function" && define.amd)
	define(["jquery"], factory);
// node/CommonJS style (for Browserify)
else if (typeof(exports) === "object")
	module.exports = factory;
// browser
else
	factory(jQuery);

}).call(this);
