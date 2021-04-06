/*
* pattern-matcher.js
*
* Parses a pattern specification and determines appropriate pattern for an
* input string
*
*/


var pattern = require('pattern');
var utils = require('utils');


//
// Parse a matcher string into a RegExp. Accepts valid regular
// expressions and the catchall '*'.
// @private
//
var parseMatcher = function (matcher) {
  if (matcher === '*') {
    return /.*/;
  }
  return new RegExp(matcher);
};

//
// Parse a pattern spec and return a function that returns a pattern
// based on user input. The first matching pattern will be chosen.
// Pattern spec format:
// Array [
//  Object: { Matcher(RegExp String) : Pattern(Pattern String) },
//  ...
// ]
function patternMatcher (patternSpec) {
  var matchers = [],
    patterns = [];

  // Iterate over each pattern in order.
  utils.forEach(patternSpec, function (patternMatcher) {
    // Process single property object to obtain pattern and matcher.
    utils.forEach(patternMatcher, function (patternStr, matcherStr) {
      var parsedPattern = pattern.parse(patternStr),
        regExpMatcher = parseMatcher(matcherStr);

      matchers.push(regExpMatcher);
      patterns.push(parsedPattern);

      // Stop after one iteration.
      return false;
    });
  });

  var getPattern = function (input) {
    var matchedIndex;
    utils.forEach(matchers, function (matcher, index) {
      if (matcher.test(input)) {
        matchedIndex = index;
        return false;
      }
    });

    return matchedIndex === undefined ? null : patterns[matchedIndex];
  };

  return {
    getPattern: getPattern,
    patterns: patterns,
    matchers: matchers
  };
}


// Expose
module.exports = patternMatcher;


