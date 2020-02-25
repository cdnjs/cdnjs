var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @name ityped
 * @description Dead simple Animated Type with no dependencies
 * @author Luis Vinícius
 */;
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    module.exports = {
      init: factory.init
    };
  } else {
    root.ityped = factory;
  }
})(this, function (global) {
  (function (a) {
    a.forEach = function (a, b, c) {
      var d = -1,
          e = a.length >>> 0;
      (function f(g) {
        var h,
            j = g === !1;
        do {
          ++d;
        } while (!(d in a) && d !== e);
        if (j || d === e) {
          c && c(!j, a);
          return;
        }
        g = b.call({
          async: function async() {
            return h = !0, f;
          }
        }, a[d], d, a), h || f(g);
      })();
    };
  })((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && exports || global);

  /**
   * el is the element
   */
  var el = void 0,
      props = void 0,
      cursor = document.createElement('span');

  /**
   * creating the cursor
   */
  cursor.classList.add('ityped-cursor');
  cursor.textContent = '|';

  function loopingOnWords(words, handler) {
    forEach(words, function (word, index, arr) {
      var time = props.typeSpeed * word.length - 1;
      var done = this.async();
      var len = words.length;
      iterateWords(el, word, index, len).then(function () {
        setTimeout(function () {
          done();
        }, time);
      });
    }, function () {
      if (props.loop) {
        loopingOnWords(words);
      }
    });
  }

  function init(element, config) {
    el = document.querySelector(element);
    props = config;

    props.typeSpeed = config.typeSpeed || 100;
    props.pause = config.pause || props.typeSpeed * 4;
    props.loop = config.loop || false;

    el.insertAdjacentElement('afterend', cursor);
    var words = props.strings,
        len = words.length;

    loopingOnWords(words);
  }

  function increment(span, word, interval) {
    return new Promise(function (resolve, reject) {
      var _loop = function _loop(i) {
        count = 0;
        var wordIndex = i;
        var len = word.length;
        setTimeout(function (i) {
          appendWord(span, word.charAt(wordIndex));
          count++;
          if (count === len - 1) {
            resolve();
          }
        }, props.typeSpeed * i);
      };

      for (var i = 0; i < word.length; i++) {
        _loop(i);
      }
    });
  }

  function appendWord(el, word) {
    el.innerHTML += word;
  }

  function iterateWords(element, word, index, wordsLengthArray) {
    return new Promise(function (resolve, reject) {
      increment(element, word).then(function () {
        setTimeout(function () {
          decrement(element, word, index, wordsLengthArray).then(function () {
            resolve();
          });
        }, props.pause || props.typeSpeed * 2);
      });
    });
  }

  function interateInsideDecrement(span, word, len, resolve) {
    var _loop2 = function _loop2() {
      var iteratedI = i;
      var count = len;
      setTimeout(function (i) {
        span.innerHTML = word.substring(0, len - iteratedI);
        count--;
        if (iteratedI === 1) {
          resolve();
        }
      }, props.typeSpeed / 2 * i);
    };

    for (var i = len; i > 0; i--) {
      _loop2();
    }
  }

  function decrement(span, word, index, lengthWords) {
    return new Promise(function (resolve, reject) {
      var len = word.length;
      if (!props.loop && index + 1 === lengthWords) {
        span.innerHTML = word;
      } else if (props.loop) {
        interateInsideDecrement(span, word, len, resolve);
      } else if (index + 1 !== lengthWords) {
        interateInsideDecrement(span, word, len, resolve);
      }
    });
  }
  return { init: init };
}(this));
//# sourceMappingURL=ityped.js.map
