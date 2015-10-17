/*
intl-tel-input 
version: 0.9.2
description: A jQuery plugin for entering international telephone numbers
repository: https://github.com/Bluefieldscom/intl-tel-input.git
license: MIT
author: Jack O'Connor (http://jackocnr.com)
*/
(function($, window, document, undefined) {
    var pluginName = "intlTelInput", defaults = {
        preferredCountries: [ "us", "gb" ],
        // united states and united kingdom
        initialDialCode: true,
        americaMode: false,
        onlyCountries: []
    };
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            var that = this;
            // process onlyCountries array and update intlTelInput.countries
            // and intlTelInput.countryCodes accordingly
            if (this.options.onlyCountries.length > 0) {
                var newCountries = [], newCountryCodes = {};
                $.each(this.options.onlyCountries, function(i, countryCode) {
                    var countryData = that._getCountryData(countryCode);
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
                // update the global data object
                intlTelInput.countries = newCountries;
                intlTelInput.countryCodes = newCountryCodes;
            }
            // process preferred countries - iterate through the preferences,
            // finding the relevant data from the provided intlTelInput.countries array
            var preferredCountries = [];
            $.each(this.options.preferredCountries, function(i, countryCode) {
                var countryData = that._getCountryData(countryCode);
                if (countryData) {
                    preferredCountries.push(countryData);
                }
            });
            this.defaultCountry = preferredCountries.length ? preferredCountries[0] : intlTelInput.countries[0];
            // telephone input
            this.telInput = $(this.element);
            // if initialDialCode is enabled, insert the default dial code
            if (this.options.initialDialCode && this.telInput.val() === "") {
                this.telInput.val("+" + this.defaultCountry["calling-code"] + " ");
            }
            // containers (mostly for positioning)
            this.telInput.wrap($("<div>", {
                "class": "intl-tel-input"
            }));
            var flagsContainer = $("<div>", {
                "class": "flag-dropdown f16"
            }).insertBefore(this.telInput);
            // currently selected flag (displayed to left of input)
            var selectedFlag = $("<div>", {
                "class": "selected-flag"
            }).appendTo(flagsContainer);
            // here we default to the first country in the list
            var firstCountry = this.defaultCountry.cca2;
            this.selectedFlagInner = $("<div>", {
                "class": "flag " + firstCountry
            }).appendTo(selectedFlag);
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
            this._appendListItems(intlTelInput.countries, "");
            this.countryListItems = this.countryList.children(".country");
            // auto select the top one
            this.countryListItems.first().addClass("active");
            // update flag on keyup
            // (by extracting the dial code from the input value)
            this.telInput.keyup(function() {
                var countryCode, alreadySelected = false;
                // try and extract valid dial code from input
                var dialCode = that._getDialCode(that.telInput.val());
                if (dialCode) {
                    // check if one of the matching country's is already selected
                    var countryCodes = intlTelInput.countryCodes[dialCode];
                    $.each(countryCodes, function(i, c) {
                        if (that.selectedFlagInner.hasClass(c)) {
                            alreadySelected = true;
                        }
                    });
                    countryCode = countryCodes[0];
                } else {
                    countryCode = that.defaultCountry.cca2;
                }
                if (!alreadySelected) {
                    that._selectFlag(countryCode);
                }
            });
            // trigger it now in case there is already a number in the input
            this.telInput.keyup();
            // toggle country dropdown on click
            selectedFlag.click(function(e) {
                // prevent the click-off-to-close listener from firing
                e.stopPropagation();
                // toggle dropdown
                if (that.countryList.hasClass("hide")) {
                    // update highlighting and scroll to active list item
                    that.countryListItems.removeClass("highlight");
                    var activeListItem = that.countryList.children(".active").addClass("highlight");
                    // show it
                    that.countryList.removeClass("hide");
                    that._scrollTo(activeListItem);
                    // listen for typing
                    $(document).bind("keydown.intlTelInput", function(e) {
                        // up (38) and down (40) to navigate
                        if (e.which == 38 || e.which == 40) {
                            var current = that.countryList.children(".highlight").first();
                            var next = e.which == 38 ? current.prev() : current.next();
                            if (next) {
                                // skip the divider
                                if (next.hasClass("divider")) {
                                    next = e.which == 38 ? next.prev() : next.next();
                                }
                                that.countryListItems.removeClass("highlight");
                                next.addClass("highlight");
                                that._scrollTo(next);
                            }
                        } else if (e.which == 13) {
                            var currentCountry = that.countryList.children(".highlight").first();
                            if (currentCountry.length) {
                                that._selectListItem(currentCountry);
                            }
                        } else if (e.which == 9 || e.which == 27) {
                            that._closeDropdown();
                        } else if (e.which >= 97 && e.which <= 122 || e.which >= 65 && e.which <= 90) {
                            var letter = String.fromCharCode(e.which);
                            // filter out the countries beginning with that letter
                            var countries = that.countryListItems.filter(function() {
                                return $(this).text().charAt(0) == letter && !$(this).hasClass("preferred");
                            });
                            if (countries.length) {
                                // if one is already highlighted, then we want the next one
                                var highlightedCountry = countries.filter(".highlight").first();
                                var listItem;
                                // if the next country in the list also starts with that letter
                                if (highlightedCountry && highlightedCountry.next() && highlightedCountry.next().text().charAt(0) == letter) {
                                    listItem = highlightedCountry.next();
                                } else {
                                    listItem = countries.first();
                                }
                                // update highlighting and scroll
                                that.countryListItems.removeClass("highlight");
                                listItem.addClass("highlight");
                                that._scrollTo(listItem);
                            }
                        }
                    });
                } else {
                    // close it
                    that._closeDropdown();
                }
            });
            // when mouse over a list item, remove any highlighting from any other items
            this.countryListItems.mouseover(function() {
                that.countryListItems.removeClass("highlight");
                $(this).addClass("highlight");
            });
            // listen for country selection
            this.countryListItems.click(function(e) {
                var listItem = $(e.currentTarget);
                that._selectListItem(listItem);
            });
            // click off to close
            $("html").click(function(e) {
                if (!$(e.target).closest(".country-list").length) {
                    // close it
                    that._closeDropdown();
                }
            });
        },
        // find the country data for the given country code
        _getCountryData: function(countryCode) {
            for (var i = 0; i < intlTelInput.countries.length; i++) {
                if (intlTelInput.countries[i].cca2 == countryCode) {
                    return intlTelInput.countries[i];
                }
            }
        },
        // update the selected flag and the active list item
        _selectFlag: function(countryCode) {
            this.selectedFlagInner.attr("class", "flag " + countryCode);
            // and the active list item
            this.countryListItems.removeClass("active");
            var listItem = this.countryListItems.children(".flag." + countryCode).parent();
            listItem.addClass("active");
            return listItem;
        },
        // update the selected flag, and insert the dial code
        selectCountry: function(countryCode) {
            // check if already selected
            if (!this.selectedFlagInner.hasClass(countryCode)) {
                var listItem = this._selectFlag(countryCode);
                var dialCode = listItem.attr("data-dial-code");
                this.telInput.val("+" + dialCode + " ");
            }
        },
        // called when the user selects a list item from the dropdown
        _selectListItem: function(listItem) {
            var countryCode = listItem.attr("data-country-code");
            // update selected flag
            this.selectedFlagInner.attr("class", "flag " + countryCode);
            // update input value
            var newNumber = this._updateNumber(this.telInput.val(), listItem.attr("data-dial-code"));
            this.telInput.val(newNumber);
            // hide dropdown again
            this._closeDropdown();
            // focus the input
            this.telInput.focus();
            // mark the list item as active (incase they open the dropdown again)
            this.countryListItems.removeClass("active highlight");
            listItem.addClass("active");
        },
        // close the dropdown and unbind any listeners
        _closeDropdown: function() {
            this.countryList.addClass("hide");
            $(document).unbind("keydown.intlTelInput");
        },
        // check if an element is visible within it's container, else scroll until it is
        _scrollTo: function(element) {
            var container = this.countryList;
            var containerHeight = container.height();
            var containerTop = container.offset().top;
            var containerBottom = containerTop + containerHeight;
            var elementHeight = element.outerHeight();
            var elementTop = element.offset().top;
            var elementBottom = elementTop + elementHeight;
            var newScrollTop = elementTop - containerTop + container.scrollTop();
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
        _updateNumber: function(inputVal, dialCode) {
            var prevDialCode = "+" + this._getDialCode(inputVal);
            var newDialCode = "+" + dialCode;
            var newNumber;
            // if the previous number contained a valid dial code, replace it
            // (if more than just a plus character)
            if (prevDialCode.length > 1) {
                newNumber = inputVal.replace(prevDialCode, newDialCode);
                // if the old number was just the dial code,
                // then we will need to add the space again
                if (inputVal == prevDialCode) {
                    newNumber += " ";
                }
            } else if (inputVal.length && inputVal.substr(0, 1) != "+") {
                // previous number didn't contain a dial code, so persist it
                newNumber = newDialCode + " " + inputVal.trim();
            } else {
                // previous number contained an invalid dial code, so wipe it
                newNumber = newDialCode + " ";
            }
            // if americaMode is enabled, we dont display the dial code for american numbers
            if (this.options.americaMode && newNumber.substring(0, 3) == "+1 ") {
                newNumber = newNumber.substring(3);
            }
            return newNumber;
        },
        // try and extract a valid international dial code from a full telephone number
        _getDialCode: function(inputVal) {
            var firstPart = inputVal.trim().split(" ")[0];
            // only interested in international numbers (starting with a plus)
            if (firstPart.substring(0, 1) == "+") {
                // strip out non-numeric chars (e.g. pluses, spaces, brackets)
                // and grab the first 4 numbers (max length of a dial code is 4)
                var dialCode = firstPart.replace(/\D/g, "").substring(0, 4);
                // try first 4 digits, then 3, then 2, then 1...
                for (var i = dialCode.length; i > 0; i--) {
                    dialCode = dialCode.substring(0, i);
                    // if we find a match (a valid dial code), then return the dial code
                    if (intlTelInput.countryCodes[dialCode]) {
                        return dialCode;
                    }
                }
            }
            return "";
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
})(jQuery, window, document);

// Namespaced to prevent clashes
var intlTelInput = {
    // Array of country objects for the flag dropdown.
    // Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
    // Originally from https://github.com/mledoze/countries
    // then stripped down by copying the JSON into Chrome dev tools and manipulating it
    // and then using JSON.stringify to print it out as a string again and copy it here.
    // Also commented some countries which we dont yet have flags for.
    countries: [ {
        name: "Afghanistan",
        cca2: "af",
        "calling-code": "93"
    }, {
        name: "Albania",
        cca2: "al",
        "calling-code": "355"
    }, {
        name: "Algeria",
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
        name: "Armenia",
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
        name: "Austria",
        cca2: "at",
        "calling-code": "43"
    }, {
        name: "Azerbaijan",
        cca2: "az",
        "calling-code": "994"
    }, {
        name: "Bahamas",
        cca2: "bs",
        "calling-code": "1242"
    }, {
        name: "Bahrain",
        cca2: "bh",
        "calling-code": "973"
    }, {
        name: "Bangladesh",
        cca2: "bd",
        "calling-code": "880"
    }, {
        name: "Barbados",
        cca2: "bb",
        "calling-code": "1246"
    }, {
        name: "Belarus",
        cca2: "by",
        "calling-code": "375"
    }, {
        name: "Belgium",
        cca2: "be",
        "calling-code": "32"
    }, {
        name: "Belize",
        cca2: "bz",
        "calling-code": "501"
    }, {
        name: "Benin",
        cca2: "bj",
        "calling-code": "229"
    }, {
        name: "Bermuda",
        cca2: "bm",
        "calling-code": "1441"
    }, {
        name: "Bhutan",
        cca2: "bt",
        "calling-code": "975"
    }, {
        name: "Bolivia",
        cca2: "bo",
        "calling-code": "591"
    }, {
        name: "Bosnia and Herzegovina",
        cca2: "ba",
        "calling-code": "387"
    }, {
        name: "Botswana",
        cca2: "bw",
        "calling-code": "267"
    }, {
        name: "Brazil",
        cca2: "br",
        "calling-code": "55"
    }, {
        name: "Brunei Darussalam",
        cca2: "bn",
        "calling-code": "673"
    }, {
        name: "Bulgaria",
        cca2: "bg",
        "calling-code": "359"
    }, {
        name: "Burkina Faso",
        cca2: "bf",
        "calling-code": "226"
    }, {
        name: "Burundi",
        cca2: "bi",
        "calling-code": "257"
    }, {
        name: "Cambodia",
        cca2: "kh",
        "calling-code": "855"
    }, {
        name: "Cameroon",
        cca2: "cm",
        "calling-code": "237"
    }, {
        name: "Canada",
        cca2: "ca",
        "calling-code": "1"
    }, {
        name: "Cape Verde",
        cca2: "cv",
        "calling-code": "238"
    }, {
        name: "Cayman Islands",
        cca2: "ky",
        "calling-code": "1345"
    }, {
        name: "Central African Republic",
        cca2: "cf",
        "calling-code": "236"
    }, {
        name: "Chad",
        cca2: "td",
        "calling-code": "235"
    }, {
        name: "Chile",
        cca2: "cl",
        "calling-code": "56"
    }, {
        name: "China",
        cca2: "cn",
        "calling-code": "86"
    }, {
        name: "Colombia",
        cca2: "co",
        "calling-code": "57"
    }, {
        name: "Comoros",
        cca2: "km",
        "calling-code": "269"
    }, {
        name: "Congo (DRC)",
        cca2: "cd",
        "calling-code": "243"
    }, {
        name: "Congo (Republic)",
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
        name: "Côte d'Ivoire",
        cca2: "ci",
        "calling-code": "225"
    }, {
        name: "Croatia",
        cca2: "hr",
        "calling-code": "385"
    }, {
        name: "Cuba",
        cca2: "cu",
        "calling-code": "53"
    }, {
        name: "Cyprus",
        cca2: "cy",
        "calling-code": "357"
    }, {
        name: "Czech Republic",
        cca2: "cz",
        "calling-code": "420"
    }, {
        name: "Denmark",
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
        name: "Dominican Republic",
        cca2: "do",
        "calling-code": "1809"
    }, {
        name: "Ecuador",
        cca2: "ec",
        "calling-code": "593"
    }, {
        name: "Egypt",
        cca2: "eg",
        "calling-code": "20"
    }, {
        name: "El Salvador",
        cca2: "sv",
        "calling-code": "503"
    }, {
        name: "Equatorial Guinea",
        cca2: "gq",
        "calling-code": "240"
    }, {
        name: "Eritrea",
        cca2: "er",
        "calling-code": "291"
    }, {
        name: "Estonia",
        cca2: "ee",
        "calling-code": "372"
    }, {
        name: "Ethiopia",
        cca2: "et",
        "calling-code": "251"
    }, {
        name: "Faroe Islands",
        cca2: "fo",
        "calling-code": "298"
    }, {
        name: "Fiji",
        cca2: "fj",
        "calling-code": "679"
    }, {
        name: "Finland",
        cca2: "fi",
        "calling-code": "358"
    }, {
        name: "France",
        cca2: "fr",
        "calling-code": "33"
    }, {
        name: "French Polynesia",
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
        name: "Georgia",
        cca2: "ge",
        "calling-code": "995"
    }, {
        name: "Germany",
        cca2: "de",
        "calling-code": "49"
    }, {
        name: "Ghana",
        cca2: "gh",
        "calling-code": "233"
    }, {
        name: "Gibraltar",
        cca2: "gi",
        "calling-code": "350"
    }, {
        name: "Greece",
        cca2: "gr",
        "calling-code": "30"
    }, {
        name: "Greenland",
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
        name: "Guinea",
        cca2: "gn",
        "calling-code": "224"
    }, {
        name: "Guinea-Bissau",
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
        name: "Hong Kong",
        cca2: "hk",
        "calling-code": "852"
    }, {
        name: "Hungary",
        cca2: "hu",
        "calling-code": "36"
    }, {
        name: "Iceland",
        cca2: "is",
        "calling-code": "354"
    }, {
        name: "India",
        cca2: "in",
        "calling-code": "91"
    }, {
        name: "Indonesia",
        cca2: "id",
        "calling-code": "62"
    }, {
        name: "Iran",
        cca2: "ir",
        "calling-code": "98"
    }, {
        name: "Iraq",
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
        name: "Israel",
        cca2: "il",
        "calling-code": "972"
    }, {
        name: "Italy",
        cca2: "it",
        "calling-code": "39"
    }, {
        name: "Jamaica",
        cca2: "jm",
        "calling-code": "1876"
    }, {
        name: "Japan",
        cca2: "jp",
        "calling-code": "81"
    }, {
        name: "Jersey",
        cca2: "je",
        "calling-code": "44"
    }, {
        name: "Jordan",
        cca2: "jo",
        "calling-code": "962"
    }, {
        name: "Kazakhstan",
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
        name: "Kuwait",
        cca2: "kw",
        "calling-code": "965"
    }, {
        name: "Kyrgyzstan",
        cca2: "kg",
        "calling-code": "996"
    }, {
        name: "Laos",
        cca2: "la",
        "calling-code": "856"
    }, {
        name: "Latvia",
        cca2: "lv",
        "calling-code": "371"
    }, {
        name: "Lebanon",
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
        name: "Libya",
        cca2: "ly",
        "calling-code": "218"
    }, {
        name: "Liechtenstein",
        cca2: "li",
        "calling-code": "423"
    }, {
        name: "Lithuania",
        cca2: "lt",
        "calling-code": "370"
    }, {
        name: "Luxembourg",
        cca2: "lu",
        "calling-code": "352"
    }, {
        name: "Macao",
        cca2: "mo",
        "calling-code": "853"
    }, {
        name: "Macedonia",
        cca2: "mk",
        "calling-code": "389"
    }, {
        name: "Madagascar",
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
        name: "Mauritania",
        cca2: "mr",
        "calling-code": "222"
    }, {
        name: "Mauritius",
        cca2: "mu",
        "calling-code": "230"
    }, {
        name: "Mexico",
        cca2: "mx",
        "calling-code": "52"
    }, {
        name: "Micronesia",
        cca2: "fm",
        "calling-code": "691"
    }, {
        name: "Moldova",
        cca2: "md",
        "calling-code": "373"
    }, {
        name: "Monaco",
        cca2: "mc",
        "calling-code": "377"
    }, {
        name: "Mongolia",
        cca2: "mn",
        "calling-code": "976"
    }, {
        name: "Montenegro",
        cca2: "me",
        "calling-code": "382"
    }, {
        name: "Montserrat",
        cca2: "ms",
        "calling-code": "1664"
    }, {
        name: "Morocco",
        cca2: "ma",
        "calling-code": "212"
    }, {
        name: "Mozambique",
        cca2: "mz",
        "calling-code": "258"
    }, {
        name: "Myanmar (Burma)",
        cca2: "mm",
        "calling-code": "95"
    }, {
        name: "Namibia",
        cca2: "na",
        "calling-code": "264"
    }, {
        name: "Nauru",
        cca2: "nr",
        "calling-code": "674"
    }, {
        name: "Nepal",
        cca2: "np",
        "calling-code": "977"
    }, {
        name: "Netherlands",
        cca2: "nl",
        "calling-code": "31"
    }, {
        name: "New Caledonia",
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
        name: "Niger",
        cca2: "ne",
        "calling-code": "227"
    }, {
        name: "Nigeria",
        cca2: "ng",
        "calling-code": "234"
    }, {
        name: "North Korea",
        cca2: "kp",
        "calling-code": "850"
    }, {
        name: "Norway",
        cca2: "no",
        "calling-code": "47"
    }, {
        name: "Oman",
        cca2: "om",
        "calling-code": "968"
    }, {
        name: "Pakistan",
        cca2: "pk",
        "calling-code": "92"
    }, {
        name: "Palau",
        cca2: "pw",
        "calling-code": "680"
    }, {
        name: "Palestinian Territory",
        cca2: "ps",
        "calling-code": "970"
    }, {
        name: "Panama",
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
        name: "Peru",
        cca2: "pe",
        "calling-code": "51"
    }, {
        name: "Philippines",
        cca2: "ph",
        "calling-code": "63"
    }, {
        name: "Poland",
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
        name: "Qatar",
        cca2: "qa",
        "calling-code": "974"
    }, {
        name: "Réunion",
        cca2: "re",
        "calling-code": "262"
    }, {
        name: "Romania",
        cca2: "ro",
        "calling-code": "40"
    }, {
        name: "Russian Federation",
        cca2: "ru",
        "calling-code": "7"
    }, {
        name: "Rwanda",
        cca2: "rw",
        "calling-code": "250"
    }, {
        name: "Saint Kitts and Nevis",
        cca2: "kn",
        "calling-code": "1869"
    }, {
        name: "Saint Lucia",
        cca2: "lc",
        "calling-code": "1758"
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
        name: "São Tomé and Príncipe",
        cca2: "st",
        "calling-code": "239"
    }, {
        name: "Saudi Arabia",
        cca2: "sa",
        "calling-code": "966"
    }, {
        name: "Senegal",
        cca2: "sn",
        "calling-code": "221"
    }, {
        name: "Serbia",
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
        name: "Slovakia",
        cca2: "sk",
        "calling-code": "421"
    }, {
        name: "Slovenia",
        cca2: "si",
        "calling-code": "386"
    }, {
        name: "Solomon Islands",
        cca2: "sb",
        "calling-code": "677"
    }, {
        name: "Somalia",
        cca2: "so",
        "calling-code": "252"
    }, {
        name: "South Africa",
        cca2: "za",
        "calling-code": "27"
    }, {
        name: "South Korea",
        cca2: "kr",
        "calling-code": "82"
    }, {
        name: "Spain",
        cca2: "es",
        "calling-code": "34"
    }, {
        name: "Sri Lanka",
        cca2: "lk",
        "calling-code": "94"
    }, {
        name: "Sudan",
        cca2: "sd",
        "calling-code": "249"
    }, {
        name: "Suriname",
        cca2: "sr",
        "calling-code": "597"
    }, {
        name: "Swaziland",
        cca2: "sz",
        "calling-code": "268"
    }, {
        name: "Sweden",
        cca2: "se",
        "calling-code": "46"
    }, {
        name: "Switzerland",
        cca2: "ch",
        "calling-code": "41"
    }, {
        name: "Syrian Arab Republic",
        cca2: "sy",
        "calling-code": "963"
    }, {
        name: "Taiwan, Province of China",
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
        name: "Thailand",
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
        name: "Tonga",
        cca2: "to",
        "calling-code": "676"
    }, {
        name: "Trinidad and Tobago",
        cca2: "tt",
        "calling-code": "1868"
    }, {
        name: "Tunisia",
        cca2: "tn",
        "calling-code": "216"
    }, {
        name: "Turkey",
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
        name: "Ukraine",
        cca2: "ua",
        "calling-code": "380"
    }, {
        name: "United Arab Emirates",
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
        name: "Uruguay",
        cca2: "uy",
        "calling-code": "598"
    }, {
        name: "Uzbekistan",
        cca2: "uz",
        "calling-code": "998"
    }, {
        name: "Vanuatu",
        cca2: "vu",
        "calling-code": "678"
    }, {
        name: "Vatican City",
        cca2: "va",
        "calling-code": "379"
    }, {
        name: "Venezuela",
        cca2: "ve",
        "calling-code": "58"
    }, {
        name: "Viet Nam",
        cca2: "vn",
        "calling-code": "84"
    }, {
        name: "Virgin Islands (British)",
        cca2: "vg",
        "calling-code": "1284"
    }, {
        name: "Virgin Islands (U.S.)",
        cca2: "vi",
        "calling-code": "1340"
    }, {
        name: "Western Sahara",
        cca2: "eh",
        "calling-code": "212"
    }, {
        name: "Yemen",
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
    // Originally from http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/metadata.js
    // then I commented some weird 001 entries and added some 4-digit country-code
    // items at the end e.g. 1246 for Barbados
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
        "47": [ "no", "sj" ],
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
        "64": [ "nz" ],
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
        "247": [ "ac" ],
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
        "377": [ "mc" ],
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
        "500": [ "fk" ],
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
        "599": [ "cw", "bq" ],
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
        "1671": [ "gu" ],
        "1684": [ "as" ],
        "1758": [ "lc" ],
        "1767": [ "dm" ],
        "1784": [ "vc" ],
        "1787": [ "pr" ],
        "1809": [ "do" ],
        "1868": [ "tt" ],
        "1869": [ "kn" ],
        "1876": [ "jm" ]
    }
};