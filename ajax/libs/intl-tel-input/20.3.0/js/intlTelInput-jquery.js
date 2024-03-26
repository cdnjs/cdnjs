/*
 * International Telephone Input v20.3.0
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
    const intlTelInputGlobals = {
        getInstance: input => {
            const id = input.getAttribute("data-intl-tel-input-id");
            return window.intlTelInputGlobals.instances[id];
        },
        instances: {},
        // using a global like this allows us to mock it in the tests
        documentReady: () => document.readyState === "complete"
    };
    if (typeof window === "object") {
        window.intlTelInputGlobals = intlTelInputGlobals;
    }
    // these vars persist through all instances of the plugin
    let id = 0;
    const defaults = {
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
        // only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length
        strictMode: false,
        // use full screen popup instead of dropdown for country list
        useFullscreenPopup: typeof navigator !== "undefined" && typeof window !== "undefined" ? // we cannot just test screen size as some smartphones/website meta tags will report desktop
        // resolutions
        // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
        /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 : false,
        // specify the path to the libphonenumber script to enable validation/formatting
        utilsScript: ""
    };
    // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
    const regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
    // run a method on each instance of the plugin
    const forEachInstance = method => {
        const {
            instances
        } = window.intlTelInputGlobals;
        Object.values(instances).forEach(instance => instance[method]());
    };
    // this is our plugin class that we will create an instance of
    // eslint-disable-next-line no-unused-vars
    class Iti {
        constructor(input, customOptions = {}) {
            this.id = id++;
            this.telInput = input;
            this.activeItem = null;
            this.highlightedItem = null;
            // process specified options / defaults
            this.options = Object.assign({}, defaults, customOptions);
            this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
        }
        _init() {
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
            const forceShowFlags = this.options.allowDropdown && !this.options.showSelectedDialCode;
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
            const autoCountryPromise = new Promise((resolve, reject) => {
                this.resolveAutoCountryPromise = resolve;
                this.rejectAutoCountryPromise = reject;
            });
            const utilsScriptPromise = new Promise((resolve, reject) => {
                this.resolveUtilsScriptPromise = resolve;
                this.rejectUtilsScriptPromise = reject;
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
        /********************
   *  PRIVATE METHODS
   ********************/
        // prepare all of the country data, including onlyCountries, excludeCountries and
        // preferredCountries options
        _processCountryData() {
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
        // add a dial code to this.dialCodeToIso2Map
        _addToDialCodeMap(iso2, dialCode, priority) {
            if (dialCode.length > this.dialCodeMaxLen) {
                this.dialCodeMaxLen = dialCode.length;
            }
            if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
                this.dialCodeToIso2Map[dialCode] = [];
            }
            // bail if we already have this country for this dialCode
            for (let i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
                if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
                    return;
                }
            }
            // check for undefined as 0 is falsy
            const index = priority !== undefined ? priority : this.dialCodeToIso2Map[dialCode].length;
            this.dialCodeToIso2Map[dialCode][index] = iso2;
        }
        // process onlyCountries or excludeCountries array if present
        _processAllCountries() {
            if (this.options.onlyCountries.length) {
                const lowerCaseOnlyCountries = this.options.onlyCountries.map(country => country.toLowerCase());
                this.countries = allCountries.filter(country => lowerCaseOnlyCountries.indexOf(country.iso2) > -1);
            } else if (this.options.excludeCountries.length) {
                const lowerCaseExcludeCountries = this.options.excludeCountries.map(country => country.toLowerCase());
                this.countries = allCountries.filter(country => lowerCaseExcludeCountries.indexOf(country.iso2) === -1);
            } else {
                this.countries = allCountries;
            }
        }
        // Translate Countries by object literal provided on config
        _translateCountryNames() {
            for (let i = 0; i < this.countries.length; i++) {
                const iso2 = this.countries[i].iso2.toLowerCase();
                if (this.options.i18n.hasOwnProperty(iso2)) {
                    this.countries[i].name = this.options.i18n[iso2];
                }
            }
        }
        // sort by country name
        _countryNameSort(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        // generate this.dialCodes and this.dialCodeToIso2Map
        _processDialCodes() {
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
            for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                if (!this.dialCodes[c.dialCode]) {
                    this.dialCodes[c.dialCode] = true;
                }
                this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
            }
            // next: add area codes
            // this is a second loop over countries, to make sure we have all of the "root" countries
            // already in the map, so that we can access them, as each time we add an area code substring
            // to the map, we also need to include the "root" country's code, as that also matches
            for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                // area codes
                if (c.areaCodes) {
                    const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
                    // for each area code
                    for (let j = 0; j < c.areaCodes.length; j++) {
                        const areaCode = c.areaCodes[j];
                        // for each digit in the area code to add all partial matches as well
                        for (let k = 1; k < areaCode.length; k++) {
                            const partialDialCode = c.dialCode + areaCode.substr(0, k);
                            // start with the root country, as that also matches this dial code
                            this._addToDialCodeMap(rootIso2Code, partialDialCode);
                            this._addToDialCodeMap(c.iso2, partialDialCode);
                        }
                        // add the full area code
                        this._addToDialCodeMap(c.iso2, c.dialCode + areaCode);
                    }
                }
            }
        }
        // process preferred countries - iterate through the preferences, fetching the country data for
        // each one
        _processPreferredCountries() {
            this.preferredCountries = [];
            for (let i = 0; i < this.options.preferredCountries.length; i++) {
                const iso2 = this.options.preferredCountries[i].toLowerCase();
                const countryData = this._getCountryData(iso2, true);
                if (countryData) {
                    this.preferredCountries.push(countryData);
                }
            }
        }
        // create a DOM element
        _createEl(name, attrs, container) {
            const el = document.createElement(name);
            if (attrs) {
                Object.entries(attrs).forEach(([ key, value ]) => el.setAttribute(key, value));
            }
            if (container) {
                container.appendChild(el);
            }
            return el;
        }
        // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
        _generateMarkup() {
            this.telInput.classList.add("iti__tel-input");
            // if autocomplete does not exist on the element and its form, then
            // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
            // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
            // autocompleted number, which on submit could mean wrong number is saved
            if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
                this.telInput.setAttribute("autocomplete", "off");
            }
            const {
                allowDropdown,
                showSelectedDialCode,
                showFlags,
                containerClass,
                hiddenInput,
                dropdownContainer,
                fixDropdownWidth,
                useFullscreenPopup,
                countrySearch,
                i18n
            } = this.options;
            // containers (mostly for positioning)
            let parentClass = "iti";
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
                parentClass += ` ${containerClass}`;
            }
            if (!useFullscreenPopup) {
                parentClass += " iti--inline-dropdown";
            }
            const wrapper = this._createEl("div", {
                class: parentClass
            });
            this.telInput.parentNode.insertBefore(wrapper, this.telInput);
            // if we're showing flags or dial codes, we need the flags container etc
            if (showFlags || showSelectedDialCode) {
                this.flagsContainer = this._createEl("div", {
                    class: "iti__flag-container"
                }, wrapper);
                // selected flag (displayed on left of input while allowDropdown is enabled, otherwise to right)
                // when countrySearch disabled: using Aria tags for "Select-Only Combobox Example"
                // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
                this.selectedFlag = this._createEl("div", {
                    class: "iti__selected-flag",
                    ...allowDropdown && {
                        role: "button",
                        "aria-expanded": "false",
                        "aria-label": this.options.i18n.selectedCountryAriaLabel || "Selected country",
                        "aria-haspopup": countrySearch ? "true" : "listbox",
                        "aria-controls": countrySearch ? `iti-${this.id}__dropdown-content` : `iti-${this.id}__country-listbox`,
                        ...countrySearch || {
                            role: "combobox"
                        }
                    }
                }, this.flagsContainer);
                // we now include the selected flag element even when showFlags is disabled,
                // as need to show globe icon for showSelectedDialCode empty state
                this.selectedFlagInner = this._createEl("div", null, this.selectedFlag);
                this.selectedFlagA11yText = this._createEl("span", {
                    class: "iti__a11y-text"
                }, this.selectedFlagInner);
            }
            wrapper.appendChild(this.telInput);
            if (this.selectedFlag && this.telInput.disabled) {
                this.selectedFlag.setAttribute("aria-disabled", "true");
            }
            if (showSelectedDialCode) {
                this.selectedDialCode = this._createEl("div", {
                    class: "iti__selected-dial-code"
                }, this.selectedFlag);
            }
            if (allowDropdown) {
                if (!this.telInput.disabled) {
                    // make element focusable and tab navigable
                    this.selectedFlag.setAttribute("tabindex", "0");
                }
                this.dropdownArrow = this._createEl("div", {
                    class: "iti__arrow",
                    "aria-hidden": "true"
                }, this.selectedFlag);
                const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
                this.dropdownContent = this._createEl("div", {
                    id: `iti-${this.id}__dropdown-content`,
                    class: `iti__dropdown-content iti__hide ${extraClasses}`
                });
                if (countrySearch) {
                    this.searchInput = this._createEl("input", {
                        type: "text",
                        class: "iti__search-input",
                        placeholder: i18n.searchPlaceholder || "Search",
                        role: "combobox",
                        "aria-expanded": "true",
                        "aria-label": i18n.searchPlaceholder || "Search",
                        "aria-controls": `iti-${this.id}__country-listbox`,
                        "aria-autocomplete": "list",
                        autocomplete: "off"
                    }, this.dropdownContent);
                    this.searchResultsA11yText = this._createEl("span", {
                        class: "iti__a11y-text"
                    }, this.dropdownContent);
                }
                // country list: preferred countries, then divider, then all countries
                this.countryList = this._createEl("ul", {
                    class: "iti__country-list",
                    id: `iti-${this.id}__country-listbox`,
                    role: "listbox",
                    "aria-label": i18n.countryListAriaLabel || "List of countries"
                }, this.dropdownContent);
                if (this.preferredCountries.length && !countrySearch) {
                    this._appendListItems(this.preferredCountries, "iti__preferred", true);
                    this._createEl("li", {
                        class: "iti__divider",
                        "aria-hidden": "true"
                    }, this.countryList);
                }
                this._appendListItems(this.countries, "iti__standard");
                if (countrySearch) {
                    this._updateSearchResultsText();
                }
                // create dropdownContainer markup
                if (dropdownContainer) {
                    let dropdownClasses = "iti iti--container";
                    if (useFullscreenPopup) {
                        dropdownClasses += " iti--fullscreen-popup";
                    } else {
                        dropdownClasses += " iti--inline-dropdown";
                    }
                    if (countrySearch) {
                        dropdownClasses += " iti--country-search";
                    }
                    this.dropdown = this._createEl("div", {
                        class: dropdownClasses
                    });
                    this.dropdown.appendChild(this.dropdownContent);
                } else {
                    this.flagsContainer.appendChild(this.dropdownContent);
                }
            }
            if (hiddenInput) {
                const telInputName = this.telInput.getAttribute("name");
                const names = hiddenInput(telInputName);
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
        // for each of the passed countries: add a country <li> to the countryList <ul> container
        _appendListItems(countries, className, preferred) {
            for (let i = 0; i < countries.length; i++) {
                const c = countries[i];
                const idSuffix = preferred ? "-preferred" : "";
                const listItem = this._createEl("li", {
                    id: `iti-${this.id}__item-${c.iso2}${idSuffix}`,
                    class: `iti__country ${className}`,
                    tabindex: "-1",
                    role: "option",
                    "data-dial-code": c.dialCode,
                    "data-country-code": c.iso2,
                    "aria-selected": "false"
                }, this.countryList);
                // store this for later use e.g. country search filtering
                c.nodeById[this.id] = listItem;
                let content = "";
                // add the flag
                if (this.options.showFlags) {
                    content += `<div class='iti__flag-box'><div class='iti__flag iti__${c.iso2}'></div></div>`;
                }
                // and the country name and dial code
                content += `<span class='iti__country-name'>${c.name}</span>`;
                content += `<span class='iti__dial-code'>+${c.dialCode}</span>`;
                listItem.insertAdjacentHTML("beforeend", content);
            }
        }
        // set the initial state of the input value and the selected flag by:
        // 1. extracting a dial code from the given number
        // 2. using explicit initialCountry
        // 3. picking the first preferred country
        // 4. picking the first country
        _setInitialState(overrideAutoCountry = false) {
            // fix firefox bug: when first load page (with input with value set to number with intl dial
            // code) and initialising plugin removes the dial code from the input, then refresh page,
            // and we try to init plugin again but this time on number without dial code so get grey flag
            const attributeValue = this.telInput.getAttribute("value");
            const inputValue = this.telInput.value;
            const useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
            const val = useAttribute ? attributeValue : inputValue;
            const dialCode = this._getDialCode(val);
            const isRegionlessNanp = this._isRegionlessNanp(val);
            const {
                initialCountry
            } = this.options;
            // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
            // flag, else fall back to the default country
            if (dialCode && !isRegionlessNanp) {
                this._updateFlagFromNumber(val);
            } else if (initialCountry !== "auto" || overrideAutoCountry) {
                const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
                const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
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
        // initialise the main event listeners: input keyup, and click selected flag
        _initListeners() {
            this._initTelInputListeners();
            if (this.options.allowDropdown) {
                this._initDropdownListeners();
            }
            if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
                this._initHiddenInputListener();
            }
        }
        // update hidden input on form submit
        _initHiddenInputListener() {
            this._handleHiddenInputSubmit = () => {
                if (this.hiddenInput) {
                    this.hiddenInput.value = this.getNumber();
                }
                if (this.hiddenInputCountry) {
                    this.hiddenInputCountry.value = this.getSelectedCountryData().iso2;
                }
            };
            this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
        }
        // initialise the dropdown listeners
        _initDropdownListeners() {
            // hack for input nested inside label (which is valid markup): clicking the selected-flag to
            // open the dropdown would then automatically trigger a 2nd click on the input which would
            // close it again
            this._handleLabelClick = e => {
                // if the dropdown is closed, then focus the input, else ignore the click
                if (this.dropdownContent.classList.contains("iti__hide")) {
                    this.telInput.focus();
                } else {
                    e.preventDefault();
                }
            };
            const label = this.telInput.closest("label");
            if (label) {
                label.addEventListener("click", this._handleLabelClick);
            }
            // toggle country dropdown on click
            this._handleClickSelectedFlag = () => {
                // only intercept this event if we're opening the dropdown
                // else let it bubble up to the top ("click-off-to-close" listener)
                // we cannot just stopPropagation as it may be needed to close another instance
                if (this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly) {
                    this._openDropdown();
                }
            };
            this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
            // open dropdown if selected flag is focused and they press up/down/space/enter
            this._handleFlagsContainerKeydown = e => {
                const isDropdownHidden = this.dropdownContent.classList.contains("iti__hide");
                if (isDropdownHidden && [ "ArrowUp", "ArrowDown", " ", "Enter" ].includes(e.key)) {
                    // prevent form from being submitted if "ENTER" was pressed
                    e.preventDefault();
                    // prevent event from being handled again by document
                    e.stopPropagation();
                    this._openDropdown();
                }
                // allow navigation from dropdown to input on TAB
                if (e.key === "Tab") {
                    this._closeDropdown();
                }
            };
            this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
        }
        // init many requests: utils script / geo ip lookup
        _initRequests() {
            // if the user has specified the path to the utils script, fetch it on window.load, else resolve
            if (this.options.utilsScript && !window.intlTelInputUtils) {
                // if the plugin is being initialised after the window.load event has already been fired
                if (window.intlTelInputGlobals.documentReady()) {
                    window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                } else {
                    // wait until the load event so we don't block any other requests e.g. the flags image
                    window.addEventListener("load", () => {
                        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
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
        // perform the geo ip lookup
        _loadAutoCountry() {
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
                    this.options.geoIpLookup((iso2 = "") => {
                        const iso2Lower = iso2.toLowerCase();
                        const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
                        if (isValidIso2) {
                            window.intlTelInputGlobals.autoCountry = iso2Lower;
                            // tell all instances the auto country is ready
                            // TODO: this should just be the current instances
                            // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                            // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                            // setTimeout means that the current thread of execution will finish before executing
                            // this, which allows the plugin to finish initialising.
                            setTimeout(() => forEachInstance("handleAutoCountry"));
                        } else {
                            this._setInitialState(true);
                            forEachInstance("rejectAutoCountryPromise");
                        }
                    }, () => forEachInstance("rejectAutoCountryPromise"));
                }
            }
        }
        // initialize the tel input listeners
        _initTelInputListeners() {
            const {
                strictMode,
                formatAsYouType
            } = this.options;
            let userOverrideFormatting = false;
            // update flag on input event
            this._handleInputEvent = e => {
                if (this._updateFlagFromNumber(this.telInput.value)) {
                    this._triggerCountryChange();
                }
                // if user types their own formatting char (not a plus or a numeric), or they paste something, then set the override
                const isFormattingChar = e && e.data && /[^+0-9]/.test(e.data);
                const isPaste = e && e.inputType === "insertFromPaste" && this.telInput.value;
                if (isFormattingChar || isPaste && !strictMode) {
                    userOverrideFormatting = true;
                }
                // if user removes all formatting chars, then reset the override
                 else if (!/[^+0-9]/.test(this.telInput.value)) {
                    userOverrideFormatting = false;
                }
                // handle FAYT, unless userOverrideFormatting
                if (formatAsYouType && !userOverrideFormatting) {
                    // maintain caret position after reformatting
                    const currentCaretPos = this.telInput.selectionStart;
                    const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
                    const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
                    const isDeleteForwards = e && e.inputType === "deleteContentForward";
                    const formattedValue = this._formatNumberAsYouType();
                    const newCaretPos = this._translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
                    this.telInput.value = formattedValue;
                    this.telInput.setSelectionRange(newCaretPos, newCaretPos);
                }
            };
            // this handles individual key presses as well as cut/paste events
            // the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
            // whereas "keyup" fires even for shift key, arrow key presses etc
            this.telInput.addEventListener("input", this._handleInputEvent);
            if (strictMode) {
                this._handleKeydownEvent = e => {
                    // only ignore actual character presses, rather than ctrl, alt, shift, command, arrow keys, delete/backspace, cut/copy/paste etc
                    if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
                        const isInitialPlus = this.telInput.selectionStart === 0 && e.key === "+";
                        const isNumeric = /^[0-9]$/.test(e.key);
                        const isAllowedChar = isInitialPlus || isNumeric;
                        const fullNumber = this._getFullNumber();
                        const coreNumber = intlTelInputUtils.getCoreNumber(fullNumber, this.selectedCountryData.iso2);
                        const hasReachedMaxLength = this.maxCoreNumberLength && coreNumber.length >= this.maxCoreNumberLength;
                        if (!isAllowedChar || hasReachedMaxLength) {
                            e.preventDefault();
                        }
                    }
                };
                this.telInput.addEventListener("keydown", this._handleKeydownEvent);
            }
        }
        // iterate through the formattedValue until hit the right number of relevant chars
        _translateCursorPosition(relevantChars, formattedValue, prevCaretPos, isDeleteForwards) {
            // if the first char is a formatting char, and they backspace delete it:
            // cursor should stay at the start (pos 0), rather than stick to the first digit (pos 1)
            if (prevCaretPos === 0 && !isDeleteForwards) {
                return 0;
            }
            let count = 0;
            for (let i = 0; i < formattedValue.length; i++) {
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
        // adhere to the input's maxlength attr
        _cap(number) {
            const max = this.telInput.getAttribute("maxlength");
            return max && number.length > max ? number.substr(0, max) : number;
        }
        // clear the input if it just contains a dial code
        _removeEmptyDialCode() {
            if (this.telInput.value.charAt(0) === "+") {
                const numeric = this._getNumeric(this.telInput.value);
                // if just a plus, or if just a dial code
                if (!numeric || this.selectedCountryData.dialCode === numeric) {
                    this.telInput.value = "";
                }
            }
        }
        // extract the numeric digits from the given string
        _getNumeric(s) {
            return s.replace(/\D/g, "");
        }
        // trigger a custom event on the input
        _trigger(name) {
            const e = new Event(name, {
                bubbles: true,
                cancelable: true
            });
            this.telInput.dispatchEvent(e);
        }
        // open the dropdown
        _openDropdown() {
            const {
                fixDropdownWidth,
                countrySearch
            } = this.options;
            if (fixDropdownWidth) {
                this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`;
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
                const {
                    firstElementChild
                } = this.countryList;
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
        // make sure the el has the className or not, depending on the value of shouldHaveClass
        _toggleClass(el, className, shouldHaveClass) {
            if (shouldHaveClass && !el.classList.contains(className)) {
                el.classList.add(className);
            } else if (!shouldHaveClass && el.classList.contains(className)) {
                el.classList.remove(className);
            }
        }
        // decide if should position dropdown above or below input (depends on position within viewport, and scroll)
        _setDropdownPosition() {
            if (this.options.dropdownContainer) {
                this.options.dropdownContainer.appendChild(this.dropdown);
            }
            if (!this.options.useFullscreenPopup) {
                const pos = this.telInput.getBoundingClientRect();
                // windowTop from https://stackoverflow.com/a/14384091/217866
                const windowTop = document.documentElement.scrollTop;
                const inputTop = pos.top + windowTop;
                const dropdownHeight = this.dropdownContent.offsetHeight;
                // dropdownFitsBelow = (dropdownBottom < windowBottom)
                const dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                const dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                // dont allow positioning above when country search enabled as the search box jumps around as you filter countries
                const positionDropdownAboveInput = !this.options.countrySearch && !dropdownFitsBelow && dropdownFitsAbove;
                // by default, the dropdown will be below the input. If we want to position it above the
                // input, we add the dropup class.
                this._toggleClass(this.dropdownContent, "iti__dropdown-content--dropup", positionDropdownAboveInput);
                // if dropdownContainer is enabled, calculate postion
                if (this.options.dropdownContainer) {
                    // if we want to position the dropdown below the input, we need to add the input height to the top value
                    const extraTop = positionDropdownAboveInput ? 0 : this.telInput.offsetHeight;
                    // calculate placement
                    this.dropdown.style.top = `${inputTop + extraTop}px`;
                    this.dropdown.style.left = `${pos.left + document.body.scrollLeft}px`;
                    // close menu on window scroll
                    this._handleWindowScroll = () => this._closeDropdown();
                    window.addEventListener("scroll", this._handleWindowScroll);
                }
            }
        }
        // we only bind dropdown listeners when the dropdown is open
        _bindDropdownListeners() {
            // when mouse over a list item, just highlight that one
            // we add the class "highlight", so if they hit "enter" we know which one to select
            this._handleMouseoverCountryList = e => {
                // handle event delegation, as we're listening for this event on the countryList
                const listItem = e.target.closest(".iti__country");
                if (listItem) {
                    this._highlightListItem(listItem, false);
                }
            };
            this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
            // listen for country selection
            this._handleClickCountryList = e => {
                const listItem = e.target.closest(".iti__country");
                if (listItem) {
                    this._selectListItem(listItem);
                }
            };
            this.countryList.addEventListener("click", this._handleClickCountryList);
            // click off to close
            // (except when this initial opening click is bubbling up)
            // we cannot just stopPropagation as it may be needed to close another instance
            let isOpening = true;
            this._handleClickOffToClose = () => {
                if (!isOpening) {
                    this._closeDropdown();
                }
                isOpening = false;
            };
            document.documentElement.addEventListener("click", this._handleClickOffToClose);
            // listen for up/down scrolling, enter to select, or escape to close
            // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
            // just hit down and hold it to scroll down (no keyup event).
            // listen on the document because that's where key events are triggered if no input has focus
            let query = "";
            let queryTimer = null;
            this._handleKeydownOnDropdown = e => {
                // prevent down key from scrolling the whole page,
                // and enter key from submitting a form etc
                if ([ "ArrowUp", "ArrowDown", "Enter", "Escape" ].includes(e.key)) {
                    e.preventDefault();
                    e.stopPropagation();
                    // up and down to navigate
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        this._handleUpDownKey(e.key);
                    }
                    // enter to select
                     else if (e.key === "Enter") {
                        this._handleEnterKey();
                    }
                    // esc to close
                     else if (e.key === "Escape") {
                        this._closeDropdown();
                    }
                }
                // alpha chars to perform search
                // regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866)
                if (!this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                    e.stopPropagation();
                    // jump to countries that start with the query string
                    if (queryTimer) {
                        clearTimeout(queryTimer);
                    }
                    query += e.key.toLowerCase();
                    this._searchForCountry(query);
                    // if the timer hits 1 second, reset the query
                    queryTimer = setTimeout(() => {
                        query = "";
                    }, 1e3);
                }
            };
            document.addEventListener("keydown", this._handleKeydownOnDropdown);
            if (this.options.countrySearch) {
                const doFilter = () => {
                    const inputQuery = this.searchInput.value.trim();
                    if (inputQuery) {
                        this._filterCountries(inputQuery);
                    } else {
                        this._filterCountries("", true);
                    }
                };
                let keyupTimer = null;
                this._handleSearchChange = () => {
                    // filtering country nodes is expensive (lots of DOM manipulation), so rate limit it
                    if (keyupTimer) {
                        clearTimeout(keyupTimer);
                    }
                    keyupTimer = setTimeout(() => {
                        doFilter();
                        keyupTimer = null;
                    }, 100);
                };
                this.searchInput.addEventListener("input", this._handleSearchChange);
                // stop propagation on search input click, so doesn't trigger click-off-to-close listener
                this.searchInput.addEventListener("click", e => e.stopPropagation());
            }
        }
        // turns "Réunion" into "Reunion"
        // from https://stackoverflow.com/a/37511463
        _normaliseString(s = "") {
            return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        _filterCountries(query, isReset = false) {
            let isFirst = true;
            this.countryList.innerHTML = "";
            const normalisedQuery = this._normaliseString(query);
            for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                const normalisedCountryName = this._normaliseString(c.name);
                const fullDialCode = `+${c.dialCode}`;
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
        // update search results text (for a11y)
        _updateSearchResultsText() {
            const {
                i18n
            } = this.options;
            const count = this.countryList.childElementCount;
            let searchText;
            if (count === 0) {
                searchText = i18n.zeroSearchResults || "No results found";
            } else if (count === 1) {
                searchText = i18n.oneSearchResult || "1 result found";
            } else {
                // eslint-disable-next-line no-template-curly-in-string
                searchText = i18n.multipleSearchResults ? i18n.multipleSearchResults.replace("${count}", count) : `${count} results found`;
            }
            this.searchResultsA11yText.textContent = searchText;
        }
        // highlight the next/prev item in the list (and ensure it is visible)
        _handleUpDownKey(key) {
            let next = key === "ArrowUp" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
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
                const doFocus = !this.options.countrySearch;
                this._highlightListItem(next, doFocus);
            }
        }
        // select the currently highlighted item
        _handleEnterKey() {
            if (this.highlightedItem) {
                this._selectListItem(this.highlightedItem);
            }
        }
        // find the first list item whose name starts with the query string
        _searchForCountry(query) {
            for (let i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this.countries[i].name, query)) {
                    const listItem = this.countries[i].nodeById[this.id];
                    // update highlighting and scroll
                    this._highlightListItem(listItem, false);
                    this._scrollTo(listItem, true);
                    break;
                }
            }
        }
        // check if string a starts with string b
        _startsWith(a, b) {
            return a.substr(0, b.length).toLowerCase() === b;
        }
        // update the input's value to the given val (format first if possible)
        // NOTE: this is called from _setInitialState, handleUtils and setNumber
        _updateValFromNumber(fullNumber) {
            let number = fullNumber;
            if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                const useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.showSelectedDialCode;
                const {
                    NATIONAL,
                    INTERNATIONAL
                } = intlTelInputUtils.numberFormat;
                const format = useNational ? NATIONAL : INTERNATIONAL;
                number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
            }
            number = this._beforeSetNumber(number);
            this.telInput.value = number;
        }
        // check if need to select a new flag based on the given number
        // Note: called from _setInitialState, keyup handler, setNumber
        _updateFlagFromNumber(fullNumber) {
            const plusIndex = fullNumber.indexOf("+");
            // if it contains a plus, discard any chars before it e.g. accidental space char.
            // this keeps the selected country auto-updating correctly, which we want as
            // libphonenumber's validation/getNumber methods will ignore these chars anyway
            let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
            // if we already have US/Canada selected, make sure the number starts
            // with a +1 so _getDialCode will be able to extract the area code
            // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
            // from the number), that means we're initialising the plugin with a number that already has a
            // dial code, so fine to ignore this bit
            const selectedDialCode = this.selectedCountryData.dialCode;
            const isNanp = selectedDialCode === "1";
            if (number && isNanp && number.charAt(0) !== "+") {
                if (number.charAt(0) !== "1") {
                    number = `1${number}`;
                }
                number = `+${number}`;
            }
            // if showSelectedDialCode enabled, then consider the selected dial code to be part of the number
            if (this.options.showSelectedDialCode && selectedDialCode && number.charAt(0) !== "+") {
                number = `+${selectedDialCode}${number}`;
            }
            // try and extract valid dial code from input
            const dialCode = this._getDialCode(number, true);
            const numeric = this._getNumeric(number);
            let iso2 = null;
            if (dialCode) {
                const iso2Codes = this.dialCodeToIso2Map[this._getNumeric(dialCode)];
                // check if the right country is already selected. this should be false if the number is
                // longer than the matched dial code because in this case we need to make sure that if
                // there are multiple country matches, that the first one is selected (note: we could
                // just check that here, but it requires the same loop that we already have later)
                const alreadySelected = iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                const isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                // only update the flag if:
                // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                // AND
                // B) the right country is not already selected
                if (!isRegionlessNanpNumber && !alreadySelected) {
                    // if using onlyCountries option, iso2Codes[0] may be empty, so we must find the first
                    // non-empty index
                    for (let j = 0; j < iso2Codes.length; j++) {
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
        // check if the given number is a regionless NANP number (expects the number to contain an
        // international dial code)
        _isRegionlessNanp(number) {
            const numeric = this._getNumeric(number);
            if (numeric.charAt(0) === "1") {
                const areaCode = numeric.substr(1, 3);
                return regionlessNanpNumbers.indexOf(areaCode) !== -1;
            }
            return false;
        }
        // remove highlighting from other list items and highlight the given item
        _highlightListItem(listItem, shouldFocus) {
            const prevItem = this.highlightedItem;
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
        // find the country data for the given iso2 code
        // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
        _getCountryData(iso2, allowFail) {
            for (let i = 0; i < this.countries.length; i++) {
                if (this.countries[i].iso2 === iso2) {
                    return this.countries[i];
                }
            }
            if (allowFail) {
                return null;
            }
            throw new Error(`No country data for '${iso2}'`);
        }
        // update the selected flag, dial code (if showSelectedDialCode), placeholder, title, and active list item
        // Note: called from _setInitialState, _updateFlagFromNumber, _selectListItem, setCountry
        _setCountry(iso2) {
            const {
                allowDropdown,
                showSelectedDialCode,
                showFlags,
                countrySearch,
                i18n
            } = this.options;
            const prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
            // do this first as it will throw an error and stop if iso2 is invalid
            this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) : {};
            // update the defaultCountry - we only need the iso2 from now on, so just store that
            if (this.selectedCountryData.iso2) {
                this.defaultCountry = this.selectedCountryData.iso2;
            }
            // update the flag class and the a11y text
            if (this.selectedFlagInner) {
                let flagClass = "";
                let a11yText = "";
                if (iso2) {
                    if (showFlags) {
                        flagClass = `iti__flag iti__${iso2}`;
                        a11yText = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
                    }
                    // if showFlags disabled and showSelectedDialCode is enabled, we dont show a flag or have any a11y text, as the displayed dial code is enough
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
                const dialCode = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
                this.selectedDialCode.innerHTML = dialCode;
                // offsetWidth is zero if input is in a hidden container during initialisation
                const selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                if (this.isRTL) {
                    this.telInput.style.paddingRight = `${selectedFlagWidth + 6}px`;
                } else {
                    this.telInput.style.paddingLeft = `${selectedFlagWidth + 6}px`;
                }
            }
            // and the input's placeholder
            this._updatePlaceholder();
            // update the maximum valid number length
            this._updateMaxLength();
            // update the active list item (only if country search disabled, as country search doesn't store the active item)
            if (allowDropdown && !countrySearch) {
                const prevItem = this.activeItem;
                if (prevItem) {
                    prevItem.classList.remove("iti__active");
                    prevItem.setAttribute("aria-selected", "false");
                }
                if (iso2) {
                    // check if there is a preferred item first, else fall back to standard
                    const nextItem = this.countryList.querySelector(`#iti-${this.id}__item-${iso2}-preferred`) || this.countryList.querySelector(`#iti-${this.id}__item-${iso2}`);
                    nextItem.setAttribute("aria-selected", "true");
                    nextItem.classList.add("iti__active");
                    this.activeItem = nextItem;
                }
            }
            // return if the flag has changed or not
            return prevCountry.iso2 !== iso2;
        }
        // update the maximum valid number length for the currently selected country
        _updateMaxLength() {
            if (this.options.strictMode && window.intlTelInputUtils) {
                if (this.selectedCountryData.iso2) {
                    const numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                    let exampleNumber = intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, null, numberType, true);
                    // see if adding more digits is still valid to get the true maximum valid length
                    let validNumber = exampleNumber;
                    while (intlTelInputUtils.isPossibleNumber(exampleNumber, this.selectedCountryData.iso2)) {
                        validNumber = exampleNumber;
                        exampleNumber += "0";
                    }
                    const coreNumber = intlTelInputUtils.getCoreNumber(validNumber, this.selectedCountryData.iso2);
                    this.maxCoreNumberLength = coreNumber.length;
                } else {
                    this.maxCoreNumberLength = null;
                }
            }
        }
        _setSelectedCountryFlagTitleAttribute(iso2, showSelectedDialCode) {
            if (!this.selectedFlag) {
                return;
            }
            let title;
            if (iso2 && !showSelectedDialCode) {
                title = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`;
            } else if (iso2) {
                // For screen reader output, we don't want to include the dial code in the reader output twice
                // so just use the selected country name here:
                title = this.selectedCountryData.name;
            } else {
                title = "Unknown";
            }
            this.selectedFlag.setAttribute("title", title);
        }
        // when the input is in a hidden container during initialisation, we must inject some markup
        // into the end of the DOM to calculate the correct offsetWidth
        // NOTE: this is only used when showSelectedDialCode is enabled, so flagsContainer and selectedFlag
        // will definitely exist
        _getHiddenSelectedFlagWidth() {
            // to get the right styling to apply, all we need is a shallow clone of the container,
            // and then to inject a deep clone of the selectedFlag element
            const containerClone = this.telInput.parentNode.cloneNode();
            containerClone.style.visibility = "hidden";
            document.body.appendChild(containerClone);
            const flagsContainerClone = this.flagsContainer.cloneNode();
            containerClone.appendChild(flagsContainerClone);
            const selectedFlagClone = this.selectedFlag.cloneNode(true);
            flagsContainerClone.appendChild(selectedFlagClone);
            const width = selectedFlagClone.offsetWidth;
            containerClone.parentNode.removeChild(containerClone);
            return width;
        }
        // update the input placeholder to an example number from the currently selected country
        _updatePlaceholder() {
            const {
                autoPlaceholder,
                placeholderNumberType,
                nationalMode,
                customPlaceholder
            } = this.options;
            const shouldSetPlaceholder = autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && autoPlaceholder === "polite";
            if (window.intlTelInputUtils && shouldSetPlaceholder) {
                const numberType = intlTelInputUtils.numberType[placeholderNumberType];
                // note: must set placeholder to empty string if no country selected (globe icon showing)
                let placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, nationalMode, numberType) : "";
                placeholder = this._beforeSetNumber(placeholder);
                if (typeof customPlaceholder === "function") {
                    placeholder = customPlaceholder(placeholder, this.selectedCountryData);
                }
                this.telInput.setAttribute("placeholder", placeholder);
            }
        }
        // called when the user selects a list item from the dropdown
        _selectListItem(listItem) {
            // update selected flag and active list item
            const flagChanged = this._setCountry(listItem.getAttribute("data-country-code"));
            this._closeDropdown();
            this._updateDialCode(listItem.getAttribute("data-dial-code"));
            // focus the input
            this.telInput.focus();
            if (flagChanged) {
                this._triggerCountryChange();
            }
        }
        // close the dropdown and unbind any listeners
        _closeDropdown() {
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
        // check if an element is visible within it's container, else scroll until it is
        _scrollTo(element, middle) {
            const container = this.countryList;
            // windowTop from https://stackoverflow.com/a/14384091/217866
            const windowTop = document.documentElement.scrollTop;
            const containerHeight = container.offsetHeight;
            const containerTop = container.getBoundingClientRect().top + windowTop;
            const containerBottom = containerTop + containerHeight;
            const elementHeight = element.offsetHeight;
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + elementHeight;
            let newScrollTop = elementTop - containerTop + container.scrollTop;
            const middleOffset = containerHeight / 2 - elementHeight / 2;
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
                const heightDifference = containerHeight - elementHeight;
                container.scrollTop = newScrollTop - heightDifference;
            }
        }
        // replace any existing dial code with the new one
        // Note: called from _selectListItem and setCountry
        _updateDialCode(newDialCodeBare) {
            const inputVal = this.telInput.value;
            // save having to pass this every time
            const newDialCode = `+${newDialCodeBare}`;
            let newNumber;
            if (inputVal.charAt(0) === "+") {
                // there's a plus so we're dealing with a replacement
                const prevDialCode = this._getDialCode(inputVal);
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
        // try and extract a valid international dial code from a full telephone number
        // Note: returns the raw string inc plus character and any whitespace/dots etc
        _getDialCode(number, includeAreaCode) {
            let dialCode = "";
            // only interested in international numbers (starting with a plus)
            if (number.charAt(0) === "+") {
                let numericChars = "";
                // iterate over chars
                for (let i = 0; i < number.length; i++) {
                    const c = number.charAt(i);
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
        // get the input val, adding the dial code if showSelectedDialCode is enabled
        _getFullNumber() {
            const val = this.telInput.value.trim();
            const {
                dialCode
            } = this.selectedCountryData;
            let prefix;
            const numericVal = this._getNumeric(val);
            if (this.options.showSelectedDialCode && !this.options.nationalMode && val.charAt(0) !== "+" && dialCode && numericVal) {
                // when using showSelectedDialCode, it is visible so is effectively part of the typed number
                prefix = `+${dialCode}`;
            } else {
                prefix = "";
            }
            return prefix + val;
        }
        // remove the dial code if showSelectedDialCode is enabled
        // also cap the length if the input has a maxlength attribute
        _beforeSetNumber(fullNumber) {
            let number = fullNumber;
            if (this.options.showSelectedDialCode) {
                let dialCode = this._getDialCode(number);
                // if there is a valid dial code
                if (dialCode) {
                    // in case _getDialCode returned an area code as well
                    dialCode = `+${this.selectedCountryData.dialCode}`;
                    // a lot of numbers will have a space separating the dial code and the main number, and
                    // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                    // rid of it
                    // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                    const start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                    number = number.substr(start);
                }
            }
            return this._cap(number);
        }
        // trigger the 'countrychange' event
        _triggerCountryChange() {
            this._trigger("countrychange");
        }
        // format the number as the user types
        _formatNumberAsYouType() {
            const val = this._getFullNumber();
            const result = window.intlTelInputUtils ? intlTelInputUtils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
            // if showSelectedDialCode and they haven't (re)typed the dial code in the input as well, then remove the dial code
            const {
                dialCode
            } = this.selectedCountryData;
            if (this.options.showSelectedDialCode && !this.options.nationalMode && this.telInput.value.charAt(0) !== "+" && result.includes(`+${dialCode}`)) {
                const afterDialCode = result.split(`+${dialCode}`)[1] || "";
                return afterDialCode.trim();
            }
            return result;
        }
        /**************************
   *  SECRET PUBLIC METHODS
   **************************/
        // this is called when the geoip call returns
        handleAutoCountry() {
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
        // this is called when the utils request completes
        handleUtils() {
            // if the request was successful
            if (window.intlTelInputUtils) {
                // if there's an initial value in the input, then format it
                if (this.telInput.value) {
                    this._updateValFromNumber(this.telInput.value);
                }
                if (this.selectedCountryData.iso2) {
                    this._updatePlaceholder();
                    this._updateMaxLength();
                }
            }
            this.resolveUtilsScriptPromise();
        }
        /********************
   *  PUBLIC METHODS
   ********************/
        // remove plugin
        destroy() {
            if (this.options.allowDropdown) {
                // make sure the dropdown is closed (and unbind listeners)
                this._closeDropdown();
                this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                // label click hack
                const label = this.telInput.closest("label");
                if (label) {
                    label.removeEventListener("click", this._handleLabelClick);
                }
            }
            // unbind hiddenInput listeners
            const {
                form
            } = this.telInput;
            if (this._handleHiddenInputSubmit && form) {
                form.removeEventListener("submit", this._handleHiddenInputSubmit);
            }
            // unbind key events, and cut/paste events
            this.telInput.removeEventListener("input", this._handleInputEvent);
            if (this._handleKeydownEvent) {
                this.telInput.removeEventListener("keydown", this._handleKeydownEvent);
            }
            // remove attribute of id instance: data-intl-tel-input-id
            this.telInput.removeAttribute("data-intl-tel-input-id");
            // remove markup (but leave the original input)
            const wrapper = this.telInput.parentNode;
            wrapper.parentNode.insertBefore(this.telInput, wrapper);
            wrapper.parentNode.removeChild(wrapper);
            delete window.intlTelInputGlobals.instances[this.id];
        }
        // get the extension from the current number
        getExtension() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return "";
        }
        // format the number to the given format
        getNumber(format) {
            if (window.intlTelInputUtils) {
                const {
                    iso2
                } = this.selectedCountryData;
                return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
            }
            return "";
        }
        // get the type of the entered number e.g. landline/mobile
        getNumberType() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return -99;
        }
        // get the country data for the currently selected flag
        getSelectedCountryData() {
            return this.selectedCountryData;
        }
        // get the validation error
        getValidationError() {
            if (window.intlTelInputUtils) {
                const {
                    iso2
                } = this.selectedCountryData;
                return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
            }
            return -99;
        }
        // validate the input val - assumes the global function isPossibleNumber (from utilsScript)
        isValidNumber(mobileOnly = true) {
            const val = this._getFullNumber();
            // return false for any alpha chars
            if (/\p{L}/u.test(val)) {
                return false;
            }
            return window.intlTelInputUtils ? intlTelInputUtils.isPossibleNumber(val, this.selectedCountryData.iso2, mobileOnly) : null;
        }
        // validate the input val (precise) - assumes the global function isValidNumber (from utilsScript)
        isValidNumberPrecise() {
            const val = this._getFullNumber();
            // return false for any alpha chars
            if (/\p{L}/u.test(val)) {
                return false;
            }
            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2) : null;
        }
        // update the selected flag, and update the input val accordingly
        setCountry(iso2) {
            const iso2Lower = iso2.toLowerCase();
            // check if already selected
            if (this.selectedCountryData.iso2 !== iso2Lower) {
                this._setCountry(iso2Lower);
                this._updateDialCode(this.selectedCountryData.dialCode);
                this._triggerCountryChange();
            }
        }
        // set the input value and update the flag
        setNumber(number) {
            // we must update the flag first, which updates this.selectedCountryData, which is used for
            // formatting the number before displaying it
            const flagChanged = this._updateFlagFromNumber(number);
            this._updateValFromNumber(number);
            if (flagChanged) {
                this._triggerCountryChange();
            }
        }
        // set the placeholder number typ
        setPlaceholderNumberType(type) {
            this.options.placeholderNumberType = type;
            this._updatePlaceholder();
        }
    }
    /********************
 *  STATIC METHODS
 ********************/
    // get the country data object
    intlTelInputGlobals.getCountryData = () => allCountries;
    // inject a <script> element to load utils.js
    const injectScript = (path, handleSuccess, handleFailure) => {
        // inject a new script element into the page
        const script = document.createElement("script");
        script.onload = () => {
            forEachInstance("handleUtils");
            if (handleSuccess) {
                handleSuccess();
            }
        };
        script.onerror = () => {
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
    intlTelInputGlobals.loadUtils = path => {
        // 2 options:
        // 1) not already started loading (start)
        // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
        // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
            // only do this once
            window.intlTelInputGlobals.startedLoadingUtilsScript = true;
            return new Promise((resolve, reject) => injectScript(path, resolve, reject));
        }
        return null;
    };
    // default options
    intlTelInputGlobals.defaults = defaults;
    // version
    intlTelInputGlobals.version = "20.3.0";
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