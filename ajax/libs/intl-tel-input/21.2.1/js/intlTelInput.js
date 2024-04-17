/*
 * International Telephone Input v21.2.1
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

  // src/js/i18n/en/countries.mjs
  var countries_default = {
    af: "Afghanistan",
    ax: "\xC5land Islands",
    al: "Albania",
    dz: "Algeria",
    as: "American Samoa",
    ad: "Andorra",
    ao: "Angola",
    ai: "Anguilla",
    aq: "Antarctica",
    ag: "Antigua & Barbuda",
    ar: "Argentina",
    am: "Armenia",
    aw: "Aruba",
    au: "Australia",
    at: "Austria",
    az: "Azerbaijan",
    bs: "Bahamas",
    bh: "Bahrain",
    bd: "Bangladesh",
    bb: "Barbados",
    by: "Belarus",
    be: "Belgium",
    bz: "Belize",
    bj: "Benin",
    bm: "Bermuda",
    bt: "Bhutan",
    bo: "Bolivia",
    ba: "Bosnia & Herzegovina",
    bw: "Botswana",
    bv: "Bouvet Island",
    br: "Brazil",
    io: "British Indian Ocean Territory",
    vg: "British Virgin Islands",
    bn: "Brunei",
    bg: "Bulgaria",
    bf: "Burkina Faso",
    bi: "Burundi",
    kh: "Cambodia",
    cm: "Cameroon",
    ca: "Canada",
    cv: "Cape Verde",
    bq: "Caribbean Netherlands",
    ky: "Cayman Islands",
    cf: "Central African Republic",
    td: "Chad",
    cl: "Chile",
    cn: "China",
    cx: "Christmas Island",
    cc: "Cocos (Keeling) Islands",
    co: "Colombia",
    km: "Comoros",
    cg: "Congo - Brazzaville",
    cd: "Congo - Kinshasa",
    ck: "Cook Islands",
    cr: "Costa Rica",
    ci: "C\xF4te d\u2019Ivoire",
    hr: "Croatia",
    cu: "Cuba",
    cw: "Cura\xE7ao",
    cy: "Cyprus",
    cz: "Czechia",
    dk: "Denmark",
    dj: "Djibouti",
    dm: "Dominica",
    do: "Dominican Republic",
    ec: "Ecuador",
    eg: "Egypt",
    sv: "El Salvador",
    gq: "Equatorial Guinea",
    er: "Eritrea",
    ee: "Estonia",
    sz: "Eswatini",
    et: "Ethiopia",
    fk: "Falkland Islands",
    fo: "Faroe Islands",
    fj: "Fiji",
    fi: "Finland",
    fr: "France",
    gf: "French Guiana",
    pf: "French Polynesia",
    tf: "French Southern Territories",
    ga: "Gabon",
    gm: "Gambia",
    ge: "Georgia",
    de: "Germany",
    gh: "Ghana",
    gi: "Gibraltar",
    gr: "Greece",
    gl: "Greenland",
    gd: "Grenada",
    gp: "Guadeloupe",
    gu: "Guam",
    gt: "Guatemala",
    gg: "Guernsey",
    gn: "Guinea",
    gw: "Guinea-Bissau",
    gy: "Guyana",
    ht: "Haiti",
    hm: "Heard & McDonald Islands",
    hn: "Honduras",
    hk: "Hong Kong SAR China",
    hu: "Hungary",
    is: "Iceland",
    in: "India",
    id: "Indonesia",
    ir: "Iran",
    iq: "Iraq",
    ie: "Ireland",
    im: "Isle of Man",
    il: "Israel",
    it: "Italy",
    jm: "Jamaica",
    jp: "Japan",
    je: "Jersey",
    jo: "Jordan",
    kz: "Kazakhstan",
    ke: "Kenya",
    ki: "Kiribati",
    kw: "Kuwait",
    kg: "Kyrgyzstan",
    la: "Laos",
    lv: "Latvia",
    lb: "Lebanon",
    ls: "Lesotho",
    lr: "Liberia",
    ly: "Libya",
    li: "Liechtenstein",
    lt: "Lithuania",
    lu: "Luxembourg",
    mo: "Macao SAR China",
    mg: "Madagascar",
    mw: "Malawi",
    my: "Malaysia",
    mv: "Maldives",
    ml: "Mali",
    mt: "Malta",
    mh: "Marshall Islands",
    mq: "Martinique",
    mr: "Mauritania",
    mu: "Mauritius",
    yt: "Mayotte",
    mx: "Mexico",
    fm: "Micronesia",
    md: "Moldova",
    mc: "Monaco",
    mn: "Mongolia",
    me: "Montenegro",
    ms: "Montserrat",
    ma: "Morocco",
    mz: "Mozambique",
    mm: "Myanmar (Burma)",
    na: "Namibia",
    nr: "Nauru",
    np: "Nepal",
    nl: "Netherlands",
    nc: "New Caledonia",
    nz: "New Zealand",
    ni: "Nicaragua",
    ne: "Niger",
    ng: "Nigeria",
    nu: "Niue",
    nf: "Norfolk Island",
    kp: "North Korea",
    mk: "North Macedonia",
    mp: "Northern Mariana Islands",
    no: "Norway",
    om: "Oman",
    pk: "Pakistan",
    pw: "Palau",
    ps: "Palestinian Territories",
    pa: "Panama",
    pg: "Papua New Guinea",
    py: "Paraguay",
    pe: "Peru",
    ph: "Philippines",
    pn: "Pitcairn Islands",
    pl: "Poland",
    pt: "Portugal",
    pr: "Puerto Rico",
    qa: "Qatar",
    re: "R\xE9union",
    ro: "Romania",
    ru: "Russia",
    rw: "Rwanda",
    ws: "Samoa",
    sm: "San Marino",
    st: "S\xE3o Tom\xE9 & Pr\xEDncipe",
    sa: "Saudi Arabia",
    sn: "Senegal",
    rs: "Serbia",
    sc: "Seychelles",
    sl: "Sierra Leone",
    sg: "Singapore",
    sx: "Sint Maarten",
    sk: "Slovakia",
    si: "Slovenia",
    sb: "Solomon Islands",
    so: "Somalia",
    za: "South Africa",
    gs: "South Georgia & South Sandwich Islands",
    kr: "South Korea",
    ss: "South Sudan",
    es: "Spain",
    lk: "Sri Lanka",
    bl: "St. Barth\xE9lemy",
    sh: "St. Helena",
    kn: "St. Kitts & Nevis",
    lc: "St. Lucia",
    mf: "St. Martin",
    pm: "St. Pierre & Miquelon",
    vc: "St. Vincent & Grenadines",
    sd: "Sudan",
    sr: "Suriname",
    sj: "Svalbard & Jan Mayen",
    se: "Sweden",
    ch: "Switzerland",
    sy: "Syria",
    tw: "Taiwan",
    tj: "Tajikistan",
    tz: "Tanzania",
    th: "Thailand",
    tl: "Timor-Leste",
    tg: "Togo",
    tk: "Tokelau",
    to: "Tonga",
    tt: "Trinidad & Tobago",
    tn: "Tunisia",
    tr: "Turkey",
    tm: "Turkmenistan",
    tc: "Turks & Caicos Islands",
    tv: "Tuvalu",
    um: "U.S. Outlying Islands",
    vi: "U.S. Virgin Islands",
    ug: "Uganda",
    ua: "Ukraine",
    ae: "United Arab Emirates",
    gb: "United Kingdom",
    us: "United States",
    uy: "Uruguay",
    uz: "Uzbekistan",
    vu: "Vanuatu",
    va: "Vatican City",
    ve: "Venezuela",
    vn: "Vietnam",
    wf: "Wallis & Futuna",
    eh: "Western Sahara",
    ye: "Yemen",
    zm: "Zambia",
    zw: "Zimbabwe"
  };

  // src/js/intl-tel-input/data.ts
  var rawCountryData = [
    [
      countries_default["af"],
      "af",
      "93"
    ],
    [
      countries_default["al"],
      "al",
      "355"
    ],
    [
      countries_default["dz"],
      "dz",
      "213"
    ],
    [
      countries_default["as"],
      "as",
      "1",
      5,
      ["684"]
    ],
    [
      countries_default["ad"],
      "ad",
      "376"
    ],
    [
      countries_default["ao"],
      "ao",
      "244"
    ],
    [
      countries_default["ai"],
      "ai",
      "1",
      6,
      ["264"]
    ],
    [
      countries_default["ag"],
      "ag",
      "1",
      7,
      ["268"]
    ],
    [
      countries_default["ar"],
      "ar",
      "54"
    ],
    [
      countries_default["am"],
      "am",
      "374"
    ],
    [
      countries_default["aw"],
      "aw",
      "297"
    ],
    [
      "Ascension Island",
      "ac",
      "247"
    ],
    [
      countries_default["au"],
      "au",
      "61",
      0
    ],
    [
      countries_default["at"],
      "at",
      "43"
    ],
    [
      countries_default["az"],
      "az",
      "994"
    ],
    [
      countries_default["bs"],
      "bs",
      "1",
      8,
      ["242"]
    ],
    [
      countries_default["bh"],
      "bh",
      "973"
    ],
    [
      countries_default["bd"],
      "bd",
      "880"
    ],
    [
      countries_default["bb"],
      "bb",
      "1",
      9,
      ["246"]
    ],
    [
      countries_default["by"],
      "by",
      "375"
    ],
    [
      countries_default["be"],
      "be",
      "32"
    ],
    [
      countries_default["bz"],
      "bz",
      "501"
    ],
    [
      countries_default["bj"],
      "bj",
      "229"
    ],
    [
      countries_default["bm"],
      "bm",
      "1",
      10,
      ["441"]
    ],
    [
      countries_default["bt"],
      "bt",
      "975"
    ],
    [
      countries_default["bo"],
      "bo",
      "591"
    ],
    [
      countries_default["ba"],
      "ba",
      "387"
    ],
    [
      countries_default["bw"],
      "bw",
      "267"
    ],
    [
      countries_default["br"],
      "br",
      "55"
    ],
    [
      countries_default["io"],
      "io",
      "246"
    ],
    [
      countries_default["vg"],
      "vg",
      "1",
      11,
      ["284"]
    ],
    [
      countries_default["bn"],
      "bn",
      "673"
    ],
    [
      countries_default["bg"],
      "bg",
      "359"
    ],
    [
      countries_default["bf"],
      "bf",
      "226"
    ],
    [
      countries_default["bi"],
      "bi",
      "257"
    ],
    [
      countries_default["kh"],
      "kh",
      "855"
    ],
    [
      countries_default["cm"],
      "cm",
      "237"
    ],
    [
      countries_default["ca"],
      "ca",
      "1",
      1,
      ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905"]
    ],
    [
      countries_default["cv"],
      "cv",
      "238"
    ],
    [
      countries_default["bq"],
      "bq",
      "599",
      1,
      ["3", "4", "7"]
    ],
    [
      countries_default["ky"],
      "ky",
      "1",
      12,
      ["345"]
    ],
    [
      countries_default["cf"],
      "cf",
      "236"
    ],
    [
      countries_default["td"],
      "td",
      "235"
    ],
    [
      countries_default["cl"],
      "cl",
      "56"
    ],
    [
      countries_default["cn"],
      "cn",
      "86"
    ],
    [
      countries_default["cx"],
      "cx",
      "61",
      2,
      ["89164"]
    ],
    [
      countries_default["cc"],
      "cc",
      "61",
      1,
      ["89162"]
    ],
    [
      countries_default["co"],
      "co",
      "57"
    ],
    [
      countries_default["km"],
      "km",
      "269"
    ],
    [
      countries_default["cg"],
      "cg",
      "242"
    ],
    [
      countries_default["cd"],
      "cd",
      "243"
    ],
    [
      countries_default["ck"],
      "ck",
      "682"
    ],
    [
      countries_default["cr"],
      "cr",
      "506"
    ],
    [
      countries_default["ci"],
      "ci",
      "225"
    ],
    [
      countries_default["hr"],
      "hr",
      "385"
    ],
    [
      countries_default["cu"],
      "cu",
      "53"
    ],
    [
      countries_default["cw"],
      "cw",
      "599",
      0
    ],
    [
      countries_default["cy"],
      "cy",
      "357"
    ],
    [
      countries_default["cz"],
      "cz",
      "420"
    ],
    [
      countries_default["dk"],
      "dk",
      "45"
    ],
    [
      countries_default["dj"],
      "dj",
      "253"
    ],
    [
      countries_default["dm"],
      "dm",
      "1",
      13,
      ["767"]
    ],
    [
      countries_default["do"],
      "do",
      "1",
      2,
      ["809", "829", "849"]
    ],
    [
      countries_default["ec"],
      "ec",
      "593"
    ],
    [
      countries_default["eg"],
      "eg",
      "20"
    ],
    [
      countries_default["sv"],
      "sv",
      "503"
    ],
    [
      countries_default["gq"],
      "gq",
      "240"
    ],
    [
      countries_default["er"],
      "er",
      "291"
    ],
    [
      countries_default["ee"],
      "ee",
      "372"
    ],
    [
      countries_default["sz"],
      "sz",
      "268"
    ],
    [
      countries_default["et"],
      "et",
      "251"
    ],
    [
      countries_default["fk"],
      "fk",
      "500"
    ],
    [
      countries_default["fo"],
      "fo",
      "298"
    ],
    [
      countries_default["fj"],
      "fj",
      "679"
    ],
    [
      countries_default["fi"],
      "fi",
      "358",
      0
    ],
    [
      countries_default["fr"],
      "fr",
      "33"
    ],
    [
      countries_default["gf"],
      "gf",
      "594"
    ],
    [
      countries_default["pf"],
      "pf",
      "689"
    ],
    [
      countries_default["ga"],
      "ga",
      "241"
    ],
    [
      countries_default["gm"],
      "gm",
      "220"
    ],
    [
      countries_default["ge"],
      "ge",
      "995"
    ],
    [
      countries_default["de"],
      "de",
      "49"
    ],
    [
      countries_default["gh"],
      "gh",
      "233"
    ],
    [
      countries_default["gi"],
      "gi",
      "350"
    ],
    [
      countries_default["gr"],
      "gr",
      "30"
    ],
    [
      countries_default["gl"],
      "gl",
      "299"
    ],
    [
      countries_default["gd"],
      "gd",
      "1",
      14,
      ["473"]
    ],
    [
      countries_default["gp"],
      "gp",
      "590",
      0
    ],
    [
      countries_default["gu"],
      "gu",
      "1",
      15,
      ["671"]
    ],
    [
      countries_default["gt"],
      "gt",
      "502"
    ],
    [
      countries_default["gg"],
      "gg",
      "44",
      1,
      ["1481", "7781", "7839", "7911"]
    ],
    [
      countries_default["gn"],
      "gn",
      "224"
    ],
    [
      countries_default["gw"],
      "gw",
      "245"
    ],
    [
      countries_default["gy"],
      "gy",
      "592"
    ],
    [
      countries_default["ht"],
      "ht",
      "509"
    ],
    [
      countries_default["hn"],
      "hn",
      "504"
    ],
    [
      countries_default["hk"],
      "hk",
      "852"
    ],
    [
      countries_default["hu"],
      "hu",
      "36"
    ],
    [
      countries_default["is"],
      "is",
      "354"
    ],
    [
      countries_default["in"],
      "in",
      "91"
    ],
    [
      countries_default["id"],
      "id",
      "62"
    ],
    [
      countries_default["ir"],
      "ir",
      "98"
    ],
    [
      countries_default["iq"],
      "iq",
      "964"
    ],
    [
      countries_default["ie"],
      "ie",
      "353"
    ],
    [
      countries_default["im"],
      "im",
      "44",
      2,
      ["1624", "74576", "7524", "7924", "7624"]
    ],
    [
      countries_default["il"],
      "il",
      "972"
    ],
    [
      countries_default["it"],
      "it",
      "39",
      0
    ],
    [
      countries_default["jm"],
      "jm",
      "1",
      4,
      ["876", "658"]
    ],
    [
      countries_default["jp"],
      "jp",
      "81"
    ],
    [
      countries_default["je"],
      "je",
      "44",
      3,
      ["1534", "7509", "7700", "7797", "7829", "7937"]
    ],
    [
      countries_default["jo"],
      "jo",
      "962"
    ],
    [
      countries_default["kz"],
      "kz",
      "7",
      1,
      ["33", "7"]
    ],
    [
      countries_default["ke"],
      "ke",
      "254"
    ],
    [
      countries_default["ki"],
      "ki",
      "686"
    ],
    [
      "Kosovo",
      "xk",
      "383"
    ],
    [
      countries_default["kw"],
      "kw",
      "965"
    ],
    [
      countries_default["kg"],
      "kg",
      "996"
    ],
    [
      countries_default["la"],
      "la",
      "856"
    ],
    [
      countries_default["lv"],
      "lv",
      "371"
    ],
    [
      countries_default["lb"],
      "lb",
      "961"
    ],
    [
      countries_default["ls"],
      "ls",
      "266"
    ],
    [
      countries_default["lr"],
      "lr",
      "231"
    ],
    [
      countries_default["ly"],
      "ly",
      "218"
    ],
    [
      countries_default["li"],
      "li",
      "423"
    ],
    [
      countries_default["lt"],
      "lt",
      "370"
    ],
    [
      countries_default["lu"],
      "lu",
      "352"
    ],
    [
      countries_default["mo"],
      "mo",
      "853"
    ],
    [
      countries_default["mg"],
      "mg",
      "261"
    ],
    [
      countries_default["mw"],
      "mw",
      "265"
    ],
    [
      countries_default["my"],
      "my",
      "60"
    ],
    [
      countries_default["mv"],
      "mv",
      "960"
    ],
    [
      countries_default["ml"],
      "ml",
      "223"
    ],
    [
      countries_default["mt"],
      "mt",
      "356"
    ],
    [
      countries_default["mh"],
      "mh",
      "692"
    ],
    [
      countries_default["mq"],
      "mq",
      "596"
    ],
    [
      countries_default["mr"],
      "mr",
      "222"
    ],
    [
      countries_default["mu"],
      "mu",
      "230"
    ],
    [
      countries_default["yt"],
      "yt",
      "262",
      1,
      ["269", "639"]
    ],
    [
      countries_default["mx"],
      "mx",
      "52"
    ],
    [
      countries_default["fm"],
      "fm",
      "691"
    ],
    [
      countries_default["md"],
      "md",
      "373"
    ],
    [
      countries_default["mc"],
      "mc",
      "377"
    ],
    [
      countries_default["mn"],
      "mn",
      "976"
    ],
    [
      countries_default["me"],
      "me",
      "382"
    ],
    [
      countries_default["ms"],
      "ms",
      "1",
      16,
      ["664"]
    ],
    [
      countries_default["ma"],
      "ma",
      "212",
      0
    ],
    [
      countries_default["mz"],
      "mz",
      "258"
    ],
    [
      countries_default["mm"],
      "mm",
      "95"
    ],
    [
      countries_default["na"],
      "na",
      "264"
    ],
    [
      countries_default["nr"],
      "nr",
      "674"
    ],
    [
      countries_default["np"],
      "np",
      "977"
    ],
    [
      countries_default["nl"],
      "nl",
      "31"
    ],
    [
      countries_default["nc"],
      "nc",
      "687"
    ],
    [
      countries_default["nz"],
      "nz",
      "64"
    ],
    [
      countries_default["ni"],
      "ni",
      "505"
    ],
    [
      countries_default["ne"],
      "ne",
      "227"
    ],
    [
      countries_default["ng"],
      "ng",
      "234"
    ],
    [
      countries_default["nu"],
      "nu",
      "683"
    ],
    [
      countries_default["nf"],
      "nf",
      "672"
    ],
    [
      countries_default["kp"],
      "kp",
      "850"
    ],
    [
      countries_default["mk"],
      "mk",
      "389"
    ],
    [
      countries_default["mp"],
      "mp",
      "1",
      17,
      ["670"]
    ],
    [
      countries_default["no"],
      "no",
      "47",
      0
    ],
    [
      countries_default["om"],
      "om",
      "968"
    ],
    [
      countries_default["pk"],
      "pk",
      "92"
    ],
    [
      countries_default["pw"],
      "pw",
      "680"
    ],
    [
      countries_default["ps"],
      "ps",
      "970"
    ],
    [
      countries_default["pa"],
      "pa",
      "507"
    ],
    [
      countries_default["pg"],
      "pg",
      "675"
    ],
    [
      countries_default["py"],
      "py",
      "595"
    ],
    [
      countries_default["pe"],
      "pe",
      "51"
    ],
    [
      countries_default["ph"],
      "ph",
      "63"
    ],
    [
      countries_default["pl"],
      "pl",
      "48"
    ],
    [
      countries_default["pt"],
      "pt",
      "351"
    ],
    [
      countries_default["pr"],
      "pr",
      "1",
      3,
      ["787", "939"]
    ],
    [
      countries_default["qa"],
      "qa",
      "974"
    ],
    [
      countries_default["re"],
      "re",
      "262",
      0
    ],
    [
      countries_default["ro"],
      "ro",
      "40"
    ],
    [
      countries_default["ru"],
      "ru",
      "7",
      0
    ],
    [
      countries_default["rw"],
      "rw",
      "250"
    ],
    [
      countries_default["ws"],
      "ws",
      "685"
    ],
    [
      countries_default["sm"],
      "sm",
      "378"
    ],
    [
      countries_default["st"],
      "st",
      "239"
    ],
    [
      countries_default["sa"],
      "sa",
      "966"
    ],
    [
      countries_default["sn"],
      "sn",
      "221"
    ],
    [
      countries_default["rs"],
      "rs",
      "381"
    ],
    [
      countries_default["sc"],
      "sc",
      "248"
    ],
    [
      countries_default["sl"],
      "sl",
      "232"
    ],
    [
      countries_default["sg"],
      "sg",
      "65"
    ],
    [
      countries_default["sx"],
      "sx",
      "1",
      21,
      ["721"]
    ],
    [
      countries_default["sk"],
      "sk",
      "421"
    ],
    [
      countries_default["si"],
      "si",
      "386"
    ],
    [
      countries_default["sb"],
      "sb",
      "677"
    ],
    [
      countries_default["so"],
      "so",
      "252"
    ],
    [
      countries_default["za"],
      "za",
      "27"
    ],
    [
      countries_default["kr"],
      "kr",
      "82"
    ],
    [
      countries_default["ss"],
      "ss",
      "211"
    ],
    [
      countries_default["es"],
      "es",
      "34"
    ],
    [
      countries_default["lk"],
      "lk",
      "94"
    ],
    [
      countries_default["bl"],
      "bl",
      "590",
      1
    ],
    [
      countries_default["sh"],
      "sh",
      "290"
    ],
    [
      countries_default["kn"],
      "kn",
      "1",
      18,
      ["869"]
    ],
    [
      countries_default["lc"],
      "lc",
      "1",
      19,
      ["758"]
    ],
    [
      countries_default["mf"],
      "mf",
      "590",
      2
    ],
    [
      countries_default["pm"],
      "pm",
      "508"
    ],
    [
      countries_default["vc"],
      "vc",
      "1",
      20,
      ["784"]
    ],
    [
      countries_default["sd"],
      "sd",
      "249"
    ],
    [
      countries_default["sr"],
      "sr",
      "597"
    ],
    [
      countries_default["sj"],
      "sj",
      "47",
      1,
      ["79"]
    ],
    [
      countries_default["se"],
      "se",
      "46"
    ],
    [
      countries_default["ch"],
      "ch",
      "41"
    ],
    [
      countries_default["sy"],
      "sy",
      "963"
    ],
    [
      countries_default["tw"],
      "tw",
      "886"
    ],
    [
      countries_default["tj"],
      "tj",
      "992"
    ],
    [
      countries_default["tz"],
      "tz",
      "255"
    ],
    [
      countries_default["th"],
      "th",
      "66"
    ],
    [
      countries_default["tl"],
      "tl",
      "670"
    ],
    [
      countries_default["tg"],
      "tg",
      "228"
    ],
    [
      countries_default["tk"],
      "tk",
      "690"
    ],
    [
      countries_default["to"],
      "to",
      "676"
    ],
    [
      countries_default["tt"],
      "tt",
      "1",
      22,
      ["868"]
    ],
    [
      countries_default["tn"],
      "tn",
      "216"
    ],
    [
      countries_default["tr"],
      "tr",
      "90"
    ],
    [
      countries_default["tm"],
      "tm",
      "993"
    ],
    [
      countries_default["tc"],
      "tc",
      "1",
      23,
      ["649"]
    ],
    [
      countries_default["tv"],
      "tv",
      "688"
    ],
    [
      countries_default["ug"],
      "ug",
      "256"
    ],
    [
      countries_default["ua"],
      "ua",
      "380"
    ],
    [
      countries_default["ae"],
      "ae",
      "971"
    ],
    [
      countries_default["gb"],
      "gb",
      "44",
      0
    ],
    [
      countries_default["us"],
      "us",
      "1",
      0
    ],
    [
      countries_default["uy"],
      "uy",
      "598"
    ],
    [
      countries_default["vi"],
      "vi",
      "1",
      24,
      ["340"]
    ],
    [
      countries_default["uz"],
      "uz",
      "998"
    ],
    [
      countries_default["vu"],
      "vu",
      "678"
    ],
    [
      countries_default["va"],
      "va",
      "39",
      1,
      ["06698"]
    ],
    [
      countries_default["ve"],
      "ve",
      "58"
    ],
    [
      countries_default["vn"],
      "vn",
      "84"
    ],
    [
      countries_default["wf"],
      "wf",
      "681"
    ],
    [
      countries_default["eh"],
      "eh",
      "212",
      1,
      ["5288", "5289"]
    ],
    [
      countries_default["ye"],
      "ye",
      "967"
    ],
    [
      countries_default["zm"],
      "zm",
      "260"
    ],
    [
      countries_default["zw"],
      "zw",
      "263"
    ],
    [
      countries_default["ax"],
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

  // src/js/i18n/en/interface.mjs
  var interface_default = {
    selectedCountryAriaLabel: "Selected country",
    noCountrySelected: "No country selected",
    countryListAriaLabel: "List of countries",
    searchPlaceholder: "Search",
    zeroSearchResults: "No results found",
    oneSearchResult: "1 result found",
    multipleSearchResults: "${count} results found"
  };

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
      this.options.i18n = { ...interface_default, ...this.options.i18n };
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
              "aria-label": this.options.i18n.selectedCountryAriaLabel,
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
          a11yText = i18n.noCountrySelected;
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
      version: "21.2.1"
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
