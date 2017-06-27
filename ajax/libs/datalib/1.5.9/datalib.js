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

  function objectConverter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + "]";
    }).join(",") + "}");
  }

  function customConverter(columns, f) {
    var object = objectConverter(columns);
    return function(row, i) {
      return f(object(row), i, columns);
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
        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
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

  var version = "0.1.13";

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

  var csCZ = locale({
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0Kč"],
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
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  };

  var format = defaultLocale.format;
  var formatPrefix = defaultLocale.formatPrefix;

  var version = "0.4.2";

  exports.version = version;
  exports.format = format;
  exports.formatPrefix = formatPrefix;
  exports.locale = locale;
  exports.localeCaEs = caES;
  exports.localeCsCz = csCZ;
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

  var version = "0.2.1";

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

  var version = "0.1.1";

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

},{}],7:[function(require,module,exports){
var util = require('./util'),
    time = require('./time'),
    utc = time.utc;

var u = module.exports;

u.$year   = util.$func('year', time.year.unit);
u.$month  = util.$func('month', time.months.unit);
u.$date   = util.$func('date', time.dates.unit);
u.$day    = util.$func('day', time.weekdays.unit);
u.$hour   = util.$func('hour', time.hours.unit);
u.$minute = util.$func('minute', time.minutes.unit);
u.$second = util.$func('second', time.seconds.unit);

u.$utcYear   = util.$func('utcYear', utc.year.unit);
u.$utcMonth  = util.$func('utcMonth', utc.months.unit);
u.$utcDate   = util.$func('utcDate', utc.dates.unit);
u.$utcDay    = util.$func('utcDay', utc.weekdays.unit);
u.$utcHour   = util.$func('utcHour', utc.hours.unit);
u.$utcMinute = util.$func('utcMinute', utc.minutes.unit);
u.$utcSecond = util.$func('utcSecond', utc.seconds.unit);

},{"./time":29,"./util":30}],8:[function(require,module,exports){
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
  return m != null ? get(m) : +Infinity;
};

proto.max = function(get) {
  var m = this.extent(get)[1];
  return m != null ? get(m) : -Infinity;
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
    while (Math.ceil(span/step) > maxb) { step *= base; }

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
},{"./util":30,"d3-format":3,"d3-time":5,"d3-time-format":4}],16:[function(require,module,exports){
var util = require('./util'),
    gen = module.exports;

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

gen.random.bootstrap = function(domain, smooth) {
  // Generates a bootstrap sample from a set of observations.
  // Smooth bootstrapping adds random zero-centered noise to the samples.
  var val = domain.filter(util.isValid),
      len = val.length,
      err = smooth ? gen.random.normal(0, smooth) : null;
  var f = function() {
    return val[~~(Math.random()*len)] + (err ? err() : 0);
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  return f;
};
},{"./util":30}],17:[function(require,module,exports){
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

},{"./json":19,"topojson":6}],21:[function(require,module,exports){
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
var util = require('../util');

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
  return load.loader(opt, callback);
}

function loader(opt, callback) {
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
    return load.xhr(url, opt, callback);
  } else if (startsWith(url, fileProtocol)) {
    // on server, if url starts with 'file://', strip it and load from file
    return load.file(url.slice(fileProtocol.length), opt, callback);
  } else if (url.indexOf('://') < 0) { // TODO better protocol check?
    // on server, if no protocol assume file
    return load.file(url, opt, callback);
  } else {
    // for regular URLs on server
    return load.http(url, opt, callback);
  }
}

function xhrHasResponse(request) {
  var type = request.responseType;
  return type && type !== 'text' ?
    request.response : // null on error
    request.responseText; // '' on error
}

function xhr(url, opt, callback) {
  var async = !!callback;
  var request = new XMLHttpRequest();
  // If IE does not support CORS, use XDomainRequest (copied from d3.xhr)
  if (typeof XDomainRequest !== 'undefined' &&
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
  /* istanbul ignore else */
  if (request.setRequestHeader) {
    var headers = util.extend({}, load.headers, opt.headers);
    for (var name in headers) {
      request.setRequestHeader(name, headers[name]);
    }
  }
  request.send();

  if (!async && xhrHasResponse(request)) {
    return request.responseText;
  }
}

function file(filename, opt, callback) {
  var fs = require('fs');
  if (!callback) {
    return fs.readFileSync(filename, 'utf8');
  }
  fs.readFile(filename, callback);
}

function http(url, opt, callback) {
  var headers = util.extend({}, load.headers, opt.headers);

  if (!callback) {
    return require('sync-request')('GET', url, {headers: headers}).getBody();
  }

  var options = {url: url, encoding: null, gzip: true, headers: headers};
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

// Allow these functions to be overriden by the user of the library
load.loader = loader;
load.sanitizeUrl = sanitizeUrl;
load.xhr = xhr;
load.file = file;
load.http = http;

// Default settings
load.useXHR = (typeof XMLHttpRequest !== 'undefined');
load.headers = {};

module.exports = load;

},{"../util":30,"fs":1,"request":1,"sync-request":1,"url":1}],23:[function(require,module,exports){
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
  version:    '1.5.9',
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
util.extend(dl, require('./accessor'));
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

},{"./accessor":7,"./aggregate/aggregator":8,"./aggregate/groupby":10,"./bins/bins":12,"./bins/histogram":13,"./format":15,"./format-tables":14,"./generate":16,"./import/load":22,"./import/read":23,"./import/readers":24,"./import/type":25,"./stats":27,"./template":28,"./time":29,"./util":30}],27:[function(require,module,exports){
var util = require('./util');
var type = require('./import/type');
var gen = require('./generate');

var stats = module.exports;

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
  var ra = b ? stats.rank(values, a) : stats.rank(values),
      rb = b ? stats.rank(values, b) : stats.rank(a),
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

// Namespace for bootstrap
stats.bootstrap = {};

// Construct a bootstrapped confidence interval at a given percentile level
// Arguments are an array, an optional n (defaults to 1000),
//  an optional alpha (defaults to 0.05), and an optional smoothing parameter
stats.bootstrap.ci = function(values, a, b, c, d) {
  var X, N, alpha, smooth, bs, means, i;
  if (util.isFunction(a) || util.isString(a)) {
    X = values.map(util.$(a));
    N = b;
    alpha = c;
    smooth = d;
  } else {
    X = values;
    N = a;
    alpha = b;
    smooth = c;
  }
  N = N ? +N : 1000;
  alpha = alpha || 0.05;

  bs = gen.random.bootstrap(X, smooth);
  for (i=0, means = Array(N); i<N; ++i) {
    means[i] = stats.mean(bs.samples(X.length));
  }
  means.sort(util.numcmp);
  return [
    stats.quantile(means, alpha/2),
    stats.quantile(means, 1-(alpha/2))
  ];
};

// Namespace for z-tests
stats.z = {};

// Construct a z-confidence interval at a given significance level
// Arguments are an array and an optional alpha (defaults to 0.05).
stats.z.ci = function(values, a, b) {
  var X = values, alpha = a;
  if (util.isFunction(a) || util.isString(a)) {
    X = values.map(util.$(a));
    alpha = b;
  }
  alpha = alpha || 0.05;

  var z = alpha===0.05 ? 1.96 : gen.random.normal(0, 1).icdf(1-(alpha/2)),
      mu = stats.mean(X),
      SE = stats.stdev(X) / Math.sqrt(stats.count.valid(X));
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
  } else if (util.isFunction(a) || util.isString(a)) {
    return ztest1(b, values, a); // table and accessor
  } else {
    return ztest1(a, values); // one array
  }
};

// Perform a z-test of means. Returns the p-value.
// Assuming we have a list of values, and a null hypothesis. If no null
// hypothesis, assume our null hypothesis is mu=0.
function ztest1(opt, X, f) {
  var nullH = opt && opt.nullh || 0,
      gaussian = gen.random.normal(0, 1),
      mu = stats.mean(X,f),
      SE = stats.stdev(X,f) / Math.sqrt(stats.count.valid(X,f));

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
template.format = get_format;
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

  function formatter(type) {
    var pattern = args[0];
    if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
        (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
      pattern = pattern.slice(1, -1);
    } else {
      throw Error('Format pattern must be quoted: ' + pattern);
    }
    a = template_format(pattern, type);
    stringCast = false;
    var arg = type === 'number' ? src : date();
    src = 'this.formats['+a+']('+arg+')';
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
        formatter('number');
        break;
      case 'time':
        formatter('time');
        break;
      case 'time-utc':
        formatter('utc');
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

function template_format(pattern, type) {
  var key = type + ':' + pattern;
  if (context.format_map[key] == null) {
    var f = format[type](pattern);
    var i = context.formats.length;
    context.formats.push(f);
    context.format_map[key] = i;
    return i;
  }
  return context.format_map[key];
}

function get_format(pattern, type) {
  return context.formats[template_format(pattern, type)];
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
},{"d3-time":5}],30:[function(require,module,exports){
(function (Buffer){
var u = module.exports;

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

u.isBuffer = (typeof Buffer === 'function' && Buffer.isBuffer) || u.false;

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

}).call(this,require("buffer").Buffer)

},{"buffer":1}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLWRzdi9idWlsZC9kMy1kc3YuanMiLCJub2RlX21vZHVsZXMvZDMtZm9ybWF0L2J1aWxkL2QzLWZvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lLWZvcm1hdC9idWlsZC9kMy10aW1lLWZvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lL2J1aWxkL2QzLXRpbWUuanMiLCJub2RlX21vZHVsZXMvdG9wb2pzb24vdG9wb2pzb24uanMiLCJzcmMvYWNjZXNzb3IuanMiLCJzcmMvYWdncmVnYXRlL2FnZ3JlZ2F0b3IuanMiLCJzcmMvYWdncmVnYXRlL2NvbGxlY3Rvci5qcyIsInNyYy9hZ2dyZWdhdGUvZ3JvdXBieS5qcyIsInNyYy9hZ2dyZWdhdGUvbWVhc3VyZXMuanMiLCJzcmMvYmlucy9iaW5zLmpzIiwic3JjL2JpbnMvaGlzdG9ncmFtLmpzIiwic3JjL2Zvcm1hdC10YWJsZXMuanMiLCJzcmMvZm9ybWF0LmpzIiwic3JjL2dlbmVyYXRlLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2Rzdi5qcyIsInNyYy9pbXBvcnQvZm9ybWF0cy9pbmRleC5qcyIsInNyYy9pbXBvcnQvZm9ybWF0cy9qc29uLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL3RvcG9qc29uLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL3RyZWVqc29uLmpzIiwic3JjL2ltcG9ydC9sb2FkLmpzIiwic3JjL2ltcG9ydC9yZWFkLmpzIiwic3JjL2ltcG9ydC9yZWFkZXJzLmpzIiwic3JjL2ltcG9ydC90eXBlLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3N0YXRzLmpzIiwic3JjL3RlbXBsYXRlLmpzIiwic3JjL3RpbWUuanMiLCJzcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ256QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNockJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKCdkMy1kc3YnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfZHN2ID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIpIHtcbiAgICByZXR1cm4gbmV3IERzdihkZWxpbWl0ZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0Q29udmVydGVyKGNvbHVtbnMpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZFwiLCBcInJldHVybiB7XCIgKyBjb2x1bW5zLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIjogZFtcIiArIGkgKyBcIl1cIjtcbiAgICB9KS5qb2luKFwiLFwiKSArIFwifVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1c3RvbUNvbnZlcnRlcihjb2x1bW5zLCBmKSB7XG4gICAgdmFyIG9iamVjdCA9IG9iamVjdENvbnZlcnRlcihjb2x1bW5zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgICByZXR1cm4gZihvYmplY3Qocm93KSwgaSwgY29sdW1ucyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdW5pcXVlIGNvbHVtbnMgaW4gb3JkZXIgb2YgZGlzY292ZXJ5LlxuICBmdW5jdGlvbiBpbmZlckNvbHVtbnMocm93cykge1xuICAgIHZhciBjb2x1bW5TZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICBjb2x1bW5zID0gW107XG5cbiAgICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICBmb3IgKHZhciBjb2x1bW4gaW4gcm93KSB7XG4gICAgICAgIGlmICghKGNvbHVtbiBpbiBjb2x1bW5TZXQpKSB7XG4gICAgICAgICAgY29sdW1ucy5wdXNoKGNvbHVtblNldFtjb2x1bW5dID0gY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICBmdW5jdGlvbiBEc3YoZGVsaW1pdGVyKSB7XG4gICAgdmFyIHJlRm9ybWF0ID0gbmV3IFJlZ0V4cChcIltcXFwiXCIgKyBkZWxpbWl0ZXIgKyBcIlxcbl1cIiksXG4gICAgICAgIGRlbGltaXRlckNvZGUgPSBkZWxpbWl0ZXIuY2hhckNvZGVBdCgwKTtcblxuICAgIHRoaXMucGFyc2UgPSBmdW5jdGlvbih0ZXh0LCBmKSB7XG4gICAgICB2YXIgY29udmVydCwgY29sdW1ucywgcm93cyA9IHRoaXMucGFyc2VSb3dzKHRleHQsIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgICBpZiAoY29udmVydCkgcmV0dXJuIGNvbnZlcnQocm93LCBpIC0gMSk7XG4gICAgICAgIGNvbHVtbnMgPSByb3csIGNvbnZlcnQgPSBmID8gY3VzdG9tQ29udmVydGVyKHJvdywgZikgOiBvYmplY3RDb252ZXJ0ZXIocm93KTtcbiAgICAgIH0pO1xuICAgICAgcm93cy5jb2x1bW5zID0gY29sdW1ucztcbiAgICAgIHJldHVybiByb3dzO1xuICAgIH07XG5cbiAgICB0aGlzLnBhcnNlUm93cyA9IGZ1bmN0aW9uKHRleHQsIGYpIHtcbiAgICAgIHZhciBFT0wgPSB7fSwgLy8gc2VudGluZWwgdmFsdWUgZm9yIGVuZC1vZi1saW5lXG4gICAgICAgICAgRU9GID0ge30sIC8vIHNlbnRpbmVsIHZhbHVlIGZvciBlbmQtb2YtZmlsZVxuICAgICAgICAgIHJvd3MgPSBbXSwgLy8gb3V0cHV0IHJvd3NcbiAgICAgICAgICBOID0gdGV4dC5sZW5ndGgsXG4gICAgICAgICAgSSA9IDAsIC8vIGN1cnJlbnQgY2hhcmFjdGVyIGluZGV4XG4gICAgICAgICAgbiA9IDAsIC8vIHRoZSBjdXJyZW50IGxpbmUgbnVtYmVyXG4gICAgICAgICAgdCwgLy8gdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICBlb2w7IC8vIGlzIHRoZSBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICAgIGlmIChJID49IE4pIHJldHVybiBFT0Y7IC8vIHNwZWNpYWwgY2FzZTogZW5kIG9mIGZpbGVcbiAgICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7IC8vIHNwZWNpYWwgY2FzZTogZW5kIG9mIGxpbmVcblxuICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IHF1b3Rlc1xuICAgICAgICB2YXIgaiA9IEk7XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IDM0KSB7XG4gICAgICAgICAgdmFyIGkgPSBqO1xuICAgICAgICAgIHdoaWxlIChpKysgPCBOKSB7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpID09PSAzNCkge1xuICAgICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkgKyAxKSAhPT0gMzQpIGJyZWFrO1xuICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIEkgPSBpICsgMjtcbiAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgaWYgKGMgPT09IDEzKSB7XG4gICAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMikgPT09IDEwKSArK0k7XG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAxMCkge1xuICAgICAgICAgICAgZW9sID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiArIDEsIGkpLnJlcGxhY2UoL1wiXCIvZywgXCJcXFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tbW9uIGNhc2U6IGZpbmQgbmV4dCBkZWxpbWl0ZXIgb3IgbmV3bGluZVxuICAgICAgICB3aGlsZSAoSSA8IE4pIHtcbiAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChJKyspLCBrID0gMTtcbiAgICAgICAgICBpZiAoYyA9PT0gMTApIGVvbCA9IHRydWU7IC8vIFxcblxuICAgICAgICAgIGVsc2UgaWYgKGMgPT09IDEzKSB7IGVvbCA9IHRydWU7IGlmICh0ZXh0LmNoYXJDb2RlQXQoSSkgPT09IDEwKSArK0ksICsrazsgfSAvLyBcXHJ8XFxyXFxuXG4gICAgICAgICAgZWxzZSBpZiAoYyAhPT0gZGVsaW1pdGVyQ29kZSkgY29udGludWU7XG4gICAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgSSAtIGspO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBsYXN0IHRva2VuIGJlZm9yZSBFT0ZcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2Uoaik7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICgodCA9IHRva2VuKCkpICE9PSBFT0YpIHtcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgd2hpbGUgKHQgIT09IEVPTCAmJiB0ICE9PSBFT0YpIHtcbiAgICAgICAgICBhLnB1c2godCk7XG4gICAgICAgICAgdCA9IHRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYgJiYgKGEgPSBmKGEsIG4rKykpID09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICByb3dzLnB1c2goYSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybWF0ID0gZnVuY3Rpb24ocm93cywgY29sdW1ucykge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgICAgcmV0dXJuIFtjb2x1bW5zLm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpXS5jb25jYXQocm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2NvbHVtbl0pO1xuICAgICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgICB9KSkuam9pbihcIlxcblwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JtYXRSb3dzID0gZnVuY3Rpb24ocm93cykge1xuICAgICAgcmV0dXJuIHJvd3MubWFwKGZvcm1hdFJvdykuam9pbihcIlxcblwiKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgICAgcmV0dXJuIHJvdy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh0ZXh0KSB7XG4gICAgICByZXR1cm4gcmVGb3JtYXQudGVzdCh0ZXh0KSA/IFwiXFxcIlwiICsgdGV4dC5yZXBsYWNlKC9cXFwiL2csIFwiXFxcIlxcXCJcIikgKyBcIlxcXCJcIiA6IHRleHQ7XG4gICAgfVxuICB9O1xuXG4gIGRzdi5wcm90b3R5cGUgPSBEc3YucHJvdG90eXBlO1xuXG4gIHZhciBjc3YgPSBkc3YoXCIsXCIpO1xuICB2YXIgdHN2ID0gZHN2KFwiXFx0XCIpO1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjEuMTNcIjtcblxuICBleHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICBleHBvcnRzLmRzdiA9IGRzdjtcbiAgZXhwb3J0cy5jc3YgPSBjc3Y7XG4gIGV4cG9ydHMudHN2ID0gdHN2O1xuXG59KSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtZm9ybWF0JywgWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgZmFjdG9yeSgoZ2xvYmFsLmQzX2Zvcm1hdCA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvLyBDb21wdXRlcyB0aGUgZGVjaW1hbCBjb2VmZmljaWVudCBhbmQgZXhwb25lbnQgb2YgdGhlIHNwZWNpZmllZCBudW1iZXIgeCB3aXRoXG4gIC8vIHNpZ25pZmljYW50IGRpZ2l0cyBwLCB3aGVyZSB4IGlzIHBvc2l0aXZlIGFuZCBwIGlzIGluIFsxLCAyMV0gb3IgdW5kZWZpbmVkLlxuICAvLyBGb3IgZXhhbXBsZSwgZm9ybWF0RGVjaW1hbCgxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbiAgZnVuY3Rpb24gZm9ybWF0RGVjaW1hbCh4LCBwKSB7XG4gICAgaWYgKChpID0gKHggPSBwID8geC50b0V4cG9uZW50aWFsKHAgLSAxKSA6IHgudG9FeHBvbmVudGlhbCgpKS5pbmRleE9mKFwiZVwiKSkgPCAwKSByZXR1cm4gbnVsbDsgLy8gTmFOLCDCsUluZmluaXR5XG4gICAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAgIC8vIFRoZSBzdHJpbmcgcmV0dXJuZWQgYnkgdG9FeHBvbmVudGlhbCBlaXRoZXIgaGFzIHRoZSBmb3JtIFxcZFxcLlxcZCtlWy0rXVxcZCtcbiAgICAvLyAoZS5nLiwgMS4yZSszKSBvciB0aGUgZm9ybSBcXGRlWy0rXVxcZCsgKGUuZy4sIDFlKzMpLlxuICAgIHJldHVybiBbXG4gICAgICBjb2VmZmljaWVudC5sZW5ndGggPiAxID8gY29lZmZpY2llbnRbMF0gKyBjb2VmZmljaWVudC5zbGljZSgyKSA6IGNvZWZmaWNpZW50LFxuICAgICAgK3guc2xpY2UoaSArIDEpXG4gICAgXTtcbiAgfTtcblxuICBmdW5jdGlvbiBleHBvbmVudCh4KSB7XG4gICAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsKE1hdGguYWJzKHgpKSwgeCA/IHhbMV0gOiBOYU47XG4gIH07XG5cbiAgZnVuY3Rpb24gZm9ybWF0R3JvdXAoZ3JvdXBpbmcsIHRob3VzYW5kcykge1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgd2lkdGgpIHtcbiAgICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICAgIHQgPSBbXSxcbiAgICAgICAgICBqID0gMCxcbiAgICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgICAgbGVuZ3RoID0gMDtcblxuICAgICAgd2hpbGUgKGkgPiAwICYmIGcgPiAwKSB7XG4gICAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgICB0LnB1c2godmFsdWUuc3Vic3RyaW5nKGkgLT0gZywgaSArIGcpKTtcbiAgICAgICAgaWYgKChsZW5ndGggKz0gZyArIDEpID4gd2lkdGgpIGJyZWFrO1xuICAgICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbih0aG91c2FuZHMpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIHByZWZpeEV4cG9uZW50O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFByZWZpeEF1dG8oeCwgcCkge1xuICAgIHZhciBkID0gZm9ybWF0RGVjaW1hbCh4LCBwKTtcbiAgICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgICBleHBvbmVudCA9IGRbMV0sXG4gICAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gaSA9PT0gbiA/IGNvZWZmaWNpZW50XG4gICAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgICAgOiBcIjAuXCIgKyBuZXcgQXJyYXkoMSAtIGkpLmpvaW4oXCIwXCIpICsgZm9ybWF0RGVjaW1hbCh4LCBNYXRoLm1heCgwLCBwICsgaSAtIDEpKVswXTsgLy8gbGVzcyB0aGFuIDF5IVxuICB9O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFJvdW5kZWQoeCwgcCkge1xuICAgIHZhciBkID0gZm9ybWF0RGVjaW1hbCh4LCBwKTtcbiAgICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgICBleHBvbmVudCA9IGRbMV07XG4gICAgcmV0dXJuIGV4cG9uZW50IDwgMCA/IFwiMC5cIiArIG5ldyBBcnJheSgtZXhwb25lbnQpLmpvaW4oXCIwXCIpICsgY29lZmZpY2llbnRcbiAgICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICAgIDogY29lZmZpY2llbnQgKyBuZXcgQXJyYXkoZXhwb25lbnQgLSBjb2VmZmljaWVudC5sZW5ndGggKyAyKS5qb2luKFwiMFwiKTtcbiAgfTtcblxuICBmdW5jdGlvbiBmb3JtYXREZWZhdWx0KHgsIHApIHtcbiAgICB4ID0geC50b1ByZWNpc2lvbihwKTtcblxuICAgIG91dDogZm9yICh2YXIgbiA9IHgubGVuZ3RoLCBpID0gMSwgaTAgPSAtMSwgaTE7IGkgPCBuOyArK2kpIHtcbiAgICAgIHN3aXRjaCAoeFtpXSkge1xuICAgICAgICBjYXNlIFwiLlwiOiBpMCA9IGkxID0gaTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIwXCI6IGlmIChpMCA9PT0gMCkgaTAgPSBpOyBpMSA9IGk7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiZVwiOiBicmVhayBvdXQ7XG4gICAgICAgIGRlZmF1bHQ6IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGkwID4gMCA/IHguc2xpY2UoMCwgaTApICsgeC5zbGljZShpMSArIDEpIDogeDtcbiAgfTtcblxuICB2YXIgZm9ybWF0VHlwZXMgPSB7XG4gICAgXCJcIjogZm9ybWF0RGVmYXVsdCxcbiAgICBcIiVcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gKHggKiAxMDApLnRvRml4ZWQocCk7IH0sXG4gICAgXCJiXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMik7IH0sXG4gICAgXCJjXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKyBcIlwiOyB9LFxuICAgIFwiZFwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDEwKTsgfSxcbiAgICBcImVcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b0V4cG9uZW50aWFsKHApOyB9LFxuICAgIFwiZlwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiB4LnRvRml4ZWQocCk7IH0sXG4gICAgXCJnXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9QcmVjaXNpb24ocCk7IH0sXG4gICAgXCJvXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoOCk7IH0sXG4gICAgXCJwXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIGZvcm1hdFJvdW5kZWQoeCAqIDEwMCwgcCk7IH0sXG4gICAgXCJyXCI6IGZvcm1hdFJvdW5kZWQsXG4gICAgXCJzXCI6IGZvcm1hdFByZWZpeEF1dG8sXG4gICAgXCJYXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7IH0sXG4gICAgXCJ4XCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpOyB9XG4gIH07XG5cbiAgLy8gW1tmaWxsXWFsaWduXVtzaWduXVtzeW1ib2xdWzBdW3dpZHRoXVssXVsucHJlY2lzaW9uXVt0eXBlXVxuICB2YXIgcmUgPSAvXig/OiguKT8oWzw+PV5dKSk/KFsrXFwtXFwoIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KFthLXolXSk/JC9pO1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgICByZXR1cm4gbmV3IEZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG5cbiAgICB2YXIgbWF0Y2gsXG4gICAgICAgIGZpbGwgPSBtYXRjaFsxXSB8fCBcIiBcIixcbiAgICAgICAgYWxpZ24gPSBtYXRjaFsyXSB8fCBcIj5cIixcbiAgICAgICAgc2lnbiA9IG1hdGNoWzNdIHx8IFwiLVwiLFxuICAgICAgICBzeW1ib2wgPSBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICB6ZXJvID0gISFtYXRjaFs1XSxcbiAgICAgICAgd2lkdGggPSBtYXRjaFs2XSAmJiArbWF0Y2hbNl0sXG4gICAgICAgIGNvbW1hID0gISFtYXRjaFs3XSxcbiAgICAgICAgcHJlY2lzaW9uID0gbWF0Y2hbOF0gJiYgK21hdGNoWzhdLnNsaWNlKDEpLFxuICAgICAgICB0eXBlID0gbWF0Y2hbOV0gfHwgXCJcIjtcblxuICAgIC8vIFRoZSBcIm5cIiB0eXBlIGlzIGFuIGFsaWFzIGZvciBcIixnXCIuXG4gICAgaWYgKHR5cGUgPT09IFwiblwiKSBjb21tYSA9IHRydWUsIHR5cGUgPSBcImdcIjtcblxuICAgIC8vIE1hcCBpbnZhbGlkIHR5cGVzIHRvIHRoZSBkZWZhdWx0IGZvcm1hdC5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHR5cGUgPSBcIlwiO1xuXG4gICAgLy8gSWYgemVybyBmaWxsIGlzIHNwZWNpZmllZCwgcGFkZGluZyBnb2VzIGFmdGVyIHNpZ24gYW5kIGJlZm9yZSBkaWdpdHMuXG4gICAgaWYgKHplcm8gfHwgKGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikpIHplcm8gPSB0cnVlLCBmaWxsID0gXCIwXCIsIGFsaWduID0gXCI9XCI7XG5cbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xuICAgIHRoaXMuYWxpZ24gPSBhbGlnbjtcbiAgICB0aGlzLnNpZ24gPSBzaWduO1xuICAgIHRoaXMuc3ltYm9sID0gc3ltYm9sO1xuICAgIHRoaXMuemVybyA9IHplcm87XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuY29tbWEgPSBjb21tYTtcbiAgICB0aGlzLnByZWNpc2lvbiA9IHByZWNpc2lvbjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgRm9ybWF0U3BlY2lmaWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICAgKyB0aGlzLmFsaWduXG4gICAgICAgICsgdGhpcy5zaWduXG4gICAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICAgKyAodGhpcy56ZXJvID8gXCIwXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLndpZHRoID09IG51bGwgPyBcIlwiIDogTWF0aC5tYXgoMSwgdGhpcy53aWR0aCB8IDApKVxuICAgICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLnByZWNpc2lvbiA9PSBudWxsID8gXCJcIiA6IFwiLlwiICsgTWF0aC5tYXgoMCwgdGhpcy5wcmVjaXNpb24gfCAwKSlcbiAgICAgICAgKyB0aGlzLnR5cGU7XG4gIH07XG5cbiAgdmFyIHByZWZpeGVzID0gW1wieVwiLFwielwiLFwiYVwiLFwiZlwiLFwicFwiLFwiblwiLFwiwrVcIixcIm1cIixcIlwiLFwia1wiLFwiTVwiLFwiR1wiLFwiVFwiLFwiUFwiLFwiRVwiLFwiWlwiLFwiWVwiXTtcblxuICBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbGUobG9jYWxlKSB7XG4gICAgdmFyIGdyb3VwID0gbG9jYWxlLmdyb3VwaW5nICYmIGxvY2FsZS50aG91c2FuZHMgPyBmb3JtYXRHcm91cChsb2NhbGUuZ3JvdXBpbmcsIGxvY2FsZS50aG91c2FuZHMpIDogaWRlbnRpdHksXG4gICAgICAgIGN1cnJlbmN5ID0gbG9jYWxlLmN1cnJlbmN5LFxuICAgICAgICBkZWNpbWFsID0gbG9jYWxlLmRlY2ltYWw7XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgICBzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKTtcblxuICAgICAgdmFyIGZpbGwgPSBzcGVjaWZpZXIuZmlsbCxcbiAgICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgICBzaWduID0gc3BlY2lmaWVyLnNpZ24sXG4gICAgICAgICAgc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCxcbiAgICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgICAgd2lkdGggPSBzcGVjaWZpZXIud2lkdGgsXG4gICAgICAgICAgY29tbWEgPSBzcGVjaWZpZXIuY29tbWEsXG4gICAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgICAgLy8gRm9yIFNJLXByZWZpeCwgdGhlIHN1ZmZpeCBpcyBsYXppbHkgY29tcHV0ZWQuXG4gICAgICB2YXIgcHJlZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5WzBdIDogc3ltYm9sID09PSBcIiNcIiAmJiAvW2JveFhdLy50ZXN0KHR5cGUpID8gXCIwXCIgKyB0eXBlLnRvTG93ZXJDYXNlKCkgOiBcIlwiLFxuICAgICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVsxXSA6IC9bJXBdLy50ZXN0KHR5cGUpID8gXCIlXCIgOiBcIlwiO1xuXG4gICAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgICAgLy8gSXMgdGhpcyBhbiBpbnRlZ2VyIHR5cGU/XG4gICAgICAvLyBDYW4gdGhpcyB0eXBlIGdlbmVyYXRlIGV4cG9uZW50aWFsIG5vdGF0aW9uP1xuICAgICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgICBtYXliZVN1ZmZpeCA9ICF0eXBlIHx8IC9bZGVmZ3BycyVdLy50ZXN0KHR5cGUpO1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgcHJlY2lzaW9uIGlmIG5vdCBzcGVjaWZpZWQsXG4gICAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgICAgLy8gRm9yIHNpZ25pZmljYW50IHByZWNpc2lvbiwgaXQgbXVzdCBiZSBpbiBbMSwgMjFdLlxuICAgICAgLy8gRm9yIGZpeGVkIHByZWNpc2lvbiwgaXQgbXVzdCBiZSBpbiBbMCwgMjBdLlxuICAgICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09IG51bGwgPyAodHlwZSA/IDYgOiAxMilcbiAgICAgICAgICA6IC9bZ3Byc10vLnRlc3QodHlwZSkgPyBNYXRoLm1heCgxLCBNYXRoLm1pbigyMSwgcHJlY2lzaW9uKSlcbiAgICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZVByZWZpeCA9IHByZWZpeCxcbiAgICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4O1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICAgIHZhbHVlU3VmZml4ID0gZm9ybWF0VHlwZSh2YWx1ZSkgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSArdmFsdWU7XG5cbiAgICAgICAgICAvLyBDb252ZXJ0IG5lZ2F0aXZlIHRvIHBvc2l0aXZlLCBhbmQgY29tcHV0ZSB0aGUgcHJlZml4LlxuICAgICAgICAgIC8vIE5vdGUgdGhhdCAtMCBpcyBub3QgbGVzcyB0aGFuIDAsIGJ1dCAxIC8gLTAgaXMhXG4gICAgICAgICAgdmFyIHZhbHVlTmVnYXRpdmUgPSAodmFsdWUgPCAwIHx8IDEgLyB2YWx1ZSA8IDApICYmICh2YWx1ZSAqPSAtMSwgdHJ1ZSk7XG5cbiAgICAgICAgICAvLyBQZXJmb3JtIHRoZSBpbml0aWFsIGZvcm1hdHRpbmcuXG4gICAgICAgICAgdmFsdWUgPSBmb3JtYXRUeXBlKHZhbHVlLCBwcmVjaXNpb24pO1xuXG4gICAgICAgICAgLy8gSWYgdGhlIG9yaWdpbmFsIHZhbHVlIHdhcyBuZWdhdGl2ZSwgaXQgbWF5IGJlIHJvdW5kZWQgdG8gemVybyBkdXJpbmdcbiAgICAgICAgICAvLyBmb3JtYXR0aW5nOyB0cmVhdCB0aGlzIGFzIChwb3NpdGl2ZSkgemVyby5cbiAgICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSkge1xuICAgICAgICAgICAgdmFyIGkgPSAtMSwgbiA9IHZhbHVlLmxlbmd0aCwgYztcbiAgICAgICAgICAgIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICAgIGlmIChjID0gdmFsdWUuY2hhckNvZGVBdChpKSwgKDQ4IDwgYyAmJiBjIDwgNTgpXG4gICAgICAgICAgICAgICAgICB8fCAodHlwZSA9PT0gXCJ4XCIgJiYgOTYgPCBjICYmIGMgPCAxMDMpXG4gICAgICAgICAgICAgICAgICB8fCAodHlwZSA9PT0gXCJYXCIgJiYgNjQgPCBjICYmIGMgPCA3MSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZU5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgICAgICAgIHZhbHVlUHJlZml4ID0gKHZhbHVlTmVnYXRpdmUgPyAoc2lnbiA9PT0gXCIoXCIgPyBzaWduIDogXCItXCIpIDogc2lnbiA9PT0gXCItXCIgfHwgc2lnbiA9PT0gXCIoXCIgPyBcIlwiIDogc2lnbikgKyB2YWx1ZVByZWZpeDtcbiAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IHZhbHVlU3VmZml4ICsgKHR5cGUgPT09IFwic1wiID8gcHJlZml4ZXNbOCArIHByZWZpeEV4cG9uZW50IC8gM10gOiBcIlwiKSArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAgIC8vIEJyZWFrIHRoZSBmb3JtYXR0ZWQgdmFsdWUgaW50byB0aGUgaW50ZWdlciDigJx2YWx1ZeKAnSBwYXJ0IHRoYXQgY2FuIGJlXG4gICAgICAgICAgLy8gZ3JvdXBlZCwgYW5kIGZyYWN0aW9uYWwgb3IgZXhwb25lbnRpYWwg4oCcc3VmZml44oCdIHBhcnQgdGhhdCBpcyBub3QuXG4gICAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgICB2YXIgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoLCBjO1xuICAgICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICAgICAgaWYgKGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpLCA0OCA+IGMgfHwgYyA+IDU3KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBmaWxsIGNoYXJhY3RlciBpcyBub3QgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYmVmb3JlIHBhZGRpbmcuXG4gICAgICAgIGlmIChjb21tYSAmJiAhemVybykgdmFsdWUgPSBncm91cCh2YWx1ZSwgSW5maW5pdHkpO1xuXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICAgIHZhciBsZW5ndGggPSB2YWx1ZVByZWZpeC5sZW5ndGggKyB2YWx1ZS5sZW5ndGggKyB2YWx1ZVN1ZmZpeC5sZW5ndGgsXG4gICAgICAgICAgICBwYWRkaW5nID0gbGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpIDogXCJcIjtcblxuICAgICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgICAgaWYgKGNvbW1hICYmIHplcm8pIHZhbHVlID0gZ3JvdXAocGFkZGluZyArIHZhbHVlLCBwYWRkaW5nLmxlbmd0aCA/IHdpZHRoIC0gdmFsdWVTdWZmaXgubGVuZ3RoIDogSW5maW5pdHkpLCBwYWRkaW5nID0gXCJcIjtcblxuICAgICAgICAvLyBSZWNvbnN0cnVjdCB0aGUgZmluYWwgb3V0cHV0IGJhc2VkIG9uIHRoZSBkZXNpcmVkIGFsaWdubWVudC5cbiAgICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICAgIGNhc2UgXCI8XCI6IHJldHVybiB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nO1xuICAgICAgICAgIGNhc2UgXCI9XCI6IHJldHVybiB2YWx1ZVByZWZpeCArIHBhZGRpbmcgKyB2YWx1ZSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgIGNhc2UgXCJeXCI6IHJldHVybiBwYWRkaW5nLnNsaWNlKDAsIGxlbmd0aCA9IHBhZGRpbmcubGVuZ3RoID4+IDEpICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZy5zbGljZShsZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWRkaW5nICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSkge1xuICAgICAgdmFyIGYgPSBmb3JtYXQoKHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpLCBzcGVjaWZpZXIudHlwZSA9IFwiZlwiLCBzcGVjaWZpZXIpKSxcbiAgICAgICAgICBlID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQodmFsdWUpIC8gMykpKSAqIDMsXG4gICAgICAgICAgayA9IE1hdGgucG93KDEwLCAtZSksXG4gICAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbOCArIGUgLyAzXTtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZihrICogdmFsdWUpICsgcHJlZml4O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICBmb3JtYXRQcmVmaXg6IGZvcm1hdFByZWZpeFxuICAgIH07XG4gIH07XG5cbiAgdmFyIGRlZmF1bHRMb2NhbGUgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiJFwiLCBcIlwiXVxuICB9KTtcblxuICB2YXIgY2FFUyA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMOKCrFwiXVxuICB9KTtcblxuICB2YXIgY3NDWiA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIlxceGEwXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTBLxI1cIl0sXG4gIH0pO1xuXG4gIHZhciBkZUNIID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiJ1wiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEwQ0hGXCJdXG4gIH0pO1xuXG4gIHZhciBkZURFID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBlbkNBID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGVuR0IgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiwqNcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGVzRVMgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbiAgfSk7XG5cbiAgdmFyIGZpRkkgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBmckNBID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCIkXCJdXG4gIH0pO1xuXG4gIHZhciBmckZSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG4gIH0pO1xuXG4gIHZhciBoZUlMID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCqlwiLCBcIlwiXVxuICB9KTtcblxuICB2YXIgaHVIVSA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIlxceGEwXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTBGdFwiXVxuICB9KTtcblxuICB2YXIgaXRJVCA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCLigqxcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIGphSlAgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwi5YaGXCJdXG4gIH0pO1xuXG4gIHZhciBrb0tSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCqVwiLCBcIlwiXVxuICB9KTtcblxuICB2YXIgbWtNSyA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNC00LXQvS5cIl1cbiAgfSk7XG5cbiAgdmFyIG5sTkwgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wi4oKsXFx4YTBcIiwgXCJcIl1cbiAgfSk7XG5cbiAgdmFyIHBsUEwgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiesWCXCJdXG4gIH0pO1xuXG4gIHZhciBwdEJSID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlIkXCIsIFwiXCJdXG4gIH0pO1xuXG4gIHZhciBydVJVID0gbG9jYWxlKHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNGA0YPQsS5cIl1cbiAgfSk7XG5cbiAgdmFyIHN2U0UgPSBsb2NhbGUoe1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIlNFS1wiXVxuICB9KTtcblxuICB2YXIgemhDTiA9IGxvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIuXCIsXG4gICAgdGhvdXNhbmRzOiBcIixcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCLCpVwiLCBcIlwiXVxuICB9KTtcblxuICBmdW5jdGlvbiBwcmVjaXNpb25GaXhlZChzdGVwKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIC1leHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHByZWNpc2lvblByZWZpeChzdGVwLCB2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyAtIGV4cG9uZW50KE1hdGguYWJzKHN0ZXApKSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHJlY2lzaW9uUm91bmQoc3RlcCwgbWF4KSB7XG4gICAgc3RlcCA9IE1hdGguYWJzKHN0ZXApLCBtYXggPSBNYXRoLmFicyhtYXgpIC0gc3RlcDtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgZXhwb25lbnQobWF4KSAtIGV4cG9uZW50KHN0ZXApKSArIDE7XG4gIH07XG5cbiAgdmFyIGZvcm1hdCA9IGRlZmF1bHRMb2NhbGUuZm9ybWF0O1xuICB2YXIgZm9ybWF0UHJlZml4ID0gZGVmYXVsdExvY2FsZS5mb3JtYXRQcmVmaXg7XG5cbiAgdmFyIHZlcnNpb24gPSBcIjAuNC4yXCI7XG5cbiAgZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXQ7XG4gIGV4cG9ydHMuZm9ybWF0UHJlZml4ID0gZm9ybWF0UHJlZml4O1xuICBleHBvcnRzLmxvY2FsZSA9IGxvY2FsZTtcbiAgZXhwb3J0cy5sb2NhbGVDYUVzID0gY2FFUztcbiAgZXhwb3J0cy5sb2NhbGVDc0N6ID0gY3NDWjtcbiAgZXhwb3J0cy5sb2NhbGVEZUNoID0gZGVDSDtcbiAgZXhwb3J0cy5sb2NhbGVEZURlID0gZGVERTtcbiAgZXhwb3J0cy5sb2NhbGVFbkNhID0gZW5DQTtcbiAgZXhwb3J0cy5sb2NhbGVFbkdiID0gZW5HQjtcbiAgZXhwb3J0cy5sb2NhbGVFblVzID0gZGVmYXVsdExvY2FsZTtcbiAgZXhwb3J0cy5sb2NhbGVFc0VzID0gZXNFUztcbiAgZXhwb3J0cy5sb2NhbGVGaUZpID0gZmlGSTtcbiAgZXhwb3J0cy5sb2NhbGVGckNhID0gZnJDQTtcbiAgZXhwb3J0cy5sb2NhbGVGckZyID0gZnJGUjtcbiAgZXhwb3J0cy5sb2NhbGVIZUlsID0gaGVJTDtcbiAgZXhwb3J0cy5sb2NhbGVIdUh1ID0gaHVIVTtcbiAgZXhwb3J0cy5sb2NhbGVJdEl0ID0gaXRJVDtcbiAgZXhwb3J0cy5sb2NhbGVKYUpwID0gamFKUDtcbiAgZXhwb3J0cy5sb2NhbGVLb0tyID0ga29LUjtcbiAgZXhwb3J0cy5sb2NhbGVNa01rID0gbWtNSztcbiAgZXhwb3J0cy5sb2NhbGVObE5sID0gbmxOTDtcbiAgZXhwb3J0cy5sb2NhbGVQbFBsID0gcGxQTDtcbiAgZXhwb3J0cy5sb2NhbGVQdEJyID0gcHRCUjtcbiAgZXhwb3J0cy5sb2NhbGVSdVJ1ID0gcnVSVTtcbiAgZXhwb3J0cy5sb2NhbGVTdlNlID0gc3ZTRTtcbiAgZXhwb3J0cy5sb2NhbGVaaENuID0gemhDTjtcbiAgZXhwb3J0cy5mb3JtYXRTcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXI7XG4gIGV4cG9ydHMucHJlY2lzaW9uRml4ZWQgPSBwcmVjaXNpb25GaXhlZDtcbiAgZXhwb3J0cy5wcmVjaXNpb25QcmVmaXggPSBwcmVjaXNpb25QcmVmaXg7XG4gIGV4cG9ydHMucHJlY2lzaW9uUm91bmQgPSBwcmVjaXNpb25Sb3VuZDtcblxufSkpOyIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnZDMtdGltZScpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnZDMtdGltZS1mb3JtYXQnLCBbJ2V4cG9ydHMnLCAnZDMtdGltZSddLCBmYWN0b3J5KSA6XG4gIGZhY3RvcnkoKGdsb2JhbC5kM190aW1lX2Zvcm1hdCA9IHt9KSxnbG9iYWwuZDNfdGltZSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLGQzVGltZSkgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gbG9jYWxEYXRlKGQpIHtcbiAgICBpZiAoMCA8PSBkLnkgJiYgZC55IDwgMTAwKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKC0xLCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKTtcbiAgICAgIGRhdGUuc2V0RnVsbFllYXIoZC55KTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoZC55LCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHV0Y0RhdGUoZCkge1xuICAgIGlmICgwIDw9IGQueSAmJiBkLnkgPCAxMDApIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZC55KTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoZC55LCBkLm0sIGQuZCwgZC5ILCBkLk0sIGQuUywgZC5MKSk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXdZZWFyKHkpIHtcbiAgICByZXR1cm4ge3k6IHksIG06IDAsIGQ6IDEsIEg6IDAsIE06IDAsIFM6IDAsIEw6IDB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxlJDEobG9jYWxlKSB7XG4gICAgdmFyIGxvY2FsZV9kYXRlVGltZSA9IGxvY2FsZS5kYXRlVGltZSxcbiAgICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgICAgbG9jYWxlX3RpbWUgPSBsb2NhbGUudGltZSxcbiAgICAgICAgbG9jYWxlX3BlcmlvZHMgPSBsb2NhbGUucGVyaW9kcyxcbiAgICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICAgIGxvY2FsZV9zaG9ydFdlZWtkYXlzID0gbG9jYWxlLnNob3J0RGF5cyxcbiAgICAgICAgbG9jYWxlX21vbnRocyA9IGxvY2FsZS5tb250aHMsXG4gICAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICAgIHZhciBwZXJpb2RSZSA9IGZvcm1hdFJlKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgcGVyaW9kTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgd2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3dlZWtkYXlzKSxcbiAgICAgICAgd2Vla2RheUxvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfd2Vla2RheXMpLFxuICAgICAgICBzaG9ydFdlZWtkYXlSZSA9IGZvcm1hdFJlKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgc2hvcnRXZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgbW9udGhSZSA9IGZvcm1hdFJlKGxvY2FsZV9tb250aHMpLFxuICAgICAgICBtb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfbW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aFJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0TW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfc2hvcnRNb250aHMpO1xuXG4gICAgdmFyIGZvcm1hdHMgPSB7XG4gICAgICBcImFcIjogZm9ybWF0U2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IGZvcm1hdFdlZWtkYXksXG4gICAgICBcImJcIjogZm9ybWF0U2hvcnRNb250aCxcbiAgICAgIFwiQlwiOiBmb3JtYXRNb250aCxcbiAgICAgIFwiY1wiOiBudWxsLFxuICAgICAgXCJkXCI6IGZvcm1hdERheU9mTW9udGgsXG4gICAgICBcImVcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICAgIFwiSFwiOiBmb3JtYXRIb3VyMjQsXG4gICAgICBcIklcIjogZm9ybWF0SG91cjEyLFxuICAgICAgXCJqXCI6IGZvcm1hdERheU9mWWVhcixcbiAgICAgIFwiTFwiOiBmb3JtYXRNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogZm9ybWF0TW9udGhOdW1iZXIsXG4gICAgICBcIk1cIjogZm9ybWF0TWludXRlcyxcbiAgICAgIFwicFwiOiBmb3JtYXRQZXJpb2QsXG4gICAgICBcIlNcIjogZm9ybWF0U2Vjb25kcyxcbiAgICAgIFwiVVwiOiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5LFxuICAgICAgXCJ3XCI6IGZvcm1hdFdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogZm9ybWF0V2Vla051bWJlck1vbmRheSxcbiAgICAgIFwieFwiOiBudWxsLFxuICAgICAgXCJYXCI6IG51bGwsXG4gICAgICBcInlcIjogZm9ybWF0WWVhcixcbiAgICAgIFwiWVwiOiBmb3JtYXRGdWxsWWVhcixcbiAgICAgIFwiWlwiOiBmb3JtYXRab25lLFxuICAgICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gICAgfTtcblxuICAgIHZhciB1dGNGb3JtYXRzID0ge1xuICAgICAgXCJhXCI6IGZvcm1hdFVUQ1Nob3J0V2Vla2RheSxcbiAgICAgIFwiQVwiOiBmb3JtYXRVVENXZWVrZGF5LFxuICAgICAgXCJiXCI6IGZvcm1hdFVUQ1Nob3J0TW9udGgsXG4gICAgICBcIkJcIjogZm9ybWF0VVRDTW9udGgsXG4gICAgICBcImNcIjogbnVsbCxcbiAgICAgIFwiZFwiOiBmb3JtYXRVVENEYXlPZk1vbnRoLFxuICAgICAgXCJlXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgICBcIkhcIjogZm9ybWF0VVRDSG91cjI0LFxuICAgICAgXCJJXCI6IGZvcm1hdFVUQ0hvdXIxMixcbiAgICAgIFwialwiOiBmb3JtYXRVVENEYXlPZlllYXIsXG4gICAgICBcIkxcIjogZm9ybWF0VVRDTWlsbGlzZWNvbmRzLFxuICAgICAgXCJtXCI6IGZvcm1hdFVUQ01vbnRoTnVtYmVyLFxuICAgICAgXCJNXCI6IGZvcm1hdFVUQ01pbnV0ZXMsXG4gICAgICBcInBcIjogZm9ybWF0VVRDUGVyaW9kLFxuICAgICAgXCJTXCI6IGZvcm1hdFVUQ1NlY29uZHMsXG4gICAgICBcIlVcIjogZm9ybWF0VVRDV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyLFxuICAgICAgXCJXXCI6IGZvcm1hdFVUQ1dlZWtOdW1iZXJNb25kYXksXG4gICAgICBcInhcIjogbnVsbCxcbiAgICAgIFwiWFwiOiBudWxsLFxuICAgICAgXCJ5XCI6IGZvcm1hdFVUQ1llYXIsXG4gICAgICBcIllcIjogZm9ybWF0VVRDRnVsbFllYXIsXG4gICAgICBcIlpcIjogZm9ybWF0VVRDWm9uZSxcbiAgICAgIFwiJVwiOiBmb3JtYXRMaXRlcmFsUGVyY2VudFxuICAgIH07XG5cbiAgICB2YXIgcGFyc2VzID0ge1xuICAgICAgXCJhXCI6IHBhcnNlU2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IHBhcnNlV2Vla2RheSxcbiAgICAgIFwiYlwiOiBwYXJzZVNob3J0TW9udGgsXG4gICAgICBcIkJcIjogcGFyc2VNb250aCxcbiAgICAgIFwiY1wiOiBwYXJzZUxvY2FsZURhdGVUaW1lLFxuICAgICAgXCJkXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICAgIFwiZVwiOiBwYXJzZURheU9mTW9udGgsXG4gICAgICBcIkhcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcIklcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcImpcIjogcGFyc2VEYXlPZlllYXIsXG4gICAgICBcIkxcIjogcGFyc2VNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogcGFyc2VNb250aE51bWJlcixcbiAgICAgIFwiTVwiOiBwYXJzZU1pbnV0ZXMsXG4gICAgICBcInBcIjogcGFyc2VQZXJpb2QsXG4gICAgICBcIlNcIjogcGFyc2VTZWNvbmRzLFxuICAgICAgXCJVXCI6IHBhcnNlV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBwYXJzZVdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogcGFyc2VXZWVrTnVtYmVyTW9uZGF5LFxuICAgICAgXCJ4XCI6IHBhcnNlTG9jYWxlRGF0ZSxcbiAgICAgIFwiWFwiOiBwYXJzZUxvY2FsZVRpbWUsXG4gICAgICBcInlcIjogcGFyc2VZZWFyLFxuICAgICAgXCJZXCI6IHBhcnNlRnVsbFllYXIsXG4gICAgICBcIlpcIjogcGFyc2Vab25lLFxuICAgICAgXCIlXCI6IHBhcnNlTGl0ZXJhbFBlcmNlbnRcbiAgICB9O1xuXG4gICAgLy8gVGhlc2UgcmVjdXJzaXZlIGRpcmVjdGl2ZSBkZWZpbml0aW9ucyBtdXN0IGJlIGRlZmVycmVkLlxuICAgIGZvcm1hdHMueCA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZSwgZm9ybWF0cyk7XG4gICAgZm9ybWF0cy5YID0gbmV3Rm9ybWF0KGxvY2FsZV90aW1lLCBmb3JtYXRzKTtcbiAgICBmb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCBmb3JtYXRzKTtcbiAgICB1dGNGb3JtYXRzLnggPSBuZXdGb3JtYXQobG9jYWxlX2RhdGUsIHV0Y0Zvcm1hdHMpO1xuICAgIHV0Y0Zvcm1hdHMuWCA9IG5ld0Zvcm1hdChsb2NhbGVfdGltZSwgdXRjRm9ybWF0cyk7XG4gICAgdXRjRm9ybWF0cy5jID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlVGltZSwgdXRjRm9ybWF0cyk7XG5cbiAgICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyLCBmb3JtYXRzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB2YXIgc3RyaW5nID0gW10sXG4gICAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIG4gPSBzcGVjaWZpZXIubGVuZ3RoLFxuICAgICAgICAgICAgYyxcbiAgICAgICAgICAgIHBhZCxcbiAgICAgICAgICAgIGZvcm1hdDtcblxuICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBpZiAoc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSkgPT09IDM3KSB7XG4gICAgICAgICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgICAgICAgaWYgKChwYWQgPSBwYWRzW2MgPSBzcGVjaWZpZXIuY2hhckF0KCsraSldKSAhPSBudWxsKSBjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpO1xuICAgICAgICAgICAgZWxzZSBwYWQgPSBjID09PSBcImVcIiA/IFwiIFwiIDogXCIwXCI7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID0gZm9ybWF0c1tjXSkgYyA9IGZvcm1hdChkYXRlLCBwYWQpO1xuICAgICAgICAgICAgc3RyaW5nLnB1c2goYyk7XG4gICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5nLnB1c2goc3BlY2lmaWVyLnNsaWNlKGosIGkpKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgdmFyIGQgPSBuZXdZZWFyKDE5MDApLFxuICAgICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nICs9IFwiXCIsIDApO1xuICAgICAgICBpZiAoaSAhPSBzdHJpbmcubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyBUaGUgYW0tcG0gZmxhZyBpcyAwIGZvciBBTSwgYW5kIDEgZm9yIFBNLlxuICAgICAgICBpZiAoXCJwXCIgaW4gZCkgZC5IID0gZC5IICUgMTIgKyBkLnAgKiAxMjtcblxuICAgICAgICAvLyBDb252ZXJ0IGRheS1vZi13ZWVrIGFuZCB3ZWVrLW9mLXllYXIgdG8gZGF5LW9mLXllYXIuXG4gICAgICAgIGlmIChcIldcIiBpbiBkIHx8IFwiVVwiIGluIGQpIHtcbiAgICAgICAgICBpZiAoIShcIndcIiBpbiBkKSkgZC53ID0gXCJXXCIgaW4gZCA/IDEgOiAwO1xuICAgICAgICAgIHZhciBkYXkgPSBcIlpcIiBpbiBkID8gdXRjRGF0ZShuZXdZZWFyKGQueSkpLmdldFVUQ0RheSgpIDogbmV3RGF0ZShuZXdZZWFyKGQueSkpLmdldERheSgpO1xuICAgICAgICAgIGQubSA9IDA7XG4gICAgICAgICAgZC5kID0gXCJXXCIgaW4gZCA/IChkLncgKyA2KSAlIDcgKyBkLlcgKiA3IC0gKGRheSArIDUpICUgNyA6IGQudyArIGQuVSAqIDcgLSAoZGF5ICsgNikgJSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYSB0aW1lIHpvbmUgaXMgc3BlY2lmaWVkLCBhbGwgZmllbGRzIGFyZSBpbnRlcnByZXRlZCBhcyBVVEMgYW5kIHRoZW5cbiAgICAgICAgLy8gb2Zmc2V0IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIHRpbWUgem9uZS5cbiAgICAgICAgaWYgKFwiWlwiIGluIGQpIHtcbiAgICAgICAgICBkLkggKz0gZC5aIC8gMTAwIHwgMDtcbiAgICAgICAgICBkLk0gKz0gZC5aICUgMTAwO1xuICAgICAgICAgIHJldHVybiB1dGNEYXRlKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhbGwgZmllbGRzIGFyZSBpbiBsb2NhbCB0aW1lLlxuICAgICAgICByZXR1cm4gbmV3RGF0ZShkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTcGVjaWZpZXIoZCwgc3BlY2lmaWVyLCBzdHJpbmcsIGopIHtcbiAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICBuID0gc3BlY2lmaWVyLmxlbmd0aCxcbiAgICAgICAgICBtID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICBjLFxuICAgICAgICAgIHBhcnNlO1xuXG4gICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgaWYgKGogPj0gbSkgcmV0dXJuIC0xO1xuICAgICAgICBjID0gc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgYyA9IHNwZWNpZmllci5jaGFyQXQoaSsrKTtcbiAgICAgICAgICBwYXJzZSA9IHBhcnNlc1tjIGluIHBhZHMgPyBzcGVjaWZpZXIuY2hhckF0KGkrKykgOiBjXTtcbiAgICAgICAgICBpZiAoIXBhcnNlIHx8ICgoaiA9IHBhcnNlKGQsIHN0cmluZywgaikpIDwgMCkpIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChjICE9IHN0cmluZy5jaGFyQ29kZUF0KGorKykpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQZXJpb2QoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHBlcmlvZFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQucCA9IHBlcmlvZExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydFdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHNob3J0V2Vla2RheVJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQudyA9IHNob3J0V2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSB3ZWVrZGF5UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC53ID0gd2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydE1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSBzaG9ydE1vbnRoUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC5tID0gc2hvcnRNb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHZhciBuID0gbW9udGhSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgICByZXR1cm4gbiA/IChkLm0gPSBtb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfZGF0ZVRpbWUsIHN0cmluZywgaSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlKGQsIHN0cmluZywgaSkge1xuICAgICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV9kYXRlLCBzdHJpbmcsIGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9jYWxlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfdGltZSwgc3RyaW5nLCBpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0RGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldERheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldE1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFBlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldEhvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0VVRDRGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldFVUQ0RheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRVVENNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldFVUQ01vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1BlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldFVUQ0hvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICAgICAgdmFyIGYgPSBuZXdGb3JtYXQoc3BlY2lmaWVyICs9IFwiXCIsIGZvcm1hdHMpO1xuICAgICAgICBmLnBhcnNlID0gbmV3UGFyc2Uoc3BlY2lmaWVyLCBsb2NhbERhdGUpO1xuICAgICAgICBmLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfSxcbiAgICAgIHV0Y0Zvcm1hdDogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICAgIHZhciBmID0gbmV3Rm9ybWF0KHNwZWNpZmllciArPSBcIlwiLCB1dGNGb3JtYXRzKTtcbiAgICAgICAgZi5wYXJzZSA9IG5ld1BhcnNlKHNwZWNpZmllciwgdXRjRGF0ZSk7XG4gICAgICAgIGYudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHNwZWNpZmllcjsgfTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgcGFkcyA9IHtcIi1cIjogXCJcIiwgXCJfXCI6IFwiIFwiLCBcIjBcIjogXCIwXCJ9O1xuICB2YXIgbnVtYmVyUmUgPSAvXlxccypcXGQrLztcbiAgdmFyIHBlcmNlbnRSZSA9IC9eJS87XG4gIHZhciByZXF1b3RlUmUgPSAvW1xcXFxcXF5cXCRcXCpcXCtcXD9cXHxcXFtcXF1cXChcXClcXC5cXHtcXH1dL2c7XG4gIGZ1bmN0aW9uIHBhZCh2YWx1ZSwgZmlsbCwgd2lkdGgpIHtcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgc3RyaW5nID0gKHNpZ24gPyAtdmFsdWUgOiB2YWx1ZSkgKyBcIlwiLFxuICAgICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHJldHVybiBzaWduICsgKGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSArIHN0cmluZyA6IHN0cmluZyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXF1b3RlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKHJlcXVvdGVSZSwgXCJcXFxcJCZcIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSZShuYW1lcykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgbmFtZXMubWFwKHJlcXVvdGUpLmpvaW4oXCJ8XCIpICsgXCIpXCIsIFwiaVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdExvb2t1cChuYW1lcykge1xuICAgIHZhciBtYXAgPSB7fSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBtYXBbbmFtZXNbaV0udG9Mb3dlckNhc2UoKV0gPSBpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtkYXlOdW1iZXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gKGQudyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtOdW1iZXJTdW5kYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5VID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlV2Vla051bWJlck1vbmRheShkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLlcgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VGdWxsWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyA0KSk7XG4gICAgcmV0dXJuIG4gPyAoZC55ID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC55ID0gK25bMF0gKyAoK25bMF0gPiA2OCA/IDE5MDAgOiAyMDAwKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2Vab25lKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gL14oWil8KFsrLV1cXGRcXGQpKD86XFw6PyhcXGRcXGQpKT8vLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyA2KSk7XG4gICAgcmV0dXJuIG4gPyAoZC5aID0gblsxXSA/IDAgOiAtKG5bMl0gKyAoblszXSB8fCBcIjAwXCIpKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VNb250aE51bWJlcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5tID0gblswXSAtIDEsIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRGF5T2ZNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5kID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRGF5T2ZZZWFyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDMpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSAwLCBkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIb3VyMjQoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuSCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1pbnV0ZXMoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuTSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVNlY29uZHMoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQuUyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1pbGxpc2Vjb25kcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAzKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5MID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTGl0ZXJhbFBlcmNlbnQoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBwZXJjZW50UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDEpKTtcbiAgICByZXR1cm4gbiA/IGkgKyBuWzBdLmxlbmd0aCA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0RGF5T2ZNb250aChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldERhdGUoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRIb3VyMjQoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRIb3VycygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEhvdXIxMihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEhvdXJzKCkgJSAxMiB8fCAxMiwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXREYXlPZlllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoMSArIGQzVGltZS5kYXkuY291bnQoZDNUaW1lLnllYXIoZCksIGQpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1pbGxpc2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbGxpc2Vjb25kcygpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1vbnRoTnVtYmVyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0TW9udGgoKSArIDEsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TWludXRlcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbnV0ZXMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRTZWNvbmRzKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0U2Vjb25kcygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFdlZWtOdW1iZXJTdW5kYXkoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZDNUaW1lLnN1bmRheS5jb3VudChkM1RpbWUueWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2Vla2RheU51bWJlcihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0RGF5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRXZWVrTnVtYmVyTW9uZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS5tb25kYXkuY291bnQoZDNUaW1lLnllYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEZ1bGxZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0RnVsbFllYXIoKSAlIDEwMDAwLCBwLCA0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFpvbmUoZCkge1xuICAgIHZhciB6ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHJldHVybiAoeiA+IDAgPyBcIi1cIiA6ICh6ICo9IC0xLCBcIitcIikpXG4gICAgICAgICsgcGFkKHogLyA2MCB8IDAsIFwiMFwiLCAyKVxuICAgICAgICArIHBhZCh6ICUgNjAsIFwiMFwiLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0RheU9mTW9udGgoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENEYXRlKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDSG91cjI0KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDSG91cnMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENIb3VyMTIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENIb3VycygpICUgMTIgfHwgMTIsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDRGF5T2ZZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKDEgKyBkM1RpbWUudXRjRGF5LmNvdW50KGQzVGltZS51dGNZZWFyKGQpLCBkKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNaWxsaXNlY29uZHMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaWxsaXNlY29uZHMoKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNb250aE51bWJlcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ01vbnRoKCkgKyAxLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01pbnV0ZXMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaW51dGVzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDU2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ1NlY29uZHMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS51dGNTdW5kYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXlOdW1iZXIoZCkge1xuICAgIHJldHVybiBkLmdldFVUQ0RheSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDV2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkM1RpbWUudXRjTW9uZGF5LmNvdW50KGQzVGltZS51dGNZZWFyKGQpLCBkKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDRnVsbFllYXIoKSAlIDEwMCwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENGdWxsWWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0Z1bGxZZWFyKCkgJSAxMDAwMCwgcCwgNCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENab25lKCkge1xuICAgIHJldHVybiBcIiswMDAwXCI7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRMaXRlcmFsUGVyY2VudCgpIHtcbiAgICByZXR1cm4gXCIlXCI7XG4gIH1cblxuICB2YXIgbG9jYWxlID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gICAgZGF0ZTogXCIlbS8lZC8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxuICB9KTtcblxuICB2YXIgY2FFUyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgZGUgJUIgZGUgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcImRpdW1lbmdlXCIsIFwiZGlsbHVuc1wiLCBcImRpbWFydHNcIiwgXCJkaW1lY3Jlc1wiLCBcImRpam91c1wiLCBcImRpdmVuZHJlc1wiLCBcImRpc3NhYnRlXCJdLFxuICAgIHNob3J0RGF5czogW1wiZGcuXCIsIFwiZGwuXCIsIFwiZHQuXCIsIFwiZGMuXCIsIFwiZGouXCIsIFwiZHYuXCIsIFwiZHMuXCJdLFxuICAgIG1vbnRoczogW1wiZ2VuZXJcIiwgXCJmZWJyZXJcIiwgXCJtYXLDp1wiLCBcImFicmlsXCIsIFwibWFpZ1wiLCBcImp1bnlcIiwgXCJqdWxpb2xcIiwgXCJhZ29zdFwiLCBcInNldGVtYnJlXCIsIFwib2N0dWJyZVwiLCBcIm5vdmVtYnJlXCIsIFwiZGVzZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImdlbi5cIiwgXCJmZWJyLlwiLCBcIm1hcsOnXCIsIFwiYWJyLlwiLCBcIm1haWdcIiwgXCJqdW55XCIsIFwianVsLlwiLCBcImFnLlwiLCBcInNldC5cIiwgXCJvY3QuXCIsIFwibm92LlwiLCBcImRlcy5cIl1cbiAgfSk7XG5cbiAgdmFyIGRlQ0ggPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsIGRlciAlZS4gJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgICBzaG9ydERheXM6IFtcIlNvXCIsIFwiTW9cIiwgXCJEaVwiLCBcIk1pXCIsIFwiRG9cIiwgXCJGclwiLCBcIlNhXCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk3DpHJ6XCIsIFwiQXByaWxcIiwgXCJNYWlcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlemVtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbiAgfSk7XG5cbiAgdmFyIGRlREUgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsIGRlciAlZS4gJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgICBzaG9ydERheXM6IFtcIlNvXCIsIFwiTW9cIiwgXCJEaVwiLCBcIk1pXCIsIFwiRG9cIiwgXCJGclwiLCBcIlNhXCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk3DpHJ6XCIsIFwiQXByaWxcIiwgXCJNYWlcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlemVtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbiAgfSk7XG5cbiAgdmFyIGVuQ0EgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJWEgJWIgJWUgJVggJVlcIixcbiAgICBkYXRlOiBcIiVZLSVtLSVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG4gIH0pO1xuXG4gIHZhciBlbkdCID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICVlICViICVYICVZXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxuICB9KTtcblxuICB2YXIgZXNFUyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgZGUgJUIgZGUgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcImRvbWluZ29cIiwgXCJsdW5lc1wiLCBcIm1hcnRlc1wiLCBcIm1pw6lyY29sZXNcIiwgXCJqdWV2ZXNcIiwgXCJ2aWVybmVzXCIsIFwic8OhYmFkb1wiXSxcbiAgICBzaG9ydERheXM6IFtcImRvbVwiLCBcImx1blwiLCBcIm1hclwiLCBcIm1pw6lcIiwgXCJqdWVcIiwgXCJ2aWVcIiwgXCJzw6FiXCJdLFxuICAgIG1vbnRoczogW1wiZW5lcm9cIiwgXCJmZWJyZXJvXCIsIFwibWFyem9cIiwgXCJhYnJpbFwiLCBcIm1heW9cIiwgXCJqdW5pb1wiLCBcImp1bGlvXCIsIFwiYWdvc3RvXCIsIFwic2VwdGllbWJyZVwiLCBcIm9jdHVicmVcIiwgXCJub3ZpZW1icmVcIiwgXCJkaWNpZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImVuZVwiLCBcImZlYlwiLCBcIm1hclwiLCBcImFiclwiLCBcIm1heVwiLCBcImp1blwiLCBcImp1bFwiLCBcImFnb1wiLCBcInNlcFwiLCBcIm9jdFwiLCBcIm5vdlwiLCBcImRpY1wiXVxuICB9KTtcblxuICB2YXIgZmlGSSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJS1kLiAlQnRhICVZIGtsbyAlWFwiLFxuICAgIGRhdGU6IFwiJS1kLiUtbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJhLm0uXCIsIFwicC5tLlwiXSxcbiAgICBkYXlzOiBbXCJzdW5udW50YWlcIiwgXCJtYWFuYW50YWlcIiwgXCJ0aWlzdGFpXCIsIFwia2Vza2l2aWlra29cIiwgXCJ0b3JzdGFpXCIsIFwicGVyamFudGFpXCIsIFwibGF1YW50YWlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTdVwiLCBcIk1hXCIsIFwiVGlcIiwgXCJLZVwiLCBcIlRvXCIsIFwiUGVcIiwgXCJMYVwiXSxcbiAgICBtb250aHM6IFtcInRhbW1pa3V1XCIsIFwiaGVsbWlrdXVcIiwgXCJtYWFsaXNrdXVcIiwgXCJodWh0aWt1dVwiLCBcInRvdWtva3V1XCIsIFwia2Vzw6RrdXVcIiwgXCJoZWluw6RrdXVcIiwgXCJlbG9rdXVcIiwgXCJzeXlza3V1XCIsIFwibG9rYWt1dVwiLCBcIm1hcnJhc2t1dVwiLCBcImpvdWx1a3V1XCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJUYW1taVwiLCBcIkhlbG1pXCIsIFwiTWFhbGlzXCIsIFwiSHVodGlcIiwgXCJUb3Vrb1wiLCBcIktlc8OkXCIsIFwiSGVpbsOkXCIsIFwiRWxvXCIsIFwiU3l5c1wiLCBcIkxva2FcIiwgXCJNYXJyYXNcIiwgXCJKb3VsdVwiXVxuICB9KTtcblxuICB2YXIgZnJDQSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlYSAlZSAlYiAlWSAlWFwiLFxuICAgIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiXCIsIFwiXCJdLFxuICAgIGRheXM6IFtcImRpbWFuY2hlXCIsIFwibHVuZGlcIiwgXCJtYXJkaVwiLCBcIm1lcmNyZWRpXCIsIFwiamV1ZGlcIiwgXCJ2ZW5kcmVkaVwiLCBcInNhbWVkaVwiXSxcbiAgICBzaG9ydERheXM6IFtcImRpbVwiLCBcImx1blwiLCBcIm1hclwiLCBcIm1lclwiLCBcImpldVwiLCBcInZlblwiLCBcInNhbVwiXSxcbiAgICBtb250aHM6IFtcImphbnZpZXJcIiwgXCJmw6l2cmllclwiLCBcIm1hcnNcIiwgXCJhdnJpbFwiLCBcIm1haVwiLCBcImp1aW5cIiwgXCJqdWlsbGV0XCIsIFwiYW/Du3RcIiwgXCJzZXB0ZW1icmVcIiwgXCJvY3RvYnJlXCIsIFwibm92ZW1icmVcIiwgXCJkw6ljZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImphblwiLCBcImbDqXZcIiwgXCJtYXJcIiwgXCJhdnJcIiwgXCJtYWlcIiwgXCJqdWlcIiwgXCJqdWxcIiwgXCJhb8O7XCIsIFwic2VwXCIsIFwib2N0XCIsIFwibm92XCIsIFwiZMOpY1wiXVxuICB9KTtcblxuICB2YXIgZnJGUiA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgbGUgJWUgJUIgJVksICVYXCIsXG4gICAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJkaW1hbmNoZVwiLCBcImx1bmRpXCIsIFwibWFyZGlcIiwgXCJtZXJjcmVkaVwiLCBcImpldWRpXCIsIFwidmVuZHJlZGlcIiwgXCJzYW1lZGlcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJkaW0uXCIsIFwibHVuLlwiLCBcIm1hci5cIiwgXCJtZXIuXCIsIFwiamV1LlwiLCBcInZlbi5cIiwgXCJzYW0uXCJdLFxuICAgIG1vbnRoczogW1wiamFudmllclwiLCBcImbDqXZyaWVyXCIsIFwibWFyc1wiLCBcImF2cmlsXCIsIFwibWFpXCIsIFwianVpblwiLCBcImp1aWxsZXRcIiwgXCJhb8O7dFwiLCBcInNlcHRlbWJyZVwiLCBcIm9jdG9icmVcIiwgXCJub3ZlbWJyZVwiLCBcImTDqWNlbWJyZVwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiamFudi5cIiwgXCJmw6l2ci5cIiwgXCJtYXJzXCIsIFwiYXZyLlwiLCBcIm1haVwiLCBcImp1aW5cIiwgXCJqdWlsLlwiLCBcImFvw7t0XCIsIFwic2VwdC5cIiwgXCJvY3QuXCIsIFwibm92LlwiLCBcImTDqWMuXCJdXG4gIH0pO1xuXG4gIHZhciBoZUlMID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlZSDXkSVCICVZICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcIteo15DXqdeV159cIiwgXCLXqdeg15lcIiwgXCLXqdec15nXqdeZXCIsIFwi16jXkdeZ16LXmVwiLCBcIteX157Xmdep15lcIiwgXCLXqdeZ16nXmVwiLCBcItep15HXqlwiXSxcbiAgICBzaG9ydERheXM6IFtcIteQ17NcIiwgXCLXkdezXCIsIFwi15LXs1wiLCBcIteT17NcIiwgXCLXlNezXCIsIFwi15XXs1wiLCBcItep17NcIl0sXG4gICAgbW9udGhzOiBbXCLXmdeg15XXkNeoXCIsIFwi16TXkdeo15XXkNeoXCIsIFwi157XqNelXCIsIFwi15DXpNeo15nXnFwiLCBcItee15DXmVwiLCBcIteZ15XXoNeZXCIsIFwi15nXldec15lcIiwgXCLXkNeV15LXldeh15hcIiwgXCLXodek15jXnteR16hcIiwgXCLXkNeV16fXmNeV15HXqFwiLCBcIteg15XXkdee15HXqFwiLCBcIteT16bXnteR16hcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIteZ16DXldezXCIsIFwi16TXkdeo17NcIiwgXCLXnteo16VcIiwgXCLXkNek16jXs1wiLCBcItee15DXmVwiLCBcIteZ15XXoNeZXCIsIFwi15nXldec15lcIiwgXCLXkNeV15LXs1wiLCBcIteh16TXmNezXCIsIFwi15DXlden17NcIiwgXCLXoNeV15HXs1wiLCBcIteT16bXntezXCJdXG4gIH0pO1xuXG4gIHZhciBodUhVID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVZLiAlQiAlLWUuLCAlQSAlWFwiLFxuICAgIGRhdGU6IFwiJVkuICVtLiAlZC5cIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiZGUuXCIsIFwiZHUuXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJ2YXPDoXJuYXBcIiwgXCJow6l0ZsWRXCIsIFwia2VkZFwiLCBcInN6ZXJkYVwiLCBcImNzw7x0w7ZydMO2a1wiLCBcInDDqW50ZWtcIiwgXCJzem9tYmF0XCJdLFxuICAgIHNob3J0RGF5czogW1wiVlwiLCBcIkhcIiwgXCJLXCIsIFwiU3plXCIsIFwiQ3NcIiwgXCJQXCIsIFwiU3pvXCJdLFxuICAgIG1vbnRoczogW1wiamFudcOhclwiLCBcImZlYnJ1w6FyXCIsIFwibcOhcmNpdXNcIiwgXCLDoXByaWxpc1wiLCBcIm3DoWp1c1wiLCBcImrDum5pdXNcIiwgXCJqw7psaXVzXCIsIFwiYXVndXN6dHVzXCIsIFwic3plcHRlbWJlclwiLCBcIm9rdMOzYmVyXCIsIFwibm92ZW1iZXJcIiwgXCJkZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiamFuLlwiLCBcImZlYi5cIiwgXCJtw6FyLlwiLCBcIsOhcHIuXCIsIFwibcOhai5cIiwgXCJqw7puLlwiLCBcImrDumwuXCIsIFwiYXVnLlwiLCBcInN6ZXB0LlwiLCBcIm9rdC5cIiwgXCJub3YuXCIsIFwiZGVjLlwiXVxuICB9KTtcblxuICB2YXIgaXRJVCA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSAlZSAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcIkRvbWVuaWNhXCIsIFwiTHVuZWTDrFwiLCBcIk1hcnRlZMOsXCIsIFwiTWVyY29sZWTDrFwiLCBcIkdpb3ZlZMOsXCIsIFwiVmVuZXJkw6xcIiwgXCJTYWJhdG9cIl0sXG4gICAgc2hvcnREYXlzOiBbXCJEb21cIiwgXCJMdW5cIiwgXCJNYXJcIiwgXCJNZXJcIiwgXCJHaW9cIiwgXCJWZW5cIiwgXCJTYWJcIl0sXG4gICAgbW9udGhzOiBbXCJHZW5uYWlvXCIsIFwiRmViYnJhaW9cIiwgXCJNYXJ6b1wiLCBcIkFwcmlsZVwiLCBcIk1hZ2dpb1wiLCBcIkdpdWdub1wiLCBcIkx1Z2xpb1wiLCBcIkFnb3N0b1wiLCBcIlNldHRlbWJyZVwiLCBcIk90dG9icmVcIiwgXCJOb3ZlbWJyZVwiLCBcIkRpY2VtYnJlXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJHZW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYWdcIiwgXCJHaXVcIiwgXCJMdWdcIiwgXCJBZ29cIiwgXCJTZXRcIiwgXCJPdHRcIiwgXCJOb3ZcIiwgXCJEaWNcIl1cbiAgfSk7XG5cbiAgdmFyIGphSlAgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJVkgJWIgJWUgJWEgJVhcIixcbiAgICBkYXRlOiBcIiVZLyVtLyVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wi5pel5puc5pelXCIsIFwi5pyI5puc5pelXCIsIFwi54Gr5puc5pelXCIsIFwi5rC05puc5pelXCIsIFwi5pyo5puc5pelXCIsIFwi6YeR5puc5pelXCIsIFwi5Zyf5puc5pelXCJdLFxuICAgIHNob3J0RGF5czogW1wi5pelXCIsIFwi5pyIXCIsIFwi54GrXCIsIFwi5rC0XCIsIFwi5pyoXCIsIFwi6YeRXCIsIFwi5ZyfXCJdLFxuICAgIG1vbnRoczogW1wi552m5pyIXCIsIFwi5aaC5pyIXCIsIFwi5byl55SfXCIsIFwi5Y2v5pyIXCIsIFwi55qQ5pyIXCIsIFwi5rC054Sh5pyIXCIsIFwi5paH5pyIXCIsIFwi6JGJ5pyIXCIsIFwi6ZW35pyIXCIsIFwi56We54Sh5pyIXCIsIFwi6Zyc5pyIXCIsIFwi5bir6LWwXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCIx5pyIXCIsIFwiMuaciFwiLCBcIjPmnIhcIiwgXCI05pyIXCIsIFwiNeaciFwiLCBcIjbmnIhcIiwgXCI35pyIXCIsIFwiOOaciFwiLCBcIjnmnIhcIiwgXCIxMOaciFwiLCBcIjEx5pyIXCIsIFwiMTLmnIhcIl1cbiAgfSk7XG5cbiAgdmFyIGtvS1IgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJVkvJW0vJWQgJWEgJVhcIixcbiAgICBkYXRlOiBcIiVZLyVtLyVkXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIuyYpOyghFwiLCBcIuyYpO2bhFwiXSxcbiAgICBkYXlzOiBbXCLsnbzsmpTsnbxcIiwgXCLsm5TsmpTsnbxcIiwgXCLtmZTsmpTsnbxcIiwgXCLsiJjsmpTsnbxcIiwgXCLrqqnsmpTsnbxcIiwgXCLquIjsmpTsnbxcIiwgXCLthqDsmpTsnbxcIl0sXG4gICAgc2hvcnREYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIl0sXG4gICAgbW9udGhzOiBbXCIx7JuUXCIsIFwiMuyblFwiLCBcIjPsm5RcIiwgXCI07JuUXCIsIFwiNeyblFwiLCBcIjbsm5RcIiwgXCI37JuUXCIsIFwiOOyblFwiLCBcIjnsm5RcIiwgXCIxMOyblFwiLCBcIjEx7JuUXCIsIFwiMTLsm5RcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIjHsm5RcIiwgXCIy7JuUXCIsIFwiM+yblFwiLCBcIjTsm5RcIiwgXCI17JuUXCIsIFwiNuyblFwiLCBcIjfsm5RcIiwgXCI47JuUXCIsIFwiOeyblFwiLCBcIjEw7JuUXCIsIFwiMTHsm5RcIiwgXCIxMuyblFwiXVxuICB9KTtcblxuICB2YXIgbWtNSyA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgJUIgJVkg0LMuICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcItC90LXQtNC10LvQsFwiLCBcItC/0L7QvdC10LTQtdC70L3QuNC6XCIsIFwi0LLRgtC+0YDQvdC40LpcIiwgXCLRgdGA0LXQtNCwXCIsIFwi0YfQtdGC0LLRgNGC0L7QulwiLCBcItC/0LXRgtC+0LpcIiwgXCLRgdCw0LHQvtGC0LBcIl0sXG4gICAgc2hvcnREYXlzOiBbXCLQvdC10LRcIiwgXCLQv9C+0L1cIiwgXCLQstGC0L5cIiwgXCLRgdGA0LVcIiwgXCLRh9C10YJcIiwgXCLQv9C10YJcIiwgXCLRgdCw0LFcIl0sXG4gICAgbW9udGhzOiBbXCLRmNCw0L3Rg9Cw0YDQuFwiLCBcItGE0LXQstGA0YPQsNGA0LhcIiwgXCLQvNCw0YDRglwiLCBcItCw0L/RgNC40LtcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L3QuFwiLCBcItGY0YPQu9C4XCIsIFwi0LDQstCz0YPRgdGCXCIsIFwi0YHQtdC/0YLQtdC80LLRgNC4XCIsIFwi0L7QutGC0L7QvNCy0YDQuFwiLCBcItC90L7QtdC80LLRgNC4XCIsIFwi0LTQtdC60LXQvNCy0YDQuFwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wi0ZjQsNC9XCIsIFwi0YTQtdCyXCIsIFwi0LzQsNGAXCIsIFwi0LDQv9GAXCIsIFwi0LzQsNGYXCIsIFwi0ZjRg9C9XCIsIFwi0ZjRg9C7XCIsIFwi0LDQstCzXCIsIFwi0YHQtdC/XCIsIFwi0L7QutGCXCIsIFwi0L3QvtC1XCIsIFwi0LTQtdC6XCJdXG4gIH0pO1xuXG4gIHZhciBubE5MID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICVlICVCICVZICVUXCIsXG4gICAgZGF0ZTogXCIlZC0lbS0lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgICBkYXlzOiBbXCJ6b25kYWdcIiwgXCJtYWFuZGFnXCIsIFwiZGluc2RhZ1wiLCBcIndvZW5zZGFnXCIsIFwiZG9uZGVyZGFnXCIsIFwidnJpamRhZ1wiLCBcInphdGVyZGFnXCJdLFxuICAgIHNob3J0RGF5czogW1wiem9cIiwgXCJtYVwiLCBcImRpXCIsIFwid29cIiwgXCJkb1wiLCBcInZyXCIsIFwiemFcIl0sXG4gICAgbW9udGhzOiBbXCJqYW51YXJpXCIsIFwiZmVicnVhcmlcIiwgXCJtYWFydFwiLCBcImFwcmlsXCIsIFwibWVpXCIsIFwianVuaVwiLCBcImp1bGlcIiwgXCJhdWd1c3R1c1wiLCBcInNlcHRlbWJlclwiLCBcIm9rdG9iZXJcIiwgXCJub3ZlbWJlclwiLCBcImRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJqYW5cIiwgXCJmZWJcIiwgXCJtcnRcIiwgXCJhcHJcIiwgXCJtZWlcIiwgXCJqdW5cIiwgXCJqdWxcIiwgXCJhdWdcIiwgXCJzZXBcIiwgXCJva3RcIiwgXCJub3ZcIiwgXCJkZWNcIl1cbiAgfSk7XG5cbiAgdmFyIHBsUEwgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlICVCICVZLCAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSwgLy8gdW51c2VkXG4gICAgZGF5czogW1wiTmllZHppZWxhXCIsIFwiUG9uaWVkemlhxYJla1wiLCBcIld0b3Jla1wiLCBcIsWacm9kYVwiLCBcIkN6d2FydGVrXCIsIFwiUGnEhXRla1wiLCBcIlNvYm90YVwiXSxcbiAgICBzaG9ydERheXM6IFtcIk5pZWR6LlwiLCBcIlBvbi5cIiwgXCJXdC5cIiwgXCLFmnIuXCIsIFwiQ3p3LlwiLCBcIlB0LlwiLCBcIlNvYi5cIl0sXG4gICAgbW9udGhzOiBbXCJTdHljemXFhFwiLCBcIkx1dHlcIiwgXCJNYXJ6ZWNcIiwgXCJLd2llY2llxYRcIiwgXCJNYWpcIiwgXCJDemVyd2llY1wiLCBcIkxpcGllY1wiLCBcIlNpZXJwaWXFhFwiLCBcIldyemVzaWXFhFwiLCBcIlBhxbpkemllcm5pa1wiLCBcIkxpc3RvcGFkXCIsIFwiR3J1ZHppZcWEXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJTdHljei5cIiwgXCJMdXR5XCIsIFwiTWFyei5cIiwgXCJLd2llLlwiLCBcIk1halwiLCBcIkN6ZXJ3LlwiLCBcIkxpcGMuXCIsIFwiU2llcnAuXCIsIFwiV3J6LlwiLCBcIlBhxbpkei5cIiwgXCJMaXN0b3AuXCIsIFwiR3J1ZHouXCJdLyogSW4gUG9saXNoIGxhbmd1YWdlIGFiYnJhdmlhdGVkIG1vbnRocyBhcmUgbm90IGNvbW1vbmx5IHVzZWQgc28gdGhlcmUgaXMgYSBkaXNwdXRlIGFib3V0IHRoZSBwcm9wZXIgYWJicmF2aWF0aW9ucy4gKi9cbiAgfSk7XG5cbiAgdmFyIHB0QlIgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlIGRlICVCIGRlICVZLiAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJEb21pbmdvXCIsIFwiU2VndW5kYVwiLCBcIlRlcsOnYVwiLCBcIlF1YXJ0YVwiLCBcIlF1aW50YVwiLCBcIlNleHRhXCIsIFwiU8OhYmFkb1wiXSxcbiAgICBzaG9ydERheXM6IFtcIkRvbVwiLCBcIlNlZ1wiLCBcIlRlclwiLCBcIlF1YVwiLCBcIlF1aVwiLCBcIlNleFwiLCBcIlPDoWJcIl0sXG4gICAgbW9udGhzOiBbXCJKYW5laXJvXCIsIFwiRmV2ZXJlaXJvXCIsIFwiTWFyw6dvXCIsIFwiQWJyaWxcIiwgXCJNYWlvXCIsIFwiSnVuaG9cIiwgXCJKdWxob1wiLCBcIkFnb3N0b1wiLCBcIlNldGVtYnJvXCIsIFwiT3V0dWJyb1wiLCBcIk5vdmVtYnJvXCIsIFwiRGV6ZW1icm9cIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZldlwiLCBcIk1hclwiLCBcIkFiclwiLCBcIk1haVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkFnb1wiLCBcIlNldFwiLCBcIk91dFwiLCBcIk5vdlwiLCBcIkRlelwiXVxuICB9KTtcblxuICB2YXIgcnVSVSA9IGxvY2FsZSQxKHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUgJUIgJVkg0LMuICVYXCIsXG4gICAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICAgIGRheXM6IFtcItCy0L7RgdC60YDQtdGB0LXQvdGM0LVcIiwgXCLQv9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsIFwi0LLRgtC+0YDQvdC40LpcIiwgXCLRgdGA0LXQtNCwXCIsIFwi0YfQtdGC0LLQtdGA0LNcIiwgXCLQv9GP0YLQvdC40YbQsFwiLCBcItGB0YPQsdCx0L7RgtCwXCJdLFxuICAgIHNob3J0RGF5czogW1wi0LLRgVwiLCBcItC/0L1cIiwgXCLQstGCXCIsIFwi0YHRgFwiLCBcItGH0YJcIiwgXCLQv9GCXCIsIFwi0YHQsVwiXSxcbiAgICBtb250aHM6IFtcItGP0L3QstCw0YDRj1wiLCBcItGE0LXQstGA0LDQu9GPXCIsIFwi0LzQsNGA0YLQsFwiLCBcItCw0L/RgNC10LvRj1wiLCBcItC80LDRj1wiLCBcItC40Y7QvdGPXCIsIFwi0LjRjtC70Y9cIiwgXCLQsNCy0LPRg9GB0YLQsFwiLCBcItGB0LXQvdGC0Y/QsdGA0Y9cIiwgXCLQvtC60YLRj9Cx0YDRj1wiLCBcItC90L7Rj9Cx0YDRj1wiLCBcItC00LXQutCw0LHRgNGPXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCLRj9C90LJcIiwgXCLRhNC10LJcIiwgXCLQvNCw0YBcIiwgXCLQsNC/0YBcIiwgXCLQvNCw0LlcIiwgXCLQuNGO0L1cIiwgXCLQuNGO0LtcIiwgXCLQsNCy0LNcIiwgXCLRgdC10L1cIiwgXCLQvtC60YJcIiwgXCLQvdC+0Y9cIiwgXCLQtNC10LpcIl1cbiAgfSk7XG5cbiAgdmFyIHN2U0UgPSBsb2NhbGUkMSh7XG4gICAgZGF0ZVRpbWU6IFwiJUEgZGVuICVkICVCICVZICVYXCIsXG4gICAgZGF0ZTogXCIlWS0lbS0lZFwiLFxuICAgIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgICBwZXJpb2RzOiBbXCJmbVwiLCBcImVtXCJdLFxuICAgIGRheXM6IFtcIlPDtm5kYWdcIiwgXCJNw6VuZGFnXCIsIFwiVGlzZGFnXCIsIFwiT25zZGFnXCIsIFwiVG9yc2RhZ1wiLCBcIkZyZWRhZ1wiLCBcIkzDtnJkYWdcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJTw7ZuXCIsIFwiTcOlblwiLCBcIlRpc1wiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDtnJcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJpXCIsIFwiRmVicnVhcmlcIiwgXCJNYXJzXCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdGlcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWFqXCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2t0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG4gIH0pO1xuXG4gIHZhciB6aENOID0gbG9jYWxlJDEoe1xuICAgIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gICAgZGF0ZTogXCIlWS8lLW0vJS1kXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIuS4iuWNiFwiLCBcIuS4i+WNiFwiXSxcbiAgICBkYXlzOiBbXCLmmJ/mnJ/ml6VcIiwgXCLmmJ/mnJ/kuIBcIiwgXCLmmJ/mnJ/kuoxcIiwgXCLmmJ/mnJ/kuIlcIiwgXCLmmJ/mnJ/lm5tcIiwgXCLmmJ/mnJ/kupRcIiwgXCLmmJ/mnJ/lha1cIl0sXG4gICAgc2hvcnREYXlzOiBbXCLmmJ/mnJ/ml6VcIiwgXCLmmJ/mnJ/kuIBcIiwgXCLmmJ/mnJ/kuoxcIiwgXCLmmJ/mnJ/kuIlcIiwgXCLmmJ/mnJ/lm5tcIiwgXCLmmJ/mnJ/kupRcIiwgXCLmmJ/mnJ/lha1cIl0sXG4gICAgbW9udGhzOiBbXCLkuIDmnIhcIiwgXCLkuozmnIhcIiwgXCLkuInmnIhcIiwgXCLlm5vmnIhcIiwgXCLkupTmnIhcIiwgXCLlha3mnIhcIiwgXCLkuIPmnIhcIiwgXCLlhavmnIhcIiwgXCLkuZ3mnIhcIiwgXCLljYHmnIhcIiwgXCLljYHkuIDmnIhcIiwgXCLljYHkuozmnIhcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXVxuICB9KTtcblxuICB2YXIgaXNvU3BlY2lmaWVyID0gXCIlWS0lbS0lZFQlSDolTTolUy4lTFpcIjtcblxuICBmdW5jdGlvbiBmb3JtYXRJc29OYXRpdmUoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gIH1cblxuICBmb3JtYXRJc29OYXRpdmUucGFyc2UgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZyk7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gbnVsbCA6IGRhdGU7XG4gIH07XG5cbiAgZm9ybWF0SXNvTmF0aXZlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzb1NwZWNpZmllcjtcbiAgfTtcblxuICB2YXIgZm9ybWF0SXNvID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgJiYgK25ldyBEYXRlKFwiMjAwMC0wMS0wMVQwMDowMDowMC4wMDBaXCIpXG4gICAgICA/IGZvcm1hdElzb05hdGl2ZVxuICAgICAgOiBsb2NhbGUudXRjRm9ybWF0KGlzb1NwZWNpZmllcik7XG5cbiAgdmFyIGZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gIHZhciB1dGNGb3JtYXQgPSBsb2NhbGUudXRjRm9ybWF0O1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjIuMVwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0O1xuICBleHBvcnRzLnV0Y0Zvcm1hdCA9IHV0Y0Zvcm1hdDtcbiAgZXhwb3J0cy5sb2NhbGUgPSBsb2NhbGUkMTtcbiAgZXhwb3J0cy5sb2NhbGVDYUVzID0gY2FFUztcbiAgZXhwb3J0cy5sb2NhbGVEZUNoID0gZGVDSDtcbiAgZXhwb3J0cy5sb2NhbGVEZURlID0gZGVERTtcbiAgZXhwb3J0cy5sb2NhbGVFbkNhID0gZW5DQTtcbiAgZXhwb3J0cy5sb2NhbGVFbkdiID0gZW5HQjtcbiAgZXhwb3J0cy5sb2NhbGVFblVzID0gbG9jYWxlO1xuICBleHBvcnRzLmxvY2FsZUVzRXMgPSBlc0VTO1xuICBleHBvcnRzLmxvY2FsZUZpRmkgPSBmaUZJO1xuICBleHBvcnRzLmxvY2FsZUZyQ2EgPSBmckNBO1xuICBleHBvcnRzLmxvY2FsZUZyRnIgPSBmckZSO1xuICBleHBvcnRzLmxvY2FsZUhlSWwgPSBoZUlMO1xuICBleHBvcnRzLmxvY2FsZUh1SHUgPSBodUhVO1xuICBleHBvcnRzLmxvY2FsZUl0SXQgPSBpdElUO1xuICBleHBvcnRzLmxvY2FsZUphSnAgPSBqYUpQO1xuICBleHBvcnRzLmxvY2FsZUtvS3IgPSBrb0tSO1xuICBleHBvcnRzLmxvY2FsZU1rTWsgPSBta01LO1xuICBleHBvcnRzLmxvY2FsZU5sTmwgPSBubE5MO1xuICBleHBvcnRzLmxvY2FsZVBsUGwgPSBwbFBMO1xuICBleHBvcnRzLmxvY2FsZVB0QnIgPSBwdEJSO1xuICBleHBvcnRzLmxvY2FsZVJ1UnUgPSBydVJVO1xuICBleHBvcnRzLmxvY2FsZVN2U2UgPSBzdlNFO1xuICBleHBvcnRzLmxvY2FsZVpoQ24gPSB6aENOO1xuICBleHBvcnRzLmlzb0Zvcm1hdCA9IGZvcm1hdElzbztcblxufSkpOyIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ2QzLXRpbWUnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZDNfdGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcbiAgdmFyIHQxID0gbmV3IERhdGU7XG4gIGZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQsIGZpZWxkKSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdDAuc2V0VGltZSgrc3RhcnQpLCB0MS5zZXRUaW1lKCtlbmQpO1xuICAgICAgICBmbG9vcmkodDApLCBmbG9vcmkodDEpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICAgIH07XG5cbiAgICAgIGludGVydmFsLmV2ZXJ5ID0gZnVuY3Rpb24oc3RlcCkge1xuICAgICAgICBzdGVwID0gTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgICAgcmV0dXJuICFpc0Zpbml0ZShzdGVwKSB8fCAhKHN0ZXAgPiAwKSA/IG51bGxcbiAgICAgICAgICAgIDogIShzdGVwID4gMSkgPyBpbnRlcnZhbFxuICAgICAgICAgICAgOiBpbnRlcnZhbC5maWx0ZXIoZmllbGRcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGZpZWxkKGQpICUgc3RlcCA9PT0gMDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24oZCkgeyByZXR1cm4gaW50ZXJ2YWwuY291bnQoMCwgZCkgJSBzdGVwID09PSAwOyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9O1xuXG4gIHZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIG5vb3BcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xuICB9KTtcblxuICAvLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG4gIG1pbGxpc2Vjb25kLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLmZsb29yKGspO1xuICAgIGlmICghaXNGaW5pdGUoaykgfHwgIShrID4gMCkpIHJldHVybiBudWxsO1xuICAgIGlmICghKGsgPiAxKSkgcmV0dXJuIG1pbGxpc2Vjb25kO1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gaykgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBrO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDg2NGU1O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gd2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN1bmRheSA9IHdlZWtkYXkoMCk7XG4gIHZhciBtb25kYXkgPSB3ZWVrZGF5KDEpO1xuICB2YXIgdHVlc2RheSA9IHdlZWtkYXkoMik7XG4gIHZhciB3ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xuICB2YXIgdGh1cnNkYXkgPSB3ZWVrZGF5KDQpO1xuICB2YXIgZnJpZGF5ID0gd2Vla2RheSg1KTtcbiAgdmFyIHNhdHVyZGF5ID0gd2Vla2RheSg2KTtcblxuICB2YXIgbW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldERhdGUoMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9KTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNTZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaWxsaXNlY29uZHMoMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMWUzO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgdXRjTWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNIb3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNEYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA4NjRlNTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSAtIDE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gKGRhdGUuZ2V0VVRDRGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbiAgdmFyIHV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG4gIHZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbiAgdmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG4gIHZhciB1dGNUaHVyc2RheSA9IHV0Y1dlZWtkYXkoNCk7XG4gIHZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuICB2YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNZZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xuICB2YXIgc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcbiAgdmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG4gIHZhciBob3VycyA9IGhvdXIucmFuZ2U7XG4gIHZhciBkYXlzID0gZGF5LnJhbmdlO1xuICB2YXIgc3VuZGF5cyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG4gIHZhciB0dWVzZGF5cyA9IHR1ZXNkYXkucmFuZ2U7XG4gIHZhciB3ZWRuZXNkYXlzID0gd2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG4gIHZhciBmcmlkYXlzID0gZnJpZGF5LnJhbmdlO1xuICB2YXIgc2F0dXJkYXlzID0gc2F0dXJkYXkucmFuZ2U7XG4gIHZhciB3ZWVrcyA9IHN1bmRheS5yYW5nZTtcbiAgdmFyIG1vbnRocyA9IG1vbnRoLnJhbmdlO1xuICB2YXIgeWVhcnMgPSB5ZWFyLnJhbmdlO1xuXG4gIHZhciB1dGNNaWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICB2YXIgdXRjTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICB2YXIgdXRjU2Vjb25kcyA9IHV0Y1NlY29uZC5yYW5nZTtcbiAgdmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG4gIHZhciB1dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG4gIHZhciB1dGNEYXlzID0gdXRjRGF5LnJhbmdlO1xuICB2YXIgdXRjU3VuZGF5cyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbmRheXMgPSB1dGNNb25kYXkucmFuZ2U7XG4gIHZhciB1dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5LnJhbmdlO1xuICB2YXIgdXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXkucmFuZ2U7XG4gIHZhciB1dGNGcmlkYXlzID0gdXRjRnJpZGF5LnJhbmdlO1xuICB2YXIgdXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXkucmFuZ2U7XG4gIHZhciB1dGNXZWVrcyA9IHV0Y1N1bmRheS5yYW5nZTtcbiAgdmFyIHV0Y01vbnRocyA9IHV0Y01vbnRoLnJhbmdlO1xuICB2YXIgdXRjWWVhcnMgPSB1dGNZZWFyLnJhbmdlO1xuXG4gIHZhciB2ZXJzaW9uID0gXCIwLjEuMVwiO1xuXG4gIGV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG4gIGV4cG9ydHMubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnNlY29uZHMgPSBzZWNvbmRzO1xuICBleHBvcnRzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICBleHBvcnRzLmhvdXJzID0gaG91cnM7XG4gIGV4cG9ydHMuZGF5cyA9IGRheXM7XG4gIGV4cG9ydHMuc3VuZGF5cyA9IHN1bmRheXM7XG4gIGV4cG9ydHMubW9uZGF5cyA9IG1vbmRheXM7XG4gIGV4cG9ydHMudHVlc2RheXMgPSB0dWVzZGF5cztcbiAgZXhwb3J0cy53ZWRuZXNkYXlzID0gd2VkbmVzZGF5cztcbiAgZXhwb3J0cy50aHVyc2RheXMgPSB0aHVyc2RheXM7XG4gIGV4cG9ydHMuZnJpZGF5cyA9IGZyaWRheXM7XG4gIGV4cG9ydHMuc2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuICBleHBvcnRzLndlZWtzID0gd2Vla3M7XG4gIGV4cG9ydHMubW9udGhzID0gbW9udGhzO1xuICBleHBvcnRzLnllYXJzID0geWVhcnM7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmQgPSB1dGNNaWxsaXNlY29uZDtcbiAgZXhwb3J0cy51dGNNaWxsaXNlY29uZHMgPSB1dGNNaWxsaXNlY29uZHM7XG4gIGV4cG9ydHMudXRjU2Vjb25kcyA9IHV0Y1NlY29uZHM7XG4gIGV4cG9ydHMudXRjTWludXRlcyA9IHV0Y01pbnV0ZXM7XG4gIGV4cG9ydHMudXRjSG91cnMgPSB1dGNIb3VycztcbiAgZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbiAgZXhwb3J0cy51dGNTdW5kYXlzID0gdXRjU3VuZGF5cztcbiAgZXhwb3J0cy51dGNNb25kYXlzID0gdXRjTW9uZGF5cztcbiAgZXhwb3J0cy51dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXlzO1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXlzO1xuICBleHBvcnRzLnV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5cztcbiAgZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbiAgZXhwb3J0cy51dGNTYXR1cmRheXMgPSB1dGNTYXR1cmRheXM7XG4gIGV4cG9ydHMudXRjV2Vla3MgPSB1dGNXZWVrcztcbiAgZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG4gIGV4cG9ydHMudXRjWWVhcnMgPSB1dGNZZWFycztcbiAgZXhwb3J0cy5taWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xuICBleHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy5taW51dGUgPSBtaW51dGU7XG4gIGV4cG9ydHMuaG91ciA9IGhvdXI7XG4gIGV4cG9ydHMuZGF5ID0gZGF5O1xuICBleHBvcnRzLnN1bmRheSA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb25kYXkgPSBtb25kYXk7XG4gIGV4cG9ydHMudHVlc2RheSA9IHR1ZXNkYXk7XG4gIGV4cG9ydHMud2VkbmVzZGF5ID0gd2VkbmVzZGF5O1xuICBleHBvcnRzLnRodXJzZGF5ID0gdGh1cnNkYXk7XG4gIGV4cG9ydHMuZnJpZGF5ID0gZnJpZGF5O1xuICBleHBvcnRzLnNhdHVyZGF5ID0gc2F0dXJkYXk7XG4gIGV4cG9ydHMud2VlayA9IHN1bmRheTtcbiAgZXhwb3J0cy5tb250aCA9IG1vbnRoO1xuICBleHBvcnRzLnllYXIgPSB5ZWFyO1xuICBleHBvcnRzLnV0Y1NlY29uZCA9IHV0Y1NlY29uZDtcbiAgZXhwb3J0cy51dGNNaW51dGUgPSB1dGNNaW51dGU7XG4gIGV4cG9ydHMudXRjSG91ciA9IHV0Y0hvdXI7XG4gIGV4cG9ydHMudXRjRGF5ID0gdXRjRGF5O1xuICBleHBvcnRzLnV0Y1N1bmRheSA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb25kYXkgPSB1dGNNb25kYXk7XG4gIGV4cG9ydHMudXRjVHVlc2RheSA9IHV0Y1R1ZXNkYXk7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG4gIGV4cG9ydHMudXRjRnJpZGF5ID0gdXRjRnJpZGF5O1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5ID0gdXRjU2F0dXJkYXk7XG4gIGV4cG9ydHMudXRjV2VlayA9IHV0Y1N1bmRheTtcbiAgZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuICBleHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyO1xuICBleHBvcnRzLmludGVydmFsID0gbmV3SW50ZXJ2YWw7XG5cbn0pKTsiLCIhZnVuY3Rpb24oKSB7XG4gIHZhciB0b3BvanNvbiA9IHtcbiAgICB2ZXJzaW9uOiBcIjEuNi4xOVwiLFxuICAgIG1lc2g6IGZ1bmN0aW9uKHRvcG9sb2d5KSB7IHJldHVybiBvYmplY3QodG9wb2xvZ3ksIG1lc2hBcmNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpOyB9LFxuICAgIG1lc2hBcmNzOiBtZXNoQXJjcyxcbiAgICBtZXJnZTogZnVuY3Rpb24odG9wb2xvZ3kpIHsgcmV0dXJuIG9iamVjdCh0b3BvbG9neSwgbWVyZ2VBcmNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpOyB9LFxuICAgIG1lcmdlQXJjczogbWVyZ2VBcmNzLFxuICAgIGZlYXR1cmU6IGZlYXR1cmVPckNvbGxlY3Rpb24sXG4gICAgbmVpZ2hib3JzOiBuZWlnaGJvcnMsXG4gICAgcHJlc2ltcGxpZnk6IHByZXNpbXBsaWZ5XG4gIH07XG5cbiAgZnVuY3Rpb24gc3RpdGNoQXJjcyh0b3BvbG9neSwgYXJjcykge1xuICAgIHZhciBzdGl0Y2hlZEFyY3MgPSB7fSxcbiAgICAgICAgZnJhZ21lbnRCeVN0YXJ0ID0ge30sXG4gICAgICAgIGZyYWdtZW50QnlFbmQgPSB7fSxcbiAgICAgICAgZnJhZ21lbnRzID0gW10sXG4gICAgICAgIGVtcHR5SW5kZXggPSAtMTtcblxuICAgIC8vIFN0aXRjaCBlbXB0eSBhcmNzIGZpcnN0LCBzaW5jZSB0aGV5IG1heSBiZSBzdWJzdW1lZCBieSBvdGhlciBhcmNzLlxuICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpLCBqKSB7XG4gICAgICB2YXIgYXJjID0gdG9wb2xvZ3kuYXJjc1tpIDwgMCA/IH5pIDogaV0sIHQ7XG4gICAgICBpZiAoYXJjLmxlbmd0aCA8IDMgJiYgIWFyY1sxXVswXSAmJiAhYXJjWzFdWzFdKSB7XG4gICAgICAgIHQgPSBhcmNzWysrZW1wdHlJbmRleF0sIGFyY3NbZW1wdHlJbmRleF0gPSBpLCBhcmNzW2pdID0gdDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICB2YXIgZSA9IGVuZHMoaSksXG4gICAgICAgICAgc3RhcnQgPSBlWzBdLFxuICAgICAgICAgIGVuZCA9IGVbMV0sXG4gICAgICAgICAgZiwgZztcblxuICAgICAgaWYgKGYgPSBmcmFnbWVudEJ5RW5kW3N0YXJ0XSkge1xuICAgICAgICBkZWxldGUgZnJhZ21lbnRCeUVuZFtmLmVuZF07XG4gICAgICAgIGYucHVzaChpKTtcbiAgICAgICAgZi5lbmQgPSBlbmQ7XG4gICAgICAgIGlmIChnID0gZnJhZ21lbnRCeVN0YXJ0W2VuZF0pIHtcbiAgICAgICAgICBkZWxldGUgZnJhZ21lbnRCeVN0YXJ0W2cuc3RhcnRdO1xuICAgICAgICAgIHZhciBmZyA9IGcgPT09IGYgPyBmIDogZi5jb25jYXQoZyk7XG4gICAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2ZnLnN0YXJ0ID0gZi5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2ZnLmVuZCA9IGcuZW5kXSA9IGZnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZi5lbmRdID0gZjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmID0gZnJhZ21lbnRCeVN0YXJ0W2VuZF0pIHtcbiAgICAgICAgZGVsZXRlIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XTtcbiAgICAgICAgZi51bnNoaWZ0KGkpO1xuICAgICAgICBmLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIGlmIChnID0gZnJhZ21lbnRCeUVuZFtzdGFydF0pIHtcbiAgICAgICAgICBkZWxldGUgZnJhZ21lbnRCeUVuZFtnLmVuZF07XG4gICAgICAgICAgdmFyIGdmID0gZyA9PT0gZiA/IGYgOiBnLmNvbmNhdChmKTtcbiAgICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZ2Yuc3RhcnQgPSBnLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZ2YuZW5kID0gZi5lbmRdID0gZ2Y7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZF0gPSBmO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmID0gW2ldO1xuICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydCA9IHN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZi5lbmQgPSBlbmRdID0gZjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGVuZHMoaSkge1xuICAgICAgdmFyIGFyYyA9IHRvcG9sb2d5LmFyY3NbaSA8IDAgPyB+aSA6IGldLCBwMCA9IGFyY1swXSwgcDE7XG4gICAgICBpZiAodG9wb2xvZ3kudHJhbnNmb3JtKSBwMSA9IFswLCAwXSwgYXJjLmZvckVhY2goZnVuY3Rpb24oZHApIHsgcDFbMF0gKz0gZHBbMF0sIHAxWzFdICs9IGRwWzFdOyB9KTtcbiAgICAgIGVsc2UgcDEgPSBhcmNbYXJjLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGkgPCAwID8gW3AxLCBwMF0gOiBbcDAsIHAxXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmbHVzaChmcmFnbWVudEJ5RW5kLCBmcmFnbWVudEJ5U3RhcnQpIHtcbiAgICAgIGZvciAodmFyIGsgaW4gZnJhZ21lbnRCeUVuZCkge1xuICAgICAgICB2YXIgZiA9IGZyYWdtZW50QnlFbmRba107XG4gICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF07XG4gICAgICAgIGRlbGV0ZSBmLnN0YXJ0O1xuICAgICAgICBkZWxldGUgZi5lbmQ7XG4gICAgICAgIGYuZm9yRWFjaChmdW5jdGlvbihpKSB7IHN0aXRjaGVkQXJjc1tpIDwgMCA/IH5pIDogaV0gPSAxOyB9KTtcbiAgICAgICAgZnJhZ21lbnRzLnB1c2goZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmx1c2goZnJhZ21lbnRCeUVuZCwgZnJhZ21lbnRCeVN0YXJ0KTtcbiAgICBmbHVzaChmcmFnbWVudEJ5U3RhcnQsIGZyYWdtZW50QnlFbmQpO1xuICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpKSB7IGlmICghc3RpdGNoZWRBcmNzW2kgPCAwID8gfmkgOiBpXSkgZnJhZ21lbnRzLnB1c2goW2ldKTsgfSk7XG5cbiAgICByZXR1cm4gZnJhZ21lbnRzO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVzaEFyY3ModG9wb2xvZ3ksIG8sIGZpbHRlcikge1xuICAgIHZhciBhcmNzID0gW107XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBnZW9tc0J5QXJjID0gW10sXG4gICAgICAgICAgZ2VvbTtcblxuICAgICAgZnVuY3Rpb24gYXJjKGkpIHtcbiAgICAgICAgdmFyIGogPSBpIDwgMCA/IH5pIDogaTtcbiAgICAgICAgKGdlb21zQnlBcmNbal0gfHwgKGdlb21zQnlBcmNbal0gPSBbXSkpLnB1c2goe2k6IGksIGc6IGdlb219KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbGluZShhcmNzKSB7XG4gICAgICAgIGFyY3MuZm9yRWFjaChhcmMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwb2x5Z29uKGFyY3MpIHtcbiAgICAgICAgYXJjcy5mb3JFYWNoKGxpbmUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZW9tZXRyeShvKSB7XG4gICAgICAgIGlmIChvLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIpIG8uZ2VvbWV0cmllcy5mb3JFYWNoKGdlb21ldHJ5KTtcbiAgICAgICAgZWxzZSBpZiAoby50eXBlIGluIGdlb21ldHJ5VHlwZSkgZ2VvbSA9IG8sIGdlb21ldHJ5VHlwZVtvLnR5cGVdKG8uYXJjcyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBnZW9tZXRyeVR5cGUgPSB7XG4gICAgICAgIExpbmVTdHJpbmc6IGxpbmUsXG4gICAgICAgIE11bHRpTGluZVN0cmluZzogcG9seWdvbixcbiAgICAgICAgUG9seWdvbjogcG9seWdvbixcbiAgICAgICAgTXVsdGlQb2x5Z29uOiBmdW5jdGlvbihhcmNzKSB7IGFyY3MuZm9yRWFjaChwb2x5Z29uKTsgfVxuICAgICAgfTtcblxuICAgICAgZ2VvbWV0cnkobyk7XG5cbiAgICAgIGdlb21zQnlBcmMuZm9yRWFjaChhcmd1bWVudHMubGVuZ3RoIDwgM1xuICAgICAgICAgID8gZnVuY3Rpb24oZ2VvbXMpIHsgYXJjcy5wdXNoKGdlb21zWzBdLmkpOyB9XG4gICAgICAgICAgOiBmdW5jdGlvbihnZW9tcykgeyBpZiAoZmlsdGVyKGdlb21zWzBdLmcsIGdlb21zW2dlb21zLmxlbmd0aCAtIDFdLmcpKSBhcmNzLnB1c2goZ2VvbXNbMF0uaSk7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHRvcG9sb2d5LmFyY3MubGVuZ3RoOyBpIDwgbjsgKytpKSBhcmNzLnB1c2goaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLCBhcmNzOiBzdGl0Y2hBcmNzKHRvcG9sb2d5LCBhcmNzKX07XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZUFyY3ModG9wb2xvZ3ksIG9iamVjdHMpIHtcbiAgICB2YXIgcG9seWdvbnNCeUFyYyA9IHt9LFxuICAgICAgICBwb2x5Z29ucyA9IFtdLFxuICAgICAgICBjb21wb25lbnRzID0gW107XG5cbiAgICBvYmplY3RzLmZvckVhY2goZnVuY3Rpb24obykge1xuICAgICAgaWYgKG8udHlwZSA9PT0gXCJQb2x5Z29uXCIpIHJlZ2lzdGVyKG8uYXJjcyk7XG4gICAgICBlbHNlIGlmIChvLnR5cGUgPT09IFwiTXVsdGlQb2x5Z29uXCIpIG8uYXJjcy5mb3JFYWNoKHJlZ2lzdGVyKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKHBvbHlnb24pIHtcbiAgICAgIHBvbHlnb24uZm9yRWFjaChmdW5jdGlvbihyaW5nKSB7XG4gICAgICAgIHJpbmcuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgICAgICAocG9seWdvbnNCeUFyY1thcmMgPSBhcmMgPCAwID8gfmFyYyA6IGFyY10gfHwgKHBvbHlnb25zQnlBcmNbYXJjXSA9IFtdKSkucHVzaChwb2x5Z29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHBvbHlnb25zLnB1c2gocG9seWdvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZXJpb3IocmluZykge1xuICAgICAgcmV0dXJuIGNhcnRlc2lhblJpbmdBcmVhKG9iamVjdCh0b3BvbG9neSwge3R5cGU6IFwiUG9seWdvblwiLCBhcmNzOiBbcmluZ119KS5jb29yZGluYXRlc1swXSkgPiAwOyAvLyBUT0RPIGFsbG93IHNwaGVyaWNhbD9cbiAgICB9XG5cbiAgICBwb2x5Z29ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgIGlmICghcG9seWdvbi5fKSB7XG4gICAgICAgIHZhciBjb21wb25lbnQgPSBbXSxcbiAgICAgICAgICAgIG5laWdoYm9ycyA9IFtwb2x5Z29uXTtcbiAgICAgICAgcG9seWdvbi5fID0gMTtcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIHdoaWxlIChwb2x5Z29uID0gbmVpZ2hib3JzLnBvcCgpKSB7XG4gICAgICAgICAgY29tcG9uZW50LnB1c2gocG9seWdvbik7XG4gICAgICAgICAgcG9seWdvbi5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgICAgICAgIHJpbmcuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgICAgICAgICAgcG9seWdvbnNCeUFyY1thcmMgPCAwID8gfmFyYyA6IGFyY10uZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwb2x5Z29uLl8pIHtcbiAgICAgICAgICAgICAgICAgIHBvbHlnb24uXyA9IDE7XG4gICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChwb2x5Z29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgZGVsZXRlIHBvbHlnb24uXztcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcIk11bHRpUG9seWdvblwiLFxuICAgICAgYXJjczogY29tcG9uZW50cy5tYXAoZnVuY3Rpb24ocG9seWdvbnMpIHtcbiAgICAgICAgdmFyIGFyY3MgPSBbXTtcblxuICAgICAgICAvLyBFeHRyYWN0IHRoZSBleHRlcmlvciAodW5pcXVlKSBhcmNzLlxuICAgICAgICBwb2x5Z29ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgICAgICBwb2x5Z29uLmZvckVhY2goZnVuY3Rpb24ocmluZykge1xuICAgICAgICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAgICAgICBpZiAocG9seWdvbnNCeUFyY1thcmMgPCAwID8gfmFyYyA6IGFyY10ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIGFyY3MucHVzaChhcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RpdGNoIHRoZSBhcmNzIGludG8gb25lIG9yIG1vcmUgcmluZ3MuXG4gICAgICAgIGFyY3MgPSBzdGl0Y2hBcmNzKHRvcG9sb2d5LCBhcmNzKTtcblxuICAgICAgICAvLyBJZiBtb3JlIHRoYW4gb25lIHJpbmcgaXMgcmV0dXJuZWQsXG4gICAgICAgIC8vIGF0IG1vc3Qgb25lIG9mIHRoZXNlIHJpbmdzIGNhbiBiZSB0aGUgZXh0ZXJpb3I7XG4gICAgICAgIC8vIHRoaXMgZXh0ZXJpb3IgcmluZyBoYXMgdGhlIHNhbWUgd2luZGluZyBvcmRlclxuICAgICAgICAvLyBhcyBhbnkgZXh0ZXJpb3IgcmluZyBpbiB0aGUgb3JpZ2luYWwgcG9seWdvbnMuXG4gICAgICAgIGlmICgobiA9IGFyY3MubGVuZ3RoKSA+IDEpIHtcbiAgICAgICAgICB2YXIgc2duID0gZXh0ZXJpb3IocG9seWdvbnNbMF1bMF0pO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICBpZiAoc2duID09PSBleHRlcmlvcihhcmNzW2ldKSkge1xuICAgICAgICAgICAgICB0ID0gYXJjc1swXSwgYXJjc1swXSA9IGFyY3NbaV0sIGFyY3NbaV0gPSB0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJjcztcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZlYXR1cmVPckNvbGxlY3Rpb24odG9wb2xvZ3ksIG8pIHtcbiAgICByZXR1cm4gby50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiID8ge1xuICAgICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgICAgZmVhdHVyZXM6IG8uZ2VvbWV0cmllcy5tYXAoZnVuY3Rpb24obykgeyByZXR1cm4gZmVhdHVyZSh0b3BvbG9neSwgbyk7IH0pXG4gICAgfSA6IGZlYXR1cmUodG9wb2xvZ3ksIG8pO1xuICB9XG5cbiAgZnVuY3Rpb24gZmVhdHVyZSh0b3BvbG9neSwgbykge1xuICAgIHZhciBmID0ge1xuICAgICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgICBpZDogby5pZCxcbiAgICAgIHByb3BlcnRpZXM6IG8ucHJvcGVydGllcyB8fCB7fSxcbiAgICAgIGdlb21ldHJ5OiBvYmplY3QodG9wb2xvZ3ksIG8pXG4gICAgfTtcbiAgICBpZiAoby5pZCA9PSBudWxsKSBkZWxldGUgZi5pZDtcbiAgICByZXR1cm4gZjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdCh0b3BvbG9neSwgbykge1xuICAgIHZhciBhYnNvbHV0ZSA9IHRyYW5zZm9ybUFic29sdXRlKHRvcG9sb2d5LnRyYW5zZm9ybSksXG4gICAgICAgIGFyY3MgPSB0b3BvbG9neS5hcmNzO1xuXG4gICAgZnVuY3Rpb24gYXJjKGksIHBvaW50cykge1xuICAgICAgaWYgKHBvaW50cy5sZW5ndGgpIHBvaW50cy5wb3AoKTtcbiAgICAgIGZvciAodmFyIGEgPSBhcmNzW2kgPCAwID8gfmkgOiBpXSwgayA9IDAsIG4gPSBhLmxlbmd0aCwgcDsgayA8IG47ICsraykge1xuICAgICAgICBwb2ludHMucHVzaChwID0gYVtrXS5zbGljZSgpKTtcbiAgICAgICAgYWJzb2x1dGUocCwgayk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IDApIHJldmVyc2UocG9pbnRzLCBuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2ludChwKSB7XG4gICAgICBwID0gcC5zbGljZSgpO1xuICAgICAgYWJzb2x1dGUocCwgMCk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5lKGFyY3MpIHtcbiAgICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJjcy5sZW5ndGg7IGkgPCBuOyArK2kpIGFyYyhhcmNzW2ldLCBwb2ludHMpO1xuICAgICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSBwb2ludHMucHVzaChwb2ludHNbMF0uc2xpY2UoKSk7XG4gICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJpbmcoYXJjcykge1xuICAgICAgdmFyIHBvaW50cyA9IGxpbmUoYXJjcyk7XG4gICAgICB3aGlsZSAocG9pbnRzLmxlbmd0aCA8IDQpIHBvaW50cy5wdXNoKHBvaW50c1swXS5zbGljZSgpKTtcbiAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9seWdvbihhcmNzKSB7XG4gICAgICByZXR1cm4gYXJjcy5tYXAocmluZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VvbWV0cnkobykge1xuICAgICAgdmFyIHQgPSBvLnR5cGU7XG4gICAgICByZXR1cm4gdCA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIiA/IHt0eXBlOiB0LCBnZW9tZXRyaWVzOiBvLmdlb21ldHJpZXMubWFwKGdlb21ldHJ5KX1cbiAgICAgICAgICA6IHQgaW4gZ2VvbWV0cnlUeXBlID8ge3R5cGU6IHQsIGNvb3JkaW5hdGVzOiBnZW9tZXRyeVR5cGVbdF0obyl9XG4gICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHZhciBnZW9tZXRyeVR5cGUgPSB7XG4gICAgICBQb2ludDogZnVuY3Rpb24obykgeyByZXR1cm4gcG9pbnQoby5jb29yZGluYXRlcyk7IH0sXG4gICAgICBNdWx0aVBvaW50OiBmdW5jdGlvbihvKSB7IHJldHVybiBvLmNvb3JkaW5hdGVzLm1hcChwb2ludCk7IH0sXG4gICAgICBMaW5lU3RyaW5nOiBmdW5jdGlvbihvKSB7IHJldHVybiBsaW5lKG8uYXJjcyk7IH0sXG4gICAgICBNdWx0aUxpbmVTdHJpbmc6IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uYXJjcy5tYXAobGluZSk7IH0sXG4gICAgICBQb2x5Z29uOiBmdW5jdGlvbihvKSB7IHJldHVybiBwb2x5Z29uKG8uYXJjcyk7IH0sXG4gICAgICBNdWx0aVBvbHlnb246IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uYXJjcy5tYXAocG9seWdvbik7IH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGdlb21ldHJ5KG8pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJzZShhcnJheSwgbikge1xuICAgIHZhciB0LCBqID0gYXJyYXkubGVuZ3RoLCBpID0gaiAtIG47IHdoaWxlIChpIDwgLS1qKSB0ID0gYXJyYXlbaV0sIGFycmF5W2krK10gPSBhcnJheVtqXSwgYXJyYXlbal0gPSB0O1xuICB9XG5cbiAgZnVuY3Rpb24gYmlzZWN0KGEsIHgpIHtcbiAgICB2YXIgbG8gPSAwLCBoaSA9IGEubGVuZ3RoO1xuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICAgIGlmIChhW21pZF0gPCB4KSBsbyA9IG1pZCArIDE7XG4gICAgICBlbHNlIGhpID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG87XG4gIH1cblxuICBmdW5jdGlvbiBuZWlnaGJvcnMob2JqZWN0cykge1xuICAgIHZhciBpbmRleGVzQnlBcmMgPSB7fSwgLy8gYXJjIGluZGV4IC0+IGFycmF5IG9mIG9iamVjdCBpbmRleGVzXG4gICAgICAgIG5laWdoYm9ycyA9IG9iamVjdHMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH0pO1xuXG4gICAgZnVuY3Rpb24gbGluZShhcmNzLCBpKSB7XG4gICAgICBhcmNzLmZvckVhY2goZnVuY3Rpb24oYSkge1xuICAgICAgICBpZiAoYSA8IDApIGEgPSB+YTtcbiAgICAgICAgdmFyIG8gPSBpbmRleGVzQnlBcmNbYV07XG4gICAgICAgIGlmIChvKSBvLnB1c2goaSk7XG4gICAgICAgIGVsc2UgaW5kZXhlc0J5QXJjW2FdID0gW2ldO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9seWdvbihhcmNzLCBpKSB7XG4gICAgICBhcmNzLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7IGxpbmUoYXJjLCBpKTsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VvbWV0cnkobywgaSkge1xuICAgICAgaWYgKG8udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIikgby5nZW9tZXRyaWVzLmZvckVhY2goZnVuY3Rpb24obykgeyBnZW9tZXRyeShvLCBpKTsgfSk7XG4gICAgICBlbHNlIGlmIChvLnR5cGUgaW4gZ2VvbWV0cnlUeXBlKSBnZW9tZXRyeVR5cGVbby50eXBlXShvLmFyY3MsIGkpO1xuICAgIH1cblxuICAgIHZhciBnZW9tZXRyeVR5cGUgPSB7XG4gICAgICBMaW5lU3RyaW5nOiBsaW5lLFxuICAgICAgTXVsdGlMaW5lU3RyaW5nOiBwb2x5Z29uLFxuICAgICAgUG9seWdvbjogcG9seWdvbixcbiAgICAgIE11bHRpUG9seWdvbjogZnVuY3Rpb24oYXJjcywgaSkgeyBhcmNzLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7IHBvbHlnb24oYXJjLCBpKTsgfSk7IH1cbiAgICB9O1xuXG4gICAgb2JqZWN0cy5mb3JFYWNoKGdlb21ldHJ5KTtcblxuICAgIGZvciAodmFyIGkgaW4gaW5kZXhlc0J5QXJjKSB7XG4gICAgICBmb3IgKHZhciBpbmRleGVzID0gaW5kZXhlc0J5QXJjW2ldLCBtID0gaW5kZXhlcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIGZvciAodmFyIGsgPSBqICsgMTsgayA8IG07ICsraykge1xuICAgICAgICAgIHZhciBpaiA9IGluZGV4ZXNbal0sIGlrID0gaW5kZXhlc1trXSwgbjtcbiAgICAgICAgICBpZiAoKG4gPSBuZWlnaGJvcnNbaWpdKVtpID0gYmlzZWN0KG4sIGlrKV0gIT09IGlrKSBuLnNwbGljZShpLCAwLCBpayk7XG4gICAgICAgICAgaWYgKChuID0gbmVpZ2hib3JzW2lrXSlbaSA9IGJpc2VjdChuLCBpaildICE9PSBpaikgbi5zcGxpY2UoaSwgMCwgaWopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5laWdoYm9ycztcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXNpbXBsaWZ5KHRvcG9sb2d5LCB0cmlhbmdsZUFyZWEpIHtcbiAgICB2YXIgYWJzb2x1dGUgPSB0cmFuc2Zvcm1BYnNvbHV0ZSh0b3BvbG9neS50cmFuc2Zvcm0pLFxuICAgICAgICByZWxhdGl2ZSA9IHRyYW5zZm9ybVJlbGF0aXZlKHRvcG9sb2d5LnRyYW5zZm9ybSksXG4gICAgICAgIGhlYXAgPSBtaW5BcmVhSGVhcCgpO1xuXG4gICAgaWYgKCF0cmlhbmdsZUFyZWEpIHRyaWFuZ2xlQXJlYSA9IGNhcnRlc2lhblRyaWFuZ2xlQXJlYTtcblxuICAgIHRvcG9sb2d5LmFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgIHZhciB0cmlhbmdsZXMgPSBbXSxcbiAgICAgICAgICBtYXhBcmVhID0gMCxcbiAgICAgICAgICB0cmlhbmdsZTtcblxuICAgICAgLy8gVG8gc3RvcmUgZWFjaCBwb2ludOKAmXMgZWZmZWN0aXZlIGFyZWEsIHdlIGNyZWF0ZSBhIG5ldyBhcnJheSByYXRoZXIgdGhhblxuICAgICAgLy8gZXh0ZW5kaW5nIHRoZSBwYXNzZWQtaW4gcG9pbnQgdG8gd29ya2Fyb3VuZCBhIENocm9tZS9WOCBidWcgKGdldHRpbmdcbiAgICAgIC8vIHN0dWNrIGluIHNtaSBtb2RlKS4gRm9yIG1pZHBvaW50cywgdGhlIGluaXRpYWwgZWZmZWN0aXZlIGFyZWEgb2ZcbiAgICAgIC8vIEluZmluaXR5IHdpbGwgYmUgY29tcHV0ZWQgaW4gdGhlIG5leHQgc3RlcC5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJjLmxlbmd0aCwgcDsgaSA8IG47ICsraSkge1xuICAgICAgICBwID0gYXJjW2ldO1xuICAgICAgICBhYnNvbHV0ZShhcmNbaV0gPSBbcFswXSwgcFsxXSwgSW5maW5pdHldLCBpKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDEsIG4gPSBhcmMubGVuZ3RoIC0gMTsgaSA8IG47ICsraSkge1xuICAgICAgICB0cmlhbmdsZSA9IGFyYy5zbGljZShpIC0gMSwgaSArIDIpO1xuICAgICAgICB0cmlhbmdsZVsxXVsyXSA9IHRyaWFuZ2xlQXJlYSh0cmlhbmdsZSk7XG4gICAgICAgIHRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcbiAgICAgICAgaGVhcC5wdXNoKHRyaWFuZ2xlKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0cmlhbmdsZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHRyaWFuZ2xlID0gdHJpYW5nbGVzW2ldO1xuICAgICAgICB0cmlhbmdsZS5wcmV2aW91cyA9IHRyaWFuZ2xlc1tpIC0gMV07XG4gICAgICAgIHRyaWFuZ2xlLm5leHQgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJpYW5nbGUgPSBoZWFwLnBvcCgpKSB7XG4gICAgICAgIHZhciBwcmV2aW91cyA9IHRyaWFuZ2xlLnByZXZpb3VzLFxuICAgICAgICAgICAgbmV4dCA9IHRyaWFuZ2xlLm5leHQ7XG5cbiAgICAgICAgLy8gSWYgdGhlIGFyZWEgb2YgdGhlIGN1cnJlbnQgcG9pbnQgaXMgbGVzcyB0aGFuIHRoYXQgb2YgdGhlIHByZXZpb3VzIHBvaW50XG4gICAgICAgIC8vIHRvIGJlIGVsaW1pbmF0ZWQsIHVzZSB0aGUgbGF0dGVyJ3MgYXJlYSBpbnN0ZWFkLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGVcbiAgICAgICAgLy8gY3VycmVudCBwb2ludCBjYW5ub3QgYmUgZWxpbWluYXRlZCB3aXRob3V0IGVsaW1pbmF0aW5nIHByZXZpb3VzbHktXG4gICAgICAgIC8vIGVsaW1pbmF0ZWQgcG9pbnRzLlxuICAgICAgICBpZiAodHJpYW5nbGVbMV1bMl0gPCBtYXhBcmVhKSB0cmlhbmdsZVsxXVsyXSA9IG1heEFyZWE7XG4gICAgICAgIGVsc2UgbWF4QXJlYSA9IHRyaWFuZ2xlWzFdWzJdO1xuXG4gICAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBuZXh0O1xuICAgICAgICAgIHByZXZpb3VzWzJdID0gdHJpYW5nbGVbMl07XG4gICAgICAgICAgdXBkYXRlKHByZXZpb3VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgbmV4dC5wcmV2aW91cyA9IHByZXZpb3VzO1xuICAgICAgICAgIG5leHRbMF0gPSB0cmlhbmdsZVswXTtcbiAgICAgICAgICB1cGRhdGUobmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXJjLmZvckVhY2gocmVsYXRpdmUpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRyaWFuZ2xlKSB7XG4gICAgICBoZWFwLnJlbW92ZSh0cmlhbmdsZSk7XG4gICAgICB0cmlhbmdsZVsxXVsyXSA9IHRyaWFuZ2xlQXJlYSh0cmlhbmdsZSk7XG4gICAgICBoZWFwLnB1c2godHJpYW5nbGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3BvbG9neTtcbiAgfTtcblxuICBmdW5jdGlvbiBjYXJ0ZXNpYW5SaW5nQXJlYShyaW5nKSB7XG4gICAgdmFyIGkgPSAtMSxcbiAgICAgICAgbiA9IHJpbmcubGVuZ3RoLFxuICAgICAgICBhLFxuICAgICAgICBiID0gcmluZ1tuIC0gMV0sXG4gICAgICAgIGFyZWEgPSAwO1xuXG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGEgPSBiO1xuICAgICAgYiA9IHJpbmdbaV07XG4gICAgICBhcmVhICs9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZWEgKiAuNTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcnRlc2lhblRyaWFuZ2xlQXJlYSh0cmlhbmdsZSkge1xuICAgIHZhciBhID0gdHJpYW5nbGVbMF0sIGIgPSB0cmlhbmdsZVsxXSwgYyA9IHRyaWFuZ2xlWzJdO1xuICAgIHJldHVybiBNYXRoLmFicygoYVswXSAtIGNbMF0pICogKGJbMV0gLSBhWzFdKSAtIChhWzBdIC0gYlswXSkgKiAoY1sxXSAtIGFbMV0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhcmVBcmVhKGEsIGIpIHtcbiAgICByZXR1cm4gYVsxXVsyXSAtIGJbMV1bMl07XG4gIH1cblxuICBmdW5jdGlvbiBtaW5BcmVhSGVhcCgpIHtcbiAgICB2YXIgaGVhcCA9IHt9LFxuICAgICAgICBhcnJheSA9IFtdLFxuICAgICAgICBzaXplID0gMDtcblxuICAgIGhlYXAucHVzaCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgdXAoYXJyYXlbb2JqZWN0Ll8gPSBzaXplXSA9IG9iamVjdCwgc2l6ZSsrKTtcbiAgICAgIHJldHVybiBzaXplO1xuICAgIH07XG5cbiAgICBoZWFwLnBvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNpemUgPD0gMCkgcmV0dXJuO1xuICAgICAgdmFyIHJlbW92ZWQgPSBhcnJheVswXSwgb2JqZWN0O1xuICAgICAgaWYgKC0tc2l6ZSA+IDApIG9iamVjdCA9IGFycmF5W3NpemVdLCBkb3duKGFycmF5W29iamVjdC5fID0gMF0gPSBvYmplY3QsIDApO1xuICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfTtcblxuICAgIGhlYXAucmVtb3ZlID0gZnVuY3Rpb24ocmVtb3ZlZCkge1xuICAgICAgdmFyIGkgPSByZW1vdmVkLl8sIG9iamVjdDtcbiAgICAgIGlmIChhcnJheVtpXSAhPT0gcmVtb3ZlZCkgcmV0dXJuOyAvLyBpbnZhbGlkIHJlcXVlc3RcbiAgICAgIGlmIChpICE9PSAtLXNpemUpIG9iamVjdCA9IGFycmF5W3NpemVdLCAoY29tcGFyZUFyZWEob2JqZWN0LCByZW1vdmVkKSA8IDAgPyB1cCA6IGRvd24pKGFycmF5W29iamVjdC5fID0gaV0gPSBvYmplY3QsIGkpO1xuICAgICAgcmV0dXJuIGk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwKG9iamVjdCwgaSkge1xuICAgICAgd2hpbGUgKGkgPiAwKSB7XG4gICAgICAgIHZhciBqID0gKChpICsgMSkgPj4gMSkgLSAxLFxuICAgICAgICAgICAgcGFyZW50ID0gYXJyYXlbal07XG4gICAgICAgIGlmIChjb21wYXJlQXJlYShvYmplY3QsIHBhcmVudCkgPj0gMCkgYnJlYWs7XG4gICAgICAgIGFycmF5W3BhcmVudC5fID0gaV0gPSBwYXJlbnQ7XG4gICAgICAgIGFycmF5W29iamVjdC5fID0gaSA9IGpdID0gb2JqZWN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvd24ob2JqZWN0LCBpKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgciA9IChpICsgMSkgPDwgMSxcbiAgICAgICAgICAgIGwgPSByIC0gMSxcbiAgICAgICAgICAgIGogPSBpLFxuICAgICAgICAgICAgY2hpbGQgPSBhcnJheVtqXTtcbiAgICAgICAgaWYgKGwgPCBzaXplICYmIGNvbXBhcmVBcmVhKGFycmF5W2xdLCBjaGlsZCkgPCAwKSBjaGlsZCA9IGFycmF5W2ogPSBsXTtcbiAgICAgICAgaWYgKHIgPCBzaXplICYmIGNvbXBhcmVBcmVhKGFycmF5W3JdLCBjaGlsZCkgPCAwKSBjaGlsZCA9IGFycmF5W2ogPSByXTtcbiAgICAgICAgaWYgKGogPT09IGkpIGJyZWFrO1xuICAgICAgICBhcnJheVtjaGlsZC5fID0gaV0gPSBjaGlsZDtcbiAgICAgICAgYXJyYXlbb2JqZWN0Ll8gPSBpID0gal0gPSBvYmplY3Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlYXA7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1BYnNvbHV0ZSh0cmFuc2Zvcm0pIHtcbiAgICBpZiAoIXRyYW5zZm9ybSkgcmV0dXJuIG5vb3A7XG4gICAgdmFyIHgwLFxuICAgICAgICB5MCxcbiAgICAgICAga3ggPSB0cmFuc2Zvcm0uc2NhbGVbMF0sXG4gICAgICAgIGt5ID0gdHJhbnNmb3JtLnNjYWxlWzFdLFxuICAgICAgICBkeCA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMF0sXG4gICAgICAgIGR5ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVsxXTtcbiAgICByZXR1cm4gZnVuY3Rpb24ocG9pbnQsIGkpIHtcbiAgICAgIGlmICghaSkgeDAgPSB5MCA9IDA7XG4gICAgICBwb2ludFswXSA9ICh4MCArPSBwb2ludFswXSkgKiBreCArIGR4O1xuICAgICAgcG9pbnRbMV0gPSAoeTAgKz0gcG9pbnRbMV0pICoga3kgKyBkeTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtUmVsYXRpdmUodHJhbnNmb3JtKSB7XG4gICAgaWYgKCF0cmFuc2Zvcm0pIHJldHVybiBub29wO1xuICAgIHZhciB4MCxcbiAgICAgICAgeTAsXG4gICAgICAgIGt4ID0gdHJhbnNmb3JtLnNjYWxlWzBdLFxuICAgICAgICBreSA9IHRyYW5zZm9ybS5zY2FsZVsxXSxcbiAgICAgICAgZHggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzBdLFxuICAgICAgICBkeSA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMV07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHBvaW50LCBpKSB7XG4gICAgICBpZiAoIWkpIHgwID0geTAgPSAwO1xuICAgICAgdmFyIHgxID0gKHBvaW50WzBdIC0gZHgpIC8ga3ggfCAwLFxuICAgICAgICAgIHkxID0gKHBvaW50WzFdIC0gZHkpIC8ga3kgfCAwO1xuICAgICAgcG9pbnRbMF0gPSB4MSAtIHgwO1xuICAgICAgcG9pbnRbMV0gPSB5MSAtIHkwO1xuICAgICAgeDAgPSB4MTtcbiAgICAgIHkwID0geTE7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKHRvcG9qc29uKTtcbiAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSB0b3BvanNvbjtcbiAgZWxzZSB0aGlzLnRvcG9qc29uID0gdG9wb2pzb247XG59KCk7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIHRpbWUgPSByZXF1aXJlKCcuL3RpbWUnKSxcbiAgICB1dGMgPSB0aW1lLnV0YztcblxudmFyIHUgPSBtb2R1bGUuZXhwb3J0cztcblxudS4keWVhciAgID0gdXRpbC4kZnVuYygneWVhcicsIHRpbWUueWVhci51bml0KTtcbnUuJG1vbnRoICA9IHV0aWwuJGZ1bmMoJ21vbnRoJywgdGltZS5tb250aHMudW5pdCk7XG51LiRkYXRlICAgPSB1dGlsLiRmdW5jKCdkYXRlJywgdGltZS5kYXRlcy51bml0KTtcbnUuJGRheSAgICA9IHV0aWwuJGZ1bmMoJ2RheScsIHRpbWUud2Vla2RheXMudW5pdCk7XG51LiRob3VyICAgPSB1dGlsLiRmdW5jKCdob3VyJywgdGltZS5ob3Vycy51bml0KTtcbnUuJG1pbnV0ZSA9IHV0aWwuJGZ1bmMoJ21pbnV0ZScsIHRpbWUubWludXRlcy51bml0KTtcbnUuJHNlY29uZCA9IHV0aWwuJGZ1bmMoJ3NlY29uZCcsIHRpbWUuc2Vjb25kcy51bml0KTtcblxudS4kdXRjWWVhciAgID0gdXRpbC4kZnVuYygndXRjWWVhcicsIHV0Yy55ZWFyLnVuaXQpO1xudS4kdXRjTW9udGggID0gdXRpbC4kZnVuYygndXRjTW9udGgnLCB1dGMubW9udGhzLnVuaXQpO1xudS4kdXRjRGF0ZSAgID0gdXRpbC4kZnVuYygndXRjRGF0ZScsIHV0Yy5kYXRlcy51bml0KTtcbnUuJHV0Y0RheSAgICA9IHV0aWwuJGZ1bmMoJ3V0Y0RheScsIHV0Yy53ZWVrZGF5cy51bml0KTtcbnUuJHV0Y0hvdXIgICA9IHV0aWwuJGZ1bmMoJ3V0Y0hvdXInLCB1dGMuaG91cnMudW5pdCk7XG51LiR1dGNNaW51dGUgPSB1dGlsLiRmdW5jKCd1dGNNaW51dGUnLCB1dGMubWludXRlcy51bml0KTtcbnUuJHV0Y1NlY29uZCA9IHV0aWwuJGZ1bmMoJ3V0Y1NlY29uZCcsIHV0Yy5zZWNvbmRzLnVuaXQpO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgTWVhc3VyZXMgPSByZXF1aXJlKCcuL21lYXN1cmVzJyksXG4gICAgQ29sbGVjdG9yID0gcmVxdWlyZSgnLi9jb2xsZWN0b3InKTtcblxuZnVuY3Rpb24gQWdncmVnYXRvcigpIHtcbiAgdGhpcy5fY2VsbHMgPSB7fTtcbiAgdGhpcy5fYWdnciA9IFtdO1xuICB0aGlzLl9zdHJlYW0gPSBmYWxzZTtcbn1cblxudmFyIEZsYWdzID0gQWdncmVnYXRvci5GbGFncyA9IHtcbiAgQUREX0NFTEw6IDEsXG4gIE1PRF9DRUxMOiAyXG59O1xuXG52YXIgcHJvdG8gPSBBZ2dyZWdhdG9yLnByb3RvdHlwZTtcblxuLy8gUGFyYW1ldGVyc1xuXG5wcm90by5zdHJlYW0gPSBmdW5jdGlvbih2KSB7XG4gIGlmICh2ID09IG51bGwpIHJldHVybiB0aGlzLl9zdHJlYW07XG4gIHRoaXMuX3N0cmVhbSA9ICEhdjtcbiAgdGhpcy5fYWdnciA9IFtdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGtleSBhY2Nlc3NvciB0byB1c2UgZm9yIHN0cmVhbWluZyByZW1vdmVzXG5wcm90by5rZXkgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKGtleSA9PSBudWxsKSByZXR1cm4gdGhpcy5fa2V5O1xuICB0aGlzLl9rZXkgPSB1dGlsLiQoa2V5KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBJbnB1dDogYXJyYXkgb2Ygb2JqZWN0cyBvZiB0aGUgZm9ybVxuLy8ge25hbWU6IHN0cmluZywgZ2V0OiBmdW5jdGlvbn1cbnByb3RvLmdyb3VwYnkgPSBmdW5jdGlvbihkaW1zKSB7XG4gIHRoaXMuX2RpbXMgPSB1dGlsLmFycmF5KGRpbXMpLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgZCA9IHV0aWwuaXNTdHJpbmcoZCkgPyB7bmFtZTogZCwgZ2V0OiB1dGlsLiQoZCl9XG4gICAgICA6IHV0aWwuaXNGdW5jdGlvbihkKSA/IHtuYW1lOiB1dGlsLm5hbWUoZCkgfHwgZC5uYW1lIHx8ICgnXycgKyBpKSwgZ2V0OiBkfVxuICAgICAgOiAoZC5uYW1lICYmIHV0aWwuaXNGdW5jdGlvbihkLmdldCkpID8gZCA6IG51bGw7XG4gICAgaWYgKGQgPT0gbnVsbCkgdGhyb3cgJ0ludmFsaWQgZ3JvdXBieSBhcmd1bWVudDogJyArIGQ7XG4gICAgcmV0dXJuIGQ7XG4gIH0pO1xuICByZXR1cm4gdGhpcy5jbGVhcigpO1xufTtcblxuLy8gSW5wdXQ6IGFycmF5IG9mIG9iamVjdHMgb2YgdGhlIGZvcm1cbi8vIHtuYW1lOiBzdHJpbmcsIG9wczogW3N0cmluZywgLi4uXX1cbnByb3RvLnN1bW1hcml6ZSA9IGZ1bmN0aW9uKGZpZWxkcykge1xuICBmaWVsZHMgPSBzdW1tYXJpemVfYXJncyhmaWVsZHMpO1xuICB0aGlzLl9jb3VudCA9IHRydWU7XG4gIHZhciBhZ2dyID0gKHRoaXMuX2FnZ3IgPSBbXSksXG4gICAgICBtLCBmLCBpLCBqLCBvcCwgYXMsIGdldDtcblxuICBmb3IgKGk9MDsgaTxmaWVsZHMubGVuZ3RoOyArK2kpIHtcbiAgICBmb3IgKGo9MCwgbT1bXSwgZj1maWVsZHNbaV07IGo8Zi5vcHMubGVuZ3RoOyArK2opIHtcbiAgICAgIG9wID0gZi5vcHNbal07XG4gICAgICBpZiAob3AgIT09ICdjb3VudCcpIHRoaXMuX2NvdW50ID0gZmFsc2U7XG4gICAgICBhcyA9IChmLmFzICYmIGYuYXNbal0pIHx8IChvcCArIChmLm5hbWU9PT0nKicgPyAnJyA6ICdfJytmLm5hbWUpKTtcbiAgICAgIG0ucHVzaChNZWFzdXJlc1tvcF0oYXMpKTtcbiAgICB9XG4gICAgZ2V0ID0gZi5nZXQgJiYgdXRpbC4kKGYuZ2V0KSB8fFxuICAgICAgKGYubmFtZSA9PT0gJyonID8gdXRpbC5pZGVudGl0eSA6IHV0aWwuJChmLm5hbWUpKTtcbiAgICBhZ2dyLnB1c2goe1xuICAgICAgbmFtZTogZi5uYW1lLFxuICAgICAgbWVhc3VyZXM6IE1lYXN1cmVzLmNyZWF0ZShcbiAgICAgICAgbSxcbiAgICAgICAgdGhpcy5fc3RyZWFtLCAvLyBzdHJlYW1pbmcgcmVtb3ZlIGZsYWdcbiAgICAgICAgZ2V0LCAgICAgICAgICAvLyBpbnB1dCB0dXBsZSBnZXR0ZXJcbiAgICAgICAgdGhpcy5fYXNzaWduKSAvLyBvdXRwdXQgdHVwbGUgc2V0dGVyXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcbn07XG5cbi8vIENvbnZlbmllbmNlIG1ldGhvZCB0byBzdW1tYXJpemUgYnkgY291bnRcbnByb3RvLmNvdW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN1bW1hcml6ZSh7JyonOidjb3VudCd9KTtcbn07XG5cbi8vIE92ZXJyaWRlIHRvIHBlcmZvcm0gY3VzdG9tIHR1cGxlIHZhbHVlIGFzc2lnbm1lbnRcbnByb3RvLl9hc3NpZ24gPSBmdW5jdGlvbihvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gIG9iamVjdFtuYW1lXSA9IHZhbHVlO1xufTtcblxuZnVuY3Rpb24gc3VtbWFyaXplX2FyZ3MoZmllbGRzKSB7XG4gIGlmICh1dGlsLmlzQXJyYXkoZmllbGRzKSkgeyByZXR1cm4gZmllbGRzOyB9XG4gIGlmIChmaWVsZHMgPT0gbnVsbCkgeyByZXR1cm4gW107IH1cbiAgdmFyIGEgPSBbXSwgbmFtZSwgb3BzO1xuICBmb3IgKG5hbWUgaW4gZmllbGRzKSB7XG4gICAgb3BzID0gdXRpbC5hcnJheShmaWVsZHNbbmFtZV0pO1xuICAgIGEucHVzaCh7bmFtZTogbmFtZSwgb3BzOiBvcHN9KTtcbiAgfVxuICByZXR1cm4gYTtcbn1cblxuLy8gQ2VsbCBNYW5hZ2VtZW50XG5cbnByb3RvLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAodGhpcy5fY2VsbHMgPSB7fSwgdGhpcyk7XG59O1xuXG5wcm90by5fY2VsbGtleSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGQgPSB0aGlzLl9kaW1zLFxuICAgICAgbiA9IGQubGVuZ3RoLCBpLFxuICAgICAgayA9IFN0cmluZyhkWzBdLmdldCh4KSk7XG4gIGZvciAoaT0xOyBpPG47ICsraSkge1xuICAgIGsgKz0gJ3wnICsgZFtpXS5nZXQoeCk7XG4gIH1cbiAgcmV0dXJuIGs7XG59O1xuXG5wcm90by5fY2VsbCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGtleSA9IHRoaXMuX2RpbXMubGVuZ3RoID8gdGhpcy5fY2VsbGtleSh4KSA6ICcnO1xuICByZXR1cm4gdGhpcy5fY2VsbHNba2V5XSB8fCAodGhpcy5fY2VsbHNba2V5XSA9IHRoaXMuX25ld2NlbGwoeCwga2V5KSk7XG59O1xuXG5wcm90by5fbmV3Y2VsbCA9IGZ1bmN0aW9uKHgsIGtleSkge1xuICB2YXIgY2VsbCA9IHtcbiAgICBudW06ICAgMCxcbiAgICB0dXBsZTogdGhpcy5fbmV3dHVwbGUoeCwga2V5KSxcbiAgICBmbGFnOiAgRmxhZ3MuQUREX0NFTEwsXG4gICAgYWdnczogIHt9XG4gIH07XG5cbiAgdmFyIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0gPSBuZXcgYWdncltpXS5tZWFzdXJlcyhjZWxsLCBjZWxsLnR1cGxlKTtcbiAgfVxuICBpZiAoY2VsbC5jb2xsZWN0KSB7XG4gICAgY2VsbC5kYXRhID0gbmV3IENvbGxlY3Rvcih0aGlzLl9rZXkpO1xuICB9XG4gIHJldHVybiBjZWxsO1xufTtcblxucHJvdG8uX25ld3R1cGxlID0gZnVuY3Rpb24oeCkge1xuICB2YXIgZGltcyA9IHRoaXMuX2RpbXMsXG4gICAgICB0ID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPWRpbXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHRbZGltc1tpXS5uYW1lXSA9IGRpbXNbaV0uZ2V0KHgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9pbmdlc3QodCk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSBpbmdlc3Rpb25cbnByb3RvLl9pbmdlc3QgPSB1dGlsLmlkZW50aXR5O1xuXG4vLyBQcm9jZXNzIFR1cGxlc1xuXG5wcm90by5fYWRkID0gZnVuY3Rpb24oeCkge1xuICB2YXIgY2VsbCA9IHRoaXMuX2NlbGwoeCksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBjZWxsLm51bSArPSAxO1xuICBpZiAoIXRoaXMuX2NvdW50KSB7IC8vIHNraXAgaWYgY291bnQtb25seVxuICAgIGlmIChjZWxsLmNvbGxlY3QpIGNlbGwuZGF0YS5hZGQoeCk7XG4gICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0uYWRkKHgpO1xuICAgIH1cbiAgfVxuICBjZWxsLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGlmICh0aGlzLl9vbl9hZGQpIHRoaXMuX29uX2FkZCh4LCBjZWxsKTtcbn07XG5cbnByb3RvLl9yZW0gPSBmdW5jdGlvbih4KSB7XG4gIHZhciBjZWxsID0gdGhpcy5fY2VsbCh4KSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGNlbGwubnVtIC09IDE7XG4gIGlmICghdGhpcy5fY291bnQpIHsgLy8gc2tpcCBpZiBjb3VudC1vbmx5XG4gICAgaWYgKGNlbGwuY29sbGVjdCkgY2VsbC5kYXRhLnJlbSh4KTtcbiAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5yZW0oeCk7XG4gICAgfVxuICB9XG4gIGNlbGwuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbiAgaWYgKHRoaXMuX29uX3JlbSkgdGhpcy5fb25fcmVtKHgsIGNlbGwpO1xufTtcblxucHJvdG8uX21vZCA9IGZ1bmN0aW9uKGN1cnIsIHByZXYpIHtcbiAgdmFyIGNlbGwwID0gdGhpcy5fY2VsbChwcmV2KSxcbiAgICAgIGNlbGwxID0gdGhpcy5fY2VsbChjdXJyKSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGlmIChjZWxsMCAhPT0gY2VsbDEpIHtcbiAgICBjZWxsMC5udW0gLT0gMTtcbiAgICBjZWxsMS5udW0gKz0gMTtcbiAgICBpZiAoY2VsbDAuY29sbGVjdCkgY2VsbDAuZGF0YS5yZW0ocHJldik7XG4gICAgaWYgKGNlbGwxLmNvbGxlY3QpIGNlbGwxLmRhdGEuYWRkKGN1cnIpO1xuICB9IGVsc2UgaWYgKGNlbGwwLmNvbGxlY3QgJiYgIXV0aWwuaXNPYmplY3QoY3VycikpIHtcbiAgICBjZWxsMC5kYXRhLnJlbShwcmV2KTtcbiAgICBjZWxsMC5kYXRhLmFkZChjdXJyKTtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICBjZWxsMC5hZ2dzW2FnZ3JbaV0ubmFtZV0ucmVtKHByZXYpO1xuICAgIGNlbGwxLmFnZ3NbYWdncltpXS5uYW1lXS5hZGQoY3Vycik7XG4gIH1cbiAgY2VsbDAuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbiAgY2VsbDEuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbiAgaWYgKHRoaXMuX29uX21vZCkgdGhpcy5fb25fbW9kKGN1cnIsIHByZXYsIGNlbGwwLCBjZWxsMSk7XG59O1xuXG5wcm90by5fbWFya01vZCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwwID0gdGhpcy5fY2VsbCh4KTtcbiAgY2VsbDAuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbn07XG5cbnByb3RvLnJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICBhZ2dyID0gdGhpcy5fYWdncixcbiAgICAgIGNlbGwsIGksIGs7XG5cbiAgZm9yIChrIGluIHRoaXMuX2NlbGxzKSB7XG4gICAgY2VsbCA9IHRoaXMuX2NlbGxzW2tdO1xuICAgIGlmIChjZWxsLm51bSA+IDApIHtcbiAgICAgIC8vIGNvbnNvbGlkYXRlIGNvbGxlY3RvciB2YWx1ZXNcbiAgICAgIGlmIChjZWxsLmNvbGxlY3QpIHtcbiAgICAgICAgY2VsbC5kYXRhLnZhbHVlcygpO1xuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIHR1cGxlIHByb3BlcnRpZXNcbiAgICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0uc2V0KCk7XG4gICAgICB9XG4gICAgICAvLyBhZGQgb3V0cHV0IHR1cGxlXG4gICAgICByZXN1bHQucHVzaChjZWxsLnR1cGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2tdO1xuICAgIH1cbiAgICBjZWxsLmZsYWcgPSAwO1xuICB9XG5cbiAgdGhpcy5fcmVtcyA9IGZhbHNlO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxucHJvdG8uY2hhbmdlcyA9IGZ1bmN0aW9uKG91dHB1dCkge1xuICB2YXIgY2hhbmdlcyA9IG91dHB1dCB8fCB7YWRkOltdLCByZW06W10sIG1vZDpbXX0sXG4gICAgICBhZ2dyID0gdGhpcy5fYWdncixcbiAgICAgIGNlbGwsIGZsYWcsIGksIGs7XG5cbiAgZm9yIChrIGluIHRoaXMuX2NlbGxzKSB7XG4gICAgY2VsbCA9IHRoaXMuX2NlbGxzW2tdO1xuICAgIGZsYWcgPSBjZWxsLmZsYWc7XG5cbiAgICAvLyBjb25zb2xpZGF0ZSBjb2xsZWN0b3IgdmFsdWVzXG4gICAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgICAgY2VsbC5kYXRhLnZhbHVlcygpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0dXBsZSBwcm9wZXJ0aWVzXG4gICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0uc2V0KCk7XG4gICAgfVxuXG4gICAgLy8gb3JnYW5pemUgb3V0cHV0IHR1cGxlc1xuICAgIGlmIChjZWxsLm51bSA8PSAwKSB7XG4gICAgICBjaGFuZ2VzLnJlbS5wdXNoKGNlbGwudHVwbGUpOyAvLyBpZiAoZmxhZyA9PT0gRmxhZ3MuTU9EX0NFTEwpIHsgPz9cbiAgICAgIGRlbGV0ZSB0aGlzLl9jZWxsc1trXTtcbiAgICAgIGlmICh0aGlzLl9vbl9kcm9wKSB0aGlzLl9vbl9kcm9wKGNlbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fb25fa2VlcCkgdGhpcy5fb25fa2VlcChjZWxsKTtcbiAgICAgIGlmIChmbGFnICYgRmxhZ3MuQUREX0NFTEwpIHtcbiAgICAgICAgY2hhbmdlcy5hZGQucHVzaChjZWxsLnR1cGxlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmxhZyAmIEZsYWdzLk1PRF9DRUxMKSB7XG4gICAgICAgIGNoYW5nZXMubW9kLnB1c2goY2VsbC50dXBsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2VsbC5mbGFnID0gMDtcbiAgfVxuXG4gIHRoaXMuX3JlbXMgPSBmYWxzZTtcbiAgcmV0dXJuIGNoYW5nZXM7XG59O1xuXG5wcm90by5leGVjdXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKS5pbnNlcnQoaW5wdXQpLnJlc3VsdCgpO1xufTtcblxucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgdGhpcy5fY29uc29saWRhdGUoKTtcbiAgZm9yICh2YXIgaT0wOyBpPGlucHV0Lmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5fYWRkKGlucHV0W2ldKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmICghdGhpcy5fc3RyZWFtKSB7XG4gICAgdGhyb3cgJ0FnZ3JlZ2F0b3Igbm90IGNvbmZpZ3VyZWQgZm9yIHN0cmVhbWluZyByZW1vdmVzLicgK1xuICAgICAgJyBDYWxsIHN0cmVhbSh0cnVlKSBwcmlvciB0byBjYWxsaW5nIHN1bW1hcml6ZS4nO1xuICB9XG4gIGZvciAodmFyIGk9MDsgaTxpbnB1dC5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX3JlbShpbnB1dFtpXSk7XG4gIH1cbiAgdGhpcy5fcmVtcyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gY29uc29saWRhdGUgcmVtb3ZhbHNcbnByb3RvLl9jb25zb2xpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuX3JlbXMpIHJldHVybjtcbiAgZm9yICh2YXIgayBpbiB0aGlzLl9jZWxscykge1xuICAgIGlmICh0aGlzLl9jZWxsc1trXS5jb2xsZWN0KSB7XG4gICAgICB0aGlzLl9jZWxsc1trXS5kYXRhLnZhbHVlcygpO1xuICAgIH1cbiAgfVxuICB0aGlzLl9yZW1zID0gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZ3JlZ2F0b3I7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBzdGF0cyA9IHJlcXVpcmUoJy4uL3N0YXRzJyk7XG5cbnZhciBSRU0gPSAnX19kbF9yZW1fXyc7XG5cbmZ1bmN0aW9uIENvbGxlY3RvcihrZXkpIHtcbiAgdGhpcy5fYWRkID0gW107XG4gIHRoaXMuX3JlbSA9IFtdO1xuICB0aGlzLl9rZXkgPSBrZXkgfHwgbnVsbDtcbiAgdGhpcy5fbGFzdCA9IG51bGw7XG59XG5cbnZhciBwcm90byA9IENvbGxlY3Rvci5wcm90b3R5cGU7XG5cbnByb3RvLmFkZCA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5fYWRkLnB1c2godik7XG59O1xuXG5wcm90by5yZW0gPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuX3JlbS5wdXNoKHYpO1xufTtcblxucHJvdG8udmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2dldCA9IG51bGw7XG4gIGlmICh0aGlzLl9yZW0ubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5fYWRkO1xuXG4gIHZhciBhID0gdGhpcy5fYWRkLFxuICAgICAgciA9IHRoaXMuX3JlbSxcbiAgICAgIGsgPSB0aGlzLl9rZXksXG4gICAgICB4ID0gQXJyYXkoYS5sZW5ndGggLSByLmxlbmd0aCksXG4gICAgICBpLCBqLCBuLCBtO1xuXG4gIGlmICghdXRpbC5pc09iamVjdChyWzBdKSkge1xuICAgIC8vIHByb2Nlc3NpbmcgcmF3IHZhbHVlc1xuICAgIG0gPSBzdGF0cy5jb3VudC5tYXAocik7XG4gICAgZm9yIChpPTAsIGo9MCwgbj1hLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGlmIChtW2FbaV1dID4gMCkge1xuICAgICAgICBtW2FbaV1dIC09IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4W2orK10gPSBhW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChrKSB7XG4gICAgLy8gaGFzIHVuaXF1ZSBrZXkgZmllbGQsIHNvIHVzZSB0aGF0XG4gICAgbSA9IHV0aWwudG9NYXAociwgayk7XG4gICAgZm9yIChpPTAsIGo9MCwgbj1hLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGlmICghbS5oYXNPd25Qcm9wZXJ0eShrKGFbaV0pKSkgeyB4W2orK10gPSBhW2ldOyB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIG5vIHVuaXF1ZSBrZXksIG1hcmsgdHVwbGVzIGRpcmVjdGx5XG4gICAgZm9yIChpPTAsIG49ci5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICByW2ldW1JFTV0gPSAxO1xuICAgIH1cbiAgICBmb3IgKGk9MCwgaj0wLCBuPWEubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgaWYgKCFhW2ldW1JFTV0pIHsgeFtqKytdID0gYVtpXTsgfVxuICAgIH1cbiAgICBmb3IgKGk9MCwgbj1yLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGRlbGV0ZSByW2ldW1JFTV07XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fcmVtID0gW107XG4gIHJldHVybiAodGhpcy5fYWRkID0geCk7XG59O1xuXG4vLyBtZW1vaXppbmcgc3RhdGlzdGljcyBtZXRob2RzXG5cbnByb3RvLmV4dGVudCA9IGZ1bmN0aW9uKGdldCkge1xuICBpZiAodGhpcy5fZ2V0ICE9PSBnZXQgfHwgIXRoaXMuX2V4dCkge1xuICAgIHZhciB2ID0gdGhpcy52YWx1ZXMoKSxcbiAgICAgICAgaSA9IHN0YXRzLmV4dGVudC5pbmRleCh2LCBnZXQpO1xuICAgIHRoaXMuX2V4dCA9IFt2W2lbMF1dLCB2W2lbMV1dXTtcbiAgICB0aGlzLl9nZXQgPSBnZXQ7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2V4dDtcbn07XG5cbnByb3RvLmFyZ21pbiA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5leHRlbnQoZ2V0KVswXTtcbn07XG5cbnByb3RvLmFyZ21heCA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5leHRlbnQoZ2V0KVsxXTtcbn07XG5cbnByb3RvLm1pbiA9IGZ1bmN0aW9uKGdldCkge1xuICB2YXIgbSA9IHRoaXMuZXh0ZW50KGdldClbMF07XG4gIHJldHVybiBtICE9IG51bGwgPyBnZXQobSkgOiArSW5maW5pdHk7XG59O1xuXG5wcm90by5tYXggPSBmdW5jdGlvbihnZXQpIHtcbiAgdmFyIG0gPSB0aGlzLmV4dGVudChnZXQpWzFdO1xuICByZXR1cm4gbSAhPSBudWxsID8gZ2V0KG0pIDogLUluZmluaXR5O1xufTtcblxucHJvdG8ucXVhcnRpbGUgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2dldCAhPT0gZ2V0IHx8ICF0aGlzLl9xKSB7XG4gICAgdGhpcy5fcSA9IHN0YXRzLnF1YXJ0aWxlKHRoaXMudmFsdWVzKCksIGdldCk7XG4gICAgdGhpcy5fZ2V0ID0gZ2V0O1xuICB9XG4gIHJldHVybiB0aGlzLl9xO1xufTtcblxucHJvdG8ucTEgPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMucXVhcnRpbGUoZ2V0KVswXTtcbn07XG5cbnByb3RvLnEyID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLnF1YXJ0aWxlKGdldClbMV07XG59O1xuXG5wcm90by5xMyA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5xdWFydGlsZShnZXQpWzJdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0b3I7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBBZ2dyZWdhdG9yID0gcmVxdWlyZSgnLi9hZ2dyZWdhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGZsYXR0ZW4gYXJndW1lbnRzIGludG8gYSBzaW5nbGUgYXJyYXlcbiAgdmFyIGFyZ3MgPSBbXS5yZWR1Y2UuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uKGEsIHgpIHtcbiAgICByZXR1cm4gYS5jb25jYXQodXRpbC5hcnJheSh4KSk7XG4gIH0sIFtdKTtcbiAgLy8gY3JlYXRlIGFuZCByZXR1cm4gYW4gYWdncmVnYXRvclxuICByZXR1cm4gbmV3IEFnZ3JlZ2F0b3IoKVxuICAgIC5ncm91cGJ5KGFyZ3MpXG4gICAgLnN1bW1hcml6ZSh7JyonOid2YWx1ZXMnfSk7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciB0eXBlcyA9IHtcbiAgJ3ZhbHVlcyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWx1ZXMnLFxuICAgIGluaXQ6ICdjZWxsLmNvbGxlY3QgPSB0cnVlOycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS52YWx1ZXMoKScsIGlkeDogLTFcbiAgfSksXG4gICdjb3VudCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdjb3VudCcsXG4gICAgc2V0OiAgJ2NlbGwubnVtJ1xuICB9KSxcbiAgJ21pc3NpbmcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWlzc2luZycsXG4gICAgc2V0OiAgJ3RoaXMubWlzc2luZydcbiAgfSksXG4gICd2YWxpZCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YWxpZCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQnXG4gIH0pLFxuICAnc3VtJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3N1bScsXG4gICAgaW5pdDogJ3RoaXMuc3VtID0gMDsnLFxuICAgIGFkZDogICd0aGlzLnN1bSArPSB2OycsXG4gICAgcmVtOiAgJ3RoaXMuc3VtIC09IHY7JyxcbiAgICBzZXQ6ICAndGhpcy5zdW0nXG4gIH0pLFxuICAnbWVhbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtZWFuJyxcbiAgICBpbml0OiAndGhpcy5tZWFuID0gMDsnLFxuICAgIGFkZDogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiArPSBkIC8gdGhpcy52YWxpZDsnLFxuICAgIHJlbTogICd2YXIgZCA9IHYgLSB0aGlzLm1lYW47IHRoaXMubWVhbiAtPSB0aGlzLnZhbGlkID8gZCAvIHRoaXMudmFsaWQgOiB0aGlzLm1lYW47JyxcbiAgICBzZXQ6ICAndGhpcy5tZWFuJ1xuICB9KSxcbiAgJ2F2ZXJhZ2UnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXZlcmFnZScsXG4gICAgc2V0OiAgJ3RoaXMubWVhbicsXG4gICAgcmVxOiAgWydtZWFuJ10sIGlkeDogMVxuICB9KSxcbiAgJ3ZhcmlhbmNlJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlJyxcbiAgICBpbml0OiAndGhpcy5kZXYgPSAwOycsXG4gICAgYWRkOiAgJ3RoaXMuZGV2ICs9IGQgKiAodiAtIHRoaXMubWVhbik7JyxcbiAgICByZW06ICAndGhpcy5kZXYgLT0gZCAqICh2IC0gdGhpcy5tZWFuKTsnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkgOiAwJyxcbiAgICByZXE6ICBbJ21lYW4nXSwgaWR4OiAxXG4gIH0pLFxuICAndmFyaWFuY2VwJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhcmlhbmNlcCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gdGhpcy5kZXYgLyB0aGlzLnZhbGlkIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdGRldicsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gTWF0aC5zcXJ0KHRoaXMuZGV2IC8gKHRoaXMudmFsaWQtMSkpIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdzdGRldnAnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3RkZXZwJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyBNYXRoLnNxcnQodGhpcy5kZXYgLyB0aGlzLnZhbGlkKSA6IDAnLFxuICAgIHJlcTogIFsndmFyaWFuY2UnXSwgaWR4OiAyXG4gIH0pLFxuICAnbWVkaWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lZGlhbicsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMih0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ3ExJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ExJyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnExKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAncTMnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAncTMnLFxuICAgIHNldDogICdjZWxsLmRhdGEucTModGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdkaXN0aW5jdCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdkaXN0aW5jdCcsXG4gICAgc2V0OiAgJ3RoaXMuZGlzdGluY3QoY2VsbC5kYXRhLnZhbHVlcygpLCB0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtaW4nLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLmFyZ21pbiA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMuYXJnbWluID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21pbiA9IHRoaXMuYXJnbWluIHx8IGNlbGwuZGF0YS5hcmdtaW4odGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21pbiddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2FyZ21heCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhcmdtYXgnLFxuICAgIGFkZDogICdpZiAodiA+IHRoaXMubWF4KSB0aGlzLmFyZ21heCA9IHQ7JyxcbiAgICByZW06ICAnaWYgKHYgPj0gdGhpcy5tYXgpIHRoaXMuYXJnbWF4ID0gbnVsbDsnLFxuICAgIHNldDogICd0aGlzLmFyZ21heCA9IHRoaXMuYXJnbWF4IHx8IGNlbGwuZGF0YS5hcmdtYXgodGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ21heCddLCBzdHI6IFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ21pbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaW4nLFxuICAgIGluaXQ6ICd0aGlzLm1pbiA9ICtJbmZpbml0eTsnLFxuICAgIGFkZDogICdpZiAodiA8IHRoaXMubWluKSB0aGlzLm1pbiA9IHY7JyxcbiAgICByZW06ICAnaWYgKHYgPD0gdGhpcy5taW4pIHRoaXMubWluID0gTmFOOycsXG4gICAgc2V0OiAgJ3RoaXMubWluID0gKGlzTmFOKHRoaXMubWluKSA/IGNlbGwuZGF0YS5taW4odGhpcy5nZXQpIDogdGhpcy5taW4pJyxcbiAgICBzdHI6ICBbJ3ZhbHVlcyddLCBpZHg6IDRcbiAgfSksXG4gICdtYXgnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWF4JyxcbiAgICBpbml0OiAndGhpcy5tYXggPSAtSW5maW5pdHk7JyxcbiAgICBhZGQ6ICAnaWYgKHYgPiB0aGlzLm1heCkgdGhpcy5tYXggPSB2OycsXG4gICAgcmVtOiAgJ2lmICh2ID49IHRoaXMubWF4KSB0aGlzLm1heCA9IE5hTjsnLFxuICAgIHNldDogICd0aGlzLm1heCA9IChpc05hTih0aGlzLm1heCkgPyBjZWxsLmRhdGEubWF4KHRoaXMuZ2V0KSA6IHRoaXMubWF4KScsXG4gICAgc3RyOiAgWyd2YWx1ZXMnXSwgaWR4OiA0XG4gIH0pLFxuICAnbW9kZXNrZXcnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbW9kZXNrZXcnLFxuICAgIHNldDogICd0aGlzLmRldj09PTAgPyAwIDogKHRoaXMubWVhbiAtIGNlbGwuZGF0YS5xMih0aGlzLmdldCkpIC8gTWF0aC5zcXJ0KHRoaXMuZGV2Lyh0aGlzLnZhbGlkLTEpKScsXG4gICAgcmVxOiAgWydtZWFuJywgJ3N0ZGV2JywgJ21lZGlhbiddLCBpZHg6IDVcbiAgfSlcbn07XG5cbmZ1bmN0aW9uIG1lYXN1cmUoYmFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob3V0KSB7XG4gICAgdmFyIG0gPSB1dGlsLmV4dGVuZCh7aW5pdDonJywgYWRkOicnLCByZW06JycsIGlkeDowfSwgYmFzZSk7XG4gICAgbS5vdXQgPSBvdXQgfHwgYmFzZS5uYW1lO1xuICAgIHJldHVybiBtO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGFnZywgc3RyZWFtKSB7XG4gIGZ1bmN0aW9uIGNvbGxlY3QobSwgYSkge1xuICAgIGZ1bmN0aW9uIGhlbHBlcihyKSB7IGlmICghbVtyXSkgY29sbGVjdChtLCBtW3JdID0gdHlwZXNbcl0oKSk7IH1cbiAgICBpZiAoYS5yZXEpIGEucmVxLmZvckVhY2goaGVscGVyKTtcbiAgICBpZiAoc3RyZWFtICYmIGEuc3RyKSBhLnN0ci5mb3JFYWNoKGhlbHBlcik7XG4gICAgcmV0dXJuIG07XG4gIH1cbiAgdmFyIG1hcCA9IGFnZy5yZWR1Y2UoXG4gICAgY29sbGVjdCxcbiAgICBhZ2cucmVkdWNlKGZ1bmN0aW9uKG0sIGEpIHsgcmV0dXJuIChtW2EubmFtZV0gPSBhLCBtKTsgfSwge30pXG4gICk7XG4gIHJldHVybiB1dGlsLnZhbHMobWFwKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuaWR4IC0gYi5pZHg7IH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoYWdnLCBzdHJlYW0sIGFjY2Vzc29yLCBtdXRhdG9yKSB7XG4gIHZhciBhbGwgPSByZXNvbHZlKGFnZywgc3RyZWFtKSxcbiAgICAgIGN0ciA9ICd0aGlzLmNlbGwgPSBjZWxsOyB0aGlzLnR1cGxlID0gdDsgdGhpcy52YWxpZCA9IDA7IHRoaXMubWlzc2luZyA9IDA7JyxcbiAgICAgIGFkZCA9ICdpZiAodj09bnVsbCkgdGhpcy5taXNzaW5nKys7IGlmICghdGhpcy5pc1ZhbGlkKHYpKSByZXR1cm47ICsrdGhpcy52YWxpZDsnLFxuICAgICAgcmVtID0gJ2lmICh2PT1udWxsKSB0aGlzLm1pc3NpbmctLTsgaWYgKCF0aGlzLmlzVmFsaWQodikpIHJldHVybjsgLS10aGlzLnZhbGlkOycsXG4gICAgICBzZXQgPSAndmFyIHQgPSB0aGlzLnR1cGxlOyB2YXIgY2VsbCA9IHRoaXMuY2VsbDsnO1xuXG4gIGFsbC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICBpZiAoYS5pZHggPCAwKSB7XG4gICAgICBjdHIgPSBhLmluaXQgKyBjdHI7XG4gICAgICBhZGQgPSBhLmFkZCArIGFkZDtcbiAgICAgIHJlbSA9IGEucmVtICsgcmVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHIgKz0gYS5pbml0O1xuICAgICAgYWRkICs9IGEuYWRkO1xuICAgICAgcmVtICs9IGEucmVtO1xuICAgIH1cbiAgfSk7XG4gIGFnZy5zbGljZSgpXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pZHggLSBiLmlkeDsgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICBzZXQgKz0gJ3RoaXMuYXNzaWduKHQsXFwnJythLm91dCsnXFwnLCcrYS5zZXQrJyk7JztcbiAgICB9KTtcbiAgc2V0ICs9ICdyZXR1cm4gdDsnO1xuXG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIGN0ciA9IEZ1bmN0aW9uKCdjZWxsJywgJ3QnLCBjdHIpO1xuICBjdHIucHJvdG90eXBlLmFzc2lnbiA9IG11dGF0b3I7XG4gIGN0ci5wcm90b3R5cGUuYWRkID0gRnVuY3Rpb24oJ3QnLCAndmFyIHYgPSB0aGlzLmdldCh0KTsnICsgYWRkKTtcbiAgY3RyLnByb3RvdHlwZS5yZW0gPSBGdW5jdGlvbigndCcsICd2YXIgdiA9IHRoaXMuZ2V0KHQpOycgKyByZW0pO1xuICBjdHIucHJvdG90eXBlLnNldCA9IEZ1bmN0aW9uKHNldCk7XG4gIGN0ci5wcm90b3R5cGUuZ2V0ID0gYWNjZXNzb3I7XG4gIGN0ci5wcm90b3R5cGUuZGlzdGluY3QgPSByZXF1aXJlKCcuLi9zdGF0cycpLmNvdW50LmRpc3RpbmN0O1xuICBjdHIucHJvdG90eXBlLmlzVmFsaWQgPSB1dGlsLmlzVmFsaWQ7XG4gIGN0ci5maWVsZHMgPSBhZ2cubWFwKHV0aWwuJCgnb3V0JykpO1xuICByZXR1cm4gY3RyO1xufVxuXG50eXBlcy5jcmVhdGUgPSBjcmVhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVzO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgdGltZSA9IHJlcXVpcmUoJy4uL3RpbWUnKSxcbiAgICBFUFNJTE9OID0gMWUtMTU7XG5cbmZ1bmN0aW9uIGJpbnMob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZGV0ZXJtaW5lIHJhbmdlXG4gIHZhciBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMTUsXG4gICAgICBiYXNlID0gb3B0LmJhc2UgfHwgMTAsXG4gICAgICBsb2diID0gTWF0aC5sb2coYmFzZSksXG4gICAgICBkaXYgPSBvcHQuZGl2IHx8IFs1LCAyXSxcbiAgICAgIG1pbiA9IG9wdC5taW4sXG4gICAgICBtYXggPSBvcHQubWF4LFxuICAgICAgc3BhbiA9IG1heCAtIG1pbixcbiAgICAgIHN0ZXAsIGxldmVsLCBtaW5zdGVwLCBwcmVjaXNpb24sIHYsIGksIGVwcztcblxuICBpZiAob3B0LnN0ZXApIHtcbiAgICAvLyBpZiBzdGVwIHNpemUgaXMgZXhwbGljaXRseSBnaXZlbiwgdXNlIHRoYXRcbiAgICBzdGVwID0gb3B0LnN0ZXA7XG4gIH0gZWxzZSBpZiAob3B0LnN0ZXBzKSB7XG4gICAgLy8gaWYgcHJvdmlkZWQsIGxpbWl0IGNob2ljZSB0byBhY2NlcHRhYmxlIHN0ZXAgc2l6ZXNcbiAgICBzdGVwID0gb3B0LnN0ZXBzW01hdGgubWluKFxuICAgICAgb3B0LnN0ZXBzLmxlbmd0aCAtIDEsXG4gICAgICBiaXNlY3Qob3B0LnN0ZXBzLCBzcGFuL21heGIsIDAsIG9wdC5zdGVwcy5sZW5ndGgpXG4gICAgKV07XG4gIH0gZWxzZSB7XG4gICAgLy8gZWxzZSB1c2Ugc3BhbiB0byBkZXRlcm1pbmUgc3RlcCBzaXplXG4gICAgbGV2ZWwgPSBNYXRoLmNlaWwoTWF0aC5sb2cobWF4YikgLyBsb2diKTtcbiAgICBtaW5zdGVwID0gb3B0Lm1pbnN0ZXAgfHwgMDtcbiAgICBzdGVwID0gTWF0aC5tYXgoXG4gICAgICBtaW5zdGVwLFxuICAgICAgTWF0aC5wb3coYmFzZSwgTWF0aC5yb3VuZChNYXRoLmxvZyhzcGFuKSAvIGxvZ2IpIC0gbGV2ZWwpXG4gICAgKTtcblxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4YikgeyBzdGVwICo9IGJhc2U7IH1cblxuICAgIC8vIGRlY3JlYXNlIHN0ZXAgc2l6ZSBpZiBhbGxvd2VkXG4gICAgZm9yIChpPTA7IGk8ZGl2Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gc3RlcCAvIGRpdltpXTtcbiAgICAgIGlmICh2ID49IG1pbnN0ZXAgJiYgc3BhbiAvIHYgPD0gbWF4Yikgc3RlcCA9IHY7XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHByZWNpc2lvbiwgbWluIGFuZCBtYXhcbiAgdiA9IE1hdGgubG9nKHN0ZXApO1xuICBwcmVjaXNpb24gPSB2ID49IDAgPyAwIDogfn4oLXYgLyBsb2diKSArIDE7XG4gIGVwcyA9IE1hdGgucG93KGJhc2UsIC1wcmVjaXNpb24gLSAxKTtcbiAgbWluID0gTWF0aC5taW4obWluLCBNYXRoLmZsb29yKG1pbiAvIHN0ZXAgKyBlcHMpICogc3RlcCk7XG4gIG1heCA9IE1hdGguY2VpbChtYXggLyBzdGVwKSAqIHN0ZXA7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogbWluLFxuICAgIHN0b3A6ICBtYXgsXG4gICAgc3RlcDogIHN0ZXAsXG4gICAgdW5pdDogIHtwcmVjaXNpb246IHByZWNpc2lvbn0sXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufVxuXG5mdW5jdGlvbiBiaXNlY3QoYSwgeCwgbG8sIGhpKSB7XG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgaWYgKHV0aWwuY21wKGFbbWlkXSwgeCkgPCAwKSB7IGxvID0gbWlkICsgMTsgfVxuICAgIGVsc2UgeyBoaSA9IG1pZDsgfVxuICB9XG4gIHJldHVybiBsbztcbn1cblxuZnVuY3Rpb24gdmFsdWUodikge1xuICByZXR1cm4gdGhpcy5zdGVwICogTWF0aC5mbG9vcih2IC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGluZGV4KHYpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKHYgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBkYXRlX3ZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMudW5pdC5kYXRlKHZhbHVlLmNhbGwodGhpcywgdikpO1xufVxuXG5mdW5jdGlvbiBkYXRlX2luZGV4KHYpIHtcbiAgcmV0dXJuIGluZGV4LmNhbGwodGhpcywgdGhpcy51bml0LnVuaXQodikpO1xufVxuXG5iaW5zLmRhdGUgPSBmdW5jdGlvbihvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGRhdGUgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGZpbmQgdGltZSBzdGVwLCB0aGVuIGJpblxuICB2YXIgdW5pdHMgPSBvcHQudXRjID8gdGltZS51dGMgOiB0aW1lLFxuICAgICAgZG1pbiA9IG9wdC5taW4sXG4gICAgICBkbWF4ID0gb3B0Lm1heCxcbiAgICAgIG1heGIgPSBvcHQubWF4YmlucyB8fCAyMCxcbiAgICAgIG1pbmIgPSBvcHQubWluYmlucyB8fCA0LFxuICAgICAgc3BhbiA9ICgrZG1heCkgLSAoK2RtaW4pLFxuICAgICAgdW5pdCA9IG9wdC51bml0ID8gdW5pdHNbb3B0LnVuaXRdIDogdW5pdHMuZmluZChzcGFuLCBtaW5iLCBtYXhiKSxcbiAgICAgIHNwZWMgPSBiaW5zKHtcbiAgICAgICAgbWluOiAgICAgdW5pdC5taW4gIT0gbnVsbCA/IHVuaXQubWluIDogdW5pdC51bml0KGRtaW4pLFxuICAgICAgICBtYXg6ICAgICB1bml0Lm1heCAhPSBudWxsID8gdW5pdC5tYXggOiB1bml0LnVuaXQoZG1heCksXG4gICAgICAgIG1heGJpbnM6IG1heGIsXG4gICAgICAgIG1pbnN0ZXA6IHVuaXQubWluc3RlcCxcbiAgICAgICAgc3RlcHM6ICAgdW5pdC5zdGVwXG4gICAgICB9KTtcblxuICBzcGVjLnVuaXQgPSB1bml0O1xuICBzcGVjLmluZGV4ID0gZGF0ZV9pbmRleDtcbiAgaWYgKCFvcHQucmF3KSBzcGVjLnZhbHVlID0gZGF0ZV92YWx1ZTtcbiAgcmV0dXJuIHNwZWM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbnM7XG4iLCJ2YXIgYmlucyA9IHJlcXVpcmUoJy4vYmlucycpLFxuICAgIGdlbiAgPSByZXF1aXJlKCcuLi9nZW5lcmF0ZScpLFxuICAgIHR5cGUgPSByZXF1aXJlKCcuLi9pbXBvcnQvdHlwZScpLFxuICAgIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gICAgc3RhdHMgPSByZXF1aXJlKCcuLi9zdGF0cycpO1xuXG52YXIgcXR5cGUgPSB7XG4gICdpbnRlZ2VyJzogMSxcbiAgJ251bWJlcic6IDEsXG4gICdkYXRlJzogMVxufTtcblxuZnVuY3Rpb24gJGJpbih2YWx1ZXMsIGYsIG9wdCkge1xuICBvcHQgPSBvcHRpb25zKHZhbHVlcywgZiwgb3B0KTtcbiAgdmFyIGIgPSBzcGVjKG9wdCk7XG4gIHJldHVybiAhYiA/IChvcHQuYWNjZXNzb3IgfHwgdXRpbC5pZGVudGl0eSkgOlxuICAgIHV0aWwuJGZ1bmMoJ2JpbicsIGIudW5pdC51bml0ID9cbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIGIudmFsdWUoYi51bml0LnVuaXQoeCkpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIGIudmFsdWUoeCk7IH1cbiAgICApKG9wdC5hY2Nlc3Nvcik7XG59XG5cbmZ1bmN0aW9uIGhpc3RvZ3JhbSh2YWx1ZXMsIGYsIG9wdCkge1xuICBvcHQgPSBvcHRpb25zKHZhbHVlcywgZiwgb3B0KTtcbiAgdmFyIGIgPSBzcGVjKG9wdCk7XG4gIHJldHVybiBiID9cbiAgICBudW1lcmljYWwodmFsdWVzLCBvcHQuYWNjZXNzb3IsIGIpIDpcbiAgICBjYXRlZ29yaWNhbCh2YWx1ZXMsIG9wdC5hY2Nlc3Nvciwgb3B0ICYmIG9wdC5zb3J0KTtcbn1cblxuZnVuY3Rpb24gc3BlYyhvcHQpIHtcbiAgdmFyIHQgPSBvcHQudHlwZSwgYiA9IG51bGw7XG4gIGlmICh0ID09IG51bGwgfHwgcXR5cGVbdF0pIHtcbiAgICBpZiAodCA9PT0gJ2ludGVnZXInICYmIG9wdC5taW5zdGVwID09IG51bGwpIG9wdC5taW5zdGVwID0gMTtcbiAgICBiID0gKHQgPT09ICdkYXRlJykgPyBiaW5zLmRhdGUob3B0KSA6IGJpbnMob3B0KTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuZnVuY3Rpb24gb3B0aW9ucygpIHtcbiAgdmFyIGEgPSBhcmd1bWVudHMsXG4gICAgICBpID0gMCxcbiAgICAgIHZhbHVlcyA9IHV0aWwuaXNBcnJheShhW2ldKSA/IGFbaSsrXSA6IG51bGwsXG4gICAgICBmID0gdXRpbC5pc0Z1bmN0aW9uKGFbaV0pIHx8IHV0aWwuaXNTdHJpbmcoYVtpXSkgPyB1dGlsLiQoYVtpKytdKSA6IG51bGwsXG4gICAgICBvcHQgPSB1dGlsLmV4dGVuZCh7fSwgYVtpXSk7XG5cbiAgaWYgKHZhbHVlcykge1xuICAgIG9wdC50eXBlID0gb3B0LnR5cGUgfHwgdHlwZSh2YWx1ZXMsIGYpO1xuICAgIGlmIChxdHlwZVtvcHQudHlwZV0pIHtcbiAgICAgIHZhciBleHQgPSBzdGF0cy5leHRlbnQodmFsdWVzLCBmKTtcbiAgICAgIG9wdCA9IHV0aWwuZXh0ZW5kKHttaW46IGV4dFswXSwgbWF4OiBleHRbMV19LCBvcHQpO1xuICAgIH1cbiAgfVxuICBpZiAoZikgeyBvcHQuYWNjZXNzb3IgPSBmOyB9XG4gIHJldHVybiBvcHQ7XG59XG5cbmZ1bmN0aW9uIG51bWVyaWNhbCh2YWx1ZXMsIGYsIGIpIHtcbiAgdmFyIGggPSBnZW4ucmFuZ2UoYi5zdGFydCwgYi5zdG9wICsgYi5zdGVwLzIsIGIuc3RlcClcbiAgICAubWFwKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHt2YWx1ZTogYi52YWx1ZSh2KSwgY291bnQ6IDB9OyB9KTtcblxuICBmb3IgKHZhciBpPTAsIHYsIGo7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaiA9IGIuaW5kZXgodik7XG4gICAgICBpZiAoaiA8IDAgfHwgaiA+PSBoLmxlbmd0aCB8fCAhaXNGaW5pdGUoaikpIGNvbnRpbnVlO1xuICAgICAgaFtqXS5jb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICBoLmJpbnMgPSBiO1xuICByZXR1cm4gaDtcbn1cblxuZnVuY3Rpb24gY2F0ZWdvcmljYWwodmFsdWVzLCBmLCBzb3J0KSB7XG4gIHZhciB1ID0gc3RhdHMudW5pcXVlKHZhbHVlcywgZiksXG4gICAgICBjID0gc3RhdHMuY291bnQubWFwKHZhbHVlcywgZik7XG4gIHJldHVybiB1Lm1hcChmdW5jdGlvbihrKSB7IHJldHVybiB7dmFsdWU6IGssIGNvdW50OiBjW2tdfTsgfSlcbiAgICAuc29ydCh1dGlsLmNvbXBhcmF0b3Ioc29ydCA/ICctY291bnQnIDogJyt2YWx1ZScpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICRiaW46ICRiaW4sXG4gIGhpc3RvZ3JhbTogaGlzdG9ncmFtXG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB0eXBlID0gcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpLFxuICAgIHN0YXRzID0gcmVxdWlyZSgnLi9zdGF0cycpLFxuICAgIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGFibGU6ICAgZm9ybWF0VGFibGUsICAvLyBmb3JtYXQgYSBkYXRhIHRhYmxlXG4gIHN1bW1hcnk6IGZvcm1hdFN1bW1hcnkgLy8gZm9ybWF0IGEgZGF0YSB0YWJsZSBzdW1tYXJ5XG59O1xuXG52YXIgRk1UID0ge1xuICAnZGF0ZSc6ICAgICd8dGltZTpcIiVtLyVkLyVZICVIOiVNOiVTXCInLFxuICAnbnVtYmVyJzogICd8bnVtYmVyOlwiLjRmXCInLFxuICAnaW50ZWdlcic6ICd8bnVtYmVyOlwiZFwiJ1xufTtcblxudmFyIFBPUyA9IHtcbiAgJ251bWJlcic6ICAnbGVmdCcsXG4gICdpbnRlZ2VyJzogJ2xlZnQnXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRUYWJsZShkYXRhLCBvcHQpIHtcbiAgb3B0ID0gdXRpbC5leHRlbmQoe3NlcGFyYXRvcjonICcsIG1pbndpZHRoOiA4LCBtYXh3aWR0aDogMTV9LCBvcHQpO1xuICB2YXIgZmllbGRzID0gb3B0LmZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSksXG4gICAgICB0eXBlcyA9IHR5cGUuYWxsKGRhdGEpO1xuXG4gIGlmIChvcHQuc3RhcnQgfHwgb3B0LmxpbWl0KSB7XG4gICAgdmFyIGEgPSBvcHQuc3RhcnQgfHwgMCxcbiAgICAgICAgYiA9IG9wdC5saW1pdCA/IGEgKyBvcHQubGltaXQgOiBkYXRhLmxlbmd0aDtcbiAgICBkYXRhID0gZGF0YS5zbGljZShhLCBiKTtcbiAgfVxuXG4gIC8vIGRldGVybWluZSBjaGFyIHdpZHRoIG9mIGZpZWxkc1xuICB2YXIgbGVucyA9IGZpZWxkcy5tYXAoZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBmb3JtYXQgPSBGTVRbdHlwZXNbbmFtZV1dIHx8ICcnLFxuICAgICAgICB0ID0gdGVtcGxhdGUoJ3t7JyArIG5hbWUgKyBmb3JtYXQgKyAnfX0nKSxcbiAgICAgICAgbCA9IHN0YXRzLm1heChkYXRhLCBmdW5jdGlvbih4KSB7IHJldHVybiB0KHgpLmxlbmd0aDsgfSk7XG4gICAgbCA9IE1hdGgubWF4KE1hdGgubWluKG5hbWUubGVuZ3RoLCBvcHQubWlud2lkdGgpLCBsKTtcbiAgICByZXR1cm4gb3B0Lm1heHdpZHRoID4gMCA/IE1hdGgubWluKGwsIG9wdC5tYXh3aWR0aCkgOiBsO1xuICB9KTtcblxuICAvLyBwcmludCBoZWFkZXIgcm93XG4gIHZhciBoZWFkID0gZmllbGRzLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgcmV0dXJuIHV0aWwudHJ1bmNhdGUodXRpbC5wYWQobmFtZSwgbGVuc1tpXSwgJ2NlbnRlcicpLCBsZW5zW2ldKTtcbiAgfSkuam9pbihvcHQuc2VwYXJhdG9yKTtcblxuICAvLyBidWlsZCB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgZWFjaCByb3dcbiAgdmFyIHRtcGwgPSB0ZW1wbGF0ZShmaWVsZHMubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICByZXR1cm4gJ3t7JyArXG4gICAgICBuYW1lICtcbiAgICAgIChGTVRbdHlwZXNbbmFtZV1dIHx8ICcnKSArXG4gICAgICAoJ3xwYWQ6JyArIGxlbnNbaV0gKyAnLCcgKyAoUE9TW3R5cGVzW25hbWVdXSB8fCAncmlnaHQnKSkgK1xuICAgICAgKCd8dHJ1bmNhdGU6JyArIGxlbnNbaV0pICtcbiAgICAnfX0nO1xuICB9KS5qb2luKG9wdC5zZXBhcmF0b3IpKTtcblxuICAvLyBwcmludCB0YWJsZVxuICByZXR1cm4gaGVhZCArIFwiXFxuXCIgKyBkYXRhLm1hcCh0bXBsKS5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0U3VtbWFyeShzKSB7XG4gIHMgPSBzID8gcy5fX3N1bW1hcnlfXyA/IHMgOiBzdGF0cy5zdW1tYXJ5KHMpIDogdGhpcztcbiAgdmFyIHN0ciA9IFtdLCBpLCBuO1xuICBmb3IgKGk9MCwgbj1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdHIucHVzaCgnLS0gJyArIHNbaV0uZmllbGQgKyAnIC0tJyk7XG4gICAgaWYgKHNbaV0udHlwZSA9PT0gJ3N0cmluZycgfHwgc1tpXS5kaXN0aW5jdCA8IDEwKSB7XG4gICAgICBzdHIucHVzaChwcmludENhdGVnb3JpY2FsUHJvZmlsZShzW2ldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ci5wdXNoKHByaW50UXVhbnRpdGF0aXZlUHJvZmlsZShzW2ldKSk7XG4gICAgfVxuICAgIHN0ci5wdXNoKCcnKTtcbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiBwcmludFF1YW50aXRhdGl2ZVByb2ZpbGUocCkge1xuICByZXR1cm4gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ21pbjogICAgICAnICsgcC5taW4sXG4gICAgJ21heDogICAgICAnICsgcC5tYXgsXG4gICAgJ21lZGlhbjogICAnICsgcC5tZWRpYW4sXG4gICAgJ21lYW46ICAgICAnICsgcC5tZWFuLFxuICAgICdzdGRldjogICAgJyArIHAuc3RkZXYsXG4gICAgJ21vZGVza2V3OiAnICsgcC5tb2Rlc2tld1xuICBdLmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiBwcmludENhdGVnb3JpY2FsUHJvZmlsZShwKSB7XG4gIHZhciBsaXN0ID0gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ3RvcCB2YWx1ZXM6ICdcbiAgXTtcbiAgdmFyIHUgPSBwLnVuaXF1ZTtcbiAgdmFyIHRvcCA9IHV0aWwua2V5cyh1KVxuICAgIC5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gdVtiXSAtIHVbYV07IH0pXG4gICAgLnNsaWNlKDAsIDYpXG4gICAgLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiAnIFxcJycgKyB2ICsgJ1xcJyAoJyArIHVbdl0gKyAnKSc7IH0pO1xuICByZXR1cm4gbGlzdC5jb25jYXQodG9wKS5qb2luKCdcXG4nKTtcbn0iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIGQzX3RpbWUgPSByZXF1aXJlKCdkMy10aW1lJyksXG4gICAgZDNfdGltZUYgPSByZXF1aXJlKCdkMy10aW1lLWZvcm1hdCcpLFxuICAgIGQzX251bWJlckYgPSByZXF1aXJlKCdkMy1mb3JtYXQnKSxcbiAgICBudW1iZXJGID0gZDNfbnVtYmVyRiwgLy8gZGVmYXVsdHMgdG8gRU4tVVNcbiAgICB0aW1lRiA9IGQzX3RpbWVGLCAgICAgLy8gZGVmYXVsdHMgdG8gRU4tVVNcbiAgICB0bXBEYXRlID0gbmV3IERhdGUoMjAwMCwgMCwgMSksXG4gICAgbW9udGhGdWxsLCBtb250aEFiYnIsIGRheUZ1bGwsIGRheUFiYnI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFVwZGF0ZSBudW1iZXIgZm9ybWF0dGVyIHRvIHVzZSBwcm92aWRlZCBsb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgLy8gRm9yIG1vcmUgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1mb3JtYXRcbiAgbnVtYmVyTG9jYWxlOiBudW1iZXJMb2NhbGUsXG4gIG51bWJlcjogICAgICAgZnVuY3Rpb24oZikgeyByZXR1cm4gbnVtYmVyRi5mb3JtYXQoZik7IH0sXG4gIG51bWJlclByZWZpeDogZnVuY3Rpb24oZiwgdikgeyByZXR1cm4gbnVtYmVyRi5mb3JtYXRQcmVmaXgoZiwgdik7IH0sXG5cbiAgLy8gVXBkYXRlIHRpbWUgZm9ybWF0dGVyIHRvIHVzZSBwcm92aWRlZCBsb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgLy8gRm9yIG1vcmUgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy10aW1lLWZvcm1hdFxuICB0aW1lTG9jYWxlOiAgIHRpbWVMb2NhbGUsXG4gIHRpbWU6ICAgICAgICAgZnVuY3Rpb24oZikgeyByZXR1cm4gdGltZUYuZm9ybWF0KGYpOyB9LFxuICB1dGM6ICAgICAgICAgIGZ1bmN0aW9uKGYpIHsgcmV0dXJuIHRpbWVGLnV0Y0Zvcm1hdChmKTsgfSxcblxuICAvLyBTZXQgbnVtYmVyIGFuZCB0aW1lIGxvY2FsZSBzaW11bHRhbmVvdXNseS5cbiAgbG9jYWxlOiAgICAgICBmdW5jdGlvbihsKSB7IG51bWJlckxvY2FsZShsKTsgdGltZUxvY2FsZShsKTsgfSxcblxuICAvLyBhdXRvbWF0aWMgZm9ybWF0dGluZyBmdW5jdGlvbnNcbiAgYXV0bzoge1xuICAgIG51bWJlcjogICBhdXRvTnVtYmVyRm9ybWF0LFxuICAgIGxpbmVhcjogICBsaW5lYXJOdW1iZXJGb3JtYXQsXG4gICAgdGltZTogICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGltZUF1dG9Gb3JtYXQoKTsgfSxcbiAgICB1dGM6ICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB1dGNBdXRvRm9ybWF0KCk7IH1cbiAgfSxcblxuICBtb250aDogbW9udGhGb3JtYXQsIC8vIGZvcm1hdCBtb250aCBuYW1lIGZyb20gaW50ZWdlciBjb2RlXG4gIGRheTogICBkYXlGb3JtYXQgICAgLy8gZm9ybWF0IHdlZWsgZGF5IG5hbWUgZnJvbSBpbnRlZ2VyIGNvZGVcbn07XG5cbi8vIC0tIExvY2FsZXMgLS0tLVxuXG4vLyB0cmFuc2Zvcm0gJ2VuLVVTJyBzdHlsZSBsb2NhbGUgc3RyaW5nIHRvIG1hdGNoIGQzLWZvcm1hdCB2MC40KyBjb252ZW50aW9uXG5mdW5jdGlvbiBsb2NhbGVSZWYobCkge1xuICByZXR1cm4gbC5sZW5ndGggPiA0ICYmICdsb2NhbGUnICsgKFxuICAgIGxbMF0udG9VcHBlckNhc2UoKSArIGxbMV0udG9Mb3dlckNhc2UoKSArXG4gICAgbFszXS50b1VwcGVyQ2FzZSgpICsgbFs0XS50b0xvd2VyQ2FzZSgpXG4gICk7XG59XG5cbmZ1bmN0aW9uIG51bWJlckxvY2FsZShsKSB7XG4gIHZhciBmID0gdXRpbC5pc1N0cmluZyhsKSA/IGQzX251bWJlckZbbG9jYWxlUmVmKGwpXSA6IGQzX251bWJlckYubG9jYWxlKGwpO1xuICBpZiAoZiA9PSBudWxsKSB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIGxvY2FsZTogJyArIGwpO1xuICBudW1iZXJGID0gZjtcbn1cblxuZnVuY3Rpb24gdGltZUxvY2FsZShsKSB7XG4gIHZhciBmID0gdXRpbC5pc1N0cmluZyhsKSA/IGQzX3RpbWVGW2xvY2FsZVJlZihsKV0gOiBkM190aW1lRi5sb2NhbGUobCk7XG4gIGlmIChmID09IG51bGwpIHRocm93IEVycm9yKCdVbnJlY29nbml6ZWQgbG9jYWxlOiAnICsgbCk7XG4gIHRpbWVGID0gZjtcbiAgbW9udGhGdWxsID0gbW9udGhBYmJyID0gZGF5RnVsbCA9IGRheUFiYnIgPSBudWxsO1xufVxuXG4vLyAtLSBOdW1iZXIgRm9ybWF0dGluZyAtLS0tXG5cbnZhciBlMTAgPSBNYXRoLnNxcnQoNTApLFxuICAgIGU1ID0gTWF0aC5zcXJ0KDEwKSxcbiAgICBlMiA9IE1hdGguc3FydCgyKTtcblxuZnVuY3Rpb24gbGluZWFyUmFuZ2UoZG9tYWluLCBjb3VudCkge1xuICBpZiAoIWRvbWFpbi5sZW5ndGgpIGRvbWFpbiA9IFswXTtcbiAgaWYgKGNvdW50ID09IG51bGwpIGNvdW50ID0gMTA7XG5cbiAgdmFyIHN0YXJ0ID0gZG9tYWluWzBdLFxuICAgICAgc3RvcCA9IGRvbWFpbltkb21haW4ubGVuZ3RoIC0gMV07XG5cbiAgaWYgKHN0b3AgPCBzdGFydCkgeyBlcnJvciA9IHN0b3A7IHN0b3AgPSBzdGFydDsgc3RhcnQgPSBlcnJvcjsgfVxuXG4gIHZhciBzcGFuID0gKHN0b3AgLSBzdGFydCkgfHwgKGNvdW50ID0gMSwgc3RhcnQgfHwgc3RvcCB8fCAxKSxcbiAgICAgIHN0ZXAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzcGFuIC8gY291bnQpIC8gTWF0aC5MTjEwKSksXG4gICAgICBlcnJvciA9IHNwYW4gLyBjb3VudCAvIHN0ZXA7XG5cbiAgLy8gRmlsdGVyIHRpY2tzIHRvIGdldCBjbG9zZXIgdG8gdGhlIGRlc2lyZWQgY291bnQuXG4gIGlmIChlcnJvciA+PSBlMTApIHN0ZXAgKj0gMTA7XG4gIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwICo9IDU7XG4gIGVsc2UgaWYgKGVycm9yID49IGUyKSBzdGVwICo9IDI7XG5cbiAgLy8gUm91bmQgc3RhcnQgYW5kIHN0b3AgdmFsdWVzIHRvIHN0ZXAgaW50ZXJ2YWwuXG4gIHJldHVybiBbXG4gICAgTWF0aC5jZWlsKHN0YXJ0IC8gc3RlcCkgKiBzdGVwLFxuICAgIE1hdGguZmxvb3Ioc3RvcCAvIHN0ZXApICogc3RlcCArIHN0ZXAgLyAyLCAvLyBpbmNsdXNpdmVcbiAgICBzdGVwXG4gIF07XG59XG5cbmZ1bmN0aW9uIHRyaW1aZXJvKGYsIGRlY2ltYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgcyA9IGYoeCksXG4gICAgICAgIG4gPSBzLmluZGV4T2YoZGVjaW1hbCk7XG4gICAgaWYgKG4gPCAwKSByZXR1cm4gcztcblxuICAgIHZhciBpZHggPSByaWdodG1vc3REaWdpdChzLCBuKSxcbiAgICAgICAgZW5kID0gaWR4IDwgcy5sZW5ndGggPyBzLnNsaWNlKGlkeCkgOiAnJztcblxuICAgIHdoaWxlICgtLWlkeCA+IG4pIHtcbiAgICAgIGlmIChzW2lkeF0gIT09ICcwJykgeyArK2lkeDsgYnJlYWs7IH1cbiAgICB9XG4gICAgcmV0dXJuIHMuc2xpY2UoMCwgaWR4KSArIGVuZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmlnaHRtb3N0RGlnaXQocywgbikge1xuICB2YXIgaSA9IHMubGFzdEluZGV4T2YoJ2UnKSwgYztcbiAgaWYgKGkgPiAwKSByZXR1cm4gaTtcbiAgZm9yIChpPXMubGVuZ3RoOyAtLWkgPiBuOykge1xuICAgIGMgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGMgPj0gNDggJiYgYyA8PSA1NykgcmV0dXJuIGkrMTsgLy8gaXMgZGlnaXRcbiAgfVxufVxuXG5mdW5jdGlvbiBhdXRvTnVtYmVyRm9ybWF0KGYpIHtcbiAgdmFyIGRlY2ltYWwgPSBudW1iZXJGLmZvcm1hdCgnLjFmJykoMSlbMV07IC8vIGdldCBkZWNpbWFsIGNoYXJcbiAgaWYgKGYgPT0gbnVsbCkgZiA9ICcsJztcbiAgZiA9IGQzX251bWJlckYuZm9ybWF0U3BlY2lmaWVyKGYpO1xuICBpZiAoZi5wcmVjaXNpb24gPT0gbnVsbCkgZi5wcmVjaXNpb24gPSAxMjtcbiAgc3dpdGNoIChmLnR5cGUpIHtcbiAgICBjYXNlICclJzogZi5wcmVjaXNpb24gLT0gMjsgYnJlYWs7XG4gICAgY2FzZSAnZSc6IGYucHJlY2lzaW9uIC09IDE7IGJyZWFrO1xuICB9XG4gIHJldHVybiB0cmltWmVybyhudW1iZXJGLmZvcm1hdChmKSwgZGVjaW1hbCk7XG59XG5cbmZ1bmN0aW9uIGxpbmVhck51bWJlckZvcm1hdChkb21haW4sIGNvdW50LCBmKSB7XG4gIHZhciByYW5nZSA9IGxpbmVhclJhbmdlKGRvbWFpbiwgY291bnQpO1xuXG4gIGlmIChmID09IG51bGwpIGYgPSAnLGYnO1xuXG4gIHN3aXRjaCAoZiA9IGQzX251bWJlckYuZm9ybWF0U3BlY2lmaWVyKGYpLCBmLnR5cGUpIHtcbiAgICBjYXNlICdzJzoge1xuICAgICAgdmFyIHZhbHVlID0gTWF0aC5tYXgoTWF0aC5hYnMocmFuZ2VbMF0pLCBNYXRoLmFicyhyYW5nZVsxXSkpO1xuICAgICAgaWYgKGYucHJlY2lzaW9uID09IG51bGwpIGYucHJlY2lzaW9uID0gZDNfbnVtYmVyRi5wcmVjaXNpb25QcmVmaXgocmFuZ2VbMl0sIHZhbHVlKTtcbiAgICAgIHJldHVybiBudW1iZXJGLmZvcm1hdFByZWZpeChmLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNhc2UgJyc6XG4gICAgY2FzZSAnZSc6XG4gICAgY2FzZSAnZyc6XG4gICAgY2FzZSAncCc6XG4gICAgY2FzZSAncic6IHtcbiAgICAgIGlmIChmLnByZWNpc2lvbiA9PSBudWxsKSBmLnByZWNpc2lvbiA9IGQzX251bWJlckYucHJlY2lzaW9uUm91bmQocmFuZ2VbMl0sIE1hdGgubWF4KE1hdGguYWJzKHJhbmdlWzBdKSwgTWF0aC5hYnMocmFuZ2VbMV0pKSkgLSAoZi50eXBlID09PSAnZScpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ2YnOlxuICAgIGNhc2UgJyUnOiB7XG4gICAgICBpZiAoZi5wcmVjaXNpb24gPT0gbnVsbCkgZi5wcmVjaXNpb24gPSBkM19udW1iZXJGLnByZWNpc2lvbkZpeGVkKHJhbmdlWzJdKSAtIDIgKiAoZi50eXBlID09PSAnJScpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXJGLmZvcm1hdChmKTtcbn1cblxuLy8gLS0gRGF0ZXRpbWUgRm9ybWF0dGluZyAtLS0tXG5cbmZ1bmN0aW9uIHRpbWVBdXRvRm9ybWF0KCkge1xuICB2YXIgZiA9IHRpbWVGLmZvcm1hdCxcbiAgICAgIGZvcm1hdE1pbGxpc2Vjb25kID0gZignLiVMJyksXG4gICAgICBmb3JtYXRTZWNvbmQgPSBmKCc6JVMnKSxcbiAgICAgIGZvcm1hdE1pbnV0ZSA9IGYoJyVJOiVNJyksXG4gICAgICBmb3JtYXRIb3VyID0gZignJUkgJXAnKSxcbiAgICAgIGZvcm1hdERheSA9IGYoJyVhICVkJyksXG4gICAgICBmb3JtYXRXZWVrID0gZignJWIgJWQnKSxcbiAgICAgIGZvcm1hdE1vbnRoID0gZignJUInKSxcbiAgICAgIGZvcm1hdFllYXIgPSBmKCclWScpO1xuXG4gIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGQgPSArZGF0ZTtcbiAgICByZXR1cm4gKGQzX3RpbWUuc2Vjb25kKGRhdGUpIDwgZCA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgIDogZDNfdGltZS5taW51dGUoZGF0ZSkgPCBkID8gZm9ybWF0U2Vjb25kXG4gICAgICAgIDogZDNfdGltZS5ob3VyKGRhdGUpIDwgZCA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICA6IGQzX3RpbWUuZGF5KGRhdGUpIDwgZCA/IGZvcm1hdEhvdXJcbiAgICAgICAgOiBkM190aW1lLm1vbnRoKGRhdGUpIDwgZCA/XG4gICAgICAgICAgKGQzX3RpbWUud2VlayhkYXRlKSA8IGQgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICA6IGQzX3RpbWUueWVhcihkYXRlKSA8IGQgPyBmb3JtYXRNb250aFxuICAgICAgICA6IGZvcm1hdFllYXIpKGRhdGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1dGNBdXRvRm9ybWF0KCkge1xuICB2YXIgZiA9IHRpbWVGLnV0Y0Zvcm1hdCxcbiAgICAgIGZvcm1hdE1pbGxpc2Vjb25kID0gZignLiVMJyksXG4gICAgICBmb3JtYXRTZWNvbmQgPSBmKCc6JVMnKSxcbiAgICAgIGZvcm1hdE1pbnV0ZSA9IGYoJyVJOiVNJyksXG4gICAgICBmb3JtYXRIb3VyID0gZignJUkgJXAnKSxcbiAgICAgIGZvcm1hdERheSA9IGYoJyVhICVkJyksXG4gICAgICBmb3JtYXRXZWVrID0gZignJWIgJWQnKSxcbiAgICAgIGZvcm1hdE1vbnRoID0gZignJUInKSxcbiAgICAgIGZvcm1hdFllYXIgPSBmKCclWScpO1xuXG4gIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGQgPSArZGF0ZTtcbiAgICByZXR1cm4gKGQzX3RpbWUudXRjU2Vjb25kKGRhdGUpIDwgZCA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgIDogZDNfdGltZS51dGNNaW51dGUoZGF0ZSkgPCBkID8gZm9ybWF0U2Vjb25kXG4gICAgICAgIDogZDNfdGltZS51dGNIb3VyKGRhdGUpIDwgZCA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICA6IGQzX3RpbWUudXRjRGF5KGRhdGUpIDwgZCA/IGZvcm1hdEhvdXJcbiAgICAgICAgOiBkM190aW1lLnV0Y01vbnRoKGRhdGUpIDwgZCA/XG4gICAgICAgICAgKGQzX3RpbWUudXRjV2VlayhkYXRlKSA8IGQgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICA6IGQzX3RpbWUudXRjWWVhcihkYXRlKSA8IGQgPyBmb3JtYXRNb250aFxuICAgICAgICA6IGZvcm1hdFllYXIpKGRhdGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtb250aEZvcm1hdChtb250aCwgYWJicmV2aWF0ZSkge1xuICB2YXIgZiA9IGFiYnJldmlhdGUgP1xuICAgIChtb250aEFiYnIgfHwgKG1vbnRoQWJiciA9IHRpbWVGLmZvcm1hdCgnJWInKSkpIDpcbiAgICAobW9udGhGdWxsIHx8IChtb250aEZ1bGwgPSB0aW1lRi5mb3JtYXQoJyVCJykpKTtcbiAgcmV0dXJuICh0bXBEYXRlLnNldE1vbnRoKG1vbnRoKSwgZih0bXBEYXRlKSk7XG59XG5cbmZ1bmN0aW9uIGRheUZvcm1hdChkYXksIGFiYnJldmlhdGUpIHtcbiAgdmFyIGYgPSBhYmJyZXZpYXRlID9cbiAgICAoZGF5QWJiciB8fCAoZGF5QWJiciA9IHRpbWVGLmZvcm1hdCgnJWEnKSkpIDpcbiAgICAoZGF5RnVsbCB8fCAoZGF5RnVsbCA9IHRpbWVGLmZvcm1hdCgnJUEnKSkpO1xuICByZXR1cm4gKHRtcERhdGUuc2V0TW9udGgoMCksIHRtcERhdGUuc2V0RGF0ZSgyICsgZGF5KSwgZih0bXBEYXRlKSk7XG59IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBnZW4gPSBtb2R1bGUuZXhwb3J0cztcblxuZ2VuLnJlcGVhdCA9IGZ1bmN0aW9uKHZhbCwgbikge1xuICB2YXIgYSA9IEFycmF5KG4pLCBpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIGFbaV0gPSB2YWw7XG4gIHJldHVybiBhO1xufTtcblxuZ2VuLnplcm9zID0gZnVuY3Rpb24obikge1xuICByZXR1cm4gZ2VuLnJlcGVhdCgwLCBuKTtcbn07XG5cbmdlbi5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgIHN0ZXAgPSAxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoKHN0b3AgLSBzdGFydCkgLyBzdGVwID09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIHJhbmdlJyk7XG4gIHZhciByYW5nZSA9IFtdLCBpID0gLTEsIGo7XG4gIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIGVsc2Ugd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA8IHN0b3ApIHJhbmdlLnB1c2goaik7XG4gIHJldHVybiByYW5nZTtcbn07XG5cbmdlbi5yYW5kb20gPSB7fTtcblxuZ2VuLnJhbmRvbS51bmlmb3JtID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4ID0gbWluID09PSB1bmRlZmluZWQgPyAxIDogbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cbiAgdmFyIGQgPSBtYXggLSBtaW47XG4gIHZhciBmID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1pbiArIGQgKiBNYXRoLnJhbmRvbSgpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7XG4gICAgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7XG4gIH07XG4gIGYucGRmID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpID8gMS9kIDogMDtcbiAgfTtcbiAgZi5jZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPCBtaW4gPyAwIDogeCA+IG1heCA/IDEgOiAoeCAtIG1pbikgLyBkO1xuICB9O1xuICBmLmljZGYgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIChwID49IDAgJiYgcCA8PSAxKSA/IG1pbiArIHAqZCA6IE5hTjtcbiAgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICBiID0gYTtcbiAgICBhID0gMDtcbiAgfVxuICB2YXIgZCA9IGIgLSBhO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihkICogTWF0aC5yYW5kb20oKSk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHtcbiAgICByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTtcbiAgfTtcbiAgZi5wZGYgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4ID09PSBNYXRoLmZsb29yKHgpICYmIHggPj0gYSAmJiB4IDwgYikgPyAxL2QgOiAwO1xuICB9O1xuICBmLmNkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgdiA9IE1hdGguZmxvb3IoeCk7XG4gICAgcmV0dXJuIHYgPCBhID8gMCA6IHYgPj0gYiA/IDEgOiAodiAtIGEgKyAxKSAvIGQ7XG4gIH07XG4gIGYuaWNkZiA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gKHAgPj0gMCAmJiBwIDw9IDEpID8gYSAtIDEgKyBNYXRoLmZsb29yKHAqZCkgOiBOYU47XG4gIH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ub3JtYWwgPSBmdW5jdGlvbihtZWFuLCBzdGRldikge1xuICBtZWFuID0gbWVhbiB8fCAwO1xuICBzdGRldiA9IHN0ZGV2IHx8IDE7XG4gIHZhciBuZXh0O1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gMCwgeSA9IDAsIHJkcywgYztcbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4ID0gbmV4dDtcbiAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgZG8ge1xuICAgICAgeCA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgcmRzID0geCp4ICsgeSp5O1xuICAgIH0gd2hpbGUgKHJkcyA9PT0gMCB8fCByZHMgPiAxKTtcbiAgICBjID0gTWF0aC5zcXJ0KC0yKk1hdGgubG9nKHJkcykvcmRzKTsgLy8gQm94LU11bGxlciB0cmFuc2Zvcm1cbiAgICBuZXh0ID0gbWVhbiArIHkqYypzdGRldjtcbiAgICByZXR1cm4gbWVhbiArIHgqYypzdGRldjtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICBmLnBkZiA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZXhwID0gTWF0aC5leHAoTWF0aC5wb3coeC1tZWFuLCAyKSAvICgtMiAqIE1hdGgucG93KHN0ZGV2LCAyKSkpO1xuICAgIHJldHVybiAoMSAvIChzdGRldiAqIE1hdGguc3FydCgyKk1hdGguUEkpKSkgKiBleHA7XG4gIH07XG4gIGYuY2RmID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gZnJvbSBXZXN0ICgyMDA5KVxuICAgIC8vIEJldHRlciBBcHByb3hpbWF0aW9ucyB0byBDdW11bGF0aXZlIE5vcm1hbCBGdW5jdGlvbnNcbiAgICB2YXIgY2QsXG4gICAgICAgIHogPSAoeCAtIG1lYW4pIC8gc3RkZXYsXG4gICAgICAgIFogPSBNYXRoLmFicyh6KTtcbiAgICBpZiAoWiA+IDM3KSB7XG4gICAgICBjZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdW0sIGV4cCA9IE1hdGguZXhwKC1aKlovMik7XG4gICAgICBpZiAoWiA8IDcuMDcxMDY3ODExODY1NDcpIHtcbiAgICAgICAgc3VtID0gMy41MjYyNDk2NTk5ODkxMWUtMDIgKiBaICsgMC43MDAzODMwNjQ0NDM2ODg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA2LjM3Mzk2MjIwMzUzMTY1O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMzMuOTEyODY2MDc4MzgzO1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgMTEyLjA3OTI5MTQ5Nzg3MTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDIyMS4yMTM1OTYxNjk5MzE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyMjAuMjA2ODY3OTEyMzc2O1xuICAgICAgICBjZCA9IGV4cCAqIHN1bTtcbiAgICAgICAgc3VtID0gOC44Mzg4MzQ3NjQ4MzE4NGUtMDIgKiBaICsgMS43NTU2NjcxNjMxODI2NDtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDE2LjA2NDE3NzU3OTIwNztcbiAgICAgICAgc3VtID0gc3VtICogWiArIDg2Ljc4MDczMjIwMjk0NjE7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyAyOTYuNTY0MjQ4Nzc5Njc0O1xuICAgICAgICBzdW0gPSBzdW0gKiBaICsgNjM3LjMzMzYzMzM3ODgzMTtcbiAgICAgICAgc3VtID0gc3VtICogWiArIDc5My44MjY1MTI1MTk5NDg7XG4gICAgICAgIHN1bSA9IHN1bSAqIFogKyA0NDAuNDEzNzM1ODI0NzUyO1xuICAgICAgICBjZCA9IGNkIC8gc3VtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtID0gWiArIDAuNjU7XG4gICAgICAgIHN1bSA9IFogKyA0IC8gc3VtO1xuICAgICAgICBzdW0gPSBaICsgMyAvIHN1bTtcbiAgICAgICAgc3VtID0gWiArIDIgLyBzdW07XG4gICAgICAgIHN1bSA9IFogKyAxIC8gc3VtO1xuICAgICAgICBjZCA9IGV4cCAvIHN1bSAvIDIuNTA2NjI4Mjc0NjMxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geiA+IDAgPyAxIC0gY2QgOiBjZDtcbiAgfTtcbiAgZi5pY2RmID0gZnVuY3Rpb24ocCkge1xuICAgIC8vIEFwcHJveGltYXRpb24gb2YgUHJvYml0IGZ1bmN0aW9uIHVzaW5nIGludmVyc2UgZXJyb3IgZnVuY3Rpb24uXG4gICAgaWYgKHAgPD0gMCB8fCBwID49IDEpIHJldHVybiBOYU47XG4gICAgdmFyIHggPSAyKnAgLSAxLFxuICAgICAgICB2ID0gKDggKiAoTWF0aC5QSSAtIDMpKSAvICgzICogTWF0aC5QSSAqICg0LU1hdGguUEkpKSxcbiAgICAgICAgYSA9ICgyIC8gKE1hdGguUEkqdikpICsgKE1hdGgubG9nKDEgLSBNYXRoLnBvdyh4LDIpKSAvIDIpLFxuICAgICAgICBiID0gTWF0aC5sb2coMSAtICh4KngpKSAvIHYsXG4gICAgICAgIHMgPSAoeCA+IDAgPyAxIDogLTEpICogTWF0aC5zcXJ0KE1hdGguc3FydCgoYSphKSAtIGIpIC0gYSk7XG4gICAgcmV0dXJuIG1lYW4gKyBzdGRldiAqIE1hdGguU1FSVDIgKiBzO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20uYm9vdHN0cmFwID0gZnVuY3Rpb24oZG9tYWluLCBzbW9vdGgpIHtcbiAgLy8gR2VuZXJhdGVzIGEgYm9vdHN0cmFwIHNhbXBsZSBmcm9tIGEgc2V0IG9mIG9ic2VydmF0aW9ucy5cbiAgLy8gU21vb3RoIGJvb3RzdHJhcHBpbmcgYWRkcyByYW5kb20gemVyby1jZW50ZXJlZCBub2lzZSB0byB0aGUgc2FtcGxlcy5cbiAgdmFyIHZhbCA9IGRvbWFpbi5maWx0ZXIodXRpbC5pc1ZhbGlkKSxcbiAgICAgIGxlbiA9IHZhbC5sZW5ndGgsXG4gICAgICBlcnIgPSBzbW9vdGggPyBnZW4ucmFuZG9tLm5vcm1hbCgwLCBzbW9vdGgpIDogbnVsbDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsW35+KE1hdGgucmFuZG9tKCkqbGVuKV0gKyAoZXJyID8gZXJyKCkgOiAwKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBnZW4uemVyb3MobikubWFwKGYpO1xuICB9O1xuICByZXR1cm4gZjtcbn07IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG52YXIgZDNfZHN2ID0gcmVxdWlyZSgnZDMtZHN2Jyk7XG5cbmZ1bmN0aW9uIGRzdihkYXRhLCBmb3JtYXQpIHtcbiAgaWYgKGRhdGEpIHtcbiAgICB2YXIgaCA9IGZvcm1hdC5oZWFkZXI7XG4gICAgZGF0YSA9IChoID8gaC5qb2luKGZvcm1hdC5kZWxpbWl0ZXIpICsgJ1xcbicgOiAnJykgKyBkYXRhO1xuICB9XG4gIHJldHVybiBkM19kc3YuZHN2KGZvcm1hdC5kZWxpbWl0ZXIpLnBhcnNlKGRhdGEpO1xufVxuXG5kc3YuZGVsaW1pdGVyID0gZnVuY3Rpb24oZGVsaW0pIHtcbiAgdmFyIGZtdCA9IHtkZWxpbWl0ZXI6IGRlbGltfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEsIGZvcm1hdCkge1xuICAgIHJldHVybiBkc3YoZGF0YSwgZm9ybWF0ID8gdXRpbC5leHRlbmQoZm9ybWF0LCBmbXQpIDogZm10KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZHN2O1xuIiwidmFyIGRzdiA9IHJlcXVpcmUoJy4vZHN2Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBqc29uOiByZXF1aXJlKCcuL2pzb24nKSxcbiAgdG9wb2pzb246IHJlcXVpcmUoJy4vdG9wb2pzb24nKSxcbiAgdHJlZWpzb246IHJlcXVpcmUoJy4vdHJlZWpzb24nKSxcbiAgZHN2OiBkc3YsXG4gIGNzdjogZHN2LmRlbGltaXRlcignLCcpLFxuICB0c3Y6IGRzdi5kZWxpbWl0ZXIoJ1xcdCcpXG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciBkID0gdXRpbC5pc09iamVjdChkYXRhKSAmJiAhdXRpbC5pc0J1ZmZlcihkYXRhKSA/XG4gICAgZGF0YSA6IEpTT04ucGFyc2UoZGF0YSk7XG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LnByb3BlcnR5KSB7XG4gICAgZCA9IHV0aWwuYWNjZXNzb3IoZm9ybWF0LnByb3BlcnR5KShkKTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG4iLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xuXG52YXIgcmVhZGVyID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciB0b3BvanNvbiA9IHJlYWRlci50b3BvanNvbjtcbiAgaWYgKHRvcG9qc29uID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ1RvcG9KU09OIGxpYnJhcnkgbm90IGxvYWRlZC4nKTsgfVxuXG4gIHZhciB0ID0ganNvbihkYXRhLCBmb3JtYXQpLCBvYmo7XG5cbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQuZmVhdHVyZSkge1xuICAgIGlmICgob2JqID0gdC5vYmplY3RzW2Zvcm1hdC5mZWF0dXJlXSkpIHtcbiAgICAgIHJldHVybiB0b3BvanNvbi5mZWF0dXJlKHQsIG9iaikuZmVhdHVyZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIFRvcG9KU09OIG9iamVjdDogJyArIGZvcm1hdC5mZWF0dXJlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybWF0ICYmIGZvcm1hdC5tZXNoKSB7XG4gICAgaWYgKChvYmogPSB0Lm9iamVjdHNbZm9ybWF0Lm1lc2hdKSkge1xuICAgICAgcmV0dXJuIFt0b3BvanNvbi5tZXNoKHQsIHQub2JqZWN0c1tmb3JtYXQubWVzaF0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVG9wb0pTT04gb2JqZWN0OiAnICsgZm9ybWF0Lm1lc2gpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignTWlzc2luZyBUb3BvSlNPTiBmZWF0dXJlIG9yIG1lc2ggcGFyYW1ldGVyLicpO1xuICB9XG59O1xuXG5yZWFkZXIudG9wb2pzb24gPSByZXF1aXJlKCd0b3BvanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZWFkZXI7XG4iLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyZWUsIGZvcm1hdCkge1xuICByZXR1cm4gdG9UYWJsZShqc29uKHRyZWUsIGZvcm1hdCksIGZvcm1hdCk7XG59O1xuXG5mdW5jdGlvbiB0b1RhYmxlKHJvb3QsIGZpZWxkcykge1xuICB2YXIgY2hpbGRyZW5GaWVsZCA9IGZpZWxkcyAmJiBmaWVsZHMuY2hpbGRyZW4gfHwgJ2NoaWxkcmVuJyxcbiAgICAgIHBhcmVudEZpZWxkID0gZmllbGRzICYmIGZpZWxkcy5wYXJlbnQgfHwgJ3BhcmVudCcsXG4gICAgICB0YWJsZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIHZpc2l0KG5vZGUsIHBhcmVudCkge1xuICAgIG5vZGVbcGFyZW50RmllbGRdID0gcGFyZW50O1xuICAgIHRhYmxlLnB1c2gobm9kZSk7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZVtjaGlsZHJlbkZpZWxkXTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICB2aXNpdChjaGlsZHJlbltpXSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmlzaXQocm9vdCwgbnVsbCk7XG4gIHJldHVybiAodGFibGUucm9vdCA9IHJvb3QsIHRhYmxlKTtcbn1cbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuXG4vLyBNYXRjaGVzIGFic29sdXRlIFVSTHMgd2l0aCBvcHRpb25hbCBwcm90b2NvbFxuLy8gICBodHRwczovLy4uLiAgICBmaWxlOi8vLi4uICAgIC8vLi4uXG52YXIgcHJvdG9jb2xfcmUgPSAvXihbQS1aYS16XSs6KT9cXC9cXC8vO1xuXG4vLyBTcGVjaWFsIHRyZWF0bWVudCBpbiBub2RlLmpzIGZvciB0aGUgZmlsZTogcHJvdG9jb2xcbnZhciBmaWxlUHJvdG9jb2wgPSAnZmlsZTovLyc7XG5cbi8vIFZhbGlkYXRlIGFuZCBjbGVhbnVwIFVSTCB0byBlbnN1cmUgdGhhdCBpdCBpcyBhbGxvd2VkIHRvIGJlIGFjY2Vzc2VkXG4vLyBSZXR1cm5zIGNsZWFuZWQgdXAgVVJMLCBvciBmYWxzZSBpZiBhY2Nlc3MgaXMgbm90IGFsbG93ZWRcbmZ1bmN0aW9uIHNhbml0aXplVXJsKG9wdCkge1xuICB2YXIgdXJsID0gb3B0LnVybDtcbiAgaWYgKCF1cmwgJiYgb3B0LmZpbGUpIHsgcmV0dXJuIGZpbGVQcm90b2NvbCArIG9wdC5maWxlOyB9XG5cbiAgLy8gSW4gY2FzZSB0aGlzIGlzIGEgcmVsYXRpdmUgdXJsIChoYXMgbm8gaG9zdCksIHByZXBlbmQgb3B0LmJhc2VVUkxcbiAgaWYgKG9wdC5iYXNlVVJMICYmICFwcm90b2NvbF9yZS50ZXN0KHVybCkpIHtcbiAgICBpZiAoIXN0YXJ0c1dpdGgodXJsLCAnLycpICYmIG9wdC5iYXNlVVJMW29wdC5iYXNlVVJMLmxlbmd0aC0xXSAhPT0gJy8nKSB7XG4gICAgICB1cmwgPSAnLycgKyB1cmw7IC8vIEVuc3VyZSB0aGF0IHRoZXJlIGlzIGEgc2xhc2ggYmV0d2VlbiB0aGUgYmFzZVVSTCAoZS5nLiBob3N0bmFtZSkgYW5kIHVybFxuICAgIH1cbiAgICB1cmwgPSBvcHQuYmFzZVVSTCArIHVybDtcbiAgfVxuICAvLyByZWxhdGl2ZSBwcm90b2NvbCwgc3RhcnRzIHdpdGggJy8vJ1xuICBpZiAoIWxvYWQudXNlWEhSICYmIHN0YXJ0c1dpdGgodXJsLCAnLy8nKSkge1xuICAgIHVybCA9IChvcHQuZGVmYXVsdFByb3RvY29sIHx8ICdodHRwJykgKyAnOicgKyB1cmw7XG4gIH1cbiAgLy8gSWYgb3B0LmRvbWFpbldoaXRlTGlzdCBpcyBzZXQsIG9ubHkgYWxsb3dzIHVybCwgd2hvc2UgaG9zdG5hbWVcbiAgLy8gKiBJcyB0aGUgc2FtZSBhcyB0aGUgb3JpZ2luICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpXG4gIC8vICogRXF1YWxzIG9uZSBvZiB0aGUgdmFsdWVzIGluIHRoZSB3aGl0ZWxpc3RcbiAgLy8gKiBJcyBhIHByb3BlciBzdWJkb21haW4gb2Ygb25lIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHdoaXRlbGlzdFxuICBpZiAob3B0LmRvbWFpbldoaXRlTGlzdCkge1xuICAgIHZhciBkb21haW4sIG9yaWdpbjtcbiAgICBpZiAobG9hZC51c2VYSFIpIHtcbiAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgLy8gRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzczNjUxMy9ob3ctZG8taS1wYXJzZS1hLXVybC1pbnRvLWhvc3RuYW1lLWFuZC1wYXRoLWluLWphdmFzY3JpcHRcbiAgICAgIC8vIElFIGRvZXNuJ3QgcG9wdWxhdGUgYWxsIGxpbmsgcHJvcGVydGllcyB3aGVuIHNldHRpbmcgLmhyZWYgd2l0aCBhIHJlbGF0aXZlIFVSTCxcbiAgICAgIC8vIGhvd2V2ZXIgLmhyZWYgd2lsbCByZXR1cm4gYW4gYWJzb2x1dGUgVVJMIHdoaWNoIHRoZW4gY2FuIGJlIHVzZWQgb24gaXRzZWxmXG4gICAgICAvLyB0byBwb3B1bGF0ZSB0aGVzZSBhZGRpdGlvbmFsIGZpZWxkcy5cbiAgICAgIGlmIChhLmhvc3QgPT09ICcnKSB7XG4gICAgICAgIGEuaHJlZiA9IGEuaHJlZjtcbiAgICAgIH1cbiAgICAgIGRvbWFpbiA9IGEuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIG9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVsYXRpdmUgcHJvdG9jb2wgaXMgYnJva2VuOiBodHRwczovL2dpdGh1Yi5jb20vZGVmdW5jdHpvbWJpZS9ub2RlLXVybC9pc3N1ZXMvNVxuICAgICAgdmFyIHBhcnRzID0gcmVxdWlyZSgndXJsJykucGFyc2UodXJsKTtcbiAgICAgIGRvbWFpbiA9IHBhcnRzLmhvc3RuYW1lO1xuICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAob3JpZ2luICE9PSBkb21haW4pIHtcbiAgICAgIHZhciB3aGl0ZUxpc3RlZCA9IG9wdC5kb21haW5XaGl0ZUxpc3Quc29tZShmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBpZHggPSBkb21haW4ubGVuZ3RoIC0gZC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBkID09PSBkb21haW4gfHxcbiAgICAgICAgICAoaWR4ID4gMSAmJiBkb21haW5baWR4LTFdID09PSAnLicgJiYgZG9tYWluLmxhc3RJbmRleE9mKGQpID09PSBpZHgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIXdoaXRlTGlzdGVkKSB7XG4gICAgICAgIHRocm93ICdVUkwgaXMgbm90IHdoaXRlbGlzdGVkOiAnICsgdXJsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufVxuXG5mdW5jdGlvbiBsb2FkKG9wdCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIGxvYWQubG9hZGVyKG9wdCwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBsb2FkZXIob3B0LCBjYWxsYmFjaykge1xuICB2YXIgZXJyb3IgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlKSB7IHRocm93IGU7IH0sIHVybDtcblxuICB0cnkge1xuICAgIHVybCA9IGxvYWQuc2FuaXRpemVVcmwob3B0KTsgLy8gZW5hYmxlIG92ZXJyaWRlXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yKGVycik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICBlcnJvcignSW52YWxpZCBVUkw6ICcgKyBvcHQudXJsKTtcbiAgfSBlbHNlIGlmIChsb2FkLnVzZVhIUikge1xuICAgIC8vIG9uIGNsaWVudCwgdXNlIHhoclxuICAgIHJldHVybiBsb2FkLnhocih1cmwsIG9wdCwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHN0YXJ0c1dpdGgodXJsLCBmaWxlUHJvdG9jb2wpKSB7XG4gICAgLy8gb24gc2VydmVyLCBpZiB1cmwgc3RhcnRzIHdpdGggJ2ZpbGU6Ly8nLCBzdHJpcCBpdCBhbmQgbG9hZCBmcm9tIGZpbGVcbiAgICByZXR1cm4gbG9hZC5maWxlKHVybC5zbGljZShmaWxlUHJvdG9jb2wubGVuZ3RoKSwgb3B0LCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAodXJsLmluZGV4T2YoJzovLycpIDwgMCkgeyAvLyBUT0RPIGJldHRlciBwcm90b2NvbCBjaGVjaz9cbiAgICAvLyBvbiBzZXJ2ZXIsIGlmIG5vIHByb3RvY29sIGFzc3VtZSBmaWxlXG4gICAgcmV0dXJuIGxvYWQuZmlsZSh1cmwsIG9wdCwgY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIC8vIGZvciByZWd1bGFyIFVSTHMgb24gc2VydmVyXG4gICAgcmV0dXJuIGxvYWQuaHR0cCh1cmwsIG9wdCwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHhockhhc1Jlc3BvbnNlKHJlcXVlc3QpIHtcbiAgdmFyIHR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgcmV0dXJuIHR5cGUgJiYgdHlwZSAhPT0gJ3RleHQnID9cbiAgICByZXF1ZXN0LnJlc3BvbnNlIDogLy8gbnVsbCBvbiBlcnJvclxuICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0OyAvLyAnJyBvbiBlcnJvclxufVxuXG5mdW5jdGlvbiB4aHIodXJsLCBvcHQsIGNhbGxiYWNrKSB7XG4gIHZhciBhc3luYyA9ICEhY2FsbGJhY2s7XG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8vIElmIElFIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgdXNlIFhEb21haW5SZXF1ZXN0IChjb3BpZWQgZnJvbSBkMy54aHIpXG4gIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAvXihodHRwKHMpPzopP1xcL1xcLy8udGVzdCh1cmwpKSByZXF1ZXN0ID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXM7XG4gICAgaWYgKCFzdGF0dXMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkgfHwgc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVxdWVzdCwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgaWYgKCdvbmxvYWQnIGluIHJlcXVlc3QpIHtcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gcmVxdWVzdC5vbmVycm9yID0gcmVzcG9uZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA+IDMpIHJlc3BvbmQoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIGFzeW5jKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcikge1xuICAgIHZhciBoZWFkZXJzID0gdXRpbC5leHRlbmQoe30sIGxvYWQuaGVhZGVycywgb3B0LmhlYWRlcnMpO1xuICAgIGZvciAodmFyIG5hbWUgaW4gaGVhZGVycykge1xuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgIH1cbiAgfVxuICByZXF1ZXN0LnNlbmQoKTtcblxuICBpZiAoIWFzeW5jICYmIHhockhhc1Jlc3BvbnNlKHJlcXVlc3QpKSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbGUoZmlsZW5hbWUsIG9wdCwgY2FsbGJhY2spIHtcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4Jyk7XG4gIH1cbiAgZnMucmVhZEZpbGUoZmlsZW5hbWUsIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gaHR0cCh1cmwsIG9wdCwgY2FsbGJhY2spIHtcbiAgdmFyIGhlYWRlcnMgPSB1dGlsLmV4dGVuZCh7fSwgbG9hZC5oZWFkZXJzLCBvcHQuaGVhZGVycyk7XG5cbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiByZXF1aXJlKCdzeW5jLXJlcXVlc3QnKSgnR0VUJywgdXJsLCB7aGVhZGVyczogaGVhZGVyc30pLmdldEJvZHkoKTtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0ge3VybDogdXJsLCBlbmNvZGluZzogbnVsbCwgZ3ppcDogdHJ1ZSwgaGVhZGVyczogaGVhZGVyc307XG4gIHJlcXVpcmUoJ3JlcXVlc3QnKShvcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gZXJyb3IgfHxcbiAgICAgICAgJ0xvYWQgZmFpbGVkIHdpdGggcmVzcG9uc2UgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArICcuJztcbiAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0cmluZywgc2VhcmNoU3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcgPT0gbnVsbCA/IGZhbHNlIDogc3RyaW5nLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgMCkgPT09IDA7XG59XG5cbi8vIEFsbG93IHRoZXNlIGZ1bmN0aW9ucyB0byBiZSBvdmVycmlkZW4gYnkgdGhlIHVzZXIgb2YgdGhlIGxpYnJhcnlcbmxvYWQubG9hZGVyID0gbG9hZGVyO1xubG9hZC5zYW5pdGl6ZVVybCA9IHNhbml0aXplVXJsO1xubG9hZC54aHIgPSB4aHI7XG5sb2FkLmZpbGUgPSBmaWxlO1xubG9hZC5odHRwID0gaHR0cDtcblxuLy8gRGVmYXVsdCBzZXR0aW5nc1xubG9hZC51c2VYSFIgPSAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyk7XG5sb2FkLmhlYWRlcnMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyksXG4gIHR5cGUgPSByZXF1aXJlKCcuL3R5cGUnKSxcbiAgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpLFxuICB0aW1lRiA9IHJlcXVpcmUoJy4uL2Zvcm1hdCcpLnRpbWU7XG5cbmZ1bmN0aW9uIHJlYWQoZGF0YSwgZm9ybWF0KSB7XG4gIHZhciB0eXBlID0gKGZvcm1hdCAmJiBmb3JtYXQudHlwZSkgfHwgJ2pzb24nO1xuICBkYXRhID0gZm9ybWF0c1t0eXBlXShkYXRhLCBmb3JtYXQpO1xuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC5wYXJzZSkgcGFyc2UoZGF0YSwgZm9ybWF0LnBhcnNlKTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGRhdGEsIHR5cGVzKSB7XG4gIHZhciBjb2xzLCBwYXJzZXJzLCBkLCBpLCBqLCBjbGVuLCBsZW4gPSBkYXRhLmxlbmd0aDtcblxuICB0eXBlcyA9ICh0eXBlcz09PSdhdXRvJykgPyB0eXBlLmluZmVyQWxsKGRhdGEpIDogdXRpbC5kdXBsaWNhdGUodHlwZXMpO1xuICBjb2xzID0gdXRpbC5rZXlzKHR5cGVzKTtcbiAgcGFyc2VycyA9IGNvbHMubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICB2YXIgdCA9IHR5cGVzW2NdO1xuICAgIGlmICh0ICYmIHQuaW5kZXhPZignZGF0ZTonKSA9PT0gMCkge1xuICAgICAgdmFyIHBhcnRzID0gdC5zcGxpdCgnOicsIDIpLFxuICAgICAgICAgIHBhdHRlcm4gPSBwYXJ0c1sxXTtcbiAgICAgIGlmICgocGF0dGVyblswXSA9PT0gJ1xcJycgJiYgcGF0dGVybltwYXR0ZXJuLmxlbmd0aC0xXSA9PT0gJ1xcJycpIHx8XG4gICAgICAgICAgKHBhdHRlcm5bMF0gPT09ICdcIicgICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcIicpKSB7XG4gICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNsaWNlKDEsIC0xKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdGb3JtYXQgcGF0dGVybiBtdXN0IGJlIHF1b3RlZDogJyArIHBhdHRlcm4pO1xuICAgICAgfVxuICAgICAgcGF0dGVybiA9IHRpbWVGKHBhdHRlcm4pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHBhdHRlcm4ucGFyc2Uodik7IH07XG4gICAgfVxuICAgIGlmICghdHlwZS5wYXJzZXJzW3RdKSB7XG4gICAgICB0aHJvdyBFcnJvcignSWxsZWdhbCBmb3JtYXQgcGF0dGVybjogJyArIGMgKyAnOicgKyB0KTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGUucGFyc2Vyc1t0XTtcbiAgfSk7XG5cbiAgZm9yIChpPTAsIGNsZW49Y29scy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICBkID0gZGF0YVtpXTtcbiAgICBmb3IgKGo9MDsgajxjbGVuOyArK2opIHtcbiAgICAgIGRbY29sc1tqXV0gPSBwYXJzZXJzW2pdKGRbY29sc1tqXV0pO1xuICAgIH1cbiAgfVxuICB0eXBlLmFubm90YXRpb24oZGF0YSwgdHlwZXMpO1xufVxuXG5yZWFkLmZvcm1hdHMgPSBmb3JtYXRzO1xubW9kdWxlLmV4cG9ydHMgPSByZWFkO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgbG9hZCA9IHJlcXVpcmUoJy4vbG9hZCcpO1xudmFyIHJlYWQgPSByZXF1aXJlKCcuL3JlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsXG4gIC5rZXlzKHJlYWQuZm9ybWF0cylcbiAgLnJlZHVjZShmdW5jdGlvbihvdXQsIHR5cGUpIHtcbiAgICBvdXRbdHlwZV0gPSBmdW5jdGlvbihvcHQsIGZvcm1hdCwgY2FsbGJhY2spIHtcbiAgICAgIC8vIHByb2Nlc3MgYXJndW1lbnRzXG4gICAgICBpZiAodXRpbC5pc1N0cmluZyhvcHQpKSB7IG9wdCA9IHt1cmw6IG9wdH07IH1cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHV0aWwuaXNGdW5jdGlvbihmb3JtYXQpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZm9ybWF0O1xuICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB1cCByZWFkIGZvcm1hdFxuICAgICAgZm9ybWF0ID0gdXRpbC5leHRlbmQoe3BhcnNlOiAnYXV0byd9LCBmb3JtYXQpO1xuICAgICAgZm9ybWF0LnR5cGUgPSB0eXBlO1xuXG4gICAgICAvLyBsb2FkIGRhdGFcbiAgICAgIHZhciBkYXRhID0gbG9hZChvcHQsIGNhbGxiYWNrID8gZnVuY3Rpb24oZXJyb3IsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgcmV0dXJuOyB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gZGF0YSBsb2FkZWQsIG5vdyBwYXJzZSBpdCAoYXN5bmMpXG4gICAgICAgICAgZGF0YSA9IHJlYWQoZGF0YSwgZm9ybWF0KTtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNhbGxiYWNrKGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IDogdW5kZWZpbmVkKTtcblxuICAgICAgLy8gZGF0YSBsb2FkZWQsIG5vdyBwYXJzZSBpdCAoc3luYylcbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiByZWFkKGRhdGEsIGZvcm1hdCk7XG4gICAgfTtcbiAgICByZXR1cm4gb3V0O1xuICB9LCB7fSk7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxudmFyIFRZUEVTID0gJ19fdHlwZXNfXyc7XG5cbnZhciBQQVJTRVJTID0ge1xuICBib29sZWFuOiB1dGlsLmJvb2xlYW4sXG4gIGludGVnZXI6IHV0aWwubnVtYmVyLFxuICBudW1iZXI6ICB1dGlsLm51bWJlcixcbiAgZGF0ZTogICAgdXRpbC5kYXRlLFxuICBzdHJpbmc6ICBmdW5jdGlvbih4KSB7IHJldHVybiB4PT09JycgPyBudWxsIDogeDsgfVxufTtcblxudmFyIFRFU1RTID0ge1xuICBib29sZWFuOiBmdW5jdGlvbih4KSB7IHJldHVybiB4PT09J3RydWUnIHx8IHg9PT0nZmFsc2UnIHx8IHV0aWwuaXNCb29sZWFuKHgpOyB9LFxuICBpbnRlZ2VyOiBmdW5jdGlvbih4KSB7IHJldHVybiBURVNUUy5udW1iZXIoeCkgJiYgKHg9K3gpID09PSB+fng7IH0sXG4gIG51bWJlcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gIWlzTmFOKCt4KSAmJiAhdXRpbC5pc0RhdGUoeCk7IH0sXG4gIGRhdGU6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKHgpKTsgfVxufTtcblxuZnVuY3Rpb24gYW5ub3RhdGlvbihkYXRhLCB0eXBlcykge1xuICBpZiAoIXR5cGVzKSByZXR1cm4gZGF0YSAmJiBkYXRhW1RZUEVTXSB8fCBudWxsO1xuICBkYXRhW1RZUEVTXSA9IHR5cGVzO1xufVxuXG5mdW5jdGlvbiB0eXBlKHZhbHVlcywgZikge1xuICB2YWx1ZXMgPSB1dGlsLmFycmF5KHZhbHVlcyk7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuO1xuXG4gIC8vIGlmIGRhdGEgYXJyYXkgaGFzIHR5cGUgYW5ub3RhdGlvbnMsIHVzZSB0aGVtXG4gIGlmICh2YWx1ZXNbVFlQRVNdKSB7XG4gICAgdiA9IGYodmFsdWVzW1RZUEVTXSk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodikpIHJldHVybiB2O1xuICB9XG5cbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgIXV0aWwuaXNWYWxpZCh2KSAmJiBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICB9XG5cbiAgcmV0dXJuIHV0aWwuaXNEYXRlKHYpID8gJ2RhdGUnIDpcbiAgICB1dGlsLmlzTnVtYmVyKHYpICAgID8gJ251bWJlcicgOlxuICAgIHV0aWwuaXNCb29sZWFuKHYpICAgPyAnYm9vbGVhbicgOlxuICAgIHV0aWwuaXNTdHJpbmcodikgICAgPyAnc3RyaW5nJyA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHR5cGVBbGwoZGF0YSwgZmllbGRzKSB7XG4gIGlmICghZGF0YS5sZW5ndGgpIHJldHVybjtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24odHlwZXMsIGYpIHtcbiAgICByZXR1cm4gKHR5cGVzW2ZdID0gdHlwZShkYXRhLCBmKSwgdHlwZXMpO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGluZmVyKHZhbHVlcywgZikge1xuICB2YWx1ZXMgPSB1dGlsLmFycmF5KHZhbHVlcyk7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBpLCBqLCB2O1xuXG4gIC8vIHR5cGVzIHRvIHRlc3QgZm9yLCBpbiBwcmVjZWRlbmNlIG9yZGVyXG4gIHZhciB0eXBlcyA9IFsnYm9vbGVhbicsICdpbnRlZ2VyJywgJ251bWJlcicsICdkYXRlJ107XG5cbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gZ2V0IG5leHQgdmFsdWUgdG8gdGVzdFxuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIC8vIHRlc3QgdmFsdWUgYWdhaW5zdCByZW1haW5pbmcgdHlwZXNcbiAgICBmb3IgKGo9MDsgajx0eXBlcy5sZW5ndGg7ICsraikge1xuICAgICAgaWYgKHV0aWwuaXNWYWxpZCh2KSAmJiAhVEVTVFNbdHlwZXNbal1dKHYpKSB7XG4gICAgICAgIHR5cGVzLnNwbGljZShqLCAxKTtcbiAgICAgICAgaiAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiBubyB0eXBlcyBsZWZ0LCByZXR1cm4gJ3N0cmluZydcbiAgICBpZiAodHlwZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICByZXR1cm4gdHlwZXNbMF07XG59XG5cbmZ1bmN0aW9uIGluZmVyQWxsKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbih0eXBlcywgZikge1xuICAgIHR5cGVzW2ZdID0gaW5mZXIoZGF0YSwgZik7XG4gICAgcmV0dXJuIHR5cGVzO1xuICB9LCB7fSk7XG59XG5cbnR5cGUuYW5ub3RhdGlvbiA9IGFubm90YXRpb247XG50eXBlLmFsbCA9IHR5cGVBbGw7XG50eXBlLmluZmVyID0gaW5mZXI7XG50eXBlLmluZmVyQWxsID0gaW5mZXJBbGw7XG50eXBlLnBhcnNlcnMgPSBQQVJTRVJTO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIGRsID0ge1xuICB2ZXJzaW9uOiAgICAnMS41LjknLFxuICBsb2FkOiAgICAgICByZXF1aXJlKCcuL2ltcG9ydC9sb2FkJyksXG4gIHJlYWQ6ICAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L3JlYWQnKSxcbiAgdHlwZTogICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpLFxuICBBZ2dyZWdhdG9yOiByZXF1aXJlKCcuL2FnZ3JlZ2F0ZS9hZ2dyZWdhdG9yJyksXG4gIGdyb3VwYnk6ICAgIHJlcXVpcmUoJy4vYWdncmVnYXRlL2dyb3VwYnknKSxcbiAgYmluczogICAgICAgcmVxdWlyZSgnLi9iaW5zL2JpbnMnKSxcbiAgJGJpbjogICAgICAgcmVxdWlyZSgnLi9iaW5zL2hpc3RvZ3JhbScpLiRiaW4sXG4gIGhpc3RvZ3JhbTogIHJlcXVpcmUoJy4vYmlucy9oaXN0b2dyYW0nKS5oaXN0b2dyYW0sXG4gIGZvcm1hdDogICAgIHJlcXVpcmUoJy4vZm9ybWF0JyksXG4gIHRlbXBsYXRlOiAgIHJlcXVpcmUoJy4vdGVtcGxhdGUnKSxcbiAgdGltZTogICAgICAgcmVxdWlyZSgnLi90aW1lJylcbn07XG5cbnV0aWwuZXh0ZW5kKGRsLCB1dGlsKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL2FjY2Vzc29yJykpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vZ2VuZXJhdGUnKSk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9zdGF0cycpKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL2ltcG9ydC9yZWFkZXJzJykpO1xudXRpbC5leHRlbmQoZGwuZm9ybWF0LCByZXF1aXJlKCcuL2Zvcm1hdC10YWJsZXMnKSk7XG5cbi8vIGJhY2t3YXJkcy1jb21wYXRpYmxlLCBkZXByZWNhdGVkIEFQSVxuLy8gd2lsbCByZW1vdmUgaW4gdGhlIGZ1dHVyZVxuZGwucHJpbnQgPSB7XG4gIHRhYmxlOiAgIGRsLmZvcm1hdC50YWJsZSxcbiAgc3VtbWFyeTogZGwuZm9ybWF0LnN1bW1hcnlcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGw7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuL2ltcG9ydC90eXBlJyk7XG52YXIgZ2VuID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xuXG52YXIgc3RhdHMgPSBtb2R1bGUuZXhwb3J0cztcblxuLy8gQ29sbGVjdCB1bmlxdWUgdmFsdWVzLlxuLy8gT3V0cHV0OiBhbiBhcnJheSBvZiB1bmlxdWUgdmFsdWVzLCBpbiBmaXJzdC1vYnNlcnZlZCBvcmRlclxuc3RhdHMudW5pcXVlID0gZnVuY3Rpb24odmFsdWVzLCBmLCByZXN1bHRzKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIGNvbnRpbnVlO1xuICAgIHVbdl0gPSAxO1xuICAgIHJlc3VsdHMucHVzaCh2KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnB1dCBhcnJheS5cbnN0YXRzLmNvdW50ID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCB8fCAwO1xufTtcblxuLy8gQ291bnQgdGhlIG51bWJlciBvZiBub24tbnVsbCwgbm9uLXVuZGVmaW5lZCwgbm9uLU5hTiB2YWx1ZXMuXG5zdGF0cy5jb3VudC52YWxpZCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdiwgaSwgbiwgdmFsaWQgPSAwO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHZhbGlkICs9IDE7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufTtcblxuLy8gQ291bnQgdGhlIG51bWJlciBvZiBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZXMuXG5zdGF0cy5jb3VudC5taXNzaW5nID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuLCBjb3VudCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgPT0gbnVsbCkgY291bnQgKz0gMTtcbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIGRpc3RpbmN0IHZhbHVlcy5cbi8vIE51bGwsIHVuZGVmaW5lZCBhbmQgTmFOIGFyZSBlYWNoIGNvbnNpZGVyZWQgZGlzdGluY3QgdmFsdWVzLlxuc3RhdHMuY291bnQuZGlzdGluY3QgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbiwgY291bnQgPSAwO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIGNvbnRpbnVlO1xuICAgIHVbdl0gPSAxO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuLy8gQ29uc3RydWN0IGEgbWFwIGZyb20gZGlzdGluY3QgdmFsdWVzIHRvIG9jY3VycmVuY2UgY291bnRzLlxuc3RhdHMuY291bnQubWFwID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBtYXAgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBtYXBbdl0gPSAodiBpbiBtYXApID8gbWFwW3ZdICsgMSA6IDE7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG1lZGlhbiBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubWVkaWFuID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGlmIChmKSB2YWx1ZXMgPSB2YWx1ZXMubWFwKHV0aWwuJChmKSk7XG4gIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIodXRpbC5pc1ZhbGlkKS5zb3J0KHV0aWwuY21wKTtcbiAgcmV0dXJuIHN0YXRzLnF1YW50aWxlKHZhbHVlcywgMC41KTtcbn07XG5cbi8vIENvbXB1dGVzIHRoZSBxdWFydGlsZSBib3VuZGFyaWVzIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5xdWFydGlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBpZiAoZikgdmFsdWVzID0gdmFsdWVzLm1hcCh1dGlsLiQoZikpO1xuICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKHV0aWwuaXNWYWxpZCkuc29ydCh1dGlsLmNtcCk7XG4gIHZhciBxID0gc3RhdHMucXVhbnRpbGU7XG4gIHJldHVybiBbcSh2YWx1ZXMsIDAuMjUpLCBxKHZhbHVlcywgMC41MCksIHEodmFsdWVzLCAwLjc1KV07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBxdWFudGlsZSBvZiBhIHNvcnRlZCBhcnJheSBvZiBudW1iZXJzLlxuLy8gQWRhcHRlZCBmcm9tIHRoZSBEMy5qcyBpbXBsZW1lbnRhdGlvbi5cbnN0YXRzLnF1YW50aWxlID0gZnVuY3Rpb24odmFsdWVzLCBmLCBwKSB7XG4gIGlmIChwID09PSB1bmRlZmluZWQpIHsgcCA9IGY7IGYgPSB1dGlsLmlkZW50aXR5OyB9XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBIID0gKHZhbHVlcy5sZW5ndGggLSAxKSAqIHAgKyAxLFxuICAgICAgaCA9IE1hdGguZmxvb3IoSCksXG4gICAgICB2ID0gK2YodmFsdWVzW2ggLSAxXSksXG4gICAgICBlID0gSCAtIGg7XG4gIHJldHVybiBlID8gdiArIGUgKiAoZih2YWx1ZXNbaF0pIC0gdikgOiB2O1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc3VtIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5zdW0gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgZm9yICh2YXIgc3VtPTAsIGk9MCwgbj12YWx1ZXMubGVuZ3RoLCB2OyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHN1bSArPSB2O1xuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtZWFuIChhdmVyYWdlKSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubWVhbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgbWVhbiA9IDAsIGRlbHRhLCBpLCBuLCBjLCB2O1xuICBmb3IgKGk9MCwgYz0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgZGVsdGEgPSB2IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKytjKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lYW47XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgdmFyaWFuY2Ugb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnZhcmlhbmNlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIGlmICghdXRpbC5pc0FycmF5KHZhbHVlcykgfHwgdmFsdWVzLmxlbmd0aCA8IDIpIHJldHVybiAwO1xuICB2YXIgbWVhbiA9IDAsIE0yID0gMCwgZGVsdGEsIGksIGMsIHY7XG4gIGZvciAoaT0wLCBjPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgZGVsdGEgPSB2IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKytjKTtcbiAgICAgIE0yID0gTTIgKyBkZWx0YSAqICh2IC0gbWVhbik7XG4gICAgfVxuICB9XG4gIE0yID0gTTIgLyAoYyAtIDEpO1xuICByZXR1cm4gTTI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5zdGRldiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gTWF0aC5zcXJ0KHN0YXRzLnZhcmlhbmNlKHZhbHVlcywgZikpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgUGVhcnNvbiBtb2RlIHNrZXduZXNzICgobWVkaWFuLW1lYW4pL3N0ZGV2KSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubW9kZXNrZXcgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgdmFyIGF2ZyA9IHN0YXRzLm1lYW4odmFsdWVzLCBmKSxcbiAgICAgIG1lZCA9IHN0YXRzLm1lZGlhbih2YWx1ZXMsIGYpLFxuICAgICAgc3RkID0gc3RhdHMuc3RkZXYodmFsdWVzLCBmKTtcbiAgcmV0dXJuIHN0ZCA9PT0gMCA/IDAgOiAoYXZnIC0gbWVkKSAvIHN0ZDtcbn07XG5cbi8vIEZpbmQgdGhlIG1pbmltdW0gdmFsdWUgaW4gYW4gYXJyYXkuXG5zdGF0cy5taW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgcmV0dXJuIHN0YXRzLmV4dGVudCh2YWx1ZXMsIGYpWzBdO1xufTtcblxuLy8gRmluZCB0aGUgbWF4aW11bSB2YWx1ZSBpbiBhbiBhcnJheS5cbnN0YXRzLm1heCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gc3RhdHMuZXh0ZW50KHZhbHVlcywgZilbMV07XG59O1xuXG4vLyBGaW5kIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIG9mIGFuIGFycmF5IG9mIHZhbHVlcy5cbnN0YXRzLmV4dGVudCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgYSwgYiwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyBicmVhazsgfVxuICB9XG4gIGZvciAoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGlmICh2IDwgYSkgYSA9IHY7XG4gICAgICBpZiAodiA+IGIpIGIgPSB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gW2EsIGJdO1xufTtcblxuLy8gRmluZCB0aGUgaW50ZWdlciBpbmRpY2VzIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbnN0YXRzLmV4dGVudC5pbmRleCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgeCA9IC0xLCB5ID0gLTEsIGEsIGIsIHYsIGksIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7IGEgPSBiID0gdjsgeCA9IHkgPSBpOyBicmVhazsgfVxuICB9XG4gIGZvciAoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGlmICh2IDwgYSkgeyBhID0gdjsgeCA9IGk7IH1cbiAgICAgIGlmICh2ID4gYikgeyBiID0gdjsgeSA9IGk7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFt4LCB5XTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbnN0YXRzLmRvdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgc3VtID0gMCwgaSwgdjtcbiAgaWYgKCFiKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggIT09IGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXJyYXkgbGVuZ3RocyBtdXN0IG1hdGNoLicpO1xuICAgIH1cbiAgICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSB2YWx1ZXNbaV0gKiBhW2ldO1xuICAgICAgaWYgKHYgPT09IHYpIHN1bSArPSB2O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhID0gdXRpbC4kKGEpO1xuICAgIGIgPSB1dGlsLiQoYik7XG4gICAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gYSh2YWx1ZXNbaV0pICogYih2YWx1ZXNbaV0pO1xuICAgICAgaWYgKHYgPT09IHYpIHN1bSArPSB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgdmVjdG9yIGRpc3RhbmNlIGJldHdlZW4gdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuLy8gRGVmYXVsdCBpcyBFdWNsaWRlYW4gKGV4cD0yKSBkaXN0YW5jZSwgY29uZmlndXJhYmxlIHZpYSBleHAgYXJndW1lbnQuXG5zdGF0cy5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBleHApIHtcbiAgdmFyIGYgPSB1dGlsLmlzRnVuY3Rpb24oYikgfHwgdXRpbC5pc1N0cmluZyhiKSxcbiAgICAgIFggPSB2YWx1ZXMsXG4gICAgICBZID0gZiA/IHZhbHVlcyA6IGEsXG4gICAgICBlID0gZiA/IGV4cCA6IGIsXG4gICAgICBMMiA9IGUgPT09IDIgfHwgZSA9PSBudWxsLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGgsIHMgPSAwLCBkLCBpO1xuICBpZiAoZikge1xuICAgIGEgPSB1dGlsLiQoYSk7XG4gICAgYiA9IHV0aWwuJChiKTtcbiAgfVxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBkID0gZiA/IChhKFhbaV0pLWIoWVtpXSkpIDogKFhbaV0tWVtpXSk7XG4gICAgcyArPSBMMiA/IGQqZCA6IE1hdGgucG93KE1hdGguYWJzKGQpLCBlKTtcbiAgfVxuICByZXR1cm4gTDIgPyBNYXRoLnNxcnQocykgOiBNYXRoLnBvdyhzLCAxL2UpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgQ29oZW4ncyBkIGVmZmVjdCBzaXplIGJldHdlZW4gdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuc3RhdHMuY29oZW5zZCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgWCA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICBZID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICB4MSA9IHN0YXRzLm1lYW4oWCksXG4gICAgICB4MiA9IHN0YXRzLm1lYW4oWSksXG4gICAgICBuMSA9IHN0YXRzLmNvdW50LnZhbGlkKFgpLFxuICAgICAgbjIgPSBzdGF0cy5jb3VudC52YWxpZChZKTtcblxuICBpZiAoKG4xK24yLTIpIDw9IDApIHtcbiAgICAvLyBpZiBib3RoIGFycmF5cyBhcmUgc2l6ZSAxLCBvciBvbmUgaXMgZW1wdHksIHRoZXJlJ3Mgbm8gZWZmZWN0IHNpemVcbiAgICByZXR1cm4gMDtcbiAgfVxuICAvLyBwb29sIHN0YW5kYXJkIGRldmlhdGlvblxuICB2YXIgczEgPSBzdGF0cy52YXJpYW5jZShYKSxcbiAgICAgIHMyID0gc3RhdHMudmFyaWFuY2UoWSksXG4gICAgICBzID0gTWF0aC5zcXJ0KCgoKG4xLTEpKnMxKSArICgobjItMSkqczIpKSAvIChuMStuMi0yKSk7XG4gIC8vIGlmIHRoZXJlIGlzIG5vIHZhcmlhbmNlLCB0aGVyZSdzIG5vIGVmZmVjdCBzaXplXG4gIHJldHVybiBzPT09MCA/IDAgOiAoeDEgLSB4MikgLyBzO1xufTtcblxuLy8gQ29tcHV0ZXMgdGhlIGNvdmFyaWFuY2UgYmV0d2VlbiB0d28gYXJyYXlzIG9mIG51bWJlcnNcbnN0YXRzLmNvdmFyaWFuY2UgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgbiA9IFgubGVuZ3RoLFxuICAgICAgeG0gPSBzdGF0cy5tZWFuKFgpLFxuICAgICAgeW0gPSBzdGF0cy5tZWFuKFkpLFxuICAgICAgc3VtID0gMCwgYyA9IDAsIGksIHgsIHksIHZ4LCB2eTtcblxuICBpZiAobiAhPT0gWS5sZW5ndGgpIHtcbiAgICB0aHJvdyBFcnJvcignSW5wdXQgbGVuZ3RocyBtdXN0IG1hdGNoLicpO1xuICB9XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgeCA9IFhbaV07IHZ4ID0gdXRpbC5pc1ZhbGlkKHgpO1xuICAgIHkgPSBZW2ldOyB2eSA9IHV0aWwuaXNWYWxpZCh5KTtcbiAgICBpZiAodnggJiYgdnkpIHtcbiAgICAgIHN1bSArPSAoeC14bSkgKiAoeS15bSk7XG4gICAgICArK2M7XG4gICAgfSBlbHNlIGlmICh2eCB8fCB2eSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1ZhbGlkIHZhbHVlcyBtdXN0IGFsaWduLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtIC8gKGMtMSk7XG59O1xuXG4vLyBDb21wdXRlIGFzY2VuZGluZyByYW5rIHNjb3JlcyBmb3IgYW4gYXJyYXkgb2YgdmFsdWVzLlxuLy8gVGllcyBhcmUgYXNzaWduZWQgdGhlaXIgY29sbGVjdGl2ZSBtZWFuIHJhbmsuXG5zdGF0cy5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZikgfHwgdXRpbC5pZGVudGl0eTtcbiAgdmFyIGEgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgIHJldHVybiB7aWR4OiBpLCB2YWw6IGYodil9O1xuICAgIH0pXG4gICAgLnNvcnQodXRpbC5jb21wYXJhdG9yKCd2YWwnKSk7XG5cbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgciA9IEFycmF5KG4pLFxuICAgICAgdGllID0gLTEsIHAgPSB7fSwgaSwgdiwgbXU7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGFbaV0udmFsO1xuICAgIGlmICh0aWUgPCAwICYmIHAgPT09IHYpIHtcbiAgICAgIHRpZSA9IGkgLSAxO1xuICAgIH0gZWxzZSBpZiAodGllID4gLTEgJiYgcCAhPT0gdikge1xuICAgICAgbXUgPSAxICsgKGktMSArIHRpZSkgLyAyO1xuICAgICAgZm9yICg7IHRpZTxpOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICAgICAgdGllID0gLTE7XG4gICAgfVxuICAgIHJbYVtpXS5pZHhdID0gaSArIDE7XG4gICAgcCA9IHY7XG4gIH1cblxuICBpZiAodGllID4gLTEpIHtcbiAgICBtdSA9IDEgKyAobi0xICsgdGllKSAvIDI7XG4gICAgZm9yICg7IHRpZTxuOyArK3RpZSkgclthW3RpZV0uaWR4XSA9IG11O1xuICB9XG5cbiAgcmV0dXJuIHI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgUGVhcnNvbiBwcm9kdWN0LW1vbWVudCBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG5zdGF0cy5jb3IgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIGZuID0gYjtcbiAgYiA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYTtcbiAgYSA9IGZuID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzO1xuXG4gIHZhciBkb3QgPSBzdGF0cy5kb3QoYSwgYiksXG4gICAgICBtdWEgPSBzdGF0cy5tZWFuKGEpLFxuICAgICAgbXViID0gc3RhdHMubWVhbihiKSxcbiAgICAgIHNkYSA9IHN0YXRzLnN0ZGV2KGEpLFxuICAgICAgc2RiID0gc3RhdHMuc3RkZXYoYiksXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aDtcblxuICByZXR1cm4gKGRvdCAtIG4qbXVhKm11YikgLyAoKG4tMSkgKiBzZGEgKiBzZGIpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgU3BlYXJtYW4gcmFuayBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIHZhbHVlcy5cbnN0YXRzLmNvci5yYW5rID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciByYSA9IGIgPyBzdGF0cy5yYW5rKHZhbHVlcywgYSkgOiBzdGF0cy5yYW5rKHZhbHVlcyksXG4gICAgICByYiA9IGIgPyBzdGF0cy5yYW5rKHZhbHVlcywgYikgOiBzdGF0cy5yYW5rKGEpLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGgsIGksIHMsIGQ7XG5cbiAgZm9yIChpPTAsIHM9MDsgaTxuOyArK2kpIHtcbiAgICBkID0gcmFbaV0gLSByYltpXTtcbiAgICBzICs9IGQgKiBkO1xuICB9XG5cbiAgcmV0dXJuIDEgLSA2KnMgLyAobiAqIChuKm4tMSkpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZGlzdGFuY2UgY29ycmVsYXRpb24gb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaXN0YW5jZV9jb3JyZWxhdGlvblxuc3RhdHMuY29yLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhO1xuXG4gIHZhciBBID0gc3RhdHMuZGlzdC5tYXQoWCksXG4gICAgICBCID0gc3RhdHMuZGlzdC5tYXQoWSksXG4gICAgICBuID0gQS5sZW5ndGgsXG4gICAgICBpLCBhYSwgYmIsIGFiO1xuXG4gIGZvciAoaT0wLCBhYT0wLCBiYj0wLCBhYj0wOyBpPG47ICsraSkge1xuICAgIGFhICs9IEFbaV0qQVtpXTtcbiAgICBiYiArPSBCW2ldKkJbaV07XG4gICAgYWIgKz0gQVtpXSpCW2ldO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydChhYiAvIE1hdGguc3FydChhYSpiYikpO1xufTtcblxuLy8gU2ltcGxlIGxpbmVhciByZWdyZXNzaW9uLlxuLy8gUmV0dXJucyBhIFwiZml0XCIgb2JqZWN0IHdpdGggc2xvcGUgKG0pLCBpbnRlcmNlcHQgKGIpLFxuLy8gciB2YWx1ZSAoUiksIGFuZCBzdW0tc3F1YXJlZCByZXNpZHVhbCBlcnJvciAocnNzKS5cbnN0YXRzLmxpbmVhclJlZ3Jlc3Npb24gPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhLFxuICAgICAgbiA9IFgubGVuZ3RoLFxuICAgICAgeHkgPSBzdGF0cy5jb3ZhcmlhbmNlKFgsIFkpLCAvLyB3aWxsIHRocm93IGVyciBpZiB2YWxpZCB2YWxzIGRvbid0IGFsaWduXG4gICAgICBzeCA9IHN0YXRzLnN0ZGV2KFgpLFxuICAgICAgc3kgPSBzdGF0cy5zdGRldihZKSxcbiAgICAgIHNsb3BlID0geHkgLyAoc3gqc3gpLFxuICAgICAgaWNlcHQgPSBzdGF0cy5tZWFuKFkpIC0gc2xvcGUgKiBzdGF0cy5tZWFuKFgpLFxuICAgICAgZml0ID0ge3Nsb3BlOiBzbG9wZSwgaW50ZXJjZXB0OiBpY2VwdCwgUjogeHkgLyAoc3gqc3kpLCByc3M6IDB9LFxuICAgICAgcmVzLCBpO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGlmICh1dGlsLmlzVmFsaWQoWFtpXSkgJiYgdXRpbC5pc1ZhbGlkKFlbaV0pKSB7XG4gICAgICByZXMgPSAoc2xvcGUqWFtpXSArIGljZXB0KSAtIFlbaV07XG4gICAgICBmaXQucnNzICs9IHJlcyAqIHJlcztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZml0O1xufTtcblxuLy8gTmFtZXNwYWNlIGZvciBib290c3RyYXBcbnN0YXRzLmJvb3RzdHJhcCA9IHt9O1xuXG4vLyBDb25zdHJ1Y3QgYSBib290c3RyYXBwZWQgY29uZmlkZW5jZSBpbnRlcnZhbCBhdCBhIGdpdmVuIHBlcmNlbnRpbGUgbGV2ZWxcbi8vIEFyZ3VtZW50cyBhcmUgYW4gYXJyYXksIGFuIG9wdGlvbmFsIG4gKGRlZmF1bHRzIHRvIDEwMDApLFxuLy8gIGFuIG9wdGlvbmFsIGFscGhhIChkZWZhdWx0cyB0byAwLjA1KSwgYW5kIGFuIG9wdGlvbmFsIHNtb290aGluZyBwYXJhbWV0ZXJcbnN0YXRzLmJvb3RzdHJhcC5jaSA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgYywgZCkge1xuICB2YXIgWCwgTiwgYWxwaGEsIHNtb290aCwgYnMsIG1lYW5zLCBpO1xuICBpZiAodXRpbC5pc0Z1bmN0aW9uKGEpIHx8IHV0aWwuaXNTdHJpbmcoYSkpIHtcbiAgICBYID0gdmFsdWVzLm1hcCh1dGlsLiQoYSkpO1xuICAgIE4gPSBiO1xuICAgIGFscGhhID0gYztcbiAgICBzbW9vdGggPSBkO1xuICB9IGVsc2Uge1xuICAgIFggPSB2YWx1ZXM7XG4gICAgTiA9IGE7XG4gICAgYWxwaGEgPSBiO1xuICAgIHNtb290aCA9IGM7XG4gIH1cbiAgTiA9IE4gPyArTiA6IDEwMDA7XG4gIGFscGhhID0gYWxwaGEgfHwgMC4wNTtcblxuICBicyA9IGdlbi5yYW5kb20uYm9vdHN0cmFwKFgsIHNtb290aCk7XG4gIGZvciAoaT0wLCBtZWFucyA9IEFycmF5KE4pOyBpPE47ICsraSkge1xuICAgIG1lYW5zW2ldID0gc3RhdHMubWVhbihicy5zYW1wbGVzKFgubGVuZ3RoKSk7XG4gIH1cbiAgbWVhbnMuc29ydCh1dGlsLm51bWNtcCk7XG4gIHJldHVybiBbXG4gICAgc3RhdHMucXVhbnRpbGUobWVhbnMsIGFscGhhLzIpLFxuICAgIHN0YXRzLnF1YW50aWxlKG1lYW5zLCAxLShhbHBoYS8yKSlcbiAgXTtcbn07XG5cbi8vIE5hbWVzcGFjZSBmb3Igei10ZXN0c1xuc3RhdHMueiA9IHt9O1xuXG4vLyBDb25zdHJ1Y3QgYSB6LWNvbmZpZGVuY2UgaW50ZXJ2YWwgYXQgYSBnaXZlbiBzaWduaWZpY2FuY2UgbGV2ZWxcbi8vIEFyZ3VtZW50cyBhcmUgYW4gYXJyYXkgYW5kIGFuIG9wdGlvbmFsIGFscGhhIChkZWZhdWx0cyB0byAwLjA1KS5cbnN0YXRzLnouY2kgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSB2YWx1ZXMsIGFscGhhID0gYTtcbiAgaWYgKHV0aWwuaXNGdW5jdGlvbihhKSB8fCB1dGlsLmlzU3RyaW5nKGEpKSB7XG4gICAgWCA9IHZhbHVlcy5tYXAodXRpbC4kKGEpKTtcbiAgICBhbHBoYSA9IGI7XG4gIH1cbiAgYWxwaGEgPSBhbHBoYSB8fCAwLjA1O1xuXG4gIHZhciB6ID0gYWxwaGE9PT0wLjA1ID8gMS45NiA6IGdlbi5yYW5kb20ubm9ybWFsKDAsIDEpLmljZGYoMS0oYWxwaGEvMikpLFxuICAgICAgbXUgPSBzdGF0cy5tZWFuKFgpLFxuICAgICAgU0UgPSBzdGF0cy5zdGRldihYKSAvIE1hdGguc3FydChzdGF0cy5jb3VudC52YWxpZChYKSk7XG4gIHJldHVybiBbbXUgLSAoeipTRSksIG11ICsgKHoqU0UpXTtcbn07XG5cbi8vIFBlcmZvcm0gYSB6LXRlc3Qgb2YgbWVhbnMuIFJldHVybnMgdGhlIHAtdmFsdWUuXG4vLyBJZiBhIHNpbmdsZSBhcnJheSBpcyBwcm92aWRlZCwgcGVyZm9ybXMgYSBvbmUtc2FtcGxlIGxvY2F0aW9uIHRlc3QuXG4vLyBJZiB0d28gYXJyYXlzIG9yIGEgdGFibGUgYW5kIHR3byBhY2Nlc3NvcnMgYXJlIHByb3ZpZGVkLCBwZXJmb3Jtc1xuLy8gYSB0d28tc2FtcGxlIGxvY2F0aW9uIHRlc3QuIEEgcGFpcmVkIHRlc3QgaXMgcGVyZm9ybWVkIGlmIHNwZWNpZmllZFxuLy8gYnkgdGhlIG9wdGlvbnMgaGFzaC5cbi8vIFRoZSBvcHRpb25zIGhhc2ggZm9ybWF0IGlzOiB7cGFpcmVkOiBib29sZWFuLCBudWxsaDogbnVtYmVyfS5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvWi10ZXN0XG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhaXJlZF9kaWZmZXJlbmNlX3Rlc3RcbnN0YXRzLnoudGVzdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgb3B0KSB7XG4gIGlmICh1dGlsLmlzRnVuY3Rpb24oYikgfHwgdXRpbC5pc1N0cmluZyhiKSkgeyAvLyB0YWJsZSBhbmQgYWNjZXNzb3JzXG4gICAgcmV0dXJuIChvcHQgJiYgb3B0LnBhaXJlZCA/IHp0ZXN0UCA6IHp0ZXN0Mikob3B0LCB2YWx1ZXMsIGEsIGIpO1xuICB9IGVsc2UgaWYgKHV0aWwuaXNBcnJheShhKSkgeyAvLyB0d28gYXJyYXlzXG4gICAgcmV0dXJuIChiICYmIGIucGFpcmVkID8genRlc3RQIDogenRlc3QyKShiLCB2YWx1ZXMsIGEpO1xuICB9IGVsc2UgaWYgKHV0aWwuaXNGdW5jdGlvbihhKSB8fCB1dGlsLmlzU3RyaW5nKGEpKSB7XG4gICAgcmV0dXJuIHp0ZXN0MShiLCB2YWx1ZXMsIGEpOyAvLyB0YWJsZSBhbmQgYWNjZXNzb3JcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4genRlc3QxKGEsIHZhbHVlcyk7IC8vIG9uZSBhcnJheVxuICB9XG59O1xuXG4vLyBQZXJmb3JtIGEgei10ZXN0IG9mIG1lYW5zLiBSZXR1cm5zIHRoZSBwLXZhbHVlLlxuLy8gQXNzdW1pbmcgd2UgaGF2ZSBhIGxpc3Qgb2YgdmFsdWVzLCBhbmQgYSBudWxsIGh5cG90aGVzaXMuIElmIG5vIG51bGxcbi8vIGh5cG90aGVzaXMsIGFzc3VtZSBvdXIgbnVsbCBoeXBvdGhlc2lzIGlzIG11PTAuXG5mdW5jdGlvbiB6dGVzdDEob3B0LCBYLCBmKSB7XG4gIHZhciBudWxsSCA9IG9wdCAmJiBvcHQubnVsbGggfHwgMCxcbiAgICAgIGdhdXNzaWFuID0gZ2VuLnJhbmRvbS5ub3JtYWwoMCwgMSksXG4gICAgICBtdSA9IHN0YXRzLm1lYW4oWCxmKSxcbiAgICAgIFNFID0gc3RhdHMuc3RkZXYoWCxmKSAvIE1hdGguc3FydChzdGF0cy5jb3VudC52YWxpZChYLGYpKTtcblxuICBpZiAoU0U9PT0wKSB7XG4gICAgLy8gVGVzdCBub3Qgd2VsbCBkZWZpbmVkIHdoZW4gc3RhbmRhcmQgZXJyb3IgaXMgMC5cbiAgICByZXR1cm4gKG11IC0gbnVsbEgpID09PSAwID8gMSA6IDA7XG4gIH1cbiAgLy8gVHdvLXNpZGVkLCBzbyB0d2ljZSB0aGUgb25lLXNpZGVkIGNkZi5cbiAgdmFyIHogPSAobXUgLSBudWxsSCkgLyBTRTtcbiAgcmV0dXJuIDIgKiBnYXVzc2lhbi5jZGYoLU1hdGguYWJzKHopKTtcbn1cblxuLy8gUGVyZm9ybSBhIHR3byBzYW1wbGUgcGFpcmVkIHotdGVzdCBvZiBtZWFucy4gUmV0dXJucyB0aGUgcC12YWx1ZS5cbmZ1bmN0aW9uIHp0ZXN0UChvcHQsIHZhbHVlcywgYSwgYikge1xuICB2YXIgWCA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICBZID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICBuMSA9IHN0YXRzLmNvdW50KFgpLFxuICAgICAgbjIgPSBzdGF0cy5jb3VudChZKSxcbiAgICAgIGRpZmZzID0gQXJyYXkoKSwgaTtcblxuICBpZiAobjEgIT09IG4yKSB7XG4gICAgdGhyb3cgRXJyb3IoJ0FycmF5IGxlbmd0aHMgbXVzdCBtYXRjaC4nKTtcbiAgfVxuICBmb3IgKGk9MDsgaTxuMTsgKytpKSB7XG4gICAgLy8gT25seSB2YWxpZCBkaWZmZXJlbmNlcyBzaG91bGQgY29udHJpYnV0ZSB0byB0aGUgdGVzdCBzdGF0aXN0aWNcbiAgICBpZiAodXRpbC5pc1ZhbGlkKFhbaV0pICYmIHV0aWwuaXNWYWxpZChZW2ldKSkge1xuICAgICAgZGlmZnMucHVzaChYW2ldIC0gWVtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0cy56LnRlc3QoZGlmZnMsIG9wdCAmJiBvcHQubnVsbGggfHwgMCk7XG59XG5cbi8vIFBlcmZvcm0gYSB0d28gc2FtcGxlIHotdGVzdCBvZiBtZWFucy4gUmV0dXJucyB0aGUgcC12YWx1ZS5cbmZ1bmN0aW9uIHp0ZXN0MihvcHQsIHZhbHVlcywgYSwgYikge1xuICB2YXIgWCA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICBZID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICBuMSA9IHN0YXRzLmNvdW50LnZhbGlkKFgpLFxuICAgICAgbjIgPSBzdGF0cy5jb3VudC52YWxpZChZKSxcbiAgICAgIGdhdXNzaWFuID0gZ2VuLnJhbmRvbS5ub3JtYWwoMCwgMSksXG4gICAgICBtZWFuRGlmZiA9IHN0YXRzLm1lYW4oWCkgLSBzdGF0cy5tZWFuKFkpIC0gKG9wdCAmJiBvcHQubnVsbGggfHwgMCksXG4gICAgICBTRSA9IE1hdGguc3FydChzdGF0cy52YXJpYW5jZShYKS9uMSArIHN0YXRzLnZhcmlhbmNlKFkpL24yKTtcblxuICBpZiAoU0U9PT0wKSB7XG4gICAgLy8gTm90IHdlbGwgZGVmaW5lZCB3aGVuIHBvb2xlZCBzdGFuZGFyZCBlcnJvciBpcyAwLlxuICAgIHJldHVybiBtZWFuRGlmZj09PTAgPyAxIDogMDtcbiAgfVxuICAvLyBUd28tdGFpbGVkLCBzbyB0d2ljZSB0aGUgb25lLXNpZGVkIGNkZi5cbiAgdmFyIHogPSBtZWFuRGlmZiAvIFNFO1xuICByZXR1cm4gMiAqIGdhdXNzaWFuLmNkZigtTWF0aC5hYnMoeikpO1xufVxuXG4vLyBDb25zdHJ1Y3QgYSBtZWFuLWNlbnRlcmVkIGRpc3RhbmNlIG1hdHJpeCBmb3IgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLmRpc3QubWF0ID0gZnVuY3Rpb24oWCkge1xuICB2YXIgbiA9IFgubGVuZ3RoLFxuICAgICAgbSA9IG4qbixcbiAgICAgIEEgPSBBcnJheShtKSxcbiAgICAgIFIgPSBnZW4uemVyb3MobiksXG4gICAgICBNID0gMCwgdiwgaSwgajtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBBW2kqbitpXSA9IDA7XG4gICAgZm9yIChqPWkrMTsgajxuOyArK2opIHtcbiAgICAgIEFbaSpuK2pdID0gKHYgPSBNYXRoLmFicyhYW2ldIC0gWFtqXSkpO1xuICAgICAgQVtqKm4raV0gPSB2O1xuICAgICAgUltpXSArPSB2O1xuICAgICAgUltqXSArPSB2O1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIE0gKz0gUltpXTtcbiAgICBSW2ldIC89IG47XG4gIH1cbiAgTSAvPSBtO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGZvciAoaj1pOyBqPG47ICsraikge1xuICAgICAgQVtpKm4ral0gKz0gTSAtIFJbaV0gLSBSW2pdO1xuICAgICAgQVtqKm4raV0gPSBBW2kqbitqXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIFNoYW5ub24gZW50cm9weSAobG9nIGJhc2UgMikgb2YgYW4gYXJyYXkgb2YgY291bnRzLlxuc3RhdHMuZW50cm9weSA9IGZ1bmN0aW9uKGNvdW50cywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgaSwgcCwgcyA9IDAsIEggPSAwLCBuID0gY291bnRzLmxlbmd0aDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcyArPSAoZiA/IGYoY291bnRzW2ldKSA6IGNvdW50c1tpXSk7XG4gIH1cbiAgaWYgKHMgPT09IDApIHJldHVybiAwO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBwID0gKGYgPyBmKGNvdW50c1tpXSkgOiBjb3VudHNbaV0pIC8gcztcbiAgICBpZiAocCkgSCArPSBwICogTWF0aC5sb2cocCk7XG4gIH1cbiAgcmV0dXJuIC1IIC8gTWF0aC5MTjI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtdXR1YWwgaW5mb3JtYXRpb24gYmV0d2VlbiB0d28gZGlzY3JldGUgdmFyaWFibGVzLlxuLy8gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgZm9ybSBbTUksIE1JX2Rpc3RhbmNlXVxuLy8gTUlfZGlzdGFuY2UgaXMgZGVmaW5lZCBhcyAxIC0gSShhLGIpIC8gSChhLGIpLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NdXR1YWxfaW5mb3JtYXRpb25cbnN0YXRzLm11dHVhbCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHZhciB4ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgeSA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICB6ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoY291bnRzKSkgOiBiO1xuXG4gIHZhciBweCA9IHt9LFxuICAgICAgcHkgPSB7fSxcbiAgICAgIG4gPSB6Lmxlbmd0aCxcbiAgICAgIHMgPSAwLCBJID0gMCwgSCA9IDAsIHAsIHQsIGk7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcHhbeFtpXV0gPSAwO1xuICAgIHB5W3lbaV1dID0gMDtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHB4W3hbaV1dICs9IHpbaV07XG4gICAgcHlbeVtpXV0gKz0geltpXTtcbiAgICBzICs9IHpbaV07XG4gIH1cblxuICB0ID0gMSAvIChzICogTWF0aC5MTjIpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBpZiAoeltpXSA9PT0gMCkgY29udGludWU7XG4gICAgcCA9IChzICogeltpXSkgLyAocHhbeFtpXV0gKiBweVt5W2ldXSk7XG4gICAgSSArPSB6W2ldICogdCAqIE1hdGgubG9nKHApO1xuICAgIEggKz0geltpXSAqIHQgKiBNYXRoLmxvZyh6W2ldL3MpO1xuICB9XG5cbiAgcmV0dXJuIFtJLCAxICsgSS9IXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG5zdGF0cy5tdXR1YWwuaW5mbyA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHJldHVybiBzdGF0cy5tdXR1YWwodmFsdWVzLCBhLCBiLCBjb3VudHMpWzBdO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGRpc3RhbmNlIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIE1JX2Rpc3RhbmNlIGlzIGRlZmluZWQgYXMgMSAtIEkoYSxiKSAvIEgoYSxiKS5cbnN0YXRzLm11dHVhbC5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgcmV0dXJuIHN0YXRzLm11dHVhbCh2YWx1ZXMsIGEsIGIsIGNvdW50cylbMV07XG59O1xuXG4vLyBDb21wdXRlIGEgcHJvZmlsZSBvZiBzdW1tYXJ5IHN0YXRpc3RpY3MgZm9yIGEgdmFyaWFibGUuXG5zdGF0cy5wcm9maWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBtZWFuID0gMCxcbiAgICAgIHZhbGlkID0gMCxcbiAgICAgIG1pc3NpbmcgPSAwLFxuICAgICAgZGlzdGluY3QgPSAwLFxuICAgICAgbWluID0gbnVsbCxcbiAgICAgIG1heCA9IG51bGwsXG4gICAgICBNMiA9IDAsXG4gICAgICB2YWxzID0gW10sXG4gICAgICB1ID0ge30sIGRlbHRhLCBzZCwgaSwgdiwgeDtcblxuICAvLyBjb21wdXRlIHN1bW1hcnkgc3RhdHNcbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG5cbiAgICAvLyB1cGRhdGUgdW5pcXVlIHZhbHVlc1xuICAgIHVbdl0gPSAodiBpbiB1KSA/IHVbdl0gKyAxIDogKGRpc3RpbmN0ICs9IDEsIDEpO1xuXG4gICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgKyttaXNzaW5nO1xuICAgIH0gZWxzZSBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICAvLyB1cGRhdGUgc3RhdHNcbiAgICAgIHggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSA/IHYubGVuZ3RoIDogdjtcbiAgICAgIGlmIChtaW49PT1udWxsIHx8IHggPCBtaW4pIG1pbiA9IHg7XG4gICAgICBpZiAobWF4PT09bnVsbCB8fCB4ID4gbWF4KSBtYXggPSB4O1xuICAgICAgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKyt2YWxpZCk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgICAgdmFscy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKHZhbGlkIC0gMSk7XG4gIHNkID0gTWF0aC5zcXJ0KE0yKTtcblxuICAvLyBzb3J0IHZhbHVlcyBmb3IgbWVkaWFuIGFuZCBpcXJcbiAgdmFscy5zb3J0KHV0aWwuY21wKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICAgICB0eXBlKHZhbHVlcywgZiksXG4gICAgdW5pcXVlOiAgIHUsXG4gICAgY291bnQ6ICAgIHZhbHVlcy5sZW5ndGgsXG4gICAgdmFsaWQ6ICAgIHZhbGlkLFxuICAgIG1pc3Npbmc6ICBtaXNzaW5nLFxuICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICBtaW46ICAgICAgbWluLFxuICAgIG1heDogICAgICBtYXgsXG4gICAgbWVhbjogICAgIG1lYW4sXG4gICAgc3RkZXY6ICAgIHNkLFxuICAgIG1lZGlhbjogICAodiA9IHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuNSkpLFxuICAgIHExOiAgICAgICBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjI1KSxcbiAgICBxMzogICAgICAgc3RhdHMucXVhbnRpbGUodmFscywgMC43NSksXG4gICAgbW9kZXNrZXc6IHNkID09PSAwID8gMCA6IChtZWFuIC0gdikgLyBzZFxuICB9O1xufTtcblxuLy8gQ29tcHV0ZSBwcm9maWxlcyBmb3IgYWxsIHZhcmlhYmxlcyBpbiBhIGRhdGEgc2V0Llxuc3RhdHMuc3VtbWFyeSA9IGZ1bmN0aW9uKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICB2YXIgcyA9IGZpZWxkcy5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBwID0gc3RhdHMucHJvZmlsZShkYXRhLCB1dGlsLiQoZikpO1xuICAgIHJldHVybiAocC5maWVsZCA9IGYsIHApO1xuICB9KTtcbiAgcmV0dXJuIChzLl9fc3VtbWFyeV9fID0gdHJ1ZSwgcyk7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBmb3JtYXQgPSByZXF1aXJlKCcuL2Zvcm1hdCcpO1xuXG52YXIgY29udGV4dCA9IHtcbiAgZm9ybWF0czogICAgW10sXG4gIGZvcm1hdF9tYXA6IHt9LFxuICB0cnVuY2F0ZTogICB1dGlsLnRydW5jYXRlLFxuICBwYWQ6ICAgICAgICB1dGlsLnBhZCxcbiAgZGF5OiAgICAgICAgZm9ybWF0LmRheSxcbiAgbW9udGg6ICAgICAgZm9ybWF0Lm1vbnRoXG59O1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh0ZXh0KSB7XG4gIHZhciBzcmMgPSBzb3VyY2UodGV4dCwgJ2QnKTtcbiAgc3JjID0gJ3ZhciBfX3Q7IHJldHVybiAnICsgc3JjICsgJzsnO1xuXG4gIC8qIGpzaGludCBldmlsOiB0cnVlICovXG4gIHJldHVybiAobmV3IEZ1bmN0aW9uKCdkJywgc3JjKSkuYmluZChjb250ZXh0KTtcbn1cblxudGVtcGxhdGUuc291cmNlID0gc291cmNlO1xudGVtcGxhdGUuY29udGV4dCA9IGNvbnRleHQ7XG50ZW1wbGF0ZS5mb3JtYXQgPSBnZXRfZm9ybWF0O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuLy8gQ2xlYXIgY2FjaGUgb2YgZm9ybWF0IG9iamVjdHMuXG4vLyBUaGlzIGNhbiAqYnJlYWsqIHByaW9yIHRlbXBsYXRlIGZ1bmN0aW9ucywgc28gaW52b2tlIHdpdGggY2FyZSFcbnRlbXBsYXRlLmNsZWFyRm9ybWF0Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgY29udGV4dC5mb3JtYXRzID0gW107XG4gIGNvbnRleHQuZm9ybWF0X21hcCA9IHt9O1xufTtcblxuLy8gR2VuZXJhdGUgcHJvcGVydHkgYWNjZXNzIGNvZGUgZm9yIHVzZSB3aXRoaW4gdGVtcGxhdGUgc291cmNlLlxuLy8gb2JqZWN0OiB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0ICh2YXJpYWJsZSkgY29udGFpbmluZyB0ZW1wbGF0ZSBkYXRhXG4vLyBwcm9wZXJ0eTogdGhlIHByb3BlcnR5IGFjY2VzcyBzdHJpbmcsIHZlcmJhdGltIGZyb20gdGVtcGxhdGUgdGFnXG50ZW1wbGF0ZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgdmFyIHNyYyA9IHV0aWwuZmllbGQocHJvcGVydHkpLm1hcCh1dGlsLnN0cikuam9pbignXVsnKTtcbiAgcmV0dXJuIG9iamVjdCArICdbJyArIHNyYyArICddJztcbn07XG5cbi8vIEdlbmVyYXRlIHNvdXJjZSBjb2RlIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uLlxuLy8gdGV4dDogdGhlIHRlbXBsYXRlIHRleHRcbi8vIHZhcmlhYmxlOiB0aGUgbmFtZSBvZiB0aGUgZGF0YSBvYmplY3QgdmFyaWFibGUgKCdvYmonIGJ5IGRlZmF1bHQpXG4vLyBwcm9wZXJ0aWVzOiBvcHRpb25hbCBoYXNoIGZvciBjb2xsZWN0aW5nIGFsbCBhY2Nlc3NlZCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBzb3VyY2UodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyaWFibGUgPSB2YXJpYWJsZSB8fCAnb2JqJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHNyYyA9ICdcXCcnO1xuICB2YXIgcmVnZXggPSB0ZW1wbGF0ZV9yZTtcblxuICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICB0ZXh0LnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpbnRlcnBvbGF0ZSwgb2Zmc2V0KSB7XG4gICAgc3JjICs9IHRleHRcbiAgICAgIC5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgICAgLnJlcGxhY2UodGVtcGxhdGVfZXNjYXBlciwgdGVtcGxhdGVfZXNjYXBlQ2hhcik7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgIHNyYyArPSAnXFwnXFxuKygoX190PSgnICtcbiAgICAgICAgdGVtcGxhdGVfdmFyKGludGVycG9sYXRlLCB2YXJpYWJsZSwgcHJvcGVydGllcykgK1xuICAgICAgICAnKSk9PW51bGw/XFwnXFwnOl9fdCkrXFxuXFwnJztcbiAgICB9XG5cbiAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIHNyYyArICdcXCcnO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZV92YXIodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGZpbHRlcnMgPSB0ZXh0Lm1hdGNoKGZpbHRlcl9yZSk7XG4gIHZhciBwcm9wID0gZmlsdGVycy5zaGlmdCgpLnRyaW0oKTtcbiAgdmFyIHN0cmluZ0Nhc3QgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHN0cmNhbGwoZm4pIHtcbiAgICBmbiA9IGZuIHx8ICcnO1xuICAgIGlmIChzdHJpbmdDYXN0KSB7XG4gICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICBzcmMgPSAnU3RyaW5nKCcgKyBzcmMgKyAnKScgKyBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3JjICs9IGZuO1xuICAgIH1cbiAgICByZXR1cm4gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZSgpIHtcbiAgICByZXR1cm4gJyh0eXBlb2YgJyArIHNyYyArICc9PT1cIm51bWJlclwiP25ldyBEYXRlKCcrc3JjKycpOicrc3JjKycpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdHRlcih0eXBlKSB7XG4gICAgdmFyIHBhdHRlcm4gPSBhcmdzWzBdO1xuICAgIGlmICgocGF0dGVyblswXSA9PT0gJ1xcJycgJiYgcGF0dGVybltwYXR0ZXJuLmxlbmd0aC0xXSA9PT0gJ1xcJycpIHx8XG4gICAgICAgIChwYXR0ZXJuWzBdID09PSAnXCInICAmJiBwYXR0ZXJuW3BhdHRlcm4ubGVuZ3RoLTFdID09PSAnXCInKSkge1xuICAgICAgcGF0dGVybiA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignRm9ybWF0IHBhdHRlcm4gbXVzdCBiZSBxdW90ZWQ6ICcgKyBwYXR0ZXJuKTtcbiAgICB9XG4gICAgYSA9IHRlbXBsYXRlX2Zvcm1hdChwYXR0ZXJuLCB0eXBlKTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgdmFyIGFyZyA9IHR5cGUgPT09ICdudW1iZXInID8gc3JjIDogZGF0ZSgpO1xuICAgIHNyYyA9ICd0aGlzLmZvcm1hdHNbJythKyddKCcrYXJnKycpJztcbiAgfVxuXG4gIGlmIChwcm9wZXJ0aWVzKSBwcm9wZXJ0aWVzW3Byb3BdID0gMTtcbiAgdmFyIHNyYyA9IHRlbXBsYXRlLnByb3BlcnR5KHZhcmlhYmxlLCBwcm9wKTtcblxuICBmb3IgKHZhciBpPTA7IGk8ZmlsdGVycy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmID0gZmlsdGVyc1tpXSwgYXJncyA9IG51bGwsIHBpZHgsIGEsIGI7XG5cbiAgICBpZiAoKHBpZHg9Zi5pbmRleE9mKCc6JykpID4gMCkge1xuICAgICAgZiA9IGYuc2xpY2UoMCwgcGlkeCk7XG4gICAgICBhcmdzID0gZmlsdGVyc1tpXS5zbGljZShwaWR4KzEpXG4gICAgICAgIC5tYXRjaChhcmdzX3JlKVxuICAgICAgICAubWFwKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9KTtcbiAgICB9XG4gICAgZiA9IGYudHJpbSgpO1xuXG4gICAgc3dpdGNoIChmKSB7XG4gICAgICBjYXNlICdsZW5ndGgnOlxuICAgICAgICBzdHJjYWxsKCcubGVuZ3RoJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbG93ZXInOlxuICAgICAgICBzdHJjYWxsKCcudG9Mb3dlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VwcGVyJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvVXBwZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsb3dlci1sb2NhbGUnOlxuICAgICAgICBzdHJjYWxsKCcudG9Mb2NhbGVMb3dlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VwcGVyLWxvY2FsZSc6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvY2FsZVVwcGVyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJpbSc6XG4gICAgICAgIHN0cmNhbGwoJy50cmltKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBzdHJjYWxsKCcuc2xpY2UoMCwnICsgYSArICcpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgtJyArIGEgKycpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbWlkJzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBiID0gYSArIHV0aWwubnVtYmVyKGFyZ3NbMV0pO1xuICAgICAgICBzdHJjYWxsKCcuc2xpY2UoKycrYSsnLCcrYisnKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NsaWNlJzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBzdHJjYWxsKCcuc2xpY2UoJysgYSArXG4gICAgICAgICAgKGFyZ3MubGVuZ3RoID4gMSA/ICcsJyArIHV0aWwubnVtYmVyKGFyZ3NbMV0pIDogJycpICtcbiAgICAgICAgICAnKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RydW5jYXRlJzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBiID0gYXJnc1sxXTtcbiAgICAgICAgYiA9IChiIT09J2xlZnQnICYmIGIhPT0nbWlkZGxlJyAmJiBiIT09J2NlbnRlcicpID8gJ3JpZ2h0JyA6IGI7XG4gICAgICAgIHNyYyA9ICd0aGlzLnRydW5jYXRlKCcgKyBzdHJjYWxsKCkgKyAnLCcgKyBhICsgJyxcXCcnICsgYiArICdcXCcpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYWQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhcmdzWzFdO1xuICAgICAgICBiID0gKGIhPT0nbGVmdCcgJiYgYiE9PSdtaWRkbGUnICYmIGIhPT0nY2VudGVyJykgPyAncmlnaHQnIDogYjtcbiAgICAgICAgc3JjID0gJ3RoaXMucGFkKCcgKyBzdHJjYWxsKCkgKyAnLCcgKyBhICsgJyxcXCcnICsgYiArICdcXCcpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBmb3JtYXR0ZXIoJ251bWJlcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBmb3JtYXR0ZXIoJ3RpbWUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lLXV0Yyc6XG4gICAgICAgIGZvcm1hdHRlcigndXRjJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICBzcmMgPSAndGhpcy5tb250aCgnICsgc3JjICsgJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoLWFiYnJldic6XG4gICAgICAgIHNyYyA9ICd0aGlzLm1vbnRoKCcgKyBzcmMgKyAnLHRydWUpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICBzcmMgPSAndGhpcy5kYXkoJyArIHNyYyArICcpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXktYWJicmV2JzpcbiAgICAgICAgc3JjID0gJ3RoaXMuZGF5KCcgKyBzcmMgKyAnLHRydWUpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIHRlbXBsYXRlIGZpbHRlcjogJyArIGYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzcmM7XG59XG5cbnZhciB0ZW1wbGF0ZV9yZSA9IC9cXHtcXHsoLis/KVxcfVxcfXwkL2csXG4gICAgZmlsdGVyX3JlID0gLyg/OlwiW15cIl0qXCJ8XFwnW15cXCddKlxcJ3xbXlxcfFwiXSt8W15cXHxcXCddKykrL2csXG4gICAgYXJnc19yZSA9IC8oPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8W14sXCJdK3xbXixcXCddKykrL2c7XG5cbi8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4vLyBzdHJpbmcgbGl0ZXJhbC5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVzID0ge1xuICAnXFwnJzogICAgICdcXCcnLFxuICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICdcXHInOiAgICAgJ3InLFxuICAnXFxuJzogICAgICduJyxcbiAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAnXFx1MjAyOSc6ICd1MjAyOSdcbn07XG5cbnZhciB0ZW1wbGF0ZV9lc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZV9lc2NhcGVDaGFyKG1hdGNoKSB7XG4gIHJldHVybiAnXFxcXCcgKyB0ZW1wbGF0ZV9lc2NhcGVzW21hdGNoXTtcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGVfZm9ybWF0KHBhdHRlcm4sIHR5cGUpIHtcbiAgdmFyIGtleSA9IHR5cGUgKyAnOicgKyBwYXR0ZXJuO1xuICBpZiAoY29udGV4dC5mb3JtYXRfbWFwW2tleV0gPT0gbnVsbCkge1xuICAgIHZhciBmID0gZm9ybWF0W3R5cGVdKHBhdHRlcm4pO1xuICAgIHZhciBpID0gY29udGV4dC5mb3JtYXRzLmxlbmd0aDtcbiAgICBjb250ZXh0LmZvcm1hdHMucHVzaChmKTtcbiAgICBjb250ZXh0LmZvcm1hdF9tYXBba2V5XSA9IGk7XG4gICAgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQuZm9ybWF0X21hcFtrZXldO1xufVxuXG5mdW5jdGlvbiBnZXRfZm9ybWF0KHBhdHRlcm4sIHR5cGUpIHtcbiAgcmV0dXJuIGNvbnRleHQuZm9ybWF0c1t0ZW1wbGF0ZV9mb3JtYXQocGF0dGVybiwgdHlwZSldO1xufVxuIiwidmFyIGQzX3RpbWUgPSByZXF1aXJlKCdkMy10aW1lJyk7XG5cbnZhciB0ZW1wRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgYmFzZURhdGUgPSBuZXcgRGF0ZSgwLCAwLCAxKS5zZXRGdWxsWWVhcigwKSwgLy8gSmFuIDEsIDAgQURcbiAgICB1dGNCYXNlRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDAsIDAsIDEpKS5zZXRVVENGdWxsWWVhcigwKTtcblxuZnVuY3Rpb24gZGF0ZShkKSB7XG4gIHJldHVybiAodGVtcERhdGUuc2V0VGltZSgrZCksIHRlbXBEYXRlKTtcbn1cblxuLy8gY3JlYXRlIGEgdGltZSB1bml0IGVudHJ5XG5mdW5jdGlvbiBlbnRyeSh0eXBlLCBkYXRlLCB1bml0LCBzdGVwLCBtaW4sIG1heCkge1xuICB2YXIgZSA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGU6IGRhdGUsXG4gICAgdW5pdDogdW5pdFxuICB9O1xuICBpZiAoc3RlcCkge1xuICAgIGUuc3RlcCA9IHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgZS5taW5zdGVwID0gMTtcbiAgfVxuICBpZiAobWluICE9IG51bGwpIGUubWluID0gbWluO1xuICBpZiAobWF4ICE9IG51bGwpIGUubWF4ID0gbWF4O1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIHVuaXQsIGJhc2UsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBlbnRyeSh0eXBlLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQub2Zmc2V0KGJhc2UsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVuaXQuY291bnQoYmFzZSwgZCk7IH0sXG4gICAgc3RlcCwgbWluLCBtYXgpO1xufVxuXG52YXIgbG9jYWxlID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUuc2Vjb25kLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS5taW51dGUsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLmhvdXIsICAgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUuZGF5LCAgICBiYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLm1vbnRoLCAgYmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS55ZWFyLCAgIGJhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgNCtkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgZCAlIDEyLCAxKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgdXRjID0gW1xuICBjcmVhdGUoJ3NlY29uZCcsIGQzX3RpbWUudXRjU2Vjb25kLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnbWludXRlJywgZDNfdGltZS51dGNNaW51dGUsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdob3VyJywgICBkM190aW1lLnV0Y0hvdXIsICAgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2RheScsICAgIGQzX3RpbWUudXRjRGF5LCAgICB1dGNCYXNlRGF0ZSwgWzEsIDddKSxcbiAgY3JlYXRlKCdtb250aCcsICBkM190aW1lLnV0Y01vbnRoLCAgdXRjQmFzZURhdGUsIFsxLCAzLCA2XSksXG4gIGNyZWF0ZSgneWVhcicsICAgZDNfdGltZS51dGNZZWFyLCAgIHV0Y0Jhc2VEYXRlKSxcblxuICAvLyBwZXJpb2RpYyB1bml0c1xuICBlbnRyeSgnc2Vjb25kcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDU2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENIb3VycygpOyB9LFxuICAgIG51bGwsIDAsIDIzXG4gICksXG4gIGVudHJ5KCd3ZWVrZGF5cycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgNCtkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENEYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCBkICUgMTIsIDEpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01vbnRoKCk7IH0sXG4gICAgWzFdLCAwLCAxMVxuICApXG5dO1xuXG52YXIgU1RFUFMgPSBbXG4gIFszMTUzNmU2LCA1XSwgIC8vIDEteWVhclxuICBbNzc3NmU2LCA0XSwgICAvLyAzLW1vbnRoXG4gIFsyNTkyZTYsIDRdLCAgIC8vIDEtbW9udGhcbiAgWzEyMDk2ZTUsIDNdLCAgLy8gMi13ZWVrXG4gIFs2MDQ4ZTUsIDNdLCAgIC8vIDEtd2Vla1xuICBbMTcyOGU1LCAzXSwgICAvLyAyLWRheVxuICBbODY0ZTUsIDNdLCAgICAvLyAxLWRheVxuICBbNDMyZTUsIDJdLCAgICAvLyAxMi1ob3VyXG4gIFsyMTZlNSwgMl0sICAgIC8vIDYtaG91clxuICBbMTA4ZTUsIDJdLCAgICAvLyAzLWhvdXJcbiAgWzM2ZTUsIDJdLCAgICAgLy8gMS1ob3VyXG4gIFsxOGU1LCAxXSwgICAgIC8vIDMwLW1pbnV0ZVxuICBbOWU1LCAxXSwgICAgICAvLyAxNS1taW51dGVcbiAgWzNlNSwgMV0sICAgICAgLy8gNS1taW51dGVcbiAgWzZlNCwgMV0sICAgICAgLy8gMS1taW51dGVcbiAgWzNlNCwgMF0sICAgICAgLy8gMzAtc2Vjb25kXG4gIFsxNWUzLCAwXSwgICAgIC8vIDE1LXNlY29uZFxuICBbNWUzLCAwXSwgICAgICAvLyA1LXNlY29uZFxuICBbMWUzLCAwXSAgICAgICAvLyAxLXNlY29uZFxuXTtcblxuZnVuY3Rpb24gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yikge1xuICB2YXIgc3RlcCA9IFNURVBTWzBdLCBpLCBuLCBiaW5zO1xuXG4gIGZvciAoaT0xLCBuPVNURVBTLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBzdGVwID0gU1RFUFNbaV07XG4gICAgaWYgKHNwYW4gPiBzdGVwWzBdKSB7XG4gICAgICBiaW5zID0gc3BhbiAvIHN0ZXBbMF07XG4gICAgICBpZiAoYmlucyA+IG1heGIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW1NURVBTW2ktMV1bMV1dO1xuICAgICAgfVxuICAgICAgaWYgKGJpbnMgPj0gbWluYikge1xuICAgICAgICByZXR1cm4gdW5pdHNbc3RlcFsxXV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bml0c1tTVEVQU1tuLTFdWzFdXTtcbn1cblxuZnVuY3Rpb24gdG9Vbml0TWFwKHVuaXRzKSB7XG4gIHZhciBtYXAgPSB7fSwgaSwgbjtcbiAgZm9yIChpPTAsIG49dW5pdHMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIG1hcFt1bml0c1tpXS50eXBlXSA9IHVuaXRzW2ldO1xuICB9XG4gIG1hcC5maW5kID0gZnVuY3Rpb24oc3BhbiwgbWluYiwgbWF4Yikge1xuICAgIHJldHVybiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKTtcbiAgfTtcbiAgcmV0dXJuIG1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1VuaXRNYXAobG9jYWxlKTtcbm1vZHVsZS5leHBvcnRzLnV0YyA9IHRvVW5pdE1hcCh1dGMpOyIsInZhciB1ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Lmxlbmd0aCAhPSBudWxsID8geC5sZW5ndGggOiBudWxsO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCwgZikge1xuICByZXR1cm4gKGYgPSB1LiQoZikpID9cbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbZih4KV0gPSAxLCBvYmopOyB9LCB7fSkgOlxuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialt4XSA9IDEsIG9iaik7IH0sIHt9KTtcbn07XG5cbnUua2V5c3RyID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIC8vIHVzZSB0byBlbnN1cmUgY29uc2lzdGVudCBrZXkgZ2VuZXJhdGlvbiBhY3Jvc3MgbW9kdWxlc1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGlmICghbikgcmV0dXJuICcnO1xuICBmb3IgKHZhciBzPVN0cmluZyh2YWx1ZXNbMF0pLCBpPTE7IGk8bjsgKytpKSB7XG4gICAgcyArPSAnfCcgKyBTdHJpbmcodmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbi8vIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnUuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG51LmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnUuaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbnUuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG51LmlzTnVtYmVyID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxudS5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG51LmlzRGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG51LmlzVmFsaWQgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqO1xufTtcblxudS5pc0J1ZmZlciA9ICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIEJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbi8vIHBhcnNlIGEgZGF0ZSB3aXRoIG9wdGlvbmFsIGQzLnRpbWUtZm9ybWF0IGZvcm1hdFxudS5kYXRlID0gZnVuY3Rpb24ocywgZm9ybWF0KSB7XG4gIHZhciBkID0gZm9ybWF0ID8gZm9ybWF0IDogRGF0ZTtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBkLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgPyBKU09OLnN0cmluZ2lmeSh4KVxuICAgIDogdS5pc1N0cmluZyh4KSA/ICgnXFwnJyt1dGlsX2VzY2FwZV9zdHIoeCkrJ1xcJycpIDogeDtcbn07XG5cbnZhciBlc2NhcGVfc3RyX3JlID0gLyhefFteXFxcXF0pJy9nO1xuXG5mdW5jdGlvbiB1dGlsX2VzY2FwZV9zdHIoeCkge1xuICByZXR1cm4geC5yZXBsYWNlKGVzY2FwZV9zdHJfcmUsICckMVxcXFxcXCcnKTtcbn1cblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnZhciBmaWVsZF9yZSA9IC9cXFsoLio/KVxcXXxbXi5cXFtdKy9nO1xuXG51LmZpZWxkID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gU3RyaW5nKGYpLm1hdGNoKGZpZWxkX3JlKS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkWzBdICE9PSAnWycgPyBkIDpcbiAgICAgIGRbMV0gIT09IFwiJ1wiICYmIGRbMV0gIT09ICdcIicgPyBkLnNsaWNlKDEsIC0xKSA6XG4gICAgICBkLnNsaWNlKDIsIC0yKS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCAnJDEnKTtcbiAgfSk7XG59O1xuXG51LmFjY2Vzc29yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIGY9PW51bGwgfHwgdS5pc0Z1bmN0aW9uKGYpID8gZiA6XG4gICAgdS5uYW1lZGZ1bmMoZiwgKHMgPSB1LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHMucmVkdWNlKGZ1bmN0aW9uKHgsZikgeyByZXR1cm4geFtmXTsgfSwgeCk7IH0gOlxuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4geFtmXTsgfVxuICAgICk7XG59O1xuXG4vLyBzaG9ydC1jdXQgZm9yIGFjY2Vzc29yXG51LiQgPSB1LmFjY2Vzc29yO1xuXG51Lm11dGF0b3IgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBzO1xuICByZXR1cm4gdS5pc1N0cmluZyhmKSAmJiAocz11LmZpZWxkKGYpKS5sZW5ndGggPiAxID9cbiAgICBmdW5jdGlvbih4LCB2KSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8cy5sZW5ndGgtMTsgKytpKSB4ID0geFtzW2ldXTtcbiAgICAgIHhbc1tpXV0gPSB2O1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHgsIHYpIHsgeFtmXSA9IHY7IH07XG59O1xuXG5cbnUuJGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24oZikge1xuICAgIGYgPSB1LiQoZikgfHwgdS5pZGVudGl0eTtcbiAgICB2YXIgbiA9IG5hbWUgKyAodS5uYW1lKGYpID8gJ18nK3UubmFtZShmKSA6ICcnKTtcbiAgICByZXR1cm4gdS5uYW1lZGZ1bmMobiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gb3AoZihkKSk7IH0pO1xuICB9O1xufTtcblxudS4kdmFsaWQgID0gdS4kZnVuYygndmFsaWQnLCB1LmlzVmFsaWQpO1xudS4kbGVuZ3RoID0gdS4kZnVuYygnbGVuZ3RoJywgdS5sZW5ndGgpO1xuXG51LiRpbiA9IGZ1bmN0aW9uKGYsIHZhbHVlcykge1xuICBmID0gdS4kKGYpO1xuICB2YXIgbWFwID0gdS5pc0FycmF5KHZhbHVlcykgPyB1LnRvTWFwKHZhbHVlcykgOiB2YWx1ZXM7XG4gIHJldHVybiBmdW5jdGlvbihkKSB7IHJldHVybiAhIW1hcFtmKGQpXTsgfTtcbn07XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLGIpIHtcbiAgICB2YXIgaSwgbiwgZiwgeCwgeTtcbiAgICBmb3IgKGk9MCwgbj1zb3J0Lmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGYgPSBzb3J0W2ldOyB4ID0gZihhKTsgeSA9IGYoYik7XG4gICAgICBpZiAoeCA8IHkpIHJldHVybiAtMSAqIHNpZ25baV07XG4gICAgICBpZiAoeCA+IHkpIHJldHVybiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChhID49IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChhID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gTmFOO1xufTtcblxudS5udW1jbXAgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcblxudS5zdGFibGVzb3J0ID0gZnVuY3Rpb24oYXJyYXksIHNvcnRCeSwga2V5Rm4pIHtcbiAgdmFyIGluZGljZXMgPSBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oaWR4LCB2LCBpKSB7XG4gICAgcmV0dXJuIChpZHhba2V5Rm4odildID0gaSwgaWR4KTtcbiAgfSwge30pO1xuXG4gIGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzYSA9IHNvcnRCeShhKSxcbiAgICAgICAgc2IgPSBzb3J0QnkoYik7XG4gICAgcmV0dXJuIHNhIDwgc2IgPyAtMSA6IHNhID4gc2IgPyAxXG4gICAgICAgICA6IChpbmRpY2VzW2tleUZuKGEpXSAtIGluZGljZXNba2V5Rm4oYildKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4vLyBzdHJpbmcgZnVuY3Rpb25zXG5cbnUucGFkID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHBhZGNoYXIpIHtcbiAgcGFkY2hhciA9IHBhZGNoYXIgfHwgXCIgXCI7XG4gIHZhciBkID0gbGVuZ3RoIC0gcy5sZW5ndGg7XG4gIGlmIChkIDw9IDApIHJldHVybiBzO1xuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIHN0cnJlcChkLCBwYWRjaGFyKSArIHM7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIHN0cnJlcChNYXRoLmZsb29yKGQvMiksIHBhZGNoYXIpICtcbiAgICAgICAgIHMgKyBzdHJyZXAoTWF0aC5jZWlsKGQvMiksIHBhZGNoYXIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcyArIHN0cnJlcChkLCBwYWRjaGFyKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RycmVwKG4sIHN0cikge1xuICB2YXIgcyA9IFwiXCIsIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgcyArPSBzdHI7XG4gIHJldHVybiBzO1xufVxuXG51LnRydW5jYXRlID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHdvcmQsIGVsbGlwc2lzKSB7XG4gIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgaWYgKGxlbiA8PSBsZW5ndGgpIHJldHVybiBzO1xuICBlbGxpcHNpcyA9IGVsbGlwc2lzICE9PSB1bmRlZmluZWQgPyBTdHJpbmcoZWxsaXBzaXMpIDogJ1xcdTIwMjYnO1xuICB2YXIgbCA9IE1hdGgubWF4KDAsIGxlbmd0aCAtIGVsbGlwc2lzLmxlbmd0aCk7XG5cbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsLDEpIDogcy5zbGljZShsZW4tbCkpO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHZhciBsMSA9IE1hdGguY2VpbChsLzIpLCBsMiA9IE1hdGguZmxvb3IobC8yKTtcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDEpIDogcy5zbGljZSgwLGwxKSkgK1xuICAgICAgICBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMiwxKSA6IHMuc2xpY2UobGVuLWwyKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCkgOiBzLnNsaWNlKDAsbCkpICsgZWxsaXBzaXM7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHRydW5jYXRlT25Xb3JkKHMsIGxlbiwgcmV2KSB7XG4gIHZhciBjbnQgPSAwLCB0b2sgPSBzLnNwbGl0KHRydW5jYXRlX3dvcmRfcmUpO1xuICBpZiAocmV2KSB7XG4gICAgcyA9ICh0b2sgPSB0b2sucmV2ZXJzZSgpKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pXG4gICAgICAucmV2ZXJzZSgpO1xuICB9IGVsc2Uge1xuICAgIHMgPSB0b2suZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSk7XG4gIH1cbiAgcmV0dXJuIHMubGVuZ3RoID8gcy5qb2luKCcnKS50cmltKCkgOiB0b2tbMF0uc2xpY2UoMCwgbGVuKTtcbn1cblxudmFyIHRydW5jYXRlX3dvcmRfcmUgPSAvKFtcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MjAyOFxcdTIwMjlcXHUzMDAwXFx1RkVGRl0pLztcbiJdfQ==
