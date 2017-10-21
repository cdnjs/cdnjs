import map from './route-recognizer/dsl';
import Normalizer from './route-recognizer/normalizer';

var normalizePath = Normalizer.normalizePath;
var normalizeSegment = Normalizer.normalizeSegment;

var specials = [
  '/', '.', '*', '+', '?', '|',
  '(', ')', '[', ']', '{', '}', '\\'
];

var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

function isArray(test) {
  return Object.prototype.toString.call(test) === "[object Array]";
}

// A Segment represents a segment in the original route description.
// Each Segment type provides an `eachChar` and `regex` method.
//
// The `eachChar` method invokes the callback with one or more character
// specifications. A character specification consumes one or more input
// characters.
//
// The `regex` method returns a regex fragment for the segment. If the
// segment is a dynamic of star segment, the regex fragment also includes
// a capture.
//
// A character specification contains:
//
// * `validChars`: a String with a list of all valid characters, or
// * `invalidChars`: a String with a list of all invalid characters
// * `repeat`: true if the character specification can repeat

function StaticSegment(string) { this.string = normalizeSegment(string); }
StaticSegment.prototype = {
  eachChar: function(currentState) {
    var string = this.string, ch;

    for (var i=0; i<string.length; i++) {
      ch = string.charAt(i);
      currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: ch });
    }

    return currentState;
  },

  regex: function() {
    return this.string.replace(escapeRegex, '\\$1');
  },

  generate: function() {
    return this.string;
  }
};

function DynamicSegment(name) { this.name = normalizeSegment(name); }
DynamicSegment.prototype = {
  eachChar: function(currentState) {
    return currentState.put({ invalidChars: "/", repeat: true, validChars: undefined });
  },

  regex: function() {
    return "([^/]+)";
  },

  generate: function(params) {
    if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS) {
      return encodeURIComponent(params[this.name]);
    } else {
      return params[this.name];
    }
  }
};

function StarSegment(name) { this.name = name; }
StarSegment.prototype = {
  eachChar: function(currentState) {
    return currentState.put({ invalidChars: "", repeat: true, validChars: undefined });
  },

  regex: function() {
    return "(.+)";
  },

  generate: function(params) {
    return params[this.name];
  }
};

function EpsilonSegment() {}
EpsilonSegment.prototype = {
  eachChar: function(currentState) {
    return currentState;
  },
  regex: function() { return ""; },
  generate: function() { return ""; }
};

// The `names` will be populated with the paramter name for each dynamic/star
// segment. `shouldDecodes` will be populated with a boolean for each dyanamic/star
// segment, indicating whether it should be decoded during recognition.
function parse(route, names, specificity, shouldDecodes) {
  // normalize route as not starting with a "/". Recognition will
  // also normalize.
  if (route.charAt(0) === "/") { route = route.substr(1); }

  var segments = route.split("/");
  var results = new Array(segments.length);

  // A routes has specificity determined by the order that its different segments
  // appear in. This system mirrors how the magnitude of numbers written as strings
  // works.
  // Consider a number written as: "abc". An example would be "200". Any other number written
  // "xyz" will be smaller than "abc" so long as `a > x`. For instance, "199" is smaller
  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
  // leading symbol, "1".
  // The rule is that symbols to the left carry more weight than symbols to the right
  // when a number is written out as a string. In the above strings, the leading digit
  // represents how many 100's are in the number, and it carries more weight than the middle
  // number which represents how many 10's are in the number.
  // This system of number magnitude works well for route specificity, too. A route written as
  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
  // `x`, irrespective of the other parts.
  // Because of this similarity, we assign each type of segment a number value written as a
  // string. We can find the specificity of compound routes by concatenating these strings
  // together, from left to right. After we have looped through all of the segments,
  // we convert the string to a number.
  specificity.val = '';

  for (var i=0; i<segments.length; i++) {
    var segment = segments[i], match;

    if (match = segment.match(/^:([^\/]+)$/)) {
      results[i] = new DynamicSegment(match[1]);
      names.push(match[1]);
      shouldDecodes.push(true);
      specificity.val += '3';
    } else if (match = segment.match(/^\*([^\/]+)$/)) {
      results[i] = new StarSegment(match[1]);
      names.push(match[1]);
      shouldDecodes.push(false);
      specificity.val += '1';
    } else if(segment === "") {
      results[i] = new EpsilonSegment();
      specificity.val += '2';
    } else {
      results[i] = new StaticSegment(segment);
      specificity.val += '4';
    }
  }

  specificity.val = +specificity.val;

  return results;
}

// A State has a character specification and (`charSpec`) and a list of possible
// subsequent states (`nextStates`).
//
// If a State is an accepting state, it will also have several additional
// properties:
//
// * `regex`: A regular expression that is used to extract parameters from paths
//   that reached this accepting state.
// * `handlers`: Information on how to convert the list of captures into calls
//   to registered handlers with the specified parameters
// * `types`: How many static, dynamic or star segments in this route. Used to
//   decide which route to use if multiple registered routes match a path.
//
// Currently, State is implemented naively by looping over `nextStates` and
// comparing a character specification against a character. A more efficient
// implementation would use a hash of keys pointing at one or more next states.

function State(charSpec) {
  this.charSpec = charSpec;
  this.nextStates = [];
  this.charSpecs = {};
  this.regex = undefined;
  this.handlers = undefined;
  this.specificity = undefined;
}

State.prototype = {
  get: function(charSpec) {
    if (this.charSpecs[charSpec.validChars]) {
      return this.charSpecs[charSpec.validChars];
    }

    var nextStates = this.nextStates;

    for (var i=0; i<nextStates.length; i++) {
      var child = nextStates[i];

      var isEqual = child.charSpec.validChars === charSpec.validChars;
      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

      if (isEqual) {
        this.charSpecs[charSpec.validChars] = child;
        return child;
      }
    }
  },

  put: function(charSpec) {
    var state;

    // If the character specification already exists in a child of the current
    // state, just return that state.
    if (state = this.get(charSpec)) { return state; }

    // Make a new state for the character spec
    state = new State(charSpec);

    // Insert the new state as a child of the current state
    this.nextStates.push(state);

    // If this character specification repeats, insert the new state as a child
    // of itself. Note that this will not trigger an infinite loop because each
    // transition during recognition consumes a character.
    if (charSpec.repeat) {
      state.nextStates.push(state);
    }

    // Return the new state
    return state;
  },

  // Find a list of child states matching the next character
  match: function(ch) {
    var nextStates = this.nextStates,
        child, charSpec, chars;

    var returned = [];

    for (var i=0; i<nextStates.length; i++) {
      child = nextStates[i];

      charSpec = child.charSpec;

      if (typeof (chars = charSpec.validChars) !== 'undefined') {
        if (chars.indexOf(ch) !== -1) { returned.push(child); }
      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
        if (chars.indexOf(ch) === -1) { returned.push(child); }
      }
    }

    return returned;
  }
};

// Sort the routes by specificity
function sortSolutions(states) {
  return states.sort(function(a, b) {
    return b.specificity.val - a.specificity.val;
  });
}

function recognizeChar(states, ch) {
  var nextStates = [];

  for (var i=0, l=states.length; i<l; i++) {
    var state = states[i];

    nextStates = nextStates.concat(state.match(ch));
  }

  return nextStates;
}

var oCreate = Object.create || function(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};

function RecognizeResults(queryParams) {
  this.queryParams = queryParams || {};
}
RecognizeResults.prototype = oCreate({
  splice: Array.prototype.splice,
  slice:  Array.prototype.slice,
  push:   Array.prototype.push,
  length: 0,
  queryParams: null
});

function findHandler(state, originalPath, queryParams) {
  var handlers = state.handlers, regex = state.regex;
  var captures = originalPath.match(regex), currentCapture = 1;
  var result = new RecognizeResults(queryParams);

  result.length = handlers.length;

  for (var i=0; i<handlers.length; i++) {
    var handler = handlers[i], names = handler.names,
      shouldDecodes = handler.shouldDecodes, params = {};
    var name, shouldDecode, capture;

    for (var j=0; j<names.length; j++) {
      name = names[j];
      shouldDecode = shouldDecodes[j];
      capture = captures[currentCapture++];

      if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS) {
        if (shouldDecode) {
          params[name] = decodeURIComponent(capture);
        } else {
          params[name] = capture;
        }
      } else {
        params[name] = capture;
      }
    }

    result[i] = { handler: handler.handler, params: params, isDynamic: !!names.length };
  }

  return result;
}

function decodeQueryParamPart(part) {
  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
  part = part.replace(/\+/gm, '%20');
  var result;
  try {
    result = decodeURIComponent(part);
  } catch(error) {result = '';}
  return result;
}

// The main interface

var RouteRecognizer = function() {
  this.rootState = new State();
  this.names = {};
};


RouteRecognizer.prototype = {
  add: function(routes, options) {
    var currentState = this.rootState, regex = "^",
        specificity = {},
        handlers = new Array(routes.length), allSegments = [], name;

    var isEmpty = true;

    for (var i=0; i<routes.length; i++) {
      var route = routes[i], names = [], shouldDecodes = [];

      var segments = parse(route.path, names, specificity, shouldDecodes);

      allSegments = allSegments.concat(segments);

      for (var j=0; j<segments.length; j++) {
        var segment = segments[j];

        if (segment instanceof EpsilonSegment) { continue; }

        isEmpty = false;

        // Add a "/" for the new segment
        currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
        regex += "/";

        // Add a representation of the segment to the NFA and regex
        currentState = segment.eachChar(currentState);
        regex += segment.regex();
      }
      var handler = { handler: route.handler, names: names, shouldDecodes: shouldDecodes };
      handlers[i] = handler;
    }

    if (isEmpty) {
      currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
      regex += "/";
    }

    currentState.handlers = handlers;
    currentState.regex = new RegExp(regex + "$");
    currentState.specificity = specificity;

    if (name = options && options.as) {
      this.names[name] = {
        segments: allSegments,
        handlers: handlers
      };
    }
  },

  handlersFor: function(name) {
    var route = this.names[name];

    if (!route) { throw new Error("There is no route named " + name); }

    var result = new Array(route.handlers.length);

    for (var i=0; i<route.handlers.length; i++) {
      result[i] = route.handlers[i];
    }

    return result;
  },

  hasRoute: function(name) {
    return !!this.names[name];
  },

  generate: function(name, params) {
    var route = this.names[name], output = "";
    if (!route) { throw new Error("There is no route named " + name); }

    var segments = route.segments;

    for (var i=0; i<segments.length; i++) {
      var segment = segments[i];

      if (segment instanceof EpsilonSegment) { continue; }

      output += "/";
      output += segment.generate(params);
    }

    if (output.charAt(0) !== '/') { output = '/' + output; }

    if (params && params.queryParams) {
      output += this.generateQueryString(params.queryParams, route.handlers);
    }

    return output;
  },

  generateQueryString: function(params, handlers) {
    var pairs = [];
    var keys = [];
    for(var key in params) {
      if (params.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      var value = params[key];
      if (value == null) {
        continue;
      }
      var pair = encodeURIComponent(key);
      if (isArray(value)) {
        for (var j = 0; j < value.length; j++) {
          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
          pairs.push(arrayPair);
        }
      } else {
        pair += "=" + encodeURIComponent(value);
        pairs.push(pair);
      }
    }

    if (pairs.length === 0) { return ''; }

    return "?" + pairs.join("&");
  },

  parseQueryString: function(queryString) {
    var pairs = queryString.split("&"), queryParams = {};
    for(var i=0; i < pairs.length; i++) {
      var pair      = pairs[i].split('='),
          key       = decodeQueryParamPart(pair[0]),
          keyLength = key.length,
          isArray = false,
          value;
      if (pair.length === 1) {
        value = 'true';
      } else {
        //Handle arrays
        if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
          isArray = true;
          key = key.slice(0, keyLength - 2);
          if(!queryParams[key]) {
            queryParams[key] = [];
          }
        }
        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
      }
      if (isArray) {
        queryParams[key].push(value);
      } else {
        queryParams[key] = value;
      }
    }
    return queryParams;
  },

  recognize: function(path) {
    var states = [ this.rootState ],
        pathLen, i, l, queryStart, queryParams = {},
        hashStart,
        isSlashDropped = false;

    hashStart = path.indexOf('#');
    if (hashStart !== -1) {
      path = path.substr(0, hashStart);
    }

    queryStart = path.indexOf('?');
    if (queryStart !== -1) {
      var queryString = path.substr(queryStart + 1, path.length);
      path = path.substr(0, queryStart);
      queryParams = this.parseQueryString(queryString);
    }

    if (path.charAt(0) !== "/") { path = "/" + path; }
    var originalPath = path;

    if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS) {
      path = normalizePath(path);
    } else {
      path = decodeURI(path);
      originalPath = decodeURI(originalPath);
    }

    pathLen = path.length;
    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
      path = path.substr(0, pathLen - 1);
      originalPath = originalPath.substr(0, pathLen - 1);
      isSlashDropped = true;
    }

    for (i=0; i<path.length; i++) {
      states = recognizeChar(states, path.charAt(i));
      if (!states.length) { break; }
    }

    var solutions = [];
    for (i=0; i<states.length; i++) {
      if (states[i].handlers) { solutions.push(states[i]); }
    }

    states = sortSolutions(solutions);

    var state = solutions[0];

    if (state && state.handlers) {
      // if a trailing slash was dropped and a star segment is the last segment
      // specified, put the trailing slash back
      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
         originalPath = originalPath + "/";
       }
      return findHandler(state, originalPath, queryParams);
    }
  }
};

RouteRecognizer.prototype.map = map;

RouteRecognizer.VERSION = '0.2.0';

// Set to false to opt-out of encoding and decoding path segments.
// See https://github.com/tildeio/route-recognizer/pull/55
RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS = true;

RouteRecognizer.Normalizer = Normalizer;

export default RouteRecognizer;
