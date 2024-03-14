/*
 * International Telephone Input v19.5.7
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// wrap in UMD
(function(factory) {
    if (typeof module === "object" && module.exports) module.exports = factory(); else window.intlTelInput = factory();
})(function(undefined) {
    "use strict";
    return function() {
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
        function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? Object(arguments[i]) : {};
                var ownKeys = Object.keys(source);
                if (typeof Object.getOwnPropertySymbols === "function") {
                    ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function(sym) {
                        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                    }));
                }
                ownKeys.forEach(function(key) {
                    _defineProperty(target, key, source[key]);
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
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
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
                    } else for (;!(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
                    }
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
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
            // auto insert dial code (A) on init, (B) on user selecting a country, (C) on calling setCountry
            autoInsertDialCode: false,
            // add a placeholder in the input with an example number for the selected country
            autoPlaceholder: "polite",
            // add a country search input at the top of the dropdown
            countrySearch: true,
            // modify the parentClass
            containerClass: "",
            // modify the auto placeholder
            customPlaceholder: null,
            // by default, initialise with the first country in the list selected (if no country set via the initial value or initialCountry option)
            defaultToFirstCountry: true,
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
            // inject a hidden input with this name, and on submit, populate it with the result of getNumber
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
                    // if in nationalMode, do not insert dial codes
                    if (this.options.nationalMode) {
                        this.options.autoInsertDialCode = false;
                    }
                    // if showSelectedDialCode enabled, do not insert dial codes
                    if (this.options.showSelectedDialCode) {
                        this.options.autoInsertDialCode = false;
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
                    if (typeof Promise !== "undefined") {
                        var autoCountryPromise = new Promise(function(resolve, reject) {
                            _this.resolveAutoCountryPromise = resolve;
                            _this.rejectAutoCountryPromise = reject;
                        });
                        var utilsScriptPromise = new Promise(function(resolve, reject) {
                            _this.resolveUtilsScriptPromise = resolve;
                            _this.rejectUtilsScriptPromise = reject;
                        });
                        this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                    } else {
                        // prevent errors when Promise doesn't exist
                        this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
                        this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
                    }
                    // in various situations there could be no country selected initially, but we need to be able
                    // to assume this variable exists
                    this.selectedCountryData = {};
                    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                    this._processCountryData();
                    // generate the markup
                    this._generateMarkup();
                    // set the initial state of the input value and the selected flag
                    this._setInitialState();
                    // start all of the event listeners: autoInsertDialCode, input keydown, selectedFlag click
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
                    var _this$options = this.options, allowDropdown = _this$options.allowDropdown, showSelectedDialCode = _this$options.showSelectedDialCode, showFlags = _this$options.showFlags, containerClass = _this$options.containerClass, hiddenInput = _this$options.hiddenInput, dropdownContainer = _this$options.dropdownContainer, fixDropdownWidth = _this$options.fixDropdownWidth, useFullscreenPopup = _this$options.useFullscreenPopup, countrySearch = _this$options.countrySearch;
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
                    // only hide the flagsContainer if allowDropdown, showFlags and showSelectedDialCode are all false
                    var showFlagsContainer = allowDropdown || showFlags || showSelectedDialCode;
                    if (showFlagsContainer) {
                        this.flagsContainer = this._createEl("div", {
                            "class": "iti__flag-container"
                        }, wrapper);
                    }
                    wrapper.appendChild(this.telInput);
                    // selected flag (displayed to left of input)
                    // using Aria tags for "Select-Only Combobox Example"
                    // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
                    if (showFlagsContainer) {
                        this.selectedFlag = this._createEl("div", _objectSpread({
                            "class": "iti__selected-flag"
                        }, allowDropdown && {
                            role: "combobox",
                            "aria-haspopup": "listbox",
                            "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                            "aria-expanded": "false",
                            "aria-label": this.options.i18n.selectedCountryAriaLabel || "Selected country"
                        }), this.flagsContainer);
                    }
                    if (showFlags) {
                        this.selectedFlagInner = this._createEl("div", {
                            "class": "iti__flag"
                        }, this.selectedFlag);
                    }
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
                            "class": "iti__arrow"
                        }, this.selectedFlag);
                        var extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
                        this.dropdownContent = this._createEl("div", {
                            "class": "iti__dropdown-content iti__hide ".concat(extraClasses)
                        });
                        if (countrySearch) {
                            this.searchInput = this._createEl("input", {
                                type: "text",
                                "class": "iti__search-input",
                                placeholder: this.options.i18n.searchPlaceholder || "Search"
                            }, this.dropdownContent);
                        }
                        // country list: preferred countries, then divider, then all countries
                        this.countryList = this._createEl("ul", {
                            "class": "iti__country-list",
                            id: "iti-".concat(this.id, "__country-listbox"),
                            role: "listbox",
                            "aria-label": this.options.i18n.countryListAriaLabel || "List of countries"
                        }, this.dropdownContent);
                        if (this.preferredCountries.length && !countrySearch) {
                            this._appendListItems(this.preferredCountries, "iti__preferred", true);
                            this._createEl("li", {
                                "class": "iti__divider",
                                "aria-hidden": "true"
                            }, this.countryList);
                        }
                        this._appendListItems(this.countries, "iti__standard");
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
                        var result = hiddenInput(telInputName);
                        var isObject = result !== null && typeof result === "object";
                        var hiddenInputPhoneName;
                        var hiddenInputCountryName;
                        if (isObject) {
                            hiddenInputPhoneName = result.phone || telInputName;
                            hiddenInputCountryName = result.country || "".concat(hiddenInputPhoneName, "_country");
                        } else {
                            hiddenInputPhoneName = result || telInputName;
                            hiddenInputCountryName = "".concat(hiddenInputPhoneName, "_country");
                        }
                        // Check if a name has been determined for the phone input field after all conditions
                        if (!hiddenInputPhoneName) {
                            return;
                        }
                        // Create hidden input for the full international number
                        this.hiddenInput = this._createEl("input", {
                            type: "hidden",
                            name: hiddenInputPhoneName
                        });
                        // Create hidden input for the selected country iso2 code
                        this.hiddenInputCountry = this._createEl("input", {
                            type: "hidden",
                            name: hiddenInputCountryName
                        });
                        wrapper.appendChild(this.hiddenInput);
                        wrapper.appendChild(this.hiddenInputCountry);
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
                    var _this$options2 = this.options, initialCountry = _this$options2.initialCountry, autoInsertDialCode = _this$options2.autoInsertDialCode, defaultToFirstCountry = _this$options2.defaultToFirstCountry;
                    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                    // flag, else fall back to the default country
                    if (dialCode && !isRegionlessNanp) {
                        this._updateFlagFromNumber(val);
                    } else if (initialCountry !== "auto" || overrideAutoCountry) {
                        var lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
                        var isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
                        // see if we should select a flag
                        if (isValidInitialCountry) {
                            this._setFlag(lowerInitialCountry);
                        } else {
                            if (dialCode && isRegionlessNanp) {
                                // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                                this._setFlag("us");
                            } else if (defaultToFirstCountry && !val) {
                                // no dial code and no initialCountry, so default to first in list
                                this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                                this._setFlag(this.defaultCountry);
                            } else {
                                // display the empty state (globe icon)
                                this._setFlag();
                            }
                        }
                        // if empty and autoInsertDialCode then insert the dial code
                        if (!val && autoInsertDialCode) {
                            this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
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
                    if (this.options.autoInsertDialCode) {
                        this._initBlurListeners();
                    }
                    if (this.options.allowDropdown) {
                        this._initDropdownListeners();
                    }
                    if (this.hiddenInput) {
                        this._initHiddenInputListener();
                    }
                }
            }, {
                key: "_initHiddenInputListener",
                value: function _initHiddenInputListener() {
                    var _this2 = this;
                    this._handleHiddenInputSubmit = function() {
                        _this2.hiddenInput.value = _this2.getNumber();
                        _this2.hiddenInputCountry.value = _this2.getSelectedCountryData().iso2;
                    };
                    if (this.telInput.form) {
                        this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                    }
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
                            _this3._showDropdown();
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
                            _this3._showDropdown();
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
                        if (_this6.options.formatAsYouType && !userOverrideFormatting && e.inputType !== "insertFromPaste") {
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
                    this.telInput.addEventListener("input", this._handleKeyEvent);
                    // update flag on cut/paste events (now supported in all major browsers)
                    this._handleClipboardEvent = function() {
                        // hack because "paste" event is fired before input is updated
                        setTimeout(_this6._handleKeyEvent);
                    };
                    this.telInput.addEventListener("cut", this._handleClipboardEvent);
                    this.telInput.addEventListener("paste", this._handleClipboardEvent);
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
                key: "_initBlurListeners",
                value: function _initBlurListeners() {
                    var _this7 = this;
                    // on blur or form submit: if just a dial code then remove it
                    this._handleSubmitOrBlurEvent = function() {
                        _this7._removeEmptyDialCode();
                    };
                    if (this.telInput.form) {
                        this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                    }
                    this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
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
                key: "_showDropdown",
                value: function _showDropdown() {
                    if (this.options.fixDropdownWidth) {
                        this.dropdownContent.style.width = "".concat(this.telInput.offsetWidth, "px");
                    }
                    this.dropdownContent.classList.remove("iti__hide");
                    this.selectedFlag.setAttribute("aria-expanded", "true");
                    this._setDropdownPosition();
                    if (this.options.countrySearch) {
                        // start by highlighting the first item in the list
                        var firstElementChild = this.countryList.firstElementChild;
                        if (firstElementChild) {
                            this._highlightListItem(firstElementChild, false);
                        }
                        this.searchInput.focus();
                    } else if (this.activeItem) {
                        // update highlighting and scroll to active list item
                        this._highlightListItem(this.activeItem, false);
                        this._scrollTo(this.activeItem, true);
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
                    var _this8 = this;
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
                                return _this8._closeDropdown();
                            };
                            window.addEventListener("scroll", this._handleWindowScroll);
                        }
                    }
                }
            }, {
                key: "_bindDropdownListeners",
                value: function _bindDropdownListeners() {
                    var _this9 = this;
                    // when mouse over a list item, just highlight that one
                    // we add the class "highlight", so if they hit "enter" we know which one to select
                    this._handleMouseoverCountryList = function(e) {
                        // handle event delegation, as we're listening for this event on the countryList
                        var listItem = e.target.closest(".iti__country");
                        if (listItem) {
                            _this9._highlightListItem(listItem, false);
                        }
                    };
                    this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                    // listen for country selection
                    this._handleClickCountryList = function(e) {
                        var listItem = e.target.closest(".iti__country");
                        if (listItem) {
                            _this9._selectListItem(listItem);
                        }
                    };
                    this.countryList.addEventListener("click", this._handleClickCountryList);
                    // click off to close
                    // (except when this initial opening click is bubbling up)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    var isOpening = true;
                    this._handleClickOffToClose = function() {
                        if (!isOpening) {
                            _this9._closeDropdown();
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
                                _this9._handleUpDownKey(e.key);
                            } else if (e.key === "Enter") {
                                _this9._handleEnterKey();
                            } else if (e.key === "Escape") {
                                _this9._closeDropdown();
                            }
                        }
                        // alpha chars to perform search
                        // regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866)
                        if (!_this9.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                            e.stopPropagation();
                            // jump to countries that start with the query string
                            if (queryTimer) {
                                clearTimeout(queryTimer);
                            }
                            query += e.key.toLowerCase();
                            _this9._searchForCountry(query);
                            // if the timer hits 1 second, reset the query
                            queryTimer = setTimeout(function() {
                                query = "";
                            }, 1e3);
                        }
                    };
                    document.addEventListener("keydown", this._handleKeydownOnDropdown);
                    if (this.options.countrySearch) {
                        var doFilter = function doFilter() {
                            var inputQuery = _this9.searchInput.value.trim();
                            if (inputQuery) {
                                _this9._filterCountries(inputQuery);
                            } else {
                                _this9._filterCountries("", true);
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
                        // if country search enabled, dont lose focus from the search input on up/down
                        var doFocus = !this.options.countrySearch;
                        this._highlightListItem(next, doFocus);
                        if (this.options.countrySearch) {
                            this._scrollTo(next, false);
                        }
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
                        return this._setFlag(iso2);
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
                    }
                    this.highlightedItem = listItem;
                    this.highlightedItem.classList.add("iti__highlight");
                    this.selectedFlag.setAttribute("aria-activedescendant", listItem.getAttribute("id"));
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
                key: "_setFlag",
                value: function _setFlag(iso2) {
                    var _this$options3 = this.options, allowDropdown = _this$options3.allowDropdown, showSelectedDialCode = _this$options3.showSelectedDialCode, showFlags = _this$options3.showFlags, countrySearch = _this$options3.countrySearch;
                    var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                    // do this first as it will throw an error and stop if iso2 is invalid
                    this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) : {};
                    // update the defaultCountry - we only need the iso2 from now on, so just store that
                    if (this.selectedCountryData.iso2) {
                        this.defaultCountry = this.selectedCountryData.iso2;
                    }
                    if (showFlags) {
                        var flagClass = iso2 ? "iti__".concat(iso2) : "iti__globe";
                        this.selectedFlagInner.setAttribute("class", "iti__flag ".concat(flagClass));
                    }
                    this._setSelectedCountryFlagTitleAttribute(iso2, showSelectedDialCode);
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
                    var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
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
                    } else if (this.options.autoInsertDialCode) {
                        if (inputVal) {
                            // there is an existing value with no dial code: prefix the new dial code
                            newNumber = newDialCode + inputVal;
                        } else {
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
                    var form = this.telInput.form;
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
                    if (this.hiddenInput && form) {
                        form.removeEventListener("submit", this._handleHiddenInputSubmit);
                    }
                    // unbind autoInsertDialCode listeners
                    if (this.options.autoInsertDialCode) {
                        if (form) {
                            form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                        }
                        this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                    }
                    // unbind key events, and cut/paste events
                    this.telInput.removeEventListener("input", this._handleKeyEvent);
                    this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                    this.telInput.removeEventListener("paste", this._handleClipboardEvent);
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
                value: function isValidNumber(mobileOnly) {
                    var val = this._getFullNumber();
                    return window.intlTelInputUtils ? intlTelInputUtils.isPossibleNumber(val, this.selectedCountryData.iso2, mobileOnly) : null;
                }
            }, {
                key: "isValidNumberPrecise",
                value: function isValidNumberPrecise() {
                    var val = this._getFullNumber();
                    return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2) : null;
                }
            }, {
                key: "setCountry",
                value: function setCountry(iso2) {
                    var iso2Lower = iso2.toLowerCase();
                    // check if already selected
                    if (this.selectedCountryData.iso2 !== iso2Lower) {
                        this._setFlag(iso2Lower);
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
                // if we have promises, then return a promise
                if (typeof Promise !== "undefined") {
                    return new Promise(function(resolve, reject) {
                        return injectScript(path, resolve, reject);
                    });
                }
                injectScript(path);
            }
            return null;
        };
        // default options
        intlTelInputGlobals.defaults = defaults;
        // version
        intlTelInputGlobals.version = "19.5.7";
        // convenience wrapper
        return function(input, options) {
            var iti = new Iti(input, options);
            iti._init();
            input.setAttribute("data-intl-tel-input-id", iti.id);
            window.intlTelInputGlobals.instances[iti.id] = iti;
            return iti;
        };
    }();
});