'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Seqr = _interopDefault(require('seqr'));
var Emitus = _interopDefault(require('emitus'));

function prelodr (options) {
  if ( options === void 0 ) options = {};

  var defaults = Object.assign(
    {
      container: document.body,
      duration: 750,
      zIndex: 100,
      auto: false,
      text: 'Loading...',
      prefixClass: 'prelodr'
    },
    options
  );

  var emitter = Emitus({
    show: show,
    hide: hide,
    setText: setText,
    getElement: getElement,
    setPrefixClass: setPrefixClass,
    setDuration: setDuration,
    setZIndex: setZIndex
  });

  var seqr = Seqr();
  var cls = getClasses();

  var wrapper = el();
  wrapper.className = (cls.prefix) + " " + (cls.hide);
  wrapper.innerHTML = "<span><span><span class=\"" + (cls.text) + "\">" + (defaults.text) + "</span><span class=\"" + (cls.progressbar) + "\"></span></span></span>";

  var spanText = find(("." + (cls.text)));
  var spanProgressbar = find(("." + (cls.progressbar)));

  defaults.container.appendChild(wrapper);

  if (defaults.auto) { show(defaults.text); }

  setZIndex(defaults.zIndex);

  return emitter

  function show (str) {
    seqr.then(function (done) {
      setText(str);

      wrapper.classList.remove(cls.hide);

      setTimeout(function () {
        spanText.classList.add(cls.in);
        wrapper.classList.add(cls.in);
      }, 10);

      setTimeout(function () {
        emitter.emit('shown');
        done();
      }, defaults.duration);
    });

    return emitter
  }

  function hide (fn) {
    seqr.then(function (done) {
      spanText.classList.remove(cls.in);
      wrapper.classList.remove(cls.in);

      setTimeout(function () {
        wrapper.classList.add(cls.hide);

        if (fn) { fn(done); }
        else { done(); }

        emitter.emit('hidden');
      }, defaults.duration);
    });

    return emitter
  }

  function setText (str) {
    if (!str && defaults.text) { str = defaults.text; }

    defaults.text = str;
    spanText.innerHTML = str;

    return emitter
  }

  function getElement () {
    return wrapper
  }

  function setDuration (duration) {
    defaults.duration = duration;
  }

  function setZIndex (zindex) {
    defaults.zIndex = zindex;
    wrapper.style.zIndex = zindex;
  }

  function setPrefixClass (prefix) {
    defaults.prefixClass = prefix;
    updateClasses();
  }

  function updateClasses () {
    var from = cls;

    cls = getClasses();
    replaceClass(wrapper, from.prefix, cls.prefix);
    replaceClass(spanText, from.text, cls.text);
    replaceClass(spanProgressbar, from.progressbar, cls.progressbar);
  }

  function getClasses () {
    return {
      prefix: defaults.prefixClass,
      in: ((defaults.prefixClass) + "-in"),
      hide: ((defaults.prefixClass) + "-hide"),
      text: ((defaults.prefixClass) + "-text"),
      progressbar: ((defaults.prefixClass) + "-progressbar")
    }
  }

  function el (tag) {
    if ( tag === void 0 ) tag = 'span';

    return document.createElement(tag)
  }

  function find (q) {
    return wrapper.querySelector(q)
  }

  function replaceClass (elem, from, to) {
    elem.classList.remove(from);
    elem.classList.add(to);
  }
}

module.exports = prelodr;
//# sourceMappingURL=prelodr.js.map
