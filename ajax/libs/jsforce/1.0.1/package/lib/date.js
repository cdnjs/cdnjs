var _ = require("underscore")._;

/**
 * A date object to keep Salesforce date literal
 *
 * @class
 * @constructor
 * @see http://www.salesforce.com/us/developer/docs/soql_sosl/Content/sforce_api_calls_soql_select_dateformats.htm
 */
var SfDate = module.exports = function(literal) {
  this._literal = literal;
};

/**
 * Returns literal when converted to string
 *
 * @override
 */
SfDate.prototype.toString =
SfDate.prototype.toJSON = function() { return this._literal; };


/** @private **/
function zeropad(n) { return (n<10 ? "0" : "") + n; }

/**
 * Convert JavaScript date object to ISO8601 Date format (e.g. 2012-10-31)
 *
 * @param {String|Number|Date} date - Input date
 * @returns {SfDate} - Salesforce date literal with ISO8601 date format
 */
SfDate.toDateLiteral = function(date) {
  if (_.isNumber(date)) {
    date = new Date(date);
  } else if (_.isString(date)) {
    date = SfDate.parseDate(date);
  }
  var yy = date.getFullYear();
  var mm = date.getMonth()+1;
  var dd = date.getDate();
  var dstr = [ yy, zeropad(mm), zeropad(dd) ].join("-");
  return new SfDate(dstr);
};

/**
 * Convert JavaScript date object to ISO8601 DateTime format
 * (e.g. 2012-10-31T12:34:56Z)
 *
 * @param {String|Number|Date} date - Input date
 * @returns {SfDate} - Salesforce date literal with ISO8601 datetime format
 */
SfDate.toDateTimeLiteral = function(date) {
  if (_.isNumber(date)) {
    date = new Date(date);
  } else if (_.isString(date)) {
    date = SfDate.parseDate(date);
  }
  var yy = date.getUTCFullYear();
  var mm = date.getUTCMonth()+1;
  var dd = date.getUTCDate();
  var hh = date.getUTCHours();
  var mi = date.getUTCMinutes();
  var ss = date.getUTCSeconds();
  var dtstr =
    [ yy, zeropad(mm), zeropad(dd) ].join("-") + "T" +
    [ zeropad(hh), zeropad(mi), zeropad(ss) ].join(":") + "Z";
  return new SfDate(dtstr);
};

/**
 * Parse IS08601 date(time) formatted string and return date instance
 *
 * @param {String} str
 * @returns {Date}
 */
SfDate.parseDate = function(str) {
  var d = new Date();
  var regexp = /^([\d]{4})-?([\d]{2})-?([\d]{2})(T([\d]{2}):?([\d]{2}):?([\d]{2})(.([\d]{3}))?(Z|([\+\-])([\d]{2}):?([\d]{2})))?$/;
  var m = str.match(regexp);
  if (m) {
    d = new Date(0);
    if (!m[4]) {
      d.setFullYear(parseInt(m[1], 10));
      d.setDate(parseInt(m[3], 10));
      d.setMonth(parseInt(m[2], 10) - 1);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    } else {
      d.setUTCFullYear(parseInt(m[1], 10));
      d.setUTCDate(parseInt(m[3], 10));
      d.setUTCMonth(parseInt(m[2], 10) - 1);
      d.setUTCHours(parseInt(m[5], 10));
      d.setUTCMinutes(parseInt(m[6], 10));
      d.setUTCSeconds(parseInt(m[7], 10));
      d.setUTCMilliseconds(parseInt(m[9] || '0', 10));
      if (m[10] && m[10] !== 'Z') {
        var offset = parseInt(m[12],10) * 60 + parseInt(m[13], 10);
        d.setTime((m[11] === '+' ? -1 : 1) * offset * 60 * 1000 +d.getTime());
      }
    }
    return d;
  } else {
    throw new Error("Invalid date format is specified : " + str);
  }
};

/*
 * Pre-defined Salesforce Date Literals
 */
var SfDateLiterals = {
  YESTERDAY: 1,
  TODAY: 1,
  TOMORROW: 1,
  LAST_WEEK: 1,
  THIS_WEEK: 1,
  NEXT_WEEK: 1,
  LAST_MONTH: 1,
  THIS_MONTH: 1,
  NEXT_MONTH: 1,
  LAST_90_DAYS: 1,
  NEXT_90_DAYS: 1,
  LAST_N_DAYS: 2,
  NEXT_N_DAYS: 2,
  THIS_QUARTER: 1,
  LAST_QUARTER: 1,
  NEXT_QUARTER: 1,
  NEXT_N_QUARTERS: 2,
  LAST_N_QUARTERS: 2,
  THIS_YEAR: 1,
  LAST_YEAR: 1,
  NEXT_YEAR: 1,
  NEXT_N_YEARS: 2,
  LAST_N_YEARS: 2,
  THIS_FISCAL_QUARTER: 1,
  LAST_FISCAL_QUARTER: 1,
  NEXT_FISCAL_QUARTER: 1,
  NEXT_N_FISCAL_QUARTERS:2,
  LAST_N_FISCAL_QUARTERS:2,
  THIS_FISCAL_YEAR:1,
  LAST_FISCAL_YEAR:1,
  NEXT_FISCAL_YEAR:1,
  NEXT_N_FISCAL_YEARS: 2,
  LAST_N_FISCAL_YEARS: 2
};

for (var literal in SfDateLiterals) {
  var type = SfDateLiterals[literal];
  SfDate[literal] =
   type === 1 ? new SfDate(literal) : createLiteralBuilder(literal);
}

/** @private **/
function createLiteralBuilder(literal) {
  return function(num) { return new SfDate(literal + ":" + num); };
}
