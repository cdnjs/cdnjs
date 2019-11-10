(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Zooming = factory());
}(this, (function () { 'use strict';

// webkit prefix
var prefix = 'WebkitAppearance' in document.documentElement.style ? '-webkit-' : '';
var pressDelay = 200;

var options = {
  defaultZoomable: 'img[data-action="zoom"]',
  enableGrab: true,
  transitionDuration: '.4s',
  transitionTimingFunction: 'cubic-bezier(.4,0,0,1)',
  bgColor: '#fff',
  bgOpacity: 1,
  scaleBase: 1.0,
  scaleExtra: 0.5,
  scrollThreshold: 40,
  onOpen: null,
  onClose: null,
  onGrab: null,
  onRelease: null,
  onBeforeOpen: null,
  onBeforeClose: null,
  onBeforeGrab: null,
  onBeforeRelease: null
};

var sniffTransition = function sniffTransition(el) {
  var ret = {};
  var trans = ['webkitTransition', 'transition', 'mozTransition'];
  var tform = ['webkitTransform', 'transform', 'mozTransform'];
  var end = {
    'transition': 'transitionend',
    'mozTransition': 'transitionend',
    'webkitTransition': 'webkitTransitionEnd'
  };

  trans.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transitionProp = prop;
      ret.transEndEvent = end[prop];
      return true;
    }
  });

  tform.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transformProp = prop;
      ret.transformCssProp = prop.replace(/(.*)Transform/, '-$1-transform');
      return true;
    }
  });

  return ret;
};

var checkTrans = function checkTrans(transitionProp, transformProp) {
  return function setStyle(el, styles, remember) {
    var value = void 0;
    if (styles.transition) {
      value = styles.transition;
      delete styles.transition;
      styles[transitionProp] = value;
    }
    if (styles.transform) {
      value = styles.transform;
      delete styles.transform;
      styles[transformProp] = value;
    }

    var s = el.style;
    var original = {};

    for (var key in styles) {
      if (remember) original[key] = s[key] || '';
      s[key] = styles[key];
    }

    return original;
  };
};

var _this = undefined;

// elements
var body = document.body;
var overlay = document.createElement('div');
var target = void 0;
var parent = void 0;

// state
var shown = false;
var lock = false;
var press = false;
var _grab = false;
var lastScrollPosition = null;

// style
var originalStyles = void 0;
var openStyles = void 0;
var translate = void 0;
var scale = void 0;

var srcThumbnail = void 0;
var imgRect = void 0;
var pressTimer = void 0;

var trans = sniffTransition(overlay);
var transformCssProp = trans.transformCssProp;
var transEndEvent = trans.transEndEvent;
var setStyleHelper = checkTrans(trans.transitionProp, trans.transformProp);

// -----------------------------------------------------------------------------

var api$1 = {

  listen: function listen(el) {
    if (typeof el === 'string') {
      document.querySelectorAll(el).forEach(function (e) {
        return api$1.listen(e);
      });
      return _this;
    }

    el.style.cursor = prefix + 'zoom-in';

    el.addEventListener('click', function (e) {
      e.preventDefault();

      if (shown) api$1.close();else api$1.open(el);
    });

    return _this;
  },

  config: function config(opts) {
    if (!opts) return options;

    for (var key in opts) {
      options[key] = opts[key];
    }

    setStyle$1(overlay, {
      backgroundColor: options.bgColor,
      transition: 'opacity\n        ' + options.transitionDuration + '\n        ' + options.transitionTimingFunction
    });

    return _this;
  },

  open: function open(el) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.onOpen;

    if (shown || lock || _grab) return;

    target = typeof el === 'string' ? document.querySelector(el) : el;

    if (target.tagName !== 'IMG') return;

    // onBeforeOpen event
    if (options.onBeforeOpen) options.onBeforeOpen(target);

    shown = true;
    lock = true;
    parent = target.parentNode;

    var img = new Image();
    img.onload = imgOnload();
    img.src = target.getAttribute('src');

    parent.appendChild(overlay);
    setTimeout(function () {
      return overlay.style.opacity = options.bgOpacity;
    }, 30);

    document.addEventListener('scroll', scrollHandler);
    document.addEventListener('keydown', keydownHandler);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);

      if (options.enableGrab) addGrabListeners(target);

      lock = false;

      if (cb) cb(target);
    });

    return _this;
  },

  close: function close() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.onClose;

    if (!shown || lock || _grab) return;
    lock = true;

    // onBeforeClose event
    if (options.onBeforeClose) options.onBeforeClose(target);
    overlay.style.opacity = 0;
    target.style.transform = '';

    document.removeEventListener('scroll', scrollHandler);
    document.removeEventListener('keydown', keydownHandler);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);

      if (options.enableGrab) removeGrabListeners(target);

      shown = false;
      lock = false;
      _grab = false;

      setStyle$1(target, originalStyles);
      parent.removeChild(overlay);

      // downgrade source if possible
      if (target.hasAttribute('data-original')) target.setAttribute('src', srcThumbnail);

      if (cb) cb(target);
    });

    return _this;
  },

  grab: function grab(x, y, start) {
    var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : options.onGrab;

    if (!shown || lock) return;
    _grab = true;

    // onBeforeGrab event
    if (options.onBeforeGrab) options.onBeforeGrab(target);

    var dx = x - window.innerWidth / 2,
        dy = y - window.innerHeight / 2;

    var transform = target.style.transform.replace(/translate3d\(.*?\)/i, 'translate3d(' + (translate.x + dx) + 'px, ' + (translate.y + dy) + 'px, 0)').replace(/scale\([0-9|\.]*\)/i, 'scale(' + (scale + options.scaleExtra) + ')');

    setStyle$1(target, {
      cursor: prefix + ' grabbing',
      transition: transformCssProp + ' ' + (start ? options.transitionDuration + ' ' + options.transitionTimingFunction : 'ease'),
      transform: transform
    });

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);
      if (cb) cb(target);
    });
  },

  release: function release() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.onRelease;

    if (!shown || lock || !_grab) return;

    // onBeforeRelease event
    if (options.onBeforeRelease) options.onBeforeRelease(target);

    setStyle$1(target, openStyles);

    target.addEventListener(transEndEvent, function onEnd() {
      target.removeEventListener(transEndEvent, onEnd);
      _grab = false;
      if (cb) cb(target);
    });

    return _this;
  }
};

// -----------------------------------------------------------------------------

function setStyle$1(el, styles, remember) {
  return setStyleHelper(el, styles, remember);
}

function imgOnload() {
  imgRect = target.getBoundingClientRect();

  // upgrade source if possible
  if (target.hasAttribute('data-original')) {
    srcThumbnail = target.getAttribute('src');

    setStyle$1(target, {
      width: imgRect.width + 'px',
      height: imgRect.height + 'px'
    });

    target.setAttribute('src', target.getAttribute('data-original'));
  }

  // force layout update
  target.offsetWidth;

  openStyles = {
    position: 'relative',
    zIndex: 999,
    cursor: '' + prefix + (options.enableGrab ? 'grab' : 'zoom-out'),
    transition: transformCssProp + '\n      ' + options.transitionDuration + '\n      ' + options.transitionTimingFunction,
    transform: calculateTransform()
  };

  // trigger transition
  originalStyles = setStyle$1(target, openStyles, true);
}

function calculateTransform() {
  var imgHalfWidth = imgRect.width / 2,
      imgHalfHeight = imgRect.height / 2;


  var imgCenter = {
    x: imgRect.left + imgHalfWidth,
    y: imgRect.top + imgHalfHeight
  };

  var windowCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  // The distance between image edge and window edge
  var distFromImageEdgeToWindowEdge = {
    x: windowCenter.x - imgHalfWidth,
    y: windowCenter.y - imgHalfHeight
  };

  var scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth;
  var scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight;

  // The vector to translate image to the window center
  translate = {
    x: windowCenter.x - imgCenter.x,
    y: windowCenter.y - imgCenter.y
  };

  // The additional scale is based on the smaller value of
  // scaling horizontally and scaling vertically
  scale = options.scaleBase + Math.min(scaleHorizontally, scaleVertically);

  return 'translate3d(' + translate.x + 'px, ' + translate.y + 'px, 0) scale(' + scale + ')';
}

function addGrabListeners(el) {
  el.addEventListener('mousedown', mousedownHandler);
  el.addEventListener('mousemove', mousemoveHandler);
  el.addEventListener('mouseup', mouseupHandler);
  el.addEventListener('touchstart', touchstartHandler);
  el.addEventListener('touchmove', touchmoveHandler);
  el.addEventListener('touchend', touchendHandler);
}

function removeGrabListeners(el) {
  el.removeEventListener('mousedown', mousedownHandler);
  el.removeEventListener('mousemove', mousemoveHandler);
  el.removeEventListener('mouseup', mouseupHandler);
  el.removeEventListener('touchstart', touchstartHandler);
  el.removeEventListener('touchmove', touchmoveHandler);
  el.removeEventListener('touchend', touchendHandler);
}

// listeners -----------------------------------------------------------------

function scrollHandler() {
  var scrollTop = window.pageYOffset || (document.documentElement || body.parentNode || body).scrollTop;

  if (lastScrollPosition === null) lastScrollPosition = scrollTop;

  var deltaY = lastScrollPosition - scrollTop;

  if (Math.abs(deltaY) >= options.scrollThreshold) {
    lastScrollPosition = null;
    api$1.close();
  }
}

function keydownHandler(e) {
  var code = e.key || e.code;
  if (code === 'Escape' || e.keyCode === 27) api$1.close();
}

function mousedownHandler(e) {
  e.preventDefault();

  pressTimer = setTimeout(function () {
    press = true;
    api$1.grab(e.clientX, e.clientY, true);
  }, pressDelay);
}

function mousemoveHandler(e) {
  if (press) api$1.grab(e.clientX, e.clientY);
}

function mouseupHandler() {
  clearTimeout(pressTimer);
  press = false;
  api$1.release();
}

function touchstartHandler(e) {
  e.preventDefault();

  pressTimer = setTimeout(function () {
    press = true;
    var touch = e.touches[0];
    api$1.grab(touch.clientX, touch.clientY, true);
  }, pressDelay);
}

function touchmoveHandler(e) {
  if (press) {
    var touch = e.touches[0];
    api$1.grab(touch.clientX, touch.clientY);
  }
}

function touchendHandler() {
  clearTimeout(pressTimer);
  press = false;
  if (_grab) api$1.release();else api$1.close();
}

// init ------------------------------------------------------------------------
setStyle$1(overlay, {
  zIndex: 998,
  background: options.bgColor,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: 'opacity\n    ' + options.transitionDuration + '\n    ' + options.transitionTimingFunction
});

overlay.addEventListener('click', api$1.close);

document.addEventListener('DOMContentLoaded', api$1.listen(options.defaultZoomable));

{
  // Enable LiveReload
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
}

return api$1;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLmpzIiwiLi4vc3JjL3pvb21pbmcuanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB3ZWJraXQgcHJlZml4XG5jb25zdCBwcmVmaXggPSAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID8gJy13ZWJraXQtJyA6ICcnXG5jb25zdCBwcmVzc0RlbGF5ID0gMjAwXG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIGRlZmF1bHRab29tYWJsZTogJ2ltZ1tkYXRhLWFjdGlvbj1cInpvb21cIl0nLFxuICBlbmFibGVHcmFiOiB0cnVlLFxuICB0cmFuc2l0aW9uRHVyYXRpb246ICcuNHMnLFxuICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246ICdjdWJpYy1iZXppZXIoLjQsMCwwLDEpJyxcbiAgYmdDb2xvcjogJyNmZmYnLFxuICBiZ09wYWNpdHk6IDEsXG4gIHNjYWxlQmFzZTogMS4wLFxuICBzY2FsZUV4dHJhOiAwLjUsXG4gIHNjcm9sbFRocmVzaG9sZDogNDAsXG4gIG9uT3BlbjogbnVsbCxcbiAgb25DbG9zZTogbnVsbCxcbiAgb25HcmFiOiBudWxsLFxuICBvblJlbGVhc2U6IG51bGwsXG4gIG9uQmVmb3JlT3BlbjogbnVsbCxcbiAgb25CZWZvcmVDbG9zZTogbnVsbCxcbiAgb25CZWZvcmVHcmFiOiBudWxsLFxuICBvbkJlZm9yZVJlbGVhc2U6IG51bGxcbn1cblxuY29uc3Qgc25pZmZUcmFuc2l0aW9uID0gKGVsKSA9PiB7XG4gIGxldCByZXQgICAgID0ge31cbiAgY29uc3QgdHJhbnMgPSBbJ3dlYmtpdFRyYW5zaXRpb24nLCAndHJhbnNpdGlvbicsICdtb3pUcmFuc2l0aW9uJ11cbiAgY29uc3QgdGZvcm0gPSBbJ3dlYmtpdFRyYW5zZm9ybScsICd0cmFuc2Zvcm0nLCAnbW96VHJhbnNmb3JtJ11cbiAgY29uc3QgZW5kICAgPSB7XG4gICAgJ3RyYW5zaXRpb24nICAgICAgIDogJ3RyYW5zaXRpb25lbmQnLFxuICAgICdtb3pUcmFuc2l0aW9uJyAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnd2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgfVxuXG4gIHRyYW5zLnNvbWUocHJvcCA9PiB7XG4gICAgaWYgKGVsLnN0eWxlW3Byb3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldC50cmFuc2l0aW9uUHJvcCA9IHByb3BcbiAgICAgIHJldC50cmFuc0VuZEV2ZW50ID0gZW5kW3Byb3BdXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfSlcblxuICB0Zm9ybS5zb21lKHByb3AgPT4ge1xuICAgIGlmIChlbC5zdHlsZVtwcm9wXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXQudHJhbnNmb3JtUHJvcCA9IHByb3BcbiAgICAgIHJldC50cmFuc2Zvcm1Dc3NQcm9wID0gcHJvcC5yZXBsYWNlKC8oLiopVHJhbnNmb3JtLywgJy0kMS10cmFuc2Zvcm0nKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJldFxufVxuXG5jb25zdCBjaGVja1RyYW5zID0gKHRyYW5zaXRpb25Qcm9wLCB0cmFuc2Zvcm1Qcm9wKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiBzZXRTdHlsZShlbCwgc3R5bGVzLCByZW1lbWJlcikge1xuICAgIGxldCB2YWx1ZVxuICAgIGlmIChzdHlsZXMudHJhbnNpdGlvbikge1xuICAgICAgdmFsdWUgPSBzdHlsZXMudHJhbnNpdGlvblxuICAgICAgZGVsZXRlIHN0eWxlcy50cmFuc2l0aW9uXG4gICAgICBzdHlsZXNbdHJhbnNpdGlvblByb3BdID0gdmFsdWVcbiAgICB9XG4gICAgaWYgKHN0eWxlcy50cmFuc2Zvcm0pIHtcbiAgICAgIHZhbHVlID0gc3R5bGVzLnRyYW5zZm9ybVxuICAgICAgZGVsZXRlIHN0eWxlcy50cmFuc2Zvcm1cbiAgICAgIHN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHZhbHVlXG4gICAgfVxuXG4gICAgbGV0IHMgPSBlbC5zdHlsZVxuICAgIGxldCBvcmlnaW5hbCA9IHt9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc3R5bGVzKSB7XG4gICAgICBpZiAocmVtZW1iZXIpIG9yaWdpbmFsW2tleV0gPSBzW2tleV0gfHwgJydcbiAgICAgIHNba2V5XSA9IHN0eWxlc1trZXldXG4gICAgfVxuXG4gICAgcmV0dXJuIG9yaWdpbmFsXG4gIH1cbn1cblxuZXhwb3J0IHsgcHJlZml4LCBwcmVzc0RlbGF5LCBvcHRpb25zLCBzbmlmZlRyYW5zaXRpb24sIGNoZWNrVHJhbnMgfVxuIiwiaW1wb3J0IHsgcHJlZml4LCBwcmVzc0RlbGF5LCBvcHRpb25zLCBzbmlmZlRyYW5zaXRpb24sIGNoZWNrVHJhbnMgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIGVsZW1lbnRzXG5jb25zdCBib2R5ICAgID0gZG9jdW1lbnQuYm9keVxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5sZXQgdGFyZ2V0XG5sZXQgcGFyZW50XG5cbi8vIHN0YXRlXG5sZXQgc2hvd24gPSBmYWxzZVxubGV0IGxvY2sgID0gZmFsc2VcbmxldCBwcmVzcyA9IGZhbHNlXG5sZXQgZ3JhYiAgPSBmYWxzZVxubGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IG51bGxcblxuLy8gc3R5bGVcbmxldCBvcmlnaW5hbFN0eWxlc1xubGV0IG9wZW5TdHlsZXNcbmxldCB0cmFuc2xhdGVcbmxldCBzY2FsZVxuXG5sZXQgc3JjVGh1bWJuYWlsXG5sZXQgaW1nUmVjdFxubGV0IHByZXNzVGltZXJcblxuY29uc3QgdHJhbnMgPSBzbmlmZlRyYW5zaXRpb24ob3ZlcmxheSlcbmNvbnN0IHRyYW5zZm9ybUNzc1Byb3AgPSB0cmFucy50cmFuc2Zvcm1Dc3NQcm9wXG5jb25zdCB0cmFuc0VuZEV2ZW50ID0gdHJhbnMudHJhbnNFbmRFdmVudFxuY29uc3Qgc2V0U3R5bGVIZWxwZXIgPSBjaGVja1RyYW5zKHRyYW5zLnRyYW5zaXRpb25Qcm9wLCB0cmFucy50cmFuc2Zvcm1Qcm9wKVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBhcGkgPSB7XG5cbiAgbGlzdGVuOiAoZWwpID0+IHtcbiAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCkuZm9yRWFjaChlID0+IGFwaS5saXN0ZW4oZSkpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGVsLnN0eWxlLmN1cnNvciA9IGAke3ByZWZpeH16b29tLWluYFxuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmIChzaG93bikgYXBpLmNsb3NlKClcbiAgICAgIGVsc2UgYXBpLm9wZW4oZWwpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgY29uZmlnOiAob3B0cykgPT4ge1xuICAgIGlmICghb3B0cykgcmV0dXJuIG9wdGlvbnNcblxuICAgIGZvciAobGV0IGtleSBpbiBvcHRzKSB7XG4gICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV1cbiAgICB9XG5cbiAgICBzZXRTdHlsZShvdmVybGF5LCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmdDb2xvcixcbiAgICAgIHRyYW5zaXRpb246IGBvcGFjaXR5XG4gICAgICAgICR7b3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb259XG4gICAgICAgICR7b3B0aW9ucy50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb259YFxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuXG4gIG9wZW46IChlbCwgY2IgPSBvcHRpb25zLm9uT3BlbikgPT4ge1xuICAgIGlmIChzaG93biB8fCBsb2NrIHx8IGdyYWIpIHJldHVyblxuXG4gICAgdGFyZ2V0ID0gdHlwZW9mIGVsID09PSAnc3RyaW5nJ1xuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuXG4gICAgaWYgKHRhcmdldC50YWdOYW1lICE9PSAnSU1HJykgcmV0dXJuXG5cbiAgICAvLyBvbkJlZm9yZU9wZW4gZXZlbnRcbiAgICBpZiAob3B0aW9ucy5vbkJlZm9yZU9wZW4pIG9wdGlvbnMub25CZWZvcmVPcGVuKHRhcmdldClcblxuICAgIHNob3duID0gdHJ1ZVxuICAgIGxvY2sgPSB0cnVlXG4gICAgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGVcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgaW1nLm9ubG9hZCA9IGltZ09ubG9hZCgpXG4gICAgaW1nLnNyYyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NyYycpXG5cbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQob3ZlcmxheSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IG92ZXJsYXkuc3R5bGUub3BhY2l0eSA9IG9wdGlvbnMuYmdPcGFjaXR5LCAzMClcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbEhhbmRsZXIpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKVxuXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNFbmRFdmVudCwgZnVuY3Rpb24gb25FbmQgKCkge1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNFbmRFdmVudCwgb25FbmQpXG5cbiAgICAgIGlmIChvcHRpb25zLmVuYWJsZUdyYWIpIGFkZEdyYWJMaXN0ZW5lcnModGFyZ2V0KVxuXG4gICAgICBsb2NrID0gZmFsc2VcblxuICAgICAgaWYgKGNiKSBjYih0YXJnZXQpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgY2xvc2U6IChjYiA9IG9wdGlvbnMub25DbG9zZSkgPT4ge1xuICAgIGlmICghc2hvd24gfHwgbG9jayB8fCBncmFiKSByZXR1cm5cbiAgICBsb2NrID0gdHJ1ZVxuXG4gICAgLy8gb25CZWZvcmVDbG9zZSBldmVudFxuICAgIGlmIChvcHRpb25zLm9uQmVmb3JlQ2xvc2UpIG9wdGlvbnMub25CZWZvcmVDbG9zZSh0YXJnZXQpXG4gICAgb3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gMFxuICAgIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAnJ1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsSGFuZGxlcilcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpXG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBmdW5jdGlvbiBvbkVuZCAoKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBvbkVuZClcblxuICAgICAgaWYgKG9wdGlvbnMuZW5hYmxlR3JhYikgcmVtb3ZlR3JhYkxpc3RlbmVycyh0YXJnZXQpXG5cbiAgICAgIHNob3duID0gZmFsc2VcbiAgICAgIGxvY2sgPSBmYWxzZVxuICAgICAgZ3JhYiA9IGZhbHNlXG5cbiAgICAgIHNldFN0eWxlKHRhcmdldCwgb3JpZ2luYWxTdHlsZXMpXG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQob3ZlcmxheSlcblxuICAgICAgLy8gZG93bmdyYWRlIHNvdXJjZSBpZiBwb3NzaWJsZVxuICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwnKSkgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjVGh1bWJuYWlsKVxuXG4gICAgICBpZiAoY2IpIGNiKHRhcmdldClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICBncmFiOiBmdW5jdGlvbih4LCB5LCBzdGFydCwgY2IgPSBvcHRpb25zLm9uR3JhYikge1xuICAgIGlmICghc2hvd24gfHwgbG9jaykgcmV0dXJuXG4gICAgZ3JhYiA9IHRydWVcblxuICAgIC8vIG9uQmVmb3JlR3JhYiBldmVudFxuICAgIGlmIChvcHRpb25zLm9uQmVmb3JlR3JhYikgb3B0aW9ucy5vbkJlZm9yZUdyYWIodGFyZ2V0KVxuXG4gICAgY29uc3QgW2R4LCBkeV0gPSBbeCAtIHdpbmRvdy5pbm5lcldpZHRoIC8gMiwgeSAtIHdpbmRvdy5pbm5lckhlaWdodCAvIDJdXG4gICAgY29uc3QgdHJhbnNmb3JtID0gdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybVxuICAgICAgLnJlcGxhY2UoL3RyYW5zbGF0ZTNkXFwoLio/XFwpL2ksIGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZS54ICsgZHh9cHgsICR7dHJhbnNsYXRlLnkgKyBkeX1weCwgMClgKVxuICAgICAgLnJlcGxhY2UoL3NjYWxlXFwoWzAtOXxcXC5dKlxcKS9pLCBgc2NhbGUoJHtzY2FsZSArIG9wdGlvbnMuc2NhbGVFeHRyYX0pYClcblxuICAgIHNldFN0eWxlKHRhcmdldCwge1xuICAgICAgY3Vyc29yOiBgJHtwcmVmaXh9IGdyYWJiaW5nYCxcbiAgICAgIHRyYW5zaXRpb246IGAke3RyYW5zZm9ybUNzc1Byb3B9ICR7c3RhcnRcbiAgICAgICAgPyBvcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbiArICcgJyArIG9wdGlvbnMudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXG4gICAgICAgIDogJ2Vhc2UnfWAsXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxuICAgIH0pXG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBmdW5jdGlvbiBvbkVuZCAoKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBvbkVuZClcbiAgICAgIGlmIChjYikgY2IodGFyZ2V0KVxuICAgIH0pXG4gIH0sXG5cbiAgcmVsZWFzZTogKGNiID0gb3B0aW9ucy5vblJlbGVhc2UpID0+IHtcbiAgICBpZiAoIXNob3duIHx8IGxvY2sgfHwgIWdyYWIpIHJldHVyblxuXG4gICAgLy8gb25CZWZvcmVSZWxlYXNlIGV2ZW50XG4gICAgaWYgKG9wdGlvbnMub25CZWZvcmVSZWxlYXNlKSBvcHRpb25zLm9uQmVmb3JlUmVsZWFzZSh0YXJnZXQpXG5cbiAgICBzZXRTdHlsZSh0YXJnZXQsIG9wZW5TdHlsZXMpXG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBmdW5jdGlvbiBvbkVuZCAoKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc0VuZEV2ZW50LCBvbkVuZClcbiAgICAgIGdyYWIgPSBmYWxzZVxuICAgICAgaWYgKGNiKSBjYih0YXJnZXQpXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWwsIHN0eWxlcywgcmVtZW1iZXIpIHtcbiAgcmV0dXJuIHNldFN0eWxlSGVscGVyKGVsLCBzdHlsZXMsIHJlbWVtYmVyKVxufVxuXG5mdW5jdGlvbiBpbWdPbmxvYWQgKCkge1xuICBpbWdSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgLy8gdXBncmFkZSBzb3VyY2UgaWYgcG9zc2libGVcbiAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwnKSkge1xuICAgIHNyY1RodW1ibmFpbCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NyYycpXG5cbiAgICBzZXRTdHlsZSh0YXJnZXQsIHtcbiAgICAgIHdpZHRoOiBgJHtpbWdSZWN0LndpZHRofXB4YCxcbiAgICAgIGhlaWdodDogYCR7aW1nUmVjdC5oZWlnaHR9cHhgXG4gICAgfSlcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwnKSlcbiAgfVxuXG4gIC8vIGZvcmNlIGxheW91dCB1cGRhdGVcbiAgdGFyZ2V0Lm9mZnNldFdpZHRoXG5cbiAgb3BlblN0eWxlcyA9IHtcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB6SW5kZXg6IDk5OSxcbiAgICBjdXJzb3I6IGAke3ByZWZpeH0ke29wdGlvbnMuZW5hYmxlR3JhYiA/ICdncmFiJyA6ICd6b29tLW91dCd9YCxcbiAgICB0cmFuc2l0aW9uOiBgJHt0cmFuc2Zvcm1Dc3NQcm9wfVxuICAgICAgJHtvcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbn1cbiAgICAgICR7b3B0aW9ucy50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb259YCxcbiAgICB0cmFuc2Zvcm06IGNhbGN1bGF0ZVRyYW5zZm9ybSgpXG4gIH1cblxuICAvLyB0cmlnZ2VyIHRyYW5zaXRpb25cbiAgb3JpZ2luYWxTdHlsZXMgPSBzZXRTdHlsZSh0YXJnZXQsIG9wZW5TdHlsZXMsIHRydWUpXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVRyYW5zZm9ybSAoKSB7XG4gIGNvbnN0IFtpbWdIYWxmV2lkdGgsIGltZ0hhbGZIZWlnaHRdID0gW2ltZ1JlY3Qud2lkdGggLyAyLCBpbWdSZWN0LmhlaWdodCAvIDJdXG5cbiAgY29uc3QgaW1nQ2VudGVyID0ge1xuICAgIHg6IGltZ1JlY3QubGVmdCArIGltZ0hhbGZXaWR0aCxcbiAgICB5OiBpbWdSZWN0LnRvcCArIGltZ0hhbGZIZWlnaHRcbiAgfVxuXG4gIGNvbnN0IHdpbmRvd0NlbnRlciA9IHtcbiAgICB4OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgeTogd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICB9XG5cbiAgLy8gVGhlIGRpc3RhbmNlIGJldHdlZW4gaW1hZ2UgZWRnZSBhbmQgd2luZG93IGVkZ2VcbiAgY29uc3QgZGlzdEZyb21JbWFnZUVkZ2VUb1dpbmRvd0VkZ2UgPSB7XG4gICAgeDogd2luZG93Q2VudGVyLnggLSBpbWdIYWxmV2lkdGgsXG4gICAgeTogd2luZG93Q2VudGVyLnkgLSBpbWdIYWxmSGVpZ2h0XG4gIH1cblxuICBjb25zdCBzY2FsZUhvcml6b250YWxseSA9IGRpc3RGcm9tSW1hZ2VFZGdlVG9XaW5kb3dFZGdlLnggLyBpbWdIYWxmV2lkdGhcbiAgY29uc3Qgc2NhbGVWZXJ0aWNhbGx5ID0gZGlzdEZyb21JbWFnZUVkZ2VUb1dpbmRvd0VkZ2UueSAvIGltZ0hhbGZIZWlnaHRcblxuICAvLyBUaGUgdmVjdG9yIHRvIHRyYW5zbGF0ZSBpbWFnZSB0byB0aGUgd2luZG93IGNlbnRlclxuICB0cmFuc2xhdGUgPSB7XG4gICAgeDogd2luZG93Q2VudGVyLnggLSBpbWdDZW50ZXIueCxcbiAgICB5OiB3aW5kb3dDZW50ZXIueSAtIGltZ0NlbnRlci55XG4gIH1cblxuICAvLyBUaGUgYWRkaXRpb25hbCBzY2FsZSBpcyBiYXNlZCBvbiB0aGUgc21hbGxlciB2YWx1ZSBvZlxuICAvLyBzY2FsaW5nIGhvcml6b250YWxseSBhbmQgc2NhbGluZyB2ZXJ0aWNhbGx5XG4gIHNjYWxlID0gb3B0aW9ucy5zY2FsZUJhc2UgKyBNYXRoLm1pbihzY2FsZUhvcml6b250YWxseSwgc2NhbGVWZXJ0aWNhbGx5KVxuXG4gIHJldHVybiBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUueH1weCwgJHt0cmFuc2xhdGUueX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYFxufVxuXG5mdW5jdGlvbiBhZGRHcmFiTGlzdGVuZXJzIChlbCkge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd25IYW5kbGVyKVxuICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVIYW5kbGVyKVxuICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cEhhbmRsZXIpXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0SGFuZGxlcilcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlcilcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUdyYWJMaXN0ZW5lcnMgKGVsKSB7XG4gIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlZG93bkhhbmRsZXIpXG4gIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUhhbmRsZXIpXG4gIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwSGFuZGxlcilcbiAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnRIYW5kbGVyKVxuICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyKVxuICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlcilcbn1cblxuLy8gbGlzdGVuZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHNjcm9sbEhhbmRsZXIgKCkge1xuICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHxcbiAgICAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGJvZHkucGFyZW50Tm9kZSB8fCBib2R5KS5zY3JvbGxUb3BcblxuICBpZiAobGFzdFNjcm9sbFBvc2l0aW9uID09PSBudWxsKSBsYXN0U2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxUb3BcblxuICBjb25zdCBkZWx0YVkgPSBsYXN0U2Nyb2xsUG9zaXRpb24gLSBzY3JvbGxUb3BcblxuICBpZiAoTWF0aC5hYnMoZGVsdGFZKSA+PSBvcHRpb25zLnNjcm9sbFRocmVzaG9sZCkge1xuICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IG51bGxcbiAgICBhcGkuY2xvc2UoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGtleWRvd25IYW5kbGVyIChlKSB7XG4gIGNvbnN0IGNvZGUgPSBlLmtleSB8fCBlLmNvZGVcbiAgaWYgKGNvZGUgPT09ICdFc2NhcGUnIHx8IGUua2V5Q29kZSA9PT0gMjcpIGFwaS5jbG9zZSgpXG59XG5cbmZ1bmN0aW9uIG1vdXNlZG93bkhhbmRsZXIgKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgcHJlc3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgcHJlc3MgPSB0cnVlXG4gICAgYXBpLmdyYWIoZS5jbGllbnRYLCBlLmNsaWVudFksIHRydWUpXG4gIH0sIHByZXNzRGVsYXkpXG59XG5cbmZ1bmN0aW9uIG1vdXNlbW92ZUhhbmRsZXIgKGUpIHtcbiAgaWYgKHByZXNzKSBhcGkuZ3JhYihlLmNsaWVudFgsIGUuY2xpZW50WSlcbn1cblxuZnVuY3Rpb24gbW91c2V1cEhhbmRsZXIgKCkge1xuICBjbGVhclRpbWVvdXQocHJlc3NUaW1lcilcbiAgcHJlc3MgPSBmYWxzZVxuICBhcGkucmVsZWFzZSgpXG59XG5cbmZ1bmN0aW9uIHRvdWNoc3RhcnRIYW5kbGVyIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuXG4gIHByZXNzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHByZXNzID0gdHJ1ZVxuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdXG4gICAgYXBpLmdyYWIodG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgdHJ1ZSlcbiAgfSwgcHJlc3NEZWxheSlcbn1cblxuZnVuY3Rpb24gdG91Y2htb3ZlSGFuZGxlciAoZSkge1xuICBpZiAocHJlc3MpIHtcbiAgICBjb25zdCB0b3VjaCA9IGUudG91Y2hlc1swXVxuICAgIGFwaS5ncmFiKHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdG91Y2hlbmRIYW5kbGVyICgpIHtcbiAgY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpXG4gIHByZXNzID0gZmFsc2VcbiAgaWYgKGdyYWIpIGFwaS5yZWxlYXNlKClcbiAgZWxzZSBhcGkuY2xvc2UoKVxufVxuXG4vLyBpbml0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuc2V0U3R5bGUob3ZlcmxheSwge1xuICB6SW5kZXg6IDk5OCxcbiAgYmFja2dyb3VuZDogb3B0aW9ucy5iZ0NvbG9yLFxuICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBvcGFjaXR5OiAwLFxuICB0cmFuc2l0aW9uOiBgb3BhY2l0eVxuICAgICR7b3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb259XG4gICAgJHtvcHRpb25zLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbn1gXG59KVxuXG5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXBpLmNsb3NlKVxuXG5leHBvcnQgZGVmYXVsdCBhcGlcbiIsImltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgYXBpIGZyb20gJy4vem9vbWluZydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFwaS5saXN0ZW4ob3B0aW9ucy5kZWZhdWx0Wm9vbWFibGUpKVxuXG5pZiAoRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgLy8gRW5hYmxlIExpdmVSZWxvYWRcbiAgZG9jdW1lbnQud3JpdGUoXG4gICAgJzxzY3JpcHQgc3JjPVwiaHR0cDovLycgKyAobG9jYXRpb24uaG9zdCB8fCAnbG9jYWxob3N0Jykuc3BsaXQoJzonKVswXSArXG4gICAgJzozNTcyOS9saXZlcmVsb2FkLmpzP3NuaXB2ZXI9MVwiPjwvJyArICdzY3JpcHQ+J1xuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwaVxuIl0sIm5hbWVzIjpbInByZWZpeCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJwcmVzc0RlbGF5Iiwib3B0aW9ucyIsInNuaWZmVHJhbnNpdGlvbiIsImVsIiwicmV0IiwidHJhbnMiLCJ0Zm9ybSIsImVuZCIsInNvbWUiLCJwcm9wIiwidW5kZWZpbmVkIiwidHJhbnNpdGlvblByb3AiLCJ0cmFuc0VuZEV2ZW50IiwidHJhbnNmb3JtUHJvcCIsInRyYW5zZm9ybUNzc1Byb3AiLCJyZXBsYWNlIiwiY2hlY2tUcmFucyIsInNldFN0eWxlIiwic3R5bGVzIiwicmVtZW1iZXIiLCJ2YWx1ZSIsInRyYW5zaXRpb24iLCJ0cmFuc2Zvcm0iLCJzIiwib3JpZ2luYWwiLCJrZXkiLCJib2R5Iiwib3ZlcmxheSIsImNyZWF0ZUVsZW1lbnQiLCJ0YXJnZXQiLCJwYXJlbnQiLCJzaG93biIsImxvY2siLCJwcmVzcyIsImdyYWIiLCJsYXN0U2Nyb2xsUG9zaXRpb24iLCJvcmlnaW5hbFN0eWxlcyIsIm9wZW5TdHlsZXMiLCJ0cmFuc2xhdGUiLCJzY2FsZSIsInNyY1RodW1ibmFpbCIsImltZ1JlY3QiLCJwcmVzc1RpbWVyIiwic2V0U3R5bGVIZWxwZXIiLCJhcGkiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImxpc3RlbiIsImUiLCJjdXJzb3IiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJjbG9zZSIsIm9wZW4iLCJvcHRzIiwiYmdDb2xvciIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiIsImNiIiwib25PcGVuIiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJvbkJlZm9yZU9wZW4iLCJwYXJlbnROb2RlIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJpbWdPbmxvYWQiLCJzcmMiLCJnZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm9wYWNpdHkiLCJiZ09wYWNpdHkiLCJzY3JvbGxIYW5kbGVyIiwia2V5ZG93bkhhbmRsZXIiLCJvbkVuZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbmFibGVHcmFiIiwiYWRkR3JhYkxpc3RlbmVycyIsIm9uQ2xvc2UiLCJvbkJlZm9yZUNsb3NlIiwicmVtb3ZlR3JhYkxpc3RlbmVycyIsInJlbW92ZUNoaWxkIiwiaGFzQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwieCIsInkiLCJzdGFydCIsIm9uR3JhYiIsIm9uQmVmb3JlR3JhYiIsImR4Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsImR5IiwiaW5uZXJIZWlnaHQiLCJzY2FsZUV4dHJhIiwib25SZWxlYXNlIiwib25CZWZvcmVSZWxlYXNlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRXaWR0aCIsImNhbGN1bGF0ZVRyYW5zZm9ybSIsImltZ0hhbGZXaWR0aCIsImltZ0hhbGZIZWlnaHQiLCJpbWdDZW50ZXIiLCJsZWZ0IiwidG9wIiwid2luZG93Q2VudGVyIiwiZGlzdEZyb21JbWFnZUVkZ2VUb1dpbmRvd0VkZ2UiLCJzY2FsZUhvcml6b250YWxseSIsInNjYWxlVmVydGljYWxseSIsInNjYWxlQmFzZSIsIk1hdGgiLCJtaW4iLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNldXBIYW5kbGVyIiwidG91Y2hzdGFydEhhbmRsZXIiLCJ0b3VjaG1vdmVIYW5kbGVyIiwidG91Y2hlbmRIYW5kbGVyIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJkZWx0YVkiLCJhYnMiLCJzY3JvbGxUaHJlc2hvbGQiLCJjb2RlIiwia2V5Q29kZSIsInNldFRpbWVvdXQiLCJjbGllbnRYIiwiY2xpZW50WSIsInJlbGVhc2UiLCJ0b3VjaCIsInRvdWNoZXMiLCJkZWZhdWx0Wm9vbWFibGUiLCJFTlYiLCJ3cml0ZSIs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
