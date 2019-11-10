(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict';

function dsv(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var o;
    return parseRows(text, function(row, i) {
      if (o) return o(row, i - 1);
      var a = new Function("d", "return {" + row.map(function(name, i) {
        return JSON.stringify(name) + ": d[" + i + "]";
      }).join(",") + "}");
      o = f ? function(row, i) { return f(a(row), i); } : a;
    });
  }

  function parseRows(text, f) {
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

  function format(rows) {
    if (Array.isArray(rows[0])) return formatRows(rows); // deprecated; use formatRows
    var fieldSet = Object.create(null), fields = [];

    // Compute unique fields in order of discovery.
    rows.forEach(function(row) {
      for (var field in row) {
        if (!((field += "") in fieldSet)) {
          fields.push(fieldSet[field] = field);
        }
      }
    });

    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
      return fields.map(function(field) {
        return formatValue(row[field]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};

var csv = dsv(",");
var tsv = dsv("\t");

exports.csv = csv;
exports.tsv = tsv;
exports.dsv = dsv;
},{}],3:[function(require,module,exports){
'use strict';

var zhCn = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["¥", ""]
};

var svSe = {
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "SEK"]
};

var ruRu = {
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0руб."]
};

var ptBr = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["R$", ""]
};

var plPl = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "zł"]
};

var nlNl = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["€\xa0", ""]
};

var mkMk = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\xa0ден."]
};

var koKr = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["₩", ""]
};

var jaJp = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["", "円"]
};

var itIt = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["€", ""]
};

var huHu = {
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0Ft"]
};

var heIl = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["₪", ""]
};

var frFr = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\xa0€"]
};

var frCa = {
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "$"]
};

var fiFi = {
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0€"]
};

var esEs = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\xa0€"]
};

var enUs = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};

var enGb = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["£", ""]
};

var enCa = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};

var deDe = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\xa0€"]
};

var deCh = {
  decimal: ",",
  thousands: "'",
  grouping: [3],
  currency: ["", "\xa0CHF"]
};

var caEs = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\xa0€"]
};

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

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
};

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
};

function precisionRound(step, max) {
  return Math.max(0, exponent(Math.abs(max)) - exponent(Math.abs(step))) + 1;
};

var localeDefinitions = {
  "ca-ES": caEs,
  "de-CH": deCh,
  "de-DE": deDe,
  "en-CA": enCa,
  "en-GB": enGb,
  "en-US": enUs,
  "es-ES": esEs,
  "fi-FI": fiFi,
  "fr-CA": frCa,
  "fr-FR": frFr,
  "he-IL": heIl,
  "hu-HU": huHu,
  "it-IT": itIt,
  "ja-JP": jaJp,
  "ko-KR": koKr,
  "mk-MK": mkMk,
  "nl-NL": nlNl,
  "pl-PL": plPl,
  "pt-BR": ptBr,
  "ru-RU": ruRu,
  "sv-SE": svSe,
  "zh-CN": zhCn
};

var defaultLocale = locale(enUs);
var format = defaultLocale.format;
var formatPrefix = defaultLocale.formatPrefix;

function localeFormat(definition) {
  if (typeof definition === "string") {
    if (!localeDefinitions.hasOwnProperty(definition)) return null;
    definition = localeDefinitions[definition];
  }
  return locale(definition);
};

exports.format = format;
exports.formatPrefix = formatPrefix;
exports.localeFormat = localeFormat;
exports.formatSpecifier = formatSpecifier;
exports.precisionFixed = precisionFixed;
exports.precisionPrefix = precisionPrefix;
exports.precisionRound = precisionRound;

},{}],4:[function(require,module,exports){
'use strict';

var d3Time = require('d3-time');

var zhCn = {
  dateTime: "%a %b %e %X %Y",
  date: "%Y/%-m/%-d",
  time: "%H:%M:%S",
  periods: ["上午", "下午"],
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};

var svSe = {
  dateTime: "%A den %d %B %Y %X",
  date: "%Y-%m-%d",
  time: "%H:%M:%S",
  periods: ["fm", "em"],
  days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
  shortDays: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
  months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
};

var ruRu = {
  dateTime: "%A, %e %B %Y г. %X",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
  shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
};

var ptBr = {
  dateTime: "%A, %e de %B de %Y. %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
};

var plPl = {
  dateTime: "%A, %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
  shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
  months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
  shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
};

var nlNl = {
  dateTime: "%a %e %B %Y %T",
  date: "%d-%m-%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
  shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
};

var mkMk = {
  dateTime: "%A, %e %B %Y г. %X",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
  shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
  months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
  shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
};

var koKr = {
  dateTime: "%Y/%m/%d %a %X",
  date: "%Y/%m/%d",
  time: "%H:%M:%S",
  periods: ["오전", "오후"],
  days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  shortDays: ["일", "월", "화", "수", "목", "금", "토"],
  months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
};

var jaJp = {
  dateTime: "%Y %b %e %a %X",
  date: "%Y/%m/%d",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  shortDays: ["日", "月", "火", "水", "木", "金", "土"],
  months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
  shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
};

var itIt = {
  dateTime: "%A %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
};

var huHu = {
  dateTime: "%Y. %B %-e., %A %X",
  date: "%Y. %m. %d.",
  time: "%H:%M:%S",
  periods: ["de.", "du."], // unused
  days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
  shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
  months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
  shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
};

var heIl = {
  dateTime: "%A, %e ב%B %Y %X",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
  shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
  months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
  shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
};

var frFr = {
  dateTime: "%A, le %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};

var frCa = {
  dateTime: "%a %e %b %Y %X",
  date: "%Y-%m-%d",
  time: "%H:%M:%S",
  periods: ["", ""],
  days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
};

var fiFi = {
  dateTime: "%A, %-d. %Bta %Y klo %X",
  date: "%-d.%-m.%Y",
  time: "%H:%M:%S",
  periods: ["a.m.", "p.m."],
  days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
  shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
  months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
  shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
};

var esEs = {
  dateTime: "%A, %e de %B de %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

var locale$1 = {
  dateTime: "%a %b %e %X %Y",
  date: "%m/%d/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};

var enGb = {
  dateTime: "%a %e %b %X %Y",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};

var enCa = {
  dateTime: "%a %b %e %X %Y",
  date: "%Y-%m-%d",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};

var deDe = {
  dateTime: "%A, der %e. %B %Y, %X",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
};

var deCh = {
  dateTime: "%A, der %e. %B %Y, %X",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
};

var caEs = {
  dateTime: "%A, %e de %B de %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
  shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
  months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
  shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
};

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

function locale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodLookup = formatLookup(locale_periods),
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

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          if (format = formats[c]) c = format(date, pad == null ? (c === "e" ? " " : "0") : pad);
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
          i = parseSpecifier(d, specifier, string, 0);
      if (i != string.length) return null;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        if ("w" in d && ("W" in d || "U" in d)) {
          var day = utcDate(newYear(d.y)).getUTCDay();
          if ("W" in d) d.U = d.W, d.w = (d.w + 6) % 7, --day;
          d.m = 0;
          d.d = d.w + d.U * 7 - (day + 6) % 7;
        }
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      if ("w" in d && ("W" in d || "U" in d)) {
        var day = newDate(newYear(d.y)).getDay();
        if ("W" in d) d.U = d.W, d.w = (d.w + 6) % 7, --day;
        d.m = 0;
        d.d = d.w + d.U * 7 - (day + 6) % 7;
      }
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

  function parsePeriod(d, string, i) {
    var n = periodLookup[string.slice(i, i += 2).toLowerCase()];
    return n == null ? -1 : (d.p = n, i);
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
  if (n) {
    d.Z = n[1] ? 0              // 'Z' for UTC
        : n[3] ? -(n[2] + n[3]) // sign differs from getTimezoneOffset!
               : -n[2] * 100;
    return i + n[0].length;
  }
  return -1;
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
    : locale$1.utcFormat(isoSpecifier);

var localeDefinitions = {
  "ca-ES": caEs,
  "de-CH": deCh,
  "de-DE": deDe,
  "en-CA": enCa,
  "en-GB": enGb,
  "en-US": locale$1,
  "es-ES": esEs,
  "fi-FI": fiFi,
  "fr-CA": frCa,
  "fr-FR": frFr,
  "he-IL": heIl,
  "hu-HU": huHu,
  "it-IT": itIt,
  "ja-JP": jaJp,
  "ko-KR": koKr,
  "mk-MK": mkMk,
  "nl-NL": nlNl,
  "pl-PL": plPl,
  "pt-BR": ptBr,
  "ru-RU": ruRu,
  "sv-SE": svSe,
  "zh-CN": zhCn
};

var defaultLocale = locale(locale$1);
var format$1 = defaultLocale.format;
var utcFormat = defaultLocale.utcFormat;

function localeFormat(definition) {
  if (typeof definition === "string") {
    if (!localeDefinitions.hasOwnProperty(definition)) return null;
    definition = localeDefinitions[definition];
  }
  return locale(definition);
};

exports.format = format$1;
exports.utcFormat = utcFormat;
exports.localeFormat = localeFormat;
exports.isoFormat = formatIso;
},{"d3-time":5}],5:[function(require,module,exports){
'use strict';

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
exports.interval = newInterval;
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
},{}],6:[function(require,module,exports){
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

},{"../util":28,"./collector":7,"./measures":9}],7:[function(require,module,exports){
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

},{"../stats":25,"../util":28}],8:[function(require,module,exports){
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

},{"../util":28,"./aggregator":6}],9:[function(require,module,exports){
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

},{"../stats":25,"../util":28}],10:[function(require,module,exports){
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

},{"../time":27,"../util":28}],11:[function(require,module,exports){
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

},{"../generate":13,"../import/type":22,"../stats":25,"../util":28,"./bins":10}],12:[function(require,module,exports){
var d3_time = require('d3-time'),
    d3_timeF = require('d3-time-format'),
    d3_numberF = require('d3-format'),
    numberF = d3_numberF, // defaults to EN-US
    timeF = d3_timeF;     // defaults to EN-US

function numberLocale(l) {
  var f = d3_numberF.localeFormat(l);
  if (f == null) throw Error('Unrecognized locale: ' + l);
  numberF = f;
}

function timeLocale(l) {
  var f = d3_timeF.localeFormat(l);
  if (f == null) throw Error('Unrecognized locale: ' + l);
  timeF = f;
}

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
    number:   numberAutoFormat,
    time:     function() { return timeAutoFormat(); },
    utc:      function() { return utcAutoFormat(); }
  }
};

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function intervals(domain, count) {
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

function significantDigits(domain) {
  return domain.map(function(x) {
    // determine significant digits based on exponential format
    var s = x.toExponential(),
        e = s.indexOf('e'),
        d = s.indexOf('.');
    return d < 0 ? 1 : (e-d);
  }).reduce(function(max, p) {
    // return the maximum sig digit count
    return Math.max(max, p);
  }, 0);
}

function numberAutoFormat(domain, count, f) {
  var range = intervals(domain, count);
  if (f == null) {
    f = ',.' + d3_numberF.precisionFixed(range[2]) + 'f';
  } else {
    switch (f = d3_numberF.formatSpecifier(f), f.type) {
      case 's': {
        if (f.precision == null) f.precision = significantDigits(domain);
        return numberF.format(f);
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
        if (f.precision == null) f.precision = d3_numberF.precisionFixed(range[2]) - (f.type === '%') * 2;
        break;
      }
    }
  }
  return numberF.format(f);
}

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

},{"d3-format":3,"d3-time":5,"d3-time-format":4}],13:[function(require,module,exports){
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
  f.samples = function(n) { return gen.zeros(n).map(f); };
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
  f.samples = function(n) { return gen.zeros(n).map(f); };
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
  f.samples = function(n) { return gen.zeros(n).map(f); };
  return f;
};

},{}],14:[function(require,module,exports){
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

},{"../../util":28,"d3-dsv":2}],15:[function(require,module,exports){
var dsv = require('./dsv');

module.exports = {
  json: require('./json'),
  topojson: require('./topojson'),
  treejson: require('./treejson'),
  dsv: dsv,
  csv: dsv.delimiter(','),
  tsv: dsv.delimiter('\t')
};

},{"./dsv":14,"./json":16,"./topojson":17,"./treejson":18}],16:[function(require,module,exports){
var util = require('../../util');

module.exports = function(data, format) {
  var d = util.isObject(data) && !util.isBuffer(data) ?
    data : JSON.parse(data);
  if (format && format.property) {
    d = util.accessor(format.property)(d);
  }
  return d;
};

},{"../../util":28}],17:[function(require,module,exports){
(function (global){
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

reader.topojson = (typeof window !== "undefined" ? window['topojson'] : typeof global !== "undefined" ? global['topojson'] : null);
module.exports = reader;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./json":16}],18:[function(require,module,exports){
var json = require('./json');

module.exports = function(tree, format) {
  return toTable(json(tree, format), format);
};

function toTable(root, fields) {
  var childrenField = fields && fields.children || 'children',
      parentField = fields && fields.parent || '_parent',
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

},{"./json":16}],19:[function(require,module,exports){
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

},{"fs":1,"request":1,"sync-request":1,"url":1}],20:[function(require,module,exports){
var util = require('../util');
var type = require('./type');
var formats = require('./formats');

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
  parsers = cols.map(function(c) { return type.parsers[types[c]]; });

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

},{"../util":28,"./formats":15,"./type":22}],21:[function(require,module,exports){
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

},{"../util":28,"./load":19,"./read":20}],22:[function(require,module,exports){
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

},{"../util":28}],23:[function(require,module,exports){
var util = require('./util');

var dl = {
  version:    '1.4.8',
  load:       require('./import/load'),
  read:       require('./import/read'),
  type:       require('./import/type'),
  Aggregator: require('./aggregate/aggregator'),
  groupby:    require('./aggregate/groupby'),
  bins:       require('./bins/bins'),
  $bin:       require('./bins/histogram').$bin,
  histogram:  require('./bins/histogram').histogram,
  format:     require('./format'),
  print:      require('./print'),
  template:   require('./template'),
  time:       require('./time')
};

util.extend(dl, util);
util.extend(dl, require('./generate'));
util.extend(dl, require('./stats'));
util.extend(dl, require('./import/readers'));

module.exports = dl;

},{"./aggregate/aggregator":6,"./aggregate/groupby":8,"./bins/bins":10,"./bins/histogram":11,"./format":12,"./generate":13,"./import/load":19,"./import/read":20,"./import/readers":21,"./import/type":22,"./print":24,"./stats":25,"./template":26,"./time":27,"./util":28}],24:[function(require,module,exports){
var util = require('./util');
var type = require('./import/type');
var stats = require('./stats');
var template = require('./template');

var FMT = {
  'date':    '|time:"%m/%d/%Y %H:%M:%S"',
  'number':  '|number:".4f"',
  'integer': '|number:"d"'
};

var POS = {
  'number':  'left',
  'integer': 'left'
};

module.exports.table = function(data, opt) {
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
};

module.exports.summary = function(s) {
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
};

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

},{"./import/type":22,"./stats":25,"./template":26,"./util":28}],25:[function(require,module,exports){
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

},{"./generate":13,"./import/type":22,"./util":28}],26:[function(require,module,exports){
var util = require('./util'),
    format = require('./format');

var context = {
  formats:    [],
  format_map: {},
  truncate:   util.truncate,
  pad:        util.pad
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

},{"./format":12,"./util":28}],27:[function(require,module,exports){
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

},{"d3-time":5}],28:[function(require,module,exports){
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

u.date = function(s) {
  return s == null || s === '' ? null : Date.parse(s);
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

},{"./time":27,"buffer":1}]},{},[23])(23)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLWRzdi9idWlsZC9kc3YuY2pzLmpzIiwibm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9idWlsZC9mb3JtYXQuY2pzLmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUtZm9ybWF0L2J1aWxkL3RpbWUtZm9ybWF0LmNqcy5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lL2J1aWxkL3RpbWUuY2pzLmpzIiwic3JjL2FnZ3JlZ2F0ZS9hZ2dyZWdhdG9yLmpzIiwic3JjL2FnZ3JlZ2F0ZS9jb2xsZWN0b3IuanMiLCJzcmMvYWdncmVnYXRlL2dyb3VwYnkuanMiLCJzcmMvYWdncmVnYXRlL21lYXN1cmVzLmpzIiwic3JjL2JpbnMvYmlucy5qcyIsInNyYy9iaW5zL2hpc3RvZ3JhbS5qcyIsInNyYy9mb3JtYXQuanMiLCJzcmMvZ2VuZXJhdGUuanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvZHN2LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2luZGV4LmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdG9wb2pzb24uanMiLCJzcmMvaW1wb3J0L2Zvcm1hdHMvdHJlZWpzb24uanMiLCJzcmMvaW1wb3J0L2xvYWQuanMiLCJzcmMvaW1wb3J0L3JlYWQuanMiLCJzcmMvaW1wb3J0L3JlYWRlcnMuanMiLCJzcmMvaW1wb3J0L3R5cGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcHJpbnQuanMiLCJzcmMvc3RhdHMuanMiLCJzcmMvdGVtcGxhdGUuanMiLCJzcmMvdGltZS5qcyIsInNyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3plQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIixudWxsLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIpIHtcbiAgdmFyIHJlRm9ybWF0ID0gbmV3IFJlZ0V4cChcIltcXFwiXCIgKyBkZWxpbWl0ZXIgKyBcIlxcbl1cIiksXG4gICAgICBkZWxpbWl0ZXJDb2RlID0gZGVsaW1pdGVyLmNoYXJDb2RlQXQoMCk7XG5cbiAgZnVuY3Rpb24gcGFyc2UodGV4dCwgZikge1xuICAgIHZhciBvO1xuICAgIHJldHVybiBwYXJzZVJvd3ModGV4dCwgZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgICBpZiAobykgcmV0dXJuIG8ocm93LCBpIC0gMSk7XG4gICAgICB2YXIgYSA9IG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgcm93Lm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiOiBkW1wiICsgaSArIFwiXVwiO1xuICAgICAgfSkuam9pbihcIixcIikgKyBcIn1cIik7XG4gICAgICBvID0gZiA/IGZ1bmN0aW9uKHJvdywgaSkgeyByZXR1cm4gZihhKHJvdyksIGkpOyB9IDogYTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlUm93cyh0ZXh0LCBmKSB7XG4gICAgdmFyIEVPTCA9IHt9LCAvLyBzZW50aW5lbCB2YWx1ZSBmb3IgZW5kLW9mLWxpbmVcbiAgICAgICAgRU9GID0ge30sIC8vIHNlbnRpbmVsIHZhbHVlIGZvciBlbmQtb2YtZmlsZVxuICAgICAgICByb3dzID0gW10sIC8vIG91dHB1dCByb3dzXG4gICAgICAgIE4gPSB0ZXh0Lmxlbmd0aCxcbiAgICAgICAgSSA9IDAsIC8vIGN1cnJlbnQgY2hhcmFjdGVyIGluZGV4XG4gICAgICAgIG4gPSAwLCAvLyB0aGUgY3VycmVudCBsaW5lIG51bWJlclxuICAgICAgICB0LCAvLyB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICBlb2w7IC8vIGlzIHRoZSBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgIGZ1bmN0aW9uIHRva2VuKCkge1xuICAgICAgaWYgKEkgPj0gTikgcmV0dXJuIEVPRjsgLy8gc3BlY2lhbCBjYXNlOiBlbmQgb2YgZmlsZVxuICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7IC8vIHNwZWNpYWwgY2FzZTogZW5kIG9mIGxpbmVcblxuICAgICAgLy8gc3BlY2lhbCBjYXNlOiBxdW90ZXNcbiAgICAgIHZhciBqID0gSTtcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IDM0KSB7XG4gICAgICAgIHZhciBpID0gajtcbiAgICAgICAgd2hpbGUgKGkrKyA8IE4pIHtcbiAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpID09PSAzNCkge1xuICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMSkgIT09IDM0KSBicmVhaztcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSSA9IGkgKyAyO1xuICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgIGlmIChjID09PSAxMykge1xuICAgICAgICAgIGVvbCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMikgPT09IDEwKSArK0k7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gMTApIHtcbiAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGogKyAxLCBpKS5yZXBsYWNlKC9cIlwiL2csIFwiXFxcIlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29tbW9uIGNhc2U6IGZpbmQgbmV4dCBkZWxpbWl0ZXIgb3IgbmV3bGluZVxuICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KEkrKyksIGsgPSAxO1xuICAgICAgICBpZiAoYyA9PT0gMTApIGVvbCA9IHRydWU7IC8vIFxcblxuICAgICAgICBlbHNlIGlmIChjID09PSAxMykgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSAxMCkgKytJLCArK2s7IH0gLy8gXFxyfFxcclxcblxuICAgICAgICBlbHNlIGlmIChjICE9PSBkZWxpbWl0ZXJDb2RlKSBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgSSAtIGspO1xuICAgICAgfVxuXG4gICAgICAvLyBzcGVjaWFsIGNhc2U6IGxhc3QgdG9rZW4gYmVmb3JlIEVPRlxuICAgICAgcmV0dXJuIHRleHQuc2xpY2Uoaik7XG4gICAgfVxuXG4gICAgd2hpbGUgKCh0ID0gdG9rZW4oKSkgIT09IEVPRikge1xuICAgICAgdmFyIGEgPSBbXTtcbiAgICAgIHdoaWxlICh0ICE9PSBFT0wgJiYgdCAhPT0gRU9GKSB7XG4gICAgICAgIGEucHVzaCh0KTtcbiAgICAgICAgdCA9IHRva2VuKCk7XG4gICAgICB9XG4gICAgICBpZiAoZiAmJiAoYSA9IGYoYSwgbisrKSkgPT0gbnVsbCkgY29udGludWU7XG4gICAgICByb3dzLnB1c2goYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXQocm93cykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJvd3NbMF0pKSByZXR1cm4gZm9ybWF0Um93cyhyb3dzKTsgLy8gZGVwcmVjYXRlZDsgdXNlIGZvcm1hdFJvd3NcbiAgICB2YXIgZmllbGRTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpLCBmaWVsZHMgPSBbXTtcblxuICAgIC8vIENvbXB1dGUgdW5pcXVlIGZpZWxkcyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG4gICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuICAgICAgZm9yICh2YXIgZmllbGQgaW4gcm93KSB7XG4gICAgICAgIGlmICghKChmaWVsZCArPSBcIlwiKSBpbiBmaWVsZFNldCkpIHtcbiAgICAgICAgICBmaWVsZHMucHVzaChmaWVsZFNldFtmaWVsZF0gPSBmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBbZmllbGRzLm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpXS5jb25jYXQocm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICByZXR1cm4gZmllbGRzLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2ZpZWxkXSk7XG4gICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgfSkpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3dzKHJvd3MpIHtcbiAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHJlRm9ybWF0LnRlc3QodGV4dCkgPyBcIlxcXCJcIiArIHRleHQucmVwbGFjZSgvXFxcIi9nLCBcIlxcXCJcXFwiXCIpICsgXCJcXFwiXCIgOiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgcGFyc2VSb3dzOiBwYXJzZVJvd3MsXG4gICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgZm9ybWF0Um93czogZm9ybWF0Um93c1xuICB9O1xufTtcblxudmFyIGNzdiA9IGRzdihcIixcIik7XG52YXIgdHN2ID0gZHN2KFwiXFx0XCIpO1xuXG5leHBvcnRzLmNzdiA9IGNzdjtcbmV4cG9ydHMudHN2ID0gdHN2O1xuZXhwb3J0cy5kc3YgPSBkc3Y7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgemhDbiA9IHtcbiAgZGVjaW1hbDogXCIuXCIsXG4gIHRob3VzYW5kczogXCIsXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCLCpVwiLCBcIlwiXVxufTtcblxudmFyIHN2U2UgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlNFS1wiXVxufTtcblxudmFyIHJ1UnUgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw0YDRg9CxLlwiXVxufTtcblxudmFyIHB0QnIgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiLlwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiUiRcIiwgXCJcIl1cbn07XG5cbnZhciBwbFBsID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIi5cIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcInrFglwiXVxufTtcblxudmFyIG5sTmwgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiLlwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wi4oKsXFx4YTBcIiwgXCJcIl1cbn07XG5cbnZhciBta01rID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIi5cIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw0LTQtdC9LlwiXVxufTtcblxudmFyIGtvS3IgPSB7XG4gIGRlY2ltYWw6IFwiLlwiLFxuICB0aG91c2FuZHM6IFwiLFwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wi4oKpXCIsIFwiXCJdXG59O1xuXG52YXIgamFKcCA9IHtcbiAgZGVjaW1hbDogXCIuXCIsXG4gIHRob3VzYW5kczogXCIsXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCJcIiwgXCLlhoZcIl1cbn07XG5cbnZhciBpdEl0ID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIi5cIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIuKCrFwiLCBcIlwiXVxufTtcblxudmFyIGh1SHUgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEwRnRcIl1cbn07XG5cbnZhciBoZUlsID0ge1xuICBkZWNpbWFsOiBcIi5cIixcbiAgdGhvdXNhbmRzOiBcIixcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIuKCqlwiLCBcIlwiXVxufTtcblxudmFyIGZyRnIgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiLlwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbn07XG5cbnZhciBmckNhID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIlxceGEwXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCJcIiwgXCIkXCJdXG59O1xuXG52YXIgZmlGaSA9IHtcbiAgZGVjaW1hbDogXCIsXCIsXG4gIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbn07XG5cbnZhciBlc0VzID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIi5cIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEw4oKsXCJdXG59O1xuXG52YXIgZW5VcyA9IHtcbiAgZGVjaW1hbDogXCIuXCIsXG4gIHRob3VzYW5kczogXCIsXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCIkXCIsIFwiXCJdXG59O1xuXG52YXIgZW5HYiA9IHtcbiAgZGVjaW1hbDogXCIuXCIsXG4gIHRob3VzYW5kczogXCIsXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCLCo1wiLCBcIlwiXVxufTtcblxudmFyIGVuQ2EgPSB7XG4gIGRlY2ltYWw6IFwiLlwiLFxuICB0aG91c2FuZHM6IFwiLFwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiJFwiLCBcIlwiXVxufTtcblxudmFyIGRlRGUgPSB7XG4gIGRlY2ltYWw6IFwiLFwiLFxuICB0aG91c2FuZHM6IFwiLlwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbn07XG5cbnZhciBkZUNoID0ge1xuICBkZWNpbWFsOiBcIixcIixcbiAgdGhvdXNhbmRzOiBcIidcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIlwiLCBcIlxceGEwQ0hGXCJdXG59O1xuXG52YXIgY2FFcyA9IHtcbiAgZGVjaW1hbDogXCIsXCIsXG4gIHRob3VzYW5kczogXCIuXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMOKCrFwiXVxufTtcblxuLy8gQ29tcHV0ZXMgdGhlIGRlY2ltYWwgY29lZmZpY2llbnQgYW5kIGV4cG9uZW50IG9mIHRoZSBzcGVjaWZpZWQgbnVtYmVyIHggd2l0aFxuLy8gc2lnbmlmaWNhbnQgZGlnaXRzIHAsIHdoZXJlIHggaXMgcG9zaXRpdmUgYW5kIHAgaXMgaW4gWzEsIDIxXSBvciB1bmRlZmluZWQuXG4vLyBGb3IgZXhhbXBsZSwgZm9ybWF0RGVjaW1hbCgxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbmZ1bmN0aW9uIGZvcm1hdERlY2ltYWwoeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn07XG5cbmZ1bmN0aW9uIGV4cG9uZW50KHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsKE1hdGguYWJzKHgpKSwgeCA/IHhbMV0gOiBOYU47XG59O1xuXG5mdW5jdGlvbiBmb3JtYXRHcm91cChncm91cGluZywgdGhvdXNhbmRzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgd2lkdGgpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgdCA9IFtdLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgZyA9IGdyb3VwaW5nWzBdLFxuICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgd2hpbGUgKGkgPiAwICYmIGcgPiAwKSB7XG4gICAgICBpZiAobGVuZ3RoICsgZyArIDEgPiB3aWR0aCkgZyA9IE1hdGgubWF4KDEsIHdpZHRoIC0gbGVuZ3RoKTtcbiAgICAgIHQucHVzaCh2YWx1ZS5zdWJzdHJpbmcoaSAtPSBnLCBpICsgZykpO1xuICAgICAgaWYgKChsZW5ndGggKz0gZyArIDEpID4gd2lkdGgpIGJyZWFrO1xuICAgICAgZyA9IGdyb3VwaW5nW2ogPSAoaiArIDEpICUgZ3JvdXBpbmcubGVuZ3RoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbih0aG91c2FuZHMpO1xuICB9O1xufTtcblxudmFyIHByZWZpeEV4cG9uZW50O1xuXG5mdW5jdGlvbiBmb3JtYXRQcmVmaXhBdXRvKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsKHgsIHApO1xuICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgIGV4cG9uZW50ID0gZFsxXSxcbiAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgIG4gPSBjb2VmZmljaWVudC5sZW5ndGg7XG4gIHJldHVybiBpID09PSBuID8gY29lZmZpY2llbnRcbiAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICA6IGkgPiAwID8gY29lZmZpY2llbnQuc2xpY2UoMCwgaSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGkpXG4gICAgICA6IFwiMC5cIiArIG5ldyBBcnJheSgxIC0gaSkuam9pbihcIjBcIikgKyBmb3JtYXREZWNpbWFsKHgsIE1hdGgubWF4KDAsIHAgKyBpIC0gMSkpWzBdOyAvLyBsZXNzIHRoYW4gMXkhXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRSb3VuZGVkKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsKHgsIHApO1xuICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgIGV4cG9uZW50ID0gZFsxXTtcbiAgcmV0dXJuIGV4cG9uZW50IDwgMCA/IFwiMC5cIiArIG5ldyBBcnJheSgtZXhwb25lbnQpLmpvaW4oXCIwXCIpICsgY29lZmZpY2llbnRcbiAgICAgIDogY29lZmZpY2llbnQubGVuZ3RoID4gZXhwb25lbnQgKyAxID8gY29lZmZpY2llbnQuc2xpY2UoMCwgZXhwb25lbnQgKyAxKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoZXhwb25lbnQgKyAxKVxuICAgICAgOiBjb2VmZmljaWVudCArIG5ldyBBcnJheShleHBvbmVudCAtIGNvZWZmaWNpZW50Lmxlbmd0aCArIDIpLmpvaW4oXCIwXCIpO1xufTtcblxuZnVuY3Rpb24gZm9ybWF0RGVmYXVsdCh4LCBwKSB7XG4gIHggPSB4LnRvUHJlY2lzaW9uKHApO1xuXG4gIG91dDogZm9yICh2YXIgbiA9IHgubGVuZ3RoLCBpID0gMSwgaTAgPSAtMSwgaTE7IGkgPCBuOyArK2kpIHtcbiAgICBzd2l0Y2ggKHhbaV0pIHtcbiAgICAgIGNhc2UgXCIuXCI6IGkwID0gaTEgPSBpOyBicmVhaztcbiAgICAgIGNhc2UgXCIwXCI6IGlmIChpMCA9PT0gMCkgaTAgPSBpOyBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcImVcIjogYnJlYWsgb3V0O1xuICAgICAgZGVmYXVsdDogaWYgKGkwID4gMCkgaTAgPSAwOyBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaTAgPiAwID8geC5zbGljZSgwLCBpMCkgKyB4LnNsaWNlKGkxICsgMSkgOiB4O1xufTtcblxudmFyIGZvcm1hdFR5cGVzID0ge1xuICBcIlwiOiBmb3JtYXREZWZhdWx0LFxuICBcIiVcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gKHggKiAxMDApLnRvRml4ZWQocCk7IH0sXG4gIFwiYlwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDIpOyB9LFxuICBcImNcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4geCArIFwiXCI7IH0sXG4gIFwiZFwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDEwKTsgfSxcbiAgXCJlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9FeHBvbmVudGlhbChwKTsgfSxcbiAgXCJmXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9GaXhlZChwKTsgfSxcbiAgXCJnXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9QcmVjaXNpb24ocCk7IH0sXG4gIFwib1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDgpOyB9LFxuICBcInBcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKTsgfSxcbiAgXCJyXCI6IGZvcm1hdFJvdW5kZWQsXG4gIFwic1wiOiBmb3JtYXRQcmVmaXhBdXRvLFxuICBcIlhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfSxcbiAgXCJ4XCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpOyB9XG59O1xuXG4vLyBbW2ZpbGxdYWxpZ25dW3NpZ25dW3N5bWJvbF1bMF1bd2lkdGhdWyxdWy5wcmVjaXNpb25dW3R5cGVdXG52YXIgcmUgPSAvXig/OiguKT8oWzw+PV5dKSk/KFsrXFwtXFwoIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KFthLXolXSk/JC9pO1xuXG5mdW5jdGlvbiBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHJldHVybiBuZXcgRm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG59O1xuXG5mdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIGlmICghKG1hdGNoID0gcmUuZXhlYyhzcGVjaWZpZXIpKSkgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBmb3JtYXQ6IFwiICsgc3BlY2lmaWVyKTtcblxuICB2YXIgbWF0Y2gsXG4gICAgICBmaWxsID0gbWF0Y2hbMV0gfHwgXCIgXCIsXG4gICAgICBhbGlnbiA9IG1hdGNoWzJdIHx8IFwiPlwiLFxuICAgICAgc2lnbiA9IG1hdGNoWzNdIHx8IFwiLVwiLFxuICAgICAgc3ltYm9sID0gbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgIHplcm8gPSAhIW1hdGNoWzVdLFxuICAgICAgd2lkdGggPSBtYXRjaFs2XSAmJiArbWF0Y2hbNl0sXG4gICAgICBjb21tYSA9ICEhbWF0Y2hbN10sXG4gICAgICBwcmVjaXNpb24gPSBtYXRjaFs4XSAmJiArbWF0Y2hbOF0uc2xpY2UoMSksXG4gICAgICB0eXBlID0gbWF0Y2hbOV0gfHwgXCJcIjtcblxuICAvLyBUaGUgXCJuXCIgdHlwZSBpcyBhbiBhbGlhcyBmb3IgXCIsZ1wiLlxuICBpZiAodHlwZSA9PT0gXCJuXCIpIGNvbW1hID0gdHJ1ZSwgdHlwZSA9IFwiZ1wiO1xuXG4gIC8vIE1hcCBpbnZhbGlkIHR5cGVzIHRvIHRoZSBkZWZhdWx0IGZvcm1hdC5cbiAgZWxzZSBpZiAoIWZvcm1hdFR5cGVzW3R5cGVdKSB0eXBlID0gXCJcIjtcblxuICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgaWYgKHplcm8gfHwgKGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikpIHplcm8gPSB0cnVlLCBmaWxsID0gXCIwXCIsIGFsaWduID0gXCI9XCI7XG5cbiAgdGhpcy5maWxsID0gZmlsbDtcbiAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICB0aGlzLnNpZ24gPSBzaWduO1xuICB0aGlzLnN5bWJvbCA9IHN5bWJvbDtcbiAgdGhpcy56ZXJvID0gemVybztcbiAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB0aGlzLmNvbW1hID0gY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gcHJlY2lzaW9uO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT0gbnVsbCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT0gbnVsbCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG5cbnZhciBwcmVmaXhlcyA9IFtcInlcIixcInpcIixcImFcIixcImZcIixcInBcIixcIm5cIixcIsK1XCIsXCJtXCIsXCJcIixcImtcIixcIk1cIixcIkdcIixcIlRcIixcIlBcIixcIkVcIixcIlpcIixcIllcIl07XG5cbmZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgcmV0dXJuIHg7XG59XG5cbmZ1bmN0aW9uIGxvY2FsZShsb2NhbGUpIHtcbiAgdmFyIGdyb3VwID0gbG9jYWxlLmdyb3VwaW5nICYmIGxvY2FsZS50aG91c2FuZHMgPyBmb3JtYXRHcm91cChsb2NhbGUuZ3JvdXBpbmcsIGxvY2FsZS50aG91c2FuZHMpIDogaWRlbnRpdHksXG4gICAgICBjdXJyZW5jeSA9IGxvY2FsZS5jdXJyZW5jeSxcbiAgICAgIGRlY2ltYWwgPSBsb2NhbGUuZGVjaW1hbDtcblxuICBmdW5jdGlvbiBmb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgc2lnbiA9IHNwZWNpZmllci5zaWduLFxuICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgIHdpZHRoID0gc3BlY2lmaWVyLndpZHRoLFxuICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgdHlwZSA9IHNwZWNpZmllci50eXBlO1xuXG4gICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgLy8gRm9yIFNJLXByZWZpeCwgdGhlIHN1ZmZpeCBpcyBsYXppbHkgY29tcHV0ZWQuXG4gICAgdmFyIHByZWZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVswXSA6IHN5bWJvbCA9PT0gXCIjXCIgJiYgL1tib3hYXS8udGVzdCh0eXBlKSA/IFwiMFwiICsgdHlwZS50b0xvd2VyQ2FzZSgpIDogXCJcIixcbiAgICAgICAgc3VmZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5WzFdIDogL1slcF0vLnRlc3QodHlwZSkgPyBcIiVcIiA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAhdHlwZSB8fCAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09IG51bGwgPyAodHlwZSA/IDYgOiAxMilcbiAgICAgICAgOiAvW2dwcnNdLy50ZXN0KHR5cGUpID8gTWF0aC5tYXgoMSwgTWF0aC5taW4oMjEsIHByZWNpc2lvbikpXG4gICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIHByZWNpc2lvbikpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWVQcmVmaXggPSBwcmVmaXgsXG4gICAgICAgICAgdmFsdWVTdWZmaXggPSBzdWZmaXg7XG5cbiAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIC8vIENvbnZlcnQgbmVnYXRpdmUgdG8gcG9zaXRpdmUsIGFuZCBjb21wdXRlIHRoZSBwcmVmaXguXG4gICAgICAgIC8vIE5vdGUgdGhhdCAtMCBpcyBub3QgbGVzcyB0aGFuIDAsIGJ1dCAxIC8gLTAgaXMhXG4gICAgICAgIHZhciB2YWx1ZU5lZ2F0aXZlID0gKHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwKSAmJiAodmFsdWUgKj0gLTEsIHRydWUpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgdmFsdWUgPSBmb3JtYXRUeXBlKHZhbHVlLCBwcmVjaXNpb24pO1xuXG4gICAgICAgIC8vIElmIHRoZSBvcmlnaW5hbCB2YWx1ZSB3YXMgbmVnYXRpdmUsIGl0IG1heSBiZSByb3VuZGVkIHRvIHplcm8gZHVyaW5nXG4gICAgICAgIC8vIGZvcm1hdHRpbmc7IHRyZWF0IHRoaXMgYXMgKHBvc2l0aXZlKSB6ZXJvLlxuICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSkge1xuICAgICAgICAgIHZhciBpID0gLTEsIG4gPSB2YWx1ZS5sZW5ndGgsIGM7XG4gICAgICAgICAgdmFsdWVOZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksICg0OCA8IGMgJiYgYyA8IDU4KVxuICAgICAgICAgICAgICAgIHx8ICh0eXBlID09PSBcInhcIiAmJiA5NiA8IGMgJiYgYyA8IDEwMylcbiAgICAgICAgICAgICAgICB8fCAodHlwZSA9PT0gXCJYXCIgJiYgNjQgPCBjICYmIGMgPCA3MSkpIHtcbiAgICAgICAgICAgICAgdmFsdWVOZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgICAgICB2YWx1ZVByZWZpeCA9ICh2YWx1ZU5lZ2F0aXZlID8gKHNpZ24gPT09IFwiKFwiID8gc2lnbiA6IFwiLVwiKSA6IHNpZ24gPT09IFwiLVwiIHx8IHNpZ24gPT09IFwiKFwiID8gXCJcIiA6IHNpZ24pICsgdmFsdWVQcmVmaXg7XG4gICAgICAgIHZhbHVlU3VmZml4ID0gdmFsdWVTdWZmaXggKyAodHlwZSA9PT0gXCJzXCIgPyBwcmVmaXhlc1s4ICsgcHJlZml4RXhwb25lbnQgLyAzXSA6IFwiXCIpICsgKHZhbHVlTmVnYXRpdmUgJiYgc2lnbiA9PT0gXCIoXCIgPyBcIilcIiA6IFwiXCIpO1xuXG4gICAgICAgIC8vIEJyZWFrIHRoZSBmb3JtYXR0ZWQgdmFsdWUgaW50byB0aGUgaW50ZWdlciDigJx2YWx1ZeKAnSBwYXJ0IHRoYXQgY2FuIGJlXG4gICAgICAgIC8vIGdyb3VwZWQsIGFuZCBmcmFjdGlvbmFsIG9yIGV4cG9uZW50aWFsIOKAnHN1ZmZpeOKAnSBwYXJ0IHRoYXQgaXMgbm90LlxuICAgICAgICBpZiAobWF5YmVTdWZmaXgpIHtcbiAgICAgICAgICB2YXIgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoLCBjO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICBjYXNlIFwiPFwiOiByZXR1cm4gdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZztcbiAgICAgICAgY2FzZSBcIj1cIjogcmV0dXJuIHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIGNhc2UgXCJeXCI6IHJldHVybiBwYWRkaW5nLnNsaWNlKDAsIGxlbmd0aCA9IHBhZGRpbmcubGVuZ3RoID4+IDEpICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZy5zbGljZShsZW5ndGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFByZWZpeChzcGVjaWZpZXIsIHZhbHVlKSB7XG4gICAgdmFyIGYgPSBmb3JtYXQoKHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpLCBzcGVjaWZpZXIudHlwZSA9IFwiZlwiLCBzcGVjaWZpZXIpKSxcbiAgICAgICAgZSA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzLFxuICAgICAgICBrID0gTWF0aC5wb3coMTAsIC1lKSxcbiAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbOCArIGUgLyAzXTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmKGsgKiB2YWx1ZSkgKyBwcmVmaXg7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgZm9ybWF0UHJlZml4OiBmb3JtYXRQcmVmaXhcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHByZWNpc2lvbkZpeGVkKHN0ZXApIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIC1leHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xufTtcblxuZnVuY3Rpb24gcHJlY2lzaW9uUHJlZml4KHN0ZXAsIHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyAtIGV4cG9uZW50KE1hdGguYWJzKHN0ZXApKSk7XG59O1xuXG5mdW5jdGlvbiBwcmVjaXNpb25Sb3VuZChzdGVwLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIGV4cG9uZW50KE1hdGguYWJzKG1heCkpIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKSArIDE7XG59O1xuXG52YXIgbG9jYWxlRGVmaW5pdGlvbnMgPSB7XG4gIFwiY2EtRVNcIjogY2FFcyxcbiAgXCJkZS1DSFwiOiBkZUNoLFxuICBcImRlLURFXCI6IGRlRGUsXG4gIFwiZW4tQ0FcIjogZW5DYSxcbiAgXCJlbi1HQlwiOiBlbkdiLFxuICBcImVuLVVTXCI6IGVuVXMsXG4gIFwiZXMtRVNcIjogZXNFcyxcbiAgXCJmaS1GSVwiOiBmaUZpLFxuICBcImZyLUNBXCI6IGZyQ2EsXG4gIFwiZnItRlJcIjogZnJGcixcbiAgXCJoZS1JTFwiOiBoZUlsLFxuICBcImh1LUhVXCI6IGh1SHUsXG4gIFwiaXQtSVRcIjogaXRJdCxcbiAgXCJqYS1KUFwiOiBqYUpwLFxuICBcImtvLUtSXCI6IGtvS3IsXG4gIFwibWstTUtcIjogbWtNayxcbiAgXCJubC1OTFwiOiBubE5sLFxuICBcInBsLVBMXCI6IHBsUGwsXG4gIFwicHQtQlJcIjogcHRCcixcbiAgXCJydS1SVVwiOiBydVJ1LFxuICBcInN2LVNFXCI6IHN2U2UsXG4gIFwiemgtQ05cIjogemhDblxufTtcblxudmFyIGRlZmF1bHRMb2NhbGUgPSBsb2NhbGUoZW5Vcyk7XG52YXIgZm9ybWF0ID0gZGVmYXVsdExvY2FsZS5mb3JtYXQ7XG52YXIgZm9ybWF0UHJlZml4ID0gZGVmYXVsdExvY2FsZS5mb3JtYXRQcmVmaXg7XG5cbmZ1bmN0aW9uIGxvY2FsZUZvcm1hdChkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgZGVmaW5pdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICghbG9jYWxlRGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoZGVmaW5pdGlvbikpIHJldHVybiBudWxsO1xuICAgIGRlZmluaXRpb24gPSBsb2NhbGVEZWZpbml0aW9uc1tkZWZpbml0aW9uXTtcbiAgfVxuICByZXR1cm4gbG9jYWxlKGRlZmluaXRpb24pO1xufTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXQ7XG5leHBvcnRzLmZvcm1hdFByZWZpeCA9IGZvcm1hdFByZWZpeDtcbmV4cG9ydHMubG9jYWxlRm9ybWF0ID0gbG9jYWxlRm9ybWF0O1xuZXhwb3J0cy5mb3JtYXRTcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXI7XG5leHBvcnRzLnByZWNpc2lvbkZpeGVkID0gcHJlY2lzaW9uRml4ZWQ7XG5leHBvcnRzLnByZWNpc2lvblByZWZpeCA9IHByZWNpc2lvblByZWZpeDtcbmV4cG9ydHMucHJlY2lzaW9uUm91bmQgPSBwcmVjaXNpb25Sb3VuZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzVGltZSA9IHJlcXVpcmUoJ2QzLXRpbWUnKTtcblxudmFyIHpoQ24gPSB7XG4gIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gIGRhdGU6IFwiJVkvJS1tLyUtZFwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIuS4iuWNiFwiLCBcIuS4i+WNiFwiXSxcbiAgZGF5czogW1wi5pif5pyf5pelXCIsIFwi5pif5pyf5LiAXCIsIFwi5pif5pyf5LqMXCIsIFwi5pif5pyf5LiJXCIsIFwi5pif5pyf5ZubXCIsIFwi5pif5pyf5LqUXCIsIFwi5pif5pyf5YWtXCJdLFxuICBzaG9ydERheXM6IFtcIuaYn+acn+aXpVwiLCBcIuaYn+acn+S4gFwiLCBcIuaYn+acn+S6jFwiLCBcIuaYn+acn+S4iVwiLCBcIuaYn+acn+Wbm1wiLCBcIuaYn+acn+S6lFwiLCBcIuaYn+acn+WFrVwiXSxcbiAgbW9udGhzOiBbXCLkuIDmnIhcIiwgXCLkuozmnIhcIiwgXCLkuInmnIhcIiwgXCLlm5vmnIhcIiwgXCLkupTmnIhcIiwgXCLlha3mnIhcIiwgXCLkuIPmnIhcIiwgXCLlhavmnIhcIiwgXCLkuZ3mnIhcIiwgXCLljYHmnIhcIiwgXCLljYHkuIDmnIhcIiwgXCLljYHkuozmnIhcIl0sXG4gIHNob3J0TW9udGhzOiBbXCLkuIDmnIhcIiwgXCLkuozmnIhcIiwgXCLkuInmnIhcIiwgXCLlm5vmnIhcIiwgXCLkupTmnIhcIiwgXCLlha3mnIhcIiwgXCLkuIPmnIhcIiwgXCLlhavmnIhcIiwgXCLkuZ3mnIhcIiwgXCLljYHmnIhcIiwgXCLljYHkuIDmnIhcIiwgXCLljYHkuozmnIhcIl1cbn07XG5cbnZhciBzdlNlID0ge1xuICBkYXRlVGltZTogXCIlQSBkZW4gJWQgJUIgJVkgJVhcIixcbiAgZGF0ZTogXCIlWS0lbS0lZFwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcImZtXCIsIFwiZW1cIl0sXG4gIGRheXM6IFtcIlPDtm5kYWdcIiwgXCJNw6VuZGFnXCIsIFwiVGlzZGFnXCIsIFwiT25zZGFnXCIsIFwiVG9yc2RhZ1wiLCBcIkZyZWRhZ1wiLCBcIkzDtnJkYWdcIl0sXG4gIHNob3J0RGF5czogW1wiU8O2blwiLCBcIk3DpW5cIiwgXCJUaXNcIiwgXCJPbnNcIiwgXCJUb3JcIiwgXCJGcmVcIiwgXCJMw7ZyXCJdLFxuICBtb250aHM6IFtcIkphbnVhcmlcIiwgXCJGZWJydWFyaVwiLCBcIk1hcnNcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0aVwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWFqXCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2t0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG59O1xuXG52YXIgcnVSdSA9IHtcbiAgZGF0ZVRpbWU6IFwiJUEsICVlICVCICVZINCzLiAlWFwiLFxuICBkYXRlOiBcIiVkLiVtLiVZXCIsXG4gIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgZGF5czogW1wi0LLQvtGB0LrRgNC10YHQtdC90YzQtVwiLCBcItC/0L7QvdC10LTQtdC70YzQvdC40LpcIiwgXCLQstGC0L7RgNC90LjQulwiLCBcItGB0YDQtdC00LBcIiwgXCLRh9C10YLQstC10YDQs1wiLCBcItC/0Y/RgtC90LjRhtCwXCIsIFwi0YHRg9Cx0LHQvtGC0LBcIl0sXG4gIHNob3J0RGF5czogW1wi0LLRgVwiLCBcItC/0L1cIiwgXCLQstGCXCIsIFwi0YHRgFwiLCBcItGH0YJcIiwgXCLQv9GCXCIsIFwi0YHQsVwiXSxcbiAgbW9udGhzOiBbXCLRj9C90LLQsNGA0Y9cIiwgXCLRhNC10LLRgNCw0LvRj1wiLCBcItC80LDRgNGC0LBcIiwgXCLQsNC/0YDQtdC70Y9cIiwgXCLQvNCw0Y9cIiwgXCLQuNGO0L3Rj1wiLCBcItC40Y7Qu9GPXCIsIFwi0LDQstCz0YPRgdGC0LBcIiwgXCLRgdC10L3RgtGP0LHRgNGPXCIsIFwi0L7QutGC0Y/QsdGA0Y9cIiwgXCLQvdC+0Y/QsdGA0Y9cIiwgXCLQtNC10LrQsNCx0YDRj1wiXSxcbiAgc2hvcnRNb250aHM6IFtcItGP0L3QslwiLCBcItGE0LXQslwiLCBcItC80LDRgFwiLCBcItCw0L/RgFwiLCBcItC80LDQuVwiLCBcItC40Y7QvVwiLCBcItC40Y7Qu1wiLCBcItCw0LLQs1wiLCBcItGB0LXQvVwiLCBcItC+0LrRglwiLCBcItC90L7Rj1wiLCBcItC00LXQulwiXVxufTtcblxudmFyIHB0QnIgPSB7XG4gIGRhdGVUaW1lOiBcIiVBLCAlZSBkZSAlQiBkZSAlWS4gJVhcIixcbiAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gIGRheXM6IFtcIkRvbWluZ29cIiwgXCJTZWd1bmRhXCIsIFwiVGVyw6dhXCIsIFwiUXVhcnRhXCIsIFwiUXVpbnRhXCIsIFwiU2V4dGFcIiwgXCJTw6FiYWRvXCJdLFxuICBzaG9ydERheXM6IFtcIkRvbVwiLCBcIlNlZ1wiLCBcIlRlclwiLCBcIlF1YVwiLCBcIlF1aVwiLCBcIlNleFwiLCBcIlPDoWJcIl0sXG4gIG1vbnRoczogW1wiSmFuZWlyb1wiLCBcIkZldmVyZWlyb1wiLCBcIk1hcsOnb1wiLCBcIkFicmlsXCIsIFwiTWFpb1wiLCBcIkp1bmhvXCIsIFwiSnVsaG9cIiwgXCJBZ29zdG9cIiwgXCJTZXRlbWJyb1wiLCBcIk91dHVicm9cIiwgXCJOb3ZlbWJyb1wiLCBcIkRlemVtYnJvXCJdLFxuICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmV2XCIsIFwiTWFyXCIsIFwiQWJyXCIsIFwiTWFpXCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQWdvXCIsIFwiU2V0XCIsIFwiT3V0XCIsIFwiTm92XCIsIFwiRGV6XCJdXG59O1xuXG52YXIgcGxQbCA9IHtcbiAgZGF0ZVRpbWU6IFwiJUEsICVlICVCICVZLCAlWFwiLFxuICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSwgLy8gdW51c2VkXG4gIGRheXM6IFtcIk5pZWR6aWVsYVwiLCBcIlBvbmllZHppYcWCZWtcIiwgXCJXdG9yZWtcIiwgXCLFmnJvZGFcIiwgXCJDendhcnRla1wiLCBcIlBpxIV0ZWtcIiwgXCJTb2JvdGFcIl0sXG4gIHNob3J0RGF5czogW1wiTmllZHouXCIsIFwiUG9uLlwiLCBcIld0LlwiLCBcIsWaci5cIiwgXCJDencuXCIsIFwiUHQuXCIsIFwiU29iLlwiXSxcbiAgbW9udGhzOiBbXCJTdHljemXFhFwiLCBcIkx1dHlcIiwgXCJNYXJ6ZWNcIiwgXCJLd2llY2llxYRcIiwgXCJNYWpcIiwgXCJDemVyd2llY1wiLCBcIkxpcGllY1wiLCBcIlNpZXJwaWXFhFwiLCBcIldyemVzaWXFhFwiLCBcIlBhxbpkemllcm5pa1wiLCBcIkxpc3RvcGFkXCIsIFwiR3J1ZHppZcWEXCJdLFxuICBzaG9ydE1vbnRoczogW1wiU3R5Y3ouXCIsIFwiTHV0eVwiLCBcIk1hcnouXCIsIFwiS3dpZS5cIiwgXCJNYWpcIiwgXCJDemVydy5cIiwgXCJMaXBjLlwiLCBcIlNpZXJwLlwiLCBcIldyei5cIiwgXCJQYcW6ZHouXCIsIFwiTGlzdG9wLlwiLCBcIkdydWR6LlwiXS8qIEluIFBvbGlzaCBsYW5ndWFnZSBhYmJyYXZpYXRlZCBtb250aHMgYXJlIG5vdCBjb21tb25seSB1c2VkIHNvIHRoZXJlIGlzIGEgZGlzcHV0ZSBhYm91dCB0aGUgcHJvcGVyIGFiYnJhdmlhdGlvbnMuICovXG59O1xuXG52YXIgbmxObCA9IHtcbiAgZGF0ZVRpbWU6IFwiJWEgJWUgJUIgJVkgJVRcIixcbiAgZGF0ZTogXCIlZC0lbS0lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICBkYXlzOiBbXCJ6b25kYWdcIiwgXCJtYWFuZGFnXCIsIFwiZGluc2RhZ1wiLCBcIndvZW5zZGFnXCIsIFwiZG9uZGVyZGFnXCIsIFwidnJpamRhZ1wiLCBcInphdGVyZGFnXCJdLFxuICBzaG9ydERheXM6IFtcInpvXCIsIFwibWFcIiwgXCJkaVwiLCBcIndvXCIsIFwiZG9cIiwgXCJ2clwiLCBcInphXCJdLFxuICBtb250aHM6IFtcImphbnVhcmlcIiwgXCJmZWJydWFyaVwiLCBcIm1hYXJ0XCIsIFwiYXByaWxcIiwgXCJtZWlcIiwgXCJqdW5pXCIsIFwianVsaVwiLCBcImF1Z3VzdHVzXCIsIFwic2VwdGVtYmVyXCIsIFwib2t0b2JlclwiLCBcIm5vdmVtYmVyXCIsIFwiZGVjZW1iZXJcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJqYW5cIiwgXCJmZWJcIiwgXCJtcnRcIiwgXCJhcHJcIiwgXCJtZWlcIiwgXCJqdW5cIiwgXCJqdWxcIiwgXCJhdWdcIiwgXCJzZXBcIiwgXCJva3RcIiwgXCJub3ZcIiwgXCJkZWNcIl1cbn07XG5cbnZhciBta01rID0ge1xuICBkYXRlVGltZTogXCIlQSwgJWUgJUIgJVkg0LMuICVYXCIsXG4gIGRhdGU6IFwiJWQuJW0uJVlcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICBkYXlzOiBbXCLQvdC10LTQtdC70LBcIiwgXCLQv9C+0L3QtdC00LXQu9C90LjQulwiLCBcItCy0YLQvtGA0L3QuNC6XCIsIFwi0YHRgNC10LTQsFwiLCBcItGH0LXRgtCy0YDRgtC+0LpcIiwgXCLQv9C10YLQvtC6XCIsIFwi0YHQsNCx0L7RgtCwXCJdLFxuICBzaG9ydERheXM6IFtcItC90LXQtFwiLCBcItC/0L7QvVwiLCBcItCy0YLQvlwiLCBcItGB0YDQtVwiLCBcItGH0LXRglwiLCBcItC/0LXRglwiLCBcItGB0LDQsVwiXSxcbiAgbW9udGhzOiBbXCLRmNCw0L3Rg9Cw0YDQuFwiLCBcItGE0LXQstGA0YPQsNGA0LhcIiwgXCLQvNCw0YDRglwiLCBcItCw0L/RgNC40LtcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L3QuFwiLCBcItGY0YPQu9C4XCIsIFwi0LDQstCz0YPRgdGCXCIsIFwi0YHQtdC/0YLQtdC80LLRgNC4XCIsIFwi0L7QutGC0L7QvNCy0YDQuFwiLCBcItC90L7QtdC80LLRgNC4XCIsIFwi0LTQtdC60LXQvNCy0YDQuFwiXSxcbiAgc2hvcnRNb250aHM6IFtcItGY0LDQvVwiLCBcItGE0LXQslwiLCBcItC80LDRgFwiLCBcItCw0L/RgFwiLCBcItC80LDRmFwiLCBcItGY0YPQvVwiLCBcItGY0YPQu1wiLCBcItCw0LLQs1wiLCBcItGB0LXQv1wiLCBcItC+0LrRglwiLCBcItC90L7QtVwiLCBcItC00LXQulwiXVxufTtcblxudmFyIGtvS3IgPSB7XG4gIGRhdGVUaW1lOiBcIiVZLyVtLyVkICVhICVYXCIsXG4gIGRhdGU6IFwiJVkvJW0vJWRcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCLsmKTsoIRcIiwgXCLsmKTtm4RcIl0sXG4gIGRheXM6IFtcIuydvOyalOydvFwiLCBcIuyblOyalOydvFwiLCBcIu2ZlOyalOydvFwiLCBcIuyImOyalOydvFwiLCBcIuuqqeyalOydvFwiLCBcIuq4iOyalOydvFwiLCBcIu2GoOyalOydvFwiXSxcbiAgc2hvcnREYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIl0sXG4gIG1vbnRoczogW1wiMeyblFwiLCBcIjLsm5RcIiwgXCIz7JuUXCIsIFwiNOyblFwiLCBcIjXsm5RcIiwgXCI27JuUXCIsIFwiN+yblFwiLCBcIjjsm5RcIiwgXCI57JuUXCIsIFwiMTDsm5RcIiwgXCIxMeyblFwiLCBcIjEy7JuUXCJdLFxuICBzaG9ydE1vbnRoczogW1wiMeyblFwiLCBcIjLsm5RcIiwgXCIz7JuUXCIsIFwiNOyblFwiLCBcIjXsm5RcIiwgXCI27JuUXCIsIFwiN+yblFwiLCBcIjjsm5RcIiwgXCI57JuUXCIsIFwiMTDsm5RcIiwgXCIxMeyblFwiLCBcIjEy7JuUXCJdXG59O1xuXG52YXIgamFKcCA9IHtcbiAgZGF0ZVRpbWU6IFwiJVkgJWIgJWUgJWEgJVhcIixcbiAgZGF0ZTogXCIlWS8lbS8lZFwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gIGRheXM6IFtcIuaXpeabnOaXpVwiLCBcIuaciOabnOaXpVwiLCBcIueBq+abnOaXpVwiLCBcIuawtOabnOaXpVwiLCBcIuacqOabnOaXpVwiLCBcIumHkeabnOaXpVwiLCBcIuWcn+abnOaXpVwiXSxcbiAgc2hvcnREYXlzOiBbXCLml6VcIiwgXCLmnIhcIiwgXCLngatcIiwgXCLmsLRcIiwgXCLmnKhcIiwgXCLph5FcIiwgXCLlnJ9cIl0sXG4gIG1vbnRoczogW1wi552m5pyIXCIsIFwi5aaC5pyIXCIsIFwi5byl55SfXCIsIFwi5Y2v5pyIXCIsIFwi55qQ5pyIXCIsIFwi5rC054Sh5pyIXCIsIFwi5paH5pyIXCIsIFwi6JGJ5pyIXCIsIFwi6ZW35pyIXCIsIFwi56We54Sh5pyIXCIsIFwi6Zyc5pyIXCIsIFwi5bir6LWwXCJdLFxuICBzaG9ydE1vbnRoczogW1wiMeaciFwiLCBcIjLmnIhcIiwgXCIz5pyIXCIsIFwiNOaciFwiLCBcIjXmnIhcIiwgXCI25pyIXCIsIFwiN+aciFwiLCBcIjjmnIhcIiwgXCI55pyIXCIsIFwiMTDmnIhcIiwgXCIxMeaciFwiLCBcIjEy5pyIXCJdXG59O1xuXG52YXIgaXRJdCA9IHtcbiAgZGF0ZVRpbWU6IFwiJUEgJWUgJUIgJVksICVYXCIsXG4gIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgZGF5czogW1wiRG9tZW5pY2FcIiwgXCJMdW5lZMOsXCIsIFwiTWFydGVkw6xcIiwgXCJNZXJjb2xlZMOsXCIsIFwiR2lvdmVkw6xcIiwgXCJWZW5lcmTDrFwiLCBcIlNhYmF0b1wiXSxcbiAgc2hvcnREYXlzOiBbXCJEb21cIiwgXCJMdW5cIiwgXCJNYXJcIiwgXCJNZXJcIiwgXCJHaW9cIiwgXCJWZW5cIiwgXCJTYWJcIl0sXG4gIG1vbnRoczogW1wiR2VubmFpb1wiLCBcIkZlYmJyYWlvXCIsIFwiTWFyem9cIiwgXCJBcHJpbGVcIiwgXCJNYWdnaW9cIiwgXCJHaXVnbm9cIiwgXCJMdWdsaW9cIiwgXCJBZ29zdG9cIiwgXCJTZXR0ZW1icmVcIiwgXCJPdHRvYnJlXCIsIFwiTm92ZW1icmVcIiwgXCJEaWNlbWJyZVwiXSxcbiAgc2hvcnRNb250aHM6IFtcIkdlblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1hZ1wiLCBcIkdpdVwiLCBcIkx1Z1wiLCBcIkFnb1wiLCBcIlNldFwiLCBcIk90dFwiLCBcIk5vdlwiLCBcIkRpY1wiXVxufTtcblxudmFyIGh1SHUgPSB7XG4gIGRhdGVUaW1lOiBcIiVZLiAlQiAlLWUuLCAlQSAlWFwiLFxuICBkYXRlOiBcIiVZLiAlbS4gJWQuXCIsXG4gIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgcGVyaW9kczogW1wiZGUuXCIsIFwiZHUuXCJdLCAvLyB1bnVzZWRcbiAgZGF5czogW1widmFzw6FybmFwXCIsIFwiaMOpdGbFkVwiLCBcImtlZGRcIiwgXCJzemVyZGFcIiwgXCJjc8O8dMO2cnTDtmtcIiwgXCJww6ludGVrXCIsIFwic3pvbWJhdFwiXSxcbiAgc2hvcnREYXlzOiBbXCJWXCIsIFwiSFwiLCBcIktcIiwgXCJTemVcIiwgXCJDc1wiLCBcIlBcIiwgXCJTem9cIl0sXG4gIG1vbnRoczogW1wiamFudcOhclwiLCBcImZlYnJ1w6FyXCIsIFwibcOhcmNpdXNcIiwgXCLDoXByaWxpc1wiLCBcIm3DoWp1c1wiLCBcImrDum5pdXNcIiwgXCJqw7psaXVzXCIsIFwiYXVndXN6dHVzXCIsIFwic3plcHRlbWJlclwiLCBcIm9rdMOzYmVyXCIsIFwibm92ZW1iZXJcIiwgXCJkZWNlbWJlclwiXSxcbiAgc2hvcnRNb250aHM6IFtcImphbi5cIiwgXCJmZWIuXCIsIFwibcOhci5cIiwgXCLDoXByLlwiLCBcIm3DoWouXCIsIFwiasO6bi5cIiwgXCJqw7psLlwiLCBcImF1Zy5cIiwgXCJzemVwdC5cIiwgXCJva3QuXCIsIFwibm92LlwiLCBcImRlYy5cIl1cbn07XG5cbnZhciBoZUlsID0ge1xuICBkYXRlVGltZTogXCIlQSwgJWUg15ElQiAlWSAlWFwiLFxuICBkYXRlOiBcIiVkLiVtLiVZXCIsXG4gIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgZGF5czogW1wi16jXkNep15XXn1wiLCBcItep16DXmVwiLCBcItep15zXmdep15lcIiwgXCLXqNeR15nXoteZXCIsIFwi15fXnteZ16nXmVwiLCBcItep15nXqdeZXCIsIFwi16nXkdeqXCJdLFxuICBzaG9ydERheXM6IFtcIteQ17NcIiwgXCLXkdezXCIsIFwi15LXs1wiLCBcIteT17NcIiwgXCLXlNezXCIsIFwi15XXs1wiLCBcItep17NcIl0sXG4gIG1vbnRoczogW1wi15nXoNeV15DXqFwiLCBcItek15HXqNeV15DXqFwiLCBcItee16jXpVwiLCBcIteQ16TXqNeZ15xcIiwgXCLXnteQ15lcIiwgXCLXmdeV16DXmVwiLCBcIteZ15XXnNeZXCIsIFwi15DXldeS15XXodeYXCIsIFwi16HXpNeY157XkdeoXCIsIFwi15DXlden15jXldeR16hcIiwgXCLXoNeV15HXnteR16hcIiwgXCLXk9em157XkdeoXCJdLFxuICBzaG9ydE1vbnRoczogW1wi15nXoNeV17NcIiwgXCLXpNeR16jXs1wiLCBcItee16jXpVwiLCBcIteQ16TXqNezXCIsIFwi157XkNeZXCIsIFwi15nXldeg15lcIiwgXCLXmdeV15zXmVwiLCBcIteQ15XXktezXCIsIFwi16HXpNeY17NcIiwgXCLXkNeV16fXs1wiLCBcIteg15XXkdezXCIsIFwi15PXptee17NcIl1cbn07XG5cbnZhciBmckZyID0ge1xuICBkYXRlVGltZTogXCIlQSwgbGUgJWUgJUIgJVksICVYXCIsXG4gIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLCAvLyB1bnVzZWRcbiAgZGF5czogW1wiZGltYW5jaGVcIiwgXCJsdW5kaVwiLCBcIm1hcmRpXCIsIFwibWVyY3JlZGlcIiwgXCJqZXVkaVwiLCBcInZlbmRyZWRpXCIsIFwic2FtZWRpXCJdLFxuICBzaG9ydERheXM6IFtcImRpbS5cIiwgXCJsdW4uXCIsIFwibWFyLlwiLCBcIm1lci5cIiwgXCJqZXUuXCIsIFwidmVuLlwiLCBcInNhbS5cIl0sXG4gIG1vbnRoczogW1wiamFudmllclwiLCBcImbDqXZyaWVyXCIsIFwibWFyc1wiLCBcImF2cmlsXCIsIFwibWFpXCIsIFwianVpblwiLCBcImp1aWxsZXRcIiwgXCJhb8O7dFwiLCBcInNlcHRlbWJyZVwiLCBcIm9jdG9icmVcIiwgXCJub3ZlbWJyZVwiLCBcImTDqWNlbWJyZVwiXSxcbiAgc2hvcnRNb250aHM6IFtcImphbnYuXCIsIFwiZsOpdnIuXCIsIFwibWFyc1wiLCBcImF2ci5cIiwgXCJtYWlcIiwgXCJqdWluXCIsIFwianVpbC5cIiwgXCJhb8O7dFwiLCBcInNlcHQuXCIsIFwib2N0LlwiLCBcIm5vdi5cIiwgXCJkw6ljLlwiXVxufTtcblxudmFyIGZyQ2EgPSB7XG4gIGRhdGVUaW1lOiBcIiVhICVlICViICVZICVYXCIsXG4gIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJcIiwgXCJcIl0sXG4gIGRheXM6IFtcImRpbWFuY2hlXCIsIFwibHVuZGlcIiwgXCJtYXJkaVwiLCBcIm1lcmNyZWRpXCIsIFwiamV1ZGlcIiwgXCJ2ZW5kcmVkaVwiLCBcInNhbWVkaVwiXSxcbiAgc2hvcnREYXlzOiBbXCJkaW1cIiwgXCJsdW5cIiwgXCJtYXJcIiwgXCJtZXJcIiwgXCJqZXVcIiwgXCJ2ZW5cIiwgXCJzYW1cIl0sXG4gIG1vbnRoczogW1wiamFudmllclwiLCBcImbDqXZyaWVyXCIsIFwibWFyc1wiLCBcImF2cmlsXCIsIFwibWFpXCIsIFwianVpblwiLCBcImp1aWxsZXRcIiwgXCJhb8O7dFwiLCBcInNlcHRlbWJyZVwiLCBcIm9jdG9icmVcIiwgXCJub3ZlbWJyZVwiLCBcImTDqWNlbWJyZVwiXSxcbiAgc2hvcnRNb250aHM6IFtcImphblwiLCBcImbDqXZcIiwgXCJtYXJcIiwgXCJhdnJcIiwgXCJtYWlcIiwgXCJqdWlcIiwgXCJqdWxcIiwgXCJhb8O7XCIsIFwic2VwXCIsIFwib2N0XCIsIFwibm92XCIsIFwiZMOpY1wiXVxufTtcblxudmFyIGZpRmkgPSB7XG4gIGRhdGVUaW1lOiBcIiVBLCAlLWQuICVCdGEgJVkga2xvICVYXCIsXG4gIGRhdGU6IFwiJS1kLiUtbS4lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcImEubS5cIiwgXCJwLm0uXCJdLFxuICBkYXlzOiBbXCJzdW5udW50YWlcIiwgXCJtYWFuYW50YWlcIiwgXCJ0aWlzdGFpXCIsIFwia2Vza2l2aWlra29cIiwgXCJ0b3JzdGFpXCIsIFwicGVyamFudGFpXCIsIFwibGF1YW50YWlcIl0sXG4gIHNob3J0RGF5czogW1wiU3VcIiwgXCJNYVwiLCBcIlRpXCIsIFwiS2VcIiwgXCJUb1wiLCBcIlBlXCIsIFwiTGFcIl0sXG4gIG1vbnRoczogW1widGFtbWlrdXVcIiwgXCJoZWxtaWt1dVwiLCBcIm1hYWxpc2t1dVwiLCBcImh1aHRpa3V1XCIsIFwidG91a29rdXVcIiwgXCJrZXPDpGt1dVwiLCBcImhlaW7DpGt1dVwiLCBcImVsb2t1dVwiLCBcInN5eXNrdXVcIiwgXCJsb2tha3V1XCIsIFwibWFycmFza3V1XCIsIFwiam91bHVrdXVcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJUYW1taVwiLCBcIkhlbG1pXCIsIFwiTWFhbGlzXCIsIFwiSHVodGlcIiwgXCJUb3Vrb1wiLCBcIktlc8OkXCIsIFwiSGVpbsOkXCIsIFwiRWxvXCIsIFwiU3l5c1wiLCBcIkxva2FcIiwgXCJNYXJyYXNcIiwgXCJKb3VsdVwiXVxufTtcblxudmFyIGVzRXMgPSB7XG4gIGRhdGVUaW1lOiBcIiVBLCAlZSBkZSAlQiBkZSAlWSwgJVhcIixcbiAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gIGRheXM6IFtcImRvbWluZ29cIiwgXCJsdW5lc1wiLCBcIm1hcnRlc1wiLCBcIm1pw6lyY29sZXNcIiwgXCJqdWV2ZXNcIiwgXCJ2aWVybmVzXCIsIFwic8OhYmFkb1wiXSxcbiAgc2hvcnREYXlzOiBbXCJkb21cIiwgXCJsdW5cIiwgXCJtYXJcIiwgXCJtacOpXCIsIFwianVlXCIsIFwidmllXCIsIFwic8OhYlwiXSxcbiAgbW9udGhzOiBbXCJlbmVyb1wiLCBcImZlYnJlcm9cIiwgXCJtYXJ6b1wiLCBcImFicmlsXCIsIFwibWF5b1wiLCBcImp1bmlvXCIsIFwianVsaW9cIiwgXCJhZ29zdG9cIiwgXCJzZXB0aWVtYnJlXCIsIFwib2N0dWJyZVwiLCBcIm5vdmllbWJyZVwiLCBcImRpY2llbWJyZVwiXSxcbiAgc2hvcnRNb250aHM6IFtcImVuZVwiLCBcImZlYlwiLCBcIm1hclwiLCBcImFiclwiLCBcIm1heVwiLCBcImp1blwiLCBcImp1bFwiLCBcImFnb1wiLCBcInNlcFwiLCBcIm9jdFwiLCBcIm5vdlwiLCBcImRpY1wiXVxufTtcblxudmFyIGxvY2FsZSQxID0ge1xuICBkYXRlVGltZTogXCIlYSAlYiAlZSAlWCAlWVwiLFxuICBkYXRlOiBcIiVtLyVkLyVZXCIsXG4gIHRpbWU6IFwiJUg6JU06JVNcIixcbiAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG59O1xuXG52YXIgZW5HYiA9IHtcbiAgZGF0ZVRpbWU6IFwiJWEgJWUgJWIgJVggJVlcIixcbiAgZGF0ZTogXCIlZC8lbS8lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICBzaG9ydERheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgbW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxufTtcblxudmFyIGVuQ2EgPSB7XG4gIGRhdGVUaW1lOiBcIiVhICViICVlICVYICVZXCIsXG4gIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgc2hvcnREYXlzOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl1cbn07XG5cbnZhciBkZURlID0ge1xuICBkYXRlVGltZTogXCIlQSwgZGVyICVlLiAlQiAlWSwgJVhcIixcbiAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgc2hvcnREYXlzOiBbXCJTb1wiLCBcIk1vXCIsIFwiRGlcIiwgXCJNaVwiLCBcIkRvXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgbW9udGhzOiBbXCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTcOkcnpcIiwgXCJBcHJpbFwiLCBcIk1haVwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGV6ZW1iZXJcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbn07XG5cbnZhciBkZUNoID0ge1xuICBkYXRlVGltZTogXCIlQSwgZGVyICVlLiAlQiAlWSwgJVhcIixcbiAgZGF0ZTogXCIlZC4lbS4lWVwiLFxuICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICBkYXlzOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXSxcbiAgc2hvcnREYXlzOiBbXCJTb1wiLCBcIk1vXCIsIFwiRGlcIiwgXCJNaVwiLCBcIkRvXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgbW9udGhzOiBbXCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTcOkcnpcIiwgXCJBcHJpbFwiLCBcIk1haVwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGV6ZW1iZXJcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNcnpcIiwgXCJBcHJcIiwgXCJNYWlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPa3RcIiwgXCJOb3ZcIiwgXCJEZXpcIl1cbn07XG5cbnZhciBjYUVzID0ge1xuICBkYXRlVGltZTogXCIlQSwgJWUgZGUgJUIgZGUgJVksICVYXCIsXG4gIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgdGltZTogXCIlSDolTTolU1wiLFxuICBwZXJpb2RzOiBbXCJBTVwiLCBcIlBNXCJdLFxuICBkYXlzOiBbXCJkaXVtZW5nZVwiLCBcImRpbGx1bnNcIiwgXCJkaW1hcnRzXCIsIFwiZGltZWNyZXNcIiwgXCJkaWpvdXNcIiwgXCJkaXZlbmRyZXNcIiwgXCJkaXNzYWJ0ZVwiXSxcbiAgc2hvcnREYXlzOiBbXCJkZy5cIiwgXCJkbC5cIiwgXCJkdC5cIiwgXCJkYy5cIiwgXCJkai5cIiwgXCJkdi5cIiwgXCJkcy5cIl0sXG4gIG1vbnRoczogW1wiZ2VuZXJcIiwgXCJmZWJyZXJcIiwgXCJtYXLDp1wiLCBcImFicmlsXCIsIFwibWFpZ1wiLCBcImp1bnlcIiwgXCJqdWxpb2xcIiwgXCJhZ29zdFwiLCBcInNldGVtYnJlXCIsIFwib2N0dWJyZVwiLCBcIm5vdmVtYnJlXCIsIFwiZGVzZW1icmVcIl0sXG4gIHNob3J0TW9udGhzOiBbXCJnZW4uXCIsIFwiZmVici5cIiwgXCJtYXLDp1wiLCBcImFici5cIiwgXCJtYWlnXCIsIFwianVueVwiLCBcImp1bC5cIiwgXCJhZy5cIiwgXCJzZXQuXCIsIFwib2N0LlwiLCBcIm5vdi5cIiwgXCJkZXMuXCJdXG59O1xuXG5mdW5jdGlvbiBsb2NhbERhdGUoZCkge1xuICBpZiAoMCA8PSBkLnkgJiYgZC55IDwgMTAwKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgtMSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCk7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcihkLnkpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG4gIHJldHVybiBuZXcgRGF0ZShkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xufVxuXG5mdW5jdGlvbiB1dGNEYXRlKGQpIHtcbiAgaWYgKDAgPD0gZC55ICYmIGQueSA8IDEwMCkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGQueSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbiAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKGQueSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCkpO1xufVxuXG5mdW5jdGlvbiBuZXdZZWFyKHkpIHtcbiAgcmV0dXJuIHt5OiB5LCBtOiAwLCBkOiAxLCBIOiAwLCBNOiAwLCBTOiAwLCBMOiAwfTtcbn1cblxuZnVuY3Rpb24gbG9jYWxlKGxvY2FsZSkge1xuICB2YXIgbG9jYWxlX2RhdGVUaW1lID0gbG9jYWxlLmRhdGVUaW1lLFxuICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgIGxvY2FsZV90aW1lID0gbG9jYWxlLnRpbWUsXG4gICAgICBsb2NhbGVfcGVyaW9kcyA9IGxvY2FsZS5wZXJpb2RzLFxuICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICBsb2NhbGVfc2hvcnRXZWVrZGF5cyA9IGxvY2FsZS5zaG9ydERheXMsXG4gICAgICBsb2NhbGVfbW9udGhzID0gbG9jYWxlLm1vbnRocyxcbiAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICB2YXIgcGVyaW9kTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgIHdlZWtkYXlSZSA9IGZvcm1hdFJlKGxvY2FsZV93ZWVrZGF5cyksXG4gICAgICB3ZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV93ZWVrZGF5cyksXG4gICAgICBzaG9ydFdlZWtkYXlSZSA9IGZvcm1hdFJlKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgIHNob3J0V2Vla2RheUxvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfc2hvcnRXZWVrZGF5cyksXG4gICAgICBtb250aFJlID0gZm9ybWF0UmUobG9jYWxlX21vbnRocyksXG4gICAgICBtb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfbW9udGhzKSxcbiAgICAgIHNob3J0TW9udGhSZSA9IGZvcm1hdFJlKGxvY2FsZV9zaG9ydE1vbnRocyksXG4gICAgICBzaG9ydE1vbnRoTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydE1vbnRocyk7XG5cbiAgdmFyIGZvcm1hdHMgPSB7XG4gICAgXCJhXCI6IGZvcm1hdFNob3J0V2Vla2RheSxcbiAgICBcIkFcIjogZm9ybWF0V2Vla2RheSxcbiAgICBcImJcIjogZm9ybWF0U2hvcnRNb250aCxcbiAgICBcIkJcIjogZm9ybWF0TW9udGgsXG4gICAgXCJjXCI6IG51bGwsXG4gICAgXCJkXCI6IGZvcm1hdERheU9mTW9udGgsXG4gICAgXCJlXCI6IGZvcm1hdERheU9mTW9udGgsXG4gICAgXCJIXCI6IGZvcm1hdEhvdXIyNCxcbiAgICBcIklcIjogZm9ybWF0SG91cjEyLFxuICAgIFwialwiOiBmb3JtYXREYXlPZlllYXIsXG4gICAgXCJMXCI6IGZvcm1hdE1pbGxpc2Vjb25kcyxcbiAgICBcIm1cIjogZm9ybWF0TW9udGhOdW1iZXIsXG4gICAgXCJNXCI6IGZvcm1hdE1pbnV0ZXMsXG4gICAgXCJwXCI6IGZvcm1hdFBlcmlvZCxcbiAgICBcIlNcIjogZm9ybWF0U2Vjb25kcyxcbiAgICBcIlVcIjogZm9ybWF0V2Vla051bWJlclN1bmRheSxcbiAgICBcIndcIjogZm9ybWF0V2Vla2RheU51bWJlcixcbiAgICBcIldcIjogZm9ybWF0V2Vla051bWJlck1vbmRheSxcbiAgICBcInhcIjogbnVsbCxcbiAgICBcIlhcIjogbnVsbCxcbiAgICBcInlcIjogZm9ybWF0WWVhcixcbiAgICBcIllcIjogZm9ybWF0RnVsbFllYXIsXG4gICAgXCJaXCI6IGZvcm1hdFpvbmUsXG4gICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gIH07XG5cbiAgdmFyIHV0Y0Zvcm1hdHMgPSB7XG4gICAgXCJhXCI6IGZvcm1hdFVUQ1Nob3J0V2Vla2RheSxcbiAgICBcIkFcIjogZm9ybWF0VVRDV2Vla2RheSxcbiAgICBcImJcIjogZm9ybWF0VVRDU2hvcnRNb250aCxcbiAgICBcIkJcIjogZm9ybWF0VVRDTW9udGgsXG4gICAgXCJjXCI6IG51bGwsXG4gICAgXCJkXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgXCJlXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgXCJIXCI6IGZvcm1hdFVUQ0hvdXIyNCxcbiAgICBcIklcIjogZm9ybWF0VVRDSG91cjEyLFxuICAgIFwialwiOiBmb3JtYXRVVENEYXlPZlllYXIsXG4gICAgXCJMXCI6IGZvcm1hdFVUQ01pbGxpc2Vjb25kcyxcbiAgICBcIm1cIjogZm9ybWF0VVRDTW9udGhOdW1iZXIsXG4gICAgXCJNXCI6IGZvcm1hdFVUQ01pbnV0ZXMsXG4gICAgXCJwXCI6IGZvcm1hdFVUQ1BlcmlvZCxcbiAgICBcIlNcIjogZm9ybWF0VVRDU2Vjb25kcyxcbiAgICBcIlVcIjogZm9ybWF0VVRDV2Vla051bWJlclN1bmRheSxcbiAgICBcIndcIjogZm9ybWF0VVRDV2Vla2RheU51bWJlcixcbiAgICBcIldcIjogZm9ybWF0VVRDV2Vla051bWJlck1vbmRheSxcbiAgICBcInhcIjogbnVsbCxcbiAgICBcIlhcIjogbnVsbCxcbiAgICBcInlcIjogZm9ybWF0VVRDWWVhcixcbiAgICBcIllcIjogZm9ybWF0VVRDRnVsbFllYXIsXG4gICAgXCJaXCI6IGZvcm1hdFVUQ1pvbmUsXG4gICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gIH07XG5cbiAgdmFyIHBhcnNlcyA9IHtcbiAgICBcImFcIjogcGFyc2VTaG9ydFdlZWtkYXksXG4gICAgXCJBXCI6IHBhcnNlV2Vla2RheSxcbiAgICBcImJcIjogcGFyc2VTaG9ydE1vbnRoLFxuICAgIFwiQlwiOiBwYXJzZU1vbnRoLFxuICAgIFwiY1wiOiBwYXJzZUxvY2FsZURhdGVUaW1lLFxuICAgIFwiZFwiOiBwYXJzZURheU9mTW9udGgsXG4gICAgXCJlXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICBcIkhcIjogcGFyc2VIb3VyMjQsXG4gICAgXCJJXCI6IHBhcnNlSG91cjI0LFxuICAgIFwialwiOiBwYXJzZURheU9mWWVhcixcbiAgICBcIkxcIjogcGFyc2VNaWxsaXNlY29uZHMsXG4gICAgXCJtXCI6IHBhcnNlTW9udGhOdW1iZXIsXG4gICAgXCJNXCI6IHBhcnNlTWludXRlcyxcbiAgICBcInBcIjogcGFyc2VQZXJpb2QsXG4gICAgXCJTXCI6IHBhcnNlU2Vjb25kcyxcbiAgICBcIlVcIjogcGFyc2VXZWVrTnVtYmVyU3VuZGF5LFxuICAgIFwid1wiOiBwYXJzZVdlZWtkYXlOdW1iZXIsXG4gICAgXCJXXCI6IHBhcnNlV2Vla051bWJlck1vbmRheSxcbiAgICBcInhcIjogcGFyc2VMb2NhbGVEYXRlLFxuICAgIFwiWFwiOiBwYXJzZUxvY2FsZVRpbWUsXG4gICAgXCJ5XCI6IHBhcnNlWWVhcixcbiAgICBcIllcIjogcGFyc2VGdWxsWWVhcixcbiAgICBcIlpcIjogcGFyc2Vab25lLFxuICAgIFwiJVwiOiBwYXJzZUxpdGVyYWxQZXJjZW50XG4gIH07XG5cbiAgLy8gVGhlc2UgcmVjdXJzaXZlIGRpcmVjdGl2ZSBkZWZpbml0aW9ucyBtdXN0IGJlIGRlZmVycmVkLlxuICBmb3JtYXRzLnggPSBuZXdGb3JtYXQobG9jYWxlX2RhdGUsIGZvcm1hdHMpO1xuICBmb3JtYXRzLlggPSBuZXdGb3JtYXQobG9jYWxlX3RpbWUsIGZvcm1hdHMpO1xuICBmb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCBmb3JtYXRzKTtcbiAgdXRjRm9ybWF0cy54ID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlLCB1dGNGb3JtYXRzKTtcbiAgdXRjRm9ybWF0cy5YID0gbmV3Rm9ybWF0KGxvY2FsZV90aW1lLCB1dGNGb3JtYXRzKTtcbiAgdXRjRm9ybWF0cy5jID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlVGltZSwgdXRjRm9ybWF0cyk7XG5cbiAgZnVuY3Rpb24gbmV3Rm9ybWF0KHNwZWNpZmllciwgZm9ybWF0cykge1xuICAgIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgc3RyaW5nID0gW10sXG4gICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgIGogPSAwLFxuICAgICAgICAgIG4gPSBzcGVjaWZpZXIubGVuZ3RoLFxuICAgICAgICAgIGMsXG4gICAgICAgICAgcGFkLFxuICAgICAgICAgIGZvcm1hdDtcblxuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKHNwZWNpZmllci5jaGFyQ29kZUF0KGkpID09PSAzNykge1xuICAgICAgICAgIHN0cmluZy5wdXNoKHNwZWNpZmllci5zbGljZShqLCBpKSk7XG4gICAgICAgICAgaWYgKChwYWQgPSBwYWRzW2MgPSBzcGVjaWZpZXIuY2hhckF0KCsraSldKSAhPSBudWxsKSBjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpO1xuICAgICAgICAgIGlmIChmb3JtYXQgPSBmb3JtYXRzW2NdKSBjID0gZm9ybWF0KGRhdGUsIHBhZCA9PSBudWxsID8gKGMgPT09IFwiZVwiID8gXCIgXCIgOiBcIjBcIikgOiBwYWQpO1xuICAgICAgICAgIHN0cmluZy5wdXNoKGMpO1xuICAgICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICB2YXIgZCA9IG5ld1llYXIoMTkwMCksXG4gICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nLCAwKTtcbiAgICAgIGlmIChpICE9IHN0cmluZy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgICAvLyBUaGUgYW0tcG0gZmxhZyBpcyAwIGZvciBBTSwgYW5kIDEgZm9yIFBNLlxuICAgICAgaWYgKFwicFwiIGluIGQpIGQuSCA9IGQuSCAlIDEyICsgZC5wICogMTI7XG5cbiAgICAgIC8vIElmIGEgdGltZSB6b25lIGlzIHNwZWNpZmllZCwgYWxsIGZpZWxkcyBhcmUgaW50ZXJwcmV0ZWQgYXMgVVRDIGFuZCB0aGVuXG4gICAgICAvLyBvZmZzZXQgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgdGltZSB6b25lLlxuICAgICAgaWYgKFwiWlwiIGluIGQpIHtcbiAgICAgICAgaWYgKFwid1wiIGluIGQgJiYgKFwiV1wiIGluIGQgfHwgXCJVXCIgaW4gZCkpIHtcbiAgICAgICAgICB2YXIgZGF5ID0gdXRjRGF0ZShuZXdZZWFyKGQueSkpLmdldFVUQ0RheSgpO1xuICAgICAgICAgIGlmIChcIldcIiBpbiBkKSBkLlUgPSBkLlcsIGQudyA9IChkLncgKyA2KSAlIDcsIC0tZGF5O1xuICAgICAgICAgIGQubSA9IDA7XG4gICAgICAgICAgZC5kID0gZC53ICsgZC5VICogNyAtIChkYXkgKyA2KSAlIDc7XG4gICAgICAgIH1cbiAgICAgICAgZC5IICs9IGQuWiAvIDEwMCB8IDA7XG4gICAgICAgIGQuTSArPSBkLlogJSAxMDA7XG4gICAgICAgIHJldHVybiB1dGNEYXRlKGQpO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UsIGFsbCBmaWVsZHMgYXJlIGluIGxvY2FsIHRpbWUuXG4gICAgICBpZiAoXCJ3XCIgaW4gZCAmJiAoXCJXXCIgaW4gZCB8fCBcIlVcIiBpbiBkKSkge1xuICAgICAgICB2YXIgZGF5ID0gbmV3RGF0ZShuZXdZZWFyKGQueSkpLmdldERheSgpO1xuICAgICAgICBpZiAoXCJXXCIgaW4gZCkgZC5VID0gZC5XLCBkLncgPSAoZC53ICsgNikgJSA3LCAtLWRheTtcbiAgICAgICAgZC5tID0gMDtcbiAgICAgICAgZC5kID0gZC53ICsgZC5VICogNyAtIChkYXkgKyA2KSAlIDc7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3RGF0ZShkKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTcGVjaWZpZXIoZCwgc3BlY2lmaWVyLCBzdHJpbmcsIGopIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICAgIG4gPSBzcGVjaWZpZXIubGVuZ3RoLFxuICAgICAgICBtID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgYyxcbiAgICAgICAgcGFyc2U7XG5cbiAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgIGlmIChqID49IG0pIHJldHVybiAtMTtcbiAgICAgIGMgPSBzcGVjaWZpZXIuY2hhckNvZGVBdChpKyspO1xuICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgIGMgPSBzcGVjaWZpZXIuY2hhckF0KGkrKyk7XG4gICAgICAgIHBhcnNlID0gcGFyc2VzW2MgaW4gcGFkcyA/IHNwZWNpZmllci5jaGFyQXQoaSsrKSA6IGNdO1xuICAgICAgICBpZiAoIXBhcnNlIHx8ICgoaiA9IHBhcnNlKGQsIHN0cmluZywgaikpIDwgMCkpIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSBpZiAoYyAhPSBzdHJpbmcuY2hhckNvZGVBdChqKyspKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gajtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU2hvcnRXZWVrZGF5KGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gc2hvcnRXZWVrZGF5UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQudyA9IHNob3J0V2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSB3ZWVrZGF5UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQudyA9IHdlZWtkYXlMb29rdXBbblswXS50b0xvd2VyQ2FzZSgpXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTaG9ydE1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gc2hvcnRNb250aFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSBzaG9ydE1vbnRoTG9va3VwW25bMF0udG9Mb3dlckNhc2UoKV0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTW9udGgoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBtb250aFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSBtb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUxvY2FsZURhdGVUaW1lKGQsIHN0cmluZywgaSkge1xuICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfZGF0ZVRpbWUsIHN0cmluZywgaSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUxvY2FsZURhdGUoZCwgc3RyaW5nLCBpKSB7XG4gICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV9kYXRlLCBzdHJpbmcsIGkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VMb2NhbGVUaW1lKGQsIHN0cmluZywgaSkge1xuICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfdGltZSwgc3RyaW5nLCBpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlUGVyaW9kKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gcGVyaW9kTG9va3VwW3N0cmluZy5zbGljZShpLCBpICs9IDIpLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBuID09IG51bGwgPyAtMSA6IChkLnAgPSBuLCBpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFNob3J0V2Vla2RheShkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0RGF5KCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2Vla2RheShkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldERheSgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFNob3J0TW9udGgoZCkge1xuICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRNb250aCgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1vbnRoKGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldE1vbnRoKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0UGVyaW9kKGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldEhvdXJzKCkgPj0gMTIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1Nob3J0V2Vla2RheShkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0VVRDRGF5KCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDV2Vla2RheShkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldFVUQ0RheSgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1Nob3J0TW9udGgoZCkge1xuICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRVVENNb250aCgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01vbnRoKGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldFVUQ01vbnRoKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDUGVyaW9kKGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldFVUQ0hvdXJzKCkgPj0gMTIpXTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZm9ybWF0OiBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICAgIHZhciBmID0gbmV3Rm9ybWF0KHNwZWNpZmllciArPSBcIlwiLCBmb3JtYXRzKTtcbiAgICAgIGYucGFyc2UgPSBuZXdQYXJzZShzcGVjaWZpZXIsIGxvY2FsRGF0ZSk7XG4gICAgICBmLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICByZXR1cm4gZjtcbiAgICB9LFxuICAgIHV0Y0Zvcm1hdDogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICB2YXIgZiA9IG5ld0Zvcm1hdChzcGVjaWZpZXIgKz0gXCJcIiwgdXRjRm9ybWF0cyk7XG4gICAgICBmLnBhcnNlID0gbmV3UGFyc2Uoc3BlY2lmaWVyLCB1dGNEYXRlKTtcbiAgICAgIGYudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHNwZWNpZmllcjsgfTtcbiAgICAgIHJldHVybiBmO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBwYWRzID0ge1wiLVwiOiBcIlwiLCBcIl9cIjogXCIgXCIsIFwiMFwiOiBcIjBcIn07XG52YXIgbnVtYmVyUmUgPSAvXlxccypcXGQrLztcbnZhciBwZXJjZW50UmUgPSAvXiUvO1xudmFyIHJlcXVvdGVSZSA9IC9bXFxcXFxcXlxcJFxcKlxcK1xcP1xcfFxcW1xcXVxcKFxcKVxcLlxce1xcfV0vZztcbmZ1bmN0aW9uIHBhZCh2YWx1ZSwgZmlsbCwgd2lkdGgpIHtcbiAgdmFyIHNpZ24gPSB2YWx1ZSA8IDAgPyBcIi1cIiA6IFwiXCIsXG4gICAgICBzdHJpbmcgPSAoc2lnbiA/IC12YWx1ZSA6IHZhbHVlKSArIFwiXCIsXG4gICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICByZXR1cm4gc2lnbiArIChsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgKyBzdHJpbmcgOiBzdHJpbmcpO1xufVxuXG5mdW5jdGlvbiByZXF1b3RlKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZShyZXF1b3RlUmUsIFwiXFxcXCQmXCIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRSZShuYW1lcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oPzpcIiArIG5hbWVzLm1hcChyZXF1b3RlKS5qb2luKFwifFwiKSArIFwiKVwiLCBcImlcIik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdExvb2t1cChuYW1lcykge1xuICB2YXIgbWFwID0ge30sIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIG1hcFtuYW1lc1tpXS50b0xvd2VyQ2FzZSgpXSA9IGk7XG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlV2Vla2RheU51bWJlcihkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMSkpO1xuICByZXR1cm4gbiA/IChkLncgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZVdlZWtOdW1iZXJTdW5kYXkoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICByZXR1cm4gbiA/IChkLlUgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZVdlZWtOdW1iZXJNb25kYXkoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICByZXR1cm4gbiA/IChkLlcgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZUZ1bGxZZWFyKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyA0KSk7XG4gIHJldHVybiBuID8gKGQueSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICByZXR1cm4gbiA/IChkLnkgPSArblswXSArICgrblswXSA+IDY4ID8gMTkwMCA6IDIwMDApLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlWm9uZShkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSAvXihaKXwoWystXVxcZFxcZCkoPzpcXDo/KFxcZFxcZCkpPy8uZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDYpKTtcbiAgaWYgKG4pIHtcbiAgICBkLlogPSBuWzFdID8gMCAgICAgICAgICAgICAgLy8gJ1onIGZvciBVVENcbiAgICAgICAgOiBuWzNdID8gLShuWzJdICsgblszXSkgLy8gc2lnbiBkaWZmZXJzIGZyb20gZ2V0VGltZXpvbmVPZmZzZXQhXG4gICAgICAgICAgICAgICA6IC1uWzJdICogMTAwO1xuICAgIHJldHVybiBpICsgblswXS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZU1vbnRoTnVtYmVyKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gIHJldHVybiBuID8gKGQubSA9IG5bMF0gLSAxLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF5T2ZNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICByZXR1cm4gbiA/IChkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZURheU9mWWVhcihkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMykpO1xuICByZXR1cm4gbiA/IChkLm0gPSAwLCBkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZUhvdXIyNChkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICByZXR1cm4gbiA/IChkLkggPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZU1pbnV0ZXMoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgcmV0dXJuIG4gPyAoZC5NID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VTZWNvbmRzKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gIHJldHVybiBuID8gKGQuUyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTWlsbGlzZWNvbmRzKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAzKSk7XG4gIHJldHVybiBuID8gKGQuTCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTGl0ZXJhbFBlcmNlbnQoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gcGVyY2VudFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAxKSk7XG4gIHJldHVybiBuID8gaSArIG5bMF0ubGVuZ3RoIDogLTE7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERheU9mTW9udGgoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0RGF0ZSgpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SG91cjI0KGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldEhvdXJzKCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRIb3VyMTIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF5T2ZZZWFyKGQsIHApIHtcbiAgcmV0dXJuIHBhZCgxICsgZDNUaW1lLmRheS5jb3VudChkM1RpbWUueWVhcihkKSwgZCksIHAsIDMpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRNaWxsaXNlY29uZHMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0TWlsbGlzZWNvbmRzKCksIHAsIDMpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRNb250aE51bWJlcihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRNb250aCgpICsgMSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdE1pbnV0ZXMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0TWludXRlcygpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0U2Vjb25kcyhkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRTZWNvbmRzKCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgcmV0dXJuIHBhZChkM1RpbWUuc3VuZGF5LmNvdW50KGQzVGltZS55ZWFyKGQpLCBkKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFdlZWtkYXlOdW1iZXIoZCkge1xuICByZXR1cm4gZC5nZXREYXkoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0V2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gIHJldHVybiBwYWQoZDNUaW1lLm1vbmRheS5jb3VudChkM1RpbWUueWVhcihkKSwgZCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRZZWFyKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldEZ1bGxZZWFyKCkgJSAxMDAsIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRGdWxsWWVhcihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwMDAsIHAsIDQpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRab25lKGQpIHtcbiAgdmFyIHogPSBkLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIHJldHVybiAoeiA+IDAgPyBcIi1cIiA6ICh6ICo9IC0xLCBcIitcIikpXG4gICAgICArIHBhZCh6IC8gNjAgfCAwLCBcIjBcIiwgMilcbiAgICAgICsgcGFkKHogJSA2MCwgXCIwXCIsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENEYXlPZk1vbnRoKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ0RhdGUoKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ0hvdXIyNChkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRVVENIb3VycygpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDSG91cjEyKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ0RheU9mWWVhcihkLCBwKSB7XG4gIHJldHVybiBwYWQoMSArIGQzVGltZS51dGNEYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDTWlsbGlzZWNvbmRzKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ01pbGxpc2Vjb25kcygpLCBwLCAzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDTW9udGhOdW1iZXIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEsIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENNaW51dGVzKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ01pbnV0ZXMoKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ1NlY29uZHMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDU2Vjb25kcygpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDV2Vla051bWJlclN1bmRheShkLCBwKSB7XG4gIHJldHVybiBwYWQoZDNUaW1lLnV0Y1N1bmRheS5jb3VudChkM1RpbWUudXRjWWVhcihkKSwgZCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyKGQpIHtcbiAgcmV0dXJuIGQuZ2V0VVRDRGF5KCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtOdW1iZXJNb25kYXkoZCwgcCkge1xuICByZXR1cm4gcGFkKGQzVGltZS51dGNNb25kYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDWWVhcihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRVVENGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDRnVsbFllYXIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDRnVsbFllYXIoKSAlIDEwMDAwLCBwLCA0KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDWm9uZSgpIHtcbiAgcmV0dXJuIFwiKzAwMDBcIjtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TGl0ZXJhbFBlcmNlbnQoKSB7XG4gIHJldHVybiBcIiVcIjtcbn1cblxudmFyIGlzb1NwZWNpZmllciA9IFwiJVktJW0tJWRUJUg6JU06JVMuJUxaXCI7XG5cbmZ1bmN0aW9uIGZvcm1hdElzb05hdGl2ZShkYXRlKSB7XG4gIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG59XG5cbmZvcm1hdElzb05hdGl2ZS5wYXJzZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZyk7XG4gIHJldHVybiBpc05hTihkYXRlKSA/IG51bGwgOiBkYXRlO1xufTtcblxuZm9ybWF0SXNvTmF0aXZlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBpc29TcGVjaWZpZXI7XG59O1xuXG52YXIgZm9ybWF0SXNvID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgJiYgK25ldyBEYXRlKFwiMjAwMC0wMS0wMVQwMDowMDowMC4wMDBaXCIpXG4gICAgPyBmb3JtYXRJc29OYXRpdmVcbiAgICA6IGxvY2FsZSQxLnV0Y0Zvcm1hdChpc29TcGVjaWZpZXIpO1xuXG52YXIgbG9jYWxlRGVmaW5pdGlvbnMgPSB7XG4gIFwiY2EtRVNcIjogY2FFcyxcbiAgXCJkZS1DSFwiOiBkZUNoLFxuICBcImRlLURFXCI6IGRlRGUsXG4gIFwiZW4tQ0FcIjogZW5DYSxcbiAgXCJlbi1HQlwiOiBlbkdiLFxuICBcImVuLVVTXCI6IGxvY2FsZSQxLFxuICBcImVzLUVTXCI6IGVzRXMsXG4gIFwiZmktRklcIjogZmlGaSxcbiAgXCJmci1DQVwiOiBmckNhLFxuICBcImZyLUZSXCI6IGZyRnIsXG4gIFwiaGUtSUxcIjogaGVJbCxcbiAgXCJodS1IVVwiOiBodUh1LFxuICBcIml0LUlUXCI6IGl0SXQsXG4gIFwiamEtSlBcIjogamFKcCxcbiAgXCJrby1LUlwiOiBrb0tyLFxuICBcIm1rLU1LXCI6IG1rTWssXG4gIFwibmwtTkxcIjogbmxObCxcbiAgXCJwbC1QTFwiOiBwbFBsLFxuICBcInB0LUJSXCI6IHB0QnIsXG4gIFwicnUtUlVcIjogcnVSdSxcbiAgXCJzdi1TRVwiOiBzdlNlLFxuICBcInpoLUNOXCI6IHpoQ25cbn07XG5cbnZhciBkZWZhdWx0TG9jYWxlID0gbG9jYWxlKGxvY2FsZSQxKTtcbnZhciBmb3JtYXQkMSA9IGRlZmF1bHRMb2NhbGUuZm9ybWF0O1xudmFyIHV0Y0Zvcm1hdCA9IGRlZmF1bHRMb2NhbGUudXRjRm9ybWF0O1xuXG5mdW5jdGlvbiBsb2NhbGVGb3JtYXQoZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIGRlZmluaXRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoIWxvY2FsZURlZmluaXRpb25zLmhhc093blByb3BlcnR5KGRlZmluaXRpb24pKSByZXR1cm4gbnVsbDtcbiAgICBkZWZpbml0aW9uID0gbG9jYWxlRGVmaW5pdGlvbnNbZGVmaW5pdGlvbl07XG4gIH1cbiAgcmV0dXJuIGxvY2FsZShkZWZpbml0aW9uKTtcbn07XG5cbmV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0JDE7XG5leHBvcnRzLnV0Y0Zvcm1hdCA9IHV0Y0Zvcm1hdDtcbmV4cG9ydHMubG9jYWxlRm9ybWF0ID0gbG9jYWxlRm9ybWF0O1xuZXhwb3J0cy5pc29Gb3JtYXQgPSBmb3JtYXRJc287IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdDAgPSBuZXcgRGF0ZTtcbnZhciB0MSA9IG5ldyBEYXRlO1xuZnVuY3Rpb24gbmV3SW50ZXJ2YWwoZmxvb3JpLCBvZmZzZXRpLCBjb3VudCkge1xuXG4gIGZ1bmN0aW9uIGludGVydmFsKGRhdGUpIHtcbiAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICB9XG5cbiAgaW50ZXJ2YWwuZmxvb3IgPSBpbnRlcnZhbDtcblxuICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgZDAgPSBuZXcgRGF0ZSgrZGF0ZSksXG4gICAgICAgIGQxID0gbmV3IERhdGUoZGF0ZSAtIDEpO1xuICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgIHJldHVybiBkYXRlIC0gZDAgPCBkMSAtIGRhdGUgPyBkMCA6IGQxO1xuICB9O1xuXG4gIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoZGF0ZSAtIDEpKSwgb2Zmc2V0aShkYXRlLCAxKSwgZGF0ZTtcbiAgfTtcblxuICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgcmV0dXJuIG9mZnNldGkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSwgc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCkpLCBkYXRlO1xuICB9O1xuXG4gIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0IC0gMSk7XG4gICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICBzdGVwID0gc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgaWYgKHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICB3aGlsZSAob2Zmc2V0aShzdGFydCwgc3RlcCksIGZsb29yaShzdGFydCksIHN0YXJ0IDwgc3RvcCkgcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTtcbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG5cbiAgaW50ZXJ2YWwuZmlsdGVyID0gZnVuY3Rpb24odGVzdCkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICB3aGlsZSAoZmxvb3JpKGRhdGUpLCAhdGVzdChkYXRlKSkgZGF0ZS5zZXRUaW1lKGRhdGUgLSAxKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaWYgKGNvdW50KSBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICB0MC5zZXRUaW1lKCtzdGFydCksIHQxLnNldFRpbWUoK2VuZCk7XG4gICAgZmxvb3JpKHQwKSwgZmxvb3JpKHQxKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgfTtcblxuICByZXR1cm4gaW50ZXJ2YWw7XG59O1xuXG52YXIgbWlsbGlzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgLy8gbm9vcFxufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xufSk7XG5cbnZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG59KTtcblxudmFyIG1pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRTZWNvbmRzKDAsIDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG59KTtcblxudmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0TWludXRlcygwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG59KTtcblxudmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA4NjRlNTtcbn0pO1xuXG5mdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwICogNyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICB9KTtcbn1cblxudmFyIHN1bmRheSA9IHdlZWtkYXkoMCk7XG52YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcbnZhciB0dWVzZGF5ID0gd2Vla2RheSgyKTtcbnZhciB3ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xudmFyIHRodXJzZGF5ID0gd2Vla2RheSg0KTtcbnZhciBmcmlkYXkgPSB3ZWVrZGF5KDUpO1xudmFyIHNhdHVyZGF5ID0gd2Vla2RheSg2KTtcblxudmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBkYXRlLnNldERhdGUoMSk7XG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xufSk7XG5cbnZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBkYXRlLnNldE1vbnRoKDAsIDEpO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xufSk7XG5cbnZhciB1dGNTZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDTWlsbGlzZWNvbmRzKDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMWUzKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG59KTtcblxudmFyIHV0Y01pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogNmU0KTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG59KTtcblxudmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDM2ZTUpO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG59KTtcblxudmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gODY0ZTU7XG59KTtcblxuZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCAqIDcpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2MDQ4ZTU7XG4gIH0pO1xufVxuXG52YXIgdXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcbnZhciB1dGNNb25kYXkgPSB1dGNXZWVrZGF5KDEpO1xudmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xudmFyIHV0Y1dlZG5lc2RheSA9IHV0Y1dlZWtkYXkoMyk7XG52YXIgdXRjVGh1cnNkYXkgPSB1dGNXZWVrZGF5KDQpO1xudmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG52YXIgdXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG52YXIgdXRjTW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGVuZC5nZXRVVENNb250aCgpIC0gc3RhcnQuZ2V0VVRDTW9udGgoKSArIChlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkpICogMTI7XG59KTtcblxudmFyIHV0Y1llYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiBlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCk7XG59KTtcblxudmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xudmFyIHNlY29uZHMgPSBzZWNvbmQucmFuZ2U7XG52YXIgbWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcbnZhciBob3VycyA9IGhvdXIucmFuZ2U7XG52YXIgZGF5cyA9IGRheS5yYW5nZTtcbnZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xudmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG52YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xudmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG52YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG52YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbnZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcbnZhciB3ZWVrcyA9IHN1bmRheS5yYW5nZTtcbnZhciBtb250aHMgPSBtb250aC5yYW5nZTtcbnZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbnZhciB1dGNNaWxsaXNlY29uZCA9IG1pbGxpc2Vjb25kO1xudmFyIHV0Y01pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbnZhciB1dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xudmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG52YXIgdXRjSG91cnMgPSB1dGNIb3VyLnJhbmdlO1xudmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG52YXIgdXRjU3VuZGF5cyA9IHV0Y1N1bmRheS5yYW5nZTtcbnZhciB1dGNNb25kYXlzID0gdXRjTW9uZGF5LnJhbmdlO1xudmFyIHV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheS5yYW5nZTtcbnZhciB1dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5LnJhbmdlO1xudmFyIHV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5LnJhbmdlO1xudmFyIHV0Y0ZyaWRheXMgPSB1dGNGcmlkYXkucmFuZ2U7XG52YXIgdXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXkucmFuZ2U7XG52YXIgdXRjV2Vla3MgPSB1dGNTdW5kYXkucmFuZ2U7XG52YXIgdXRjTW9udGhzID0gdXRjTW9udGgucmFuZ2U7XG52YXIgdXRjWWVhcnMgPSB1dGNZZWFyLnJhbmdlO1xuXG5leHBvcnRzLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbmV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZHM7XG5leHBvcnRzLm1pbnV0ZXMgPSBtaW51dGVzO1xuZXhwb3J0cy5ob3VycyA9IGhvdXJzO1xuZXhwb3J0cy5kYXlzID0gZGF5cztcbmV4cG9ydHMuc3VuZGF5cyA9IHN1bmRheXM7XG5leHBvcnRzLm1vbmRheXMgPSBtb25kYXlzO1xuZXhwb3J0cy50dWVzZGF5cyA9IHR1ZXNkYXlzO1xuZXhwb3J0cy53ZWRuZXNkYXlzID0gd2VkbmVzZGF5cztcbmV4cG9ydHMudGh1cnNkYXlzID0gdGh1cnNkYXlzO1xuZXhwb3J0cy5mcmlkYXlzID0gZnJpZGF5cztcbmV4cG9ydHMuc2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuZXhwb3J0cy53ZWVrcyA9IHdlZWtzO1xuZXhwb3J0cy5tb250aHMgPSBtb250aHM7XG5leHBvcnRzLnllYXJzID0geWVhcnM7XG5leHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gdXRjTWlsbGlzZWNvbmQ7XG5leHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IHV0Y01pbGxpc2Vjb25kcztcbmV4cG9ydHMudXRjU2Vjb25kcyA9IHV0Y1NlY29uZHM7XG5leHBvcnRzLnV0Y01pbnV0ZXMgPSB1dGNNaW51dGVzO1xuZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbmV4cG9ydHMudXRjU3VuZGF5cyA9IHV0Y1N1bmRheXM7XG5leHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuZXhwb3J0cy51dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXlzO1xuZXhwb3J0cy51dGNXZWRuZXNkYXlzID0gdXRjV2VkbmVzZGF5cztcbmV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbmV4cG9ydHMudXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXlzO1xuZXhwb3J0cy51dGNXZWVrcyA9IHV0Y1dlZWtzO1xuZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG5leHBvcnRzLnV0Y1llYXJzID0gdXRjWWVhcnM7XG5leHBvcnRzLmludGVydmFsID0gbmV3SW50ZXJ2YWw7XG5leHBvcnRzLm1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG5leHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbmV4cG9ydHMubWludXRlID0gbWludXRlO1xuZXhwb3J0cy5ob3VyID0gaG91cjtcbmV4cG9ydHMuZGF5ID0gZGF5O1xuZXhwb3J0cy5zdW5kYXkgPSBzdW5kYXk7XG5leHBvcnRzLm1vbmRheSA9IG1vbmRheTtcbmV4cG9ydHMudHVlc2RheSA9IHR1ZXNkYXk7XG5leHBvcnRzLndlZG5lc2RheSA9IHdlZG5lc2RheTtcbmV4cG9ydHMudGh1cnNkYXkgPSB0aHVyc2RheTtcbmV4cG9ydHMuZnJpZGF5ID0gZnJpZGF5O1xuZXhwb3J0cy5zYXR1cmRheSA9IHNhdHVyZGF5O1xuZXhwb3J0cy53ZWVrID0gc3VuZGF5O1xuZXhwb3J0cy5tb250aCA9IG1vbnRoO1xuZXhwb3J0cy55ZWFyID0geWVhcjtcbmV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuZXhwb3J0cy51dGNNaW51dGUgPSB1dGNNaW51dGU7XG5leHBvcnRzLnV0Y0hvdXIgPSB1dGNIb3VyO1xuZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG5leHBvcnRzLnV0Y1N1bmRheSA9IHV0Y1N1bmRheTtcbmV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjVHVlc2RheTtcbmV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuZXhwb3J0cy51dGNUaHVyc2RheSA9IHV0Y1RodXJzZGF5O1xuZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNGcmlkYXk7XG5leHBvcnRzLnV0Y1NhdHVyZGF5ID0gdXRjU2F0dXJkYXk7XG5leHBvcnRzLnV0Y1dlZWsgPSB1dGNTdW5kYXk7XG5leHBvcnRzLnV0Y01vbnRoID0gdXRjTW9udGg7XG5leHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIE1lYXN1cmVzID0gcmVxdWlyZSgnLi9tZWFzdXJlcycpLFxuICAgIENvbGxlY3RvciA9IHJlcXVpcmUoJy4vY29sbGVjdG9yJyk7XG5cbmZ1bmN0aW9uIEFnZ3JlZ2F0b3IoKSB7XG4gIHRoaXMuX2NlbGxzID0ge307XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgdGhpcy5fc3RyZWFtID0gZmFsc2U7XG59XG5cbnZhciBGbGFncyA9IEFnZ3JlZ2F0b3IuRmxhZ3MgPSB7XG4gIEFERF9DRUxMOiAxLFxuICBNT0RfQ0VMTDogMlxufTtcblxudmFyIHByb3RvID0gQWdncmVnYXRvci5wcm90b3R5cGU7XG5cbi8vIFBhcmFtZXRlcnNcblxucHJvdG8uc3RyZWFtID0gZnVuY3Rpb24odikge1xuICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICB0aGlzLl9zdHJlYW0gPSAhIXY7XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBrZXkgYWNjZXNzb3IgdG8gdXNlIGZvciBzdHJlYW1pbmcgcmVtb3Zlc1xucHJvdG8ua2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX2tleTtcbiAgdGhpcy5fa2V5ID0gdXRpbC4kKGtleSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gSW5wdXQ6IGFycmF5IG9mIG9iamVjdHMgb2YgdGhlIGZvcm1cbi8vIHtuYW1lOiBzdHJpbmcsIGdldDogZnVuY3Rpb259XG5wcm90by5ncm91cGJ5ID0gZnVuY3Rpb24oZGltcykge1xuICB0aGlzLl9kaW1zID0gdXRpbC5hcnJheShkaW1zKS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgIGQgPSB1dGlsLmlzU3RyaW5nKGQpID8ge25hbWU6IGQsIGdldDogdXRpbC4kKGQpfVxuICAgICAgOiB1dGlsLmlzRnVuY3Rpb24oZCkgPyB7bmFtZTogdXRpbC5uYW1lKGQpIHx8IGQubmFtZSB8fCAoJ18nICsgaSksIGdldDogZH1cbiAgICAgIDogKGQubmFtZSAmJiB1dGlsLmlzRnVuY3Rpb24oZC5nZXQpKSA/IGQgOiBudWxsO1xuICAgIGlmIChkID09IG51bGwpIHRocm93ICdJbnZhbGlkIGdyb3VwYnkgYXJndW1lbnQ6ICcgKyBkO1xuICAgIHJldHVybiBkO1xuICB9KTtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcbn07XG5cbi8vIElucHV0OiBhcnJheSBvZiBvYmplY3RzIG9mIHRoZSBmb3JtXG4vLyB7bmFtZTogc3RyaW5nLCBvcHM6IFtzdHJpbmcsIC4uLl19XG5wcm90by5zdW1tYXJpemUgPSBmdW5jdGlvbihmaWVsZHMpIHtcbiAgZmllbGRzID0gc3VtbWFyaXplX2FyZ3MoZmllbGRzKTtcbiAgdGhpcy5fY291bnQgPSB0cnVlO1xuICB2YXIgYWdnciA9ICh0aGlzLl9hZ2dyID0gW10pLFxuICAgICAgbSwgZiwgaSwgaiwgb3AsIGFzLCBnZXQ7XG5cbiAgZm9yIChpPTA7IGk8ZmllbGRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChqPTAsIG09W10sIGY9ZmllbGRzW2ldOyBqPGYub3BzLmxlbmd0aDsgKytqKSB7XG4gICAgICBvcCA9IGYub3BzW2pdO1xuICAgICAgaWYgKG9wICE9PSAnY291bnQnKSB0aGlzLl9jb3VudCA9IGZhbHNlO1xuICAgICAgYXMgPSAoZi5hcyAmJiBmLmFzW2pdKSB8fCAob3AgKyAoZi5uYW1lPT09JyonID8gJycgOiAnXycrZi5uYW1lKSk7XG4gICAgICBtLnB1c2goTWVhc3VyZXNbb3BdKGFzKSk7XG4gICAgfVxuICAgIGdldCA9IGYuZ2V0ICYmIHV0aWwuJChmLmdldCkgfHxcbiAgICAgIChmLm5hbWUgPT09ICcqJyA/IHV0aWwuaWRlbnRpdHkgOiB1dGlsLiQoZi5uYW1lKSk7XG4gICAgYWdnci5wdXNoKHtcbiAgICAgIG5hbWU6IGYubmFtZSxcbiAgICAgIG1lYXN1cmVzOiBNZWFzdXJlcy5jcmVhdGUoXG4gICAgICAgIG0sXG4gICAgICAgIHRoaXMuX3N0cmVhbSwgLy8gc3RyZWFtaW5nIHJlbW92ZSBmbGFnXG4gICAgICAgIGdldCwgICAgICAgICAgLy8gaW5wdXQgdHVwbGUgZ2V0dGVyXG4gICAgICAgIHRoaXMuX2Fzc2lnbikgLy8gb3V0cHV0IHR1cGxlIHNldHRlclxuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLmNsZWFyKCk7XG59O1xuXG4vLyBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VtbWFyaXplIGJ5IGNvdW50XG5wcm90by5jb3VudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdW1tYXJpemUoeycqJzonY291bnQnfSk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSB2YWx1ZSBhc3NpZ25tZW50XG5wcm90by5fYXNzaWduID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHN1bW1hcml6ZV9hcmdzKGZpZWxkcykge1xuICBpZiAodXRpbC5pc0FycmF5KGZpZWxkcykpIHsgcmV0dXJuIGZpZWxkczsgfVxuICBpZiAoZmllbGRzID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG4gIHZhciBhID0gW10sIG5hbWUsIG9wcztcbiAgZm9yIChuYW1lIGluIGZpZWxkcykge1xuICAgIG9wcyA9IHV0aWwuYXJyYXkoZmllbGRzW25hbWVdKTtcbiAgICBhLnB1c2goe25hbWU6IG5hbWUsIG9wczogb3BzfSk7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIENlbGwgTWFuYWdlbWVudFxuXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuX2NlbGxzID0ge30sIHRoaXMpO1xufTtcblxucHJvdG8uX2NlbGxrZXkgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBkID0gdGhpcy5fZGltcyxcbiAgICAgIG4gPSBkLmxlbmd0aCwgaSxcbiAgICAgIGsgPSBTdHJpbmcoZFswXS5nZXQoeCkpO1xuICBmb3IgKGk9MTsgaTxuOyArK2kpIHtcbiAgICBrICs9ICd8JyArIGRbaV0uZ2V0KHgpO1xuICB9XG4gIHJldHVybiBrO1xufTtcblxucHJvdG8uX2NlbGwgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXkgPSB0aGlzLl9kaW1zLmxlbmd0aCA/IHRoaXMuX2NlbGxrZXkoeCkgOiAnJztcbiAgcmV0dXJuIHRoaXMuX2NlbGxzW2tleV0gfHwgKHRoaXMuX2NlbGxzW2tleV0gPSB0aGlzLl9uZXdjZWxsKHgsIGtleSkpO1xufTtcblxucHJvdG8uX25ld2NlbGwgPSBmdW5jdGlvbih4LCBrZXkpIHtcbiAgdmFyIGNlbGwgPSB7XG4gICAgbnVtOiAgIDAsXG4gICAgdHVwbGU6IHRoaXMuX25ld3R1cGxlKHgsIGtleSksXG4gICAgZmxhZzogIEZsYWdzLkFERF9DRUxMLFxuICAgIGFnZ3M6ICB7fVxuICB9O1xuXG4gIHZhciBhZ2dyID0gdGhpcy5fYWdnciwgaTtcbiAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdID0gbmV3IGFnZ3JbaV0ubWVhc3VyZXMoY2VsbCwgY2VsbC50dXBsZSk7XG4gIH1cbiAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgIGNlbGwuZGF0YSA9IG5ldyBDb2xsZWN0b3IodGhpcy5fa2V5KTtcbiAgfVxuICByZXR1cm4gY2VsbDtcbn07XG5cbnByb3RvLl9uZXd0dXBsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGRpbXMgPSB0aGlzLl9kaW1zLFxuICAgICAgdCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj1kaW1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB0W2RpbXNbaV0ubmFtZV0gPSBkaW1zW2ldLmdldCh4KTtcbiAgfVxuICByZXR1cm4gdGhpcy5faW5nZXN0KHQpO1xufTtcblxuLy8gT3ZlcnJpZGUgdG8gcGVyZm9ybSBjdXN0b20gdHVwbGUgaW5nZXN0aW9uXG5wcm90by5faW5nZXN0ID0gdXRpbC5pZGVudGl0eTtcblxuLy8gUHJvY2VzcyBUdXBsZXNcblxucHJvdG8uX2FkZCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsKHgpLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG5cbiAgY2VsbC5udW0gKz0gMTtcbiAgaWYgKCF0aGlzLl9jb3VudCkgeyAvLyBza2lwIGlmIGNvdW50LW9ubHlcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSBjZWxsLmRhdGEuYWRkKHgpO1xuICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLmFkZCh4KTtcbiAgICB9XG4gIH1cbiAgY2VsbC5mbGFnIHw9IEZsYWdzLk1PRF9DRUxMO1xuICBpZiAodGhpcy5fb25fYWRkKSB0aGlzLl9vbl9hZGQoeCwgY2VsbCk7XG59O1xuXG5wcm90by5fcmVtID0gZnVuY3Rpb24oeCkge1xuICB2YXIgY2VsbCA9IHRoaXMuX2NlbGwoeCksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBjZWxsLm51bSAtPSAxO1xuICBpZiAoIXRoaXMuX2NvdW50KSB7IC8vIHNraXAgaWYgY291bnQtb25seVxuICAgIGlmIChjZWxsLmNvbGxlY3QpIGNlbGwuZGF0YS5yZW0oeCk7XG4gICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0ucmVtKHgpO1xuICAgIH1cbiAgfVxuICBjZWxsLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGlmICh0aGlzLl9vbl9yZW0pIHRoaXMuX29uX3JlbSh4LCBjZWxsKTtcbn07XG5cbnByb3RvLl9tb2QgPSBmdW5jdGlvbihjdXJyLCBwcmV2KSB7XG4gIHZhciBjZWxsMCA9IHRoaXMuX2NlbGwocHJldiksXG4gICAgICBjZWxsMSA9IHRoaXMuX2NlbGwoY3VyciksXG4gICAgICBhZ2dyID0gdGhpcy5fYWdnciwgaTtcblxuICBpZiAoY2VsbDAgIT09IGNlbGwxKSB7XG4gICAgY2VsbDAubnVtIC09IDE7XG4gICAgY2VsbDEubnVtICs9IDE7XG4gICAgaWYgKGNlbGwwLmNvbGxlY3QpIGNlbGwwLmRhdGEucmVtKHByZXYpO1xuICAgIGlmIChjZWxsMS5jb2xsZWN0KSBjZWxsMS5kYXRhLmFkZChjdXJyKTtcbiAgfSBlbHNlIGlmIChjZWxsMC5jb2xsZWN0ICYmICF1dGlsLmlzT2JqZWN0KGN1cnIpKSB7XG4gICAgY2VsbDAuZGF0YS5yZW0ocHJldik7XG4gICAgY2VsbDAuZGF0YS5hZGQoY3Vycik7XG4gIH1cblxuICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgY2VsbDAuYWdnc1thZ2dyW2ldLm5hbWVdLnJlbShwcmV2KTtcbiAgICBjZWxsMS5hZ2dzW2FnZ3JbaV0ubmFtZV0uYWRkKGN1cnIpO1xuICB9XG4gIGNlbGwwLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGNlbGwxLmZsYWcgfD0gRmxhZ3MuTU9EX0NFTEw7XG4gIGlmICh0aGlzLl9vbl9tb2QpIHRoaXMuX29uX21vZChjdXJyLCBwcmV2LCBjZWxsMCwgY2VsbDEpO1xufTtcblxucHJvdG8ucmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLFxuICAgICAgY2VsbCwgaSwgaztcblxuICBmb3IgKGsgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICBjZWxsID0gdGhpcy5fY2VsbHNba107XG4gICAgaWYgKGNlbGwubnVtID4gMCkge1xuICAgICAgLy8gY29uc29saWRhdGUgY29sbGVjdG9yIHZhbHVlc1xuICAgICAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgICAgICBjZWxsLmRhdGEudmFsdWVzKCk7XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgdHVwbGUgcHJvcGVydGllc1xuICAgICAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5zZXQoKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBvdXRwdXQgdHVwbGVcbiAgICAgIHJlc3VsdC5wdXNoKGNlbGwudHVwbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5fY2VsbHNba107XG4gICAgfVxuICAgIGNlbGwuZmxhZyA9IDA7XG4gIH1cblxuICB0aGlzLl9yZW1zID0gZmFsc2U7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5wcm90by5jaGFuZ2VzID0gZnVuY3Rpb24ob3V0cHV0KSB7XG4gIHZhciBjaGFuZ2VzID0gb3V0cHV0IHx8IHthZGQ6W10sIHJlbTpbXSwgbW9kOltdfSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLFxuICAgICAgY2VsbCwgZmxhZywgaSwgaztcblxuICBmb3IgKGsgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICBjZWxsID0gdGhpcy5fY2VsbHNba107XG4gICAgZmxhZyA9IGNlbGwuZmxhZztcblxuICAgIC8vIGNvbnNvbGlkYXRlIGNvbGxlY3RvciB2YWx1ZXNcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSB7XG4gICAgICBjZWxsLmRhdGEudmFsdWVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHR1cGxlIHByb3BlcnRpZXNcbiAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5zZXQoKTtcbiAgICB9XG5cbiAgICAvLyBvcmdhbml6ZSBvdXRwdXQgdHVwbGVzXG4gICAgaWYgKGNlbGwubnVtIDw9IDApIHtcbiAgICAgIGNoYW5nZXMucmVtLnB1c2goY2VsbC50dXBsZSk7IC8vIGlmIChmbGFnID09PSBGbGFncy5NT0RfQ0VMTCkgeyA/P1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2tdO1xuICAgICAgaWYgKHRoaXMuX29uX2Ryb3ApIHRoaXMuX29uX2Ryb3AoY2VsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9vbl9rZWVwKSB0aGlzLl9vbl9rZWVwKGNlbGwpO1xuICAgICAgaWYgKGZsYWcgJiBGbGFncy5BRERfQ0VMTCkge1xuICAgICAgICBjaGFuZ2VzLmFkZC5wdXNoKGNlbGwudHVwbGUpO1xuICAgICAgfSBlbHNlIGlmIChmbGFnICYgRmxhZ3MuTU9EX0NFTEwpIHtcbiAgICAgICAgY2hhbmdlcy5tb2QucHVzaChjZWxsLnR1cGxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjZWxsLmZsYWcgPSAwO1xuICB9XG5cbiAgdGhpcy5fcmVtcyA9IGZhbHNlO1xuICByZXR1cm4gY2hhbmdlcztcbn07XG5cbnByb3RvLmV4ZWN1dGUgPSBmdW5jdGlvbihpbnB1dCkge1xuICByZXR1cm4gdGhpcy5jbGVhcigpLmluc2VydChpbnB1dCkucmVzdWx0KCk7XG59O1xuXG5wcm90by5pbnNlcnQgPSBmdW5jdGlvbihpbnB1dCkge1xuICB0aGlzLl9jb25zb2xpZGF0ZSgpO1xuICBmb3IgKHZhciBpPTA7IGk8aW5wdXQubGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzLl9hZGQoaW5wdXRbaV0pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgaWYgKCF0aGlzLl9zdHJlYW0pIHtcbiAgICB0aHJvdyAnQWdncmVnYXRvciBub3QgY29uZmlndXJlZCBmb3Igc3RyZWFtaW5nIHJlbW92ZXMuJyArXG4gICAgICAnIENhbGwgc3RyZWFtKHRydWUpIHByaW9yIHRvIGNhbGxpbmcgc3VtbWFyaXplLic7XG4gIH1cbiAgZm9yICh2YXIgaT0wOyBpPGlucHV0Lmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5fcmVtKGlucHV0W2ldKTtcbiAgfVxuICB0aGlzLl9yZW1zID0gdHJ1ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBjb25zb2xpZGF0ZSByZW1vdmFsc1xucHJvdG8uX2NvbnNvbGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fcmVtcykgcmV0dXJuO1xuICBmb3IgKHZhciBrIGluIHRoaXMuX2NlbGxzKSB7XG4gICAgaWYgKHRoaXMuX2NlbGxzW2tdLmNvbGxlY3QpIHtcbiAgICAgIHRoaXMuX2NlbGxzW2tdLmRhdGEudmFsdWVzKCk7XG4gICAgfVxuICB9XG4gIHRoaXMuX3JlbXMgPSBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWdncmVnYXRvcjtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIHN0YXRzID0gcmVxdWlyZSgnLi4vc3RhdHMnKTtcblxudmFyIFJFTSA9ICdfX2RsX3JlbV9fJztcblxuZnVuY3Rpb24gQ29sbGVjdG9yKGtleSkge1xuICB0aGlzLl9hZGQgPSBbXTtcbiAgdGhpcy5fcmVtID0gW107XG4gIHRoaXMuX2tleSA9IGtleSB8fCBudWxsO1xuICB0aGlzLl9sYXN0ID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gQ29sbGVjdG9yLnByb3RvdHlwZTtcblxucHJvdG8uYWRkID0gZnVuY3Rpb24odikge1xuICB0aGlzLl9hZGQucHVzaCh2KTtcbn07XG5cbnByb3RvLnJlbSA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5fcmVtLnB1c2godik7XG59O1xuXG5wcm90by52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZ2V0ID0gbnVsbDtcbiAgaWYgKHRoaXMuX3JlbS5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9hZGQ7XG5cbiAgdmFyIGEgPSB0aGlzLl9hZGQsXG4gICAgICByID0gdGhpcy5fcmVtLFxuICAgICAgayA9IHRoaXMuX2tleSxcbiAgICAgIHggPSBBcnJheShhLmxlbmd0aCAtIHIubGVuZ3RoKSxcbiAgICAgIGksIGosIG4sIG07XG5cbiAgaWYgKCF1dGlsLmlzT2JqZWN0KHJbMF0pKSB7XG4gICAgLy8gcHJvY2Vzc2luZyByYXcgdmFsdWVzXG4gICAgbSA9IHN0YXRzLmNvdW50Lm1hcChyKTtcbiAgICBmb3IgKGk9MCwgaj0wLCBuPWEubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgaWYgKG1bYVtpXV0gPiAwKSB7XG4gICAgICAgIG1bYVtpXV0gLT0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhbaisrXSA9IGFbaV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGspIHtcbiAgICAvLyBoYXMgdW5pcXVlIGtleSBmaWVsZCwgc28gdXNlIHRoYXRcbiAgICBtID0gdXRpbC50b01hcChyLCBrKTtcbiAgICBmb3IgKGk9MCwgaj0wLCBuPWEubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgaWYgKCFtLmhhc093blByb3BlcnR5KGsoYVtpXSkpKSB7IHhbaisrXSA9IGFbaV07IH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbm8gdW5pcXVlIGtleSwgbWFyayB0dXBsZXMgZGlyZWN0bHlcbiAgICBmb3IgKGk9MCwgbj1yLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIHJbaV1bUkVNXSA9IDE7XG4gICAgfVxuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAoIWFbaV1bUkVNXSkgeyB4W2orK10gPSBhW2ldOyB9XG4gICAgfVxuICAgIGZvciAoaT0wLCBuPXIubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgZGVsZXRlIHJbaV1bUkVNXTtcbiAgICB9XG4gIH1cblxuICB0aGlzLl9yZW0gPSBbXTtcbiAgcmV0dXJuICh0aGlzLl9hZGQgPSB4KTtcbn07XG5cbi8vIG1lbW9pemluZyBzdGF0aXN0aWNzIG1ldGhvZHNcblxucHJvdG8uZXh0ZW50ID0gZnVuY3Rpb24oZ2V0KSB7XG4gIGlmICh0aGlzLl9nZXQgIT09IGdldCB8fCAhdGhpcy5fZXh0KSB7XG4gICAgdmFyIHYgPSB0aGlzLnZhbHVlcygpLFxuICAgICAgICBpID0gc3RhdHMuZXh0ZW50LmluZGV4KHYsIGdldCk7XG4gICAgdGhpcy5fZXh0ID0gW3ZbaVswXV0sIHZbaVsxXV1dO1xuICAgIHRoaXMuX2dldCA9IGdldDtcbiAgfVxuICByZXR1cm4gdGhpcy5fZXh0O1xufTtcblxucHJvdG8uYXJnbWluID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLmV4dGVudChnZXQpWzBdO1xufTtcblxucHJvdG8uYXJnbWF4ID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLmV4dGVudChnZXQpWzFdO1xufTtcblxucHJvdG8ubWluID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHZhciBtID0gdGhpcy5leHRlbnQoZ2V0KVswXTtcbiAgcmV0dXJuIG0gPyBnZXQobSkgOiArSW5maW5pdHk7XG59O1xuXG5wcm90by5tYXggPSBmdW5jdGlvbihnZXQpIHtcbiAgdmFyIG0gPSB0aGlzLmV4dGVudChnZXQpWzFdO1xuICByZXR1cm4gbSA/IGdldChtKSA6IC1JbmZpbml0eTtcbn07XG5cbnByb3RvLnF1YXJ0aWxlID0gZnVuY3Rpb24oZ2V0KSB7XG4gIGlmICh0aGlzLl9nZXQgIT09IGdldCB8fCAhdGhpcy5fcSkge1xuICAgIHRoaXMuX3EgPSBzdGF0cy5xdWFydGlsZSh0aGlzLnZhbHVlcygpLCBnZXQpO1xuICAgIHRoaXMuX2dldCA9IGdldDtcbiAgfVxuICByZXR1cm4gdGhpcy5fcTtcbn07XG5cbnByb3RvLnExID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLnF1YXJ0aWxlKGdldClbMF07XG59O1xuXG5wcm90by5xMiA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5xdWFydGlsZShnZXQpWzFdO1xufTtcblxucHJvdG8ucTMgPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMucXVhcnRpbGUoZ2V0KVsyXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdG9yO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vYWdncmVnYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBmbGF0dGVuIGFyZ3VtZW50cyBpbnRvIGEgc2luZ2xlIGFycmF5XG4gIHZhciBhcmdzID0gW10ucmVkdWNlLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbihhLCB4KSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KHV0aWwuYXJyYXkoeCkpO1xuICB9LCBbXSk7XG4gIC8vIGNyZWF0ZSBhbmQgcmV0dXJuIGFuIGFnZ3JlZ2F0b3JcbiAgcmV0dXJuIG5ldyBBZ2dyZWdhdG9yKClcbiAgICAuZ3JvdXBieShhcmdzKVxuICAgIC5zdW1tYXJpemUoeycqJzondmFsdWVzJ30pO1xufTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuXG52YXIgdHlwZXMgPSB7XG4gICd2YWx1ZXMnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAndmFsdWVzJyxcbiAgICBpbml0OiAnY2VsbC5jb2xsZWN0ID0gdHJ1ZTsnLFxuICAgIHNldDogICdjZWxsLmRhdGEudmFsdWVzKCknLCBpZHg6IC0xXG4gIH0pLFxuICAnY291bnQnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnY291bnQnLFxuICAgIHNldDogICdjZWxsLm51bSdcbiAgfSksXG4gICdtaXNzaW5nJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21pc3NpbmcnLFxuICAgIHNldDogICd0aGlzLm1pc3NpbmcnXG4gIH0pLFxuICAndmFsaWQnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAndmFsaWQnLFxuICAgIHNldDogICd0aGlzLnZhbGlkJ1xuICB9KSxcbiAgJ3N1bSc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdW0nLFxuICAgIGluaXQ6ICd0aGlzLnN1bSA9IDA7JyxcbiAgICBhZGQ6ICAndGhpcy5zdW0gKz0gdjsnLFxuICAgIHJlbTogICd0aGlzLnN1bSAtPSB2OycsXG4gICAgc2V0OiAgJ3RoaXMuc3VtJ1xuICB9KSxcbiAgJ21lYW4nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWVhbicsXG4gICAgaW5pdDogJ3RoaXMubWVhbiA9IDA7JyxcbiAgICBhZGQ6ICAndmFyIGQgPSB2IC0gdGhpcy5tZWFuOyB0aGlzLm1lYW4gKz0gZCAvIHRoaXMudmFsaWQ7JyxcbiAgICByZW06ICAndmFyIGQgPSB2IC0gdGhpcy5tZWFuOyB0aGlzLm1lYW4gLT0gdGhpcy52YWxpZCA/IGQgLyB0aGlzLnZhbGlkIDogdGhpcy5tZWFuOycsXG4gICAgc2V0OiAgJ3RoaXMubWVhbidcbiAgfSksXG4gICdhdmVyYWdlJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2F2ZXJhZ2UnLFxuICAgIHNldDogICd0aGlzLm1lYW4nLFxuICAgIHJlcTogIFsnbWVhbiddLCBpZHg6IDFcbiAgfSksXG4gICd2YXJpYW5jZSc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YXJpYW5jZScsXG4gICAgaW5pdDogJ3RoaXMuZGV2ID0gMDsnLFxuICAgIGFkZDogICd0aGlzLmRldiArPSBkICogKHYgLSB0aGlzLm1lYW4pOycsXG4gICAgcmVtOiAgJ3RoaXMuZGV2IC09IGQgKiAodiAtIHRoaXMubWVhbik7JyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyB0aGlzLmRldiAvICh0aGlzLnZhbGlkLTEpIDogMCcsXG4gICAgcmVxOiAgWydtZWFuJ10sIGlkeDogMVxuICB9KSxcbiAgJ3ZhcmlhbmNlcCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICd2YXJpYW5jZXAnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IHRoaXMuZGV2IC8gdGhpcy52YWxpZCA6IDAnLFxuICAgIHJlcTogIFsndmFyaWFuY2UnXSwgaWR4OiAyXG4gIH0pLFxuICAnc3RkZXYnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3RkZXYnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IE1hdGguc3FydCh0aGlzLmRldiAvICh0aGlzLnZhbGlkLTEpKSA6IDAnLFxuICAgIHJlcTogIFsndmFyaWFuY2UnXSwgaWR4OiAyXG4gIH0pLFxuICAnc3RkZXZwJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3N0ZGV2cCcsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gTWF0aC5zcXJ0KHRoaXMuZGV2IC8gdGhpcy52YWxpZCkgOiAwJyxcbiAgICByZXE6ICBbJ3ZhcmlhbmNlJ10sIGlkeDogMlxuICB9KSxcbiAgJ21lZGlhbic6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtZWRpYW4nLFxuICAgIHNldDogICdjZWxsLmRhdGEucTIodGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdxMSc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdxMScsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMSh0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ3EzJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3EzJyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnEzKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAnZGlzdGluY3QnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnZGlzdGluY3QnLFxuICAgIHNldDogICd0aGlzLmRpc3RpbmN0KGNlbGwuZGF0YS52YWx1ZXMoKSwgdGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdhcmdtaW4nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXJnbWluJyxcbiAgICBhZGQ6ICAnaWYgKHYgPCB0aGlzLm1pbikgdGhpcy5hcmdtaW4gPSB0OycsXG4gICAgcmVtOiAgJ2lmICh2IDw9IHRoaXMubWluKSB0aGlzLmFyZ21pbiA9IG51bGw7JyxcbiAgICBzZXQ6ICAndGhpcy5hcmdtaW4gPSB0aGlzLmFyZ21pbiB8fCBjZWxsLmRhdGEuYXJnbWluKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWydtaW4nXSwgc3RyOiBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdhcmdtYXgnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnYXJnbWF4JyxcbiAgICBhZGQ6ICAnaWYgKHYgPiB0aGlzLm1heCkgdGhpcy5hcmdtYXggPSB0OycsXG4gICAgcmVtOiAgJ2lmICh2ID49IHRoaXMubWF4KSB0aGlzLmFyZ21heCA9IG51bGw7JyxcbiAgICBzZXQ6ICAndGhpcy5hcmdtYXggPSB0aGlzLmFyZ21heCB8fCBjZWxsLmRhdGEuYXJnbWF4KHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWydtYXgnXSwgc3RyOiBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdtaW4nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWluJyxcbiAgICBpbml0OiAndGhpcy5taW4gPSArSW5maW5pdHk7JyxcbiAgICBhZGQ6ICAnaWYgKHYgPCB0aGlzLm1pbikgdGhpcy5taW4gPSB2OycsXG4gICAgcmVtOiAgJ2lmICh2IDw9IHRoaXMubWluKSB0aGlzLm1pbiA9IE5hTjsnLFxuICAgIHNldDogICd0aGlzLm1pbiA9IChpc05hTih0aGlzLm1pbikgPyBjZWxsLmRhdGEubWluKHRoaXMuZ2V0KSA6IHRoaXMubWluKScsXG4gICAgc3RyOiAgWyd2YWx1ZXMnXSwgaWR4OiA0XG4gIH0pLFxuICAnbWF4JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21heCcsXG4gICAgaW5pdDogJ3RoaXMubWF4ID0gLUluZmluaXR5OycsXG4gICAgYWRkOiAgJ2lmICh2ID4gdGhpcy5tYXgpIHRoaXMubWF4ID0gdjsnLFxuICAgIHJlbTogICdpZiAodiA+PSB0aGlzLm1heCkgdGhpcy5tYXggPSBOYU47JyxcbiAgICBzZXQ6ICAndGhpcy5tYXggPSAoaXNOYU4odGhpcy5tYXgpID8gY2VsbC5kYXRhLm1heCh0aGlzLmdldCkgOiB0aGlzLm1heCknLFxuICAgIHN0cjogIFsndmFsdWVzJ10sIGlkeDogNFxuICB9KSxcbiAgJ21vZGVza2V3JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21vZGVza2V3JyxcbiAgICBzZXQ6ICAndGhpcy5kZXY9PT0wID8gMCA6ICh0aGlzLm1lYW4gLSBjZWxsLmRhdGEucTIodGhpcy5nZXQpKSAvIE1hdGguc3FydCh0aGlzLmRldi8odGhpcy52YWxpZC0xKSknLFxuICAgIHJlcTogIFsnbWVhbicsICdzdGRldicsICdtZWRpYW4nXSwgaWR4OiA1XG4gIH0pXG59O1xuXG5mdW5jdGlvbiBtZWFzdXJlKGJhc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG91dCkge1xuICAgIHZhciBtID0gdXRpbC5leHRlbmQoe2luaXQ6JycsIGFkZDonJywgcmVtOicnLCBpZHg6MH0sIGJhc2UpO1xuICAgIG0ub3V0ID0gb3V0IHx8IGJhc2UubmFtZTtcbiAgICByZXR1cm4gbTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShhZ2csIHN0cmVhbSkge1xuICBmdW5jdGlvbiBjb2xsZWN0KG0sIGEpIHtcbiAgICBmdW5jdGlvbiBoZWxwZXIocikgeyBpZiAoIW1bcl0pIGNvbGxlY3QobSwgbVtyXSA9IHR5cGVzW3JdKCkpOyB9XG4gICAgaWYgKGEucmVxKSBhLnJlcS5mb3JFYWNoKGhlbHBlcik7XG4gICAgaWYgKHN0cmVhbSAmJiBhLnN0cikgYS5zdHIuZm9yRWFjaChoZWxwZXIpO1xuICAgIHJldHVybiBtO1xuICB9XG4gIHZhciBtYXAgPSBhZ2cucmVkdWNlKFxuICAgIGNvbGxlY3QsXG4gICAgYWdnLnJlZHVjZShmdW5jdGlvbihtLCBhKSB7IHJldHVybiAobVthLm5hbWVdID0gYSwgbSk7IH0sIHt9KVxuICApO1xuICByZXR1cm4gdXRpbC52YWxzKG1hcCkuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLmlkeCAtIGIuaWR4OyB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKGFnZywgc3RyZWFtLCBhY2Nlc3NvciwgbXV0YXRvcikge1xuICB2YXIgYWxsID0gcmVzb2x2ZShhZ2csIHN0cmVhbSksXG4gICAgICBjdHIgPSAndGhpcy5jZWxsID0gY2VsbDsgdGhpcy50dXBsZSA9IHQ7IHRoaXMudmFsaWQgPSAwOyB0aGlzLm1pc3NpbmcgPSAwOycsXG4gICAgICBhZGQgPSAnaWYgKHY9PW51bGwpIHRoaXMubWlzc2luZysrOyBpZiAoIXRoaXMuaXNWYWxpZCh2KSkgcmV0dXJuOyArK3RoaXMudmFsaWQ7JyxcbiAgICAgIHJlbSA9ICdpZiAodj09bnVsbCkgdGhpcy5taXNzaW5nLS07IGlmICghdGhpcy5pc1ZhbGlkKHYpKSByZXR1cm47IC0tdGhpcy52YWxpZDsnLFxuICAgICAgc2V0ID0gJ3ZhciB0ID0gdGhpcy50dXBsZTsgdmFyIGNlbGwgPSB0aGlzLmNlbGw7JztcblxuICBhbGwuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgaWYgKGEuaWR4IDwgMCkge1xuICAgICAgY3RyID0gYS5pbml0ICsgY3RyO1xuICAgICAgYWRkID0gYS5hZGQgKyBhZGQ7XG4gICAgICByZW0gPSBhLnJlbSArIHJlbTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3RyICs9IGEuaW5pdDtcbiAgICAgIGFkZCArPSBhLmFkZDtcbiAgICAgIHJlbSArPSBhLnJlbTtcbiAgICB9XG4gIH0pO1xuICBhZ2cuc2xpY2UoKVxuICAgIC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuaWR4IC0gYi5pZHg7IH0pXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYSkge1xuICAgICAgc2V0ICs9ICd0aGlzLmFzc2lnbih0LFxcJycrYS5vdXQrJ1xcJywnK2Euc2V0KycpOyc7XG4gICAgfSk7XG4gIHNldCArPSAncmV0dXJuIHQ7JztcblxuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICBjdHIgPSBGdW5jdGlvbignY2VsbCcsICd0JywgY3RyKTtcbiAgY3RyLnByb3RvdHlwZS5hc3NpZ24gPSBtdXRhdG9yO1xuICBjdHIucHJvdG90eXBlLmFkZCA9IEZ1bmN0aW9uKCd0JywgJ3ZhciB2ID0gdGhpcy5nZXQodCk7JyArIGFkZCk7XG4gIGN0ci5wcm90b3R5cGUucmVtID0gRnVuY3Rpb24oJ3QnLCAndmFyIHYgPSB0aGlzLmdldCh0KTsnICsgcmVtKTtcbiAgY3RyLnByb3RvdHlwZS5zZXQgPSBGdW5jdGlvbihzZXQpO1xuICBjdHIucHJvdG90eXBlLmdldCA9IGFjY2Vzc29yO1xuICBjdHIucHJvdG90eXBlLmRpc3RpbmN0ID0gcmVxdWlyZSgnLi4vc3RhdHMnKS5jb3VudC5kaXN0aW5jdDtcbiAgY3RyLnByb3RvdHlwZS5pc1ZhbGlkID0gdXRpbC5pc1ZhbGlkO1xuICBjdHIuZmllbGRzID0gYWdnLm1hcCh1dGlsLiQoJ291dCcpKTtcbiAgcmV0dXJuIGN0cjtcbn1cblxudHlwZXMuY3JlYXRlID0gY3JlYXRlO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlcztcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHRpbWUgPSByZXF1aXJlKCcuLi90aW1lJyksXG4gICAgRVBTSUxPTiA9IDFlLTE1O1xuXG5mdW5jdGlvbiBiaW5zKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgYmlubmluZyBvcHRpb25zLlwiKTsgfVxuXG4gIC8vIGRldGVybWluZSByYW5nZVxuICB2YXIgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDE1LFxuICAgICAgYmFzZSA9IG9wdC5iYXNlIHx8IDEwLFxuICAgICAgbG9nYiA9IE1hdGgubG9nKGJhc2UpLFxuICAgICAgZGl2ID0gb3B0LmRpdiB8fCBbNSwgMl0sXG4gICAgICBtaW4gPSBvcHQubWluLFxuICAgICAgbWF4ID0gb3B0Lm1heCxcbiAgICAgIHNwYW4gPSBtYXggLSBtaW4sXG4gICAgICBzdGVwLCBsZXZlbCwgbWluc3RlcCwgcHJlY2lzaW9uLCB2LCBpLCBlcHM7XG5cbiAgaWYgKG9wdC5zdGVwKSB7XG4gICAgLy8gaWYgc3RlcCBzaXplIGlzIGV4cGxpY2l0bHkgZ2l2ZW4sIHVzZSB0aGF0XG4gICAgc3RlcCA9IG9wdC5zdGVwO1xuICB9IGVsc2UgaWYgKG9wdC5zdGVwcykge1xuICAgIC8vIGlmIHByb3ZpZGVkLCBsaW1pdCBjaG9pY2UgdG8gYWNjZXB0YWJsZSBzdGVwIHNpemVzXG4gICAgc3RlcCA9IG9wdC5zdGVwc1tNYXRoLm1pbihcbiAgICAgIG9wdC5zdGVwcy5sZW5ndGggLSAxLFxuICAgICAgYmlzZWN0KG9wdC5zdGVwcywgc3Bhbi9tYXhiLCAwLCBvcHQuc3RlcHMubGVuZ3RoKVxuICAgICldO1xuICB9IGVsc2Uge1xuICAgIC8vIGVsc2UgdXNlIHNwYW4gdG8gZGV0ZXJtaW5lIHN0ZXAgc2l6ZVxuICAgIGxldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nKG1heGIpIC8gbG9nYik7XG4gICAgbWluc3RlcCA9IG9wdC5taW5zdGVwIHx8IDA7XG4gICAgc3RlcCA9IE1hdGgubWF4KFxuICAgICAgbWluc3RlcCxcbiAgICAgIE1hdGgucG93KGJhc2UsIE1hdGgucm91bmQoTWF0aC5sb2coc3BhbikgLyBsb2diKSAtIGxldmVsKVxuICAgICk7XG5cbiAgICAvLyBpbmNyZWFzZSBzdGVwIHNpemUgaWYgdG9vIG1hbnkgYmluc1xuICAgIGRvIHsgc3RlcCAqPSBiYXNlOyB9IHdoaWxlIChNYXRoLmNlaWwoc3Bhbi9zdGVwKSA+IG1heGIpO1xuXG4gICAgLy8gZGVjcmVhc2Ugc3RlcCBzaXplIGlmIGFsbG93ZWRcbiAgICBmb3IgKGk9MDsgaTxkaXYubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBzdGVwIC8gZGl2W2ldO1xuICAgICAgaWYgKHYgPj0gbWluc3RlcCAmJiBzcGFuIC8gdiA8PSBtYXhiKSBzdGVwID0gdjtcbiAgICB9XG4gIH1cblxuICAvLyB1cGRhdGUgcHJlY2lzaW9uLCBtaW4gYW5kIG1heFxuICB2ID0gTWF0aC5sb2coc3RlcCk7XG4gIHByZWNpc2lvbiA9IHYgPj0gMCA/IDAgOiB+figtdiAvIGxvZ2IpICsgMTtcbiAgZXBzID0gTWF0aC5wb3coYmFzZSwgLXByZWNpc2lvbiAtIDEpO1xuICBtaW4gPSBNYXRoLm1pbihtaW4sIE1hdGguZmxvb3IobWluIC8gc3RlcCArIGVwcykgKiBzdGVwKTtcbiAgbWF4ID0gTWF0aC5jZWlsKG1heCAvIHN0ZXApICogc3RlcDtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBtaW4sXG4gICAgc3RvcDogIG1heCxcbiAgICBzdGVwOiAgc3RlcCxcbiAgICB1bml0OiAge3ByZWNpc2lvbjogcHJlY2lzaW9ufSxcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpc2VjdChhLCB4LCBsbywgaGkpIHtcbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICBpZiAodXRpbC5jbXAoYVttaWRdLCB4KSA8IDApIHsgbG8gPSBtaWQgKyAxOyB9XG4gICAgZWxzZSB7IGhpID0gbWlkOyB9XG4gIH1cbiAgcmV0dXJuIGxvO1xufVxuXG5mdW5jdGlvbiB2YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnN0ZXAgKiBNYXRoLmZsb29yKHYgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gaW5kZXgodikge1xuICByZXR1cm4gTWF0aC5mbG9vcigodiAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwICsgRVBTSUxPTik7XG59XG5cbmZ1bmN0aW9uIGRhdGVfdmFsdWUodikge1xuICByZXR1cm4gdGhpcy51bml0LmRhdGUodmFsdWUuY2FsbCh0aGlzLCB2KSk7XG59XG5cbmZ1bmN0aW9uIGRhdGVfaW5kZXgodikge1xuICByZXR1cm4gaW5kZXguY2FsbCh0aGlzLCB0aGlzLnVuaXQudW5pdCh2KSk7XG59XG5cbmJpbnMuZGF0ZSA9IGZ1bmN0aW9uKG9wdCkge1xuICBpZiAoIW9wdCkgeyB0aHJvdyBFcnJvcihcIk1pc3NpbmcgZGF0ZSBiaW5uaW5nIG9wdGlvbnMuXCIpOyB9XG5cbiAgLy8gZmluZCB0aW1lIHN0ZXAsIHRoZW4gYmluXG4gIHZhciB1bml0cyA9IG9wdC51dGMgPyB0aW1lLnV0YyA6IHRpbWUsXG4gICAgICBkbWluID0gb3B0Lm1pbixcbiAgICAgIGRtYXggPSBvcHQubWF4LFxuICAgICAgbWF4YiA9IG9wdC5tYXhiaW5zIHx8IDIwLFxuICAgICAgbWluYiA9IG9wdC5taW5iaW5zIHx8IDQsXG4gICAgICBzcGFuID0gKCtkbWF4KSAtICgrZG1pbiksXG4gICAgICB1bml0ID0gb3B0LnVuaXQgPyB1bml0c1tvcHQudW5pdF0gOiB1bml0cy5maW5kKHNwYW4sIG1pbmIsIG1heGIpLFxuICAgICAgc3BlYyA9IGJpbnMoe1xuICAgICAgICBtaW46ICAgICB1bml0Lm1pbiAhPSBudWxsID8gdW5pdC5taW4gOiB1bml0LnVuaXQoZG1pbiksXG4gICAgICAgIG1heDogICAgIHVuaXQubWF4ICE9IG51bGwgPyB1bml0Lm1heCA6IHVuaXQudW5pdChkbWF4KSxcbiAgICAgICAgbWF4YmluczogbWF4YixcbiAgICAgICAgbWluc3RlcDogdW5pdC5taW5zdGVwLFxuICAgICAgICBzdGVwczogICB1bml0LnN0ZXBcbiAgICAgIH0pO1xuXG4gIHNwZWMudW5pdCA9IHVuaXQ7XG4gIHNwZWMuaW5kZXggPSBkYXRlX2luZGV4O1xuICBpZiAoIW9wdC5yYXcpIHNwZWMudmFsdWUgPSBkYXRlX3ZhbHVlO1xuICByZXR1cm4gc3BlYztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmlucztcbiIsInZhciBiaW5zID0gcmVxdWlyZSgnLi9iaW5zJyksXG4gICAgZ2VuICA9IHJlcXVpcmUoJy4uL2dlbmVyYXRlJyksXG4gICAgdHlwZSA9IHJlcXVpcmUoJy4uL2ltcG9ydC90eXBlJyksXG4gICAgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICBzdGF0cyA9IHJlcXVpcmUoJy4uL3N0YXRzJyk7XG5cbnZhciBxdHlwZSA9IHtcbiAgJ2ludGVnZXInOiAxLFxuICAnbnVtYmVyJzogMSxcbiAgJ2RhdGUnOiAxXG59O1xuXG5mdW5jdGlvbiAkYmluKHZhbHVlcywgZiwgb3B0KSB7XG4gIG9wdCA9IG9wdGlvbnModmFsdWVzLCBmLCBvcHQpO1xuICB2YXIgYiA9IHNwZWMob3B0KTtcbiAgcmV0dXJuICFiID8gKG9wdC5hY2Nlc3NvciB8fCB1dGlsLmlkZW50aXR5KSA6XG4gICAgdXRpbC4kZnVuYygnYmluJywgYi51bml0LnVuaXQgP1xuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gYi52YWx1ZShiLnVuaXQudW5pdCh4KSk7IH0gOlxuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gYi52YWx1ZSh4KTsgfVxuICAgICkob3B0LmFjY2Vzc29yKTtcbn1cblxuZnVuY3Rpb24gaGlzdG9ncmFtKHZhbHVlcywgZiwgb3B0KSB7XG4gIG9wdCA9IG9wdGlvbnModmFsdWVzLCBmLCBvcHQpO1xuICB2YXIgYiA9IHNwZWMob3B0KTtcbiAgcmV0dXJuIGIgP1xuICAgIG51bWVyaWNhbCh2YWx1ZXMsIG9wdC5hY2Nlc3NvciwgYikgOlxuICAgIGNhdGVnb3JpY2FsKHZhbHVlcywgb3B0LmFjY2Vzc29yLCBvcHQgJiYgb3B0LnNvcnQpO1xufVxuXG5mdW5jdGlvbiBzcGVjKG9wdCkge1xuICB2YXIgdCA9IG9wdC50eXBlLCBiID0gbnVsbDtcbiAgaWYgKHQgPT0gbnVsbCB8fCBxdHlwZVt0XSkge1xuICAgIGlmICh0ID09PSAnaW50ZWdlcicgJiYgb3B0Lm1pbnN0ZXAgPT0gbnVsbCkgb3B0Lm1pbnN0ZXAgPSAxO1xuICAgIGIgPSAodCA9PT0gJ2RhdGUnKSA/IGJpbnMuZGF0ZShvcHQpIDogYmlucyhvcHQpO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG5mdW5jdGlvbiBvcHRpb25zKCkge1xuICB2YXIgYSA9IGFyZ3VtZW50cyxcbiAgICAgIGkgPSAwLFxuICAgICAgdmFsdWVzID0gdXRpbC5pc0FycmF5KGFbaV0pID8gYVtpKytdIDogbnVsbCxcbiAgICAgIGYgPSB1dGlsLmlzRnVuY3Rpb24oYVtpXSkgfHwgdXRpbC5pc1N0cmluZyhhW2ldKSA/IHV0aWwuJChhW2krK10pIDogbnVsbCxcbiAgICAgIG9wdCA9IHV0aWwuZXh0ZW5kKHt9LCBhW2ldKTtcblxuICBpZiAodmFsdWVzKSB7XG4gICAgb3B0LnR5cGUgPSBvcHQudHlwZSB8fCB0eXBlKHZhbHVlcywgZik7XG4gICAgaWYgKHF0eXBlW29wdC50eXBlXSkge1xuICAgICAgdmFyIGV4dCA9IHN0YXRzLmV4dGVudCh2YWx1ZXMsIGYpO1xuICAgICAgb3B0ID0gdXRpbC5leHRlbmQoe21pbjogZXh0WzBdLCBtYXg6IGV4dFsxXX0sIG9wdCk7XG4gICAgfVxuICB9XG4gIGlmIChmKSB7IG9wdC5hY2Nlc3NvciA9IGY7IH1cbiAgcmV0dXJuIG9wdDtcbn1cblxuZnVuY3Rpb24gbnVtZXJpY2FsKHZhbHVlcywgZiwgYikge1xuICB2YXIgaCA9IGdlbi5yYW5nZShiLnN0YXJ0LCBiLnN0b3AgKyBiLnN0ZXAvMiwgYi5zdGVwKVxuICAgIC5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4ge3ZhbHVlOiBiLnZhbHVlKHYpLCBjb3VudDogMH07IH0pO1xuXG4gIGZvciAodmFyIGk9MCwgdiwgajsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBqID0gYi5pbmRleCh2KTtcbiAgICAgIGlmIChqIDwgMCB8fCBqID49IGgubGVuZ3RoIHx8ICFpc0Zpbml0ZShqKSkgY29udGludWU7XG4gICAgICBoW2pdLmNvdW50ICs9IDE7XG4gICAgfVxuICB9XG4gIGguYmlucyA9IGI7XG4gIHJldHVybiBoO1xufVxuXG5mdW5jdGlvbiBjYXRlZ29yaWNhbCh2YWx1ZXMsIGYsIHNvcnQpIHtcbiAgdmFyIHUgPSBzdGF0cy51bmlxdWUodmFsdWVzLCBmKSxcbiAgICAgIGMgPSBzdGF0cy5jb3VudC5tYXAodmFsdWVzLCBmKTtcbiAgcmV0dXJuIHUubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIHt2YWx1ZTogaywgY291bnQ6IGNba119OyB9KVxuICAgIC5zb3J0KHV0aWwuY29tcGFyYXRvcihzb3J0ID8gJy1jb3VudCcgOiAnK3ZhbHVlJykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJGJpbjogJGJpbixcbiAgaGlzdG9ncmFtOiBoaXN0b2dyYW1cbn07XG4iLCJ2YXIgZDNfdGltZSA9IHJlcXVpcmUoJ2QzLXRpbWUnKSxcbiAgICBkM190aW1lRiA9IHJlcXVpcmUoJ2QzLXRpbWUtZm9ybWF0JyksXG4gICAgZDNfbnVtYmVyRiA9IHJlcXVpcmUoJ2QzLWZvcm1hdCcpLFxuICAgIG51bWJlckYgPSBkM19udW1iZXJGLCAvLyBkZWZhdWx0cyB0byBFTi1VU1xuICAgIHRpbWVGID0gZDNfdGltZUY7ICAgICAvLyBkZWZhdWx0cyB0byBFTi1VU1xuXG5mdW5jdGlvbiBudW1iZXJMb2NhbGUobCkge1xuICB2YXIgZiA9IGQzX251bWJlckYubG9jYWxlRm9ybWF0KGwpO1xuICBpZiAoZiA9PSBudWxsKSB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIGxvY2FsZTogJyArIGwpO1xuICBudW1iZXJGID0gZjtcbn1cblxuZnVuY3Rpb24gdGltZUxvY2FsZShsKSB7XG4gIHZhciBmID0gZDNfdGltZUYubG9jYWxlRm9ybWF0KGwpO1xuICBpZiAoZiA9PSBudWxsKSB0aHJvdyBFcnJvcignVW5yZWNvZ25pemVkIGxvY2FsZTogJyArIGwpO1xuICB0aW1lRiA9IGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBVcGRhdGUgbnVtYmVyIGZvcm1hdHRlciB0byB1c2UgcHJvdmlkZWQgbG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gIC8vIEZvciBtb3JlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0XG4gIG51bWJlckxvY2FsZTogbnVtYmVyTG9jYWxlLFxuICBudW1iZXI6ICAgICAgIGZ1bmN0aW9uKGYpIHsgcmV0dXJuIG51bWJlckYuZm9ybWF0KGYpOyB9LFxuICBudW1iZXJQcmVmaXg6IGZ1bmN0aW9uKGYsIHYpIHsgcmV0dXJuIG51bWJlckYuZm9ybWF0UHJlZml4KGYsIHYpOyB9LFxuXG4gIC8vIFVwZGF0ZSB0aW1lIGZvcm1hdHRlciB0byB1c2UgcHJvdmlkZWQgbG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gIC8vIEZvciBtb3JlIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdGltZS1mb3JtYXRcbiAgdGltZUxvY2FsZTogICB0aW1lTG9jYWxlLFxuICB0aW1lOiAgICAgICAgIGZ1bmN0aW9uKGYpIHsgcmV0dXJuIHRpbWVGLmZvcm1hdChmKTsgfSxcbiAgdXRjOiAgICAgICAgICBmdW5jdGlvbihmKSB7IHJldHVybiB0aW1lRi51dGNGb3JtYXQoZik7IH0sXG5cbiAgLy8gU2V0IG51bWJlciBhbmQgdGltZSBsb2NhbGUgc2ltdWx0YW5lb3VzbHkuXG4gIGxvY2FsZTogICAgICAgZnVuY3Rpb24obCkgeyBudW1iZXJMb2NhbGUobCk7IHRpbWVMb2NhbGUobCk7IH0sXG5cbiAgLy8gYXV0b21hdGljIGZvcm1hdHRpbmcgZnVuY3Rpb25zXG4gIGF1dG86IHtcbiAgICBudW1iZXI6ICAgbnVtYmVyQXV0b0Zvcm1hdCxcbiAgICB0aW1lOiAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aW1lQXV0b0Zvcm1hdCgpOyB9LFxuICAgIHV0YzogICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHV0Y0F1dG9Gb3JtYXQoKTsgfVxuICB9XG59O1xuXG52YXIgZTEwID0gTWF0aC5zcXJ0KDUwKSxcbiAgICBlNSA9IE1hdGguc3FydCgxMCksXG4gICAgZTIgPSBNYXRoLnNxcnQoMik7XG5cbmZ1bmN0aW9uIGludGVydmFscyhkb21haW4sIGNvdW50KSB7XG4gIGlmICghZG9tYWluLmxlbmd0aCkgZG9tYWluID0gWzBdO1xuICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcblxuICB2YXIgc3RhcnQgPSBkb21haW5bMF0sXG4gICAgICBzdG9wID0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXTtcblxuICBpZiAoc3RvcCA8IHN0YXJ0KSB7IGVycm9yID0gc3RvcDsgc3RvcCA9IHN0YXJ0OyBzdGFydCA9IGVycm9yOyB9XG5cbiAgdmFyIHNwYW4gPSAoc3RvcCAtIHN0YXJ0KSB8fCAoY291bnQgPSAxLCBzdGFydCB8fCBzdG9wIHx8IDEpLFxuICAgICAgc3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHNwYW4gLyBjb3VudCkgLyBNYXRoLkxOMTApKSxcbiAgICAgIGVycm9yID0gc3BhbiAvIGNvdW50IC8gc3RlcDtcblxuICAvLyBGaWx0ZXIgdGlja3MgdG8gZ2V0IGNsb3NlciB0byB0aGUgZGVzaXJlZCBjb3VudC5cbiAgaWYgKGVycm9yID49IGUxMCkgc3RlcCAqPSAxMDtcbiAgZWxzZSBpZiAoZXJyb3IgPj0gZTUpIHN0ZXAgKj0gNTtcbiAgZWxzZSBpZiAoZXJyb3IgPj0gZTIpIHN0ZXAgKj0gMjtcblxuICAvLyBSb3VuZCBzdGFydCBhbmQgc3RvcCB2YWx1ZXMgdG8gc3RlcCBpbnRlcnZhbC5cbiAgcmV0dXJuIFtcbiAgICBNYXRoLmNlaWwoc3RhcnQgLyBzdGVwKSAqIHN0ZXAsXG4gICAgTWF0aC5mbG9vcihzdG9wIC8gc3RlcCkgKiBzdGVwICsgc3RlcCAvIDIsIC8vIGluY2x1c2l2ZVxuICAgIHN0ZXBcbiAgXTtcbn1cblxuZnVuY3Rpb24gc2lnbmlmaWNhbnREaWdpdHMoZG9tYWluKSB7XG4gIHJldHVybiBkb21haW4ubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAvLyBkZXRlcm1pbmUgc2lnbmlmaWNhbnQgZGlnaXRzIGJhc2VkIG9uIGV4cG9uZW50aWFsIGZvcm1hdFxuICAgIHZhciBzID0geC50b0V4cG9uZW50aWFsKCksXG4gICAgICAgIGUgPSBzLmluZGV4T2YoJ2UnKSxcbiAgICAgICAgZCA9IHMuaW5kZXhPZignLicpO1xuICAgIHJldHVybiBkIDwgMCA/IDEgOiAoZS1kKTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uKG1heCwgcCkge1xuICAgIC8vIHJldHVybiB0aGUgbWF4aW11bSBzaWcgZGlnaXQgY291bnRcbiAgICByZXR1cm4gTWF0aC5tYXgobWF4LCBwKTtcbiAgfSwgMCk7XG59XG5cbmZ1bmN0aW9uIG51bWJlckF1dG9Gb3JtYXQoZG9tYWluLCBjb3VudCwgZikge1xuICB2YXIgcmFuZ2UgPSBpbnRlcnZhbHMoZG9tYWluLCBjb3VudCk7XG4gIGlmIChmID09IG51bGwpIHtcbiAgICBmID0gJywuJyArIGQzX251bWJlckYucHJlY2lzaW9uRml4ZWQocmFuZ2VbMl0pICsgJ2YnO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAoZiA9IGQzX251bWJlckYuZm9ybWF0U3BlY2lmaWVyKGYpLCBmLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3MnOiB7XG4gICAgICAgIGlmIChmLnByZWNpc2lvbiA9PSBudWxsKSBmLnByZWNpc2lvbiA9IHNpZ25pZmljYW50RGlnaXRzKGRvbWFpbik7XG4gICAgICAgIHJldHVybiBudW1iZXJGLmZvcm1hdChmKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJyc6XG4gICAgICBjYXNlICdlJzpcbiAgICAgIGNhc2UgJ2cnOlxuICAgICAgY2FzZSAncCc6XG4gICAgICBjYXNlICdyJzoge1xuICAgICAgICBpZiAoZi5wcmVjaXNpb24gPT0gbnVsbCkgZi5wcmVjaXNpb24gPSBkM19udW1iZXJGLnByZWNpc2lvblJvdW5kKHJhbmdlWzJdLCBNYXRoLm1heChNYXRoLmFicyhyYW5nZVswXSksIE1hdGguYWJzKHJhbmdlWzFdKSkpIC0gKGYudHlwZSA9PT0gJ2UnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmJzpcbiAgICAgIGNhc2UgJyUnOiB7XG4gICAgICAgIGlmIChmLnByZWNpc2lvbiA9PSBudWxsKSBmLnByZWNpc2lvbiA9IGQzX251bWJlckYucHJlY2lzaW9uRml4ZWQocmFuZ2VbMl0pIC0gKGYudHlwZSA9PT0gJyUnKSAqIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyRi5mb3JtYXQoZik7XG59XG5cbmZ1bmN0aW9uIHRpbWVBdXRvRm9ybWF0KCkge1xuICB2YXIgZiA9IHRpbWVGLmZvcm1hdCxcbiAgICAgIGZvcm1hdE1pbGxpc2Vjb25kID0gZignLiVMJyksXG4gICAgICBmb3JtYXRTZWNvbmQgPSBmKCc6JVMnKSxcbiAgICAgIGZvcm1hdE1pbnV0ZSA9IGYoJyVJOiVNJyksXG4gICAgICBmb3JtYXRIb3VyID0gZignJUkgJXAnKSxcbiAgICAgIGZvcm1hdERheSA9IGYoJyVhICVkJyksXG4gICAgICBmb3JtYXRXZWVrID0gZignJWIgJWQnKSxcbiAgICAgIGZvcm1hdE1vbnRoID0gZignJUInKSxcbiAgICAgIGZvcm1hdFllYXIgPSBmKCclWScpO1xuXG4gIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGQgPSArZGF0ZTtcbiAgICByZXR1cm4gKGQzX3RpbWUuc2Vjb25kKGRhdGUpIDwgZCA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgIDogZDNfdGltZS5taW51dGUoZGF0ZSkgPCBkID8gZm9ybWF0U2Vjb25kXG4gICAgICAgIDogZDNfdGltZS5ob3VyKGRhdGUpIDwgZCA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICA6IGQzX3RpbWUuZGF5KGRhdGUpIDwgZCA/IGZvcm1hdEhvdXJcbiAgICAgICAgOiBkM190aW1lLm1vbnRoKGRhdGUpIDwgZCA/XG4gICAgICAgICAgKGQzX3RpbWUud2VlayhkYXRlKSA8IGQgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICA6IGQzX3RpbWUueWVhcihkYXRlKSA8IGQgPyBmb3JtYXRNb250aFxuICAgICAgICA6IGZvcm1hdFllYXIpKGRhdGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1dGNBdXRvRm9ybWF0KCkge1xuICB2YXIgZiA9IHRpbWVGLnV0Y0Zvcm1hdCxcbiAgICAgIGZvcm1hdE1pbGxpc2Vjb25kID0gZignLiVMJyksXG4gICAgICBmb3JtYXRTZWNvbmQgPSBmKCc6JVMnKSxcbiAgICAgIGZvcm1hdE1pbnV0ZSA9IGYoJyVJOiVNJyksXG4gICAgICBmb3JtYXRIb3VyID0gZignJUkgJXAnKSxcbiAgICAgIGZvcm1hdERheSA9IGYoJyVhICVkJyksXG4gICAgICBmb3JtYXRXZWVrID0gZignJWIgJWQnKSxcbiAgICAgIGZvcm1hdE1vbnRoID0gZignJUInKSxcbiAgICAgIGZvcm1hdFllYXIgPSBmKCclWScpO1xuXG4gIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGQgPSArZGF0ZTtcbiAgICByZXR1cm4gKGQzX3RpbWUudXRjU2Vjb25kKGRhdGUpIDwgZCA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgIDogZDNfdGltZS51dGNNaW51dGUoZGF0ZSkgPCBkID8gZm9ybWF0U2Vjb25kXG4gICAgICAgIDogZDNfdGltZS51dGNIb3VyKGRhdGUpIDwgZCA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICA6IGQzX3RpbWUudXRjRGF5KGRhdGUpIDwgZCA/IGZvcm1hdEhvdXJcbiAgICAgICAgOiBkM190aW1lLnV0Y01vbnRoKGRhdGUpIDwgZCA/XG4gICAgICAgICAgKGQzX3RpbWUudXRjV2VlayhkYXRlKSA8IGQgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICA6IGQzX3RpbWUudXRjWWVhcihkYXRlKSA8IGQgPyBmb3JtYXRNb250aFxuICAgICAgICA6IGZvcm1hdFllYXIpKGRhdGUpO1xuICB9O1xufVxuIiwidmFyIGdlbiA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbmdlbi5yZXBlYXQgPSBmdW5jdGlvbih2YWwsIG4pIHtcbiAgdmFyIGEgPSBBcnJheShuKSwgaTtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSBhW2ldID0gdmFsO1xuICByZXR1cm4gYTtcbn07XG5cbmdlbi56ZXJvcyA9IGZ1bmN0aW9uKG4pIHtcbiAgcmV0dXJuIGdlbi5yZXBlYXQoMCwgbik7XG59O1xuXG5nZW4ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICBzdGVwID0gMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gIH1cbiAgaWYgKChzdG9wIC0gc3RhcnQpIC8gc3RlcCA9PSBJbmZpbml0eSkgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSByYW5nZScpO1xuICB2YXIgcmFuZ2UgPSBbXSwgaSA9IC0xLCBqO1xuICBpZiAoc3RlcCA8IDApIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPiBzdG9wKSByYW5nZS5wdXNoKGopO1xuICBlbHNlIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPCBzdG9wKSByYW5nZS5wdXNoKGopO1xuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5nZW4ucmFuZG9tID0ge307XG5cbmdlbi5yYW5kb20udW5pZm9ybSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgIG1heCA9IG1pbiA9PT0gdW5kZWZpbmVkID8gMSA6IG1pbjtcbiAgICBtaW4gPSAwO1xuICB9XG4gIHZhciBkID0gbWF4IC0gbWluO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtaW4gKyBkICogTWF0aC5yYW5kb20oKTtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikgeyByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTsgfTtcbiAgcmV0dXJuIGY7XG59O1xuXG5nZW4ucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICBiID0gYTtcbiAgICBhID0gMDtcbiAgfVxuICB2YXIgZCA9IGIgLSBhO1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihkICogTWF0aC5yYW5kb20oKSk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7IH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5ub3JtYWwgPSBmdW5jdGlvbihtZWFuLCBzdGRldikge1xuICBtZWFuID0gbWVhbiB8fCAwO1xuICBzdGRldiA9IHN0ZGV2IHx8IDE7XG4gIHZhciBuZXh0O1xuICB2YXIgZiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gMCwgeSA9IDAsIHJkcywgYztcbiAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4ID0gbmV4dDtcbiAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgZG8ge1xuICAgICAgeCA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkqMi0xO1xuICAgICAgcmRzID0geCp4ICsgeSp5O1xuICAgIH0gd2hpbGUgKHJkcyA9PT0gMCB8fCByZHMgPiAxKTtcbiAgICBjID0gTWF0aC5zcXJ0KC0yKk1hdGgubG9nKHJkcykvcmRzKTsgLy8gQm94LU11bGxlciB0cmFuc2Zvcm1cbiAgICBuZXh0ID0gbWVhbiArIHkqYypzdGRldjtcbiAgICByZXR1cm4gbWVhbiArIHgqYypzdGRldjtcbiAgfTtcbiAgZi5zYW1wbGVzID0gZnVuY3Rpb24obikgeyByZXR1cm4gZ2VuLnplcm9zKG4pLm1hcChmKTsgfTtcbiAgcmV0dXJuIGY7XG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG52YXIgZDNfZHN2ID0gcmVxdWlyZSgnZDMtZHN2Jyk7XG5cbmZ1bmN0aW9uIGRzdihkYXRhLCBmb3JtYXQpIHtcbiAgaWYgKGRhdGEpIHtcbiAgICB2YXIgaCA9IGZvcm1hdC5oZWFkZXI7XG4gICAgZGF0YSA9IChoID8gaC5qb2luKGZvcm1hdC5kZWxpbWl0ZXIpICsgJ1xcbicgOiAnJykgKyBkYXRhO1xuICB9XG4gIHJldHVybiBkM19kc3YuZHN2KGZvcm1hdC5kZWxpbWl0ZXIpLnBhcnNlKGRhdGEpO1xufVxuXG5kc3YuZGVsaW1pdGVyID0gZnVuY3Rpb24oZGVsaW0pIHtcbiAgdmFyIGZtdCA9IHtkZWxpbWl0ZXI6IGRlbGltfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEsIGZvcm1hdCkge1xuICAgIHJldHVybiBkc3YoZGF0YSwgZm9ybWF0ID8gdXRpbC5leHRlbmQoZm9ybWF0LCBmbXQpIDogZm10KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZHN2O1xuIiwidmFyIGRzdiA9IHJlcXVpcmUoJy4vZHN2Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBqc29uOiByZXF1aXJlKCcuL2pzb24nKSxcbiAgdG9wb2pzb246IHJlcXVpcmUoJy4vdG9wb2pzb24nKSxcbiAgdHJlZWpzb246IHJlcXVpcmUoJy4vdHJlZWpzb24nKSxcbiAgZHN2OiBkc3YsXG4gIGNzdjogZHN2LmRlbGltaXRlcignLCcpLFxuICB0c3Y6IGRzdi5kZWxpbWl0ZXIoJ1xcdCcpXG59O1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciBkID0gdXRpbC5pc09iamVjdChkYXRhKSAmJiAhdXRpbC5pc0J1ZmZlcihkYXRhKSA/XG4gICAgZGF0YSA6IEpTT04ucGFyc2UoZGF0YSk7XG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LnByb3BlcnR5KSB7XG4gICAgZCA9IHV0aWwuYWNjZXNzb3IoZm9ybWF0LnByb3BlcnR5KShkKTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG4iLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xuXG52YXIgcmVhZGVyID0gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gIHZhciB0b3BvanNvbiA9IHJlYWRlci50b3BvanNvbjtcbiAgaWYgKHRvcG9qc29uID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ1RvcG9KU09OIGxpYnJhcnkgbm90IGxvYWRlZC4nKTsgfVxuXG4gIHZhciB0ID0ganNvbihkYXRhLCBmb3JtYXQpLCBvYmo7XG5cbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQuZmVhdHVyZSkge1xuICAgIGlmICgob2JqID0gdC5vYmplY3RzW2Zvcm1hdC5mZWF0dXJlXSkpIHtcbiAgICAgIHJldHVybiB0b3BvanNvbi5mZWF0dXJlKHQsIG9iaikuZmVhdHVyZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIFRvcG9KU09OIG9iamVjdDogJyArIGZvcm1hdC5mZWF0dXJlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybWF0ICYmIGZvcm1hdC5tZXNoKSB7XG4gICAgaWYgKChvYmogPSB0Lm9iamVjdHNbZm9ybWF0Lm1lc2hdKSkge1xuICAgICAgcmV0dXJuIFt0b3BvanNvbi5tZXNoKHQsIHQub2JqZWN0c1tmb3JtYXQubWVzaF0pXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVG9wb0pTT04gb2JqZWN0OiAnICsgZm9ybWF0Lm1lc2gpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignTWlzc2luZyBUb3BvSlNPTiBmZWF0dXJlIG9yIG1lc2ggcGFyYW1ldGVyLicpO1xuICB9XG59O1xuXG5yZWFkZXIudG9wb2pzb24gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sndG9wb2pzb24nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ3RvcG9qc29uJ10gOiBudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gcmVhZGVyO1xuIiwidmFyIGpzb24gPSByZXF1aXJlKCcuL2pzb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0cmVlLCBmb3JtYXQpIHtcbiAgcmV0dXJuIHRvVGFibGUoanNvbih0cmVlLCBmb3JtYXQpLCBmb3JtYXQpO1xufTtcblxuZnVuY3Rpb24gdG9UYWJsZShyb290LCBmaWVsZHMpIHtcbiAgdmFyIGNoaWxkcmVuRmllbGQgPSBmaWVsZHMgJiYgZmllbGRzLmNoaWxkcmVuIHx8ICdjaGlsZHJlbicsXG4gICAgICBwYXJlbnRGaWVsZCA9IGZpZWxkcyAmJiBmaWVsZHMucGFyZW50IHx8ICdfcGFyZW50JyxcbiAgICAgIHRhYmxlID0gW107XG5cbiAgZnVuY3Rpb24gdmlzaXQobm9kZSwgcGFyZW50KSB7XG4gICAgbm9kZVtwYXJlbnRGaWVsZF0gPSBwYXJlbnQ7XG4gICAgdGFibGUucHVzaChub2RlKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlW2NoaWxkcmVuRmllbGRdO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZpc2l0KGNoaWxkcmVuW2ldLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aXNpdChyb290LCBudWxsKTtcbiAgcmV0dXJuICh0YWJsZS5yb290ID0gcm9vdCwgdGFibGUpO1xufVxuIiwiLy8gTWF0Y2hlcyBhYnNvbHV0ZSBVUkxzIHdpdGggb3B0aW9uYWwgcHJvdG9jb2xcbi8vICAgaHR0cHM6Ly8uLi4gICAgZmlsZTovLy4uLiAgICAvLy4uLlxudmFyIHByb3RvY29sX3JlID0gL14oW0EtWmEtel0rOik/XFwvXFwvLztcblxuLy8gU3BlY2lhbCB0cmVhdG1lbnQgaW4gbm9kZS5qcyBmb3IgdGhlIGZpbGU6IHByb3RvY29sXG52YXIgZmlsZVByb3RvY29sID0gJ2ZpbGU6Ly8nO1xuXG4vLyBWYWxpZGF0ZSBhbmQgY2xlYW51cCBVUkwgdG8gZW5zdXJlIHRoYXQgaXQgaXMgYWxsb3dlZCB0byBiZSBhY2Nlc3NlZFxuLy8gUmV0dXJucyBjbGVhbmVkIHVwIFVSTCwgb3IgZmFsc2UgaWYgYWNjZXNzIGlzIG5vdCBhbGxvd2VkXG5mdW5jdGlvbiBzYW5pdGl6ZVVybChvcHQpIHtcbiAgdmFyIHVybCA9IG9wdC51cmw7XG4gIGlmICghdXJsICYmIG9wdC5maWxlKSB7IHJldHVybiBmaWxlUHJvdG9jb2wgKyBvcHQuZmlsZTsgfVxuXG4gIC8vIEluIGNhc2UgdGhpcyBpcyBhIHJlbGF0aXZlIHVybCAoaGFzIG5vIGhvc3QpLCBwcmVwZW5kIG9wdC5iYXNlVVJMXG4gIGlmIChvcHQuYmFzZVVSTCAmJiAhcHJvdG9jb2xfcmUudGVzdCh1cmwpKSB7XG4gICAgaWYgKCFzdGFydHNXaXRoKHVybCwgJy8nKSAmJiBvcHQuYmFzZVVSTFtvcHQuYmFzZVVSTC5sZW5ndGgtMV0gIT09ICcvJykge1xuICAgICAgdXJsID0gJy8nICsgdXJsOyAvLyBFbnN1cmUgdGhhdCB0aGVyZSBpcyBhIHNsYXNoIGJldHdlZW4gdGhlIGJhc2VVUkwgKGUuZy4gaG9zdG5hbWUpIGFuZCB1cmxcbiAgICB9XG4gICAgdXJsID0gb3B0LmJhc2VVUkwgKyB1cmw7XG4gIH1cbiAgLy8gcmVsYXRpdmUgcHJvdG9jb2wsIHN0YXJ0cyB3aXRoICcvLydcbiAgaWYgKCFsb2FkLnVzZVhIUiAmJiBzdGFydHNXaXRoKHVybCwgJy8vJykpIHtcbiAgICB1cmwgPSAob3B0LmRlZmF1bHRQcm90b2NvbCB8fCAnaHR0cCcpICsgJzonICsgdXJsO1xuICB9XG4gIC8vIElmIG9wdC5kb21haW5XaGl0ZUxpc3QgaXMgc2V0LCBvbmx5IGFsbG93cyB1cmwsIHdob3NlIGhvc3RuYW1lXG4gIC8vICogSXMgdGhlIHNhbWUgYXMgdGhlIG9yaWdpbiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKVxuICAvLyAqIEVxdWFscyBvbmUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgd2hpdGVsaXN0XG4gIC8vICogSXMgYSBwcm9wZXIgc3ViZG9tYWluIG9mIG9uZSBvZiB0aGUgdmFsdWVzIGluIHRoZSB3aGl0ZWxpc3RcbiAgaWYgKG9wdC5kb21haW5XaGl0ZUxpc3QpIHtcbiAgICB2YXIgZG9tYWluLCBvcmlnaW47XG4gICAgaWYgKGxvYWQudXNlWEhSKSB7XG4gICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgIC8vIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MzY1MTMvaG93LWRvLWktcGFyc2UtYS11cmwtaW50by1ob3N0bmFtZS1hbmQtcGF0aC1pbi1qYXZhc2NyaXB0XG4gICAgICAvLyBJRSBkb2Vzbid0IHBvcHVsYXRlIGFsbCBsaW5rIHByb3BlcnRpZXMgd2hlbiBzZXR0aW5nIC5ocmVmIHdpdGggYSByZWxhdGl2ZSBVUkwsXG4gICAgICAvLyBob3dldmVyIC5ocmVmIHdpbGwgcmV0dXJuIGFuIGFic29sdXRlIFVSTCB3aGljaCB0aGVuIGNhbiBiZSB1c2VkIG9uIGl0c2VsZlxuICAgICAgLy8gdG8gcG9wdWxhdGUgdGhlc2UgYWRkaXRpb25hbCBmaWVsZHMuXG4gICAgICBpZiAoYS5ob3N0ID09PSAnJykge1xuICAgICAgICBhLmhyZWYgPSBhLmhyZWY7XG4gICAgICB9XG4gICAgICBkb21haW4gPSBhLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbGF0aXZlIHByb3RvY29sIGlzIGJyb2tlbjogaHR0cHM6Ly9naXRodWIuY29tL2RlZnVuY3R6b21iaWUvbm9kZS11cmwvaXNzdWVzLzVcbiAgICAgIHZhciBwYXJ0cyA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlKHVybCk7XG4gICAgICBkb21haW4gPSBwYXJ0cy5ob3N0bmFtZTtcbiAgICAgIG9yaWdpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG9yaWdpbiAhPT0gZG9tYWluKSB7XG4gICAgICB2YXIgd2hpdGVMaXN0ZWQgPSBvcHQuZG9tYWluV2hpdGVMaXN0LnNvbWUoZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgaWR4ID0gZG9tYWluLmxlbmd0aCAtIGQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gZCA9PT0gZG9tYWluIHx8XG4gICAgICAgICAgKGlkeCA+IDEgJiYgZG9tYWluW2lkeC0xXSA9PT0gJy4nICYmIGRvbWFpbi5sYXN0SW5kZXhPZihkKSA9PT0gaWR4KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCF3aGl0ZUxpc3RlZCkge1xuICAgICAgICB0aHJvdyAnVVJMIGlzIG5vdCB3aGl0ZWxpc3RlZDogJyArIHVybDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cblxuZnVuY3Rpb24gbG9hZChvcHQsIGNhbGxiYWNrKSB7XG4gIHZhciBlcnJvciA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGUpIHsgdGhyb3cgZTsgfSwgdXJsO1xuXG4gIHRyeSB7XG4gICAgdXJsID0gbG9hZC5zYW5pdGl6ZVVybChvcHQpOyAvLyBlbmFibGUgb3ZlcnJpZGVcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyb3IoZXJyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIGVycm9yKCdJbnZhbGlkIFVSTDogJyArIG9wdC51cmwpO1xuICB9IGVsc2UgaWYgKGxvYWQudXNlWEhSKSB7XG4gICAgLy8gb24gY2xpZW50LCB1c2UgeGhyXG4gICAgcmV0dXJuIHhocih1cmwsIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChzdGFydHNXaXRoKHVybCwgZmlsZVByb3RvY29sKSkge1xuICAgIC8vIG9uIHNlcnZlciwgaWYgdXJsIHN0YXJ0cyB3aXRoICdmaWxlOi8vJywgc3RyaXAgaXQgYW5kIGxvYWQgZnJvbSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLnNsaWNlKGZpbGVQcm90b2NvbC5sZW5ndGgpLCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAodXJsLmluZGV4T2YoJzovLycpIDwgMCkgeyAvLyBUT0RPIGJldHRlciBwcm90b2NvbCBjaGVjaz9cbiAgICAvLyBvbiBzZXJ2ZXIsIGlmIG5vIHByb3RvY29sIGFzc3VtZSBmaWxlXG4gICAgcmV0dXJuIGZpbGUodXJsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgLy8gZm9yIHJlZ3VsYXIgVVJMcyBvbiBzZXJ2ZXJcbiAgICByZXR1cm4gaHR0cCh1cmwsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB4aHJIYXNSZXNwb25zZShyZXF1ZXN0KSB7XG4gIHZhciB0eXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gIHJldHVybiB0eXBlICYmIHR5cGUgIT09ICd0ZXh0JyA/XG4gICAgcmVxdWVzdC5yZXNwb25zZSA6IC8vIG51bGwgb24gZXJyb3JcbiAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dDsgLy8gJycgb24gZXJyb3Jcbn1cblxuZnVuY3Rpb24geGhyKHVybCwgY2FsbGJhY2spIHtcbiAgdmFyIGFzeW5jID0gISFjYWxsYmFjaztcbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgLy8gSWYgSUUgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCB1c2UgWERvbWFpblJlcXVlc3QgKGNvcGllZCBmcm9tIGQzLnhocilcbiAgaWYgKHRoaXMuWERvbWFpblJlcXVlc3QgJiZcbiAgICAgICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgIC9eKGh0dHAocyk/Oik/XFwvXFwvLy50ZXN0KHVybCkpIHJlcXVlc3QgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcblxuICBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgIHZhciBzdGF0dXMgPSByZXF1ZXN0LnN0YXR1cztcbiAgICBpZiAoIXN0YXR1cyAmJiB4aHJIYXNSZXNwb25zZShyZXF1ZXN0KSB8fCBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhyZXF1ZXN0LCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXN5bmMpIHtcbiAgICBpZiAoJ29ubG9hZCcgaW4gcmVxdWVzdCkge1xuICAgICAgcmVxdWVzdC5vbmxvYWQgPSByZXF1ZXN0Lm9uZXJyb3IgPSByZXNwb25kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID4gMykgcmVzcG9uZCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgYXN5bmMpO1xuICByZXF1ZXN0LnNlbmQoKTtcblxuICBpZiAoIWFzeW5jICYmIHhockhhc1Jlc3BvbnNlKHJlcXVlc3QpKSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbGUoZmlsZW5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpO1xuICB9XG4gIGZzLnJlYWRGaWxlKGZpbGVuYW1lLCBjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIGh0dHAodXJsLCBjYWxsYmFjaykge1xuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJ3N5bmMtcmVxdWVzdCcpKCdHRVQnLCB1cmwpLmdldEJvZHkoKTtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0ge3VybDogdXJsLCBlbmNvZGluZzogbnVsbCwgZ3ppcDogdHJ1ZX07XG4gIHJlcXVpcmUoJ3JlcXVlc3QnKShvcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gZXJyb3IgfHxcbiAgICAgICAgJ0xvYWQgZmFpbGVkIHdpdGggcmVzcG9uc2UgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArICcuJztcbiAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0cmluZywgc2VhcmNoU3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcgPT0gbnVsbCA/IGZhbHNlIDogc3RyaW5nLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgMCkgPT09IDA7XG59XG5cbmxvYWQuc2FuaXRpemVVcmwgPSBzYW5pdGl6ZVVybDtcblxubG9hZC51c2VYSFIgPSAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZDtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuL3R5cGUnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbmZ1bmN0aW9uIHJlYWQoZGF0YSwgZm9ybWF0KSB7XG4gIHZhciB0eXBlID0gKGZvcm1hdCAmJiBmb3JtYXQudHlwZSkgfHwgJ2pzb24nO1xuICBkYXRhID0gZm9ybWF0c1t0eXBlXShkYXRhLCBmb3JtYXQpO1xuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC5wYXJzZSkgcGFyc2UoZGF0YSwgZm9ybWF0LnBhcnNlKTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGRhdGEsIHR5cGVzKSB7XG4gIHZhciBjb2xzLCBwYXJzZXJzLCBkLCBpLCBqLCBjbGVuLCBsZW4gPSBkYXRhLmxlbmd0aDtcblxuICB0eXBlcyA9ICh0eXBlcz09PSdhdXRvJykgPyB0eXBlLmluZmVyQWxsKGRhdGEpIDogdXRpbC5kdXBsaWNhdGUodHlwZXMpO1xuICBjb2xzID0gdXRpbC5rZXlzKHR5cGVzKTtcbiAgcGFyc2VycyA9IGNvbHMubWFwKGZ1bmN0aW9uKGMpIHsgcmV0dXJuIHR5cGUucGFyc2Vyc1t0eXBlc1tjXV07IH0pO1xuXG4gIGZvciAoaT0wLCBjbGVuPWNvbHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgZCA9IGRhdGFbaV07XG4gICAgZm9yIChqPTA7IGo8Y2xlbjsgKytqKSB7XG4gICAgICBkW2NvbHNbal1dID0gcGFyc2Vyc1tqXShkW2NvbHNbal1dKTtcbiAgICB9XG4gIH1cbiAgdHlwZS5hbm5vdGF0aW9uKGRhdGEsIHR5cGVzKTtcbn1cblxucmVhZC5mb3JtYXRzID0gZm9ybWF0cztcbm1vZHVsZS5leHBvcnRzID0gcmVhZDtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIGxvYWQgPSByZXF1aXJlKCcuL2xvYWQnKTtcbnZhciByZWFkID0gcmVxdWlyZSgnLi9yZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbFxuICAua2V5cyhyZWFkLmZvcm1hdHMpXG4gIC5yZWR1Y2UoZnVuY3Rpb24ob3V0LCB0eXBlKSB7XG4gICAgb3V0W3R5cGVdID0gZnVuY3Rpb24ob3B0LCBmb3JtYXQsIGNhbGxiYWNrKSB7XG4gICAgICAvLyBwcm9jZXNzIGFyZ3VtZW50c1xuICAgICAgaWYgKHV0aWwuaXNTdHJpbmcob3B0KSkgeyBvcHQgPSB7dXJsOiBvcHR9OyB9XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB1dGlsLmlzRnVuY3Rpb24oZm9ybWF0KSkge1xuICAgICAgICBjYWxsYmFjayA9IGZvcm1hdDtcbiAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdXAgcmVhZCBmb3JtYXRcbiAgICAgIGZvcm1hdCA9IHV0aWwuZXh0ZW5kKHtwYXJzZTogJ2F1dG8nfSwgZm9ybWF0KTtcbiAgICAgIGZvcm1hdC50eXBlID0gdHlwZTtcblxuICAgICAgLy8gbG9hZCBkYXRhXG4gICAgICB2YXIgZGF0YSA9IGxvYWQob3B0LCBjYWxsYmFjayA/IGZ1bmN0aW9uKGVycm9yLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IHJldHVybjsgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIGRhdGEgbG9hZGVkLCBub3cgcGFyc2UgaXQgKGFzeW5jKVxuICAgICAgICAgIGRhdGEgPSByZWFkKGRhdGEsIGZvcm1hdCk7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSA6IHVuZGVmaW5lZCk7XG5cbiAgICAgIC8vIGRhdGEgbG9hZGVkLCBub3cgcGFyc2UgaXQgKHN5bmMpXG4gICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgIH07XG4gICAgcmV0dXJuIG91dDtcbiAgfSwge30pO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG5cbnZhciBUWVBFUyA9ICdfX3R5cGVzX18nO1xuXG52YXIgUEFSU0VSUyA9IHtcbiAgYm9vbGVhbjogdXRpbC5ib29sZWFuLFxuICBpbnRlZ2VyOiB1dGlsLm51bWJlcixcbiAgbnVtYmVyOiAgdXRpbC5udW1iZXIsXG4gIGRhdGU6ICAgIHV0aWwuZGF0ZSxcbiAgc3RyaW5nOiAgZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PScnID8gbnVsbCA6IHg7IH1cbn07XG5cbnZhciBURVNUUyA9IHtcbiAgYm9vbGVhbjogZnVuY3Rpb24oeCkgeyByZXR1cm4geD09PSd0cnVlJyB8fCB4PT09J2ZhbHNlJyB8fCB1dGlsLmlzQm9vbGVhbih4KTsgfSxcbiAgaW50ZWdlcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gVEVTVFMubnVtYmVyKHgpICYmICh4PSt4KSA9PT0gfn54OyB9LFxuICBudW1iZXI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFpc05hTigreCkgJiYgIXV0aWwuaXNEYXRlKHgpOyB9LFxuICBkYXRlOiBmdW5jdGlvbih4KSB7IHJldHVybiAhaXNOYU4oRGF0ZS5wYXJzZSh4KSk7IH1cbn07XG5cbmZ1bmN0aW9uIGFubm90YXRpb24oZGF0YSwgdHlwZXMpIHtcbiAgaWYgKCF0eXBlcykgcmV0dXJuIGRhdGEgJiYgZGF0YVtUWVBFU10gfHwgbnVsbDtcbiAgZGF0YVtUWVBFU10gPSB0eXBlcztcbn1cblxuZnVuY3Rpb24gdHlwZSh2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG47XG5cbiAgLy8gaWYgZGF0YSBhcnJheSBoYXMgdHlwZSBhbm5vdGF0aW9ucywgdXNlIHRoZW1cbiAgaWYgKHZhbHVlc1tUWVBFU10pIHtcbiAgICB2ID0gZih2YWx1ZXNbVFlQRVNdKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2KSkgcmV0dXJuIHY7XG4gIH1cblxuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyAhdXRpbC5pc1ZhbGlkKHYpICYmIGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gIH1cblxuICByZXR1cm4gdXRpbC5pc0RhdGUodikgPyAnZGF0ZScgOlxuICAgIHV0aWwuaXNOdW1iZXIodikgICAgPyAnbnVtYmVyJyA6XG4gICAgdXRpbC5pc0Jvb2xlYW4odikgICA/ICdib29sZWFuJyA6XG4gICAgdXRpbC5pc1N0cmluZyh2KSAgICA/ICdzdHJpbmcnIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdHlwZUFsbChkYXRhLCBmaWVsZHMpIHtcbiAgaWYgKCFkYXRhLmxlbmd0aCkgcmV0dXJuO1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbih0eXBlcywgZikge1xuICAgIHJldHVybiAodHlwZXNbZl0gPSB0eXBlKGRhdGEsIGYpLCB0eXBlcyk7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gaW5mZXIodmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBpLCBqLCB2O1xuXG4gIC8vIHR5cGVzIHRvIHRlc3QgZm9yLCBpbiBwcmVjZWRlbmNlIG9yZGVyXG4gIHZhciB0eXBlcyA9IFsnYm9vbGVhbicsICdpbnRlZ2VyJywgJ251bWJlcicsICdkYXRlJ107XG5cbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gZ2V0IG5leHQgdmFsdWUgdG8gdGVzdFxuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIC8vIHRlc3QgdmFsdWUgYWdhaW5zdCByZW1haW5pbmcgdHlwZXNcbiAgICBmb3IgKGo9MDsgajx0eXBlcy5sZW5ndGg7ICsraikge1xuICAgICAgaWYgKHV0aWwuaXNWYWxpZCh2KSAmJiAhVEVTVFNbdHlwZXNbal1dKHYpKSB7XG4gICAgICAgIHR5cGVzLnNwbGljZShqLCAxKTtcbiAgICAgICAgaiAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiBubyB0eXBlcyBsZWZ0LCByZXR1cm4gJ3N0cmluZydcbiAgICBpZiAodHlwZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICByZXR1cm4gdHlwZXNbMF07XG59XG5cbmZ1bmN0aW9uIGluZmVyQWxsKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICByZXR1cm4gZmllbGRzLnJlZHVjZShmdW5jdGlvbih0eXBlcywgZikge1xuICAgIHR5cGVzW2ZdID0gaW5mZXIoZGF0YSwgZik7XG4gICAgcmV0dXJuIHR5cGVzO1xuICB9LCB7fSk7XG59XG5cbnR5cGUuYW5ub3RhdGlvbiA9IGFubm90YXRpb247XG50eXBlLmFsbCA9IHR5cGVBbGw7XG50eXBlLmluZmVyID0gaW5mZXI7XG50eXBlLmluZmVyQWxsID0gaW5mZXJBbGw7XG50eXBlLnBhcnNlcnMgPSBQQVJTRVJTO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIGRsID0ge1xuICB2ZXJzaW9uOiAgICAnMS40LjgnLFxuICBsb2FkOiAgICAgICByZXF1aXJlKCcuL2ltcG9ydC9sb2FkJyksXG4gIHJlYWQ6ICAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L3JlYWQnKSxcbiAgdHlwZTogICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpLFxuICBBZ2dyZWdhdG9yOiByZXF1aXJlKCcuL2FnZ3JlZ2F0ZS9hZ2dyZWdhdG9yJyksXG4gIGdyb3VwYnk6ICAgIHJlcXVpcmUoJy4vYWdncmVnYXRlL2dyb3VwYnknKSxcbiAgYmluczogICAgICAgcmVxdWlyZSgnLi9iaW5zL2JpbnMnKSxcbiAgJGJpbjogICAgICAgcmVxdWlyZSgnLi9iaW5zL2hpc3RvZ3JhbScpLiRiaW4sXG4gIGhpc3RvZ3JhbTogIHJlcXVpcmUoJy4vYmlucy9oaXN0b2dyYW0nKS5oaXN0b2dyYW0sXG4gIGZvcm1hdDogICAgIHJlcXVpcmUoJy4vZm9ybWF0JyksXG4gIHByaW50OiAgICAgIHJlcXVpcmUoJy4vcHJpbnQnKSxcbiAgdGVtcGxhdGU6ICAgcmVxdWlyZSgnLi90ZW1wbGF0ZScpLFxuICB0aW1lOiAgICAgICByZXF1aXJlKCcuL3RpbWUnKVxufTtcblxudXRpbC5leHRlbmQoZGwsIHV0aWwpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vZ2VuZXJhdGUnKSk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9zdGF0cycpKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL2ltcG9ydC9yZWFkZXJzJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRsO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpO1xudmFyIHN0YXRzID0gcmVxdWlyZSgnLi9zdGF0cycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xuXG52YXIgRk1UID0ge1xuICAnZGF0ZSc6ICAgICd8dGltZTpcIiVtLyVkLyVZICVIOiVNOiVTXCInLFxuICAnbnVtYmVyJzogICd8bnVtYmVyOlwiLjRmXCInLFxuICAnaW50ZWdlcic6ICd8bnVtYmVyOlwiZFwiJ1xufTtcblxudmFyIFBPUyA9IHtcbiAgJ251bWJlcic6ICAnbGVmdCcsXG4gICdpbnRlZ2VyJzogJ2xlZnQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cy50YWJsZSA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xuICBvcHQgPSB1dGlsLmV4dGVuZCh7c2VwYXJhdG9yOicgJywgbWlud2lkdGg6IDgsIG1heHdpZHRoOiAxNX0sIG9wdCk7XG4gIHZhciBmaWVsZHMgPSBvcHQuZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKSxcbiAgICAgIHR5cGVzID0gdHlwZS5hbGwoZGF0YSk7XG5cbiAgaWYgKG9wdC5zdGFydCB8fCBvcHQubGltaXQpIHtcbiAgICB2YXIgYSA9IG9wdC5zdGFydCB8fCAwLFxuICAgICAgICBiID0gb3B0LmxpbWl0ID8gYSArIG9wdC5saW1pdCA6IGRhdGEubGVuZ3RoO1xuICAgIGRhdGEgPSBkYXRhLnNsaWNlKGEsIGIpO1xuICB9XG5cbiAgLy8gZGV0ZXJtaW5lIGNoYXIgd2lkdGggb2YgZmllbGRzXG4gIHZhciBsZW5zID0gZmllbGRzLm1hcChmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGZvcm1hdCA9IEZNVFt0eXBlc1tuYW1lXV0gfHwgJycsXG4gICAgICAgIHQgPSB0ZW1wbGF0ZSgne3snICsgbmFtZSArIGZvcm1hdCArICd9fScpLFxuICAgICAgICBsID0gc3RhdHMubWF4KGRhdGEsIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHQoeCkubGVuZ3RoOyB9KTtcbiAgICBsID0gTWF0aC5tYXgoTWF0aC5taW4obmFtZS5sZW5ndGgsIG9wdC5taW53aWR0aCksIGwpO1xuICAgIHJldHVybiBvcHQubWF4d2lkdGggPiAwID8gTWF0aC5taW4obCwgb3B0Lm1heHdpZHRoKSA6IGw7XG4gIH0pO1xuXG4gIC8vIHByaW50IGhlYWRlciByb3dcbiAgdmFyIGhlYWQgPSBmaWVsZHMubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICByZXR1cm4gdXRpbC50cnVuY2F0ZSh1dGlsLnBhZChuYW1lLCBsZW5zW2ldLCAnY2VudGVyJyksIGxlbnNbaV0pO1xuICB9KS5qb2luKG9wdC5zZXBhcmF0b3IpO1xuXG4gIC8vIGJ1aWxkIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciBlYWNoIHJvd1xuICB2YXIgdG1wbCA9IHRlbXBsYXRlKGZpZWxkcy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiAne3snICtcbiAgICAgIG5hbWUgK1xuICAgICAgKEZNVFt0eXBlc1tuYW1lXV0gfHwgJycpICtcbiAgICAgICgnfHBhZDonICsgbGVuc1tpXSArICcsJyArIChQT1NbdHlwZXNbbmFtZV1dIHx8ICdyaWdodCcpKSArXG4gICAgICAoJ3x0cnVuY2F0ZTonICsgbGVuc1tpXSkgK1xuICAgICd9fSc7XG4gIH0pLmpvaW4ob3B0LnNlcGFyYXRvcikpO1xuXG4gIC8vIHByaW50IHRhYmxlXG4gIHJldHVybiBoZWFkICsgXCJcXG5cIiArIGRhdGEubWFwKHRtcGwpLmpvaW4oJ1xcbicpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuc3VtbWFyeSA9IGZ1bmN0aW9uKHMpIHtcbiAgcyA9IHMgPyBzLl9fc3VtbWFyeV9fID8gcyA6IHN0YXRzLnN1bW1hcnkocykgOiB0aGlzO1xuICB2YXIgc3RyID0gW10sIGksIG47XG4gIGZvciAoaT0wLCBuPXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHN0ci5wdXNoKCctLSAnICsgc1tpXS5maWVsZCArICcgLS0nKTtcbiAgICBpZiAoc1tpXS50eXBlID09PSAnc3RyaW5nJyB8fCBzW2ldLmRpc3RpbmN0IDwgMTApIHtcbiAgICAgIHN0ci5wdXNoKHByaW50Q2F0ZWdvcmljYWxQcm9maWxlKHNbaV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyLnB1c2gocHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHNbaV0pKTtcbiAgICB9XG4gICAgc3RyLnB1c2goJycpO1xuICB9XG4gIHJldHVybiBzdHIuam9pbignXFxuJyk7XG59O1xuXG5mdW5jdGlvbiBwcmludFF1YW50aXRhdGl2ZVByb2ZpbGUocCkge1xuICByZXR1cm4gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ21pbjogICAgICAnICsgcC5taW4sXG4gICAgJ21heDogICAgICAnICsgcC5tYXgsXG4gICAgJ21lZGlhbjogICAnICsgcC5tZWRpYW4sXG4gICAgJ21lYW46ICAgICAnICsgcC5tZWFuLFxuICAgICdzdGRldjogICAgJyArIHAuc3RkZXYsXG4gICAgJ21vZGVza2V3OiAnICsgcC5tb2Rlc2tld1xuICBdLmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiBwcmludENhdGVnb3JpY2FsUHJvZmlsZShwKSB7XG4gIHZhciBsaXN0ID0gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ3RvcCB2YWx1ZXM6ICdcbiAgXTtcbiAgdmFyIHUgPSBwLnVuaXF1ZTtcbiAgdmFyIHRvcCA9IHV0aWwua2V5cyh1KVxuICAgIC5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gdVtiXSAtIHVbYV07IH0pXG4gICAgLnNsaWNlKDAsIDYpXG4gICAgLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiAnIFxcJycgKyB2ICsgJ1xcJyAoJyArIHVbdl0gKyAnKSc7IH0pO1xuICByZXR1cm4gbGlzdC5jb25jYXQodG9wKS5qb2luKCdcXG4nKTtcbn1cbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgdHlwZSA9IHJlcXVpcmUoJy4vaW1wb3J0L3R5cGUnKTtcbnZhciBnZW4gPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgc3RhdHMgPSB7fTtcblxuLy8gQ29sbGVjdCB1bmlxdWUgdmFsdWVzLlxuLy8gT3V0cHV0OiBhbiBhcnJheSBvZiB1bmlxdWUgdmFsdWVzLCBpbiBmaXJzdC1vYnNlcnZlZCBvcmRlclxuc3RhdHMudW5pcXVlID0gZnVuY3Rpb24odmFsdWVzLCBmLCByZXN1bHRzKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuICB2YXIgdSA9IHt9LCB2LCBpLCBuO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIGNvbnRpbnVlO1xuICAgIHVbdl0gPSAxO1xuICAgIHJlc3VsdHMucHVzaCh2KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnB1dCBhcnJheS5cbnN0YXRzLmNvdW50ID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCB8fCAwO1xufTtcblxuLy8gQ291bnQgdGhlIG51bWJlciBvZiBub24tbnVsbCwgbm9uLXVuZGVmaW5lZCwgbm9uLU5hTiB2YWx1ZXMuXG5zdGF0cy5jb3VudC52YWxpZCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdiwgaSwgbiwgdmFsaWQgPSAwO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHZhbGlkICs9IDE7XG4gIH1cbiAgcmV0dXJuIHZhbGlkO1xufTtcblxuLy8gQ291bnQgdGhlIG51bWJlciBvZiBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZXMuXG5zdGF0cy5jb3VudC5taXNzaW5nID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuLCBjb3VudCA9IDA7XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHYgPT0gbnVsbCkgY291bnQgKz0gMTtcbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuXG4vLyBDb3VudCB0aGUgbnVtYmVyIG9mIGRpc3RpbmN0IHZhbHVlcy5cbi8vIE51bGwsIHVuZGVmaW5lZCBhbmQgTmFOIGFyZSBlYWNoIGNvbnNpZGVyZWQgZGlzdGluY3QgdmFsdWVzLlxuc3RhdHMuY291bnQuZGlzdGluY3QgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbiwgY291bnQgPSAwO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2IGluIHUpIGNvbnRpbnVlO1xuICAgIHVbdl0gPSAxO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuLy8gQ29uc3RydWN0IGEgbWFwIGZyb20gZGlzdGluY3QgdmFsdWVzIHRvIG9jY3VycmVuY2UgY291bnRzLlxuc3RhdHMuY291bnQubWFwID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBtYXAgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBtYXBbdl0gPSAodiBpbiBtYXApID8gbWFwW3ZdICsgMSA6IDE7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG1lZGlhbiBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubWVkaWFuID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGlmIChmKSB2YWx1ZXMgPSB2YWx1ZXMubWFwKHV0aWwuJChmKSk7XG4gIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIodXRpbC5pc1ZhbGlkKS5zb3J0KHV0aWwuY21wKTtcbiAgcmV0dXJuIHN0YXRzLnF1YW50aWxlKHZhbHVlcywgMC41KTtcbn07XG5cbi8vIENvbXB1dGVzIHRoZSBxdWFydGlsZSBib3VuZGFyaWVzIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5xdWFydGlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBpZiAoZikgdmFsdWVzID0gdmFsdWVzLm1hcCh1dGlsLiQoZikpO1xuICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKHV0aWwuaXNWYWxpZCkuc29ydCh1dGlsLmNtcCk7XG4gIHZhciBxID0gc3RhdHMucXVhbnRpbGU7XG4gIHJldHVybiBbcSh2YWx1ZXMsIDAuMjUpLCBxKHZhbHVlcywgMC41MCksIHEodmFsdWVzLCAwLjc1KV07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBxdWFudGlsZSBvZiBhIHNvcnRlZCBhcnJheSBvZiBudW1iZXJzLlxuLy8gQWRhcHRlZCBmcm9tIHRoZSBEMy5qcyBpbXBsZW1lbnRhdGlvbi5cbnN0YXRzLnF1YW50aWxlID0gZnVuY3Rpb24odmFsdWVzLCBmLCBwKSB7XG4gIGlmIChwID09PSB1bmRlZmluZWQpIHsgcCA9IGY7IGYgPSB1dGlsLmlkZW50aXR5OyB9XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciBIID0gKHZhbHVlcy5sZW5ndGggLSAxKSAqIHAgKyAxLFxuICAgICAgaCA9IE1hdGguZmxvb3IoSCksXG4gICAgICB2ID0gK2YodmFsdWVzW2ggLSAxXSksXG4gICAgICBlID0gSCAtIGg7XG4gIHJldHVybiBlID8gdiArIGUgKiAoZih2YWx1ZXNbaF0pIC0gdikgOiB2O1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc3VtIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5zdW0gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgZm9yICh2YXIgc3VtPTAsIGk9MCwgbj12YWx1ZXMubGVuZ3RoLCB2OyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHN1bSArPSB2O1xuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtZWFuIChhdmVyYWdlKSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubWVhbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgbWVhbiA9IDAsIGRlbHRhLCBpLCBuLCBjLCB2O1xuICBmb3IgKGk9MCwgYz0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgZGVsdGEgPSB2IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKytjKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lYW47XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgdmFyaWFuY2Ugb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLnZhcmlhbmNlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIGlmICghdXRpbC5pc0FycmF5KHZhbHVlcykgfHwgdmFsdWVzLmxlbmd0aCA8IDIpIHJldHVybiAwO1xuICB2YXIgbWVhbiA9IDAsIE0yID0gMCwgZGVsdGEsIGksIGMsIHY7XG4gIGZvciAoaT0wLCBjPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgZGVsdGEgPSB2IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKytjKTtcbiAgICAgIE0yID0gTTIgKyBkZWx0YSAqICh2IC0gbWVhbik7XG4gICAgfVxuICB9XG4gIE0yID0gTTIgLyAoYyAtIDEpO1xuICByZXR1cm4gTTI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBzYW1wbGUgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5zdGRldiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gTWF0aC5zcXJ0KHN0YXRzLnZhcmlhbmNlKHZhbHVlcywgZikpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgUGVhcnNvbiBtb2RlIHNrZXduZXNzICgobWVkaWFuLW1lYW4pL3N0ZGV2KSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMubW9kZXNrZXcgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgdmFyIGF2ZyA9IHN0YXRzLm1lYW4odmFsdWVzLCBmKSxcbiAgICAgIG1lZCA9IHN0YXRzLm1lZGlhbih2YWx1ZXMsIGYpLFxuICAgICAgc3RkID0gc3RhdHMuc3RkZXYodmFsdWVzLCBmKTtcbiAgcmV0dXJuIHN0ZCA9PT0gMCA/IDAgOiAoYXZnIC0gbWVkKSAvIHN0ZDtcbn07XG5cbi8vIEZpbmQgdGhlIG1pbmltdW0gdmFsdWUgaW4gYW4gYXJyYXkuXG5zdGF0cy5taW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgcmV0dXJuIHN0YXRzLmV4dGVudCh2YWx1ZXMsIGYpWzBdO1xufTtcblxuLy8gRmluZCB0aGUgbWF4aW11bSB2YWx1ZSBpbiBhbiBhcnJheS5cbnN0YXRzLm1heCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICByZXR1cm4gc3RhdHMuZXh0ZW50KHZhbHVlcywgZilbMV07XG59O1xuXG4vLyBGaW5kIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIG9mIGFuIGFycmF5IG9mIHZhbHVlcy5cbnN0YXRzLmV4dGVudCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgYSwgYiwgdiwgaSwgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHsgYSA9IGIgPSB2OyBicmVhazsgfVxuICB9XG4gIGZvciAoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGlmICh2IDwgYSkgYSA9IHY7XG4gICAgICBpZiAodiA+IGIpIGIgPSB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gW2EsIGJdO1xufTtcblxuLy8gRmluZCB0aGUgaW50ZWdlciBpbmRpY2VzIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbnN0YXRzLmV4dGVudC5pbmRleCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgeCA9IC0xLCB5ID0gLTEsIGEsIGIsIHYsIGksIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7IGEgPSBiID0gdjsgeCA9IHkgPSBpOyBicmVhazsgfVxuICB9XG4gIGZvciAoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGlmICh2IDwgYSkgeyBhID0gdjsgeCA9IGk7IH1cbiAgICAgIGlmICh2ID4gYikgeyBiID0gdjsgeSA9IGk7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFt4LCB5XTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbnN0YXRzLmRvdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgc3VtID0gMCwgaSwgdjtcbiAgaWYgKCFiKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggIT09IGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXJyYXkgbGVuZ3RocyBtdXN0IG1hdGNoLicpO1xuICAgIH1cbiAgICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSB2YWx1ZXNbaV0gKiBhW2ldO1xuICAgICAgaWYgKHYgPT09IHYpIHN1bSArPSB2O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhID0gdXRpbC4kKGEpO1xuICAgIGIgPSB1dGlsLiQoYik7XG4gICAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gYSh2YWx1ZXNbaV0pICogYih2YWx1ZXNbaV0pO1xuICAgICAgaWYgKHYgPT09IHYpIHN1bSArPSB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtO1xufTtcblxuLy8gQ29tcHV0ZSBhc2NlbmRpbmcgcmFuayBzY29yZXMgZm9yIGFuIGFycmF5IG9mIHZhbHVlcy5cbi8vIFRpZXMgYXJlIGFzc2lnbmVkIHRoZWlyIGNvbGxlY3RpdmUgbWVhbiByYW5rLlxuc3RhdHMucmFuayA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpIHx8IHV0aWwuaWRlbnRpdHk7XG4gIHZhciBhID0gdmFsdWVzLm1hcChmdW5jdGlvbih2LCBpKSB7XG4gICAgICByZXR1cm4ge2lkeDogaSwgdmFsOiBmKHYpfTtcbiAgICB9KVxuICAgIC5zb3J0KHV0aWwuY29tcGFyYXRvcigndmFsJykpO1xuXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIHIgPSBBcnJheShuKSxcbiAgICAgIHRpZSA9IC0xLCBwID0ge30sIGksIHYsIG11O1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHYgPSBhW2ldLnZhbDtcbiAgICBpZiAodGllIDwgMCAmJiBwID09PSB2KSB7XG4gICAgICB0aWUgPSBpIC0gMTtcbiAgICB9IGVsc2UgaWYgKHRpZSA+IC0xICYmIHAgIT09IHYpIHtcbiAgICAgIG11ID0gMSArIChpLTEgKyB0aWUpIC8gMjtcbiAgICAgIGZvciAoOyB0aWU8aTsgKyt0aWUpIHJbYVt0aWVdLmlkeF0gPSBtdTtcbiAgICAgIHRpZSA9IC0xO1xuICAgIH1cbiAgICByW2FbaV0uaWR4XSA9IGkgKyAxO1xuICAgIHAgPSB2O1xuICB9XG5cbiAgaWYgKHRpZSA+IC0xKSB7XG4gICAgbXUgPSAxICsgKG4tMSArIHRpZSkgLyAyO1xuICAgIGZvciAoOyB0aWU8bjsgKyt0aWUpIHJbYVt0aWVdLmlkeF0gPSBtdTtcbiAgfVxuXG4gIHJldHVybiByO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc2FtcGxlIFBlYXJzb24gcHJvZHVjdC1tb21lbnQgY29ycmVsYXRpb24gb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuc3RhdHMuY29yID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiKSB7XG4gIHZhciBmbiA9IGI7XG4gIGIgPSBmbiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGE7XG4gIGEgPSBmbiA/IHZhbHVlcy5tYXAodXRpbC4kKGEpKSA6IHZhbHVlcztcblxuICB2YXIgZG90ID0gc3RhdHMuZG90KGEsIGIpLFxuICAgICAgbXVhID0gc3RhdHMubWVhbihhKSxcbiAgICAgIG11YiA9IHN0YXRzLm1lYW4oYiksXG4gICAgICBzZGEgPSBzdGF0cy5zdGRldihhKSxcbiAgICAgIHNkYiA9IHN0YXRzLnN0ZGV2KGIpLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGg7XG5cbiAgcmV0dXJuIChkb3QgLSBuKm11YSptdWIpIC8gKChuLTEpICogc2RhICogc2RiKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIFNwZWFybWFuIHJhbmsgY29ycmVsYXRpb24gb2YgdHdvIGFycmF5cyBvZiB2YWx1ZXMuXG5zdGF0cy5jb3IucmFuayA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgcmEgPSBiID8gc3RhdHMucmFuayh2YWx1ZXMsIHV0aWwuJChhKSkgOiBzdGF0cy5yYW5rKHZhbHVlcyksXG4gICAgICByYiA9IGIgPyBzdGF0cy5yYW5rKHZhbHVlcywgdXRpbC4kKGIpKSA6IHN0YXRzLnJhbmsoYSksXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aCwgaSwgcywgZDtcblxuICBmb3IgKGk9MCwgcz0wOyBpPG47ICsraSkge1xuICAgIGQgPSByYVtpXSAtIHJiW2ldO1xuICAgIHMgKz0gZCAqIGQ7XG4gIH1cblxuICByZXR1cm4gMSAtIDYqcyAvIChuICogKG4qbi0xKSk7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBkaXN0YW5jZSBjb3JyZWxhdGlvbiBvZiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Rpc3RhbmNlX2NvcnJlbGF0aW9uXG5zdGF0cy5jb3IuZGlzdCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgWCA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICBZID0gYiA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGE7XG5cbiAgdmFyIEEgPSBzdGF0cy5kaXN0Lm1hdChYKSxcbiAgICAgIEIgPSBzdGF0cy5kaXN0Lm1hdChZKSxcbiAgICAgIG4gPSBBLmxlbmd0aCxcbiAgICAgIGksIGFhLCBiYiwgYWI7XG5cbiAgZm9yIChpPTAsIGFhPTAsIGJiPTAsIGFiPTA7IGk8bjsgKytpKSB7XG4gICAgYWEgKz0gQVtpXSpBW2ldO1xuICAgIGJiICs9IEJbaV0qQltpXTtcbiAgICBhYiArPSBBW2ldKkJbaV07XG4gIH1cblxuICByZXR1cm4gTWF0aC5zcXJ0KGFiIC8gTWF0aC5zcXJ0KGFhKmJiKSk7XG59O1xuXG4vLyBDb21wdXRlIHRoZSB2ZWN0b3IgZGlzdGFuY2UgYmV0d2VlbiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG4vLyBEZWZhdWx0IGlzIEV1Y2xpZGVhbiAoZXhwPTIpIGRpc3RhbmNlLCBjb25maWd1cmFibGUgdmlhIGV4cCBhcmd1bWVudC5cbnN0YXRzLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIsIGV4cCkge1xuICB2YXIgZiA9IHV0aWwuaXNGdW5jdGlvbihiKSB8fCB1dGlsLmlzU3RyaW5nKGIpLFxuICAgICAgWCA9IHZhbHVlcyxcbiAgICAgIFkgPSBmID8gdmFsdWVzIDogYSxcbiAgICAgIGUgPSBmID8gZXhwIDogYixcbiAgICAgIEwyID0gZSA9PT0gMiB8fCBlID09IG51bGwsXG4gICAgICBuID0gdmFsdWVzLmxlbmd0aCwgcyA9IDAsIGQsIGk7XG4gIGlmIChmKSB7XG4gICAgYSA9IHV0aWwuJChhKTtcbiAgICBiID0gdXRpbC4kKGIpO1xuICB9XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGQgPSBmID8gKGEoWFtpXSktYihZW2ldKSkgOiAoWFtpXS1ZW2ldKTtcbiAgICBzICs9IEwyID8gZCpkIDogTWF0aC5wb3coTWF0aC5hYnMoZCksIGUpO1xuICB9XG4gIHJldHVybiBMMiA/IE1hdGguc3FydChzKSA6IE1hdGgucG93KHMsIDEvZSk7XG59O1xuXG4vLyBDb25zdHJ1Y3QgYSBtZWFuLWNlbnRlcmVkIGRpc3RhbmNlIG1hdHJpeCBmb3IgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLmRpc3QubWF0ID0gZnVuY3Rpb24oWCkge1xuICB2YXIgbiA9IFgubGVuZ3RoLFxuICAgICAgbSA9IG4qbixcbiAgICAgIEEgPSBBcnJheShtKSxcbiAgICAgIFIgPSBnZW4uemVyb3MobiksXG4gICAgICBNID0gMCwgdiwgaSwgajtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBBW2kqbitpXSA9IDA7XG4gICAgZm9yIChqPWkrMTsgajxuOyArK2opIHtcbiAgICAgIEFbaSpuK2pdID0gKHYgPSBNYXRoLmFicyhYW2ldIC0gWFtqXSkpO1xuICAgICAgQVtqKm4raV0gPSB2O1xuICAgICAgUltpXSArPSB2O1xuICAgICAgUltqXSArPSB2O1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIE0gKz0gUltpXTtcbiAgICBSW2ldIC89IG47XG4gIH1cbiAgTSAvPSBtO1xuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGZvciAoaj1pOyBqPG47ICsraikge1xuICAgICAgQVtpKm4ral0gKz0gTSAtIFJbaV0gLSBSW2pdO1xuICAgICAgQVtqKm4raV0gPSBBW2kqbitqXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIFNoYW5ub24gZW50cm9weSAobG9nIGJhc2UgMikgb2YgYW4gYXJyYXkgb2YgY291bnRzLlxuc3RhdHMuZW50cm9weSA9IGZ1bmN0aW9uKGNvdW50cywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgaSwgcCwgcyA9IDAsIEggPSAwLCBuID0gY291bnRzLmxlbmd0aDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcyArPSAoZiA/IGYoY291bnRzW2ldKSA6IGNvdW50c1tpXSk7XG4gIH1cbiAgaWYgKHMgPT09IDApIHJldHVybiAwO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBwID0gKGYgPyBmKGNvdW50c1tpXSkgOiBjb3VudHNbaV0pIC8gcztcbiAgICBpZiAocCkgSCArPSBwICogTWF0aC5sb2cocCk7XG4gIH1cbiAgcmV0dXJuIC1IIC8gTWF0aC5MTjI7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtdXR1YWwgaW5mb3JtYXRpb24gYmV0d2VlbiB0d28gZGlzY3JldGUgdmFyaWFibGVzLlxuLy8gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgZm9ybSBbTUksIE1JX2Rpc3RhbmNlXVxuLy8gTUlfZGlzdGFuY2UgaXMgZGVmaW5lZCBhcyAxIC0gSShhLGIpIC8gSChhLGIpLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NdXR1YWxfaW5mb3JtYXRpb25cbnN0YXRzLm11dHVhbCA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHZhciB4ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgeSA9IGNvdW50cyA/IHZhbHVlcy5tYXAodXRpbC4kKGIpKSA6IGEsXG4gICAgICB6ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoY291bnRzKSkgOiBiO1xuXG4gIHZhciBweCA9IHt9LFxuICAgICAgcHkgPSB7fSxcbiAgICAgIG4gPSB6Lmxlbmd0aCxcbiAgICAgIHMgPSAwLCBJID0gMCwgSCA9IDAsIHAsIHQsIGk7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcHhbeFtpXV0gPSAwO1xuICAgIHB5W3lbaV1dID0gMDtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHB4W3hbaV1dICs9IHpbaV07XG4gICAgcHlbeVtpXV0gKz0geltpXTtcbiAgICBzICs9IHpbaV07XG4gIH1cblxuICB0ID0gMSAvIChzICogTWF0aC5MTjIpO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBpZiAoeltpXSA9PT0gMCkgY29udGludWU7XG4gICAgcCA9IChzICogeltpXSkgLyAocHhbeFtpXV0gKiBweVt5W2ldXSk7XG4gICAgSSArPSB6W2ldICogdCAqIE1hdGgubG9nKHApO1xuICAgIEggKz0geltpXSAqIHQgKiBNYXRoLmxvZyh6W2ldL3MpO1xuICB9XG5cbiAgcmV0dXJuIFtJLCAxICsgSS9IXTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIG11dHVhbCBpbmZvcm1hdGlvbiBiZXR3ZWVuIHR3byBkaXNjcmV0ZSB2YXJpYWJsZXMuXG5zdGF0cy5tdXR1YWwuaW5mbyA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYiwgY291bnRzKSB7XG4gIHJldHVybiBzdGF0cy5tdXR1YWwodmFsdWVzLCBhLCBiLCBjb3VudHMpWzBdO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGRpc3RhbmNlIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIE1JX2Rpc3RhbmNlIGlzIGRlZmluZWQgYXMgMSAtIEkoYSxiKSAvIEgoYSxiKS5cbnN0YXRzLm11dHVhbC5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgcmV0dXJuIHN0YXRzLm11dHVhbCh2YWx1ZXMsIGEsIGIsIGNvdW50cylbMV07XG59O1xuXG4vLyBDb21wdXRlIGEgcHJvZmlsZSBvZiBzdW1tYXJ5IHN0YXRpc3RpY3MgZm9yIGEgdmFyaWFibGUuXG5zdGF0cy5wcm9maWxlID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBtZWFuID0gMCxcbiAgICAgIHZhbGlkID0gMCxcbiAgICAgIG1pc3NpbmcgPSAwLFxuICAgICAgZGlzdGluY3QgPSAwLFxuICAgICAgbWluID0gbnVsbCxcbiAgICAgIG1heCA9IG51bGwsXG4gICAgICBNMiA9IDAsXG4gICAgICB2YWxzID0gW10sXG4gICAgICB1ID0ge30sIGRlbHRhLCBzZCwgaSwgdiwgeDtcblxuICAvLyBjb21wdXRlIHN1bW1hcnkgc3RhdHNcbiAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG5cbiAgICAvLyB1cGRhdGUgdW5pcXVlIHZhbHVlc1xuICAgIHVbdl0gPSAodiBpbiB1KSA/IHVbdl0gKyAxIDogKGRpc3RpbmN0ICs9IDEsIDEpO1xuXG4gICAgaWYgKHYgPT0gbnVsbCkge1xuICAgICAgKyttaXNzaW5nO1xuICAgIH0gZWxzZSBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICAvLyB1cGRhdGUgc3RhdHNcbiAgICAgIHggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSA/IHYubGVuZ3RoIDogdjtcbiAgICAgIGlmIChtaW49PT1udWxsIHx8IHggPCBtaW4pIG1pbiA9IHg7XG4gICAgICBpZiAobWF4PT09bnVsbCB8fCB4ID4gbWF4KSBtYXggPSB4O1xuICAgICAgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gPSBtZWFuICsgZGVsdGEgLyAoKyt2YWxpZCk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgICAgdmFscy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKHZhbGlkIC0gMSk7XG4gIHNkID0gTWF0aC5zcXJ0KE0yKTtcblxuICAvLyBzb3J0IHZhbHVlcyBmb3IgbWVkaWFuIGFuZCBpcXJcbiAgdmFscy5zb3J0KHV0aWwuY21wKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICAgICB0eXBlKHZhbHVlcywgZiksXG4gICAgdW5pcXVlOiAgIHUsXG4gICAgY291bnQ6ICAgIHZhbHVlcy5sZW5ndGgsXG4gICAgdmFsaWQ6ICAgIHZhbGlkLFxuICAgIG1pc3Npbmc6ICBtaXNzaW5nLFxuICAgIGRpc3RpbmN0OiBkaXN0aW5jdCxcbiAgICBtaW46ICAgICAgbWluLFxuICAgIG1heDogICAgICBtYXgsXG4gICAgbWVhbjogICAgIG1lYW4sXG4gICAgc3RkZXY6ICAgIHNkLFxuICAgIG1lZGlhbjogICAodiA9IHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuNSkpLFxuICAgIHExOiAgICAgICBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjI1KSxcbiAgICBxMzogICAgICAgc3RhdHMucXVhbnRpbGUodmFscywgMC43NSksXG4gICAgbW9kZXNrZXc6IHNkID09PSAwID8gMCA6IChtZWFuIC0gdikgLyBzZFxuICB9O1xufTtcblxuLy8gQ29tcHV0ZSBwcm9maWxlcyBmb3IgYWxsIHZhcmlhYmxlcyBpbiBhIGRhdGEgc2V0Llxuc3RhdHMuc3VtbWFyeSA9IGZ1bmN0aW9uKGRhdGEsIGZpZWxkcykge1xuICBmaWVsZHMgPSBmaWVsZHMgfHwgdXRpbC5rZXlzKGRhdGFbMF0pO1xuICB2YXIgcyA9IGZpZWxkcy5tYXAoZnVuY3Rpb24oZikge1xuICAgIHZhciBwID0gc3RhdHMucHJvZmlsZShkYXRhLCB1dGlsLiQoZikpO1xuICAgIHJldHVybiAocC5maWVsZCA9IGYsIHApO1xuICB9KTtcbiAgcmV0dXJuIChzLl9fc3VtbWFyeV9fID0gdHJ1ZSwgcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRzO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBmb3JtYXQgPSByZXF1aXJlKCcuL2Zvcm1hdCcpO1xuXG52YXIgY29udGV4dCA9IHtcbiAgZm9ybWF0czogICAgW10sXG4gIGZvcm1hdF9tYXA6IHt9LFxuICB0cnVuY2F0ZTogICB1dGlsLnRydW5jYXRlLFxuICBwYWQ6ICAgICAgICB1dGlsLnBhZFxufTtcblxuZnVuY3Rpb24gdGVtcGxhdGUodGV4dCkge1xuICB2YXIgc3JjID0gc291cmNlKHRleHQsICdkJyk7XG4gIHNyYyA9ICd2YXIgX190OyByZXR1cm4gJyArIHNyYyArICc7JztcblxuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gKG5ldyBGdW5jdGlvbignZCcsIHNyYykpLmJpbmQoY29udGV4dCk7XG59XG5cbnRlbXBsYXRlLnNvdXJjZSA9IHNvdXJjZTtcbnRlbXBsYXRlLmNvbnRleHQgPSBjb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuLy8gQ2xlYXIgY2FjaGUgb2YgZm9ybWF0IG9iamVjdHMuXG4vLyBUaGlzIGNhbiAqYnJlYWsqIHByaW9yIHRlbXBsYXRlIGZ1bmN0aW9ucywgc28gaW52b2tlIHdpdGggY2FyZSFcbnRlbXBsYXRlLmNsZWFyRm9ybWF0Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgY29udGV4dC5mb3JtYXRzID0gW107XG4gIGNvbnRleHQuZm9ybWF0X21hcCA9IHt9O1xufTtcblxuLy8gR2VuZXJhdGUgcHJvcGVydHkgYWNjZXNzIGNvZGUgZm9yIHVzZSB3aXRoaW4gdGVtcGxhdGUgc291cmNlLlxuLy8gb2JqZWN0OiB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0ICh2YXJpYWJsZSkgY29udGFpbmluZyB0ZW1wbGF0ZSBkYXRhXG4vLyBwcm9wZXJ0eTogdGhlIHByb3BlcnR5IGFjY2VzcyBzdHJpbmcsIHZlcmJhdGltIGZyb20gdGVtcGxhdGUgdGFnXG50ZW1wbGF0ZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgdmFyIHNyYyA9IHV0aWwuZmllbGQocHJvcGVydHkpLm1hcCh1dGlsLnN0cikuam9pbignXVsnKTtcbiAgcmV0dXJuIG9iamVjdCArICdbJyArIHNyYyArICddJztcbn07XG5cbi8vIEdlbmVyYXRlIHNvdXJjZSBjb2RlIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uLlxuLy8gdGV4dDogdGhlIHRlbXBsYXRlIHRleHRcbi8vIHZhcmlhYmxlOiB0aGUgbmFtZSBvZiB0aGUgZGF0YSBvYmplY3QgdmFyaWFibGUgKCdvYmonIGJ5IGRlZmF1bHQpXG4vLyBwcm9wZXJ0aWVzOiBvcHRpb25hbCBoYXNoIGZvciBjb2xsZWN0aW5nIGFsbCBhY2Nlc3NlZCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBzb3VyY2UodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyaWFibGUgPSB2YXJpYWJsZSB8fCAnb2JqJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHNyYyA9ICdcXCcnO1xuICB2YXIgcmVnZXggPSB0ZW1wbGF0ZV9yZTtcblxuICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICB0ZXh0LnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpbnRlcnBvbGF0ZSwgb2Zmc2V0KSB7XG4gICAgc3JjICs9IHRleHRcbiAgICAgIC5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgICAgLnJlcGxhY2UodGVtcGxhdGVfZXNjYXBlciwgdGVtcGxhdGVfZXNjYXBlQ2hhcik7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgIHNyYyArPSAnXFwnXFxuKygoX190PSgnICtcbiAgICAgICAgdGVtcGxhdGVfdmFyKGludGVycG9sYXRlLCB2YXJpYWJsZSwgcHJvcGVydGllcykgK1xuICAgICAgICAnKSk9PW51bGw/XFwnXFwnOl9fdCkrXFxuXFwnJztcbiAgICB9XG5cbiAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIHNyYyArICdcXCcnO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZV92YXIodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGZpbHRlcnMgPSB0ZXh0Lm1hdGNoKGZpbHRlcl9yZSk7XG4gIHZhciBwcm9wID0gZmlsdGVycy5zaGlmdCgpLnRyaW0oKTtcbiAgdmFyIHN0cmluZ0Nhc3QgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHN0cmNhbGwoZm4pIHtcbiAgICBmbiA9IGZuIHx8ICcnO1xuICAgIGlmIChzdHJpbmdDYXN0KSB7XG4gICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICBzcmMgPSAnU3RyaW5nKCcgKyBzcmMgKyAnKScgKyBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3JjICs9IGZuO1xuICAgIH1cbiAgICByZXR1cm4gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZSgpIHtcbiAgICByZXR1cm4gJyh0eXBlb2YgJyArIHNyYyArICc9PT1cIm51bWJlclwiP25ldyBEYXRlKCcrc3JjKycpOicrc3JjKycpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG51bWJlcl9mb3JtYXQoZm10LCBrZXkpIHtcbiAgICBhID0gdGVtcGxhdGVfZm9ybWF0KGFyZ3NbMF0sIGtleSwgZm10KTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgc3JjID0gJ3RoaXMuZm9ybWF0c1snK2ErJ10oJytzcmMrJyknO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZV9mb3JtYXQoZm10LCBrZXkpIHtcbiAgICBhID0gdGVtcGxhdGVfZm9ybWF0KGFyZ3NbMF0sIGtleSwgZm10KTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgc3JjID0gJ3RoaXMuZm9ybWF0c1snK2ErJ10oJytkYXRlKCkrJyknO1xuICB9XG5cbiAgaWYgKHByb3BlcnRpZXMpIHByb3BlcnRpZXNbcHJvcF0gPSAxO1xuICB2YXIgc3JjID0gdGVtcGxhdGUucHJvcGVydHkodmFyaWFibGUsIHByb3ApO1xuXG4gIGZvciAodmFyIGk9MDsgaTxmaWx0ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGYgPSBmaWx0ZXJzW2ldLCBhcmdzID0gbnVsbCwgcGlkeCwgYSwgYjtcblxuICAgIGlmICgocGlkeD1mLmluZGV4T2YoJzonKSkgPiAwKSB7XG4gICAgICBmID0gZi5zbGljZSgwLCBwaWR4KTtcbiAgICAgIGFyZ3MgPSBmaWx0ZXJzW2ldLnNsaWNlKHBpZHgrMSlcbiAgICAgICAgLm1hdGNoKGFyZ3NfcmUpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH0pO1xuICAgIH1cbiAgICBmID0gZi50cmltKCk7XG5cbiAgICBzd2l0Y2ggKGYpIHtcbiAgICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgICAgIHN0cmNhbGwoJy5sZW5ndGgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsb3dlcic6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXInOlxuICAgICAgICBzdHJjYWxsKCcudG9VcHBlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xvd2VyLWxvY2FsZSc6XG4gICAgICAgIHN0cmNhbGwoJy50b0xvY2FsZUxvd2VyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBwZXItbG9jYWxlJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG9jYWxlVXBwZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmltJzpcbiAgICAgICAgc3RyY2FsbCgnLnRyaW0oKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgwLCcgKyBhICsgJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKC0nICsgYSArJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaWQnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhICsgdXRpbC5udW1iZXIoYXJnc1sxXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgrJythKycsJytiKycpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2xpY2UnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIHN0cmNhbGwoJy5zbGljZSgnKyBhICtcbiAgICAgICAgICAoYXJncy5sZW5ndGggPiAxID8gJywnICsgdXRpbC5udW1iZXIoYXJnc1sxXSkgOiAnJykgK1xuICAgICAgICAgICcpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJ1bmNhdGUnOlxuICAgICAgICBhID0gdXRpbC5udW1iZXIoYXJnc1swXSk7XG4gICAgICAgIGIgPSBhcmdzWzFdO1xuICAgICAgICBiID0gKGIhPT0nbGVmdCcgJiYgYiE9PSdtaWRkbGUnICYmIGIhPT0nY2VudGVyJykgPyAncmlnaHQnIDogYjtcbiAgICAgICAgc3JjID0gJ3RoaXMudHJ1bmNhdGUoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhZCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgYiA9IGFyZ3NbMV07XG4gICAgICAgIGIgPSAoYiE9PSdsZWZ0JyAmJiBiIT09J21pZGRsZScgJiYgYiE9PSdjZW50ZXInKSA/ICdyaWdodCcgOiBiO1xuICAgICAgICBzcmMgPSAndGhpcy5wYWQoJyArIHN0cmNhbGwoKSArICcsJyArIGEgKyAnLFxcJycgKyBiICsgJ1xcJyknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIG51bWJlcl9mb3JtYXQoZm9ybWF0Lm51bWJlciwgJ251bWJlcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aW1lX2Zvcm1hdChmb3JtYXQudGltZSwgJ3RpbWUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lLXV0Yyc6XG4gICAgICAgIHRpbWVfZm9ybWF0KGZvcm1hdC51dGMsICd0aW1lLXV0YycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IEVycm9yKCdVbnJlY29nbml6ZWQgdGVtcGxhdGUgZmlsdGVyOiAnICsgZik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNyYztcbn1cblxudmFyIHRlbXBsYXRlX3JlID0gL1xce1xceyguKz8pXFx9XFx9fCQvZyxcbiAgICBmaWx0ZXJfcmUgPSAvKD86XCJbXlwiXSpcInxcXCdbXlxcJ10qXFwnfFteXFx8XCJdK3xbXlxcfFxcJ10rKSsvZyxcbiAgICBhcmdzX3JlID0gLyg/OlwiW15cIl0qXCJ8XFwnW15cXCddKlxcJ3xbXixcIl0rfFteLFxcJ10rKSsvZztcblxuLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbi8vIHN0cmluZyBsaXRlcmFsLlxudmFyIHRlbXBsYXRlX2VzY2FwZXMgPSB7XG4gICdcXCcnOiAgICAgJ1xcJycsXG4gICdcXFxcJzogICAgICdcXFxcJyxcbiAgJ1xccic6ICAgICAncicsXG4gICdcXG4nOiAgICAgJ24nLFxuICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICdcXHUyMDI5JzogJ3UyMDI5J1xufTtcblxudmFyIHRlbXBsYXRlX2VzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlX2VzY2FwZUNoYXIobWF0Y2gpIHtcbiAgcmV0dXJuICdcXFxcJyArIHRlbXBsYXRlX2VzY2FwZXNbbWF0Y2hdO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZV9mb3JtYXQocGF0dGVybiwga2V5LCBmbXQpIHtcbiAgaWYgKChwYXR0ZXJuWzBdID09PSAnXFwnJyAmJiBwYXR0ZXJuW3BhdHRlcm4ubGVuZ3RoLTFdID09PSAnXFwnJykgfHxcbiAgICAgIChwYXR0ZXJuWzBdID09PSAnXCInICAmJiBwYXR0ZXJuW3BhdHRlcm4ubGVuZ3RoLTFdID09PSAnXCInKSkge1xuICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignRm9ybWF0IHBhdHRlcm4gbXVzdCBiZSBxdW90ZWQ6ICcgKyBwYXR0ZXJuKTtcbiAgfVxuICBrZXkgPSBrZXkgKyAnOicgKyBwYXR0ZXJuO1xuICBpZiAoIWNvbnRleHQuZm9ybWF0X21hcFtrZXldKSB7XG4gICAgdmFyIGYgPSBmbXQocGF0dGVybik7XG4gICAgdmFyIGkgPSBjb250ZXh0LmZvcm1hdHMubGVuZ3RoO1xuICAgIGNvbnRleHQuZm9ybWF0cy5wdXNoKGYpO1xuICAgIGNvbnRleHQuZm9ybWF0X21hcFtrZXldID0gaTtcbiAgfVxuICByZXR1cm4gY29udGV4dC5mb3JtYXRfbWFwW2tleV07XG59XG4iLCJ2YXIgZDNfdGltZSA9IHJlcXVpcmUoJ2QzLXRpbWUnKTtcblxudmFyIHRlbXBEYXRlID0gbmV3IERhdGUoKSxcbiAgICBiYXNlRGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDEpLnNldEZ1bGxZZWFyKDApLCAvLyBKYW4gMSwgMCBBRFxuICAgIHV0Y0Jhc2VEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMCwgMCwgMSkpLnNldFVUQ0Z1bGxZZWFyKDApO1xuXG5mdW5jdGlvbiBkYXRlKGQpIHtcbiAgcmV0dXJuICh0ZW1wRGF0ZS5zZXRUaW1lKCtkKSwgdGVtcERhdGUpO1xufVxuXG4vLyBjcmVhdGUgYSB0aW1lIHVuaXQgZW50cnlcbmZ1bmN0aW9uIGVudHJ5KHR5cGUsIGRhdGUsIHVuaXQsIHN0ZXAsIG1pbiwgbWF4KSB7XG4gIHZhciBlID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0ZTogZGF0ZSxcbiAgICB1bml0OiB1bml0XG4gIH07XG4gIGlmIChzdGVwKSB7XG4gICAgZS5zdGVwID0gc3RlcDtcbiAgfSBlbHNlIHtcbiAgICBlLm1pbnN0ZXAgPSAxO1xuICB9XG4gIGlmIChtaW4gIT0gbnVsbCkgZS5taW4gPSBtaW47XG4gIGlmIChtYXggIT0gbnVsbCkgZS5tYXggPSBtYXg7XG4gIHJldHVybiBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUodHlwZSwgdW5pdCwgYmFzZSwgc3RlcCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIGVudHJ5KHR5cGUsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5vZmZzZXQoYmFzZSwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gdW5pdC5jb3VudChiYXNlLCBkKTsgfSxcbiAgICBzdGVwLCBtaW4sIG1heCk7XG59XG5cbnZhciBsb2NhbGUgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS5zZWNvbmQsIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLm1pbnV0ZSwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUuaG91ciwgICBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS5kYXksICAgIGJhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUubW9udGgsICBiYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnllYXIsICAgYmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFNlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNaW51dGVzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ2hvdXJzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldEhvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCA0K2QpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0RGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoMTk3MCwgMCwgZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXRlKCk7IH0sXG4gICAgWzFdLCAxLCAzMVxuICApLFxuICBlbnRyeSgnbW9udGhzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCBkICUgMTIsIDEpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0TW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciB1dGMgPSBbXG4gIGNyZWF0ZSgnc2Vjb25kJywgZDNfdGltZS51dGNTZWNvbmQsIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdtaW51dGUnLCBkM190aW1lLnV0Y01pbnV0ZSwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ2hvdXInLCAgIGQzX3RpbWUudXRjSG91ciwgICB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnZGF5JywgICAgZDNfdGltZS51dGNEYXksICAgIHV0Y0Jhc2VEYXRlLCBbMSwgN10pLFxuICBjcmVhdGUoJ21vbnRoJywgIGQzX3RpbWUudXRjTW9udGgsICB1dGNCYXNlRGF0ZSwgWzEsIDMsIDZdKSxcbiAgY3JlYXRlKCd5ZWFyJywgICBkM190aW1lLnV0Y1llYXIsICAgdXRjQmFzZURhdGUpLFxuXG4gIC8vIHBlcmlvZGljIHVuaXRzXG4gIGVudHJ5KCdzZWNvbmRzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCAwLCBkKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENTZWNvbmRzKCk7IH0sXG4gICAgbnVsbCwgMCwgNTlcbiAgKSxcbiAgZW50cnkoJ21pbnV0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ01pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0hvdXJzKCk7IH0sXG4gICAgbnVsbCwgMCwgMjNcbiAgKSxcbiAgZW50cnkoJ3dlZWtkYXlzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCA0K2QpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RheSgpOyB9LFxuICAgIFsxXSwgMCwgNlxuICApLFxuICBlbnRyeSgnZGF0ZXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ0RhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIGQgJSAxMiwgMSkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTW9udGgoKTsgfSxcbiAgICBbMV0sIDAsIDExXG4gIClcbl07XG5cbnZhciBTVEVQUyA9IFtcbiAgWzMxNTM2ZTYsIDVdLCAgLy8gMS15ZWFyXG4gIFs3Nzc2ZTYsIDRdLCAgIC8vIDMtbW9udGhcbiAgWzI1OTJlNiwgNF0sICAgLy8gMS1tb250aFxuICBbMTIwOTZlNSwgM10sICAvLyAyLXdlZWtcbiAgWzYwNDhlNSwgM10sICAgLy8gMS13ZWVrXG4gIFsxNzI4ZTUsIDNdLCAgIC8vIDItZGF5XG4gIFs4NjRlNSwgM10sICAgIC8vIDEtZGF5XG4gIFs0MzJlNSwgMl0sICAgIC8vIDEyLWhvdXJcbiAgWzIxNmU1LCAyXSwgICAgLy8gNi1ob3VyXG4gIFsxMDhlNSwgMl0sICAgIC8vIDMtaG91clxuICBbMzZlNSwgMl0sICAgICAvLyAxLWhvdXJcbiAgWzE4ZTUsIDFdLCAgICAgLy8gMzAtbWludXRlXG4gIFs5ZTUsIDFdLCAgICAgIC8vIDE1LW1pbnV0ZVxuICBbM2U1LCAxXSwgICAgICAvLyA1LW1pbnV0ZVxuICBbNmU0LCAxXSwgICAgICAvLyAxLW1pbnV0ZVxuICBbM2U0LCAwXSwgICAgICAvLyAzMC1zZWNvbmRcbiAgWzE1ZTMsIDBdLCAgICAgLy8gMTUtc2Vjb25kXG4gIFs1ZTMsIDBdLCAgICAgIC8vIDUtc2Vjb25kXG4gIFsxZTMsIDBdICAgICAgIC8vIDEtc2Vjb25kXG5dO1xuXG5mdW5jdGlvbiBmaW5kKHVuaXRzLCBzcGFuLCBtaW5iLCBtYXhiKSB7XG4gIHZhciBzdGVwID0gU1RFUFNbMF0sIGksIG4sIGJpbnM7XG5cbiAgZm9yIChpPTEsIG49U1RFUFMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHN0ZXAgPSBTVEVQU1tpXTtcbiAgICBpZiAoc3BhbiA+IHN0ZXBbMF0pIHtcbiAgICAgIGJpbnMgPSBzcGFuIC8gc3RlcFswXTtcbiAgICAgIGlmIChiaW5zID4gbWF4Yikge1xuICAgICAgICByZXR1cm4gdW5pdHNbU1RFUFNbaS0xXVsxXV07XG4gICAgICB9XG4gICAgICBpZiAoYmlucyA+PSBtaW5iKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tzdGVwWzFdXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuaXRzW1NURVBTW24tMV1bMV1dO1xufVxuXG5mdW5jdGlvbiB0b1VuaXRNYXAodW5pdHMpIHtcbiAgdmFyIG1hcCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj11bml0cy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgbWFwW3VuaXRzW2ldLnR5cGVdID0gdW5pdHNbaV07XG4gIH1cbiAgbWFwLmZpbmQgPSBmdW5jdGlvbihzcGFuLCBtaW5iLCBtYXhiKSB7XG4gICAgcmV0dXJuIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpO1xuICB9O1xuICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvVW5pdE1hcChsb2NhbGUpO1xubW9kdWxlLmV4cG9ydHMudXRjID0gdG9Vbml0TWFwKHV0Yyk7XG4iLCJ2YXIgYnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJyksXG4gICAgdGltZSA9IHJlcXVpcmUoJy4vdGltZScpLFxuICAgIHV0YyA9IHRpbWUudXRjO1xuXG52YXIgdSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciBGTkFNRSA9ICdfX25hbWVfXyc7XG5cbnUubmFtZWRmdW5jID0gZnVuY3Rpb24obmFtZSwgZikgeyByZXR1cm4gKGZbRk5BTUVdID0gbmFtZSwgZik7IH07XG5cbnUubmFtZSA9IGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY9PW51bGwgPyBudWxsIDogZltGTkFNRV07IH07XG5cbnUuaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4OyB9O1xuXG51LnRydWUgPSB1Lm5hbWVkZnVuYygndHJ1ZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG5cbnUuZmFsc2UgPSB1Lm5hbWVkZnVuYygnZmFsc2UnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxudS5kdXBsaWNhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59O1xuXG51LmVxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpO1xufTtcblxudS5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgeCwgbmFtZSwgaT0xLCBsZW49YXJndW1lbnRzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHggPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChuYW1lIGluIHgpIHsgb2JqW25hbWVdID0geFtuYW1lXTsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG51Lmxlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Lmxlbmd0aCAhPSBudWxsID8geC5sZW5ndGggOiBudWxsO1xufTtcblxudS5rZXlzID0gZnVuY3Rpb24oeCkge1xuICB2YXIga2V5cyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkga2V5cy5wdXNoKGspO1xuICByZXR1cm4ga2V5cztcbn07XG5cbnUudmFscyA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHZhbHMgPSBbXSwgaztcbiAgZm9yIChrIGluIHgpIHZhbHMucHVzaCh4W2tdKTtcbiAgcmV0dXJuIHZhbHM7XG59O1xuXG51LnRvTWFwID0gZnVuY3Rpb24obGlzdCwgZikge1xuICByZXR1cm4gKGYgPSB1LiQoZikpID9cbiAgICBsaXN0LnJlZHVjZShmdW5jdGlvbihvYmosIHgpIHsgcmV0dXJuIChvYmpbZih4KV0gPSAxLCBvYmopOyB9LCB7fSkgOlxuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialt4XSA9IDEsIG9iaik7IH0sIHt9KTtcbn07XG5cbnUua2V5c3RyID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gIC8vIHVzZSB0byBlbnN1cmUgY29uc2lzdGVudCBrZXkgZ2VuZXJhdGlvbiBhY3Jvc3MgbW9kdWxlc1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIGlmICghbikgcmV0dXJuICcnO1xuICBmb3IgKHZhciBzPVN0cmluZyh2YWx1ZXNbMF0pLCBpPTE7IGk8bjsgKytpKSB7XG4gICAgcyArPSAnfCcgKyBTdHJpbmcodmFsdWVzW2ldKTtcbiAgfVxuICByZXR1cm4gcztcbn07XG5cbi8vIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnUuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG51LmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnUuaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbnUuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG51LmlzTnVtYmVyID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxudS5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG51LmlzRGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG51LmlzVmFsaWQgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqO1xufTtcblxudS5pc0J1ZmZlciA9IChidWZmZXIuQnVmZmVyICYmIGJ1ZmZlci5CdWZmZXIuaXNCdWZmZXIpIHx8IHUuZmFsc2U7XG5cbi8vIHR5cGUgY29lcmNpb24gZnVuY3Rpb25zXG5cbnUubnVtYmVyID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6ICtzO1xufTtcblxudS5ib29sZWFuID0gZnVuY3Rpb24ocykge1xuICByZXR1cm4gcyA9PSBudWxsIHx8IHMgPT09ICcnID8gbnVsbCA6IHM9PT0nZmFsc2UnID8gZmFsc2UgOiAhIXM7XG59O1xuXG51LmRhdGUgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogRGF0ZS5wYXJzZShzKTtcbn07XG5cbnUuYXJyYXkgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgPyAodS5pc0FycmF5KHgpID8geCA6IFt4XSkgOiBbXTtcbn07XG5cbnUuc3RyID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gdS5pc0FycmF5KHgpID8gJ1snICsgeC5tYXAodS5zdHIpICsgJ10nXG4gICAgOiB1LmlzT2JqZWN0KHgpID8gSlNPTi5zdHJpbmdpZnkoeClcbiAgICA6IHUuaXNTdHJpbmcoeCkgPyAoJ1xcJycrdXRpbF9lc2NhcGVfc3RyKHgpKydcXCcnKSA6IHg7XG59O1xuXG52YXIgZXNjYXBlX3N0cl9yZSA9IC8oXnxbXlxcXFxdKScvZztcblxuZnVuY3Rpb24gdXRpbF9lc2NhcGVfc3RyKHgpIHtcbiAgcmV0dXJuIHgucmVwbGFjZShlc2NhcGVfc3RyX3JlLCAnJDFcXFxcXFwnJyk7XG59XG5cbi8vIGRhdGEgYWNjZXNzIGZ1bmN0aW9uc1xuXG52YXIgZmllbGRfcmUgPSAvXFxbKC4qPylcXF18W14uXFxbXSsvZztcblxudS5maWVsZCA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIFN0cmluZyhmKS5tYXRjaChmaWVsZF9yZSkubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZFswXSAhPT0gJ1snID8gZCA6XG4gICAgICBkWzFdICE9PSBcIidcIiAmJiBkWzFdICE9PSAnXCInID8gZC5zbGljZSgxLCAtMSkgOlxuICAgICAgZC5zbGljZSgyLCAtMikucmVwbGFjZSgvXFxcXChbXCInXSkvZywgJyQxJyk7XG4gIH0pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIChzID0gdS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBzLnJlZHVjZShmdW5jdGlvbih4LGYpIHsgcmV0dXJuIHhbZl07IH0sIHgpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHhbZl07IH1cbiAgICApO1xufTtcblxuLy8gc2hvcnQtY3V0IGZvciBhY2Nlc3NvclxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxuXG51LiRmdW5jID0gZnVuY3Rpb24obmFtZSwgb3ApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGYpIHtcbiAgICBmID0gdS4kKGYpIHx8IHUuaWRlbnRpdHk7XG4gICAgdmFyIG4gPSBuYW1lICsgKHUubmFtZShmKSA/ICdfJyt1Lm5hbWUoZikgOiAnJyk7XG4gICAgcmV0dXJuIHUubmFtZWRmdW5jKG4sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG9wKGYoZCkpOyB9KTtcbiAgfTtcbn07XG5cbnUuJHZhbGlkICA9IHUuJGZ1bmMoJ3ZhbGlkJywgdS5pc1ZhbGlkKTtcbnUuJGxlbmd0aCA9IHUuJGZ1bmMoJ2xlbmd0aCcsIHUubGVuZ3RoKTtcblxudS4kaW4gPSBmdW5jdGlvbihmLCB2YWx1ZXMpIHtcbiAgZiA9IHUuJChmKTtcbiAgdmFyIG1hcCA9IHUuaXNBcnJheSh2YWx1ZXMpID8gdS50b01hcCh2YWx1ZXMpIDogdmFsdWVzO1xuICByZXR1cm4gZnVuY3Rpb24oZCkgeyByZXR1cm4gISFtYXBbZihkKV07IH07XG59O1xuXG51LiR5ZWFyICAgPSB1LiRmdW5jKCd5ZWFyJywgdGltZS55ZWFyLnVuaXQpO1xudS4kbW9udGggID0gdS4kZnVuYygnbW9udGgnLCB0aW1lLm1vbnRocy51bml0KTtcbnUuJGRhdGUgICA9IHUuJGZ1bmMoJ2RhdGUnLCB0aW1lLmRhdGVzLnVuaXQpO1xudS4kZGF5ICAgID0gdS4kZnVuYygnZGF5JywgdGltZS53ZWVrZGF5cy51bml0KTtcbnUuJGhvdXIgICA9IHUuJGZ1bmMoJ2hvdXInLCB0aW1lLmhvdXJzLnVuaXQpO1xudS4kbWludXRlID0gdS4kZnVuYygnbWludXRlJywgdGltZS5taW51dGVzLnVuaXQpO1xudS4kc2Vjb25kID0gdS4kZnVuYygnc2Vjb25kJywgdGltZS5zZWNvbmRzLnVuaXQpO1xuXG51LiR1dGNZZWFyICAgPSB1LiRmdW5jKCd1dGNZZWFyJywgdXRjLnllYXIudW5pdCk7XG51LiR1dGNNb250aCAgPSB1LiRmdW5jKCd1dGNNb250aCcsIHV0Yy5tb250aHMudW5pdCk7XG51LiR1dGNEYXRlICAgPSB1LiRmdW5jKCd1dGNEYXRlJywgdXRjLmRhdGVzLnVuaXQpO1xudS4kdXRjRGF5ICAgID0gdS4kZnVuYygndXRjRGF5JywgdXRjLndlZWtkYXlzLnVuaXQpO1xudS4kdXRjSG91ciAgID0gdS4kZnVuYygndXRjSG91cicsIHV0Yy5ob3Vycy51bml0KTtcbnUuJHV0Y01pbnV0ZSA9IHUuJGZ1bmMoJ3V0Y01pbnV0ZScsIHV0Yy5taW51dGVzLnVuaXQpO1xudS4kdXRjU2Vjb25kID0gdS4kZnVuYygndXRjU2Vjb25kJywgdXRjLnNlY29uZHMudW5pdCk7XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLGIpIHtcbiAgICB2YXIgaSwgbiwgZiwgeCwgeTtcbiAgICBmb3IgKGk9MCwgbj1zb3J0Lmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGYgPSBzb3J0W2ldOyB4ID0gZihhKTsgeSA9IGYoYik7XG4gICAgICBpZiAoeCA8IHkpIHJldHVybiAtMSAqIHNpZ25baV07XG4gICAgICBpZiAoeCA+IHkpIHJldHVybiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChhID49IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChhID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gTmFOO1xufTtcblxudS5udW1jbXAgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcblxudS5zdGFibGVzb3J0ID0gZnVuY3Rpb24oYXJyYXksIHNvcnRCeSwga2V5Rm4pIHtcbiAgdmFyIGluZGljZXMgPSBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oaWR4LCB2LCBpKSB7XG4gICAgcmV0dXJuIChpZHhba2V5Rm4odildID0gaSwgaWR4KTtcbiAgfSwge30pO1xuXG4gIGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzYSA9IHNvcnRCeShhKSxcbiAgICAgICAgc2IgPSBzb3J0QnkoYik7XG4gICAgcmV0dXJuIHNhIDwgc2IgPyAtMSA6IHNhID4gc2IgPyAxXG4gICAgICAgICA6IChpbmRpY2VzW2tleUZuKGEpXSAtIGluZGljZXNba2V5Rm4oYildKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4vLyBzdHJpbmcgZnVuY3Rpb25zXG5cbnUucGFkID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHBhZGNoYXIpIHtcbiAgcGFkY2hhciA9IHBhZGNoYXIgfHwgXCIgXCI7XG4gIHZhciBkID0gbGVuZ3RoIC0gcy5sZW5ndGg7XG4gIGlmIChkIDw9IDApIHJldHVybiBzO1xuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIHN0cnJlcChkLCBwYWRjaGFyKSArIHM7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIHN0cnJlcChNYXRoLmZsb29yKGQvMiksIHBhZGNoYXIpICtcbiAgICAgICAgIHMgKyBzdHJyZXAoTWF0aC5jZWlsKGQvMiksIHBhZGNoYXIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcyArIHN0cnJlcChkLCBwYWRjaGFyKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RycmVwKG4sIHN0cikge1xuICB2YXIgcyA9IFwiXCIsIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgcyArPSBzdHI7XG4gIHJldHVybiBzO1xufVxuXG51LnRydW5jYXRlID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHdvcmQsIGVsbGlwc2lzKSB7XG4gIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgaWYgKGxlbiA8PSBsZW5ndGgpIHJldHVybiBzO1xuICBlbGxpcHNpcyA9IGVsbGlwc2lzICE9PSB1bmRlZmluZWQgPyBTdHJpbmcoZWxsaXBzaXMpIDogJ1xcdTIwMjYnO1xuICB2YXIgbCA9IE1hdGgubWF4KDAsIGxlbmd0aCAtIGVsbGlwc2lzLmxlbmd0aCk7XG5cbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsLDEpIDogcy5zbGljZShsZW4tbCkpO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHZhciBsMSA9IE1hdGguY2VpbChsLzIpLCBsMiA9IE1hdGguZmxvb3IobC8yKTtcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDEpIDogcy5zbGljZSgwLGwxKSkgK1xuICAgICAgICBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMiwxKSA6IHMuc2xpY2UobGVuLWwyKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCkgOiBzLnNsaWNlKDAsbCkpICsgZWxsaXBzaXM7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHRydW5jYXRlT25Xb3JkKHMsIGxlbiwgcmV2KSB7XG4gIHZhciBjbnQgPSAwLCB0b2sgPSBzLnNwbGl0KHRydW5jYXRlX3dvcmRfcmUpO1xuICBpZiAocmV2KSB7XG4gICAgcyA9ICh0b2sgPSB0b2sucmV2ZXJzZSgpKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pXG4gICAgICAucmV2ZXJzZSgpO1xuICB9IGVsc2Uge1xuICAgIHMgPSB0b2suZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSk7XG4gIH1cbiAgcmV0dXJuIHMubGVuZ3RoID8gcy5qb2luKCcnKS50cmltKCkgOiB0b2tbMF0uc2xpY2UoMCwgbGVuKTtcbn1cblxudmFyIHRydW5jYXRlX3dvcmRfcmUgPSAvKFtcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MjAyOFxcdTIwMjlcXHUzMDAwXFx1RkVGRl0pLztcbiJdfQ==
