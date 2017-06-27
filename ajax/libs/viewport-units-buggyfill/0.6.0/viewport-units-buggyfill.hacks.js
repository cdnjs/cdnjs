/*!
 * viewport-units-buggyfill.hacks v0.6.0
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Zoltan Hawryluk - http://www.useragentman.com/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfillHacks = factory();
  }
}(this, function () {
  'use strict';

  var options;
  var calcExpression = /calc\(/g;
  var quoteExpression = /[\"\']/g;
  var urlExpression = /url\([^\)]*\)/g;
  var userAgent = window.navigator.userAgent;
  var isBuggyIE = /MSIE [0-9]\./i.test(userAgent);
  var isOldIE = /MSIE [0-8]\./i.test(userAgent);
  var supportsVminmax = true;
  var supportsVminmaxCalc = true;

  // added check for IE10, IE11 and Edge < 20, since it *still* doesn't understand vmax
  // http://caniuse.com/#feat=viewport-units
  if (!isBuggyIE) {
    isBuggyIE = !!navigator.userAgent.match(/Trident.*rv[ :]*1[01]\.| Edge\/1\d\./);
  }

  if (isBuggyIE === true) {
    supportsVminmaxCalc = false;
    supportsVminmax = false;
  }

  // iOS SAFARI, IE9, or Stock Android: abuse "content" if "viewport-units-buggyfill" specified
  function checkHacks(declarations, rule, name, value) {
    var needsHack = name === 'content' && value.indexOf('viewport-units-buggyfill') > -1;
    if (!needsHack) {
      return;
    }

    var fakeRules = value.replace(quoteExpression, '');
    fakeRules.split(';').forEach(function(fakeRuleElement) {
      var fakeRule = fakeRuleElement.split(':');
      if (fakeRule.length !== 2) {
        return;
      }

      var name = fakeRule[0].trim();
      if (name === 'viewport-units-buggyfill') {
        return;
      }

      var value = fakeRule[1].trim();
      declarations.push([rule, name, value]);
      if (calcExpression.test(value)) {
        var webkitValue = value.replace(calcExpression, '-webkit-calc(');
        declarations.push([rule, name, webkitValue]);
      }
    });
  }

  return {
    required: function(options) {
      return options.isMobileSafari || isBuggyIE;
    },

    initialize: function(initOptions) {
      options = initOptions;

      // Test viewport units support in calc() expressions
      var div = document.createElement('div');
      div.style.width = '1vmax';
      supportsVminmax = div.style.width !== '';

      // there is no accurate way to detect this programmatically.
      if (options.isMobileSafari || options.isBadStockAndroid) {
        supportsVminmaxCalc = false;
      }

    },

    initializeEvents: function(options, refresh, _refresh) {
      if (options.force) {
        return;
      }

      if (isBuggyIE && !options._listeningToResize) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }
    },

    findDeclarations: function(declarations, rule, name, value) {
      if (name === null) {
        // KeyframesRule does not have a CSS-PropertyName
        return;
      }

      checkHacks(declarations, rule, name, value);
    },

    overwriteDeclaration: function(rule, name, _value) {
      if (isBuggyIE && name === 'filter') {
        // remove unit "px" from complex value, e.g.:
        // filter: progid:DXImageTransform.Microsoft.DropShadow(OffX=5.4px, OffY=3.9px, Color=#000000);
        _value = _value.replace(/px/g, '');
      }

      return _value;
    }
  };

}));
