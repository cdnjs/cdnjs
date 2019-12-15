(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, (function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 476);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Theme mixin

// Grab the closest ancestor component's `md-theme` attribute OR grab the
// `md-name` attribute from an `<md-theme>` component.
function getAncestorThemeName(component) {
  if (!component) {
    return null;
  }

  var name = component.mdTheme;

  if (!name && component.$options._componentTag === 'md-theme') {
    name = component.mdName;
  }

  return name || getAncestorThemeName(component.$parent);
}

exports.default = {
  props: {
    mdTheme: String
  },
  computed: {
    mdEffectiveTheme: function mdEffectiveTheme() {
      return getAncestorThemeName(this) || this.$material.currentTheme;
    },
    themeClass: function themeClass() {
      return this.$material.prefix + this.mdEffectiveTheme;
    }
  },
  watch: {
    mdTheme: function mdTheme(value) {
      this.$material.useTheme(value);
    }
  },
  beforeMount: function beforeMount() {
    var localTheme = this.mdTheme;

    this.$material.useTheme(localTheme ? localTheme : 'default');
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
  if (!$parent || !$parent.$el) {
    return false;
  }

  if ($parent._uid === 0) {
    return false;
  }

  if ($parent.$el.classList.contains(cssClass)) {
    return $parent;
  }

  return getClosestVueParent($parent.$parent, cssClass);
};

exports.default = getClosestVueParent;
module.exports = exports["default"];

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdTable = __webpack_require__(357);

var _mdTable2 = _interopRequireDefault(_mdTable);

var _mdTableRow = __webpack_require__(364);

var _mdTableRow2 = _interopRequireDefault(_mdTableRow);

var _mdTableHead = __webpack_require__(362);

var _mdTableHead2 = _interopRequireDefault(_mdTableHead);

var _mdTableCell = __webpack_require__(360);

var _mdTableCell2 = _interopRequireDefault(_mdTableCell);

var _mdTableEdit = __webpack_require__(361);

var _mdTableEdit2 = _interopRequireDefault(_mdTableEdit);

var _mdTableCard = __webpack_require__(359);

var _mdTableCard2 = _interopRequireDefault(_mdTableCard);

var _mdTableAlternateHeader = __webpack_require__(358);

var _mdTableAlternateHeader2 = _interopRequireDefault(_mdTableAlternateHeader);

var _mdTablePagination = __webpack_require__(363);

var _mdTablePagination2 = _interopRequireDefault(_mdTablePagination);

var _mdTable3 = __webpack_require__(292);

var _mdTable4 = _interopRequireDefault(_mdTable3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-table', _mdTable2.default);
  Vue.component('md-table-header', {
    functional: true,
    render: function render(h, scope) {
      return h('thead', {
        staticClass: 'md-table-header'
      }, scope.children);
    }
  });
  Vue.component('md-table-body', {
    functional: true,
    render: function render(h, scope) {
      return h('tbody', {
        staticClass: 'md-table-body'
      }, scope.children);
    }
  });
  Vue.component('md-table-row', _mdTableRow2.default);
  Vue.component('md-table-head', _mdTableHead2.default);
  Vue.component('md-table-cell', _mdTableCell2.default);
  Vue.component('md-table-edit', _mdTableEdit2.default);
  Vue.component('md-table-card', _mdTableCard2.default);
  Vue.component('md-table-pagination', _mdTablePagination2.default);
  Vue.component('md-table-alternate-header', _mdTableAlternateHeader2.default);

  Vue.material.styles.push(_mdTable4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(28)
  , hide      = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(31)
  , enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(43);

var _assign2 = _interopRequireDefault(_assign);

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _getClosestVueParent = __webpack_require__(10);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-table',
  props: {
    mdSortType: String,
    mdSort: String
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      sortType: this.mdSortType,
      sortBy: this.mdSort,
      hasRowSelection: false,
      data: [],
      selectedRows: []
    };
  },

  computed: {
    numberOfRows: function numberOfRows() {
      return this.data ? this.data.length : 0;
    },
    numberOfSelected: function numberOfSelected() {
      return this.selectedRows ? this.selectedRows.length : 0;
    }
  },
  methods: {
    emitSort: function emitSort(name) {
      this.sortBy = name;
      this.$emit('sort', {
        name: name,
        type: this.sortType
      });
    },
    emitSelection: function emitSelection() {
      this.$emit('select', this.selectedRows);
    },
    removeRow: function removeRow(row) {
      var index = this.data.indexOf(row);

      if (index !== -1) {
        this.data.splice(index, 1);
      }

      this.removeSelectedRow(row);
    },
    removeSelectedRow: function removeSelectedRow(row) {
      var selectedIndex = this.selectedRows.indexOf(row);

      if (selectedIndex !== -1) {
        this.selectedRows.splice(selectedIndex, 1);
      }
    },
    setRowSelection: function setRowSelection(isSelected, row) {
      if (isSelected) {
        this.selectedRows.push(row);
        return;
      }
      this.removeSelectedRow(row);
    },
    setMultipleRowSelection: function setMultipleRowSelection(isSelected) {
      this.selectedRows = isSelected ? (0, _assign2.default)([], this.data) : [];
    }
  },
  watch: {
    mdSort: function mdSort() {
      this.sortBy = this.mdSort;
      this.$emit('sortInput');
    },
    mdSortType: function mdSortType() {
      this.sortType = this.mdSortType;
      this.$emit('sortInput');
    }
  },
  mounted: function mounted() {
    this.parentCard = (0, _getClosestVueParent2.default)(this.$parent, 'md-table-card');

    if (this.parentCard) {
      this.parentCard.tableInstance = this;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _getClosestVueParent = __webpack_require__(10);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-table-alternate-header',
  mixins: [_mixin2.default],
  props: {
    mdSelectedLabel: {
      type: String,
      default: 'selected'
    }
  },
  data: function data() {
    return {
      classes: {},
      tableInstance: {}
    };
  },

  computed: {
    numberOfSelected: function numberOfSelected() {
      return this.tableInstance.numberOfSelected || 0;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.parentCard = (0, _getClosestVueParent2.default)(this.$parent, 'md-table-card');

    this.$nextTick((function () {
      _this.tableInstance = _this.parentCard.tableInstance;

      _this.$watch('tableInstance.numberOfSelected', (function () {
        _this.$refs.counter.textContent = _this.tableInstance.numberOfSelected;
        _this.classes = {
          'md-active': _this.tableInstance.numberOfSelected > 0
        };
      }));
    }));
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-table-card',
  mixins: [_mixin2.default]
}; //
//
//
//
//
//

module.exports = exports['default'];

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys')
  , uid    = __webpack_require__(20);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-table-cell',
  props: {
    mdNumeric: Boolean
  },
  data: function data() {
    return {
      hasAction: false
    };
  },
  computed: {
    classes: function classes() {
      return {
        'md-numeric': this.mdNumeric,
        'md-has-action': this.hasAction
      };
    }
  },
  mounted: function mounted() {
    if (this.$children.length > 0) {
      this.hasAction = true;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-table-edit',
  props: {
    value: [String, Number],
    mdLarge: Boolean,
    mdId: String,
    mdName: String,
    mdPlaceholder: String,
    mdMaxlength: [Number, String]
  },
  data: function data() {
    return {
      active: false
    };
  },

  computed: {
    triggerClasses: function triggerClasses() {
      return {
        'md-edited': this.value
      };
    },
    dialogClasses: function dialogClasses() {
      return {
        'md-active': this.active,
        'md-large': this.mdLarge
      };
    },
    realValue: function realValue() {
      console.log(this.value);
    }
  },
  methods: {
    openDialog: function openDialog() {
      this.active = true;
      this.$refs.input.$el.focus();
      document.addEventListener('click', this.closeDialogOnOffClick);
    },
    closeDialog: function closeDialog() {
      if (this.active) {
        this.active = false;
        this.$refs.input.$el.blur();
        document.removeEventListener('click', this.closeDialogOnOffClick);
      }
    },
    closeDialogOnOffClick: function closeDialogOnOffClick(event) {
      if (!this.$refs.dialog.contains(event.target)) {
        this.closeDialog();
      }
    },
    confirmDialog: function confirmDialog() {
      var value = this.$refs.input.$el.value;

      this.closeDialog();
      this.$emit('input', value);
      this.$emit('edited', value);
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getClosestVueParent = __webpack_require__(10);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-table-head',
  props: {
    mdNumeric: Boolean,
    mdSortBy: String,
    mdTooltip: String
  },
  data: function data() {
    return {
      sortType: null,
      sorted: false,
      parentTable: {}
    };
  },

  computed: {
    classes: function classes() {
      var matchSort = this.hasMatchSort();

      if (!matchSort) {
        this.sorted = false;
      }

      return {
        'md-numeric': this.mdNumeric,
        'md-sortable': this.mdSortBy,
        'md-sorted': matchSort && this.sorted,
        'md-sorted-descending': matchSort && this.sortType === 'desc'
      };
    }
  },
  methods: {
    hasMatchSort: function hasMatchSort() {
      return this.parentTable.sortBy === this.mdSortBy;
    },
    changeSort: function changeSort() {
      if (this.mdSortBy) {
        if (this.sortType === 'asc' && this.sorted) {
          this.sortType = 'desc';
        } else {
          this.sortType = 'asc';
        }

        this.sorted = true;

        this.parentTable.sortType = this.sortType;
        this.parentTable.emitSort(this.mdSortBy);
      }
    },
    initSort: function initSort() {
      if (this.hasMatchSort()) {
        this.sorted = true;
        this.sortType = this.parentTable.sortType || 'asc';
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');
    this.initSort();
    this.parentTable.$on('sortInput', (function () {
      _this.initSort();
    }));
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maxSafeInteger = __webpack_require__(203);

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-table-pagination',
  props: {
    mdSize: {
      type: [Number, String],
      default: 10
    },
    mdPageOptions: {
      type: [Array, Boolean],
      default: function _default() {
        return [10, 25, 50, 100];
      }
    },
    mdPage: {
      type: [Number, String],
      default: 1
    },
    mdTotal: {
      type: [Number, String],
      default: 'Many'
    },
    mdLabel: {
      type: String,
      default: 'Rows per page'
    },
    mdSeparator: {
      type: String,
      default: 'of'
    }
  },
  data: function data() {
    return {
      totalItems: 0,
      currentPage: 1,
      currentSize: parseInt(this.mdSize, 10)
    };
  },

  watch: {
    mdTotal: function mdTotal(val) {
      this.totalItems = isNaN(val) ? _maxSafeInteger2.default : parseInt(val, 10);
    },
    mdSize: function mdSize(val) {
      this.currentSize = parseInt(val, 10);
    },
    mdPage: function mdPage(val) {
      this.currentPage = parseInt(val, 10);
    }
  },
  computed: {
    lastPage: function lastPage() {
      return false;
    },
    shouldDisable: function shouldDisable() {
      return this.currentSize * this.currentPage >= this.totalItems;
    },
    subTotal: function subTotal() {
      var sub = this.currentPage * this.currentSize;

      return sub > this.mdTotal ? this.mdTotal : sub;
    }
  },
  methods: {
    emitPaginationEvent: function emitPaginationEvent() {
      if (this.canFireEvents) {
        this.$emit('pagination', {
          size: this.currentSize,
          page: this.currentPage
        });
      }
    },
    changeSize: function changeSize() {
      if (this.canFireEvents) {
        this.$emit('size', this.currentSize);
        this.emitPaginationEvent();
      }
    },
    previousPage: function previousPage() {
      if (this.canFireEvents) {
        this.currentPage--;
        this.$emit('page', this.currentPage);
        this.emitPaginationEvent();
      }
    },
    nextPage: function nextPage() {
      if (this.canFireEvents) {
        this.currentPage++;
        this.$emit('page', this.currentPage);
        this.emitPaginationEvent();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick((function () {
      _this.totalItems = isNaN(_this.mdTotal) ? _maxSafeInteger2.default : parseInt(_this.mdTotal, 10);
      if (_this.mdPageOptions) {
        _this.currentSize = _this.mdPageOptions.includes(_this.currentSize) ? _this.currentSize : _this.mdPageOptions[0];
      } else {
        _this.currentSize = _this.mdSize;
      }
      _this.canFireEvents = true;
    }));
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getClosestVueParent = __webpack_require__(10);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

var _uniqueId = __webpack_require__(36);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var transitionClass = 'md-transition-off';

exports.default = {
  name: 'md-table-row',
  props: {
    mdAutoSelect: Boolean,
    mdSelection: Boolean,
    mdItem: Object
  },
  data: function data() {
    return {
      parentTable: {},
      headRow: false,
      checkbox: false,
      index: 0,
      uuid: 'mdrow_uuid_' + (0, _uniqueId2.default)()
    };
  },

  computed: {
    isDisabled: function isDisabled() {
      return !this.mdSelection && !this.headRow;
    },
    hasSelection: function hasSelection() {
      return this.mdSelection || this.headRow && this.parentTable.hasRowSelection;
    },
    classes: function classes() {
      return {
        'md-selected': this.checkbox
      };
    }
  },
  watch: {
    mdItem: function mdItem(newValue, oldValue) {
      this.parentTable.data[this.index] = this.mdItem;
      this.handleMultipleSelection(newValue === oldValue);
    }
  },
  methods: {
    setRowSelection: function setRowSelection(value, row) {
      this.parentTable.setRowSelection(value, row);
    },
    setHeadRowSelection: function setHeadRowSelection() {
      if (this.hasSelection) {
        this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected > 0 && this.parentTable.numberOfSelected === this.parentTable.numberOfRows;
      }
    },
    handleSingleSelection: function handleSingleSelection(value) {
      this.parentTable.setRowSelection(value, this.mdItem);
      this.setHeadRowSelection();
    },
    handleMultipleSelection: function handleMultipleSelection(value) {
      var _this = this;

      if (this.parentTable.numberOfRows > 25) {
        this.parentTable.$el.classList.add(transitionClass);
      }

      this.parentTable.$children.forEach((function (row) {
        row.checkbox = value;
      }));

      this.parentTable.setMultipleRowSelection(value);
      this.setHeadRowSelection();

      window.setTimeout((function () {
        return _this.parentTable.$el.classList.remove(transitionClass);
      }), 100);
    },
    select: function select(value) {
      if (!this.hasSelection) {
        return;
      }

      if (this.headRow) {
        this.handleMultipleSelection(value);
      } else {
        this.handleSingleSelection(value);
      }

      this.parentTable.emitSelection();
      this.$emit(value ? 'selected' : 'deselected', value);
    },
    autoSelect: function autoSelect() {
      if (this.mdAutoSelect && this.hasSelection) {
        this.checkbox = !this.checkbox;
        this.handleSingleSelection(this.checkbox);
        this.parentTable.emitSelection();
      }
    },
    startTableRow: function startTableRow() {
      this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');

      if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
        this.headRow = true;
      } else {
        if (!this.mdItem && this.mdSelection) {
          throw new Error('You should set the md-item property when using mdSelection. Example: <md-table-row md-selection :md-item="ITEM" ...>');
        }

        if (this.mdSelection) {
          this.parentTable.hasRowSelection = true;
        }
        this.parentTable.data.push(this.mdItem);
      }
    }
  },
  destroyed: function destroyed() {
    this.parentTable.removeRow(this.mdItem);
    this.setHeadRowSelection();
  },
  mounted: function mounted() {
    this.startTableRow();
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(14);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(222);
module.exports = 0x1fffffffffffff;

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(16);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-table-card .md-toolbar {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-table-alternate-header {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-table-alternate-header .md-toolbar {\n    background-color: ACCENT-COLOR-A100-0.2;\n    color: ACCENT-CONTRAST-A100; }\n  .THEME_NAME.md-table-alternate-header .md-counter {\n    color: ACCENT-COLOR; }\n"

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)((function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(5)((function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(8)
  , toIObject    = __webpack_require__(7)
  , arrayIndexOf = __webpack_require__(34)(false)
  , IE_PROTO     = __webpack_require__(19)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7)
  , toLength  = __webpack_require__(29)
  , toIndex   = __webpack_require__(35);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(232)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(379),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0cf99074", Component.options)
  } else {
    hotAPI.reload("data-v-0cf99074", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(424),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableAlternateHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableAlternateHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6215c943", Component.options)
  } else {
    hotAPI.reload("data-v-6215c943", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(374),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableCard.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableCard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-059419a4", Component.options)
  } else {
    hotAPI.reload("data-v-059419a4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniqueId = function uniqueId() {
  return Math.random().toString(36).slice(4);
};

exports.default = uniqueId;
module.exports = exports["default"];

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(421),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableCell.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableCell.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-613ea214", Component.options)
  } else {
    hotAPI.reload("data-v-613ea214", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(427),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableEdit.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableEdit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-658eff9e", Component.options)
  } else {
    hotAPI.reload("data-v-658eff9e", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(431),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableHead.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableHead.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78def718", Component.options)
  } else {
    hotAPI.reload("data-v-78def718", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(376),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTablePagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTablePagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09f9942e", Component.options)
  } else {
    hotAPI.reload("data-v-09f9942e", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(409),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTable/mdTableRow.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTableRow.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a848bf6", Component.options)
  } else {
    hotAPI.reload("data-v-4a848bf6", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-card', {
    staticClass: "md-table-card",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-059419a4", module.exports)
  }
}

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-table-pagination"
  }, [(_vm.mdPageOptions !== false) ? [_c('span', {
    staticClass: "md-table-pagination-label"
  }, [_vm._v(_vm._s(_vm.mdLabel) + ":")]), _vm._v(" "), _c('md-select', {
    attrs: {
      "md-menu-class": "md-pagination-select"
    },
    on: {
      "change": _vm.changeSize
    },
    model: {
      value: (_vm.currentSize),
      callback: function($$v) {
        _vm.currentSize = $$v
      },
      expression: "currentSize"
    }
  }, _vm._l((_vm.mdPageOptions), (function(amount) {
    return _c('md-option', {
      key: amount,
      attrs: {
        "value": amount
      }
    }, [_vm._v(_vm._s(amount))])
  })))] : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(((_vm.currentPage - 1) * _vm.currentSize) + 1) + "-" + _vm._s(_vm.subTotal) + " " + _vm._s(_vm.mdSeparator) + " " + _vm._s(_vm.mdTotal))]), _vm._v(" "), _c('md-button', {
    staticClass: "md-icon-button md-table-pagination-previous",
    attrs: {
      "disabled": _vm.currentPage === 1
    },
    on: {
      "click": _vm.previousPage
    }
  }, [_c('md-icon', [_vm._v("keyboard_arrow_left")])], 1), _vm._v(" "), _c('md-button', {
    staticClass: "md-icon-button md-table-pagination-next",
    attrs: {
      "disabled": _vm.shouldDisable
    },
    on: {
      "click": _vm.nextPage
    }
  }, [_c('md-icon', [_vm._v("keyboard_arrow_right")])], 1)], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09f9942e", module.exports)
  }
}

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-table",
    class: [_vm.themeClass]
  }, [_c('table', [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0cf99074", module.exports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', {
    staticClass: "md-table-row",
    class: _vm.classes,
    on: {
      "click": _vm.autoSelect
    },
    nativeOn: {
      "click": function($event) {
        _vm.autoSelect($event)
      }
    }
  }, [(_vm.hasSelection) ? _c('md-table-cell', {
    staticClass: "md-table-selection"
  }, [_c('md-checkbox', {
    attrs: {
      "disabled": _vm.isDisabled
    },
    on: {
      "change": _vm.select
    },
    nativeOn: {
      "change": function($event) {
        _vm.select($event)
      }
    },
    model: {
      value: (_vm.checkbox),
      callback: function($$v) {
        _vm.checkbox = $$v
      },
      expression: "checkbox"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4a848bf6", module.exports)
  }
}

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', {
    staticClass: "md-table-cell",
    class: _vm.classes
  }, [_c('div', {
    staticClass: "md-table-cell-container"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-613ea214", module.exports)
  }
}

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-table-alternate-header",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('md-toolbar', [_c('div', {
    staticClass: "md-counter"
  }, [_c('span', {
    ref: "counter"
  }, [_vm._v(_vm._s(_vm.numberOfSelected))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mdSelectedLabel))])]), _vm._v(" "), _vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6215c943", module.exports)
  }
}

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-table-edit",
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.closeDialog($event)
      }
    }
  }, [_c('div', {
    staticClass: "md-table-edit-trigger",
    class: _vm.triggerClasses,
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.openDialog($event)
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.value || _vm.mdPlaceholder) + "\n  ")]), _vm._v(" "), _c('div', {
    ref: "dialog",
    staticClass: "md-table-dialog",
    class: _vm.dialogClasses
  }, [_c('md-input-container', [_c('md-input', {
    ref: "input",
    attrs: {
      "id": _vm.mdId,
      "name": _vm.mdName,
      "maxlength": _vm.mdMaxlength,
      "value": _vm.value,
      "placeholder": _vm.mdPlaceholder
    },
    nativeOn: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.confirmDialog($event)
      }
    }
  })], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-658eff9e", module.exports)
  }
}

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', {
    staticClass: "md-table-head",
    class: _vm.classes,
    on: {
      "click": _vm.changeSort
    }
  }, [_c('div', {
    staticClass: "md-table-head-container"
  }, [_c('div', {
    staticClass: "md-table-head-text md-test"
  }, [(_vm.mdSortBy) ? _c('md-icon', {
    staticClass: "md-sortable-icon"
  }, [_vm._v("arrow_upward")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.mdTooltip) ? _c('md-tooltip', [_vm._v(_vm._s(_vm.mdTooltip))]) : _vm._e()], 2), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": !_vm.mdSortBy
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-78def718", module.exports)
  }
}

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(109);


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(4).Object.assign;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(18)
  , gOPS     = __webpack_require__(41)
  , pIE      = __webpack_require__(39)
  , toObject = __webpack_require__(21)
  , IObject  = __webpack_require__(26)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(5)((function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach((function(k){ B[k] = k; }));
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
})) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(55)});

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(26)
  , defined = __webpack_require__(14);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(30)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ })

/******/ });
}));