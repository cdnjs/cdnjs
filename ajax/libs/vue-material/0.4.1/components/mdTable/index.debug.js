(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(182);


/***/ },

/***/ 119:
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

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTable = __webpack_require__(183);
	
	var _mdTable2 = _interopRequireDefault(_mdTable);
	
	var _mdTableRow = __webpack_require__(187);
	
	var _mdTableRow2 = _interopRequireDefault(_mdTableRow);
	
	var _mdTableHead = __webpack_require__(190);
	
	var _mdTableHead2 = _interopRequireDefault(_mdTableHead);
	
	var _mdTableCell = __webpack_require__(193);
	
	var _mdTableCell2 = _interopRequireDefault(_mdTableCell);
	
	var _mdTableEdit = __webpack_require__(196);
	
	var _mdTableEdit2 = _interopRequireDefault(_mdTableEdit);
	
	var _mdTableCard = __webpack_require__(199);
	
	var _mdTableCard2 = _interopRequireDefault(_mdTableCard);
	
	var _mdTableAlternateHeader = __webpack_require__(201);
	
	var _mdTableAlternateHeader2 = _interopRequireDefault(_mdTableAlternateHeader);
	
	var _mdTablePagination = __webpack_require__(204);
	
	var _mdTablePagination2 = _interopRequireDefault(_mdTablePagination);
	
	var _mdTable3 = __webpack_require__(207);
	
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

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(184)
	
	/* script */
	__vue_exports__ = __webpack_require__(185)
	
	/* template */
	var __vue_template__ = __webpack_require__(186)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTable.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-26549e33", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-26549e33", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTable.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 184:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(119);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdSortType: String,
	    mdSort: String
	  },
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

	module.exports = exports['default'];

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-table"
	  }, [_h('table', [_vm._t("default")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-26549e33", module.exports)
	  }
	}

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(188)
	
	/* template */
	var __vue_template__ = __webpack_require__(189)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableRow.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-14ed9c52", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-14ed9c52", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableRow.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(119);
	
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
	
	      this.parentTable.$children.forEach(function (row, index) {
	        row.checkbox = value;
	
	        if (!row.headRow) {
	          _this.setSelectedRow(value, index - 1);
	        }
	      });
	
	      if (value) {
	        this.parentTable.numberOfSelected = this.parentTable.numberOfRows;
	      } else {
	        this.parentTable.numberOfSelected = 0;
	      }
	
	      window.setTimeout(function () {
	        return _this.parentTable.$el.classList.remove(transitionClass);
	      });
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

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('tr', {
	    staticClass: "md-table-row",
	    class: _vm.classes,
	    on: {
	      "click": _vm.autoSelect
	    }
	  }, [(_vm.hasSelection) ? _h('md-table-cell', {
	    staticClass: "md-table-selection"
	  }, [_h('md-checkbox', {
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
	  })]) : _vm._e(), " ", _vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-14ed9c52", module.exports)
	  }
	}

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(191)
	
	/* template */
	var __vue_template__ = __webpack_require__(192)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableHead.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-79209ab3", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-79209ab3", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableHead.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(119);
	
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

	module.exports = exports['default'];

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('th', {
	    staticClass: "md-table-head",
	    class: _vm.classes,
	    on: {
	      "click": _vm.changeSort
	    }
	  }, [_h('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (!_vm.mdSortBy),
	      expression: "!mdSortBy"
	    }],
	    staticClass: "md-table-head-container"
	  }, [_h('div', {
	    staticClass: "md-table-head-text md-test"
	  }, [(_vm.mdSortBy) ? _h('md-icon', {
	    staticClass: "md-sortable-icon"
	  }, ["arrow_downward"]) : _vm._e(), " ", _vm._t("default"), " ", (_vm.mdTooltip) ? _h('md-tooltip', [_vm._s(_vm.mdTooltip)]) : _vm._e()])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-79209ab3", module.exports)
	  }
	}

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(194)
	
	/* template */
	var __vue_template__ = __webpack_require__(195)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableCell.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f61e7596", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f61e7596", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCell.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 194:
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

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('td', {
	    staticClass: "md-table-cell",
	    class: _vm.classes
	  }, [_h('div', {
	    staticClass: "md-table-cell-container"
	  }, [_vm._t("default")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f61e7596", module.exports)
	  }
	}

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(197)
	
	/* template */
	var __vue_template__ = __webpack_require__(198)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableEdit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1b1f15dd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1b1f15dd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableEdit.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 197:
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

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-table-edit",
	    on: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.closeDialog($event)
	      }
	    }
	  }, [_h('div', {
	    staticClass: "md-table-edit-trigger",
	    class: _vm.triggerClasses,
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.openDialog($event)
	      }
	    }
	  }, ["\n    " + _vm._s(_vm.value || _vm.mdPlaceholder) + "\n  "]), " ", _h('div', {
	    ref: "dialog",
	    staticClass: "md-table-dialog",
	    class: _vm.dialogClasses
	  }, [_h('md-input-container', [_h('md-input', {
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
	  })])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1b1f15dd", module.exports)
	  }
	}

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(200)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-89b7a03a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-89b7a03a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('md-card', {
	    staticClass: "md-table-card"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-89b7a03a", module.exports)
	  }
	}

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(202)
	
	/* template */
	var __vue_template__ = __webpack_require__(203)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTableAlternateHeader.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8918b4b8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8918b4b8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableAlternateHeader.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(119);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
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
	  mounted: function mounted() {
	    var _this = this;
	
	    this.parentCard = (0, _getClosestVueParent2.default)(this.$parent, 'md-table-card');
	
	    this.$nextTick(function () {
	      _this.tableInstance = _this.parentCard.tableInstance;
	
	      _this.$watch('tableInstance.numberOfSelected', function () {
	        _this.$refs.counter.textContent = _this.tableInstance.numberOfSelected;
	        _this.classes = {
	          'md-active': _this.tableInstance.numberOfSelected > 0
	        };
	      });
	    });
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

	module.exports = exports['default'];

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-table-alternate-header",
	    class: _vm.classes
	  }, [_h('md-toolbar', [_h('div', {
	    staticClass: "md-counter"
	  }, [_h('span', {
	    ref: "counter"
	  }, [_vm._s(_vm.tableInstance.numberOfSelected)]), " ", _h('span', [_vm._s(_vm.mdSelectedLabel)])]), " ", _vm._t("default")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8918b4b8", module.exports)
	  }
	}

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(205)
	
	/* template */
	var __vue_template__ = __webpack_require__(206)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTable/mdTablePagination.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2149bf2d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2149bf2d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTablePagination.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 205:
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
	      totalItems: !isNaN(this.mdTotal) && Number.MAX_SAFE_INTEGER
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
	
	    this.$nextTick(function () {
	      _this.subTotal = _this.currentPage * _this.currentSize;
	      _this.mdPageOptions = _this.mdPageOptions || [10, 25, 50, 100];
	      _this.currentSize = _this.mdPageOptions[0];
	      _this.canFireEvents = true;
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-table-pagination"
	  }, [_h('span', {
	    staticClass: "md-table-pagination-label"
	  }, [_vm._s(_vm.mdLabel) + ":"]), " ", (_vm.mdPageOptions) ? _h('md-select', {
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
	  }, [_vm._l((_vm.mdPageOptions), function(amount) {
	    return _h('md-option', {
	      attrs: {
	        "value": amount
	      }
	    }, [_vm._s(amount)])
	  })]) : _vm._e(), " ", _h('span', [_vm._s(((_vm.currentPage - 1) * _vm.currentSize) + 1) + "-" + _vm._s(_vm.subTotal) + " " + _vm._s(_vm.mdSeparator) + " " + _vm._s(_vm.totalItems)]), " ", _h('md-button', {
	    staticClass: "md-icon-button md-table-pagination-previous",
	    attrs: {
	      "disabled": _vm.currentPage === 1
	    },
	    on: {
	      "click": _vm.previousPage
	    }
	  }, [_h('md-icon', ["keyboard_arrow_left"])]), " ", _h('md-button', {
	    staticClass: "md-icon-button md-table-pagination-next",
	    attrs: {
	      "disabled": _vm.currentSize * _vm.currentPage >= _vm.totalItems
	    },
	    on: {
	      "click": _vm.nextPage
	    }
	  }, [_h('md-icon', ["keyboard_arrow_right"])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2149bf2d", module.exports)
	  }
	}

/***/ },

/***/ 207:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-table-card .md-toolbar, .THEME_NAME.md-table-card .md-toolbar {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST-A100; }\n\n.THEME_NAME .md-table-alternate-header, .THEME_NAME.md-table-alternate-header {\n  background-color: BACKGROUND-COLOR-A100; }\n  .THEME_NAME .md-table-alternate-header .md-toolbar, .THEME_NAME.md-table-alternate-header .md-toolbar {\n    background-color: ACCENT-COLOR-A100-0.2;\n    color: ACCENT-CONTRAST-A100; }\n  .THEME_NAME .md-table-alternate-header .md-counter, .THEME_NAME.md-table-alternate-header .md-counter {\n    color: ACCENT-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map