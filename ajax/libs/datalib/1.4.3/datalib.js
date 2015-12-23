(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.dsv = {}));
}(this, function (exports) { 'use strict';

  var dsv = function(delimiter) {
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
  }

  exports.csv = dsv(",");
  exports.tsv = dsv("\t");

  exports.dsv = dsv;

}));
},{}],3:[function(require,module,exports){
if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
} else (function() {
  var m = new Map;
  if (m.set(0, 0) !== m) {
    m = m.set;
    Map.prototype.set = function() { m.apply(this, arguments); return this; };
  }
})();

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.format = {}));
}(this, function (exports) { 'use strict';

  var zhCn = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["¥", ""]
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

  var itIt = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["€", ""]
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
  }

  function exponent(x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  }

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
        : "0." + new Array(1 - i).join("0") + formatDecimal(x, p + i - 1)[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

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
  }

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
  }

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
  }

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
  }

  function precisionRound(step, max) {
    return Math.max(0, exponent(Math.abs(max)) - exponent(Math.abs(step))) + 1;
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  var localeDefinitions = (new Map)
      .set("ca-ES", caEs)
      .set("de-DE", deDe)
      .set("en-CA", enCa)
      .set("en-GB", enGb)
      .set("en-US", enUs)
      .set("es-ES", esEs)
      .set("fi-FI", fiFi)
      .set("fr-CA", frCa)
      .set("fr-FR", frFr)
      .set("he-IL", heIl)
      .set("it-IT", itIt)
      .set("mk-MK", mkMk)
      .set("nl-NL", nlNl)
      .set("pl-PL", plPl)
      .set("pt-BR", ptBr)
      .set("ru-RU", ruRu)
      .set("zh-CN", zhCn);

  var defaultLocale = locale(enUs);
  exports.format = defaultLocale.format;
  exports.formatPrefix = defaultLocale.formatPrefix;

  function localeFormat(definition) {
    if (typeof definition === "string") {
      definition = localeDefinitions.get(definition);
      if (!definition) return null;
    }
    return locale(definition);
  }
  ;

  exports.localeFormat = localeFormat;
  exports.formatSpecifier = formatSpecifier;
  exports.precisionFixed = precisionFixed;
  exports.precisionPrefix = precisionPrefix;
  exports.precisionRound = precisionRound;

}));
},{}],4:[function(require,module,exports){
if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
} else (function() {
  var m = new Map;
  if (m.set(0, 0) !== m) {
    m = m.set;
    Map.prototype.set = function() { m.apply(this, arguments); return this; };
  }
})();

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.timeFormat = {}));
}(this, function (exports) { 'use strict';

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

  var enUs = {
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
  }

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

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
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

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  });

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
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
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
      var n = periodLookup.get(string.slice(i, i += 2).toLowerCase());
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
  }

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
    var map = new Map, i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
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
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5))
        ? (d.Z = -string, i + 5) // sign differs from getTimezoneOffset!
        : -1;
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
    return pad(1 + day.count(year(d), d), p, 3);
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
    return pad(sunday.count(year(d), d), p, 2);
  }

  function formatWeekdayNumber(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year(d), d), p, 2);
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
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
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
    return pad(utcSunday.count(utcYear(d), d), p, 2);
  }

  function formatUTCWeekdayNumber(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d), d), p, 2);
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
      : enUs.utcFormat(isoSpecifier);

  var isoFormat = formatIso;

  var localeDefinitions = (new Map)
      .set("ca-ES", caEs)
      .set("de-DE", deDe)
      .set("en-CA", enCa)
      .set("en-GB", enGb)
      .set("en-US", enUs)
      .set("es-ES", esEs)
      .set("fi-FI", fiFi)
      .set("fr-CA", frCa)
      .set("fr-FR", frFr)
      .set("he-IL", heIl)
      .set("it-IT", itIt)
      .set("mk-MK", mkMk)
      .set("nl-NL", nlNl)
      .set("pl-PL", plPl)
      .set("pt-BR", ptBr)
      .set("ru-RU", ruRu)
      .set("zh-CN", zhCn);

  var defaultLocale = locale(enUs);
  exports.format = defaultLocale.format;
  exports.utcFormat = defaultLocale.utcFormat;

  function localeFormat(definition) {
    if (typeof definition === "string") {
      definition = localeDefinitions.get(definition);
      if (!definition) return null;
    }
    return locale(definition);
  }
  ;

  exports.localeFormat = localeFormat;
  exports.isoFormat = isoFormat;

}));
},{}],5:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.time = {}));
}(this, function (exports) { 'use strict';

  var t1 = new Date;

  var t0 = new Date;

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
  }

  var second = newInterval(function(date) {
    date.setMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  exports.seconds = second.range;

  var minute = newInterval(function(date) {
    date.setSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  exports.minutes = minute.range;

  var hour = newInterval(function(date) {
    date.setMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  exports.hours = hour.range;

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  });

  exports.days = day.range;

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

  exports.sunday = weekday(0);

  exports.sundays = exports.sunday.range;

  exports.monday = weekday(1);

  exports.mondays = exports.monday.range;

  exports.tuesday = weekday(2);

  exports.tuesdays = exports.tuesday.range;

  exports.wednesday = weekday(3);

  exports.wednesdays = exports.wednesday.range;

  exports.thursday = weekday(4);

  exports.thursdays = exports.thursday.range;

  exports.friday = weekday(5);

  exports.fridays = exports.friday.range;

  exports.saturday = weekday(6);

  exports.saturdays = exports.saturday.range;

  var week = exports.sunday;

  exports.weeks = week.range;

  var month = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  });

  exports.months = month.range;

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  });

  exports.years = year.range;

  var utcSecond = newInterval(function(date) {
    date.setUTCMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  exports.utcSeconds = utcSecond.range;

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  exports.utcMinutes = utcMinute.range;

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  exports.utcHours = utcHour.range;

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / 864e5;
  });

  exports.utcDays = utcDay.range;

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

  exports.utcSunday = utcWeekday(0);

  exports.utcSundays = exports.utcSunday.range;

  exports.utcMonday = utcWeekday(1);

  exports.utcMondays = exports.utcMonday.range;

  exports.utcTuesday = utcWeekday(2);

  exports.utcTuesdays = exports.utcTuesday.range;

  exports.utcWednesday = utcWeekday(3);

  exports.utcWednesdays = exports.utcWednesday.range;

  exports.utcThursday = utcWeekday(4);

  exports.utcThursdays = exports.utcThursday.range;

  exports.utcFriday = utcWeekday(5);

  exports.utcFridays = exports.utcFriday.range;

  exports.utcSaturday = utcWeekday(6);

  exports.utcSaturdays = exports.utcSaturday.range;

  var utcWeek = exports.utcSunday;

  exports.utcWeeks = utcWeek.range;

  var utcMonth = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(1);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  });

  exports.utcMonths = utcMonth.range;

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  });

  exports.utcYears = utcYear.range;

  exports.interval = newInterval;
  exports.second = second;
  exports.minute = minute;
  exports.hour = hour;
  exports.day = day;
  exports.week = week;
  exports.month = month;
  exports.year = year;
  exports.utcSecond = utcSecond;
  exports.utcMinute = utcMinute;
  exports.utcHour = utcHour;
  exports.utcDay = utcDay;
  exports.utcWeek = utcWeek;
  exports.utcMonth = utcMonth;
  exports.utcYear = utcYear;

}));
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
  return this._cells[key] || (this._cells[key] = this._newcell(x));
};

proto._newcell = function(x) {
  var cell = {
    num:   0,
    tuple: this._newtuple(x),
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

proto.changes = function() {
  var changes = {add:[], rem:[], mod:[]},
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
      changes.rem.push(cell.tuple);
      delete this._cells[k];
    } else if (flag & Flags.ADD_CELL) {
      changes.add.push(cell.tuple);
    } else if (flag & Flags.MOD_CELL) {
      changes.mod.push(cell.tuple);
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
  if (count == null) count = 10;

  var start = domain[0],
      stop = domain[domain.length - 1];

  if (stop < start) { error = stop; stop = start; start = error; }

  var span = stop - start,
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

function numberAutoFormat(domain, count, f) {
  var range = intervals(domain, count);
  if (f == null) {
    f = ',.' + d3_numberF.precisionFixed(range[2]) + 'f';
  } else {
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

module.exports = function(data, format) {
  data = json(data, format);
  return toTable(data, (format && format.children));
};

function toTable(root, childrenField) {
  childrenField = childrenField || 'children';
  var table = [];
  
  function visit(node) {
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
  version:    '1.4.3',
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

u.field = function(f) {
  return String(f).split('\\.')
    .map(function(d) { return d.split('.'); })
    .reduce(function(a, b) {
      if (a.length) { a[a.length-1] += '.' + b.shift(); }
      a.push.apply(a, b);
      return a;
    }, []);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2QzLWRzdi9idWlsZC9kc3YuanMiLCJub2RlX21vZHVsZXMvZDMtZm9ybWF0L2J1aWxkL2Zvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lLWZvcm1hdC9idWlsZC90aW1lRm9ybWF0LmpzIiwibm9kZV9tb2R1bGVzL2QzLXRpbWUvYnVpbGQvdGltZS5qcyIsInNyYy9hZ2dyZWdhdGUvYWdncmVnYXRvci5qcyIsInNyYy9hZ2dyZWdhdGUvY29sbGVjdG9yLmpzIiwic3JjL2FnZ3JlZ2F0ZS9ncm91cGJ5LmpzIiwic3JjL2FnZ3JlZ2F0ZS9tZWFzdXJlcy5qcyIsInNyYy9iaW5zL2JpbnMuanMiLCJzcmMvYmlucy9oaXN0b2dyYW0uanMiLCJzcmMvZm9ybWF0LmpzIiwic3JjL2dlbmVyYXRlLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL2Rzdi5qcyIsInNyYy9pbXBvcnQvZm9ybWF0cy9pbmRleC5qcyIsInNyYy9pbXBvcnQvZm9ybWF0cy9qc29uLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL3RvcG9qc29uLmpzIiwic3JjL2ltcG9ydC9mb3JtYXRzL3RyZWVqc29uLmpzIiwic3JjL2ltcG9ydC9sb2FkLmpzIiwic3JjL2ltcG9ydC9yZWFkLmpzIiwic3JjL2ltcG9ydC9yZWFkZXJzLmpzIiwic3JjL2ltcG9ydC90eXBlLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3ByaW50LmpzIiwic3JjL3N0YXRzLmpzIiwic3JjL3RlbXBsYXRlLmpzIiwic3JjL3RpbWUuanMiLCJzcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLG51bGwsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgZmFjdG9yeSgoZ2xvYmFsLmRzdiA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZHN2ID0gZnVuY3Rpb24oZGVsaW1pdGVyKSB7XG4gICAgdmFyIHJlRm9ybWF0ID0gbmV3IFJlZ0V4cChcIltcXFwiXCIgKyBkZWxpbWl0ZXIgKyBcIlxcbl1cIiksXG4gICAgICAgIGRlbGltaXRlckNvZGUgPSBkZWxpbWl0ZXIuY2hhckNvZGVBdCgwKTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlKHRleHQsIGYpIHtcbiAgICAgIHZhciBvO1xuICAgICAgcmV0dXJuIHBhcnNlUm93cyh0ZXh0LCBmdW5jdGlvbihyb3csIGkpIHtcbiAgICAgICAgaWYgKG8pIHJldHVybiBvKHJvdywgaSAtIDEpO1xuICAgICAgICB2YXIgYSA9IG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgcm93Lm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCI6IGRbXCIgKyBpICsgXCJdXCI7XG4gICAgICAgIH0pLmpvaW4oXCIsXCIpICsgXCJ9XCIpO1xuICAgICAgICBvID0gZiA/IGZ1bmN0aW9uKHJvdywgaSkgeyByZXR1cm4gZihhKHJvdyksIGkpOyB9IDogYTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlUm93cyh0ZXh0LCBmKSB7XG4gICAgICB2YXIgRU9MID0ge30sIC8vIHNlbnRpbmVsIHZhbHVlIGZvciBlbmQtb2YtbGluZVxuICAgICAgICAgIEVPRiA9IHt9LCAvLyBzZW50aW5lbCB2YWx1ZSBmb3IgZW5kLW9mLWZpbGVcbiAgICAgICAgICByb3dzID0gW10sIC8vIG91dHB1dCByb3dzXG4gICAgICAgICAgTiA9IHRleHQubGVuZ3RoLFxuICAgICAgICAgIEkgPSAwLCAvLyBjdXJyZW50IGNoYXJhY3RlciBpbmRleFxuICAgICAgICAgIG4gPSAwLCAvLyB0aGUgY3VycmVudCBsaW5lIG51bWJlclxuICAgICAgICAgIHQsIC8vIHRoZSBjdXJyZW50IHRva2VuXG4gICAgICAgICAgZW9sOyAvLyBpcyB0aGUgY3VycmVudCB0b2tlbiBmb2xsb3dlZCBieSBFT0w/XG5cbiAgICAgIGZ1bmN0aW9uIHRva2VuKCkge1xuICAgICAgICBpZiAoSSA+PSBOKSByZXR1cm4gRU9GOyAvLyBzcGVjaWFsIGNhc2U6IGVuZCBvZiBmaWxlXG4gICAgICAgIGlmIChlb2wpIHJldHVybiBlb2wgPSBmYWxzZSwgRU9MOyAvLyBzcGVjaWFsIGNhc2U6IGVuZCBvZiBsaW5lXG5cbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBxdW90ZXNcbiAgICAgICAgdmFyIGogPSBJO1xuICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGopID09PSAzNCkge1xuICAgICAgICAgIHZhciBpID0gajtcbiAgICAgICAgICB3aGlsZSAoaSsrIDwgTikge1xuICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpKSA9PT0gMzQpIHtcbiAgICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMSkgIT09IDM0KSBicmVhaztcbiAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBJID0gaSArIDI7XG4gICAgICAgICAgdmFyIGMgPSB0ZXh0LmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgIGlmIChjID09PSAxMykge1xuICAgICAgICAgICAgZW9sID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSArIDIpID09PSAxMCkgKytJO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gMTApIHtcbiAgICAgICAgICAgIGVvbCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGogKyAxLCBpKS5yZXBsYWNlKC9cIlwiL2csIFwiXFxcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlOiBmaW5kIG5leHQgZGVsaW1pdGVyIG9yIG5ld2xpbmVcbiAgICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgICAgdmFyIGMgPSB0ZXh0LmNoYXJDb2RlQXQoSSsrKSwgayA9IDE7XG4gICAgICAgICAgaWYgKGMgPT09IDEwKSBlb2wgPSB0cnVlOyAvLyBcXG5cbiAgICAgICAgICBlbHNlIGlmIChjID09PSAxMykgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSAxMCkgKytJLCArK2s7IH0gLy8gXFxyfFxcclxcblxuICAgICAgICAgIGVsc2UgaWYgKGMgIT09IGRlbGltaXRlckNvZGUpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGosIEkgLSBrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZTogbGFzdCB0b2tlbiBiZWZvcmUgRU9GXG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGopO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoKHQgPSB0b2tlbigpKSAhPT0gRU9GKSB7XG4gICAgICAgIHZhciBhID0gW107XG4gICAgICAgIHdoaWxlICh0ICE9PSBFT0wgJiYgdCAhPT0gRU9GKSB7XG4gICAgICAgICAgYS5wdXNoKHQpO1xuICAgICAgICAgIHQgPSB0b2tlbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmICYmIChhID0gZihhLCBuKyspKSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgcm93cy5wdXNoKGEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm93cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQocm93cykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm93c1swXSkpIHJldHVybiBmb3JtYXRSb3dzKHJvd3MpOyAvLyBkZXByZWNhdGVkOyB1c2UgZm9ybWF0Um93c1xuICAgICAgdmFyIGZpZWxkU2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgZmllbGRzID0gW107XG5cbiAgICAgIC8vIENvbXB1dGUgdW5pcXVlIGZpZWxkcyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG4gICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIGZvciAodmFyIGZpZWxkIGluIHJvdykge1xuICAgICAgICAgIGlmICghKChmaWVsZCArPSBcIlwiKSBpbiBmaWVsZFNldCkpIHtcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkU2V0W2ZpZWxkXSA9IGZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gW2ZpZWxkcy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKV0uY29uY2F0KHJvd3MubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgICByZXR1cm4gZmllbGRzLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgIHJldHVybiBmb3JtYXRWYWx1ZShyb3dbZmllbGRdKTtcbiAgICAgICAgfSkuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgfSkpLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0Um93cyhyb3dzKSB7XG4gICAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFJvdyhyb3cpIHtcbiAgICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VmFsdWUodGV4dCkge1xuICAgICAgcmV0dXJuIHJlRm9ybWF0LnRlc3QodGV4dCkgPyBcIlxcXCJcIiArIHRleHQucmVwbGFjZSgvXFxcIi9nLCBcIlxcXCJcXFwiXCIpICsgXCJcXFwiXCIgOiB0ZXh0O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXJzZTogcGFyc2UsXG4gICAgICBwYXJzZVJvd3M6IHBhcnNlUm93cyxcbiAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgZm9ybWF0Um93czogZm9ybWF0Um93c1xuICAgIH07XG4gIH1cblxuICBleHBvcnRzLmNzdiA9IGRzdihcIixcIik7XG4gIGV4cG9ydHMudHN2ID0gZHN2KFwiXFx0XCIpO1xuXG4gIGV4cG9ydHMuZHN2ID0gZHN2O1xuXG59KSk7IiwiaWYgKHR5cGVvZiBNYXAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgTWFwID0gZnVuY3Rpb24oKSB7IHRoaXMuY2xlYXIoKTsgfTtcbiAgTWFwLnByb3RvdHlwZSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKGssIHYpIHsgdGhpcy5fW2tdID0gdjsgcmV0dXJuIHRoaXM7IH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrKSB7IHJldHVybiB0aGlzLl9ba107IH0sXG4gICAgaGFzOiBmdW5jdGlvbihrKSB7IHJldHVybiBrIGluIHRoaXMuXzsgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKGspIHsgcmV0dXJuIGsgaW4gdGhpcy5fICYmIGRlbGV0ZSB0aGlzLl9ba107IH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkgeyB0aGlzLl8gPSBPYmplY3QuY3JlYXRlKG51bGwpOyB9LFxuICAgIGdldCBzaXplKCkgeyB2YXIgbiA9IDA7IGZvciAodmFyIGsgaW4gdGhpcy5fKSArK247IHJldHVybiBuOyB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGMpIHsgZm9yICh2YXIgayBpbiB0aGlzLl8pIGModGhpcy5fW2tdLCBrLCB0aGlzKTsgfVxuICB9O1xufSBlbHNlIChmdW5jdGlvbigpIHtcbiAgdmFyIG0gPSBuZXcgTWFwO1xuICBpZiAobS5zZXQoMCwgMCkgIT09IG0pIHtcbiAgICBtID0gbS5zZXQ7XG4gICAgTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbigpIHsgbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gdGhpczsgfTtcbiAgfVxufSkoKTtcblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwuZm9ybWF0ID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB6aENuID0ge1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiwqVcIiwgXCJcIl1cbiAgfTtcblxuICB2YXIgcnVSdSA9IHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNGA0YPQsS5cIl1cbiAgfTtcblxuICB2YXIgcHRCciA9IHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlIkXCIsIFwiXCJdXG4gIH07XG5cbiAgdmFyIHBsUGwgPSB7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJ6xYJcIl1cbiAgfTtcblxuICB2YXIgbmxObCA9IHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCrFxceGEwXCIsIFwiXCJdXG4gIH07XG5cbiAgdmFyIG1rTWsgPSB7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMNC00LXQvS5cIl1cbiAgfTtcblxuICB2YXIgaXRJdCA9IHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiLlwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIuKCrFwiLCBcIlwiXVxuICB9O1xuXG4gIHZhciBoZUlsID0ge1xuICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgIHRob3VzYW5kczogXCIsXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wi4oKqXCIsIFwiXCJdXG4gIH07XG5cbiAgdmFyIGZyRnIgPSB7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMOKCrFwiXVxuICB9O1xuXG4gIHZhciBmckNhID0ge1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCJcXHhhMFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIlwiLCBcIiRcIl1cbiAgfTtcblxuICB2YXIgZmlGaSA9IHtcbiAgICBkZWNpbWFsOiBcIixcIixcbiAgICB0aG91c2FuZHM6IFwiXFx4YTBcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMOKCrFwiXVxuICB9O1xuXG4gIHZhciBlc0VzID0ge1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbiAgfTtcblxuICB2YXIgZW5VcyA9IHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbiAgfTtcblxuICB2YXIgZW5HYiA9IHtcbiAgICBkZWNpbWFsOiBcIi5cIixcbiAgICB0aG91c2FuZHM6IFwiLFwiLFxuICAgIGdyb3VwaW5nOiBbM10sXG4gICAgY3VycmVuY3k6IFtcIsKjXCIsIFwiXCJdXG4gIH07XG5cbiAgdmFyIGVuQ2EgPSB7XG4gICAgZGVjaW1hbDogXCIuXCIsXG4gICAgdGhvdXNhbmRzOiBcIixcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCIkXCIsIFwiXCJdXG4gIH07XG5cbiAgdmFyIGRlRGUgPSB7XG4gICAgZGVjaW1hbDogXCIsXCIsXG4gICAgdGhvdXNhbmRzOiBcIi5cIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCJcIiwgXCJcXHhhMOKCrFwiXVxuICB9O1xuXG4gIHZhciBjYUVzID0ge1xuICAgIGRlY2ltYWw6IFwiLFwiLFxuICAgIHRob3VzYW5kczogXCIuXCIsXG4gICAgZ3JvdXBpbmc6IFszXSxcbiAgICBjdXJyZW5jeTogW1wiXCIsIFwiXFx4YTDigqxcIl1cbiAgfTtcblxuXG4gIC8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbiAgLy8gc2lnbmlmaWNhbnQgZGlnaXRzIHAsIHdoZXJlIHggaXMgcG9zaXRpdmUgYW5kIHAgaXMgaW4gWzEsIDIxXSBvciB1bmRlZmluZWQuXG4gIC8vIEZvciBleGFtcGxlLCBmb3JtYXREZWNpbWFsKDEuMjMpIHJldHVybnMgW1wiMTIzXCIsIDBdLlxuICBmdW5jdGlvbiBmb3JtYXREZWNpbWFsKHgsIHApIHtcbiAgICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgICB2YXIgaSwgY29lZmZpY2llbnQgPSB4LnNsaWNlKDAsIGkpO1xuXG4gICAgLy8gVGhlIHN0cmluZyByZXR1cm5lZCBieSB0b0V4cG9uZW50aWFsIGVpdGhlciBoYXMgdGhlIGZvcm0gXFxkXFwuXFxkK2VbLStdXFxkK1xuICAgIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gICAgcmV0dXJuIFtcbiAgICAgIGNvZWZmaWNpZW50Lmxlbmd0aCA+IDEgPyBjb2VmZmljaWVudFswXSArIGNvZWZmaWNpZW50LnNsaWNlKDIpIDogY29lZmZpY2llbnQsXG4gICAgICAreC5zbGljZShpICsgMSlcbiAgICBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb25lbnQoeCkge1xuICAgIHJldHVybiB4ID0gZm9ybWF0RGVjaW1hbChNYXRoLmFicyh4KSksIHggPyB4WzFdIDogTmFOO1xuICB9XG5cbiAgdmFyIHByZWZpeEV4cG9uZW50O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFByZWZpeEF1dG8oeCwgcCkge1xuICAgIHZhciBkID0gZm9ybWF0RGVjaW1hbCh4LCBwKTtcbiAgICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgICBleHBvbmVudCA9IGRbMV0sXG4gICAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gaSA9PT0gbiA/IGNvZWZmaWNpZW50XG4gICAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgICAgOiBcIjAuXCIgKyBuZXcgQXJyYXkoMSAtIGkpLmpvaW4oXCIwXCIpICsgZm9ybWF0RGVjaW1hbCh4LCBwICsgaSAtIDEpWzBdOyAvLyBsZXNzIHRoYW4gMXkhXG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3VuZGVkKHgsIHApIHtcbiAgICB2YXIgZCA9IGZvcm1hdERlY2ltYWwoeCwgcCk7XG4gICAgaWYgKCFkKSByZXR1cm4geCArIFwiXCI7XG4gICAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICAgIHJldHVybiBleHBvbmVudCA8IDAgPyBcIjAuXCIgKyBuZXcgQXJyYXkoLWV4cG9uZW50KS5qb2luKFwiMFwiKSArIGNvZWZmaWNpZW50XG4gICAgICAgIDogY29lZmZpY2llbnQubGVuZ3RoID4gZXhwb25lbnQgKyAxID8gY29lZmZpY2llbnQuc2xpY2UoMCwgZXhwb25lbnQgKyAxKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoZXhwb25lbnQgKyAxKVxuICAgICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXREZWZhdWx0KHgsIHApIHtcbiAgICB4ID0geC50b1ByZWNpc2lvbihwKTtcblxuICAgIG91dDogZm9yICh2YXIgbiA9IHgubGVuZ3RoLCBpID0gMSwgaTAgPSAtMSwgaTE7IGkgPCBuOyArK2kpIHtcbiAgICAgIHN3aXRjaCAoeFtpXSkge1xuICAgICAgICBjYXNlIFwiLlwiOiBpMCA9IGkxID0gaTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIwXCI6IGlmIChpMCA9PT0gMCkgaTAgPSBpOyBpMSA9IGk7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiZVwiOiBicmVhayBvdXQ7XG4gICAgICAgIGRlZmF1bHQ6IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGkwID4gMCA/IHguc2xpY2UoMCwgaTApICsgeC5zbGljZShpMSArIDEpIDogeDtcbiAgfVxuXG4gIHZhciBmb3JtYXRUeXBlcyA9IHtcbiAgICBcIlwiOiBmb3JtYXREZWZhdWx0LFxuICAgIFwiJVwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiAoeCAqIDEwMCkudG9GaXhlZChwKTsgfSxcbiAgICBcImJcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygyKTsgfSxcbiAgICBcImNcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4geCArIFwiXCI7IH0sXG4gICAgXCJkXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTApOyB9LFxuICAgIFwiZVwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiB4LnRvRXhwb25lbnRpYWwocCk7IH0sXG4gICAgXCJmXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9GaXhlZChwKTsgfSxcbiAgICBcImdcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b1ByZWNpc2lvbihwKTsgfSxcbiAgICBcIm9cIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZyg4KTsgfSxcbiAgICBcInBcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKTsgfSxcbiAgICBcInJcIjogZm9ybWF0Um91bmRlZCxcbiAgICBcInNcIjogZm9ybWF0UHJlZml4QXV0byxcbiAgICBcIlhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfSxcbiAgICBcInhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNik7IH1cbiAgfTtcblxuXG4gIC8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bdHlwZV1cbiAgdmFyIHJlID0gL14oPzooLik/KFs8Pj1eXSkpPyhbK1xcLVxcKCBdKT8oWyQjXSk/KDApPyhcXGQrKT8oLCk/KFxcLlxcZCspPyhbYS16JV0pPyQvaTtcblxuICBmdW5jdGlvbiBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gICAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG5cbiAgICB2YXIgbWF0Y2gsXG4gICAgICAgIGZpbGwgPSBtYXRjaFsxXSB8fCBcIiBcIixcbiAgICAgICAgYWxpZ24gPSBtYXRjaFsyXSB8fCBcIj5cIixcbiAgICAgICAgc2lnbiA9IG1hdGNoWzNdIHx8IFwiLVwiLFxuICAgICAgICBzeW1ib2wgPSBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICB6ZXJvID0gISFtYXRjaFs1XSxcbiAgICAgICAgd2lkdGggPSBtYXRjaFs2XSAmJiArbWF0Y2hbNl0sXG4gICAgICAgIGNvbW1hID0gISFtYXRjaFs3XSxcbiAgICAgICAgcHJlY2lzaW9uID0gbWF0Y2hbOF0gJiYgK21hdGNoWzhdLnNsaWNlKDEpLFxuICAgICAgICB0eXBlID0gbWF0Y2hbOV0gfHwgXCJcIjtcblxuICAgIC8vIFRoZSBcIm5cIiB0eXBlIGlzIGFuIGFsaWFzIGZvciBcIixnXCIuXG4gICAgaWYgKHR5cGUgPT09IFwiblwiKSBjb21tYSA9IHRydWUsIHR5cGUgPSBcImdcIjtcblxuICAgIC8vIE1hcCBpbnZhbGlkIHR5cGVzIHRvIHRoZSBkZWZhdWx0IGZvcm1hdC5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHR5cGUgPSBcIlwiO1xuXG4gICAgLy8gSWYgemVybyBmaWxsIGlzIHNwZWNpZmllZCwgcGFkZGluZyBnb2VzIGFmdGVyIHNpZ24gYW5kIGJlZm9yZSBkaWdpdHMuXG4gICAgaWYgKHplcm8gfHwgKGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikpIHplcm8gPSB0cnVlLCBmaWxsID0gXCIwXCIsIGFsaWduID0gXCI9XCI7XG5cbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xuICAgIHRoaXMuYWxpZ24gPSBhbGlnbjtcbiAgICB0aGlzLnNpZ24gPSBzaWduO1xuICAgIHRoaXMuc3ltYm9sID0gc3ltYm9sO1xuICAgIHRoaXMuemVybyA9IHplcm87XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuY29tbWEgPSBjb21tYTtcbiAgICB0aGlzLnByZWNpc2lvbiA9IHByZWNpc2lvbjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgRm9ybWF0U3BlY2lmaWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICAgKyB0aGlzLmFsaWduXG4gICAgICAgICsgdGhpcy5zaWduXG4gICAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICAgKyAodGhpcy56ZXJvID8gXCIwXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLndpZHRoID09IG51bGwgPyBcIlwiIDogTWF0aC5tYXgoMSwgdGhpcy53aWR0aCB8IDApKVxuICAgICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLnByZWNpc2lvbiA9PSBudWxsID8gXCJcIiA6IFwiLlwiICsgTWF0aC5tYXgoMCwgdGhpcy5wcmVjaXNpb24gfCAwKSlcbiAgICAgICAgKyB0aGlzLnR5cGU7XG4gIH07XG5cbiAgZnVuY3Rpb24gZm9ybWF0R3JvdXAoZ3JvdXBpbmcsIHRob3VzYW5kcykge1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgd2lkdGgpIHtcbiAgICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICAgIHQgPSBbXSxcbiAgICAgICAgICBqID0gMCxcbiAgICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgICAgbGVuZ3RoID0gMDtcblxuICAgICAgd2hpbGUgKGkgPiAwICYmIGcgPiAwKSB7XG4gICAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgICB0LnB1c2godmFsdWUuc3Vic3RyaW5nKGkgLT0gZywgaSArIGcpKTtcbiAgICAgICAgaWYgKChsZW5ndGggKz0gZyArIDEpID4gd2lkdGgpIGJyZWFrO1xuICAgICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbih0aG91c2FuZHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgcHJlZml4ZXMgPSBbXCJ5XCIsXCJ6XCIsXCJhXCIsXCJmXCIsXCJwXCIsXCJuXCIsXCLCtVwiLFwibVwiLFwiXCIsXCJrXCIsXCJNXCIsXCJHXCIsXCJUXCIsXCJQXCIsXCJFXCIsXCJaXCIsXCJZXCJdO1xuXG4gIGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsZShsb2NhbGUpIHtcbiAgICB2YXIgZ3JvdXAgPSBsb2NhbGUuZ3JvdXBpbmcgJiYgbG9jYWxlLnRob3VzYW5kcyA/IGZvcm1hdEdyb3VwKGxvY2FsZS5ncm91cGluZywgbG9jYWxlLnRob3VzYW5kcykgOiBpZGVudGl0eSxcbiAgICAgICAgY3VycmVuY3kgPSBsb2NhbGUuY3VycmVuY3ksXG4gICAgICAgIGRlY2ltYWwgPSBsb2NhbGUuZGVjaW1hbDtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdChzcGVjaWZpZXIpIHtcbiAgICAgIHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpO1xuXG4gICAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICAgIGFsaWduID0gc3BlY2lmaWVyLmFsaWduLFxuICAgICAgICAgIHNpZ24gPSBzcGVjaWZpZXIuc2lnbixcbiAgICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICAgIHplcm8gPSBzcGVjaWZpZXIuemVybyxcbiAgICAgICAgICB3aWR0aCA9IHNwZWNpZmllci53aWR0aCxcbiAgICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgICBwcmVjaXNpb24gPSBzcGVjaWZpZXIucHJlY2lzaW9uLFxuICAgICAgICAgIHR5cGUgPSBzcGVjaWZpZXIudHlwZTtcblxuICAgICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgICAvLyBGb3IgU0ktcHJlZml4LCB0aGUgc3VmZml4IGlzIGxhemlseSBjb21wdXRlZC5cbiAgICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lbMF0gOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgICAgc3VmZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5WzFdIDogL1slcF0vLnRlc3QodHlwZSkgPyBcIiVcIiA6IFwiXCI7XG5cbiAgICAgIC8vIFdoYXQgZm9ybWF0IGZ1bmN0aW9uIHNob3VsZCB3ZSB1c2U/XG4gICAgICAvLyBJcyB0aGlzIGFuIGludGVnZXIgdHlwZT9cbiAgICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgICB2YXIgZm9ybWF0VHlwZSA9IGZvcm1hdFR5cGVzW3R5cGVdLFxuICAgICAgICAgIG1heWJlU3VmZml4ID0gIXR5cGUgfHwgL1tkZWZncHJzJV0vLnRlc3QodHlwZSk7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAgIC8vIG9yIGNsYW1wIHRoZSBzcGVjaWZpZWQgcHJlY2lzaW9uIHRvIHRoZSBzdXBwb3J0ZWQgcmFuZ2UuXG4gICAgICAvLyBGb3Igc2lnbmlmaWNhbnQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFsxLCAyMV0uXG4gICAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgICBwcmVjaXNpb24gPSBwcmVjaXNpb24gPT0gbnVsbCA/ICh0eXBlID8gNiA6IDEyKVxuICAgICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIHByZWNpc2lvbikpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgICAgdmFsdWVTdWZmaXggPSBzdWZmaXg7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiY1wiKSB7XG4gICAgICAgICAgdmFsdWVTdWZmaXggPSBmb3JtYXRUeXBlKHZhbHVlKSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgICAgICAgIC8vIENvbnZlcnQgbmVnYXRpdmUgdG8gcG9zaXRpdmUsIGFuZCBjb21wdXRlIHRoZSBwcmVmaXguXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IC0wIGlzIG5vdCBsZXNzIHRoYW4gMCwgYnV0IDEgLyAtMCBpcyFcbiAgICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9ICh2YWx1ZSA8IDAgfHwgMSAvIHZhbHVlIDwgMCkgJiYgKHZhbHVlICo9IC0xLCB0cnVlKTtcblxuICAgICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgICB2YWx1ZSA9IGZvcm1hdFR5cGUodmFsdWUsIHByZWNpc2lvbik7XG5cbiAgICAgICAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAgICAgICB2YWx1ZVByZWZpeCA9ICh2YWx1ZU5lZ2F0aXZlID8gKHNpZ24gPT09IFwiKFwiID8gc2lnbiA6IFwiLVwiKSA6IHNpZ24gPT09IFwiLVwiIHx8IHNpZ24gPT09IFwiKFwiID8gXCJcIiA6IHNpZ24pICsgdmFsdWVQcmVmaXg7XG4gICAgICAgICAgdmFsdWVTdWZmaXggPSB2YWx1ZVN1ZmZpeCArICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyAodmFsdWVOZWdhdGl2ZSAmJiBzaWduID09PSBcIihcIiA/IFwiKVwiIDogXCJcIik7XG5cbiAgICAgICAgICAvLyBCcmVhayB0aGUgZm9ybWF0dGVkIHZhbHVlIGludG8gdGhlIGludGVnZXIg4oCcdmFsdWXigJ0gcGFydCB0aGF0IGNhbiBiZVxuICAgICAgICAgIC8vIGdyb3VwZWQsIGFuZCBmcmFjdGlvbmFsIG9yIGV4cG9uZW50aWFsIOKAnHN1ZmZpeOKAnSBwYXJ0IHRoYXQgaXMgbm90LlxuICAgICAgICAgIGlmIChtYXliZVN1ZmZpeCkge1xuICAgICAgICAgICAgdmFyIGkgPSAtMSwgbiA9IHZhbHVlLmxlbmd0aCwgYztcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICAgIGlmIChjID0gdmFsdWUuY2hhckNvZGVBdChpKSwgNDggPiBjIHx8IGMgPiA1Nykge1xuICAgICAgICAgICAgICAgIHZhbHVlU3VmZml4ID0gKGMgPT09IDQ2ID8gZGVjaW1hbCArIHZhbHVlLnNsaWNlKGkgKyAxKSA6IHZhbHVlLnNsaWNlKGkpKSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgICBpZiAoY29tbWEgJiYgIXplcm8pIHZhbHVlID0gZ3JvdXAodmFsdWUsIEluZmluaXR5KTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwYWRkaW5nLlxuICAgICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgICAgcGFkZGluZyA9IGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSA6IFwiXCI7XG5cbiAgICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGFmdGVyIHBhZGRpbmcuXG4gICAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgICAgLy8gUmVjb25zdHJ1Y3QgdGhlIGZpbmFsIG91dHB1dCBiYXNlZCBvbiB0aGUgZGVzaXJlZCBhbGlnbm1lbnQuXG4gICAgICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgICAgICBjYXNlIFwiPFwiOiByZXR1cm4gdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZztcbiAgICAgICAgICBjYXNlIFwiPVwiOiByZXR1cm4gdmFsdWVQcmVmaXggKyBwYWRkaW5nICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgICAgICBjYXNlIFwiXlwiOiByZXR1cm4gcGFkZGluZy5zbGljZSgwLCBsZW5ndGggPSBwYWRkaW5nLmxlbmd0aCA+PiAxKSArIHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmcuc2xpY2UobGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFkZGluZyArIHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpIHtcbiAgICAgIHZhciBmID0gZm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgICAgZSA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzLFxuICAgICAgICAgIGsgPSBNYXRoLnBvdygxMCwgLWUpLFxuICAgICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGYoayAqIHZhbHVlKSArIHByZWZpeDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgZm9ybWF0UHJlZml4OiBmb3JtYXRQcmVmaXhcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlY2lzaW9uUm91bmQoc3RlcCwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGV4cG9uZW50KE1hdGguYWJzKG1heCkpIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKSArIDE7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVjaXNpb25QcmVmaXgoc3RlcCwgdmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQodmFsdWUpIC8gMykpKSAqIDMgLSBleHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlY2lzaW9uRml4ZWQoc3RlcCkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCAtZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbiAgfVxuXG4gIHZhciBsb2NhbGVEZWZpbml0aW9ucyA9IChuZXcgTWFwKVxuICAgICAgLnNldChcImNhLUVTXCIsIGNhRXMpXG4gICAgICAuc2V0KFwiZGUtREVcIiwgZGVEZSlcbiAgICAgIC5zZXQoXCJlbi1DQVwiLCBlbkNhKVxuICAgICAgLnNldChcImVuLUdCXCIsIGVuR2IpXG4gICAgICAuc2V0KFwiZW4tVVNcIiwgZW5VcylcbiAgICAgIC5zZXQoXCJlcy1FU1wiLCBlc0VzKVxuICAgICAgLnNldChcImZpLUZJXCIsIGZpRmkpXG4gICAgICAuc2V0KFwiZnItQ0FcIiwgZnJDYSlcbiAgICAgIC5zZXQoXCJmci1GUlwiLCBmckZyKVxuICAgICAgLnNldChcImhlLUlMXCIsIGhlSWwpXG4gICAgICAuc2V0KFwiaXQtSVRcIiwgaXRJdClcbiAgICAgIC5zZXQoXCJtay1NS1wiLCBta01rKVxuICAgICAgLnNldChcIm5sLU5MXCIsIG5sTmwpXG4gICAgICAuc2V0KFwicGwtUExcIiwgcGxQbClcbiAgICAgIC5zZXQoXCJwdC1CUlwiLCBwdEJyKVxuICAgICAgLnNldChcInJ1LVJVXCIsIHJ1UnUpXG4gICAgICAuc2V0KFwiemgtQ05cIiwgemhDbik7XG5cbiAgdmFyIGRlZmF1bHRMb2NhbGUgPSBsb2NhbGUoZW5Vcyk7XG4gIGV4cG9ydHMuZm9ybWF0ID0gZGVmYXVsdExvY2FsZS5mb3JtYXQ7XG4gIGV4cG9ydHMuZm9ybWF0UHJlZml4ID0gZGVmYXVsdExvY2FsZS5mb3JtYXRQcmVmaXg7XG5cbiAgZnVuY3Rpb24gbG9jYWxlRm9ybWF0KGRlZmluaXRpb24pIHtcbiAgICBpZiAodHlwZW9mIGRlZmluaXRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGRlZmluaXRpb24gPSBsb2NhbGVEZWZpbml0aW9ucy5nZXQoZGVmaW5pdGlvbik7XG4gICAgICBpZiAoIWRlZmluaXRpb24pIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYWxlKGRlZmluaXRpb24pO1xuICB9XG4gIDtcblxuICBleHBvcnRzLmxvY2FsZUZvcm1hdCA9IGxvY2FsZUZvcm1hdDtcbiAgZXhwb3J0cy5mb3JtYXRTcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXI7XG4gIGV4cG9ydHMucHJlY2lzaW9uRml4ZWQgPSBwcmVjaXNpb25GaXhlZDtcbiAgZXhwb3J0cy5wcmVjaXNpb25QcmVmaXggPSBwcmVjaXNpb25QcmVmaXg7XG4gIGV4cG9ydHMucHJlY2lzaW9uUm91bmQgPSBwcmVjaXNpb25Sb3VuZDtcblxufSkpOyIsImlmICh0eXBlb2YgTWFwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gIE1hcCA9IGZ1bmN0aW9uKCkgeyB0aGlzLmNsZWFyKCk7IH07XG4gIE1hcC5wcm90b3R5cGUgPSB7XG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7IHRoaXMuX1trXSA9IHY7IHJldHVybiB0aGlzOyB9LFxuICAgIGdldDogZnVuY3Rpb24oaykgeyByZXR1cm4gdGhpcy5fW2tdOyB9LFxuICAgIGhhczogZnVuY3Rpb24oaykgeyByZXR1cm4gayBpbiB0aGlzLl87IH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrKSB7IHJldHVybiBrIGluIHRoaXMuXyAmJiBkZWxldGUgdGhpcy5fW2tdOyB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHsgdGhpcy5fID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgfSxcbiAgICBnZXQgc2l6ZSgpIHsgdmFyIG4gPSAwOyBmb3IgKHZhciBrIGluIHRoaXMuXykgKytuOyByZXR1cm4gbjsgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjKSB7IGZvciAodmFyIGsgaW4gdGhpcy5fKSBjKHRoaXMuX1trXSwgaywgdGhpcyk7IH1cbiAgfTtcbn0gZWxzZSAoZnVuY3Rpb24oKSB7XG4gIHZhciBtID0gbmV3IE1hcDtcbiAgaWYgKG0uc2V0KDAsIDApICE9PSBtKSB7XG4gICAgbSA9IG0uc2V0O1xuICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oKSB7IG0uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgcmV0dXJuIHRoaXM7IH07XG4gIH1cbn0pKCk7XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgZmFjdG9yeSgoZ2xvYmFsLnRpbWVGb3JtYXQgPSB7fSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHpoQ24gPSB7XG4gICAgZGF0ZVRpbWU6IFwiJWEgJWIgJWUgJVggJVlcIixcbiAgICBkYXRlOiBcIiVZLyUtbS8lLWRcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wi5LiK5Y2IXCIsIFwi5LiL5Y2IXCJdLFxuICAgIGRheXM6IFtcIuaYn+acn+aXpVwiLCBcIuaYn+acn+S4gFwiLCBcIuaYn+acn+S6jFwiLCBcIuaYn+acn+S4iVwiLCBcIuaYn+acn+Wbm1wiLCBcIuaYn+acn+S6lFwiLCBcIuaYn+acn+WFrVwiXSxcbiAgICBzaG9ydERheXM6IFtcIuaYn+acn+aXpVwiLCBcIuaYn+acn+S4gFwiLCBcIuaYn+acn+S6jFwiLCBcIuaYn+acn+S4iVwiLCBcIuaYn+acn+Wbm1wiLCBcIuaYn+acn+S6lFwiLCBcIuaYn+acn+WFrVwiXSxcbiAgICBtb250aHM6IFtcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wi5LiA5pyIXCIsIFwi5LqM5pyIXCIsIFwi5LiJ5pyIXCIsIFwi5Zub5pyIXCIsIFwi5LqU5pyIXCIsIFwi5YWt5pyIXCIsIFwi5LiD5pyIXCIsIFwi5YWr5pyIXCIsIFwi5Lmd5pyIXCIsIFwi5Y2B5pyIXCIsIFwi5Y2B5LiA5pyIXCIsIFwi5Y2B5LqM5pyIXCJdXG4gIH07XG5cbiAgdmFyIHJ1UnUgPSB7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlICVCICVZINCzLiAlWFwiLFxuICAgIGRhdGU6IFwiJWQuJW0uJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCLQstC+0YHQutGA0LXRgdC10L3RjNC1XCIsIFwi0L/QvtC90LXQtNC10LvRjNC90LjQulwiLCBcItCy0YLQvtGA0L3QuNC6XCIsIFwi0YHRgNC10LTQsFwiLCBcItGH0LXRgtCy0LXRgNCzXCIsIFwi0L/Rj9GC0L3QuNGG0LBcIiwgXCLRgdGD0LHQsdC+0YLQsFwiXSxcbiAgICBzaG9ydERheXM6IFtcItCy0YFcIiwgXCLQv9C9XCIsIFwi0LLRglwiLCBcItGB0YBcIiwgXCLRh9GCXCIsIFwi0L/RglwiLCBcItGB0LFcIl0sXG4gICAgbW9udGhzOiBbXCLRj9C90LLQsNGA0Y9cIiwgXCLRhNC10LLRgNCw0LvRj1wiLCBcItC80LDRgNGC0LBcIiwgXCLQsNC/0YDQtdC70Y9cIiwgXCLQvNCw0Y9cIiwgXCLQuNGO0L3Rj1wiLCBcItC40Y7Qu9GPXCIsIFwi0LDQstCz0YPRgdGC0LBcIiwgXCLRgdC10L3RgtGP0LHRgNGPXCIsIFwi0L7QutGC0Y/QsdGA0Y9cIiwgXCLQvdC+0Y/QsdGA0Y9cIiwgXCLQtNC10LrQsNCx0YDRj1wiXSxcbiAgICBzaG9ydE1vbnRoczogW1wi0Y/QvdCyXCIsIFwi0YTQtdCyXCIsIFwi0LzQsNGAXCIsIFwi0LDQv9GAXCIsIFwi0LzQsNC5XCIsIFwi0LjRjtC9XCIsIFwi0LjRjtC7XCIsIFwi0LDQstCzXCIsIFwi0YHQtdC9XCIsIFwi0L7QutGCXCIsIFwi0L3QvtGPXCIsIFwi0LTQtdC6XCJdXG4gIH07XG5cbiAgdmFyIHB0QnIgPSB7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlIGRlICVCIGRlICVZLiAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJEb21pbmdvXCIsIFwiU2VndW5kYVwiLCBcIlRlcsOnYVwiLCBcIlF1YXJ0YVwiLCBcIlF1aW50YVwiLCBcIlNleHRhXCIsIFwiU8OhYmFkb1wiXSxcbiAgICBzaG9ydERheXM6IFtcIkRvbVwiLCBcIlNlZ1wiLCBcIlRlclwiLCBcIlF1YVwiLCBcIlF1aVwiLCBcIlNleFwiLCBcIlPDoWJcIl0sXG4gICAgbW9udGhzOiBbXCJKYW5laXJvXCIsIFwiRmV2ZXJlaXJvXCIsIFwiTWFyw6dvXCIsIFwiQWJyaWxcIiwgXCJNYWlvXCIsIFwiSnVuaG9cIiwgXCJKdWxob1wiLCBcIkFnb3N0b1wiLCBcIlNldGVtYnJvXCIsIFwiT3V0dWJyb1wiLCBcIk5vdmVtYnJvXCIsIFwiRGV6ZW1icm9cIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZldlwiLCBcIk1hclwiLCBcIkFiclwiLCBcIk1haVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkFnb1wiLCBcIlNldFwiLCBcIk91dFwiLCBcIk5vdlwiLCBcIkRlelwiXVxuICB9O1xuXG4gIHZhciBwbFBsID0ge1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlZSAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcIk5pZWR6aWVsYVwiLCBcIlBvbmllZHppYcWCZWtcIiwgXCJXdG9yZWtcIiwgXCLFmnJvZGFcIiwgXCJDendhcnRla1wiLCBcIlBpxIV0ZWtcIiwgXCJTb2JvdGFcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJOaWVkei5cIiwgXCJQb24uXCIsIFwiV3QuXCIsIFwixZpyLlwiLCBcIkN6dy5cIiwgXCJQdC5cIiwgXCJTb2IuXCJdLFxuICAgIG1vbnRoczogW1wiU3R5Y3plxYRcIiwgXCJMdXR5XCIsIFwiTWFyemVjXCIsIFwiS3dpZWNpZcWEXCIsIFwiTWFqXCIsIFwiQ3plcndpZWNcIiwgXCJMaXBpZWNcIiwgXCJTaWVycGllxYRcIiwgXCJXcnplc2llxYRcIiwgXCJQYcW6ZHppZXJuaWtcIiwgXCJMaXN0b3BhZFwiLCBcIkdydWR6aWXFhFwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiU3R5Y3ouXCIsIFwiTHV0eVwiLCBcIk1hcnouXCIsIFwiS3dpZS5cIiwgXCJNYWpcIiwgXCJDemVydy5cIiwgXCJMaXBjLlwiLCBcIlNpZXJwLlwiLCBcIldyei5cIiwgXCJQYcW6ZHouXCIsIFwiTGlzdG9wLlwiLCBcIkdydWR6LlwiXS8qIEluIFBvbGlzaCBsYW5ndWFnZSBhYmJyYXZpYXRlZCBtb250aHMgYXJlIG5vdCBjb21tb25seSB1c2VkIHNvIHRoZXJlIGlzIGEgZGlzcHV0ZSBhYm91dCB0aGUgcHJvcGVyIGFiYnJhdmlhdGlvbnMuICovXG4gIH07XG5cbiAgdmFyIG5sTmwgPSB7XG4gICAgZGF0ZVRpbWU6IFwiJWEgJWUgJUIgJVkgJVRcIixcbiAgICBkYXRlOiBcIiVkLSVtLSVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcInpvbmRhZ1wiLCBcIm1hYW5kYWdcIiwgXCJkaW5zZGFnXCIsIFwid29lbnNkYWdcIiwgXCJkb25kZXJkYWdcIiwgXCJ2cmlqZGFnXCIsIFwiemF0ZXJkYWdcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJ6b1wiLCBcIm1hXCIsIFwiZGlcIiwgXCJ3b1wiLCBcImRvXCIsIFwidnJcIiwgXCJ6YVwiXSxcbiAgICBtb250aHM6IFtcImphbnVhcmlcIiwgXCJmZWJydWFyaVwiLCBcIm1hYXJ0XCIsIFwiYXByaWxcIiwgXCJtZWlcIiwgXCJqdW5pXCIsIFwianVsaVwiLCBcImF1Z3VzdHVzXCIsIFwic2VwdGVtYmVyXCIsIFwib2t0b2JlclwiLCBcIm5vdmVtYmVyXCIsIFwiZGVjZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImphblwiLCBcImZlYlwiLCBcIm1ydFwiLCBcImFwclwiLCBcIm1laVwiLCBcImp1blwiLCBcImp1bFwiLCBcImF1Z1wiLCBcInNlcFwiLCBcIm9rdFwiLCBcIm5vdlwiLCBcImRlY1wiXVxuICB9O1xuXG4gIHZhciBta01rID0ge1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlZSAlQiAlWSDQsy4gJVhcIixcbiAgICBkYXRlOiBcIiVkLiVtLiVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wi0L3QtdC00LXQu9CwXCIsIFwi0L/QvtC90LXQtNC10LvQvdC40LpcIiwgXCLQstGC0L7RgNC90LjQulwiLCBcItGB0YDQtdC00LBcIiwgXCLRh9C10YLQstGA0YLQvtC6XCIsIFwi0L/QtdGC0L7QulwiLCBcItGB0LDQsdC+0YLQsFwiXSxcbiAgICBzaG9ydERheXM6IFtcItC90LXQtFwiLCBcItC/0L7QvVwiLCBcItCy0YLQvlwiLCBcItGB0YDQtVwiLCBcItGH0LXRglwiLCBcItC/0LXRglwiLCBcItGB0LDQsVwiXSxcbiAgICBtb250aHM6IFtcItGY0LDQvdGD0LDRgNC4XCIsIFwi0YTQtdCy0YDRg9Cw0YDQuFwiLCBcItC80LDRgNGCXCIsIFwi0LDQv9GA0LjQu1wiLCBcItC80LDRmFwiLCBcItGY0YPQvdC4XCIsIFwi0ZjRg9C70LhcIiwgXCLQsNCy0LPRg9GB0YJcIiwgXCLRgdC10L/RgtC10LzQstGA0LhcIiwgXCLQvtC60YLQvtC80LLRgNC4XCIsIFwi0L3QvtC10LzQstGA0LhcIiwgXCLQtNC10LrQtdC80LLRgNC4XCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCLRmNCw0L1cIiwgXCLRhNC10LJcIiwgXCLQvNCw0YBcIiwgXCLQsNC/0YBcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L1cIiwgXCLRmNGD0LtcIiwgXCLQsNCy0LNcIiwgXCLRgdC10L9cIiwgXCLQvtC60YJcIiwgXCLQvdC+0LVcIiwgXCLQtNC10LpcIl1cbiAgfTtcblxuICB2YXIgaXRJdCA9IHtcbiAgICBkYXRlVGltZTogXCIlQSAlZSAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcIkRvbWVuaWNhXCIsIFwiTHVuZWTDrFwiLCBcIk1hcnRlZMOsXCIsIFwiTWVyY29sZWTDrFwiLCBcIkdpb3ZlZMOsXCIsIFwiVmVuZXJkw6xcIiwgXCJTYWJhdG9cIl0sXG4gICAgc2hvcnREYXlzOiBbXCJEb21cIiwgXCJMdW5cIiwgXCJNYXJcIiwgXCJNZXJcIiwgXCJHaW9cIiwgXCJWZW5cIiwgXCJTYWJcIl0sXG4gICAgbW9udGhzOiBbXCJHZW5uYWlvXCIsIFwiRmViYnJhaW9cIiwgXCJNYXJ6b1wiLCBcIkFwcmlsZVwiLCBcIk1hZ2dpb1wiLCBcIkdpdWdub1wiLCBcIkx1Z2xpb1wiLCBcIkFnb3N0b1wiLCBcIlNldHRlbWJyZVwiLCBcIk90dG9icmVcIiwgXCJOb3ZlbWJyZVwiLCBcIkRpY2VtYnJlXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJHZW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYWdcIiwgXCJHaXVcIiwgXCJMdWdcIiwgXCJBZ29cIiwgXCJTZXRcIiwgXCJPdHRcIiwgXCJOb3ZcIiwgXCJEaWNcIl1cbiAgfTtcblxuICB2YXIgaGVJbCA9IHtcbiAgICBkYXRlVGltZTogXCIlQSwgJWUg15ElQiAlWSAlWFwiLFxuICAgIGRhdGU6IFwiJWQuJW0uJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCLXqNeQ16nXldefXCIsIFwi16nXoNeZXCIsIFwi16nXnNeZ16nXmVwiLCBcIteo15HXmdei15lcIiwgXCLXl9ee15nXqdeZXCIsIFwi16nXmdep15lcIiwgXCLXqdeR16pcIl0sXG4gICAgc2hvcnREYXlzOiBbXCLXkNezXCIsIFwi15HXs1wiLCBcIteS17NcIiwgXCLXk9ezXCIsIFwi15TXs1wiLCBcIteV17NcIiwgXCLXqdezXCJdLFxuICAgIG1vbnRoczogW1wi15nXoNeV15DXqFwiLCBcItek15HXqNeV15DXqFwiLCBcItee16jXpVwiLCBcIteQ16TXqNeZ15xcIiwgXCLXnteQ15lcIiwgXCLXmdeV16DXmVwiLCBcIteZ15XXnNeZXCIsIFwi15DXldeS15XXodeYXCIsIFwi16HXpNeY157XkdeoXCIsIFwi15DXlden15jXldeR16hcIiwgXCLXoNeV15HXnteR16hcIiwgXCLXk9em157XkdeoXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCLXmdeg15XXs1wiLCBcItek15HXqNezXCIsIFwi157XqNelXCIsIFwi15DXpNeo17NcIiwgXCLXnteQ15lcIiwgXCLXmdeV16DXmVwiLCBcIteZ15XXnNeZXCIsIFwi15DXldeS17NcIiwgXCLXodek15jXs1wiLCBcIteQ15XXp9ezXCIsIFwi16DXldeR17NcIiwgXCLXk9em157Xs1wiXVxuICB9O1xuXG4gIHZhciBmckZyID0ge1xuICAgIGRhdGVUaW1lOiBcIiVBLCBsZSAlZSAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcImRpbWFuY2hlXCIsIFwibHVuZGlcIiwgXCJtYXJkaVwiLCBcIm1lcmNyZWRpXCIsIFwiamV1ZGlcIiwgXCJ2ZW5kcmVkaVwiLCBcInNhbWVkaVwiXSxcbiAgICBzaG9ydERheXM6IFtcImRpbS5cIiwgXCJsdW4uXCIsIFwibWFyLlwiLCBcIm1lci5cIiwgXCJqZXUuXCIsIFwidmVuLlwiLCBcInNhbS5cIl0sXG4gICAgbW9udGhzOiBbXCJqYW52aWVyXCIsIFwiZsOpdnJpZXJcIiwgXCJtYXJzXCIsIFwiYXZyaWxcIiwgXCJtYWlcIiwgXCJqdWluXCIsIFwianVpbGxldFwiLCBcImFvw7t0XCIsIFwic2VwdGVtYnJlXCIsIFwib2N0b2JyZVwiLCBcIm5vdmVtYnJlXCIsIFwiZMOpY2VtYnJlXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJqYW52LlwiLCBcImbDqXZyLlwiLCBcIm1hcnNcIiwgXCJhdnIuXCIsIFwibWFpXCIsIFwianVpblwiLCBcImp1aWwuXCIsIFwiYW/Du3RcIiwgXCJzZXB0LlwiLCBcIm9jdC5cIiwgXCJub3YuXCIsIFwiZMOpYy5cIl1cbiAgfTtcblxuICB2YXIgZnJDYSA9IHtcbiAgICBkYXRlVGltZTogXCIlYSAlZSAlYiAlWSAlWFwiLFxuICAgIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiXCIsIFwiXCJdLFxuICAgIGRheXM6IFtcImRpbWFuY2hlXCIsIFwibHVuZGlcIiwgXCJtYXJkaVwiLCBcIm1lcmNyZWRpXCIsIFwiamV1ZGlcIiwgXCJ2ZW5kcmVkaVwiLCBcInNhbWVkaVwiXSxcbiAgICBzaG9ydERheXM6IFtcImRpbVwiLCBcImx1blwiLCBcIm1hclwiLCBcIm1lclwiLCBcImpldVwiLCBcInZlblwiLCBcInNhbVwiXSxcbiAgICBtb250aHM6IFtcImphbnZpZXJcIiwgXCJmw6l2cmllclwiLCBcIm1hcnNcIiwgXCJhdnJpbFwiLCBcIm1haVwiLCBcImp1aW5cIiwgXCJqdWlsbGV0XCIsIFwiYW/Du3RcIiwgXCJzZXB0ZW1icmVcIiwgXCJvY3RvYnJlXCIsIFwibm92ZW1icmVcIiwgXCJkw6ljZW1icmVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcImphblwiLCBcImbDqXZcIiwgXCJtYXJcIiwgXCJhdnJcIiwgXCJtYWlcIiwgXCJqdWlcIiwgXCJqdWxcIiwgXCJhb8O7XCIsIFwic2VwXCIsIFwib2N0XCIsIFwibm92XCIsIFwiZMOpY1wiXVxuICB9O1xuXG4gIHZhciBmaUZpID0ge1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlLWQuICVCdGEgJVkga2xvICVYXCIsXG4gICAgZGF0ZTogXCIlLWQuJS1tLiVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcImEubS5cIiwgXCJwLm0uXCJdLFxuICAgIGRheXM6IFtcInN1bm51bnRhaVwiLCBcIm1hYW5hbnRhaVwiLCBcInRpaXN0YWlcIiwgXCJrZXNraXZpaWtrb1wiLCBcInRvcnN0YWlcIiwgXCJwZXJqYW50YWlcIiwgXCJsYXVhbnRhaVwiXSxcbiAgICBzaG9ydERheXM6IFtcIlN1XCIsIFwiTWFcIiwgXCJUaVwiLCBcIktlXCIsIFwiVG9cIiwgXCJQZVwiLCBcIkxhXCJdLFxuICAgIG1vbnRoczogW1widGFtbWlrdXVcIiwgXCJoZWxtaWt1dVwiLCBcIm1hYWxpc2t1dVwiLCBcImh1aHRpa3V1XCIsIFwidG91a29rdXVcIiwgXCJrZXPDpGt1dVwiLCBcImhlaW7DpGt1dVwiLCBcImVsb2t1dVwiLCBcInN5eXNrdXVcIiwgXCJsb2tha3V1XCIsIFwibWFycmFza3V1XCIsIFwiam91bHVrdXVcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIlRhbW1pXCIsIFwiSGVsbWlcIiwgXCJNYWFsaXNcIiwgXCJIdWh0aVwiLCBcIlRvdWtvXCIsIFwiS2Vzw6RcIiwgXCJIZWluw6RcIiwgXCJFbG9cIiwgXCJTeXlzXCIsIFwiTG9rYVwiLCBcIk1hcnJhc1wiLCBcIkpvdWx1XCJdXG4gIH07XG5cbiAgdmFyIGVzRXMgPSB7XG4gICAgZGF0ZVRpbWU6IFwiJUEsICVlIGRlICVCIGRlICVZLCAlWFwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJkb21pbmdvXCIsIFwibHVuZXNcIiwgXCJtYXJ0ZXNcIiwgXCJtacOpcmNvbGVzXCIsIFwianVldmVzXCIsIFwidmllcm5lc1wiLCBcInPDoWJhZG9cIl0sXG4gICAgc2hvcnREYXlzOiBbXCJkb21cIiwgXCJsdW5cIiwgXCJtYXJcIiwgXCJtacOpXCIsIFwianVlXCIsIFwidmllXCIsIFwic8OhYlwiXSxcbiAgICBtb250aHM6IFtcImVuZXJvXCIsIFwiZmVicmVyb1wiLCBcIm1hcnpvXCIsIFwiYWJyaWxcIiwgXCJtYXlvXCIsIFwianVuaW9cIiwgXCJqdWxpb1wiLCBcImFnb3N0b1wiLCBcInNlcHRpZW1icmVcIiwgXCJvY3R1YnJlXCIsIFwibm92aWVtYnJlXCIsIFwiZGljaWVtYnJlXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJlbmVcIiwgXCJmZWJcIiwgXCJtYXJcIiwgXCJhYnJcIiwgXCJtYXlcIiwgXCJqdW5cIiwgXCJqdWxcIiwgXCJhZ29cIiwgXCJzZXBcIiwgXCJvY3RcIiwgXCJub3ZcIiwgXCJkaWNcIl1cbiAgfTtcblxuICB2YXIgZW5VcyA9IHtcbiAgICBkYXRlVGltZTogXCIlYSAlYiAlZSAlWCAlWVwiLFxuICAgIGRhdGU6IFwiJW0vJWQvJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBzaG9ydERheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl1cbiAgfTtcblxuICB2YXIgZW5HYiA9IHtcbiAgICBkYXRlVGltZTogXCIlYSAlZSAlYiAlWCAlWVwiLFxuICAgIGRhdGU6IFwiJWQvJW0vJVlcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBzaG9ydERheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl1cbiAgfTtcblxuICB2YXIgZW5DYSA9IHtcbiAgICBkYXRlVGltZTogXCIlYSAlYiAlZSAlWCAlWVwiLFxuICAgIGRhdGU6IFwiJVktJW0tJWRcIixcbiAgICB0aW1lOiBcIiVIOiVNOiVTXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBzaG9ydERheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl1cbiAgfTtcblxuICB2YXIgZGVEZSA9IHtcbiAgICBkYXRlVGltZTogXCIlQSwgZGVyICVlLiAlQiAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLiVtLiVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sIC8vIHVudXNlZFxuICAgIGRheXM6IFtcIlNvbm50YWdcIiwgXCJNb250YWdcIiwgXCJEaWVuc3RhZ1wiLCBcIk1pdHR3b2NoXCIsIFwiRG9ubmVyc3RhZ1wiLCBcIkZyZWl0YWdcIiwgXCJTYW1zdGFnXCJdLFxuICAgIHNob3J0RGF5czogW1wiU29cIiwgXCJNb1wiLCBcIkRpXCIsIFwiTWlcIiwgXCJEb1wiLCBcIkZyXCIsIFwiU2FcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTcOkcnpcIiwgXCJBcHJpbFwiLCBcIk1haVwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGV6ZW1iZXJcIl0sXG4gICAgc2hvcnRNb250aHM6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1yelwiLCBcIkFwclwiLCBcIk1haVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9rdFwiLCBcIk5vdlwiLCBcIkRlelwiXVxuICB9O1xuXG4gIHZhciBjYUVzID0ge1xuICAgIGRhdGVUaW1lOiBcIiVBLCAlZSBkZSAlQiBkZSAlWSwgJVhcIixcbiAgICBkYXRlOiBcIiVkLyVtLyVZXCIsXG4gICAgdGltZTogXCIlSDolTTolU1wiLFxuICAgIHBlcmlvZHM6IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgZGF5czogW1wiZGl1bWVuZ2VcIiwgXCJkaWxsdW5zXCIsIFwiZGltYXJ0c1wiLCBcImRpbWVjcmVzXCIsIFwiZGlqb3VzXCIsIFwiZGl2ZW5kcmVzXCIsIFwiZGlzc2FidGVcIl0sXG4gICAgc2hvcnREYXlzOiBbXCJkZy5cIiwgXCJkbC5cIiwgXCJkdC5cIiwgXCJkYy5cIiwgXCJkai5cIiwgXCJkdi5cIiwgXCJkcy5cIl0sXG4gICAgbW9udGhzOiBbXCJnZW5lclwiLCBcImZlYnJlclwiLCBcIm1hcsOnXCIsIFwiYWJyaWxcIiwgXCJtYWlnXCIsIFwianVueVwiLCBcImp1bGlvbFwiLCBcImFnb3N0XCIsIFwic2V0ZW1icmVcIiwgXCJvY3R1YnJlXCIsIFwibm92ZW1icmVcIiwgXCJkZXNlbWJyZVwiXSxcbiAgICBzaG9ydE1vbnRoczogW1wiZ2VuLlwiLCBcImZlYnIuXCIsIFwibWFyw6dcIiwgXCJhYnIuXCIsIFwibWFpZ1wiLCBcImp1bnlcIiwgXCJqdWwuXCIsIFwiYWcuXCIsIFwic2V0LlwiLCBcIm9jdC5cIiwgXCJub3YuXCIsIFwiZGVzLlwiXVxuICB9O1xuXG4gIHZhciB0MCA9IG5ldyBEYXRlO1xuICB2YXIgdDEgPSBuZXcgRGF0ZTtcblxuICBmdW5jdGlvbiBuZXdJbnRlcnZhbChmbG9vcmksIG9mZnNldGksIGNvdW50KSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9XG5cbiAgdmFyIGRheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHdlZWtkYXkoaSkge1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwICogNyk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xuICB2YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9KTtcblxuICBmdW5jdGlvbiB1dGNXZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIChkYXRlLmdldFVUQ0RheSgpICsgNyAtIGkpICUgNyk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHV0Y1N1bmRheSA9IHV0Y1dlZWtkYXkoMCk7XG4gIHZhciB1dGNNb25kYXkgPSB1dGNXZWVrZGF5KDEpO1xuXG4gIHZhciB1dGNZZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ0Z1bGxZZWFyKCkgLSBzdGFydC5nZXRVVENGdWxsWWVhcigpO1xuICB9KTtcblxuICBmdW5jdGlvbiBsb2NhbERhdGUoZCkge1xuICAgIGlmICgwIDw9IGQueSAmJiBkLnkgPCAxMDApIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xuICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkLnkpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXRjRGF0ZShkKSB7XG4gICAgaWYgKDAgPD0gZC55ICYmIGQueSA8IDEwMCkge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygtMSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCkpO1xuICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkLnkpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyhkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1llYXIoeSkge1xuICAgIHJldHVybiB7eTogeSwgbTogMCwgZDogMSwgSDogMCwgTTogMCwgUzogMCwgTDogMH07XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbGUobG9jYWxlKSB7XG4gICAgdmFyIGxvY2FsZV9kYXRlVGltZSA9IGxvY2FsZS5kYXRlVGltZSxcbiAgICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgICAgbG9jYWxlX3RpbWUgPSBsb2NhbGUudGltZSxcbiAgICAgICAgbG9jYWxlX3BlcmlvZHMgPSBsb2NhbGUucGVyaW9kcyxcbiAgICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICAgIGxvY2FsZV9zaG9ydFdlZWtkYXlzID0gbG9jYWxlLnNob3J0RGF5cyxcbiAgICAgICAgbG9jYWxlX21vbnRocyA9IGxvY2FsZS5tb250aHMsXG4gICAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICAgIHZhciBwZXJpb2RMb29rdXAgPSBmb3JtYXRMb29rdXAobG9jYWxlX3BlcmlvZHMpLFxuICAgICAgICB3ZWVrZGF5UmUgPSBmb3JtYXRSZShsb2NhbGVfd2Vla2RheXMpLFxuICAgICAgICB3ZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV93ZWVrZGF5cyksXG4gICAgICAgIHNob3J0V2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0V2Vla2RheXMpLFxuICAgICAgICBzaG9ydFdlZWtkYXlMb29rdXAgPSBmb3JtYXRMb29rdXAobG9jYWxlX3Nob3J0V2Vla2RheXMpLFxuICAgICAgICBtb250aFJlID0gZm9ybWF0UmUobG9jYWxlX21vbnRocyksXG4gICAgICAgIG1vbnRoTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9tb250aHMpLFxuICAgICAgICBzaG9ydE1vbnRoUmUgPSBmb3JtYXRSZShsb2NhbGVfc2hvcnRNb250aHMpLFxuICAgICAgICBzaG9ydE1vbnRoTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydE1vbnRocyk7XG5cbiAgICB2YXIgZm9ybWF0cyA9IHtcbiAgICAgIFwiYVwiOiBmb3JtYXRTaG9ydFdlZWtkYXksXG4gICAgICBcIkFcIjogZm9ybWF0V2Vla2RheSxcbiAgICAgIFwiYlwiOiBmb3JtYXRTaG9ydE1vbnRoLFxuICAgICAgXCJCXCI6IGZvcm1hdE1vbnRoLFxuICAgICAgXCJjXCI6IG51bGwsXG4gICAgICBcImRcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICAgIFwiZVwiOiBmb3JtYXREYXlPZk1vbnRoLFxuICAgICAgXCJIXCI6IGZvcm1hdEhvdXIyNCxcbiAgICAgIFwiSVwiOiBmb3JtYXRIb3VyMTIsXG4gICAgICBcImpcIjogZm9ybWF0RGF5T2ZZZWFyLFxuICAgICAgXCJMXCI6IGZvcm1hdE1pbGxpc2Vjb25kcyxcbiAgICAgIFwibVwiOiBmb3JtYXRNb250aE51bWJlcixcbiAgICAgIFwiTVwiOiBmb3JtYXRNaW51dGVzLFxuICAgICAgXCJwXCI6IGZvcm1hdFBlcmlvZCxcbiAgICAgIFwiU1wiOiBmb3JtYXRTZWNvbmRzLFxuICAgICAgXCJVXCI6IGZvcm1hdFdlZWtOdW1iZXJTdW5kYXksXG4gICAgICBcIndcIjogZm9ybWF0V2Vla2RheU51bWJlcixcbiAgICAgIFwiV1wiOiBmb3JtYXRXZWVrTnVtYmVyTW9uZGF5LFxuICAgICAgXCJ4XCI6IG51bGwsXG4gICAgICBcIlhcIjogbnVsbCxcbiAgICAgIFwieVwiOiBmb3JtYXRZZWFyLFxuICAgICAgXCJZXCI6IGZvcm1hdEZ1bGxZZWFyLFxuICAgICAgXCJaXCI6IGZvcm1hdFpvbmUsXG4gICAgICBcIiVcIjogZm9ybWF0TGl0ZXJhbFBlcmNlbnRcbiAgICB9O1xuXG4gICAgdmFyIHV0Y0Zvcm1hdHMgPSB7XG4gICAgICBcImFcIjogZm9ybWF0VVRDU2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IGZvcm1hdFVUQ1dlZWtkYXksXG4gICAgICBcImJcIjogZm9ybWF0VVRDU2hvcnRNb250aCxcbiAgICAgIFwiQlwiOiBmb3JtYXRVVENNb250aCxcbiAgICAgIFwiY1wiOiBudWxsLFxuICAgICAgXCJkXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgICBcImVcIjogZm9ybWF0VVRDRGF5T2ZNb250aCxcbiAgICAgIFwiSFwiOiBmb3JtYXRVVENIb3VyMjQsXG4gICAgICBcIklcIjogZm9ybWF0VVRDSG91cjEyLFxuICAgICAgXCJqXCI6IGZvcm1hdFVUQ0RheU9mWWVhcixcbiAgICAgIFwiTFwiOiBmb3JtYXRVVENNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogZm9ybWF0VVRDTW9udGhOdW1iZXIsXG4gICAgICBcIk1cIjogZm9ybWF0VVRDTWludXRlcyxcbiAgICAgIFwicFwiOiBmb3JtYXRVVENQZXJpb2QsXG4gICAgICBcIlNcIjogZm9ybWF0VVRDU2Vjb25kcyxcbiAgICAgIFwiVVwiOiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5LFxuICAgICAgXCJ3XCI6IGZvcm1hdFVUQ1dlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogZm9ybWF0VVRDV2Vla051bWJlck1vbmRheSxcbiAgICAgIFwieFwiOiBudWxsLFxuICAgICAgXCJYXCI6IG51bGwsXG4gICAgICBcInlcIjogZm9ybWF0VVRDWWVhcixcbiAgICAgIFwiWVwiOiBmb3JtYXRVVENGdWxsWWVhcixcbiAgICAgIFwiWlwiOiBmb3JtYXRVVENab25lLFxuICAgICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gICAgfTtcblxuICAgIHZhciBwYXJzZXMgPSB7XG4gICAgICBcImFcIjogcGFyc2VTaG9ydFdlZWtkYXksXG4gICAgICBcIkFcIjogcGFyc2VXZWVrZGF5LFxuICAgICAgXCJiXCI6IHBhcnNlU2hvcnRNb250aCxcbiAgICAgIFwiQlwiOiBwYXJzZU1vbnRoLFxuICAgICAgXCJjXCI6IHBhcnNlTG9jYWxlRGF0ZVRpbWUsXG4gICAgICBcImRcIjogcGFyc2VEYXlPZk1vbnRoLFxuICAgICAgXCJlXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICAgIFwiSFwiOiBwYXJzZUhvdXIyNCxcbiAgICAgIFwiSVwiOiBwYXJzZUhvdXIyNCxcbiAgICAgIFwialwiOiBwYXJzZURheU9mWWVhcixcbiAgICAgIFwiTFwiOiBwYXJzZU1pbGxpc2Vjb25kcyxcbiAgICAgIFwibVwiOiBwYXJzZU1vbnRoTnVtYmVyLFxuICAgICAgXCJNXCI6IHBhcnNlTWludXRlcyxcbiAgICAgIFwicFwiOiBwYXJzZVBlcmlvZCxcbiAgICAgIFwiU1wiOiBwYXJzZVNlY29uZHMsXG4gICAgICBcIlVcIjogcGFyc2VXZWVrTnVtYmVyU3VuZGF5LFxuICAgICAgXCJ3XCI6IHBhcnNlV2Vla2RheU51bWJlcixcbiAgICAgIFwiV1wiOiBwYXJzZVdlZWtOdW1iZXJNb25kYXksXG4gICAgICBcInhcIjogcGFyc2VMb2NhbGVEYXRlLFxuICAgICAgXCJYXCI6IHBhcnNlTG9jYWxlVGltZSxcbiAgICAgIFwieVwiOiBwYXJzZVllYXIsXG4gICAgICBcIllcIjogcGFyc2VGdWxsWWVhcixcbiAgICAgIFwiWlwiOiBwYXJzZVpvbmUsXG4gICAgICBcIiVcIjogcGFyc2VMaXRlcmFsUGVyY2VudFxuICAgIH07XG5cbiAgICAvLyBUaGVzZSByZWN1cnNpdmUgZGlyZWN0aXZlIGRlZmluaXRpb25zIG11c3QgYmUgZGVmZXJyZWQuXG4gICAgZm9ybWF0cy54ID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlLCBmb3JtYXRzKTtcbiAgICBmb3JtYXRzLlggPSBuZXdGb3JtYXQobG9jYWxlX3RpbWUsIGZvcm1hdHMpO1xuICAgIGZvcm1hdHMuYyA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZVRpbWUsIGZvcm1hdHMpO1xuICAgIHV0Y0Zvcm1hdHMueCA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZSwgdXRjRm9ybWF0cyk7XG4gICAgdXRjRm9ybWF0cy5YID0gbmV3Rm9ybWF0KGxvY2FsZV90aW1lLCB1dGNGb3JtYXRzKTtcbiAgICB1dGNGb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCB1dGNGb3JtYXRzKTtcblxuICAgIGZ1bmN0aW9uIG5ld0Zvcm1hdChzcGVjaWZpZXIsIGZvcm1hdHMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHZhciBzdHJpbmcgPSBbXSxcbiAgICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgbiA9IHNwZWNpZmllci5sZW5ndGgsXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgcGFkLFxuICAgICAgICAgICAgZm9ybWF0O1xuXG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgaWYgKHNwZWNpZmllci5jaGFyQ29kZUF0KGkpID09PSAzNykge1xuICAgICAgICAgICAgc3RyaW5nLnB1c2goc3BlY2lmaWVyLnNsaWNlKGosIGkpKTtcbiAgICAgICAgICAgIGlmICgocGFkID0gcGFkc1tjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpXSkgIT0gbnVsbCkgYyA9IHNwZWNpZmllci5jaGFyQXQoKytpKTtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPSBmb3JtYXRzW2NdKSBjID0gZm9ybWF0KGRhdGUsIHBhZCA9PSBudWxsID8gKGMgPT09IFwiZVwiID8gXCIgXCIgOiBcIjBcIikgOiBwYWQpO1xuICAgICAgICAgICAgc3RyaW5nLnB1c2goYyk7XG4gICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5nLnB1c2goc3BlY2lmaWVyLnNsaWNlKGosIGkpKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgdmFyIGQgPSBuZXdZZWFyKDE5MDApLFxuICAgICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nLCAwKTtcbiAgICAgICAgaWYgKGkgIT0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gVGhlIGFtLXBtIGZsYWcgaXMgMCBmb3IgQU0sIGFuZCAxIGZvciBQTS5cbiAgICAgICAgaWYgKFwicFwiIGluIGQpIGQuSCA9IGQuSCAlIDEyICsgZC5wICogMTI7XG5cbiAgICAgICAgLy8gSWYgYSB0aW1lIHpvbmUgaXMgc3BlY2lmaWVkLCBhbGwgZmllbGRzIGFyZSBpbnRlcnByZXRlZCBhcyBVVEMgYW5kIHRoZW5cbiAgICAgICAgLy8gb2Zmc2V0IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIHRpbWUgem9uZS5cbiAgICAgICAgaWYgKFwiWlwiIGluIGQpIHtcbiAgICAgICAgICBpZiAoXCJ3XCIgaW4gZCAmJiAoXCJXXCIgaW4gZCB8fCBcIlVcIiBpbiBkKSkge1xuICAgICAgICAgICAgdmFyIGRheSA9IHV0Y0RhdGUobmV3WWVhcihkLnkpKS5nZXRVVENEYXkoKTtcbiAgICAgICAgICAgIGlmIChcIldcIiBpbiBkKSBkLlUgPSBkLlcsIGQudyA9IChkLncgKyA2KSAlIDcsIC0tZGF5O1xuICAgICAgICAgICAgZC5tID0gMDtcbiAgICAgICAgICAgIGQuZCA9IGQudyArIGQuVSAqIDcgLSAoZGF5ICsgNikgJSA3O1xuICAgICAgICAgIH1cbiAgICAgICAgICBkLkggKz0gZC5aIC8gMTAwIHwgMDtcbiAgICAgICAgICBkLk0gKz0gZC5aICUgMTAwO1xuICAgICAgICAgIHJldHVybiB1dGNEYXRlKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhbGwgZmllbGRzIGFyZSBpbiBsb2NhbCB0aW1lLlxuICAgICAgICBpZiAoXCJ3XCIgaW4gZCAmJiAoXCJXXCIgaW4gZCB8fCBcIlVcIiBpbiBkKSkge1xuICAgICAgICAgIHZhciBkYXkgPSBuZXdEYXRlKG5ld1llYXIoZC55KSkuZ2V0RGF5KCk7XG4gICAgICAgICAgaWYgKFwiV1wiIGluIGQpIGQuVSA9IGQuVywgZC53ID0gKGQudyArIDYpICUgNywgLS1kYXk7XG4gICAgICAgICAgZC5tID0gMDtcbiAgICAgICAgICBkLmQgPSBkLncgKyBkLlUgKiA3IC0gKGRheSArIDYpICUgNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0ZShkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTcGVjaWZpZXIoZCwgc3BlY2lmaWVyLCBzdHJpbmcsIGopIHtcbiAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICBuID0gc3BlY2lmaWVyLmxlbmd0aCxcbiAgICAgICAgICBtID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICBjLFxuICAgICAgICAgIHBhcnNlO1xuXG4gICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgaWYgKGogPj0gbSkgcmV0dXJuIC0xO1xuICAgICAgICBjID0gc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgYyA9IHNwZWNpZmllci5jaGFyQXQoaSsrKTtcbiAgICAgICAgICBwYXJzZSA9IHBhcnNlc1tjIGluIHBhZHMgPyBzcGVjaWZpZXIuY2hhckF0KGkrKykgOiBjXTtcbiAgICAgICAgICBpZiAoIXBhcnNlIHx8ICgoaiA9IHBhcnNlKGQsIHN0cmluZywgaikpIDwgMCkpIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChjICE9IHN0cmluZy5jaGFyQ29kZUF0KGorKykpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydFdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHNob3J0V2Vla2RheVJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQudyA9IHNob3J0V2Vla2RheUxvb2t1cC5nZXQoblswXS50b0xvd2VyQ2FzZSgpKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHZhciBuID0gd2Vla2RheVJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQudyA9IHdlZWtkYXlMb29rdXAuZ2V0KG5bMF0udG9Mb3dlckNhc2UoKSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVNob3J0TW9udGgoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHNob3J0TW9udGhSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgICByZXR1cm4gbiA/IChkLm0gPSBzaG9ydE1vbnRoTG9va3VwLmdldChuWzBdLnRvTG93ZXJDYXNlKCkpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHZhciBuID0gbW9udGhSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgICByZXR1cm4gbiA/IChkLm0gPSBtb250aExvb2t1cC5nZXQoblswXS50b0xvd2VyQ2FzZSgpKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9jYWxlRGF0ZVRpbWUoZCwgc3RyaW5nLCBpKSB7XG4gICAgICByZXR1cm4gcGFyc2VTcGVjaWZpZXIoZCwgbG9jYWxlX2RhdGVUaW1lLCBzdHJpbmcsIGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9jYWxlRGF0ZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfZGF0ZSwgc3RyaW5nLCBpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxvY2FsZVRpbWUoZCwgc3RyaW5nLCBpKSB7XG4gICAgICByZXR1cm4gcGFyc2VTcGVjaWZpZXIoZCwgbG9jYWxlX3RpbWUsIHN0cmluZywgaSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQZXJpb2QoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHBlcmlvZExvb2t1cC5nZXQoc3RyaW5nLnNsaWNlKGksIGkgKz0gMikudG9Mb3dlckNhc2UoKSk7XG4gICAgICByZXR1cm4gbiA9PSBudWxsID8gLTEgOiAoZC5wID0gbiwgaSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0U2hvcnRXZWVrZGF5KGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRXZWVrZGF5c1tkLmdldERheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRXZWVrZGF5KGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfd2Vla2RheXNbZC5nZXREYXkoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0U2hvcnRNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3Nob3J0TW9udGhzW2QuZ2V0TW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0TW9udGgoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9tb250aHNbZC5nZXRNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRQZXJpb2QoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9wZXJpb2RzWysoZC5nZXRIb3VycygpID49IDEyKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VVRDU2hvcnRXZWVrZGF5KGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRXZWVrZGF5c1tkLmdldFVUQ0RheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrZGF5KGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfd2Vla2RheXNbZC5nZXRVVENEYXkoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VVRDU2hvcnRNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3Nob3J0TW9udGhzW2QuZ2V0VVRDTW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VVRDTW9udGgoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9tb250aHNbZC5nZXRVVENNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENQZXJpb2QoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9wZXJpb2RzWysoZC5nZXRVVENIb3VycygpID49IDEyKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICAgIHZhciBmID0gbmV3Rm9ybWF0KHNwZWNpZmllciArPSBcIlwiLCBmb3JtYXRzKTtcbiAgICAgICAgZi5wYXJzZSA9IG5ld1BhcnNlKHNwZWNpZmllciwgbG9jYWxEYXRlKTtcbiAgICAgICAgZi50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3BlY2lmaWVyOyB9O1xuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH0sXG4gICAgICB1dGNGb3JtYXQ6IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICAgICAgICB2YXIgZiA9IG5ld0Zvcm1hdChzcGVjaWZpZXIgKz0gXCJcIiwgdXRjRm9ybWF0cyk7XG4gICAgICAgIGYucGFyc2UgPSBuZXdQYXJzZShzcGVjaWZpZXIsIHV0Y0RhdGUpO1xuICAgICAgICBmLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgcGFkcyA9IHtcIi1cIjogXCJcIiwgXCJfXCI6IFwiIFwiLCBcIjBcIjogXCIwXCJ9O1xuICB2YXIgbnVtYmVyUmUgPSAvXlxccypcXGQrLztcbiAgdmFyIHBlcmNlbnRSZSA9IC9eJS87XG4gIHZhciByZXF1b3RlUmUgPSAvW1xcXFxcXF5cXCRcXCpcXCtcXD9cXHxcXFtcXF1cXChcXClcXC5cXHtcXH1dL2c7XG5cbiAgZnVuY3Rpb24gcGFkKHZhbHVlLCBmaWxsLCB3aWR0aCkge1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwID8gXCItXCIgOiBcIlwiLFxuICAgICAgICBzdHJpbmcgPSAoc2lnbiA/IC12YWx1ZSA6IHZhbHVlKSArIFwiXCIsXG4gICAgICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgcmV0dXJuIHNpZ24gKyAobGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpICsgc3RyaW5nIDogc3RyaW5nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXVvdGUocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UocmVxdW90ZVJlLCBcIlxcXFwkJlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFJlKG5hbWVzKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKD86XCIgKyBuYW1lcy5tYXAocmVxdW90ZSkuam9pbihcInxcIikgKyBcIilcIiwgXCJpXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TG9va3VwKG5hbWVzKSB7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXAsIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgbWFwLnNldChuYW1lc1tpXS50b0xvd2VyQ2FzZSgpLCBpKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5TnVtYmVyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDEpKTtcbiAgICByZXR1cm4gbiA/IChkLncgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VXZWVrTnVtYmVyU3VuZGF5KGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQuVSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVdlZWtOdW1iZXJNb25kYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5XID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRnVsbFllYXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgNCkpO1xuICAgIHJldHVybiBuID8gKGQueSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVllYXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGQueSA9ICtuWzBdICsgKCtuWzBdID4gNjggPyAxOTAwIDogMjAwMCksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlWm9uZShkLCBzdHJpbmcsIGkpIHtcbiAgICByZXR1cm4gL15bKy1dXFxkezR9JC8udGVzdChzdHJpbmcgPSBzdHJpbmcuc2xpY2UoaSwgaSArIDUpKVxuICAgICAgICA/IChkLlogPSAtc3RyaW5nLCBpICsgNSkgLy8gc2lnbiBkaWZmZXJzIGZyb20gZ2V0VGltZXpvbmVPZmZzZXQhXG4gICAgICAgIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1vbnRoTnVtYmVyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSBuWzBdIC0gMSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VEYXlPZk1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VEYXlPZlllYXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMykpO1xuICAgIHJldHVybiBuID8gKGQubSA9IDAsIGQuZCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhvdXIyNChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5IID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTWludXRlcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5NID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU2Vjb25kcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5TID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTWlsbGlzZWNvbmRzKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDMpKTtcbiAgICByZXR1cm4gbiA/IChkLkwgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VMaXRlcmFsUGVyY2VudChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IHBlcmNlbnRSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gaSArIG5bMF0ubGVuZ3RoIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXREYXlPZk1vbnRoKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0RGF0ZSgpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEhvdXIyNChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEhvdXJzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0SG91cjEyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdERheU9mWWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZCgxICsgZGF5LmNvdW50KHllYXIoZCksIGQpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1pbGxpc2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbGxpc2Vjb25kcygpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1vbnRoTnVtYmVyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0TW9udGgoKSArIDEsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TWludXRlcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1pbnV0ZXMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRTZWNvbmRzKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0U2Vjb25kcygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFdlZWtOdW1iZXJTdW5kYXkoZCwgcCkge1xuICAgIHJldHVybiBwYWQoc3VuZGF5LmNvdW50KHllYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFdlZWtkYXlOdW1iZXIoZCkge1xuICAgIHJldHVybiBkLmdldERheSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChtb25kYXkuY291bnQoeWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0WWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEZ1bGxZZWFyKCkgJSAxMDAsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0RnVsbFllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwMDAsIHAsIDQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Wm9uZShkKSB7XG4gICAgdmFyIHogPSBkLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgcmV0dXJuICh6ID4gMCA/IFwiLVwiIDogKHogKj0gLTEsIFwiK1wiKSlcbiAgICAgICAgKyBwYWQoeiAvIDYwIHwgMCwgXCIwXCIsIDIpXG4gICAgICAgICsgcGFkKHogJSA2MCwgXCIwXCIsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDRGF5T2ZNb250aChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0RhdGUoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENIb3VyMjQoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENIb3VycygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0hvdXIxMihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENEYXlPZlllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoMSArIHV0Y0RheS5jb3VudCh1dGNZZWFyKGQpLCBkKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNaWxsaXNlY29uZHMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaWxsaXNlY29uZHMoKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENNb250aE51bWJlcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ01vbnRoKCkgKyAxLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01pbnV0ZXMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENNaW51dGVzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDU2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ1NlY29uZHMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKHV0Y1N1bmRheS5jb3VudCh1dGNZZWFyKGQpLCBkKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyKGQpIHtcbiAgICByZXR1cm4gZC5nZXRVVENEYXkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtOdW1iZXJNb25kYXkoZCwgcCkge1xuICAgIHJldHVybiBwYWQodXRjTW9uZGF5LmNvdW50KHV0Y1llYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1llYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0Z1bGxZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDRnVsbFllYXIoKSAlIDEwMDAwLCBwLCA0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1pvbmUoKSB7XG4gICAgcmV0dXJuIFwiKzAwMDBcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdExpdGVyYWxQZXJjZW50KCkge1xuICAgIHJldHVybiBcIiVcIjtcbiAgfVxuXG4gIHZhciBpc29TcGVjaWZpZXIgPSBcIiVZLSVtLSVkVCVIOiVNOiVTLiVMWlwiO1xuXG4gIGZ1bmN0aW9uIGZvcm1hdElzb05hdGl2ZShkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxuXG4gIGZvcm1hdElzb05hdGl2ZS5wYXJzZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoc3RyaW5nKTtcbiAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyBudWxsIDogZGF0ZTtcbiAgfTtcblxuICBmb3JtYXRJc29OYXRpdmUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaXNvU3BlY2lmaWVyO1xuICB9O1xuXG4gIHZhciBmb3JtYXRJc28gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZyAmJiArbmV3IERhdGUoXCIyMDAwLTAxLTAxVDAwOjAwOjAwLjAwMFpcIilcbiAgICAgID8gZm9ybWF0SXNvTmF0aXZlXG4gICAgICA6IGVuVXMudXRjRm9ybWF0KGlzb1NwZWNpZmllcik7XG5cbiAgdmFyIGlzb0Zvcm1hdCA9IGZvcm1hdElzbztcblxuICB2YXIgbG9jYWxlRGVmaW5pdGlvbnMgPSAobmV3IE1hcClcbiAgICAgIC5zZXQoXCJjYS1FU1wiLCBjYUVzKVxuICAgICAgLnNldChcImRlLURFXCIsIGRlRGUpXG4gICAgICAuc2V0KFwiZW4tQ0FcIiwgZW5DYSlcbiAgICAgIC5zZXQoXCJlbi1HQlwiLCBlbkdiKVxuICAgICAgLnNldChcImVuLVVTXCIsIGVuVXMpXG4gICAgICAuc2V0KFwiZXMtRVNcIiwgZXNFcylcbiAgICAgIC5zZXQoXCJmaS1GSVwiLCBmaUZpKVxuICAgICAgLnNldChcImZyLUNBXCIsIGZyQ2EpXG4gICAgICAuc2V0KFwiZnItRlJcIiwgZnJGcilcbiAgICAgIC5zZXQoXCJoZS1JTFwiLCBoZUlsKVxuICAgICAgLnNldChcIml0LUlUXCIsIGl0SXQpXG4gICAgICAuc2V0KFwibWstTUtcIiwgbWtNaylcbiAgICAgIC5zZXQoXCJubC1OTFwiLCBubE5sKVxuICAgICAgLnNldChcInBsLVBMXCIsIHBsUGwpXG4gICAgICAuc2V0KFwicHQtQlJcIiwgcHRCcilcbiAgICAgIC5zZXQoXCJydS1SVVwiLCBydVJ1KVxuICAgICAgLnNldChcInpoLUNOXCIsIHpoQ24pO1xuXG4gIHZhciBkZWZhdWx0TG9jYWxlID0gbG9jYWxlKGVuVXMpO1xuICBleHBvcnRzLmZvcm1hdCA9IGRlZmF1bHRMb2NhbGUuZm9ybWF0O1xuICBleHBvcnRzLnV0Y0Zvcm1hdCA9IGRlZmF1bHRMb2NhbGUudXRjRm9ybWF0O1xuXG4gIGZ1bmN0aW9uIGxvY2FsZUZvcm1hdChkZWZpbml0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbml0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBkZWZpbml0aW9uID0gbG9jYWxlRGVmaW5pdGlvbnMuZ2V0KGRlZmluaXRpb24pO1xuICAgICAgaWYgKCFkZWZpbml0aW9uKSByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsZShkZWZpbml0aW9uKTtcbiAgfVxuICA7XG5cbiAgZXhwb3J0cy5sb2NhbGVGb3JtYXQgPSBsb2NhbGVGb3JtYXQ7XG4gIGV4cG9ydHMuaXNvRm9ybWF0ID0gaXNvRm9ybWF0O1xuXG59KSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwudGltZSA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdDEgPSBuZXcgRGF0ZTtcblxuICB2YXIgdDAgPSBuZXcgRGF0ZTtcblxuICBmdW5jdGlvbiBuZXdJbnRlcnZhbChmbG9vcmksIG9mZnNldGksIGNvdW50KSB7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnZhbChkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSkpLCBkYXRlO1xuICAgIH1cblxuICAgIGludGVydmFsLmZsb29yID0gaW50ZXJ2YWw7XG5cbiAgICBpbnRlcnZhbC5yb3VuZCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IG5ldyBEYXRlKCtkYXRlKSxcbiAgICAgICAgICBkMSA9IG5ldyBEYXRlKGRhdGUgLSAxKTtcbiAgICAgIGZsb29yaShkMCksIGZsb29yaShkMSksIG9mZnNldGkoZDEsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfTtcblxuICAgIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZmxvb3JpKGRhdGUgPSBuZXcgRGF0ZShkYXRlIC0gMSkpLCBvZmZzZXRpKGRhdGUsIDEpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5vZmZzZXQgPSBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0aShkYXRlID0gbmV3IERhdGUoK2RhdGUpLCBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKSksIGRhdGU7XG4gICAgfTtcblxuICAgIGludGVydmFsLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCAtIDEpO1xuICAgICAgc3RvcCA9IG5ldyBEYXRlKCtzdG9wKTtcbiAgICAgIHN0ZXAgPSBzdGVwID09IG51bGwgPyAxIDogTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIGlmICghKHN0YXJ0IDwgc3RvcCkgfHwgIShzdGVwID4gMCkpIHJldHVybiByYW5nZTsgLy8gYWxzbyBoYW5kbGVzIEludmFsaWQgRGF0ZVxuICAgICAgb2Zmc2V0aShzdGFydCwgMSksIGZsb29yaShzdGFydCk7XG4gICAgICBpZiAoc3RhcnQgPCBzdG9wKSByYW5nZS5wdXNoKG5ldyBEYXRlKCtzdGFydCkpO1xuICAgICAgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHdoaWxlIChmbG9vcmkoZGF0ZSksICF0ZXN0KGRhdGUpKSBkYXRlLnNldFRpbWUoZGF0ZSAtIDEpO1xuICAgICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgICB3aGlsZSAoLS1zdGVwID49IDApIHdoaWxlIChvZmZzZXRpKGRhdGUsIDEpLCAhdGVzdChkYXRlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGNvdW50KSBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGludGVydmFsO1xuICB9XG5cbiAgdmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyAxZTM7XG4gIH0pO1xuXG4gIGV4cG9ydHMuc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0U2Vjb25kcygwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyA2ZTQ7XG4gIH0pO1xuXG4gIGV4cG9ydHMubWludXRlcyA9IG1pbnV0ZS5yYW5nZTtcblxuICB2YXIgaG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1pbnV0ZXMoMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDM2ZTU7XG4gIH0pO1xuXG4gIGV4cG9ydHMuaG91cnMgPSBob3VyLnJhbmdlO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogNmU0KSAvIDg2NGU1O1xuICB9KTtcblxuICBleHBvcnRzLmRheXMgPSBkYXkucmFuZ2U7XG5cbiAgZnVuY3Rpb24gd2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0IC0gKGVuZC5nZXRUaW1lem9uZU9mZnNldCgpIC0gc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gNjA0OGU1O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5zdW5kYXkgPSB3ZWVrZGF5KDApO1xuXG4gIGV4cG9ydHMuc3VuZGF5cyA9IGV4cG9ydHMuc3VuZGF5LnJhbmdlO1xuXG4gIGV4cG9ydHMubW9uZGF5ID0gd2Vla2RheSgxKTtcblxuICBleHBvcnRzLm1vbmRheXMgPSBleHBvcnRzLm1vbmRheS5yYW5nZTtcblxuICBleHBvcnRzLnR1ZXNkYXkgPSB3ZWVrZGF5KDIpO1xuXG4gIGV4cG9ydHMudHVlc2RheXMgPSBleHBvcnRzLnR1ZXNkYXkucmFuZ2U7XG5cbiAgZXhwb3J0cy53ZWRuZXNkYXkgPSB3ZWVrZGF5KDMpO1xuXG4gIGV4cG9ydHMud2VkbmVzZGF5cyA9IGV4cG9ydHMud2VkbmVzZGF5LnJhbmdlO1xuXG4gIGV4cG9ydHMudGh1cnNkYXkgPSB3ZWVrZGF5KDQpO1xuXG4gIGV4cG9ydHMudGh1cnNkYXlzID0gZXhwb3J0cy50aHVyc2RheS5yYW5nZTtcblxuICBleHBvcnRzLmZyaWRheSA9IHdlZWtkYXkoNSk7XG5cbiAgZXhwb3J0cy5mcmlkYXlzID0gZXhwb3J0cy5mcmlkYXkucmFuZ2U7XG5cbiAgZXhwb3J0cy5zYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbiAgZXhwb3J0cy5zYXR1cmRheXMgPSBleHBvcnRzLnNhdHVyZGF5LnJhbmdlO1xuXG4gIHZhciB3ZWVrID0gZXhwb3J0cy5zdW5kYXk7XG5cbiAgZXhwb3J0cy53ZWVrcyA9IHdlZWsucmFuZ2U7XG5cbiAgdmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXREYXRlKDEpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyBzdGVwKTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICB9KTtcblxuICBleHBvcnRzLm1vbnRocyA9IG1vbnRoLnJhbmdlO1xuXG4gIHZhciB5ZWFyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpO1xuICB9KTtcblxuICBleHBvcnRzLnllYXJzID0geWVhci5yYW5nZTtcblxuICB2YXIgdXRjU2Vjb25kID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWlsbGlzZWNvbmRzKDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDFlMyk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDFlMztcbiAgfSk7XG5cbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gdXRjU2Vjb25kLnJhbmdlO1xuXG4gIHZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIDZlNCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDZlNDtcbiAgfSk7XG5cbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlLnJhbmdlO1xuXG4gIHZhciB1dGNIb3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDTWludXRlcygwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gMzZlNTtcbiAgfSk7XG5cbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDg2NGU1O1xuICB9KTtcblxuICBleHBvcnRzLnV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSAoZGF0ZS5nZXRVVENEYXkoKSArIDcgLSBpKSAlIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIDYwNDhlNTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMudXRjU3VuZGF5ID0gdXRjV2Vla2RheSgwKTtcblxuICBleHBvcnRzLnV0Y1N1bmRheXMgPSBleHBvcnRzLnV0Y1N1bmRheS5yYW5nZTtcblxuICBleHBvcnRzLnV0Y01vbmRheSA9IHV0Y1dlZWtkYXkoMSk7XG5cbiAgZXhwb3J0cy51dGNNb25kYXlzID0gZXhwb3J0cy51dGNNb25kYXkucmFuZ2U7XG5cbiAgZXhwb3J0cy51dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcblxuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gZXhwb3J0cy51dGNUdWVzZGF5LnJhbmdlO1xuXG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcblxuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSBleHBvcnRzLnV0Y1dlZG5lc2RheS5yYW5nZTtcblxuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcblxuICBleHBvcnRzLnV0Y1RodXJzZGF5cyA9IGV4cG9ydHMudXRjVGh1cnNkYXkucmFuZ2U7XG5cbiAgZXhwb3J0cy51dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xuXG4gIGV4cG9ydHMudXRjRnJpZGF5cyA9IGV4cG9ydHMudXRjRnJpZGF5LnJhbmdlO1xuXG4gIGV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNXZWVrZGF5KDYpO1xuXG4gIGV4cG9ydHMudXRjU2F0dXJkYXlzID0gZXhwb3J0cy51dGNTYXR1cmRheS5yYW5nZTtcblxuICB2YXIgdXRjV2VlayA9IGV4cG9ydHMudXRjU3VuZGF5O1xuXG4gIGV4cG9ydHMudXRjV2Vla3MgPSB1dGNXZWVrLnJhbmdlO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSk7XG5cbiAgZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aC5yYW5nZTtcblxuICB2YXIgdXRjWWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSk7XG5cbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgZXhwb3J0cy5pbnRlcnZhbCA9IG5ld0ludGVydmFsO1xuICBleHBvcnRzLnNlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy5taW51dGUgPSBtaW51dGU7XG4gIGV4cG9ydHMuaG91ciA9IGhvdXI7XG4gIGV4cG9ydHMuZGF5ID0gZGF5O1xuICBleHBvcnRzLndlZWsgPSB3ZWVrO1xuICBleHBvcnRzLm1vbnRoID0gbW9udGg7XG4gIGV4cG9ydHMueWVhciA9IHllYXI7XG4gIGV4cG9ydHMudXRjU2Vjb25kID0gdXRjU2Vjb25kO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNEYXkgPSB1dGNEYXk7XG4gIGV4cG9ydHMudXRjV2VlayA9IHV0Y1dlZWs7XG4gIGV4cG9ydHMudXRjTW9udGggPSB1dGNNb250aDtcbiAgZXhwb3J0cy51dGNZZWFyID0gdXRjWWVhcjtcblxufSkpOyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIE1lYXN1cmVzID0gcmVxdWlyZSgnLi9tZWFzdXJlcycpLFxuICAgIENvbGxlY3RvciA9IHJlcXVpcmUoJy4vY29sbGVjdG9yJyk7XG5cbmZ1bmN0aW9uIEFnZ3JlZ2F0b3IoKSB7XG4gIHRoaXMuX2NlbGxzID0ge307XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgdGhpcy5fc3RyZWFtID0gZmFsc2U7XG59XG5cbnZhciBGbGFncyA9IEFnZ3JlZ2F0b3IuRmxhZ3MgPSB7XG4gIEFERF9DRUxMOiAxLFxuICBNT0RfQ0VMTDogMlxufTtcblxudmFyIHByb3RvID0gQWdncmVnYXRvci5wcm90b3R5cGU7XG5cbi8vIFBhcmFtZXRlcnNcblxucHJvdG8uc3RyZWFtID0gZnVuY3Rpb24odikge1xuICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICB0aGlzLl9zdHJlYW0gPSAhIXY7XG4gIHRoaXMuX2FnZ3IgPSBbXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBrZXkgYWNjZXNzb3IgdG8gdXNlIGZvciBzdHJlYW1pbmcgcmVtb3Zlc1xucHJvdG8ua2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX2tleTtcbiAgdGhpcy5fa2V5ID0gdXRpbC4kKGtleSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gSW5wdXQ6IGFycmF5IG9mIG9iamVjdHMgb2YgdGhlIGZvcm1cbi8vIHtuYW1lOiBzdHJpbmcsIGdldDogZnVuY3Rpb259XG5wcm90by5ncm91cGJ5ID0gZnVuY3Rpb24oZGltcykge1xuICB0aGlzLl9kaW1zID0gdXRpbC5hcnJheShkaW1zKS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgIGQgPSB1dGlsLmlzU3RyaW5nKGQpID8ge25hbWU6IGQsIGdldDogdXRpbC4kKGQpfVxuICAgICAgOiB1dGlsLmlzRnVuY3Rpb24oZCkgPyB7bmFtZTogdXRpbC5uYW1lKGQpIHx8IGQubmFtZSB8fCAoJ18nICsgaSksIGdldDogZH1cbiAgICAgIDogKGQubmFtZSAmJiB1dGlsLmlzRnVuY3Rpb24oZC5nZXQpKSA/IGQgOiBudWxsO1xuICAgIGlmIChkID09IG51bGwpIHRocm93ICdJbnZhbGlkIGdyb3VwYnkgYXJndW1lbnQ6ICcgKyBkO1xuICAgIHJldHVybiBkO1xuICB9KTtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcbn07XG5cbi8vIElucHV0OiBhcnJheSBvZiBvYmplY3RzIG9mIHRoZSBmb3JtXG4vLyB7bmFtZTogc3RyaW5nLCBvcHM6IFtzdHJpbmcsIC4uLl19XG5wcm90by5zdW1tYXJpemUgPSBmdW5jdGlvbihmaWVsZHMpIHtcbiAgZmllbGRzID0gc3VtbWFyaXplX2FyZ3MoZmllbGRzKTtcbiAgdGhpcy5fY291bnQgPSB0cnVlO1xuICB2YXIgYWdnciA9ICh0aGlzLl9hZ2dyID0gW10pLFxuICAgICAgbSwgZiwgaSwgaiwgb3AsIGFzLCBnZXQ7XG5cbiAgZm9yIChpPTA7IGk8ZmllbGRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChqPTAsIG09W10sIGY9ZmllbGRzW2ldOyBqPGYub3BzLmxlbmd0aDsgKytqKSB7XG4gICAgICBvcCA9IGYub3BzW2pdO1xuICAgICAgaWYgKG9wICE9PSAnY291bnQnKSB0aGlzLl9jb3VudCA9IGZhbHNlO1xuICAgICAgYXMgPSAoZi5hcyAmJiBmLmFzW2pdKSB8fCAob3AgKyAoZi5uYW1lPT09JyonID8gJycgOiAnXycrZi5uYW1lKSk7XG4gICAgICBtLnB1c2goTWVhc3VyZXNbb3BdKGFzKSk7XG4gICAgfVxuICAgIGdldCA9IGYuZ2V0ICYmIHV0aWwuJChmLmdldCkgfHxcbiAgICAgIChmLm5hbWUgPT09ICcqJyA/IHV0aWwuaWRlbnRpdHkgOiB1dGlsLiQoZi5uYW1lKSk7XG4gICAgYWdnci5wdXNoKHtcbiAgICAgIG5hbWU6IGYubmFtZSxcbiAgICAgIG1lYXN1cmVzOiBNZWFzdXJlcy5jcmVhdGUoXG4gICAgICAgIG0sXG4gICAgICAgIHRoaXMuX3N0cmVhbSwgLy8gc3RyZWFtaW5nIHJlbW92ZSBmbGFnXG4gICAgICAgIGdldCwgICAgICAgICAgLy8gaW5wdXQgdHVwbGUgZ2V0dGVyXG4gICAgICAgIHRoaXMuX2Fzc2lnbikgLy8gb3V0cHV0IHR1cGxlIHNldHRlclxuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLmNsZWFyKCk7XG59O1xuXG4vLyBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VtbWFyaXplIGJ5IGNvdW50XG5wcm90by5jb3VudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdW1tYXJpemUoeycqJzonY291bnQnfSk7XG59O1xuXG4vLyBPdmVycmlkZSB0byBwZXJmb3JtIGN1c3RvbSB0dXBsZSB2YWx1ZSBhc3NpZ25tZW50XG5wcm90by5fYXNzaWduID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIHN1bW1hcml6ZV9hcmdzKGZpZWxkcykge1xuICBpZiAodXRpbC5pc0FycmF5KGZpZWxkcykpIHsgcmV0dXJuIGZpZWxkczsgfVxuICBpZiAoZmllbGRzID09IG51bGwpIHsgcmV0dXJuIFtdOyB9XG4gIHZhciBhID0gW10sIG5hbWUsIG9wcztcbiAgZm9yIChuYW1lIGluIGZpZWxkcykge1xuICAgIG9wcyA9IHV0aWwuYXJyYXkoZmllbGRzW25hbWVdKTtcbiAgICBhLnB1c2goe25hbWU6IG5hbWUsIG9wczogb3BzfSk7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIENlbGwgTWFuYWdlbWVudFxuXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuX2NlbGxzID0ge30sIHRoaXMpO1xufTtcblxucHJvdG8uX2NlbGxrZXkgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBkID0gdGhpcy5fZGltcyxcbiAgICAgIG4gPSBkLmxlbmd0aCwgaSxcbiAgICAgIGsgPSBTdHJpbmcoZFswXS5nZXQoeCkpO1xuICBmb3IgKGk9MTsgaTxuOyArK2kpIHtcbiAgICBrICs9ICd8JyArIGRbaV0uZ2V0KHgpO1xuICB9XG4gIHJldHVybiBrO1xufTtcblxucHJvdG8uX2NlbGwgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXkgPSB0aGlzLl9kaW1zLmxlbmd0aCA/IHRoaXMuX2NlbGxrZXkoeCkgOiAnJztcbiAgcmV0dXJuIHRoaXMuX2NlbGxzW2tleV0gfHwgKHRoaXMuX2NlbGxzW2tleV0gPSB0aGlzLl9uZXdjZWxsKHgpKTtcbn07XG5cbnByb3RvLl9uZXdjZWxsID0gZnVuY3Rpb24oeCkge1xuICB2YXIgY2VsbCA9IHtcbiAgICBudW06ICAgMCxcbiAgICB0dXBsZTogdGhpcy5fbmV3dHVwbGUoeCksXG4gICAgZmxhZzogIEZsYWdzLkFERF9DRUxMLFxuICAgIGFnZ3M6ICB7fVxuICB9O1xuXG4gIHZhciBhZ2dyID0gdGhpcy5fYWdnciwgaTtcbiAgZm9yIChpPTA7IGk8YWdnci5sZW5ndGg7ICsraSkge1xuICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdID0gbmV3IGFnZ3JbaV0ubWVhc3VyZXMoY2VsbCwgY2VsbC50dXBsZSk7XG4gIH1cbiAgaWYgKGNlbGwuY29sbGVjdCkge1xuICAgIGNlbGwuZGF0YSA9IG5ldyBDb2xsZWN0b3IodGhpcy5fa2V5KTtcbiAgfVxuICByZXR1cm4gY2VsbDtcbn07XG5cbnByb3RvLl9uZXd0dXBsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGRpbXMgPSB0aGlzLl9kaW1zLFxuICAgICAgdCA9IHt9LCBpLCBuO1xuICBmb3IgKGk9MCwgbj1kaW1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB0W2RpbXNbaV0ubmFtZV0gPSBkaW1zW2ldLmdldCh4KTtcbiAgfVxuICByZXR1cm4gdGhpcy5faW5nZXN0KHQpO1xufTtcblxuLy8gT3ZlcnJpZGUgdG8gcGVyZm9ybSBjdXN0b20gdHVwbGUgaW5nZXN0aW9uXG5wcm90by5faW5nZXN0ID0gdXRpbC5pZGVudGl0eTtcblxuLy8gUHJvY2VzcyBUdXBsZXNcblxucHJvdG8uX2FkZCA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsKHgpLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG5cbiAgY2VsbC5udW0gKz0gMTtcbiAgaWYgKCF0aGlzLl9jb3VudCkgeyAvLyBza2lwIGlmIGNvdW50LW9ubHlcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSBjZWxsLmRhdGEuYWRkKHgpO1xuICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLmFkZCh4KTtcbiAgICB9XG4gIH1cbiAgY2VsbC5mbGFnIHw9IEZsYWdzLk1PRF9DRUxMO1xufTtcblxucHJvdG8uX3JlbSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsKHgpLFxuICAgICAgYWdnciA9IHRoaXMuX2FnZ3IsIGk7XG5cbiAgY2VsbC5udW0gLT0gMTtcbiAgaWYgKCF0aGlzLl9jb3VudCkgeyAvLyBza2lwIGlmIGNvdW50LW9ubHlcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSBjZWxsLmRhdGEucmVtKHgpO1xuICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNlbGwuYWdnc1thZ2dyW2ldLm5hbWVdLnJlbSh4KTtcbiAgICB9XG4gIH1cbiAgY2VsbC5mbGFnIHw9IEZsYWdzLk1PRF9DRUxMO1xufTtcblxucHJvdG8uX21vZCA9IGZ1bmN0aW9uKGN1cnIsIHByZXYpIHtcbiAgdmFyIGNlbGwwID0gdGhpcy5fY2VsbChwcmV2KSxcbiAgICAgIGNlbGwxID0gdGhpcy5fY2VsbChjdXJyKSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLCBpO1xuXG4gIGlmIChjZWxsMCAhPT0gY2VsbDEpIHtcbiAgICBjZWxsMC5udW0gLT0gMTtcbiAgICBjZWxsMS5udW0gKz0gMTtcbiAgICBpZiAoY2VsbDAuY29sbGVjdCkgY2VsbDAuZGF0YS5yZW0ocHJldik7XG4gICAgaWYgKGNlbGwxLmNvbGxlY3QpIGNlbGwxLmRhdGEuYWRkKGN1cnIpO1xuICB9IGVsc2UgaWYgKGNlbGwwLmNvbGxlY3QgJiYgIXV0aWwuaXNPYmplY3QoY3VycikpIHtcbiAgICBjZWxsMC5kYXRhLnJlbShwcmV2KTtcbiAgICBjZWxsMC5kYXRhLmFkZChjdXJyKTtcbiAgfVxuXG4gIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICBjZWxsMC5hZ2dzW2FnZ3JbaV0ubmFtZV0ucmVtKHByZXYpO1xuICAgIGNlbGwxLmFnZ3NbYWdncltpXS5uYW1lXS5hZGQoY3Vycik7XG4gIH1cbiAgY2VsbDAuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbiAgY2VsbDEuZmxhZyB8PSBGbGFncy5NT0RfQ0VMTDtcbn07XG5cbnByb3RvLnJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICBhZ2dyID0gdGhpcy5fYWdncixcbiAgICAgIGNlbGwsIGksIGs7XG5cbiAgZm9yIChrIGluIHRoaXMuX2NlbGxzKSB7XG4gICAgY2VsbCA9IHRoaXMuX2NlbGxzW2tdO1xuICAgIGlmIChjZWxsLm51bSA+IDApIHtcbiAgICAgIC8vIGNvbnNvbGlkYXRlIGNvbGxlY3RvciB2YWx1ZXNcbiAgICAgIGlmIChjZWxsLmNvbGxlY3QpIHtcbiAgICAgICAgY2VsbC5kYXRhLnZhbHVlcygpO1xuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIHR1cGxlIHByb3BlcnRpZXNcbiAgICAgIGZvciAoaT0wOyBpPGFnZ3IubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2VsbC5hZ2dzW2FnZ3JbaV0ubmFtZV0uc2V0KCk7XG4gICAgICB9XG4gICAgICAvLyBhZGQgb3V0cHV0IHR1cGxlXG4gICAgICByZXN1bHQucHVzaChjZWxsLnR1cGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2tdO1xuICAgIH1cbiAgICBjZWxsLmZsYWcgPSAwO1xuICB9XG5cbiAgdGhpcy5fcmVtcyA9IGZhbHNlO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxucHJvdG8uY2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2hhbmdlcyA9IHthZGQ6W10sIHJlbTpbXSwgbW9kOltdfSxcbiAgICAgIGFnZ3IgPSB0aGlzLl9hZ2dyLFxuICAgICAgY2VsbCwgZmxhZywgaSwgaztcblxuICBmb3IgKGsgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICBjZWxsID0gdGhpcy5fY2VsbHNba107XG4gICAgZmxhZyA9IGNlbGwuZmxhZztcblxuICAgIC8vIGNvbnNvbGlkYXRlIGNvbGxlY3RvciB2YWx1ZXNcbiAgICBpZiAoY2VsbC5jb2xsZWN0KSB7XG4gICAgICBjZWxsLmRhdGEudmFsdWVzKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHR1cGxlIHByb3BlcnRpZXNcbiAgICBmb3IgKGk9MDsgaTxhZ2dyLmxlbmd0aDsgKytpKSB7XG4gICAgICBjZWxsLmFnZ3NbYWdncltpXS5uYW1lXS5zZXQoKTtcbiAgICB9XG5cbiAgICAvLyBvcmdhbml6ZSBvdXRwdXQgdHVwbGVzXG4gICAgaWYgKGNlbGwubnVtIDw9IDApIHtcbiAgICAgIGNoYW5nZXMucmVtLnB1c2goY2VsbC50dXBsZSk7XG4gICAgICBkZWxldGUgdGhpcy5fY2VsbHNba107XG4gICAgfSBlbHNlIGlmIChmbGFnICYgRmxhZ3MuQUREX0NFTEwpIHtcbiAgICAgIGNoYW5nZXMuYWRkLnB1c2goY2VsbC50dXBsZSk7XG4gICAgfSBlbHNlIGlmIChmbGFnICYgRmxhZ3MuTU9EX0NFTEwpIHtcbiAgICAgIGNoYW5nZXMubW9kLnB1c2goY2VsbC50dXBsZSk7XG4gICAgfVxuXG4gICAgY2VsbC5mbGFnID0gMDtcbiAgfVxuXG4gIHRoaXMuX3JlbXMgPSBmYWxzZTtcbiAgcmV0dXJuIGNoYW5nZXM7XG59O1xuXG5wcm90by5leGVjdXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIHRoaXMuY2xlYXIoKS5pbnNlcnQoaW5wdXQpLnJlc3VsdCgpO1xufTtcblxucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgdGhpcy5fY29uc29saWRhdGUoKTtcbiAgZm9yICh2YXIgaT0wOyBpPGlucHV0Lmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5fYWRkKGlucHV0W2ldKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIGlmICghdGhpcy5fc3RyZWFtKSB7XG4gICAgdGhyb3cgJ0FnZ3JlZ2F0b3Igbm90IGNvbmZpZ3VyZWQgZm9yIHN0cmVhbWluZyByZW1vdmVzLicgK1xuICAgICAgJyBDYWxsIHN0cmVhbSh0cnVlKSBwcmlvciB0byBjYWxsaW5nIHN1bW1hcml6ZS4nO1xuICB9XG4gIGZvciAodmFyIGk9MDsgaTxpbnB1dC5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX3JlbShpbnB1dFtpXSk7XG4gIH1cbiAgdGhpcy5fcmVtcyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gY29uc29saWRhdGUgcmVtb3ZhbHNcbnByb3RvLl9jb25zb2xpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuX3JlbXMpIHJldHVybjtcbiAgZm9yICh2YXIgayBpbiB0aGlzLl9jZWxscykge1xuICAgIGlmICh0aGlzLl9jZWxsc1trXS5jb2xsZWN0KSB7XG4gICAgICB0aGlzLl9jZWxsc1trXS5kYXRhLnZhbHVlcygpO1xuICAgIH1cbiAgfVxuICB0aGlzLl9yZW1zID0gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZ3JlZ2F0b3I7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuLi91dGlsJyk7XG52YXIgc3RhdHMgPSByZXF1aXJlKCcuLi9zdGF0cycpO1xuXG52YXIgUkVNID0gJ19fZGxfcmVtX18nO1xuXG5mdW5jdGlvbiBDb2xsZWN0b3Ioa2V5KSB7XG4gIHRoaXMuX2FkZCA9IFtdO1xuICB0aGlzLl9yZW0gPSBbXTtcbiAgdGhpcy5fa2V5ID0ga2V5IHx8IG51bGw7XG4gIHRoaXMuX2xhc3QgPSBudWxsO1xufVxuXG52YXIgcHJvdG8gPSBDb2xsZWN0b3IucHJvdG90eXBlO1xuXG5wcm90by5hZGQgPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuX2FkZC5wdXNoKHYpO1xufTtcblxucHJvdG8ucmVtID0gZnVuY3Rpb24odikge1xuICB0aGlzLl9yZW0ucHVzaCh2KTtcbn07XG5cbnByb3RvLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9nZXQgPSBudWxsO1xuICBpZiAodGhpcy5fcmVtLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuX2FkZDtcblxuICB2YXIgYSA9IHRoaXMuX2FkZCxcbiAgICAgIHIgPSB0aGlzLl9yZW0sXG4gICAgICBrID0gdGhpcy5fa2V5LFxuICAgICAgeCA9IEFycmF5KGEubGVuZ3RoIC0gci5sZW5ndGgpLFxuICAgICAgaSwgaiwgbiwgbTtcblxuICBpZiAoIXV0aWwuaXNPYmplY3QoclswXSkpIHtcbiAgICAvLyBwcm9jZXNzaW5nIHJhdyB2YWx1ZXNcbiAgICBtID0gc3RhdHMuY291bnQubWFwKHIpO1xuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAobVthW2ldXSA+IDApIHtcbiAgICAgICAgbVthW2ldXSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeFtqKytdID0gYVtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaykge1xuICAgIC8vIGhhcyB1bmlxdWUga2V5IGZpZWxkLCBzbyB1c2UgdGhhdFxuICAgIG0gPSB1dGlsLnRvTWFwKHIsIGspO1xuICAgIGZvciAoaT0wLCBqPTAsIG49YS5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBpZiAoIW0uaGFzT3duUHJvcGVydHkoayhhW2ldKSkpIHsgeFtqKytdID0gYVtpXTsgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBubyB1bmlxdWUga2V5LCBtYXJrIHR1cGxlcyBkaXJlY3RseVxuICAgIGZvciAoaT0wLCBuPXIubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgcltpXVtSRU1dID0gMTtcbiAgICB9XG4gICAgZm9yIChpPTAsIGo9MCwgbj1hLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGlmICghYVtpXVtSRU1dKSB7IHhbaisrXSA9IGFbaV07IH1cbiAgICB9XG4gICAgZm9yIChpPTAsIG49ci5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICBkZWxldGUgcltpXVtSRU1dO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuX3JlbSA9IFtdO1xuICByZXR1cm4gKHRoaXMuX2FkZCA9IHgpO1xufTtcblxuLy8gbWVtb2l6aW5nIHN0YXRpc3RpY3MgbWV0aG9kc1xuXG5wcm90by5leHRlbnQgPSBmdW5jdGlvbihnZXQpIHtcbiAgaWYgKHRoaXMuX2dldCAhPT0gZ2V0IHx8ICF0aGlzLl9leHQpIHtcbiAgICB2YXIgdiA9IHRoaXMudmFsdWVzKCksXG4gICAgICAgIGkgPSBzdGF0cy5leHRlbnQuaW5kZXgodiwgZ2V0KTtcbiAgICB0aGlzLl9leHQgPSBbdltpWzBdXSwgdltpWzFdXV07XG4gICAgdGhpcy5fZ2V0ID0gZ2V0OyAgICBcbiAgfVxuICByZXR1cm4gdGhpcy5fZXh0O1xufTtcblxucHJvdG8uYXJnbWluID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLmV4dGVudChnZXQpWzBdO1xufTtcblxucHJvdG8uYXJnbWF4ID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLmV4dGVudChnZXQpWzFdO1xufTtcblxucHJvdG8ubWluID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHZhciBtID0gdGhpcy5leHRlbnQoZ2V0KVswXTtcbiAgcmV0dXJuIG0gPyBnZXQobSkgOiArSW5maW5pdHk7XG59O1xuXG5wcm90by5tYXggPSBmdW5jdGlvbihnZXQpIHtcbiAgdmFyIG0gPSB0aGlzLmV4dGVudChnZXQpWzFdO1xuICByZXR1cm4gbSA/IGdldChtKSA6IC1JbmZpbml0eTtcbn07XG5cbnByb3RvLnF1YXJ0aWxlID0gZnVuY3Rpb24oZ2V0KSB7XG4gIGlmICh0aGlzLl9nZXQgIT09IGdldCB8fCAhdGhpcy5fcSkge1xuICAgIHRoaXMuX3EgPSBzdGF0cy5xdWFydGlsZSh0aGlzLnZhbHVlcygpLCBnZXQpO1xuICAgIHRoaXMuX2dldCA9IGdldDsgICAgXG4gIH1cbiAgcmV0dXJuIHRoaXMuX3E7XG59O1xuXG5wcm90by5xMSA9IGZ1bmN0aW9uKGdldCkge1xuICByZXR1cm4gdGhpcy5xdWFydGlsZShnZXQpWzBdO1xufTtcblxucHJvdG8ucTIgPSBmdW5jdGlvbihnZXQpIHtcbiAgcmV0dXJuIHRoaXMucXVhcnRpbGUoZ2V0KVsxXTtcbn07XG5cbnByb3RvLnEzID0gZnVuY3Rpb24oZ2V0KSB7XG4gIHJldHVybiB0aGlzLnF1YXJ0aWxlKGdldClbMl07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3RvcjtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xudmFyIEFnZ3JlZ2F0b3IgPSByZXF1aXJlKCcuL2FnZ3JlZ2F0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gZmxhdHRlbiBhcmd1bWVudHMgaW50byBhIHNpbmdsZSBhcnJheVxuICB2YXIgYXJncyA9IFtdLnJlZHVjZS5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24oYSwgeCkge1xuICAgIHJldHVybiBhLmNvbmNhdCh1dGlsLmFycmF5KHgpKTtcbiAgfSwgW10pO1xuICAvLyBjcmVhdGUgYW5kIHJldHVybiBhbiBhZ2dyZWdhdG9yXG4gIHJldHVybiBuZXcgQWdncmVnYXRvcigpXG4gICAgLmdyb3VwYnkoYXJncylcbiAgICAuc3VtbWFyaXplKHsnKic6J3ZhbHVlcyd9KTtcbn07XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcblxudmFyIHR5cGVzID0ge1xuICAndmFsdWVzJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhbHVlcycsXG4gICAgaW5pdDogJ2NlbGwuY29sbGVjdCA9IHRydWU7JyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnZhbHVlcygpJywgaWR4OiAtMVxuICB9KSxcbiAgJ2NvdW50JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2NvdW50JyxcbiAgICBzZXQ6ICAnY2VsbC5udW0nXG4gIH0pLFxuICAnbWlzc2luZyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtaXNzaW5nJyxcbiAgICBzZXQ6ICAndGhpcy5taXNzaW5nJ1xuICB9KSxcbiAgJ3ZhbGlkJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3ZhbGlkJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCdcbiAgfSksXG4gICdzdW0nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnc3VtJyxcbiAgICBpbml0OiAndGhpcy5zdW0gPSAwOycsXG4gICAgYWRkOiAgJ3RoaXMuc3VtICs9IHY7JyxcbiAgICByZW06ICAndGhpcy5zdW0gLT0gdjsnLFxuICAgIHNldDogICd0aGlzLnN1bSdcbiAgfSksXG4gICdtZWFuJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21lYW4nLFxuICAgIGluaXQ6ICd0aGlzLm1lYW4gPSAwOycsXG4gICAgYWRkOiAgJ3ZhciBkID0gdiAtIHRoaXMubWVhbjsgdGhpcy5tZWFuICs9IGQgLyB0aGlzLnZhbGlkOycsXG4gICAgcmVtOiAgJ3ZhciBkID0gdiAtIHRoaXMubWVhbjsgdGhpcy5tZWFuIC09IHRoaXMudmFsaWQgPyBkIC8gdGhpcy52YWxpZCA6IHRoaXMubWVhbjsnLFxuICAgIHNldDogICd0aGlzLm1lYW4nXG4gIH0pLFxuICAnYXZlcmFnZSc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdhdmVyYWdlJyxcbiAgICBzZXQ6ICAndGhpcy5tZWFuJyxcbiAgICByZXE6ICBbJ21lYW4nXSwgaWR4OiAxXG4gIH0pLFxuICAndmFyaWFuY2UnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAndmFyaWFuY2UnLFxuICAgIGluaXQ6ICd0aGlzLmRldiA9IDA7JyxcbiAgICBhZGQ6ICAndGhpcy5kZXYgKz0gZCAqICh2IC0gdGhpcy5tZWFuKTsnLFxuICAgIHJlbTogICd0aGlzLmRldiAtPSBkICogKHYgLSB0aGlzLm1lYW4pOycsXG4gICAgc2V0OiAgJ3RoaXMudmFsaWQgPiAxID8gdGhpcy5kZXYgLyAodGhpcy52YWxpZC0xKSA6IDAnLFxuICAgIHJlcTogIFsnbWVhbiddLCBpZHg6IDFcbiAgfSksXG4gICd2YXJpYW5jZXAnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAndmFyaWFuY2VwJyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyB0aGlzLmRldiAvIHRoaXMudmFsaWQgOiAwJyxcbiAgICByZXE6ICBbJ3ZhcmlhbmNlJ10sIGlkeDogMlxuICB9KSxcbiAgJ3N0ZGV2JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ3N0ZGV2JyxcbiAgICBzZXQ6ICAndGhpcy52YWxpZCA+IDEgPyBNYXRoLnNxcnQodGhpcy5kZXYgLyAodGhpcy52YWxpZC0xKSkgOiAwJyxcbiAgICByZXE6ICBbJ3ZhcmlhbmNlJ10sIGlkeDogMlxuICB9KSxcbiAgJ3N0ZGV2cCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdzdGRldnAnLFxuICAgIHNldDogICd0aGlzLnZhbGlkID4gMSA/IE1hdGguc3FydCh0aGlzLmRldiAvIHRoaXMudmFsaWQpIDogMCcsXG4gICAgcmVxOiAgWyd2YXJpYW5jZSddLCBpZHg6IDJcbiAgfSksXG4gICdtZWRpYW4nOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAnbWVkaWFuJyxcbiAgICBzZXQ6ICAnY2VsbC5kYXRhLnEyKHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAncTEnOiBtZWFzdXJlKHtcbiAgICBuYW1lOiAncTEnLFxuICAgIHNldDogICdjZWxsLmRhdGEucTEodGhpcy5nZXQpJyxcbiAgICByZXE6ICBbJ3ZhbHVlcyddLCBpZHg6IDNcbiAgfSksXG4gICdxMyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdxMycsXG4gICAgc2V0OiAgJ2NlbGwuZGF0YS5xMyh0aGlzLmdldCknLFxuICAgIHJlcTogIFsndmFsdWVzJ10sIGlkeDogM1xuICB9KSxcbiAgJ2Rpc3RpbmN0JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2Rpc3RpbmN0JyxcbiAgICBzZXQ6ICAndGhpcy5kaXN0aW5jdChjZWxsLmRhdGEudmFsdWVzKCksIHRoaXMuZ2V0KScsXG4gICAgcmVxOiAgWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAnYXJnbWluJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2FyZ21pbicsXG4gICAgYWRkOiAgJ2lmICh2IDwgdGhpcy5taW4pIHRoaXMuYXJnbWluID0gdDsnLFxuICAgIHJlbTogICdpZiAodiA8PSB0aGlzLm1pbikgdGhpcy5hcmdtaW4gPSBudWxsOycsXG4gICAgc2V0OiAgJ3RoaXMuYXJnbWluID0gdGhpcy5hcmdtaW4gfHwgY2VsbC5kYXRhLmFyZ21pbih0aGlzLmdldCknLFxuICAgIHJlcTogIFsnbWluJ10sIHN0cjogWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAnYXJnbWF4JzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ2FyZ21heCcsXG4gICAgYWRkOiAgJ2lmICh2ID4gdGhpcy5tYXgpIHRoaXMuYXJnbWF4ID0gdDsnLFxuICAgIHJlbTogICdpZiAodiA+PSB0aGlzLm1heCkgdGhpcy5hcmdtYXggPSBudWxsOycsXG4gICAgc2V0OiAgJ3RoaXMuYXJnbWF4ID0gdGhpcy5hcmdtYXggfHwgY2VsbC5kYXRhLmFyZ21heCh0aGlzLmdldCknLFxuICAgIHJlcTogIFsnbWF4J10sIHN0cjogWyd2YWx1ZXMnXSwgaWR4OiAzXG4gIH0pLFxuICAnbWluJzogbWVhc3VyZSh7XG4gICAgbmFtZTogJ21pbicsXG4gICAgaW5pdDogJ3RoaXMubWluID0gK0luZmluaXR5OycsXG4gICAgYWRkOiAgJ2lmICh2IDwgdGhpcy5taW4pIHRoaXMubWluID0gdjsnLFxuICAgIHJlbTogICdpZiAodiA8PSB0aGlzLm1pbikgdGhpcy5taW4gPSBOYU47JyxcbiAgICBzZXQ6ICAndGhpcy5taW4gPSAoaXNOYU4odGhpcy5taW4pID8gY2VsbC5kYXRhLm1pbih0aGlzLmdldCkgOiB0aGlzLm1pbiknLFxuICAgIHN0cjogIFsndmFsdWVzJ10sIGlkeDogNFxuICB9KSxcbiAgJ21heCc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtYXgnLFxuICAgIGluaXQ6ICd0aGlzLm1heCA9IC1JbmZpbml0eTsnLFxuICAgIGFkZDogICdpZiAodiA+IHRoaXMubWF4KSB0aGlzLm1heCA9IHY7JyxcbiAgICByZW06ICAnaWYgKHYgPj0gdGhpcy5tYXgpIHRoaXMubWF4ID0gTmFOOycsXG4gICAgc2V0OiAgJ3RoaXMubWF4ID0gKGlzTmFOKHRoaXMubWF4KSA/IGNlbGwuZGF0YS5tYXgodGhpcy5nZXQpIDogdGhpcy5tYXgpJyxcbiAgICBzdHI6ICBbJ3ZhbHVlcyddLCBpZHg6IDRcbiAgfSksXG4gICdtb2Rlc2tldyc6IG1lYXN1cmUoe1xuICAgIG5hbWU6ICdtb2Rlc2tldycsXG4gICAgc2V0OiAgJ3RoaXMuZGV2PT09MCA/IDAgOiAodGhpcy5tZWFuIC0gY2VsbC5kYXRhLnEyKHRoaXMuZ2V0KSkgLyBNYXRoLnNxcnQodGhpcy5kZXYvKHRoaXMudmFsaWQtMSkpJyxcbiAgICByZXE6ICBbJ21lYW4nLCAnc3RkZXYnLCAnbWVkaWFuJ10sIGlkeDogNVxuICB9KVxufTtcblxuZnVuY3Rpb24gbWVhc3VyZShiYXNlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvdXQpIHtcbiAgICB2YXIgbSA9IHV0aWwuZXh0ZW5kKHtpbml0OicnLCBhZGQ6JycsIHJlbTonJywgaWR4OjB9LCBiYXNlKTtcbiAgICBtLm91dCA9IG91dCB8fCBiYXNlLm5hbWU7XG4gICAgcmV0dXJuIG07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUoYWdnLCBzdHJlYW0pIHtcbiAgZnVuY3Rpb24gY29sbGVjdChtLCBhKSB7XG4gICAgZnVuY3Rpb24gaGVscGVyKHIpIHsgaWYgKCFtW3JdKSBjb2xsZWN0KG0sIG1bcl0gPSB0eXBlc1tyXSgpKTsgfVxuICAgIGlmIChhLnJlcSkgYS5yZXEuZm9yRWFjaChoZWxwZXIpO1xuICAgIGlmIChzdHJlYW0gJiYgYS5zdHIpIGEuc3RyLmZvckVhY2goaGVscGVyKTtcbiAgICByZXR1cm4gbTtcbiAgfVxuICB2YXIgbWFwID0gYWdnLnJlZHVjZShcbiAgICBjb2xsZWN0LFxuICAgIGFnZy5yZWR1Y2UoZnVuY3Rpb24obSwgYSkgeyByZXR1cm4gKG1bYS5uYW1lXSA9IGEsIG0pOyB9LCB7fSlcbiAgKTtcbiAgcmV0dXJuIHV0aWwudmFscyhtYXApLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pZHggLSBiLmlkeDsgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShhZ2csIHN0cmVhbSwgYWNjZXNzb3IsIG11dGF0b3IpIHtcbiAgdmFyIGFsbCA9IHJlc29sdmUoYWdnLCBzdHJlYW0pLFxuICAgICAgY3RyID0gJ3RoaXMuY2VsbCA9IGNlbGw7IHRoaXMudHVwbGUgPSB0OyB0aGlzLnZhbGlkID0gMDsgdGhpcy5taXNzaW5nID0gMDsnLFxuICAgICAgYWRkID0gJ2lmICh2PT1udWxsKSB0aGlzLm1pc3NpbmcrKzsgaWYgKCF0aGlzLmlzVmFsaWQodikpIHJldHVybjsgKyt0aGlzLnZhbGlkOycsXG4gICAgICByZW0gPSAnaWYgKHY9PW51bGwpIHRoaXMubWlzc2luZy0tOyBpZiAoIXRoaXMuaXNWYWxpZCh2KSkgcmV0dXJuOyAtLXRoaXMudmFsaWQ7JyxcbiAgICAgIHNldCA9ICd2YXIgdCA9IHRoaXMudHVwbGU7IHZhciBjZWxsID0gdGhpcy5jZWxsOyc7XG5cbiAgYWxsLmZvckVhY2goZnVuY3Rpb24oYSkge1xuICAgIGlmIChhLmlkeCA8IDApIHtcbiAgICAgIGN0ciA9IGEuaW5pdCArIGN0cjtcbiAgICAgIGFkZCA9IGEuYWRkICsgYWRkO1xuICAgICAgcmVtID0gYS5yZW0gKyByZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0ciArPSBhLmluaXQ7XG4gICAgICBhZGQgKz0gYS5hZGQ7XG4gICAgICByZW0gKz0gYS5yZW07XG4gICAgfVxuICB9KTtcbiAgYWdnLnNsaWNlKClcbiAgICAuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLmlkeCAtIGIuaWR4OyB9KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHNldCArPSAndGhpcy5hc3NpZ24odCxcXCcnK2Eub3V0KydcXCcsJythLnNldCsnKTsnO1xuICAgIH0pO1xuICBzZXQgKz0gJ3JldHVybiB0Oyc7XG5cbiAgLyoganNoaW50IGV2aWw6IHRydWUgKi9cbiAgY3RyID0gRnVuY3Rpb24oJ2NlbGwnLCAndCcsIGN0cik7XG4gIGN0ci5wcm90b3R5cGUuYXNzaWduID0gbXV0YXRvcjtcbiAgY3RyLnByb3RvdHlwZS5hZGQgPSBGdW5jdGlvbigndCcsICd2YXIgdiA9IHRoaXMuZ2V0KHQpOycgKyBhZGQpO1xuICBjdHIucHJvdG90eXBlLnJlbSA9IEZ1bmN0aW9uKCd0JywgJ3ZhciB2ID0gdGhpcy5nZXQodCk7JyArIHJlbSk7XG4gIGN0ci5wcm90b3R5cGUuc2V0ID0gRnVuY3Rpb24oc2V0KTtcbiAgY3RyLnByb3RvdHlwZS5nZXQgPSBhY2Nlc3NvcjtcbiAgY3RyLnByb3RvdHlwZS5kaXN0aW5jdCA9IHJlcXVpcmUoJy4uL3N0YXRzJykuY291bnQuZGlzdGluY3Q7XG4gIGN0ci5wcm90b3R5cGUuaXNWYWxpZCA9IHV0aWwuaXNWYWxpZDtcbiAgcmV0dXJuIGN0cjtcbn1cblxudHlwZXMuY3JlYXRlID0gY3JlYXRlO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlczsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi4vdGltZScpLFxuICAgIEVQU0lMT04gPSAxZS0xNTtcblxuZnVuY3Rpb24gYmlucyhvcHQpIHtcbiAgaWYgKCFvcHQpIHsgdGhyb3cgRXJyb3IoXCJNaXNzaW5nIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBkZXRlcm1pbmUgcmFuZ2VcbiAgdmFyIG1heGIgPSBvcHQubWF4YmlucyB8fCAxNSxcbiAgICAgIGJhc2UgPSBvcHQuYmFzZSB8fCAxMCxcbiAgICAgIGxvZ2IgPSBNYXRoLmxvZyhiYXNlKSxcbiAgICAgIGRpdiA9IG9wdC5kaXYgfHwgWzUsIDJdLCAgICAgIFxuICAgICAgbWluID0gb3B0Lm1pbixcbiAgICAgIG1heCA9IG9wdC5tYXgsXG4gICAgICBzcGFuID0gbWF4IC0gbWluLFxuICAgICAgc3RlcCwgbGV2ZWwsIG1pbnN0ZXAsIHByZWNpc2lvbiwgdiwgaSwgZXBzO1xuXG4gIGlmIChvcHQuc3RlcCkge1xuICAgIC8vIGlmIHN0ZXAgc2l6ZSBpcyBleHBsaWNpdGx5IGdpdmVuLCB1c2UgdGhhdFxuICAgIHN0ZXAgPSBvcHQuc3RlcDtcbiAgfSBlbHNlIGlmIChvcHQuc3RlcHMpIHtcbiAgICAvLyBpZiBwcm92aWRlZCwgbGltaXQgY2hvaWNlIHRvIGFjY2VwdGFibGUgc3RlcCBzaXplc1xuICAgIHN0ZXAgPSBvcHQuc3RlcHNbTWF0aC5taW4oXG4gICAgICBvcHQuc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgIGJpc2VjdChvcHQuc3RlcHMsIHNwYW4vbWF4YiwgMCwgb3B0LnN0ZXBzLmxlbmd0aClcbiAgICApXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVzZSBzcGFuIHRvIGRldGVybWluZSBzdGVwIHNpemVcbiAgICBsZXZlbCA9IE1hdGguY2VpbChNYXRoLmxvZyhtYXhiKSAvIGxvZ2IpO1xuICAgIG1pbnN0ZXAgPSBvcHQubWluc3RlcCB8fCAwO1xuICAgIHN0ZXAgPSBNYXRoLm1heChcbiAgICAgIG1pbnN0ZXAsXG4gICAgICBNYXRoLnBvdyhiYXNlLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gbG9nYikgLSBsZXZlbClcbiAgICApO1xuICAgIFxuICAgIC8vIGluY3JlYXNlIHN0ZXAgc2l6ZSBpZiB0b28gbWFueSBiaW5zXG4gICAgZG8geyBzdGVwICo9IGJhc2U7IH0gd2hpbGUgKE1hdGguY2VpbChzcGFuL3N0ZXApID4gbWF4Yik7XG5cbiAgICAvLyBkZWNyZWFzZSBzdGVwIHNpemUgaWYgYWxsb3dlZFxuICAgIGZvciAoaT0wOyBpPGRpdi5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IHN0ZXAgLyBkaXZbaV07XG4gICAgICBpZiAodiA+PSBtaW5zdGVwICYmIHNwYW4gLyB2IDw9IG1heGIpIHN0ZXAgPSB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSBwcmVjaXNpb24sIG1pbiBhbmQgbWF4XG4gIHYgPSBNYXRoLmxvZyhzdGVwKTtcbiAgcHJlY2lzaW9uID0gdiA+PSAwID8gMCA6IH5+KC12IC8gbG9nYikgKyAxO1xuICBlcHMgPSBNYXRoLnBvdyhiYXNlLCAtcHJlY2lzaW9uIC0gMSk7XG4gIG1pbiA9IE1hdGgubWluKG1pbiwgTWF0aC5mbG9vcihtaW4gLyBzdGVwICsgZXBzKSAqIHN0ZXApO1xuICBtYXggPSBNYXRoLmNlaWwobWF4IC8gc3RlcCkgKiBzdGVwO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IG1pbixcbiAgICBzdG9wOiAgbWF4LFxuICAgIHN0ZXA6ICBzdGVwLFxuICAgIHVuaXQ6ICB7cHJlY2lzaW9uOiBwcmVjaXNpb259LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmlzZWN0KGEsIHgsIGxvLCBoaSkge1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmICh1dGlsLmNtcChhW21pZF0sIHgpIDwgMCkgeyBsbyA9IG1pZCArIDE7IH1cbiAgICBlbHNlIHsgaGkgPSBtaWQ7IH1cbiAgfVxuICByZXR1cm4gbG87XG59XG5cbmZ1bmN0aW9uIHZhbHVlKHYpIHtcbiAgcmV0dXJuIHRoaXMuc3RlcCAqIE1hdGguZmxvb3IodiAvIHRoaXMuc3RlcCArIEVQU0lMT04pO1xufVxuXG5mdW5jdGlvbiBpbmRleCh2KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCh2IC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXAgKyBFUFNJTE9OKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV92YWx1ZSh2KSB7XG4gIHJldHVybiB0aGlzLnVuaXQuZGF0ZSh2YWx1ZS5jYWxsKHRoaXMsIHYpKTtcbn1cblxuZnVuY3Rpb24gZGF0ZV9pbmRleCh2KSB7XG4gIHJldHVybiBpbmRleC5jYWxsKHRoaXMsIHRoaXMudW5pdC51bml0KHYpKTtcbn1cblxuYmlucy5kYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIGlmICghb3B0KSB7IHRocm93IEVycm9yKFwiTWlzc2luZyBkYXRlIGJpbm5pbmcgb3B0aW9ucy5cIik7IH1cblxuICAvLyBmaW5kIHRpbWUgc3RlcCwgdGhlbiBiaW5cbiAgdmFyIHVuaXRzID0gb3B0LnV0YyA/IHRpbWUudXRjIDogdGltZSxcbiAgICAgIGRtaW4gPSBvcHQubWluLFxuICAgICAgZG1heCA9IG9wdC5tYXgsXG4gICAgICBtYXhiID0gb3B0Lm1heGJpbnMgfHwgMjAsXG4gICAgICBtaW5iID0gb3B0Lm1pbmJpbnMgfHwgNCxcbiAgICAgIHNwYW4gPSAoK2RtYXgpIC0gKCtkbWluKSxcbiAgICAgIHVuaXQgPSBvcHQudW5pdCA/IHVuaXRzW29wdC51bml0XSA6IHVuaXRzLmZpbmQoc3BhbiwgbWluYiwgbWF4YiksXG4gICAgICBzcGVjID0gYmlucyh7XG4gICAgICAgIG1pbjogICAgIHVuaXQubWluICE9IG51bGwgPyB1bml0Lm1pbiA6IHVuaXQudW5pdChkbWluKSxcbiAgICAgICAgbWF4OiAgICAgdW5pdC5tYXggIT0gbnVsbCA/IHVuaXQubWF4IDogdW5pdC51bml0KGRtYXgpLFxuICAgICAgICBtYXhiaW5zOiBtYXhiLFxuICAgICAgICBtaW5zdGVwOiB1bml0Lm1pbnN0ZXAsXG4gICAgICAgIHN0ZXBzOiAgIHVuaXQuc3RlcFxuICAgICAgfSk7XG5cbiAgc3BlYy51bml0ID0gdW5pdDtcbiAgc3BlYy5pbmRleCA9IGRhdGVfaW5kZXg7XG4gIGlmICghb3B0LnJhdykgc3BlYy52YWx1ZSA9IGRhdGVfdmFsdWU7XG4gIHJldHVybiBzcGVjO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5zO1xuIiwidmFyIGJpbnMgPSByZXF1aXJlKCcuL2JpbnMnKSxcbiAgICBnZW4gID0gcmVxdWlyZSgnLi4vZ2VuZXJhdGUnKSxcbiAgICB0eXBlID0gcmVxdWlyZSgnLi4vaW1wb3J0L3R5cGUnKSxcbiAgICB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIHN0YXRzID0gcmVxdWlyZSgnLi4vc3RhdHMnKTtcblxudmFyIHF0eXBlID0ge1xuICAnaW50ZWdlcic6IDEsXG4gICdudW1iZXInOiAxLFxuICAnZGF0ZSc6IDFcbn07XG5cbmZ1bmN0aW9uICRiaW4odmFsdWVzLCBmLCBvcHQpIHtcbiAgb3B0ID0gb3B0aW9ucyh2YWx1ZXMsIGYsIG9wdCk7XG4gIHZhciBiID0gc3BlYyhvcHQpO1xuICByZXR1cm4gIWIgPyAob3B0LmFjY2Vzc29yIHx8IHV0aWwuaWRlbnRpdHkpIDpcbiAgICB1dGlsLiRmdW5jKCdiaW4nLCBiLnVuaXQudW5pdCA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBiLnZhbHVlKGIudW5pdC51bml0KHgpKTsgfSA6XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBiLnZhbHVlKHgpOyB9XG4gICAgKShvcHQuYWNjZXNzb3IpO1xufVxuXG5mdW5jdGlvbiBoaXN0b2dyYW0odmFsdWVzLCBmLCBvcHQpIHtcbiAgb3B0ID0gb3B0aW9ucyh2YWx1ZXMsIGYsIG9wdCk7XG4gIHZhciBiID0gc3BlYyhvcHQpO1xuICByZXR1cm4gYiA/XG4gICAgbnVtZXJpY2FsKHZhbHVlcywgb3B0LmFjY2Vzc29yLCBiKSA6XG4gICAgY2F0ZWdvcmljYWwodmFsdWVzLCBvcHQuYWNjZXNzb3IsIG9wdCAmJiBvcHQuc29ydCk7XG59XG5cbmZ1bmN0aW9uIHNwZWMob3B0KSB7XG4gIHZhciB0ID0gb3B0LnR5cGUsIGIgPSBudWxsO1xuICBpZiAodCA9PSBudWxsIHx8IHF0eXBlW3RdKSB7XG4gICAgaWYgKHQgPT09ICdpbnRlZ2VyJyAmJiBvcHQubWluc3RlcCA9PSBudWxsKSBvcHQubWluc3RlcCA9IDE7XG4gICAgYiA9ICh0ID09PSAnZGF0ZScpID8gYmlucy5kYXRlKG9wdCkgOiBiaW5zKG9wdCk7XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbmZ1bmN0aW9uIG9wdGlvbnMoKSB7XG4gIHZhciBhID0gYXJndW1lbnRzLFxuICAgICAgaSA9IDAsXG4gICAgICB2YWx1ZXMgPSB1dGlsLmlzQXJyYXkoYVtpXSkgPyBhW2krK10gOiBudWxsLFxuICAgICAgZiA9IHV0aWwuaXNGdW5jdGlvbihhW2ldKSB8fCB1dGlsLmlzU3RyaW5nKGFbaV0pID8gdXRpbC4kKGFbaSsrXSkgOiBudWxsLFxuICAgICAgb3B0ID0gdXRpbC5leHRlbmQoe30sIGFbaV0pO1xuICBcbiAgaWYgKHZhbHVlcykge1xuICAgIG9wdC50eXBlID0gb3B0LnR5cGUgfHwgdHlwZSh2YWx1ZXMsIGYpO1xuICAgIGlmIChxdHlwZVtvcHQudHlwZV0pIHtcbiAgICAgIHZhciBleHQgPSBzdGF0cy5leHRlbnQodmFsdWVzLCBmKTtcbiAgICAgIG9wdCA9IHV0aWwuZXh0ZW5kKHttaW46IGV4dFswXSwgbWF4OiBleHRbMV19LCBvcHQpO1xuICAgIH1cbiAgfVxuICBpZiAoZikgeyBvcHQuYWNjZXNzb3IgPSBmOyB9XG4gIHJldHVybiBvcHQ7XG59XG5cbmZ1bmN0aW9uIG51bWVyaWNhbCh2YWx1ZXMsIGYsIGIpIHtcbiAgdmFyIGggPSBnZW4ucmFuZ2UoYi5zdGFydCwgYi5zdG9wICsgYi5zdGVwLzIsIGIuc3RlcClcbiAgICAubWFwKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHt2YWx1ZTogYi52YWx1ZSh2KSwgY291bnQ6IDB9OyB9KTtcblxuICBmb3IgKHZhciBpPTAsIHYsIGo7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkge1xuICAgICAgaiA9IGIuaW5kZXgodik7XG4gICAgICBpZiAoaiA8IDAgfHwgaiA+PSBoLmxlbmd0aCB8fCAhaXNGaW5pdGUoaikpIGNvbnRpbnVlO1xuICAgICAgaFtqXS5jb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICBoLmJpbnMgPSBiO1xuICByZXR1cm4gaDtcbn1cblxuZnVuY3Rpb24gY2F0ZWdvcmljYWwodmFsdWVzLCBmLCBzb3J0KSB7XG4gIHZhciB1ID0gc3RhdHMudW5pcXVlKHZhbHVlcywgZiksXG4gICAgICBjID0gc3RhdHMuY291bnQubWFwKHZhbHVlcywgZik7XG4gIHJldHVybiB1Lm1hcChmdW5jdGlvbihrKSB7IHJldHVybiB7dmFsdWU6IGssIGNvdW50OiBjW2tdfTsgfSlcbiAgICAuc29ydCh1dGlsLmNvbXBhcmF0b3Ioc29ydCA/ICctY291bnQnIDogJyt2YWx1ZScpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICRiaW46ICRiaW4sXG4gIGhpc3RvZ3JhbTogaGlzdG9ncmFtXG59OyIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpLFxuICAgIGQzX3RpbWVGID0gcmVxdWlyZSgnZDMtdGltZS1mb3JtYXQnKSxcbiAgICBkM19udW1iZXJGID0gcmVxdWlyZSgnZDMtZm9ybWF0JyksXG4gICAgbnVtYmVyRiA9IGQzX251bWJlckYsIC8vIGRlZmF1bHRzIHRvIEVOLVVTXG4gICAgdGltZUYgPSBkM190aW1lRjsgICAgIC8vIGRlZmF1bHRzIHRvIEVOLVVTXG5cbmZ1bmN0aW9uIG51bWJlckxvY2FsZShsKSB7XG4gIHZhciBmID0gZDNfbnVtYmVyRi5sb2NhbGVGb3JtYXQobCk7XG4gIGlmIChmID09IG51bGwpIHRocm93IEVycm9yKCdVbnJlY29nbml6ZWQgbG9jYWxlOiAnICsgbCk7XG4gIG51bWJlckYgPSBmO1xufVxuXG5mdW5jdGlvbiB0aW1lTG9jYWxlKGwpIHtcbiAgdmFyIGYgPSBkM190aW1lRi5sb2NhbGVGb3JtYXQobCk7XG4gIGlmIChmID09IG51bGwpIHRocm93IEVycm9yKCdVbnJlY29nbml6ZWQgbG9jYWxlOiAnICsgbCk7XG4gIHRpbWVGID0gZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFVwZGF0ZSBudW1iZXIgZm9ybWF0dGVyIHRvIHVzZSBwcm92aWRlZCBsb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgLy8gRm9yIG1vcmUgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1mb3JtYXRcbiAgbnVtYmVyTG9jYWxlOiBudW1iZXJMb2NhbGUsXG4gIG51bWJlcjogICAgICAgZnVuY3Rpb24oZikgeyByZXR1cm4gbnVtYmVyRi5mb3JtYXQoZik7IH0sXG4gIG51bWJlclByZWZpeDogZnVuY3Rpb24oZiwgdikgeyByZXR1cm4gbnVtYmVyRi5mb3JtYXRQcmVmaXgoZiwgdik7IH0sXG5cbiAgLy8gVXBkYXRlIHRpbWUgZm9ybWF0dGVyIHRvIHVzZSBwcm92aWRlZCBsb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgLy8gRm9yIG1vcmUgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy10aW1lLWZvcm1hdFxuICB0aW1lTG9jYWxlOiAgIHRpbWVMb2NhbGUsXG4gIHRpbWU6ICAgICAgICAgZnVuY3Rpb24oZikgeyByZXR1cm4gdGltZUYuZm9ybWF0KGYpOyB9LCAgXG4gIHV0YzogICAgICAgICAgZnVuY3Rpb24oZikgeyByZXR1cm4gdGltZUYudXRjRm9ybWF0KGYpOyB9LFxuXG4gIC8vIFNldCBudW1iZXIgYW5kIHRpbWUgbG9jYWxlIHNpbXVsdGFuZW91c2x5LlxuICBsb2NhbGU6ICAgICAgIGZ1bmN0aW9uKGwpIHsgbnVtYmVyTG9jYWxlKGwpOyB0aW1lTG9jYWxlKGwpOyB9LFxuXG4gIC8vIGF1dG9tYXRpYyBmb3JtYXR0aW5nIGZ1bmN0aW9uc1xuICBhdXRvOiB7XG4gICAgbnVtYmVyOiAgIG51bWJlckF1dG9Gb3JtYXQsXG4gICAgdGltZTogICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGltZUF1dG9Gb3JtYXQoKTsgfSxcbiAgICB1dGM6ICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB1dGNBdXRvRm9ybWF0KCk7IH1cbiAgfVxufTtcblxudmFyIGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5mdW5jdGlvbiBpbnRlcnZhbHMoZG9tYWluLCBjb3VudCkge1xuICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcblxuICB2YXIgc3RhcnQgPSBkb21haW5bMF0sXG4gICAgICBzdG9wID0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXTtcblxuICBpZiAoc3RvcCA8IHN0YXJ0KSB7IGVycm9yID0gc3RvcDsgc3RvcCA9IHN0YXJ0OyBzdGFydCA9IGVycm9yOyB9XG5cbiAgdmFyIHNwYW4gPSBzdG9wIC0gc3RhcnQsXG4gICAgICBzdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coc3BhbiAvIGNvdW50KSAvIE1hdGguTE4xMCkpLFxuICAgICAgZXJyb3IgPSBzcGFuIC8gY291bnQgLyBzdGVwO1xuXG4gIC8vIEZpbHRlciB0aWNrcyB0byBnZXQgY2xvc2VyIHRvIHRoZSBkZXNpcmVkIGNvdW50LlxuICBpZiAoZXJyb3IgPj0gZTEwKSBzdGVwICo9IDEwO1xuICBlbHNlIGlmIChlcnJvciA+PSBlNSkgc3RlcCAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcCAqPSAyO1xuXG4gIC8vIFJvdW5kIHN0YXJ0IGFuZCBzdG9wIHZhbHVlcyB0byBzdGVwIGludGVydmFsLlxuICByZXR1cm4gW1xuICAgIE1hdGguY2VpbChzdGFydCAvIHN0ZXApICogc3RlcCxcbiAgICBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKSAqIHN0ZXAgKyBzdGVwIC8gMiwgLy8gaW5jbHVzaXZlXG4gICAgc3RlcFxuICBdO1xufVxuXG5mdW5jdGlvbiBudW1iZXJBdXRvRm9ybWF0KGRvbWFpbiwgY291bnQsIGYpIHtcbiAgdmFyIHJhbmdlID0gaW50ZXJ2YWxzKGRvbWFpbiwgY291bnQpO1xuICBpZiAoZiA9PSBudWxsKSB7XG4gICAgZiA9ICcsLicgKyBkM19udW1iZXJGLnByZWNpc2lvbkZpeGVkKHJhbmdlWzJdKSArICdmJztcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKGYgPSBkM19udW1iZXJGLmZvcm1hdFNwZWNpZmllcihmKSwgZi50eXBlKSB7XG4gICAgICBjYXNlICdzJzoge1xuICAgICAgICB2YXIgdmFsdWUgPSBNYXRoLm1heChNYXRoLmFicyhyYW5nZVswXSksIE1hdGguYWJzKHJhbmdlWzFdKSk7XG4gICAgICAgIGlmIChmLnByZWNpc2lvbiA9PSBudWxsKSBmLnByZWNpc2lvbiA9IGQzX251bWJlckYucHJlY2lzaW9uUHJlZml4KHJhbmdlWzJdLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBudW1iZXJGLmZvcm1hdFByZWZpeChmLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjYXNlICcnOlxuICAgICAgY2FzZSAnZSc6XG4gICAgICBjYXNlICdnJzpcbiAgICAgIGNhc2UgJ3AnOlxuICAgICAgY2FzZSAncic6IHtcbiAgICAgICAgaWYgKGYucHJlY2lzaW9uID09IG51bGwpIGYucHJlY2lzaW9uID0gZDNfbnVtYmVyRi5wcmVjaXNpb25Sb3VuZChyYW5nZVsyXSwgTWF0aC5tYXgoTWF0aC5hYnMocmFuZ2VbMF0pLCBNYXRoLmFicyhyYW5nZVsxXSkpKSAtIChmLnR5cGUgPT09ICdlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZic6XG4gICAgICBjYXNlICclJzoge1xuICAgICAgICBpZiAoZi5wcmVjaXNpb24gPT0gbnVsbCkgZi5wcmVjaXNpb24gPSBkM19udW1iZXJGLnByZWNpc2lvbkZpeGVkKHJhbmdlWzJdKSAtIChmLnR5cGUgPT09ICclJykgKiAyO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlckYuZm9ybWF0KGYpO1xufVxuXG5mdW5jdGlvbiB0aW1lQXV0b0Zvcm1hdCgpIHtcbiAgdmFyIGYgPSB0aW1lRi5mb3JtYXQsXG4gICAgICBmb3JtYXRNaWxsaXNlY29uZCA9IGYoJy4lTCcpLFxuICAgICAgZm9ybWF0U2Vjb25kID0gZignOiVTJyksXG4gICAgICBmb3JtYXRNaW51dGUgPSBmKCclSTolTScpLFxuICAgICAgZm9ybWF0SG91ciA9IGYoJyVJICVwJyksXG4gICAgICBmb3JtYXREYXkgPSBmKCclYSAlZCcpLFxuICAgICAgZm9ybWF0V2VlayA9IGYoJyViICVkJyksXG4gICAgICBmb3JtYXRNb250aCA9IGYoJyVCJyksXG4gICAgICBmb3JtYXRZZWFyID0gZignJVknKTtcblxuICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciBkID0gK2RhdGU7XG4gICAgcmV0dXJuIChkM190aW1lLnNlY29uZChkYXRlKSA8IGQgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICA6IGQzX3RpbWUubWludXRlKGRhdGUpIDwgZCA/IGZvcm1hdFNlY29uZFxuICAgICAgICA6IGQzX3RpbWUuaG91cihkYXRlKSA8IGQgPyBmb3JtYXRNaW51dGVcbiAgICAgICAgOiBkM190aW1lLmRheShkYXRlKSA8IGQgPyBmb3JtYXRIb3VyXG4gICAgICAgIDogZDNfdGltZS5tb250aChkYXRlKSA8IGQgP1xuICAgICAgICAgIChkM190aW1lLndlZWsoZGF0ZSkgPCBkID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgOiBkM190aW1lLnllYXIoZGF0ZSkgPCBkID8gZm9ybWF0TW9udGhcbiAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXRjQXV0b0Zvcm1hdCgpIHtcbiAgdmFyIGYgPSB0aW1lRi51dGNGb3JtYXQsXG4gICAgICBmb3JtYXRNaWxsaXNlY29uZCA9IGYoJy4lTCcpLFxuICAgICAgZm9ybWF0U2Vjb25kID0gZignOiVTJyksXG4gICAgICBmb3JtYXRNaW51dGUgPSBmKCclSTolTScpLFxuICAgICAgZm9ybWF0SG91ciA9IGYoJyVJICVwJyksXG4gICAgICBmb3JtYXREYXkgPSBmKCclYSAlZCcpLFxuICAgICAgZm9ybWF0V2VlayA9IGYoJyViICVkJyksXG4gICAgICBmb3JtYXRNb250aCA9IGYoJyVCJyksXG4gICAgICBmb3JtYXRZZWFyID0gZignJVknKTtcblxuICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciBkID0gK2RhdGU7XG4gICAgcmV0dXJuIChkM190aW1lLnV0Y1NlY29uZChkYXRlKSA8IGQgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICA6IGQzX3RpbWUudXRjTWludXRlKGRhdGUpIDwgZCA/IGZvcm1hdFNlY29uZFxuICAgICAgICA6IGQzX3RpbWUudXRjSG91cihkYXRlKSA8IGQgPyBmb3JtYXRNaW51dGVcbiAgICAgICAgOiBkM190aW1lLnV0Y0RheShkYXRlKSA8IGQgPyBmb3JtYXRIb3VyXG4gICAgICAgIDogZDNfdGltZS51dGNNb250aChkYXRlKSA8IGQgP1xuICAgICAgICAgIChkM190aW1lLnV0Y1dlZWsoZGF0ZSkgPCBkID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgOiBkM190aW1lLnV0Y1llYXIoZGF0ZSkgPCBkID8gZm9ybWF0TW9udGhcbiAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgfTtcbn1cbiIsInZhciBnZW4gPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5nZW4ucmVwZWF0ID0gZnVuY3Rpb24odmFsLCBuKSB7XG4gIHZhciBhID0gQXJyYXkobiksIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgYVtpXSA9IHZhbDtcbiAgcmV0dXJuIGE7XG59O1xuXG5nZW4uemVyb3MgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiBnZW4ucmVwZWF0KDAsIG4pO1xufTtcblxuZ2VuLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgc3RlcCA9IDE7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICB9XG4gIGlmICgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXAgPT0gSW5maW5pdHkpIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgcmFuZ2UnKTtcbiAgdmFyIHJhbmdlID0gW10sIGkgPSAtMSwgajtcbiAgaWYgKHN0ZXAgPCAwKSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpID4gc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgZWxzZSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpIDwgc3RvcCkgcmFuZ2UucHVzaChqKTtcbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuZ2VuLnJhbmRvbSA9IHt9O1xuXG5nZW4ucmFuZG9tLnVuaWZvcm0gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICBtYXggPSBtaW4gPT09IHVuZGVmaW5lZCA/IDEgOiBtaW47XG4gICAgbWluID0gMDtcbiAgfVxuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbWluICsgZCAqIE1hdGgucmFuZG9tKCk7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7IH07XG4gIHJldHVybiBmO1xufTtcblxuZ2VuLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYiA9IGE7XG4gICAgYSA9IDA7XG4gIH1cbiAgdmFyIGQgPSBiIC0gYTtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYSArIE1hdGguZmxvb3IoZCAqIE1hdGgucmFuZG9tKCkpO1xuICB9O1xuICBmLnNhbXBsZXMgPSBmdW5jdGlvbihuKSB7IHJldHVybiBnZW4uemVyb3MobikubWFwKGYpOyB9O1xuICByZXR1cm4gZjtcbn07XG5cbmdlbi5yYW5kb20ubm9ybWFsID0gZnVuY3Rpb24obWVhbiwgc3RkZXYpIHtcbiAgbWVhbiA9IG1lYW4gfHwgMDtcbiAgc3RkZXYgPSBzdGRldiB8fCAxO1xuICB2YXIgbmV4dDtcbiAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgeCA9IDAsIHkgPSAwLCByZHMsIGM7XG4gICAgaWYgKG5leHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeCA9IG5leHQ7XG4gICAgICBuZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGRvIHtcbiAgICAgIHggPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHkgPSBNYXRoLnJhbmRvbSgpKjItMTtcbiAgICAgIHJkcyA9IHgqeCArIHkqeTtcbiAgICB9IHdoaWxlIChyZHMgPT09IDAgfHwgcmRzID4gMSk7XG4gICAgYyA9IE1hdGguc3FydCgtMipNYXRoLmxvZyhyZHMpL3Jkcyk7IC8vIEJveC1NdWxsZXIgdHJhbnNmb3JtXG4gICAgbmV4dCA9IG1lYW4gKyB5KmMqc3RkZXY7XG4gICAgcmV0dXJuIG1lYW4gKyB4KmMqc3RkZXY7XG4gIH07XG4gIGYuc2FtcGxlcyA9IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIGdlbi56ZXJvcyhuKS5tYXAoZik7IH07XG4gIHJldHVybiBmO1xufTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKTtcbnZhciBkM19kc3YgPSByZXF1aXJlKCdkMy1kc3YnKTtcblxuZnVuY3Rpb24gZHN2KGRhdGEsIGZvcm1hdCkge1xuICBpZiAoZGF0YSkge1xuICAgIHZhciBoID0gZm9ybWF0LmhlYWRlcjtcbiAgICBkYXRhID0gKGggPyBoLmpvaW4oZm9ybWF0LmRlbGltaXRlcikgKyAnXFxuJyA6ICcnKSArIGRhdGE7XG4gIH1cbiAgcmV0dXJuIGQzX2Rzdi5kc3YoZm9ybWF0LmRlbGltaXRlcikucGFyc2UoZGF0YSk7XG59XG5cbmRzdi5kZWxpbWl0ZXIgPSBmdW5jdGlvbihkZWxpbSkge1xuICB2YXIgZm10ID0ge2RlbGltaXRlcjogZGVsaW19O1xuICByZXR1cm4gZnVuY3Rpb24oZGF0YSwgZm9ybWF0KSB7XG4gICAgcmV0dXJuIGRzdihkYXRhLCBmb3JtYXQgPyB1dGlsLmV4dGVuZChmb3JtYXQsIGZtdCkgOiBmbXQpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkc3Y7IiwidmFyIGRzdiA9IHJlcXVpcmUoJy4vZHN2Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBqc29uOiByZXF1aXJlKCcuL2pzb24nKSxcbiAgdG9wb2pzb246IHJlcXVpcmUoJy4vdG9wb2pzb24nKSxcbiAgdHJlZWpzb246IHJlcXVpcmUoJy4vdHJlZWpzb24nKSxcbiAgZHN2OiBkc3YsXG4gIGNzdjogZHN2LmRlbGltaXRlcignLCcpLFxuICB0c3Y6IGRzdi5kZWxpbWl0ZXIoJ1xcdCcpXG59OyIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgZCA9IHV0aWwuaXNPYmplY3QoZGF0YSkgJiYgIXV0aWwuaXNCdWZmZXIoZGF0YSkgP1xuICAgIGRhdGEgOiBKU09OLnBhcnNlKGRhdGEpO1xuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC5wcm9wZXJ0eSkge1xuICAgIGQgPSB1dGlsLmFjY2Vzc29yKGZvcm1hdC5wcm9wZXJ0eSkoZCk7XG4gIH1cbiAgcmV0dXJuIGQ7XG59O1xuIiwidmFyIGpzb24gPSByZXF1aXJlKCcuL2pzb24nKTtcblxudmFyIHJlYWRlciA9IGZ1bmN0aW9uKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgdG9wb2pzb24gPSByZWFkZXIudG9wb2pzb247XG4gIGlmICh0b3BvanNvbiA9PSBudWxsKSB7IHRocm93IEVycm9yKCdUb3BvSlNPTiBsaWJyYXJ5IG5vdCBsb2FkZWQuJyk7IH1cblxuICB2YXIgdCA9IGpzb24oZGF0YSwgZm9ybWF0KSwgb2JqO1xuXG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LmZlYXR1cmUpIHtcbiAgICBpZiAoKG9iaiA9IHQub2JqZWN0c1tmb3JtYXQuZmVhdHVyZV0pKSB7XG4gICAgICByZXR1cm4gdG9wb2pzb24uZmVhdHVyZSh0LCBvYmopLmZlYXR1cmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBUb3BvSlNPTiBvYmplY3Q6ICcgKyBmb3JtYXQuZmVhdHVyZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGZvcm1hdCAmJiBmb3JtYXQubWVzaCkge1xuICAgIGlmICgob2JqID0gdC5vYmplY3RzW2Zvcm1hdC5tZXNoXSkpIHtcbiAgICAgIHJldHVybiBbdG9wb2pzb24ubWVzaCh0LCB0Lm9iamVjdHNbZm9ybWF0Lm1lc2hdKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIFRvcG9KU09OIG9iamVjdDogJyArIGZvcm1hdC5tZXNoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgRXJyb3IoJ01pc3NpbmcgVG9wb0pTT04gZmVhdHVyZSBvciBtZXNoIHBhcmFtZXRlci4nKTtcbiAgfVxufTtcblxucmVhZGVyLnRvcG9qc29uID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3RvcG9qc29uJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd0b3BvanNvbiddIDogbnVsbCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlYWRlcjsiLCJ2YXIganNvbiA9IHJlcXVpcmUoJy4vanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIGZvcm1hdCkge1xuICBkYXRhID0ganNvbihkYXRhLCBmb3JtYXQpO1xuICByZXR1cm4gdG9UYWJsZShkYXRhLCAoZm9ybWF0ICYmIGZvcm1hdC5jaGlsZHJlbikpO1xufTtcblxuZnVuY3Rpb24gdG9UYWJsZShyb290LCBjaGlsZHJlbkZpZWxkKSB7XG4gIGNoaWxkcmVuRmllbGQgPSBjaGlsZHJlbkZpZWxkIHx8ICdjaGlsZHJlbic7XG4gIHZhciB0YWJsZSA9IFtdO1xuICBcbiAgZnVuY3Rpb24gdmlzaXQobm9kZSkge1xuICAgIHRhYmxlLnB1c2gobm9kZSk7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZVtjaGlsZHJlbkZpZWxkXTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICB2aXNpdChjaGlsZHJlbltpXSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICB2aXNpdChyb290LCBudWxsKTtcbiAgcmV0dXJuICh0YWJsZS5yb290ID0gcm9vdCwgdGFibGUpO1xufSIsIi8vIE1hdGNoZXMgYWJzb2x1dGUgVVJMcyB3aXRoIG9wdGlvbmFsIHByb3RvY29sXG4vLyAgIGh0dHBzOi8vLi4uICAgIGZpbGU6Ly8uLi4gICAgLy8uLi5cbnZhciBwcm90b2NvbF9yZSA9IC9eKFtBLVphLXpdKzopP1xcL1xcLy87XG5cbi8vIFNwZWNpYWwgdHJlYXRtZW50IGluIG5vZGUuanMgZm9yIHRoZSBmaWxlOiBwcm90b2NvbFxudmFyIGZpbGVQcm90b2NvbCA9ICdmaWxlOi8vJztcblxuLy8gVmFsaWRhdGUgYW5kIGNsZWFudXAgVVJMIHRvIGVuc3VyZSB0aGF0IGl0IGlzIGFsbG93ZWQgdG8gYmUgYWNjZXNzZWRcbi8vIFJldHVybnMgY2xlYW5lZCB1cCBVUkwsIG9yIGZhbHNlIGlmIGFjY2VzcyBpcyBub3QgYWxsb3dlZFxuZnVuY3Rpb24gc2FuaXRpemVVcmwob3B0KSB7XG4gIHZhciB1cmwgPSBvcHQudXJsO1xuICBpZiAoIXVybCAmJiBvcHQuZmlsZSkgeyByZXR1cm4gZmlsZVByb3RvY29sICsgb3B0LmZpbGU7IH1cblxuICAvLyBJbiBjYXNlIHRoaXMgaXMgYSByZWxhdGl2ZSB1cmwgKGhhcyBubyBob3N0KSwgcHJlcGVuZCBvcHQuYmFzZVVSTFxuICBpZiAob3B0LmJhc2VVUkwgJiYgIXByb3RvY29sX3JlLnRlc3QodXJsKSkge1xuICAgIGlmICghc3RhcnRzV2l0aCh1cmwsICcvJykgJiYgb3B0LmJhc2VVUkxbb3B0LmJhc2VVUkwubGVuZ3RoLTFdICE9PSAnLycpIHtcbiAgICAgIHVybCA9ICcvJyArIHVybDsgLy8gRW5zdXJlIHRoYXQgdGhlcmUgaXMgYSBzbGFzaCBiZXR3ZWVuIHRoZSBiYXNlVVJMIChlLmcuIGhvc3RuYW1lKSBhbmQgdXJsXG4gICAgfVxuICAgIHVybCA9IG9wdC5iYXNlVVJMICsgdXJsO1xuICB9XG4gIC8vIHJlbGF0aXZlIHByb3RvY29sLCBzdGFydHMgd2l0aCAnLy8nXG4gIGlmICghbG9hZC51c2VYSFIgJiYgc3RhcnRzV2l0aCh1cmwsICcvLycpKSB7XG4gICAgdXJsID0gKG9wdC5kZWZhdWx0UHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6JyArIHVybDtcbiAgfVxuICAvLyBJZiBvcHQuZG9tYWluV2hpdGVMaXN0IGlzIHNldCwgb25seSBhbGxvd3MgdXJsLCB3aG9zZSBob3N0bmFtZVxuICAvLyAqIElzIHRoZSBzYW1lIGFzIHRoZSBvcmlnaW4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSlcbiAgLy8gKiBFcXVhbHMgb25lIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHdoaXRlbGlzdFxuICAvLyAqIElzIGEgcHJvcGVyIHN1YmRvbWFpbiBvZiBvbmUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgd2hpdGVsaXN0XG4gIGlmIChvcHQuZG9tYWluV2hpdGVMaXN0KSB7XG4gICAgdmFyIGRvbWFpbiwgb3JpZ2luO1xuICAgIGlmIChsb2FkLnVzZVhIUikge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICAvLyBGcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzM2NTEzL2hvdy1kby1pLXBhcnNlLWEtdXJsLWludG8taG9zdG5hbWUtYW5kLXBhdGgtaW4tamF2YXNjcmlwdFxuICAgICAgLy8gSUUgZG9lc24ndCBwb3B1bGF0ZSBhbGwgbGluayBwcm9wZXJ0aWVzIHdoZW4gc2V0dGluZyAuaHJlZiB3aXRoIGEgcmVsYXRpdmUgVVJMLFxuICAgICAgLy8gaG93ZXZlciAuaHJlZiB3aWxsIHJldHVybiBhbiBhYnNvbHV0ZSBVUkwgd2hpY2ggdGhlbiBjYW4gYmUgdXNlZCBvbiBpdHNlbGZcbiAgICAgIC8vIHRvIHBvcHVsYXRlIHRoZXNlIGFkZGl0aW9uYWwgZmllbGRzLlxuICAgICAgaWYgKGEuaG9zdCA9PT0gJycpIHtcbiAgICAgICAgYS5ocmVmID0gYS5ocmVmO1xuICAgICAgfVxuICAgICAgZG9tYWluID0gYS5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgb3JpZ2luID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWxhdGl2ZSBwcm90b2NvbCBpcyBicm9rZW46IGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtdXJsL2lzc3Vlcy81XG4gICAgICB2YXIgcGFydHMgPSByZXF1aXJlKCd1cmwnKS5wYXJzZSh1cmwpO1xuICAgICAgZG9tYWluID0gcGFydHMuaG9zdG5hbWU7XG4gICAgICBvcmlnaW4gPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChvcmlnaW4gIT09IGRvbWFpbikge1xuICAgICAgdmFyIHdoaXRlTGlzdGVkID0gb3B0LmRvbWFpbldoaXRlTGlzdC5zb21lKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGlkeCA9IGRvbWFpbi5sZW5ndGggLSBkLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGQgPT09IGRvbWFpbiB8fFxuICAgICAgICAgIChpZHggPiAxICYmIGRvbWFpbltpZHgtMV0gPT09ICcuJyAmJiBkb21haW4ubGFzdEluZGV4T2YoZCkgPT09IGlkeCk7XG4gICAgICB9KTtcbiAgICAgIGlmICghd2hpdGVMaXN0ZWQpIHtcbiAgICAgICAgdGhyb3cgJ1VSTCBpcyBub3Qgd2hpdGVsaXN0ZWQ6ICcgKyB1cmw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIGxvYWQob3B0LCBjYWxsYmFjaykge1xuICB2YXIgZXJyb3IgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlKSB7IHRocm93IGU7IH0sIHVybDtcblxuICB0cnkge1xuICAgIHVybCA9IGxvYWQuc2FuaXRpemVVcmwob3B0KTsgLy8gZW5hYmxlIG92ZXJyaWRlXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yKGVycik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICBlcnJvcignSW52YWxpZCBVUkw6ICcgKyBvcHQudXJsKTtcbiAgfSBlbHNlIGlmIChsb2FkLnVzZVhIUikge1xuICAgIC8vIG9uIGNsaWVudCwgdXNlIHhoclxuICAgIHJldHVybiB4aHIodXJsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAoc3RhcnRzV2l0aCh1cmwsIGZpbGVQcm90b2NvbCkpIHtcbiAgICAvLyBvbiBzZXJ2ZXIsIGlmIHVybCBzdGFydHMgd2l0aCAnZmlsZTovLycsIHN0cmlwIGl0IGFuZCBsb2FkIGZyb20gZmlsZVxuICAgIHJldHVybiBmaWxlKHVybC5zbGljZShmaWxlUHJvdG9jb2wubGVuZ3RoKSwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHVybC5pbmRleE9mKCc6Ly8nKSA8IDApIHsgLy8gVE9ETyBiZXR0ZXIgcHJvdG9jb2wgY2hlY2s/XG4gICAgLy8gb24gc2VydmVyLCBpZiBubyBwcm90b2NvbCBhc3N1bWUgZmlsZVxuICAgIHJldHVybiBmaWxlKHVybCwgY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIC8vIGZvciByZWd1bGFyIFVSTHMgb24gc2VydmVyXG4gICAgcmV0dXJuIGh0dHAodXJsLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24geGhySGFzUmVzcG9uc2UocmVxdWVzdCkge1xuICB2YXIgdHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICByZXR1cm4gdHlwZSAmJiB0eXBlICE9PSAndGV4dCcgP1xuICAgIHJlcXVlc3QucmVzcG9uc2UgOiAvLyBudWxsIG9uIGVycm9yXG4gICAgcmVxdWVzdC5yZXNwb25zZVRleHQ7IC8vICcnIG9uIGVycm9yXG59XG5cbmZ1bmN0aW9uIHhocih1cmwsIGNhbGxiYWNrKSB7XG4gIHZhciBhc3luYyA9ICEhY2FsbGJhY2s7XG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8vIElmIElFIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgdXNlIFhEb21haW5SZXF1ZXN0IChjb3BpZWQgZnJvbSBkMy54aHIpXG4gIGlmICh0aGlzLlhEb21haW5SZXF1ZXN0ICYmXG4gICAgICAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAvXihodHRwKHMpPzopP1xcL1xcLy8udGVzdCh1cmwpKSByZXF1ZXN0ID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXM7XG4gICAgaWYgKCFzdGF0dXMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkgfHwgc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVxdWVzdCwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgaWYgKCdvbmxvYWQnIGluIHJlcXVlc3QpIHtcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gcmVxdWVzdC5vbmVycm9yID0gcmVzcG9uZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA+IDMpIHJlc3BvbmQoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIFxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgYXN5bmMpO1xuICByZXF1ZXN0LnNlbmQoKTtcbiAgXG4gIGlmICghYXN5bmMgJiYgeGhySGFzUmVzcG9uc2UocmVxdWVzdCkpIHtcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlsZShmaWxlbmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4Jyk7XG4gIH1cbiAgZnMucmVhZEZpbGUoZmlsZW5hbWUsIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gaHR0cCh1cmwsIGNhbGxiYWNrKSB7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICByZXR1cm4gcmVxdWlyZSgnc3luYy1yZXF1ZXN0JykoJ0dFVCcsIHVybCkuZ2V0Qm9keSgpO1xuICB9XG4gIFxuICB2YXIgb3B0aW9ucyA9IHt1cmw6IHVybCwgZW5jb2Rpbmc6IG51bGwsIGd6aXA6IHRydWV9O1xuICByZXF1aXJlKCdyZXF1ZXN0Jykob3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IGVycm9yIHx8XG4gICAgICAgICdMb2FkIGZhaWxlZCB3aXRoIHJlc3BvbnNlIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyAnLic7XG4gICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHJpbmcsIHNlYXJjaFN0cmluZykge1xuICByZXR1cm4gc3RyaW5nID09IG51bGwgPyBmYWxzZSA6IHN0cmluZy5sYXN0SW5kZXhPZihzZWFyY2hTdHJpbmcsIDApID09PSAwO1xufVxuXG5sb2FkLnNhbml0aXplVXJsID0gc2FuaXRpemVVcmw7XG5cbmxvYWQudXNlWEhSID0gKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5mdW5jdGlvbiByZWFkKGRhdGEsIGZvcm1hdCkge1xuICB2YXIgdHlwZSA9IChmb3JtYXQgJiYgZm9ybWF0LnR5cGUpIHx8ICdqc29uJztcbiAgZGF0YSA9IGZvcm1hdHNbdHlwZV0oZGF0YSwgZm9ybWF0KTtcbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQucGFyc2UpIHBhcnNlKGRhdGEsIGZvcm1hdC5wYXJzZSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBwYXJzZShkYXRhLCB0eXBlcykge1xuICB2YXIgY29scywgcGFyc2VycywgZCwgaSwgaiwgY2xlbiwgbGVuID0gZGF0YS5sZW5ndGg7XG5cbiAgdHlwZXMgPSAodHlwZXM9PT0nYXV0bycpID8gdHlwZS5pbmZlckFsbChkYXRhKSA6IHV0aWwuZHVwbGljYXRlKHR5cGVzKTtcbiAgY29scyA9IHV0aWwua2V5cyh0eXBlcyk7XG4gIHBhcnNlcnMgPSBjb2xzLm1hcChmdW5jdGlvbihjKSB7IHJldHVybiB0eXBlLnBhcnNlcnNbdHlwZXNbY11dOyB9KTtcblxuICBmb3IgKGk9MCwgY2xlbj1jb2xzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIGQgPSBkYXRhW2ldO1xuICAgIGZvciAoaj0wOyBqPGNsZW47ICsraikge1xuICAgICAgZFtjb2xzW2pdXSA9IHBhcnNlcnNbal0oZFtjb2xzW2pdXSk7XG4gICAgfVxuICB9XG4gIHR5cGUuYW5ub3RhdGlvbihkYXRhLCB0eXBlcyk7XG59XG5cbnJlYWQuZm9ybWF0cyA9IGZvcm1hdHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlYWQ7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKTtcbnZhciBsb2FkID0gcmVxdWlyZSgnLi9sb2FkJyk7XG52YXIgcmVhZCA9IHJlcXVpcmUoJy4vcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxcbiAgLmtleXMocmVhZC5mb3JtYXRzKVxuICAucmVkdWNlKGZ1bmN0aW9uKG91dCwgdHlwZSkge1xuICAgIG91dFt0eXBlXSA9IGZ1bmN0aW9uKG9wdCwgZm9ybWF0LCBjYWxsYmFjaykge1xuICAgICAgLy8gcHJvY2VzcyBhcmd1bWVudHNcbiAgICAgIGlmICh1dGlsLmlzU3RyaW5nKG9wdCkpIHsgb3B0ID0ge3VybDogb3B0fTsgfVxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdXRpbC5pc0Z1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBmb3JtYXQ7XG4gICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHVwIHJlYWQgZm9ybWF0XG4gICAgICBmb3JtYXQgPSB1dGlsLmV4dGVuZCh7cGFyc2U6ICdhdXRvJ30sIGZvcm1hdCk7XG4gICAgICBmb3JtYXQudHlwZSA9IHR5cGU7XG5cbiAgICAgIC8vIGxvYWQgZGF0YVxuICAgICAgdmFyIGRhdGEgPSBsb2FkKG9wdCwgY2FsbGJhY2sgPyBmdW5jdGlvbihlcnJvciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgY2FsbGJhY2soZXJyb3IsIG51bGwpOyByZXR1cm47IH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBkYXRhIGxvYWRlZCwgbm93IHBhcnNlIGl0IChhc3luYylcbiAgICAgICAgICBkYXRhID0gcmVhZChkYXRhLCBmb3JtYXQpO1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gOiB1bmRlZmluZWQpO1xuICAgICAgXG4gICAgICAvLyBkYXRhIGxvYWRlZCwgbm93IHBhcnNlIGl0IChzeW5jKVxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHJlYWQoZGF0YSwgZm9ybWF0KTtcbiAgICB9O1xuICAgIHJldHVybiBvdXQ7XG4gIH0sIHt9KTtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpO1xuXG52YXIgVFlQRVMgPSAnX190eXBlc19fJztcblxudmFyIFBBUlNFUlMgPSB7XG4gIGJvb2xlYW46IHV0aWwuYm9vbGVhbixcbiAgaW50ZWdlcjogdXRpbC5udW1iZXIsXG4gIG51bWJlcjogIHV0aWwubnVtYmVyLFxuICBkYXRlOiAgICB1dGlsLmRhdGUsXG4gIHN0cmluZzogIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg9PT0nJyA/IG51bGwgOiB4OyB9XG59O1xuXG52YXIgVEVTVFMgPSB7XG4gIGJvb2xlYW46IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg9PT0ndHJ1ZScgfHwgeD09PSdmYWxzZScgfHwgdXRpbC5pc0Jvb2xlYW4oeCk7IH0sXG4gIGludGVnZXI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIFRFU1RTLm51bWJlcih4KSAmJiAoeD0reCkgPT09IH5+eDsgfSxcbiAgbnVtYmVyOiBmdW5jdGlvbih4KSB7IHJldHVybiAhaXNOYU4oK3gpICYmICF1dGlsLmlzRGF0ZSh4KTsgfSxcbiAgZGF0ZTogZnVuY3Rpb24oeCkgeyByZXR1cm4gIWlzTmFOKERhdGUucGFyc2UoeCkpOyB9XG59O1xuXG5mdW5jdGlvbiBhbm5vdGF0aW9uKGRhdGEsIHR5cGVzKSB7XG4gIGlmICghdHlwZXMpIHJldHVybiBkYXRhICYmIGRhdGFbVFlQRVNdIHx8IG51bGw7XG4gIGRhdGFbVFlQRVNdID0gdHlwZXM7XG59XG5cbmZ1bmN0aW9uIHR5cGUodmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB2LCBpLCBuO1xuXG4gIC8vIGlmIGRhdGEgYXJyYXkgaGFzIHR5cGUgYW5ub3RhdGlvbnMsIHVzZSB0aGVtXG4gIGlmICh2YWx1ZXNbVFlQRVNdKSB7XG4gICAgdiA9IGYodmFsdWVzW1RZUEVTXSk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodikpIHJldHVybiB2O1xuICB9XG5cbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgIXV0aWwuaXNWYWxpZCh2KSAmJiBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICB9XG5cbiAgcmV0dXJuIHV0aWwuaXNEYXRlKHYpID8gJ2RhdGUnIDpcbiAgICB1dGlsLmlzTnVtYmVyKHYpICAgID8gJ251bWJlcicgOlxuICAgIHV0aWwuaXNCb29sZWFuKHYpICAgPyAnYm9vbGVhbicgOlxuICAgIHV0aWwuaXNTdHJpbmcodikgICAgPyAnc3RyaW5nJyA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHR5cGVBbGwoZGF0YSwgZmllbGRzKSB7XG4gIGlmICghZGF0YS5sZW5ndGgpIHJldHVybjtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24odHlwZXMsIGYpIHtcbiAgICByZXR1cm4gKHR5cGVzW2ZdID0gdHlwZShkYXRhLCBmKSwgdHlwZXMpO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGluZmVyKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgaSwgaiwgdjtcblxuICAvLyB0eXBlcyB0byB0ZXN0IGZvciwgaW4gcHJlY2VkZW5jZSBvcmRlclxuICB2YXIgdHlwZXMgPSBbJ2Jvb2xlYW4nLCAnaW50ZWdlcicsICdudW1iZXInLCAnZGF0ZSddO1xuXG4gIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIC8vIGdldCBuZXh0IHZhbHVlIHRvIHRlc3RcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICAvLyB0ZXN0IHZhbHVlIGFnYWluc3QgcmVtYWluaW5nIHR5cGVzXG4gICAgZm9yIChqPTA7IGo8dHlwZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmICh1dGlsLmlzVmFsaWQodikgJiYgIVRFU1RTW3R5cGVzW2pdXSh2KSkge1xuICAgICAgICB0eXBlcy5zcGxpY2UoaiwgMSk7XG4gICAgICAgIGogLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgbm8gdHlwZXMgbGVmdCwgcmV0dXJuICdzdHJpbmcnXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICdzdHJpbmcnO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpbmZlckFsbChkYXRhLCBmaWVsZHMpIHtcbiAgZmllbGRzID0gZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKTtcbiAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24odHlwZXMsIGYpIHtcbiAgICB0eXBlc1tmXSA9IGluZmVyKGRhdGEsIGYpO1xuICAgIHJldHVybiB0eXBlcztcbiAgfSwge30pO1xufVxuXG50eXBlLmFubm90YXRpb24gPSBhbm5vdGF0aW9uO1xudHlwZS5hbGwgPSB0eXBlQWxsO1xudHlwZS5pbmZlciA9IGluZmVyO1xudHlwZS5pbmZlckFsbCA9IGluZmVyQWxsO1xudHlwZS5wYXJzZXJzID0gUEFSU0VSUztcbm1vZHVsZS5leHBvcnRzID0gdHlwZTsiLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG52YXIgZGwgPSB7XG4gIHZlcnNpb246ICAgICcxLjQuMycsXG4gIGxvYWQ6ICAgICAgIHJlcXVpcmUoJy4vaW1wb3J0L2xvYWQnKSxcbiAgcmVhZDogICAgICAgcmVxdWlyZSgnLi9pbXBvcnQvcmVhZCcpLFxuICB0eXBlOiAgICAgICByZXF1aXJlKCcuL2ltcG9ydC90eXBlJyksXG4gIEFnZ3JlZ2F0b3I6IHJlcXVpcmUoJy4vYWdncmVnYXRlL2FnZ3JlZ2F0b3InKSxcbiAgZ3JvdXBieTogICAgcmVxdWlyZSgnLi9hZ2dyZWdhdGUvZ3JvdXBieScpLFxuICBiaW5zOiAgICAgICByZXF1aXJlKCcuL2JpbnMvYmlucycpLFxuICAkYmluOiAgICAgICByZXF1aXJlKCcuL2JpbnMvaGlzdG9ncmFtJykuJGJpbixcbiAgaGlzdG9ncmFtOiAgcmVxdWlyZSgnLi9iaW5zL2hpc3RvZ3JhbScpLmhpc3RvZ3JhbSxcbiAgZm9ybWF0OiAgICAgcmVxdWlyZSgnLi9mb3JtYXQnKSxcbiAgcHJpbnQ6ICAgICAgcmVxdWlyZSgnLi9wcmludCcpLFxuICB0ZW1wbGF0ZTogICByZXF1aXJlKCcuL3RlbXBsYXRlJyksXG4gIHRpbWU6ICAgICAgIHJlcXVpcmUoJy4vdGltZScpXG59O1xuXG51dGlsLmV4dGVuZChkbCwgdXRpbCk7XG51dGlsLmV4dGVuZChkbCwgcmVxdWlyZSgnLi9nZW5lcmF0ZScpKTtcbnV0aWwuZXh0ZW5kKGRsLCByZXF1aXJlKCcuL3N0YXRzJykpO1xudXRpbC5leHRlbmQoZGwsIHJlcXVpcmUoJy4vaW1wb3J0L3JlYWRlcnMnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGw7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi9pbXBvcnQvdHlwZScpO1xudmFyIHN0YXRzID0gcmVxdWlyZSgnLi9zdGF0cycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xuXG52YXIgRk1UID0ge1xuICAnZGF0ZSc6ICAgICd8dGltZTpcIiVtLyVkLyVZICVIOiVNOiVTXCInLFxuICAnbnVtYmVyJzogICd8bnVtYmVyOlwiLjRmXCInLFxuICAnaW50ZWdlcic6ICd8bnVtYmVyOlwiZFwiJ1xufTtcblxudmFyIFBPUyA9IHtcbiAgJ251bWJlcic6ICAnbGVmdCcsXG4gICdpbnRlZ2VyJzogJ2xlZnQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cy50YWJsZSA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xuICBvcHQgPSB1dGlsLmV4dGVuZCh7c2VwYXJhdG9yOicgJywgbWlud2lkdGg6IDgsIG1heHdpZHRoOiAxNX0sIG9wdCk7XG4gIHZhciBmaWVsZHMgPSBvcHQuZmllbGRzIHx8IHV0aWwua2V5cyhkYXRhWzBdKSxcbiAgICAgIHR5cGVzID0gdHlwZS5hbGwoZGF0YSk7XG5cbiAgaWYgKG9wdC5zdGFydCB8fCBvcHQubGltaXQpIHtcbiAgICB2YXIgYSA9IG9wdC5zdGFydCB8fCAwLFxuICAgICAgICBiID0gb3B0LmxpbWl0ID8gYSArIG9wdC5saW1pdCA6IGRhdGEubGVuZ3RoO1xuICAgIGRhdGEgPSBkYXRhLnNsaWNlKGEsIGIpO1xuICB9XG5cbiAgLy8gZGV0ZXJtaW5lIGNoYXIgd2lkdGggb2YgZmllbGRzXG4gIHZhciBsZW5zID0gZmllbGRzLm1hcChmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGZvcm1hdCA9IEZNVFt0eXBlc1tuYW1lXV0gfHwgJycsXG4gICAgICAgIHQgPSB0ZW1wbGF0ZSgne3snICsgbmFtZSArIGZvcm1hdCArICd9fScpLFxuICAgICAgICBsID0gc3RhdHMubWF4KGRhdGEsIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHQoeCkubGVuZ3RoOyB9KTtcbiAgICBsID0gTWF0aC5tYXgoTWF0aC5taW4obmFtZS5sZW5ndGgsIG9wdC5taW53aWR0aCksIGwpO1xuICAgIHJldHVybiBvcHQubWF4d2lkdGggPiAwID8gTWF0aC5taW4obCwgb3B0Lm1heHdpZHRoKSA6IGw7XG4gIH0pO1xuXG4gIC8vIHByaW50IGhlYWRlciByb3dcbiAgdmFyIGhlYWQgPSBmaWVsZHMubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICByZXR1cm4gdXRpbC50cnVuY2F0ZSh1dGlsLnBhZChuYW1lLCBsZW5zW2ldLCAnY2VudGVyJyksIGxlbnNbaV0pO1xuICB9KS5qb2luKG9wdC5zZXBhcmF0b3IpO1xuXG4gIC8vIGJ1aWxkIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciBlYWNoIHJvd1xuICB2YXIgdG1wbCA9IHRlbXBsYXRlKGZpZWxkcy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiAne3snICtcbiAgICAgIG5hbWUgK1xuICAgICAgKEZNVFt0eXBlc1tuYW1lXV0gfHwgJycpICtcbiAgICAgICgnfHBhZDonICsgbGVuc1tpXSArICcsJyArIChQT1NbdHlwZXNbbmFtZV1dIHx8ICdyaWdodCcpKSArXG4gICAgICAoJ3x0cnVuY2F0ZTonICsgbGVuc1tpXSkgK1xuICAgICd9fSc7XG4gIH0pLmpvaW4ob3B0LnNlcGFyYXRvcikpO1xuXG4gIC8vIHByaW50IHRhYmxlXG4gIHJldHVybiBoZWFkICsgXCJcXG5cIiArIGRhdGEubWFwKHRtcGwpLmpvaW4oJ1xcbicpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuc3VtbWFyeSA9IGZ1bmN0aW9uKHMpIHtcbiAgcyA9IHMgPyBzLl9fc3VtbWFyeV9fID8gcyA6IHN0YXRzLnN1bW1hcnkocykgOiB0aGlzO1xuICB2YXIgc3RyID0gW10sIGksIG47XG4gIGZvciAoaT0wLCBuPXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHN0ci5wdXNoKCctLSAnICsgc1tpXS5maWVsZCArICcgLS0nKTtcbiAgICBpZiAoc1tpXS50eXBlID09PSAnc3RyaW5nJyB8fCBzW2ldLmRpc3RpbmN0IDwgMTApIHtcbiAgICAgIHN0ci5wdXNoKHByaW50Q2F0ZWdvcmljYWxQcm9maWxlKHNbaV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyLnB1c2gocHJpbnRRdWFudGl0YXRpdmVQcm9maWxlKHNbaV0pKTtcbiAgICB9XG4gICAgc3RyLnB1c2goJycpO1xuICB9XG4gIHJldHVybiBzdHIuam9pbignXFxuJyk7XG59O1xuXG5mdW5jdGlvbiBwcmludFF1YW50aXRhdGl2ZVByb2ZpbGUocCkge1xuICByZXR1cm4gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ21pbjogICAgICAnICsgcC5taW4sXG4gICAgJ21heDogICAgICAnICsgcC5tYXgsXG4gICAgJ21lZGlhbjogICAnICsgcC5tZWRpYW4sXG4gICAgJ21lYW46ICAgICAnICsgcC5tZWFuLFxuICAgICdzdGRldjogICAgJyArIHAuc3RkZXYsXG4gICAgJ21vZGVza2V3OiAnICsgcC5tb2Rlc2tld1xuICBdLmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiBwcmludENhdGVnb3JpY2FsUHJvZmlsZShwKSB7XG4gIHZhciBsaXN0ID0gW1xuICAgICd2YWxpZDogICAgJyArIHAudmFsaWQsXG4gICAgJ21pc3Npbmc6ICAnICsgcC5taXNzaW5nLFxuICAgICdkaXN0aW5jdDogJyArIHAuZGlzdGluY3QsXG4gICAgJ3RvcCB2YWx1ZXM6ICdcbiAgXTtcbiAgdmFyIHUgPSBwLnVuaXF1ZTtcbiAgdmFyIHRvcCA9IHV0aWwua2V5cyh1KVxuICAgIC5zb3J0KGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gdVtiXSAtIHVbYV07IH0pXG4gICAgLnNsaWNlKDAsIDYpXG4gICAgLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiAnIFxcJycgKyB2ICsgJ1xcJyAoJyArIHVbdl0gKyAnKSc7IH0pO1xuICByZXR1cm4gbGlzdC5jb25jYXQodG9wKS5qb2luKCdcXG4nKTtcbn0iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuL2ltcG9ydC90eXBlJyk7XG52YXIgZ2VuID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xudmFyIHN0YXRzID0ge307XG5cbi8vIENvbGxlY3QgdW5pcXVlIHZhbHVlcy5cbi8vIE91dHB1dDogYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlcywgaW4gZmlyc3Qtb2JzZXJ2ZWQgb3JkZXJcbnN0YXRzLnVuaXF1ZSA9IGZ1bmN0aW9uKHZhbHVlcywgZiwgcmVzdWx0cykge1xuICBmID0gdXRpbC4kKGYpO1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcbiAgdmFyIHUgPSB7fSwgdiwgaSwgbjtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSBjb250aW51ZTtcbiAgICB1W3ZdID0gMTtcbiAgICByZXN1bHRzLnB1c2godik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW5wdXQgYXJyYXkuXG5zdGF0cy5jb3VudCA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGggfHwgMDtcbn07XG5cbi8vIENvdW50IHRoZSBudW1iZXIgb2Ygbm9uLW51bGwsIG5vbi11bmRlZmluZWQsIG5vbi1OYU4gdmFsdWVzLlxuc3RhdHMuY291bnQudmFsaWQgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHYsIGksIG4sIHZhbGlkID0gMDtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB2YWxpZCArPSAxO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn07XG5cbi8vIENvdW50IHRoZSBudW1iZXIgb2YgbnVsbCBvciB1bmRlZmluZWQgdmFsdWVzLlxuc3RhdHMuY291bnQubWlzc2luZyA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgdiwgaSwgbiwgY291bnQgPSAwO1xuICBmb3IgKGk9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh2ID09IG51bGwpIGNvdW50ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuLy8gQ291bnQgdGhlIG51bWJlciBvZiBkaXN0aW5jdCB2YWx1ZXMuXG4vLyBOdWxsLCB1bmRlZmluZWQgYW5kIE5hTiBhcmUgZWFjaCBjb25zaWRlcmVkIGRpc3RpbmN0IHZhbHVlcy5cbnN0YXRzLmNvdW50LmRpc3RpbmN0ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIHZhciB1ID0ge30sIHYsIGksIG4sIGNvdW50ID0gMDtcbiAgZm9yIChpPTAsIG49dmFsdWVzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodiBpbiB1KSBjb250aW51ZTtcbiAgICB1W3ZdID0gMTtcbiAgICBjb3VudCArPSAxO1xuICB9XG4gIHJldHVybiBjb3VudDtcbn07XG5cbi8vIENvbnN0cnVjdCBhIG1hcCBmcm9tIGRpc3RpbmN0IHZhbHVlcyB0byBvY2N1cnJlbmNlIGNvdW50cy5cbnN0YXRzLmNvdW50Lm1hcCA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgbWFwID0ge30sIHYsIGksIG47XG4gIGZvciAoaT0wLCBuPXZhbHVlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgbWFwW3ZdID0gKHYgaW4gbWFwKSA/IG1hcFt2XSArIDEgOiAxO1xuICB9XG4gIHJldHVybiBtYXA7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtZWRpYW4gb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1lZGlhbiA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBpZiAoZikgdmFsdWVzID0gdmFsdWVzLm1hcCh1dGlsLiQoZikpO1xuICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKHV0aWwuaXNWYWxpZCkuc29ydCh1dGlsLmNtcCk7XG4gIHJldHVybiBzdGF0cy5xdWFudGlsZSh2YWx1ZXMsIDAuNSk7XG59O1xuXG4vLyBDb21wdXRlcyB0aGUgcXVhcnRpbGUgYm91bmRhcmllcyBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMucXVhcnRpbGUgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgaWYgKGYpIHZhbHVlcyA9IHZhbHVlcy5tYXAodXRpbC4kKGYpKTtcbiAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcih1dGlsLmlzVmFsaWQpLnNvcnQodXRpbC5jbXApO1xuICB2YXIgcSA9IHN0YXRzLnF1YW50aWxlO1xuICByZXR1cm4gW3EodmFsdWVzLCAwLjI1KSwgcSh2YWx1ZXMsIDAuNTApLCBxKHZhbHVlcywgMC43NSldO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgcXVhbnRpbGUgb2YgYSBzb3J0ZWQgYXJyYXkgb2YgbnVtYmVycy5cbi8vIEFkYXB0ZWQgZnJvbSB0aGUgRDMuanMgaW1wbGVtZW50YXRpb24uXG5zdGF0cy5xdWFudGlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgZiwgcCkge1xuICBpZiAocCA9PT0gdW5kZWZpbmVkKSB7IHAgPSBmOyBmID0gdXRpbC5pZGVudGl0eTsgfVxuICBmID0gdXRpbC4kKGYpO1xuICB2YXIgSCA9ICh2YWx1ZXMubGVuZ3RoIC0gMSkgKiBwICsgMSxcbiAgICAgIGggPSBNYXRoLmZsb29yKEgpLFxuICAgICAgdiA9ICtmKHZhbHVlc1toIC0gMV0pLFxuICAgICAgZSA9IEggLSBoO1xuICByZXR1cm4gZSA/IHYgKyBlICogKGYodmFsdWVzW2hdKSAtIHYpIDogdjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHN1bSBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuc3VtID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIGYgPSB1dGlsLiQoZik7XG4gIGZvciAodmFyIHN1bT0wLCBpPTAsIG49dmFsdWVzLmxlbmd0aCwgdjsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSBzdW0gKz0gdjtcbiAgfVxuICByZXR1cm4gc3VtO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbWVhbiAoYXZlcmFnZSkgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1lYW4gPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIG1lYW4gPSAwLCBkZWx0YSwgaSwgbiwgYywgdjtcbiAgZm9yIChpPTAsIGM9MCwgbj12YWx1ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGRlbHRhID0gdiAtIG1lYW47XG4gICAgICBtZWFuID0gbWVhbiArIGRlbHRhIC8gKCsrYyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtZWFuO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc2FtcGxlIHZhcmlhbmNlIG9mIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy52YXJpYW5jZSA9IGZ1bmN0aW9uKHZhbHVlcywgZikge1xuICBmID0gdXRpbC4kKGYpO1xuICBpZiAoIXV0aWwuaXNBcnJheSh2YWx1ZXMpIHx8IHZhbHVlcy5sZW5ndGggPCAyKSByZXR1cm4gMDtcbiAgdmFyIG1lYW4gPSAwLCBNMiA9IDAsIGRlbHRhLCBpLCBjLCB2O1xuICBmb3IgKGk9MCwgYz0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIHYgPSBmID8gZih2YWx1ZXNbaV0pIDogdmFsdWVzW2ldO1xuICAgIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIGRlbHRhID0gdiAtIG1lYW47XG4gICAgICBtZWFuID0gbWVhbiArIGRlbHRhIC8gKCsrYyk7XG4gICAgICBNMiA9IE0yICsgZGVsdGEgKiAodiAtIG1lYW4pO1xuICAgIH1cbiAgfVxuICBNMiA9IE0yIC8gKGMgLSAxKTtcbiAgcmV0dXJuIE0yO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgc2FtcGxlIHN0YW5kYXJkIGRldmlhdGlvbiBvZiBhbiBhcnJheSBvZiBudW1iZXJzLlxuc3RhdHMuc3RkZXYgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgcmV0dXJuIE1hdGguc3FydChzdGF0cy52YXJpYW5jZSh2YWx1ZXMsIGYpKTtcbn07XG5cbi8vIENvbXB1dGUgdGhlIFBlYXJzb24gbW9kZSBza2V3bmVzcyAoKG1lZGlhbi1tZWFuKS9zdGRldikgb2YgYW4gYXJyYXkgb2YgbnVtYmVycy5cbnN0YXRzLm1vZGVza2V3ID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHZhciBhdmcgPSBzdGF0cy5tZWFuKHZhbHVlcywgZiksXG4gICAgICBtZWQgPSBzdGF0cy5tZWRpYW4odmFsdWVzLCBmKSxcbiAgICAgIHN0ZCA9IHN0YXRzLnN0ZGV2KHZhbHVlcywgZik7XG4gIHJldHVybiBzdGQgPT09IDAgPyAwIDogKGF2ZyAtIG1lZCkgLyBzdGQ7XG59O1xuXG4vLyBGaW5kIHRoZSBtaW5pbXVtIHZhbHVlIGluIGFuIGFycmF5Llxuc3RhdHMubWluID0gZnVuY3Rpb24odmFsdWVzLCBmKSB7XG4gIHJldHVybiBzdGF0cy5leHRlbnQodmFsdWVzLCBmKVswXTtcbn07XG5cbi8vIEZpbmQgdGhlIG1heGltdW0gdmFsdWUgaW4gYW4gYXJyYXkuXG5zdGF0cy5tYXggPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgcmV0dXJuIHN0YXRzLmV4dGVudCh2YWx1ZXMsIGYpWzFdO1xufTtcblxuLy8gRmluZCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSBvZiBhbiBhcnJheSBvZiB2YWx1ZXMuXG5zdGF0cy5leHRlbnQgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIGEsIGIsIHYsIGksIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7IGEgPSBiID0gdjsgYnJlYWs7IH1cbiAgfVxuICBmb3IgKDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBpZiAodiA8IGEpIGEgPSB2O1xuICAgICAgaWYgKHYgPiBiKSBiID0gdjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFthLCBiXTtcbn07XG5cbi8vIEZpbmQgdGhlIGludGVnZXIgaW5kaWNlcyBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuXG5zdGF0cy5leHRlbnQuaW5kZXggPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIHggPSAtMSwgeSA9IC0xLCBhLCBiLCB2LCBpLCBuID0gdmFsdWVzLmxlbmd0aDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgdiA9IGYgPyBmKHZhbHVlc1tpXSkgOiB2YWx1ZXNbaV07XG4gICAgaWYgKHV0aWwuaXNWYWxpZCh2KSkgeyBhID0gYiA9IHY7IHggPSB5ID0gaTsgYnJlYWs7IH1cbiAgfVxuICBmb3IgKDsgaTxuOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcbiAgICBpZiAodXRpbC5pc1ZhbGlkKHYpKSB7XG4gICAgICBpZiAodiA8IGEpIHsgYSA9IHY7IHggPSBpOyB9XG4gICAgICBpZiAodiA+IGIpIHsgYiA9IHY7IHkgPSBpOyB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbeCwgeV07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gYXJyYXlzIG9mIG51bWJlcnMuXG5zdGF0cy5kb3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIHN1bSA9IDAsIGksIHY7XG4gIGlmICghYikge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoICE9PSBhLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0FycmF5IGxlbmd0aHMgbXVzdCBtYXRjaC4nKTtcbiAgICB9XG4gICAgZm9yIChpPTA7IGk8dmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2ID0gdmFsdWVzW2ldICogYVtpXTtcbiAgICAgIGlmICh2ID09PSB2KSBzdW0gKz0gdjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYSA9IHV0aWwuJChhKTtcbiAgICBiID0gdXRpbC4kKGIpO1xuICAgIGZvciAoaT0wOyBpPHZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdiA9IGEodmFsdWVzW2ldKSAqIGIodmFsdWVzW2ldKTtcbiAgICAgIGlmICh2ID09PSB2KSBzdW0gKz0gdjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIENvbXB1dGUgYXNjZW5kaW5nIHJhbmsgc2NvcmVzIGZvciBhbiBhcnJheSBvZiB2YWx1ZXMuXG4vLyBUaWVzIGFyZSBhc3NpZ25lZCB0aGVpciBjb2xsZWN0aXZlIG1lYW4gcmFuay5cbnN0YXRzLnJhbmsgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKSB8fCB1dGlsLmlkZW50aXR5O1xuICB2YXIgYSA9IHZhbHVlcy5tYXAoZnVuY3Rpb24odiwgaSkge1xuICAgICAgcmV0dXJuIHtpZHg6IGksIHZhbDogZih2KX07XG4gICAgfSlcbiAgICAuc29ydCh1dGlsLmNvbXBhcmF0b3IoJ3ZhbCcpKTtcblxuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICByID0gQXJyYXkobiksXG4gICAgICB0aWUgPSAtMSwgcCA9IHt9LCBpLCB2LCBtdTtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICB2ID0gYVtpXS52YWw7XG4gICAgaWYgKHRpZSA8IDAgJiYgcCA9PT0gdikge1xuICAgICAgdGllID0gaSAtIDE7XG4gICAgfSBlbHNlIGlmICh0aWUgPiAtMSAmJiBwICE9PSB2KSB7XG4gICAgICBtdSA9IDEgKyAoaS0xICsgdGllKSAvIDI7XG4gICAgICBmb3IgKDsgdGllPGk7ICsrdGllKSByW2FbdGllXS5pZHhdID0gbXU7XG4gICAgICB0aWUgPSAtMTtcbiAgICB9XG4gICAgclthW2ldLmlkeF0gPSBpICsgMTtcbiAgICBwID0gdjtcbiAgfVxuXG4gIGlmICh0aWUgPiAtMSkge1xuICAgIG11ID0gMSArIChuLTEgKyB0aWUpIC8gMjtcbiAgICBmb3IgKDsgdGllPG47ICsrdGllKSByW2FbdGllXS5pZHhdID0gbXU7XG4gIH1cblxuICByZXR1cm4gcjtcbn07XG5cbi8vIENvbXB1dGUgdGhlIHNhbXBsZSBQZWFyc29uIHByb2R1Y3QtbW9tZW50IGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgbnVtYmVycy5cbnN0YXRzLmNvciA9IGZ1bmN0aW9uKHZhbHVlcywgYSwgYikge1xuICB2YXIgZm4gPSBiO1xuICBiID0gZm4gPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhO1xuICBhID0gZm4gPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXM7XG5cbiAgdmFyIGRvdCA9IHN0YXRzLmRvdChhLCBiKSxcbiAgICAgIG11YSA9IHN0YXRzLm1lYW4oYSksXG4gICAgICBtdWIgPSBzdGF0cy5tZWFuKGIpLFxuICAgICAgc2RhID0gc3RhdHMuc3RkZXYoYSksXG4gICAgICBzZGIgPSBzdGF0cy5zdGRldihiKSxcbiAgICAgIG4gPSB2YWx1ZXMubGVuZ3RoO1xuXG4gIHJldHVybiAoZG90IC0gbiptdWEqbXViKSAvICgobi0xKSAqIHNkYSAqIHNkYik7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBTcGVhcm1hbiByYW5rIGNvcnJlbGF0aW9uIG9mIHR3byBhcnJheXMgb2YgdmFsdWVzLlxuc3RhdHMuY29yLnJhbmsgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIHJhID0gYiA/IHN0YXRzLnJhbmsodmFsdWVzLCB1dGlsLiQoYSkpIDogc3RhdHMucmFuayh2YWx1ZXMpLFxuICAgICAgcmIgPSBiID8gc3RhdHMucmFuayh2YWx1ZXMsIHV0aWwuJChiKSkgOiBzdGF0cy5yYW5rKGEpLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGgsIGksIHMsIGQ7XG5cbiAgZm9yIChpPTAsIHM9MDsgaTxuOyArK2kpIHtcbiAgICBkID0gcmFbaV0gLSByYltpXTtcbiAgICBzICs9IGQgKiBkO1xuICB9XG5cbiAgcmV0dXJuIDEgLSA2KnMgLyAobiAqIChuKm4tMSkpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgZGlzdGFuY2UgY29ycmVsYXRpb24gb2YgdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EaXN0YW5jZV9jb3JyZWxhdGlvblxuc3RhdHMuY29yLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIpIHtcbiAgdmFyIFggPSBiID8gdmFsdWVzLm1hcCh1dGlsLiQoYSkpIDogdmFsdWVzLFxuICAgICAgWSA9IGIgPyB2YWx1ZXMubWFwKHV0aWwuJChiKSkgOiBhO1xuXG4gIHZhciBBID0gc3RhdHMuZGlzdC5tYXQoWCksXG4gICAgICBCID0gc3RhdHMuZGlzdC5tYXQoWSksXG4gICAgICBuID0gQS5sZW5ndGgsXG4gICAgICBpLCBhYSwgYmIsIGFiO1xuXG4gIGZvciAoaT0wLCBhYT0wLCBiYj0wLCBhYj0wOyBpPG47ICsraSkge1xuICAgIGFhICs9IEFbaV0qQVtpXTtcbiAgICBiYiArPSBCW2ldKkJbaV07XG4gICAgYWIgKz0gQVtpXSpCW2ldO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydChhYiAvIE1hdGguc3FydChhYSpiYikpO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgdmVjdG9yIGRpc3RhbmNlIGJldHdlZW4gdHdvIGFycmF5cyBvZiBudW1iZXJzLlxuLy8gRGVmYXVsdCBpcyBFdWNsaWRlYW4gKGV4cD0yKSBkaXN0YW5jZSwgY29uZmlndXJhYmxlIHZpYSBleHAgYXJndW1lbnQuXG5zdGF0cy5kaXN0ID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBleHApIHtcbiAgdmFyIGYgPSB1dGlsLmlzRnVuY3Rpb24oYikgfHwgdXRpbC5pc1N0cmluZyhiKSxcbiAgICAgIFggPSB2YWx1ZXMsXG4gICAgICBZID0gZiA/IHZhbHVlcyA6IGEsXG4gICAgICBlID0gZiA/IGV4cCA6IGIsXG4gICAgICBMMiA9IGUgPT09IDIgfHwgZSA9PSBudWxsLFxuICAgICAgbiA9IHZhbHVlcy5sZW5ndGgsIHMgPSAwLCBkLCBpO1xuICBpZiAoZikge1xuICAgIGEgPSB1dGlsLiQoYSk7XG4gICAgYiA9IHV0aWwuJChiKTtcbiAgfVxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBkID0gZiA/IChhKFhbaV0pLWIoWVtpXSkpIDogKFhbaV0tWVtpXSk7XG4gICAgcyArPSBMMiA/IGQqZCA6IE1hdGgucG93KE1hdGguYWJzKGQpLCBlKTtcbiAgfVxuICByZXR1cm4gTDIgPyBNYXRoLnNxcnQocykgOiBNYXRoLnBvdyhzLCAxL2UpO1xufTtcblxuLy8gQ29uc3RydWN0IGEgbWVhbi1jZW50ZXJlZCBkaXN0YW5jZSBtYXRyaXggZm9yIGFuIGFycmF5IG9mIG51bWJlcnMuXG5zdGF0cy5kaXN0Lm1hdCA9IGZ1bmN0aW9uKFgpIHtcbiAgdmFyIG4gPSBYLmxlbmd0aCxcbiAgICAgIG0gPSBuKm4sXG4gICAgICBBID0gQXJyYXkobSksXG4gICAgICBSID0gZ2VuLnplcm9zKG4pLFxuICAgICAgTSA9IDAsIHYsIGksIGo7XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgQVtpKm4raV0gPSAwO1xuICAgIGZvciAoaj1pKzE7IGo8bjsgKytqKSB7XG4gICAgICBBW2kqbitqXSA9ICh2ID0gTWF0aC5hYnMoWFtpXSAtIFhbal0pKTtcbiAgICAgIEFbaipuK2ldID0gdjtcbiAgICAgIFJbaV0gKz0gdjtcbiAgICAgIFJbal0gKz0gdjtcbiAgICB9XG4gIH1cblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBNICs9IFJbaV07XG4gICAgUltpXSAvPSBuO1xuICB9XG4gIE0gLz0gbTtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBmb3IgKGo9aTsgajxuOyArK2opIHtcbiAgICAgIEFbaSpuK2pdICs9IE0gLSBSW2ldIC0gUltqXTtcbiAgICAgIEFbaipuK2ldID0gQVtpKm4ral07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIEE7XG59O1xuXG4vLyBDb21wdXRlIHRoZSBTaGFubm9uIGVudHJvcHkgKGxvZyBiYXNlIDIpIG9mIGFuIGFycmF5IG9mIGNvdW50cy5cbnN0YXRzLmVudHJvcHkgPSBmdW5jdGlvbihjb3VudHMsIGYpIHtcbiAgZiA9IHV0aWwuJChmKTtcbiAgdmFyIGksIHAsIHMgPSAwLCBIID0gMCwgbiA9IGNvdW50cy5sZW5ndGg7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIHMgKz0gKGYgPyBmKGNvdW50c1tpXSkgOiBjb3VudHNbaV0pO1xuICB9XG4gIGlmIChzID09PSAwKSByZXR1cm4gMDtcbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcCA9IChmID8gZihjb3VudHNbaV0pIDogY291bnRzW2ldKSAvIHM7XG4gICAgaWYgKHApIEggKz0gcCAqIE1hdGgubG9nKHApO1xuICB9XG4gIHJldHVybiAtSCAvIE1hdGguTE4yO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbi8vIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGZvcm0gW01JLCBNSV9kaXN0YW5jZV0gXG4vLyBNSV9kaXN0YW5jZSBpcyBkZWZpbmVkIGFzIDEgLSBJKGEsYikgLyBIKGEsYikuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL011dHVhbF9pbmZvcm1hdGlvblxuc3RhdHMubXV0dWFsID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgdmFyIHggPSBjb3VudHMgPyB2YWx1ZXMubWFwKHV0aWwuJChhKSkgOiB2YWx1ZXMsXG4gICAgICB5ID0gY291bnRzID8gdmFsdWVzLm1hcCh1dGlsLiQoYikpIDogYSxcbiAgICAgIHogPSBjb3VudHMgPyB2YWx1ZXMubWFwKHV0aWwuJChjb3VudHMpKSA6IGI7XG5cbiAgdmFyIHB4ID0ge30sXG4gICAgICBweSA9IHt9LFxuICAgICAgbiA9IHoubGVuZ3RoLFxuICAgICAgcyA9IDAsIEkgPSAwLCBIID0gMCwgcCwgdCwgaTtcblxuICBmb3IgKGk9MDsgaTxuOyArK2kpIHtcbiAgICBweFt4W2ldXSA9IDA7XG4gICAgcHlbeVtpXV0gPSAwO1xuICB9XG5cbiAgZm9yIChpPTA7IGk8bjsgKytpKSB7XG4gICAgcHhbeFtpXV0gKz0geltpXTtcbiAgICBweVt5W2ldXSArPSB6W2ldO1xuICAgIHMgKz0geltpXTtcbiAgfVxuXG4gIHQgPSAxIC8gKHMgKiBNYXRoLkxOMik7XG4gIGZvciAoaT0wOyBpPG47ICsraSkge1xuICAgIGlmICh6W2ldID09PSAwKSBjb250aW51ZTtcbiAgICBwID0gKHMgKiB6W2ldKSAvIChweFt4W2ldXSAqIHB5W3lbaV1dKTtcbiAgICBJICs9IHpbaV0gKiB0ICogTWF0aC5sb2cocCk7XG4gICAgSCArPSB6W2ldICogdCAqIE1hdGgubG9nKHpbaV0vcyk7XG4gIH1cblxuICByZXR1cm4gW0ksIDEgKyBJL0hdO1xufTtcblxuLy8gQ29tcHV0ZSB0aGUgbXV0dWFsIGluZm9ybWF0aW9uIGJldHdlZW4gdHdvIGRpc2NyZXRlIHZhcmlhYmxlcy5cbnN0YXRzLm11dHVhbC5pbmZvID0gZnVuY3Rpb24odmFsdWVzLCBhLCBiLCBjb3VudHMpIHtcbiAgcmV0dXJuIHN0YXRzLm11dHVhbCh2YWx1ZXMsIGEsIGIsIGNvdW50cylbMF07XG59O1xuXG4vLyBDb21wdXRlIHRoZSBtdXR1YWwgaW5mb3JtYXRpb24gZGlzdGFuY2UgYmV0d2VlbiB0d28gZGlzY3JldGUgdmFyaWFibGVzLlxuLy8gTUlfZGlzdGFuY2UgaXMgZGVmaW5lZCBhcyAxIC0gSShhLGIpIC8gSChhLGIpLlxuc3RhdHMubXV0dWFsLmRpc3QgPSBmdW5jdGlvbih2YWx1ZXMsIGEsIGIsIGNvdW50cykge1xuICByZXR1cm4gc3RhdHMubXV0dWFsKHZhbHVlcywgYSwgYiwgY291bnRzKVsxXTtcbn07XG5cbi8vIENvbXB1dGUgYSBwcm9maWxlIG9mIHN1bW1hcnkgc3RhdGlzdGljcyBmb3IgYSB2YXJpYWJsZS5cbnN0YXRzLnByb2ZpbGUgPSBmdW5jdGlvbih2YWx1ZXMsIGYpIHtcbiAgdmFyIG1lYW4gPSAwLFxuICAgICAgdmFsaWQgPSAwLFxuICAgICAgbWlzc2luZyA9IDAsXG4gICAgICBkaXN0aW5jdCA9IDAsXG4gICAgICBtaW4gPSBudWxsLFxuICAgICAgbWF4ID0gbnVsbCxcbiAgICAgIE0yID0gMCxcbiAgICAgIHZhbHMgPSBbXSxcbiAgICAgIHUgPSB7fSwgZGVsdGEsIHNkLCBpLCB2LCB4O1xuXG4gIC8vIGNvbXB1dGUgc3VtbWFyeSBzdGF0c1xuICBmb3IgKGk9MDsgaTx2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gZiA/IGYodmFsdWVzW2ldKSA6IHZhbHVlc1tpXTtcblxuICAgIC8vIHVwZGF0ZSB1bmlxdWUgdmFsdWVzXG4gICAgdVt2XSA9ICh2IGluIHUpID8gdVt2XSArIDEgOiAoZGlzdGluY3QgKz0gMSwgMSk7XG5cbiAgICBpZiAodiA9PSBudWxsKSB7XG4gICAgICArK21pc3Npbmc7XG4gICAgfSBlbHNlIGlmICh1dGlsLmlzVmFsaWQodikpIHtcbiAgICAgIC8vIHVwZGF0ZSBzdGF0c1xuICAgICAgeCA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpID8gdi5sZW5ndGggOiB2O1xuICAgICAgaWYgKG1pbj09PW51bGwgfHwgeCA8IG1pbikgbWluID0geDtcbiAgICAgIGlmIChtYXg9PT1udWxsIHx8IHggPiBtYXgpIG1heCA9IHg7XG4gICAgICBkZWx0YSA9IHggLSBtZWFuO1xuICAgICAgbWVhbiA9IG1lYW4gKyBkZWx0YSAvICgrK3ZhbGlkKTtcbiAgICAgIE0yID0gTTIgKyBkZWx0YSAqICh4IC0gbWVhbik7XG4gICAgICB2YWxzLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIE0yID0gTTIgLyAodmFsaWQgLSAxKTtcbiAgc2QgPSBNYXRoLnNxcnQoTTIpO1xuXG4gIC8vIHNvcnQgdmFsdWVzIGZvciBtZWRpYW4gYW5kIGlxclxuICB2YWxzLnNvcnQodXRpbC5jbXApO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogICAgIHR5cGUodmFsdWVzLCBmKSxcbiAgICB1bmlxdWU6ICAgdSxcbiAgICBjb3VudDogICAgdmFsdWVzLmxlbmd0aCxcbiAgICB2YWxpZDogICAgdmFsaWQsXG4gICAgbWlzc2luZzogIG1pc3NpbmcsXG4gICAgZGlzdGluY3Q6IGRpc3RpbmN0LFxuICAgIG1pbjogICAgICBtaW4sXG4gICAgbWF4OiAgICAgIG1heCxcbiAgICBtZWFuOiAgICAgbWVhbixcbiAgICBzdGRldjogICAgc2QsXG4gICAgbWVkaWFuOiAgICh2ID0gc3RhdHMucXVhbnRpbGUodmFscywgMC41KSksXG4gICAgcTE6ICAgICAgIHN0YXRzLnF1YW50aWxlKHZhbHMsIDAuMjUpLFxuICAgIHEzOiAgICAgICBzdGF0cy5xdWFudGlsZSh2YWxzLCAwLjc1KSxcbiAgICBtb2Rlc2tldzogc2QgPT09IDAgPyAwIDogKG1lYW4gLSB2KSAvIHNkXG4gIH07XG59O1xuXG4vLyBDb21wdXRlIHByb2ZpbGVzIGZvciBhbGwgdmFyaWFibGVzIGluIGEgZGF0YSBzZXQuXG5zdGF0cy5zdW1tYXJ5ID0gZnVuY3Rpb24oZGF0YSwgZmllbGRzKSB7XG4gIGZpZWxkcyA9IGZpZWxkcyB8fCB1dGlsLmtleXMoZGF0YVswXSk7XG4gIHZhciBzID0gZmllbGRzLm1hcChmdW5jdGlvbihmKSB7XG4gICAgdmFyIHAgPSBzdGF0cy5wcm9maWxlKGRhdGEsIHV0aWwuJChmKSk7XG4gICAgcmV0dXJuIChwLmZpZWxkID0gZiwgcCk7XG4gIH0pO1xuICByZXR1cm4gKHMuX19zdW1tYXJ5X18gPSB0cnVlLCBzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdHM7IiwidmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBmb3JtYXQgPSByZXF1aXJlKCcuL2Zvcm1hdCcpO1xuXG52YXIgY29udGV4dCA9IHtcbiAgZm9ybWF0czogICAgW10sXG4gIGZvcm1hdF9tYXA6IHt9LFxuICB0cnVuY2F0ZTogICB1dGlsLnRydW5jYXRlLFxuICBwYWQ6ICAgICAgICB1dGlsLnBhZFxufTtcblxuZnVuY3Rpb24gdGVtcGxhdGUodGV4dCkge1xuICB2YXIgc3JjID0gc291cmNlKHRleHQsICdkJyk7XG4gIHNyYyA9ICd2YXIgX190OyByZXR1cm4gJyArIHNyYyArICc7JztcblxuICAvKiBqc2hpbnQgZXZpbDogdHJ1ZSAqL1xuICByZXR1cm4gKG5ldyBGdW5jdGlvbignZCcsIHNyYykpLmJpbmQoY29udGV4dCk7XG59XG5cbnRlbXBsYXRlLnNvdXJjZSA9IHNvdXJjZTtcbnRlbXBsYXRlLmNvbnRleHQgPSBjb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuLy8gQ2xlYXIgY2FjaGUgb2YgZm9ybWF0IG9iamVjdHMuXG4vLyBUaGlzIGNhbiAqYnJlYWsqIHByaW9yIHRlbXBsYXRlIGZ1bmN0aW9ucywgc28gaW52b2tlIHdpdGggY2FyZSFcbnRlbXBsYXRlLmNsZWFyRm9ybWF0Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgY29udGV4dC5mb3JtYXRzID0gW107XG4gIGNvbnRleHQuZm9ybWF0X21hcCA9IHt9O1xufTtcblxuLy8gR2VuZXJhdGUgcHJvcGVydHkgYWNjZXNzIGNvZGUgZm9yIHVzZSB3aXRoaW4gdGVtcGxhdGUgc291cmNlLlxuLy8gb2JqZWN0OiB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0ICh2YXJpYWJsZSkgY29udGFpbmluZyB0ZW1wbGF0ZSBkYXRhXG4vLyBwcm9wZXJ0eTogdGhlIHByb3BlcnR5IGFjY2VzcyBzdHJpbmcsIHZlcmJhdGltIGZyb20gdGVtcGxhdGUgdGFnXG50ZW1wbGF0ZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgdmFyIHNyYyA9IHV0aWwuZmllbGQocHJvcGVydHkpLm1hcCh1dGlsLnN0cikuam9pbignXVsnKTtcbiAgcmV0dXJuIG9iamVjdCArICdbJyArIHNyYyArICddJztcbn07XG5cbi8vIEdlbmVyYXRlIHNvdXJjZSBjb2RlIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uLlxuLy8gdGV4dDogdGhlIHRlbXBsYXRlIHRleHRcbi8vIHZhcmlhYmxlOiB0aGUgbmFtZSBvZiB0aGUgZGF0YSBvYmplY3QgdmFyaWFibGUgKCdvYmonIGJ5IGRlZmF1bHQpXG4vLyBwcm9wZXJ0aWVzOiBvcHRpb25hbCBoYXNoIGZvciBjb2xsZWN0aW5nIGFsbCBhY2Nlc3NlZCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBzb3VyY2UodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyaWFibGUgPSB2YXJpYWJsZSB8fCAnb2JqJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHNyYyA9ICdcXCcnO1xuICB2YXIgcmVnZXggPSB0ZW1wbGF0ZV9yZTtcblxuICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICB0ZXh0LnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uKG1hdGNoLCBpbnRlcnBvbGF0ZSwgb2Zmc2V0KSB7XG4gICAgc3JjICs9IHRleHRcbiAgICAgIC5zbGljZShpbmRleCwgb2Zmc2V0KVxuICAgICAgLnJlcGxhY2UodGVtcGxhdGVfZXNjYXBlciwgdGVtcGxhdGVfZXNjYXBlQ2hhcik7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgIHNyYyArPSAnXFwnXFxuKygoX190PSgnICtcbiAgICAgICAgdGVtcGxhdGVfdmFyKGludGVycG9sYXRlLCB2YXJpYWJsZSwgcHJvcGVydGllcykgK1xuICAgICAgICAnKSk9PW51bGw/XFwnXFwnOl9fdCkrXFxuXFwnJztcbiAgICB9XG5cbiAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIHNyYyArICdcXCcnO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZV92YXIodGV4dCwgdmFyaWFibGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGZpbHRlcnMgPSB0ZXh0Lm1hdGNoKGZpbHRlcl9yZSk7XG4gIHZhciBwcm9wID0gZmlsdGVycy5zaGlmdCgpLnRyaW0oKTtcbiAgdmFyIHN0cmluZ0Nhc3QgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHN0cmNhbGwoZm4pIHtcbiAgICBmbiA9IGZuIHx8ICcnO1xuICAgIGlmIChzdHJpbmdDYXN0KSB7XG4gICAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgICBzcmMgPSAnU3RyaW5nKCcgKyBzcmMgKyAnKScgKyBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3JjICs9IGZuO1xuICAgIH1cbiAgICByZXR1cm4gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZSgpIHtcbiAgICByZXR1cm4gJyh0eXBlb2YgJyArIHNyYyArICc9PT1cIm51bWJlclwiP25ldyBEYXRlKCcrc3JjKycpOicrc3JjKycpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG51bWJlcl9mb3JtYXQoZm10LCBrZXkpIHtcbiAgICBhID0gdGVtcGxhdGVfZm9ybWF0KGFyZ3NbMF0sIGtleSwgZm10KTtcbiAgICBzdHJpbmdDYXN0ID0gZmFsc2U7XG4gICAgc3JjID0gJ3RoaXMuZm9ybWF0c1snK2ErJ10oJytzcmMrJyknO1xuICB9XG4gIFxuICBmdW5jdGlvbiB0aW1lX2Zvcm1hdChmbXQsIGtleSkge1xuICAgIGEgPSB0ZW1wbGF0ZV9mb3JtYXQoYXJnc1swXSwga2V5LCBmbXQpO1xuICAgIHN0cmluZ0Nhc3QgPSBmYWxzZTtcbiAgICBzcmMgPSAndGhpcy5mb3JtYXRzWycrYSsnXSgnK2RhdGUoKSsnKSc7XG4gIH1cblxuICBpZiAocHJvcGVydGllcykgcHJvcGVydGllc1twcm9wXSA9IDE7XG4gIHZhciBzcmMgPSB0ZW1wbGF0ZS5wcm9wZXJ0eSh2YXJpYWJsZSwgcHJvcCk7XG5cbiAgZm9yICh2YXIgaT0wOyBpPGZpbHRlcnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZiA9IGZpbHRlcnNbaV0sIGFyZ3MgPSBudWxsLCBwaWR4LCBhLCBiO1xuXG4gICAgaWYgKChwaWR4PWYuaW5kZXhPZignOicpKSA+IDApIHtcbiAgICAgIGYgPSBmLnNsaWNlKDAsIHBpZHgpO1xuICAgICAgYXJncyA9IGZpbHRlcnNbaV0uc2xpY2UocGlkeCsxKVxuICAgICAgICAubWF0Y2goYXJnc19yZSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfSk7XG4gICAgfVxuICAgIGYgPSBmLnRyaW0oKTtcblxuICAgIHN3aXRjaCAoZikge1xuICAgICAgY2FzZSAnbGVuZ3RoJzpcbiAgICAgICAgc3RyY2FsbCgnLmxlbmd0aCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xvd2VyJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG93ZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cHBlcic6XG4gICAgICAgIHN0cmNhbGwoJy50b1VwcGVyQ2FzZSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbG93ZXItbG9jYWxlJzpcbiAgICAgICAgc3RyY2FsbCgnLnRvTG9jYWxlTG93ZXJDYXNlKCknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cHBlci1sb2NhbGUnOlxuICAgICAgICBzdHJjYWxsKCcudG9Mb2NhbGVVcHBlckNhc2UoKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyaW0nOlxuICAgICAgICBzdHJjYWxsKCcudHJpbSgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKDAsJyArIGEgKyAnKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBzdHJjYWxsKCcuc2xpY2UoLScgKyBhICsnKScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21pZCc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgYiA9IGEgKyB1dGlsLm51bWJlcihhcmdzWzFdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKCsnK2ErJywnK2IrJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzbGljZSc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgc3RyY2FsbCgnLnNsaWNlKCcrIGEgK1xuICAgICAgICAgIChhcmdzLmxlbmd0aCA+IDEgPyAnLCcgKyB1dGlsLm51bWJlcihhcmdzWzFdKSA6ICcnKSArXG4gICAgICAgICAgJyknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cnVuY2F0ZSc6XG4gICAgICAgIGEgPSB1dGlsLm51bWJlcihhcmdzWzBdKTtcbiAgICAgICAgYiA9IGFyZ3NbMV07XG4gICAgICAgIGIgPSAoYiE9PSdsZWZ0JyAmJiBiIT09J21pZGRsZScgJiYgYiE9PSdjZW50ZXInKSA/ICdyaWdodCcgOiBiO1xuICAgICAgICBzcmMgPSAndGhpcy50cnVuY2F0ZSgnICsgc3RyY2FsbCgpICsgJywnICsgYSArICcsXFwnJyArIGIgKyAnXFwnKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGFkJzpcbiAgICAgICAgYSA9IHV0aWwubnVtYmVyKGFyZ3NbMF0pO1xuICAgICAgICBiID0gYXJnc1sxXTtcbiAgICAgICAgYiA9IChiIT09J2xlZnQnICYmIGIhPT0nbWlkZGxlJyAmJiBiIT09J2NlbnRlcicpID8gJ3JpZ2h0JyA6IGI7XG4gICAgICAgIHNyYyA9ICd0aGlzLnBhZCgnICsgc3RyY2FsbCgpICsgJywnICsgYSArICcsXFwnJyArIGIgKyAnXFwnKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgbnVtYmVyX2Zvcm1hdChmb3JtYXQubnVtYmVyLCAnbnVtYmVyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRpbWVfZm9ybWF0KGZvcm1hdC50aW1lLCAndGltZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUtdXRjJzpcbiAgICAgICAgdGltZV9mb3JtYXQoZm9ybWF0LnV0YywgJ3RpbWUtdXRjJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1VucmVjb2duaXplZCB0ZW1wbGF0ZSBmaWx0ZXI6ICcgKyBmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3JjO1xufVxuXG52YXIgdGVtcGxhdGVfcmUgPSAvXFx7XFx7KC4rPylcXH1cXH18JC9nLFxuICAgIGZpbHRlcl9yZSA9IC8oPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8W15cXHxcIl0rfFteXFx8XFwnXSspKy9nLFxuICAgIGFyZ3NfcmUgPSAvKD86XCJbXlwiXSpcInxcXCdbXlxcJ10qXFwnfFteLFwiXSt8W14sXFwnXSspKy9nO1xuXG4vLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuLy8gc3RyaW5nIGxpdGVyYWwuXG52YXIgdGVtcGxhdGVfZXNjYXBlcyA9IHtcbiAgJ1xcJyc6ICAgICAnXFwnJyxcbiAgJ1xcXFwnOiAgICAgJ1xcXFwnLFxuICAnXFxyJzogICAgICdyJyxcbiAgJ1xcbic6ICAgICAnbicsXG4gICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgJ1xcdTIwMjknOiAndTIwMjknXG59O1xuXG52YXIgdGVtcGxhdGVfZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcblxuZnVuY3Rpb24gdGVtcGxhdGVfZXNjYXBlQ2hhcihtYXRjaCkge1xuICByZXR1cm4gJ1xcXFwnICsgdGVtcGxhdGVfZXNjYXBlc1ttYXRjaF07XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlX2Zvcm1hdChwYXR0ZXJuLCBrZXksIGZtdCkge1xuICBpZiAoKHBhdHRlcm5bMF0gPT09ICdcXCcnICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcXCcnKSB8fFxuICAgICAgKHBhdHRlcm5bMF0gPT09ICdcIicgICYmIHBhdHRlcm5bcGF0dGVybi5sZW5ndGgtMV0gPT09ICdcIicpKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCdGb3JtYXQgcGF0dGVybiBtdXN0IGJlIHF1b3RlZDogJyArIHBhdHRlcm4pO1xuICB9XG4gIGtleSA9IGtleSArICc6JyArIHBhdHRlcm47XG4gIGlmICghY29udGV4dC5mb3JtYXRfbWFwW2tleV0pIHtcbiAgICB2YXIgZiA9IGZtdChwYXR0ZXJuKTtcbiAgICB2YXIgaSA9IGNvbnRleHQuZm9ybWF0cy5sZW5ndGg7XG4gICAgY29udGV4dC5mb3JtYXRzLnB1c2goZik7XG4gICAgY29udGV4dC5mb3JtYXRfbWFwW2tleV0gPSBpO1xuICB9XG4gIHJldHVybiBjb250ZXh0LmZvcm1hdF9tYXBba2V5XTtcbn1cbiIsInZhciBkM190aW1lID0gcmVxdWlyZSgnZDMtdGltZScpO1xuXG52YXIgdGVtcERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGJhc2VEYXRlID0gbmV3IERhdGUoMCwgMCwgMSkuc2V0RnVsbFllYXIoMCksIC8vIEphbiAxLCAwIEFEXG4gICAgdXRjQmFzZURhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygwLCAwLCAxKSkuc2V0VVRDRnVsbFllYXIoMCk7XG5cbmZ1bmN0aW9uIGRhdGUoZCkge1xuICByZXR1cm4gKHRlbXBEYXRlLnNldFRpbWUoK2QpLCB0ZW1wRGF0ZSk7XG59XG5cbi8vIGNyZWF0ZSBhIHRpbWUgdW5pdCBlbnRyeVxuZnVuY3Rpb24gZW50cnkodHlwZSwgZGF0ZSwgdW5pdCwgc3RlcCwgbWluLCBtYXgpIHtcbiAgdmFyIGUgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIHVuaXQ6IHVuaXRcbiAgfTtcbiAgaWYgKHN0ZXApIHtcbiAgICBlLnN0ZXAgPSBzdGVwO1xuICB9IGVsc2Uge1xuICAgIGUubWluc3RlcCA9IDE7XG4gIH1cbiAgaWYgKG1pbiAhPSBudWxsKSBlLm1pbiA9IG1pbjtcbiAgaWYgKG1heCAhPSBudWxsKSBlLm1heCA9IG1heDtcbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0eXBlLCB1bml0LCBiYXNlLCBzdGVwLCBtaW4sIG1heCkge1xuICByZXR1cm4gZW50cnkodHlwZSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0Lm9mZnNldChiYXNlLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiB1bml0LmNvdW50KGJhc2UsIGQpOyB9LFxuICAgIHN0ZXAsIG1pbiwgbWF4KTtcbn1cblxudmFyIGxvY2FsZSA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnNlY29uZCwgYmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUubWludXRlLCBiYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS5ob3VyLCAgIGJhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLmRheSwgICAgYmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS5tb250aCwgIGJhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUueWVhciwgICBiYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIDAsIDAsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0U2Vjb25kcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdtaW51dGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCAxLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldE1pbnV0ZXMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnaG91cnMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDEsIGQpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0SG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIDAsIDQrZCk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXREYXkoKTsgfSxcbiAgICBbMV0sIDAsIDZcbiAgKSxcbiAgZW50cnkoJ2RhdGVzJyxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBuZXcgRGF0ZSgxOTcwLCAwLCBkKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldERhdGUoKTsgfSxcbiAgICBbMV0sIDEsIDMxXG4gICksXG4gIGVudHJ5KCdtb250aHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKDE5NzAsIGQgJSAxMiwgMSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIHV0YyA9IFtcbiAgY3JlYXRlKCdzZWNvbmQnLCBkM190aW1lLnV0Y1NlY29uZCwgdXRjQmFzZURhdGUpLFxuICBjcmVhdGUoJ21pbnV0ZScsIGQzX3RpbWUudXRjTWludXRlLCB1dGNCYXNlRGF0ZSksXG4gIGNyZWF0ZSgnaG91cicsICAgZDNfdGltZS51dGNIb3VyLCAgIHV0Y0Jhc2VEYXRlKSxcbiAgY3JlYXRlKCdkYXknLCAgICBkM190aW1lLnV0Y0RheSwgICAgdXRjQmFzZURhdGUsIFsxLCA3XSksXG4gIGNyZWF0ZSgnbW9udGgnLCAgZDNfdGltZS51dGNNb250aCwgIHV0Y0Jhc2VEYXRlLCBbMSwgMywgNl0pLFxuICBjcmVhdGUoJ3llYXInLCAgIGQzX3RpbWUudXRjWWVhciwgICB1dGNCYXNlRGF0ZSksXG5cbiAgLy8gcGVyaW9kaWMgdW5pdHNcbiAgZW50cnkoJ3NlY29uZHMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDEsIDAsIDAsIGQpKTsgfSxcbiAgICBmdW5jdGlvbihkKSB7IHJldHVybiBkYXRlKGQpLmdldFVUQ1NlY29uZHMoKTsgfSxcbiAgICBudWxsLCAwLCA1OVxuICApLFxuICBlbnRyeSgnbWludXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDTWludXRlcygpOyB9LFxuICAgIG51bGwsIDAsIDU5XG4gICksXG4gIGVudHJ5KCdob3VycycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgMSwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDSG91cnMoKTsgfSxcbiAgICBudWxsLCAwLCAyM1xuICApLFxuICBlbnRyeSgnd2Vla2RheXMnLFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5NzAsIDAsIDQrZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF5KCk7IH0sXG4gICAgWzFdLCAwLCA2XG4gICksXG4gIGVudHJ5KCdkYXRlcycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgMCwgZCkpOyB9LFxuICAgIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRhdGUoZCkuZ2V0VVRDRGF0ZSgpOyB9LFxuICAgIFsxXSwgMSwgMzFcbiAgKSxcbiAgZW50cnkoJ21vbnRocycsXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk3MCwgZCAlIDEyLCAxKSk7IH0sXG4gICAgZnVuY3Rpb24oZCkgeyByZXR1cm4gZGF0ZShkKS5nZXRVVENNb250aCgpOyB9LFxuICAgIFsxXSwgMCwgMTFcbiAgKVxuXTtcblxudmFyIFNURVBTID0gW1xuICBbMzE1MzZlNiwgNV0sICAvLyAxLXllYXJcbiAgWzc3NzZlNiwgNF0sICAgLy8gMy1tb250aFxuICBbMjU5MmU2LCA0XSwgICAvLyAxLW1vbnRoXG4gIFsxMjA5NmU1LCAzXSwgIC8vIDItd2Vla1xuICBbNjA0OGU1LCAzXSwgICAvLyAxLXdlZWtcbiAgWzE3MjhlNSwgM10sICAgLy8gMi1kYXlcbiAgWzg2NGU1LCAzXSwgICAgLy8gMS1kYXlcbiAgWzQzMmU1LCAyXSwgICAgLy8gMTItaG91clxuICBbMjE2ZTUsIDJdLCAgICAvLyA2LWhvdXJcbiAgWzEwOGU1LCAyXSwgICAgLy8gMy1ob3VyXG4gIFszNmU1LCAyXSwgICAgIC8vIDEtaG91clxuICBbMThlNSwgMV0sICAgICAvLyAzMC1taW51dGVcbiAgWzllNSwgMV0sICAgICAgLy8gMTUtbWludXRlXG4gIFszZTUsIDFdLCAgICAgIC8vIDUtbWludXRlXG4gIFs2ZTQsIDFdLCAgICAgIC8vIDEtbWludXRlXG4gIFszZTQsIDBdLCAgICAgIC8vIDMwLXNlY29uZFxuICBbMTVlMywgMF0sICAgICAvLyAxNS1zZWNvbmRcbiAgWzVlMywgMF0sICAgICAgLy8gNS1zZWNvbmRcbiAgWzFlMywgMF0gICAgICAgLy8gMS1zZWNvbmRcbl07XG5cbmZ1bmN0aW9uIGZpbmQodW5pdHMsIHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgdmFyIHN0ZXAgPSBTVEVQU1swXSwgaSwgbiwgYmlucztcblxuICBmb3IgKGk9MSwgbj1TVEVQUy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgc3RlcCA9IFNURVBTW2ldO1xuICAgIGlmIChzcGFuID4gc3RlcFswXSkge1xuICAgICAgYmlucyA9IHNwYW4gLyBzdGVwWzBdO1xuICAgICAgaWYgKGJpbnMgPiBtYXhiKSB7XG4gICAgICAgIHJldHVybiB1bml0c1tTVEVQU1tpLTFdWzFdXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaW5zID49IG1pbmIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW3N0ZXBbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5pdHNbU1RFUFNbbi0xXVsxXV07XG59XG5cbmZ1bmN0aW9uIHRvVW5pdE1hcCh1bml0cykge1xuICB2YXIgbWFwID0ge30sIGksIG47XG4gIGZvciAoaT0wLCBuPXVuaXRzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICBtYXBbdW5pdHNbaV0udHlwZV0gPSB1bml0c1tpXTtcbiAgfVxuICBtYXAuZmluZCA9IGZ1bmN0aW9uKHNwYW4sIG1pbmIsIG1heGIpIHtcbiAgICByZXR1cm4gZmluZCh1bml0cywgc3BhbiwgbWluYiwgbWF4Yik7XG4gIH07XG4gIHJldHVybiBtYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Vbml0TWFwKGxvY2FsZSk7XG5tb2R1bGUuZXhwb3J0cy51dGMgPSB0b1VuaXRNYXAodXRjKTtcbiIsInZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKSxcbiAgICB0aW1lID0gcmVxdWlyZSgnLi90aW1lJyksXG4gICAgdXRjID0gdGltZS51dGM7XG5cbnZhciB1ID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gdXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIEZOQU1FID0gJ19fbmFtZV9fJztcblxudS5uYW1lZGZ1bmMgPSBmdW5jdGlvbihuYW1lLCBmKSB7IHJldHVybiAoZltGTkFNRV0gPSBuYW1lLCBmKTsgfTtcblxudS5uYW1lID0gZnVuY3Rpb24oZikgeyByZXR1cm4gZj09bnVsbCA/IG51bGwgOiBmW0ZOQU1FXTsgfTtcblxudS5pZGVudGl0eSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHg7IH07XG5cbnUudHJ1ZSA9IHUubmFtZWRmdW5jKCd0cnVlJywgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9KTtcblxudS5mYWxzZSA9IHUubmFtZWRmdW5jKCdmYWxzZScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuXG51LmR1cGxpY2F0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG5cbnUuZXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYik7XG59O1xuXG51LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKHZhciB4LCBuYW1lLCBpPTEsIGxlbj1hcmd1bWVudHMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgeCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKG5hbWUgaW4geCkgeyBvYmpbbmFtZV0gPSB4W25hbWVdOyB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbnUubGVuZ3RoID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHgubGVuZ3RoICE9IG51bGwgPyB4Lmxlbmd0aCA6IG51bGw7XG59O1xuXG51LmtleXMgPSBmdW5jdGlvbih4KSB7XG4gIHZhciBrZXlzID0gW10sIGs7XG4gIGZvciAoayBpbiB4KSBrZXlzLnB1c2goayk7XG4gIHJldHVybiBrZXlzO1xufTtcblxudS52YWxzID0gZnVuY3Rpb24oeCkge1xuICB2YXIgdmFscyA9IFtdLCBrO1xuICBmb3IgKGsgaW4geCkgdmFscy5wdXNoKHhba10pO1xuICByZXR1cm4gdmFscztcbn07XG5cbnUudG9NYXAgPSBmdW5jdGlvbihsaXN0LCBmKSB7XG4gIHJldHVybiAoZiA9IHUuJChmKSkgP1xuICAgIGxpc3QucmVkdWNlKGZ1bmN0aW9uKG9iaiwgeCkgeyByZXR1cm4gKG9ialtmKHgpXSA9IDEsIG9iaik7IH0sIHt9KSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24ob2JqLCB4KSB7IHJldHVybiAob2JqW3hdID0gMSwgb2JqKTsgfSwge30pO1xufTtcblxudS5rZXlzdHIgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgLy8gdXNlIHRvIGVuc3VyZSBjb25zaXN0ZW50IGtleSBnZW5lcmF0aW9uIGFjcm9zcyBtb2R1bGVzXG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgaWYgKCFuKSByZXR1cm4gJyc7XG4gIGZvciAodmFyIHM9U3RyaW5nKHZhbHVlc1swXSksIGk9MTsgaTxuOyArK2kpIHtcbiAgICBzICs9ICd8JyArIFN0cmluZyh2YWx1ZXNbaV0pO1xuICB9XG4gIHJldHVybiBzO1xufTtcblxuLy8gdHlwZSBjaGVja2luZyBmdW5jdGlvbnNcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudS5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbnUuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudS5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnUuaXNOdW1iZXIgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59O1xuXG51LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn07XG5cbnUuaXNEYXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnUuaXNWYWxpZCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmo7XG59O1xuXG51LmlzQnVmZmVyID0gKGJ1ZmZlci5CdWZmZXIgJiYgYnVmZmVyLkJ1ZmZlci5pc0J1ZmZlcikgfHwgdS5mYWxzZTtcblxuLy8gdHlwZSBjb2VyY2lvbiBmdW5jdGlvbnNcblxudS5udW1iZXIgPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogK3M7XG59O1xuXG51LmJvb2xlYW4gPSBmdW5jdGlvbihzKSB7XG4gIHJldHVybiBzID09IG51bGwgfHwgcyA9PT0gJycgPyBudWxsIDogcz09PSdmYWxzZScgPyBmYWxzZSA6ICEhcztcbn07XG5cbnUuZGF0ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMgPT0gbnVsbCB8fCBzID09PSAnJyA/IG51bGwgOiBEYXRlLnBhcnNlKHMpO1xufTtcblxudS5hcnJheSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCA/ICh1LmlzQXJyYXkoeCkgPyB4IDogW3hdKSA6IFtdO1xufTtcblxudS5zdHIgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB1LmlzQXJyYXkoeCkgPyAnWycgKyB4Lm1hcCh1LnN0cikgKyAnXSdcbiAgICA6IHUuaXNPYmplY3QoeCkgPyBKU09OLnN0cmluZ2lmeSh4KVxuICAgIDogdS5pc1N0cmluZyh4KSA/ICgnXFwnJyt1dGlsX2VzY2FwZV9zdHIoeCkrJ1xcJycpIDogeDtcbn07XG5cbnZhciBlc2NhcGVfc3RyX3JlID0gLyhefFteXFxcXF0pJy9nO1xuXG5mdW5jdGlvbiB1dGlsX2VzY2FwZV9zdHIoeCkge1xuICByZXR1cm4geC5yZXBsYWNlKGVzY2FwZV9zdHJfcmUsICckMVxcXFxcXCcnKTtcbn1cblxuLy8gZGF0YSBhY2Nlc3MgZnVuY3Rpb25zXG5cbnUuZmllbGQgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiBTdHJpbmcoZikuc3BsaXQoJ1xcXFwuJylcbiAgICAubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc3BsaXQoJy4nKTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmxlbmd0aCkgeyBhW2EubGVuZ3RoLTFdICs9ICcuJyArIGIuc2hpZnQoKTsgfVxuICAgICAgYS5wdXNoLmFwcGx5KGEsIGIpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwgW10pO1xufTtcblxudS5hY2Nlc3NvciA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHM7XG4gIHJldHVybiBmPT1udWxsIHx8IHUuaXNGdW5jdGlvbihmKSA/IGYgOlxuICAgIHUubmFtZWRmdW5jKGYsIChzID0gdS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBzLnJlZHVjZShmdW5jdGlvbih4LGYpIHsgcmV0dXJuIHhbZl07IH0sIHgpOyB9IDpcbiAgICAgIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHhbZl07IH1cbiAgICApO1xufTtcblxuLy8gc2hvcnQtY3V0IGZvciBhY2Nlc3NvclxudS4kID0gdS5hY2Nlc3NvcjtcblxudS5tdXRhdG9yID0gZnVuY3Rpb24oZikge1xuICB2YXIgcztcbiAgcmV0dXJuIHUuaXNTdHJpbmcoZikgJiYgKHM9dS5maWVsZChmKSkubGVuZ3RoID4gMSA/XG4gICAgZnVuY3Rpb24oeCwgdikge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHMubGVuZ3RoLTE7ICsraSkgeCA9IHhbc1tpXV07XG4gICAgICB4W3NbaV1dID0gdjtcbiAgICB9IDpcbiAgICBmdW5jdGlvbih4LCB2KSB7IHhbZl0gPSB2OyB9O1xufTtcblxuXG51LiRmdW5jID0gZnVuY3Rpb24obmFtZSwgb3ApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGYpIHtcbiAgICBmID0gdS4kKGYpIHx8IHUuaWRlbnRpdHk7XG4gICAgdmFyIG4gPSBuYW1lICsgKHUubmFtZShmKSA/ICdfJyt1Lm5hbWUoZikgOiAnJyk7XG4gICAgcmV0dXJuIHUubmFtZWRmdW5jKG4sIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIG9wKGYoZCkpOyB9KTtcbiAgfTtcbn07XG5cbnUuJHZhbGlkICA9IHUuJGZ1bmMoJ3ZhbGlkJywgdS5pc1ZhbGlkKTtcbnUuJGxlbmd0aCA9IHUuJGZ1bmMoJ2xlbmd0aCcsIHUubGVuZ3RoKTtcblxudS4kaW4gPSBmdW5jdGlvbihmLCB2YWx1ZXMpIHtcbiAgZiA9IHUuJChmKTtcbiAgdmFyIG1hcCA9IHUuaXNBcnJheSh2YWx1ZXMpID8gdS50b01hcCh2YWx1ZXMpIDogdmFsdWVzO1xuICByZXR1cm4gZnVuY3Rpb24oZCkgeyByZXR1cm4gISFtYXBbZihkKV07IH07XG59O1xuXG51LiR5ZWFyICAgPSB1LiRmdW5jKCd5ZWFyJywgdGltZS55ZWFyLnVuaXQpO1xudS4kbW9udGggID0gdS4kZnVuYygnbW9udGgnLCB0aW1lLm1vbnRocy51bml0KTtcbnUuJGRhdGUgICA9IHUuJGZ1bmMoJ2RhdGUnLCB0aW1lLmRhdGVzLnVuaXQpO1xudS4kZGF5ICAgID0gdS4kZnVuYygnZGF5JywgdGltZS53ZWVrZGF5cy51bml0KTtcbnUuJGhvdXIgICA9IHUuJGZ1bmMoJ2hvdXInLCB0aW1lLmhvdXJzLnVuaXQpO1xudS4kbWludXRlID0gdS4kZnVuYygnbWludXRlJywgdGltZS5taW51dGVzLnVuaXQpO1xudS4kc2Vjb25kID0gdS4kZnVuYygnc2Vjb25kJywgdGltZS5zZWNvbmRzLnVuaXQpO1xuXG51LiR1dGNZZWFyICAgPSB1LiRmdW5jKCd1dGNZZWFyJywgdXRjLnllYXIudW5pdCk7XG51LiR1dGNNb250aCAgPSB1LiRmdW5jKCd1dGNNb250aCcsIHV0Yy5tb250aHMudW5pdCk7XG51LiR1dGNEYXRlICAgPSB1LiRmdW5jKCd1dGNEYXRlJywgdXRjLmRhdGVzLnVuaXQpO1xudS4kdXRjRGF5ICAgID0gdS4kZnVuYygndXRjRGF5JywgdXRjLndlZWtkYXlzLnVuaXQpO1xudS4kdXRjSG91ciAgID0gdS4kZnVuYygndXRjSG91cicsIHV0Yy5ob3Vycy51bml0KTtcbnUuJHV0Y01pbnV0ZSA9IHUuJGZ1bmMoJ3V0Y01pbnV0ZScsIHV0Yy5taW51dGVzLnVuaXQpO1xudS4kdXRjU2Vjb25kID0gdS4kZnVuYygndXRjU2Vjb25kJywgdXRjLnNlY29uZHMudW5pdCk7XG5cbi8vIGNvbXBhcmlzb24gLyBzb3J0aW5nIGZ1bmN0aW9uc1xuXG51LmNvbXBhcmF0b3IgPSBmdW5jdGlvbihzb3J0KSB7XG4gIHZhciBzaWduID0gW107XG4gIGlmIChzb3J0ID09PSB1bmRlZmluZWQpIHNvcnQgPSBbXTtcbiAgc29ydCA9IHUuYXJyYXkoc29ydCkubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIgcyA9IDE7XG4gICAgaWYgICAgICAoZlswXSA9PT0gJy0nKSB7IHMgPSAtMTsgZiA9IGYuc2xpY2UoMSk7IH1cbiAgICBlbHNlIGlmIChmWzBdID09PSAnKycpIHsgcyA9ICsxOyBmID0gZi5zbGljZSgxKTsgfVxuICAgIHNpZ24ucHVzaChzKTtcbiAgICByZXR1cm4gdS5hY2Nlc3NvcihmKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihhLGIpIHtcbiAgICB2YXIgaSwgbiwgZiwgeCwgeTtcbiAgICBmb3IgKGk9MCwgbj1zb3J0Lmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIGYgPSBzb3J0W2ldOyB4ID0gZihhKTsgeSA9IGYoYik7XG4gICAgICBpZiAoeCA8IHkpIHJldHVybiAtMSAqIHNpZ25baV07XG4gICAgICBpZiAoeCA+IHkpIHJldHVybiBzaWduW2ldO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn07XG5cbnUuY21wID0gZnVuY3Rpb24oYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChhID49IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmIChhID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gTmFOO1xufTtcblxudS5udW1jbXAgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcblxudS5zdGFibGVzb3J0ID0gZnVuY3Rpb24oYXJyYXksIHNvcnRCeSwga2V5Rm4pIHtcbiAgdmFyIGluZGljZXMgPSBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oaWR4LCB2LCBpKSB7XG4gICAgcmV0dXJuIChpZHhba2V5Rm4odildID0gaSwgaWR4KTtcbiAgfSwge30pO1xuXG4gIGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzYSA9IHNvcnRCeShhKSxcbiAgICAgICAgc2IgPSBzb3J0QnkoYik7XG4gICAgcmV0dXJuIHNhIDwgc2IgPyAtMSA6IHNhID4gc2IgPyAxXG4gICAgICAgICA6IChpbmRpY2VzW2tleUZuKGEpXSAtIGluZGljZXNba2V5Rm4oYildKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4vLyBzdHJpbmcgZnVuY3Rpb25zXG5cbnUucGFkID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHBhZGNoYXIpIHtcbiAgcGFkY2hhciA9IHBhZGNoYXIgfHwgXCIgXCI7XG4gIHZhciBkID0gbGVuZ3RoIC0gcy5sZW5ndGg7XG4gIGlmIChkIDw9IDApIHJldHVybiBzO1xuICBzd2l0Y2ggKHBvcykge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIHN0cnJlcChkLCBwYWRjaGFyKSArIHM7XG4gICAgY2FzZSAnbWlkZGxlJzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIHN0cnJlcChNYXRoLmZsb29yKGQvMiksIHBhZGNoYXIpICtcbiAgICAgICAgIHMgKyBzdHJyZXAoTWF0aC5jZWlsKGQvMiksIHBhZGNoYXIpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcyArIHN0cnJlcChkLCBwYWRjaGFyKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc3RycmVwKG4sIHN0cikge1xuICB2YXIgcyA9IFwiXCIsIGk7XG4gIGZvciAoaT0wOyBpPG47ICsraSkgcyArPSBzdHI7XG4gIHJldHVybiBzO1xufVxuXG51LnRydW5jYXRlID0gZnVuY3Rpb24ocywgbGVuZ3RoLCBwb3MsIHdvcmQsIGVsbGlwc2lzKSB7XG4gIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgaWYgKGxlbiA8PSBsZW5ndGgpIHJldHVybiBzO1xuICBlbGxpcHNpcyA9IGVsbGlwc2lzICE9PSB1bmRlZmluZWQgPyBTdHJpbmcoZWxsaXBzaXMpIDogJ1xcdTIwMjYnO1xuICB2YXIgbCA9IE1hdGgubWF4KDAsIGxlbmd0aCAtIGVsbGlwc2lzLmxlbmd0aCk7XG5cbiAgc3dpdGNoIChwb3MpIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsLDEpIDogcy5zbGljZShsZW4tbCkpO1xuICAgIGNhc2UgJ21pZGRsZSc6XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHZhciBsMSA9IE1hdGguY2VpbChsLzIpLCBsMiA9IE1hdGguZmxvb3IobC8yKTtcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbDEpIDogcy5zbGljZSgwLGwxKSkgK1xuICAgICAgICBlbGxpcHNpcyArICh3b3JkID8gdHJ1bmNhdGVPbldvcmQocyxsMiwxKSA6IHMuc2xpY2UobGVuLWwyKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAod29yZCA/IHRydW5jYXRlT25Xb3JkKHMsbCkgOiBzLnNsaWNlKDAsbCkpICsgZWxsaXBzaXM7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHRydW5jYXRlT25Xb3JkKHMsIGxlbiwgcmV2KSB7XG4gIHZhciBjbnQgPSAwLCB0b2sgPSBzLnNwbGl0KHRydW5jYXRlX3dvcmRfcmUpO1xuICBpZiAocmV2KSB7XG4gICAgcyA9ICh0b2sgPSB0b2sucmV2ZXJzZSgpKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbih3KSB7IGNudCArPSB3Lmxlbmd0aDsgcmV0dXJuIGNudCA8PSBsZW47IH0pXG4gICAgICAucmV2ZXJzZSgpO1xuICB9IGVsc2Uge1xuICAgIHMgPSB0b2suZmlsdGVyKGZ1bmN0aW9uKHcpIHsgY250ICs9IHcubGVuZ3RoOyByZXR1cm4gY250IDw9IGxlbjsgfSk7XG4gIH1cbiAgcmV0dXJuIHMubGVuZ3RoID8gcy5qb2luKCcnKS50cmltKCkgOiB0b2tbMF0uc2xpY2UoMCwgbGVuKTtcbn1cblxudmFyIHRydW5jYXRlX3dvcmRfcmUgPSAvKFtcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MjAyOFxcdTIwMjlcXHUzMDAwXFx1RkVGRl0pLztcbiJdfQ==
