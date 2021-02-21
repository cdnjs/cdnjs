function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useMemo } from 'react';
import { invariant } from '@react-dnd/invariant';
import { useMonitorOutput } from './useMonitorOutput';
import { registerTarget, DropTargetMonitorImpl, TargetConnector } from '../internals';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useDragDropManager } from './useDragDropManager';
/**
 * useDropTarget Hook
 * @param spec The drop target specification
 */

export function useDrop(spec) {
  var specRef = useRef(spec);
  specRef.current = spec;
  invariant(spec.accept != null, 'accept must be defined');

  var _useDropTargetMonitor = useDropTargetMonitor(),
      _useDropTargetMonitor2 = _slicedToArray(_useDropTargetMonitor, 2),
      monitor = _useDropTargetMonitor2[0],
      connector = _useDropTargetMonitor2[1];

  useDropHandler(specRef, monitor, connector);
  var result = useMonitorOutput(monitor, specRef.current.collect || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
  var connectDropTarget = useMemo(function () {
    return connector.hooks.dropTarget();
  }, [connector]);
  useIsomorphicLayoutEffect(function () {
    connector.dropTargetOptions = spec.options || null;
    connector.reconnect();
  }, [spec.options]);
  return [result, connectDropTarget];
}

function useDropTargetMonitor() {
  var manager = useDragDropManager();
  var monitor = useMemo(function () {
    return new DropTargetMonitorImpl(manager);
  }, [manager]);
  var connector = useMemo(function () {
    return new TargetConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}

function useDropHandler(spec, monitor, connector) {
  var manager = useDragDropManager();
  var handler = useMemo(function () {
    return {
      canDrop: function canDrop() {
        var canDrop = spec.current.canDrop;
        return canDrop ? canDrop(monitor.getItem(), monitor) : true;
      },
      hover: function hover() {
        var hover = spec.current.hover;

        if (hover) {
          hover(monitor.getItem(), monitor);
        }
      },
      drop: function drop() {
        var drop = spec.current.drop;

        if (drop) {
          return drop(monitor.getItem(), monitor);
        }
      }
    };
  }, [monitor]);
  useIsomorphicLayoutEffect(function registerHandler() {
    var _registerTarget = registerTarget(spec.current.accept, handler, manager),
        _registerTarget2 = _slicedToArray(_registerTarget, 2),
        handlerId = _registerTarget2[0],
        unregister = _registerTarget2[1];

    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [monitor, connector, spec.current.accept]);
}