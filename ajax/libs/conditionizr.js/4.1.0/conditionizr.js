/*!
 * Conditionizr v4.1.0
 * Detecting front-end environments and conditionally loading assets
 * https://github.com/conditionizr/conditionizr
 * Authors: @toddmotto and @markgdyr
 * Copyright 2013
 * MIT licensed
 */
window.conditionizr = (function (window, document, undefined) {

  'use strict';

  /**
   * @name conditionizr
   */
  var conditionizr = {}, assets;
  var head = document.head || document.getElementsByTagName('head')[0];

  /**
   * _loader
   * @private
   * @param {String} testName Name of test dependency, or file name
   * @param {String} testDep Type of dependency
   * @param {Boolean} load True if external resource (load/polyfill)
   */
  var _loader = function (testName, testDep, load) {
    var path = load ? testName : assets + testName + (testDep === 'style' ? '.css' : '.js');
    switch (testDep) {
    case 'script':
      var script = document.createElement('script');
      script.src = path;
      head.appendChild(script);
      break;
    case 'style':
      var style = document.createElement('link');
      style.href = path;
      style.rel = 'stylesheet';
      head.appendChild(style);
      break;
    case 'class':
      document.documentElement.className += ' ' + testName;
      break;
    }
  };

  /**
   * conditionizr.config
   * @param {Object} config Asset path and test configuration
   */
  conditionizr.config = function (config) {
    var options = config || {};
    var tests = options.tests;
    assets = options.assets || '';
    for (var testName in tests) {
      var newTest = testName.toLowerCase();
      if (conditionizr[newTest]) {
        var testDeps = tests[testName];
        for (var i = testDeps.length; i--;) {
          _loader(newTest, testDeps[i]);
        }
      }
    }
  };

  /**
   * conditionizr.add
   * @param {String} testName Added test name
   * @param {Array} testDeps Dependencies for loading
   * @param {Function} testFn Evaluate test to boolean
   */
  conditionizr.add = function (testName, testDeps, testFn) {
    conditionizr[testName.toLowerCase()] = testFn();
    for (var i = testDeps.length; i--;) {
      _loader(testName, testDeps[i]);
    }
  };

  /**
   * conditionizr.on
   * @param {String} testName Name of test to callback for
   * @param {Function} testFn Callback on successful test
   */
  conditionizr.on = function (testName, testFn) {
    var not = /^\!/;
    if (conditionizr[testName.toLowerCase()] || (not.test(testName) && !conditionizr[testName.replace(not, '')])) {
      testFn();
    }
  };

  /**
   * conditionizr.load && conditionizr.polyfill
   * @param {String} resource Name of resource to load
   * @param {Array} testNames Tests to load resource for
   */
  conditionizr.load = conditionizr.polyfill = function (resource, testNames) {
    var testDep = /\.js$/.test(resource) ? 'script' : 'style';
    for (var i = testNames.length; i--;) {
      if (conditionizr[testNames[i].toLowerCase()]) {
        _loader(resource, testDep, true);
      }
    }
  };

  return conditionizr;

})(this, document);
