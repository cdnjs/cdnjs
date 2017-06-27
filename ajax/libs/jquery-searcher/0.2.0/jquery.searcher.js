/*! jQuery Searcher Plugin - v0.2.0 - 2014-08-18
 * https://github.com/lloiser/jquery-searcher/
 * Copyright (c) 2014 Lukas Beranek; Licensed MIT 
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
		_create: function()
		{
			var options = this.options;

			this._$element = $(this.element);

			// find the input and bind to various events
			this._fn = $.proxy(this._onValueChange, this);
			var eventNames = "input." + pluginName + " change." + pluginName + " keyup." + pluginName;
			this._$input = $(options.inputSelector).bind(eventNames, this._fn);

			// remember the last entered value
			this._lastValue = "";

			// call the toggle with true for all items on startup
			var toggle = options.toggle || defaults.toggle;
			this._$element.find(options.itemSelector).each(function() { toggle(this, true); });
		},
		_onValueChange: function()
		{
			var options = this.options,
				textSelector = options.textSelector,
				toggle = options.toggle || defaults.toggle;

			// build the regular expression for searching
			var flags = "gm" + (!options.caseSensitive ? "i" : "");
			var value = new RegExp("(" + escapeRegExp(this._$input.val()) + ")", flags);

			if (value.toString() === this._lastValue)
				return; // nothing has changed

			this._lastValue = value.toString();

			this._$element
				.find(options.itemSelector)
				.each(function eachItem() {
					var $item = $(this),
						$textElements = textSelector ? $item.find(textSelector) : $item,
						itemContainsText = false;

					$textElements = $textElements.each(function eachTextElement() {
						itemContainsText = itemContainsText || !!$(this).text().match(value);
						return !itemContainsText; // stop if at least one text element contains the text
					});

					toggle(this, itemContainsText);
				});
		}
	};

	function escapeRegExp(text)
	{
		// see https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
		return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	$.fn[pluginName] = function pluginHandler(options) {
		return this.each(function() {
			var searcher = $.data(this, dataKey);
			if (searcher && options === "dispose")
			{
				searcher.dispose();
				$.removeData(this, dataKey);
			}
			// update the options of the existing
			else if (searcher)
				$.extend(searcher.options, options);
			// create a new searcher
			else if (typeof(options) === "object")
				$.data(this, dataKey, new Searcher(this, options));
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