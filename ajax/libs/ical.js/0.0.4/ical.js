/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */

if (typeof ICAL === 'undefined') {
  if (typeof exports === 'object') {
    // CommonJS
    ICAL = exports;
  } else if (typeof window !== 'undefined') {
    // Browser globals
    this.ICAL = {};
  } else {
    // ...?
    ICAL = {};
  }
}

ICAL.foldLength = 75;
ICAL.newLineChar = '\r\n';

/**
 * Helper functions used in various places within ical.js
 */
ICAL.helpers = {
  initState: function initState(aLine, aLineNr) {
    return {
      buffer: aLine,
      line: aLine,
      lineNr: aLineNr,
      character: 0,
      currentData: null,
      parentData: []
    };
  },

  initComponentData: function initComponentData(aName) {
    return {
      name: aName,
      type: "COMPONENT",
      value: []
    };
  },

  /**
   * Checks if the given number is NaN
   */
  isStrictlyNaN: function(number) {
    return typeof(number) === 'number' && isNaN(number);
  },

  /**
   * Parses a string value that is expected to be an
   * integer, when the valid is not an integer throws
   * a decoration error.
   *
   * @param {String} string raw input.
   * @return {Number} integer.
   */
  strictParseInt: function(string) {
    var result = parseInt(string, 10);

    if (ICAL.helpers.isStrictlyNaN(result)) {
      throw new Error(
        'Could not extract integer from "' + string + '"'
      );
    }

    return result;
  },

  /**
   * Creates or returns a class instance
   * of a given type with the initialization
   * data if the data is not already an instance
   * of the given type.
   *
   *
   * Example:
   *
   *    var time = new ICAL.Time(...);
   *    var result = ICAL.helpers.formatClassType(time, ICAL.Time);
   *
   *    (result instanceof ICAL.Time)
   *    // => true
   *
   *    result = ICAL.helpers.formatClassType({}, ICAL.Time);
   *    (result isntanceof ICAL.Time)
   *    // => true
   *
   *
   * @param {Object} data object initialization data.
   * @param {Object} type object type (like ICAL.Time).
   */
  formatClassType: function formatClassType(data, type) {
    if (typeof(data) === 'undefined')
      return undefined;

    if (data instanceof type) {
      return data;
    }
    return new type(data);
  },

  /**
   * Identical to index of but will only match values
   * when they are not preceded by a backslash char \\\
   *
   * @param {String} buffer string value.
   * @param {String} search value.
   * @param {Numeric} pos start position.
   */
  unescapedIndexOf: function(buffer, search, pos) {
    while ((pos = buffer.indexOf(search, pos)) !== -1) {
      if (pos > 0 && buffer[pos - 1] === '\\') {
        pos += 1;
      } else {
        return pos;
      }
    }
    return -1;
  },

  binsearchInsert: function(list, seekVal, cmpfunc) {
    if (!list.length)
      return 0;

    var low = 0, high = list.length - 1,
        mid, cmpval;

    while (low <= high) {
      mid = low + Math.floor((high - low) / 2);
      cmpval = cmpfunc(seekVal, list[mid]);

      if (cmpval < 0)
        high = mid - 1;
      else if (cmpval > 0)
        low = mid + 1;
      else
        break;
    }

    if (cmpval < 0)
      return mid; // insertion is displacing, so use mid outright.
    else if (cmpval > 0)
      return mid + 1;
    else
      return mid;
  },

  dumpn: function() {
    if (!ICAL.debug) {
      return null;
    }

    if (typeof (console) !== 'undefined' && 'log' in console) {
      ICAL.helpers.dumpn = function consoleDumpn(input) {
        return console.log(input);
      }
    } else {
      ICAL.helpers.dumpn = function geckoDumpn(input) {
        dump(input + '\n');
      }
    }

    return ICAL.helpers.dumpn(arguments[0]);
  },

  mixin: function(obj, data) {
    if (data) {
      for (var k in data) {
        obj[k] = data[k];
      }
    }
    return obj;
  },

  isArray: function(o) {
    return o && (o instanceof Array || typeof o == "array");
  },

  clone: function(aSrc, aDeep) {
    if (!aSrc || typeof aSrc != "object") {
      return aSrc;
    } else if (aSrc instanceof Date) {
      return new Date(aSrc.getTime());
    } else if ("clone" in aSrc) {
      return aSrc.clone();
    } else if (ICAL.helpers.isArray(aSrc)) {
      var result = [];
      for (var i = 0; i < aSrc.length; i++) {
        result.push(aDeep ? ICAL.helpers.clone(aSrc[i], true) : aSrc[i]);
      }
      return result;
    } else {
      var result = {};
      for (var name in aSrc) {
        // uses prototype method to allow use of Object.create(null);
        if (Object.prototype.hasOwnProperty.call(aSrc, name)) {
          if (aDeep) {
            result[name] = ICAL.helpers.clone(aSrc[name], true);
          } else {
            result[name] = aSrc[name];
          }
        }
      }
      return result;
    }
  },

  unfoldline: function unfoldline(aState) {
    // Section 3.1
    // if the line ends with a CRLF
    // and the next line starts with a LINEAR WHITESPACE (space, htab, ...)

    // then remove the CRLF and the whitespace to unsplit the line
    var moreLines = true;
    var line = "";

    while (moreLines) {
      moreLines = false;
      var pos = aState.buffer.search(/\r?\n/);
      if (pos > -1) {
        var len = (aState.buffer[pos] == "\r" ? 2 : 1);
        var nextChar = aState.buffer.substr(pos + len, 1);
        if (nextChar.match(/^[ \t]$/)) {
          moreLines = true;
          line += aState.buffer.substr(0, pos);
          aState.buffer = aState.buffer.substr(pos + len + 1);
        } else {
          // We're at the end of the line, copy the found chunk
          line += aState.buffer.substr(0, pos);
          aState.buffer = aState.buffer.substr(pos + len);
        }
      } else {
        line += aState.buffer;
        aState.buffer = "";
      }
    }
    return line;
  },

  foldline: function foldline(aLine) {
    var result = "";
    var line = aLine || "";

    while (line.length) {
      result += ICAL.newLineChar + " " + line.substr(0, ICAL.foldLength);
      line = line.substr(ICAL.foldLength);
    }
    return result.substr(ICAL.newLineChar.length + 1);
  },

  ensureKeyExists: function(obj, key, defvalue) {
    if (!(key in obj)) {
      obj[key] = defvalue;
    }
  },

  hasKey: function(obj, key) {
    return (obj && key in obj && obj[key]);
  },

  pad2: function pad(data) {
    if (typeof(data) !== 'string') {
      // handle fractions.
      if (typeof(data) === 'number') {
        data = parseInt(data);
      }
      data = String(data);
    }

    var len = data.length;

    switch (len) {
      case 0:
        return '00';
      case 1:
        return '0' + data;
      default:
        return data;
    }
  },

  trunc: function trunc(number) {
    return (number < 0 ? Math.ceil(number) : Math.floor(number));
  }
};
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */

(typeof(ICAL) === 'undefined')? ICAL = {} : '';

ICAL.design = (function() {
  'use strict';

  var ICAL_NEWLINE = /\\\\|\\;|\\,|\\[Nn]/g;

  function DecorationError() {
    Error.apply(this, arguments);
  }

  DecorationError.prototype = {
    __proto__: Error.prototype
  };

  function replaceNewlineReplace(string) {
    switch (string) {
      case "\\\\":
        return "\\";
      case "\\;":
        return ";";
      case "\\,":
        return ",";
      case "\\n":
      case "\\N":
        return "\n";
      default:
        return string;
    }
  }

  function replaceNewline(value) {
    // avoid regex when possible.
    if (value.indexOf('\\') === -1) {
      return value;
    }

    return value.replace(ICAL_NEWLINE, replaceNewlineReplace);
  }

  /**
   * Changes the format of the UNTIl part in the RECUR
   * value type. When no UNTIL part is found the original
   * is returned untouched.
   *
   * @param {String} type toICAL or fromICAL.
   * @param {String} aValue the value to check.
   * @return {String} upgraded/original value.
   */
  function recurReplaceUntil(aType, aValue) {
    var idx = aValue.indexOf('UNTIL=');
    if (idx === -1) {
      return aValue;
    }

    idx += 6;

    // everything before the value
    var begin = aValue.substr(0, idx);

    // everything after the value
    var end;

    // current until value
    var until;

    // end of value could be -1 meaning this is the last param.
    var endValueIdx = aValue.indexOf(';', idx);

    if (endValueIdx === -1) {
      end = '';
      until = aValue.substr(idx);
    } else {
      end = aValue.substr(endValueIdx);
      until = aValue.substr(idx, endValueIdx - idx);
    }

    if (until.length > 10) {
      until = design.value['date-time'][aType](until);
    } else {
      until = design.value.date[aType](until);
    }

    return begin + until + end;
  }
  /**
   * Design data used by the parser to decide if data is semantically correct
   */
  var design = {
    DecorationError: DecorationError,

    defaultType: 'text',

    param: {
      // Although the syntax is DQUOTE uri DQUOTE, I don't think we should
      // enfoce anything aside from it being a valid content line.
      // "ALTREP": { ... },

      // CN just wants a param-value
      // "CN": { ... }

      "cutype": {
        values: ["INDIVIDUAL", "GROUP", "RESOURCE", "ROOM", "UNKNOWN"],
        allowXName: true,
        allowIanaToken: true
      },

      "delegated-from": {
        valueType: "cal-address",
        multiValue: ","
      },
      "delegated-to": {
        valueType: "cal-address",
        multiValue: ","
      },
      // "DIR": { ... }, // See ALTREP
      "encoding": {
        values: ["8BIT", "BASE64"]
      },
      // "FMTTYPE": { ... }, // See ALTREP
      "fbtype": {
        values: ["FREE", "BUSY", "BUSY-UNAVAILABLE", "BUSY-TENTATIVE"],
        allowXName: true,
        allowIanaToken: true
      },
      // "LANGUAGE": { ... }, // See ALTREP
      "member": {
        valueType: "cal-address",
        multiValue: ","
      },
      "partstat": {
        // TODO These values are actually different per-component
        values: ["NEEDS-ACTION", "ACCEPTED", "DECLINED", "TENTATIVE",
                 "DELEGATED", "COMPLETED", "IN-PROCESS"],
        allowXName: true,
        allowIanaToken: true
      },
      "range": {
        values: ["THISLANDFUTURE"]
      },
      "related": {
        values: ["START", "END"]
      },
      "reltype": {
        values: ["PARENT", "CHILD", "SIBLING"],
        allowXName: true,
        allowIanaToken: true
      },
      "role": {
        values: ["REQ-PARTICIPANT", "CHAIR",
                 "OPT-PARTICIPANT", "NON-PARTICIPANT"],
        allowXName: true,
        allowIanaToken: true
      },
      "rsvp": {
        valueType: "boolean"
      },
      "sent-by": {
        valueType: "cal-address"
      },
      "tzid": {
        matches: /^\//
      },
      "value": {
        // since the value here is a 'type' lowercase is used.
        values: ["binary", "boolean", "cal-address", "date", "date-time",
                 "duration", "float", "integer", "period", "recur", "text",
                 "time", "uri", "utc-offset"],
        allowXName: true,
        allowIanaToken: true
      }
    },

    // When adding a value here, be sure to add it to the parameter types!
    value: {

      "binary": {
        decorate: function(aString) {
          return ICAL.Binary.fromString(aString);
        },

        undecorate: function(aBinary) {
          return aBinary.toString();
        }
      },
      "boolean": {
        values: ["TRUE", "FALSE"],

        fromICAL: function(aValue) {
          switch(aValue) {
            case 'TRUE':
              return true;
            case 'FALSE':
              return false;
            default:
              //TODO: parser warning
              return false;
          }
        },

        toICAL: function(aValue) {
          if (aValue) {
            return 'TRUE';
          }
          return 'FALSE';
        }

      },
      "cal-address": {
        // needs to be an uri
      },
      "date": {
        decorate: function(aValue, aProp) {
          return ICAL.Time.fromDateString(aValue, aProp);
        },

        /**
         * undecorates a time object.
         */
        undecorate: function(aValue) {
          return aValue.toString();
        },

        fromICAL: function(aValue) {
          // from: 20120901
          // to: 2012-09-01
          var result = aValue.substr(0, 4) + '-' +
                       aValue.substr(4, 2) + '-' +
                       aValue.substr(6, 2);

          if (aValue[8] === 'Z') {
            result += 'Z';
          }

          return result;
        },

        toICAL: function(aValue) {
          // from: 2012-09-01
          // to: 20120901

          if (aValue.length > 11) {
            //TODO: serialize warning?
            return aValue;
          }

          var result = aValue.substr(0, 4) +
                       aValue.substr(5, 2) +
                       aValue.substr(8, 2);

          if (aValue[10] === 'Z') {
            result += 'Z';
          }

          return result;
        }
      },
      "date-time": {
        fromICAL: function(aValue) {
          // from: 20120901T130000
          // to: 2012-09-01T13:00:00
          var result = aValue.substr(0, 4) + '-' +
                       aValue.substr(4, 2) + '-' +
                       aValue.substr(6, 2) + 'T' +
                       aValue.substr(9, 2) + ':' +
                       aValue.substr(11, 2) + ':' +
                       aValue.substr(13, 2);

          if (aValue[15] === 'Z') {
            result += 'Z'
          }

          return result;
        },

        toICAL: function(aValue) {
          // from: 2012-09-01T13:00:00
          // to: 20120901T130000

          if (aValue.length < 19) {
            // TODO: error
            return aValue;
          }

          var result = aValue.substr(0, 4) +
                       aValue.substr(5, 2) +
                       // grab the (DDTHH) segment
                       aValue.substr(8, 5) +
                       // MM
                       aValue.substr(14, 2) +
                       // SS
                       aValue.substr(17, 2);

          if (aValue[19] === 'Z') {
            result += 'Z';
          }

          return result;
        },

        decorate: function(aValue, aProp) {
          return ICAL.Time.fromDateTimeString(aValue, aProp);
        },

        undecorate: function(aValue) {
          return aValue.toString();
        }
      },
      duration: {
        decorate: function(aValue) {
          return ICAL.Duration.fromString(aValue);
        },
        undecorate: function(aValue) {
          return aValue.toString();
        }
      },
      float: {
        matches: /^[+-]?\d+\.\d+$/,
        decorate: function(aValue) {
          return ICAL.Value.fromString(aValue, "float");
        },

        fromICAL: function(aValue) {
          var parsed = parseFloat(aValue);
          if (ICAL.helpers.isStrictlyNaN(parsed)) {
            // TODO: parser warning
            return 0.0;
          }
          return parsed;
        },

        toICAL: function(aValue) {
          return String(aValue);
        }
      },
      integer: {
        fromICAL: function(aValue) {
          var parsed = parseInt(aValue);
          if (ICAL.helpers.isStrictlyNaN(parsed)) {
            return 0;
          }
          return parsed;
        },

        toICAL: function(aValue) {
          return String(aValue);
        }
      },
      period: {

        fromICAL: function(string) {
          var parts = string.split('/');
          var result = design.value['date-time'].fromICAL(parts[0]) + '/';

          if (ICAL.Duration.isValueString(parts[1])) {
            result += parts[1];
          } else {
            result += design.value['date-time'].fromICAL(parts[1]);
          }

          return result;
        },

        toICAL: function(string) {
          var parts = string.split('/');
          var result = design.value['date-time'].toICAL(parts[0]) + '/';

          if (ICAL.Duration.isValueString(parts[1])) {
            result += parts[1];
          } else {
            result += design.value['date-time'].toICAL(parts[1]);
          }

          return result;
        },

        decorate: function(aValue, aProp) {
          return ICAL.Period.fromString(aValue, aProp);
        },

        undecorate: function(aValue) {
          return aValue.toString();
        }
      },
      recur: {
        fromICAL: recurReplaceUntil.bind(this, 'fromICAL'),
        toICAL: recurReplaceUntil.bind(this, 'toICAL'),

        decorate: function decorate(aValue) {
          return ICAL.Recur.fromString(aValue);
        },

        undecorate: function(aRecur) {
          return aRecur.toString();
        }
      },

      text: {
        matches: /.*/,

        fromICAL: function(aValue, aName) {
          return replaceNewline(aValue);
        },

        toICAL: function escape(aValue, aName) {
          return aValue.replace(/\\|;|,|\n/g, function(str) {
            switch (str) {
            case "\\":
              return "\\\\";
            case ";":
              return "\\;";
            case ",":
              return "\\,";
            case "\n":
              return "\\n";
            default:
              return str;
            }
          });
        }
      },

      time: {
        fromICAL: function(aValue) {
          // from: MMHHSS(Z)?
          // to: HH:MM:SS(Z)?
          if (aValue.length < 6) {
            // TODO: parser exception?
            return aValue;
          }

          // HH::MM::SSZ?
          var result = aValue.substr(0, 2) + ':' +
                       aValue.substr(2, 2) + ':' +
                       aValue.substr(4, 2);

          if (aValue[6] === 'Z') {
            result += 'Z';
          }

          return result;
        },

        toICAL: function(aValue) {
          // from: HH:MM:SS(Z)?
          // to: MMHHSS(Z)?
          if (aValue.length < 8) {
            //TODO: error
            return aValue;
          }

          var result = aValue.substr(0, 2) +
                       aValue.substr(3, 2) +
                       aValue.substr(6, 2);

          if (aValue[8] === 'Z') {
            result += 'Z';
          }

          return result;
        }
      },

      uri: {
        // TODO
        /* ... */
      },

      "utc-offset": {
        toICAL: function(aValue) {
          if (aValue.length < 7) {
            // no seconds
            // -0500
            return aValue.substr(0, 3) +
                   aValue.substr(4, 2);
          } else {
            // seconds
            // -050000
            return aValue.substr(0, 3) +
                   aValue.substr(4, 2) +
                   aValue.substr(7, 2);
          }
        },

        fromICAL: function(aValue) {
          if (aValue.length < 6) {
            // no seconds
            // -05:00
            return aValue.substr(0, 3) + ':' +
                   aValue.substr(3, 2);
          } else {
            // seconds
            // -05:00:00
            return aValue.substr(0, 3) + ':' +
                   aValue.substr(3, 2) + ':' +
                   aValue.substr(5, 2);
          }
        },

        decorate: function(aValue) {
          return ICAL.UtcOffset.fromString(aValue);
        },

        undecorate: function(aValue) {
          return aValue.toString();
        }
      }
    },

    property: {
      decorate: function decorate(aData, aParent) {
        return new ICAL.Property(aData, aParent);
      },
      "attach": {
        defaultType: "uri"
      },
      "attendee": {
        defaultType: "cal-address"
      },
      "categories": {
        defaultType: "text",
        multiValue: ","
      },
      "completed": {
        defaultType: "date-time"
      },
      "created": {
        defaultType: "date-time"
      },
      "dtend": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date"]
      },
      "dtstamp": {
        defaultType: "date-time"
      },
      "dtstart": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date"]
      },
      "due": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date"]
      },
      "duration": {
        defaultType: "duration"
      },
      "exdate": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date"],
        multiValue: ','
      },
      "exrule": {
        defaultType: "recur"
      },
      "freebusy": {
        defaultType: "period",
        multiValue: ","
      },
      "geo": {
        defaultType: "float",
        multiValue: ";"
      },
      /* TODO exactly 2 values */"last-modified": {
        defaultType: "date-time"
      },
      "organizer": {
        defaultType: "cal-address"
      },
      "percent-complete": {
        defaultType: "integer"
      },
      "repeat": {
        defaultType: "integer"
      },
      "rdate": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date", "period"],
        multiValue: ',',
        detectType: function(string) {
          if (string.indexOf('/') !== -1) {
            return 'period';
          }
          return (string.indexOf('T') === -1) ? 'date' : 'date-time';
        }
      },
      "recurrence-id": {
        defaultType: "date-time",
        allowedTypes: ["date-time", "date"]
      },
      "resources": {
        defaultType: "text",
        multiValue: ","
      },
      "request-status": {
        defaultType: "text",
        multiValue: ";"
      },
      "priority": {
        defaultType: "integer"
      },
      "rrule": {
        defaultType: "recur"
      },
      "sequence": {
        defaultType: "integer"
      },
      "trigger": {
        defaultType: "duration",
        allowedTypes: ["duration", "date-time"]
      },
      "tzoffsetfrom": {
        defaultType: "utc-offset"
      },
      "tzoffsetto": {
        defaultType: "utc-offset"
      },
      "tzurl": {
        defaultType: "uri"
      },
      "url": {
        defaultType: "uri"
      }
    },

    component: {
      decorate: function decorate(aData, aParent) {
        return new ICAL.Component(aData, aParent);
      },
      "vevent": {}
    }

  };

  return design;
}());
ICAL.stringify = (function() {
  'use strict';

  var LINE_ENDING = '\r\n';
  var DEFAULT_TYPE = 'text';

  var design = ICAL.design;
  var helpers = ICAL.helpers;

  /**
   * Convert a full jCal Array into a ical document.
   *
   * @param {Array} jCal document.
   * @return {String} ical document.
   */
  function stringify(jCal) {
    if (!jCal[0] || jCal[0] !== 'icalendar') {
      throw new Error('must provide full jCal document');
    }

    // 1 because we skip the initial element.
    var i = 1;
    var len = jCal.length;
    var result = '';

    for (; i < len; i++) {
      result += stringify.component(jCal[i]) + LINE_ENDING;
    }

    return result;
  }

  /**
   * Converts an jCal component array into a ICAL string.
   * Recursive will resolve sub-components.
   *
   * Exact component/property order is not saved all
   * properties will come before subcomponents.
   *
   * @param {Array} component jCal fragment of a component.
   */
  stringify.component = function(component) {
    var name = component[0].toUpperCase();
    var result = 'BEGIN:' + name + LINE_ENDING;

    var props = component[1];
    var propIdx = 0;
    var propLen = props.length;

    for (; propIdx < propLen; propIdx++) {
      result += stringify.property(props[propIdx]) + LINE_ENDING;
    }

    var comps = component[2];
    var compIdx = 0;
    var compLen = comps.length;

    for (; compIdx < compLen; compIdx++) {
      result += stringify.component(comps[compIdx]) + LINE_ENDING;
    }

    result += 'END:' + name;
    return result;
  }

  /**
   * Converts a single property to a ICAL string.
   *
   * @param {Array} property jCal property.
   */
  stringify.property = function(property) {
    var name = property[0].toUpperCase();
    var jsName = property[0];
    var params = property[1];

    var line = name;

    var paramName;
    for (paramName in params) {
      if (params.hasOwnProperty(paramName)) {
        line += ';' + paramName.toUpperCase();
        line += '=' + stringify.propertyValue(params[paramName]);
      }
    }

    // there is no value so return.
    if (property.length === 3) {
      // if no params where inserted and no value
      // we given we must add a blank value.
      if (!paramName) {
        line += ':';
      }
      return line;
    }

    var valueType = property[2];

    var propDetails;
    var multiValue = false;
    var isDefault = false;

    if (jsName in design.property) {
      propDetails = design.property[jsName];

      if ('multiValue' in propDetails) {
        multiValue = propDetails.multiValue;
      }

      if ('defaultType' in propDetails) {
        if (valueType === propDetails.defaultType) {
          isDefault = true;
        }
      } else {
        if (valueType === DEFAULT_TYPE) {
          isDefault = true;
        }
      }
    } else {
      if (valueType === DEFAULT_TYPE) {
        isDefault = true;
      }
    }

    // push the VALUE property if type is not the default
    // for the current property.
    if (!isDefault) {
      // value will never contain ;/:/, so we don't escape it here.
      line += ';VALUE=' + valueType.toUpperCase();
    }

    line += ':';

    if (multiValue) {
      line += stringify.multiValue(
        property.slice(3), multiValue, valueType
      );
    } else {
      line += stringify.value(property[3], valueType);
    }

    return ICAL.helpers.foldline(line);
  }

  /**
   * Handles escaping of property values that may contain:
   *
   *    COLON (:), SEMICOLON (;), or COMMA (,)
   *
   * If any of the above are present the result is wrapped
   * in double quotes.
   *
   * @param {String} value raw value.
   * @return {String} given or escaped value when needed.
   */
  stringify.propertyValue = function(value) {

    if ((helpers.unescapedIndexOf(value, ',') === -1) &&
        (helpers.unescapedIndexOf(value, ':') === -1) &&
        (helpers.unescapedIndexOf(value, ';') === -1)) {

      return value;
    }

    return '"' + value + '"';
  }

  /**
   * Converts an array of ical values into a single
   * string based on a type and a delimiter value (like ",").
   *
   * @param {Array} values list of values to convert.
   * @param {String} delim used to join the values usually (",", ";", ":").
   * @param {String} type lowecase ical value type
   *  (like boolean, date-time, etc..).
   *
   * @return {String} ical string for value.
   */
  stringify.multiValue = function(values, delim, type) {
    var result = '';
    var len = values.length;
    var i = 0;

    for (; i < len; i++) {
      result += stringify.value(values[i], type);
      if (i !== (len - 1)) {
        result += delim;
      }
    }

    return result;
  }

  /**
   * Processes a single ical value runs the associated "toICAL"
   * method from the design value type if available to convert
   * the value.
   *
   * @param {String|Numeric} value some formatted value.
   * @param {String} type lowecase ical value type
   *  (like boolean, date-time, etc..).
   * @return {String} ical value for single value.
   */
  stringify.value = function(value, type) {
    if (type in design.value && 'toICAL' in design.value[type]) {
      return design.value[type].toICAL(value);
    }
    return value;
  }

  return stringify;

}());

ICAL.parse = (function() {
  'use strict';

  var CHAR = /[^ \t]/;
  var MULTIVALUE_DELIMITER = ',';
  var VALUE_DELIMITER = ':';
  var PARAM_DELIMITER = ';';
  var PARAM_NAME_DELIMITER = '=';
  var DEFAULT_TYPE = 'text';

  var design = ICAL.design;
  var helpers = ICAL.helpers;

  function ParserError(message) {
    this.message = message;

    try {
      throw new Error();
    } catch (e) {
      var split = e.stack.split('\n');
      split.shift();
      this.stack = split.join('\n');
    }
  }

  ParserError.prototype = {
    __proto__: Error.prototype
  };

  function parser(input) {
    var state = {};
    var root = state.component = [
      'icalendar'
    ];

    state.stack = [root];

    parser._eachLine(input, function(err, line) {
      parser._handleContentLine(line, state);
    });


    // when there are still items on the stack
    // throw a fatal error, a component was not closed
    // correctly in that case.
    if (state.stack.length > 1) {
      throw new ParserError(
        'invalid ical body. component began but did not end'
      );
    }

    state = null;

    return root;
  }

  // classes & constants
  parser.ParserError = ParserError;

  parser._formatName = function(name) {
    return name.toLowerCase();
  }

  parser._handleContentLine = function(line, state) {
    // break up the parts of the line
    var valuePos = line.indexOf(VALUE_DELIMITER);
    var paramPos = line.indexOf(PARAM_DELIMITER);

    var lastParamIndex;
    var lastValuePos;

    // name of property or begin/end
    var name;
    var value;
    // params is only overridden if paramPos !== -1.
    // we can't do params = params || {} later on
    // because it sacrifices ops.
    var params = {};

    /**
     * Different property cases
     *
     *
     * 1. RRULE:FREQ=foo
     *    // FREQ= is not a param but the value
     *
     * 2. ATTENDEE;ROLE=REQ-PARTICIPANT;
     *    // ROLE= is a param because : has not happened yet
     */
      // when the parameter delimiter is after the
      // value delimiter then its not a parameter.

    if ((paramPos !== -1 && valuePos !== -1)) {
      // when the parameter delimiter is after the
      // value delimiter then its not a parameter.
      if (paramPos > valuePos) {
        paramPos = -1;
      }
    }

    var parsedParams;
    if (paramPos !== -1) {
      name = line.substring(0, paramPos).toLowerCase();
      parsedParams = parser._parseParameters(line.substring(paramPos), 0);
      params = parsedParams[0];
      lastParamIndex = parsedParams[1].length + parsedParams[2] + paramPos;
      if ((lastValuePos =
        line.substring(lastParamIndex).indexOf(VALUE_DELIMITER)) !== -1) {
        value = line.substring(lastParamIndex + lastValuePos + 1);
      }
    } else if (valuePos !== -1) {
      // without parmeters (BEGIN:VCAENDAR, CLASS:PUBLIC)
      name = line.substring(0, valuePos).toLowerCase();
      value = line.substring(valuePos + 1);

      if (name === 'begin') {
        var newComponent = [value.toLowerCase(), [], []];
        if (state.stack.length === 1) {
          state.component.push(newComponent);
        } else {
          state.component[2].push(newComponent);
        }
        state.stack.push(state.component);
        state.component = newComponent;
        return;
      } else if (name === 'end') {
        state.component = state.stack.pop();
        return;
      }
    } else {
      /**
       * Invalid line.
       * The rational to throw an error is we will
       * never be certain that the rest of the file
       * is sane and its unlikely that we can serialize
       * the result correctly either.
       */
      throw new ParserError(
        'invalid line (no token ";" or ":") "' + line + '"'
      );
    }

    var valueType;
    var multiValue = false;
    var propertyDetails;

    if (name in design.property) {
      propertyDetails = design.property[name];

      if ('multiValue' in propertyDetails) {
        multiValue = propertyDetails.multiValue;
      }

      if (value && 'detectType' in propertyDetails) {
        valueType = propertyDetails.detectType(value);
      }
    }

    // attempt to determine value
    if (!valueType) {
      if (!('value' in params)) {
        if (propertyDetails) {
          valueType = propertyDetails.defaultType;
        } else {
          valueType = DEFAULT_TYPE;
        }
      } else {
        // possible to avoid this?
        valueType = params.value.toLowerCase();
      }
    }

    delete params.value;

    /**
     * Note on `var result` juggling:
     *
     * I observed that building the array in pieces has adverse
     * effects on performance, so where possible we inline the creation.
     * Its a little ugly but resulted in ~2000 additional ops/sec.
     */

    if (value) {
      if (multiValue) {
        var result = [name, params, valueType];
        parser._parseMultiValue(value, multiValue, valueType, result);
      } else {
        value = parser._parseValue(value, valueType);
        var result = [name, params, valueType, value];
      }
    } else {
      var result = [name, params, valueType];
    }

    state.component[1].push(result);
  };

  /**
   * @param {String} value original value.
   * @param {String} type type of value.
   * @return {Object} varies on type.
   */
  parser._parseValue = function(value, type) {
    if (type in design.value && 'fromICAL' in design.value[type]) {
      return design.value[type].fromICAL(value);
    }
    return value;
  };

  /**
   * Parse parameters from a string to object.
   *
   * @param {String} line a single unfolded line.
   * @param {Numeric} start position to start looking for properties.
   * @param {Numeric} maxPos position at which values start.
   * @return {Object} key/value pairs.
   */
  parser._parseParameters = function(line, start) {
    var lastParam = start;
    var pos = 0;
    var delim = PARAM_NAME_DELIMITER;
    var result = {};
    var name;
    var value;
    var type;

    // find the next '=' sign
    // use lastParam and pos to find name
    // check if " is used if so get value from "->"
    // then increment pos to find next ;

    while ((pos !== false) &&
           (pos = helpers.unescapedIndexOf(line, delim, pos + 1)) !== -1) {

      name = line.substr(lastParam + 1, pos - lastParam - 1);

      var nextChar = line[pos + 1];
      if (nextChar === '"') {
        var valuePos = pos + 2;
        pos = helpers.unescapedIndexOf(line, '"', valuePos);
        value = line.substr(valuePos, pos - valuePos);
        lastParam = helpers.unescapedIndexOf(line, PARAM_DELIMITER, pos);
      } else {
        var valuePos = pos + 1;

        // move to next ";"
        var nextPos = helpers.unescapedIndexOf(line, PARAM_DELIMITER, valuePos);
        if (nextPos === -1) {
          // when there is no ";" attempt to locate ":"
          nextPos = helpers.unescapedIndexOf(line, VALUE_DELIMITER, valuePos);

          if (nextPos === -1) {
            nextPos = line.length;
          }
          pos = false;
        } else {
          lastParam = nextPos;
        }

        value = line.substr(valuePos, nextPos - valuePos);
      }

      if (name in design.param && design.param[name].valueType) {
        type = design.param[name].valueType;
      } else {
        type = DEFAULT_TYPE;
      }

      result[name.toLowerCase()] = parser._parseValue(value, type);
    }
    return [result, value, valuePos];
  }

  /**
   * Parse a multi value string
   */
  parser._parseMultiValue = function(buffer, delim, type, result) {
    var pos = 0;
    var lastPos = 0;

    // split each piece
    while ((pos = helpers.unescapedIndexOf(buffer, delim, lastPos)) !== -1) {
      var value = buffer.substr(lastPos, pos - lastPos);
      result.push(parser._parseValue(value, type));
      lastPos = pos + 1;
    }

    // on the last piece take the rest of string
    result.push(
      parser._parseValue(buffer.substr(lastPos), type)
    );

    return result;
  }

  parser._eachLine = function(buffer, callback) {
    var len = buffer.length;
    var lastPos = buffer.search(CHAR);
    var pos = lastPos;
    var line;
    var firstChar;

    var newlineOffset;

    do {
      pos = buffer.indexOf('\n', lastPos) + 1;

      if (buffer[pos - 2] === '\r') {
        newlineOffset = 2;
      } else {
        newlineOffset = 1;
      }

      if (pos === 0) {
        pos = len;
        newlineOffset = 0;
      }

      firstChar = buffer[lastPos];

      if (firstChar === ' ' || firstChar === '\t') {
        // add to line
        line += buffer.substr(
          lastPos + 1,
          pos - lastPos - (newlineOffset + 1)
        );
      } else {
        if (line)
          callback(null, line);
        // push line
        line = buffer.substr(
          lastPos,
          pos - lastPos - newlineOffset
        );
      }

      lastPos = pos;
    } while (pos !== len);

    // extra ending line
    line = line.trim();

    if (line.length)
      callback(null, line);
  }

  return parser;

}());
ICAL.Component = (function() {
  'use strict';

  var PROPERTY_INDEX = 1;
  var COMPONENT_INDEX = 2;
  var NAME_INDEX = 0;

  /**
   * Create a wrapper for a jCal component.
   *
   * @param {Array|String} jCal
   *  raw jCal component data OR name of new component.
   * @param {ICAL.Component} parent parent component to associate.
   */
  function Component(jCal, parent) {
    if (typeof(jCal) === 'string') {
      // jCal spec (name, properties, components)
      jCal = [jCal, [], []];
    }

    // mostly for legacy reasons.
    this.jCal = jCal;

    this.parent = parent || null;
  }

  Component.prototype = {
    /**
     * Hydrated properties are inserted into the _properties array at the same
     * position as in the jCal array, so its possible the array contains
     * undefined values for unhydrdated properties. To avoid iterating the
     * array when checking if all properties have been hydrated, we save the
     * count here.
     */
    _hydratedPropertyCount: 0,

    /**
     * The same count as for _hydratedPropertyCount, but for subcomponents
     */
    _hydratedComponentCount: 0,

    get name() {
      return this.jCal[NAME_INDEX];
    },

    _hydrateComponent: function(index) {
      if (!this._components) {
        this._components = [];
        this._hydratedComponentCount = 0;
      }

      if (this._components[index]) {
        return this._components[index];
      }

      var comp = new Component(
        this.jCal[COMPONENT_INDEX][index],
        this
      );

      this._hydratedComponentCount++;
      return this._components[index] = comp;
    },

    _hydrateProperty: function(index) {
      if (!this._properties) {
        this._properties = [];
        this._hydratedPropertyCount = 0;
      }

      if (this._properties[index]) {
        return this._properties[index];
      }

      var prop = new ICAL.Property(
        this.jCal[PROPERTY_INDEX][index],
        this
      );

      this._hydratedPropertyCount++;
      return this._properties[index] = prop;
    },

    /**
     * Finds first sub component, optionally filtered by name.
     *
     * @method getFirstSubcomponent
     * @param {String} [name] optional name to filter by.
     */
    getFirstSubcomponent: function(name) {
      if (name) {
        var i = 0;
        var comps = this.jCal[COMPONENT_INDEX];
        var len = comps.length;

        for (; i < len; i++) {
          if (comps[i][NAME_INDEX] === name) {
            var result = this._hydrateComponent(i);
            return result;
          }
        }
      } else {
        if (this.jCal[COMPONENT_INDEX].length) {
          return this._hydrateComponent(0);
        }
      }

      // ensure we return a value (strict mode)
      return null;
    },

    /**
     * Finds all sub components, optionally filtering by name.
     *
     * @method getAllSubcomponents
     * @param {String} [name] optional name to filter by.
     */
    getAllSubcomponents: function(name) {
      var jCalLen = this.jCal[COMPONENT_INDEX].length;

      if (name) {
        var comps = this.jCal[COMPONENT_INDEX];
        var result = [];
        var i = 0;

        for (; i < jCalLen; i++) {
          if (name === comps[i][NAME_INDEX]) {
            result.push(
              this._hydrateComponent(i)
            );
          }
        }
        return result;
      } else {
        if (!this._components ||
            (this._hydratedComponentCount !== jCalLen)) {
          var i = 0;
          for (; i < jCalLen; i++) {
            this._hydrateComponent(i);
          }
        }

        return this._components;
      }
    },

    /**
     * Returns true when a named property exists.
     *
     * @param {String} name property name.
     * @return {Boolean} true when property is found.
     */
    hasProperty: function(name) {
      var props = this.jCal[PROPERTY_INDEX];
      var len = props.length;

      var i = 0;
      for (; i < len; i++) {
        // 0 is property name
        if (props[i][NAME_INDEX] === name) {
          return true;
        }
      }

      return false;
    },

    /**
     * Finds first property.
     *
     * @param {String} [name] lowercase name of property.
     * @return {ICAL.Property} found property.
     */
    getFirstProperty: function(name) {
      if (name) {
        var i = 0;
        var props = this.jCal[PROPERTY_INDEX];
        var len = props.length;

        for (; i < len; i++) {
          if (props[i][NAME_INDEX] === name) {
            var result = this._hydrateProperty(i);
            return result;
          }
        }
      } else {
        if (this.jCal[PROPERTY_INDEX].length) {
          return this._hydrateProperty(0);
        }
      }

      return null;
    },

    /**
     * Returns first properties value if available.
     *
     * @param {String} [name] (lowecase) property name.
     * @return {String} property value.
     */
    getFirstPropertyValue: function(name) {
      var prop = this.getFirstProperty(name);
      if (prop) {
        return prop.getFirstValue();
      }

      return null;
    },

    /**
     * get all properties in the component.
     *
     * @param {String} [name] (lowercase) property name.
     * @return {Array[ICAL.Property]} list of properties.
     */
    getAllProperties: function(name) {
      var jCalLen = this.jCal[PROPERTY_INDEX].length;

      if (name) {
        var props = this.jCal[PROPERTY_INDEX];
        var result = [];
        var i = 0;

        for (; i < jCalLen; i++) {
          if (name === props[i][NAME_INDEX]) {
            result.push(
              this._hydrateProperty(i)
            );
          }
        }
        return result;
      } else {
        if (!this._properties ||
            (this._hydratedPropertyCount !== jCalLen)) {
          var i = 0;
          for (; i < jCalLen; i++) {
            this._hydrateProperty(i);
          }
        }

        return this._properties;
      }

      return null;
    },

    _removeObjectByIndex: function(jCalIndex, cache, index) {
      // remove cached version
      if (cache && cache[index]) {
        var obj = cache[index];
        if ("parent" in obj) {
            obj.parent = null;
        }
        cache.splice(index, 1);
      }

      // remove it from the jCal
      this.jCal[jCalIndex].splice(index, 1);
    },

    _removeObject: function(jCalIndex, cache, nameOrObject) {
      var i = 0;
      var objects = this.jCal[jCalIndex];
      var len = objects.length;
      var cached = this[cache];

      if (typeof(nameOrObject) === 'string') {
        for (; i < len; i++) {
          if (objects[i][NAME_INDEX] === nameOrObject) {
            this._removeObjectByIndex(jCalIndex, cached, i);
            return true;
          }
        }
      } else if (cached) {
        for (; i < len; i++) {
          if (cached[i] && cached[i] === nameOrObject) {
            this._removeObjectByIndex(jCalIndex, cached, i);
            return true;
          }
        }
      }

      return false;
    },

    _removeAllObjects: function(jCalIndex, cache, name) {
      var cached = this[cache];

      // Unfortunately we have to run through all children to reset their
      // parent property.
      var objects = this.jCal[jCalIndex];
      var i = objects.length - 1;

      // descending search required because splice
      // is used and will effect the indices.
      for (; i >= 0; i--) {
        if (!name || objects[i][NAME_INDEX] === name) {
          this._removeObjectByIndex(jCalIndex, cached, i);
        }
      }
    },

    /**
     * Adds a single sub component.
     *
     * @param {ICAL.Component} component to add.
     */
    addSubcomponent: function(component) {
      if (!this._components) {
        this._components = [];
        this._hydratedComponentCount = 0;
      }

      if (component.parent) {
        component.parent.removeSubcomponent(component);
      }

      var idx = this.jCal[COMPONENT_INDEX].push(component.jCal);
      this._components[idx - 1] = component;
      this._hydratedComponentCount++;
      component.parent = this;
    },

    /**
     * Removes a single component by name or
     * the instance of a specific component.
     *
     * @param {ICAL.Component|String} nameOrComp comp type.
     * @return {Boolean} true when comp is removed.
     */
    removeSubcomponent: function(nameOrComp) {
      var removed = this._removeObject(COMPONENT_INDEX, '_components', nameOrComp);
      if (removed) {
        this._hydratedComponentCount--;
      }
      return removed;
    },

    /**
     * Removes all components or (if given) all
     * components by a particular name.
     *
     * @param {String} [name] (lowercase) component name.
     */
    removeAllSubcomponents: function(name) {
      var removed = this._removeAllObjects(COMPONENT_INDEX, '_components', name);
      this._hydratedComponentCount = 0;
      return removed;
    },

    /**
     * Adds a property to the component.
     *
     * @param {ICAL.Property} property object.
     */
    addProperty: function(property) {
      if (!(property instanceof ICAL.Property)) {
        throw new TypeError('must instance of ICAL.Property');
      }

      if (!this._properties) {
        this._properties = [];
        this._hydratedPropertyCount = 0;
      }


      if (property.parent) {
        property.parent.removeProperty(property);
      }

      var idx = this.jCal[PROPERTY_INDEX].push(property.jCal);
      this._properties[idx - 1] = property;
      this._hydratedPropertyCount++;
      property.parent = this;
    },

    /**
     * Helper method to add a property with a value to the component.
     *
     * @param {String} name property name to add.
     * @param {Object} value property value.
     */
    addPropertyWithValue: function(name, value) {
      var prop = new ICAL.Property(name);
      prop.setValue(value);

      this.addProperty(prop);

      return prop;
    },

    /**
     * Helper method that will update or create a property
     * of the given name and sets its value.
     *
     * @param {String} name property name.
     * @param {Object} value property value.
     * @return {ICAL.Property} property.
     */
    updatePropertyWithValue: function(name, value) {
      var prop = this.getFirstProperty(name);

      if (prop) {
        prop.setValue(value);
      } else {
        prop = this.addPropertyWithValue(name, value);
      }

      return prop;
    },

    /**
     * Removes a single property by name or
     * the instance of the specific property.
     *
     * @param {String|ICAL.Property} nameOrProp to remove.
     * @return {Boolean} true when deleted.
     */
    removeProperty: function(nameOrProp) {
      var removed = this._removeObject(PROPERTY_INDEX, '_properties', nameOrProp);
      if (removed) {
        this._hydratedPropertyCount--;
      }
      return removed;
    },

    /**
     * Removes all properties associated with this component.
     *
     * @param {String} [name] (lowecase) optional property name.
     */
    removeAllProperties: function(name) {
      var removed = this._removeAllObjects(PROPERTY_INDEX, '_properties', name);
      this._hydratedPropertyCount = 0;
      return removed;
    },

    toJSON: function() {
      return this.jCal;
    },

    toString: function() {
      return ICAL.stringify.component(
        this.jCal
      );
    }

  };

  return Component;

}());
ICAL.Property = (function() {
  'use strict';

  var NAME_INDEX = 0;
  var PROP_INDEX = 1;
  var TYPE_INDEX = 2;
  var VALUE_INDEX = 3;

  var design = ICAL.design;

  /**
   * Provides a nicer interface to any kind of property.
   * Its important to note that mutations done in the wrapper
   * directly effect (mutate) the jCal object used to initialize.
   *
   * Can also be used to create new properties by passing
   * the name of the property (as a String).
   *
   *
   * @param {Array|String} jCal raw jCal representation OR
   *  the new name of the property (when creating).
   *
   * @param {ICAL.Component} [parent] parent component.
   */
  function Property(jCal, parent) {
    if (typeof(jCal) === 'string') {
      // because we a creating by name we need
      // to find the type when creating the property.
      var name = jCal;

      if (name in design.property) {
        var prop = design.property[name];
        if ('defaultType' in prop) {
          var type = prop.defaultType;
        } else {
          var type = design.defaultType;
        }
      } else {
        var type = design.defaultType;
      }

      jCal = [name, {}, type];
    }

    this.jCal = jCal;
    this.parent = parent || null;
    this._updateType();
  }

  Property.prototype = {
    get type() {
      return this.jCal[TYPE_INDEX];
    },

    get name() {
      return this.jCal[NAME_INDEX];
    },

    _updateType: function() {
      if (this.type in design.value) {
        var designType = design.value[this.type];

        if ('decorate' in design.value[this.type]) {
          this.isDecorated = true;
        } else {
          this.isDecorated = false;
        }

        if (this.name in design.property) {
          if ('multiValue' in design.property[this.name]) {
            this.isMultiValue = true;
          } else {
            this.isMultiValue = false;
          }
        }
      }
    },

    /**
     * Hydrate a single value.
     */
    _hydrateValue: function(index) {
      if (this._values && this._values[index]) {
        return this._values[index];
      }

      // for the case where there is no value.
      if (this.jCal.length <= (VALUE_INDEX + index)) {
        return null;
      }

      if (this.isDecorated) {
        if (!this._values) {
          this._values = [];
        }
        return this._values[index] = this._decorate(
          this.jCal[VALUE_INDEX + index]
        );
      } else {
        return this.jCal[VALUE_INDEX + index];
      }
    },

    _decorate: function(value) {
      return design.value[this.type].decorate(value, this);
    },

    _undecorate: function(value) {
      return design.value[this.type].undecorate(value, this);
    },

    _setDecoratedValue: function(value, index) {
      if (!this._values) {
        this._values = [];
      }

      if (typeof(value) === 'object' && 'icaltype' in value) {
        // decorated value
        this.jCal[VALUE_INDEX + index] = this._undecorate(value);
        this._values[index] = value;
      } else {
        // undecorated value
        this.jCal[VALUE_INDEX + index] = value;
        this._values[index] = this._decorate(value);
      }
    },

    /**
     * Gets a param on the property.
     *
     * @param {String} name prop name (lowercase).
     * @return {String} prop value.
     */
    getParameter: function(name) {
      return this.jCal[PROP_INDEX][name];
    },

    /**
     * Sets a param on the property.
     *
     * @param {String} value property value.
     */
    setParameter: function(name, value) {
      this.jCal[PROP_INDEX][name] = value;
    },

    /**
     * Removes a parameter
     *
     * @param {String} name prop name (lowercase).
     */
    removeParameter: function(name) {
      return delete this.jCal[PROP_INDEX][name];
    },

    /**
     * Get the default type based on this property's name.
     *
     * @return {String} the default type for this property.
     */
    getDefaultType: function() {
      var name = this.name
      if (name in design.property) {
        var details = design.property[name];
        if ('defaultType' in details) {
          return details.defaultType;
        }
      }
      return null;
    },

    /**
     * Sets type of property and clears out any
     * existing values of the current type.
     *
     * @param {String} type new iCAL type (see design.values).
     */
    resetType: function(type) {
      this.removeAllValues();
      this.jCal[TYPE_INDEX] = type;
      this._updateType();
    },

    /**
     * Finds first property value.
     *
     * @return {String} first property value.
     */
    getFirstValue: function() {
      return this._hydrateValue(0);
    },

    /**
     * Gets all values on the property.
     *
     * NOTE: this creates an array during each call.
     *
     * @return {Array} list of values.
     */
    getValues: function() {
      var len = this.jCal.length - VALUE_INDEX;

      if (len < 1) {
        // its possible for a property to have no value.
        return [];
      }

      var i = 0;
      var result = [];

      for (; i < len; i++) {
        result[i] = this._hydrateValue(i);
      }

      return result;
    },

    removeAllValues: function() {
      if (this._values) {
        this._values.length = 0;
      }
      this.jCal.length = 3;
    },

    /**
     * Sets the values of the property.
     * Will overwrite the existing values.
     *
     * @param {Array} values an array of values.
     */
    setValues: function(values) {
      if (!this.isMultiValue) {
        throw new Error(
          this.name + ': does not not support mulitValue.\n' +
          'override isMultiValue'
        );
      }

      var len = values.length;
      var i = 0;
      this.removeAllValues();

      if (len > 0 &&
          typeof(values[0]) === 'object' &&
          'icaltype' in values[0]) {
        this.resetType(values[0].icaltype);
      }

      if (this.isDecorated) {
        for (; i < len; i++) {
          this._setDecoratedValue(values[i], i);
        }
      } else {
        for (; i < len; i++) {
          this.jCal[VALUE_INDEX + i] = values[i];
        }
      }
    },

    /**
     * Sets the current value of the property. If this is a multi-value
     * property, all other values will be removed.
     *
     * @param {String|Object} value new prop value.
     */
    setValue: function(value) {
      this.removeAllValues();
      if (typeof(value) === 'object' && 'icaltype' in value) {
        this.resetType(value.icaltype);
      }

      if (this.isDecorated) {
        this._setDecoratedValue(value, 0);
      } else {
        this.jCal[VALUE_INDEX] = value;
      }
    },

    /**
     * Returns the jCal representation of this property.
     *
     * @return {Object} jCal.
     */
    toJSON: function() {
      return this.jCal;
    },

    toICAL: function() {
      return ICAL.stringify.property(
        this.jCal
      );
    }

  };

  return Property;

}());
ICAL.UtcOffset = (function() {

  function UtcOffset(aData) {
    this.hours = aData.hours;
    this.minutes = aData.minutes;
    this.factor = aData.factor;
  };

  UtcOffset.prototype = {

    hours: null,
    minutes: null,
    factor: null,

    icaltype: "utc-offset",

    toString: function toString() {
      return (this.factor == 1 ? "+" : "-") +
              ICAL.helpers.pad2(this.hours) + ':' +
              ICAL.helpers.pad2(this.minutes);
    }
  };

  UtcOffset.fromString = function(aString) {
    // -05:00
    var options = {};
    //TODO: support seconds per rfc5545 ?
    options.factor = (aString[0] === '+') ? 1 : -1;
    options.hours = ICAL.helpers.strictParseInt(aString.substr(1, 2));
    options.minutes = ICAL.helpers.strictParseInt(aString.substr(4, 2));

    return new ICAL.UtcOffset(options);
  };


  return UtcOffset;

}());
ICAL.Binary = (function() {

  function Binary(aValue) {
    this.value = aValue;
  };

  Binary.prototype = {
    icaltype: "binary",

    decodeValue: function decodeValue() {
      return this._b64_decode(this.value);
    },

    setEncodedValue: function setEncodedValue(val) {
      this.value = this._b64_encode(val);
    },

    _b64_encode: function base64_encode(data) {
      // http://kevin.vanzonneveld.net
      // +   original by: Tyler Akins (http://rumkin.com)
      // +   improved by: Bayron Guevara
      // +   improved by: Thunder.m
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   bugfixed by: Pellentesque Malesuada
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Rafał Kukawski (http://kukawski.pl)
      // *     example 1: base64_encode('Kevin van Zonneveld');
      // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
      // mozilla has this native
      // - but breaks in 2.0.0.12!
      //if (typeof this.window['atob'] == 'function') {
      //    return atob(data);
      //}
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz0123456789+/=";
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

      if (!data) {
        return data;
      }

      do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');

      var r = data.length % 3;

      return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

    },

    _b64_decode: function base64_decode(data) {
      // http://kevin.vanzonneveld.net
      // +   original by: Tyler Akins (http://rumkin.com)
      // +   improved by: Thunder.m
      // +      input by: Aman Gupta
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   bugfixed by: Onno Marsman
      // +   bugfixed by: Pellentesque Malesuada
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +      input by: Brett Zamir (http://brett-zamir.me)
      // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
      // *     returns 1: 'Kevin van Zonneveld'
      // mozilla has this native
      // - but breaks in 2.0.0.12!
      //if (typeof this.window['btoa'] == 'function') {
      //    return btoa(data);
      //}
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz0123456789+/=";
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

      if (!data) {
        return data;
      }

      data += '';

      do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
          tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
          tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
          tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
      } while (i < data.length);

      dec = tmp_arr.join('');

      return dec;
    },

    toString: function() {
      return this.value;
    }
  };

  Binary.fromString = function(aString) {
    return new Binary(aString);
  }

  return Binary;

}());
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */



(typeof(ICAL) === 'undefined')? ICAL = {} : '';
(function() {
  ICAL.Period = function icalperiod(aData) {
    this.wrappedJSObject = this;

    if (aData && 'start' in aData) {
      if (aData.start && !(aData.start instanceof ICAL.Time)) {
        throw new TypeError('.start must be an instance of ICAL.Time');
      }
      this.start = aData.start;
    }

    if (aData && aData.end && aData.duration) {
      throw new Error('cannot accept both end and duration');
    }

    if (aData && 'end' in aData) {
      if (aData.end && !(aData.end instanceof ICAL.Time)) {
        throw new TypeError('.end must be an instance of ICAL.Time');
      }
      this.end = aData.end;
    }

    if (aData && 'duration' in aData) {
      if (aData.duration && !(aData.duration instanceof ICAL.Duration)) {
        throw new TypeError('.duration must be an instance of ICAL.Duration');
      }
      this.duration = aData.duration;
    }
  };

  ICAL.Period.prototype = {

    start: null,
    end: null,
    duration: null,
    icalclass: "icalperiod",
    icaltype: "period",

    clone: function() {
      return ICAL.Period.fromData({
        start: this.start ? this.start.clone() : null,
        end: this.end ? this.end.clone() : null,
        duration: this.duration ? this.duration.clone() : null
      });
    },

    getDuration: function duration() {
      if (this.duration) {
        return this.duration;
      } else {
        return this.end.subtractDate(this.start);
      }
    },

    getEnd: function() {
      if (this.end) {
        return this.end;
      } else {
        var end = this.start.clone();
        end.addDuration(this.duration);
        return end;
      }
    },

    toString: function toString() {
      return this.start + "/" + (this.end || this.duration);
    },

    toICALString: function() {
      return this.start.toICALString() + "/" +
             (this.end || this.duration).toICALString();
    }
  };

  ICAL.Period.fromString = function fromString(str, prop) {
    var parts = str.split('/');

    if (parts.length !== 2) {
      throw new Error(
        'Invalid string value: "' + str + '" must contain a "/" char.'
      );
    }

    var options = {
      start: ICAL.Time.fromDateTimeString(parts[0], prop)
    };

    var end = parts[1];

    if (ICAL.Duration.isValueString(end)) {
      options.duration = ICAL.Duration.fromString(end);
    } else {
      options.end = ICAL.Time.fromDateTimeString(end, prop);
    }

    return new ICAL.Period(options);
  };

  ICAL.Period.fromData = function fromData(aData) {
    return new ICAL.Period(aData);
  };

})();
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */



(typeof(ICAL) === 'undefined')? ICAL = {} : '';
(function() {
  var DURATION_LETTERS = /([PDWHMTS]{1,1})/;

  ICAL.Duration = function icalduration(data) {
    this.wrappedJSObject = this;
    this.fromData(data);
  };

  ICAL.Duration.prototype = {

    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isNegative: false,
    icalclass: "icalduration",
    icaltype: "duration",

    clone: function clone() {
      return ICAL.Duration.fromData(this);
    },

    toSeconds: function toSeconds() {
      var seconds = this.seconds + 60 * this.minutes + 3600 * this.hours +
                    86400 * this.days + 7 * 86400 * this.weeks;
      return (this.isNegative ? -seconds : seconds);
    },

    fromSeconds: function fromSeconds(aSeconds) {
      var secs = Math.abs(aSeconds);

      this.isNegative = (aSeconds < 0);
      this.days = ICAL.helpers.trunc(secs / 86400);

      // If we have a flat number of weeks, use them.
      if (this.days % 7 == 0) {
        this.weeks = this.days / 7;
        this.days = 0;
      } else {
        this.weeks = 0;
      }

      secs -= (this.days + 7 * this.weeks) * 86400;

      this.hours = ICAL.helpers.trunc(secs / 3600);
      secs -= this.hours * 3600;

      this.minutes = ICAL.helpers.trunc(secs / 60);
      secs -= this.minutes * 60;

      this.seconds = secs;
      return this;
    },

    fromData: function fromData(aData) {
      var propsToCopy = ["weeks", "days", "hours",
                         "minutes", "seconds", "isNegative"];
      for (var key in propsToCopy) {
        var prop = propsToCopy[key];
        if (aData && prop in aData) {
          this[prop] = aData[prop];
        } else {
          this[prop] = 0;
        }
      }
    },

    reset: function reset() {
      this.isNegative = false;
      this.weeks = 0;
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    },

    compare: function compare(aOther) {
      var thisSeconds = this.toSeconds();
      var otherSeconds = aOther.toSeconds();
      return (thisSeconds > otherSeconds) - (thisSeconds < otherSeconds);
    },

    normalize: function normalize() {
      this.fromSeconds(this.toSeconds());
      return this;
    },

    toString: function toString() {
      if (this.toSeconds() == 0) {
        return "PT0S";
      } else {
        var str = "";
        if (this.isNegative) str += "-";
        str += "P";
        if (this.weeks) str += this.weeks + "W";
        if (this.days) str += this.days + "D";

        if (this.hours || this.minutes || this.seconds) {
          str += "T";
          if (this.hours) str += this.hours + "H";
          if (this.minutes) str += this.minutes + "M";
          if (this.seconds) str += this.seconds + "S";
        }
        return str;
      }
    },

    toICALString: function() {
      return this.toString();
    }
  };

  ICAL.Duration.fromSeconds = function icalduration_from_seconds(aSeconds) {
    return (new ICAL.Duration()).fromSeconds(aSeconds);
  };

  /**
   * Internal helper function to handle a chunk of a duration.
   *
   * @param {String} letter type of duration chunk.
   * @param {String} number numeric value or -/+.
   * @param {Object} dict target to assign values to.
   */
  function parseDurationChunk(letter, number, object) {
    var type;
    switch (letter) {
      case 'P':
        if (number && number === '-') {
          object.isNegative = true;
        } else {
          object.isNegative = false;
        }
        // period
        break;
      case 'D':
        type = 'days';
        break;
      case 'W':
        type = 'weeks';
        break;
      case 'H':
        type = 'hours';
        break;
      case 'M':
        type = 'minutes';
        break;
      case 'S':
        type = 'seconds';
        break;
      default:
        // Not a valid chunk
        return 0;
    }

    if (type) {
      if (!number && number !== 0) {
        throw new Error(
          'invalid duration value: Missing number before "' + letter + '"'
        );
      }
      var num = parseInt(number, 10);
      if (ICAL.helpers.isStrictlyNaN(num)) {
        throw new Error(
          'invalid duration value: Invalid number "' + number + '" before "' + letter + '"'
        );
      }
      object[type] = num;
    }

    return 1;
  }

  /**
   * @param {String} value raw ical value.
   * @return {Boolean}
   *  true when the given value is of the duration ical type.
   */
  ICAL.Duration.isValueString = function(string) {
    return (string[0] === 'P' || string[1] === 'P');
  },

  ICAL.Duration.fromString = function icalduration_from_string(aStr) {
    var pos = 0;
    var dict = Object.create(null);
    var chunks = 0;

    while ((pos = aStr.search(DURATION_LETTERS)) !== -1) {
      var type = aStr[pos];
      var numeric = aStr.substr(0, pos);
      aStr = aStr.substr(pos + 1);

      chunks += parseDurationChunk(type, numeric, dict);
    }

    if (chunks < 2) {
      // There must be at least a chunk with "P" and some unit chunk
      throw new Error(
        'invalid duration value: Not enough duration components in "' + aStr + '"'
      );
    }

    return new ICAL.Duration(dict);
  };

  ICAL.Duration.fromData = function icalduration_from_data(aData) {
    return new ICAL.Duration(aData);
  };
})();
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */



(typeof(ICAL) === 'undefined')? ICAL = {} : '';
(function() {
  var OPTIONS = ["tzid", "location", "tznames",
                 "latitude", "longitude"];

  /**
   * Timezone representation, created by passing in a tzid and component.
   *
   *    var vcalendar;
   *    var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
   *    var tzid = timezoneComp.getFirstPropertyValue('tzid');
   *
   *    var timezone = new ICAL.Timezone({
   *      component: timezoneComp,
   *      tzid
   *    });
   *
   *
   * @param {Object} data options for class (see above).
   */
  ICAL.Timezone = function icaltimezone(data) {
    this.wrappedJSObject = this;
    this.fromData(data);
  };

  ICAL.Timezone.prototype = {

    tzid: "",
    location: "",
    tznames: "",

    latitude: 0.0,
    longitude: 0.0,

    component: null,

    expandedUntilYear: 0,

    icalclass: "icaltimezone",

    fromData: function fromData(aData) {
      this.expandedUntilYear = 0;
      this.changes = [];

      if (aData instanceof ICAL.Component) {
        // Either a component is passed directly
        this.component = aData;
      } else {
        // Otherwise the component may be in the data object
        if (aData && "component" in aData) {
          if (typeof aData.component == "string") {
            // If a string was passed, parse it as a component
            var icalendar = ICAL.parse(aData.component);
            this.component = new ICAL.Component(icalendar[1]);
          } else if (aData.component instanceof ICAL.Component) {
            // If it was a component already, then just set it
            this.component = aData.component;
          } else {
            // Otherwise just null out the component
            this.component = null;
          }
        }

        // Copy remaining passed properties
        for (var key in OPTIONS) {
          var prop = OPTIONS[key];
          if (aData && prop in aData) {
            this[prop] = aData[prop];
          }
        }
      }

      // If we have a component but no TZID, attempt to get it from the
      // component's properties.
      if (this.component instanceof ICAL.Component && !this.tzid) {
        this.tzid = this.component.getFirstPropertyValue('tzid');
      }

      return this;
    },

    /**
     * Finds the utcOffset the given time would occur in this timezone.
     *
     * @return {Number} utc offset in seconds.
     */
    utcOffset: function utcOffset(tt) {
      if (this == ICAL.Timezone.utcTimezone || this == ICAL.Timezone.localTimezone) {
        return 0;
      }

      this._ensureCoverage(tt.year);

      if (!this.changes.length) {
        return 0;
      }

      var tt_change = {
        year: tt.year,
        month: tt.month,
        day: tt.day,
        hour: tt.hour,
        minute: tt.minute,
        second: tt.second
      };

      var change_num = this._findNearbyChange(tt_change);
      var change_num_to_use = -1;
      var step = 1;

      // TODO: replace with bin search?
      for (;;) {
        var change = ICAL.helpers.clone(this.changes[change_num], true);
        if (change.utcOffset < change.prevUtcOffset) {
          ICAL.Timezone.adjust_change(change, 0, 0, 0, change.utcOffset);
        } else {
          ICAL.Timezone.adjust_change(change, 0, 0, 0,
                                          change.prevUtcOffset);
        }

        var cmp = ICAL.Timezone._compare_change_fn(tt_change, change);

        if (cmp >= 0) {
          change_num_to_use = change_num;
        } else {
          step = -1;
        }

        if (step == -1 && change_num_to_use != -1) {
          break;
        }

        change_num += step;

        if (change_num < 0) {
          return 0;
        }

        if (change_num >= this.changes.length) {
          break;
        }
      }

      var zone_change = this.changes[change_num_to_use];
      var utcOffset_change = zone_change.utcOffset - zone_change.prevUtcOffset;

      if (utcOffset_change < 0 && change_num_to_use > 0) {
        var tmp_change = ICAL.helpers.clone(zone_change, true);
        ICAL.Timezone.adjust_change(tmp_change, 0, 0, 0,
                                        tmp_change.prevUtcOffset);

        if (ICAL.Timezone._compare_change_fn(tt_change, tmp_change) < 0) {
          var prev_zone_change = this.changes[change_num_to_use - 1];

          var want_daylight = false; // TODO

          if (zone_change.is_daylight != want_daylight &&
              prev_zone_change.is_daylight == want_daylight) {
            zone_change = prev_zone_change;
          }
        }
      }

      // TODO return is_daylight?
      return zone_change.utcOffset;
    },

    _findNearbyChange: function icaltimezone_find_nearby_change(change) {
      // find the closest match
      var idx = ICAL.helpers.binsearchInsert(
        this.changes,
        change,
        ICAL.Timezone._compare_change_fn
      );

      if (idx >= this.changes.length) {
        return this.changes.length - 1;
      }

      return idx;
    },

    _ensureCoverage: function(aYear) {
      if (ICAL.Timezone._minimumExpansionYear == -1) {
        var today = ICAL.Time.now();
        ICAL.Timezone._minimumExpansionYear = today.year;
      }

      var changesEndYear = aYear;
      if (changesEndYear < ICAL.Timezone._minimumExpansionYear) {
        changesEndYear = ICAL.Timezone._minimumExpansionYear;
      }

      changesEndYear += ICAL.Timezone.EXTRA_COVERAGE;

      if (changesEndYear > ICAL.Timezone.MAX_YEAR) {
        changesEndYear = ICAL.Timezone.MAX_YEAR;
      }

      if (!this.changes.length || this.expandedUntilYear < aYear) {
        var subcomps = this.component.getAllSubcomponents();
        var compLen = subcomps.length;
        var compIdx = 0;

        for (; compIdx < compLen; compIdx++) {
          this._expandComponent(
            subcomps[compIdx], changesEndYear, this.changes
          );
        }

        this.changes.sort(ICAL.Timezone._compare_change_fn);
        this.expandedUntilYear = changesEndYear;
      }
    },

    _expandComponent: function(aComponent, aYear, changes) {
      if (!aComponent.hasProperty("dtstart") ||
          !aComponent.hasProperty("tzoffsetto") ||
          !aComponent.hasProperty("tzoffsetfrom")) {
        return null;
      }

      var dtstart = aComponent.getFirstProperty("dtstart").getFirstValue();

      function convert_tzoffset(offset) {
        return offset.factor * (offset.hours * 3600 + offset.minutes * 60);
      }

      function init_changes() {
        var changebase = {};
        changebase.is_daylight = (aComponent.name == "daylight");
        changebase.utcOffset = convert_tzoffset(
          aComponent.getFirstProperty("tzoffsetto").getFirstValue()
        );

        changebase.prevUtcOffset = convert_tzoffset(
          aComponent.getFirstProperty("tzoffsetfrom").getFirstValue()
        );

        return changebase;
      }

      if (!aComponent.hasProperty("rrule") && !aComponent.hasProperty("rdate")) {
        var change = init_changes();
        change.year = dtstart.year;
        change.month = dtstart.month;
        change.day = dtstart.day;
        change.hour = dtstart.hour;
        change.minute = dtstart.minute;
        change.second = dtstart.second;

        ICAL.Timezone.adjust_change(change, 0, 0, 0,
                                        -change.prevUtcOffset);
        changes.push(change);
      } else {
        var props = aComponent.getAllProperties("rdate");
        for (var rdatekey in props) {
          var rdate = props[rdatekey];
          var time = rdate.getFirstValue();
          var change = init_changes();

          change.year = time.year;
          change.month = time.month;
          change.day = time.day;

          if (time.isDate) {
            change.hour = dtstart.hour;
            change.minute = dtstart.minute;
            change.second = dtstart.second;

            if (dtstart.zone != ICAL.Timezone.utcTimezone) {
              ICAL.Timezone.adjust_change(change, 0, 0, 0,
                                              -change.prevUtcOffset);
            }
          } else {
            change.hour = time.hour;
            change.minute = time.minute;
            change.second = time.second;

            if (time.zone != ICAL.Timezone.utcTimezone) {
              ICAL.Timezone.adjust_change(change, 0, 0, 0,
                                              -change.prevUtcOffset);
            }
          }

          changes.push(change);
        }

        var rrule = aComponent.getFirstProperty("rrule");

        if (rrule) {
          rrule = rrule.getFirstValue();
          var change = init_changes();

          if (rrule.until && rrule.until.zone == ICAL.Timezone.utcTimezone) {
            rrule.until.adjust(0, 0, 0, change.prevUtcOffset);
            rrule.until.zone = ICAL.Timezone.localTimezone;
          }

          var iterator = rrule.iterator(dtstart);

          var occ;
          while ((occ = iterator.next())) {
            var change = init_changes();
            if (occ.year > aYear || !occ) {
              break;
            }

            change.year = occ.year;
            change.month = occ.month;
            change.day = occ.day;
            change.hour = occ.hour;
            change.minute = occ.minute;
            change.second = occ.second;
            change.isDate = occ.isDate;

            ICAL.Timezone.adjust_change(change, 0, 0, 0,
                                            -change.prevUtcOffset);
            changes.push(change);
          }
        }
      }

      return changes;
    },

    toString: function toString() {
      return (this.tznames ? this.tznames : this.tzid);
    }

  };

  ICAL.Timezone._compare_change_fn = function icaltimezone_compare_change_fn(a, b) {
    if (a.year < b.year) return -1;
    else if (a.year > b.year) return 1;

    if (a.month < b.month) return -1;
    else if (a.month > b.month) return 1;

    if (a.day < b.day) return -1;
    else if (a.day > b.day) return 1;

    if (a.hour < b.hour) return -1;
    else if (a.hour > b.hour) return 1;

    if (a.minute < b.minute) return -1;
    else if (a.minute > b.minute) return 1;

    if (a.second < b.second) return -1;
    else if (a.second > b.second) return 1;

    return 0;
  };

  ICAL.Timezone.convert_time = function icaltimezone_convert_time(tt, from_zone, to_zone) {
    if (tt.isDate ||
        from_zone.tzid == to_zone.tzid ||
        from_zone == ICAL.Timezone.localTimezone ||
        to_zone == ICAL.Timezone.localTimezone) {
      tt.zone = to_zone;
      return tt;
    }

    var utcOffset = from_zone.utcOffset(tt);
    tt.adjust(0, 0, 0, - utcOffset);

    utcOffset = to_zone.utcOffset(tt);
    tt.adjust(0, 0, 0, utcOffset);

    return null;
  };

  ICAL.Timezone.fromData = function icaltimezone_fromData(aData) {
    var tt = new ICAL.Timezone();
    return tt.fromData(aData);
  };

  ICAL.Timezone.utcTimezone = ICAL.Timezone.fromData({
    tzid: "UTC"
  });

  ICAL.Timezone.localTimezone = ICAL.Timezone.fromData({
    tzid: "floating"
  });

  ICAL.Timezone.adjust_change = function icaltimezone_adjust_change(change, days, hours, minutes, seconds) {
    return ICAL.Time.prototype.adjust.call(
      change,
      days,
      hours,
      minutes,
      seconds,
      change
    );
  };

  ICAL.Timezone._minimumExpansionYear = -1;
  ICAL.Timezone.MAX_YEAR = 2035; // TODO this is because of time_t, which we don't need. Still usefull?
  ICAL.Timezone.EXTRA_COVERAGE = 5;
})();
// singleton class to contain timezones.
// Right now its all manual registry in the
// future we may use this class to download timezone
// information or handle loading pre-expanded timezones.
ICAL.TimezoneService = (function() {
  var zones;

  // Using var rather then return so we don't need to name the functions twice.
  // TimezoneService#get will appear in profiler, etc...
  var TimezoneService = {
    reset: function() {
      zones = Object.create(null);
      var utc = ICAL.Timezone.utcTimezone;

      zones.Z = utc;
      zones.UTC = utc;
      zones.GMT = utc;
    },

    /**
     * Checks if timezone id has been registered.
     *
     * @param {String} tzid (e.g. America/Los_Angeles).
     * @return {Boolean} false when not present.
     */
    has: function(tzid) {
      return !!zones[tzid];
    },

    /**
     * Returns a timezone by its tzid if present.
     *
     * @param {String} tzid name of timezone (e.g. America/Los_Angeles).
     * @return {ICAL.Timezone|Null} zone or null.
     */
    get: function(tzid) {
      return zones[tzid];
    },

    /**
     * Registers a timezone object or component.
     *
     * @param {String} [name] optional uses timezone.tzid by default.
     * @param {ICAL.Component|ICAL.Timezone} zone initialized zone or vtimezone.
     */
    register: function(name, timezone) {
      if (name instanceof ICAL.Component) {
        if (name.name === 'vtimezone') {
          timezone = new ICAL.Timezone(name);
          name = timezone.tzid;
        }
      }

      if (timezone instanceof ICAL.Timezone) {
        zones[name] = timezone;
      } else {
        throw new TypeError('timezone must be ICAL.Timezone or ICAL.Component');
      }
    },

    /**
     * Removes a timezone by its tzid from the list.
     *
     * @param {String} tzid (e.g. America/Los_Angeles).
     */
    remove: function(tzid) {
      return (delete zones[tzid]);
    }
  };

  // initialize defaults
  TimezoneService.reset();

  return TimezoneService;
}());
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */



(typeof(ICAL) === 'undefined')? ICAL = {} : '';
(function() {

  /**
   * Time representation (similar to JS Date object).
   * Fully independent of system (OS) timezone / time.
   * Unlike JS Date month start at 1 (Jan) not zero.
   *
   *
   *    var time = new ICAL.Time({
   *      year: 2012,
   *      month: 10,
   *      day: 11
   *      minute: 0,
   *      second: 0,
   *      isDate: false
   *    });
   *
   *
   * @param {Object} data initialization time.
   * @param {ICAL.Timezone} zone timezone this position occurs in.
   */
  ICAL.Time = function icaltime(data, zone) {
    this.wrappedJSObject = this;
    var time = this._time = Object.create(null);

    /* time defaults */
    time.year = 0;
    time.month = 1;
    time.day = 1;
    time.hour = 0;
    time.minute = 0;
    time.second = 0;
    time.isDate = false;

    this.fromData(data, zone);
  };

  ICAL.Time.prototype = {

    icalclass: "icaltime",

    // is read only strictly defined by isDate
    get icaltype() {
      return this.isDate ? 'date' : 'date-time';
    },

    /**
     * @type ICAL.Timezone
     */
    zone: null,

    /**
     * Internal uses to indicate that a change has been
     * made and the next read operation must attempt to
     * normalize the value (for example changing the day to 33).
     *
     * @type Boolean
     * @private
     */
    _pendingNormalization: false,

    clone: function icaltime_clone() {
      return new ICAL.Time(this._time, this.zone);
    },

    reset: function icaltime_reset() {
      this.fromData(ICAL.Time.epochTime);
      this.zone = ICAL.Timezone.utcTimezone;
    },

    resetTo: function icaltime_resetTo(year, month, day,
                                       hour, minute, second, timezone) {
      this.fromData({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        zone: timezone
      });
    },

    fromString: function icaltime_fromString(str) {
      var data;
      try {
        data = ICAL.DecorationParser.parseValue(str, "date");
        data.isDate = true;
      } catch (e) {
        data = ICAL.DecorationParser.parseValue(str, "date-time");
        data.isDate = false;
      }
      return this.fromData(data);
    },

    fromJSDate: function icaltime_fromJSDate(aDate, useUTC) {
      if (!aDate) {
        this.reset();
      } else {
        if (useUTC) {
          this.zone = ICAL.Timezone.utcTimezone;
          this.year = aDate.getUTCFullYear();
          this.month = aDate.getUTCMonth() + 1;
          this.day = aDate.getUTCDate();
          this.hour = aDate.getUTCHours();
          this.minute = aDate.getUTCMinutes();
          this.second = aDate.getUTCSeconds();
        } else {
          this.zone = ICAL.Timezone.localTimezone;
          this.year = aDate.getFullYear();
          this.month = aDate.getMonth() + 1;
          this.day = aDate.getDate();
          this.hour = aDate.getHours();
          this.minute = aDate.getMinutes();
          this.second = aDate.getSeconds();
        }
      }
      return this;
    },

    fromData: function fromData(aData, aZone) {
      for (var key in aData) {
        // ical type cannot be set
        if (key === 'icaltype') continue;
        this[key] = aData[key];
      }

      if (aZone) {
        this.zone = aZone;
      }

      if (aData && !("isDate" in aData)) {
        this.isDate = !("hour" in aData);
      } else if (aData && ("isDate" in aData)) {
        this.isDate = aData.isDate;
      }

      if (aData && "timezone" in aData) {
        var zone = ICAL.TimezoneService.get(
          aData.timezone
        );

        this.zone = zone || ICAL.Timezone.localTimezone;
      }

      if (aData && "zone" in aData) {
        this.zone = aData.zone;
      }

      if (!this.zone) {
        this.zone = ICAL.Timezone.localTimezone;
      }

      return this;
    },

    dayOfWeek: function icaltime_dayOfWeek() {
      // Using Zeller's algorithm
      var q = this.day;
      var m = this.month + (this.month < 3 ? 12 : 0);
      var Y = this.year - (this.month < 3 ? 1 : 0);

      var h = (q + Y + ICAL.helpers.trunc(((m + 1) * 26) / 10) + ICAL.helpers.trunc(Y / 4));
      if (true /* gregorian */) {
        h += ICAL.helpers.trunc(Y / 100) * 6 + ICAL.helpers.trunc(Y / 400);
      } else {
        h += 5;
      }

      // Normalize to 1 = sunday
      h = ((h + 6) % 7) + 1;
      return h;
    },

    dayOfYear: function icaltime_dayOfYear() {
      var is_leap = (ICAL.Time.is_leap_year(this.year) ? 1 : 0);
      var diypm = ICAL.Time._days_in_year_passed_month;
      return diypm[is_leap][this.month - 1] + this.day;
    },

    startOfWeek: function startOfWeek() {
      var result = this.clone();
      result.day -= this.dayOfWeek() - 1;
      return result;
    },

    endOfWeek: function endOfWeek() {
      var result = this.clone();
      result.day += 7 - this.dayOfWeek();
      return result;
    },

    startOfMonth: function startOfMonth() {
      var result = this.clone();
      result.day = 1;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    },

    endOfMonth: function endOfMonth() {
      var result = this.clone();
      result.day = ICAL.Time.daysInMonth(result.month, result.year);
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    },

    startOfYear: function startOfYear() {
      var result = this.clone();
      result.day = 1;
      result.month = 1;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    },

    endOfYear: function endOfYear() {
      var result = this.clone();
      result.day = 31;
      result.month = 12;
      result.isDate = true;
      result.hour = 0;
      result.minute = 0;
      result.second = 0;
      return result;
    },

    startDoyWeek: function startDoyWeek(aFirstDayOfWeek) {
      var firstDow = aFirstDayOfWeek || ICAL.Time.SUNDAY;
      var delta = this.dayOfWeek() - firstDow;
      if (delta < 0) delta += 7;
      return this.dayOfYear() - delta;
    },

    /**
     * Finds the nthWeekDay relative to the current month (not day).
     * The returned value is a day relative the month that this
     * month belongs to so 1 would indicate the first of the month
     * and 40 would indicate a day in the following month.
     *
     * @param {Numeric} aDayOfWeek day of the week see the day name constants.
     * @param {Numeric} aPos nth occurrence of a given week day
     *                       values of 1 and 0 both indicate the first
     *                       weekday of that type. aPos may be either positive
     *                       or negative.
     *
     * @return {Numeric} numeric value indicating a day relative
     *                   to the current month of this time object.
     */
    nthWeekDay: function icaltime_nthWeekDay(aDayOfWeek, aPos) {
      var daysInMonth = ICAL.Time.daysInMonth(this.month, this.year);
      var weekday;
      var pos = aPos;

      var start = 0;

      var otherDay = this.clone();

      if (pos >= 0) {
        otherDay.day = 1;

        // because 0 means no position has been given
        // 1 and 0 indicate the same day.
        if (pos != 0) {
          // remove the extra numeric value
          pos--;
        }

        // set current start offset to current day.
        start = otherDay.day;

        // find the current day of week
        var startDow = otherDay.dayOfWeek();

        // calculate the difference between current
        // day of the week and desired day of the week
        var offset = aDayOfWeek - startDow;


        // if the offset goes into the past
        // week we add 7 so its goes into the next
        // week. We only want to go forward in time here.
        if (offset < 0)
          // this is really important otherwise we would
          // end up with dates from in the past.
          offset += 7;

        // add offset to start so start is the same
        // day of the week as the desired day of week.
        start += offset;

        // because we are going to add (and multiply)
        // the numeric value of the day we subtract it
        // from the start position so not to add it twice.
        start -= aDayOfWeek;

        // set week day
        weekday = aDayOfWeek;
      } else {

        // then we set it to the last day in the current month
        otherDay.day = daysInMonth;

        // find the ends weekday
        var endDow = otherDay.dayOfWeek();

        pos++;

        weekday = (endDow - aDayOfWeek);

        if (weekday < 0) {
          weekday += 7;
        }

        weekday = daysInMonth - weekday;
      }

      weekday += pos * 7;

      return start + weekday;
    },

    /**
     * Checks if current time is the nthWeekDay.
     * Relative to the current month.
     *
     * Will always return false when rule resolves
     * outside of current month.
     *
     * @param {Numeric} aDayOfWeek day of week.
     * @param {Numeric} aPos position.
     * @param {Numeric} aMax maximum valid day.
     */
    isNthWeekDay: function(aDayOfWeek, aPos) {
      var dow = this.dayOfWeek();

      if (aPos === 0 && dow === aDayOfWeek) {
        return true;
      }

      // get pos
      var day = this.nthWeekDay(aDayOfWeek, aPos);

      if (day === this.day) {
        return true;
      }

      return false;
    },

    weekNumber: function weekNumber(aWeekStart) {
      // This function courtesty of Julian Bucknall, published under the MIT license
      // http://www.boyet.com/articles/publishedarticles/calculatingtheisoweeknumb.html
      var doy = this.dayOfYear();
      var dow = this.dayOfWeek();
      var year = this.year;
      var week1;

      var dt = this.clone();
      dt.isDate = true;
      var first_dow = dt.dayOfWeek();
      var isoyear = this.year;

      if (dt.month == 12 && dt.day > 28) {
        week1 = ICAL.Time.weekOneStarts(isoyear + 1, aWeekStart);
        if (dt.compare(week1) < 0) {
          week1 = ICAL.Time.weekOneStarts(isoyear, aWeekStart);
        } else {
          isoyear++;
        }
      } else {
        week1 = ICAL.Time.weekOneStarts(isoyear, aWeekStart);
        if (dt.compare(week1) < 0) {
          week1 = ICAL.Time.weekOneStarts(--isoyear, aWeekStart);
        }
      }

      var daysBetween = (dt.subtractDate(week1).toSeconds() / 86400);
      return ICAL.helpers.trunc(daysBetween / 7) + 1;
    },

    addDuration: function icaltime_add(aDuration) {
      var mult = (aDuration.isNegative ? -1 : 1);

      // because of the duration optimizations it is much
      // more efficient to grab all the values up front
      // then set them directly (which will avoid a normalization call).
      // So we don't actually normalize until we need it.
      var second = this.second;
      var minute = this.minute;
      var hour = this.hour;
      var day = this.day;

      second += mult * aDuration.seconds;
      minute += mult * aDuration.minutes;
      hour += mult * aDuration.hours;
      day += mult * aDuration.days;
      day += mult * 7 * aDuration.weeks;

      this.second = second;
      this.minute = minute;
      this.hour = hour;
      this.day = day;
    },

    /**
     * Subtract the date details (_excluding_ timezone).
     * Useful for finding the relative difference between
     * two time objects excluding their timezone differences.
     *
     * @return {ICAL.Duration} difference in duration.
     */
    subtractDate: function icaltime_subtract(aDate) {
      var unixTime = this.toUnixTime() + this.utcOffset();
      var other = aDate.toUnixTime() + aDate.utcOffset();
      return ICAL.Duration.fromSeconds(unixTime - other);
    },

    /**
     * Subtract the date details, taking timezones into account.
     *
     * @param {ICAL.Time}  The date to subtract.
     * @return {ICAL.Duration}  The difference in duration.
     */
    subtractDateTz: function icaltime_subtract_abs(aDate) {
      var unixTime = this.toUnixTime();
      var other = aDate.toUnixTime();
      return ICAL.Duration.fromSeconds(unixTime - other);
    },

    compare: function icaltime_compare(other) {
      var a = this.toUnixTime();
      var b = other.toUnixTime();

      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    },

    compareDateOnlyTz: function icaltime_compareDateOnlyTz(other, tz) {
      function cmp(attr) {
        return ICAL.Time._cmp_attr(a, b, attr);
      }
      var a = this.convertToZone(tz);
      var b = other.convertToZone(tz);
      var rc = 0;

      if ((rc = cmp("year")) != 0) return rc;
      if ((rc = cmp("month")) != 0) return rc;
      if ((rc = cmp("day")) != 0) return rc;

      return rc;
    },

    convertToZone: function convertToZone(zone) {
      var copy = this.clone();
      var zone_equals = (this.zone.tzid == zone.tzid);

      if (!this.isDate && !zone_equals) {
        ICAL.Timezone.convert_time(copy, this.zone, zone);
      }

      copy.zone = zone;
      return copy;
    },

    utcOffset: function utc_offset() {
      if (this.zone == ICAL.Timezone.localTimezone ||
          this.zone == ICAL.Timezone.utcTimezone) {
        return 0;
      } else {
        return this.zone.utcOffset(this);
      }
    },

    /**
     * Returns an RFC 5455 compliant ical representation of this object.
     *
     * @return {String} ical date/date-time.
     */
    toICALString: function() {
      var string = this.toString();

      if (string.length > 10) {
        return ICAL.design.value['date-time'].toICAL(string);
      } else {
        return ICAL.design.value.date.toICAL(string);
      }
    },

    toString: function toString() {
      var result = this.year + '-' +
                   ICAL.helpers.pad2(this.month) + '-' +
                   ICAL.helpers.pad2(this.day);

      if (!this.isDate) {
          result += 'T' + ICAL.helpers.pad2(this.hour) + ':' +
                    ICAL.helpers.pad2(this.minute) + ':' +
                    ICAL.helpers.pad2(this.second);

        if (this.zone === ICAL.Timezone.utcTimezone) {
          result += 'Z';
        }
      }

      return result;
    },

    toJSDate: function toJSDate() {
      if (this.zone == ICAL.Timezone.localTimezone) {
        if (this.isDate) {
          return new Date(this.year, this.month - 1, this.day);
        } else {
          return new Date(this.year, this.month - 1, this.day,
                          this.hour, this.minute, this.second, 0);
        }
      } else {
        return new Date(this.toUnixTime() * 1000);
      }
    },

    _normalize: function icaltime_normalize() {
      var isDate = this._time.isDate;
      if (this._time.isDate) {
        this._time.hour = 0;
        this._time.minute = 0;
        this._time.second = 0;
      }
      this.adjust(0, 0, 0, 0);

      return this;
    },

    adjust: function icaltime_adjust(aExtraDays, aExtraHours,
                                     aExtraMinutes, aExtraSeconds, aTime) {

      var minutesOverflow, hoursOverflow,
          daysOverflow = 0, yearsOverflow = 0;

      var second, minute, hour, day;
      var daysInMonth;

      var time = aTime || this._time;

      if (!time.isDate) {
        second = time.second + aExtraSeconds;
        time.second = second % 60;
        minutesOverflow = ICAL.helpers.trunc(second / 60);
        if (time.second < 0) {
          time.second += 60;
          minutesOverflow--;
        }

        minute = time.minute + aExtraMinutes + minutesOverflow;
        time.minute = minute % 60;
        hoursOverflow = ICAL.helpers.trunc(minute / 60);
        if (time.minute < 0) {
          time.minute += 60;
          hoursOverflow--;
        }

        hour = time.hour + aExtraHours + hoursOverflow;

        time.hour = hour % 24;
        daysOverflow = ICAL.helpers.trunc(hour / 24);
        if (time.hour < 0) {
          time.hour += 24;
          daysOverflow--;
        }
      }


      // Adjust month and year first, because we need to know what month the day
      // is in before adjusting it.
      if (time.month > 12) {
        yearsOverflow = ICAL.helpers.trunc((time.month - 1) / 12);
      } else if (time.month < 1) {
        yearsOverflow = ICAL.helpers.trunc(time.month / 12) - 1;
      }

      time.year += yearsOverflow;
      time.month -= 12 * yearsOverflow;

      // Now take care of the days (and adjust month if needed)
      day = time.day + aExtraDays + daysOverflow;

      if (day > 0) {
        for (;;) {
          var daysInMonth = ICAL.Time.daysInMonth(time.month, time.year);
          if (day <= daysInMonth) {
            break;
          }

          time.month++;
          if (time.month > 12) {
            time.year++;
            time.month = 1;
          }

          day -= daysInMonth;
        }
      } else {
        while (day <= 0) {
          if (time.month == 1) {
            time.year--;
            time.month = 12;
          } else {
            time.month--;
          }

          day += ICAL.Time.daysInMonth(time.month, time.year);
        }
      }

      time.day = day;
      return this;
    },

    fromUnixTime: function fromUnixTime(seconds) {
      this.zone = ICAL.Timezone.utcTimezone;
      var epoch = ICAL.Time.epochTime.clone();
      epoch.adjust(0, 0, 0, seconds);

      this.year = epoch.year;
      this.month = epoch.month;
      this.day = epoch.day;
      this.hour = epoch.hour;
      this.minute = epoch.minute;
      this.second = epoch.second;
    },

    toUnixTime: function toUnixTime() {
      var offset = this.utcOffset();

      // we use the offset trick to ensure
      // that we are getting the actual UTC time
      var ms = Date.UTC(
        this.year,
        this.month - 1,
        this.day,
        this.hour,
        this.minute,
        this.second - offset
      );

      // seconds
      return ms / 1000;
    },

    /**
     * Converts time to into Object
     * which can be serialized then re-created
     * using the constructor.
     *
     * Example:
     *
     *    // toJSON will automatically be called
     *    var json = JSON.stringify(mytime);
     *
     *    var deserialized = JSON.parse(json);
     *
     *    var time = new ICAL.Time(deserialized);
     *
     */
    toJSON: function() {
      var copy = [
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'isDate'
      ];

      var result = Object.create(null);

      var i = 0;
      var len = copy.length;
      var prop;

      for (; i < len; i++) {
        prop = copy[i];
        result[prop] = this[prop];
      }

      if (this.zone) {
        result.timezone = this.zone.tzid;
      }

      return result;
    }

  };

  (function setupNormalizeAttributes() {
    // This needs to run before any instances are created!
    function defineAttr(attr) {
      Object.defineProperty(ICAL.Time.prototype, attr, {
        get: function getTimeAttr() {
          if (this._pendingNormalization) {
            this._normalize();
            this._pendingNormalization = false;
          }

          return this._time[attr];
        },
        set: function setTimeAttr(val) {
          this._pendingNormalization = true;
          this._time[attr] = val;

          return val;
        }
      });

    }

    if ("defineProperty" in Object) {
      defineAttr("year");
      defineAttr("month");
      defineAttr("day");
      defineAttr("hour");
      defineAttr("minute");
      defineAttr("second");
      defineAttr("isDate");
    }
  })();

  ICAL.Time.daysInMonth = function icaltime_daysInMonth(month, year) {
    var _daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var days = 30;

    if (month < 1 || month > 12) return days;

    days = _daysInMonth[month];

    if (month == 2) {
      days += ICAL.Time.is_leap_year(year);
    }

    return days;
  };

  ICAL.Time.is_leap_year = function icaltime_is_leap_year(year) {
    if (year <= 1752) {
      return ((year % 4) == 0);
    } else {
      return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
    }
  };

  ICAL.Time.fromDayOfYear = function icaltime_fromDayOfYear(aDayOfYear, aYear) {
    var year = aYear;
    var doy = aDayOfYear;
    var tt = new ICAL.Time();
    tt.auto_normalize = false;
    var is_leap = (ICAL.Time.is_leap_year(year) ? 1 : 0);

    if (doy < 1) {
      year--;
      is_leap = (ICAL.Time.is_leap_year(year) ? 1 : 0);
      doy += ICAL.Time._days_in_year_passed_month[is_leap][12];
    } else if (doy > ICAL.Time._days_in_year_passed_month[is_leap][12]) {
      is_leap = (ICAL.Time.is_leap_year(year) ? 1 : 0);
      doy -= ICAL.Time._days_in_year_passed_month[is_leap][12];
      year++;
    }

    tt.year = year;
    tt.isDate = true;

    for (var month = 11; month >= 0; month--) {
      if (doy > ICAL.Time._days_in_year_passed_month[is_leap][month]) {
        tt.month = month + 1;
        tt.day = doy - ICAL.Time._days_in_year_passed_month[is_leap][month];
        break;
      }
    }

    tt.auto_normalize = true;
    return tt;
  };

  ICAL.Time.fromStringv2 = function fromString(str) {
    return new ICAL.Time({
      year: parseInt(str.substr(0, 4), 10),
      month: parseInt(str.substr(5, 2), 10),
      day: parseInt(str.substr(8, 2), 10),
      isDate: true
    });
  };

  ICAL.Time.fromDateString = function(aValue, aProp) {
    // Dates should have no timezone.
    // Google likes to sometimes specify Z on dates
    // we specifically ignore that to avoid issues.

    // YYYY-MM-DD
    // 2012-10-10
    return new ICAL.Time({
      year: ICAL.helpers.strictParseInt(aValue.substr(0, 4)),
      month: ICAL.helpers.strictParseInt(aValue.substr(5, 2)),
      day: ICAL.helpers.strictParseInt(aValue.substr(8, 2)),
      isDate: true
    });
  };

  ICAL.Time.fromDateTimeString = function(aValue, prop) {
    if (aValue.length < 19) {
      throw new Error(
        'invalid date-time value: "' + aValue + '"'
      );
    }

    var zone;

    if (aValue[19] === 'Z') {
      zone = 'Z';
    } else if (prop) {
      zone = prop.getParameter('tzid');
    }

    // 2012-10-10T10:10:10(Z)?
    var time = new ICAL.Time({
      year: ICAL.helpers.strictParseInt(aValue.substr(0, 4)),
      month: ICAL.helpers.strictParseInt(aValue.substr(5, 2)),
      day: ICAL.helpers.strictParseInt(aValue.substr(8, 2)),
      hour: ICAL.helpers.strictParseInt(aValue.substr(11, 2)),
      minute: ICAL.helpers.strictParseInt(aValue.substr(14, 2)),
      second: ICAL.helpers.strictParseInt(aValue.substr(17, 2)),
      timezone: zone
    });

    return time;
  };

  ICAL.Time.fromString = function fromString(aValue) {
    if (aValue.length > 10) {
      return ICAL.Time.fromDateTimeString(aValue);
    } else {
      return ICAL.Time.fromDateString(aValue);
    }
  };

  ICAL.Time.fromJSDate = function fromJSDate(aDate, useUTC) {
    var tt = new ICAL.Time();
    return tt.fromJSDate(aDate, useUTC);
  };

  ICAL.Time.fromData = function fromData(aData) {
    var t = new ICAL.Time();
    return t.fromData(aData);
  };

  ICAL.Time.now = function icaltime_now() {
    return ICAL.Time.fromJSDate(new Date(), false);
  };

  ICAL.Time.weekOneStarts = function weekOneStarts(aYear, aWeekStart) {
    var t = ICAL.Time.fromData({
      year: aYear,
      month: 1,
      day: 4,
      isDate: true
    });

    var fourth_dow = t.dayOfWeek();
    t.day += (1 - fourth_dow) + ((aWeekStart || ICAL.Time.SUNDAY) - 1);
    return t;
  };

  ICAL.Time.epochTime = ICAL.Time.fromData({
    year: 1970,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    isDate: false,
    timezone: "Z"
  });

  ICAL.Time._cmp_attr = function _cmp_attr(a, b, attr) {
    if (a[attr] > b[attr]) return 1;
    if (a[attr] < b[attr]) return -1;
    return 0;
  };

  ICAL.Time._days_in_year_passed_month = [
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
    [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]
  ];


  ICAL.Time.SUNDAY = 1;
  ICAL.Time.MONDAY = 2;
  ICAL.Time.TUESDAY = 3;
  ICAL.Time.WEDNESDAY = 4;
  ICAL.Time.THURSDAY = 5;
  ICAL.Time.FRIDAY = 6;
  ICAL.Time.SATURDAY = 7;

  ICAL.Time.DEFAULT_WEEK_START = ICAL.Time.MONDAY;
})();
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2011-2012 */



(typeof(ICAL) === 'undefined')? ICAL = {} : '';
(function() {

  var DOW_MAP = {
    SU: ICAL.Time.SUNDAY,
    MO: ICAL.Time.MONDAY,
    TU: ICAL.Time.TUESDAY,
    WE: ICAL.Time.WEDNESDAY,
    TH: ICAL.Time.THURSDAY,
    FR: ICAL.Time.FRIDAY,
    SA: ICAL.Time.SATURDAY
  };

  var REVERSE_DOW_MAP = {};
  for (var key in DOW_MAP) {
    REVERSE_DOW_MAP[DOW_MAP[key]] = key;
  }

  var COPY_PARTS = ["BYSECOND", "BYMINUTE", "BYHOUR", "BYDAY",
                    "BYMONTHDAY", "BYYEARDAY", "BYWEEKNO",
                    "BYMONTH", "BYSETPOS"];

  ICAL.Recur = function icalrecur(data) {
    this.wrappedJSObject = this;
    this.parts = {};

    if (typeof(data) === 'object') {
      for (var key in data) {
        this[key] = data[key];
      }

      if (this.until && !(this.until instanceof ICAL.Time)) {
        this.until = new ICAL.Time(this.until);
      }
    }

    if (!this.parts) {
      this.parts = {};
    }
  };

  ICAL.Recur.prototype = {

    parts: null,

    interval: 1,
    wkst: ICAL.Time.MONDAY,
    until: null,
    count: null,
    freq: null,
    icalclass: "icalrecur",
    icaltype: "recur",

    iterator: function(aStart) {
      return new ICAL.RecurIterator({
        rule: this,
        dtstart: aStart
      });
    },

    clone: function clone() {
      return new ICAL.Recur(this.toJSON());
    },

    isFinite: function isfinite() {
      return !!(this.count || this.until);
    },

    isByCount: function isbycount() {
      return !!(this.count && !this.until);
    },

    addComponent: function addPart(aType, aValue) {
      if (!(aType in this.parts)) {
        this.parts[aType] = [aValue];
      } else {
        this.parts[aType].push(aValue);
      }
    },

    setComponent: function setComponent(aType, aValues) {
      this.parts[aType] = aValues;
    },

    getComponent: function getComponent(aType, aCount) {
      var ucName = aType.toUpperCase();
      var components = (ucName in this.parts ? this.parts[ucName] : []);

      if (aCount) aCount.value = components.length;
      return components;
    },

    getNextOccurrence: function getNextOccurrence(aStartTime, aRecurrenceId) {
      var iter = this.iterator(aStartTime);
      var next, cdt;

      do {
        next = iter.next();
      } while (next && next.compare(aRecurrenceId) <= 0);

      if (next && aRecurrenceId.zone) {
        next.zone = aRecurrenceId.zone;
      }

      return next;
    },

    toJSON: function() {
      //XXX: extract this list up to proto?
      var propsToCopy = [
        "freq",
        "count",
        "until",
        "wkst",
        "interval",
        "parts"
      ];

      var result = Object.create(null);

      var i = 0;
      var len = propsToCopy.length;
      var prop;

      for (; i < len; i++) {
        var prop = propsToCopy[i];
        result[prop] = this[prop];
      }

      if (result.until instanceof ICAL.Time) {
        result.until = result.until.toJSON();
      }

      return result;
    },

    toString: function icalrecur_toString() {
      // TODO retain order
      var str = "FREQ=" + this.freq;
      if (this.count) {
        str += ";COUNT=" + this.count;
      }
      if (this.interval > 1) {
        str += ";INTERVAL=" + this.interval;
      }
      for (var k in this.parts) {
        str += ";" + k + "=" + this.parts[k];
      }
      if (this.until ){
        str += ';UNTIL=' + this.until.toString();
      }
      if ('wkst' in this && this.wkst !== ICAL.Time.DEFAULT_WEEK_START) {
        str += ';WKST=' + ICAL.Recur.numericDayToIcalDay(this.wkst);
      }
      return str;
    }
  };

  function parseNumericValue(type, min, max, value) {
    var result = value;

    if (value[0] === '+') {
      result = value.substr(1);
    }

    result = ICAL.helpers.strictParseInt(result);

    if (min !== undefined && value < min) {
      throw new Error(
        type + ': invalid value "' + value + '" must be > ' + min
      );
    }

    if (max !== undefined && value > max) {
      throw new Error(
        type + ': invalid value "' + value + '" must be < ' + min
      );
    }

    return result;
  }

  /**
   * Convert an ical representation of a day (SU, MO, etc..)
   * into a numeric value of that day.
   *
   * @param {String} day ical day.
   * @return {Numeric} numeric value of given day.
   */
  ICAL.Recur.icalDayToNumericDay = function toNumericDay(string) {
    //XXX: this is here so we can deal
    //     with possibly invalid string values.

    return DOW_MAP[string];
  };

  /**
   * Convert a numeric day value into its ical representation (SU, MO, etc..)
   *
   * @param {Numeric} numeric value of given day.
   * @return {String} day ical day.
   */
  ICAL.Recur.numericDayToIcalDay = function toIcalDay(num) {
    //XXX: this is here so we can deal with possibly invalid number values.
    //     Also, this allows consistent mapping between day numbers and day
    //     names for external users.
    return REVERSE_DOW_MAP[num];
  };

  var VALID_DAY_NAMES = /^(SU|MO|TU|WE|TH|FR|SA)$/;
  var VALID_BYDAY_PART = /^([+-])?(5[0-3]|[1-4][0-9]|[1-9])?(SU|MO|TU|WE|TH|FR|SA)$/;
  var ALLOWED_FREQ = ['SECONDLY', 'MINUTELY', 'HOURLY',
                      'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

  var optionDesign = {
    FREQ: function(value, dict) {
      // yes this is actually equal or faster then regex.
      // upside here is we can enumerate the valid values.
      if (ALLOWED_FREQ.indexOf(value) !== -1) {
        dict.freq = value;
      } else {
        throw new Error(
          'invalid frequency "' + value + '" expected: "' +
          ALLOWED_FREQ.join(', ') + '"'
        );
      }
    },

    COUNT: function(value, dict) {
      dict.count = ICAL.helpers.strictParseInt(value);
    },

    INTERVAL: function(value, dict) {
      dict.interval = ICAL.helpers.strictParseInt(value);
      if (dict.interval < 1) {
        // 0 or negative values are not allowed, some engines seem to generate
        // it though. Assume 1 instead.
        dict.interval = 1;
      }
    },

    UNTIL: function(value, dict) {
      dict.until = ICAL.Time.fromString(value);
    },

    WKST: function(value, dict) {
      if (VALID_DAY_NAMES.test(value)) {
        dict.wkst = ICAL.Recur.icalDayToNumericDay(value);
      } else {
        throw new Error('invalid WKST value "' + value + '"');
      }
    }
  };

  var partDesign = {
    BYSECOND: parseNumericValue.bind(this, 'BYSECOND', 0, 60),
    BYMINUTE: parseNumericValue.bind(this, 'BYMINUTE', 0, 59),
    BYHOUR: parseNumericValue.bind(this, 'BYHOUR', 0, 23),
    BYDAY: function(value) {
      if (VALID_BYDAY_PART.test(value)) {
        return value;
      } else {
        throw new Error('invalid BYDAY value "' + value + '"');
      }
    },
    BYMONTHDAY: parseNumericValue.bind(this, 'BYMONTHDAY', -31, 31),
    BYYEARDAY: parseNumericValue.bind(this, 'BYYEARDAY', -366, 366),
    BYWEEKNO: parseNumericValue.bind(this, 'BYWEEKNO', -53, 53),
    BYMONTH: parseNumericValue.bind(this, 'BYMONTH', 0, 12),
    BYSETPOS: parseNumericValue.bind(this, 'BYSETPOS', -366, 366)
  };

  ICAL.Recur.fromString = function(string) {
    var dict = Object.create(null);
    var dictParts = dict.parts = Object.create(null);

    // split is slower in FF but fast enough.
    // v8 however this is faster then manual split?
    var values = string.split(';');
    var len = values.length;

    for (var i = 0; i < len; i++) {
      var parts = values[i].split('=');
      var name = parts[0];
      var value = parts[1];

      if (name in partDesign) {
        var partArr = value.split(',');
        var partArrIdx = 0;
        var partArrLen = partArr.length;

        for (; partArrIdx < partArrLen; partArrIdx++) {
          partArr[partArrIdx] = partDesign[name](partArr[partArrIdx]);
        }
        dictParts[name] = partArr;
      } else if (name in optionDesign) {
        optionDesign[name](value, dict);
      }
    }

    return new ICAL.Recur(dict);
  };

})();
ICAL.RecurIterator = (function() {

  /**
   * Options:
   *  - rule: (ICAL.Recur) instance
   *  - dtstart: (ICAL.Time) start date of recurrence rule
   *  - initialized: (Boolean) when true will assume options
   *                           are from previously constructed
   *                           iterator and will not re-initialize
   *                           iterator but resume its state from given data.
   *
   *  - by_data: (for iterator de-serialization)
   *  - days: "
   *  - last: "
   *  - by_indices: "
   */
  function icalrecur_iterator(options) {
    this.fromData(options);
  }

  icalrecur_iterator.prototype = {

    /**
     * True when iteration is finished.
     */
    completed: false,

    rule: null,
    dtstart: null,
    last: null,
    occurrence_number: 0,
    by_indices: null,
    initialized: false,
    by_data: null,

    days: null,
    days_index: 0,

    fromData: function(options) {
      this.rule = ICAL.helpers.formatClassType(options.rule, ICAL.Recur);

      if (!this.rule) {
        throw new Error('iterator requires a (ICAL.Recur) rule');
      }

      this.dtstart = ICAL.helpers.formatClassType(options.dtstart, ICAL.Time);

      if (!this.dtstart) {
        throw new Error('iterator requires a (ICAL.Time) dtstart');
      }

      if (options.by_data) {
        this.by_data = options.by_data;
      } else {
        this.by_data = ICAL.helpers.clone(this.rule.parts, true);
      }

      if (options.occurrence_number)
        this.occurrence_number = options.occurrence_number;

      this.days = options.days || [];
      this.last = ICAL.helpers.formatClassType(options.last, ICAL.Time);

      this.by_indices = options.by_indices;

      if (!this.by_indices) {
        this.by_indices = {
          "BYSECOND": 0,
          "BYMINUTE": 0,
          "BYHOUR": 0,
          "BYDAY": 0,
          "BYMONTH": 0,
          "BYWEEKNO": 0,
          "BYMONTHDAY": 0
        };
      }

      this.initialized = options.initialized || false;

      if (!this.initialized) {
        this.init();
      }
    },

    init: function icalrecur_iterator_init() {
      this.initialized = true;
      this.last = this.dtstart.clone();
      var parts = this.by_data;

      if ("BYDAY" in parts) {
        // libical does this earlier when the rule is loaded, but we postpone to
        // now so we can preserve the original order.
        this.sort_byday_rules(parts.BYDAY, this.rule.wkst);
      }

      // If the BYYEARDAY appares, no other date rule part may appear
      if ("BYYEARDAY" in parts) {
        if ("BYMONTH" in parts || "BYWEEKNO" in parts ||
            "BYMONTHDAY" in parts || "BYDAY" in parts) {
          throw new Error("Invalid BYYEARDAY rule");
        }
      }

      // BYWEEKNO and BYMONTHDAY rule parts may not both appear
      if ("BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
        throw new Error("BYWEEKNO does not fit to BYMONTHDAY");
      }

      // For MONTHLY recurrences (FREQ=MONTHLY) neither BYYEARDAY nor
      // BYWEEKNO may appear.
      if (this.rule.freq == "MONTHLY" &&
          ("BYYEARDAY" in parts || "BYWEEKNO" in parts)) {
        throw new Error("For MONTHLY recurrences neither BYYEARDAY nor BYWEEKNO may appear");
      }

      // For WEEKLY recurrences (FREQ=WEEKLY) neither BYMONTHDAY nor
      // BYYEARDAY may appear.
      if (this.rule.freq == "WEEKLY" &&
          ("BYYEARDAY" in parts || "BYMONTHDAY" in parts)) {
        throw new Error("For WEEKLY recurrences neither BYMONTHDAY nor BYYEARDAY may appear");
      }

      // BYYEARDAY may only appear in YEARLY rules
      if (this.rule.freq != "YEARLY" && "BYYEARDAY" in parts) {
        throw new Error("BYYEARDAY may only appear in YEARLY rules");
      }

      this.last.second = this.setup_defaults("BYSECOND", "SECONDLY", this.dtstart.second);
      this.last.minute = this.setup_defaults("BYMINUTE", "MINUTELY", this.dtstart.minute);
      this.last.hour = this.setup_defaults("BYHOUR", "HOURLY", this.dtstart.hour);
      this.last.day = this.setup_defaults("BYMONTHDAY", "DAILY", this.dtstart.day);
      this.last.month = this.setup_defaults("BYMONTH", "MONTHLY", this.dtstart.month);

      if (this.rule.freq == "WEEKLY") {
        if ("BYDAY" in parts) {
          var parts = this.ruleDayOfWeek(parts.BYDAY[0]);
          var pos = parts[0];
          var rule_dow = parts[1];
          var dow = rule_dow - this.last.dayOfWeek();
          if ((this.last.dayOfWeek() < rule_dow && dow >= 0) || dow < 0) {
            // Initial time is after first day of BYDAY data
            this.last.day += dow;
          }
        } else {
          var dayName = ICAL.Recur.numericDayToIcalDay(this.dtstart.dayOfWeek());
          parts.BYDAY = [dayName];
        }
      }

      if (this.rule.freq == "YEARLY") {
        for (;;) {
          this.expand_year_days(this.last.year);
          if (this.days.length > 0) {
            break;
          }
          this.increment_year(this.rule.interval);
        }

        var next = ICAL.Time.fromDayOfYear(this.days[0], this.last.year);

        this.last.day = next.day;
        this.last.month = next.month;
      }

      if (this.rule.freq == "MONTHLY" && this.has_by_data("BYDAY")) {

        var coded_day = this.by_data.BYDAY[this.by_indices.BYDAY];
        var parts = this.ruleDayOfWeek(coded_day);
        var pos = parts[0];
        var dow = parts[1];

        var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);
        var poscount = 0;

        if (pos >= 0) {
          for (this.last.day = 1; this.last.day <= daysInMonth; this.last.day++) {
            if (this.last.dayOfWeek() == dow) {
              if (++poscount == pos || pos == 0) {
                break;
              }
            }
          }
        } else {
          pos = -pos;
          for (this.last.day = daysInMonth; this.last.day != 0; this.last.day--) {
            if (this.last.dayOfWeek() == dow) {
              if (++poscount == pos) {
                break;
              }
            }
          }
        }

        //XXX: This feels like a hack, but we need to initialize
        //     the BYMONTHDAY case correctly and byDayAndMonthDay handles
        //     this case. It accepts a special flag which will avoid incrementing
        //     the initial value without the flag days that match the start time
        //     would be missed.
        if (this.has_by_data('BYMONTHDAY')) {
          this._byDayAndMonthDay(true);
        }

        if (this.last.day > daysInMonth || this.last.day == 0) {
          throw new Error("Malformed values in BYDAY part");
        }

      } else if (this.has_by_data("BYMONTHDAY")) {
        if (this.last.day < 0) {
          var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);
          this.last.day = daysInMonth + this.last.day + 1;
        }
      }

    },

    next: function icalrecur_iterator_next() {
      var before = (this.last ? this.last.clone() : null);

      if ((this.rule.count && this.occurrence_number >= this.rule.count) ||
          (this.rule.until && this.last.compare(this.rule.until) > 0)) {

        //XXX: right now this is just a flag and has no impact
        //     we can simplify the above case to check for completed later.
        this.completed = true;

        return null;
      }

      if (this.occurrence_number == 0 && this.last.compare(this.dtstart) >= 0) {
        // First of all, give the instance that was initialized
        this.occurrence_number++;
        return this.last;
      }

      do {
        var valid = 1;

        switch (this.rule.freq) {
        case "SECONDLY":
          this.next_second();
          break;
        case "MINUTELY":
          this.next_minute();
          break;
        case "HOURLY":
          this.next_hour();
          break;
        case "DAILY":
          this.next_day();
          break;
        case "WEEKLY":
          this.next_week();
          break;
        case "MONTHLY":
          valid = this.next_month();
          break;
        case "YEARLY":
          this.next_year();
          break;

        default:
          return null;
        }
      } while (!this.check_contracting_rules() ||
               this.last.compare(this.dtstart) < 0 ||
               !valid);

      // TODO is this valid?
      if (this.last.compare(before) == 0) {
        throw new Error("Same occurrence found twice, protecting " +
                        "you from death by recursion");
      }

      if (this.rule.until && this.last.compare(this.rule.until) > 0) {
        this.completed = true;
        return null;
      } else {
        this.occurrence_number++;
        return this.last;
      }
    },

    next_second: function next_second() {
      return this.next_generic("BYSECOND", "SECONDLY", "second", "minute");
    },

    increment_second: function increment_second(inc) {
      return this.increment_generic(inc, "second", 60, "minute");
    },

    next_minute: function next_minute() {
      return this.next_generic("BYMINUTE", "MINUTELY",
                               "minute", "hour", "next_second");
    },

    increment_minute: function increment_minute(inc) {
      return this.increment_generic(inc, "minute", 60, "hour");
    },

    next_hour: function next_hour() {
      return this.next_generic("BYHOUR", "HOURLY", "hour",
                               "monthday", "next_minute");
    },

    increment_hour: function increment_hour(inc) {
      this.increment_generic(inc, "hour", 24, "monthday");
    },

    next_day: function next_day() {
      var has_by_day = ("BYDAY" in this.by_data);
      var this_freq = (this.rule.freq == "DAILY");

      if (this.next_hour() == 0) {
        return 0;
      }

      if (this_freq) {
        this.increment_monthday(this.rule.interval);
      } else {
        this.increment_monthday(1);
      }

      return 0;
    },

    next_week: function next_week() {
      var end_of_data = 0;

      if (this.next_weekday_by_week() == 0) {
        return end_of_data;
      }

      if (this.has_by_data("BYWEEKNO")) {
        var idx = ++this.by_indices.BYWEEKNO;

        if (this.by_indices.BYWEEKNO == this.by_data.BYWEEKNO.length) {
          this.by_indices.BYWEEKNO = 0;
          end_of_data = 1;
        }

        // HACK should be first month of the year
        this.last.month = 1;
        this.last.day = 1;

        var week_no = this.by_data.BYWEEKNO[this.by_indices.BYWEEKNO];

        this.last.day += 7 * week_no;

        if (end_of_data) {
          this.increment_year(1);
        }
      } else {
        // Jump to the next week
        this.increment_monthday(7 * this.rule.interval);
      }

      return end_of_data;
    },

    /**
     * normalize each by day rule for a given year/month.
     * Takes into account ordering and negative rules
     *
     * @param {Numeric} year current year.
     * @param {Numeric} month current month.
     * @param {Array} rules array of rules.
     *
     * @return {Array} sorted and normalized rules.
     *                 Negative rules will be expanded to their
     *                 correct positive values for easier processing.
     */
    normalizeByMonthDayRules: function(year, month, rules) {
      var daysInMonth = ICAL.Time.daysInMonth(month, year);

      // XXX: This is probably bad for performance to allocate
      //      a new array for each month we scan, if possible
      //      we should try to optimize this...
      var newRules = [];

      var ruleIdx = 0;
      var len = rules.length;
      var rule;

      for (; ruleIdx < len; ruleIdx++) {
        rule = rules[ruleIdx];

        // if this rule falls outside of given
        // month discard it.
        if (Math.abs(rule) > daysInMonth) {
          continue;
        }

        // negative case
        if (rule < 0) {
          // we add (not subtract its a negative number)
          // one from the rule because 1 === last day of month
          rule = daysInMonth + (rule + 1);
        } else if (rule === 0) {
          // skip zero its invalid.
          continue;
        }

        // only add unique items...
        if (newRules.indexOf(rule) === -1) {
          newRules.push(rule);
        }

      }

      // unique and sort
      return newRules.sort(function(a,b){return a - b});
    },

    /**
     * NOTES:
     * We are given a list of dates in the month (BYMONTHDAY) (23, etc..)
     * Also we are given a list of days (BYDAY) (MO, 2SU, etc..) when
     * both conditions match a given date (this.last.day) iteration stops.
     *
     * @param {Boolean} [isInit] when given true will not
     *                           increment the current day (this.last).
     */
    _byDayAndMonthDay: function(isInit) {
      var byMonthDay; // setup in initMonth
      var byDay = this.by_data.BYDAY;

      var date;
      var dateIdx = 0;
      var dateLen; // setup in initMonth
      var dayLen = byDay.length;

      // we are not valid by default
      var dataIsValid = 0;

      var daysInMonth;
      var self = this;
      // we need a copy of this, because a DateTime gets normalized
      // automatically if the day is out of range. At some points we 
      // set the last day to 0 to start counting.
      var lastDay = this.last.day;

      function initMonth() {
        daysInMonth = ICAL.Time.daysInMonth(
          self.last.month, self.last.year
        );

        byMonthDay = self.normalizeByMonthDayRules(
          self.last.year,
          self.last.month,
          self.by_data.BYMONTHDAY
        );

        dateLen = byMonthDay.length;

        // For the case of more than one occurrence in one month
        // we have to be sure to start searching after the last
        // found date or at the last BYMONTHDAY.
        while (byMonthDay[dateIdx] <= lastDay && dateIdx < dateLen - 1) {
          dateIdx++;
        }
      }

      function nextMonth() {
        // since the day is incremented at the start
        // of the loop below, we need to start at 0
        lastDay = 0;
        self.increment_month();
        dateIdx = 0;
        initMonth();
      }

      initMonth();

      // should come after initMonth
      if (isInit) {
        lastDay -= 1;
      }

      while (!dataIsValid) {
        // increment the current date. This is really
        // important otherwise we may fall into the infinite
        // loop trap. The initial date takes care of the case
        // where the current date is the date we are looking
        // for.
        date = lastDay + 1;

        if (date > daysInMonth) {
          nextMonth();
          continue;
        }

        // find next date
        var next = byMonthDay[dateIdx++];

        // this logic is dependant on the BYMONTHDAYS
        // being in order (which is done by #normalizeByMonthDayRules)
        if (next >= date) {
          // if the next month day is in the future jump to it.
          lastDay = next;
        } else {
          // in this case the 'next' monthday has past
          // we must move to the month.
          nextMonth();
          continue;
        }

        // Now we can loop through the day rules to see
        // if one matches the current month date.
        for (var dayIdx = 0; dayIdx < dayLen; dayIdx++) {
          var parts = this.ruleDayOfWeek(byDay[dayIdx]);
          var pos = parts[0];
          var dow = parts[1];

          this.last.day = lastDay;
          if (this.last.isNthWeekDay(dow, pos)) {
            // when we find the valid one we can mark
            // the conditions as met and break the loop.
            // (Because we have this condition above
            //  it will also break the parent loop).
            dataIsValid = 1;
            break;
          }
        }

        // Its completely possible that the combination
        // cannot be matched in the current month.
        // When we reach the end of possible combinations
        // in the current month we iterate to the next one.
        // since dateIdx is incremented right after getting
        // "next", we don't need dateLen -1 here.
        if (!dataIsValid && dateIdx === dateLen) {
          nextMonth();
          continue;
        }
      }

      return dataIsValid;
    },

    next_month: function next_month() {
      var this_freq = (this.rule.freq == "MONTHLY");
      var data_valid = 1;

      if (this.next_hour() == 0) {
        return data_valid;
      }

      if (this.has_by_data("BYDAY") && this.has_by_data("BYMONTHDAY")) {
        data_valid = this._byDayAndMonthDay();
      } else if (this.has_by_data("BYDAY")) {
        var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);
        var setpos = 0;

        if (this.has_by_data("BYSETPOS")) {
          var last_day = this.last.day;
          for (var day = 1; day <= daysInMonth; day++) {
            this.last.day = day;
            if (this.is_day_in_byday(this.last) && day <= last_day) {
              setpos++;
            }
          }
          this.last.day = last_day;
        }

        for (var day = this.last.day + 1; day <= daysInMonth; day++) {
          this.last.day = day;

          if (this.is_day_in_byday(this.last)) {
            if (!this.has_by_data("BYSETPOS") ||
                this.check_set_position(++setpos) ||
                this.check_set_position(setpos - this.by_data.BYSETPOS.length - 1)) {

              data_valid = 1;
              break;
            }
          }
        }

        if (day > daysInMonth) {
          this.last.day = 1;
          this.increment_month();

          if (this.is_day_in_byday(this.last)) {
            if (!this.has_by_data("BYSETPOS") || this.check_set_position(1)) {
              data_valid = 1;
            }
          } else {
            data_valid = 0;
          }
        }
      } else if (this.has_by_data("BYMONTHDAY")) {
        this.by_indices.BYMONTHDAY++;

        if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
          this.by_indices.BYMONTHDAY = 0;
          this.increment_month();
        }

        var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);

        var day = this.by_data.BYMONTHDAY[this.by_indices.BYMONTHDAY];

        if (day < 0) {
          day = daysInMonth + day + 1;
        }

        if (day > daysInMonth) {
          this.last.day = 1;
          data_valid = this.is_day_in_byday(this.last);
        } else {
          this.last.day = day;
        }

      } else {
        this.last.day = this.by_data.BYMONTHDAY[0];
        this.increment_month();
        var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);
        this.last.day = Math.min(this.last.day, daysInMonth);
      }

      return data_valid;
    },

    next_weekday_by_week: function next_weekday_by_week() {
      var end_of_data = 0;

      if (this.next_hour() == 0) {
        return end_of_data;
      }

      if (!this.has_by_data("BYDAY")) {
        return 1;
      }

      for (;;) {
        var tt = new ICAL.Time();
        this.by_indices.BYDAY++;

        if (this.by_indices.BYDAY == Object.keys(this.by_data.BYDAY).length) {
          this.by_indices.BYDAY = 0;
          end_of_data = 1;
        }

        var coded_day = this.by_data.BYDAY[this.by_indices.BYDAY];
        var parts = this.ruleDayOfWeek(coded_day);
        var dow = parts[1];

        dow -= this.rule.wkst;

        if (dow < 0) {
          dow += 7;
        }

        tt.year = this.last.year;
        tt.month = this.last.month;
        tt.day = this.last.day;

        var startOfWeek = tt.startDoyWeek(this.rule.wkst);

        if (dow + startOfWeek < 1) {
          // The selected date is in the previous year
          if (!end_of_data) {
            continue;
          }
        }

        var next = ICAL.Time.fromDayOfYear(startOfWeek + dow,
                                                  this.last.year);

        /**
         * The normalization horrors below are due to
         * the fact that when the year/month/day changes
         * it can effect the other operations that come after.
         */
        this.last.year = next.year;
        this.last.month = next.month;
        this.last.day = next.day;

        return end_of_data;
      }
    },

    next_year: function next_year() {

      if (this.next_hour() == 0) {
        return 0;
      }

      if (++this.days_index == this.days.length) {
        this.days_index = 0;
        do {
          this.increment_year(this.rule.interval);
          this.expand_year_days(this.last.year);
        } while (this.days.length == 0);
      }

      var next = ICAL.Time.fromDayOfYear(this.days[this.days_index],
                                                this.last.year);

      this.last.day = next.day;
      this.last.month = next.month;

      return 1;
    },

    ruleDayOfWeek: function ruleDayOfWeek(dow) {
      var matches = dow.match(/([+-]?[0-9])?(MO|TU|WE|TH|FR|SA|SU)/);
      if (matches) {
        var pos = parseInt(matches[1] || 0, 10);
        dow = ICAL.Recur.icalDayToNumericDay(matches[2]);
        return [pos, dow];
      } else {
        return [0, 0];
      }
    },

    next_generic: function next_generic(aRuleType, aInterval, aDateAttr,
                                        aFollowingAttr, aPreviousIncr) {
      var has_by_rule = (aRuleType in this.by_data);
      var this_freq = (this.rule.freq == aInterval);
      var end_of_data = 0;

      if (aPreviousIncr && this[aPreviousIncr]() == 0) {
        return end_of_data;
      }

      if (has_by_rule) {
        this.by_indices[aRuleType]++;
        var idx = this.by_indices[aRuleType];
        var dta = this.by_data[aRuleType];

        if (this.by_indices[aRuleType] == dta.length) {
          this.by_indices[aRuleType] = 0;
          end_of_data = 1;
        }
        this.last[aDateAttr] = dta[this.by_indices[aRuleType]];
      } else if (this_freq) {
        this["increment_" + aDateAttr](this.rule.interval);
      }

      if (has_by_rule && end_of_data && this_freq) {
        this["increment_" + aFollowingAttr](1);
      }

      return end_of_data;
    },

    increment_monthday: function increment_monthday(inc) {
      for (var i = 0; i < inc; i++) {
        var daysInMonth = ICAL.Time.daysInMonth(this.last.month, this.last.year);
        this.last.day++;

        if (this.last.day > daysInMonth) {
          this.last.day -= daysInMonth;
          this.increment_month();
        }
      }
    },

    increment_month: function increment_month() {
      this.last.day = 1;
      if (this.has_by_data("BYMONTH")) {
        this.by_indices.BYMONTH++;

        if (this.by_indices.BYMONTH == this.by_data.BYMONTH.length) {
          this.by_indices.BYMONTH = 0;
          this.increment_year(1);
        }

        this.last.month = this.by_data.BYMONTH[this.by_indices.BYMONTH];
      } else {
        if (this.rule.freq == "MONTHLY") {
          this.last.month += this.rule.interval;
        } else {
          this.last.month++;
        }

        this.last.month--;
        var years = ICAL.helpers.trunc(this.last.month / 12);
        this.last.month %= 12;
        this.last.month++;

        if (years != 0) {
          this.increment_year(years);
        }
      }
    },

    increment_year: function increment_year(inc) {
      this.last.year += inc;
    },

    increment_generic: function increment_generic(inc, aDateAttr,
                                                  aFactor, aNextIncrement) {
      this.last[aDateAttr] += inc;
      var nextunit = ICAL.helpers.trunc(this.last[aDateAttr] / aFactor);
      this.last[aDateAttr] %= aFactor;
      if (nextunit != 0) {
        this["increment_" + aNextIncrement](nextunit);
      }
    },

    has_by_data: function has_by_data(aRuleType) {
      return (aRuleType in this.rule.parts);
    },

    expand_year_days: function expand_year_days(aYear) {
      var t = new ICAL.Time();
      this.days = [];

      // We need our own copy with a few keys set
      var parts = {};
      var rules = ["BYDAY", "BYWEEKNO", "BYMONTHDAY", "BYMONTH", "BYYEARDAY"];
      for (var p in rules) {
        var part = rules[p];
        if (part in this.rule.parts) {
          parts[part] = this.rule.parts[part];
        }
      }

      if ("BYMONTH" in parts && "BYWEEKNO" in parts) {
        var valid = 1;
        var validWeeks = {};
        t.year = aYear;
        t.isDate = true;

        for (var monthIdx = 0; monthIdx < this.by_data.BYMONTH.length; monthIdx++) {
          var month = this.by_data.BYMONTH[monthIdx];
          t.month = month;
          t.day = 1;
          var first_week = t.weekNumber(this.rule.wkst);
          t.day = ICAL.Time.daysInMonth(month, aYear);
          var last_week = t.weekNumber(this.rule.wkst);
          for (monthIdx = first_week; monthIdx < last_week; monthIdx++) {
            validWeeks[monthIdx] = 1;
          }
        }

        for (var weekIdx = 0; weekIdx < this.by_data.BYWEEKNO.length && valid; weekIdx++) {
          var weekno = this.by_data.BYWEEKNO[weekIdx];
          if (weekno < 52) {
            valid &= validWeeks[weekIdx];
          } else {
            valid = 0;
          }
        }

        if (valid) {
          delete parts.BYMONTH;
        } else {
          delete parts.BYWEEKNO;
        }
      }

      var partCount = Object.keys(parts).length;

      if (partCount == 0) {
        var t = this.dtstart.clone();
        t.year = this.last.year;
        this.days.push(t.dayOfYear());
      } else if (partCount == 1 && "BYMONTH" in parts) {
        for (var monthkey in this.by_data.BYMONTH) {
          var t2 = this.dtstart.clone();
          t2.year = aYear;
          t2.month = this.by_data.BYMONTH[monthkey];
          t2.isDate = true;
          this.days.push(t2.dayOfYear());
        }
      } else if (partCount == 1 && "BYMONTHDAY" in parts) {
        for (var monthdaykey in this.by_data.BYMONTHDAY) {
          var t2 = this.dtstart.clone();
          t2.day = this.by_data.BYMONTHDAY[monthdaykey];
          t2.year = aYear;
          t2.isDate = true;
          this.days.push(t2.dayOfYear());
        }
      } else if (partCount == 2 &&
                 "BYMONTHDAY" in parts &&
                 "BYMONTH" in parts) {
        for (var monthkey in this.by_data.BYMONTH) {
          for (var monthdaykey in this.by_data.BYMONTHDAY) {
            t.day = this.by_data.BYMONTHDAY[monthdaykey];
            t.month = this.by_data.BYMONTH[monthkey];
            t.year = aYear;
            t.isDate = true;

            this.days.push(t.dayOfYear());
          }
        }
      } else if (partCount == 1 && "BYWEEKNO" in parts) {
        // TODO unimplemented in libical
      } else if (partCount == 2 &&
                 "BYWEEKNO" in parts &&
                 "BYMONTHDAY" in parts) {
        // TODO unimplemented in libical
      } else if (partCount == 1 && "BYDAY" in parts) {
        this.days = this.days.concat(this.expand_by_day(aYear));
      } else if (partCount == 2 && "BYDAY" in parts && "BYMONTH" in parts) {
        for (var monthkey in this.by_data.BYMONTH) {
          month = this.by_data.BYMONTH[monthkey];
          var daysInMonth = ICAL.Time.daysInMonth(month, aYear);

          t.year = aYear;
          t.month = this.by_data.BYMONTH[monthkey];
          t.day = 1;
          t.isDate = true;

          var first_dow = t.dayOfWeek();
          var doy_offset = t.dayOfYear() - 1;

          t.day = daysInMonth;
          var last_dow = t.dayOfWeek();

          if (this.has_by_data("BYSETPOS")) {
            var set_pos_counter = 0;
            var by_month_day = [];
            for (var day = 1; day <= daysInMonth; day++) {
              t.day = day;
              if (this.is_day_in_byday(t)) {
                by_month_day.push(day);
              }
            }

            for (var spIndex = 0; spIndex < by_month_day.length; spIndex++) {
              if (this.check_set_position(spIndex + 1) ||
                  this.check_set_position(spIndex - by_month_day.length)) {
                this.days.push(doy_offset + by_month_day[spIndex]);
              }
            }
          } else {
            for (var daycodedkey in this.by_data.BYDAY) {
              //TODO: This should return dates in order of occurrence
              //      (1,2,3, etc...) instead of by weekday (su, mo, etc..)
              var coded_day = this.by_data.BYDAY[daycodedkey];
              var parts = this.ruleDayOfWeek(coded_day);
              var pos = parts[0];
              var dow = parts[1];
              var month_day;

              var first_matching_day = ((dow + 7 - first_dow) % 7) + 1;
              var last_matching_day = daysInMonth - ((last_dow + 7 - dow) % 7);

              if (pos == 0) {
                for (var day = first_matching_day; day <= daysInMonth; day += 7) {
                  this.days.push(doy_offset + day);
                }
              } else if (pos > 0) {
                month_day = first_matching_day + (pos - 1) * 7;

                if (month_day <= daysInMonth) {
                  this.days.push(doy_offset + month_day);
                }
              } else {
                month_day = last_matching_day + (pos + 1) * 7;

                if (month_day > 0) {
                  this.days.push(doy_offset + month_day);
                }
              }
            }
          }
        }
      } else if (partCount == 2 && "BYDAY" in parts && "BYMONTHDAY" in parts) {
        var expandedDays = this.expand_by_day(aYear);

        for (var daykey in expandedDays) {
          var day = expandedDays[daykey];
          var tt = ICAL.Time.fromDayOfYear(day, aYear);
          if (this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
            this.days.push(day);
          }
        }
      } else if (partCount == 3 &&
                 "BYDAY" in parts &&
                 "BYMONTHDAY" in parts &&
                 "BYMONTH" in parts) {
        var expandedDays = this.expand_by_day(aYear);

        for (var daykey in expandedDays) {
          var day = expandedDays[daykey];
          var tt = ICAL.Time.fromDayOfYear(day, aYear);

          if (this.by_data.BYMONTH.indexOf(tt.month) >= 0 &&
              this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
            this.days.push(day);
          }
        }
      } else if (partCount == 2 && "BYDAY" in parts && "BYWEEKNO" in parts) {
        var expandedDays = this.expand_by_day(aYear);

        for (var daykey in expandedDays) {
          var day = expandedDays[daykey];
          var tt = ICAL.Time.fromDayOfYear(day, aYear);
          var weekno = tt.weekNumber(this.rule.wkst);

          if (this.by_data.BYWEEKNO.indexOf(weekno)) {
            this.days.push(day);
          }
        }
      } else if (partCount == 3 &&
                 "BYDAY" in parts &&
                 "BYWEEKNO" in parts &&
                 "BYMONTHDAY" in parts) {
        // TODO unimplemted in libical
      } else if (partCount == 1 && "BYYEARDAY" in parts) {
        this.days = this.days.concat(this.by_data.BYYEARDAY);
      } else {
        this.days = [];
      }
      return 0;
    },

    expand_by_day: function expand_by_day(aYear) {

      var days_list = [];
      var tmp = this.last.clone();

      tmp.year = aYear;
      tmp.month = 1;
      tmp.day = 1;
      tmp.isDate = true;

      var start_dow = tmp.dayOfWeek();

      tmp.month = 12;
      tmp.day = 31;
      tmp.isDate = true;

      var end_dow = tmp.dayOfWeek();
      var end_year_day = tmp.dayOfYear();

      for (var daykey in this.by_data.BYDAY) {
        var day = this.by_data.BYDAY[daykey];
        var parts = this.ruleDayOfWeek(day);
        var pos = parts[0];
        var dow = parts[1];

        if (pos == 0) {
          var tmp_start_doy = ((dow + 7 - start_dow) % 7) + 1;

          for (var doy = tmp_start_doy; doy <= end_year_day; doy += 7) {
            days_list.push(doy);
          }

        } else if (pos > 0) {
          var first;
          if (dow >= start_dow) {
            first = dow - start_dow + 1;
          } else {
            first = dow - start_dow + 8;
          }

          days_list.push(first + (pos - 1) * 7);
        } else {
          var last;
          pos = -pos;

          if (dow <= end_dow) {
            last = end_year_day - end_dow + dow;
          } else {
            last = end_year_day - end_dow + dow - 7;
          }

          days_list.push(last - (pos - 1) * 7);
        }
      }
      return days_list;
    },

    is_day_in_byday: function is_day_in_byday(tt) {
      for (var daykey in this.by_data.BYDAY) {
        var day = this.by_data.BYDAY[daykey];
        var parts = this.ruleDayOfWeek(day);
        var pos = parts[0];
        var dow = parts[1];
        var this_dow = tt.dayOfWeek();

        if ((pos == 0 && dow == this_dow) ||
            (tt.nthWeekDay(dow, pos) == tt.day)) {
          return 1;
        }
      }

      return 0;
    },

    /**
     * Checks if given value is in BYSETPOS.
     *
     * @param {Numeric} aPos position to check for.
     * @return {Boolean} false unless BYSETPOS rules exist
     *                   and the given value is present in rules.
     */
    check_set_position: function check_set_position(aPos) {
      if (this.has_by_data('BYSETPOS')) {
        var idx = this.by_data.BYSETPOS.indexOf(aPos);
        // negative numbers are not false-y
        return idx !== -1;
      }
      return false;
    },

    sort_byday_rules: function icalrecur_sort_byday_rules(aRules, aWeekStart) {
      for (var i = 0; i < aRules.length; i++) {
        for (var j = 0; j < i; j++) {
          var one = this.ruleDayOfWeek(aRules[j])[1];
          var two = this.ruleDayOfWeek(aRules[i])[1];
          one -= aWeekStart;
          two -= aWeekStart;
          if (one < 0) one += 7;
          if (two < 0) two += 7;

          if (one > two) {
            var tmp = aRules[i];
            aRules[i] = aRules[j];
            aRules[j] = tmp;
          }
        }
      }
    },

    check_contract_restriction: function check_contract_restriction(aRuleType, v) {
      var indexMapValue = icalrecur_iterator._indexMap[aRuleType];
      var ruleMapValue = icalrecur_iterator._expandMap[this.rule.freq][indexMapValue];
      var pass = false;

      if (aRuleType in this.by_data &&
          ruleMapValue == icalrecur_iterator.CONTRACT) {

        var ruleType = this.by_data[aRuleType];

        for (var bydatakey in ruleType) {
          if (ruleType[bydatakey] == v) {
            pass = true;
            break;
          }
        }
      } else {
        // Not a contracting byrule or has no data, test passes
        pass = true;
      }
      return pass;
    },

    check_contracting_rules: function check_contracting_rules() {
      var dow = this.last.dayOfWeek();
      var weekNo = this.last.weekNumber(this.rule.wkst);
      var doy = this.last.dayOfYear();

      return (this.check_contract_restriction("BYSECOND", this.last.second) &&
              this.check_contract_restriction("BYMINUTE", this.last.minute) &&
              this.check_contract_restriction("BYHOUR", this.last.hour) &&
              this.check_contract_restriction("BYDAY", ICAL.Recur.numericDayToIcalDay(dow)) &&
              this.check_contract_restriction("BYWEEKNO", weekNo) &&
              this.check_contract_restriction("BYMONTHDAY", this.last.day) &&
              this.check_contract_restriction("BYMONTH", this.last.month) &&
              this.check_contract_restriction("BYYEARDAY", doy));
    },

    setup_defaults: function setup_defaults(aRuleType, req, deftime) {
      var indexMapValue = icalrecur_iterator._indexMap[aRuleType];
      var ruleMapValue = icalrecur_iterator._expandMap[this.rule.freq][indexMapValue];

      if (ruleMapValue != icalrecur_iterator.CONTRACT) {
        if (!(aRuleType in this.by_data)) {
          this.by_data[aRuleType] = [deftime];
        }
        if (this.rule.freq != req) {
          return this.by_data[aRuleType][0];
        }
      }
      return deftime;
    },

    /**
     * Convert iterator into a serialize-able object.
     * Will preserve current iteration sequence to ensure
     * the seamless continuation of the recurrence rule.
     */
    toJSON: function() {
      var result = Object.create(null);

      result.initialized = this.initialized;
      result.rule = this.rule.toJSON();
      result.dtstart = this.dtstart.toJSON();
      result.by_data = this.by_data;
      result.days = this.days;
      result.last = this.last.toJSON();
      result.by_indices = this.by_indices;
      result.occurrence_number = this.occurrence_number;

      return result;
    }

  };

  icalrecur_iterator._indexMap = {
    "BYSECOND": 0,
    "BYMINUTE": 1,
    "BYHOUR": 2,
    "BYDAY": 3,
    "BYMONTHDAY": 4,
    "BYYEARDAY": 5,
    "BYWEEKNO": 6,
    "BYMONTH": 7,
    "BYSETPOS": 8
  };

  icalrecur_iterator._expandMap = {
    "SECONDLY": [1, 1, 1, 1, 1, 1, 1, 1],
    "MINUTELY": [2, 1, 1, 1, 1, 1, 1, 1],
    "HOURLY": [2, 2, 1, 1, 1, 1, 1, 1],
    "DAILY": [2, 2, 2, 1, 1, 1, 1, 1],
    "WEEKLY": [2, 2, 2, 2, 3, 3, 1, 1],
    "MONTHLY": [2, 2, 2, 2, 2, 3, 3, 1],
    "YEARLY": [2, 2, 2, 2, 2, 2, 2, 2]
  };
  icalrecur_iterator.UNKNOWN = 0;
  icalrecur_iterator.CONTRACT = 1;
  icalrecur_iterator.EXPAND = 2;
  icalrecur_iterator.ILLEGAL = 3;

  return icalrecur_iterator;

}());
ICAL.RecurExpansion = (function() {
  function formatTime(item) {
    return ICAL.helpers.formatClassType(item, ICAL.Time);
  }

  function compareTime(a, b) {
    return a.compare(b);
  }

  function isRecurringComponent(comp) {
    return comp.hasProperty('rdate') ||
           comp.hasProperty('rrule') ||
           comp.hasProperty('recurrence-id');
  }

  /**
   * Primary class for expanding recurring rules.
   * Can take multiple rrules, rdates, exdate(s)
   * and iterate (in order) over each next occurrence.
   *
   * Once initialized this class can also be serialized
   * saved and continue iteration from the last point.
   *
   * NOTE: it is intended that this class is to be used
   *       with ICAL.Event which handles recurrence exceptions.
   *
   * Options:
   *  - dtstart: (ICAL.Time) start time of event (required)
   *  - component: (ICAL.Component) component (required unless resuming)
   *
   * Examples:
   *
   *    // assuming event is a parsed ical component
   *    var event;
   *
   *    var expand = new ICAL.RecurExpansion({
   *      component: event,
   *      start: event.getFirstPropertyValue('DTSTART')
   *    });
   *
   *    // remember there are infinite rules
   *    // so its a good idea to limit the scope
   *    // of the iterations then resume later on.
   *
   *    // next is always an ICAL.Time or null
   *    var next;
   *
   *    while(someCondition && (next = expand.next())) {
   *      // do something with next
   *    }
   *
   *    // save instance for later
   *    var json = JSON.stringify(expand);
   *
   *    //...
   *
   *    // NOTE: if the component's properties have
   *    //       changed you will need to rebuild the
   *    //       class and start over. This only works
   *    //       when the component's recurrence info is the same.
   *    var expand = new ICAL.RecurExpansion(JSON.parse(json));
   *
   *
   * @param {Object} options see options block.
   */
  function RecurExpansion(options) {
    this.ruleDates = [];
    this.exDates = [];
    this.fromData(options);
  }

  RecurExpansion.prototype = {

    /**
     * True when iteration is fully completed.
     */
    complete: false,

    /**
     * Array of rrule iterators.
     *
     * @type Array[ICAL.RecurIterator]
     * @private
     */
    ruleIterators: null,

    /**
     * Array of rdate instances.
     *
     * @type Array[ICAL.Time]
     * @private
     */
    ruleDates: null,

    /**
     * Array of exdate instances.
     *
     * @type Array[ICAL.Time]
     * @private
     */
    exDates: null,

    /**
     * Current position in ruleDates array.
     * @type Numeric
     * @private
     */
    ruleDateInc: 0,

    /**
     * Current position in exDates array
     * @type Numeric
     * @private
     */
    exDateInc: 0,

    /**
     * Current negative date.
     *
     * @type ICAL.Time
     * @private
     */
    exDate: null,

    /**
     * Current additional date.
     *
     * @type ICAL.Time
     * @private
     */
    ruleDate: null,

    /**
     * Start date of recurring rules.
     *
     * @type ICAL.Time
     */
    dtstart: null,

    /**
     * Last expanded time
     *
     * @type ICAL.Time
     */
    last: null,

    fromData: function(options) {
      var start = ICAL.helpers.formatClassType(options.dtstart, ICAL.Time);

      if (!start) {
        throw new Error('.dtstart (ICAL.Time) must be given');
      } else {
        this.dtstart = start;
      }

      if (options.component) {
        this._init(options.component);
      } else {
        this.last = formatTime(options.last);

        this.ruleIterators = options.ruleIterators.map(function(item) {
          return ICAL.helpers.formatClassType(item, ICAL.RecurIterator);
        });

        this.ruleDateInc = options.ruleDateInc;
        this.exDateInc = options.exDateInc;

        if (options.ruleDates) {
          this.ruleDates = options.ruleDates.map(formatTime);
          this.ruleDate = this.ruleDates[this.ruleDateInc];
        }

        if (options.exDates) {
          this.exDates = options.exDates.map(formatTime);
          this.exDate = this.exDates[this.exDateInc];
        }

        if (typeof(options.complete) !== 'undefined') {
          this.complete = options.complete;
        }
      }
    },

    next: function() {
      var iter;
      var ruleOfDay;
      var next;
      var compare;

      var maxTries = 500;
      var currentTry = 0;

      while (true) {
        if (currentTry++ > maxTries) {
          throw new Error(
            'max tries have occured, rule may be impossible to forfill.'
          );
        }

        next = this.ruleDate;
        iter = this._nextRecurrenceIter(this.last);

        // no more matches
        // because we increment the rule day or rule
        // _after_ we choose a value this should be
        // the only spot where we need to worry about the
        // end of events.
        if (!next && !iter) {
          // there are no more iterators or rdates
          this.complete = true;
          break;
        }

        // no next rule day or recurrence rule is first.
        if (!next || (iter && next.compare(iter.last) > 0)) {
          // must be cloned, recur will reuse the time element.
          next = iter.last.clone();
          // move to next so we can continue
          iter.next();
        }

        // if the ruleDate is still next increment it.
        if (this.ruleDate === next) {
          this._nextRuleDay();
        }

        this.last = next;

        // check the negative rules
        if (this.exDate) {
          compare = this.exDate.compare(this.last);

          if (compare < 0) {
            this._nextExDay();
          }

          // if the current rule is excluded skip it.
          if (compare === 0) {
            this._nextExDay();
            continue;
          }
        }

        //XXX: The spec states that after we resolve the final
        //     list of dates we execute exdate this seems somewhat counter
        //     intuitive to what I have seen most servers do so for now
        //     I exclude based on the original date not the one that may
        //     have been modified by the exception.
        return this.last;
      }
    },

    /**
     * Converts object into a serialize-able format.
     */
    toJSON: function() {
      function toJSON(item) {
        return item.toJSON();
      }

      var result = Object.create(null);
      result.ruleIterators = this.ruleIterators.map(toJSON);

      if (this.ruleDates) {
        result.ruleDates = this.ruleDates.map(toJSON);
      }

      if (this.exDates) {
        result.exDates = this.exDates.map(toJSON);
      }

      result.ruleDateInc = this.ruleDateInc;
      result.exDateInc = this.exDateInc;
      result.last = this.last.toJSON();
      result.dtstart = this.dtstart.toJSON();
      result.complete = this.complete;

      return result;
    },


    _extractDates: function(component, property) {
      var result = [];
      var props = component.getAllProperties(property);
      var len = props.length;
      var i = 0;
      var prop;

      var idx;

      for (; i < len; i++) {
        props[i].getValues().forEach(function(prop) {
          idx = ICAL.helpers.binsearchInsert(
            result,
            prop,
            compareTime
          );

          // ordered insert
          result.splice(idx, 0, prop);
        });
      }

      return result;
    },

    _init: function(component) {
      this.ruleIterators = [];

      this.last = this.dtstart.clone();

      // to provide api consistency non-recurring
      // events can also use the iterator though it will
      // only return a single time.
      if (!isRecurringComponent(component)) {
        this.ruleDate = this.last.clone();
        this.complete = true;
        return;
      }

      if (component.hasProperty('rdate')) {
        this.ruleDates = this._extractDates(component, 'rdate');

        // special hack for cases where first rdate is prior
        // to the start date. We only check for the first rdate.
        // This is mostly for google's crazy recurring date logic
        // (contacts birthdays).
        if ((this.ruleDates[0]) &&
            (this.ruleDates[0].compare(this.dtstart) < 0)) {

          this.ruleDateInc = 0;
          this.last = this.ruleDates[0].clone();
        } else {
          this.ruleDateInc = ICAL.helpers.binsearchInsert(
            this.ruleDates,
            this.last,
            compareTime
          );
        }

        this.ruleDate = this.ruleDates[this.ruleDateInc];
      }

      if (component.hasProperty('rrule')) {
        var rules = component.getAllProperties('rrule');
        var i = 0;
        var len = rules.length;

        var rule;
        var iter;

        for (; i < len; i++) {
          rule = rules[i].getFirstValue();
          iter = rule.iterator(this.dtstart);
          this.ruleIterators.push(iter);

          // increment to the next occurrence so future
          // calls to next return times beyond the initial iteration.
          // XXX: I find this suspicious might be a bug?
          iter.next();
        }
      }

      if (component.hasProperty('exdate')) {
        this.exDates = this._extractDates(component, 'exdate');
        // if we have a .last day we increment the index to beyond it.
        this.exDateInc = ICAL.helpers.binsearchInsert(
          this.exDates,
          this.last,
          compareTime
        );

        this.exDate = this.exDates[this.exDateInc];
      }
    },

    _nextExDay: function() {
      this.exDate = this.exDates[++this.exDateInc];
    },

    _nextRuleDay: function() {
      this.ruleDate = this.ruleDates[++this.ruleDateInc];
    },

    /**
     * Find and return the recurrence rule with the most
     * recent event and return it.
     *
     * @return {Object} iterator.
     */
    _nextRecurrenceIter: function() {
      var iters = this.ruleIterators;

      if (iters.length === 0) {
        return null;
      }

      var len = iters.length;
      var iter;
      var iterTime;
      var iterIdx = 0;
      var chosenIter;

      // loop through each iterator
      for (; iterIdx < len; iterIdx++) {
        iter = iters[iterIdx];
        iterTime = iter.last;

        // if iteration is complete
        // then we must exclude it from
        // the search and remove it.
        if (iter.completed) {
          len--;
          if (iterIdx !== 0) {
            iterIdx--;
          }
          iters.splice(iterIdx, 1);
          continue;
        }

        // find the most recent possible choice
        if (!chosenIter || chosenIter.last.compare(iterTime) > 0) {
          // that iterator is saved
          chosenIter = iter;
        }
      }

      // the chosen iterator is returned but not mutated
      // this iterator contains the most recent event.
      return chosenIter;
    }

  };

  return RecurExpansion;

}());
ICAL.Event = (function() {

  function compareRangeException(a, b) {
    if (a[0] > b[0]) return 1;
    if (b[0] > a[0]) return -1;
    return 0;
  }

  function Event(component, options) {
    if (!(component instanceof ICAL.Component)) {
      options = component;
      component = null;
    }

    if (component) {
      this.component = component;
    } else {
      this.component = new ICAL.Component('vevent');
    }

    this._rangeExceptionCache = Object.create(null);
    this.exceptions = Object.create(null);
    this.rangeExceptions = [];

    if (options && options.strictExceptions) {
      this.strictExceptions = options.strictExceptions;
    }

    if (options && options.exceptions) {
      options.exceptions.forEach(this.relateException, this);
    }
  }

  Event.prototype = {

    THISANDFUTURE: 'THISANDFUTURE',

    /**
     * List of related event exceptions.
     *
     * @type Array[ICAL.Event]
     */
    exceptions: null,

    /**
     * When true will verify exceptions are related by their UUID.
     *
     * @type {Boolean}
     */
    strictExceptions: false,

    /**
     * Relates a given event exception to this object.
     * If the given component does not share the UID of
     * this event it cannot be related and will throw an
     * exception.
     *
     * If this component is an exception it cannot have other
     * exceptions related to it.
     *
     * @param {ICAL.Component|ICAL.Event} obj component or event.
     */
    relateException: function(obj) {
      if (this.isRecurrenceException()) {
        throw new Error('cannot relate exception to exceptions');
      }

      if (obj instanceof ICAL.Component) {
        obj = new ICAL.Event(obj);
      }

      if (this.strictExceptions && obj.uid !== this.uid) {
        throw new Error('attempted to relate unrelated exception');
      }

      var id = obj.recurrenceId.toString();

      // we don't sort or manage exceptions directly
      // here the recurrence expander handles that.
      this.exceptions[id] = obj;

      // index RANGE=THISANDFUTURE exceptions so we can
      // look them up later in getOccurrenceDetails.
      if (obj.modifiesFuture()) {
        var item = [
          obj.recurrenceId.toUnixTime(), id
        ];

        // we keep them sorted so we can find the nearest
        // value later on...
        var idx = ICAL.helpers.binsearchInsert(
          this.rangeExceptions,
          item,
          compareRangeException
        );

        this.rangeExceptions.splice(idx, 0, item);
      }
    },

    /**
     * If this record is an exception and has the RANGE=THISANDFUTURE value.
     *
     * @return {Boolean} true when is exception with range.
     */
    modifiesFuture: function() {
      var range = this.component.getFirstPropertyValue('range');
      return range === this.THISANDFUTURE;
    },

    /**
     * Finds the range exception nearest to the given date.
     *
     * @param {ICAL.Time} time usually an occurrence time of an event.
     * @return {ICAL.Event|Null} the related event/exception or null.
     */
    findRangeException: function(time) {
      if (!this.rangeExceptions.length) {
        return null;
      }

      var utc = time.toUnixTime();
      var idx = ICAL.helpers.binsearchInsert(
        this.rangeExceptions,
        [utc],
        compareRangeException
      );

      idx -= 1;

      // occurs before
      if (idx < 0) {
        return null;
      }

      var rangeItem = this.rangeExceptions[idx];

      // sanity check
      if (utc < rangeItem[0]) {
        return null;
      }

      return rangeItem[1];
    },

    /**
     * Returns the occurrence details based on its start time.
     * If the occurrence has an exception will return the details
     * for that exception.
     *
     * NOTE: this method is intend to be used in conjunction
     *       with the #iterator method.
     *
     * @param {ICAL.Time} occurrence time occurrence.
     */
    getOccurrenceDetails: function(occurrence) {
      var id = occurrence.toString();
      var utcId = occurrence.convertToZone(ICAL.Timezone.utcTimezone).toString();
      var result = {
        //XXX: Clone?
        recurrenceId: occurrence
      };

      if (id in this.exceptions) {
        var item = result.item = this.exceptions[id];
        result.startDate = item.startDate;
        result.endDate = item.endDate;
        result.item = item;
      } else if (utcId in this.exceptions) {
        var item = this.exceptions[utcId];
        result.startDate = item.startDate;
        result.endDate = item.endDate;
        result.item = item;
      } else {
        // range exceptions (RANGE=THISANDFUTURE) have a
        // lower priority then direct exceptions but
        // must be accounted for first. Their item is
        // always the first exception with the range prop.
        var rangeExceptionId = this.findRangeException(
          occurrence
        );

        if (rangeExceptionId) {
          var exception = this.exceptions[rangeExceptionId];

          // range exception must modify standard time
          // by the difference (if any) in start/end times.
          result.item = exception;

          var startDiff = this._rangeExceptionCache[rangeExceptionId];

          if (!startDiff) {
            var original = exception.recurrenceId.clone();
            var newStart = exception.startDate.clone();

            // zones must be same otherwise subtract may be incorrect.
            original.zone = newStart.zone;
            var startDiff = newStart.subtractDate(original);

            this._rangeExceptionCache[rangeExceptionId] = startDiff;
          }

          var start = occurrence.clone();
          start.zone = exception.startDate.zone;
          start.addDuration(startDiff);

          var end = start.clone();
          end.addDuration(exception.duration);

          result.startDate = start;
          result.endDate = end;
        } else {
          // no range exception standard expansion
          var end = occurrence.clone();
          end.addDuration(this.duration);

          result.endDate = end;
          result.startDate = occurrence;
          result.item = this;
        }
      }

      return result;
    },

    /**
     * Builds a recur expansion instance for a specific
     * point in time (defaults to startDate).
     *
     * @return {ICAL.RecurExpansion} expander object.
     */
    iterator: function(startTime) {
      return new ICAL.RecurExpansion({
        component: this.component,
        dtstart: startTime || this.startDate
      });
    },

    isRecurring: function() {
      var comp = this.component;
      return comp.hasProperty('rrule') || comp.hasProperty('rdate');
    },

    isRecurrenceException: function() {
      return this.component.hasProperty('recurrence-id');
    },

    /**
     * Returns the types of recurrences this event may have.
     *
     * Returned as an object with the following possible keys:
     *
     *    - YEARLY
     *    - MONTHLY
     *    - WEEKLY
     *    - DAILY
     *    - MINUTELY
     *    - SECONDLY
     *
     * @return {Object} object of recurrence flags.
     */
    getRecurrenceTypes: function() {
      var rules = this.component.getAllProperties('rrule');
      var i = 0;
      var len = rules.length;
      var result = Object.create(null);

      for (; i < len; i++) {
        var value = rules[i].getFirstValue();
        result[value.freq] = true;
      }

      return result;
    },

    get uid() {
      return this._firstProp('uid');
    },

    set uid(value) {
      this._setProp('uid', value);
    },

    get startDate() {
      return this._firstProp('dtstart');
    },

    set startDate(value) {
      this._setTime('dtstart', value);
    },

    get endDate() {
      return this._firstProp('dtend');
    },

    set endDate(value) {
      this._setTime('dtend', value);
    },

    get duration() {
      return this.endDate.subtractDate(this.startDate);
    },

    get location() {
      return this._firstProp('location');
    },

    set location(value) {
      return this._setProp('location', value);
    },

    get attendees() {
      //XXX: This is way lame we should have a better
      //     data structure for this later.
      return this.component.getAllProperties('attendee');
    },

    get summary() {
      return this._firstProp('summary');
    },

    set summary(value) {
      this._setProp('summary', value);
    },

    get description() {
      return this._firstProp('description');
    },

    set description(value) {
      this._setProp('description', value);
    },

    get organizer() {
      return this._firstProp('organizer');
    },

    set organizer(value) {
      this._setProp('organizer', value);
    },

    get sequence() {
      return this._firstProp('sequence');
    },

    set sequence(value) {
      this._setProp('sequence', value);
    },

    get recurrenceId() {
      return this._firstProp('recurrence-id');
    },

    set recurrenceId(value) {
      this._setProp('recurrence-id', value);
    },

    /**
     * set/update a time property's value.
     * This will also update the TZID of the property.
     *
     * TODO: this method handles the case where we are switching
     * from a known timezone to an implied timezone (one without TZID).
     * This does _not_ handle the case of moving between a known
     *  (by TimezoneService) timezone to an unknown timezone...
     *
     * We will not add/remove/update the VTIMEZONE subcomponents
     *  leading to invalid ICAL data...
     */
    _setTime: function(propName, time) {
      var prop = this.component.getFirstProperty(propName);

      if (!prop) {
        prop = new ICAL.Property(propName);
        this.component.addProperty(prop);
      }

      // utc and local don't get a tzid
      if (
        time.zone === ICAL.Timezone.localTimezone ||
        time.zone === ICAL.Timezone.utcTimezone
      ) {
        // remove the tzid
        prop.removeParameter('tzid');
      } else {
        prop.setParameter('tzid', time.zone.tzid);
      }

      prop.setValue(time);
    },

    _setProp: function(name, value) {
      this.component.updatePropertyWithValue(name, value);
    },

    _firstProp: function(name) {
      return this.component.getFirstPropertyValue(name);
    },

    toString: function() {
      return this.component.toString();
    }

  };

  return Event;

}());
ICAL.ComponentParser = (function() {

  /**
   * Component parser initializer.
   *
   * Usage:
   *
   *    var options = {
   *      // when false no events will be emitted for type
   *      parseEvent: true,
   *      parseTimezone: true
   *    };
   *
   *    var parser = new ICAL.ComponentParser(options);
   *
   *    parser.onevent() {
   *      //...
   *    }
   *
   *    // ontimezone, etc...
   *
   *    parser.oncomplete = function() {
   *
   *    };
   *
   *    parser.process(string | component);
   *
   *
   * @param {Object} options component parser options.
   */
  function ComponentParser(options) {
    if (typeof(options) === 'undefined') {
      options = {};
    }

    var key;
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }

  ComponentParser.prototype = {

    /**
     * When true parse events
     *
     * @type Boolean
     */
    parseEvent: true,

    /**
     * when true parse timezones
     *
     * @type Boolean
     */
    parseTimezone: true,


    /* SAX like events here for reference */

    /**
     * Fired when parsing is complete
     */
    oncomplete: function() {},

    /**
     * Fired if an error occurs during parsing.
     *
     * @param {Error} err details of error.
     */
    onerror: function(err) {},

    /**
     * Fired when a top level component (vtimezone) is found
     *
     * @param {ICAL.Timezone} timezone object.
     */
    ontimezone: function(component) {},

    /*
     * Fired when a top level component (VEVENT) is found.
     * @param {ICAL.Event} component top level component.
     */
    onevent: function(component) {},

    /**
     * Process a string or parse ical object.
     * This function itself will return nothing but
     * will start the parsing process.
     *
     * Events must be registered prior to calling this method.
     *
     * @param {String|Object} ical string or parsed ical object.
     */
    process: function(ical) {
      //TODO: this is sync now in the future we will have a incremental parser.
      if (typeof(ical) === 'string') {
        ical = ICAL.parse(ical)[1];
      }

      if (!(ical instanceof ICAL.Component)) {
        ical = new ICAL.Component(ical);
      }

      var components = ical.getAllSubcomponents();
      var i = 0;
      var len = components.length;
      var component;

      for (; i < len; i++) {
        component = components[i];

        switch (component.name) {
          case 'vtimezone':
            if (this.parseTimezone) {
              var tzid = component.getFirstPropertyValue('tzid');
              if (tzid) {
                this.ontimezone(new ICAL.Timezone({
                  tzid: tzid,
                  component: component
                }));
              }
            }
            break;
          case 'vevent':
            if (this.parseEvent) {
              this.onevent(new ICAL.Event(component));
            }
            break;
          default:
            continue;
        }
      }

      //XXX: ideally we should do a "nextTick" here
      //     so in all cases this is actually async.
      this.oncomplete();
    }
  };

  return ComponentParser;

}());
