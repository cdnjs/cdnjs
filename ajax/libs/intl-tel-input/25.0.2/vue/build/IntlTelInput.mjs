import { mergeModels as D, useModel as x, ref as L, onMounted as E, watch as M, onUnmounted as F, withDirectives as B, openBlock as V, createElementBlock as O, mergeProps as z, vModelText as R } from "vue";
const A = [
  [
    "af",
    // Afghanistan
    "93"
  ],
  [
    "ax",
    // Åland Islands
    "358",
    1
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
], I = [];
for (let u = 0; u < A.length; u++) {
  const e = A[u];
  I[u] = {
    name: "",
    // this is now populated in the plugin
    iso2: e[0],
    dialCode: e[1],
    priority: e[2] || 0,
    areaCodes: e[3] || null,
    partialAreaCodes: null,
    nodeById: {}
  };
}
const j = {
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
  ax: "Åland Islands",
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
  bl: "St. Barthélemy",
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
  ci: "Côte d’Ivoire",
  ck: "Cook Islands",
  cl: "Chile",
  cm: "Cameroon",
  cn: "China",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  cv: "Cape Verde",
  cw: "Curaçao",
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
  re: "Réunion",
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
  st: "São Tomé & Príncipe",
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
}, $ = {
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
}, k = { ...j, ...$ };
for (let u = 0; u < I.length; u++)
  I[u].name = k[I[u].iso2];
let U = 0;
const T = {
  //* Whether or not to allow the dropdown.
  allowDropdown: !0,
  //* Add a placeholder in the input with an example number for the selected country.
  autoPlaceholder: "polite",
  //* Modify the parentClass.
  containerClass: "",
  //* The order of the countries in the dropdown. Defaults to alphabetical.
  countryOrder: null,
  //* Add a country search input at the top of the dropdown.
  countrySearch: !0,
  //* Modify the auto placeholder.
  customPlaceholder: null,
  //* Append menu to specified element.
  dropdownContainer: null,
  //* Don't display these countries.
  excludeCountries: [],
  //* Fix the dropdown width to the input width (rather than being as wide as the longest country name).
  fixDropdownWidth: !0,
  //* Format the number as the user types
  formatAsYouType: !0,
  //* Format the input value during initialisation and on setNumber.
  formatOnDisplay: !0,
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
  nationalMode: !0,
  //* Display only these countries.
  onlyCountries: [],
  //* Number type to use for placeholders.
  placeholderNumberType: "MOBILE",
  //* Show flags - for both the selected country, and in the country dropdown
  showFlags: !0,
  //* Display the international dial code next to the selected flag.
  separateDialCode: !1,
  //* Only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length.
  strictMode: !1,
  //* Use full screen popup instead of dropdown for country list.
  useFullscreenPopup: typeof navigator < "u" && typeof window < "u" ? (
    //* We cannot just test screen size as some smartphones/website meta tags will report desktop resolutions.
    //* Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
    /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 500
  ) : !1,
  //* The number type to enforce during validation.
  validationNumberTypes: ["MOBILE"]
}, K = [
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
], v = (u) => u.replace(/\D/g, ""), N = (u = "") => u.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), S = (u) => {
  const e = v(u);
  if (e.charAt(0) === "1") {
    const t = e.substr(1, 3);
    return K.indexOf(t) !== -1;
  }
  return !1;
}, H = (u, e, t, i) => {
  if (t === 0 && !i)
    return 0;
  let s = 0;
  for (let n = 0; n < e.length; n++) {
    if (/[+0-9]/.test(e[n]) && s++, s === u && !i)
      return n + 1;
    if (i && s === u + 1)
      return n;
  }
  return e.length;
}, y = (u, e, t) => {
  const i = document.createElement(u);
  return e && Object.entries(e).forEach(([s, n]) => i.setAttribute(s, n)), t && t.appendChild(i), i;
}, w = (u, ...e) => {
  const { instances: t } = l;
  Object.values(t).forEach((i) => i[u](...e));
};
class G {
  constructor(e, t = {}) {
    this.id = U++, this.telInput = e, this.highlightedItem = null, this.options = Object.assign({}, T, t), this.hadInitialPlaceholder = !!e.getAttribute("placeholder");
  }
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init() {
    this.options.useFullscreenPopup && (this.options.fixDropdownWidth = !1), this.options.onlyCountries.length === 1 && (this.options.initialCountry = this.options.onlyCountries[0]), this.options.separateDialCode && (this.options.nationalMode = !1), this.options.allowDropdown && !this.options.showFlags && !this.options.separateDialCode && (this.options.nationalMode = !1), this.options.useFullscreenPopup && !this.options.dropdownContainer && (this.options.dropdownContainer = document.body), this.isAndroid = typeof navigator < "u" ? /Android/i.test(navigator.userAgent) : !1, this.isRTL = !!this.telInput.closest("[dir=rtl]");
    const e = this.options.allowDropdown || this.options.separateDialCode;
    this.showSelectedCountryOnLeft = this.isRTL ? !e : e, this.options.separateDialCode && (this.isRTL ? this.originalPaddingRight = this.telInput.style.paddingRight : this.originalPaddingLeft = this.telInput.style.paddingLeft), this.options.i18n = { ...k, ...this.options.i18n };
    const t = new Promise((s, n) => {
      this.resolveAutoCountryPromise = s, this.rejectAutoCountryPromise = n;
    }), i = new Promise((s, n) => {
      this.resolveUtilsScriptPromise = s, this.rejectUtilsScriptPromise = n;
    });
    this.promise = Promise.all([t, i]), this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests();
  }
  //********************
  //*  PRIVATE METHODS
  //********************
  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  _processCountryData() {
    this._processAllCountries(), this._processDialCodes(), this._translateCountryNames(), this._sortCountries();
  }
  //* Sort countries by countryOrder option (if present), then name.
  _sortCountries() {
    this.options.countryOrder && (this.options.countryOrder = this.options.countryOrder.map((e) => e.toLowerCase())), this.countries.sort((e, t) => {
      const { countryOrder: i } = this.options;
      if (i) {
        const s = i.indexOf(e.iso2), n = i.indexOf(t.iso2), o = s > -1, a = n > -1;
        if (o || a)
          return o && a ? s - n : o ? -1 : 1;
      }
      return e.name.localeCompare(t.name);
    });
  }
  //* Add a dial code to this.dialCodeToIso2Map.
  _addToDialCodeMap(e, t, i) {
    t.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = t.length), this.dialCodeToIso2Map.hasOwnProperty(t) || (this.dialCodeToIso2Map[t] = []);
    for (let n = 0; n < this.dialCodeToIso2Map[t].length; n++)
      if (this.dialCodeToIso2Map[t][n] === e)
        return;
    const s = i !== void 0 ? i : this.dialCodeToIso2Map[t].length;
    this.dialCodeToIso2Map[t][s] = e;
  }
  //* Process onlyCountries or excludeCountries array if present.
  _processAllCountries() {
    const { onlyCountries: e, excludeCountries: t } = this.options;
    if (e.length) {
      const i = e.map(
        (s) => s.toLowerCase()
      );
      this.countries = I.filter(
        (s) => i.indexOf(s.iso2) > -1
      );
    } else if (t.length) {
      const i = t.map(
        (s) => s.toLowerCase()
      );
      this.countries = I.filter(
        (s) => i.indexOf(s.iso2) === -1
      );
    } else
      this.countries = I;
  }
  //* Translate Countries by object literal provided on config.
  _translateCountryNames() {
    for (let e = 0; e < this.countries.length; e++) {
      const t = this.countries[e].iso2.toLowerCase();
      this.options.i18n.hasOwnProperty(t) && (this.countries[e].name = this.options.i18n[t]);
    }
  }
  //* Generate this.dialCodes and this.dialCodeToIso2Map and country.partialAreaCodes.
  _processDialCodes() {
    this.dialCodes = {}, this.dialCodeMaxLen = 0, this.dialCodeToIso2Map = {};
    for (let e = 0; e < this.countries.length; e++) {
      const t = this.countries[e];
      this.dialCodes[t.dialCode] || (this.dialCodes[t.dialCode] = !0), this._addToDialCodeMap(t.iso2, t.dialCode, t.priority);
    }
    for (let e = 0; e < this.countries.length; e++) {
      const t = this.countries[e];
      if (t.areaCodes) {
        const i = this.dialCodeToIso2Map[t.dialCode][0];
        for (let s = 0; s < t.areaCodes.length; s++) {
          const n = t.areaCodes[s];
          for (let o = 1; o < n.length; o++) {
            const a = n.substr(0, o), r = t.dialCode + a;
            this._addToDialCodeMap(i, r), this._addToDialCodeMap(t.iso2, r), t.partialAreaCodes || (t.partialAreaCodes = []), t.partialAreaCodes.includes(a) || t.partialAreaCodes.push(a);
          }
          this._addToDialCodeMap(t.iso2, t.dialCode + n);
        }
      }
    }
  }
  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  _generateMarkup() {
    var d, m, b;
    this.telInput.classList.add("iti__tel-input"), !this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete")) && this.telInput.setAttribute("autocomplete", "off");
    const {
      allowDropdown: e,
      separateDialCode: t,
      showFlags: i,
      containerClass: s,
      hiddenInput: n,
      dropdownContainer: o,
      fixDropdownWidth: a,
      useFullscreenPopup: r,
      countrySearch: p,
      i18n: h
    } = this.options;
    let c = "iti";
    e && (c += " iti--allow-dropdown"), i && (c += " iti--show-flags"), s && (c += ` ${s}`), r || (c += " iti--inline-dropdown");
    const C = y("div", { class: c });
    if ((d = this.telInput.parentNode) == null || d.insertBefore(C, this.telInput), e || i || t) {
      this.countryContainer = y(
        "div",
        { class: "iti__country-container" },
        C
      ), this.showSelectedCountryOnLeft ? this.countryContainer.style.left = "0px" : this.countryContainer.style.right = "0px", e ? (this.selectedCountry = y(
        "button",
        {
          type: "button",
          class: "iti__selected-country",
          "aria-expanded": "false",
          "aria-label": this.options.i18n.selectedCountryAriaLabel,
          "aria-haspopup": "true",
          "aria-controls": `iti-${this.id}__dropdown-content`,
          role: "combobox"
        },
        this.countryContainer
      ), this.telInput.disabled && this.selectedCountry.setAttribute("disabled", "true")) : this.selectedCountry = y(
        "div",
        { class: "iti__selected-country" },
        this.countryContainer
      );
      const _ = y("div", { class: "iti__selected-country-primary" }, this.selectedCountry);
      if (this.selectedCountryInner = y("div", { class: "iti__flag" }, _), this.selectedCountryA11yText = y(
        "span",
        { class: "iti__a11y-text" },
        this.selectedCountryInner
      ), e && (this.dropdownArrow = y(
        "div",
        { class: "iti__arrow", "aria-hidden": "true" },
        _
      )), t && (this.selectedDialCode = y(
        "div",
        { class: "iti__selected-dial-code" },
        this.selectedCountry
      )), e) {
        const f = a ? "" : "iti--flexible-dropdown-width";
        if (this.dropdownContent = y("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${f}`
        }), p && (this.searchInput = y(
          "input",
          {
            type: "text",
            class: "iti__search-input",
            placeholder: h.searchPlaceholder,
            role: "combobox",
            "aria-expanded": "true",
            "aria-label": h.searchPlaceholder,
            "aria-controls": `iti-${this.id}__country-listbox`,
            "aria-autocomplete": "list",
            autocomplete: "off"
          },
          this.dropdownContent
        ), this.searchResultsA11yText = y(
          "span",
          { class: "iti__a11y-text" },
          this.dropdownContent
        )), this.countryList = y(
          "ul",
          {
            class: "iti__country-list",
            id: `iti-${this.id}__country-listbox`,
            role: "listbox",
            "aria-label": h.countryListAriaLabel
          },
          this.dropdownContent
        ), this._appendListItems(), p && this._updateSearchResultsText(), o) {
          let g = "iti iti--container";
          r ? g += " iti--fullscreen-popup" : g += " iti--inline-dropdown", this.dropdown = y("div", { class: g }), this.dropdown.appendChild(this.dropdownContent);
        } else
          this.countryContainer.appendChild(this.dropdownContent);
      }
    }
    if (C.appendChild(this.telInput), this._updateInputPadding(), n) {
      const _ = this.telInput.getAttribute("name") || "", f = n(_);
      if (f.phone) {
        const g = (m = this.telInput.form) == null ? void 0 : m.querySelector(`input[name="${f.phone}"]`);
        g ? this.hiddenInput = g : (this.hiddenInput = y("input", {
          type: "hidden",
          name: f.phone
        }), C.appendChild(this.hiddenInput));
      }
      if (f.country) {
        const g = (b = this.telInput.form) == null ? void 0 : b.querySelector(`input[name="${f.country}"]`);
        g ? this.hiddenInputCountry = g : (this.hiddenInputCountry = y("input", {
          type: "hidden",
          name: f.country
        }), C.appendChild(this.hiddenInputCountry));
      }
    }
  }
  //* For each country: add a country list item <li> to the countryList <ul> container.
  _appendListItems() {
    for (let e = 0; e < this.countries.length; e++) {
      const t = this.countries[e], i = e === 0 ? "iti__highlight" : "", s = y(
        "li",
        {
          id: `iti-${this.id}__item-${t.iso2}`,
          class: `iti__country ${i}`,
          tabindex: "-1",
          role: "option",
          "data-dial-code": t.dialCode,
          "data-country-code": t.iso2,
          "aria-selected": "false"
        },
        this.countryList
      );
      t.nodeById[this.id] = s;
      let n = "";
      this.options.showFlags && (n += `<div class='iti__flag iti__${t.iso2}'></div>`), n += `<span class='iti__country-name'>${t.name}</span>`, n += `<span class='iti__dial-code'>+${t.dialCode}</span>`, s.insertAdjacentHTML("beforeend", n);
    }
  }
  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  _setInitialState(e = !1) {
    const t = this.telInput.getAttribute("value"), i = this.telInput.value, n = t && t.charAt(0) === "+" && (!i || i.charAt(0) !== "+") ? t : i, o = this._getDialCode(n), a = S(n), { initialCountry: r, geoIpLookup: p } = this.options, h = r === "auto" && p;
    if (o && !a)
      this._updateCountryFromNumber(n);
    else if (!h || e) {
      const c = r ? r.toLowerCase() : "";
      c && this._getCountryData(c, !0) ? this._setCountry(c) : o && a ? this._setCountry("us") : this._setCountry();
    }
    n && this._updateValFromNumber(n);
  }
  //* Initialise the main event listeners: input keyup, and click selected country.
  _initListeners() {
    this._initTelInputListeners(), this.options.allowDropdown && this._initDropdownListeners(), (this.hiddenInput || this.hiddenInputCountry) && this.telInput.form && this._initHiddenInputListener();
  }
  //* Update hidden input on form submit.
  _initHiddenInputListener() {
    var e;
    this._handleHiddenInputSubmit = () => {
      this.hiddenInput && (this.hiddenInput.value = this.getNumber()), this.hiddenInputCountry && (this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "");
    }, (e = this.telInput.form) == null || e.addEventListener(
      "submit",
      this._handleHiddenInputSubmit
    );
  }
  //* initialise the dropdown listeners.
  _initDropdownListeners() {
    this._handleLabelClick = (t) => {
      this.dropdownContent.classList.contains("iti__hide") ? this.telInput.focus() : t.preventDefault();
    };
    const e = this.telInput.closest("label");
    e && e.addEventListener("click", this._handleLabelClick), this._handleClickSelectedCountry = () => {
      this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly && this._openDropdown();
    }, this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry), this._handleCountryContainerKeydown = (t) => {
      this.dropdownContent.classList.contains("iti__hide") && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(t.key) && (t.preventDefault(), t.stopPropagation(), this._openDropdown()), t.key === "Tab" && this._closeDropdown();
    }, this.countryContainer.addEventListener(
      "keydown",
      this._handleCountryContainerKeydown
    );
  }
  //* Init many requests: utils script / geo ip lookup.
  _initRequests() {
    let { loadUtils: e, initialCountry: t, geoIpLookup: i } = this.options;
    e && !l.utils ? (this._handlePageLoad = () => {
      var n;
      window.removeEventListener("load", this._handlePageLoad), (n = l.attachUtils(e)) == null || n.catch(() => {
      });
    }, l.documentReady() ? this._handlePageLoad() : window.addEventListener("load", this._handlePageLoad)) : this.resolveUtilsScriptPromise(), t === "auto" && i && !this.selectedCountryData.iso2 ? this._loadAutoCountry() : this.resolveAutoCountryPromise();
  }
  //* Perform the geo ip lookup.
  _loadAutoCountry() {
    l.autoCountry ? this.handleAutoCountry() : l.startedLoadingAutoCountry || (l.startedLoadingAutoCountry = !0, typeof this.options.geoIpLookup == "function" && this.options.geoIpLookup(
      (e = "") => {
        const t = e.toLowerCase();
        t && this._getCountryData(t, !0) ? (l.autoCountry = t, setTimeout(() => w("handleAutoCountry"))) : (this._setInitialState(!0), w("rejectAutoCountryPromise"));
      },
      () => {
        this._setInitialState(!0), w("rejectAutoCountryPromise");
      }
    ));
  }
  _openDropdownWithPlus() {
    this._openDropdown(), this.searchInput.value = "+", this._filterCountries("", !0);
  }
  //* Initialize the tel input listeners.
  _initTelInputListeners() {
    const { strictMode: e, formatAsYouType: t, separateDialCode: i, formatOnDisplay: s, allowDropdown: n, countrySearch: o } = this.options;
    let a = !1;
    new RegExp("\\p{L}", "u").test(this.telInput.value) && (a = !0), this._handleInputEvent = (r) => {
      if (this.isAndroid && (r == null ? void 0 : r.data) === "+" && i && n && o) {
        const C = this.telInput.selectionStart || 0, d = this.telInput.value.substring(0, C - 1), m = this.telInput.value.substring(C);
        this.telInput.value = d + m, this._openDropdownWithPlus();
        return;
      }
      this._updateCountryFromNumber(this.telInput.value) && this._triggerCountryChange();
      const p = (r == null ? void 0 : r.data) && /[^+0-9]/.test(r.data), h = (r == null ? void 0 : r.inputType) === "insertFromPaste" && this.telInput.value;
      p || h && !e ? a = !0 : /[^+0-9]/.test(this.telInput.value) || (a = !1);
      const c = (r == null ? void 0 : r.detail) && r.detail.isSetNumber && !s;
      if (t && !a && !c) {
        const C = this.telInput.selectionStart || 0, m = this.telInput.value.substring(0, C).replace(/[^+0-9]/g, "").length, b = (r == null ? void 0 : r.inputType) === "deleteContentForward", _ = this._formatNumberAsYouType(), f = H(m, _, C, b);
        this.telInput.value = _, this.telInput.setSelectionRange(f, f);
      }
    }, this.telInput.addEventListener("input", this._handleInputEvent), (e || i) && (this._handleKeydownEvent = (r) => {
      if (r.key && r.key.length === 1 && !r.altKey && !r.ctrlKey && !r.metaKey) {
        if (i && n && o && r.key === "+") {
          r.preventDefault(), this._openDropdownWithPlus();
          return;
        }
        if (e) {
          const p = this.telInput.value, h = p.charAt(0) === "+", c = !h && this.telInput.selectionStart === 0 && r.key === "+", C = /^[0-9]$/.test(r.key), d = i ? C : c || C, m = p.slice(0, this.telInput.selectionStart) + r.key + p.slice(this.telInput.selectionEnd), b = this._getFullNumber(m), _ = l.utils.getCoreNumber(b, this.selectedCountryData.iso2), f = this.maxCoreNumberLength && _.length > this.maxCoreNumberLength;
          let g = !1;
          if (h) {
            const P = this.selectedCountryData.iso2;
            g = this._getCountryFromNumber(b) !== P;
          }
          (!d || f && !g && !c) && r.preventDefault();
        }
      }
    }, this.telInput.addEventListener("keydown", this._handleKeydownEvent));
  }
  //* Adhere to the input's maxlength attr.
  _cap(e) {
    const t = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
    return t && e.length > t ? e.substr(0, t) : e;
  }
  //* Trigger a custom event on the input.
  _trigger(e, t = {}) {
    const i = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0,
      detail: t
    });
    this.telInput.dispatchEvent(i);
  }
  //* Open the dropdown.
  _openDropdown() {
    const { fixDropdownWidth: e, countrySearch: t } = this.options;
    if (e && (this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`), this.dropdownContent.classList.remove("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "true"), this._setDropdownPosition(), t) {
      const i = this.countryList.firstElementChild;
      i && (this._highlightListItem(i, !1), this.countryList.scrollTop = 0), this.searchInput.focus();
    }
    this._bindDropdownListeners(), this.dropdownArrow.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown");
  }
  //* Set the dropdown position
  _setDropdownPosition() {
    if (this.options.dropdownContainer && this.options.dropdownContainer.appendChild(this.dropdown), !this.options.useFullscreenPopup) {
      const e = this.telInput.getBoundingClientRect(), t = this.telInput.offsetHeight;
      this.options.dropdownContainer && (this.dropdown.style.top = `${e.top + t}px`, this.dropdown.style.left = `${e.left}px`, this._handleWindowScroll = () => this._closeDropdown(), window.addEventListener("scroll", this._handleWindowScroll));
    }
  }
  //* We only bind dropdown listeners when the dropdown is open.
  _bindDropdownListeners() {
    this._handleMouseoverCountryList = (s) => {
      var o;
      const n = (o = s.target) == null ? void 0 : o.closest(".iti__country");
      n && this._highlightListItem(n, !1);
    }, this.countryList.addEventListener(
      "mouseover",
      this._handleMouseoverCountryList
    ), this._handleClickCountryList = (s) => {
      var o;
      const n = (o = s.target) == null ? void 0 : o.closest(".iti__country");
      n && this._selectListItem(n);
    }, this.countryList.addEventListener("click", this._handleClickCountryList);
    let e = !0;
    this._handleClickOffToClose = () => {
      e || this._closeDropdown(), e = !1;
    }, document.documentElement.addEventListener(
      "click",
      this._handleClickOffToClose
    );
    let t = "", i = null;
    if (this._handleKeydownOnDropdown = (s) => {
      ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(s.key) && (s.preventDefault(), s.stopPropagation(), s.key === "ArrowUp" || s.key === "ArrowDown" ? this._handleUpDownKey(s.key) : s.key === "Enter" ? this._handleEnterKey() : s.key === "Escape" && this._closeDropdown()), !this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(s.key) && (s.stopPropagation(), i && clearTimeout(i), t += s.key.toLowerCase(), this._searchForCountry(t), i = setTimeout(() => {
        t = "";
      }, 1e3));
    }, document.addEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch) {
      const s = () => {
        const o = this.searchInput.value.trim();
        o ? this._filterCountries(o) : this._filterCountries("", !0);
      };
      let n = null;
      this._handleSearchChange = () => {
        n && clearTimeout(n), n = setTimeout(() => {
          s(), n = null;
        }, 100);
      }, this.searchInput.addEventListener("input", this._handleSearchChange), this.searchInput.addEventListener("click", (o) => o.stopPropagation());
    }
  }
  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  _searchForCountry(e) {
    for (let t = 0; t < this.countries.length; t++) {
      const i = this.countries[t];
      if (i.name.substr(0, e.length).toLowerCase() === e) {
        const n = i.nodeById[this.id];
        this._highlightListItem(n, !1), this._scrollTo(n);
        break;
      }
    }
  }
  //* Country search enabled: Filter the countries according to the search query.
  _filterCountries(e, t = !1) {
    let i = !0;
    this.countryList.innerHTML = "";
    const s = N(e);
    for (let n = 0; n < this.countries.length; n++) {
      const o = this.countries[n], a = N(o.name), r = o.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map((h) => h[0]).join("").toLowerCase(), p = `+${o.dialCode}`;
      if (t || a.includes(s) || p.includes(s) || o.iso2.includes(s) || r.includes(s)) {
        const h = o.nodeById[this.id];
        h && this.countryList.appendChild(h), i && (this._highlightListItem(h, !1), i = !1);
      }
    }
    i && this._highlightListItem(null, !1), this.countryList.scrollTop = 0, this._updateSearchResultsText();
  }
  //* Update search results text (for a11y).
  _updateSearchResultsText() {
    const { i18n: e } = this.options, t = this.countryList.childElementCount;
    let i;
    t === 0 ? i = e.zeroSearchResults : t === 1 ? i = e.oneSearchResult : i = e.multipleSearchResults.replace("${count}", t.toString()), this.searchResultsA11yText.textContent = i;
  }
  //* Highlight the next/prev item in the list (and ensure it is visible).
  _handleUpDownKey(e) {
    var i, s;
    let t = e === "ArrowUp" ? (i = this.highlightedItem) == null ? void 0 : i.previousElementSibling : (s = this.highlightedItem) == null ? void 0 : s.nextElementSibling;
    !t && this.countryList.childElementCount > 1 && (t = e === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild), t && (this._scrollTo(t), this._highlightListItem(t, !1));
  }
  //* Select the currently highlighted item.
  _handleEnterKey() {
    this.highlightedItem && this._selectListItem(this.highlightedItem);
  }
  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
  _updateValFromNumber(e) {
    let t = e;
    if (this.options.formatOnDisplay && l.utils && this.selectedCountryData) {
      const i = this.options.nationalMode || t.charAt(0) !== "+" && !this.options.separateDialCode, { NATIONAL: s, INTERNATIONAL: n } = l.utils.numberFormat, o = i ? s : n;
      t = l.utils.formatNumber(
        t,
        this.selectedCountryData.iso2,
        o
      );
    }
    t = this._beforeSetNumber(t), this.telInput.value = t;
  }
  //* Check if need to select a new country based on the given number
  //* Note: called from _setInitialState, keyup handler, setNumber.
  _updateCountryFromNumber(e) {
    const t = this._getCountryFromNumber(e);
    return t !== null ? this._setCountry(t) : !1;
  }
  //* Check if the given number matches an area code from the selected country.
  _isAreaCodeMatch(e, t) {
    const { areaCodes: i, partialAreaCodes: s, dialCode: n } = this.selectedCountryData, o = e.substring(n.length), a = t.substring(n.length);
    return !!(i.includes(a) || s.includes(o));
  }
  _getCountryFromNumber(e) {
    const t = e.indexOf("+");
    let i = t ? e.substring(t) : e;
    const s = this.selectedCountryData.dialCode;
    i && s === "1" && i.charAt(0) !== "+" && (i.charAt(0) !== "1" && (i = `1${i}`), i = `+${i}`), this.options.separateDialCode && s && i.charAt(0) !== "+" && (i = `+${s}${i}`);
    const o = this._getDialCode(i, !0), a = v(i);
    if (o) {
      const r = v(o), p = this.dialCodeToIso2Map[r], h = this.selectedCountryData.iso2 && p.includes(this.selectedCountryData.iso2);
      let c = !1;
      if (h && (this.selectedCountryData.areaCodes && a.length > s.length ? c = this._isAreaCodeMatch(a, r) : c = !0), !(s === "1" && S(a)) && (!h || !c)) {
        for (let d = 0; d < p.length; d++)
          if (p[d])
            return p[d];
      }
    } else {
      if (i.charAt(0) === "+" && a.length)
        return "";
      if ((!i || i === "+") && !this.selectedCountryData.iso2)
        return this.defaultCountry;
    }
    return null;
  }
  //* Remove highlighting from other list items and highlight the given item.
  _highlightListItem(e, t) {
    const i = this.highlightedItem;
    if (i && (i.classList.remove("iti__highlight"), i.setAttribute("aria-selected", "false")), this.highlightedItem = e, this.highlightedItem) {
      this.highlightedItem.classList.add("iti__highlight"), this.highlightedItem.setAttribute("aria-selected", "true");
      const s = this.highlightedItem.getAttribute("id") || "";
      this.selectedCountry.setAttribute("aria-activedescendant", s), this.options.countrySearch && this.searchInput.setAttribute("aria-activedescendant", s);
    }
    t && this.highlightedItem.focus();
  }
  //* Find the country data for the given iso2 code
  //* the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  _getCountryData(e, t) {
    for (let i = 0; i < this.countries.length; i++)
      if (this.countries[i].iso2 === e)
        return this.countries[i];
    if (t)
      return null;
    throw new Error(`No country data for '${e}'`);
  }
  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  _setCountry(e) {
    const { separateDialCode: t, showFlags: i, i18n: s } = this.options, n = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
    if (this.selectedCountryData = e ? this._getCountryData(e, !1) || {} : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedCountryInner) {
      let o = "", a = "";
      e && i ? (o = `iti__flag iti__${e}`, a = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`) : (o = "iti__flag iti__globe", a = s.noCountrySelected), this.selectedCountryInner.className = o, this.selectedCountryA11yText.textContent = a;
    }
    if (this._setSelectedCountryTitleAttribute(e, t), t) {
      const o = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
      this.selectedDialCode.innerHTML = o, this._updateInputPadding();
    }
    return this._updatePlaceholder(), this._updateMaxLength(), n.iso2 !== e;
  }
  //* Update the input padding to make space for the selected country/dial code.
  _updateInputPadding() {
    if (this.selectedCountry) {
      const t = (this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth()) + 6;
      this.showSelectedCountryOnLeft ? this.telInput.style.paddingLeft = `${t}px` : this.telInput.style.paddingRight = `${t}px`;
    }
  }
  //* Update the maximum valid number length for the currently selected country.
  _updateMaxLength() {
    const { strictMode: e, placeholderNumberType: t, validationNumberTypes: i } = this.options, { iso2: s } = this.selectedCountryData;
    if (e && l.utils)
      if (s) {
        const n = l.utils.numberType[t];
        let o = l.utils.getExampleNumber(
          s,
          !1,
          n,
          !0
        ), a = o;
        for (; l.utils.isPossibleNumber(o, s, i); )
          a = o, o += "0";
        const r = l.utils.getCoreNumber(a, s);
        this.maxCoreNumberLength = r.length, s === "by" && (this.maxCoreNumberLength = r.length + 1);
      } else
        this.maxCoreNumberLength = null;
  }
  _setSelectedCountryTitleAttribute(e = null, t) {
    if (!this.selectedCountry)
      return;
    let i;
    e && !t ? i = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}` : e ? i = this.selectedCountryData.name : i = "Unknown", this.selectedCountry.setAttribute("title", i);
  }
  //* When the input is in a hidden container during initialisation, we must inject some markup
  //* into the end of the DOM to calculate the correct offsetWidth.
  //* NOTE: this is only used when separateDialCode is enabled, so countryContainer and selectedCountry
  //* will definitely exist.
  _getHiddenSelectedCountryWidth() {
    if (this.telInput.parentNode) {
      const e = this.telInput.parentNode.cloneNode(!1);
      e.style.visibility = "hidden", document.body.appendChild(e);
      const t = this.countryContainer.cloneNode();
      e.appendChild(t);
      const i = this.selectedCountry.cloneNode(!0);
      t.appendChild(i);
      const s = i.offsetWidth;
      return document.body.removeChild(e), s;
    }
    return 0;
  }
  //* Update the input placeholder to an example number from the currently selected country.
  _updatePlaceholder() {
    const {
      autoPlaceholder: e,
      placeholderNumberType: t,
      nationalMode: i,
      customPlaceholder: s
    } = this.options, n = e === "aggressive" || !this.hadInitialPlaceholder && e === "polite";
    if (l.utils && n) {
      const o = l.utils.numberType[t];
      let a = this.selectedCountryData.iso2 ? l.utils.getExampleNumber(
        this.selectedCountryData.iso2,
        i,
        o
      ) : "";
      a = this._beforeSetNumber(a), typeof s == "function" && (a = s(a, this.selectedCountryData)), this.telInput.setAttribute("placeholder", a);
    }
  }
  //* Called when the user selects a list item from the dropdown.
  _selectListItem(e) {
    const t = this._setCountry(
      e.getAttribute("data-country-code")
    );
    this._closeDropdown(), this._updateDialCode(e.getAttribute("data-dial-code")), this.telInput.focus(), t && this._triggerCountryChange();
  }
  //* Close the dropdown and unbind any listeners.
  _closeDropdown() {
    this.dropdownContent.classList.add("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "false"), this.selectedCountry.removeAttribute("aria-activedescendant"), this.highlightedItem && this.highlightedItem.setAttribute("aria-selected", "false"), this.options.countrySearch && this.searchInput.removeAttribute("aria-activedescendant"), this.dropdownArrow.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch && this.searchInput.removeEventListener("input", this._handleSearchChange), document.documentElement.removeEventListener(
      "click",
      this._handleClickOffToClose
    ), this.countryList.removeEventListener(
      "mouseover",
      this._handleMouseoverCountryList
    ), this.countryList.removeEventListener("click", this._handleClickCountryList), this.options.dropdownContainer && (this.options.useFullscreenPopup || window.removeEventListener("scroll", this._handleWindowScroll), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._handlePageLoad && window.removeEventListener("load", this._handlePageLoad), this._trigger("close:countrydropdown");
  }
  //* Check if an element is visible within it's container, else scroll until it is.
  _scrollTo(e) {
    const t = this.countryList, i = document.documentElement.scrollTop, s = t.offsetHeight, n = t.getBoundingClientRect().top + i, o = n + s, a = e.offsetHeight, r = e.getBoundingClientRect().top + i, p = r + a, h = r - n + t.scrollTop;
    if (r < n)
      t.scrollTop = h;
    else if (p > o) {
      const c = s - a;
      t.scrollTop = h - c;
    }
  }
  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  _updateDialCode(e) {
    const t = this.telInput.value, i = `+${e}`;
    let s;
    if (t.charAt(0) === "+") {
      const n = this._getDialCode(t);
      n ? s = t.replace(n, i) : s = i, this.telInput.value = s;
    }
  }
  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  _getDialCode(e, t) {
    let i = "";
    if (e.charAt(0) === "+") {
      let s = "";
      for (let n = 0; n < e.length; n++) {
        const o = e.charAt(n);
        if (!isNaN(parseInt(o, 10))) {
          if (s += o, t)
            this.dialCodeToIso2Map[s] && (i = e.substr(0, n + 1));
          else if (this.dialCodes[s]) {
            i = e.substr(0, n + 1);
            break;
          }
          if (s.length === this.dialCodeMaxLen)
            break;
        }
      }
    }
    return i;
  }
  //* Get the input val, adding the dial code if separateDialCode is enabled.
  _getFullNumber(e) {
    const t = e || this.telInput.value.trim(), { dialCode: i } = this.selectedCountryData;
    let s;
    const n = v(t);
    return this.options.separateDialCode && t.charAt(0) !== "+" && i && n ? s = `+${i}` : s = "", s + t;
  }
  //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
  _beforeSetNumber(e) {
    let t = e;
    if (this.options.separateDialCode) {
      let i = this._getDialCode(t);
      if (i) {
        i = `+${this.selectedCountryData.dialCode}`;
        const s = t[i.length] === " " || t[i.length] === "-" ? i.length + 1 : i.length;
        t = t.substr(s);
      }
    }
    return this._cap(t);
  }
  //* Trigger the 'countrychange' event.
  _triggerCountryChange() {
    this._trigger("countrychange");
  }
  //* Format the number as the user types.
  _formatNumberAsYouType() {
    const e = this._getFullNumber(), t = l.utils ? l.utils.formatNumberAsYouType(e, this.selectedCountryData.iso2) : e, { dialCode: i } = this.selectedCountryData;
    return this.options.separateDialCode && this.telInput.value.charAt(0) !== "+" && t.includes(`+${i}`) ? (t.split(`+${i}`)[1] || "").trim() : t;
  }
  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************
  //* This is called when the geoip call returns.
  handleAutoCountry() {
    this.options.initialCountry === "auto" && l.autoCountry && (this.defaultCountry = l.autoCountry, this.selectedCountryData.iso2 || this.selectedCountryInner.classList.contains("iti__globe") || this.setCountry(this.defaultCountry), this.resolveAutoCountryPromise());
  }
  //* This is called when the utils request completes.
  handleUtils() {
    l.utils && (this.telInput.value && this._updateValFromNumber(this.telInput.value), this.selectedCountryData.iso2 && (this._updatePlaceholder(), this._updateMaxLength())), this.resolveUtilsScriptPromise();
  }
  //********************
  //*  PUBLIC METHODS
  //********************
  //* Remove plugin.
  destroy() {
    var n, o;
    const { allowDropdown: e, separateDialCode: t } = this.options;
    if (e) {
      this._closeDropdown(), this.selectedCountry.removeEventListener(
        "click",
        this._handleClickSelectedCountry
      ), this.countryContainer.removeEventListener(
        "keydown",
        this._handleCountryContainerKeydown
      );
      const a = this.telInput.closest("label");
      a && a.removeEventListener("click", this._handleLabelClick);
    }
    const { form: i } = this.telInput;
    this._handleHiddenInputSubmit && i && i.removeEventListener("submit", this._handleHiddenInputSubmit), this.telInput.removeEventListener("input", this._handleInputEvent), this._handleKeydownEvent && this.telInput.removeEventListener("keydown", this._handleKeydownEvent), this.telInput.removeAttribute("data-intl-tel-input-id"), t && (this.isRTL ? this.telInput.style.paddingRight = this.originalPaddingRight : this.telInput.style.paddingLeft = this.originalPaddingLeft);
    const s = this.telInput.parentNode;
    (n = s == null ? void 0 : s.parentNode) == null || n.insertBefore(this.telInput, s), (o = s == null ? void 0 : s.parentNode) == null || o.removeChild(s), delete l.instances[this.id];
  }
  //* Get the extension from the current number.
  getExtension() {
    return l.utils ? l.utils.getExtension(
      this._getFullNumber(),
      this.selectedCountryData.iso2
    ) : "";
  }
  //* Format the number to the given format.
  getNumber(e) {
    if (l.utils) {
      const { iso2: t } = this.selectedCountryData;
      return l.utils.formatNumber(
        this._getFullNumber(),
        t,
        e
      );
    }
    return "";
  }
  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType() {
    return l.utils ? l.utils.getNumberType(
      this._getFullNumber(),
      this.selectedCountryData.iso2
    ) : -99;
  }
  //* Get the country data for the currently selected country.
  getSelectedCountryData() {
    return this.selectedCountryData;
  }
  //* Get the validation error.
  getValidationError() {
    if (l.utils) {
      const { iso2: e } = this.selectedCountryData;
      return l.utils.getValidationError(this._getFullNumber(), e);
    }
    return -99;
  }
  //* Validate the input val
  isValidNumber() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const e = this._getFullNumber(), t = e.search(new RegExp("\\p{L}", "u"));
    if (t > -1) {
      const i = e.substring(0, t), s = this._utilsIsPossibleNumber(i), n = this._utilsIsPossibleNumber(e);
      return s && n;
    }
    return this._utilsIsPossibleNumber(e);
  }
  _utilsIsPossibleNumber(e) {
    return l.utils ? l.utils.isPossibleNumber(e, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Validate the input val (precise)
  isValidNumberPrecise() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const e = this._getFullNumber(), t = e.search(new RegExp("\\p{L}", "u"));
    if (t > -1) {
      const i = e.substring(0, t), s = this._utilsIsValidNumber(i), n = this._utilsIsValidNumber(e);
      return s && n;
    }
    return this._utilsIsValidNumber(e);
  }
  _utilsIsValidNumber(e) {
    return l.utils ? l.utils.isValidNumber(e, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Update the selected country, and update the input val accordingly.
  setCountry(e) {
    const t = e == null ? void 0 : e.toLowerCase(), i = this.selectedCountryData.iso2;
    (e && t !== i || !e && i) && (this._setCountry(t), this._updateDialCode(this.selectedCountryData.dialCode), this._triggerCountryChange());
  }
  //* Set the input value and update the country.
  setNumber(e) {
    const t = this._updateCountryFromNumber(e);
    this._updateValFromNumber(e), t && this._triggerCountryChange(), this._trigger("input", { isSetNumber: !0 });
  }
  //* Set the placeholder number typ
  setPlaceholderNumberType(e) {
    this.options.placeholderNumberType = e, this._updatePlaceholder();
  }
  setDisabled(e) {
    this.telInput.disabled = e, e ? this.selectedCountry.setAttribute("disabled", "true") : this.selectedCountry.removeAttribute("disabled");
  }
}
const W = (u) => {
  if (!l.utils && !l.startedLoadingUtilsScript) {
    let e;
    if (typeof u == "function")
      try {
        e = Promise.resolve(u());
      } catch (t) {
        return Promise.reject(t);
      }
    else
      return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof u}`));
    return l.startedLoadingUtilsScript = !0, e.then((t) => {
      const i = t == null ? void 0 : t.default;
      if (!i || typeof i != "object")
        throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
      return l.utils = i, w("handleUtils"), !0;
    }).catch((t) => {
      throw w("rejectUtilsScriptPromise", t), t;
    });
  }
  return null;
}, l = Object.assign(
  (u, e) => {
    const t = new G(u, e);
    return t._init(), u.setAttribute("data-intl-tel-input-id", t.id.toString()), l.instances[t.id] = t, t;
  },
  {
    defaults: T,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: () => document.readyState === "complete",
    //* Get the country data object.
    getCountryData: () => I,
    //* A getter for the plugin instance.
    getInstance: (u) => {
      const e = u.getAttribute("data-intl-tel-input-id");
      return e ? l.instances[e] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils: W,
    startedLoadingUtilsScript: !1,
    startedLoadingAutoCountry: !1,
    version: "25.0.2"
  }
), J = {
  __name: "IntlTelInput",
  props: /* @__PURE__ */ D({
    disabled: {
      type: Boolean,
      default: !1
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ""
    }
  }, {
    modelValue: {
      type: String,
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ D([
    "changeNumber",
    "changeCountry",
    "changeValidity",
    "changeErrorCode"
  ], ["update:modelValue"]),
  setup(u, { expose: e, emit: t }) {
    const i = x(u, "modelValue"), s = u, n = t, o = L(), a = L(), r = L(!1), p = () => a.value ? s.options.strictMode ? a.value.isValidNumberPrecise() : a.value.isValidNumber() : null, h = () => {
      let d = p();
      r.value !== d && (r.value = d, n("changeValidity", !!d), n(
        "changeErrorCode",
        d ? null : a.value.getValidationError()
      ));
    }, c = () => {
      var d;
      n("changeNumber", ((d = a.value) == null ? void 0 : d.getNumber()) ?? ""), h();
    }, C = () => {
      var d;
      n("changeCountry", ((d = a.value) == null ? void 0 : d.getSelectedCountryData().iso2) ?? ""), c(), h();
    };
    return E(() => {
      o.value && (a.value = l(o.value, s.options), s.value && a.value.setNumber(s.value), s.disabled && a.value.setDisabled(s.disabled));
    }), M(
      () => s.disabled,
      (d) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setDisabled(d);
      }
    ), F(() => {
      var d;
      return (d = a.value) == null ? void 0 : d.destroy();
    }), e({ instance: a, input: o }), (d, m) => B((V(), O("input", z({
      ref_key: "input",
      ref: o,
      "onUpdate:modelValue": m[0] || (m[0] = (b) => i.value = b),
      type: "tel",
      onCountrychange: C,
      onInput: c
    }, u.inputProps), null, 16)), [
      [R, i.value]
    ]);
  }
};
export {
  J as default
};
