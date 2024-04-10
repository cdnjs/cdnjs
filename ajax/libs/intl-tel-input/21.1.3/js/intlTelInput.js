/*
 * International Telephone Input v21.1.3
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// UMD
(function(factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    window.intlTelInput = factory();
  }
}(() => {

var factoryOutput = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/js/intl-tel-input.ts
  var intl_tel_input_exports = {};
  __export(intl_tel_input_exports, {
    Iti: () => Iti,
    default: () => intl_tel_input_default
  });

  // src/js/intl-tel-input/data.ts
  var rawCountryData = [
    [
      "Afghanistan",
      "af",
      "93"
    ],
    [
      "Albania",
      "al",
      "355"
    ],
    [
      "Algeria",
      "dz",
      "213"
    ],
    [
      "American Samoa",
      "as",
      "1",
      5,
      ["684"]
    ],
    [
      "Andorra",
      "ad",
      "376"
    ],
    [
      "Angola",
      "ao",
      "244"
    ],
    [
      "Anguilla",
      "ai",
      "1",
      6,
      ["264"]
    ],
    [
      "Antigua & Barbuda",
      "ag",
      "1",
      7,
      ["268"]
    ],
    [
      "Argentina",
      "ar",
      "54"
    ],
    [
      "Armenia",
      "am",
      "374"
    ],
    [
      "Aruba",
      "aw",
      "297"
    ],
    [
      "Ascension Island",
      "ac",
      "247"
    ],
    [
      "Australia",
      "au",
      "61",
      0
    ],
    [
      "Austria",
      "at",
      "43"
    ],
    [
      "Azerbaijan",
      "az",
      "994"
    ],
    [
      "Bahamas",
      "bs",
      "1",
      8,
      ["242"]
    ],
    [
      "Bahrain",
      "bh",
      "973"
    ],
    [
      "Bangladesh",
      "bd",
      "880"
    ],
    [
      "Barbados",
      "bb",
      "1",
      9,
      ["246"]
    ],
    [
      "Belarus",
      "by",
      "375"
    ],
    [
      "Belgium",
      "be",
      "32"
    ],
    [
      "Belize",
      "bz",
      "501"
    ],
    [
      "Benin",
      "bj",
      "229"
    ],
    [
      "Bermuda",
      "bm",
      "1",
      10,
      ["441"]
    ],
    [
      "Bhutan",
      "bt",
      "975"
    ],
    [
      "Bolivia",
      "bo",
      "591"
    ],
    [
      "Bosnia & Herzegovina",
      "ba",
      "387"
    ],
    [
      "Botswana",
      "bw",
      "267"
    ],
    [
      "Brazil",
      "br",
      "55"
    ],
    [
      "British Indian Ocean Territory",
      "io",
      "246"
    ],
    [
      "British Virgin Islands",
      "vg",
      "1",
      11,
      ["284"]
    ],
    [
      "Brunei",
      "bn",
      "673"
    ],
    [
      "Bulgaria",
      "bg",
      "359"
    ],
    [
      "Burkina Faso",
      "bf",
      "226"
    ],
    [
      "Burundi",
      "bi",
      "257"
    ],
    [
      "Cambodia",
      "kh",
      "855"
    ],
    [
      "Cameroon",
      "cm",
      "237"
    ],
    [
      "Canada",
      "ca",
      "1",
      1,
      ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]
    ],
    [
      "Cape Verde",
      "cv",
      "238"
    ],
    [
      "Caribbean Netherlands",
      "bq",
      "599",
      1,
      ["3", "4", "7"]
    ],
    [
      "Cayman Islands",
      "ky",
      "1",
      12,
      ["345"]
    ],
    [
      "Central African Republic",
      "cf",
      "236"
    ],
    [
      "Chad",
      "td",
      "235"
    ],
    [
      "Chile",
      "cl",
      "56"
    ],
    [
      "China",
      "cn",
      "86"
    ],
    [
      "Christmas Island",
      "cx",
      "61",
      2,
      ["89164"]
    ],
    [
      "Cocos (Keeling) Islands",
      "cc",
      "61",
      1,
      ["89162"]
    ],
    [
      "Colombia",
      "co",
      "57"
    ],
    [
      "Comoros",
      "km",
      "269"
    ],
    [
      "Congo - Brazzaville",
      "cg",
      "242"
    ],
    [
      "Congo - Kinshasa",
      "cd",
      "243"
    ],
    [
      "Cook Islands",
      "ck",
      "682"
    ],
    [
      "Costa Rica",
      "cr",
      "506"
    ],
    [
      "C\xF4te d\u2019Ivoire",
      "ci",
      "225"
    ],
    [
      "Croatia",
      "hr",
      "385"
    ],
    [
      "Cuba",
      "cu",
      "53"
    ],
    [
      "Cura\xE7ao",
      "cw",
      "599",
      0
    ],
    [
      "Cyprus",
      "cy",
      "357"
    ],
    [
      "Czech Republic",
      "cz",
      "420"
    ],
    [
      "Denmark",
      "dk",
      "45"
    ],
    [
      "Djibouti",
      "dj",
      "253"
    ],
    [
      "Dominica",
      "dm",
      "1",
      13,
      ["767"]
    ],
    [
      "Dominican Republic",
      "do",
      "1",
      2,
      ["809", "829", "849"]
    ],
    [
      "Ecuador",
      "ec",
      "593"
    ],
    [
      "Egypt",
      "eg",
      "20"
    ],
    [
      "El Salvador",
      "sv",
      "503"
    ],
    [
      "Equatorial Guinea",
      "gq",
      "240"
    ],
    [
      "Eritrea",
      "er",
      "291"
    ],
    [
      "Estonia",
      "ee",
      "372"
    ],
    [
      "Eswatini",
      "sz",
      "268"
    ],
    [
      "Ethiopia",
      "et",
      "251"
    ],
    [
      "Falkland Islands",
      "fk",
      "500"
    ],
    [
      "Faroe Islands",
      "fo",
      "298"
    ],
    [
      "Fiji",
      "fj",
      "679"
    ],
    [
      "Finland",
      "fi",
      "358",
      0
    ],
    [
      "France",
      "fr",
      "33"
    ],
    [
      "French Guiana",
      "gf",
      "594"
    ],
    [
      "French Polynesia",
      "pf",
      "689"
    ],
    [
      "Gabon",
      "ga",
      "241"
    ],
    [
      "Gambia",
      "gm",
      "220"
    ],
    [
      "Georgia",
      "ge",
      "995"
    ],
    [
      "Germany",
      "de",
      "49"
    ],
    [
      "Ghana",
      "gh",
      "233"
    ],
    [
      "Gibraltar",
      "gi",
      "350"
    ],
    [
      "Greece",
      "gr",
      "30"
    ],
    [
      "Greenland",
      "gl",
      "299"
    ],
    [
      "Grenada",
      "gd",
      "1",
      14,
      ["473"]
    ],
    [
      "Guadeloupe",
      "gp",
      "590",
      0
    ],
    [
      "Guam",
      "gu",
      "1",
      15,
      ["671"]
    ],
    [
      "Guatemala",
      "gt",
      "502"
    ],
    [
      "Guernsey",
      "gg",
      "44",
      1,
      ["1481", "7781", "7839", "7911"]
    ],
    [
      "Guinea",
      "gn",
      "224"
    ],
    [
      "Guinea-Bissau",
      "gw",
      "245"
    ],
    [
      "Guyana",
      "gy",
      "592"
    ],
    [
      "Haiti",
      "ht",
      "509"
    ],
    [
      "Honduras",
      "hn",
      "504"
    ],
    [
      "Hong Kong",
      "hk",
      "852"
    ],
    [
      "Hungary",
      "hu",
      "36"
    ],
    [
      "Iceland",
      "is",
      "354"
    ],
    [
      "India",
      "in",
      "91"
    ],
    [
      "Indonesia",
      "id",
      "62"
    ],
    [
      "Iran",
      "ir",
      "98"
    ],
    [
      "Iraq",
      "iq",
      "964"
    ],
    [
      "Ireland",
      "ie",
      "353"
    ],
    [
      "Isle of Man",
      "im",
      "44",
      2,
      ["1624", "74576", "7524", "7924", "7624"]
    ],
    [
      "Israel",
      "il",
      "972"
    ],
    [
      "Italy",
      "it",
      "39",
      0
    ],
    [
      "Jamaica",
      "jm",
      "1",
      4,
      ["876", "658"]
    ],
    [
      "Japan",
      "jp",
      "81"
    ],
    [
      "Jersey",
      "je",
      "44",
      3,
      ["1534", "7509", "7700", "7797", "7829", "7937"]
    ],
    [
      "Jordan",
      "jo",
      "962"
    ],
    [
      "Kazakhstan",
      "kz",
      "7",
      1,
      ["33", "7"]
    ],
    [
      "Kenya",
      "ke",
      "254"
    ],
    [
      "Kiribati",
      "ki",
      "686"
    ],
    [
      "Kosovo",
      "xk",
      "383"
    ],
    [
      "Kuwait",
      "kw",
      "965"
    ],
    [
      "Kyrgyzstan",
      "kg",
      "996"
    ],
    [
      "Laos",
      "la",
      "856"
    ],
    [
      "Latvia",
      "lv",
      "371"
    ],
    [
      "Lebanon",
      "lb",
      "961"
    ],
    [
      "Lesotho",
      "ls",
      "266"
    ],
    [
      "Liberia",
      "lr",
      "231"
    ],
    [
      "Libya",
      "ly",
      "218"
    ],
    [
      "Liechtenstein",
      "li",
      "423"
    ],
    [
      "Lithuania",
      "lt",
      "370"
    ],
    [
      "Luxembourg",
      "lu",
      "352"
    ],
    [
      "Macau",
      "mo",
      "853"
    ],
    [
      "Madagascar",
      "mg",
      "261"
    ],
    [
      "Malawi",
      "mw",
      "265"
    ],
    [
      "Malaysia",
      "my",
      "60"
    ],
    [
      "Maldives",
      "mv",
      "960"
    ],
    [
      "Mali",
      "ml",
      "223"
    ],
    [
      "Malta",
      "mt",
      "356"
    ],
    [
      "Marshall Islands",
      "mh",
      "692"
    ],
    [
      "Martinique",
      "mq",
      "596"
    ],
    [
      "Mauritania",
      "mr",
      "222"
    ],
    [
      "Mauritius",
      "mu",
      "230"
    ],
    [
      "Mayotte",
      "yt",
      "262",
      1,
      ["269", "639"]
    ],
    [
      "Mexico",
      "mx",
      "52"
    ],
    [
      "Micronesia",
      "fm",
      "691"
    ],
    [
      "Moldova",
      "md",
      "373"
    ],
    [
      "Monaco",
      "mc",
      "377"
    ],
    [
      "Mongolia",
      "mn",
      "976"
    ],
    [
      "Montenegro",
      "me",
      "382"
    ],
    [
      "Montserrat",
      "ms",
      "1",
      16,
      ["664"]
    ],
    [
      "Morocco",
      "ma",
      "212",
      0
    ],
    [
      "Mozambique",
      "mz",
      "258"
    ],
    [
      "Myanmar (Burma)",
      "mm",
      "95"
    ],
    [
      "Namibia",
      "na",
      "264"
    ],
    [
      "Nauru",
      "nr",
      "674"
    ],
    [
      "Nepal",
      "np",
      "977"
    ],
    [
      "Netherlands",
      "nl",
      "31"
    ],
    [
      "New Caledonia",
      "nc",
      "687"
    ],
    [
      "New Zealand",
      "nz",
      "64"
    ],
    [
      "Nicaragua",
      "ni",
      "505"
    ],
    [
      "Niger",
      "ne",
      "227"
    ],
    [
      "Nigeria",
      "ng",
      "234"
    ],
    [
      "Niue",
      "nu",
      "683"
    ],
    [
      "Norfolk Island",
      "nf",
      "672"
    ],
    [
      "North Korea",
      "kp",
      "850"
    ],
    [
      "North Macedonia",
      "mk",
      "389"
    ],
    [
      "Northern Mariana Islands",
      "mp",
      "1",
      17,
      ["670"]
    ],
    [
      "Norway",
      "no",
      "47",
      0
    ],
    [
      "Oman",
      "om",
      "968"
    ],
    [
      "Pakistan",
      "pk",
      "92"
    ],
    [
      "Palau",
      "pw",
      "680"
    ],
    [
      "Palestine",
      "ps",
      "970"
    ],
    [
      "Panama",
      "pa",
      "507"
    ],
    [
      "Papua New Guinea",
      "pg",
      "675"
    ],
    [
      "Paraguay",
      "py",
      "595"
    ],
    [
      "Peru",
      "pe",
      "51"
    ],
    [
      "Philippines",
      "ph",
      "63"
    ],
    [
      "Poland",
      "pl",
      "48"
    ],
    [
      "Portugal",
      "pt",
      "351"
    ],
    [
      "Puerto Rico",
      "pr",
      "1",
      3,
      ["787", "939"]
    ],
    [
      "Qatar",
      "qa",
      "974"
    ],
    [
      "R\xE9union",
      "re",
      "262",
      0
    ],
    [
      "Romania",
      "ro",
      "40"
    ],
    [
      "Russia",
      "ru",
      "7",
      0
    ],
    [
      "Rwanda",
      "rw",
      "250"
    ],
    [
      "Samoa",
      "ws",
      "685"
    ],
    [
      "San Marino",
      "sm",
      "378"
    ],
    [
      "S\xE3o Tom\xE9 & Pr\xEDncipe",
      "st",
      "239"
    ],
    [
      "Saudi Arabia",
      "sa",
      "966"
    ],
    [
      "Senegal",
      "sn",
      "221"
    ],
    [
      "Serbia",
      "rs",
      "381"
    ],
    [
      "Seychelles",
      "sc",
      "248"
    ],
    [
      "Sierra Leone",
      "sl",
      "232"
    ],
    [
      "Singapore",
      "sg",
      "65"
    ],
    [
      "Sint Maarten",
      "sx",
      "1",
      21,
      ["721"]
    ],
    [
      "Slovakia",
      "sk",
      "421"
    ],
    [
      "Slovenia",
      "si",
      "386"
    ],
    [
      "Solomon Islands",
      "sb",
      "677"
    ],
    [
      "Somalia",
      "so",
      "252"
    ],
    [
      "South Africa",
      "za",
      "27"
    ],
    [
      "South Korea",
      "kr",
      "82"
    ],
    [
      "South Sudan",
      "ss",
      "211"
    ],
    [
      "Spain",
      "es",
      "34"
    ],
    [
      "Sri Lanka",
      "lk",
      "94"
    ],
    [
      "St Barth\xE9lemy",
      "bl",
      "590",
      1
    ],
    [
      "St Helena",
      "sh",
      "290"
    ],
    [
      "St Kitts & Nevis",
      "kn",
      "1",
      18,
      ["869"]
    ],
    [
      "St Lucia",
      "lc",
      "1",
      19,
      ["758"]
    ],
    [
      "St Martin",
      "mf",
      "590",
      2
    ],
    [
      "St Pierre & Miquelon",
      "pm",
      "508"
    ],
    [
      "St Vincent & Grenadines",
      "vc",
      "1",
      20,
      ["784"]
    ],
    [
      "Sudan",
      "sd",
      "249"
    ],
    [
      "Suriname",
      "sr",
      "597"
    ],
    [
      "Svalbard & Jan Mayen",
      "sj",
      "47",
      1,
      ["79"]
    ],
    [
      "Sweden",
      "se",
      "46"
    ],
    [
      "Switzerland",
      "ch",
      "41"
    ],
    [
      "Syria",
      "sy",
      "963"
    ],
    [
      "Taiwan",
      "tw",
      "886"
    ],
    [
      "Tajikistan",
      "tj",
      "992"
    ],
    [
      "Tanzania",
      "tz",
      "255"
    ],
    [
      "Thailand",
      "th",
      "66"
    ],
    [
      "Timor-Leste",
      "tl",
      "670"
    ],
    [
      "Togo",
      "tg",
      "228"
    ],
    [
      "Tokelau",
      "tk",
      "690"
    ],
    [
      "Tonga",
      "to",
      "676"
    ],
    [
      "Trinidad & Tobago",
      "tt",
      "1",
      22,
      ["868"]
    ],
    [
      "Tunisia",
      "tn",
      "216"
    ],
    [
      "Turkey",
      "tr",
      "90"
    ],
    [
      "Turkmenistan",
      "tm",
      "993"
    ],
    [
      "Turks & Caicos Islands",
      "tc",
      "1",
      23,
      ["649"]
    ],
    [
      "Tuvalu",
      "tv",
      "688"
    ],
    [
      "Uganda",
      "ug",
      "256"
    ],
    [
      "Ukraine",
      "ua",
      "380"
    ],
    [
      "United Arab Emirates",
      "ae",
      "971"
    ],
    [
      "United Kingdom",
      "gb",
      "44",
      0
    ],
    [
      "United States",
      "us",
      "1",
      0
    ],
    [
      "Uruguay",
      "uy",
      "598"
    ],
    [
      "US Virgin Islands",
      "vi",
      "1",
      24,
      ["340"]
    ],
    [
      "Uzbekistan",
      "uz",
      "998"
    ],
    [
      "Vanuatu",
      "vu",
      "678"
    ],
    [
      "Vatican City",
      "va",
      "39",
      1,
      ["06698"]
    ],
    [
      "Venezuela",
      "ve",
      "58"
    ],
    [
      "Vietnam",
      "vn",
      "84"
    ],
    [
      "Wallis & Futuna",
      "wf",
      "681"
    ],
    [
      "Western Sahara",
      "eh",
      "212",
      1,
      ["5288", "5289"]
    ],
    [
      "Yemen",
      "ye",
      "967"
    ],
    [
      "Zambia",
      "zm",
      "260"
    ],
    [
      "Zimbabwe",
      "zw",
      "263"
    ],
    [
      "\xC5land Islands",
      "ax",
      "358",
      1,
      ["18"]
    ]
  ];
  var allCountries = [];
  for (let i = 0; i < rawCountryData.length; i++) {
    const c = rawCountryData[i];
    allCountries[i] = {
      name: c[0],
      iso2: c[1],
      dialCode: c[2],
      priority: c[3] || 0,
      areaCodes: c[4] || null,
      nodeById: {}
    };
  }
  var data_default = allCountries;

  // src/js/intl-tel-input.ts
  var id = 0;
  var defaults = {
    //* Whether or not to allow the dropdown.
    allowDropdown: true,
    //* Add a placeholder in the input with an example number for the selected country.
    autoPlaceholder: "polite",
    //* Add a country search input at the top of the dropdown.
    countrySearch: true,
    //* Modify the parentClass.
    containerClass: "",
    //* Modify the auto placeholder.
    customPlaceholder: null,
    //* Append menu to specified element.
    dropdownContainer: null,
    //* Don't display these countries.
    excludeCountries: [],
    //* Fix the dropdown width to the input width (rather than being as wide as the longest country name).
    fixDropdownWidth: true,
    //* Format the number as the user types
    formatAsYouType: true,
    //* Format the input value during initialisation and on setNumber.
    formatOnDisplay: true,
    //* geoIp lookup function.
    geoIpLookup: null,
    //* Inject a hidden input with the name returned from this function, and on submit, populate it with the result of getNumber.
    hiddenInput: null,
    //* Internationalise the plugin text e.g. search input placeholder, country names.
    i18n: {},
    //* Initial country.
    initialCountry: "",
    //* National vs international formatting for numbers e.g. placeholders and displaying existing numbers.
    nationalMode: true,
    //* Display only these countries.
    onlyCountries: [],
    //* Number type to use for placeholders.
    placeholderNumberType: "MOBILE",
    //* The countries at the top of the list.
    preferredCountries: [],
    //* Option to hide the flags - must be used with showSelectedDialCode, or allowDropdown=false.
    showFlags: true,
    //* Display the international dial code next to the selected flag.
    showSelectedDialCode: false,
    //* Only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length.
    strictMode: false,
    //* Use full screen popup instead of dropdown for country list.
    useFullscreenPopup: typeof navigator !== "undefined" && typeof window !== "undefined" ? (
      //* We cannot just test screen size as some smartphones/website meta tags will report desktop resolutions.
      //* Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
      /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 500
    ) : false,
    //* Specify the path to the libphonenumber script to enable validation/formatting.
    utilsScript: ""
  };
  var regionlessNanpNumbers = [
    "800",
    "822",
    "833",
    "844",
    "855",
    "866",
    "877",
    "880",
    "881",
    "882",
    "883",
    "884",
    "885",
    "886",
    "887",
    "888",
    "889"
  ];
  var getNumeric = (s) => s.replace(/\D/g, "");
  var normaliseString = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  var toggleClass = (el, className, shouldHaveClass) => {
    if (shouldHaveClass && !el.classList.contains(className)) {
      el.classList.add(className);
    } else if (!shouldHaveClass && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  };
  var isRegionlessNanp = (number) => {
    const numeric = getNumeric(number);
    if (numeric.charAt(0) === "1") {
      const areaCode = numeric.substr(1, 3);
      return regionlessNanpNumbers.indexOf(areaCode) !== -1;
    }
    return false;
  };
  var countryNameSort = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };
  var translateCursorPosition = (relevantChars, formattedValue, prevCaretPos, isDeleteForwards) => {
    if (prevCaretPos === 0 && !isDeleteForwards) {
      return 0;
    }
    let count = 0;
    for (let i = 0; i < formattedValue.length; i++) {
      if (/[+0-9]/.test(formattedValue[i])) {
        count++;
      }
      if (count === relevantChars && !isDeleteForwards) {
        return i + 1;
      }
      if (isDeleteForwards && count === relevantChars + 1) {
        return i;
      }
    }
    return formattedValue.length;
  };
  var createEl = (name, attrs, container) => {
    const el = document.createElement(name);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    }
    if (container) {
      container.appendChild(el);
    }
    return el;
  };
  var forEachInstance = (method) => {
    const { instances } = window.intlTelInputGlobals;
    Object.values(instances).forEach((instance) => instance[method]());
  };
  var Iti = class {
    //* Can't be private as it's called from intlTelInput convenience wrapper.
    id;
    //* NOT Private
    promise;
    //* Private
    telInput;
    activeItem;
    highlightedItem;
    options;
    hadInitialPlaceholder;
    isRTL;
    selectedCountryData;
    countries;
    dialCodeMaxLen;
    dialCodeToIso2Map;
    dialCodes;
    preferredCountries;
    countryContainer;
    selectedCountry;
    selectedCountryInner;
    selectedCountryA11yText;
    selectedDialCode;
    dropdownArrow;
    dropdownContent;
    searchInput;
    searchResultsA11yText;
    countryList;
    dropdown;
    hiddenInput;
    hiddenInputCountry;
    maxCoreNumberLength;
    defaultCountry;
    _handleHiddenInputSubmit;
    _handleLabelClick;
    _handleClickSelectedCountry;
    _handleCountryContainerKeydown;
    _handleInputEvent;
    _handleKeydownEvent;
    _handleWindowScroll;
    _handleMouseoverCountryList;
    _handleClickCountryList;
    _handleClickOffToClose;
    _handleKeydownOnDropdown;
    _handleSearchChange;
    resolveAutoCountryPromise;
    rejectAutoCountryPromise;
    resolveUtilsScriptPromise;
    rejectUtilsScriptPromise;
    constructor(input, customOptions = {}) {
      this.id = id++;
      this.telInput = input;
      this.activeItem = null;
      this.highlightedItem = null;
      this.options = Object.assign({}, defaults, customOptions);
      this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
    }
    //* Can't be private as it's called from intlTelInput convenience wrapper.
    _init() {
      if (this.options.useFullscreenPopup) {
        this.options.fixDropdownWidth = false;
      }
      if (this.options.countrySearch && !this.options.useFullscreenPopup) {
        this.options.fixDropdownWidth = true;
      }
      const forceShowFlags = this.options.allowDropdown && !this.options.showSelectedDialCode;
      if (!this.options.showFlags && forceShowFlags) {
        this.options.showFlags = true;
      }
      if (this.options.useFullscreenPopup && !this.options.dropdownContainer) {
        this.options.dropdownContainer = document.body;
      }
      this.isRTL = !!this.telInput.closest("[dir=rtl]");
      const autoCountryPromise = new Promise((resolve, reject) => {
        this.resolveAutoCountryPromise = resolve;
        this.rejectAutoCountryPromise = reject;
      });
      const utilsScriptPromise = new Promise((resolve, reject) => {
        this.resolveUtilsScriptPromise = resolve;
        this.rejectUtilsScriptPromise = reject;
      });
      this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
      this.selectedCountryData = {};
      this._processCountryData();
      this._generateMarkup();
      this._setInitialState();
      this._initListeners();
      this._initRequests();
    }
    //********************
    //*  PRIVATE METHODS
    //********************
    //* Prepare all of the country data, including onlyCountries, excludeCountries and preferredCountries options.
    _processCountryData() {
      this._processAllCountries();
      this._processDialCodes();
      this._processPreferredCountries();
      this._translateCountryNames();
      if (this.options.onlyCountries.length || this.options.i18n) {
        this.countries.sort(countryNameSort);
      }
    }
    //* Add a dial code to this.dialCodeToIso2Map.
    _addToDialCodeMap(iso2, dialCode, priority) {
      if (dialCode.length > this.dialCodeMaxLen) {
        this.dialCodeMaxLen = dialCode.length;
      }
      if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
        this.dialCodeToIso2Map[dialCode] = [];
      }
      for (let i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
        if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
          return;
        }
      }
      const index = priority !== void 0 ? priority : this.dialCodeToIso2Map[dialCode].length;
      this.dialCodeToIso2Map[dialCode][index] = iso2;
    }
    //* Process onlyCountries or excludeCountries array if present.
    _processAllCountries() {
      const { onlyCountries, excludeCountries } = this.options;
      if (onlyCountries.length) {
        const lowerCaseOnlyCountries = onlyCountries.map(
          (country) => country.toLowerCase()
        );
        this.countries = data_default.filter(
          (country) => lowerCaseOnlyCountries.indexOf(country.iso2) > -1
        );
      } else if (excludeCountries.length) {
        const lowerCaseExcludeCountries = excludeCountries.map(
          (country) => country.toLowerCase()
        );
        this.countries = data_default.filter(
          (country) => lowerCaseExcludeCountries.indexOf(country.iso2) === -1
        );
      } else {
        this.countries = data_default;
      }
    }
    //* Translate Countries by object literal provided on config.
    _translateCountryNames() {
      for (let i = 0; i < this.countries.length; i++) {
        const iso2 = this.countries[i].iso2.toLowerCase();
        if (this.options.i18n.hasOwnProperty(iso2)) {
          this.countries[i].name = this.options.i18n[iso2];
        }
      }
    }
    //* Generate this.dialCodes and this.dialCodeToIso2Map.
    _processDialCodes() {
      this.dialCodes = {};
      this.dialCodeMaxLen = 0;
      this.dialCodeToIso2Map = {};
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        if (!this.dialCodes[c.dialCode]) {
          this.dialCodes[c.dialCode] = true;
        }
        this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
      }
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        if (c.areaCodes) {
          const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
          for (let j = 0; j < c.areaCodes.length; j++) {
            const areaCode = c.areaCodes[j];
            for (let k = 1; k < areaCode.length; k++) {
              const partialDialCode = c.dialCode + areaCode.substr(0, k);
              this._addToDialCodeMap(rootIso2Code, partialDialCode);
              this._addToDialCodeMap(c.iso2, partialDialCode);
            }
            this._addToDialCodeMap(c.iso2, c.dialCode + areaCode);
          }
        }
      }
    }
    //* Process preferred countries - iterate through the preferences, fetching the country data for each one.
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
    //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
    _generateMarkup() {
      this.telInput.classList.add("iti__tel-input");
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
      const wrapper = createEl("div", { class: parentClass });
      this.telInput.parentNode?.insertBefore(wrapper, this.telInput);
      if (showFlags || showSelectedDialCode) {
        this.countryContainer = createEl(
          "div",
          { class: "iti__country-container" },
          wrapper
        );
        this.selectedCountry = createEl(
          "button",
          {
            type: "button",
            class: "iti__selected-country",
            ...allowDropdown && {
              "aria-expanded": "false",
              "aria-label": this.options.i18n.selectedCountryAriaLabel || "Selected country",
              "aria-haspopup": countrySearch ? "true" : "listbox",
              "aria-controls": countrySearch ? `iti-${this.id}__dropdown-content` : `iti-${this.id}__country-listbox`,
              ...countrySearch ? { role: "combobox" } : {}
            }
          },
          this.countryContainer
        );
        this.selectedCountryInner = createEl("div", null, this.selectedCountry);
        this.selectedCountryA11yText = createEl(
          "span",
          { class: "iti__a11y-text" },
          this.selectedCountryInner
        );
      }
      wrapper.appendChild(this.telInput);
      if (this.selectedCountry && this.telInput.disabled) {
        this.selectedCountry.setAttribute("aria-disabled", "true");
      }
      if (showSelectedDialCode) {
        this.selectedDialCode = createEl(
          "div",
          { class: "iti__selected-dial-code" },
          this.selectedCountry
        );
      }
      if (allowDropdown) {
        if (!this.telInput.disabled) {
          this.selectedCountry.setAttribute("tabindex", "0");
        }
        this.dropdownArrow = createEl(
          "div",
          { class: "iti__arrow", "aria-hidden": "true" },
          this.selectedCountry
        );
        const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
        this.dropdownContent = createEl("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${extraClasses}`
        });
        if (countrySearch) {
          this.searchInput = createEl(
            "input",
            {
              type: "text",
              class: "iti__search-input",
              placeholder: i18n.searchPlaceholder || "Search",
              role: "combobox",
              "aria-expanded": "true",
              "aria-label": i18n.searchPlaceholder || "Search",
              "aria-controls": `iti-${this.id}__country-listbox`,
              "aria-autocomplete": "list",
              "autocomplete": "off"
            },
            this.dropdownContent
          );
          this.searchResultsA11yText = createEl(
            "span",
            { class: "iti__a11y-text" },
            this.dropdownContent
          );
        }
        this.countryList = createEl(
          "ul",
          {
            class: "iti__country-list",
            id: `iti-${this.id}__country-listbox`,
            role: "listbox",
            "aria-label": i18n.countryListAriaLabel || "List of countries"
          },
          this.dropdownContent
        );
        if (this.preferredCountries.length && !countrySearch) {
          this._appendListItems(this.preferredCountries, "iti__preferred", true);
          createEl(
            "li",
            {
              class: "iti__divider",
              "aria-hidden": "true"
            },
            this.countryList
          );
        }
        this._appendListItems(this.countries, "iti__standard");
        if (countrySearch) {
          this._updateSearchResultsText();
        }
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
          this.dropdown = createEl("div", { class: dropdownClasses });
          this.dropdown.appendChild(this.dropdownContent);
        } else {
          this.countryContainer.appendChild(this.dropdownContent);
        }
      }
      if (hiddenInput) {
        const telInputName = this.telInput.getAttribute("name") || "";
        const names = hiddenInput(telInputName);
        if (names.phone) {
          this.hiddenInput = createEl("input", {
            type: "hidden",
            name: names.phone
          });
          wrapper.appendChild(this.hiddenInput);
        }
        if (names.country) {
          this.hiddenInputCountry = createEl("input", {
            type: "hidden",
            name: names.country
          });
          wrapper.appendChild(this.hiddenInputCountry);
        }
      }
    }
    //* For each of the passed countries: add a country <li> to the countryList <ul> container.
    _appendListItems(countries, className, preferred) {
      for (let i = 0; i < countries.length; i++) {
        const c = countries[i];
        const idSuffix = preferred ? "-preferred" : "";
        const listItem = createEl(
          "li",
          {
            id: `iti-${this.id}__item-${c.iso2}${idSuffix}`,
            class: `iti__country ${className}`,
            tabindex: "-1",
            role: "option",
            "data-dial-code": c.dialCode,
            "data-country-code": c.iso2,
            "aria-selected": "false"
          },
          this.countryList
        );
        c.nodeById[this.id] = listItem;
        let content = "";
        if (this.options.showFlags) {
          content += `<div class='iti__flag-box'><div class='iti__flag iti__${c.iso2}'></div></div>`;
        }
        content += `<span class='iti__country-name'>${c.name}</span>`;
        content += `<span class='iti__dial-code'>+${c.dialCode}</span>`;
        listItem.insertAdjacentHTML("beforeend", content);
      }
    }
    //* Set the initial state of the input value and the selected country by:
    //* 1. Extracting a dial code from the given number
    //* 2. Using explicit initialCountry
    //* 3. Picking the first preferred country
    //* 4. Picking the first country
    _setInitialState(overrideAutoCountry = false) {
      const attributeValue = this.telInput.getAttribute("value");
      const inputValue = this.telInput.value;
      const useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
      const val = useAttribute ? attributeValue : inputValue;
      const dialCode = this._getDialCode(val);
      const isRegionlessNanpNumber = isRegionlessNanp(val);
      const { initialCountry } = this.options;
      if (dialCode && !isRegionlessNanpNumber) {
        this._updateCountryFromNumber(val);
      } else if (initialCountry !== "auto" || overrideAutoCountry) {
        const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
        const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
        if (isValidInitialCountry) {
          this._setCountry(lowerInitialCountry);
        } else {
          if (dialCode && isRegionlessNanpNumber) {
            this._setCountry("us");
          } else {
            this._setCountry();
          }
        }
      }
      if (val) {
        this._updateValFromNumber(val);
      }
    }
    //* Initialise the main event listeners: input keyup, and click selected country.
    _initListeners() {
      this._initTelInputListeners();
      if (this.options.allowDropdown) {
        this._initDropdownListeners();
      }
      if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
        this._initHiddenInputListener();
      }
    }
    //* Update hidden input on form submit.
    _initHiddenInputListener() {
      this._handleHiddenInputSubmit = () => {
        if (this.hiddenInput) {
          this.hiddenInput.value = this.getNumber();
        }
        if (this.hiddenInputCountry) {
          this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "";
        }
      };
      this.telInput.form?.addEventListener(
        "submit",
        this._handleHiddenInputSubmit
      );
    }
    //* initialise the dropdown listeners.
    _initDropdownListeners() {
      this._handleLabelClick = (e) => {
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
      this._handleClickSelectedCountry = () => {
        if (this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly) {
          this._openDropdown();
        }
      };
      this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry);
      this._handleCountryContainerKeydown = (e) => {
        const isDropdownHidden = this.dropdownContent.classList.contains("iti__hide");
        if (isDropdownHidden && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          this._openDropdown();
        }
        if (e.key === "Tab") {
          this._closeDropdown();
        }
      };
      this.countryContainer.addEventListener(
        "keydown",
        this._handleCountryContainerKeydown
      );
    }
    //* Init many requests: utils script / geo ip lookup.
    _initRequests() {
      if (this.options.utilsScript && !window.intlTelInputUtils) {
        if (window.intlTelInputGlobals.documentReady()) {
          window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
        } else {
          window.addEventListener("load", () => {
            window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
          });
        }
      } else {
        this.resolveUtilsScriptPromise();
      }
      if (this.options.initialCountry === "auto" && !this.selectedCountryData.iso2) {
        this._loadAutoCountry();
      } else {
        this.resolveAutoCountryPromise();
      }
    }
    //* Perform the geo ip lookup.
    _loadAutoCountry() {
      if (window.intlTelInputGlobals.autoCountry) {
        this.handleAutoCountry();
      } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
        window.intlTelInputGlobals.startedLoadingAutoCountry = true;
        if (typeof this.options.geoIpLookup === "function") {
          this.options.geoIpLookup(
            (iso2 = "") => {
              const iso2Lower = iso2.toLowerCase();
              const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
              if (isValidIso2) {
                window.intlTelInputGlobals.autoCountry = iso2Lower;
                setTimeout(() => forEachInstance("handleAutoCountry"));
              } else {
                this._setInitialState(true);
                forEachInstance("rejectAutoCountryPromise");
              }
            },
            () => {
              this._setInitialState(true);
              forEachInstance("rejectAutoCountryPromise");
            }
          );
        }
      }
    }
    //* Initialize the tel input listeners.
    _initTelInputListeners() {
      const { strictMode, formatAsYouType } = this.options;
      let userOverrideFormatting = false;
      this._handleInputEvent = (e) => {
        if (this._updateCountryFromNumber(this.telInput.value)) {
          this._triggerCountryChange();
        }
        const isFormattingChar = e && e.data && /[^+0-9]/.test(e.data);
        const isPaste = e && e.inputType === "insertFromPaste" && this.telInput.value;
        if (isFormattingChar || isPaste && !strictMode) {
          userOverrideFormatting = true;
        } else if (!/[^+0-9]/.test(this.telInput.value)) {
          userOverrideFormatting = false;
        }
        if (formatAsYouType && !userOverrideFormatting) {
          const currentCaretPos = this.telInput.selectionStart || 0;
          const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
          const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
          const isDeleteForwards = e && e.inputType === "deleteContentForward";
          const formattedValue = this._formatNumberAsYouType();
          const newCaretPos = translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
          this.telInput.value = formattedValue;
          this.telInput.setSelectionRange(newCaretPos, newCaretPos);
        }
      };
      this.telInput.addEventListener("input", this._handleInputEvent);
      if (strictMode) {
        this._handleKeydownEvent = (e) => {
          if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
            const isInitialPlus = this.telInput.selectionStart === 0 && e.key === "+";
            const isNumeric = /^[0-9]$/.test(e.key);
            const isAllowedChar = isInitialPlus || isNumeric;
            const fullNumber = this._getFullNumber();
            const coreNumber = window.intlTelInputUtils.getCoreNumber(fullNumber, this.selectedCountryData.iso2);
            const hasReachedMaxLength = this.maxCoreNumberLength && coreNumber.length >= this.maxCoreNumberLength;
            if (!isAllowedChar || hasReachedMaxLength) {
              e.preventDefault();
            }
          }
        };
        this.telInput.addEventListener("keydown", this._handleKeydownEvent);
      }
    }
    //* Adhere to the input's maxlength attr.
    _cap(number) {
      const max = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
      return max && number.length > max ? number.substr(0, max) : number;
    }
    //* Trigger a custom event on the input.
    _trigger(name) {
      const e = new Event(name, {
        bubbles: true,
        cancelable: true
      });
      this.telInput.dispatchEvent(e);
    }
    //* Open the dropdown.
    _openDropdown() {
      const { fixDropdownWidth, countrySearch } = this.options;
      if (fixDropdownWidth) {
        this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`;
      }
      this.dropdownContent.classList.remove("iti__hide");
      this.selectedCountry.setAttribute("aria-expanded", "true");
      this._setDropdownPosition();
      if (this.activeItem && !countrySearch) {
        this._highlightListItem(this.activeItem, false);
        this._scrollTo(this.activeItem, true);
      } else {
        const firstCountryItem = this.countryList.firstElementChild;
        if (firstCountryItem) {
          this._highlightListItem(firstCountryItem, false);
          this.countryList.scrollTop = 0;
        }
        if (countrySearch) {
          this.searchInput.focus();
        }
      }
      this._bindDropdownListeners();
      this.dropdownArrow.classList.add("iti__arrow--up");
      this._trigger("open:countrydropdown");
    }
    //* Decide if should position dropdown above or below input (depends on position within viewport, and scroll).
    _setDropdownPosition() {
      if (this.options.dropdownContainer) {
        this.options.dropdownContainer.appendChild(this.dropdown);
      }
      if (!this.options.useFullscreenPopup) {
        const pos = this.telInput.getBoundingClientRect();
        const windowTop = document.documentElement.scrollTop;
        const inputTop = pos.top + windowTop;
        const dropdownHeight = this.dropdownContent.offsetHeight;
        const dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
        const dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
        const positionDropdownAboveInput = !this.options.countrySearch && !dropdownFitsBelow && dropdownFitsAbove;
        toggleClass(
          this.dropdownContent,
          "iti__dropdown-content--dropup",
          positionDropdownAboveInput
        );
        if (this.options.dropdownContainer) {
          const extraTop = positionDropdownAboveInput ? 0 : this.telInput.offsetHeight;
          this.dropdown.style.top = `${inputTop + extraTop}px`;
          this.dropdown.style.left = `${pos.left + document.body.scrollLeft}px`;
          this._handleWindowScroll = () => this._closeDropdown();
          window.addEventListener("scroll", this._handleWindowScroll);
        }
      }
    }
    //* We only bind dropdown listeners when the dropdown is open.
    _bindDropdownListeners() {
      this._handleMouseoverCountryList = (e) => {
        const listItem = e.target?.closest(".iti__country");
        if (listItem) {
          this._highlightListItem(listItem, false);
        }
      };
      this.countryList.addEventListener(
        "mouseover",
        this._handleMouseoverCountryList
      );
      this._handleClickCountryList = (e) => {
        const listItem = e.target?.closest(".iti__country");
        if (listItem) {
          this._selectListItem(listItem);
        }
      };
      this.countryList.addEventListener("click", this._handleClickCountryList);
      let isOpening = true;
      this._handleClickOffToClose = () => {
        if (!isOpening) {
          this._closeDropdown();
        }
        isOpening = false;
      };
      document.documentElement.addEventListener(
        "click",
        this._handleClickOffToClose
      );
      let query = "";
      let queryTimer = null;
      this._handleKeydownOnDropdown = (e) => {
        if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            this._handleUpDownKey(e.key);
          } else if (e.key === "Enter") {
            this._handleEnterKey();
          } else if (e.key === "Escape") {
            this._closeDropdown();
          }
        }
        if (!this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
          e.stopPropagation();
          if (queryTimer) {
            clearTimeout(queryTimer);
          }
          query += e.key.toLowerCase();
          this._searchForCountry(query);
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
          if (keyupTimer) {
            clearTimeout(keyupTimer);
          }
          keyupTimer = setTimeout(() => {
            doFilter();
            keyupTimer = null;
          }, 100);
        };
        this.searchInput.addEventListener("input", this._handleSearchChange);
        this.searchInput.addEventListener("click", (e) => e.stopPropagation());
      }
    }
    _filterCountries(query, isReset = false) {
      let isFirst = true;
      this.countryList.innerHTML = "";
      const normalisedQuery = normaliseString(query);
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        const normalisedCountryName = normaliseString(c.name);
        const fullDialCode = `+${c.dialCode}`;
        if (isReset || normalisedCountryName.includes(normalisedQuery) || fullDialCode.includes(normalisedQuery) || c.iso2.includes(normalisedQuery)) {
          const listItem = c.nodeById[this.id];
          if (listItem) {
            this.countryList.appendChild(listItem);
          }
          if (isFirst) {
            this._highlightListItem(listItem, false);
            isFirst = false;
          }
        }
      }
      this.countryList.scrollTop = 0;
      this._updateSearchResultsText();
    }
    //* Update search results text (for a11y).
    _updateSearchResultsText() {
      const { i18n } = this.options;
      const count = this.countryList.childElementCount;
      let searchText;
      if (count === 0) {
        searchText = i18n.zeroSearchResults || "No results found";
      } else if (count === 1) {
        searchText = i18n.oneSearchResult || "1 result found";
      } else {
        searchText = i18n.multipleSearchResults ? i18n.multipleSearchResults.replace("${count}", count.toString()) : `${count} results found`;
      }
      this.searchResultsA11yText.textContent = searchText;
    }
    //* Highlight the next/prev item in the list (and ensure it is visible).
    _handleUpDownKey(key) {
      let next = key === "ArrowUp" ? this.highlightedItem?.previousElementSibling : this.highlightedItem?.nextElementSibling;
      if (next) {
        if (next.classList.contains("iti__divider")) {
          next = key === "ArrowUp" ? next.previousElementSibling : next.nextElementSibling;
        }
      } else if (this.countryList.childElementCount > 1) {
        next = key === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild;
      }
      if (next) {
        this._scrollTo(next, false);
        const doFocus = !this.options.countrySearch;
        this._highlightListItem(next, doFocus);
      }
    }
    //* Select the currently highlighted item.
    _handleEnterKey() {
      if (this.highlightedItem) {
        this._selectListItem(this.highlightedItem);
      }
    }
    //* Find the first list item whose name starts with the query string.
    _searchForCountry(query) {
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        const startsWith = c.name.substr(0, query.length).toLowerCase() === query;
        if (startsWith) {
          const listItem = c.nodeById[this.id];
          this._highlightListItem(listItem, false);
          this._scrollTo(listItem, true);
          break;
        }
      }
    }
    //* Update the input's value to the given val (format first if possible)
    //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
    _updateValFromNumber(fullNumber) {
      let number = fullNumber;
      if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
        const useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.showSelectedDialCode;
        const { NATIONAL, INTERNATIONAL } = window.intlTelInputUtils.numberFormat;
        const format = useNational ? NATIONAL : INTERNATIONAL;
        number = window.intlTelInputUtils.formatNumber(
          number,
          this.selectedCountryData.iso2,
          format
        );
      }
      number = this._beforeSetNumber(number);
      this.telInput.value = number;
    }
    //* Check if need to select a new country based on the given number
    //* Note: called from _setInitialState, keyup handler, setNumber.
    _updateCountryFromNumber(fullNumber) {
      const plusIndex = fullNumber.indexOf("+");
      let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
      const selectedDialCode = this.selectedCountryData.dialCode;
      const isNanp = selectedDialCode === "1";
      if (number && isNanp && number.charAt(0) !== "+") {
        if (number.charAt(0) !== "1") {
          number = `1${number}`;
        }
        number = `+${number}`;
      }
      if (this.options.showSelectedDialCode && selectedDialCode && number.charAt(0) !== "+") {
        number = `+${selectedDialCode}${number}`;
      }
      const dialCode = this._getDialCode(number, true);
      const numeric = getNumeric(number);
      let iso2 = null;
      if (dialCode) {
        const iso2Codes = this.dialCodeToIso2Map[getNumeric(dialCode)];
        const alreadySelected = iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
        const isRegionlessNanpNumber = selectedDialCode === "1" && isRegionlessNanp(numeric);
        if (!isRegionlessNanpNumber && !alreadySelected) {
          for (let j = 0; j < iso2Codes.length; j++) {
            if (iso2Codes[j]) {
              iso2 = iso2Codes[j];
              break;
            }
          }
        }
      } else if (number.charAt(0) === "+" && numeric.length) {
        iso2 = "";
      } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
        iso2 = this.defaultCountry;
      }
      if (iso2 !== null) {
        return this._setCountry(iso2);
      }
      return false;
    }
    //* Remove highlighting from other list items and highlight the given item.
    _highlightListItem(listItem, shouldFocus) {
      const prevItem = this.highlightedItem;
      if (prevItem) {
        prevItem.classList.remove("iti__highlight");
        prevItem.setAttribute("aria-selected", "false");
      }
      this.highlightedItem = listItem;
      this.highlightedItem.classList.add("iti__highlight");
      this.highlightedItem.setAttribute("aria-selected", "true");
      this.selectedCountry.setAttribute(
        "aria-activedescendant",
        listItem.getAttribute("id") || ""
      );
      if (this.options.countrySearch) {
        this.searchInput.setAttribute(
          "aria-activedescendant",
          listItem.getAttribute("id") || ""
        );
      }
      if (shouldFocus) {
        this.highlightedItem.focus();
      }
    }
    //* Find the country data for the given iso2 code
    //* the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
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
    //* Update the selected country, dial code (if showSelectedDialCode), placeholder, title, and active list item.
    //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
    _setCountry(iso2) {
      const { allowDropdown, showSelectedDialCode, showFlags, countrySearch, i18n } = this.options;
      const prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
      this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) || {} : {};
      if (this.selectedCountryData.iso2) {
        this.defaultCountry = this.selectedCountryData.iso2;
      }
      if (this.selectedCountryInner) {
        let flagClass = "";
        let a11yText = "";
        if (iso2) {
          if (showFlags) {
            flagClass = `iti__flag iti__${iso2}`;
            a11yText = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
          }
        } else {
          flagClass = "iti__flag iti__globe";
          a11yText = i18n.noCountrySelected || "No country selected";
        }
        this.selectedCountryInner.className = flagClass;
        this.selectedCountryA11yText.textContent = a11yText;
      }
      this._setSelectedCountryTitleAttribute(iso2, showSelectedDialCode);
      if (showSelectedDialCode) {
        const dialCode = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
        this.selectedDialCode.innerHTML = dialCode;
        const selectedCountryWidth = this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth();
        if (this.isRTL) {
          this.telInput.style.paddingRight = `${selectedCountryWidth + 6}px`;
        } else {
          this.telInput.style.paddingLeft = `${selectedCountryWidth + 6}px`;
        }
      }
      this._updatePlaceholder();
      this._updateMaxLength();
      if (allowDropdown && !countrySearch) {
        const prevItem = this.activeItem;
        if (prevItem) {
          prevItem.classList.remove("iti__active");
          prevItem.setAttribute("aria-selected", "false");
        }
        if (iso2) {
          const nextItem = this.countryList.querySelector(
            `#iti-${this.id}__item-${iso2}-preferred`
          ) || this.countryList.querySelector(
            `#iti-${this.id}__item-${iso2}`
          );
          if (nextItem) {
            nextItem.setAttribute("aria-selected", "true");
            nextItem.classList.add("iti__active");
            this.activeItem = nextItem;
          }
        }
      }
      return prevCountry.iso2 !== iso2;
    }
    //* Update the maximum valid number length for the currently selected country.
    _updateMaxLength() {
      if (this.options.strictMode && window.intlTelInputUtils) {
        if (this.selectedCountryData.iso2) {
          const numberType = window.intlTelInputUtils.numberType[this.options.placeholderNumberType];
          let exampleNumber = window.intlTelInputUtils.getExampleNumber(
            this.selectedCountryData.iso2,
            false,
            numberType,
            true
          );
          let validNumber = exampleNumber;
          while (window.intlTelInputUtils.isPossibleNumber(exampleNumber, this.selectedCountryData.iso2)) {
            validNumber = exampleNumber;
            exampleNumber += "0";
          }
          const coreNumber = window.intlTelInputUtils.getCoreNumber(validNumber, this.selectedCountryData.iso2);
          this.maxCoreNumberLength = coreNumber.length;
        } else {
          this.maxCoreNumberLength = null;
        }
      }
    }
    _setSelectedCountryTitleAttribute(iso2 = null, showSelectedDialCode) {
      if (!this.selectedCountry) {
        return;
      }
      let title;
      if (iso2 && !showSelectedDialCode) {
        title = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`;
      } else if (iso2) {
        title = this.selectedCountryData.name;
      } else {
        title = "Unknown";
      }
      this.selectedCountry.setAttribute("title", title);
    }
    //* When the input is in a hidden container during initialisation, we must inject some markup
    //* into the end of the DOM to calculate the correct offsetWidth.
    //* NOTE: this is only used when showSelectedDialCode is enabled, so countryContainer and selectedCountry
    //* will definitely exist.
    _getHiddenSelectedCountryWidth() {
      if (this.telInput.parentNode) {
        const containerClone = this.telInput.parentNode.cloneNode(false);
        containerClone.style.visibility = "hidden";
        document.body.appendChild(containerClone);
        const countryContainerClone = this.countryContainer.cloneNode();
        containerClone.appendChild(countryContainerClone);
        const selectedCountryClone = this.selectedCountry.cloneNode(true);
        countryContainerClone.appendChild(selectedCountryClone);
        const width = selectedCountryClone.offsetWidth;
        document.body.removeChild(containerClone);
        return width;
      }
      return 0;
    }
    //* Update the input placeholder to an example number from the currently selected country.
    _updatePlaceholder() {
      const {
        autoPlaceholder,
        placeholderNumberType,
        nationalMode,
        customPlaceholder
      } = this.options;
      const shouldSetPlaceholder = autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && autoPlaceholder === "polite";
      if (window.intlTelInputUtils && shouldSetPlaceholder) {
        const numberType = window.intlTelInputUtils.numberType[placeholderNumberType];
        let placeholder = this.selectedCountryData.iso2 ? window.intlTelInputUtils.getExampleNumber(
          this.selectedCountryData.iso2,
          nationalMode,
          numberType
        ) : "";
        placeholder = this._beforeSetNumber(placeholder);
        if (typeof customPlaceholder === "function") {
          placeholder = customPlaceholder(placeholder, this.selectedCountryData);
        }
        this.telInput.setAttribute("placeholder", placeholder);
      }
    }
    //* Called when the user selects a list item from the dropdown.
    _selectListItem(listItem) {
      const countryChanged = this._setCountry(
        listItem.getAttribute("data-country-code")
      );
      this._closeDropdown();
      this._updateDialCode(listItem.getAttribute("data-dial-code"));
      this.telInput.focus();
      if (countryChanged) {
        this._triggerCountryChange();
      }
    }
    //* Close the dropdown and unbind any listeners.
    _closeDropdown() {
      this.dropdownContent.classList.add("iti__hide");
      this.selectedCountry.setAttribute("aria-expanded", "false");
      this.selectedCountry.removeAttribute("aria-activedescendant");
      if (this.highlightedItem) {
        this.highlightedItem.setAttribute("aria-selected", "false");
      }
      if (this.options.countrySearch) {
        this.searchInput.removeAttribute("aria-activedescendant");
      }
      this.dropdownArrow.classList.remove("iti__arrow--up");
      document.removeEventListener("keydown", this._handleKeydownOnDropdown);
      if (this.options.countrySearch) {
        this.searchInput.removeEventListener("input", this._handleSearchChange);
      }
      document.documentElement.removeEventListener(
        "click",
        this._handleClickOffToClose
      );
      this.countryList.removeEventListener(
        "mouseover",
        this._handleMouseoverCountryList
      );
      this.countryList.removeEventListener("click", this._handleClickCountryList);
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
    //* Check if an element is visible within it's container, else scroll until it is.
    _scrollTo(element, middle) {
      const container = this.countryList;
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
        if (middle) {
          newScrollTop -= middleOffset;
        }
        container.scrollTop = newScrollTop;
      } else if (elementBottom > containerBottom) {
        if (middle) {
          newScrollTop += middleOffset;
        }
        const heightDifference = containerHeight - elementHeight;
        container.scrollTop = newScrollTop - heightDifference;
      }
    }
    //* Replace any existing dial code with the new one
    //* Note: called from _selectListItem and setCountry
    _updateDialCode(newDialCodeBare) {
      const inputVal = this.telInput.value;
      const newDialCode = `+${newDialCodeBare}`;
      let newNumber;
      if (inputVal.charAt(0) === "+") {
        const prevDialCode = this._getDialCode(inputVal);
        if (prevDialCode) {
          newNumber = inputVal.replace(prevDialCode, newDialCode);
        } else {
          newNumber = newDialCode;
        }
        this.telInput.value = newNumber;
      }
    }
    //* Try and extract a valid international dial code from a full telephone number.
    //* Note: returns the raw string inc plus character and any whitespace/dots etc.
    _getDialCode(number, includeAreaCode) {
      let dialCode = "";
      if (number.charAt(0) === "+") {
        let numericChars = "";
        for (let i = 0; i < number.length; i++) {
          const c = number.charAt(i);
          if (!isNaN(parseInt(c, 10))) {
            numericChars += c;
            if (includeAreaCode) {
              if (this.dialCodeToIso2Map[numericChars]) {
                dialCode = number.substr(0, i + 1);
              }
            } else {
              if (this.dialCodes[numericChars]) {
                dialCode = number.substr(0, i + 1);
                break;
              }
            }
            if (numericChars.length === this.dialCodeMaxLen) {
              break;
            }
          }
        }
      }
      return dialCode;
    }
    //* Get the input val, adding the dial code if showSelectedDialCode is enabled.
    _getFullNumber() {
      const val = this.telInput.value.trim();
      const { dialCode } = this.selectedCountryData;
      let prefix;
      const numericVal = getNumeric(val);
      if (this.options.showSelectedDialCode && !this.options.nationalMode && val.charAt(0) !== "+" && dialCode && numericVal) {
        prefix = `+${dialCode}`;
      } else {
        prefix = "";
      }
      return prefix + val;
    }
    //* Remove the dial code if showSelectedDialCode is enabled also cap the length if the input has a maxlength attribute
    _beforeSetNumber(fullNumber) {
      let number = fullNumber;
      if (this.options.showSelectedDialCode) {
        let dialCode = this._getDialCode(number);
        if (dialCode) {
          dialCode = `+${this.selectedCountryData.dialCode}`;
          const start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
          number = number.substr(start);
        }
      }
      return this._cap(number);
    }
    //* Trigger the 'countrychange' event.
    _triggerCountryChange() {
      this._trigger("countrychange");
    }
    //* Format the number as the user types.
    _formatNumberAsYouType() {
      const val = this._getFullNumber();
      const result = window.intlTelInputUtils ? window.intlTelInputUtils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
      const { dialCode } = this.selectedCountryData;
      if (this.options.showSelectedDialCode && !this.options.nationalMode && this.telInput.value.charAt(0) !== "+" && result.includes(`+${dialCode}`)) {
        const afterDialCode = result.split(`+${dialCode}`)[1] || "";
        return afterDialCode.trim();
      }
      return result;
    }
    //**************************
    //*  SECRET PUBLIC METHODS
    //**************************
    //* This is called when the geoip call returns.
    handleAutoCountry() {
      if (this.options.initialCountry === "auto" && window.intlTelInputGlobals.autoCountry) {
        this.defaultCountry = window.intlTelInputGlobals.autoCountry;
        if (!this.telInput.value) {
          this.setCountry(this.defaultCountry);
        }
        this.resolveAutoCountryPromise();
      }
    }
    //* This is called when the utils request completes.
    handleUtils() {
      if (window.intlTelInputUtils) {
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
    //********************
    //*  PUBLIC METHODS
    //********************
    //* Remove plugin.
    destroy() {
      if (this.options.allowDropdown) {
        this._closeDropdown();
        this.selectedCountry.removeEventListener(
          "click",
          this._handleClickSelectedCountry
        );
        this.countryContainer.removeEventListener(
          "keydown",
          this._handleCountryContainerKeydown
        );
        const label = this.telInput.closest("label");
        if (label) {
          label.removeEventListener("click", this._handleLabelClick);
        }
      }
      const { form } = this.telInput;
      if (this._handleHiddenInputSubmit && form) {
        form.removeEventListener("submit", this._handleHiddenInputSubmit);
      }
      this.telInput.removeEventListener("input", this._handleInputEvent);
      if (this._handleKeydownEvent) {
        this.telInput.removeEventListener("keydown", this._handleKeydownEvent);
      }
      this.telInput.removeAttribute("data-intl-tel-input-id");
      const wrapper = this.telInput.parentNode;
      wrapper?.parentNode?.insertBefore(this.telInput, wrapper);
      wrapper?.parentNode?.removeChild(wrapper);
      delete window.intlTelInputGlobals.instances[this.id];
    }
    //* Get the extension from the current number.
    getExtension() {
      if (window.intlTelInputUtils) {
        return window.intlTelInputUtils.getExtension(
          this._getFullNumber(),
          this.selectedCountryData.iso2
        );
      }
      return "";
    }
    //* Format the number to the given format.
    getNumber(format) {
      if (window.intlTelInputUtils) {
        const { iso2 } = this.selectedCountryData;
        return window.intlTelInputUtils.formatNumber(
          this._getFullNumber(),
          iso2,
          format
        );
      }
      return "";
    }
    //* Get the type of the entered number e.g. landline/mobile.
    getNumberType() {
      if (window.intlTelInputUtils) {
        return window.intlTelInputUtils.getNumberType(
          this._getFullNumber(),
          this.selectedCountryData.iso2
        );
      }
      return -99;
    }
    //* Get the country data for the currently selected country.
    getSelectedCountryData() {
      return this.selectedCountryData;
    }
    //* Get the validation error.
    getValidationError() {
      if (window.intlTelInputUtils) {
        const { iso2 } = this.selectedCountryData;
        return window.intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
      }
      return -99;
    }
    //* Validate the input val - assumes the global function isPossibleNumber (from utilsScript).
    isValidNumber(mobileOnly = true) {
      const val = this._getFullNumber();
      if (/\p{L}/u.test(val)) {
        return false;
      }
      return window.intlTelInputUtils ? window.intlTelInputUtils.isPossibleNumber(val, this.selectedCountryData.iso2, mobileOnly) : null;
    }
    //* Validate the input val (precise) - assumes the global function isValidNumber (from utilsScript).
    isValidNumberPrecise() {
      const val = this._getFullNumber();
      if (/\p{L}/u.test(val)) {
        return false;
      }
      return window.intlTelInputUtils ? window.intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2) : null;
    }
    //* Update the selected country, and update the input val accordingly.
    setCountry(iso2) {
      const iso2Lower = iso2.toLowerCase();
      if (this.selectedCountryData.iso2 !== iso2Lower) {
        this._setCountry(iso2Lower);
        this._updateDialCode(this.selectedCountryData.dialCode);
        this._triggerCountryChange();
      }
    }
    //* Set the input value and update the country.
    setNumber(number) {
      const countryChanged = this._updateCountryFromNumber(number);
      this._updateValFromNumber(number);
      if (countryChanged) {
        this._triggerCountryChange();
      }
    }
    //* Set the placeholder number typ
    setPlaceholderNumberType(type) {
      this.options.placeholderNumberType = type;
      this._updatePlaceholder();
    }
  };
  var injectScript = (path, handleSuccess, handleFailure) => {
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
  var loadUtils = (path) => {
    if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
      window.intlTelInputGlobals.startedLoadingUtilsScript = true;
      return new Promise(
        (resolve, reject) => injectScript(path, resolve, reject)
      );
    }
    return null;
  };
  if (typeof window === "object") {
    const intlTelInputGlobals = {
      defaults,
      //* Using a global like this allows us to mock it in the tests.
      documentReady: () => document.readyState === "complete",
      //* Get the country data object.
      getCountryData: () => data_default,
      //* A getter for the plugin instance.
      getInstance: (input) => {
        const id2 = input.getAttribute("data-intl-tel-input-id");
        return id2 ? intlTelInputGlobals.instances[id2] : null;
      },
      //* A map from instance ID to instance object.
      instances: {},
      loadUtils,
      version: "21.1.3"
    };
    window.intlTelInputGlobals = intlTelInputGlobals;
  }
  var intlTelInput = (input, options) => {
    const iti = new Iti(input, options);
    iti._init();
    input.setAttribute("data-intl-tel-input-id", iti.id.toString());
    window.intlTelInputGlobals.instances[iti.id] = iti;
    return iti;
  };
  var intl_tel_input_default = intlTelInput;
  return __toCommonJS(intl_tel_input_exports);
})();

// UMD
  return factoryOutput.default;
}));
