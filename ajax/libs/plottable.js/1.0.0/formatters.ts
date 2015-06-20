///<reference path="../reference.ts" />

module Plottable {

export type Formatter = (d: any) => string;

export var MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export module Formatters {

  interface TimeFilterFormat {
    format: string;
    filter: (d: any) => any;
  }

  /**
   * Creates a formatter for currency values.
   *
   * @param {number} [precision] The number of decimal places to show (default 2).
   * @param {string} [symbol] The currency symbol to use (default "$").
   * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
   * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
   *
   * @returns {Formatter} A formatter for currency values.
   */
  export function currency(precision = 2, symbol = "$", prefix = true) {
    var fixedFormatter = Formatters.fixed(precision);
    return (d: any) => {
      var formattedValue = fixedFormatter(Math.abs(d));
      if (formattedValue !== "") {
        if (prefix) {
          formattedValue = symbol + formattedValue;
        } else {
          formattedValue += symbol;
        }

        if (d < 0) {
          formattedValue = "-" + formattedValue;
        }
      }
      return formattedValue;
    };
  }

  /**
   * Creates a formatter that displays exactly [precision] decimal places.
   *
   * @param {number} [precision] The number of decimal places to show (default 3).
   * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
   *
   * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
   */
  export function fixed(precision = 3) {
    verifyPrecision(precision);
    return (d: any) => (<number> d).toFixed(precision);
  }

  /**
   * Creates a formatter that formats numbers to show no more than
   * [precision] decimal places. All other values are stringified.
   *
   * @param {number} [precision] The number of decimal places to show (default 3).
   * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
   *
   * @returns {Formatter} A formatter for general values.
   */
  export function general(precision = 3) {
    verifyPrecision(precision);
    return (d: any) => {
      if (typeof d === "number") {
        var multiplier = Math.pow(10, precision);
        return String(Math.round(d * multiplier) / multiplier);
      } else {
        return String(d);
      }
    };
  }

  /**
   * Creates a formatter that stringifies its input.
   *
   * @returns {Formatter} A formatter that stringifies its input.
   */
  export function identity() {
    return (d: any) => String(d);
  }

  /**
   * Creates a formatter for percentage values.
   * Multiplies the input by 100 and appends "%".
   *
   * @param {number} [precision] The number of decimal places to show (default 0).
   * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
   *
   * @returns {Formatter} A formatter for percentage values.
   */
  export function percentage(precision = 0) {
    var fixedFormatter = Formatters.fixed(precision);
    return (d: any) => {
      var valToFormat = d * 100;

      // Account for float imprecision
      var valString = d.toString();
      var integerPowerTen = Math.pow(10, valString.length - (valString.indexOf(".") + 1));
      valToFormat = parseInt((valToFormat * integerPowerTen).toString(), 10) / integerPowerTen;

      return fixedFormatter(valToFormat) + "%";
    };
  }

  /**
   * Creates a formatter for values that displays [precision] significant figures
   * and puts SI notation.
   *
   * @param {number} [precision] The number of significant figures to show (default 3).
   *
   * @returns {Formatter} A formatter for SI values.
   */
  export function siSuffix(precision = 3) {
    verifyPrecision(precision);
    return (d: any) => d3.format("." + precision + "s")(d);
  }

  /**
   * Creates a multi time formatter that displays dates.
   *
   * @returns {Formatter} A formatter for time/date values.
   */
  export function multiTime() {

    var numFormats = 8;

    // these defaults were taken from d3
    // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
    var timeFormat: { [index: number]: TimeFilterFormat } = {};

    timeFormat[0] = {
      format: ".%L",
      filter: (d: any) => d.getMilliseconds() !== 0
    };
    timeFormat[1] = {
      format: ":%S",
      filter: (d: any) => d.getSeconds() !== 0
    };
    timeFormat[2] = {
      format: "%I:%M",
      filter: (d: any) => d.getMinutes() !== 0
    };
    timeFormat[3] = {
      format: "%I %p",
      filter: (d: any) => d.getHours() !== 0
    };
    timeFormat[4] = {
      format: "%a %d",
      filter: (d: any) => d.getDay() !== 0 && d.getDate() !== 1
    };
    timeFormat[5] = {
      format: "%b %d",
      filter: (d: any) => d.getDate() !== 1
    };
    timeFormat[6] = {
      format: "%b",
      filter: (d: any) => d.getMonth() !== 0
    };
    timeFormat[7] = {
      format: "%Y",
      filter: () => true
    };

    return (d: any) => {
      for (var i = 0; i < numFormats; i++) {
        if (timeFormat[i].filter(d)) {
          return d3.time.format(timeFormat[i].format)(d);
        }
      }
    };
  }

  /**
   * Creates a time formatter that displays time/date using given specifier.
   *
   * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
   *
   * @param {string} [specifier] The specifier for the formatter.
   *
   * @returns {Formatter} A formatter for time/date values.
   */
  export function time(specifier: string): Formatter {
    return d3.time.format(specifier);
  }

  /**
   * Creates a formatter for relative dates.
   *
   * @param {number} baseValue The start date (as epoch time) used in computing relative dates (default 0)
   * @param {number} increment The unit used in calculating relative date values (default MILLISECONDS_IN_ONE_DAY)
   * @param {string} label The label to append to the formatted string (default "")
   *
   * @returns {Formatter} A formatter for time/date values.
   */
  export function relativeDate(baseValue: number = 0, increment: number = MILLISECONDS_IN_ONE_DAY, label: string = "") {
    return (d: any) => {
      var relativeDate = Math.round((d.valueOf() - baseValue) / increment);
      return relativeDate.toString() + label;
    };
  }

  function verifyPrecision(precision: number) {
    if (precision < 0 || precision > 20) {
      throw new RangeError("Formatter precision must be between 0 and 20");
    }
  }

}
}
