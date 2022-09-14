import create from 'zustand';
import createContext from 'zustand/context';
import { zoomIdentity } from 'd3-zoom';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ConnectionMode;

(function (ConnectionMode) {
  ConnectionMode["Strict"] = "strict";
  ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));

var BackgroundVariant;

(function (BackgroundVariant) {
  BackgroundVariant["Lines"] = "lines";
  BackgroundVariant["Dots"] = "dots";
})(BackgroundVariant || (BackgroundVariant = {}));

var PanOnScrollMode;

(function (PanOnScrollMode) {
  PanOnScrollMode["Free"] = "free";
  PanOnScrollMode["Vertical"] = "vertical";
  PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));

var ConnectionLineType;

(function (ConnectionLineType) {
  ConnectionLineType["Bezier"] = "default";
  ConnectionLineType["Straight"] = "straight";
  ConnectionLineType["Step"] = "step";
  ConnectionLineType["SmoothStep"] = "smoothstep";
  ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));

var MarkerType;

(function (MarkerType) {
  MarkerType["Arrow"] = "arrow";
  MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));

var Position;

(function (Position) {
  Position["Left"] = "left";
  Position["Top"] = "top";
  Position["Right"] = "right";
  Position["Bottom"] = "bottom";
})(Position || (Position = {}));

var getDimensions = function getDimensions(node) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
};
var clamp = function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Math.min(Math.max(val, min), max);
};
var clampPosition = function clampPosition(position, extent) {
  return {
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1])
  };
};
var getHostForElement = function getHostForElement(element) {
  var _element$getRootNode, _window;

  return ((_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element)) || ((_window = window) === null || _window === void 0 ? void 0 : _window.document);
};
var getBoundsOfBoxes = function getBoundsOfBoxes(box1, box2) {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  };
};
var rectToBox = function rectToBox(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height;
  return {
    x: x,
    y: y,
    x2: x + width,
    y2: y + height
  };
};
var boxToRect = function boxToRect(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      x2 = _ref2.x2,
      y2 = _ref2.y2;
  return {
    x: x,
    y: y,
    width: x2 - x,
    height: y2 - y
  };
};
var getBoundsofRects = function getBoundsofRects(rect1, rect2) {
  return boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
};
var isNumeric = function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
};
var internalsSymbol = Symbol('internals');

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function handleParentExpand(res, updateItem) {
  var parent = res.find(function (e) {
    return e.id === updateItem.parentNode;
  });

  if (parent) {
    var extendWidth = updateItem.position.x + updateItem.width - parent.width;
    var extendHeight = updateItem.position.y + updateItem.height - parent.height;

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      var _parent$style$width, _parent$style$height;

      parent.style = _objectSpread$4({}, parent.style) || {};
      parent.style.width = (_parent$style$width = parent.style.width) !== null && _parent$style$width !== void 0 ? _parent$style$width : parent.width;
      parent.style.height = (_parent$style$height = parent.style.height) !== null && _parent$style$height !== void 0 ? _parent$style$height : parent.height;

      if (extendWidth > 0) {
        parent.style.width += extendWidth;
      }

      if (extendHeight > 0) {
        parent.style.height += extendHeight;
      }

      if (updateItem.position.x < 0) {
        var xDiff = Math.abs(updateItem.position.x);
        parent.position.x = parent.position.x - xDiff;
        parent.style.width += xDiff;
        updateItem.position.x = 0;
      }

      if (updateItem.position.y < 0) {
        var yDiff = Math.abs(updateItem.position.y);
        parent.position.y = parent.position.y - yDiff;
        parent.style.height += yDiff;
        updateItem.position.y = 0;
      }

      parent.width = parent.style.width;
      parent.height = parent.style.height;
    }
  }
}

function applyChanges(changes, elements) {
  // we need this hack to handle the setNodes and setEdges function of the useReactFlow hook for controlled flows
  if (changes.some(function (c) {
    return c.type === 'reset';
  })) {
    return changes.filter(function (c) {
      return c.type === 'reset';
    }).map(function (c) {
      return c.item;
    });
  }

  var initElements = changes.filter(function (c) {
    return c.type === 'add';
  }).map(function (c) {
    return c.item;
  });
  return elements.reduce(function (res, item) {
    var currentChange = changes.find(function (c) {
      return c.id === item.id;
    });

    if (currentChange) {
      switch (currentChange.type) {
        case 'select':
          {
            res.push(_objectSpread$4(_objectSpread$4({}, item), {}, {
              selected: currentChange.selected
            }));
            return res;
          }

        case 'position':
          {
            var updateItem = _objectSpread$4({}, item);

            if (typeof currentChange.position !== 'undefined') {
              updateItem.position = currentChange.position;
            }

            if (typeof currentChange.positionAbsolute !== 'undefined') {
              updateItem.positionAbsolute = currentChange.positionAbsolute;
            }

            if (typeof currentChange.dragging !== 'undefined') {
              updateItem.dragging = currentChange.dragging;
            }

            if (updateItem.expandParent) {
              handleParentExpand(res, updateItem);
            }

            res.push(updateItem);
            return res;
          }

        case 'dimensions':
          {
            var _updateItem = _objectSpread$4({}, item);

            if (typeof currentChange.dimensions !== 'undefined') {
              _updateItem.width = currentChange.dimensions.width;
              _updateItem.height = currentChange.dimensions.height;
            }

            if (_updateItem.expandParent) {
              handleParentExpand(res, _updateItem);
            }

            res.push(_updateItem);
            return res;
          }

        case 'remove':
          {
            return res;
          }
      }
    }

    res.push(item);
    return res;
  }, initElements);
}

function applyNodeChanges(changes, nodes) {
  return applyChanges(changes, nodes);
}
function applyEdgeChanges(changes, edges) {
  return applyChanges(changes, edges);
}
var createSelectionChange = function createSelectionChange(id, selected) {
  return {
    id: id,
    type: 'select',
    selected: selected
  };
};
function getSelectionChanges(items, selectedIds) {
  return items.reduce(function (res, item) {
    var willBeSelected = selectedIds.includes(item.id);

    if (!item.selected && willBeSelected) {
      item.selected = true;
      res.push(createSelectionChange(item.id, true));
    } else if (item.selected && !willBeSelected) {
      item.selected = false;
      res.push(createSelectionChange(item.id, false));
    }

    return res;
  }, []);
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var getHandleBounds = function getHandleBounds(selector, nodeElement, zoom) {
  var handles = nodeElement.querySelectorAll(selector);

  if (!handles || !handles.length) {
    return null;
  }

  var handlesArray = Array.from(handles);
  var nodeBounds = nodeElement.getBoundingClientRect();
  return handlesArray.map(function (handle) {
    var handleBounds = handle.getBoundingClientRect();
    return _objectSpread$3({
      id: handle.getAttribute('data-handleid'),
      position: handle.getAttribute('data-handlepos'),
      x: (handleBounds.left - nodeBounds.left) / zoom,
      y: (handleBounds.top - nodeBounds.top) / zoom
    }, getDimensions(handle));
  });
};
function getMouseHandler(id, getState, handler) {
  return handler === undefined ? handler : function (event) {
    var node = getState().nodeInternals.get(id);
    handler(event, _objectSpread$3({}, node));
  };
} // this handler is called by
// 1. the click handler when node is not draggable or selectNodesOnDrag = false
// or
// 2. the on drag start handler when node is draggable and selectNodesOnDrag = true

function handleNodeClick(_ref) {
  var id = _ref.id,
      store = _ref.store;

  var _store$getState = store.getState(),
      addSelectedNodes = _store$getState.addSelectedNodes,
      unselectNodesAndEdges = _store$getState.unselectNodesAndEdges,
      multiSelectionActive = _store$getState.multiSelectionActive,
      nodeInternals = _store$getState.nodeInternals;

  var node = nodeInternals.get(id);
  store.setState({
    nodesSelectionActive: false
  });

  if (!node.selected) {
    addSelectedNodes([id]);
  } else if (node.selected && multiSelectionActive) {
    unselectNodesAndEdges({
      nodes: [node]
    });
  }
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isEdge = function isEdge(element) {
  return 'id' in element && 'source' in element && 'target' in element;
};
var isNode = function isNode(element) {
  return 'id' in element && !('source' in element) && !('target' in element);
};
var getOutgoers = function getOutgoers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }

  var outgoerIds = edges.filter(function (e) {
    return e.source === node.id;
  }).map(function (e) {
    return e.target;
  });
  return nodes.filter(function (n) {
    return outgoerIds.includes(n.id);
  });
};
var getIncomers = function getIncomers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }

  var incomersIds = edges.filter(function (e) {
    return e.target === node.id;
  }).map(function (e) {
    return e.source;
  });
  return nodes.filter(function (n) {
    return incomersIds.includes(n.id);
  });
};

var getEdgeId = function getEdgeId(_ref) {
  var source = _ref.source,
      sourceHandle = _ref.sourceHandle,
      target = _ref.target,
      targetHandle = _ref.targetHandle;
  return "reactflow__edge-".concat(source).concat(sourceHandle || '', "-").concat(target).concat(targetHandle || '');
};

var getMarkerId = function getMarkerId(marker, rfId) {
  if (typeof marker === 'undefined') {
    return '';
  }

  if (typeof marker === 'string') {
    return marker;
  }

  var idPrefix = rfId ? "".concat(rfId, "__") : '';
  return "".concat(idPrefix).concat(Object.keys(marker).sort().map(function (key) {
    return "".concat(key, "=").concat(marker[key]);
  }).join('&'));
};

var connectionExists = function connectionExists(edge, edges) {
  return edges.some(function (el) {
    return el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle);
  });
};

var addEdge = function addEdge(edgeParams, edges) {
  if (!edgeParams.source || !edgeParams.target) {
    // @ts-ignore
    if (process.env.NODE_ENV === 'development') {
      console.warn("[React Flow]: Can't create edge. An edge needs a source and a target. Help: https://reactflow.dev/error#600");
    }

    return edges;
  }

  var edge;

  if (isEdge(edgeParams)) {
    edge = _objectSpread$2({}, edgeParams);
  } else {
    edge = _objectSpread$2(_objectSpread$2({}, edgeParams), {}, {
      id: getEdgeId(edgeParams)
    });
  }

  if (connectionExists(edge, edges)) {
    return edges;
  }

  return edges.concat(edge);
};
var updateEdge = function updateEdge(oldEdge, newConnection, edges) {
  if (!newConnection.source || !newConnection.target) {
    // @ts-ignore
    if (process.env.NODE_ENV === 'development') {
      console.warn("[React Flow]: Can't create a new edge. An edge needs a source and a target. Help: https://reactflow.dev/error#600");
    }

    return edges;
  }

  var foundEdge = edges.find(function (e) {
    return e.id === oldEdge.id;
  });

  if (!foundEdge) {
    // @ts-ignore
    if (process.env.NODE_ENV === 'development') {
      console.warn("[React Flow]: The old edge with id=".concat(oldEdge.id, " does not exist. Help: https://reactflow.dev/error#700"));
    }

    return edges;
  } // Remove old edge and create the new edge with parameters of old edge.


  var edge = _objectSpread$2(_objectSpread$2({}, oldEdge), {}, {
    id: getEdgeId(newConnection),
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle
  });

  return edges.filter(function (e) {
    return e.id !== oldEdge.id;
  }).concat(edge);
};
var pointToRendererPoint = function pointToRendererPoint(_ref2, _ref3, snapToGrid, _ref4) {
  var x = _ref2.x,
      y = _ref2.y;

  var _ref5 = _slicedToArray(_ref3, 3),
      tx = _ref5[0],
      ty = _ref5[1],
      tScale = _ref5[2];

  var _ref6 = _slicedToArray(_ref4, 2),
      snapX = _ref6[0],
      snapY = _ref6[1];

  var position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale
  };

  if (snapToGrid) {
    return {
      x: snapX * Math.round(position.x / snapX),
      y: snapY * Math.round(position.y / snapY)
    };
  }

  return position;
};
var getRectOfNodes = function getRectOfNodes(nodes) {
  if (nodes.length === 0) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }

  var box = nodes.reduce(function (currBox, _ref7) {
    var positionAbsolute = _ref7.positionAbsolute,
        position = _ref7.position,
        width = _ref7.width,
        height = _ref7.height;
    return getBoundsOfBoxes(currBox, rectToBox({
      x: positionAbsolute ? positionAbsolute.x : position.x,
      y: positionAbsolute ? positionAbsolute.y : position.y,
      width: width || 0,
      height: height || 0
    }));
  }, {
    x: Infinity,
    y: Infinity,
    x2: -Infinity,
    y2: -Infinity
  });
  return boxToRect(box);
};
var getNodesInside = function getNodesInside(nodeInternals, rect) {
  var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0, 1],
      _ref9 = _slicedToArray(_ref8, 3),
      tx = _ref9[0],
      ty = _ref9[1],
      tScale = _ref9[2];

  var partially = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var excludeNonSelectableNodes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var rBox = rectToBox({
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale
  });
  var visibleNodes = [];
  nodeInternals.forEach(function (node) {
    var positionAbsolute = node.positionAbsolute,
        width = node.width,
        height = node.height,
        _node$selectable = node.selectable,
        selectable = _node$selectable === void 0 ? true : _node$selectable;

    if (excludeNonSelectableNodes && !selectable) {
      return false;
    }

    var nBox = rectToBox(_objectSpread$2(_objectSpread$2({}, positionAbsolute), {}, {
      width: width || 0,
      height: height || 0
    }));
    var xOverlap = Math.max(0, Math.min(rBox.x2, nBox.x2) - Math.max(rBox.x, nBox.x));
    var yOverlap = Math.max(0, Math.min(rBox.y2, nBox.y2) - Math.max(rBox.y, nBox.y));
    var overlappingArea = Math.ceil(xOverlap * yOverlap);
    var notInitialized = typeof width === 'undefined' || typeof height === 'undefined' || width === null || height === null;
    var partiallyVisible = partially && overlappingArea > 0;
    var area = (width || 0) * (height || 0);
    var isVisible = notInitialized || partiallyVisible || overlappingArea >= area;

    if (isVisible) {
      visibleNodes.push(node);
    }
  });
  return visibleNodes;
};
var getConnectedEdges = function getConnectedEdges(nodes, edges) {
  var nodeIds = nodes.map(function (node) {
    return node.id;
  });
  return edges.filter(function (edge) {
    return nodeIds.includes(edge.source) || nodeIds.includes(edge.target);
  });
};
var getTransformForBounds = function getTransformForBounds(bounds, width, height, minZoom, maxZoom) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.1;
  var xZoom = width / (bounds.width * (1 + padding));
  var yZoom = height / (bounds.height * (1 + padding));
  var zoom = Math.min(xZoom, yZoom);
  var clampedZoom = clamp(zoom, minZoom, maxZoom);
  var boundsCenterX = bounds.x + bounds.width / 2;
  var boundsCenterY = bounds.y + bounds.height / 2;
  var x = width / 2 - boundsCenterX * clampedZoom;
  var y = height / 2 - boundsCenterY * clampedZoom;
  return [x, y, clampedZoom];
};
var getD3Transition = function getD3Transition(selection) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return selection.transition().duration(duration);
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function calculateXYZPosition(node, nodeInternals, parentNodes, result) {
  var _result$x, _parentNode$position$, _parentNode$position, _result$y, _parentNode$position$2, _parentNode$position2, _parentNode$internals, _parentNode$internals2, _result$z, _parentNode$internals3, _parentNode$internals4, _result$z2;

  if (!node.parentNode) {
    return result;
  }

  var parentNode = nodeInternals.get(node.parentNode);
  return calculateXYZPosition(parentNode, nodeInternals, parentNodes, {
    x: ((_result$x = result.x) !== null && _result$x !== void 0 ? _result$x : 0) + ((_parentNode$position$ = (_parentNode$position = parentNode.position) === null || _parentNode$position === void 0 ? void 0 : _parentNode$position.x) !== null && _parentNode$position$ !== void 0 ? _parentNode$position$ : 0),
    y: ((_result$y = result.y) !== null && _result$y !== void 0 ? _result$y : 0) + ((_parentNode$position$2 = (_parentNode$position2 = parentNode.position) === null || _parentNode$position2 === void 0 ? void 0 : _parentNode$position2.y) !== null && _parentNode$position$2 !== void 0 ? _parentNode$position$2 : 0),
    z: ((_parentNode$internals = (_parentNode$internals2 = parentNode[internalsSymbol]) === null || _parentNode$internals2 === void 0 ? void 0 : _parentNode$internals2.z) !== null && _parentNode$internals !== void 0 ? _parentNode$internals : 0) > ((_result$z = result.z) !== null && _result$z !== void 0 ? _result$z : 0) ? (_parentNode$internals3 = (_parentNode$internals4 = parentNode[internalsSymbol]) === null || _parentNode$internals4 === void 0 ? void 0 : _parentNode$internals4.z) !== null && _parentNode$internals3 !== void 0 ? _parentNode$internals3 : 0 : (_result$z2 = result.z) !== null && _result$z2 !== void 0 ? _result$z2 : 0
  });
}

function createNodeInternals(nodes, nodeInternals) {
  var nextNodeInternals = new Map();
  var parentNodes = {};
  nodes.forEach(function (node) {
    var _currInternals$intern;

    var z = isNumeric(node.zIndex) ? node.zIndex : node.selected ? 1000 : 0;
    var currInternals = nodeInternals.get(node.id);

    var internals = _objectSpread$1(_objectSpread$1({
      width: currInternals === null || currInternals === void 0 ? void 0 : currInternals.width,
      height: currInternals === null || currInternals === void 0 ? void 0 : currInternals.height
    }, node), {}, {
      positionAbsolute: {
        x: node.position.x,
        y: node.position.y
      }
    });

    if (node.parentNode) {
      internals.parentNode = node.parentNode;
      parentNodes[node.parentNode] = true;
    }

    Object.defineProperty(internals, internalsSymbol, {
      enumerable: false,
      value: {
        handleBounds: currInternals === null || currInternals === void 0 ? void 0 : (_currInternals$intern = currInternals[internalsSymbol]) === null || _currInternals$intern === void 0 ? void 0 : _currInternals$intern.handleBounds,
        z: z
      }
    });
    nextNodeInternals.set(node.id, internals);
  });
  nextNodeInternals.forEach(function (node) {
    if (node.parentNode && !nextNodeInternals.has(node.parentNode)) {
      throw new Error("Parent node ".concat(node.parentNode, " not found"));
    }

    if (node.parentNode || parentNodes[node.id]) {
      var _node$internalsSymbol, _node$internalsSymbol2;

      var _calculateXYZPosition = calculateXYZPosition(node, nextNodeInternals, parentNodes, _objectSpread$1(_objectSpread$1({}, node.position), {}, {
        z: (_node$internalsSymbol = (_node$internalsSymbol2 = node[internalsSymbol]) === null || _node$internalsSymbol2 === void 0 ? void 0 : _node$internalsSymbol2.z) !== null && _node$internalsSymbol !== void 0 ? _node$internalsSymbol : 0
      })),
          x = _calculateXYZPosition.x,
          y = _calculateXYZPosition.y,
          z = _calculateXYZPosition.z;

      node.positionAbsolute = {
        x: x,
        y: y
      };
      node[internalsSymbol].z = z;

      if (parentNodes[node.id]) {
        node[internalsSymbol].isParent = true;
      }
    }
  });
  return nextNodeInternals;
}
function fitView(get) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _get = get(),
      nodeInternals = _get.nodeInternals,
      width = _get.width,
      height = _get.height,
      minZoom = _get.minZoom,
      maxZoom = _get.maxZoom,
      d3Zoom = _get.d3Zoom,
      d3Selection = _get.d3Selection,
      fitViewOnInitDone = _get.fitViewOnInitDone,
      fitViewOnInit = _get.fitViewOnInit;

  if (options.initial && !fitViewOnInitDone && fitViewOnInit || !options.initial) {
    if (d3Zoom && d3Selection) {
      var nodes = Array.from(nodeInternals.values()).filter(function (n) {
        return options.includeHiddenNodes ? n.width && n.height : !n.hidden;
      });
      var nodesInitialized = nodes.every(function (n) {
        return n.width && n.height;
      });

      if (nodes.length > 0 && nodesInitialized) {
        var _options$minZoom, _options$maxZoom, _options$padding;

        var bounds = getRectOfNodes(nodes);

        var _getTransformForBound = getTransformForBounds(bounds, width, height, (_options$minZoom = options.minZoom) !== null && _options$minZoom !== void 0 ? _options$minZoom : minZoom, (_options$maxZoom = options.maxZoom) !== null && _options$maxZoom !== void 0 ? _options$maxZoom : maxZoom, (_options$padding = options.padding) !== null && _options$padding !== void 0 ? _options$padding : 0.1),
            _getTransformForBound2 = _slicedToArray(_getTransformForBound, 3),
            x = _getTransformForBound2[0],
            y = _getTransformForBound2[1],
            zoom = _getTransformForBound2[2];

        var nextTransform = zoomIdentity.translate(x, y).scale(zoom);

        if (typeof options.duration === 'number' && options.duration > 0) {
          d3Zoom.transform(getD3Transition(d3Selection, options.duration), nextTransform);
        } else {
          d3Zoom.transform(d3Selection, nextTransform);
        }

        return true;
      }
    }
  }

  return false;
}
function handleControlledNodeSelectionChange(nodeChanges, nodeInternals) {
  nodeChanges.forEach(function (change) {
    var node = nodeInternals.get(change.id);

    if (node) {
      var _objectSpread2;

      nodeInternals.set(node.id, _objectSpread$1(_objectSpread$1({}, node), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, internalsSymbol, node[internalsSymbol]), _defineProperty(_objectSpread2, "selected", change.selected), _objectSpread2)));
    }
  });
  return new Map(nodeInternals);
}
function handleControlledEdgeSelectionChange(edgeChanges, edges) {
  return edges.map(function (e) {
    var change = edgeChanges.find(function (change) {
      return change.id === e.id;
    });

    if (change) {
      e.selected = change.selected;
    }

    return e;
  });
}
function updateNodesAndEdgesSelections(_ref) {
  var changedNodes = _ref.changedNodes,
      changedEdges = _ref.changedEdges,
      get = _ref.get,
      set = _ref.set;

  var _get2 = get(),
      nodeInternals = _get2.nodeInternals,
      edges = _get2.edges,
      onNodesChange = _get2.onNodesChange,
      onEdgesChange = _get2.onEdgesChange,
      hasDefaultNodes = _get2.hasDefaultNodes,
      hasDefaultEdges = _get2.hasDefaultEdges;

  if (changedNodes !== null && changedNodes !== void 0 && changedNodes.length) {
    if (hasDefaultNodes) {
      set({
        nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals)
      });
    }

    onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changedNodes);
  }

  if (changedEdges !== null && changedEdges !== void 0 && changedEdges.length) {
    if (hasDefaultEdges) {
      set({
        edges: handleControlledEdgeSelectionChange(changedEdges, edges)
      });
    }

    onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(changedEdges);
  }
}

var infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
var initialState = {
  width: 0,
  height: 0,
  transform: [0, 0, 1],
  nodeInternals: new Map(),
  edges: [],
  onNodesChange: null,
  onEdgesChange: null,
  hasDefaultNodes: false,
  hasDefaultEdges: false,
  d3Zoom: null,
  d3Selection: null,
  d3ZoomHandler: undefined,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: infiniteExtent,
  nodeExtent: infiniteExtent,
  nodesSelectionActive: false,
  userSelectionActive: false,
  connectionNodeId: null,
  connectionHandleId: null,
  connectionHandleType: 'source',
  connectionPosition: {
    x: 0,
    y: 0
  },
  connectionMode: ConnectionMode.Strict,
  domNode: null,
  snapGrid: [15, 15],
  snapToGrid: false,
  nodesDraggable: true,
  nodesConnectable: true,
  elementsSelectable: true,
  fitViewOnInit: false,
  fitViewOnInitDone: false,
  fitViewOnInitOptions: undefined,
  multiSelectionActive: false,
  reactFlowVersion: "10.3.17" ,
  connectionStartHandle: null,
  connectOnClick: true
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _createContext = createContext(),
    Provider = _createContext.Provider,
    useStore = _createContext.useStore,
    useStoreApi = _createContext.useStoreApi;

var createStore = function createStore() {
  return create(function (set, get) {
    return _objectSpread(_objectSpread({}, initialState), {}, {
      setNodes: function setNodes(nodes) {
        set({
          nodeInternals: createNodeInternals(nodes, get().nodeInternals)
        });
      },
      setEdges: function setEdges(edges) {
        var _get = get(),
            _get$defaultEdgeOptio = _get.defaultEdgeOptions,
            defaultEdgeOptions = _get$defaultEdgeOptio === void 0 ? {} : _get$defaultEdgeOptio;

        set({
          edges: edges.map(function (e) {
            return _objectSpread(_objectSpread({}, defaultEdgeOptions), e);
          })
        });
      },
      setDefaultNodesAndEdges: function setDefaultNodesAndEdges(nodes, edges) {
        var hasDefaultNodes = typeof nodes !== 'undefined';
        var hasDefaultEdges = typeof edges !== 'undefined';
        var nodeInternals = hasDefaultNodes ? createNodeInternals(nodes, new Map()) : new Map();
        var nextEdges = hasDefaultEdges ? edges : [];
        set({
          nodeInternals: nodeInternals,
          edges: nextEdges,
          hasDefaultNodes: hasDefaultNodes,
          hasDefaultEdges: hasDefaultEdges
        });
      },
      updateNodeDimensions: function updateNodeDimensions(updates) {
        var _get2 = get(),
            onNodesChange = _get2.onNodesChange,
            nodeInternals = _get2.nodeInternals,
            fitViewOnInit = _get2.fitViewOnInit,
            fitViewOnInitDone = _get2.fitViewOnInitDone,
            fitViewOnInitOptions = _get2.fitViewOnInitOptions,
            domNode = _get2.domNode;

        var viewportNode = domNode === null || domNode === void 0 ? void 0 : domNode.querySelector('.react-flow__viewport');

        if (!viewportNode) {
          return;
        }

        var style = window.getComputedStyle(viewportNode);

        var _window$DOMMatrixRead = new window.DOMMatrixReadOnly(style.transform),
            zoom = _window$DOMMatrixRead.m22;

        var changes = updates.reduce(function (res, update) {
          var node = nodeInternals.get(update.id);

          if (node) {
            var dimensions = getDimensions(update.nodeElement);
            var doUpdate = !!(dimensions.width && dimensions.height && (node.width !== dimensions.width || node.height !== dimensions.height || update.forceUpdate));

            if (doUpdate) {
              nodeInternals.set(node.id, _objectSpread(_objectSpread({}, node), {}, _defineProperty({}, internalsSymbol, _objectSpread(_objectSpread({}, node[internalsSymbol]), {}, {
                handleBounds: {
                  source: getHandleBounds('.source', update.nodeElement, zoom),
                  target: getHandleBounds('.target', update.nodeElement, zoom)
                }
              })), dimensions));
              res.push({
                id: node.id,
                type: 'dimensions',
                dimensions: dimensions
              });
            }
          }

          return res;
        }, []);
        var nextFitViewOnInitDone = fitViewOnInitDone || fitViewOnInit && !fitViewOnInitDone && fitView(get, _objectSpread({
          initial: true
        }, fitViewOnInitOptions));
        set({
          nodeInternals: new Map(nodeInternals),
          fitViewOnInitDone: nextFitViewOnInitDone
        });

        if ((changes === null || changes === void 0 ? void 0 : changes.length) > 0) {
          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
        }
      },
      updateNodePositions: function updateNodePositions(nodeDragItems) {
        var positionChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var dragging = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var _get3 = get(),
            onNodesChange = _get3.onNodesChange,
            nodeInternals = _get3.nodeInternals,
            hasDefaultNodes = _get3.hasDefaultNodes;

        if (hasDefaultNodes || onNodesChange) {
          var changes = nodeDragItems.map(function (node) {
            var change = {
              id: node.id,
              type: 'position',
              dragging: dragging
            };

            if (positionChanged) {
              change.positionAbsolute = node.positionAbsolute;
              change.position = node.position;
            }

            return change;
          });

          if (changes !== null && changes !== void 0 && changes.length) {
            if (hasDefaultNodes) {
              var nodes = applyNodeChanges(changes, Array.from(nodeInternals.values()));
              var nextNodeInternals = createNodeInternals(nodes, nodeInternals);
              set({
                nodeInternals: nextNodeInternals
              });
            }

            onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
          }
        }
      },
      addSelectedNodes: function addSelectedNodes(selectedNodeIds) {
        var _get4 = get(),
            multiSelectionActive = _get4.multiSelectionActive,
            nodeInternals = _get4.nodeInternals,
            edges = _get4.edges;

        var changedNodes;
        var changedEdges = null;

        if (multiSelectionActive) {
          changedNodes = selectedNodeIds.map(function (nodeId) {
            return createSelectionChange(nodeId, true);
          });
        } else {
          changedNodes = getSelectionChanges(Array.from(nodeInternals.values()), selectedNodeIds);
          changedEdges = getSelectionChanges(edges, []);
        }

        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      addSelectedEdges: function addSelectedEdges(selectedEdgeIds) {
        var _get5 = get(),
            multiSelectionActive = _get5.multiSelectionActive,
            edges = _get5.edges,
            nodeInternals = _get5.nodeInternals;

        var changedEdges;
        var changedNodes = null;

        if (multiSelectionActive) {
          changedEdges = selectedEdgeIds.map(function (edgeId) {
            return createSelectionChange(edgeId, true);
          });
        } else {
          changedEdges = getSelectionChanges(edges, selectedEdgeIds);
          changedNodes = getSelectionChanges(Array.from(nodeInternals.values()), []);
        }

        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      unselectNodesAndEdges: function unselectNodesAndEdges() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            nodes = _ref.nodes,
            edges = _ref.edges;

        var _get6 = get(),
            nodeInternals = _get6.nodeInternals,
            storeEdges = _get6.edges;

        var nodesToUnselect = nodes ? nodes : Array.from(nodeInternals.values());
        var edgesToUnselect = edges ? edges : storeEdges;
        var changedNodes = nodesToUnselect.map(function (n) {
          n.selected = false;
          return createSelectionChange(n.id, false);
        });
        var changedEdges = edgesToUnselect.map(function (edge) {
          return createSelectionChange(edge.id, false);
        });
        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      setMinZoom: function setMinZoom(minZoom) {
        var _get7 = get(),
            d3Zoom = _get7.d3Zoom,
            maxZoom = _get7.maxZoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          minZoom: minZoom
        });
      },
      setMaxZoom: function setMaxZoom(maxZoom) {
        var _get8 = get(),
            d3Zoom = _get8.d3Zoom,
            minZoom = _get8.minZoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          maxZoom: maxZoom
        });
      },
      setTranslateExtent: function setTranslateExtent(translateExtent) {
        var _get9 = get(),
            d3Zoom = _get9.d3Zoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.translateExtent(translateExtent);
        set({
          translateExtent: translateExtent
        });
      },
      resetSelectedElements: function resetSelectedElements() {
        var _get10 = get(),
            nodeInternals = _get10.nodeInternals,
            edges = _get10.edges;

        var nodes = Array.from(nodeInternals.values());
        var nodesToUnselect = nodes.filter(function (e) {
          return e.selected;
        }).map(function (n) {
          return createSelectionChange(n.id, false);
        });
        var edgesToUnselect = edges.filter(function (e) {
          return e.selected;
        }).map(function (e) {
          return createSelectionChange(e.id, false);
        });
        updateNodesAndEdgesSelections({
          changedNodes: nodesToUnselect,
          changedEdges: edgesToUnselect,
          get: get,
          set: set
        });
      },
      setNodeExtent: function setNodeExtent(nodeExtent) {
        var _get11 = get(),
            nodeInternals = _get11.nodeInternals;

        nodeInternals.forEach(function (node) {
          node.positionAbsolute = clampPosition(node.position, nodeExtent);
        });
        set({
          nodeExtent: nodeExtent,
          nodeInternals: new Map(nodeInternals)
        });
      },
      reset: function reset() {
        return set(_objectSpread({}, initialState));
      }
    });
  });
};

export { isNode as A, isEdge as B, ConnectionMode as C, getOutgoers as D, getIncomers as E, updateEdge as F, getTransformForBounds as G, BackgroundVariant as H, getBoundsofRects as I, _arrayLikeToArray as J, _unsupportedIterableToArray as K, getD3Transition as L, MarkerType as M, fitView as N, Position as P, _slicedToArray as _, _defineProperty as a, useStore as b, addEdge as c, getMarkerId as d, getConnectedEdges as e, getDimensions as f, getHostForElement as g, PanOnScrollMode as h, internalsSymbol as i, clamp as j, getNodesInside as k, getSelectionChanges as l, clampPosition as m, handleNodeClick as n, getRectOfNodes as o, pointToRendererPoint as p, ConnectionLineType as q, rectToBox as r, isNumeric as s, getMouseHandler as t, useStoreApi as u, Provider as v, createStore as w, infiniteExtent as x, applyNodeChanges as y, applyEdgeChanges as z };
//# sourceMappingURL=index-a12c80bd.js.map
