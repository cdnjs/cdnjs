'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var RandExp = _interopDefault(require('randexp'));
var jsonpath = _interopDefault(require('jsonpath'));
var $RefParser = _interopDefault(require('json-schema-ref-parser'));

/**
 * This class defines a registry for custom formats used within JSF.
 */
var Registry = function Registry() {
  // empty by default
  this.data = {};
};
/**
 * Unregisters custom format(s)
 * @param name
 */


Registry.prototype.unregister = function unregister (name) {
  if (!name) {
    this.data = {};
  } else {
    delete this.data[name];
  }
};
/**
 * Registers custom format
 */


Registry.prototype.register = function register (name, callback) {
  this.data[name] = callback;
};
/**
 * Register many formats at one shot
 */


Registry.prototype.registerMany = function registerMany (formats) {
    var this$1 = this;

  Object.keys(formats).forEach(function (name) {
    this$1.data[name] = formats[name];
  });
};
/**
 * Returns element by registry key
 */


Registry.prototype.get = function get (name) {
  var format = this.data[name];
  return format;
};
/**
 * Returns the whole registry content
 */


Registry.prototype.list = function list () {
  return this.data;
};

var defaults = {};
defaults.defaultInvalidTypeProduct = null;
defaults.defaultRandExpMax = 10;
defaults.ignoreProperties = [];
defaults.ignoreMissingRefs = false;
defaults.failOnInvalidTypes = true;
defaults.failOnInvalidFormat = true;
defaults.alwaysFakeOptionals = false;
defaults.optionalsProbability = false;
defaults.fixedProbabilities = false;
defaults.useExamplesValue = false;
defaults.useDefaultValue = false;
defaults.requiredOnly = false;
defaults.minItems = 0;
defaults.maxItems = null;
defaults.minLength = 0;
defaults.maxLength = null;
defaults.resolveJsonPath = false;
defaults.reuseProperties = false;
defaults.fillProperties = true;
defaults.random = Math.random;
/**
 * This class defines a registry for custom settings used within JSF.
 */

var OptionRegistry = (function (Registry$$1) {
  function OptionRegistry() {
    Registry$$1.call(this);
    this.data = Object.assign({}, defaults);
    this._defaults = defaults;
  }

  if ( Registry$$1 ) OptionRegistry.__proto__ = Registry$$1;
  OptionRegistry.prototype = Object.create( Registry$$1 && Registry$$1.prototype );
  OptionRegistry.prototype.constructor = OptionRegistry;

  var prototypeAccessors = { defaults: { configurable: true } };

  prototypeAccessors.defaults.get = function () {
    return Object.assign({}, this._defaults);
  };

  Object.defineProperties( OptionRegistry.prototype, prototypeAccessors );

  return OptionRegistry;
}(Registry));

var registry = new OptionRegistry();
/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */

function optionAPI(nameOrOptionMap) {
  if (typeof nameOrOptionMap === 'string') {
    return registry.get(nameOrOptionMap);
  }

  return registry.registerMany(nameOrOptionMap);
}

optionAPI.getDefaults = function () { return registry.defaults; };

var ALL_TYPES = ['array', 'object', 'integer', 'number', 'string', 'boolean', 'null'];
var MOST_NEAR_DATETIME = 2524608000000;
var MIN_INTEGER = -100000000;
var MAX_INTEGER = 100000000;
var MIN_NUMBER = -100;
var MAX_NUMBER = 100;
var env = {
  ALL_TYPES: ALL_TYPES,
  MIN_NUMBER: MIN_NUMBER,
  MAX_NUMBER: MAX_NUMBER,
  MIN_INTEGER: MIN_INTEGER,
  MAX_INTEGER: MAX_INTEGER,
  MOST_NEAR_DATETIME: MOST_NEAR_DATETIME
};

function getRandomInteger(min, max) {
  min = typeof min === 'undefined' ? env.MIN_INTEGER : min;
  max = typeof max === 'undefined' ? env.MAX_INTEGER : max;
  return Math.floor(optionAPI('random')() * (max - min + 1)) + min;
}

function _randexp(value) {
  // set maximum default, see #193
  RandExp.prototype.max = optionAPI('defaultRandExpMax'); // same implementation as the original except using our random

  RandExp.prototype.randInt = function (a, b) { return a + Math.floor(optionAPI('random')() * (1 + (b - a))); };

  var re = new RandExp(value);
  return re.gen();
}
/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */


function pick(collection) {
  return collection[Math.floor(optionAPI('random')() * collection.length)];
}
/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */


function shuffle(collection) {
  var tmp;
  var key;
  var length = collection.length;
  var copy = collection.slice();

  for (; length > 0;) {
    key = Math.floor(optionAPI('random')() * length); // swap

    length -= 1;
    tmp = copy[length];
    copy[length] = copy[key];
    copy[key] = tmp;
  }

  return copy;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */


function getRandom(min, max) {
  return optionAPI('random')() * (max - min) + min;
}
/**
 * Generates random number according to parameters passed
 *
 * @param min
 * @param max
 * @param defMin
 * @param defMax
 * @param hasPrecision
 * @returns {number}
 */


function number(min, max, defMin, defMax, hasPrecision) {
  if ( hasPrecision === void 0 ) hasPrecision = false;

  defMin = typeof defMin === 'undefined' ? env.MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? env.MAX_NUMBER : defMax;
  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (max < min) {
    max += min;
  }

  if (hasPrecision) {
    return getRandom(min, max);
  }

  return getRandomInteger(min, max);
}

function by(type) {
  switch (type) {
    case 'seconds':
      return number(0, 60) * 60;

    case 'minutes':
      return number(15, 50) * 612;

    case 'hours':
      return number(12, 72) * 36123;

    case 'days':
      return number(7, 30) * 86412345;

    case 'weeks':
      return number(4, 52) * 604812345;

    case 'months':
      return number(2, 13) * 2592012345;

    case 'years':
      return number(1, 20) * 31104012345;

    default:
      break;
  }
}

function date(step) {
  if (step) {
    return by(step);
  }

  var now = new Date();
  var days = number(-1000, env.MOST_NEAR_DATETIME);
  now.setTime(now.getTime() - days);
  return now;
}

var random = {
  pick: pick,
  date: date,
  shuffle: shuffle,
  number: number,
  randexp: _randexp
};

function getSubAttribute(obj, dotSeparatedKey) {
  var keyElements = dotSeparatedKey.split('.');

  while (keyElements.length) {
    var prop = keyElements.shift();

    if (!obj[prop]) {
      break;
    }

    obj = obj[prop];
  }

  return obj;
}
/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @param properties
 * @returns {boolean}
 */


function hasProperties(obj) {
  var properties = [], len = arguments.length - 1;
  while ( len-- > 0 ) properties[ len ] = arguments[ len + 1 ];

  return properties.filter(function (key) {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
}
/**
 * Returns typecasted value.
 * External generators (faker, chance, casual) may return data in non-expected formats, such as string, when you might expect an
 * integer. This function is used to force the typecast. This is the base formatter for all result values.
 *
 * @param type
 * @param schema
 * @param callback
 * @returns {any}
 */


function typecast(type, schema, callback) {
  var params = {}; // normalize constraints

  switch (type || schema.type) {
    case 'integer':
    case 'number':
      if (typeof schema.minimum !== 'undefined') {
        params.minimum = schema.minimum;
      }

      if (typeof schema.maximum !== 'undefined') {
        params.maximum = schema.maximum;
      }

      if (schema.enum) {
        var min = Math.max(params.minimum || 0, 0);
        var max = Math.min(params.maximum || Infinity, Infinity);

        if (schema.exclusiveMinimum && min === schema.minimum) {
          min += schema.multipleOf || 1;
        }

        if (schema.exclusiveMaximum && max === schema.maximum) {
          max -= schema.multipleOf || 1;
        } // discard out-of-bounds enumerations


        if (min || max !== Infinity) {
          schema.enum = schema.enum.filter(function (x) {
            if (x >= min && x <= max) {
              return true;
            }

            return false;
          });
        }
      }

      break;

    case 'string':
      {
        if (typeof schema.minLength !== 'undefined') {
          params.minLength = schema.minLength;
        }

        if (typeof schema.maxLength !== 'undefined') {
          params.maxLength = schema.maxLength;
        }

        var _maxLength = optionAPI('maxLength');

        var _minLength = optionAPI('minLength'); // Don't allow user to set max length above our maximum


        if (_maxLength && params.maxLength > _maxLength) {
          params.maxLength = _maxLength;
        } // Don't allow user to set min length above our maximum


        if (_minLength && params.minLength < _minLength) {
          params.minLength = _minLength;
        }

        break;
      }

    default:
      break;
  } // execute generator


  var value = callback(params); // normalize output value

  switch (type || schema.type) {
    case 'number':
      value = parseFloat(value);
      break;

    case 'integer':
      value = parseInt(value, 10);
      break;

    case 'boolean':
      value = !!value;
      break;

    case 'string':
      {
        value = String(value);
        var min$1 = Math.max(params.minLength || 0, 0);
        var max$1 = Math.min(params.maxLength || Infinity, Infinity);

        while (value.length < min$1) {
          value += " " + value;
        }

        if (value.length > max$1) {
          value = value.substr(0, max$1);
        }

        break;
      }

    default:
      break;
  }

  return value;
}

function merge(a, b) {
  Object.keys(b).forEach(function (key) {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || []; // fix #292 - skip duplicated values from merge object (b)

      b[key].forEach(function (value) {
        if (a[key].indexOf(value) === -1) {
          a[key].push(value);
        }
      });
    } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  });
  return a;
}

function short(schema) {
  var s = JSON.stringify(schema);
  var l = JSON.stringify(schema, null, 2);
  return s.length > 400 ? ((l.substr(0, 400)) + "...") : l;
}

function anyValue() {
  return random.pick([false, true, null, -1, NaN, Math.PI, Infinity, undefined, [], {}, Math.random(), Math.random().toString(36).substr(2)]);
}

function notValue(schema, parent) {
  var copy = merge({}, parent);

  if (typeof schema.minimum !== 'undefined') {
    copy.maximum = schema.minimum;
    copy.exclusiveMaximum = true;
  }

  if (typeof schema.maximum !== 'undefined') {
    copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
    copy.exclusiveMinimum = true;
  }

  if (typeof schema.minLength !== 'undefined') {
    copy.maxLength = schema.minLength;
  }

  if (typeof schema.maxLength !== 'undefined') {
    copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
  }

  if (schema.type) {
    copy.type = random.pick(env.ALL_TYPES.filter(function (x) {
      var types = Array.isArray(schema.type) ? schema.type : [schema.type];
      return types.every(function (type) {
        // treat both types as _similar enough_ to be skipped equal
        if (x === 'number' || x === 'integer') {
          return type !== 'number' && type !== 'integer';
        }

        return x !== type;
      });
    }));
  } else if (schema.enum) {
    var value;

    do {
      value = anyValue();
    } while (schema.enum.indexOf(value) !== -1);

    copy.enum = [value];
  }

  if (schema.required && copy.properties) {
    schema.required.forEach(function (prop) {
      delete copy.properties[prop];
    });
  } // TODO: explore more scenarios


  return copy;
} // FIXME: evaluate more constraints?


function validate(value, schemas) {
  return !schemas.every(function (x) {
    if (typeof x.minimum !== 'undefined' && value >= x.minimum) {
      return true;
    }

    if (typeof x.maximum !== 'undefined' && value <= x.maximum) {
      return true;
    }

    return false;
  });
}

function isKey(prop) {
  return ['enum', 'const', 'default', 'examples', 'required', 'definitions'].indexOf(prop) !== -1;
}

function omitProps(obj, props) {
  var copy = {};
  Object.keys(obj).forEach(function (k) {
    if (props.indexOf(k) === -1) {
      if (Array.isArray(obj[k])) {
        copy[k] = obj[k].slice();
      } else {
        copy[k] = typeof obj[k] === 'object' ? merge({}, obj[k]) : obj[k];
      }
    }
  });
  return copy;
}

function template(value, schema) {
  if (Array.isArray(value)) {
    return value.map(function (x) { return template(x, schema); });
  }

  if (typeof value === 'string') {
    value = value.replace(/#\{([\w.-]+)\}/g, function (_, $1) { return schema[$1]; });
  }

  return value;
}

var utils = {
  getSubAttribute: getSubAttribute,
  hasProperties: hasProperties,
  omitProps: omitProps,
  typecast: typecast,
  merge: merge,
  short: short,
  notValue: notValue,
  anyValue: anyValue,
  validate: validate,
  isKey: isKey,
  template: template
};

function proxy(gen) {
  return function (value, schema, property, rootSchema) {
    var fn = value;
    var args = []; // support for nested object, first-key is the generator

    if (typeof value === 'object') {
      fn = Object.keys(value)[0]; // treat the given array as arguments,

      if (Array.isArray(value[fn])) {
        // if the generator is expecting arrays they should be nested, e.g. `[[1, 2, 3], true, ...]`
        args = value[fn];
      } else {
        args.push(value[fn]);
      }
    } // support for keypaths, e.g. "internet.email"


    var props = fn.split('.'); // retrieve a fresh dependency

    var ctx = gen();

    while (props.length > 1) {
      ctx = ctx[props.shift()];
    } // retrieve last value from context object


    value = typeof ctx === 'object' ? ctx[props[0]] : ctx; // invoke dynamic generators

    if (typeof value === 'function') {
      value = value.apply(ctx, args.map(function (x) { return utils.template(x, rootSchema); }));
    } // test for pending callbacks


    if (Object.prototype.toString.call(value) === '[object Object]') {
      Object.keys(value).forEach(function (key) {
        if (typeof value[key] === 'function') {
          throw new Error(("Cannot resolve value for '" + property + ": " + fn + "', given: " + value));
        }
      });
    }

    return value;
  };
}
/**
 * Container is used to wrap external generators (faker, chance, casual, etc.) and its dependencies.
 *
 * - `jsf.extend('faker')` will enhance or define the given dependency.
 * - `jsf.define('faker')` will provide the "faker" keyword support.
 *
 * RandExp is not longer considered an "extension".
 */


var Container = function Container() {
  // dynamic requires - handle all dependencies
  // they will NOT be included on the bundle
  this.registry = {};
  this.support = {};
};
/**
 * Unregister extensions
 * @param name
 */


Container.prototype.reset = function reset (name) {
  if (!name) {
    this.registry = {};
    this.support = {};
  } else {
    delete this.registry[name];
    delete this.support[name];
  }
};
/**
 * Override dependency given by name
 * @param name
 * @param callback
 */


Container.prototype.extend = function extend (name, callback) {
    var this$1 = this;

  this.registry[name] = callback(this.registry[name]); // built-in proxy (can be overridden)

  if (!this.support[name]) {
    this.support[name] = proxy(function () { return this$1.registry[name]; });
  }
};
/**
 * Set keyword support by name
 * @param name
 * @param callback
 */


Container.prototype.define = function define (name, callback) {
  this.support[name] = callback;
};
/**
 * Returns dependency given by name
 * @param name
 * @returns {Dependency}
 */


Container.prototype.get = function get (name) {
  if (typeof this.registry[name] === 'undefined') {
    throw new ReferenceError(("'" + name + "' dependency doesn't exist."));
  }

  return this.registry[name];
};
/**
 * Apply a custom keyword
 * @param schema
 */


Container.prototype.wrap = function wrap (schema) {
    var this$1 = this;

  var keys = Object.keys(schema);
  var context = {};
  var length = keys.length;

  var loop = function () {
    // eslint-disable-line
    var fn = keys[length].replace(/^x-/, '');
    var gen = this$1.support[fn];

    if (typeof gen === 'function') {
      Object.defineProperty(schema, 'generate', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function (rootSchema) { return gen.call(context, schema[keys[length]], schema, keys[length], rootSchema); } // eslint-disable-line

      });
      return 'break';
    }
  };

    while (length--) {
      var returned = loop();

      if ( returned === 'break' ) break;
    }

  return schema;
};

var registry$1 = new Registry();
/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */

function formatAPI(nameOrFormatMap, callback) {
  if (typeof nameOrFormatMap === 'undefined') {
    return registry$1.list();
  } else if (typeof nameOrFormatMap === 'string') {
    if (typeof callback === 'function') {
      registry$1.register(nameOrFormatMap, callback);
    } else if (callback === null || callback === false) {
      registry$1.unregister(nameOrFormatMap);
    } else {
      return registry$1.get(nameOrFormatMap);
    }
  } else {
    registry$1.registerMany(nameOrFormatMap);
  }
}

var ParseError = (function (Error) {
  function ParseError(message, path) {
    Error.call(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'ParseError';
    this.message = message;
    this.path = path;
  }

  if ( Error ) ParseError.__proto__ = Error;
  ParseError.prototype = Object.create( Error && Error.prototype );
  ParseError.prototype.constructor = ParseError;

  return ParseError;
}(Error));

var inferredProperties = {
  array: ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems'],
  integer: ['exclusiveMaximum', 'exclusiveMinimum', 'maximum', 'minimum', 'multipleOf'],
  object: ['additionalProperties', 'dependencies', 'maxProperties', 'minProperties', 'patternProperties', 'properties', 'required'],
  string: ['maxLength', 'minLength', 'pattern', 'format']
};
inferredProperties.number = inferredProperties.integer;
var subschemaProperties = ['additionalItems', 'items', 'additionalProperties', 'dependencies', 'patternProperties', 'properties'];
/**
 * Iterates through all keys of `obj` and:
 * - checks whether those keys match properties of a given inferred type
 * - makes sure that `obj` is not a subschema; _Do not attempt to infer properties named as subschema containers. The
 * reason for this is that any property name within those containers that matches one of the properties used for
 * inferring missing type values causes the container itself to get processed which leads to invalid output. (Issue 62)_
 *
 * @returns {boolean}
 */

function matchesType(obj, lastElementInPath, inferredTypeProperties) {
  return Object.keys(obj).filter(function (prop) {
    var isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1;
    var inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;

    if (inferredPropertyFound && !isSubschema) {
      return true;
    }

    return false;
  }).length > 0;
}
/**
 * Checks whether given `obj` type might be inferred. The mechanism iterates through all inferred types definitions,
 * tries to match allowed properties with properties of given `obj`. Returns type name, if inferred, or null.
 *
 * @returns {string|null}
 */


function inferType(obj, schemaPath) {
  var keys = Object.keys(inferredProperties);

  for (var i = 0; i < keys.length; i += 1) {
    var typeName = keys[i];
    var lastElementInPath = schemaPath[schemaPath.length - 1];

    if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
      return typeName;
    }
  }
}

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */

function booleanGenerator() {
  return optionAPI('random')() > 0.5;
}

var booleanType = booleanGenerator;

/**
 * Generates null value.
 *
 * @returns {null}
 */
function nullGenerator() {
  return null;
}

var nullType = nullGenerator;

function unique(path, items, value, sample, resolve, traverseCallback) {
  var tmp = [];
  var seen = [];

  function walk(obj) {
    var json = JSON.stringify(obj);

    if (seen.indexOf(json) === -1) {
      seen.push(json);
      tmp.push(obj);
    }
  }

  items.forEach(walk); // TODO: find a better solution?

  var limit = 100;

  while (tmp.length !== items.length) {
    walk(traverseCallback(value.items || sample, path, resolve));

    if (!limit) {
      limit -= 1;
      break;
    }
  }

  return tmp;
} // TODO provide types


function arrayType(value, path, resolve, traverseCallback) {
  var items = [];

  if (!(value.items || value.additionalItems)) {
    if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
      throw new ParseError(("missing items for " + (utils.short(value))), path);
    }

    return items;
  }

  if (Array.isArray(value.items)) {
    return value.items.map(function (item, key) {
      var itemSubpath = path.concat(['items', key]);
      return traverseCallback(item, itemSubpath, resolve);
    });
  }

  var minItems = value.minItems;
  var maxItems = value.maxItems;

  if (optionAPI('minItems')) {
    // fix boundaries
    minItems = !maxItems ? optionAPI('minItems') : Math.min(optionAPI('minItems'), maxItems);
  }

  if (optionAPI('maxItems')) {
    // Don't allow user to set max items above our maximum
    if (maxItems && maxItems > optionAPI('maxItems')) {
      maxItems = optionAPI('maxItems');
    } // Don't allow user to set min items above our maximum


    if (minItems && minItems > optionAPI('maxItems')) {
      minItems = maxItems;
    }
  }

  var optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  var fixedProbabilities = optionAPI('fixedProbabilities') || false;
  var length = random.number(minItems, maxItems, 1, 5);

  if (optionalsProbability !== false) {
    length = fixedProbabilities ? Math.round(maxItems * optionalsProbability) : random.number(minItems, maxItems * optionalsProbability);
  } // TODO below looks bad. Should additionalItems be copied as-is?


  var sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (var current = items.length; current < length; current += 1) {
    var itemSubpath = path.concat(['items', current]);
    var element = traverseCallback(value.items || sample, itemSubpath, resolve);
    items.push(element);
  }

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
  }

  return items;
}

function numberType(value) {
  var min = typeof value.minimum === 'undefined' ? env.MIN_INTEGER : value.minimum;
  var max = typeof value.maximum === 'undefined' ? env.MAX_INTEGER : value.maximum;
  var multipleOf = value.multipleOf;

  if (multipleOf) {
    max = Math.floor(max / multipleOf) * multipleOf;
    min = Math.ceil(min / multipleOf) * multipleOf;
  }

  if (value.exclusiveMinimum && min === value.minimum) {
    min += multipleOf || 1;
  }

  if (value.exclusiveMaximum && max === value.maximum) {
    max -= multipleOf || 1;
  }

  if (min > max) {
    return NaN;
  }

  if (multipleOf) {
    if (String(multipleOf).indexOf('.') === -1) {
      var base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;

      while (base < min) {
        base += value.multipleOf;
      }

      return base;
    }

    var boundary = (max - min) / multipleOf;
    var num;
    var fix;

    do {
      num = random.number(0, boundary) * multipleOf;
      fix = num / multipleOf % 1;
    } while (fix !== 0); // FIXME: https://github.com/json-schema-faker/json-schema-faker/issues/379


    return num;
  }

  return random.number(min, max, undefined, undefined, true);
}

// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.

function integerType(value) {
  return numberType(Object.assign({
    multipleOf: 1
  }, value));
}

var LIPSUM_WORDS = "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore\net dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\ncommodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\npariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est\nlaborum".split(/\W/);
/**
 * Generates randomized array of single lorem ipsum words.
 *
 * @param length
 * @returns {Array.<string>}
 */

function wordsGenerator(length) {
  var words = random.shuffle(LIPSUM_WORDS);
  return words.slice(0, length);
}

var anyType = {
  type: ['string', 'number', 'integer', 'boolean']
}; // TODO provide types

function objectType(value, path, resolve, traverseCallback) {
  var props = {};
  var properties = value.properties || {};
  var patternProperties = value.patternProperties || {};
  var requiredProperties = (value.required || []).slice();
  var allowsAdditional = value.additionalProperties !== false;
  var propertyKeys = Object.keys(properties);
  var patternPropertyKeys = Object.keys(patternProperties);
  var optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce(function (_response, _key) {
    if (requiredProperties.indexOf(_key) === -1) { _response.push(_key); }
    return _response;
  }, []);
  var allProperties = requiredProperties.concat(optionalProperties);
  var additionalProperties = allowsAdditional // eslint-disable-line
  ? value.additionalProperties === true ? anyType : value.additionalProperties : null;

  if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
    // just nothing
    return {};
  }

  if (optionAPI('requiredOnly') === true) {
    requiredProperties.forEach(function (key) {
      if (properties[key]) {
        props[key] = properties[key];
      }
    });
    return traverseCallback(props, path.concat(['properties']), resolve);
  }

  var optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  var fixedProbabilities = optionAPI('fixedProbabilities') || false;
  var ignoreProperties = optionAPI('ignoreProperties') || [];
  var min = Math.max(value.minProperties || 0, requiredProperties.length);
  var max = Math.min(value.maxProperties || allProperties.length, allProperties.length);
  var neededExtras = Math.max(0, min - requiredProperties.length);

  if (allProperties.length === 1 && !requiredProperties.length) {
    neededExtras = random.number(neededExtras, allProperties.length + (max - min));
  }

  if (optionalsProbability !== false) {
    if (fixedProbabilities === true) {
      neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (max - min));
    } else {
      neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (max - min));
    }
  }

  var extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
  var extraProperties = optionalProperties.filter(function (_item) {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  }); // properties are read from right-to-left

  var _props = requiredProperties.concat(extraProperties).slice(0, max);

  var skipped = [];
  var missing = [];

  _props.forEach(function (key) {
    for (var i = 0; i < ignoreProperties.length; i += 1) {
      if (ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key) || typeof ignoreProperties[i] === 'string' && ignoreProperties[i] === key || typeof ignoreProperties[i] === 'function' && ignoreProperties[i](properties[key], key)) {
        skipped.push(key);
        return;
      }
    } // first ones are the required properies


    if (properties[key]) {
      props[key] = properties[key];
    } else {
      var found; // then try patternProperties

      patternPropertyKeys.forEach(function (_key) {
        if (key.match(new RegExp(_key))) {
          found = true;
          props[random.randexp(key)] = patternProperties[_key];
        }
      });

      if (!found) {
        // try patternProperties again,
        var subschema = patternProperties[key] || additionalProperties; // FIXME: allow anyType as fallback when no subschema is given?

        if (subschema) {
          // otherwise we can use additionalProperties?
          props[patternProperties[key] ? random.randexp(key) : key] = subschema;
        } else {
          missing.push(key);
        }
      }
    }
  });

  var fillProps = optionAPI('fillProperties');
  var reuseProps = optionAPI('reuseProperties'); // discard already ignored props if they're not required to be filled...

  var current = Object.keys(props).length + (fillProps ? 0 : skipped.length);

  function get() {
    var one;

    do {
      one = requiredProperties.shift();
    } while (props[one]);

    return one;
  }

  while (fillProps) {
    if (!(patternPropertyKeys.length || allowsAdditional)) {
      break;
    }

    if (current >= min) {
      break;
    }

    if (allowsAdditional) {
      if (reuseProps && propertyKeys.length - current > min) {
        var count = 0;
        var key = (void 0);

        do {
          count += 1; // skip large objects

          if (count > 1000) {
            break;
          }

          key = get() || random.pick(propertyKeys);
        } while (typeof props[key] !== 'undefined');

        if (typeof props[key] === 'undefined') {
          props[key] = properties[key];
          current += 1;
        }
      } else if (patternPropertyKeys.length && !additionalProperties) {
        var prop = random.pick(patternPropertyKeys);
        var word = random.randexp(prop);

        if (!props[word]) {
          props[word] = patternProperties[prop];
          current += 1;
        }
      } else {
        var word$1 = get() || wordsGenerator(1) + random.randexp('[a-f\\d]{1,3}');

        if (!props[word$1]) {
          props[word$1] = additionalProperties || anyType;
          current += 1;
        }
      }
    }

    for (var i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
      var _key = patternPropertyKeys[i];
      var word$2 = random.randexp(_key);

      if (!props[word$2]) {
        props[word$2] = patternProperties[_key];
        current += 1;
      }
    }
  }

  if (!allowsAdditional && current < min) {
    if (missing.length) {
      throw new ParseError(("properties '" + (missing.join(', ')) + "' were not found while additionalProperties is false:\n" + (utils.short(value))), path);
    }

    throw new ParseError(("properties constraints were too strong to successfully generate a valid object for:\n" + (utils.short(value))), path);
  }

  return traverseCallback(props, path.concat(['properties']), resolve);
}

/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */

function produce() {
  var length = random.number(1, 5);
  return wordsGenerator(length).join(' ');
}
/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */


function thunkGenerator(min, max) {
  if ( min === void 0 ) min = 0;
  if ( max === void 0 ) max = 140;

  var _min = Math.max(0, min);

  var _max = random.number(_min, max);

  var result = produce(); // append until length is reached

  while (result.length < _min) {
    result += produce();
  } // cut if needed


  if (result.length > _max) {
    result = result.substr(0, _max);
  }

  return result;
}

/**
 * Generates randomized ipv4 address.
 *
 * @returns {string}
 */

function ipv4Generator() {
  return [0, 0, 0, 0].map(function () {
    return random.number(0, 255);
  }).join('.');
}

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */

function dateTimeGenerator() {
  return random.date().toISOString();
}

/**
 * Generates randomized date format string.
 *
 * @returns {string}
 */

function dateGenerator() {
  return dateTimeGenerator().slice(0, 10);
}

/**
 * Generates randomized time format string.
 *
 * @returns {string}
 */

function timeGenerator() {
  return dateTimeGenerator().slice(11);
}

var FRAGMENT = '[a-zA-Z][a-zA-Z0-9+-.]*';
var URI_PATTERN = "https?://{hostname}(?:" + FRAGMENT + ")+";
var PARAM_PATTERN = '(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?';
/**
 * Predefined core formats
 * @type {[key: string]: string}
 */

var regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
  uri: URI_PATTERN,
  // types from draft-0[67] (?)
  'uri-reference': ("" + URI_PATTERN + PARAM_PATTERN),
  'uri-template': URI_PATTERN.replace('(?:', '(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|'),
  'json-pointer': ("(/(?:" + (FRAGMENT.replace(']*', '/]*')) + "|~[01]))+"),
  // some types from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types (?)
  uuid: '^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$'
};
regexps.iri = regexps['uri-reference'];
regexps['iri-reference'] = regexps['uri-reference'];
regexps['idn-email'] = regexps.email;
regexps['idn-hostname'] = regexps.hostname;
var ALLOWED_FORMATS = new RegExp(("\\{(" + (Object.keys(regexps).join('|')) + ")\\}"));
/**
 * Generates randomized string basing on a built-in regex format
 *
 * @param coreFormat
 * @returns {string}
 */

function coreFormatGenerator(coreFormat) {
  return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, function (match, key) {
    return random.randexp(regexps[key]);
  });
}

function generateFormat(value, invalid) {
  var callback = formatAPI(value.format);

  if (typeof callback === 'function') {
    return callback(value);
  }

  switch (value.format) {
    case 'date-time':
    case 'datetime':
      return dateTimeGenerator();

    case 'date':
      return dateGenerator();

    case 'time':
      return timeGenerator();

    case 'ipv4':
      return ipv4Generator();

    case 'regex':
      // TODO: discuss
      return '.+?';

    case 'email':
    case 'hostname':
    case 'ipv6':
    case 'uri':
    case 'uri-reference':
    case 'iri':
    case 'iri-reference':
    case 'idn-email':
    case 'idn-hostname':
    case 'json-pointer':
    case 'uri-template':
    case 'uuid':
      return coreFormatGenerator(value.format);

    default:
      if (typeof callback === 'undefined') {
        if (optionAPI('failOnInvalidFormat')) {
          throw new Error(("unknown registry key " + (utils.short(value.format))));
        } else {
          return invalid();
        }
      }

      throw new Error(("unsupported format '" + (value.format) + "'"));
  }
}

function stringType(value) {
  // here we need to force type to fix #467
  var output = utils.typecast('string', value, function (opts) {
    if (value.format) {
      return generateFormat(value, function () { return thunkGenerator(opts.minLength, opts.maxLength); });
    }

    if (value.pattern) {
      return random.randexp(value.pattern);
    }

    return thunkGenerator(opts.minLength, opts.maxLength);
  });
  return output;
}

var typeMap = {
  boolean: booleanType,
  null: nullType,
  array: arrayType,
  integer: integerType,
  number: numberType,
  object: objectType,
  string: stringType
};

function traverse(schema, path, resolve, rootSchema) {
  schema = resolve(schema, undefined, path);

  if (!schema) {
    return;
  } // default values has higher precedence


  if (path[path.length - 1] !== 'properties') {
    // example values have highest precedence
    if (optionAPI('useExamplesValue') && Array.isArray(schema.examples)) {
      // include `default` value as example too
      var fixedExamples = schema.examples.concat('default' in schema ? [schema.default] : []);
      return utils.typecast(null, schema, function () { return random.pick(fixedExamples); });
    }

    if (optionAPI('useDefaultValue') && 'default' in schema) {
      return schema.default;
    }

    if ('template' in schema) {
      return utils.template(schema.template, rootSchema);
    }
  }

  if (schema.not && typeof schema.not === 'object') {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));
  }

  if ('const' in schema) {
    return schema.const;
  }

  if (Array.isArray(schema.enum)) {
    return utils.typecast(null, schema, function () { return random.pick(schema.enum); });
  } // thunks can return sub-schemas


  if (typeof schema.thunk === 'function') {
    return traverse(schema.thunk(), path, resolve);
  }

  if (typeof schema.generate === 'function') {
    return utils.typecast(null, schema, function () { return schema.generate(rootSchema); });
  } // TODO remove the ugly overcome


  var type = schema.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferType(schema, path) || type;

    if (type) {
      schema.type = type;
    }
  }

  if (typeof type === 'string') {
    if (!typeMap[type]) {
      if (optionAPI('failOnInvalidTypes')) {
        throw new ParseError(("unknown primitive " + (utils.short(type))), path.concat(['type']));
      } else {
        return optionAPI('defaultInvalidTypeProduct');
      }
    } else {
      try {
        return typeMap[type](schema, path, resolve, traverse);
      } catch (e) {
        if (typeof e.path === 'undefined') {
          throw new ParseError(e.message, path);
        }

        throw e;
      }
    }
  }

  var copy = {};

  if (Array.isArray(schema)) {
    copy = [];
  }

  Object.keys(schema).forEach(function (prop) {
    if (typeof schema[prop] === 'object' && prop !== 'definitions') {
      copy[prop] = traverse(schema[prop], path.concat([prop]), resolve, copy);
    } else {
      copy[prop] = schema[prop];
    }
  });
  return copy;
}

function pick$1(data) {
  return Array.isArray(data) ? random.pick(data) : data;
}

function cycle(data, reverse) {
  if (!Array.isArray(data)) {
    return data;
  }

  var value = reverse ? data.pop() : data.shift();

  if (reverse) {
    data.unshift(value);
  } else {
    data.push(value);
  }

  return value;
}

function resolve(obj, data, values, property) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (!values) {
    values = {};
  }

  if (!data) {
    data = obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(function (x) { return resolve(x, data, values, property); });
  }

  if (obj.jsonPath) {
    var params = typeof obj.jsonPath !== 'object' ? {
      path: obj.jsonPath
    } : obj.jsonPath;
    params.group = obj.group || params.group || property;
    params.cycle = obj.cycle || params.cycle || false;
    params.reverse = obj.reverse || params.reverse || false;
    params.count = obj.count || params.count || 1;
    var key = (params.group) + "__" + (params.path);

    if (!values[key]) {
      if (params.count > 1) {
        values[key] = jsonpath.query(data, params.path, params.count);
      } else {
        values[key] = jsonpath.query(data, params.path);
      }
    }

    if (params.cycle || params.reverse) {
      return cycle(values[key], params.reverse);
    }

    return pick$1(values[key]);
  }

  Object.keys(obj).forEach(function (k) {
    obj[k] = resolve(obj[k], data, values, k);
  });
  return obj;
} // TODO provide types


function run(refs, schema, container) {
  try {
    var result = traverse(schema, [], function reduce(sub, maxReduceDepth, parentSchemaPath) {
      if (typeof maxReduceDepth === 'undefined') {
        maxReduceDepth = random.number(1, 3);
      }

      if (!sub) {
        return null;
      }

      if (typeof sub.generate === 'function') {
        return sub;
      } // cleanup


      var _id = sub.$id || sub.id;

      if (typeof _id === 'string') {
        delete sub.id;
        delete sub.$id;
        delete sub.$schema;
      }

      if (typeof sub.$ref === 'string') {
        if (sub.$ref === '#') {
          delete sub.$ref;
          return sub;
        }

        var ref;

        if (sub.$ref.indexOf('#/') === -1) {
          ref = refs[sub.$ref] || null;
        }

        if (sub.$ref.indexOf('#/definitions/') === 0) {
          ref = schema.definitions[sub.$ref.split('#/definitions/')[1]] || null;
        }

        if (typeof ref !== 'undefined') {
          if (!ref && optionAPI('ignoreMissingRefs') !== true) {
            throw new Error(("Reference not found: " + (sub.$ref)));
          }

          utils.merge(sub, ref || {});
        } // just remove the reference


        delete sub.$ref;
        return sub;
      }

      if (Array.isArray(sub.allOf)) {
        var schemas = sub.allOf;
        delete sub.allOf; // this is the only case where all sub-schemas
        // must be resolved before any merge

        schemas.forEach(function (subSchema) {
          var _sub = reduce(subSchema, maxReduceDepth + 1, parentSchemaPath); // call given thunks if present


          utils.merge(sub, typeof _sub.thunk === 'function' ? _sub.thunk() : _sub);
        });
      }

      if (Array.isArray(sub.oneOf || sub.anyOf)) {
        var mix = sub.oneOf || sub.anyOf; // test every value from the enum against each-oneOf
        // schema, only values that validate once are kept

        if (sub.enum && sub.oneOf) {
          sub.enum = sub.enum.filter(function (x) { return utils.validate(x, mix); });
        }

        return {
          thunk: function thunk() {
            var copy = utils.omitProps(sub, ['anyOf', 'oneOf']);
            utils.merge(copy, random.pick(mix));
            return copy;
          }

        };
      }

      Object.keys(sub).forEach(function (prop) {
        if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !utils.isKey(prop)) {
          sub[prop] = reduce(sub[prop], maxReduceDepth, parentSchemaPath.concat(prop));
        }
      }); // avoid extra calls on sub-schemas, fixes #458

      if (parentSchemaPath) {
        var lastProp = parentSchemaPath[parentSchemaPath.length - 1];

        if (lastProp === 'properties' || lastProp === 'items') {
          return sub;
        }
      }

      return container.wrap(sub);
    });

    if (optionAPI('resolveJsonPath')) {
      return resolve(result);
    }

    return result;
  } catch (e) {
    if (e.path) {
      throw new Error(((e.message) + " in /" + (e.path.join('/'))));
    } else {
      throw e;
    }
  }
}

var container = new Container();

function setupKeywords() {
  // built-in support
  container.define('pattern', random.randexp); // safe auto-increment values

  container.define('autoIncrement', function autoIncrement(value, schema) {
    if (!this.offset) {
      var min = schema.minimum || 1;
      var max = min + env.MAX_NUMBER;
      var offset = value.initialOffset || schema.initialOffset;
      this.offset = offset || random.number(min, max);
    }

    if (value === true) {
      return this.offset++; // eslint-disable-line
    }

    return schema;
  }); // safe-and-sequential dates

  container.define('sequentialDate', function sequentialDate(value, schema) {
    if (!this.now) {
      this.now = random.date();
    }

    if (value) {
      schema = this.now.toISOString();
      value = value === true ? 'days' : value;

      if (['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'].indexOf(value) === -1) {
        throw new Error(("Unsupported increment by " + (utils.short(value))));
      }

      this.now.setTime(this.now.getTime() + random.date(value));
    }

    return schema;
  });
}

function getRefs(refs) {
  var $refs = {};

  if (Array.isArray(refs)) {
    refs.forEach(function (schema) {
      $refs[schema.$id || schema.id] = schema;
    });
  } else {
    $refs = refs || {};
  }

  return $refs;
}

var jsf = function (schema, refs, cwd) {
  console.log('[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()');

  if (cwd) {
    console.log('[json-schema-faker] references are only supported by calling .resolve()');
  }

  return jsf.generate(schema, refs);
};

jsf.generate = function (schema, refs) {
  var $refs = getRefs(refs);
  return run($refs, schema, container);
};

jsf.resolve = function (schema, refs, cwd) {
  if (typeof refs === 'string') {
    cwd = refs;
    refs = {};
  } // normalize basedir (browser aware)


  cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
  cwd = (cwd.replace(/\/+$/, '')) + "/";
  var $refs = getRefs(refs); // identical setup as json-schema-sequelizer

  var fixedRefs = {
    order: 300,
    canRead: true,

    read: function read(file, callback) {
      try {
        callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
      } catch (e) {
        callback(e);
      }
    }

  };
  return $RefParser.dereference(cwd, schema, {
    resolve: {
      file: {
        order: 100
      },
      http: {
        order: 200
      },
      fixedRefs: fixedRefs
    },
    dereference: {
      circular: 'ignore'
    }
  }).then(function (sub) { return run($refs, sub, container); });
};

setupKeywords();
jsf.format = formatAPI;
jsf.option = optionAPI;
jsf.random = random; // returns itself for chaining

jsf.extend = function (name, cb) {
  container.extend(name, cb);
  return jsf;
};

jsf.define = function (name, cb) {
  container.define(name, cb);
  return jsf;
};

jsf.reset = function (name) {
  container.reset(name);
  setupKeywords();
  return jsf;
};

jsf.locate = function (name) {
  return container.get(name);
};

jsf.version = '0.5.0-rc16';

module.exports = jsf;
