/*
intl-tel-input 
version: 0.9.11
description: A jQuery plugin for entering international telephone numbers
repository: https://github.com/Bluefieldscom/intl-tel-input.git
license: MIT
author: Jack O'Connor (http://jackocnr.com)
*/
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], function($){factory($, window, document);});
    } else {
        // Browser globals
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {
"use strict";

var pluginName = "intlTelInput", id = 1, // give each instance it's own id for namespaced event handling
defaults = {
    // united states and united kingdom
    preferredCountries: [ "us", "gb" ],
    americaMode: false,
    onlyCountries: [],
    defaultStyling: "inside",
    autoHideDialCode: true,
    defaultCountry: "",
    // character to appear between dial code and phone number
    dcDelimiter: " "
};

function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this.id = id++;
    this._name = pluginName;
    this.init();
}

Plugin.prototype = {
    init: function() {
        var that = this;
        // telephone input
        this.telInput = $(this.element);
        // set the global data object
        this._setIntlData();
        // get the preferred country data
        var preferredCountries = this._getPreferredCountryData();
        this.defaultCountry = this._getDefaultCountry(preferredCountries);
        // generate the markup
        this._generateMarkup(preferredCountries);
        // trigger it now in case there is already a number in the input
        that._updateFlagFromInputVal();
        // auto hide option
        if (this.options.autoHideDialCode) {
            this._initAutoHideDialCode();
        } else if (this.telInput.val() === "") {
            // if autoHideDialCode is disabled (and input is not pre-populated),
            // insert the default dial code
            this._resetToDialCode(this.defaultCountry["calling-code"]);
        }
        // update flag on keyup
        // (by extracting the dial code from the input value)
        this.telInput.keyup(function() {
            that._updateFlagFromInputVal();
        });
        // toggle country dropdown on click
        this.selectedFlag.click(function(e) {
            // only intercept this event if we're opening the dropdown
            // else let it bubble up to the top ("click-off-to-close" listener)
            if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled")) {
                that._showDropdown();
            }
        });
        // when mouse over a list item, just highlight that one
        // we add the class "highlight", so if they hit "enter" we know which one to select
        this.countryListItems.mouseover(function() {
            that._highlightListItem($(this));
        });
        // listen for country selection
        this.countryListItems.click(function(e) {
            var listItem = $(e.currentTarget);
            that._selectListItem(listItem);
        });
    },
    // end of init()
    /********************
     *  PRIVATE METHODS
     ********************/
    // process onlyCountries array if present
    _setIntlData: function() {
        var that = this;
        if (this.options.onlyCountries.length > 0) {
            var newCountries = [], newCountryCodes = {};
            $.each(this.options.onlyCountries, function(i, countryCode) {
                var countryData = that._getCountryData(countryCode, true);
                if (countryData) {
                    newCountries.push(countryData);
                    var callingCode = countryData["calling-code"];
                    if (newCountryCodes[callingCode]) {
                        newCountryCodes[callingCode].push(countryCode);
                    } else {
                        newCountryCodes[callingCode] = [ countryCode ];
                    }
                }
            });
            window.intlData = {
                countries: newCountries,
                countryCodes: newCountryCodes
            };
        } else {
            window.intlData = intlDataFull;
        }
    },
    // process preferred countries - iterate through the preferences,
    // finding the relevant data from the provided intlData.countries array
    _getPreferredCountryData: function() {
        var that = this, preferredCountries = [];
        $.each(this.options.preferredCountries, function(i, countryCode) {
            var countryData = that._getCountryData(countryCode, false);
            if (countryData) {
                preferredCountries.push(countryData);
            }
        });
        return preferredCountries;
    },
    _getDefaultCountry: function(preferredCountries) {
        // if the default country option is set then use it
        if (this.options.defaultCountry) {
            return this._getCountryData(this.options.defaultCountry, false);
        } else {
            return preferredCountries.length ? preferredCountries[0] : intlData.countries[0];
        }
    },
    _generateMarkup: function(preferredCountries) {
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
        this.selectedFlag = $("<div>", {
            "class": "selected-flag"
        }).appendTo(flagsContainer);
        // here we default to the first country in the list
        this.selectedFlagInner = $("<div>", {
            "class": "flag " + this.defaultCountry.cca2
        }).appendTo(this.selectedFlag);
        // CSS triangle
        $("<div>", {
            "class": "down-arrow"
        }).appendTo(this.selectedFlagInner);
        // country list contains: preferred countries, then divider, then all countries
        this.countryList = $("<ul>", {
            "class": "country-list hide"
        }).appendTo(flagsContainer);
        if (preferredCountries.length) {
            this._appendListItems(preferredCountries, "preferred");
            $("<li>", {
                "class": "divider"
            }).appendTo(this.countryList);
        }
        this._appendListItems(intlData.countries, "");
        this.countryListItems = this.countryList.children(".country");
        // auto select the top one
        this.countryListItems.first().addClass("active");
    },
    _initAutoHideDialCode: function() {
        var that = this;
        // on focusin: if empty, insert the dial code for the currently selected flag
        this.telInput.focusin(function() {
            var value = $.trim(that.telInput.val());
            if (value.length === 0) {
                var countryCode = that.selectedFlagInner.attr("class").split(" ")[1];
                var countryData = that._getCountryData(countryCode, false);
                that._resetToDialCode(countryData["calling-code"]);
            }
        });
        // on focusout: if just a dial code then remove it
        this.telInput.focusout(function() {
            var value = $.trim(that.telInput.val());
            if (value.length > 0) {
                // remove delimiter for comparison
                var delimiterIndex = value.indexOf(that.options.dcDelimiter);
                if (delimiterIndex != -1) {
                    value = value.substring(0, delimiterIndex);
                }
                if (that._getDialCode(value) == value) {
                    that.telInput.val("");
                }
            }
        });
    },
    _showDropdown: function() {
        var that = this;
        // update highlighting and scroll to active list item
        var activeListItem = this.countryList.children(".active");
        this._highlightListItem(activeListItem);
        // show it
        this.countryList.removeClass("hide");
        this._scrollTo(activeListItem);
        // click off to close
        // (except when this initial opening click is bubbling up)
        var isOpening = true;
        $("html").bind("click.intlTelInput" + this.id, function(e) {
            if (!isOpening) {
                that._closeDropdown();
            }
            isOpening = false;
        });
        // listen for typing
        $(document).bind("keydown.intlTelInput" + this.id, function(e) {
            // prevent down key from scrolling the whole page,
            // and enter key from submitting a form etc
            e.preventDefault();
            if (e.which == 38 || e.which == 40) {
                // up (38) and down (40) to navigate
                that._handleUpDownKey(e.which);
            } else if (e.which == 13) {
                // enter (13) to select
                var currentCountry = that.countryList.children(".highlight").first();
                if (currentCountry.length) {
                    that._selectListItem(currentCountry);
                }
            } else if (e.which == 27) {
                // esc (27) to close
                that._closeDropdown();
            } else if (e.which >= 65 && e.which <= 90) {
                // upper case letters (65-90) (note: keyup/keydown only return upper case letters)
                // cycle through countries beginning with that letter
                that._handleLetterKey(e.which);
            }
        });
    },
    _handleUpDownKey: function(key) {
        var current = this.countryList.children(".highlight").first();
        var next = key == 38 ? current.prev() : current.next();
        if (next.length) {
            // skip the divider
            if (next.hasClass("divider")) {
                next = key == 38 ? next.prev() : next.next();
            }
            this._highlightListItem(next);
            this._scrollTo(next);
        }
    },
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
        var that = this, countryCode, alreadySelected = false;
        // try and extract valid dial code from input
        var dialCode = this._getDialCode(this.telInput.val());
        if (dialCode) {
            // check if one of the matching countries is already selected
            var countryCodes = intlData.countryCodes[dialCode.replace(/\D/g, "")];
            $.each(countryCodes, function(i, c) {
                if (that.selectedFlagInner.hasClass(c)) {
                    alreadySelected = true;
                }
            });
            countryCode = countryCodes[0];
        } else {
            // else default to dialcode of the first preferred country
            countryCode = this.defaultCountry.cca2;
        }
        if (!alreadySelected) {
            this._selectFlag(countryCode);
        }
    },
    // reset the input value to just a dial code
    _resetToDialCode: function(dialCode) {
        // if the dialCode is for America, and americaMode is enabled, then don't insert the dial code
        var value = dialCode == "1" && this.options.americaMode ? "" : "+" + dialCode + this.options.dcDelimiter;
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
        var countryList = ignoreOnlyCountriesOption ? intlDataFull.countries : intlData.countries;
        for (var i = 0; i < countryList.length; i++) {
            if (countryList[i].cca2 == countryCode) {
                return countryList[i];
            }
        }
    },
    // update the selected flag and the active list item
    _selectFlag: function(countryCode) {
        this.selectedFlagInner.attr("class", "flag " + countryCode);
        // and update the active list item
        var listItem = this.countryListItems.children(".flag." + countryCode).parent();
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
        var newNumber = this._updateNumber("+" + listItem.attr("data-dial-code"));
        this.telInput.val(newNumber);
        this.telInput.trigger("change");
        // focus the input
        this.telInput.focus();
    },
    // close the dropdown and unbind any listeners
    _closeDropdown: function() {
        this.countryList.addClass("hide");
        $(document).unbind("keydown.intlTelInput" + this.id);
        $("html").unbind("click.intlTelInput" + this.id);
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
                newNumber += this.options.dcDelimiter;
            }
        } else if (inputVal.length && inputVal.substr(0, 1) != "+") {
            // previous number didn't contain a dial code, so persist it
            newNumber = newDialCode + this.options.dcDelimiter + $.trim(inputVal);
        } else {
            // previous number contained an invalid dial code, so wipe it
            newNumber = newDialCode + this.options.dcDelimiter;
        }
        // if americaMode is enabled, we dont display the dial code for american numbers
        if (this.options.americaMode && newNumber.substring(0, 3) == "+1" + this.options.dcDelimiter) {
            newNumber = newNumber.substring(3);
        }
        return newNumber;
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
                    if (intlData.countryCodes[numericChars]) {
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
    // add a country <li> to the countryList <ul> container
    _appendListItems: function(countries, className) {
        // we create so many DOM elements, I decided it was faster to build a temp string
        // and then add everything to the DOM in one go at the end
        var tmp = "";
        // for each country
        $.each(countries, function(i, c) {
            // open the list item
            tmp += "<li class='country " + className + "' data-dial-code='" + c["calling-code"] + "' data-country-code='" + c.cca2 + "'>";
            // add the flag
            tmp += "<div class='flag " + c.cca2 + "'></div>";
            // and the country name and dial code
            tmp += "<span class='country-name'>" + c.name + "</span>";
            tmp += "<span class='dial-code'>+" + c["calling-code"] + "</span>";
            // close the list item
            tmp += "</li>";
        });
        this.countryList.append(tmp);
    },
    /********************
     *  PUBLIC METHODS
     ********************/
    // set the input value and update the flag
    setNumber: function(number) {
        this.telInput.val(number);
        this._updateFlagFromInputVal();
    },
    // update the selected flag, and insert the dial code
    selectCountry: function(countryCode) {
        // check if already selected
        if (!this.selectedFlagInner.hasClass(countryCode)) {
            this._selectFlag(countryCode);
            if (!this.options.autoHideDialCode) {
                var countryData = this._getCountryData(countryCode, false);
                this._resetToDialCode(countryData["calling-code"]);
            }
        }
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
    return intlDataFull;
};

// set the country data object
$.fn[pluginName].setCountryData = function(obj) {
    intlDataFull = obj;
};

// Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
// jshint -W100
// Namespaced to prevent clashes
var intlDataFull = {
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
        name: _.findWhere(locals, {
          countryCode: c.cca2
        }).name,
        cca2: c.cca2.toLowerCase(),
        'calling-code': c.callingCode[0]
      });
    }
  });
  JSON.stringify(result);
  */
    // then with a couple of manual re-arrangements to be alphabetical
    // then changed Kazakhstan from +76 to +7
    countries: [ {
        name: "Afghanistan (‫افغانستان‬‎)",
        cca2: "af",
        "calling-code": "93"
    }, {
        name: "Åland Islands (Åland)",
        cca2: "ax",
        "calling-code": "358"
    }, {
        name: "Albania (Shqipëri)",
        cca2: "al",
        "calling-code": "355"
    }, {
        name: "Algeria (‫الجزائر‬‎)",
        cca2: "dz",
        "calling-code": "213"
    }, {
        name: "American Samoa",
        cca2: "as",
        "calling-code": "1684"
    }, {
        name: "Andorra",
        cca2: "ad",
        "calling-code": "376"
    }, {
        name: "Angola",
        cca2: "ao",
        "calling-code": "244"
    }, {
        name: "Anguilla",
        cca2: "ai",
        "calling-code": "1264"
    }, {
        name: "Antigua and Barbuda",
        cca2: "ag",
        "calling-code": "1268"
    }, {
        name: "Argentina",
        cca2: "ar",
        "calling-code": "54"
    }, {
        name: "Armenia (Հայաստան)",
        cca2: "am",
        "calling-code": "374"
    }, {
        name: "Aruba",
        cca2: "aw",
        "calling-code": "297"
    }, {
        name: "Australia",
        cca2: "au",
        "calling-code": "61"
    }, {
        name: "Austria (Österreich)",
        cca2: "at",
        "calling-code": "43"
    }, {
        name: "Azerbaijan (Azərbaycan)",
        cca2: "az",
        "calling-code": "994"
    }, {
        name: "Bahamas",
        cca2: "bs",
        "calling-code": "1242"
    }, {
        name: "Bahrain (‫البحرين‬‎)",
        cca2: "bh",
        "calling-code": "973"
    }, {
        name: "Bangladesh (বাংলাদেশ)",
        cca2: "bd",
        "calling-code": "880"
    }, {
        name: "Barbados",
        cca2: "bb",
        "calling-code": "1246"
    }, {
        name: "Belarus (Беларусь)",
        cca2: "by",
        "calling-code": "375"
    }, {
        name: "Belgium (België)",
        cca2: "be",
        "calling-code": "32"
    }, {
        name: "Belize",
        cca2: "bz",
        "calling-code": "501"
    }, {
        name: "Benin (Bénin)",
        cca2: "bj",
        "calling-code": "229"
    }, {
        name: "Bermuda",
        cca2: "bm",
        "calling-code": "1441"
    }, {
        name: "Bhutan (འབྲུག)",
        cca2: "bt",
        "calling-code": "975"
    }, {
        name: "Bolivia",
        cca2: "bo",
        "calling-code": "591"
    }, {
        name: "Caribbean Netherlands",
        cca2: "bq",
        "calling-code": "5997"
    }, {
        name: "Bosnia and Herzegovina (Босна и Херцеговина)",
        cca2: "ba",
        "calling-code": "387"
    }, {
        name: "Botswana",
        cca2: "bw",
        "calling-code": "267"
    }, {
        name: "Brazil (Brasil)",
        cca2: "br",
        "calling-code": "55"
    }, {
        name: "British Indian Ocean Territory",
        cca2: "io",
        "calling-code": "246"
    }, {
        name: "British Virgin Islands",
        cca2: "vg",
        "calling-code": "1284"
    }, {
        name: "Brunei",
        cca2: "bn",
        "calling-code": "673"
    }, {
        name: "Bulgaria (България)",
        cca2: "bg",
        "calling-code": "359"
    }, {
        name: "Burkina Faso",
        cca2: "bf",
        "calling-code": "226"
    }, {
        name: "Burundi (Uburundi)",
        cca2: "bi",
        "calling-code": "257"
    }, {
        name: "Cambodia (កម្ពុជា)",
        cca2: "kh",
        "calling-code": "855"
    }, {
        name: "Cameroon (Cameroun)",
        cca2: "cm",
        "calling-code": "237"
    }, {
        name: "Canada",
        cca2: "ca",
        "calling-code": "1"
    }, {
        name: "Cape Verde (Kabu Verdi)",
        cca2: "cv",
        "calling-code": "238"
    }, {
        name: "Cayman Islands",
        cca2: "ky",
        "calling-code": "1345"
    }, {
        name: "Central African Republic (République centrafricaine)",
        cca2: "cf",
        "calling-code": "236"
    }, {
        name: "Chad (Tchad)",
        cca2: "td",
        "calling-code": "235"
    }, {
        name: "Chile",
        cca2: "cl",
        "calling-code": "56"
    }, {
        name: "China (中国)",
        cca2: "cn",
        "calling-code": "86"
    }, {
        name: "Christmas Island",
        cca2: "cx",
        "calling-code": "61"
    }, {
        name: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
        cca2: "cc",
        "calling-code": "61"
    }, {
        name: "Colombia",
        cca2: "co",
        "calling-code": "57"
    }, {
        name: "Comoros (‫جزر القمر‬‎)",
        cca2: "km",
        "calling-code": "269"
    }, {
        name: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        cca2: "cd",
        "calling-code": "243"
    }, {
        name: "Congo (Republic) (Congo-Brazzaville)",
        cca2: "cg",
        "calling-code": "242"
    }, {
        name: "Cook Islands",
        cca2: "ck",
        "calling-code": "682"
    }, {
        name: "Costa Rica",
        cca2: "cr",
        "calling-code": "506"
    }, {
        name: "Côte d’Ivoire",
        cca2: "ci",
        "calling-code": "225"
    }, {
        name: "Croatia (Hrvatska)",
        cca2: "hr",
        "calling-code": "385"
    }, {
        name: "Cuba",
        cca2: "cu",
        "calling-code": "53"
    }, {
        name: "Curaçao",
        cca2: "cw",
        "calling-code": "5999"
    }, {
        name: "Cyprus (Κύπρος)",
        cca2: "cy",
        "calling-code": "357"
    }, {
        name: "Czech Republic (Česká republika)",
        cca2: "cz",
        "calling-code": "420"
    }, {
        name: "Denmark (Danmark)",
        cca2: "dk",
        "calling-code": "45"
    }, {
        name: "Djibouti",
        cca2: "dj",
        "calling-code": "253"
    }, {
        name: "Dominica",
        cca2: "dm",
        "calling-code": "1767"
    }, {
        name: "Dominican Republic (República Dominicana)",
        cca2: "do",
        "calling-code": "1809"
    }, {
        name: "Ecuador",
        cca2: "ec",
        "calling-code": "593"
    }, {
        name: "Egypt (‫مصر‬‎)",
        cca2: "eg",
        "calling-code": "20"
    }, {
        name: "El Salvador",
        cca2: "sv",
        "calling-code": "503"
    }, {
        name: "Equatorial Guinea (Guinea Ecuatorial)",
        cca2: "gq",
        "calling-code": "240"
    }, {
        name: "Eritrea",
        cca2: "er",
        "calling-code": "291"
    }, {
        name: "Estonia (Eesti)",
        cca2: "ee",
        "calling-code": "372"
    }, {
        name: "Ethiopia",
        cca2: "et",
        "calling-code": "251"
    }, {
        name: "Falkland Islands (Islas Malvinas)",
        cca2: "fk",
        "calling-code": "500"
    }, {
        name: "Faroe Islands (Føroyar)",
        cca2: "fo",
        "calling-code": "298"
    }, {
        name: "Fiji",
        cca2: "fj",
        "calling-code": "679"
    }, {
        name: "Finland (Suomi)",
        cca2: "fi",
        "calling-code": "358"
    }, {
        name: "France",
        cca2: "fr",
        "calling-code": "33"
    }, {
        name: "French Guiana (Guyane française)",
        cca2: "gf",
        "calling-code": "594"
    }, {
        name: "French Polynesia (Polynésie française)",
        cca2: "pf",
        "calling-code": "689"
    }, {
        name: "Gabon",
        cca2: "ga",
        "calling-code": "241"
    }, {
        name: "Gambia",
        cca2: "gm",
        "calling-code": "220"
    }, {
        name: "Georgia (საქართველო)",
        cca2: "ge",
        "calling-code": "995"
    }, {
        name: "Germany (Deutschland)",
        cca2: "de",
        "calling-code": "49"
    }, {
        name: "Ghana (Gaana)",
        cca2: "gh",
        "calling-code": "233"
    }, {
        name: "Gibraltar",
        cca2: "gi",
        "calling-code": "350"
    }, {
        name: "Greece (Ελλάδα)",
        cca2: "gr",
        "calling-code": "30"
    }, {
        name: "Greenland (Kalaallit Nunaat)",
        cca2: "gl",
        "calling-code": "299"
    }, {
        name: "Grenada",
        cca2: "gd",
        "calling-code": "1473"
    }, {
        name: "Guadeloupe",
        cca2: "gp",
        "calling-code": "590"
    }, {
        name: "Guam",
        cca2: "gu",
        "calling-code": "1671"
    }, {
        name: "Guatemala",
        cca2: "gt",
        "calling-code": "502"
    }, {
        name: "Guernsey",
        cca2: "gg",
        "calling-code": "44"
    }, {
        name: "Guinea (Guinée)",
        cca2: "gn",
        "calling-code": "224"
    }, {
        name: "Guinea-Bissau (Guiné Bissau)",
        cca2: "gw",
        "calling-code": "245"
    }, {
        name: "Guyana",
        cca2: "gy",
        "calling-code": "592"
    }, {
        name: "Haiti",
        cca2: "ht",
        "calling-code": "509"
    }, {
        name: "Honduras",
        cca2: "hn",
        "calling-code": "504"
    }, {
        name: "Hong Kong (香港)",
        cca2: "hk",
        "calling-code": "852"
    }, {
        name: "Hungary (Magyarország)",
        cca2: "hu",
        "calling-code": "36"
    }, {
        name: "Iceland (Ísland)",
        cca2: "is",
        "calling-code": "354"
    }, {
        name: "India (भारत)",
        cca2: "in",
        "calling-code": "91"
    }, {
        name: "Indonesia",
        cca2: "id",
        "calling-code": "62"
    }, {
        name: "Iran (‫ایران‬‎)",
        cca2: "ir",
        "calling-code": "98"
    }, {
        name: "Iraq (‫العراق‬‎)",
        cca2: "iq",
        "calling-code": "964"
    }, {
        name: "Ireland",
        cca2: "ie",
        "calling-code": "353"
    }, {
        name: "Isle of Man",
        cca2: "im",
        "calling-code": "44"
    }, {
        name: "Israel (‫ישראל‬‎)",
        cca2: "il",
        "calling-code": "972"
    }, {
        name: "Italy (Italia)",
        cca2: "it",
        "calling-code": "39"
    }, {
        name: "Jamaica",
        cca2: "jm",
        "calling-code": "1876"
    }, {
        name: "Japan (日本)",
        cca2: "jp",
        "calling-code": "81"
    }, {
        name: "Jersey",
        cca2: "je",
        "calling-code": "44"
    }, {
        name: "Jordan (‫الأردن‬‎)",
        cca2: "jo",
        "calling-code": "962"
    }, {
        name: "Kazakhstan (Казахстан)",
        cca2: "kz",
        "calling-code": "7"
    }, {
        name: "Kenya",
        cca2: "ke",
        "calling-code": "254"
    }, {
        name: "Kiribati",
        cca2: "ki",
        "calling-code": "686"
    }, {
        name: "Kosovo (Kosovë)",
        cca2: "xk",
        "calling-code": "377"
    }, {
        name: "Kuwait (‫الكويت‬‎)",
        cca2: "kw",
        "calling-code": "965"
    }, {
        name: "Kyrgyzstan (Кыргызстан)",
        cca2: "kg",
        "calling-code": "996"
    }, {
        name: "Laos (ລາວ)",
        cca2: "la",
        "calling-code": "856"
    }, {
        name: "Latvia (Latvija)",
        cca2: "lv",
        "calling-code": "371"
    }, {
        name: "Lebanon (‫لبنان‬‎)",
        cca2: "lb",
        "calling-code": "961"
    }, {
        name: "Lesotho",
        cca2: "ls",
        "calling-code": "266"
    }, {
        name: "Liberia",
        cca2: "lr",
        "calling-code": "231"
    }, {
        name: "Libya (‫ليبيا‬‎)",
        cca2: "ly",
        "calling-code": "218"
    }, {
        name: "Liechtenstein",
        cca2: "li",
        "calling-code": "423"
    }, {
        name: "Lithuania (Lietuva)",
        cca2: "lt",
        "calling-code": "370"
    }, {
        name: "Luxembourg",
        cca2: "lu",
        "calling-code": "352"
    }, {
        name: "Macau (澳門)",
        cca2: "mo",
        "calling-code": "853"
    }, {
        name: "Macedonia (FYROM) (Македонија)",
        cca2: "mk",
        "calling-code": "389"
    }, {
        name: "Madagascar (Madagasikara)",
        cca2: "mg",
        "calling-code": "261"
    }, {
        name: "Malawi",
        cca2: "mw",
        "calling-code": "265"
    }, {
        name: "Malaysia",
        cca2: "my",
        "calling-code": "60"
    }, {
        name: "Maldives",
        cca2: "mv",
        "calling-code": "960"
    }, {
        name: "Mali",
        cca2: "ml",
        "calling-code": "223"
    }, {
        name: "Malta",
        cca2: "mt",
        "calling-code": "356"
    }, {
        name: "Marshall Islands",
        cca2: "mh",
        "calling-code": "692"
    }, {
        name: "Martinique",
        cca2: "mq",
        "calling-code": "596"
    }, {
        name: "Mauritania (‫موريتانيا‬‎)",
        cca2: "mr",
        "calling-code": "222"
    }, {
        name: "Mauritius (Moris)",
        cca2: "mu",
        "calling-code": "230"
    }, {
        name: "Mayotte",
        cca2: "yt",
        "calling-code": "262"
    }, {
        name: "Mexico (México)",
        cca2: "mx",
        "calling-code": "52"
    }, {
        name: "Micronesia",
        cca2: "fm",
        "calling-code": "691"
    }, {
        name: "Moldova (Republica Moldova)",
        cca2: "md",
        "calling-code": "373"
    }, {
        name: "Monaco",
        cca2: "mc",
        "calling-code": "377"
    }, {
        name: "Mongolia (Монгол)",
        cca2: "mn",
        "calling-code": "976"
    }, {
        name: "Montenegro (Crna Gora)",
        cca2: "me",
        "calling-code": "382"
    }, {
        name: "Montserrat",
        cca2: "ms",
        "calling-code": "1664"
    }, {
        name: "Morocco (‫المغرب‬‎)",
        cca2: "ma",
        "calling-code": "212"
    }, {
        name: "Mozambique (Moçambique)",
        cca2: "mz",
        "calling-code": "258"
    }, {
        name: "Myanmar (Burma) (မြန်မာ)",
        cca2: "mm",
        "calling-code": "95"
    }, {
        name: "Namibia (Namibië)",
        cca2: "na",
        "calling-code": "264"
    }, {
        name: "Nauru",
        cca2: "nr",
        "calling-code": "674"
    }, {
        name: "Nepal (नेपाल)",
        cca2: "np",
        "calling-code": "977"
    }, {
        name: "Netherlands (Nederland)",
        cca2: "nl",
        "calling-code": "31"
    }, {
        name: "New Caledonia (Nouvelle-Calédonie)",
        cca2: "nc",
        "calling-code": "687"
    }, {
        name: "New Zealand",
        cca2: "nz",
        "calling-code": "64"
    }, {
        name: "Nicaragua",
        cca2: "ni",
        "calling-code": "505"
    }, {
        name: "Niger (Nijar)",
        cca2: "ne",
        "calling-code": "227"
    }, {
        name: "Nigeria",
        cca2: "ng",
        "calling-code": "234"
    }, {
        name: "Niue",
        cca2: "nu",
        "calling-code": "683"
    }, {
        name: "Norfolk Island",
        cca2: "nf",
        "calling-code": "672"
    }, {
        name: "North Korea (조선 민주주의 인민 공화국)",
        cca2: "kp",
        "calling-code": "850"
    }, {
        name: "Northern Mariana Islands",
        cca2: "mp",
        "calling-code": "1670"
    }, {
        name: "Norway (Norge)",
        cca2: "no",
        "calling-code": "47"
    }, {
        name: "Oman (‫عُمان‬‎)",
        cca2: "om",
        "calling-code": "968"
    }, {
        name: "Pakistan (‫پاکستان‬‎)",
        cca2: "pk",
        "calling-code": "92"
    }, {
        name: "Palau",
        cca2: "pw",
        "calling-code": "680"
    }, {
        name: "Palestine (‫فلسطين‬‎)",
        cca2: "ps",
        "calling-code": "970"
    }, {
        name: "Panama (Panamá)",
        cca2: "pa",
        "calling-code": "507"
    }, {
        name: "Papua New Guinea",
        cca2: "pg",
        "calling-code": "675"
    }, {
        name: "Paraguay",
        cca2: "py",
        "calling-code": "595"
    }, {
        name: "Peru (Perú)",
        cca2: "pe",
        "calling-code": "51"
    }, {
        name: "Philippines",
        cca2: "ph",
        "calling-code": "63"
    }, {
        name: "Pitcairn Islands",
        cca2: "pn",
        "calling-code": "64"
    }, {
        name: "Poland (Polska)",
        cca2: "pl",
        "calling-code": "48"
    }, {
        name: "Portugal",
        cca2: "pt",
        "calling-code": "351"
    }, {
        name: "Puerto Rico",
        cca2: "pr",
        "calling-code": "1787"
    }, {
        name: "Qatar (‫قطر‬‎)",
        cca2: "qa",
        "calling-code": "974"
    }, {
        name: "Réunion (La Réunion)",
        cca2: "re",
        "calling-code": "262"
    }, {
        name: "Romania (România)",
        cca2: "ro",
        "calling-code": "40"
    }, {
        name: "Russia (Россия)",
        cca2: "ru",
        "calling-code": "7"
    }, {
        name: "Rwanda",
        cca2: "rw",
        "calling-code": "250"
    }, {
        name: "Saint Barthélemy (Saint-Barthélemy)",
        cca2: "bl",
        "calling-code": "590"
    }, {
        name: "Saint Helena",
        cca2: "sh",
        "calling-code": "290"
    }, {
        name: "Saint Kitts and Nevis",
        cca2: "kn",
        "calling-code": "1869"
    }, {
        name: "Saint Lucia",
        cca2: "lc",
        "calling-code": "1758"
    }, {
        name: "Saint Martin (Saint-Martin (partie française))",
        cca2: "mf",
        "calling-code": "590"
    }, {
        name: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        cca2: "pm",
        "calling-code": "508"
    }, {
        name: "Saint Vincent and the Grenadines",
        cca2: "vc",
        "calling-code": "1784"
    }, {
        name: "Samoa",
        cca2: "ws",
        "calling-code": "685"
    }, {
        name: "San Marino",
        cca2: "sm",
        "calling-code": "378"
    }, {
        name: "São Tomé and Príncipe (São Tomé e Príncipe)",
        cca2: "st",
        "calling-code": "239"
    }, {
        name: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        cca2: "sa",
        "calling-code": "966"
    }, {
        name: "Senegal (Sénégal)",
        cca2: "sn",
        "calling-code": "221"
    }, {
        name: "Serbia (Србија)",
        cca2: "rs",
        "calling-code": "381"
    }, {
        name: "Seychelles",
        cca2: "sc",
        "calling-code": "248"
    }, {
        name: "Sierra Leone",
        cca2: "sl",
        "calling-code": "232"
    }, {
        name: "Singapore",
        cca2: "sg",
        "calling-code": "65"
    }, {
        name: "Sint Maarten",
        cca2: "sx",
        "calling-code": "1721"
    }, {
        name: "Slovakia (Slovensko)",
        cca2: "sk",
        "calling-code": "421"
    }, {
        name: "Slovenia (Slovenija)",
        cca2: "si",
        "calling-code": "386"
    }, {
        name: "Solomon Islands",
        cca2: "sb",
        "calling-code": "677"
    }, {
        name: "Somalia (Soomaaliya)",
        cca2: "so",
        "calling-code": "252"
    }, {
        name: "South Africa",
        cca2: "za",
        "calling-code": "27"
    }, {
        name: "South Georgia & South Sandwich Islands",
        cca2: "gs",
        "calling-code": "500"
    }, {
        name: "South Korea (대한민국)",
        cca2: "kr",
        "calling-code": "82"
    }, {
        name: "South Sudan (‫جنوب السودان‬‎)",
        cca2: "ss",
        "calling-code": "211"
    }, {
        name: "Spain (España)",
        cca2: "es",
        "calling-code": "34"
    }, {
        name: "Sri Lanka (ශ්‍රී ලංකාව)",
        cca2: "lk",
        "calling-code": "94"
    }, {
        name: "Sudan (‫السودان‬‎)",
        cca2: "sd",
        "calling-code": "249"
    }, {
        name: "Suriname",
        cca2: "sr",
        "calling-code": "597"
    }, {
        name: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
        cca2: "sj",
        "calling-code": "4779"
    }, {
        name: "Swaziland",
        cca2: "sz",
        "calling-code": "268"
    }, {
        name: "Sweden (Sverige)",
        cca2: "se",
        "calling-code": "46"
    }, {
        name: "Switzerland (Schweiz)",
        cca2: "ch",
        "calling-code": "41"
    }, {
        name: "Syria (‫سوريا‬‎)",
        cca2: "sy",
        "calling-code": "963"
    }, {
        name: "Taiwan (台灣)",
        cca2: "tw",
        "calling-code": "886"
    }, {
        name: "Tajikistan",
        cca2: "tj",
        "calling-code": "992"
    }, {
        name: "Tanzania",
        cca2: "tz",
        "calling-code": "255"
    }, {
        name: "Thailand (ไทย)",
        cca2: "th",
        "calling-code": "66"
    }, {
        name: "Timor-Leste",
        cca2: "tl",
        "calling-code": "670"
    }, {
        name: "Togo",
        cca2: "tg",
        "calling-code": "228"
    }, {
        name: "Tokelau",
        cca2: "tk",
        "calling-code": "690"
    }, {
        name: "Tonga",
        cca2: "to",
        "calling-code": "676"
    }, {
        name: "Trinidad and Tobago",
        cca2: "tt",
        "calling-code": "1868"
    }, {
        name: "Tunisia (‫تونس‬‎)",
        cca2: "tn",
        "calling-code": "216"
    }, {
        name: "Turkey (Türkiye)",
        cca2: "tr",
        "calling-code": "90"
    }, {
        name: "Turkmenistan",
        cca2: "tm",
        "calling-code": "993"
    }, {
        name: "Turks and Caicos Islands",
        cca2: "tc",
        "calling-code": "1649"
    }, {
        name: "Tuvalu",
        cca2: "tv",
        "calling-code": "688"
    }, {
        name: "Uganda",
        cca2: "ug",
        "calling-code": "256"
    }, {
        name: "Ukraine (Україна)",
        cca2: "ua",
        "calling-code": "380"
    }, {
        name: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        cca2: "ae",
        "calling-code": "971"
    }, {
        name: "United Kingdom",
        cca2: "gb",
        "calling-code": "44"
    }, {
        name: "United States",
        cca2: "us",
        "calling-code": "1"
    }, {
        name: "U.S. Virgin Islands",
        cca2: "vi",
        "calling-code": "1340"
    }, {
        name: "Uruguay",
        cca2: "uy",
        "calling-code": "598"
    }, {
        name: "Uzbekistan (Oʻzbekiston)",
        cca2: "uz",
        "calling-code": "998"
    }, {
        name: "Vanuatu",
        cca2: "vu",
        "calling-code": "678"
    }, {
        name: "Vatican City (Città del Vaticano)",
        cca2: "va",
        "calling-code": "379"
    }, {
        name: "Venezuela",
        cca2: "ve",
        "calling-code": "58"
    }, {
        name: "Vietnam (Việt Nam)",
        cca2: "vn",
        "calling-code": "84"
    }, {
        name: "Wallis and Futuna",
        cca2: "wf",
        "calling-code": "681"
    }, {
        name: "Western Sahara (‫الصحراء الغربية‬‎)",
        cca2: "eh",
        "calling-code": "212"
    }, {
        name: "Yemen (‫اليمن‬‎)",
        cca2: "ye",
        "calling-code": "967"
    }, {
        name: "Zambia",
        cca2: "zm",
        "calling-code": "260"
    }, {
        name: "Zimbabwe",
        cca2: "zw",
        "calling-code": "263"
    } ],
    // JavaScript object mapping dial code to country code.
    // This is used when the user enters a number,
    // to quickly look up the corresponding country code.
    // Generated from the above array using this JavaScript:
    /*
  var uniqueDCs = _.unique(_.pluck(intlDataFull.countries, "calling-code"));
  var cCodes = {};
  _.each(uniqueDCs, function(dc) {
    cCodes[dc] = _.pluck(_.filter(intlDataFull.countries, function(c) {
      return c["calling-code"] == dc;
    }), "cca2");
  });
   */
    // Then reference this google code project for clash priority:
    // http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/metadata.js
    // then updated vatican city to +379
    countryCodes: {
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
    }
};

}));
