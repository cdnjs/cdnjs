/*! Fluidvids v2.2.0 | (c) 2014 @toddmotto | github.com/toddmotto/fluidvids */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.fluidvids = factory();
  }
})(this, function () {

  'use strict';

  var exports = {
    selector: 'iframe',
    players: ['www.youtube.com', 'player.vimeo.com']
  };

  var head = document.head || document.getElementsByTagName('head')[0];
  var css = '.fluidvids{width:100%;position:relative;}' +
            '.fluidvids iframe{position:absolute;top:0px;left:0px;width:100%;height:100%;}';

  var _matches = function (source) {
    var regexp = new RegExp('^(https?:)?\/\/(?:' + exports.players.join('|') + ').*$', 'i');
    return regexp.test(source);
  };

  var _render = function (elem) {
    if (!!elem.getAttribute('data-fluidvids')) {
      return;
    }
    var wrap = document.createElement('div');
    var ratio = (parseInt(elem.height ? elem.height : elem.offsetHeight, 10) / (parseInt(elem.width ? elem.width : elem.offsetWidth, 10)) * 100);
    elem.parentNode.insertBefore(wrap, elem);
    elem.setAttribute('data-fluidvids', 'loaded');
    wrap.className += 'fluidvids';
    wrap.style.paddingTop = ratio + '%';
    wrap.appendChild(elem);
  };

  var _addStyles = function () {
    var div = document.createElement('div');
    div.innerHTML = '<p>x</p><style>' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  };

  exports.apply = function () {
    var nodes = document.querySelectorAll(exports.selector);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (_matches(node.src)) {
        _render(node);
      }
    }
  };

  exports.init = function (obj) {
    for (var key in obj) {
      exports[key] = obj[key];
    }
    exports.apply();
    _addStyles();
  };

  return exports;

});
