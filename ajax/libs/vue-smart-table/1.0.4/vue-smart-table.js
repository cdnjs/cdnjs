/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(22);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(23);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _SmartTable = __webpack_require__(19);
	
	var _SmartTable2 = _interopRequireDefault(_SmartTable);
	
	var _ExampleComponent = __webpack_require__(16);
	
	var _ExampleComponent2 = _interopRequireDefault(_ExampleComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueResource2.default);
	_vue2.default.component('smart-table', _SmartTable2.default);
	
	window.SmartTable = _SmartTable2.default;
	window.ExampleComponent = _ExampleComponent2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(8)
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/ModalCore.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {
	      value: ''
	    };
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ModalCore = __webpack_require__(1);
	
	var _ModalCore2 = _interopRequireDefault(_ModalCore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { ModalCore: _ModalCore2.default },
	  data: function data() {
	    return {
	      problem: {},
	      actionLabel: 'undefined',
	      command: {
	        action: undefined,
	        selection: []
	      }
	    };
	  },
	
	  props: ['show'],
	  events: {
	    'command': function command(_command) {
	      this.show = true;
	      this.command.action = _command.action.key;
	      this.actionLabel = _command.action.label;
	      this.command.selection = _command.selection;
	      this.problem = false;
	      if (this.command.action === undefined) {
	        this.problem = {
	          short: 'No action to perform!',
	          long: 'Please select an action from the dropdown menu.'
	        };
	      } else if (this.command.selection.length === 0) {
	        this.problem = {
	          short: 'Selection empty!',
	          long: 'There is no selection to ' + this.actionLabel + '.'
	        };
	      }
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	    },
	    confirm: function confirm() {
	      this.$dispatch('confirm', this.command);
	      this.close();
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['show', 'onClose'],
	  methods: {
	    close: function close() {
	      this.onClose();
	    }
	  },
	  ready: function ready() {
	    var _this = this;
	
	    document.addEventListener('keydown', function (e) {
	      if (_this.show && e.keyCode === 27) {
	        _this.onClose();
	      }
	    });
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ModalCore = __webpack_require__(1);
	
	var _ModalCore2 = _interopRequireDefault(_ModalCore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { ModalCore: _ModalCore2.default },
	  data: function data() {
	    return {
	      value: undefined,
	      type: undefined,
	      id: undefined,
	      col: undefined,
	      prev: undefined
	    };
	  },
	
	  props: ['show'],
	  events: {
	    'modalEdit': function modalEdit(_modalEdit) {
	      this.show = true;
	      this.value = _modalEdit.currentValue;
	      this.type = _modalEdit.type;
	      this.id = _modalEdit.id;
	      this.col = _modalEdit.col;
	      this.prev = _modalEdit.previousValue;
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	      this.$dispatch('close');
	    },
	    confirm: function confirm() {
	      this.$dispatch('confirm', {
	        id: this.id,
	        col: this.col,
	        currentValue: this.value,
	        previousValue: this.prev
	      });
	      this.close();
	    }
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _Modal = __webpack_require__(17);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _ModalEdit = __webpack_require__(18);
	
	var _ModalEdit2 = _interopRequireDefault(_ModalEdit);
	
	var _jquery = __webpack_require__(20);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _ramda = __webpack_require__(21);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { Modal: _Modal2.default, ModalEdit: _ModalEdit2.default },
	  data: function data() {
	    return {
	      toggleAll: false,
	      action: undefined,
	      selection: [],
	      error: false,
	      modalEdit: undefined,
	      backMatrix: {},
	      newRow: {},
	      canSaveNewRow: false,
	      scrolledPast: false,
	      filters: {},
	      totals: undefined };
	  },
	
	  props: {
	    canFilterBy: Array,
	    orderKey: String,
	    useTextAreaFor: Array,
	    header: [Object, Array],
	    footer: {
	      required: false
	    },
	    inputList: {
	      type: Object,
	      required: false,
	      default: undefined
	    },
	    body: {
	      type: Object,
	      required: true,
	      validator: function validator(body) {
	        if (body === null || body === undefined) {
	          console.log('Passed null as body! If you are loading data, pass an empty object');
	          return false;
	        }
	        var bodyKeys = Object.keys(body);
	        if (bodyKeys.length < 1) {
	          console.log('Warning: body has no rows');
	          return true;
	        }
	        var firstEntry = body[bodyKeys[0]];
	        var firstEntryCol = Object.keys(firstEntry);
	        var span = firstEntryCol.length;
	        for (var id in body) {
	          if (body.hasOwnProperty(id)) {
	            var entrySpan = Object.keys(body[id]).length;
	            if (span !== entrySpan) {
	              console.log('entry ' + JSON.stringify(body[id]) + ' has not length ' + span);
	              return false;
	            }
	          }
	        }
	        return true;
	      }
	    },
	    actions: [Object, Array],
	    endpoint: {
	      type: String,
	      default: 'http://jsonplaceholder.typicode.com/photos'
	    },
	    labelCol: {
	      type: String,
	      default: 'name'
	    },
	    editable: {
	      default: true
	    },
	    addRow: {
	      type: Boolean,
	      default: false
	    },
	    sum: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    }
	  },
	  computed: {
	    processedFooter: function processedFooter() {
	      if (this.footer === undefined) {
	        return [];
	      }
	      if (this.footer.constructor === Array) {
	        if (this.footer.length > 0 && this.footer[0].constructor === Array) {
	          return this.footer;
	        } else {
	          return [this.footer];
	        }
	      }
	      if (_typeof(this.footer) === 'object') {
	        return this.footer;
	      }
	    },
	    canSaveNewRow: function canSaveNewRow() {
	      var _this = this;
	
	      if (Object.keys(this.newRow).length === 0) {
	        return false;
	      }
	      var retVal = true;
	      this.editableFields.forEach(function (col) {
	        if (!_this.newRow.hasOwnProperty(col)) {
	          retVal = false;
	        } else {
	          if (_this.newRow[col] === undefined || _this.doesNotPassValidation(col, _this.newRow[col])) {
	            retVal = false;
	          }
	        }
	      });
	      return retVal;
	    },
	    editableFields: function editableFields() {
	      var tableCols = Object.keys(this.tableHeader);
	      if (this.editable === true) {
	        return tableCols;
	      }
	      if (this.editable === false) {
	        return [];
	      }
	      if (_jquery2.default.isArray(this.editable) && this.editable.length > 0) {
	        return this.editable.filter(function (el) {
	          return tableCols.indexOf(el) !== -1;
	        });
	      }
	      if (_jquery2.default.isPlainObject(this.editable) && Object.keys(this.editable) > 0) {
	        return Object.keys(this.editable).filter(function (el) {
	          return tableCols.indexOf(el) !== -1;
	        });
	      }
	      return [];
	    },
	    actionsArePresent: function actionsArePresent() {
	      if (Array.isArray(this.actions) && this.actions.length > 0) {
	        return true;
	      }
	      if (this.actions instanceof Object && Object.keys(this.actions).length > 0) {
	        return true;
	      }
	      return false;
	    },
	    tableHeader: function tableHeader() {
	      var _this2 = this;
	
	      if (this.header !== undefined && !Array.isArray(this.header)) {
	        return this.header;
	      }
	      var bodyKeys = Object.keys(this.body);
	      if (bodyKeys.length < 1) {
	        return {};
	      }
	      var header = {};
	      var firstEntry = this.body[bodyKeys[0]];
	      var firstEntryKeys = Object.keys(firstEntry);
	      firstEntryKeys.forEach(function (colKey, i) {
	        if (_this2.header === undefined) {
	          header[colKey] = colKey;
	        } else {
	          header[colKey] = _this2.header[i];
	        }
	      });
	      return header;
	    },
	    mainCol: function mainCol() {
	      var bodyKeys = Object.keys(this.body);
	      var firstEntry = this.body[bodyKeys[0]];
	      var firstEntryKeys = Object.keys(firstEntry);
	      if (firstEntryKeys.indexOf(this.labelCol) === -1) {
	        return firstEntryKeys[0];
	      } else {
	        return this.labelCol;
	      }
	    },
	    processedSmartBody: function processedSmartBody() {
	      var _this3 = this;
	
	      var bodyKeys = Object.keys(this.body);
	      var retVal = {};
	      bodyKeys.forEach(function (rowID) {
	        retVal[rowID] = {};
	        var colIDs = Object.keys(_this3.tableHeader);
	        colIDs.forEach(function (id) {
	          retVal[rowID][id] = _this3.body[rowID][id];
	        });
	      });
	
	      retVal = _ramda2.default.filter(function (row) {
	        return _ramda2.default.all(function (col) {
	          return _ramda2.default.all(function (filter) {
	            return filter !== col || JSON.stringify(row[col]).toLowerCase().indexOf(_this3.filters[filter].model.toLowerCase()) !== -1;
	          }, _ramda2.default.keys(_this3.filters));
	        }, _ramda2.default.keys(row));
	      }, retVal);
	
	      if (this.sum.length > 0) {
	        var addAsNumbers = function addAsNumbers(a, b) {
	          return Number(a) + Number(b);
	        };
	        this.totals = _ramda2.default.mapObjIndexed(function (v, k) {
	          if (_ramda2.default.contains(k, _this3.sum)) {
	            return _ramda2.default.reduce(addAsNumbers, 0, _ramda2.default.values(_ramda2.default.map(function (r) {
	              return r[k];
	            }, retVal))).toFixed(2);
	          } else {
	            return '';
	          }
	        }, _ramda2.default.values(retVal)[0]);
	      }
	
	      return retVal;
	    },
	    span: function span() {
	      return Object.keys(this.tableHeader).length + 1;
	    }
	  },
	  beforeCompile: function beforeCompile() {
	    if (Array.isArray(this.actions)) {
	      var actionsObj = {};
	      this.actions.forEach(function (el) {
	        return actionsObj[el] = el;
	      });
	      this.actions = actionsObj;
	    }
	
	    if (Array.isArray(this.canFilterBy)) {
	      this.filters = _ramda2.default.zipObj(this.canFilterBy, _ramda2.default.map(function (x) {
	        return { open: false, model: '' };
	      }, this.canFilterBy));
	    }
	  },
	  compiled: function compiled() {
	    this.updateInjectedValues();
	  },
	  ready: function ready() {
	    (0, _jquery2.default)(window).scroll(this.refreshTableHeader);
	  },
	
	  watch: {
	    'processedSmartBody': function processedSmartBody() {
	      this.updateInjectedValues();
	    }
	  },
	  methods: {
	    openFilter: function openFilter(column) {
	      this.filters[column].open = true;
	      this.$nextTick(function () {
	        console.log('.' + column + '-filter-input > input');
	        (0, _jquery2.default)('.' + column + '-filter-input > input')[1].focus();
	      });
	    },
	    saveNewRow: function saveNewRow() {
	      var _this4 = this;
	
	      if (this.canSaveNewRow) {
	        this.$dispatch('before-request');
	        this.$http.get(this.endpoint, { action: 'addRow', resource: this.newRow }).then(function (response) {
	          _this4.$set('error', false);
	          _this4.$set('body', response.data.body);
	          _this4.$dispatch('successful-request');
	          _this4.$dispatch('after-request');
	        }, function (response) {
	          _this4.$set('error', { status: response.status, data: response.data });
	          _this4.$dispatch('failed-request');
	          _this4.$dispatch('after-request');
	        });
	      }
	    },
	    doesNotPassValidation: function doesNotPassValidation(col, value) {
	      return !this.passesValidation(col, value);
	    },
	    passesValidation: function passesValidation(col, value) {
	      if (value) {
	        return true;
	      } else {
	        return false;
	      }
	    },
	    refreshTableHeader: function refreshTableHeader() {
	      var persistArea = (0, _jquery2.default)('.persist-area', this.$el);
	      var offset = persistArea.offset();
	      var scrollTop = (0, _jquery2.default)(window).scrollTop();
	      var scrollLeft = (0, _jquery2.default)(window).scrollLeft();
	      var scrolledDown = scrollTop > offset.top;
	      var notScrolledAway = scrollTop < offset.top + persistArea.height();
	      this.scrolledPast = scrolledDown && notScrolledAway;
	
	      (0, _jquery2.default)('.floating-header').css({
	        'left': offset.left - scrollLeft,
	        'z-index': 3
	      });
	      (0, _jquery2.default)('.floating-header th').each(function (i) {
	        (0, _jquery2.default)(this).width((0, _jquery2.default)('.regular-header th').eq(i).width());
	      });
	    },
	    updateInjectedValues: function updateInjectedValues() {
	      var _this5 = this;
	
	      var children = this.$children;
	      var columns = Object.keys(this.tableHeader);
	      children.forEach(function (child) {
	        var col = typeof child.$el.getAttribute === 'function' ? child.$el.getAttribute('slot') : null;
	        if (col !== null && columns.indexOf(col) !== -1) {
	          var rowId = child.$el.parentElement.id.match(/^value-([0-9]+)-/)[1];
	          child.value = _this5.processedSmartBody[rowId][col];
	        }
	      });
	    },
	    toggleAllRows: function toggleAllRows() {
	      if (this.toggleAll === false) {
	        this.toggleAll = true;
	        this.selection = Object.keys(this.body);
	      } else {
	        this.toggleAll = false;
	        this.selection = [];
	      }
	    },
	    next: function next() {
	      var _this6 = this;
	
	      var actionKey = this.action;
	      var actionLabel = this.actions[this.action];
	      var selectionKeyLabel = this.selection.map(function (k) {
	        if (_this6.body[k] !== undefined) {
	          return { key: k, label: _this6.body[k][_this6.mainCol] };
	        } else {
	          return null;
	        }
	      }, this).filter(function (a) {
	        return a !== null;
	      });
	      var commandToBeConfirmed = { action: { key: actionKey, label: actionLabel }, selection: selectionKeyLabel };
	      this.$broadcast('command', commandToBeConfirmed);
	    },
	    doCommand: function doCommand(command) {
	      var _this7 = this;
	
	      this.$dispatch('before-request');
	      this.$http.get(this.endpoint, command).then(function (response) {
	        if (response.data.body !== undefined || response.data.body === {}) {
	          _this7.$set('body', response.data.body);
	          _this7.$set('footer', response.data.footer);
	        }
	        _this7.$dispatch('successful-request');
	        _this7.$dispatch('after-request');
	        _this7.$set('error', false);
	      }, function (response) {
	        _this7.$set('error', { status: response.status, data: response.data.error });
	        _this7.$dispatch('failed-request');
	        _this7.$dispatch('after-request');
	      });
	    },
	    isEditable: function isEditable(col) {
	      if (this.editable === false) {
	        return false;
	      }
	      if (Array.isArray(this.editable)) {
	        if (this.editable.indexOf(col) === -1) {
	          return false;
	        }
	      }
	      return true;
	    },
	    isNotEditable: function isNotEditable(col) {
	      return !this.isEditable(col);
	    },
	    valueClick: function valueClick(id, col) {
	      if (this.isNotEditable(col)) {
	        return;
	      }
	      if (this.modalEdit === undefined) {
	        this.modalEdit = {
	          id: id,
	          col: col,
	          currentValue: this.body[id][col],
	          previousValue: this.body[id][col],
	          type: this.editType(col)
	        };
	        this.$broadcast('modalEdit', this.modalEdit);
	      }
	    },
	    editType: function editType(col) {
	      if (this.inputList !== undefined && this.inputList[col] !== undefined) {
	        return 'select';
	      }
	      if (this.useTextAreaFor !== undefined && this.useTextAreaFor.indexOf(col) !== undefined) {
	        return 'textarea';
	      }
	      return 'text';
	    },
	    doEdit: function doEdit(modalEdit) {
	      var _this8 = this;
	
	      this.$dispatch('before-request');
	      this.$http.put(this.endpoint + '/' + modalEdit.id + '/' + modalEdit.col, {
	        action: 'edit',
	        value: modalEdit.currentValue
	      }).then(function (response) {
	        _this8.$dispatch('successful-request');
	        _this8.$dispatch('after-request');
	        _this8.$set('error', false);
	      }, function (response) {
	        _this8.$set('error', { status: response.status, data: response.data.error });
	        _this8.$dispatch('failed-request');
	        _this8.$dispatch('after-request');
	      });
	    },
	    closedModalEdit: function closedModalEdit() {
	      this.modalEdit = undefined;
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "\n<a v-show=\"value !== ''\" href=\"https://en.wikipedia.org/wiki/{{value}}#History\" title=\"Go to the wikipedia page of {{value}} history\">{{value}}</a>\n";

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal\">\n  <modal-core :show.sync=\"show\" :on-close=\"close\">\n    <div class=\"modal-header\">\n      <h3 v-show=\"problem\">{{problem.short}}</h3>\n      <h3 v-else>Are you sure?</h3>\n    </div>\n\n    <div class=\"modal-body no-action\" v-show=\"problem\">\n      <p>{{{problem.long}}}</p>\n    </div>\n    <div class=\"modal-body\" v-else>\n      <p>You will <span class=\"action-label\">{{actionLabel}}</span> the following</p>\n      <ul>\n        <li v-for=\"item in command.selection\">{{item.label}}</li>\n      </ul>\n    </div>\n\n    <div class=\"modal-footer text-right\" v-show=\"problem\">\n      <button class=\"modal-cancel-button\" @click=\"close\">Ok</button>\n    </div>\n    <div class=\"modal-footer text-right\" v-else>\n      <button class=\"modal-cancel-button\" @click=\"close\">Cancel</button>\n      <button class=\"modal-default-button action-label\" @click=\"confirm(command)\">\n        {{actionLabel}}\n      </button>\n    </div>\n  </modal-core>\n</div>\n";

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal-core\" @click=\"close\" v-show=\"show\" transition=\"modal\">\n  <div class=\"modal-container\" @click.stop>\n    <slot></slot>\n  </div>\n</div>\n";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal-edit\">\n  <modal-core :show.sync=\"show\" :on-close=\"close\">\n    <div id=\"value-{{id}}-{{col}}-edit\" class=\"modal-body\">\n      <input v-if=\"type !== 'textarea'\" type=\"{{type}}\" v-model=\"value\" />\n      <textarea v-else v-model=\"value\"></textarea>\n    </div>\n    <div class=\"modal-footer text-right\">\n      <button class=\"modal-cancel-button\" @click=\"close\">Cancel</button>\n      <button class=\"modal-default-button modal-ok-button action-label\"\n              @click=\"confirm\"\n      >Save</button>\n    </div>\n  </modal-core>\n</div>\n";

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"smart-table\">\n  <modal @confirm=\"doCommand\"></modal>\n  <modal-edit @confirm=\"doEdit\" @close=\"closedModalEdit\"></modal-edit>\n  <table class=\"persist-area\">\n    <thead v-show=\"scrolledPast\" class=\"floating-header\">\n    <th v-if=\"actionsArePresent\">\n      <input class=\"toggle-all\" type=\"checkbox\" @click=\"toggleAllRows\"/>\n    </th>\n    <th v-for=\"(column, label) in tableHeader\" class=\"col-{{column}} col-cell\">\n      {{label}}\n      <div v-if=\"filters[column]\" class=\"{{column}}-filter-cue click-cue fa fa-filter\" @click=\"openFilter(column)\"></div>\n      <div v-if=\"filters[column] && filters[column].open\" class=\"{{column}}-filter-input\">\n        <input type=\"text\" v-model=\"filters[column].model\"/>\n      </div>\n    </th>\n    </thead>\n    <thead class=\"regular-header\" :class=\"{ transparent: scrolledPast }\">\n    <tr>\n      <th v-if=\"actionsArePresent\">\n        <input class=\"toggle-all\" type=\"checkbox\" @click=\"toggleAllRows\"/>\n      </th>\n      <th v-for=\"(column, label) in tableHeader\" class=\"col-{{column}}\">\n        {{label}}\n        <div v-if=\"filters[column]\" class=\"{{column}}-filter-cue click-cue fa fa-filter\" @click=\"openFilter(column)\"></div>\n        <div v-if=\"filters[column] && filters[column].open\" class=\"{{column}}-filter-input\">\n          <input type=\"text\" v-model=\"filters[column].model\"/>\n        </div>\n      </th>\n    </tr>\n    </thead>\n    <tfoot>\n    <tr v-if=\"totals\" class=\"totals-row\">\n      <td v-if=\"actionsArePresent\"><!-- to match the toggle checkboxes --></td>\n      <td v-for=\"(col, totalCell) in totals\" id=\"value-total-{{col}}\" track-by=\"$index\">\n        {{totalCell}}\n      </td>\n    </tr>\n    <tr v-for=\"footerRow in processedFooter\" class=\"footer-row\">\n      <td v-if=\"actionsArePresent\"><!-- to match the toggle checkboxes --></td>\n      <td v-for=\"footerCell in footerRow\" track-by=\"$index\">\n        {{footerCell}}\n      </td>\n    </tr>\n    <tr v-if=\"actionsArePresent\" class=\"action-row\">\n      <td class=\"smart-control-bar\" colspan=\"{{span}}\">\n        <span class=\"bottom-right-corner\">&#8990;</span>\n        <select class=\"actions\" v-model=\"action\">\n          <option v-for=\"(key, label) in actions\" value=\"{{key}}\" class=\"action-label\">{{label}}</option>\n        </select>\n        <button class=\"action-button\" @click=\"next\">Next...</button>\n      </td>\n    </tr>\n    </tfoot>\n    <tbody>\n    <tr v-for=\"(id, entry) in processedSmartBody\n      | orderBy orderKey -1\" class=\"row-{{id}}\">\n      <td v-if=\"actionsArePresent\">\n        <input id=\"toggle-{{id}}\" value=\"{{id}}\" type=\"checkbox\" v-model=\"selection\"/>\n      </td>\n      <td\n        v-for=\"(col, value) in entry\"\n        id=\"cell-{{id}}-{{col}}\"\n        class=\"cell-{{col}}\"\n        @dblclick=\"valueClick(id, col)\"\n      >\n        <div id=\"value-{{id}}-{{col}}\">\n          <slot :name=\"col\">\n            {{value}}\n          </slot>\n        </div>\n      </td>\n    </tr>\n    <tr v-if=\"addRow\" class=\"row-new\">\n      <td v-if=\"actionsArePresent\"><!-- to match the toggle checkboxes --></td>\n      <td\n        v-for=\"(col, value) in tableHeader\"\n        id=\"edit-new-{{col}}\"\n      >\n        <input v-if=\"isEditable(col) && editType(col) !== 'select'\" :type=\"editType(col)\" v-model=\"newRow[col]\"/>\n        <select v-if=\"isEditable(col) && editType(col) === 'select'\" v-model=\"newRow[col]\">\n          <option v-for=\"(value, label) in inputList[col]\" value=\"{{value}}\" class=\"input-label\">{{label}}</option>\n        </select>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n  <div class=\"add-row-button\" v-show=\"canSaveNewRow\"><button @click=\"saveNewRow\">Add Row</button></div>\n  <div class=\"error-panel\" v-show=\"error\">{{error | json}}</div>\n</div>\n";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/ExampleComponent.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(7)
	__vue_script__ = __webpack_require__(3)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/Modal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(9)
	__vue_script__ = __webpack_require__(5)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/ModalEdit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(10)
	__vue_script__ = __webpack_require__(6)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/SmartTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = ramda;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = vue;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = vueResource;

/***/ }
/******/ ]);
//# sourceMappingURL=vue-smart-table.js.map