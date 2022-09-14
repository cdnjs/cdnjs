import { J as _arrayLikeToArray, K as _unsupportedIterableToArray, u as useStoreApi, b as useStore, L as getD3Transition, _ as _slicedToArray, N as fitView, G as getTransformForBounds, p as pointToRendererPoint, a as _defineProperty } from './index-a12c80bd.js';
import { useMemo, useCallback } from 'react';
import { zoomIdentity } from 'd3-zoom';
import shallow from 'zustand/shallow';

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var initialViewportHelper = {
  zoomIn: function zoomIn() {},
  zoomOut: function zoomOut() {},
  zoomTo: function zoomTo(_) {},
  getZoom: function getZoom() {
    return 1;
  },
  setViewport: function setViewport(_) {},
  getViewport: function getViewport() {
    return {
      x: 0,
      y: 0,
      zoom: 1
    };
  },
  fitView: function fitView() {
  },
  setCenter: function setCenter(_, __) {},
  fitBounds: function fitBounds(_) {},
  project: function project(position) {
    return position;
  },
  viewportInitialized: false
};

var selector = function selector(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection
  };
};

var useViewportHelper = function useViewportHelper() {
  var store = useStoreApi();

  var _useStore = useStore(selector, shallow),
      d3Zoom = _useStore.d3Zoom,
      d3Selection = _useStore.d3Selection;

  var viewportHelperFunctions = useMemo(function () {
    if (d3Selection && d3Zoom) {
      return {
        zoomIn: function zoomIn(options) {
          return d3Zoom.scaleBy(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1.2);
        },
        zoomOut: function zoomOut(options) {
          return d3Zoom.scaleBy(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1 / 1.2);
        },
        zoomTo: function zoomTo(zoomLevel, options) {
          return d3Zoom.scaleTo(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), zoomLevel);
        },
        getZoom: function getZoom() {
          return store.getState().transform[2];
        },
        setViewport: function setViewport(transform, options) {
          var _transform$x, _transform$y, _transform$zoom;

          var _store$getState$trans = _slicedToArray(store.getState().transform, 3),
              x = _store$getState$trans[0],
              y = _store$getState$trans[1],
              zoom = _store$getState$trans[2];

          var nextTransform = zoomIdentity.translate((_transform$x = transform.x) !== null && _transform$x !== void 0 ? _transform$x : x, (_transform$y = transform.y) !== null && _transform$y !== void 0 ? _transform$y : y).scale((_transform$zoom = transform.zoom) !== null && _transform$zoom !== void 0 ? _transform$zoom : zoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), nextTransform);
        },
        getViewport: function getViewport() {
          var _store$getState$trans2 = _slicedToArray(store.getState().transform, 3),
              x = _store$getState$trans2[0],
              y = _store$getState$trans2[1],
              zoom = _store$getState$trans2[2];

          return {
            x: x,
            y: y,
            zoom: zoom
          };
        },
        fitView: function fitView$1(options) {
          return fitView(store.getState, options);
        },
        setCenter: function setCenter(x, y, options) {
          var _store$getState = store.getState(),
              width = _store$getState.width,
              height = _store$getState.height,
              maxZoom = _store$getState.maxZoom;

          var nextZoom = typeof (options === null || options === void 0 ? void 0 : options.zoom) !== 'undefined' ? options.zoom : maxZoom;
          var centerX = width / 2 - x * nextZoom;
          var centerY = height / 2 - y * nextZoom;
          var transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        fitBounds: function fitBounds(bounds, options) {
          var _options$padding;

          var _store$getState2 = store.getState(),
              width = _store$getState2.width,
              height = _store$getState2.height,
              minZoom = _store$getState2.minZoom,
              maxZoom = _store$getState2.maxZoom;

          var _getTransformForBound = getTransformForBounds(bounds, width, height, minZoom, maxZoom, (_options$padding = options === null || options === void 0 ? void 0 : options.padding) !== null && _options$padding !== void 0 ? _options$padding : 0.1),
              _getTransformForBound2 = _slicedToArray(_getTransformForBound, 3),
              x = _getTransformForBound2[0],
              y = _getTransformForBound2[1],
              zoom = _getTransformForBound2[2];

          var transform = zoomIdentity.translate(x, y).scale(zoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        project: function project(position) {
          var _store$getState3 = store.getState(),
              transform = _store$getState3.transform,
              snapToGrid = _store$getState3.snapToGrid,
              snapGrid = _store$getState3.snapGrid;

          return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
        },
        viewportInitialized: true
      };
    }

    return initialViewportHelper;
  }, [d3Zoom, d3Selection]);
  return viewportHelperFunctions;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useReactFlow() {
  var viewportHelper = useViewportHelper();
  var store = useStoreApi();
  var getNodes = useCallback(function () {
    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals;

    var nodes = Array.from(nodeInternals.values());
    return nodes.map(function (n) {
      return _objectSpread({}, n);
    });
  }, []);
  var getNode = useCallback(function (id) {
    var _store$getState2 = store.getState(),
        nodeInternals = _store$getState2.nodeInternals;

    return nodeInternals.get(id);
  }, []);
  var getEdges = useCallback(function () {
    var _store$getState3 = store.getState(),
        _store$getState3$edge = _store$getState3.edges,
        edges = _store$getState3$edge === void 0 ? [] : _store$getState3$edge;

    return edges.map(function (e) {
      return _objectSpread({}, e);
    });
  }, []);
  var getEdge = useCallback(function (id) {
    var _store$getState4 = store.getState(),
        _store$getState4$edge = _store$getState4.edges,
        edges = _store$getState4$edge === void 0 ? [] : _store$getState4$edge;

    return edges.find(function (e) {
      return e.id === id;
    });
  }, []);
  var setNodes = useCallback(function (payload) {
    var _store$getState5 = store.getState(),
        nodeInternals = _store$getState5.nodeInternals,
        setNodes = _store$getState5.setNodes,
        hasDefaultNodes = _store$getState5.hasDefaultNodes,
        onNodesChange = _store$getState5.onNodesChange;

    var nodes = Array.from(nodeInternals.values());
    var nextNodes = typeof payload === 'function' ? payload(nodes) : payload;

    if (hasDefaultNodes) {
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nextNodes.length === 0 ? nodes.map(function (node) {
        return {
          type: 'remove',
          id: node.id
        };
      }) : nextNodes.map(function (node) {
        return {
          item: node,
          type: 'reset'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var setEdges = useCallback(function (payload) {
    var _store$getState6 = store.getState(),
        _store$getState6$edge = _store$getState6.edges,
        edges = _store$getState6$edge === void 0 ? [] : _store$getState6$edge,
        setEdges = _store$getState6.setEdges,
        hasDefaultEdges = _store$getState6.hasDefaultEdges,
        onEdgesChange = _store$getState6.onEdgesChange;

    var nextEdges = typeof payload === 'function' ? payload(edges) : payload;

    if (hasDefaultEdges) {
      setEdges(nextEdges);
    } else if (onEdgesChange) {
      var changes = nextEdges.length === 0 ? edges.map(function (edge) {
        return {
          type: 'remove',
          id: edge.id
        };
      }) : nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'reset'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var addNodes = useCallback(function (payload) {
    var nodes = Array.isArray(payload) ? payload : [payload];

    var _store$getState7 = store.getState(),
        nodeInternals = _store$getState7.nodeInternals,
        setNodes = _store$getState7.setNodes,
        hasDefaultNodes = _store$getState7.hasDefaultNodes,
        onNodesChange = _store$getState7.onNodesChange;

    if (hasDefaultNodes) {
      var currentNodes = Array.from(nodeInternals.values());
      var nextNodes = [].concat(currentNodes, _toConsumableArray(nodes));
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nodes.map(function (node) {
        return {
          item: node,
          type: 'add'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var addEdges = useCallback(function (payload) {
    var nextEdges = Array.isArray(payload) ? payload : [payload];

    var _store$getState8 = store.getState(),
        _store$getState8$edge = _store$getState8.edges,
        edges = _store$getState8$edge === void 0 ? [] : _store$getState8$edge,
        setEdges = _store$getState8.setEdges,
        hasDefaultEdges = _store$getState8.hasDefaultEdges,
        onEdgesChange = _store$getState8.onEdgesChange;

    if (hasDefaultEdges) {
      setEdges([].concat(_toConsumableArray(edges), _toConsumableArray(nextEdges)));
    } else if (onEdgesChange) {
      var changes = nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'add'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var toObject = useCallback(function () {
    var _store$getState9 = store.getState(),
        nodeInternals = _store$getState9.nodeInternals,
        _store$getState9$edge = _store$getState9.edges,
        edges = _store$getState9$edge === void 0 ? [] : _store$getState9$edge,
        transform = _store$getState9.transform;

    var nodes = Array.from(nodeInternals.values());

    var _transform = _slicedToArray(transform, 3),
        x = _transform[0],
        y = _transform[1],
        zoom = _transform[2];

    return {
      nodes: nodes.map(function (n) {
        return _objectSpread({}, n);
      }),
      edges: edges.map(function (e) {
        return _objectSpread({}, e);
      }),
      viewport: {
        x: x,
        y: y,
        zoom: zoom
      }
    };
  }, []);
  return useMemo(function () {
    return _objectSpread(_objectSpread({}, viewportHelper), {}, {
      getNodes: getNodes,
      getNode: getNode,
      getEdges: getEdges,
      getEdge: getEdge,
      setNodes: setNodes,
      setEdges: setEdges,
      addNodes: addNodes,
      addEdges: addEdges,
      toObject: toObject
    });
  }, [viewportHelper, getNodes, getNode, getEdges, getEdge, setNodes, setEdges, addNodes, addEdges, toObject]);
}

export { _toConsumableArray as _, useReactFlow as u };
//# sourceMappingURL=useReactFlow-993c30ca.js.map
