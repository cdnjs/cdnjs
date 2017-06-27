(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-dsv', ['exports'], factory) :
  factory((global.d3_dsv = {}));
}(this, function (exports) { 'use strict';

  function dsv(delimiter) {
    return new Dsv(delimiter);
  }

  function converter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + "]";
    }).join(",") + "}");
  }

  function customConverter(columns, f) {
    var convert = converter(columns);
    return function(row, i) {
      return f(convert(row), i);
    };
  }

  // Compute unique columns in order of discovery.
  function inferColumns(rows) {
    var columnSet = Object.create(null),
        columns = [];

    rows.forEach(function(row) {
      for (var column in row) {
        if (!(column in columnSet)) {
          columns.push(columnSet[column] = column);
        }
      }
    });

    return columns;
  }

  function Dsv(delimiter) {
    var reFormat = new RegExp("[\"" + delimiter + "\n]"),
        delimiterCode = delimiter.charCodeAt(0);

    this.parse = function(text, f) {
      var convert, columns, rows = this.parseRows(text, function(row, i) {
        if (convert) return convert(row, i - 1);
        columns = row, convert = f ? customConverter(row, f) : converter(row);
      });
      rows.columns = columns;
      return rows;
    };

    this.parseRows = function(text, f) {
      var EOL = {}, // sentinel value for end-of-line
          EOF = {}, // sentinel value for end-of-file
          rows = [], // output rows
          N = text.length,
          I = 0, // current character index
          n = 0, // the current line number
          t, // the current token
          eol; // is the current token followed by EOL?

      function token() {
        if (I >= N) return EOF; // special case: end of file
        if (eol) return eol = false, EOL; // special case: end of line

        // special case: quotes
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.slice(j + 1, i).replace(/""/g, "\"");
        }

        // common case: find next delimiter or newline
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; // \n
          else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
          else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }

        // special case: last token before EOF
        return text.slice(j);
      }

      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }

      return rows;
    }

    this.format = function(rows, columns) {
      if (arguments.length < 2) columns = inferColumns(rows);
      return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
        return columns.map(function(column) {
          return formatValue(row[column]);
        }).join(delimiter);
      })).join("\n");
    };

    this.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(text) {
      return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
    }
  };

  dsv.prototype = Dsv.prototype;

  var csv = dsv(",");
  var tsv = dsv("\t");

  var version = "0.1.11";

  exports.version = version;
  exports.dsv = dsv;
  exports.csv = csv;
  exports.tsv = tsv;

}));
},{}],3:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-format', ['exports'], factory) :
  factory((global.d3_format = {}));
}(this, function (exports) { 'use strict';

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  };

  function exponent(x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  };

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  };

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  };

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  };

  function formatDefault(x, p) {
    x = x.toPrecision(p);

    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (x[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        case "e": break out;
        default: if (i0 > 0) i0 = 0; break;
      }
    }

    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
  };

  var formatTypes = {
    "": formatDefault,
    "%": function(x, p) { return (x * 100).toFixed(p); },
    "b": function(x) { return Math.round(x).toString(2); },
    "c": function(x) { return x + ""; },
    "d": function(x) { return Math.round(x).toString(10); },
    "e": function(x, p) { return x.toExponential(p); },
    "f": function(x, p) { return x.toFixed(p); },
    "g": function(x, p) { return x.toPrecision(p); },
    "o": function(x) { return Math.round(x).toString(8); },
    "p": function(x, p) { return formatRounded(x * 100, p); },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
    "x": function(x) { return Math.round(x).toString(16); }
  };

  // [[fill]align][sign][symbol][0][width][,][.precision][type]
  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    return new FormatSpecifier(specifier);
  };

  function FormatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

    var match,
        fill = match[1] || " ",
        align = match[2] || ">",
        sign = match[3] || "-",
        symbol = match[4] || "",
        zero = !!match[5],
        width = match[6] && +match[6],
        comma = !!match[7],
        precision = match[8] && +match[8].slice(1),
        type = match[9] || "";

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // Map invalid types to the default format.
    else if (!formatTypes[type]) type = "";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    this.fill = fill;
    this.align = align;
    this.sign = sign;
    this.symbol = symbol;
    this.zero = zero;
    this.width = width;
    this.comma = comma;
    this.precision = precision;
    this.type = type;
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width == null ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
        + this.type;
  };

  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function identity(x) {
    return x;
  }

  function locale(locale) {
    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
        currency = locale.currency,
        decimal = locale.decimal;

    function format(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          type = specifier.type;

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = !type || /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision == null ? (type ? 6 : 12)
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      return function(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Convert negative to positive, and compute the prefix.
          // Note that -0 is not less than 0, but 1 / -0 is!
          var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);

          // Perform the initial formatting.
          value = formatType(value, precision);

          // If the original value was negative, it may be rounded to zero during
          // formatting; treat this as (positive) zero.
          if (valueNegative) {
            var i = -1, n = value.length, c;
            valueNegative = false;
            while (++i < n) {
              if (c = value.charCodeAt(i), (48 < c && c < 58)
                  || (type === "x" && 96 < c && c < 103)
                  || (type === "X" && 64 < c && c < 71)) {
                valueNegative = true;
                break;
              }
            }
          }

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            var i = -1, n = value.length, c;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": return valuePrefix + value + valueSuffix + padding;
          case "=": return valuePrefix + padding + value + valueSuffix;
          case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
        }
        return padding + valuePrefix + value + valueSuffix;
      };
    }

    function formatPrefix(specifier, value) {
      var f = format((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: format,
      formatPrefix: formatPrefix
    };
  };

  var defaultLocale = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  var caES = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  });

  var deCH = locale({
    decimal: ",",
    thousands: "'",
    grouping: [3],
    currency: ["", "\xa0CHF"]
  });

  var deDE = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  });

  var enCA = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  var enGB = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["£", ""]
  });

  var esES = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  });

  var fiFI = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0€"]
  });

  var frCA = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "$"]
  });

  var frFR = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  });

  var heIL = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["₪", ""]
  });

  var huHU = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0Ft"]
  });

  var itIT = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["€", ""]
  });

  var jaJP = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["", "円"]
  });

  var koKR = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["₩", ""]
  });

  var mkMK = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0ден."]
  });

  var nlNL = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["€\xa0", ""]
  });

  var plPL = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "zł"]
  });

  var ptBR = locale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["R$", ""]
  });

  var ruRU = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0руб."]
  });

  var svSE = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "SEK"]
  });

  var zhCN = locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["¥", ""]
  });

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  };

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  };

  function precisionRound(step, max) {
    return Math.max(0, exponent(Math.abs(max)) - exponent(Math.abs(step))) + 1;
  };

  var format = defaultLocale.format;
  var formatPrefix = defaultLocale.formatPrefix;

  var version = "0.4.0";

  exports.version = version;
  exports.format = format;
  exports.formatPrefix = formatPrefix;
  exports.locale = locale;
  exports.localeCaEs = caES;
  exports.localeDeCh = deCH;
  exports.localeDeDe = deDE;
  exports.localeEnCa = enCA;
  exports.localeEnGb = enGB;
  exports.localeEnUs = defaultLocale;
  exports.localeEsEs = esES;
  exports.localeFiFi = fiFI;
  exports.localeFrCa = frCA;
  exports.localeFrFr = frFR;
  exports.localeHeIl = heIL;
  exports.localeHuHu = huHU;
  exports.localeItIt = itIT;
  exports.localeJaJp = jaJP;
  exports.localeKoKr = koKR;
  exports.localeMkMk = mkMK;
  exports.localeNlNl = nlNL;
  exports.localePlPl = plPL;
  exports.localePtBr = ptBR;
  exports.localeRuRu = ruRU;
  exports.localeSvSe = svSE;
  exports.localeZhCn = zhCN;
  exports.formatSpecifier = formatSpecifier;
  exports.precisionFixed = precisionFixed;
  exports.precisionPrefix = precisionPrefix;
  exports.precisionRound = precisionRound;

}));
},{}],4:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-time')) :
  typeof define === 'function' && define.amd ? define('d3-time-format', ['exports', 'd3-time'], factory) :
  factory((global.d3_time_format = {}),global.d3_time);
}(this, function (exports,d3Time) { 'use strict';

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newYear(y) {
    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
  }

  function locale$1(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "S": formatSeconds,
      "U": formatWeekNumberSunday,
      "w": formatWeekdayNumber,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "S": formatUTCSeconds,
      "U": formatUTCWeekNumberSunday,
      "w": formatUTCWeekdayNumber,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "S": parseSeconds,
      "U": parseWeekNumberSunday,
      "w": parseWeekdayNumber,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, newDate) {
      return function(string) {
        var d = newYear(1900),
            i = parseSpecifier(d, specifier, string += "", 0);
        if (i != string.length) return null;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
          var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return newDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.parse = newParse(specifier, localDate);
        f.toString = function() { return specifier; };
        return f;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.parse = newParse(specifier, utcDate);
        f.toString = function() { return specifier; };
        return f;
      }
    };
  };

  var pads = {"-": "", "_": " ", "0": "0"};
  var numberRe = /^\s*\d+/;
  var percentRe = /^%/;
  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {}, i = -1, n = names.length;
    while (++i < n) map[names[i].toLowerCase()] = i;
    return map;
  }

  function parseWeekdayNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + d3Time.day.count(d3Time.year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekNumberSunday(d, p) {
    return pad(d3Time.sunday.count(d3Time.year(d), d), p, 2);
  }

  function formatWeekdayNumber(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(d3Time.monday.count(d3Time.year(d), d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad(z / 60 | 0, "0", 2)
        + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
  }

  function formatUTCWeekdayNumber(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  var locale = locale$1({
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  var caES = locale$1({
    dateTime: "%A, %e de %B de %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
    shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
    months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
    shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
  });

  var deCH = locale$1({
    dateTime: "%A, der %e. %B %Y, %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  });

  var deDE = locale$1({
    dateTime: "%A, der %e. %B %Y, %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  });

  var enCA = locale$1({
    dateTime: "%a %b %e %X %Y",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  var enGB = locale$1({
    dateTime: "%a %e %b %X %Y",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  var esES = locale$1({
    dateTime: "%A, %e de %B de %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  });

  var fiFI = locale$1({
    dateTime: "%A, %-d. %Bta %Y klo %X",
    date: "%-d.%-m.%Y",
    time: "%H:%M:%S",
    periods: ["a.m.", "p.m."],
    days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
    shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
    months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
    shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
  });

  var frCA = locale$1({
    dateTime: "%a %e %b %Y %X",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["", ""],
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
  });

  var frFR = locale$1({
    dateTime: "%A, le %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  });

  var heIL = locale$1({
    dateTime: "%A, %e ב%B %Y %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
  });

  var huHU = locale$1({
    dateTime: "%Y. %B %-e., %A %X",
    date: "%Y. %m. %d.",
    time: "%H:%M:%S",
    periods: ["de.", "du."], // unused
    days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
    shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
    months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
    shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
  });

  var itIT = locale$1({
    dateTime: "%A %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
    shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
  });

  var jaJP = locale$1({
    dateTime: "%Y %b %e %a %X",
    date: "%Y/%m/%d",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    shortDays: ["日", "月", "火", "水", "木", "金", "土"],
    months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
    shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  });

  var koKR = locale$1({
    dateTime: "%Y/%m/%d %a %X",
    date: "%Y/%m/%d",
    time: "%H:%M:%S",
    periods: ["오전", "오후"],
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
  });

  var mkMK = locale$1({
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
    shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
    shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
  });

  var nlNL = locale$1({
    dateTime: "%a %e %B %Y %T",
    date: "%d-%m-%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
    shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
  });

  var plPL = locale$1({
    dateTime: "%A, %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
  });

  var ptBR = locale$1({
    dateTime: "%A, %e de %B de %Y. %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  });

  var ruRU = locale$1({
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
  });

  var svSE = locale$1({
    dateTime: "%A den %d %B %Y %X",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["fm", "em"],
    days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
    shortDays: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
  });

  var zhCN = locale$1({
    dateTime: "%a %b %e %X %Y",
    date: "%Y/%-m/%-d",
    time: "%H:%M:%S",
    periods: ["上午", "下午"],
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  });

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };

  formatIsoNative.toString = function() {
    return isoSpecifier;
  };

  var formatIso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
      ? formatIsoNative
      : locale.utcFormat(isoSpecifier);

  var format = locale.format;
  var utcFormat = locale.utcFormat;

  var version = "0.2.0";

  exports.version = version;
  exports.format = format;
  exports.utcFormat = utcFormat;
  exports.locale = locale$1;
  exports.localeCaEs = caES;
  exports.localeDeCh = deCH;
  exports.localeDeDe = deDE;
  exports.localeEnCa = enCA;
  exports.localeEnGb = enGB;
  exports.localeEnUs = locale;
  exports.localeEsEs = esES;
  exports.localeFiFi = fiFI;
  exports.localeFrCa = frCA;
  exports.localeFrFr = frFR;
  exports.localeHeIl = heIL;
  exports.localeHuHu = huHU;
  exports.localeItIt = itIT;
  exports.localeJaJp = jaJP;
  exports.localeKoKr = koKR;
  exports.localeMkMk = mkMK;
  exports.localeNlNl = nlNL;
  exports.localePlPl = plPL;
  exports.localePtBr = ptBR;
  exports.localeRuRu = ruRU;
  exports.localeSvSe = svSE;
  exports.localeZhCn = zhCN;
  exports.isoFormat = formatIso;

}));
},{"d3-time":5}],5:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-time', ['exports'], factory) :
  factory((global.d3_time = {}));
}(this, function (exports) { 'use strict';

  var t0 = new Date;
  var t1 = new Date;
  function newInterval(floori, offseti, count) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.round = function(date) {
      var d0 = new Date(+date),
          d1 = new Date(date - 1);
      floori(d0), floori(d1), offseti(d1, 1);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), date;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = new Date(start - 1);
      stop = new Date(+stop);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      offseti(start, 1), floori(start);
      if (start < stop) range.push(new Date(+start));
      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    return interval;
  };

  var millisecond = newInterval(function() {
    // noop
  }, function(date, step) {
    date.setTime(+date + step);
  }, function(start, end) {
    return end - start;
  });

  var second = newInterval(function(date) {
    date.setMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  var minute = newInterval(function(date) {
    date.setSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  var hour = newInterval(function(date) {
    date.setMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  });

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  });

  var utcSecond = newInterval(function(date) {
    date.setUTCMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / 864e5;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / 6048e5;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(1);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  });

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  });

  var milliseconds = millisecond.range;
  var seconds = second.range;
  var minutes = minute.range;
  var hours = hour.range;
  var days = day.range;
  var sundays = sunday.range;
  var mondays = monday.range;
  var tuesdays = tuesday.range;
  var wednesdays = wednesday.range;
  var thursdays = thursday.range;
  var fridays = friday.range;
  var saturdays = saturday.range;
  var weeks = sunday.range;
  var months = month.range;
  var years = year.range;

  var utcMillisecond = millisecond;
  var utcMilliseconds = milliseconds;
  var utcSeconds = utcSecond.range;
  var utcMinutes = utcMinute.range;
  var utcHours = utcHour.range;
  var utcDays = utcDay.range;
  var utcSundays = utcSunday.range;
  var utcMondays = utcMonday.range;
  var utcTuesdays = utcTuesday.range;
  var utcWednesdays = utcWednesday.range;
  var utcThursdays = utcThursday.range;
  var utcFridays = utcFriday.range;
  var utcSaturdays = utcSaturday.range;
  var utcWeeks = utcSunday.range;
  var utcMonths = utcMonth.range;
  var utcYears = utcYear.range;

  var version = "0.0.7";

  exports.version = version;
  exports.milliseconds = milliseconds;
  exports.seconds = seconds;
  exports.minutes = minutes;
  exports.hours = hours;
  exports.days = days;
  exports.sundays = sundays;
  exports.mondays = mondays;
  exports.tuesdays = tuesdays;
  exports.wednesdays = wednesdays;
  exports.thursdays = thursdays;
  exports.fridays = fridays;
  exports.saturdays = saturdays;
  exports.weeks = weeks;
  exports.months = months;
  exports.years = years;
  exports.utcMillisecond = utcMillisecond;
  exports.utcMilliseconds = utcMilliseconds;
  exports.utcSeconds = utcSeconds;
  exports.utcMinutes = utcMinutes;
  exports.utcHours = utcHours;
  exports.utcDays = utcDays;
  exports.utcSundays = utcSundays;
  exports.utcMondays = utcMondays;
  exports.utcTuesdays = utcTuesdays;
  exports.utcWednesdays = utcWednesdays;
  exports.utcThursdays = utcThursdays;
  exports.utcFridays = utcFridays;
  exports.utcSaturdays = utcSaturdays;
  exports.utcWeeks = utcWeeks;
  exports.utcMonths = utcMonths;
  exports.utcYears = utcYears;
  exports.millisecond = millisecond;
  exports.second = second;
  exports.minute = minute;
  exports.hour = hour;
  exports.day = day;
  exports.sunday = sunday;
  exports.monday = monday;
  exports.tuesday = tuesday;
  exports.wednesday = wednesday;
  exports.thursday = thursday;
  exports.friday = friday;
  exports.saturday = saturday;
  exports.week = sunday;
  exports.month = month;
  exports.year = year;
  exports.utcSecond = utcSecond;
  exports.utcMinute = utcMinute;
  exports.utcHour = utcHour;
  exports.utcDay = utcDay;
  exports.utcSunday = utcSunday;
  exports.utcMonday = utcMonday;
  exports.utcTuesday = utcTuesday;
  exports.utcWednesday = utcWednesday;
  exports.utcThursday = utcThursday;
  exports.utcFriday = utcFriday;
  exports.utcSaturday = utcSaturday;
  exports.utcWeek = utcSunday;
  exports.utcMonth = utcMonth;
  exports.utcYear = utcYear;
  exports.interval = newInterval;

}));
},{}],6:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-time', ['exports'], factory) :
  factory((global.d3_time = {}));
}(this, function (exports) { 'use strict';

  var t0 = new Date;
  var t1 = new Date;
  function newInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.round = function(date) {
      var d0 = new Date(+date),
          d1 = new Date(date - 1);
      floori(d0), floori(d1), offseti(d1, 1);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), date;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = new Date(start - 1);
      stop = new Date(+stop);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      offseti(start, 1), floori(start);
      if (start < stop) range.push(new Date(+start));
      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) {
      interval.count = function(start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? function(d) { return field(d) % step === 0; }
                : function(d) { return interval.count(0, d) % step === 0; });
      };
    }

    return interval;
  };

  var millisecond = newInterval(function() {
    // noop
  }, function(date, step) {
    date.setTime(+date + step);
  }, function(start, end) {
    return end - start;
  });

  // An optimized implementation for this simple case.
  millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function(date) {
      date.setTime(Math.floor(date / k) * k);
    }, function(date, step) {
      date.setTime(+date + step * k);
    }, function(start, end) {
      return (end - start) / k;
    });
  };

  var second = newInterval(function(date) {
    date.setMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  }, function(date) {
    return date.getSeconds();
  });

  var minute = newInterval(function(date) {
    date.setSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  }, function(date) {
    return date.getMinutes();
  });

  var hour = newInterval(function(date) {
    date.setMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  }, function(date) {
    return date.getHours();
  });

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  }, function(date) {
    return date.getDate() - 1;
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function(date) {
    return date.getMonth();
  });

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date) {
    return date.getFullYear();
  });

  var utcSecond = newInterval(function(date) {
    date.setUTCMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  }, function(date) {
    return date.getUTCSeconds();
  });

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  }, function(date) {
    return date.getUTCMinutes();
  });

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  }, function(date) {
    return date.getUTCHours();
  });

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / 864e5;
  }, function(date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / 6048e5;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(1);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function(date) {
    return date.getUTCMonth();
  });

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date) {
    return date.getUTCFullYear();
  });

  var milliseconds = millisecond.range;
  var seconds = second.range;
  var minutes = minute.range;
  var hours = hour.range;
  var days = day.range;
  var sundays = sunday.range;
  var mondays = monday.range;
  var tuesdays = tuesday.range;
  var wednesdays = wednesday.range;
  var thursdays = thursday.range;
  var fridays = friday.range;
  var saturdays = saturday.range;
  var weeks = sunday.range;
  var months = month.range;
  var years = year.range;

  var utcMillisecond = millisecond;
  var utcMilliseconds = milliseconds;
  var utcSeconds = utcSecond.range;
  var utcMinutes = utcMinute.range;
  var utcHours = utcHour.range;
  var utcDays = utcDay.range;
  var utcSundays = utcSunday.range;
  var utcMondays = utcMonday.range;
  var utcTuesdays = utcTuesday.range;
  var utcWednesdays = utcWednesday.range;
  var utcThursdays = utcThursday.range;
  var utcFridays = utcFriday.range;
  var utcSaturdays = utcSaturday.range;
  var utcWeeks = utcSunday.range;
  var utcMonths = utcMonth.range;
  var utcYears = utcYear.range;

  var version = "0.1.0";

  exports.version = version;
  exports.milliseconds = milliseconds;
  exports.seconds = seconds;
  exports.minutes = minutes;
  exports.hours = hours;
  exports.days = days;
  exports.sundays = sundays;
  exports.mondays = mondays;
  exports.tuesdays = tuesdays;
  exports.wednesdays = wednesdays;
  exports.thursdays = thursdays;
  exports.fridays = fridays;
  exports.saturdays = saturdays;
  exports.weeks = weeks;
  exports.months = months;
  exports.years = years;
  exports.utcMillisecond = utcMillisecond;
  exports.utcMilliseconds = utcMilliseconds;
  exports.utcSeconds = utcSeconds;
  exports.utcMinutes = utcMinutes;
  exports.utcHours = utcHours;
  exports.utcDays = utcDays;
  exports.utcSundays = utcSundays;
  exports.utcMondays = utcMondays;
  exports.utcTuesdays = utcTuesdays;
  exports.utcWednesdays = utcWednesdays;
  exports.utcThursdays = utcThursdays;
  exports.utcFridays = utcFridays;
  exports.utcSaturdays = utcSaturdays;
  exports.utcWeeks = utcWeeks;
  exports.utcMonths = utcMonths;
  exports.utcYears = utcYears;
  exports.millisecond = millisecond;
  exports.second = second;
  exports.minute = minute;
  exports.hour = hour;
  exports.day = day;
  exports.sunday = sunday;
  exports.monday = monday;
  exports.tuesday = tuesday;
  exports.wednesday = wednesday;
  exports.thursday = thursday;
  exports.friday = friday;
  exports.saturday = saturday;
  exports.week = sunday;
  exports.month = month;
  exports.year = year;
  exports.utcSecond = utcSecond;
  exports.utcMinute = utcMinute;
  exports.utcHour = utcHour;
  exports.utcDay = utcDay;
  exports.utcSunday = utcSunday;
  exports.utcMonday = utcMonday;
  exports.utcTuesday = utcTuesday;
  exports.utcWednesday = utcWednesday;
  exports.utcThursday = utcThursday;
  exports.utcFriday = utcFriday;
  exports.utcSaturday = utcSaturday;
  exports.utcWeek = utcSunday;
  exports.utcMonth = utcMonth;
  exports.utcYear = utcYear;
  exports.interval = newInterval;

}));
},{}],7:[function(require,module,exports){
!function() {
  var topojson = {
    version: "1.6.19",
    mesh: function(topology) { return object(topology, meshArcs.apply(this, arguments)); },
    meshArcs: meshArcs,
    merge: function(topology) { return object(topology, mergeArcs.apply(this, arguments)); },
    mergeArcs: mergeArcs,
    feature: featureOrCollection,
    neighbors: neighbors,
    presimplify: presimplify
  };

  function stitchArcs(topology, arcs) {
    var stitchedArcs = {},
        fragmentByStart = {},
        fragmentByEnd = {},
        fragments = [],
        emptyIndex = -1;

    // Stitch empty arcs first, since they may be subsumed by other arcs.
    arcs.forEach(function(i, j) {
      var arc = topology.arcs[i < 0 ? ~i : i], t;
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
      }
    });

    arcs.forEach(function(i) {
      var e = ends(i),
          start = e[0],
          end = e[1],
          f, g;

      if (f = fragmentByEnd[start]) {
        delete fragmentByEnd[f.end];
        f.push(i);
        f.end = end;
        if (g = fragmentByStart[end]) {
          delete fragmentByStart[g.start];
          var fg = g === f ? f : f.concat(g);
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else if (f = fragmentByStart[end]) {
        delete fragmentByStart[f.start];
        f.unshift(i);
        f.start = start;
        if (g = fragmentByEnd[start]) {
          delete fragmentByEnd[g.end];
          var gf = g === f ? f : g.concat(f);
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else {
        f = [i];
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
      }
    });

    function ends(i) {
      var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
      if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
      else p1 = arc[arc.length - 1];
      return i < 0 ? [p1, p0] : [p0, p1];
    }

    function flush(fragmentByEnd, fragmentByStart) {
      for (var k in fragmentByEnd) {
        var f = fragmentByEnd[k];
        delete fragmentByStart[f.start];
        delete f.start;
        delete f.end;
        f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
        fragments.push(f);
      }
    }

    flush(fragmentByEnd, fragmentByStart);
    flush(fragmentByStart, fragmentByEnd);
    arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

    return fragments;
  }

  function meshArcs(topology, o, filter) {
    var arcs = [];

    if (arguments.length > 1) {
      var geomsByArc = [],
          geom;

      function arc(i) {
        var j = i < 0 ? ~i : i;
        (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
      }

      function line(arcs) {
        arcs.forEach(arc);
      }

      function polygon(arcs) {
        arcs.forEach(line);
      }

      function geometry(o) {
        if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
        else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
      }

      var geometryType = {
        LineString: line,
        MultiLineString: polygon,
        Polygon: polygon,
        MultiPolygon: function(arcs) { arcs.forEach(polygon); }
      };

      geometry(o);

      geomsByArc.forEach(arguments.length < 3
          ? function(geoms) { arcs.push(geoms[0].i); }
          : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
    } else {
      for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
    }

    return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
  }

  function mergeArcs(topology, objects) {
    var polygonsByArc = {},
        polygons = [],
        components = [];

    objects.forEach(function(o) {
      if (o.type === "Polygon") register(o.arcs);
      else if (o.type === "MultiPolygon") o.arcs.forEach(register);
    });

    function register(polygon) {
      polygon.forEach(function(ring) {
        ring.forEach(function(arc) {
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
        });
      });
      polygons.push(polygon);
    }

    function exterior(ring) {
      return cartesianRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]) > 0; // TODO allow spherical?
    }

    polygons.forEach(function(polygon) {
      if (!polygon._) {
        var component = [],
            neighbors = [polygon];
        polygon._ = 1;
        components.push(component);
        while (polygon = neighbors.pop()) {
          component.push(polygon);
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
                if (!polygon._) {
                  polygon._ = 1;
                  neighbors.push(polygon);
                }
              });
            });
          });
        }
      }
    });

    polygons.forEach(function(polygon) {
      delete polygon._;
    });

    return {
      type: "MultiPolygon",
      arcs: components.map(function(polygons) {
        var arcs = [];

        // Extract the exterior (unique) arcs.
        polygons.forEach(function(polygon) {
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
                arcs.push(arc);
              }
            });
          });
        });

        // Stitch the arcs into one or more rings.
        arcs = stitchArcs(topology, arcs);

        // If more than one ring is returned,
        // at most one of these rings can be the exterior;
        // this exterior ring has the same winding order
        // as any exterior ring in the original polygons.
        if ((n = arcs.length) > 1) {
          var sgn = exterior(polygons[0][0]);
          for (var i = 0, t; i < n; ++i) {
            if (sgn === exterior(arcs[i])) {
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;
              break;
            }
          }
        }

        return arcs;
      })
    };
  }

  function featureOrCollection(topology, o) {
    return o.type === "GeometryCollection" ? {
      type: "FeatureCollection",
      features: o.geometries.map(function(o) { return feature(topology, o); })
    } : feature(topology, o);
  }

  function feature(topology, o) {
    var f = {
      type: "Feature",
      id: o.id,
      properties: o.properties || {},
      geometry: object(topology, o)
    };
    if (o.id == null) delete f.id;
    return f;
  }

  function object(topology, o) {
    var absolute = transformAbsolute(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
        points.push(p = a[k].slice());
        absolute(p, k);
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      p = p.slice();
      absolute(p, 0);
      return p;
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
      if (points.length < 2) points.push(points[0].slice());
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) points.push(points[0].slice());
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var t = o.type;
      return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
          : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
          : null;
    }

    var geometryType = {
      Point: function(o) { return point(o.coordinates); },
      MultiPoint: function(o) { return o.coordinates.map(point); },
      LineString: function(o) { return line(o.arcs); },
      MultiLineString: function(o) { return o.arcs.map(line); },
      Polygon: function(o) { return polygon(o.arcs); },
      MultiPolygon: function(o) { return o.arcs.map(polygon); }
    };

    return geometry(o);
  }

  function reverse(array, n) {
    var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
  }

  function bisect(a, x) {
    var lo = 0, hi = a.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function neighbors(objects) {
    var indexesByArc = {}, // arc index -> array of object indexes
        neighbors = objects.map(function() { return []; });

    function line(arcs, i) {
      arcs.forEach(function(a) {
        if (a < 0) a = ~a;
        var o = indexesByArc[a];
        if (o) o.push(i);
        else indexesByArc[a] = [i];
      });
    }

    function polygon(arcs, i) {
      arcs.forEach(function(arc) { line(arc, i); });
    }

    function geometry(o, i) {
      if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
      else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
    }

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
    };

    objects.forEach(geometry);

    for (var i in indexesByArc) {
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
        for (var k = j + 1; k < m; ++k) {
          var ij = indexes[j], ik = indexes[k], n;
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
        }
      }
    }

    return neighbors;
  }

  function presimplify(topology, triangleArea) {
    var absolute = transformAbsolute(topology.transform),
        relative = transformRelative(topology.transform),
        heap = minAreaHeap();

    if (!triangleArea) triangleArea = cartesianTriangleArea;

    topology.arcs.forEach(function(arc) {
      var triangles = [],
          maxArea = 0,
          triangle;

      // To store each point’s effective area, we create a new array rather than
      // extending the passed-in point to workaround a Chrome/V8 bug (getting
      // stuck in smi mode). For midpoints, the initial effective area of
      // Infinity will be computed in the next step.
      for (var i = 0, n = arc.length, p; i < n; ++i) {
        p = arc[i];
        absolute(arc[i] = [p[0], p[1], Infinity], i);
      }

      for (var i = 1, n = arc.length - 1; i < n; ++i) {
        triangle = arc.slice(i - 1, i + 2);
        triangle[1][2] = triangleArea(triangle);
        triangles.push(triangle);
        heap.push(triangle);
      }

      for (var i = 0, n = triangles.length; i < n; ++i) {
        triangle = triangles[i];
        triangle.previous = triangles[i - 1];
        triangle.next = triangles[i + 1];
      }

      while (triangle = heap.pop()) {
        var previous = triangle.previous,
            next = triangle.next;

        // If the area of the current point is less than that of the previous point
        // to be eliminated, use the latter's area instead. This ensures that the
        // current point cannot be eliminated without eliminating previously-
        // eliminated points.
        if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
        else maxArea = triangle[1][2];

        if (previous) {
          previous.next = next;
          previous[2] = triangle[2];
          update(previous);
        }

        if (next) {
          next.previous = previous;
          next[0] = triangle[0];
          update(next);
        }
      }

      arc.forEach(relative);
    });

    function update(triangle) {
      heap.remove(triangle);
      triangle[1][2] = triangleArea(triangle);
      heap.push(triangle);
    }

    return topology;
  };

  function cartesianRingArea(ring) {
    var i = -1,
        n = ring.length,
        a,
        b = ring[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = ring[i];
      area += a[0] * b[1] - a[1] * b[0];
    }

    return area * .5;
  }

  function cartesianTriangleArea(triangle) {
    var a = triangle[0], b = triangle[1], c = triangle[2];
    return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
  }

  function compareArea(a, b) {
    return a[1][2] - b[1][2];
  }

  function minAreaHeap() {
    var heap = {},
        array = [],
        size = 0;

    heap.push = function(object) {
      up(array[object._ = size] = object, size++);
      return size;
    };

    heap.pop = function() {
      if (size <= 0) return;
      var removed = array[0], object;
      if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
      return removed;
    };

    heap.remove = function(removed) {
      var i = removed._, object;
      if (array[i] !== removed) return; // invalid request
      if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
      return i;
    };

    function up(object, i) {
      while (i > 0) {
        var j = ((i + 1) >> 1) - 1,
            parent = array[j];
        if (compareArea(object, parent) >= 0) break;
        array[parent._ = i] = parent;
        array[object._ = i = j] = object;
      }
    }

    function down(object, i) {
      while (true) {
        var r = (i + 1) << 1,
            l = r - 1,
            j = i,
            child = array[j];
        if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
        if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
        if (j === i) break;
        array[child._ = i] = child;
        array[object._ = i = j] = object;
      }
    }

    return heap;
  }

  function transformAbsolute(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      point[0] = (x0 += point[0]) * kx + dx;
      point[1] = (y0 += point[1]) * ky + dy;
    };
  }

  function transformRelative(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      var x1 = (point[0] - dx) / kx | 0,
          y1 = (point[1] - dy) / ky | 0;
      point[0] = x1 - x0;
      point[1] = y1 - y0;
      x0 = x1;
      y0 = y1;
    };
  }

  function noop() {}

  if (typeof define === "function" && define.amd) define(topojson);
  else if (typeof module === "object" && module.exports) module.exports = topojson;
  else this.topojson = topojson;
}();

},{}],8:[function(require,module,exports){
var util = require('../util'),
    Measures = require('./measures'),
    Collector = require('./collector');

function Aggregator() {
  this._cells = {};
  this._aggr = [];
  this._stream = false;
}

var Flags = Aggregator.Flags = {
  ADD_CELL: 1,
  MOD_CELL: 2
};

var proto = Aggregator.prototype;

// Parameters

proto.stream = function(v) {
  if (v == null) return this._stream;
  this._stream = !!v;
  this._aggr = [];
  return this;
};

// key accessor to use for streaming removes
proto.key = function(key) {
  if (key == null) return this._key;
  this._key = util.$(key);
  return this;
};

// Input: array of objects of the form
// {name: string, get: function}
proto.groupby = function(dims) {
  this._dims = util.array(dims).map(function(d, i) {
    d = util.isString(d) ? {name: d, get: util.$(d)}
      : util.isFunction(d) ? {name: util.name(d) || d.name || ('_' + i), get: d}
      : (d.name && util.isFunction(d.get)) ? d : null;
    if (d == null) throw 'Invalid groupby argument: ' + d;
    return d;
  });
  return this.clear();
};

// Input: array of objects of the form
// {name: string, ops: [string, ...]}
proto.summarize = function(fields) {
  fields = summarize_args(fields);
  this._count = true;
  var aggr = (this._aggr = []),
      m, f, i, j, op, as, get;

  for (i=0; i<fields.length; ++i) {
    for (j=0, m=[], f=fields[i]; j<f.ops.length; ++j) {
      op = f.ops[j];
      if (op !== 'count') this._count = false;
      as = (f.as && f.as[j]) || (op + (f.name==='*' ? '' : '_'+f.name));
      m.push(Measures[op](as));
    }
    get = f.get && util.$(f.get) ||
      (f.name === '*' ? util.identity : util.$(f.name));
    aggr.push({
      name: f.name,
      measures: Measures.create(
        m,
        this._stream, // streaming remove flag
        get,          // input tuple getter
        this._assign) // output tuple setter
    });
  }
  return this.clear();
};

// Convenience method to summarize by count
proto.count = function() {
  return this.summarize({'*':'count'});
};

// Override to perform custom tuple value assignment
proto._assign = function(object, name, value) {
  object[name] = value;
};

function summarize_args(fields) {
  if (util.isArray(fields)) { return fields; }
  if (fields == null) { return []; }
  var a = [], name, ops;
  for (name in fields) {
    ops = util.array(fields[name]);
    a.push({name: name, ops: ops});
  }
  return a;
}

// Cell Management

proto.clear = function() {
  return (this._cells = {}, this);
};

proto._cellkey = function(x) {
  var d = this._dims,
      n = d.length, i,
      k = String(d[0].get(x));
  for (i=1; i<n; ++i) {
    k += '|' + d[i].get(x);
  }
  return k;
};

proto._cell = function(x) {
  var key = this._dims.length ? this._cellkey(x) : '';
  return this._cells[key] || (this._cells[key] = this._newcell(x, key));
};

proto._newcell = function(x, key) {
  var cell = {
    num:   0,
    tuple: this._newtuple(x, key),
    flag:  Flags.ADD_CELL,
    aggs:  {}
  };

  var aggr = this._aggr, i;
  for (i=0; i<aggr.length; ++i) {
    cell.aggs[aggr[i].name] = new aggr[i].measures(cell, cell.tuple);
  }
  if (cell.collect) {
    cell.data = new Collector(this._key);
  }
  return cell;
};

proto._newtuple = function(x) {
  var dims = this._dims,
      t = {}, i, n;
  for (i=0, n=dims.length; i<n; ++i) {
    t[dims[i].name] = dims[i].get(x);
  }
  return this._ingest(t);
};

// Override to perform custom tuple ingestion
proto._ingest = util.identity;

// Process Tuples

proto._add = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num += 1;
  if (!this._count) { // skip if count-only
    if (cell.collect) cell.data.add(x);
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].add(x);
    }
  }
  cell.flag |= Flags.MOD_CELL;
  if (this._on_add) this._on_add(x, cell);
};

proto._rem = function(x) {
  var cell = this._cell(x),
      aggr = this._aggr, i;

  cell.num -= 1;
  if (!this._count) { // skip if count-only
    if (cell.collect) cell.data.rem(x);
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].rem(x);
    }
  }
  cell.flag |= Flags.MOD_CELL;
  if (this._on_rem) this._on_rem(x, cell);
};

proto._mod = function(curr, prev) {
  var cell0 = this._cell(prev),
      cell1 = this._cell(curr),
      aggr = this._aggr, i;

  if (cell0 !== cell1) {
    cell0.num -= 1;
    cell1.num += 1;
    if (cell0.collect) cell0.data.rem(prev);
    if (cell1.collect) cell1.data.add(curr);
  } else if (cell0.collect && !util.isObject(curr)) {
    cell0.data.rem(prev);
    cell0.data.add(curr);
  }

  for (i=0; i<aggr.length; ++i) {
    cell0.aggs[aggr[i].name].rem(prev);
    cell1.aggs[aggr[i].name].add(curr);
  }
  cell0.flag |= Flags.MOD_CELL;
  cell1.flag |= Flags.MOD_CELL;
  if (this._on_mod) this._on_mod(curr, prev, cell0, cell1);
};

proto._markMod = function(x) {
  var cell0 = this._cell(x);
  cell0.flag |= Flags.MOD_CELL;
};

proto.result = function() {
  var result = [],
      aggr = this._aggr,
      cell, i, k;

  for (k in this._cells) {
    cell = this._cells[k];
    if (cell.num > 0) {
      // consolidate collector values
      if (cell.collect) {
        cell.data.values();
      }
      // update tuple properties
      for (i=0; i<aggr.length; ++i) {
        cell.aggs[aggr[i].name].set();
      }
      // add output tuple
      result.push(cell.tuple);
    } else {
      delete this._cells[k];
    }
    cell.flag = 0;
  }

  this._rems = false;
  return result;
};

proto.changes = function(output) {
  var changes = output || {add:[], rem:[], mod:[]},
      aggr = this._aggr,
      cell, flag, i, k;

  for (k in this._cells) {
    cell = this._cells[k];
    flag = cell.flag;

    // consolidate collector values
    if (cell.collect) {
      cell.data.values();
    }

    // update tuple properties
    for (i=0; i<aggr.length; ++i) {
      cell.aggs[aggr[i].name].set();
    }

    // organize output tuples
    if (cell.num <= 0) {
      changes.rem.push(cell.tuple); // if (flag === Flags.MOD_CELL) { ??
      delete this._cells[k];
      if (this._on_drop) this._on_drop(cell);
    } else {
      if (this._on_keep) this._on_keep(cell);
      if (flag & Flags.ADD_CELL) {
        changes.add.push(cell.tuple);
      } else if (flag & Flags.MOD_CELL) {
        changes.mod.push(cell.tuple);
      }
    }

    cell.flag = 0;
  }

  this._rems = false;
  return changes;
};

proto.execute = function(input) {
  return this.clear().insert(input).result();
};

proto.insert = function(input) {
  this._consolidate();
  for (var i=0; i<input.length; ++i) {
    this._add(input[i]);
  }
  return this;
};

proto.remove = function(input) {
  if (!this._stream) {
    throw 'Aggregator not configured for streaming removes.' +
      ' Call stream(true) prior to calling summarize.';
  }
  for (var i=0; i<input.length; ++i) {
    this._rem(input[i]);
  }
  this._rems = true;
  return this;
};

// consolidate removals
proto._consolidate = function() {
  if (!this._rems) return;
  for (var k in this._cells) {
    if (this._cells[k].collect) {
      this._cells[k].data.values();
    }
  }
  this._rems = false;
};

module.exports = Aggregator;

},{"../util":30,"./collector":9,"./measures":11}],9:[function(require,module,exports){
var util = require('../util');
var stats = require('../stats');

var REM = '__dl_rem__';

function Collector(key) {
  this._add = [];
  this._rem = [];
  this._key = key || null;
  this._last = null;
}

var proto = Collector.prototype;

proto.add = function(v) {
  this._add.push(v);
};

proto.rem = function(v) {
  this._rem.push(v);
};

proto.values = function() {
  this._get = null;
  if (this._rem.length === 0) return this._add;

  var a = this._add,
      r = this._rem,
      k = this._key,
      x = Array(a.length - r.length),
      i, j, n, m;

  if (!util.isObject(r[0])) {
    // processing raw values
    m = stats.count.map(r);
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (m[a[i]] > 0) {
        m[a[i]] -= 1;
      } else {
        x[j++] = a[i];
      }
    }
  } else if (k) {
    // has unique key field, so use that
    m = util.toMap(r, k);
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (!m.hasOwnProperty(k(a[i]))) { x[j++] = a[i]; }
    }
  } else {
    // no unique key, mark tuples directly
    for (i=0, n=r.length; i<n; ++i) {
      r[i][REM] = 1;
    }
    for (i=0, j=0, n=a.length; i<n; ++i) {
      if (!a[i][REM]) { x[j++] = a[i]; }
    }
    for (i=0, n=r.length; i<n; ++i) {
      delete r[i][REM];
    }
  }

  this._rem = [];
  return (this._add = x);
};

// memoizing statistics methods

proto.extent = function(get) {
  if (this._get !== get || !this._ext) {
    var v = this.values(),
        i = stats.extent.index(v, get);
    this._ext = [v[i[0]], v[i[1]]];
    this._get = get;
  }
  return this._ext;
};

proto.argmin = function(get) {
  return this.extent(get)[0];
};

proto.argmax = function(get) {
  return this.extent(get)[1];
};

proto.min = function(get) {
  var m = this.extent(get)[0];
  return m ? get(m) : +Infinity;
};

proto.max = function(get) {
  var m = this.extent(get)[1];
  return m ? get(m) : -Infinity;
};

proto.quartile = function(get) {
  if (this._get !== get || !this._q) {
    this._q = stats.quartile(this.values(), get);
    this._get = get;
  }
  return this._q;
};

proto.q1 = function(get) {
  return this.quartile(get)[0];
};

proto.q2 = function(get) {
  return this.quartile(get)[1];
};

proto.q3 = function(get) {
  return this.quartile(get)[2];
};

module.exports = Collector;

},{"../stats":27,"../util":30}],10:[function(require,module,exports){
var util = require('../util');
var Aggregator = require('./aggregator');

module.exports = function() {
  // flatten arguments into a single array
  var args = [].reduce.call(arguments, function(a, x) {
    return a.concat(util.array(x));
  }, []);
  // create and return an aggregator
  return new Aggregator()
    .groupby(args)
    .summarize({'*':'values'});
};

},{"../util":30,"./aggregator":8}],11:[function(require,module,exports){
var util = require('../util');

var types = {
  'values': measure({
    name: 'values',
    init: 'cell.collect = true;',
    set:  'cell.data.values()', idx: -1
  }),
  'count': measure({
    name: 'count',
    set:  'cell.num'
  }),
  'missing': measure({
    name: 'missing',
    set:  'this.missing'
  }),
  'valid': measure({
    name: 'valid',
    set:  'this.valid'
  }),
  'sum': measure({
    name: 'sum',
    init: 'this.sum = 0;',
    add:  'this.sum += v;',
    rem:  'this.sum -= v;',
    set:  'this.sum'
  }),
  'mean': measure({
    name: 'mean',
    init: 'this.mean = 0;',
    add:  'var d = v - this.mean; this.mean += d / this.valid;',
    rem:  'var d = v - this.mean; this.mean -= this.valid ? d / this.valid : this.mean;',
    set:  'this.mean'
  }),
  'average': measure({
    name: 'average',
    set:  'this.mean',
    req:  ['mean'], idx: 1
  }),
  'variance': measure({
    name: 'variance',
    init: 'this.dev = 0;',
    add:  'this.dev += d * (v - this.mean);',
    rem:  'this.dev -= d * (v - this.mean);',
    set:  'this.valid > 1 ? this.dev / (this.valid-1) : 0',
    req:  ['mean'], idx: 1
  }),
  'variancep': measure({
    name: 'variancep',
    set:  'this.valid > 1 ? this.dev / this.valid : 0',
    req:  ['variance'], idx: 2
  }),
  'stdev': measure({
    name: 'stdev',
    set:  'this.valid > 1 ? Math.sqrt(this.dev / (this.valid-1)) : 0',
    req:  ['variance'], idx: 2
  }),
  'stdevp': measure({
    name: 'stdevp',
    set:  'this.valid > 1 ? Math.sqrt(this.dev / this.valid) : 0',
    req:  ['variance'], idx: 2
  }),
  'median': measure({
    name: 'median',
    set:  'cell.data.q2(this.get)',
    req:  ['values'], idx: 3
  }),
  'q1': measure({
    name: 'q1',
    set:  'cell.data.q1(this.get)',
    req:  ['values'], idx: 3
  }),
  'q3': measure({
    name: 'q3',
    set:  'cell.data.q3(this.get)',
    req:  ['values'], idx: 3
  }),
  'distinct': measure({
    name: 'distinct',
    set:  'this.distinct(cell.data.values(), this.get)',
    req:  ['values'], idx: 3
  }),
  'argmin': measure({
    name: 'argmin',
    add:  'if (v < this.min) this.argmin = t;',
    rem:  'if (v <= this.min) this.argmin = null;',
    set:  'this.argmin = this.argmin || cell.data.argmin(this.get)',
    req:  ['min'], str: ['values'], idx: 3
  }),
  'argmax': measure({
    name: 'argmax',
    add:  'if (v > this.max) this.argmax = t;',
    rem:  'if (v >= this.max) this.argmax = null;',
    set:  'this.argmax = this.argmax || cell.data.argmax(this.get)',
    req:  ['max'], str: ['values'], idx: 3
  }),
  'min': measure({
    name: 'min',
    init: 'this.min = +Infinity;',
    add:  'if (v < this.min) this.min = v;',
    rem:  'if (v <= this.min) this.min = NaN;',
    set:  'this.min = (isNaN(this.min) ? cell.data.min(this.get) : this.min)',
    str:  ['values'], idx: 4
  }),
  'max': measure({
    name: 'max',
    init: 'this.max = -Infinity;',
    add:  'if (v > this.max) this.max = v;',
    rem:  'if (v >= this.max) this.max = NaN;',
    set:  'this.max = (isNaN(this.max) ? cell.data.max(this.get) : this.max)',
    str:  ['values'], idx: 4
  }),
  'modeskew': measure({
    name: 'modeskew',
    set:  'this.dev===0 ? 0 : (this.mean - cell.data.q2(this.get)) / Math.sqrt(this.dev/(this.valid-1))',
    req:  ['mean', 'stdev', 'median'], idx: 5
  })
};

function measure(base) {
  return function(out) {
    var m = util.extend({init:'', add:'', rem:'', idx:0}, base);
    m.out = out || base.name;
    return m;
  };
}

function resolve(agg, stream) {
  function collect(m, a) {
    function helper(r) { if (!m[r]) collect(m, m[r] = types[r]()); }
    if (a.req) a.req.forEach(helper);
    if (stream && a.str) a.str.forEach(helper);
    return m;
  }
  var map = agg.reduce(
    collect,
    agg.reduce(function(m, a) { return (m[a.name] = a, m); }, {})
  );
  return util.vals(map).sort(function(a, b) { return a.idx - b.idx; });
}

function create(agg, stream, accessor, mutator) {
  var all = resolve(agg, stream),
      ctr = 'this.cell = cell; this.tuple = t; this.valid = 0; this.missing = 0;',
      add = 'if (v==null) this.missing++; if (!this.isValid(v)) return; ++this.valid;',
      rem = 'if (v==null) this.missing--; if (!this.isValid(v)) return; --this.valid;',
      set = 'var t = this.tuple; var cell = this.cell;';

  all.forEach(function(a) {
    if (a.idx < 0) {
      ctr = a.init + ctr;
      add = a.add + add;
      rem = a.rem + rem;
    } else {
      ctr += a.init;
      add += a.add;
      rem += a.rem;
    }
  });
  agg.slice()
    .sort(function(a, b) { return a.idx - b.idx; })
    .forEach(function(a) {
      set += 'this.assign(t,\''+a.out+'\','+a.set+');';
    });
  set += 'return t;';

  /* jshint evil: true */
  ctr = Function('cell', 't', ctr);
  ctr.prototype.assign = mutator;
  ctr.prototype.add = Function('t', 'var v = this.get(t);' + add);
  ctr.prototype.rem = Function('t', 'var v = this.get(t);' + rem);
  ctr.prototype.set = Function(set);
  ctr.prototype.get = accessor;
  ctr.prototype.distinct = require('../stats').count.distinct;
  ctr.prototype.isValid = util.isValid;
  ctr.fields = agg.map(util.$('out'));
  return ctr;
}

types.create = create;
module.exports = types;

},{"../stats":27,"../util":30}],12:[function(require,module,exports){
var util = require('../util'),
    time = require('../time'),
    EPSILON = 1e-15;

function bins(opt) {
  if (!opt) { throw Error("Missing binning options."); }

  // determine range
  var maxb = opt.maxbins || 15,
      base = opt.base || 10,
      logb = Math.log(base),
      div = opt.div || [5, 2],
      min = opt.min,
      max = opt.max,
      span = max - min,
      step, level, minstep, precision, v, i, eps;

  if (opt.step) {
    // if step size is explicitly given, use that
    step = opt.step;
  } else if (opt.steps) {
    // if provided, limit choice to acceptable step sizes
    step = opt.steps[Math.min(
      opt.steps.length - 1,
      bisect(opt.steps, span/maxb, 0, opt.steps.length)
    )];
  } else {
    // else use span to determine step size
    level = Math.ceil(Math.log(maxb) / logb);
    minstep = opt.minstep || 0;
    step = Math.max(
      minstep,
      Math.pow(base, Math.round(Math.log(span) / logb) - level)
    );

    // increase step size if too many bins
    do { step *= base; } while (Math.ceil(span/step) > maxb);

    // decrease step size if allowed
    for (i=0; i<div.length; ++i) {
      v = step / div[i];
      if (v >= minstep && span / v <= maxb) step = v;
    }
  }

  // update precision, min and max
  v = Math.log(step);
  precision = v >= 0 ? 0 : ~~(-v / logb) + 1;
  eps = Math.pow(base, -precision - 1);
  min = Math.min(min, Math.floor(min / step + eps) * step);
  max = Math.ceil(max / step) * step;

  return {
    start: min,
    stop:  max,
    step:  step,
    unit:  {precision: precision},
    value: value,
    index: index
  };
}

function bisect(a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (util.cmp(a[mid], x) < 0) { lo = mid + 1; }
    else { hi = mid; }
  }
  return lo;
}

function value(v) {
  return this.step * Math.floor(v / this.step + EPSILON);
}

function index(v) {
  return Math.floor((v - this.start) / this.step + EPSILON);
}

function date_value(v) {
  return this.unit.date(value.call(this, v));
}

function date_index(v) {
  return index.call(this, this.unit.unit(v));
}

bins.date = function(opt) {
  if (!opt) { throw Error("Missing date binning options."); }

  // find time step, then bin
  var units = opt.utc ? time.utc : time,
      dmin = opt.min,
      dmax = opt.max,
      maxb = opt.maxbins || 20,
      minb = opt.minbins || 4,
      span = (+dmax) - (+dmin),
      unit = opt.unit ? units[opt.unit] : units.find(span, minb, maxb),
      spec = bins({
        min:     unit.min != null ? unit.min : unit.unit(dmin),
        max:     unit.max != null ? unit.max : unit.unit(dmax),
        maxbins: maxb,
        minstep: unit.minstep,
        steps:   unit.step
      });

  spec.unit = unit;
  spec.index = date_index;
  if (!opt.raw) spec.value = date_value;
  return spec;
};

module.exports = bins;

},{"../time":29,"../util":30}],13:[function(require,module,exports){
var bins = require('./bins'),
    gen  = require('../generate'),
    type = require('../import/type'),
    util = require('../util'),
    stats = require('../stats');

var qtype = {
  'integer': 1,
  'number': 1,
  'date': 1
};

function $bin(values, f, opt) {
  opt = options(values, f, opt);
  var b = spec(opt);
  return !b ? (opt.accessor || util.identity) :
    util.$func('bin', b.unit.unit ?
      function(x) { return b.value(b.unit.unit(x)); } :
      function(x) { return b.value(x); }
    )(opt.accessor);
}

function histogram(values, f, opt) {
  opt = options(values, f, opt);
  var b = spec(opt);
  return b ?
    numerical(values, opt.accessor, b) :
    categorical(values, opt.accessor, opt && opt.sort);
}

function spec(opt) {
  var t = opt.type, b = null;
  if (t == null || qtype[t]) {
    if (t === 'integer' && opt.minstep == null) opt.minstep = 1;
    b = (t === 'date') ? bins.date(opt) : bins(opt);
  }
  return b;
}

function options() {
  var a = arguments,
      i = 0,
      values = util.isArray(a[i]) ? a[i++] : null,
      f = util.isFunction(a[i]) || util.isString(a[i]) ? util.$(a[i++]) : null,
      opt = util.extend({}, a[i]);

  if (values) {
    opt.type = opt.type || type(values, f);
    if (qtype[opt.type]) {
      var ext = stats.extent(values, f);
      opt = util.extend({min: ext[0], max: ext[1]}, opt);
    }
  }
  if (f) { opt.accessor = f; }
  return opt;
}

function numerical(values, f, b) {
  var h = gen.range(b.start, b.stop + b.step/2, b.step)
    .map(function(v) { return {value: b.value(v), count: 0}; });

  for (var i=0, v, j; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      j = b.index(v);
      if (j < 0 || j >= h.length || !isFinite(j)) continue;
      h[j].count += 1;
    }
  }
  h.bins = b;
  return h;
}

function categorical(values, f, sort) {
  var u = stats.unique(values, f),
      c = stats.count.map(values, f);
  return u.map(function(k) { return {value: k, count: c[k]}; })
    .sort(util.comparator(sort ? '-count' : '+value'));
}

module.exports = {
  $bin: $bin,
  histogram: histogram
};

},{"../generate":16,"../import/type":25,"../stats":27,"../util":30,"./bins":12}],14:[function(require,module,exports){
var util = require('./util'),
    type = require('./import/type'),
    stats = require('./stats'),
    template = require('./template');

module.exports = {
  table:   formatTable,  // format a data table
  summary: formatSummary // format a data table summary
};

var FMT = {
  'date':    '|time:"%m/%d/%Y %H:%M:%S"',
  'number':  '|number:".4f"',
  'integer': '|number:"d"'
};

var POS = {
  'number':  'left',
  'integer': 'left'
};

function formatTable(data, opt) {
  opt = util.extend({separator:' ', minwidth: 8, maxwidth: 15}, opt);
  var fields = opt.fields || util.keys(data[0]),
      types = type.all(data);

  if (opt.start || opt.limit) {
    var a = opt.start || 0,
        b = opt.limit ? a + opt.limit : data.length;
    data = data.slice(a, b);
  }

  // determine char width of fields
  var lens = fields.map(function(name) {
    var format = FMT[types[name]] || '',
        t = template('{{' + name + format + '}}'),
        l = stats.max(data, function(x) { return t(x).length; });
    l = Math.max(Math.min(name.length, opt.minwidth), l);
    return opt.maxwidth > 0 ? Math.min(l, opt.maxwidth) : l;
  });

  // print header row
  var head = fields.map(function(name, i) {
    return util.truncate(util.pad(name, lens[i], 'center'), lens[i]);
  }).join(opt.separator);

  // build template function for each row
  var tmpl = template(fields.map(function(name, i) {
    return '{{' +
      name +
      (FMT[types[name]] || '') +
      ('|pad:' + lens[i] + ',' + (POS[types[name]] || 'right')) +
      ('|truncate:' + lens[i]) +
    '}}';
  }).join(opt.separator));

  // print table
  return head + "\n" + data.map(tmpl).join('\n');
}

function formatSummary(s) {
  s = s ? s.__summary__ ? s : stats.summary(s) : this;
  var str = [], i, n;
  for (i=0, n=s.length; i<n; ++i) {
    str.push('-- ' + s[i].field + ' --');
    if (s[i].type === 'string' || s[i].distinct < 10) {
      str.push(printCategoricalProfile(s[i]));
    } else {
      str.push(printQuantitativeProfile(s[i]));
    }
    str.push('');
  }
  return str.join('\n');
}

function printQuantitativeProfile(p) {
  return [
    'valid:    ' + p.valid,
    'missing:  ' + p.missing,
    'distinct: ' + p.distinct,
    'min:      ' + p.min,
    'max:      ' + p.max,
    'median:   ' + p.median,
    'mean:     ' + p.mean,
    'stdev:    ' + p.stdev,
    'modeskew: ' + p.modeskew
  ].join('\n');
}

function printCategoricalProfile(p) {
  var list = [
    'valid:    ' + p.valid,
    'missing:  ' + p.missing,
    'distinct: ' + p.distinct,
    'top values: '
  ];
  var u = p.unique;
  var top = util.keys(u)
    .sort(function(a,b) { return u[b] - u[a]; })
    .slice(0, 6)
    .map(function(v) { return ' \'' + v + '\' (' + u[v] + ')'; });
  return list.concat(top).join('\n');
}
},{"./import/type":25,"./stats":27,"./template":28,"./util":30}],15:[function(require,module,exports){
var util = require('./util'),
    d3_time = require('d3-time'),
    d3_timeF = require('d3-time-format'),
    d3_numberF = require('d3-format'),
    numberF = d3_numberF, // defaults to EN-US
    timeF = d3_timeF,     // defaults to EN-US
    tmpDate = new Date(2000, 0, 1),
    monthFull, monthAbbr, dayFull, dayAbbr;


module.exports = {
  // Update number formatter to use provided locale configuration.
  // For more see https://github.com/d3/d3-format
  numberLocale: numberLocale,
  number:       function(f) { return numberF.format(f); },
  numberPrefix: function(f, v) { return numberF.formatPrefix(f, v); },

  // Update time formatter to use provided locale configuration.
  // For more see https://github.com/d3/d3-time-format
  timeLocale:   timeLocale,
  time:         function(f) { return timeF.format(f); },
  utc:          function(f) { return timeF.utcFormat(f); },

  // Set number and time locale simultaneously.
  locale:       function(l) { numberLocale(l); timeLocale(l); },

  // automatic formatting functions
  auto: {
    number:   autoNumberFormat,
    linear:   linearNumberFormat,
    time:     function() { return timeAutoFormat(); },
    utc:      function() { return utcAutoFormat(); }
  },

  month: monthFormat, // format month name from integer code
  day:   dayFormat    // format week day name from integer code
};

// -- Locales ----

// transform 'en-US' style locale string to match d3-format v0.4+ convention
function localeRef(l) {
  return l.length > 4 && 'locale' + (
    l[0].toUpperCase() + l[1].toLowerCase() +
    l[3].toUpperCase() + l[4].toLowerCase()
  );
}

function numberLocale(l) {
  var f = util.isString(l) ? d3_numberF[localeRef(l)] : d3_numberF.locale(l);
  if (f == null) throw Error('Unrecognized locale: ' + l);
  numberF = f;
}

function timeLocale(l) {
  var f = util.isString(l) ? d3_timeF[localeRef(l)] : d3_timeF.locale(l);
  if (f == null) throw Error('Unrecognized locale: ' + l);
  timeF = f;
  monthFull = monthAbbr = dayFull = dayAbbr = null;
}

// -- Number Formatting ----

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function linearRange(domain, count) {
  if (!domain.length) domain = [0];
  if (count == null) count = 10;

  var start = domain[0],
      stop = domain[domain.length - 1];

  if (stop < start) { error = stop; stop = start; start = error; }

  var span = (stop - start) || (count = 1, start || stop || 1),
      step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10)),
      error = span / count / step;

  // Filter ticks to get closer to the desired count.
  if (error >= e10) step *= 10;
  else if (error >= e5) step *= 5;
  else if (error >= e2) step *= 2;

  // Round start and stop values to step interval.
  return [
    Math.ceil(start / step) * step,
    Math.floor(stop / step) * step + step / 2, // inclusive
    step
  ];
}

function trimZero(f, decimal) {
  return function(x) {
    var s = f(x),
        n = s.indexOf(decimal);
    if (n < 0) return s;

    var idx = rightmostDigit(s, n),
        end = idx < s.length ? s.slice(idx) : '';

    while (--idx > n) {
      if (s[idx] !== '0') { ++idx; break; }
    }
    return s.slice(0, idx) + end;
  };
}

function rightmostDigit(s, n) {
  var i = s.lastIndexOf('e'), c;
  if (i > 0) return i;
  for (i=s.length; --i > n;) {
    c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) return i+1; // is digit
  }
}

function autoNumberFormat(f) {
  var decimal = numberF.format('.1f')(1)[1]; // get decimal char
  if (f == null) f = ',';
  f = d3_numberF.formatSpecifier(f);
  if (f.precision == null) f.precision = 12;
  switch (f.type) {
    case '%': f.precision -= 2; break;
    case 'e': f.precision -= 1; break;
  }
  return trimZero(numberF.format(f), decimal);
}

function linearNumberFormat(domain, count, f) {
  var range = linearRange(domain, count);

  if (f == null) f = ',f';

  switch (f = d3_numberF.formatSpecifier(f), f.type) {
    case 's': {
      var value = Math.max(Math.abs(range[0]), Math.abs(range[1]));
      if (f.precision == null) f.precision = d3_numberF.precisionPrefix(range[2], value);
      return numberF.formatPrefix(f, value);
    }
    case '':
    case 'e':
    case 'g':
    case 'p':
    case 'r': {
      if (f.precision == null) f.precision = d3_numberF.precisionRound(range[2], Math.max(Math.abs(range[0]), Math.abs(range[1]))) - (f.type === 'e');
      break;
    }
    case 'f':
    case '%': {
      if (f.precision == null) f.precision = d3_numberF.precisionFixed(range[2]) - 2 * (f.type === '%');
      break;
    }
  }
  return numberF.format(f);
}

// -- Datetime Formatting ----

function timeAutoFormat() {
  var f = timeF.format,
      formatMillisecond = f('.%L'),
      formatSecond = f(':%S'),
      formatMinute = f('%I:%M'),
      formatHour = f('%I %p'),
      formatDay = f('%a %d'),
      formatWeek = f('%b %d'),
      formatMonth = f('%B'),
      formatYear = f('%Y');

  return function(date) {
    var d = +date;
    return (d3_time.second(date) < d ? formatMillisecond
        : d3_time.minute(date) < d ? formatSecond
        : d3_time.hour(date) < d ? formatMinute
        : d3_time.day(date) < d ? formatHour
        : d3_time.month(date) < d ?
          (d3_time.week(date) < d ? formatDay : formatWeek)
        : d3_time.year(date) < d ? formatMonth
        : formatYear)(date);
  };
}

function utcAutoFormat() {
  var f = timeF.utcFormat,
      formatMillisecond = f('.%L'),
      formatSecond = f(':%S'),
      formatMinute = f('%I:%M'),
      formatHour = f('%I %p'),
      formatDay = f('%a %d'),
      formatWeek = f('%b %d'),
      formatMonth = f('%B'),
      formatYear = f('%Y');

  return function(date) {
    var d = +date;
    return (d3_time.utcSecond(date) < d ? formatMillisecond
        : d3_time.utcMinute(date) < d ? formatSecond
        : d3_time.utcHour(date) < d ? formatMinute
        : d3_time.utcDay(date) < d ? formatHour
        : d3_time.utcMonth(date) < d ?
          (d3_time.utcWeek(date) < d ? formatDay : formatWeek)
        : d3_time.utcYear(date) < d ? formatMonth
        : formatYear)(date);
  };
}

function monthFormat(month, abbreviate) {
  var f = abbreviate ?
    (monthAbbr || (monthAbbr = timeF.format('%b'))) :
    (monthFull || (monthFull = timeF.format('%B')));
  return (tmpDate.setMonth(month), f(tmpDate));
}

function dayFormat(day, abbreviate) {
  var f = abbreviate ?
    (dayAbbr || (dayAbbr = timeF.format('%a'))) :
    (dayFull || (dayFull = timeF.format('%A')));
  return (tmpDate.setMonth(0), tmpDate.setDate(2 + day), f(tmpDate));
}
},{"./util":30,"d3-format":3,"d3-time":6,"d3-time-format":4}],16:[function(require,module,exports){
var gen = module.exports = {};

gen.repeat = function(val, n) {
  var a = Array(n), i;
  for (i=0; i<n; ++i) a[i] = val;
  return a;
};

gen.zeros = function(n) {
  return gen.repeat(0, n);
};

gen.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error('Infinite range');
  var range = [], i = -1, j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};

gen.random = {};

gen.random.uniform = function(min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }
  var d = max - min;
  var f = function() {
    return min + d * Math.random();
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x >= min && x <= max) ? 1/d : 0;
  };
  f.cdf = function(x) {
    return x < min ? 0 : x > max ? 1 : (x - min) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? min + p*d : NaN;
  };
  return f;
};

gen.random.integer = function(a, b) {
  if (b === undefined) {
    b = a;
    a = 0;
  }
  var d = b - a;
  var f = function() {
    return a + Math.floor(d * Math.random());
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x === Math.floor(x) && x >= a && x < b) ? 1/d : 0;
  };
  f.cdf = function(x) {
    var v = Math.floor(x);
    return v < a ? 0 : v >= b ? 1 : (v - a + 1) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? a - 1 + Math.floor(p*d) : NaN;
  };
  return f;
};

gen.random.normal = function(mean, stdev) {
  mean = mean || 0;
  stdev = stdev || 1;
  var next;
  var f = function() {
    var x = 0, y = 0, rds, c;
    if (next !== undefined) {
      x = next;
      next = undefined;
      return x;
    }
    do {
      x = Math.random()*2-1;
      y = Math.random()*2-1;
      rds = x*x + y*y;
    } while (rds === 0 || rds > 1);
    c = Math.sqrt(-2*Math.log(rds)/rds); // Box-Muller transform
    next = mean + y*c*stdev;
    return mean + x*c*stdev;
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    var exp = Math.exp(Math.pow(x-mean, 2) / (-2 * Math.pow(stdev, 2)));
    return (1 / (stdev * Math.sqrt(2*Math.PI))) * exp;
  };
  f.cdf = function(x) {
    // Approximation from West (2009)
    // Better Approximations to Cumulative Normal Functions
    var cd,
        z = (x - mean) / stdev,
        Z = Math.abs(z);
    if (Z > 37) {
      cd = 0;
    } else {
      var sum, exp = Math.exp(-Z*Z/2);
      if (Z < 7.07106781186547) {
        sum = 3.52624965998911e-02 * Z + 0.700383064443688;
        sum = sum * Z + 6.37396220353165;
        sum = sum * Z + 33.912866078383;
        sum = sum * Z + 112.079291497871;
        sum = sum * Z + 221.213596169931;
        sum = sum * Z + 220.206867912376;
        cd = exp * sum;
        sum = 8.83883476483184e-02 * Z + 1.75566716318264;
        sum = sum * Z + 16.064177579207;
        sum = sum * Z + 86.7807322029461;
        sum = sum * Z + 296.564248779674;
        sum = sum * Z + 637.333633378831;
        sum = sum * Z + 793.826512519948;
        sum = sum * Z + 440.413735824752;
        cd = cd / sum;
      } else {
        sum = Z + 0.65;
        sum = Z + 4 / sum;
        sum = Z + 3 / sum;
        sum = Z + 2 / sum;
        sum = Z + 1 / sum;
        cd = exp / sum / 2.506628274631;
      }
    }
    return z > 0 ? 1 - cd : cd;
  };
  f.icdf = function(p) {
    // Approximation of Probit function using inverse error function.
    if (p <= 0 || p >= 1) return NaN;
    var x = 2*p - 1,
        v = (8 * (Math.PI - 3)) / (3 * Math.PI * (4-Math.PI)),
        a = (2 / (Math.PI*v)) + (Math.log(1 - Math.pow(x,2)) / 2),
        b = Math.log(1 - (x*x)) / v,
        s = (x > 0 ? 1 : -1) * Math.sqrt(Math.sqrt((a*a) - b) - a);
    return mean + stdev * Math.SQRT2 * s;
  };
  return f;
};
},{}],17:[function(require,module,exports){
var util = require('../../util');
var d3_dsv = require('d3-dsv');

function dsv(data, format) {
  if (data) {
    var h = format.header;
    data = (h ? h.join(format.delimiter) + '\n' : '') + data;
  }
  return d3_dsv.dsv(format.delimiter).parse(data);
}

dsv.delimiter = function(delim) {
  var fmt = {delimiter: delim};
  return function(data, format) {
    return dsv(data, format ? util.extend(format, fmt) : fmt);
  };
};

module.exports = dsv;

},{"../../util":30,"d3-dsv":2}],18:[function(require,module,exports){
var dsv = require('./dsv');

module.exports = {
  json: require('./json'),
  topojson: require('./topojson'),
  treejson: require('./treejson'),
  dsv: dsv,
  csv: dsv.delimiter(','),
  tsv: dsv.delimiter('\t')
};

},{"./dsv":17,"./json":19,"./topojson":20,"./treejson":21}],19:[function(require,module,exports){
var util = require('../../util');

module.exports = function(data, format) {
  var d = util.isObject(data) && !util.isBuffer(data) ?
    data : JSON.parse(data);
  if (format && format.property) {
    d = util.accessor(format.property)(d);
  }
  return d;
};

},{"../../util":30}],20:[function(require,module,exports){
var json = require('./json');

var reader = function(data, format) {
  var topojson = reader.topojson;
  if (topojson == null) { throw Error('TopoJSON library not loaded.'); }

  var t = json(data, format), obj;

  if (format && format.feature) {
    if ((obj = t.objects[format.feature])) {
      return topojson.feature(t, obj).features;
    } else {
      throw Error('Invalid TopoJSON object: ' + format.feature);
    }
  } else if (format && format.mesh) {
    if ((obj = t.objects[format.mesh])) {
      return [topojson.mesh(t, t.objects[format.mesh])];
    } else {
      throw Error('Invalid TopoJSON object: ' + format.mesh);
    }
  } else {
    throw Error('Missing TopoJSON feature or mesh parameter.');
  }
};

reader.topojson = require('topojson');
module.exports = reader;

},{"./json":19,"topojson":7}],21:[function(require,module,exports){
var json = require('./json');

module.exports = function(tree, format) {
  return toTable(json(tree, format), format);
};

function toTable(root, fields) {
  var childrenField = fields && fields.children || 'children',
      parentField = fields && fields.parent || 'parent',
      table = [];

  function visit(node, parent) {
    node[parentField] = parent;
    table.push(node);
    var children = node[childrenField];
    if (children) {
      for (var i=0; i<children.length; ++i) {
        visit(children[i], node);
      }
    }
  }

  visit(root, null);
  return (table.root = root, table);
}

},{"./json":19}],22:[function(require,module,exports){
// Matches absolute URLs with optional protocol
//   https://...    file://...    //...
var protocol_re = /^([A-Za-z]+:)?\/\//;

// Special treatment in node.js for the file: protocol
var fileProtocol = 'file://';

// Validate and cleanup URL to ensure that it is allowed to be accessed
// Returns cleaned up URL, or false if access is not allowed
function sanitizeUrl(opt) {
  var url = opt.url;
  if (!url && opt.file) { return fileProtocol + opt.file; }

  // In case this is a relative url (has no host), prepend opt.baseURL
  if (opt.baseURL && !protocol_re.test(url)) {
    if (!startsWith(url, '/') && opt.baseURL[opt.baseURL.length-1] !== '/') {
      url = '/' + url; // Ensure that there is a slash between the baseURL (e.g. hostname) and url
    }
    url = opt.baseURL + url;
  }
  // relative protocol, starts with '//'
  if (!load.useXHR && startsWith(url, '//')) {
    url = (opt.defaultProtocol || 'http') + ':' + url;
  }
  // If opt.domainWhiteList is set, only allows url, whose hostname
  // * Is the same as the origin (window.location.hostname)
  // * Equals one of the values in the whitelist
  // * Is a proper subdomain of one of the values in the whitelist
  if (opt.domainWhiteList) {
    var domain, origin;
    if (load.useXHR) {
      var a = document.createElement('a');
      a.href = url;
      // From http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
      // IE doesn't populate all link properties when setting .href with a relative URL,
      // however .href will return an absolute URL which then can be used on itself
      // to populate these additional fields.
      if (a.host === '') {
        a.href = a.href;
      }
      domain = a.hostname.toLowerCase();
      origin = window.location.hostname;
    } else {
      // relative protocol is broken: https://github.com/defunctzombie/node-url/issues/5
      var parts = require('url').parse(url);
      domain = parts.hostname;
      origin = null;
    }

    if (origin !== domain) {
      var whiteListed = opt.domainWhiteList.some(function(d) {
        var idx = domain.length - d.length;
        return d === domain ||
          (idx > 1 && domain[idx-1] === '.' && domain.lastIndexOf(d) === idx);
      });
      if (!whiteListed) {
        throw 'URL is not whitelisted: ' + url;
      }
    }
  }
  return url;
}

function load(opt, callback) {
  var error = callback || function(e) { throw e; }, url;

  try {
    url = load.sanitizeUrl(opt); // enable override
  } catch (err) {
    error(err);
    return;
  }

  if (!url) {
    error('Invalid URL: ' + opt.url);
  } else if (load.useXHR) {
    // on client, use xhr
    return xhr(url, callback);
  } else if (startsWith(url, fileProtocol)) {
    // on server, if url starts with 'file://', strip it and load from file
    return file(url.slice(fileProtocol.length), callback);
  } else if (url.indexOf('://') < 0) { // TODO better protocol check?
    // on server, if no protocol assume file
    return file(url, callback);
  } else {
    // for regular URLs on server
    return http(url, callback);
  }
}

function xhrHasResponse(request) {
  var type = request.responseType;
  return type && type !== 'text' ?
    request.response : // null on error
    request.responseText; // '' on error
}

function xhr(url, callback) {
  var async = !!callback;
  var request = new XMLHttpRequest();
  // If IE does not support CORS, use XDomainRequest (copied from d3.xhr)
  if (this.XDomainRequest &&
      !('withCredentials' in request) &&
      /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();

  function respond() {
    var status = request.status;
    if (!status && xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
      callback(null, request.responseText);
    } else {
      callback(request, null);
    }
  }

  if (async) {
    if ('onload' in request) {
      request.onload = request.onerror = respond;
    } else {
      request.onreadystatechange = function() {
        if (request.readyState > 3) respond();
      };
    }
  }

  request.open('GET', url, async);
  request.send();

  if (!async && xhrHasResponse(request)) {
    return request.responseText;
  }
}

function file(filename, callback) {
  var fs = require('fs');
  if (!callback) {
    return fs.readFileSync(filename, 'utf8');
  }
  fs.readFile(filename, callback);
}

function http(url, callback) {
  if (!callback) {
    return require('sync-request')('GET', url).getBody();
  }

  var options = {url: url, encoding: null, gzip: true};
  require('request')(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      error = error ||
        'Load failed with response code ' + response.statusCode + '.';
      callback(error, null);
    }
  });
}

function startsWith(string, searchString) {
  return string == null ? false : string.lastIndexOf(searchString, 0) === 0;
}

load.sanitizeUrl = sanitizeUrl;

load.useXHR = (typeof XMLHttpRequest !== 'undefined');

module.exports = load;

},{"fs":1,"request":1,"sync-request":1,"url":1}],23:[function(require,module,exports){
var util = require('../util'),
  type = require('./type'),
  formats = require('./formats'),
  timeF = require('../format').time;

function read(data, format) {
  var type = (format && format.type) || 'json';
  data = formats[type](data, format);
  if (format && format.parse) parse(data, format.parse);
  return data;
}

function parse(data, types) {
  var cols, parsers, d, i, j, clen, len = data.length;

  types = (types==='auto') ? type.inferAll(data) : util.duplicate(types);
  cols = util.keys(types);
  parsers = cols.map(function(c) {
    var t = types[c];
    if (t && t.indexOf('date:') === 0) {
      var parts = t.split(':', 2),
          pattern = parts[1];
      if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
          (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
        pattern = pattern.slice(1, -1);
      } else {
        throw Error('Format pattern must be quoted: ' + pattern);
      }
      pattern = timeF(pattern);
      return function(v) { return pattern.parse(v); };
    }
    if (!type.parsers[t]) {
      throw Error('Illegal format pattern: ' + c + ':' + t);
    }
    return type.parsers[t];
  });

  for (i=0, clen=cols.length; i<len; ++i) {
    d = data[i];
    for (j=0; j<clen; ++j) {
      d[cols[j]] = parsers[j](d[cols[j]]);
    }
  }
  type.annotation(data, types);
}

read.formats = formats;
module.exports = read;

},{"../format":15,"../util":30,"./formats":18,"./type":25}],24:[function(require,module,exports){
var util = require('../util');
var load = require('./load');
var read = require('./read');

module.exports = util
  .keys(read.formats)
  .reduce(function(out, type) {
    out[type] = function(opt, format, callback) {
      // process arguments
      if (util.isString(opt)) { opt = {url: opt}; }
      if (arguments.length === 2 && util.isFunction(format)) {
        callback = format;
        format = undefined;
      }

      // set up read format
      format = util.extend({parse: 'auto'}, format);
      format.type = type;

      // load data
      var data = load(opt, callback ? function(error, data) {
        if (error) { callback(error, null); return; }
        try {
          // data loaded, now parse it (async)
          data = read(data, format);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      } : undefined);

      // data loaded, now parse it (sync)
      if (!callback) return read(data, format);
    };
    return out;
  }, {});

},{"../util":30,"./load":22,"./read":23}],25:[function(require,module,exports){
var util = require('../util');

var TYPES = '__types__';

var PARSERS = {
  boolean: util.boolean,
  integer: util.number,
  number:  util.number,
  date:    util.date,
  string:  function(x) { return x==='' ? null : x; }
};

var TESTS = {
  boolean: function(x) { return x==='true' || x==='false' || util.isBoolean(x); },
  integer: function(x) { return TESTS.number(x) && (x=+x) === ~~x; },
  number: function(x) { return !isNaN(+x) && !util.isDate(x); },
  date: function(x) { return !isNaN(Date.parse(x)); }
};

function annotation(data, types) {
  if (!types) return data && data[TYPES] || null;
  data[TYPES] = types;
}

function type(values, f) {
  values = util.array(values);
  f = util.$(f);
  var v, i, n;

  // if data array has type annotations, use them
  if (values[TYPES]) {
    v = f(values[TYPES]);
    if (util.isString(v)) return v;
  }

  for (i=0, n=values.length; !util.isValid(v) && i<n; ++i) {
    v = f ? f(values[i]) : values[i];
  }

  return util.isDate(v) ? 'date' :
    util.isNumber(v)    ? 'number' :
    util.isBoolean(v)   ? 'boolean' :
    util.isString(v)    ? 'string' : null;
}

function typeAll(data, fields) {
  if (!data.length) return;
  fields = fields || util.keys(data[0]);
  return fields.reduce(function(types, f) {
    return (types[f] = type(data, f), types);
  }, {});
}

function infer(values, f) {
  values = util.array(values);
  f = util.$(f);
  var i, j, v;

  // types to test for, in precedence order
  var types = ['boolean', 'integer', 'number', 'date'];

  for (i=0; i<values.length; ++i) {
    // get next value to test
    v = f ? f(values[i]) : values[i];
    // test value against remaining types
    for (j=0; j<types.length; ++j) {
      if (util.isValid(v) && !TESTS[types[j]](v)) {
        types.splice(j, 1);
        j -= 1;
      }
    }
    // if no types left, return 'string'
    if (types.length === 0) return 'string';
  }

  return types[0];
}

function inferAll(data, fields) {
  fields = fields || util.keys(data[0]);
  return fields.reduce(function(types, f) {
    types[f] = infer(data, f);
    return types;
  }, {});
}

type.annotation = annotation;
type.all = typeAll;
type.infer = infer;
type.inferAll = inferAll;
type.parsers = PARSERS;
module.exports = type;

},{"../util":30}],26:[function(require,module,exports){
var util = require('./util');

var dl = {
  version:    '1.5.2',
  load:       require('./import/load'),
  read:       require('./import/read'),
  type:       require('./import/type'),
  Aggregator: require('./aggregate/aggregator'),
  groupby:    require('./aggregate/groupby'),
  bins:       require('./bins/bins'),
  $bin:       require('./bins/histogram').$bin,
  histogram:  require('./bins/histogram').histogram,
  format:     require('./format'),
  template:   require('./template'),
  time:       require('./time')
};

util.extend(dl, util);
util.extend(dl, require('./generate'));
util.extend(dl, require('./stats'));
util.extend(dl, require('./import/readers'));
util.extend(dl.format, require('./format-tables'));

// backwards-compatible, deprecated API
// will remove in the future
dl.print = {
  table:   dl.format.table,
  summary: dl.format.summary
};

module.exports = dl;

},{"./aggregate/aggregator":8,"./aggregate/groupby":10,"./bins/bins":12,"./bins/histogram":13,"./format":15,"./format-tables":14,"./generate":16,"./import/load":22,"./import/read":23,"./import/readers":24,"./import/type":25,"./stats":27,"./template":28,"./time":29,"./util":30}],27:[function(require,module,exports){
var util = require('./util');
var type = require('./import/type');
var gen = require('./generate');

var stats = {};

// Collect unique values.
// Output: an array of unique values, in first-observed order
stats.unique = function(values, f, results) {
  f = util.$(f);
  results = results || [];
  var u = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    results.push(v);
  }
  return results;
};

// Return the length of the input array.
stats.count = function(values) {
  return values && values.length || 0;
};

// Count the number of non-null, non-undefined, non-NaN values.
stats.count.valid = function(values, f) {
  f = util.$(f);
  var v, i, n, valid = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) valid += 1;
  }
  return valid;
};

// Count the number of null or undefined values.
stats.count.missing = function(values, f) {
  f = util.$(f);
  var v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v == null) count += 1;
  }
  return count;
};

// Count the number of distinct values.
// Null, undefined and NaN are each considered distinct values.
stats.count.distinct = function(values, f) {
  f = util.$(f);
  var u = {}, v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    count += 1;
  }
  return count;
};

// Construct a map from distinct values to occurrence counts.
stats.count.map = function(values, f) {
  f = util.$(f);
  var map = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    map[v] = (v in map) ? map[v] + 1 : 1;
  }
  return map;
};

// Compute the median of an array of numbers.
stats.median = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  return stats.quantile(values, 0.5);
};

// Computes the quartile boundaries of an array of numbers.
stats.quartile = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  var q = stats.quantile;
  return [q(values, 0.25), q(values, 0.50), q(values, 0.75)];
};

// Compute the quantile of a sorted array of numbers.
// Adapted from the D3.js implementation.
stats.quantile = function(values, f, p) {
  if (p === undefined) { p = f; f = util.identity; }
  f = util.$(f);
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = +f(values[h - 1]),
      e = H - h;
  return e ? v + e * (f(values[h]) - v) : v;
};

// Compute the sum of an array of numbers.
stats.sum = function(values, f) {
  f = util.$(f);
  for (var sum=0, i=0, n=values.length, v; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) sum += v;
  }
  return sum;
};

// Compute the mean (average) of an array of numbers.
stats.mean = function(values, f) {
  f = util.$(f);
  var mean = 0, delta, i, n, c, v;
  for (i=0, c=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
    }
  }
  return mean;
};

// Compute the sample variance of an array of numbers.
stats.variance = function(values, f) {
  f = util.$(f);
  if (!util.isArray(values) || values.length < 2) return 0;
  var mean = 0, M2 = 0, delta, i, c, v;
  for (i=0, c=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
      M2 = M2 + delta * (v - mean);
    }
  }
  M2 = M2 / (c - 1);
  return M2;
};

// Compute the sample standard deviation of an array of numbers.
stats.stdev = function(values, f) {
  return Math.sqrt(stats.variance(values, f));
};

// Compute the Pearson mode skewness ((median-mean)/stdev) of an array of numbers.
stats.modeskew = function(values, f) {
  var avg = stats.mean(values, f),
      med = stats.median(values, f),
      std = stats.stdev(values, f);
  return std === 0 ? 0 : (avg - med) / std;
};

// Find the minimum value in an array.
stats.min = function(values, f) {
  return stats.extent(values, f)[0];
};

// Find the maximum value in an array.
stats.max = function(values, f) {
  return stats.extent(values, f)[1];
};

// Find the minimum and maximum of an array of values.
stats.extent = function(values, f) {
  f = util.$(f);
  var a, b, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) a = v;
      if (v > b) b = v;
    }
  }
  return [a, b];
};

// Find the integer indices of the minimum and maximum values.
stats.extent.index = function(values, f) {
  f = util.$(f);
  var x = -1, y = -1, a, b, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; x = y = i; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) { a = v; x = i; }
      if (v > b) { b = v; y = i; }
    }
  }
  return [x, y];
};

// Compute the dot product of two arrays of numbers.
stats.dot = function(values, a, b) {
  var sum = 0, i, v;
  if (!b) {
    if (values.length !== a.length) {
      throw Error('Array lengths must match.');
    }
    for (i=0; i<values.length; ++i) {
      v = values[i] * a[i];
      if (v === v) sum += v;
    }
  } else {
    a = util.$(a);
    b = util.$(b);
    for (i=0; i<values.length; ++i) {
      v = a(values[i]) * b(values[i]);
      if (v === v) sum += v;
    }
  }
  return sum;
};

// Compute the vector distance between two arrays of numbers.
// Default is Euclidean (exp=2) distance, configurable via exp argument.
stats.dist = function(values, a, b, exp) {
  var f = util.isFunction(b) || util.isString(b),
      X = values,
      Y = f ? values : a,
      e = f ? exp : b,
      L2 = e === 2 || e == null,
      n = values.length, s = 0, d, i;
  if (f) {
    a = util.$(a);
    b = util.$(b);
  }
  for (i=0; i<n; ++i) {
    d = f ? (a(X[i])-b(Y[i])) : (X[i]-Y[i]);
    s += L2 ? d*d : Math.pow(Math.abs(d), e);
  }
  return L2 ? Math.sqrt(s) : Math.pow(s, 1/e);
};

// Compute the Cohen's d effect size between two arrays of numbers.
stats.cohensd = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      x1 = stats.mean(X),
      x2 = stats.mean(Y),
      n1 = stats.count.valid(X),
      n2 = stats.count.valid(Y);

  if ((n1+n2-2) <= 0) {
    // if both arrays are size 1, or one is empty, there's no effect size
    return 0;
  }
  // pool standard deviation
  var s1 = stats.variance(X),
      s2 = stats.variance(Y),
      s = Math.sqrt((((n1-1)*s1) + ((n2-1)*s2)) / (n1+n2-2));
  // if there is no variance, there's no effect size
  return s===0 ? 0 : (x1 - x2) / s;
};

// Computes the covariance between two arrays of numbers
stats.covariance = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n = X.length,
      xm = stats.mean(X),
      ym = stats.mean(Y),
      sum = 0, c = 0, i, x, y, vx, vy;

  if (n !== Y.length) {
    throw Error('Input lengths must match.');
  }

  for (i=0; i<n; ++i) {
    x = X[i]; vx = util.isValid(x);
    y = Y[i]; vy = util.isValid(y);
    if (vx && vy) {
      sum += (x-xm) * (y-ym);
      ++c;
    } else if (vx || vy) {
      throw Error('Valid values must align.');
    }
  }
  return sum / (c-1);
};

// Compute ascending rank scores for an array of values.
// Ties are assigned their collective mean rank.
stats.rank = function(values, f) {
  f = util.$(f) || util.identity;
  var a = values.map(function(v, i) {
      return {idx: i, val: f(v)};
    })
    .sort(util.comparator('val'));

  var n = values.length,
      r = Array(n),
      tie = -1, p = {}, i, v, mu;

  for (i=0; i<n; ++i) {
    v = a[i].val;
    if (tie < 0 && p === v) {
      tie = i - 1;
    } else if (tie > -1 && p !== v) {
      mu = 1 + (i-1 + tie) / 2;
      for (; tie<i; ++tie) r[a[tie].idx] = mu;
      tie = -1;
    }
    r[a[i].idx] = i + 1;
    p = v;
  }

  if (tie > -1) {
    mu = 1 + (n-1 + tie) / 2;
    for (; tie<n; ++tie) r[a[tie].idx] = mu;
  }

  return r;
};

// Compute the sample Pearson product-moment correlation of two arrays of numbers.
stats.cor = function(values, a, b) {
  var fn = b;
  b = fn ? values.map(util.$(b)) : a;
  a = fn ? values.map(util.$(a)) : values;

  var dot = stats.dot(a, b),
      mua = stats.mean(a),
      mub = stats.mean(b),
      sda = stats.stdev(a),
      sdb = stats.stdev(b),
      n = values.length;

  return (dot - n*mua*mub) / ((n-1) * sda * sdb);
};

// Compute the Spearman rank correlation of two arrays of values.
stats.cor.rank = function(values, a, b) {
  var ra = b ? stats.rank(values, util.$(a)) : stats.rank(values),
      rb = b ? stats.rank(values, util.$(b)) : stats.rank(a),
      n = values.length, i, s, d;

  for (i=0, s=0; i<n; ++i) {
    d = ra[i] - rb[i];
    s += d * d;
  }

  return 1 - 6*s / (n * (n*n-1));
};

// Compute the distance correlation of two arrays of numbers.
// http://en.wikipedia.org/wiki/Distance_correlation
stats.cor.dist = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a;

  var A = stats.dist.mat(X),
      B = stats.dist.mat(Y),
      n = A.length,
      i, aa, bb, ab;

  for (i=0, aa=0, bb=0, ab=0; i<n; ++i) {
    aa += A[i]*A[i];
    bb += B[i]*B[i];
    ab += A[i]*B[i];
  }

  return Math.sqrt(ab / Math.sqrt(aa*bb));
};

// Simple linear regression.
// Returns a "fit" object with slope (m), intercept (b),
// r value (R), and sum-squared residual error (rss).
stats.linearRegression = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n = X.length,
      xy = stats.covariance(X, Y), // will throw err if valid vals don't align
      sx = stats.stdev(X),
      sy = stats.stdev(Y),
      slope = xy / (sx*sx),
      icept = stats.mean(Y) - slope * stats.mean(X),
      fit = {slope: slope, intercept: icept, R: xy / (sx*sy), rss: 0},
      res, i;

  for (i=0; i<n; ++i) {
    if (util.isValid(X[i]) && util.isValid(Y[i])) {
      res = (slope*X[i] + icept) - Y[i];
      fit.rss += res * res;
    }
  }

  return fit;
};

// Namespace for z-tests
stats.z = {};

// Construct a z-confidence interval at a given significance level
// Arguments are an array and an optional alpha (defaults to 0.05).
stats.z.ci = function(a, alpha) {
  var z = alpha ? gen.random.normal(0, 1).icdf(1-(alpha/2)) : 1.96,
      mu = stats.mean(a),
      SE = stats.stdev(a) / Math.sqrt(stats.count.valid(a));
  return [mu - (z*SE), mu + (z*SE)];
};

// Perform a z-test of means. Returns the p-value.
// If a single array is provided, performs a one-sample location test.
// If two arrays or a table and two accessors are provided, performs
// a two-sample location test. A paired test is performed if specified
// by the options hash.
// The options hash format is: {paired: boolean, nullh: number}.
// http://en.wikipedia.org/wiki/Z-test
// http://en.wikipedia.org/wiki/Paired_difference_test
stats.z.test = function(values, a, b, opt) {
  if (util.isFunction(b) || util.isString(b)) { // table and accessors
    return (opt && opt.paired ? ztestP : ztest2)(opt, values, a, b);
  } else if (util.isArray(a)) { // two arrays
    return (b && b.paired ? ztestP : ztest2)(b, values, a);
  } else { // one array
    return ztest1(a, values);
  }
};

// Perform a z-test of means. Returns the p-value.
// Assuming we have a list of values, and a null hypothesis. If no null
// hypothesis, assume our null hypothesis is mu=0.
function ztest1(opt, a) {
  var nullH = opt && opt.nullh || 0,
      gaussian = gen.random.normal(0, 1),
      mu = stats.mean(a),
      SE = stats.stdev(a) / Math.sqrt(stats.count.valid(a));

  if (SE===0) {
    // Test not well defined when standard error is 0.
    return (mu - nullH) === 0 ? 1 : 0;
  }
  // Two-sided, so twice the one-sided cdf.
  var z = (mu - nullH) / SE;
  return 2 * gaussian.cdf(-Math.abs(z));
}

// Perform a two sample paired z-test of means. Returns the p-value.
function ztestP(opt, values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n1 = stats.count(X),
      n2 = stats.count(Y),
      diffs = Array(), i;

  if (n1 !== n2) {
    throw Error('Array lengths must match.');
  }
  for (i=0; i<n1; ++i) {
    // Only valid differences should contribute to the test statistic
    if (util.isValid(X[i]) && util.isValid(Y[i])) {
      diffs.push(X[i] - Y[i]);
    }
  }
  return stats.z.test(diffs, opt && opt.nullh || 0);
}

// Perform a two sample z-test of means. Returns the p-value.
function ztest2(opt, values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n1 = stats.count.valid(X),
      n2 = stats.count.valid(Y),
      gaussian = gen.random.normal(0, 1),
      meanDiff = stats.mean(X) - stats.mean(Y) - (opt && opt.nullh || 0),
      SE = Math.sqrt(stats.variance(X)/n1 + stats.variance(Y)/n2);

  if (SE===0) {
    // Not well defined when pooled standard error is 0.
    return meanDiff===0 ? 1 : 0;
  }
  // Two-tailed, so twice the one-sided cdf.
  var z = meanDiff / SE;
  return 2 * gaussian.cdf(-Math.abs(z));
}

// Construct a mean-centered distance matrix for an array of numbers.
stats.dist.mat = function(X) {
  var n = X.length,
      m = n*n,
      A = Array(m),
      R = gen.zeros(n),
      M = 0, v, i, j;

  for (i=0; i<n; ++i) {
    A[i*n+i] = 0;
    for (j=i+1; j<n; ++j) {
      A[i*n+j] = (v = Math.abs(X[i] - X[j]));
      A[j*n+i] = v;
      R[i] += v;
      R[j] += v;
    }
  }

  for (i=0; i<n; ++i) {
    M += R[i];
    R[i] /= n;
  }
  M /= m;

  for (i=0; i<n; ++i) {
    for (j=i; j<n; ++j) {
      A[i*n+j] += M - R[i] - R[j];
      A[j*n+i] = A[i*n+j];
    }
  }

  return A;
};

// Compute the Shannon entropy (log base 2) of an array of counts.
stats.entropy = function(counts, f) {
  f = util.$(f);
  var i, p, s = 0, H = 0, n = counts.length;
  for (i=0; i<n; ++i) {
    s += (f ? f(counts[i]) : counts[i]);
  }
  if (s === 0) return 0;
  for (i=0; i<n; ++i) {
    p = (f ? f(counts[i]) : counts[i]) / s;
    if (p) H += p * Math.log(p);
  }
  return -H / Math.LN2;
};

// Compute the mutual information between two discrete variables.
// Returns an array of the form [MI, MI_distance]
// MI_distance is defined as 1 - I(a,b) / H(a,b).
// http://en.wikipedia.org/wiki/Mutual_information
stats.mutual = function(values, a, b, counts) {
  var x = counts ? values.map(util.$(a)) : values,
      y = counts ? values.map(util.$(b)) : a,
      z = counts ? values.map(util.$(counts)) : b;

  var px = {},
      py = {},
      n = z.length,
      s = 0, I = 0, H = 0, p, t, i;

  for (i=0; i<n; ++i) {
    px[x[i]] = 0;
    py[y[i]] = 0;
  }

  for (i=0; i<n; ++i) {
    px[x[i]] += z[i];
    py[y[i]] += z[i];
    s += z[i];
  }

  t = 1 / (s * Math.LN2);
  for (i=0; i<n; ++i) {
    if (z[i] === 0) continue;
    p = (s * z[i]) / (px[x[i]] * py[y[i]]);
    I += z[i] * t * Math.log(p);
    H += z[i] * t * Math.log(z[i]/s);
  }

  return [I, 1 + I/H];
};

// Compute the mutual information between two discrete variables.
stats.mutual.info = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[0];
};

// Compute the mutual information distance between two discrete variables.
// MI_distance is defined as 1 - I(a,b) / H(a,b).
stats.mutual.dist = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[1];
};

// Compute a profile of summary statistics for a variable.
stats.profile = function(values, f) {
  var mean = 0,
      valid = 0,
      missing = 0,
      distinct = 0,
      min = null,
      max = null,
      M2 = 0,
      vals = [],
      u = {}, delta, sd, i, v, x;

  // compute summary stats
  for (i=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];

    // update unique values
    u[v] = (v in u) ? u[v] + 1 : (distinct += 1, 1);

    if (v == null) {
      ++missing;
    } else if (util.isValid(v)) {
      // update stats
      x = (typeof v === 'string') ? v.length : v;
      if (min===null || x < min) min = x;
      if (max===null || x > max) max = x;
      delta = x - mean;
      mean = mean + delta / (++valid);
      M2 = M2 + delta * (x - mean);
      vals.push(x);
    }
  }
  M2 = M2 / (valid - 1);
  sd = Math.sqrt(M2);

  // sort values for median and iqr
  vals.sort(util.cmp);

  return {
    type:     type(values, f),
    unique:   u,
    count:    values.length,
    valid:    valid,
    missing:  missing,
    distinct: distinct,
    min:      min,
    max:      max,
    mean:     mean,
    stdev:    sd,
    median:   (v = stats.quantile(vals, 0.5)),
    q1:       stats.quantile(vals, 0.25),
    q3:       stats.quantile(vals, 0.75),
    modeskew: sd === 0 ? 0 : (mean - v) / sd
  };
};

// Compute profiles for all variables in a data set.
stats.summary = function(data, fields) {
  fields = fields || util.keys(data[0]);
  var s = fields.map(function(f) {
    var p = stats.profile(data, util.$(f));
    return (p.field = f, p);
  });
  return (s.__summary__ = true, s);
};

module.exports = stats;

},{"./generate":16,"./import/type":25,"./util":30}],28:[function(require,module,exports){
var util = require('./util'),
    format = require('./format');

var context = {
  formats:    [],
  format_map: {},
  truncate:   util.truncate,
  pad:        util.pad,
  day:        format.day,
  month:      format.month
};

function template(text) {
  var src = source(text, 'd');
  src = 'var __t; return ' + src + ';';

  /* jshint evil: true */
  return (new Function('d', src)).bind(context);
}

template.source = source;
template.context = context;
module.exports = template;

// Clear cache of format objects.
// This can *break* prior template functions, so invoke with care!
template.clearFormatCache = function() {
  context.formats = [];
  context.format_map = {};
};

// Generate property access code for use within template source.
// object: the name of the object (variable) containing template data
// property: the property access string, verbatim from template tag
template.property = function(object, property) {
  var src = util.field(property).map(util.str).join('][');
  return object + '[' + src + ']';
};

// Generate source code for a template function.
// text: the template text
// variable: the name of the data object variable ('obj' by default)
// properties: optional hash for collecting all accessed properties
function source(text, variable, properties) {
  variable = variable || 'obj';
  var index = 0;
  var src = '\'';
  var regex = template_re;

  // Compile the template source, escaping string literals appropriately.
  text.replace(regex, function(match, interpolate, offset) {
    src += text
      .slice(index, offset)
      .replace(template_escaper, template_escapeChar);
    index = offset + match.length;

    if (interpolate) {
      src += '\'\n+((__t=(' +
        template_var(interpolate, variable, properties) +
        '))==null?\'\':__t)+\n\'';
    }

    // Adobe VMs need the match returned to produce the correct offest.
    return match;
  });
  return src + '\'';
}

function template_var(text, variable, properties) {
  var filters = text.match(filter_re);
  var prop = filters.shift().trim();
  var stringCast = true;

  function strcall(fn) {
    fn = fn || '';
    if (stringCast) {
      stringCast = false;
      src = 'String(' + src + ')' + fn;
    } else {
      src += fn;
    }
    return src;
  }

  function date() {
    return '(typeof ' + src + '==="number"?new Date('+src+'):'+src+')';
  }

  function number_format(fmt, key) {
    a = template_format(args[0], key, fmt);
    stringCast = false;
    src = 'this.formats['+a+']('+src+')';
  }

  function time_format(fmt, key) {
    a = template_format(args[0], key, fmt);
    stringCast = false;
    src = 'this.formats['+a+']('+date()+')';
  }

  if (properties) properties[prop] = 1;
  var src = template.property(variable, prop);

  for (var i=0; i<filters.length; ++i) {
    var f = filters[i], args = null, pidx, a, b;

    if ((pidx=f.indexOf(':')) > 0) {
      f = f.slice(0, pidx);
      args = filters[i].slice(pidx+1)
        .match(args_re)
        .map(function(s) { return s.trim(); });
    }
    f = f.trim();

    switch (f) {
      case 'length':
        strcall('.length');
        break;
      case 'lower':
        strcall('.toLowerCase()');
        break;
      case 'upper':
        strcall('.toUpperCase()');
        break;
      case 'lower-locale':
        strcall('.toLocaleLowerCase()');
        break;
      case 'upper-locale':
        strcall('.toLocaleUpperCase()');
        break;
      case 'trim':
        strcall('.trim()');
        break;
      case 'left':
        a = util.number(args[0]);
        strcall('.slice(0,' + a + ')');
        break;
      case 'right':
        a = util.number(args[0]);
        strcall('.slice(-' + a +')');
        break;
      case 'mid':
        a = util.number(args[0]);
        b = a + util.number(args[1]);
        strcall('.slice(+'+a+','+b+')');
        break;
      case 'slice':
        a = util.number(args[0]);
        strcall('.slice('+ a +
          (args.length > 1 ? ',' + util.number(args[1]) : '') +
          ')');
        break;
      case 'truncate':
        a = util.number(args[0]);
        b = args[1];
        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
        src = 'this.truncate(' + strcall() + ',' + a + ',\'' + b + '\')';
        break;
      case 'pad':
        a = util.number(args[0]);
        b = args[1];
        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
        src = 'this.pad(' + strcall() + ',' + a + ',\'' + b + '\')';
        break;
      case 'number':
        number_format(format.number, 'number');
        break;
      case 'time':
        time_format(format.time, 'time');
        break;
      case 'time-utc':
        time_format(format.utc, 'time-utc');
        break;
      case 'month':
        src = 'this.month(' + src + ')';
        break;
      case 'month-abbrev':
        src = 'this.month(' + src + ',true)';
        break;
      case 'day':
        src = 'this.day(' + src + ')';
        break;
      case 'day-abbrev':
        src = 'this.day(' + src + ',true)';
        break;
      default:
        throw Error('Unrecognized template filter: ' + f);
    }
  }

  return src;
}

var template_re = /\{\{(.+?)\}\}|$/g,
    filter_re = /(?:"[^"]*"|\'[^\']*\'|[^\|"]+|[^\|\']+)+/g,
    args_re = /(?:"[^"]*"|\'[^\']*\'|[^,"]+|[^,\']+)+/g;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var template_escapes = {
  '\'':     '\'',
  '\\':     '\\',
  '\r':     'r',
  '\n':     'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var template_escaper = /\\|'|\r|\n|\u2028|\u2029/g;

function template_escapeChar(match) {
  return '\\' + template_escapes[match];
}

function template_format(pattern, key, fmt) {
  if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
      (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
    pattern = pattern.slice(1, -1);
  } else {
    throw Error('Format pattern must be quoted: ' + pattern);
  }
  key = key + ':' + pattern;
  if (!context.format_map[key]) {
    var f = fmt(pattern);
    var i = context.formats.length;
    context.formats.push(f);
    context.format_map[key] = i;
  }
  return context.format_map[key];
}

},{"./format":15,"./util":30}],29:[function(require,module,exports){
var d3_time = require('d3-time');

var tempDate = new Date(),
    baseDate = new Date(0, 0, 1).setFullYear(0), // Jan 1, 0 AD
    utcBaseDate = new Date(Date.UTC(0, 0, 1)).setUTCFullYear(0);

function date(d) {
  return (tempDate.setTime(+d), tempDate);
}

// create a time unit entry
function entry(type, date, unit, step, min, max) {
  var e = {
    type: type,
    date: date,
    unit: unit
  };
  if (step) {
    e.step = step;
  } else {
    e.minstep = 1;
  }
  if (min != null) e.min = min;
  if (max != null) e.max = max;
  return e;
}

function create(type, unit, base, step, min, max) {
  return entry(type,
    function(d) { return unit.offset(base, d); },
    function(d) { return unit.count(base, d); },
    step, min, max);
}

var locale = [
  create('second', d3_time.second, baseDate),
  create('minute', d3_time.minute, baseDate),
  create('hour',   d3_time.hour,   baseDate),
  create('day',    d3_time.day,    baseDate, [1, 7]),
  create('month',  d3_time.month,  baseDate, [1, 3, 6]),
  create('year',   d3_time.year,   baseDate),

  // periodic units
  entry('seconds',
    function(d) { return new Date(1970, 0, 1, 0, 0, d); },
    function(d) { return date(d).getSeconds(); },
    null, 0, 59
  ),
  entry('minutes',
    function(d) { return new Date(1970, 0, 1, 0, d); },
    function(d) { return date(d).getMinutes(); },
    null, 0, 59
  ),
  entry('hours',
    function(d) { return new Date(1970, 0, 1, d); },
    function(d) { return date(d).getHours(); },
    null, 0, 23
  ),
  entry('weekdays',
    function(d) { return new Date(1970, 0, 4+d); },
    function(d) { return date(d).getDay(); },
    [1], 0, 6
  ),
  entry('dates',
    function(d) { return new Date(1970, 0, d); },
    function(d) { return date(d).getDate(); },
    [1], 1, 31
  ),
  entry('months',
    function(d) { return new Date(1970, d % 12, 1); },
    function(d) { return date(d).getMonth(); },
    [1], 0, 11
  )
];

var utc = [
  create('second', d3_time.utcSecond, utcBaseDate),
  create('minute', d3_time.utcMinute, utcBaseDate),
  create('hour',   d3_time.utcHour,   utcBaseDate),
  create('day',    d3_time.utcDay,    utcBaseDate, [1, 7]),
  create('month',  d3_time.utcMonth,  utcBaseDate, [1, 3, 6]),
  create('year',   d3_time.utcYear,   utcBaseDate),

  // periodic units
  entry('seconds',
    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, 0, d)); },
    function(d) { return date(d).getUTCSeconds(); },
    null, 0, 59
  ),
  entry('minutes',
    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, d)); },
    function(d) { return date(d).getUTCMinutes(); },
    null, 0, 59
  ),
  entry('hours',
    function(d) { return new Date(Date.UTC(1970, 0, 1, d)); },
    function(d) { return date(d).getUTCHours(); },
    null, 0, 23
  ),
  entry('weekdays',
    function(d) { return new Date(Date.UTC(1970, 0, 4+d)); },
    function(d) { return date(d).getUTCDay(); },
    [1], 0, 6
  ),
  entry('dates',
    function(d) { return new Date(Date.UTC(1970, 0, d)); },
    function(d) { return date(d).getUTCDate(); },
    [1], 1, 31
  ),
  entry('months',
    function(d) { return new Date(Date.UTC(1970, d % 12, 1)); },
    function(d) { return date(d).getUTCMonth(); },
    [1], 0, 11
  )
];

var STEPS = [
  [31536e6, 5],  // 1-year
  [7776e6, 4],   // 3-month
  [2592e6, 4],   // 1-month
  [12096e5, 3],  // 2-week
  [6048e5, 3],   // 1-week
  [1728e5, 3],   // 2-day
  [864e5, 3],    // 1-day
  [432e5, 2],    // 12-hour
  [216e5, 2],    // 6-hour
  [108e5, 2],    // 3-hour
  [36e5, 2],     // 1-hour
  [18e5, 1],     // 30-minute
  [9e5, 1],      // 15-minute
  [3e5, 1],      // 5-minute
  [6e4, 1],      // 1-minute
  [3e4, 0],      // 30-second
  [15e3, 0],     // 15-second
  [5e3, 0],      // 5-second
  [1e3, 0]       // 1-second
];

function find(units, span, minb, maxb) {
  var step = STEPS[0], i, n, bins;

  for (i=1, n=STEPS.length; i<n; ++i) {
    step = STEPS[i];
    if (span > step[0]) {
      bins = span / step[0];
      if (bins > maxb) {
        return units[STEPS[i-1][1]];
      }
      if (bins >= minb) {
        return units[step[1]];
      }
    }
  }
  return units[STEPS[n-1][1]];
}

function toUnitMap(units) {
  var map = {}, i, n;
  for (i=0, n=units.length; i<n; ++i) {
    map[units[i].type] = units[i];
  }
  map.find = function(span, minb, maxb) {
    return find(units, span, minb, maxb);
  };
  return map;
}

module.exports = toUnitMap(locale);
module.exports.utc = toUnitMap(utc);

},{"d3-time":6}],30:[function(require,module,exports){
var buffer = require('buffer'),
    time = require('./time'),
    utc = time.utc;

var u = module.exports = {};

// utility functions

var FNAME = '__name__';

u.namedfunc = function(name, f) { return (f[FNAME] = name, f); };

u.name = function(f) { return f==null ? null : f[FNAME]; };

u.identity = function(x) { return x; };

u.true = u.namedfunc('true', function() { return true; });

u.false = u.namedfunc('false', function() { return false; });

u.duplicate = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

u.equal = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

u.extend = function(obj) {
  for (var x, name, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (name in x) { obj[name] = x[name]; }
  }
  return obj;
};

u.length = function(x) {
  return x != null && x.length != null ? x.length : null;
};

u.keys = function(x) {
  var keys = [], k;
  for (k in x) keys.push(k);
  return keys;
};

u.vals = function(x) {
  var vals = [], k;
  for (k in x) vals.push(x[k]);
  return vals;
};

u.toMap = function(list, f) {
  return (f = u.$(f)) ?
    list.reduce(function(obj, x) { return (obj[f(x)] = 1, obj); }, {}) :
    list.reduce(function(obj, x) { return (obj[x] = 1, obj); }, {});
};

u.keystr = function(values) {
  // use to ensure consistent key generation across modules
  var n = values.length;
  if (!n) return '';
  for (var s=String(values[0]), i=1; i<n; ++i) {
    s += '|' + String(values[i]);
  }
  return s;
};

// type checking functions

var toString = Object.prototype.toString;

u.isObject = function(obj) {
  return obj === Object(obj);
};

u.isFunction = function(obj) {
  return toString.call(obj) === '[object Function]';
};

u.isString = function(obj) {
  return typeof value === 'string' || toString.call(obj) === '[object String]';
};

u.isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

u.isNumber = function(obj) {
  return typeof obj === 'number' || toString.call(obj) === '[object Number]';
};

u.isBoolean = function(obj) {
  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
};

u.isDate = function(obj) {
  return toString.call(obj) === '[object Date]';
};

u.isValid = function(obj) {
  return obj != null && obj === obj;
};

u.isBuffer = (buffer.Buffer && buffer.Buffer.isBuffer) || u.false;

// type coercion functions

u.number = function(s) {
  return s == null || s === '' ? null : +s;
};

u.boolean = function(s) {
  return s == null || s === '' ? null : s==='false' ? false : !!s;
};

// parse a date with optional d3.time-format format
u.date = function(s, format) {
  var d = format ? format : Date;
  return s == null || s === '' ? null : d.parse(s);
};

u.array = function(x) {
  return x != null ? (u.isArray(x) ? x : [x]) : [];
};

u.str = function(x) {
  return u.isArray(x) ? '[' + x.map(u.str) + ']'
    : u.isObject(x) ? JSON.stringify(x)
    : u.isString(x) ? ('\''+util_escape_str(x)+'\'') : x;
};

var escape_str_re = /(^|[^\\])'/g;

function util_escape_str(x) {
  return x.replace(escape_str_re, '$1\\\'');
}

// data access functions

var field_re = /\[(.*?)\]|[^.\[]+/g;

u.field = function(f) {
  return String(f).match(field_re).map(function(d) {
    return d[0] !== '[' ? d :
      d[1] !== "'" && d[1] !== '"' ? d.slice(1, -1) :
      d.slice(2, -2).replace(/\\(["'])/g, '$1');
  });
};

u.accessor = function(f) {
  var s;
  return f==null || u.isFunction(f) ? f :
    u.namedfunc(f, (s = u.field(f)).length > 1 ?
      function(x) { return s.reduce(function(x,f) { return x[f]; }, x); } :
      function(x) { return x[f]; }
    );
};

// short-cut for accessor
u.$ = u.accessor;

u.mutator = function(f) {
  var s;
  return u.isString(f) && (s=u.field(f)).length > 1 ?
    function(x, v) {
      for (var i=0; i<s.length-1; ++i) x = x[s[i]];
      x[s[i]] = v;
    } :
    function(x, v) { x[f] = v; };
};


u.$func = function(name, op) {
  return function(f) {
    f = u.$(f) || u.identity;
    var n = name + (u.name(f) ? '_'+u.name(f) : '');
    return u.namedfunc(n, function(d) { return op(f(d)); });
  };
};

u.$valid  = u.$func('valid', u.isValid);
u.$length = u.$func('length', u.length);

u.$in = function(f, values) {
  f = u.$(f);
  var map = u.isArray(values) ? u.toMap(values) : values;
  return function(d) { return !!map[f(d)]; };
};

u.$year   = u.$func('year', time.year.unit);
u.$month  = u.$func('month', time.months.unit);
u.$date   = u.$func('date', time.dates.unit);
u.$day    = u.$func('day', time.weekdays.unit);
u.$hour   = u.$func('hour', time.hours.unit);
u.$minute = u.$func('minute', time.minutes.unit);
u.$second = u.$func('second', time.seconds.unit);

u.$utcYear   = u.$func('utcYear', utc.year.unit);
u.$utcMonth  = u.$func('utcMonth', utc.months.unit);
u.$utcDate   = u.$func('utcDate', utc.dates.unit);
u.$utcDay    = u.$func('utcDay', utc.weekdays.unit);
u.$utcHour   = u.$func('utcHour', utc.hours.unit);
u.$utcMinute = u.$func('utcMinute', utc.minutes.unit);
u.$utcSecond = u.$func('utcSecond', utc.seconds.unit);

// comparison / sorting functions

u.comparator = function(sort) {
  var sign = [];
  if (sort === undefined) sort = [];
  sort = u.array(sort).map(function(f) {
    var s = 1;
    if      (f[0] === '-') { s = -1; f = f.slice(1); }
    else if (f[0] === '+') { s = +1; f = f.slice(1); }
    sign.push(s);
    return u.accessor(f);
  });
  return function(a,b) {
    var i, n, f, x, y;
    for (i=0, n=sort.length; i<n; ++i) {
      f = sort[i]; x = f(a); y = f(b);
      if (x < y) return -1 * sign[i];
      if (x > y) return sign[i];
    }
    return 0;
  };
};

u.cmp = function(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else if (a >= b) {
    return 0;
  } else if (a === null) {
    return -1;
  } else if (b === null) {
    return 1;
  }
  return NaN;
};

u.numcmp = function(a, b) { return a - b; };

u.stablesort = function(array, sortBy, keyFn) {
  var indices = array.reduce(function(idx, v, i) {
    return (idx[keyFn(v)] = i, idx);
  }, {});

  array.sort(function(a, b) {
    var sa = sortBy(a),
        sb = sortBy(b);
    return sa < sb ? -1 : sa > sb ? 1
         : (indices[keyFn(a)] - indices[keyFn(b)]);
  });

  return array;
};


// string functions

u.pad = function(s, length, pos, padchar) {
  padchar = padchar || " ";
  var d = length - s.length;
  if (d <= 0) return s;
  switch (pos) {
    case 'left':
      return strrep(d, padchar) + s;
    case 'middle':
    case 'center':
      return strrep(Math.floor(d/2), padchar) +
         s + strrep(Math.ceil(d/2), padchar);
    default:
      return s + strrep(d, padchar);
  }
};

function strrep(n, str) {
  var s = "", i;
  for (i=0; i<n; ++i) s += str;
  return s;
}

u.truncate = function(s, length, pos, word, ellipsis) {
  var len = s.length;
  if (len <= length) return s;
  ellipsis = ellipsis !== undefined ? String(ellipsis) : '\u2026';
  var l = Math.max(0, length - ellipsis.length);

  switch (pos) {
    case 'left':
      return ellipsis + (word ? truncateOnWord(s,l,1) : s.slice(len-l));
    case 'middle':
    case 'center':
      var l1 = Math.ceil(l/2), l2 = Math.floor(l/2);
      return (word ? truncateOnWord(s,l1) : s.slice(0,l1)) +
        ellipsis + (word ? truncateOnWord(s,l2,1) : s.slice(len-l2));
    default:
      return (word ? truncateOnWord(s,l) : s.slice(0,l)) + ellipsis;
  }
};

function truncateOnWord(s, len, rev) {
  var cnt = 0, tok = s.split(truncate_word_re);
  if (rev) {
    s = (tok = tok.reverse())
      .filter(function(w) { cnt += w.length; return cnt <= len; })
      .reverse();
  } else {
    s = tok.filter(function(w) { cnt += w.length; return cnt <= len; });
  }
  return s.length ? s.join('').trim() : tok[0].slice(0, len);
}

var truncate_word_re = /([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/;

},{"./time":29,"buffer":1}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLWRzdi9idWlsZC9kMy1kc3YuanMiLCJub2RlX21vZHVsZXMvZDMtZm9ybWF0L2J1aWxkL2QzLWZvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lLWZvcm1hdC9idWlsZC9kMy10aW1lLWZvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lLWZvcm1hdC9ub2RlX21vZHVsZXMvZDMtdGltZS9idWlsZC9kMy10aW1lLmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvZDMtdGltZS5qcyIsIm5vZGVfbW9kdWxlcy90b3BvanNvbi90b3BvanNvbi5qcyIsInNyYy9hZ2dyZWdhdGUvYWdncmVnYXRvci5qcyIsInNyYy9hZ2dyZWdhdGUvY29sbGVjdG9yLmpzIiwic3JjL2FnZ3JlZ2F0ZS9ncm91cGJ5LmpzIiwic3JjL2FnZ3JlZ2F0ZS9tZWFzdXJlcy5qcyIsInNyYy9iaW5zL2JpbnMuanMiLCJzcmMvYmlucy9oaXN0b2dyYW0uanMiLCJzcmMvZm9ybWF0LXRhYmxlcy5qcyIsInNyYy9mb3JtYXQuanMiLCJzcmMvZ2VuZXJhdGUuanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvZHN2LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2luZGV4LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdG9wb2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdHJlZWpzb24uanMiLCJzcmMvaW1wb3J0L2xvYWQuanMiLCJzcmMvaW1wb3J0L3JlYWQuanMiLCJzcmMvaW1wb3J0L3JlYWRlcnMuanMiLCJzcmMvaW1wb3J0L3R5cGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc3RhdHMuanMiLCJzcmMvdGVtcGxhdGUuanMiLCJzcmMvdGltZS5qcyIsInNyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbnpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKCdkMy1kc3YnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfZHN2ID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIpIHtcbiAgICByZXR1cm4gbmV3IERzdihkZWxpbWl0ZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydGVyKGNvbHVtbnMpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZFwiLCBcInJldHVybiB7XCIgKyBjb2x1bW5zLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIjogZFtcIiArIGkgKyBcIl1cIjtcbiAgICB9KS5qb2luKFwiLFwiKSArIFwifVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1c3RvbUNvbnZlcnRlcihjb2x1bW5zLCBmKSB7XG4gICAgdmFyIGNvbnZlcnQgPSBjb252ZXJ0ZXIoY29sdW1ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgcmV0dXJuIGYoY29udmVydChyb3cpLCBpKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gQ29tcHV0ZSB1bmlxdWUgY29sdW1ucyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG4gIGZ1bmN0aW9uIGluZmVyQ29sdW1ucyhyb3dzKSB7XG4gICAgdmFyIGNvbHVtblNldCA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgIGNvbHVtbnMgPSBbXTtcblxuICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbHVtbiBpbiByb3cpIHtcbiAgICAgICAgaWYgKCEoY29sdW1uIGluIGNvbHVtblNldCkpIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2goY29sdW1uU2V0W2NvbHVtbl0gPSBjb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIGZ1bmN0aW9uIERzdihkZWxpbWl0ZXIpIHtcbiAgICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKFwiW1xcXCJcIiArIGRlbGltaXRlciArIFwiXFxuXVwiKSxcbiAgICAgICAgZGVsaW1pdGVyQ29kZSA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuXG4gICAgdGhpcy5wYXJzZSA9IGZ1bmN0aW9uKHRleHQsIGYpIHtcbiAgICAgIHZhciBjb252ZXJ0LCBjb2x1bW5zLCByb3dzID0gdGhpcy5wYXJzZVJvd3ModGV4dCwgZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgICAgIGlmIChjb252ZXJ0KSByZXR1cm4gY29udmVydChyb3csIGkgLSAxKTtcbiAgICAgICAgY29sdW1ucyA9IHJvdywgY29udmVydCA9IGYgPyBjdXN0b21Db252ZXJ0ZXIocm93LCBmKSA6IGNvbnZlcnRlcihyb3cpO1xuICAgICAgfSk7XG4gICAgICByb3dzLmNvbHVtbnMgPSBjb2x1bW5zO1xuICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfTtcblxuICAgIHRoaXMucGFyc2VSb3dzID0gZnVuY3Rpb24odGV4dCwgZikge1xuICAgICAgdmFyIEVPTCA9IHt9LCAvLyBzZW50aW5lbCB2YWx1ZSBmb3IgZW5kLW9mLWxpbmVcbiAgICAgICAgICBFT0YgPSB7fSwgLy8gc2VudGluZWwgdmFsdWUgZm9yIGVuZC1vZi1maWxlXG4gICAgICAgICAgcm93cyA9IFtdLCAvLyBvdXRwdXQgcm93c1xuICAgICAgICAgIE4gPSB0ZXh0Lmxlbmd0aCxcbiAgICAgICAgICBJID0gMCwgLy8gY3VycmVudCBjaGFyYWN0ZXIgaW5kZXhcbiAgICAgICAgICBuID0gMCwgLy8gdGhlIGN1cnJlbnQgbGluZSBudW1iZXJcbiAgICAgICAgICB0LCAvLyB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgIGVvbDsgLy8gaXMgdGhlIGN1cnJlbnQgdG9rZW4gZm9sbG93ZWQgYnkgRU9MP1xuXG4gICAgICBmdW5jdGlvbiB0b2tlbigpIHtcbiAgICAgICAgaWYgKEkgPj0gTikgcmV0dXJuIEVPRjsgLy8gc3BlY2lhbCBjYXNlOiBlbmQgb2YgZmlsZVxuICAgICAgICBpZiAoZW9sKSByZXR1cm4gZW9sID0gZmFsc2UsIEVPTDsgLy8gc3BlY2lhbCBjYXNlOiBlbmQgb2YgbGluZVxuXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZTogcXVvdGVzXG4gICAgICAgIHZhciBqID0gSTtcbiAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChqKSA9PT0gMzQpIHtcbiAgICAgICAgICB2YXIgaSA9IGo7XG4gICAgICAgICAgd2hpbGUgKGkrKyA8IE4pIHtcbiAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSkgPT09IDM0KSB7XG4gICAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSArIDEpICE9PSAzNCkgYnJlYWs7XG4gICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgSSA9IGkgKyAyO1xuICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICBpZiAoYyA9PT0gMTMpIHtcbiAgICAgICAgICAgIGVvbCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkgKyAyKSA9PT0gMTApICsrSTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09IDEwKSB7XG4gICAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGV4dC5zbGljZShqICsgMSwgaSkucmVwbGFjZSgvXCJcIi9nLCBcIlxcXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21tb24gY2FzZTogZmluZCBuZXh0IGRlbGltaXRlciBvciBuZXdsaW5lXG4gICAgICAgIHdoaWxlIChJIDwgTikge1xuICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KEkrKyksIGsgPSAxO1xuICAgICAgICAgIGlmIChjID09PSAxMCkgZW9sID0gdHJ1ZTsgLy8gXFxuXG4gICAgICAgICAgZWxzZSBpZiAoYyA9PT0gMTMpIHsgZW9sID0gdHJ1ZTsgaWYgKHRleHQuY2hhckNvZGVBdChJKSA9PT0gMTApICsrSSwgKytrOyB9IC8vIFxccnxcXHJcXG5cbiAgICAgICAgICBlbHNlIGlmIChjICE9PSBkZWxpbWl0ZXJDb2RlKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4gdGV4dC5zbGljZShqLCBJIC0gayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IGxhc3QgdG9rZW4gYmVmb3JlIEVPRlxuICAgICAgICByZXR1cm4gdGV4dC5zbGljZShqKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKCh0ID0gdG9rZW4oKSkgIT09IEVPRikge1xuICAgICAgICB2YXIgYSA9IFtdO1xuICAgICAgICB3aGlsZSAodCAhPT0gRU9MICYmIHQgIT09IEVPRikge1xuICAgICAgICAgIGEucHVzaCh0KTtcbiAgICAgICAgICB0ID0gdG9rZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZiAmJiAoYSA9IGYoYSwgbisrKSkgPT0gbnVsbCkgY29udGludWU7XG4gICAgICAgIHJvd3MucHVzaChhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtYXQgPSBmdW5jdGlvbihyb3dzLCBjb2x1bW5zKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIGNvbHVtbnMgPSBpbmZlckNvbHVtbnMocm93cyk7XG4gICAgICByZXR1cm4gW2NvbHVtbnMubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcildLmNvbmNhdChyb3dzLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgcmV0dXJuIGNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgICAgIHJldHVybiBmb3JtYXRWYWx1ZShyb3dbY29sdW1uXSk7XG4gICAgICAgIH0pLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIH0pKS5qb2luKFwiXFxuXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmZvcm1hdFJvd3MgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRSb3cocm93KSB7XG4gICAgICByZXR1cm4gcm93Lm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHRleHQpIHtcbiAgICAgIHJldHVybiByZUZvcm1hdC50ZXN0KHRleHQpID8gXCJcXFwiXCIgKyB0ZXh0LnJlcGxhY2UoL1xcXCIvZywgXCJcXFwiXFxcIlwiKSArIFwiXFxcIlwiIDogdGV4dDtcbiAgICB9XG4gIH07XG5cbiAgZHN2LnByb3RvdHlwZSA9IERzdi5wcm90b3R5cGU7XG5cbiAgdmFyIGNzdiA9IGRzdihcIixcIik7XG4gIHZhciB0c3YgPSBkc3YoXCJcXHRcIik7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuMS4xMVwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMuZHN2ID0gZHN2O1xuICBleHBvcnRzLmNzdiA9IGNzdjtcbiAgZXhwb3J0cy50c3YgPSB0c3Y7XG5cbn0pKTsiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKCdkMy1mb3JtYXQnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfZm9ybWF0ID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbiAgLy8gc2lnbmlmaWNhbnQgZGlnaXRzIHAsIHdoZXJlIHggaXMgcG9zaXRpdmUgYW5kIHAgaXMgaW4gWzEsIDIxXSBvciB1bmRlZmluZWQuXG4gIC8vIEZvciBleGFtcGxlLCBmb3JtYXREZWNpbWFsKDEuMjMpIHJldHVybnMgW1wiMTIzXCIsIDBdLlxuICBmdW5jdGlvbiBmb3JtYXREZWNpbWFsKHgsIHApIHtcbiAgICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgICB2YXIgaSwgY29lZmZpY2llbnQgPSB4LnNsaWNlKDAsIGkpO1xuXG4gICAgLy8gVGhlIHN0cmluZyByZXR1cm5lZCBieSB0b0V4cG9uZW50aWFsIGVpdGhlciBoYXMgdGhlIGZvcm0gXFxkXFwuXFxkK2VbLStdXFxkK1xuICAgIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gICAgcmV0dXJuIFtcbiAgICAgIGNvZWZmaWNpZW50Lmxlbmd0aCA+IDEgPyBjb2VmZmljaWVudFswXSArIGNvZWZmaWNpZW50LnNsaWNlKDIpIDogY29lZmZpY2llbnQsXG4gICAgICAreC5zbGljZShpICsgMSlcbiAgICBdO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGV4cG9uZW50KHgpIHtcbiAgICByZXR1cm4geCA9IGZvcm1hdERlY2ltYWwoTWF0aC5hYnMoeCkpLCB4ID8geFsxXSA6IE5hTjtcbiAgfTtcblxuICBmdW5jdGlvbiBmb3JtYXRHcm91cChncm91cGluZywgdGhvdXNhbmRzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGgsXG4gICAgICAgICAgdCA9IFtdLFxuICAgICAgICAgIGogPSAwLFxuICAgICAgICAgIGcgPSBncm91cGluZ1swXSxcbiAgICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgICAgaWYgKGxlbmd0aCArIGcgKyAxID4gd2lkdGgpIGcgPSBNYXRoLm1heCgxLCB3aWR0aCAtIGxlbmd0aCk7XG4gICAgICAgIHQucHVzaCh2YWx1ZS5zdWJzdHJpbmcoaSAtPSBnLCBpICsgZykpO1xuICAgICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICAgIGcgPSBncm91cGluZ1tqID0gKGogKyAxKSAlIGdyb3VwaW5nLmxlbmd0aF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgcHJlZml4RXhwb25lbnQ7XG5cbiAgZnVuY3Rpb24gZm9ybWF0UHJlZml4QXV0byh4LCBwKSB7XG4gICAgdmFyIGQgPSBmb3JtYXREZWNpbWFsKHgsIHApO1xuICAgIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICAgIHZhciBjb2VmZmljaWVudCA9IGRbMF0sXG4gICAgICAgIGV4cG9uZW50ID0gZFsxXSxcbiAgICAgICAgaSA9IGV4cG9uZW50IC0gKHByZWZpeEV4cG9uZW50ID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQgLyAzKSkpICogMykgKyAxLFxuICAgICAgICBuID0gY29lZmZpY2llbnQubGVuZ3RoO1xuICAgIHJldHVybiBpID09PSBuID8gY29lZmZpY2llbnRcbiAgICAgICAgOiBpID4gbiA/IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGkgLSBuICsgMSkuam9pbihcIjBcIilcbiAgICAgICAgOiBpID4gMCA/IGNvZWZmaWNpZW50LnNsaWNlKDAsIGkpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShpKVxuICAgICAgICA6IFwiMC5cIiArIG5ldyBBcnJheSgxIC0gaSkuam9pbihcIjBcIikgKyBmb3JtYXREZWNpbWFsKHgsIE1hdGgubWF4KDAsIHAgKyBpIC0gMSkpWzBdOyAvLyBsZXNzIHRoYW4gMXkhXG4gIH07XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um91bmRlZCh4LCBwKSB7XG4gICAgdmFyIGQgPSBmb3JtYXREZWNpbWFsKHgsIHApO1xuICAgIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICAgIHZhciBjb2VmZmljaWVudCA9IGRbMF0sXG4gICAgICAgIGV4cG9uZW50ID0gZFsxXTtcbiAgICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgICA6IGNvZWZmaWNpZW50Lmxlbmd0aCA+IGV4cG9uZW50ICsgMSA/IGNvZWZmaWNpZW50LnNsaWNlKDAsIGV4cG9uZW50ICsgMSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGV4cG9uZW50ICsgMSlcbiAgICAgICAgOiBjb2VmZmljaWVudCArIG5ldyBBcnJheShleHBvbmVudCAtIGNvZWZmaWNpZW50Lmxlbmd0aCArIDIpLmpvaW4oXCIwXCIpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdERlZmF1bHQoeCwgcCkge1xuICAgIHggPSB4LnRvUHJlY2lzaW9uKHApO1xuXG4gICAgb3V0OiBmb3IgKHZhciBuID0geC5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgICAgc3dpdGNoICh4W2ldKSB7XG4gICAgICAgIGNhc2UgXCIuXCI6IGkwID0gaTEgPSBpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlXCI6IGJyZWFrIG91dDtcbiAgICAgICAgZGVmYXVsdDogaWYgKGkwID4gMCkgaTAgPSAwOyBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaTAgPiAwID8geC5zbGljZSgwLCBpMCkgKyB4LnNsaWNlKGkxICsgMSkgOiB4O1xuICB9O1xuXG4gIHZhciBmb3JtYXRUeXBlcyA9IHtcbiAgICBcIlwiOiBmb3JtYXREZWZhdWx0LFxuICAgIFwiJVwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiAoeCAqIDEwMCkudG9GaXhlZChwKTsgfSxcbiAgICBcImJcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygyKTsgfSxcbiAgICBcImNcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4geCArIFwiXCI7IH0sXG4gICAgXCJkXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTApOyB9LFxuICAgIFwiZVwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiB4LnRvRXhwb25lbnRpYWwocCk7IH0sXG4gICAgXCJmXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9GaXhlZChwKTsgfSxcbiAgICBcImdcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b1ByZWNpc2lvbihwKTsgfSxcbiAgICBcIm9cIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZyg4KTsgfSxcbiAgICBcInBcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKTsgfSxcbiAgICBcInJcIjogZm9ybWF0Um91bmRlZCxcbiAgICBcInNcIjogZm9ybWF0UHJlZml4QXV0byxcbiAgICBcIlhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfSxcbiAgICBcInhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNik7IH1cbiAgfTtcblxuICAvLyBbW2ZpbGxdYWxpZ25dW3NpZ25dW3N5bWJvbF1bMF1bd2lkdGhdWyxdWy5wcmVjaXNpb25dW3R5cGVdXG4gIHZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC1cXCggXSk/KFskI10pPygwKT8oXFxkKyk/KCwpPyhcXC5cXGQrKT8oW2EteiVdKT8kL2k7XG5cbiAgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICAgIHJldHVybiBuZXcgRm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG4gIH07XG5cbiAgZnVuY3Rpb24gRm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICAgIGlmICghKG1hdGNoID0gcmUuZXhlYyhzcGVjaWZpZXIpKSkgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBmb3JtYXQ6IFwiICsgc3BlY2lmaWVyKTtcblxuICAgIHZhciBtYXRjaCxcbiAgICAgICAgZmlsbCA9IG1hdGNoWzFdIHx8IFwiIFwiLFxuICAgICAgICBhbGlnbiA9IG1hdGNoWzJdIHx8IFwiPlwiLFxuICAgICAgICBzaWduID0gbWF0Y2hbM10gfHwgXCItXCIsXG4gICAgICAgIHN5bWJvbCA9IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgIHplcm8gPSAhIW1hdGNoWzVdLFxuICAgICAgICB3aWR0aCA9IG1hdGNoWzZdICYmICttYXRjaFs2XSxcbiAgICAgICAgY29tbWEgPSAhIW1hdGNoWzddLFxuICAgICAgICBwcmVjaXNpb24gPSBtYXRjaFs4XSAmJiArbWF0Y2hbOF0uc2xpY2UoMSksXG4gICAgICAgIHR5cGUgPSBtYXRjaFs5XSB8fCBcIlwiO1xuXG4gICAgLy8gVGhlIFwiblwiIHR5cGUgaXMgYW4gYWxpYXMgZm9yIFwiLGdcIi5cbiAgICBpZiAodHlwZSA9PT0gXCJuXCIpIGNvbW1hID0gdHJ1ZSwgdHlwZSA9IFwiZ1wiO1xuXG4gICAgLy8gTWFwIGludmFsaWQgdHlwZXMgdG8gdGhlIGRlZmF1bHQgZm9ybWF0LlxuICAgIGVsc2UgaWYgKCFmb3JtYXRUeXBlc1t0eXBlXSkgdHlwZSA9IFwiXCI7XG5cbiAgICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgICBpZiAoemVybyB8fCAoZmlsbCA9PT0gXCIwXCIgJiYgYWxpZ24gPT09IFwiPVwiKSkgemVybyA9IHRydWUsIGZpbGwgPSBcIjBcIiwgYWxpZ24gPSBcIj1cIjtcblxuICAgIHRoaXMuZmlsbCA9IGZpbGw7XG4gICAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICAgIHRoaXMuc2lnbiA9IHNpZ247XG4gICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XG4gICAgdGhpcy56ZXJvID0gemVybztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5jb21tYSA9IGNvbW1hO1xuICAgIHRoaXMucHJlY2lzaW9uID0gcHJlY2lzaW9uO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsbFxuICAgICAgICArIHRoaXMuYWxpZ25cbiAgICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICAgKyB0aGlzLnN5bWJvbFxuICAgICAgICArICh0aGlzLnplcm8gPyBcIjBcIiA6IFwiXCIpXG4gICAgICAgICsgKHRoaXMud2lkdGggPT0gbnVsbCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICAgICsgKHRoaXMuY29tbWEgPyBcIixcIiA6IFwiXCIpXG4gICAgICAgICsgKHRoaXMucHJlY2lzaW9uID09IG51bGwgPyBcIlwiIDogXCIuXCIgKyBNYXRoLm1heCgwLCB0aGlzLnByZWNpc2lvbiB8IDApKVxuICAgICAgICArIHRoaXMudHlwZTtcbiAgfTtcblxuICB2YXIgcHJlZml4ZXMgPSBbXCJ5XCIsXCJ6XCIsXCJhXCIsXCJmXCIsXCJwXCIsXCJuXCIsXCLCtVwiLFwibVwiLFwiXCIsXCJrXCIsXCJNXCIsXCJHXCIsXCJUXCIsXCJQXCIsXCJFXCIsXCJaXCIsXCJZXCJdO1xuXG4gIGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsZShsb2NhbGUpIHtcbiAgICB2YXIgZ3JvdXAgPSBsb2NhbGUuZ3JvdXBpbmcgJiYgbG9jYWxlLnRob3VzYW5kcyA/IGZvcm1hdEdyb3VwKGxvY2FsZS5ncm91cGluZywgbG9jYWxlLnRob3VzYW5kcykgOiBpZGVudGl0eSxcbiAgICAgICAgY3VycmVuY3kgPSBsb2NhbGUuY3VycmVuY3ksXG4gICAgICAgIGRlY2ltYWwgPSBsb2NhbGUuZGVjaW1hbDtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdChzcGVjaWZpZXIpIHtcbiAgICAgIHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpO1xuXG4gICAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICAgIGFsaWduID0gc3BlY2lmaWVyLmFsaWduLFxuICAgICAgICAgIHNpZ24gPSBzcGVjaWZpZXIuc2lnbixcbiAgICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICAgIHplcm8gPSBzcGVjaWZpZXIuemVybyxcbiAgICAgICAgICB3aWR0aCA9IHNwZWNpZmllci53aWR0aCxcbiAgICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgICBwcmVjaXNpb24gPSBzcGVjaWZpZXIucHJlY2lzaW9uLFxuICAgICAgICAgIHR5cGUgPSBzcGVjaWZpZXIudHlwZTtcblxuICAgICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgICAvLyBGb3IgU0ktcHJlZml4LCB0aGUgc3VmZml4IGlzIGxhemlseSBjb21wdXRlZC5cbiAgICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lbMF0gOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgICAgc3VmZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5WzFdIDogL1slcF0vLnRlc3QodHlwZSkgPyBcIiVcIiA6IFwiXCI7XG5cbiAgICAgIC8vIFdoYXQgZm9ybWF0IGZ1bmN0aW9uIHNob3VsZCB3ZSB1c2U/XG4gICAgICAvLyBJcyB0aGlzIGFuIGludGVnZXIgdHlwZT9cbiAgICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgICB2YXIgZm9ybWF0VHlwZSA9IGZvcm1hdFR5cGVzW3R5cGVdLFxuICAgICAgICAgIG1heWJlU3VmZml4ID0gIXR5cGUgfHwgL1tkZWZncHJzJV0vLnRlc3QodHlwZSk7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAgIC8vIG9yIGNsYW1wIHRoZSBzcGVjaWZpZWQgcHJlY2lzaW9uIHRvIHRoZSBzdXBwb3J0ZWQgcmFuZ2UuXG4gICAgICAvLyBGb3Igc2lnbmlmaWNhbnQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFsxLCAyMV0uXG4gICAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgICBwcmVjaXNpb24gPSBwcmVjaXNpb24gPT0gbnVsbCA/ICh0eXBlID8gNiA6IDEyKVxuICAgICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIHByZWNpc2lvbikpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgICAgdmFsdWVTdWZmaXggPSBzdWZmaXg7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiY1wiKSB7XG4gICAgICAgICAgdmFsdWVTdWZmaXggPSBmb3JtYXRUeXBlKHZhbHVlKSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgICAgICAgIC8vIENvbnZlcnQgbmVnYXRpdmUgdG8gcG9zaXRpdmUsIGFuZCBjb21wdXRlIHRoZSBwcmVmaXguXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IC0wIGlzIG5vdCBsZXNzIHRoYW4gMCwgYnV0IDEgLyAtMCBpcyFcbiAgICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9ICh2YWx1ZSA8IDAgfHwgMSAvIHZhbHVlIDwgMCkgJiYgKHZhbHVlICo9IC0xLCB0cnVlKTtcblxuICAgICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgICB2YWx1ZSA9IGZvcm1hdFR5cGUodmFsdWUsIHByZWNpc2lvbik7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgb3JpZ2luYWwgdmFsdWUgd2FzIG5lZ2F0aXZlLCBpdCBtYXkgYmUgcm91bmRlZCB0byB6ZXJvIGR1cmluZ1xuICAgICAgICAgIC8vIGZvcm1hdHRpbmc7IHRyZWF0IHRoaXMgYXMgKHBvc2l0aXZlKSB6ZXJvLlxuICAgICAgICAgIGlmICh2YWx1ZU5lZ2F0aXZlKSB7XG4gICAgICAgICAgICB2YXIgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoLCBjO1xuICAgICAgICAgICAgdmFsdWVOZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICAgICAgaWYgKGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpLCAoNDggPCBjICYmIGMgPCA1OClcbiAgICAgICAgICAgICAgICAgIHx8ICh0eXBlID09PSBcInhcIiAmJiA5NiA8IGMgJiYgYyA8IDEwMylcbiAgICAgICAgICAgICAgICAgIHx8ICh0eXBlID09PSBcIlhcIiAmJiA2NCA8IGMgJiYgYyA8IDcxKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlTmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgICAgICAgdmFsdWVQcmVmaXggPSAodmFsdWVOZWdhdGl2ZSA/IChzaWduID09PSBcIihcIiA/IHNpZ24gOiBcIi1cIikgOiBzaWduID09PSBcIi1cIiB8fCBzaWduID09PSBcIihcIiA/IFwiXCIgOiBzaWduKSArIHZhbHVlUHJlZml4O1xuICAgICAgICAgIHZhbHVlU3VmZml4ID0gdmFsdWVTdWZmaXggKyAodHlwZSA9PT0gXCJzXCIgPyBwcmVmaXhlc1s4ICsgcHJlZml4RXhwb25lbnQgLyAzXSA6IFwiXCIpICsgKHZhbHVlTmVnYXRpdmUgJiYgc2lnbiA9PT0gXCIoXCIgPyBcIilcIiA6IFwiXCIpO1xuXG4gICAgICAgICAgLy8gQnJlYWsgdGhlIGZvcm1hdHRlZCB2YWx1ZSBpbnRvIHRoZSBpbnRlZ2VyIOKAnHZhbHVl4oCdIHBhcnQgdGhhdCBjYW4gYmVcbiAgICAgICAgICAvLyBncm91cGVkLCBhbmQgZnJhY3Rpb25hbCBvciBleHBvbmVudGlhbCDigJxzdWZmaXjigJ0gcGFydCB0aGF0IGlzIG5vdC5cbiAgICAgICAgICBpZiAobWF5YmVTdWZmaXgpIHtcbiAgICAgICAgICAgIHZhciBpID0gLTEsIG4gPSB2YWx1ZS5sZW5ndGgsIGM7XG4gICAgICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IChjID09PSA0NiA/IGRlY2ltYWwgKyB2YWx1ZS5zbGljZShpICsgMSkgOiB2YWx1ZS5zbGljZShpKSkgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIG5vdCBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBiZWZvcmUgcGFkZGluZy5cbiAgICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcGFkZGluZy5cbiAgICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlUHJlZml4Lmxlbmd0aCArIHZhbHVlLmxlbmd0aCArIHZhbHVlU3VmZml4Lmxlbmd0aCxcbiAgICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIElmIHRoZSBmaWxsIGNoYXJhY3RlciBpcyBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBhZnRlciBwYWRkaW5nLlxuICAgICAgICBpZiAoY29tbWEgJiYgemVybykgdmFsdWUgPSBncm91cChwYWRkaW5nICsgdmFsdWUsIHBhZGRpbmcubGVuZ3RoID8gd2lkdGggLSB2YWx1ZVN1ZmZpeC5sZW5ndGggOiBJbmZpbml0eSksIHBhZGRpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgICAgICAgY2FzZSBcIjxcIjogcmV0dXJuIHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7XG4gICAgICAgICAgY2FzZSBcIj1cIjogcmV0dXJuIHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgY2FzZSBcIl5cIjogcmV0dXJuIHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFByZWZpeChzcGVjaWZpZXIsIHZhbHVlKSB7XG4gICAgICB2YXIgZiA9IGZvcm1hdCgoc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllciksIHNwZWNpZmllci50eXBlID0gXCJmXCIsIHNwZWNpZmllcikpLFxuICAgICAgICAgIGUgPSBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyxcbiAgICAgICAgICBrID0gTWF0aC5wb3coMTAsIC1lKSxcbiAgICAgICAgICBwcmVmaXggPSBwcmVmaXhlc1s4ICsgZSAvIDNdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmKGsgKiB2YWx1ZSkgKyBwcmVmaXg7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgIGZvcm1hdFByZWZpeDogZm9ybWF0UHJlZml4XG4gICAgfTtcbiAgfTtcblxuICB2YXIgZGVmYXVsdExvY2FsZSA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIuXCIsXG4gICAgdGhvdXNhbmRzOiBcIixcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCIkXCIsIFwiXCJdXG4gIH0pO1xuXG4gIHZhciBjYUVTID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBkZUNIID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiJ1wiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEwQ0hGXCJdXG4gIH0pO1xuXG4gIHZhciBkZURFID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBlbkNBID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGVuR0IgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiwqNcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGVzRVMgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbiAgfSk7XG5cbiAgdmFyIGZpRkkgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBmckNBID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCIkXCJdXG4gIH0pO1xuXG4gIHZhciBmckZSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBoZUlMID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCqlwiLCBcIlwiXVxuICB9KTtcblxuICB2YXIgaHVIVSA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIlxceGEwXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTBGdFwiXVxuICB9KTtcblxuICB2YXIgaXRJVCA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCLigqxcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGphSlAgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwi5YaGXCJdXG4gIH0pO1xuXG4gIHZhciBrb0tSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCqVwiLCBcIlwiXVxuICB9KTtcblxuICB2YXIgbWtNSyA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNC00LXQvS5cIl1cbiAgfSk7XG5cbiAgdmFyIG5sTkwgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wi4oKsXFx4YTBcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIHBsUEwgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiesWCXCJdXG4gIH0pO1xuXG4gIHZhciBwdEJSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlIkXCIsIFwiXCJdXG4gIH0pO1xuXG4gIHZhciBydVJVID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNGA0YPQsS5cIl1cbiAgfSk7XG5cbiAgdmFyIHN2U0UgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlNFS1wiXVxuICB9KTtcblxuICB2YXIgemhDTiA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIuXCIsXG4gICAgdGhvdXNhbmRzOiBcIixcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCLCpVwiLCBcIlwiXVxuICB9KTtcblxuICBmdW5jdGlvbiBwcmVjaXNpb25GaXhlZChzdGVwKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIC1leHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHByZWNpc2lvblByZWZpeChzdGVwLCB2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyAtIGV4cG9uZW50KE1hdGguYWJzKHN0ZXApKSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHJlY2lzaW9uUm91bmQoc3RlcCwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGV4cG9uZW50KE1hdGguYWJzKG1heCkpIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKSArIDE7XG4gIH07XG5cbiAgdmFyIGZvcm1hdCA9IGRlZmF1bHRMb2NhbGUuZm9ybWF0O1xuICB2YXIgZm9ybWF0UHJlZml4ID0gZGVmYXVsdExvY2FsZS5mb3JtYXRQcmVmaXg7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuNC4wXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXQ7XG4gIGV4cG9ydHMuZm9ybWF0UHJlZml4ID0gZm9ybWF0UHJlZml4O1xuICBleHBvcnRzLmxvY2FsZSA9IGxvY2FsZTtcbiAgZXhwb3J0cy5sb2NhbGVDYUVzID0gY2FFUztcbiAgZXhwb3J0cy5sb2NhbGVEZUNoID0gZGVDSDtcbiAgZXhwb3J0cy5sb2NhbGVEZURlID0gZGVERTtcbiAgZXhwb3J0cy5sb2NhbGVFbkNhID0gZW5DQTtcbiAgZXhwb3J0cy5sb2NhbGVFbkdiID0gZW5HQjtcbiAgZXhwb3J0cy5sb2NhbGVFblVzID0gZGVmYXVsdExvY2FsZTtcbiAgZXhwb3J0cy5sb2NhbGVFc0VzID0gZXNFUztcbiAgZXhwb3J0cy5sb2NhbGVGaUZpID0gZmlGSTtcbiAgZXhwb3J0cy5sb2NhbGVGckNhID0gZnJDQTtcbiAgZXhwb3J0cy5sb2NhbGVGckZyID0gZnJGUjtcbiAgZXhwb3J0cy5sb2NhbGVIZUlsID0gaGVJTDtcbiAgZXhwb3J0cy5sb2NhbGVIdUh1ID0gaHVIVTtcbiAgZXhwb3J0cy5sb2NhbGVJdEl0ID0gaXRJVDtcbiAgZXhwb3J0cy5sb2NhbGVKYUpwID0gamFKUDtcbiAgZXhwb3J0cy5sb2NhbGVLb0tyID0ga29LUjtcbiAgZXhwb3J0cy5sb2NhbGVNa01rID0gbWtNSztcbiAgZXhwb3J0cy5sb2NhbGVObE5sID0gbmxOTDtcbiAgZXhwb3J0cy5sb2NhbGVQbFBsID0gcGxQTDtcbiAgZXhwb3J0cy5sb2NhbGVQdEJyID0gcHRCUjtcbiAgZXhwb3J0cy5sb2NhbGVSdVJ1ID0gcnVSVTtcbiAgZXhwb3J0cy5sb2NhbGVTdlNlID0gc3ZTRTtcbiAgZXhwb3J0cy5sb2NhbGVaaENuID0gemhDTjtcbiAgZXhwb3J0cy5mb3JtYXRTcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXI7XG4gIGV4cG9ydHMucHJlY2lzaW9uRml4ZWQgPSBwcmVjaXNpb25GaXhlZDtcbiAgZXhwb3J0cy5wcmVjaXNpb25QcmVmaXggPSBwcmVjaXNpb25QcmVmaXg7XG4gIGV4cG9ydHMucHJlY2lzaW9uUm91bmQgPSBwcmVjaXNpb25Sb3VuZDtcblxufSkpOyIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnZDMtdGltZScpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZS1mb3JtYXQnLCBbJ2V4cG9ydHMnLCAnZDMtdGltZSddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lX2Zvcm1hdCA9IHt9KSxnbG9iYWwuZDNfdGltZSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLGQzVGltZSkgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gbG9jYWxEYXRlKGQpIHtcbiAgICBpZiAoMCA8PSBkLnkgJiYgZC55IDwgMTAwKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKC0xLCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKTtcbiAgICAgIGRhdGUuc2V0RnVsbFllYXIoZC55KTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoZC55LCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHV0Y0RhdGUoZCkge1xuICAgIGlmICgwIDw9IGQueSAmJiBkLnkgPCAxMDApIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZC55KTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoZC55LCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKSk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXdZZWFyKHkpIHtcbiAgICByZXR1cm4ge3k6IHksIG06IDAsIGQ6IDEsIEg6IDAsIE06IDAsIFM6IDAsIEw6IDB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxlJDEobG9jYWxlKSB7XG4gICAgdmFyIGxvY2FsZV9kYXRlVGltZSA9IGxvY2FsZS5kYXRlVGltZSxcbiAgICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgICAgbG9jYWxlX3RpbWUgPSBsb2NhbGUudGltZSxcbiAgICAgICAgbG9jYWxlX3BlcmlvZHMgPSBsb2NhbGUucGVyaW9kcyxcbiAgICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICAgIGxvY2FsZV9zaG9ydFdlZWtkYXlzID0gbG9jYWxlLnNob3J0RGF5cyxcbiAgICAgICAgbG9jYWxlX21vbnRocyA9IGxvY2FsZS5tb250aHMsXG4gICAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICAgIHZhciBwZXJpb2RSZSA9IGZvcm1hdFJlKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgcGVyaW9kTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgd2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3dlZWtkYXlzKSxcbiAgICAgICAgd2Vla2RheUxvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfd2Vla2RheXMpLFxuICAgICAgICBzaG9ydFdlZWtkYXlSZSA9IGZvcm1hdFJlKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgc2hvcnRXZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgbW9udGhSZSA9IGZvcm1hdFJlKGxvY2FsZV9tb250aHMpLFxuICAgICAgICBtb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfbW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aFJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0TW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfc2hvcnRNb250aHMpO1xuXG4gICAgdmFyIGZvcm1hdHMgPSB7XG4gICAgICBcImFcIjogZm9ybWF0U2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IGZvcm1hdFdlZWtkYXksXG4gICAgICBcImJcIjogZm9ybWF0U2hvcnRNb250aCxcbiAgICAgIFwiQlwiOiBmb3JtYXRNb250aCxcbiAgICAgIFwiY1wiOiBudWxsLFxuICAgICAgXCJkXCI6IGZvcm1hdERheU9mTW9udGgsXG4gICAgICBcImVcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICAgIFwiSFwiOiBmb3JtYXRIb3VyMjQsXG4gICAgICBcIklcIjogZm9ybWF0SG91cjEyLFxuICAgICAgXCJqXCI6IGZvcm1hdERheU9mWWVhcixcbiAgICAgIFwiTFwiOiBmb3JtYXRNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogZm9ybWF0TW9udGhOdW1iZXIsXG4gICAgICBcIk1cIjogZm9ybWF0TWludXRlcyxcbiAgICAgIFwicFwiOiBmb3JtYXRQZXJpb2QsXG4gICAgICBcIlNcIjogZm9ybWF0U2Vjb25kcyxcbiAgICAgIFwiVVwiOiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5LFxuICAgICAgXCJ3XCI6IGZvcm1hdFdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogZm9ybWF0V2Vla051bWJlck1vbmRheSxcbiAgICAgIFwieFwiOiBudWxsLFxuICAgICAgXCJYXCI6IG51bGwsXG4gICAgICBcInlcIjogZm9ybWF0WWVhcixcbiAgICAgIFwiWVwiOiBmb3JtYXRGdWxsWWVhcixcbiAgICAgIFwiWlwiOiBmb3JtYXRab25lLFxuICAgICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gICAgfTtcblxuICAgIHZhciB1dGNGb3JtYXRzID0ge1xuICAgICAgXCJhXCI6IGZvcm1hdFVUQ1Nob3J0V2Vla2RheSxcbiAgICAgIFwiQVwiOiBmb3JtYXRVVENXZWVrZGF5LFxuICAgICAgXCJiXCI6IGZvcm1hdFVUQ1Nob3J0TW9udGgsXG4gICAgICBcIkJcIjogZm9ybWF0VVRDTW9udGgsXG4gICAgICBcImNcIjogbnVsbCxcbiAgICAgIFwiZFwiOiBmb3JtYXRVVENEYXlPZk1vbnRoLFxuICAgICAgXCJlXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgICBcIkhcIjogZm9ybWF0VVRDSG91cjI0LFxuICAgICAgXCJJXCI6IGZvcm1hdFVUQ0hvdXIxMixcbiAgICAgIFwialwiOiBmb3JtYXRVVENEYXlPZlllYXIsXG4gICAgICBcIkxcIjogZm9ybWF0VVRDTWlsbGlzZWNvbmRzLFxuICAgICAgXCJtXCI6IGZvcm1hdFVUQ01vbnRoTnVtYmVyLFxuICAgICAgXCJNXCI6IGZvcm1hdFVUQ01pbnV0ZXMsXG4gICAgICBcInBcIjogZm9ybWF0VVRDUGVyaW9kLFxuICAgICAgXCJTXCI6IGZvcm1hdFVUQ1NlY29uZHMsXG4gICAgICBcIlVcIjogZm9ybWF0VVRDV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyLFxuICAgICAgXCJXXCI6IGZvcm1hdFVUQ1dlZWtOdW1iZXJNb25kYXksXG4gICAgICBcInhcIjogbnVsbCxcbiAgICAgIFwiWFwiOiBudWxsLFxuICAgICAgXCJ5XCI6IGZvcm1hdFVUQ1llYXIsXG4gICAgICBcIllcIjogZm9ybWF0VVRDRnVsbFllYXIsXG4gICAgICBcIlpcIjogZm9ybWF0VVRDWm9uZSxcbiAgICAgIFwiJVwiOiBmb3JtYXRMaXRlcmFsUGVyY2VudFxuICAgIH07XG5cbiAgICB2YXIgcGFyc2VzID0ge1xuICAgICAgXCJhXCI6IHBhcnNlU2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IHBhcnNlV2Vla2RheSxcbiAgICAgIFwiYlwiOiBwYXJzZVNob3J0TW9udGgsXG4gICAgICBcIkJcIjogcGFyc2VNb250aCxcbiAgICAgIFwiY1wiOiBwYXJzZUxvY2FsZURhdGVUaW1lLFxuICAgICAgXCJkXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICAgIFwiZVwiOiBwYXJzZURheU9mTW9udGgsXG4gICAgICBcIkhcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcIklcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcImpcIjogcGFyc2VEYXlPZlllYXIsXG4gICAgICBcIkxcIjogcGFyc2VNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogcGFyc2VNb250aE51bWJlcixcbiAgICAgIFwiTVwiOiBwYXJzZU1pbnV0ZXMsXG4gICAgICBcInBcIjogcGFyc2VQZXJpb2QsXG4gICAgICBcIlNcIjogcGFyc2VTZWNvbmRzLFxuICAgICAgXCJVXCI6IHBhcnNlV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBwYXJzZVdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogcGFyc2VXZWVrTnVtYmVyTW9uZGF5LFxuICAgICAgXCJ4XCI6IHBhcnNlTG9jYWxlRGF0ZSxcbiAgICAgIFwiWFwiOiBwYXJzZUxvY2FsZVRpbWUsXG4gICAgICBcInlcIjogcGFyc2VZZWFyLFxuICAgICAgXCJZXCI6IHBhcnNlRnVsbFllYXIsXG4gICAgICBcIlpcIjogcGFyc2Vab25lLFxuICAgICAgXCIlXCI6IHBhcnNlTGl0ZXJhbFBlcmNlbnRcbiAgICB9O1xuXG4gICAgLy8gVGhlc2UgcmVjdXJzaXZlIGRpcmVjdGl2ZSBkZWZpbml0aW9ucyBtdXN0IGJlIGRlZmVycmVkLlxuICAgIGZvcm1hdHMueCA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZSwgZm9ybWF0cyk7XG4gICAgZm9ybWF0cy5YID0gbmV3Rm9ybWF0KGxvY2FsZV90aW1lLCBmb3JtYXRzKTtcbiAgICBmb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCBmb3JtYXRzKTtcbiAgICB1dGNGb3JtYXRzLnggPSBuZXdGb3JtYXQobG9jYWxlX2RhdGUsIHV0Y0Zvcm1hdHMpO1xuICAgIHV0Y0Zvcm1hdHMuWCA9IG5ld0Zvcm1hdChsb2NhbGVfdGltZSwgdXRjRm9ybWF0cyk7XG4gICAgdXRjRm9ybWF0cy5jID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlVGltZSwgdXRjRm9ybWF0cyk7XG5cbiAgICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyLCBmb3JtYXRzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB2YXIgc3RyaW5nID0gW10sXG4gICAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIG4gPSBzcGVjaWZpZXIubGVuZ3RoLFxuICAgICAgICAgICAgYyxcbiAgICAgICAgICAgIHBhZCxcbiAgICAgICAgICAgIGZvcm1hdDtcblxuICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBpZiAoc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSkgPT09IDM3KSB7XG4gICAgICAgICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgICAgICAgaWYgKChwYWQgPSBwYWRzW2MgPSBzcGVjaWZpZXIuY2hhckF0KCsraSldKSAhPSBudWxsKSBjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpO1xuICAgICAgICAgICAgZWxzZSBwYWQgPSBjID09PSBcImVcIiA/IFwiIFwiIDogXCIwXCI7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID0gZm9ybWF0c1tjXSkgYyA9IGZvcm1hdChkYXRlLCBwYWQpO1xuICAgICAgICAgICAgc3RyaW5nLnB1c2goYyk7XG4gICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5nLnB1c2goc3BlY2lmaWVyLnNsaWNlKGosIGkpKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgdmFyIGQgPSBuZXdZZWFyKDE5MDApLFxuICAgICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nICs9IFwiXCIsIDApO1xuICAgICAgICBpZiAoaSAhPSBzdHJpbmcubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyBUaGUgYW0tcG0gZmxhZyBpcyAwIGZvciBBTSwgYW5kIDEgZm9yIFBNLlxuICAgICAgICBpZiAoXCJwXCIgaW4gZCkgZC5IID0gZC5IICUgMTIgKyBkLnAgKiAxMjtcblxuICAgICAgICAvLyBDb252ZXJ0IGRheS1vZi13ZWVrIGFuZCB3ZWVrLW9mLXllYXIgdG8gZGF5LW9mLXllYXIuXG4gICAgICAgIGlmIChcIldcIiBpbiBkIHx8IFwiVVwiIGluIGQpIHtcbiAgICAgICAgICBpZiAoIShcIndcIiBpbiBkKSkgZC53ID0gXCJXXCIgaW4gZCA/IDEgOiAwO1xuICAgICAgICAgIHZhciBkYXkgPSBcIlpcIiBpbiBkID8gdXRjRGF0ZShuZXdZZWFyKGQueSkpLmdldFVUQ0RheSgpIDogbmV3RGF0ZShuZXdZZWFyKGQueSkpLmdldERheSgpO1xuICAgICAgICAgIGQubSA9IDA7XG4gICAgICAgICAgZC5kID0gXCJXXCIgaW4gZCA/IChkLncgKyA2KSAlIDcgKyBkLlcgKiA3IC0gKGRheSArIDUpICUgNyA6IGQudyArIGQuVSAqIDcgLSAoZGF5ICsgNikgJSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYSB0aW1lIHpvbmUgaXMgc3BlY2lmaWVkLCBhbGwgZmllbGRzIGFyZSBpbnRlcnByZXRlZCBhcyBVVEMgYW5kIHRoZW5cbiAgICAgICAgLy8gb2Zmc2V0IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIHRpbWUgem9uZS5cbiAgICAgICAgaWYgKFwiWlwiIGluIGQpIHtcbiAgICAgICAgICBkLkggKz0gZC5aIC8gMTAwIHwgMDtcbiAgICAgICAgICBkLk0gKz0gZC5aICUgMTAwO1xuICAgICAgICAgIHJldHVybiB1dGNEYXRlKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhbGwgZmllbGRzIGFyZSBpbiBsb2NhbCB0aW1lLlxuICAgICAgICByZXR1cm4gbmV3RGF0ZShkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTcGVjaWZpZXIoZCwgc3BlY2lmaWVyLCBzdHJpbmcsIGopIHtcbiAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICBuID0gc3BlY2lmaWVyLmxlbmd0aCxcbiAgICAgICAgICBtID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICBjLFxuICAgICAgICAgIHBhcnNlO1xuXG4gICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgaWYgKGogPj0gbSkgcmV0dXJuIC0xO1xuICAgICAgICBjID0gc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgYyA9IHNwZWNpZmllci5jaGFyQXQoaSsrKTtcbiAgICAgICAgICBwYXJzZSA9IHBhcnNlc1tjIGluIHBhZHMgPyBzcGVjaWZpZXIuY2hhckF0KGkrKykgOiBjXTtcbiAgICAgICAgICBpZiAoIXBhcnNlIHx8ICgoaiA9IHBhcnNlKGQsIHN0cmluZywgaikpIDwgMCkpIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChjICE9IHN0cmluZy5jaGFyQ29kZUF0KGorKykpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQZXJpb2QoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHBlcmlvZFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQucCA9IHBlcmlvZExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydFdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHNob3J0V2Vla2RheVJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQudyA9IHNob3J0V2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSB3ZWVrZGF5UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC53ID0gd2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydE1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSBzaG9ydE1vbnRoUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC5tID0gc2hvcnRNb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHZhciBuID0gbW9udGhSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgICByZXR1cm4gbiA/IChkLm0gPSBtb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfZGF0ZVRpbWUsIHN0cmluZywgaSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlKGQsIHN0cmluZywgaSkge1xuICAgICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV9kYXRlLCBzdHJpbmcsIGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9jYWxlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfdGltZSwgc3RyaW5nLCBpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0RGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldERheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldE1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFBlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldEhvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0VVRDRGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldFVUQ0RheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRVVENNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldFVUQ01vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1BlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldFVUQ0hvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICAgICAgdmFyIGYgPSBuZXdGb3JtYXQoc3BlY2lmaWVyICs9IFwiXCIsIGZvcm1hdHMpO1xuICAgICAgICBmLnBhcnNlID0gbmV3UGFyc2Uoc3BlY2lmaWVyLCBsb2NhbERhdGUpO1xuICAgICAgICBmLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfSxcbiAgICAgIHV0Y0Zvcm1hdDogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICAgIHZhciBmID0gbmV3Rm9ybWF0KHNwZWNpZmllciArPSBcIlwiLCB1dGNGb3JtYXRzKTtcbiAgICAgICAgZi5wYXJzZSA9IG5ld1BhcnNlKHNwZWNpZmllciwgdXRjRGF0ZSk7XG4gICAgICAgIGYudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHNwZWNpZmllcjsgfTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgcGFkcyA9IHtcIi1cIjogXCJcIiwgXCJfXCI6IFwiIFwiLCBcIjBcIjogXCIwXCJ9O1xuICB2YXIgbnVtYmVyUmUgPSAvXlxccypcXGQrLztcbiAgdmFyIHBlcmNlbnRSZSA9IC9eJS87XG4gIHZhciByZXF1b3RlUmUgPSAvW1xcXFxcXF5cXCRcXCpcXCtcXD9cXHxcXFtcXF1cXChcXClcXC5cXHtcXH1dL2c7XG4gIGZ1bmN0aW9uIHBhZCh2YWx1ZSwgZmlsbCwgd2lkdGgpIHtcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgc3RyaW5nID0gKHNpZ24gPyAtdmFsdWUgOiB2YWx1ZSkgKyBcIlwiLFxuICAgICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHJldHVybiBzaWduICsgKGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSArIHN0cmluZyA6IHN0cmluZyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXF1b3RlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKHJlcXVvdGVSZSwgXCJcXFxcJCZcIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSZShuYW1lcykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgbmFtZXMubWFwKHJlcXVvdGUpLmpvaW4oXCJ8XCIpICsgXCIpXCIsIFwiaVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdExvb2t1cChuYW1lcykge1xuICAgIHZhciBtYXAgPSB7fSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBtYXBbbmFtZXNbaV0udG9Mb3dlckNhc2UoKV0gPSBpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtkYXlOdW1iZXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gKGQudyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtOdW1iZXJTdW5kYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5VID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlV2Vla051bWJlck1vbmRheShkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLlcgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VGdWxsWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyA0KSk7XG4gICAgcmV0dXJuIG4gPyAoZC55ID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC55ID0gK25bMF0gKyAoK25bMF0gPiA2OCA/IDE5MDAgOiAyMDAwKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2Vab25lKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gL14oWil8KFsrLV1cXGRcXGQpKD86XFw6PyhcXGRcXGQpKT8vLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyA2KSk7XG4gICAgcmV0dXJuIG4gPyAoZC5aID0gblsxXSA/IDAgOiAtKG5bMl0gKyAoblszXSB8fCBcIjAwXCIpKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VNb250aE51bWJlcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5tID0gblswXSAtIDEsIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRGF5T2ZNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5kID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRGF5T2ZZZWFyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDMpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSAwLCBkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIb3VyMjQoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuSCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1pbnV0ZXMoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuTSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVNlY29uZHMoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuUyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1pbGxpc2Vjb25kcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAzKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5MID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTGl0ZXJhbFBlcmNlbnQoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBwZXJjZW50UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDEpKTtcbiAgICByZXR1cm4gbiA/IGkgKyBuWzBdLmxlbmd0aCA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0RGF5T2ZNb250aChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldERhdGUoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRIb3VyMjQoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRIb3VycygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEhvdXIxMihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEhvdXJzKCkgJSAxMiB8fCAxMiwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXREYXlPZlllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoMSArIGQzVGltZS5kYXkuY291bnQoZDNUaW1lLnllYXIoZCksIGQpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1pbGxpc2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbGxpc2Vjb25kcygpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1vbnRoTnVtYmVyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0TW9udGgoKSArIDEsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TWludXRlcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbnV0ZXMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRTZWNvbmRzKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0U2Vjb25kcygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFdlZWtOdW1iZXJTdW5kYXkoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZDNUaW1lLnN1bmRheS5jb3VudChkM1RpbWUueWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2Vla2RheU51bWJlcihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0RGF5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRXZWVrTnVtYmVyTW9uZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS5tb25kYXkuY291bnQoZDNUaW1lLnllYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEZ1bGxZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0RnVsbFllYXIoKSAlIDEwMDAwLCBwLCA0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFpvbmUoZCkge1xuICAgIHZhciB6ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHJldHVybiAoeiA+IDAgPyBcIi1cIiA6ICh6ICo9IC0xLCBcIitcIikpXG4gICAgICAgICsgcGFkKHogLyA2MCB8IDAsIFwiMFwiLCAyKVxuICAgICAgICArIHBhZCh6ICUgNjAsIFwiMFwiLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0RheU9mTW9udGgoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENEYXRlKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDSG91cjI0KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDSG91cnMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENIb3VyMTIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENIb3VycygpICUgMTIgfHwgMTIsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDRGF5T2ZZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKDEgKyBkM1RpbWUudXRjRGF5LmNvdW50KGQzVGltZS51dGNZZWFyKGQpLCBkKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNaWxsaXNlY29uZHMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaWxsaXNlY29uZHMoKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNb250aE51bWJlcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ01vbnRoKCkgKyAxLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01pbnV0ZXMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaW51dGVzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDU2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ1NlY29uZHMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS51dGNTdW5kYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXlOdW1iZXIoZCkge1xuICAgIHJldHVybiBkLmdldFVUQ0RheSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDV2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkM1RpbWUudXRjTW9uZGF5LmNvdW50KGQzVGltZS51dGNZZWFyKGQpLCBkKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDRnVsbFllYXIoKSAlIDEwMCwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENGdWxsWWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0Z1bGxZZWFyKCkgJSAxMDAwMCwgcCwgNCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENab25lKCkge1xuICAgIHJldHVybiBcIiswMDAwXCI7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRMaXRlcmFsUGVyY2VudCgpIHtcbiAgICByZXR1cm4gXCIlXCI7XG4gIH1cblxuICB2YXIgbG9jYWxlID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gICAgZGF0ZTogXCIlbS8lZC8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxuICB9KTtcblxuICB2YXIgY2FFUyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgZGUgJUIgZGUgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcImRpdW1lbmdlXCIsIFwiZGlsbHVuc1wiLCBcImRpbWFydHNcIiwgXCJkaW1lY3Jlc1wiLCBcImRpam91c1wiLCBcImRpdmVuZHJlc1wiLCBcImRpc3NhYnRlXCJdLFxuICAgIHNob3J0RGF5czogW1wiZGcuXCIsIFwiZGwuXCIsIFwiZHQuXCIsIFwiZGMuXCIsIFwiZGouXCIsIFwiZHYuXCIsIFwiZHMuXCJdLFxuICAgIG1vbnRoczogW1wiZ2VuZXJcIiwgXCJmZWJyZXJcIiwgXCJtYXLDp1wiLCBcImFicmlsXCIsIFwibWFpZ1wiLCBcImp1bnlcIiwgXCJqdWxpb2xcIiwgXCJhZ29zdFwiLCBcInNldGVtYnJlXCIsIFwib2N0dWJyZVwiLCBcIm5vdmVtYnJlXCIsIFwiZGVzZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImdlbi5cIiwgXCJmZWJyLlwiLCBcIm1hcsOnXCIsIFwiYWJyLlwiLCBcIm1haWdcIiwgXCJqdW55XCIsIFwianVsLlwiLCBcImFnLlwiLCBcInNldC5cIiwgXCJvY3QuXCIsIFwibm92LlwiLCBcImRlcy5cIl1cbiAgfSk7XG5cbiAgdmFyIGRlQ0ggPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsIGRlciAlZS4gJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgICBzaG9ydERheXM6IFtcIlNvXCIsIFwiTW9cIiwgXCJEaVwiLCBcIk1pXCIsIFwiRG9cIiwgXCJGclwiLCBcIlNhXCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk3DpHJ6XCIsIFwiQXByaWxcIiwgXCJNYWlcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlemVtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbiAgfSk7XG5cbiAgdmFyIGRlREUgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsIGRlciAlZS4gJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgICBzaG9ydERheXM6IFtcIlNvXCIsIFwiTW9cIiwgXCJEaVwiLCBcIk1pXCIsIFwiRG9cIiwgXCJGclwiLCBcIlNhXCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk3DpHJ6XCIsIFwiQXByaWxcIiwgXCJNYWlcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlemVtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbiAgfSk7XG5cbiAgdmFyIGVuQ0EgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJWEgJWIgJWUgJVggJVlcIixcbiAgICBkYXRlOiBcIiVZLSVtLSVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG4gIH0pO1xuXG4gIHZhciBlbkdCID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICVlICViICVYICVZXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxuICB9KTtcblxuICB2YXIgZXNFUyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgZGUgJUIgZGUgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcImRvbWluZ29cIiwgXCJsdW5lc1wiLCBcIm1hcnRlc1wiLCBcIm1pw6lyY29sZXNcIiwgXCJqdWV2ZXNcIiwgXCJ2aWVybmVzXCIsIFwic8OhYmFkb1wiXSxcbiAgICBzaG9ydERheXM6IFtcImRvbVwiLCBcImx1blwiLCBcIm1hclwiLCBcIm1pw6lcIiwgXCJqdWVcIiwgXCJ2aWVcIiwgXCJzw6FiXCJdLFxuICAgIG1vbnRoczogW1wiZW5lcm9cIiwgXCJmZWJyZXJvXCIsIFwibWFyem9cIiwgXCJhYnJpbFwiLCBcIm1heW9cIiwgXCJqdW5pb1wiLCBcImp1bGlvXCIsIFwiYWdvc3RvXCIsIFwic2VwdGllbWJyZVwiLCBcIm9jdHVicmVcIiwgXCJub3ZpZW1icmVcIiwgXCJkaWNpZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImVuZVwiLCBcImZlYlwiLCBcIm1hclwiLCBcImFiclwiLCBcIm1heVwiLCBcImp1blwiLCBcImp1bFwiLCBcImFnb1wiLCBcInNlcFwiLCBcIm9jdFwiLCBcIm5vdlwiLCBcImRpY1wiXVxuICB9KTtcblxuICB2YXIgZmlGSSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJS1kLiAlQnRhICVZIGtsbyAlWFwiLFxuICAgIGRhdGU6IFwiJS1kLiUtbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJhLm0uXCIsIFwicC5tLlwiXSxcbiAgICBkYXlzOiBbXCJzdW5udW50YWlcIiwgXCJtYWFuYW50YWlcIiwgXCJ0aWlzdGFpXCIsIFwia2Vza2l2aWlra29cIiwgXCJ0b3JzdGFpXCIsIFwicGVyamFudGFpXCIsIFwibGF1YW50YWlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTdVwiLCBcIk1hXCIsIFwiVGlcIiwgXCJLZVwiLCBcIlRvXCIsIFwiUGVcIiwgXCJMYVwiXSxcbiAgICBtb250aHM6IFtcInRhbW1pa3V1XCIsIFwiaGVsbWlrdXVcIiwgXCJtYWFsaXNrdXVcIiwgXCJodWh0aWt1dVwiLCBcInRvdWtva3V1XCIsIFwia2Vzw6RrdXVcIiwgXCJoZWluw6RrdXVcIiwgXCJlbG9rdXVcIiwgXCJzeXlza3V1XCIsIFwibG9rYWt1dVwiLCBcIm1hcnJhc2t1dVwiLCBcImpvdWx1a3V1XCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJUYW1taVwiLCBcIkhlbG1pXCIsIFwiTWFhbGlzXCIsIFwiSHVodGlcIiwgXCJUb3Vrb1wiLCBcIktlc8OkXCIsIFwiSGVpbsOkXCIsIFwiRWxvXCIsIFwiU3l5c1wiLCBcIkxva2FcIiwgXCJNYXJyYXNcIiwgXCJKb3VsdVwiXVxuICB9KTtcblxuICB2YXIgZnJDQSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlYSAlZSAlYiAlWSAlWFwiLFxuICAgIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiXCIsIFwiXCJdLFxuICAgIGRheXM6IFtcImRpbWFuY2hlXCIsIFwibHVuZGlcIiwgXCJtYXJkaVwiLCBcIm1lcmNyZWRpXCIsIFwiamV1ZGlcIiwgXCJ2ZW5kcmVkaVwiLCBcInNhbWVkaVwiXSxcbiAgICBzaG9ydERheXM6IFtcImRpbVwiLCBcImx1blwiLCBcIm1hclwiLCBcIm1lclwiLCBcImpldVwiLCBcInZlblwiLCBcInNhbVwiXSxcbiAgICBtb250aHM6IFtcImphbnZpZXJcIiwgXCJmw6l2cmllclwiLCBcIm1hcnNcIiwgXCJhdnJpbFwiLCBcIm1haVwiLCBcImp1aW5cIiwgXCJqdWlsbGV0XCIsIFwiYW/Du3RcIiwgXCJzZXB0ZW1icmVcIiwgXCJvY3RvYnJlXCIsIFwibm92ZW1icmVcIiwgXCJkw6ljZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImphblwiLCBcImbDqXZcIiwgXCJtYXJcIiwgXCJhdnJcIiwgXCJtYWlcIiwgXCJqdWlcIiwgXCJqdWxcIiwgXCJhb8O7XCIsIFwic2VwXCIsIFwib2N0XCIsIFwibm92XCIsIFwiZMOpY1wiXVxuICB9KTtcblxuICB2YXIgZnJGUiA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgbGUgJWUgJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJkaW1hbmNoZVwiLCBcImx1bmRpXCIsIFwibWFyZGlcIiwgXCJtZXJjcmVkaVwiLCBcImpldWRpXCIsIFwidmVuZHJlZGlcIiwgXCJzYW1lZGlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJkaW0uXCIsIFwibHVuLlwiLCBcIm1hci5cIiwgXCJtZXIuXCIsIFwiamV1LlwiLCBcInZlbi5cIiwgXCJzYW0uXCJdLFxuICAgIG1vbnRoczogW1wiamFudmllclwiLCBcImbDqXZyaWVyXCIsIFwibWFyc1wiLCBcImF2cmlsXCIsIFwibWFpXCIsIFwianVpblwiLCBcImp1aWxsZXRcIiwgXCJhb8O7dFwiLCBcInNlcHRlbWJyZVwiLCBcIm9jdG9icmVcIiwgXCJub3ZlbWJyZVwiLCBcImTDqWNlbWJyZVwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiamFudi5cIiwgXCJmw6l2ci5cIiwgXCJtYXJzXCIsIFwiYXZyLlwiLCBcIm1haVwiLCBcImp1aW5cIiwgXCJqdWlsLlwiLCBcImFvw7t0XCIsIFwic2VwdC5cIiwgXCJvY3QuXCIsIFwibm92LlwiLCBcImTDqWMuXCJdXG4gIH0pO1xuXG4gIHZhciBoZUlMID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlZSDXkSVCICVZICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIteo15DXqdeV159cIiwgXCLXqdeg15lcIiwgXCLXqdec15nXqdeZXCIsIFwi16jXkdeZ16LXmVwiLCBcIteX157Xmdep15lcIiwgXCLXqdeZ16nXmVwiLCBcItep15HXqlwiXSxcbiAgICBzaG9ydERheXM6IFtcIteQ17NcIiwgXCLXkdezXCIsIFwi15LXs1wiLCBcIteT17NcIiwgXCLXlNezXCIsIFwi15XXs1wiLCBcItep17NcIl0sXG4gICAgbW9udGhzOiBbXCLXmdeg15XXkNeoXCIsIFwi16TXkdeo15XXkNeoXCIsIFwi157XqNelXCIsIFwi15DXpNeo15nXnFwiLCBcItee15DXmVwiLCBcIteZ15XXoNeZXCIsIFwi15nXldec15lcIiwgXCLXkNeV15LXldeh15hcIiwgXCLXodek15jXnteR16hcIiwgXCLXkNeV16fXmNeV15HXqFwiLCBcIteg15XXkdee15HXqFwiLCBcIteT16bXnteR16hcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIteZ16DXldezXCIsIFwi16TXkdeo17NcIiwgXCLXnteo16VcIiwgXCLXkNek16jXs1wiLCBcItee15DXmVwiLCBcIteZ15XXoNeZXCIsIFwi15nXldec15lcIiwgXCLXkNeV15LXs1wiLCBcIteh16TXmNezXCIsIFwi15DXlden17NcIiwgXCLXoNeV15HXs1wiLCBcIteT16bXntezXCJdXG4gIH0pO1xuXG4gIHZhciBodUhVID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVZLiAlQiAlLWUuLCAlQSAlWFwiLFxuICAgIGRhdGU6IFwiJVkuICVtLiAlZC5cIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiZGUuXCIsIFwiZHUuXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJ2YXPDoXJuYXBcIiwgXCJow6l0ZsWRXCIsIFwia2VkZFwiLCBcInN6ZXJkYVwiLCBcImNzw7x0w7ZydMO2a1wiLCBcInDDqW50ZWtcIiwgXCJzem9tYmF0XCJdLFxuICAgIHNob3J0RGF5czogW1wiVlwiLCBcIkhcIiwgXCJLXCIsIFwiU3plXCIsIFwiQ3NcIiwgXCJQXCIsIFwiU3pvXCJdLFxuICAgIG1vbnRoczogW1wiamFudcOhclwiLCBcImZlYnJ1w6FyXCIsIFwibcOhcmNpdXNcIiwgXCLDoXByaWxpc1wiLCBcIm3DoWp1c1wiLCBcImrDum5pdXNcIiwgXCJqw7psaXVzXCIsIFwiYXVndXN6dHVzXCIsIFwic3plcHRlbWJlclwiLCBcIm9rdMOzYmVyXCIsIFwibm92ZW1iZXJcIiwgXCJkZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiamFuLlwiLCBcImZlYi5cIiwgXCJtw6FyLlwiLCBcIsOhcHIuXCIsIFwibcOhai5cIiwgXCJqw7puLlwiLCBcImrDumwuXCIsIFwiYXVnLlwiLCBcInN6ZXB0LlwiLCBcIm9rdC5cIiwgXCJub3YuXCIsIFwiZGVjLlwiXVxuICB9KTtcblxuICB2YXIgaXRJVCA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSAlZSAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcIkRvbWVuaWNhXCIsIFwiTHVuZWTDrFwiLCBcIk1hcnRlZMOsXCIsIFwiTWVyY29sZWTDrFwiLCBcIkdpb3ZlZMOsXCIsIFwiVmVuZXJkw6xcIiwgXCJTYWJhdG9cIl0sXG4gICAgc2hvcnREYXlzOiBbXCJEb21cIiwgXCJMdW5cIiwgXCJNYXJcIiwgXCJNZXJcIiwgXCJHaW9cIiwgXCJWZW5cIiwgXCJTYWJcIl0sXG4gICAgbW9udGhzOiBbXCJHZW5uYWlvXCIsIFwiRmViYnJhaW9cIiwgXCJNYXJ6b1wiLCBcIkFwcmlsZVwiLCBcIk1hZ2dpb1wiLCBcIkdpdWdub1wiLCBcIkx1Z2xpb1wiLCBcIkFnb3N0b1wiLCBcIlNldHRlbWJyZVwiLCBcIk90dG9icmVcIiwgXCJOb3ZlbWJyZVwiLCBcIkRpY2VtYnJlXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJHZW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYWdcIiwgXCJHaXVcIiwgXCJMdWdcIiwgXCJBZ29cIiwgXCJTZXRcIiwgXCJPdHRcIiwgXCJOb3ZcIiwgXCJEaWNcIl1cbiAgfSk7XG5cbiAgdmFyIGphSlAgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJVkgJWIgJWUgJWEgJVhcIixcbiAgICBkYXRlOiBcIiVZLyVtLyVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wi5pel5puc5pelXCIsIFwi5pyI5puc5pelXCIsIFwi54Gr5puc5pelXCIsIFwi5rC05puc5pelXCIsIFwi5pyo5puc5pelXCIsIFwi6YeR5puc5pelXCIsIFwi5Zyf5puc5pelXCJdLFxuICAgIHNob3J0RGF5czogW1wi5pelXCIsIFwi5pyIXCIsIFwi54GrXCIsIFwi5rC0XCIsIFwi5pyoXCIsIFwi6YeRXCIsIFwi5ZyfXCJdLFxuICAgIG1vbnRoczogW1wi552m5pyIXCIsIFwi5aaC5pyIXCIsIFwi5byl55SfXCIsIFwi5Y2v5pyIXCIsIFwi55qQ5pyIXCIsIFwi5rC054Sh5pyIXCIsIFwi5paH5pyIXCIsIFwi6JGJ5pyIXCIsIFwi6ZW35pyIXCIsIFwi56We54Sh5pyIXCIsIFwi6Zyc5pyIXCIsIFwi5bir6LWwXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCIx5pyIXCIsIFwiMuaciFwiLCBcIjPmnIhcIiwgXCI05pyIXCIsIFwiNeaciFwiLCBcIjbmnIhcIiwgXCI35pyIXCIsIFwiOOaciFwiLCBcIjnmnIhcIiwgXCIxMOaciFwiLCBcIjEx5pyIXCIsIFwiMTLmnIhcIl1cbiAgfSk7XG5cbiAgdmFyIGtvS1IgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJVkvJW0vJWQgJWEgJVhcIixcbiAgICBkYXRlOiBcIiVZLyVtLyVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIuyYpOyghFwiLCBcIuyYpO2bhFwiXSxcbiAgICBkYXlzOiBbXCLsnbzsmpTsnbxcIiwgXCLsm5TsmpTsnbxcIiwgXCLtmZTsmpTsnbxcIiwgXCLsiJjsmpTsnbxcIiwgXCLrqqnsmpTsnbxcIiwgXCLquIjsmpTsnbxcIiwgXCLthqDsmpTsnbxcIl0sXG4gICAgc2hvcnREYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIl0sXG4gICAgbW9udGhzOiBbXCIx7JuUXCIsIFwiMuyblFwiLCBcIjPsm5RcIiwgXCI07JuUXCIsIFwiNeyblFwiLCBcIjbsm5RcIiwgXCI37JuUXCIsIFwiOOyblFwiLCBcIjnsm5RcIiwgXCIxMOyblFwiLCBcIjEx7JuUXCIsIFwiMTLsm5RcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIjHsm5RcIiwgXCIy7JuUXCIsIFwiM+yblFwiLCBcIjTsm5RcIiwgXCI17JuUXCIsIFwiNuyblFwiLCBcIjfsm5RcIiwgXCI47JuUXCIsIFwiOeyblFwiLCBcIjEw7JuUXCIsIFwiMTHsm5RcIiwgXCIxMuyblFwiXVxuICB9KTtcblxuICB2YXIgbWtNSyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgJUIgJVkg0LMuICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcItC90LXQtNC10LvQsFwiLCBcItC/0L7QvdC10LTQtdC70L3QuNC6XCIsIFwi0LLRgtC+0YDQvdC40LpcIiwgXCLRgdGA0LXQtNCwXCIsIFwi0YfQtdGC0LLRgNGC0L7QulwiLCBcItC/0LXRgtC+0LpcIiwgXCLRgdCw0LHQvtGC0LBcIl0sXG4gICAgc2hvcnREYXlzOiBbXCLQvdC10LRcIiwgXCLQv9C+0L1cIiwgXCLQstGC0L5cIiwgXCLRgdGA0LVcIiwgXCLRh9C10YJcIiwgXCLQv9C10YJcIiwgXCLRgdCw0LFcIl0sXG4gICAgbW9udGhzOiBbXCLRmNCw0L3Rg9Cw0YDQuFwiLCBcItGE0LXQstGA0YPQsNGA0LhcIiwgXCLQvNCw0YDRglwiLCBcItCw0L/RgNC40LtcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L3QuFwiLCBcItGY0YPQu9C4XCIsIFwi0LDQstCz0YPRgdGCXCIsIFwi0YHQtdC/0YLQtdC80LLRgNC4XCIsIFwi0L7QutGC0L7QvNCy0YDQuFwiLCBcItC90L7QtdC80LLRgNC4XCIsIFwi0LTQtdC60LXQvNCy0YDQuFwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wi0ZjQsNC9XCIsIFwi0YTQtdCyXCIsIFwi0LzQsNGAXCIsIFwi0LDQv9GAXCIsIFwi0LzQsNGYXCIsIFwi0ZjRg9C9XCIsIFwi0ZjRg9C7XCIsIFwi0LDQstCzXCIsIFwi0YHQtdC/XCIsIFwi0L7QutGCXCIsIFwi0L3QvtC1XCIsIFwi0LTQtdC6XCJdXG4gIH0pO1xuXG4gIHZhciBubE5MID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICVlICVCICVZICVUXCIsXG4gICAgZGF0ZTogXCIlZC0lbS0lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJ6b25kYWdcIiwgXCJtYWFuZGFnXCIsIFwiZGluc2RhZ1wiLCBcIndvZW5zZGFnXCIsIFwiZG9uZGVyZGFnXCIsIFwidnJpamRhZ1wiLCBcInphdGVyZGFnXCJdLFxuICAgIHNob3J0RGF5czogW1wiem9cIiwgXCJtYVwiLCBcImRpXCIsIFwid29cIiwgXCJkb1wiLCBcInZyXCIsIFwiemFcIl0sXG4gICAgbW9udGhzOiBbXCJqYW51YXJpXCIsIFwiZmVicnVhcmlcIiwgXCJtYWFydFwiLCBcImFwcmlsXCIsIFwibWVpXCIsIFwianVuaVwiLCBcImp1bGlcIiwgXCJhdWd1c3R1c1wiLCBcInNlcHRlbWJlclwiLCBcIm9rdG9iZXJcIiwgXCJub3ZlbWJlclwiLCBcImRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJqYW5cIiwgXCJmZWJcIiwgXCJtcnRcIiwgXCJhcHJcIiwgXCJtZWlcIiwgXCJqdW5cIiwgXCJqdWxcIiwgXCJhdWdcIiwgXCJzZXBcIiwgXCJva3RcIiwgXCJub3ZcIiwgXCJkZWNcIl1cbiAgfSk7XG5cbiAgdmFyIHBsUEwgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlICVCICVZLCAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSwgLy8gdW51c2VkXG4gICAgZGF5czogW1wiTmllZHppZWxhXCIsIFwiUG9uaWVkemlhxYJla1wiLCBcIld0b3Jla1wiLCBcIsWacm9kYVwiLCBcIkN6d2FydGVrXCIsIFwiUGnEhXRla1wiLCBcIlNvYm90YVwiXSxcbiAgICBzaG9ydERheXM6IFtcIk5pZWR6LlwiLCBcIlBvbi5cIiwgXCJXdC5cIiwgXCLFmnIuXCIsIFwiQ3p3LlwiLCBcIlB0LlwiLCBcIlNvYi5cIl0sXG4gICAgbW9udGhzOiBbXCJTdHljemXFhFwiLCBcIkx1dHlcIiwgXCJNYXJ6ZWNcIiwgXCJLd2llY2llxYRcIiwgXCJNYWpcIiwgXCJDemVyd2llY1wiLCBcIkxpcGllY1wiLCBcIlNpZXJwaWXFhFwiLCBcIldyemVzaWXFhFwiLCBcIlBhxbpkemllcm5pa1wiLCBcIkxpc3RvcGFkXCIsIFwiR3J1ZHppZcWEXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJTdHljei5cIiwgXCJMdXR5XCIsIFwiTWFyei5cIiwgXCJLd2llLlwiLCBcIk1halwiLCBcIkN6ZXJ3LlwiLCBcIkxpcGMuXCIsIFwiU2llcnAuXCIsIFwiV3J6LlwiLCBcIlBhxbpkei5cIiwgXCJMaXN0b3AuXCIsIFwiR3J1ZHouXCJdLyogSW4gUG9saXNoIGxhbmd1YWdlIGFiYnJhdmlhdGVkIG1vbnRocyBhcmUgbm90IGNvbW1vbmx5IHVzZWQgc28gdGhlcmUgaXMgYSBkaXNwdXRlIGFib3V0IHRoZSBwcm9wZXIgYWJicmF2aWF0aW9ucy4gKi9cbiAgfSk7XG5cbiAgdmFyIHB0QlIgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlIGRlICVCIGRlICVZLiAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJEb21pbmdvXCIsIFwiU2VndW5kYVwiLCBcIlRlcsOnYVwiLCBcIlF1YXJ0YVwiLCBcIlF1aW50YVwiLCBcIlNleHRhXCIsIFwiU8OhYmFkb1wiXSxcbiAgICBzaG9ydERheXM6IFtcIkRvbVwiLCBcIlNlZ1wiLCBcIlRlclwiLCBcIlF1YVwiLCBcIlF1aVwiLCBcIlNleFwiLCBcIlPDoWJcIl0sXG4gICAgbW9udGhzOiBbXCJKYW5laXJvXCIsIFwiRmV2ZXJlaXJvXCIsIFwiTWFyw6dvXCIsIFwiQWJyaWxcIiwgXCJNYWlvXCIsIFwiSnVuaG9cIiwgXCJKdWxob1wiLCBcIkFnb3N0b1wiLCBcIlNldGVtYnJvXCIsIFwiT3V0dWJyb1wiLCBcIk5vdmVtYnJvXCIsIFwiRGV6ZW1icm9cIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZldlwiLCBcIk1hclwiLCBcIkFiclwiLCBcIk1haVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkFnb1wiLCBcIlNldFwiLCBcIk91dFwiLCBcIk5vdlwiLCBcIkRlelwiXVxuICB9KTtcblxuICB2YXIgcnVSVSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgJUIgJVkg0LMuICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcItCy0L7RgdC60YDQtdGB0LXQvdGM0LVcIiwgXCLQv9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsIFwi0LLRgtC+0YDQvdC40LpcIiwgXCLRgdGA0LXQtNCwXCIsIFwi0YfQtdGC0LLQtdGA0LNcIiwgXCLQv9GP0YLQvdC40YbQsFwiLCBcItGB0YPQsdCx0L7RgtCwXCJdLFxuICAgIHNob3J0RGF5czogW1wi0LLRgVwiLCBcItC/0L1cIiwgXCLQstGCXCIsIFwi0YHRgFwiLCBcItGH0YJcIiwgXCLQv9GCXCIsIFwi0YHQsVwiXSxcbiAgICBtb250aHM6IFtcItGP0L3QstCw0YDRj1wiLCBcItGE0LXQstGA0LDQu9GPXCIsIFwi0LzQsNGA0YLQsFwiLCBcItCw0L/RgNC10LvRj1wiLCBcItC80LDRj1wiLCBcItC40Y7QvdGPXCIsIFwi0LjRjtC70Y9cIiwgXCLQsNCy0LPRg9GB0YLQsFwiLCBcItGB0LXQvdGC0Y/QsdGA0Y9cIiwgXCLQvtC60YLRj9Cx0YDRj1wiLCBcItC90L7Rj9Cx0YDRj1wiLCBcItC00LXQutCw0LHRgNGPXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCLRj9C90LJcIiwgXCLRhNC10LJcIiwgXCLQvNCw0YBcIiwgXCLQsNC/0YBcIiwgXCLQvNCw0LlcIiwgXCLQuNGO0L1cIiwgXCLQuNGO0LtcIiwgXCLQsNCy0LNcIiwgXCLRgdC10L1cIiwgXCLQvtC60YJcIiwgXCLQvdC+0Y9cIiwgXCLQtNC10LpcIl1cbiAgfSk7XG5cbiAgdmFyIHN2U0UgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEgZGVuICVkICVCICVZICVYXCIsXG4gICAgZGF0ZTogXCIlWS0lbS0lZFwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJmbVwiLCBcImVtXCJdLFxuICAgIGRheXM6IFtcIlPDtm5kYWdcIiwgXCJNw6VuZGFnXCIsIFwiVGlzZGFnXCIsIFwiT25zZGFnXCIsIFwiVG9yc2RhZ1wiLCBcIkZyZWRhZ1wiLCBcIkzDtnJkYWdcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTw7ZuXCIsIFwiTcOlblwiLCBcIlRpc1wiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDtnJcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJpXCIsIFwiRmVicnVhcmlcIiwgXCJNYXJzXCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdGlcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWFqXCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2t0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG4gIH0pO1xuXG4gIHZhciB6aENOID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gICAgZGF0ZTogXCIlWS8lLW0vJS1kXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIuS4iuWNiFwiLCBcIuS4i+WNiFwiXSxcbiAgICBkYXlzOiBbXCLmmJ/mnJ/ml6VcIiwgXCLmmJ/mnJ/kuIBcIiwgXCLmmJ/mnJ/kuoxcIiwgXCLmmJ/mnJ/kuIlcIiwgXCLmmJ/mnJ/lm5tcIiwgXCLmmJ/mnJ/kupRcIiwgXCLmmJ/mnJ/lha1cIl0sXG4gICAgc2hvcnREYXlzOiBbXCLmmJ/mnJ/ml6VcIiwgXCLmmJ/mnJ/kuIBcIiwgXCLmmJ/mnJ/kuoxcIiwgXCLmmJ/mnJ/kuIlcIiwgXCLmmJ/mnJ/lm5tcIiwgXCLmmJ/mnJ/kupRcIiwgXCLmmJ/mnJ/lha1cIl0sXG4gICAgbW9udGhzOiBbXCLkuIDmnIhcIiwgXCLkuozmnIhcIiwgXCLkuInmnIhcIiwgXCLlm5vmnIhcIiwgXCLkupTmnIhcIiwgXCLlha3mnIhcIiwgXCLkuIPmnIhcIiwgXCLlhavmnIhcIiwgXCLkuZ3mnIhcIiwgXCLljYHmnIhcIiwgXCLljYHkuIDmnIhcIiwgXCLljYHkuozmnIhcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXVxuICB9KTtcblxuICB2YXIgaXNvU3BlY2lmaWVyID0gXCIlWS0lbS0lZFQlSDolTTolUy4lTFpcIjtcblxuICBmdW5jdGlvbiBmb3JtYXRJc29OYXRpdmUoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gIH1cblxuICBmb3JtYXRJc29OYXRpdmUucGFyc2UgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZyk7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gbnVsbCA6IGRhdGU7XG4gIH07XG5cbiAgZm9ybWF0SXNvTmF0aXZlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzb1NwZWNpZmllcjtcbiAgfTtcblxuICB2YXIgZm9ybWF0SXNvID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgJiYgK25ldyBEYXRlKFwiMjAwMC0wMS0wMVQwMDowMDowMC4wMDBaXCIpXG4gICAgICA/IGZvcm1hdElzb05hdGl2ZVxuICAgICAgOiBsb2NhbGUudXRjRm9ybWF0KGlzb1NwZWNpZmllcik7XG5cbiAgdmFyIGZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gIHZhciB1dGNGb3JtYXQgPSBsb2NhbGUudXRjRm9ybWF0O1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjIuMFwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0O1xuICBleHBvcnRzLnV0Y0Zvcm1hdCA9IHV0Y0Zvcm1hdDtcbiAgZXhwb3J0cy5sb2NhbGUgPSBsb2NhbGUkMTtcbiAgZXhwb3J0cy5sb2NhbGVDYUVzID0gY2FFUztcbiAgZXhwb3J0cy5sb2NhbGVEZUNoID0gZGVDSDtcbiAgZXhwb3J0cy5sb2NhbGVEZURlID0gZGVERTtcbiAgZXhwb3J0cy5sb2NhbGVFbkNhID0gZW5DQTtcbiAgZXhwb3J0cy5sb2NhbGVFbkdiID0gZW5HQjtcbiAgZXhwb3J0cy5sb2NhbGVFblVzID0gbG9jYWxlO1xuICBleHBvcnRzLmxvY2FsZUVzRXMgPSBlc0VTO1xuICBleHBvcnRzLmxvY2FsZUZpRmkgPSBmaUZJO1xuICBleHBvcnRzLmxvY2FsZUZyQ2EgPSBmckNBO1xuICBleHBvcnRzLmxvY2FsZUZyRnIgPSBmckZSO1xuICBleHBvcnRzLmxvY2FsZUhlSWwgPSBoZUlMO1xuICBleHBvcnRzLmxvY2FsZUh1SHUgPSBodUhVO1xuICBleHBvcnRzLmxvY2FsZUl0SXQgPSBpdElUO1xuICBleHBvcnRzLmxvY2FsZUphSnAgPSBqYUpQO1xuICBleHBvcnRzLmxvY2FsZUtvS3IgPSBrb0tSO1xuICBleHBvcnRzLmxvY2FsZU1rTWsgPSBta01LO1xuICBleHBvcnRzLmxvY2FsZU5sTmwgPSBubE5MO1xuICBleHBvcnRzLmxvY2FsZVBsUGwgPSBwbFBMO1xuICBleHBvcnRzLmxvY2FsZVB0QnIgPSBwdEJSO1xuICBleHBvcnRzLmxvY2FsZVJ1UnUgPSBydVJVO1xuICBleHBvcnRzLmxvY2FsZVN2U2UgPSBzdlNFO1xuICBleHBvcnRzLmxvY2FsZVpoQ24gPSB6aENOO1xuICBleHBvcnRzLmlzb0Zvcm1hdCA9IGZvcm1hdElzbztcblxufSkpOyIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ2QzLXRpbWUnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfdGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcbiAgdmFyIHQxID0gbmV3IERhdGU7XG4gIGZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQpIHtcblxuICAgIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gICAgfVxuXG4gICAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICAgIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGQwID0gbmV3IERhdGUoK2RhdGUpLFxuICAgICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgICAgZmxvb3JpKGQwKSwgZmxvb3JpKGQxKSwgb2Zmc2V0aShkMSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLm9mZnNldCA9IGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgdmFyIHJhbmdlID0gW107XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgICBzdG9wID0gbmV3IERhdGUoK3N0b3ApO1xuICAgICAgc3RlcCA9IHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgICBvZmZzZXRpKHN0YXJ0LCAxKSwgZmxvb3JpKHN0YXJ0KTtcbiAgICAgIGlmIChzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICAgIHdoaWxlICgtLXN0ZXAgPj0gMCkgd2hpbGUgKG9mZnNldGkoZGF0ZSwgMSksICF0ZXN0KGRhdGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoY291bnQpIGludGVydmFsLmNvdW50ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgdDAuc2V0VGltZSgrc3RhcnQpLCB0MS5zZXRUaW1lKCtlbmQpO1xuICAgICAgZmxvb3JpKHQwKSwgZmxvb3JpKHQxKTtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvdW50KHQwLCB0MSkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gaW50ZXJ2YWw7XG4gIH07XG5cbiAgdmFyIG1pbGxpc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gbm9vcFxuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kIC0gc3RhcnQ7XG4gIH0pO1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9KTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0pO1xuXG4gIHZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSk7XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHdlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xuICB2YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcbiAgdmFyIHR1ZXNkYXkgPSB3ZWVrZGF5KDIpO1xuICB2YXIgd2VkbmVzZGF5ID0gd2Vla2RheSgzKTtcbiAgdmFyIHRodXJzZGF5ID0gd2Vla2RheSg0KTtcbiAgdmFyIGZyaWRheSA9IHdlZWtkYXkoNSk7XG4gIHZhciBzYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbiAgdmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXREYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICB9KTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1NlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0pO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSk7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9KTtcblxuICB2YXIgdXRjRGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gODY0ZTU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gKGRhdGUuZ2V0VVRDRGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbiAgdmFyIHV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG4gIHZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbiAgdmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG4gIHZhciB1dGNUaHVyc2RheSA9IHV0Y1dlZWtkYXkoNCk7XG4gIHZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuICB2YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSk7XG5cbiAgdmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciBtaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZC5yYW5nZTtcbiAgdmFyIHNlY29uZHMgPSBzZWNvbmQucmFuZ2U7XG4gIHZhciBtaW51dGVzID0gbWludXRlLnJhbmdlO1xuICB2YXIgaG91cnMgPSBob3VyLnJhbmdlO1xuICB2YXIgZGF5cyA9IGRheS5yYW5nZTtcbiAgdmFyIHN1bmRheXMgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb25kYXlzID0gbW9uZGF5LnJhbmdlO1xuICB2YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xuICB2YXIgd2VkbmVzZGF5cyA9IHdlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHRodXJzZGF5cyA9IHRodXJzZGF5LnJhbmdlO1xuICB2YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbiAgdmFyIHNhdHVyZGF5cyA9IHNhdHVyZGF5LnJhbmdlO1xuICB2YXIgd2Vla3MgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb250aHMgPSBtb250aC5yYW5nZTtcbiAgdmFyIHllYXJzID0geWVhci5yYW5nZTtcblxuICB2YXIgdXRjTWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgdmFyIHV0Y01pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgdmFyIHV0Y1NlY29uZHMgPSB1dGNTZWNvbmQucmFuZ2U7XG4gIHZhciB1dGNNaW51dGVzID0gdXRjTWludXRlLnJhbmdlO1xuICB2YXIgdXRjSG91cnMgPSB1dGNIb3VyLnJhbmdlO1xuICB2YXIgdXRjRGF5cyA9IHV0Y0RheS5yYW5nZTtcbiAgdmFyIHV0Y1N1bmRheXMgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb25kYXlzID0gdXRjTW9uZGF5LnJhbmdlO1xuICB2YXIgdXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5LnJhbmdlO1xuICB2YXIgdXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5LnJhbmdlO1xuICB2YXIgdXRjRnJpZGF5cyA9IHV0Y0ZyaWRheS5yYW5nZTtcbiAgdmFyIHV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5LnJhbmdlO1xuICB2YXIgdXRjV2Vla3MgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb250aHMgPSB1dGNNb250aC5yYW5nZTtcbiAgdmFyIHV0Y1llYXJzID0gdXRjWWVhci5yYW5nZTtcblxuICB2YXIgdmVyc2lvbiA9IFwiMC4wLjdcIjtcblxuICBleHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy5zZWNvbmRzID0gc2Vjb25kcztcbiAgZXhwb3J0cy5taW51dGVzID0gbWludXRlcztcbiAgZXhwb3J0cy5ob3VycyA9IGhvdXJzO1xuICBleHBvcnRzLmRheXMgPSBkYXlzO1xuICBleHBvcnRzLnN1bmRheXMgPSBzdW5kYXlzO1xuICBleHBvcnRzLm1vbmRheXMgPSBtb25kYXlzO1xuICBleHBvcnRzLnR1ZXNkYXlzID0gdHVlc2RheXM7XG4gIGV4cG9ydHMud2VkbmVzZGF5cyA9IHdlZG5lc2RheXM7XG4gIGV4cG9ydHMudGh1cnNkYXlzID0gdGh1cnNkYXlzO1xuICBleHBvcnRzLmZyaWRheXMgPSBmcmlkYXlzO1xuICBleHBvcnRzLnNhdHVyZGF5cyA9IHNhdHVyZGF5cztcbiAgZXhwb3J0cy53ZWVrcyA9IHdlZWtzO1xuICBleHBvcnRzLm1vbnRocyA9IG1vbnRocztcbiAgZXhwb3J0cy55ZWFycyA9IHllYXJzO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gdXRjTWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmRzID0gdXRjTWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnV0Y1NlY29uZHMgPSB1dGNTZWNvbmRzO1xuICBleHBvcnRzLnV0Y01pbnV0ZXMgPSB1dGNNaW51dGVzO1xuICBleHBvcnRzLnV0Y0hvdXJzID0gdXRjSG91cnM7XG4gIGV4cG9ydHMudXRjRGF5cyA9IHV0Y0RheXM7XG4gIGV4cG9ydHMudXRjU3VuZGF5cyA9IHV0Y1N1bmRheXM7XG4gIGV4cG9ydHMudXRjTW9uZGF5cyA9IHV0Y01vbmRheXM7XG4gIGV4cG9ydHMudXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5cztcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5cztcbiAgZXhwb3J0cy51dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheXM7XG4gIGV4cG9ydHMudXRjRnJpZGF5cyA9IHV0Y0ZyaWRheXM7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXlzO1xuICBleHBvcnRzLnV0Y1dlZWtzID0gdXRjV2Vla3M7XG4gIGV4cG9ydHMudXRjTW9udGhzID0gdXRjTW9udGhzO1xuICBleHBvcnRzLnV0Y1llYXJzID0gdXRjWWVhcnM7XG4gIGV4cG9ydHMubWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgZXhwb3J0cy5zZWNvbmQgPSBzZWNvbmQ7XG4gIGV4cG9ydHMubWludXRlID0gbWludXRlO1xuICBleHBvcnRzLmhvdXIgPSBob3VyO1xuICBleHBvcnRzLmRheSA9IGRheTtcbiAgZXhwb3J0cy5zdW5kYXkgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9uZGF5ID0gbW9uZGF5O1xuICBleHBvcnRzLnR1ZXNkYXkgPSB0dWVzZGF5O1xuICBleHBvcnRzLndlZG5lc2RheSA9IHdlZG5lc2RheTtcbiAgZXhwb3J0cy50aHVyc2RheSA9IHRodXJzZGF5O1xuICBleHBvcnRzLmZyaWRheSA9IGZyaWRheTtcbiAgZXhwb3J0cy5zYXR1cmRheSA9IHNhdHVyZGF5O1xuICBleHBvcnRzLndlZWsgPSBzdW5kYXk7XG4gIGV4cG9ydHMubW9udGggPSBtb250aDtcbiAgZXhwb3J0cy55ZWFyID0geWVhcjtcbiAgZXhwb3J0cy51dGNTZWNvbmQgPSB1dGNTZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWludXRlID0gdXRjTWludXRlO1xuICBleHBvcnRzLnV0Y0hvdXIgPSB1dGNIb3VyO1xuICBleHBvcnRzLnV0Y0RheSA9IHV0Y0RheTtcbiAgZXhwb3J0cy51dGNTdW5kYXkgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuICBleHBvcnRzLnV0Y1R1ZXNkYXkgPSB1dGNUdWVzZGF5O1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheSA9IHV0Y1dlZG5lc2RheTtcbiAgZXhwb3J0cy51dGNUaHVyc2RheSA9IHV0Y1RodXJzZGF5O1xuICBleHBvcnRzLnV0Y0ZyaWRheSA9IHV0Y0ZyaWRheTtcbiAgZXhwb3J0cy51dGNTYXR1cmRheSA9IHV0Y1NhdHVyZGF5O1xuICBleHBvcnRzLnV0Y1dlZWsgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjTW9udGggPSB1dGNNb250aDtcbiAgZXhwb3J0cy51dGNZZWFyID0gdXRjWWVhcjtcbiAgZXhwb3J0cy5pbnRlcnZhbCA9IG5ld0ludGVydmFsO1xuXG59KSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZScsIFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0MCA9IG5ldyBEYXRlO1xuICB2YXIgdDEgPSBuZXcgRGF0ZTtcbiAgZnVuY3Rpb24gbmV3SW50ZXJ2YWwoZmxvb3JpLCBvZmZzZXRpLCBjb3VudCwgZmllbGQpIHtcblxuICAgIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gICAgfVxuXG4gICAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICAgIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGQwID0gbmV3IERhdGUoK2RhdGUpLFxuICAgICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgICAgZmxvb3JpKGQwKSwgZmxvb3JpKGQxKSwgb2Zmc2V0aShkMSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLm9mZnNldCA9IGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgdmFyIHJhbmdlID0gW107XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgICBzdG9wID0gbmV3IERhdGUoK3N0b3ApO1xuICAgICAgc3RlcCA9IHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgICBvZmZzZXRpKHN0YXJ0LCAxKSwgZmxvb3JpKHN0YXJ0KTtcbiAgICAgIGlmIChzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICAgIHdoaWxlICgtLXN0ZXAgPj0gMCkgd2hpbGUgKG9mZnNldGkoZGF0ZSwgMSksICF0ZXN0KGRhdGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGludGVydmFsLmNvdW50ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICB0MC5zZXRUaW1lKCtzdGFydCksIHQxLnNldFRpbWUoK2VuZCk7XG4gICAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGNvdW50KHQwLCB0MSkpO1xuICAgICAgfTtcblxuICAgICAgaW50ZXJ2YWwuZXZlcnkgPSBmdW5jdGlvbihzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLmZsb29yKHN0ZXApO1xuICAgICAgICByZXR1cm4gIWlzRmluaXRlKHN0ZXApIHx8ICEoc3RlcCA+IDApID8gbnVsbFxuICAgICAgICAgICAgOiAhKHN0ZXAgPiAxKSA/IGludGVydmFsXG4gICAgICAgICAgICA6IGludGVydmFsLmZpbHRlcihmaWVsZFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24oZCkgeyByZXR1cm4gZmllbGQoZCkgJSBzdGVwID09PSAwOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbihkKSB7IHJldHVybiBpbnRlcnZhbC5jb3VudCgwLCBkKSAlIHN0ZXAgPT09IDA7IH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJ2YWw7XG4gIH07XG5cbiAgdmFyIG1pbGxpc2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gbm9vcFxuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kIC0gc3RhcnQ7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgbWlsbGlzZWNvbmQuZXZlcnkgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGguZmxvb3Ioayk7XG4gICAgaWYgKCFpc0Zpbml0ZShrKSB8fCAhKGsgPiAwKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCEoayA+IDEpKSByZXR1cm4gbWlsbGlzZWNvbmQ7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKGRhdGUgLyBrKSAqIGspO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGs7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciBtaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgLSAxO1xuICB9KTtcblxuICBmdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgc3VuZGF5ID0gd2Vla2RheSgwKTtcbiAgdmFyIG1vbmRheSA9IHdlZWtkYXkoMSk7XG4gIHZhciB0dWVzZGF5ID0gd2Vla2RheSgyKTtcbiAgdmFyIHdlZG5lc2RheSA9IHdlZWtkYXkoMyk7XG4gIHZhciB0aHVyc2RheSA9IHdlZWtkYXkoNCk7XG4gIHZhciBmcmlkYXkgPSB3ZWVrZGF5KDUpO1xuICB2YXIgc2F0dXJkYXkgPSB3ZWVrZGF5KDYpO1xuXG4gIHZhciBtb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0RGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1NlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAzNmU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB1dGNTdW5kYXkgPSB1dGNXZWVrZGF5KDApO1xuICB2YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbiAgdmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xuICB2YXIgdXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcbiAgdmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbiAgdmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG4gIHZhciB1dGNTYXR1cmRheSA9IHV0Y1dlZWtkYXkoNik7XG5cbiAgdmFyIHV0Y01vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENEYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDTW9udGgoKSAtIHN0YXJ0LmdldFVUQ01vbnRoKCkgKyAoZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpKSAqIDEyO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB9KTtcblxuICB2YXIgbWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmQucmFuZ2U7XG4gIHZhciBzZWNvbmRzID0gc2Vjb25kLnJhbmdlO1xuICB2YXIgbWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcbiAgdmFyIGhvdXJzID0gaG91ci5yYW5nZTtcbiAgdmFyIGRheXMgPSBkYXkucmFuZ2U7XG4gIHZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9uZGF5cyA9IG1vbmRheS5yYW5nZTtcbiAgdmFyIHR1ZXNkYXlzID0gdHVlc2RheS5yYW5nZTtcbiAgdmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB0aHVyc2RheXMgPSB0aHVyc2RheS5yYW5nZTtcbiAgdmFyIGZyaWRheXMgPSBmcmlkYXkucmFuZ2U7XG4gIHZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcbiAgdmFyIHdlZWtzID0gc3VuZGF5LnJhbmdlO1xuICB2YXIgbW9udGhzID0gbW9udGgucmFuZ2U7XG4gIHZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbiAgdmFyIHV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIHZhciB1dGNNaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIHZhciB1dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xuICB2YXIgdXRjTWludXRlcyA9IHV0Y01pbnV0ZS5yYW5nZTtcbiAgdmFyIHV0Y0hvdXJzID0gdXRjSG91ci5yYW5nZTtcbiAgdmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG4gIHZhciB1dGNTdW5kYXlzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9uZGF5cyA9IHV0Y01vbmRheS5yYW5nZTtcbiAgdmFyIHV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheS5yYW5nZTtcbiAgdmFyIHV0Y0ZyaWRheXMgPSB1dGNGcmlkYXkucmFuZ2U7XG4gIHZhciB1dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheS5yYW5nZTtcbiAgdmFyIHV0Y1dlZWtzID0gdXRjU3VuZGF5LnJhbmdlO1xuICB2YXIgdXRjTW9udGhzID0gdXRjTW9udGgucmFuZ2U7XG4gIHZhciB1dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuMS4wXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZHM7XG4gIGV4cG9ydHMubWludXRlcyA9IG1pbnV0ZXM7XG4gIGV4cG9ydHMuaG91cnMgPSBob3VycztcbiAgZXhwb3J0cy5kYXlzID0gZGF5cztcbiAgZXhwb3J0cy5zdW5kYXlzID0gc3VuZGF5cztcbiAgZXhwb3J0cy5tb25kYXlzID0gbW9uZGF5cztcbiAgZXhwb3J0cy50dWVzZGF5cyA9IHR1ZXNkYXlzO1xuICBleHBvcnRzLndlZG5lc2RheXMgPSB3ZWRuZXNkYXlzO1xuICBleHBvcnRzLnRodXJzZGF5cyA9IHRodXJzZGF5cztcbiAgZXhwb3J0cy5mcmlkYXlzID0gZnJpZGF5cztcbiAgZXhwb3J0cy5zYXR1cmRheXMgPSBzYXR1cmRheXM7XG4gIGV4cG9ydHMud2Vla3MgPSB3ZWVrcztcbiAgZXhwb3J0cy5tb250aHMgPSBtb250aHM7XG4gIGV4cG9ydHMueWVhcnMgPSB5ZWFycztcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZCA9IHV0Y01pbGxpc2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IHV0Y01pbGxpc2Vjb25kcztcbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gdXRjU2Vjb25kcztcbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuICBleHBvcnRzLnV0Y0RheXMgPSB1dGNEYXlzO1xuICBleHBvcnRzLnV0Y1N1bmRheXMgPSB1dGNTdW5kYXlzO1xuICBleHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheXM7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuICBleHBvcnRzLnV0Y0ZyaWRheXMgPSB1dGNGcmlkYXlzO1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5cztcbiAgZXhwb3J0cy51dGNXZWVrcyA9IHV0Y1dlZWtzO1xuICBleHBvcnRzLnV0Y01vbnRocyA9IHV0Y01vbnRocztcbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuICBleHBvcnRzLm1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMuc2Vjb25kID0gc2Vjb25kO1xuICBleHBvcnRzLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgZXhwb3J0cy5ob3VyID0gaG91cjtcbiAgZXhwb3J0cy5kYXkgPSBkYXk7XG4gIGV4cG9ydHMuc3VuZGF5ID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbmRheSA9IG1vbmRheTtcbiAgZXhwb3J0cy50dWVzZGF5ID0gdHVlc2RheTtcbiAgZXhwb3J0cy53ZWRuZXNkYXkgPSB3ZWRuZXNkYXk7XG4gIGV4cG9ydHMudGh1cnNkYXkgPSB0aHVyc2RheTtcbiAgZXhwb3J0cy5mcmlkYXkgPSBmcmlkYXk7XG4gIGV4cG9ydHMuc2F0dXJkYXkgPSBzYXR1cmRheTtcbiAgZXhwb3J0cy53ZWVrID0gc3VuZGF5O1xuICBleHBvcnRzLm1vbnRoID0gbW9udGg7XG4gIGV4cG9ydHMueWVhciA9IHllYXI7XG4gIGV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG4gIGV4cG9ydHMudXRjU3VuZGF5ID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbmRheSA9IHV0Y01vbmRheTtcbiAgZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjVHVlc2RheTtcbiAgZXhwb3J0cy51dGNXZWRuZXNkYXkgPSB1dGNXZWRuZXNkYXk7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXkgPSB1dGNUaHVyc2RheTtcbiAgZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNGcmlkYXk7XG4gIGV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNTYXR1cmRheTtcbiAgZXhwb3J0cy51dGNXZWVrID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y01vbnRoID0gdXRjTW9udGg7XG4gIGV4cG9ydHMudXRjWWVhciA9IHV0Y1llYXI7XG4gIGV4cG9ydHMuaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcblxufSkpOyIsIiFmdW5jdGlvbigpIHtcbiAgdmFyIHRvcG9qc29uID0ge1xuICAgIHZlcnNpb246IFwiMS42LjE5XCIsXG4gICAgbWVzaDogZnVuY3Rpb24odG9wb2xvZ3kpIHsgcmV0dXJuIG9iamVjdCh0b3BvbG9neSwgbWVzaEFyY3MuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7IH0sXG4gICAgbWVzaEFyY3M6IG1lc2hBcmNzLFxuICAgIG1lcmdlOiBmdW5jdGlvbih0b3BvbG9neSkgeyByZXR1cm4gb2JqZWN0KHRvcG9sb2d5LCBtZXJnZUFyY3MuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7IH0sXG4gICAgbWVyZ2VBcmNzOiBtZXJnZUFyY3MsXG4gICAgZmVhdHVyZTogZmVhdHVyZU9yQ29sbGVjdGlvbixcbiAgICBuZWlnaGJvcnM6IG5laWdoYm9ycyxcbiAgICBwcmVzaW1wbGlmeTogcHJlc2ltcGxpZnlcbiAgfTtcblxuICBmdW5jdGlvbiBzdGl0Y2hBcmNzKHRvcG9sb2d5LCBhcmNzKSB7XG4gICAgdmFyIHN0aXRjaGVkQXJjcyA9IHt9LFxuICAgICAgICBmcmFnbWVudEJ5U3RhcnQgPSB7fSxcbiAgICAgICAgZnJhZ21lbnRCeUVuZCA9IHt9LFxuICAgICAgICBmcmFnbWVudHMgPSBbXSxcbiAgICAgICAgZW1wdHlJbmRleCA9IC0xO1xuXG4gICAgLy8gU3RpdGNoIGVtcHR5IGFyY3MgZmlyc3QsIHNpbmNlIHRoZXkgbWF5IGJlIHN1YnN1bWVkIGJ5IG90aGVyIGFyY3MuXG4gICAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGksIGopIHtcbiAgICAgIHZhciBhcmMgPSB0b3BvbG9neS5hcmNzW2kgPCAwID8gfmkgOiBpXSwgdDtcbiAgICAgIGlmIChhcmMubGVuZ3RoIDwgMyAmJiAhYXJjWzFdWzBdICYmICFhcmNbMV1bMV0pIHtcbiAgICAgICAgdCA9IGFyY3NbKytlbXB0eUluZGV4XSwgYXJjc1tlbXB0eUluZGV4XSA9IGksIGFyY3Nbal0gPSB0O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHZhciBlID0gZW5kcyhpKSxcbiAgICAgICAgICBzdGFydCA9IGVbMF0sXG4gICAgICAgICAgZW5kID0gZVsxXSxcbiAgICAgICAgICBmLCBnO1xuXG4gICAgICBpZiAoZiA9IGZyYWdtZW50QnlFbmRbc3RhcnRdKSB7XG4gICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5RW5kW2YuZW5kXTtcbiAgICAgICAgZi5wdXNoKGkpO1xuICAgICAgICBmLmVuZCA9IGVuZDtcbiAgICAgICAgaWYgKGcgPSBmcmFnbWVudEJ5U3RhcnRbZW5kXSkge1xuICAgICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5U3RhcnRbZy5zdGFydF07XG4gICAgICAgICAgdmFyIGZnID0gZyA9PT0gZiA/IGYgOiBmLmNvbmNhdChnKTtcbiAgICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZmcuc3RhcnQgPSBmLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZmcuZW5kID0gZy5lbmRdID0gZmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZF0gPSBmO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGYgPSBmcmFnbWVudEJ5U3RhcnRbZW5kXSkge1xuICAgICAgICBkZWxldGUgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdO1xuICAgICAgICBmLnVuc2hpZnQoaSk7XG4gICAgICAgIGYuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgaWYgKGcgPSBmcmFnbWVudEJ5RW5kW3N0YXJ0XSkge1xuICAgICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5RW5kW2cuZW5kXTtcbiAgICAgICAgICB2YXIgZ2YgPSBnID09PSBmID8gZiA6IGcuY29uY2F0KGYpO1xuICAgICAgICAgIGZyYWdtZW50QnlTdGFydFtnZi5zdGFydCA9IGcuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtnZi5lbmQgPSBmLmVuZF0gPSBnZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2YuZW5kXSA9IGY7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGYgPSBbaV07XG4gICAgICAgIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0ID0gc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZCA9IGVuZF0gPSBmO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZW5kcyhpKSB7XG4gICAgICB2YXIgYXJjID0gdG9wb2xvZ3kuYXJjc1tpIDwgMCA/IH5pIDogaV0sIHAwID0gYXJjWzBdLCBwMTtcbiAgICAgIGlmICh0b3BvbG9neS50cmFuc2Zvcm0pIHAxID0gWzAsIDBdLCBhcmMuZm9yRWFjaChmdW5jdGlvbihkcCkgeyBwMVswXSArPSBkcFswXSwgcDFbMV0gKz0gZHBbMV07IH0pO1xuICAgICAgZWxzZSBwMSA9IGFyY1thcmMubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gaSA8IDAgPyBbcDEsIHAwXSA6IFtwMCwgcDFdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZsdXNoKGZyYWdtZW50QnlFbmQsIGZyYWdtZW50QnlTdGFydCkge1xuICAgICAgZm9yICh2YXIgayBpbiBmcmFnbWVudEJ5RW5kKSB7XG4gICAgICAgIHZhciBmID0gZnJhZ21lbnRCeUVuZFtrXTtcbiAgICAgICAgZGVsZXRlIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XTtcbiAgICAgICAgZGVsZXRlIGYuc3RhcnQ7XG4gICAgICAgIGRlbGV0ZSBmLmVuZDtcbiAgICAgICAgZi5mb3JFYWNoKGZ1bmN0aW9uKGkpIHsgc3RpdGNoZWRBcmNzW2kgPCAwID8gfmkgOiBpXSA9IDE7IH0pO1xuICAgICAgICBmcmFnbWVudHMucHVzaChmKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmbHVzaChmcmFnbWVudEJ5RW5kLCBmcmFnbWVudEJ5U3RhcnQpO1xuICAgIGZsdXNoKGZyYWdtZW50QnlTdGFydCwgZnJhZ21lbnRCeUVuZCk7XG4gICAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGkpIHsgaWYgKCFzdGl0Y2hlZEFyY3NbaSA8IDAgPyB+aSA6IGldKSBmcmFnbWVudHMucHVzaChbaV0pOyB9KTtcblxuICAgIHJldHVybiBmcmFnbWVudHM7XG4gIH1cblxuICBmdW5jdGlvbiBtZXNoQXJjcyh0b3BvbG9neSwgbywgZmlsdGVyKSB7XG4gICAgdmFyIGFyY3MgPSBbXTtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGdlb21zQnlBcmMgPSBbXSxcbiAgICAgICAgICBnZW9tO1xuXG4gICAgICBmdW5jdGlvbiBhcmMoaSkge1xuICAgICAgICB2YXIgaiA9IGkgPCAwID8gfmkgOiBpO1xuICAgICAgICAoZ2VvbXNCeUFyY1tqXSB8fCAoZ2VvbXNCeUFyY1tqXSA9IFtdKSkucHVzaCh7aTogaSwgZzogZ2VvbX0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBsaW5lKGFyY3MpIHtcbiAgICAgICAgYXJjcy5mb3JFYWNoKGFyYyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBvbHlnb24oYXJjcykge1xuICAgICAgICBhcmNzLmZvckVhY2gobGluZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdlb21ldHJ5KG8pIHtcbiAgICAgICAgaWYgKG8udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIikgby5nZW9tZXRyaWVzLmZvckVhY2goZ2VvbWV0cnkpO1xuICAgICAgICBlbHNlIGlmIChvLnR5cGUgaW4gZ2VvbWV0cnlUeXBlKSBnZW9tID0gbywgZ2VvbWV0cnlUeXBlW28udHlwZV0oby5hcmNzKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGdlb21ldHJ5VHlwZSA9IHtcbiAgICAgICAgTGluZVN0cmluZzogbGluZSxcbiAgICAgICAgTXVsdGlMaW5lU3RyaW5nOiBwb2x5Z29uLFxuICAgICAgICBQb2x5Z29uOiBwb2x5Z29uLFxuICAgICAgICBNdWx0aVBvbHlnb246IGZ1bmN0aW9uKGFyY3MpIHsgYXJjcy5mb3JFYWNoKHBvbHlnb24pOyB9XG4gICAgICB9O1xuXG4gICAgICBnZW9tZXRyeShvKTtcblxuICAgICAgZ2VvbXNCeUFyYy5mb3JFYWNoKGFyZ3VtZW50cy5sZW5ndGggPCAzXG4gICAgICAgICAgPyBmdW5jdGlvbihnZW9tcykgeyBhcmNzLnB1c2goZ2VvbXNbMF0uaSk7IH1cbiAgICAgICAgICA6IGZ1bmN0aW9uKGdlb21zKSB7IGlmIChmaWx0ZXIoZ2VvbXNbMF0uZywgZ2VvbXNbZ2VvbXMubGVuZ3RoIC0gMV0uZykpIGFyY3MucHVzaChnZW9tc1swXS5pKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdG9wb2xvZ3kuYXJjcy5sZW5ndGg7IGkgPCBuOyArK2kpIGFyY3MucHVzaChpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge3R5cGU6IFwiTXVsdGlMaW5lU3RyaW5nXCIsIGFyY3M6IHN0aXRjaEFyY3ModG9wb2xvZ3ksIGFyY3MpfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlQXJjcyh0b3BvbG9neSwgb2JqZWN0cykge1xuICAgIHZhciBwb2x5Z29uc0J5QXJjID0ge30sXG4gICAgICAgIHBvbHlnb25zID0gW10sXG4gICAgICAgIGNvbXBvbmVudHMgPSBbXTtcblxuICAgIG9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvKSB7XG4gICAgICBpZiAoby50eXBlID09PSBcIlBvbHlnb25cIikgcmVnaXN0ZXIoby5hcmNzKTtcbiAgICAgIGVsc2UgaWYgKG8udHlwZSA9PT0gXCJNdWx0aVBvbHlnb25cIikgby5hcmNzLmZvckVhY2gocmVnaXN0ZXIpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXIocG9seWdvbikge1xuICAgICAgcG9seWdvbi5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAgIChwb2x5Z29uc0J5QXJjW2FyYyA9IGFyYyA8IDAgPyB+YXJjIDogYXJjXSB8fCAocG9seWdvbnNCeUFyY1thcmNdID0gW10pKS5wdXNoKHBvbHlnb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcG9seWdvbnMucHVzaChwb2x5Z29uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlcmlvcihyaW5nKSB7XG4gICAgICByZXR1cm4gY2FydGVzaWFuUmluZ0FyZWEob2JqZWN0KHRvcG9sb2d5LCB7dHlwZTogXCJQb2x5Z29uXCIsIGFyY3M6IFtyaW5nXX0pLmNvb3JkaW5hdGVzWzBdKSA+IDA7IC8vIFRPRE8gYWxsb3cgc3BoZXJpY2FsP1xuICAgIH1cblxuICAgIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgaWYgKCFwb2x5Z29uLl8pIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IFtdLFxuICAgICAgICAgICAgbmVpZ2hib3JzID0gW3BvbHlnb25dO1xuICAgICAgICBwb2x5Z29uLl8gPSAxO1xuICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgd2hpbGUgKHBvbHlnb24gPSBuZWlnaGJvcnMucG9wKCkpIHtcbiAgICAgICAgICBjb21wb25lbnQucHVzaChwb2x5Z29uKTtcbiAgICAgICAgICBwb2x5Z29uLmZvckVhY2goZnVuY3Rpb24ocmluZykge1xuICAgICAgICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAgICAgICBwb2x5Z29uc0J5QXJjW2FyYyA8IDAgPyB+YXJjIDogYXJjXS5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBvbHlnb24uXykge1xuICAgICAgICAgICAgICAgICAgcG9seWdvbi5fID0gMTtcbiAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKHBvbHlnb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcG9seWdvbnMuZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICBkZWxldGUgcG9seWdvbi5fO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiTXVsdGlQb2x5Z29uXCIsXG4gICAgICBhcmNzOiBjb21wb25lbnRzLm1hcChmdW5jdGlvbihwb2x5Z29ucykge1xuICAgICAgICB2YXIgYXJjcyA9IFtdO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgdGhlIGV4dGVyaW9yICh1bmlxdWUpIGFyY3MuXG4gICAgICAgIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgICAgIHBvbHlnb24uZm9yRWFjaChmdW5jdGlvbihyaW5nKSB7XG4gICAgICAgICAgICByaW5nLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7XG4gICAgICAgICAgICAgIGlmIChwb2x5Z29uc0J5QXJjW2FyYyA8IDAgPyB+YXJjIDogYXJjXS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgYXJjcy5wdXNoKGFyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdGl0Y2ggdGhlIGFyY3MgaW50byBvbmUgb3IgbW9yZSByaW5ncy5cbiAgICAgICAgYXJjcyA9IHN0aXRjaEFyY3ModG9wb2xvZ3ksIGFyY3MpO1xuXG4gICAgICAgIC8vIElmIG1vcmUgdGhhbiBvbmUgcmluZyBpcyByZXR1cm5lZCxcbiAgICAgICAgLy8gYXQgbW9zdCBvbmUgb2YgdGhlc2UgcmluZ3MgY2FuIGJlIHRoZSBleHRlcmlvcjtcbiAgICAgICAgLy8gdGhpcyBleHRlcmlvciByaW5nIGhhcyB0aGUgc2FtZSB3aW5kaW5nIG9yZGVyXG4gICAgICAgIC8vIGFzIGFueSBleHRlcmlvciByaW5nIGluIHRoZSBvcmlnaW5hbCBwb2x5Z29ucy5cbiAgICAgICAgaWYgKChuID0gYXJjcy5sZW5ndGgpID4gMSkge1xuICAgICAgICAgIHZhciBzZ24gPSBleHRlcmlvcihwb2x5Z29uc1swXVswXSk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChzZ24gPT09IGV4dGVyaW9yKGFyY3NbaV0pKSB7XG4gICAgICAgICAgICAgIHQgPSBhcmNzWzBdLCBhcmNzWzBdID0gYXJjc1tpXSwgYXJjc1tpXSA9IHQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmNzO1xuICAgICAgfSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZmVhdHVyZU9yQ29sbGVjdGlvbih0b3BvbG9neSwgbykge1xuICAgIHJldHVybiBvLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIgPyB7XG4gICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICBmZWF0dXJlczogby5nZW9tZXRyaWVzLm1hcChmdW5jdGlvbihvKSB7IHJldHVybiBmZWF0dXJlKHRvcG9sb2d5LCBvKTsgfSlcbiAgICB9IDogZmVhdHVyZSh0b3BvbG9neSwgbyk7XG4gIH1cblxuICBmdW5jdGlvbiBmZWF0dXJlKHRvcG9sb2d5LCBvKSB7XG4gICAgdmFyIGYgPSB7XG4gICAgICB0eXBlOiBcIkZlYXR1cmVcIixcbiAgICAgIGlkOiBvLmlkLFxuICAgICAgcHJvcGVydGllczogby5wcm9wZXJ0aWVzIHx8IHt9LFxuICAgICAgZ2VvbWV0cnk6IG9iamVjdCh0b3BvbG9neSwgbylcbiAgICB9O1xuICAgIGlmIChvLmlkID09IG51bGwpIGRlbGV0ZSBmLmlkO1xuICAgIHJldHVybiBmO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0KHRvcG9sb2d5LCBvKSB7XG4gICAgdmFyIGFic29sdXRlID0gdHJhbnNmb3JtQWJzb2x1dGUodG9wb2xvZ3kudHJhbnNmb3JtKSxcbiAgICAgICAgYXJjcyA9IHRvcG9sb2d5LmFyY3M7XG5cbiAgICBmdW5jdGlvbiBhcmMoaSwgcG9pbnRzKSB7XG4gICAgICBpZiAocG9pbnRzLmxlbmd0aCkgcG9pbnRzLnBvcCgpO1xuICAgICAgZm9yICh2YXIgYSA9IGFyY3NbaSA8IDAgPyB+aSA6IGldLCBrID0gMCwgbiA9IGEubGVuZ3RoLCBwOyBrIDwgbjsgKytrKSB7XG4gICAgICAgIHBvaW50cy5wdXNoKHAgPSBhW2tdLnNsaWNlKCkpO1xuICAgICAgICBhYnNvbHV0ZShwLCBrKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgMCkgcmV2ZXJzZShwb2ludHMsIG4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvaW50KHApIHtcbiAgICAgIHAgPSBwLnNsaWNlKCk7XG4gICAgICBhYnNvbHV0ZShwLCAwKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpbmUoYXJjcykge1xuICAgICAgdmFyIHBvaW50cyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmNzLmxlbmd0aDsgaSA8IG47ICsraSkgYXJjKGFyY3NbaV0sIHBvaW50cyk7XG4gICAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDIpIHBvaW50cy5wdXNoKHBvaW50c1swXS5zbGljZSgpKTtcbiAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmluZyhhcmNzKSB7XG4gICAgICB2YXIgcG9pbnRzID0gbGluZShhcmNzKTtcbiAgICAgIHdoaWxlIChwb2ludHMubGVuZ3RoIDwgNCkgcG9pbnRzLnB1c2gocG9pbnRzWzBdLnNsaWNlKCkpO1xuICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2x5Z29uKGFyY3MpIHtcbiAgICAgIHJldHVybiBhcmNzLm1hcChyaW5nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW9tZXRyeShvKSB7XG4gICAgICB2YXIgdCA9IG8udHlwZTtcbiAgICAgIHJldHVybiB0ID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiID8ge3R5cGU6IHQsIGdlb21ldHJpZXM6IG8uZ2VvbWV0cmllcy5tYXAoZ2VvbWV0cnkpfVxuICAgICAgICAgIDogdCBpbiBnZW9tZXRyeVR5cGUgPyB7dHlwZTogdCwgY29vcmRpbmF0ZXM6IGdlb21ldHJ5VHlwZVt0XShvKX1cbiAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGdlb21ldHJ5VHlwZSA9IHtcbiAgICAgIFBvaW50OiBmdW5jdGlvbihvKSB7IHJldHVybiBwb2ludChvLmNvb3JkaW5hdGVzKTsgfSxcbiAgICAgIE11bHRpUG9pbnQ6IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uY29vcmRpbmF0ZXMubWFwKHBvaW50KTsgfSxcbiAgICAgIExpbmVTdHJpbmc6IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIGxpbmUoby5hcmNzKTsgfSxcbiAgICAgIE11bHRpTGluZVN0cmluZzogZnVuY3Rpb24obykgeyByZXR1cm4gby5hcmNzLm1hcChsaW5lKTsgfSxcbiAgICAgIFBvbHlnb246IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIHBvbHlnb24oby5hcmNzKTsgfSxcbiAgICAgIE11bHRpUG9seWdvbjogZnVuY3Rpb24obykgeyByZXR1cm4gby5hcmNzLm1hcChwb2x5Z29uKTsgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZ2VvbWV0cnkobyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnNlKGFycmF5LCBuKSB7XG4gICAgdmFyIHQsIGogPSBhcnJheS5sZW5ndGgsIGkgPSBqIC0gbjsgd2hpbGUgKGkgPCAtLWopIHQgPSBhcnJheVtpXSwgYXJyYXlbaSsrXSA9IGFycmF5W2pdLCBhcnJheVtqXSA9IHQ7XG4gIH1cblxuICBmdW5jdGlvbiBiaXNlY3QoYSwgeCkge1xuICAgIHZhciBsbyA9IDAsIGhpID0gYS5sZW5ndGg7XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgaWYgKGFbbWlkXSA8IHgpIGxvID0gbWlkICsgMTtcbiAgICAgIGVsc2UgaGkgPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsbztcbiAgfVxuXG4gIGZ1bmN0aW9uIG5laWdoYm9ycyhvYmplY3RzKSB7XG4gICAgdmFyIGluZGV4ZXNCeUFyYyA9IHt9LCAvLyBhcmMgaW5kZXggLT4gYXJyYXkgb2Ygb2JqZWN0IGluZGV4ZXNcbiAgICAgICAgbmVpZ2hib3JzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfSk7XG5cbiAgICBmdW5jdGlvbiBsaW5lKGFyY3MsIGkpIHtcbiAgICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICAgIGlmIChhIDwgMCkgYSA9IH5hO1xuICAgICAgICB2YXIgbyA9IGluZGV4ZXNCeUFyY1thXTtcbiAgICAgICAgaWYgKG8pIG8ucHVzaChpKTtcbiAgICAgICAgZWxzZSBpbmRleGVzQnlBcmNbYV0gPSBbaV07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2x5Z29uKGFyY3MsIGkpIHtcbiAgICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHsgbGluZShhcmMsIGkpOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW9tZXRyeShvLCBpKSB7XG4gICAgICBpZiAoby50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiKSBvLmdlb21ldHJpZXMuZm9yRWFjaChmdW5jdGlvbihvKSB7IGdlb21ldHJ5KG8sIGkpOyB9KTtcbiAgICAgIGVsc2UgaWYgKG8udHlwZSBpbiBnZW9tZXRyeVR5cGUpIGdlb21ldHJ5VHlwZVtvLnR5cGVdKG8uYXJjcywgaSk7XG4gICAgfVxuXG4gICAgdmFyIGdlb21ldHJ5VHlwZSA9IHtcbiAgICAgIExpbmVTdHJpbmc6IGxpbmUsXG4gICAgICBNdWx0aUxpbmVTdHJpbmc6IHBvbHlnb24sXG4gICAgICBQb2x5Z29uOiBwb2x5Z29uLFxuICAgICAgTXVsdGlQb2x5Z29uOiBmdW5jdGlvbihhcmNzLCBpKSB7IGFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHsgcG9seWdvbihhcmMsIGkpOyB9KTsgfVxuICAgIH07XG5cbiAgICBvYmplY3RzLmZvckVhY2goZ2VvbWV0cnkpO1xuXG4gICAgZm9yICh2YXIgaSBpbiBpbmRleGVzQnlBcmMpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ZXMgPSBpbmRleGVzQnlBcmNbaV0sIG0gPSBpbmRleGVzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgICAgZm9yICh2YXIgayA9IGogKyAxOyBrIDwgbTsgKytrKSB7XG4gICAgICAgICAgdmFyIGlqID0gaW5kZXhlc1tqXSwgaWsgPSBpbmRleGVzW2tdLCBuO1xuICAgICAgICAgIGlmICgobiA9IG5laWdoYm9yc1tpal0pW2kgPSBiaXNlY3QobiwgaWspXSAhPT0gaWspIG4uc3BsaWNlKGksIDAsIGlrKTtcbiAgICAgICAgICBpZiAoKG4gPSBuZWlnaGJvcnNbaWtdKVtpID0gYmlzZWN0KG4sIGlqKV0gIT09IGlqKSBuLnNwbGljZShpLCAwLCBpaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVpZ2hib3JzO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlc2ltcGxpZnkodG9wb2xvZ3ksIHRyaWFuZ2xlQXJlYSkge1xuICAgIHZhciBhYnNvbHV0ZSA9IHRyYW5zZm9ybUFic29sdXRlKHRvcG9sb2d5LnRyYW5zZm9ybSksXG4gICAgICAgIHJlbGF0aXZlID0gdHJhbnNmb3JtUmVsYXRpdmUodG9wb2xvZ3kudHJhbnNmb3JtKSxcbiAgICAgICAgaGVhcCA9IG1pbkFyZWFIZWFwKCk7XG5cbiAgICBpZiAoIXRyaWFuZ2xlQXJlYSkgdHJpYW5nbGVBcmVhID0gY2FydGVzaWFuVHJpYW5nbGVBcmVhO1xuXG4gICAgdG9wb2xvZ3kuYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgdmFyIHRyaWFuZ2xlcyA9IFtdLFxuICAgICAgICAgIG1heEFyZWEgPSAwLFxuICAgICAgICAgIHRyaWFuZ2xlO1xuXG4gICAgICAvLyBUbyBzdG9yZSBlYWNoIHBvaW504oCZcyBlZmZlY3RpdmUgYXJlYSwgd2UgY3JlYXRlIGEgbmV3IGFycmF5IHJhdGhlciB0aGFuXG4gICAgICAvLyBleHRlbmRpbmcgdGhlIHBhc3NlZC1pbiBwb2ludCB0byB3b3JrYXJvdW5kIGEgQ2hyb21lL1Y4IGJ1ZyAoZ2V0dGluZ1xuICAgICAgLy8gc3R1Y2sgaW4gc21pIG1vZGUpLiBGb3IgbWlkcG9pbnRzLCB0aGUgaW5pdGlhbCBlZmZlY3RpdmUgYXJlYSBvZlxuICAgICAgLy8gSW5maW5pdHkgd2lsbCBiZSBjb21wdXRlZCBpbiB0aGUgbmV4dCBzdGVwLlxuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmMubGVuZ3RoLCBwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHAgPSBhcmNbaV07XG4gICAgICAgIGFic29sdXRlKGFyY1tpXSA9IFtwWzBdLCBwWzFdLCBJbmZpbml0eV0sIGkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMSwgbiA9IGFyYy5sZW5ndGggLSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHRyaWFuZ2xlID0gYXJjLnNsaWNlKGkgLSAxLCBpICsgMik7XG4gICAgICAgIHRyaWFuZ2xlWzFdWzJdID0gdHJpYW5nbGVBcmVhKHRyaWFuZ2xlKTtcbiAgICAgICAgdHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xuICAgICAgICBoZWFwLnB1c2godHJpYW5nbGUpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHRyaWFuZ2xlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgdHJpYW5nbGUgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIHRyaWFuZ2xlLnByZXZpb3VzID0gdHJpYW5nbGVzW2kgLSAxXTtcbiAgICAgICAgdHJpYW5nbGUubmV4dCA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cmlhbmdsZSA9IGhlYXAucG9wKCkpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gdHJpYW5nbGUucHJldmlvdXMsXG4gICAgICAgICAgICBuZXh0ID0gdHJpYW5nbGUubmV4dDtcblxuICAgICAgICAvLyBJZiB0aGUgYXJlYSBvZiB0aGUgY3VycmVudCBwb2ludCBpcyBsZXNzIHRoYW4gdGhhdCBvZiB0aGUgcHJldmlvdXMgcG9pbnRcbiAgICAgICAgLy8gdG8gYmUgZWxpbWluYXRlZCwgdXNlIHRoZSBsYXR0ZXIncyBhcmVhIGluc3RlYWQuIFRoaXMgZW5zdXJlcyB0aGF0IHRoZVxuICAgICAgICAvLyBjdXJyZW50IHBvaW50IGNhbm5vdCBiZSBlbGltaW5hdGVkIHdpdGhvdXQgZWxpbWluYXRpbmcgcHJldmlvdXNseS1cbiAgICAgICAgLy8gZWxpbWluYXRlZCBwb2ludHMuXG4gICAgICAgIGlmICh0cmlhbmdsZVsxXVsyXSA8IG1heEFyZWEpIHRyaWFuZ2xlWzFdWzJdID0gbWF4QXJlYTtcbiAgICAgICAgZWxzZSBtYXhBcmVhID0gdHJpYW5nbGVbMV1bMl07XG5cbiAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5leHQ7XG4gICAgICAgICAgcHJldmlvdXNbMl0gPSB0cmlhbmdsZVsyXTtcbiAgICAgICAgICB1cGRhdGUocHJldmlvdXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICBuZXh0LnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgICAgICAgbmV4dFswXSA9IHRyaWFuZ2xlWzBdO1xuICAgICAgICAgIHVwZGF0ZShuZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhcmMuZm9yRWFjaChyZWxhdGl2ZSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUodHJpYW5nbGUpIHtcbiAgICAgIGhlYXAucmVtb3ZlKHRyaWFuZ2xlKTtcbiAgICAgIHRyaWFuZ2xlWzFdWzJdID0gdHJpYW5nbGVBcmVhKHRyaWFuZ2xlKTtcbiAgICAgIGhlYXAucHVzaCh0cmlhbmdsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG9sb2d5O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNhcnRlc2lhblJpbmdBcmVhKHJpbmcpIHtcbiAgICB2YXIgaSA9IC0xLFxuICAgICAgICBuID0gcmluZy5sZW5ndGgsXG4gICAgICAgIGEsXG4gICAgICAgIGIgPSByaW5nW24gLSAxXSxcbiAgICAgICAgYXJlYSA9IDA7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgYSA9IGI7XG4gICAgICBiID0gcmluZ1tpXTtcbiAgICAgIGFyZWEgKz0gYVswXSAqIGJbMV0gLSBhWzFdICogYlswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJlYSAqIC41O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FydGVzaWFuVHJpYW5nbGVBcmVhKHRyaWFuZ2xlKSB7XG4gICAgdmFyIGEgPSB0cmlhbmdsZVswXSwgYiA9IHRyaWFuZ2xlWzFdLCBjID0gdHJpYW5nbGVbMl07XG4gICAgcmV0dXJuIE1hdGguYWJzKChhWzBdIC0gY1swXSkgKiAoYlsxXSAtIGFbMV0pIC0gKGFbMF0gLSBiWzBdKSAqIChjWzFdIC0gYVsxXSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGFyZUFyZWEoYSwgYikge1xuICAgIHJldHVybiBhWzFdWzJdIC0gYlsxXVsyXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1pbkFyZWFIZWFwKCkge1xuICAgIHZhciBoZWFwID0ge30sXG4gICAgICAgIGFycmF5ID0gW10sXG4gICAgICAgIHNpemUgPSAwO1xuXG4gICAgaGVhcC5wdXNoID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICB1cChhcnJheVtvYmplY3QuXyA9IHNpemVdID0gb2JqZWN0LCBzaXplKyspO1xuICAgICAgcmV0dXJuIHNpemU7XG4gICAgfTtcblxuICAgIGhlYXAucG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2l6ZSA8PSAwKSByZXR1cm47XG4gICAgICB2YXIgcmVtb3ZlZCA9IGFycmF5WzBdLCBvYmplY3Q7XG4gICAgICBpZiAoLS1zaXplID4gMCkgb2JqZWN0ID0gYXJyYXlbc2l6ZV0sIGRvd24oYXJyYXlbb2JqZWN0Ll8gPSAwXSA9IG9iamVjdCwgMCk7XG4gICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9O1xuXG4gICAgaGVhcC5yZW1vdmUgPSBmdW5jdGlvbihyZW1vdmVkKSB7XG4gICAgICB2YXIgaSA9IHJlbW92ZWQuXywgb2JqZWN0O1xuICAgICAgaWYgKGFycmF5W2ldICE9PSByZW1vdmVkKSByZXR1cm47IC8vIGludmFsaWQgcmVxdWVzdFxuICAgICAgaWYgKGkgIT09IC0tc2l6ZSkgb2JqZWN0ID0gYXJyYXlbc2l6ZV0sIChjb21wYXJlQXJlYShvYmplY3QsIHJlbW92ZWQpIDwgMCA/IHVwIDogZG93bikoYXJyYXlbb2JqZWN0Ll8gPSBpXSA9IG9iamVjdCwgaSk7XG4gICAgICByZXR1cm4gaTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXAob2JqZWN0LCBpKSB7XG4gICAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgICAgdmFyIGogPSAoKGkgKyAxKSA+PiAxKSAtIDEsXG4gICAgICAgICAgICBwYXJlbnQgPSBhcnJheVtqXTtcbiAgICAgICAgaWYgKGNvbXBhcmVBcmVhKG9iamVjdCwgcGFyZW50KSA+PSAwKSBicmVhaztcbiAgICAgICAgYXJyYXlbcGFyZW50Ll8gPSBpXSA9IHBhcmVudDtcbiAgICAgICAgYXJyYXlbb2JqZWN0Ll8gPSBpID0gal0gPSBvYmplY3Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG93bihvYmplY3QsIGkpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByID0gKGkgKyAxKSA8PCAxLFxuICAgICAgICAgICAgbCA9IHIgLSAxLFxuICAgICAgICAgICAgaiA9IGksXG4gICAgICAgICAgICBjaGlsZCA9IGFycmF5W2pdO1xuICAgICAgICBpZiAobCA8IHNpemUgJiYgY29tcGFyZUFyZWEoYXJyYXlbbF0sIGNoaWxkKSA8IDApIGNoaWxkID0gYXJyYXlbaiA9IGxdO1xuICAgICAgICBpZiAociA8IHNpemUgJiYgY29tcGFyZUFyZWEoYXJyYXlbcl0sIGNoaWxkKSA8IDApIGNoaWxkID0gYXJyYXlbaiA9IHJdO1xuICAgICAgICBpZiAoaiA9PT0gaSkgYnJlYWs7XG4gICAgICAgIGFycmF5W2NoaWxkLl8gPSBpXSA9IGNoaWxkO1xuICAgICAgICBhcnJheVtvYmplY3QuXyA9IGkgPSBqXSA9IG9iamVjdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaGVhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUFic29sdXRlKHRyYW5zZm9ybSkge1xuICAgIGlmICghdHJhbnNmb3JtKSByZXR1cm4gbm9vcDtcbiAgICB2YXIgeDAsXG4gICAgICAgIHkwLFxuICAgICAgICBreCA9IHRyYW5zZm9ybS5zY2FsZVswXSxcbiAgICAgICAga3kgPSB0cmFuc2Zvcm0uc2NhbGVbMV0sXG4gICAgICAgIGR4ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVswXSxcbiAgICAgICAgZHkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzFdO1xuICAgIHJldHVybiBmdW5jdGlvbihwb2ludCwgaSkge1xuICAgICAgaWYgKCFpKSB4MCA9IHkwID0gMDtcbiAgICAgIHBvaW50WzBdID0gKHgwICs9IHBvaW50WzBdKSAqIGt4ICsgZHg7XG4gICAgICBwb2ludFsxXSA9ICh5MCArPSBwb2ludFsxXSkgKiBreSArIGR5O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZWxhdGl2ZSh0cmFuc2Zvcm0pIHtcbiAgICBpZiAoIXRyYW5zZm9ybSkgcmV0dXJuIG5vb3A7XG4gICAgdmFyIHgwLFxuICAgICAgICB5MCxcbiAgICAgICAga3ggPSB0cmFuc2Zvcm0uc2NhbGVbMF0sXG4gICAgICAgIGt5ID0gdHJhbnNmb3JtLnNjYWxlWzFdLFxuICAgICAgICBkeCA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMF0sXG4gICAgICAgIGR5ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVsxXTtcbiAgICByZXR1cm4gZnVuY3Rpb24ocG9pbnQsIGkpIHtcbiAgICAgIGlmICghaSkgeDAgPSB5MCA9IDA7XG4gICAgICB2YXIgeDEgPSAocG9pbnRbMF0gLSBkeCkgLyBreCB8IDAsXG4gICAgICAgICAgeTEgPSAocG9pbnRbMV0gLSBkeSkgLyBreSB8IDA7XG4gICAgICBwb2ludFswXSA9IHgxIC0geDA7XG4gICAgICBwb2ludFsxXSA9IHkxIC0geTA7XG4gICAgICB4MCA9IHgxO1xuICAgICAgeTAgPSB5MTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSBkZWZpbmUodG9wb2pzb24pO1xuICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IHRvcG9qc29uO1xuICBlbHNlIHRoaXMudG9wb2pzb24gPSB0b3BvanNvbjtcbn0oKTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIE1lYXN1cmVzID0gcmVxdWlyZSgnLi9tZWFzdXJlcycpLFxuICAgIENvbGxlY3RvciA9IHJlcXVpcmUoJy4vY29sbGVjdG9yJyk7XG5cbmZ1bmN0aW9uIEFnZ3JlZ2F0b3IoKSB7XG4gIHRoaXMuX2NlbGxzID0ge307XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgdGhpcy5fc3RyZWFtID0gZmFsc2U7XG59XG5cbnZhciBGbGFncyA9IEFnZ3JlZ2F0b3IuRmxhZ3MgPSB7XG4gIEFERF9DRUxMOiAxLFxuICBNT0RfQ0VMTDogMlxufTtcblxudmFyIHByb3RvID0gQWdncmVnYXRvci5wcm90b3R5cGU7XG5cbi8vIFBhcmFtZXRlcnNcblxucHJvdG8uc3RyZWFtID0gZnVuY3Rpb24odikge1xuICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICB0aGlzLl9zdHJlYW0gPSAhIXY7XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBrZXkgYWNjZXNzb3IgdG8gdXNlIGZvciBzdHJlYW1pbmcgcmVtb3Zlc1xucHJvdG8ua2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX2tleTtcbiAgdGhpcy5fa2V5ID0gdXRpbC4kKGtleSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gSW5wdXQ6IGFycmF5IG9mIG9iamVjdHMgb2YgdGhlIGZvcm1cbi8vIHtuYW1lOiBzdHJpbmcsIGdldDogZnVuY3Rpb259XG5wcm90by5ncm91cGJ5ID0gZnVuY3Rpb24oZGltcykge1xuICB0aGlzLl9kaW1zID0gdXRpbC5hcnJheShkaW1zKS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgIGQgPSB1dGlsLmlzU3RyaW5nKGQpID8ge25hbWU6IGQsIGdldDogdXRpbC4kKGQpfVxuICAgICAgOiB1dGlsLmlzRnVuY3Rpb24oZCkgPyB7bmFtZTogdXRpbC5uYW1lKGQpIHx8IGQubmFtZSB8fCAoJ18nICsgaSksIGdldDogZH1cbiAgICAgIDogKGQubmFtZSAmJiB1dGlsLmlzRnVuY3Rpb24oZC5nZXQpKSA/IGQgOiBudWxsO1xuICAgIGlmIChkID09IG51bGwpIHRocm93ICdJbnZhbGlkIGdyb3VwYnkgYXJndW1lbnQ6ICcgKyBkO1xuICAgIHJldHVybiBkO1xuICB9KTtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcbn07XG5cbi8vIElucHV0OiBhcnJheSBvZiBvYmplY3RzIG9mIHRoZSBmb3JtXG4vLyB7bmFtZTogc3RyaW5nLCBvcHM6IFtzdHJpbmcsIC4uLl19XG5wcm90by5zdW1tYXJpemUgPSBmdW5jdGlvbihmaWVsZHMpIHtcbiAgZmllbGRzID0gc3VtbWFyaXplX2FyZ3MoZmllbGRzKTtcbiAgdGhpcy5fY291bnQgPSB0cnVlO1xuICB2YXIgYWdnciA9ICh0aGlzLl9hZ2dyID0gW10pLFxuICAgICAgbSwgZiwgaSwgaiwgb3AsIGFzLCBnZXQ7XG5cbiAgZm9yIChpPTA7IGk8ZmllbGRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChqPTAsIG09W10sIGY9ZmllbGRzW2ldOyBqPGYub3BzLmxlbmd0aDsgKytqKSB7XG4gICAgICBvcCA9IGYub3BzW2pdO1xuICAgICAgaWYgKG9wICE9PSAnY291bnQnKSB0aGlzLl9jb3VudCA9IGZhbHNlO1xuICAgICAgYXMgPSAoZi5hcyAmJiBmLmFzW2pdKSB8fCAob3AgKyAoZi5uYW1lPT09JyonID8gJycgOiAnXycrZi5uYW1lKSk7XG4gICAgICBtLnB1c2goTWVhc3VyZXNbb3BdKGFzKSk7XG4gICAgfVxuICAgIGdldCA9IGYuZ2V0ICYmIHV0aWwuJChmLmdldCkgfHxcbiAgICAgIChmLm5hbWUgPT09ICcqJyA/IHV0aWwuaWRlbnRpdHkgOiB1dGlsLiQoZi5uYW1lKSk7XG4gICAgYWdnci5wdXNoKHtcbiAgICAgIG5hbWU6IGYubmFtZSxcbiAgICAgIG1lYXN1cmVzOiBNZWFzdXJlcy5jcmVhdGUoXG4gICAgICAgIG0sXG4gICAgICAgIHRoaXMuX3N0cmVhbSwgLy8gc3RyZWFtaW5nIHJlbW92ZSBmbGFnXG4gICAgICAgIGdldCwgICAgICAgICAgLy8gaW5wdXQgdHVwbGUgZ2V0dGVyXG4gICAgICAgIHRoaXMuX2Fzc2lnbikgLy8gb3V0cHV0IHR1cGxlIHNldHRlclxuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLmNsZWFyKCk7XG59O1xuXG4vLyBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VtbWFyaXplIGJ5IGNvdW50XG5wcm90by5jb3VudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdW1tYXJpemUoeycqJzonY291bnQnfSk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSB2YWx1ZSBhc3NpZ25tZW50XG5wcm90by5fYXNzaWduID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHN1bW1hcml6ZV9hcmdzKGZpZWxkcykge1xuICBpZiAodXRpbC5pc0FycmF5KGZpZWxkcykpIHsgcmV0dXJuIGZpZWxkczsgfVxuICBpZiAoZmllbGRzID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG4gIHZhciBhID0gW10sIG5hbWUsIG9wcztcbiAgZm9yIChuYW1lIGluIGZpZWxkcykge1xuICAgIG9wcyA9IHV0aWwuYXJyYXkoZmllbGRzW25hbWVdKTtcbiAgICBhLnB1c2goe25hbWU6IG5hbWUsIG9wczogb3BzfSk7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIENlbGwgTWFuYWdlbWVudFxuXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuX2NlbGxzID0ge30sIHRoaXMpO1xufTtcblxucHJvdG8uX2NlbGxrZXkgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBkID0gdGhpcy5fZGltcyxcbiAgICAgIG4gPSBkLmxlbmd0aCwgaSxcbiAgICAgIGsgPSBTdHJpbmcoZFswXS5nZXQoeCkpO1xuICBmb3IgKGk9MTsgaTxuOyArK2kpIHtcbiAgICBrICs9ICd8JyArIGRbaV0uZ2V0KHgpO1xuICB9XG4gIHJldHVybiBrO1xufTtcblxucHJvdG8uX2NlbGwgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXkgPSB0aGlzLl9kaW1zLmxlbmd0aCA/IHRoaXMuX2NlbGxrZXkoeCkgOiAnJztcbiAgcmV0dXJuIHRoaXMuX2NlbGxzW2tleV0gfHwgKHRoaXMuX2NlbGxzW2tleV0gPSB0aGlzLl9uZXdjZWxsKHgsIGtleSkpO1xufTtcblxucHJvdG8uX25ld2NlbGwgPSBmdW5jdGlvbih4LCBrZXkpIHtcbiAgdmFyIGNlbGwgPSB7XG4gICAgbnVtOiAgIDAsXG4gICAgdHVwbGU6IHRoaXMuX25ld3R1cGxlKHgsIGtleSksXG4gICAgZmxhZzogIEZsYWdzLkFERF9DRUxMLFxuICAgIGFnZ3M6ICB7fVxuICB9O1xuXG4gIHZhciBhZ2dyID0gdGhpcy5fYWdnciwgaTtcbiAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdID0gbmV3IGFnZ3JbaV0ubWVhc3VyZXMoY2VsbCwgY2VsbC50dXBsZSk7XG4gIH1cbiAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgIGNlbGwuZGF0YSA9IG5ldyBDb2xsZWN0b3IodGhpcy5fa2V5KTtcbiAgfVxuICByZXR1cm4gY2VsbDtcbn07XG5cbnByb3RvLl9uZXd0dXBsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGRpbXMgPSB0aGlzLl9kaW1zLFxuICAgICAgdCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj1kaW1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB0W2RpbXNbaV0ubmFtZV0gPSBkaW1zW2ldLmdldCh4KTtcbiAgfVxuICByZXR1cm4gdGhpcy5faW5nZXN0KHQpO1xufTtcblxuLy8gT3ZlcnJpZGUgdG8gcGVyZm9ybSBjdXN0b20gdHVwbGUgaW5nZXN0aW9uXG5wcm90by5faW5nZXN0ID0gdXRpbC5pZGVudGl0eTtcblxuLy8gUHJvY2VzcyBUdXBsZXNcblxucHJvdG8uX2FkZCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsKHgpLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG5cbiAgY2VsbC5udW0gKz0gMTtcbiAgaWYgKCF0aGlzLl9jb3VudCkgeyAvLyBza2lwIGlmIGNvdW50LW9ubHlcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSBjZWxsLmRhdGEuYWRkKHgpO1xuICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLmFkZCh4KTtcbiAgICB9XG4gIH1cbiAgY2VsbC5mbGFnIHw9IEZsYWdzLk1PRF9DRUxMO1xuICBpZiAodGhpcy5fb25fYWRkKSB0aGlzLl9vbl9hZGQoeCwgY2VsbCk7XG59O1xuXG5wcm90by5fcmVtID0gZnVuY3Rpb24oeCkge1xuICB2YXIgY2VsbCA9IHRoaXMuX2NlbGwoeCksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBjZWxsLm51bSAtPSAxO1xuICBpZiAoIXRoaXMuX2NvdW50KSB7IC8vIHNraXAgaWYgY291bnQtb25seVxuICAgIGlmIChjZWxsLmNvbGxlY3QpIGNlbGwuZGF0YS5yZW0oeCk7XG4gICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0ucmVtKHgpO1xuICAgIH1cbiAgfVxuICBjZWxsLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGlmICh0aGlzLl9vbl9yZW0pIHRoaXMuX29uX3JlbSh4LCBjZWxsKTtcbn07XG5cbnByb3RvLl9tb2QgPSBmdW5jdGlvbihjdXJyLCBwcmV2KSB7XG4gIHZhciBjZWxsMCA9IHRoaXMuX2NlbGwocHJldiksXG4gICAgICBjZWxsMSA9IHRoaXMuX2NlbGwoY3VyciksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBpZiAoY2VsbDAgIT09IGNlbGwxKSB7XG4gICAgY2VsbDAubnVtIC09IDE7XG4gICAgY2VsbDEubnVtICs9IDE7XG4gICAgaWYgKGNlbGwwLmNvbGxlY3QpIGNlbGwwLmRhdGEucmVtKHByZXYpO1xuICAgIGlmIChjZWxsMS5jb2xsZWN0KSBjZWxsMS5kYXRhLmFkZChjdXJyKTtcbiAgfSBlbHNlIGlmIChjZWxsMC5jb2xsZWN0ICYmICF1dGlsLmlzT2JqZWN0KGN1cnIpKSB7XG4gICAgY2VsbDAuZGF0YS5yZW0ocHJldik7XG4gICAgY2VsbDAuZGF0YS5hZGQoY3Vycik7XG4gIH1cblxuICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgY2VsbDAuYWdnc1thZ2dyW2ldLm5hbWVdLnJlbShwcmV2KTtcbiAgICBjZWxsMS5hZ2dzW2FnZ3JbaV0ubmFtZV0uYWRkKGN1cnIpO1xuICB9XG4gIGNlbGwwLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGNlbGwxLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGlmICh0aGlzLl9vbl9tb2QpIHRoaXMuX29uX21vZChjdXJyLCBwcmV2LCBjZWxsMCwgY2VsbDEpO1xufTtcblxucHJvdG8uX21hcmtNb2QgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBjZWxsMCA9IHRoaXMuX2NlbGwoeCk7XG4gIGNlbGwwLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG59O1xuXG5wcm90by5yZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsXG4gICAgICBjZWxsLCBpLCBrO1xuXG4gIGZvciAoayBpbiB0aGlzLl9jZWxscykge1xuICAgIGNlbGwgPSB0aGlzLl9jZWxsc1trXTtcbiAgICBpZiAoY2VsbC5udW0gPiAwKSB7XG4gICAgICAvLyBjb25zb2xpZGF0ZSBjb2xsZWN0b3IgdmFsdWVzXG4gICAgICBpZiAoY2VsbC5jb2xsZWN0KSB7XG4gICAgICAgIGNlbGwuZGF0YS52YWx1ZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZSB0dXBsZSBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLnNldCgpO1xuICAgICAgfVxuICAgICAgLy8gYWRkIG91dHB1dCB0dXBsZVxuICAgICAgcmVzdWx0LnB1c2goY2VsbC50dXBsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jZWxsc1trXTtcbiAgICB9XG4gICAgY2VsbC5mbGFnID0gMDtcbiAgfVxuXG4gIHRoaXMuX3JlbXMgPSBmYWxzZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnByb3RvLmNoYW5nZXMgPSBmdW5jdGlvbihvdXRwdXQpIHtcbiAgdmFyIGNoYW5nZXMgPSBvdXRwdXQgfHwge2FkZDpbXSwgcmVtOltdLCBtb2Q6W119LFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsXG4gICAgICBjZWxsLCBmbGFnLCBpLCBrO1xuXG4gIGZvciAoayBpbiB0aGlzLl9jZWxscykge1xuICAgIGNlbGwgPSB0aGlzLl9jZWxsc1trXTtcbiAgICBmbGFnID0gY2VsbC5mbGFnO1xuXG4gICAgLy8gY29uc29saWRhdGUgY29sbGVjdG9yIHZhbHVlc1xuICAgIGlmIChjZWxsLmNvbGxlY3QpIHtcbiAgICAgIGNlbGwuZGF0YS52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdHVwbGUgcHJvcGVydGllc1xuICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLnNldCgpO1xuICAgIH1cblxuICAgIC8vIG9yZ2FuaXplIG91dHB1dCB0dXBsZXNcbiAgICBpZiAoY2VsbC5udW0gPD0gMCkge1xuICAgICAgY2hhbmdlcy5yZW0ucHVzaChjZWxsLnR1cGxlKTsgLy8gaWYgKGZsYWcgPT09IEZsYWdzLk1PRF9DRUxMKSB7ID8/XG4gICAgICBkZWxldGUgdGhpcy5fY2VsbHNba107XG4gICAgICBpZiAodGhpcy5fb25fZHJvcCkgdGhpcy5fb25fZHJvcChjZWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX29uX2tlZXApIHRoaXMuX29uX2tlZXAoY2VsbCk7XG4gICAgICBpZiAoZmxhZyAmIEZsYWdzLkFERF9DRUxMKSB7XG4gICAgICAgIGNoYW5nZXMuYWRkLnB1c2goY2VsbC50dXBsZSk7XG4gICAgICB9IGVsc2UgaWYgKGZsYWcgJiBGbGFncy5NT0RfQ0VMTCkge1xuICAgICAgICBjaGFuZ2VzLm1vZC5wdXNoKGNlbGwudHVwbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNlbGwuZmxhZyA9IDA7XG4gIH1cblxuICB0aGlzLl9yZW1zID0gZmFsc2U7XG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxucHJvdG8uZXhlY3V0ZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiB0aGlzLmNsZWFyKCkuaW5zZXJ0KGlucHV0KS5yZXN1bHQoKTtcbn07XG5cbnByb3RvLmluc2VydCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHRoaXMuX2NvbnNvbGlkYXRlKCk7XG4gIGZvciAodmFyIGk9MDsgaTxpbnB1dC5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX2FkZChpbnB1dFtpXSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoIXRoaXMuX3N0cmVhbSkge1xuICAgIHRocm93ICdBZ2dyZWdhdG9yIG5vdCBjb25maWd1cmVkIGZvciBzdHJlYW1pbmcgcmVtb3Zlcy4nICtcbiAgICAgICcgQ2FsbCBzdHJlYW0odHJ1ZSkgcHJpb3IgdG8gY2FsbGluZyBzdW1tYXJpemUuJztcbiAgfVxuICBmb3IgKHZhciBpPTA7IGk8aW5wdXQubGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzLl9yZW0oaW5wdXRbaV0pO1xuICB9XG4gIHRoaXMuX3JlbXMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGNvbnNvbGlkYXRlIHJlbW92YWxzXG5wcm90by5fY29uc29saWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9yZW1zKSByZXR1cm47XG4gIGZvciAodmFyIGsgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICBpZiAodGhpcy5fY2VsbHNba10uY29sbGVjdCkge1xuICAgICAgdGhpcy5fY2VsbHNba10uZGF0YS52YWx1ZXMoKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fcmVtcyA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2dyZWdhdG9yO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgc3RhdHMgPSByZXF1aXJlKCcuLi9zdGF0cycpO1xuXG52YXIgUkVNID0gJ19fZGxfcmVtX18nO1xuXG5mdW5jdGlvbiBDb2xsZWN0b3Ioa2V5KSB7XG4gIHRoaXMuX2FkZCA9IFtdO1xuICB0aGlzLl9yZW0gPSBbXTtcbiAgdGhpcy5fa2V5ID0ga2V5IHx8IG51bGw7XG4gIHRoaXMuX2xhc3QgPSBudWxsO1xufVxuXG52YXIgcHJvdG8gPSBDb2xsZWN0b3IucHJvdG90eXBlO1xuXG5wcm90by5hZGQgPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuX2FkZC5wdXNoKHYpO1xufTtcblxucHJvdG8ucmVtID0gZnVuY3Rpb24odikge1xuICB0aGlzLl9yZW0ucHVzaCh2KTtcbn07XG5cbnByb3RvLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9nZXQgPSBudWxsO1xuICBpZiAodGhpcy5fcmVtLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuX2FkZDtcblxuICB2YXIgYSA9IHRoaXMuX2FkZCxcbiAgICAgIHIgPSB0aGlzLl9yZW0sXG4gICAgICBrID0gdGhpcy5fa2V5LFxuICAgICAgeCA9IEFycmF5KGEubGVuZ3RoIC0gci5sZW5ndGgpLFxuICAgICAgaSwgaiwgbiwgbTtcblxuICBpZiAoIXV0aWwuaXNPYmplY3QoclswXSkpIHtcbiAgICAvLyBwcm9jZXNzaW5nIHJhdyB2YWx1ZXNcbiAgICBtID0gc3RhdHMuY291bnQubWFwKHIpO1xuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAobVthW2ldXSA+IDApIHtcbiAgICAgICAgbVthW2ldXSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeFtqKytdID0gYVtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaykge1xuICAgIC8vIGhhcyB1bmlxdWUga2V5IGZpZWxkLCBzbyB1c2UgdGhhdFxuICAgIG0gPSB1dGlsLnRvTWFwKHIsIGspO1xuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAoIW0uaGFzT3duUHJvcGVydHkoayhhW2ldKSkpIHsgeFtqKytdID0gYVtpXTsgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBubyB1bmlxdWUga2V5LCBtYXJrIHR1cGxlcyBkaXJlY3RseVxuICAgIGZvciAoaT0wLCBuPXIubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgcltpXVtSRU1dID0gMTtcbiAgICB9XG4gICAgZm9yIChpPTAsIGo9MCwgbj1hLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGlmICghYVtpXVtSRU1dKSB7IHhbaisrXSA9IGFbaV07IH1cbiAgICB9XG4gICAgZm9yIChpPTAsIG49ci5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBkZWxldGUgcltpXVtSRU1dO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuX3JlbSA9IFtdO1xuICByZXR1cm4gKHRoaXMuX2FkZCA9IHgpO1xufTtcblxuLy8gbWVtb2l6aW5nIHN0YXRpc3RpY3MgbWV0aG9kc1xuXG5wcm90by5leHRlbnQgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2dldCAhPT0gZ2V0IHx8ICF0aGlzLl9leHQpIHtcbiAgICB2YXIgdiA9IHRoaXMudmFsdWVzKCksXG4gICAgICAgIGkgPSBzdGF0cy5leHRlbnQuaW5kZXgodiwgZ2V0KTtcbiAgICB0aGlzLl9leHQgPSBbdltpWzBdXSwgdltpWzFdXV07XG4gICAgdGhpcy5fZ2V0ID0gZ2V0O1xuICB9XG4gIHJldHVybiB0aGlzLl9leHQ7XG59O1xuXG5wcm90by5hcmdtaW4gPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW50KGdldClbMF07XG59O1xuXG5wcm90by5hcmdtYXggPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW50KGdldClbMV07XG59O1xuXG5wcm90by5taW4gPSBmdW5jdGlvbihnZXQpIHtcbiAgdmFyIG0gPSB0aGlzLmV4dGVudChnZXQpWzBdO1xuICByZXR1cm4gbSA/IGdldChtKSA6ICtJbmZpbml0eTtcbn07XG5cbnByb3RvLm1heCA9IGZ1bmN0aW9uKGdldCkge1xuICB2YXIgbSA9IHRoaXMuZXh0ZW50KGdldClbMV07XG4gIHJldHVybiBtID8gZ2V0KG0pIDogLUluZmluaXR5O1xufTtcblxucHJvdG8ucXVhcnRpbGUgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2dldCAhPT0gZ2V0IHx8ICF0aGlzLl9xKSB7XG4gICAgdGhpcy5fcSA9IHN0YXRzLnF1YXJ0aWxlKHRoaXMudmFsdWVzKCksIGdldCk7XG4gICAgdGhpcy5fZ2V0ID0gZ2V0O1xuICB9XG4gIHJldHVybiB0aGlzLl9xO1xufTtcblxucHJvdG8ucTEgPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMucXVhcnRpbGUoZ2V0KVswXTtcbn07XG5cbnByb3RvLnEyID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLnF1YXJ0aWxlKGdldClbMV07XG59O1xuXG5wcm90by5xMyA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5xdWFydGlsZShnZXQpWzJdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0b3I7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBBZ2dyZWdhdG9yID0gcmVxdWlyZSgnLi9hZ2dyZWdhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGZsYXR0ZW4gYXJndW1lbnRzIGludG8gYSBzaW5nbGUgYXJyYXlcbiAgdmFyIGFyZ3MgPSBbXS5yZWR1Y2UuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uKGEsIHgpIHtcbiAgICByZXR1cm4gYS5jb25jYXQodXRpbC5hcnJheSh4KSk7XG4gIH0sIFtdKTtcbiAgLy8gY3JlYXRlIGFuZCByZXR1cm4gYW4gYWdncmVnYXRvclxuICByZXR1cm4gbmV3IEFnZ3JlZ2F0b3IoKVxuICAgIC5ncm91cGJ5KGFyZ3MpXG4gICAgLnN1bW1hcml6ZSh7JyonOid2YWx1ZXMnfSk7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciB0eXBlcyA9IHtcbiAgJ3ZhbHVlcyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWx1ZXMnLFxuICAgIGluaXQ6ICdjZWxsLmNvbGxlY3QgPSB0cnVlOycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS52YWx1ZXMoKScsIGlkeDogLTFcbiAgfSksXG4gICdjb3VudCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdjb3VudCcsXG4gICAgc2V0OiAgJ2NlbGwubnVtJ1xuICB9KSxcbiAgJ21pc3NpbmcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWlzc2luZycsXG4gICAgc2V0OiAgJ3RoaXMubWlzc2luZydcbiAgfSksXG4gICd2YWxpZCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWxpZCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQnXG4gIH0pLFxuICAnc3VtJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3N1bScsXG4gICAgaW5pdDogJ3RoaXMuc3VtID0gMDsnLFxuICAgIGFkZDogICd0aGlzLnN1bSArPSB2OycsXG4gICAgcmVtOiAgJ3RoaXMuc3VtIC09IHY7JyxcbiAgICBzZXQ6ICAndGhpcy5zdW0nXG4gIH0pLFxuICAnbWVhbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtZWFuJyxcbiAgICBpbml0OiAndGhpcy5tZWFuID0gMDsnLFxuICAgIGFkZDogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiArPSBkIC8gdGhpcy52YWxpZDsnLFxuICAgIHJlbTogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiAtPSB0aGlzLnZhbGlkID8gZCAvIHRoaXMudmFsaWQgOiB0aGlzLm1lYW47JyxcbiAgICBzZXQ6ICAndGhpcy5tZWFuJ1xuICB9KSxcbiAgJ2F2ZXJhZ2UnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXZlcmFnZScsXG4gICAgc2V0OiAgJ3RoaXMubWVhbicsXG4gICAgcmVxOiAgWydtZWFuJ10sIGlkeDogMVxuICB9KSxcbiAgJ3ZhcmlhbmNlJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlJyxcbiAgICBpbml0OiAndGhpcy5kZXYgPSAwOycsXG4gICAgYWRkOiAgJ3RoaXMuZGV2ICs9IGQgKiAodiAtIHRoaXMubWVhbik7JyxcbiAgICByZW06ICAndGhpcy5kZXYgLT0gZCAqICh2IC0gdGhpcy5tZWFuKTsnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkgOiAwJyxcbiAgICByZXE6ICBbJ21lYW4nXSwgaWR4OiAxXG4gIH0pLFxuICAndmFyaWFuY2VwJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlcCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gdGhpcy5kZXYgLyB0aGlzLnZhbGlkIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdGRldicsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gTWF0aC5zcXJ0KHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkpIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldnAnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3RkZXZwJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyBNYXRoLnNxcnQodGhpcy5kZXYgLyB0aGlzLnZhbGlkKSA6IDAnLFxuICAgIHJlcTogIFsndmFyaWFuY2UnXSwgaWR4OiAyXG4gIH0pLFxuICAnbWVkaWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lZGlhbicsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMih0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ3ExJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ExJyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnExKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAncTMnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAncTMnLFxuICAgIHNldDogICdjZWxsLmRhdGEucTModGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdkaXN0aW5jdCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdkaXN0aW5jdCcsXG4gICAgc2V0OiAgJ3RoaXMuZGlzdGluY3QoY2VsbC5kYXRhLnZhbHVlcygpLCB0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtaW4nLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLmFyZ21pbiA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMuYXJnbWluID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21pbiA9IHRoaXMuYXJnbWluIHx8IGNlbGwuZGF0YS5hcmdtaW4odGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21pbiddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21heCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtYXgnLFxuICAgIGFkZDogICdpZiAodiA+IHRoaXMubWF4KSB0aGlzLmFyZ21heCA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPj0gdGhpcy5tYXgpIHRoaXMuYXJnbWF4ID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21heCA9IHRoaXMuYXJnbWF4IHx8IGNlbGwuZGF0YS5hcmdtYXgodGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21heCddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaW4nLFxuICAgIGluaXQ6ICd0aGlzLm1pbiA9ICtJbmZpbml0eTsnLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLm1pbiA9IHY7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMubWluID0gTmFOOycsXG4gICAgc2V0OiAgJ3RoaXMubWluID0gKGlzTmFOKHRoaXMubWluKSA/IGNlbGwuZGF0YS5taW4odGhpcy5nZXQpIDogdGhpcy5taW4pJyxcbiAgICBzdHI6ICBbJ3ZhbHVlcyddLCBpZHg6IDRcbiAgfSksXG4gICdtYXgnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWF4JyxcbiAgICBpbml0OiAndGhpcy5tYXggPSAtSW5maW5pdHk7JyxcbiAgICBhZGQ6ICAnaWYgKHYgPiB0aGlzLm1heCkgdGhpcy5tYXggPSB2OycsXG4gICAgcmVtOiAgJ2lmICh2ID49IHRoaXMubWF4KSB0aGlzLm1heCA9IE5hTjsnLFxuICAgIHNldDogICd0aGlzLm1heCA9IChpc05hTih0aGlzLm1heCkgPyBjZWxsLmRhdGEubWF4KHRoaXMuZ2V0KSA6IHRoaXMubWF4KScsXG4gICAgc3RyOiAgWyd2YWx1ZXMnXSwgaWR4OiA0XG4gIH0pLFxuICAnbW9kZXNrZXcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbW9kZXNrZXcnLFxuICAgIHNldDogICd0aGlzLmRldj09PTAgPyAwIDogKHRoaXMubWVhbiAtIGNlbGwuZGF0YS5xMih0aGlzLmdldCkpIC8gTWF0aC5zcXJ0KHRoaXMuZGV2Lyh0aGlzLnZhbGlkLTEpKScsXG4gICAgcmVxOiAgWydtZWFuJywgJ3N0ZGV2JywgJ21lZGlhbiddLCBpZHg6IDVcbiAgfSlcbn07XG5cbmZ1bmN0aW9uIG1lYXN1cmUoYmFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob3V0KSB7XG4gICAgdmFyIG0gPSB1dGlsLmV4dGVuZCh7aW5pdDonJywgYWRkOicnLCByZW06JycsIGlkeDowfSwgYmFzZSk7XG4gICAgbS5vdXQgPSBvdXQgfHwgYmFzZS5uYW1lO1xuICAgIHJldHVybiBtO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGFnZywgc3RyZWFtKSB7XG4gIGZ1bmN0aW9uIGNvbGxlY3QobSwgYSkge1xuICAgIGZ1bmN0aW9uIGhlbHBlcihyKSB7IGlmICghbVtyXSkgY29sbGVjdChtLCBtW3JdID0gdHlwZXNbcl0oKSk7IH1cbiAgICBpZiAoYS5yZXEpIGEucmVxLmZvckVhY2goaGVscGVyKTtcbiAgICBpZiAoc3RyZWFtICYmIGEuc3RyKSBhLnN0ci5mb3JFYWNoKGhlbHBlcik7XG4gICAgcmV0dXJuIG07XG4gIH1cbiAgdmFyIG1hcCA9IGFnZy5yZWR1Y2UoXG4gICAgY29sbGVjdCxcbiAgICBhZ2cucmVkdWNlKGZ1bmN0aW9uKG0sIGEpIHsgcmV0dXJuIChtW2EubmFtZV0gPSBhLCBtKTsgfSwge30pXG4gICk7XG4gIHJldHVybiB1dGlsLnZhbHMobWFwKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuaWR4IC0gYi5pZHg7IH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoYWdnLCBzdHJlYW0sIGFjY2Vzc29yLCBtdXRhdG9yKSB7XG4gIHZhciBhbGwgPSByZXNvbHZlKGFnZywgc3RyZWFtKSxcbiAgICAgIGN0ciA9ICd0aGlzLmNlbGwgPSBjZWxsOyB0aGlzLnR1cGxlID0gdDsgdGhpcy52YWxpZCA9IDA7IHRoaXMubWlzc2luZyA9IDA7JyxcbiAgICAgIGFkZCA9ICdpZiAodj09bnVsbCkgdGhpcy5taXNzaW5nKys7IGlmICghdGhpcy5pc1ZhbGlkKHYpKSByZXR1cm47ICsrdGhpcy52YWxpZDsnLFxuICAgICAgcmVtID0gJ2lmICh2PT1udWxsKSB0aGlzLm1pc3NpbmctLTsgaWYgKCF0aGlzLmlzVmFsaWQodikpIHJldHVybjsgLS10aGlzLnZhbGlkOycsXG4gICAgICBzZXQgPSAndmFyIHQgPSB0aGlzLnR1cGxlOyB2YXIgY2VsbCA9IHRoaXMuY2VsbDsnO1xuXG4gIGFsbC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICBpZiAoYS5pZHggPCAwKSB7XG4gICAgICBjdHIgPSBhLmluaXQgKyBjdHI7XG4gICAgICBhZGQgPSBhLmFkZCArIGFkZDtcbiAgICAgIHJlbSA9IGEucmVtICsgcmVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHIgKz0gYS5pbml0O1xuICAgICAgYWRkICs9IGEuYWRkO1xuICAgICAgcmVtICs9IGEucmVtO1xuICAgIH1cbiAgfSk7XG4gIGFnZy5zbGljZSgpXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pZHggLSBiLmlkeDsgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICBzZXQgKz0gJ3RoaXMuYXNzaWduKHQsXFwnJythLm91dCsnXFwnLCcrYS5zZXQrJyk7JztcbiAgICB9KTtcbiAgc2V0ICs9ICdyZXR1cm4gdDsnO1xuXG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIGN0ciA9IEZ1bmN0aW9uKCdjZWxsJywgJ3QnLCBjdHIpO1xuICBjdHIucHJvdG90eXBlLmFzc2lnbiA9IG11dGF0b3I7XG4gIGN0ci5wcm90b3R5cGUuYWRkID0gRnVuY3Rpb24oJ3QnLCAndmFyIHYgPSB0aGlzLmdldCh0KTsnICsgYWRkKTtcbiAgY3RyLnByb3RvdHlwZS5yZW0gPSBGdW5jdGlvbigndCcsICd2YXIgdiA9IHRoaXMuZ2V0KHQpOycgKyByZW0pO1xuICBjdHIucHJvdG90eXBlLnNldCA9IEZ1bmN0aW9uKHNldCk7XG4gIGN0ci5wcm90b3R5cGUuZ2V0ID0gYWNjZXNzb3I7XG4gIGN0ci5wcm90b3R5cGUuZGlzdGluY3QgPSByZXF1aXJlKCcuLi9zdGF0cycpLmNvdW50LmRpc3RpbmN0O1xuICBjdHIucHJvdG90eXBlLmlzVmFsaWQgPSB1dGlsLmlzVmFsaWQ7XG4gIGN0ci5maWVsZHMgPSBhZ2cubWFwKHV0aWwuJCgnb3V0JykpO1xuICByZXR1cm4gY3RyO1xufVxuXG50eXBlcy5jcmVhdGUgPSBjcmVhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVzO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgdGltZSA9IHJlcXVpcmUoJy4uL3RpbWUnKSxcbiAgICBFUFNJTE9OID0gMWUtMTU7XG5cbmZ1bmN0aW9uIGJpbnMob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZGV0ZXJtaW5lIHJhbmdlXG4gIHZhciBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMTUsXG4gICAgICBiYXNlID0gb3B0LmJhc2UgfHwgMTAsXG4gICAgICBsb2diID0gTWF0aC5sb2coYmFzZSksXG4gICAgICBkaXYgPSBvcHQuZGl2IHx8IFs1LCAyXSxcbiAgICAgIG1pbiA9IG9wdC5taW4sXG4gICAgICBtYXggPSBvcHQubWF4LFxuICAgICAgc3BhbiA9IG1heCAtIG1pbixcbiAgICAgIHN0ZXAsIGxldmVsLCBtaW5zdGVwLCBwcmVjaXNpb24sIHYsIGksIGVwcztcblxuICBpZiAob3B0LnN0ZXApIHtcbiAgICAvLyBpZiBzdGVwIHNpemUgaXMgZXhwbGljaXRseSBnaXZlbiwgdXNlIHRoYXRcbiAgICBzdGVwID0gb3B0LnN0ZXA7XG4gIH0gZWxzZSBpZiAob3B0LnN0ZXBzKSB7XG4gICAgLy8gaWYgcHJvdmlkZWQsIGxpbWl0IGNob2ljZSB0byBhY2NlcHRhYmxlIHN0ZXAgc2l6ZXNcbiAgICBzdGVwID0gb3B0LnN0ZXBzW01hdGgubWluKFxuICAgICAgb3B0LnN0ZXBzLmxlbmd0aCAtIDEsXG4gICAgICBiaXNlY3Qob3B0LnN0ZXBzLCBzcGFuL21heGIsIDAsIG9wdC5zdGVwcy5sZW5ndGgpXG4gICAgKV07XG4gIH0gZWxzZSB7XG4gICAgLy8gZWxzZSB1c2Ugc3BhbiB0byBkZXRlcm1pbmUgc3RlcCBzaXplXG4gICAgbGV2ZWwgPSBNYXRoLmNlaWwoTWF0aC5sb2cobWF4YikgLyBsb2diKTtcbiAgICBtaW5zdGVwID0gb3B0Lm1pbnN0ZXAgfHwgMDtcbiAgICBzdGVwID0gTWF0aC5tYXgoXG4gICAgICBtaW5zdGVwLFxuICAgICAgTWF0aC5wb3coYmFzZSwgTWF0aC5yb3VuZChNYXRoLmxvZyhzcGFuKSAvIGxvZ2IpIC0gbGV2ZWwpXG4gICAgKTtcblxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgZG8geyBzdGVwICo9IGJhc2U7IH0gd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4Yik7XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBkYXRlIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIHVuaXRzID0gb3B0LnV0YyA/IHRpbWUudXRjIDogdGltZSxcbiAgICAgIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIGJpbnMgPSByZXF1aXJlKCcuL2JpbnMnKSxcbiAgICBnZW4gID0gcmVxdWlyZSgnLi4vZ2VuZXJhdGUnKSxcbiAgICB0eXBlID0gcmVxdWlyZSgnLi4vaW1wb3J0L3R5cGUnKSxcbiAgICB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHN0YXRzID0gcmVxdWlyZSgnLi4vc3RhdHMnKTtcblxudmFyIHF0eXBlID0ge1xuICAnaW50ZWdlcic6IDEsXG4gICdudW1iZXInOiAxLFxuICAnZGF0ZSc6IDFcbn07XG5cbmZ1bmN0aW9uICRiaW4odmFsdWVzLCBmLCBvcHQpIHtcbiAgb3B0ID0gb3B0aW9ucyh2YWx1ZXMsIGYsIG9wdCk7XG4gIHZhciBiID0gc3BlYyhvcHQpO1xuICByZXR1cm4gIWIgPyAob3B0LmFjY2Vzc29yIHx8IHV0aWwuaWRlbnRpdHkpIDpcbiAgICB1dGlsLiRmdW5jKCdiaW4nLCBiLnVuaXQudW5pdCA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBiLnZhbHVlKGIudW5pdC51bml0KHgpKTsgfSA6XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBiLnZhbHVlKHgpOyB9XG4gICAgKShvcHQuYWNjZXNzb3IpO1xufVxuXG5mdW5jdGlvbiBoaXN0b2dyYW0odmFsdWVzLCBmLCBvcHQpIHtcbiAgb3B0ID0gb3B0aW9ucyh2YWx1ZXMsIGYsIG9wdCk7XG4gIHZhciBiID0gc3BlYyhvcHQpO1xuICByZXR1cm4gYiA/XG4gICAgbnVtZXJpY2FsKHZhbHVlcywgb3B0LmFjY2Vzc29yLCBiKSA6XG4gICAgY2F0ZWdvcmljYWwodmFsdWVzLCBvcHQuYWNjZXNzb3IsIG9wdCAmJiBvcHQuc29ydCk7XG59XG5cbmZ1bmN0aW9uIHNwZWMob3B0KSB7XG4gIHZhciB0ID0gb3B0LnR5cGUsIGIgPSBudWxsO1xuICBpZiAodCA9PSBudWxsIHx8IHF0eXBlW3RdKSB7XG4gICAgaWYgKHQgPT09ICdpbnRlZ2VyJyAmJiBvcHQubWluc3RlcCA9PSBudWxsKSBvcHQubWluc3RlcCA9IDE7XG4gICAgYiA9ICh0ID09PSAnZGF0ZScpID8gYmlucy5kYXRlKG9wdCkgOiBiaW5zKG9wdCk7XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbmZ1bmN0aW9uIG9wdGlvbnMoKSB7XG4gIHZhciBhID0gYXJndW1lbnRzLFxuICAgICAgaSA9IDAsXG4gICAgICB2YWx1ZXMgPSB1dGlsLmlzQXJyYXkoYVtpXSkgPyBhW2krK10gOiBudWxsLFxuICAgICAgZiA9IHV0aWwuaXNGdW5jdGlvbihhW2ldKSB8fCB1dGlsLmlzU3RyaW5nKGFbaV0pID8gdXRpbC4kKGFbaSsrXSkgOiBudWxsLFxuICAgICAgb3B0ID0gdXRpbC5leHRlbmQoe30sIGFbaV0pO1xuXG4gIGlmICh2YWx1ZXMpIHtcbiAgICBvcHQudHlwZSA9IG9wdC50eXBlIHx8IHR5cGUodmFsdWVzLCBmKTtcbiAgICBpZiAocXR5cGVbb3B0LnR5cGVdKSB7XG4gICAgICB2YXIgZXh0ID0gc3RhdHMuZXh0ZW50KHZhbHVlcywgZik7XG4gICAgICBvcHQgPSB1dGlsLmV4dGVuZCh7bWluOiBleHRbMF0sIG1heDogZXh0WzFdfSwgb3B0KTtcbiAgICB9XG4gIH1cbiAgaWYgKGYpIHsgb3B0LmFjY2Vzc29yID0gZjsgfVxuICByZXR1cm4gb3B0O1xufVxuXG5mdW5jdGlvbiBudW1lcmljYWwodmFsdWVzLCBmLCBiKSB7XG4gIHZhciBoID0gZ2VuLnJhbmdlKGIuc3RhcnQsIGIuc3RvcCArIGIuc3RlcC8yLCBiLnN0ZXApXG4gICAgLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiB7dmFsdWU6IGIudmFsdWUodiksIGNvdW50OiAwfTsgfSk7XG5cbiAgZm9yICh2YXIgaT0wLCB2LCBqOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGogPSBiLmluZGV4KHYpO1xuICAgICAgaWYgKGogPCAwIHx8IGogPj0gaC5sZW5ndGggfHwgIWlzRmluaXRlKGopKSBjb250aW51ZTtcbiAgICAgIGhbal0uY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgaC5iaW5zID0gYjtcbiAgcmV0dXJuIGg7XG59XG5cbmZ1bmN0aW9uIGNhdGVnb3JpY2FsKHZhbHVlcywgZiwgc29ydCkge1xuICB2YXIgdSA9IHN0YXRzLnVuaXF1ZSh2YWx1ZXMsIGYpLFxuICAgICAgYyA9IHN0YXRzLmNvdW50Lm1hcCh2YWx1ZXMsIGYpO1xuICByZXR1cm4gdS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4ge3ZhbHVlOiBrLCBjb3VudDogY1trXX07IH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKHNvcnQgPyAnLWNvdW50JyA6ICcrdmFsdWUnKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAkYmluOiAkYmluLFxuICBoaXN0b2dyYW06IGhpc3RvZ3JhbVxufTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgdHlwZSA9IHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKSxcbiAgICBzdGF0cyA9IHJlcXVpcmUoJy4vc3RhdHMnKSxcbiAgICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRhYmxlOiAgIGZvcm1hdFRhYmxlLCAgLy8gZm9ybWF0IGEgZGF0YSB0YWJsZVxuICBzdW1tYXJ5OiBmb3JtYXRTdW1tYXJ5IC8vIGZvcm1hdCBhIGRhdGEgdGFibGUgc3VtbWFyeVxufTtcblxudmFyIEZNVCA9IHtcbiAgJ2RhdGUnOiAgICAnfHRpbWU6XCIlbS8lZC8lWSAlSDolTTolU1wiJyxcbiAgJ251bWJlcic6ICAnfG51bWJlcjpcIi40ZlwiJyxcbiAgJ2ludGVnZXInOiAnfG51bWJlcjpcImRcIidcbn07XG5cbnZhciBQT1MgPSB7XG4gICdudW1iZXInOiAgJ2xlZnQnLFxuICAnaW50ZWdlcic6ICdsZWZ0J1xufTtcblxuZnVuY3Rpb24gZm9ybWF0VGFibGUoZGF0YSwgb3B0KSB7XG4gIG9wdCA9IHV0aWwuZXh0ZW5kKHtzZXBhcmF0b3I6JyAnLCBtaW53aWR0aDogOCwgbWF4d2lkdGg6IDE1fSwgb3B0KTtcbiAgdmFyIGZpZWxkcyA9IG9wdC5maWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pLFxuICAgICAgdHlwZXMgPSB0eXBlLmFsbChkYXRhKTtcblxuICBpZiAob3B0LnN0YXJ0IHx8IG9wdC5saW1pdCkge1xuICAgIHZhciBhID0gb3B0LnN0YXJ0IHx8IDAsXG4gICAgICAgIGIgPSBvcHQubGltaXQgPyBhICsgb3B0LmxpbWl0IDogZGF0YS5sZW5ndGg7XG4gICAgZGF0YSA9IGRhdGEuc2xpY2UoYSwgYik7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgY2hhciB3aWR0aCBvZiBmaWVsZHNcbiAgdmFyIGxlbnMgPSBmaWVsZHMubWFwKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgZm9ybWF0ID0gRk1UW3R5cGVzW25hbWVdXSB8fCAnJyxcbiAgICAgICAgdCA9IHRlbXBsYXRlKCd7eycgKyBuYW1lICsgZm9ybWF0ICsgJ319JyksXG4gICAgICAgIGwgPSBzdGF0cy5tYXgoZGF0YSwgZnVuY3Rpb24oeCkgeyByZXR1cm4gdCh4KS5sZW5ndGg7IH0pO1xuICAgIGwgPSBNYXRoLm1heChNYXRoLm1pbihuYW1lLmxlbmd0aCwgb3B0Lm1pbndpZHRoKSwgbCk7XG4gICAgcmV0dXJuIG9wdC5tYXh3aWR0aCA+IDAgPyBNYXRoLm1pbihsLCBvcHQubWF4d2lkdGgpIDogbDtcbiAgfSk7XG5cbiAgLy8gcHJpbnQgaGVhZGVyIHJvd1xuICB2YXIgaGVhZCA9IGZpZWxkcy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiB1dGlsLnRydW5jYXRlKHV0aWwucGFkKG5hbWUsIGxlbnNbaV0sICdjZW50ZXInKSwgbGVuc1tpXSk7XG4gIH0pLmpvaW4ob3B0LnNlcGFyYXRvcik7XG5cbiAgLy8gYnVpbGQgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIGVhY2ggcm93XG4gIHZhciB0bXBsID0gdGVtcGxhdGUoZmllbGRzLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgcmV0dXJuICd7eycgK1xuICAgICAgbmFtZSArXG4gICAgICAoRk1UW3R5cGVzW25hbWVdXSB8fCAnJykgK1xuICAgICAgKCd8cGFkOicgKyBsZW5zW2ldICsgJywnICsgKFBPU1t0eXBlc1tuYW1lXV0gfHwgJ3JpZ2h0JykpICtcbiAgICAgICgnfHRydW5jYXRlOicgKyBsZW5zW2ldKSArXG4gICAgJ319JztcbiAgfSkuam9pbihvcHQuc2VwYXJhdG9yKSk7XG5cbiAgLy8gcHJpbnQgdGFibGVcbiAgcmV0dXJuIGhlYWQgKyBcIlxcblwiICsgZGF0YS5tYXAodG1wbCkuam9pbignXFxuJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFN1bW1hcnkocykge1xuICBzID0gcyA/IHMuX19zdW1tYXJ5X18gPyBzIDogc3RhdHMuc3VtbWFyeShzKSA6IHRoaXM7XG4gIHZhciBzdHIgPSBbXSwgaSwgbjtcbiAgZm9yIChpPTAsIG49cy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RyLnB1c2goJy0tICcgKyBzW2ldLmZpZWxkICsgJyAtLScpO1xuICAgIGlmIChzW2ldLnR5cGUgPT09ICdzdHJpbmcnIHx8IHNbaV0uZGlzdGluY3QgPCAxMCkge1xuICAgICAgc3RyLnB1c2gocHJpbnRDYXRlZ29yaWNhbFByb2ZpbGUoc1tpXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIucHVzaChwcmludFF1YW50aXRhdGl2ZVByb2ZpbGUoc1tpXSkpO1xuICAgIH1cbiAgICBzdHIucHVzaCgnJyk7XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHApIHtcbiAgcmV0dXJuIFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICdtaW46ICAgICAgJyArIHAubWluLFxuICAgICdtYXg6ICAgICAgJyArIHAubWF4LFxuICAgICdtZWRpYW46ICAgJyArIHAubWVkaWFuLFxuICAgICdtZWFuOiAgICAgJyArIHAubWVhbixcbiAgICAnc3RkZXY6ICAgICcgKyBwLnN0ZGV2LFxuICAgICdtb2Rlc2tldzogJyArIHAubW9kZXNrZXdcbiAgXS5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRDYXRlZ29yaWNhbFByb2ZpbGUocCkge1xuICB2YXIgbGlzdCA9IFtcbiAgICAndmFsaWQ6ICAgICcgKyBwLnZhbGlkLFxuICAgICdtaXNzaW5nOiAgJyArIHAubWlzc2luZyxcbiAgICAnZGlzdGluY3Q6ICcgKyBwLmRpc3RpbmN0LFxuICAgICd0b3AgdmFsdWVzOiAnXG4gIF07XG4gIHZhciB1ID0gcC51bmlxdWU7XG4gIHZhciB0b3AgPSB1dGlsLmtleXModSlcbiAgICAuc29ydChmdW5jdGlvbihhLGIpIHsgcmV0dXJuIHVbYl0gLSB1W2FdOyB9KVxuICAgIC5zbGljZSgwLCA2KVxuICAgIC5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gJyBcXCcnICsgdiArICdcXCcgKCcgKyB1W3ZdICsgJyknOyB9KTtcbiAgcmV0dXJuIGxpc3QuY29uY2F0KHRvcCkuam9pbignXFxuJyk7XG59IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpLFxuICAgIGQzX3RpbWVGID0gcmVxdWlyZSgnZDMtdGltZS1mb3JtYXQnKSxcbiAgICBkM19udW1iZXJGID0gcmVxdWlyZSgnZDMtZm9ybWF0JyksXG4gICAgbnVtYmVyRiA9IGQzX251bWJlckYsIC8vIGRlZmF1bHRzIHRvIEVOLVVTXG4gICAgdGltZUYgPSBkM190aW1lRiwgICAgIC8vIGRlZmF1bHRzIHRvIEVOLVVTXG4gICAgdG1wRGF0ZSA9IG5ldyBEYXRlKDIwMDAsIDAsIDEpLFxuICAgIG1vbnRoRnVsbCwgbW9udGhBYmJyLCBkYXlGdWxsLCBkYXlBYmJyO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBVcGRhdGUgbnVtYmVyIGZvcm1hdHRlciB0byB1c2UgcHJvdmlkZWQgbG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gIC8vIEZvciBtb3JlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0XG4gIG51bWJlckxvY2FsZTogbnVtYmVyTG9jYWxlLFxuICBudW1iZXI6ICAgICAgIGZ1bmN0aW9uKGYpIHsgcmV0dXJuIG51bWJlckYuZm9ybWF0KGYpOyB9LFxuICBudW1iZXJQcmVmaXg6IGZ1bmN0aW9uKGYsIHYpIHsgcmV0dXJuIG51bWJlckYuZm9ybWF0UHJlZml4KGYsIHYpOyB9LFxuXG4gIC8vIFVwZGF0ZSB0aW1lIGZvcm1hdHRlciB0byB1c2UgcHJvdmlkZWQgbG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gIC8vIEZvciBtb3JlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdGltZS1mb3JtYXRcbiAgdGltZUxvY2FsZTogICB0aW1lTG9jYWxlLFxuICB0aW1lOiAgICAgICAgIGZ1bmN0aW9uKGYpIHsgcmV0dXJuIHRpbWVGLmZvcm1hdChmKTsgfSxcbiAgdXRjOiAgICAgICAgICBmdW5jdGlvbihmKSB7IHJldHVybiB0aW1lRi51dGNGb3JtYXQoZik7IH0sXG5cbiAgLy8gU2V0IG51bWJlciBhbmQgdGltZSBsb2NhbGUgc2ltdWx0YW5lb3VzbHkuXG4gIGxvY2FsZTogICAgICAgZnVuY3Rpb24obCkgeyBudW1iZXJMb2NhbGUobCk7IHRpbWVMb2NhbGUobCk7IH0sXG5cbiAgLy8gYXV0b21hdGljIGZvcm1hdHRpbmcgZnVuY3Rpb25zXG4gIGF1dG86IHtcbiAgICBudW1iZXI6ICAgYXV0b051bWJlckZvcm1hdCxcbiAgICBsaW5lYXI6ICAgbGluZWFyTnVtYmVyRm9ybWF0LFxuICAgIHRpbWU6ICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRpbWVBdXRvRm9ybWF0KCk7IH0sXG4gICAgdXRjOiAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdXRjQXV0b0Zvcm1hdCgpOyB9XG4gIH0sXG5cbiAgbW9udGg6IG1vbnRoRm9ybWF0LCAvLyBmb3JtYXQgbW9udGggbmFtZSBmcm9tIGludGVnZXIgY29kZVxuICBkYXk6ICAgZGF5Rm9ybWF0ICAgIC8vIGZvcm1hdCB3ZWVrIGRheSBuYW1lIGZyb20gaW50ZWdlciBjb2RlXG59O1xuXG4vLyAtLSBMb2NhbGVzIC0tLS1cblxuLy8gdHJhbnNmb3JtICdlbi1VUycgc3R5bGUgbG9jYWxlIHN0cmluZyB0byBtYXRjaCBkMy1mb3JtYXQgdjAuNCsgY29udmVudGlvblxuZnVuY3Rpb24gbG9jYWxlUmVmKGwpIHtcbiAgcmV0dXJuIGwubGVuZ3RoID4gNCAmJiAnbG9jYWxlJyArIChcbiAgICBsWzBdLnRvVXBwZXJDYXNlKCkgKyBsWzFdLnRvTG93ZXJDYXNlKCkgK1xuICAgIGxbM10udG9VcHBlckNhc2UoKSArIGxbNF0udG9Mb3dlckNhc2UoKVxuICApO1xufVxuXG5mdW5jdGlvbiBudW1iZXJMb2NhbGUobCkge1xuICB2YXIgZiA9IHV0aWwuaXNTdHJpbmcobCkgPyBkM19udW1iZXJGW2xvY2FsZVJlZihsKV0gOiBkM19udW1iZXJGLmxvY2FsZShsKTtcbiAgaWYgKGYgPT0gbnVsbCkgdGhyb3cgRXJyb3IoJ1VucmVjb2duaXplZCBsb2NhbGU6ICcgKyBsKTtcbiAgbnVtYmVyRiA9IGY7XG59XG5cbmZ1bmN0aW9uIHRpbWVMb2NhbGUobCkge1xuICB2YXIgZiA9IHV0aWwuaXNTdHJpbmcobCkgPyBkM190aW1lRltsb2NhbGVSZWYobCldIDogZDNfdGltZUYubG9jYWxlKGwpO1xuICBpZiAoZiA9PSBudWxsKSB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIGxvY2FsZTogJyArIGwpO1xuICB0aW1lRiA9IGY7XG4gIG1vbnRoRnVsbCA9IG1vbnRoQWJiciA9IGRheUZ1bGwgPSBkYXlBYmJyID0gbnVsbDtcbn1cblxuLy8gLS0gTnVtYmVyIEZvcm1hdHRpbmcgLS0tLVxuXG52YXIgZTEwID0gTWF0aC5zcXJ0KDUwKSxcbiAgICBlNSA9IE1hdGguc3FydCgxMCksXG4gICAgZTIgPSBNYXRoLnNxcnQoMik7XG5cbmZ1bmN0aW9uIGxpbmVhclJhbmdlKGRvbWFpbiwgY291bnQpIHtcbiAgaWYgKCFkb21haW4ubGVuZ3RoKSBkb21haW4gPSBbMF07XG4gIGlmIChjb3VudCA9PSBudWxsKSBjb3VudCA9IDEwO1xuXG4gIHZhciBzdGFydCA9IGRvbWFpblswXSxcbiAgICAgIHN0b3AgPSBkb21haW5bZG9tYWluLmxlbmd0aCAtIDFdO1xuXG4gIGlmIChzdG9wIDwgc3RhcnQpIHsgZXJyb3IgPSBzdG9wOyBzdG9wID0gc3RhcnQ7IHN0YXJ0ID0gZXJyb3I7IH1cblxuICB2YXIgc3BhbiA9IChzdG9wIC0gc3RhcnQpIHx8IChjb3VudCA9IDEsIHN0YXJ0IHx8IHN0b3AgfHwgMSksXG4gICAgICBzdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coc3BhbiAvIGNvdW50KSAvIE1hdGguTE4xMCkpLFxuICAgICAgZXJyb3IgPSBzcGFuIC8gY291bnQgLyBzdGVwO1xuXG4gIC8vIEZpbHRlciB0aWNrcyB0byBnZXQgY2xvc2VyIHRvIHRoZSBkZXNpcmVkIGNvdW50LlxuICBpZiAoZXJyb3IgPj0gZTEwKSBzdGVwICo9IDEwO1xuICBlbHNlIGlmIChlcnJvciA+PSBlNSkgc3RlcCAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcCAqPSAyO1xuXG4gIC8vIFJvdW5kIHN0YXJ0IGFuZCBzdG9wIHZhbHVlcyB0byBzdGVwIGludGVydmFsLlxuICByZXR1cm4gW1xuICAgIE1hdGguY2VpbChzdGFydCAvIHN0ZXApICogc3RlcCxcbiAgICBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKSAqIHN0ZXAgKyBzdGVwIC8gMiwgLy8gaW5jbHVzaXZlXG4gICAgc3RlcFxuICBdO1xufVxuXG5mdW5jdGlvbiB0cmltWmVybyhmLCBkZWNpbWFsKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgdmFyIHMgPSBmKHgpLFxuICAgICAgICBuID0gcy5pbmRleE9mKGRlY2ltYWwpO1xuICAgIGlmIChuIDwgMCkgcmV0dXJuIHM7XG5cbiAgICB2YXIgaWR4ID0gcmlnaHRtb3N0RGlnaXQocywgbiksXG4gICAgICAgIGVuZCA9IGlkeCA8IHMubGVuZ3RoID8gcy5zbGljZShpZHgpIDogJyc7XG5cbiAgICB3aGlsZSAoLS1pZHggPiBuKSB7XG4gICAgICBpZiAoc1tpZHhdICE9PSAnMCcpIHsgKytpZHg7IGJyZWFrOyB9XG4gICAgfVxuICAgIHJldHVybiBzLnNsaWNlKDAsIGlkeCkgKyBlbmQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJpZ2h0bW9zdERpZ2l0KHMsIG4pIHtcbiAgdmFyIGkgPSBzLmxhc3RJbmRleE9mKCdlJyksIGM7XG4gIGlmIChpID4gMCkgcmV0dXJuIGk7XG4gIGZvciAoaT1zLmxlbmd0aDsgLS1pID4gbjspIHtcbiAgICBjID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjID49IDQ4ICYmIGMgPD0gNTcpIHJldHVybiBpKzE7IC8vIGlzIGRpZ2l0XG4gIH1cbn1cblxuZnVuY3Rpb24gYXV0b051bWJlckZvcm1hdChmKSB7XG4gIHZhciBkZWNpbWFsID0gbnVtYmVyRi5mb3JtYXQoJy4xZicpKDEpWzFdOyAvLyBnZXQgZGVjaW1hbCBjaGFyXG4gIGlmIChmID09IG51bGwpIGYgPSAnLCc7XG4gIGYgPSBkM19udW1iZXJGLmZvcm1hdFNwZWNpZmllcihmKTtcbiAgaWYgKGYucHJlY2lzaW9uID09IG51bGwpIGYucHJlY2lzaW9uID0gMTI7XG4gIHN3aXRjaCAoZi50eXBlKSB7XG4gICAgY2FzZSAnJSc6IGYucHJlY2lzaW9uIC09IDI7IGJyZWFrO1xuICAgIGNhc2UgJ2UnOiBmLnByZWNpc2lvbiAtPSAxOyBicmVhaztcbiAgfVxuICByZXR1cm4gdHJpbVplcm8obnVtYmVyRi5mb3JtYXQoZiksIGRlY2ltYWwpO1xufVxuXG5mdW5jdGlvbiBsaW5lYXJOdW1iZXJGb3JtYXQoZG9tYWluLCBjb3VudCwgZikge1xuICB2YXIgcmFuZ2UgPSBsaW5lYXJSYW5nZShkb21haW4sIGNvdW50KTtcblxuICBpZiAoZiA9PSBudWxsKSBmID0gJyxmJztcblxuICBzd2l0Y2ggKGYgPSBkM19udW1iZXJGLmZvcm1hdFNwZWNpZmllcihmKSwgZi50eXBlKSB7XG4gICAgY2FzZSAncyc6IHtcbiAgICAgIHZhciB2YWx1ZSA9IE1hdGgubWF4KE1hdGguYWJzKHJhbmdlWzBdKSwgTWF0aC5hYnMocmFuZ2VbMV0pKTtcbiAgICAgIGlmIChmLnByZWNpc2lvbiA9PSBudWxsKSBmLnByZWNpc2lvbiA9IGQzX251bWJlckYucHJlY2lzaW9uUHJlZml4KHJhbmdlWzJdLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gbnVtYmVyRi5mb3JtYXRQcmVmaXgoZiwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlICcnOlxuICAgIGNhc2UgJ2UnOlxuICAgIGNhc2UgJ2cnOlxuICAgIGNhc2UgJ3AnOlxuICAgIGNhc2UgJ3InOiB7XG4gICAgICBpZiAoZi5wcmVjaXNpb24gPT0gbnVsbCkgZi5wcmVjaXNpb24gPSBkM19udW1iZXJGLnByZWNpc2lvblJvdW5kKHJhbmdlWzJdLCBNYXRoLm1heChNYXRoLmFicyhyYW5nZVswXSksIE1hdGguYWJzKHJhbmdlWzFdKSkpIC0gKGYudHlwZSA9PT0gJ2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdmJzpcbiAgICBjYXNlICclJzoge1xuICAgICAgaWYgKGYucHJlY2lzaW9uID09IG51bGwpIGYucHJlY2lzaW9uID0gZDNfbnVtYmVyRi5wcmVjaXNpb25GaXhlZChyYW5nZVsyXSkgLSAyICogKGYudHlwZSA9PT0gJyUnKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyRi5mb3JtYXQoZik7XG59XG5cbi8vIC0tIERhdGV0aW1lIEZvcm1hdHRpbmcgLS0tLVxuXG5mdW5jdGlvbiB0aW1lQXV0b0Zvcm1hdCgpIHtcbiAgdmFyIGYgPSB0aW1lRi5mb3JtYXQsXG4gICAgICBmb3JtYXRNaWxsaXNlY29uZCA9IGYoJy4lTCcpLFxuICAgICAgZm9ybWF0U2Vjb25kID0gZignOiVTJyksXG4gICAgICBmb3JtYXRNaW51dGUgPSBmKCclSTolTScpLFxuICAgICAgZm9ybWF0SG91ciA9IGYoJyVJICVwJyksXG4gICAgICBmb3JtYXREYXkgPSBmKCclYSAlZCcpLFxuICAgICAgZm9ybWF0V2VlayA9IGYoJyViICVkJyksXG4gICAgICBmb3JtYXRNb250aCA9IGYoJyVCJyksXG4gICAgICBmb3JtYXRZZWFyID0gZignJVknKTtcblxuICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciBkID0gK2RhdGU7XG4gICAgcmV0dXJuIChkM190aW1lLnNlY29uZChkYXRlKSA8IGQgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICA6IGQzX3RpbWUubWludXRlKGRhdGUpIDwgZCA/IGZvcm1hdFNlY29uZFxuICAgICAgICA6IGQzX3RpbWUuaG91cihkYXRlKSA8IGQgPyBmb3JtYXRNaW51dGVcbiAgICAgICAgOiBkM190aW1lLmRheShkYXRlKSA8IGQgPyBmb3JtYXRIb3VyXG4gICAgICAgIDogZDNfdGltZS5tb250aChkYXRlKSA8IGQgP1xuICAgICAgICAgIChkM190aW1lLndlZWsoZGF0ZSkgPCBkID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgOiBkM190aW1lLnllYXIoZGF0ZSkgPCBkID8gZm9ybWF0TW9udGhcbiAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXRjQXV0b0Zvcm1hdCgpIHtcbiAgdmFyIGYgPSB0aW1lRi51dGNGb3JtYXQsXG4gICAgICBmb3JtYXRNaWxsaXNlY29uZCA9IGYoJy4lTCcpLFxuICAgICAgZm9ybWF0U2Vjb25kID0gZignOiVTJyksXG4gICAgICBmb3JtYXRNaW51dGUgPSBmKCclSTolTScpLFxuICAgICAgZm9ybWF0SG91ciA9IGYoJyVJICVwJyksXG4gICAgICBmb3JtYXREYXkgPSBmKCclYSAlZCcpLFxuICAgICAgZm9ybWF0V2VlayA9IGYoJyViICVkJyksXG4gICAgICBmb3JtYXRNb250aCA9IGYoJyVCJyksXG4gICAgICBmb3JtYXRZZWFyID0gZignJVknKTtcblxuICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciBkID0gK2RhdGU7XG4gICAgcmV0dXJuIChkM190aW1lLnV0Y1NlY29uZChkYXRlKSA8IGQgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICA6IGQzX3RpbWUudXRjTWludXRlKGRhdGUpIDwgZCA/IGZvcm1hdFNlY29uZFxuICAgICAgICA6IGQzX3RpbWUudXRjSG91cihkYXRlKSA8IGQgPyBmb3JtYXRNaW51dGVcbiAgICAgICAgOiBkM190aW1lLnV0Y0RheShkYXRlKSA8IGQgPyBmb3JtYXRIb3VyXG4gICAgICAgIDogZDNfdGltZS51dGNNb250aChkYXRlKSA8IGQgP1xuICAgICAgICAgIChkM190aW1lLnV0Y1dlZWsoZGF0ZSkgPCBkID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgOiBkM190aW1lLnV0Y1llYXIoZGF0ZSkgPCBkID8gZm9ybWF0TW9udGhcbiAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbW9udGhGb3JtYXQobW9udGgsIGFiYnJldmlhdGUpIHtcbiAgdmFyIGYgPSBhYmJyZXZpYXRlID9cbiAgICAobW9udGhBYmJyIHx8IChtb250aEFiYnIgPSB0aW1lRi5mb3JtYXQoJyViJykpKSA6XG4gICAgKG1vbnRoRnVsbCB8fCAobW9udGhGdWxsID0gdGltZUYuZm9ybWF0KCclQicpKSk7XG4gIHJldHVybiAodG1wRGF0ZS5zZXRNb250aChtb250aCksIGYodG1wRGF0ZSkpO1xufVxuXG5mdW5jdGlvbiBkYXlGb3JtYXQoZGF5LCBhYmJyZXZpYXRlKSB7XG4gIHZhciBmID0gYWJicmV2aWF0ZSA/XG4gICAgKGRheUFiYnIgfHwgKGRheUFiYnIgPSB0aW1lRi5mb3JtYXQoJyVhJykpKSA6XG4gICAgKGRheUZ1bGwgfHwgKGRheUZ1bGwgPSB0aW1lRi5mb3JtYXQoJyVBJykpKTtcbiAgcmV0dXJuICh0bXBEYXRlLnNldE1vbnRoKDApLCB0bXBEYXRlLnNldERhdGUoMiArIGRheSksIGYodG1wRGF0ZSkpO1xufSIsInZhciBnZW4gPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5nZW4ucmVwZWF0ID0gZnVuY3Rpb24odmFsLCBuKSB7XG4gIHZhciBhID0gQXJyYXkobiksIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgYVtpXSA9IHZhbDtcbiAgcmV0dXJuIGE7XG59O1xuXG5nZW4uemVyb3MgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiBnZW4ucmVwZWF0KDAsIG4pO1xufTtcblxuZ2VuLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgc3RlcCA9IDE7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICB9XG4gIGlmICgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXAgPT0gSW5maW5pdHkpIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgcmFuZ2UnKTtcbiAgdmFyIHJhbmdlID0gW10sIGkgPSAtMSwgajtcbiAgaWYgKHN0ZXAgPCAwKSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpID4gc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgZWxzZSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpIDwgc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuZ2VuLnJhbmRvbSA9IHt9O1xuXG5nZW4ucmFuZG9tLnVuaWZvcm0gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICBtYXggPSBtaW4gPT09IHVuZGVmaW5lZCA/IDEgOiBtaW47XG4gICAgbWluID0gMDtcbiAgfVxuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWluICsgZCAqIE1hdGgucmFuZG9tKCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID49IG1pbiAmJiB4IDw9IG1heCkgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCA8IG1pbiA/IDAgOiB4ID4gbWF4ID8gMSA6ICh4IC0gbWluKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gbWluICsgcCpkIDogTmFOO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIGIgPSBhO1xuICAgIGEgPSAwO1xuICB9XG4gIHZhciBkID0gYiAtIGE7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKGQgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggPT09IE1hdGguZmxvb3IoeCkgJiYgeCA+PSBhICYmIHggPCBiKSA/IDEvZCA6IDA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciB2ID0gTWF0aC5mbG9vcih4KTtcbiAgICByZXR1cm4gdiA8IGEgPyAwIDogdiA+PSBiID8gMSA6ICh2IC0gYSArIDEpIC8gZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAocCA+PSAwICYmIHAgPD0gMSkgPyBhIC0gMSArIE1hdGguZmxvb3IocCpkKSA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLm5vcm1hbCA9IGZ1bmN0aW9uKG1lYW4sIHN0ZGV2KSB7XG4gIG1lYW4gPSBtZWFuIHx8IDA7XG4gIHN0ZGV2ID0gc3RkZXYgfHwgMTtcbiAgdmFyIG5leHQ7XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSAwLCB5ID0gMCwgcmRzLCBjO1xuICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSBuZXh0O1xuICAgICAgbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSoyLTE7XG4gICAgICByZHMgPSB4KnggKyB5Knk7XG4gICAgfSB3aGlsZSAocmRzID09PSAwIHx8IHJkcyA+IDEpO1xuICAgIGMgPSBNYXRoLnNxcnQoLTIqTWF0aC5sb2cocmRzKS9yZHMpOyAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybVxuICAgIG5leHQgPSBtZWFuICsgeSpjKnN0ZGV2O1xuICAgIHJldHVybiBtZWFuICsgeCpjKnN0ZGV2O1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciBleHAgPSBNYXRoLmV4cChNYXRoLnBvdyh4LW1lYW4sIDIpIC8gKC0yICogTWF0aC5wb3coc3RkZXYsIDIpKSk7XG4gICAgcmV0dXJuICgxIC8gKHN0ZGV2ICogTWF0aC5zcXJ0KDIqTWF0aC5QSSkpKSAqIGV4cDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBmcm9tIFdlc3QgKDIwMDkpXG4gICAgLy8gQmV0dGVyIEFwcHJveGltYXRpb25zIHRvIEN1bXVsYXRpdmUgTm9ybWFsIEZ1bmN0aW9uc1xuICAgIHZhciBjZCxcbiAgICAgICAgeiA9ICh4IC0gbWVhbikgLyBzdGRldixcbiAgICAgICAgWiA9IE1hdGguYWJzKHopO1xuICAgIGlmIChaID4gMzcpIHtcbiAgICAgIGNkID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1bSwgZXhwID0gTWF0aC5leHAoLVoqWi8yKTtcbiAgICAgIGlmIChaIDwgNy4wNzEwNjc4MTE4NjU0Nykge1xuICAgICAgICBzdW0gPSAzLjUyNjI0OTY1OTk4OTExZS0wMiAqIFogKyAwLjcwMDM4MzA2NDQ0MzY4ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDYuMzczOTYyMjAzNTMxNjU7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAzMy45MTI4NjYwNzgzODM7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAxMTIuMDc5MjkxNDk3ODcxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMjIxLjIxMzU5NjE2OTkzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMC4yMDY4Njc5MTIzNzY7XG4gICAgICAgIGNkID0gZXhwICogc3VtO1xuICAgICAgICBzdW0gPSA4LjgzODgzNDc2NDgzMTg0ZS0wMiAqIFogKyAxLjc1NTY2NzE2MzE4MjY0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTYuMDY0MTc3NTc5MjA3O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgODYuNzgwNzMyMjAyOTQ2MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDI5Ni41NjQyNDg3Nzk2NzQ7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2MzcuMzMzNjMzMzc4ODMxO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNzkzLjgyNjUxMjUxOTk0ODtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDQ0MC40MTM3MzU4MjQ3NTI7XG4gICAgICAgIGNkID0gY2QgLyBzdW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdW0gPSBaICsgMC42NTtcbiAgICAgICAgc3VtID0gWiArIDQgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAzIC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMiAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDEgLyBzdW07XG4gICAgICAgIGNkID0gZXhwIC8gc3VtIC8gMi41MDY2MjgyNzQ2MzE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6ID4gMCA/IDEgLSBjZCA6IGNkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgLy8gQXBwcm94aW1hdGlvbiBvZiBQcm9iaXQgZnVuY3Rpb24gdXNpbmcgaW52ZXJzZSBlcnJvciBmdW5jdGlvbi5cbiAgICBpZiAocCA8PSAwIHx8IHAgPj0gMSkgcmV0dXJuIE5hTjtcbiAgICB2YXIgeCA9IDIqcCAtIDEsXG4gICAgICAgIHYgPSAoOCAqIChNYXRoLlBJIC0gMykpIC8gKDMgKiBNYXRoLlBJICogKDQtTWF0aC5QSSkpLFxuICAgICAgICBhID0gKDIgLyAoTWF0aC5QSSp2KSkgKyAoTWF0aC5sb2coMSAtIE1hdGgucG93KHgsMikpIC8gMiksXG4gICAgICAgIGIgPSBNYXRoLmxvZygxIC0gKHgqeCkpIC8gdixcbiAgICAgICAgcyA9ICh4ID4gMCA/IDEgOiAtMSkgKiBNYXRoLnNxcnQoTWF0aC5zcXJ0KChhKmEpIC0gYikgLSBhKTtcbiAgICByZXR1cm4gbWVhbiArIHN0ZGV2ICogTWF0aC5TUVJUMiAqIHM7XG4gIH07XG4gIHJldHVybiBmO1xufTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKTtcbnZhciBkM19kc3YgPSByZXF1aXJlKCdkMy1kc3YnKTtcblxuZnVuY3Rpb24gZHN2KGRhdGEsIGZvcm1hdCkge1xuICBpZiAoZGF0YSkge1xuICAgIHZhciBoID0gZm9ybWF0LmhlYWRlcjtcbiAgICBkYXRhID0gKGggPyBoLmpvaW4oZm9ybWF0LmRlbGltaXRlcikgKyAnXFxuJyA6ICcnKSArIGRhdGE7XG4gIH1cbiAgcmV0dXJuIGQzX2Rzdi5kc3YoZm9ybWF0LmRlbGltaXRlcikucGFyc2UoZGF0YSk7XG59XG5cbmRzdi5kZWxpbWl0ZXIgPSBmdW5jdGlvbihkZWxpbSkge1xuICB2YXIgZm10ID0ge2RlbGltaXRlcjogZGVsaW19O1xuICByZXR1cm4gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gICAgcmV0dXJuIGRzdihkYXRhLCBmb3JtYXQgPyB1dGlsLmV4dGVuZChmb3JtYXQsIGZtdCkgOiBmbXQpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkc3Y7XG4iLCJ2YXIgZHN2ID0gcmVxdWlyZSgnLi9kc3YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGpzb246IHJlcXVpcmUoJy4vanNvbicpLFxuICB0b3BvanNvbjogcmVxdWlyZSgnLi90b3BvanNvbicpLFxuICB0cmVlanNvbjogcmVxdWlyZSgnLi90cmVlanNvbicpLFxuICBkc3Y6IGRzdixcbiAgY3N2OiBkc3YuZGVsaW1pdGVyKCcsJyksXG4gIHRzdjogZHN2LmRlbGltaXRlcignXFx0Jylcbn07XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBmb3JtYXQpIHtcbiAgdmFyIGQgPSB1dGlsLmlzT2JqZWN0KGRhdGEpICYmICF1dGlsLmlzQnVmZmVyKGRhdGEpID9cbiAgICBkYXRhIDogSlNPTi5wYXJzZShkYXRhKTtcbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQucHJvcGVydHkpIHtcbiAgICBkID0gdXRpbC5hY2Nlc3Nvcihmb3JtYXQucHJvcGVydHkpKGQpO1xuICB9XG4gIHJldHVybiBkO1xufTtcbiIsInZhciBqc29uID0gcmVxdWlyZSgnLi9qc29uJyk7XG5cbnZhciByZWFkZXIgPSBmdW5jdGlvbihkYXRhLCBmb3JtYXQpIHtcbiAgdmFyIHRvcG9qc29uID0gcmVhZGVyLnRvcG9qc29uO1xuICBpZiAodG9wb2pzb24gPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignVG9wb0pTT04gbGlicmFyeSBub3QgbG9hZGVkLicpOyB9XG5cbiAgdmFyIHQgPSBqc29uKGRhdGEsIGZvcm1hdCksIG9iajtcblxuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC5mZWF0dXJlKSB7XG4gICAgaWYgKChvYmogPSB0Lm9iamVjdHNbZm9ybWF0LmZlYXR1cmVdKSkge1xuICAgICAgcmV0dXJuIHRvcG9qc29uLmZlYXR1cmUodCwgb2JqKS5mZWF0dXJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVG9wb0pTT04gb2JqZWN0OiAnICsgZm9ybWF0LmZlYXR1cmUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChmb3JtYXQgJiYgZm9ybWF0Lm1lc2gpIHtcbiAgICBpZiAoKG9iaiA9IHQub2JqZWN0c1tmb3JtYXQubWVzaF0pKSB7XG4gICAgICByZXR1cm4gW3RvcG9qc29uLm1lc2godCwgdC5vYmplY3RzW2Zvcm1hdC5tZXNoXSldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBUb3BvSlNPTiBvYmplY3Q6ICcgKyBmb3JtYXQubWVzaCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdNaXNzaW5nIFRvcG9KU09OIGZlYXR1cmUgb3IgbWVzaCBwYXJhbWV0ZXIuJyk7XG4gIH1cbn07XG5cbnJlYWRlci50b3BvanNvbiA9IHJlcXVpcmUoJ3RvcG9qc29uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlYWRlcjtcbiIsInZhciBqc29uID0gcmVxdWlyZSgnLi9qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHJlZSwgZm9ybWF0KSB7XG4gIHJldHVybiB0b1RhYmxlKGpzb24odHJlZSwgZm9ybWF0KSwgZm9ybWF0KTtcbn07XG5cbmZ1bmN0aW9uIHRvVGFibGUocm9vdCwgZmllbGRzKSB7XG4gIHZhciBjaGlsZHJlbkZpZWxkID0gZmllbGRzICYmIGZpZWxkcy5jaGlsZHJlbiB8fCAnY2hpbGRyZW4nLFxuICAgICAgcGFyZW50RmllbGQgPSBmaWVsZHMgJiYgZmllbGRzLnBhcmVudCB8fCAncGFyZW50JyxcbiAgICAgIHRhYmxlID0gW107XG5cbiAgZnVuY3Rpb24gdmlzaXQobm9kZSwgcGFyZW50KSB7XG4gICAgbm9kZVtwYXJlbnRGaWVsZF0gPSBwYXJlbnQ7XG4gICAgdGFibGUucHVzaChub2RlKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlW2NoaWxkcmVuRmllbGRdO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZpc2l0KGNoaWxkcmVuW2ldLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aXNpdChyb290LCBudWxsKTtcbiAgcmV0dXJuICh0YWJsZS5yb290ID0gcm9vdCwgdGFibGUpO1xufVxuIiwiLy8gTWF0Y2hlcyBhYnNvbHV0ZSBVUkxzIHdpdGggb3B0aW9uYWwgcHJvdG9jb2xcbi8vICAgaHR0cHM6Ly8uLi4gICAgZmlsZTovLy4uLiAgICAvLy4uLlxudmFyIHByb3RvY29sX3JlID0gL14oW0EtWmEtel0rOik/XFwvXFwvLztcblxuLy8gU3BlY2lhbCB0cmVhdG1lbnQgaW4gbm9kZS5qcyBmb3IgdGhlIGZpbGU6IHByb3RvY29sXG52YXIgZmlsZVByb3RvY29sID0gJ2ZpbGU6Ly8nO1xuXG4vLyBWYWxpZGF0ZSBhbmQgY2xlYW51cCBVUkwgdG8gZW5zdXJlIHRoYXQgaXQgaXMgYWxsb3dlZCB0byBiZSBhY2Nlc3NlZFxuLy8gUmV0dXJucyBjbGVhbmVkIHVwIFVSTCwgb3IgZmFsc2UgaWYgYWNjZXNzIGlzIG5vdCBhbGxvd2VkXG5mdW5jdGlvbiBzYW5pdGl6ZVVybChvcHQpIHtcbiAgdmFyIHVybCA9IG9wdC51cmw7XG4gIGlmICghdXJsICYmIG9wdC5maWxlKSB7IHJldHVybiBmaWxlUHJvdG9jb2wgKyBvcHQuZmlsZTsgfVxuXG4gIC8vIEluIGNhc2UgdGhpcyBpcyBhIHJlbGF0aXZlIHVybCAoaGFzIG5vIGhvc3QpLCBwcmVwZW5kIG9wdC5iYXNlVVJMXG4gIGlmIChvcHQuYmFzZVVSTCAmJiAhcHJvdG9jb2xfcmUudGVzdCh1cmwpKSB7XG4gICAgaWYgKCFzdGFydHNXaXRoKHVybCwgJy8nKSAmJiBvcHQuYmFzZVVSTFtvcHQuYmFzZVVSTC5sZW5ndGgtMV0gIT09ICcvJykge1xuICAgICAgdXJsID0gJy8nICsgdXJsOyAvLyBFbnN1cmUgdGhhdCB0aGVyZSBpcyBhIHNsYXNoIGJldHdlZW4gdGhlIGJhc2VVUkwgKGUuZy4gaG9zdG5hbWUpIGFuZCB1cmxcbiAgICB9XG4gICAgdXJsID0gb3B0LmJhc2VVUkwgKyB1cmw7XG4gIH1cbiAgLy8gcmVsYXRpdmUgcHJvdG9jb2wsIHN0YXJ0cyB3aXRoICcvLydcbiAgaWYgKCFsb2FkLnVzZVhIUiAmJiBzdGFydHNXaXRoKHVybCwgJy8vJykpIHtcbiAgICB1cmwgPSAob3B0LmRlZmF1bHRQcm90b2NvbCB8fCAnaHR0cCcpICsgJzonICsgdXJsO1xuICB9XG4gIC8vIElmIG9wdC5kb21haW5XaGl0ZUxpc3QgaXMgc2V0LCBvbmx5IGFsbG93cyB1cmwsIHdob3NlIGhvc3RuYW1lXG4gIC8vICogSXMgdGhlIHNhbWUgYXMgdGhlIG9yaWdpbiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKVxuICAvLyAqIEVxdWFscyBvbmUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgd2hpdGVsaXN0XG4gIC8vICogSXMgYSBwcm9wZXIgc3ViZG9tYWluIG9mIG9uZSBvZiB0aGUgdmFsdWVzIGluIHRoZSB3aGl0ZWxpc3RcbiAgaWYgKG9wdC5kb21haW5XaGl0ZUxpc3QpIHtcbiAgICB2YXIgZG9tYWluLCBvcmlnaW47XG4gICAgaWYgKGxvYWQudXNlWEhSKSB7XG4gICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgIC8vIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MzY1MTMvaG93LWRvLWktcGFyc2UtYS11cmwtaW50by1ob3N0bmFtZS1hbmQtcGF0aC1pbi1qYXZhc2NyaXB0XG4gICAgICAvLyBJRSBkb2Vzbid0IHBvcHVsYXRlIGFsbCBsaW5rIHByb3BlcnRpZXMgd2hlbiBzZXR0aW5nIC5ocmVmIHdpdGggYSByZWxhdGl2ZSBVUkwsXG4gICAgICAvLyBob3dldmVyIC5ocmVmIHdpbGwgcmV0dXJuIGFuIGFic29sdXRlIFVSTCB3aGljaCB0aGVuIGNhbiBiZSB1c2VkIG9uIGl0c2VsZlxuICAgICAgLy8gdG8gcG9wdWxhdGUgdGhlc2UgYWRkaXRpb25hbCBmaWVsZHMuXG4gICAgICBpZiAoYS5ob3N0ID09PSAnJykge1xuICAgICAgICBhLmhyZWYgPSBhLmhyZWY7XG4gICAgICB9XG4gICAgICBkb21haW4gPSBhLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbGF0aXZlIHByb3RvY29sIGlzIGJyb2tlbjogaHR0cHM6Ly9naXRodWIuY29tL2RlZnVuY3R6b21iaWUvbm9kZS11cmwvaXNzdWVzLzVcbiAgICAgIHZhciBwYXJ0cyA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlKHVybCk7XG4gICAgICBkb21haW4gPSBwYXJ0cy5ob3N0bmFtZTtcbiAgICAgIG9yaWdpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG9yaWdpbiAhPT0gZG9tYWluKSB7XG4gICAgICB2YXIgd2hpdGVMaXN0ZWQgPSBvcHQuZG9tYWluV2hpdGVMaXN0LnNvbWUoZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgaWR4ID0gZG9tYWluLmxlbmd0aCAtIGQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gZCA9PT0gZG9tYWluIHx8XG4gICAgICAgICAgKGlkeCA+IDEgJiYgZG9tYWluW2lkeC0xXSA9PT0gJy4nICYmIGRvbWFpbi5sYXN0SW5kZXhPZihkKSA9PT0gaWR4KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCF3aGl0ZUxpc3RlZCkge1xuICAgICAgICB0aHJvdyAnVVJMIGlzIG5vdCB3aGl0ZWxpc3RlZDogJyArIHVybDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cblxuZnVuY3Rpb24gbG9hZChvcHQsIGNhbGxiYWNrKSB7XG4gIHZhciBlcnJvciA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGUpIHsgdGhyb3cgZTsgfSwgdXJsO1xuXG4gIHRyeSB7XG4gICAgdXJsID0gbG9hZC5zYW5pdGl6ZVVybChvcHQpOyAvLyBlbmFibGUgb3ZlcnJpZGVcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyb3IoZXJyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIGVycm9yKCdJbnZhbGlkIFVSTDogJyArIG9wdC51cmwpO1xuICB9IGVsc2UgaWYgKGxvYWQudXNlWEhSKSB7XG4gICAgLy8gb24gY2xpZW50LCB1c2UgeGhyXG4gICAgcmV0dXJuIHhocih1cmwsIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChzdGFydHNXaXRoKHVybCwgZmlsZVByb3RvY29sKSkge1xuICAgIC8vIG9uIHNlcnZlciwgaWYgdXJsIHN0YXJ0cyB3aXRoICdmaWxlOi8vJywgc3RyaXAgaXQgYW5kIGxvYWQgZnJvbSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLnNsaWNlKGZpbGVQcm90b2NvbC5sZW5ndGgpLCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAodXJsLmluZGV4T2YoJzovLycpIDwgMCkgeyAvLyBUT0RPIGJldHRlciBwcm90b2NvbCBjaGVjaz9cbiAgICAvLyBvbiBzZXJ2ZXIsIGlmIG5vIHByb3RvY29sIGFzc3VtZSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgLy8gZm9yIHJlZ3VsYXIgVVJMcyBvbiBzZXJ2ZXJcbiAgICByZXR1cm4gaHR0cCh1cmwsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB4aHJIYXNSZXNwb25zZShyZXF1ZXN0KSB7XG4gIHZhciB0eXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gIHJldHVybiB0eXBlICYmIHR5cGUgIT09ICd0ZXh0JyA/XG4gICAgcmVxdWVzdC5yZXNwb25zZSA6IC8vIG51bGwgb24gZXJyb3JcbiAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dDsgLy8gJycgb24gZXJyb3Jcbn1cblxuZnVuY3Rpb24geGhyKHVybCwgY2FsbGJhY2spIHtcbiAgdmFyIGFzeW5jID0gISFjYWxsYmFjaztcbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgLy8gSWYgSUUgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCB1c2UgWERvbWFpblJlcXVlc3QgKGNvcGllZCBmcm9tIGQzLnhocilcbiAgaWYgKHRoaXMuWERvbWFpblJlcXVlc3QgJiZcbiAgICAgICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgIC9eKGh0dHAocyk/Oik/XFwvXFwvLy50ZXN0KHVybCkpIHJlcXVlc3QgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcblxuICBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgIHZhciBzdGF0dXMgPSByZXF1ZXN0LnN0YXR1cztcbiAgICBpZiAoIXN0YXR1cyAmJiB4aHJIYXNSZXNwb25zZShyZXF1ZXN0KSB8fCBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhyZXF1ZXN0LCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXN5bmMpIHtcbiAgICBpZiAoJ29ubG9hZCcgaW4gcmVxdWVzdCkge1xuICAgICAgcmVxdWVzdC5vbmxvYWQgPSByZXF1ZXN0Lm9uZXJyb3IgPSByZXNwb25kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID4gMykgcmVzcG9uZCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgYXN5bmMpO1xuICByZXF1ZXN0LnNlbmQoKTtcblxuICBpZiAoIWFzeW5jICYmIHhockhhc1Jlc3BvbnNlKHJlcXVlc3QpKSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbGUoZmlsZW5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpO1xuICB9XG4gIGZzLnJlYWRGaWxlKGZpbGVuYW1lLCBjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIGh0dHAodXJsLCBjYWxsYmFjaykge1xuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJ3N5bmMtcmVxdWVzdCcpKCdHRVQnLCB1cmwpLmdldEJvZHkoKTtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0ge3VybDogdXJsLCBlbmNvZGluZzogbnVsbCwgZ3ppcDogdHJ1ZX07XG4gIHJlcXVpcmUoJ3JlcXVlc3QnKShvcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gZXJyb3IgfHxcbiAgICAgICAgJ0xvYWQgZmFpbGVkIHdpdGggcmVzcG9uc2UgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArICcuJztcbiAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0cmluZywgc2VhcmNoU3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcgPT0gbnVsbCA/IGZhbHNlIDogc3RyaW5nLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgMCkgPT09IDA7XG59XG5cbmxvYWQuc2FuaXRpemVVcmwgPSBzYW5pdGl6ZVVybDtcblxubG9hZC51c2VYSFIgPSAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZDtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyksXG4gIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKSxcbiAgdGltZUYgPSByZXF1aXJlKCcuLi9mb3JtYXQnKS50aW1lO1xuXG5mdW5jdGlvbiByZWFkKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgdHlwZSA9IChmb3JtYXQgJiYgZm9ybWF0LnR5cGUpIHx8ICdqc29uJztcbiAgZGF0YSA9IGZvcm1hdHNbdHlwZV0oZGF0YSwgZm9ybWF0KTtcbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQucGFyc2UpIHBhcnNlKGRhdGEsIGZvcm1hdC5wYXJzZSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBwYXJzZShkYXRhLCB0eXBlcykge1xuICB2YXIgY29scywgcGFyc2VycywgZCwgaSwgaiwgY2xlbiwgbGVuID0gZGF0YS5sZW5ndGg7XG5cbiAgdHlwZXMgPSAodHlwZXM9PT0nYXV0bycpID8gdHlwZS5pbmZlckFsbChkYXRhKSA6IHV0aWwuZHVwbGljYXRlKHR5cGVzKTtcbiAgY29scyA9IHV0aWwua2V5cyh0eXBlcyk7XG4gIHBhcnNlcnMgPSBjb2xzLm1hcChmdW5jdGlvbihjKSB7XG4gICAgdmFyIHQgPSB0eXBlc1tjXTtcbiAgICBpZiAodCAmJiB0LmluZGV4T2YoJ2RhdGU6JykgPT09IDApIHtcbiAgICAgIHZhciBwYXJ0cyA9IHQuc3BsaXQoJzonLCAyKSxcbiAgICAgICAgICBwYXR0ZXJuID0gcGFydHNbMV07XG4gICAgICBpZiAoKHBhdHRlcm5bMF0gPT09ICdcXCcnICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcXCcnKSB8fFxuICAgICAgICAgIChwYXR0ZXJuWzBdID09PSAnXCInICAmJiBwYXR0ZXJuW3BhdHRlcm4ubGVuZ3RoLTFdID09PSAnXCInKSkge1xuICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5zbGljZSgxLCAtMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignRm9ybWF0IHBhdHRlcm4gbXVzdCBiZSBxdW90ZWQ6ICcgKyBwYXR0ZXJuKTtcbiAgICAgIH1cbiAgICAgIHBhdHRlcm4gPSB0aW1lRihwYXR0ZXJuKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHJldHVybiBwYXR0ZXJuLnBhcnNlKHYpOyB9O1xuICAgIH1cbiAgICBpZiAoIXR5cGUucGFyc2Vyc1t0XSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0lsbGVnYWwgZm9ybWF0IHBhdHRlcm46ICcgKyBjICsgJzonICsgdCk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlLnBhcnNlcnNbdF07XG4gIH0pO1xuXG4gIGZvciAoaT0wLCBjbGVuPWNvbHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgZCA9IGRhdGFbaV07XG4gICAgZm9yIChqPTA7IGo8Y2xlbjsgKytqKSB7XG4gICAgICBkW2NvbHNbal1dID0gcGFyc2Vyc1tqXShkW2NvbHNbal1dKTtcbiAgICB9XG4gIH1cbiAgdHlwZS5hbm5vdGF0aW9uKGRhdGEsIHR5cGVzKTtcbn1cblxucmVhZC5mb3JtYXRzID0gZm9ybWF0cztcbm1vZHVsZS5leHBvcnRzID0gcmVhZDtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIGxvYWQgPSByZXF1aXJlKCcuL2xvYWQnKTtcbnZhciByZWFkID0gcmVxdWlyZSgnLi9yZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbFxuICAua2V5cyhyZWFkLmZvcm1hdHMpXG4gIC5yZWR1Y2UoZnVuY3Rpb24ob3V0LCB0eXBlKSB7XG4gICAgb3V0W3R5cGVdID0gZnVuY3Rpb24ob3B0LCBmb3JtYXQsIGNhbGxiYWNrKSB7XG4gICAgICAvLyBwcm9jZXNzIGFyZ3VtZW50c1xuICAgICAgaWYgKHV0aWwuaXNTdHJpbmcob3B0KSkgeyBvcHQgPSB7dXJsOiBvcHR9OyB9XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB1dGlsLmlzRnVuY3Rpb24oZm9ybWF0KSkge1xuICAgICAgICBjYWxsYmFjayA9IGZvcm1hdDtcbiAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdXAgcmVhZCBmb3JtYXRcbiAgICAgIGZvcm1hdCA9IHV0aWwuZXh0ZW5kKHtwYXJzZTogJ2F1dG8nfSwgZm9ybWF0KTtcbiAgICAgIGZvcm1hdC50eXBlID0gdHlwZTtcblxuICAgICAgLy8gbG9hZCBkYXRhXG4gICAgICB2YXIgZGF0YSA9IGxvYWQob3B0LCBjYWxsYmFjayA/IGZ1bmN0aW9uKGVycm9yLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IHJldHVybjsgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIGRhdGEgbG9hZGVkLCBub3cgcGFyc2UgaXQgKGFzeW5jKVxuICAgICAgICAgIGRhdGEgPSByZWFkKGRhdGEsIGZvcm1hdCk7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSA6IHVuZGVmaW5lZCk7XG5cbiAgICAgIC8vIGRhdGEgbG9hZGVkLCBub3cgcGFyc2UgaXQgKHN5bmMpXG4gICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgIH07XG4gICAgcmV0dXJuIG91dDtcbiAgfSwge30pO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciBUWVBFUyA9ICdfX3R5cGVzX18nO1xuXG52YXIgUEFSU0VSUyA9IHtcbiAgYm9vbGVhbjogdXRpbC5ib29sZWFuLFxuICBpbnRlZ2VyOiB1dGlsLm51bWJlcixcbiAgbnVtYmVyOiAgdXRpbC5udW1iZXIsXG4gIGRhdGU6ICAgIHV0aWwuZGF0ZSxcbiAgc3RyaW5nOiAgZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PScnID8gbnVsbCA6IHg7IH1cbn07XG5cbnZhciBURVNUUyA9IHtcbiAgYm9vbGVhbjogZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PSd0cnVlJyB8fCB4PT09J2ZhbHNlJyB8fCB1dGlsLmlzQm9vbGVhbih4KTsgfSxcbiAgaW50ZWdlcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gVEVTVFMubnVtYmVyKHgpICYmICh4PSt4KSA9PT0gfn54OyB9LFxuICBudW1iZXI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFpc05hTigreCkgJiYgIXV0aWwuaXNEYXRlKHgpOyB9LFxuICBkYXRlOiBmdW5jdGlvbih4KSB7IHJldHVybiAhaXNOYU4oRGF0ZS5wYXJzZSh4KSk7IH1cbn07XG5cbmZ1bmN0aW9uIGFubm90YXRpb24oZGF0YSwgdHlwZXMpIHtcbiAgaWYgKCF0eXBlcykgcmV0dXJuIGRhdGEgJiYgZGF0YVtUWVBFU10gfHwgbnVsbDtcbiAgZGF0YVtUWVBFU10gPSB0eXBlcztcbn1cblxuZnVuY3Rpb24gdHlwZSh2YWx1ZXMsIGYpIHtcbiAgdmFsdWVzID0gdXRpbC5hcnJheSh2YWx1ZXMpO1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdiwgaSwgbjtcblxuICAvLyBpZiBkYXRhIGFycmF5IGhhcyB0eXBlIGFubm90YXRpb25zLCB1c2UgdGhlbVxuICBpZiAodmFsdWVzW1RZUEVTXSkge1xuICAgIHYgPSBmKHZhbHVlc1tUWVBFU10pO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHYpKSByZXR1cm4gdjtcbiAgfVxuXG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7ICF1dGlsLmlzVmFsaWQodikgJiYgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgfVxuXG4gIHJldHVybiB1dGlsLmlzRGF0ZSh2KSA/ICdkYXRlJyA6XG4gICAgdXRpbC5pc051bWJlcih2KSAgICA/ICdudW1iZXInIDpcbiAgICB1dGlsLmlzQm9vbGVhbih2KSAgID8gJ2Jvb2xlYW4nIDpcbiAgICB1dGlsLmlzU3RyaW5nKHYpICAgID8gJ3N0cmluZycgOiBudWxsO1xufVxuXG5mdW5jdGlvbiB0eXBlQWxsKGRhdGEsIGZpZWxkcykge1xuICBpZiAoIWRhdGEubGVuZ3RoKSByZXR1cm47XG4gIGZpZWxkcyA9IGZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSk7XG4gIHJldHVybiBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uKHR5cGVzLCBmKSB7XG4gICAgcmV0dXJuICh0eXBlc1tmXSA9IHR5cGUoZGF0YSwgZiksIHR5cGVzKTtcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBpbmZlcih2YWx1ZXMsIGYpIHtcbiAgdmFsdWVzID0gdXRpbC5hcnJheSh2YWx1ZXMpO1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgaSwgaiwgdjtcblxuICAvLyB0eXBlcyB0byB0ZXN0IGZvciwgaW4gcHJlY2VkZW5jZSBvcmRlclxuICB2YXIgdHlwZXMgPSBbJ2Jvb2xlYW4nLCAnaW50ZWdlcicsICdudW1iZXInLCAnZGF0ZSddO1xuXG4gIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIC8vIGdldCBuZXh0IHZhbHVlIHRvIHRlc3RcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICAvLyB0ZXN0IHZhbHVlIGFnYWluc3QgcmVtYWluaW5nIHR5cGVzXG4gICAgZm9yIChqPTA7IGo8dHlwZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmICh1dGlsLmlzVmFsaWQodikgJiYgIVRFU1RTW3R5cGVzW2pdXSh2KSkge1xuICAgICAgICB0eXBlcy5zcGxpY2UoaiwgMSk7XG4gICAgICAgIGogLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgbm8gdHlwZXMgbGVmdCwgcmV0dXJuICdzdHJpbmcnXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICdzdHJpbmcnO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpbmZlckFsbChkYXRhLCBmaWVsZHMpIHtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24odHlwZXMsIGYpIHtcbiAgICB0eXBlc1tmXSA9IGluZmVyKGRhdGEsIGYpO1xuICAgIHJldHVybiB0eXBlcztcbiAgfSwge30pO1xufVxuXG50eXBlLmFubm90YXRpb24gPSBhbm5vdGF0aW9uO1xudHlwZS5hbGwgPSB0eXBlQWxsO1xudHlwZS5pbmZlciA9IGluZmVyO1xudHlwZS5pbmZlckFsbCA9IGluZmVyQWxsO1xudHlwZS5wYXJzZXJzID0gUEFSU0VSUztcbm1vZHVsZS5leHBvcnRzID0gdHlwZTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBkbCA9IHtcbiAgdmVyc2lvbjogICAgJzEuNS4yJyxcbiAgbG9hZDogICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvbG9hZCcpLFxuICByZWFkOiAgICAgICByZXF1aXJlKCcuL2ltcG9ydC9yZWFkJyksXG4gIHR5cGU6ICAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKSxcbiAgQWdncmVnYXRvcjogcmVxdWlyZSgnLi9hZ2dyZWdhdGUvYWdncmVnYXRvcicpLFxuICBncm91cGJ5OiAgICByZXF1aXJlKCcuL2FnZ3JlZ2F0ZS9ncm91cGJ5JyksXG4gIGJpbnM6ICAgICAgIHJlcXVpcmUoJy4vYmlucy9iaW5zJyksXG4gICRiaW46ICAgICAgIHJlcXVpcmUoJy4vYmlucy9oaXN0b2dyYW0nKS4kYmluLFxuICBoaXN0b2dyYW06ICByZXF1aXJlKCcuL2JpbnMvaGlzdG9ncmFtJykuaGlzdG9ncmFtLFxuICBmb3JtYXQ6ICAgICByZXF1aXJlKCcuL2Zvcm1hdCcpLFxuICB0ZW1wbGF0ZTogICByZXF1aXJlKCcuL3RlbXBsYXRlJyksXG4gIHRpbWU6ICAgICAgIHJlcXVpcmUoJy4vdGltZScpXG59O1xuXG51dGlsLmV4dGVuZChkbCwgdXRpbCk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9nZW5lcmF0ZScpKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL3N0YXRzJykpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vaW1wb3J0L3JlYWRlcnMnKSk7XG51dGlsLmV4dGVuZChkbC5mb3JtYXQsIHJlcXVpcmUoJy4vZm9ybWF0LXRhYmxlcycpKTtcblxuLy8gYmFja3dhcmRzLWNvbXBhdGlibGUsIGRlcHJlY2F0ZWQgQVBJXG4vLyB3aWxsIHJlbW92ZSBpbiB0aGUgZnV0dXJlXG5kbC5wcmludCA9IHtcbiAgdGFibGU6ICAgZGwuZm9ybWF0LnRhYmxlLFxuICBzdW1tYXJ5OiBkbC5mb3JtYXQuc3VtbWFyeVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkbDtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgdHlwZSA9IHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKTtcbnZhciBnZW4gPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG5cbnZhciBzdGF0cyA9IHt9O1xuXG4vLyBDb2xsZWN0IHVuaXF1ZSB2YWx1ZXMuXG4vLyBPdXRwdXQ6IGFuIGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMsIGluIGZpcnN0LW9ic2VydmVkIG9yZGVyXG5zdGF0cy51bmlxdWUgPSBmdW5jdGlvbih2YWx1ZXMsIGYsIHJlc3VsdHMpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG4gIHZhciB1ID0ge30sIHYsIGksIG47XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgaW4gdSkgY29udGludWU7XG4gICAgdVt2XSA9IDE7XG4gICAgcmVzdWx0cy5wdXNoKHYpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGlucHV0IGFycmF5Llxuc3RhdHMuY291bnQgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoIHx8IDA7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG5vbi1udWxsLCBub24tdW5kZWZpbmVkLCBub24tTmFOIHZhbHVlcy5cbnN0YXRzLmNvdW50LnZhbGlkID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuLCB2YWxpZCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgdmFsaWQgKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlcy5cbnN0YXRzLmNvdW50Lm1pc3NpbmcgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG4sIGNvdW50ID0gMDtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiA9PSBudWxsKSBjb3VudCArPSAxO1xuICB9XG4gIHJldHVybiBjb3VudDtcbn07XG5cbi8vIENvdW50IHRoZSBudW1iZXIgb2YgZGlzdGluY3QgdmFsdWVzLlxuLy8gTnVsbCwgdW5kZWZpbmVkIGFuZCBOYU4gYXJlIGVhY2ggY29uc2lkZXJlZCBkaXN0aW5jdCB2YWx1ZXMuXG5zdGF0cy5jb3VudC5kaXN0aW5jdCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuLCBjb3VudCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgaW4gdSkgY29udGludWU7XG4gICAgdVt2XSA9IDE7XG4gICAgY291bnQgKz0gMTtcbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuXG4vLyBDb25zdHJ1Y3QgYSBtYXAgZnJvbSBkaXN0aW5jdCB2YWx1ZXMgdG8gb2NjdXJyZW5jZSBjb3VudHMuXG5zdGF0cy5jb3VudC5tYXAgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIG1hcCA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIG1hcFt2XSA9ICh2IGluIG1hcCkgPyBtYXBbdl0gKyAxIDogMTtcbiAgfVxuICByZXR1cm4gbWFwO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbWVkaWFuIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tZWRpYW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgaWYgKGYpIHZhbHVlcyA9IHZhbHVlcy5tYXAodXRpbC4kKGYpKTtcbiAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcih1dGlsLmlzVmFsaWQpLnNvcnQodXRpbC5jbXApO1xuICByZXR1cm4gc3RhdHMucXVhbnRpbGUodmFsdWVzLCAwLjUpO1xufTtcblxuLy8gQ29tcHV0ZXMgdGhlIHF1YXJ0aWxlIGJvdW5kYXJpZXMgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnF1YXJ0aWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGlmIChmKSB2YWx1ZXMgPSB2YWx1ZXMubWFwKHV0aWwuJChmKSk7XG4gIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIodXRpbC5pc1ZhbGlkKS5zb3J0KHV0aWwuY21wKTtcbiAgdmFyIHEgPSBzdGF0cy5xdWFudGlsZTtcbiAgcmV0dXJuIFtxKHZhbHVlcywgMC4yNSksIHEodmFsdWVzLCAwLjUwKSwgcSh2YWx1ZXMsIDAuNzUpXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHF1YW50aWxlIG9mIGEgc29ydGVkIGFycmF5IG9mIG51bWJlcnMuXG4vLyBBZGFwdGVkIGZyb20gdGhlIEQzLmpzIGltcGxlbWVudGF0aW9uLlxuc3RhdHMucXVhbnRpbGUgPSBmdW5jdGlvbih2YWx1ZXMsIGYsIHApIHtcbiAgaWYgKHAgPT09IHVuZGVmaW5lZCkgeyBwID0gZjsgZiA9IHV0aWwuaWRlbnRpdHk7IH1cbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIEggPSAodmFsdWVzLmxlbmd0aCAtIDEpICogcCArIDEsXG4gICAgICBoID0gTWF0aC5mbG9vcihIKSxcbiAgICAgIHYgPSArZih2YWx1ZXNbaCAtIDFdKSxcbiAgICAgIGUgPSBIIC0gaDtcbiAgcmV0dXJuIGUgPyB2ICsgZSAqIChmKHZhbHVlc1toXSkgLSB2KSA6IHY7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzdW0gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnN1bSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICBmb3IgKHZhciBzdW09MCwgaT0wLCBuPXZhbHVlcy5sZW5ndGgsIHY7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgc3VtICs9IHY7XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG1lYW4gKGF2ZXJhZ2UpIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tZWFuID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBtZWFuID0gMCwgZGVsdGEsIGksIG4sIGMsIHY7XG4gIGZvciAoaT0wLCBjPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBkZWx0YSA9IHYgLSBtZWFuO1xuICAgICAgbWVhbiA9IG1lYW4gKyBkZWx0YSAvICgrK2MpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWVhbjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSB2YXJpYW5jZSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMudmFyaWFuY2UgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgaWYgKCF1dGlsLmlzQXJyYXkodmFsdWVzKSB8fCB2YWx1ZXMubGVuZ3RoIDwgMikgcmV0dXJuIDA7XG4gIHZhciBtZWFuID0gMCwgTTIgPSAwLCBkZWx0YSwgaSwgYywgdjtcbiAgZm9yIChpPTAsIGM9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBkZWx0YSA9IHYgLSBtZWFuO1xuICAgICAgbWVhbiA9IG1lYW4gKyBkZWx0YSAvICgrK2MpO1xuICAgICAgTTIgPSBNMiArIGRlbHRhICogKHYgLSBtZWFuKTtcbiAgICB9XG4gIH1cbiAgTTIgPSBNMiAvIChjIC0gMSk7XG4gIHJldHVybiBNMjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnN0ZGV2ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoc3RhdHMudmFyaWFuY2UodmFsdWVzLCBmKSk7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBQZWFyc29uIG1vZGUgc2tld25lc3MgKChtZWRpYW4tbWVhbikvc3RkZXYpIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5tb2Rlc2tldyA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICB2YXIgYXZnID0gc3RhdHMubWVhbih2YWx1ZXMsIGYpLFxuICAgICAgbWVkID0gc3RhdHMubWVkaWFuKHZhbHVlcywgZiksXG4gICAgICBzdGQgPSBzdGF0cy5zdGRldih2YWx1ZXMsIGYpO1xuICByZXR1cm4gc3RkID09PSAwID8gMCA6IChhdmcgLSBtZWQpIC8gc3RkO1xufTtcblxuLy8gRmluZCB0aGUgbWluaW11bSB2YWx1ZSBpbiBhbiBhcnJheS5cbnN0YXRzLm1pbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gc3RhdHMuZXh0ZW50KHZhbHVlcywgZilbMF07XG59O1xuXG4vLyBGaW5kIHRoZSBtYXhpbXVtIHZhbHVlIGluIGFuIGFycmF5Llxuc3RhdHMubWF4ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHJldHVybiBzdGF0cy5leHRlbnQodmFsdWVzLCBmKVsxXTtcbn07XG5cbi8vIEZpbmQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gb2YgYW4gYXJyYXkgb2YgdmFsdWVzLlxuc3RhdHMuZXh0ZW50ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBhLCBiLCB2LCBpLCBuID0gdmFsdWVzLmxlbmd0aDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgeyBhID0gYiA9IHY7IGJyZWFrOyB9XG4gIH1cbiAgZm9yICg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaWYgKHYgPCBhKSBhID0gdjtcbiAgICAgIGlmICh2ID4gYikgYiA9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiBbYSwgYl07XG59O1xuXG4vLyBGaW5kIHRoZSBpbnRlZ2VyIGluZGljZXMgb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLlxuc3RhdHMuZXh0ZW50LmluZGV4ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB4ID0gLTEsIHkgPSAtMSwgYSwgYiwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyB4ID0geSA9IGk7IGJyZWFrOyB9XG4gIH1cbiAgZm9yICg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaWYgKHYgPCBhKSB7IGEgPSB2OyB4ID0gaTsgfVxuICAgICAgaWYgKHYgPiBiKSB7IGIgPSB2OyB5ID0gaTsgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW3gsIHldO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuc3RhdHMuZG90ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBzdW0gPSAwLCBpLCB2O1xuICBpZiAoIWIpIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCAhPT0gYS5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcnJheSBsZW5ndGhzIG11c3QgbWF0Y2guJyk7XG4gICAgfVxuICAgIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHZhbHVlc1tpXSAqIGFbaV07XG4gICAgICBpZiAodiA9PT0gdikgc3VtICs9IHY7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGEgPSB1dGlsLiQoYSk7XG4gICAgYiA9IHV0aWwuJChiKTtcbiAgICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBhKHZhbHVlc1tpXSkgKiBiKHZhbHVlc1tpXSk7XG4gICAgICBpZiAodiA9PT0gdikgc3VtICs9IHY7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBDb21wdXRlIHRoZSB2ZWN0b3IgZGlzdGFuY2UgYmV0d2VlbiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG4vLyBEZWZhdWx0IGlzIEV1Y2xpZGVhbiAoZXhwPTIpIGRpc3RhbmNlLCBjb25maWd1cmFibGUgdmlhIGV4cCBhcmd1bWVudC5cbnN0YXRzLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIsIGV4cCkge1xuICB2YXIgZiA9IHV0aWwuaXNGdW5jdGlvbihiKSB8fCB1dGlsLmlzU3RyaW5nKGIpLFxuICAgICAgWCA9IHZhbHVlcyxcbiAgICAgIFkgPSBmID8gdmFsdWVzIDogYSxcbiAgICAgIGUgPSBmID8gZXhwIDogYixcbiAgICAgIEwyID0gZSA9PT0gMiB8fCBlID09IG51bGwsXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aCwgcyA9IDAsIGQsIGk7XG4gIGlmIChmKSB7XG4gICAgYSA9IHV0aWwuJChhKTtcbiAgICBiID0gdXRpbC4kKGIpO1xuICB9XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGQgPSBmID8gKGEoWFtpXSktYihZW2ldKSkgOiAoWFtpXS1ZW2ldKTtcbiAgICBzICs9IEwyID8gZCpkIDogTWF0aC5wb3coTWF0aC5hYnMoZCksIGUpO1xuICB9XG4gIHJldHVybiBMMiA/IE1hdGguc3FydChzKSA6IE1hdGgucG93KHMsIDEvZSk7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBDb2hlbidzIGQgZWZmZWN0IHNpemUgYmV0d2VlbiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG5zdGF0cy5jb2hlbnNkID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBYID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGEpKSA6IHZhbHVlcyxcbiAgICAgIFkgPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYSxcbiAgICAgIHgxID0gc3RhdHMubWVhbihYKSxcbiAgICAgIHgyID0gc3RhdHMubWVhbihZKSxcbiAgICAgIG4xID0gc3RhdHMuY291bnQudmFsaWQoWCksXG4gICAgICBuMiA9IHN0YXRzLmNvdW50LnZhbGlkKFkpO1xuXG4gIGlmICgobjErbjItMikgPD0gMCkge1xuICAgIC8vIGlmIGJvdGggYXJyYXlzIGFyZSBzaXplIDEsIG9yIG9uZSBpcyBlbXB0eSwgdGhlcmUncyBubyBlZmZlY3Qgc2l6ZVxuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIHBvb2wgc3RhbmRhcmQgZGV2aWF0aW9uXG4gIHZhciBzMSA9IHN0YXRzLnZhcmlhbmNlKFgpLFxuICAgICAgczIgPSBzdGF0cy52YXJpYW5jZShZKSxcbiAgICAgIHMgPSBNYXRoLnNxcnQoKCgobjEtMSkqczEpICsgKChuMi0xKSpzMikpIC8gKG4xK24yLTIpKTtcbiAgLy8gaWYgdGhlcmUgaXMgbm8gdmFyaWFuY2UsIHRoZXJlJ3Mgbm8gZWZmZWN0IHNpemVcbiAgcmV0dXJuIHM9PT0wID8gMCA6ICh4MSAtIHgyKSAvIHM7XG59O1xuXG4vLyBDb21wdXRlcyB0aGUgY292YXJpYW5jZSBiZXR3ZWVuIHR3byBhcnJheXMgb2YgbnVtYmVyc1xuc3RhdHMuY292YXJpYW5jZSA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgWCA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICBZID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICBuID0gWC5sZW5ndGgsXG4gICAgICB4bSA9IHN0YXRzLm1lYW4oWCksXG4gICAgICB5bSA9IHN0YXRzLm1lYW4oWSksXG4gICAgICBzdW0gPSAwLCBjID0gMCwgaSwgeCwgeSwgdngsIHZ5O1xuXG4gIGlmIChuICE9PSBZLmxlbmd0aCkge1xuICAgIHRocm93IEVycm9yKCdJbnB1dCBsZW5ndGhzIG11c3QgbWF0Y2guJyk7XG4gIH1cblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB4ID0gWFtpXTsgdnggPSB1dGlsLmlzVmFsaWQoeCk7XG4gICAgeSA9IFlbaV07IHZ5ID0gdXRpbC5pc1ZhbGlkKHkpO1xuICAgIGlmICh2eCAmJiB2eSkge1xuICAgICAgc3VtICs9ICh4LXhtKSAqICh5LXltKTtcbiAgICAgICsrYztcbiAgICB9IGVsc2UgaWYgKHZ4IHx8IHZ5KSB7XG4gICAgICB0aHJvdyBFcnJvcignVmFsaWQgdmFsdWVzIG11c3QgYWxpZ24uJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW0gLyAoYy0xKTtcbn07XG5cbi8vIENvbXB1dGUgYXNjZW5kaW5nIHJhbmsgc2NvcmVzIGZvciBhbiBhcnJheSBvZiB2YWx1ZXMuXG4vLyBUaWVzIGFyZSBhc3NpZ25lZCB0aGVpciBjb2xsZWN0aXZlIG1lYW4gcmFuay5cbnN0YXRzLnJhbmsgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKSB8fCB1dGlsLmlkZW50aXR5O1xuICB2YXIgYSA9IHZhbHVlcy5tYXAoZnVuY3Rpb24odiwgaSkge1xuICAgICAgcmV0dXJuIHtpZHg6IGksIHZhbDogZih2KX07XG4gICAgfSlcbiAgICAuc29ydCh1dGlsLmNvbXBhcmF0b3IoJ3ZhbCcpKTtcblxuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICByID0gQXJyYXkobiksXG4gICAgICB0aWUgPSAtMSwgcCA9IHt9LCBpLCB2LCBtdTtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB2ID0gYVtpXS52YWw7XG4gICAgaWYgKHRpZSA8IDAgJiYgcCA9PT0gdikge1xuICAgICAgdGllID0gaSAtIDE7XG4gICAgfSBlbHNlIGlmICh0aWUgPiAtMSAmJiBwICE9PSB2KSB7XG4gICAgICBtdSA9IDEgKyAoaS0xICsgdGllKSAvIDI7XG4gICAgICBmb3IgKDsgdGllPGk7ICsrdGllKSByW2FbdGllXS5pZHhdID0gbXU7XG4gICAgICB0aWUgPSAtMTtcbiAgICB9XG4gICAgclthW2ldLmlkeF0gPSBpICsgMTtcbiAgICBwID0gdjtcbiAgfVxuXG4gIGlmICh0aWUgPiAtMSkge1xuICAgIG11ID0gMSArIChuLTEgKyB0aWUpIC8gMjtcbiAgICBmb3IgKDsgdGllPG47ICsrdGllKSByW2FbdGllXS5pZHhdID0gbXU7XG4gIH1cblxuICByZXR1cm4gcjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSBQZWFyc29uIHByb2R1Y3QtbW9tZW50IGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbnN0YXRzLmNvciA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgZm4gPSBiO1xuICBiID0gZm4gPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhO1xuICBhID0gZm4gPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXM7XG5cbiAgdmFyIGRvdCA9IHN0YXRzLmRvdChhLCBiKSxcbiAgICAgIG11YSA9IHN0YXRzLm1lYW4oYSksXG4gICAgICBtdWIgPSBzdGF0cy5tZWFuKGIpLFxuICAgICAgc2RhID0gc3RhdHMuc3RkZXYoYSksXG4gICAgICBzZGIgPSBzdGF0cy5zdGRldihiKSxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoO1xuXG4gIHJldHVybiAoZG90IC0gbiptdWEqbXViKSAvICgobi0xKSAqIHNkYSAqIHNkYik7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBTcGVhcm1hbiByYW5rIGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgdmFsdWVzLlxuc3RhdHMuY29yLnJhbmsgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIHJhID0gYiA/IHN0YXRzLnJhbmsodmFsdWVzLCB1dGlsLiQoYSkpIDogc3RhdHMucmFuayh2YWx1ZXMpLFxuICAgICAgcmIgPSBiID8gc3RhdHMucmFuayh2YWx1ZXMsIHV0aWwuJChiKSkgOiBzdGF0cy5yYW5rKGEpLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGgsIGksIHMsIGQ7XG5cbiAgZm9yIChpPTAsIHM9MDsgaTxuOyArK2kpIHtcbiAgICBkID0gcmFbaV0gLSByYltpXTtcbiAgICBzICs9IGQgKiBkO1xuICB9XG5cbiAgcmV0dXJuIDEgLSA2KnMgLyAobiAqIChuKm4tMSkpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZGlzdGFuY2UgY29ycmVsYXRpb24gb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaXN0YW5jZV9jb3JyZWxhdGlvblxuc3RhdHMuY29yLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhO1xuXG4gIHZhciBBID0gc3RhdHMuZGlzdC5tYXQoWCksXG4gICAgICBCID0gc3RhdHMuZGlzdC5tYXQoWSksXG4gICAgICBuID0gQS5sZW5ndGgsXG4gICAgICBpLCBhYSwgYmIsIGFiO1xuXG4gIGZvciAoaT0wLCBhYT0wLCBiYj0wLCBhYj0wOyBpPG47ICsraSkge1xuICAgIGFhICs9IEFbaV0qQVtpXTtcbiAgICBiYiArPSBCW2ldKkJbaV07XG4gICAgYWIgKz0gQVtpXSpCW2ldO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydChhYiAvIE1hdGguc3FydChhYSpiYikpO1xufTtcblxuLy8gU2ltcGxlIGxpbmVhciByZWdyZXNzaW9uLlxuLy8gUmV0dXJucyBhIFwiZml0XCIgb2JqZWN0IHdpdGggc2xvcGUgKG0pLCBpbnRlcmNlcHQgKGIpLFxuLy8gciB2YWx1ZSAoUiksIGFuZCBzdW0tc3F1YXJlZCByZXNpZHVhbCBlcnJvciAocnNzKS5cbnN0YXRzLmxpbmVhclJlZ3Jlc3Npb24gPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgbiA9IFgubGVuZ3RoLFxuICAgICAgeHkgPSBzdGF0cy5jb3ZhcmlhbmNlKFgsIFkpLCAvLyB3aWxsIHRocm93IGVyciBpZiB2YWxpZCB2YWxzIGRvbid0IGFsaWduXG4gICAgICBzeCA9IHN0YXRzLnN0ZGV2KFgpLFxuICAgICAgc3kgPSBzdGF0cy5zdGRldihZKSxcbiAgICAgIHNsb3BlID0geHkgLyAoc3gqc3gpLFxuICAgICAgaWNlcHQgPSBzdGF0cy5tZWFuKFkpIC0gc2xvcGUgKiBzdGF0cy5tZWFuKFgpLFxuICAgICAgZml0ID0ge3Nsb3BlOiBzbG9wZSwgaW50ZXJjZXB0OiBpY2VwdCwgUjogeHkgLyAoc3gqc3kpLCByc3M6IDB9LFxuICAgICAgcmVzLCBpO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGlmICh1dGlsLmlzVmFsaWQoWFtpXSkgJiYgdXRpbC5pc1ZhbGlkKFlbaV0pKSB7XG4gICAgICByZXMgPSAoc2xvcGUqWFtpXSArIGljZXB0KSAtIFlbaV07XG4gICAgICBmaXQucnNzICs9IHJlcyAqIHJlcztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZml0O1xufTtcblxuLy8gTmFtZXNwYWNlIGZvciB6LXRlc3RzXG5zdGF0cy56ID0ge307XG5cbi8vIENvbnN0cnVjdCBhIHotY29uZmlkZW5jZSBpbnRlcnZhbCBhdCBhIGdpdmVuIHNpZ25pZmljYW5jZSBsZXZlbFxuLy8gQXJndW1lbnRzIGFyZSBhbiBhcnJheSBhbmQgYW4gb3B0aW9uYWwgYWxwaGEgKGRlZmF1bHRzIHRvIDAuMDUpLlxuc3RhdHMuei5jaSA9IGZ1bmN0aW9uKGEsIGFscGhhKSB7XG4gIHZhciB6ID0gYWxwaGEgPyBnZW4ucmFuZG9tLm5vcm1hbCgwLCAxKS5pY2RmKDEtKGFscGhhLzIpKSA6IDEuOTYsXG4gICAgICBtdSA9IHN0YXRzLm1lYW4oYSksXG4gICAgICBTRSA9IHN0YXRzLnN0ZGV2KGEpIC8gTWF0aC5zcXJ0KHN0YXRzLmNvdW50LnZhbGlkKGEpKTtcbiAgcmV0dXJuIFttdSAtICh6KlNFKSwgbXUgKyAoeipTRSldO1xufTtcblxuLy8gUGVyZm9ybSBhIHotdGVzdCBvZiBtZWFucy4gUmV0dXJucyB0aGUgcC12YWx1ZS5cbi8vIElmIGEgc2luZ2xlIGFycmF5IGlzIHByb3ZpZGVkLCBwZXJmb3JtcyBhIG9uZS1zYW1wbGUgbG9jYXRpb24gdGVzdC5cbi8vIElmIHR3byBhcnJheXMgb3IgYSB0YWJsZSBhbmQgdHdvIGFjY2Vzc29ycyBhcmUgcHJvdmlkZWQsIHBlcmZvcm1zXG4vLyBhIHR3by1zYW1wbGUgbG9jYXRpb24gdGVzdC4gQSBwYWlyZWQgdGVzdCBpcyBwZXJmb3JtZWQgaWYgc3BlY2lmaWVkXG4vLyBieSB0aGUgb3B0aW9ucyBoYXNoLlxuLy8gVGhlIG9wdGlvbnMgaGFzaCBmb3JtYXQgaXM6IHtwYWlyZWQ6IGJvb2xlYW4sIG51bGxoOiBudW1iZXJ9LlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9aLXRlc3Rcbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGFpcmVkX2RpZmZlcmVuY2VfdGVzdFxuc3RhdHMuei50ZXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBvcHQpIHtcbiAgaWYgKHV0aWwuaXNGdW5jdGlvbihiKSB8fCB1dGlsLmlzU3RyaW5nKGIpKSB7IC8vIHRhYmxlIGFuZCBhY2Nlc3NvcnNcbiAgICByZXR1cm4gKG9wdCAmJiBvcHQucGFpcmVkID8genRlc3RQIDogenRlc3QyKShvcHQsIHZhbHVlcywgYSwgYik7XG4gIH0gZWxzZSBpZiAodXRpbC5pc0FycmF5KGEpKSB7IC8vIHR3byBhcnJheXNcbiAgICByZXR1cm4gKGIgJiYgYi5wYWlyZWQgPyB6dGVzdFAgOiB6dGVzdDIpKGIsIHZhbHVlcywgYSk7XG4gIH0gZWxzZSB7IC8vIG9uZSBhcnJheVxuICAgIHJldHVybiB6dGVzdDEoYSwgdmFsdWVzKTtcbiAgfVxufTtcblxuLy8gUGVyZm9ybSBhIHotdGVzdCBvZiBtZWFucy4gUmV0dXJucyB0aGUgcC12YWx1ZS5cbi8vIEFzc3VtaW5nIHdlIGhhdmUgYSBsaXN0IG9mIHZhbHVlcywgYW5kIGEgbnVsbCBoeXBvdGhlc2lzLiBJZiBubyBudWxsXG4vLyBoeXBvdGhlc2lzLCBhc3N1bWUgb3VyIG51bGwgaHlwb3RoZXNpcyBpcyBtdT0wLlxuZnVuY3Rpb24genRlc3QxKG9wdCwgYSkge1xuICB2YXIgbnVsbEggPSBvcHQgJiYgb3B0Lm51bGxoIHx8IDAsXG4gICAgICBnYXVzc2lhbiA9IGdlbi5yYW5kb20ubm9ybWFsKDAsIDEpLFxuICAgICAgbXUgPSBzdGF0cy5tZWFuKGEpLFxuICAgICAgU0UgPSBzdGF0cy5zdGRldihhKSAvIE1hdGguc3FydChzdGF0cy5jb3VudC52YWxpZChhKSk7XG5cbiAgaWYgKFNFPT09MCkge1xuICAgIC8vIFRlc3Qgbm90IHdlbGwgZGVmaW5lZCB3aGVuIHN0YW5kYXJkIGVycm9yIGlzIDAuXG4gICAgcmV0dXJuIChtdSAtIG51bGxIKSA9PT0gMCA/IDEgOiAwO1xuICB9XG4gIC8vIFR3by1zaWRlZCwgc28gdHdpY2UgdGhlIG9uZS1zaWRlZCBjZGYuXG4gIHZhciB6ID0gKG11IC0gbnVsbEgpIC8gU0U7XG4gIHJldHVybiAyICogZ2F1c3NpYW4uY2RmKC1NYXRoLmFicyh6KSk7XG59XG5cbi8vIFBlcmZvcm0gYSB0d28gc2FtcGxlIHBhaXJlZCB6LXRlc3Qgb2YgbWVhbnMuIFJldHVybnMgdGhlIHAtdmFsdWUuXG5mdW5jdGlvbiB6dGVzdFAob3B0LCB2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgbjEgPSBzdGF0cy5jb3VudChYKSxcbiAgICAgIG4yID0gc3RhdHMuY291bnQoWSksXG4gICAgICBkaWZmcyA9IEFycmF5KCksIGk7XG5cbiAgaWYgKG4xICE9PSBuMikge1xuICAgIHRocm93IEVycm9yKCdBcnJheSBsZW5ndGhzIG11c3QgbWF0Y2guJyk7XG4gIH1cbiAgZm9yIChpPTA7IGk8bjE7ICsraSkge1xuICAgIC8vIE9ubHkgdmFsaWQgZGlmZmVyZW5jZXMgc2hvdWxkIGNvbnRyaWJ1dGUgdG8gdGhlIHRlc3Qgc3RhdGlzdGljXG4gICAgaWYgKHV0aWwuaXNWYWxpZChYW2ldKSAmJiB1dGlsLmlzVmFsaWQoWVtpXSkpIHtcbiAgICAgIGRpZmZzLnB1c2goWFtpXSAtIFlbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdHMuei50ZXN0KGRpZmZzLCBvcHQgJiYgb3B0Lm51bGxoIHx8IDApO1xufVxuXG4vLyBQZXJmb3JtIGEgdHdvIHNhbXBsZSB6LXRlc3Qgb2YgbWVhbnMuIFJldHVybnMgdGhlIHAtdmFsdWUuXG5mdW5jdGlvbiB6dGVzdDIob3B0LCB2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgbjEgPSBzdGF0cy5jb3VudC52YWxpZChYKSxcbiAgICAgIG4yID0gc3RhdHMuY291bnQudmFsaWQoWSksXG4gICAgICBnYXVzc2lhbiA9IGdlbi5yYW5kb20ubm9ybWFsKDAsIDEpLFxuICAgICAgbWVhbkRpZmYgPSBzdGF0cy5tZWFuKFgpIC0gc3RhdHMubWVhbihZKSAtIChvcHQgJiYgb3B0Lm51bGxoIHx8IDApLFxuICAgICAgU0UgPSBNYXRoLnNxcnQoc3RhdHMudmFyaWFuY2UoWCkvbjEgKyBzdGF0cy52YXJpYW5jZShZKS9uMik7XG5cbiAgaWYgKFNFPT09MCkge1xuICAgIC8vIE5vdCB3ZWxsIGRlZmluZWQgd2hlbiBwb29sZWQgc3RhbmRhcmQgZXJyb3IgaXMgMC5cbiAgICByZXR1cm4gbWVhbkRpZmY9PT0wID8gMSA6IDA7XG4gIH1cbiAgLy8gVHdvLXRhaWxlZCwgc28gdHdpY2UgdGhlIG9uZS1zaWRlZCBjZGYuXG4gIHZhciB6ID0gbWVhbkRpZmYgLyBTRTtcbiAgcmV0dXJuIDIgKiBnYXVzc2lhbi5jZGYoLU1hdGguYWJzKHopKTtcbn1cblxuLy8gQ29uc3RydWN0IGEgbWVhbi1jZW50ZXJlZCBkaXN0YW5jZSBtYXRyaXggZm9yIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5kaXN0Lm1hdCA9IGZ1bmN0aW9uKFgpIHtcbiAgdmFyIG4gPSBYLmxlbmd0aCxcbiAgICAgIG0gPSBuKm4sXG4gICAgICBBID0gQXJyYXkobSksXG4gICAgICBSID0gZ2VuLnplcm9zKG4pLFxuICAgICAgTSA9IDAsIHYsIGksIGo7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgQVtpKm4raV0gPSAwO1xuICAgIGZvciAoaj1pKzE7IGo8bjsgKytqKSB7XG4gICAgICBBW2kqbitqXSA9ICh2ID0gTWF0aC5hYnMoWFtpXSAtIFhbal0pKTtcbiAgICAgIEFbaipuK2ldID0gdjtcbiAgICAgIFJbaV0gKz0gdjtcbiAgICAgIFJbal0gKz0gdjtcbiAgICB9XG4gIH1cblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBNICs9IFJbaV07XG4gICAgUltpXSAvPSBuO1xuICB9XG4gIE0gLz0gbTtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBmb3IgKGo9aTsgajxuOyArK2opIHtcbiAgICAgIEFbaSpuK2pdICs9IE0gLSBSW2ldIC0gUltqXTtcbiAgICAgIEFbaipuK2ldID0gQVtpKm4ral07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIEE7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBTaGFubm9uIGVudHJvcHkgKGxvZyBiYXNlIDIpIG9mIGFuIGFycmF5IG9mIGNvdW50cy5cbnN0YXRzLmVudHJvcHkgPSBmdW5jdGlvbihjb3VudHMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIGksIHAsIHMgPSAwLCBIID0gMCwgbiA9IGNvdW50cy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHMgKz0gKGYgPyBmKGNvdW50c1tpXSkgOiBjb3VudHNbaV0pO1xuICB9XG4gIGlmIChzID09PSAwKSByZXR1cm4gMDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcCA9IChmID8gZihjb3VudHNbaV0pIDogY291bnRzW2ldKSAvIHM7XG4gICAgaWYgKHApIEggKz0gcCAqIE1hdGgubG9nKHApO1xuICB9XG4gIHJldHVybiAtSCAvIE1hdGguTE4yO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGZvcm0gW01JLCBNSV9kaXN0YW5jZV1cbi8vIE1JX2Rpc3RhbmNlIGlzIGRlZmluZWQgYXMgMSAtIEkoYSxiKSAvIEgoYSxiKS5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTXV0dWFsX2luZm9ybWF0aW9uXG5zdGF0cy5tdXR1YWwgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIsIGNvdW50cykge1xuICB2YXIgeCA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGEpKSA6IHZhbHVlcyxcbiAgICAgIHkgPSBjb3VudHMgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgeiA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGNvdW50cykpIDogYjtcblxuICB2YXIgcHggPSB7fSxcbiAgICAgIHB5ID0ge30sXG4gICAgICBuID0gei5sZW5ndGgsXG4gICAgICBzID0gMCwgSSA9IDAsIEggPSAwLCBwLCB0LCBpO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHB4W3hbaV1dID0gMDtcbiAgICBweVt5W2ldXSA9IDA7XG4gIH1cblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBweFt4W2ldXSArPSB6W2ldO1xuICAgIHB5W3lbaV1dICs9IHpbaV07XG4gICAgcyArPSB6W2ldO1xuICB9XG5cbiAgdCA9IDEgLyAocyAqIE1hdGguTE4yKTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgaWYgKHpbaV0gPT09IDApIGNvbnRpbnVlO1xuICAgIHAgPSAocyAqIHpbaV0pIC8gKHB4W3hbaV1dICogcHlbeVtpXV0pO1xuICAgIEkgKz0geltpXSAqIHQgKiBNYXRoLmxvZyhwKTtcbiAgICBIICs9IHpbaV0gKiB0ICogTWF0aC5sb2coeltpXS9zKTtcbiAgfVxuXG4gIHJldHVybiBbSSwgMSArIEkvSF07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtdXR1YWwgaW5mb3JtYXRpb24gYmV0d2VlbiB0d28gZGlzY3JldGUgdmFyaWFibGVzLlxuc3RhdHMubXV0dWFsLmluZm8gPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIsIGNvdW50cykge1xuICByZXR1cm4gc3RhdHMubXV0dWFsKHZhbHVlcywgYSwgYiwgY291bnRzKVswXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG4vLyBNSV9kaXN0YW5jZSBpcyBkZWZpbmVkIGFzIDEgLSBJKGEsYikgLyBIKGEsYikuXG5zdGF0cy5tdXR1YWwuZGlzdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHJldHVybiBzdGF0cy5tdXR1YWwodmFsdWVzLCBhLCBiLCBjb3VudHMpWzFdO1xufTtcblxuLy8gQ29tcHV0ZSBhIHByb2ZpbGUgb2Ygc3VtbWFyeSBzdGF0aXN0aWNzIGZvciBhIHZhcmlhYmxlLlxuc3RhdHMucHJvZmlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICB2YXIgbWVhbiA9IDAsXG4gICAgICB2YWxpZCA9IDAsXG4gICAgICBtaXNzaW5nID0gMCxcbiAgICAgIGRpc3RpbmN0ID0gMCxcbiAgICAgIG1pbiA9IG51bGwsXG4gICAgICBtYXggPSBudWxsLFxuICAgICAgTTIgPSAwLFxuICAgICAgdmFscyA9IFtdLFxuICAgICAgdSA9IHt9LCBkZWx0YSwgc2QsIGksIHYsIHg7XG5cbiAgLy8gY29tcHV0ZSBzdW1tYXJ5IHN0YXRzXG4gIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuXG4gICAgLy8gdXBkYXRlIHVuaXF1ZSB2YWx1ZXNcbiAgICB1W3ZdID0gKHYgaW4gdSkgPyB1W3ZdICsgMSA6IChkaXN0aW5jdCArPSAxLCAxKTtcblxuICAgIGlmICh2ID09IG51bGwpIHtcbiAgICAgICsrbWlzc2luZztcbiAgICB9IGVsc2UgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgLy8gdXBkYXRlIHN0YXRzXG4gICAgICB4ID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJykgPyB2Lmxlbmd0aCA6IHY7XG4gICAgICBpZiAobWluPT09bnVsbCB8fCB4IDwgbWluKSBtaW4gPSB4O1xuICAgICAgaWYgKG1heD09PW51bGwgfHwgeCA+IG1heCkgbWF4ID0geDtcbiAgICAgIGRlbHRhID0geCAtIG1lYW47XG4gICAgICBtZWFuID0gbWVhbiArIGRlbHRhIC8gKCsrdmFsaWQpO1xuICAgICAgTTIgPSBNMiArIGRlbHRhICogKHggLSBtZWFuKTtcbiAgICAgIHZhbHMucHVzaCh4KTtcbiAgICB9XG4gIH1cbiAgTTIgPSBNMiAvICh2YWxpZCAtIDEpO1xuICBzZCA9IE1hdGguc3FydChNMik7XG5cbiAgLy8gc29ydCB2YWx1ZXMgZm9yIG1lZGlhbiBhbmQgaXFyXG4gIHZhbHMuc29ydCh1dGlsLmNtcCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAgICAgdHlwZSh2YWx1ZXMsIGYpLFxuICAgIHVuaXF1ZTogICB1LFxuICAgIGNvdW50OiAgICB2YWx1ZXMubGVuZ3RoLFxuICAgIHZhbGlkOiAgICB2YWxpZCxcbiAgICBtaXNzaW5nOiAgbWlzc2luZyxcbiAgICBkaXN0aW5jdDogZGlzdGluY3QsXG4gICAgbWluOiAgICAgIG1pbixcbiAgICBtYXg6ICAgICAgbWF4LFxuICAgIG1lYW46ICAgICBtZWFuLFxuICAgIHN0ZGV2OiAgICBzZCxcbiAgICBtZWRpYW46ICAgKHYgPSBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjUpKSxcbiAgICBxMTogICAgICAgc3RhdHMucXVhbnRpbGUodmFscywgMC4yNSksXG4gICAgcTM6ICAgICAgIHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuNzUpLFxuICAgIG1vZGVza2V3OiBzZCA9PT0gMCA/IDAgOiAobWVhbiAtIHYpIC8gc2RcbiAgfTtcbn07XG5cbi8vIENvbXB1dGUgcHJvZmlsZXMgZm9yIGFsbCB2YXJpYWJsZXMgaW4gYSBkYXRhIHNldC5cbnN0YXRzLnN1bW1hcnkgPSBmdW5jdGlvbihkYXRhLCBmaWVsZHMpIHtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgdmFyIHMgPSBmaWVsZHMubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcCA9IHN0YXRzLnByb2ZpbGUoZGF0YSwgdXRpbC4kKGYpKTtcbiAgICByZXR1cm4gKHAuZmllbGQgPSBmLCBwKTtcbiAgfSk7XG4gIHJldHVybiAocy5fX3N1bW1hcnlfXyA9IHRydWUsIHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0cztcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgZm9ybWF0ID0gcmVxdWlyZSgnLi9mb3JtYXQnKTtcblxudmFyIGNvbnRleHQgPSB7XG4gIGZvcm1hdHM6ICAgIFtdLFxuICBmb3JtYXRfbWFwOiB7fSxcbiAgdHJ1bmNhdGU6ICAgdXRpbC50cnVuY2F0ZSxcbiAgcGFkOiAgICAgICAgdXRpbC5wYWQsXG4gIGRheTogICAgICAgIGZvcm1hdC5kYXksXG4gIG1vbnRoOiAgICAgIGZvcm1hdC5tb250aFxufTtcblxuZnVuY3Rpb24gdGVtcGxhdGUodGV4dCkge1xuICB2YXIgc3JjID0gc291cmNlKHRleHQsICdkJyk7XG4gIHNyYyA9ICd2YXIgX190OyByZXR1cm4gJyArIHNyYyArICc7JztcblxuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gKG5ldyBGdW5jdGlvbignZCcsIHNyYykpLmJpbmQoY29udGV4dCk7XG59XG5cbnRlbXBsYXRlLnNvdXJjZSA9IHNvdXJjZTtcbnRlbXBsYXRlLmNvbnRleHQgPSBjb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuLy8gQ2xlYXIgY2FjaGUgb2YgZm9ybWF0IG9iamVjdHMuXG4vLyBUaGlzIGNhbiAqYnJlYWsqIHByaW9yIHRlbXBsYXRlIGZ1bmN0aW9ucywgc28gaW52b2tlIHdpdGggY2FyZSFcbnRlbXBsYXRlLmNsZWFyRm9ybWF0Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgY29udGV4dC5mb3JtYXRzID0gW107XG4gIGNvbnRleHQuZm9ybWF0X21hcCA9IHt9O1xufTtcblxuLy8gR2VuZXJhdGUgcHJvcGVydHkgYWNjZXNzIGNvZGUgZm9yIHVzZSB3aXRoaW4gdGVtcGxhdGUgc291cmNlLlxuLy8gb2JqZWN0OiB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0ICh2YXJpYWJsZSkgY29udGFpbmluZyB0ZW1wbGF0ZSBkYXRhXG4vLyBwcm9wZXJ0eTogdGhlIHByb3BlcnR5IGFjY2VzcyBzdHJpbmcsIHZlcmJhdGltIGZyb20gdGVtcGxhdGUgdGFnXG50ZW1wbGF0ZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgdmFyIHNyYyA9IHV0aWwuZmllbGQocHJvcGVydHkpLm1hcCh1dGlsLnN0cikuam9pbignXVsnKTtcbiAgcmV0dXJuIG9iamVjdCArICdbJyArIHNyYyArICddJztcbn07XG5cbi8vIEdlbmVyYXRlIHNvdXJjZSBjb2RlIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uLlxuLy8gdGV4dDogdGhlIHRlbXBsYXRlIHRleHRcbi8vIHZhcmlhYmxlOiB0aGUgbmFtZSBvZiB0aGUgZGF0YSBvYmplY3QgdmFyaWFibGUgKCdvYmonIGJ5IGRlZmF1bHQpXG4vLyBwcm9wZXJ0aWVzOiBvcHRpb25hbCBoYXNoIGZvciBjb2xsZWN0aW5nIGFsbCBhY2Nlc3NlZCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBzb3VyY2UodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyaWFibGUgPSB2YXJpYWJsZSB8fCAnb2JqJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHNyYyA9ICdcXCcnO1xuICB2YXIgcmVnZXggPSB0ZW1wbGF0ZV9yZTtcblxuICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICB0ZXh0LnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpbnRlcnBvbGF0ZSwgb2Zmc2V0KSB7XG4gICAgc3JjICs9IHRleHRcbiAgICAgIC5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgICAgLnJlcGxhY2UodGVtcGxhdGVfZXNjYXBlciwgdGVtcGxhdGVfZXNjYXBlQ2hhcik7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgIHNyYyArPSAnXFwnXFxuKygoX190PSgnICtcbiAgICAgICAgdGVtcGxhdGVfdmFyKGludGVycG9sYXRlLCB2YXJpYWJsZSwgcHJvcGVydGllcykgK1xuICAgICAgICAnKSk9PW51bGw/XFwnXFwnOl9fdCkrXFxuXFwnJztcbiAgICB9XG5cbiAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIHNyYyArICdcXCcnO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZV92YXIodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGZpbHRlcnMgPSB0ZXh0Lm1hdGNoKGZpbHRlcl9yZSk7XG4gIHZhciBwcm9wID0gZmlsdGVycy5zaGlmdCgpLnRyaW0oKTtcbiAgdmFyIHN0cmluZ0Nhc3QgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHN0cmNhbGwoZm4pIHtcbiAgICBmbiA9IGZuIHx8ICcnO1xuICAgIGlmIChzdHJpbmdDYXN0KSB7XG4gICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICBzcmMgPSAnU3RyaW5nKCcgKyBzcmMgKyAnKScgKyBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3JjICs9IGZuO1xuICAgIH1cbiAgICByZXR1cm4gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZSgpIHtcbiAgICByZXR1cm4gJyh0eXBlb2YgJyArIHNyYyArICc9PT1cIm51bWJlclwiP25ldyBEYXRlKCcrc3JjKycpOicrc3JjKycpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG51bWJlcl9mb3JtYXQoZm10LCBrZXkpIHtcbiAgICBhID0gdGVtcGxhdGVfZm9ybWF0KGFyZ3NbMF0sIGtleSwgZm10KTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgc3JjID0gJ3RoaXMuZm9ybWF0c1snK2ErJ10oJytzcmMrJyknO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZV9mb3JtYXQoZm10LCBrZXkpIHtcbiAgICBhID0gdGVtcGxhdGVfZm9ybWF0KGFyZ3NbMF0sIGtleSwgZm10KTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgc3JjID0gJ3RoaXMuZm9ybWF0c1snK2ErJ10oJytkYXRlKCkrJyknO1xuICB9XG5cbiAgaWYgKHByb3BlcnRpZXMpIHByb3BlcnRpZXNbcHJvcF0gPSAxO1xuICB2YXIgc3JjID0gdGVtcGxhdGUucHJvcGVydHkodmFyaWFibGUsIHByb3ApO1xuXG4gIGZvciAodmFyIGk9MDsgaTxmaWx0ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGYgPSBmaWx0ZXJzW2ldLCBhcmdzID0gbnVsbCwgcGlkeCwgYSwgYjtcblxuICAgIGlmICgocGlkeD1mLmluZGV4T2YoJzonKSkgPiAwKSB7XG4gICAgICBmID0gZi5zbGljZSgwLCBwaWR4KTtcbiAgICAgIGFyZ3MgPSBmaWx0ZXJzW2ldLnNsaWNlKHBpZHgrMSlcbiAgICAgICAgLm1hdGNoKGFyZ3NfcmUpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH0pO1xuICAgIH1cbiAgICBmID0gZi50cmltKCk7XG5cbiAgICBzd2l0Y2ggKGYpIHtcbiAgICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgICAgIHN0cmNhbGwoJy5sZW5ndGgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsb3dlcic6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXInOlxuICAgICAgICBzdHJjYWxsKCcudG9VcHBlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xvd2VyLWxvY2FsZSc6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvY2FsZUxvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXItbG9jYWxlJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG9jYWxlVXBwZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmltJzpcbiAgICAgICAgc3RyY2FsbCgnLnRyaW0oKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgwLCcgKyBhICsgJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKC0nICsgYSArJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhICsgdXRpbC5udW1iZXIoYXJnc1sxXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgrJythKycsJytiKycpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2xpY2UnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgnKyBhICtcbiAgICAgICAgICAoYXJncy5sZW5ndGggPiAxID8gJywnICsgdXRpbC5udW1iZXIoYXJnc1sxXSkgOiAnJykgK1xuICAgICAgICAgICcpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJ1bmNhdGUnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhcmdzWzFdO1xuICAgICAgICBiID0gKGIhPT0nbGVmdCcgJiYgYiE9PSdtaWRkbGUnICYmIGIhPT0nY2VudGVyJykgPyAncmlnaHQnIDogYjtcbiAgICAgICAgc3JjID0gJ3RoaXMudHJ1bmNhdGUoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhZCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgYiA9IGFyZ3NbMV07XG4gICAgICAgIGIgPSAoYiE9PSdsZWZ0JyAmJiBiIT09J21pZGRsZScgJiYgYiE9PSdjZW50ZXInKSA/ICdyaWdodCcgOiBiO1xuICAgICAgICBzcmMgPSAndGhpcy5wYWQoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIG51bWJlcl9mb3JtYXQoZm9ybWF0Lm51bWJlciwgJ251bWJlcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aW1lX2Zvcm1hdChmb3JtYXQudGltZSwgJ3RpbWUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lLXV0Yyc6XG4gICAgICAgIHRpbWVfZm9ybWF0KGZvcm1hdC51dGMsICd0aW1lLXV0YycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgc3JjID0gJ3RoaXMubW9udGgoJyArIHNyYyArICcpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb250aC1hYmJyZXYnOlxuICAgICAgICBzcmMgPSAndGhpcy5tb250aCgnICsgc3JjICsgJyx0cnVlKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgc3JjID0gJ3RoaXMuZGF5KCcgKyBzcmMgKyAnKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF5LWFiYnJldic6XG4gICAgICAgIHNyYyA9ICd0aGlzLmRheSgnICsgc3JjICsgJyx0cnVlKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1VucmVjb2duaXplZCB0ZW1wbGF0ZSBmaWx0ZXI6ICcgKyBmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3JjO1xufVxuXG52YXIgdGVtcGxhdGVfcmUgPSAvXFx7XFx7KC4rPylcXH1cXH18JC9nLFxuICAgIGZpbHRlcl9yZSA9IC8oPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8W15cXHxcIl0rfFteXFx8XFwnXSspKy9nLFxuICAgIGFyZ3NfcmUgPSAvKD86XCJbXlwiXSpcInxcXCdbXlxcJ10qXFwnfFteLFwiXSt8W14sXFwnXSspKy9nO1xuXG4vLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuLy8gc3RyaW5nIGxpdGVyYWwuXG52YXIgdGVtcGxhdGVfZXNjYXBlcyA9IHtcbiAgJ1xcJyc6ICAgICAnXFwnJyxcbiAgJ1xcXFwnOiAgICAgJ1xcXFwnLFxuICAnXFxyJzogICAgICdyJyxcbiAgJ1xcbic6ICAgICAnbicsXG4gICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgJ1xcdTIwMjknOiAndTIwMjknXG59O1xuXG52YXIgdGVtcGxhdGVfZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcblxuZnVuY3Rpb24gdGVtcGxhdGVfZXNjYXBlQ2hhcihtYXRjaCkge1xuICByZXR1cm4gJ1xcXFwnICsgdGVtcGxhdGVfZXNjYXBlc1ttYXRjaF07XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlX2Zvcm1hdChwYXR0ZXJuLCBrZXksIGZtdCkge1xuICBpZiAoKHBhdHRlcm5bMF0gPT09ICdcXCcnICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcXCcnKSB8fFxuICAgICAgKHBhdHRlcm5bMF0gPT09ICdcIicgICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcIicpKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdGb3JtYXQgcGF0dGVybiBtdXN0IGJlIHF1b3RlZDogJyArIHBhdHRlcm4pO1xuICB9XG4gIGtleSA9IGtleSArICc6JyArIHBhdHRlcm47XG4gIGlmICghY29udGV4dC5mb3JtYXRfbWFwW2tleV0pIHtcbiAgICB2YXIgZiA9IGZtdChwYXR0ZXJuKTtcbiAgICB2YXIgaSA9IGNvbnRleHQuZm9ybWF0cy5sZW5ndGg7XG4gICAgY29udGV4dC5mb3JtYXRzLnB1c2goZik7XG4gICAgY29udGV4dC5mb3JtYXRfbWFwW2tleV0gPSBpO1xuICB9XG4gIHJldHVybiBjb250ZXh0LmZvcm1hdF9tYXBba2V5XTtcbn1cbiIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpO1xuXG52YXIgdGVtcERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGJhc2VEYXRlID0gbmV3IERhdGUoMCwgMCwgMSkuc2V0RnVsbFllYXIoMCksIC8vIEphbiAxLCAwIEFEXG4gICAgdXRjQmFzZURhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygwLCAwLCAxKSkuc2V0VVRDRnVsbFllYXIoMCk7XG5cbmZ1bmN0aW9uIGRhdGUoZCkge1xuICByZXR1cm4gKHRlbXBEYXRlLnNldFRpbWUoK2QpLCB0ZW1wRGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIHRpbWUgdW5pdCBlbnRyeVxuZnVuY3Rpb24gZW50cnkodHlwZSwgZGF0ZSwgdW5pdCwgc3RlcCwgbWluLCBtYXgpIHtcbiAgdmFyIGUgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIHVuaXQ6IHVuaXRcbiAgfTtcbiAgaWYgKHN0ZXApIHtcbiAgICBlLnN0ZXAgPSBzdGVwO1xuICB9IGVsc2Uge1xuICAgIGUubWluc3RlcCA9IDE7XG4gIH1cbiAgaWYgKG1pbiAhPSBudWxsKSBlLm1pbiA9IG1pbjtcbiAgaWYgKG1heCAhPSBudWxsKSBlLm1heCA9IG1heDtcbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0eXBlLCB1bml0LCBiYXNlLCBzdGVwLCBtaW4sIG1heCkge1xuICByZXR1cm4gZW50cnkodHlwZSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0Lm9mZnNldChiYXNlLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0LmNvdW50KGJhc2UsIGQpOyB9LFxuICAgIHN0ZXAsIG1pbiwgbWF4KTtcbn1cblxudmFyIGxvY2FsZSA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnNlY29uZCwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUubWludXRlLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS5ob3VyLCAgIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLmRheSwgICAgYmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS5tb250aCwgIGJhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUueWVhciwgICBiYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0U2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0SG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDQrZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIGQgJSAxMiwgMSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIHV0YyA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnV0Y1NlY29uZCwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUudXRjTWludXRlLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS51dGNIb3VyLCAgIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLnV0Y0RheSwgICAgdXRjQmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS51dGNNb250aCwgIHV0Y0Jhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUudXRjWWVhciwgICB1dGNCYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ1NlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDSG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDQrZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgZCAlIDEyLCAxKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIFNURVBTID0gW1xuICBbMzE1MzZlNiwgNV0sICAvLyAxLXllYXJcbiAgWzc3NzZlNiwgNF0sICAgLy8gMy1tb250aFxuICBbMjU5MmU2LCA0XSwgICAvLyAxLW1vbnRoXG4gIFsxMjA5NmU1LCAzXSwgIC8vIDItd2Vla1xuICBbNjA0OGU1LCAzXSwgICAvLyAxLXdlZWtcbiAgWzE3MjhlNSwgM10sICAgLy8gMi1kYXlcbiAgWzg2NGU1LCAzXSwgICAgLy8gMS1kYXlcbiAgWzQzMmU1LCAyXSwgICAgLy8gMTItaG91clxuICBbMjE2ZTUsIDJdLCAgICAvLyA2LWhvdXJcbiAgWzEwOGU1LCAyXSwgICAgLy8gMy1ob3VyXG4gIFszNmU1LCAyXSwgICAgIC8vIDEtaG91clxuICBbMThlNSwgMV0sICAgICAvLyAzMC1taW51dGVcbiAgWzllNSwgMV0sICAgICAgLy8gMTUtbWludXRlXG4gIFszZTUsIDFdLCAgICAgIC8vIDUtbWludXRlXG4gIFs2ZTQsIDFdLCAgICAgIC8vIDEtbWludXRlXG4gIFszZTQsIDBdLCAgICAgIC8vIDMwLXNlY29uZFxuICBbMTVlMywgMF0sICAgICAvLyAxNS1zZWNvbmRcbiAgWzVlMywgMF0sICAgICAgLy8gNS1zZWNvbmRcbiAgWzFlMywgMF0gICAgICAgLy8gMS1zZWNvbmRcbl07XG5cbmZ1bmN0aW9uIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIHN0ZXAgPSBTVEVQU1swXSwgaSwgbiwgYmlucztcblxuICBmb3IgKGk9MSwgbj1TVEVQUy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tTVEVQU1tpLTFdWzFdXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaW5zID49IG1pbmIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pdHNbU1RFUFNbbi0xXVsxXV07XG59XG5cbmZ1bmN0aW9uIHRvVW5pdE1hcCh1bml0cykge1xuICB2YXIgbWFwID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPXVuaXRzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBtYXBbdW5pdHNbaV0udHlwZV0gPSB1bml0c1tpXTtcbiAgfVxuICBtYXAuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgICByZXR1cm4gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yik7XG4gIH07XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Vbml0TWFwKGxvY2FsZSk7XG5tb2R1bGUuZXhwb3J0cy51dGMgPSB0b1VuaXRNYXAodXRjKTtcbiIsInZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi90aW1lJyksXG4gICAgdXRjID0gdGltZS51dGM7XG5cbnZhciB1ID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gdXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIEZOQU1FID0gJ19fbmFtZV9fJztcblxudS5uYW1lZGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBmKSB7IHJldHVybiAoZltGTkFNRV0gPSBuYW1lLCBmKTsgfTtcblxudS5uYW1lID0gZnVuY3Rpb24oZikgeyByZXR1cm4gZj09bnVsbCA/IG51bGwgOiBmW0ZOQU1FXTsgfTtcblxudS5pZGVudGl0eSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg7IH07XG5cbnUudHJ1ZSA9IHUubmFtZWRmdW5jKCd0cnVlJywgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9KTtcblxudS5mYWxzZSA9IHUubmFtZWRmdW5jKCdmYWxzZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuXG51LmR1cGxpY2F0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG5cbnUuZXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYik7XG59O1xuXG51LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKHZhciB4LCBuYW1lLCBpPTEsIGxlbj1hcmd1bWVudHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgeCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKG5hbWUgaW4geCkgeyBvYmpbbmFtZV0gPSB4W25hbWVdOyB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbnUubGVuZ3RoID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHgubGVuZ3RoICE9IG51bGwgPyB4Lmxlbmd0aCA6IG51bGw7XG59O1xuXG51LmtleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXlzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSBrZXlzLnB1c2goayk7XG4gIHJldHVybiBrZXlzO1xufTtcblxudS52YWxzID0gZnVuY3Rpb24oeCkge1xuICB2YXIgdmFscyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkgdmFscy5wdXNoKHhba10pO1xuICByZXR1cm4gdmFscztcbn07XG5cbnUudG9NYXAgPSBmdW5jdGlvbihsaXN0LCBmKSB7XG4gIHJldHVybiAoZiA9IHUuJChmKSkgP1xuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialtmKHgpXSA9IDEsIG9iaik7IH0sIHt9KSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW3hdID0gMSwgb2JqKTsgfSwge30pO1xufTtcblxudS5rZXlzdHIgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgLy8gdXNlIHRvIGVuc3VyZSBjb25zaXN0ZW50IGtleSBnZW5lcmF0aW9uIGFjcm9zcyBtb2R1bGVzXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgaWYgKCFuKSByZXR1cm4gJyc7XG4gIGZvciAodmFyIHM9U3RyaW5nKHZhbHVlc1swXSksIGk9MTsgaTxuOyArK2kpIHtcbiAgICBzICs9ICd8JyArIFN0cmluZyh2YWx1ZXNbaV0pO1xuICB9XG4gIHJldHVybiBzO1xufTtcblxuLy8gdHlwZSBjaGVja2luZyBmdW5jdGlvbnNcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudS5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbnUuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudS5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnUuaXNOdW1iZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59O1xuXG51LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn07XG5cbnUuaXNEYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnUuaXNWYWxpZCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmo7XG59O1xuXG51LmlzQnVmZmVyID0gKGJ1ZmZlci5CdWZmZXIgJiYgYnVmZmVyLkJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbi8vIHBhcnNlIGEgZGF0ZSB3aXRoIG9wdGlvbmFsIGQzLnRpbWUtZm9ybWF0IGZvcm1hdFxudS5kYXRlID0gZnVuY3Rpb24ocywgZm9ybWF0KSB7XG4gIHZhciBkID0gZm9ybWF0ID8gZm9ybWF0IDogRGF0ZTtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBkLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgPyBKU09OLnN0cmluZ2lmeSh4KVxuICAgIDogdS5pc1N0cmluZyh4KSA/ICgnXFwnJyt1dGlsX2VzY2FwZV9zdHIoeCkrJ1xcJycpIDogeDtcbn07XG5cbnZhciBlc2NhcGVfc3RyX3JlID0gLyhefFteXFxcXF0pJy9nO1xuXG5mdW5jdGlvbiB1dGlsX2VzY2FwZV9zdHIoeCkge1xuICByZXR1cm4geC5yZXBsYWNlKGVzY2FwZV9zdHJfcmUsICckMVxcXFxcXCcnKTtcbn1cblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnZhciBmaWVsZF9yZSA9IC9cXFsoLio/KVxcXXxbXi5cXFtdKy9nO1xuXG51LmZpZWxkID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gU3RyaW5nKGYpLm1hdGNoKGZpZWxkX3JlKS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkWzBdICE9PSAnWycgPyBkIDpcbiAgICAgIGRbMV0gIT09IFwiJ1wiICYmIGRbMV0gIT09ICdcIicgPyBkLnNsaWNlKDEsIC0xKSA6XG4gICAgICBkLnNsaWNlKDIsIC0yKS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCAnJDEnKTtcbiAgfSk7XG59O1xuXG51LmFjY2Vzc29yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIGY9PW51bGwgfHwgdS5pc0Z1bmN0aW9uKGYpID8gZiA6XG4gICAgdS5uYW1lZGZ1bmMoZiwgKHMgPSB1LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHMucmVkdWNlKGZ1bmN0aW9uKHgsZikgeyByZXR1cm4geFtmXTsgfSwgeCk7IH0gOlxuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4geFtmXTsgfVxuICAgICk7XG59O1xuXG4vLyBzaG9ydC1jdXQgZm9yIGFjY2Vzc29yXG51LiQgPSB1LmFjY2Vzc29yO1xuXG51Lm11dGF0b3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gdS5pc1N0cmluZyhmKSAmJiAocz11LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICBmdW5jdGlvbih4LCB2KSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8cy5sZW5ndGgtMTsgKytpKSB4ID0geFtzW2ldXTtcbiAgICAgIHhbc1tpXV0gPSB2O1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHgsIHYpIHsgeFtmXSA9IHY7IH07XG59O1xuXG5cbnUuJGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24oZikge1xuICAgIGYgPSB1LiQoZikgfHwgdS5pZGVudGl0eTtcbiAgICB2YXIgbiA9IG5hbWUgKyAodS5uYW1lKGYpID8gJ18nK3UubmFtZShmKSA6ICcnKTtcbiAgICByZXR1cm4gdS5uYW1lZGZ1bmMobiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gb3AoZihkKSk7IH0pO1xuICB9O1xufTtcblxudS4kdmFsaWQgID0gdS4kZnVuYygndmFsaWQnLCB1LmlzVmFsaWQpO1xudS4kbGVuZ3RoID0gdS4kZnVuYygnbGVuZ3RoJywgdS5sZW5ndGgpO1xuXG51LiRpbiA9IGZ1bmN0aW9uKGYsIHZhbHVlcykge1xuICBmID0gdS4kKGYpO1xuICB2YXIgbWFwID0gdS5pc0FycmF5KHZhbHVlcykgPyB1LnRvTWFwKHZhbHVlcykgOiB2YWx1ZXM7XG4gIHJldHVybiBmdW5jdGlvbihkKSB7IHJldHVybiAhIW1hcFtmKGQpXTsgfTtcbn07XG5cbnUuJHllYXIgICA9IHUuJGZ1bmMoJ3llYXInLCB0aW1lLnllYXIudW5pdCk7XG51LiRtb250aCAgPSB1LiRmdW5jKCdtb250aCcsIHRpbWUubW9udGhzLnVuaXQpO1xudS4kZGF0ZSAgID0gdS4kZnVuYygnZGF0ZScsIHRpbWUuZGF0ZXMudW5pdCk7XG51LiRkYXkgICAgPSB1LiRmdW5jKCdkYXknLCB0aW1lLndlZWtkYXlzLnVuaXQpO1xudS4kaG91ciAgID0gdS4kZnVuYygnaG91cicsIHRpbWUuaG91cnMudW5pdCk7XG51LiRtaW51dGUgPSB1LiRmdW5jKCdtaW51dGUnLCB0aW1lLm1pbnV0ZXMudW5pdCk7XG51LiRzZWNvbmQgPSB1LiRmdW5jKCdzZWNvbmQnLCB0aW1lLnNlY29uZHMudW5pdCk7XG5cbnUuJHV0Y1llYXIgICA9IHUuJGZ1bmMoJ3V0Y1llYXInLCB1dGMueWVhci51bml0KTtcbnUuJHV0Y01vbnRoICA9IHUuJGZ1bmMoJ3V0Y01vbnRoJywgdXRjLm1vbnRocy51bml0KTtcbnUuJHV0Y0RhdGUgICA9IHUuJGZ1bmMoJ3V0Y0RhdGUnLCB1dGMuZGF0ZXMudW5pdCk7XG51LiR1dGNEYXkgICAgPSB1LiRmdW5jKCd1dGNEYXknLCB1dGMud2Vla2RheXMudW5pdCk7XG51LiR1dGNIb3VyICAgPSB1LiRmdW5jKCd1dGNIb3VyJywgdXRjLmhvdXJzLnVuaXQpO1xudS4kdXRjTWludXRlID0gdS4kZnVuYygndXRjTWludXRlJywgdXRjLm1pbnV0ZXMudW5pdCk7XG51LiR1dGNTZWNvbmQgPSB1LiRmdW5jKCd1dGNTZWNvbmQnLCB1dGMuc2Vjb25kcy51bml0KTtcblxuLy8gY29tcGFyaXNvbiAvIHNvcnRpbmcgZnVuY3Rpb25zXG5cbnUuY29tcGFyYXRvciA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgdmFyIHNpZ24gPSBbXTtcbiAgaWYgKHNvcnQgPT09IHVuZGVmaW5lZCkgc29ydCA9IFtdO1xuICBzb3J0ID0gdS5hcnJheShzb3J0KS5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBzID0gMTtcbiAgICBpZiAgICAgIChmWzBdID09PSAnLScpIHsgcyA9IC0xOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIGVsc2UgaWYgKGZbMF0gPT09ICcrJykgeyBzID0gKzE7IGYgPSBmLnNsaWNlKDEpOyB9XG4gICAgc2lnbi5wdXNoKHMpO1xuICAgIHJldHVybiB1LmFjY2Vzc29yKGYpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBpLCBuLCBmLCB4LCB5O1xuICAgIGZvciAoaT0wLCBuPXNvcnQubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZiA9IHNvcnRbaV07IHggPSBmKGEpOyB5ID0gZihiKTtcbiAgICAgIGlmICh4IDwgeSkgcmV0dXJuIC0xICogc2lnbltpXTtcbiAgICAgIGlmICh4ID4geSkgcmV0dXJuIHNpZ25baV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xufTtcblxudS5jbXAgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChhID4gYikge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGEgPj0gYikge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiBOYU47XG59O1xuXG51Lm51bWNtcCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuXG51LnN0YWJsZXNvcnQgPSBmdW5jdGlvbihhcnJheSwgc29ydEJ5LCBrZXlGbikge1xuICB2YXIgaW5kaWNlcyA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihpZHgsIHYsIGkpIHtcbiAgICByZXR1cm4gKGlkeFtrZXlGbih2KV0gPSBpLCBpZHgpO1xuICB9LCB7fSk7XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNhID0gc29ydEJ5KGEpLFxuICAgICAgICBzYiA9IHNvcnRCeShiKTtcbiAgICByZXR1cm4gc2EgPCBzYiA/IC0xIDogc2EgPiBzYiA/IDFcbiAgICAgICAgIDogKGluZGljZXNba2V5Rm4oYSldIC0gaW5kaWNlc1trZXlGbihiKV0pO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5cbi8vIHN0cmluZyBmdW5jdGlvbnNcblxudS5wYWQgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgcGFkY2hhcikge1xuICBwYWRjaGFyID0gcGFkY2hhciB8fCBcIiBcIjtcbiAgdmFyIGQgPSBsZW5ndGggLSBzLmxlbmd0aDtcbiAgaWYgKGQgPD0gMCkgcmV0dXJuIHM7XG4gIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gc3RycmVwKGQsIHBhZGNoYXIpICsgcztcbiAgICBjYXNlICdtaWRkbGUnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gc3RycmVwKE1hdGguZmxvb3IoZC8yKSwgcGFkY2hhcikgK1xuICAgICAgICAgcyArIHN0cnJlcChNYXRoLmNlaWwoZC8yKSwgcGFkY2hhcik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzICsgc3RycmVwKGQsIHBhZGNoYXIpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJyZXAobiwgc3RyKSB7XG4gIHZhciBzID0gXCJcIiwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBzICs9IHN0cjtcbiAgcmV0dXJuIHM7XG59XG5cbnUudHJ1bmNhdGUgPSBmdW5jdGlvbihzLCBsZW5ndGgsIHBvcywgd29yZCwgZWxsaXBzaXMpIHtcbiAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICBpZiAobGVuIDw9IGxlbmd0aCkgcmV0dXJuIHM7XG4gIGVsbGlwc2lzID0gZWxsaXBzaXMgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhlbGxpcHNpcykgOiAnXFx1MjAyNic7XG4gIHZhciBsID0gTWF0aC5tYXgoMCwgbGVuZ3RoIC0gZWxsaXBzaXMubGVuZ3RoKTtcblxuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwsMSkgOiBzLnNsaWNlKGxlbi1sKSk7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdmFyIGwxID0gTWF0aC5jZWlsKGwvMiksIGwyID0gTWF0aC5mbG9vcihsLzIpO1xuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMSkgOiBzLnNsaWNlKDAsbDEpKSArXG4gICAgICAgIGVsbGlwc2lzICsgKHdvcmQgPyB0cnVuY2F0ZU9uV29yZChzLGwyLDEpIDogcy5zbGljZShsZW4tbDIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsKSA6IHMuc2xpY2UoMCxsKSkgKyBlbGxpcHNpcztcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJ1bmNhdGVPbldvcmQocywgbGVuLCByZXYpIHtcbiAgdmFyIGNudCA9IDAsIHRvayA9IHMuc3BsaXQodHJ1bmNhdGVfd29yZF9yZSk7XG4gIGlmIChyZXYpIHtcbiAgICBzID0gKHRvayA9IHRvay5yZXZlcnNlKCkpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSlcbiAgICAgIC5yZXZlcnNlKCk7XG4gIH0gZWxzZSB7XG4gICAgcyA9IHRvay5maWx0ZXIoZnVuY3Rpb24odykgeyBjbnQgKz0gdy5sZW5ndGg7IHJldHVybiBjbnQgPD0gbGVuOyB9KTtcbiAgfVxuICByZXR1cm4gcy5sZW5ndGggPyBzLmpvaW4oJycpLnRyaW0oKSA6IHRva1swXS5zbGljZSgwLCBsZW4pO1xufVxuXG52YXIgdHJ1bmNhdGVfd29yZF9yZSA9IC8oW1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUyMDI4XFx1MjAyOVxcdTMwMDBcXHVGRUZGXSkvO1xuIl19
