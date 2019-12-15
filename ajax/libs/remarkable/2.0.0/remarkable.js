(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.remarkable = {}));
}(this, function (exports) { 'use strict';

  // List of valid entities
  //
  // Generate with ./support/entities.js script
  //

  /*eslint quotes:0*/
  var entities = {
    "Aacute":"\u00C1",
    "aacute":"\u00E1",
    "Abreve":"\u0102",
    "abreve":"\u0103",
    "ac":"\u223E",
    "acd":"\u223F",
    "acE":"\u223E\u0333",
    "Acirc":"\u00C2",
    "acirc":"\u00E2",
    "acute":"\u00B4",
    "Acy":"\u0410",
    "acy":"\u0430",
    "AElig":"\u00C6",
    "aelig":"\u00E6",
    "af":"\u2061",
    "Afr":"\uD835\uDD04",
    "afr":"\uD835\uDD1E",
    "Agrave":"\u00C0",
    "agrave":"\u00E0",
    "alefsym":"\u2135",
    "aleph":"\u2135",
    "Alpha":"\u0391",
    "alpha":"\u03B1",
    "Amacr":"\u0100",
    "amacr":"\u0101",
    "amalg":"\u2A3F",
    "AMP":"\u0026",
    "amp":"\u0026",
    "And":"\u2A53",
    "and":"\u2227",
    "andand":"\u2A55",
    "andd":"\u2A5C",
    "andslope":"\u2A58",
    "andv":"\u2A5A",
    "ang":"\u2220",
    "ange":"\u29A4",
    "angle":"\u2220",
    "angmsd":"\u2221",
    "angmsdaa":"\u29A8",
    "angmsdab":"\u29A9",
    "angmsdac":"\u29AA",
    "angmsdad":"\u29AB",
    "angmsdae":"\u29AC",
    "angmsdaf":"\u29AD",
    "angmsdag":"\u29AE",
    "angmsdah":"\u29AF",
    "angrt":"\u221F",
    "angrtvb":"\u22BE",
    "angrtvbd":"\u299D",
    "angsph":"\u2222",
    "angst":"\u00C5",
    "angzarr":"\u237C",
    "Aogon":"\u0104",
    "aogon":"\u0105",
    "Aopf":"\uD835\uDD38",
    "aopf":"\uD835\uDD52",
    "ap":"\u2248",
    "apacir":"\u2A6F",
    "apE":"\u2A70",
    "ape":"\u224A",
    "apid":"\u224B",
    "apos":"\u0027",
    "ApplyFunction":"\u2061",
    "approx":"\u2248",
    "approxeq":"\u224A",
    "Aring":"\u00C5",
    "aring":"\u00E5",
    "Ascr":"\uD835\uDC9C",
    "ascr":"\uD835\uDCB6",
    "Assign":"\u2254",
    "ast":"\u002A",
    "asymp":"\u2248",
    "asympeq":"\u224D",
    "Atilde":"\u00C3",
    "atilde":"\u00E3",
    "Auml":"\u00C4",
    "auml":"\u00E4",
    "awconint":"\u2233",
    "awint":"\u2A11",
    "backcong":"\u224C",
    "backepsilon":"\u03F6",
    "backprime":"\u2035",
    "backsim":"\u223D",
    "backsimeq":"\u22CD",
    "Backslash":"\u2216",
    "Barv":"\u2AE7",
    "barvee":"\u22BD",
    "Barwed":"\u2306",
    "barwed":"\u2305",
    "barwedge":"\u2305",
    "bbrk":"\u23B5",
    "bbrktbrk":"\u23B6",
    "bcong":"\u224C",
    "Bcy":"\u0411",
    "bcy":"\u0431",
    "bdquo":"\u201E",
    "becaus":"\u2235",
    "Because":"\u2235",
    "because":"\u2235",
    "bemptyv":"\u29B0",
    "bepsi":"\u03F6",
    "bernou":"\u212C",
    "Bernoullis":"\u212C",
    "Beta":"\u0392",
    "beta":"\u03B2",
    "beth":"\u2136",
    "between":"\u226C",
    "Bfr":"\uD835\uDD05",
    "bfr":"\uD835\uDD1F",
    "bigcap":"\u22C2",
    "bigcirc":"\u25EF",
    "bigcup":"\u22C3",
    "bigodot":"\u2A00",
    "bigoplus":"\u2A01",
    "bigotimes":"\u2A02",
    "bigsqcup":"\u2A06",
    "bigstar":"\u2605",
    "bigtriangledown":"\u25BD",
    "bigtriangleup":"\u25B3",
    "biguplus":"\u2A04",
    "bigvee":"\u22C1",
    "bigwedge":"\u22C0",
    "bkarow":"\u290D",
    "blacklozenge":"\u29EB",
    "blacksquare":"\u25AA",
    "blacktriangle":"\u25B4",
    "blacktriangledown":"\u25BE",
    "blacktriangleleft":"\u25C2",
    "blacktriangleright":"\u25B8",
    "blank":"\u2423",
    "blk12":"\u2592",
    "blk14":"\u2591",
    "blk34":"\u2593",
    "block":"\u2588",
    "bne":"\u003D\u20E5",
    "bnequiv":"\u2261\u20E5",
    "bNot":"\u2AED",
    "bnot":"\u2310",
    "Bopf":"\uD835\uDD39",
    "bopf":"\uD835\uDD53",
    "bot":"\u22A5",
    "bottom":"\u22A5",
    "bowtie":"\u22C8",
    "boxbox":"\u29C9",
    "boxDL":"\u2557",
    "boxDl":"\u2556",
    "boxdL":"\u2555",
    "boxdl":"\u2510",
    "boxDR":"\u2554",
    "boxDr":"\u2553",
    "boxdR":"\u2552",
    "boxdr":"\u250C",
    "boxH":"\u2550",
    "boxh":"\u2500",
    "boxHD":"\u2566",
    "boxHd":"\u2564",
    "boxhD":"\u2565",
    "boxhd":"\u252C",
    "boxHU":"\u2569",
    "boxHu":"\u2567",
    "boxhU":"\u2568",
    "boxhu":"\u2534",
    "boxminus":"\u229F",
    "boxplus":"\u229E",
    "boxtimes":"\u22A0",
    "boxUL":"\u255D",
    "boxUl":"\u255C",
    "boxuL":"\u255B",
    "boxul":"\u2518",
    "boxUR":"\u255A",
    "boxUr":"\u2559",
    "boxuR":"\u2558",
    "boxur":"\u2514",
    "boxV":"\u2551",
    "boxv":"\u2502",
    "boxVH":"\u256C",
    "boxVh":"\u256B",
    "boxvH":"\u256A",
    "boxvh":"\u253C",
    "boxVL":"\u2563",
    "boxVl":"\u2562",
    "boxvL":"\u2561",
    "boxvl":"\u2524",
    "boxVR":"\u2560",
    "boxVr":"\u255F",
    "boxvR":"\u255E",
    "boxvr":"\u251C",
    "bprime":"\u2035",
    "Breve":"\u02D8",
    "breve":"\u02D8",
    "brvbar":"\u00A6",
    "Bscr":"\u212C",
    "bscr":"\uD835\uDCB7",
    "bsemi":"\u204F",
    "bsim":"\u223D",
    "bsime":"\u22CD",
    "bsol":"\u005C",
    "bsolb":"\u29C5",
    "bsolhsub":"\u27C8",
    "bull":"\u2022",
    "bullet":"\u2022",
    "bump":"\u224E",
    "bumpE":"\u2AAE",
    "bumpe":"\u224F",
    "Bumpeq":"\u224E",
    "bumpeq":"\u224F",
    "Cacute":"\u0106",
    "cacute":"\u0107",
    "Cap":"\u22D2",
    "cap":"\u2229",
    "capand":"\u2A44",
    "capbrcup":"\u2A49",
    "capcap":"\u2A4B",
    "capcup":"\u2A47",
    "capdot":"\u2A40",
    "CapitalDifferentialD":"\u2145",
    "caps":"\u2229\uFE00",
    "caret":"\u2041",
    "caron":"\u02C7",
    "Cayleys":"\u212D",
    "ccaps":"\u2A4D",
    "Ccaron":"\u010C",
    "ccaron":"\u010D",
    "Ccedil":"\u00C7",
    "ccedil":"\u00E7",
    "Ccirc":"\u0108",
    "ccirc":"\u0109",
    "Cconint":"\u2230",
    "ccups":"\u2A4C",
    "ccupssm":"\u2A50",
    "Cdot":"\u010A",
    "cdot":"\u010B",
    "cedil":"\u00B8",
    "Cedilla":"\u00B8",
    "cemptyv":"\u29B2",
    "cent":"\u00A2",
    "CenterDot":"\u00B7",
    "centerdot":"\u00B7",
    "Cfr":"\u212D",
    "cfr":"\uD835\uDD20",
    "CHcy":"\u0427",
    "chcy":"\u0447",
    "check":"\u2713",
    "checkmark":"\u2713",
    "Chi":"\u03A7",
    "chi":"\u03C7",
    "cir":"\u25CB",
    "circ":"\u02C6",
    "circeq":"\u2257",
    "circlearrowleft":"\u21BA",
    "circlearrowright":"\u21BB",
    "circledast":"\u229B",
    "circledcirc":"\u229A",
    "circleddash":"\u229D",
    "CircleDot":"\u2299",
    "circledR":"\u00AE",
    "circledS":"\u24C8",
    "CircleMinus":"\u2296",
    "CirclePlus":"\u2295",
    "CircleTimes":"\u2297",
    "cirE":"\u29C3",
    "cire":"\u2257",
    "cirfnint":"\u2A10",
    "cirmid":"\u2AEF",
    "cirscir":"\u29C2",
    "ClockwiseContourIntegral":"\u2232",
    "CloseCurlyDoubleQuote":"\u201D",
    "CloseCurlyQuote":"\u2019",
    "clubs":"\u2663",
    "clubsuit":"\u2663",
    "Colon":"\u2237",
    "colon":"\u003A",
    "Colone":"\u2A74",
    "colone":"\u2254",
    "coloneq":"\u2254",
    "comma":"\u002C",
    "commat":"\u0040",
    "comp":"\u2201",
    "compfn":"\u2218",
    "complement":"\u2201",
    "complexes":"\u2102",
    "cong":"\u2245",
    "congdot":"\u2A6D",
    "Congruent":"\u2261",
    "Conint":"\u222F",
    "conint":"\u222E",
    "ContourIntegral":"\u222E",
    "Copf":"\u2102",
    "copf":"\uD835\uDD54",
    "coprod":"\u2210",
    "Coproduct":"\u2210",
    "COPY":"\u00A9",
    "copy":"\u00A9",
    "copysr":"\u2117",
    "CounterClockwiseContourIntegral":"\u2233",
    "crarr":"\u21B5",
    "Cross":"\u2A2F",
    "cross":"\u2717",
    "Cscr":"\uD835\uDC9E",
    "cscr":"\uD835\uDCB8",
    "csub":"\u2ACF",
    "csube":"\u2AD1",
    "csup":"\u2AD0",
    "csupe":"\u2AD2",
    "ctdot":"\u22EF",
    "cudarrl":"\u2938",
    "cudarrr":"\u2935",
    "cuepr":"\u22DE",
    "cuesc":"\u22DF",
    "cularr":"\u21B6",
    "cularrp":"\u293D",
    "Cup":"\u22D3",
    "cup":"\u222A",
    "cupbrcap":"\u2A48",
    "CupCap":"\u224D",
    "cupcap":"\u2A46",
    "cupcup":"\u2A4A",
    "cupdot":"\u228D",
    "cupor":"\u2A45",
    "cups":"\u222A\uFE00",
    "curarr":"\u21B7",
    "curarrm":"\u293C",
    "curlyeqprec":"\u22DE",
    "curlyeqsucc":"\u22DF",
    "curlyvee":"\u22CE",
    "curlywedge":"\u22CF",
    "curren":"\u00A4",
    "curvearrowleft":"\u21B6",
    "curvearrowright":"\u21B7",
    "cuvee":"\u22CE",
    "cuwed":"\u22CF",
    "cwconint":"\u2232",
    "cwint":"\u2231",
    "cylcty":"\u232D",
    "Dagger":"\u2021",
    "dagger":"\u2020",
    "daleth":"\u2138",
    "Darr":"\u21A1",
    "dArr":"\u21D3",
    "darr":"\u2193",
    "dash":"\u2010",
    "Dashv":"\u2AE4",
    "dashv":"\u22A3",
    "dbkarow":"\u290F",
    "dblac":"\u02DD",
    "Dcaron":"\u010E",
    "dcaron":"\u010F",
    "Dcy":"\u0414",
    "dcy":"\u0434",
    "DD":"\u2145",
    "dd":"\u2146",
    "ddagger":"\u2021",
    "ddarr":"\u21CA",
    "DDotrahd":"\u2911",
    "ddotseq":"\u2A77",
    "deg":"\u00B0",
    "Del":"\u2207",
    "Delta":"\u0394",
    "delta":"\u03B4",
    "demptyv":"\u29B1",
    "dfisht":"\u297F",
    "Dfr":"\uD835\uDD07",
    "dfr":"\uD835\uDD21",
    "dHar":"\u2965",
    "dharl":"\u21C3",
    "dharr":"\u21C2",
    "DiacriticalAcute":"\u00B4",
    "DiacriticalDot":"\u02D9",
    "DiacriticalDoubleAcute":"\u02DD",
    "DiacriticalGrave":"\u0060",
    "DiacriticalTilde":"\u02DC",
    "diam":"\u22C4",
    "Diamond":"\u22C4",
    "diamond":"\u22C4",
    "diamondsuit":"\u2666",
    "diams":"\u2666",
    "die":"\u00A8",
    "DifferentialD":"\u2146",
    "digamma":"\u03DD",
    "disin":"\u22F2",
    "div":"\u00F7",
    "divide":"\u00F7",
    "divideontimes":"\u22C7",
    "divonx":"\u22C7",
    "DJcy":"\u0402",
    "djcy":"\u0452",
    "dlcorn":"\u231E",
    "dlcrop":"\u230D",
    "dollar":"\u0024",
    "Dopf":"\uD835\uDD3B",
    "dopf":"\uD835\uDD55",
    "Dot":"\u00A8",
    "dot":"\u02D9",
    "DotDot":"\u20DC",
    "doteq":"\u2250",
    "doteqdot":"\u2251",
    "DotEqual":"\u2250",
    "dotminus":"\u2238",
    "dotplus":"\u2214",
    "dotsquare":"\u22A1",
    "doublebarwedge":"\u2306",
    "DoubleContourIntegral":"\u222F",
    "DoubleDot":"\u00A8",
    "DoubleDownArrow":"\u21D3",
    "DoubleLeftArrow":"\u21D0",
    "DoubleLeftRightArrow":"\u21D4",
    "DoubleLeftTee":"\u2AE4",
    "DoubleLongLeftArrow":"\u27F8",
    "DoubleLongLeftRightArrow":"\u27FA",
    "DoubleLongRightArrow":"\u27F9",
    "DoubleRightArrow":"\u21D2",
    "DoubleRightTee":"\u22A8",
    "DoubleUpArrow":"\u21D1",
    "DoubleUpDownArrow":"\u21D5",
    "DoubleVerticalBar":"\u2225",
    "DownArrow":"\u2193",
    "Downarrow":"\u21D3",
    "downarrow":"\u2193",
    "DownArrowBar":"\u2913",
    "DownArrowUpArrow":"\u21F5",
    "DownBreve":"\u0311",
    "downdownarrows":"\u21CA",
    "downharpoonleft":"\u21C3",
    "downharpoonright":"\u21C2",
    "DownLeftRightVector":"\u2950",
    "DownLeftTeeVector":"\u295E",
    "DownLeftVector":"\u21BD",
    "DownLeftVectorBar":"\u2956",
    "DownRightTeeVector":"\u295F",
    "DownRightVector":"\u21C1",
    "DownRightVectorBar":"\u2957",
    "DownTee":"\u22A4",
    "DownTeeArrow":"\u21A7",
    "drbkarow":"\u2910",
    "drcorn":"\u231F",
    "drcrop":"\u230C",
    "Dscr":"\uD835\uDC9F",
    "dscr":"\uD835\uDCB9",
    "DScy":"\u0405",
    "dscy":"\u0455",
    "dsol":"\u29F6",
    "Dstrok":"\u0110",
    "dstrok":"\u0111",
    "dtdot":"\u22F1",
    "dtri":"\u25BF",
    "dtrif":"\u25BE",
    "duarr":"\u21F5",
    "duhar":"\u296F",
    "dwangle":"\u29A6",
    "DZcy":"\u040F",
    "dzcy":"\u045F",
    "dzigrarr":"\u27FF",
    "Eacute":"\u00C9",
    "eacute":"\u00E9",
    "easter":"\u2A6E",
    "Ecaron":"\u011A",
    "ecaron":"\u011B",
    "ecir":"\u2256",
    "Ecirc":"\u00CA",
    "ecirc":"\u00EA",
    "ecolon":"\u2255",
    "Ecy":"\u042D",
    "ecy":"\u044D",
    "eDDot":"\u2A77",
    "Edot":"\u0116",
    "eDot":"\u2251",
    "edot":"\u0117",
    "ee":"\u2147",
    "efDot":"\u2252",
    "Efr":"\uD835\uDD08",
    "efr":"\uD835\uDD22",
    "eg":"\u2A9A",
    "Egrave":"\u00C8",
    "egrave":"\u00E8",
    "egs":"\u2A96",
    "egsdot":"\u2A98",
    "el":"\u2A99",
    "Element":"\u2208",
    "elinters":"\u23E7",
    "ell":"\u2113",
    "els":"\u2A95",
    "elsdot":"\u2A97",
    "Emacr":"\u0112",
    "emacr":"\u0113",
    "empty":"\u2205",
    "emptyset":"\u2205",
    "EmptySmallSquare":"\u25FB",
    "emptyv":"\u2205",
    "EmptyVerySmallSquare":"\u25AB",
    "emsp":"\u2003",
    "emsp13":"\u2004",
    "emsp14":"\u2005",
    "ENG":"\u014A",
    "eng":"\u014B",
    "ensp":"\u2002",
    "Eogon":"\u0118",
    "eogon":"\u0119",
    "Eopf":"\uD835\uDD3C",
    "eopf":"\uD835\uDD56",
    "epar":"\u22D5",
    "eparsl":"\u29E3",
    "eplus":"\u2A71",
    "epsi":"\u03B5",
    "Epsilon":"\u0395",
    "epsilon":"\u03B5",
    "epsiv":"\u03F5",
    "eqcirc":"\u2256",
    "eqcolon":"\u2255",
    "eqsim":"\u2242",
    "eqslantgtr":"\u2A96",
    "eqslantless":"\u2A95",
    "Equal":"\u2A75",
    "equals":"\u003D",
    "EqualTilde":"\u2242",
    "equest":"\u225F",
    "Equilibrium":"\u21CC",
    "equiv":"\u2261",
    "equivDD":"\u2A78",
    "eqvparsl":"\u29E5",
    "erarr":"\u2971",
    "erDot":"\u2253",
    "Escr":"\u2130",
    "escr":"\u212F",
    "esdot":"\u2250",
    "Esim":"\u2A73",
    "esim":"\u2242",
    "Eta":"\u0397",
    "eta":"\u03B7",
    "ETH":"\u00D0",
    "eth":"\u00F0",
    "Euml":"\u00CB",
    "euml":"\u00EB",
    "euro":"\u20AC",
    "excl":"\u0021",
    "exist":"\u2203",
    "Exists":"\u2203",
    "expectation":"\u2130",
    "ExponentialE":"\u2147",
    "exponentiale":"\u2147",
    "fallingdotseq":"\u2252",
    "Fcy":"\u0424",
    "fcy":"\u0444",
    "female":"\u2640",
    "ffilig":"\uFB03",
    "fflig":"\uFB00",
    "ffllig":"\uFB04",
    "Ffr":"\uD835\uDD09",
    "ffr":"\uD835\uDD23",
    "filig":"\uFB01",
    "FilledSmallSquare":"\u25FC",
    "FilledVerySmallSquare":"\u25AA",
    "fjlig":"\u0066\u006A",
    "flat":"\u266D",
    "fllig":"\uFB02",
    "fltns":"\u25B1",
    "fnof":"\u0192",
    "Fopf":"\uD835\uDD3D",
    "fopf":"\uD835\uDD57",
    "ForAll":"\u2200",
    "forall":"\u2200",
    "fork":"\u22D4",
    "forkv":"\u2AD9",
    "Fouriertrf":"\u2131",
    "fpartint":"\u2A0D",
    "frac12":"\u00BD",
    "frac13":"\u2153",
    "frac14":"\u00BC",
    "frac15":"\u2155",
    "frac16":"\u2159",
    "frac18":"\u215B",
    "frac23":"\u2154",
    "frac25":"\u2156",
    "frac34":"\u00BE",
    "frac35":"\u2157",
    "frac38":"\u215C",
    "frac45":"\u2158",
    "frac56":"\u215A",
    "frac58":"\u215D",
    "frac78":"\u215E",
    "frasl":"\u2044",
    "frown":"\u2322",
    "Fscr":"\u2131",
    "fscr":"\uD835\uDCBB",
    "gacute":"\u01F5",
    "Gamma":"\u0393",
    "gamma":"\u03B3",
    "Gammad":"\u03DC",
    "gammad":"\u03DD",
    "gap":"\u2A86",
    "Gbreve":"\u011E",
    "gbreve":"\u011F",
    "Gcedil":"\u0122",
    "Gcirc":"\u011C",
    "gcirc":"\u011D",
    "Gcy":"\u0413",
    "gcy":"\u0433",
    "Gdot":"\u0120",
    "gdot":"\u0121",
    "gE":"\u2267",
    "ge":"\u2265",
    "gEl":"\u2A8C",
    "gel":"\u22DB",
    "geq":"\u2265",
    "geqq":"\u2267",
    "geqslant":"\u2A7E",
    "ges":"\u2A7E",
    "gescc":"\u2AA9",
    "gesdot":"\u2A80",
    "gesdoto":"\u2A82",
    "gesdotol":"\u2A84",
    "gesl":"\u22DB\uFE00",
    "gesles":"\u2A94",
    "Gfr":"\uD835\uDD0A",
    "gfr":"\uD835\uDD24",
    "Gg":"\u22D9",
    "gg":"\u226B",
    "ggg":"\u22D9",
    "gimel":"\u2137",
    "GJcy":"\u0403",
    "gjcy":"\u0453",
    "gl":"\u2277",
    "gla":"\u2AA5",
    "glE":"\u2A92",
    "glj":"\u2AA4",
    "gnap":"\u2A8A",
    "gnapprox":"\u2A8A",
    "gnE":"\u2269",
    "gne":"\u2A88",
    "gneq":"\u2A88",
    "gneqq":"\u2269",
    "gnsim":"\u22E7",
    "Gopf":"\uD835\uDD3E",
    "gopf":"\uD835\uDD58",
    "grave":"\u0060",
    "GreaterEqual":"\u2265",
    "GreaterEqualLess":"\u22DB",
    "GreaterFullEqual":"\u2267",
    "GreaterGreater":"\u2AA2",
    "GreaterLess":"\u2277",
    "GreaterSlantEqual":"\u2A7E",
    "GreaterTilde":"\u2273",
    "Gscr":"\uD835\uDCA2",
    "gscr":"\u210A",
    "gsim":"\u2273",
    "gsime":"\u2A8E",
    "gsiml":"\u2A90",
    "GT":"\u003E",
    "Gt":"\u226B",
    "gt":"\u003E",
    "gtcc":"\u2AA7",
    "gtcir":"\u2A7A",
    "gtdot":"\u22D7",
    "gtlPar":"\u2995",
    "gtquest":"\u2A7C",
    "gtrapprox":"\u2A86",
    "gtrarr":"\u2978",
    "gtrdot":"\u22D7",
    "gtreqless":"\u22DB",
    "gtreqqless":"\u2A8C",
    "gtrless":"\u2277",
    "gtrsim":"\u2273",
    "gvertneqq":"\u2269\uFE00",
    "gvnE":"\u2269\uFE00",
    "Hacek":"\u02C7",
    "hairsp":"\u200A",
    "half":"\u00BD",
    "hamilt":"\u210B",
    "HARDcy":"\u042A",
    "hardcy":"\u044A",
    "hArr":"\u21D4",
    "harr":"\u2194",
    "harrcir":"\u2948",
    "harrw":"\u21AD",
    "Hat":"\u005E",
    "hbar":"\u210F",
    "Hcirc":"\u0124",
    "hcirc":"\u0125",
    "hearts":"\u2665",
    "heartsuit":"\u2665",
    "hellip":"\u2026",
    "hercon":"\u22B9",
    "Hfr":"\u210C",
    "hfr":"\uD835\uDD25",
    "HilbertSpace":"\u210B",
    "hksearow":"\u2925",
    "hkswarow":"\u2926",
    "hoarr":"\u21FF",
    "homtht":"\u223B",
    "hookleftarrow":"\u21A9",
    "hookrightarrow":"\u21AA",
    "Hopf":"\u210D",
    "hopf":"\uD835\uDD59",
    "horbar":"\u2015",
    "HorizontalLine":"\u2500",
    "Hscr":"\u210B",
    "hscr":"\uD835\uDCBD",
    "hslash":"\u210F",
    "Hstrok":"\u0126",
    "hstrok":"\u0127",
    "HumpDownHump":"\u224E",
    "HumpEqual":"\u224F",
    "hybull":"\u2043",
    "hyphen":"\u2010",
    "Iacute":"\u00CD",
    "iacute":"\u00ED",
    "ic":"\u2063",
    "Icirc":"\u00CE",
    "icirc":"\u00EE",
    "Icy":"\u0418",
    "icy":"\u0438",
    "Idot":"\u0130",
    "IEcy":"\u0415",
    "iecy":"\u0435",
    "iexcl":"\u00A1",
    "iff":"\u21D4",
    "Ifr":"\u2111",
    "ifr":"\uD835\uDD26",
    "Igrave":"\u00CC",
    "igrave":"\u00EC",
    "ii":"\u2148",
    "iiiint":"\u2A0C",
    "iiint":"\u222D",
    "iinfin":"\u29DC",
    "iiota":"\u2129",
    "IJlig":"\u0132",
    "ijlig":"\u0133",
    "Im":"\u2111",
    "Imacr":"\u012A",
    "imacr":"\u012B",
    "image":"\u2111",
    "ImaginaryI":"\u2148",
    "imagline":"\u2110",
    "imagpart":"\u2111",
    "imath":"\u0131",
    "imof":"\u22B7",
    "imped":"\u01B5",
    "Implies":"\u21D2",
    "in":"\u2208",
    "incare":"\u2105",
    "infin":"\u221E",
    "infintie":"\u29DD",
    "inodot":"\u0131",
    "Int":"\u222C",
    "int":"\u222B",
    "intcal":"\u22BA",
    "integers":"\u2124",
    "Integral":"\u222B",
    "intercal":"\u22BA",
    "Intersection":"\u22C2",
    "intlarhk":"\u2A17",
    "intprod":"\u2A3C",
    "InvisibleComma":"\u2063",
    "InvisibleTimes":"\u2062",
    "IOcy":"\u0401",
    "iocy":"\u0451",
    "Iogon":"\u012E",
    "iogon":"\u012F",
    "Iopf":"\uD835\uDD40",
    "iopf":"\uD835\uDD5A",
    "Iota":"\u0399",
    "iota":"\u03B9",
    "iprod":"\u2A3C",
    "iquest":"\u00BF",
    "Iscr":"\u2110",
    "iscr":"\uD835\uDCBE",
    "isin":"\u2208",
    "isindot":"\u22F5",
    "isinE":"\u22F9",
    "isins":"\u22F4",
    "isinsv":"\u22F3",
    "isinv":"\u2208",
    "it":"\u2062",
    "Itilde":"\u0128",
    "itilde":"\u0129",
    "Iukcy":"\u0406",
    "iukcy":"\u0456",
    "Iuml":"\u00CF",
    "iuml":"\u00EF",
    "Jcirc":"\u0134",
    "jcirc":"\u0135",
    "Jcy":"\u0419",
    "jcy":"\u0439",
    "Jfr":"\uD835\uDD0D",
    "jfr":"\uD835\uDD27",
    "jmath":"\u0237",
    "Jopf":"\uD835\uDD41",
    "jopf":"\uD835\uDD5B",
    "Jscr":"\uD835\uDCA5",
    "jscr":"\uD835\uDCBF",
    "Jsercy":"\u0408",
    "jsercy":"\u0458",
    "Jukcy":"\u0404",
    "jukcy":"\u0454",
    "Kappa":"\u039A",
    "kappa":"\u03BA",
    "kappav":"\u03F0",
    "Kcedil":"\u0136",
    "kcedil":"\u0137",
    "Kcy":"\u041A",
    "kcy":"\u043A",
    "Kfr":"\uD835\uDD0E",
    "kfr":"\uD835\uDD28",
    "kgreen":"\u0138",
    "KHcy":"\u0425",
    "khcy":"\u0445",
    "KJcy":"\u040C",
    "kjcy":"\u045C",
    "Kopf":"\uD835\uDD42",
    "kopf":"\uD835\uDD5C",
    "Kscr":"\uD835\uDCA6",
    "kscr":"\uD835\uDCC0",
    "lAarr":"\u21DA",
    "Lacute":"\u0139",
    "lacute":"\u013A",
    "laemptyv":"\u29B4",
    "lagran":"\u2112",
    "Lambda":"\u039B",
    "lambda":"\u03BB",
    "Lang":"\u27EA",
    "lang":"\u27E8",
    "langd":"\u2991",
    "langle":"\u27E8",
    "lap":"\u2A85",
    "Laplacetrf":"\u2112",
    "laquo":"\u00AB",
    "Larr":"\u219E",
    "lArr":"\u21D0",
    "larr":"\u2190",
    "larrb":"\u21E4",
    "larrbfs":"\u291F",
    "larrfs":"\u291D",
    "larrhk":"\u21A9",
    "larrlp":"\u21AB",
    "larrpl":"\u2939",
    "larrsim":"\u2973",
    "larrtl":"\u21A2",
    "lat":"\u2AAB",
    "lAtail":"\u291B",
    "latail":"\u2919",
    "late":"\u2AAD",
    "lates":"\u2AAD\uFE00",
    "lBarr":"\u290E",
    "lbarr":"\u290C",
    "lbbrk":"\u2772",
    "lbrace":"\u007B",
    "lbrack":"\u005B",
    "lbrke":"\u298B",
    "lbrksld":"\u298F",
    "lbrkslu":"\u298D",
    "Lcaron":"\u013D",
    "lcaron":"\u013E",
    "Lcedil":"\u013B",
    "lcedil":"\u013C",
    "lceil":"\u2308",
    "lcub":"\u007B",
    "Lcy":"\u041B",
    "lcy":"\u043B",
    "ldca":"\u2936",
    "ldquo":"\u201C",
    "ldquor":"\u201E",
    "ldrdhar":"\u2967",
    "ldrushar":"\u294B",
    "ldsh":"\u21B2",
    "lE":"\u2266",
    "le":"\u2264",
    "LeftAngleBracket":"\u27E8",
    "LeftArrow":"\u2190",
    "Leftarrow":"\u21D0",
    "leftarrow":"\u2190",
    "LeftArrowBar":"\u21E4",
    "LeftArrowRightArrow":"\u21C6",
    "leftarrowtail":"\u21A2",
    "LeftCeiling":"\u2308",
    "LeftDoubleBracket":"\u27E6",
    "LeftDownTeeVector":"\u2961",
    "LeftDownVector":"\u21C3",
    "LeftDownVectorBar":"\u2959",
    "LeftFloor":"\u230A",
    "leftharpoondown":"\u21BD",
    "leftharpoonup":"\u21BC",
    "leftleftarrows":"\u21C7",
    "LeftRightArrow":"\u2194",
    "Leftrightarrow":"\u21D4",
    "leftrightarrow":"\u2194",
    "leftrightarrows":"\u21C6",
    "leftrightharpoons":"\u21CB",
    "leftrightsquigarrow":"\u21AD",
    "LeftRightVector":"\u294E",
    "LeftTee":"\u22A3",
    "LeftTeeArrow":"\u21A4",
    "LeftTeeVector":"\u295A",
    "leftthreetimes":"\u22CB",
    "LeftTriangle":"\u22B2",
    "LeftTriangleBar":"\u29CF",
    "LeftTriangleEqual":"\u22B4",
    "LeftUpDownVector":"\u2951",
    "LeftUpTeeVector":"\u2960",
    "LeftUpVector":"\u21BF",
    "LeftUpVectorBar":"\u2958",
    "LeftVector":"\u21BC",
    "LeftVectorBar":"\u2952",
    "lEg":"\u2A8B",
    "leg":"\u22DA",
    "leq":"\u2264",
    "leqq":"\u2266",
    "leqslant":"\u2A7D",
    "les":"\u2A7D",
    "lescc":"\u2AA8",
    "lesdot":"\u2A7F",
    "lesdoto":"\u2A81",
    "lesdotor":"\u2A83",
    "lesg":"\u22DA\uFE00",
    "lesges":"\u2A93",
    "lessapprox":"\u2A85",
    "lessdot":"\u22D6",
    "lesseqgtr":"\u22DA",
    "lesseqqgtr":"\u2A8B",
    "LessEqualGreater":"\u22DA",
    "LessFullEqual":"\u2266",
    "LessGreater":"\u2276",
    "lessgtr":"\u2276",
    "LessLess":"\u2AA1",
    "lesssim":"\u2272",
    "LessSlantEqual":"\u2A7D",
    "LessTilde":"\u2272",
    "lfisht":"\u297C",
    "lfloor":"\u230A",
    "Lfr":"\uD835\uDD0F",
    "lfr":"\uD835\uDD29",
    "lg":"\u2276",
    "lgE":"\u2A91",
    "lHar":"\u2962",
    "lhard":"\u21BD",
    "lharu":"\u21BC",
    "lharul":"\u296A",
    "lhblk":"\u2584",
    "LJcy":"\u0409",
    "ljcy":"\u0459",
    "Ll":"\u22D8",
    "ll":"\u226A",
    "llarr":"\u21C7",
    "llcorner":"\u231E",
    "Lleftarrow":"\u21DA",
    "llhard":"\u296B",
    "lltri":"\u25FA",
    "Lmidot":"\u013F",
    "lmidot":"\u0140",
    "lmoust":"\u23B0",
    "lmoustache":"\u23B0",
    "lnap":"\u2A89",
    "lnapprox":"\u2A89",
    "lnE":"\u2268",
    "lne":"\u2A87",
    "lneq":"\u2A87",
    "lneqq":"\u2268",
    "lnsim":"\u22E6",
    "loang":"\u27EC",
    "loarr":"\u21FD",
    "lobrk":"\u27E6",
    "LongLeftArrow":"\u27F5",
    "Longleftarrow":"\u27F8",
    "longleftarrow":"\u27F5",
    "LongLeftRightArrow":"\u27F7",
    "Longleftrightarrow":"\u27FA",
    "longleftrightarrow":"\u27F7",
    "longmapsto":"\u27FC",
    "LongRightArrow":"\u27F6",
    "Longrightarrow":"\u27F9",
    "longrightarrow":"\u27F6",
    "looparrowleft":"\u21AB",
    "looparrowright":"\u21AC",
    "lopar":"\u2985",
    "Lopf":"\uD835\uDD43",
    "lopf":"\uD835\uDD5D",
    "loplus":"\u2A2D",
    "lotimes":"\u2A34",
    "lowast":"\u2217",
    "lowbar":"\u005F",
    "LowerLeftArrow":"\u2199",
    "LowerRightArrow":"\u2198",
    "loz":"\u25CA",
    "lozenge":"\u25CA",
    "lozf":"\u29EB",
    "lpar":"\u0028",
    "lparlt":"\u2993",
    "lrarr":"\u21C6",
    "lrcorner":"\u231F",
    "lrhar":"\u21CB",
    "lrhard":"\u296D",
    "lrm":"\u200E",
    "lrtri":"\u22BF",
    "lsaquo":"\u2039",
    "Lscr":"\u2112",
    "lscr":"\uD835\uDCC1",
    "Lsh":"\u21B0",
    "lsh":"\u21B0",
    "lsim":"\u2272",
    "lsime":"\u2A8D",
    "lsimg":"\u2A8F",
    "lsqb":"\u005B",
    "lsquo":"\u2018",
    "lsquor":"\u201A",
    "Lstrok":"\u0141",
    "lstrok":"\u0142",
    "LT":"\u003C",
    "Lt":"\u226A",
    "lt":"\u003C",
    "ltcc":"\u2AA6",
    "ltcir":"\u2A79",
    "ltdot":"\u22D6",
    "lthree":"\u22CB",
    "ltimes":"\u22C9",
    "ltlarr":"\u2976",
    "ltquest":"\u2A7B",
    "ltri":"\u25C3",
    "ltrie":"\u22B4",
    "ltrif":"\u25C2",
    "ltrPar":"\u2996",
    "lurdshar":"\u294A",
    "luruhar":"\u2966",
    "lvertneqq":"\u2268\uFE00",
    "lvnE":"\u2268\uFE00",
    "macr":"\u00AF",
    "male":"\u2642",
    "malt":"\u2720",
    "maltese":"\u2720",
    "Map":"\u2905",
    "map":"\u21A6",
    "mapsto":"\u21A6",
    "mapstodown":"\u21A7",
    "mapstoleft":"\u21A4",
    "mapstoup":"\u21A5",
    "marker":"\u25AE",
    "mcomma":"\u2A29",
    "Mcy":"\u041C",
    "mcy":"\u043C",
    "mdash":"\u2014",
    "mDDot":"\u223A",
    "measuredangle":"\u2221",
    "MediumSpace":"\u205F",
    "Mellintrf":"\u2133",
    "Mfr":"\uD835\uDD10",
    "mfr":"\uD835\uDD2A",
    "mho":"\u2127",
    "micro":"\u00B5",
    "mid":"\u2223",
    "midast":"\u002A",
    "midcir":"\u2AF0",
    "middot":"\u00B7",
    "minus":"\u2212",
    "minusb":"\u229F",
    "minusd":"\u2238",
    "minusdu":"\u2A2A",
    "MinusPlus":"\u2213",
    "mlcp":"\u2ADB",
    "mldr":"\u2026",
    "mnplus":"\u2213",
    "models":"\u22A7",
    "Mopf":"\uD835\uDD44",
    "mopf":"\uD835\uDD5E",
    "mp":"\u2213",
    "Mscr":"\u2133",
    "mscr":"\uD835\uDCC2",
    "mstpos":"\u223E",
    "Mu":"\u039C",
    "mu":"\u03BC",
    "multimap":"\u22B8",
    "mumap":"\u22B8",
    "nabla":"\u2207",
    "Nacute":"\u0143",
    "nacute":"\u0144",
    "nang":"\u2220\u20D2",
    "nap":"\u2249",
    "napE":"\u2A70\u0338",
    "napid":"\u224B\u0338",
    "napos":"\u0149",
    "napprox":"\u2249",
    "natur":"\u266E",
    "natural":"\u266E",
    "naturals":"\u2115",
    "nbsp":"\u00A0",
    "nbump":"\u224E\u0338",
    "nbumpe":"\u224F\u0338",
    "ncap":"\u2A43",
    "Ncaron":"\u0147",
    "ncaron":"\u0148",
    "Ncedil":"\u0145",
    "ncedil":"\u0146",
    "ncong":"\u2247",
    "ncongdot":"\u2A6D\u0338",
    "ncup":"\u2A42",
    "Ncy":"\u041D",
    "ncy":"\u043D",
    "ndash":"\u2013",
    "ne":"\u2260",
    "nearhk":"\u2924",
    "neArr":"\u21D7",
    "nearr":"\u2197",
    "nearrow":"\u2197",
    "nedot":"\u2250\u0338",
    "NegativeMediumSpace":"\u200B",
    "NegativeThickSpace":"\u200B",
    "NegativeThinSpace":"\u200B",
    "NegativeVeryThinSpace":"\u200B",
    "nequiv":"\u2262",
    "nesear":"\u2928",
    "nesim":"\u2242\u0338",
    "NestedGreaterGreater":"\u226B",
    "NestedLessLess":"\u226A",
    "NewLine":"\u000A",
    "nexist":"\u2204",
    "nexists":"\u2204",
    "Nfr":"\uD835\uDD11",
    "nfr":"\uD835\uDD2B",
    "ngE":"\u2267\u0338",
    "nge":"\u2271",
    "ngeq":"\u2271",
    "ngeqq":"\u2267\u0338",
    "ngeqslant":"\u2A7E\u0338",
    "nges":"\u2A7E\u0338",
    "nGg":"\u22D9\u0338",
    "ngsim":"\u2275",
    "nGt":"\u226B\u20D2",
    "ngt":"\u226F",
    "ngtr":"\u226F",
    "nGtv":"\u226B\u0338",
    "nhArr":"\u21CE",
    "nharr":"\u21AE",
    "nhpar":"\u2AF2",
    "ni":"\u220B",
    "nis":"\u22FC",
    "nisd":"\u22FA",
    "niv":"\u220B",
    "NJcy":"\u040A",
    "njcy":"\u045A",
    "nlArr":"\u21CD",
    "nlarr":"\u219A",
    "nldr":"\u2025",
    "nlE":"\u2266\u0338",
    "nle":"\u2270",
    "nLeftarrow":"\u21CD",
    "nleftarrow":"\u219A",
    "nLeftrightarrow":"\u21CE",
    "nleftrightarrow":"\u21AE",
    "nleq":"\u2270",
    "nleqq":"\u2266\u0338",
    "nleqslant":"\u2A7D\u0338",
    "nles":"\u2A7D\u0338",
    "nless":"\u226E",
    "nLl":"\u22D8\u0338",
    "nlsim":"\u2274",
    "nLt":"\u226A\u20D2",
    "nlt":"\u226E",
    "nltri":"\u22EA",
    "nltrie":"\u22EC",
    "nLtv":"\u226A\u0338",
    "nmid":"\u2224",
    "NoBreak":"\u2060",
    "NonBreakingSpace":"\u00A0",
    "Nopf":"\u2115",
    "nopf":"\uD835\uDD5F",
    "Not":"\u2AEC",
    "not":"\u00AC",
    "NotCongruent":"\u2262",
    "NotCupCap":"\u226D",
    "NotDoubleVerticalBar":"\u2226",
    "NotElement":"\u2209",
    "NotEqual":"\u2260",
    "NotEqualTilde":"\u2242\u0338",
    "NotExists":"\u2204",
    "NotGreater":"\u226F",
    "NotGreaterEqual":"\u2271",
    "NotGreaterFullEqual":"\u2267\u0338",
    "NotGreaterGreater":"\u226B\u0338",
    "NotGreaterLess":"\u2279",
    "NotGreaterSlantEqual":"\u2A7E\u0338",
    "NotGreaterTilde":"\u2275",
    "NotHumpDownHump":"\u224E\u0338",
    "NotHumpEqual":"\u224F\u0338",
    "notin":"\u2209",
    "notindot":"\u22F5\u0338",
    "notinE":"\u22F9\u0338",
    "notinva":"\u2209",
    "notinvb":"\u22F7",
    "notinvc":"\u22F6",
    "NotLeftTriangle":"\u22EA",
    "NotLeftTriangleBar":"\u29CF\u0338",
    "NotLeftTriangleEqual":"\u22EC",
    "NotLess":"\u226E",
    "NotLessEqual":"\u2270",
    "NotLessGreater":"\u2278",
    "NotLessLess":"\u226A\u0338",
    "NotLessSlantEqual":"\u2A7D\u0338",
    "NotLessTilde":"\u2274",
    "NotNestedGreaterGreater":"\u2AA2\u0338",
    "NotNestedLessLess":"\u2AA1\u0338",
    "notni":"\u220C",
    "notniva":"\u220C",
    "notnivb":"\u22FE",
    "notnivc":"\u22FD",
    "NotPrecedes":"\u2280",
    "NotPrecedesEqual":"\u2AAF\u0338",
    "NotPrecedesSlantEqual":"\u22E0",
    "NotReverseElement":"\u220C",
    "NotRightTriangle":"\u22EB",
    "NotRightTriangleBar":"\u29D0\u0338",
    "NotRightTriangleEqual":"\u22ED",
    "NotSquareSubset":"\u228F\u0338",
    "NotSquareSubsetEqual":"\u22E2",
    "NotSquareSuperset":"\u2290\u0338",
    "NotSquareSupersetEqual":"\u22E3",
    "NotSubset":"\u2282\u20D2",
    "NotSubsetEqual":"\u2288",
    "NotSucceeds":"\u2281",
    "NotSucceedsEqual":"\u2AB0\u0338",
    "NotSucceedsSlantEqual":"\u22E1",
    "NotSucceedsTilde":"\u227F\u0338",
    "NotSuperset":"\u2283\u20D2",
    "NotSupersetEqual":"\u2289",
    "NotTilde":"\u2241",
    "NotTildeEqual":"\u2244",
    "NotTildeFullEqual":"\u2247",
    "NotTildeTilde":"\u2249",
    "NotVerticalBar":"\u2224",
    "npar":"\u2226",
    "nparallel":"\u2226",
    "nparsl":"\u2AFD\u20E5",
    "npart":"\u2202\u0338",
    "npolint":"\u2A14",
    "npr":"\u2280",
    "nprcue":"\u22E0",
    "npre":"\u2AAF\u0338",
    "nprec":"\u2280",
    "npreceq":"\u2AAF\u0338",
    "nrArr":"\u21CF",
    "nrarr":"\u219B",
    "nrarrc":"\u2933\u0338",
    "nrarrw":"\u219D\u0338",
    "nRightarrow":"\u21CF",
    "nrightarrow":"\u219B",
    "nrtri":"\u22EB",
    "nrtrie":"\u22ED",
    "nsc":"\u2281",
    "nsccue":"\u22E1",
    "nsce":"\u2AB0\u0338",
    "Nscr":"\uD835\uDCA9",
    "nscr":"\uD835\uDCC3",
    "nshortmid":"\u2224",
    "nshortparallel":"\u2226",
    "nsim":"\u2241",
    "nsime":"\u2244",
    "nsimeq":"\u2244",
    "nsmid":"\u2224",
    "nspar":"\u2226",
    "nsqsube":"\u22E2",
    "nsqsupe":"\u22E3",
    "nsub":"\u2284",
    "nsubE":"\u2AC5\u0338",
    "nsube":"\u2288",
    "nsubset":"\u2282\u20D2",
    "nsubseteq":"\u2288",
    "nsubseteqq":"\u2AC5\u0338",
    "nsucc":"\u2281",
    "nsucceq":"\u2AB0\u0338",
    "nsup":"\u2285",
    "nsupE":"\u2AC6\u0338",
    "nsupe":"\u2289",
    "nsupset":"\u2283\u20D2",
    "nsupseteq":"\u2289",
    "nsupseteqq":"\u2AC6\u0338",
    "ntgl":"\u2279",
    "Ntilde":"\u00D1",
    "ntilde":"\u00F1",
    "ntlg":"\u2278",
    "ntriangleleft":"\u22EA",
    "ntrianglelefteq":"\u22EC",
    "ntriangleright":"\u22EB",
    "ntrianglerighteq":"\u22ED",
    "Nu":"\u039D",
    "nu":"\u03BD",
    "num":"\u0023",
    "numero":"\u2116",
    "numsp":"\u2007",
    "nvap":"\u224D\u20D2",
    "nVDash":"\u22AF",
    "nVdash":"\u22AE",
    "nvDash":"\u22AD",
    "nvdash":"\u22AC",
    "nvge":"\u2265\u20D2",
    "nvgt":"\u003E\u20D2",
    "nvHarr":"\u2904",
    "nvinfin":"\u29DE",
    "nvlArr":"\u2902",
    "nvle":"\u2264\u20D2",
    "nvlt":"\u003C\u20D2",
    "nvltrie":"\u22B4\u20D2",
    "nvrArr":"\u2903",
    "nvrtrie":"\u22B5\u20D2",
    "nvsim":"\u223C\u20D2",
    "nwarhk":"\u2923",
    "nwArr":"\u21D6",
    "nwarr":"\u2196",
    "nwarrow":"\u2196",
    "nwnear":"\u2927",
    "Oacute":"\u00D3",
    "oacute":"\u00F3",
    "oast":"\u229B",
    "ocir":"\u229A",
    "Ocirc":"\u00D4",
    "ocirc":"\u00F4",
    "Ocy":"\u041E",
    "ocy":"\u043E",
    "odash":"\u229D",
    "Odblac":"\u0150",
    "odblac":"\u0151",
    "odiv":"\u2A38",
    "odot":"\u2299",
    "odsold":"\u29BC",
    "OElig":"\u0152",
    "oelig":"\u0153",
    "ofcir":"\u29BF",
    "Ofr":"\uD835\uDD12",
    "ofr":"\uD835\uDD2C",
    "ogon":"\u02DB",
    "Ograve":"\u00D2",
    "ograve":"\u00F2",
    "ogt":"\u29C1",
    "ohbar":"\u29B5",
    "ohm":"\u03A9",
    "oint":"\u222E",
    "olarr":"\u21BA",
    "olcir":"\u29BE",
    "olcross":"\u29BB",
    "oline":"\u203E",
    "olt":"\u29C0",
    "Omacr":"\u014C",
    "omacr":"\u014D",
    "Omega":"\u03A9",
    "omega":"\u03C9",
    "Omicron":"\u039F",
    "omicron":"\u03BF",
    "omid":"\u29B6",
    "ominus":"\u2296",
    "Oopf":"\uD835\uDD46",
    "oopf":"\uD835\uDD60",
    "opar":"\u29B7",
    "OpenCurlyDoubleQuote":"\u201C",
    "OpenCurlyQuote":"\u2018",
    "operp":"\u29B9",
    "oplus":"\u2295",
    "Or":"\u2A54",
    "or":"\u2228",
    "orarr":"\u21BB",
    "ord":"\u2A5D",
    "order":"\u2134",
    "orderof":"\u2134",
    "ordf":"\u00AA",
    "ordm":"\u00BA",
    "origof":"\u22B6",
    "oror":"\u2A56",
    "orslope":"\u2A57",
    "orv":"\u2A5B",
    "oS":"\u24C8",
    "Oscr":"\uD835\uDCAA",
    "oscr":"\u2134",
    "Oslash":"\u00D8",
    "oslash":"\u00F8",
    "osol":"\u2298",
    "Otilde":"\u00D5",
    "otilde":"\u00F5",
    "Otimes":"\u2A37",
    "otimes":"\u2297",
    "otimesas":"\u2A36",
    "Ouml":"\u00D6",
    "ouml":"\u00F6",
    "ovbar":"\u233D",
    "OverBar":"\u203E",
    "OverBrace":"\u23DE",
    "OverBracket":"\u23B4",
    "OverParenthesis":"\u23DC",
    "par":"\u2225",
    "para":"\u00B6",
    "parallel":"\u2225",
    "parsim":"\u2AF3",
    "parsl":"\u2AFD",
    "part":"\u2202",
    "PartialD":"\u2202",
    "Pcy":"\u041F",
    "pcy":"\u043F",
    "percnt":"\u0025",
    "period":"\u002E",
    "permil":"\u2030",
    "perp":"\u22A5",
    "pertenk":"\u2031",
    "Pfr":"\uD835\uDD13",
    "pfr":"\uD835\uDD2D",
    "Phi":"\u03A6",
    "phi":"\u03C6",
    "phiv":"\u03D5",
    "phmmat":"\u2133",
    "phone":"\u260E",
    "Pi":"\u03A0",
    "pi":"\u03C0",
    "pitchfork":"\u22D4",
    "piv":"\u03D6",
    "planck":"\u210F",
    "planckh":"\u210E",
    "plankv":"\u210F",
    "plus":"\u002B",
    "plusacir":"\u2A23",
    "plusb":"\u229E",
    "pluscir":"\u2A22",
    "plusdo":"\u2214",
    "plusdu":"\u2A25",
    "pluse":"\u2A72",
    "PlusMinus":"\u00B1",
    "plusmn":"\u00B1",
    "plussim":"\u2A26",
    "plustwo":"\u2A27",
    "pm":"\u00B1",
    "Poincareplane":"\u210C",
    "pointint":"\u2A15",
    "Popf":"\u2119",
    "popf":"\uD835\uDD61",
    "pound":"\u00A3",
    "Pr":"\u2ABB",
    "pr":"\u227A",
    "prap":"\u2AB7",
    "prcue":"\u227C",
    "prE":"\u2AB3",
    "pre":"\u2AAF",
    "prec":"\u227A",
    "precapprox":"\u2AB7",
    "preccurlyeq":"\u227C",
    "Precedes":"\u227A",
    "PrecedesEqual":"\u2AAF",
    "PrecedesSlantEqual":"\u227C",
    "PrecedesTilde":"\u227E",
    "preceq":"\u2AAF",
    "precnapprox":"\u2AB9",
    "precneqq":"\u2AB5",
    "precnsim":"\u22E8",
    "precsim":"\u227E",
    "Prime":"\u2033",
    "prime":"\u2032",
    "primes":"\u2119",
    "prnap":"\u2AB9",
    "prnE":"\u2AB5",
    "prnsim":"\u22E8",
    "prod":"\u220F",
    "Product":"\u220F",
    "profalar":"\u232E",
    "profline":"\u2312",
    "profsurf":"\u2313",
    "prop":"\u221D",
    "Proportion":"\u2237",
    "Proportional":"\u221D",
    "propto":"\u221D",
    "prsim":"\u227E",
    "prurel":"\u22B0",
    "Pscr":"\uD835\uDCAB",
    "pscr":"\uD835\uDCC5",
    "Psi":"\u03A8",
    "psi":"\u03C8",
    "puncsp":"\u2008",
    "Qfr":"\uD835\uDD14",
    "qfr":"\uD835\uDD2E",
    "qint":"\u2A0C",
    "Qopf":"\u211A",
    "qopf":"\uD835\uDD62",
    "qprime":"\u2057",
    "Qscr":"\uD835\uDCAC",
    "qscr":"\uD835\uDCC6",
    "quaternions":"\u210D",
    "quatint":"\u2A16",
    "quest":"\u003F",
    "questeq":"\u225F",
    "QUOT":"\u0022",
    "quot":"\u0022",
    "rAarr":"\u21DB",
    "race":"\u223D\u0331",
    "Racute":"\u0154",
    "racute":"\u0155",
    "radic":"\u221A",
    "raemptyv":"\u29B3",
    "Rang":"\u27EB",
    "rang":"\u27E9",
    "rangd":"\u2992",
    "range":"\u29A5",
    "rangle":"\u27E9",
    "raquo":"\u00BB",
    "Rarr":"\u21A0",
    "rArr":"\u21D2",
    "rarr":"\u2192",
    "rarrap":"\u2975",
    "rarrb":"\u21E5",
    "rarrbfs":"\u2920",
    "rarrc":"\u2933",
    "rarrfs":"\u291E",
    "rarrhk":"\u21AA",
    "rarrlp":"\u21AC",
    "rarrpl":"\u2945",
    "rarrsim":"\u2974",
    "Rarrtl":"\u2916",
    "rarrtl":"\u21A3",
    "rarrw":"\u219D",
    "rAtail":"\u291C",
    "ratail":"\u291A",
    "ratio":"\u2236",
    "rationals":"\u211A",
    "RBarr":"\u2910",
    "rBarr":"\u290F",
    "rbarr":"\u290D",
    "rbbrk":"\u2773",
    "rbrace":"\u007D",
    "rbrack":"\u005D",
    "rbrke":"\u298C",
    "rbrksld":"\u298E",
    "rbrkslu":"\u2990",
    "Rcaron":"\u0158",
    "rcaron":"\u0159",
    "Rcedil":"\u0156",
    "rcedil":"\u0157",
    "rceil":"\u2309",
    "rcub":"\u007D",
    "Rcy":"\u0420",
    "rcy":"\u0440",
    "rdca":"\u2937",
    "rdldhar":"\u2969",
    "rdquo":"\u201D",
    "rdquor":"\u201D",
    "rdsh":"\u21B3",
    "Re":"\u211C",
    "real":"\u211C",
    "realine":"\u211B",
    "realpart":"\u211C",
    "reals":"\u211D",
    "rect":"\u25AD",
    "REG":"\u00AE",
    "reg":"\u00AE",
    "ReverseElement":"\u220B",
    "ReverseEquilibrium":"\u21CB",
    "ReverseUpEquilibrium":"\u296F",
    "rfisht":"\u297D",
    "rfloor":"\u230B",
    "Rfr":"\u211C",
    "rfr":"\uD835\uDD2F",
    "rHar":"\u2964",
    "rhard":"\u21C1",
    "rharu":"\u21C0",
    "rharul":"\u296C",
    "Rho":"\u03A1",
    "rho":"\u03C1",
    "rhov":"\u03F1",
    "RightAngleBracket":"\u27E9",
    "RightArrow":"\u2192",
    "Rightarrow":"\u21D2",
    "rightarrow":"\u2192",
    "RightArrowBar":"\u21E5",
    "RightArrowLeftArrow":"\u21C4",
    "rightarrowtail":"\u21A3",
    "RightCeiling":"\u2309",
    "RightDoubleBracket":"\u27E7",
    "RightDownTeeVector":"\u295D",
    "RightDownVector":"\u21C2",
    "RightDownVectorBar":"\u2955",
    "RightFloor":"\u230B",
    "rightharpoondown":"\u21C1",
    "rightharpoonup":"\u21C0",
    "rightleftarrows":"\u21C4",
    "rightleftharpoons":"\u21CC",
    "rightrightarrows":"\u21C9",
    "rightsquigarrow":"\u219D",
    "RightTee":"\u22A2",
    "RightTeeArrow":"\u21A6",
    "RightTeeVector":"\u295B",
    "rightthreetimes":"\u22CC",
    "RightTriangle":"\u22B3",
    "RightTriangleBar":"\u29D0",
    "RightTriangleEqual":"\u22B5",
    "RightUpDownVector":"\u294F",
    "RightUpTeeVector":"\u295C",
    "RightUpVector":"\u21BE",
    "RightUpVectorBar":"\u2954",
    "RightVector":"\u21C0",
    "RightVectorBar":"\u2953",
    "ring":"\u02DA",
    "risingdotseq":"\u2253",
    "rlarr":"\u21C4",
    "rlhar":"\u21CC",
    "rlm":"\u200F",
    "rmoust":"\u23B1",
    "rmoustache":"\u23B1",
    "rnmid":"\u2AEE",
    "roang":"\u27ED",
    "roarr":"\u21FE",
    "robrk":"\u27E7",
    "ropar":"\u2986",
    "Ropf":"\u211D",
    "ropf":"\uD835\uDD63",
    "roplus":"\u2A2E",
    "rotimes":"\u2A35",
    "RoundImplies":"\u2970",
    "rpar":"\u0029",
    "rpargt":"\u2994",
    "rppolint":"\u2A12",
    "rrarr":"\u21C9",
    "Rrightarrow":"\u21DB",
    "rsaquo":"\u203A",
    "Rscr":"\u211B",
    "rscr":"\uD835\uDCC7",
    "Rsh":"\u21B1",
    "rsh":"\u21B1",
    "rsqb":"\u005D",
    "rsquo":"\u2019",
    "rsquor":"\u2019",
    "rthree":"\u22CC",
    "rtimes":"\u22CA",
    "rtri":"\u25B9",
    "rtrie":"\u22B5",
    "rtrif":"\u25B8",
    "rtriltri":"\u29CE",
    "RuleDelayed":"\u29F4",
    "ruluhar":"\u2968",
    "rx":"\u211E",
    "Sacute":"\u015A",
    "sacute":"\u015B",
    "sbquo":"\u201A",
    "Sc":"\u2ABC",
    "sc":"\u227B",
    "scap":"\u2AB8",
    "Scaron":"\u0160",
    "scaron":"\u0161",
    "sccue":"\u227D",
    "scE":"\u2AB4",
    "sce":"\u2AB0",
    "Scedil":"\u015E",
    "scedil":"\u015F",
    "Scirc":"\u015C",
    "scirc":"\u015D",
    "scnap":"\u2ABA",
    "scnE":"\u2AB6",
    "scnsim":"\u22E9",
    "scpolint":"\u2A13",
    "scsim":"\u227F",
    "Scy":"\u0421",
    "scy":"\u0441",
    "sdot":"\u22C5",
    "sdotb":"\u22A1",
    "sdote":"\u2A66",
    "searhk":"\u2925",
    "seArr":"\u21D8",
    "searr":"\u2198",
    "searrow":"\u2198",
    "sect":"\u00A7",
    "semi":"\u003B",
    "seswar":"\u2929",
    "setminus":"\u2216",
    "setmn":"\u2216",
    "sext":"\u2736",
    "Sfr":"\uD835\uDD16",
    "sfr":"\uD835\uDD30",
    "sfrown":"\u2322",
    "sharp":"\u266F",
    "SHCHcy":"\u0429",
    "shchcy":"\u0449",
    "SHcy":"\u0428",
    "shcy":"\u0448",
    "ShortDownArrow":"\u2193",
    "ShortLeftArrow":"\u2190",
    "shortmid":"\u2223",
    "shortparallel":"\u2225",
    "ShortRightArrow":"\u2192",
    "ShortUpArrow":"\u2191",
    "shy":"\u00AD",
    "Sigma":"\u03A3",
    "sigma":"\u03C3",
    "sigmaf":"\u03C2",
    "sigmav":"\u03C2",
    "sim":"\u223C",
    "simdot":"\u2A6A",
    "sime":"\u2243",
    "simeq":"\u2243",
    "simg":"\u2A9E",
    "simgE":"\u2AA0",
    "siml":"\u2A9D",
    "simlE":"\u2A9F",
    "simne":"\u2246",
    "simplus":"\u2A24",
    "simrarr":"\u2972",
    "slarr":"\u2190",
    "SmallCircle":"\u2218",
    "smallsetminus":"\u2216",
    "smashp":"\u2A33",
    "smeparsl":"\u29E4",
    "smid":"\u2223",
    "smile":"\u2323",
    "smt":"\u2AAA",
    "smte":"\u2AAC",
    "smtes":"\u2AAC\uFE00",
    "SOFTcy":"\u042C",
    "softcy":"\u044C",
    "sol":"\u002F",
    "solb":"\u29C4",
    "solbar":"\u233F",
    "Sopf":"\uD835\uDD4A",
    "sopf":"\uD835\uDD64",
    "spades":"\u2660",
    "spadesuit":"\u2660",
    "spar":"\u2225",
    "sqcap":"\u2293",
    "sqcaps":"\u2293\uFE00",
    "sqcup":"\u2294",
    "sqcups":"\u2294\uFE00",
    "Sqrt":"\u221A",
    "sqsub":"\u228F",
    "sqsube":"\u2291",
    "sqsubset":"\u228F",
    "sqsubseteq":"\u2291",
    "sqsup":"\u2290",
    "sqsupe":"\u2292",
    "sqsupset":"\u2290",
    "sqsupseteq":"\u2292",
    "squ":"\u25A1",
    "Square":"\u25A1",
    "square":"\u25A1",
    "SquareIntersection":"\u2293",
    "SquareSubset":"\u228F",
    "SquareSubsetEqual":"\u2291",
    "SquareSuperset":"\u2290",
    "SquareSupersetEqual":"\u2292",
    "SquareUnion":"\u2294",
    "squarf":"\u25AA",
    "squf":"\u25AA",
    "srarr":"\u2192",
    "Sscr":"\uD835\uDCAE",
    "sscr":"\uD835\uDCC8",
    "ssetmn":"\u2216",
    "ssmile":"\u2323",
    "sstarf":"\u22C6",
    "Star":"\u22C6",
    "star":"\u2606",
    "starf":"\u2605",
    "straightepsilon":"\u03F5",
    "straightphi":"\u03D5",
    "strns":"\u00AF",
    "Sub":"\u22D0",
    "sub":"\u2282",
    "subdot":"\u2ABD",
    "subE":"\u2AC5",
    "sube":"\u2286",
    "subedot":"\u2AC3",
    "submult":"\u2AC1",
    "subnE":"\u2ACB",
    "subne":"\u228A",
    "subplus":"\u2ABF",
    "subrarr":"\u2979",
    "Subset":"\u22D0",
    "subset":"\u2282",
    "subseteq":"\u2286",
    "subseteqq":"\u2AC5",
    "SubsetEqual":"\u2286",
    "subsetneq":"\u228A",
    "subsetneqq":"\u2ACB",
    "subsim":"\u2AC7",
    "subsub":"\u2AD5",
    "subsup":"\u2AD3",
    "succ":"\u227B",
    "succapprox":"\u2AB8",
    "succcurlyeq":"\u227D",
    "Succeeds":"\u227B",
    "SucceedsEqual":"\u2AB0",
    "SucceedsSlantEqual":"\u227D",
    "SucceedsTilde":"\u227F",
    "succeq":"\u2AB0",
    "succnapprox":"\u2ABA",
    "succneqq":"\u2AB6",
    "succnsim":"\u22E9",
    "succsim":"\u227F",
    "SuchThat":"\u220B",
    "Sum":"\u2211",
    "sum":"\u2211",
    "sung":"\u266A",
    "Sup":"\u22D1",
    "sup":"\u2283",
    "sup1":"\u00B9",
    "sup2":"\u00B2",
    "sup3":"\u00B3",
    "supdot":"\u2ABE",
    "supdsub":"\u2AD8",
    "supE":"\u2AC6",
    "supe":"\u2287",
    "supedot":"\u2AC4",
    "Superset":"\u2283",
    "SupersetEqual":"\u2287",
    "suphsol":"\u27C9",
    "suphsub":"\u2AD7",
    "suplarr":"\u297B",
    "supmult":"\u2AC2",
    "supnE":"\u2ACC",
    "supne":"\u228B",
    "supplus":"\u2AC0",
    "Supset":"\u22D1",
    "supset":"\u2283",
    "supseteq":"\u2287",
    "supseteqq":"\u2AC6",
    "supsetneq":"\u228B",
    "supsetneqq":"\u2ACC",
    "supsim":"\u2AC8",
    "supsub":"\u2AD4",
    "supsup":"\u2AD6",
    "swarhk":"\u2926",
    "swArr":"\u21D9",
    "swarr":"\u2199",
    "swarrow":"\u2199",
    "swnwar":"\u292A",
    "szlig":"\u00DF",
    "Tab":"\u0009",
    "target":"\u2316",
    "Tau":"\u03A4",
    "tau":"\u03C4",
    "tbrk":"\u23B4",
    "Tcaron":"\u0164",
    "tcaron":"\u0165",
    "Tcedil":"\u0162",
    "tcedil":"\u0163",
    "Tcy":"\u0422",
    "tcy":"\u0442",
    "tdot":"\u20DB",
    "telrec":"\u2315",
    "Tfr":"\uD835\uDD17",
    "tfr":"\uD835\uDD31",
    "there4":"\u2234",
    "Therefore":"\u2234",
    "therefore":"\u2234",
    "Theta":"\u0398",
    "theta":"\u03B8",
    "thetasym":"\u03D1",
    "thetav":"\u03D1",
    "thickapprox":"\u2248",
    "thicksim":"\u223C",
    "ThickSpace":"\u205F\u200A",
    "thinsp":"\u2009",
    "ThinSpace":"\u2009",
    "thkap":"\u2248",
    "thksim":"\u223C",
    "THORN":"\u00DE",
    "thorn":"\u00FE",
    "Tilde":"\u223C",
    "tilde":"\u02DC",
    "TildeEqual":"\u2243",
    "TildeFullEqual":"\u2245",
    "TildeTilde":"\u2248",
    "times":"\u00D7",
    "timesb":"\u22A0",
    "timesbar":"\u2A31",
    "timesd":"\u2A30",
    "tint":"\u222D",
    "toea":"\u2928",
    "top":"\u22A4",
    "topbot":"\u2336",
    "topcir":"\u2AF1",
    "Topf":"\uD835\uDD4B",
    "topf":"\uD835\uDD65",
    "topfork":"\u2ADA",
    "tosa":"\u2929",
    "tprime":"\u2034",
    "TRADE":"\u2122",
    "trade":"\u2122",
    "triangle":"\u25B5",
    "triangledown":"\u25BF",
    "triangleleft":"\u25C3",
    "trianglelefteq":"\u22B4",
    "triangleq":"\u225C",
    "triangleright":"\u25B9",
    "trianglerighteq":"\u22B5",
    "tridot":"\u25EC",
    "trie":"\u225C",
    "triminus":"\u2A3A",
    "TripleDot":"\u20DB",
    "triplus":"\u2A39",
    "trisb":"\u29CD",
    "tritime":"\u2A3B",
    "trpezium":"\u23E2",
    "Tscr":"\uD835\uDCAF",
    "tscr":"\uD835\uDCC9",
    "TScy":"\u0426",
    "tscy":"\u0446",
    "TSHcy":"\u040B",
    "tshcy":"\u045B",
    "Tstrok":"\u0166",
    "tstrok":"\u0167",
    "twixt":"\u226C",
    "twoheadleftarrow":"\u219E",
    "twoheadrightarrow":"\u21A0",
    "Uacute":"\u00DA",
    "uacute":"\u00FA",
    "Uarr":"\u219F",
    "uArr":"\u21D1",
    "uarr":"\u2191",
    "Uarrocir":"\u2949",
    "Ubrcy":"\u040E",
    "ubrcy":"\u045E",
    "Ubreve":"\u016C",
    "ubreve":"\u016D",
    "Ucirc":"\u00DB",
    "ucirc":"\u00FB",
    "Ucy":"\u0423",
    "ucy":"\u0443",
    "udarr":"\u21C5",
    "Udblac":"\u0170",
    "udblac":"\u0171",
    "udhar":"\u296E",
    "ufisht":"\u297E",
    "Ufr":"\uD835\uDD18",
    "ufr":"\uD835\uDD32",
    "Ugrave":"\u00D9",
    "ugrave":"\u00F9",
    "uHar":"\u2963",
    "uharl":"\u21BF",
    "uharr":"\u21BE",
    "uhblk":"\u2580",
    "ulcorn":"\u231C",
    "ulcorner":"\u231C",
    "ulcrop":"\u230F",
    "ultri":"\u25F8",
    "Umacr":"\u016A",
    "umacr":"\u016B",
    "uml":"\u00A8",
    "UnderBar":"\u005F",
    "UnderBrace":"\u23DF",
    "UnderBracket":"\u23B5",
    "UnderParenthesis":"\u23DD",
    "Union":"\u22C3",
    "UnionPlus":"\u228E",
    "Uogon":"\u0172",
    "uogon":"\u0173",
    "Uopf":"\uD835\uDD4C",
    "uopf":"\uD835\uDD66",
    "UpArrow":"\u2191",
    "Uparrow":"\u21D1",
    "uparrow":"\u2191",
    "UpArrowBar":"\u2912",
    "UpArrowDownArrow":"\u21C5",
    "UpDownArrow":"\u2195",
    "Updownarrow":"\u21D5",
    "updownarrow":"\u2195",
    "UpEquilibrium":"\u296E",
    "upharpoonleft":"\u21BF",
    "upharpoonright":"\u21BE",
    "uplus":"\u228E",
    "UpperLeftArrow":"\u2196",
    "UpperRightArrow":"\u2197",
    "Upsi":"\u03D2",
    "upsi":"\u03C5",
    "upsih":"\u03D2",
    "Upsilon":"\u03A5",
    "upsilon":"\u03C5",
    "UpTee":"\u22A5",
    "UpTeeArrow":"\u21A5",
    "upuparrows":"\u21C8",
    "urcorn":"\u231D",
    "urcorner":"\u231D",
    "urcrop":"\u230E",
    "Uring":"\u016E",
    "uring":"\u016F",
    "urtri":"\u25F9",
    "Uscr":"\uD835\uDCB0",
    "uscr":"\uD835\uDCCA",
    "utdot":"\u22F0",
    "Utilde":"\u0168",
    "utilde":"\u0169",
    "utri":"\u25B5",
    "utrif":"\u25B4",
    "uuarr":"\u21C8",
    "Uuml":"\u00DC",
    "uuml":"\u00FC",
    "uwangle":"\u29A7",
    "vangrt":"\u299C",
    "varepsilon":"\u03F5",
    "varkappa":"\u03F0",
    "varnothing":"\u2205",
    "varphi":"\u03D5",
    "varpi":"\u03D6",
    "varpropto":"\u221D",
    "vArr":"\u21D5",
    "varr":"\u2195",
    "varrho":"\u03F1",
    "varsigma":"\u03C2",
    "varsubsetneq":"\u228A\uFE00",
    "varsubsetneqq":"\u2ACB\uFE00",
    "varsupsetneq":"\u228B\uFE00",
    "varsupsetneqq":"\u2ACC\uFE00",
    "vartheta":"\u03D1",
    "vartriangleleft":"\u22B2",
    "vartriangleright":"\u22B3",
    "Vbar":"\u2AEB",
    "vBar":"\u2AE8",
    "vBarv":"\u2AE9",
    "Vcy":"\u0412",
    "vcy":"\u0432",
    "VDash":"\u22AB",
    "Vdash":"\u22A9",
    "vDash":"\u22A8",
    "vdash":"\u22A2",
    "Vdashl":"\u2AE6",
    "Vee":"\u22C1",
    "vee":"\u2228",
    "veebar":"\u22BB",
    "veeeq":"\u225A",
    "vellip":"\u22EE",
    "Verbar":"\u2016",
    "verbar":"\u007C",
    "Vert":"\u2016",
    "vert":"\u007C",
    "VerticalBar":"\u2223",
    "VerticalLine":"\u007C",
    "VerticalSeparator":"\u2758",
    "VerticalTilde":"\u2240",
    "VeryThinSpace":"\u200A",
    "Vfr":"\uD835\uDD19",
    "vfr":"\uD835\uDD33",
    "vltri":"\u22B2",
    "vnsub":"\u2282\u20D2",
    "vnsup":"\u2283\u20D2",
    "Vopf":"\uD835\uDD4D",
    "vopf":"\uD835\uDD67",
    "vprop":"\u221D",
    "vrtri":"\u22B3",
    "Vscr":"\uD835\uDCB1",
    "vscr":"\uD835\uDCCB",
    "vsubnE":"\u2ACB\uFE00",
    "vsubne":"\u228A\uFE00",
    "vsupnE":"\u2ACC\uFE00",
    "vsupne":"\u228B\uFE00",
    "Vvdash":"\u22AA",
    "vzigzag":"\u299A",
    "Wcirc":"\u0174",
    "wcirc":"\u0175",
    "wedbar":"\u2A5F",
    "Wedge":"\u22C0",
    "wedge":"\u2227",
    "wedgeq":"\u2259",
    "weierp":"\u2118",
    "Wfr":"\uD835\uDD1A",
    "wfr":"\uD835\uDD34",
    "Wopf":"\uD835\uDD4E",
    "wopf":"\uD835\uDD68",
    "wp":"\u2118",
    "wr":"\u2240",
    "wreath":"\u2240",
    "Wscr":"\uD835\uDCB2",
    "wscr":"\uD835\uDCCC",
    "xcap":"\u22C2",
    "xcirc":"\u25EF",
    "xcup":"\u22C3",
    "xdtri":"\u25BD",
    "Xfr":"\uD835\uDD1B",
    "xfr":"\uD835\uDD35",
    "xhArr":"\u27FA",
    "xharr":"\u27F7",
    "Xi":"\u039E",
    "xi":"\u03BE",
    "xlArr":"\u27F8",
    "xlarr":"\u27F5",
    "xmap":"\u27FC",
    "xnis":"\u22FB",
    "xodot":"\u2A00",
    "Xopf":"\uD835\uDD4F",
    "xopf":"\uD835\uDD69",
    "xoplus":"\u2A01",
    "xotime":"\u2A02",
    "xrArr":"\u27F9",
    "xrarr":"\u27F6",
    "Xscr":"\uD835\uDCB3",
    "xscr":"\uD835\uDCCD",
    "xsqcup":"\u2A06",
    "xuplus":"\u2A04",
    "xutri":"\u25B3",
    "xvee":"\u22C1",
    "xwedge":"\u22C0",
    "Yacute":"\u00DD",
    "yacute":"\u00FD",
    "YAcy":"\u042F",
    "yacy":"\u044F",
    "Ycirc":"\u0176",
    "ycirc":"\u0177",
    "Ycy":"\u042B",
    "ycy":"\u044B",
    "yen":"\u00A5",
    "Yfr":"\uD835\uDD1C",
    "yfr":"\uD835\uDD36",
    "YIcy":"\u0407",
    "yicy":"\u0457",
    "Yopf":"\uD835\uDD50",
    "yopf":"\uD835\uDD6A",
    "Yscr":"\uD835\uDCB4",
    "yscr":"\uD835\uDCCE",
    "YUcy":"\u042E",
    "yucy":"\u044E",
    "Yuml":"\u0178",
    "yuml":"\u00FF",
    "Zacute":"\u0179",
    "zacute":"\u017A",
    "Zcaron":"\u017D",
    "zcaron":"\u017E",
    "Zcy":"\u0417",
    "zcy":"\u0437",
    "Zdot":"\u017B",
    "zdot":"\u017C",
    "zeetrf":"\u2128",
    "ZeroWidthSpace":"\u200B",
    "Zeta":"\u0396",
    "zeta":"\u03B6",
    "Zfr":"\u2128",
    "zfr":"\uD835\uDD37",
    "ZHcy":"\u0416",
    "zhcy":"\u0436",
    "zigrarr":"\u21DD",
    "Zopf":"\u2124",
    "zopf":"\uD835\uDD6B",
    "Zscr":"\uD835\uDCB5",
    "zscr":"\uD835\uDCCF",
    "zwj":"\u200D",
    "zwnj":"\u200C"
  };

  var hasOwn = Object.prototype.hasOwnProperty;

  function has(object, key) {
    return object
      ? hasOwn.call(object, key)
      : false;
  }

  function decodeEntity(name) {
    if (has(entities, name)) {
      return entities[name]
    } else {
      return name;
    }
  }

  /**
   * Utility functions
   */

  function typeOf(obj) {
    return Object.prototype.toString.call(obj);
  }

  function isString(obj) {
    return typeOf(obj) === '[object String]';
  }

  var hasOwn$1 = Object.prototype.hasOwnProperty;

  function has$1(object, key) {
    return object
      ? hasOwn$1.call(object, key)
      : false;
  }

  // Extend objects
  //
  function assign(obj /*from1, from2, from3, ...*/) {
    var sources = [].slice.call(arguments, 1);

    sources.forEach(function (source) {
      if (!source) { return; }

      if (typeof source !== 'object') {
        throw new TypeError(source + 'must be object');
      }

      Object.keys(source).forEach(function (key) {
        obj[key] = source[key];
      });
    });

    return obj;
  }

  ////////////////////////////////////////////////////////////////////////////////

  var UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

  function unescapeMd(str) {
    if (str.indexOf('\\') < 0) { return str; }
    return str.replace(UNESCAPE_MD_RE, '$1');
  }

  ////////////////////////////////////////////////////////////////////////////////

  function isValidEntityCode(c) {
    /*eslint no-bitwise:0*/
    // broken sequence
    if (c >= 0xD800 && c <= 0xDFFF) { return false; }
    // never used
    if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
    if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
    // control codes
    if (c >= 0x00 && c <= 0x08) { return false; }
    if (c === 0x0B) { return false; }
    if (c >= 0x0E && c <= 0x1F) { return false; }
    if (c >= 0x7F && c <= 0x9F) { return false; }
    // out of range
    if (c > 0x10FFFF) { return false; }
    return true;
  }

  function fromCodePoint(c) {
    /*eslint no-bitwise:0*/
    if (c > 0xffff) {
      c -= 0x10000;
      var surrogate1 = 0xd800 + (c >> 10),
          surrogate2 = 0xdc00 + (c & 0x3ff);

      return String.fromCharCode(surrogate1, surrogate2);
    }
    return String.fromCharCode(c);
  }

  var NAMED_ENTITY_RE   = /&([a-z#][a-z0-9]{1,31});/gi;
  var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

  function replaceEntityPattern(match, name) {
    var code = 0;
    var decoded = decodeEntity(name);

    if (name !== decoded) {
      return decoded;
    } else if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
      code = name[1].toLowerCase() === 'x' ?
        parseInt(name.slice(2), 16)
      :
        parseInt(name.slice(1), 10);
      if (isValidEntityCode(code)) {
        return fromCodePoint(code);
      }
    }
    return match;
  }

  function replaceEntities(str) {
    if (str.indexOf('&') < 0) { return str; }

    return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
  }

  ////////////////////////////////////////////////////////////////////////////////

  var HTML_ESCAPE_TEST_RE = /[&<>"]/;
  var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  var HTML_REPLACEMENTS = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };

  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }

  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
  }

  var utils = /*#__PURE__*/Object.freeze({
    isString: isString,
    has: has$1,
    assign: assign,
    unescapeMd: unescapeMd,
    isValidEntityCode: isValidEntityCode,
    fromCodePoint: fromCodePoint,
    replaceEntities: replaceEntities,
    escapeHtml: escapeHtml
  });

  /**
   * Renderer rules cache
   */

  var rules = {};

  /**
   * Blockquotes
   */

  rules.blockquote_open = function(/* tokens, idx, options, env */) {
    return '<blockquote>\n';
  };

  rules.blockquote_close = function(tokens, idx /*, options, env */) {
    return '</blockquote>' + getBreak(tokens, idx);
  };

  /**
   * Code
   */

  rules.code = function(tokens, idx /*, options, env */) {
    if (tokens[idx].block) {
      return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>' + getBreak(tokens, idx);
    }
    return '<code>' + escapeHtml(tokens[idx].content) + '</code>';
  };

  /**
   * Fenced code blocks
   */

  rules.fence = function(tokens, idx, options, env, instance) {
    var token = tokens[idx];
    var langClass = '';
    var langPrefix = options.langPrefix;
    var langName = '', fences, fenceName;
    var highlighted;

    if (token.params) {

      //
      // ```foo bar
      //
      // Try custom renderer "foo" first. That will simplify overwrite
      // for diagrams, latex, and any other fenced block with custom look
      //

      fences = token.params.split(/\s+/g);
      fenceName = fences.join(' ');

      if (has$1(instance.rules.fence_custom, fences[0])) {
        return instance.rules.fence_custom[fences[0]](tokens, idx, options, env, instance);
      }

      langName = escapeHtml(replaceEntities(unescapeMd(fenceName)));
      langClass = ' class="' + langPrefix + langName + '"';
    }

    if (options.highlight) {
      highlighted = options.highlight.apply(options.highlight, [ token.content ].concat(fences))
        || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }

    return '<pre><code' + langClass + '>'
          + highlighted
          + '</code></pre>'
          + getBreak(tokens, idx);
  };

  rules.fence_custom = {};

  /**
   * Headings
   */

  rules.heading_open = function(tokens, idx /*, options, env */) {
    return '<h' + tokens[idx].hLevel + '>';
  };
  rules.heading_close = function(tokens, idx /*, options, env */) {
    return '</h' + tokens[idx].hLevel + '>\n';
  };

  /**
   * Horizontal rules
   */

  rules.hr = function(tokens, idx, options /*, env */) {
    return (options.xhtmlOut ? '<hr />' : '<hr>') + getBreak(tokens, idx);
  };

  /**
   * Bullets
   */

  rules.bullet_list_open = function(/* tokens, idx, options, env */) {
    return '<ul>\n';
  };
  rules.bullet_list_close = function(tokens, idx /*, options, env */) {
    return '</ul>' + getBreak(tokens, idx);
  };

  /**
   * List items
   */

  rules.list_item_open = function(/* tokens, idx, options, env */) {
    return '<li>';
  };
  rules.list_item_close = function(/* tokens, idx, options, env */) {
    return '</li>\n';
  };

  /**
   * Ordered list items
   */

  rules.ordered_list_open = function(tokens, idx /*, options, env */) {
    var token = tokens[idx];
    var order = token.order > 1 ? ' start="' + token.order + '"' : '';
    return '<ol' + order + '>\n';
  };
  rules.ordered_list_close = function(tokens, idx /*, options, env */) {
    return '</ol>' + getBreak(tokens, idx);
  };

  /**
   * Paragraphs
   */

  rules.paragraph_open = function(tokens, idx /*, options, env */) {
    return tokens[idx].tight ? '' : '<p>';
  };
  rules.paragraph_close = function(tokens, idx /*, options, env */) {
    var addBreak = !(tokens[idx].tight && idx && tokens[idx - 1].type === 'inline' && !tokens[idx - 1].content);
    return (tokens[idx].tight ? '' : '</p>') + (addBreak ? getBreak(tokens, idx) : '');
  };

  /**
   * Links
   */

  rules.link_open = function(tokens, idx, options /* env */) {
    var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
    var target = options.linkTarget ? (' target="' + options.linkTarget + '"') : '';
    return '<a href="' + escapeHtml(tokens[idx].href) + '"' + title + target + '>';
  };
  rules.link_close = function(/* tokens, idx, options, env */) {
    return '</a>';
  };

  /**
   * Images
   */

  rules.image = function(tokens, idx, options /*, env */) {
    var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
    var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
    var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : '') + '"';
    var suffix = options.xhtmlOut ? ' /' : '';
    return '<img' + src + alt + title + suffix + '>';
  };

  /**
   * Tables
   */

  rules.table_open = function(/* tokens, idx, options, env */) {
    return '<table>\n';
  };
  rules.table_close = function(/* tokens, idx, options, env */) {
    return '</table>\n';
  };
  rules.thead_open = function(/* tokens, idx, options, env */) {
    return '<thead>\n';
  };
  rules.thead_close = function(/* tokens, idx, options, env */) {
    return '</thead>\n';
  };
  rules.tbody_open = function(/* tokens, idx, options, env */) {
    return '<tbody>\n';
  };
  rules.tbody_close = function(/* tokens, idx, options, env */) {
    return '</tbody>\n';
  };
  rules.tr_open = function(/* tokens, idx, options, env */) {
    return '<tr>';
  };
  rules.tr_close = function(/* tokens, idx, options, env */) {
    return '</tr>\n';
  };
  rules.th_open = function(tokens, idx /*, options, env */) {
    var token = tokens[idx];
    return '<th'
      + (token.align ? ' style="text-align:' + token.align + '"' : '')
      + '>';
  };
  rules.th_close = function(/* tokens, idx, options, env */) {
    return '</th>';
  };
  rules.td_open = function(tokens, idx /*, options, env */) {
    var token = tokens[idx];
    return '<td'
      + (token.align ? ' style="text-align:' + token.align + '"' : '')
      + '>';
  };
  rules.td_close = function(/* tokens, idx, options, env */) {
    return '</td>';
  };

  /**
   * Bold
   */

  rules.strong_open = function(/* tokens, idx, options, env */) {
    return '<strong>';
  };
  rules.strong_close = function(/* tokens, idx, options, env */) {
    return '</strong>';
  };

  /**
   * Italicize
   */

  rules.em_open = function(/* tokens, idx, options, env */) {
    return '<em>';
  };
  rules.em_close = function(/* tokens, idx, options, env */) {
    return '</em>';
  };

  /**
   * Strikethrough
   */

  rules.del_open = function(/* tokens, idx, options, env */) {
    return '<del>';
  };
  rules.del_close = function(/* tokens, idx, options, env */) {
    return '</del>';
  };

  /**
   * Insert
   */

  rules.ins_open = function(/* tokens, idx, options, env */) {
    return '<ins>';
  };
  rules.ins_close = function(/* tokens, idx, options, env */) {
    return '</ins>';
  };

  /**
   * Highlight
   */

  rules.mark_open = function(/* tokens, idx, options, env */) {
    return '<mark>';
  };
  rules.mark_close = function(/* tokens, idx, options, env */) {
    return '</mark>';
  };

  /**
   * Super- and sub-script
   */

  rules.sub = function(tokens, idx /*, options, env */) {
    return '<sub>' + escapeHtml(tokens[idx].content) + '</sub>';
  };
  rules.sup = function(tokens, idx /*, options, env */) {
    return '<sup>' + escapeHtml(tokens[idx].content) + '</sup>';
  };

  /**
   * Breaks
   */

  rules.hardbreak = function(tokens, idx, options /*, env */) {
    return options.xhtmlOut ? '<br />\n' : '<br>\n';
  };
  rules.softbreak = function(tokens, idx, options /*, env */) {
    return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
  };

  /**
   * Text
   */

  rules.text = function(tokens, idx /*, options, env */) {
    return escapeHtml(tokens[idx].content);
  };

  /**
   * Content
   */

  rules.htmlblock = function(tokens, idx /*, options, env */) {
    return tokens[idx].content;
  };
  rules.htmltag = function(tokens, idx /*, options, env */) {
    return tokens[idx].content;
  };

  /**
   * Abbreviations, initialism
   */

  rules.abbr_open = function(tokens, idx /*, options, env */) {
    return '<abbr title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '">';
  };
  rules.abbr_close = function(/* tokens, idx, options, env */) {
    return '</abbr>';
  };

  /**
   * Footnotes
   */

  rules.footnote_ref = function(tokens, idx) {
    var n = Number(tokens[idx].id + 1).toString();
    var id = 'fnref' + n;
    if (tokens[idx].subId > 0) {
      id += ':' + tokens[idx].subId;
    }
    return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
  };
  rules.footnote_block_open = function(tokens, idx, options) {
    var hr = options.xhtmlOut
      ? '<hr class="footnotes-sep" />\n'
      : '<hr class="footnotes-sep">\n';
    return hr + '<section class="footnotes">\n<ol class="footnotes-list">\n';
  };
  rules.footnote_block_close = function() {
    return '</ol>\n</section>\n';
  };
  rules.footnote_open = function(tokens, idx) {
    var id = Number(tokens[idx].id + 1).toString();
    return '<li id="fn' + id + '"  class="footnote-item">';
  };
  rules.footnote_close = function() {
    return '</li>\n';
  };
  rules.footnote_anchor = function(tokens, idx) {
    var n = Number(tokens[idx].id + 1).toString();
    var id = 'fnref' + n;
    if (tokens[idx].subId > 0) {
      id += ':' + tokens[idx].subId;
    }
    return ' <a href="#' + id + '" class="footnote-backref">↩</a>';
  };

  /**
   * Definition lists
   */

  rules.dl_open = function() {
    return '<dl>\n';
  };
  rules.dt_open = function() {
    return '<dt>';
  };
  rules.dd_open = function() {
    return '<dd>';
  };
  rules.dl_close = function() {
    return '</dl>\n';
  };
  rules.dt_close = function() {
    return '</dt>\n';
  };
  rules.dd_close = function() {
    return '</dd>\n';
  };

  /**
   * Helper functions
   */

  function nextToken(tokens, idx) {
    if (++idx >= tokens.length - 2) {
      return idx;
    }
    if ((tokens[idx].type === 'paragraph_open' && tokens[idx].tight) &&
        (tokens[idx + 1].type === 'inline' && tokens[idx + 1].content.length === 0) &&
        (tokens[idx + 2].type === 'paragraph_close' && tokens[idx + 2].tight)) {
      return nextToken(tokens, idx + 2);
    }
    return idx;
  }

  /**
   * Check to see if `\n` is needed before the next token.
   *
   * @param  {Array} `tokens`
   * @param  {Number} `idx`
   * @return {String} Empty string or newline
   * @api private
   */

  var getBreak = rules.getBreak = function getBreak(tokens, idx) {
    idx = nextToken(tokens, idx);
    if (idx < tokens.length && tokens[idx].type === 'list_item_close') {
      return '';
    }
    return '\n';
  };

  /**
   * Renderer class. Renders HTML and exposes `rules` to allow
   * local modifications.
   */

  function Renderer() {
    this.rules = assign({}, rules);

    // exported helper, for custom rules only
    this.getBreak = rules.getBreak;
  }

  /**
   * Render a string of inline HTML with the given `tokens` and
   * `options`.
   *
   * @param  {Array} `tokens`
   * @param  {Object} `options`
   * @param  {Object} `env`
   * @return {String}
   * @api public
   */

  Renderer.prototype.renderInline = function (tokens, options, env) {
    var _rules = this.rules;
    var len = tokens.length, i = 0;
    var result = '';

    while (len--) {
      result += _rules[tokens[i].type](tokens, i++, options, env, this);
    }

    return result;
  };

  /**
   * Render a string of HTML with the given `tokens` and
   * `options`.
   *
   * @param  {Array} `tokens`
   * @param  {Object} `options`
   * @param  {Object} `env`
   * @return {String}
   * @api public
   */

  Renderer.prototype.render = function (tokens, options, env) {
    var _rules = this.rules;
    var len = tokens.length, i = -1;
    var result = '';

    while (++i < len) {
      if (tokens[i].type === 'inline') {
        result += this.renderInline(tokens[i].children, options, env);
      } else {
        result += _rules[tokens[i].type](tokens, i, options, env, this);
      }
    }
    return result;
  };

  /**
   * Ruler is a helper class for building responsibility chains from
   * parse rules. It allows:
   *
   *   - easy stack rules chains
   *   - getting main chain and named chains content (as arrays of functions)
   *
   * Helper methods, should not be used directly.
   * @api private
   */

  function Ruler() {
    // List of added rules. Each element is:
    //
    // { name: XXX,
    //   enabled: Boolean,
    //   fn: Function(),
    //   alt: [ name2, name3 ] }
    //
    this.__rules__ = [];

    // Cached rule chains.
    //
    // First level - chain name, '' for default.
    // Second level - digital anchor for fast filtering by charcodes.
    //
    this.__cache__ = null;
  }

  /**
   * Find the index of a rule by `name`.
   *
   * @param  {String} `name`
   * @return {Number} Index of the given `name`
   * @api private
   */

  Ruler.prototype.__find__ = function (name) {
    var len = this.__rules__.length;
    var i = -1;

    while (len--) {
      if (this.__rules__[++i].name === name) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Build the rules lookup cache
   *
   * @api private
   */

  Ruler.prototype.__compile__ = function () {
    var self = this;
    var chains = [ '' ];

    // collect unique names
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) {
        return;
      }

      rule.alt.forEach(function (altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });

    self.__cache__ = {};

    chains.forEach(function (chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function (rule) {
        if (!rule.enabled) {
          return;
        }

        if (chain && rule.alt.indexOf(chain) < 0) {
          return;
        }
        self.__cache__[chain].push(rule.fn);
      });
    });
  };

  /**
   * Ruler public methods
   * ------------------------------------------------
   */

  /**
   * Replace rule function
   *
   * @param  {String} `name` Rule name
   * @param  {Function `fn`
   * @param  {Object} `options`
   * @api private
   */

  Ruler.prototype.at = function (name, fn, options) {
    var idx = this.__find__(name);
    var opt = options || {};

    if (idx === -1) {
      throw new Error('Parser rule not found: ' + name);
    }

    this.__rules__[idx].fn = fn;
    this.__rules__[idx].alt = opt.alt || [];
    this.__cache__ = null;
  };

  /**
   * Add a rule to the chain before given the `ruleName`.
   *
   * @param  {String}   `beforeName`
   * @param  {String}   `ruleName`
   * @param  {Function} `fn`
   * @param  {Object}   `options`
   * @api private
   */

  Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
    var idx = this.__find__(beforeName);
    var opt = options || {};

    if (idx === -1) {
      throw new Error('Parser rule not found: ' + beforeName);
    }

    this.__rules__.splice(idx, 0, {
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };

  /**
   * Add a rule to the chain after the given `ruleName`.
   *
   * @param  {String}   `afterName`
   * @param  {String}   `ruleName`
   * @param  {Function} `fn`
   * @param  {Object}   `options`
   * @api private
   */

  Ruler.prototype.after = function (afterName, ruleName, fn, options) {
    var idx = this.__find__(afterName);
    var opt = options || {};

    if (idx === -1) {
      throw new Error('Parser rule not found: ' + afterName);
    }

    this.__rules__.splice(idx + 1, 0, {
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };

  /**
   * Add a rule to the end of chain.
   *
   * @param  {String}   `ruleName`
   * @param  {Function} `fn`
   * @param  {Object}   `options`
   * @return {String}
   */

  Ruler.prototype.push = function (ruleName, fn, options) {
    var opt = options || {};

    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };

  /**
   * Enable a rule or list of rules.
   *
   * @param  {String|Array} `list` Name or array of rule names to enable
   * @param  {Boolean} `strict` If `true`, all non listed rules will be disabled.
   * @api private
   */

  Ruler.prototype.enable = function (list, strict) {
    list = !Array.isArray(list)
      ? [ list ]
      : list;

    // In strict mode disable all existing rules first
    if (strict) {
      this.__rules__.forEach(function (rule) {
        rule.enabled = false;
      });
    }

    // Search by name and enable
    list.forEach(function (name) {
      var idx = this.__find__(name);
      if (idx < 0) {
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = true;
    }, this);

    this.__cache__ = null;
  };


  /**
   * Disable a rule or list of rules.
   *
   * @param  {String|Array} `list` Name or array of rule names to disable
   * @api private
   */

  Ruler.prototype.disable = function (list) {
    list = !Array.isArray(list)
      ? [ list ]
      : list;

    // Search by name and disable
    list.forEach(function (name) {
      var idx = this.__find__(name);
      if (idx < 0) {
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = false;
    }, this);

    this.__cache__ = null;
  };

  /**
   * Get a rules list as an array of functions.
   *
   * @param  {String} `chainName`
   * @return {Object}
   * @api private
   */

  Ruler.prototype.getRules = function (chainName) {
    if (this.__cache__ === null) {
      this.__compile__();
    }
    return this.__cache__[chainName] || [];
  };

  function block(state) {

    if (state.inlineMode) {
      state.tokens.push({
        type: 'inline',
        content: state.src.replace(/\n/g, ' ').trim(),
        level: 0,
        lines: [ 0, 1 ],
        children: []
      });

    } else {
      state.block.parse(state.src, state.options, state.env, state.tokens);
    }
  }

  // Inline parser state

  function StateInline(src, parserInline, options, env, outTokens) {
    this.src = src;
    this.env = env;
    this.options = options;
    this.parser = parserInline;
    this.tokens = outTokens;
    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = '';
    this.pendingLevel = 0;

    this.cache = [];        // Stores { start: end } pairs. Useful for backtrack
                            // optimization of pairs parse (emphasis, strikes).

    // Link parser state vars

    this.isInLabel = false; // Set true when seek link label - we should disable
                            // "paired" rules (emphasis, strikes) to not skip
                            // tailing `]`

    this.linkLevel = 0;     // Increment for each nesting link. Used to prevent
                            // nesting in definitions

    this.linkContent = '';  // Temporary storage for link url

    this.labelUnmatchedScopes = 0; // Track unpaired `[` for link labels
                                   // (backtrack optimization)
  }

  // Flush pending text
  //
  StateInline.prototype.pushPending = function () {
    this.tokens.push({
      type: 'text',
      content: this.pending,
      level: this.pendingLevel
    });
    this.pending = '';
  };

  // Push new token to "stream".
  // If pending text exists - flush it as text token
  //
  StateInline.prototype.push = function (token) {
    if (this.pending) {
      this.pushPending();
    }

    this.tokens.push(token);
    this.pendingLevel = this.level;
  };

  // Store value to cache.
  // !!! Implementation has parser-specific optimizations
  // !!! keys MUST be integer, >= 0; values MUST be integer, > 0
  //
  StateInline.prototype.cacheSet = function (key, val) {
    for (var i = this.cache.length; i <= key; i++) {
      this.cache.push(0);
    }

    this.cache[key] = val;
  };

  // Get cache value
  //
  StateInline.prototype.cacheGet = function (key) {
    return key < this.cache.length ? this.cache[key] : 0;
  };

  /**
   * Parse link labels
   *
   * This function assumes that first character (`[`) already matches;
   * returns the end of the label.
   *
   * @param  {Object} state
   * @param  {Number} start
   * @api private
   */

  function parseLinkLabel(state, start) {
    var level, found, marker,
        labelEnd = -1,
        max = state.posMax,
        oldPos = state.pos,
        oldFlag = state.isInLabel;

    if (state.isInLabel) { return -1; }

    if (state.labelUnmatchedScopes) {
      state.labelUnmatchedScopes--;
      return -1;
    }

    state.pos = start + 1;
    state.isInLabel = true;
    level = 1;

    while (state.pos < max) {
      marker = state.src.charCodeAt(state.pos);
      if (marker === 0x5B /* [ */) {
        level++;
      } else if (marker === 0x5D /* ] */) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }

      state.parser.skipToken(state);
    }

    if (found) {
      labelEnd = state.pos;
      state.labelUnmatchedScopes = 0;
    } else {
      state.labelUnmatchedScopes = level - 1;
    }

    // restore old state
    state.pos = oldPos;
    state.isInLabel = oldFlag;

    return labelEnd;
  }

  // Parse abbreviation definitions, i.e. `*[abbr]: description`


  function parseAbbr(str, parserInline, options, env) {
    var state, labelEnd, pos, max, label, title;

    if (str.charCodeAt(0) !== 0x2A/* * */) { return -1; }
    if (str.charCodeAt(1) !== 0x5B/* [ */) { return -1; }

    if (str.indexOf(']:') === -1) { return -1; }

    state = new StateInline(str, parserInline, options, env, []);
    labelEnd = parseLinkLabel(state, 1);

    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return -1; }

    max = state.posMax;

    // abbr title is always one line, so looking for ending "\n" here
    for (pos = labelEnd + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x0A) { break; }
    }

    label = str.slice(2, labelEnd);
    title = str.slice(labelEnd + 2, pos).trim();
    if (title.length === 0) { return -1; }
    if (!env.abbreviations) { env.abbreviations = {}; }
    // prepend ':' to avoid conflict with Object.prototype members
    if (typeof env.abbreviations[':' + label] === 'undefined') {
      env.abbreviations[':' + label] = title;
    }

    return pos;
  }

  function abbr(state) {
    var tokens = state.tokens, i, l, content, pos;

    if (state.inlineMode) {
      return;
    }

    // Parse inlines
    for (i = 1, l = tokens.length - 1; i < l; i++) {
      if (tokens[i - 1].type === 'paragraph_open' &&
          tokens[i].type === 'inline' &&
          tokens[i + 1].type === 'paragraph_close') {

        content = tokens[i].content;
        while (content.length) {
          pos = parseAbbr(content, state.inline, state.options, state.env);
          if (pos < 0) { break; }
          content = content.slice(pos).trim();
        }

        tokens[i].content = content;
        if (!content.length) {
          tokens[i - 1].tight = true;
          tokens[i + 1].tight = true;
        }
      }
    }
  }

  function normalizeLink(url) {
    var normalized = replaceEntities(url);
    // We shouldn't care about the result of malformed URIs,
    // and should not throw an exception.
    try {
      normalized = decodeURI(normalized);
    } catch (err) {}
    return encodeURI(normalized);
  }

  /**
   * Parse link destination
   *
   *   - on success it returns a string and updates state.pos;
   *   - on failure it returns null
   *
   * @param  {Object} state
   * @param  {Number} pos
   * @api private
   */

  function parseLinkDestination(state, pos) {
    var code, level, link,
        start = pos,
        max = state.posMax;

    if (state.src.charCodeAt(pos) === 0x3C /* < */) {
      pos++;
      while (pos < max) {
        code = state.src.charCodeAt(pos);
        if (code === 0x0A /* \n */) { return false; }
        if (code === 0x3E /* > */) {
          link = normalizeLink(unescapeMd(state.src.slice(start + 1, pos)));
          if (!state.parser.validateLink(link)) { return false; }
          state.pos = pos + 1;
          state.linkContent = link;
          return true;
        }
        if (code === 0x5C /* \ */ && pos + 1 < max) {
          pos += 2;
          continue;
        }

        pos++;
      }

      // no closing '>'
      return false;
    }

    // this should be ... } else { ... branch

    level = 0;
    while (pos < max) {
      code = state.src.charCodeAt(pos);

      if (code === 0x20) { break; }

      // ascii control chars
      if (code < 0x20 || code === 0x7F) { break; }

      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      if (code === 0x28 /* ( */) {
        level++;
        if (level > 1) { break; }
      }

      if (code === 0x29 /* ) */) {
        level--;
        if (level < 0) { break; }
      }

      pos++;
    }

    if (start === pos) { return false; }

    link = unescapeMd(state.src.slice(start, pos));
    if (!state.parser.validateLink(link)) { return false; }

    state.linkContent = link;
    state.pos = pos;
    return true;
  }

  /**
   * Parse link title
   *
   *   - on success it returns a string and updates state.pos;
   *   - on failure it returns null
   *
   * @param  {Object} state
   * @param  {Number} pos
   * @api private
   */

  function parseLinkTitle(state, pos) {
    var code,
        start = pos,
        max = state.posMax,
        marker = state.src.charCodeAt(pos);

    if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return false; }

    pos++;

    // if opening marker is "(", switch it to closing marker ")"
    if (marker === 0x28) { marker = 0x29; }

    while (pos < max) {
      code = state.src.charCodeAt(pos);
      if (code === marker) {
        state.pos = pos + 1;
        state.linkContent = unescapeMd(state.src.slice(start + 1, pos));
        return true;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    return false;
  }

  function normalizeReference(str) {
    // use .toUpperCase() instead of .toLowerCase()
    // here to avoid a conflict with Object.prototype
    // members (most notably, `__proto__`)
    return str.trim().replace(/\s+/g, ' ').toUpperCase();
  }

  function parseReference(str, parser, options, env) {
    var state, labelEnd, pos, max, code, start, href, title, label;

    if (str.charCodeAt(0) !== 0x5B/* [ */) { return -1; }

    if (str.indexOf(']:') === -1) { return -1; }

    state = new StateInline(str, parser, options, env, []);
    labelEnd = parseLinkLabel(state, 0);

    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return -1; }

    max = state.posMax;

    // [label]:   destination   'title'
    //         ^^^ skip optional whitespace here
    for (pos = labelEnd + 2; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    // [label]:   destination   'title'
    //            ^^^^^^^^^^^ parse this
    if (!parseLinkDestination(state, pos)) { return -1; }
    href = state.linkContent;
    pos = state.pos;

    // [label]:   destination   'title'
    //                       ^^^ skipping those spaces
    start = pos;
    for (pos = pos + 1; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    // [label]:   destination   'title'
    //                          ^^^^^^^ parse this
    if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
      title = state.linkContent;
      pos = state.pos;
    } else {
      title = '';
      pos = start;
    }

    // ensure that the end of the line is empty
    while (pos < max && state.src.charCodeAt(pos) === 0x20/* space */) { pos++; }
    if (pos < max && state.src.charCodeAt(pos) !== 0x0A) { return -1; }

    label = normalizeReference(str.slice(1, labelEnd));
    if (typeof env.references[label] === 'undefined') {
      env.references[label] = { title: title, href: href };
    }

    return pos;
  }


  function references(state) {
    var tokens = state.tokens, i, l, content, pos;

    state.env.references = state.env.references || {};

    if (state.inlineMode) {
      return;
    }

    // Scan definitions in paragraph inlines
    for (i = 1, l = tokens.length - 1; i < l; i++) {
      if (tokens[i].type === 'inline' &&
          tokens[i - 1].type === 'paragraph_open' &&
          tokens[i + 1].type === 'paragraph_close') {

        content = tokens[i].content;
        while (content.length) {
          pos = parseReference(content, state.inline, state.options, state.env);
          if (pos < 0) { break; }
          content = content.slice(pos).trim();
        }

        tokens[i].content = content;
        if (!content.length) {
          tokens[i - 1].tight = true;
          tokens[i + 1].tight = true;
        }
      }
    }
  }

  function inline(state) {
    var tokens = state.tokens, tok, i, l;

    // Parse inlines
    for (i = 0, l = tokens.length; i < l; i++) {
      tok = tokens[i];
      if (tok.type === 'inline') {
        state.inline.parse(tok.content, state.options, state.env, tok.children);
      }
    }
  }

  function footnote_block(state) {
    var i, l, j, t, lastParagraph, list, tokens, current, currentLabel,
        level = 0,
        insideRef = false,
        refTokens = {};

    if (!state.env.footnotes) { return; }

    state.tokens = state.tokens.filter(function(tok) {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.label;
        return false;
      }
      if (tok.type === 'footnote_reference_close') {
        insideRef = false;
        // prepend ':' to avoid conflict with Object.prototype members
        refTokens[':' + currentLabel] = current;
        return false;
      }
      if (insideRef) { current.push(tok); }
      return !insideRef;
    });

    if (!state.env.footnotes.list) { return; }
    list = state.env.footnotes.list;

    state.tokens.push({
      type: 'footnote_block_open',
      level: level++
    });
    for (i = 0, l = list.length; i < l; i++) {
      state.tokens.push({
        type: 'footnote_open',
        id: i,
        level: level++
      });

      if (list[i].tokens) {
        tokens = [];
        tokens.push({
          type: 'paragraph_open',
          tight: false,
          level: level++
        });
        tokens.push({
          type: 'inline',
          content: '',
          level: level,
          children: list[i].tokens
        });
        tokens.push({
          type: 'paragraph_close',
          tight: false,
          level: --level
        });
      } else if (list[i].label) {
        tokens = refTokens[':' + list[i].label];
      }

      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }

      t = list[i].count > 0 ? list[i].count : 1;
      for (j = 0; j < t; j++) {
        state.tokens.push({
          type: 'footnote_anchor',
          id: i,
          subId: j,
          level: level
        });
      }

      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }

      state.tokens.push({
        type: 'footnote_close',
        level: --level
      });
    }
    state.tokens.push({
      type: 'footnote_block_close',
      level: --level
    });
  }

  // Enclose abbreviations in <abbr> tags
  //

  var PUNCT_CHARS = ' \n()[]\'".,!?-';


  // from Google closure library
  // http://closure-library.googlecode.com/git-history/docs/local_closure_goog_string_string.js.source.html#line1021
  function regEscape(s) {
    return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1');
  }


  function abbr2(state) {
    var i, j, l, tokens, token, text, nodes, pos, level, reg, m, regText,
        blockTokens = state.tokens;

    if (!state.env.abbreviations) { return; }
    if (!state.env.abbrRegExp) {
      regText = '(^|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])'
              + '(' + Object.keys(state.env.abbreviations).map(function (x) {
                        return x.substr(1);
                      }).sort(function (a, b) {
                        return b.length - a.length;
                      }).map(regEscape).join('|') + ')'
              + '($|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])';
      state.env.abbrRegExp = new RegExp(regText, 'g');
    }
    reg = state.env.abbrRegExp;

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') { continue; }
      tokens = blockTokens[j].children;

      // We scan from the end, to keep position when new tags added.
      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];
        if (token.type !== 'text') { continue; }

        pos = 0;
        text = token.content;
        reg.lastIndex = 0;
        level = token.level;
        nodes = [];

        while ((m = reg.exec(text))) {
          if (reg.lastIndex > pos) {
            nodes.push({
              type: 'text',
              content: text.slice(pos, m.index + m[1].length),
              level: level
            });
          }

          nodes.push({
            type: 'abbr_open',
            title: state.env.abbreviations[':' + m[2]],
            level: level++
          });
          nodes.push({
            type: 'text',
            content: m[2],
            level: level
          });
          nodes.push({
            type: 'abbr_close',
            level: --level
          });
          pos = reg.lastIndex - m[3].length;
        }

        if (!nodes.length) { continue; }

        if (pos < text.length) {
          nodes.push({
            type: 'text',
            content: text.slice(pos),
            level: level
          });
        }

        // replace current node
        blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
      }
    }
  }

  // Simple typographical replacements
  //
  // TODO:
  // - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
  // - miltiplication 2 x 4 -> 2 × 4

  var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

  var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
  var SCOPED_ABBR = {
    'c': '©',
    'r': '®',
    'p': '§',
    'tm': '™'
  };

  function replaceScopedAbbr(str) {
    if (str.indexOf('(') < 0) { return str; }

    return str.replace(SCOPED_ABBR_RE, function(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    });
  }


  function replace(state) {
    var i, token, text, inlineTokens, blkIdx;

    if (!state.options.typographer) { return; }

    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

      if (state.tokens[blkIdx].type !== 'inline') { continue; }

      inlineTokens = state.tokens[blkIdx].children;

      for (i = inlineTokens.length - 1; i >= 0; i--) {
        token = inlineTokens[i];
        if (token.type === 'text') {
          text = token.content;

          text = replaceScopedAbbr(text);

          if (RARE_RE.test(text)) {
            text = text
              .replace(/\+-/g, '±')
              // .., ..., ....... -> …
              // but ?..... & !..... -> ?.. & !..
              .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
              .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
              // em-dash
              .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
              // en-dash
              .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
              .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
          }

          token.content = text;
        }
      }
    }
  }

  // Convert straight quotation marks to typographic ones
  //

  var QUOTE_TEST_RE = /['"]/;
  var QUOTE_RE = /['"]/g;
  var PUNCT_RE = /[-\s()\[\]]/;
  var APOSTROPHE = '’';

  // This function returns true if the character at `pos`
  // could be inside a word.
  function isLetter(str, pos) {
    if (pos < 0 || pos >= str.length) { return false; }
    return !PUNCT_RE.test(str[pos]);
  }


  function replaceAt(str, index, ch) {
    return str.substr(0, index) + ch + str.substr(index + 1);
  }


  function smartquotes(state) {
    /*eslint max-depth:0*/
    var i, token, text, t, pos, max, thisLevel, lastSpace, nextSpace, item,
        canOpen, canClose, j, isSingle, blkIdx, tokens,
        stack;

    if (!state.options.typographer) { return; }

    stack = [];

    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

      if (state.tokens[blkIdx].type !== 'inline') { continue; }

      tokens = state.tokens[blkIdx].children;
      stack.length = 0;

      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];

        if (token.type !== 'text' || QUOTE_TEST_RE.test(token.text)) { continue; }

        thisLevel = tokens[i].level;

        for (j = stack.length - 1; j >= 0; j--) {
          if (stack[j].level <= thisLevel) { break; }
        }
        stack.length = j + 1;

        text = token.content;
        pos = 0;
        max = text.length;

        /*eslint no-labels:0,block-scoped-var:0*/
        OUTER:
        while (pos < max) {
          QUOTE_RE.lastIndex = pos;
          t = QUOTE_RE.exec(text);
          if (!t) { break; }

          lastSpace = !isLetter(text, t.index - 1);
          pos = t.index + 1;
          isSingle = (t[0] === "'");
          nextSpace = !isLetter(text, pos);

          if (!nextSpace && !lastSpace) {
            // middle of word
            if (isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
            continue;
          }

          canOpen = !nextSpace;
          canClose = !lastSpace;

          if (canClose) {
            // this could be a closing quote, rewind the stack to get a match
            for (j = stack.length - 1; j >= 0; j--) {
              item = stack[j];
              if (stack[j].level < thisLevel) { break; }
              if (item.single === isSingle && stack[j].level === thisLevel) {
                item = stack[j];
                if (isSingle) {
                  tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[2]);
                  token.content = replaceAt(token.content, t.index, state.options.quotes[3]);
                } else {
                  tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[0]);
                  token.content = replaceAt(token.content, t.index, state.options.quotes[1]);
                }
                stack.length = j;
                continue OUTER;
              }
            }
          }

          if (canOpen) {
            stack.push({
              token: i,
              pos: t.index,
              single: isSingle,
              level: thisLevel
            });
          } else if (canClose && isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
        }
      }
    }
  }

  /**
   * Core parser `rules`
   */

  var _rules = [
    [ 'block',          block          ],
    [ 'abbr',           abbr           ],
    [ 'references',     references     ],
    [ 'inline',         inline         ],
    [ 'footnote_tail',  footnote_block  ],
    [ 'abbr2',          abbr2          ],
    [ 'replacements',   replace   ],
    [ 'smartquotes',    smartquotes    ],
  ];

  /**
   * Class for top level (`core`) parser rules
   *
   * @api private
   */

  function Core() {
    this.options = {};
    this.ruler = new Ruler();
    for (var i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
  }

  /**
   * Process rules with the given `state`
   *
   * @param  {Object} `state`
   * @api private
   */

  Core.prototype.process = function (state) {
    var i, l, rules;
    rules = this.ruler.getRules('');
    for (i = 0, l = rules.length; i < l; i++) {
      rules[i](state);
    }
  };

  // Parser state class

  function StateBlock(src, parser, options, env, tokens) {
    var ch, s, start, pos, len, indent, indent_found;

    this.src = src;

    // Shortcuts to simplify nested calls
    this.parser = parser;

    this.options = options;

    this.env = env;

    //
    // Internal state vartiables
    //

    this.tokens = tokens;

    this.bMarks = [];  // line begin offsets for fast jumps
    this.eMarks = [];  // line end offsets for fast jumps
    this.tShift = [];  // indent for each line

    // block parser variables
    this.blkIndent  = 0; // required block content indent
                         // (for example, if we are in list)
    this.line       = 0; // line index in src
    this.lineMax    = 0; // lines count
    this.tight      = false;  // loose/tight mode for lists
    this.parentType = 'root'; // if `list`, block parser stops on two newlines
    this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)

    this.level = 0;

    // renderer
    this.result = '';

    // Create caches
    // Generate markers.
    s = this.src;
    indent = 0;
    indent_found = false;

    for (start = pos = indent = 0, len = s.length; pos < len; pos++) {
      ch = s.charCodeAt(pos);

      if (!indent_found) {
        if (ch === 0x20/* space */) {
          indent++;
          continue;
        } else {
          indent_found = true;
        }
      }

      if (ch === 0x0A || pos === len - 1) {
        if (ch !== 0x0A) { pos++; }
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);

        indent_found = false;
        indent = 0;
        start = pos + 1;
      }
    }

    // Push fake entry to simplify cache bounds checks
    this.bMarks.push(s.length);
    this.eMarks.push(s.length);
    this.tShift.push(0);

    this.lineMax = this.bMarks.length - 1; // don't count last fake line
  }

  StateBlock.prototype.isEmpty = function isEmpty(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  };

  StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
    for (var max = this.lineMax; from < max; from++) {
      if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
        break;
      }
    }
    return from;
  };

  // Skip spaces from given position.
  StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
    for (var max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== 0x20/* space */) { break; }
    }
    return pos;
  };

  // Skip char codes from given position
  StateBlock.prototype.skipChars = function skipChars(pos, code) {
    for (var max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== code) { break; }
    }
    return pos;
  };

  // Skip char codes reverse from given position - 1
  StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
    if (pos <= min) { return pos; }

    while (pos > min) {
      if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
    }
    return pos;
  };

  // cut lines range from source.
  StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
    var i, first, last, queue, shift,
        line = begin;

    if (begin >= end) {
      return '';
    }

    // Opt: don't use push queue for single line;
    if (line + 1 === end) {
      first = this.bMarks[line] + Math.min(this.tShift[line], indent);
      last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
      return this.src.slice(first, last);
    }

    queue = new Array(end - begin);

    for (i = 0; line < end; line++, i++) {
      shift = this.tShift[line];
      if (shift > indent) { shift = indent; }
      if (shift < 0) { shift = 0; }

      first = this.bMarks[line] + shift;

      if (line + 1 < end || keepLastLF) {
        // No need for bounds check because we have fake entry on tail.
        last = this.eMarks[line] + 1;
      } else {
        last = this.eMarks[line];
      }

      queue[i] = this.src.slice(first, last);
    }

    return queue.join('');
  };

  // Code block (4 spaces padded)

  function code(state, startLine, endLine/*, silent*/) {
    var nextLine, last;

    if (state.tShift[startLine] - state.blkIndent < 4) { return false; }

    last = nextLine = startLine + 1;

    while (nextLine < endLine) {
      if (state.isEmpty(nextLine)) {
        nextLine++;
        continue;
      }
      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        nextLine++;
        last = nextLine;
        continue;
      }
      break;
    }

    state.line = nextLine;
    state.tokens.push({
      type: 'code',
      content: state.getLines(startLine, last, 4 + state.blkIndent, true),
      block: true,
      lines: [ startLine, state.line ],
      level: state.level
    });

    return true;
  }

  // fences (``` lang, ~~~ lang)

  function fences(state, startLine, endLine, silent) {
    var marker, len, params, nextLine, mem,
        haveEndMarker = false,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos + 3 > max) { return false; }

    marker = state.src.charCodeAt(pos);

    if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
      return false;
    }

    // scan marker length
    mem = pos;
    pos = state.skipChars(pos, marker);

    len = pos - mem;

    if (len < 3) { return false; }

    params = state.src.slice(pos, max).trim();

    if (params.indexOf('`') >= 0) { return false; }

    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }

    // search end of block
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (state.src.charCodeAt(pos) !== marker) { continue; }

      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      pos = state.skipChars(pos, marker);

      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) { continue; }

      // make sure tail has spaces only
      pos = state.skipSpaces(pos);

      if (pos < max) { continue; }

      haveEndMarker = true;
      // found!
      break;
    }

    // If a fence has heading spaces, they should be removed from its inner block
    len = state.tShift[startLine];

    state.line = nextLine + (haveEndMarker ? 1 : 0);
    state.tokens.push({
      type: 'fence',
      params: params,
      content: state.getLines(startLine + 1, nextLine, len, true),
      lines: [ startLine, state.line ],
      level: state.level
    });

    return true;
  }

  // Block quotes

  function blockquote(state, startLine, endLine, silent) {
    var nextLine, lastLineEmpty, oldTShift, oldBMarks, oldIndent, oldParentType, lines,
        terminatorRules,
        i, l, terminate,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos > max) { return false; }

    // check the block quote marker
    if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

    if (state.level >= state.options.maxNesting) { return false; }

    // we know that it's going to be a valid blockquote,
    // so no point trying to find the end of it in silent mode
    if (silent) { return true; }

    // skip one optional space after '>'
    if (state.src.charCodeAt(pos) === 0x20) { pos++; }

    oldIndent = state.blkIndent;
    state.blkIndent = 0;

    oldBMarks = [ state.bMarks[startLine] ];
    state.bMarks[startLine] = pos;

    // check if we have an empty blockquote
    pos = pos < max ? state.skipSpaces(pos) : pos;
    lastLineEmpty = pos >= max;

    oldTShift = [ state.tShift[startLine] ];
    state.tShift[startLine] = pos - state.bMarks[startLine];

    terminatorRules = state.parser.ruler.getRules('blockquote');

    // Search the end of the block
    //
    // Block ends with either:
    //  1. an empty line outside:
    //     ```
    //     > test
    //
    //     ```
    //  2. an empty line inside:
    //     ```
    //     >
    //     test
    //     ```
    //  3. another tag
    //     ```
    //     > test
    //      - - -
    //     ```
    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos >= max) {
        // Case 1: line is not inside the blockquote, and this line is empty.
        break;
      }

      if (state.src.charCodeAt(pos++) === 0x3E/* > */) {
        // This line is inside the blockquote.

        // skip one optional space after '>'
        if (state.src.charCodeAt(pos) === 0x20) { pos++; }

        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;

        pos = pos < max ? state.skipSpaces(pos) : pos;
        lastLineEmpty = pos >= max;

        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }

      // Case 2: line is not inside the blockquote, and the last line was empty.
      if (lastLineEmpty) { break; }

      // Case 3: another tag found.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }

      oldBMarks.push(state.bMarks[nextLine]);
      oldTShift.push(state.tShift[nextLine]);

      // A negative number means that this is a paragraph continuation;
      //
      // Any negative number will do the job here, but it's better for it
      // to be large enough to make any bugs obvious.
      state.tShift[nextLine] = -1337;
    }

    oldParentType = state.parentType;
    state.parentType = 'blockquote';
    state.tokens.push({
      type: 'blockquote_open',
      lines: lines = [ startLine, 0 ],
      level: state.level++
    });
    state.parser.tokenize(state, startLine, nextLine);
    state.tokens.push({
      type: 'blockquote_close',
      level: --state.level
    });
    state.parentType = oldParentType;
    lines[1] = state.line;

    // Restore original tShift; this might not be necessary since the parser
    // has already been here, but just to make sure we can do that.
    for (i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
    }
    state.blkIndent = oldIndent;

    return true;
  }

  // Horizontal rule

  function hr(state, startLine, endLine, silent) {
    var marker, cnt, ch,
        pos = state.bMarks[startLine],
        max = state.eMarks[startLine];

    pos += state.tShift[startLine];

    if (pos > max) { return false; }

    marker = state.src.charCodeAt(pos++);

    // Check hr marker
    if (marker !== 0x2A/* * */ &&
        marker !== 0x2D/* - */ &&
        marker !== 0x5F/* _ */) {
      return false;
    }

    // markers can be mixed with spaces, but there should be at least 3 one

    cnt = 1;
    while (pos < max) {
      ch = state.src.charCodeAt(pos++);
      if (ch !== marker && ch !== 0x20/* space */) { return false; }
      if (ch === marker) { cnt++; }
    }

    if (cnt < 3) { return false; }

    if (silent) { return true; }

    state.line = startLine + 1;
    state.tokens.push({
      type: 'hr',
      lines: [ startLine, state.line ],
      level: state.level
    });

    return true;
  }

  // Lists

  // Search `[-+*][\n ]`, returns next pos arter marker on success
  // or -1 on fail.
  function skipBulletListMarker(state, startLine) {
    var marker, pos, max;

    pos = state.bMarks[startLine] + state.tShift[startLine];
    max = state.eMarks[startLine];

    if (pos >= max) { return -1; }

    marker = state.src.charCodeAt(pos++);
    // Check bullet
    if (marker !== 0x2A/* * */ &&
        marker !== 0x2D/* - */ &&
        marker !== 0x2B/* + */) {
      return -1;
    }

    if (pos < max && state.src.charCodeAt(pos) !== 0x20) {
      // " 1.test " - is not a list item
      return -1;
    }

    return pos;
  }

  // Search `\d+[.)][\n ]`, returns next pos arter marker on success
  // or -1 on fail.
  function skipOrderedListMarker(state, startLine) {
    var ch,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos + 1 >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

    for (;;) {
      // EOL -> fail
      if (pos >= max) { return -1; }

      ch = state.src.charCodeAt(pos++);

      if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {
        continue;
      }

      // found valid marker
      if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
        break;
      }

      return -1;
    }


    if (pos < max && state.src.charCodeAt(pos) !== 0x20/* space */) {
      // " 1.test " - is not a list item
      return -1;
    }
    return pos;
  }

  function markTightParagraphs(state, idx) {
    var i, l,
        level = state.level + 2;

    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
        state.tokens[i + 2].tight = true;
        state.tokens[i].tight = true;
        i += 2;
      }
    }
  }


  function list(state, startLine, endLine, silent) {
    var nextLine,
        indent,
        oldTShift,
        oldIndent,
        oldTight,
        oldParentType,
        start,
        posAfterMarker,
        max,
        indentAfterMarker,
        markerValue,
        markerCharCode,
        isOrdered,
        contentStart,
        listTokIdx,
        prevEmptyEnd,
        listLines,
        itemLines,
        tight = true,
        terminatorRules,
        i, l, terminate;

    // Detect list type and position after marker
    if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
      isOrdered = true;
    } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
      isOrdered = false;
    } else {
      return false;
    }

    if (state.level >= state.options.maxNesting) { return false; }

    // We should terminate list on style change. Remember first one to compare.
    markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

    // For validation mode we can terminate immediately
    if (silent) { return true; }

    // Start list
    listTokIdx = state.tokens.length;

    if (isOrdered) {
      start = state.bMarks[startLine] + state.tShift[startLine];
      markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

      state.tokens.push({
        type: 'ordered_list_open',
        order: markerValue,
        lines: listLines = [ startLine, 0 ],
        level: state.level++
      });

    } else {
      state.tokens.push({
        type: 'bullet_list_open',
        lines: listLines = [ startLine, 0 ],
        level: state.level++
      });
    }

    //
    // Iterate list items
    //

    nextLine = startLine;
    prevEmptyEnd = false;
    terminatorRules = state.parser.ruler.getRules('list');

    while (nextLine < endLine) {
      contentStart = state.skipSpaces(posAfterMarker);
      max = state.eMarks[nextLine];

      if (contentStart >= max) {
        // trimming space in "-    \n  3" case, indent is 1 here
        indentAfterMarker = 1;
      } else {
        indentAfterMarker = contentStart - posAfterMarker;
      }

      // If we have more than 4 spaces, the indent is 1
      // (the rest is just indented code block)
      if (indentAfterMarker > 4) { indentAfterMarker = 1; }

      // If indent is less than 1, assume that it's one, example:
      //  "-\n  test"
      if (indentAfterMarker < 1) { indentAfterMarker = 1; }

      // "  -  test"
      //  ^^^^^ - calculating total length of this thing
      indent = (posAfterMarker - state.bMarks[nextLine]) + indentAfterMarker;

      // Run subparser & write tokens
      state.tokens.push({
        type: 'list_item_open',
        lines: itemLines = [ startLine, 0 ],
        level: state.level++
      });

      oldIndent = state.blkIndent;
      oldTight = state.tight;
      oldTShift = state.tShift[startLine];
      oldParentType = state.parentType;
      state.tShift[startLine] = contentStart - state.bMarks[startLine];
      state.blkIndent = indent;
      state.tight = true;
      state.parentType = 'list';

      state.parser.tokenize(state, startLine, endLine, true);

      // If any of list item is tight, mark list as tight
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      // Item become loose if finish with empty line,
      // but we should filter last element, because it means list finish
      prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

      state.blkIndent = oldIndent;
      state.tShift[startLine] = oldTShift;
      state.tight = oldTight;
      state.parentType = oldParentType;

      state.tokens.push({
        type: 'list_item_close',
        level: --state.level
      });

      nextLine = startLine = state.line;
      itemLines[1] = nextLine;
      contentStart = state.bMarks[startLine];

      if (nextLine >= endLine) { break; }

      if (state.isEmpty(nextLine)) {
        break;
      }

      //
      // Try to check if list is terminated or continued.
      //
      if (state.tShift[nextLine] < state.blkIndent) { break; }

      // fail if terminating block found
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }

      // fail if list has another type
      if (isOrdered) {
        posAfterMarker = skipOrderedListMarker(state, nextLine);
        if (posAfterMarker < 0) { break; }
      } else {
        posAfterMarker = skipBulletListMarker(state, nextLine);
        if (posAfterMarker < 0) { break; }
      }

      if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
    }

    // Finilize list
    state.tokens.push({
      type: isOrdered ? 'ordered_list_close' : 'bullet_list_close',
      level: --state.level
    });
    listLines[1] = nextLine;

    state.line = nextLine;

    // mark paragraphs tight if needed
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }

    return true;
  }

  // Process footnote reference list

  function footnote(state, startLine, endLine, silent) {
    var oldBMark, oldTShift, oldParentType, pos, label,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) { return false; }

    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) { return false; }
    if (silent) { return true; }
    pos++;

    if (!state.env.footnotes) { state.env.footnotes = {}; }
    if (!state.env.footnotes.refs) { state.env.footnotes.refs = {}; }
    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[':' + label] = -1;

    state.tokens.push({
      type: 'footnote_reference_open',
      label: label,
      level: state.level++
    });

    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldParentType = state.parentType;
    state.tShift[startLine] = state.skipSpaces(pos) - pos;
    state.bMarks[startLine] = pos;
    state.blkIndent += 4;
    state.parentType = 'footnote';

    if (state.tShift[startLine] < state.blkIndent) {
      state.tShift[startLine] += state.blkIndent;
      state.bMarks[startLine] -= state.blkIndent;
    }

    state.parser.tokenize(state, startLine, endLine, true);

    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.bMarks[startLine] = oldBMark;

    state.tokens.push({
      type: 'footnote_reference_close',
      level: --state.level
    });

    return true;
  }

  // heading (#, ##, ...)

  function heading(state, startLine, endLine, silent) {
    var ch, level, tmp,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos >= max) { return false; }

    ch  = state.src.charCodeAt(pos);

    if (ch !== 0x23/* # */ || pos >= max) { return false; }

    // count heading level
    level = 1;
    ch = state.src.charCodeAt(++pos);
    while (ch === 0x23/* # */ && pos < max && level <= 6) {
      level++;
      ch = state.src.charCodeAt(++pos);
    }

    if (level > 6 || (pos < max && ch !== 0x20/* space */)) { return false; }

    if (silent) { return true; }

    // Let's cut tails like '    ###  ' from the end of string

    max = state.skipCharsBack(max, 0x20, pos); // space
    tmp = state.skipCharsBack(max, 0x23, pos); // #
    if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20/* space */) {
      max = tmp;
    }

    state.line = startLine + 1;

    state.tokens.push({ type: 'heading_open',
      hLevel: level,
      lines: [ startLine, state.line ],
      level: state.level
    });

    // only if header is not empty
    if (pos < max) {
      state.tokens.push({
        type: 'inline',
        content: state.src.slice(pos, max).trim(),
        level: state.level + 1,
        lines: [ startLine, state.line ],
        children: []
      });
    }
    state.tokens.push({ type: 'heading_close', hLevel: level, level: state.level });

    return true;
  }

  // lheading (---, ===)

  function lheading(state, startLine, endLine/*, silent*/) {
    var marker, pos, max,
        next = startLine + 1;

    if (next >= endLine) { return false; }
    if (state.tShift[next] < state.blkIndent) { return false; }

    // Scan next line

    if (state.tShift[next] - state.blkIndent > 3) { return false; }

    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];

    if (pos >= max) { return false; }

    marker = state.src.charCodeAt(pos);

    if (marker !== 0x2D/* - */ && marker !== 0x3D/* = */) { return false; }

    pos = state.skipChars(pos, marker);

    pos = state.skipSpaces(pos);

    if (pos < max) { return false; }

    pos = state.bMarks[startLine] + state.tShift[startLine];

    state.line = next + 1;
    state.tokens.push({
      type: 'heading_open',
      hLevel: marker === 0x3D/* = */ ? 1 : 2,
      lines: [ startLine, state.line ],
      level: state.level
    });
    state.tokens.push({
      type: 'inline',
      content: state.src.slice(pos, state.eMarks[startLine]).trim(),
      level: state.level + 1,
      lines: [ startLine, state.line - 1 ],
      children: []
    });
    state.tokens.push({
      type: 'heading_close',
      hLevel: marker === 0x3D/* = */ ? 1 : 2,
      level: state.level
    });

    return true;
  }

  // List of valid html blocks names, accorting to commonmark spec
  // http://jgm.github.io/CommonMark/spec.html#html-blocks

  var html_blocks = {};

  [
    'article',
    'aside',
    'button',
    'blockquote',
    'body',
    'canvas',
    'caption',
    'col',
    'colgroup',
    'dd',
    'div',
    'dl',
    'dt',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'iframe',
    'li',
    'map',
    'object',
    'ol',
    'output',
    'p',
    'pre',
    'progress',
    'script',
    'section',
    'style',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'tr',
    'thead',
    'ul',
    'video'
  ].forEach(function (name) { html_blocks[name] = true; });

  // HTML block


  var HTML_TAG_OPEN_RE = /^<([a-zA-Z]{1,15})[\s\/>]/;
  var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z]{1,15})[\s>]/;

  function isLetter$1(ch) {
    /*eslint no-bitwise:0*/
    var lc = ch | 0x20; // to lower case
    return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
  }

  function htmlblock(state, startLine, endLine, silent) {
    var ch, match, nextLine,
        pos = state.bMarks[startLine],
        max = state.eMarks[startLine],
        shift = state.tShift[startLine];

    pos += shift;

    if (!state.options.html) { return false; }

    if (shift > 3 || pos + 2 >= max) { return false; }

    if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x21/* ! */ || ch === 0x3F/* ? */) {
      // Directive start / comment start / processing instruction start
      if (silent) { return true; }

    } else if (ch === 0x2F/* / */ || isLetter$1(ch)) {

      // Probably start or end of tag
      if (ch === 0x2F/* \ */) {
        // closing tag
        match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
        if (!match) { return false; }
      } else {
        // opening tag
        match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
        if (!match) { return false; }
      }
      // Make sure tag name is valid
      if (html_blocks[match[1].toLowerCase()] !== true) { return false; }
      if (silent) { return true; }

    } else {
      return false;
    }

    // If we are here - we detected HTML block.
    // Let's roll down till empty line (block end).
    nextLine = startLine + 1;
    while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
      nextLine++;
    }

    state.line = nextLine;
    state.tokens.push({
      type: 'htmlblock',
      level: state.level,
      lines: [ startLine, state.line ],
      content: state.getLines(startLine, nextLine, 0, true)
    });

    return true;
  }

  // GFM table, non-standard

  function getLine(state, line) {
    var pos = state.bMarks[line] + state.blkIndent,
        max = state.eMarks[line];

    return state.src.substr(pos, max - pos);
  }

  function table(state, startLine, endLine, silent) {
    var ch, lineText, pos, i, nextLine, rows, cell,
        aligns, t, tableLines, tbodyLines;

    // should have at least three lines
    if (startLine + 2 > endLine) { return false; }

    nextLine = startLine + 1;

    if (state.tShift[nextLine] < state.blkIndent) { return false; }

    // first character of the second line should be '|' or '-'

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    if (pos >= state.eMarks[nextLine]) { return false; }

    ch = state.src.charCodeAt(pos);
    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

    lineText = getLine(state, startLine + 1);
    if (!/^[-:| ]+$/.test(lineText)) { return false; }

    rows = lineText.split('|');
    if (rows <= 2) { return false; }
    aligns = [];
    for (i = 0; i < rows.length; i++) {
      t = rows[i].trim();
      if (!t) {
        // allow empty columns before and after table, but not in between columns;
        // e.g. allow ` |---| `, disallow ` ---||--- `
        if (i === 0 || i === rows.length - 1) {
          continue;
        } else {
          return false;
        }
      }

      if (!/^:?-+:?$/.test(t)) { return false; }
      if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
        aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
      } else if (t.charCodeAt(0) === 0x3A/* : */) {
        aligns.push('left');
      } else {
        aligns.push('');
      }
    }

    lineText = getLine(state, startLine).trim();
    if (lineText.indexOf('|') === -1) { return false; }
    rows = lineText.replace(/^\||\|$/g, '').split('|');
    if (aligns.length !== rows.length) { return false; }
    if (silent) { return true; }

    state.tokens.push({
      type: 'table_open',
      lines: tableLines = [ startLine, 0 ],
      level: state.level++
    });
    state.tokens.push({
      type: 'thead_open',
      lines: [ startLine, startLine + 1 ],
      level: state.level++
    });

    state.tokens.push({
      type: 'tr_open',
      lines: [ startLine, startLine + 1 ],
      level: state.level++
    });
    for (i = 0; i < rows.length; i++) {
      state.tokens.push({
        type: 'th_open',
        align: aligns[i],
        lines: [ startLine, startLine + 1 ],
        level: state.level++
      });
      state.tokens.push({
        type: 'inline',
        content: rows[i].trim(),
        lines: [ startLine, startLine + 1 ],
        level: state.level,
        children: []
      });
      state.tokens.push({ type: 'th_close', level: --state.level });
    }
    state.tokens.push({ type: 'tr_close', level: --state.level });
    state.tokens.push({ type: 'thead_close', level: --state.level });

    state.tokens.push({
      type: 'tbody_open',
      lines: tbodyLines = [ startLine + 2, 0 ],
      level: state.level++
    });

    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
      if (state.tShift[nextLine] < state.blkIndent) { break; }

      lineText = getLine(state, nextLine).trim();
      if (lineText.indexOf('|') === -1) { break; }
      rows = lineText.replace(/^\||\|$/g, '').split('|');

      state.tokens.push({ type: 'tr_open', level: state.level++ });
      for (i = 0; i < rows.length; i++) {
        state.tokens.push({ type: 'td_open', align: aligns[i], level: state.level++ });
        // 0x7c === '|'
        cell = rows[i].substring(
            rows[i].charCodeAt(0) === 0x7c ? 1 : 0,
            rows[i].charCodeAt(rows[i].length - 1) === 0x7c ? rows[i].length - 1 : rows[i].length
        ).trim();
        state.tokens.push({
          type: 'inline',
          content: cell,
          level: state.level,
          children: []
        });
        state.tokens.push({ type: 'td_close', level: --state.level });
      }
      state.tokens.push({ type: 'tr_close', level: --state.level });
    }
    state.tokens.push({ type: 'tbody_close', level: --state.level });
    state.tokens.push({ type: 'table_close', level: --state.level });

    tableLines[1] = tbodyLines[1] = nextLine;
    state.line = nextLine;
    return true;
  }

  // Definition lists

  // Search `[:~][\n ]`, returns next pos after marker on success
  // or -1 on fail.
  function skipMarker(state, line) {
    var pos, marker,
        start = state.bMarks[line] + state.tShift[line],
        max = state.eMarks[line];

    if (start >= max) { return -1; }

    // Check bullet
    marker = state.src.charCodeAt(start++);
    if (marker !== 0x7E/* ~ */ && marker !== 0x3A/* : */) { return -1; }

    pos = state.skipSpaces(start);

    // require space after ":"
    if (start === pos) { return -1; }

    // no empty definitions, e.g. "  : "
    if (pos >= max) { return -1; }

    return pos;
  }

  function markTightParagraphs$1(state, idx) {
    var i, l,
        level = state.level + 2;

    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
        state.tokens[i + 2].tight = true;
        state.tokens[i].tight = true;
        i += 2;
      }
    }
  }

  function deflist(state, startLine, endLine, silent) {
    var contentStart,
        ddLine,
        dtLine,
        itemLines,
        listLines,
        listTokIdx,
        nextLine,
        oldIndent,
        oldDDIndent,
        oldParentType,
        oldTShift,
        oldTight,
        prevEmptyEnd,
        tight;

    if (silent) {
      // quirk: validation mode validates a dd block only, not a whole deflist
      if (state.ddIndent < 0) { return false; }
      return skipMarker(state, startLine) >= 0;
    }

    nextLine = startLine + 1;
    if (state.isEmpty(nextLine)) {
      if (++nextLine > endLine) { return false; }
    }

    if (state.tShift[nextLine] < state.blkIndent) { return false; }
    contentStart = skipMarker(state, nextLine);
    if (contentStart < 0) { return false; }

    if (state.level >= state.options.maxNesting) { return false; }

    // Start list
    listTokIdx = state.tokens.length;

    state.tokens.push({
      type: 'dl_open',
      lines: listLines = [ startLine, 0 ],
      level: state.level++
    });

    //
    // Iterate list items
    //

    dtLine = startLine;
    ddLine = nextLine;

    // One definition list can contain multiple DTs,
    // and one DT can be followed by multiple DDs.
    //
    // Thus, there is two loops here, and label is
    // needed to break out of the second one
    //
    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    for (;;) {
      tight = true;
      prevEmptyEnd = false;

      state.tokens.push({
        type: 'dt_open',
        lines: [ dtLine, dtLine ],
        level: state.level++
      });
      state.tokens.push({
        type: 'inline',
        content: state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim(),
        level: state.level + 1,
        lines: [ dtLine, dtLine ],
        children: []
      });
      state.tokens.push({
        type: 'dt_close',
        level: --state.level
      });

      for (;;) {
        state.tokens.push({
          type: 'dd_open',
          lines: itemLines = [ nextLine, 0 ],
          level: state.level++
        });

        oldTight = state.tight;
        oldDDIndent = state.ddIndent;
        oldIndent = state.blkIndent;
        oldTShift = state.tShift[ddLine];
        oldParentType = state.parentType;
        state.blkIndent = state.ddIndent = state.tShift[ddLine] + 2;
        state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
        state.tight = true;
        state.parentType = 'deflist';

        state.parser.tokenize(state, ddLine, endLine, true);

        // If any of list item is tight, mark list as tight
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        // Item become loose if finish with empty line,
        // but we should filter last element, because it means list finish
        prevEmptyEnd = (state.line - ddLine) > 1 && state.isEmpty(state.line - 1);

        state.tShift[ddLine] = oldTShift;
        state.tight = oldTight;
        state.parentType = oldParentType;
        state.blkIndent = oldIndent;
        state.ddIndent = oldDDIndent;

        state.tokens.push({
          type: 'dd_close',
          level: --state.level
        });

        itemLines[1] = nextLine = state.line;

        if (nextLine >= endLine) { break OUTER; }

        if (state.tShift[nextLine] < state.blkIndent) { break OUTER; }
        contentStart = skipMarker(state, nextLine);
        if (contentStart < 0) { break; }

        ddLine = nextLine;

        // go to the next loop iteration:
        // insert DD tag and repeat checking
      }

      if (nextLine >= endLine) { break; }
      dtLine = nextLine;

      if (state.isEmpty(dtLine)) { break; }
      if (state.tShift[dtLine] < state.blkIndent) { break; }

      ddLine = dtLine + 1;
      if (ddLine >= endLine) { break; }
      if (state.isEmpty(ddLine)) { ddLine++; }
      if (ddLine >= endLine) { break; }

      if (state.tShift[ddLine] < state.blkIndent) { break; }
      contentStart = skipMarker(state, ddLine);
      if (contentStart < 0) { break; }

      // go to the next loop iteration:
      // insert DT and DD tags and repeat checking
    }

    // Finilize list
    state.tokens.push({
      type: 'dl_close',
      level: --state.level
    });
    listLines[1] = nextLine;

    state.line = nextLine;

    // mark paragraphs tight if needed
    if (tight) {
      markTightParagraphs$1(state, listTokIdx);
    }

    return true;
  }

  // Paragraph

  function paragraph(state, startLine/*, endLine*/) {
    var endLine, content, terminate, i, l,
        nextLine = startLine + 1,
        terminatorRules;

    endLine = state.lineMax;

    // jump line-by-line until empty one or EOF
    if (nextLine < endLine && !state.isEmpty(nextLine)) {
      terminatorRules = state.parser.ruler.getRules('paragraph');

      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        // this would be a code block normally, but after paragraph
        // it's considered a lazy continuation regardless of what's there
        if (state.tShift[nextLine] - state.blkIndent > 3) { continue; }

        // Some tags can terminate paragraph without empty line.
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) { break; }
      }
    }

    content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

    state.line = nextLine;
    if (content.length) {
      state.tokens.push({
        type: 'paragraph_open',
        tight: false,
        lines: [ startLine, state.line ],
        level: state.level
      });
      state.tokens.push({
        type: 'inline',
        content: content,
        level: state.level + 1,
        lines: [ startLine, state.line ],
        children: []
      });
      state.tokens.push({
        type: 'paragraph_close',
        tight: false,
        level: state.level
      });
    }

    return true;
  }

  /**
   * Parser rules
   */

  var _rules$1 = [
    [ 'code',       code ],
    [ 'fences',     fences,     [ 'paragraph', 'blockquote', 'list' ] ],
    [ 'blockquote', blockquote, [ 'paragraph', 'blockquote', 'list' ] ],
    [ 'hr',         hr,         [ 'paragraph', 'blockquote', 'list' ] ],
    [ 'list',       list,       [ 'paragraph', 'blockquote' ] ],
    [ 'footnote',   footnote,   [ 'paragraph' ] ],
    [ 'heading',    heading,    [ 'paragraph', 'blockquote' ] ],
    [ 'lheading',   lheading ],
    [ 'htmlblock',  htmlblock,  [ 'paragraph', 'blockquote' ] ],
    [ 'table',      table,      [ 'paragraph' ] ],
    [ 'deflist',    deflist,    [ 'paragraph' ] ],
    [ 'paragraph',  paragraph ]
  ];

  /**
   * Block Parser class
   *
   * @api private
   */

  function ParserBlock() {
    this.ruler = new Ruler();
    for (var i = 0; i < _rules$1.length; i++) {
      this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
        alt: (_rules$1[i][2] || []).slice()
      });
    }
  }

  /**
   * Generate tokens for the given input range.
   *
   * @param  {Object} `state` Has properties like `src`, `parser`, `options` etc
   * @param  {Number} `startLine`
   * @param  {Number} `endLine`
   * @api private
   */

  ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
    var rules = this.ruler.getRules('');
    var len = rules.length;
    var line = startLine;
    var hasEmptyLines = false;
    var ok, i;

    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) {
        break;
      }

      // Termination condition for nested calls.
      // Nested calls currently used for blockquotes & lists
      if (state.tShift[line] < state.blkIndent) {
        break;
      }

      // Try all possible rules.
      // On success, rule should:
      //
      // - update `state.line`
      // - update `state.tokens`
      // - return true

      for (i = 0; i < len; i++) {
        ok = rules[i](state, line, endLine, false);
        if (ok) {
          break;
        }
      }

      // set state.tight iff we had an empty line before current tag
      // i.e. latest empty line should not count
      state.tight = !hasEmptyLines;

      // paragraph might "eat" one newline after it in nested lists
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }

      line = state.line;

      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;

        // two empty lines should stop the parser in list mode
        if (line < endLine && state.parentType === 'list' && state.isEmpty(line)) { break; }
        state.line = line;
      }
    }
  };

  var TABS_SCAN_RE = /[\n\t]/g;
  var NEWLINES_RE  = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
  var SPACES_RE    = /\u00a0/g;

  /**
   * Tokenize the given `str`.
   *
   * @param  {String} `str` Source string
   * @param  {Object} `options`
   * @param  {Object} `env`
   * @param  {Array} `outTokens`
   * @api private
   */

  ParserBlock.prototype.parse = function (str, options, env, outTokens) {
    var state, lineStart = 0, lastTabPos = 0;
    if (!str) { return []; }

    // Normalize spaces
    str = str.replace(SPACES_RE, ' ');

    // Normalize newlines
    str = str.replace(NEWLINES_RE, '\n');

    // Replace tabs with proper number of spaces (1..4)
    if (str.indexOf('\t') >= 0) {
      str = str.replace(TABS_SCAN_RE, function (match, offset) {
        var result;
        if (str.charCodeAt(offset) === 0x0A) {
          lineStart = offset + 1;
          lastTabPos = 0;
          return match;
        }
        result = '    '.slice((offset - lineStart - lastTabPos) % 4);
        lastTabPos = offset - lineStart + 1;
        return result;
      });
    }

    state = new StateBlock(str, this, options, env, outTokens);
    this.tokenize(state, state.line, state.lineMax);
  };

  // Skip text characters for text token, place those to pending buffer
  // and increment current pos

  // Rule to skip pure text
  // '{}$%@~+=:' reserved for extentions

  function isTerminatorChar(ch) {
    switch (ch) {
      case 0x0A/* \n */:
      case 0x5C/* \ */:
      case 0x60/* ` */:
      case 0x2A/* * */:
      case 0x5F/* _ */:
      case 0x5E/* ^ */:
      case 0x5B/* [ */:
      case 0x5D/* ] */:
      case 0x21/* ! */:
      case 0x26/* & */:
      case 0x3C/* < */:
      case 0x3E/* > */:
      case 0x7B/* { */:
      case 0x7D/* } */:
      case 0x24/* $ */:
      case 0x25/* % */:
      case 0x40/* @ */:
      case 0x7E/* ~ */:
      case 0x2B/* + */:
      case 0x3D/* = */:
      case 0x3A/* : */:
        return true;
      default:
        return false;
    }
  }

  function text(state, silent) {
    var pos = state.pos;

    while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
      pos++;
    }

    if (pos === state.pos) { return false; }

    if (!silent) { state.pending += state.src.slice(state.pos, pos); }

    state.pos = pos;

    return true;
  }

  // Proceess '\n'

  function newline(state, silent) {
    var pmax, max, pos = state.pos;

    if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

    pmax = state.pending.length - 1;
    max = state.posMax;

    // '  \n' -> hardbreak
    // Lookup in pending chars is bad practice! Don't copy to other rules!
    // Pending string is stored in concat mode, indexed lookups will cause
    // convertion to flat mode.
    if (!silent) {
      if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
        if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
          // Strip out all trailing spaces on this line.
          for (var i = pmax - 2; i >= 0; i--) {
            if (state.pending.charCodeAt(i) !== 0x20) {
              state.pending = state.pending.substring(0, i + 1);
              break;
            }
          }
          state.push({
            type: 'hardbreak',
            level: state.level
          });
        } else {
          state.pending = state.pending.slice(0, -1);
          state.push({
            type: 'softbreak',
            level: state.level
          });
        }

      } else {
        state.push({
          type: 'softbreak',
          level: state.level
        });
      }
    }

    pos++;

    // skip heading spaces for next line
    while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }

    state.pos = pos;
    return true;
  }

  // Proceess escaped chars and hardbreaks

  var ESCAPED = [];

  for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

  '\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
    .split('').forEach(function(ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


  function escape(state, silent) {
    var ch, pos = state.pos, max = state.posMax;

    if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

    pos++;

    if (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch < 256 && ESCAPED[ch] !== 0) {
        if (!silent) { state.pending += state.src[pos]; }
        state.pos += 2;
        return true;
      }

      if (ch === 0x0A) {
        if (!silent) {
          state.push({
            type: 'hardbreak',
            level: state.level
          });
        }

        pos++;
        // skip leading whitespaces from next line
        while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }

        state.pos = pos;
        return true;
      }
    }

    if (!silent) { state.pending += '\\'; }
    state.pos++;
    return true;
  }

  // Parse backticks

  function backticks(state, silent) {
    var start, max, marker, matchStart, matchEnd,
        pos = state.pos,
        ch = state.src.charCodeAt(pos);

    if (ch !== 0x60/* ` */) { return false; }

    start = pos;
    pos++;
    max = state.posMax;

    while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

    marker = state.src.slice(start, pos);

    matchStart = matchEnd = pos;

    while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
      matchEnd = matchStart + 1;

      while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

      if (matchEnd - matchStart === marker.length) {
        if (!silent) {
          state.push({
            type: 'code',
            content: state.src.slice(pos, matchStart)
                                .replace(/[ \n]+/g, ' ')
                                .trim(),
            block: false,
            level: state.level
          });
        }
        state.pos = matchEnd;
        return true;
      }
    }

    if (!silent) { state.pending += marker; }
    state.pos += marker.length;
    return true;
  }

  // Process ~~deleted text~~

  function del(state, silent) {
    var found,
        pos,
        stack,
        max = state.posMax,
        start = state.pos,
        lastChar,
        nextChar;

    if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 4 >= max) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x7E/* ~ */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);

    if (lastChar === 0x7E/* ~ */) { return false; }
    if (nextChar === 0x7E/* ~ */) { return false; }
    if (nextChar === 0x20 || nextChar === 0x0A) { return false; }

    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 0x7E/* ~ */) { pos++; }
    if (pos > start + 3) {
      // sequence of 4+ markers taking as literal, same as in a emphasis
      state.pos += pos - start;
      if (!silent) { state.pending += state.src.slice(start, pos); }
      return true;
    }

    state.pos = start + 2;
    stack = 1;

    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x7E/* ~ */) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 0x7E/* ~ */ && lastChar !== 0x7E/* ~ */) {
            if (lastChar !== 0x20 && lastChar !== 0x0A) {
              // closing '~~'
              stack--;
            } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
              // opening '~~'
              stack++;
            } // else {
              //  // standalone ' ~~ ' indented with spaces
              // }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }

      state.parser.skipToken(state);
    }

    if (!found) {
      // parser failed to find ending tag, so it's not valid emphasis
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 2;

    if (!silent) {
      state.push({ type: 'del_open', level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: 'del_close', level: --state.level });
    }

    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }

  // Process ++inserted text++

  function ins(state, silent) {
    var found,
        pos,
        stack,
        max = state.posMax,
        start = state.pos,
        lastChar,
        nextChar;

    if (state.src.charCodeAt(start) !== 0x2B/* + */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 4 >= max) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x2B/* + */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);

    if (lastChar === 0x2B/* + */) { return false; }
    if (nextChar === 0x2B/* + */) { return false; }
    if (nextChar === 0x20 || nextChar === 0x0A) { return false; }

    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 0x2B/* + */) { pos++; }
    if (pos !== start + 2) {
      // sequence of 3+ markers taking as literal, same as in a emphasis
      state.pos += pos - start;
      if (!silent) { state.pending += state.src.slice(start, pos); }
      return true;
    }

    state.pos = start + 2;
    stack = 1;

    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 0x2B/* + */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x2B/* + */) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 0x2B/* + */ && lastChar !== 0x2B/* + */) {
            if (lastChar !== 0x20 && lastChar !== 0x0A) {
              // closing '++'
              stack--;
            } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
              // opening '++'
              stack++;
            } // else {
              //  // standalone ' ++ ' indented with spaces
              // }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }

      state.parser.skipToken(state);
    }

    if (!found) {
      // parser failed to find ending tag, so it's not valid emphasis
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 2;

    if (!silent) {
      state.push({ type: 'ins_open', level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: 'ins_close', level: --state.level });
    }

    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }

  // Process ==highlighted text==

  function mark(state, silent) {
    var found,
        pos,
        stack,
        max = state.posMax,
        start = state.pos,
        lastChar,
        nextChar;

    if (state.src.charCodeAt(start) !== 0x3D/* = */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 4 >= max) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x3D/* = */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);

    if (lastChar === 0x3D/* = */) { return false; }
    if (nextChar === 0x3D/* = */) { return false; }
    if (nextChar === 0x20 || nextChar === 0x0A) { return false; }

    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 0x3D/* = */) { pos++; }
    if (pos !== start + 2) {
      // sequence of 3+ markers taking as literal, same as in a emphasis
      state.pos += pos - start;
      if (!silent) { state.pending += state.src.slice(start, pos); }
      return true;
    }

    state.pos = start + 2;
    stack = 1;

    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 0x3D/* = */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x3D/* = */) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 0x3D/* = */ && lastChar !== 0x3D/* = */) {
            if (lastChar !== 0x20 && lastChar !== 0x0A) {
              // closing '=='
              stack--;
            } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
              // opening '=='
              stack++;
            } // else {
              //  // standalone ' == ' indented with spaces
              // }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }

      state.parser.skipToken(state);
    }

    if (!found) {
      // parser failed to find ending tag, so it's not valid emphasis
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 2;

    if (!silent) {
      state.push({ type: 'mark_open', level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: 'mark_close', level: --state.level });
    }

    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }

  // Process *this* and _that_

  function isAlphaNum(code) {
    return (code >= 0x30 /* 0 */ && code <= 0x39 /* 9 */) ||
           (code >= 0x41 /* A */ && code <= 0x5A /* Z */) ||
           (code >= 0x61 /* a */ && code <= 0x7A /* z */);
  }

  // parse sequence of emphasis markers,
  // "start" should point at a valid marker
  function scanDelims(state, start) {
    var pos = start, lastChar, nextChar, count,
        can_open = true,
        can_close = true,
        max = state.posMax,
        marker = state.src.charCodeAt(start);

    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;

    while (pos < max && state.src.charCodeAt(pos) === marker) { pos++; }
    if (pos >= max) { can_open = false; }
    count = pos - start;

    if (count >= 4) {
      // sequence of four or more unescaped markers can't start/end an emphasis
      can_open = can_close = false;
    } else {
      nextChar = pos < max ? state.src.charCodeAt(pos) : -1;

      // check whitespace conditions
      if (nextChar === 0x20 || nextChar === 0x0A) { can_open = false; }
      if (lastChar === 0x20 || lastChar === 0x0A) { can_close = false; }

      if (marker === 0x5F /* _ */) {
        // check if we aren't inside the word
        if (isAlphaNum(lastChar)) { can_open = false; }
        if (isAlphaNum(nextChar)) { can_close = false; }
      }
    }

    return {
      can_open: can_open,
      can_close: can_close,
      delims: count
    };
  }

  function emphasis(state, silent) {
    var startCount,
        count,
        found,
        oldCount,
        newCount,
        stack,
        res,
        max = state.posMax,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (marker !== 0x5F/* _ */ && marker !== 0x2A /* * */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode

    res = scanDelims(state, start);
    startCount = res.delims;
    if (!res.can_open) {
      state.pos += startCount;
      if (!silent) { state.pending += state.src.slice(start, state.pos); }
      return true;
    }

    if (state.level >= state.options.maxNesting) { return false; }

    state.pos = start + startCount;
    stack = [ startCount ];

    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === marker) {
        res = scanDelims(state, state.pos);
        count = res.delims;
        if (res.can_close) {
          oldCount = stack.pop();
          newCount = count;

          while (oldCount !== newCount) {
            if (newCount < oldCount) {
              stack.push(oldCount - newCount);
              break;
            }

            // assert(newCount > oldCount)
            newCount -= oldCount;

            if (stack.length === 0) { break; }
            state.pos += oldCount;
            oldCount = stack.pop();
          }

          if (stack.length === 0) {
            startCount = oldCount;
            found = true;
            break;
          }
          state.pos += count;
          continue;
        }

        if (res.can_open) { stack.push(count); }
        state.pos += count;
        continue;
      }

      state.parser.skipToken(state);
    }

    if (!found) {
      // parser failed to find ending tag, so it's not valid emphasis
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + startCount;

    if (!silent) {
      if (startCount === 2 || startCount === 3) {
        state.push({ type: 'strong_open', level: state.level++ });
      }
      if (startCount === 1 || startCount === 3) {
        state.push({ type: 'em_open', level: state.level++ });
      }

      state.parser.tokenize(state);

      if (startCount === 1 || startCount === 3) {
        state.push({ type: 'em_close', level: --state.level });
      }
      if (startCount === 2 || startCount === 3) {
        state.push({ type: 'strong_close', level: --state.level });
      }
    }

    state.pos = state.posMax + startCount;
    state.posMax = max;
    return true;
  }

  // Process ~subscript~

  // same as UNESCAPE_MD_RE plus a space
  var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

  function sub(state, silent) {
    var found,
        content,
        max = state.posMax,
        start = state.pos;

    if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 2 >= max) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    state.pos = start + 1;

    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
        found = true;
        break;
      }

      state.parser.skipToken(state);
    }

    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }

    content = state.src.slice(start + 1, state.pos);

    // don't allow unescaped spaces/newlines inside
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 1;

    if (!silent) {
      state.push({
        type: 'sub',
        level: state.level,
        content: content.replace(UNESCAPE_RE, '$1')
      });
    }

    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }

  // Process ^superscript^

  // same as UNESCAPE_MD_RE plus a space
  var UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

  function sup(state, silent) {
    var found,
        content,
        max = state.posMax,
        start = state.pos;

    if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 2 >= max) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    state.pos = start + 1;

    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 0x5E/* ^ */) {
        found = true;
        break;
      }

      state.parser.skipToken(state);
    }

    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }

    content = state.src.slice(start + 1, state.pos);

    // don't allow unescaped spaces/newlines inside
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 1;

    if (!silent) {
      state.push({
        type: 'sup',
        level: state.level,
        content: content.replace(UNESCAPE_RE$1, '$1')
      });
    }

    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }

  // Process [links](<to> "stuff")


  function links(state, silent) {
    var labelStart,
        labelEnd,
        label,
        href,
        title,
        pos,
        ref,
        code,
        isImage = false,
        oldPos = state.pos,
        max = state.posMax,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (marker === 0x21/* ! */) {
      isImage = true;
      marker = state.src.charCodeAt(++start);
    }

    if (marker !== 0x5B/* [ */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    labelStart = start + 1;
    labelEnd = parseLinkLabel(state, start);

    // parser failed to find ']', so it's not a valid link
    if (labelEnd < 0) { return false; }

    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
      //
      // Inline link
      //

      // [link](  <href>  "title"  )
      //        ^^ skipping these spaces
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) { break; }
      }
      if (pos >= max) { return false; }

      // [link](  <href>  "title"  )
      //          ^^^^^^ parsing link destination
      start = pos;
      if (parseLinkDestination(state, pos)) {
        href = state.linkContent;
        pos = state.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) { break; }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
        title = state.linkContent;
        pos = state.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (code !== 0x20 && code !== 0x0A) { break; }
        }
      } else {
        title = '';
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      //
      // Link reference
      //

      // do not allow nested reference links
      if (state.linkLevel > 0) { return false; }

      // [foo]  [bar]
      //      ^^ optional whitespace (can include newlines)
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) { break; }
      }

      if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
        start = pos + 1;
        pos = parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = start - 1;
        }
      }

      // covers label === '' and label === undefined
      // (collapsed reference link and shortcut reference link respectively)
      if (!label) {
        if (typeof label === 'undefined') {
          pos = labelEnd + 1;
        }
        label = state.src.slice(labelStart, labelEnd);
      }

      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }

    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;

      if (isImage) {
        state.push({
          type: 'image',
          src: href,
          title: title,
          alt: state.src.substr(labelStart, labelEnd - labelStart),
          level: state.level
        });
      } else {
        state.push({
          type: 'link_open',
          href: href,
          title: title,
          level: state.level++
        });
        state.linkLevel++;
        state.parser.tokenize(state);
        state.linkLevel--;
        state.push({ type: 'link_close', level: --state.level });
      }
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // Process inline footnotes (^[...])


  function footnote_inline(state, silent) {
    var labelStart,
        labelEnd,
        footnoteId,
        oldLength,
        max = state.posMax,
        start = state.pos;

    if (start + 2 >= max) { return false; }
    if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5B/* [ */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1);

    // parser failed to find ']', so it's not a valid note
    if (labelEnd < 0) { return false; }

    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      if (!state.env.footnotes) { state.env.footnotes = {}; }
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
      footnoteId = state.env.footnotes.list.length;

      state.pos = labelStart;
      state.posMax = labelEnd;

      state.push({
        type: 'footnote_ref',
        id: footnoteId,
        level: state.level
      });
      state.linkLevel++;
      oldLength = state.tokens.length;
      state.parser.tokenize(state);
      state.env.footnotes.list[footnoteId] = { tokens: state.tokens.splice(oldLength) };
      state.linkLevel--;
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  }

  // Process footnote references ([^...])

  function footnote_ref(state, silent) {
    var label,
        pos,
        footnoteId,
        footnoteSubId,
        max = state.posMax,
        start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) { return false; }

    if (!state.env.footnotes || !state.env.footnotes.refs) { return false; }
    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x0A) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos >= max) { return false; }
    pos++;

    label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[':' + label] === 'undefined') { return false; }

    if (!silent) {
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }

      if (state.env.footnotes.refs[':' + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
        state.env.footnotes.refs[':' + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[':' + label];
      }

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;

      state.push({
        type: 'footnote_ref',
        id: footnoteId,
        subId: footnoteSubId,
        level: state.level
      });
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // List of valid url schemas, accorting to commonmark spec
  // http://jgm.github.io/CommonMark/spec.html#autolinks

  var url_schemas = [
    'coap',
    'doi',
    'javascript',
    'aaa',
    'aaas',
    'about',
    'acap',
    'cap',
    'cid',
    'crid',
    'data',
    'dav',
    'dict',
    'dns',
    'file',
    'ftp',
    'geo',
    'go',
    'gopher',
    'h323',
    'http',
    'https',
    'iax',
    'icap',
    'im',
    'imap',
    'info',
    'ipp',
    'iris',
    'iris.beep',
    'iris.xpc',
    'iris.xpcs',
    'iris.lwz',
    'ldap',
    'mailto',
    'mid',
    'msrp',
    'msrps',
    'mtqp',
    'mupdate',
    'news',
    'nfs',
    'ni',
    'nih',
    'nntp',
    'opaquelocktoken',
    'pop',
    'pres',
    'rtsp',
    'service',
    'session',
    'shttp',
    'sieve',
    'sip',
    'sips',
    'sms',
    'snmp',
    'soap.beep',
    'soap.beeps',
    'tag',
    'tel',
    'telnet',
    'tftp',
    'thismessage',
    'tn3270',
    'tip',
    'tv',
    'urn',
    'vemmi',
    'ws',
    'wss',
    'xcon',
    'xcon-userid',
    'xmlrpc.beep',
    'xmlrpc.beeps',
    'xmpp',
    'z39.50r',
    'z39.50s',
    'adiumxtra',
    'afp',
    'afs',
    'aim',
    'apt',
    'attachment',
    'aw',
    'beshare',
    'bitcoin',
    'bolo',
    'callto',
    'chrome',
    'chrome-extension',
    'com-eventbrite-attendee',
    'content',
    'cvs',
    'dlna-playsingle',
    'dlna-playcontainer',
    'dtn',
    'dvb',
    'ed2k',
    'facetime',
    'feed',
    'finger',
    'fish',
    'gg',
    'git',
    'gizmoproject',
    'gtalk',
    'hcp',
    'icon',
    'ipn',
    'irc',
    'irc6',
    'ircs',
    'itms',
    'jar',
    'jms',
    'keyparc',
    'lastfm',
    'ldaps',
    'magnet',
    'maps',
    'market',
    'message',
    'mms',
    'ms-help',
    'msnim',
    'mumble',
    'mvn',
    'notes',
    'oid',
    'palm',
    'paparazzi',
    'platform',
    'proxy',
    'psyc',
    'query',
    'res',
    'resource',
    'rmi',
    'rsync',
    'rtmp',
    'secondlife',
    'sftp',
    'sgn',
    'skype',
    'smb',
    'soldat',
    'spotify',
    'ssh',
    'steam',
    'svn',
    'teamspeak',
    'things',
    'udp',
    'unreal',
    'ut2004',
    'ventrilo',
    'view-source',
    'webcal',
    'wtai',
    'wyciwyg',
    'xfire',
    'xri',
    'ymsgr'
  ];

  // Process autolinks '<protocol:...>'


  /*eslint max-len:0*/
  var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
  var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;


  function autolink(state, silent) {
    var tail, linkMatch, emailMatch, url, fullUrl, pos = state.pos;

    if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

    tail = state.src.slice(pos);

    if (tail.indexOf('>') < 0) { return false; }

    linkMatch = tail.match(AUTOLINK_RE);

    if (linkMatch) {
      if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) { return false; }

      url = linkMatch[0].slice(1, -1);
      fullUrl = normalizeLink(url);
      if (!state.parser.validateLink(url)) { return false; }

      if (!silent) {
        state.push({
          type: 'link_open',
          href: fullUrl,
          level: state.level
        });
        state.push({
          type: 'text',
          content: url,
          level: state.level + 1
        });
        state.push({ type: 'link_close', level: state.level });
      }

      state.pos += linkMatch[0].length;
      return true;
    }

    emailMatch = tail.match(EMAIL_RE);

    if (emailMatch) {

      url = emailMatch[0].slice(1, -1);

      fullUrl = normalizeLink('mailto:' + url);
      if (!state.parser.validateLink(fullUrl)) { return false; }

      if (!silent) {
        state.push({
          type: 'link_open',
          href: fullUrl,
          level: state.level
        });
        state.push({
          type: 'text',
          content: url,
          level: state.level + 1
        });
        state.push({ type: 'link_close', level: state.level });
      }

      state.pos += emailMatch[0].length;
      return true;
    }

    return false;
  }

  // Regexps to match html elements

  function replace$1(regex, options) {
    regex = regex.source;
    options = options || '';

    return function self(name, val) {
      if (!name) {
        return new RegExp(regex, options);
      }
      val = val.source || val;
      regex = regex.replace(name, val);
      return self;
    };
  }


  var attr_name     = /[a-zA-Z_:][a-zA-Z0-9:._-]*/;

  var unquoted      = /[^"'=<>`\x00-\x20]+/;
  var single_quoted = /'[^']*'/;
  var double_quoted = /"[^"]*"/;

  /*eslint no-spaced-func:0*/
  var attr_value  = replace$1(/(?:unquoted|single_quoted|double_quoted)/)
                      ('unquoted', unquoted)
                      ('single_quoted', single_quoted)
                      ('double_quoted', double_quoted)
                      ();

  var attribute   = replace$1(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)
                      ('attr_name', attr_name)
                      ('attr_value', attr_value)
                      ();

  var open_tag    = replace$1(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)
                      ('attribute', attribute)
                      ();

  var close_tag   = /<\/[A-Za-z][A-Za-z0-9]*\s*>/;
  var comment     = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/;
  var processing  = /<[?].*?[?]>/;
  var declaration = /<![A-Z]+\s+[^>]*>/;
  var cdata       = /<!\[CDATA\[[\s\S]*?\]\]>/;

  var HTML_TAG_RE = replace$1(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)
    ('open_tag', open_tag)
    ('close_tag', close_tag)
    ('comment', comment)
    ('processing', processing)
    ('declaration', declaration)
    ('cdata', cdata)
    ();

  // Process html tags


  function isLetter$2(ch) {
    /*eslint no-bitwise:0*/
    var lc = ch | 0x20; // to lower case
    return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
  }


  function htmltag(state, silent) {
    var ch, match, max, pos = state.pos;

    if (!state.options.html) { return false; }

    // Check start
    max = state.posMax;
    if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
        pos + 2 >= max) {
      return false;
    }

    // Quick fail on second char
    ch = state.src.charCodeAt(pos + 1);
    if (ch !== 0x21/* ! */ &&
        ch !== 0x3F/* ? */ &&
        ch !== 0x2F/* / */ &&
        !isLetter$2(ch)) {
      return false;
    }

    match = state.src.slice(pos).match(HTML_TAG_RE);
    if (!match) { return false; }

    if (!silent) {
      state.push({
        type: 'htmltag',
        content: state.src.slice(pos, pos + match[0].length),
        level: state.level
      });
    }
    state.pos += match[0].length;
    return true;
  }

  // Process html entity - &#123;, &#xAF;, &quot;, ...


  var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
  var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


  function entity(state, silent) {
    var ch, code, match, pos = state.pos, max = state.posMax;

    if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

    if (pos + 1 < max) {
      ch = state.src.charCodeAt(pos + 1);

      if (ch === 0x23 /* # */) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          var decoded = decodeEntity(match[1]);
          if (match[1] !== decoded) {
            if (!silent) { state.pending += decoded; }
            state.pos += match[0].length;
            return true;
          }
        }
      }
    }

    if (!silent) { state.pending += '&'; }
    state.pos++;
    return true;
  }

  /**
   * Inline Parser `rules`
   */

  var _rules$2 = [
    [ 'text',            text ],
    [ 'newline',         newline ],
    [ 'escape',          escape ],
    [ 'backticks',       backticks ],
    [ 'del',             del ],
    [ 'ins',             ins ],
    [ 'mark',            mark ],
    [ 'emphasis',        emphasis ],
    [ 'sub',             sub ],
    [ 'sup',             sup ],
    [ 'links',           links ],
    [ 'footnote_inline', footnote_inline ],
    [ 'footnote_ref',    footnote_ref ],
    [ 'autolink',        autolink ],
    [ 'htmltag',         htmltag ],
    [ 'entity',          entity ]
  ];

  /**
   * Inline Parser class. Note that link validation is stricter
   * in Remarkable than what is specified by CommonMark. If you
   * want to change this you can use a custom validator.
   *
   * @api private
   */

  function ParserInline() {
    this.ruler = new Ruler();
    for (var i = 0; i < _rules$2.length; i++) {
      this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
    }

    // Can be overridden with a custom validator
    this.validateLink = validateLink;
  }

  /**
   * Skip a single token by running all rules in validation mode.
   * Returns `true` if any rule reports success.
   *
   * @param  {Object} `state`
   * @api privage
   */

  ParserInline.prototype.skipToken = function (state) {
    var rules = this.ruler.getRules('');
    var len = rules.length;
    var pos = state.pos;
    var i, cached_pos;

    if ((cached_pos = state.cacheGet(pos)) > 0) {
      state.pos = cached_pos;
      return;
    }

    for (i = 0; i < len; i++) {
      if (rules[i](state, true)) {
        state.cacheSet(pos, state.pos);
        return;
      }
    }

    state.pos++;
    state.cacheSet(pos, state.pos);
  };

  /**
   * Generate tokens for the given input range.
   *
   * @param  {Object} `state`
   * @api private
   */

  ParserInline.prototype.tokenize = function (state) {
    var rules = this.ruler.getRules('');
    var len = rules.length;
    var end = state.posMax;
    var ok, i;

    while (state.pos < end) {

      // Try all possible rules.
      // On success, the rule should:
      //
      // - update `state.pos`
      // - update `state.tokens`
      // - return true
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);

        if (ok) {
          break;
        }
      }

      if (ok) {
        if (state.pos >= end) { break; }
        continue;
      }

      state.pending += state.src[state.pos++];
    }

    if (state.pending) {
      state.pushPending();
    }
  };

  /**
   * Parse the given input string.
   *
   * @param  {String} `str`
   * @param  {Object} `options`
   * @param  {Object} `env`
   * @param  {Array} `outTokens`
   * @api private
   */

  ParserInline.prototype.parse = function (str, options, env, outTokens) {
    var state = new StateInline(str, this, options, env, outTokens);
    this.tokenize(state);
  };

  /**
   * Validate the given `url` by checking for bad protocols.
   *
   * @param  {String} `url`
   * @return {Boolean}
   */

  function validateLink(url) {
    var BAD_PROTOCOLS = [ 'vbscript', 'javascript', 'file', 'data' ];
    var str = url.trim().toLowerCase();
    // Care about digital entities "javascript&#x3A;alert(1)"
    str = replaceEntities(str);
    if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
      return false;
    }
    return true;
  }

  // Remarkable default options

  var defaultConfig = {
    options: {
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkTarget:   '',           // set target to open link in

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,

      maxNesting:   20            // Internal protection, recursion limit
    },

    components: {

      core: {
        rules: [
          'block',
          'inline',
          'references',
          'replacements',
          'smartquotes',
          'references',
          'abbr2',
          'footnote_tail'
        ]
      },

      block: {
        rules: [
          'blockquote',
          'code',
          'fences',
          'footnote',
          'heading',
          'hr',
          'htmlblock',
          'lheading',
          'list',
          'paragraph',
          'table'
        ]
      },

      inline: {
        rules: [
          'autolink',
          'backticks',
          'del',
          'emphasis',
          'entity',
          'escape',
          'footnote_ref',
          'htmltag',
          'links',
          'newline',
          'text'
        ]
      }
    }
  };

  // Remarkable default options

  var fullConfig = {
    options: {
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkTarget:   '',           // set target to open link in

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes:       '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight:     null,

      maxNesting:    20            // Internal protection, recursion limit
    },

    components: {
      // Don't restrict core/block/inline rules
      core: {},
      block: {},
      inline: {}
    }
  };

  // Commonmark default options

  var commonmarkConfig = {
    options: {
      html:         true,         // Enable HTML tags in source
      xhtmlOut:     true,         // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkTarget:   '',           // set target to open link in

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,

      maxNesting:   20            // Internal protection, recursion limit
    },

    components: {

      core: {
        rules: [
          'block',
          'inline',
          'references',
          'abbr2'
        ]
      },

      block: {
        rules: [
          'blockquote',
          'code',
          'fences',
          'heading',
          'hr',
          'htmlblock',
          'lheading',
          'list',
          'paragraph'
        ]
      },

      inline: {
        rules: [
          'autolink',
          'backticks',
          'emphasis',
          'entity',
          'escape',
          'htmltag',
          'links',
          'newline',
          'text'
        ]
      }
    }
  };

  /**
   * Preset configs
   */

  var config = {
    'default': defaultConfig,
    'full': fullConfig,
    'commonmark': commonmarkConfig
  };

  /**
   * The `StateCore` class manages state.
   *
   * @param {Object} `instance` Remarkable instance
   * @param {String} `str` Markdown string
   * @param {Object} `env`
   */

  function StateCore(instance, str, env) {
    this.src = str;
    this.env = env;
    this.options = instance.options;
    this.tokens = [];
    this.inlineMode = false;

    this.inline = instance.inline;
    this.block = instance.block;
    this.renderer = instance.renderer;
    this.typographer = instance.typographer;
  }

  /**
   * The main `Remarkable` class. Create an instance of
   * `Remarkable` with a `preset` and/or `options`.
   *
   * @param {String} `preset` If no preset is given, `default` is used.
   * @param {Object} `options`
   */

  function Remarkable(preset, options) {
    if (typeof preset !== 'string') {
      options = preset;
      preset = 'default';
    }

    if (options && options.linkify != null) {
      console.warn(
        'linkify option is removed. Use linkify plugin instead:\n\n' +
        'import Remarkable from \'remarkable\';\n' +
        'import linkify from \'remarkable/linkify\';\n' +
        'new Remarkable().use(linkify)\n'
      );
    }

    this.inline   = new ParserInline();
    this.block    = new ParserBlock();
    this.core     = new Core();
    this.renderer = new Renderer();
    this.ruler    = new Ruler();

    this.options  = {};
    this.configure(config[preset]);
    this.set(options || {});
  }

  /**
   * Set options as an alternative to passing them
   * to the constructor.
   *
   * ```js
   * md.set({typographer: true});
   * ```
   * @param {Object} `options`
   * @api public
   */

  Remarkable.prototype.set = function (options) {
    assign(this.options, options);
  };

  /**
   * Batch loader for components rules states, and options
   *
   * @param  {Object} `presets`
   */

  Remarkable.prototype.configure = function (presets) {
    var self = this;

    if (!presets) { throw new Error('Wrong `remarkable` preset, check name/content'); }
    if (presets.options) { self.set(presets.options); }
    if (presets.components) {
      Object.keys(presets.components).forEach(function (name) {
        if (presets.components[name].rules) {
          self[name].ruler.enable(presets.components[name].rules, true);
        }
      });
    }
  };

  /**
   * Use a plugin.
   *
   * ```js
   * var md = new Remarkable();
   *
   * md.use(plugin1)
   *   .use(plugin2, opts)
   *   .use(plugin3);
   * ```
   *
   * @param  {Function} `plugin`
   * @param  {Object} `options`
   * @return {Object} `Remarkable` for chaining
   */

  Remarkable.prototype.use = function (plugin, options) {
    plugin(this, options);
    return this;
  };


  /**
   * Parse the input `string` and return a tokens array.
   * Modifies `env` with definitions data.
   *
   * @param  {String} `string`
   * @param  {Object} `env`
   * @return {Array} Array of tokens
   */

  Remarkable.prototype.parse = function (str, env) {
    var state = new StateCore(this, str, env);
    this.core.process(state);
    return state.tokens;
  };

  /**
   * The main `.render()` method that does all the magic :)
   *
   * @param  {String} `string`
   * @param  {Object} `env`
   * @return {String} Rendered HTML.
   */

  Remarkable.prototype.render = function (str, env) {
    env = env || {};
    return this.renderer.render(this.parse(str, env), this.options, env);
  };

  /**
   * Parse the given content `string` as a single string.
   *
   * @param  {String} `string`
   * @param  {Object} `env`
   * @return {Array} Array of tokens
   */

  Remarkable.prototype.parseInline = function (str, env) {
    var state = new StateCore(this, str, env);
    state.inlineMode = true;
    this.core.process(state);
    return state.tokens;
  };

  /**
   * Render a single content `string`, without wrapping it
   * to paragraphs
   *
   * @param  {String} `str`
   * @param  {Object} `env`
   * @return {String}
   */

  Remarkable.prototype.renderInline = function (str, env) {
    env = env || {};
    return this.renderer.render(this.parseInline(str, env), this.options, env);
  };

  /**
   * Assigns (shallow copies) the properties of `src` onto `dest`, if the
   * corresponding property on `dest` === `undefined`.
   *
   * @param {Object} dest The destination object.
   * @param {Object} src The source object.
   * @return {Object} The destination object (`dest`)
   */
  function defaults(dest, src) {
      for (var prop in src) {
          if (src.hasOwnProperty(prop) && dest[prop] === undefined) {
              dest[prop] = src[prop];
          }
      }
      return dest;
  }
  /**
   * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
   * end of the string (by default, two periods: '..'). If the `str` length does not exceed
   * `len`, the string will be returned unchanged.
   *
   * @param {String} str The string to truncate and add an ellipsis to.
   * @param {Number} truncateLen The length to truncate the string at.
   * @param {String} [ellipsisChars=...] The ellipsis character(s) to add to the end of `str`
   *   when truncated. Defaults to '...'
   */
  function ellipsis(str, truncateLen, ellipsisChars) {
      var ellipsisLength;
      if (str.length > truncateLen) {
          if (ellipsisChars == null) {
              ellipsisChars = '&hellip;';
              ellipsisLength = 3;
          }
          else {
              ellipsisLength = ellipsisChars.length;
          }
          str = str.substring(0, truncateLen - ellipsisLength) + ellipsisChars;
      }
      return str;
  }
  /**
   * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
   *
   * @param {Array} arr The array to find an element of.
   * @param {*} element The element to find in the array, and return the index of.
   * @return {Number} The index of the `element`, or -1 if it was not found.
   */
  function indexOf(arr, element) {
      if (Array.prototype.indexOf) {
          return arr.indexOf(element);
      }
      else {
          for (var i = 0, len = arr.length; i < len; i++) {
              if (arr[i] === element)
                  return i;
          }
          return -1;
      }
  }
  /**
   * Removes array elements based on a filtering function. Mutates the input
   * array.
   *
   * Using this instead of the ES5 Array.prototype.filter() function, to allow
   * Autolinker compatibility with IE8, and also to prevent creating many new
   * arrays in memory for filtering.
   *
   * @param {Array} arr The array to remove elements from. This array is
   *   mutated.
   * @param {Function} fn A function which should return `true` to
   *   remove an element.
   * @return {Array} The mutated input `arr`.
   */
  function remove(arr, fn) {
      for (var i = arr.length - 1; i >= 0; i--) {
          if (fn(arr[i]) === true) {
              arr.splice(i, 1);
          }
      }
  }
  /**
   * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
   * with a regular expression that contains capturing parenthesis.
   *
   * For example:
   *
   *     // Modern browsers:
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
   *
   *     // Old IE (including IE8):
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
   *
   * This method emulates the functionality of modern browsers for the old IE case.
   *
   * @param {String} str The string to split.
   * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
   *   character(s) will be spliced into the array, as in the "modern browsers" example in the
   *   description of this method.
   *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
   *   Note #2: for simplicity's sake, the regular expression does not need
   *   to contain capturing parenthesis - it will be assumed that any match has them.
   * @return {String[]} The split array of strings, with the splitting character(s) included.
   */
  function splitAndCapture(str, splitRegex) {
      if (!splitRegex.global)
          throw new Error("`splitRegex` must have the 'g' flag set");
      var result = [], lastIdx = 0, match;
      while (match = splitRegex.exec(str)) {
          result.push(str.substring(lastIdx, match.index));
          result.push(match[0]); // push the splitting char(s)
          lastIdx = match.index + match[0].length;
      }
      result.push(str.substring(lastIdx));
      return result;
  }
  /**
   * Function that should never be called but is used to check that every
   * enum value is handled using TypeScript's 'never' type.
   */
  function throwUnhandledCaseError(theValue) {
      throw new Error("Unhandled case for value: '" + theValue + "'");
  }

  /**
   * @class Autolinker.HtmlTag
   * @extends Object
   *
   * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
   *
   * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
   * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
   *
   * ## Examples
   *
   * Example instantiation:
   *
   *     var tag = new Autolinker.HtmlTag( {
   *         tagName : 'a',
   *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
   *         innerHtml : 'Google'
   *     } );
   *
   *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
   *
   *     // Individual accessor methods
   *     tag.getTagName();                 // 'a'
   *     tag.getAttr( 'href' );            // 'http://google.com'
   *     tag.hasClass( 'external-link' );  // true
   *
   *
   * Using mutator methods (which may be used in combination with instantiation config properties):
   *
   *     var tag = new Autolinker.HtmlTag();
   *     tag.setTagName( 'a' );
   *     tag.setAttr( 'href', 'http://google.com' );
   *     tag.addClass( 'external-link' );
   *     tag.setInnerHtml( 'Google' );
   *
   *     tag.getTagName();                 // 'a'
   *     tag.getAttr( 'href' );            // 'http://google.com'
   *     tag.hasClass( 'external-link' );  // true
   *
   *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
   *
   *
   * ## Example use within a {@link Autolinker#replaceFn replaceFn}
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
   *             tag.setAttr( 'rel', 'nofollow' );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
   *
   *
   * ## Example use with a new tag for the replacement
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = new Autolinker.HtmlTag( {
   *                 tagName : 'button',
   *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
   *                 innerHtml : 'Load URL: ' + match.getAnchorText()
   *             } );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
   */
  var HtmlTag = /** @class */ (function () {
      /**
       * @method constructor
       * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
       */
      function HtmlTag(cfg) {
          if (cfg === void 0) { cfg = {}; }
          /**
           * @cfg {String} tagName
           *
           * The tag name. Ex: 'a', 'button', etc.
           *
           * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toAnchorString}
           * is executed.
           */
          this.tagName = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Object.<String, String>} attrs
           *
           * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
           * values are the attribute values.
           */
          this.attrs = {}; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String} innerHTML
           *
           * The inner HTML for the tag.
           */
          this.innerHTML = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @protected
           * @property {RegExp} whitespaceRegex
           *
           * Regular expression used to match whitespace in a string of CSS classes.
           */
          this.whitespaceRegex = /\s+/; // default value just to get the above doc comment in the ES5 output and documentation generator
          this.tagName = cfg.tagName || '';
          this.attrs = cfg.attrs || {};
          this.innerHTML = cfg.innerHtml || cfg.innerHTML || ''; // accept either the camelCased form or the fully capitalized acronym as in the DOM
      }
      /**
       * Sets the tag name that will be used to generate the tag with.
       *
       * @param {String} tagName
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setTagName = function (tagName) {
          this.tagName = tagName;
          return this;
      };
      /**
       * Retrieves the tag name.
       *
       * @return {String}
       */
      HtmlTag.prototype.getTagName = function () {
          return this.tagName || '';
      };
      /**
       * Sets an attribute on the HtmlTag.
       *
       * @param {String} attrName The attribute name to set.
       * @param {String} attrValue The attribute value to set.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setAttr = function (attrName, attrValue) {
          var tagAttrs = this.getAttrs();
          tagAttrs[attrName] = attrValue;
          return this;
      };
      /**
       * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
       *
       * @param {String} attrName The attribute name to retrieve.
       * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
       */
      HtmlTag.prototype.getAttr = function (attrName) {
          return this.getAttrs()[attrName];
      };
      /**
       * Sets one or more attributes on the HtmlTag.
       *
       * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setAttrs = function (attrs) {
          Object.assign(this.getAttrs(), attrs);
          return this;
      };
      /**
       * Retrieves the attributes Object (map) for the HtmlTag.
       *
       * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
       */
      HtmlTag.prototype.getAttrs = function () {
          return this.attrs || (this.attrs = {});
      };
      /**
       * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
       *
       * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setClass = function (cssClass) {
          return this.setAttr('class', cssClass);
      };
      /**
       * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
       *
       * @param {String} cssClass One or more space-separated CSS classes to add.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.addClass = function (cssClass) {
          var classAttr = this.getClass(), whitespaceRegex = this.whitespaceRegex, classes = (!classAttr) ? [] : classAttr.split(whitespaceRegex), newClasses = cssClass.split(whitespaceRegex), newClass;
          while (newClass = newClasses.shift()) {
              if (indexOf(classes, newClass) === -1) {
                  classes.push(newClass);
              }
          }
          this.getAttrs()['class'] = classes.join(" ");
          return this;
      };
      /**
       * Convenience method to remove one or more CSS classes from the HtmlTag.
       *
       * @param {String} cssClass One or more space-separated CSS classes to remove.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.removeClass = function (cssClass) {
          var classAttr = this.getClass(), whitespaceRegex = this.whitespaceRegex, classes = (!classAttr) ? [] : classAttr.split(whitespaceRegex), removeClasses = cssClass.split(whitespaceRegex), removeClass;
          while (classes.length && (removeClass = removeClasses.shift())) {
              var idx = indexOf(classes, removeClass);
              if (idx !== -1) {
                  classes.splice(idx, 1);
              }
          }
          this.getAttrs()['class'] = classes.join(" ");
          return this;
      };
      /**
       * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
       * there are multiple.
       *
       * @return {String}
       */
      HtmlTag.prototype.getClass = function () {
          return this.getAttrs()['class'] || "";
      };
      /**
       * Convenience method to check if the tag has a CSS class or not.
       *
       * @param {String} cssClass The CSS class to check for.
       * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
       */
      HtmlTag.prototype.hasClass = function (cssClass) {
          return (' ' + this.getClass() + ' ').indexOf(' ' + cssClass + ' ') !== -1;
      };
      /**
       * Sets the inner HTML for the tag.
       *
       * @param {String} html The inner HTML to set.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setInnerHTML = function (html) {
          this.innerHTML = html;
          return this;
      };
      /**
       * Backwards compatibility method name.
       *
       * @param {String} html The inner HTML to set.
       * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
       */
      HtmlTag.prototype.setInnerHtml = function (html) {
          return this.setInnerHTML(html);
      };
      /**
       * Retrieves the inner HTML for the tag.
       *
       * @return {String}
       */
      HtmlTag.prototype.getInnerHTML = function () {
          return this.innerHTML || "";
      };
      /**
       * Backward compatibility method name.
       *
       * @return {String}
       */
      HtmlTag.prototype.getInnerHtml = function () {
          return this.getInnerHTML();
      };
      /**
       * Override of superclass method used to generate the HTML string for the tag.
       *
       * @return {String}
       */
      HtmlTag.prototype.toAnchorString = function () {
          var tagName = this.getTagName(), attrsStr = this.buildAttrsStr();
          attrsStr = (attrsStr) ? ' ' + attrsStr : ''; // prepend a space if there are actually attributes
          return ['<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>'].join("");
      };
      /**
       * Support method for {@link #toAnchorString}, returns the string space-separated key="value" pairs, used to populate
       * the stringified HtmlTag.
       *
       * @protected
       * @return {String} Example return: `attr1="value1" attr2="value2"`
       */
      HtmlTag.prototype.buildAttrsStr = function () {
          if (!this.attrs)
              return ""; // no `attrs` Object (map) has been set, return empty string
          var attrs = this.getAttrs(), attrsArr = [];
          for (var prop in attrs) {
              if (attrs.hasOwnProperty(prop)) {
                  attrsArr.push(prop + '="' + attrs[prop] + '"');
              }
          }
          return attrsArr.join(" ");
      };
      return HtmlTag;
  }());

  /**
   * Date: 2015-10-05
   * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
   *
   * A truncation feature, where the ellipsis will be placed at a section within
   * the URL making it still somewhat human readable.
   *
   * @param {String} url						 A URL.
   * @param {Number} truncateLen		 The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars	 The characters to place within the url, e.g. "...".
   * @return {String} The truncated URL.
   */
  function truncateSmart(url, truncateLen, ellipsisChars) {
      var ellipsisLengthBeforeParsing;
      var ellipsisLength;
      if (ellipsisChars == null) {
          ellipsisChars = '&hellip;';
          ellipsisLength = 3;
          ellipsisLengthBeforeParsing = 8;
      }
      else {
          ellipsisLength = ellipsisChars.length;
          ellipsisLengthBeforeParsing = ellipsisChars.length;
      }
      var parse_url = function (url) {
          var urlObj = {};
          var urlSub = url;
          var match = urlSub.match(/^([a-z]+):\/\//i);
          if (match) {
              urlObj.scheme = match[1];
              urlSub = urlSub.substr(match[0].length);
          }
          match = urlSub.match(/^(.*?)(?=(\?|#|\/|$))/i);
          if (match) {
              urlObj.host = match[1];
              urlSub = urlSub.substr(match[0].length);
          }
          match = urlSub.match(/^\/(.*?)(?=(\?|#|$))/i);
          if (match) {
              urlObj.path = match[1];
              urlSub = urlSub.substr(match[0].length);
          }
          match = urlSub.match(/^\?(.*?)(?=(#|$))/i);
          if (match) {
              urlObj.query = match[1];
              urlSub = urlSub.substr(match[0].length);
          }
          match = urlSub.match(/^#(.*?)$/i);
          if (match) {
              urlObj.fragment = match[1];
              //urlSub = urlSub.substr(match[0].length);  -- not used. Uncomment if adding another block.
          }
          return urlObj;
      };
      var buildUrl = function (urlObj) {
          var url = "";
          if (urlObj.scheme && urlObj.host) {
              url += urlObj.scheme + "://";
          }
          if (urlObj.host) {
              url += urlObj.host;
          }
          if (urlObj.path) {
              url += "/" + urlObj.path;
          }
          if (urlObj.query) {
              url += "?" + urlObj.query;
          }
          if (urlObj.fragment) {
              url += "#" + urlObj.fragment;
          }
          return url;
      };
      var buildSegment = function (segment, remainingAvailableLength) {
          var remainingAvailableLengthHalf = remainingAvailableLength / 2, startOffset = Math.ceil(remainingAvailableLengthHalf), endOffset = (-1) * Math.floor(remainingAvailableLengthHalf), end = "";
          if (endOffset < 0) {
              end = segment.substr(endOffset);
          }
          return segment.substr(0, startOffset) + ellipsisChars + end;
      };
      if (url.length <= truncateLen) {
          return url;
      }
      var availableLength = truncateLen - ellipsisLength;
      var urlObj = parse_url(url);
      // Clean up the URL
      if (urlObj.query) {
          var matchQuery = urlObj.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
          if (matchQuery) {
              // Malformed URL; two or more "?". Removed any content behind the 2nd.
              urlObj.query = urlObj.query.substr(0, matchQuery[1].length);
              url = buildUrl(urlObj);
          }
      }
      if (url.length <= truncateLen) {
          return url;
      }
      if (urlObj.host) {
          urlObj.host = urlObj.host.replace(/^www\./, "");
          url = buildUrl(urlObj);
      }
      if (url.length <= truncateLen) {
          return url;
      }
      // Process and build the URL
      var str = "";
      if (urlObj.host) {
          str += urlObj.host;
      }
      if (str.length >= availableLength) {
          if (urlObj.host.length == truncateLen) {
              return (urlObj.host.substr(0, (truncateLen - ellipsisLength)) + ellipsisChars).substr(0, availableLength + ellipsisLengthBeforeParsing);
          }
          return buildSegment(str, availableLength).substr(0, availableLength + ellipsisLengthBeforeParsing);
      }
      var pathAndQuery = "";
      if (urlObj.path) {
          pathAndQuery += "/" + urlObj.path;
      }
      if (urlObj.query) {
          pathAndQuery += "?" + urlObj.query;
      }
      if (pathAndQuery) {
          if ((str + pathAndQuery).length >= availableLength) {
              if ((str + pathAndQuery).length == truncateLen) {
                  return (str + pathAndQuery).substr(0, truncateLen);
              }
              var remainingAvailableLength = availableLength - str.length;
              return (str + buildSegment(pathAndQuery, remainingAvailableLength)).substr(0, availableLength + ellipsisLengthBeforeParsing);
          }
          else {
              str += pathAndQuery;
          }
      }
      if (urlObj.fragment) {
          var fragment = "#" + urlObj.fragment;
          if ((str + fragment).length >= availableLength) {
              if ((str + fragment).length == truncateLen) {
                  return (str + fragment).substr(0, truncateLen);
              }
              var remainingAvailableLength2 = availableLength - str.length;
              return (str + buildSegment(fragment, remainingAvailableLength2)).substr(0, availableLength + ellipsisLengthBeforeParsing);
          }
          else {
              str += fragment;
          }
      }
      if (urlObj.scheme && urlObj.host) {
          var scheme = urlObj.scheme + "://";
          if ((str + scheme).length < availableLength) {
              return (scheme + str).substr(0, truncateLen);
          }
      }
      if (str.length <= truncateLen) {
          return str;
      }
      var end = "";
      if (availableLength > 0) {
          end = str.substr((-1) * Math.floor(availableLength / 2));
      }
      return (str.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  /**
   * Date: 2015-10-05
   * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
   *
   * A truncation feature, where the ellipsis will be placed in the dead-center of the URL.
   *
   * @param {String} url             A URL.
   * @param {Number} truncateLen     The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars   The characters to place within the url, e.g. "..".
   * @return {String} The truncated URL.
   */
  function truncateMiddle(url, truncateLen, ellipsisChars) {
      if (url.length <= truncateLen) {
          return url;
      }
      var ellipsisLengthBeforeParsing;
      var ellipsisLength;
      if (ellipsisChars == null) {
          ellipsisChars = '&hellip;';
          ellipsisLengthBeforeParsing = 8;
          ellipsisLength = 3;
      }
      else {
          ellipsisLengthBeforeParsing = ellipsisChars.length;
          ellipsisLength = ellipsisChars.length;
      }
      var availableLength = truncateLen - ellipsisLength;
      var end = "";
      if (availableLength > 0) {
          end = url.substr((-1) * Math.floor(availableLength / 2));
      }
      return (url.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  /**
   * A truncation feature where the ellipsis will be placed at the end of the URL.
   *
   * @param {String} anchorText
   * @param {Number} truncateLen The maximum length of the truncated output URL string.
   * @param {String} ellipsisChars The characters to place within the url, e.g. "..".
   * @return {String} The truncated URL.
   */
  function truncateEnd(anchorText, truncateLen, ellipsisChars) {
      return ellipsis(anchorText, truncateLen, ellipsisChars);
  }

  /**
   * @protected
   * @class Autolinker.AnchorTagBuilder
   * @extends Object
   *
   * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is
   * found.
   *
   * Normally this class is instantiated, configured, and used internally by an
   * {@link Autolinker} instance, but may actually be used indirectly in a
   * {@link Autolinker#replaceFn replaceFn} to create {@link Autolinker.HtmlTag HtmlTag}
   * instances which may be modified before returning from the
   * {@link Autolinker#replaceFn replaceFn}. For example:
   *
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( match ) {
   *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance
   *             tag.setAttr( 'rel', 'nofollow' );
   *
   *             return tag;
   *         }
   *     } );
   *
   *     // generated html:
   *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
   */
  var AnchorTagBuilder = /** @class */ (function () {
      /**
       * @method constructor
       * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
       */
      function AnchorTagBuilder(cfg) {
          if (cfg === void 0) { cfg = {}; }
          /**
           * @cfg {Boolean} newWindow
           * @inheritdoc Autolinker#newWindow
           */
          this.newWindow = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Object} truncate
           * @inheritdoc Autolinker#truncate
           */
          this.truncate = {}; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String} className
           * @inheritdoc Autolinker#className
           */
          this.className = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          this.newWindow = cfg.newWindow || false;
          this.truncate = cfg.truncate || {};
          this.className = cfg.className || '';
      }
      /**
       * Generates the actual anchor (&lt;a&gt;) tag to use in place of the
       * matched text, via its `match` object.
       *
       * @param {Autolinker.match.Match} match The Match instance to generate an
       *   anchor tag from.
       * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
       */
      AnchorTagBuilder.prototype.build = function (match) {
          return new HtmlTag({
              tagName: 'a',
              attrs: this.createAttrs(match),
              innerHtml: this.processAnchorText(match.getAnchorText())
          });
      };
      /**
       * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;)
       *   tag being generated.
       *
       * @protected
       * @param {Autolinker.match.Match} match The Match instance to generate an
       *   anchor tag from.
       * @return {Object} A key/value Object (map) of the anchor tag's attributes.
       */
      AnchorTagBuilder.prototype.createAttrs = function (match) {
          var attrs = {
              'href': match.getAnchorHref() // we'll always have the `href` attribute
          };
          var cssClass = this.createCssClass(match);
          if (cssClass) {
              attrs['class'] = cssClass;
          }
          if (this.newWindow) {
              attrs['target'] = "_blank";
              attrs['rel'] = "noopener noreferrer"; // Issue #149. See https://mathiasbynens.github.io/rel-noopener/
          }
          if (this.truncate) {
              if (this.truncate.length && this.truncate.length < match.getAnchorText().length) {
                  attrs['title'] = match.getAnchorHref();
              }
          }
          return attrs;
      };
      /**
       * Creates the CSS class that will be used for a given anchor tag, based on
       * the `matchType` and the {@link #className} config.
       *
       * Example returns:
       *
       * - ""                                      // no {@link #className}
       * - "myLink myLink-url"                     // url match
       * - "myLink myLink-email"                   // email match
       * - "myLink myLink-phone"                   // phone match
       * - "myLink myLink-hashtag"                 // hashtag match
       * - "myLink myLink-mention myLink-twitter"  // mention match with Twitter service
       *
       * @protected
       * @param {Autolinker.match.Match} match The Match instance to generate an
       *   anchor tag from.
       * @return {String} The CSS class string for the link. Example return:
       *   "myLink myLink-url". If no {@link #className} was configured, returns
       *   an empty string.
       */
      AnchorTagBuilder.prototype.createCssClass = function (match) {
          var className = this.className;
          if (!className) {
              return "";
          }
          else {
              var returnClasses = [className], cssClassSuffixes = match.getCssClassSuffixes();
              for (var i = 0, len = cssClassSuffixes.length; i < len; i++) {
                  returnClasses.push(className + '-' + cssClassSuffixes[i]);
              }
              return returnClasses.join(' ');
          }
      };
      /**
       * Processes the `anchorText` by truncating the text according to the
       * {@link #truncate} config.
       *
       * @private
       * @param {String} anchorText The anchor tag's text (i.e. what will be
       *   displayed).
       * @return {String} The processed `anchorText`.
       */
      AnchorTagBuilder.prototype.processAnchorText = function (anchorText) {
          anchorText = this.doTruncate(anchorText);
          return anchorText;
      };
      /**
       * Performs the truncation of the `anchorText` based on the {@link #truncate}
       * option. If the `anchorText` is longer than the length specified by the
       * {@link #truncate} option, the truncation is performed based on the
       * `location` property. See {@link #truncate} for details.
       *
       * @private
       * @param {String} anchorText The anchor tag's text (i.e. what will be
       *   displayed).
       * @return {String} The truncated anchor text.
       */
      AnchorTagBuilder.prototype.doTruncate = function (anchorText) {
          var truncate = this.truncate;
          if (!truncate || !truncate.length)
              return anchorText;
          var truncateLength = truncate.length, truncateLocation = truncate.location;
          if (truncateLocation === 'smart') {
              return truncateSmart(anchorText, truncateLength);
          }
          else if (truncateLocation === 'middle') {
              return truncateMiddle(anchorText, truncateLength);
          }
          else {
              return truncateEnd(anchorText, truncateLength);
          }
      };
      return AnchorTagBuilder;
  }());

  /**
   * @abstract
   * @class Autolinker.match.Match
   *
   * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a
   * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
   *
   * For example:
   *
   *     var input = "...";  // string with URLs, Email Addresses, and Mentions (Twitter, Instagram, Soundcloud)
   *
   *     var linkedText = Autolinker.link( input, {
   *         replaceFn : function( match ) {
   *             console.log( "href = ", match.getAnchorHref() );
   *             console.log( "text = ", match.getAnchorText() );
   *
   *             switch( match.getType() ) {
   *                 case 'url' :
   *                     console.log( "url: ", match.getUrl() );
   *
   *                 case 'email' :
   *                     console.log( "email: ", match.getEmail() );
   *
   *                 case 'mention' :
   *                     console.log( "mention: ", match.getMention() );
   *             }
   *         }
   *     } );
   *
   * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
   */
  var Match = /** @class */ (function () {
      /**
       * @member Autolinker.match.Match
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function Match(cfg) {
          /**
           * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
           *
           * Reference to the AnchorTagBuilder instance to use to generate an anchor
           * tag for the Match.
           */
          this.__jsduckDummyDocProp = null; // property used just to get the above doc comment into the ES5 output and documentation generator
          /**
           * @cfg {String} matchedText (required)
           *
           * The original text that was matched by the {@link Autolinker.matcher.Matcher}.
           */
          this.matchedText = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Number} offset (required)
           *
           * The offset of where the match was made in the input string.
           */
          this.offset = 0; // default value just to get the above doc comment in the ES5 output and documentation generator
          this.tagBuilder = cfg.tagBuilder;
          this.matchedText = cfg.matchedText;
          this.offset = cfg.offset;
      }
      /**
       * Returns the original text that was matched.
       *
       * @return {String}
       */
      Match.prototype.getMatchedText = function () {
          return this.matchedText;
      };
      /**
       * Sets the {@link #offset} of where the match was made in the input string.
       *
       * A {@link Autolinker.matcher.Matcher} will be fed only HTML text nodes,
       * and will therefore set an original offset that is relative to the HTML
       * text node itself. However, we want this offset to be relative to the full
       * HTML input string, and thus if using {@link Autolinker#parse} (rather
       * than calling a {@link Autolinker.matcher.Matcher} directly), then this
       * offset is corrected after the Matcher itself has done its job.
       *
       * @param {Number} offset
       */
      Match.prototype.setOffset = function (offset) {
          this.offset = offset;
      };
      /**
       * Returns the offset of where the match was made in the input string. This
       * is the 0-based index of the match.
       *
       * @return {Number}
       */
      Match.prototype.getOffset = function () {
          return this.offset;
      };
      /**
       * Returns the CSS class suffix(es) for this match.
       *
       * A CSS class suffix is appended to the {@link Autolinker#className} in
       * the {@link Autolinker.AnchorTagBuilder} when a match is translated into
       * an anchor tag.
       *
       * For example, if {@link Autolinker#className} was configured as 'myLink',
       * and this method returns `[ 'url' ]`, the final class name of the element
       * will become: 'myLink myLink-url'.
       *
       * The match may provide multiple CSS class suffixes to be appended to the
       * {@link Autolinker#className} in order to facilitate better styling
       * options for different match criteria. See {@link Autolinker.match.Mention}
       * for an example.
       *
       * By default, this method returns a single array with the match's
       * {@link #getType type} name, but may be overridden by subclasses.
       *
       * @return {String[]}
       */
      Match.prototype.getCssClassSuffixes = function () {
          return [this.getType()];
      };
      /**
       * Builds and returns an {@link Autolinker.HtmlTag} instance based on the
       * Match.
       *
       * This can be used to easily generate anchor tags from matches, and either
       * return their HTML string, or modify them before doing so.
       *
       * Example Usage:
       *
       *     var tag = match.buildTag();
       *     tag.addClass( 'cordova-link' );
       *     tag.setAttr( 'target', '_system' );
       *
       *     tag.toAnchorString();  // <a href="http://google.com" class="cordova-link" target="_system">Google</a>
       *
       * Example Usage in {@link Autolinker#replaceFn}:
       *
       *     var html = Autolinker.link( "Test google.com", {
       *         replaceFn : function( match ) {
       *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance
       *             tag.setAttr( 'rel', 'nofollow' );
       *
       *             return tag;
       *         }
       *     } );
       *
       *     // generated html:
       *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
       */
      Match.prototype.buildTag = function () {
          return this.tagBuilder.build(this);
      };
      return Match;
  }());

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  /**
   * @class Autolinker.match.Email
   * @extends Autolinker.match.Match
   *
   * Represents a Email match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */
  var EmailMatch = /** @class */ (function (_super) {
      __extends(EmailMatch, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function EmailMatch(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {String} email (required)
           *
           * The email address that was matched.
           */
          _this.email = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          _this.email = cfg.email;
          return _this;
      }
      /**
       * Returns a string name for the type of match that this class represents.
       * For the case of EmailMatch, returns 'email'.
       *
       * @return {String}
       */
      EmailMatch.prototype.getType = function () {
          return 'email';
      };
      /**
       * Returns the email address that was matched.
       *
       * @return {String}
       */
      EmailMatch.prototype.getEmail = function () {
          return this.email;
      };
      /**
       * Returns the anchor href that should be generated for the match.
       *
       * @return {String}
       */
      EmailMatch.prototype.getAnchorHref = function () {
          return 'mailto:' + this.email;
      };
      /**
       * Returns the anchor text that should be generated for the match.
       *
       * @return {String}
       */
      EmailMatch.prototype.getAnchorText = function () {
          return this.email;
      };
      return EmailMatch;
  }(Match));

  /**
   * @class Autolinker.match.Hashtag
   * @extends Autolinker.match.Match
   *
   * Represents a Hashtag match found in an input string which should be
   * Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more
   * details.
   */
  var HashtagMatch = /** @class */ (function (_super) {
      __extends(HashtagMatch, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function HashtagMatch(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {String} serviceName
           *
           * The service to point hashtag matches to. See {@link Autolinker#hashtag}
           * for available values.
           */
          _this.serviceName = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String} hashtag (required)
           *
           * The HashtagMatch that was matched, without the '#'.
           */
          _this.hashtag = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          _this.serviceName = cfg.serviceName;
          _this.hashtag = cfg.hashtag;
          return _this;
      }
      /**
       * Returns a string name for the type of match that this class represents.
       * For the case of HashtagMatch, returns 'hashtag'.
       *
       * @return {String}
       */
      HashtagMatch.prototype.getType = function () {
          return 'hashtag';
      };
      /**
       * Returns the configured {@link #serviceName} to point the HashtagMatch to.
       * Ex: 'facebook', 'twitter'.
       *
       * @return {String}
       */
      HashtagMatch.prototype.getServiceName = function () {
          return this.serviceName;
      };
      /**
       * Returns the matched hashtag, without the '#' character.
       *
       * @return {String}
       */
      HashtagMatch.prototype.getHashtag = function () {
          return this.hashtag;
      };
      /**
       * Returns the anchor href that should be generated for the match.
       *
       * @return {String}
       */
      HashtagMatch.prototype.getAnchorHref = function () {
          var serviceName = this.serviceName, hashtag = this.hashtag;
          switch (serviceName) {
              case 'twitter':
                  return 'https://twitter.com/hashtag/' + hashtag;
              case 'facebook':
                  return 'https://www.facebook.com/hashtag/' + hashtag;
              case 'instagram':
                  return 'https://instagram.com/explore/tags/' + hashtag;
              default: // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
                  throw new Error('Unknown service name to point hashtag to: ' + serviceName);
          }
      };
      /**
       * Returns the anchor text that should be generated for the match.
       *
       * @return {String}
       */
      HashtagMatch.prototype.getAnchorText = function () {
          return '#' + this.hashtag;
      };
      return HashtagMatch;
  }(Match));

  /**
   * @class Autolinker.match.Mention
   * @extends Autolinker.match.Match
   *
   * Represents a Mention match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */
  var MentionMatch = /** @class */ (function (_super) {
      __extends(MentionMatch, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function MentionMatch(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {String} serviceName
           *
           * The service to point mention matches to. See {@link Autolinker#mention}
           * for available values.
           */
          _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String} mention (required)
           *
           * The Mention that was matched, without the '@' character.
           */
          _this.mention = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          _this.mention = cfg.mention;
          _this.serviceName = cfg.serviceName;
          return _this;
      }
      /**
       * Returns a string name for the type of match that this class represents.
       * For the case of MentionMatch, returns 'mention'.
       *
       * @return {String}
       */
      MentionMatch.prototype.getType = function () {
          return 'mention';
      };
      /**
       * Returns the mention, without the '@' character.
       *
       * @return {String}
       */
      MentionMatch.prototype.getMention = function () {
          return this.mention;
      };
      /**
       * Returns the configured {@link #serviceName} to point the mention to.
       * Ex: 'instagram', 'twitter', 'soundcloud'.
       *
       * @return {String}
       */
      MentionMatch.prototype.getServiceName = function () {
          return this.serviceName;
      };
      /**
       * Returns the anchor href that should be generated for the match.
       *
       * @return {String}
       */
      MentionMatch.prototype.getAnchorHref = function () {
          switch (this.serviceName) {
              case 'twitter':
                  return 'https://twitter.com/' + this.mention;
              case 'instagram':
                  return 'https://instagram.com/' + this.mention;
              case 'soundcloud':
                  return 'https://soundcloud.com/' + this.mention;
              default: // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
                  throw new Error('Unknown service name to point mention to: ' + this.serviceName);
          }
      };
      /**
       * Returns the anchor text that should be generated for the match.
       *
       * @return {String}
       */
      MentionMatch.prototype.getAnchorText = function () {
          return '@' + this.mention;
      };
      /**
       * Returns the CSS class suffixes that should be used on a tag built with
       * the match. See {@link Autolinker.match.Match#getCssClassSuffixes} for
       * details.
       *
       * @return {String[]}
       */
      MentionMatch.prototype.getCssClassSuffixes = function () {
          var cssClassSuffixes = _super.prototype.getCssClassSuffixes.call(this), serviceName = this.getServiceName();
          if (serviceName) {
              cssClassSuffixes.push(serviceName);
          }
          return cssClassSuffixes;
      };
      return MentionMatch;
  }(Match));

  /**
   * @class Autolinker.match.Phone
   * @extends Autolinker.match.Match
   *
   * Represents a Phone number match found in an input string which should be
   * Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more
   * details.
   */
  var PhoneMatch = /** @class */ (function (_super) {
      __extends(PhoneMatch, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function PhoneMatch(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @protected
           * @property {String} number (required)
           *
           * The phone number that was matched, without any delimiter characters.
           *
           * Note: This is a string to allow for prefixed 0's.
           */
          _this.number = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @protected
           * @property  {Boolean} plusSign (required)
           *
           * `true` if the matched phone number started with a '+' sign. We'll include
           * it in the `tel:` URL if so, as this is needed for international numbers.
           *
           * Ex: '+1 (123) 456 7879'
           */
          _this.plusSign = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          _this.number = cfg.number;
          _this.plusSign = cfg.plusSign;
          return _this;
      }
      /**
       * Returns a string name for the type of match that this class represents.
       * For the case of PhoneMatch, returns 'phone'.
       *
       * @return {String}
       */
      PhoneMatch.prototype.getType = function () {
          return 'phone';
      };
      /**
       * Returns the phone number that was matched as a string, without any
       * delimiter characters.
       *
       * Note: This is a string to allow for prefixed 0's.
       *
       * @return {String}
       */
      PhoneMatch.prototype.getPhoneNumber = function () {
          return this.number;
      };
      /**
       * Alias of {@link #getPhoneNumber}, returns the phone number that was
       * matched as a string, without any delimiter characters.
       *
       * Note: This is a string to allow for prefixed 0's.
       *
       * @return {String}
       */
      PhoneMatch.prototype.getNumber = function () {
          return this.getPhoneNumber();
      };
      /**
       * Returns the anchor href that should be generated for the match.
       *
       * @return {String}
       */
      PhoneMatch.prototype.getAnchorHref = function () {
          return 'tel:' + (this.plusSign ? '+' : '') + this.number;
      };
      /**
       * Returns the anchor text that should be generated for the match.
       *
       * @return {String}
       */
      PhoneMatch.prototype.getAnchorText = function () {
          return this.matchedText;
      };
      return PhoneMatch;
  }(Match));

  /**
   * @class Autolinker.match.Url
   * @extends Autolinker.match.Match
   *
   * Represents a Url match found in an input string which should be Autolinked.
   *
   * See this class's superclass ({@link Autolinker.match.Match}) for more details.
   */
  var UrlMatch = /** @class */ (function (_super) {
      __extends(UrlMatch, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match
       *   instance, specified in an Object (map).
       */
      function UrlMatch(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {String} url (required)
           *
           * The url that was matched.
           */
          _this.url = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {"scheme"/"www"/"tld"} urlMatchType (required)
           *
           * The type of URL match that this class represents. This helps to determine
           * if the match was made in the original text with a prefixed scheme (ex:
           * 'http://www.google.com'), a prefixed 'www' (ex: 'www.google.com'), or
           * was matched by a known top-level domain (ex: 'google.com').
           */
          _this.urlMatchType = 'scheme'; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} protocolUrlMatch (required)
           *
           * `true` if the URL is a match which already has a protocol (i.e.
           * 'http://'), `false` if the match was from a 'www' or known TLD match.
           */
          _this.protocolUrlMatch = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} protocolRelativeMatch (required)
           *
           * `true` if the URL is a protocol-relative match. A protocol-relative match
           * is a URL that starts with '//', and will be either http:// or https://
           * based on the protocol that the site is loaded under.
           */
          _this.protocolRelativeMatch = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Object} stripPrefix (required)
           *
           * The Object form of {@link Autolinker#cfg-stripPrefix}.
           */
          _this.stripPrefix = { scheme: true, www: true }; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} stripTrailingSlash (required)
           * @inheritdoc Autolinker#cfg-stripTrailingSlash
           */
          _this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} decodePercentEncoding (required)
           * @inheritdoc Autolinker#cfg-decodePercentEncoding
           */
          _this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @private
           * @property {RegExp} schemePrefixRegex
           *
           * A regular expression used to remove the 'http://' or 'https://' from
           * URLs.
           */
          _this.schemePrefixRegex = /^(https?:\/\/)?/i;
          /**
           * @private
           * @property {RegExp} wwwPrefixRegex
           *
           * A regular expression used to remove the 'www.' from URLs.
           */
          _this.wwwPrefixRegex = /^(https?:\/\/)?(www\.)?/i;
          /**
           * @private
           * @property {RegExp} protocolRelativeRegex
           *
           * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
           * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
           */
          _this.protocolRelativeRegex = /^\/\//;
          /**
           * @private
           * @property {Boolean} protocolPrepended
           *
           * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
           * {@link #url} did not have a protocol)
           */
          _this.protocolPrepended = false;
          _this.urlMatchType = cfg.urlMatchType;
          _this.url = cfg.url;
          _this.protocolUrlMatch = cfg.protocolUrlMatch;
          _this.protocolRelativeMatch = cfg.protocolRelativeMatch;
          _this.stripPrefix = cfg.stripPrefix;
          _this.stripTrailingSlash = cfg.stripTrailingSlash;
          _this.decodePercentEncoding = cfg.decodePercentEncoding;
          return _this;
      }
      /**
       * Returns a string name for the type of match that this class represents.
       * For the case of UrlMatch, returns 'url'.
       *
       * @return {String}
       */
      UrlMatch.prototype.getType = function () {
          return 'url';
      };
      /**
       * Returns a string name for the type of URL match that this class
       * represents.
       *
       * This helps to determine if the match was made in the original text with a
       * prefixed scheme (ex: 'http://www.google.com'), a prefixed 'www' (ex:
       * 'www.google.com'), or was matched by a known top-level domain (ex:
       * 'google.com').
       *
       * @return {"scheme"/"www"/"tld"}
       */
      UrlMatch.prototype.getUrlMatchType = function () {
          return this.urlMatchType;
      };
      /**
       * Returns the url that was matched, assuming the protocol to be 'http://' if the original
       * match was missing a protocol.
       *
       * @return {String}
       */
      UrlMatch.prototype.getUrl = function () {
          var url = this.url;
          // if the url string doesn't begin with a protocol, assume 'http://'
          if (!this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended) {
              url = this.url = 'http://' + url;
              this.protocolPrepended = true;
          }
          return url;
      };
      /**
       * Returns the anchor href that should be generated for the match.
       *
       * @return {String}
       */
      UrlMatch.prototype.getAnchorHref = function () {
          var url = this.getUrl();
          return url.replace(/&amp;/g, '&'); // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html
      };
      /**
       * Returns the anchor text that should be generated for the match.
       *
       * @return {String}
       */
      UrlMatch.prototype.getAnchorText = function () {
          var anchorText = this.getMatchedText();
          if (this.protocolRelativeMatch) {
              // Strip off any protocol-relative '//' from the anchor text
              anchorText = this.stripProtocolRelativePrefix(anchorText);
          }
          if (this.stripPrefix.scheme) {
              anchorText = this.stripSchemePrefix(anchorText);
          }
          if (this.stripPrefix.www) {
              anchorText = this.stripWwwPrefix(anchorText);
          }
          if (this.stripTrailingSlash) {
              anchorText = this.removeTrailingSlash(anchorText); // remove trailing slash, if there is one
          }
          if (this.decodePercentEncoding) {
              anchorText = this.removePercentEncoding(anchorText);
          }
          return anchorText;
      };
      // ---------------------------------------
      // Utility Functionality
      /**
       * Strips the scheme prefix (such as "http://" or "https://") from the given
       * `url`.
       *
       * @private
       * @param {String} url The text of the anchor that is being generated, for
       *   which to strip off the url scheme.
       * @return {String} The `url`, with the scheme stripped.
       */
      UrlMatch.prototype.stripSchemePrefix = function (url) {
          return url.replace(this.schemePrefixRegex, '');
      };
      /**
       * Strips the 'www' prefix from the given `url`.
       *
       * @private
       * @param {String} url The text of the anchor that is being generated, for
       *   which to strip off the 'www' if it exists.
       * @return {String} The `url`, with the 'www' stripped.
       */
      UrlMatch.prototype.stripWwwPrefix = function (url) {
          return url.replace(this.wwwPrefixRegex, '$1'); // leave any scheme ($1), it one exists
      };
      /**
       * Strips any protocol-relative '//' from the anchor text.
       *
       * @private
       * @param {String} text The text of the anchor that is being generated, for which to strip off the
       *   protocol-relative prefix (such as stripping off "//")
       * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
       */
      UrlMatch.prototype.stripProtocolRelativePrefix = function (text) {
          return text.replace(this.protocolRelativeRegex, '');
      };
      /**
       * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
       *
       * @private
       * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
       *   slash ('/') that may exist.
       * @return {String} The `anchorText`, with the trailing slash removed.
       */
      UrlMatch.prototype.removeTrailingSlash = function (anchorText) {
          if (anchorText.charAt(anchorText.length - 1) === '/') {
              anchorText = anchorText.slice(0, -1);
          }
          return anchorText;
      };
      /**
       * Decodes percent-encoded characters from the given `anchorText`, in
       * preparation for the text to be displayed.
       *
       * @private
       * @param {String} anchorText The text of the anchor that is being
       *   generated, for which to decode any percent-encoded characters.
       * @return {String} The `anchorText`, with the percent-encoded characters
       *   decoded.
       */
      UrlMatch.prototype.removePercentEncoding = function (anchorText) {
          // First, convert a few of the known % encodings to the corresponding
          // HTML entities that could accidentally be interpretted as special
          // HTML characters
          var preProcessedEntityAnchorText = anchorText
              .replace(/%22/gi, '&quot;') // " char
              .replace(/%26/gi, '&amp;') // & char
              .replace(/%27/gi, '&#39;') // ' char
              .replace(/%3C/gi, '&lt;') // < char
              .replace(/%3E/gi, '&gt;'); // > char
          try {
              // Now attempt to decode the rest of the anchor text
              return decodeURIComponent(preProcessedEntityAnchorText);
          }
          catch (e) { // Invalid % escape sequence in the anchor text
              return preProcessedEntityAnchorText;
          }
      };
      return UrlMatch;
  }(Match));

  /**
   * @abstract
   * @class Autolinker.matcher.Matcher
   *
   * An abstract class and interface for individual matchers to find matches in
   * an input string with linkified versions of them.
   *
   * Note that Matchers do not take HTML into account - they must be fed the text
   * nodes of any HTML string, which is handled by {@link Autolinker#parse}.
   */
  var Matcher = /** @class */ (function () {
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Matcher
       *   instance, specified in an Object (map).
       */
      function Matcher(cfg) {
          /**
           * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
           *
           * Reference to the AnchorTagBuilder instance to use to generate HTML tags
           * for {@link Autolinker.match.Match Matches}.
           */
          this.__jsduckDummyDocProp = null; // property used just to get the above doc comment into the ES5 output and documentation generator
          this.tagBuilder = cfg.tagBuilder;
      }
      return Matcher;
  }());

  /*
   * This file builds and stores a library of the common regular expressions used
   * by the Autolinker utility.
   *
   * Other regular expressions may exist ad-hoc, but these are generally the
   * regular expressions that are shared between source files.
   */
  /**
   * Regular expression to match upper and lowercase ASCII letters
   */
  var letterRe = /[A-Za-z]/;
  /**
   * Regular expression to match ASCII digits
   */
  var digitRe = /[0-9]/;
  /**
   * Regular expression to match whitespace
   */
  var whitespaceRe = /\s/;
  /**
   * Regular expression to match quote characters
   */
  var quoteRe = /['"]/;
  /**
   * Regular expression to match the range of ASCII control characters (0-31), and
   * the backspace char (127)
   */
  var controlCharsRe = /[\x00-\x1F\x7F]/;
  /**
   * The string form of a regular expression that would match all of the
   * alphabetic ("letter") chars in the unicode character set when placed in a
   * RegExp character class (`[]`). This includes all international alphabetic
   * characters.
   *
   * These would be the characters matched by unicode regex engines `\p{L}`
   * escape ("all letters").
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Letter'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */
  var alphaCharsStr = /A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/
      .source; // see note in above variable description
  /**
   * The string form of a regular expression that would match all emoji characters
   * Source: https://www.regextester.com/106421
   */
  var emojiStr = /\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff/
      .source;
  /**
   * The string form of a regular expression that would match all of the
   * combining mark characters in the unicode character set when placed in a
   * RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines `\p{M}`
   * escape ("all marks").
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Mark'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */
  var marksStr = /\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F/
      .source; // see note in above variable description
  /**
   * The string form of a regular expression that would match all of the
   * alphabetic ("letter") chars, emoji, and combining marks in the unicode character set
   * when placed in a RegExp character class (`[]`). This includes all
   * international alphabetic characters.
   *
   * These would be the characters matched by unicode regex engines `\p{L}\p{M}`
   * escapes and emoji characters.
   */
  var alphaCharsAndMarksStr = alphaCharsStr + emojiStr + marksStr;
  /**
   * The string form of a regular expression that would match all of the
   * decimal number chars in the unicode character set when placed in a RegExp
   * character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines `\p{Nd}`
   * escape ("all decimal numbers")
   *
   * Taken from the XRegExp library: http://xregexp.com/ (thanks @https://github.com/slevithan)
   * Specifically: http://xregexp.com/v/3.2.0/xregexp-all.js, the 'Decimal_Number'
   *   regex's bmp
   *
   * VERY IMPORTANT: This set of characters is defined inside of a Regular
   *   Expression literal rather than a string literal to prevent UglifyJS from
   *   compressing the unicode escape sequences into their actual unicode
   *   characters. If Uglify compresses these into the unicode characters
   *   themselves, this results in the error "Range out of order in character
   *   class" when these characters are used inside of a Regular Expression
   *   character class (`[]`). See usages of this const. Alternatively, we can set
   *   the UglifyJS option `ascii_only` to true for the build, but that doesn't
   *   help others who are pulling in Autolinker into their own build and running
   *   UglifyJS themselves.
   */
  var decimalNumbersStr = /0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19/
      .source; // see note in above variable description
  /**
   * The string form of a regular expression that would match all of the
   * letters and decimal number chars in the unicode character set when placed in
   * a RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines
   * `[\p{L}\p{Nd}]` escape ("all letters and decimal numbers")
   */
  var alphaNumericCharsStr = alphaCharsAndMarksStr + decimalNumbersStr;
  /**
   * The string form of a regular expression that would match all of the
   * letters, combining marks, and decimal number chars in the unicode character
   * set when placed in a RegExp character class (`[]`).
   *
   * These would be the characters matched by unicode regex engines
   * `[\p{L}\p{M}\p{Nd}]` escape ("all letters, combining marks, and decimal
   * numbers")
   */
  var alphaNumericAndMarksCharsStr = alphaCharsAndMarksStr + decimalNumbersStr;
  // Simplified IP regular expression
  var ipStr = '(?:[' + decimalNumbersStr + ']{1,3}\\.){3}[' + decimalNumbersStr + ']{1,3}';
  // Protected domain label which do not allow "-" character on the beginning and the end of a single label
  var domainLabelStr = '[' + alphaNumericAndMarksCharsStr + '](?:[' + alphaNumericAndMarksCharsStr + '\\-]{0,61}[' + alphaNumericAndMarksCharsStr + '])?';
  var getDomainLabelStr = function (group) {
      return '(?=(' + domainLabelStr + '))\\' + group;
  };
  /**
   * A function to match domain names of a URL or email address.
   * Ex: 'google', 'yahoo', 'some-other-company', etc.
   */
  var getDomainNameStr = function (group) {
      return '(?:' + getDomainLabelStr(group) + '(?:\\.' + getDomainLabelStr(group + 1) + '){0,126}|' + ipStr + ')';
  };
  /**
   * A regular expression that is simply the character class of the characters
   * that may be used in a domain name, minus the '-' or '.'
   */
  var domainNameCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "]");

  // NOTE: THIS IS A GENERATED FILE
  // To update with the latest TLD list, run `npm run update-tld-regex` or `yarn update-tld-regex` (depending on which you have installed)
  var tldRegex = /(?:xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|northwesternmutual|travelersinsurance|vermögensberatung|xn--3oq18vl8pn36a|xn--5su34j936bgsg|xn--bck1b9a5dre4c|xn--mgbai9azgqp6j|xn--mgberp4a5d4ar|xn--xkc2dl3a5ee0h|vermögensberater|xn--fzys8d69uvgm|xn--mgba7c0bbn0a|xn--xkc2al3hye2a|americanexpress|kerryproperties|sandvikcoromant|xn--i1b6b1a6a2e|xn--kcrx77d1x4a|xn--lgbbat1ad8j|xn--mgba3a4f16a|xn--mgbaakc7dvf|xn--mgbc0a9azcg|xn--nqv7fs00ema|afamilycompany|americanfamily|bananarepublic|cancerresearch|cookingchannel|kerrylogistics|weatherchannel|xn--54b7fta0cc|xn--6qq986b3xl|xn--80aqecdr1a|xn--b4w605ferd|xn--fiq228c5hs|xn--h2breg3eve|xn--jlq61u9w7b|xn--mgba3a3ejt|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a71e|xn--mgbca7dzdo|xn--mgbi4ecexp|xn--mgbx4cd0ab|xn--rvc1e0am3e|international|lifeinsurance|spreadbetting|travelchannel|wolterskluwer|xn--eckvdtc9d|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--h2brj9c8c|xn--tiq49xqyj|xn--yfro4i67o|xn--ygbi2ammx|construction|lplfinancial|scholarships|versicherung|xn--3e0b707e|xn--45br5cyl|xn--80adxhks|xn--80asehdb|xn--8y0a063a|xn--gckr3f0f|xn--mgb9awbf|xn--mgbab2bd|xn--mgbgu82a|xn--mgbpl2fh|xn--mgbt3dhd|xn--mk1bu44c|xn--ngbc5azd|xn--ngbe9e0a|xn--ogbpf8fl|xn--qcka1pmc|accountants|barclaycard|blackfriday|blockbuster|bridgestone|calvinklein|contractors|creditunion|engineering|enterprises|foodnetwork|investments|kerryhotels|lamborghini|motorcycles|olayangroup|photography|playstation|productions|progressive|redumbrella|rightathome|williamhill|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--3bst00m|xn--3ds443g|xn--3hcrj9c|xn--42c2d9a|xn--45brj9c|xn--55qw42g|xn--6frz82g|xn--80ao21a|xn--9krt00a|xn--cck2b3b|xn--czr694b|xn--d1acj3b|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fjq720a|xn--flw351e|xn--g2xx48c|xn--gecrj9c|xn--gk3at1e|xn--h2brj9c|xn--hxt814e|xn--imr513n|xn--j6w193g|xn--jvr189m|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--mgbbh1a|xn--mgbtx2b|xn--mix891f|xn--nyqy26a|xn--otu796d|xn--pbt977c|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--rovu88b|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--vuq861b|xn--w4rs40l|xn--xhq521b|xn--zfr164b|சிங்கப்பூர்|accountant|apartments|associates|basketball|bnpparibas|boehringer|capitalone|consulting|creditcard|cuisinella|eurovision|extraspace|foundation|healthcare|immobilien|industries|management|mitsubishi|nationwide|newholland|nextdirect|onyourside|properties|protection|prudential|realestate|republican|restaurant|schaeffler|swiftcover|tatamotors|technology|telefonica|university|vistaprint|vlaanderen|volkswagen|xn--30rr7y|xn--3pxu8k|xn--45q11c|xn--4gbrim|xn--55qx5d|xn--5tzm5g|xn--80aswg|xn--90a3ac|xn--9dbq2a|xn--9et52u|xn--c2br7g|xn--cg4bki|xn--czrs0t|xn--czru2d|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--io0a7i|xn--kput3i|xn--mxtq1m|xn--o3cw4h|xn--pssy2u|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--y9a3aq|accenture|alfaromeo|allfinanz|amsterdam|analytics|aquarelle|barcelona|bloomberg|christmas|community|directory|education|equipment|fairwinds|financial|firestone|fresenius|frontdoor|fujixerox|furniture|goldpoint|hisamitsu|homedepot|homegoods|homesense|honeywell|institute|insurance|kuokgroup|ladbrokes|lancaster|landrover|lifestyle|marketing|marshalls|melbourne|microsoft|panasonic|passagens|pramerica|richardli|scjohnson|shangrila|solutions|statebank|statefarm|stockholm|travelers|vacations|xn--90ais|xn--c1avg|xn--d1alf|xn--e1a4c|xn--fhbei|xn--j1aef|xn--j1amh|xn--l1acc|xn--ngbrx|xn--nqv7f|xn--p1acf|xn--tckwe|xn--vhquv|yodobashi|abudhabi|airforce|allstate|attorney|barclays|barefoot|bargains|baseball|boutique|bradesco|broadway|brussels|budapest|builders|business|capetown|catering|catholic|chrysler|cipriani|cityeats|cleaning|clinique|clothing|commbank|computer|delivery|deloitte|democrat|diamonds|discount|discover|download|engineer|ericsson|esurance|etisalat|everbank|exchange|feedback|fidelity|firmdale|football|frontier|goodyear|grainger|graphics|guardian|hdfcbank|helsinki|holdings|hospital|infiniti|ipiranga|istanbul|jpmorgan|lighting|lundbeck|marriott|maserati|mckinsey|memorial|merckmsd|mortgage|movistar|observer|partners|pharmacy|pictures|plumbing|property|redstone|reliance|saarland|samsclub|security|services|shopping|showtime|softbank|software|stcgroup|supplies|symantec|training|uconnect|vanguard|ventures|verisign|woodside|xn--90ae|xn--node|xn--p1ai|xn--qxam|yokohama|السعودية|abogado|academy|agakhan|alibaba|android|athleta|auction|audible|auspost|avianca|banamex|bauhaus|bentley|bestbuy|booking|brother|bugatti|capital|caravan|careers|cartier|channel|charity|chintai|citadel|clubmed|college|cologne|comcast|company|compare|contact|cooking|corsica|country|coupons|courses|cricket|cruises|dentist|digital|domains|exposed|express|farmers|fashion|ferrari|ferrero|finance|fishing|fitness|flights|florist|flowers|forsale|frogans|fujitsu|gallery|genting|godaddy|grocery|guitars|hamburg|hangout|hitachi|holiday|hosting|hoteles|hotmail|hyundai|iselect|ismaili|jewelry|juniper|kitchen|komatsu|lacaixa|lancome|lanxess|lasalle|latrobe|leclerc|liaison|limited|lincoln|markets|metlife|monster|netbank|netflix|network|neustar|okinawa|oldnavy|organic|origins|philips|pioneer|politie|realtor|recipes|rentals|reviews|rexroth|samsung|sandvik|schmidt|schwarz|science|shiksha|shriram|singles|staples|starhub|storage|support|surgery|systems|temasek|theater|theatre|tickets|tiffany|toshiba|trading|walmart|wanggou|watches|weather|website|wedding|whoswho|windows|winners|xfinity|yamaxun|youtube|zuerich|католик|اتصالات|الجزائر|العليان|پاکستان|كاثوليك|موبايلي|இந்தியா|abarth|abbott|abbvie|active|africa|agency|airbus|airtel|alipay|alsace|alstom|anquan|aramco|author|bayern|beauty|berlin|bharti|blanco|bostik|boston|broker|camera|career|caseih|casino|center|chanel|chrome|church|circle|claims|clinic|coffee|comsec|condos|coupon|credit|cruise|dating|datsun|dealer|degree|dental|design|direct|doctor|dunlop|dupont|durban|emerck|energy|estate|events|expert|family|flickr|futbol|gallup|garden|george|giving|global|google|gratis|health|hermes|hiphop|hockey|hotels|hughes|imamat|insure|intuit|jaguar|joburg|juegos|kaufen|kinder|kindle|kosher|lancia|latino|lawyer|lefrak|living|locker|london|luxury|madrid|maison|makeup|market|mattel|mobile|mobily|monash|mormon|moscow|museum|mutual|nagoya|natura|nissan|nissay|norton|nowruz|office|olayan|online|oracle|orange|otsuka|pfizer|photos|physio|piaget|pictet|quebec|racing|realty|reisen|repair|report|review|rocher|rogers|ryukyu|safety|sakura|sanofi|school|schule|search|secure|select|shouji|soccer|social|stream|studio|supply|suzuki|swatch|sydney|taipei|taobao|target|tattoo|tennis|tienda|tjmaxx|tkmaxx|toyota|travel|unicom|viajes|viking|villas|virgin|vision|voting|voyage|vuelos|walter|warman|webcam|xihuan|yachts|yandex|zappos|москва|онлайн|ابوظبي|ارامكو|الاردن|المغرب|امارات|فلسطين|مليسيا|भारतम्|இலங்கை|ファッション|actor|adult|aetna|amfam|amica|apple|archi|audio|autos|azure|baidu|beats|bible|bingo|black|boats|bosch|build|canon|cards|chase|cheap|cisco|citic|click|cloud|coach|codes|crown|cymru|dabur|dance|deals|delta|dodge|drive|dubai|earth|edeka|email|epost|epson|faith|fedex|final|forex|forum|gallo|games|gifts|gives|glade|glass|globo|gmail|green|gripe|group|gucci|guide|homes|honda|horse|house|hyatt|ikano|intel|irish|iveco|jetzt|koeln|kyoto|lamer|lease|legal|lexus|lilly|linde|lipsy|lixil|loans|locus|lotte|lotto|lupin|macys|mango|media|miami|money|mopar|movie|nadex|nexus|nikon|ninja|nokia|nowtv|omega|osaka|paris|parts|party|phone|photo|pizza|place|poker|praxi|press|prime|promo|quest|radio|rehab|reise|ricoh|rocks|rodeo|rugby|salon|sener|seven|sharp|shell|shoes|skype|sling|smart|smile|solar|space|sport|stada|store|study|style|sucks|swiss|tatar|tires|tirol|tmall|today|tokyo|tools|toray|total|tours|trade|trust|tunes|tushu|ubank|vegas|video|vodka|volvo|wales|watch|weber|weibo|works|world|xerox|yahoo|zippo|ایران|بازار|بھارت|سودان|سورية|همراه|भारोत|संगठन|বাংলা|భారత్|ഭാരതം|嘉里大酒店|aarp|able|adac|aero|aigo|akdn|ally|amex|arab|army|arpa|arte|asda|asia|audi|auto|baby|band|bank|bbva|beer|best|bike|bing|blog|blue|bofa|bond|book|buzz|cafe|call|camp|care|cars|casa|case|cash|cbre|cern|chat|citi|city|club|cool|coop|cyou|data|date|dclk|deal|dell|desi|diet|dish|docs|doha|duck|duns|dvag|erni|fage|fail|fans|farm|fast|fiat|fido|film|fire|fish|flir|food|ford|free|fund|game|gbiz|gent|ggee|gift|gmbh|gold|golf|goog|guge|guru|hair|haus|hdfc|help|here|hgtv|host|hsbc|icbc|ieee|imdb|immo|info|itau|java|jeep|jobs|jprs|kddi|kiwi|kpmg|kred|land|lego|lgbt|lidl|life|like|limo|link|live|loan|loft|love|ltda|luxe|maif|meet|meme|menu|mini|mint|mobi|moda|moto|name|navy|news|next|nico|nike|ollo|open|page|pars|pccw|pics|ping|pink|play|plus|pohl|porn|post|prod|prof|qpon|raid|read|reit|rent|rest|rich|rmit|room|rsvp|ruhr|safe|sale|sarl|save|saxo|scor|scot|seat|seek|sexy|shaw|shia|shop|show|silk|sina|site|skin|sncf|sohu|song|sony|spot|star|surf|talk|taxi|team|tech|teva|tiaa|tips|town|toys|tube|vana|visa|viva|vivo|vote|voto|wang|weir|wien|wiki|wine|work|xbox|yoga|zara|zero|zone|дети|сайт|بارت|بيتك|ڀارت|تونس|شبكة|عراق|عمان|موقع|भारत|ভারত|ভাৰত|ਭਾਰਤ|ભારત|ଭାରତ|ಭಾರತ|ලංකා|グーグル|クラウド|ポイント|大众汽车|组织机构|電訊盈科|香格里拉|aaa|abb|abc|aco|ads|aeg|afl|aig|anz|aol|app|art|aws|axa|bar|bbc|bbt|bcg|bcn|bet|bid|bio|biz|bms|bmw|bnl|bom|boo|bot|box|buy|bzh|cab|cal|cam|car|cat|cba|cbn|cbs|ceb|ceo|cfa|cfd|com|crs|csc|dad|day|dds|dev|dhl|diy|dnp|dog|dot|dtv|dvr|eat|eco|edu|esq|eus|fan|fit|fly|foo|fox|frl|ftr|fun|fyi|gal|gap|gdn|gea|gle|gmo|gmx|goo|gop|got|gov|hbo|hiv|hkt|hot|how|ibm|ice|icu|ifm|inc|ing|ink|int|ist|itv|jcb|jcp|jio|jll|jmp|jnj|jot|joy|kfh|kia|kim|kpn|krd|lat|law|lds|llc|lol|lpl|ltd|man|map|mba|med|men|mil|mit|mlb|mls|mma|moe|moi|mom|mov|msd|mtn|mtr|nab|nba|nec|net|new|nfl|ngo|nhk|now|nra|nrw|ntt|nyc|obi|off|one|ong|onl|ooo|org|ott|ovh|pay|pet|phd|pid|pin|pnc|pro|pru|pub|pwc|qvc|red|ren|ril|rio|rip|run|rwe|sap|sas|sbi|sbs|sca|scb|ses|sew|sex|sfr|ski|sky|soy|srl|srt|stc|tab|tax|tci|tdk|tel|thd|tjx|top|trv|tui|tvs|ubs|uno|uol|ups|vet|vig|vin|vip|wed|win|wme|wow|wtc|wtf|xin|xxx|xyz|you|yun|zip|бел|ком|қаз|мкд|мон|орг|рус|срб|укр|հայ|קום|عرب|قطر|كوم|مصر|कॉम|नेट|คอม|ไทย|ストア|セール|みんな|中文网|天主教|我爱你|新加坡|淡马锡|诺基亚|飞利浦|ac|ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|ελ|бг|ею|рф|გე|닷넷|닷컴|삼성|한국|コム|世界|中信|中国|中國|企业|佛山|信息|健康|八卦|公司|公益|台湾|台灣|商城|商店|商标|嘉里|在线|大拿|娱乐|家電|工行|广东|微博|慈善|手机|手表|招聘|政务|政府|新闻|时尚|書籍|机构|游戏|澳門|点看|珠宝|移动|网址|网店|网站|网络|联通|谷歌|购物|通販|集团|食品|餐厅|香港)/;

  // For debugging: search for other "For debugging" lines
  // import CliTable from 'cli-table';
  /**
   * @class Autolinker.matcher.Email
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find email matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
   */
  var EmailMatcher = /** @class */ (function (_super) {
      __extends(EmailMatcher, _super);
      function EmailMatcher() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          /**
           * Valid characters that can be used in the "local" part of an email address,
           * i.e. the "name" part of "name@site.com"
           */
          _this.localPartCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "!#$%&'*+/=?^_`{|}~-]");
          /**
           * Stricter TLD regex which adds a beginning and end check to ensure
           * the string is a valid TLD
           */
          _this.strictTldRegex = new RegExp("^" + tldRegex.source + "$");
          return _this;
      }
      /**
       * @inheritdoc
       */
      EmailMatcher.prototype.parseMatches = function (text) {
          var tagBuilder = this.tagBuilder, localPartCharRegex = this.localPartCharRegex, strictTldRegex = this.strictTldRegex, matches = [], len = text.length, noCurrentEmailMatch = new CurrentEmailMatch();
          // for matching a 'mailto:' prefix
          var mailtoTransitions = {
              'm': 'a',
              'a': 'i',
              'i': 'l',
              'l': 't',
              't': 'o',
              'o': ':',
          };
          var charIdx = 0, state = 0 /* NonEmailMatch */, currentEmailMatch = noCurrentEmailMatch;
          // For debugging: search for other "For debugging" lines
          // const table = new CliTable( {
          // 	head: [ 'charIdx', 'char', 'state', 'charIdx', 'currentEmailAddress.idx', 'hasDomainDot' ]
          // } );
          while (charIdx < len) {
              var char = text.charAt(charIdx);
              // For debugging: search for other "For debugging" lines
              // table.push( 
              // 	[ charIdx, char, State[ state ], charIdx, currentEmailAddress.idx, currentEmailAddress.hasDomainDot ] 
              // );
              switch (state) {
                  case 0 /* NonEmailMatch */:
                      stateNonEmailAddress(char);
                      break;
                  case 1 /* Mailto */:
                      stateMailTo(text.charAt(charIdx - 1), char);
                      break;
                  case 2 /* LocalPart */:
                      stateLocalPart(char);
                      break;
                  case 3 /* LocalPartDot */:
                      stateLocalPartDot(char);
                      break;
                  case 4 /* AtSign */:
                      stateAtSign(char);
                      break;
                  case 5 /* DomainChar */:
                      stateDomainChar(char);
                      break;
                  case 6 /* DomainHyphen */:
                      stateDomainHyphen(char);
                      break;
                  case 7 /* DomainDot */:
                      stateDomainDot(char);
                      break;
                  default:
                      throwUnhandledCaseError(state);
              }
              // For debugging: search for other "For debugging" lines
              // table.push( 
              // 	[ charIdx, char, State[ state ], charIdx, currentEmailAddress.idx, currentEmailAddress.hasDomainDot ] 
              // );
              charIdx++;
          }
          // Capture any valid match at the end of the string
          captureMatchIfValidAndReset();
          // For debugging: search for other "For debugging" lines
          //console.log( '\n' + table.toString() );
          return matches;
          // Handles the state when we're not in an email address
          function stateNonEmailAddress(char) {
              if (char === 'm') {
                  beginEmailMatch(1 /* Mailto */);
              }
              else if (localPartCharRegex.test(char)) {
                  beginEmailMatch();
              }
          }
          // Handles if we're reading a 'mailto:' prefix on the string
          function stateMailTo(prevChar, char) {
              if (prevChar === ':') {
                  // We've reached the end of the 'mailto:' prefix
                  if (localPartCharRegex.test(char)) {
                      state = 2 /* LocalPart */;
                      currentEmailMatch = new CurrentEmailMatch(__assign({}, currentEmailMatch, { hasMailtoPrefix: true }));
                  }
                  else {
                      // we've matched 'mailto:' but didn't get anything meaningful
                      // immediately afterwards (for example, we encountered a 
                      // space character, or an '@' character which formed 'mailto:@'
                      resetToNonEmailMatchState();
                  }
              }
              else if (mailtoTransitions[prevChar] === char) ;
              else if (localPartCharRegex.test(char)) {
                  // We we're reading a prefix of 'mailto:', but encountered a
                  // different character that didn't continue the prefix
                  state = 2 /* LocalPart */;
              }
              else if (char === '.') {
                  // We we're reading a prefix of 'mailto:', but encountered a
                  // dot character
                  state = 3 /* LocalPartDot */;
              }
              else if (char === '@') {
                  // We we're reading a prefix of 'mailto:', but encountered a
                  // an @ character
                  state = 4 /* AtSign */;
              }
              else {
                  // not an email address character, return to "NonEmailAddress" state
                  resetToNonEmailMatchState();
              }
          }
          // Handles the state when we're currently in the "local part" of an 
          // email address (as opposed to the "domain part")
          function stateLocalPart(char) {
              if (char === '.') {
                  state = 3 /* LocalPartDot */;
              }
              else if (char === '@') {
                  state = 4 /* AtSign */;
              }
              else if (localPartCharRegex.test(char)) ;
              else {
                  // not an email address character, return to "NonEmailAddress" state
                  resetToNonEmailMatchState();
              }
          }
          // Handles the state where we've read 
          function stateLocalPartDot(char) {
              if (char === '.') {
                  // We read a second '.' in a row, not a valid email address 
                  // local part
                  resetToNonEmailMatchState();
              }
              else if (char === '@') {
                  // We read the '@' character immediately after a dot ('.'), not 
                  // an email address
                  resetToNonEmailMatchState();
              }
              else if (localPartCharRegex.test(char)) {
                  state = 2 /* LocalPart */;
              }
              else {
                  // Anything else, not an email address
                  resetToNonEmailMatchState();
              }
          }
          function stateAtSign(char) {
              if (domainNameCharRegex.test(char)) {
                  state = 5 /* DomainChar */;
              }
              else {
                  // Anything else, not an email address
                  resetToNonEmailMatchState();
              }
          }
          function stateDomainChar(char) {
              if (char === '.') {
                  state = 7 /* DomainDot */;
              }
              else if (char === '-') {
                  state = 6 /* DomainHyphen */;
              }
              else if (domainNameCharRegex.test(char)) ;
              else {
                  // Anything else, we potentially matched if the criteria has
                  // been met
                  captureMatchIfValidAndReset();
              }
          }
          function stateDomainHyphen(char) {
              if (char === '-' || char === '.') {
                  // Not valid to have two hyphens ("--") or hypen+dot ("-.")
                  captureMatchIfValidAndReset();
              }
              else if (domainNameCharRegex.test(char)) {
                  state = 5 /* DomainChar */;
              }
              else {
                  // Anything else
                  captureMatchIfValidAndReset();
              }
          }
          function stateDomainDot(char) {
              if (char === '.' || char === '-') {
                  // not valid to have two dots ("..") or dot+hypen (".-")
                  captureMatchIfValidAndReset();
              }
              else if (domainNameCharRegex.test(char)) {
                  state = 5 /* DomainChar */;
                  // After having read a '.' and then a valid domain character,
                  // we now know that the domain part of the email is valid, and
                  // we have found at least a partial EmailMatch (however, the
                  // email address may have additional characters from this point)
                  currentEmailMatch = new CurrentEmailMatch(__assign({}, currentEmailMatch, { hasDomainDot: true }));
              }
              else {
                  // Anything else
                  captureMatchIfValidAndReset();
              }
          }
          function beginEmailMatch(newState) {
              if (newState === void 0) { newState = 2 /* LocalPart */; }
              state = newState;
              currentEmailMatch = new CurrentEmailMatch({ idx: charIdx });
          }
          function resetToNonEmailMatchState() {
              state = 0 /* NonEmailMatch */;
              currentEmailMatch = noCurrentEmailMatch;
          }
          /*
           * Captures the current email address as an EmailMatch if it's valid,
           * and resets the state to read another email address.
           */
          function captureMatchIfValidAndReset() {
              if (currentEmailMatch.hasDomainDot) { // we need at least one dot in the domain to be considered a valid email address
                  var matchedText = text.slice(currentEmailMatch.idx, charIdx);
                  // If we read a '.' or '-' char that ended the email address
                  // (valid domain name characters, but only valid email address
                  // characters if they are followed by something else), strip 
                  // it off now
                  if (/[-.]$/.test(matchedText)) {
                      matchedText = matchedText.slice(0, -1);
                  }
                  var emailAddress = currentEmailMatch.hasMailtoPrefix
                      ? matchedText.slice('mailto:'.length)
                      : matchedText;
                  // if the email address has a valid TLD, add it to the list of matches
                  if (doesEmailHaveValidTld(emailAddress)) {
                      matches.push(new EmailMatch({
                          tagBuilder: tagBuilder,
                          matchedText: matchedText,
                          offset: currentEmailMatch.idx,
                          email: emailAddress
                      }));
                  }
              }
              resetToNonEmailMatchState();
              /**
               * Determines if the given email address has a valid TLD or not
               * @param {string} emailAddress - email address
               * @return {Boolean} - true is email have valid TLD, false otherwise
               */
              function doesEmailHaveValidTld(emailAddress) {
                  var emailAddressTld = emailAddress.split('.').pop() || '';
                  var emailAddressNormalized = emailAddressTld.toLowerCase();
                  var isValidTld = strictTldRegex.test(emailAddressNormalized);
                  return isValidTld;
              }
          }
      };
      return EmailMatcher;
  }(Matcher));
  var CurrentEmailMatch = /** @class */ (function () {
      function CurrentEmailMatch(cfg) {
          if (cfg === void 0) { cfg = {}; }
          this.idx = cfg.idx !== undefined ? cfg.idx : -1;
          this.hasMailtoPrefix = !!cfg.hasMailtoPrefix;
          this.hasDomainDot = !!cfg.hasDomainDot;
      }
      return CurrentEmailMatch;
  }());

  /**
   * @private
   * @class Autolinker.matcher.UrlMatchValidator
   * @singleton
   *
   * Used by Autolinker to filter out false URL positives from the
   * {@link Autolinker.matcher.Url UrlMatcher}.
   *
   * Due to the limitations of regular expressions (including the missing feature
   * of look-behinds in JS regular expressions), we cannot always determine the
   * validity of a given match. This class applies a bit of additional logic to
   * filter out any false positives that have been matched by the
   * {@link Autolinker.matcher.Url UrlMatcher}.
   */
  var UrlMatchValidator = /** @class */ (function () {
      function UrlMatchValidator() {
      }
      /**
       * Determines if a given URL match found by the {@link Autolinker.matcher.Url UrlMatcher}
       * is valid. Will return `false` for:
       *
       * 1) URL matches which do not have at least have one period ('.') in the
       *    domain name (effectively skipping over matches like "abc:def").
       *    However, URL matches with a protocol will be allowed (ex: 'http://localhost')
       * 2) URL matches which do not have at least one word character in the
       *    domain name (effectively skipping over matches like "git:1.0").
       * 3) A protocol-relative url match (a URL beginning with '//') whose
       *    previous character is a word character (effectively skipping over
       *    strings like "abc//google.com")
       *
       * Otherwise, returns `true`.
       *
       * @param {String} urlMatch The matched URL, if there was one. Will be an
       *   empty string if the match is not a URL match.
       * @param {String} protocolUrlMatch The match URL string for a protocol
       *   match. Ex: 'http://yahoo.com'. This is used to match something like
       *   'http://localhost', where we won't double check that the domain name
       *   has at least one '.' in it.
       * @return {Boolean} `true` if the match given is valid and should be
       *   processed, or `false` if the match is invalid and/or should just not be
       *   processed.
       */
      UrlMatchValidator.isValid = function (urlMatch, protocolUrlMatch) {
          if ((protocolUrlMatch && !this.isValidUriScheme(protocolUrlMatch)) ||
              this.urlMatchDoesNotHaveProtocolOrDot(urlMatch, protocolUrlMatch) || // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
              (this.urlMatchDoesNotHaveAtLeastOneWordChar(urlMatch, protocolUrlMatch) && // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
                  !this.isValidIpAddress(urlMatch)) || // Except if it's an IP address
              this.containsMultipleDots(urlMatch)) {
              return false;
          }
          return true;
      };
      UrlMatchValidator.isValidIpAddress = function (uriSchemeMatch) {
          var newRegex = new RegExp(this.hasFullProtocolRegex.source + this.ipRegex.source);
          var uriScheme = uriSchemeMatch.match(newRegex);
          return uriScheme !== null;
      };
      UrlMatchValidator.containsMultipleDots = function (urlMatch) {
          var stringBeforeSlash = urlMatch;
          if (this.hasFullProtocolRegex.test(urlMatch)) {
              stringBeforeSlash = urlMatch.split('://')[1];
          }
          return stringBeforeSlash.split('/')[0].indexOf("..") > -1;
      };
      /**
       * Determines if the URI scheme is a valid scheme to be autolinked. Returns
       * `false` if the scheme is 'javascript:' or 'vbscript:'
       *
       * @private
       * @param {String} uriSchemeMatch The match URL string for a full URI scheme
       *   match. Ex: 'http://yahoo.com' or 'mailto:a@a.com'.
       * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
       */
      UrlMatchValidator.isValidUriScheme = function (uriSchemeMatch) {
          var uriSchemeMatchArr = uriSchemeMatch.match(this.uriSchemeRegex), uriScheme = uriSchemeMatchArr && uriSchemeMatchArr[0].toLowerCase();
          return (uriScheme !== 'javascript:' && uriScheme !== 'vbscript:');
      };
      /**
       * Determines if a URL match does not have either:
       *
       * a) a full protocol (i.e. 'http://'), or
       * b) at least one dot ('.') in the domain name (for a non-full-protocol
       *    match).
       *
       * Either situation is considered an invalid URL (ex: 'git:d' does not have
       * either the '://' part, or at least one dot in the domain name. If the
       * match was 'git:abc.com', we would consider this valid.)
       *
       * @private
       * @param {String} urlMatch The matched URL, if there was one. Will be an
       *   empty string if the match is not a URL match.
       * @param {String} protocolUrlMatch The match URL string for a protocol
       *   match. Ex: 'http://yahoo.com'. This is used to match something like
       *   'http://localhost', where we won't double check that the domain name
       *   has at least one '.' in it.
       * @return {Boolean} `true` if the URL match does not have a full protocol,
       *   or at least one dot ('.') in a non-full-protocol match.
       */
      UrlMatchValidator.urlMatchDoesNotHaveProtocolOrDot = function (urlMatch, protocolUrlMatch) {
          return (!!urlMatch && (!protocolUrlMatch || !this.hasFullProtocolRegex.test(protocolUrlMatch)) && urlMatch.indexOf('.') === -1);
      };
      /**
       * Determines if a URL match does not have at least one word character after
       * the protocol (i.e. in the domain name).
       *
       * At least one letter character must exist in the domain name after a
       * protocol match. Ex: skip over something like "git:1.0"
       *
       * @private
       * @param {String} urlMatch The matched URL, if there was one. Will be an
       *   empty string if the match is not a URL match.
       * @param {String} protocolUrlMatch The match URL string for a protocol
       *   match. Ex: 'http://yahoo.com'. This is used to know whether or not we
       *   have a protocol in the URL string, in order to check for a word
       *   character after the protocol separator (':').
       * @return {Boolean} `true` if the URL match does not have at least one word
       *   character in it after the protocol, `false` otherwise.
       */
      UrlMatchValidator.urlMatchDoesNotHaveAtLeastOneWordChar = function (urlMatch, protocolUrlMatch) {
          if (urlMatch && protocolUrlMatch) {
              return !this.hasWordCharAfterProtocolRegex.test(urlMatch);
          }
          else {
              return false;
          }
      };
      /**
       * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
       *
       * @private
       * @property {RegExp} hasFullProtocolRegex
       */
      UrlMatchValidator.hasFullProtocolRegex = /^[A-Za-z][-.+A-Za-z0-9]*:\/\//;
      /**
       * Regex to find the URI scheme, such as 'mailto:'.
       *
       * This is used to filter out 'javascript:' and 'vbscript:' schemes.
       *
       * @private
       * @property {RegExp} uriSchemeRegex
       */
      UrlMatchValidator.uriSchemeRegex = /^[A-Za-z][-.+A-Za-z0-9]*:/;
      /**
       * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
       *
       * @private
       * @property {RegExp} hasWordCharAfterProtocolRegex
       */
      UrlMatchValidator.hasWordCharAfterProtocolRegex = new RegExp(":[^\\s]*?[" + alphaCharsStr + "]");
      /**
       * Regex to determine if the string is a valid IP address
       *
       * @private
       * @property {RegExp} ipRegex
       */
      UrlMatchValidator.ipRegex = /[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/;
      return UrlMatchValidator;
  }());

  /**
   * @class Autolinker.matcher.Url
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find URL matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
   */
  var UrlMatcher = /** @class */ (function (_super) {
      __extends(UrlMatcher, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match instance,
       *   specified in an Object (map).
       */
      function UrlMatcher(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {Object} stripPrefix (required)
           *
           * The Object form of {@link Autolinker#cfg-stripPrefix}.
           */
          _this.stripPrefix = { scheme: true, www: true }; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} stripTrailingSlash (required)
           * @inheritdoc Autolinker#stripTrailingSlash
           */
          _this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} decodePercentEncoding (required)
           * @inheritdoc Autolinker#decodePercentEncoding
           */
          _this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @protected
           * @property {RegExp} matcherRegex
           *
           * The regular expression to match URLs with an optional scheme, port
           * number, path, query string, and hash anchor.
           *
           * Example matches:
           *
           *     http://google.com
           *     www.google.com
           *     google.com/path/to/file?q1=1&q2=2#myAnchor
           *
           *
           * This regular expression will have the following capturing groups:
           *
           * 1.  Group that matches a scheme-prefixed URL (i.e. 'http://google.com').
           *     This is used to match scheme URLs with just a single word, such as
           *     'http://localhost', where we won't double check that the domain name
           *     has at least one dot ('.') in it.
           * 2.  Group that matches a 'www.' prefixed URL. This is only matched if the
           *     'www.' text was not prefixed by a scheme (i.e.: not prefixed by
           *     'http://', 'ftp:', etc.)
           * 3.  A protocol-relative ('//') match for the case of a 'www.' prefixed
           *     URL. Will be an empty string if it is not a protocol-relative match.
           *     We need to know the character before the '//' in order to determine
           *     if it is a valid match or the // was in a string we don't want to
           *     auto-link.
           * 4.  Group that matches a known TLD (top level domain), when a scheme
           *     or 'www.'-prefixed domain is not matched.
           * 5.  A protocol-relative ('//') match for the case of a known TLD prefixed
           *     URL. Will be an empty string if it is not a protocol-relative match.
           *     See #3 for more info.
           */
          _this.matcherRegex = (function () {
              var schemeRegex = /(?:[A-Za-z][-.+A-Za-z0-9]{0,63}:(?![A-Za-z][-.+A-Za-z0-9]{0,63}:\/\/)(?!\d+\/?)(?:\/\/)?)/, // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
              wwwRegex = /(?:www\.)/, // starting with 'www.'
              // Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
              // http://blog.codinghorror.com/the-problem-with-urls/
              urlSuffixRegex = new RegExp('[/?#](?:[' + alphaNumericAndMarksCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]?!:,.;\u2713]*[' + alphaNumericAndMarksCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]\u2713])?');
              return new RegExp([
                  '(?:',
                  '(',
                  schemeRegex.source,
                  getDomainNameStr(2),
                  ')',
                  '|',
                  '(',
                  '(//)?',
                  wwwRegex.source,
                  getDomainNameStr(6),
                  ')',
                  '|',
                  '(',
                  '(//)?',
                  getDomainNameStr(10) + '\\.',
                  tldRegex.source,
                  '(?![-' + alphaNumericCharsStr + '])',
                  ')',
                  ')',
                  '(?::[0-9]+)?',
                  '(?:' + urlSuffixRegex.source + ')?' // match for path, query string, and/or hash anchor - optional
              ].join(""), 'gi');
          })();
          /**
           * A regular expression to use to check the character before a protocol-relative
           * URL match. We don't want to match a protocol-relative URL if it is part
           * of another word.
           *
           * For example, we want to match something like "Go to: //google.com",
           * but we don't want to match something like "abc//google.com"
           *
           * This regular expression is used to test the character before the '//'.
           *
           * @protected
           * @type {RegExp} wordCharRegExp
           */
          _this.wordCharRegExp = new RegExp('[' + alphaNumericAndMarksCharsStr + ']');
          _this.stripPrefix = cfg.stripPrefix;
          _this.stripTrailingSlash = cfg.stripTrailingSlash;
          _this.decodePercentEncoding = cfg.decodePercentEncoding;
          return _this;
      }
      /**
       * @inheritdoc
       */
      UrlMatcher.prototype.parseMatches = function (text) {
          var matcherRegex = this.matcherRegex, stripPrefix = this.stripPrefix, stripTrailingSlash = this.stripTrailingSlash, decodePercentEncoding = this.decodePercentEncoding, tagBuilder = this.tagBuilder, matches = [], match;
          var _loop_1 = function () {
              var matchStr = match[0], schemeUrlMatch = match[1], wwwUrlMatch = match[4], wwwProtocolRelativeMatch = match[5], 
              //tldUrlMatch = match[ 8 ],  -- not needed at the moment
              tldProtocolRelativeMatch = match[9], offset = match.index, protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch, prevChar = text.charAt(offset - 1);
              if (!UrlMatchValidator.isValid(matchStr, schemeUrlMatch)) {
                  return "continue";
              }
              // If the match is preceded by an '@' character, then it is either
              // an email address or a username. Skip these types of matches.
              if (offset > 0 && prevChar === '@') {
                  return "continue";
              }
              // If it's a protocol-relative '//' match, but the character before the '//'
              // was a word character (i.e. a letter/number), then we found the '//' in the
              // middle of another word (such as "asdf//asdf.com"). In this case, skip the
              // match.
              if (offset > 0 && protocolRelativeMatch && this_1.wordCharRegExp.test(prevChar)) {
                  return "continue";
              }
              // If the URL ends with a question mark, don't include the question
              // mark as part of the URL. We'll assume the question mark was the
              // end of a sentence, such as: "Going to google.com?"
              if (/\?$/.test(matchStr)) {
                  matchStr = matchStr.substr(0, matchStr.length - 1);
              }
              // Handle a closing parenthesis or square bracket at the end of the 
              // match, and exclude it if there is not a matching open parenthesis 
              // or square bracket in the match itself.
              if (this_1.matchHasUnbalancedClosingParen(matchStr)) {
                  matchStr = matchStr.substr(0, matchStr.length - 1); // remove the trailing ")"
              }
              else {
                  // Handle an invalid character after the TLD
                  var pos = this_1.matchHasInvalidCharAfterTld(matchStr, schemeUrlMatch);
                  if (pos > -1) {
                      matchStr = matchStr.substr(0, pos); // remove the trailing invalid chars
                  }
              }
              // The autolinker accepts many characters in a url's scheme (like `fake://test.com`).
              // However, in cases where a URL is missing whitespace before an obvious link,
              // (for example: `nowhitespacehttp://www.test.com`), we only want the match to start
              // at the http:// part. We will check if the match contains a common scheme and then 
              // shift the match to start from there. 		
              var foundCommonScheme = ['http://', 'https://'].find(function (commonScheme) { return !!schemeUrlMatch && schemeUrlMatch.indexOf(commonScheme) !== -1; });
              if (foundCommonScheme) {
                  // If we found an overmatched URL, we want to find the index
                  // of where the match should start and shift the match to
                  // start from the beginning of the common scheme
                  var indexOfSchemeStart = matchStr.indexOf(foundCommonScheme);
                  matchStr = matchStr.substr(indexOfSchemeStart);
                  schemeUrlMatch = schemeUrlMatch.substr(indexOfSchemeStart);
                  offset = offset + indexOfSchemeStart;
              }
              var urlMatchType = schemeUrlMatch ? 'scheme' : (wwwUrlMatch ? 'www' : 'tld'), protocolUrlMatch = !!schemeUrlMatch;
              matches.push(new UrlMatch({
                  tagBuilder: tagBuilder,
                  matchedText: matchStr,
                  offset: offset,
                  urlMatchType: urlMatchType,
                  url: matchStr,
                  protocolUrlMatch: protocolUrlMatch,
                  protocolRelativeMatch: !!protocolRelativeMatch,
                  stripPrefix: stripPrefix,
                  stripTrailingSlash: stripTrailingSlash,
                  decodePercentEncoding: decodePercentEncoding,
              }));
          };
          var this_1 = this;
          while ((match = matcherRegex.exec(text)) !== null) {
              _loop_1();
          }
          return matches;
      };
      /**
       * Determines if a match found has an unmatched closing parenthesis or
       * square bracket. If so, the parenthesis or square bracket will be removed
       * from the match itself, and appended after the generated anchor tag.
       *
       * A match may have an extra closing parenthesis at the end of the match
       * because the regular expression must include parenthesis for URLs such as
       * "wikipedia.com/something_(disambiguation)", which should be auto-linked.
       *
       * However, an extra parenthesis *will* be included when the URL itself is
       * wrapped in parenthesis, such as in the case of:
       *     "(wikipedia.com/something_(disambiguation))"
       * In this case, the last closing parenthesis should *not* be part of the
       * URL itself, and this method will return `true`.
       *
       * For square brackets in URLs such as in PHP arrays, the same behavior as
       * parenthesis discussed above should happen:
       *     "[http://www.example.com/foo.php?bar[]=1&bar[]=2&bar[]=3]"
       * The closing square bracket should not be part of the URL itself, and this
       * method will return `true`.
       *
       * @protected
       * @param {String} matchStr The full match string from the {@link #matcherRegex}.
       * @return {Boolean} `true` if there is an unbalanced closing parenthesis or
       *   square bracket at the end of the `matchStr`, `false` otherwise.
       */
      UrlMatcher.prototype.matchHasUnbalancedClosingParen = function (matchStr) {
          var endChar = matchStr.charAt(matchStr.length - 1);
          var startChar;
          if (endChar === ')') {
              startChar = '(';
          }
          else if (endChar === ']') {
              startChar = '[';
          }
          else {
              return false; // not a close parenthesis or square bracket
          }
          // Find if there are the same number of open braces as close braces in
          // the URL string, minus the last character (which we have already 
          // determined to be either ')' or ']'
          var numOpenBraces = 0;
          for (var i = 0, len = matchStr.length - 1; i < len; i++) {
              var char = matchStr.charAt(i);
              if (char === startChar) {
                  numOpenBraces++;
              }
              else if (char === endChar) {
                  numOpenBraces = Math.max(numOpenBraces - 1, 0);
              }
          }
          // If the number of open braces matches the number of close braces in
          // the URL minus the last character, then the match has *unbalanced*
          // braces because of the last character. Example of unbalanced braces
          // from the regex match:
          //     "http://example.com?a[]=1]"
          if (numOpenBraces === 0) {
              return true;
          }
          return false;
      };
      /**
       * Determine if there's an invalid character after the TLD in a URL. Valid
       * characters after TLD are ':/?#'. Exclude scheme matched URLs from this
       * check.
       *
       * @protected
       * @param {String} urlMatch The matched URL, if there was one. Will be an
       *   empty string if the match is not a URL match.
       * @param {String} schemeUrlMatch The match URL string for a scheme
       *   match. Ex: 'http://yahoo.com'. This is used to match something like
       *   'http://localhost', where we won't double check that the domain name
       *   has at least one '.' in it.
       * @return {Number} the position where the invalid character was found. If
       *   no such character was found, returns -1
       */
      UrlMatcher.prototype.matchHasInvalidCharAfterTld = function (urlMatch, schemeUrlMatch) {
          if (!urlMatch) {
              return -1;
          }
          var offset = 0;
          if (schemeUrlMatch) {
              offset = urlMatch.indexOf(':');
              urlMatch = urlMatch.slice(offset);
          }
          var re = new RegExp("^((.?\/\/)?[-." + alphaNumericAndMarksCharsStr + "]*[-" + alphaNumericAndMarksCharsStr + "]\\.[-" + alphaNumericAndMarksCharsStr + "]+)");
          var res = re.exec(urlMatch);
          if (res === null) {
              return -1;
          }
          offset += res[1].length;
          urlMatch = urlMatch.slice(res[1].length);
          if (/^[^-.A-Za-z0-9:\/?#]/.test(urlMatch)) {
              return offset;
          }
          return -1;
      };
      return UrlMatcher;
  }(Matcher));

  /**
   * @class Autolinker.matcher.Hashtag
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find HashtagMatch matches in an input string.
   */
  var HashtagMatcher = /** @class */ (function (_super) {
      __extends(HashtagMatcher, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match instance,
       *   specified in an Object (map).
       */
      function HashtagMatcher(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {String} serviceName
           *
           * The service to point hashtag matches to. See {@link Autolinker#hashtag}
           * for available values.
           */
          _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * The regular expression to match Hashtags. Example match:
           *
           *     #asdf
           *
           * @protected
           * @property {RegExp} matcherRegex
           */
          _this.matcherRegex = new RegExp("#[_" + alphaNumericAndMarksCharsStr + "]{1,139}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'); // lookahead used to make sure we don't match something above 139 characters
          /**
           * The regular expression to use to check the character before a username match to
           * make sure we didn't accidentally match an email address.
           *
           * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
           *
           * @protected
           * @property {RegExp} nonWordCharRegex
           */
          _this.nonWordCharRegex = new RegExp('[^' + alphaNumericAndMarksCharsStr + ']');
          _this.serviceName = cfg.serviceName;
          return _this;
      }
      /**
       * @inheritdoc
       */
      HashtagMatcher.prototype.parseMatches = function (text) {
          var matcherRegex = this.matcherRegex, nonWordCharRegex = this.nonWordCharRegex, serviceName = this.serviceName, tagBuilder = this.tagBuilder, matches = [], match;
          while ((match = matcherRegex.exec(text)) !== null) {
              var offset = match.index, prevChar = text.charAt(offset - 1);
              // If we found the match at the beginning of the string, or we found the match
              // and there is a whitespace char in front of it (meaning it is not a '#' char
              // in the middle of a word), then it is a hashtag match.
              if (offset === 0 || nonWordCharRegex.test(prevChar)) {
                  var matchedText = match[0], hashtag = match[0].slice(1); // strip off the '#' character at the beginning
                  matches.push(new HashtagMatch({
                      tagBuilder: tagBuilder,
                      matchedText: matchedText,
                      offset: offset,
                      serviceName: serviceName,
                      hashtag: hashtag
                  }));
              }
          }
          return matches;
      };
      return HashtagMatcher;
  }(Matcher));

  /**
   * @class Autolinker.matcher.Phone
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find Phone number matches in an input string.
   *
   * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more
   * details.
   */
  var PhoneMatcher = /** @class */ (function (_super) {
      __extends(PhoneMatcher, _super);
      function PhoneMatcher() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          /**
           * The regular expression to match Phone numbers. Example match:
           *
           *     (123) 456-7890
           *
           * This regular expression has the following capturing groups:
           *
           * 1 or 2. The prefixed '+' sign, if there is one.
           *
           * @protected
           * @property {RegExp} matcherRegex
           */
          _this.matcherRegex = /(?:(?:(?:(\+)?\d{1,3}[-\040.]?)?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]?\d{4})|(?:(\+)(?:9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)[-\040.]?(?:\d[-\040.]?){6,12}\d+))([,;]+[0-9]+#?)*/g;
          return _this;
      }
      // ex: (123) 456-7890, 123 456 7890, 123-456-7890, +18004441234,,;,10226420346#,
      // +1 (800) 444 1234, 10226420346#, 1-800-444-1234,1022,64,20346#
      /**
       * @inheritdoc
       */
      PhoneMatcher.prototype.parseMatches = function (text) {
          var matcherRegex = this.matcherRegex, tagBuilder = this.tagBuilder, matches = [], match;
          while ((match = matcherRegex.exec(text)) !== null) {
              // Remove non-numeric values from phone number string
              var matchedText = match[0], cleanNumber = matchedText.replace(/[^0-9,;#]/g, ''), // strip out non-digit characters exclude comma semicolon and #
              plusSign = !!(match[1] || match[2]), // match[ 1 ] or match[ 2 ] is the prefixed plus sign, if there is one
              before = match.index == 0 ? '' : text.substr(match.index - 1, 1), after = text.substr(match.index + matchedText.length, 1), contextClear = !before.match(/\d/) && !after.match(/\d/);
              if (this.testMatch(match[3]) && this.testMatch(matchedText) && contextClear) {
                  matches.push(new PhoneMatch({
                      tagBuilder: tagBuilder,
                      matchedText: matchedText,
                      offset: match.index,
                      number: cleanNumber,
                      plusSign: plusSign
                  }));
              }
          }
          return matches;
      };
      PhoneMatcher.prototype.testMatch = function (text) {
          return /\D/.test(text);
      };
      return PhoneMatcher;
  }(Matcher));

  /**
   * @class Autolinker.matcher.Mention
   * @extends Autolinker.matcher.Matcher
   *
   * Matcher to find/replace username matches in an input string.
   */
  var MentionMatcher = /** @class */ (function (_super) {
      __extends(MentionMatcher, _super);
      /**
       * @method constructor
       * @param {Object} cfg The configuration properties for the Match instance,
       *   specified in an Object (map).
       */
      function MentionMatcher(cfg) {
          var _this = _super.call(this, cfg) || this;
          /**
           * @cfg {'twitter'/'instagram'/'soundcloud'} protected
           *
           * The name of service to link @mentions to.
           *
           * Valid values are: 'twitter', 'instagram', or 'soundcloud'
           */
          _this.serviceName = 'twitter'; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * Hash of regular expression to match username handles. Example match:
           *
           *     @asdf
           *
           * @private
           * @property {Object} matcherRegexes
           */
          _this.matcherRegexes = {
              'twitter': new RegExp("@[_" + alphaNumericAndMarksCharsStr + "]{1,50}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'),
              'instagram': new RegExp("@[_." + alphaNumericAndMarksCharsStr + "]{1,30}(?![_" + alphaNumericAndMarksCharsStr + "])", 'g'),
              'soundcloud': new RegExp("@[-_." + alphaNumericAndMarksCharsStr + "]{1,50}(?![-_" + alphaNumericAndMarksCharsStr + "])", 'g') // lookahead used to make sure we don't match something above 50 characters
          };
          /**
           * The regular expression to use to check the character before a username match to
           * make sure we didn't accidentally match an email address.
           *
           * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
           *
           * @private
           * @property {RegExp} nonWordCharRegex
           */
          _this.nonWordCharRegex = new RegExp('[^' + alphaNumericAndMarksCharsStr + ']');
          _this.serviceName = cfg.serviceName;
          return _this;
      }
      /**
       * @inheritdoc
       */
      MentionMatcher.prototype.parseMatches = function (text) {
          var serviceName = this.serviceName, matcherRegex = this.matcherRegexes[this.serviceName], nonWordCharRegex = this.nonWordCharRegex, tagBuilder = this.tagBuilder, matches = [], match;
          if (!matcherRegex) {
              return matches;
          }
          while ((match = matcherRegex.exec(text)) !== null) {
              var offset = match.index, prevChar = text.charAt(offset - 1);
              // If we found the match at the beginning of the string, or we found the match
              // and there is a whitespace char in front of it (meaning it is not an email
              // address), then it is a username match.
              if (offset === 0 || nonWordCharRegex.test(prevChar)) {
                  var matchedText = match[0].replace(/\.+$/g, ''), // strip off trailing .
                  mention = matchedText.slice(1); // strip off the '@' character at the beginning
                  matches.push(new MentionMatch({
                      tagBuilder: tagBuilder,
                      matchedText: matchedText,
                      offset: offset,
                      serviceName: serviceName,
                      mention: mention
                  }));
              }
          }
          return matches;
      };
      return MentionMatcher;
  }(Matcher));

  // For debugging: search for other "For debugging" lines
  // import CliTable from 'cli-table';
  /**
   * Parses an HTML string, calling the callbacks to notify of tags and text.
   *
   * ## History
   *
   * This file previously used a regular expression to find html tags in the input
   * text. Unfortunately, we ran into a bunch of catastrophic backtracking issues
   * with certain input text, causing Autolinker to either hang or just take a
   * really long time to parse the string.
   *
   * The current code is intended to be a O(n) algorithm that walks through
   * the string in one pass, and tries to be as cheap as possible. We don't need
   * to implement the full HTML spec, but rather simply determine where the string
   * looks like an HTML tag, and where it looks like text (so that we can autolink
   * that).
   *
   * This state machine parser is intended just to be a simple but performant
   * parser of HTML for the subset of requirements we have. We simply need to:
   *
   * 1. Determine where HTML tags are
   * 2. Determine the tag name (Autolinker specifically only cares about <a>,
   *    <script>, and <style> tags, so as not to link any text within them)
   *
   * We don't need to:
   *
   * 1. Create a parse tree
   * 2. Auto-close tags with invalid markup
   * 3. etc.
   *
   * The other intention behind this is that we didn't want to add external
   * dependencies on the Autolinker utility which would increase its size. For
   * instance, adding htmlparser2 adds 125kb to the minified output file,
   * increasing its final size from 47kb to 172kb (at the time of writing). It
   * also doesn't work exactly correctly, treating the string "<3 blah blah blah"
   * as an HTML tag.
   *
   * Reference for HTML spec:
   *
   *     https://www.w3.org/TR/html51/syntax.html#sec-tokenization
   *
   * @param {String} html The HTML to parse
   * @param {Object} callbacks
   * @param {Function} callbacks.onOpenTag Callback function to call when an open
   *   tag is parsed. Called with the tagName as its argument.
   * @param {Function} callbacks.onCloseTag Callback function to call when a close
   *   tag is parsed. Called with the tagName as its argument. If a self-closing
   *   tag is found, `onCloseTag` is called immediately after `onOpenTag`.
   * @param {Function} callbacks.onText Callback function to call when text (i.e
   *   not an HTML tag) is parsed. Called with the text (string) as its first
   *   argument, and offset (number) into the string as its second.
   */
  function parseHtml(html, _a) {
      var onOpenTag = _a.onOpenTag, onCloseTag = _a.onCloseTag, onText = _a.onText, onComment = _a.onComment, onDoctype = _a.onDoctype;
      var noCurrentTag = new CurrentTag();
      var charIdx = 0, len = html.length, state = 0 /* Data */, currentDataIdx = 0, // where the current data start index is
      currentTag = noCurrentTag; // describes the current tag that is being read
      // For debugging: search for other "For debugging" lines
      // const table = new CliTable( {
      // 	head: [ 'charIdx', 'char', 'state', 'currentDataIdx', 'currentOpenTagIdx', 'tag.type' ]
      // } );
      while (charIdx < len) {
          var char = html.charAt(charIdx);
          // For debugging: search for other "For debugging" lines
          // ALSO: Temporarily remove the 'const' keyword on the State enum
          // table.push( 
          // 	[ charIdx, char, State[ state ], currentDataIdx, currentTag.idx, currentTag.idx === -1 ? '' : currentTag.type ] 
          // );
          switch (state) {
              case 0 /* Data */:
                  stateData(char);
                  break;
              case 1 /* TagOpen */:
                  stateTagOpen(char);
                  break;
              case 2 /* EndTagOpen */:
                  stateEndTagOpen(char);
                  break;
              case 3 /* TagName */:
                  stateTagName(char);
                  break;
              case 4 /* BeforeAttributeName */:
                  stateBeforeAttributeName(char);
                  break;
              case 5 /* AttributeName */:
                  stateAttributeName(char);
                  break;
              case 6 /* AfterAttributeName */:
                  stateAfterAttributeName(char);
                  break;
              case 7 /* BeforeAttributeValue */:
                  stateBeforeAttributeValue(char);
                  break;
              case 8 /* AttributeValueDoubleQuoted */:
                  stateAttributeValueDoubleQuoted(char);
                  break;
              case 9 /* AttributeValueSingleQuoted */:
                  stateAttributeValueSingleQuoted(char);
                  break;
              case 10 /* AttributeValueUnquoted */:
                  stateAttributeValueUnquoted(char);
                  break;
              case 11 /* AfterAttributeValueQuoted */:
                  stateAfterAttributeValueQuoted(char);
                  break;
              case 12 /* SelfClosingStartTag */:
                  stateSelfClosingStartTag(char);
                  break;
              case 13 /* MarkupDeclarationOpenState */:
                  stateMarkupDeclarationOpen();
                  break;
              case 14 /* CommentStart */:
                  stateCommentStart(char);
                  break;
              case 15 /* CommentStartDash */:
                  stateCommentStartDash(char);
                  break;
              case 16 /* Comment */:
                  stateComment(char);
                  break;
              case 17 /* CommentEndDash */:
                  stateCommentEndDash(char);
                  break;
              case 18 /* CommentEnd */:
                  stateCommentEnd(char);
                  break;
              case 19 /* CommentEndBang */:
                  stateCommentEndBang(char);
                  break;
              case 20 /* Doctype */:
                  stateDoctype(char);
                  break;
              default:
                  throwUnhandledCaseError(state);
          }
          // For debugging: search for other "For debugging" lines
          // ALSO: Temporarily remove the 'const' keyword on the State enum
          // table.push( 
          // 	[ charIdx, char, State[ state ], currentDataIdx, currentTag.idx, currentTag.idx === -1 ? '' : currentTag.type ] 
          // );
          charIdx++;
      }
      if (currentDataIdx < charIdx) {
          emitText();
      }
      // For debugging: search for other "For debugging" lines
      // console.log( '\n' + table.toString() );
      // Called when non-tags are being read (i.e. the text around HTML †ags)
      // https://www.w3.org/TR/html51/syntax.html#data-state
      function stateData(char) {
          if (char === '<') {
              startNewTag();
          }
      }
      // Called after a '<' is read from the Data state
      // https://www.w3.org/TR/html51/syntax.html#tag-open-state
      function stateTagOpen(char) {
          if (char === '!') {
              state = 13 /* MarkupDeclarationOpenState */;
          }
          else if (char === '/') {
              state = 2 /* EndTagOpen */;
              currentTag = new CurrentTag(__assign({}, currentTag, { isClosing: true }));
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else if (letterRe.test(char)) {
              // tag name start (and no '/' read)
              state = 3 /* TagName */;
              currentTag = new CurrentTag(__assign({}, currentTag, { isOpening: true }));
          }
          else {
              // Any other 
              state = 0 /* Data */;
              currentTag = noCurrentTag;
          }
      }
      // After a '<x', '</x' sequence is read (where 'x' is a letter character), 
      // this is to continue reading the tag name
      // https://www.w3.org/TR/html51/syntax.html#tag-name-state
      function stateTagName(char) {
          if (whitespaceRe.test(char)) {
              currentTag = new CurrentTag(__assign({}, currentTag, { name: captureTagName() }));
              state = 4 /* BeforeAttributeName */;
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else if (char === '/') {
              currentTag = new CurrentTag(__assign({}, currentTag, { name: captureTagName() }));
              state = 12 /* SelfClosingStartTag */;
          }
          else if (char === '>') {
              currentTag = new CurrentTag(__assign({}, currentTag, { name: captureTagName() }));
              emitTagAndPreviousTextNode(); // resets to Data state as well
          }
          else if (!letterRe.test(char) && !digitRe.test(char) && char !== ':') {
              // Anything else that does not form an html tag. Note: the colon 
              // character is accepted for XML namespaced tags
              resetToDataState();
          }
      }
      // Called after the '/' is read from a '</' sequence
      // https://www.w3.org/TR/html51/syntax.html#end-tag-open-state
      function stateEndTagOpen(char) {
          if (char === '>') { // parse error. Encountered "</>". Skip it without treating as a tag
              resetToDataState();
          }
          else if (letterRe.test(char)) {
              state = 3 /* TagName */;
          }
          else {
              // some other non-tag-like character, don't treat this as a tag
              resetToDataState();
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#before-attribute-name-state
      function stateBeforeAttributeName(char) {
          if (whitespaceRe.test(char)) ;
          else if (char === '/') {
              state = 12 /* SelfClosingStartTag */;
          }
          else if (char === '>') {
              emitTagAndPreviousTextNode(); // resets to Data state as well
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else if (char === "=" || quoteRe.test(char) || controlCharsRe.test(char)) {
              // "Parse error" characters that, according to the spec, should be
              // appended to the attribute name, but we'll treat these characters
              // as not forming a real HTML tag
              resetToDataState();
          }
          else {
              // Any other char, start of a new attribute name
              state = 5 /* AttributeName */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#attribute-name-state
      function stateAttributeName(char) {
          if (whitespaceRe.test(char)) {
              state = 6 /* AfterAttributeName */;
          }
          else if (char === '/') {
              state = 12 /* SelfClosingStartTag */;
          }
          else if (char === '=') {
              state = 7 /* BeforeAttributeValue */;
          }
          else if (char === '>') {
              emitTagAndPreviousTextNode(); // resets to Data state as well
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else if (quoteRe.test(char)) {
              // "Parse error" characters that, according to the spec, should be
              // appended to the attribute name, but we'll treat these characters
              // as not forming a real HTML tag
              resetToDataState();
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#after-attribute-name-state
      function stateAfterAttributeName(char) {
          if (whitespaceRe.test(char)) ;
          else if (char === '/') {
              state = 12 /* SelfClosingStartTag */;
          }
          else if (char === '=') {
              state = 7 /* BeforeAttributeValue */;
          }
          else if (char === '>') {
              emitTagAndPreviousTextNode();
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else if (quoteRe.test(char)) {
              // "Parse error" characters that, according to the spec, should be
              // appended to the attribute name, but we'll treat these characters
              // as not forming a real HTML tag
              resetToDataState();
          }
          else {
              // Any other character, start a new attribute in the current tag
              state = 5 /* AttributeName */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#before-attribute-value-state
      function stateBeforeAttributeValue(char) {
          if (whitespaceRe.test(char)) ;
          else if (char === "\"") {
              state = 8 /* AttributeValueDoubleQuoted */;
          }
          else if (char === "'") {
              state = 9 /* AttributeValueSingleQuoted */;
          }
          else if (/[>=`]/.test(char)) {
              // Invalid chars after an '=' for an attribute value, don't count 
              // the current tag as an HTML tag
              resetToDataState();
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else {
              // Any other character, consider it an unquoted attribute value
              state = 10 /* AttributeValueUnquoted */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#attribute-value-double-quoted-state
      function stateAttributeValueDoubleQuoted(char) {
          if (char === "\"") { // end the current double-quoted attribute
              state = 11 /* AfterAttributeValueQuoted */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#attribute-value-single-quoted-state
      function stateAttributeValueSingleQuoted(char) {
          if (char === "'") { // end the current single-quoted attribute
              state = 11 /* AfterAttributeValueQuoted */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#attribute-value-unquoted-state
      function stateAttributeValueUnquoted(char) {
          if (whitespaceRe.test(char)) {
              state = 4 /* BeforeAttributeName */;
          }
          else if (char === '>') {
              emitTagAndPreviousTextNode();
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#after-attribute-value-quoted-state
      function stateAfterAttributeValueQuoted(char) {
          if (whitespaceRe.test(char)) {
              state = 4 /* BeforeAttributeName */;
          }
          else if (char === '/') {
              state = 12 /* SelfClosingStartTag */;
          }
          else if (char === '>') {
              emitTagAndPreviousTextNode();
          }
          else if (char === '<') {
              // start of another tag (ignore the previous, incomplete one)
              startNewTag();
          }
          else {
              // Any other character, "parse error". Spec says to switch to the
              // BeforeAttributeState and re-consume the character, as it may be
              // the start of a new attribute name
              state = 4 /* BeforeAttributeName */;
              reconsumeCurrentCharacter();
          }
      }
      // A '/' has just been read in the current tag (presumably for '/>'), and 
      // this handles the next character
      // https://www.w3.org/TR/html51/syntax.html#self-closing-start-tag-state
      function stateSelfClosingStartTag(char) {
          if (char === '>') {
              currentTag = new CurrentTag(__assign({}, currentTag, { isClosing: true }));
              emitTagAndPreviousTextNode(); // resets to Data state as well
          }
          else {
              state = 4 /* BeforeAttributeName */;
          }
      }
      // https://www.w3.org/TR/html51/syntax.html#markup-declaration-open-state
      // (HTML Comments or !DOCTYPE)
      function stateMarkupDeclarationOpen(char) {
          if (html.substr(charIdx, 2) === '--') { // html comment
              charIdx += 2; // "consume" characters
              currentTag = new CurrentTag(__assign({}, currentTag, { type: 'comment' }));
              state = 14 /* CommentStart */;
          }
          else if (html.substr(charIdx, 7).toUpperCase() === 'DOCTYPE') {
              charIdx += 7; // "consume" characters
              currentTag = new CurrentTag(__assign({}, currentTag, { type: 'doctype' }));
              state = 20 /* Doctype */;
          }
          else {
              // At this point, the spec specifies that the state machine should
              // enter the "bogus comment" state, in which case any character(s) 
              // after the '<!' that were read should become an HTML comment up
              // until the first '>' that is read (or EOF). Instead, we'll assume
              // that a user just typed '<!' as part of text data
              resetToDataState();
          }
      }
      // Handles after the sequence '<!--' has been read
      // https://www.w3.org/TR/html51/syntax.html#comment-start-state
      function stateCommentStart(char) {
          if (char === '-') {
              // We've read the sequence '<!---' at this point (3 dashes)
              state = 15 /* CommentStartDash */;
          }
          else if (char === '>') {
              // At this point, we'll assume the comment wasn't a real comment
              // so we'll just emit it as data. We basically read the sequence 
              // '<!-->'
              resetToDataState();
          }
          else {
              // Any other char, take it as part of the comment
              state = 16 /* Comment */;
          }
      }
      // We've read the sequence '<!---' at this point (3 dashes)
      // https://www.w3.org/TR/html51/syntax.html#comment-start-dash-state
      function stateCommentStartDash(char) {
          if (char === '-') {
              // We've read '<!----' (4 dashes) at this point
              state = 18 /* CommentEnd */;
          }
          else if (char === '>') {
              // At this point, we'll assume the comment wasn't a real comment
              // so we'll just emit it as data. We basically read the sequence 
              // '<!--->'
              resetToDataState();
          }
          else {
              // Anything else, take it as a valid comment
              state = 16 /* Comment */;
          }
      }
      // Currently reading the comment's text (data)
      // https://www.w3.org/TR/html51/syntax.html#comment-state
      function stateComment(char) {
          if (char === '-') {
              state = 17 /* CommentEndDash */;
          }
      }
      // When we we've read the first dash inside a comment, it may signal the
      // end of the comment if we read another dash
      // https://www.w3.org/TR/html51/syntax.html#comment-end-dash-state
      function stateCommentEndDash(char) {
          if (char === '-') {
              state = 18 /* CommentEnd */;
          }
          else {
              // Wasn't a dash, must still be part of the comment
              state = 16 /* Comment */;
          }
      }
      // After we've read two dashes inside a comment, it may signal the end of 
      // the comment if we then read a '>' char
      // https://www.w3.org/TR/html51/syntax.html#comment-end-state
      function stateCommentEnd(char) {
          if (char === '>') {
              emitTagAndPreviousTextNode();
          }
          else if (char === '!') {
              state = 19 /* CommentEndBang */;
          }
          else if (char === '-') ;
          else {
              // Anything else, switch back to the comment state since we didn't
              // read the full "end comment" sequence (i.e. '-->')
              state = 16 /* Comment */;
          }
      }
      // We've read the sequence '--!' inside of a comment
      // https://www.w3.org/TR/html51/syntax.html#comment-end-bang-state
      function stateCommentEndBang(char) {
          if (char === '-') {
              // We read the sequence '--!-' inside of a comment. The last dash
              // could signify that the comment is going to close
              state = 17 /* CommentEndDash */;
          }
          else if (char === '>') {
              // End of comment with the sequence '--!>'
              emitTagAndPreviousTextNode();
          }
          else {
              // The '--!' was not followed by a '>', continue reading the 
              // comment's text
              state = 16 /* Comment */;
          }
      }
      /**
       * For DOCTYPES in particular, we don't care about the attributes. Just
       * advance to the '>' character and emit the tag, unless we find a '<'
       * character in which case we'll start a new tag.
       *
       * Example doctype tag:
       *    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
       *
       * Actual spec: https://www.w3.org/TR/html51/syntax.html#doctype-state
       */
      function stateDoctype(char) {
          if (char === '>') {
              emitTagAndPreviousTextNode();
          }
          else if (char === '<') {
              startNewTag();
          }
      }
      /**
       * Resets the state back to the Data state, and removes the current tag.
       *
       * We'll generally run this function whenever a "parse error" is
       * encountered, where the current tag that is being read no longer looks
       * like a real HTML tag.
       */
      function resetToDataState() {
          state = 0 /* Data */;
          currentTag = noCurrentTag;
      }
      /**
       * Starts a new HTML tag at the current index, ignoring any previous HTML
       * tag that was being read.
       *
       * We'll generally run this function whenever we read a new '<' character,
       * including when we read a '<' character inside of an HTML tag that we were
       * previously reading.
       */
      function startNewTag() {
          state = 1 /* TagOpen */;
          currentTag = new CurrentTag({ idx: charIdx });
      }
      /**
       * Once we've decided to emit an open tag, that means we can also emit the
       * text node before it.
       */
      function emitTagAndPreviousTextNode() {
          var textBeforeTag = html.slice(currentDataIdx, currentTag.idx);
          if (textBeforeTag) {
              // the html tag was the first element in the html string, or two 
              // tags next to each other, in which case we should not emit a text 
              // node
              onText(textBeforeTag, currentDataIdx);
          }
          if (currentTag.type === 'comment') {
              onComment(currentTag.idx);
          }
          else if (currentTag.type === 'doctype') {
              onDoctype(currentTag.idx);
          }
          else {
              if (currentTag.isOpening) {
                  onOpenTag(currentTag.name, currentTag.idx);
              }
              if (currentTag.isClosing) { // note: self-closing tags will emit both opening and closing
                  onCloseTag(currentTag.name, currentTag.idx);
              }
          }
          // Since we just emitted a tag, reset to the data state for the next char
          resetToDataState();
          currentDataIdx = charIdx + 1;
      }
      function emitText() {
          var text = html.slice(currentDataIdx, charIdx);
          onText(text, currentDataIdx);
          currentDataIdx = charIdx + 1;
      }
      /**
       * Captures the tag name from the start of the tag to the current character
       * index, and converts it to lower case
       */
      function captureTagName() {
          var startIdx = currentTag.idx + (currentTag.isClosing ? 2 : 1);
          return html.slice(startIdx, charIdx).toLowerCase();
      }
      /**
       * Causes the main loop to re-consume the current character, such as after
       * encountering a "parse error" that changed state and needs to reconsume
       * the same character in that new state.
       */
      function reconsumeCurrentCharacter() {
          charIdx--;
      }
  }
  var CurrentTag = /** @class */ (function () {
      function CurrentTag(cfg) {
          if (cfg === void 0) { cfg = {}; }
          this.idx = cfg.idx !== undefined ? cfg.idx : -1;
          this.type = cfg.type || 'tag';
          this.name = cfg.name || '';
          this.isOpening = !!cfg.isOpening;
          this.isClosing = !!cfg.isClosing;
      }
      return CurrentTag;
  }());

  /**
   * @class Autolinker
   * @extends Object
   *
   * Utility class used to process a given string of text, and wrap the matches in
   * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
   *
   * Any of the configuration options may be provided in an Object provided
   * to the Autolinker constructor, which will configure how the {@link #link link()}
   * method will process the links.
   *
   * For example:
   *
   *     var autolinker = new Autolinker( {
   *         newWindow : false,
   *         truncate  : 30
   *     } );
   *
   *     var html = autolinker.link( "Joe went to www.yahoo.com" );
   *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
   *
   *
   * The {@link #static-link static link()} method may also be used to inline
   * options into a single call, which may be more convenient for one-off uses.
   * For example:
   *
   *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
   *         newWindow : false,
   *         truncate  : 30
   *     } );
   *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
   *
   *
   * ## Custom Replacements of Links
   *
   * If the configuration options do not provide enough flexibility, a {@link #replaceFn}
   * may be provided to fully customize the output of Autolinker. This function is
   * called once for each URL/Email/Phone#/Hashtag/Mention (Twitter, Instagram, Soundcloud)
   * match that is encountered.
   *
   * For example:
   *
   *     var input = "...";  // string with URLs, Email Addresses, Phone #s, Hashtags, and Mentions (Twitter, Instagram, Soundcloud)
   *
   *     var linkedText = Autolinker.link( input, {
   *         replaceFn : function( match ) {
   *             console.log( "href = ", match.getAnchorHref() );
   *             console.log( "text = ", match.getAnchorText() );
   *
   *             switch( match.getType() ) {
   *                 case 'url' :
   *                     console.log( "url: ", match.getUrl() );
   *
   *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
   *                         var tag = match.buildTag();  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
   *                         tag.setAttr( 'rel', 'nofollow' );
   *                         tag.addClass( 'external-link' );
   *
   *                         return tag;
   *
   *                     } else {
   *                         return true;  // let Autolinker perform its normal anchor tag replacement
   *                     }
   *
   *                 case 'email' :
   *                     var email = match.getEmail();
   *                     console.log( "email: ", email );
   *
   *                     if( email === "my@own.address" ) {
   *                         return false;  // don't auto-link this particular email address; leave as-is
   *                     } else {
   *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
   *                     }
   *
   *                 case 'phone' :
   *                     var phoneNumber = match.getPhoneNumber();
   *                     console.log( phoneNumber );
   *
   *                     return '<a href="http://newplace.to.link.phone.numbers.to/">' + phoneNumber + '</a>';
   *
   *                 case 'hashtag' :
   *                     var hashtag = match.getHashtag();
   *                     console.log( hashtag );
   *
   *                     return '<a href="http://newplace.to.link.hashtag.handles.to/">' + hashtag + '</a>';
   *
   *                 case 'mention' :
   *                     var mention = match.getMention();
   *                     console.log( mention );
   *
   *                     return '<a href="http://newplace.to.link.mention.to/">' + mention + '</a>';
   *             }
   *         }
   *     } );
   *
   *
   * The function may return the following values:
   *
   * - `true` (Boolean): Allow Autolinker to replace the match as it normally
   *   would.
   * - `false` (Boolean): Do not replace the current match at all - leave as-is.
   * - Any String: If a string is returned from the function, the string will be
   *   used directly as the replacement HTML for the match.
   * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify
   *   an HTML tag before writing out its HTML text.
   */
  var Autolinker = /** @class */ (function () {
      /**
       * @method constructor
       * @param {Object} [cfg] The configuration options for the Autolinker instance,
       *   specified in an Object (map).
       */
      function Autolinker(cfg) {
          if (cfg === void 0) { cfg = {}; }
          /**
           * The Autolinker version number exposed on the instance itself.
           *
           * Ex: 0.25.1
           */
          this.version = Autolinker.version;
          /**
           * @cfg {Boolean/Object} [urls]
           *
           * `true` if URLs should be automatically linked, `false` if they should not
           * be. Defaults to `true`.
           *
           * Examples:
           *
           *     urls: true
           *
           *     // or
           *
           *     urls: {
           *         schemeMatches : true,
           *         wwwMatches    : true,
           *         tldMatches    : true
           *     }
           *
           * As shown above, this option also accepts an Object form with 3 properties
           * to allow for more customization of what exactly gets linked. All default
           * to `true`:
           *
           * @cfg {Boolean} [urls.schemeMatches] `true` to match URLs found prefixed
           *   with a scheme, i.e. `http://google.com`, or `other+scheme://google.com`,
           *   `false` to prevent these types of matches.
           * @cfg {Boolean} [urls.wwwMatches] `true` to match urls found prefixed with
           *   `'www.'`, i.e. `www.google.com`. `false` to prevent these types of
           *   matches. Note that if the URL had a prefixed scheme, and
           *   `schemeMatches` is true, it will still be linked.
           * @cfg {Boolean} [urls.tldMatches] `true` to match URLs with known top
           *   level domains (.com, .net, etc.) that are not prefixed with a scheme or
           *   `'www.'`. This option attempts to match anything that looks like a URL
           *   in the given text. Ex: `google.com`, `asdf.org/?page=1`, etc. `false`
           *   to prevent these types of matches.
           */
          this.urls = {}; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} [email=true]
           *
           * `true` if email addresses should be automatically linked, `false` if they
           * should not be.
           */
          this.email = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} [phone=true]
           *
           * `true` if Phone numbers ("(555)555-5555") should be automatically linked,
           * `false` if they should not be.
           */
          this.phone = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean/String} [hashtag=false]
           *
           * A string for the service name to have hashtags (ex: "#myHashtag")
           * auto-linked to. The currently-supported values are:
           *
           * - 'twitter'
           * - 'facebook'
           * - 'instagram'
           *
           * Pass `false` to skip auto-linking of hashtags.
           */
          this.hashtag = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String/Boolean} [mention=false]
           *
           * A string for the service name to have mentions (ex: "@myuser")
           * auto-linked to. The currently supported values are:
           *
           * - 'twitter'
           * - 'instagram'
           * - 'soundcloud'
           *
           * Defaults to `false` to skip auto-linking of mentions.
           */
          this.mention = false; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} [newWindow=true]
           *
           * `true` if the links should open in a new window, `false` otherwise.
           */
          this.newWindow = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean/Object} [stripPrefix=true]
           *
           * `true` if 'http://' (or 'https://') and/or the 'www.' should be stripped
           * from the beginning of URL links' text, `false` otherwise. Defaults to
           * `true`.
           *
           * Examples:
           *
           *     stripPrefix: true
           *
           *     // or
           *
           *     stripPrefix: {
           *         scheme : true,
           *         www    : true
           *     }
           *
           * As shown above, this option also accepts an Object form with 2 properties
           * to allow for more customization of what exactly is prevented from being
           * displayed. Both default to `true`:
           *
           * @cfg {Boolean} [stripPrefix.scheme] `true` to prevent the scheme part of
           *   a URL match from being displayed to the user. Example:
           *   `'http://google.com'` will be displayed as `'google.com'`. `false` to
           *   not strip the scheme. NOTE: Only an `'http://'` or `'https://'` scheme
           *   will be removed, so as not to remove a potentially dangerous scheme
           *   (such as `'file://'` or `'javascript:'`)
           * @cfg {Boolean} [stripPrefix.www] www (Boolean): `true` to prevent the
           *   `'www.'` part of a URL match from being displayed to the user. Ex:
           *   `'www.google.com'` will be displayed as `'google.com'`. `false` to not
           *   strip the `'www'`.
           */
          this.stripPrefix = { scheme: true, www: true }; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} [stripTrailingSlash=true]
           *
           * `true` to remove the trailing slash from URL matches, `false` to keep
           *  the trailing slash.
           *
           *  Example when `true`: `http://google.com/` will be displayed as
           *  `http://google.com`.
           */
          this.stripTrailingSlash = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Boolean} [decodePercentEncoding=true]
           *
           * `true` to decode percent-encoded characters in URL matches, `false` to keep
           *  the percent-encoded characters.
           *
           *  Example when `true`: `https://en.wikipedia.org/wiki/San_Jos%C3%A9` will
           *  be displayed as `https://en.wikipedia.org/wiki/San_José`.
           */
          this.decodePercentEncoding = true; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Number/Object} [truncate=0]
           *
           * ## Number Form
           *
           * A number for how many characters matched text should be truncated to
           * inside the text of a link. If the matched text is over this number of
           * characters, it will be truncated to this length by adding a two period
           * ellipsis ('..') to the end of the string.
           *
           * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file'
           * truncated to 25 characters might look something like this:
           * 'yahoo.com/some/long/pat..'
           *
           * Example Usage:
           *
           *     truncate: 25
           *
           *
           *  Defaults to `0` for "no truncation."
           *
           *
           * ## Object Form
           *
           * An Object may also be provided with two properties: `length` (Number) and
           * `location` (String). `location` may be one of the following: 'end'
           * (default), 'middle', or 'smart'.
           *
           * Example Usage:
           *
           *     truncate: { length: 25, location: 'middle' }
           *
           * @cfg {Number} [truncate.length=0] How many characters to allow before
           *   truncation will occur. Defaults to `0` for "no truncation."
           * @cfg {"end"/"middle"/"smart"} [truncate.location="end"]
           *
           * - 'end' (default): will truncate up to the number of characters, and then
           *   add an ellipsis at the end. Ex: 'yahoo.com/some/long/pat..'
           * - 'middle': will truncate and add the ellipsis in the middle. Ex:
           *   'yahoo.com/s..th/to/a/file'
           * - 'smart': for URLs where the algorithm attempts to strip out unnecessary
           *   parts first (such as the 'www.', then URL scheme, hash, etc.),
           *   attempting to make the URL human-readable before looking for a good
           *   point to insert the ellipsis if it is still too long. Ex:
           *   'yahoo.com/some..to/a/file'. For more details, see
           *   {@link Autolinker.truncate.TruncateSmart}.
           */
          this.truncate = { length: 0, location: 'end' }; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {String} className
           *
           * A CSS class name to add to the generated links. This class will be added
           * to all links, as well as this class plus match suffixes for styling
           * url/email/phone/hashtag/mention links differently.
           *
           * For example, if this config is provided as "myLink", then:
           *
           * - URL links will have the CSS classes: "myLink myLink-url"
           * - Email links will have the CSS classes: "myLink myLink-email", and
           * - Phone links will have the CSS classes: "myLink myLink-phone"
           * - Hashtag links will have the CSS classes: "myLink myLink-hashtag"
           * - Mention links will have the CSS classes: "myLink myLink-mention myLink-[type]"
           *   where [type] is either "instagram", "twitter" or "soundcloud"
           */
          this.className = ''; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Function} replaceFn
           *
           * A function to individually process each match found in the input string.
           *
           * See the class's description for usage.
           *
           * The `replaceFn` can be called with a different context object (`this`
           * reference) using the {@link #context} cfg.
           *
           * This function is called with the following parameter:
           *
           * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which
           *   can be used to retrieve information about the match that the `replaceFn`
           *   is currently processing. See {@link Autolinker.match.Match} subclasses
           *   for details.
           */
          this.replaceFn = null; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @cfg {Object} context
           *
           * The context object (`this` reference) to call the `replaceFn` with.
           *
           * Defaults to this Autolinker instance.
           */
          this.context = undefined; // default value just to get the above doc comment in the ES5 output and documentation generator
          /**
           * @private
           * @property {Autolinker.matcher.Matcher[]} matchers
           *
           * The {@link Autolinker.matcher.Matcher} instances for this Autolinker
           * instance.
           *
           * This is lazily created in {@link #getMatchers}.
           */
          this.matchers = null;
          /**
           * @private
           * @property {Autolinker.AnchorTagBuilder} tagBuilder
           *
           * The AnchorTagBuilder instance used to build match replacement anchor tags.
           * Note: this is lazily instantiated in the {@link #getTagBuilder} method.
           */
          this.tagBuilder = null;
          // Note: when `this.something` is used in the rhs of these assignments,
          //       it refers to the default values set above the constructor
          this.urls = this.normalizeUrlsCfg(cfg.urls);
          this.email = typeof cfg.email === 'boolean' ? cfg.email : this.email;
          this.phone = typeof cfg.phone === 'boolean' ? cfg.phone : this.phone;
          this.hashtag = cfg.hashtag || this.hashtag;
          this.mention = cfg.mention || this.mention;
          this.newWindow = typeof cfg.newWindow === 'boolean' ? cfg.newWindow : this.newWindow;
          this.stripPrefix = this.normalizeStripPrefixCfg(cfg.stripPrefix);
          this.stripTrailingSlash = typeof cfg.stripTrailingSlash === 'boolean' ? cfg.stripTrailingSlash : this.stripTrailingSlash;
          this.decodePercentEncoding = typeof cfg.decodePercentEncoding === 'boolean' ? cfg.decodePercentEncoding : this.decodePercentEncoding;
          // Validate the value of the `mention` cfg
          var mention = this.mention;
          if (mention !== false && mention !== 'twitter' && mention !== 'instagram' && mention !== 'soundcloud') {
              throw new Error("invalid `mention` cfg - see docs");
          }
          // Validate the value of the `hashtag` cfg
          var hashtag = this.hashtag;
          if (hashtag !== false && hashtag !== 'twitter' && hashtag !== 'facebook' && hashtag !== 'instagram') {
              throw new Error("invalid `hashtag` cfg - see docs");
          }
          this.truncate = this.normalizeTruncateCfg(cfg.truncate);
          this.className = cfg.className || this.className;
          this.replaceFn = cfg.replaceFn || this.replaceFn;
          this.context = cfg.context || this;
      }
      /**
       * Automatically links URLs, Email addresses, Phone Numbers, Twitter handles,
       * Hashtags, and Mentions found in the given chunk of HTML. Does not link URLs
       * found within HTML tags.
       *
       * For instance, if given the text: `You should go to http://www.yahoo.com`,
       * then the result will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
       *
       * Example:
       *
       *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
       *     // Produces: "Go to <a href="http://google.com">google.com</a>"
       *
       * @static
       * @param {String} textOrHtml The HTML or text to find matches within (depending
       *   on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #mention},
       *   {@link #hashtag}, and {@link #mention} options are enabled).
       * @param {Object} [options] Any of the configuration options for the Autolinker
       *   class, specified in an Object (map). See the class description for an
       *   example call.
       * @return {String} The HTML text, with matches automatically linked.
       */
      Autolinker.link = function (textOrHtml, options) {
          var autolinker = new Autolinker(options);
          return autolinker.link(textOrHtml);
      };
      /**
       * Parses the input `textOrHtml` looking for URLs, email addresses, phone
       * numbers, username handles, and hashtags (depending on the configuration
       * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
       * objects describing those matches (without making any replacements).
       *
       * Note that if parsing multiple pieces of text, it is slightly more efficient
       * to create an Autolinker instance, and use the instance-level {@link #parse}
       * method.
       *
       * Example:
       *
       *     var matches = Autolinker.parse( "Hello google.com, I am asdf@asdf.com", {
       *         urls: true,
       *         email: true
       *     } );
       *
       *     console.log( matches.length );           // 2
       *     console.log( matches[ 0 ].getType() );   // 'url'
       *     console.log( matches[ 0 ].getUrl() );    // 'google.com'
       *     console.log( matches[ 1 ].getType() );   // 'email'
       *     console.log( matches[ 1 ].getEmail() );  // 'asdf@asdf.com'
       *
       * @static
       * @param {String} textOrHtml The HTML or text to find matches within
       *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
       *   {@link #hashtag}, and {@link #mention} options are enabled).
       * @param {Object} [options] Any of the configuration options for the Autolinker
       *   class, specified in an Object (map). See the class description for an
       *   example call.
       * @return {Autolinker.match.Match[]} The array of Matches found in the
       *   given input `textOrHtml`.
       */
      Autolinker.parse = function (textOrHtml, options) {
          var autolinker = new Autolinker(options);
          return autolinker.parse(textOrHtml);
      };
      /**
       * Normalizes the {@link #urls} config into an Object with 3 properties:
       * `schemeMatches`, `wwwMatches`, and `tldMatches`, all Booleans.
       *
       * See {@link #urls} config for details.
       *
       * @private
       * @param {Boolean/Object} urls
       * @return {Object}
       */
      Autolinker.prototype.normalizeUrlsCfg = function (urls) {
          if (urls == null)
              urls = true; // default to `true`
          if (typeof urls === 'boolean') {
              return { schemeMatches: urls, wwwMatches: urls, tldMatches: urls };
          }
          else { // object form
              return {
                  schemeMatches: typeof urls.schemeMatches === 'boolean' ? urls.schemeMatches : true,
                  wwwMatches: typeof urls.wwwMatches === 'boolean' ? urls.wwwMatches : true,
                  tldMatches: typeof urls.tldMatches === 'boolean' ? urls.tldMatches : true
              };
          }
      };
      /**
       * Normalizes the {@link #stripPrefix} config into an Object with 2
       * properties: `scheme`, and `www` - both Booleans.
       *
       * See {@link #stripPrefix} config for details.
       *
       * @private
       * @param {Boolean/Object} stripPrefix
       * @return {Object}
       */
      Autolinker.prototype.normalizeStripPrefixCfg = function (stripPrefix) {
          if (stripPrefix == null)
              stripPrefix = true; // default to `true`
          if (typeof stripPrefix === 'boolean') {
              return { scheme: stripPrefix, www: stripPrefix };
          }
          else { // object form
              return {
                  scheme: typeof stripPrefix.scheme === 'boolean' ? stripPrefix.scheme : true,
                  www: typeof stripPrefix.www === 'boolean' ? stripPrefix.www : true
              };
          }
      };
      /**
       * Normalizes the {@link #truncate} config into an Object with 2 properties:
       * `length` (Number), and `location` (String).
       *
       * See {@link #truncate} config for details.
       *
       * @private
       * @param {Number/Object} truncate
       * @return {Object}
       */
      Autolinker.prototype.normalizeTruncateCfg = function (truncate) {
          if (typeof truncate === 'number') {
              return { length: truncate, location: 'end' };
          }
          else { // object, or undefined/null
              return defaults(truncate || {}, {
                  length: Number.POSITIVE_INFINITY,
                  location: 'end'
              });
          }
      };
      /**
       * Parses the input `textOrHtml` looking for URLs, email addresses, phone
       * numbers, username handles, and hashtags (depending on the configuration
       * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
       * objects describing those matches (without making any replacements).
       *
       * This method is used by the {@link #link} method, but can also be used to
       * simply do parsing of the input in order to discover what kinds of links
       * there are and how many.
       *
       * Example usage:
       *
       *     var autolinker = new Autolinker( {
       *         urls: true,
       *         email: true
       *     } );
       *
       *     var matches = autolinker.parse( "Hello google.com, I am asdf@asdf.com" );
       *
       *     console.log( matches.length );           // 2
       *     console.log( matches[ 0 ].getType() );   // 'url'
       *     console.log( matches[ 0 ].getUrl() );    // 'google.com'
       *     console.log( matches[ 1 ].getType() );   // 'email'
       *     console.log( matches[ 1 ].getEmail() );  // 'asdf@asdf.com'
       *
       * @param {String} textOrHtml The HTML or text to find matches within
       *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
       *   {@link #hashtag}, and {@link #mention} options are enabled).
       * @return {Autolinker.match.Match[]} The array of Matches found in the
       *   given input `textOrHtml`.
       */
      Autolinker.prototype.parse = function (textOrHtml) {
          var _this = this;
          var skipTagNames = ['a', 'style', 'script'], skipTagsStackCount = 0, // used to only Autolink text outside of anchor/script/style tags. We don't want to autolink something that is already linked inside of an <a> tag, for instance
          matches = [];
          // Find all matches within the `textOrHtml` (but not matches that are
          // already nested within <a>, <style> and <script> tags)
          parseHtml(textOrHtml, {
              onOpenTag: function (tagName) {
                  if (skipTagNames.indexOf(tagName) >= 0) {
                      skipTagsStackCount++;
                  }
              },
              onText: function (text, offset) {
                  // Only process text nodes that are not within an <a>, <style> or <script> tag
                  if (skipTagsStackCount === 0) {
                      // "Walk around" common HTML entities. An '&nbsp;' (for example)
                      // could be at the end of a URL, but we don't want to 
                      // include the trailing '&' in the URL. See issue #76
                      // TODO: Handle HTML entities separately in parseHtml() and
                      // don't emit them as "text" except for &amp; entities
                      var htmlCharacterEntitiesRegex = /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi;
                      var textSplit = splitAndCapture(text, htmlCharacterEntitiesRegex);
                      var currentOffset_1 = offset;
                      textSplit.forEach(function (splitText, i) {
                          // even number matches are text, odd numbers are html entities
                          if (i % 2 === 0) {
                              var textNodeMatches = _this.parseText(splitText, currentOffset_1);
                              matches.push.apply(matches, textNodeMatches);
                          }
                          currentOffset_1 += splitText.length;
                      });
                  }
              },
              onCloseTag: function (tagName) {
                  if (skipTagNames.indexOf(tagName) >= 0) {
                      skipTagsStackCount = Math.max(skipTagsStackCount - 1, 0); // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
                  }
              },
              onComment: function (offset) { },
              onDoctype: function (offset) { },
          });
          // After we have found all matches, remove subsequent matches that
          // overlap with a previous match. This can happen for instance with URLs,
          // where the url 'google.com/#link' would match '#link' as a hashtag.
          matches = this.compactMatches(matches);
          // And finally, remove matches for match types that have been turned
          // off. We needed to have all match types turned on initially so that
          // things like hashtags could be filtered out if they were really just
          // part of a URL match (for instance, as a named anchor).
          matches = this.removeUnwantedMatches(matches);
          return matches;
      };
      /**
       * After we have found all matches, we need to remove matches that overlap
       * with a previous match. This can happen for instance with URLs, where the
       * url 'google.com/#link' would match '#link' as a hashtag. Because the
       * '#link' part is contained in a larger match that comes before the HashTag
       * match, we'll remove the HashTag match.
       *
       * @private
       * @param {Autolinker.match.Match[]} matches
       * @return {Autolinker.match.Match[]}
       */
      Autolinker.prototype.compactMatches = function (matches) {
          // First, the matches need to be sorted in order of offset
          matches.sort(function (a, b) { return a.getOffset() - b.getOffset(); });
          for (var i = 0; i < matches.length - 1; i++) {
              var match = matches[i], offset = match.getOffset(), matchedTextLength = match.getMatchedText().length, endIdx = offset + matchedTextLength;
              if (i + 1 < matches.length) {
                  // Remove subsequent matches that equal offset with current match
                  if (matches[i + 1].getOffset() === offset) {
                      var removeIdx = matches[i + 1].getMatchedText().length > matchedTextLength ? i : i + 1;
                      matches.splice(removeIdx, 1);
                      continue;
                  }
                  // Remove subsequent matches that overlap with the current match
                  if (matches[i + 1].getOffset() < endIdx) {
                      matches.splice(i + 1, 1);
                  }
              }
          }
          return matches;
      };
      /**
       * Removes matches for matchers that were turned off in the options. For
       * example, if {@link #hashtag hashtags} were not to be matched, we'll
       * remove them from the `matches` array here.
       *
       * Note: we *must* use all Matchers on the input string, and then filter
       * them out later. For example, if the options were `{ url: false, hashtag: true }`,
       * we wouldn't want to match the text '#link' as a HashTag inside of the text
       * 'google.com/#link'. The way the algorithm works is that we match the full
       * URL first (which prevents the accidental HashTag match), and then we'll
       * simply throw away the URL match.
       *
       * @private
       * @param {Autolinker.match.Match[]} matches The array of matches to remove
       *   the unwanted matches from. Note: this array is mutated for the
       *   removals.
       * @return {Autolinker.match.Match[]} The mutated input `matches` array.
       */
      Autolinker.prototype.removeUnwantedMatches = function (matches) {
          if (!this.hashtag)
              remove(matches, function (match) { return match.getType() === 'hashtag'; });
          if (!this.email)
              remove(matches, function (match) { return match.getType() === 'email'; });
          if (!this.phone)
              remove(matches, function (match) { return match.getType() === 'phone'; });
          if (!this.mention)
              remove(matches, function (match) { return match.getType() === 'mention'; });
          if (!this.urls.schemeMatches) {
              remove(matches, function (m) { return m.getType() === 'url' && m.getUrlMatchType() === 'scheme'; });
          }
          if (!this.urls.wwwMatches) {
              remove(matches, function (m) { return m.getType() === 'url' && m.getUrlMatchType() === 'www'; });
          }
          if (!this.urls.tldMatches) {
              remove(matches, function (m) { return m.getType() === 'url' && m.getUrlMatchType() === 'tld'; });
          }
          return matches;
      };
      /**
       * Parses the input `text` looking for URLs, email addresses, phone
       * numbers, username handles, and hashtags (depending on the configuration
       * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
       * objects describing those matches.
       *
       * This method processes a **non-HTML string**, and is used to parse and
       * match within the text nodes of an HTML string. This method is used
       * internally by {@link #parse}.
       *
       * @private
       * @param {String} text The text to find matches within (depending on if the
       *   {@link #urls}, {@link #email}, {@link #phone},
       *   {@link #hashtag}, and {@link #mention} options are enabled). This must be a non-HTML string.
       * @param {Number} [offset=0] The offset of the text node within the
       *   original string. This is used when parsing with the {@link #parse}
       *   method to generate correct offsets within the {@link Autolinker.match.Match}
       *   instances, but may be omitted if calling this method publicly.
       * @return {Autolinker.match.Match[]} The array of Matches found in the
       *   given input `text`.
       */
      Autolinker.prototype.parseText = function (text, offset) {
          if (offset === void 0) { offset = 0; }
          offset = offset || 0;
          var matchers = this.getMatchers(), matches = [];
          for (var i = 0, numMatchers = matchers.length; i < numMatchers; i++) {
              var textMatches = matchers[i].parseMatches(text);
              // Correct the offset of each of the matches. They are originally
              // the offset of the match within the provided text node, but we
              // need to correct them to be relative to the original HTML input
              // string (i.e. the one provided to #parse).
              for (var j = 0, numTextMatches = textMatches.length; j < numTextMatches; j++) {
                  textMatches[j].setOffset(offset + textMatches[j].getOffset());
              }
              matches.push.apply(matches, textMatches);
          }
          return matches;
      };
      /**
       * Automatically links URLs, Email addresses, Phone numbers, Hashtags,
       * and Mentions (Twitter, Instagram, Soundcloud) found in the given chunk of HTML. Does not link
       * URLs found within HTML tags.
       *
       * For instance, if given the text: `You should go to http://www.yahoo.com`,
       * then the result will be `You should go to
       * &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
       *
       * This method finds the text around any HTML elements in the input
       * `textOrHtml`, which will be the text that is processed. Any original HTML
       * elements will be left as-is, as well as the text that is already wrapped
       * in anchor (&lt;a&gt;) tags.
       *
       * @param {String} textOrHtml The HTML or text to autolink matches within
       *   (depending on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #hashtag}, and {@link #mention} options are enabled).
       * @return {String} The HTML, with matches automatically linked.
       */
      Autolinker.prototype.link = function (textOrHtml) {
          if (!textOrHtml) {
              return "";
          } // handle `null` and `undefined`
          var matches = this.parse(textOrHtml), newHtml = [], lastIndex = 0;
          for (var i = 0, len = matches.length; i < len; i++) {
              var match = matches[i];
              newHtml.push(textOrHtml.substring(lastIndex, match.getOffset()));
              newHtml.push(this.createMatchReturnVal(match));
              lastIndex = match.getOffset() + match.getMatchedText().length;
          }
          newHtml.push(textOrHtml.substring(lastIndex)); // handle the text after the last match
          return newHtml.join('');
      };
      /**
       * Creates the return string value for a given match in the input string.
       *
       * This method handles the {@link #replaceFn}, if one was provided.
       *
       * @private
       * @param {Autolinker.match.Match} match The Match object that represents
       *   the match.
       * @return {String} The string that the `match` should be replaced with.
       *   This is usually the anchor tag string, but may be the `matchStr` itself
       *   if the match is not to be replaced.
       */
      Autolinker.prototype.createMatchReturnVal = function (match) {
          // Handle a custom `replaceFn` being provided
          var replaceFnResult;
          if (this.replaceFn) {
              replaceFnResult = this.replaceFn.call(this.context, match); // Autolinker instance is the context
          }
          if (typeof replaceFnResult === 'string') {
              return replaceFnResult; // `replaceFn` returned a string, use that
          }
          else if (replaceFnResult === false) {
              return match.getMatchedText(); // no replacement for the match
          }
          else if (replaceFnResult instanceof HtmlTag) {
              return replaceFnResult.toAnchorString();
          }
          else { // replaceFnResult === true, or no/unknown return value from function
              // Perform Autolinker's default anchor tag generation
              var anchorTag = match.buildTag(); // returns an Autolinker.HtmlTag instance
              return anchorTag.toAnchorString();
          }
      };
      /**
       * Lazily instantiates and returns the {@link Autolinker.matcher.Matcher}
       * instances for this Autolinker instance.
       *
       * @private
       * @return {Autolinker.matcher.Matcher[]}
       */
      Autolinker.prototype.getMatchers = function () {
          if (!this.matchers) {
              var tagBuilder = this.getTagBuilder();
              var matchers = [
                  new HashtagMatcher({ tagBuilder: tagBuilder, serviceName: this.hashtag }),
                  new EmailMatcher({ tagBuilder: tagBuilder }),
                  new PhoneMatcher({ tagBuilder: tagBuilder }),
                  new MentionMatcher({ tagBuilder: tagBuilder, serviceName: this.mention }),
                  new UrlMatcher({ tagBuilder: tagBuilder, stripPrefix: this.stripPrefix, stripTrailingSlash: this.stripTrailingSlash, decodePercentEncoding: this.decodePercentEncoding })
              ];
              return (this.matchers = matchers);
          }
          else {
              return this.matchers;
          }
      };
      /**
       * Returns the {@link #tagBuilder} instance for this Autolinker instance,
       * lazily instantiating it if it does not yet exist.
       *
       * @private
       * @return {Autolinker.AnchorTagBuilder}
       */
      Autolinker.prototype.getTagBuilder = function () {
          var tagBuilder = this.tagBuilder;
          if (!tagBuilder) {
              tagBuilder = this.tagBuilder = new AnchorTagBuilder({
                  newWindow: this.newWindow,
                  truncate: this.truncate,
                  className: this.className
              });
          }
          return tagBuilder;
      };
      /**
       * @static
       * @property {String} version
       *
       * The Autolinker version number in the form major.minor.patch
       *
       * Ex: 0.25.1
       */
      Autolinker.version = '3.11.0';
      /**
       * For backwards compatibility with Autolinker 1.x, the AnchorTagBuilder
       * class is provided as a static on the Autolinker class.
       */
      Autolinker.AnchorTagBuilder = AnchorTagBuilder;
      /**
       * For backwards compatibility with Autolinker 1.x, the HtmlTag class is
       * provided as a static on the Autolinker class.
       */
      Autolinker.HtmlTag = HtmlTag;
      /**
       * For backwards compatibility with Autolinker 1.x, the Matcher classes are
       * provided as statics on the Autolinker class.
       */
      Autolinker.matcher = {
          Email: EmailMatcher,
          Hashtag: HashtagMatcher,
          Matcher: Matcher,
          Mention: MentionMatcher,
          Phone: PhoneMatcher,
          Url: UrlMatcher
      };
      /**
       * For backwards compatibility with Autolinker 1.x, the Match classes are
       * provided as statics on the Autolinker class.
       */
      Autolinker.match = {
          Email: EmailMatch,
          Hashtag: HashtagMatch,
          Match: Match,
          Mention: MentionMatch,
          Phone: PhoneMatch,
          Url: UrlMatch
      };
      return Autolinker;
  }());

  // Autoconvert URL-like texts to links


  var LINK_SCAN_RE = /www|@|\:\/\//;


  function isLinkOpen(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose(str) {
    return /^<\/a\s*>/i.test(str);
  }

  // Stupid fabric to avoid singletons, for thread safety.
  // Required for engines like Nashorn.
  //
  function createLinkifier() {
    var links = [];
    var autolinker = new Autolinker({
      stripPrefix: false,
      url: true,
      email: true,
      replaceFn: function (match) {
        // Only collect matched strings but don't change anything.
        switch (match.getType()) {
          /*eslint default-case:0*/
          case 'url':
            links.push({
              text: match.matchedText,
              url: match.getUrl()
            });
            break;
          case 'email':
            links.push({
              text: match.matchedText,
              // normalize email protocol
              url: 'mailto:' + match.getEmail().replace(/^mailto:/i, '')
            });
            break;
        }
        return false;
      }
    });

    return {
      links: links,
      autolinker: autolinker
    };
  }


  function parseTokens(state) {
    var i, j, l, tokens, token, text, nodes, ln, pos, level, htmlLinkLevel,
        blockTokens = state.tokens,
        linkifier = null, links, autolinker;

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') { continue; }
      tokens = blockTokens[j].children;

      htmlLinkLevel = 0;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];

        // Skip content of markdown links
        if (token.type === 'link_close') {
          i--;
          while (tokens[i].level !== token.level && tokens[i].type !== 'link_open') {
            i--;
          }
          continue;
        }

        // Skip content of html tag links
        if (token.type === 'htmltag') {
          if (isLinkOpen(token.content) && htmlLinkLevel > 0) {
            htmlLinkLevel--;
          }
          if (isLinkClose(token.content)) {
            htmlLinkLevel++;
          }
        }
        if (htmlLinkLevel > 0) { continue; }

        if (token.type === 'text' && LINK_SCAN_RE.test(token.content)) {

          // Init linkifier in lazy manner, only if required.
          if (!linkifier) {
            linkifier = createLinkifier();
            links = linkifier.links;
            autolinker = linkifier.autolinker;
          }

          text = token.content;
          links.length = 0;
          autolinker.link(text);

          if (!links.length) { continue; }

          // Now split string to nodes
          nodes = [];
          level = token.level;

          for (ln = 0; ln < links.length; ln++) {

            if (!state.inline.validateLink(links[ln].url)) { continue; }

            pos = text.indexOf(links[ln].text);

            if (pos) {
              nodes.push({
                type: 'text',
                content: text.slice(0, pos),
                level: level
              });
            }
            nodes.push({
              type: 'link_open',
              href: links[ln].url,
              title: '',
              level: level++
            });
            nodes.push({
              type: 'text',
              content: links[ln].text,
              level: level
            });
            nodes.push({
              type: 'link_close',
              level: --level
            });
            text = text.slice(pos + links[ln].text.length);
          }
          if (text.length) {
            nodes.push({
              type: 'text',
              content: text,
              level: level
            });
          }

          // replace current node
          blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
        }
      }
    }
  }
  function linkify(md) {
    md.core.ruler.push('linkify', parseTokens);
  }

  exports.Remarkable = Remarkable;
  exports.linkify = linkify;
  exports.utils = utils;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
