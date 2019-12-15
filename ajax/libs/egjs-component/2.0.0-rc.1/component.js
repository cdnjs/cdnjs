(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}

	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this.options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this.options[key];
			}

			if (arguments.length === 0) {
				return this.options;
			}

			var options = key;
			this.options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var self = this;
				this.on(eventName, function listener() {
					for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
						arg[_key3] = arguments[_key3];
					}

					handlerToAttach.apply(self, arg);
					self.off(eventName, listener);
				});
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map