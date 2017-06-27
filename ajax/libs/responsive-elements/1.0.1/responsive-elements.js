//
//  Responsive Elements
//  Copyright (c) 2013 Kumail Hunaid
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

var ResponsiveElements = {
	elementsAttributeName: 'data-respond',
	maxRefreshRate: 5,
	defaults: {
		// How soon should you start adding breakpoints
		start: 100,
		// When to stop adding breakpoints
		end: 900,
		// At what interval should breakpoints be added?
		interval: 50
	},
	init: function() {
		var self = this;
		$(function() {
			self.el = {
				window: $(window),
				responsive_elements: $('[' + self.elementsAttributeName + ']')
			};

			self.events();
		});
	},
	parseOptions: function(options_string) {
		// data-respond="start: 100px; end: 900px; interval: 50px; watch: true;"
		if (!options_string) return false;

		this._options_cache = this._options_cache || {};
		if (this._options_cache[options_string]) return this._options_cache[options_string];

		var options_array = options_string.replace(/\s+/g, '').split(';'),
			options_object = {};

		for (var i = 0; i < options_array.length; i++) {
			if (!options_array[i]) continue;
			var property_array = (options_array[i]).split(':');

			var key = property_array[0];
			var value = property_array[1];

			if (value.slice(-2) === 'px') {
				value = value.replace('px', '');
			}
			if (!isNaN(value)) {
				value = parseInt(value, 10);
			}
			options_object[key] = value;
		}

		this._options_cache[options_string] = options_object;
		return options_object;
	},
	generateBreakpointsOnAllElements: function() {
		var self = ResponsiveElements;
		self.el.responsive_elements.each(function(i, _el) {
			self.generateBreakpointsOnElement($(_el));
		});
	},
	generateBreakpointsOnElement: function(_el) {
		var options_string = _el.attr(this.elementsAttributeName),
			options = this.parseOptions(options_string) || this.defaults,
			breakpoints = this.generateBreakpoints(_el.width(), options);

		this.cleanUpBreakpoints(_el);
		_el.addClass(breakpoints.join(' '));
	},
	generateBreakpoints: function(width, options) {
		var start = options.start,
			end = options.end,
			interval = options.interval,
			i = interval > start ? interval : ~~(start / interval) * interval,
			classes = [];

		while (i <= end) {
			if (i < width) classes.push('gt' + i);
			if (i > width) classes.push('lt' + i);
			if (i == width) classes.push('lt' + i);

			i += interval;
		}

		return classes;
	},
	parseBreakpointClasses: function(breakpoints_string) {
		var classes = breakpoints_string.split(/\s+/),
			breakpointClasses = [];

		$(classes).each(function(i, className) {
			if (className.match(/^gt\d+|lt\d+$/)) breakpointClasses.push(className);
		});

		return breakpointClasses;
	},
	cleanUpBreakpoints: function(_el) {
		var classesToCleanup = this.parseBreakpointClasses(_el.attr('class') || '');
		_el.removeClass(classesToCleanup.join(' '));
	},
	events: function() {
		this.generateBreakpointsOnAllElements();

		this.el.window.bind('resize', this.utils.debounce(
			this.generateBreakpointsOnAllElements, this.maxRefreshRate));
	},
	utils: {
		// Debounce is part of Underscore.js 1.5.2 http://underscorejs.org
		// (c) 2009-2013 Jeremy Ashkenas. Distributed under the MIT license.
		debounce: function(func, wait, immediate) {
			// Returns a function, that, as long as it continues to be invoked,
			// will not be triggered. The function will be called after it stops
			// being called for N milliseconds. If `immediate` is passed,
			// trigger the function on the leading edge, instead of the trailing.
			var result;
			var timeout = null;
			return function() {
				var context = this,
					args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) result = func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) result = func.apply(context, args);
				return result;
			};
		}
	}
};

ResponsiveElements.init();
