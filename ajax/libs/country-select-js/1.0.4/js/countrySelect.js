// wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([ "jquery" ], function($) {
			factory($, window, document);
		});
	} else {
		factory(jQuery, window, document);
	}
})(function($, window, document, undefined) {
	"use strict";
	var pluginName = "countrySelect", id = 1, // give each instance its own ID for namespaced event handling
	defaults = {
		// Default country
		defaultCountry: "",
		// Position the selected flag inside or outside of the input
		defaultStyling: "inside",
		// Display only these countries
		onlyCountries: [],
		// The countries at the top of the list. Defaults to United States and United Kingdom
		preferredCountries: [ "us", "gb" ]
	}, keys = {
		UP: 38,
		DOWN: 40,
		ENTER: 13,
		ESC: 27,
		PLUS: 43,
		A: 65,
		Z: 90
	}, windowLoaded = false;
	// keep track of if the window.load event has fired as impossible to check after the fact
	$(window).load(function() {
		windowLoaded = true;
	});
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		// event namespace
		this.ns = "." + pluginName + id++;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			// Process all the data: onlyCounties, preferredCountries, defaultCountry etc
			this._processCountryData();
			// Generate the markup
			this._generateMarkup();
			// Set the initial state of the input value and the selected flag
			this._setInitialState();
			// Start all of the event listeners: input keyup, selectedFlag click
			this._initListeners();
		},
		/********************
		 *  PRIVATE METHODS
		 ********************/
		// prepare all of the country data, including onlyCountries, preferredCountries and
		// defaultCountry options
		_processCountryData: function() {
			// set the instances country data objects
			this._setInstanceCountryData();
			// set the preferredCountries property
			this._setPreferredCountries();
		},
		// process onlyCountries array if present
		_setInstanceCountryData: function() {
			var that = this;
			if (this.options.onlyCountries.length) {
				var newCountries = [];
				$.each(this.options.onlyCountries, function(i, countryCode) {
					var countryData = that._getCountryData(countryCode, true);
					if (countryData) {
						newCountries.push(countryData);
					}
				});
				this.countries = newCountries;
			} else {
				this.countries = allCountries;
			}
		},
		// Process preferred countries - iterate through the preferences,
		// fetching the country data for each one
		_setPreferredCountries: function() {
			var that = this;
			this.preferredCountries = [];
			$.each(this.options.preferredCountries, function(i, countryCode) {
				var countryData = that._getCountryData(countryCode, false);
				if (countryData) {
					that.preferredCountries.push(countryData);
				}
			});
		},
		// generate all of the markup for the plugin: the selected flag overlay, and the dropdown
		_generateMarkup: function() {
			// Country input
			this.countryInput = $(this.element);
			// containers (mostly for positioning)
			var mainClass = "country-select";
			if (this.options.defaultStyling) {
				mainClass += " " + this.options.defaultStyling;
			}
			this.countryInput.wrap($("<div>", {
				"class": mainClass
			}));
			var flagsContainer = $("<div>", {
				"class": "flag-dropdown"
			}).insertAfter(this.countryInput);
			// currently selected flag (displayed to left of input)
			var selectedFlag = $("<div>", {
				"class": "selected-flag"
			}).appendTo(flagsContainer);
			this.selectedFlagInner = $("<div>", {
				"class": "flag"
			}).appendTo(selectedFlag);
			// CSS triangle
			$("<div>", {
				"class": "arrow"
			}).appendTo(this.selectedFlagInner);
			// country list contains: preferred countries, then divider, then all countries
			this.countryList = $("<ul>", {
				"class": "country-list v-hide"
			}).appendTo(flagsContainer);
			if (this.preferredCountries.length) {
				this._appendListItems(this.preferredCountries, "preferred");
				$("<li>", {
					"class": "divider"
				}).appendTo(this.countryList);
			}
			this._appendListItems(this.countries, "");
			// Add the hidden input for the country code
			this.countryCodeInput = $("#"+this.countryInput.attr("id")+"_code");
			if (!this.countryCodeInput) {
				this.countryCodeInput = $('<input type="hidden" id="'+this.countryInput.attr("id")+'_code" name="'+this.countryInput.attr("name")+'_code" value="" />');
				this.countryCodeInput.insertAfter(this.countryInput);
			}
			// now we can grab the dropdown height, and hide it properly
			this.dropdownHeight = this.countryList.outerHeight();
			this.countryList.removeClass("v-hide").addClass("hide");
			// this is useful in lots of places
			this.countryListItems = this.countryList.children(".country");
		},
		// add a country <li> to the countryList <ul> container
		_appendListItems: function(countries, className) {
			// Generate DOM elements as a large temp string, so that there is only
			// one DOM insert event
			var tmp = "";
			// for each country
			$.each(countries, function(i, c) {
				// open the list item
				tmp += '<li class="country ' + className + '" data-country-code="' + c.iso2 + '">';
				// add the flag
				tmp += '<div class="flag ' + c.iso2 + '"></div>';
				// and the country name
				tmp += '<span class="country-name">' + c.name + '</span>';
				// close the list item
				tmp += '</li>';
			});
			this.countryList.append(tmp);
		},
		// set the initial state of the input value and the selected flag
		_setInitialState: function() {
			var flagIsSet = false;
			// If the input is pre-populated, then just update the selected flag
			if (this.countryInput.val()) {
				flagIsSet = this._updateFlagFromInputVal();
			}
			// If the country code input is pre-populated, update the name and the selected flag
			var selectedCode = this.countryCodeInput.val();
			if (selectedCode) {
				this.selectCountry(selectedCode);
			}
			if (!flagIsSet) {
				// flag is not set, so set to the default country
				var defaultCountry;
				// check the defaultCountry option, else fall back to the first in the list
				if (this.options.defaultCountry) {
					defaultCountry = this._getCountryData(this.options.defaultCountry, false);
				} else {
					defaultCountry = this.preferredCountries.length ? this.preferredCountries[0] : this.countries[0];
				}
				this.selectCountry(defaultCountry.iso2);
			}
		},
		// initialise the main event listeners: input keyup, and click selected flag
		_initListeners: function() {
			var that = this;
			// Update flag on keyup.
			// Use keyup instead of keypress because we want to update on backspace
			// and instead of keydown because the value hasn't updated when that
			// event is fired.
			// NOTE: better to have this one listener all the time instead of
			// starting it on focus and stopping it on blur, because then you've
			// got two listeners (focus and blur)
			this.countryInput.on("keyup" + this.ns, function() {
				that._updateFlagFromInputVal();
			});
			// toggle country dropdown on click
			var selectedFlag = this.selectedFlagInner.parent();
			selectedFlag.on("click" + this.ns, function(e) {
				// only intercept this event if we're opening the dropdown
				// else let it bubble up to the top ("click-off-to-close" listener)
				// we cannot just stopPropagation as it may be needed to close another instance
				if (that.countryList.hasClass("hide") && !that.countryInput.prop("disabled")) {
					that._showDropdown();
				}
			});
		},
		// Focus input and put the cursor at the end
		_focus: function() {
			this.countryInput.focus();
			var input = this.countryInput[0];
			// works for Chrome, FF, Safari, IE9+
			if (input.setSelectionRange) {
				var len = this.countryInput.val().length;
				input.setSelectionRange(len, len);
			}
		},
		// Show the dropdown
		_showDropdown: function() {
			this._setDropdownPosition();
			// update highlighting and scroll to active list item
			var activeListItem = this.countryList.children(".active");
			this._highlightListItem(activeListItem);
			// show it
			this.countryList.removeClass("hide");
			this._scrollTo(activeListItem);
			// bind all the dropdown-related listeners: mouseover, click, click-off, keydown
			this._bindDropdownListeners();
			// update the arrow
			this.selectedFlagInner.children(".arrow").addClass("up");
		},
		// decide where to position dropdown (depends on position within viewport, and scroll)
		_setDropdownPosition: function() {
			var inputTop = this.countryInput.offset().top, windowTop = $(window).scrollTop(),
			dropdownFitsBelow = inputTop + this.countryInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
			// dropdownHeight - 1 for border
			var cssTop = !dropdownFitsBelow && dropdownFitsAbove ? "-" + (this.dropdownHeight - 1) + "px" : "";
			this.countryList.css("top", cssTop);
		},
		// we only bind dropdown listeners when the dropdown is open
		_bindDropdownListeners: function() {
			var that = this;
			// when mouse over a list item, just highlight that one
			// we add the class "highlight", so if they hit "enter" we know which one to select
			this.countryList.on("mouseover" + this.ns, ".country", function(e) {
				that._highlightListItem($(this));
			});
			// listen for country selection
			this.countryList.on("click" + this.ns, ".country", function(e) {
				that._selectListItem($(this));
			});
			// click off to close
			// (except when this initial opening click is bubbling up)
			// we cannot just stopPropagation as it may be needed to close another instance
			var isOpening = true;
			$("html").on("click" + this.ns, function(e) {
				if (!isOpening) {
					that._closeDropdown();
				}
				isOpening = false;
			});
			// Listen for up/down scrolling, enter to select, or letters to jump to country name.
			// Use keydown as keypress doesn't fire for non-char keys and we want to catch if they
			// just hit down and hold it to scroll down (no keyup event).
			// Listen on the document because that's where key events are triggered if no input has focus
			$(document).on("keydown" + this.ns, function(e) {
				// prevent down key from scrolling the whole page,
				// and enter key from submitting a form etc
				e.preventDefault();
				if (e.which == keys.UP || e.which == keys.DOWN) {
					// up and down to navigate
					that._handleUpDownKey(e.which);
				} else if (e.which == keys.ENTER) {
					// enter to select
					that._handleEnterKey();
				} else if (e.which == keys.ESC) {
					// esc to close
					that._closeDropdown();
				} else if (e.which >= keys.A && e.which <= keys.Z) {
					// upper case letters (note: keyup/keydown only return upper case letters)
					// cycle through countries beginning with that letter
					that._handleLetterKey(e.which);
				}
			});
		},
		// Highlight the next/prev item in the list (and ensure it is visible)
		_handleUpDownKey: function(key) {
			var current = this.countryList.children(".highlight").first();
			var next = key == keys.UP ? current.prev() : current.next();
			if (next.length) {
				// skip the divider
				if (next.hasClass("divider")) {
					next = key == keys.UP ? next.prev() : next.next();
				}
				this._highlightListItem(next);
				this._scrollTo(next);
			}
		},
		// select the currently highlighted item
		_handleEnterKey: function() {
			var currentCountry = this.countryList.children(".highlight").first();
			if (currentCountry.length) {
				this._selectListItem(currentCountry);
			}
		},
		// Iterate through the countries starting with the given letter
		_handleLetterKey: function(key) {
			var letter = String.fromCharCode(key);
			// filter out the countries beginning with that letter
			var countries = this.countryListItems.filter(function() {
				return $(this).text().charAt(0) == letter && !$(this).hasClass("preferred");
			});
			if (countries.length) {
				// if one is already highlighted, then we want the next one
				var highlightedCountry = countries.filter(".highlight").first(), listItem;
				// if the next country in the list also starts with that letter
				if (highlightedCountry && highlightedCountry.next() && highlightedCountry.next().text().charAt(0) == letter) {
					listItem = highlightedCountry.next();
				} else {
					listItem = countries.first();
				}
				// update highlighting and scroll
				this._highlightListItem(listItem);
				this._scrollTo(listItem);
			}
		},
		// Update the selected flag using the input's current value
		_updateFlagFromInputVal: function() {
			var that = this;
			// try and extract valid country from input
			var value = this.countryInput.val().replace(/(?=[() ])/g, '\\');
			if (value) {
				var countryCodes = [];
				var matcher = new RegExp("^"+value, "i");
				for (var i =0; i < this.countries.length; i++) {
					if (this.countries[i].name.match(matcher)) {
						countryCodes.push(this.countries[i].iso2);
					}
				}
				// Check if one of the matching countries is already selected
				var alreadySelected = false;
				$.each(countryCodes, function(i, c) {
					if (that.selectedFlagInner.hasClass(c)) {
						alreadySelected = true;
					}
				});
				if (!alreadySelected) {
					this._selectFlag(countryCodes[0]);
					this.countryCodeInput.val(countryCodes[0]);
				}
				// Matching country found
				return true;
			}
			// No match found
			return false;
		},
		// remove highlighting from other list items and highlight the given item
		_highlightListItem: function(listItem) {
			this.countryListItems.removeClass("highlight");
			listItem.addClass("highlight");
		},
		// find the country data for the given country code
		// the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
		_getCountryData: function(countryCode, ignoreOnlyCountriesOption) {
			var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
			for (var i = 0; i < countryList.length; i++) {
				if (countryList[i].iso2 == countryCode) {
					return countryList[i];
				}
			}
			return null;
		},
		// update the selected flag and the active list item
		_selectFlag: function(countryCode) {
			if (! countryCode) {
				return false;
			}
			this.selectedFlagInner.attr("class", "flag " + countryCode);
			// update the title attribute
			var countryData = this._getCountryData(countryCode);
			this.selectedFlagInner.parent().attr("title", countryData.name);
			// update the active list item
			var listItem = this.countryListItems.children(".flag." + countryCode).first().parent();
			this.countryListItems.removeClass("active");
			listItem.addClass("active");
		},
		// called when the user selects a list item from the dropdown
		_selectListItem: function(listItem) {
			// update selected flag and active list item
			var countryCode = listItem.attr("data-country-code");
			this._selectFlag(countryCode);
			this._closeDropdown();
			// update input value
			this._updateName(countryCode);
			this.countryInput.trigger("change");
			this.countryCodeInput.trigger("change");
			// focus the input
			this._focus();
		},
		// close the dropdown and unbind any listeners
		_closeDropdown: function() {
			this.countryList.addClass("hide");
			// update the arrow
			this.selectedFlagInner.children(".arrow").removeClass("up");
			// unbind event listeners
			$(document).off("keydown" + this.ns);
			$("html").off("click" + this.ns);
			// unbind both hover and click listeners
			this.countryList.off(this.ns);
		},
		// check if an element is visible within its container, else scroll until it is
		_scrollTo: function(element) {
			var container = this.countryList, containerHeight = container.height(), containerTop = container.offset().top, containerBottom = containerTop + containerHeight, elementHeight = element.outerHeight(), elementTop = element.offset().top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop();
			if (elementTop < containerTop) {
				// scroll up
				container.scrollTop(newScrollTop);
			} else if (elementBottom > containerBottom) {
				// scroll down
				var heightDifference = containerHeight - elementHeight;
				container.scrollTop(newScrollTop - heightDifference);
			}
		},
		// Replace any existing country name with the new one
		_updateName: function(countryCode) {
			this.countryCodeInput.val(countryCode);
			this.countryInput.val(this._getCountryData(countryCode).name);
		},
		/********************
		 *  PUBLIC METHODS
		 ********************/
		// get the country data for the currently selected flag
		getSelectedCountryData: function() {
			// rely on the fact that we only set 2 classes on the selected flag element:
			// the first is "flag" and the second is the 2-char country code
			var countryCode = this.selectedFlagInner.attr("class").split(" ")[1];
			return this._getCountryData(countryCode);
		},
		// update the selected flag
		selectCountry: function(countryCode) {
			// check if already selected
			if (!this.selectedFlagInner.hasClass(countryCode)) {
				this._selectFlag(countryCode);
				this._updateName(countryCode);
			}
		},
		// set the input value and update the flag
		setCountry: function(country) {
			this.countryInput.val(country);
			this._updateFlagFromInputVal();
		},
		// remove plugin
		destroy: function() {
			// stop listeners
			this.countryInput.off(this.ns);
			this.selectedFlagInner.parent().off(this.ns);
			// remove markup
			var container = this.countryInput.parent();
			container.before(this.countryInput).remove();
		}
	};
	// adapted to allow public functions
	// using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
	$.fn[pluginName] = function(options) {
		var args = arguments;
		// Is the first parameter an object (options), or was omitted,
		// instantiate a new instance of the plugin.
		if (options === undefined || typeof options === "object") {
			return this.each(function() {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === "string" && options[0] !== "_" && options !== "init") {
			// If the first parameter is a string and it doesn't start
			// with an underscore or "contains" the `init`-function,
			// treat this as a call to a public method.
			// Cache the method call to make it possible to return a value
			var returns;
			this.each(function() {
				var instance = $.data(this, "plugin_" + pluginName);
				// Tests that there's already a plugin-instance
				// and checks that the requested public method exists
				if (instance instanceof Plugin && typeof instance[options] === "function") {
					// Call the method of our plugin instance,
					// and pass it the supplied arguments.
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				// Allow instances to be destroyed via the 'destroy' method
				if (options === "destroy") {
					$.data(this, "plugin_" + pluginName, null);
				}
			});
			// If the earlier cached method gives a value back return the value,
			// otherwise return this to preserve chainability.
			return returns !== undefined ? returns : this;
		}
	};
	/********************
   *  STATIC METHODS
   ********************/
	// get the country data object
	$.fn[pluginName].getCountryData = function() {
		return allCountries;
	};
	// set the country data object
	$.fn[pluginName].setCountryData = function(obj) {
		allCountries = obj;
	};
	// Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
	// jshint -W100
	// Array of country objects for the flag dropdown.
	// Each contains a name and country code (ISO 3166-1 alpha-2).
	//
	// Note: using single char property names to keep filesize down
	// n = name
	// i = iso2 (2-char country code)
	var allCountries = $.each([ {
		n: "Afghanistan (‫افغانستان‬‎)",
		i: "af"
	}, {
		n: "Åland Islands (Åland)",
		i: "ax"
	}, {
		n: "Albania (Shqipëri)",
		i: "al"
	}, {
		n: "Algeria (‫الجزائر‬‎)",
		i: "dz"
	}, {
		n: "American Samoa",
		i: "as"
	}, {
		n: "Andorra",
		i: "ad"
	}, {
		n: "Angola",
		i: "ao"
	}, {
		n: "Anguilla",
		i: "ai"
	}, {
		n: "Antigua and Barbuda",
		i: "ag"
	}, {
		n: "Argentina",
		i: "ar"
	}, {
		n: "Armenia (Հայաստան)",
		i: "am"
	}, {
		n: "Aruba",
		i: "aw"
	}, {
		n: "Australia",
		i: "au"
	}, {
		n: "Austria (Österreich)",
		i: "at"
	}, {
		n: "Azerbaijan (Azərbaycan)",
		i: "az"
	}, {
		n: "Bahamas",
		i: "bs"
	}, {
		n: "Bahrain (‫البحرين‬‎)",
		i: "bh"
	}, {
		n: "Bangladesh (বাংলাদেশ)",
		i: "bd"
	}, {
		n: "Barbados",
		i: "bb"
	}, {
		n: "Belarus (Беларусь)",
		i: "by"
	}, {
		n: "Belgium (België)",
		i: "be"
	}, {
		n: "Belize",
		i: "bz"
	}, {
		n: "Benin (Bénin)",
		i: "bj"
	}, {
		n: "Bermuda",
		i: "bm"
	}, {
		n: "Bhutan (འབྲུག)",
		i: "bt"
	}, {
		n: "Bolivia",
		i: "bo"
	}, {
		n: "Bosnia and Herzegovina (Босна и Херцеговина)",
		i: "ba"
	}, {
		n: "Botswana",
		i: "bw"
	}, {
		n: "Brazil (Brasil)",
		i: "br"
	}, {
		n: "British Indian Ocean Territory",
		i: "io"
	}, {
		n: "British Virgin Islands",
		i: "vg"
	}, {
		n: "Brunei",
		i: "bn"
	}, {
		n: "Bulgaria (България)",
		i: "bg"
	}, {
		n: "Burkina Faso",
		i: "bf"
	}, {
		n: "Burundi (Uburundi)",
		i: "bi"
	}, {
		n: "Cambodia (កម្ពុជា)",
		i: "kh"
	}, {
		n: "Cameroon (Cameroun)",
		i: "cm"
	}, {
		n: "Canada",
		i: "ca"
	}, {
		n: "Cape Verde (Kabu Verdi)",
		i: "cv"
	}, {
		n: "Caribbean Netherlands",
		i: "bq"
	}, {
		n: "Cayman Islands",
		i: "ky"
	}, {
		n: "Central African Republic (République Centrafricaine)",
		i: "cf"
	}, {
		n: "Chad (Tchad)",
		i: "td"
	}, {
		n: "Chile",
		i: "cl"
	}, {
		n: "China (中国)",
		i: "cn"
	}, {
		n: "Christmas Island",
		i: "cx"
	}, {
		n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
		i: "cc"
	}, {
		n: "Colombia",
		i: "co"
	}, {
		n: "Comoros (‫جزر القمر‬‎)",
		i: "km"
	}, {
		n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
		i: "cd"
	}, {
		n: "Congo (Republic) (Congo-Brazzaville)",
		i: "cg"
	}, {
		n: "Cook Islands",
		i: "ck"
	}, {
		n: "Costa Rica",
		i: "cr"
	}, {
		n: "Côte d’Ivoire",
		i: "ci"
	}, {
		n: "Croatia (Hrvatska)",
		i: "hr"
	}, {
		n: "Cuba",
		i: "cu"
	}, {
		n: "Curaçao",
		i: "cw"
	}, {
		n: "Cyprus (Κύπρος)",
		i: "cy"
	}, {
		n: "Czech Republic (Česká republika)",
		i: "cz"
	}, {
		n: "Denmark (Danmark)",
		i: "dk"
	}, {
		n: "Djibouti",
		i: "dj"
	}, {
		n: "Dominica",
		i: "dm"
	}, {
		n: "Dominican Republic (República Dominicana)",
		i: "do"
	}, {
		n: "Ecuador",
		i: "ec"
	}, {
		n: "Egypt (‫مصر‬‎)",
		i: "eg"
	}, {
		n: "El Salvador",
		i: "sv"
	}, {
		n: "Equatorial Guinea (Guinea Ecuatorial)",
		i: "gq"
	}, {
		n: "Eritrea",
		i: "er"
	}, {
		n: "Estonia (Eesti)",
		i: "ee"
	}, {
		n: "Ethiopia",
		i: "et"
	}, {
		n: "Falkland Islands (Islas Malvinas)",
		i: "fk"
	}, {
		n: "Faroe Islands (Føroyar)",
		i: "fo"
	}, {
		n: "Fiji",
		i: "fj"
	}, {
		n: "Finland (Suomi)",
		i: "fi"
	}, {
		n: "France",
		i: "fr"
	}, {
		n: "French Guiana (Guyane française)",
		i: "gf"
	}, {
		n: "French Polynesia (Polynésie française)",
		i: "pf"
	}, {
		n: "Gabon",
		i: "ga"
	}, {
		n: "Gambia",
		i: "gm"
	}, {
		n: "Georgia (საქართველო)",
		i: "ge"
	}, {
		n: "Germany (Deutschland)",
		i: "de"
	}, {
		n: "Ghana (Gaana)",
		i: "gh"
	}, {
		n: "Gibraltar",
		i: "gi"
	}, {
		n: "Greece (Ελλάδα)",
		i: "gr"
	}, {
		n: "Greenland (Kalaallit Nunaat)",
		i: "gl"
	}, {
		n: "Grenada",
		i: "gd"
	}, {
		n: "Guadeloupe",
		i: "gp"
	}, {
		n: "Guam",
		i: "gu"
	}, {
		n: "Guatemala",
		i: "gt"
	}, {
		n: "Guernsey",
		i: "gg"
	}, {
		n: "Guinea (Guinée)",
		i: "gn"
	}, {
		n: "Guinea-Bissau (Guiné Bissau)",
		i: "gw"
	}, {
		n: "Guyana",
		i: "gy"
	}, {
		n: "Haiti",
		i: "ht"
	}, {
		n: "Honduras",
		i: "hn"
	}, {
		n: "Hong Kong (香港)",
		i: "hk"
	}, {
		n: "Hungary (Magyarország)",
		i: "hu"
	}, {
		n: "Iceland (Ísland)",
		i: "is"
	}, {
		n: "India (भारत)",
		i: "in"
	}, {
		n: "Indonesia",
		i: "id"
	}, {
		n: "Iran (‫ایران‬‎)",
		i: "ir"
	}, {
		n: "Iraq (‫العراق‬‎)",
		i: "iq"
	}, {
		n: "Ireland",
		i: "ie"
	}, {
		n: "Isle of Man",
		i: "im"
	}, {
		n: "Israel (‫ישראל‬‎)",
		i: "il"
	}, {
		n: "Italy (Italia)",
		i: "it"
	}, {
		n: "Jamaica",
		i: "jm"
	}, {
		n: "Japan (日本)",
		i: "jp"
	}, {
		n: "Jersey",
		i: "je"
	}, {
		n: "Jordan (‫الأردن‬‎)",
		i: "jo"
	}, {
		n: "Kazakhstan (Казахстан)",
		i: "kz"
	}, {
		n: "Kenya",
		i: "ke"
	}, {
		n: "Kiribati",
		i: "ki"
	}, {
		n: "Kosovo (Kosovë)",
		i: "xk"
	}, {
		n: "Kuwait (‫الكويت‬‎)",
		i: "kw"
	}, {
		n: "Kyrgyzstan (Кыргызстан)",
		i: "kg"
	}, {
		n: "Laos (ລາວ)",
		i: "la"
	}, {
		n: "Latvia (Latvija)",
		i: "lv"
	}, {
		n: "Lebanon (‫لبنان‬‎)",
		i: "lb"
	}, {
		n: "Lesotho",
		i: "ls"
	}, {
		n: "Liberia",
		i: "lr"
	}, {
		n: "Libya (‫ليبيا‬‎)",
		i: "ly"
	}, {
		n: "Liechtenstein",
		i: "li"
	}, {
		n: "Lithuania (Lietuva)",
		i: "lt"
	}, {
		n: "Luxembourg",
		i: "lu"
	}, {
		n: "Macau (澳門)",
		i: "mo"
	}, {
		n: "Macedonia (FYROM) (Македонија)",
		i: "mk"
	}, {
		n: "Madagascar (Madagasikara)",
		i: "mg"
	}, {
		n: "Malawi",
		i: "mw"
	}, {
		n: "Malaysia",
		i: "my"
	}, {
		n: "Maldives",
		i: "mv"
	}, {
		n: "Mali",
		i: "ml"
	}, {
		n: "Malta",
		i: "mt"
	}, {
		n: "Marshall Islands",
		i: "mh"
	}, {
		n: "Martinique",
		i: "mq"
	}, {
		n: "Mauritania (‫موريتانيا‬‎)",
		i: "mr"
	}, {
		n: "Mauritius (Moris)",
		i: "mu"
	}, {
		n: "Mayotte",
		i: "yt"
	}, {
		n: "Mexico (México)",
		i: "mx"
	}, {
		n: "Micronesia",
		i: "fm"
	}, {
		n: "Moldova (Republica Moldova)",
		i: "md"
	}, {
		n: "Monaco",
		i: "mc"
	}, {
		n: "Mongolia (Монгол)",
		i: "mn"
	}, {
		n: "Montenegro (Crna Gora)",
		i: "me"
	}, {
		n: "Montserrat",
		i: "ms"
	}, {
		n: "Morocco (‫المغرب‬‎)",
		i: "ma"
	}, {
		n: "Mozambique (Moçambique)",
		i: "mz"
	}, {
		n: "Myanmar (Burma) (မြန်မာ)",
		i: "mm"
	}, {
		n: "Namibia (Namibië)",
		i: "na"
	}, {
		n: "Nauru",
		i: "nr"
	}, {
		n: "Nepal (नेपाल)",
		i: "np"
	}, {
		n: "Netherlands (Nederland)",
		i: "nl"
	}, {
		n: "New Caledonia (Nouvelle-Calédonie)",
		i: "nc"
	}, {
		n: "New Zealand",
		i: "nz"
	}, {
		n: "Nicaragua",
		i: "ni"
	}, {
		n: "Niger (Nijar)",
		i: "ne"
	}, {
		n: "Nigeria",
		i: "ng"
	}, {
		n: "Niue",
		i: "nu"
	}, {
		n: "Norfolk Island",
		i: "nf"
	}, {
		n: "North Korea (조선 민주주의 인민 공화국)",
		i: "kp"
	}, {
		n: "Northern Mariana Islands",
		i: "mp"
	}, {
		n: "Norway (Norge)",
		i: "no"
	}, {
		n: "Oman (‫عُمان‬‎)",
		i: "om"
	}, {
		n: "Pakistan (‫پاکستان‬‎)",
		i: "pk"
	}, {
		n: "Palau",
		i: "pw"
	}, {
		n: "Palestine (‫فلسطين‬‎)",
		i: "ps"
	}, {
		n: "Panama (Panamá)",
		i: "pa"
	}, {
		n: "Papua New Guinea",
		i: "pg"
	}, {
		n: "Paraguay",
		i: "py"
	}, {
		n: "Peru (Perú)",
		i: "pe"
	}, {
		n: "Philippines",
		i: "ph"
	}, {
		n: "Pitcairn Islands",
		i: "pn"
	}, {
		n: "Poland (Polska)",
		i: "pl"
	}, {
		n: "Portugal",
		i: "pt"
	}, {
		n: "Puerto Rico",
		i: "pr"
	}, {
		n: "Qatar (‫قطر‬‎)",
		i: "qa"
	}, {
		n: "Réunion (La Réunion)",
		i: "re"
	}, {
		n: "Romania (România)",
		i: "ro"
	}, {
		n: "Russia (Россия)",
		i: "ru"
	}, {
		n: "Rwanda",
		i: "rw"
	}, {
		n: "Saint Barthélemy (Saint-Barthélemy)",
		i: "bl"
	}, {
		n: "Saint Helena",
		i: "sh"
	}, {
		n: "Saint Kitts and Nevis",
		i: "kn"
	}, {
		n: "Saint Lucia",
		i: "lc"
	}, {
		n: "Saint Martin (Saint-Martin (partie française))",
		i: "mf"
	}, {
		n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
		i: "pm"
	}, {
		n: "Saint Vincent and the Grenadines",
		i: "vc"
	}, {
		n: "Samoa",
		i: "ws"
	}, {
		n: "San Marino",
		i: "sm"
	}, {
		n: "São Tomé and Príncipe (São Tomé e Príncipe)",
		i: "st"
	}, {
		n: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
		i: "sa"
	}, {
		n: "Senegal (Sénégal)",
		i: "sn"
	}, {
		n: "Serbia (Србија)",
		i: "rs"
	}, {
		n: "Seychelles",
		i: "sc"
	}, {
		n: "Sierra Leone",
		i: "sl"
	}, {
		n: "Singapore",
		i: "sg"
	}, {
		n: "Sint Maarten",
		i: "sx"
	}, {
		n: "Slovakia (Slovensko)",
		i: "sk"
	}, {
		n: "Slovenia (Slovenija)",
		i: "si"
	}, {
		n: "Solomon Islands",
		i: "sb"
	}, {
		n: "Somalia (Soomaaliya)",
		i: "so"
	}, {
		n: "South Africa",
		i: "za"
	}, {
		n: "South Georgia & South Sandwich Islands",
		i: "gs"
	}, {
		n: "South Korea (대한민국)",
		i: "kr"
	}, {
		n: "South Sudan (‫جنوب السودان‬‎)",
		i: "ss"
	}, {
		n: "Spain (España)",
		i: "es"
	}, {
		n: "Sri Lanka (ශ්‍රී ලංකාව)",
		i: "lk"
	}, {
		n: "Sudan (‫السودان‬‎)",
		i: "sd"
	}, {
		n: "Suriname",
		i: "sr"
	}, {
		n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
		i: "sj"
	}, {
		n: "Swaziland",
		i: "sz"
	}, {
		n: "Sweden (Sverige)",
		i: "se"
	}, {
		n: "Switzerland (Schweiz)",
		i: "ch"
	}, {
		n: "Syria (‫سوريا‬‎)",
		i: "sy"
	}, {
		n: "Taiwan (台灣)",
		i: "tw"
	}, {
		n: "Tajikistan",
		i: "tj"
	}, {
		n: "Tanzania",
		i: "tz"
	}, {
		n: "Thailand (ไทย)",
		i: "th"
	}, {
		n: "Timor-Leste",
		i: "tl"
	}, {
		n: "Togo",
		i: "tg"
	}, {
		n: "Tokelau",
		i: "tk"
	}, {
		n: "Tonga",
		i: "to"
	}, {
		n: "Trinidad and Tobago",
		i: "tt"
	}, {
		n: "Tunisia (‫تونس‬‎)",
		i: "tn"
	}, {
		n: "Turkey (Türkiye)",
		i: "tr"
	}, {
		n: "Turkmenistan",
		i: "tm"
	}, {
		n: "Turks and Caicos Islands",
		i: "tc"
	}, {
		n: "Tuvalu",
		i: "tv"
	}, {
		n: "Uganda",
		i: "ug"
	}, {
		n: "Ukraine (Україна)",
		i: "ua"
	}, {
		n: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
		i: "ae"
	}, {
		n: "United Kingdom",
		i: "gb"
	}, {
		n: "United States",
		i: "us"
	}, {
		n: "U.S. Minor Outlying Islands",
		i: "um"
	}, {
		n: "U.S. Virgin Islands",
		i: "vi"
	}, {
		n: "Uruguay",
		i: "uy"
	}, {
		n: "Uzbekistan (Oʻzbekiston)",
		i: "uz"
	}, {
		n: "Vanuatu",
		i: "vu"
	}, {
		n: "Vatican City (Città del Vaticano)",
		i: "va"
	}, {
		n: "Venezuela",
		i: "ve"
	}, {
		n: "Vietnam (Việt Nam)",
		i: "vn"
	}, {
		n: "Wallis and Futuna",
		i: "wf"
	}, {
		n: "Western Sahara (‫الصحراء الغربية‬‎)",
		i: "eh"
	}, {
		n: "Yemen (‫اليمن‬‎)",
		i: "ye"
	}, {
		n: "Zambia",
		i: "zm"
	}, {
		n: "Zimbabwe",
		i: "zw"
	} ], function(i, c) {
		c.name = c.n;
		c.iso2 = c.i;
		delete c.n;
		delete c.i;
	});
});