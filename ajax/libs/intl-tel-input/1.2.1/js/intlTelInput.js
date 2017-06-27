/*
International Telephone Input v1.2.1
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
        // make the dropdown the same width as the input
        responsiveDropdown: false,
        // specify the path to the libphonenumber script to enable validation
        validationScript: ""
    }, keys = {
        UP: 38,
        DOWN: 40,
        ENTER: 13,
        ESC: 27,
        PLUS: 43,
        A: 65,
        Z: 90,
        SPACE: 32
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
                        // add this country's dial code to the countryCodes
                        var dialCode = countryData.dialCode;
                        if (newCountryCodes[dialCode]) {
                            newCountryCodes[dialCode].push(countryCode);
                        } else {
                            newCountryCodes[dialCode] = [ countryCode ];
                        }
                    }
                });
                // maintain country priority
                for (var dialCode in newCountryCodes) {
                    if (newCountryCodes[dialCode].length > 1) {
                        var sortedCountries = [];
                        // go through all of the allCountryCodes countries for this dialCode and create a new (ordered) array of values (if they're in the newCountryCodes array)
                        for (var i = 0; i < allCountryCodes[dialCode].length; i++) {
                            var country = allCountryCodes[dialCode][i];
                            if ($.inArray(newCountryCodes[dialCode], country)) {
                                sortedCountries.push(country);
                            }
                        }
                        newCountryCodes[dialCode] = sortedCountries;
                    }
                }
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
            if (this.options.defaultStyling) {
                mainClass += " " + this.options.defaultStyling;
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
            // and set the width
            if (this.options.responsiveDropdown) {
                this.countryList.css("width", this.telInput.outerWidth());
            }
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
            var flagIsSet = false;
            // if the input is pre-populated, then just update the selected flag accordingly
            // however, if no valid international dial code was found, flag will not have been set
            if (this.telInput.val()) {
                flagIsSet = this._updateFlagFromInputVal();
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
            // hack for input nested inside label: clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again
            var label = this.telInput.closest("label");
            if (label.length) {
                label.on("click", function(e) {
                    if (that.countryList.hasClass("hide")) {
                        that.telInput.focus();
                    } else {
                        e.preventDefault();
                    }
                });
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
                var injectValidationScript = function() {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = that.options.validationScript;
                    document.body.appendChild(script);
                };
                // if the plugin is being initialised after the window.load event has already been fired
                if (windowLoaded) {
                    injectValidationScript();
                } else {
                    // wait until the load event so we don't block any other requests e.g. the flags image
                    $(window).load(injectValidationScript);
                }
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
            var query = "", queryTimer = null;
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
                } else if (e.which >= keys.A && e.which <= keys.Z || e.which == keys.SPACE) {
                    // upper case letters (note: keyup/keydown only return upper case letters)
                    // jump to countries that start with the query string
                    if (queryTimer) {
                        clearTimeout(queryTimer);
                    }
                    query += String.fromCharCode(e.which);
                    that._searchForCountry(query);
                    // if the timer hits 1 second, reset the query
                    queryTimer = setTimeout(function() {
                        query = "";
                    }, 1e3);
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
        // find the first list item whose name starts with the query string
        _searchForCountry: function(query) {
            for (var i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this.countries[i].name, query)) {
                    var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred");
                    // update highlighting and scroll
                    this._highlightListItem(listItem);
                    this._scrollTo(listItem, true);
                    break;
                }
            }
        },
        // check if (uppercase) string a starts with string b
        _startsWith: function(a, b) {
            return a.substr(0, b.length).toUpperCase() == b;
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
                // valid international dial code found
                return true;
            }
            // valid international dial code not found
            return false;
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
        _scrollTo: function(element, middle) {
            var container = this.countryList, containerHeight = container.height(), containerTop = container.offset().top, containerBottom = containerTop + containerHeight, elementHeight = element.outerHeight(), elementTop = element.offset().top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop(), middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
                // scroll up
                if (middle) {
                    newScrollTop -= middleOffset;
                }
                container.scrollTop(newScrollTop);
            } else if (elementBottom > containerBottom) {
                // scroll down
                if (middle) {
                    newScrollTop += middleOffset;
                }
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
        },
        // remove plugin
        destroy: function() {
            // stop listeners
            this.telInput.off(this.ns);
            this.selectedFlagInner.parent().off(this.ns);
            // remove markup
            var container = this.telInput.parent();
            container.before(this.telInput).remove();
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
    // Update: converted objects to arrays to save bytes!
    var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Åland Islands (Åland)", "ax", "358" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1684" ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1264" ], [ "Antigua and Barbuda", "ag", "1268" ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61" ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1242" ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1246" ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1441" ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1284" ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1" ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "5997" ], [ "Cayman Islands", "ky", "1345" ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Christmas Island", "cx", "61" ], [ "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))", "cc", "61" ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "5999" ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1767" ], [ "Dominican Republic (República Dominicana)", "do", "1809" ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358" ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1473" ], [ "Guadeloupe", "gp", "590" ], [ "Guam", "gu", "1671" ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44" ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44" ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39" ], [ "Jamaica", "jm", "1876" ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44" ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7" ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo (Kosovë)", "xk", "377" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "Macedonia (FYROM) (Македонија)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262" ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1664" ], [ "Morocco (‫المغرب‬‎)", "ma", "212" ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1670" ], [ "Norway (Norge)", "no", "47" ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Pitcairn Islands", "pn", "64" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1787" ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262" ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7" ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy (Saint-Barthélemy)", "bl", "590" ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1869" ], [ "Saint Lucia", "lc", "1758" ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590" ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1784" ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1721" ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Georgia & South Sandwich Islands", "gs", "500" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen (Svalbard og Jan Mayen)", "sj", "4779" ], [ "Swaziland", "sz", "268" ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1868" ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1649" ], [ "Tuvalu", "tv", "688" ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44" ], [ "United States", "us", "1" ], [ "U.S. Virgin Islands", "vi", "1340" ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "379" ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212" ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ] ];
    $.each(allCountries, function(i, c) {
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            dialCode: c[2]
        };
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
        "1204": [ "ca" ],
        "1236": [ "ca" ],
        "1242": [ "bs" ],
        "1246": [ "bb" ],
        "1249": [ "ca" ],
        "1250": [ "ca" ],
        "1264": [ "ai" ],
        "1268": [ "ag" ],
        "1284": [ "vg" ],
        "1289": [ "ca" ],
        "1306": [ "ca" ],
        "1340": [ "vi" ],
        "1343": [ "ca" ],
        "1345": [ "ky" ],
        "1365": [ "ca" ],
        "1387": [ "ca" ],
        "1403": [ "ca" ],
        "1416": [ "ca" ],
        "1418": [ "ca" ],
        "1431": [ "ca" ],
        "1437": [ "ca" ],
        "1438": [ "ca" ],
        "1441": [ "bm" ],
        "1450": [ "ca" ],
        "1473": [ "gd" ],
        "1506": [ "ca" ],
        "1514": [ "ca" ],
        "1519": [ "ca" ],
        "1548": [ "ca" ],
        "1579": [ "ca" ],
        "1581": [ "ca" ],
        "1587": [ "ca" ],
        "1604": [ "ca" ],
        "1613": [ "ca" ],
        "1639": [ "ca" ],
        "1647": [ "ca" ],
        "1649": [ "tc" ],
        "1664": [ "ms" ],
        "1670": [ "mp" ],
        "1671": [ "gu" ],
        "1672": [ "ca" ],
        "1684": [ "as" ],
        "1705": [ "ca" ],
        "1709": [ "ca" ],
        "1721": [ "sx" ],
        "1742": [ "ca" ],
        "1758": [ "lc" ],
        "1767": [ "dm" ],
        "1778": [ "ca" ],
        "1780": [ "ca" ],
        "1782": [ "ca" ],
        "1784": [ "vc" ],
        "1787": [ "pr" ],
        "1807": [ "ca" ],
        "1809": [ "do" ],
        "1819": [ "ca" ],
        "1825": [ "ca" ],
        "1867": [ "ca" ],
        "1868": [ "tt" ],
        "1869": [ "kn" ],
        "1873": [ "ca" ],
        "1876": [ "jm" ],
        "1902": [ "ca" ],
        "1905": [ "ca" ],
        "4779": [ "sj" ],
        "5997": [ "bq" ],
        "5999": [ "cw" ]
    };
});