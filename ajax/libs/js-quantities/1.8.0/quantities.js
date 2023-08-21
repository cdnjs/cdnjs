/*
The MIT License (MIT)
Copyright © 2006-2007 Kevin C. Olbrich
Copyright © 2010-2016 LIM SAS (http://lim.eu) - Julien Sanchez

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Qty = factory());
})(this, (function () { 'use strict';

  /**
   * Tests if a value is a string
   *
   * @param {*} value - Value to test
   *
   * @returns {boolean} true if value is a string, false otherwise
   */
  function isString(value) {
    return typeof value === "string" || value instanceof String;
  }

  /*
   * Prefer stricter Number.isFinite if currently supported.
   * To be dropped when ES6 is finalized. Obsolete browsers will
   * have to use ES6 polyfills.
   */
  var isFiniteImpl = Number.isFinite || window.isFinite;
  /**
   * Tests if a value is a number
   *
   * @param {*} value - Value to test
   *
   * @returns {boolean} true if value is a number, false otherwise
   */
  function isNumber(value) {
    // Number.isFinite allows not to consider NaN or '1' as numbers
    return isFiniteImpl(value);
  }

  /*
   * Identity function
   */
  function identity(value) {
    return value;
  }

  /**
   * Returns unique strings from list
   *
   * @param {string[]} strings - array of strings
   *
   *
   * @returns {string[]} a new array of strings without duplicates
   */
  function uniq(strings) {
    var seen = {};
    return strings.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  function compareArray(array1, array2) {
    if (array2.length !== array1.length) {
      return false;
    }
    for (var i = 0; i < array1.length; i++) {
      if (array2[i].compareArray) {
        if (!array2[i].compareArray(array1[i])) {
          return false;
        }
      }
      if (array2[i] !== array1[i]) {
        return false;
      }
    }
    return true;
  }

  function assign(target, properties) {
    Object.keys(properties).forEach(function(key) {
      target[key] = properties[key];
    });
  }

  /**
   * Safely multiplies numbers while avoiding floating errors
   * like 0.1 * 0.1 => 0.010000000000000002
   *
   * @param {...number} numbers - numbers to multiply
   *
   * @returns {number} result
   */
  function mulSafe() {
    var result = 1, decimals = 0;
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      decimals = decimals + getFractional(arg);
      result *= arg;
    }

    return decimals !== 0 ? round(result, decimals) : result;
  }

  /**
   * Safely divides two numbers while avoiding floating errors
   * like 0.3 / 0.05 => 5.999999999999999
   *
   * @returns {number} result
   * @param {number} num Numerator
   * @param {number} den Denominator
   */
  function divSafe(num, den) {
    if (den === 0) {
      throw new Error("Divide by zero");
    }

    var factor = Math.pow(10, getFractional(den));
    var invDen = factor / (factor * den);

    return mulSafe(num, invDen);
  }

  /**
   * Rounds value at the specified number of decimals
   *
   * @param {number} val - value to round
   * @param {number} decimals - number of decimals
   *
   * @returns {number} rounded number
   */
  function round(val, decimals) {
    return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  function getFractional(num) {
    // Check for NaNs or Infinities
    if (!isFinite(num)) {
      return 0;
    }

    // Faster than parsing strings
    // http://jsperf.com/count-decimals/2
    var count = 0;
    while (num % 1 !== 0) {
      num *= 10;
      count++;
    }
    return count;
  }

  /**
   * Custom error type definition
   * @constructor
   */
  function QtyError() {
    var err;
    if (!this) { // Allows to instantiate QtyError without new()
      err = Object.create(QtyError.prototype);
      QtyError.apply(err, arguments);
      return err;
    }
    err = Error.apply(this, arguments);
    this.name = "QtyError";
    this.message = err.message;
    this.stack = err.stack;
  }
  QtyError.prototype = Object.create(Error.prototype, {constructor: { value: QtyError }});

  /*
   * Throws incompatible units error
   * @param {string} left - units
   * @param {string} right - units incompatible with first argument
   * @throws "Incompatible units" error
   */
  function throwIncompatibleUnits(left, right) {
    throw new QtyError("Incompatible units: " + left + " and " + right);
  }

  var UNITS = {
    /* prefixes */
    "<googol>" : [["googol"], 1e100, "prefix"],
    "<kibi>"  :  [["Ki","Kibi","kibi"], Math.pow(2,10), "prefix"],
    "<mebi>"  :  [["Mi","Mebi","mebi"], Math.pow(2,20), "prefix"],
    "<gibi>"  :  [["Gi","Gibi","gibi"], Math.pow(2,30), "prefix"],
    "<tebi>"  :  [["Ti","Tebi","tebi"], Math.pow(2,40), "prefix"],
    "<pebi>"  :  [["Pi","Pebi","pebi"], Math.pow(2,50), "prefix"],
    "<exi>"   :  [["Ei","Exi","exi"], Math.pow(2,60), "prefix"],
    "<zebi>"  :  [["Zi","Zebi","zebi"], Math.pow(2,70), "prefix"],
    "<yebi>"  :  [["Yi","Yebi","yebi"], Math.pow(2,80), "prefix"],
    "<yotta>" :  [["Y","Yotta","yotta"], 1e24, "prefix"],
    "<zetta>" :  [["Z","Zetta","zetta"], 1e21, "prefix"],
    "<exa>"   :  [["E","Exa","exa"], 1e18, "prefix"],
    "<peta>"  :  [["P","Peta","peta"], 1e15, "prefix"],
    "<tera>"  :  [["T","Tera","tera"], 1e12, "prefix"],
    "<giga>"  :  [["G","Giga","giga"], 1e9, "prefix"],
    "<mega>"  :  [["M","Mega","mega"], 1e6, "prefix"],
    "<kilo>"  :  [["k","kilo"], 1e3, "prefix"],
    "<hecto>" :  [["h","Hecto","hecto"], 1e2, "prefix"],
    "<deca>"  :  [["da","Deca","deca","deka"], 1e1, "prefix"],
    "<deci>"  :  [["d","Deci","deci"], 1e-1, "prefix"],
    "<centi>"  : [["c","Centi","centi"], 1e-2, "prefix"],
    "<milli>" :  [["m","Milli","milli"], 1e-3, "prefix"],
    "<micro>"  : [
      ["u","\u03BC"/*µ as greek letter*/,"\u00B5"/*µ as micro sign*/,"Micro","mc","micro"],
      1e-6,
      "prefix"
    ],
    "<nano>"  :  [["n","Nano","nano"], 1e-9, "prefix"],
    "<pico>"  :  [["p","Pico","pico"], 1e-12, "prefix"],
    "<femto>" :  [["f","Femto","femto"], 1e-15, "prefix"],
    "<atto>"  :  [["a","Atto","atto"], 1e-18, "prefix"],
    "<zepto>" :  [["z","Zepto","zepto"], 1e-21, "prefix"],
    "<yocto>" :  [["y","Yocto","yocto"], 1e-24, "prefix"],

    "<1>"     :  [["1", "<1>"], 1, ""],
    /* length units */
    "<meter>" :  [["m","meter","meters","metre","metres"], 1.0, "length", ["<meter>"] ],
    "<inch>"  :  [["in","inch","inches","\""], 0.0254, "length", ["<meter>"]],
    "<foot>"  :  [["ft","foot","feet","'"], 0.3048, "length", ["<meter>"]],
    "<yard>"  :  [["yd","yard","yards"], 0.9144, "length", ["<meter>"]],
    "<mile>"  :  [["mi","mile","miles"], 1609.344, "length", ["<meter>"]],
    "<naut-mile>" : [["nmi","naut-mile"], 1852, "length", ["<meter>"]],
    "<league>":  [["league","leagues"], 4828, "length", ["<meter>"]],
    "<furlong>": [["furlong","furlongs"], 201.2, "length", ["<meter>"]],
    "<rod>"   :  [["rd","rod","rods"], 5.029, "length", ["<meter>"]],
    "<mil>"   :  [["mil","mils"], 0.0000254, "length", ["<meter>"]],
    "<angstrom>"  :[["ang","angstrom","angstroms"], 1e-10, "length", ["<meter>"]],
    "<fathom>" : [["fathom","fathoms"], 1.829, "length", ["<meter>"]],
    "<pica>"  : [["pica","picas"], 0.00423333333, "length", ["<meter>"]],
    "<point>" : [["pt","point","points"], 0.000352777778, "length", ["<meter>"]],
    "<redshift>" : [["z","red-shift", "redshift"], 1.302773e26, "length", ["<meter>"]],
    "<AU>"    : [["AU","astronomical-unit"], 149597900000, "length", ["<meter>"]],
    "<light-second>":[["ls","light-second"], 299792500, "length", ["<meter>"]],
    "<light-minute>":[["lmin","light-minute"], 17987550000, "length", ["<meter>"]],
    "<light-year>" : [["ly","light-year"], 9460528000000000, "length", ["<meter>"]],
    "<parsec>"  : [["pc","parsec","parsecs"], 30856780000000000, "length", ["<meter>"]],
    "<datamile>"  :  [["DM","datamile"], 1828.8, "length", ["<meter>"]],

    /* mass */
    "<kilogram>" : [["kg","kilogram","kilograms"], 1.0, "mass", ["<kilogram>"]],
    "<AMU>" : [["u","AMU","amu"], 1.660538921e-27, "mass", ["<kilogram>"]],
    "<dalton>" : [["Da","Dalton","Daltons","dalton","daltons"], 1.660538921e-27, "mass", ["<kilogram>"]],
    "<slug>" : [["slug","slugs"], 14.5939029, "mass", ["<kilogram>"]],
    "<short-ton>" : [["tn","ton","short-ton"], 907.18474, "mass", ["<kilogram>"]],
    "<metric-ton>":[["t","tonne","metric-ton"], 1000, "mass", ["<kilogram>"]],
    "<carat>" : [["ct","carat","carats"], 0.0002, "mass", ["<kilogram>"]],
    "<pound>" : [["lbs","lb","pound","pounds","#"], 0.45359237, "mass", ["<kilogram>"]],
    "<ounce>" : [["oz","ounce","ounces"], 0.0283495231, "mass", ["<kilogram>"]],
    "<gram>"    :  [["g","gram","grams","gramme","grammes"], 1e-3, "mass", ["<kilogram>"]],
    "<grain>" : [["grain","grains","gr"], 6.479891e-5, "mass", ["<kilogram>"]],
    "<dram>"  : [["dram","drams","dr"], 0.0017718452, "mass",["<kilogram>"]],
    "<stone>" : [["stone","stones","st"],6.35029318, "mass",["<kilogram>"]],

    /* area */
    "<hectare>":[["hectare"], 10000, "area", ["<meter>","<meter>"]],
    "<acre>":[["acre","acres"], 4046.85642, "area", ["<meter>","<meter>"]],
    "<sqft>":[["sqft"], 1, "area", ["<foot>","<foot>"]],

    /* volume */
    "<liter>" : [["l","L","liter","liters","litre","litres"], 0.001, "volume", ["<meter>","<meter>","<meter>"]],
    "<gallon>":  [["gal","gallon","gallons"], 0.0037854118, "volume", ["<meter>","<meter>","<meter>"]],
    "<gallon-imp>":  [["galimp","gallon-imp","gallons-imp"], 0.0045460900, "volume", ["<meter>","<meter>","<meter>"]],
    "<quart>":  [["qt","quart","quarts"], 0.00094635295, "volume", ["<meter>","<meter>","<meter>"]],
    "<pint>":  [["pt","pint","pints"], 0.000473176475, "volume", ["<meter>","<meter>","<meter>"]],
    "<pint-imp>":  [["ptimp","pint-imp","pints-imp"], 5.6826125e-4, "volume", ["<meter>","<meter>","<meter>"]],
    "<cup>":  [["cu","cup","cups"], 0.000236588238, "volume", ["<meter>","<meter>","<meter>"]],
    "<fluid-ounce>":  [["floz","fluid-ounce","fluid-ounces"], 2.95735297e-5, "volume", ["<meter>","<meter>","<meter>"]],
    "<fluid-ounce-imp>":  [["flozimp", "floz-imp","fluid-ounce-imp","fluid-ounces-imp"], 2.84130625e-5, "volume", ["<meter>","<meter>","<meter>"]],
    "<tablespoon>":  [["tb","tbsp","tbs","tablespoon","tablespoons"], 1.47867648e-5, "volume", ["<meter>","<meter>","<meter>"]],
    "<teaspoon>":  [["tsp","teaspoon","teaspoons"], 4.92892161e-6, "volume", ["<meter>","<meter>","<meter>"]],
    "<bushel>":  [["bu","bsh","bushel","bushels"], 0.035239072, "volume", ["<meter>","<meter>","<meter>"]],
    "<oilbarrel>":  [["bbl","oilbarrel", "oilbarrels", "oil-barrel","oil-barrels"], 0.158987294928, "volume", ["<meter>","<meter>","<meter>"]],
    "<beerbarrel>":  [["bl","bl-us","beerbarrel", "beerbarrels", "beer-barrel","beer-barrels"], 0.1173477658, "volume", ["<meter>","<meter>","<meter>"]],
    "<beerbarrel-imp>":  [["blimp","bl-imp","beerbarrel-imp", "beerbarrels-imp", "beer-barrel-imp","beer-barrels-imp"], 0.16365924, "volume", ["<meter>","<meter>","<meter>"]],

    /* speed */
    "<kph>" : [["kph"], 0.277777778, "speed", ["<meter>"], ["<second>"]],
    "<mph>" : [["mph"], 0.44704, "speed", ["<meter>"], ["<second>"]],
    "<knot>" : [["kt","kn","kts","knot","knots"], 0.514444444, "speed", ["<meter>"], ["<second>"]],
    "<fps>"  : [["fps"], 0.3048, "speed", ["<meter>"], ["<second>"]],

    /* acceleration */
    "<gee>" : [["gee"], 9.80665, "acceleration", ["<meter>"], ["<second>","<second>"]],
    "<Gal>" : [["Gal"], 1e-2, "acceleration", ["<meter>"], ["<second>","<second>"]],

    /* temperature_difference */
    "<kelvin>" : [["degK","kelvin"], 1.0, "temperature", ["<kelvin>"]],
    "<celsius>" : [["degC","celsius","celsius","centigrade"], 1.0, "temperature", ["<kelvin>"]],
    "<fahrenheit>" : [["degF","fahrenheit"], 5 / 9, "temperature", ["<kelvin>"]],
    "<rankine>" : [["degR","rankine"], 5 / 9, "temperature", ["<kelvin>"]],
    "<temp-K>"  : [["tempK","temp-K"], 1.0, "temperature", ["<temp-K>"]],
    "<temp-C>"  : [["tempC","temp-C"], 1.0, "temperature", ["<temp-K>"]],
    "<temp-F>"  : [["tempF","temp-F"], 5 / 9, "temperature", ["<temp-K>"]],
    "<temp-R>"  : [["tempR","temp-R"], 5 / 9, "temperature", ["<temp-K>"]],

    /* time */
    "<second>":  [["s","sec","secs","second","seconds"], 1.0, "time", ["<second>"]],
    "<minute>":  [["min","mins","minute","minutes"], 60.0, "time", ["<second>"]],
    "<hour>":  [["h","hr","hrs","hour","hours"], 3600.0, "time", ["<second>"]],
    "<day>":  [["d","day","days"], 3600 * 24, "time", ["<second>"]],
    "<week>":  [["wk","week","weeks"], 7 * 3600 * 24, "time", ["<second>"]],
    "<fortnight>": [["fortnight","fortnights"], 1209600, "time", ["<second>"]],
    "<year>":  [["y","yr","year","years","annum"], 31556926, "time", ["<second>"]],
    "<decade>":[["decade","decades"], 315569260, "time", ["<second>"]],
    "<century>":[["century","centuries"], 3155692600, "time", ["<second>"]],

    /* pressure */
    "<pascal>" : [["Pa","pascal","Pascal"], 1.0, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<bar>" : [["bar","bars"], 100000, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<mmHg>" : [["mmHg"], 133.322368, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<inHg>" : [["inHg"], 3386.3881472, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<torr>" : [["torr"], 133.322368, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<atm>" : [["atm","ATM","atmosphere","atmospheres"], 101325, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<psi>" : [["psi"], 6894.76, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<cmh2o>" : [["cmH2O","cmh2o"], 98.0638, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
    "<inh2o>" : [["inH2O","inh2o"], 249.082052, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],

    /* viscosity */
    "<poise>"  : [["P","poise"], 0.1, "viscosity", ["<kilogram>"],["<meter>","<second>"] ],
    "<stokes>" : [["St","stokes"], 1e-4, "viscosity", ["<meter>","<meter>"], ["<second>"]],

    /* substance */
    "<mole>"  :  [["mol","mole"], 1.0, "substance", ["<mole>"]],

    /* molar_concentration */
    "<molar>" : [["M","molar"], 1000, "molar_concentration", ["<mole>"], ["<meter>","<meter>","<meter>"]],
    "<wtpercent>"  : [["wt%","wtpercent"], 10, "molar_concentration", ["<kilogram>"], ["<meter>","<meter>","<meter>"]],

    /* activity */
    "<katal>" :  [["kat","katal","Katal"], 1.0, "activity", ["<mole>"], ["<second>"]],
    "<unit>"  :  [["U","enzUnit","unit"], 16.667e-16, "activity", ["<mole>"], ["<second>"]],

    /* capacitance */
    "<farad>" :  [["F","farad","Farad"], 1.0, "capacitance", ["<second>","<second>","<second>","<second>","<ampere>","<ampere>"], ["<meter>", "<meter>", "<kilogram>"]],

    /* charge */
    "<coulomb>" :  [["C","coulomb","Coulomb"], 1.0, "charge", ["<ampere>","<second>"]],
    "<Ah>" :  [["Ah"], 3600, "charge", ["<ampere>","<second>"]],

    /* current */
    "<ampere>"  :  [["A","Ampere","ampere","amp","amps"], 1.0, "current", ["<ampere>"]],

    /* conductance */
    "<siemens>" : [["S","Siemens","siemens"], 1.0, "conductance", ["<second>","<second>","<second>","<ampere>","<ampere>"], ["<kilogram>","<meter>","<meter>"]],

    /* inductance */
    "<henry>" :  [["H","Henry","henry"], 1.0, "inductance", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>","<ampere>"]],

    /* potential */
    "<volt>"  :  [["V","Volt","volt","volts"], 1.0, "potential", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<second>","<ampere>"]],

    /* resistance */
    "<ohm>" :  [
      ["Ohm","ohm","\u03A9"/*Ω as greek letter*/,"\u2126"/*Ω as ohm sign*/],
      1.0,
      "resistance",
      ["<meter>","<meter>","<kilogram>"],["<second>","<second>","<second>","<ampere>","<ampere>"]
    ],
    /* magnetism */
    "<weber>" : [["Wb","weber","webers"], 1.0, "magnetism", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>"]],
    "<tesla>"  : [["T","tesla","teslas"], 1.0, "magnetism", ["<kilogram>"], ["<second>","<second>","<ampere>"]],
    "<gauss>" : [["G","gauss"], 1e-4, "magnetism",  ["<kilogram>"], ["<second>","<second>","<ampere>"]],
    "<maxwell>" : [["Mx","maxwell","maxwells"], 1e-8, "magnetism", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>"]],
    "<oersted>"  : [["Oe","oersted","oersteds"], 250.0 / Math.PI, "magnetism", ["<ampere>"], ["<meter>"]],

    /* energy */
    "<joule>" :  [["J","joule","Joule","joules","Joules"], 1.0, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<erg>"   :  [["erg","ergs"], 1e-7, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<btu>"   :  [["BTU","btu","BTUs"], 1055.056, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<calorie>" :  [["cal","calorie","calories"], 4.18400, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<Calorie>" :  [["Cal","Calorie","Calories"], 4184.00, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<therm-US>" : [["th","therm","therms","Therm","therm-US"], 105480400, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<Wh>" : [["Wh"], 3600, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
    "<electronvolt>" : [["eV", "electronvolt", "electronvolts"], 1.602176634E-19, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],

    /* force */
    "<newton>"  : [["N","Newton","newton"], 1.0, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],
    "<dyne>"  : [["dyn","dyne"], 1e-5, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],
    "<pound-force>"  : [["lbf","pound-force"], 4.448222, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],

    /* frequency */
    "<hertz>" : [["Hz","hertz","Hertz"], 1.0, "frequency", ["<1>"], ["<second>"]],

    /* angle */
    "<radian>" :[["rad","radian","radians"], 1.0, "angle", ["<radian>"]],
    "<degree>" :[["deg","degree","degrees"], Math.PI / 180.0, "angle", ["<radian>"]],
    "<arcminute>" :[["arcmin","arcminute","arcminutes"], Math.PI / 10800.0, "angle", ["<radian>"]],
    "<arcsecond>" :[["arcsec","arcsecond","arcseconds"], Math.PI / 648000.0, "angle", ["<radian>"]],
    "<gradian>"   :[["gon","grad","gradian","grads"], Math.PI / 200.0, "angle", ["<radian>"]],
    "<steradian>"  : [["sr","steradian","steradians"], 1.0, "solid_angle", ["<steradian>"]],

    /* rotation */
    "<rotation>" : [["rotation"], 2.0 * Math.PI, "angle", ["<radian>"]],
    "<rpm>"   :[["rpm"], 2.0 * Math.PI / 60.0, "angular_velocity", ["<radian>"], ["<second>"]],

    /* information */
    "<byte>"  :[["B","byte","bytes"], 1.0, "information", ["<byte>"]],
    "<bit>"  :[["b","bit","bits"], 0.125, "information", ["<byte>"]],

    /* information rate */
    "<Bps>" : [["Bps"], 1.0, "information_rate", ["<byte>"], ["<second>"]],
    "<bps>" : [["bps"], 0.125, "information_rate", ["<byte>"], ["<second>"]],

    /* currency */
    "<dollar>":[["USD","dollar"], 1.0, "currency", ["<dollar>"]],
    "<cents>" :[["cents"], 0.01, "currency", ["<dollar>"]],

    /* luminosity */
    "<candela>" : [["cd","candela"], 1.0, "luminosity", ["<candela>"]],
    "<lumen>" : [["lm","lumen"], 1.0, "luminous_power", ["<candela>","<steradian>"]],
    "<lux>" :[["lux"], 1.0, "illuminance", ["<candela>","<steradian>"], ["<meter>","<meter>"]],

    /* power */
    "<watt>"  : [["W","watt","watts"], 1.0, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],
    "<volt-ampere>"  : [["VA","volt-ampere"], 1.0, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],
    "<volt-ampere-reactive>"  : [["var","Var","VAr","VAR","volt-ampere-reactive"], 1.0, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],
    "<horsepower>"  :  [["hp","horsepower"], 745.699872, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],

    /* radiation */
    "<gray>" : [["Gy","gray","grays"], 1.0, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
    "<roentgen>" : [["R","roentgen"], 0.009330, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
    "<sievert>" : [["Sv","sievert","sieverts"], 1.0, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
    "<becquerel>" : [["Bq","becquerel","becquerels"], 1.0, "radiation", ["<1>"],["<second>"]],
    "<curie>" : [["Ci","curie","curies"], 3.7e10, "radiation", ["<1>"],["<second>"]],

    /* rate */
    "<cpm>" : [["cpm"], 1.0 / 60.0, "rate", ["<count>"],["<second>"]],
    "<dpm>" : [["dpm"], 1.0 / 60.0, "rate", ["<count>"],["<second>"]],
    "<bpm>" : [["bpm"], 1.0 / 60.0, "rate", ["<count>"],["<second>"]],

    /* resolution / typography */
    "<dot>" : [["dot","dots"], 1, "resolution", ["<each>"]],
    "<pixel>" : [["pixel","px"], 1, "resolution", ["<each>"]],
    "<ppi>" : [["ppi"], 1, "resolution", ["<pixel>"], ["<inch>"]],
    "<dpi>" : [["dpi"], 1, "typography", ["<dot>"], ["<inch>"]],

    /* other */
    "<cell>" : [["cells","cell"], 1, "counting", ["<each>"]],
    "<each>" : [["each"], 1.0, "counting", ["<each>"]],
    "<count>" : [["count"], 1.0, "counting", ["<each>"]],
    "<base-pair>"  : [["bp","base-pair"], 1.0, "counting", ["<each>"]],
    "<nucleotide>" : [["nt","nucleotide"], 1.0, "counting", ["<each>"]],
    "<molecule>" : [["molecule","molecules"], 1.0, "counting", ["<1>"]],
    "<dozen>" :  [["doz","dz","dozen"],12.0,"prefix_only", ["<each>"]],
    "<percent>": [["%","percent"], 0.01, "prefix_only", ["<1>"]],
    "<ppm>" :  [["ppm"],1e-6, "prefix_only", ["<1>"]],
    "<ppb>" :  [["ppb"],1e-9, "prefix_only", ["<1>"]],
    "<ppt>" :  [["ppt"],1e-12, "prefix_only", ["<1>"]],
    "<ppq>" :  [["ppq"],1e-15, "prefix_only", ["<1>"]],
    "<gross>" :  [["gr","gross"],144.0, "prefix_only", ["<dozen>","<dozen>"]],
    "<decibel>"  : [["dB","decibel","decibels"], 1.0, "logarithmic", ["<decibel>"]]
  };

  var BASE_UNITS = ["<meter>","<kilogram>","<second>","<mole>", "<ampere>","<radian>","<kelvin>","<temp-K>","<byte>","<dollar>","<candela>","<each>","<steradian>","<decibel>"];

  var UNITY = "<1>";
  var UNITY_ARRAY = [UNITY];

  // Setup

  /**
   * Asserts unit definition is valid
   *
   * @param {string} unitDef - Name of unit to test
   * @param {Object} definition - Definition of unit to test
   *
   * @returns {void}
   * @throws {QtyError} if unit definition is not valid
   */
  function validateUnitDefinition(unitDef, definition) {
    var scalar = definition[1];
    var numerator = definition[3] || [];
    var denominator = definition[4] || [];
    if (!isNumber(scalar)) {
      throw new QtyError(unitDef + ": Invalid unit definition. " +
                         "'scalar' must be a number");
    }

    numerator.forEach(function(unit) {
      if (UNITS[unit] === undefined) {
        throw new QtyError(unitDef + ": Invalid unit definition. " +
                           "Unit " + unit + " in 'numerator' is not recognized");
      }
    });

    denominator.forEach(function(unit) {
      if (UNITS[unit] === undefined) {
        throw new QtyError(unitDef + ": Invalid unit definition. " +
                           "Unit " + unit + " in 'denominator' is not recognized");
      }
    });
  }

  var PREFIX_VALUES = {};
  var PREFIX_MAP = {};
  var UNIT_VALUES = {};
  var UNIT_MAP = {};
  var OUTPUT_MAP = {};
  for (var unitDef in UNITS) {
    if (UNITS.hasOwnProperty(unitDef)) {
      var definition = UNITS[unitDef];
      if (definition[2] === "prefix") {
        PREFIX_VALUES[unitDef] = definition[1];
        for (var i = 0; i < definition[0].length; i++) {
          PREFIX_MAP[definition[0][i]] = unitDef;
        }
      }
      else {
        validateUnitDefinition(unitDef, definition);
        UNIT_VALUES[unitDef] = {
          scalar: definition[1],
          numerator: definition[3],
          denominator: definition[4]
        };
        for (var j = 0; j < definition[0].length; j++) {
          UNIT_MAP[definition[0][j]] = unitDef;
        }
      }
      OUTPUT_MAP[unitDef] = definition[0][0];
    }
  }

  /**
   * Returns a list of available units of kind
   *
   * @param {string} [kind] - kind of units
   * @returns {array} names of units
   * @throws {QtyError} if kind is unknown
   */
  function getUnits(kind) {
    var i;
    var units = [];
    var unitKeys = Object.keys(UNITS);
    if (typeof kind === "undefined") {
      for (i = 0; i < unitKeys.length; i++) {
        if (["", "prefix"].indexOf(UNITS[unitKeys[i]][2]) === -1) {
          units.push(unitKeys[i].substr(1, unitKeys[i].length - 2));
        }
      }
    }
    else if (this.getKinds().indexOf(kind) === -1) {
      throw new QtyError("Kind not recognized");
    }
    else {
      for (i = 0; i < unitKeys.length; i++) {
        if (UNITS[unitKeys[i]][2] === kind) {
          units.push(unitKeys[i].substr(1, unitKeys[i].length - 2));
        }
      }
    }

    return units.sort(function(a, b) {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Returns a list of alternative names for a unit
   *
   * @param {string} unitName - name of unit
   * @returns {string[]} aliases for unit
   * @throws {QtyError} if unit is unknown
   */
  function getAliases(unitName) {
    if (!UNIT_MAP[unitName]) {
      throw new QtyError("Unit not recognized");
    }
    return UNITS[UNIT_MAP[unitName]][0];
  }

  var SIGNATURE_VECTOR = ["length", "time", "temperature", "mass", "current", "substance", "luminosity", "currency", "information", "angle"];

  /*
  calculates the unit signature id for use in comparing compatible units and simplification
  the signature is based on a simple classification of units and is based on the following publication

  Novak, G.S., Jr. "Conversion of units of measurement", IEEE Transactions on Software Engineering,
  21(8), Aug 1995, pp.651-661
  doi://10.1109/32.403789
  http://ieeexplore.ieee.org/Xplore/login.jsp?url=/iel1/32/9079/00403789.pdf?isnumber=9079&prod=JNL&arnumber=403789&arSt=651&ared=661&arAuthor=Novak%2C+G.S.%2C+Jr.
  */
  function unitSignature() {
    if (this.signature) {
      return this.signature;
    }
    var vector = unitSignatureVector.call(this);
    for (var i = 0; i < vector.length; i++) {
      vector[i] *= Math.pow(20, i);
    }

    return vector.reduce(
      function(previous, current) {
        return previous + current;
      },
      0
    );
  }

  // calculates the unit signature vector used by unit_signature
  function unitSignatureVector() {
    if (!this.isBase()) {
      return unitSignatureVector.call(this.toBase());
    }

    var vector = new Array(SIGNATURE_VECTOR.length);
    for (var i = 0; i < vector.length; i++) {
      vector[i] = 0;
    }
    var r, n;
    for (var j = 0; j < this.numerator.length; j++) {
      if ((r = UNITS[this.numerator[j]])) {
        n = SIGNATURE_VECTOR.indexOf(r[2]);
        if (n >= 0) {
          vector[n] = vector[n] + 1;
        }
      }
    }

    for (var k = 0; k < this.denominator.length; k++) {
      if ((r = UNITS[this.denominator[k]])) {
        n = SIGNATURE_VECTOR.indexOf(r[2]);
        if (n >= 0) {
          vector[n] = vector[n] - 1;
        }
      }
    }
    return vector;
  }

  var SIGN = "[+-]";
  var INTEGER = "\\d+";
  var SIGNED_INTEGER = SIGN + "?" + INTEGER;
  var FRACTION = "\\." + INTEGER;
  var FLOAT = "(?:" + INTEGER + "(?:" + FRACTION + ")?" + ")" +
              "|" +
              "(?:" + FRACTION + ")";
  var EXPONENT = "[Ee]" + SIGNED_INTEGER;
  var SCI_NUMBER = "(?:" + FLOAT + ")(?:" + EXPONENT + ")?";
  var SIGNED_NUMBER = SIGN + "?\\s*" + SCI_NUMBER;
  var QTY_STRING = "(" + SIGNED_NUMBER + ")?" + "\\s*([^/]*)(?:\/(.+))?";
  var QTY_STRING_REGEX = new RegExp("^" + QTY_STRING + "$");

  var POWER_OP = "\\^|\\*{2}";
  // Allow unit powers representing scalar, length, area, volume; 4 is for some
  // special case representations in SI base units.
  var SAFE_POWER = "[01234]";
  var TOP_REGEX = new RegExp ("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(-?" + SAFE_POWER + "(?![a-zA-Z]))");
  var BOTTOM_REGEX = new RegExp("([^ \\*\\d]+?)(?:" + POWER_OP + ")?(" + SAFE_POWER + "(?![a-zA-Z]))");

  /* parse a string into a unit object.
   * Typical formats like :
   * "5.6 kg*m/s^2"
   * "5.6 kg*m*s^-2"
   * "5.6 kilogram*meter*second^-2"
   * "2.2 kPa"
   * "37 degC"
   * "1"  -- creates a unitless constant with value 1
   * "GPa"  -- creates a unit with scalar 1 with units 'GPa'
   * 6'4"  -- recognized as 6 feet + 4 inches
   * 8 lbs 8 oz -- recognized as 8 lbs + 8 ounces
   */
  function parse(val) {
    if (!isString(val)) {
      val = val.toString();
    }
    val = val.trim();

    var result = QTY_STRING_REGEX.exec(val);
    if (!result) {
      throw new QtyError(val + ": Quantity not recognized");
    }

    var scalarMatch = result[1];
    if (scalarMatch) {
      // Allow whitespaces between sign and scalar for loose parsing
      scalarMatch = scalarMatch.replace(/\s/g, "");
      this.scalar = parseFloat(scalarMatch);
    }
    else {
      this.scalar = 1;
    }
    var top = result[2];
    var bottom = result[3];

    var n, x, nx;
    // TODO DRY me
    while ((result = TOP_REGEX.exec(top))) {
      n = parseFloat(result[2]);
      if (isNaN(n)) {
        // Prevents infinite loops
        throw new QtyError("Unit exponent is not a number");
      }
      // Disallow unrecognized unit even if exponent is 0
      if (n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
        throw new QtyError("Unit not recognized");
      }
      x = result[1] + " ";
      nx = "";
      for (var i = 0; i < Math.abs(n) ; i++) {
        nx += x;
      }
      if (n >= 0) {
        top = top.replace(result[0], nx);
      }
      else {
        bottom = bottom ? bottom + nx : nx;
        top = top.replace(result[0], "");
      }
    }

    while ((result = BOTTOM_REGEX.exec(bottom))) {
      n = parseFloat(result[2]);
      if (isNaN(n)) {
        // Prevents infinite loops
        throw new QtyError("Unit exponent is not a number");
      }
      // Disallow unrecognized unit even if exponent is 0
      if (n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
        throw new QtyError("Unit not recognized");
      }
      x = result[1] + " ";
      nx = "";
      for (var j = 0; j < n ; j++) {
        nx += x;
      }

      bottom = bottom.replace(result[0], nx);
    }

    if (top) {
      this.numerator = parseUnits(top.trim());
    }
    if (bottom) {
      this.denominator = parseUnits(bottom.trim());
    }
  }

  var PREFIX_REGEX = Object.keys(PREFIX_MAP).sort(function(a, b) {
    return b.length - a.length;
  }).join("|");
  var UNIT_REGEX = Object.keys(UNIT_MAP).sort(function(a, b) {
    return b.length - a.length;
  }).join("|");
  /*
   * Minimal boundary regex to support units with Unicode characters
   * \b only works for ASCII
   */
  var BOUNDARY_REGEX = "\\b|$";
  var UNIT_MATCH = "(" + PREFIX_REGEX + ")??(" +
                   UNIT_REGEX +
                   ")(?:" + BOUNDARY_REGEX + ")";
  var UNIT_TEST_REGEX = new RegExp("^\\s*(" + UNIT_MATCH + "[\\s\\*]*)+$");
  var UNIT_MATCH_REGEX = new RegExp(UNIT_MATCH, "g"); // g flag for multiple occurences
  var parsedUnitsCache = {};
  /**
   * Parses and converts units string to normalized unit array.
   * Result is cached to speed up next calls.
   *
   * @param {string} units Units string
   * @returns {string[]} Array of normalized units
   *
   * @example
   * // Returns ["<second>", "<meter>", "<second>"]
   * parseUnits("s m s");
   *
   */
  function parseUnits(units) {
    var cached = parsedUnitsCache[units];
    if (cached) {
      return cached;
    }

    var unitMatch, normalizedUnits = [];

    // Scan
    if (!UNIT_TEST_REGEX.test(units)) {
      throw new QtyError("Unit not recognized");
    }

    while ((unitMatch = UNIT_MATCH_REGEX.exec(units))) {
      normalizedUnits.push(unitMatch.slice(1));
    }

    normalizedUnits = normalizedUnits.map(function(item) {
      return PREFIX_MAP[item[0]] ? [PREFIX_MAP[item[0]], UNIT_MAP[item[1]]] : [UNIT_MAP[item[1]]];
    });

    // Flatten and remove null elements
    normalizedUnits = normalizedUnits.reduce(function(a,b) {
      return a.concat(b);
    }, []);
    normalizedUnits = normalizedUnits.filter(function(item) {
      return item;
    });

    parsedUnitsCache[units] = normalizedUnits;

    return normalizedUnits;
  }

  /**
   * Parses a string as a quantity
   * @param {string} value - quantity as text
   * @throws if value is not a string
   * @returns {Qty|null} Parsed quantity or null if unrecognized
   */
  function globalParse(value) {
    if (!isString(value)) {
      throw new QtyError("Argument should be a string");
    }

    try {
      return this(value);
    }
    catch (e) {
      return null;
    }
  }

  /**
   * Tests if a value is a Qty instance
   *
   * @param {*} value - Value to test
   *
   * @returns {boolean} true if value is a Qty instance, false otherwise
   */
  function isQty(value) {
    return value instanceof Qty;
  }

  function Qty(initValue, initUnits) {
    assertValidConstructorArgs.apply(null, arguments);

    if (!(isQty(this))) {
      return new Qty(initValue, initUnits);
    }

    this.scalar = null;
    this.baseScalar = null;
    this.signature = null;
    this._conversionCache = {};
    this.numerator = UNITY_ARRAY;
    this.denominator = UNITY_ARRAY;

    if (isDefinitionObject(initValue)) {
      this.scalar = initValue.scalar;
      this.numerator = (initValue.numerator && initValue.numerator.length !== 0) ? initValue.numerator : UNITY_ARRAY;
      this.denominator = (initValue.denominator && initValue.denominator.length !== 0) ? initValue.denominator : UNITY_ARRAY;
    }
    else if (initUnits) {
      parse.call(this, initUnits);
      this.scalar = initValue;
    }
    else {
      parse.call(this, initValue);
    }

    // math with temperatures is very limited
    if (this.denominator.join("*").indexOf("temp") >= 0) {
      throw new QtyError("Cannot divide with temperatures");
    }
    if (this.numerator.join("*").indexOf("temp") >= 0) {
      if (this.numerator.length > 1) {
        throw new QtyError("Cannot multiply by temperatures");
      }
      if (!compareArray(this.denominator, UNITY_ARRAY)) {
        throw new QtyError("Cannot divide with temperatures");
      }
    }

    this.initValue = initValue;
    updateBaseScalar.call(this);

    if (this.isTemperature() && this.baseScalar < 0) {
      throw new QtyError("Temperatures must not be less than absolute zero");
    }
  }

  Qty.prototype = {
    // Properly set up constructor
    constructor: Qty,
  };

  /**
   * Asserts constructor arguments are valid
   *
   * @param {*} value - Value to test
   * @param {string} [units] - Optional units when value is passed as a number
   *
   * @returns {void}
   * @throws {QtyError} if constructor arguments are invalid
   */
  function assertValidConstructorArgs(value, units) {
    if (units) {
      if (!(isNumber(value) && isString(units))) {
        throw new QtyError("Only number accepted as initialization value " +
                           "when units are explicitly provided");
      }
    }
    else {
      if (!(isString(value) ||
            isNumber(value) ||
            isQty(value)    ||
            isDefinitionObject(value))) {
        throw new QtyError("Only string, number or quantity accepted as " +
                           "single initialization value");
      }
    }
  }

  /**
   * Tests if a value is a Qty definition object
   *
   * @param {*} value - Value to test
   *
   * @returns {boolean} true if value is a definition object, false otherwise
   */
  function isDefinitionObject(value) {
    return value && typeof value === "object" && value.hasOwnProperty("scalar");
  }

  function updateBaseScalar() {
    if (this.baseScalar) {
      return this.baseScalar;
    }
    if (this.isBase()) {
      this.baseScalar = this.scalar;
      this.signature = unitSignature.call(this);
    }
    else {
      var base = this.toBase();
      this.baseScalar = base.scalar;
      this.signature = base.signature;
    }
  }

  var KINDS = {
    "-312078": "elastance",
    "-312058": "resistance",
    "-312038": "inductance",
    "-152058": "potential",
    "-152040": "magnetism",
    "-152038": "magnetism",
    "-7997": "specific_volume",
    "-79": "snap",
    "-59": "jolt",
    "-39": "acceleration",
    "-38": "radiation",
    "-20": "frequency",
    "-19": "speed",
    "-18": "viscosity",
    "-17": "volumetric_flow",
    "-1": "wavenumber",
    "0": "unitless",
    "1": "length",
    "2": "area",
    "3": "volume",
    "20": "time",
    "400": "temperature",
    "7941": "yank",
    "7942": "power",
    "7959": "pressure",
    "7961": "force",
    "7962": "energy",
    "7979": "viscosity",
    "7981": "momentum",
    "7982": "angular_momentum",
    "7997": "density",
    "7998": "area_density",
    "8000": "mass",
    "152020": "radiation_exposure",
    "159999": "magnetism",
    "160000": "current",
    "160020": "charge",
    "312058": "conductance",
    "312078": "capacitance",
    "3199980": "activity",
    "3199997": "molar_concentration",
    "3200000": "substance",
    "63999998": "illuminance",
    "64000000": "luminous_power",
    "1280000000": "currency",
    "25599999980": "information_rate",
    "25600000000": "information",
    "511999999980": "angular_velocity",
    "512000000000": "angle"
  };

  /**
   * Returns the list of available well-known kinds of units, e.g.
   * "radiation" or "length".
   *
   * @returns {string[]} names of kinds of units
   */
  function getKinds() {
    return uniq(Object.keys(KINDS).map(function(knownSignature) {
      return KINDS[knownSignature];
    }));
  }

  Qty.prototype.kind = function() {
    return KINDS[this.signature.toString()];
  };

  assign(Qty.prototype, {
    isDegrees: function() {
      // signature may not have been calculated yet
      return (this.signature === null || this.signature === 400) &&
        this.numerator.length === 1 &&
        compareArray(this.denominator, UNITY_ARRAY) &&
        (this.numerator[0].match(/<temp-[CFRK]>/) || this.numerator[0].match(/<(kelvin|celsius|rankine|fahrenheit)>/));
    },

    isTemperature: function() {
      return this.isDegrees() && this.numerator[0].match(/<temp-[CFRK]>/);
    }
  });

  function subtractTemperatures(lhs,rhs) {
    var lhsUnits = lhs.units();
    var rhsConverted = rhs.to(lhsUnits);
    var dstDegrees = Qty(getDegreeUnits(lhsUnits));
    return Qty({"scalar": lhs.scalar - rhsConverted.scalar, "numerator": dstDegrees.numerator, "denominator": dstDegrees.denominator});
  }

  function subtractTempDegrees(temp,deg) {
    var tempDegrees = deg.to(getDegreeUnits(temp.units()));
    return Qty({"scalar": temp.scalar - tempDegrees.scalar, "numerator": temp.numerator, "denominator": temp.denominator});
  }

  function addTempDegrees(temp,deg) {
    var tempDegrees = deg.to(getDegreeUnits(temp.units()));
    return Qty({"scalar": temp.scalar + tempDegrees.scalar, "numerator": temp.numerator, "denominator": temp.denominator});
  }

  function getDegreeUnits(units) {
    if (units === "tempK") {
      return "degK";
    }
    else if (units === "tempC") {
      return "degC";
    }
    else if (units === "tempF") {
      return "degF";
    }
    else if (units === "tempR") {
      return "degR";
    }
    else {
      throw new QtyError("Unknown type for temp conversion from: " + units);
    }
  }

  function toDegrees(src,dst) {
    var srcDegK = toDegK(src);
    var dstUnits = dst.units();
    var dstScalar;

    if (dstUnits === "degK") {
      dstScalar = srcDegK.scalar;
    }
    else if (dstUnits === "degC") {
      dstScalar = srcDegK.scalar ;
    }
    else if (dstUnits === "degF") {
      dstScalar = srcDegK.scalar * 9 / 5;
    }
    else if (dstUnits === "degR") {
      dstScalar = srcDegK.scalar * 9 / 5;
    }
    else {
      throw new QtyError("Unknown type for degree conversion to: " + dstUnits);
    }

    return Qty({"scalar": dstScalar, "numerator": dst.numerator, "denominator": dst.denominator});
  }

  function toDegK(qty) {
    var units = qty.units();
    var q;
    if (units.match(/(deg)[CFRK]/)) {
      q = qty.baseScalar;
    }
    else if (units === "tempK") {
      q = qty.scalar;
    }
    else if (units === "tempC") {
      q = qty.scalar;
    }
    else if (units === "tempF") {
      q = qty.scalar * 5 / 9;
    }
    else if (units === "tempR") {
      q = qty.scalar * 5 / 9;
    }
    else {
      throw new QtyError("Unknown type for temp conversion from: " + units);
    }

    return Qty({"scalar": q, "numerator": ["<kelvin>"], "denominator": UNITY_ARRAY});
  }

  function toTemp(src,dst) {
    var dstUnits = dst.units();
    var dstScalar;

    if (dstUnits === "tempK") {
      dstScalar = src.baseScalar;
    }
    else if (dstUnits === "tempC") {
      dstScalar = src.baseScalar - 273.15;
    }
    else if (dstUnits === "tempF") {
      dstScalar = (src.baseScalar * 9 / 5) - 459.67;
    }
    else if (dstUnits === "tempR") {
      dstScalar = src.baseScalar * 9 / 5;
    }
    else {
      throw new QtyError("Unknown type for temp conversion to: " + dstUnits);
    }

    return Qty({"scalar": dstScalar, "numerator": dst.numerator, "denominator": dst.denominator});
  }

  function toTempK(qty) {
    var units = qty.units();
    var q;
    if (units.match(/(deg)[CFRK]/)) {
      q = qty.baseScalar;
    }
    else if (units === "tempK") {
      q = qty.scalar;
    }
    else if (units === "tempC") {
      q = qty.scalar + 273.15;
    }
    else if (units === "tempF") {
      q = (qty.scalar + 459.67) * 5 / 9;
    }
    else if (units === "tempR") {
      q = qty.scalar * 5 / 9;
    }
    else {
      throw new QtyError("Unknown type for temp conversion from: " + units);
    }

    return Qty({"scalar": q, "numerator": ["<temp-K>"], "denominator": UNITY_ARRAY});
  }

  assign(Qty.prototype, {
    /**
     * Converts to other compatible units.
     * Instance's converted quantities are cached for faster subsequent calls.
     *
     * @param {(string|Qty)} other - Target units as string or retrieved from
     *                               other Qty instance (scalar is ignored)
     *
     * @returns {Qty} New converted Qty instance with target units
     *
     * @throws {QtyError} if target units are incompatible
     *
     * @example
     * var weight = Qty("25 kg");
     * weight.to("lb"); // => Qty("55.11556554621939 lbs");
     * weight.to(Qty("3 g")); // => Qty("25000 g"); // scalar of passed Qty is ignored
     */
    to: function(other) {
      var cached, target;

      if (other === undefined || other === null) {
        return this;
      }

      if (!isString(other)) {
        return this.to(other.units());
      }

      cached = this._conversionCache[other];
      if (cached) {
        return cached;
      }

      // Instantiating target to normalize units
      target = Qty(other);
      if (target.units() === this.units()) {
        return this;
      }

      if (!this.isCompatible(target)) {
        if (this.isInverse(target)) {
          target = this.inverse().to(other);
        }
        else {
          throwIncompatibleUnits(this.units(), target.units());
        }
      }
      else {
        if (target.isTemperature()) {
          target = toTemp(this,target);
        }
        else if (target.isDegrees()) {
          target = toDegrees(this,target);
        }
        else {
          var q = divSafe(this.baseScalar, target.baseScalar);
          target = Qty({"scalar": q, "numerator": target.numerator, "denominator": target.denominator});
        }
      }

      this._conversionCache[other] = target;
      return target;
    },

    // convert to base SI units
    // results of the conversion are cached so subsequent calls to this will be fast
    toBase: function() {
      if (this.isBase()) {
        return this;
      }

      if (this.isTemperature()) {
        return toTempK(this);
      }

      var cached = baseUnitCache[this.units()];
      if (!cached) {
        cached = toBaseUnits(this.numerator,this.denominator);
        baseUnitCache[this.units()] = cached;
      }
      return cached.mul(this.scalar);
    },

    // Converts the unit back to a float if it is unitless.  Otherwise raises an exception
    toFloat: function() {
      if (this.isUnitless()) {
        return this.scalar;
      }
      throw new QtyError("Can't convert to Float unless unitless.  Use Unit#scalar");
    },

    /**
     * Returns the nearest multiple of quantity passed as
     * precision
     *
     * @param {(Qty|string|number)} precQuantity - Quantity, string formated
     *   quantity or number as expected precision
     *
     * @returns {Qty} Nearest multiple of precQuantity
     *
     * @example
     * Qty('5.5 ft').toPrec('2 ft'); // returns 6 ft
     * Qty('0.8 cu').toPrec('0.25 cu'); // returns 0.75 cu
     * Qty('6.3782 m').toPrec('cm'); // returns 6.38 m
     * Qty('1.146 MPa').toPrec('0.1 bar'); // returns 1.15 MPa
     *
     */
    toPrec: function(precQuantity) {
      if (isString(precQuantity)) {
        precQuantity = Qty(precQuantity);
      }
      if (isNumber(precQuantity)) {
        precQuantity = Qty(precQuantity + " " + this.units());
      }

      if (!this.isUnitless()) {
        precQuantity = precQuantity.to(this.units());
      }
      else if (!precQuantity.isUnitless()) {
        throwIncompatibleUnits(this.units(), precQuantity.units());
      }

      if (precQuantity.scalar === 0) {
        throw new QtyError("Divide by zero");
      }

      var precRoundedResult = mulSafe(
        Math.round(this.scalar / precQuantity.scalar),
        precQuantity.scalar
      );

      return Qty(precRoundedResult + this.units());
    }
  });

  /**
   * Configures and returns a fast function to convert
   * Number values from units to others.
   * Useful to efficiently convert large array of values
   * with same units into others with iterative methods.
   * Does not take care of rounding issues.
   *
   * @param {string} srcUnits Units of values to convert
   * @param {string} dstUnits Units to convert to
   *
   * @returns {Function} Converting function accepting Number value
   *   and returning converted value
   *
   * @throws "Incompatible units" if units are incompatible
   *
   * @example
   * // Converting large array of numbers with the same units
   * // into other units
   * var converter = Qty.swiftConverter("m/h", "ft/s");
   * var convertedSerie = largeSerie.map(converter);
   *
   */
  function swiftConverter(srcUnits, dstUnits) {
    var srcQty = Qty(srcUnits);
    var dstQty = Qty(dstUnits);

    if (srcQty.eq(dstQty)) {
      return identity;
    }

    var convert;
    if (!srcQty.isTemperature()) {
      convert = function(value) {
        return value * srcQty.baseScalar / dstQty.baseScalar;
      };
    }
    else {
      convert = function(value) {
        // TODO Not optimized
        return srcQty.mul(value).to(dstQty).scalar;
      };
    }

    return function converter(value) {
      var i, length, result;
      if (!Array.isArray(value)) {
        return convert(value);
      }
      else {
        length = value.length;
        result = [];
        for (i = 0; i < length; i++) {
          result.push(convert(value[i]));
        }
        return result;
      }
    };
  }

  var baseUnitCache = {};

  function toBaseUnits(numerator,denominator) {
    var num = [];
    var den = [];
    var q = 1;
    var unit;
    for (var i = 0; i < numerator.length; i++) {
      unit = numerator[i];
      if (PREFIX_VALUES[unit]) {
        // workaround to fix
        // 0.1 * 0.1 => 0.010000000000000002
        q = mulSafe(q, PREFIX_VALUES[unit]);
      }
      else {
        if (UNIT_VALUES[unit]) {
          q *= UNIT_VALUES[unit].scalar;

          if (UNIT_VALUES[unit].numerator) {
            num.push(UNIT_VALUES[unit].numerator);
          }
          if (UNIT_VALUES[unit].denominator) {
            den.push(UNIT_VALUES[unit].denominator);
          }
        }
      }
    }
    for (var j = 0; j < denominator.length; j++) {
      unit = denominator[j];
      if (PREFIX_VALUES[unit]) {
        q /= PREFIX_VALUES[unit];
      }
      else {
        if (UNIT_VALUES[unit]) {
          q /= UNIT_VALUES[unit].scalar;

          if (UNIT_VALUES[unit].numerator) {
            den.push(UNIT_VALUES[unit].numerator);
          }
          if (UNIT_VALUES[unit].denominator) {
            num.push(UNIT_VALUES[unit].denominator);
          }
        }
      }
    }

    // Flatten
    num = num.reduce(function(a,b) {
      return a.concat(b);
    }, []);
    den = den.reduce(function(a,b) {
      return a.concat(b);
    }, []);

    return Qty({"scalar": q, "numerator": num, "denominator": den});
  }

  Qty.parse = globalParse;

  Qty.getUnits = getUnits;
  Qty.getAliases = getAliases;

  Qty.mulSafe = mulSafe;
  Qty.divSafe = divSafe;

  Qty.getKinds = getKinds;

  Qty.swiftConverter = swiftConverter;

  Qty.Error = QtyError;

  assign(Qty.prototype, {
    // Returns new instance with units of this
    add: function(other) {
      if (isString(other)) {
        other = Qty(other);
      }

      if (!this.isCompatible(other)) {
        throwIncompatibleUnits(this.units(), other.units());
      }

      if (this.isTemperature() && other.isTemperature()) {
        throw new QtyError("Cannot add two temperatures");
      }
      else if (this.isTemperature()) {
        return addTempDegrees(this, other);
      }
      else if (other.isTemperature()) {
        return addTempDegrees(other, this);
      }

      return Qty({"scalar": this.scalar + other.to(this).scalar, "numerator": this.numerator, "denominator": this.denominator});
    },

    sub: function(other) {
      if (isString(other)) {
        other = Qty(other);
      }

      if (!this.isCompatible(other)) {
        throwIncompatibleUnits(this.units(), other.units());
      }

      if (this.isTemperature() && other.isTemperature()) {
        return subtractTemperatures(this,other);
      }
      else if (this.isTemperature()) {
        return subtractTempDegrees(this,other);
      }
      else if (other.isTemperature()) {
        throw new QtyError("Cannot subtract a temperature from a differential degree unit");
      }

      return Qty({"scalar": this.scalar - other.to(this).scalar, "numerator": this.numerator, "denominator": this.denominator});
    },

    mul: function(other) {
      if (isNumber(other)) {
        return Qty({"scalar": mulSafe(this.scalar, other), "numerator": this.numerator, "denominator": this.denominator});
      }
      else if (isString(other)) {
        other = Qty(other);
      }

      if ((this.isTemperature() || other.isTemperature()) && !(this.isUnitless() || other.isUnitless())) {
        throw new QtyError("Cannot multiply by temperatures");
      }

      // Quantities should be multiplied with same units if compatible, with base units else
      var op1 = this;
      var op2 = other;

      // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
      // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"
      if (op1.isCompatible(op2) && op1.signature !== 400) {
        op2 = op2.to(op1);
      }
      var numdenscale = cleanTerms(op1.numerator, op1.denominator, op2.numerator, op2.denominator);

      return Qty({"scalar": mulSafe(op1.scalar, op2.scalar, numdenscale[2]), "numerator": numdenscale[0], "denominator": numdenscale[1]});
    },

    div: function(other) {
      if (isNumber(other)) {
        if (other === 0) {
          throw new QtyError("Divide by zero");
        }
        return Qty({"scalar": this.scalar / other, "numerator": this.numerator, "denominator": this.denominator});
      }
      else if (isString(other)) {
        other = Qty(other);
      }

      if (other.scalar === 0) {
        throw new QtyError("Divide by zero");
      }

      if (other.isTemperature()) {
        throw new QtyError("Cannot divide with temperatures");
      }
      else if (this.isTemperature() && !other.isUnitless()) {
        throw new QtyError("Cannot divide with temperatures");
      }

      // Quantities should be multiplied with same units if compatible, with base units else
      var op1 = this;
      var op2 = other;

      // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
      // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"
      if (op1.isCompatible(op2) && op1.signature !== 400) {
        op2 = op2.to(op1);
      }
      var numdenscale = cleanTerms(op1.numerator, op1.denominator, op2.denominator, op2.numerator);

      return Qty({"scalar": mulSafe(op1.scalar, numdenscale[2]) / op2.scalar, "numerator": numdenscale[0], "denominator": numdenscale[1]});
    },

    // Returns a Qty that is the inverse of this Qty,
    inverse: function() {
      if (this.isTemperature()) {
        throw new QtyError("Cannot divide with temperatures");
      }
      if (this.scalar === 0) {
        throw new QtyError("Divide by zero");
      }
      return Qty({"scalar": 1 / this.scalar, "numerator": this.denominator, "denominator": this.numerator});
    }
  });

  function cleanTerms(num1, den1, num2, den2) {
    function notUnity(val) {
      return val !== UNITY;
    }

    num1 = num1.filter(notUnity);
    num2 = num2.filter(notUnity);
    den1 = den1.filter(notUnity);
    den2 = den2.filter(notUnity);

    var combined = {};

    function combineTerms(terms, direction) {
      var k;
      var prefix;
      var prefixValue;
      for (var i = 0; i < terms.length; i++) {
        if (PREFIX_VALUES[terms[i]]) {
          k = terms[i + 1];
          prefix = terms[i];
          prefixValue = PREFIX_VALUES[prefix];
          i++;
        }
        else {
          k = terms[i];
          prefix = null;
          prefixValue = 1;
        }
        if (k && k !== UNITY) {
          if (combined[k]) {
            combined[k][0] += direction;
            var combinedPrefixValue = combined[k][2] ? PREFIX_VALUES[combined[k][2]] : 1;
            combined[k][direction === 1 ? 3 : 4] *= divSafe(prefixValue, combinedPrefixValue);
          }
          else {
            combined[k] = [direction, k, prefix, 1, 1];
          }
        }
      }
    }

    combineTerms(num1, 1);
    combineTerms(den1, -1);
    combineTerms(num2, 1);
    combineTerms(den2, -1);

    var num = [];
    var den = [];
    var scale = 1;

    for (var prop in combined) {
      if (combined.hasOwnProperty(prop)) {
        var item = combined[prop];
        var n;
        if (item[0] > 0) {
          for (n = 0; n < item[0]; n++) {
            num.push(item[2] === null ? item[1] : [item[2], item[1]]);
          }
        }
        else if (item[0] < 0) {
          for (n = 0; n < -item[0]; n++) {
            den.push(item[2] === null ? item[1] : [item[2], item[1]]);
          }
        }
        scale *= divSafe(item[3], item[4]);
      }
    }

    if (num.length === 0) {
      num = UNITY_ARRAY;
    }
    if (den.length === 0) {
      den = UNITY_ARRAY;
    }

    // Flatten
    num = num.reduce(function(a,b) {
      return a.concat(b);
    }, []);
    den = den.reduce(function(a,b) {
      return a.concat(b);
    }, []);

    return [num, den, scale];
  }

  assign(Qty.prototype, {
    eq: function(other) {
      return this.compareTo(other) === 0;
    },

    lt: function(other) {
      return this.compareTo(other) === -1;
    },

    lte: function(other) {
      return this.eq(other) || this.lt(other);
    },

    gt: function(other) {
      return this.compareTo(other) === 1;
    },

    gte: function(other) {
      return this.eq(other) || this.gt(other);
    },

    // Compare two Qty objects. Throws an exception if they are not of compatible types.
    // Comparisons are done based on the value of the quantity in base SI units.
    //
    // NOTE: We cannot compare inverses as that breaks the general compareTo contract:
    //   if a.compareTo(b) < 0 then b.compareTo(a) > 0
    //   if a.compareTo(b) == 0 then b.compareTo(a) == 0
    //
    //   Since "10S" == ".1ohm" (10 > .1) and "10ohm" == ".1S" (10 > .1)
    //     Qty("10S").inverse().compareTo("10ohm") == -1
    //     Qty("10ohm").inverse().compareTo("10S") == -1
    //
    //   If including inverses in the sort is needed, I suggest writing: Qty.sort(qtyArray,units)
    compareTo: function(other) {
      if (isString(other)) {
        return this.compareTo(Qty(other));
      }
      if (!this.isCompatible(other)) {
        throwIncompatibleUnits(this.units(), other.units());
      }
      if (this.baseScalar < other.baseScalar) {
        return -1;
      }
      else if (this.baseScalar === other.baseScalar) {
        return 0;
      }
      else if (this.baseScalar > other.baseScalar) {
        return 1;
      }
    },

    // Return true if quantities and units match
    // Unit("100 cm").same(Unit("100 cm"))  # => true
    // Unit("100 cm").same(Unit("1 m"))     # => false
    same: function(other) {
      return (this.scalar === other.scalar) && (this.units() === other.units());
    }
  });

  assign(Qty.prototype, {
    // returns true if no associated units
    // false, even if the units are "unitless" like 'radians, each, etc'
    isUnitless: function() {
      return [this.numerator, this.denominator].every(function(item) {
        return compareArray(item, UNITY_ARRAY);
      });
    },

    /*
    check to see if units are compatible, but not the scalar part
    this check is done by comparing signatures for performance reasons
    if passed a string, it will create a unit object with the string and then do the comparison
    this permits a syntax like:
    unit =~ "mm"
    if you want to do a regexp on the unit string do this ...
    unit.units =~ /regexp/
    */
    isCompatible: function(other) {
      if (isString(other)) {
        return this.isCompatible(Qty(other));
      }

      if (!(isQty(other))) {
        return false;
      }

      if (other.signature !== undefined) {
        return this.signature === other.signature;
      }
      else {
        return false;
      }
    },

    /*
    check to see if units are inverse of each other, but not the scalar part
    this check is done by comparing signatures for performance reasons
    if passed a string, it will create a unit object with the string and then do the comparison
    this permits a syntax like:
    unit =~ "mm"
    if you want to do a regexp on the unit string do this ...
    unit.units =~ /regexp/
    */
    isInverse: function(other) {
      return this.inverse().isCompatible(other);
    },

    // Returns 'true' if the Unit is represented in base units
    isBase: function() {
      if (this._isBase !== undefined) {
        return this._isBase;
      }
      if (this.isDegrees() && this.numerator[0].match(/<(kelvin|temp-K)>/)) {
        this._isBase = true;
        return this._isBase;
      }

      this.numerator.concat(this.denominator).forEach(function(item) {
        if (item !== UNITY && BASE_UNITS.indexOf(item) === -1 ) {
          this._isBase = false;
        }
      }, this);
      if (this._isBase === false) {
        return this._isBase;
      }
      this._isBase = true;
      return this._isBase;
    }
  });

  function NestedMap() {}

  NestedMap.prototype.get = function(keys) {

    // Allows to pass key1, key2, ... instead of [key1, key2, ...]
    if (arguments.length > 1) {
      // Slower with Firefox but faster with Chrome than
      // Array.prototype.slice.call(arguments)
      // See http://jsperf.com/array-apply-versus-array-prototype-slice-call
      keys = Array.apply(null, arguments);
    }

    return keys.reduce(function(map, key, index) {
      if (map) {

        var childMap = map[key];

        if (index === keys.length - 1) {
          return childMap ? childMap.data : undefined;
        }
        else {
          return childMap;
        }
      }
    },
    this);
  };

  NestedMap.prototype.set = function(keys, value) {

    if (arguments.length > 2) {
      keys = Array.prototype.slice.call(arguments, 0, -1);
      value = arguments[arguments.length - 1];
    }

    return keys.reduce(function(map, key, index) {

      var childMap = map[key];
      if (childMap === undefined) {
        childMap = map[key] = {};
      }

      if (index === keys.length - 1) {
        childMap.data = value;
        return value;
      }
      else {
        return childMap;
      }
    }, this);
  };

  /**
   * Default formatter
   *
   * @param {number} scalar - scalar value
   * @param {string} units - units as string
   *
   * @returns {string} formatted result
   */
  function defaultFormatter(scalar, units) {
    return (scalar + " " + units).trim();
  }

  /**
   *
   * Configurable Qty default formatter
   *
   * @type {function}
   *
   * @param {number} scalar
   * @param {string} units
   *
   * @returns {string} formatted result
   */
  Qty.formatter = defaultFormatter;

  assign(Qty.prototype, {

    // returns the 'unit' part of the Unit object without the scalar
    units: function() {
      if (this._units !== undefined) {
        return this._units;
      }

      var numIsUnity = compareArray(this.numerator, UNITY_ARRAY);
      var denIsUnity = compareArray(this.denominator, UNITY_ARRAY);
      if (numIsUnity && denIsUnity) {
        this._units = "";
        return this._units;
      }

      var numUnits = stringifyUnits(this.numerator);
      var denUnits = stringifyUnits(this.denominator);
      this._units = numUnits + (denIsUnity ? "" : ("/" + denUnits));
      return this._units;
    },

    /**
     * Stringifies the quantity
     * Deprecation notice: only units parameter is supported.
     *
     * @param {(number|string|Qty)} targetUnitsOrMaxDecimalsOrPrec -
     *                              target units if string,
     *                              max number of decimals if number,
     *                              passed to #toPrec before converting if Qty
     *
     * @param {number=} maxDecimals - Maximum number of decimals of
     *                                formatted output
     *
     * @returns {string} reparseable quantity as string
     */
    toString: function(targetUnitsOrMaxDecimalsOrPrec, maxDecimals) {
      var targetUnits;
      if (isNumber(targetUnitsOrMaxDecimalsOrPrec)) {
        targetUnits = this.units();
        maxDecimals = targetUnitsOrMaxDecimalsOrPrec;
      }
      else if (isString(targetUnitsOrMaxDecimalsOrPrec)) {
        targetUnits = targetUnitsOrMaxDecimalsOrPrec;
      }
      else if (isQty(targetUnitsOrMaxDecimalsOrPrec)) {
        return this.toPrec(targetUnitsOrMaxDecimalsOrPrec).toString(maxDecimals);
      }

      var out = this.to(targetUnits);

      var outScalar = maxDecimals !== undefined ? round(out.scalar, maxDecimals) : out.scalar;
      out = (outScalar + " " + out.units()).trim();
      return out;
    },

    /**
     * Format the quantity according to optional passed target units
     * and formatter
     *
     * @param {string} [targetUnits=current units] -
     *                 optional units to convert to before formatting
     *
     * @param {function} [formatter=Qty.formatter] -
     *                   delegates formatting to formatter callback.
     *                   formatter is called back with two parameters (scalar, units)
     *                   and should return formatted result.
     *                   If unspecified, formatting is delegated to default formatter
     *                   set to Qty.formatter
     *
     * @example
     * var roundingAndLocalizingFormatter = function(scalar, units) {
     *   // localize or limit scalar to n max decimals for instance
     *   // return formatted result
     * };
     * var qty = Qty('1.1234 m');
     * qty.format(); // same units, default formatter => "1.234 m"
     * qty.format("cm"); // converted to "cm", default formatter => "123.45 cm"
     * qty.format(roundingAndLocalizingFormatter); // same units, custom formatter => "1,2 m"
     * qty.format("cm", roundingAndLocalizingFormatter); // convert to "cm", custom formatter => "123,4 cm"
     *
     * @returns {string} quantity as string
     */
    format: function(targetUnits, formatter) {
      if (arguments.length === 1) {
        if (typeof targetUnits === "function") {
          formatter = targetUnits;
          targetUnits = undefined;
        }
      }

      formatter = formatter || Qty.formatter;
      var targetQty = this.to(targetUnits);
      return formatter.call(this, targetQty.scalar, targetQty.units());
    }
  });

  var stringifiedUnitsCache = new NestedMap();
  /**
   * Returns a string representing a normalized unit array
   *
   * @param {string[]} units Normalized unit array
   * @returns {string} String representing passed normalized unit array and
   *   suitable for output
   *
   */
  function stringifyUnits(units) {

    var stringified = stringifiedUnitsCache.get(units);
    if (stringified) {
      return stringified;
    }

    var isUnity = compareArray(units, UNITY_ARRAY);
    if (isUnity) {
      stringified = "1";
    }
    else {
      stringified = simplify(getOutputNames(units)).join("*");
    }

    // Cache result
    stringifiedUnitsCache.set(units, stringified);

    return stringified;
  }

  function getOutputNames(units) {
    var unitNames = [], token, tokenNext;
    for (var i = 0; i < units.length; i++) {
      token = units[i];
      tokenNext = units[i + 1];
      if (PREFIX_VALUES[token]) {
        unitNames.push(OUTPUT_MAP[token] + OUTPUT_MAP[tokenNext]);
        i++;
      }
      else {
        unitNames.push(OUTPUT_MAP[token]);
      }
    }
    return unitNames;
  }

  function simplify(units) {
    // this turns ['s','m','s'] into ['s2','m']

    var unitCounts = units.reduce(function(acc, unit) {
      var unitCounter = acc[unit];
      if (!unitCounter) {
        acc.push(unitCounter = acc[unit] = [unit, 0]);
      }

      unitCounter[1]++;

      return acc;
    }, []);

    return unitCounts.map(function(unitCount) {
      return unitCount[0] + (unitCount[1] > 1 ? unitCount[1] : "");
    });
  }

  Qty.version = "1.8.0";

  return Qty;

}));
