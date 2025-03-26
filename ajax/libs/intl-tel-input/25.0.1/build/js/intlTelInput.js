/*
 * International Telephone Input v25.0.1
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
      "af",
      // Afghanistan
      "93"
    ],
    [
      "ax",
      // Åland Islands
      "358",
      1,
      ["18"]
    ],
    [
      "al",
      // Albania
      "355"
    ],
    [
      "dz",
      // Algeria
      "213"
    ],
    [
      "as",
      // American Samoa
      "1",
      5,
      ["684"]
    ],
    [
      "ad",
      // Andorra
      "376"
    ],
    [
      "ao",
      // Angola
      "244"
    ],
    [
      "ai",
      // Anguilla
      "1",
      6,
      ["264"]
    ],
    [
      "ag",
      // Antigua and Barbuda
      "1",
      7,
      ["268"]
    ],
    [
      "ar",
      // Argentina
      "54"
    ],
    [
      "am",
      // Armenia
      "374"
    ],
    [
      "aw",
      // Aruba
      "297"
    ],
    [
      "ac",
      // Ascension Island
      "247"
    ],
    [
      "au",
      // Australia
      "61",
      0
    ],
    [
      "at",
      // Austria
      "43"
    ],
    [
      "az",
      // Azerbaijan
      "994"
    ],
    [
      "bs",
      // Bahamas
      "1",
      8,
      ["242"]
    ],
    [
      "bh",
      // Bahrain
      "973"
    ],
    [
      "bd",
      // Bangladesh
      "880"
    ],
    [
      "bb",
      // Barbados
      "1",
      9,
      ["246"]
    ],
    [
      "by",
      // Belarus
      "375"
    ],
    [
      "be",
      // Belgium
      "32"
    ],
    [
      "bz",
      // Belize
      "501"
    ],
    [
      "bj",
      // Benin
      "229"
    ],
    [
      "bm",
      // Bermuda
      "1",
      10,
      ["441"]
    ],
    [
      "bt",
      // Bhutan
      "975"
    ],
    [
      "bo",
      // Bolivia
      "591"
    ],
    [
      "ba",
      // Bosnia and Herzegovina
      "387"
    ],
    [
      "bw",
      // Botswana
      "267"
    ],
    [
      "br",
      // Brazil
      "55"
    ],
    [
      "io",
      // British Indian Ocean Territory
      "246"
    ],
    [
      "vg",
      // British Virgin Islands
      "1",
      11,
      ["284"]
    ],
    [
      "bn",
      // Brunei
      "673"
    ],
    [
      "bg",
      // Bulgaria
      "359"
    ],
    [
      "bf",
      // Burkina Faso
      "226"
    ],
    [
      "bi",
      // Burundi
      "257"
    ],
    [
      "kh",
      // Cambodia
      "855"
    ],
    [
      "cm",
      // Cameroon
      "237"
    ],
    [
      "ca",
      // Canada
      "1",
      1,
      ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905"]
    ],
    [
      "cv",
      // Cape Verde
      "238"
    ],
    [
      "bq",
      // Caribbean Netherlands
      "599",
      1,
      ["3", "4", "7"]
    ],
    [
      "ky",
      // Cayman Islands
      "1",
      12,
      ["345"]
    ],
    [
      "cf",
      // Central African Republic
      "236"
    ],
    [
      "td",
      // Chad
      "235"
    ],
    [
      "cl",
      // Chile
      "56"
    ],
    [
      "cn",
      // China
      "86"
    ],
    [
      "cx",
      // Christmas Island
      "61",
      2,
      ["89164"]
    ],
    [
      "cc",
      // Cocos (Keeling) Islands
      "61",
      1,
      ["89162"]
    ],
    [
      "co",
      // Colombia
      "57"
    ],
    [
      "km",
      // Comoros
      "269"
    ],
    [
      "cg",
      // Congo (Brazzaville)
      "242"
    ],
    [
      "cd",
      // Congo (Kinshasa)
      "243"
    ],
    [
      "ck",
      // Cook Islands
      "682"
    ],
    [
      "cr",
      // Costa Rica
      "506"
    ],
    [
      "ci",
      // Côte d'Ivoire
      "225"
    ],
    [
      "hr",
      // Croatia
      "385"
    ],
    [
      "cu",
      // Cuba
      "53"
    ],
    [
      "cw",
      // Curaçao
      "599",
      0
    ],
    [
      "cy",
      // Cyprus
      "357"
    ],
    [
      "cz",
      // Czech Republic
      "420"
    ],
    [
      "dk",
      // Denmark
      "45"
    ],
    [
      "dj",
      // Djibouti
      "253"
    ],
    [
      "dm",
      // Dominica
      "1",
      13,
      ["767"]
    ],
    [
      "do",
      // Dominican Republic
      "1",
      2,
      ["809", "829", "849"]
    ],
    [
      "ec",
      // Ecuador
      "593"
    ],
    [
      "eg",
      // Egypt
      "20"
    ],
    [
      "sv",
      // El Salvador
      "503"
    ],
    [
      "gq",
      // Equatorial Guinea
      "240"
    ],
    [
      "er",
      // Eritrea
      "291"
    ],
    [
      "ee",
      // Estonia
      "372"
    ],
    [
      "sz",
      // Eswatini
      "268"
    ],
    [
      "et",
      // Ethiopia
      "251"
    ],
    [
      "fk",
      // Falkland Islands (Malvinas)
      "500"
    ],
    [
      "fo",
      // Faroe Islands
      "298"
    ],
    [
      "fj",
      // Fiji
      "679"
    ],
    [
      "fi",
      // Finland
      "358",
      0
    ],
    [
      "fr",
      // France
      "33"
    ],
    [
      "gf",
      // French Guiana
      "594"
    ],
    [
      "pf",
      // French Polynesia
      "689"
    ],
    [
      "ga",
      // Gabon
      "241"
    ],
    [
      "gm",
      // Gambia
      "220"
    ],
    [
      "ge",
      // Georgia
      "995"
    ],
    [
      "de",
      // Germany
      "49"
    ],
    [
      "gh",
      // Ghana
      "233"
    ],
    [
      "gi",
      // Gibraltar
      "350"
    ],
    [
      "gr",
      // Greece
      "30"
    ],
    [
      "gl",
      // Greenland
      "299"
    ],
    [
      "gd",
      // Grenada
      "1",
      14,
      ["473"]
    ],
    [
      "gp",
      // Guadeloupe
      "590",
      0
    ],
    [
      "gu",
      // Guam
      "1",
      15,
      ["671"]
    ],
    [
      "gt",
      // Guatemala
      "502"
    ],
    [
      "gg",
      // Guernsey
      "44",
      1,
      ["1481", "7781", "7839", "7911"]
    ],
    [
      "gn",
      // Guinea
      "224"
    ],
    [
      "gw",
      // Guinea-Bissau
      "245"
    ],
    [
      "gy",
      // Guyana
      "592"
    ],
    [
      "ht",
      // Haiti
      "509"
    ],
    [
      "hn",
      // Honduras
      "504"
    ],
    [
      "hk",
      // Hong Kong SAR China
      "852"
    ],
    [
      "hu",
      // Hungary
      "36"
    ],
    [
      "is",
      // Iceland
      "354"
    ],
    [
      "in",
      // India
      "91"
    ],
    [
      "id",
      // Indonesia
      "62"
    ],
    [
      "ir",
      // Iran
      "98"
    ],
    [
      "iq",
      // Iraq
      "964"
    ],
    [
      "ie",
      // Ireland
      "353"
    ],
    [
      "im",
      // Isle of Man
      "44",
      2,
      ["1624", "74576", "7524", "7924", "7624"]
    ],
    [
      "il",
      // Israel
      "972"
    ],
    [
      "it",
      // Italy
      "39",
      0
    ],
    [
      "jm",
      // Jamaica
      "1",
      4,
      ["876", "658"]
    ],
    [
      "jp",
      // Japan
      "81"
    ],
    [
      "je",
      // Jersey
      "44",
      3,
      ["1534", "7509", "7700", "7797", "7829", "7937"]
    ],
    [
      "jo",
      // Jordan
      "962"
    ],
    [
      "kz",
      // Kazakhstan
      "7",
      1,
      ["33", "7"]
    ],
    [
      "ke",
      // Kenya
      "254"
    ],
    [
      "ki",
      // Kiribati
      "686"
    ],
    [
      "xk",
      // Kosovo
      "383"
    ],
    [
      "kw",
      // Kuwait
      "965"
    ],
    [
      "kg",
      // Kyrgyzstan
      "996"
    ],
    [
      "la",
      // Laos
      "856"
    ],
    [
      "lv",
      // Latvia
      "371"
    ],
    [
      "lb",
      // Lebanon
      "961"
    ],
    [
      "ls",
      // Lesotho
      "266"
    ],
    [
      "lr",
      // Liberia
      "231"
    ],
    [
      "ly",
      // Libya
      "218"
    ],
    [
      "li",
      // Liechtenstein
      "423"
    ],
    [
      "lt",
      // Lithuania
      "370"
    ],
    [
      "lu",
      // Luxembourg
      "352"
    ],
    [
      "mo",
      // Macao SAR China
      "853"
    ],
    [
      "mg",
      // Madagascar
      "261"
    ],
    [
      "mw",
      // Malawi
      "265"
    ],
    [
      "my",
      // Malaysia
      "60"
    ],
    [
      "mv",
      // Maldives
      "960"
    ],
    [
      "ml",
      // Mali
      "223"
    ],
    [
      "mt",
      // Malta
      "356"
    ],
    [
      "mh",
      // Marshall Islands
      "692"
    ],
    [
      "mq",
      // Martinique
      "596"
    ],
    [
      "mr",
      // Mauritania
      "222"
    ],
    [
      "mu",
      // Mauritius
      "230"
    ],
    [
      "yt",
      // Mayotte
      "262",
      1,
      ["269", "639"]
    ],
    [
      "mx",
      // Mexico
      "52"
    ],
    [
      "fm",
      // Micronesia
      "691"
    ],
    [
      "md",
      // Moldova
      "373"
    ],
    [
      "mc",
      // Monaco
      "377"
    ],
    [
      "mn",
      // Mongolia
      "976"
    ],
    [
      "me",
      // Montenegro
      "382"
    ],
    [
      "ms",
      // Montserrat
      "1",
      16,
      ["664"]
    ],
    [
      "ma",
      // Morocco
      "212",
      0
    ],
    [
      "mz",
      // Mozambique
      "258"
    ],
    [
      "mm",
      // Myanmar (Burma)
      "95"
    ],
    [
      "na",
      // Namibia
      "264"
    ],
    [
      "nr",
      // Nauru
      "674"
    ],
    [
      "np",
      // Nepal
      "977"
    ],
    [
      "nl",
      // Netherlands
      "31"
    ],
    [
      "nc",
      // New Caledonia
      "687"
    ],
    [
      "nz",
      // New Zealand
      "64"
    ],
    [
      "ni",
      // Nicaragua
      "505"
    ],
    [
      "ne",
      // Niger
      "227"
    ],
    [
      "ng",
      // Nigeria
      "234"
    ],
    [
      "nu",
      // Niue
      "683"
    ],
    [
      "nf",
      // Norfolk Island
      "672"
    ],
    [
      "kp",
      // North Korea
      "850"
    ],
    [
      "mk",
      // North Macedonia
      "389"
    ],
    [
      "mp",
      // Northern Mariana Islands
      "1",
      17,
      ["670"]
    ],
    [
      "no",
      // Norway
      "47",
      0
    ],
    [
      "om",
      // Oman
      "968"
    ],
    [
      "pk",
      // Pakistan
      "92"
    ],
    [
      "pw",
      // Palau
      "680"
    ],
    [
      "ps",
      // Palestinian Territories
      "970"
    ],
    [
      "pa",
      // Panama
      "507"
    ],
    [
      "pg",
      // Papua New Guinea
      "675"
    ],
    [
      "py",
      // Paraguay
      "595"
    ],
    [
      "pe",
      // Peru
      "51"
    ],
    [
      "ph",
      // Philippines
      "63"
    ],
    [
      "pl",
      // Poland
      "48"
    ],
    [
      "pt",
      // Portugal
      "351"
    ],
    [
      "pr",
      // Puerto Rico
      "1",
      3,
      ["787", "939"]
    ],
    [
      "qa",
      // Qatar
      "974"
    ],
    [
      "re",
      // Réunion
      "262",
      0
    ],
    [
      "ro",
      // Romania
      "40"
    ],
    [
      "ru",
      // Russia
      "7",
      0
    ],
    [
      "rw",
      // Rwanda
      "250"
    ],
    [
      "ws",
      // Samoa
      "685"
    ],
    [
      "sm",
      // San Marino
      "378"
    ],
    [
      "st",
      // São Tomé & Príncipe
      "239"
    ],
    [
      "sa",
      // Saudi Arabia
      "966"
    ],
    [
      "sn",
      // Senegal
      "221"
    ],
    [
      "rs",
      // Serbia
      "381"
    ],
    [
      "sc",
      // Seychelles
      "248"
    ],
    [
      "sl",
      // Sierra Leone
      "232"
    ],
    [
      "sg",
      // Singapore
      "65"
    ],
    [
      "sx",
      // Sint Maarten
      "1",
      21,
      ["721"]
    ],
    [
      "sk",
      // Slovakia
      "421"
    ],
    [
      "si",
      // Slovenia
      "386"
    ],
    [
      "sb",
      // Solomon Islands
      "677"
    ],
    [
      "so",
      // Somalia
      "252"
    ],
    [
      "za",
      // South Africa
      "27"
    ],
    [
      "kr",
      // South Korea
      "82"
    ],
    [
      "ss",
      // South Sudan
      "211"
    ],
    [
      "es",
      // Spain
      "34"
    ],
    [
      "lk",
      // Sri Lanka
      "94"
    ],
    [
      "bl",
      // St. Barthélemy
      "590",
      1
    ],
    [
      "sh",
      // St. Helena
      "290"
    ],
    [
      "kn",
      // St. Kitts & Nevis
      "1",
      18,
      ["869"]
    ],
    [
      "lc",
      // St. Lucia
      "1",
      19,
      ["758"]
    ],
    [
      "mf",
      // St. Martin
      "590",
      2
    ],
    [
      "pm",
      // St. Pierre & Miquelon
      "508"
    ],
    [
      "vc",
      // St. Vincent & Grenadines
      "1",
      20,
      ["784"]
    ],
    [
      "sd",
      // Sudan
      "249"
    ],
    [
      "sr",
      // Suriname
      "597"
    ],
    [
      "sj",
      // Svalbard & Jan Mayen
      "47",
      1,
      ["79"]
    ],
    [
      "se",
      // Sweden
      "46"
    ],
    [
      "ch",
      // Switzerland
      "41"
    ],
    [
      "sy",
      // Syria
      "963"
    ],
    [
      "tw",
      // Taiwan
      "886"
    ],
    [
      "tj",
      // Tajikistan
      "992"
    ],
    [
      "tz",
      // Tanzania
      "255"
    ],
    [
      "th",
      // Thailand
      "66"
    ],
    [
      "tl",
      // Timor-Leste
      "670"
    ],
    [
      "tg",
      // Togo
      "228"
    ],
    [
      "tk",
      // Tokelau
      "690"
    ],
    [
      "to",
      // Tonga
      "676"
    ],
    [
      "tt",
      // Trinidad & Tobago
      "1",
      22,
      ["868"]
    ],
    [
      "tn",
      // Tunisia
      "216"
    ],
    [
      "tr",
      // Turkey
      "90"
    ],
    [
      "tm",
      // Turkmenistan
      "993"
    ],
    [
      "tc",
      // Turks & Caicos Islands
      "1",
      23,
      ["649"]
    ],
    [
      "tv",
      // Tuvalu
      "688"
    ],
    [
      "ug",
      // Uganda
      "256"
    ],
    [
      "ua",
      // Ukraine
      "380"
    ],
    [
      "ae",
      // United Arab Emirates
      "971"
    ],
    [
      "gb",
      // United Kingdom
      "44",
      0
    ],
    [
      "us",
      // United States
      "1",
      0
    ],
    [
      "uy",
      // Uruguay
      "598"
    ],
    [
      "vi",
      // U.S. Virgin Islands
      "1",
      24,
      ["340"]
    ],
    [
      "uz",
      // Uzbekistan
      "998"
    ],
    [
      "vu",
      // Vanuatu
      "678"
    ],
    [
      "va",
      // Vatican City
      "39",
      1,
      ["06698"]
    ],
    [
      "ve",
      // Venezuela
      "58"
    ],
    [
      "vn",
      // Vietnam
      "84"
    ],
    [
      "wf",
      // Wallis & Futuna
      "681"
    ],
    [
      "eh",
      // Western Sahara
      "212",
      1,
      ["5288", "5289"]
    ],
    [
      "ye",
      // Yemen
      "967"
    ],
    [
      "zm",
      // Zambia
      "260"
    ],
    [
      "zw",
      // Zimbabwe
      "263"
    ]
  ];
  var allCountries = [];
  for (let i = 0; i < rawCountryData.length; i++) {
    const c = rawCountryData[i];
    allCountries[i] = {
      name: "",
      // this is now populated in the plugin
      iso2: c[0],
      dialCode: c[1],
      priority: c[2] || 0,
      areaCodes: c[3] || null,
      nodeById: {}
    };
  }
  var data_default = allCountries;

  // src/js/intl-tel-input/i18n/en/countries.ts
  var countryTranslations = {
    ad: "Andorra",
    ae: "United Arab Emirates",
    af: "Afghanistan",
    ag: "Antigua & Barbuda",
    ai: "Anguilla",
    al: "Albania",
    am: "Armenia",
    ao: "Angola",
    ar: "Argentina",
    as: "American Samoa",
    at: "Austria",
    au: "Australia",
    aw: "Aruba",
    ax: "\xC5land Islands",
    az: "Azerbaijan",
    ba: "Bosnia & Herzegovina",
    bb: "Barbados",
    bd: "Bangladesh",
    be: "Belgium",
    bf: "Burkina Faso",
    bg: "Bulgaria",
    bh: "Bahrain",
    bi: "Burundi",
    bj: "Benin",
    bl: "St. Barth\xE9lemy",
    bm: "Bermuda",
    bn: "Brunei",
    bo: "Bolivia",
    bq: "Caribbean Netherlands",
    br: "Brazil",
    bs: "Bahamas",
    bt: "Bhutan",
    bw: "Botswana",
    by: "Belarus",
    bz: "Belize",
    ca: "Canada",
    cc: "Cocos (Keeling) Islands",
    cd: "Congo - Kinshasa",
    cf: "Central African Republic",
    cg: "Congo - Brazzaville",
    ch: "Switzerland",
    ci: "C\xF4te d\u2019Ivoire",
    ck: "Cook Islands",
    cl: "Chile",
    cm: "Cameroon",
    cn: "China",
    co: "Colombia",
    cr: "Costa Rica",
    cu: "Cuba",
    cv: "Cape Verde",
    cw: "Cura\xE7ao",
    cx: "Christmas Island",
    cy: "Cyprus",
    cz: "Czechia",
    de: "Germany",
    dj: "Djibouti",
    dk: "Denmark",
    dm: "Dominica",
    do: "Dominican Republic",
    dz: "Algeria",
    ec: "Ecuador",
    ee: "Estonia",
    eg: "Egypt",
    eh: "Western Sahara",
    er: "Eritrea",
    es: "Spain",
    et: "Ethiopia",
    fi: "Finland",
    fj: "Fiji",
    fk: "Falkland Islands",
    fm: "Micronesia",
    fo: "Faroe Islands",
    fr: "France",
    ga: "Gabon",
    gb: "United Kingdom",
    gd: "Grenada",
    ge: "Georgia",
    gf: "French Guiana",
    gg: "Guernsey",
    gh: "Ghana",
    gi: "Gibraltar",
    gl: "Greenland",
    gm: "Gambia",
    gn: "Guinea",
    gp: "Guadeloupe",
    gq: "Equatorial Guinea",
    gr: "Greece",
    gt: "Guatemala",
    gu: "Guam",
    gw: "Guinea-Bissau",
    gy: "Guyana",
    hk: "Hong Kong SAR China",
    hn: "Honduras",
    hr: "Croatia",
    ht: "Haiti",
    hu: "Hungary",
    id: "Indonesia",
    ie: "Ireland",
    il: "Israel",
    im: "Isle of Man",
    in: "India",
    io: "British Indian Ocean Territory",
    iq: "Iraq",
    ir: "Iran",
    is: "Iceland",
    it: "Italy",
    je: "Jersey",
    jm: "Jamaica",
    jo: "Jordan",
    jp: "Japan",
    ke: "Kenya",
    kg: "Kyrgyzstan",
    kh: "Cambodia",
    ki: "Kiribati",
    km: "Comoros",
    kn: "St. Kitts & Nevis",
    kp: "North Korea",
    kr: "South Korea",
    kw: "Kuwait",
    ky: "Cayman Islands",
    kz: "Kazakhstan",
    la: "Laos",
    lb: "Lebanon",
    lc: "St. Lucia",
    li: "Liechtenstein",
    lk: "Sri Lanka",
    lr: "Liberia",
    ls: "Lesotho",
    lt: "Lithuania",
    lu: "Luxembourg",
    lv: "Latvia",
    ly: "Libya",
    ma: "Morocco",
    mc: "Monaco",
    md: "Moldova",
    me: "Montenegro",
    mf: "St. Martin",
    mg: "Madagascar",
    mh: "Marshall Islands",
    mk: "North Macedonia",
    ml: "Mali",
    mm: "Myanmar (Burma)",
    mn: "Mongolia",
    mo: "Macao SAR China",
    mp: "Northern Mariana Islands",
    mq: "Martinique",
    mr: "Mauritania",
    ms: "Montserrat",
    mt: "Malta",
    mu: "Mauritius",
    mv: "Maldives",
    mw: "Malawi",
    mx: "Mexico",
    my: "Malaysia",
    mz: "Mozambique",
    na: "Namibia",
    nc: "New Caledonia",
    ne: "Niger",
    nf: "Norfolk Island",
    ng: "Nigeria",
    ni: "Nicaragua",
    nl: "Netherlands",
    no: "Norway",
    np: "Nepal",
    nr: "Nauru",
    nu: "Niue",
    nz: "New Zealand",
    om: "Oman",
    pa: "Panama",
    pe: "Peru",
    pf: "French Polynesia",
    pg: "Papua New Guinea",
    ph: "Philippines",
    pk: "Pakistan",
    pl: "Poland",
    pm: "St. Pierre & Miquelon",
    pr: "Puerto Rico",
    ps: "Palestinian Territories",
    pt: "Portugal",
    pw: "Palau",
    py: "Paraguay",
    qa: "Qatar",
    re: "R\xE9union",
    ro: "Romania",
    rs: "Serbia",
    ru: "Russia",
    rw: "Rwanda",
    sa: "Saudi Arabia",
    sb: "Solomon Islands",
    sc: "Seychelles",
    sd: "Sudan",
    se: "Sweden",
    sg: "Singapore",
    sh: "St. Helena",
    si: "Slovenia",
    sj: "Svalbard & Jan Mayen",
    sk: "Slovakia",
    sl: "Sierra Leone",
    sm: "San Marino",
    sn: "Senegal",
    so: "Somalia",
    sr: "Suriname",
    ss: "South Sudan",
    st: "S\xE3o Tom\xE9 & Pr\xEDncipe",
    sv: "El Salvador",
    sx: "Sint Maarten",
    sy: "Syria",
    sz: "Eswatini",
    tc: "Turks & Caicos Islands",
    td: "Chad",
    tg: "Togo",
    th: "Thailand",
    tj: "Tajikistan",
    tk: "Tokelau",
    tl: "Timor-Leste",
    tm: "Turkmenistan",
    tn: "Tunisia",
    to: "Tonga",
    tr: "Turkey",
    tt: "Trinidad & Tobago",
    tv: "Tuvalu",
    tw: "Taiwan",
    tz: "Tanzania",
    ua: "Ukraine",
    ug: "Uganda",
    us: "United States",
    uy: "Uruguay",
    uz: "Uzbekistan",
    va: "Vatican City",
    vc: "St. Vincent & Grenadines",
    ve: "Venezuela",
    vg: "British Virgin Islands",
    vi: "U.S. Virgin Islands",
    vn: "Vietnam",
    vu: "Vanuatu",
    wf: "Wallis & Futuna",
    ws: "Samoa",
    ye: "Yemen",
    yt: "Mayotte",
    za: "South Africa",
    zm: "Zambia",
    zw: "Zimbabwe"
  };
  var countries_default = countryTranslations;

  // src/js/intl-tel-input/i18n/en/interface.ts
  var interfaceTranslations = {
    selectedCountryAriaLabel: "Selected country",
    noCountrySelected: "No country selected",
    countryListAriaLabel: "List of countries",
    searchPlaceholder: "Search",
    zeroSearchResults: "No results found",
    oneSearchResult: "1 result found",
    multipleSearchResults: "${count} results found",
    // additional countries (not supported by country-list library)
    ac: "Ascension Island",
    xk: "Kosovo"
  };
  var interface_default = interfaceTranslations;

  // src/js/intl-tel-input/i18n/en/index.ts
  var allTranslations = { ...countries_default, ...interface_default };
  var en_default = allTranslations;

  // src/js/intl-tel-input.ts
  for (let i = 0; i < data_default.length; i++) {
    data_default[i].name = en_default[data_default[i].iso2];
  }
  var id = 0;
  var defaults = {
    //* Whether or not to allow the dropdown.
    allowDropdown: true,
    //* Add a placeholder in the input with an example number for the selected country.
    autoPlaceholder: "polite",
    //* Modify the parentClass.
    containerClass: "",
    //* The order of the countries in the dropdown. Defaults to alphabetical.
    countryOrder: null,
    //* Add a country search input at the top of the dropdown.
    countrySearch: true,
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
    //* A function to load the utils script.
    loadUtils: null,
    //* National vs international formatting for numbers e.g. placeholders and displaying existing numbers.
    nationalMode: true,
    //* Display only these countries.
    onlyCountries: [],
    //* Number type to use for placeholders.
    placeholderNumberType: "MOBILE",
    //* Show flags - for both the selected country, and in the country dropdown
    showFlags: true,
    //* Display the international dial code next to the selected flag.
    separateDialCode: false,
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
    //* The number type to enforce during validation.
    validationNumberTypes: ["MOBILE"]
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
  var isRegionlessNanp = (number) => {
    const numeric = getNumeric(number);
    if (numeric.charAt(0) === "1") {
      const areaCode = numeric.substr(1, 3);
      return regionlessNanpNumbers.indexOf(areaCode) !== -1;
    }
    return false;
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
  var forEachInstance = (method, ...args) => {
    const { instances } = intlTelInput;
    Object.values(instances).forEach((instance) => instance[method](...args));
  };
  var Iti = class {
    constructor(input, customOptions = {}) {
      this.id = id++;
      this.telInput = input;
      this.highlightedItem = null;
      this.options = Object.assign({}, defaults, customOptions);
      this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
    }
    //* Can't be private as it's called from intlTelInput convenience wrapper.
    _init() {
      if (this.options.useFullscreenPopup) {
        this.options.fixDropdownWidth = false;
      }
      if (this.options.onlyCountries.length === 1) {
        this.options.initialCountry = this.options.onlyCountries[0];
      }
      if (this.options.separateDialCode) {
        this.options.nationalMode = false;
      }
      if (this.options.allowDropdown && !this.options.showFlags && !this.options.separateDialCode) {
        this.options.nationalMode = false;
      }
      if (this.options.useFullscreenPopup && !this.options.dropdownContainer) {
        this.options.dropdownContainer = document.body;
      }
      this.isAndroid = typeof navigator !== "undefined" ? /Android/i.test(navigator.userAgent) : false;
      this.isRTL = !!this.telInput.closest("[dir=rtl]");
      const showOnDefaultSide = this.options.allowDropdown || this.options.separateDialCode;
      this.showSelectedCountryOnLeft = this.isRTL ? !showOnDefaultSide : showOnDefaultSide;
      if (this.options.separateDialCode) {
        if (this.isRTL) {
          this.originalPaddingRight = this.telInput.style.paddingRight;
        } else {
          this.originalPaddingLeft = this.telInput.style.paddingLeft;
        }
      }
      this.options.i18n = { ...en_default, ...this.options.i18n };
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
    //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
    _processCountryData() {
      this._processAllCountries();
      this._processDialCodes();
      this._translateCountryNames();
      this._sortCountries();
    }
    //* Sort countries by countryOrder option (if present), then name.
    _sortCountries() {
      if (this.options.countryOrder) {
        this.options.countryOrder = this.options.countryOrder.map((country) => country.toLowerCase());
      }
      this.countries.sort((a, b) => {
        const { countryOrder } = this.options;
        if (countryOrder) {
          const aIndex = countryOrder.indexOf(a.iso2);
          const bIndex = countryOrder.indexOf(b.iso2);
          const aIndexExists = aIndex > -1;
          const bIndexExists = bIndex > -1;
          if (aIndexExists || bIndexExists) {
            if (aIndexExists && bIndexExists) {
              return aIndex - bIndex;
            }
            return aIndexExists ? -1 : 1;
          }
        }
        return a.name.localeCompare(b.name);
      });
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
    //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
    _generateMarkup() {
      this.telInput.classList.add("iti__tel-input");
      if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
        this.telInput.setAttribute("autocomplete", "off");
      }
      const {
        allowDropdown,
        separateDialCode,
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
      if (allowDropdown || showFlags || separateDialCode) {
        this.countryContainer = createEl(
          "div",
          { class: "iti__country-container" },
          wrapper
        );
        if (this.showSelectedCountryOnLeft) {
          this.countryContainer.style.left = "0px";
        } else {
          this.countryContainer.style.right = "0px";
        }
        if (allowDropdown) {
          this.selectedCountry = createEl(
            "button",
            {
              type: "button",
              class: "iti__selected-country",
              "aria-expanded": "false",
              "aria-label": this.options.i18n.selectedCountryAriaLabel,
              "aria-haspopup": "true",
              "aria-controls": `iti-${this.id}__dropdown-content`,
              "role": "combobox"
            },
            this.countryContainer
          );
          if (this.telInput.disabled) {
            this.selectedCountry.setAttribute("disabled", "true");
          }
        } else {
          this.selectedCountry = createEl(
            "div",
            { class: "iti__selected-country" },
            this.countryContainer
          );
        }
        const selectedCountryPrimary = createEl("div", { class: "iti__selected-country-primary" }, this.selectedCountry);
        this.selectedCountryInner = createEl("div", { class: "iti__flag" }, selectedCountryPrimary);
        this.selectedCountryA11yText = createEl(
          "span",
          { class: "iti__a11y-text" },
          this.selectedCountryInner
        );
        if (allowDropdown) {
          this.dropdownArrow = createEl(
            "div",
            { class: "iti__arrow", "aria-hidden": "true" },
            selectedCountryPrimary
          );
        }
        if (separateDialCode) {
          this.selectedDialCode = createEl(
            "div",
            { class: "iti__selected-dial-code" },
            this.selectedCountry
          );
        }
        if (allowDropdown) {
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
                placeholder: i18n.searchPlaceholder,
                role: "combobox",
                "aria-expanded": "true",
                "aria-label": i18n.searchPlaceholder,
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
              "aria-label": i18n.countryListAriaLabel
            },
            this.dropdownContent
          );
          this._appendListItems();
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
            this.dropdown = createEl("div", { class: dropdownClasses });
            this.dropdown.appendChild(this.dropdownContent);
          } else {
            this.countryContainer.appendChild(this.dropdownContent);
          }
        }
      }
      wrapper.appendChild(this.telInput);
      this._updateInputPadding();
      if (hiddenInput) {
        const telInputName = this.telInput.getAttribute("name") || "";
        const names = hiddenInput(telInputName);
        if (names.phone) {
          const existingInput = this.telInput.form?.querySelector(`input[name="${names.phone}"]`);
          if (existingInput) {
            this.hiddenInput = existingInput;
          } else {
            this.hiddenInput = createEl("input", {
              type: "hidden",
              name: names.phone
            });
            wrapper.appendChild(this.hiddenInput);
          }
        }
        if (names.country) {
          const existingInput = this.telInput.form?.querySelector(`input[name="${names.country}"]`);
          if (existingInput) {
            this.hiddenInputCountry = existingInput;
          } else {
            this.hiddenInputCountry = createEl("input", {
              type: "hidden",
              name: names.country
            });
            wrapper.appendChild(this.hiddenInputCountry);
          }
        }
      }
    }
    //* For each country: add a country list item <li> to the countryList <ul> container.
    _appendListItems() {
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        const extraClass = i === 0 ? "iti__highlight" : "";
        const listItem = createEl(
          "li",
          {
            id: `iti-${this.id}__item-${c.iso2}`,
            class: `iti__country ${extraClass}`,
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
          content += `<div class='iti__flag iti__${c.iso2}'></div>`;
        }
        content += `<span class='iti__country-name'>${c.name}</span>`;
        content += `<span class='iti__dial-code'>+${c.dialCode}</span>`;
        listItem.insertAdjacentHTML("beforeend", content);
      }
    }
    //* Set the initial state of the input value and the selected country by:
    //* 1. Extracting a dial code from the given number
    //* 2. Using explicit initialCountry
    _setInitialState(overrideAutoCountry = false) {
      const attributeValue = this.telInput.getAttribute("value");
      const inputValue = this.telInput.value;
      const useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
      const val = useAttribute ? attributeValue : inputValue;
      const dialCode = this._getDialCode(val);
      const isRegionlessNanpNumber = isRegionlessNanp(val);
      const { initialCountry, geoIpLookup } = this.options;
      const isAutoCountry = initialCountry === "auto" && geoIpLookup;
      if (dialCode && !isRegionlessNanpNumber) {
        this._updateCountryFromNumber(val);
      } else if (!isAutoCountry || overrideAutoCountry) {
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
      let { loadUtils, initialCountry, geoIpLookup } = this.options;
      if (loadUtils && !intlTelInput.utils) {
        this._handlePageLoad = () => {
          window.removeEventListener("load", this._handlePageLoad);
          intlTelInput.attachUtils(loadUtils)?.catch(() => {
          });
        };
        if (intlTelInput.documentReady()) {
          this._handlePageLoad();
        } else {
          window.addEventListener("load", this._handlePageLoad);
        }
      } else {
        this.resolveUtilsScriptPromise();
      }
      const isAutoCountry = initialCountry === "auto" && geoIpLookup;
      if (isAutoCountry && !this.selectedCountryData.iso2) {
        this._loadAutoCountry();
      } else {
        this.resolveAutoCountryPromise();
      }
    }
    //* Perform the geo ip lookup.
    _loadAutoCountry() {
      if (intlTelInput.autoCountry) {
        this.handleAutoCountry();
      } else if (!intlTelInput.startedLoadingAutoCountry) {
        intlTelInput.startedLoadingAutoCountry = true;
        if (typeof this.options.geoIpLookup === "function") {
          this.options.geoIpLookup(
            (iso2 = "") => {
              const iso2Lower = iso2.toLowerCase();
              const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
              if (isValidIso2) {
                intlTelInput.autoCountry = iso2Lower;
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
    _openDropdownWithPlus() {
      this._openDropdown();
      this.searchInput.value = "+";
      this._filterCountries("", true);
    }
    //* Initialize the tel input listeners.
    _initTelInputListeners() {
      const { strictMode, formatAsYouType, separateDialCode, formatOnDisplay, allowDropdown, countrySearch } = this.options;
      let userOverrideFormatting = false;
      if (/\p{L}/u.test(this.telInput.value)) {
        userOverrideFormatting = true;
      }
      this._handleInputEvent = (e) => {
        if (this.isAndroid && e?.data === "+" && separateDialCode && allowDropdown && countrySearch) {
          const currentCaretPos = this.telInput.selectionStart || 0;
          const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos - 1);
          const valueAfterCaret = this.telInput.value.substring(currentCaretPos);
          this.telInput.value = valueBeforeCaret + valueAfterCaret;
          this._openDropdownWithPlus();
          return;
        }
        if (this._updateCountryFromNumber(this.telInput.value)) {
          this._triggerCountryChange();
        }
        const isFormattingChar = e?.data && /[^+0-9]/.test(e.data);
        const isPaste = e?.inputType === "insertFromPaste" && this.telInput.value;
        if (isFormattingChar || isPaste && !strictMode) {
          userOverrideFormatting = true;
        } else if (!/[^+0-9]/.test(this.telInput.value)) {
          userOverrideFormatting = false;
        }
        const disableFormatOnSetNumber = e?.detail && e.detail["isSetNumber"] && !formatOnDisplay;
        if (formatAsYouType && !userOverrideFormatting && !disableFormatOnSetNumber) {
          const currentCaretPos = this.telInput.selectionStart || 0;
          const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
          const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
          const isDeleteForwards = e?.inputType === "deleteContentForward";
          const formattedValue = this._formatNumberAsYouType();
          const newCaretPos = translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
          this.telInput.value = formattedValue;
          this.telInput.setSelectionRange(newCaretPos, newCaretPos);
        }
      };
      this.telInput.addEventListener("input", this._handleInputEvent);
      if (strictMode || separateDialCode) {
        this._handleKeydownEvent = (e) => {
          if (e.key && e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
            if (separateDialCode && allowDropdown && countrySearch && e.key === "+") {
              e.preventDefault();
              this._openDropdownWithPlus();
              return;
            }
            if (strictMode) {
              const value = this.telInput.value;
              const alreadyHasPlus = value.charAt(0) === "+";
              const isInitialPlus = !alreadyHasPlus && this.telInput.selectionStart === 0 && e.key === "+";
              const isNumeric = /^[0-9]$/.test(e.key);
              const isAllowedChar = separateDialCode ? isNumeric : isInitialPlus || isNumeric;
              const newValue = value.slice(0, this.telInput.selectionStart) + e.key + value.slice(this.telInput.selectionEnd);
              const newFullNumber = this._getFullNumber(newValue);
              const coreNumber = intlTelInput.utils.getCoreNumber(newFullNumber, this.selectedCountryData.iso2);
              const hasExceededMaxLength = this.maxCoreNumberLength && coreNumber.length > this.maxCoreNumberLength;
              let isChangingDialCode = false;
              if (alreadyHasPlus) {
                const currentCountry = this.selectedCountryData.iso2;
                const newCountry = this._getCountryFromNumber(newFullNumber);
                isChangingDialCode = newCountry !== currentCountry;
              }
              if (!isAllowedChar || hasExceededMaxLength && !isChangingDialCode && !isInitialPlus) {
                e.preventDefault();
              }
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
    _trigger(name, detailProps = {}) {
      const e = new CustomEvent(name, {
        bubbles: true,
        cancelable: true,
        detail: detailProps
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
      if (countrySearch) {
        const firstCountryItem = this.countryList.firstElementChild;
        if (firstCountryItem) {
          this._highlightListItem(firstCountryItem, false);
          this.countryList.scrollTop = 0;
        }
        this.searchInput.focus();
      }
      this._bindDropdownListeners();
      this.dropdownArrow.classList.add("iti__arrow--up");
      this._trigger("open:countrydropdown");
    }
    //* Set the dropdown position
    _setDropdownPosition() {
      if (this.options.dropdownContainer) {
        this.options.dropdownContainer.appendChild(this.dropdown);
      }
      if (!this.options.useFullscreenPopup) {
        const inputPosRelativeToVP = this.telInput.getBoundingClientRect();
        const inputHeight = this.telInput.offsetHeight;
        if (this.options.dropdownContainer) {
          this.dropdown.style.top = `${inputPosRelativeToVP.top + inputHeight}px`;
          this.dropdown.style.left = `${inputPosRelativeToVP.left}px`;
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
    //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
    _searchForCountry(query) {
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        const startsWith = c.name.substr(0, query.length).toLowerCase() === query;
        if (startsWith) {
          const listItem = c.nodeById[this.id];
          this._highlightListItem(listItem, false);
          this._scrollTo(listItem);
          break;
        }
      }
    }
    //* Country search enabled: Filter the countries according to the search query.
    _filterCountries(query, isReset = false) {
      let noCountriesAddedYet = true;
      this.countryList.innerHTML = "";
      const normalisedQuery = normaliseString(query);
      for (let i = 0; i < this.countries.length; i++) {
        const c = this.countries[i];
        const normalisedCountryName = normaliseString(c.name);
        const countryInitials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map((word) => word[0]).join("").toLowerCase();
        const fullDialCode = `+${c.dialCode}`;
        if (isReset || normalisedCountryName.includes(normalisedQuery) || fullDialCode.includes(normalisedQuery) || c.iso2.includes(normalisedQuery) || countryInitials.includes(normalisedQuery)) {
          const listItem = c.nodeById[this.id];
          if (listItem) {
            this.countryList.appendChild(listItem);
          }
          if (noCountriesAddedYet) {
            this._highlightListItem(listItem, false);
            noCountriesAddedYet = false;
          }
        }
      }
      if (noCountriesAddedYet) {
        this._highlightListItem(null, false);
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
        searchText = i18n.zeroSearchResults;
      } else if (count === 1) {
        searchText = i18n.oneSearchResult;
      } else {
        searchText = i18n.multipleSearchResults.replace("${count}", count.toString());
      }
      this.searchResultsA11yText.textContent = searchText;
    }
    //* Highlight the next/prev item in the list (and ensure it is visible).
    _handleUpDownKey(key) {
      let next = key === "ArrowUp" ? this.highlightedItem?.previousElementSibling : this.highlightedItem?.nextElementSibling;
      if (!next && this.countryList.childElementCount > 1) {
        next = key === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild;
      }
      if (next) {
        this._scrollTo(next);
        this._highlightListItem(next, false);
      }
    }
    //* Select the currently highlighted item.
    _handleEnterKey() {
      if (this.highlightedItem) {
        this._selectListItem(this.highlightedItem);
      }
    }
    //* Update the input's value to the given val (format first if possible)
    //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
    _updateValFromNumber(fullNumber) {
      let number = fullNumber;
      if (this.options.formatOnDisplay && intlTelInput.utils && this.selectedCountryData) {
        const useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.separateDialCode;
        const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
        const format = useNational ? NATIONAL : INTERNATIONAL;
        number = intlTelInput.utils.formatNumber(
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
      const iso2 = this._getCountryFromNumber(fullNumber);
      if (iso2 !== null) {
        return this._setCountry(iso2);
      }
      return false;
    }
    _getCountryFromNumber(fullNumber) {
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
      if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
        number = `+${selectedDialCode}${number}`;
      }
      const dialCode = this._getDialCode(number, true);
      const numeric = getNumeric(number);
      if (dialCode) {
        const iso2Codes = this.dialCodeToIso2Map[getNumeric(dialCode)];
        const alreadySelected = iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
        const isRegionlessNanpNumber = selectedDialCode === "1" && isRegionlessNanp(numeric);
        if (!isRegionlessNanpNumber && !alreadySelected) {
          for (let j = 0; j < iso2Codes.length; j++) {
            if (iso2Codes[j]) {
              return iso2Codes[j];
            }
          }
        }
      } else if (number.charAt(0) === "+" && numeric.length) {
        return "";
      } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
        return this.defaultCountry;
      }
      return null;
    }
    //* Remove highlighting from other list items and highlight the given item.
    _highlightListItem(listItem, shouldFocus) {
      const prevItem = this.highlightedItem;
      if (prevItem) {
        prevItem.classList.remove("iti__highlight");
        prevItem.setAttribute("aria-selected", "false");
      }
      this.highlightedItem = listItem;
      if (this.highlightedItem) {
        this.highlightedItem.classList.add("iti__highlight");
        this.highlightedItem.setAttribute("aria-selected", "true");
        const activeDescendant = this.highlightedItem.getAttribute("id") || "";
        this.selectedCountry.setAttribute("aria-activedescendant", activeDescendant);
        if (this.options.countrySearch) {
          this.searchInput.setAttribute("aria-activedescendant", activeDescendant);
        }
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
    //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
    //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
    _setCountry(iso2) {
      const { separateDialCode, showFlags, i18n } = this.options;
      const prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
      this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) || {} : {};
      if (this.selectedCountryData.iso2) {
        this.defaultCountry = this.selectedCountryData.iso2;
      }
      if (this.selectedCountryInner) {
        let flagClass = "";
        let a11yText = "";
        if (iso2 && showFlags) {
          flagClass = `iti__flag iti__${iso2}`;
          a11yText = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
        } else {
          flagClass = "iti__flag iti__globe";
          a11yText = i18n.noCountrySelected;
        }
        this.selectedCountryInner.className = flagClass;
        this.selectedCountryA11yText.textContent = a11yText;
      }
      this._setSelectedCountryTitleAttribute(iso2, separateDialCode);
      if (separateDialCode) {
        const dialCode = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
        this.selectedDialCode.innerHTML = dialCode;
        this._updateInputPadding();
      }
      this._updatePlaceholder();
      this._updateMaxLength();
      return prevCountry.iso2 !== iso2;
    }
    //* Update the input padding to make space for the selected country/dial code.
    _updateInputPadding() {
      if (this.selectedCountry) {
        const selectedCountryWidth = this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth();
        const inputPadding = selectedCountryWidth + 6;
        if (this.showSelectedCountryOnLeft) {
          this.telInput.style.paddingLeft = `${inputPadding}px`;
        } else {
          this.telInput.style.paddingRight = `${inputPadding}px`;
        }
      }
    }
    //* Update the maximum valid number length for the currently selected country.
    _updateMaxLength() {
      const { strictMode, placeholderNumberType, validationNumberTypes } = this.options;
      const { iso2 } = this.selectedCountryData;
      if (strictMode && intlTelInput.utils) {
        if (iso2) {
          const numberType = intlTelInput.utils.numberType[placeholderNumberType];
          let exampleNumber = intlTelInput.utils.getExampleNumber(
            iso2,
            false,
            numberType,
            true
          );
          let validNumber = exampleNumber;
          while (intlTelInput.utils.isPossibleNumber(exampleNumber, iso2, validationNumberTypes)) {
            validNumber = exampleNumber;
            exampleNumber += "0";
          }
          const coreNumber = intlTelInput.utils.getCoreNumber(validNumber, iso2);
          this.maxCoreNumberLength = coreNumber.length;
          if (iso2 === "by") {
            this.maxCoreNumberLength = coreNumber.length + 1;
          }
        } else {
          this.maxCoreNumberLength = null;
        }
      }
    }
    _setSelectedCountryTitleAttribute(iso2 = null, separateDialCode) {
      if (!this.selectedCountry) {
        return;
      }
      let title;
      if (iso2 && !separateDialCode) {
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
    //* NOTE: this is only used when separateDialCode is enabled, so countryContainer and selectedCountry
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
      if (intlTelInput.utils && shouldSetPlaceholder) {
        const numberType = intlTelInput.utils.numberType[placeholderNumberType];
        let placeholder = this.selectedCountryData.iso2 ? intlTelInput.utils.getExampleNumber(
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
      if (this._handlePageLoad) {
        window.removeEventListener("load", this._handlePageLoad);
      }
      this._trigger("close:countrydropdown");
    }
    //* Check if an element is visible within it's container, else scroll until it is.
    _scrollTo(element) {
      const container = this.countryList;
      const scrollTop = document.documentElement.scrollTop;
      const containerHeight = container.offsetHeight;
      const containerTop = container.getBoundingClientRect().top + scrollTop;
      const containerBottom = containerTop + containerHeight;
      const elementHeight = element.offsetHeight;
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const elementBottom = elementTop + elementHeight;
      const newScrollTop = elementTop - containerTop + container.scrollTop;
      if (elementTop < containerTop) {
        container.scrollTop = newScrollTop;
      } else if (elementBottom > containerBottom) {
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
    //* Get the input val, adding the dial code if separateDialCode is enabled.
    _getFullNumber(overrideVal) {
      const val = overrideVal || this.telInput.value.trim();
      const { dialCode } = this.selectedCountryData;
      let prefix;
      const numericVal = getNumeric(val);
      if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
        prefix = `+${dialCode}`;
      } else {
        prefix = "";
      }
      return prefix + val;
    }
    //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
    _beforeSetNumber(fullNumber) {
      let number = fullNumber;
      if (this.options.separateDialCode) {
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
      const result = intlTelInput.utils ? intlTelInput.utils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
      const { dialCode } = this.selectedCountryData;
      if (this.options.separateDialCode && this.telInput.value.charAt(0) !== "+" && result.includes(`+${dialCode}`)) {
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
      if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
        this.defaultCountry = intlTelInput.autoCountry;
        const hasSelectedCountryOrGlobe = this.selectedCountryData.iso2 || this.selectedCountryInner.classList.contains("iti__globe");
        if (!hasSelectedCountryOrGlobe) {
          this.setCountry(this.defaultCountry);
        }
        this.resolveAutoCountryPromise();
      }
    }
    //* This is called when the utils request completes.
    handleUtils() {
      if (intlTelInput.utils) {
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
      const { allowDropdown, separateDialCode } = this.options;
      if (allowDropdown) {
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
      if (separateDialCode) {
        if (this.isRTL) {
          this.telInput.style.paddingRight = this.originalPaddingRight;
        } else {
          this.telInput.style.paddingLeft = this.originalPaddingLeft;
        }
      }
      const wrapper = this.telInput.parentNode;
      wrapper?.parentNode?.insertBefore(this.telInput, wrapper);
      wrapper?.parentNode?.removeChild(wrapper);
      delete intlTelInput.instances[this.id];
    }
    //* Get the extension from the current number.
    getExtension() {
      if (intlTelInput.utils) {
        return intlTelInput.utils.getExtension(
          this._getFullNumber(),
          this.selectedCountryData.iso2
        );
      }
      return "";
    }
    //* Format the number to the given format.
    getNumber(format) {
      if (intlTelInput.utils) {
        const { iso2 } = this.selectedCountryData;
        return intlTelInput.utils.formatNumber(
          this._getFullNumber(),
          iso2,
          format
        );
      }
      return "";
    }
    //* Get the type of the entered number e.g. landline/mobile.
    getNumberType() {
      if (intlTelInput.utils) {
        return intlTelInput.utils.getNumberType(
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
      if (intlTelInput.utils) {
        const { iso2 } = this.selectedCountryData;
        return intlTelInput.utils.getValidationError(this._getFullNumber(), iso2);
      }
      return -99;
    }
    //* Validate the input val
    isValidNumber() {
      if (!this.selectedCountryData.iso2) {
        return false;
      }
      const val = this._getFullNumber();
      const alphaCharPosition = val.search(/\p{L}/u);
      if (alphaCharPosition > -1) {
        const beforeAlphaChar = val.substring(0, alphaCharPosition);
        const beforeAlphaIsValid = this._utilsIsPossibleNumber(beforeAlphaChar);
        const isValid = this._utilsIsPossibleNumber(val);
        return beforeAlphaIsValid && isValid;
      }
      return this._utilsIsPossibleNumber(val);
    }
    _utilsIsPossibleNumber(val) {
      return intlTelInput.utils ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
    }
    //* Validate the input val (precise)
    isValidNumberPrecise() {
      if (!this.selectedCountryData.iso2) {
        return false;
      }
      const val = this._getFullNumber();
      const alphaCharPosition = val.search(/\p{L}/u);
      if (alphaCharPosition > -1) {
        const beforeAlphaChar = val.substring(0, alphaCharPosition);
        const beforeAlphaIsValid = this._utilsIsValidNumber(beforeAlphaChar);
        const isValid = this._utilsIsValidNumber(val);
        return beforeAlphaIsValid && isValid;
      }
      return this._utilsIsValidNumber(val);
    }
    _utilsIsValidNumber(val) {
      return intlTelInput.utils ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
    }
    //* Update the selected country, and update the input val accordingly.
    setCountry(iso2) {
      const iso2Lower = iso2?.toLowerCase();
      const currentCountry = this.selectedCountryData.iso2;
      const isCountryChange = iso2 && iso2Lower !== currentCountry || !iso2 && currentCountry;
      if (isCountryChange) {
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
      this._trigger("input", { isSetNumber: true });
    }
    //* Set the placeholder number typ
    setPlaceholderNumberType(type) {
      this.options.placeholderNumberType = type;
      this._updatePlaceholder();
    }
    setDisabled(disabled) {
      this.telInput.disabled = disabled;
      if (disabled) {
        this.selectedCountry.setAttribute("disabled", "true");
      } else {
        this.selectedCountry.removeAttribute("disabled");
      }
    }
  };
  var attachUtils = (source) => {
    if (!intlTelInput.utils && !intlTelInput.startedLoadingUtilsScript) {
      let loadCall;
      if (typeof source === "function") {
        try {
          loadCall = Promise.resolve(source());
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof source}`));
      }
      intlTelInput.startedLoadingUtilsScript = true;
      return loadCall.then((module) => {
        const utils = module?.default;
        if (!utils || typeof utils !== "object") {
          throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
        }
        intlTelInput.utils = utils;
        forEachInstance("handleUtils");
        return true;
      }).catch((error) => {
        forEachInstance("rejectUtilsScriptPromise", error);
        throw error;
      });
    }
    return null;
  };
  var intlTelInput = Object.assign(
    (input, options) => {
      const iti = new Iti(input, options);
      iti._init();
      input.setAttribute("data-intl-tel-input-id", iti.id.toString());
      intlTelInput.instances[iti.id] = iti;
      return iti;
    },
    {
      defaults,
      //* Using a static var like this allows us to mock it in the tests.
      documentReady: () => document.readyState === "complete",
      //* Get the country data object.
      getCountryData: () => data_default,
      //* A getter for the plugin instance.
      getInstance: (input) => {
        const id2 = input.getAttribute("data-intl-tel-input-id");
        return id2 ? intlTelInput.instances[id2] : null;
      },
      //* A map from instance ID to instance object.
      instances: {},
      attachUtils,
      startedLoadingUtilsScript: false,
      startedLoadingAutoCountry: false,
      version: "25.0.1"
    }
  );
  var intl_tel_input_default = intlTelInput;
  return __toCommonJS(intl_tel_input_exports);
})();

// UMD
  return factoryOutput.default;
}));
