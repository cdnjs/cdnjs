/*
 * International Telephone Input v20.0.4
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// wrap in UMD
(function(factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
        define([ "jquery" ], function($) {
            factory($);
        });
    } else factory(jQuery);
})(function($, undefined) {
    "use strict";
    // Array of country objects for the flag dropdown.
    // Here is the criteria for the plugin to support a given country/territory
    // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
    // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
    // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
    // Each country array has the following information:
    // [
    //    Country name,
    //    iso2 code,
    //    International dial code,
    //    Order (if >1 country with same dial code),
    //    Area codes
    // ]
    var allCountries = [ [ "Afghanistan", "af", "93" ], [ "Albania", "al", "355" ], [ "Algeria", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua & Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Ascension Island", "ac", "247" ], [ "Australia", "au", "61", 0 ], [ "Austria", "at", "43" ], [ "Azerbaijan", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain", "bh", "973" ], [ "Bangladesh", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus", "by", "375" ], [ "Belgium", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia & Herzegovina", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi", "bi", "257" ], [ "Cambodia", "kh", "855" ], [ "Cameroon", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic", "cf", "236" ], [ "Chad", "td", "235" ], [ "Chile", "cl", "56" ], [ "China", "cn", "86" ], [ "Christmas Island", "cx", "61", 2, [ "89164" ] ], [ "Cocos (Keeling) Islands", "cc", "61", 1, [ "89162" ] ], [ "Colombia", "co", "57" ], [ "Comoros", "km", "269" ], [ "Congo - Brazzaville", "cg", "242" ], [ "Congo - Kinshasa", "cd", "243" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus", "cy", "357" ], [ "Czech Republic", "cz", "420" ], [ "Denmark", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia", "ee", "372" ], [ "Eswatini", "sz", "268" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands", "fk", "500" ], [ "Faroe Islands", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana", "gf", "594" ], [ "French Polynesia", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia", "ge", "995" ], [ "Germany", "de", "49" ], [ "Ghana", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece", "gr", "30" ], [ "Greenland", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea", "gn", "224" ], [ "Guinea-Bissau", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong", "hk", "852" ], [ "Hungary", "hu", "36" ], [ "Iceland", "is", "354" ], [ "India", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran", "ir", "98" ], [ "Iraq", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel", "il", "972" ], [ "Italy", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan", "jo", "962" ], [ "Kazakhstan", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait", "kw", "965" ], [ "Kyrgyzstan", "kg", "996" ], [ "Laos", "la", "856" ], [ "Latvia", "lv", "371" ], [ "Lebanon", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau", "mo", "853" ], [ "Madagascar", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania", "mr", "222" ], [ "Mauritius", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia", "mn", "976" ], [ "Montenegro", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco", "ma", "212", 0 ], [ "Mozambique", "mz", "258" ], [ "Myanmar (Burma)", "mm", "95" ], [ "Namibia", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal", "np", "977" ], [ "Netherlands", "nl", "31" ], [ "New Caledonia", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea", "kp", "850" ], [ "North Macedonia", "mk", "389" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway", "no", "47", 0 ], [ "Oman", "om", "968" ], [ "Pakistan", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine", "ps", "970" ], [ "Panama", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar", "qa", "974" ], [ "Réunion", "re", "262", 0 ], [ "Romania", "ro", "40" ], [ "Russia", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé & Príncipe", "st", "239" ], [ "Saudi Arabia", "sa", "966" ], [ "Senegal", "sn", "221" ], [ "Serbia", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia", "sk", "421" ], [ "Slovenia", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea", "kr", "82" ], [ "South Sudan", "ss", "211" ], [ "Spain", "es", "34" ], [ "Sri Lanka", "lk", "94" ], [ "St Barthélemy", "bl", "590", 1 ], [ "St Helena", "sh", "290" ], [ "St Kitts & Nevis", "kn", "1", 18, [ "869" ] ], [ "St Lucia", "lc", "1", 19, [ "758" ] ], [ "St Martin", "mf", "590", 2 ], [ "St Pierre & Miquelon", "pm", "508" ], [ "St Vincent & Grenadines", "vc", "1", 20, [ "784" ] ], [ "Sudan", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard & Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Sweden", "se", "46" ], [ "Switzerland", "ch", "41" ], [ "Syria", "sy", "963" ], [ "Taiwan", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad & Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia", "tn", "216" ], [ "Turkey", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks & Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "Uganda", "ug", "256" ], [ "Ukraine", "ua", "380" ], [ "United Arab Emirates", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "US Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uzbekistan", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam", "vn", "84" ], [ "Wallis & Futuna", "wf", "681" ], [ "Western Sahara", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
    // loop over all of the countries above, restructuring the data to be objects with named keys
    for (var i = 0; i < allCountries.length; i++) {
        var c = allCountries[i];
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            dialCode: c[2],
            priority: c[3] || 0,
            areaCodes: c[4] || null,
            nodeById: {}
        };
    }
    "use strict";
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })), keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
        return target;
    }
    function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
        var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
        if (null != _i) {
            var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
            try {
                if (_x = (_i = _i.call(arr)).next, 0 === i) {
                    if (Object(_i) !== _i) return;
                    _n = !1;
                } else for (;!(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) ;
            } catch (err) {
                _d = !0, _e = err;
            } finally {
                try {
                    if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
            writable: false
        });
        return Constructor;
    }
    function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (typeof res !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
    }
    var intlTelInputGlobals = {
        getInstance: function getInstance(input) {
            var id = input.getAttribute("data-intl-tel-input-id");
            return window.intlTelInputGlobals.instances[id];
        },
        instances: {},
        // using a global like this allows us to mock it in the tests
        documentReady: function documentReady() {
            return document.readyState === "complete";
        }
    };
    if (typeof window === "object") {
        window.intlTelInputGlobals = intlTelInputGlobals;
    }
    // these vars persist through all instances of the plugin
    var id = 0;
    var defaults = {
        // whether or not to allow the dropdown
        allowDropdown: true,
        // add a placeholder in the input with an example number for the selected country
        autoPlaceholder: "polite",
        // add a country search input at the top of the dropdown
        countrySearch: true,
        // modify the parentClass
        containerClass: "",
        // modify the auto placeholder
        customPlaceholder: null,
        // append menu to specified element
        dropdownContainer: null,
        // don't display these countries
        excludeCountries: [],
        // fix the dropdown width to the input width (rather than being as wide as the longest country name)
        fixDropdownWidth: true,
        // format the number as the user types
        formatAsYouType: true,
        // format the input value during initialisation and on setNumber
        formatOnDisplay: true,
        // geoIp lookup function
        geoIpLookup: null,
        // inject a hidden input with the name returned from this function, and on submit, populate it with the result of getNumber
        hiddenInput: null,
        // internationalise the plugin text e.g. search input placeholder, country names
        i18n: {},
        // initial country
        initialCountry: "",
        // national vs international formatting for numbers e.g. placeholders and displaying existing numbers
        nationalMode: true,
        // display only these countries
        onlyCountries: [],
        // number type to use for placeholders
        placeholderNumberType: "MOBILE",
        // the countries at the top of the list
        preferredCountries: [],
        // option to hide the flags - must be used with showSelectedDialCode, or allowDropdown=false
        showFlags: true,
        // display the international dial code next to the selected flag
        showSelectedDialCode: false,
        // use full screen popup instead of dropdown for country list
        useFullscreenPopup: typeof navigator !== "undefined" && typeof window !== "undefined" ? // we cannot just test screen size as some smartphones/website meta tags will report desktop
        // resolutions
        // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
        /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 : false,
        // specify the path to the libphonenumber script to enable validation/formatting
        utilsScript: ""
    };
    // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
    var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
    // run a method on each instance of the plugin
    var forEachInstance = function forEachInstance(method) {
        var instances = window.intlTelInputGlobals.instances;
        Object.values(instances).forEach(function(instance) {
            return instance[method]();
        });
    };
    // this is our plugin class that we will create an instance of
    // eslint-disable-next-line no-unused-vars
    var Iti = /*#__PURE__*/ function() {
        function Iti(input) {
            var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, Iti);
            this.id = id++;
            this.telInput = input;
            this.activeItem = null;
            this.highlightedItem = null;
            // process specified options / defaults
            this.options = Object.assign({}, defaults, customOptions);
            this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
        }
        _createClass(Iti, [ {
            key: "_init",
            value: function _init() {
                var _this = this;
                // if showing fullscreen popup, do not fix the width
                if (this.options.useFullscreenPopup) {
                    this.options.fixDropdownWidth = false;
                }
                // when search enabled, we must fix the width else it would change with different results
                if (this.options.countrySearch && !this.options.useFullscreenPopup) {
                    this.options.fixDropdownWidth = true;
                }
                // force showFlags=true if there's a dropdown and we're not displaying the dial code,
                // as otherwise you just have a down arrow on it's own which doesn't make sense
                var forceShowFlags = this.options.allowDropdown && !this.options.showSelectedDialCode;
                if (!this.options.showFlags && forceShowFlags) {
                    this.options.showFlags = true;
                }
                // on mobile, we want a full screen dropdown, so we must append it to the body
                if (this.options.useFullscreenPopup && !this.options.dropdownContainer) {
                    this.options.dropdownContainer = document.body;
                }
                // check if input has one parent with RTL
                this.isRTL = !!this.telInput.closest("[dir=rtl]");
                // these promises get resolved when their individual requests complete
                // this way the dev can do something like iti.promise.then(...) to know when all requests are
                // complete
                var autoCountryPromise = new Promise(function(resolve, reject) {
                    _this.resolveAutoCountryPromise = resolve;
                    _this.rejectAutoCountryPromise = reject;
                });
                var utilsScriptPromise = new Promise(function(resolve, reject) {
                    _this.resolveUtilsScriptPromise = resolve;
                    _this.rejectUtilsScriptPromise = reject;
                });
                this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                // in various situations there could be no country selected initially, but we need to be able
                // to assume this variable exists
                this.selectedCountryData = {};
                // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                this._processCountryData();
                // generate the markup
                this._generateMarkup();
                // set the initial state of the input value and the selected flag
                this._setInitialState();
                // start all of the event listeners: input keydown, selectedFlag click
                this._initListeners();
                // utils script, and auto country
                this._initRequests();
            }
        }, {
            key: "_processCountryData",
            value: function _processCountryData() {
                // process onlyCountries or excludeCountries array if present
                this._processAllCountries();
                // generate this.dialCodes and this.dialCodeToIso2Map
                this._processDialCodes();
                // process the preferredCountries
                this._processPreferredCountries();
                // translate country names according to i18n option
                this._translateCountryNames();
                // sort countries by name
                if (this.options.onlyCountries.length || this.options.i18n) {
                    this.countries.sort(this._countryNameSort);
                }
            }
        }, {
            key: "_addToDialCodeMap",
            value: function _addToDialCodeMap(iso2, dialCode, priority) {
                if (dialCode.length > this.dialCodeMaxLen) {
                    this.dialCodeMaxLen = dialCode.length;
                }
                if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
                    this.dialCodeToIso2Map[dialCode] = [];
                }
                // bail if we already have this country for this dialCode
                for (var i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
                    if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
                        return;
                    }
                }
                // check for undefined as 0 is falsy
                var index = priority !== undefined ? priority : this.dialCodeToIso2Map[dialCode].length;
                this.dialCodeToIso2Map[dialCode][index] = iso2;
            }
        }, {
            key: "_processAllCountries",
            value: function _processAllCountries() {
                if (this.options.onlyCountries.length) {
                    var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
                        return country.toLowerCase();
                    });
                    this.countries = allCountries.filter(function(country) {
                        return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                    });
                } else if (this.options.excludeCountries.length) {
                    var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
                        return country.toLowerCase();
                    });
                    this.countries = allCountries.filter(function(country) {
                        return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                    });
                } else {
                    this.countries = allCountries;
                }
            }
        }, {
            key: "_translateCountryNames",
            value: function _translateCountryNames() {
                for (var i = 0; i < this.countries.length; i++) {
                    var iso2 = this.countries[i].iso2.toLowerCase();
                    if (this.options.i18n.hasOwnProperty(iso2)) {
                        this.countries[i].name = this.options.i18n[iso2];
                    }
                }
            }
        }, {
            key: "_countryNameSort",
            value: function _countryNameSort(a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }
        }, {
            key: "_processDialCodes",
            value: function _processDialCodes() {
                // here we store just dial codes, where the key is the dial code, and the value is true
                // e.g. { 1: true, 7: true, 20: true, ... }
                this.dialCodes = {};
                this.dialCodeMaxLen = 0;
                // here we map dialCodes (inc both dialCode and dialCode+areaCode) to iso2 codes
                /* e.g.
       * {
       *   1: [ 'us', 'ca', ... ],    # all NANP countries
       *   12: [ 'us', 'ca', ... ],   # subset of NANP countries
       *   120: [ 'us', 'ca' ],       # just US and Canada
       *   1204: [ 'ca' ],            # only Canada
       *   ...
       *  }
       */
                this.dialCodeToIso2Map = {};
                // first: add dial codes
                for (var i = 0; i < this.countries.length; i++) {
                    var c = this.countries[i];
                    if (!this.dialCodes[c.dialCode]) {
                        this.dialCodes[c.dialCode] = true;
                    }
                    this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
                }
                // next: add area codes
                // this is a second loop over countries, to make sure we have all of the "root" countries
                // already in the map, so that we can access them, as each time we add an area code substring
                // to the map, we also need to include the "root" country's code, as that also matches
                for (var _i = 0; _i < this.countries.length; _i++) {
                    var _c = this.countries[_i];
                    // area codes
                    if (_c.areaCodes) {
                        var rootIso2Code = this.dialCodeToIso2Map[_c.dialCode][0];
                        // for each area code
                        for (var j = 0; j < _c.areaCodes.length; j++) {
                            var areaCode = _c.areaCodes[j];
                            // for each digit in the area code to add all partial matches as well
                            for (var k = 1; k < areaCode.length; k++) {
                                var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                // start with the root country, as that also matches this dial code
                                this._addToDialCodeMap(rootIso2Code, partialDialCode);
                                this._addToDialCodeMap(_c.iso2, partialDialCode);
                            }
                            // add the full area code
                            this._addToDialCodeMap(_c.iso2, _c.dialCode + areaCode);
                        }
                    }
                }
            }
        }, {
            key: "_processPreferredCountries",
            value: function _processPreferredCountries() {
                this.preferredCountries = [];
                for (var i = 0; i < this.options.preferredCountries.length; i++) {
                    var iso2 = this.options.preferredCountries[i].toLowerCase();
                    var countryData = this._getCountryData(iso2, true);
                    if (countryData) {
                        this.preferredCountries.push(countryData);
                    }
                }
            }
        }, {
            key: "_createEl",
            value: function _createEl(name, attrs, container) {
                var el = document.createElement(name);
                if (attrs) {
                    Object.entries(attrs).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                        return el.setAttribute(key, value);
                    });
                }
                if (container) {
                    container.appendChild(el);
                }
                return el;
            }
        }, {
            key: "_generateMarkup",
            value: function _generateMarkup() {
                this.telInput.classList.add("iti__tel-input");
                // if autocomplete does not exist on the element and its form, then
                // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                // autocompleted number, which on submit could mean wrong number is saved
                if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
                    this.telInput.setAttribute("autocomplete", "off");
                }
                var _this$options = this.options, allowDropdown = _this$options.allowDropdown, showSelectedDialCode = _this$options.showSelectedDialCode, showFlags = _this$options.showFlags, containerClass = _this$options.containerClass, hiddenInput = _this$options.hiddenInput, dropdownContainer = _this$options.dropdownContainer, fixDropdownWidth = _this$options.fixDropdownWidth, useFullscreenPopup = _this$options.useFullscreenPopup, countrySearch = _this$options.countrySearch, i18n = _this$options.i18n;
                // containers (mostly for positioning)
                var parentClass = "iti";
                if (allowDropdown) {
                    parentClass += " iti--allow-dropdown";
                }
                if (showSelectedDialCode) {
                    parentClass += " iti--show-selected-dial-code";
                }
                if (showFlags) {
                    parentClass += " iti--show-flags";
                }
                if (containerClass) {
                    parentClass += " ".concat(containerClass);
                }
                if (!useFullscreenPopup) {
                    parentClass += " iti--inline-dropdown";
                }
                var wrapper = this._createEl("div", {
                    "class": parentClass
                });
                this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                // if we're showing flags or dial codes, we need the flags container etc
                if (showFlags || showSelectedDialCode) {
                    this.flagsContainer = this._createEl("div", {
                        "class": "iti__flag-container"
                    }, wrapper);
                    // selected flag (displayed on left of input while allowDropdown is enabled, otherwise to right)
                    // when countrySearch disabled: using Aria tags for "Select-Only Combobox Example"
                    // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
                    this.selectedFlag = this._createEl("div", _objectSpread({
                        "class": "iti__selected-flag"
                    }, allowDropdown && _objectSpread({
                        "aria-expanded": "false",
                        "aria-label": this.options.i18n.selectedCountryAriaLabel || "Selected country",
                        "aria-haspopup": countrySearch ? "true" : "listbox",
                        "aria-controls": countrySearch ? "iti-".concat(this.id, "__dropdown-content") : "iti-".concat(this.id, "__country-listbox")
                    }, countrySearch || {
                        role: "combobox"
                    })), this.flagsContainer);
                    // we now include the selected flag element even when showFlags is disabled,
                    // as need to show globe icon for showSelectedDialCode empty state
                    this.selectedFlagInner = this._createEl("div", null, this.selectedFlag);
                    this.selectedFlagA11yText = this._createEl("span", {
                        "class": "iti__a11y-text"
                    }, this.selectedFlagInner);
                }
                wrapper.appendChild(this.telInput);
                if (this.selectedFlag && this.telInput.disabled) {
                    this.selectedFlag.setAttribute("aria-disabled", "true");
                }
                if (showSelectedDialCode) {
                    this.selectedDialCode = this._createEl("div", {
                        "class": "iti__selected-dial-code"
                    }, this.selectedFlag);
                }
                if (allowDropdown) {
                    if (!this.telInput.disabled) {
                        // make element focusable and tab navigable
                        this.selectedFlag.setAttribute("tabindex", "0");
                    }
                    this.dropdownArrow = this._createEl("div", {
                        "class": "iti__arrow",
                        "aria-hidden": "true"
                    }, this.selectedFlag);
                    var extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
                    this.dropdownContent = this._createEl("div", {
                        id: "iti-".concat(this.id, "__dropdown-content"),
                        "class": "iti__dropdown-content iti__hide ".concat(extraClasses)
                    });
                    if (countrySearch) {
                        this.searchInput = this._createEl("input", {
                            type: "text",
                            "class": "iti__search-input",
                            placeholder: i18n.searchPlaceholder || "Search",
                            role: "combobox",
                            "aria-expanded": "true",
                            "aria-label": i18n.searchPlaceholder || "Search",
                            "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                            "aria-autocomplete": "list",
                            autocomplete: "off"
                        }, this.dropdownContent);
                        this.searchResultsA11yText = this._createEl("span", {
                            "class": "iti__a11y-text"
                        }, this.dropdownContent);
                    }
                    // country list: preferred countries, then divider, then all countries
                    this.countryList = this._createEl("ul", {
                        "class": "iti__country-list",
                        id: "iti-".concat(this.id, "__country-listbox"),
                        role: "listbox",
                        "aria-label": i18n.countryListAriaLabel || "List of countries"
                    }, this.dropdownContent);
                    if (this.preferredCountries.length && !countrySearch) {
                        this._appendListItems(this.preferredCountries, "iti__preferred", true);
                        this._createEl("li", {
                            "class": "iti__divider",
                            "aria-hidden": "true"
                        }, this.countryList);
                    }
                    this._appendListItems(this.countries, "iti__standard");
                    if (countrySearch) {
                        this._updateSearchResultsText();
                    }
                    // create dropdownContainer markup
                    if (dropdownContainer) {
                        var dropdownClasses = "iti iti--container";
                        if (useFullscreenPopup) {
                            dropdownClasses += " iti--fullscreen-popup";
                        } else {
                            dropdownClasses += " iti--inline-dropdown";
                        }
                        if (countrySearch) {
                            dropdownClasses += " iti--country-search";
                        }
                        this.dropdown = this._createEl("div", {
                            "class": dropdownClasses
                        });
                        this.dropdown.appendChild(this.dropdownContent);
                    } else {
                        this.flagsContainer.appendChild(this.dropdownContent);
                    }
                }
                if (hiddenInput) {
                    var telInputName = this.telInput.getAttribute("name");
                    var names = hiddenInput(telInputName);
                    if (names.phone) {
                        // Create hidden input for the full international number
                        this.hiddenInput = this._createEl("input", {
                            type: "hidden",
                            name: names.phone
                        });
                        wrapper.appendChild(this.hiddenInput);
                    }
                    if (names.country) {
                        // Create hidden input for the selected country iso2 code
                        this.hiddenInputCountry = this._createEl("input", {
                            type: "hidden",
                            name: names.country
                        });
                        wrapper.appendChild(this.hiddenInputCountry);
                    }
                }
            }
        }, {
            key: "_appendListItems",
            value: function _appendListItems(countries, className, preferred) {
                for (var i = 0; i < countries.length; i++) {
                    var c = countries[i];
                    var idSuffix = preferred ? "-preferred" : "";
                    var listItem = this._createEl("li", {
                        id: "iti-".concat(this.id, "__item-").concat(c.iso2).concat(idSuffix),
                        "class": "iti__country ".concat(className),
                        tabindex: "-1",
                        role: "option",
                        "data-dial-code": c.dialCode,
                        "data-country-code": c.iso2,
                        "aria-selected": "false"
                    }, this.countryList);
                    // store this for later use e.g. country search filtering
                    c.nodeById[this.id] = listItem;
                    var content = "";
                    // add the flag
                    if (this.options.showFlags) {
                        content += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
                    }
                    // and the country name and dial code
                    content += "<span class='iti__country-name'>".concat(c.name, "</span>");
                    content += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                    listItem.insertAdjacentHTML("beforeend", content);
                }
            }
        }, {
            key: "_setInitialState",
            value: function _setInitialState() {
                var overrideAutoCountry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                // fix firefox bug: when first load page (with input with value set to number with intl dial
                // code) and initialising plugin removes the dial code from the input, then refresh page,
                // and we try to init plugin again but this time on number without dial code so get grey flag
                var attributeValue = this.telInput.getAttribute("value");
                var inputValue = this.telInput.value;
                var useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
                var val = useAttribute ? attributeValue : inputValue;
                var dialCode = this._getDialCode(val);
                var isRegionlessNanp = this._isRegionlessNanp(val);
                var initialCountry = this.options.initialCountry;
                // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                // flag, else fall back to the default country
                if (dialCode && !isRegionlessNanp) {
                    this._updateFlagFromNumber(val);
                } else if (initialCountry !== "auto" || overrideAutoCountry) {
                    var lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
                    var isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
                    // see if we should select a flag
                    if (isValidInitialCountry) {
                        this._setCountry(lowerInitialCountry);
                    } else {
                        if (dialCode && isRegionlessNanp) {
                            // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                            this._setCountry("us");
                        } else {
                            // display the empty state (globe icon)
                            this._setCountry();
                        }
                    }
                }
                // NOTE: if initialCountry is set to auto, that will be handled separately
                // format - note this wont be run after _updateDialCode as that's only called if no val
                if (val) {
                    this._updateValFromNumber(val);
                }
            }
        }, {
            key: "_initListeners",
            value: function _initListeners() {
                this._initKeyListeners();
                if (this.options.allowDropdown) {
                    this._initDropdownListeners();
                }
                if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
                    this._initHiddenInputListener();
                }
            }
        }, {
            key: "_initHiddenInputListener",
            value: function _initHiddenInputListener() {
                var _this2 = this;
                this._handleHiddenInputSubmit = function() {
                    if (_this2.hiddenInput) {
                        _this2.hiddenInput.value = _this2.getNumber();
                    }
                    if (_this2.hiddenInputCountry) {
                        _this2.hiddenInputCountry.value = _this2.getSelectedCountryData().iso2;
                    }
                };
                this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
            }
        }, {
            key: "_initDropdownListeners",
            value: function _initDropdownListeners() {
                var _this3 = this;
                // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                // open the dropdown would then automatically trigger a 2nd click on the input which would
                // close it again
                this._handleLabelClick = function(e) {
                    // if the dropdown is closed, then focus the input, else ignore the click
                    if (_this3.dropdownContent.classList.contains("iti__hide")) {
                        _this3.telInput.focus();
                    } else {
                        e.preventDefault();
                    }
                };
                var label = this.telInput.closest("label");
                if (label) {
                    label.addEventListener("click", this._handleLabelClick);
                }
                // toggle country dropdown on click
                this._handleClickSelectedFlag = function() {
                    // only intercept this event if we're opening the dropdown
                    // else let it bubble up to the top ("click-off-to-close" listener)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    if (_this3.dropdownContent.classList.contains("iti__hide") && !_this3.telInput.disabled && !_this3.telInput.readOnly) {
                        _this3._openDropdown();
                    }
                };
                this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                // open dropdown if selected flag is focused and they press up/down/space/enter
                this._handleFlagsContainerKeydown = function(e) {
                    var isDropdownHidden = _this3.dropdownContent.classList.contains("iti__hide");
                    if (isDropdownHidden && [ "ArrowUp", "ArrowDown", " ", "Enter" ].includes(e.key)) {
                        // prevent form from being submitted if "ENTER" was pressed
                        e.preventDefault();
                        // prevent event from being handled again by document
                        e.stopPropagation();
                        _this3._openDropdown();
                    }
                    // allow navigation from dropdown to input on TAB
                    if (e.key === "Tab") {
                        _this3._closeDropdown();
                    }
                };
                this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
            }
        }, {
            key: "_initRequests",
            value: function _initRequests() {
                var _this4 = this;
                // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                if (this.options.utilsScript && !window.intlTelInputUtils) {
                    // if the plugin is being initialised after the window.load event has already been fired
                    if (window.intlTelInputGlobals.documentReady()) {
                        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                    } else {
                        // wait until the load event so we don't block any other requests e.g. the flags image
                        window.addEventListener("load", function() {
                            window.intlTelInputGlobals.loadUtils(_this4.options.utilsScript);
                        });
                    }
                } else {
                    this.resolveUtilsScriptPromise();
                }
                // dont bother with IP lookup if we already have a selected country
                if (this.options.initialCountry === "auto" && !this.selectedCountryData.iso2) {
                    this._loadAutoCountry();
                } else {
                    this.resolveAutoCountryPromise();
                }
            }
        }, {
            key: "_loadAutoCountry",
            value: function _loadAutoCountry() {
                var _this5 = this;
                // 3 options:
                // 1) already loaded (we're done)
                // 2) not already started loading (start)
                // 3) already started loading (do nothing - just wait for loading callback to fire)
                if (window.intlTelInputGlobals.autoCountry) {
                    this.handleAutoCountry();
                } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                    // don't do this twice!
                    window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                    if (typeof this.options.geoIpLookup === "function") {
                        this.options.geoIpLookup(function() {
                            var iso2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                            var iso2Lower = iso2.toLowerCase();
                            var isValidIso2 = iso2Lower && _this5._getCountryData(iso2Lower, true);
                            if (isValidIso2) {
                                window.intlTelInputGlobals.autoCountry = iso2Lower;
                                // tell all instances the auto country is ready
                                // TODO: this should just be the current instances
                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                                // setTimeout means that the current thread of execution will finish before executing
                                // this, which allows the plugin to finish initialising.
                                setTimeout(function() {
                                    return forEachInstance("handleAutoCountry");
                                });
                            } else {
                                _this5._setInitialState(true);
                                forEachInstance("rejectAutoCountryPromise");
                            }
                        }, function() {
                            return forEachInstance("rejectAutoCountryPromise");
                        });
                    }
                }
            }
        }, {
            key: "_initKeyListeners",
            value: function _initKeyListeners() {
                var _this6 = this;
                var userOverrideFormatting = false;
                // update flag on input event
                this._handleKeyEvent = function(e) {
                    if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                        _this6._triggerCountryChange();
                    }
                    // if user types their own formatting char (not a plus or a numeric), then set the override
                    var isFormattingChar = e && e.data && /[^+0-9]/.test(e.data);
                    var isPaste = e && e.inputType === "insertFromPaste" && _this6.telInput.value;
                    if (isFormattingChar || isPaste) {
                        userOverrideFormatting = true;
                    } else if (!/[^+0-9]/.test(_this6.telInput.value)) {
                        userOverrideFormatting = false;
                    }
                    // handle FAYT, unless userOverrideFormatting or it's a paste event
                    if (_this6.options.formatAsYouType && !userOverrideFormatting && !isPaste) {
                        // maintain caret position after reformatting
                        var currentCaretPos = _this6.telInput.selectionStart;
                        var valueBeforeCaret = _this6.telInput.value.substring(0, currentCaretPos);
                        var relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
                        var isDeleteForwards = e && e.inputType === "deleteContentForward";
                        var formattedValue = _this6._formatNumberAsYouType();
                        var newCaretPos = _this6._translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
                        _this6.telInput.value = formattedValue;
                        _this6.telInput.setSelectionRange(newCaretPos, newCaretPos);
                    }
                };
                // this handles individual key presses as well as cut/paste events
                // the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
                // whereas "keyup" fires even for arrow key presses etc
                this.telInput.addEventListener("input", this._handleKeyEvent);
            }
        }, {
            key: "_translateCursorPosition",
            value: function _translateCursorPosition(relevantChars, formattedValue, prevCaretPos, isDeleteForwards) {
                // if the first char is a formatting char, and they backspace delete it:
                // cursor should stay at the start (pos 0), rather than stick to the first digit (pos 1)
                if (prevCaretPos === 0 && !isDeleteForwards) {
                    return 0;
                }
                var count = 0;
                for (var i = 0; i < formattedValue.length; i++) {
                    if (/[+0-9]/.test(formattedValue[i])) {
                        count++;
                    }
                    // normal case: stop when you hit the right number of relevant chars
                    // (cursor will be just after the final relevant char)
                    if (count === relevantChars && !isDeleteForwards) {
                        return i + 1;
                    }
                    // spacial case: delete forwards (fn + delete on a mac):
                    // wait until hit one extra relevant char, and put the cursor just before it (after any formatting chars)
                    if (isDeleteForwards && count === relevantChars + 1) {
                        return i;
                    }
                }
                return formattedValue.length;
            }
        }, {
            key: "_cap",
            value: function _cap(number) {
                var max = this.telInput.getAttribute("maxlength");
                return max && number.length > max ? number.substr(0, max) : number;
            }
        }, {
            key: "_removeEmptyDialCode",
            value: function _removeEmptyDialCode() {
                if (this.telInput.value.charAt(0) === "+") {
                    var numeric = this._getNumeric(this.telInput.value);
                    // if just a plus, or if just a dial code
                    if (!numeric || this.selectedCountryData.dialCode === numeric) {
                        this.telInput.value = "";
                    }
                }
            }
        }, {
            key: "_getNumeric",
            value: function _getNumeric(s) {
                return s.replace(/\D/g, "");
            }
        }, {
            key: "_trigger",
            value: function _trigger(name) {
                var e = new Event(name, {
                    bubbles: true,
                    cancelable: true
                });
                this.telInput.dispatchEvent(e);
            }
        }, {
            key: "_openDropdown",
            value: function _openDropdown() {
                var _this$options2 = this.options, fixDropdownWidth = _this$options2.fixDropdownWidth, countrySearch = _this$options2.countrySearch;
                if (fixDropdownWidth) {
                    this.dropdownContent.style.width = "".concat(this.telInput.offsetWidth, "px");
                }
                this.dropdownContent.classList.remove("iti__hide");
                this.selectedFlag.setAttribute("aria-expanded", "true");
                this._setDropdownPosition();
                // if we have previously selected a country (and countrySearch is disabled), then highlight that item and scroll to it
                // else highlight the first item and scroll to top (even if countrySearch is disabled e.g. on init, showing globe icon)
                if (this.activeItem && !countrySearch) {
                    // update highlighting and scroll to active list item
                    this._highlightListItem(this.activeItem, false);
                    this._scrollTo(this.activeItem, true);
                } else {
                    // start by highlighting the first item in the list
                    var firstElementChild = this.countryList.firstElementChild;
                    if (firstElementChild) {
                        this._highlightListItem(firstElementChild, false);
                        this.countryList.scrollTop = 0;
                    }
                    if (countrySearch) {
                        this.searchInput.focus();
                    }
                }
                // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                this._bindDropdownListeners();
                // update the arrow
                this.dropdownArrow.classList.add("iti__arrow--up");
                this._trigger("open:countrydropdown");
            }
        }, {
            key: "_toggleClass",
            value: function _toggleClass(el, className, shouldHaveClass) {
                if (shouldHaveClass && !el.classList.contains(className)) {
                    el.classList.add(className);
                } else if (!shouldHaveClass && el.classList.contains(className)) {
                    el.classList.remove(className);
                }
            }
        }, {
            key: "_setDropdownPosition",
            value: function _setDropdownPosition() {
                var _this7 = this;
                if (this.options.dropdownContainer) {
                    this.options.dropdownContainer.appendChild(this.dropdown);
                }
                if (!this.options.useFullscreenPopup) {
                    var pos = this.telInput.getBoundingClientRect();
                    // windowTop from https://stackoverflow.com/a/14384091/217866
                    var windowTop = document.documentElement.scrollTop;
                    var inputTop = pos.top + windowTop;
                    var dropdownHeight = this.dropdownContent.offsetHeight;
                    // dropdownFitsBelow = (dropdownBottom < windowBottom)
                    var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                    var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                    // dont allow positioning above when country search enabled as the search box jumps around as you filter countries
                    var positionDropdownAboveInput = !this.options.countrySearch && !dropdownFitsBelow && dropdownFitsAbove;
                    // by default, the dropdown will be below the input. If we want to position it above the
                    // input, we add the dropup class.
                    this._toggleClass(this.dropdownContent, "iti__dropdown-content--dropup", positionDropdownAboveInput);
                    // if dropdownContainer is enabled, calculate postion
                    if (this.options.dropdownContainer) {
                        // if we want to position the dropdown below the input, we need to add the input height to the top value
                        var extraTop = positionDropdownAboveInput ? 0 : this.telInput.offsetHeight;
                        // calculate placement
                        this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                        this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                        // close menu on window scroll
                        this._handleWindowScroll = function() {
                            return _this7._closeDropdown();
                        };
                        window.addEventListener("scroll", this._handleWindowScroll);
                    }
                }
            }
        }, {
            key: "_bindDropdownListeners",
            value: function _bindDropdownListeners() {
                var _this8 = this;
                // when mouse over a list item, just highlight that one
                // we add the class "highlight", so if they hit "enter" we know which one to select
                this._handleMouseoverCountryList = function(e) {
                    // handle event delegation, as we're listening for this event on the countryList
                    var listItem = e.target.closest(".iti__country");
                    if (listItem) {
                        _this8._highlightListItem(listItem, false);
                    }
                };
                this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                // listen for country selection
                this._handleClickCountryList = function(e) {
                    var listItem = e.target.closest(".iti__country");
                    if (listItem) {
                        _this8._selectListItem(listItem);
                    }
                };
                this.countryList.addEventListener("click", this._handleClickCountryList);
                // click off to close
                // (except when this initial opening click is bubbling up)
                // we cannot just stopPropagation as it may be needed to close another instance
                var isOpening = true;
                this._handleClickOffToClose = function() {
                    if (!isOpening) {
                        _this8._closeDropdown();
                    }
                    isOpening = false;
                };
                document.documentElement.addEventListener("click", this._handleClickOffToClose);
                // listen for up/down scrolling, enter to select, or escape to close
                // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                // just hit down and hold it to scroll down (no keyup event).
                // listen on the document because that's where key events are triggered if no input has focus
                var query = "";
                var queryTimer = null;
                this._handleKeydownOnDropdown = function(e) {
                    // prevent down key from scrolling the whole page,
                    // and enter key from submitting a form etc
                    if ([ "ArrowUp", "ArrowDown", "Enter", "Escape" ].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                        // up and down to navigate
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            _this8._handleUpDownKey(e.key);
                        } else if (e.key === "Enter") {
                            _this8._handleEnterKey();
                        } else if (e.key === "Escape") {
                            _this8._closeDropdown();
                        }
                    }
                    // alpha chars to perform search
                    // regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866)
                    if (!_this8.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                        e.stopPropagation();
                        // jump to countries that start with the query string
                        if (queryTimer) {
                            clearTimeout(queryTimer);
                        }
                        query += e.key.toLowerCase();
                        _this8._searchForCountry(query);
                        // if the timer hits 1 second, reset the query
                        queryTimer = setTimeout(function() {
                            query = "";
                        }, 1e3);
                    }
                };
                document.addEventListener("keydown", this._handleKeydownOnDropdown);
                if (this.options.countrySearch) {
                    var doFilter = function doFilter() {
                        var inputQuery = _this8.searchInput.value.trim();
                        if (inputQuery) {
                            _this8._filterCountries(inputQuery);
                        } else {
                            _this8._filterCountries("", true);
                        }
                    };
                    var keyupTimer = null;
                    this._handleSearchChange = function() {
                        // filtering country nodes is expensive (lots of DOM manipulation), so rate limit it
                        if (keyupTimer) {
                            clearTimeout(keyupTimer);
                        }
                        keyupTimer = setTimeout(function() {
                            doFilter();
                            keyupTimer = null;
                        }, 100);
                    };
                    this.searchInput.addEventListener("input", this._handleSearchChange);
                    // stop propagation on search input click, so doesn't trigger click-off-to-close listener
                    this.searchInput.addEventListener("click", function(e) {
                        return e.stopPropagation();
                    });
                }
            }
        }, {
            key: "_normaliseString",
            value: function _normaliseString() {
                var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            }
        }, {
            key: "_filterCountries",
            value: function _filterCountries(query) {
                var isReset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var isFirst = true;
                this.countryList.innerHTML = "";
                var normalisedQuery = this._normaliseString(query);
                for (var i = 0; i < this.countries.length; i++) {
                    var c = this.countries[i];
                    var normalisedCountryName = this._normaliseString(c.name);
                    var fullDialCode = "+".concat(c.dialCode);
                    if (isReset || normalisedCountryName.includes(normalisedQuery) || fullDialCode.includes(normalisedQuery) || c.iso2.includes(normalisedQuery)) {
                        this.countryList.appendChild(c.nodeById[this.id]);
                        // highlight the first item
                        if (isFirst) {
                            this._highlightListItem(c.nodeById[this.id], false);
                            isFirst = false;
                        }
                    }
                }
                // scroll to top (useful if user had previously scrolled down)
                this.countryList.scrollTop = 0;
                this._updateSearchResultsText();
            }
        }, {
            key: "_updateSearchResultsText",
            value: function _updateSearchResultsText() {
                var i18n = this.options.i18n;
                var count = this.countryList.childElementCount;
                var searchText;
                if (count === 0) {
                    searchText = i18n.zeroSearchResults || "No results found";
                } else if (count === 1) {
                    searchText = i18n.oneSearchResult || "1 result found";
                } else {
                    // eslint-disable-next-line no-template-curly-in-string
                    searchText = i18n.multipleSearchResults ? i18n.multipleSearchResults.replace("${count}", count) : "".concat(count, " results found");
                }
                this.searchResultsA11yText.textContent = searchText;
            }
        }, {
            key: "_handleUpDownKey",
            value: function _handleUpDownKey(key) {
                var next = key === "ArrowUp" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                if (next) {
                    // skip the divider
                    if (next.classList.contains("iti__divider")) {
                        next = key === "ArrowUp" ? next.previousElementSibling : next.nextElementSibling;
                    }
                } else if (this.countryList.childElementCount > 1) {
                    // otherwise, we must be at the end, so loop round again
                    next = key === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild;
                }
                if (next) {
                    // make sure the next item is visible
                    // (before calling focus(), which can cause the next item to scroll to the middle of the dropdown, which is jarring)
                    this._scrollTo(next, false);
                    // if country search enabled, dont lose focus from the search input on up/down
                    var doFocus = !this.options.countrySearch;
                    this._highlightListItem(next, doFocus);
                }
            }
        }, {
            key: "_handleEnterKey",
            value: function _handleEnterKey() {
                if (this.highlightedItem) {
                    this._selectListItem(this.highlightedItem);
                }
            }
        }, {
            key: "_searchForCountry",
            value: function _searchForCountry(query) {
                for (var i = 0; i < this.countries.length; i++) {
                    if (this._startsWith(this.countries[i].name, query)) {
                        var listItem = this.countries[i].nodeById[this.id];
                        // update highlighting and scroll
                        this._highlightListItem(listItem, false);
                        this._scrollTo(listItem, true);
                        break;
                    }
                }
            }
        }, {
            key: "_startsWith",
            value: function _startsWith(a, b) {
                return a.substr(0, b.length).toLowerCase() === b;
            }
        }, {
            key: "_updateValFromNumber",
            value: function _updateValFromNumber(fullNumber) {
                var number = fullNumber;
                if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                    var useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.showSelectedDialCode;
                    var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                    var format = useNational ? NATIONAL : INTERNATIONAL;
                    number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
                }
                number = this._beforeSetNumber(number);
                this.telInput.value = number;
            }
        }, {
            key: "_updateFlagFromNumber",
            value: function _updateFlagFromNumber(fullNumber) {
                var plusIndex = fullNumber.indexOf("+");
                // if it contains a plus, discard any chars before it e.g. accidental space char.
                // this keeps the selected country auto-updating correctly, which we want as
                // libphonenumber's validation/getNumber methods will ignore these chars anyway
                var number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
                // if we already have US/Canada selected, make sure the number starts
                // with a +1 so _getDialCode will be able to extract the area code
                // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                // from the number), that means we're initialising the plugin with a number that already has a
                // dial code, so fine to ignore this bit
                var selectedDialCode = this.selectedCountryData.dialCode;
                var isNanp = selectedDialCode === "1";
                if (number && isNanp && number.charAt(0) !== "+") {
                    if (number.charAt(0) !== "1") {
                        number = "1".concat(number);
                    }
                    number = "+".concat(number);
                }
                // if showSelectedDialCode enabled, then consider the selected dial code to be part of the number
                if (this.options.showSelectedDialCode && selectedDialCode && number.charAt(0) !== "+") {
                    number = "+".concat(selectedDialCode).concat(number);
                }
                // try and extract valid dial code from input
                var dialCode = this._getDialCode(number, true);
                var numeric = this._getNumeric(number);
                var iso2 = null;
                if (dialCode) {
                    var iso2Codes = this.dialCodeToIso2Map[this._getNumeric(dialCode)];
                    // check if the right country is already selected. this should be false if the number is
                    // longer than the matched dial code because in this case we need to make sure that if
                    // there are multiple country matches, that the first one is selected (note: we could
                    // just check that here, but it requires the same loop that we already have later)
                    var alreadySelected = iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                    var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                    // only update the flag if:
                    // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                    // AND
                    // B) the right country is not already selected
                    if (!isRegionlessNanpNumber && !alreadySelected) {
                        // if using onlyCountries option, iso2Codes[0] may be empty, so we must find the first
                        // non-empty index
                        for (var j = 0; j < iso2Codes.length; j++) {
                            if (iso2Codes[j]) {
                                iso2 = iso2Codes[j];
                                break;
                            }
                        }
                    }
                } else if (number.charAt(0) === "+" && numeric.length) {
                    // invalid dial code, so empty
                    // Note: use getNumeric here because the number has not been formatted yet, so could contain
                    // bad chars
                    iso2 = "";
                } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
                    // if no selected flag, and user either clears the input, or just types a plus, then show default
                    iso2 = this.defaultCountry;
                }
                if (iso2 !== null) {
                    return this._setCountry(iso2);
                }
                return false;
            }
        }, {
            key: "_isRegionlessNanp",
            value: function _isRegionlessNanp(number) {
                var numeric = this._getNumeric(number);
                if (numeric.charAt(0) === "1") {
                    var areaCode = numeric.substr(1, 3);
                    return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                }
                return false;
            }
        }, {
            key: "_highlightListItem",
            value: function _highlightListItem(listItem, shouldFocus) {
                var prevItem = this.highlightedItem;
                if (prevItem) {
                    prevItem.classList.remove("iti__highlight");
                    prevItem.setAttribute("aria-selected", "false");
                }
                this.highlightedItem = listItem;
                this.highlightedItem.classList.add("iti__highlight");
                this.highlightedItem.setAttribute("aria-selected", "true");
                this.selectedFlag.setAttribute("aria-activedescendant", listItem.getAttribute("id"));
                if (this.options.countrySearch) {
                    this.searchInput.setAttribute("aria-activedescendant", listItem.getAttribute("id"));
                }
                if (shouldFocus) {
                    this.highlightedItem.focus();
                }
            }
        }, {
            key: "_getCountryData",
            value: function _getCountryData(iso2, allowFail) {
                for (var i = 0; i < this.countries.length; i++) {
                    if (this.countries[i].iso2 === iso2) {
                        return this.countries[i];
                    }
                }
                if (allowFail) {
                    return null;
                }
                throw new Error("No country data for '".concat(iso2, "'"));
            }
        }, {
            key: "_setCountry",
            value: function _setCountry(iso2) {
                var _this$options3 = this.options, allowDropdown = _this$options3.allowDropdown, showSelectedDialCode = _this$options3.showSelectedDialCode, showFlags = _this$options3.showFlags, countrySearch = _this$options3.countrySearch, i18n = _this$options3.i18n;
                var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                // do this first as it will throw an error and stop if iso2 is invalid
                this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) : {};
                // update the defaultCountry - we only need the iso2 from now on, so just store that
                if (this.selectedCountryData.iso2) {
                    this.defaultCountry = this.selectedCountryData.iso2;
                }
                // update the flag class and the a11y text
                if (this.selectedFlagInner) {
                    var flagClass = "";
                    var a11yText = "";
                    if (iso2) {
                        if (showFlags) {
                            flagClass = "iti__flag iti__".concat(iso2);
                            a11yText = "".concat(this.selectedCountryData.name, " +").concat(this.selectedCountryData.dialCode);
                        }
                    } else {
                        flagClass = "iti__flag iti__globe";
                        a11yText = i18n.noCountrySelected || "No country selected";
                    }
                    this.selectedFlagInner.className = flagClass;
                    this.selectedFlagA11yText.textContent = a11yText;
                }
                this._setSelectedCountryFlagTitleAttribute(iso2, showSelectedDialCode);
                // update the selected dial code
                if (showSelectedDialCode) {
                    var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                    this.selectedDialCode.innerHTML = dialCode;
                    // offsetWidth is zero if input is in a hidden container during initialisation
                    var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                    // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                    if (this.isRTL) {
                        this.telInput.style.paddingRight = "".concat(selectedFlagWidth + 6, "px");
                    } else {
                        this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                    }
                }
                // and the input's placeholder
                this._updatePlaceholder();
                // update the active list item (only if country search disabled, as country search doesn't store the active item)
                if (allowDropdown && !countrySearch) {
                    var prevItem = this.activeItem;
                    if (prevItem) {
                        prevItem.classList.remove("iti__active");
                        prevItem.setAttribute("aria-selected", "false");
                    }
                    if (iso2) {
                        // check if there is a preferred item first, else fall back to standard
                        var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(iso2, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(iso2));
                        nextItem.setAttribute("aria-selected", "true");
                        nextItem.classList.add("iti__active");
                        this.activeItem = nextItem;
                    }
                }
                // return if the flag has changed or not
                return prevCountry.iso2 !== iso2;
            }
        }, {
            key: "_setSelectedCountryFlagTitleAttribute",
            value: function _setSelectedCountryFlagTitleAttribute(iso2, showSelectedDialCode) {
                if (!this.selectedFlag) {
                    return;
                }
                var title;
                if (iso2 && !showSelectedDialCode) {
                    title = "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode);
                } else if (iso2) {
                    // For screen reader output, we don't want to include the dial code in the reader output twice
                    // so just use the selected country name here:
                    title = this.selectedCountryData.name;
                } else {
                    title = "Unknown";
                }
                this.selectedFlag.setAttribute("title", title);
            }
        }, {
            key: "_getHiddenSelectedFlagWidth",
            value: function _getHiddenSelectedFlagWidth() {
                // to get the right styling to apply, all we need is a shallow clone of the container,
                // and then to inject a deep clone of the selectedFlag element
                var containerClone = this.telInput.parentNode.cloneNode();
                containerClone.style.visibility = "hidden";
                document.body.appendChild(containerClone);
                var flagsContainerClone = this.flagsContainer.cloneNode();
                containerClone.appendChild(flagsContainerClone);
                var selectedFlagClone = this.selectedFlag.cloneNode(true);
                flagsContainerClone.appendChild(selectedFlagClone);
                var width = selectedFlagClone.offsetWidth;
                containerClone.parentNode.removeChild(containerClone);
                return width;
            }
        }, {
            key: "_updatePlaceholder",
            value: function _updatePlaceholder() {
                var _this$options4 = this.options, autoPlaceholder = _this$options4.autoPlaceholder, placeholderNumberType = _this$options4.placeholderNumberType, nationalMode = _this$options4.nationalMode, customPlaceholder = _this$options4.customPlaceholder;
                var shouldSetPlaceholder = autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && autoPlaceholder === "polite";
                if (window.intlTelInputUtils && shouldSetPlaceholder) {
                    var numberType = intlTelInputUtils.numberType[placeholderNumberType];
                    var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, nationalMode, numberType) : "";
                    placeholder = this._beforeSetNumber(placeholder);
                    if (typeof customPlaceholder === "function") {
                        placeholder = customPlaceholder(placeholder, this.selectedCountryData);
                    }
                    this.telInput.setAttribute("placeholder", placeholder);
                }
            }
        }, {
            key: "_selectListItem",
            value: function _selectListItem(listItem) {
                // update selected flag and active list item
                var flagChanged = this._setCountry(listItem.getAttribute("data-country-code"));
                this._closeDropdown();
                this._updateDialCode(listItem.getAttribute("data-dial-code"));
                // focus the input
                this.telInput.focus();
                if (flagChanged) {
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "_closeDropdown",
            value: function _closeDropdown() {
                this.dropdownContent.classList.add("iti__hide");
                this.selectedFlag.setAttribute("aria-expanded", "false");
                this.selectedFlag.removeAttribute("aria-activedescendant");
                if (this.highlightedItem) {
                    this.highlightedItem.setAttribute("aria-selected", "false");
                }
                if (this.options.countrySearch) {
                    this.searchInput.removeAttribute("aria-activedescendant");
                }
                // update the arrow
                this.dropdownArrow.classList.remove("iti__arrow--up");
                // unbind key events
                document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                if (this.options.countrySearch) {
                    this.searchInput.removeEventListener("input", this._handleSearchChange);
                }
                document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                this.countryList.removeEventListener("click", this._handleClickCountryList);
                // remove menu from container
                if (this.options.dropdownContainer) {
                    if (!this.options.useFullscreenPopup) {
                        window.removeEventListener("scroll", this._handleWindowScroll);
                    }
                    if (this.dropdown.parentNode) {
                        this.dropdown.parentNode.removeChild(this.dropdown);
                    }
                }
                this._trigger("close:countrydropdown");
            }
        }, {
            key: "_scrollTo",
            value: function _scrollTo(element, middle) {
                var container = this.countryList;
                // windowTop from https://stackoverflow.com/a/14384091/217866
                var windowTop = document.documentElement.scrollTop;
                var containerHeight = container.offsetHeight;
                var containerTop = container.getBoundingClientRect().top + windowTop;
                var containerBottom = containerTop + containerHeight;
                var elementHeight = element.offsetHeight;
                var elementTop = element.getBoundingClientRect().top + windowTop;
                var elementBottom = elementTop + elementHeight;
                var newScrollTop = elementTop - containerTop + container.scrollTop;
                var middleOffset = containerHeight / 2 - elementHeight / 2;
                if (elementTop < containerTop) {
                    // scroll up
                    if (middle) {
                        newScrollTop -= middleOffset;
                    }
                    container.scrollTop = newScrollTop;
                } else if (elementBottom > containerBottom) {
                    // scroll down
                    if (middle) {
                        newScrollTop += middleOffset;
                    }
                    var heightDifference = containerHeight - elementHeight;
                    container.scrollTop = newScrollTop - heightDifference;
                }
            }
        }, {
            key: "_updateDialCode",
            value: function _updateDialCode(newDialCodeBare) {
                var inputVal = this.telInput.value;
                // save having to pass this every time
                var newDialCode = "+".concat(newDialCodeBare);
                var newNumber;
                if (inputVal.charAt(0) === "+") {
                    // there's a plus so we're dealing with a replacement
                    var prevDialCode = this._getDialCode(inputVal);
                    if (prevDialCode) {
                        // current number contains a valid dial code, so replace it
                        newNumber = inputVal.replace(prevDialCode, newDialCode);
                    } else {
                        // current number contains an invalid dial code, so ditch it
                        // (no way to determine where the invalid dial code ends and the rest of the number begins)
                        newNumber = newDialCode;
                    }
                    this.telInput.value = newNumber;
                }
            }
        }, {
            key: "_getDialCode",
            value: function _getDialCode(number, includeAreaCode) {
                var dialCode = "";
                // only interested in international numbers (starting with a plus)
                if (number.charAt(0) === "+") {
                    var numericChars = "";
                    // iterate over chars
                    for (var i = 0; i < number.length; i++) {
                        var c = number.charAt(i);
                        // if char is number (https://stackoverflow.com/a/8935649/217866)
                        if (!isNaN(parseInt(c, 10))) {
                            numericChars += c;
                            // if current numericChars make a valid dial code
                            if (includeAreaCode) {
                                if (this.dialCodeToIso2Map[numericChars]) {
                                    // store the actual raw string (useful for matching later)
                                    dialCode = number.substr(0, i + 1);
                                }
                            } else {
                                if (this.dialCodes[numericChars]) {
                                    dialCode = number.substr(0, i + 1);
                                    // if we're just looking for a dial code, we can break as soon as we find one
                                    break;
                                }
                            }
                            // stop searching as soon as we can - in this case when we hit max len
                            if (numericChars.length === this.dialCodeMaxLen) {
                                break;
                            }
                        }
                    }
                }
                return dialCode;
            }
        }, {
            key: "_getFullNumber",
            value: function _getFullNumber() {
                var val = this.telInput.value.trim();
                var dialCode = this.selectedCountryData.dialCode;
                var prefix;
                var numericVal = this._getNumeric(val);
                if (this.options.showSelectedDialCode && !this.options.nationalMode && val.charAt(0) !== "+" && dialCode && numericVal) {
                    // when using showSelectedDialCode, it is visible so is effectively part of the typed number
                    prefix = "+".concat(dialCode);
                } else {
                    prefix = "";
                }
                return prefix + val;
            }
        }, {
            key: "_beforeSetNumber",
            value: function _beforeSetNumber(fullNumber) {
                var number = fullNumber;
                if (this.options.showSelectedDialCode) {
                    var dialCode = this._getDialCode(number);
                    // if there is a valid dial code
                    if (dialCode) {
                        // in case _getDialCode returned an area code as well
                        dialCode = "+".concat(this.selectedCountryData.dialCode);
                        // a lot of numbers will have a space separating the dial code and the main number, and
                        // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                        // rid of it
                        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                        var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                        number = number.substr(start);
                    }
                }
                return this._cap(number);
            }
        }, {
            key: "_triggerCountryChange",
            value: function _triggerCountryChange() {
                this._trigger("countrychange");
            }
        }, {
            key: "_formatNumberAsYouType",
            value: function _formatNumberAsYouType() {
                var val = this._getFullNumber();
                var result = window.intlTelInputUtils ? intlTelInputUtils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
                // if showSelectedDialCode and they haven't (re)typed the dial code in the input as well, then remove the dial code
                var dialCode = this.selectedCountryData.dialCode;
                if (this.options.showSelectedDialCode && !this.options.nationalMode && this.telInput.value.charAt(0) !== "+" && result.includes("+".concat(dialCode))) {
                    var afterDialCode = result.split("+".concat(dialCode))[1] || "";
                    return afterDialCode.trim();
                }
                return result;
            }
        }, {
            key: "handleAutoCountry",
            value: function handleAutoCountry() {
                if (this.options.initialCountry === "auto") {
                    // we must set this even if there is an initial val in the input: in case the initial val is
                    // invalid and they delete it - they should see their auto country
                    this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                    // if there's no initial value in the input, then update the flag
                    if (!this.telInput.value) {
                        this.setCountry(this.defaultCountry);
                    }
                    this.resolveAutoCountryPromise();
                }
            }
        }, {
            key: "handleUtils",
            value: function handleUtils() {
                // if the request was successful
                if (window.intlTelInputUtils) {
                    // if there's an initial value in the input, then format it
                    if (this.telInput.value) {
                        this._updateValFromNumber(this.telInput.value);
                    }
                    if (this.selectedCountryData.iso2) {
                        this._updatePlaceholder();
                    }
                }
                this.resolveUtilsScriptPromise();
            }
        }, {
            key: "destroy",
            value: function destroy() {
                if (this.options.allowDropdown) {
                    // make sure the dropdown is closed (and unbind listeners)
                    this._closeDropdown();
                    this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                    this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                    // label click hack
                    var label = this.telInput.closest("label");
                    if (label) {
                        label.removeEventListener("click", this._handleLabelClick);
                    }
                }
                // unbind hiddenInput listeners
                var form = this.telInput.form;
                if (this._handleHiddenInputSubmit && form) {
                    form.removeEventListener("submit", this._handleHiddenInputSubmit);
                }
                // unbind key events, and cut/paste events
                this.telInput.removeEventListener("input", this._handleKeyEvent);
                // remove attribute of id instance: data-intl-tel-input-id
                this.telInput.removeAttribute("data-intl-tel-input-id");
                // remove markup (but leave the original input)
                var wrapper = this.telInput.parentNode;
                wrapper.parentNode.insertBefore(this.telInput, wrapper);
                wrapper.parentNode.removeChild(wrapper);
                delete window.intlTelInputGlobals.instances[this.id];
            }
        }, {
            key: "getExtension",
            value: function getExtension() {
                if (window.intlTelInputUtils) {
                    return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
                }
                return "";
            }
        }, {
            key: "getNumber",
            value: function getNumber(format) {
                if (window.intlTelInputUtils) {
                    var iso2 = this.selectedCountryData.iso2;
                    return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                }
                return "";
            }
        }, {
            key: "getNumberType",
            value: function getNumberType() {
                if (window.intlTelInputUtils) {
                    return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
                }
                return -99;
            }
        }, {
            key: "getSelectedCountryData",
            value: function getSelectedCountryData() {
                return this.selectedCountryData;
            }
        }, {
            key: "getValidationError",
            value: function getValidationError() {
                if (window.intlTelInputUtils) {
                    var iso2 = this.selectedCountryData.iso2;
                    return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                }
                return -99;
            }
        }, {
            key: "isValidNumber",
            value: function isValidNumber() {
                var mobileOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
                var val = this._getFullNumber();
                // return false for any alpha chars
                if (/(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/.test(val)) {
                    return false;
                }
                return window.intlTelInputUtils ? intlTelInputUtils.isPossibleNumber(val, this.selectedCountryData.iso2, mobileOnly) : null;
            }
        }, {
            key: "isValidNumberPrecise",
            value: function isValidNumberPrecise() {
                var val = this._getFullNumber();
                // return false for any alpha chars
                if (/(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/.test(val)) {
                    return false;
                }
                return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2) : null;
            }
        }, {
            key: "setCountry",
            value: function setCountry(iso2) {
                var iso2Lower = iso2.toLowerCase();
                // check if already selected
                if (this.selectedCountryData.iso2 !== iso2Lower) {
                    this._setCountry(iso2Lower);
                    this._updateDialCode(this.selectedCountryData.dialCode);
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "setNumber",
            value: function setNumber(number) {
                // we must update the flag first, which updates this.selectedCountryData, which is used for
                // formatting the number before displaying it
                var flagChanged = this._updateFlagFromNumber(number);
                this._updateValFromNumber(number);
                if (flagChanged) {
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "setPlaceholderNumberType",
            value: function setPlaceholderNumberType(type) {
                this.options.placeholderNumberType = type;
                this._updatePlaceholder();
            }
        } ]);
        return Iti;
    }();
    /********************
 *  STATIC METHODS
 ********************/
    // get the country data object
    intlTelInputGlobals.getCountryData = function() {
        return allCountries;
    };
    // inject a <script> element to load utils.js
    var injectScript = function injectScript(path, handleSuccess, handleFailure) {
        // inject a new script element into the page
        var script = document.createElement("script");
        script.onload = function() {
            forEachInstance("handleUtils");
            if (handleSuccess) {
                handleSuccess();
            }
        };
        script.onerror = function() {
            forEachInstance("rejectUtilsScriptPromise");
            if (handleFailure) {
                handleFailure();
            }
        };
        script.className = "iti-load-utils";
        script.async = true;
        script.src = path;
        document.body.appendChild(script);
    };
    // load the utils script
    intlTelInputGlobals.loadUtils = function(path) {
        // 2 options:
        // 1) not already started loading (start)
        // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
        // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
            // only do this once
            window.intlTelInputGlobals.startedLoadingUtilsScript = true;
            return new Promise(function(resolve, reject) {
                return injectScript(path, resolve, reject);
            });
        }
        return null;
    };
    // default options
    intlTelInputGlobals.defaults = defaults;
    // version
    intlTelInputGlobals.version = "20.0.4";
    var pluginName = "intlTelInput";
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        var args = arguments;
        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === "object") {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    var iti = new Iti(this, options);
                    iti._init();
                    window.intlTelInputGlobals.instances[iti.id] = iti;
                    $.data(this, "plugin_" + pluginName, iti);
                }
            });
        } else if (typeof options === "string" && options[0] !== "_") {
            // If the first parameter is a string and it doesn't start with an underscore treat this as a call to a public method.
            // Cache the method call to make it possible to return a value
            var returns;
            this.each(function() {
                var instance = $.data(this, "plugin_" + pluginName);
                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Iti && typeof instance[options] === "function") {
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                // Allow instances to be destroyed via the 'destroy' method
                if (options === "destroy") $.data(this, "plugin_" + pluginName, null);
            });
            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
});