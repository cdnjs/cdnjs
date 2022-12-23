/*
JqTree 1.7.0

Copyright 2022 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
@license

*/
var jqtree = (function (exports) {
  'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var version = "1.7.0";

  var Position;
  (function (Position) {
    Position[Position["Before"] = 1] = "Before";
    Position[Position["After"] = 2] = "After";
    Position[Position["Inside"] = 3] = "Inside";
    Position[Position["None"] = 4] = "None";
  })(Position || (Position = {}));
  var positionNames = {
    before: Position.Before,
    after: Position.After,
    inside: Position.Inside,
    none: Position.None
  };
  var getPositionName = function getPositionName(position) {
    for (var name in positionNames) {
      if (Object.prototype.hasOwnProperty.call(positionNames, name)) {
        if (positionNames[name] === position) {
          return name;
        }
      }
    }
    return "";
  };
  var getPosition = function getPosition(name) {
    return positionNames[name];
  };
  var isNodeRecordWithChildren = function isNodeRecordWithChildren(data) {
    return _typeof(data) === "object" && "children" in data && data["children"] instanceof Array;
  };
  var Node = /*#__PURE__*/function () {
    function Node() {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nodeClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Node;
      _classCallCheck(this, Node);
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "children", void 0);
      _defineProperty(this, "parent", void 0);
      _defineProperty(this, "idMapping", void 0);
      _defineProperty(this, "tree", void 0);
      _defineProperty(this, "nodeClass", void 0);
      _defineProperty(this, "load_on_demand", void 0);
      _defineProperty(this, "is_open", void 0);
      _defineProperty(this, "element", void 0);
      _defineProperty(this, "is_loading", void 0);
      _defineProperty(this, "isEmptyFolder", void 0);
      this.name = "";
      this.isEmptyFolder = false;
      this.load_on_demand = false;
      this.setData(o);
      this.children = [];
      this.parent = null;
      if (isRoot) {
        this.idMapping = new Map();
        this.tree = this;
        this.nodeClass = nodeClass;
      }
    }

    /*
    Set the data of this node.
     setData(string): set the name of the node
    setdata(object): set attributes of the node
     Examples:
        setdata('node1')
         setData({ name: 'node1', id: 1});
         setData({ name: 'node2', id: 2, color: 'green'});
     * This is an internal function; it is not in the docs
    * Does not remove existing node values
    */
    _createClass(Node, [{
      key: "setData",
      value: function setData(o) {
        if (!o) {
          return;
        } else if (typeof o === "string") {
          this.name = o;
        } else if (_typeof(o) === "object") {
          for (var _key in o) {
            if (Object.prototype.hasOwnProperty.call(o, _key)) {
              var value = o[_key];
              if (_key === "label" || _key === "name") {
                // You can use the 'label' key instead of 'name'; this is a legacy feature
                if (typeof value === "string") {
                  this.name = value;
                }
              } else if (_key !== "children" && _key !== "parent") {
                // You can't update the children or the parent using this function
                this[_key] = value;
              }
            }
          }
        }
      }

      /*
      Create tree from data.
       Structure of data is:
      [
          {
              name: 'node1',
              children: [
                  { name: 'child1' },
                  { name: 'child2' }
              ]
          },
          {
              name: 'node2'
          }
      ]
      */
    }, {
      key: "loadFromData",
      value: function loadFromData(data) {
        this.removeChildren();
        var _iterator = _createForOfIteratorHelper(data),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var o = _step.value;
            var _node = this.createNode(o);
            this.addChild(_node);
            if (isNodeRecordWithChildren(o)) {
              if (o.children.length === 0) {
                _node.isEmptyFolder = true;
              } else {
                _node.loadFromData(o.children);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return this;
      }

      /*
      Add child.
       tree.addChild(
          new Node('child1')
      );
      */
    }, {
      key: "addChild",
      value: function addChild(node) {
        this.children.push(node);
        node.setParent(this);
      }

      /*
      Add child at position. Index starts at 0.
       tree.addChildAtPosition(
          new Node('abc'),
          1
      );
      */
    }, {
      key: "addChildAtPosition",
      value: function addChildAtPosition(node, index) {
        this.children.splice(index, 0, node);
        node.setParent(this);
      }

      /*
      Remove child. This also removes the children of the node.
       tree.removeChild(tree.children[0]);
      */
    }, {
      key: "removeChild",
      value: function removeChild(node) {
        // remove children from the index
        node.removeChildren();
        this.doRemoveChild(node);
      }

      /*
      Get child index.
       var index = getChildIndex(node);
      */
    }, {
      key: "getChildIndex",
      value: function getChildIndex(node) {
        return this.children.indexOf(node);
      }

      /*
      Does the tree have children?
       if (tree.hasChildren()) {
          //
      }
      */
    }, {
      key: "hasChildren",
      value: function hasChildren() {
        return this.children.length !== 0;
      }
    }, {
      key: "isFolder",
      value: function isFolder() {
        return this.hasChildren() || this.load_on_demand;
      }

      /*
      Iterate over all the nodes in the tree.
       Calls callback with (node, level).
       The callback must return true to continue the iteration on current node.
       tree.iterate(
          function(node, level) {
             console.log(node.name);
              // stop iteration after level 2
             return (level <= 2);
          }
      );
       */
    }, {
      key: "iterate",
      value: function iterate(callback) {
        var _iterate = function _iterate(node, level) {
          if (node.children) {
            var _iterator2 = _createForOfIteratorHelper(node.children),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var child = _step2.value;
                var result = callback(child, level);
                if (result && child.hasChildren()) {
                  _iterate(child, level + 1);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        };
        _iterate(this, 0);
      }

      /*
      Move node relative to another node.
       Argument position: Position.BEFORE, Position.AFTER or Position.Inside
       // move node1 after node2
      tree.moveNode(node1, node2, Position.AFTER);
      */
    }, {
      key: "moveNode",
      value: function moveNode(movedNode, targetNode, position) {
        if (!movedNode.parent || movedNode.isParentOf(targetNode)) {
          // - Node is parent of target node
          // - Or, parent is empty
          return false;
        } else {
          movedNode.parent.doRemoveChild(movedNode);
          switch (position) {
            case Position.After:
              {
                if (targetNode.parent) {
                  targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode) + 1);
                  return true;
                }
                return false;
              }
            case Position.Before:
              {
                if (targetNode.parent) {
                  targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode));
                  return true;
                }
                return false;
              }
            case Position.Inside:
              {
                // move inside as first child
                targetNode.addChildAtPosition(movedNode, 0);
                return true;
              }
            default:
              return false;
          }
        }
      }

      /*
      Get the tree as data.
      */
    }, {
      key: "getData",
      value: function getData() {
        var includeParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var getDataFromNodes = function getDataFromNodes(nodes) {
          return nodes.map(function (node) {
            var tmpNode = {};
            for (var k in node) {
              if (["parent", "children", "element", "idMapping", "load_on_demand", "nodeClass", "tree", "isEmptyFolder"].indexOf(k) === -1 && Object.prototype.hasOwnProperty.call(node, k)) {
                var v = node[k];
                tmpNode[k] = v;
              }
            }
            if (node.hasChildren()) {
              tmpNode["children"] = getDataFromNodes(node.children);
            }
            return tmpNode;
          });
        };
        if (includeParent) {
          return getDataFromNodes([this]);
        } else {
          return getDataFromNodes(this.children);
        }
      }
    }, {
      key: "getNodeByName",
      value: function getNodeByName(name) {
        return this.getNodeByCallback(function (node) {
          return node.name === name;
        });
      }
    }, {
      key: "getNodeByNameMustExist",
      value: function getNodeByNameMustExist(name) {
        var node = this.getNodeByCallback(function (n) {
          return n.name === name;
        });
        if (!node) {
          throw "Node with name ".concat(name, " not found");
        }
        return node;
      }
    }, {
      key: "getNodeByCallback",
      value: function getNodeByCallback(callback) {
        var result = null;
        this.iterate(function (node) {
          if (result) {
            return false;
          } else if (callback(node)) {
            result = node;
            return false;
          } else {
            return true;
          }
        });
        return result;
      }
    }, {
      key: "addAfter",
      value: function addAfter(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          var _node2 = this.createNode(nodeInfo);
          var childIndex = this.parent.getChildIndex(this);
          this.parent.addChildAtPosition(_node2, childIndex + 1);
          if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
            _node2.loadFromData(nodeInfo.children);
          }
          return _node2;
        }
      }
    }, {
      key: "addBefore",
      value: function addBefore(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          var _node3 = this.createNode(nodeInfo);
          var childIndex = this.parent.getChildIndex(this);
          this.parent.addChildAtPosition(_node3, childIndex);
          if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
            _node3.loadFromData(nodeInfo.children);
          }
          return _node3;
        }
      }
    }, {
      key: "addParent",
      value: function addParent(nodeInfo) {
        if (!this.parent) {
          return null;
        } else {
          var newParent = this.createNode(nodeInfo);
          if (this.tree) {
            newParent.setParent(this.tree);
          }
          var originalParent = this.parent;
          var _iterator3 = _createForOfIteratorHelper(originalParent.children),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var child = _step3.value;
              newParent.addChild(child);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          originalParent.children = [];
          originalParent.addChild(newParent);
          return newParent;
        }
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
          this.parent = null;
        }
      }
    }, {
      key: "append",
      value: function append(nodeInfo) {
        var node = this.createNode(nodeInfo);
        this.addChild(node);
        if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
          node.loadFromData(nodeInfo.children);
        }
        return node;
      }
    }, {
      key: "prepend",
      value: function prepend(nodeInfo) {
        var node = this.createNode(nodeInfo);
        this.addChildAtPosition(node, 0);
        if (isNodeRecordWithChildren(nodeInfo) && nodeInfo.children.length) {
          node.loadFromData(nodeInfo.children);
        }
        return node;
      }
    }, {
      key: "isParentOf",
      value: function isParentOf(node) {
        var parent = node.parent;
        while (parent) {
          if (parent === this) {
            return true;
          }
          parent = parent.parent;
        }
        return false;
      }
    }, {
      key: "getLevel",
      value: function getLevel() {
        var level = 0;
        var node = this; // eslint-disable-line @typescript-eslint/no-this-alias

        while (node.parent) {
          level += 1;
          node = node.parent;
        }
        return level;
      }
    }, {
      key: "getNodeById",
      value: function getNodeById(nodeId) {
        return this.idMapping.get(nodeId) || null;
      }
    }, {
      key: "addNodeToIndex",
      value: function addNodeToIndex(node) {
        if (node.id != null) {
          this.idMapping.set(node.id, node);
        }
      }
    }, {
      key: "removeNodeFromIndex",
      value: function removeNodeFromIndex(node) {
        if (node.id != null) {
          this.idMapping["delete"](node.id);
        }
      }
    }, {
      key: "removeChildren",
      value: function removeChildren() {
        var _this = this;
        this.iterate(function (child) {
          var _this$tree;
          (_this$tree = _this.tree) === null || _this$tree === void 0 ? void 0 : _this$tree.removeNodeFromIndex(child);
          return true;
        });
        this.children = [];
      }
    }, {
      key: "getPreviousSibling",
      value: function getPreviousSibling() {
        if (!this.parent) {
          return null;
        } else {
          var previousIndex = this.parent.getChildIndex(this) - 1;
          if (previousIndex >= 0) {
            return this.parent.children[previousIndex];
          } else {
            return null;
          }
        }
      }
    }, {
      key: "getNextSibling",
      value: function getNextSibling() {
        if (!this.parent) {
          return null;
        } else {
          var nextIndex = this.parent.getChildIndex(this) + 1;
          if (nextIndex < this.parent.children.length) {
            return this.parent.children[nextIndex];
          } else {
            return null;
          }
        }
      }
    }, {
      key: "getNodesByProperty",
      value: function getNodesByProperty(key, value) {
        return this.filter(function (node) {
          return node[key] === value;
        });
      }
    }, {
      key: "filter",
      value: function filter(f) {
        var result = [];
        this.iterate(function (node) {
          if (f(node)) {
            result.push(node);
          }
          return true;
        });
        return result;
      }
    }, {
      key: "getNextNode",
      value: function getNextNode() {
        var includeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (includeChildren && this.hasChildren()) {
          return this.children[0];
        } else if (!this.parent) {
          return null;
        } else {
          var nextSibling = this.getNextSibling();
          if (nextSibling) {
            return nextSibling;
          } else {
            return this.parent.getNextNode(false);
          }
        }
      }
    }, {
      key: "getNextVisibleNode",
      value: function getNextVisibleNode() {
        if (this.hasChildren() && this.is_open) {
          // First child
          return this.children[0];
        } else {
          if (!this.parent) {
            return null;
          } else {
            var nextSibling = this.getNextSibling();
            if (nextSibling) {
              // Next sibling
              return nextSibling;
            } else {
              // Next node of parent
              return this.parent.getNextNode(false);
            }
          }
        }
      }
    }, {
      key: "getPreviousNode",
      value: function getPreviousNode() {
        if (!this.parent) {
          return null;
        } else {
          var previousSibling = this.getPreviousSibling();
          if (!previousSibling) {
            return this.getParent();
          } else if (previousSibling.hasChildren()) {
            return previousSibling.getLastChild();
          } else {
            return previousSibling;
          }
        }
      }
    }, {
      key: "getPreviousVisibleNode",
      value: function getPreviousVisibleNode() {
        if (!this.parent) {
          return null;
        } else {
          var previousSibling = this.getPreviousSibling();
          if (!previousSibling) {
            return this.getParent();
          } else if (!previousSibling.hasChildren() || !previousSibling.is_open) {
            // Previous sibling
            return previousSibling;
          } else {
            // Last child of previous sibling
            return previousSibling.getLastChild();
          }
        }
      }
    }, {
      key: "getParent",
      value: function getParent() {
        // Return parent except if it is the root node
        if (!this.parent) {
          return null;
        } else if (!this.parent.parent) {
          // Root node -> null
          return null;
        } else {
          return this.parent;
        }
      }
    }, {
      key: "getLastChild",
      value: function getLastChild() {
        if (!this.hasChildren()) {
          return null;
        } else {
          var lastChild = this.children[this.children.length - 1];
          if (!(lastChild.hasChildren() && lastChild.is_open)) {
            return lastChild;
          } else {
            return lastChild.getLastChild();
          }
        }
      }

      // Init Node from data without making it the root of the tree
    }, {
      key: "initFromData",
      value: function initFromData(data) {
        var _this2 = this;
        var addNode = function addNode(nodeData) {
          _this2.setData(nodeData);
          if (isNodeRecordWithChildren(nodeData) && nodeData.children.length) {
            addChildren(nodeData.children);
          }
        };
        var addChildren = function addChildren(childrenData) {
          var _iterator4 = _createForOfIteratorHelper(childrenData),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var child = _step4.value;
              var _node4 = _this2.createNode();
              _node4.initFromData(child);
              _this2.addChild(_node4);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        };
        addNode(data);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        var _this$tree2;
        this.parent = parent;
        this.tree = parent.tree;
        (_this$tree2 = this.tree) === null || _this$tree2 === void 0 ? void 0 : _this$tree2.addNodeToIndex(this);
      }
    }, {
      key: "doRemoveChild",
      value: function doRemoveChild(node) {
        var _this$tree3;
        this.children.splice(this.getChildIndex(node), 1);
        (_this$tree3 = this.tree) === null || _this$tree3 === void 0 ? void 0 : _this$tree3.removeNodeFromIndex(node);
      }
    }, {
      key: "getNodeClass",
      value: function getNodeClass() {
        var _this$tree4;
        return this.nodeClass || (this === null || this === void 0 ? void 0 : (_this$tree4 = this.tree) === null || _this$tree4 === void 0 ? void 0 : _this$tree4.nodeClass) || Node;
      }
    }, {
      key: "createNode",
      value: function createNode(nodeData) {
        var nodeClass = this.getNodeClass();
        return new nodeClass(nodeData);
      }
    }]);
    return Node;
  }();

  var DragAndDropHandler = /*#__PURE__*/function () {
    function DragAndDropHandler(treeWidget) {
      _classCallCheck(this, DragAndDropHandler);
      _defineProperty(this, "hitAreas", void 0);
      _defineProperty(this, "isDragging", void 0);
      _defineProperty(this, "currentItem", void 0);
      _defineProperty(this, "hoveredArea", void 0);
      _defineProperty(this, "positionInfo", void 0);
      _defineProperty(this, "treeWidget", void 0);
      _defineProperty(this, "dragElement", void 0);
      _defineProperty(this, "previousGhost", void 0);
      _defineProperty(this, "openFolderTimer", void 0);
      this.treeWidget = treeWidget;
      this.hoveredArea = null;
      this.hitAreas = [];
      this.isDragging = false;
      this.currentItem = null;
      this.positionInfo = null;
    }
    _createClass(DragAndDropHandler, [{
      key: "mouseCapture",
      value: function mouseCapture(positionInfo) {
        var $element = jQuery(positionInfo.target);
        if (!this.mustCaptureElement($element)) {
          return null;
        }
        if (this.treeWidget.options.onIsMoveHandle && !this.treeWidget.options.onIsMoveHandle($element)) {
          return null;
        }
        var nodeElement = this.treeWidget._getNodeElement($element);
        if (nodeElement && this.treeWidget.options.onCanMove) {
          if (!this.treeWidget.options.onCanMove(nodeElement.node)) {
            nodeElement = null;
          }
        }
        this.currentItem = nodeElement;
        return this.currentItem != null;
      }
    }, {
      key: "mouseStart",
      value: function mouseStart(positionInfo) {
        var _this$treeWidget$opti;
        if (!this.currentItem || positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
          return false;
        }
        this.refresh();
        var offset = jQuery(positionInfo.target).offset();
        var left = offset ? offset.left : 0;
        var top = offset ? offset.top : 0;
        var node = this.currentItem.node;
        this.dragElement = new DragElement(node.name, positionInfo.pageX - left, positionInfo.pageY - top, this.treeWidget.element, (_this$treeWidget$opti = this.treeWidget.options.autoEscape) !== null && _this$treeWidget$opti !== void 0 ? _this$treeWidget$opti : true);
        this.isDragging = true;
        this.positionInfo = positionInfo;
        this.currentItem.$element.addClass("jqtree-moving");
        return true;
      }
    }, {
      key: "mouseDrag",
      value: function mouseDrag(positionInfo) {
        if (!this.currentItem || !this.dragElement || positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
          return false;
        }
        this.dragElement.move(positionInfo.pageX, positionInfo.pageY);
        this.positionInfo = positionInfo;
        var area = this.findHoveredArea(positionInfo.pageX, positionInfo.pageY);
        if (area && this.canMoveToArea(area)) {
          if (!area.node.isFolder()) {
            this.stopOpenFolderTimer();
          }
          if (this.hoveredArea !== area) {
            this.hoveredArea = area;

            // If this is a closed folder, start timer to open it
            if (this.mustOpenFolderTimer(area)) {
              this.startOpenFolderTimer(area.node);
            } else {
              this.stopOpenFolderTimer();
            }
            this.updateDropHint();
          }
        } else {
          this.removeDropHint();
          this.stopOpenFolderTimer();
          this.hoveredArea = area;
        }
        if (!area) {
          if (this.treeWidget.options.onDragMove) {
            this.treeWidget.options.onDragMove(this.currentItem.node, positionInfo.originalEvent);
          }
        }
        return true;
      }
    }, {
      key: "mouseStop",
      value: function mouseStop(positionInfo) {
        this.moveItem(positionInfo);
        this.clear();
        this.removeHover();
        this.removeDropHint();
        this.removeHitAreas();
        var currentItem = this.currentItem;
        if (this.currentItem) {
          this.currentItem.$element.removeClass("jqtree-moving");
          this.currentItem = null;
        }
        this.isDragging = false;
        this.positionInfo = null;
        if (!this.hoveredArea && currentItem) {
          if (this.treeWidget.options.onDragStop) {
            this.treeWidget.options.onDragStop(currentItem.node, positionInfo.originalEvent);
          }
        }
        return false;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.removeHitAreas();
        if (this.currentItem) {
          this.generateHitAreas();
          this.currentItem = this.treeWidget._getNodeElementForNode(this.currentItem.node);
          if (this.isDragging) {
            this.currentItem.$element.addClass("jqtree-moving");
          }
        }
      }
    }, {
      key: "generateHitAreas",
      value: function generateHitAreas() {
        if (!this.currentItem) {
          this.hitAreas = [];
        } else {
          var hitAreasGenerator = new HitAreasGenerator(this.treeWidget.tree, this.currentItem.node, this.getTreeDimensions().bottom);
          this.hitAreas = hitAreasGenerator.generate();
        }
      }
    }, {
      key: "mustCaptureElement",
      value: function mustCaptureElement($element) {
        return !$element.is("input,select,textarea");
      }
    }, {
      key: "canMoveToArea",
      value: function canMoveToArea(area) {
        if (!this.treeWidget.options.onCanMoveTo) {
          return true;
        }
        if (!this.currentItem) {
          return false;
        }
        var positionName = getPositionName(area.position);
        return this.treeWidget.options.onCanMoveTo(this.currentItem.node, area.node, positionName);
      }
    }, {
      key: "removeHitAreas",
      value: function removeHitAreas() {
        this.hitAreas = [];
      }
    }, {
      key: "clear",
      value: function clear() {
        if (this.dragElement) {
          this.dragElement.remove();
          this.dragElement = null;
        }
      }
    }, {
      key: "removeDropHint",
      value: function removeDropHint() {
        if (this.previousGhost) {
          this.previousGhost.remove();
        }
      }
    }, {
      key: "removeHover",
      value: function removeHover() {
        this.hoveredArea = null;
      }
    }, {
      key: "findHoveredArea",
      value: function findHoveredArea(x, y) {
        var dimensions = this.getTreeDimensions();
        if (x < dimensions.left || y < dimensions.top || x > dimensions.right || y > dimensions.bottom) {
          return null;
        }
        var low = 0;
        var high = this.hitAreas.length;
        while (low < high) {
          var mid = low + high >> 1;
          var area = this.hitAreas[mid];
          if (y < area.top) {
            high = mid;
          } else if (y > area.bottom) {
            low = mid + 1;
          } else {
            return area;
          }
        }
        return null;
      }
    }, {
      key: "mustOpenFolderTimer",
      value: function mustOpenFolderTimer(area) {
        var node = area.node;
        return node.isFolder() && !node.is_open && area.position === Position.Inside;
      }
    }, {
      key: "updateDropHint",
      value: function updateDropHint() {
        if (!this.hoveredArea) {
          return;
        }

        // remove previous drop hint
        this.removeDropHint();

        // add new drop hint
        var nodeElement = this.treeWidget._getNodeElementForNode(this.hoveredArea.node);
        this.previousGhost = nodeElement.addDropHint(this.hoveredArea.position);
      }
    }, {
      key: "startOpenFolderTimer",
      value: function startOpenFolderTimer(folder) {
        var _this = this;
        var openFolder = function openFolder() {
          _this.treeWidget._openNode(folder, _this.treeWidget.options.slide, function () {
            _this.refresh();
            _this.updateDropHint();
          });
        };
        this.stopOpenFolderTimer();
        var openFolderDelay = this.treeWidget.options.openFolderDelay;
        if (openFolderDelay !== false) {
          this.openFolderTimer = window.setTimeout(openFolder, openFolderDelay);
        }
      }
    }, {
      key: "stopOpenFolderTimer",
      value: function stopOpenFolderTimer() {
        if (this.openFolderTimer) {
          clearTimeout(this.openFolderTimer);
          this.openFolderTimer = null;
        }
      }
    }, {
      key: "moveItem",
      value: function moveItem(positionInfo) {
        var _this2 = this;
        if (this.currentItem && this.hoveredArea && this.hoveredArea.position !== Position.None && this.canMoveToArea(this.hoveredArea)) {
          var movedNode = this.currentItem.node;
          var targetNode = this.hoveredArea.node;
          var position = this.hoveredArea.position;
          var previousParent = movedNode.parent;
          if (position === Position.Inside) {
            this.hoveredArea.node.is_open = true;
          }
          var doMove = function doMove() {
            _this2.treeWidget.tree.moveNode(movedNode, targetNode, position);
            _this2.treeWidget.element.empty();
            _this2.treeWidget._refreshElements(null);
          };
          var event = this.treeWidget._triggerEvent("tree.move", {
            move_info: {
              moved_node: movedNode,
              target_node: targetNode,
              position: getPositionName(position),
              previous_parent: previousParent,
              do_move: doMove,
              original_event: positionInfo.originalEvent
            }
          });
          if (!event.isDefaultPrevented()) {
            doMove();
          }
        }
      }
    }, {
      key: "getTreeDimensions",
      value: function getTreeDimensions() {
        // Return the dimensions of the tree. Add a margin to the bottom to allow
        // to drag-and-drop after the last element.
        var offset = this.treeWidget.element.offset();
        if (!offset) {
          return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          };
        } else {
          var el = this.treeWidget.element;
          var width = el.width() || 0;
          var height = el.height() || 0;
          var left = offset.left + this.treeWidget._getScrollLeft();
          return {
            left: left,
            top: offset.top,
            right: left + width,
            bottom: offset.top + height + 16
          };
        }
      }
    }]);
    return DragAndDropHandler;
  }();
  var VisibleNodeIterator = /*#__PURE__*/function () {
    function VisibleNodeIterator(tree) {
      _classCallCheck(this, VisibleNodeIterator);
      _defineProperty(this, "tree", void 0);
      this.tree = tree;
    }
    _createClass(VisibleNodeIterator, [{
      key: "iterate",
      value: function iterate() {
        var _this3 = this;
        var isFirstNode = true;
        var _iterateNode = function _iterateNode(node, nextNode) {
          var mustIterateInside = (node.is_open || !node.element) && node.hasChildren();
          var $element = null;
          if (node.element) {
            $element = jQuery(node.element);
            if (!$element.is(":visible")) {
              return;
            }
            if (isFirstNode) {
              _this3.handleFirstNode(node);
              isFirstNode = false;
            }
            if (!node.hasChildren()) {
              _this3.handleNode(node, nextNode, $element);
            } else if (node.is_open) {
              if (!_this3.handleOpenFolder(node, $element)) {
                mustIterateInside = false;
              }
            } else {
              _this3.handleClosedFolder(node, nextNode, $element);
            }
          }
          if (mustIterateInside) {
            var childrenLength = node.children.length;
            node.children.forEach(function (_, i) {
              if (i === childrenLength - 1) {
                _iterateNode(node.children[i], null);
              } else {
                _iterateNode(node.children[i], node.children[i + 1]);
              }
            });
            if (node.is_open && $element) {
              _this3.handleAfterOpenFolder(node, nextNode);
            }
          }
        };
        _iterateNode(this.tree, null);
      }
    }]);
    return VisibleNodeIterator;
  }();
  var HitAreasGenerator = /*#__PURE__*/function (_VisibleNodeIterator) {
    _inherits(HitAreasGenerator, _VisibleNodeIterator);
    var _super = _createSuper(HitAreasGenerator);
    function HitAreasGenerator(tree, currentNode, treeBottom) {
      var _this4;
      _classCallCheck(this, HitAreasGenerator);
      _this4 = _super.call(this, tree);
      _defineProperty(_assertThisInitialized(_this4), "currentNode", void 0);
      _defineProperty(_assertThisInitialized(_this4), "treeBottom", void 0);
      _defineProperty(_assertThisInitialized(_this4), "positions", void 0);
      _defineProperty(_assertThisInitialized(_this4), "lastTop", void 0);
      _this4.currentNode = currentNode;
      _this4.treeBottom = treeBottom;
      return _this4;
    }
    _createClass(HitAreasGenerator, [{
      key: "generate",
      value: function generate() {
        this.positions = [];
        this.lastTop = 0;
        this.iterate();
        return this.generateHitAreas(this.positions);
      }
    }, {
      key: "generateHitAreas",
      value: function generateHitAreas(positions) {
        var previousTop = -1;
        var group = [];
        var hitAreas = [];
        var _iterator = _createForOfIteratorHelper(positions),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var position = _step.value;
            if (position.top !== previousTop && group.length) {
              if (group.length) {
                this.generateHitAreasForGroup(hitAreas, group, previousTop, position.top);
              }
              previousTop = position.top;
              group = [];
            }
            group.push(position);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.generateHitAreasForGroup(hitAreas, group, previousTop, this.treeBottom);
        return hitAreas;
      }
    }, {
      key: "handleOpenFolder",
      value: function handleOpenFolder(node, $element) {
        if (node === this.currentNode) {
          // Cannot move inside current item
          // Stop iterating
          return false;
        }

        // Cannot move before current item
        if (node.children[0] !== this.currentNode) {
          this.addPosition(node, Position.Inside, this.getTop($element));
        }

        // Continue iterating
        return true;
      }
    }, {
      key: "handleClosedFolder",
      value: function handleClosedFolder(node, nextNode, $element) {
        var top = this.getTop($element);
        if (node === this.currentNode) {
          // Cannot move after current item
          this.addPosition(node, Position.None, top);
        } else {
          this.addPosition(node, Position.Inside, top);

          // Cannot move before current item
          if (nextNode !== this.currentNode) {
            this.addPosition(node, Position.After, top);
          }
        }
      }
    }, {
      key: "handleFirstNode",
      value: function handleFirstNode(node) {
        if (node !== this.currentNode) {
          this.addPosition(node, Position.Before, this.getTop(jQuery(node.element)));
        }
      }
    }, {
      key: "handleAfterOpenFolder",
      value: function handleAfterOpenFolder(node, nextNode) {
        if (node === this.currentNode || nextNode === this.currentNode) {
          // Cannot move before or after current item
          this.addPosition(node, Position.None, this.lastTop);
        } else {
          this.addPosition(node, Position.After, this.lastTop);
        }
      }
    }, {
      key: "handleNode",
      value: function handleNode(node, nextNode, $element) {
        var top = this.getTop($element);
        if (node === this.currentNode) {
          // Cannot move inside current item
          this.addPosition(node, Position.None, top);
        } else {
          this.addPosition(node, Position.Inside, top);
        }
        if (nextNode === this.currentNode || node === this.currentNode) {
          // Cannot move before or after current item
          this.addPosition(node, Position.None, top);
        } else {
          this.addPosition(node, Position.After, top);
        }
      }
    }, {
      key: "getTop",
      value: function getTop($element) {
        var offset = $element.offset();
        return offset ? offset.top : 0;
      }
    }, {
      key: "addPosition",
      value: function addPosition(node, position, top) {
        var area = {
          top: top,
          bottom: 0,
          node: node,
          position: position
        };
        this.positions.push(area);
        this.lastTop = top;
      }
    }, {
      key: "generateHitAreasForGroup",
      value: function generateHitAreasForGroup(hitAreas, positionsInGroup, top, bottom) {
        // limit positions in group
        var positionCount = Math.min(positionsInGroup.length, 4);
        var areaHeight = Math.round((bottom - top) / positionCount);
        var areaTop = top;
        var i = 0;
        while (i < positionCount) {
          var position = positionsInGroup[i];
          hitAreas.push({
            top: areaTop,
            bottom: areaTop + areaHeight,
            node: position.node,
            position: position.position
          });
          areaTop += areaHeight;
          i += 1;
        }
      }
    }]);
    return HitAreasGenerator;
  }(VisibleNodeIterator);
  var DragElement = /*#__PURE__*/function () {
    function DragElement(nodeName, offsetX, offsetY, $tree, autoEscape) {
      _classCallCheck(this, DragElement);
      _defineProperty(this, "offsetX", void 0);
      _defineProperty(this, "offsetY", void 0);
      _defineProperty(this, "$element", void 0);
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.$element = jQuery("<span>").addClass("jqtree-title jqtree-dragging");
      if (autoEscape) {
        this.$element.text(nodeName);
      } else {
        this.$element.html(nodeName);
      }
      this.$element.css("position", "absolute");
      $tree.append(this.$element);
    }
    _createClass(DragElement, [{
      key: "move",
      value: function move(pageX, pageY) {
        this.$element.offset({
          left: pageX - this.offsetX,
          top: pageY - this.offsetY
        });
      }
    }, {
      key: "remove",
      value: function remove() {
        this.$element.remove();
      }
    }]);
    return DragElement;
  }();

  var isInt = function isInt(n) {
    return typeof n === "number" && n % 1 === 0;
  };
  var isFunction = function isFunction(v) {
    return typeof v === "function";
  };
  var getBoolString = function getBoolString(value) {
    return value ? "true" : "false";
  };

  var ElementsRenderer = /*#__PURE__*/function () {
    function ElementsRenderer(treeWidget) {
      _classCallCheck(this, ElementsRenderer);
      _defineProperty(this, "openedIconElement", void 0);
      _defineProperty(this, "closedIconElement", void 0);
      _defineProperty(this, "treeWidget", void 0);
      this.treeWidget = treeWidget;
      this.openedIconElement = this.createButtonElement(treeWidget.options.openedIcon || "+");
      this.closedIconElement = this.createButtonElement(treeWidget.options.closedIcon || "-");
    }
    _createClass(ElementsRenderer, [{
      key: "render",
      value: function render(fromNode) {
        if (fromNode && fromNode.parent) {
          this.renderFromNode(fromNode);
        } else {
          this.renderFromRoot();
        }
      }
    }, {
      key: "renderFromRoot",
      value: function renderFromRoot() {
        var $element = this.treeWidget.element;
        $element.empty();
        this.createDomElements($element[0], this.treeWidget.tree.children, true, 1);
      }
    }, {
      key: "renderFromNode",
      value: function renderFromNode(node) {
        // remember current li
        var $previousLi = jQuery(node.element);

        // create element
        var li = this.createLi(node, node.getLevel());
        this.attachNodeData(node, li);

        // add element to dom
        $previousLi.after(li);

        // remove previous li
        $previousLi.remove();

        // create children
        if (node.children) {
          this.createDomElements(li, node.children, false, node.getLevel() + 1);
        }
      }
    }, {
      key: "createDomElements",
      value: function createDomElements(element, children, isRootNode, level) {
        var ul = this.createUl(isRootNode);
        element.appendChild(ul);
        var _iterator = _createForOfIteratorHelper(children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            var li = this.createLi(child, level);
            ul.appendChild(li);
            this.attachNodeData(child, li);
            if (child.hasChildren()) {
              this.createDomElements(li, child.children, false, level + 1);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "attachNodeData",
      value: function attachNodeData(node, li) {
        node.element = li;
        jQuery(li).data("node", node);
      }
    }, {
      key: "createUl",
      value: function createUl(isRootNode) {
        var classString;
        var role;
        if (!isRootNode) {
          classString = "";
          role = "group";
        } else {
          classString = "jqtree-tree";
          role = "tree";
          if (this.treeWidget.options.rtl) {
            classString += " jqtree-rtl";
          }
        }
        if (this.treeWidget.options.dragAndDrop) {
          classString += " jqtree-dnd";
        }
        var ul = document.createElement("ul");
        ul.className = "jqtree_common ".concat(classString);
        ul.setAttribute("role", role);
        return ul;
      }
    }, {
      key: "createLi",
      value: function createLi(node, level) {
        var isSelected = Boolean(this.treeWidget.selectNodeHandler.isNodeSelected(node));
        var mustShowFolder = node.isFolder() || node.isEmptyFolder && this.treeWidget.options.showEmptyFolder;
        var li = mustShowFolder ? this.createFolderLi(node, level, isSelected) : this.createNodeLi(node, level, isSelected);
        if (this.treeWidget.options.onCreateLi) {
          this.treeWidget.options.onCreateLi(node, jQuery(li), isSelected);
        }
        return li;
      }
    }, {
      key: "createFolderLi",
      value: function createFolderLi(node, level, isSelected) {
        var buttonClasses = this.getButtonClasses(node);
        var folderClasses = this.getFolderClasses(node, isSelected);
        var iconElement = node.is_open ? this.openedIconElement : this.closedIconElement;

        // li
        var li = document.createElement("li");
        li.className = "jqtree_common ".concat(folderClasses);
        li.setAttribute("role", "presentation");

        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);

        // button link
        var buttonLink = document.createElement("a");
        buttonLink.className = buttonClasses;
        buttonLink.appendChild(iconElement.cloneNode(true));
        buttonLink.setAttribute("role", "presentation");
        buttonLink.setAttribute("aria-hidden", "true");
        if (this.treeWidget.options.buttonLeft) {
          div.appendChild(buttonLink);
        }

        // title span
        div.appendChild(this.createTitleSpan(node.name, level, isSelected, node.is_open, true));
        if (!this.treeWidget.options.buttonLeft) {
          div.appendChild(buttonLink);
        }
        return li;
      }
    }, {
      key: "createNodeLi",
      value: function createNodeLi(node, level, isSelected) {
        var liClasses = ["jqtree_common"];
        if (isSelected) {
          liClasses.push("jqtree-selected");
        }
        var classString = liClasses.join(" ");

        // li
        var li = document.createElement("li");
        li.className = classString;
        li.setAttribute("role", "presentation");

        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);

        // title span
        div.appendChild(this.createTitleSpan(node.name, level, isSelected, node.is_open, false));
        return li;
      }
    }, {
      key: "createTitleSpan",
      value: function createTitleSpan(nodeName, level, isSelected, isOpen, isFolder) {
        var titleSpan = document.createElement("span");
        var classes = "jqtree-title jqtree_common";
        if (isFolder) {
          classes += " jqtree-title-folder";
        }
        classes += " jqtree-title-button-".concat(this.treeWidget.options.buttonLeft ? "left" : "right");
        titleSpan.className = classes;
        titleSpan.setAttribute("role", "treeitem");
        titleSpan.setAttribute("aria-level", "".concat(level));
        titleSpan.setAttribute("aria-selected", getBoolString(isSelected));
        titleSpan.setAttribute("aria-expanded", getBoolString(isOpen));
        if (isSelected) {
          var tabIndex = this.treeWidget.options.tabIndex;
          if (tabIndex !== undefined) {
            titleSpan.setAttribute("tabindex", "".concat(tabIndex));
          }
        }
        if (this.treeWidget.options.autoEscape) {
          titleSpan.textContent = nodeName;
        } else {
          titleSpan.innerHTML = nodeName;
        }
        return titleSpan;
      }
    }, {
      key: "getButtonClasses",
      value: function getButtonClasses(node) {
        var classes = ["jqtree-toggler", "jqtree_common"];
        if (!node.is_open) {
          classes.push("jqtree-closed");
        }
        if (this.treeWidget.options.buttonLeft) {
          classes.push("jqtree-toggler-left");
        } else {
          classes.push("jqtree-toggler-right");
        }
        return classes.join(" ");
      }
    }, {
      key: "getFolderClasses",
      value: function getFolderClasses(node, isSelected) {
        var classes = ["jqtree-folder"];
        if (!node.is_open) {
          classes.push("jqtree-closed");
        }
        if (isSelected) {
          classes.push("jqtree-selected");
        }
        if (node.is_loading) {
          classes.push("jqtree-loading");
        }
        return classes.join(" ");
      }
    }, {
      key: "createButtonElement",
      value: function createButtonElement(value) {
        if (typeof value === "string") {
          // convert value to html
          var div = document.createElement("div");
          div.innerHTML = value;
          return document.createTextNode(div.innerHTML);
        } else {
          return jQuery(value)[0];
        }
      }
    }]);
    return ElementsRenderer;
  }();

  var DataLoader = /*#__PURE__*/function () {
    function DataLoader(treeWidget) {
      _classCallCheck(this, DataLoader);
      _defineProperty(this, "treeWidget", void 0);
      this.treeWidget = treeWidget;
    }
    _createClass(DataLoader, [{
      key: "loadFromUrl",
      value: function loadFromUrl(urlInfo, parentNode, onFinished) {
        var _this = this;
        if (!urlInfo) {
          return;
        }
        var $el = this.getDomElement(parentNode);
        this.addLoadingClass($el);
        this.notifyLoading(true, parentNode, $el);
        var stopLoading = function stopLoading() {
          _this.removeLoadingClass($el);
          _this.notifyLoading(false, parentNode, $el);
        };
        var handleSuccess = function handleSuccess(data) {
          stopLoading();
          _this.treeWidget.loadData(_this.parseData(data), parentNode);
          if (onFinished && typeof onFinished === "function") {
            onFinished();
          }
        };
        var handleError = function handleError(jqXHR) {
          stopLoading();
          if (_this.treeWidget.options.onLoadFailed) {
            _this.treeWidget.options.onLoadFailed(jqXHR);
          }
        };
        this.submitRequest(urlInfo, handleSuccess, handleError);
      }
    }, {
      key: "addLoadingClass",
      value: function addLoadingClass($el) {
        if ($el) {
          $el.addClass("jqtree-loading");
        }
      }
    }, {
      key: "removeLoadingClass",
      value: function removeLoadingClass($el) {
        if ($el) {
          $el.removeClass("jqtree-loading");
        }
      }
    }, {
      key: "getDomElement",
      value: function getDomElement(parentNode) {
        if (parentNode) {
          return jQuery(parentNode.element);
        } else {
          return this.treeWidget.element;
        }
      }
    }, {
      key: "notifyLoading",
      value: function notifyLoading(isLoading, node, $el) {
        if (this.treeWidget.options.onLoading) {
          this.treeWidget.options.onLoading(isLoading, node, $el);
        }
        this.treeWidget._triggerEvent("tree.loading_data", {
          isLoading: isLoading,
          node: node,
          $el: $el
        });
      }
    }, {
      key: "submitRequest",
      value: function submitRequest(urlInfoInput, handleSuccess, handleError) {
        var _ajaxSettings$method;
        var urlInfo = typeof urlInfoInput === "string" ? {
          url: urlInfoInput
        } : urlInfoInput;
        var ajaxSettings = _objectSpread2({
          method: "GET",
          cache: false,
          dataType: "json",
          success: handleSuccess,
          error: handleError
        }, urlInfo);
        ajaxSettings.method = ((_ajaxSettings$method = ajaxSettings.method) === null || _ajaxSettings$method === void 0 ? void 0 : _ajaxSettings$method.toUpperCase()) || "GET";
        void jQuery.ajax(ajaxSettings);
      }
    }, {
      key: "parseData",
      value: function parseData(data) {
        var dataFilter = this.treeWidget.options.dataFilter;
        var getParsedData = function getParsedData() {
          if (typeof data === "string") {
            return JSON.parse(data);
          } else {
            return data;
          }
        };
        var parsedData = getParsedData();
        if (dataFilter) {
          return dataFilter(parsedData);
        } else {
          return parsedData;
        }
      }
    }]);
    return DataLoader;
  }();

  var KeyHandler = /*#__PURE__*/function () {
    function KeyHandler(treeWidget) {
      var _this = this;
      _classCallCheck(this, KeyHandler);
      _defineProperty(this, "treeWidget", void 0);
      _defineProperty(this, "handleKeyDown", function (e) {
        if (!_this.canHandleKeyboard()) {
          return true;
        }
        var selectedNode = _this.treeWidget.getSelectedNode();
        if (!selectedNode) {
          return true;
        }
        var key = e.which;
        switch (key) {
          case KeyHandler.DOWN:
            return _this.moveDown(selectedNode);
          case KeyHandler.UP:
            return _this.moveUp(selectedNode);
          case KeyHandler.RIGHT:
            return _this.moveRight(selectedNode);
          case KeyHandler.LEFT:
            return _this.moveLeft(selectedNode);
          default:
            return true;
        }
      });
      this.treeWidget = treeWidget;
      if (treeWidget.options.keyboardSupport) {
        jQuery(document).on("keydown.jqtree", this.handleKeyDown);
      }
    }
    _createClass(KeyHandler, [{
      key: "deinit",
      value: function deinit() {
        jQuery(document).off("keydown.jqtree");
      }
    }, {
      key: "moveDown",
      value: function moveDown(selectedNode) {
        return this.selectNode(selectedNode.getNextVisibleNode());
      }
    }, {
      key: "moveUp",
      value: function moveUp(selectedNode) {
        return this.selectNode(selectedNode.getPreviousVisibleNode());
      }
    }, {
      key: "moveRight",
      value: function moveRight(selectedNode) {
        if (!selectedNode.isFolder()) {
          return true;
        } else {
          // folder node
          if (selectedNode.is_open) {
            // Right moves to the first child of an open node
            return this.selectNode(selectedNode.getNextVisibleNode());
          } else {
            // Right expands a closed node
            this.treeWidget.openNode(selectedNode);
            return false;
          }
        }
      }
    }, {
      key: "moveLeft",
      value: function moveLeft(selectedNode) {
        if (selectedNode.isFolder() && selectedNode.is_open) {
          // Left on an open node closes the node
          this.treeWidget.closeNode(selectedNode);
          return false;
        } else {
          // Left on a closed or end node moves focus to the node's parent
          return this.selectNode(selectedNode.getParent());
        }
      }
    }, {
      key: "selectNode",
      value: function selectNode(node) {
        if (!node) {
          return true;
        } else {
          this.treeWidget.selectNode(node);
          if (!this.treeWidget.scrollHandler.isScrolledIntoView(jQuery(node.element).find(".jqtree-element"))) {
            this.treeWidget.scrollToNode(node);
          }
          return false;
        }
      }
    }, {
      key: "canHandleKeyboard",
      value: function canHandleKeyboard() {
        return (this.treeWidget.options.keyboardSupport || false) && this.treeWidget.selectNodeHandler.isFocusOnTree();
      }
    }]);
    return KeyHandler;
  }();
  _defineProperty(KeyHandler, "LEFT", 37);
  _defineProperty(KeyHandler, "UP", 38);
  _defineProperty(KeyHandler, "RIGHT", 39);
  _defineProperty(KeyHandler, "DOWN", 40);

  var _register = function register(widgetClass, widgetName) {
    var getDataKey = function getDataKey() {
      return "simple_widget_".concat(widgetName);
    };
    var getWidgetData = function getWidgetData(el, dataKey) {
      var widget = jQuery.data(el, dataKey);
      if (widget && widget instanceof SimpleWidget) {
        return widget;
      } else {
        return null;
      }
    };
    var createWidget = function createWidget($el, options) {
      var dataKey = getDataKey();
      var _iterator = _createForOfIteratorHelper($el.get()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          var existingWidget = getWidgetData(el, dataKey);
          if (!existingWidget) {
            var simpleWidgetClass = widgetClass;
            var widget = new simpleWidgetClass(el, options);
            if (!jQuery.data(el, dataKey)) {
              jQuery.data(el, dataKey, widget);
            }

            // Call init after setting data, so we can call methods
            widget.init();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return $el;
    };
    var destroyWidget = function destroyWidget($el) {
      var dataKey = getDataKey();
      var _iterator2 = _createForOfIteratorHelper($el.get()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;
          var widget = getWidgetData(el, dataKey);
          if (widget) {
            widget.destroy();
          }
          jQuery.removeData(el, dataKey);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
    var callFunction = function callFunction($el, functionName, args) {
      var result = null;
      var _iterator3 = _createForOfIteratorHelper($el.get()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var el = _step3.value;
          var widget = jQuery.data(el, getDataKey());
          if (widget && widget instanceof SimpleWidget) {
            var simpleWidget = widget;
            var widgetFunction = simpleWidget[functionName];
            if (widgetFunction && typeof widgetFunction === "function") {
              result = widgetFunction.apply(widget, args);
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return result;
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    jQuery.fn[widgetName] = function (argument1) {
      if (!argument1) {
        return createWidget(this, null);
      } else if (_typeof(argument1) === "object") {
        var options = argument1;
        return createWidget(this, options);
      } else if (typeof argument1 === "string" && argument1[0] !== "_") {
        var functionName = argument1;
        if (functionName === "destroy") {
          return destroyWidget(this);
        } else if (functionName === "get_widget_class") {
          return widgetClass;
        } else {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return callFunction(this, functionName, args);
        }
      }
    };
  };
  var SimpleWidget = /*#__PURE__*/function () {
    function SimpleWidget(el, options) {
      _classCallCheck(this, SimpleWidget);
      _defineProperty(this, "options", void 0);
      _defineProperty(this, "$el", void 0);
      this.$el = jQuery(el);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      var defaults = this.constructor["defaults"];
      this.options = _objectSpread2(_objectSpread2({}, defaults), options);
    }
    _createClass(SimpleWidget, [{
      key: "destroy",
      value: function destroy() {
        this.deinit();
      }
    }, {
      key: "init",
      value: function init() {
        //
      }
    }, {
      key: "deinit",
      value: function deinit() {
        //
      }
    }], [{
      key: "register",
      value: function register(widgetClass, widgetName) {
        _register(widgetClass, widgetName);
      }
    }]);
    return SimpleWidget;
  }();
  _defineProperty(SimpleWidget, "defaults", {});

  var getPositionInfoFromMouseEvent = function getPositionInfoFromMouseEvent(e) {
    return {
      pageX: e.pageX,
      pageY: e.pageY,
      target: e.target,
      originalEvent: e
    };
  };
  var getPositionInfoFromTouch = function getPositionInfoFromTouch(touch, e) {
    return {
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target,
      originalEvent: e
    };
  };
  var MouseWidget = /*#__PURE__*/function (_SimpleWidget) {
    _inherits(MouseWidget, _SimpleWidget);
    var _super = _createSuper(MouseWidget);
    function MouseWidget() {
      var _this;
      _classCallCheck(this, MouseWidget);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "isMouseStarted", void 0);
      _defineProperty(_assertThisInitialized(_this), "mouseDownInfo", void 0);
      _defineProperty(_assertThisInitialized(_this), "mouseDelayTimer", void 0);
      _defineProperty(_assertThisInitialized(_this), "isMouseDelayMet", void 0);
      _defineProperty(_assertThisInitialized(_this), "mouseDown", function (e) {
        // Left mouse button?
        if (e.button !== 0) {
          return;
        }
        var result = _this.handleMouseDown(getPositionInfoFromMouseEvent(e));
        if (result && e.cancelable) {
          e.preventDefault();
        }
      });
      _defineProperty(_assertThisInitialized(_this), "mouseMove", function (e) {
        _this.handleMouseMove(e, getPositionInfoFromMouseEvent(e));
      });
      _defineProperty(_assertThisInitialized(_this), "mouseUp", function (e) {
        _this.handleMouseUp(getPositionInfoFromMouseEvent(e));
      });
      _defineProperty(_assertThisInitialized(_this), "touchStart", function (e) {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        var touch = e.changedTouches[0];
        _this.handleMouseDown(getPositionInfoFromTouch(touch, e));
      });
      _defineProperty(_assertThisInitialized(_this), "touchMove", function (e) {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        var touch = e.changedTouches[0];
        _this.handleMouseMove(e, getPositionInfoFromTouch(touch, e));
      });
      _defineProperty(_assertThisInitialized(_this), "touchEnd", function (e) {
        if (!e) {
          return;
        }
        if (e.touches.length > 1) {
          return;
        }
        var touch = e.changedTouches[0];
        _this.handleMouseUp(getPositionInfoFromTouch(touch, e));
      });
      return _this;
    }
    _createClass(MouseWidget, [{
      key: "init",
      value: function init() {
        var element = this.$el.get(0);
        if (element) {
          element.addEventListener("mousedown", this.mouseDown, {
            passive: false
          });
          element.addEventListener("touchstart", this.touchStart, {
            passive: false
          });
        }
        this.isMouseStarted = false;
        this.mouseDelayTimer = null;
        this.isMouseDelayMet = false;
        this.mouseDownInfo = null;
      }
    }, {
      key: "deinit",
      value: function deinit() {
        var el = this.$el.get(0);
        if (el) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          el.removeEventListener("mousedown", this.mouseDown, {
            passive: false
          });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          el.removeEventListener("touchstart", this.touchStart, {
            passive: false
          });
        }
        this.removeMouseMoveEventListeners();
      }
    }, {
      key: "handleMouseDown",
      value: function handleMouseDown(positionInfo) {
        // We may have missed mouseup (out of window)
        if (this.isMouseStarted) {
          this.handleMouseUp(positionInfo);
        }
        this.mouseDownInfo = positionInfo;
        if (!this.mouseCapture(positionInfo)) {
          return false;
        }
        this.handleStartMouse();
        return true;
      }
    }, {
      key: "handleStartMouse",
      value: function handleStartMouse() {
        document.addEventListener("mousemove", this.mouseMove, {
          passive: false
        });
        document.addEventListener("touchmove", this.touchMove, {
          passive: false
        });
        document.addEventListener("mouseup", this.mouseUp, {
          passive: false
        });
        document.addEventListener("touchend", this.touchEnd, {
          passive: false
        });
        var mouseDelay = this.getMouseDelay();
        if (mouseDelay) {
          this.startMouseDelayTimer(mouseDelay);
        } else {
          this.isMouseDelayMet = true;
        }
      }
    }, {
      key: "startMouseDelayTimer",
      value: function startMouseDelayTimer(mouseDelay) {
        var _this2 = this;
        if (this.mouseDelayTimer) {
          clearTimeout(this.mouseDelayTimer);
        }
        this.mouseDelayTimer = window.setTimeout(function () {
          if (_this2.mouseDownInfo) {
            _this2.isMouseDelayMet = true;
          }
        }, mouseDelay);
        this.isMouseDelayMet = false;
      }
    }, {
      key: "handleMouseMove",
      value: function handleMouseMove(e, positionInfo) {
        if (this.isMouseStarted) {
          this.mouseDrag(positionInfo);
          if (e.cancelable) {
            e.preventDefault();
          }
          return;
        }
        if (!this.isMouseDelayMet) {
          return;
        }
        if (this.mouseDownInfo) {
          this.isMouseStarted = this.mouseStart(this.mouseDownInfo) !== false;
        }
        if (this.isMouseStarted) {
          this.mouseDrag(positionInfo);
          if (e.cancelable) {
            e.preventDefault();
          }
        } else {
          this.handleMouseUp(positionInfo);
        }
      }
    }, {
      key: "handleMouseUp",
      value: function handleMouseUp(positionInfo) {
        this.removeMouseMoveEventListeners();
        this.isMouseDelayMet = false;
        this.mouseDownInfo = null;
        if (this.isMouseStarted) {
          this.isMouseStarted = false;
          this.mouseStop(positionInfo);
        }
      }
    }, {
      key: "removeMouseMoveEventListeners",
      value: function removeMouseMoveEventListeners() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        document.removeEventListener("mousemove", this.mouseMove, {
          passive: false
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        document.removeEventListener("touchmove", this.touchMove, {
          passive: false
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        document.removeEventListener("mouseup", this.mouseUp, {
          passive: false
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        document.removeEventListener("touchend", this.touchEnd, {
          passive: false
        });
      }
    }]);
    return MouseWidget;
  }(SimpleWidget);

  var SaveStateHandler = /*#__PURE__*/function () {
    function SaveStateHandler(treeWidget) {
      _classCallCheck(this, SaveStateHandler);
      _defineProperty(this, "treeWidget", void 0);
      _defineProperty(this, "_supportsLocalStorage", void 0);
      this.treeWidget = treeWidget;
    }
    _createClass(SaveStateHandler, [{
      key: "saveState",
      value: function saveState() {
        var state = JSON.stringify(this.getState());
        if (this.treeWidget.options.onSetStateFromStorage) {
          this.treeWidget.options.onSetStateFromStorage(state);
        } else if (this.supportsLocalStorage()) {
          localStorage.setItem(this.getKeyName(), state);
        }
      }
    }, {
      key: "getStateFromStorage",
      value: function getStateFromStorage() {
        var jsonData = this.loadFromStorage();
        if (jsonData) {
          return this.parseState(jsonData);
        } else {
          return null;
        }
      }
    }, {
      key: "getState",
      value: function getState() {
        var _this = this;
        var getOpenNodeIds = function getOpenNodeIds() {
          var openNodes = [];
          _this.treeWidget.tree.iterate(function (node) {
            if (node.is_open && node.id && node.hasChildren()) {
              openNodes.push(node.id);
            }
            return true;
          });
          return openNodes;
        };
        var getSelectedNodeIds = function getSelectedNodeIds() {
          var selectedNodeIds = [];
          _this.treeWidget.getSelectedNodes().forEach(function (node) {
            if (node.id != null) {
              selectedNodeIds.push(node.id);
            }
          });
          return selectedNodeIds;
        };
        return {
          open_nodes: getOpenNodeIds(),
          selected_node: getSelectedNodeIds()
        };
      }

      /*
      Set initial state
      Don't handle nodes that are loaded on demand
       result: must load on demand
      */
    }, {
      key: "setInitialState",
      value: function setInitialState(state) {
        if (!state) {
          return false;
        } else {
          var mustLoadOnDemand = false;
          if (state.open_nodes) {
            mustLoadOnDemand = this.openInitialNodes(state.open_nodes);
          }
          if (state.selected_node) {
            this.resetSelection();
            this.selectInitialNodes(state.selected_node);
          }
          return mustLoadOnDemand;
        }
      }
    }, {
      key: "setInitialStateOnDemand",
      value: function setInitialStateOnDemand(state, cbFinished) {
        if (state) {
          this.doSetInitialStateOnDemand(state.open_nodes, state.selected_node, cbFinished);
        } else {
          cbFinished();
        }
      }
    }, {
      key: "getNodeIdToBeSelected",
      value: function getNodeIdToBeSelected() {
        var state = this.getStateFromStorage();
        if (state && state.selected_node) {
          return state.selected_node[0];
        } else {
          return null;
        }
      }
    }, {
      key: "parseState",
      value: function parseState(jsonData) {
        var state = JSON.parse(jsonData);

        // Check if selected_node is an int (instead of an array)
        if (state && state.selected_node && isInt(state.selected_node)) {
          // Convert to array
          state.selected_node = [state.selected_node];
        }
        return state;
      }
    }, {
      key: "loadFromStorage",
      value: function loadFromStorage() {
        if (this.treeWidget.options.onGetStateFromStorage) {
          return this.treeWidget.options.onGetStateFromStorage();
        } else if (this.supportsLocalStorage()) {
          return localStorage.getItem(this.getKeyName());
        } else {
          return null;
        }
      }
    }, {
      key: "openInitialNodes",
      value: function openInitialNodes(nodeIds) {
        var mustLoadOnDemand = false;
        var _iterator = _createForOfIteratorHelper(nodeIds),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var nodeId = _step.value;
            var node = this.treeWidget.getNodeById(nodeId);
            if (node) {
              if (!node.load_on_demand) {
                node.is_open = true;
              } else {
                mustLoadOnDemand = true;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return mustLoadOnDemand;
      }
    }, {
      key: "selectInitialNodes",
      value: function selectInitialNodes(nodeIds) {
        var selectCount = 0;
        var _iterator2 = _createForOfIteratorHelper(nodeIds),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var nodeId = _step2.value;
            var node = this.treeWidget.getNodeById(nodeId);
            if (node) {
              selectCount += 1;
              this.treeWidget.selectNodeHandler.addToSelection(node);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return selectCount !== 0;
      }
    }, {
      key: "resetSelection",
      value: function resetSelection() {
        var selectNodeHandler = this.treeWidget.selectNodeHandler;
        var selectedNodes = selectNodeHandler.getSelectedNodes();
        selectedNodes.forEach(function (node) {
          selectNodeHandler.removeFromSelection(node);
        });
      }
    }, {
      key: "doSetInitialStateOnDemand",
      value: function doSetInitialStateOnDemand(nodeIdsParam, selectedNodes, cbFinished) {
        var _this2 = this;
        var loadingCount = 0;
        var nodeIds = nodeIdsParam;
        var openNodes = function openNodes() {
          var newNodesIds = [];
          var _iterator3 = _createForOfIteratorHelper(nodeIds),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var nodeId = _step3.value;
              var node = _this2.treeWidget.getNodeById(nodeId);
              if (!node) {
                newNodesIds.push(nodeId);
              } else {
                if (!node.is_loading) {
                  if (node.load_on_demand) {
                    loadAndOpenNode(node);
                  } else {
                    _this2.treeWidget._openNode(node, false, null);
                  }
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          nodeIds = newNodesIds;
          if (_this2.selectInitialNodes(selectedNodes)) {
            _this2.treeWidget._refreshElements(null);
          }
          if (loadingCount === 0) {
            cbFinished();
          }
        };
        var loadAndOpenNode = function loadAndOpenNode(node) {
          loadingCount += 1;
          _this2.treeWidget._openNode(node, false, function () {
            loadingCount -= 1;
            openNodes();
          });
        };
        openNodes();
      }
    }, {
      key: "getKeyName",
      value: function getKeyName() {
        if (typeof this.treeWidget.options.saveState === "string") {
          return this.treeWidget.options.saveState;
        } else {
          return "tree";
        }
      }
    }, {
      key: "supportsLocalStorage",
      value: function supportsLocalStorage() {
        var testSupport = function testSupport() {
          // Is local storage supported?
          if (localStorage == null) {
            return false;
          } else {
            // Check if it's possible to store an item. Safari does not allow this in private browsing mode.
            try {
              var key = "_storage_test";
              sessionStorage.setItem(key, "value");
              sessionStorage.removeItem(key);
            } catch (error) {
              return false;
            }
            return true;
          }
        };
        if (this._supportsLocalStorage == null) {
          this._supportsLocalStorage = testSupport();
        }
        return this._supportsLocalStorage;
      }
    }]);
    return SaveStateHandler;
  }();

  var ScrollHandler = /*#__PURE__*/function () {
    function ScrollHandler(treeWidget) {
      _classCallCheck(this, ScrollHandler);
      _defineProperty(this, "treeWidget", void 0);
      _defineProperty(this, "previousTop", void 0);
      _defineProperty(this, "isInitialized", void 0);
      _defineProperty(this, "$scrollParent", void 0);
      _defineProperty(this, "scrollParentTop", void 0);
      this.treeWidget = treeWidget;
      this.previousTop = -1;
      this.isInitialized = false;
    }
    _createClass(ScrollHandler, [{
      key: "checkScrolling",
      value: function checkScrolling() {
        this.ensureInit();
        this.checkVerticalScrolling();
        this.checkHorizontalScrolling();
      }
    }, {
      key: "scrollToY",
      value: function scrollToY(top) {
        this.ensureInit();
        if (this.$scrollParent) {
          this.$scrollParent[0].scrollTop = top;
        } else {
          var offset = this.treeWidget.$el.offset();
          var treeTop = offset ? offset.top : 0;
          jQuery(document).scrollTop(top + treeTop);
        }
      }
    }, {
      key: "isScrolledIntoView",
      value: function isScrolledIntoView($element) {
        this.ensureInit();
        var elementBottom;
        var viewBottom;
        var elementTop;
        var viewTop;
        var elHeight = $element.height() || 0;
        if (this.$scrollParent) {
          viewTop = 0;
          viewBottom = this.$scrollParent.height() || 0;
          var offset = $element.offset();
          var originalTop = offset ? offset.top : 0;
          elementTop = originalTop - this.scrollParentTop;
          elementBottom = elementTop + elHeight;
        } else {
          viewTop = jQuery(window).scrollTop() || 0;
          var windowHeight = jQuery(window).height() || 0;
          viewBottom = viewTop + windowHeight;
          var _offset = $element.offset();
          elementTop = _offset ? _offset.top : 0;
          elementBottom = elementTop + elHeight;
        }
        return elementBottom <= viewBottom && elementTop >= viewTop;
      }
    }, {
      key: "getScrollLeft",
      value: function getScrollLeft() {
        if (!this.$scrollParent) {
          return 0;
        } else {
          return this.$scrollParent.scrollLeft() || 0;
        }
      }
    }, {
      key: "initScrollParent",
      value: function initScrollParent() {
        var _this = this;
        var getParentWithOverflow = function getParentWithOverflow() {
          var cssAttributes = ["overflow", "overflow-y"];
          var hasOverFlow = function hasOverFlow($el) {
            for (var _i = 0, _cssAttributes = cssAttributes; _i < _cssAttributes.length; _i++) {
              var attr = _cssAttributes[_i];
              var overflowValue = $el.css(attr);
              if (overflowValue === "auto" || overflowValue === "scroll") {
                return true;
              }
            }
            return false;
          };
          if (hasOverFlow(_this.treeWidget.$el)) {
            return _this.treeWidget.$el;
          }
          var _iterator = _createForOfIteratorHelper(_this.treeWidget.$el.parents().get()),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;
              var $el = jQuery(el);
              if (hasOverFlow($el)) {
                return $el;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return null;
        };
        var setDocumentAsScrollParent = function setDocumentAsScrollParent() {
          _this.scrollParentTop = 0;
          _this.$scrollParent = null;
        };
        if (this.treeWidget.$el.css("position") === "fixed") {
          setDocumentAsScrollParent();
        }
        var $scrollParent = getParentWithOverflow();
        if ($scrollParent && $scrollParent.length && $scrollParent[0].tagName !== "HTML") {
          this.$scrollParent = $scrollParent;
          var offset = this.$scrollParent.offset();
          this.scrollParentTop = offset ? offset.top : 0;
        } else {
          setDocumentAsScrollParent();
        }
        this.isInitialized = true;
      }
    }, {
      key: "ensureInit",
      value: function ensureInit() {
        if (!this.isInitialized) {
          this.initScrollParent();
        }
      }
    }, {
      key: "handleVerticalScrollingWithScrollParent",
      value: function handleVerticalScrollingWithScrollParent(area) {
        var scrollParent = this.$scrollParent && this.$scrollParent[0];
        if (!scrollParent) {
          return;
        }
        var distanceBottom = this.scrollParentTop + scrollParent.offsetHeight - area.bottom;
        if (distanceBottom < 20) {
          scrollParent.scrollTop += 20;
          this.treeWidget.refreshHitAreas();
          this.previousTop = -1;
        } else if (area.top - this.scrollParentTop < 20) {
          scrollParent.scrollTop -= 20;
          this.treeWidget.refreshHitAreas();
          this.previousTop = -1;
        }
      }
    }, {
      key: "handleVerticalScrollingWithDocument",
      value: function handleVerticalScrollingWithDocument(area) {
        var scrollTop = jQuery(document).scrollTop() || 0;
        var distanceTop = area.top - scrollTop;
        if (distanceTop < 20) {
          jQuery(document).scrollTop(scrollTop - 20);
        } else {
          var windowHeight = jQuery(window).height() || 0;
          if (windowHeight - (area.bottom - scrollTop) < 20) {
            jQuery(document).scrollTop(scrollTop + 20);
          }
        }
      }
    }, {
      key: "checkVerticalScrolling",
      value: function checkVerticalScrolling() {
        var hoveredArea = this.treeWidget.dndHandler.hoveredArea;
        if (hoveredArea && hoveredArea.top !== this.previousTop) {
          this.previousTop = hoveredArea.top;
          if (this.$scrollParent) {
            this.handleVerticalScrollingWithScrollParent(hoveredArea);
          } else {
            this.handleVerticalScrollingWithDocument(hoveredArea);
          }
        }
      }
    }, {
      key: "checkHorizontalScrolling",
      value: function checkHorizontalScrolling() {
        var positionInfo = this.treeWidget.dndHandler.positionInfo;
        if (!positionInfo) {
          return;
        }
        if (this.$scrollParent) {
          this.handleHorizontalScrollingWithParent(positionInfo);
        } else {
          this.handleHorizontalScrollingWithDocument(positionInfo);
        }
      }
    }, {
      key: "handleHorizontalScrollingWithParent",
      value: function handleHorizontalScrollingWithParent(positionInfo) {
        if (positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
          return;
        }
        var $scrollParent = this.$scrollParent;
        var scrollParentOffset = $scrollParent && $scrollParent.offset();
        if (!($scrollParent && scrollParentOffset)) {
          return;
        }
        var scrollParent = $scrollParent[0];
        var canScrollRight = scrollParent.scrollLeft + scrollParent.clientWidth < scrollParent.scrollWidth;
        var canScrollLeft = scrollParent.scrollLeft > 0;
        var rightEdge = scrollParentOffset.left + scrollParent.clientWidth;
        var leftEdge = scrollParentOffset.left;
        var isNearRightEdge = positionInfo.pageX > rightEdge - 20;
        var isNearLeftEdge = positionInfo.pageX < leftEdge + 20;
        if (isNearRightEdge && canScrollRight) {
          scrollParent.scrollLeft = Math.min(scrollParent.scrollLeft + 20, scrollParent.scrollWidth);
        } else if (isNearLeftEdge && canScrollLeft) {
          scrollParent.scrollLeft = Math.max(scrollParent.scrollLeft - 20, 0);
        }
      }
    }, {
      key: "handleHorizontalScrollingWithDocument",
      value: function handleHorizontalScrollingWithDocument(positionInfo) {
        if (positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
          return;
        }
        var $document = jQuery(document);
        var scrollLeft = $document.scrollLeft() || 0;
        var windowWidth = jQuery(window).width() || 0;
        var canScrollLeft = scrollLeft > 0;
        var isNearRightEdge = positionInfo.pageX > windowWidth - 20;
        var isNearLeftEdge = positionInfo.pageX - scrollLeft < 20;
        if (isNearRightEdge) {
          $document.scrollLeft(scrollLeft + 20);
        } else if (isNearLeftEdge && canScrollLeft) {
          $document.scrollLeft(Math.max(scrollLeft - 20, 0));
        }
      }
    }]);
    return ScrollHandler;
  }();

  var SelectNodeHandler = /*#__PURE__*/function () {
    function SelectNodeHandler(treeWidget) {
      _classCallCheck(this, SelectNodeHandler);
      _defineProperty(this, "treeWidget", void 0);
      _defineProperty(this, "selectedNodes", void 0);
      _defineProperty(this, "selectedSingleNode", void 0);
      this.treeWidget = treeWidget;
      this.selectedNodes = new Set();
      this.clear();
    }
    _createClass(SelectNodeHandler, [{
      key: "getSelectedNode",
      value: function getSelectedNode() {
        var selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length) {
          return selectedNodes[0];
        } else {
          return false;
        }
      }
    }, {
      key: "getSelectedNodes",
      value: function getSelectedNodes() {
        var _this = this;
        if (this.selectedSingleNode) {
          return [this.selectedSingleNode];
        } else {
          var selectedNodes = [];
          this.selectedNodes.forEach(function (id) {
            var node = _this.treeWidget.getNodeById(id);
            if (node) {
              selectedNodes.push(node);
            }
          });
          return selectedNodes;
        }
      }
    }, {
      key: "getSelectedNodesUnder",
      value: function getSelectedNodesUnder(parent) {
        if (this.selectedSingleNode) {
          if (parent.isParentOf(this.selectedSingleNode)) {
            return [this.selectedSingleNode];
          } else {
            return [];
          }
        } else {
          var selectedNodes = [];
          for (var id in this.selectedNodes) {
            if (Object.prototype.hasOwnProperty.call(this.selectedNodes, id)) {
              var node = this.treeWidget.getNodeById(id);
              if (node && parent.isParentOf(node)) {
                selectedNodes.push(node);
              }
            }
          }
          return selectedNodes;
        }
      }
    }, {
      key: "isNodeSelected",
      value: function isNodeSelected(node) {
        if (node.id != null) {
          return this.selectedNodes.has(node.id);
        } else if (this.selectedSingleNode) {
          return this.selectedSingleNode.element === node.element;
        } else {
          return false;
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.selectedNodes.clear();
        this.selectedSingleNode = null;
      }
    }, {
      key: "removeFromSelection",
      value: function removeFromSelection(node) {
        var _this2 = this;
        var includeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (node.id == null) {
          if (this.selectedSingleNode && node.element === this.selectedSingleNode.element) {
            this.selectedSingleNode = null;
          }
        } else {
          this.selectedNodes["delete"](node.id);
          if (includeChildren) {
            node.iterate(function () {
              if (node.id != null) {
                _this2.selectedNodes["delete"](node.id);
              }
              return true;
            });
          }
        }
      }
    }, {
      key: "addToSelection",
      value: function addToSelection(node) {
        if (node.id != null) {
          this.selectedNodes.add(node.id);
        } else {
          this.selectedSingleNode = node;
        }
      }
    }, {
      key: "isFocusOnTree",
      value: function isFocusOnTree() {
        var activeElement = document.activeElement;
        return Boolean(activeElement && activeElement.tagName === "SPAN" && this.treeWidget._containsElement(activeElement));
      }
    }]);
    return SelectNodeHandler;
  }();

  var NodeElement = /*#__PURE__*/function () {
    function NodeElement(node, treeWidget) {
      _classCallCheck(this, NodeElement);
      _defineProperty(this, "node", void 0);
      _defineProperty(this, "$element", void 0);
      _defineProperty(this, "treeWidget", void 0);
      this.init(node, treeWidget);
    }
    _createClass(NodeElement, [{
      key: "init",
      value: function init(node, treeWidget) {
        this.node = node;
        this.treeWidget = treeWidget;
        if (!node.element) {
          var element = this.treeWidget.element.get(0);
          if (element) {
            node.element = element;
          }
        }
        if (node.element) {
          this.$element = jQuery(node.element);
        }
      }
    }, {
      key: "addDropHint",
      value: function addDropHint(position) {
        if (this.mustShowBorderDropHint(position)) {
          return new BorderDropHint(this.$element, this.treeWidget._getScrollLeft());
        } else {
          return new GhostDropHint(this.node, this.$element, position);
        }
      }
    }, {
      key: "select",
      value: function select(mustSetFocus) {
        var _this$treeWidget$opti;
        var $li = this.getLi();
        $li.addClass("jqtree-selected");
        $li.attr("aria-selected", "true");
        var $span = this.getSpan();
        $span.attr("tabindex", (_this$treeWidget$opti = this.treeWidget.options.tabIndex) !== null && _this$treeWidget$opti !== void 0 ? _this$treeWidget$opti : null);
        if (mustSetFocus) {
          $span.trigger("focus");
        }
      }
    }, {
      key: "deselect",
      value: function deselect() {
        var $li = this.getLi();
        $li.removeClass("jqtree-selected");
        $li.attr("aria-selected", "false");
        var $span = this.getSpan();
        $span.removeAttr("tabindex");
        $span.blur();
      }
    }, {
      key: "getUl",
      value: function getUl() {
        return this.$element.children("ul:first");
      }
    }, {
      key: "getSpan",
      value: function getSpan() {
        return this.$element.children(".jqtree-element").find("span.jqtree-title");
      }
    }, {
      key: "getLi",
      value: function getLi() {
        return this.$element;
      }
    }, {
      key: "mustShowBorderDropHint",
      value: function mustShowBorderDropHint(position) {
        return position === Position.Inside;
      }
    }]);
    return NodeElement;
  }();
  var FolderElement = /*#__PURE__*/function (_NodeElement) {
    _inherits(FolderElement, _NodeElement);
    var _super = _createSuper(FolderElement);
    function FolderElement() {
      _classCallCheck(this, FolderElement);
      return _super.apply(this, arguments);
    }
    _createClass(FolderElement, [{
      key: "open",
      value: function open(onFinished) {
        var _this = this;
        var slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var animationSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "fast";
        if (this.node.is_open) {
          return;
        }
        this.node.is_open = true;
        var $button = this.getButton();
        $button.removeClass("jqtree-closed");
        $button.html("");
        var buttonEl = $button.get(0);
        if (buttonEl) {
          var icon = this.treeWidget.renderer.openedIconElement.cloneNode(true);
          buttonEl.appendChild(icon);
        }
        var doOpen = function doOpen() {
          var $li = _this.getLi();
          $li.removeClass("jqtree-closed");
          var $span = _this.getSpan();
          $span.attr("aria-expanded", "true");
          if (onFinished) {
            onFinished(_this.node);
          }
          _this.treeWidget._triggerEvent("tree.open", {
            node: _this.node
          });
        };
        if (slide) {
          this.getUl().slideDown(animationSpeed, doOpen);
        } else {
          this.getUl().show();
          doOpen();
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;
        var slide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var animationSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fast";
        if (!this.node.is_open) {
          return;
        }
        this.node.is_open = false;
        var $button = this.getButton();
        $button.addClass("jqtree-closed");
        $button.html("");
        var buttonEl = $button.get(0);
        if (buttonEl) {
          var icon = this.treeWidget.renderer.closedIconElement.cloneNode(true);
          buttonEl.appendChild(icon);
        }
        var doClose = function doClose() {
          var $li = _this2.getLi();
          $li.addClass("jqtree-closed");
          var $span = _this2.getSpan();
          $span.attr("aria-expanded", "false");
          _this2.treeWidget._triggerEvent("tree.close", {
            node: _this2.node
          });
        };
        if (slide) {
          this.getUl().slideUp(animationSpeed, doClose);
        } else {
          this.getUl().hide();
          doClose();
        }
      }
    }, {
      key: "mustShowBorderDropHint",
      value: function mustShowBorderDropHint(position) {
        return !this.node.is_open && position === Position.Inside;
      }
    }, {
      key: "getButton",
      value: function getButton() {
        return this.$element.children(".jqtree-element").find("a.jqtree-toggler");
      }
    }]);
    return FolderElement;
  }(NodeElement);
  var BorderDropHint = /*#__PURE__*/function () {
    function BorderDropHint($element, scrollLeft) {
      _classCallCheck(this, BorderDropHint);
      _defineProperty(this, "$hint", void 0);
      var $div = $element.children(".jqtree-element");
      var elWidth = $element.width() || 0;
      var width = Math.max(elWidth + scrollLeft - 4, 0);
      var elHeight = $div.outerHeight() || 0;
      var height = Math.max(elHeight - 4, 0);
      this.$hint = jQuery('<span class="jqtree-border"></span>');
      $div.append(this.$hint);
      this.$hint.css({
        width: width,
        height: height
      });
    }
    _createClass(BorderDropHint, [{
      key: "remove",
      value: function remove() {
        this.$hint.remove();
      }
    }]);
    return BorderDropHint;
  }();
  var GhostDropHint = /*#__PURE__*/function () {
    function GhostDropHint(node, $element, position) {
      _classCallCheck(this, GhostDropHint);
      _defineProperty(this, "$element", void 0);
      _defineProperty(this, "node", void 0);
      _defineProperty(this, "$ghost", void 0);
      this.$element = $element;
      this.node = node;
      this.$ghost = jQuery("<li class=\"jqtree_common jqtree-ghost\"><span class=\"jqtree_common jqtree-circle\"></span>\n            <span class=\"jqtree_common jqtree-line\"></span></li>");
      if (position === Position.After) {
        this.moveAfter();
      } else if (position === Position.Before) {
        this.moveBefore();
      } else if (position === Position.Inside) {
        if (node.isFolder() && node.is_open) {
          this.moveInsideOpenFolder();
        } else {
          this.moveInside();
        }
      }
    }
    _createClass(GhostDropHint, [{
      key: "remove",
      value: function remove() {
        this.$ghost.remove();
      }
    }, {
      key: "moveAfter",
      value: function moveAfter() {
        this.$element.after(this.$ghost);
      }
    }, {
      key: "moveBefore",
      value: function moveBefore() {
        this.$element.before(this.$ghost);
      }
    }, {
      key: "moveInsideOpenFolder",
      value: function moveInsideOpenFolder() {
        var childElement = this.node.children[0].element;
        if (childElement) {
          jQuery(childElement).before(this.$ghost);
        }
      }
    }, {
      key: "moveInside",
      value: function moveInside() {
        this.$element.after(this.$ghost);
        this.$ghost.addClass("jqtree-inside");
      }
    }]);
    return GhostDropHint;
  }();

  var NODE_PARAM_IS_EMPTY = "Node parameter is empty";
  var PARAM_IS_EMPTY = "Parameter is empty: ";
  var JqTreeWidget = /*#__PURE__*/function (_MouseWidget) {
    _inherits(JqTreeWidget, _MouseWidget);
    var _super = _createSuper(JqTreeWidget);
    function JqTreeWidget() {
      var _this;
      _classCallCheck(this, JqTreeWidget);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "element", void 0);
      _defineProperty(_assertThisInitialized(_this), "tree", void 0);
      _defineProperty(_assertThisInitialized(_this), "dndHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "renderer", void 0);
      _defineProperty(_assertThisInitialized(_this), "dataLoader", void 0);
      _defineProperty(_assertThisInitialized(_this), "scrollHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "selectNodeHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "isInitialized", void 0);
      _defineProperty(_assertThisInitialized(_this), "saveStateHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "keyHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
        var clickTarget = _this.getClickTarget(e.target);
        if (clickTarget) {
          if (clickTarget.type === "button") {
            _this.toggle(clickTarget.node, _this.options.slide);
            e.preventDefault();
            e.stopPropagation();
          } else if (clickTarget.type === "label") {
            var _node2 = clickTarget.node;
            var event = _this._triggerEvent("tree.click", {
              node: _node2,
              click_event: e
            });
            if (!event.isDefaultPrevented()) {
              _this.doSelectNode(_node2);
            }
          }
        }
      });
      _defineProperty(_assertThisInitialized(_this), "handleDblclick", function (e) {
        var clickTarget = _this.getClickTarget(e.target);
        if ((clickTarget === null || clickTarget === void 0 ? void 0 : clickTarget.type) === "label") {
          _this._triggerEvent("tree.dblclick", {
            node: clickTarget.node,
            click_event: e
          });
        }
      });
      _defineProperty(_assertThisInitialized(_this), "handleContextmenu", function (e) {
        var $div = jQuery(e.target).closest("ul.jqtree-tree .jqtree-element");
        if ($div.length) {
          var _node3 = _this.getNode($div);
          if (_node3) {
            e.preventDefault();
            e.stopPropagation();
            _this._triggerEvent("tree.contextmenu", {
              node: _node3,
              click_event: e
            });
            return false;
          }
        }
        return null;
      });
      return _this;
    }
    _createClass(JqTreeWidget, [{
      key: "toggle",
      value: function toggle(node) {
        var slideParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        var slide = slideParam !== null && slideParam !== void 0 ? slideParam : this.options.slide;
        if (node.is_open) {
          this.closeNode(node, slide);
        } else {
          this.openNode(node, slide);
        }
        return this.element;
      }
    }, {
      key: "getTree",
      value: function getTree() {
        return this.tree;
      }
    }, {
      key: "selectNode",
      value: function selectNode(node, optionsParam) {
        this.doSelectNode(node, optionsParam);
        return this.element;
      }
    }, {
      key: "getSelectedNode",
      value: function getSelectedNode() {
        return this.selectNodeHandler.getSelectedNode();
      }
    }, {
      key: "toJson",
      value: function toJson() {
        return JSON.stringify(this.tree.getData());
      }
    }, {
      key: "loadData",
      value: function loadData(data, parentNode) {
        this.doLoadData(data, parentNode);
        return this.element;
      }

      /*
      signatures:
      - loadDataFromUrl(url, parent_node=null, on_finished=null)
          loadDataFromUrl('/my_data');
          loadDataFromUrl('/my_data', node1);
          loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
          loadDataFromUrl('/my_data', null, function() { console.log('finished'); });
       - loadDataFromUrl(parent_node=null, on_finished=null)
          loadDataFromUrl();
          loadDataFromUrl(node1);
          loadDataFromUrl(null, function() { console.log('finished'); });
          loadDataFromUrl(node1, function() { console.log('finished'); });
      */
    }, {
      key: "loadDataFromUrl",
      value: function loadDataFromUrl(param1, param2, param3) {
        if (typeof param1 === "string") {
          // first parameter is url
          this.doLoadDataFromUrl(param1, param2, param3 !== null && param3 !== void 0 ? param3 : null);
        } else {
          // first parameter is not url
          this.doLoadDataFromUrl(null, param1, param2);
        }
        return this.element;
      }
    }, {
      key: "reload",
      value: function reload(onFinished) {
        this.doLoadDataFromUrl(null, null, onFinished);
        return this.element;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this._refreshElements(null);
        return this.element;
      }
    }, {
      key: "getNodeById",
      value: function getNodeById(nodeId) {
        return this.tree.getNodeById(nodeId);
      }
    }, {
      key: "getNodeByName",
      value: function getNodeByName(name) {
        return this.tree.getNodeByName(name);
      }
    }, {
      key: "getNodeByNameMustExist",
      value: function getNodeByNameMustExist(name) {
        return this.tree.getNodeByNameMustExist(name);
      }
    }, {
      key: "getNodesByProperty",
      value: function getNodesByProperty(key, value) {
        return this.tree.getNodesByProperty(key, value);
      }
    }, {
      key: "getNodeByHtmlElement",
      value: function getNodeByHtmlElement(element) {
        return this.getNode(jQuery(element));
      }
    }, {
      key: "getNodeByCallback",
      value: function getNodeByCallback(callback) {
        return this.tree.getNodeByCallback(callback);
      }
    }, {
      key: "openNode",
      value: function openNode(node, param1, param2) {
        var _this2 = this;
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        var parseParams = function parseParams() {
          var onFinished;
          var slide;
          if (isFunction(param1)) {
            onFinished = param1;
            slide = null;
          } else {
            slide = param1;
            onFinished = param2;
          }
          if (slide == null) {
            var _this2$options$slide;
            slide = (_this2$options$slide = _this2.options.slide) !== null && _this2$options$slide !== void 0 ? _this2$options$slide : false;
          }
          return [slide, onFinished];
        };
        var _parseParams = parseParams(),
          _parseParams2 = _slicedToArray(_parseParams, 2),
          slide = _parseParams2[0],
          onFinished = _parseParams2[1];
        this._openNode(node, slide, onFinished);
        return this.element;
      }
    }, {
      key: "closeNode",
      value: function closeNode(node, slideParam) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        var slide = slideParam !== null && slideParam !== void 0 ? slideParam : this.options.slide;
        if (node.isFolder() || node.isEmptyFolder) {
          new FolderElement(node, this).close(slide, this.options.animationSpeed);
          this.saveState();
        }
        return this.element;
      }
    }, {
      key: "isDragging",
      value: function isDragging() {
        return this.dndHandler.isDragging;
      }
    }, {
      key: "refreshHitAreas",
      value: function refreshHitAreas() {
        this.dndHandler.refresh();
        return this.element;
      }
    }, {
      key: "addNodeAfter",
      value: function addNodeAfter(newNodeInfo, existingNode) {
        var newNode = existingNode.addAfter(newNodeInfo);
        if (newNode) {
          this._refreshElements(existingNode.parent);
        }
        return newNode;
      }
    }, {
      key: "addNodeBefore",
      value: function addNodeBefore(newNodeInfo, existingNode) {
        if (!existingNode) {
          throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        var newNode = existingNode.addBefore(newNodeInfo);
        if (newNode) {
          this._refreshElements(existingNode.parent);
        }
        return newNode;
      }
    }, {
      key: "addParentNode",
      value: function addParentNode(newNodeInfo, existingNode) {
        if (!existingNode) {
          throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        var newNode = existingNode.addParent(newNodeInfo);
        if (newNode) {
          this._refreshElements(newNode.parent);
        }
        return newNode;
      }
    }, {
      key: "removeNode",
      value: function removeNode(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!node.parent) {
          throw Error("Node has no parent");
        }
        this.selectNodeHandler.removeFromSelection(node, true); // including children

        var parent = node.parent;
        node.remove();
        this._refreshElements(parent);
        return this.element;
      }
    }, {
      key: "appendNode",
      value: function appendNode(newNodeInfo, parentNodeParam) {
        var parentNode = parentNodeParam || this.tree;
        var node = parentNode.append(newNodeInfo);
        this._refreshElements(parentNode);
        return node;
      }
    }, {
      key: "prependNode",
      value: function prependNode(newNodeInfo, parentNodeParam) {
        var parentNode = parentNodeParam !== null && parentNodeParam !== void 0 ? parentNodeParam : this.tree;
        var node = parentNode.prepend(newNodeInfo);
        this._refreshElements(parentNode);
        return node;
      }
    }, {
      key: "updateNode",
      value: function updateNode(node, data) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        var idIsChanged = _typeof(data) === "object" && data.id && data.id !== node.id;
        if (idIsChanged) {
          this.tree.removeNodeFromIndex(node);
        }
        node.setData(data);
        if (idIsChanged) {
          this.tree.addNodeToIndex(node);
        }
        if (_typeof(data) === "object" && data["children"] && data["children"] instanceof Array) {
          node.removeChildren();
          if (data.children.length) {
            node.loadFromData(data.children);
          }
        }
        this._refreshElements(node);
        return this.element;
      }
    }, {
      key: "isSelectedNodeInSubtree",
      value: function isSelectedNodeInSubtree(subtree) {
        var selectedNode = this.getSelectedNode();
        if (!selectedNode) {
          return false;
        } else {
          return subtree === selectedNode || subtree.isParentOf(selectedNode);
        }
      }
    }, {
      key: "moveNode",
      value: function moveNode(node, targetNode, position) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!targetNode) {
          throw Error(PARAM_IS_EMPTY + "targetNode");
        }
        var positionIndex = getPosition(position);
        if (positionIndex !== undefined) {
          this.tree.moveNode(node, targetNode, positionIndex);
          this._refreshElements(null);
        }
        return this.element;
      }
    }, {
      key: "getStateFromStorage",
      value: function getStateFromStorage() {
        return this.saveStateHandler.getStateFromStorage();
      }
    }, {
      key: "addToSelection",
      value: function addToSelection(node, mustSetFocus) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        this.selectNodeHandler.addToSelection(node);
        this._getNodeElementForNode(node).select(mustSetFocus === undefined ? true : mustSetFocus);
        this.saveState();
        return this.element;
      }
    }, {
      key: "getSelectedNodes",
      value: function getSelectedNodes() {
        return this.selectNodeHandler.getSelectedNodes();
      }
    }, {
      key: "isNodeSelected",
      value: function isNodeSelected(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        return this.selectNodeHandler.isNodeSelected(node);
      }
    }, {
      key: "removeFromSelection",
      value: function removeFromSelection(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        this.selectNodeHandler.removeFromSelection(node);
        this._getNodeElementForNode(node).deselect();
        this.saveState();
        return this.element;
      }
    }, {
      key: "scrollToNode",
      value: function scrollToNode(node) {
        if (!node) {
          throw Error(NODE_PARAM_IS_EMPTY);
        }
        var nodeOffset = jQuery(node.element).offset();
        var nodeTop = nodeOffset ? nodeOffset.top : 0;
        var treeOffset = this.$el.offset();
        var treeTop = treeOffset ? treeOffset.top : 0;
        var top = nodeTop - treeTop;
        this.scrollHandler.scrollToY(top);
        return this.element;
      }
    }, {
      key: "getState",
      value: function getState() {
        return this.saveStateHandler.getState();
      }
    }, {
      key: "setState",
      value: function setState(state) {
        this.saveStateHandler.setInitialState(state);
        this._refreshElements(null);
        return this.element;
      }
    }, {
      key: "setOption",
      value: function setOption(option, value) {
        this.options[option] = value;
        return this.element;
      }
    }, {
      key: "moveDown",
      value: function moveDown() {
        var selectedNode = this.getSelectedNode();
        if (selectedNode) {
          this.keyHandler.moveDown(selectedNode);
        }
        return this.element;
      }
    }, {
      key: "moveUp",
      value: function moveUp() {
        var selectedNode = this.getSelectedNode();
        if (selectedNode) {
          this.keyHandler.moveUp(selectedNode);
        }
        return this.element;
      }
    }, {
      key: "getVersion",
      value: function getVersion() {
        return version;
      }
    }, {
      key: "_triggerEvent",
      value: function _triggerEvent(eventName, values) {
        var event = jQuery.Event(eventName, values);
        this.element.trigger(event);
        return event;
      }
    }, {
      key: "_openNode",
      value: function _openNode(node) {
        var _this3 = this;
        var slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var onFinished = arguments.length > 2 ? arguments[2] : undefined;
        var doOpenNode = function doOpenNode(_node, _slide, _onFinished) {
          var folderElement = new FolderElement(_node, _this3);
          folderElement.open(_onFinished, _slide, _this3.options.animationSpeed);
        };
        if (node.isFolder() || node.isEmptyFolder) {
          if (node.load_on_demand) {
            this.loadFolderOnDemand(node, slide, onFinished);
          } else {
            var parent = node.parent;
            while (parent) {
              // nb: do not open root element
              if (parent.parent) {
                doOpenNode(parent, false, null);
              }
              parent = parent.parent;
            }
            doOpenNode(node, slide, onFinished);
            this.saveState();
          }
        }
      }

      /*
      Redraw the tree or part of the tree.
       from_node: redraw this subtree
      */
    }, {
      key: "_refreshElements",
      value: function _refreshElements(fromNode) {
        var mustSetFocus = this.selectNodeHandler.isFocusOnTree();
        var mustSelect = fromNode ? this.isSelectedNodeInSubtree(fromNode) : false;
        this.renderer.render(fromNode);
        if (mustSelect) {
          this.selectCurrentNode(mustSetFocus);
        }
        this._triggerEvent("tree.refresh");
      }
    }, {
      key: "_getNodeElementForNode",
      value: function _getNodeElementForNode(node) {
        if (node.isFolder()) {
          return new FolderElement(node, this);
        } else {
          return new NodeElement(node, this);
        }
      }
    }, {
      key: "_getNodeElement",
      value: function _getNodeElement($element) {
        var node = this.getNode($element);
        if (node) {
          return this._getNodeElementForNode(node);
        } else {
          return null;
        }
      }
    }, {
      key: "_containsElement",
      value: function _containsElement(element) {
        var node = this.getNode(jQuery(element));
        return node != null && node.tree === this.tree;
      }
    }, {
      key: "_getScrollLeft",
      value: function _getScrollLeft() {
        return this.scrollHandler.getScrollLeft();
      }
    }, {
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(JqTreeWidget.prototype), "init", this).call(this);
        this.element = this.$el;
        this.isInitialized = false;
        this.options.rtl = this.getRtlOption();
        if (this.options.closedIcon == null) {
          this.options.closedIcon = this.getDefaultClosedIcon();
        }
        this.renderer = new ElementsRenderer(this);
        this.dataLoader = new DataLoader(this);
        this.saveStateHandler = new SaveStateHandler(this);
        this.selectNodeHandler = new SelectNodeHandler(this);
        this.dndHandler = new DragAndDropHandler(this);
        this.scrollHandler = new ScrollHandler(this);
        this.keyHandler = new KeyHandler(this);
        this.initData();
        this.element.on("click", this.handleClick);
        this.element.on("dblclick", this.handleDblclick);
        if (this.options.useContextMenu) {
          this.element.on("contextmenu", this.handleContextmenu);
        }
      }
    }, {
      key: "deinit",
      value: function deinit() {
        this.element.empty();
        this.element.off();
        this.keyHandler.deinit();
        this.tree = new Node({}, true);
        _get(_getPrototypeOf(JqTreeWidget.prototype), "deinit", this).call(this);
      }
    }, {
      key: "mouseCapture",
      value: function mouseCapture(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseCapture(positionInfo);
        } else {
          return false;
        }
      }
    }, {
      key: "mouseStart",
      value: function mouseStart(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseStart(positionInfo);
        } else {
          return false;
        }
      }
    }, {
      key: "mouseDrag",
      value: function mouseDrag(positionInfo) {
        if (this.options.dragAndDrop) {
          var result = this.dndHandler.mouseDrag(positionInfo);
          this.scrollHandler.checkScrolling();
          return result;
        } else {
          return false;
        }
      }
    }, {
      key: "mouseStop",
      value: function mouseStop(positionInfo) {
        if (this.options.dragAndDrop) {
          return this.dndHandler.mouseStop(positionInfo);
        } else {
          return false;
        }
      }
    }, {
      key: "getMouseDelay",
      value: function getMouseDelay() {
        var _this$options$startDn;
        return (_this$options$startDn = this.options.startDndDelay) !== null && _this$options$startDn !== void 0 ? _this$options$startDn : 0;
      }
    }, {
      key: "initData",
      value: function initData() {
        if (this.options.data) {
          this.doLoadData(this.options.data, null);
        } else {
          var dataUrl = this.getDataUrlInfo(null);
          if (dataUrl) {
            this.doLoadDataFromUrl(null, null, null);
          } else {
            this.doLoadData([], null);
          }
        }
      }
    }, {
      key: "getDataUrlInfo",
      value: function getDataUrlInfo(node) {
        var _this4 = this;
        var dataUrl = this.options.dataUrl || this.element.data("url");
        var getUrlFromString = function getUrlFromString(url) {
          var urlInfo = {
            url: url
          };
          setUrlInfoData(urlInfo);
          return urlInfo;
        };
        var setUrlInfoData = function setUrlInfoData(urlInfo) {
          if (node !== null && node !== void 0 && node.id) {
            // Load on demand of a subtree; add node parameter
            var data = {
              node: node.id
            };
            urlInfo["data"] = data;
          } else {
            // Add selected_node parameter
            var selectedNodeId = _this4.getNodeIdToBeSelected();
            if (selectedNodeId) {
              var _data = {
                selected_node: selectedNodeId
              };
              urlInfo["data"] = _data;
            }
          }
        };
        if (typeof dataUrl === "function") {
          return dataUrl(node);
        } else if (typeof dataUrl === "string") {
          return getUrlFromString(dataUrl);
        } else if (dataUrl && _typeof(dataUrl) === "object") {
          setUrlInfoData(dataUrl);
          return dataUrl;
        } else {
          return null;
        }
      }
    }, {
      key: "getNodeIdToBeSelected",
      value: function getNodeIdToBeSelected() {
        if (this.options.saveState) {
          return this.saveStateHandler.getNodeIdToBeSelected();
        } else {
          return null;
        }
      }
    }, {
      key: "initTree",
      value: function initTree(data) {
        var _this5 = this;
        var doInit = function doInit() {
          if (!_this5.isInitialized) {
            _this5.isInitialized = true;
            _this5._triggerEvent("tree.init");
          }
        };
        if (!this.options.nodeClass) {
          return;
        }
        this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
        this.selectNodeHandler.clear();
        this.tree.loadFromData(data);
        var mustLoadOnDemand = this.setInitialState();
        this._refreshElements(null);
        if (!mustLoadOnDemand) {
          doInit();
        } else {
          // Load data on demand and then init the tree
          this.setInitialStateOnDemand(doInit);
        }
      }

      // Set initial state, either by restoring the state or auto-opening nodes
      // result: must load nodes on demand?
    }, {
      key: "setInitialState",
      value: function setInitialState() {
        var _this6 = this;
        var restoreState = function restoreState() {
          // result: is state restored, must load on demand?
          if (!_this6.options.saveState) {
            return [false, false];
          } else {
            var state = _this6.saveStateHandler.getStateFromStorage();
            if (!state) {
              return [false, false];
            } else {
              var _mustLoadOnDemand = _this6.saveStateHandler.setInitialState(state);

              // return true: the state is restored
              return [true, _mustLoadOnDemand];
            }
          }
        };
        var autoOpenNodes = function autoOpenNodes() {
          // result: must load on demand?
          if (_this6.options.autoOpen === false) {
            return false;
          }
          var maxLevel = _this6.getAutoOpenMaxLevel();
          var mustLoadOnDemand = false;
          _this6.tree.iterate(function (node, level) {
            if (node.load_on_demand) {
              mustLoadOnDemand = true;
              return false;
            } else if (!node.hasChildren()) {
              return false;
            } else {
              node.is_open = true;
              return level !== maxLevel;
            }
          });
          return mustLoadOnDemand;
        };
        var _restoreState = restoreState(),
          _restoreState2 = _slicedToArray(_restoreState, 2),
          isRestored = _restoreState2[0],
          mustLoadOnDemand = _restoreState2[1]; // eslint-disable-line prefer-const

        if (!isRestored) {
          mustLoadOnDemand = autoOpenNodes();
        }
        return mustLoadOnDemand;
      }

      // Set the initial state for nodes that are loaded on demand
      // Call cb_finished when done
    }, {
      key: "setInitialStateOnDemand",
      value: function setInitialStateOnDemand(cbFinished) {
        var _this7 = this;
        var restoreState = function restoreState() {
          if (!_this7.options.saveState) {
            return false;
          } else {
            var state = _this7.saveStateHandler.getStateFromStorage();
            if (!state) {
              return false;
            } else {
              _this7.saveStateHandler.setInitialStateOnDemand(state, cbFinished);
              return true;
            }
          }
        };
        var autoOpenNodes = function autoOpenNodes() {
          var maxLevel = _this7.getAutoOpenMaxLevel();
          var loadingCount = 0;
          var loadAndOpenNode = function loadAndOpenNode(node) {
            loadingCount += 1;
            _this7._openNode(node, false, function () {
              loadingCount -= 1;
              openNodes();
            });
          };
          var openNodes = function openNodes() {
            _this7.tree.iterate(function (node, level) {
              if (node.load_on_demand) {
                if (!node.is_loading) {
                  loadAndOpenNode(node);
                }
                return false;
              } else {
                _this7._openNode(node, false, null);
                return level !== maxLevel;
              }
            });
            if (loadingCount === 0) {
              cbFinished();
            }
          };
          openNodes();
        };
        if (!restoreState()) {
          autoOpenNodes();
        }
      }
    }, {
      key: "getAutoOpenMaxLevel",
      value: function getAutoOpenMaxLevel() {
        if (this.options.autoOpen === true) {
          return -1;
        } else if (typeof this.options.autoOpen === "number") {
          return this.options.autoOpen;
        } else if (typeof this.options.autoOpen === "string") {
          return parseInt(this.options.autoOpen, 10);
        } else {
          return 0;
        }
      }
    }, {
      key: "getClickTarget",
      value: function getClickTarget(element) {
        var $target = jQuery(element);
        var $button = $target.closest(".jqtree-toggler");
        if ($button.length) {
          var _node4 = this.getNode($button);
          if (_node4) {
            return {
              type: "button",
              node: _node4
            };
          }
        } else {
          var $el = $target.closest(".jqtree-element");
          if ($el.length) {
            var _node5 = this.getNode($el);
            if (_node5) {
              return {
                type: "label",
                node: _node5
              };
            }
          }
        }
        return null;
      }
    }, {
      key: "getNode",
      value: function getNode($element) {
        var $li = $element.closest("li.jqtree_common");
        if ($li.length === 0) {
          return null;
        } else {
          return $li.data("node");
        }
      }
    }, {
      key: "saveState",
      value: function saveState() {
        if (this.options.saveState) {
          this.saveStateHandler.saveState();
        }
      }
    }, {
      key: "selectCurrentNode",
      value: function selectCurrentNode(mustSetFocus) {
        var node = this.getSelectedNode();
        if (node) {
          var nodeElement = this._getNodeElementForNode(node);
          if (nodeElement) {
            nodeElement.select(mustSetFocus);
          }
        }
      }
    }, {
      key: "deselectCurrentNode",
      value: function deselectCurrentNode() {
        var node = this.getSelectedNode();
        if (node) {
          this.removeFromSelection(node);
        }
      }
    }, {
      key: "getDefaultClosedIcon",
      value: function getDefaultClosedIcon() {
        if (this.options.rtl) {
          // triangle to the left
          return "&#x25c0;";
        } else {
          // triangle to the right
          return "&#x25ba;";
        }
      }
    }, {
      key: "getRtlOption",
      value: function getRtlOption() {
        if (this.options.rtl != null) {
          return this.options.rtl;
        } else {
          var dataRtl = this.element.data("rtl");
          if (dataRtl !== null && dataRtl !== false && dataRtl !== undefined) {
            return true;
          } else {
            return false;
          }
        }
      }
    }, {
      key: "doSelectNode",
      value: function doSelectNode(node, optionsParam) {
        var _this8 = this;
        var saveState = function saveState() {
          if (_this8.options.saveState) {
            _this8.saveStateHandler.saveState();
          }
        };
        if (!node) {
          // Called with empty node -> deselect current node
          this.deselectCurrentNode();
          saveState();
          return;
        }
        var defaultOptions = {
          mustSetFocus: true,
          mustToggle: true
        };
        var selectOptions = _objectSpread2(_objectSpread2({}, defaultOptions), optionsParam || {});
        var canSelect = function canSelect() {
          if (_this8.options.onCanSelectNode) {
            return _this8.options.selectable === true && _this8.options.onCanSelectNode(node);
          } else {
            return _this8.options.selectable === true;
          }
        };
        var openParents = function openParents() {
          var parent = node.parent;
          if (parent && parent.parent && !parent.is_open) {
            _this8.openNode(parent, false);
          }
        };
        if (!canSelect()) {
          return;
        }
        if (this.selectNodeHandler.isNodeSelected(node)) {
          if (selectOptions.mustToggle) {
            this.deselectCurrentNode();
            this._triggerEvent("tree.select", {
              node: null,
              previous_node: node
            });
          }
        } else {
          var deselectedNode = this.getSelectedNode() || null;
          this.deselectCurrentNode();
          this.addToSelection(node, selectOptions.mustSetFocus);
          this._triggerEvent("tree.select", {
            node: node,
            deselected_node: deselectedNode
          });
          openParents();
        }
        saveState();
      }
    }, {
      key: "doLoadData",
      value: function doLoadData(data, parentNode) {
        if (data) {
          if (parentNode) {
            this.deselectNodes(parentNode);
            this.loadSubtree(data, parentNode);
          } else {
            this.initTree(data);
          }
          if (this.isDragging()) {
            this.dndHandler.refresh();
          }
        }
        this._triggerEvent("tree.load_data", {
          tree_data: data,
          parent_node: parentNode
        });
      }
    }, {
      key: "deselectNodes",
      value: function deselectNodes(parentNode) {
        var selectedNodesUnderParent = this.selectNodeHandler.getSelectedNodesUnder(parentNode);
        var _iterator = _createForOfIteratorHelper(selectedNodesUnderParent),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var n = _step.value;
            this.selectNodeHandler.removeFromSelection(n);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "loadSubtree",
      value: function loadSubtree(data, parentNode) {
        parentNode.loadFromData(data);
        parentNode.load_on_demand = false;
        parentNode.is_loading = false;
        this._refreshElements(parentNode);
      }
    }, {
      key: "doLoadDataFromUrl",
      value: function doLoadDataFromUrl(urlInfoParam, parentNode, onFinished) {
        var urlInfo = urlInfoParam || this.getDataUrlInfo(parentNode);
        this.dataLoader.loadFromUrl(urlInfo, parentNode, onFinished);
      }
    }, {
      key: "loadFolderOnDemand",
      value: function loadFolderOnDemand(node) {
        var _this9 = this;
        var slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var onFinished = arguments.length > 2 ? arguments[2] : undefined;
        node.is_loading = true;
        this.doLoadDataFromUrl(null, node, function () {
          _this9._openNode(node, slide, onFinished);
        });
      }
    }]);
    return JqTreeWidget;
  }(MouseWidget);
  _defineProperty(JqTreeWidget, "defaults", {
    animationSpeed: "fast",
    autoEscape: true,
    autoOpen: false,
    // true / false / int (open n levels starting at 0)
    buttonLeft: true,
    // The symbol to use for a closed node - ► BLACK RIGHT-POINTING POINTER
    // http://www.fileformat.info/info/unicode/char/25ba/index.htm
    closedIcon: undefined,
    data: undefined,
    dataFilter: undefined,
    dataUrl: undefined,
    dragAndDrop: false,
    keyboardSupport: true,
    nodeClass: Node,
    onCanMove: undefined,
    // Can this node be moved?
    onCanMoveTo: undefined,
    // Can this node be moved to this position? function(moved_node, target_node, position)
    onCanSelectNode: undefined,
    onCreateLi: undefined,
    onDragMove: undefined,
    onDragStop: undefined,
    onGetStateFromStorage: undefined,
    onIsMoveHandle: undefined,
    onLoadFailed: undefined,
    onLoading: undefined,
    onSetStateFromStorage: undefined,
    openedIcon: "&#x25bc;",
    openFolderDelay: 500,
    // The delay for opening a folder during drag and drop; the value is in milliseconds
    // The symbol to use for an open node - ▼ BLACK DOWN-POINTING TRIANGLE
    // http://www.fileformat.info/info/unicode/char/25bc/index.htm
    rtl: undefined,
    // right-to-left support; true / false (default)
    saveState: false,
    // true / false / string (cookie name)
    selectable: true,
    showEmptyFolder: false,
    slide: true,
    // must display slide animation?
    startDndDelay: 300,
    // The delay for starting dnd (in milliseconds)
    tabIndex: 0,
    useContextMenu: true
  });
  SimpleWidget.register(JqTreeWidget, "tree");

  exports.JqTreeWidget = JqTreeWidget;

  return exports;

})({});
//# sourceMappingURL=tree.jquery.debug.js.map
