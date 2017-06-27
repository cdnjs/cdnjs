/*
International Telephone Input v1.1.4
https://github.com/Bluefieldscom/intl-tel-input.git
*/
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
    var pluginName = "intlTelInput", id = 1, // give each instance it's own id for namespaced event handling
    defaults = {
        // don't insert international dial codes
        nationalMode: false,
        // if there is just a dial code in the input: remove it on blur, and re-add it on focus
        autoHideDialCode: true,
        // default country
        defaultCountry: "",
        // character to appear between dial code and phone number
        dialCodeDelimiter: " ",
        // position the selected flag inside or outside of the input
        defaultStyling: "inside",
        // display only these countries
        onlyCountries: [],
        // the countries at the top of the list. defaults to united states and united kingdom
        preferredCountries: [ "us", "gb" ],
        // specify the path to the libphonenumber script to enable validation
        validationScript: ""
    }, keys = {
        UP: 38,
        DOWN: 40,
        ENTER: 13,
        ESC: 27,
        PLUS: 43,
        A: 65,
        Z: 90
    };
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
            // process all the data: onlyCounties, preferredCountries, defaultCountry etc
            this._processCountryData();
            // generate the markup
            this._generateMarkup();
            // set the initial state of the input value and the selected flag
            this._setInitialState();
            // start all of the event listeners: autoHideDialCode, input keyup, selectedFlag click
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
                var newCountries = [], newCountryCodes = {};
                $.each(this.options.onlyCountries, function(i, countryCode) {
                    var countryData = that._getCountryData(countryCode, true);
                    if (countryData) {
                        newCountries.push(countryData);
                        var dialCode = countryData.dialCode;
                        if (newCountryCodes[dialCode]) {
                            newCountryCodes[dialCode].push(countryCode);
                        } else {
                            newCountryCodes[dialCode] = [ countryCode ];
                        }
                    }
                });
                this.countries = newCountries;
                this.countryCodes = newCountryCodes;
            } else {
                this.countries = allCountries;
                this.countryCodes = allCountryCodes;
            }
        },
        // process preferred countries - iterate through the preferences,
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
            // telephone input
            this.telInput = $(this.element);
            // containers (mostly for positioning)
            var mainClass = "intl-tel-input";
            if (this.options.defaultStyling != "none") {
                mainClass += " pretty " + this.options.defaultStyling;
            }
            this.telInput.wrap($("<div>", {
                "class": mainClass
            }));
            var flagsContainer = $("<div>", {
                "class": "flag-dropdown"
            }).insertAfter(this.telInput);
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
            // now we can grab the dropdown height, and hide it properly
            this.dropdownHeight = this.countryList.outerHeight();
            this.countryList.removeClass("v-hide").addClass("hide");
            // this is useful in lots of places
            this.countryListItems = this.countryList.children(".country");
        },
        // add a country <li> to the countryList <ul> container
        _appendListItems: function(countries, className) {
            // we create so many DOM elements, I decided it was faster to build a temp string
            // and then add everything to the DOM in one go at the end
            var tmp = "";
            // for each country
            $.each(countries, function(i, c) {
                // open the list item
                tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
                // add the flag
                tmp += "<div class='flag " + c.iso2 + "'></div>";
                // and the country name and dial code
                tmp += "<span class='country-name'>" + c.name + "</span>";
                tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
                // close the list item
                tmp += "</li>";
            });
            this.countryList.append(tmp);
        },
        // set the initial state of the input value and the selected flag
        _setInitialState: function() {
            // if the input is pre-populated, then just update the selected flag accordingly
            if (this.telInput.val()) {
                this._updateFlagFromInputVal();
            } else {
                // input is empty, so set to the default country
                var defaultCountry;
                // check the defaultCountry option, else fall back to the first in the list
                if (this.options.defaultCountry) {
                    defaultCountry = this._getCountryData(this.options.defaultCountry, false);
                } else {
                    defaultCountry = this.preferredCountries.length ? this.preferredCountries[0] : this.countries[0];
                }
                this._selectFlag(defaultCountry.iso2);
                // if autoHideDialCode is disabled, insert the default dial code
                if (!this.options.autoHideDialCode) {
                    this._resetToDialCode(defaultCountry.dialCode);
                }
            }
        },
        // initialise the main event listeners: input keyup, and click selected flag
        _initListeners: function() {
            var that = this;
            // auto hide dial code option (ignore if in national mode)
            if (this.options.autoHideDialCode && !this.options.nationalMode) {
                this._initAutoHideDialCode();
            }
            // update flag on keyup (by extracting the dial code from the input value).
            // use keyup instead of keypress because we want to update on backspace
            // and instead of keydown because the value hasn't updated when that event is fired
            // NOTE: better to have this one listener all the time instead of starting it on focus
            // and stopping it on blur, because then you've got two listeners (focus and blur)
            this.telInput.on("keyup" + this.ns, function() {
                that._updateFlagFromInputVal();
            });
            // toggle country dropdown on click
            var selectedFlag = this.selectedFlagInner.parent();
            selectedFlag.on("click" + this.ns, function(e) {
                // only intercept this event if we're opening the dropdown
                // else let it bubble up to the top ("click-off-to-close" listener)
                // we cannot just stopPropagation as it may be needed to close another instance
                if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled")) {
                    that._showDropdown();
                }
            });
            // if the user has specified the path to the validation script
            // inject a new script element for it at the end of the body
            if (this.options.validationScript) {
                // but wait until the load event so we don't block any other requests e.g. the flags image
                $(window).load(function() {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = that.options.validationScript;
                    document.body.appendChild(script);
                });
            }
        },
        // on focus: if empty add dial code. on blur: if just dial code, then empty it
        _initAutoHideDialCode: function() {
            var that = this;
            // mousedown decides where the cursor goes, so if we're focusing
            // we must prevent this from happening
            this.telInput.on("mousedown" + this.ns, function(e) {
                if (!that.telInput.is(":focus") && !that.telInput.val()) {
                    e.preventDefault();
                    // but this also cancels the focus, so we must trigger that manually
                    that._focus();
                }
            });
            // on focus: if empty, insert the dial code for the currently selected flag
            this.telInput.on("focus" + this.ns, function() {
                if (!$.trim(that.telInput.val())) {
                    var countryData = that.getSelectedCountryData();
                    that._resetToDialCode(countryData.dialCode);
                    // after auto-inserting a dial code, if the first key they hit is '+' then assume
                    // they are entering a new number, so remove the dial code.
                    // use keypress instead of keydown because keydown gets triggered for the shift key
                    // (required to hit the + key), and instead of keyup because that shows the new '+'
                    // before removing the old one
                    that.telInput.one("keypress" + that.ns, function(e) {
                        if (e.which == keys.PLUS) {
                            that.telInput.val("");
                        }
                    });
                }
            });
            // on blur: if just a dial code then remove it
            this.telInput.on("blur" + this.ns, function() {
                var value = $.trim(that.telInput.val());
                if (value) {
                    if ($.trim(that._getDialCode(value) + that.options.dialCodeDelimiter) == value) {
                        that.telInput.val("");
                    }
                }
                that.telInput.off("keypress" + that.ns);
            });
        },
        // focus input and put the cursor at the end
        _focus: function() {
            this.telInput.focus();
            var input = this.telInput[0];
            // works for Chrome, FF, Safari, IE9+
            if (input.setSelectionRange) {
                var len = this.telInput.val().length;
                input.setSelectionRange(len, len);
            }
        },
        // show the dropdown
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
            var inputTop = this.telInput.offset().top, windowTop = $(window).scrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom)
            dropdownFitsBelow = inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
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
            // listen for up/down scrolling, enter to select, or letters to jump to country name.
            // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
            // just hit down and hold it to scroll down (no keyup event).
            // listen on the document because that's where key events are triggered if no input has focus
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
        // highlight the next/prev item in the list (and ensure it is visible)
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
        // iterate through the countries starting with the given letter
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
        // update the selected flag using the input's current value
        _updateFlagFromInputVal: function() {
            var that = this;
            // try and extract valid dial code from input
            var dialCode = this._getDialCode(this.telInput.val());
            if (dialCode) {
                // check if one of the matching countries is already selected
                var countryCodes = this.countryCodes[dialCode.replace(/\D/g, "")], alreadySelected = false;
                $.each(countryCodes, function(i, c) {
                    if (that.selectedFlagInner.hasClass(c)) {
                        alreadySelected = true;
                    }
                });
                if (!alreadySelected) {
                    this._selectFlag(countryCodes[0]);
                }
            }
        },
        // reset the input value to just a dial code
        _resetToDialCode: function(dialCode) {
            // if nationalMode is enabled then don't insert the dial code
            var value = this.options.nationalMode ? "" : "+" + dialCode + this.options.dialCodeDelimiter;
            this.telInput.val(value);
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
            this.selectedFlagInner.attr("class", "flag " + countryCode);
            // update the title attribute
            var countryData = this._getCountryData(countryCode);
            this.selectedFlagInner.parent().attr("title", countryData.name + ": +" + countryData.dialCode);
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
            if (!this.options.nationalMode) {
                this._updateNumber("+" + listItem.attr("data-dial-code"));
                this.telInput.trigger("change");
            }
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
        // check if an element is visible within it's container, else scroll until it is
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
        // replace any existing dial code with the new one
        _updateNumber: function(newDialCode) {
            var inputVal = this.telInput.val(), prevDialCode = this._getDialCode(inputVal), newNumber;
            // if the previous number contained a valid dial code, replace it
            // (if more than just a plus character)
            if (prevDialCode.length > 1) {
                newNumber = inputVal.replace(prevDialCode, newDialCode);
                // if the old number was just the dial code,
                // then we will need to add the space again
                if (inputVal == prevDialCode) {
                    newNumber += this.options.dialCodeDelimiter;
                }
            } else {
                // if the previous number didn't contain a dial code, we should persist it
                var existingNumber = inputVal && inputVal.substr(0, 1) != "+" ? $.trim(inputVal) : "";
                newNumber = newDialCode + this.options.dialCodeDelimiter + existingNumber;
            }
            this.telInput.val(newNumber);
        },
        // try and extract a valid international dial code from a full telephone number
        // Note: returns the raw string inc plus character and any whitespace/dots etc
        _getDialCode: function(inputVal) {
            var dialCode = "";
            inputVal = $.trim(inputVal);
            // only interested in international numbers (starting with a plus)
            if (inputVal.charAt(0) == "+") {
                var numericChars = "";
                // iterate over chars
                for (var i = 0; i < inputVal.length; i++) {
                    var c = inputVal.charAt(i);
                    // if char is number
                    if ($.isNumeric(c)) {
                        numericChars += c;
                        // if current numericChars make a valid dial code
                        if (this.countryCodes[numericChars]) {
                            // store the actual raw string (useful for matching later)
                            dialCode = inputVal.substring(0, i + 1);
                        }
                        // longest dial code is 4 chars
                        if (numericChars.length == 4) {
                            break;
                        }
                    }
                }
            }
            return dialCode;
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
        // validate the input val - assumes the global function isValidNumber
        // pass in true if you want to allow national numbers (no country dial code)
        isValidNumber: function(allowNational) {
            var val = $.trim(this.telInput.val()), countryData = this.getSelectedCountryData(), countryCode = allowNational ? countryData.iso2 : "";
            return window.isValidNumber(val, countryCode);
        },
        // update the selected flag, and insert the dial code
        selectCountry: function(countryCode) {
            // check if already selected
            if (!this.selectedFlagInner.hasClass(countryCode)) {
                this._selectFlag(countryCode);
                if (!this.options.autoHideDialCode) {
                    var countryData = this._getCountryData(countryCode, false);
                    this._resetToDialCode(countryData.dialCode);
                }
            }
        },
        // set the input value and update the flag
        setNumber: function(number) {
            this.telInput.val(number);
            this._updateFlagFromInputVal();
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
    // Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
    // Originally from https://github.com/mledoze/countries
    // then modified using the following JavaScript:
    /*
var result = [];
_.each(countries, function(c) {
  // ignore countries without a dial code
  if (c.callingCode[0].length) {
    result.push({
      // var locals contains country names with localised versions in brackets
      n: _.findWhere(locals, {
        countryCode: c.cca2
      }).name,
      i: c.cca2.toLowerCase(),
      d: c.callingCode[0]
    });
  }
});
JSON.stringify(result);
*/
    // then with a couple of manual re-arrangements to be alphabetical
    // then changed Kazakhstan from +76 to +7
    // then manually removed quotes from property names as not required
    // Note: using single char property names to keep filesize down
    // n = name
    // i = iso2 (2-char country code)
    // d = dial code
    var allCountries = $.each([ {
        n: "Afghanistan (‫افغانستان‬‎)",
        i: "af",
        d: "93"
    }, {
        n: "Åland Islands (Åland)",
        i: "ax",
        d: "358"
    }, {
        n: "Albania (Shqipëri)",
        i: "al",
        d: "355"
    }, {
        n: "Algeria (‫الجزائر‬‎)",
        i: "dz",
        d: "213"
    }, {
        n: "American Samoa",
        i: "as",
        d: "1684"
    }, {
        n: "Andorra",
        i: "ad",
        d: "376"
    }, {
        n: "Angola",
        i: "ao",
        d: "244"
    }, {
        n: "Anguilla",
        i: "ai",
        d: "1264"
    }, {
        n: "Antigua and Barbuda",
        i: "ag",
        d: "1268"
    }, {
        n: "Argentina",
        i: "ar",
        d: "54"
    }, {
        n: "Armenia (Հայաստան)",
        i: "am",
        d: "374"
    }, {
        n: "Aruba",
        i: "aw",
        d: "297"
    }, {
        n: "Australia",
        i: "au",
        d: "61"
    }, {
        n: "Austria (Österreich)",
        i: "at",
        d: "43"
    }, {
        n: "Azerbaijan (Azərbaycan)",
        i: "az",
        d: "994"
    }, {
        n: "Bahamas",
        i: "bs",
        d: "1242"
    }, {
        n: "Bahrain (‫البحرين‬‎)",
        i: "bh",
        d: "973"
    }, {
        n: "Bangladesh (বাংলাদেশ)",
        i: "bd",
        d: "880"
    }, {
        n: "Barbados",
        i: "bb",
        d: "1246"
    }, {
        n: "Belarus (Беларусь)",
        i: "by",
        d: "375"
    }, {
        n: "Belgium (België)",
        i: "be",
        d: "32"
    }, {
        n: "Belize",
        i: "bz",
        d: "501"
    }, {
        n: "Benin (Bénin)",
        i: "bj",
        d: "229"
    }, {
        n: "Bermuda",
        i: "bm",
        d: "1441"
    }, {
        n: "Bhutan (འབྲུག)",
        i: "bt",
        d: "975"
    }, {
        n: "Bolivia",
        i: "bo",
        d: "591"
    }, {
        n: "Caribbean Netherlands",
        i: "bq",
        d: "5997"
    }, {
        n: "Bosnia and Herzegovina (Босна и Херцеговина)",
        i: "ba",
        d: "387"
    }, {
        n: "Botswana",
        i: "bw",
        d: "267"
    }, {
        n: "Brazil (Brasil)",
        i: "br",
        d: "55"
    }, {
        n: "British Indian Ocean Territory",
        i: "io",
        d: "246"
    }, {
        n: "British Virgin Islands",
        i: "vg",
        d: "1284"
    }, {
        n: "Brunei",
        i: "bn",
        d: "673"
    }, {
        n: "Bulgaria (България)",
        i: "bg",
        d: "359"
    }, {
        n: "Burkina Faso",
        i: "bf",
        d: "226"
    }, {
        n: "Burundi (Uburundi)",
        i: "bi",
        d: "257"
    }, {
        n: "Cambodia (កម្ពុជា)",
        i: "kh",
        d: "855"
    }, {
        n: "Cameroon (Cameroun)",
        i: "cm",
        d: "237"
    }, {
        n: "Canada",
        i: "ca",
        d: "1"
    }, {
        n: "Cape Verde (Kabu Verdi)",
        i: "cv",
        d: "238"
    }, {
        n: "Cayman Islands",
        i: "ky",
        d: "1345"
    }, {
        n: "Central African Republic (République centrafricaine)",
        i: "cf",
        d: "236"
    }, {
        n: "Chad (Tchad)",
        i: "td",
        d: "235"
    }, {
        n: "Chile",
        i: "cl",
        d: "56"
    }, {
        n: "China (中国)",
        i: "cn",
        d: "86"
    }, {
        n: "Christmas Island",
        i: "cx",
        d: "61"
    }, {
        n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
        i: "cc",
        d: "61"
    }, {
        n: "Colombia",
        i: "co",
        d: "57"
    }, {
        n: "Comoros (‫جزر القمر‬‎)",
        i: "km",
        d: "269"
    }, {
        n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        i: "cd",
        d: "243"
    }, {
        n: "Congo (Republic) (Congo-Brazzaville)",
        i: "cg",
        d: "242"
    }, {
        n: "Cook Islands",
        i: "ck",
        d: "682"
    }, {
        n: "Costa Rica",
        i: "cr",
        d: "506"
    }, {
        n: "Côte d’Ivoire",
        i: "ci",
        d: "225"
    }, {
        n: "Croatia (Hrvatska)",
        i: "hr",
        d: "385"
    }, {
        n: "Cuba",
        i: "cu",
        d: "53"
    }, {
        n: "Curaçao",
        i: "cw",
        d: "5999"
    }, {
        n: "Cyprus (Κύπρος)",
        i: "cy",
        d: "357"
    }, {
        n: "Czech Republic (Česká republika)",
        i: "cz",
        d: "420"
    }, {
        n: "Denmark (Danmark)",
        i: "dk",
        d: "45"
    }, {
        n: "Djibouti",
        i: "dj",
        d: "253"
    }, {
        n: "Dominica",
        i: "dm",
        d: "1767"
    }, {
        n: "Dominican Republic (República Dominicana)",
        i: "do",
        d: "1809"
    }, {
        n: "Ecuador",
        i: "ec",
        d: "593"
    }, {
        n: "Egypt (‫مصر‬‎)",
        i: "eg",
        d: "20"
    }, {
        n: "El Salvador",
        i: "sv",
        d: "503"
    }, {
        n: "Equatorial Guinea (Guinea Ecuatorial)",
        i: "gq",
        d: "240"
    }, {
        n: "Eritrea",
        i: "er",
        d: "291"
    }, {
        n: "Estonia (Eesti)",
        i: "ee",
        d: "372"
    }, {
        n: "Ethiopia",
        i: "et",
        d: "251"
    }, {
        n: "Falkland Islands (Islas Malvinas)",
        i: "fk",
        d: "500"
    }, {
        n: "Faroe Islands (Føroyar)",
        i: "fo",
        d: "298"
    }, {
        n: "Fiji",
        i: "fj",
        d: "679"
    }, {
        n: "Finland (Suomi)",
        i: "fi",
        d: "358"
    }, {
        n: "France",
        i: "fr",
        d: "33"
    }, {
        n: "French Guiana (Guyane française)",
        i: "gf",
        d: "594"
    }, {
        n: "French Polynesia (Polynésie française)",
        i: "pf",
        d: "689"
    }, {
        n: "Gabon",
        i: "ga",
        d: "241"
    }, {
        n: "Gambia",
        i: "gm",
        d: "220"
    }, {
        n: "Georgia (საქართველო)",
        i: "ge",
        d: "995"
    }, {
        n: "Germany (Deutschland)",
        i: "de",
        d: "49"
    }, {
        n: "Ghana (Gaana)",
        i: "gh",
        d: "233"
    }, {
        n: "Gibraltar",
        i: "gi",
        d: "350"
    }, {
        n: "Greece (Ελλάδα)",
        i: "gr",
        d: "30"
    }, {
        n: "Greenland (Kalaallit Nunaat)",
        i: "gl",
        d: "299"
    }, {
        n: "Grenada",
        i: "gd",
        d: "1473"
    }, {
        n: "Guadeloupe",
        i: "gp",
        d: "590"
    }, {
        n: "Guam",
        i: "gu",
        d: "1671"
    }, {
        n: "Guatemala",
        i: "gt",
        d: "502"
    }, {
        n: "Guernsey",
        i: "gg",
        d: "44"
    }, {
        n: "Guinea (Guinée)",
        i: "gn",
        d: "224"
    }, {
        n: "Guinea-Bissau (Guiné Bissau)",
        i: "gw",
        d: "245"
    }, {
        n: "Guyana",
        i: "gy",
        d: "592"
    }, {
        n: "Haiti",
        i: "ht",
        d: "509"
    }, {
        n: "Honduras",
        i: "hn",
        d: "504"
    }, {
        n: "Hong Kong (香港)",
        i: "hk",
        d: "852"
    }, {
        n: "Hungary (Magyarország)",
        i: "hu",
        d: "36"
    }, {
        n: "Iceland (Ísland)",
        i: "is",
        d: "354"
    }, {
        n: "India (भारत)",
        i: "in",
        d: "91"
    }, {
        n: "Indonesia",
        i: "id",
        d: "62"
    }, {
        n: "Iran (‫ایران‬‎)",
        i: "ir",
        d: "98"
    }, {
        n: "Iraq (‫العراق‬‎)",
        i: "iq",
        d: "964"
    }, {
        n: "Ireland",
        i: "ie",
        d: "353"
    }, {
        n: "Isle of Man",
        i: "im",
        d: "44"
    }, {
        n: "Israel (‫ישראל‬‎)",
        i: "il",
        d: "972"
    }, {
        n: "Italy (Italia)",
        i: "it",
        d: "39"
    }, {
        n: "Jamaica",
        i: "jm",
        d: "1876"
    }, {
        n: "Japan (日本)",
        i: "jp",
        d: "81"
    }, {
        n: "Jersey",
        i: "je",
        d: "44"
    }, {
        n: "Jordan (‫الأردن‬‎)",
        i: "jo",
        d: "962"
    }, {
        n: "Kazakhstan (Казахстан)",
        i: "kz",
        d: "7"
    }, {
        n: "Kenya",
        i: "ke",
        d: "254"
    }, {
        n: "Kiribati",
        i: "ki",
        d: "686"
    }, {
        n: "Kosovo (Kosovë)",
        i: "xk",
        d: "377"
    }, {
        n: "Kuwait (‫الكويت‬‎)",
        i: "kw",
        d: "965"
    }, {
        n: "Kyrgyzstan (Кыргызстан)",
        i: "kg",
        d: "996"
    }, {
        n: "Laos (ລາວ)",
        i: "la",
        d: "856"
    }, {
        n: "Latvia (Latvija)",
        i: "lv",
        d: "371"
    }, {
        n: "Lebanon (‫لبنان‬‎)",
        i: "lb",
        d: "961"
    }, {
        n: "Lesotho",
        i: "ls",
        d: "266"
    }, {
        n: "Liberia",
        i: "lr",
        d: "231"
    }, {
        n: "Libya (‫ليبيا‬‎)",
        i: "ly",
        d: "218"
    }, {
        n: "Liechtenstein",
        i: "li",
        d: "423"
    }, {
        n: "Lithuania (Lietuva)",
        i: "lt",
        d: "370"
    }, {
        n: "Luxembourg",
        i: "lu",
        d: "352"
    }, {
        n: "Macau (澳門)",
        i: "mo",
        d: "853"
    }, {
        n: "Macedonia (FYROM) (Македонија)",
        i: "mk",
        d: "389"
    }, {
        n: "Madagascar (Madagasikara)",
        i: "mg",
        d: "261"
    }, {
        n: "Malawi",
        i: "mw",
        d: "265"
    }, {
        n: "Malaysia",
        i: "my",
        d: "60"
    }, {
        n: "Maldives",
        i: "mv",
        d: "960"
    }, {
        n: "Mali",
        i: "ml",
        d: "223"
    }, {
        n: "Malta",
        i: "mt",
        d: "356"
    }, {
        n: "Marshall Islands",
        i: "mh",
        d: "692"
    }, {
        n: "Martinique",
        i: "mq",
        d: "596"
    }, {
        n: "Mauritania (‫موريتانيا‬‎)",
        i: "mr",
        d: "222"
    }, {
        n: "Mauritius (Moris)",
        i: "mu",
        d: "230"
    }, {
        n: "Mayotte",
        i: "yt",
        d: "262"
    }, {
        n: "Mexico (México)",
        i: "mx",
        d: "52"
    }, {
        n: "Micronesia",
        i: "fm",
        d: "691"
    }, {
        n: "Moldova (Republica Moldova)",
        i: "md",
        d: "373"
    }, {
        n: "Monaco",
        i: "mc",
        d: "377"
    }, {
        n: "Mongolia (Монгол)",
        i: "mn",
        d: "976"
    }, {
        n: "Montenegro (Crna Gora)",
        i: "me",
        d: "382"
    }, {
        n: "Montserrat",
        i: "ms",
        d: "1664"
    }, {
        n: "Morocco (‫المغرب‬‎)",
        i: "ma",
        d: "212"
    }, {
        n: "Mozambique (Moçambique)",
        i: "mz",
        d: "258"
    }, {
        n: "Myanmar (Burma) (မြန်မာ)",
        i: "mm",
        d: "95"
    }, {
        n: "Namibia (Namibië)",
        i: "na",
        d: "264"
    }, {
        n: "Nauru",
        i: "nr",
        d: "674"
    }, {
        n: "Nepal (नेपाल)",
        i: "np",
        d: "977"
    }, {
        n: "Netherlands (Nederland)",
        i: "nl",
        d: "31"
    }, {
        n: "New Caledonia (Nouvelle-Calédonie)",
        i: "nc",
        d: "687"
    }, {
        n: "New Zealand",
        i: "nz",
        d: "64"
    }, {
        n: "Nicaragua",
        i: "ni",
        d: "505"
    }, {
        n: "Niger (Nijar)",
        i: "ne",
        d: "227"
    }, {
        n: "Nigeria",
        i: "ng",
        d: "234"
    }, {
        n: "Niue",
        i: "nu",
        d: "683"
    }, {
        n: "Norfolk Island",
        i: "nf",
        d: "672"
    }, {
        n: "North Korea (조선 민주주의 인민 공화국)",
        i: "kp",
        d: "850"
    }, {
        n: "Northern Mariana Islands",
        i: "mp",
        d: "1670"
    }, {
        n: "Norway (Norge)",
        i: "no",
        d: "47"
    }, {
        n: "Oman (‫عُمان‬‎)",
        i: "om",
        d: "968"
    }, {
        n: "Pakistan (‫پاکستان‬‎)",
        i: "pk",
        d: "92"
    }, {
        n: "Palau",
        i: "pw",
        d: "680"
    }, {
        n: "Palestine (‫فلسطين‬‎)",
        i: "ps",
        d: "970"
    }, {
        n: "Panama (Panamá)",
        i: "pa",
        d: "507"
    }, {
        n: "Papua New Guinea",
        i: "pg",
        d: "675"
    }, {
        n: "Paraguay",
        i: "py",
        d: "595"
    }, {
        n: "Peru (Perú)",
        i: "pe",
        d: "51"
    }, {
        n: "Philippines",
        i: "ph",
        d: "63"
    }, {
        n: "Pitcairn Islands",
        i: "pn",
        d: "64"
    }, {
        n: "Poland (Polska)",
        i: "pl",
        d: "48"
    }, {
        n: "Portugal",
        i: "pt",
        d: "351"
    }, {
        n: "Puerto Rico",
        i: "pr",
        d: "1787"
    }, {
        n: "Qatar (‫قطر‬‎)",
        i: "qa",
        d: "974"
    }, {
        n: "Réunion (La Réunion)",
        i: "re",
        d: "262"
    }, {
        n: "Romania (România)",
        i: "ro",
        d: "40"
    }, {
        n: "Russia (Россия)",
        i: "ru",
        d: "7"
    }, {
        n: "Rwanda",
        i: "rw",
        d: "250"
    }, {
        n: "Saint Barthélemy (Saint-Barthélemy)",
        i: "bl",
        d: "590"
    }, {
        n: "Saint Helena",
        i: "sh",
        d: "290"
    }, {
        n: "Saint Kitts and Nevis",
        i: "kn",
        d: "1869"
    }, {
        n: "Saint Lucia",
        i: "lc",
        d: "1758"
    }, {
        n: "Saint Martin (Saint-Martin (partie française))",
        i: "mf",
        d: "590"
    }, {
        n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        i: "pm",
        d: "508"
    }, {
        n: "Saint Vincent and the Grenadines",
        i: "vc",
        d: "1784"
    }, {
        n: "Samoa",
        i: "ws",
        d: "685"
    }, {
        n: "San Marino",
        i: "sm",
        d: "378"
    }, {
        n: "São Tomé and Príncipe (São Tomé e Príncipe)",
        i: "st",
        d: "239"
    }, {
        n: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        i: "sa",
        d: "966"
    }, {
        n: "Senegal (Sénégal)",
        i: "sn",
        d: "221"
    }, {
        n: "Serbia (Србија)",
        i: "rs",
        d: "381"
    }, {
        n: "Seychelles",
        i: "sc",
        d: "248"
    }, {
        n: "Sierra Leone",
        i: "sl",
        d: "232"
    }, {
        n: "Singapore",
        i: "sg",
        d: "65"
    }, {
        n: "Sint Maarten",
        i: "sx",
        d: "1721"
    }, {
        n: "Slovakia (Slovensko)",
        i: "sk",
        d: "421"
    }, {
        n: "Slovenia (Slovenija)",
        i: "si",
        d: "386"
    }, {
        n: "Solomon Islands",
        i: "sb",
        d: "677"
    }, {
        n: "Somalia (Soomaaliya)",
        i: "so",
        d: "252"
    }, {
        n: "South Africa",
        i: "za",
        d: "27"
    }, {
        n: "South Georgia & South Sandwich Islands",
        i: "gs",
        d: "500"
    }, {
        n: "South Korea (대한민국)",
        i: "kr",
        d: "82"
    }, {
        n: "South Sudan (‫جنوب السودان‬‎)",
        i: "ss",
        d: "211"
    }, {
        n: "Spain (España)",
        i: "es",
        d: "34"
    }, {
        n: "Sri Lanka (ශ්‍රී ලංකාව)",
        i: "lk",
        d: "94"
    }, {
        n: "Sudan (‫السودان‬‎)",
        i: "sd",
        d: "249"
    }, {
        n: "Suriname",
        i: "sr",
        d: "597"
    }, {
        n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
        i: "sj",
        d: "4779"
    }, {
        n: "Swaziland",
        i: "sz",
        d: "268"
    }, {
        n: "Sweden (Sverige)",
        i: "se",
        d: "46"
    }, {
        n: "Switzerland (Schweiz)",
        i: "ch",
        d: "41"
    }, {
        n: "Syria (‫سوريا‬‎)",
        i: "sy",
        d: "963"
    }, {
        n: "Taiwan (台灣)",
        i: "tw",
        d: "886"
    }, {
        n: "Tajikistan",
        i: "tj",
        d: "992"
    }, {
        n: "Tanzania",
        i: "tz",
        d: "255"
    }, {
        n: "Thailand (ไทย)",
        i: "th",
        d: "66"
    }, {
        n: "Timor-Leste",
        i: "tl",
        d: "670"
    }, {
        n: "Togo",
        i: "tg",
        d: "228"
    }, {
        n: "Tokelau",
        i: "tk",
        d: "690"
    }, {
        n: "Tonga",
        i: "to",
        d: "676"
    }, {
        n: "Trinidad and Tobago",
        i: "tt",
        d: "1868"
    }, {
        n: "Tunisia (‫تونس‬‎)",
        i: "tn",
        d: "216"
    }, {
        n: "Turkey (Türkiye)",
        i: "tr",
        d: "90"
    }, {
        n: "Turkmenistan",
        i: "tm",
        d: "993"
    }, {
        n: "Turks and Caicos Islands",
        i: "tc",
        d: "1649"
    }, {
        n: "Tuvalu",
        i: "tv",
        d: "688"
    }, {
        n: "Uganda",
        i: "ug",
        d: "256"
    }, {
        n: "Ukraine (Україна)",
        i: "ua",
        d: "380"
    }, {
        n: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        i: "ae",
        d: "971"
    }, {
        n: "United Kingdom",
        i: "gb",
        d: "44"
    }, {
        n: "United States",
        i: "us",
        d: "1"
    }, {
        n: "U.S. Virgin Islands",
        i: "vi",
        d: "1340"
    }, {
        n: "Uruguay",
        i: "uy",
        d: "598"
    }, {
        n: "Uzbekistan (Oʻzbekiston)",
        i: "uz",
        d: "998"
    }, {
        n: "Vanuatu",
        i: "vu",
        d: "678"
    }, {
        n: "Vatican City (Città del Vaticano)",
        i: "va",
        d: "379"
    }, {
        n: "Venezuela",
        i: "ve",
        d: "58"
    }, {
        n: "Vietnam (Việt Nam)",
        i: "vn",
        d: "84"
    }, {
        n: "Wallis and Futuna",
        i: "wf",
        d: "681"
    }, {
        n: "Western Sahara (‫الصحراء الغربية‬‎)",
        i: "eh",
        d: "212"
    }, {
        n: "Yemen (‫اليمن‬‎)",
        i: "ye",
        d: "967"
    }, {
        n: "Zambia",
        i: "zm",
        d: "260"
    }, {
        n: "Zimbabwe",
        i: "zw",
        d: "263"
    } ], function(i, c) {
        c.name = c.n;
        c.iso2 = c.i;
        c.dialCode = c.d;
        delete c.n;
        delete c.i;
        delete c.d;
    });
    // JavaScript object mapping dial code to country code.
    // This is used when the user enters a number,
    // to quickly look up the corresponding country code.
    // Generated from the above array using this JavaScript:
    /*
var uniqueDCs = _.unique(_.pluck(intlDataFull.countries, dialCode));
var cCodes = {};
_.each(uniqueDCs, function(dc) {
  cCodes[dc] = _.pluck(_.filter(intlDataFull.countries, function(c) {
    return c[dialCode] == dc;
  }), iso2);
});
 */
    // Then reference this google code project for clash priority:
    // http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/metadata.js
    // then updated vatican city to +379
    var allCountryCodes = {
        "1": [ "us", "ca" ],
        "7": [ "ru", "kz" ],
        "20": [ "eg" ],
        "27": [ "za" ],
        "30": [ "gr" ],
        "31": [ "nl" ],
        "32": [ "be" ],
        "33": [ "fr" ],
        "34": [ "es" ],
        "36": [ "hu" ],
        "39": [ "it" ],
        "40": [ "ro" ],
        "41": [ "ch" ],
        "43": [ "at" ],
        "44": [ "gb", "gg", "im", "je" ],
        "45": [ "dk" ],
        "46": [ "se" ],
        "47": [ "no" ],
        "48": [ "pl" ],
        "49": [ "de" ],
        "51": [ "pe" ],
        "52": [ "mx" ],
        "53": [ "cu" ],
        "54": [ "ar" ],
        "55": [ "br" ],
        "56": [ "cl" ],
        "57": [ "co" ],
        "58": [ "ve" ],
        "60": [ "my" ],
        "61": [ "au", "cc", "cx" ],
        "62": [ "id" ],
        "63": [ "ph" ],
        "64": [ "nz", "pn" ],
        "65": [ "sg" ],
        "66": [ "th" ],
        "81": [ "jp" ],
        "82": [ "kr" ],
        "84": [ "vn" ],
        "86": [ "cn" ],
        "90": [ "tr" ],
        "91": [ "in" ],
        "92": [ "pk" ],
        "93": [ "af" ],
        "94": [ "lk" ],
        "95": [ "mm" ],
        "98": [ "ir" ],
        "211": [ "ss" ],
        "212": [ "ma", "eh" ],
        "213": [ "dz" ],
        "216": [ "tn" ],
        "218": [ "ly" ],
        "220": [ "gm" ],
        "221": [ "sn" ],
        "222": [ "mr" ],
        "223": [ "ml" ],
        "224": [ "gn" ],
        "225": [ "ci" ],
        "226": [ "bf" ],
        "227": [ "ne" ],
        "228": [ "tg" ],
        "229": [ "bj" ],
        "230": [ "mu" ],
        "231": [ "lr" ],
        "232": [ "sl" ],
        "233": [ "gh" ],
        "234": [ "ng" ],
        "235": [ "td" ],
        "236": [ "cf" ],
        "237": [ "cm" ],
        "238": [ "cv" ],
        "239": [ "st" ],
        "240": [ "gq" ],
        "241": [ "ga" ],
        "242": [ "cg" ],
        "243": [ "cd" ],
        "244": [ "ao" ],
        "245": [ "gw" ],
        "246": [ "io" ],
        "248": [ "sc" ],
        "249": [ "sd" ],
        "250": [ "rw" ],
        "251": [ "et" ],
        "252": [ "so" ],
        "253": [ "dj" ],
        "254": [ "ke" ],
        "255": [ "tz" ],
        "256": [ "ug" ],
        "257": [ "bi" ],
        "258": [ "mz" ],
        "260": [ "zm" ],
        "261": [ "mg" ],
        "262": [ "re", "yt" ],
        "263": [ "zw" ],
        "264": [ "na" ],
        "265": [ "mw" ],
        "266": [ "ls" ],
        "267": [ "bw" ],
        "268": [ "sz" ],
        "269": [ "km" ],
        "290": [ "sh" ],
        "291": [ "er" ],
        "297": [ "aw" ],
        "298": [ "fo" ],
        "299": [ "gl" ],
        "350": [ "gi" ],
        "351": [ "pt" ],
        "352": [ "lu" ],
        "353": [ "ie" ],
        "354": [ "is" ],
        "355": [ "al" ],
        "356": [ "mt" ],
        "357": [ "cy" ],
        "358": [ "fi", "ax" ],
        "359": [ "bg" ],
        "370": [ "lt" ],
        "371": [ "lv" ],
        "372": [ "ee" ],
        "373": [ "md" ],
        "374": [ "am" ],
        "375": [ "by" ],
        "376": [ "ad" ],
        "377": [ "mc", "xk" ],
        "378": [ "sm" ],
        "379": [ "va" ],
        "380": [ "ua" ],
        "381": [ "rs" ],
        "382": [ "me" ],
        "385": [ "hr" ],
        "386": [ "si" ],
        "387": [ "ba" ],
        "389": [ "mk" ],
        "420": [ "cz" ],
        "421": [ "sk" ],
        "423": [ "li" ],
        "500": [ "fk", "gs" ],
        "501": [ "bz" ],
        "502": [ "gt" ],
        "503": [ "sv" ],
        "504": [ "hn" ],
        "505": [ "ni" ],
        "506": [ "cr" ],
        "507": [ "pa" ],
        "508": [ "pm" ],
        "509": [ "ht" ],
        "590": [ "gp", "bl", "mf" ],
        "591": [ "bo" ],
        "592": [ "gy" ],
        "593": [ "ec" ],
        "594": [ "gf" ],
        "595": [ "py" ],
        "596": [ "mq" ],
        "597": [ "sr" ],
        "598": [ "uy" ],
        "670": [ "tl" ],
        "672": [ "nf" ],
        "673": [ "bn" ],
        "674": [ "nr" ],
        "675": [ "pg" ],
        "676": [ "to" ],
        "677": [ "sb" ],
        "678": [ "vu" ],
        "679": [ "fj" ],
        "680": [ "pw" ],
        "681": [ "wf" ],
        "682": [ "ck" ],
        "683": [ "nu" ],
        "685": [ "ws" ],
        "686": [ "ki" ],
        "687": [ "nc" ],
        "688": [ "tv" ],
        "689": [ "pf" ],
        "690": [ "tk" ],
        "691": [ "fm" ],
        "692": [ "mh" ],
        "850": [ "kp" ],
        "852": [ "hk" ],
        "853": [ "mo" ],
        "855": [ "kh" ],
        "856": [ "la" ],
        "880": [ "bd" ],
        "886": [ "tw" ],
        "960": [ "mv" ],
        "961": [ "lb" ],
        "962": [ "jo" ],
        "963": [ "sy" ],
        "964": [ "iq" ],
        "965": [ "kw" ],
        "966": [ "sa" ],
        "967": [ "ye" ],
        "968": [ "om" ],
        "970": [ "ps" ],
        "971": [ "ae" ],
        "972": [ "il" ],
        "973": [ "bh" ],
        "974": [ "qa" ],
        "975": [ "bt" ],
        "976": [ "mn" ],
        "977": [ "np" ],
        "992": [ "tj" ],
        "993": [ "tm" ],
        "994": [ "az" ],
        "995": [ "ge" ],
        "996": [ "kg" ],
        "998": [ "uz" ],
        "1242": [ "bs" ],
        "1246": [ "bb" ],
        "1264": [ "ai" ],
        "1268": [ "ag" ],
        "1284": [ "vg" ],
        "1340": [ "vi" ],
        "1345": [ "ky" ],
        "1441": [ "bm" ],
        "1473": [ "gd" ],
        "1649": [ "tc" ],
        "1664": [ "ms" ],
        "1670": [ "mp" ],
        "1671": [ "gu" ],
        "1684": [ "as" ],
        "1721": [ "sx" ],
        "1758": [ "lc" ],
        "1767": [ "dm" ],
        "1784": [ "vc" ],
        "1787": [ "pr" ],
        "1809": [ "do" ],
        "1868": [ "tt" ],
        "1869": [ "kn" ],
        "1876": [ "jm" ],
        "4779": [ "sj" ],
        "5997": [ "bq" ],
        "5999": [ "cw" ]
    };
});