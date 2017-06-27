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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(98);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    mdTheme: String
	  },
	  data: function data() {
	    return {
	      closestThemedParent: false
	    };
	  },
	  methods: {
	    getClosestThemedParent: function getClosestThemedParent($parent) {
	      if (!$parent || !$parent.$el || $parent._uid === 0) {
	        return false;
	      }

	      if ($parent.mdTheme || $parent.mdName) {
	        return $parent;
	      }

	      return this.getClosestThemedParent($parent.$parent);
	    }
	  },
	  computed: {
	    themeClass: function themeClass() {
	      if (this.mdTheme) {
	        return 'md-theme-' + this.mdTheme;
	      }

	      var theme = this.closestThemedParent.mdTheme;

	      if (!theme) {
	        if (this.closestThemedParent) {
	          theme = this.closestThemedParent.mdName;
	        } else {
	          theme = this.$material.currentTheme;
	        }
	      }

	      return 'md-theme-' + theme;
	    }
	  },
	  mounted: function mounted() {
	    this.closestThemedParent = this.getClosestThemedParent(this.$parent);

	    if (!this.$material.currentTheme) {
	      this.$material.setCurrentTheme('default');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 2:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(11)((function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	}));

/***/ },

/***/ 5:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(10)
	  , IE8_DOM_DEFINE = __webpack_require__(29)
	  , toPrimitive    = __webpack_require__(28)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(6)
	  , createDesc = __webpack_require__(14);
	module.exports = __webpack_require__(4) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 13:
/***/ function(module, exports) {

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

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(5)
	  , ctx       = __webpack_require__(26)
	  , hide      = __webpack_require__(8)
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

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(32);
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

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
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

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(4) && !__webpack_require__(11)((function(){
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	}));

/***/ },

/***/ 32:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdTable = __webpack_require__(297);

	var _mdTable2 = _interopRequireDefault(_mdTable);

	var _mdTableRow = __webpack_require__(304);

	var _mdTableRow2 = _interopRequireDefault(_mdTableRow);

	var _mdTableHead = __webpack_require__(302);

	var _mdTableHead2 = _interopRequireDefault(_mdTableHead);

	var _mdTableCell = __webpack_require__(300);

	var _mdTableCell2 = _interopRequireDefault(_mdTableCell);

	var _mdTableEdit = __webpack_require__(301);

	var _mdTableEdit2 = _interopRequireDefault(_mdTableEdit);

	var _mdTableCard = __webpack_require__(299);

	var _mdTableCard2 = _interopRequireDefault(_mdTableCard);

	var _mdTableAlternateHeader = __webpack_require__(298);

	var _mdTableAlternateHeader2 = _interopRequireDefault(_mdTableAlternateHeader);

	var _mdTablePagination = __webpack_require__(303);

	var _mdTablePagination2 = _interopRequireDefault(_mdTablePagination);

	var _mdTable3 = __webpack_require__(244);

	var _mdTable4 = _interopRequireDefault(_mdTable3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-table', Vue.extend(_mdTable2.default));
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
	  Vue.component('md-table-row', Vue.extend(_mdTableRow2.default));
	  Vue.component('md-table-head', Vue.extend(_mdTableHead2.default));
	  Vue.component('md-table-cell', Vue.extend(_mdTableCell2.default));
	  Vue.component('md-table-edit', Vue.extend(_mdTableEdit2.default));
	  Vue.component('md-table-card', Vue.extend(_mdTableCard2.default));
	  Vue.component('md-table-pagination', Vue.extend(_mdTablePagination2.default));
	  Vue.component('md-table-alternate-header', Vue.extend(_mdTableAlternateHeader2.default));

	  Vue.material.styles.push(_mdTable4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _getClosestVueParent = __webpack_require__(13);

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
	      numberOfRows: 0,
	      numberOfSelected: 0,
	      selectedRows: {}
	    };
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

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _getClosestVueParent = __webpack_require__(13);

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
	  props: {
	    mdSelectedLabel: {
	      type: String,
	      default: 'selected'
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      classes: {},
	      tableInstance: {}
	    };
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

/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_mixin2.default]
	}; //
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 154:
/***/ function(module, exports) {

	'use strict';

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

/***/ },

/***/ 155:
/***/ function(module, exports) {

	'use strict';

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

/***/ },

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getClosestVueParent = __webpack_require__(13);

	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
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
	    }
	  },
	  mounted: function mounted() {
	    this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');

	    if (this.hasMatchSort()) {
	      this.sorted = true;
	      this.sortType = this.parentTable.sortType;
	    }
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

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _maxSafeInteger = __webpack_require__(166);

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

	exports.default = {
	  props: {
	    mdSize: {
	      type: [Number, String],
	      default: 10
	    },
	    mdPageOptions: [Array, Boolean],
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
	      subTotal: 0,
	      currentSize: parseInt(this.mdSize, 10),
	      currentPage: parseInt(this.mdPage, 10),
	      totalItems: isNaN(this.mdTotal) ? _maxSafeInteger2.default : parseInt(this.mdTotal, 10)
	    };
	  },

	  computed: {
	    lastPage: function lastPage() {
	      return false;
	    }
	  },
	  methods: {
	    emitPaginationEvent: function emitPaginationEvent() {
	      if (this.canFireEvents) {
	        var sub = this.currentPage * this.currentSize;

	        this.subTotal = sub > this.mdTotal ? this.mdTotal : sub;
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
	      _this.subTotal = _this.currentPage * _this.currentSize;
	      _this.mdPageOptions = _this.mdPageOptions || [10, 25, 50, 100];
	      _this.currentSize = _this.mdPageOptions[0];
	      _this.canFireEvents = true;
	    }));
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getClosestVueParent = __webpack_require__(13);

	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var transitionClass = 'md-transition-off'; //
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
	      index: 0
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
	    setSelectedRow: function setSelectedRow(value, index) {
	      if (value) {
	        this.parentTable.selectedRows[index] = this.parentTable.data[index];
	        ++this.parentTable.numberOfSelected;
	      } else {
	        delete this.parentTable.selectedRows[index];
	        --this.parentTable.numberOfSelected;
	      }
	    },
	    handleSingleSelection: function handleSingleSelection(value) {
	      this.setSelectedRow(value, this.index - 1);
	      this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected === this.parentTable.numberOfRows;
	    },
	    handleMultipleSelection: function handleMultipleSelection(value) {
	      var _this = this;

	      if (this.parentTable.numberOfRows > 25) {
	        this.parentTable.$el.classList.add(transitionClass);
	      }

	      this.parentTable.$children.forEach((function (row, index) {
	        row.checkbox = value;

	        if (!row.headRow) {
	          _this.setSelectedRow(value, index - 1);
	        }
	      }));

	      if (value) {
	        this.parentTable.numberOfSelected = this.parentTable.numberOfRows;
	      } else {
	        this.parentTable.numberOfSelected = 0;
	      }

	      window.setTimeout((function () {
	        return _this.parentTable.$el.classList.remove(transitionClass);
	      }));
	    },
	    select: function select(value) {
	      if (this.hasSelection) {
	        if (this.headRow) {
	          this.handleMultipleSelection(value);
	        } else {
	          this.handleSingleSelection(value);
	        }

	        this.parentTable.emitSelection();
	      }
	    },
	    autoSelect: function autoSelect() {
	      if (this.mdAutoSelect && this.hasSelection) {
	        this.checkbox = !this.checkbox;
	        this.handleSingleSelection(this.checkbox);
	        this.parentTable.emitSelection();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');

	    if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
	      this.headRow = true;
	    } else {
	      this.parentTable.numberOfRows++;
	      this.index = this.parentTable.numberOfRows;

	      if (this.mdSelection) {
	        this.parentTable.hasRowSelection = true;
	      }

	      if (this.mdItem) {
	        this.parentTable.data.push(this.mdItem);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(182);
	module.exports = 0x1fffffffffffff;

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(17);

	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },

/***/ 218:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 244:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-table-card .md-toolbar {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-table-alternate-header {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-table-alternate-header .md-toolbar {\n    background-color: ACCENT-COLOR-A100-0.2;\n    color: ACCENT-CONTRAST-A100; }\n  .THEME_NAME.md-table-alternate-header .md-counter {\n    color: ACCENT-COLOR; }\n"

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(218)

	/* script */
	__vue_exports__ = __webpack_require__(151)

	/* template */
	var __vue_template__ = __webpack_require__(366)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTable.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-dda64186", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-dda64186", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTable.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(152)

	/* template */
	var __vue_template__ = __webpack_require__(324)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableAlternateHeader.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1ea3ef5a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1ea3ef5a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableAlternateHeader.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(153)

	/* template */
	var __vue_template__ = __webpack_require__(368)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e2fe4826", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e2fe4826", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(154)

	/* template */
	var __vue_template__ = __webpack_require__(343)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableCell.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-584d713f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-584d713f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCell.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(155)

	/* template */
	var __vue_template__ = __webpack_require__(325)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableEdit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-23087c32", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-23087c32", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableEdit.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(156)

	/* template */
	var __vue_template__ = __webpack_require__(338)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableHead.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4c7d46bd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4c7d46bd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableHead.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(157)

	/* template */
	var __vue_template__ = __webpack_require__(354)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTablePagination.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7f188892", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7f188892", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTablePagination.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(158)

	/* template */
	var __vue_template__ = __webpack_require__(364)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableRow.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-cd7c46e6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-cd7c46e6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableRow.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-table-alternate-header",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('md-toolbar', [_c('div', {
	    staticClass: "md-counter"
	  }, [_c('span', {
	    ref: "counter"
	  }, [_vm._v(_vm._s(_vm.tableInstance.numberOfSelected))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mdSelectedLabel))])]), _vm._v(" "), _vm._t("default")], 2)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1ea3ef5a", module.exports)
	  }
	}

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-table-edit",
	    on: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
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
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.confirmDialog($event)
	      }
	    }
	  })], 1)], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-23087c32", module.exports)
	  }
	}

/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

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
	  }, [_vm._v("arrow_downward")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.mdTooltip) ? _c('md-tooltip', [_vm._v(_vm._s(_vm.mdTooltip))]) : _vm._e()], 2), _vm._v(" "), _c('md-ink-ripple', {
	    attrs: {
	      "md-disabled": !_vm.mdSortBy
	    }
	  })], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4c7d46bd", module.exports)
	  }
	}

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

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
	     require("vue-hot-reload-api").rerender("data-v-584d713f", module.exports)
	  }
	}

/***/ },

/***/ 354:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-table-pagination"
	  }, [_c('span', {
	    staticClass: "md-table-pagination-label"
	  }, [_vm._v(_vm._s(_vm.mdLabel) + ":")]), _vm._v(" "), (_vm.mdPageOptions) ? _c('md-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentSize),
	      expression: "currentSize"
	    }],
	    attrs: {
	      "md-menu-class": "md-pagination-select"
	    },
	    domProps: {
	      "value": (_vm.currentSize)
	    },
	    on: {
	      "change": _vm.changeSize,
	      "input": function($event) {
	        _vm.currentSize = $event
	      }
	    }
	  }, _vm._l((_vm.mdPageOptions), (function(amount) {
	    return _c('md-option', {
	      attrs: {
	        "value": amount
	      }
	    }, [_vm._v(_vm._s(amount))])
	  }))) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(((_vm.currentPage - 1) * _vm.currentSize) + 1) + "-" + _vm._s(_vm.subTotal) + " " + _vm._s(_vm.mdSeparator) + " " + _vm._s(_vm.mdTotal))]), _vm._v(" "), _c('md-button', {
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
	      "disabled": _vm.currentSize * _vm.currentPage >= _vm.totalItems
	    },
	    on: {
	      "click": _vm.nextPage
	    }
	  }, [_c('md-icon', [_vm._v("keyboard_arrow_right")])], 1)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7f188892", module.exports)
	  }
	}

/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', {
	    staticClass: "md-table-row",
	    class: _vm.classes,
	    on: {
	      "click": _vm.autoSelect
	    }
	  }, [(_vm.hasSelection) ? _c('md-table-cell', {
	    staticClass: "md-table-selection"
	  }, [_c('md-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.checkbox),
	      expression: "checkbox"
	    }],
	    attrs: {
	      "disabled": _vm.isDisabled
	    },
	    domProps: {
	      "value": (_vm.checkbox)
	    },
	    on: {
	      "change": _vm.select,
	      "input": function($event) {
	        _vm.checkbox = $event
	      }
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-cd7c46e6", module.exports)
	  }
	}

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

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
	     require("vue-hot-reload-api").rerender("data-v-dda64186", module.exports)
	  }
	}

/***/ },

/***/ 368:
/***/ function(module, exports, __webpack_require__) {

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
	     require("vue-hot-reload-api").rerender("data-v-e2fe4826", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;