/*!
 @package wdtLoading - Application loading screen
 @version version: 0.1.0
 @contributors https://github.com/needim/wdtLoading/graphs/contributors
 @documentation Examples and Documentation - http://ned.im/wdtLoading/
 @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */

;
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.wdtLoading = factory();
	}

})(this, function () {
	var wdtLoading = {};

	wdtLoading.defaults = {
		category: 'default',
		speed   : 2000, // millisecond
	}

	/**
	 * Shows the loading spinner.
	 */
	wdtLoading.start = function (options) {

		this.options = extend(wdtLoading.defaults, options);

		this.wdtLoadingScreen = document.querySelector('.wdt-loading-screen');
		var wdtPhraseCategories = document.querySelectorAll('.wdt-loading-phrase-category');

		for (var i = 0; i < wdtPhraseCategories.length; i++) {
			css(wdtPhraseCategories[i], {display: 'none'});
		}

		this.wdtPhraseActiveCat = document.querySelector('.wdt-loading-phrase-category[data-category="' + this.options.category + '"]');
		css(this.wdtPhraseActiveCat, {display: 'block'});

		this.activePhrases = this.wdtPhraseActiveCat.querySelectorAll('.wdt-loading-phrase');
		this.activePhrasesCount = this.activePhrases.length;

		if (this.activePhrasesCount < 5) {
			console.warn('wdtLoading -->', 'Add more phrase for better spin animation!');
		}

		var sufflePhrases = [];
		for (var i = 0; i < this.activePhrases.length; i++) {
			sufflePhrases.push(this.activePhrases[i]);
			removeElement(this.activePhrases[i]);
		}

		sufflePhrases = wdtLoading.shuffle(sufflePhrases);

		for (var i = 0; i < sufflePhrases.length; i++) {
			this.wdtPhraseActiveCat.appendChild(sufflePhrases[i]);
		}

		css(this.wdtLoadingScreen, {display: 'block'});

		wdtLoading.spin();

		return this;
	};

	wdtLoading.spin = function () {
		var that = this;
		this.phraseHeight = that.wdtPhraseActiveCat.querySelector('.wdt-loading-phrase').scrollHeight;

		that.currentIndex = 0;
		that.currentTransform = 0;

		that.spinInternal = setInterval(function () {
			that.activePhrases = that.wdtPhraseActiveCat.querySelectorAll('.wdt-loading-phrase');
			addClass(that.activePhrases[that.currentIndex], 'wdt-checked');
			that.currentIndex++;
			that.currentTransform = that.currentTransform - that.phraseHeight;

			css(that.wdtPhraseActiveCat, {transform: 'translateY(' + that.currentTransform + 'px)'});

			if (that.currentIndex > 1) {
				var currentNone = that.activePhrases[that.currentIndex - 2];
				var currentClone = currentNone.cloneNode(true);
				removeClass(currentClone, 'wdt-checked');
				addClass(currentClone, 'wdt-cloned-phrase');
				currentClone.style.transform = '';
				that.wdtPhraseActiveCat.appendChild(currentClone);
			}
		}, this.options.speed);
	};

	wdtLoading.done = function () {
		if (this.spinInternal)
			clearInterval(this.spinInternal);

		css(this.wdtLoadingScreen, {display: 'none'});

		var clonePhrases = document.querySelectorAll('.wdt-cloned-phrase');

		var allPhrases = document.querySelectorAll('.wdt-loading-phrase');
		for (var i = 0; i < allPhrases.length; i++) {
			removeClass(allPhrases[i], 'wdt-checked');
		}

		this.wdtPhraseActiveCat.style.transform = '';

		for (var i = 0; i < clonePhrases.length; i++) {
			removeElement(clonePhrases[i]);
		}

		clearInterval(this.spinInternal);
	};

	/**
	 * (Internal) Shuffles the array
	 */
	wdtLoading.shuffle = function (array) {
		var m = array.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	};

	// Pass in the objects to merge as arguments.
	// For a deep extend, set the first argument to `true`.
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for (var prop in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, prop)) {
					// If deep merge and property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(true, extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < length; i++) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * (Internal) Applies css properties to an element, similar to the jQuery
	 * css method.
	 *
	 * While this helper does assist with vendor prefixed property names, it
	 * does not perform any manipulation of values prior to setting styles.
	 */
	var css = (function () {
		var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
			cssProps = {};

		function camelCase(string) {
			return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
				return letter.toUpperCase();
			});
		}

		function getVendorProp(name) {
			var style = document.body.style;
			if (name in style) return name;

			var i = cssPrefixes.length,
				capName = name.charAt(0).toUpperCase() + name.slice(1),
				vendorName;
			while (i--) {
				vendorName = cssPrefixes[i] + capName;
				if (vendorName in style) return vendorName;
			}

			return name;
		}

		function getStyleProp(name) {
			name = camelCase(name);
			return cssProps[name] || (cssProps[name] = getVendorProp(name));
		}

		function applyCss(element, prop, value) {
			prop = getStyleProp(prop);
			element.style[prop] = value;
		}

		return function (element, properties) {
			var args = arguments,
				prop,
				value;

			if (args.length == 2) {
				for (prop in properties) {
					value = properties[prop];
					if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
				}
			} else {
				applyCss(element, args[1], args[2]);
			}
		}
	})();

	/**
	 * (Internal) Determines if an element or space separated list of class names contains a class name.
	 */
	function hasClass(element, name) {
		var list = typeof element == 'string' ? element : classList(element);
		return list.indexOf(' ' + name + ' ') >= 0;
	}

	/**
	 * (Internal) Adds a class to an element.
	 */
	function addClass(element, name) {
		var oldList = classList(element),
			newList = oldList + name;

		if (hasClass(oldList, name)) return;

		// Trim the opening space.
		element.className = newList.substring(1);
	}

	/**
	 * (Internal) Removes a class from an element.
	 */
	function removeClass(element, name) {
		var oldList = classList(element),
			newList;

		if (!hasClass(element, name)) return;

		// Replace the class name.
		newList = oldList.replace(' ' + name + ' ', ' ');

		// Trim the opening and closing spaces.
		element.className = newList.substring(1, newList.length - 1);
	}

	/**
	 * (Internal) Gets a space separated list of the class names on the element.
	 * The list is wrapped with a single space on each end to facilitate finding
	 * matches within the list.
	 */
	function classList(element) {
		return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
	}

	/**
	 * (Internal) Removes an element from the DOM.
	 */
	function removeElement(element) {
		element && element.parentNode && element.parentNode.removeChild(element);
	}

	return wdtLoading;
});