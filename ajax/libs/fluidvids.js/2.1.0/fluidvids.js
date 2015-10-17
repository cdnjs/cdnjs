/*!
 *  FluidVids.js v2.1.0
 *  Responsive and fluid YouTube/Vimeo video embeds.
 *  Project: https://github.com/toddmotto/fluidvids
 *  by Todd Motto: http://toddmotto.com
 *
 *  Copyright 2013 Todd Motto. MIT licensed.
 */
window.Fluidvids = (function (window, document, undefined) {

  'use strict';

  var players, obj;
  var head = document.head || document.getElementsByTagName('head')[0];
  var css = '.fluidvids-elem{position:absolute;top:0px;left:0px;width:100%;' +
  'height:100%;}.fluidvids{width:100%;position:relative;}';

  var _matchesPlayer = function (source) {
    players = new RegExp('^(https?:)?\/\/(?:' + obj.join('|') + ').*$', 'i');
    return players.test(source);
  };

  var _render = function (elem) {
    var wrap = document.createElement('div');
    var thisParent = elem.parentNode;
    var ratio = (parseInt(elem.height ? elem.height : elem.offsetHeight, 10) /
      (parseInt(elem.width ? elem.width : elem.offsetWidth, 10)) * 100);

    thisParent.insertBefore(wrap, elem);
    elem.className += ' fluidvids-elem';
    wrap.className += ' fluidvids';
    wrap.style.paddingTop = ratio + '%';
    wrap.appendChild(elem);
  };

  var _appendStyles = function () {
    var div = document.createElement('div');
    div.innerHTML = '<p>x</p><style>' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  };

  var init = function (object) {
    var options = object || {};
    var selector = options.selector || 'iframe';
    obj = options.players || ['www.youtube.com', 'player.vimeo.com'];
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      var self = nodes[i];
      if (_matchesPlayer(self.src)) {
        _render(self);
      }
    }
    _appendStyles();
  };

  return {
    init: init
  };

})(window, document);
