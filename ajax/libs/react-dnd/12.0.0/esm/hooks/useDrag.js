function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useMemo } from 'react';
import { invariant } from '@react-dnd/invariant';
import { registerSource, DragSourceMonitorImpl, SourceConnector } from '../internals';
import { useMonitorOutput } from './useMonitorOutput';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useDragDropManager } from './useDragDropManager';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification *
 */

export function useDrag(spec) {
  var specRef = useRef(spec);
  specRef.current = spec; // TODO: wire options into createSourceConnector

  invariant(spec.item != null, 'item must be defined');
  invariant(spec.item.type != null, 'item type must be defined');

  var _useDragSourceMonitor = useDragSourceMonitor(),
      _useDragSourceMonitor2 = _slicedToArray(_useDragSourceMonitor, 2),
      monitor = _useDragSourceMonitor2[0],
      connector = _useDragSourceMonitor2[1];

  useDragHandler(specRef, monitor, connector);
  var result = useMonitorOutput(monitor, specRef.current.collect || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
  var connectDragSource = useMemo(function () {
    return connector.hooks.dragSource();
  }, [connector]);
  var connectDragPreview = useMemo(function () {
    return connector.hooks.dragPreview();
  }, [connector]);
  useIsomorphicLayoutEffect(function () {
    connector.dragSourceOptions = specRef.current.options || null;
    connector.reconnect();
  }, [connector]);
  useIsomorphicLayoutEffect(function () {
    connector.dragPreviewOptions = specRef.current.previewOptions || null;
    connector.reconnect();
  }, [connector]);
  return [result, connectDragSource, connectDragPreview];
}

function useDragSourceMonitor() {
  var manager = useDragDropManager();
  var monitor = useMemo(function () {
    return new DragSourceMonitorImpl(manager);
  }, [manager]);
  var connector = useMemo(function () {
    return new SourceConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}

function useDragHandler(spec, monitor, connector) {
  var manager = useDragDropManager();
  var handler = useMemo(function () {
    return {
      beginDrag: function beginDrag() {
        var _spec$current = spec.current,
            begin = _spec$current.begin,
            item = _spec$current.item;

        if (begin) {
          var beginResult = begin(monitor);
          invariant(beginResult == null || _typeof(beginResult) === 'object', 'dragSpec.begin() must either return an object, undefined, or null');
          return beginResult || item || {};
        }

        return item || {};
      },
      canDrag: function canDrag() {
        if (typeof spec.current.canDrag === 'boolean') {
          return spec.current.canDrag;
        } else if (typeof spec.current.canDrag === 'function') {
          return spec.current.canDrag(monitor);
        } else {
          return true;
        }
      },
      isDragging: function isDragging(globalMonitor, target) {
        var isDragging = spec.current.isDragging;
        return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
      },
      endDrag: function endDrag() {
        var end = spec.current.end;

        if (end) {
          end(monitor.getItem(), monitor);
        }

        connector.reconnect();
      }
    };
  }, []);
  useIsomorphicLayoutEffect(function registerHandler() {
    var _registerSource = registerSource(spec.current.item.type, handler, manager),
        _registerSource2 = _slicedToArray(_registerSource, 2),
        handlerId = _registerSource2[0],
        unregister = _registerSource2[1];

    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, []);
}