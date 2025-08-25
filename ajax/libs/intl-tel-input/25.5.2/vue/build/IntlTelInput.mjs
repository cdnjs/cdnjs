import { mergeModels as D, useModel as x, ref as L, onMounted as E, watch as M, onUnmounted as F, withDirectives as B, createElementBlock as V, openBlock as z, mergeProps as R, vModelText as O } from "vue";
const N = [
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
    0,
    null,
    "0"
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
    ["89164"],
    "0"
  ],
  [
    "cc",
    // Cocos (Keeling) Islands
    "61",
    1,
    ["89162"],
    "0"
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
    ["1481", "7781", "7839", "7911"],
    "0"
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
    ["1624", "74576", "7524", "7924", "7624"],
    "0"
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
    ["1534", "7509", "7700", "7797", "7829", "7937"],
    "0"
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
    ["33", "7"],
    "8"
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
    ["269", "639"],
    "0"
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
    0,
    null,
    "0"
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
    0,
    null,
    "0"
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
    0,
    null,
    "8"
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
    0,
    null,
    "0"
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
    ["5288", "5289"],
    "0"
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
for (let h = 0; h < N.length; h++) {
  const t = N[h];
  I[h] = {
    name: "",
    // this is now populated in the plugin
    iso2: t[0],
    dialCode: t[1],
    priority: t[2] || 0,
    areaCodes: t[3] || null,
    nodeById: {},
    nationalPrefix: t[4] || null
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
for (let h = 0; h < I.length; h++)
  I[h].name = k[I[h].iso2];
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
}, H = [
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
], v = (h) => h.replace(/\D/g, ""), A = (h = "") => h.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), S = (h) => {
  const t = v(h);
  if (t.charAt(0) === "1") {
    const e = t.substr(1, 3);
    return H.includes(e);
  }
  return !1;
}, K = (h, t, e, i) => {
  if (e === 0 && !i)
    return 0;
  let s = 0;
  for (let n = 0; n < t.length; n++) {
    if (/[+0-9]/.test(t[n]) && s++, s === h && !i)
      return n + 1;
    if (i && s === h + 1)
      return n;
  }
  return t.length;
}, m = (h, t, e) => {
  const i = document.createElement(h);
  return t && Object.entries(t).forEach(([s, n]) => i.setAttribute(s, n)), e && e.appendChild(i), i;
}, w = (h, ...t) => {
  const { instances: e } = u;
  Object.values(e).forEach((i) => i[h](...t));
};
class W {
  constructor(t, e = {}) {
    this.id = U++, this.telInput = t, this.highlightedItem = null, this.options = Object.assign({}, T, e), this.hadInitialPlaceholder = !!t.getAttribute("placeholder");
  }
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init() {
    this.options.useFullscreenPopup && (this.options.fixDropdownWidth = !1), this.options.onlyCountries.length === 1 && (this.options.initialCountry = this.options.onlyCountries[0]), this.options.separateDialCode && (this.options.nationalMode = !1), this.options.allowDropdown && !this.options.showFlags && !this.options.separateDialCode && (this.options.nationalMode = !1), this.options.useFullscreenPopup && !this.options.dropdownContainer && (this.options.dropdownContainer = document.body), this.isAndroid = typeof navigator < "u" ? /Android/i.test(navigator.userAgent) : !1, this.isRTL = !!this.telInput.closest("[dir=rtl]"), this.telInput.dir = "ltr";
    const t = this.options.allowDropdown || this.options.separateDialCode;
    this.showSelectedCountryOnLeft = this.isRTL ? !t : t, this.options.separateDialCode && (this.isRTL ? this.originalPaddingRight = this.telInput.style.paddingRight : this.originalPaddingLeft = this.telInput.style.paddingLeft), this.options.i18n = { ...k, ...this.options.i18n };
    const e = new Promise((s, n) => {
      this.resolveAutoCountryPromise = s, this.rejectAutoCountryPromise = n;
    }), i = new Promise((s, n) => {
      this.resolveUtilsScriptPromise = s, this.rejectUtilsScriptPromise = n;
    });
    this.promise = Promise.all([e, i]), this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests();
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
    this.options.countryOrder && (this.options.countryOrder = this.options.countryOrder.map((t) => t.toLowerCase())), this.countries.sort((t, e) => {
      const { countryOrder: i } = this.options;
      if (i) {
        const s = i.indexOf(t.iso2), n = i.indexOf(e.iso2), o = s > -1, r = n > -1;
        if (o || r)
          return o && r ? s - n : o ? -1 : 1;
      }
      return t.name.localeCompare(e.name);
    });
  }
  //* Add a dial code to this.dialCodeToIso2Map.
  _addToDialCodeMap(t, e, i) {
    e.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = e.length), this.dialCodeToIso2Map.hasOwnProperty(e) || (this.dialCodeToIso2Map[e] = []);
    for (let n = 0; n < this.dialCodeToIso2Map[e].length; n++)
      if (this.dialCodeToIso2Map[e][n] === t)
        return;
    const s = i !== void 0 ? i : this.dialCodeToIso2Map[e].length;
    this.dialCodeToIso2Map[e][s] = t;
  }
  //* Process onlyCountries or excludeCountries array if present.
  _processAllCountries() {
    const { onlyCountries: t, excludeCountries: e } = this.options;
    if (t.length) {
      const i = t.map(
        (s) => s.toLowerCase()
      );
      this.countries = I.filter(
        (s) => i.includes(s.iso2)
      );
    } else if (e.length) {
      const i = e.map(
        (s) => s.toLowerCase()
      );
      this.countries = I.filter(
        (s) => !i.includes(s.iso2)
      );
    } else
      this.countries = I;
  }
  //* Translate Countries by object literal provided on config.
  _translateCountryNames() {
    for (let t = 0; t < this.countries.length; t++) {
      const e = this.countries[t].iso2.toLowerCase();
      this.options.i18n.hasOwnProperty(e) && (this.countries[t].name = this.options.i18n[e]);
    }
  }
  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  _processDialCodes() {
    this.dialCodes = {}, this.dialCodeMaxLen = 0, this.dialCodeToIso2Map = {};
    for (let t = 0; t < this.countries.length; t++) {
      const e = this.countries[t];
      this.dialCodes[e.dialCode] || (this.dialCodes[e.dialCode] = !0), this._addToDialCodeMap(e.iso2, e.dialCode, e.priority);
    }
    for (let t = 0; t < this.countries.length; t++) {
      const e = this.countries[t];
      if (e.areaCodes) {
        const i = this.dialCodeToIso2Map[e.dialCode][0];
        for (let s = 0; s < e.areaCodes.length; s++) {
          const n = e.areaCodes[s];
          for (let o = 1; o < n.length; o++) {
            const r = n.substr(0, o), a = e.dialCode + r;
            this._addToDialCodeMap(i, a), this._addToDialCodeMap(e.iso2, a);
          }
          this._addToDialCodeMap(e.iso2, e.dialCode + n);
        }
      }
    }
  }
  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  _generateMarkup() {
    var l, d, g;
    this.telInput.classList.add("iti__tel-input"), !this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete")) && this.telInput.setAttribute("autocomplete", "off");
    const {
      allowDropdown: t,
      separateDialCode: e,
      showFlags: i,
      containerClass: s,
      hiddenInput: n,
      dropdownContainer: o,
      fixDropdownWidth: r,
      useFullscreenPopup: a,
      countrySearch: c,
      i18n: y
    } = this.options;
    let p = "iti";
    t && (p += " iti--allow-dropdown"), i && (p += " iti--show-flags"), s && (p += ` ${s}`), a || (p += " iti--inline-dropdown");
    const C = m("div", { class: p });
    if ((l = this.telInput.parentNode) == null || l.insertBefore(C, this.telInput), t || i || e) {
      this.countryContainer = m(
        "div",
        { class: "iti__country-container" },
        C
      ), this.showSelectedCountryOnLeft ? this.countryContainer.style.left = "0px" : this.countryContainer.style.right = "0px", t ? (this.selectedCountry = m(
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
      ), this.telInput.disabled && this.selectedCountry.setAttribute("disabled", "true")) : this.selectedCountry = m(
        "div",
        { class: "iti__selected-country" },
        this.countryContainer
      );
      const b = m("div", { class: "iti__selected-country-primary" }, this.selectedCountry);
      if (this.selectedCountryInner = m("div", { class: "iti__flag" }, b), this.selectedCountryA11yText = m(
        "span",
        { class: "iti__a11y-text" },
        this.selectedCountryInner
      ), t && (this.dropdownArrow = m(
        "div",
        { class: "iti__arrow", "aria-hidden": "true" },
        b
      )), e && (this.selectedDialCode = m(
        "div",
        { class: "iti__selected-dial-code", "aria-hidden": "true", dir: "ltr" },
        this.selectedCountry
      )), t) {
        const f = r ? "" : "iti--flexible-dropdown-width";
        if (this.dropdownContent = m("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${f}`
        }), c && (this.searchInput = m(
          "input",
          {
            type: "text",
            class: "iti__search-input",
            placeholder: y.searchPlaceholder,
            role: "combobox",
            "aria-expanded": "true",
            "aria-label": y.searchPlaceholder,
            "aria-controls": `iti-${this.id}__country-listbox`,
            "aria-autocomplete": "list",
            autocomplete: "off"
          },
          this.dropdownContent
        ), this.searchResultsA11yText = m(
          "span",
          { class: "iti__a11y-text" },
          this.dropdownContent
        )), this.countryList = m(
          "ul",
          {
            class: "iti__country-list",
            id: `iti-${this.id}__country-listbox`,
            role: "listbox",
            "aria-label": y.countryListAriaLabel
          },
          this.dropdownContent
        ), this._appendListItems(), c && this._updateSearchResultsText(), o) {
          let _ = "iti iti--container";
          s && (_ += ` ${s}`), a ? _ += " iti--fullscreen-popup" : _ += " iti--inline-dropdown", this.dropdown = m("div", { class: _ }), this.dropdown.appendChild(this.dropdownContent);
        } else
          this.countryContainer.appendChild(this.dropdownContent);
      }
    }
    if (C.appendChild(this.telInput), this._updateInputPadding(), n) {
      const b = this.telInput.getAttribute("name") || "", f = n(b);
      if (f.phone) {
        const _ = (d = this.telInput.form) == null ? void 0 : d.querySelector(`input[name="${f.phone}"]`);
        _ ? this.hiddenInput = _ : (this.hiddenInput = m("input", {
          type: "hidden",
          name: f.phone
        }), C.appendChild(this.hiddenInput));
      }
      if (f.country) {
        const _ = (g = this.telInput.form) == null ? void 0 : g.querySelector(`input[name="${f.country}"]`);
        _ ? this.hiddenInputCountry = _ : (this.hiddenInputCountry = m("input", {
          type: "hidden",
          name: f.country
        }), C.appendChild(this.hiddenInputCountry));
      }
    }
  }
  //* For each country: add a country list item <li> to the countryList <ul> container.
  _appendListItems() {
    for (let t = 0; t < this.countries.length; t++) {
      const e = this.countries[t], i = t === 0 ? "iti__highlight" : "", s = m(
        "li",
        {
          id: `iti-${this.id}__item-${e.iso2}`,
          class: `iti__country ${i}`,
          tabindex: "-1",
          role: "option",
          "data-dial-code": e.dialCode,
          "data-country-code": e.iso2,
          "aria-selected": "false"
        },
        this.countryList
      );
      e.nodeById[this.id] = s;
      let n = "";
      this.options.showFlags && (n += `<div class='iti__flag iti__${e.iso2}'></div>`), n += `<span class='iti__country-name'>${e.name}</span>`, n += `<span class='iti__dial-code' dir='ltr'>+${e.dialCode}</span>`, s.insertAdjacentHTML("beforeend", n);
    }
  }
  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  _setInitialState(t = !1) {
    const e = this.telInput.getAttribute("value"), i = this.telInput.value, n = e && e.charAt(0) === "+" && (!i || i.charAt(0) !== "+") ? e : i, o = this._getDialCode(n), r = S(n), { initialCountry: a, geoIpLookup: c } = this.options, y = a === "auto" && c;
    if (o && !r)
      this._updateCountryFromNumber(n);
    else if (!y || t) {
      const p = a ? a.toLowerCase() : "";
      p && this._getCountryData(p, !0) ? this._setCountry(p) : o && r ? this._setCountry("us") : this._setCountry();
    }
    n && this._updateValFromNumber(n);
  }
  //* Initialise the main event listeners: input keyup, and click selected country.
  _initListeners() {
    this._initTelInputListeners(), this.options.allowDropdown && this._initDropdownListeners(), (this.hiddenInput || this.hiddenInputCountry) && this.telInput.form && this._initHiddenInputListener();
  }
  //* Update hidden input on form submit.
  _initHiddenInputListener() {
    var t;
    this._handleHiddenInputSubmit = () => {
      this.hiddenInput && (this.hiddenInput.value = this.getNumber()), this.hiddenInputCountry && (this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "");
    }, (t = this.telInput.form) == null || t.addEventListener(
      "submit",
      this._handleHiddenInputSubmit
    );
  }
  //* initialise the dropdown listeners.
  _initDropdownListeners() {
    this._handleLabelClick = (e) => {
      this.dropdownContent.classList.contains("iti__hide") ? this.telInput.focus() : e.preventDefault();
    };
    const t = this.telInput.closest("label");
    t && t.addEventListener("click", this._handleLabelClick), this._handleClickSelectedCountry = () => {
      this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly && this._openDropdown();
    }, this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry), this._handleCountryContainerKeydown = (e) => {
      this.dropdownContent.classList.contains("iti__hide") && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key) && (e.preventDefault(), e.stopPropagation(), this._openDropdown()), e.key === "Tab" && this._closeDropdown();
    }, this.countryContainer.addEventListener(
      "keydown",
      this._handleCountryContainerKeydown
    );
  }
  //* Init many requests: utils script / geo ip lookup.
  _initRequests() {
    let { loadUtils: t, initialCountry: e, geoIpLookup: i } = this.options;
    t && !u.utils ? (this._handlePageLoad = () => {
      var n;
      window.removeEventListener("load", this._handlePageLoad), (n = u.attachUtils(t)) == null || n.catch(() => {
      });
    }, u.documentReady() ? this._handlePageLoad() : window.addEventListener("load", this._handlePageLoad)) : this.resolveUtilsScriptPromise(), e === "auto" && i && !this.selectedCountryData.iso2 ? this._loadAutoCountry() : this.resolveAutoCountryPromise();
  }
  //* Perform the geo ip lookup.
  _loadAutoCountry() {
    u.autoCountry ? this.handleAutoCountry() : u.startedLoadingAutoCountry || (u.startedLoadingAutoCountry = !0, typeof this.options.geoIpLookup == "function" && this.options.geoIpLookup(
      (t = "") => {
        const e = t.toLowerCase();
        e && this._getCountryData(e, !0) ? (u.autoCountry = e, setTimeout(() => w("handleAutoCountry"))) : (this._setInitialState(!0), w("rejectAutoCountryPromise"));
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
    const { strictMode: t, formatAsYouType: e, separateDialCode: i, formatOnDisplay: s, allowDropdown: n, countrySearch: o } = this.options;
    let r = !1;
    new RegExp("\\p{L}", "u").test(this.telInput.value) && (r = !0), this._handleInputEvent = (a) => {
      if (this.isAndroid && (a == null ? void 0 : a.data) === "+" && i && n && o) {
        const C = this.telInput.selectionStart || 0, l = this.telInput.value.substring(0, C - 1), d = this.telInput.value.substring(C);
        this.telInput.value = l + d, this._openDropdownWithPlus();
        return;
      }
      this._updateCountryFromNumber(this.telInput.value) && this._triggerCountryChange();
      const c = (a == null ? void 0 : a.data) && /[^+0-9]/.test(a.data), y = (a == null ? void 0 : a.inputType) === "insertFromPaste" && this.telInput.value;
      c || y && !t ? r = !0 : /[^+0-9]/.test(this.telInput.value) || (r = !1);
      const p = (a == null ? void 0 : a.detail) && a.detail.isSetNumber && !s;
      if (e && !r && !p) {
        const C = this.telInput.selectionStart || 0, d = this.telInput.value.substring(0, C).replace(/[^+0-9]/g, "").length, g = (a == null ? void 0 : a.inputType) === "deleteContentForward", b = this._formatNumberAsYouType(), f = K(d, b, C, g);
        this.telInput.value = b, this.telInput.setSelectionRange(f, f);
      }
    }, this.telInput.addEventListener("input", this._handleInputEvent), (t || i) && (this._handleKeydownEvent = (a) => {
      if (a.key && a.key.length === 1 && !a.altKey && !a.ctrlKey && !a.metaKey) {
        if (i && n && o && a.key === "+") {
          a.preventDefault(), this._openDropdownWithPlus();
          return;
        }
        if (t) {
          const c = this.telInput.value, p = !(c.charAt(0) === "+") && this.telInput.selectionStart === 0 && a.key === "+", C = /^[0-9]$/.test(a.key), l = i ? C : p || C, d = c.slice(0, this.telInput.selectionStart) + a.key + c.slice(this.telInput.selectionEnd), g = this._getFullNumber(d), b = u.utils.getCoreNumber(g, this.selectedCountryData.iso2), f = this.maxCoreNumberLength && b.length > this.maxCoreNumberLength, P = this._getNewCountryFromNumber(g) !== null;
          (!l || f && !P && !p) && a.preventDefault();
        }
      }
    }, this.telInput.addEventListener("keydown", this._handleKeydownEvent));
  }
  //* Adhere to the input's maxlength attr.
  _cap(t) {
    const e = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
    return e && t.length > e ? t.substr(0, e) : t;
  }
  //* Trigger a custom event on the input.
  _trigger(t, e = {}) {
    const i = new CustomEvent(t, {
      bubbles: !0,
      cancelable: !0,
      detail: e
    });
    this.telInput.dispatchEvent(i);
  }
  //* Open the dropdown.
  _openDropdown() {
    const { fixDropdownWidth: t, countrySearch: e } = this.options;
    if (t && (this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`), this.dropdownContent.classList.remove("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "true"), this._setDropdownPosition(), e) {
      const i = this.countryList.firstElementChild;
      i && (this._highlightListItem(i, !1), this.countryList.scrollTop = 0), this.searchInput.focus();
    }
    this._bindDropdownListeners(), this.dropdownArrow.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown");
  }
  //* Set the dropdown position
  _setDropdownPosition() {
    if (this.options.dropdownContainer && this.options.dropdownContainer.appendChild(this.dropdown), !this.options.useFullscreenPopup) {
      const t = this.telInput.getBoundingClientRect(), e = this.telInput.offsetHeight;
      this.options.dropdownContainer && (this.dropdown.style.top = `${t.top + e}px`, this.dropdown.style.left = `${t.left}px`, this._handleWindowScroll = () => this._closeDropdown(), window.addEventListener("scroll", this._handleWindowScroll));
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
    let t = !0;
    this._handleClickOffToClose = () => {
      t || this._closeDropdown(), t = !1;
    }, document.documentElement.addEventListener(
      "click",
      this._handleClickOffToClose
    );
    let e = "", i = null;
    if (this._handleKeydownOnDropdown = (s) => {
      ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(s.key) && (s.preventDefault(), s.stopPropagation(), s.key === "ArrowUp" || s.key === "ArrowDown" ? this._handleUpDownKey(s.key) : s.key === "Enter" ? this._handleEnterKey() : s.key === "Escape" && this._closeDropdown()), !this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(s.key) && (s.stopPropagation(), i && clearTimeout(i), e += s.key.toLowerCase(), this._searchForCountry(e), i = setTimeout(() => {
        e = "";
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
  _searchForCountry(t) {
    for (let e = 0; e < this.countries.length; e++) {
      const i = this.countries[e];
      if (i.name.substr(0, t.length).toLowerCase() === t) {
        const n = i.nodeById[this.id];
        this._highlightListItem(n, !1), this._scrollTo(n);
        break;
      }
    }
  }
  //* Country search enabled: Filter the countries according to the search query.
  _filterCountries(t, e = !1) {
    let i = !0;
    this.countryList.innerHTML = "";
    const s = A(t), n = s.length, o = [], r = [], a = [], c = [], y = [], p = [];
    for (let l = 0; l < this.countries.length; l++) {
      const d = this.countries[l], g = A(d.name), b = d.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map((f) => f[0]).join("").toLowerCase();
      e || n === 0 ? a.push(d) : d.iso2.toLowerCase() === s ? o.push(d) : g.startsWith(s) ? r.push(d) : g.includes(s) ? a.push(d) : s === d.dialCode || s === `+${d.dialCode}` ? c.push(d) : `+${d.dialCode}`.includes(s) ? y.push(d) : b.includes(s) && p.push(d);
    }
    const C = [
      ...o.sort((l, d) => l.priority - d.priority),
      ...r.sort((l, d) => l.priority - d.priority),
      ...a.sort((l, d) => l.priority - d.priority),
      ...c.sort((l, d) => l.priority - d.priority),
      ...y.sort((l, d) => l.priority - d.priority),
      ...p.sort((l, d) => l.priority - d.priority)
    ];
    for (const l of C) {
      const d = l.nodeById[this.id];
      d && (this.countryList.appendChild(d), i && (this._highlightListItem(d, !1), i = !1));
    }
    i && this._highlightListItem(null, !1), this.countryList.scrollTop = 0, this._updateSearchResultsText();
  }
  //* Update search results text (for a11y).
  _updateSearchResultsText() {
    const { i18n: t } = this.options, e = this.countryList.childElementCount;
    let i;
    "searchResultsText" in t ? i = t.searchResultsText(e) : e === 0 ? i = t.zeroSearchResults : e === 1 ? i = t.oneSearchResult : i = t.multipleSearchResults.replace("${count}", e.toString()), this.searchResultsA11yText.textContent = i;
  }
  //* Highlight the next/prev item in the list (and ensure it is visible).
  _handleUpDownKey(t) {
    var i, s;
    let e = t === "ArrowUp" ? (i = this.highlightedItem) == null ? void 0 : i.previousElementSibling : (s = this.highlightedItem) == null ? void 0 : s.nextElementSibling;
    !e && this.countryList.childElementCount > 1 && (e = t === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild), e && (this._scrollTo(e), this._highlightListItem(e, !1));
  }
  //* Select the currently highlighted item.
  _handleEnterKey() {
    this.highlightedItem && this._selectListItem(this.highlightedItem);
  }
  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
  _updateValFromNumber(t) {
    let e = t;
    if (this.options.formatOnDisplay && u.utils && this.selectedCountryData) {
      const i = this.options.nationalMode || e.charAt(0) !== "+" && !this.options.separateDialCode, { NATIONAL: s, INTERNATIONAL: n } = u.utils.numberFormat, o = i ? s : n;
      e = u.utils.formatNumber(
        e,
        this.selectedCountryData.iso2,
        o
      );
    }
    e = this._beforeSetNumber(e), this.telInput.value = e;
  }
  //* Check if need to select a new country based on the given number
  //* Note: called from _setInitialState, keyup handler, setNumber.
  _updateCountryFromNumber(t) {
    const e = this._getNewCountryFromNumber(t);
    return e !== null ? this._setCountry(e) : !1;
  }
  _ensureHasDialCode(t) {
    const { dialCode: e, nationalPrefix: i } = this.selectedCountryData;
    if (t.charAt(0) === "+" || !e)
      return t;
    const o = i && t.charAt(0) === i && !this.options.separateDialCode ? t.substring(1) : t;
    return `+${e}${o}`;
  }
  // Get the country ISO2 code from the given number
  // BUT ONLY IF ITS CHANGED FROM THE CURRENTLY SELECTED COUNTRY
  // NOTE: consider refactoring this to be more clear
  _getNewCountryFromNumber(t) {
    const e = t.indexOf("+");
    let i = e ? t.substring(e) : t;
    const s = this.selectedCountryData.iso2, n = this.selectedCountryData.dialCode;
    i = this._ensureHasDialCode(i);
    const o = this._getDialCode(i, !0), r = v(i);
    if (o) {
      const a = v(o), c = this.dialCodeToIso2Map[a];
      if (!s && this.defaultCountry && c.includes(this.defaultCountry))
        return this.defaultCountry;
      const y = this.selectedCountryData.areaCodes && r.length > a.length, p = s && c.includes(s) && !y;
      if (!(n === "1" && S(r)) && !p) {
        for (let l = 0; l < c.length; l++)
          if (c[l])
            return c[l];
      }
    } else {
      if (i.charAt(0) === "+" && r.length)
        return "";
      if ((!i || i === "+") && !this.selectedCountryData.iso2)
        return this.defaultCountry;
    }
    return null;
  }
  //* Remove highlighting from other list items and highlight the given item.
  _highlightListItem(t, e) {
    const i = this.highlightedItem;
    if (i && (i.classList.remove("iti__highlight"), i.setAttribute("aria-selected", "false")), this.highlightedItem = t, this.highlightedItem) {
      this.highlightedItem.classList.add("iti__highlight"), this.highlightedItem.setAttribute("aria-selected", "true");
      const s = this.highlightedItem.getAttribute("id") || "";
      this.selectedCountry.setAttribute("aria-activedescendant", s), this.options.countrySearch && this.searchInput.setAttribute("aria-activedescendant", s);
    }
    e && this.highlightedItem.focus();
  }
  //* Find the country data for the given iso2 code
  //* the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  _getCountryData(t, e) {
    for (let i = 0; i < this.countries.length; i++)
      if (this.countries[i].iso2 === t)
        return this.countries[i];
    if (e)
      return null;
    throw new Error(`No country data for '${t}'`);
  }
  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  _setCountry(t) {
    const { separateDialCode: e, showFlags: i, i18n: s } = this.options, n = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
    if (this.selectedCountryData = t ? this._getCountryData(t, !1) || {} : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedCountryInner) {
      let o = "", r = "";
      t && i ? (o = `iti__flag iti__${t}`, r = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`) : (o = "iti__flag iti__globe", r = s.noCountrySelected), this.selectedCountryInner.className = o, this.selectedCountryA11yText.textContent = r;
    }
    if (this._setSelectedCountryTitleAttribute(t, e), e) {
      const o = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
      this.selectedDialCode.innerHTML = o, this._updateInputPadding();
    }
    return this._updatePlaceholder(), this._updateMaxLength(), n.iso2 !== t;
  }
  //* Update the input padding to make space for the selected country/dial code.
  _updateInputPadding() {
    if (this.selectedCountry) {
      const e = (this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth()) + 6;
      this.showSelectedCountryOnLeft ? this.telInput.style.paddingLeft = `${e}px` : this.telInput.style.paddingRight = `${e}px`;
    }
  }
  //* Update the maximum valid number length for the currently selected country.
  _updateMaxLength() {
    const { strictMode: t, placeholderNumberType: e, validationNumberTypes: i } = this.options, { iso2: s } = this.selectedCountryData;
    if (t && u.utils)
      if (s) {
        const n = u.utils.numberType[e];
        let o = u.utils.getExampleNumber(
          s,
          !1,
          n,
          !0
        ), r = o;
        for (; u.utils.isPossibleNumber(o, s, i); )
          r = o, o += "0";
        const a = u.utils.getCoreNumber(r, s);
        this.maxCoreNumberLength = a.length, s === "by" && (this.maxCoreNumberLength = a.length + 1);
      } else
        this.maxCoreNumberLength = null;
  }
  _setSelectedCountryTitleAttribute(t = null, e) {
    if (!this.selectedCountry)
      return;
    let i;
    t && !e ? i = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}` : t ? i = this.selectedCountryData.name : i = "Unknown", this.selectedCountry.setAttribute("title", i);
  }
  //* When the input is in a hidden container during initialisation, we must inject some markup
  //* into the end of the DOM to calculate the correct offsetWidth.
  //* NOTE: this is only used when separateDialCode is enabled, so countryContainer and selectedCountry
  //* will definitely exist.
  _getHiddenSelectedCountryWidth() {
    if (this.telInput.parentNode) {
      const t = this.telInput.parentNode.cloneNode(!1);
      t.style.visibility = "hidden", document.body.appendChild(t);
      const e = this.countryContainer.cloneNode();
      t.appendChild(e);
      const i = this.selectedCountry.cloneNode(!0);
      e.appendChild(i);
      const s = i.offsetWidth;
      return document.body.removeChild(t), s;
    }
    return 0;
  }
  //* Update the input placeholder to an example number from the currently selected country.
  _updatePlaceholder() {
    const {
      autoPlaceholder: t,
      placeholderNumberType: e,
      nationalMode: i,
      customPlaceholder: s
    } = this.options, n = t === "aggressive" || !this.hadInitialPlaceholder && t === "polite";
    if (u.utils && n) {
      const o = u.utils.numberType[e];
      let r = this.selectedCountryData.iso2 ? u.utils.getExampleNumber(
        this.selectedCountryData.iso2,
        i,
        o
      ) : "";
      r = this._beforeSetNumber(r), typeof s == "function" && (r = s(r, this.selectedCountryData)), this.telInput.setAttribute("placeholder", r);
    }
  }
  //* Called when the user selects a list item from the dropdown.
  _selectListItem(t) {
    const e = this._setCountry(
      t.getAttribute("data-country-code")
    );
    this._closeDropdown(), this._updateDialCode(t.getAttribute("data-dial-code")), this.telInput.focus(), e && this._triggerCountryChange();
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
  _scrollTo(t) {
    const e = this.countryList, i = document.documentElement.scrollTop, s = e.offsetHeight, n = e.getBoundingClientRect().top + i, o = n + s, r = t.offsetHeight, a = t.getBoundingClientRect().top + i, c = a + r, y = a - n + e.scrollTop;
    if (a < n)
      e.scrollTop = y;
    else if (c > o) {
      const p = s - r;
      e.scrollTop = y - p;
    }
  }
  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  _updateDialCode(t) {
    const e = this.telInput.value, i = `+${t}`;
    let s;
    if (e.charAt(0) === "+") {
      const n = this._getDialCode(e);
      n ? s = e.replace(n, i) : s = i, this.telInput.value = s;
    }
  }
  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  _getDialCode(t, e) {
    let i = "";
    if (t.charAt(0) === "+") {
      let s = "";
      for (let n = 0; n < t.length; n++) {
        const o = t.charAt(n);
        if (!isNaN(parseInt(o, 10))) {
          if (s += o, e)
            this.dialCodeToIso2Map[s] && (i = t.substr(0, n + 1));
          else if (this.dialCodes[s]) {
            i = t.substr(0, n + 1);
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
  _getFullNumber(t) {
    const e = t || this.telInput.value.trim(), { dialCode: i } = this.selectedCountryData;
    let s;
    const n = v(e);
    return this.options.separateDialCode && e.charAt(0) !== "+" && i && n ? s = `+${i}` : s = "", s + e;
  }
  //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
  _beforeSetNumber(t) {
    let e = t;
    if (this.options.separateDialCode) {
      let i = this._getDialCode(e);
      if (i) {
        i = `+${this.selectedCountryData.dialCode}`;
        const s = e[i.length] === " " || e[i.length] === "-" ? i.length + 1 : i.length;
        e = e.substr(s);
      }
    }
    return this._cap(e);
  }
  //* Trigger the 'countrychange' event.
  _triggerCountryChange() {
    this._trigger("countrychange");
  }
  //* Format the number as the user types.
  _formatNumberAsYouType() {
    const t = this._getFullNumber(), e = u.utils ? u.utils.formatNumberAsYouType(t, this.selectedCountryData.iso2) : t, { dialCode: i } = this.selectedCountryData;
    return this.options.separateDialCode && this.telInput.value.charAt(0) !== "+" && e.includes(`+${i}`) ? (e.split(`+${i}`)[1] || "").trim() : e;
  }
  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************
  //* This is called when the geoip call returns.
  handleAutoCountry() {
    this.options.initialCountry === "auto" && u.autoCountry && (this.defaultCountry = u.autoCountry, this.selectedCountryData.iso2 || this.selectedCountryInner.classList.contains("iti__globe") || this.setCountry(this.defaultCountry), this.resolveAutoCountryPromise());
  }
  //* This is called when the utils request completes.
  handleUtils() {
    u.utils && (this.telInput.value && this._updateValFromNumber(this.telInput.value), this.selectedCountryData.iso2 && (this._updatePlaceholder(), this._updateMaxLength())), this.resolveUtilsScriptPromise();
  }
  //********************
  //*  PUBLIC METHODS
  //********************
  //* Remove plugin.
  destroy() {
    var n, o;
    this.telInput.iti = void 0;
    const { allowDropdown: t, separateDialCode: e } = this.options;
    if (t) {
      this._closeDropdown(), this.selectedCountry.removeEventListener(
        "click",
        this._handleClickSelectedCountry
      ), this.countryContainer.removeEventListener(
        "keydown",
        this._handleCountryContainerKeydown
      );
      const r = this.telInput.closest("label");
      r && r.removeEventListener("click", this._handleLabelClick);
    }
    const { form: i } = this.telInput;
    this._handleHiddenInputSubmit && i && i.removeEventListener("submit", this._handleHiddenInputSubmit), this.telInput.removeEventListener("input", this._handleInputEvent), this._handleKeydownEvent && this.telInput.removeEventListener("keydown", this._handleKeydownEvent), this.telInput.removeAttribute("data-intl-tel-input-id"), e && (this.isRTL ? this.telInput.style.paddingRight = this.originalPaddingRight : this.telInput.style.paddingLeft = this.originalPaddingLeft);
    const s = this.telInput.parentNode;
    (n = s == null ? void 0 : s.parentNode) == null || n.insertBefore(this.telInput, s), (o = s == null ? void 0 : s.parentNode) == null || o.removeChild(s), delete u.instances[this.id];
  }
  //* Get the extension from the current number.
  getExtension() {
    return u.utils ? u.utils.getExtension(
      this._getFullNumber(),
      this.selectedCountryData.iso2
    ) : "";
  }
  //* Format the number to the given format.
  getNumber(t) {
    if (u.utils) {
      const { iso2: e } = this.selectedCountryData;
      return u.utils.formatNumber(
        this._getFullNumber(),
        e,
        t
      );
    }
    return "";
  }
  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType() {
    return u.utils ? u.utils.getNumberType(
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
    if (u.utils) {
      const { iso2: t } = this.selectedCountryData;
      return u.utils.getValidationError(this._getFullNumber(), t);
    }
    return -99;
  }
  //* Validate the input val
  isValidNumber() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const t = this._getFullNumber(), e = t.search(new RegExp("\\p{L}", "u"));
    if (e > -1) {
      const i = t.substring(0, e), s = this._utilsIsPossibleNumber(i), n = this._utilsIsPossibleNumber(t);
      return s && n;
    }
    return this._utilsIsPossibleNumber(t);
  }
  _utilsIsPossibleNumber(t) {
    return u.utils ? u.utils.isPossibleNumber(t, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Validate the input val (precise)
  isValidNumberPrecise() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const t = this._getFullNumber(), e = t.search(new RegExp("\\p{L}", "u"));
    if (e > -1) {
      const i = t.substring(0, e), s = this._utilsIsValidNumber(i), n = this._utilsIsValidNumber(t);
      return s && n;
    }
    return this._utilsIsValidNumber(t);
  }
  _utilsIsValidNumber(t) {
    return u.utils ? u.utils.isValidNumber(t, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Update the selected country, and update the input val accordingly.
  setCountry(t) {
    const e = t == null ? void 0 : t.toLowerCase(), i = this.selectedCountryData.iso2;
    (t && e !== i || !t && i) && (this._setCountry(e), this._updateDialCode(this.selectedCountryData.dialCode), this._triggerCountryChange());
  }
  //* Set the input value and update the country.
  setNumber(t) {
    const e = this._updateCountryFromNumber(t);
    this._updateValFromNumber(t), e && this._triggerCountryChange(), this._trigger("input", { isSetNumber: !0 });
  }
  //* Set the placeholder number typ
  setPlaceholderNumberType(t) {
    this.options.placeholderNumberType = t, this._updatePlaceholder();
  }
  setDisabled(t) {
    this.telInput.disabled = t, t ? this.selectedCountry.setAttribute("disabled", "true") : this.selectedCountry.removeAttribute("disabled");
  }
}
const G = (h) => {
  if (!u.utils && !u.startedLoadingUtilsScript) {
    let t;
    if (typeof h == "function")
      try {
        t = Promise.resolve(h());
      } catch (e) {
        return Promise.reject(e);
      }
    else
      return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof h}`));
    return u.startedLoadingUtilsScript = !0, t.then((e) => {
      const i = e == null ? void 0 : e.default;
      if (!i || typeof i != "object")
        throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
      return u.utils = i, w("handleUtils"), !0;
    }).catch((e) => {
      throw w("rejectUtilsScriptPromise", e), e;
    });
  }
  return null;
}, u = Object.assign(
  (h, t) => {
    const e = new W(h, t);
    return e._init(), h.setAttribute("data-intl-tel-input-id", e.id.toString()), u.instances[e.id] = e, h.iti = e, e;
  },
  {
    defaults: T,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: () => document.readyState === "complete",
    //* Get the country data object.
    getCountryData: () => I,
    //* A getter for the plugin instance.
    getInstance: (h) => {
      const t = h.getAttribute("data-intl-tel-input-id");
      return t ? u.instances[t] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils: G,
    startedLoadingUtilsScript: !1,
    startedLoadingAutoCountry: !1,
    version: "25.5.2"
  }
), Y = {
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
  setup(h, { expose: t, emit: e }) {
    const i = x(h, "modelValue"), s = h, n = e, o = L(), r = L(), a = L(!1), c = () => r.value ? s.options.strictMode ? r.value.isValidNumberPrecise() : r.value.isValidNumber() : null, y = () => {
      let l = c();
      a.value !== l && (a.value = l, n("changeValidity", !!l), n(
        "changeErrorCode",
        l ? null : r.value.getValidationError()
      ));
    }, p = () => {
      var l;
      n("changeNumber", ((l = r.value) == null ? void 0 : l.getNumber()) ?? ""), y();
    }, C = () => {
      var l;
      n("changeCountry", ((l = r.value) == null ? void 0 : l.getSelectedCountryData().iso2) ?? ""), p(), y();
    };
    return E(() => {
      o.value && (r.value = u(o.value, s.options), s.value && r.value.setNumber(s.value), s.disabled && r.value.setDisabled(s.disabled), a.value = c());
    }), M(
      () => s.disabled,
      (l) => {
        var d;
        return (d = r.value) == null ? void 0 : d.setDisabled(l);
      }
    ), F(() => {
      var l;
      return (l = r.value) == null ? void 0 : l.destroy();
    }), t({ instance: r, input: o }), (l, d) => B((z(), V("input", R({
      ref_key: "input",
      ref: o,
      "onUpdate:modelValue": d[0] || (d[0] = (g) => i.value = g),
      type: "tel",
      onCountrychange: C,
      onInput: p
    }, h.inputProps), null, 16)), [
      [
        O,
        i.value,
        void 0,
        { lazy: !0 }
      ]
    ]);
  }
};
export {
  Y as default
};
