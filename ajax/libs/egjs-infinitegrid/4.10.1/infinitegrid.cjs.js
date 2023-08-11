/*
Copyright (c) NAVER Corp.
name: @egjs/infinitegrid
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-infinitegrid
version: 4.10.1
*/
'use strict';

var Component = require('@egjs/component');
var Grid = require('@egjs/grid');
var core = require('@cfcs/core');
var listDiffer = require('@egjs/list-differ');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var ua = typeof window !== "undefined" ? window.navigator.userAgent : "";
var IS_IOS = /iPhone|iPad/.test(ua);
var CONTAINER_CLASS_NAME = "infinitegrid-container";
var IGNORE_PROPERITES_MAP = {
  renderOnPropertyChange: true,
  useFit: true,
  autoResize: true
};
var INFINITEGRID_PROPERTY_TYPES = __assign({}, Grid.GRID_PROPERTY_TYPES);
var DIRECTION = {
  START: "start",
  END: "end",
  NONE: ""
};
var INFINITEGRID_EVENTS = {
  CHANGE_SCROLL: "changeScroll",
  REQUEST_APPEND: "requestAppend",
  REQUEST_PREPEND: "requestPrepend",
  RENDER_COMPLETE: "renderComplete",
  CONTENT_ERROR: "contentError"
};
var ITEM_INFO_PROPERTIES = {
  type: true,
  groupKey: true,
  key: true,
  element: true,
  html: true,
  data: true,
  inserted: true,
  attributes: true
};
var INFINITEGRID_METHODS = ["insertByGroupIndex", "updateItems", "getItems", "getVisibleItems", "getGroups", "getVisibleGroups", "renderItems", "getContainerElement", "getScrollContainerElement", "getWrapperElement", "setStatus", "getStatus", "removePlaceholders", "prependPlaceholders", "appendPlaceholders", "getStartCursor", "getEndCursor", "setCursors"];
(function (GROUP_TYPE) {
  GROUP_TYPE[GROUP_TYPE["NORMAL"] = 0] = "NORMAL";
  GROUP_TYPE[GROUP_TYPE["VIRTUAL"] = 1] = "VIRTUAL";
  GROUP_TYPE[GROUP_TYPE["LOADING"] = 2] = "LOADING";
})(exports.GROUP_TYPE || (exports.GROUP_TYPE = {}));
(function (ITEM_TYPE) {
  ITEM_TYPE[ITEM_TYPE["NORMAL"] = 0] = "NORMAL";
  ITEM_TYPE[ITEM_TYPE["VIRTUAL"] = 1] = "VIRTUAL";
  ITEM_TYPE[ITEM_TYPE["LOADING"] = 2] = "LOADING";
})(exports.ITEM_TYPE || (exports.ITEM_TYPE = {}));
(function (STATUS_TYPE) {
  // does not remove anything.
  STATUS_TYPE[STATUS_TYPE["NOT_REMOVE"] = 0] = "NOT_REMOVE";
  // Minimize information on invisible items
  STATUS_TYPE[STATUS_TYPE["MINIMIZE_INVISIBLE_ITEMS"] = 1] = "MINIMIZE_INVISIBLE_ITEMS";
  // Minimize information on invisible groups
  STATUS_TYPE[STATUS_TYPE["MINIMIZE_INVISIBLE_GROUPS"] = 2] = "MINIMIZE_INVISIBLE_GROUPS";
  // remove invisible groups
  STATUS_TYPE[STATUS_TYPE["REMOVE_INVISIBLE_GROUPS"] = 3] = "REMOVE_INVISIBLE_GROUPS";
})(exports.STATUS_TYPE || (exports.STATUS_TYPE = {}));
var INVISIBLE_POS = -9999;

/**
 * @extends Grid.GridItem
 */
var InfiniteGridItem = /*#__PURE__*/function (_super) {
  __extends(InfiniteGridItem, _super);
  function InfiniteGridItem(horizontal, itemStatus) {
    var _this = _super.call(this, horizontal, __assign({
      html: "",
      type: exports.ITEM_TYPE.NORMAL,
      cssRect: {
        top: INVISIBLE_POS,
        left: INVISIBLE_POS
      }
    }, itemStatus)) || this;
    if (_this.type === exports.ITEM_TYPE.VIRTUAL) {
      if (_this.rect.width || _this.rect.height) {
        _this.mountState = Grid.MOUNT_STATE.UNMOUNTED;
      }
      var orgRect = _this.orgRect;
      var rect = _this.rect;
      var cssRect = _this.cssRect;
      if (cssRect.width) {
        rect.width = cssRect.width;
      } else if (orgRect.width) {
        rect.width = orgRect.width;
      }
      if (cssRect.height) {
        rect.height = cssRect.height;
      } else if (orgRect.height) {
        rect.height = orgRect.height;
      }
    }
    return _this;
  }
  var __proto = InfiniteGridItem.prototype;
  __proto.getVirtualStatus = function () {
    return {
      type: exports.ITEM_TYPE.VIRTUAL,
      groupKey: this.groupKey,
      key: this.key,
      orgRect: this.orgRect,
      rect: this.rect,
      cssRect: this.cssRect,
      attributes: this.attributes
    };
  };
  __proto.getMinimizedStatus = function () {
    var status = __assign(__assign({}, _super.prototype.getMinimizedStatus.call(this)), {
      type: exports.ITEM_TYPE.NORMAL,
      groupKey: this.groupKey
    });
    if (this.html) {
      status.html = this.html;
    }
    return status;
  };
  return InfiniteGridItem;
}(Grid.GridItem);

var LOADING_GROUP_KEY = "__INFINITEGRID__LOADING_GRID";
var LOADING_ITEM_KEY = "__INFINITEGRID__LOADING_ITEM";
var LoadingGrid = /*#__PURE__*/function (_super) {
  __extends(LoadingGrid, _super);
  function LoadingGrid() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = "";
    return _this;
  }
  var __proto = LoadingGrid.prototype;
  __proto.getLoadingItem = function () {
    return this.items[0] || null;
  };
  __proto.setLoadingItem = function (item) {
    if (item) {
      var loadingItem = this.getLoadingItem();
      if (!loadingItem) {
        this.items = [new InfiniteGridItem(this.options.horizontal, __assign(__assign({}, item), {
          type: exports.ITEM_TYPE.LOADING,
          key: LOADING_ITEM_KEY
        }))];
      } else {
        for (var name in item) {
          loadingItem[name] = item[name];
        }
      }
    } else {
      this.items = [];
    }
  };
  __proto.applyGrid = function (items, direction, outline) {
    if (!items.length) {
      return {
        start: outline,
        end: outline
      };
    }
    var nextOutline = outline.length ? __spreadArray([], outline, true) : [0];
    var item = items[0];
    var offset = item.contentSize + this.gap;
    item.cssInlinePos = this.getContainerInlineSize() / 2 - item.inlineSize / 2;
    if (direction === "end") {
      var maxPos = Math.max.apply(Math, nextOutline);
      item.cssContentPos = maxPos;
      return {
        start: nextOutline,
        end: nextOutline.map(function (pos) {
          return pos + offset;
        })
      };
    } else {
      var minPos = Math.min.apply(Math, nextOutline);
      item.cssContentPos = minPos - offset;
      return {
        start: nextOutline.map(function (pos) {
          return pos - offset;
        }),
        end: nextOutline
      };
    }
  };
  return LoadingGrid;
}(Grid);

function isWindow(el) {
  return el === window;
}
function isNumber(val) {
  return typeof val === "number";
}
function isString(val) {
  return typeof val === "string";
}
function isObject(val) {
  return typeof val === "object";
}
function flat(arr) {
  return arr.reduce(function (prev, cur) {
    return __spreadArray(__spreadArray([], prev, true), cur, true);
  }, []);
}
function splitOptions(options) {
  var gridOptions = options.gridOptions,
    otherOptions = __rest(options, ["gridOptions"]);
  return __assign(__assign({}, splitGridOptions(gridOptions)), otherOptions);
}
function splitGridOptions(options) {
  var nextOptions = {};
  var gridOptions = {};
  var defaultOptions = Grid.defaultOptions;
  for (var name in options) {
    var value = options[name];
    if (!(name in IGNORE_PROPERITES_MAP)) {
      gridOptions[name] = value;
    }
    if (name in defaultOptions) {
      nextOptions[name] = value;
    }
  }
  return __assign(__assign({}, nextOptions), {
    gridOptions: gridOptions
  });
}
function categorize(items) {
  var groups = [];
  var groupKeys = {};
  var registeredGroupKeys = {};
  items.filter(function (item) {
    return item.groupKey != null;
  }).forEach(function (_a) {
    var groupKey = _a.groupKey;
    registeredGroupKeys[groupKey] = true;
  });
  var generatedGroupKey;
  var isContinuousGroupKey = false;
  items.forEach(function (item, i) {
    if (item.groupKey != null) {
      isContinuousGroupKey = false;
    } else if (!item.inserted && items[i - 1]) {
      // In case of framework, inserted is false.
      // If groupKey is not set, the group key of the previous item is followed.
      item.groupKey = items[i - 1].groupKey;
      isContinuousGroupKey = false;
    } else {
      if (!isContinuousGroupKey) {
        generatedGroupKey = makeKey(registeredGroupKeys);
        isContinuousGroupKey = true;
        registeredGroupKeys[generatedGroupKey] = true;
      }
      item.groupKey = generatedGroupKey;
    }
    var groupKey = item.groupKey;
    var group = groupKeys[groupKey];
    if (!group) {
      group = {
        groupKey: groupKey,
        items: []
      };
      groupKeys[groupKey] = group;
      groups.push(group);
    }
    group.items.push(item);
  });
  return groups;
}
function getNextCursors(prevKeys, nextKeys, prevStartCursor, prevEndCursor) {
  var result = listDiffer.diff(prevKeys, nextKeys, function (key) {
    return key;
  });
  var nextStartCursor = -1;
  var nextEndCursor = -1;
  // sync cursors
  result.maintained.forEach(function (_a) {
    var prevIndex = _a[0],
      nextIndex = _a[1];
    if (prevStartCursor <= prevIndex && prevIndex <= prevEndCursor) {
      if (nextStartCursor === -1) {
        nextStartCursor = nextIndex;
        nextEndCursor = nextIndex;
      } else {
        nextStartCursor = Math.min(nextStartCursor, nextIndex);
        nextEndCursor = Math.max(nextEndCursor, nextIndex);
      }
    }
  });
  return {
    startCursor: nextStartCursor,
    endCursor: nextEndCursor
  };
}
function splitVirtualGroups(groups, direction, nextGroups) {
  var virtualGroups = [];
  if (direction === "start") {
    var index = findIndex(groups, function (group) {
      return group.type === exports.GROUP_TYPE.NORMAL;
    });
    if (index === -1) {
      return [];
    }
    // Get the virtual group maintained in the group from the next group.
    var endMaintainedIndex = findIndex(groups, function (group) {
      return findIndex(nextGroups, function (nextGroup) {
        return nextGroup.groupKey === group.groupKey;
      }) >= 0;
    });
    var endIndex = endMaintainedIndex >= 0 ? Math.min(index, endMaintainedIndex) : index;
    virtualGroups = groups.slice(0, endIndex);
  } else {
    var index = findLastIndex(groups, function (group) {
      return group.type === exports.GROUP_TYPE.NORMAL;
    });
    if (index === -1) {
      return [];
    }
    var startMaintainedIndex = findLastIndex(groups, function (group) {
      return findIndex(nextGroups, function (nextGroup) {
        return nextGroup.groupKey === group.groupKey;
      }) >= 0;
    });
    var startIndex = startMaintainedIndex >= 0 ? Math.max(index, startMaintainedIndex) : index;
    virtualGroups = groups.slice(startIndex + 1);
  }
  return virtualGroups;
}
function getFirstRenderingItems(nextItems, horizontal) {
  var groups = categorize(nextItems);
  if (!groups[0]) {
    return [];
  }
  return groups[0].items.map(function (item) {
    return new InfiniteGridItem(horizontal, __assign({}, item));
  });
}
function getRenderingItemsByStatus(groupManagerStatus, nextItems, usePlaceholder, horizontal) {
  var prevGroups = groupManagerStatus.groups;
  var groups = categorize(nextItems);
  var startVirtualGroups = splitVirtualGroups(prevGroups, "start", groups);
  var endVirtualGroups = splitVirtualGroups(prevGroups, "end", groups);
  var nextGroups = __spreadArray(__spreadArray(__spreadArray([], startVirtualGroups, true), groups, true), endVirtualGroups, true);
  var _a = getNextCursors(prevGroups.map(function (group) {
      return group.groupKey;
    }), nextGroups.map(function (group) {
      return group.groupKey;
    }), groupManagerStatus.cursors[0], groupManagerStatus.cursors[1]),
    startCursor = _a.startCursor,
    endCursor = _a.endCursor;
  var nextVisibleItems = flat(nextGroups.slice(startCursor, endCursor + 1).map(function (group) {
    return group.items.map(function (item) {
      return new InfiniteGridItem(horizontal, __assign({}, item));
    });
  }));
  if (!usePlaceholder) {
    nextVisibleItems = nextVisibleItems.filter(function (item) {
      return item.type !== exports.ITEM_TYPE.VIRTUAL;
    });
  }
  return nextVisibleItems;
}
function mountRenderingItems(items, options) {
  var grid = options.grid,
    usePlaceholder = options.usePlaceholder,
    useLoading = options.useLoading,
    useFirstRender = options.useFirstRender,
    status = options.status;
  if (!grid) {
    return;
  }
  if (usePlaceholder) {
    grid.setPlaceholder({});
  }
  if (useLoading) {
    grid.setLoading({});
  }
  if (status) {
    grid.setStatus(status, true);
  }
  grid.syncItems(items);
  if (useFirstRender && !status && grid.getGroups().length) {
    grid.setCursors(0, 0, true);
  }
}
function getRenderingItems(items, options) {
  var status = options.status,
    usePlaceholder = options.usePlaceholder,
    useLoading = options.useLoading,
    horizontal = options.horizontal,
    useFirstRender = options.useFirstRender,
    grid = options.grid;
  var visibleItems = [];
  if (grid) {
    grid.setPlaceholder(usePlaceholder ? {} : null);
    grid.setLoading(useLoading ? {} : null);
    grid.syncItems(items);
    visibleItems = grid.getRenderingItems();
  } else if (status) {
    visibleItems = getRenderingItemsByStatus(status.groupManager, items, !!usePlaceholder, !!horizontal);
  } else if (useFirstRender) {
    visibleItems = getFirstRenderingItems(items, !!horizontal);
  }
  return visibleItems;
}
/* Class Decorator */
function InfiniteGridGetterSetter(component) {
  var prototype = component.prototype,
    propertyTypes = component.propertyTypes;
  var _loop_1 = function (name) {
    var attributes = {
      enumerable: true,
      configurable: true,
      get: function () {
        var options = this.groupManager.options;
        if (name in options) {
          return options[name];
        } else {
          return options.gridOptions[name];
        }
      },
      set: function (value) {
        var _a;
        var prevValue = this.groupManager[name];
        if (prevValue === value) {
          return;
        }
        this.groupManager.gridOptions = (_a = {}, _a[name] = value, _a);
      }
    };
    Object.defineProperty(prototype, name, attributes);
  };
  for (var name in propertyTypes) {
    _loop_1(name);
  }
}
function makeKey(registeredKeys, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }
  var index = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    var key = "infinitegrid_".concat(prefix).concat(index++);
    if (!(key in registeredKeys)) {
      return key;
    }
  }
}
function convertHTMLtoElement(html) {
  var dummy = document.createElement("div");
  dummy.innerHTML = html;
  return toArray(dummy.children);
}
function convertInsertedItems(items, groupKey) {
  var insertedItems;
  if (isString(items)) {
    insertedItems = convertHTMLtoElement(items);
  } else {
    insertedItems = items;
  }
  return insertedItems.map(function (item) {
    var element;
    var html = "";
    var key;
    if (isString(item)) {
      html = item;
    } else if ("parentNode" in item) {
      element = item;
      html = item.outerHTML;
    } else {
      // inserted is true when adding via a method.
      return __assign({
        groupKey: groupKey,
        inserted: true
      }, item);
    }
    // inserted is true when adding via a method.
    return {
      key: key,
      groupKey: groupKey,
      html: html,
      element: element,
      inserted: true
    };
  });
}
function toArray(nodes) {
  var array = [];
  if (nodes) {
    var length = nodes.length;
    for (var i = 0; i < length; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}
function findIndex(arr, callback) {
  var length = arr.length;
  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return i;
    }
  }
  return -1;
}
function findLastIndex(arr, callback) {
  var length = arr.length;
  for (var i = length - 1; i >= 0; --i) {
    if (callback(arr[i], i)) {
      return i;
    }
  }
  return -1;
}
function getItemInfo(info) {
  var nextInfo = {};
  for (var name in info) {
    if (name in ITEM_INFO_PROPERTIES) {
      nextInfo[name] = info[name];
    }
  }
  return nextInfo;
}
function setPlaceholder(item, info) {
  for (var name in info) {
    var value = info[name];
    if (isObject(value)) {
      item[name] = __assign(__assign({}, item[name]), value);
    } else {
      item[name] = info[name];
    }
  }
}
function isFlatOutline(start, end) {
  return start.length === end.length && start.every(function (pos, i) {
    return end[i] === pos;
  });
}
function range(length) {
  var arr = [];
  for (var i = 0; i < length; ++i) {
    arr.push(i);
  }
  return arr;
}
function flatGroups(groups) {
  return flat(groups.map(function (_a) {
    var grid = _a.grid;
    return grid.getItems();
  }));
}
function filterVirtuals(items, includePlaceholders) {
  if (includePlaceholders) {
    return __spreadArray([], items, true);
  } else {
    return items.filter(function (item) {
      return item.type !== exports.ITEM_TYPE.VIRTUAL;
    });
  }
}
/**
 * Decorator that makes the method of InfiniteGrid available in the framework.
 * @ko 프레임워크에서 InfiniteGrid의 메소드를 사용할 수 있게 하는 데코레이터.
 * @private
 * @example
 * ```js
 * import { withInfiniteGridMethods } from "@egjs/infinitegrid";
 *
 * class Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {
 *   &#64;withInfiniteGridMethods
 *   private grid: NativeGrid;
 * }
 * ```
 */
var withInfiniteGridMethods = core.withClassMethods(INFINITEGRID_METHODS);

var GroupManager = /*#__PURE__*/function (_super) {
  __extends(GroupManager, _super);
  function GroupManager(container, options) {
    var _this = _super.call(this, container, splitOptions(options)) || this;
    _this.groupItems = [];
    _this.groups = [];
    _this.itemKeys = {};
    _this.groupKeys = {};
    _this.startCursor = 0;
    _this.endCursor = 0;
    _this._placeholder = null;
    _this._loadingGrid = new LoadingGrid(container, {
      externalContainerManager: _this.containerManager,
      useFit: false,
      autoResize: false,
      renderOnPropertyChange: false,
      gap: _this.gap
    });
    _this._mainGrid = _this._makeGrid();
    return _this;
  }
  var __proto = GroupManager.prototype;
  Object.defineProperty(__proto, "gridOptions", {
    set: function (options) {
      var _a = splitGridOptions(options),
        gridOptions = _a.gridOptions,
        otherOptions = __rest(_a, ["gridOptions"]);
      var shouldRender = this._checkShouldRender(options);
      this.options.gridOptions = __assign(__assign({}, this.options.gridOptions), gridOptions);
      __spreadArray([this._mainGrid], this.groups.map(function (_a) {
        var grid = _a.grid;
        return grid;
      }), true).forEach(function (grid) {
        for (var name in options) {
          grid[name] = options[name];
        }
      });
      for (var name in otherOptions) {
        this[name] = otherOptions[name];
      }
      this._loadingGrid.gap = this.gap;
      if (shouldRender) {
        this.scheduleRender();
      }
    },
    enumerable: false,
    configurable: true
  });
  __proto.getItemByKey = function (key) {
    return this.itemKeys[key] || null;
  };
  __proto.getGroupItems = function (includePlaceholders) {
    return filterVirtuals(this.groupItems, includePlaceholders);
  };
  __proto.getVisibleItems = function (includePlaceholders) {
    return filterVirtuals(this.items, includePlaceholders);
  };
  __proto.getRenderingItems = function () {
    if (this.hasPlaceholder()) {
      return this.items;
    } else {
      return this.items.filter(function (item) {
        return item.type !== exports.ITEM_TYPE.VIRTUAL;
      });
    }
  };
  __proto.getGroups = function (includePlaceholders) {
    return filterVirtuals(this.groups, includePlaceholders);
  };
  __proto.hasVisibleVirtualGroups = function () {
    return this.getVisibleGroups(true).some(function (group) {
      return group.type === exports.GROUP_TYPE.VIRTUAL;
    });
  };
  __proto.hasPlaceholder = function () {
    return !!this._placeholder;
  };
  __proto.hasLoadingItem = function () {
    return !!this._getLoadingItem();
  };
  __proto.updateItems = function (items, options) {
    if (items === void 0) {
      items = this.groupItems;
    }
    return _super.prototype.updateItems.call(this, items, options);
  };
  __proto.setPlaceholder = function (placeholder) {
    this._placeholder = placeholder;
    this._updatePlaceholder();
  };
  __proto.getLoadingType = function () {
    return this._loadingGrid.type;
  };
  __proto.startLoading = function (type) {
    this._loadingGrid.type = type;
    this.items = this._getRenderingItems();
    return true;
  };
  __proto.endLoading = function () {
    var prevType = this._loadingGrid.type;
    this._loadingGrid.type = "";
    this.items = this._getRenderingItems();
    return !!prevType;
  };
  __proto.setLoading = function (loading) {
    this._loadingGrid.setLoadingItem(loading);
    this.items = this._getRenderingItems();
  };
  __proto.getVisibleGroups = function (includePlaceholders) {
    var groups = this.groups.slice(this.startCursor, this.endCursor + 1);
    return filterVirtuals(groups, includePlaceholders);
  };
  __proto.getComputedOutlineLength = function (items) {
    if (items === void 0) {
      items = this.items;
    }
    return this._mainGrid.getComputedOutlineLength(items);
  };
  __proto.getComputedOutlineSize = function (items) {
    if (items === void 0) {
      items = this.items;
    }
    return this._mainGrid.getComputedOutlineSize(items);
  };
  __proto.applyGrid = function (items, direction, outline) {
    var _this = this;
    var renderingGroups = this.groups.slice();
    if (!renderingGroups.length) {
      return {
        start: [],
        end: []
      };
    }
    var loadingGrid = this._loadingGrid;
    if (loadingGrid.getLoadingItem()) {
      if (loadingGrid.type === "start") {
        renderingGroups.unshift(this._getLoadingGroup());
      } else if (loadingGrid.type === "end") {
        renderingGroups.push(this._getLoadingGroup());
      }
    }
    var groups = renderingGroups.slice();
    var nextOutline = outline;
    if (direction === "start") {
      groups.reverse();
    }
    var appliedItemChecker = this.options.appliedItemChecker;
    var groupItems = this.groupItems;
    var outlineLength = this.getComputedOutlineLength(groupItems);
    var outlineSize = this.getComputedOutlineSize(groupItems);
    var itemRenderer = this.itemRenderer;
    groups.forEach(function (group) {
      var grid = group.grid;
      var gridItems = grid.getItems();
      var isVirtual = group.type === exports.GROUP_TYPE.VIRTUAL && !gridItems[0];
      grid.outlineLength = outlineLength;
      grid.outlineSize = outlineSize;
      var appliedItems = gridItems.filter(function (item) {
        if (item.mountState === Grid.MOUNT_STATE.UNCHECKED || !item.rect.width) {
          itemRenderer.updateItem(item, true);
        }
        return item.orgRect.width && item.rect.width || appliedItemChecker(item, grid);
      });
      var gridOutlines;
      if (isVirtual) {
        gridOutlines = _this._applyVirtualGrid(grid, direction, nextOutline);
      } else if (appliedItems.length) {
        gridOutlines = grid.applyGrid(appliedItems, direction, nextOutline);
      } else {
        gridOutlines = {
          start: __spreadArray([], nextOutline, true),
          end: __spreadArray([], nextOutline, true)
        };
      }
      grid.setOutlines(gridOutlines);
      nextOutline = gridOutlines[direction];
    });
    return {
      start: renderingGroups[0].grid.getOutlines().start,
      end: renderingGroups[renderingGroups.length - 1].grid.getOutlines().end
    };
  };
  __proto.syncItems = function (nextItemInfos) {
    var _this = this;
    var prevItemKeys = this.itemKeys;
    this.itemKeys = {};
    var nextItems = this._syncItemInfos(nextItemInfos.map(function (info) {
      return getItemInfo(info);
    }), prevItemKeys);
    var prevGroupKeys = this.groupKeys;
    var nextManagerGroups = categorize(nextItems);
    var startVirtualGroups = this._splitVirtualGroups("start", nextManagerGroups);
    var endVirtualGroups = this._splitVirtualGroups("end", nextManagerGroups);
    nextManagerGroups = __spreadArray(__spreadArray(__spreadArray([], startVirtualGroups, true), this._mergeVirtualGroups(nextManagerGroups), true), endVirtualGroups, true);
    var nextGroups = nextManagerGroups.map(function (_a) {
      var _b, _c;
      var groupKey = _a.groupKey,
        items = _a.items;
      var isVirtual = !items[0] || items[0].type === exports.ITEM_TYPE.VIRTUAL;
      var grid = (_c = (_b = prevGroupKeys[groupKey]) === null || _b === void 0 ? void 0 : _b.grid) !== null && _c !== void 0 ? _c : _this._makeGrid();
      var gridItems = isVirtual ? items : items.filter(function (_a) {
        var type = _a.type;
        return type === exports.ITEM_TYPE.NORMAL;
      });
      grid.setItems(gridItems);
      return {
        type: isVirtual ? exports.GROUP_TYPE.VIRTUAL : exports.GROUP_TYPE.NORMAL,
        groupKey: groupKey,
        grid: grid,
        items: gridItems,
        renderItems: items
      };
    });
    this._registerGroups(nextGroups);
  };
  __proto.renderItems = function (options) {
    if (options === void 0) {
      options = {};
    }
    if (options.useResize) {
      this.groupItems.forEach(function (item) {
        item.updateState = Grid.UPDATE_STATE.NEED_UPDATE;
      });
      var loadingItem = this._getLoadingItem();
      if (loadingItem) {
        loadingItem.updateState = Grid.UPDATE_STATE.NEED_UPDATE;
      }
    }
    return _super.prototype.renderItems.call(this, options);
  };
  __proto.setCursors = function (startCursor, endCursor) {
    this.startCursor = startCursor;
    this.endCursor = endCursor;
    this.items = this._getRenderingItems();
  };
  __proto.getStartCursor = function () {
    return this.startCursor;
  };
  __proto.getEndCursor = function () {
    return this.endCursor;
  };
  __proto.getGroupStatus = function (type, includePlaceholders) {
    var orgStartCursor = this.startCursor;
    var orgEndCursor = this.endCursor;
    var orgGroups = this.groups;
    var startGroup = orgGroups[orgStartCursor];
    var endGroup = orgGroups[orgEndCursor];
    var startCursor = orgStartCursor;
    var endCursor = orgEndCursor;
    var isMinimizeItems = type === exports.STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS;
    var isMinimizeGroups = type === exports.STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS;
    var groups;
    if (type === exports.STATUS_TYPE.REMOVE_INVISIBLE_GROUPS) {
      groups = this.getVisibleGroups(includePlaceholders);
      endCursor = groups.length - 1;
      startCursor = 0;
    } else {
      groups = this.getGroups(includePlaceholders);
      if (!includePlaceholders) {
        startCursor = -1;
        endCursor = -1;
        for (var orgIndex = orgStartCursor; orgIndex <= orgEndCursor; ++orgIndex) {
          var orgGroup = orgGroups[orgIndex];
          if (orgGroup && orgGroup.type !== exports.GROUP_TYPE.VIRTUAL) {
            startCursor = groups.indexOf(orgGroup);
            break;
          }
        }
        for (var orgIndex = orgEndCursor; orgIndex >= orgStartCursor; --orgIndex) {
          var orgGroup = orgGroups[orgIndex];
          if (orgGroup && orgGroup.type !== exports.GROUP_TYPE.VIRTUAL) {
            endCursor = groups.lastIndexOf(orgGroup);
            break;
          }
        }
      }
    }
    var groupStatus = groups.map(function (_a, i) {
      var grid = _a.grid,
        groupKey = _a.groupKey;
      var isOutsideCursor = i < startCursor || endCursor < i;
      var isVirtualItems = isMinimizeItems && isOutsideCursor;
      var isVirtualGroup = isMinimizeGroups && isOutsideCursor;
      var gridItems = grid.getItems();
      var items = isVirtualGroup ? [] : gridItems.map(function (item) {
        return isVirtualItems ? item.getVirtualStatus() : item.getMinimizedStatus();
      });
      return {
        type: isVirtualGroup || isVirtualItems ? exports.GROUP_TYPE.VIRTUAL : exports.GROUP_TYPE.NORMAL,
        groupKey: groupKey,
        outlines: grid.getOutlines(),
        items: items
      };
    });
    var totalItems = this.getGroupItems();
    var itemStartCursor = totalItems.indexOf(startGroup === null || startGroup === void 0 ? void 0 : startGroup.items[0]);
    var itemEndCursor = totalItems.indexOf(endGroup === null || endGroup === void 0 ? void 0 : endGroup.items.slice().reverse()[0]);
    return {
      cursors: [startCursor, endCursor],
      orgCursors: [orgStartCursor, orgEndCursor],
      itemCursors: [itemStartCursor, itemEndCursor],
      startGroupKey: startGroup === null || startGroup === void 0 ? void 0 : startGroup.groupKey,
      endGroupKey: endGroup === null || endGroup === void 0 ? void 0 : endGroup.groupKey,
      groups: groupStatus,
      outlines: this.outlines
    };
  };
  __proto.fitOutlines = function (useFit) {
    if (useFit === void 0) {
      useFit = this.useFit;
    }
    var groups = this.groups;
    var firstGroup = groups[0];
    if (!firstGroup) {
      return;
    }
    var outlines = firstGroup.grid.getOutlines();
    var startOutline = outlines.start;
    var outlineOffset = startOutline.length ? Math.min.apply(Math, startOutline) : 0;
    // If the outline is less than 0, a fit occurs forcibly.
    if (!useFit && outlineOffset > 0) {
      return;
    }
    groups.forEach(function (_a) {
      var grid = _a.grid;
      var _b = grid.getOutlines(),
        start = _b.start,
        end = _b.end;
      grid.setOutlines({
        start: start.map(function (point) {
          return point - outlineOffset;
        }),
        end: end.map(function (point) {
          return point - outlineOffset;
        })
      });
    });
    this.groupItems.forEach(function (item) {
      var contentPos = item.cssContentPos;
      if (!isNumber(contentPos)) {
        return;
      }
      item.cssContentPos = contentPos - outlineOffset;
    });
  };
  __proto.setGroupStatus = function (status) {
    var _this = this;
    this.itemKeys = {};
    this.groupItems = [];
    this.items = [];
    var prevGroupKeys = this.groupKeys;
    var nextGroups = status.groups.map(function (_a) {
      var _b, _c;
      var type = _a.type,
        groupKey = _a.groupKey,
        items = _a.items,
        outlines = _a.outlines;
      var nextItems = _this._syncItemInfos(items);
      var grid = (_c = (_b = prevGroupKeys[groupKey]) === null || _b === void 0 ? void 0 : _b.grid) !== null && _c !== void 0 ? _c : _this._makeGrid();
      grid.setOutlines(outlines);
      grid.setItems(nextItems);
      return {
        type: type,
        groupKey: groupKey,
        grid: grid,
        items: nextItems,
        renderItems: nextItems
      };
    });
    this.setOutlines(status.outlines);
    this._registerGroups(nextGroups);
    this._updatePlaceholder();
    this.setCursors(status.cursors[0], status.cursors[1]);
  };
  __proto.appendPlaceholders = function (items, groupKey) {
    return this.insertPlaceholders("end", items, groupKey);
  };
  __proto.prependPlaceholders = function (items, groupKey) {
    return this.insertPlaceholders("start", items, groupKey);
  };
  __proto.removePlaceholders = function (type) {
    var groups = this.groups;
    var length = groups.length;
    if (type === "start") {
      var index = findIndex(groups, function (group) {
        return group.type === exports.GROUP_TYPE.NORMAL;
      });
      groups.splice(0, index);
    } else if (type === "end") {
      var index = findLastIndex(groups, function (group) {
        return group.type === exports.GROUP_TYPE.NORMAL;
      });
      groups.splice(index + 1, length - index - 1);
    } else {
      var groupKey_1 = type.groupKey;
      var index = findIndex(groups, function (group) {
        return group.groupKey === groupKey_1;
      });
      if (index > -1) {
        groups.splice(index, 1);
      }
    }
    this.syncItems(flatGroups(this.getGroups()));
  };
  __proto.insertPlaceholders = function (direction, items, groupKey) {
    var _a, _b;
    if (groupKey === void 0) {
      groupKey = makeKey(this.groupKeys, "virtual_");
    }
    var infos = [];
    if (isNumber(items)) {
      infos = range(items).map(function () {
        return {
          type: exports.ITEM_TYPE.VIRTUAL,
          groupKey: groupKey
        };
      });
    } else if (Array.isArray(items)) {
      infos = items.map(function (status) {
        return __assign(__assign({
          groupKey: groupKey
        }, status), {
          type: exports.ITEM_TYPE.VIRTUAL
        });
      });
    }
    var grid = this._makeGrid();
    var nextItems = this._syncItemInfos(infos, this.itemKeys);
    this._updatePlaceholder(nextItems);
    grid.setItems(nextItems);
    var group = {
      type: exports.GROUP_TYPE.VIRTUAL,
      groupKey: groupKey,
      grid: grid,
      items: nextItems,
      renderItems: nextItems
    };
    this.groupKeys[groupKey] = group;
    if (direction === "end") {
      this.groups.push(group);
      (_a = this.groupItems).push.apply(_a, nextItems);
    } else {
      this.groups.splice(0, 0, group);
      (_b = this.groupItems).splice.apply(_b, __spreadArray([0, 0], nextItems, false));
      if (this.startCursor > -1) {
        ++this.startCursor;
        ++this.endCursor;
      }
    }
    return {
      group: group,
      items: nextItems
    };
  };
  __proto.shouldRerenderItems = function () {
    var isRerender = false;
    this.getVisibleGroups().forEach(function (group) {
      var items = group.items;
      if (items.length === group.renderItems.length || items.every(function (item) {
        return item.mountState === Grid.MOUNT_STATE.UNCHECKED;
      })) {
        return;
      }
      isRerender = true;
      group.renderItems = __spreadArray([], items, true);
    });
    if (isRerender) {
      this.items = this._getRenderingItems();
    }
    return isRerender;
  };
  __proto._updateItems = function (items) {
    this.itemRenderer.updateEqualSizeItems(items, this.groupItems);
  };
  __proto._getGroupItems = function () {
    return flatGroups(this.getGroups(true));
  };
  __proto._getRenderingItems = function () {
    var items = flat(this.getVisibleGroups(true).map(function (item) {
      return item.renderItems;
    }));
    var loadingGrid = this._loadingGrid;
    var loadingItem = loadingGrid.getLoadingItem();
    if (loadingItem) {
      if (loadingGrid.type === "end") {
        items.push(loadingItem);
      } else if (loadingGrid.type === "start") {
        items.unshift(loadingItem);
      }
    }
    return items;
  };
  __proto._checkShouldRender = function (options) {
    var GridConstructor = this.options.gridConstructor;
    var prevOptions = this.gridOptions;
    var propertyTypes = GridConstructor.propertyTypes;
    for (var name in prevOptions) {
      if (!(name in options) && propertyTypes[name] === Grid.PROPERTY_TYPE.RENDER_PROPERTY) {
        return true;
      }
    }
    for (var name in options) {
      if (prevOptions[name] !== options[name] && propertyTypes[name] === Grid.PROPERTY_TYPE.RENDER_PROPERTY) {
        return true;
      }
    }
    return false;
  };
  __proto._applyVirtualGrid = function (grid, direction, outline) {
    var startOutline = outline.length ? __spreadArray([], outline, true) : [0];
    var prevOutlines = grid.getOutlines();
    var prevOutline = prevOutlines[direction === "end" ? "start" : "end"];
    if (prevOutline.length !== startOutline.length || prevOutline.some(function (value, i) {
      return value !== startOutline[i];
    })) {
      return {
        start: __spreadArray([], startOutline, true),
        end: __spreadArray([], startOutline, true)
      };
    }
    return prevOutlines;
  };
  __proto._syncItemInfos = function (nextItemInfos, prevItemKeys) {
    if (prevItemKeys === void 0) {
      prevItemKeys = {};
    }
    var horizontal = this.options.horizontal;
    var nextItemKeys = this.itemKeys;
    nextItemInfos.filter(function (info) {
      return info.key != null;
    }).forEach(function (info) {
      var key = info.key;
      var prevItem = prevItemKeys[key];
      if (!prevItem) {
        nextItemKeys[key] = new InfiniteGridItem(horizontal, __assign({}, info));
      } else if (prevItem.type === exports.ITEM_TYPE.VIRTUAL && info.type !== exports.ITEM_TYPE.VIRTUAL) {
        nextItemKeys[key] = new InfiniteGridItem(horizontal, __assign({
          orgRect: prevItem.orgRect,
          rect: prevItem.rect
        }, info));
      } else {
        if (info.data) {
          prevItem.data = info.data;
        }
        if (info.groupKey != null) {
          prevItem.groupKey = info.groupKey;
        }
        if (info.element) {
          prevItem.element = info.element;
        }
        nextItemKeys[key] = prevItem;
      }
    });
    var nextItems = nextItemInfos.map(function (info) {
      var key = info.key;
      if (info.key == null) {
        key = makeKey(nextItemKeys, info.type === exports.ITEM_TYPE.VIRTUAL ? "virtual_" : "");
      }
      var item = nextItemKeys[key];
      if (!item) {
        var prevItem = prevItemKeys[key];
        if (prevItem) {
          item = prevItem;
          if (info.data) {
            item.data = info.data;
          }
          if (info.element) {
            item.element = info.element;
          }
        } else {
          item = new InfiniteGridItem(horizontal, __assign(__assign({}, info), {
            key: key
          }));
        }
        nextItemKeys[key] = item;
      }
      return item;
    });
    return nextItems;
  };
  __proto._registerGroups = function (groups) {
    var nextGroupKeys = {};
    groups.forEach(function (group) {
      nextGroupKeys[group.groupKey] = group;
    });
    this.groups = groups;
    this.groupKeys = nextGroupKeys;
    this.groupItems = this._getGroupItems();
  };
  __proto._splitVirtualGroups = function (direction, nextGroups) {
    var groups = splitVirtualGroups(this.groups, direction, nextGroups);
    var itemKeys = this.itemKeys;
    groups.forEach(function (_a) {
      var renderItems = _a.renderItems;
      renderItems.forEach(function (item) {
        itemKeys[item.key] = item;
      });
    });
    return groups;
  };
  __proto._mergeVirtualGroups = function (groups) {
    var itemKeys = this.itemKeys;
    var groupKeys = this.groupKeys;
    groups.forEach(function (group) {
      var prevGroup = groupKeys[group.groupKey];
      if (!prevGroup) {
        return;
      }
      var items = group.items;
      if (items.every(function (item) {
        return item.mountState === Grid.MOUNT_STATE.UNCHECKED;
      })) {
        prevGroup.renderItems.forEach(function (item) {
          if (item.type === exports.ITEM_TYPE.VIRTUAL && !itemKeys[item.key]) {
            items.push(item);
            itemKeys[item.key] = item;
          }
        });
      }
    });
    return groups;
  };
  __proto._updatePlaceholder = function (items) {
    if (items === void 0) {
      items = this.groupItems;
    }
    var placeholder = this._placeholder;
    if (!placeholder) {
      return;
    }
    items.filter(function (item) {
      return item.type === exports.ITEM_TYPE.VIRTUAL;
    }).forEach(function (item) {
      setPlaceholder(item, placeholder);
    });
  };
  __proto._makeGrid = function () {
    var GridConstructor = this.options.gridConstructor;
    var gridOptions = this.gridOptions;
    var container = this.containerElement;
    return new GridConstructor(container, __assign(__assign({}, gridOptions), {
      useFit: false,
      autoResize: false,
      useResizeObserver: false,
      observeChildren: false,
      renderOnPropertyChange: false,
      externalContainerManager: this.containerManager,
      externalItemRenderer: this.itemRenderer
    }));
  };
  __proto._getLoadingGroup = function () {
    var loadingGrid = this._loadingGrid;
    var items = loadingGrid.getItems();
    return {
      groupKey: LOADING_GROUP_KEY,
      type: exports.GROUP_TYPE.NORMAL,
      grid: loadingGrid,
      items: items,
      renderItems: items
    };
  };
  __proto._getLoadingItem = function () {
    return this._loadingGrid.getLoadingItem();
  };
  GroupManager.defaultOptions = __assign(__assign({}, Grid.defaultOptions), {
    appliedItemChecker: function () {
      return false;
    },
    gridConstructor: null,
    gridOptions: {}
  });
  GroupManager.propertyTypes = __assign(__assign({}, Grid.propertyTypes), {
    gridConstructor: Grid.PROPERTY_TYPE.PROPERTY,
    gridOptions: Grid.PROPERTY_TYPE.PROPERTY
  });
  GroupManager = __decorate([Grid.GetterSetter], GroupManager);
  return GroupManager;
}(Grid);

var Infinite = /*#__PURE__*/function (_super) {
  __extends(Infinite, _super);
  function Infinite(options) {
    var _this = _super.call(this) || this;
    _this.startCursor = -1;
    _this.endCursor = -1;
    _this.size = 0;
    _this.items = [];
    _this.itemKeys = {};
    _this.options = __assign({
      threshold: 0,
      useRecycle: true,
      defaultDirection: "end"
    }, options);
    return _this;
  }
  var __proto = Infinite.prototype;
  __proto.scroll = function (scrollPos) {
    var _a, _b;
    var prevStartCursor = this.startCursor;
    var prevEndCursor = this.endCursor;
    var items = this.items;
    var length = items.length;
    var size = this.size;
    var _c = this.options,
      defaultDirection = _c.defaultDirection,
      threshold = _c.threshold,
      useRecycle = _c.useRecycle;
    var isDirectionEnd = defaultDirection === "end";
    if (!length) {
      this.trigger(isDirectionEnd ? "requestAppend" : "requestPrepend", {
        key: undefined,
        isVirtual: false
      });
      return;
    } else if (prevStartCursor === -1 || prevEndCursor === -1) {
      var nextCursor = isDirectionEnd ? 0 : length - 1;
      this.trigger("change", {
        prevStartCursor: prevStartCursor,
        prevEndCursor: prevEndCursor,
        nextStartCursor: nextCursor,
        nextEndCursor: nextCursor
      });
      return;
    }
    var endScrollPos = scrollPos + size;
    var startEdgePos = Math.max.apply(Math, items[prevStartCursor].startOutline);
    var endEdgePos = Math.min.apply(Math, items[prevEndCursor].endOutline);
    var visibles = items.map(function (item) {
      var startOutline = item.startOutline,
        endOutline = item.endOutline;
      if (!startOutline.length || !endOutline.length || isFlatOutline(startOutline, endOutline)) {
        return false;
      }
      var startPos = Math.min.apply(Math, startOutline);
      var endPos = Math.max.apply(Math, endOutline);
      if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
        return true;
      }
      return false;
    });
    var hasStartItems = 0 < prevStartCursor;
    var hasEndItems = prevEndCursor < length - 1;
    var isStart = scrollPos <= startEdgePos + threshold;
    var isEnd = endScrollPos >= endEdgePos - threshold;
    var nextStartCursor = visibles.indexOf(true);
    var nextEndCursor = visibles.lastIndexOf(true);
    if (nextStartCursor === -1) {
      nextStartCursor = prevStartCursor;
      nextEndCursor = prevEndCursor;
    }
    if (!useRecycle) {
      nextStartCursor = Math.min(nextStartCursor, prevStartCursor);
      nextEndCursor = Math.max(nextEndCursor, prevEndCursor);
    }
    if (nextStartCursor === prevStartCursor && hasStartItems && isStart) {
      nextStartCursor -= 1;
    }
    if (nextEndCursor === prevEndCursor && hasEndItems && isEnd) {
      nextEndCursor += 1;
    }
    var nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);
    // It must contain no virtual items.
    if (nextVisibleItems.every(function (item) {
      return item.isVirtual === true;
    })) {
      // The real item can be in either the start or end direction.
      var hasRealItem = false;
      for (var i = nextStartCursor - 1; i >= 0; --i) {
        if (!items[i].isVirtual) {
          nextStartCursor = i;
          hasRealItem = true;
          break;
        }
      }
      if (!hasRealItem) {
        for (var i = nextEndCursor + 1; i < length; ++i) {
          if (!items[i].isVirtual) {
            nextEndCursor = i;
            hasRealItem = true;
            break;
          }
        }
      }
      if (hasRealItem) {
        nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);
      }
    }
    var hasVirtualItems = nextVisibleItems.some(function (item) {
      return item.isVirtual === true;
    });
    if (prevStartCursor !== nextStartCursor || prevEndCursor !== nextEndCursor) {
      this.trigger("change", {
        prevStartCursor: prevStartCursor,
        prevEndCursor: prevEndCursor,
        nextStartCursor: nextStartCursor,
        nextEndCursor: nextEndCursor
      });
      if (!hasVirtualItems) {
        return;
      }
    }
    // If a virtual item is included, a requestPrepend (or requestAppend) event is triggered.
    if (hasVirtualItems) {
      var isStartVirtual = (_a = nextVisibleItems[0]) === null || _a === void 0 ? void 0 : _a.isVirtual;
      var isEndVirtual = (_b = nextVisibleItems[nextVisibleItems.length - 1]) === null || _b === void 0 ? void 0 : _b.isVirtual;
      if ((!isDirectionEnd || !isEnd) && isStartVirtual) {
        var realItemIndex = findIndex(nextVisibleItems, function (item) {
          return !item.isVirtual;
        });
        var endVirtualItemIndex = (realItemIndex === -1 ? nextVisibleItems.length : realItemIndex) - 1;
        if (nextVisibleItems[endVirtualItemIndex]) {
          this.trigger("requestPrepend", {
            key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
            nextKey: nextVisibleItems[endVirtualItemIndex].key,
            nextKeys: nextVisibleItems.slice(0, endVirtualItemIndex + 1).map(function (item) {
              return item.key;
            }),
            isVirtual: true
          });
        }
      } else if ((isDirectionEnd || !isStart) && isEndVirtual) {
        var realItemIndex = findLastIndex(nextVisibleItems, function (item) {
          return !item.isVirtual;
        });
        var startVirtualItemIndex = realItemIndex + 1;
        if (nextVisibleItems[startVirtualItemIndex]) {
          this.trigger("requestAppend", {
            key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
            nextKey: nextVisibleItems[startVirtualItemIndex].key,
            nextKeys: nextVisibleItems.slice(startVirtualItemIndex).map(function (item) {
              return item.key;
            }),
            isVirtual: true
          });
        }
      }
    } else if (!this._requestVirtualItems()) {
      if ((!isDirectionEnd || !isEnd) && isStart) {
        this.trigger("requestPrepend", {
          key: items[prevStartCursor].key,
          isVirtual: false
        });
      } else if ((isDirectionEnd || !isStart) && isEnd) {
        this.trigger("requestAppend", {
          key: items[prevEndCursor].key,
          isVirtual: false
        });
      }
    }
  };
  /**
   * Call the requestAppend or requestPrepend event to fill the virtual items.
   * @ko virtual item을 채우기 위해 requestAppend 또는 requestPrepend 이벤트를 호출합니다.
   * @return - Whether the event is called. <ko>이벤트를 호출했는지 여부.</ko>
   */
  __proto._requestVirtualItems = function () {
    var isDirectionEnd = this.options.defaultDirection === "end";
    var items = this.items;
    var totalVisibleItems = this.getVisibleItems();
    var visibleItems = totalVisibleItems.filter(function (item) {
      return !item.isVirtual;
    });
    var totalVisibleLength = totalVisibleItems.length;
    var visibleLength = visibleItems.length;
    var startCursor = this.getStartCursor();
    var endCursor = this.getEndCursor();
    if (visibleLength === totalVisibleLength) {
      return false;
    } else if (visibleLength) {
      var startKey_1 = visibleItems[0].key;
      var endKey_1 = visibleItems[visibleLength - 1].key;
      var startIndex = findIndex(items, function (item) {
        return item.key === startKey_1;
      }) - 1;
      var endIndex = findIndex(items, function (item) {
        return item.key === endKey_1;
      }) + 1;
      var isEnd = endIndex <= endCursor;
      var isStart = startIndex >= startCursor;
      // Fill the placeholder with the original item.
      if ((isDirectionEnd || !isStart) && isEnd) {
        this.trigger("requestAppend", {
          key: endKey_1,
          nextKey: items[endIndex].key,
          isVirtual: true
        });
        return true;
      } else if ((!isDirectionEnd || !isEnd) && isStart) {
        this.trigger("requestPrepend", {
          key: startKey_1,
          nextKey: items[startIndex].key,
          isVirtual: true
        });
        return true;
      }
    } else if (totalVisibleLength) {
      var lastItem = totalVisibleItems[totalVisibleLength - 1];
      if (isDirectionEnd) {
        this.trigger("requestAppend", {
          nextKey: totalVisibleItems[0].key,
          isVirtual: true
        });
      } else {
        this.trigger("requestPrepend", {
          nextKey: lastItem.key,
          isVirtual: true
        });
      }
      return true;
    }
    return false;
  };
  __proto.setCursors = function (startCursor, endCursor) {
    this.startCursor = startCursor;
    this.endCursor = endCursor;
  };
  __proto.setSize = function (size) {
    this.size = size;
  };
  __proto.getStartCursor = function () {
    return this.startCursor;
  };
  __proto.getEndCursor = function () {
    return this.endCursor;
  };
  __proto.isLoading = function (direction) {
    var startCursor = this.startCursor;
    var endCursor = this.endCursor;
    var items = this.items;
    var firstItem = items[startCursor];
    var lastItem = items[endCursor];
    var length = items.length;
    if (direction === DIRECTION.END && endCursor > -1 && endCursor < length - 1 && !lastItem.isVirtual && !isFlatOutline(lastItem.startOutline, lastItem.endOutline)) {
      return false;
    }
    if (direction === DIRECTION.START && startCursor > 0 && !firstItem.isVirtual && !isFlatOutline(firstItem.startOutline, firstItem.endOutline)) {
      return false;
    }
    return true;
  };
  __proto.setItems = function (nextItems) {
    this.items = nextItems;
    var itemKeys = {};
    nextItems.forEach(function (item) {
      itemKeys[item.key] = item;
    });
    this.itemKeys = itemKeys;
  };
  __proto.syncItems = function (nextItems) {
    var prevItems = this.items;
    var prevStartCursor = this.startCursor;
    var prevEndCursor = this.endCursor;
    var _a = getNextCursors(this.items.map(function (item) {
        return item.key;
      }), nextItems.map(function (item) {
        return item.key;
      }), prevStartCursor, prevEndCursor),
      nextStartCursor = _a.startCursor,
      nextEndCursor = _a.endCursor;
    // sync items between cursors
    var isChange = nextEndCursor - nextStartCursor !== prevEndCursor - prevStartCursor || prevStartCursor === -1 || nextStartCursor === -1;
    if (!isChange) {
      var prevVisibleItems = prevItems.slice(prevStartCursor, prevEndCursor + 1);
      var nextVisibleItems = nextItems.slice(nextStartCursor, nextEndCursor + 1);
      var visibleResult = listDiffer.diff(prevVisibleItems, nextVisibleItems, function (item) {
        return item.key;
      });
      isChange = visibleResult.added.length > 0 || visibleResult.removed.length > 0 || visibleResult.changed.length > 0;
    }
    this.setItems(nextItems);
    this.setCursors(nextStartCursor, nextEndCursor);
    return isChange;
  };
  __proto.getItems = function () {
    return this.items;
  };
  __proto.getVisibleItems = function () {
    var startCursor = this.startCursor;
    var endCursor = this.endCursor;
    if (startCursor === -1) {
      return [];
    }
    return this.items.slice(startCursor, endCursor + 1);
  };
  __proto.getItemByKey = function (key) {
    return this.itemKeys[key];
  };
  __proto.getRenderedVisibleItems = function () {
    var items = this.getVisibleItems();
    var rendered = items.map(function (_a) {
      var startOutline = _a.startOutline,
        endOutline = _a.endOutline;
      var length = startOutline.length;
      if (length === 0 || length !== endOutline.length) {
        return false;
      }
      return startOutline.some(function (pos, i) {
        return endOutline[i] !== pos;
      });
    });
    var startIndex = rendered.indexOf(true);
    var endIndex = rendered.lastIndexOf(true);
    return endIndex === -1 ? [] : items.slice(startIndex, endIndex + 1);
  };
  __proto.destroy = function () {
    this.off();
    this.startCursor = -1;
    this.endCursor = -1;
    this.items = [];
    this.size = 0;
  };
  return Infinite;
}(Component);

var Renderer = /*#__PURE__*/function (_super) {
  __extends(Renderer, _super);
  function Renderer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.items = [];
    _this.container = null;
    _this.rendererKey = 0;
    _this._updateTimer = 0;
    _this._state = {};
    _this._isItemChanged = false;
    return _this;
  }
  var __proto = Renderer.prototype;
  __proto.updateKey = function () {
    this.rendererKey = Date.now();
  };
  __proto.getItems = function () {
    return this.items;
  };
  __proto.setContainer = function (container) {
    this.container = container;
  };
  __proto.render = function (nextItems, state) {
    return this.syncItems(nextItems, state);
  };
  __proto.update = function (state) {
    var _this = this;
    if (state === void 0) {
      state = {};
    }
    this._state = __assign(__assign({}, this._state), state);
    this.trigger("update", {
      state: state
    });
    clearTimeout(this._updateTimer);
    this._updateTimer = window.setTimeout(function () {
      _this.trigger("requestUpdate", {
        state: state
      });
    });
  };
  __proto.updated = function (nextElements) {
    var _a, _b;
    if (nextElements === void 0) {
      nextElements = (_b = (_a = this.container) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
    }
    var diffResult = this._diffResult;
    var isChanged = !!(diffResult.added.length || diffResult.removed.length || diffResult.changed.length);
    var state = this._state;
    var isItemChanged = this._isItemChanged;
    var nextItems = diffResult.list;
    this._isItemChanged = false;
    this._state = {};
    this.items = nextItems;
    nextItems.forEach(function (item, i) {
      item.element = nextElements[i];
    });
    this.trigger("updated", {
      items: nextItems,
      elements: toArray(nextElements),
      diffResult: this._diffResult,
      state: state,
      isItemChanged: isItemChanged,
      isChanged: isChanged
    });
    return isChanged;
  };
  __proto.syncItems = function (items, state) {
    if (state === void 0) {
      state = {};
    }
    var rendererKey = this.rendererKey;
    var prevItems = this.items;
    var nextItems = items.map(function (item) {
      return __assign(__assign({}, item), {
        renderKey: "".concat(rendererKey, "_").concat(item.key)
      });
    });
    var result = listDiffer.diff(prevItems, nextItems, function (item) {
      return item.renderKey;
    });
    this._isItemChanged = !!result.added.length || !!result.removed.length || !!result.changed.length;
    this._state = __assign(__assign({}, this._state), state);
    this._diffResult = result;
    return result;
  };
  __proto.destroy = function () {
    this.off();
  };
  return Renderer;
}(Component);

var VanillaRenderer = /*#__PURE__*/function (_super) {
  __extends(VanillaRenderer, _super);
  function VanillaRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = VanillaRenderer.prototype;
  __proto.render = function (nextItems, state) {
    var container = this.container;
    var result = _super.prototype.render.call(this, nextItems, state);
    var prevList = result.prevList,
      removed = result.removed,
      ordered = result.ordered,
      added = result.added,
      list = result.list;
    var diffList = __spreadArray([], prevList, true);
    removed.forEach(function (index) {
      diffList.splice(index, 1);
      container.removeChild(prevList[index].element);
    });
    ordered.forEach(function (_a) {
      var _b, _c;
      var prevIndex = _a[0],
        nextIndex = _a[1];
      var item = diffList.splice(prevIndex, 1)[0];
      diffList.splice(nextIndex, 0, item);
      container.insertBefore(item.element, (_c = (_b = diffList[nextIndex + 1]) === null || _b === void 0 ? void 0 : _b.element) !== null && _c !== void 0 ? _c : null);
    });
    added.forEach(function (index) {
      var _a, _b;
      var item = list[index];
      diffList.splice(index, 0, item);
      container.insertBefore(item.element, (_b = (_a = diffList[index + 1]) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null);
    });
    this.updated(container.children);
    return result;
  };
  return VanillaRenderer;
}(Renderer);

var VanillaGridRenderer = /*#__PURE__*/function (_super) {
  __extends(VanillaGridRenderer, _super);
  function VanillaGridRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  var __proto = VanillaGridRenderer.prototype;
  __proto.syncItems = function (nextItems) {
    var result = _super.prototype.syncItems.call(this, nextItems);
    var added = result.added,
      list = result.list;
    added.forEach(function (index) {
      var orgItem = nextItems[index].orgItem;
      if (orgItem.html && !orgItem.element) {
        orgItem.element = convertHTMLtoElement(orgItem.html)[0];
      }
      list[index].element = orgItem.element;
    });
    return result;
  };
  return VanillaGridRenderer;
}(VanillaRenderer);

var ScrollManager = /*#__PURE__*/function (_super) {
  __extends(ScrollManager, _super);
  function ScrollManager(wrapper, options) {
    var _this = _super.call(this) || this;
    _this.wrapper = wrapper;
    _this.prevScrollPos = null;
    _this.scrollOffset = 0;
    _this.contentSize = 0;
    _this._isScrollIssue = IS_IOS;
    _this._onCheck = function () {
      var prevScrollPos = _this.getScrollPos();
      var nextScrollPos = _this.getOrgScrollPos();
      _this.setScrollPos(nextScrollPos);
      if (prevScrollPos === null || _this._isScrollIssue && nextScrollPos === 0 || prevScrollPos === nextScrollPos) {
        nextScrollPos && (_this._isScrollIssue = false);
        return;
      }
      _this._isScrollIssue = false;
      _this.trigger(new Component.ComponentEvent("scroll", {
        direction: prevScrollPos < nextScrollPos ? "end" : "start",
        scrollPos: nextScrollPos,
        relativeScrollPos: _this.getRelativeScrollPos()
      }));
    };
    _this.options = __assign({
      container: false,
      containerTag: "div",
      horizontal: false,
      scrollContainer: null
    }, options);
    _this._init();
    return _this;
  }
  var __proto = ScrollManager.prototype;
  __proto.getWrapper = function () {
    return this.wrapper;
  };
  __proto.getContainer = function () {
    return this.container;
  };
  __proto.getScrollContainer = function () {
    return this.scrollContainer;
  };
  __proto.getScrollOffset = function () {
    return this.scrollOffset;
  };
  __proto.getContentSize = function () {
    return this.contentSize;
  };
  __proto.getRelativeScrollPos = function () {
    return (this.prevScrollPos || 0) - this.scrollOffset;
  };
  __proto.getScrollPos = function () {
    return this.prevScrollPos;
  };
  __proto.setScrollPos = function (pos) {
    this.prevScrollPos = pos;
  };
  __proto.getOrgScrollPos = function () {
    var eventTarget = this.eventTarget;
    var horizontal = this.options.horizontal;
    var prop = "scroll".concat(horizontal ? "Left" : "Top");
    if (isWindow(eventTarget)) {
      return window[horizontal ? "pageXOffset" : "pageYOffset"] || document.documentElement[prop] || document.body[prop];
    } else {
      return eventTarget[prop];
    }
  };
  __proto.setStatus = function (status) {
    this.contentSize = status.contentSize;
    this.scrollOffset = status.scrollOffset;
    this.prevScrollPos = status.prevScrollPos;
    this.scrollTo(this.prevScrollPos);
  };
  __proto.getStatus = function () {
    return {
      contentSize: this.contentSize,
      scrollOffset: this.scrollOffset,
      prevScrollPos: this.prevScrollPos
    };
  };
  __proto.scrollTo = function (pos) {
    var eventTarget = this.eventTarget;
    var horizontal = this.options.horizontal;
    var _a = horizontal ? [pos, 0] : [0, pos],
      x = _a[0],
      y = _a[1];
    if (isWindow(eventTarget)) {
      eventTarget.scroll(x, y);
    } else {
      eventTarget.scrollLeft = x;
      eventTarget.scrollTop = y;
    }
  };
  __proto.scrollBy = function (pos) {
    if (!pos) {
      return;
    }
    var eventTarget = this.eventTarget;
    var horizontal = this.options.horizontal;
    var _a = horizontal ? [pos, 0] : [0, pos],
      x = _a[0],
      y = _a[1];
    this.prevScrollPos += pos;
    if (isWindow(eventTarget)) {
      eventTarget.scrollBy(x, y);
    } else {
      eventTarget.scrollLeft += x;
      eventTarget.scrollTop += y;
    }
  };
  __proto.resize = function () {
    var scrollContainer = this.scrollContainer;
    var horizontal = this.options.horizontal;
    var isBody = scrollContainer === document.body;
    var scrollContainerRect = isBody ? {
      top: 0,
      left: 0
    } : scrollContainer.getBoundingClientRect();
    var containerRect = this.container.getBoundingClientRect();
    this.scrollOffset = (this.prevScrollPos || 0) + (horizontal ? containerRect.left - scrollContainerRect.left : containerRect.top - scrollContainerRect.top);
    if (isBody) {
      this.contentSize = horizontal ? window.innerWidth : window.innerHeight;
    } else {
      this.contentSize = horizontal ? scrollContainer.offsetWidth : scrollContainer.offsetHeight;
    }
  };
  __proto.destroy = function () {
    var container = this.container;
    this.eventTarget.removeEventListener("scroll", this._onCheck);
    if (this._isCreateElement) {
      var scrollContainer = this.scrollContainer;
      var fragment_1 = document.createDocumentFragment();
      var childNodes = toArray(container.childNodes);
      scrollContainer.removeChild(container);
      childNodes.forEach(function (childNode) {
        fragment_1.appendChild(childNode);
      });
      scrollContainer.appendChild(fragment_1);
    } else if (this.options.container) {
      container.style.cssText = this._orgCSSText;
    }
  };
  __proto._init = function () {
    var _a;
    var _b = this.options,
      containerOption = _b.container,
      containerTag = _b.containerTag,
      horizontal = _b.horizontal,
      scrollContainerOption = _b.scrollContainer;
    var wrapper = this.wrapper;
    var scrollContainer = wrapper;
    var container = wrapper;
    var containerCSSText = "";
    if (!containerOption) {
      scrollContainer = core.findTarget(scrollContainerOption) || document.body;
      containerCSSText = container.style.cssText;
    } else {
      if (containerOption === true) {
        // Create Container
        container = document.createElement(containerTag);
        container.style.position = "relative";
        container.className = CONTAINER_CLASS_NAME;
        var childNodes = toArray(scrollContainer.childNodes);
        childNodes.forEach(function (childNode) {
          container.appendChild(childNode);
        });
        scrollContainer.appendChild(container);
        this._isCreateElement = true;
      } else {
        // Find Container
        container = core.findTarget(containerOption);
      }
      containerCSSText = container.style.cssText;
      var style = scrollContainer.style;
      _a = horizontal ? ["scroll", "hidden"] : ["hidden", "scroll"], style.overflowX = _a[0], style.overflowY = _a[1];
      if (horizontal) {
        container.style.height = "100%";
      }
    }
    var eventTarget = scrollContainer === document.body ? window : scrollContainer;
    eventTarget.addEventListener("scroll", this._onCheck);
    this._orgCSSText = containerCSSText;
    this.container = container;
    this.scrollContainer = scrollContainer;
    this.eventTarget = eventTarget;
    this.resize();
    this.setScrollPos(this.getOrgScrollPos());
  };
  return ScrollManager;
}(Component);

/**
 * A module used to arrange items including content infinitely according to layout type. With this module, you can implement various layouts composed of different items whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 아이템을 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 아이템을 다양한 레이아웃으로 배치할 수 있다. 아이템의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @example
```html
<ul id="grid">
  <li class="card">
    <div>test1</div>
  </li>
  <li class="card">
    <div>test2</div>
  </li>
  <li class="card">
    <div>test3</div>
  </li>
  <li class="card">
    <div>test4</div>
  </li>
  <li class="card">
    <div>test5</div>
  </li>
  <li class="card">
    <div>test6</div>
  </li>
</ul>
<script>
import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
var some = new MasonryInfiniteGrid("#grid").on("renderComplete", function(e) {
  // ...
});
// If you already have items in the container, call "layout" method.
some.renderItems();
</script>
```
 */
var InfiniteGrid = /*#__PURE__*/function (_super) {
  __extends(InfiniteGrid, _super);
  /**
   * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
   * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
   */
  function InfiniteGrid(wrapper, options) {
    var _this = _super.call(this) || this;
    _this._waitType = "";
    _this._onScroll = function (_a) {
      var direction = _a.direction,
        scrollPos = _a.scrollPos,
        relativeScrollPos = _a.relativeScrollPos;
      _this._scroll();
      /**
       * This event is fired when scrolling.
       * @ko 스크롤하면 발생하는 이벤트이다.
       * @event InfiniteGrid#changeScroll
       * @param {InfiniteGrid.OnChangeScroll} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
       */
      _this.trigger(new Component.ComponentEvent(INFINITEGRID_EVENTS.CHANGE_SCROLL, {
        direction: direction,
        scrollPos: scrollPos,
        relativeScrollPos: relativeScrollPos
      }));
    };
    _this._onChange = function (e) {
      _this.setCursors(e.nextStartCursor, e.nextEndCursor);
    };
    _this._onRendererUpdated = function (e) {
      var renderedItems = e.items;
      renderedItems.forEach(function (item) {
        // set grid element
        var gridItem = item.orgItem;
        gridItem.element = item.element;
      });
      if (!e.isChanged) {
        _this._checkEndLoading();
        _this._scroll();
        return;
      }
      var _a = e.diffResult,
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList,
        list = _a.list;
      removed.forEach(function (index) {
        var orgItem = prevList[index].orgItem;
        if (orgItem.mountState !== Grid.MOUNT_STATE.UNCHECKED) {
          orgItem.mountState = Grid.MOUNT_STATE.UNMOUNTED;
        }
      });
      var horizontal = _this.options.horizontal;
      var addedItems = added.map(function (index) {
        var gridItem = list[index].orgItem;
        var element = gridItem.element;
        if (gridItem.type === exports.ITEM_TYPE.VIRTUAL) {
          var cssRect = __assign({}, gridItem.cssRect);
          var rect = gridItem.rect;
          if (!cssRect.width && rect.width) {
            cssRect.width = rect.width;
          }
          if (!cssRect.height && rect.height) {
            cssRect.height = rect.height;
          }
          // virtual item
          return new Grid.GridItem(horizontal, {
            element: element,
            cssRect: cssRect
          });
        }
        return gridItem;
      });
      var containerManager = _this.containerManager;
      if (_this.options.observeChildren) {
        containerManager.observeChildren(added.map(function (index) {
          return list[index].element;
        }));
        containerManager.unobserveChildren(removed.map(function (index) {
          return prevList[index].element;
        }));
      }
      var _b = e.state,
        isRestore = _b.isRestore,
        isResize = _b.isResize;
      _this.itemRenderer.renderItems(addedItems);
      if (isRestore) {
        _this._onRenderComplete({
          mounted: added.map(function (index) {
            return list[index].orgItem;
          }),
          updated: [],
          isResize: false,
          direction: _this.defaultDirection
        });
      }
      if (!isRestore || isResize || e.isItemChanged) {
        _this.groupManager.renderItems();
      }
    };
    _this._onResize = function (e) {
      if (e.isResizeContainer) {
        _this._renderItems({
          useResize: true
        }, true);
      } else {
        var updatedItems = Grid.getUpdatedItems(_this.getVisibleItems(), e.childEntries);
        if (updatedItems.length > 0) {
          _this.updateItems(updatedItems);
        }
      }
    };
    _this._onRequestAppend = function (e) {
      /**
       * The event is fired when scrolling reaches the end or when data for a virtual group is required.
       * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
       * @event InfiniteGrid#requestAppend
       * @param {InfiniteGrid.OnRequestAppend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
       */
      _this._onRequestInsert(DIRECTION.END, INFINITEGRID_EVENTS.REQUEST_APPEND, e);
    };
    _this._onRequestPrepend = function (e) {
      /**
       * The event is fired when scrolling reaches the start or when data for a virtual group is required.
       * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
       * @event InfiniteGrid#requestPrepend
       * @param {InfiniteGrid.OnRequestPrepend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
       */
      _this._onRequestInsert(DIRECTION.START, INFINITEGRID_EVENTS.REQUEST_PREPEND, e);
    };
    _this._onContentError = function (_a) {
      var element = _a.element,
        target = _a.target,
        item = _a.item,
        update = _a.update;
      /**
       * The event is fired when scrolling reaches the start or when data for a virtual group is required.
       * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
       * @event InfiniteGrid#contentError
       * @param {InfiniteGrid.OnContentError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
       */
      _this.trigger(new Component.ComponentEvent(INFINITEGRID_EVENTS.CONTENT_ERROR, {
        element: element,
        target: target,
        item: item,
        update: update,
        remove: function () {
          _this.removeByKey(item.key);
        }
      }));
    };
    _this._onRenderComplete = function (_a) {
      var isResize = _a.isResize,
        mounted = _a.mounted,
        updated = _a.updated,
        direction = _a.direction;
      var infinite = _this.infinite;
      var prevRenderedGroups = infinite.getRenderedVisibleItems();
      var length = prevRenderedGroups.length;
      var isDirectionEnd = direction === DIRECTION.END;
      _this._syncInfinite();
      if (length) {
        var prevStandardGroup = prevRenderedGroups[isDirectionEnd ? 0 : length - 1];
        var nextStandardGroup = infinite.getItemByKey(prevStandardGroup.key);
        var offset = isDirectionEnd ? Math.min.apply(Math, nextStandardGroup.startOutline) - Math.min.apply(Math, prevStandardGroup.startOutline) : Math.max.apply(Math, nextStandardGroup.endOutline) - Math.max.apply(Math, prevStandardGroup.endOutline);
        _this.scrollManager.scrollBy(offset);
      }
      /**
       * This event is fired when the InfiniteGrid has completed rendering.
       * @ko InfiniteGrid가 렌더링이 완료됐을 때 이벤트가 발생한다.
       * @event InfiniteGrid#renderComplete
       * @param {InfiniteGrid.OnRenderComplete} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
       */
      _this.trigger(new Component.ComponentEvent(INFINITEGRID_EVENTS.RENDER_COMPLETE, {
        isResize: isResize,
        direction: direction,
        mounted: mounted.filter(function (item) {
          return item.type !== exports.ITEM_TYPE.LOADING;
        }),
        updated: updated.filter(function (item) {
          return item.type !== exports.ITEM_TYPE.LOADING;
        }),
        startCursor: _this.getStartCursor(),
        endCursor: _this.getEndCursor(),
        items: _this.getVisibleItems(true),
        groups: _this.getVisibleGroups(true)
      }));
      if (_this.groupManager.shouldRerenderItems()) {
        _this._update();
      } else {
        _this._checkEndLoading();
        _this._scroll();
      }
    };
    _this.options = __assign(__assign(__assign({}, _this.constructor.defaultOptions), {
      renderer: new VanillaGridRenderer().on("requestUpdate", function () {
        return _this._render();
      })
    }), options);
    var _a = _this.options,
      gridConstructor = _a.gridConstructor,
      containerTag = _a.containerTag,
      container = _a.container,
      renderer = _a.renderer,
      threshold = _a.threshold,
      useRecycle = _a.useRecycle,
      scrollContainer = _a.scrollContainer,
      appliedItemChecker = _a.appliedItemChecker,
      gridOptions = __rest(_a, ["gridConstructor", "containerTag", "container", "renderer", "threshold", "useRecycle", "scrollContainer", "appliedItemChecker"]);
    // options.container === false, wrapper = container, scrollContainer = document.body
    // options.container === true, wrapper = scrollContainer, container = wrapper's child
    // options.container === string,
    var horizontal = gridOptions.horizontal,
      attributePrefix = gridOptions.attributePrefix,
      useTransform = gridOptions.useTransform,
      percentage = gridOptions.percentage,
      isConstantSize = gridOptions.isConstantSize,
      isEqualSize = gridOptions.isEqualSize,
      autoResize = gridOptions.autoResize,
      useResizeObserver = gridOptions.useResizeObserver,
      resizeDebounce = gridOptions.resizeDebounce,
      maxResizeDebounce = gridOptions.maxResizeDebounce,
      defaultDirection = gridOptions.defaultDirection;
    var wrapperElement = isString(wrapper) ? document.querySelector(wrapper) : wrapper;
    var scrollManager = new ScrollManager(wrapperElement, {
      scrollContainer: scrollContainer,
      container: container,
      containerTag: containerTag,
      horizontal: horizontal
    }).on({
      scroll: _this._onScroll
    });
    var containerElement = scrollManager.getContainer();
    var containerManager = new Grid.ContainerManager(containerElement, {
      horizontal: horizontal,
      autoResize: autoResize,
      resizeDebounce: resizeDebounce,
      maxResizeDebounce: maxResizeDebounce,
      useResizeObserver: useResizeObserver
    }).on("resize", _this._onResize);
    var itemRenderer = new Grid.ItemRenderer({
      attributePrefix: attributePrefix,
      horizontal: horizontal,
      useTransform: useTransform,
      percentage: percentage,
      isEqualSize: isEqualSize,
      isConstantSize: isConstantSize
    });
    var infinite = new Infinite({
      defaultDirection: defaultDirection,
      useRecycle: useRecycle,
      threshold: threshold
    }).on({
      "change": _this._onChange,
      "requestAppend": _this._onRequestAppend,
      "requestPrepend": _this._onRequestPrepend
    });
    infinite.setSize(scrollManager.getContentSize());
    var groupManager = new GroupManager(containerElement, {
      appliedItemChecker: appliedItemChecker,
      gridConstructor: gridConstructor,
      externalItemRenderer: itemRenderer,
      externalContainerManager: containerManager,
      gridOptions: gridOptions
    });
    groupManager.on({
      "renderComplete": _this._onRenderComplete,
      "contentError": _this._onContentError
    });
    renderer.setContainer(containerElement);
    renderer.on("updated", _this._onRendererUpdated);
    _this.itemRenderer = itemRenderer;
    _this.groupManager = groupManager;
    _this.wrapperElement = wrapperElement;
    _this.scrollManager = scrollManager;
    _this.containerManager = containerManager;
    _this.infinite = infinite;
    _this.containerManager.resize();
    return _this;
  }
  var __proto = InfiniteGrid.prototype;
  InfiniteGrid_1 = InfiniteGrid;
  /**
   * Rearrange items to fit the grid and render them. When rearrange is complete, the `renderComplete` event is fired.
   * @ko grid에 맞게 아이템을 재배치하고 렌더링을 한다. 배치가 완료되면 `renderComplete` 이벤트가 발생한다.
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   * @example
   * ```ts
   * import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
   * const grid = new MasonryInfiniteGrid();
   *
   * grid.on("renderComplete", e => {
   *   console.log(e);
   * });
   * grid.renderItems();
   * ```
   */
  __proto.renderItems = function (options) {
    if (options === void 0) {
      options = {};
    }
    this._renderItems(options);
    return this;
  };
  /**
   * Returns the wrapper element specified by the user.
   * @ko 컨테이너 엘리먼트를 반환한다.
   */
  __proto.getWrapperElement = function () {
    return this.scrollManager.getWrapper();
  };
  /**
   * Returns the container element corresponding to the scroll area.
   * @ko 스크롤 영역에 해당하는 컨테이너 엘리먼트를 반환한다.
   */
  __proto.getScrollContainerElement = function () {
    return this.scrollManager.getScrollContainer();
  };
  /**
   * Returns the container element containing item elements.
   * @ko 아이템 엘리먼트들을 담긴 컨테이너 엘리먼트를 반환한다.
   */
  __proto.getContainerElement = function () {
    return this.scrollManager.getContainer();
  };
  /**
   * When items change, it synchronizes and renders items.
   * @ko items가 바뀐 경우 동기화를 하고 렌더링을 한다.
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   */
  __proto.syncItems = function (items) {
    this.groupManager.syncItems(items);
    this._syncGroups();
    return this;
  };
  /**
   * Change the currently visible groups.
   * @ko 현재 보이는 그룹들을 바꾼다.
   * @param - first index of visible groups. <ko>보이는 그룹의 첫번째 index.</ko>
   * @param - last index of visible groups. <ko>보이는 그룹의 마지막 index.</ko>
   * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
   */
  __proto.setCursors = function (startCursor, endCursor, useFirstRender) {
    this.groupManager.setCursors(startCursor, endCursor);
    this.infinite.setCursors(startCursor, endCursor);
    if (useFirstRender) {
      this._syncItems();
    } else {
      this._update();
      this._checkEndLoading();
    }
    return this;
  };
  /**
   * Returns the first index of visible groups.
   * @ko 보이는 그룹들의 첫번째 index를 반환한다.
   */
  __proto.getStartCursor = function () {
    return this.infinite.getStartCursor();
  };
  /**
   * Returns the last index of visible groups.
   * @ko 보이는 그룹들의 마지막 index를 반환한다.
   */
  __proto.getEndCursor = function () {
    return this.infinite.getEndCursor();
  };
  /**
   * Add items at the bottom(right) of the grid.
   * @ko 아이템들을 grid 아래(오른쪽)에 추가한다.
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * ig.append(`<div class="item">test1</div><div class="item">test2</div>`);
   * ig.append([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.append([HTMLElement1, HTMLElement2]);
   * ```
   */
  __proto.append = function (items, groupKey) {
    return this.insert(-1, items, groupKey);
  };
  /**
   * Add items at the top(left) of the grid.
   * @ko 아이템들을 grid 위(왼쪽)에 추가한다.
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.prepend(`<div class="item">test1</div><div class="item">test2</div>`);
   * ig.prepend([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.prepend([HTMLElement1, HTMLElement2]);
   * ```
   */
  __proto.prepend = function (items, groupKey) {
    return this.insert(0, items, groupKey);
  };
  /**
   * Add items to a specific index.
   * @ko 아이템들을 특정 index에 추가한다.
   * @param - index to add <ko>추가하기 위한 index</ko>
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.insert(2, `<div class="item">test1</div><div class="item">test2</div>`);
   * ig.insert(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.insert(4, [HTMLElement1, HTMLElement2]);
   * ```
   */
  __proto.insert = function (index, items, groupKey) {
    var nextItemInfos = this.groupManager.getGroupItems();
    var itemInfos = convertInsertedItems(items, groupKey);
    if (index === -1) {
      nextItemInfos.push.apply(nextItemInfos, itemInfos);
    } else {
      nextItemInfos.splice.apply(nextItemInfos, __spreadArray([index, 0], itemInfos, false));
    }
    return this.syncItems(nextItemInfos);
  };
  /**
   * Add items based on group index.
   * @ko group의 index 기준으로 item들을 추가한다.
   * @param - group index to add <ko>추가하기 위한 group의 index</ko>
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.insertByGroupIndex(2, `<div class="item">test1</div><div class="item">test2</div>`);
   * ig.insertByGroupIndex(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.insertByGroupIndex(4, [HTMLElement1, HTMLElement2]);
   * ```
   */
  __proto.insertByGroupIndex = function (groupIndex, items, groupKey) {
    var nextGroupInfos = this.groupManager.getGroups();
    var rightGroup = nextGroupInfos[groupIndex];
    if (!rightGroup) {
      return this.append(items, groupKey);
    }
    var nextItemInfos = this.groupManager.getGroupItems();
    var rightGroupKey = rightGroup.groupKey;
    var rightItemIndex = findIndex(nextItemInfos, function (item) {
      return item.groupKey === rightGroupKey;
    });
    return this.insert(rightItemIndex, items, groupKey);
  };
  /**
   * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
   * @ko 아이템의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
   * @param - STATUS_TYPE.NOT_REMOVE = Get all information about items. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = Get information on visible items only. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = Compress invisible items. You can replace it with a placeholder. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = Compress invisible groups. <ko> STATUS_TYPE.NOT_REMOVE = 모든 아이템들의 정보를 가져온다. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = 보이는 아이템들의 정보만 가져온다. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = 안보이는 아이템들을 압축한다. placeholder로 대체가 가능하다. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = 안보이는 그룹을 압축한다.</ko>
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  __proto.getStatus = function (type, includePlaceholders) {
    return {
      containerManager: this.containerManager.getStatus(),
      itemRenderer: this.itemRenderer.getStatus(),
      groupManager: this.groupManager.getGroupStatus(type, includePlaceholders),
      scrollManager: this.scrollManager.getStatus()
    };
  };
  /**
   * You can set placeholders to restore status or wait for items to be added.
   * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
   * @param - The placeholder status. <ko>placeholder의 status</ko>
   */
  __proto.setPlaceholder = function (info) {
    this.groupManager.setPlaceholder(info);
    return this;
  };
  /**
   * You can set placeholders to restore status or wait for items to be added.
   * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
   * @param - The placeholder status. <ko>placeholder의 status</ko>
   */
  __proto.setLoading = function (info) {
    this.groupManager.setLoading(info);
    return this;
  };
  /**
   * Add the placeholder at the end.
   * @ko placeholder들을 마지막에 추가한다.
   * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  __proto.appendPlaceholders = function (items, groupKey) {
    var _this = this;
    var result = this.groupManager.appendPlaceholders(items, groupKey);
    this._syncGroups(true);
    return __assign(__assign({}, result), {
      remove: function () {
        _this.removePlaceholders({
          groupKey: result.group.groupKey
        });
      }
    });
  };
  /**
   * Add the placeholder at the start.
   * @ko placeholder들을 처음에 추가한다.
   * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  __proto.prependPlaceholders = function (items, groupKey) {
    var _this = this;
    var result = this.groupManager.prependPlaceholders(items, groupKey);
    this._syncGroups(true);
    return __assign(__assign({}, result), {
      remove: function () {
        _this.removePlaceholders({
          groupKey: result.group.groupKey
        });
      }
    });
  };
  /**
   * Remove placeholders
   * @ko placeholder들을 삭제한다.
   * @param type - Remove the placeholders corresponding to the groupkey. When "start" or "end", remove all placeholders in that direction. <ko>groupkey에 해당하는 placeholder들을 삭제한다. "start" 또는 "end" 일 때 해당 방향의 모든 placeholder들을 삭제한다.</ko>
   */
  __proto.removePlaceholders = function (type) {
    this.groupManager.removePlaceholders(type);
    this._syncGroups(true);
  };
  /**
   * Sets the status of the InfiniteGrid module with the information returned through a call to the getStatus() method.
   * @ko getStatus() 메서드가 저장한 정보로 InfiniteGrid 모듈의 상태를 설정한다.
   * @param - status object of the InfiniteGrid module. <ko>InfiniteGrid 모듈의 status 객체.</ko>
   * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
   */
  __proto.setStatus = function (status, useFirstRender) {
    this.itemRenderer.setStatus(status.itemRenderer);
    this.containerManager.setStatus(status.containerManager);
    this.scrollManager.setStatus(status.scrollManager);
    var groupManager = this.groupManager;
    var prevInlineSize = this.containerManager.getInlineSize();
    groupManager.setGroupStatus(status.groupManager);
    this._syncInfinite();
    this.infinite.setCursors(groupManager.getStartCursor(), groupManager.getEndCursor());
    this._getRenderer().updateKey();
    var state = {
      isResize: this.containerManager.getInlineSize() !== prevInlineSize,
      isRestore: true
    };
    if (useFirstRender) {
      this._syncItems(state);
    } else {
      this._update(state);
    }
    return this;
  };
  /**
   * Removes the group corresponding to index.
   * @ko index에 해당하는 그룹을 제거 한다.
   */
  __proto.removeGroupByIndex = function (index) {
    var nextGroups = this.getGroups();
    return this.removeGroupByKey(nextGroups[index].groupKey);
  };
  /**
   * Removes the group corresponding to key.
   * @ko key에 해당하는 그룹을 제거 한다.
   */
  __proto.removeGroupByKey = function (key) {
    var nextItemInfos = this.getItems();
    var firstIndex = findIndex(nextItemInfos, function (item) {
      return item.groupKey === key;
    });
    var lastIndex = findLastIndex(nextItemInfos, function (item) {
      return item.groupKey === key;
    });
    if (firstIndex === -1) {
      return this;
    }
    nextItemInfos.splice(firstIndex, lastIndex - firstIndex + 1);
    return this.syncItems(nextItemInfos);
  };
  /**
   * Removes the item corresponding to index.
   * @ko index에 해당하는 아이템을 제거 한다.
   */
  __proto.removeByIndex = function (index) {
    var nextItemInfos = this.getItems(true);
    nextItemInfos.splice(index, 1);
    return this.syncItems(nextItemInfos);
  };
  /**
   * Removes the item corresponding to key.
   * @ko key에 해당하는 아이템을 제거 한다.
   */
  __proto.removeByKey = function (key) {
    var nextItemInfos = this.getItems(true);
    var index = findIndex(nextItemInfos, function (item) {
      return item.key === key;
    });
    return this.removeByIndex(index);
  };
  /**
   * Update the size of the items and render them.
   * @ko 아이템들의 사이즈를 업데이트하고 렌더링을 한다.
   * @param - Items to be updated. <ko>업데이트할 아이템들.</ko>
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   */
  __proto.updateItems = function (items, options) {
    if (options === void 0) {
      options = {};
    }
    this.groupManager.updateItems(items, options);
    return this;
  };
  /**
   * Return all items of InfiniteGrid.
   * @ko InfiniteGrid의 모든 아이템들을 반환한다.
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  __proto.getItems = function (includePlaceholders) {
    return this.groupManager.getGroupItems(includePlaceholders);
  };
  /**
   * Return visible items of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 아이템들을 반환한다.
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  __proto.getVisibleItems = function (includePlaceholders) {
    return this.groupManager.getVisibleItems(includePlaceholders);
  };
  /**
   * Return rendering items of InfiniteGrid.
   * @ko InfiniteGrid의 렌더링 아이템들을 반환한다.
   */
  __proto.getRenderingItems = function () {
    return this.groupManager.getRenderingItems();
  };
  /**
   * Return all groups of InfiniteGrid.
   * @ko InfiniteGrid의 모든 그룹들을 반환한다.
   * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
   */
  __proto.getGroups = function (includePlaceholders) {
    return this.groupManager.getGroups(includePlaceholders);
  };
  /**
   * Return visible groups of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 그룹들을 반환한다.
   * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
   */
  __proto.getVisibleGroups = function (includePlaceholders) {
    return this.groupManager.getVisibleGroups(includePlaceholders);
  };
  /**
   * Set to wait to request data.
   * @ko 데이터를 요청하기 위해 대기 상태로 설정한다.
   * @param direction - direction in which data will be added. <ko>데이터를 추가하기 위한 방향.</ko>
   */
  __proto.wait = function (direction) {
    if (direction === void 0) {
      direction = DIRECTION.END;
    }
    this._waitType = direction;
    this._checkStartLoading(direction);
  };
  /**
   * When the data request is complete, it is set to ready state.
   * @ko 데이터 요청이 끝났다면 준비 상태로 설정한다.
   */
  __proto.ready = function () {
    this._waitType = "";
  };
  /**
   * Returns whether it is set to wait to request data.
   * @ko 데이터를 요청하기 위해 대기 상태로 설정되어 있는지 여부를 반환한다.
   */
  __proto.isWait = function () {
    return !!this._waitType;
  };
  /**
   * Releases the instnace and events and returns the CSS of the container and elements.
   * @ko 인스턴스와 이벤트를 해제하고 컨테이너와 엘리먼트들의 CSS를 되돌린다.
   */
  __proto.destroy = function () {
    this.off();
    this._getRenderer().destroy();
    this.containerManager.destroy();
    this.groupManager.destroy();
    this.scrollManager.destroy();
    this.infinite.destroy();
  };
  __proto._getRenderer = function () {
    return this.options.renderer;
  };
  __proto._getRendererItems = function () {
    return this.getRenderingItems().map(function (item) {
      return {
        element: item.element,
        key: "".concat(item.type, "_").concat(item.key),
        orgItem: item
      };
    });
  };
  __proto._syncItems = function (state) {
    this._getRenderer().syncItems(this._getRendererItems(), state);
  };
  __proto._render = function (state) {
    this._getRenderer().render(this._getRendererItems(), state);
  };
  __proto._update = function (state) {
    if (state === void 0) {
      state = {};
    }
    this._getRenderer().update(state);
  };
  __proto._resizeScroll = function () {
    var scrollManager = this.scrollManager;
    scrollManager.resize();
    this.infinite.setSize(scrollManager.getContentSize());
  };
  __proto._syncGroups = function (isUpdate) {
    var infinite = this.infinite;
    var scrollManager = this.scrollManager;
    if (!scrollManager.getContentSize()) {
      this._resizeScroll();
    }
    this._syncInfinite();
    this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
    if (isUpdate) {
      this._update();
    } else {
      this._render();
    }
  };
  __proto._syncInfinite = function () {
    this.infinite.syncItems(this.getGroups(true).map(function (_a) {
      var groupKey = _a.groupKey,
        grid = _a.grid,
        type = _a.type;
      var outlines = grid.getOutlines();
      return {
        key: groupKey,
        isVirtual: type === exports.GROUP_TYPE.VIRTUAL,
        startOutline: outlines.start,
        endOutline: outlines.end
      };
    }));
  };
  __proto._scroll = function () {
    this.infinite.scroll(this.scrollManager.getRelativeScrollPos());
  };
  __proto._onRequestInsert = function (direction, eventType, e) {
    var _this = this;
    if (this._waitType) {
      this._checkStartLoading(this._waitType);
      return;
    }
    this.trigger(new Component.ComponentEvent(eventType, {
      groupKey: e.key,
      nextGroupKey: e.nextKey,
      nextGroupKeys: e.nextKeys || [],
      isVirtual: e.isVirtual,
      wait: function () {
        _this.wait(direction);
      },
      ready: function () {
        _this.ready();
      }
    }));
  };
  __proto._renderItems = function (options, isTrusted) {
    if (options === void 0) {
      options = {};
    }
    if (!isTrusted && options.useResize) {
      this.containerManager.resize();
    }
    this._resizeScroll();
    if (!this.getRenderingItems().length) {
      var children = toArray(this.getContainerElement().children);
      if (children.length > 0) {
        // no items, but has children
        this.groupManager.syncItems(convertInsertedItems(children));
        this._syncInfinite();
        this.setCursors(0, 0, true);
        this._getRenderer().updated();
      } else {
        this.infinite.scroll(0);
      }
      return this;
    }
    if (!this.getVisibleGroups(true).length) {
      this.setCursors(0, 0);
    } else {
      this.groupManager.renderItems(options);
    }
    return this;
  };
  __proto._checkStartLoading = function (direction) {
    var groupManager = this.groupManager;
    var infinite = this.infinite;
    if (!groupManager.getLoadingType() && infinite.isLoading(direction) && groupManager.startLoading(direction) && groupManager.hasLoadingItem()) {
      this._update();
    }
  };
  __proto._checkEndLoading = function () {
    var groupManager = this.groupManager;
    var loadingType = this.groupManager.getLoadingType();
    if (loadingType && (!this._waitType || !this.infinite.isLoading(loadingType)) && groupManager.endLoading() && groupManager.hasLoadingItem()) {
      this._update();
    }
  };
  var InfiniteGrid_1;
  InfiniteGrid.defaultOptions = __assign(__assign({}, Grid.DEFAULT_GRID_OPTIONS), {
    container: false,
    containerTag: "div",
    renderer: null,
    threshold: 100,
    useRecycle: true,
    scrollContainer: null,
    appliedItemChecker: function () {
      return false;
    }
  });
  InfiniteGrid.propertyTypes = INFINITEGRID_PROPERTY_TYPES;
  InfiniteGrid = InfiniteGrid_1 = __decorate([InfiniteGridGetterSetter], InfiniteGrid);
  return InfiniteGrid;
}(Component);

/**
 * MasonryInfiniteGrid is a grid that stacks items with the same width as a stack of bricks. Adjust the width of all images to the same size, find the lowest height column, and insert a new item.
 * @ko MasonryInfiniteGrid는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 아이템을 쌓는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 아이템 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {MasonryInfiniteGridOptions} options - The option object of the MasonryInfiniteGrid module <ko>MasonryInfiniteGrid 모듈의 옵션 객체</ko>
 */
var MasonryInfiniteGrid = /*#__PURE__*/function (_super) {
  __extends(MasonryInfiniteGrid, _super);
  function MasonryInfiniteGrid() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MasonryInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid.propertyTypes), Grid.MasonryGrid.propertyTypes);
  MasonryInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid.defaultOptions), Grid.MasonryGrid.defaultOptions), {
    gridConstructor: Grid.MasonryGrid,
    appliedItemChecker: function (item, grid) {
      var column = parseFloat(item.attributes.column) || 0;
      return column >= grid.outlineLength;
    }
  });
  MasonryInfiniteGrid = __decorate([InfiniteGridGetterSetter], MasonryInfiniteGrid);
  return MasonryInfiniteGrid;
}(InfiniteGrid);

/**
 * 'justified' is a printing term with the meaning that 'it fits in one row wide'. JustifiedInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * If 'data-grid-inline-offset' or 'data-grid-content-offset' are set for item element, the ratio is maintained except for the offset value.
 * If 'data-grid-maintained-target' is set for an element whose ratio is to be maintained, the item is rendered while maintaining the ratio of the element.
 * @ko 'justified'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. JustifiedInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템가 가득 차도록 배치하는 Grid다.
 * 아이템 엘리먼트에 'data-grid-inline-offset' 또는 'data-grid-content-offset'를 설정하면 offset 값을 제외하고 비율을 유지한다.
 * 비율을 유지하고 싶은 엘리먼트에 'data-grid-maintained-target'을 설정한다면 해당 엘리먼트의 비율을 유지하면서 아이템이 렌더링이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {JustifiedInfiniteGridOptions} options - The option object of the JustifiedInfiniteGrid module <ko>JustifiedInfiniteGrid 모듈의 옵션 객체</ko>
 */
var JustifiedInfiniteGrid = /*#__PURE__*/function (_super) {
  __extends(JustifiedInfiniteGrid, _super);
  function JustifiedInfiniteGrid() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  JustifiedInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid.propertyTypes), Grid.JustifiedGrid.propertyTypes);
  JustifiedInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid.defaultOptions), Grid.JustifiedGrid.defaultOptions), {
    gridConstructor: Grid.JustifiedGrid
  });
  JustifiedInfiniteGrid = __decorate([InfiniteGridGetterSetter], JustifiedInfiniteGrid);
  return JustifiedInfiniteGrid;
}(InfiniteGrid);

/**
 * 'Frame' is a printing term with the meaning that 'it fits in one row wide'. FrameInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * @ko 'Frame'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. FrameInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템이 가득 차도록 배치하는 Grid다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {FrameInfiniteGridOptions} options - The option object of the FrameInfiniteGrid module <ko>FrameGrid 모듈의 옵션 객체</ko>
 */
var FrameInfiniteGrid = /*#__PURE__*/function (_super) {
  __extends(FrameInfiniteGrid, _super);
  function FrameInfiniteGrid() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FrameInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid.propertyTypes), Grid.FrameGrid.propertyTypes);
  FrameInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid.defaultOptions), Grid.FrameGrid.defaultOptions), {
    gridConstructor: Grid.FrameGrid
  });
  FrameInfiniteGrid = __decorate([InfiniteGridGetterSetter], FrameInfiniteGrid);
  return FrameInfiniteGrid;
}(InfiniteGrid);

/**
 * The PackingInfiniteGrid is a grid that shows the important items bigger without sacrificing the weight of the items.
 * Rows and columns are separated so that items are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * If `sizeWeight` is higher than `ratioWeight`, the size of items is preserved as much as possible.
 * Conversely, if `ratioWeight` is higher than `sizeWeight`, the ratio of items is preserved as much as possible.
 * @ko PackingInfiniteGrid는 아이템의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다.
 * 행과 열이 구분돼 아이템을 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 아이템을 배치한다.
 * `sizeWeight`가 `ratioWeight`보다 높으면 아이템들의 size가 최대한 보존이 된다.
 * 반대로 `ratioWeight`가 `sizeWeight`보다 높으면 아이템들의 비율이 최대한 보존이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {PackingInfiniteGridOptions} options - The option object of the PackingInfiniteGrid module <ko>PackingInfiniteGrid 모듈의 옵션 객체</ko>
 */
var PackingInfiniteGrid = /*#__PURE__*/function (_super) {
  __extends(PackingInfiniteGrid, _super);
  function PackingInfiniteGrid() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PackingInfiniteGrid.propertyTypes = __assign(__assign({}, InfiniteGrid.propertyTypes), Grid.PackingGrid.propertyTypes);
  PackingInfiniteGrid.defaultOptions = __assign(__assign(__assign({}, InfiniteGrid.defaultOptions), Grid.PackingGrid.defaultOptions), {
    gridConstructor: Grid.PackingGrid
  });
  PackingInfiniteGrid = __decorate([InfiniteGridGetterSetter], PackingInfiniteGrid);
  return PackingInfiniteGrid;
}(InfiniteGrid);



var modules = {
    __proto__: null,
    'default': InfiniteGrid,
    withInfiniteGridMethods: withInfiniteGridMethods,
    getRenderingItems: getRenderingItems,
    mountRenderingItems: mountRenderingItems,
    InfiniteGridItem: InfiniteGridItem,
    MasonryInfiniteGrid: MasonryInfiniteGrid,
    JustifiedInfiniteGrid: JustifiedInfiniteGrid,
    FrameInfiniteGrid: FrameInfiniteGrid,
    PackingInfiniteGrid: PackingInfiniteGrid,
    Renderer: Renderer,
    IS_IOS: IS_IOS,
    CONTAINER_CLASS_NAME: CONTAINER_CLASS_NAME,
    IGNORE_PROPERITES_MAP: IGNORE_PROPERITES_MAP,
    INFINITEGRID_PROPERTY_TYPES: INFINITEGRID_PROPERTY_TYPES,
    DIRECTION: DIRECTION,
    INFINITEGRID_EVENTS: INFINITEGRID_EVENTS,
    ITEM_INFO_PROPERTIES: ITEM_INFO_PROPERTIES,
    INFINITEGRID_METHODS: INFINITEGRID_METHODS,
    get GROUP_TYPE () { return exports.GROUP_TYPE; },
    get ITEM_TYPE () { return exports.ITEM_TYPE; },
    get STATUS_TYPE () { return exports.STATUS_TYPE; },
    INVISIBLE_POS: INVISIBLE_POS
};

for (var name in modules) {
  InfiniteGrid[name] = modules[name];
}
module.exports = InfiniteGrid;

exports.CONTAINER_CLASS_NAME = CONTAINER_CLASS_NAME;
exports.DIRECTION = DIRECTION;
exports.FrameInfiniteGrid = FrameInfiniteGrid;
exports.IGNORE_PROPERITES_MAP = IGNORE_PROPERITES_MAP;
exports.INFINITEGRID_EVENTS = INFINITEGRID_EVENTS;
exports.INFINITEGRID_METHODS = INFINITEGRID_METHODS;
exports.INFINITEGRID_PROPERTY_TYPES = INFINITEGRID_PROPERTY_TYPES;
exports.INVISIBLE_POS = INVISIBLE_POS;
exports.IS_IOS = IS_IOS;
exports.ITEM_INFO_PROPERTIES = ITEM_INFO_PROPERTIES;
exports.InfiniteGridItem = InfiniteGridItem;
exports.JustifiedInfiniteGrid = JustifiedInfiniteGrid;
exports.MasonryInfiniteGrid = MasonryInfiniteGrid;
exports.PackingInfiniteGrid = PackingInfiniteGrid;
exports.Renderer = Renderer;
exports.default = InfiniteGrid;
exports.getRenderingItems = getRenderingItems;
exports.mountRenderingItems = mountRenderingItems;
exports.withInfiniteGridMethods = withInfiniteGridMethods;
//# sourceMappingURL=infinitegrid.cjs.js.map
