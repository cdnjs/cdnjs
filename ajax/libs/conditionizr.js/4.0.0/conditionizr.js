/*!
 * Conditionizr v4.0.0
 * Detecting front-end environments and conditionally loading assets
 * https://github.com/conditionizr/conditionizr
 * Authors: @toddmotto and @markgdyr
 * Copyright 2013
 * MIT licensed
 */

window.conditionizr = (function (window, document, undefined) {

  'use strict';

  var conditionizr = {};
  var head = document.head || document.getElementsByTagName('head')[0];
  var assets;

  var _loadDependencies = function (prop, type, ext) {

    var path = (ext ? '' : (assets || '')) + prop + (type === 'script' ? '.js' : '.css');

    if (!ext && !conditionizr[prop]) {
      return;
    }

    switch (type) {
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
        document.documentElement.className += ' ' + prop;
        break;
    }

  };

  conditionizr.add = function (tests, dependencies, callback) {

    var test = tests.toLowerCase();

    if (conditionizr[test] !== undefined) {
      throw new Error('Test ' + test + ' already exists');
    }

    if (!callback) {
      callback = dependencies;
    }

    conditionizr[test] = callback();

    if (dependencies instanceof Array) {
      for (var i = 0; i < dependencies.length; i++) {
        var self = dependencies[i];
        _loadDependencies(test, self);
      }
    } else {
      throw new Error('Dependencies must be an array');
    }

  };

  conditionizr.config = function (obj) {

    var options = obj || {};
    assets = options.assets || '';
    var tests = options.tests;

    for (var prop in tests) {
      var values = tests[prop];
      for (var i = 0; i < values.length; i++) {
        var self = values[i];
        _loadDependencies(prop, self);
      }
    }

  };

  conditionizr.on = function (tests, callback) {

    var test = tests.toLowerCase();
    var exc = /^!/;

    if (exc.test(test)) {
      var prop = test.replace(exc, '');
      if (!conditionizr[prop]) {
        callback();
      }
    }

    if (!conditionizr[test] || !callback) {
      return;
    }

    callback();

  };

  conditionizr.load = conditionizr.polyfill = function (files, props) {

    var type = /\.js$/.test(files) ? 'script' : 'style';
    var file = files.replace(/\.(js|css)$/, '');

    for (var i = 0; i < props.length; i++) {
      if (conditionizr[props[i]]) {
        _loadDependencies(file, type, true);
      }
    }

  };

  return conditionizr;

})(window, document);