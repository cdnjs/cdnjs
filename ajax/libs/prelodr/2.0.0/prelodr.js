/*! prelodr v2.0.0 | MIT (c) 2016 José Luis Quintana */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('Prelodr', ['module', 'seqr', 'emitus'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('seqr'), require('emitus'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Seqr, global.Emitus);
    global.Prelodr = mod.exports;
  }
})(this, function (module, Seqr, Emitus) {
  'use strict';

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opts = _extends({
      container: document.body,
      duration: 750,
      prefixClass: 'prelodr'
    }, options);

    var seqr = Seqr();
    var emitr = Emitus({ show: show, hide: hide, text: text });

    var element = el();
    var wrapper = el();
    var progressbar = el();
    var spanText = el();
    var textNode = el();
    var clsIn = opts.prefixClass + '-in';
    var clsHide = opts.prefixClass + '-hide';

    spanText.appendChild(textNode);
    wrapper.appendChild(spanText);
    spanText.appendChild(progressbar);
    element.appendChild(wrapper);
    element.className = opts.prefixClass;
    progressbar.className = opts.prefixClass + '-progressbar';
    element.classList.add(clsHide);
    opts.container.appendChild(element);

    return emitr;

    function show(str) {
      seqr.then(function (done) {
        text(str);

        element.classList.remove(clsHide);

        setTimeout(function () {
          spanText.classList.add(clsIn);
          element.classList.add(clsIn);
        }, 10);

        setTimeout(function () {
          emitr.emit('shown');
          done();
        }, opts.duration);
      });

      return emitr;
    }

    function hide(fn) {
      seqr.then(function (done) {
        spanText.classList.remove(clsIn);
        element.classList.remove(clsIn);

        setTimeout(function () {
          element.classList.add(clsHide);

          if (fn) fn(done);else done();

          emitr.emit('hidden');
        }, opts.duration);
      });

      return emitr;
    }

    function text() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';

      textNode.innerHTML = str;
    }

    function el() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';

      return document.createElement(tag);
    }
  };
});

