/*!
 Material Components for the web
 Copyright (c) 2017 Google Inc.
 License: Apache-2.0
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mdc"] = factory();
	else
		root["mdc"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.autoInit = exports.select = exports.menu = exports.textfield = exports.drawer = exports.snackbar = exports.ripple = exports.radio = exports.iconToggle = exports.checkbox = exports.base = undefined;

	var _base = __webpack_require__(1);

	var base = _interopRequireWildcard(_base);

	var _checkbox = __webpack_require__(4);

	var checkbox = _interopRequireWildcard(_checkbox);

	var _iconToggle = __webpack_require__(8);

	var iconToggle = _interopRequireWildcard(_iconToggle);

	var _radio = __webpack_require__(14);

	var radio = _interopRequireWildcard(_radio);

	var _ripple = __webpack_require__(9);

	var ripple = _interopRequireWildcard(_ripple);

	var _drawer = __webpack_require__(16);

	var drawer = _interopRequireWildcard(_drawer);

	var _textfield = __webpack_require__(21);

	var textfield = _interopRequireWildcard(_textfield);

	var _snackbar = __webpack_require__(23);

	var snackbar = _interopRequireWildcard(_snackbar);

	var _menu = __webpack_require__(26);

	var menu = _interopRequireWildcard(_menu);

	var _select = __webpack_require__(31);

	var select = _interopRequireWildcard(_select);

	var _autoInit = __webpack_require__(33);

	var _autoInit2 = _interopRequireDefault(_autoInit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// Register all components
	_autoInit2.default.register('MDCCheckbox', checkbox.MDCCheckbox); /**
	                                                                   * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                   *
	                                                                   * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                   * you may not use this file except in compliance with the License.
	                                                                   * You may obtain a copy of the License at
	                                                                   *
	                                                                   *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                   *
	                                                                   * Unless required by applicable law or agreed to in writing, software
	                                                                   * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                   * See the License for the specific language governing permissions and
	                                                                   * limitations under the License.
	                                                                   */

	_autoInit2.default.register('MDCTemporaryDrawer', drawer.MDCTemporaryDrawer);
	_autoInit2.default.register('MDCRipple', ripple.MDCRipple);
	_autoInit2.default.register('MDCIconToggle', iconToggle.MDCIconToggle);
	_autoInit2.default.register('MDCRadio', radio.MDCRadio);
	_autoInit2.default.register('MDCSnackbar', snackbar.MDCSnackbar);
	_autoInit2.default.register('MDCTextfield', textfield.MDCTextfield);
	_autoInit2.default.register('MDCSimpleMenu', menu.MDCSimpleMenu);
	_autoInit2.default.register('MDCSelect', select.MDCSelect);

	// Export all components.
	exports.base = base;
	exports.checkbox = checkbox;
	exports.iconToggle = iconToggle;
	exports.radio = radio;
	exports.ripple = ripple;
	exports.snackbar = snackbar;
	exports.drawer = drawer;
	exports.textfield = textfield;
	exports.menu = menu;
	exports.select = select;
	exports.autoInit = _autoInit2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _foundation = __webpack_require__(2);

	Object.defineProperty(exports, 'MDCFoundation', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_foundation).default;
	  }
	});

	var _component = __webpack_require__(3);

	Object.defineProperty(exports, 'MDCComponent', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_component).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2016 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var MDCFoundation = function () {
	  _createClass(MDCFoundation, null, [{
	    key: "cssClasses",
	    get: function get() {
	      // Classes extending MDCFoundation should implement this method to return an object which exports every
	      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
	      return {};
	    }
	  }, {
	    key: "strings",
	    get: function get() {
	      // Classes extending MDCFoundation should implement this method to return an object which exports all
	      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
	      return {};
	    }
	  }, {
	    key: "numbers",
	    get: function get() {
	      // Classes extending MDCFoundation should implement this method to return an object which exports all
	      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
	      return {};
	    }
	  }, {
	    key: "defaultAdapter",
	    get: function get() {
	      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
	      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
	      // validation.
	      return {};
	    }
	  }]);

	  function MDCFoundation() {
	    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MDCFoundation);

	    this.adapter_ = adapter;
	  }

	  _createClass(MDCFoundation, [{
	    key: "init",
	    value: function init() {
	      // Subclasses should override this method to perform initialization routines (registering events, etc.)
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
	    }
	  }]);

	  return MDCFoundation;
	}();

	exports.default = MDCFoundation;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _foundation = __webpack_require__(2);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MDCComponent = function () {
	  _createClass(MDCComponent, null, [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
	      // returns an instantiated component with its root set to that element. Also note that in the cases of
	      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
	      // from getDefaultFoundation().
	      return new MDCComponent(root, new _foundation2.default());
	    }
	  }]);

	  function MDCComponent(root, foundation) {
	    _classCallCheck(this, MDCComponent);

	    this.root_ = root;

	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    this.initialize.apply(this, args);
	    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
	    this.foundation_.init();
	    this.initialSyncWithDOM();
	  }

	  _createClass(MDCComponent, [{
	    key: 'initialize',
	    value: function initialize() /* ...args */{
	      // Subclasses can override this to do any additional setup work that would be considered part of a
	      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
	      // initialized. Any additional arguments besides root and foundation will be passed in here.
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      // Subclasses must override this method to return a properly configured foundation class for the
	      // component.
	      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
	    }
	  }, {
	    key: 'initialSyncWithDOM',
	    value: function initialSyncWithDOM() {
	      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
	      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
	      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
	      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Subclasses may implement this method to release any resources / deregister any listeners they have
	      // attached. An example of this might be deregistering a resize event from the window object.
	      this.foundation_.destroy();
	    }

	    // Wrapper method to add an event listener to the component's root element. This is most useful when
	    // listening for custom events.

	  }, {
	    key: 'listen',
	    value: function listen(evtType, handler) {
	      this.root_.addEventListener(evtType, handler);
	    }

	    // Wrapper method to remove an event listener to the component's root element. This is most useful when
	    // unlistening for custom events.

	  }, {
	    key: 'unlisten',
	    value: function unlisten(evtType, handler) {
	      this.root_.removeEventListener(evtType, handler);
	    }

	    // Fires a cross-browser-compatible custom event from the component root of the given type,
	    // with the given data.

	  }, {
	    key: 'emit',
	    value: function emit(evtType, evtData) {
	      var evt = void 0;
	      if (typeof CustomEvent === 'function') {
	        evt = new CustomEvent(evtType, { detail: evtData });
	      } else {
	        evt = document.createEvent('CustomEvent');
	        evt.initCustomEvent(evtType, false, false, evtData);
	      }

	      this.root_.dispatchEvent(evt);
	    }
	  }]);

	  return MDCComponent;
	}();

	exports.default = MDCComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCCheckbox = exports.MDCCheckboxFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _animation = __webpack_require__(5);

	var _foundation = __webpack_require__(6);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCCheckboxFoundation = _foundation2.default;

	var MDCCheckbox = exports.MDCCheckbox = function (_MDCComponent) {
	  _inherits(MDCCheckbox, _MDCComponent);

	  function MDCCheckbox() {
	    _classCallCheck(this, MDCCheckbox);

	    return _possibleConstructorReturn(this, (MDCCheckbox.__proto__ || Object.getPrototypeOf(MDCCheckbox)).apply(this, arguments));
	  }

	  _createClass(MDCCheckbox, [{
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
	          return _this2.root_.addEventListener((0, _animation.getCorrectEventName)(window, 'animation'), handler);
	        },
	        deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
	          return _this2.root_.removeEventListener((0, _animation.getCorrectEventName)(window, 'animation'), handler);
	        },
	        registerChangeHandler: function registerChangeHandler(handler) {
	          return _this2.nativeCb_.addEventListener('change', handler);
	        },
	        deregisterChangeHandler: function deregisterChangeHandler(handler) {
	          return _this2.nativeCb_.removeEventListener('change', handler);
	        },
	        getNativeControl: function getNativeControl() {
	          return _this2.nativeCb_;
	        },
	        forceLayout: function forceLayout() {
	          return _this2.root_.offsetWidth;
	        },
	        isAttachedToDOM: function isAttachedToDOM() {
	          return Boolean(_this2.root_.parentNode);
	        }
	      });
	    }
	  }, {
	    key: 'nativeCb_',
	    get: function get() {
	      var NATIVE_CONTROL_SELECTOR = _foundation2.default.strings.NATIVE_CONTROL_SELECTOR;

	      return this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
	    }
	  }, {
	    key: 'checked',
	    get: function get() {
	      return this.foundation_.isChecked();
	    },
	    set: function set(checked) {
	      this.foundation_.setChecked(checked);
	    }
	  }, {
	    key: 'indeterminate',
	    get: function get() {
	      return this.foundation_.isIndeterminate();
	    },
	    set: function set(indeterminate) {
	      this.foundation_.setIndeterminate(indeterminate);
	    }
	  }, {
	    key: 'disabled',
	    get: function get() {
	      return this.foundation_.isDisabled();
	    },
	    set: function set(disabled) {
	      this.foundation_.setDisabled(disabled);
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCCheckbox(root);
	    }
	  }]);

	  return MDCCheckbox;
	}(_base.MDCComponent);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCorrectEventName = getCorrectEventName;
	exports.getCorrectPropertyName = getCorrectPropertyName;
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var eventTypeMap = {
	  animationstart: {
	    noPrefix: 'animationstart',
	    webkitPrefix: 'webkitAnimationStart'
	  },
	  animationend: {
	    noPrefix: 'animationend',
	    webkitPrefix: 'webkitAnimationEnd'
	  },
	  animationiteration: {
	    noPrefix: 'animationiteration',
	    webkitPrefix: 'webkitAnimationIteration'
	  },
	  transitionend: {
	    noPrefix: 'transitionend',
	    webkitPrefix: 'webkitTransitionEnd'
	  }
	};

	var cssPropertyMap = {
	  animation: {
	    noPrefix: 'animation',
	    webkitPrefix: '-webkit-animation'
	  },
	  transform: {
	    noPrefix: 'transform',
	    webkitPrefix: '-webkit-transform'
	  },
	  transition: {
	    noPrefix: 'transition',
	    webkitPrefix: '-webkit-transition'
	  }
	};

	function hasProperShape(windowObj) {
	  return windowObj.document !== undefined && typeof windowObj.document.createElement === 'function';
	}

	function eventFoundInMaps(eventType) {
	  return eventType in eventTypeMap || eventType in cssPropertyMap;
	}

	// If 'animation' or 'transition' exist as style property, webkit prefix isn't necessary. Since we are unable to
	// see the event types on the element, we must rely on the corresponding style properties.
	function getJavaScriptEventName(eventType, map, el) {
	  switch (eventType) {
	    case 'animationstart':
	    case 'animationend':
	    case 'animationiteration':
	      return 'animation' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
	    case 'transitionend':
	      return 'transition' in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
	    default:
	      return map[eventType].noPrefix;
	  }
	}

	// Helper function to determine browser prefix for CSS3 animation events
	// and property names
	//
	// Parameters:
	// windowObject: Object -- Contains Document with a `createElement()` method
	// eventType: string -- The type of animation
	//
	// returns the value of the event as a string, prefixed if necessary.
	// If proper arguments are not supplied, this function will return
	// the property or event type without webkit prefix.
	//
	function getAnimationName(windowObj, eventType) {
	  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
	    return eventType;
	  }

	  var map = eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
	  var el = windowObj.document.createElement('div');
	  var eventName = '';

	  if (map === eventTypeMap) {
	    eventName = getJavaScriptEventName(eventType, map, el);
	  } else {
	    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
	  }

	  return eventName;
	}

	// Public functions to access getAnimationName() for JavaScript events or CSS
	// property names.
	//
	// Parameters:
	// windowObject: Object -- Contains Document with a `createElement()` method
	// eventType: string -- The type of animation
	//
	// returns the value of the event as a string, prefixed if necessary.
	// If proper arguments are not supplied, this function will return
	// the property or event type without webkit prefix.
	//
	function getCorrectEventName(windowObj, eventType) {
	  return getAnimationName(windowObj, eventType);
	}

	function getCorrectPropertyName(windowObj, eventType) {
	  return getAnimationName(windowObj, eventType);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _constants = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var CB_PROTO_PROPS = ['checked', 'indeterminate'];

	var MDCCheckboxFoundation = function (_MDCFoundation) {
	  _inherits(MDCCheckboxFoundation, _MDCFoundation);

	  _createClass(MDCCheckboxFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return _constants.cssClasses;
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return _constants.strings;
	    }
	  }, {
	    key: 'numbers',
	    get: function get() {
	      return _constants.numbers;
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
	        deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
	        registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
	        deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
	        getNativeControl: function getNativeControl() /* HTMLInputElement */{},
	        forceLayout: function forceLayout() {},
	        isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
	      };
	    }
	  }]);

	  function MDCCheckboxFoundation(adapter) {
	    _classCallCheck(this, MDCCheckboxFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, _extends(MDCCheckboxFoundation.defaultAdapter, adapter)));

	    _this.currentCheckState_ = _constants.strings.TRANSITION_STATE_INIT;
	    _this.currentAnimationClass_ = '';
	    _this.animEndLatchTimer_ = 0;
	    _this.animEndHandler_ = function () {
	      clearTimeout(_this.animEndLatchTimer_);
	      _this.animEndLatchTimer_ = setTimeout(function () {
	        _this.adapter_.removeClass(_this.currentAnimationClass_);
	        _this.adapter_.deregisterAnimationEndHandler(_this.animEndHandler_);
	      }, _constants.numbers.ANIM_END_LATCH_MS);
	    };
	    _this.changeHandler_ = function () {
	      return _this.transitionCheckState_();
	    };
	    return _this;
	  }

	  _createClass(MDCCheckboxFoundation, [{
	    key: 'init',
	    value: function init() {
	      this.adapter_.registerChangeHandler(this.changeHandler_);
	      this.installPropertyChangeHooks_();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.adapter_.deregisterChangeHandler(this.changeHandler_);
	      this.uninstallPropertyChangeHooks_();
	    }
	  }, {
	    key: 'isChecked',
	    value: function isChecked() {
	      return this.getNativeControl_().checked;
	    }
	  }, {
	    key: 'setChecked',
	    value: function setChecked(checked) {
	      this.getNativeControl_().checked = checked;
	    }
	  }, {
	    key: 'isIndeterminate',
	    value: function isIndeterminate() {
	      return this.getNativeControl_().indeterminate;
	    }
	  }, {
	    key: 'setIndeterminate',
	    value: function setIndeterminate(indeterminate) {
	      this.getNativeControl_().indeterminate = indeterminate;
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	      return this.getNativeControl_().disabled;
	    }
	  }, {
	    key: 'setDisabled',
	    value: function setDisabled(disabled) {
	      this.getNativeControl_().disabled = disabled;
	    }
	  }, {
	    key: 'installPropertyChangeHooks_',
	    value: function installPropertyChangeHooks_() {
	      var _this2 = this;

	      var nativeCb = this.getNativeControl_();
	      var cbProto = Object.getPrototypeOf(nativeCb);

	      CB_PROTO_PROPS.forEach(function (controlState) {
	        var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
	        // We have to check for this descriptor, since some browsers (Safari) don't support its return.
	        // See: https://bugs.webkit.org/show_bug.cgi?id=49739
	        if (validDescriptor(desc)) {
	          Object.defineProperty(nativeCb, controlState, {
	            get: desc.get,
	            set: function set(state) {
	              desc.set.call(nativeCb, state);
	              _this2.transitionCheckState_();
	            },
	            configurable: desc.configurable,
	            enumerable: desc.enumerable
	          });
	        }
	      });
	    }
	  }, {
	    key: 'uninstallPropertyChangeHooks_',
	    value: function uninstallPropertyChangeHooks_() {
	      var nativeCb = this.getNativeControl_();
	      var cbProto = Object.getPrototypeOf(nativeCb);

	      CB_PROTO_PROPS.forEach(function (controlState) {
	        var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
	        if (validDescriptor(desc)) {
	          Object.defineProperty(nativeCb, controlState, desc);
	        }
	      });
	    }
	  }, {
	    key: 'transitionCheckState_',
	    value: function transitionCheckState_() {
	      var nativeCb = this.adapter_.getNativeControl();
	      if (!nativeCb) {
	        return;
	      }
	      var oldState = this.currentCheckState_;
	      var newState = this.determineCheckState_(nativeCb);
	      if (oldState === newState) {
	        return;
	      }

	      // Check to ensure that there isn't a previously existing animation class, in case for example
	      // the user interacted with the checkbox before the animation was finished.
	      if (this.currentAnimationClass_.length > 0) {
	        clearTimeout(this.animEndLatchTimer_);
	        this.adapter_.forceLayout();
	        this.adapter_.removeClass(this.currentAnimationClass_);
	      }

	      this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
	      this.currentCheckState_ = newState;

	      // Check for parentNode so that animations are only run when the element is attached
	      // to the DOM.
	      if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
	        this.adapter_.addClass(this.currentAnimationClass_);
	        this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
	      }
	    }
	  }, {
	    key: 'determineCheckState_',
	    value: function determineCheckState_(nativeCb) {
	      var TRANSITION_STATE_INDETERMINATE = _constants.strings.TRANSITION_STATE_INDETERMINATE,
	          TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
	          TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;


	      if (nativeCb.indeterminate) {
	        return TRANSITION_STATE_INDETERMINATE;
	      }
	      return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
	    }
	  }, {
	    key: 'getTransitionAnimationClass_',
	    value: function getTransitionAnimationClass_(oldState, newState) {
	      var TRANSITION_STATE_INIT = _constants.strings.TRANSITION_STATE_INIT,
	          TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
	          TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;
	      var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
	          ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
	          ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
	          ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
	          ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
	          ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
	          ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


	      switch (oldState) {
	        case TRANSITION_STATE_INIT:
	          if (newState === TRANSITION_STATE_UNCHECKED) {
	            return '';
	          }
	        // fallthrough
	        case TRANSITION_STATE_UNCHECKED:
	          return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
	        case TRANSITION_STATE_CHECKED:
	          return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
	        // TRANSITION_STATE_INDETERMINATE
	        default:
	          return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
	      }
	    }
	  }, {
	    key: 'getNativeControl_',
	    value: function getNativeControl_() {
	      return this.adapter_.getNativeControl() || {
	        checked: false,
	        indeterminate: false,
	        disabled: false
	      };
	    }
	  }]);

	  return MDCCheckboxFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCCheckboxFoundation;


	function validDescriptor(inputPropDesc) {
	  return inputPropDesc && typeof inputPropDesc.set === 'function';
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ROOT = 'mdc-checkbox';
	var ANIM = ROOT + '--anim';

	var cssClasses = exports.cssClasses = {
	  ROOT: ROOT,
	  CHECKED: ROOT + '--checked',
	  INDETERMINATE: ROOT + '--indeterminate',
	  ANIM_UNCHECKED_CHECKED: ANIM + '-unchecked-checked',
	  ANIM_UNCHECKED_INDETERMINATE: ANIM + '-unchecked-indeterminate',
	  ANIM_CHECKED_UNCHECKED: ANIM + '-checked-unchecked',
	  ANIM_CHECKED_INDETERMINATE: ANIM + '-checked-indeterminate',
	  ANIM_INDETERMINATE_CHECKED: ANIM + '-indeterminate-checked',
	  ANIM_INDETERMINATE_UNCHECKED: ANIM + '-indeterminate-unchecked'
	};

	var strings = exports.strings = {
	  NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
	  TRANSITION_STATE_INIT: 'init',
	  TRANSITION_STATE_CHECKED: 'checked',
	  TRANSITION_STATE_UNCHECKED: 'unchecked',
	  TRANSITION_STATE_INDETERMINATE: 'indeterminate'
	};

	var numbers = exports.numbers = {
	  ANIM_END_LATCH_MS: 100
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCIconToggle = exports.MDCIconToggleFoundation = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _ripple = __webpack_require__(9);

	var _foundation = __webpack_require__(13);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCIconToggleFoundation = _foundation2.default;

	var MDCIconToggle = exports.MDCIconToggle = function (_MDCComponent) {
	  _inherits(MDCIconToggle, _MDCComponent);

	  _createClass(MDCIconToggle, null, [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCIconToggle(root);
	    }
	  }]);

	  function MDCIconToggle() {
	    var _ref;

	    _classCallCheck(this, MDCIconToggle);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_ref = MDCIconToggle.__proto__ || Object.getPrototypeOf(MDCIconToggle)).call.apply(_ref, [this].concat(args)));

	    _this.ripple_ = _this.initRipple_();
	    return _this;
	  }

	  _createClass(MDCIconToggle, [{
	    key: 'initRipple_',
	    value: function initRipple_() {
	      var _this2 = this;

	      var adapter = _extends(_ripple.MDCRipple.createAdapter(this), {
	        isUnbounded: function isUnbounded() {
	          return true;
	        },
	        isSurfaceActive: function isSurfaceActive() {
	          return _this2.foundation_.isKeyboardActivated();
	        },
	        computeBoundingRect: function computeBoundingRect() {
	          var dim = 48;

	          var _root_$getBoundingCli = _this2.root_.getBoundingClientRect(),
	              left = _root_$getBoundingCli.left,
	              top = _root_$getBoundingCli.top;

	          return {
	            left: left,
	            top: top,
	            width: dim,
	            height: dim,
	            right: left + dim,
	            bottom: left + dim
	          };
	        }
	      });
	      var foundation = new _ripple.MDCRippleFoundation(adapter);
	      return new _ripple.MDCRipple(this.root_, foundation);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.ripple_.destroy();
	      _get(MDCIconToggle.prototype.__proto__ || Object.getPrototypeOf(MDCIconToggle.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this3 = this;

	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this3.iconEl_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this3.iconEl_.classList.remove(className);
	        },
	        registerInteractionHandler: function registerInteractionHandler(type, handler) {
	          return _this3.root_.addEventListener(type, handler);
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
	          return _this3.root_.removeEventListener(type, handler);
	        },
	        setText: function setText(text) {
	          _this3.iconEl_.textContent = text;
	        },
	        getTabIndex: function getTabIndex() {
	          return (/* number */_this3.root_.tabIndex
	          );
	        },
	        setTabIndex: function setTabIndex(tabIndex) {
	          _this3.root_.tabIndex = tabIndex;
	        },
	        getAttr: function getAttr(name, value) {
	          return _this3.root_.getAttribute(name, value);
	        },
	        setAttr: function setAttr(name, value) {
	          return _this3.root_.setAttribute(name, value);
	        },
	        rmAttr: function rmAttr(name, value) {
	          return _this3.root_.removeAttribute(name, value);
	        },
	        notifyChange: function notifyChange(evtData) {
	          return _this3.emit('MDCIconToggle:change', evtData);
	        }
	      });
	    }
	  }, {
	    key: 'initialSyncWithDOM',
	    value: function initialSyncWithDOM() {
	      this.on = this.root_.getAttribute(_foundation2.default.strings.ARIA_PRESSED) === 'true';
	      this.disabled = this.root_.getAttribute(_foundation2.default.strings.ARIA_DISABLED) === 'true';
	    }
	  }, {
	    key: 'refreshToggleData',
	    value: function refreshToggleData() {
	      this.foundation_.refreshToggleData();
	    }
	  }, {
	    key: 'iconEl_',
	    get: function get() {
	      var sel = this.root_.dataset.iconInnerSelector;

	      return sel ? this.root_.querySelector(sel) : this.root_;
	    }
	  }, {
	    key: 'on',
	    get: function get() {
	      return this.foundation_.isOn();
	    },
	    set: function set(isOn) {
	      this.foundation_.toggle(isOn);
	    }
	  }, {
	    key: 'disabled',
	    get: function get() {
	      return this.foundation_.isDisabled();
	    },
	    set: function set(isDisabled) {
	      this.foundation_.setDisabled(isDisabled);
	    }
	  }]);

	  return MDCIconToggle;
	}(_base.MDCComponent);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCRipple = exports.MDCRippleFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _foundation = __webpack_require__(10);

	var _foundation2 = _interopRequireDefault(_foundation);

	var _util = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var MATCHES = (0, _util.getMatchesProperty)(HTMLElement.prototype);

	exports.MDCRippleFoundation = _foundation2.default;

	var MDCRipple = exports.MDCRipple = function (_MDCComponent) {
	  _inherits(MDCRipple, _MDCComponent);

	  function MDCRipple() {
	    _classCallCheck(this, MDCRipple);

	    return _possibleConstructorReturn(this, (MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).apply(this, arguments));
	  }

	  _createClass(MDCRipple, [{
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      return new _foundation2.default(MDCRipple.createAdapter(this));
	    }
	  }, {
	    key: 'initialSyncWithDOM',
	    value: function initialSyncWithDOM() {
	      this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
	    }
	  }, {
	    key: 'unbounded',
	    get: function get() {
	      return this.unbounded_;
	    },
	    set: function set(unbounded) {
	      var UNBOUNDED = _foundation2.default.cssClasses.UNBOUNDED;

	      this.unbounded_ = Boolean(unbounded);
	      if (this.unbounded_) {
	        this.root_.classList.add(UNBOUNDED);
	      } else {
	        this.root_.classList.remove(UNBOUNDED);
	      }
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref$isUnbounded = _ref.isUnbounded,
	          isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

	      var ripple = new MDCRipple(root);
	      // Only override unbounded behavior if option is explicitly specified
	      if (isUnbounded !== undefined) {
	        ripple.unbounded = isUnbounded;
	      }
	      return ripple;
	    }
	  }, {
	    key: 'createAdapter',
	    value: function createAdapter(instance) {
	      return {
	        browserSupportsCssVars: function browserSupportsCssVars() {
	          return (0, _util.supportsCssVariables)(window);
	        },
	        isUnbounded: function isUnbounded() {
	          return instance.unbounded;
	        },
	        isSurfaceActive: function isSurfaceActive() {
	          return instance.root_[MATCHES](':active');
	        },
	        addClass: function addClass(className) {
	          return instance.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return instance.root_.classList.remove(className);
	        },
	        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
	          return instance.root_.addEventListener(evtType, handler);
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
	          return instance.root_.removeEventListener(evtType, handler);
	        },
	        registerResizeHandler: function registerResizeHandler(handler) {
	          return window.addEventListener('resize', handler);
	        },
	        deregisterResizeHandler: function deregisterResizeHandler(handler) {
	          return window.removeEventListener('resize', handler);
	        },
	        updateCssVariable: function updateCssVariable(varName, value) {
	          return instance.root_.style.setProperty(varName, value);
	        },
	        computeBoundingRect: function computeBoundingRect() {
	          return instance.root_.getBoundingClientRect();
	        },
	        getWindowPageOffset: function getWindowPageOffset() {
	          return { x: window.pageXOffset, y: window.pageYOffset };
	        }
	      };
	    }
	  }]);

	  return MDCRipple;
	}(_base.MDCComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _animation = __webpack_require__(5);

	var _constants = __webpack_require__(11);

	var _util = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var DEACTIVATION_ACTIVATION_PAIRS = {
	  mouseup: 'mousedown',
	  pointerup: 'pointerdown',
	  touchend: 'touchstart',
	  keyup: 'keydown',
	  blur: 'focus'
	};

	var MDCRippleFoundation = function (_MDCFoundation) {
	  _inherits(MDCRippleFoundation, _MDCFoundation);

	  _createClass(MDCRippleFoundation, [{
	    key: 'isSupported_',


	    // We compute this property so that we are not querying information about the client
	    // until the point in time where the foundation requests it. This prevents scenarios where
	    // client-side feature-detection may happen too early, such as when components are rendered on the server
	    // and then initialized at mount time on the client.
	    get: function get() {
	      return this.adapter_.browserSupportsCssVars();
	    }
	  }], [{
	    key: 'cssClasses',
	    get: function get() {
	      return _constants.cssClasses;
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return _constants.strings;
	    }
	  }, {
	    key: 'numbers',
	    get: function get() {
	      return _constants.numbers;
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
	        isUnbounded: function isUnbounded() /* boolean */{},
	        isSurfaceActive: function isSurfaceActive() /* boolean */{},
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
	        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
	        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
	        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
	        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
	        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
	        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
	      };
	    }
	  }]);

	  function MDCRippleFoundation(adapter) {
	    _classCallCheck(this, MDCRippleFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

	    _this.layoutFrame_ = 0;
	    _this.frame_ = { width: 0, height: 0 };
	    _this.activationState_ = _this.defaultActivationState_();
	    _this.xfDuration_ = 0;
	    _this.maxRadius = 0;
	    _this.listenerInfos_ = [{ activate: 'touchstart', deactivate: 'touchend' }, { activate: 'pointerdown', deactivate: 'pointerup' }, { activate: 'mousedown', deactivate: 'mouseup' }, { activate: 'keydown', deactivate: 'keyup' }, { focus: 'focus', blur: 'blur' }];
	    _this.listeners_ = {
	      activate: function activate(e) {
	        return _this.activate_(e);
	      },
	      deactivate: function deactivate(e) {
	        return _this.deactivate_(e);
	      },
	      focus: function focus() {
	        return requestAnimationFrame(function () {
	          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_ACTIVE);
	        });
	      },
	      blur: function blur() {
	        return requestAnimationFrame(function () {
	          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_ACTIVE);
	        });
	      }
	    };
	    _this.unboundedOpacityFadeTimer_ = 0;
	    _this.resizeHandler_ = function () {
	      return _this.layout();
	    };
	    _this.cancelBgBounded_ = function () {};
	    _this.cancelFgBounded_ = function () {};
	    _this.cancelFgUnbounded_ = function () {};
	    return _this;
	  }

	  _createClass(MDCRippleFoundation, [{
	    key: 'defaultActivationState_',
	    value: function defaultActivationState_() {
	      return {
	        isActivated: false,
	        wasActivatedByPointer: false,
	        wasElementMadeActive: false,
	        activationStartTime: 0,
	        activationEvent: null
	      };
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;

	      if (!this.isSupported_) {
	        return;
	      }
	      this.addEventListeners_();

	      var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
	          ROOT = _MDCRippleFoundation$.ROOT,
	          UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

	      requestAnimationFrame(function () {
	        _this2.adapter_.addClass(ROOT);
	        if (_this2.adapter_.isUnbounded()) {
	          _this2.adapter_.addClass(UNBOUNDED);
	        }
	        _this2.layoutInternal_();
	      });
	    }
	  }, {
	    key: 'addEventListeners_',
	    value: function addEventListeners_() {
	      var _this3 = this;

	      this.listenerInfos_.forEach(function (info) {
	        Object.keys(info).forEach(function (k) {
	          _this3.adapter_.registerInteractionHandler(info[k], _this3.listeners_[k]);
	        });
	      });
	      this.adapter_.registerResizeHandler(this.resizeHandler_);
	    }
	  }, {
	    key: 'activate_',
	    value: function activate_(e) {
	      var _this4 = this;

	      var activationState = this.activationState_;

	      if (activationState.isActivated) {
	        return;
	      }

	      activationState.isActivated = true;
	      activationState.activationEvent = e;
	      activationState.wasActivatedByPointer = e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

	      activationState.activationStartTime = Date.now();
	      requestAnimationFrame(function () {
	        // This needs to be wrapped in an rAF call b/c web browsers
	        // report active states inconsistently when they're called within
	        // event handling code:
	        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
	        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
	        activationState.wasElementMadeActive = e.type === 'keydown' ? _this4.adapter_.isSurfaceActive() : true;
	        if (activationState.wasElementMadeActive) {
	          _this4.animateActivation_();
	        } else {
	          // Reset activation state immediately if element was not made active.
	          _this4.activationState_ = _this4.defaultActivationState_();
	        }
	      });
	    }
	  }, {
	    key: 'animateActivation_',
	    value: function animateActivation_() {
	      var _this5 = this;

	      var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
	          BG_ACTIVE = _MDCRippleFoundation$2.BG_ACTIVE,
	          BG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$2.BG_BOUNDED_ACTIVE_FILL,
	          FG_UNBOUNDED_DEACTIVATION = _MDCRippleFoundation$2.FG_UNBOUNDED_DEACTIVATION,
	          FG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$2.FG_BOUNDED_ACTIVE_FILL;

	      // If ripple is currently deactivating, cancel those animations.

	      [BG_BOUNDED_ACTIVE_FILL, FG_UNBOUNDED_DEACTIVATION, FG_BOUNDED_ACTIVE_FILL].forEach(function (c) {
	        return _this5.adapter_.removeClass(c);
	      });
	      this.cancelBgBounded_();
	      this.cancelFgBounded_();
	      this.cancelFgUnbounded_();
	      if (this.unboundedOpacityFadeTimer_) {
	        clearTimeout(this.unboundedOpacityFadeTimer_);
	        this.unboundedOpacityFadeTimer_ = 0;
	      }

	      this.adapter_.addClass(BG_ACTIVE);
	      if (this.adapter_.isUnbounded()) {
	        this.animateUnboundedActivation_();
	      }
	    }
	  }, {
	    key: 'animateUnboundedActivation_',
	    value: function animateUnboundedActivation_() {
	      var FG_UNBOUNDED_ACTIVATION = MDCRippleFoundation.cssClasses.FG_UNBOUNDED_ACTIVATION;

	      var startPoint = void 0;
	      if (this.activationState_.wasActivatedByPointer) {
	        startPoint = (0, _util.getNormalizedEventCoords)(this.activationState_.activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
	      } else {
	        startPoint = {
	          left: this.frame_.width / 2,
	          top: this.frame_.height / 2
	        };
	      }
	      var _startPoint = startPoint,
	          left = _startPoint.left,
	          top = _startPoint.top;
	      var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
	          VAR_XF_ORIGIN_X = _MDCRippleFoundation$3.VAR_XF_ORIGIN_X,
	          VAR_XF_ORIGIN_Y = _MDCRippleFoundation$3.VAR_XF_ORIGIN_Y;

	      this.adapter_.updateCssVariable(VAR_XF_ORIGIN_X, left + 'px');
	      this.adapter_.updateCssVariable(VAR_XF_ORIGIN_Y, top + 'px');
	      this.adapter_.addClass(FG_UNBOUNDED_ACTIVATION);
	    }
	  }, {
	    key: 'deactivate_',
	    value: function deactivate_(e) {
	      var _this6 = this;

	      var activationState = this.activationState_;
	      // This can happen in scenarios such as when you have a keyup event that blurs the element.

	      if (!activationState.isActivated) {
	        return;
	      }
	      var actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
	      var expectedActivationType = activationState.activationEvent.type;
	      // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
	      // Essentially, what we need to do here is decouple the deactivation UX from the actual
	      // deactivation state itself. This way, touch/pointer events in sequence do not trample one
	      // another.
	      var needsDeactivationUX = actualActivationType === expectedActivationType;
	      var needsActualDeactivation = needsDeactivationUX;
	      if (activationState.wasActivatedByPointer) {
	        needsActualDeactivation = e.type === 'mouseup';
	      }

	      var state = _extends({}, this.activationState_);
	      if (needsDeactivationUX) {
	        requestAnimationFrame(function () {
	          return _this6.animateDeactivation_(e, state);
	        });
	      }
	      if (needsActualDeactivation) {
	        this.activationState_ = this.defaultActivationState_();
	      }
	    }
	  }, {
	    key: 'animateDeactivation_',
	    value: function animateDeactivation_(e, _ref) {
	      var wasActivatedByPointer = _ref.wasActivatedByPointer,
	          wasElementMadeActive = _ref.wasElementMadeActive,
	          activationStartTime = _ref.activationStartTime;
	      var BG_ACTIVE = MDCRippleFoundation.cssClasses.BG_ACTIVE;

	      if (wasActivatedByPointer || wasElementMadeActive) {
	        this.adapter_.removeClass(BG_ACTIVE);
	        var isPointerEvent = e.type === 'touchend' || e.type === 'pointerup' || e.type === 'mouseup';
	        if (this.adapter_.isUnbounded()) {
	          this.animateUnboundedDeactivation_(this.getUnboundedDeactivationInfo_(activationStartTime));
	        } else {
	          this.animateBoundedDeactivation_(e, isPointerEvent);
	        }
	      }
	    }
	  }, {
	    key: 'animateUnboundedDeactivation_',
	    value: function animateUnboundedDeactivation_(_ref2) {
	      var _this7 = this;

	      var opacityDuration = _ref2.opacityDuration,
	          transformDuration = _ref2.transformDuration,
	          approxCurScale = _ref2.approxCurScale;
	      var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
	          FG_UNBOUNDED_ACTIVATION = _MDCRippleFoundation$4.FG_UNBOUNDED_ACTIVATION,
	          FG_UNBOUNDED_DEACTIVATION = _MDCRippleFoundation$4.FG_UNBOUNDED_DEACTIVATION;
	      var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
	          VAR_FG_UNBOUNDED_OPACITY_DURATION = _MDCRippleFoundation$5.VAR_FG_UNBOUNDED_OPACITY_DURATION,
	          VAR_FG_UNBOUNDED_TRANSFORM_DURATION = _MDCRippleFoundation$5.VAR_FG_UNBOUNDED_TRANSFORM_DURATION,
	          VAR_FG_APPROX_XF = _MDCRippleFoundation$5.VAR_FG_APPROX_XF;

	      this.adapter_.updateCssVariable(VAR_FG_APPROX_XF, 'scale(' + approxCurScale + ')');
	      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_OPACITY_DURATION, opacityDuration + 'ms');
	      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, transformDuration + 'ms');
	      this.adapter_.addClass(FG_UNBOUNDED_DEACTIVATION);
	      this.adapter_.removeClass(FG_UNBOUNDED_ACTIVATION);
	      // We use setTimeout here since we know how long the fade will take.
	      this.unboundedOpacityFadeTimer_ = setTimeout(function () {
	        _this7.adapter_.removeClass(FG_UNBOUNDED_DEACTIVATION);
	      }, opacityDuration);
	    }
	  }, {
	    key: 'getUnboundedDeactivationInfo_',
	    value: function getUnboundedDeactivationInfo_(activationStartTime) {
	      var msElapsed = Date.now() - activationStartTime;
	      var _MDCRippleFoundation$6 = MDCRippleFoundation.numbers,
	          FG_TRANSFORM_DELAY_MS = _MDCRippleFoundation$6.FG_TRANSFORM_DELAY_MS,
	          OPACITY_DURATION_DIVISOR = _MDCRippleFoundation$6.OPACITY_DURATION_DIVISOR,
	          ACTIVE_OPACITY_DURATION_MS = _MDCRippleFoundation$6.ACTIVE_OPACITY_DURATION_MS,
	          UNBOUNDED_TRANSFORM_DURATION_MS = _MDCRippleFoundation$6.UNBOUNDED_TRANSFORM_DURATION_MS,
	          MIN_OPACITY_DURATION_MS = _MDCRippleFoundation$6.MIN_OPACITY_DURATION_MS;


	      var approxCurScale = 0;
	      if (msElapsed > FG_TRANSFORM_DELAY_MS) {
	        approxCurScale = Math.min((msElapsed - FG_TRANSFORM_DELAY_MS) / this.xfDuration_, 1);
	      }

	      var transformDuration = UNBOUNDED_TRANSFORM_DURATION_MS;
	      var approxOpacity = Math.min(msElapsed / ACTIVE_OPACITY_DURATION_MS, 1);
	      var opacityDuration = Math.max(MIN_OPACITY_DURATION_MS, 1000 * approxOpacity / OPACITY_DURATION_DIVISOR);

	      return { transformDuration: transformDuration, opacityDuration: opacityDuration, approxCurScale: approxCurScale };
	    }
	  }, {
	    key: 'animateBoundedDeactivation_',
	    value: function animateBoundedDeactivation_(e, isPointerEvent) {
	      var startPoint = void 0;
	      if (isPointerEvent) {
	        startPoint = (0, _util.getNormalizedEventCoords)(e, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
	      } else {
	        startPoint = {
	          left: this.frame_.width / 2,
	          top: this.frame_.height / 2
	        };
	      }
	      var _startPoint2 = startPoint,
	          left = _startPoint2.left,
	          top = _startPoint2.top;
	      var _MDCRippleFoundation$7 = MDCRippleFoundation.strings,
	          VAR_LEFT = _MDCRippleFoundation$7.VAR_LEFT,
	          VAR_TOP = _MDCRippleFoundation$7.VAR_TOP;
	      var _MDCRippleFoundation$8 = MDCRippleFoundation.cssClasses,
	          BG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$8.BG_BOUNDED_ACTIVE_FILL,
	          FG_BOUNDED_ACTIVE_FILL = _MDCRippleFoundation$8.FG_BOUNDED_ACTIVE_FILL;

	      this.adapter_.updateCssVariable(VAR_LEFT, left + 'px');
	      this.adapter_.updateCssVariable(VAR_TOP, top + 'px');
	      this.cancelBgBounded_ = (0, _util.animateWithClass)(this.adapter_, BG_BOUNDED_ACTIVE_FILL, (0, _animation.getCorrectEventName)(window, 'transitionend'));
	      this.cancelFgBounded_ = (0, _util.animateWithClass)(this.adapter_, FG_BOUNDED_ACTIVE_FILL, (0, _animation.getCorrectEventName)(window, 'animationend'));
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this8 = this;

	      if (!this.isSupported_) {
	        return;
	      }
	      this.removeEventListeners_();

	      var _MDCRippleFoundation$9 = MDCRippleFoundation.cssClasses,
	          ROOT = _MDCRippleFoundation$9.ROOT,
	          UNBOUNDED = _MDCRippleFoundation$9.UNBOUNDED;

	      requestAnimationFrame(function () {
	        _this8.adapter_.removeClass(ROOT);
	        _this8.adapter_.removeClass(UNBOUNDED);
	        _this8.removeCssVars_();
	      });
	    }
	  }, {
	    key: 'removeEventListeners_',
	    value: function removeEventListeners_() {
	      var _this9 = this;

	      this.listenerInfos_.forEach(function (info) {
	        Object.keys(info).forEach(function (k) {
	          _this9.adapter_.deregisterInteractionHandler(info[k], _this9.listeners_[k]);
	        });
	      });
	      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
	    }
	  }, {
	    key: 'removeCssVars_',
	    value: function removeCssVars_() {
	      var _this10 = this;

	      var strings = MDCRippleFoundation.strings;

	      Object.keys(strings).forEach(function (k) {
	        if (k.indexOf('VAR_') === 0) {
	          _this10.adapter_.updateCssVariable(strings[k], null);
	        }
	      });
	    }
	  }, {
	    key: 'layout',
	    value: function layout() {
	      var _this11 = this;

	      if (this.layoutFrame_) {
	        cancelAnimationFrame(this.layoutFrame_);
	      }
	      this.layoutFrame_ = requestAnimationFrame(function () {
	        _this11.layoutInternal_();
	        _this11.layoutFrame_ = 0;
	      });
	    }
	  }, {
	    key: 'layoutInternal_',
	    value: function layoutInternal_() {
	      this.frame_ = this.adapter_.computeBoundingRect();

	      var maxDim = Math.max(this.frame_.height, this.frame_.width);

	      // Sqrt(2) * square length == diameter
	      this.maxRadius_ = Math.sqrt(2) * maxDim / 2;
	      this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
	      this.updateLayoutCssVars_();
	    }
	  }, {
	    key: 'updateLayoutCssVars_',
	    value: function updateLayoutCssVars_() {
	      var fgSize = this.maxRadius_ * 2;
	      var _MDCRippleFoundation$10 = MDCRippleFoundation.strings,
	          VAR_SURFACE_WIDTH = _MDCRippleFoundation$10.VAR_SURFACE_WIDTH,
	          VAR_SURFACE_HEIGHT = _MDCRippleFoundation$10.VAR_SURFACE_HEIGHT,
	          VAR_FG_SIZE = _MDCRippleFoundation$10.VAR_FG_SIZE,
	          VAR_FG_UNBOUNDED_TRANSFORM_DURATION = _MDCRippleFoundation$10.VAR_FG_UNBOUNDED_TRANSFORM_DURATION,
	          VAR_LEFT = _MDCRippleFoundation$10.VAR_LEFT,
	          VAR_TOP = _MDCRippleFoundation$10.VAR_TOP;


	      this.adapter_.updateCssVariable(VAR_SURFACE_WIDTH, this.frame_.width + 'px');
	      this.adapter_.updateCssVariable(VAR_SURFACE_HEIGHT, this.frame_.height + 'px');
	      this.adapter_.updateCssVariable(VAR_FG_SIZE, fgSize + 'px');
	      this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, this.xfDuration_ + 'ms');

	      if (this.adapter_.isUnbounded()) {
	        var left = -(fgSize / 2) + this.frame_.width / 2;
	        var top = -(fgSize / 2) + this.frame_.height / 2;
	        this.adapter_.updateCssVariable(VAR_LEFT, left + 'px');
	        this.adapter_.updateCssVariable(VAR_TOP, top + 'px');
	      }
	    }
	  }]);

	  return MDCRippleFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCRippleFoundation;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ROOT = exports.ROOT = 'mdc-ripple';
	var UPGRADED = exports.UPGRADED = ROOT + '-upgraded';

	var cssClasses = exports.cssClasses = {
	  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
	  // given that it's an 'upgrade' to an existing component. That being said it is the root
	  // CSS class that all other CSS classes derive from.
	  ROOT: UPGRADED,
	  UNBOUNDED: UPGRADED + '--unbounded',
	  BG_ACTIVE: UPGRADED + '--background-active',
	  BG_BOUNDED_ACTIVE_FILL: UPGRADED + '--background-bounded-active-fill',
	  FG_BOUNDED_ACTIVE_FILL: UPGRADED + '--foreground-bounded-active-fill',
	  FG_UNBOUNDED_ACTIVATION: UPGRADED + '--foreground-unbounded-activation',
	  FG_UNBOUNDED_DEACTIVATION: UPGRADED + '--foreground-unbounded-deactivation'
	};

	var strings = exports.strings = {
	  VAR_SURFACE_WIDTH: '--' + ROOT + '-surface-width',
	  VAR_SURFACE_HEIGHT: '--' + ROOT + '-surface-height',
	  VAR_FG_SIZE: '--' + ROOT + '-fg-size',
	  VAR_FG_UNBOUNDED_OPACITY_DURATION: '--' + ROOT + '-fg-unbounded-opacity-duration',
	  VAR_FG_UNBOUNDED_TRANSFORM_DURATION: '--' + ROOT + '-fg-unbounded-transform-duration',
	  VAR_LEFT: '--' + ROOT + '-left',
	  VAR_TOP: '--' + ROOT + '-top',
	  VAR_XF_ORIGIN_X: '--' + ROOT + '-xfo-x',
	  VAR_XF_ORIGIN_Y: '--' + ROOT + '-xfo-y',
	  VAR_FG_APPROX_XF: '--' + ROOT + '-fg-approx-xf'
	};

	var numbers = exports.numbers = {
	  FG_TRANSFORM_DELAY_MS: 80,
	  OPACITY_DURATION_DIVISOR: 3,
	  ACTIVE_OPACITY_DURATION_MS: 110,
	  MIN_OPACITY_DURATION_MS: 200,
	  UNBOUNDED_TRANSFORM_DURATION_MS: 200
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.supportsCssVariables = supportsCssVariables;
	exports.getMatchesProperty = getMatchesProperty;
	exports.animateWithClass = animateWithClass;
	exports.getNormalizedEventCoords = getNormalizedEventCoords;
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	function supportsCssVariables(windowObj) {
	  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
	  if (!supportsFunctionPresent) {
	    return;
	  }

	  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
	  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
	  // See: README section on Safari
	  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');
	  return explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
	}

	function getMatchesProperty(HTMLElementPrototype) {
	  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
	    return p in HTMLElementPrototype;
	  }).pop();
	}

	function animateWithClass(rippleAdapter, cls, endEvent) {
	  var cancelled = false;
	  var cancel = function cancel() {
	    if (cancelled) {
	      return;
	    }
	    cancelled = true;
	    rippleAdapter.removeClass(cls);
	    rippleAdapter.deregisterInteractionHandler(endEvent, cancel);
	  };
	  rippleAdapter.registerInteractionHandler(endEvent, cancel);
	  rippleAdapter.addClass(cls);
	  return cancel;
	}

	function getNormalizedEventCoords(ev, pageOffset, clientRect) {
	  var x = pageOffset.x,
	      y = pageOffset.y;

	  var documentLeft = x + clientRect.left;
	  var documentTop = y + clientRect.top;

	  var normalizedLeft = void 0;
	  var normalizedTop = void 0;
	  // Determine touch point relative to the ripple container.
	  if (ev.type === 'touchend') {
	    normalizedLeft = ev.changedTouches[0].pageX - documentLeft;
	    normalizedTop = ev.changedTouches[0].pageY - documentTop;
	  } else {
	    normalizedLeft = ev.pageX - documentLeft;
	    normalizedTop = ev.pageY - documentTop;
	  }

	  return { left: normalizedLeft, top: normalizedTop };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ROOT = 'mdc-icon-toggle';

	var MDCIconToggleFoundation = function (_MDCFoundation) {
	  _inherits(MDCIconToggleFoundation, _MDCFoundation);

	  _createClass(MDCIconToggleFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return {
	        ROOT: ROOT,
	        DISABLED: ROOT + '--disabled'
	      };
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return {
	        DATA_TOGGLE_ON: 'data-toggle-on',
	        DATA_TOGGLE_OFF: 'data-toggle-off',
	        ARIA_PRESSED: 'aria-pressed',
	        ARIA_DISABLED: 'aria-disabled',
	        ARIA_LABEL: 'aria-label'
	      };
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
	        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
	        setText: function setText() /* text: string */{},
	        getTabIndex: function getTabIndex() {
	          return (/* number */0
	          );
	        },
	        setTabIndex: function setTabIndex() /* tabIndex: number */{},
	        getAttr: function getAttr() {
	          return (/* name: string */ /* string */''
	          );
	        },
	        setAttr: function setAttr() /* name: string, value: string */{},
	        rmAttr: function rmAttr() /* name: string */{},
	        notifyChange: function notifyChange() /* evtData: {isOn: boolean} */{}
	      };
	    }
	  }]);

	  function MDCIconToggleFoundation(adapter) {
	    _classCallCheck(this, MDCIconToggleFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCIconToggleFoundation.__proto__ || Object.getPrototypeOf(MDCIconToggleFoundation)).call(this, _extends(MDCIconToggleFoundation.defaultAdapter, adapter)));

	    _this.on_ = false;
	    _this.disabled_ = false;
	    _this.savedTabIndex_ = -1;
	    _this.toggleOnData_ = null;
	    _this.toggleOffData_ = null;
	    _this.clickHandler_ = function () {
	      return _this.toggleFromEvt_();
	    };
	    _this.isHandlingKeydown_ = false;
	    _this.keydownHandler_ = function (evt) {
	      if (isSpace(evt)) {
	        _this.isHandlingKeydown_ = true;
	        return evt.preventDefault();
	      }
	    };
	    _this.keyupHandler_ = function (evt) {
	      if (isSpace(evt)) {
	        _this.isHandlingKeydown_ = false;
	        _this.toggleFromEvt_();
	      }
	    };
	    return _this;
	  }

	  _createClass(MDCIconToggleFoundation, [{
	    key: 'init',
	    value: function init() {
	      this.refreshToggleData();
	      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
	      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
	      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
	    }
	  }, {
	    key: 'refreshToggleData',
	    value: function refreshToggleData() {
	      var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
	          DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
	          DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

	      this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
	      this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
	      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
	      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
	    }
	  }, {
	    key: 'toggleFromEvt_',
	    value: function toggleFromEvt_() {
	      this.toggle();
	      var isOn = this.on_;

	      this.adapter_.notifyChange({ isOn: isOn });
	    }
	  }, {
	    key: 'isOn',
	    value: function isOn() {
	      return this.on_;
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

	      this.on_ = isOn;

	      var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
	          ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
	          ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;

	      var _ref = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
	          content = _ref.content,
	          label = _ref.label,
	          cssClass = _ref.cssClass;

	      var _ref2 = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
	          classToRemove = _ref2.cssClass;

	      if (this.on_) {
	        this.adapter_.setAttr(ARIA_PRESSED, 'true');
	      } else {
	        this.adapter_.setAttr(ARIA_PRESSED, 'false');
	      }

	      if (classToRemove) {
	        this.adapter_.removeClass(classToRemove);
	      }
	      if (cssClass) {
	        this.adapter_.addClass(cssClass);
	      }
	      if (content) {
	        this.adapter_.setText(content);
	      }
	      if (label) {
	        this.adapter_.setAttr(ARIA_LABEL, label);
	      }
	    }
	  }, {
	    key: 'parseJsonDataAttr_',
	    value: function parseJsonDataAttr_(dataAttr) {
	      var val = this.adapter_.getAttr(dataAttr);
	      if (!val) {
	        return {};
	      }
	      return JSON.parse(val);
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	      return this.disabled_;
	    }
	  }, {
	    key: 'setDisabled',
	    value: function setDisabled(isDisabled) {
	      this.disabled_ = isDisabled;

	      var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
	      var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


	      if (this.disabled_) {
	        this.savedTabIndex = this.adapter_.getTabIndex();
	        this.adapter_.setTabIndex(-1);
	        this.adapter_.setAttr(ARIA_DISABLED, 'true');
	        this.adapter_.addClass(DISABLED);
	      } else {
	        this.adapter_.setTabIndex(this.savedTabIndex);
	        this.adapter_.rmAttr(ARIA_DISABLED);
	        this.adapter_.removeClass(DISABLED);
	      }
	    }
	  }, {
	    key: 'isKeyboardActivated',
	    value: function isKeyboardActivated() {
	      return this.isHandlingKeydown_;
	    }
	  }]);

	  return MDCIconToggleFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCIconToggleFoundation;


	function isSpace(_ref3) {
	  var key = _ref3.key,
	      keyCode = _ref3.keyCode;

	  return key && key === 'Space' || keyCode === 32;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCRadio = exports.MDCRadioFoundation = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _ripple = __webpack_require__(9);

	var _foundation = __webpack_require__(15);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCRadioFoundation = _foundation2.default;

	var MDCRadio = exports.MDCRadio = function (_MDCComponent) {
	  _inherits(MDCRadio, _MDCComponent);

	  _createClass(MDCRadio, [{
	    key: 'checked',
	    get: function get() {
	      return this.foundation_.isChecked();
	    },
	    set: function set(checked) {
	      this.foundation_.setChecked(checked);
	    }
	  }, {
	    key: 'disabled',
	    get: function get() {
	      return this.foundation_.isDisabled();
	    },
	    set: function set(disabled) {
	      this.foundation_.setDisabled(disabled);
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCRadio(root);
	    }
	  }]);

	  function MDCRadio() {
	    var _ref;

	    _classCallCheck(this, MDCRadio);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_ref = MDCRadio.__proto__ || Object.getPrototypeOf(MDCRadio)).call.apply(_ref, [this].concat(args)));

	    _this.ripple_ = _this.initRipple_();
	    return _this;
	  }

	  _createClass(MDCRadio, [{
	    key: 'initRipple_',
	    value: function initRipple_() {
	      var _this2 = this;

	      var adapter = _extends(_ripple.MDCRipple.createAdapter(this), {
	        isUnbounded: function isUnbounded() {
	          return true;
	        },
	        // Radio buttons technically go "active" whenever there is *any* keyboard interaction. This is not the
	        // UI we desire.
	        isSurfaceActive: function isSurfaceActive() {
	          return false;
	        },
	        registerInteractionHandler: function registerInteractionHandler(type, handler) {
	          return _this2.nativeControl_.addEventListener(type, handler);
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
	          return _this2.nativeControl_.removeEventListener(type, handler);
	        },
	        computeBoundingRect: function computeBoundingRect() {
	          var _root_$getBoundingCli = _this2.root_.getBoundingClientRect(),
	              left = _root_$getBoundingCli.left,
	              top = _root_$getBoundingCli.top;

	          var DIM = 40;
	          return {
	            top: top,
	            left: left,
	            right: left + DIM,
	            bottom: top + DIM,
	            width: DIM,
	            height: DIM
	          };
	        }
	      });
	      var foundation = new _ripple.MDCRippleFoundation(adapter);
	      return new _ripple.MDCRipple(this.root_, foundation);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.ripple_.destroy();
	      _get(MDCRadio.prototype.__proto__ || Object.getPrototypeOf(MDCRadio.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this3 = this;

	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this3.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this3.root_.classList.remove(className);
	        },
	        getNativeControl: function getNativeControl() {
	          return _this3.root_.querySelector(_foundation2.default.strings.NATIVE_CONTROL_SELECTOR);
	        }
	      });
	    }
	  }, {
	    key: 'nativeControl_',
	    get: function get() {
	      return this.root_.querySelector(_foundation2.default.strings.NATIVE_CONTROL_SELECTOR);
	    }
	  }]);

	  return MDCRadio;
	}(_base.MDCComponent);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ROOT = 'mdc-radio';

	var MDCRadioFoundation = function (_MDCFoundation) {
	  _inherits(MDCRadioFoundation, _MDCFoundation);

	  function MDCRadioFoundation() {
	    _classCallCheck(this, MDCRadioFoundation);

	    return _possibleConstructorReturn(this, (MDCRadioFoundation.__proto__ || Object.getPrototypeOf(MDCRadioFoundation)).apply(this, arguments));
	  }

	  _createClass(MDCRadioFoundation, [{
	    key: 'isChecked',
	    value: function isChecked() {
	      return this.getNativeControl_().checked;
	    }
	  }, {
	    key: 'setChecked',
	    value: function setChecked(checked) {
	      this.getNativeControl_().checked = checked;
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	      return this.getNativeControl_().disabled;
	    }
	  }, {
	    key: 'setDisabled',
	    value: function setDisabled(disabled) {
	      var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;

	      this.getNativeControl_().disabled = disabled;
	      if (disabled) {
	        this.adapter_.addClass(DISABLED);
	      } else {
	        this.adapter_.removeClass(DISABLED);
	      }
	    }
	  }, {
	    key: 'getNativeControl_',
	    value: function getNativeControl_() {
	      return this.adapter_.getNativeControl() || {
	        checked: false,
	        disabled: false
	      };
	    }
	  }], [{
	    key: 'cssClasses',
	    get: function get() {
	      return {
	        ROOT: ROOT,
	        DISABLED: ROOT + '--disabled'
	      };
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return {
	        NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control'
	      };
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        getNativeControl: function getNativeControl() /* HTMLInputElement */{}
	      };
	    }
	  }]);

	  return MDCRadioFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCRadioFoundation;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _temporary = __webpack_require__(17);

	Object.defineProperty(exports, 'MDCTemporaryDrawer', {
	  enumerable: true,
	  get: function get() {
	    return _temporary.MDCTemporaryDrawer;
	  }
	});
	Object.defineProperty(exports, 'MDCTemporaryDrawerFoundation', {
	  enumerable: true,
	  get: function get() {
	    return _temporary.MDCTemporaryDrawerFoundation;
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCTemporaryDrawer = exports.MDCTemporaryDrawerFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _foundation = __webpack_require__(18);

	var _foundation2 = _interopRequireDefault(_foundation);

	var _util = __webpack_require__(20);

	var util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCTemporaryDrawerFoundation = _foundation2.default;

	var MDCTemporaryDrawer = exports.MDCTemporaryDrawer = function (_MDCComponent) {
	  _inherits(MDCTemporaryDrawer, _MDCComponent);

	  function MDCTemporaryDrawer() {
	    _classCallCheck(this, MDCTemporaryDrawer);

	    return _possibleConstructorReturn(this, (MDCTemporaryDrawer.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawer)).apply(this, arguments));
	  }

	  _createClass(MDCTemporaryDrawer, [{
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      var _MDCTemporaryDrawerFo = _foundation2.default.strings,
	          FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
	          OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        hasClass: function hasClass(className) {
	          return _this2.root_.classList.contains(className);
	        },
	        hasNecessaryDom: function hasNecessaryDom() {
	          return Boolean(_this2.drawer);
	        },
	        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
	          return _this2.root_.addEventListener(util.remapEvent(evt), handler, util.applyPassive());
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
	          return _this2.root_.removeEventListener(util.remapEvent(evt), handler, util.applyPassive());
	        },
	        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
	          return _this2.drawer.addEventListener(util.remapEvent(evt), handler);
	        },
	        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
	          return _this2.drawer.removeEventListener(util.remapEvent(evt), handler);
	        },
	        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
	          return _this2.drawer.addEventListener('transitionend', handler);
	        },
	        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
	          return _this2.drawer.removeEventListener('transitionend', handler);
	        },
	        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
	          return document.addEventListener('keydown', handler);
	        },
	        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
	          return document.removeEventListener('keydown', handler);
	        },
	        getDrawerWidth: function getDrawerWidth() {
	          return _this2.drawer.offsetWidth;
	        },
	        setTranslateX: function setTranslateX(value) {
	          return _this2.drawer.style.setProperty(util.getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
	        },
	        updateCssVariable: function updateCssVariable(value) {
	          if (util.supportsCssCustomProperties()) {
	            _this2.root_.style.setProperty(OPACITY_VAR_NAME, value);
	          }
	        },
	        getFocusableElements: function getFocusableElements() {
	          return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
	        },
	        saveElementTabState: function saveElementTabState(el) {
	          return util.saveElementTabState(el);
	        },
	        restoreElementTabState: function restoreElementTabState(el) {
	          return util.restoreElementTabState(el);
	        },
	        makeElementUntabbable: function makeElementUntabbable(el) {
	          return el.setAttribute('tabindex', -1);
	        },
	        isRtl: function isRtl() {
	          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
	        },
	        isDrawer: function isDrawer(el) {
	          return el === _this2.drawer;
	        }
	      });
	    }
	  }, {
	    key: 'open',
	    get: function get() {
	      return this.foundation_.isOpen();
	    },
	    set: function set(value) {
	      if (value) {
	        this.foundation_.open();
	      } else {
	        this.foundation_.close();
	      }
	    }

	    /* Return the drawer element inside the component. */

	  }, {
	    key: 'drawer',
	    get: function get() {
	      return this.root_.querySelector(_foundation2.default.strings.DRAWER_SELECTOR);
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCTemporaryDrawer(root);
	    }
	  }]);

	  return MDCTemporaryDrawer;
	}(_base.MDCComponent);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _constants = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var MDCTemporaryDrawerFoundation = function (_MDCFoundation) {
	  _inherits(MDCTemporaryDrawerFoundation, _MDCFoundation);

	  _createClass(MDCTemporaryDrawerFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return _constants.cssClasses;
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return _constants.strings;
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        hasClass: function hasClass() /* className: string */{},
	        hasNecessaryDom: function hasNecessaryDom() {
	          return (/* boolean */false
	          );
	        },
	        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
	        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
	        registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
	        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
	        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
	        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
	        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
	        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
	        setTranslateX: function setTranslateX() /* value: number | null */{},
	        updateCssVariable: function updateCssVariable() /* value: string */{},
	        getFocusableElements: function getFocusableElements() /* NodeList */{},
	        saveElementTabState: function saveElementTabState() /* el: Element */{},
	        restoreElementTabState: function restoreElementTabState() /* el: Element */{},
	        makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
	        isRtl: function isRtl() {
	          return (/* boolean */false
	          );
	        },
	        getDrawerWidth: function getDrawerWidth() {
	          return (/* number */0
	          );
	        },
	        isDrawer: function isDrawer() {
	          return (/* el: Element */ /* boolean */false
	          );
	        }
	      };
	    }
	  }]);

	  function MDCTemporaryDrawerFoundation(adapter) {
	    _classCallCheck(this, MDCTemporaryDrawerFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter)));

	    _this.transitionEndHandler_ = function (ev) {
	      if (_this.adapter_.isDrawer(ev.target)) {
	        _this.adapter_.removeClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
	        _this.adapter_.deregisterTransitionEndHandler(_this.transitionEndHandler_);
	      }
	    };

	    _this.inert_ = false;

	    _this.componentClickHandler_ = function () {
	      return _this.close();
	    };
	    _this.drawerClickHandler_ = function (evt) {
	      return evt.stopPropagation();
	    };
	    _this.componentTouchStartHandler_ = function (evt) {
	      return _this.handleTouchStart_(evt);
	    };
	    _this.componentTouchMoveHandler_ = function (evt) {
	      return _this.handleTouchMove_(evt);
	    };
	    _this.componentTouchEndHandler_ = function (evt) {
	      return _this.handleTouchEnd_(evt);
	    };
	    _this.documentKeydownHandler_ = function (evt) {
	      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
	        _this.close();
	      }
	    };
	    return _this;
	  }

	  _createClass(MDCTemporaryDrawerFoundation, [{
	    key: 'init',
	    value: function init() {
	      var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.cssClasses,
	          ROOT = _MDCTemporaryDrawerFo.ROOT,
	          OPEN = _MDCTemporaryDrawerFo.OPEN;


	      if (!this.adapter_.hasClass(ROOT)) {
	        throw new Error(ROOT + ' class required in root element.');
	      }

	      if (!this.adapter_.hasNecessaryDom()) {
	        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
	      }

	      if (this.adapter_.hasClass(OPEN)) {
	        this.isOpen_ = true;
	      } else {
	        this.detabinate_();
	        this.isOpen_ = false;
	      }

	      // Make browser aware of custom property being used in this element.
	      // Workaround for certain types of hard-to-reproduce heisenbugs.
	      this.adapter_.updateCssVariable(0);

	      this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
	      this.adapter_.registerDrawerInteractionHandler('click', this.drawerClickHandler_);
	      this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
	      this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
	      this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
	      this.adapter_.deregisterDrawerInteractionHandler('click', this.drawerClickHandler_);
	      this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
	      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
	      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
	      // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
	      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      // Make sure custom property values are cleared before starting.
	      this.adapter_.updateCssVariable('');

	      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
	      this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
	      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
	      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN);
	      this.retabinate_();
	      this.isOpen_ = true;
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      // Make sure custom property values are cleared before making any changes.
	      this.adapter_.updateCssVariable('');

	      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
	      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
	      this.adapter_.addClass(MDCTemporaryDrawerFoundation.cssClasses.ANIMATING);
	      this.adapter_.removeClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN);
	      this.detabinate_();
	      this.isOpen_ = false;
	    }
	  }, {
	    key: 'isOpen',
	    value: function isOpen() {
	      return this.isOpen_;
	    }

	    /**
	     *  Render all children of the drawer inert when it's closed.
	     */

	  }, {
	    key: 'detabinate_',
	    value: function detabinate_() {
	      if (this.inert_) {
	        return;
	      }

	      var elements = this.adapter_.getFocusableElements();
	      if (elements) {
	        for (var i = 0; i < elements.length; i++) {
	          this.adapter_.saveElementTabState(elements[i]);
	          this.adapter_.makeElementUntabbable(elements[i]);
	        }
	      }

	      this.inert_ = true;
	    }

	    /**
	     *  Make all children of the drawer tabbable again when it's open.
	     */

	  }, {
	    key: 'retabinate_',
	    value: function retabinate_() {
	      if (!this.inert_) {
	        return;
	      }

	      var elements = this.adapter_.getFocusableElements();
	      if (elements) {
	        for (var i = 0; i < elements.length; i++) {
	          this.adapter_.restoreElementTabState(elements[i]);
	        }
	      }

	      this.inert_ = false;
	    }
	  }, {
	    key: 'handleTouchStart_',
	    value: function handleTouchStart_(evt) {
	      if (!this.adapter_.hasClass(MDCTemporaryDrawerFoundation.cssClasses.OPEN)) {
	        return;
	      }
	      if (evt.pointerType && evt.pointerType !== 'touch') {
	        return;
	      }

	      this.direction_ = this.adapter_.isRtl() ? -1 : 1;
	      this.drawerWidth_ = this.adapter_.getDrawerWidth();
	      this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
	      this.currentX_ = this.startX_;
	      this.touchingSideNav_ = true;

	      requestAnimationFrame(this.updateDrawer_.bind(this));
	    }
	  }, {
	    key: 'handleTouchMove_',
	    value: function handleTouchMove_(evt) {
	      if (evt.pointerType && evt.pointerType !== 'touch') {
	        return;
	      }

	      this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
	    }
	  }, {
	    key: 'handleTouchEnd_',
	    value: function handleTouchEnd_(evt) {
	      if (evt.pointerType && evt.pointerType !== 'touch') {
	        return;
	      }

	      this.touchingSideNav_ = false;
	      this.adapter_.setTranslateX(null);
	      this.adapter_.updateCssVariable('');

	      var newPos = null;
	      if (this.direction_ === 1) {
	        newPos = Math.min(0, this.currentX_ - this.startX_);
	      } else {
	        newPos = Math.max(0, this.currentX_ - this.startX_);
	      }

	      // Did the user close the drawer by more than 50%?
	      if (Math.abs(newPos / this.drawerWidth_) >= 0.5) {
	        this.close();
	      } else {
	        // Triggering an open here means we'll get a nice animation back to the fully open state.
	        this.open();
	      }
	    }
	  }, {
	    key: 'updateDrawer_',
	    value: function updateDrawer_() {
	      if (!this.touchingSideNav_) {
	        return;
	      }

	      requestAnimationFrame(this.updateDrawer_.bind(this));

	      var newPos = null;
	      var newOpacity = null;

	      if (this.direction_ === 1) {
	        newPos = Math.min(0, this.currentX_ - this.startX_);
	      } else {
	        newPos = Math.max(0, this.currentX_ - this.startX_);
	      }

	      newOpacity = Math.max(0, 1 + this.direction_ * (newPos / this.drawerWidth_));

	      this.adapter_.setTranslateX(newPos);
	      this.adapter_.updateCssVariable(newOpacity);
	    }
	  }]);

	  return MDCTemporaryDrawerFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCTemporaryDrawerFoundation;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ROOT = 'mdc-temporary-drawer';

	var cssClasses = exports.cssClasses = {
	  ROOT: ROOT,
	  OPEN: ROOT + '--open',
	  ANIMATING: ROOT + '--animating',
	  RIGHT: ROOT + '--right'
	};

	var strings = exports.strings = {
	  DRAWER_SELECTOR: '.' + ROOT + '__drawer',
	  OPACITY_VAR_NAME: '--' + ROOT + '-opacity',
	  FOCUSABLE_ELEMENTS: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.remapEvent = remapEvent;
	exports.getTransformPropertyName = getTransformPropertyName;
	exports.supportsCssCustomProperties = supportsCssCustomProperties;
	exports.applyPassive = applyPassive;
	exports.saveElementTabState = saveElementTabState;
	exports.restoreElementTabState = restoreElementTabState;
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var TAB_DATA = 'data-mdc-tabindex';
	var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

	var storedTransformPropertyName_ = void 0;
	var supportsPassive_ = void 0;

	// Remap touch events to pointer events, if the browser doesn't support touch events.
	function remapEvent(eventName) {
	  var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

	  if (!('ontouchstart' in globalObj.document)) {
	    switch (eventName) {
	      case 'touchstart':
	        return 'pointerdown';
	      case 'touchmove':
	        return 'pointermove';
	      case 'touchend':
	        return 'pointerup';
	      default:
	        return eventName;
	    }
	  }

	  return eventName;
	}

	// Choose the correct transform property to use on the current browser.
	function getTransformPropertyName() {
	  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (storedTransformPropertyName_ === undefined || forceRefresh) {
	    var el = globalObj.document.createElement('div');
	    var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
	    storedTransformPropertyName_ = transformPropertyName;
	  }

	  return storedTransformPropertyName_;
	}

	// Determine whether the current browser supports CSS properties.
	function supportsCssCustomProperties() {
	  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

	  if ('CSS' in globalObj) {
	    return globalObj.CSS.supports('(--color: red)');
	  }
	  return false;
	}

	// Determine whether the current browser supports passive event listeners, and if so, use them.
	function applyPassive() {
	  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (supportsPassive_ === undefined || forceRefresh) {
	    var isSupported = false;
	    try {
	      globalObj.document.addEventListener('test', null, { get passive() {
	          isSupported = true;
	        } });
	    } catch (e) {}

	    supportsPassive_ = isSupported;
	  }

	  return supportsPassive_ ? { passive: true } : false;
	}

	// Save the tab state for an element.
	function saveElementTabState(el) {
	  if (el.hasAttribute('tabindex')) {
	    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
	  }
	  el.setAttribute(TAB_DATA_HANDLED, true);
	}

	// Restore the tab state for an element, if it was saved.
	function restoreElementTabState(el) {
	  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
	  if (el.hasAttribute(TAB_DATA_HANDLED)) {
	    if (el.hasAttribute(TAB_DATA)) {
	      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
	      el.removeAttribute(TAB_DATA);
	    } else {
	      el.removeAttribute('tabindex');
	    }
	    el.removeAttribute(TAB_DATA_HANDLED);
	  }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCTextfield = exports.MDCTextfieldFoundation = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _foundation = __webpack_require__(22);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCTextfieldFoundation = _foundation2.default;
	var cssClasses = _foundation2.default.cssClasses;

	var MDCTextfield = exports.MDCTextfield = function (_MDCComponent) {
	  _inherits(MDCTextfield, _MDCComponent);

	  _createClass(MDCTextfield, null, [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCTextfield(root);
	    }
	  }]);

	  function MDCTextfield() {
	    var _ref;

	    _classCallCheck(this, MDCTextfield);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_ref = MDCTextfield.__proto__ || Object.getPrototypeOf(MDCTextfield)).call.apply(_ref, [this].concat(args)));

	    var input = _this.input_;
	    _this.helptextElement = input.hasAttribute('aria-controls') ? document.getElementById(input.getAttribute('aria-controls')) : null;
	    return _this;
	  }

	  _createClass(MDCTextfield, [{
	    key: 'initialSyncWithDom',
	    value: function initialSyncWithDom() {
	      this.disabled = this.input_.disabled;
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      return new _foundation2.default(_extends({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        addClassToLabel: function addClassToLabel(className) {
	          var label = _this2.label_;
	          if (label) {
	            label.classList.add(className);
	          }
	        },
	        removeClassFromLabel: function removeClassFromLabel(className) {
	          var label = _this2.label_;
	          if (label) {
	            label.classList.remove(className);
	          }
	        }
	      }, this.getInputAdapterMethods_(), this.getHelptextAdapterMethods_()));
	    }
	  }, {
	    key: 'getInputAdapterMethods_',
	    value: function getInputAdapterMethods_() {
	      var _this3 = this;

	      return {
	        registerInputFocusHandler: function registerInputFocusHandler(handler) {
	          return _this3.input_.addEventListener('focus', handler);
	        },
	        registerInputBlurHandler: function registerInputBlurHandler(handler) {
	          return _this3.input_.addEventListener('blur', handler);
	        },
	        deregisterInputFocusHandler: function deregisterInputFocusHandler(handler) {
	          return _this3.input_.removeEventListener('focus', handler);
	        },
	        deregisterInputBlurHandler: function deregisterInputBlurHandler(handler) {
	          return _this3.input_.removeEventListener('blur', handler);
	        },
	        getNativeInput: function getNativeInput() {
	          return _this3.input_;
	        }
	      };
	    }
	  }, {
	    key: 'getHelptextAdapterMethods_',
	    value: function getHelptextAdapterMethods_() {
	      var _this4 = this;

	      return {
	        addClassToHelptext: function addClassToHelptext(className) {
	          if (_this4.helptextElement) {
	            _this4.helptextElement.classList.add(className);
	          }
	        },
	        removeClassFromHelptext: function removeClassFromHelptext(className) {
	          if (_this4.helptextElement) {
	            _this4.helptextElement.classList.remove(className);
	          }
	        },
	        helptextHasClass: function helptextHasClass(className) {
	          if (!_this4.helptextElement) {
	            return false;
	          }
	          return _this4.helptextElement.classList.contains(className);
	        },
	        setHelptextAttr: function setHelptextAttr(name, value) {
	          if (_this4.helptextElement) {
	            _this4.helptextElement.setAttribute(name, value);
	          }
	        },
	        removeHelptextAttr: function removeHelptextAttr(name) {
	          if (_this4.helptextElement) {
	            _this4.helptextElement.removeAttribute(name);
	          }
	        }
	      };
	    }
	  }, {
	    key: 'disabled',
	    get: function get() {
	      return this.foundation_.isDisabled();
	    },
	    set: function set(disabled) {
	      this.foundation_.setDisabled(disabled);
	    }
	  }, {
	    key: 'input_',
	    get: function get() {
	      return this.root_.querySelector('.' + cssClasses.ROOT + '__input');
	    }
	  }, {
	    key: 'label_',
	    get: function get() {
	      return this.root_.querySelector('.' + cssClasses.ROOT + '__label');
	    }
	  }]);

	  return MDCTextfield;
	}(_base.MDCComponent);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ROOT = 'mdc-textfield';

	var MDCTextfieldFoundation = function (_MDCFoundation) {
	  _inherits(MDCTextfieldFoundation, _MDCFoundation);

	  _createClass(MDCTextfieldFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return {
	        ROOT: ROOT,
	        UPGRADED: ROOT + '--upgraded',
	        DISABLED: ROOT + '--disabled',
	        FOCUSED: ROOT + '--focused',
	        INVALID: ROOT + '--invalid',
	        HELPTEXT_PERSISTENT: ROOT + '-helptext--persistent',
	        HELPTEXT_VALIDATION_MSG: ROOT + '-helptext--validation-msg',
	        LABEL_FLOAT_ABOVE: ROOT + '__label--float-above'
	      };
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return {
	        ARIA_HIDDEN: 'aria-hidden',
	        ROLE: 'role'
	      };
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        addClassToLabel: function addClassToLabel() /* className: string */{},
	        removeClassFromLabel: function removeClassFromLabel() /* className: string */{},
	        addClassToHelptext: function addClassToHelptext() /* className: string */{},
	        removeClassFromHelptext: function removeClassFromHelptext() /* className: string */{},
	        helptextHasClass: function helptextHasClass() {
	          return (/* className: string */ /* boolean */false
	          );
	        },
	        registerInputFocusHandler: function registerInputFocusHandler() /* handler: EventListener */{},
	        deregisterInputFocusHandler: function deregisterInputFocusHandler() /* handler: EventListener */{},
	        registerInputBlurHandler: function registerInputBlurHandler() /* handler: EventListener */{},
	        deregisterInputBlurHandler: function deregisterInputBlurHandler() /* handler: EventListener */{},
	        setHelptextAttr: function setHelptextAttr() /* name: string, value: string */{},
	        removeHelptextAttr: function removeHelptextAttr() /* name: string, value: string */{},
	        getNativeInput: function getNativeInput() {
	          return (/* HTMLInputElement */{}
	          );
	        }
	      };
	    }
	  }]);

	  function MDCTextfieldFoundation() {
	    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MDCTextfieldFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCTextfieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextfieldFoundation)).call(this, _extends(MDCTextfieldFoundation.defaultAdapter, adapter)));

	    _this.inputFocusHandler_ = function () {
	      return _this.activateFocus_();
	    };
	    _this.inputBlurHandler_ = function () {
	      return _this.deactivateFocus_();
	    };
	    return _this;
	  }

	  _createClass(MDCTextfieldFoundation, [{
	    key: 'init',
	    value: function init() {
	      this.adapter_.addClass(MDCTextfieldFoundation.cssClasses.UPGRADED);
	      this.adapter_.registerInputFocusHandler(this.inputFocusHandler_);
	      this.adapter_.registerInputBlurHandler(this.inputBlurHandler_);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.adapter_.removeClass(MDCTextfieldFoundation.cssClasses.UPGRADED);
	      this.adapter_.deregisterInputFocusHandler(this.inputFocusHandler_);
	      this.adapter_.deregisterInputBlurHandler(this.inputBlurHandler_);
	    }
	  }, {
	    key: 'activateFocus_',
	    value: function activateFocus_() {
	      var _MDCTextfieldFoundati = MDCTextfieldFoundation.cssClasses,
	          FOCUSED = _MDCTextfieldFoundati.FOCUSED,
	          LABEL_FLOAT_ABOVE = _MDCTextfieldFoundati.LABEL_FLOAT_ABOVE;

	      this.adapter_.addClass(FOCUSED);
	      this.adapter_.addClassToLabel(LABEL_FLOAT_ABOVE);
	      this.showHelptext_();
	    }
	  }, {
	    key: 'showHelptext_',
	    value: function showHelptext_() {
	      var ARIA_HIDDEN = MDCTextfieldFoundation.strings.ARIA_HIDDEN;

	      this.adapter_.removeHelptextAttr(ARIA_HIDDEN);
	    }
	  }, {
	    key: 'deactivateFocus_',
	    value: function deactivateFocus_() {
	      var _MDCTextfieldFoundati2 = MDCTextfieldFoundation.cssClasses,
	          FOCUSED = _MDCTextfieldFoundati2.FOCUSED,
	          INVALID = _MDCTextfieldFoundati2.INVALID,
	          LABEL_FLOAT_ABOVE = _MDCTextfieldFoundati2.LABEL_FLOAT_ABOVE;

	      var input = this.getNativeInput_();
	      var isValid = input.checkValidity();

	      this.adapter_.removeClass(FOCUSED);
	      if (!input.value) {
	        this.adapter_.removeClassFromLabel(LABEL_FLOAT_ABOVE);
	      }
	      if (isValid) {
	        this.adapter_.removeClass(INVALID);
	      } else {
	        this.adapter_.addClass(INVALID);
	      }
	      this.updateHelptextOnDeactivation_(isValid);
	    }
	  }, {
	    key: 'updateHelptextOnDeactivation_',
	    value: function updateHelptextOnDeactivation_(isValid) {
	      var _MDCTextfieldFoundati3 = MDCTextfieldFoundation.cssClasses,
	          HELPTEXT_PERSISTENT = _MDCTextfieldFoundati3.HELPTEXT_PERSISTENT,
	          HELPTEXT_VALIDATION_MSG = _MDCTextfieldFoundati3.HELPTEXT_VALIDATION_MSG;
	      var ROLE = MDCTextfieldFoundation.strings.ROLE;

	      var helptextIsPersistent = this.adapter_.helptextHasClass(HELPTEXT_PERSISTENT);
	      var helptextIsValidationMsg = this.adapter_.helptextHasClass(HELPTEXT_VALIDATION_MSG);
	      var validationMsgNeedsDisplay = helptextIsValidationMsg && !isValid;

	      if (validationMsgNeedsDisplay) {
	        this.adapter_.setHelptextAttr(ROLE, 'alert');
	      } else {
	        this.adapter_.removeHelptextAttr(ROLE);
	      }

	      if (helptextIsPersistent || validationMsgNeedsDisplay) {
	        return;
	      }
	      this.hideHelptext_();
	    }
	  }, {
	    key: 'hideHelptext_',
	    value: function hideHelptext_() {
	      var ARIA_HIDDEN = MDCTextfieldFoundation.strings.ARIA_HIDDEN;

	      this.adapter_.setHelptextAttr(ARIA_HIDDEN, 'true');
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	      return this.getNativeInput_().disabled;
	    }
	  }, {
	    key: 'setDisabled',
	    value: function setDisabled(disabled) {
	      var DISABLED = MDCTextfieldFoundation.cssClasses.DISABLED;

	      this.getNativeInput_().disabled = disabled;
	      if (disabled) {
	        this.adapter_.addClass(DISABLED);
	      } else {
	        this.adapter_.removeClass(DISABLED);
	      }
	    }
	  }, {
	    key: 'getNativeInput_',
	    value: function getNativeInput_() {
	      return this.adapter_.getNativeInput() || {
	        checkValidity: function checkValidity() {
	          return true;
	        },
	        value: '',
	        disabled: false
	      };
	    }
	  }]);

	  return MDCTextfieldFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCTextfieldFoundation;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCSnackbar = exports.MDCSnackbarFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _foundation = __webpack_require__(24);

	var _foundation2 = _interopRequireDefault(_foundation);

	var _animation = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCSnackbarFoundation = _foundation2.default;

	var MDCSnackbar = exports.MDCSnackbar = function (_MDCComponent) {
	  _inherits(MDCSnackbar, _MDCComponent);

	  function MDCSnackbar() {
	    _classCallCheck(this, MDCSnackbar);

	    return _possibleConstructorReturn(this, (MDCSnackbar.__proto__ || Object.getPrototypeOf(MDCSnackbar)).apply(this, arguments));
	  }

	  _createClass(MDCSnackbar, [{
	    key: 'show',
	    value: function show(data) {
	      this.foundation_.show(data);
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      var _MDCSnackbarFoundatio = _foundation2.default.strings,
	          TEXT_SELECTOR = _MDCSnackbarFoundatio.TEXT_SELECTOR,
	          ACTION_BUTTON_SELECTOR = _MDCSnackbarFoundatio.ACTION_BUTTON_SELECTOR;

	      var getText = function getText() {
	        return _this2.root_.querySelector(TEXT_SELECTOR);
	      };
	      var getActionButton = function getActionButton() {
	        return _this2.root_.querySelector(ACTION_BUTTON_SELECTOR);
	      };

	      /* eslint brace-style: "off" */
	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        setAriaHidden: function setAriaHidden() {
	          return _this2.root_.setAttribute('aria-hidden', 'true');
	        },
	        unsetAriaHidden: function unsetAriaHidden() {
	          return _this2.root_.removeAttribute('aria-hidden');
	        },
	        setActionAriaHidden: function setActionAriaHidden() {
	          return getActionButton().setAttribute('aria-hidden', 'true');
	        },
	        unsetActionAriaHidden: function unsetActionAriaHidden() {
	          return getActionButton().removeAttribute('aria-hidden');
	        },
	        setActionText: function setActionText(text) {
	          getActionButton().textContent = text;
	        },
	        setMessageText: function setMessageText(text) {
	          getText().textContent = text;
	        },
	        registerActionClickHandler: function registerActionClickHandler(handler) {
	          return getActionButton().addEventListener('click', handler);
	        },
	        deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
	          return getActionButton().removeEventListener('click', handler);
	        },
	        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
	          return _this2.root_.addEventListener((0, _animation.getCorrectEventName)(window, 'transitionend'), handler);
	        },
	        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
	          return _this2.root_.removeEventListener((0, _animation.getCorrectEventName)(window, 'transitionend'), handler);
	        }
	      });
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCSnackbar(root);
	    }
	  }]);

	  return MDCSnackbar;
	}(_base.MDCComponent);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _constants = __webpack_require__(25);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var MDCSnackbarFoundation = function (_MDCFoundation) {
	  _inherits(MDCSnackbarFoundation, _MDCFoundation);

	  _createClass(MDCSnackbarFoundation, [{
	    key: 'active',
	    get: function get() {
	      return this.active_;
	    }
	  }], [{
	    key: 'cssClasses',
	    get: function get() {
	      return _constants.cssClasses;
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return _constants.strings;
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        setAriaHidden: function setAriaHidden() {},
	        unsetAriaHidden: function unsetAriaHidden() {},
	        setMessageText: function setMessageText() /* message: string */{},
	        setActionText: function setActionText() /* actionText: string */{},
	        setActionAriaHidden: function setActionAriaHidden() {},
	        unsetActionAriaHidden: function unsetActionAriaHidden() {},
	        registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
	        deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
	        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
	        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{}
	      };
	    }
	  }]);

	  function MDCSnackbarFoundation(adapter) {
	    _classCallCheck(this, MDCSnackbarFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, _extends(MDCSnackbarFoundation.defaultAdapter, adapter)));

	    _this.active_ = false;
	    _this.queue_ = [];
	    _this.actionClickHandler_ = function () {
	      return _this.invokeAction_();
	    };
	    return _this;
	  }

	  _createClass(MDCSnackbarFoundation, [{
	    key: 'init',
	    value: function init() {
	      this.adapter_.registerActionClickHandler(this.actionClickHandler_);
	      this.adapter_.setAriaHidden();
	      this.adapter_.setActionAriaHidden();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
	    }
	  }, {
	    key: 'show',
	    value: function show(data) {
	      if (!data) {
	        throw new Error('Please provide a data object with at least a message to display.');
	      }
	      if (!data.message) {
	        throw new Error('Please provide a message to be displayed.');
	      }
	      if (data.actionHandler && !data.actionText) {
	        throw new Error('Please provide action text with the handler.');
	      }

	      if (this.active) {
	        this.queue_.push(data);
	        return;
	      }

	      var ACTIVE = _constants.cssClasses.ACTIVE,
	          MULTILINE = _constants.cssClasses.MULTILINE,
	          ACTION_ON_BOTTOM = _constants.cssClasses.ACTION_ON_BOTTOM;
	      var MESSAGE_TIMEOUT = _constants.numbers.MESSAGE_TIMEOUT;


	      this.adapter_.setMessageText(data.message);

	      if (data.multiline) {
	        this.adapter_.addClass(MULTILINE);
	        if (data.actionOnBottom) {
	          this.adapter_.addClass(ACTION_ON_BOTTOM);
	        }
	      }

	      if (data.actionHandler) {
	        this.adapter_.setActionText(data.actionText);
	        this.actionHandler_ = data.actionHandler;
	        this.setActionHidden_(false);
	      } else {
	        this.setActionHidden_(true);
	        this.actionHandler_ = null;
	        this.adapter_.setActionText(null);
	      }

	      this.active_ = true;
	      this.adapter_.addClass(ACTIVE);
	      this.adapter_.unsetAriaHidden();

	      setTimeout(this.cleanup_.bind(this), data.timeout || MESSAGE_TIMEOUT);
	    }
	  }, {
	    key: 'invokeAction_',
	    value: function invokeAction_() {
	      if (!this.actionHandler_) {
	        return;
	      }

	      this.actionHandler_();
	    }
	  }, {
	    key: 'cleanup_',
	    value: function cleanup_() {
	      var _this2 = this;

	      var ACTIVE = _constants.cssClasses.ACTIVE,
	          MULTILINE = _constants.cssClasses.MULTILINE,
	          ACTION_ON_BOTTOM = _constants.cssClasses.ACTION_ON_BOTTOM;


	      this.adapter_.removeClass(ACTIVE);

	      var handler = function handler() {
	        _this2.adapter_.deregisterTransitionEndHandler(handler);
	        _this2.adapter_.removeClass(MULTILINE);
	        _this2.adapter_.removeClass(ACTION_ON_BOTTOM);
	        _this2.setActionHidden_(true);
	        _this2.adapter_.setMessageText(null);
	        _this2.adapter_.setActionText(null);
	        _this2.adapter_.setAriaHidden();
	        _this2.active_ = false;
	        _this2.showNext_();
	      };

	      this.adapter_.registerTransitionEndHandler(handler);
	    }
	  }, {
	    key: 'showNext_',
	    value: function showNext_() {
	      if (!this.queue_.length) {
	        return;
	      }

	      this.show(this.queue_.shift());
	    }
	  }, {
	    key: 'setActionHidden_',
	    value: function setActionHidden_(isHidden) {
	      if (isHidden) {
	        this.adapter_.setActionAriaHidden();
	      } else {
	        this.adapter_.unsetActionAriaHidden();
	      }
	    }
	  }]);

	  return MDCSnackbarFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCSnackbarFoundation;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ROOT = 'mdc-snackbar';

	var cssClasses = exports.cssClasses = {
	  ROOT: ROOT,
	  TEXT: ROOT + '__text',
	  ACTION_WRAPPER: ROOT + '__action-wrapper',
	  ACTION_BUTTON: ROOT + '__action-button',
	  ACTIVE: ROOT + '--active',
	  MULTILINE: ROOT + '--multiline',
	  ACTION_ON_BOTTOM: ROOT + '--action-on-bottom'
	};

	var strings = exports.strings = {
	  get TEXT_SELECTOR() {
	    return '.' + cssClasses.TEXT;
	  },

	  get ACTION_WRAPPER_SELECTOR() {
	    return '.' + cssClasses.ACTION_WRAPPER;
	  },

	  get ACTION_BUTTON_SELECTOR() {
	    return '.' + cssClasses.ACTION_BUTTON;
	  }
	};

	var numbers = exports.numbers = {
	  MESSAGE_TIMEOUT: 2750
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _simple = __webpack_require__(27);

	Object.defineProperty(exports, 'MDCSimpleMenu', {
	  enumerable: true,
	  get: function get() {
	    return _simple.MDCSimpleMenu;
	  }
	});
	Object.defineProperty(exports, 'MDCSimpleMenuFoundation', {
	  enumerable: true,
	  get: function get() {
	    return _simple.MDCSimpleMenuFoundation;
	  }
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCSimpleMenu = exports.MDCSimpleMenuFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _foundation = __webpack_require__(28);

	var _foundation2 = _interopRequireDefault(_foundation);

	var _util = __webpack_require__(30);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCSimpleMenuFoundation = _foundation2.default;

	var MDCSimpleMenu = exports.MDCSimpleMenu = function (_MDCComponent) {
	  _inherits(MDCSimpleMenu, _MDCComponent);

	  function MDCSimpleMenu() {
	    _classCallCheck(this, MDCSimpleMenu);

	    return _possibleConstructorReturn(this, (MDCSimpleMenu.__proto__ || Object.getPrototypeOf(MDCSimpleMenu)).apply(this, arguments));
	  }

	  _createClass(MDCSimpleMenu, [{
	    key: 'show',
	    value: function show() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$focusIndex = _ref.focusIndex,
	          focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

	      this.foundation_.open({ focusIndex: focusIndex });
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.foundation_.close();
	    }

	    /* Return the item container element inside the component. */

	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        hasClass: function hasClass(className) {
	          return _this2.root_.classList.contains(className);
	        },
	        hasNecessaryDom: function hasNecessaryDom() {
	          return Boolean(_this2.itemsContainer_);
	        },
	        getInnerDimensions: function getInnerDimensions() {
	          var itemsContainer = _this2.itemsContainer_;

	          return { width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight };
	        },
	        hasAnchor: function hasAnchor() {
	          return _this2.root_.parentElement && _this2.root_.parentElement.classList.contains('mdc-menu-anchor');
	        },
	        getAnchorDimensions: function getAnchorDimensions() {
	          return _this2.root_.parentElement.getBoundingClientRect();
	        },
	        getWindowDimensions: function getWindowDimensions() {
	          return { width: window.innerWidth, height: window.innerHeight };
	        },
	        setScale: function setScale(x, y) {
	          _this2.root_.style[(0, _util.getTransformPropertyName)(window)] = 'scale(' + x + ', ' + y + ')';
	        },
	        setInnerScale: function setInnerScale(x, y) {
	          _this2.itemsContainer_.style[(0, _util.getTransformPropertyName)(window)] = 'scale(' + x + ', ' + y + ')';
	        },
	        getNumberOfItems: function getNumberOfItems() {
	          return _this2.items.length;
	        },
	        registerInteractionHandler: function registerInteractionHandler(type, handler) {
	          return _this2.root_.addEventListener(type, handler);
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
	          return _this2.root_.removeEventListener(type, handler);
	        },
	        registerDocumentClickHandler: function registerDocumentClickHandler(handler) {
	          return document.addEventListener('click', handler);
	        },
	        deregisterDocumentClickHandler: function deregisterDocumentClickHandler(handler) {
	          return document.removeEventListener('click', handler);
	        },
	        getYParamsForItemAtIndex: function getYParamsForItemAtIndex(index) {
	          var _items$index = _this2.items[index],
	              top = _items$index.offsetTop,
	              height = _items$index.offsetHeight;

	          return { top: top, height: height };
	        },
	        setTransitionDelayForItemAtIndex: function setTransitionDelayForItemAtIndex(index, value) {
	          return _this2.items[index].style.setProperty('transition-delay', value);
	        },
	        getIndexForEventTarget: function getIndexForEventTarget(target) {
	          return _this2.items.indexOf(target);
	        },
	        notifySelected: function notifySelected(evtData) {
	          return _this2.emit('MDCSimpleMenu:selected', {
	            index: evtData.index,
	            item: _this2.items[evtData.index]
	          });
	        },
	        notifyCancel: function notifyCancel() {
	          return _this2.emit('MDCSimpleMenu:cancel');
	        },
	        saveFocus: function saveFocus() {
	          _this2.previousFocus_ = document.activeElement;
	        },
	        restoreFocus: function restoreFocus() {
	          if (_this2.previousFocus_) {
	            _this2.previousFocus_.focus();
	          }
	        },
	        isFocused: function isFocused() {
	          return document.activeElement === _this2.root_;
	        },
	        focus: function focus() {
	          return _this2.root_.focus();
	        },
	        getFocusedItemIndex: function getFocusedItemIndex() {
	          return _this2.items.indexOf(document.activeElement);
	        },
	        focusItemAtIndex: function focusItemAtIndex(index) {
	          return _this2.items[index].focus();
	        },
	        isRtl: function isRtl() {
	          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
	        },
	        setTransformOrigin: function setTransformOrigin(origin) {
	          _this2.root_.style[(0, _util.getTransformPropertyName)(window) + '-origin'] = origin;
	        },
	        setPosition: function setPosition(position) {
	          _this2.root_.style.left = 'left' in position ? position.left : null;
	          _this2.root_.style.right = 'right' in position ? position.right : null;
	          _this2.root_.style.top = 'top' in position ? position.top : null;
	          _this2.root_.style.bottom = 'bottom' in position ? position.bottom : null;
	        }
	      });
	    }
	  }, {
	    key: 'open',
	    get: function get() {
	      return this.foundation_.isOpen();
	    },
	    set: function set(value) {
	      if (value) {
	        this.foundation_.open();
	      } else {
	        this.foundation_.close();
	      }
	    }
	  }, {
	    key: 'itemsContainer_',
	    get: function get() {
	      return this.root_.querySelector(_foundation2.default.strings.ITEMS_SELECTOR);
	    }

	    /* Return the items within the menu. Note that this only contains the set of elements within
	     * the items container that are proper list items, and not supplemental / presentational DOM
	     * elements.
	     */

	  }, {
	    key: 'items',
	    get: function get() {
	      var itemsContainer = this.itemsContainer_;

	      return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCSimpleMenu(root);
	    }
	  }]);

	  return MDCSimpleMenu;
	}(_base.MDCComponent);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _constants = __webpack_require__(29);

	var _util = __webpack_require__(30);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var MDCSimpleMenuFoundation = function (_MDCFoundation) {
	  _inherits(MDCSimpleMenuFoundation, _MDCFoundation);

	  _createClass(MDCSimpleMenuFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return _constants.cssClasses;
	    }
	  }, {
	    key: 'strings',
	    get: function get() {
	      return _constants.strings;
	    }
	  }, {
	    key: 'numbers',
	    get: function get() {
	      return _constants.numbers;
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        hasClass: function hasClass() /* className: string */{},
	        hasNecessaryDom: function hasNecessaryDom() {
	          return (/* boolean */false
	          );
	        },
	        getInnerDimensions: function getInnerDimensions() {
	          return (/* { width: number, height: number } */{}
	          );
	        },
	        hasAnchor: function hasAnchor() {
	          return (/* boolean */false
	          );
	        },
	        getAnchorDimensions: function getAnchorDimensions() {
	          return (
	            /* { width: number, height: number, top: number, right: number, bottom: number, left: number } */{}
	          );
	        },
	        getWindowDimensions: function getWindowDimensions() {
	          return (/* { width: number, height: number } */{}
	          );
	        },
	        setScale: function setScale() /* x: number, y: number */{},
	        setInnerScale: function setInnerScale() /* x: number, y: number */{},
	        getNumberOfItems: function getNumberOfItems() {
	          return (/* number */0
	          );
	        },
	        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
	        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
	        registerDocumentClickHandler: function registerDocumentClickHandler() /* handler: EventListener */{},
	        deregisterDocumentClickHandler: function deregisterDocumentClickHandler() /* handler: EventListener */{},
	        getYParamsForItemAtIndex: function getYParamsForItemAtIndex() {
	          return (/* index: number */ /* {top: number, height: number} */{}
	          );
	        },
	        setTransitionDelayForItemAtIndex: function setTransitionDelayForItemAtIndex() /* index: number, value: string */{},
	        getIndexForEventTarget: function getIndexForEventTarget() {
	          return (/* target: EventTarget */ /* number */0
	          );
	        },
	        notifySelected: function notifySelected() /* evtData: {index: number} */{},
	        notifyCancel: function notifyCancel() {},
	        saveFocus: function saveFocus() {},
	        restoreFocus: function restoreFocus() {},
	        isFocused: function isFocused() {
	          return (/* boolean */false
	          );
	        },
	        focus: function focus() {},
	        getFocusedItemIndex: function getFocusedItemIndex() {
	          return (/* number */-1
	          );
	        },
	        focusItemAtIndex: function focusItemAtIndex() /* index: number */{},
	        isRtl: function isRtl() {
	          return (/* boolean */false
	          );
	        },
	        setTransformOrigin: function setTransformOrigin() /* origin: string */{},
	        setPosition: function setPosition() /* position: { top: string, right: string, bottom: string, left: string } */{}
	      };
	    }
	  }]);

	  function MDCSimpleMenuFoundation(adapter) {
	    _classCallCheck(this, MDCSimpleMenuFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCSimpleMenuFoundation.__proto__ || Object.getPrototypeOf(MDCSimpleMenuFoundation)).call(this, _extends(MDCSimpleMenuFoundation.defaultAdapter, adapter)));

	    _this.clickHandler_ = function (evt) {
	      return _this.handlePossibleSelected_(evt);
	    };
	    _this.keydownHandler_ = function (evt) {
	      return _this.handleKeyboardDown_(evt);
	    };
	    _this.keyupHandler_ = function (evt) {
	      return _this.handleKeyboardUp_(evt);
	    };
	    _this.documentClickHandler_ = function (evt) {
	      _this.adapter_.notifyCancel();
	      _this.close();
	    };
	    _this.isOpen_ = false;
	    _this.startScaleX_ = 0;
	    _this.startScaleY_ = 0;
	    _this.targetScale_ = 1;
	    _this.scaleX_ = 0;
	    _this.scaleY_ = 0;
	    _this.running_ = false;
	    _this.selectedTriggerTimerId_ = 0;
	    _this.animationRequestId_ = 0;
	    return _this;
	  }

	  _createClass(MDCSimpleMenuFoundation, [{
	    key: 'init',
	    value: function init() {
	      var _MDCSimpleMenuFoundat = MDCSimpleMenuFoundation.cssClasses,
	          ROOT = _MDCSimpleMenuFoundat.ROOT,
	          OPEN = _MDCSimpleMenuFoundat.OPEN;


	      if (!this.adapter_.hasClass(ROOT)) {
	        throw new Error(ROOT + ' class required in root element.');
	      }

	      if (!this.adapter_.hasNecessaryDom()) {
	        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
	      }

	      if (this.adapter_.hasClass(OPEN)) {
	        this.isOpen_ = true;
	      }

	      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
	      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
	      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      clearTimeout(this.selectedTriggerTimerId_);
	      // Cancel any currently running animations.
	      cancelAnimationFrame(this.animationRequestId_);
	      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
	      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
	      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
	      this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
	    }

	    // Calculate transition delays for individual menu items, so that they fade in one at a time.

	  }, {
	    key: 'applyTransitionDelays_',
	    value: function applyTransitionDelays_() {
	      var _MDCSimpleMenuFoundat2 = MDCSimpleMenuFoundation.cssClasses,
	          BOTTOM_LEFT = _MDCSimpleMenuFoundat2.BOTTOM_LEFT,
	          BOTTOM_RIGHT = _MDCSimpleMenuFoundat2.BOTTOM_RIGHT;

	      var numItems = this.adapter_.getNumberOfItems();
	      var height = this.dimensions_.height;

	      var transitionDuration = MDCSimpleMenuFoundation.numbers.TRANSITION_DURATION_MS / 1000;
	      var start = MDCSimpleMenuFoundation.numbers.TRANSITION_SCALE_ADJUSTMENT_Y;

	      for (var index = 0; index < numItems; index++) {
	        var _adapter_$getYParamsF = this.adapter_.getYParamsForItemAtIndex(index),
	            itemTop = _adapter_$getYParamsF.top,
	            itemHeight = _adapter_$getYParamsF.height;

	        this.itemHeight_ = itemHeight;
	        var itemDelayFraction = itemTop / height;
	        if (this.adapter_.hasClass(BOTTOM_LEFT) || this.adapter_.hasClass(BOTTOM_RIGHT)) {
	          itemDelayFraction = (height - itemTop - itemHeight) / height;
	        }
	        var itemDelay = (start + itemDelayFraction * (1 - start)) * transitionDuration;
	        // Use toFixed() here to normalize CSS unit precision across browsers
	        this.adapter_.setTransitionDelayForItemAtIndex(index, itemDelay.toFixed(3) + 's');
	      }
	    }

	    // Remove transition delays from menu items.

	  }, {
	    key: 'removeTransitionDelays_',
	    value: function removeTransitionDelays_() {
	      var numItems = this.adapter_.getNumberOfItems();
	      for (var i = 0; i < numItems; i++) {
	        this.adapter_.setTransitionDelayForItemAtIndex(i, null);
	      }
	    }

	    // Animate menu opening or closing.

	  }, {
	    key: 'animationLoop_',
	    value: function animationLoop_() {
	      var _this2 = this;

	      var time = window.performance.now();
	      var _MDCSimpleMenuFoundat3 = MDCSimpleMenuFoundation.numbers,
	          TRANSITION_DURATION_MS = _MDCSimpleMenuFoundat3.TRANSITION_DURATION_MS,
	          TRANSITION_X1 = _MDCSimpleMenuFoundat3.TRANSITION_X1,
	          TRANSITION_Y1 = _MDCSimpleMenuFoundat3.TRANSITION_Y1,
	          TRANSITION_X2 = _MDCSimpleMenuFoundat3.TRANSITION_X2,
	          TRANSITION_Y2 = _MDCSimpleMenuFoundat3.TRANSITION_Y2,
	          TRANSITION_SCALE_ADJUSTMENT_X = _MDCSimpleMenuFoundat3.TRANSITION_SCALE_ADJUSTMENT_X,
	          TRANSITION_SCALE_ADJUSTMENT_Y = _MDCSimpleMenuFoundat3.TRANSITION_SCALE_ADJUSTMENT_Y;

	      var currentTime = (0, _util.clamp)((time - this.startTime_) / TRANSITION_DURATION_MS);

	      // Animate X axis very slowly, so that only the Y axis animation is visible during fade-out.
	      var currentTimeX = (0, _util.clamp)((currentTime - TRANSITION_SCALE_ADJUSTMENT_X) / (1 - TRANSITION_SCALE_ADJUSTMENT_X));
	      // No time-shifting on the Y axis when closing.
	      var currentTimeY = currentTime;

	      var startScaleY = this.startScaleY_;
	      if (this.targetScale_ === 1) {
	        // Start with the menu at the height of a single item.
	        if (this.itemHeight_) {
	          startScaleY = Math.max(this.itemHeight_ / this.dimensions_.height, startScaleY);
	        }
	        // X axis moves faster, so time-shift forward.
	        currentTimeX = (0, _util.clamp)(currentTime + TRANSITION_SCALE_ADJUSTMENT_X);
	        // Y axis moves slower, so time-shift backwards and adjust speed by the difference.
	        currentTimeY = (0, _util.clamp)((currentTime - TRANSITION_SCALE_ADJUSTMENT_Y) / (1 - TRANSITION_SCALE_ADJUSTMENT_Y));
	      }

	      // Apply cubic bezier easing independently to each axis.
	      var easeX = (0, _util.bezierProgress)(currentTimeX, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);
	      var easeY = (0, _util.bezierProgress)(currentTimeY, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);

	      // Calculate the scales to apply to the outer container and inner container.
	      this.scaleX_ = this.startScaleX_ + (this.targetScale_ - this.startScaleX_) * easeX;
	      var invScaleX = 1 / (this.scaleX_ === 0 ? 1 : this.scaleX_);
	      this.scaleY_ = startScaleY + (this.targetScale_ - startScaleY) * easeY;
	      var invScaleY = 1 / (this.scaleY_ === 0 ? 1 : this.scaleY_);

	      // Apply scales.
	      this.adapter_.setScale(this.scaleX_, this.scaleY_);
	      this.adapter_.setInnerScale(invScaleX, invScaleY);

	      // Stop animation when we've covered the entire 0 - 1 range of time.
	      if (currentTime < 1) {
	        this.animationRequestId_ = requestAnimationFrame(function () {
	          return _this2.animationLoop_();
	        });
	      } else {
	        this.animationRequestId_ = 0;
	        this.running_ = false;
	        this.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING);
	      }
	    }

	    // Starts the open or close animation.

	  }, {
	    key: 'animateMenu_',
	    value: function animateMenu_() {
	      var _this3 = this;

	      this.startTime_ = window.performance.now();
	      this.startScaleX_ = this.scaleX_;
	      this.startScaleY_ = this.scaleY_;

	      this.targetScale_ = this.isOpen_ ? 1 : 0;

	      if (!this.running_) {
	        this.running_ = true;
	        this.animationRequestId_ = requestAnimationFrame(function () {
	          return _this3.animationLoop_();
	        });
	      }
	    }
	  }, {
	    key: 'focusOnOpen_',
	    value: function focusOnOpen_(focusIndex) {
	      if (focusIndex === null) {
	        // First, try focusing the menu.
	        this.adapter_.focus();
	        // If that doesn't work, focus first item instead.
	        if (!this.adapter_.isFocused()) {
	          this.adapter_.focusItemAtIndex(0);
	        }
	      } else {
	        this.adapter_.focusItemAtIndex(focusIndex);
	      }
	    }

	    // Handle keys that we want to repeat on hold (tab and arrows).

	  }, {
	    key: 'handleKeyboardDown_',
	    value: function handleKeyboardDown_(evt) {
	      // Do nothing if Alt, Ctrl or Meta are pressed.
	      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
	        return true;
	      }

	      var keyCode = evt.keyCode,
	          key = evt.key,
	          shiftKey = evt.shiftKey;

	      var isTab = key === 'Tab' || keyCode === 9;
	      var isArrowUp = key === 'ArrowUp' || keyCode === 38;
	      var isArrowDown = key === 'ArrowDown' || keyCode === 40;
	      var isSpace = key === 'Space' || keyCode === 32;

	      var focusedItemIndex = this.adapter_.getFocusedItemIndex();
	      var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

	      if (shiftKey && isTab && focusedItemIndex === 0) {
	        this.adapter_.focusItemAtIndex(lastItemIndex);
	        evt.preventDefault();
	        return false;
	      }

	      if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
	        this.adapter_.focusItemAtIndex(0);
	        evt.preventDefault();
	        return false;
	      }

	      // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
	      if (isArrowUp || isArrowDown || isSpace) {
	        evt.preventDefault();
	      }

	      if (isArrowUp) {
	        if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
	          this.adapter_.focusItemAtIndex(lastItemIndex);
	        } else {
	          this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
	        }
	      } else if (isArrowDown) {
	        if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
	          this.adapter_.focusItemAtIndex(0);
	        } else {
	          this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
	        }
	      }

	      return true;
	    }

	    // Handle keys that we don't want to repeat on hold (Enter, Space, Escape).

	  }, {
	    key: 'handleKeyboardUp_',
	    value: function handleKeyboardUp_(evt) {
	      // Do nothing if Alt, Ctrl or Meta are pressed.
	      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
	        return true;
	      }

	      var keyCode = evt.keyCode,
	          key = evt.key;

	      var isEnter = key === 'Enter' || keyCode === 13;
	      var isSpace = key === 'Space' || keyCode === 32;
	      var isEscape = key === 'Escape' || keyCode === 27;

	      if (isEnter || isSpace) {
	        this.handlePossibleSelected_(evt);
	      }

	      if (isEscape) {
	        this.adapter_.notifyCancel();
	        this.close();
	      }

	      return true;
	    }
	  }, {
	    key: 'handlePossibleSelected_',
	    value: function handlePossibleSelected_(evt) {
	      var _this4 = this;

	      var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
	      if (targetIndex < 0) {
	        return;
	      }
	      // Debounce multiple selections
	      if (this.selectedTriggerTimerId_) {
	        return;
	      }
	      this.selectedTriggerTimerId_ = setTimeout(function () {
	        _this4.selectedTriggerTimerId_ = 0;
	        _this4.close();
	        _this4.adapter_.notifySelected({ index: targetIndex });
	      }, _constants.numbers.SELECTED_TRIGGER_DELAY);
	    }
	  }, {
	    key: 'autoPosition_',
	    value: function autoPosition_() {
	      var _position;

	      if (!this.adapter_.hasAnchor()) {
	        return;
	      }

	      // Defaults: open from the top left.
	      var vertical = 'top';
	      var horizontal = 'left';

	      var anchor = this.adapter_.getAnchorDimensions();
	      var windowDimensions = this.adapter_.getWindowDimensions();

	      var topOverflow = anchor.top + this.dimensions_.height - windowDimensions.height;
	      var bottomOverflow = this.dimensions_.height - anchor.bottom;
	      var extendsBeyondTopBounds = topOverflow > 0;

	      if (extendsBeyondTopBounds) {
	        if (bottomOverflow < topOverflow) {
	          vertical = 'bottom';
	        }
	      }

	      var leftOverflow = anchor.left + this.dimensions_.width - windowDimensions.width;
	      var rightOverflow = this.dimensions_.width - anchor.right;
	      var extendsBeyondLeftBounds = leftOverflow > 0;
	      var extendsBeyondRightBounds = rightOverflow > 0;

	      if (this.adapter_.isRtl()) {
	        // In RTL, we prefer to open from the right.
	        horizontal = 'right';
	        if (extendsBeyondRightBounds && leftOverflow < rightOverflow) {
	          horizontal = 'left';
	        }
	      } else if (extendsBeyondLeftBounds && rightOverflow < leftOverflow) {
	        horizontal = 'right';
	      }

	      var position = (_position = {}, _defineProperty(_position, horizontal, '0'), _defineProperty(_position, vertical, '0'), _position);

	      this.adapter_.setTransformOrigin(vertical + ' ' + horizontal);
	      this.adapter_.setPosition(position);
	    }

	    // Open the menu.

	  }, {
	    key: 'open',
	    value: function open() {
	      var _this5 = this;

	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$focusIndex = _ref.focusIndex,
	          focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

	      this.adapter_.saveFocus();
	      this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING);
	      this.animationRequestId_ = requestAnimationFrame(function () {
	        _this5.dimensions_ = _this5.adapter_.getInnerDimensions();
	        _this5.applyTransitionDelays_();
	        _this5.autoPosition_();
	        _this5.animateMenu_();
	        _this5.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
	        _this5.focusOnOpen_(focusIndex);
	        _this5.adapter_.registerDocumentClickHandler(_this5.documentClickHandler_);
	      });
	      this.isOpen_ = true;
	    }

	    // Close the menu.

	  }, {
	    key: 'close',
	    value: function close() {
	      var _this6 = this;

	      this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
	      this.adapter_.addClass(MDCSimpleMenuFoundation.cssClasses.ANIMATING);
	      requestAnimationFrame(function () {
	        _this6.removeTransitionDelays_();
	        _this6.animateMenu_();
	        _this6.adapter_.removeClass(MDCSimpleMenuFoundation.cssClasses.OPEN);
	      });
	      this.isOpen_ = false;
	      this.adapter_.restoreFocus();
	    }
	  }, {
	    key: 'isOpen',
	    value: function isOpen() {
	      return this.isOpen_;
	    }
	  }]);

	  return MDCSimpleMenuFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCSimpleMenuFoundation;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ROOT = 'mdc-simple-menu';

	var cssClasses = exports.cssClasses = {
	  ROOT: ROOT,
	  OPEN: ROOT + '--open',
	  ANIMATING: ROOT + '--animating',
	  TOP_RIGHT: ROOT + '--open-from-top-right',
	  BOTTOM_LEFT: ROOT + '--open-from-bottom-left',
	  BOTTOM_RIGHT: ROOT + '--open-from-bottom-right'
	};

	var strings = exports.strings = {
	  ITEMS_SELECTOR: '.' + ROOT + '__items'
	};

	var numbers = exports.numbers = {
	  // Amount of time to wait before triggering a selected event on the menu. Note that this time
	  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
	  // animate before closing the menu
	  SELECTED_TRIGGER_DELAY: 50,
	  // Total duration of the menu animation.
	  TRANSITION_DURATION_MS: 300,
	  // The menu starts its open animation with the X axis at this time value (0 - 1).
	  TRANSITION_SCALE_ADJUSTMENT_X: 0.5,
	  // The time value the menu waits until the animation starts on the Y axis (0 - 1).
	  TRANSITION_SCALE_ADJUSTMENT_Y: 0.2,
	  // The cubic bezier control points for the animation (cubic-bezier(0, 0, 0.2, 1)).
	  TRANSITION_X1: 0,
	  TRANSITION_Y1: 0,
	  TRANSITION_X2: 0.2,
	  TRANSITION_Y2: 1
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTransformPropertyName = getTransformPropertyName;
	exports.clamp = clamp;
	exports.bezierProgress = bezierProgress;
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var storedTransformPropertyName_ = void 0;

	// Returns the name of the correct transform property to use on the current browser.
	function getTransformPropertyName(globalObj) {
	  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (storedTransformPropertyName_ === undefined || forceRefresh) {
	    var el = globalObj.document.createElement('div');
	    var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
	    storedTransformPropertyName_ = transformPropertyName;
	  }

	  return storedTransformPropertyName_;
	}

	// Clamps a value between the minimum and the maximum, returning the clamped value.
	function clamp(value) {
	  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	  return Math.min(max, Math.max(min, value));
	}

	// Returns the easing value to apply at time t, for a given cubic bezier curve.
	// Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
	// Paramters are as follows:
	// - time: The current time in the animation, scaled between 0 and 1.
	// - x1: The x value of control point P1.
	// - y1: The y value of control point P1.
	// - x2: The x value of control point P2.
	// - y2: The y value of control point P2.
	function bezierProgress(time, x1, y1, x2, y2) {
	  return getBezierCoordinate_(solvePositionFromXValue_(time, x1, x2), y1, y2);
	}

	// Compute a single coordinate at a position point between 0 and 1.
	// c1 and c2 are the matching coordinate on control points P1 and P2, respectively.
	// Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
	// Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
	function getBezierCoordinate_(t, c1, c2) {
	  // Special case start and end.
	  if (t === 0 || t === 1) {
	    return t;
	  }

	  // Step one - from 4 points to 3
	  var ic0 = t * c1;
	  var ic1 = c1 + t * (c2 - c1);
	  var ic2 = c2 + t * (1 - c2);

	  // Step two - from 3 points to 2
	  ic0 += t * (ic1 - ic0);
	  ic1 += t * (ic2 - ic1);

	  // Final step - last point
	  return ic0 + t * (ic1 - ic0);
	}

	// Project a point onto the Bezier curve, from a given X. Calculates the position t along the curve.
	// Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
	function solvePositionFromXValue_(xVal, x1, x2) {
	  var EPSILON = 1e-6;
	  var MAX_ITERATIONS = 8;

	  if (xVal <= 0) {
	    return 0;
	  } else if (xVal >= 1) {
	    return 1;
	  }

	  // Initial estimate of t using linear interpolation.
	  var t = xVal;

	  // Try gradient descent to solve for t. If it works, it is very fast.
	  var tMin = 0;
	  var tMax = 1;
	  var value = 0;
	  for (var i = 0; i < MAX_ITERATIONS; i++) {
	    value = getBezierCoordinate_(t, x1, x2);
	    var derivative = (getBezierCoordinate_(t + EPSILON, x1, x2) - value) / EPSILON;
	    if (Math.abs(value - xVal) < EPSILON) {
	      return t;
	    } else if (Math.abs(derivative) < EPSILON) {
	      break;
	    } else {
	      if (value < xVal) {
	        tMin = t;
	      } else {
	        tMax = t;
	      }
	      t -= (value - xVal) / derivative;
	    }
	  }

	  // If the gradient descent got stuck in a local minimum, e.g. because
	  // the derivative was close to 0, use a Dichotomy refinement instead.
	  // We limit the number of interations to 8.
	  for (var _i = 0; Math.abs(value - xVal) > EPSILON && _i < MAX_ITERATIONS; _i++) {
	    if (value < xVal) {
	      tMin = t;
	      t = (t + tMax) / 2;
	    } else {
	      tMax = t;
	      t = (t + tMin) / 2;
	    }
	    value = getBezierCoordinate_(t, x1, x2);
	  }
	  return t;
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MDCSelect = exports.MDCSelectFoundation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	var _menu = __webpack_require__(26);

	var _foundation = __webpack_require__(32);

	var _foundation2 = _interopRequireDefault(_foundation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	exports.MDCSelectFoundation = _foundation2.default;

	var MDCSelect = exports.MDCSelect = function (_MDCComponent) {
	  _inherits(MDCSelect, _MDCComponent);

	  function MDCSelect() {
	    _classCallCheck(this, MDCSelect);

	    return _possibleConstructorReturn(this, (MDCSelect.__proto__ || Object.getPrototypeOf(MDCSelect)).apply(this, arguments));
	  }

	  _createClass(MDCSelect, [{
	    key: 'item',
	    value: function item(index) {
	      return this.options[index] || null;
	    }
	  }, {
	    key: 'nameditem',
	    value: function nameditem(key) {
	      // NOTE: IE11 precludes us from using Array.prototype.find
	      for (var i = 0, options = this.options, option; option = options[i]; i++) {
	        if (option.id === key || option.getAttribute('name') === key) {
	          return option;
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      var menuFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
	        return new _menu.MDCSimpleMenu(el);
	      };

	      this.menuEl_ = this.root_.querySelector('.mdc-select__menu');
	      this.menu_ = menuFactory(this.menuEl_);
	      this.selectedText_ = this.root_.querySelector('.mdc-select__selected-text');
	    }
	  }, {
	    key: 'getDefaultFoundation',
	    value: function getDefaultFoundation() {
	      var _this2 = this;

	      return new _foundation2.default({
	        addClass: function addClass(className) {
	          return _this2.root_.classList.add(className);
	        },
	        removeClass: function removeClass(className) {
	          return _this2.root_.classList.remove(className);
	        },
	        setAttr: function setAttr(attr, value) {
	          return _this2.root_.setAttribute(attr, value);
	        },
	        rmAttr: function rmAttr(attr, value) {
	          return _this2.root_.removeAttribute(attr, value);
	        },
	        computeBoundingRect: function computeBoundingRect() {
	          return _this2.root_.getBoundingClientRect();
	        },
	        registerInteractionHandler: function registerInteractionHandler(type, handler) {
	          return _this2.root_.addEventListener(type, handler);
	        },
	        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
	          return _this2.root_.removeEventListener(type, handler);
	        },
	        focus: function focus() {
	          return _this2.root_.focus();
	        },
	        makeTabbable: function makeTabbable() {
	          _this2.root_.tabIndex = 0;
	        },
	        makeUntabbable: function makeUntabbable() {
	          _this2.root_.tabIndex = -1;
	        },
	        getComputedStyleValue: function getComputedStyleValue(prop) {
	          return window.getComputedStyle(_this2.root_).getPropertyValue(prop);
	        },
	        setStyle: function setStyle(propertyName, value) {
	          return _this2.root_.style.setProperty(propertyName, value);
	        },
	        create2dRenderingContext: function create2dRenderingContext() {
	          return document.createElement('canvas').getContext('2d');
	        },
	        setMenuElStyle: function setMenuElStyle(propertyName, value) {
	          return _this2.menuEl_.style.setProperty(propertyName, value);
	        },
	        setMenuElAttr: function setMenuElAttr(attr, value) {
	          return _this2.menuEl_.setAttribute(attr, value);
	        },
	        rmMenuElAttr: function rmMenuElAttr(attr) {
	          return _this2.menuEl_.removeAttribute(attr);
	        },
	        getMenuElOffsetHeight: function getMenuElOffsetHeight() {
	          return _this2.menuEl_.offsetHeight;
	        },
	        openMenu: function openMenu(focusIndex) {
	          return _this2.menu_.show({ focusIndex: focusIndex });
	        },
	        isMenuOpen: function isMenuOpen() {
	          return _this2.menu_.open;
	        },
	        setSelectedTextContent: function setSelectedTextContent(selectedTextContent) {
	          _this2.selectedText_.textContent = selectedTextContent;
	        },
	        getNumberOfOptions: function getNumberOfOptions() {
	          return _this2.options.length;
	        },
	        getTextForOptionAtIndex: function getTextForOptionAtIndex(index) {
	          return _this2.options[index].textContent;
	        },
	        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
	          return _this2.options[index].setAttribute(attr, value);
	        },
	        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
	          return _this2.options[index].removeAttribute(attr);
	        },
	        getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex(index) {
	          return _this2.options[index].offsetTop;
	        },
	        registerMenuInteractionHandler: function registerMenuInteractionHandler(type, handler) {
	          return _this2.menu_.listen(type, handler);
	        },
	        deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler(type, handler) {
	          return _this2.menu_.unlisten(type, handler);
	        },
	        notifyChange: function notifyChange() {
	          return _this2.emit('MDCSelect:change', _this2);
	        },
	        getWindowInnerHeight: function getWindowInnerHeight() {
	          return window.innerHeight;
	        }
	      });
	    }
	  }, {
	    key: 'initialSyncWithDOM',
	    value: function initialSyncWithDOM() {
	      var selectedOption = this.selectedOptions[0];
	      var idx = selectedOption ? this.options.indexOf(selectedOption) : -1;
	      if (idx >= 0) {
	        this.selectedIndex = idx;
	      }

	      if (this.root_.getAttribute('aria-disabled') === 'true') {
	        this.disabled = true;
	      }
	    }
	  }, {
	    key: 'options',
	    get: function get() {
	      return this.menu_.items;
	    }
	  }, {
	    key: 'selectedOptions',
	    get: function get() {
	      return this.root_.querySelectorAll('[aria-selected]');
	    }
	  }, {
	    key: 'selectedIndex',
	    get: function get() {
	      return this.foundation_.getSelectedIndex();
	    },
	    set: function set(selectedIndex) {
	      this.foundation_.setSelectedIndex(selectedIndex);
	    }
	  }, {
	    key: 'disabled',
	    get: function get() {
	      return this.foundation_.isDisabled();
	    },
	    set: function set(disabled) {
	      this.foundation_.setDisabled(disabled);
	    }
	  }], [{
	    key: 'attachTo',
	    value: function attachTo(root) {
	      return new MDCSelect(root);
	    }
	  }]);

	  return MDCSelect;
	}(_base.MDCComponent);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ROOT = 'mdc-select';
	var OPENER_KEYS = [{ key: 'ArrowUp', keyCode: 38, forType: 'keydown' }, { key: 'ArrowDown', keyCode: 40, forType: 'keydown' }, { key: 'Space', keyCode: 32, forType: 'keyup' }];

	var MDCSelectFoundation = function (_MDCFoundation) {
	  _inherits(MDCSelectFoundation, _MDCFoundation);

	  _createClass(MDCSelectFoundation, null, [{
	    key: 'cssClasses',
	    get: function get() {
	      return {
	        ROOT: ROOT,
	        OPEN: ROOT + '--open',
	        DISABLED: ROOT + '--disabled'
	      };
	    }
	  }, {
	    key: 'defaultAdapter',
	    get: function get() {
	      return {
	        addClass: function addClass() /* className: string */{},
	        removeClass: function removeClass() /* className: string */{},
	        setAttr: function setAttr() /* attr: string, value: string */{},
	        rmAttr: function rmAttr() /* attr: string */{},
	        computeBoundingRect: function computeBoundingRect() {
	          return (/* {left: number, top: number} */{ left: 0, top: 0 }
	          );
	        },
	        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
	        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
	        focus: function focus() {},
	        makeTabbable: function makeTabbable() {},
	        makeUntabbable: function makeUntabbable() {},
	        getComputedStyleValue: function getComputedStyleValue() {
	          return (/* propertyName: string */ /* string */''
	          );
	        },
	        setStyle: function setStyle() /* propertyName: string, value: string */{},
	        create2dRenderingContext: function create2dRenderingContext() {
	          return (/* {font: string, measureText: (string) => {width: number}} */{
	              font: '',
	              measureText: function measureText() {
	                return { width: 0 };
	              }
	            }
	          );
	        },
	        setMenuElStyle: function setMenuElStyle() /* propertyName: string, value: string */{},
	        setMenuElAttr: function setMenuElAttr() /* attr: string, value: string */{},
	        rmMenuElAttr: function rmMenuElAttr() /* attr: string */{},
	        getMenuElOffsetHeight: function getMenuElOffsetHeight() {
	          return (/* number */0
	          );
	        },
	        openMenu: function openMenu() /* focusIndex: number */{},
	        isMenuOpen: function isMenuOpen() {
	          return (/* boolean */false
	          );
	        },
	        setSelectedTextContent: function setSelectedTextContent() /* textContent: string */{},
	        getNumberOfOptions: function getNumberOfOptions() {
	          return (/* number */0
	          );
	        },
	        getTextForOptionAtIndex: function getTextForOptionAtIndex() {
	          return (/* index: number */ /* string */''
	          );
	        },
	        setAttrForOptionAtIndex: function setAttrForOptionAtIndex() /* index: number, attr: string, value: string */{},
	        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() /* index: number, attr: string */{},
	        getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex() {
	          return (/* index: number */ /* number */0
	          );
	        },
	        registerMenuInteractionHandler: function registerMenuInteractionHandler() /* type: string, handler: EventListener */{},
	        deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler() /* type: string, handler: EventListener */{},
	        notifyChange: function notifyChange() {},
	        getWindowInnerHeight: function getWindowInnerHeight() {
	          return (/* number */0
	          );
	        }
	      };
	    }
	  }]);

	  function MDCSelectFoundation(adapter) {
	    _classCallCheck(this, MDCSelectFoundation);

	    var _this = _possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

	    _this.ctx_ = null;
	    _this.selectedIndex_ = -1;
	    _this.disabled_ = false;
	    _this.displayHandler_ = function (evt) {
	      evt.preventDefault();
	      if (!_this.adapter_.isMenuOpen()) {
	        _this.open_();
	      }
	    };
	    _this.displayViaKeyboardHandler_ = function (evt) {
	      return _this.handleDisplayViaKeyboard_(evt);
	    };
	    _this.selectionHandler_ = function (_ref) {
	      var detail = _ref.detail;
	      var index = detail.index;

	      _this.close_();
	      if (index !== _this.selectedIndex_) {
	        _this.setSelectedIndex(index);
	        _this.adapter_.notifyChange();
	      }
	    };
	    _this.cancelHandler_ = function () {
	      _this.close_();
	    };
	    return _this;
	  }

	  _createClass(MDCSelectFoundation, [{
	    key: 'init',
	    value: function init() {
	      this.ctx_ = this.adapter_.create2dRenderingContext();
	      this.adapter_.registerInteractionHandler('click', this.displayHandler_);
	      this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
	      this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
	      this.adapter_.registerMenuInteractionHandler('MDCSimpleMenu:selected', this.selectionHandler_);
	      this.adapter_.registerMenuInteractionHandler('MDCSimpleMenu:cancel', this.cancelHandler_);
	      this.resize();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Drop reference to context object to prevent potential leaks
	      this.ctx_ = null;
	      this.adapter_.deregisterInteractionHandler('click', this.displayHandler_);
	      this.adapter_.deregisterInteractionHandler('keydown', this.displayViaKeyboardHandler_);
	      this.adapter_.deregisterInteractionHandler('keyup', this.displayViaKeyboardHandler_);
	      this.adapter_.deregisterMenuInteractionHandler('MDCSimpleMenu:selected', this.selectionHandler_);
	      this.adapter_.deregisterMenuInteractionHandler('MDCSimpleMenu:cancel', this.cancelHandler_);
	    }
	  }, {
	    key: 'getSelectedIndex',
	    value: function getSelectedIndex() {
	      return this.selectedIndex_;
	    }
	  }, {
	    key: 'setSelectedIndex',
	    value: function setSelectedIndex(index) {
	      var prevSelectedIndex = this.selectedIndex_;
	      if (prevSelectedIndex >= 0) {
	        this.adapter_.rmAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected');
	      }

	      this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfOptions() ? index : -1;
	      var selectedTextContent = '';
	      if (this.selectedIndex_ >= 0) {
	        selectedTextContent = this.adapter_.getTextForOptionAtIndex(this.selectedIndex_).trim();
	        this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
	      }
	      this.adapter_.setSelectedTextContent(selectedTextContent);
	    }
	  }, {
	    key: 'isDisabled',
	    value: function isDisabled() {
	      return this.disabled_;
	    }
	  }, {
	    key: 'setDisabled',
	    value: function setDisabled(disabled) {
	      var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

	      this.disabled_ = disabled;
	      if (this.disabled_) {
	        this.adapter_.addClass(DISABLED);
	        this.adapter_.setAttr('aria-disabled', 'true');
	        this.adapter_.makeUntabbable();
	      } else {
	        this.adapter_.removeClass(DISABLED);
	        this.adapter_.rmAttr('aria-disabled');
	        this.adapter_.makeTabbable();
	      }
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      var font = this.adapter_.getComputedStyleValue('font');
	      var letterSpacing = parseFloat(this.adapter_.getComputedStyleValue('letter-spacing'));
	      if (font) {
	        this.ctx_.font = font;
	      } else {
	        var primaryFontFamily = this.adapter_.getComputedStyleValue('font-family').split(',')[0];
	        var fontSize = this.adapter_.getComputedStyleValue('font-size');
	        this.ctx_.font = fontSize + ' ' + primaryFontFamily;
	      }

	      var maxTextLength = 0;
	      for (var i = 0, l = this.adapter_.getNumberOfOptions(); i < l; i++) {
	        var txt = this.adapter_.getTextForOptionAtIndex(i).trim();

	        var _ctx_$measureText = this.ctx_.measureText(txt),
	            width = _ctx_$measureText.width;

	        var addedSpace = letterSpacing * txt.length;
	        maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace));
	      }
	      this.adapter_.setStyle('width', maxTextLength + 'px');
	    }
	  }, {
	    key: 'open_',
	    value: function open_() {
	      var OPEN = MDCSelectFoundation.cssClasses.OPEN;

	      var focusIndex = this.selectedIndex_ < 0 ? 0 : this.selectedIndex_;

	      var _computeMenuStylesFor = this.computeMenuStylesForOpenAtIndex_(focusIndex),
	          left = _computeMenuStylesFor.left,
	          top = _computeMenuStylesFor.top,
	          transformOrigin = _computeMenuStylesFor.transformOrigin;

	      this.adapter_.setMenuElStyle('left', left);
	      this.adapter_.setMenuElStyle('top', top);
	      this.adapter_.setMenuElStyle('transform-origin', transformOrigin);
	      this.adapter_.addClass(OPEN);
	      this.adapter_.openMenu(focusIndex);
	    }
	  }, {
	    key: 'computeMenuStylesForOpenAtIndex_',
	    value: function computeMenuStylesForOpenAtIndex_(index) {
	      var innerHeight = this.adapter_.getWindowInnerHeight();

	      var _adapter_$computeBoun = this.adapter_.computeBoundingRect(),
	          left = _adapter_$computeBoun.left,
	          top = _adapter_$computeBoun.top;

	      this.adapter_.setMenuElAttr('aria-hidden', 'true');
	      this.adapter_.setMenuElStyle('display', 'block');
	      var menuHeight = this.adapter_.getMenuElOffsetHeight();
	      var itemOffsetTop = this.adapter_.getOffsetTopForOptionAtIndex(index);
	      this.adapter_.setMenuElStyle('display', '');
	      this.adapter_.rmMenuElAttr('aria-hidden');

	      var adjustedTop = top - itemOffsetTop;
	      var adjustedHeight = menuHeight - itemOffsetTop;
	      var overflowsTop = adjustedTop < 0;
	      var overflowsBottom = adjustedTop + adjustedHeight > innerHeight;
	      if (overflowsTop) {
	        adjustedTop = 0;
	      } else if (overflowsBottom) {
	        adjustedTop = Math.max(0, adjustedTop - adjustedHeight);
	      }

	      return {
	        left: left + 'px',
	        top: adjustedTop + 'px',
	        transformOrigin: 'center ' + itemOffsetTop + 'px'
	      };
	    }
	  }, {
	    key: 'close_',
	    value: function close_() {
	      var OPEN = MDCSelectFoundation.cssClasses.OPEN;

	      this.adapter_.removeClass(OPEN);
	      this.adapter_.focus();
	    }
	  }, {
	    key: 'handleDisplayViaKeyboard_',
	    value: function handleDisplayViaKeyboard_(evt) {
	      // We use a hard-coded 2 instead of Event.AT_TARGET to avoid having to reference a browser
	      // global.
	      var EVENT_PHASE_AT_TARGET = 2;
	      if (evt.eventPhase !== EVENT_PHASE_AT_TARGET) {
	        return;
	      }

	      // Prevent pressing space down from scrolling the page
	      var isSpaceDown = evt.type === 'keydown' && (evt.key === 'Space' || evt.keyCode === 32);
	      if (isSpaceDown) {
	        evt.preventDefault();
	      }

	      var isOpenerKey = OPENER_KEYS.some(function (_ref2) {
	        var key = _ref2.key,
	            keyCode = _ref2.keyCode,
	            forType = _ref2.forType;

	        return evt.type === forType && (evt.key === key || evt.keyCode === keyCode);
	      });
	      if (isOpenerKey) {
	        this.displayHandler_(evt);
	      }
	    }
	  }]);

	  return MDCSelectFoundation;
	}(_base.MDCFoundation);

	exports.default = MDCSelectFoundation;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mdcAutoInit;
	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var registry = Object.create(null);

	var CONSOLE_WARN = console.warn.bind(console);

	/**
	 * Auto-initializes all mdc components on a page.
	 */
	function mdcAutoInit() {
	  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	  var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONSOLE_WARN;

	  var nodes = root.querySelectorAll('[data-mdc-auto-init]');
	  for (var i = 0, node; node = nodes[i]; i++) {
	    var ctorName = node.dataset.mdcAutoInit;
	    if (!ctorName) {
	      throw new Error('(mdc-auto-init) Constructor name must be given.');
	    }

	    var Ctor = registry[ctorName];
	    if (typeof Ctor !== 'function') {
	      throw new Error('(mdc-auto-init) Could not find constructor in registry for ' + ctorName);
	    }

	    if (node[ctorName]) {
	      warn('(mdc-auto-init) Component already initialized for ' + node + '. Skipping...');
	      continue;
	    }

	    // TODO: Should we make an eslint rule for an attachTo() static method?
	    var component = Ctor.attachTo(node);
	    Object.defineProperty(node, ctorName, {
	      value: component,
	      writable: false,
	      enumerable: false,
	      configurable: true
	    });
	  }
	}

	mdcAutoInit.register = function (componentName, Ctor) {
	  var warn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CONSOLE_WARN;

	  if (typeof Ctor !== 'function') {
	    throw new Error('(mdc-auto-init) Invalid Ctor value ' + Ctor + '. Expected function');
	  }
	  if (registry[componentName]) {
	    warn('(mdc-auto-init) Overriding registration for ' + componentName + ' with ' + Ctor + '. ' + ('Was: ' + registry[componentName]));
	  }
	  registry[componentName] = Ctor;
	};

	mdcAutoInit.deregister = function (componentName) {
	  delete registry[componentName];
	};

	mdcAutoInit.deregisterAll = function () {
	  Object.keys(registry).forEach(this.deregister, this);
	};

/***/ }
/******/ ])
});
;