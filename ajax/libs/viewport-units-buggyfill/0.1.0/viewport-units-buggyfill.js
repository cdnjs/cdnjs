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
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window*/

  var viewportUnitExpression = /([0-9.-]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var join = [].join;
  var dimensions;
  var declarations;
  var styleNode;

  function initialize() {
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    window.addEventListener('orientationchange', updateStyles, true);
    refresh();
  }

  function updateStyles() {
    styleNode.innerText = getReplacedViewportUnits();
  }

  function refresh() {
    findProperties();
    updateStyles();
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id !== 'patched-viewport') {
        forEach.call(sheet.cssRules, findDeclarations);
      }
    });
    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value = rule.cssText;
      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, null, value]);
      }
      return;
    }

    if (!rule.style) {
      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();
    return declarations.map(function(item) {
      return overwriteDeclaration.apply(null, item);
    }).join('\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value = value.replace(viewportUnitExpression, replaceValues);
    if (name) {
      _value = rule.selectorText + ' { ' + name + ': ' + _value + '; }';
    }

    var _rule = wrapMedia(rule, _value);
    return _rule;
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function wrapMedia(rule, declaration) {
    var stack = [];

    var _rule = rule.parentRule;
    while (_rule) {
      stack.unshift('@media ' + join.call(_rule.media, ', ') + ' { ');
      declaration += ' } ';
      _rule = _rule.parentRule;
    }

    return stack.join('') + declaration;
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;
    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  return {
    version: '0.1.0',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };
}));