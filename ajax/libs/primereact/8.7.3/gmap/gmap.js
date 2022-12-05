this.primereact = this.primereact || {};
this.primereact.gmap = (function (exports, React, hooks, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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
    return _extends.apply(this, arguments);
  }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var GMap = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var map = React__namespace.useRef(null);
    var prevOverlays = React__namespace.useRef(null);
    var initMap = function initMap() {
      map.current = new google.maps.Map(elementRef.current, props.options);
      if (props.onMapReady) {
        props.onMapReady({
          map: map.current
        });
      }
      initOverlays(props.overlays);
      bindMapEvent('click', props.onMapClick);
      bindMapEvent('dragend', props.onMapDragEnd);
      bindMapEvent('zoom_changed', props.onZoomChanged);
    };
    var initOverlays = function initOverlays(overlays) {
      if (overlays) {
        var _iterator = _createForOfIteratorHelper(overlays),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var overlay = _step.value;
            overlay.setMap(map.current);
            bindOverlayEvents(overlay);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        prevOverlays.current = overlays;
      }
    };
    var bindOverlayEvents = function bindOverlayEvents(overlay) {
      overlay.addListener('click', function (event) {
        if (props.onOverlayClick) {
          props.onOverlayClick({
            originalEvent: event,
            overlay: overlay,
            map: map.current
          });
        }
      });
      if (overlay.getDraggable()) {
        bindDragEvents(overlay);
      }
    };
    var bindDragEvents = function bindDragEvents(overlay) {
      bindDragEvent(overlay, 'dragstart', props.onOverlayDragStart);
      bindDragEvent(overlay, 'drag', props.onOverlayDrag);
      bindDragEvent(overlay, 'dragend', props.onOverlayDragEnd);
    };
    var bindMapEvent = function bindMapEvent(eventName, callback) {
      map.current.addListener(eventName, function (event) {
        callback && callback(event);
      });
    };
    var bindDragEvent = function bindDragEvent(overlay, eventName, callback) {
      overlay.addListener(eventName, function (event) {
        if (callback) {
          callback({
            originalEvent: event,
            overlay: overlay,
            map: map.current
          });
        }
      });
    };
    var removeOverlays = function removeOverlays(overlays) {
      if (overlays) {
        var _iterator2 = _createForOfIteratorHelper(overlays),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var overlay = _step2.value;
            overlay.setMap(null);
            unbindOverlayEvents(overlay);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    };
    var unbindOverlayEvents = function unbindOverlayEvents(overlay) {
      google.maps.event.clearListeners(overlay, 'click');
      if (overlay.getDraggable()) {
        google.maps.event.clearListeners(overlay, 'dragstart');
        google.maps.event.clearListeners(overlay, 'drag');
        google.maps.event.clearListeners(overlay, 'dragend');
      }
    };
    var getMap = function getMap() {
      return map.current;
    };
    hooks.useMountEffect(function () {
      initMap();
    });
    hooks.useUpdateEffect(function () {
      initOverlays(props.overlays);
      return function () {
        removeOverlays(prevOverlays.current);
      };
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getMap: getMap,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, GMap.defaultProps);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      style: props.style,
      className: props.className
    }, otherProps));
  }));
  GMap.displayName = 'GMap';
  GMap.defaultProps = {
    __TYPE: 'GMap',
    options: null,
    overlays: null,
    style: null,
    className: null,
    onMapReady: null,
    onMapClick: null,
    onMapDragEnd: null,
    onZoomChanged: null,
    onOverlayDragStart: null,
    onOverlayDrag: null,
    onOverlayDragEnd: null,
    onOverlayClick: null
  };

  exports.GMap = GMap;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils);
