(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Bricks = factory());
}(this, (function () { 'use strict';

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

var knot = function knot() {
  var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var events = Object.create(null);

  function on(name, handler) {
    events[name] = events[name] || [];
    events[name].push(handler);
    return this;
  }

  function once(name, handler) {
    handler._once = true;
    on(name, handler);
    return this;
  }

  function off(name) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    handler ? events[name].splice(events[name].indexOf(handler), 1) : delete events[name];

    return this;
  }

  function emit(name) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // cache the events, to avoid consequences of mutation
    var cache = events[name] && events[name].slice();

    // only fire handlers if they exist
    cache && cache.forEach(function (handler) {
      // remove handlers added with 'once'
      handler._once && off(name, handler);

      // set 'this' context, pass args to handlers
      handler.apply(_this, args);
    });

    return this;
  }

  return _extends({}, extended, {

    on: on,
    once: once,
    off: off,
    emit: emit
  });
};

var bricks = function bricks() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // privates

  var persist = void 0; // packing new elements, or all elements?
  var ticking = void 0; // for debounced resize

  var sizeIndex = void 0;
  var sizeDetail = void 0;

  var columnTarget = void 0;
  var columnHeights = void 0;

  var nodeTop = void 0;
  var nodeLeft = void 0;
  var nodeWidth = void 0;
  var nodeHeight = void 0;

  var nodes = void 0;
  var nodesWidths = void 0;
  var nodesHeights = void 0;

  // resolve options

  var packed = options.packed.indexOf('data-') === 0 ? options.packed : 'data-' + options.packed;
  var sizes = options.sizes.slice().reverse();
  var position = options.position !== false;

  var container = options.container.nodeType ? options.container : document.querySelector(options.container);

  var selectors = {
    all: function all() {
      return toArray(container.children);
    },
    new: function _new() {
      return toArray(container.children).filter(function (node) {
        return !node.hasAttribute('' + packed);
      });
    }
  };

  // series

  var setup = [setSizeIndex, setSizeDetail, setColumns];

  var run = [setNodes, setNodesDimensions, setNodesStyles, setContainerStyles];

  // instance

  var instance = knot({
    pack: pack,
    update: update,
    resize: resize
  });

  return instance;

  // general helpers

  function runSeries(functions) {
    functions.forEach(function (func) {
      return func();
    });
  }

  // array helpers

  function toArray(input) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return Array.prototype.slice.call(input);
  }

  function fillArray(length) {
    return Array.apply(null, Array(length)).map(function () {
      return 0;
    });
  }

  // size helpers

  function getSizeIndex() {
    // find index of widest matching media query
    return sizes.map(function (size) {
      return size.mq && window.matchMedia('(min-width: ' + size.mq + ')').matches;
    }).indexOf(true);
  }

  function setSizeIndex() {
    sizeIndex = getSizeIndex();
  }

  function setSizeDetail() {
    // if no media queries matched, use the base case
    sizeDetail = sizeIndex === -1 ? sizes[sizes.length - 1] : sizes[sizeIndex];
  }

  // column helpers

  function setColumns() {
    columnHeights = fillArray(sizeDetail.columns);
  }

  // node helpers

  function setNodes() {
    nodes = selectors[persist ? 'new' : 'all']();
  }

  function setNodesDimensions() {
    // exit if empty container
    if (nodes.length === 0) {
      return;
    }

    nodesWidths = nodes.map(function (element) {
      return element.clientWidth;
    });
    nodesHeights = nodes.map(function (element) {
      return element.clientHeight;
    });
  }

  function setNodesStyles() {
    nodes.forEach(function (element, index) {
      columnTarget = columnHeights.indexOf(Math.min.apply(Math, columnHeights));

      element.style.position = 'absolute';

      nodeTop = columnHeights[columnTarget] + 'px';
      nodeLeft = columnTarget * nodesWidths[index] + columnTarget * sizeDetail.gutter + 'px';

      // support positioned elements (default) or transformed elements
      if (position) {
        element.style.top = nodeTop;
        element.style.left = nodeLeft;
      } else {
        element.style.transform = 'translate3d(' + nodeLeft + ', ' + nodeTop + ', 0)';
      }

      element.setAttribute(packed, '');

      // ignore nodes with no width and/or height
      nodeWidth = nodesWidths[index];
      nodeHeight = nodesHeights[index];

      if (nodeWidth && nodeHeight) {
        columnHeights[columnTarget] += nodeHeight + sizeDetail.gutter;
      }
    });
  }

  // container helpers

  function setContainerStyles() {
    container.style.position = 'relative';
    container.style.width = sizeDetail.columns * nodeWidth + (sizeDetail.columns - 1) * sizeDetail.gutter + 'px';
    container.style.height = Math.max.apply(Math, columnHeights) - sizeDetail.gutter + 'px';
  }

  // resize helpers

  function resizeFrame() {
    if (!ticking) {
      window.requestAnimationFrame(resizeHandler);
      ticking = true;
    }
  }

  function resizeHandler() {
    if (sizeIndex !== getSizeIndex()) {
      pack();
      instance.emit('resize', sizeDetail);
    }

    ticking = false;
  }

  // API

  function pack() {
    persist = false;
    runSeries(setup.concat(run));

    return instance.emit('pack');
  }

  function update() {
    persist = true;
    runSeries(run);

    return instance.emit('update');
  }

  function resize() {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var action = flag ? 'addEventListener' : 'removeEventListener';

    window[action]('resize', resizeFrame);

    return instance;
  }
};

return bricks;

})));
