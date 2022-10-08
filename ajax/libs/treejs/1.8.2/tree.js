/*!
 * treejs
 * @version 1.8.0
 * @see https://github.com/daweilv/treejs
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tree"] = factory();
	else
		root["Tree"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

var _ajax = _interopRequireDefault(__webpack_require__(1));

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function uniq(arr) {
  var map = {};
  return arr.reduce(function (acc, item) {
    if (!map[item]) {
      map[item] = true;
      acc.push(item);
    }

    return acc;
  }, []);
}

function empty(ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
}

function animation(duration, callback) {
  requestAnimationFrame(function () {
    callback.enter();
    requestAnimationFrame(function () {
      callback.active();
      setTimeout(function () {
        callback.leave();
      }, duration);
    });
  });
}

function Tree(container, options) {
  var _this = this;

  var defaultOptions = {
    selectMode: 'checkbox',
    values: [],
    disables: [],
    beforeLoad: null,
    loaded: null,
    url: null,
    method: 'GET',
    closeDepth: null
  };
  this.treeNodes = [];
  this.nodesById = {};
  this.leafNodesById = {};
  this.liElementsById = {};
  this.willUpdateNodesById = {};
  this.container = container;
  this.options = Object.assign(defaultOptions, options);
  Object.defineProperties(this, {
    values: {
      get: function get() {
        return this.getValues();
      },
      set: function set(values) {
        return this.setValues(uniq(values));
      }
    },
    disables: {
      get: function get() {
        return this.getDisables();
      },
      set: function set(values) {
        return this.setDisables(uniq(values));
      }
    },
    selectedNodes: {
      get: function get() {
        var nodes = [];
        var nodesById = this.nodesById;

        for (var id in nodesById) {
          if (nodesById.hasOwnProperty(id) && (nodesById[id].status === 1 || nodesById[id].status === 2)) {
            var node = Object.assign({}, nodesById[id]);
            delete node.parent;
            delete node.children;
            nodes.push(node);
          }
        }

        return nodes;
      }
    },
    disabledNodes: {
      get: function get() {
        var nodes = [];
        var nodesById = this.nodesById;

        for (var id in nodesById) {
          if (nodesById.hasOwnProperty(id) && nodesById[id].disabled) {
            var node = Object.assign({}, nodesById[id]);
            delete node.parent;
            nodes.push(node);
          }
        }

        return nodes;
      }
    }
  });

  if (this.options.url) {
    this.load(function (data) {
      _this.init(data);
    });
  } else {
    this.init(this.options.data);
  }
}

Tree.prototype.init = function (data) {
  console.time('init');

  var _Tree$parseTreeData = Tree.parseTreeData(data),
      treeNodes = _Tree$parseTreeData.treeNodes,
      nodesById = _Tree$parseTreeData.nodesById,
      leafNodesById = _Tree$parseTreeData.leafNodesById,
      defaultValues = _Tree$parseTreeData.defaultValues,
      defaultDisables = _Tree$parseTreeData.defaultDisables;

  this.treeNodes = treeNodes;
  this.nodesById = nodesById;
  this.leafNodesById = leafNodesById;
  this.render(this.treeNodes);
  var _this$options = this.options,
      values = _this$options.values,
      disables = _this$options.disables,
      loaded = _this$options.loaded;
  if (values && values.length) defaultValues = values;
  defaultValues.length && this.setValues(defaultValues);
  if (disables && disables.length) defaultDisables = disables;
  defaultDisables.length && this.setDisables(defaultDisables);
  loaded && loaded.call(this);
  console.timeEnd('init');
};

Tree.prototype.load = function (callback) {
  console.time('load');
  var _this$options2 = this.options,
      url = _this$options2.url,
      method = _this$options2.method,
      beforeLoad = _this$options2.beforeLoad;
  (0, _ajax.default)({
    url: url,
    method: method,
    success: function success(result) {
      var data = result;
      console.timeEnd('load');

      if (beforeLoad) {
        data = beforeLoad(result);
      }

      callback(data);
    }
  });
};

Tree.prototype.render = function (treeNodes) {
  var treeEle = Tree.createRootEle();
  treeEle.appendChild(this.buildTree(treeNodes, 0));
  this.bindEvent(treeEle);
  var ele = document.querySelector(this.container);
  empty(ele);
  ele.appendChild(treeEle);
};

Tree.prototype.buildTree = function (nodes, depth) {
  var _this2 = this;

  var rootUlEle = Tree.createUlEle();

  if (nodes && nodes.length) {
    nodes.forEach(function (node) {
      var liEle = Tree.createLiEle(node, depth === _this2.options.closeDepth - 1);
      _this2.liElementsById[node.id] = liEle;
      var ulEle = null;

      if (node.children && node.children.length) {
        ulEle = _this2.buildTree(node.children, depth + 1);
      }

      ulEle && liEle.appendChild(ulEle);
      rootUlEle.appendChild(liEle);
    });
  }

  return rootUlEle;
};

Tree.prototype.bindEvent = function (ele) {
  var _this3 = this;

  ele.addEventListener('click', function (e) {
    var target = e.target;

    if (target.nodeName === 'SPAN' && (target.classList.contains('treejs-checkbox') || target.classList.contains('treejs-label'))) {
      _this3.onItemClick(target.parentNode.nodeId);
    } else if (target.nodeName === 'LI' && target.classList.contains('treejs-node')) {
      _this3.onItemClick(target.nodeId);
    } else if (target.nodeName === 'SPAN' && target.classList.contains('treejs-switcher')) {
      _this3.onSwitcherClick(target);
    }
  }, false);
};

Tree.prototype.onItemClick = function (id) {
  console.time('onItemClick');
  var node = this.nodesById[id];
  var onChange = this.options.onChange;

  if (!node.disabled) {
    this.setValue(id);
    this.updateLiElements();
  }

  onChange && onChange.call(this);
  console.timeEnd('onItemClick');
};

Tree.prototype.setValue = function (value) {
  var node = this.nodesById[value];
  if (!node) return;
  var prevStatus = node.status;
  var status = prevStatus === 1 || prevStatus === 2 ? 0 : 2;
  node.status = status;
  this.markWillUpdateNode(node);
  this.walkUp(node, 'status');
  this.walkDown(node, 'status');
};

Tree.prototype.getValues = function () {
  var values = [];

  for (var id in this.leafNodesById) {
    if (this.leafNodesById.hasOwnProperty(id)) {
      if (this.leafNodesById[id].status === 1 || this.leafNodesById[id].status === 2) {
        values.push(id);
      }
    }
  }

  return values;
};

Tree.prototype.setValues = function (values) {
  var _this4 = this;

  this.emptyNodesCheckStatus();
  values.forEach(function (value) {
    _this4.setValue(value);
  });
  this.updateLiElements();
  var onChange = this.options.onChange;
  onChange && onChange.call(this);
};

Tree.prototype.setDisable = function (value) {
  var node = this.nodesById[value];
  if (!node) return;
  var prevDisabled = node.disabled;

  if (!prevDisabled) {
    node.disabled = true;
    this.markWillUpdateNode(node);
    this.walkUp(node, 'disabled');
    this.walkDown(node, 'disabled');
  }
};

Tree.prototype.getDisables = function () {
  var values = [];

  for (var id in this.leafNodesById) {
    if (this.leafNodesById.hasOwnProperty(id)) {
      if (this.leafNodesById[id].disabled) {
        values.push(id);
      }
    }
  }

  return values;
};

Tree.prototype.setDisables = function (values) {
  var _this5 = this;

  this.emptyNodesDisable();
  values.forEach(function (value) {
    _this5.setDisable(value);
  });
  this.updateLiElements();
};

Tree.prototype.emptyNodesCheckStatus = function () {
  this.willUpdateNodesById = this.getSelectedNodesById();
  Object.values(this.willUpdateNodesById).forEach(function (node) {
    if (!node.disabled) node.status = 0;
  });
};

Tree.prototype.emptyNodesDisable = function () {
  this.willUpdateNodesById = this.getDisabledNodesById();
  Object.values(this.willUpdateNodesById).forEach(function (node) {
    node.disabled = false;
  });
};

Tree.prototype.getSelectedNodesById = function () {
  return Object.entries(this.nodesById).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        node = _ref2[1];

    if (node.status === 1 || node.status === 2) {
      acc[id] = node;
    }

    return acc;
  }, {});
};

Tree.prototype.getDisabledNodesById = function () {
  return Object.entries(this.nodesById).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        id = _ref4[0],
        node = _ref4[1];

    if (node.disabled) {
      acc[id] = node;
    }

    return acc;
  }, {});
};

Tree.prototype.updateLiElements = function () {
  var _this6 = this;

  Object.values(this.willUpdateNodesById).forEach(function (node) {
    _this6.updateLiElement(node);
  });
  this.willUpdateNodesById = {};
};

Tree.prototype.markWillUpdateNode = function (node) {
  this.willUpdateNodesById[node.id] = node;
};

Tree.prototype.onSwitcherClick = function (target) {
  var liEle = target.parentNode;
  var ele = liEle.lastChild;
  var height = ele.scrollHeight;

  if (liEle.classList.contains('treejs-node__close')) {
    animation(150, {
      enter: function enter() {
        ele.style.height = 0;
        ele.style.opacity = 0;
      },
      active: function active() {
        ele.style.height = "".concat(height, "px");
        ele.style.opacity = 1;
      },
      leave: function leave() {
        ele.style.height = '';
        ele.style.opacity = '';
        liEle.classList.remove('treejs-node__close');
      }
    });
  } else {
    animation(150, {
      enter: function enter() {
        ele.style.height = "".concat(height, "px");
        ele.style.opacity = 1;
      },
      active: function active() {
        ele.style.height = 0;
        ele.style.opacity = 0;
      },
      leave: function leave() {
        ele.style.height = '';
        ele.style.opacity = '';
        liEle.classList.add('treejs-node__close');
      }
    });
  }
};

Tree.prototype.walkUp = function (node, changeState) {
  var parent = node.parent;

  if (parent) {
    if (changeState === 'status') {
      var pStatus = null;
      var statusCount = parent.children.reduce(function (acc, child) {
        if (!isNaN(child.status)) return acc + child.status;
        return acc;
      }, 0);

      if (statusCount) {
        pStatus = statusCount === parent.children.length * 2 ? 2 : 1;
      } else {
        pStatus = 0;
      }

      if (parent.status === pStatus) return;
      parent.status = pStatus;
    } else {
      var pDisabled = parent.children.reduce(function (acc, child) {
        return acc && child.disabled;
      }, true);
      if (parent.disabled === pDisabled) return;
      parent.disabled = pDisabled;
    }

    this.markWillUpdateNode(parent);
    this.walkUp(parent, changeState);
  }
};

Tree.prototype.walkDown = function (node, changeState) {
  var _this7 = this;

  if (node.children && node.children.length) {
    node.children.forEach(function (child) {
      if (changeState === 'status' && child.disabled) return;
      child[changeState] = node[changeState];

      _this7.markWillUpdateNode(child);

      _this7.walkDown(child, changeState);
    });
  }
};

Tree.prototype.updateLiElement = function (node) {
  var classList = this.liElementsById[node.id].classList;

  switch (node.status) {
    case 0:
      classList.remove('treejs-node__halfchecked', 'treejs-node__checked');
      break;

    case 1:
      classList.remove('treejs-node__checked');
      classList.add('treejs-node__halfchecked');
      break;

    case 2:
      classList.remove('treejs-node__halfchecked');
      classList.add('treejs-node__checked');
      break;
  }

  switch (node.disabled) {
    case true:
      if (!classList.contains('treejs-node__disabled')) classList.add('treejs-node__disabled');
      break;

    case false:
      if (classList.contains('treejs-node__disabled')) classList.remove('treejs-node__disabled');
      break;
  }
};

Tree.parseTreeData = function (data) {
  var treeNodes = deepClone(data);
  var nodesById = {};
  var leafNodesById = {};
  var values = [];
  var disables = [];

  var walkTree = function walkTree(nodes, parent) {
    nodes.forEach(function (node) {
      nodesById[node.id] = node;
      if (node.checked) values.push(node.id);
      if (node.disabled) disables.push(node.id);
      if (parent) node.parent = parent;

      if (node.children && node.children.length) {
        walkTree(node.children, node);
      } else {
        leafNodesById[node.id] = node;
      }
    });
  };

  walkTree(treeNodes);
  return {
    treeNodes: treeNodes,
    nodesById: nodesById,
    leafNodesById: leafNodesById,
    defaultValues: values,
    defaultDisables: disables
  };
};

Tree.createRootEle = function () {
  var div = document.createElement('div');
  div.classList.add('treejs');
  return div;
};

Tree.createUlEle = function () {
  var ul = document.createElement('ul');
  ul.classList.add('treejs-nodes');
  return ul;
};

Tree.createLiEle = function (node, closed) {
  var li = document.createElement('li');
  li.classList.add('treejs-node');
  if (closed) li.classList.add('treejs-node__close');

  if (node.children && node.children.length) {
    var switcher = document.createElement('span');
    switcher.classList.add('treejs-switcher');
    li.appendChild(switcher);
  } else {
    li.classList.add('treejs-placeholder');
  }

  var checkbox = document.createElement('span');
  checkbox.classList.add('treejs-checkbox');
  li.appendChild(checkbox);
  var label = document.createElement('span');
  label.classList.add('treejs-label');
  var text = document.createTextNode(node.text);
  label.appendChild(text);
  li.appendChild(label);
  li.nodeId = node.id;
  return li;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _default(_options) {
  var defaultOptions = {
    method: 'GET',
    url: '',
    async: true,
    success: null,
    failed: null,
    'Content-Type': 'application/json; charset=utf-8'
  };
  var options = Object.assign(defaultOptions, _options);
  var xhr = new XMLHttpRequest();
  var postData = Object.entries(options.data).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    acc.push("".concat(key, "=").concat(value));
    return acc;
  }, []).join('&');

  if (options.method.toUpperCase() === 'POST') {
    xhr.open(options.method, options.url, options.async);
    xhr.setRequestHeader('Content-Type', options['Content-Type']);
    xhr.send(postData);
  } else if (options.method.toUpperCase() === 'GET') {
    var url = options.url;

    if (postData) {
      if (url.indexOf('?') !== -1) {
        url += "&".concat(postData);
      } else {
        url += "&".concat(postData);
      }
    }

    xhr.open(options.method, url, options.async);
    xhr.setRequestHeader('Content-Type', options['Content-Type']);
    xhr.send(null);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res = xhr.responseText;

      if (options['Content-Type'] === defaultOptions['Content-Type']) {
        res = JSON.parse(res);
      }

      options.success && options.success(res);
    } else {
      options.failed && options.failed(xhr.status);
    }
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(3);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".treejs {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 14px;\n}\n.treejs *:after,\n.treejs *:before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.treejs > .treejs-node {\n  padding-left: 0;\n}\n.treejs .treejs-nodes {\n  list-style: none;\n  padding-left: 20px;\n  overflow: hidden;\n  -webkit-transition: height 150ms ease-out, opacity 150ms ease-out;\n  -o-transition: height 150ms ease-out, opacity 150ms ease-out;\n  transition: height 150ms ease-out, opacity 150ms ease-out;\n}\n.treejs .treejs-node {\n  cursor: pointer;\n  overflow: hidden;\n}\n.treejs .treejs-node.treejs-placeholder {\n  padding-left: 20px;\n}\n.treejs .treejs-switcher {\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  position: relative;\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  -o-transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n.treejs .treejs-switcher:before {\n  position: absolute;\n  top: 8px;\n  left: 6px;\n  display: block;\n  content: ' ';\n  border: 4px solid transparent;\n  border-top: 4px solid rgba(0, 0, 0, 0.4);\n  -webkit-transition: border-color 150ms;\n  -o-transition: border-color 150ms;\n  transition: border-color 150ms;\n}\n.treejs .treejs-switcher:hover:before {\n  border-top: 4px solid rgba(0, 0, 0, 0.65);\n}\n.treejs .treejs-node__close > .treejs-switcher {\n  -webkit-transform: rotate(-90deg);\n      -ms-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.treejs .treejs-node__close > .treejs-nodes {\n  height: 0;\n}\n.treejs .treejs-checkbox {\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  position: relative;\n}\n.treejs .treejs-checkbox:before {\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n  cursor: pointer;\n  position: absolute;\n  top: 2px;\n  content: ' ';\n  display: block;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #d9d9d9;\n  border-radius: 2px;\n}\n.treejs .treejs-checkbox:hover:before {\n  -webkit-box-shadow: 0 0 2px 1px #1890ff;\n          box-shadow: 0 0 2px 1px #1890ff;\n}\n.treejs .treejs-node__checked > .treejs-checkbox:before {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.treejs .treejs-node__checked > .treejs-checkbox:after {\n  position: absolute;\n  content: ' ';\n  display: block;\n  top: 4px;\n  left: 5px;\n  width: 5px;\n  height: 9px;\n  border: 2px solid #fff;\n  border-top: none;\n  border-left: none;\n  -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.treejs .treejs-node__halfchecked > .treejs-checkbox:before {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.treejs .treejs-node__halfchecked > .treejs-checkbox:after {\n  position: absolute;\n  content: ' ';\n  display: block;\n  top: 9px;\n  left: 3px;\n  width: 10px;\n  height: 2px;\n  background-color: #fff;\n}\n.treejs .treejs-node__disabled {\n  cursor: not-allowed;\n  color: rgba(0, 0, 0, 0.25);\n}\n.treejs .treejs-node__disabled .treejs-checkbox {\n  cursor: not-allowed;\n}\n.treejs .treejs-node__disabled .treejs-checkbox:before {\n  cursor: not-allowed;\n  border-color: #d9d9d9 !important;\n  background-color: #f5f5f5 !important;\n}\n.treejs .treejs-node__disabled .treejs-checkbox:hover:before {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n.treejs .treejs-node__disabled .treejs-node__checked > .treejs-checkbox:after {\n  border-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled .treejs-node__halfchecked > .treejs-checkbox:after {\n  background-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled.treejs-node__checked > .treejs-checkbox:after {\n  border-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled.treejs-node__halfchecked > .treejs-checkbox:after {\n  background-color: #d9d9d9;\n}\n.treejs .treejs-label {\n  vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=tree.js.map